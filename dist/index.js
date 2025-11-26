// src/utils/ast.ts
import { parse } from "@typescript-eslint/typescript-estree";
function getAST(code) {
  return parse(code, {
    jsx: true,
    loc: true,
    range: true,
    comment: false
  });
}
function traverseAST(node, visitor) {
  visitor(node);
  for (const key of Object.keys(node)) {
    const child = node[key];
    if (child && typeof child === "object") {
      if (Array.isArray(child)) {
        child.forEach((item) => {
          if (item && typeof item.type === "string") {
            traverseAST(item, visitor);
          }
        });
      } else if (typeof child.type === "string") {
        traverseAST(child, visitor);
      }
    }
  }
}

// src/rules/no-unhandled-async.ts
function checkUnhandledAsync(ast, code) {
  const questions = [];
  traverseAST(ast, (node) => {
    if (node.type === "CallExpression" && node.callee.type === "Identifier" && node.callee.name === "fetch") {
      const parent = findParent(ast, node);
      if (!isHandledAsync(parent)) {
        questions.push({
          id: `unhandled-async-${node.loc?.start.line}`,
          severity: "danger",
          rule: "no-unhandled-async",
          message: "Kalau fetch gagal atau response bukan JSON, apa yang terjadi?",
          location: {
            line: node.loc?.start.line || 0,
            column: node.loc?.start.column || 0
          }
        });
      }
    }
  });
  return questions;
}
function findParent(ast, target) {
  return null;
}
function isHandledAsync(node) {
  return false;
}

// src/rules/no-error-swallowing.ts
function checkErrorSwallowing(ast, code) {
  const questions = [];
  traverseAST(ast, (node) => {
    if (node.type === "CatchClause") {
      const hasEmptyBlock = node.body.type === "BlockStatement" && node.body.body.length === 0;
      if (hasEmptyBlock) {
        questions.push({
          id: `error-swallow-${node.loc?.start.line}`,
          severity: "warning",
          rule: "no-error-swallowing",
          message: "Catch block kosong. Apa yang harus dilakukan kalau error terjadi?",
          location: {
            line: node.loc?.start.line || 0,
            column: node.loc?.start.column || 0
          }
        });
      }
    }
  });
  return questions;
}

// src/rules/no-side-effects.ts
function checkSideEffects(ast, code) {
  const questions = [];
  traverseAST(ast, (node) => {
    if (node.type === "FunctionDeclaration" && node.id?.name.startsWith("get")) {
      let hasSideEffect = false;
      traverseAST(node.body, (child) => {
        if (child.type === "CallExpression" || child.type === "AssignmentExpression") {
          hasSideEffect = true;
        }
      });
      if (hasSideEffect) {
        questions.push({
          id: `side-effect-${node.loc?.start.line}`,
          severity: "info",
          rule: "no-side-effects",
          message: `Fungsi '${node.id?.name}' namanya 'get' tapi kayaknya ada side effect. Apakah ini disengaja?`,
          location: {
            line: node.loc?.start.line || 0,
            column: node.loc?.start.column || 0
          }
        });
      }
    }
  });
  return questions;
}

// src/rules/no-magic-numbers.ts
function checkMagicNumbers(ast, code) {
  const questions = [];
  const allowedNumbers = [0, 1, -1, 2];
  traverseAST(ast, (node) => {
    if (node.type === "Literal" && typeof node.value === "number" && !allowedNumbers.includes(node.value)) {
      questions.push({
        id: `magic-number-${node.loc?.start.line}`,
        severity: "info",
        rule: "no-magic-numbers",
        message: `Angka ${node.value} muncul begitu saja. Apa artinya angka ini?`,
        location: {
          line: node.loc?.start.line || 0,
          column: node.loc?.start.column || 0
        }
      });
    }
  });
  return questions;
}

// src/rules/index.ts
function applyRules(ast, code) {
  const questions = [];
  questions.push(...checkUnhandledAsync(ast, code));
  questions.push(...checkErrorSwallowing(ast, code));
  questions.push(...checkSideEffects(ast, code));
  questions.push(...checkMagicNumbers(ast, code));
  return questions;
}

// src/utils/formatter.ts
function formatOutput(questions, tone) {
  const summaries = {
    formal: `Ditemukan ${questions.length} area yang memerlukan klarifikasi dalam implementasi kode Anda.`,
    friendly: `Hei! Ada ${questions.length} hal yang bisa kita diskusikan tentang kode ini \u{1F914}`,
    roasting: `Wah, sepertinya ada ${questions.length} hal yang... menarik di sini \u{1F525}`
  };
  return {
    summary: summaries[tone] || summaries.friendly,
    questions
  };
}

// src/core/analyzer.ts
function analyze(code, options = {}) {
  const tone = options.tone || "friendly";
  try {
    const ast = getAST(code);
    const questions = applyRules(ast, code);
    return formatOutput(questions, tone);
  } catch (error) {
    return {
      summary: `Gagal menganalisis kode: ${error instanceof Error ? error.message : "Unknown error"}`,
      questions: []
    };
  }
}
export {
  analyze as analyzeCode,
  formatOutput,
  getAST,
  traverseAST
};
