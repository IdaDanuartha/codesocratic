# 🦆 CodeSocratic

> A Socratic TypeScript/JavaScript code analyzer that asks the right questions to improve your code.

CodeSocratic helps you think critically about your code by asking insightful questions instead of just pointing out errors. Inspired by the [Socratic Method](https://en.wikipedia.org/wiki/Socratic_method) and [Rubber Duck Debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging).

## ✨ Features

- 🤔 **Socratic questioning** - Learn by thinking, not just fixing
- 🎯 **Smart analysis** - Detects common anti-patterns in TypeScript/JavaScript
- 🎭 **Multiple tones** - Choose between formal, friendly, or roasting feedback
- 🚀 **Zero config** - Works out of the box
- 📦 **ESM-first** - Modern JavaScript package

## 📦 Installation

### Global Installation
```bash
npm install -g codesocratic
```

### One-time Usage with npx
```bash
npx codesocratic your-file.ts
```

### As Project Dependency
```bash
npm install --save-dev codesocratic
```

## 🚀 Usage

### CLI
```bash
# Analyze a file with default (friendly) tone
codesocratic src/app.ts

# Use roasting tone for some tough love
codesocratic index.js --tone=roasting

# Use formal tone for professional context
codesocratic main.ts --tone=formal

# Show help
codesocratic --help

# Show version
codesocratic --version
```

### Programmatic API
```typescript
import { analyzeCode } from 'codesocratic';

const code = `
async function getUser(id) {
  const res = await fetch('/api/users/' + id);
  const data = await res.json();
  return data;
}
`;

const result = analyzeCode(code, { tone: 'friendly' });
console.log(result);
```

### Output Example
```json
{
  "summary": "Hei! Ada 2 hal yang bisa kita diskusikan tentang kode ini 🤔",
  "questions": [
    {
      "id": "unhandled-async-2",
      "severity": "danger",
      "rule": "no-unhandled-async",
      "message": "Kalau fetch gagal atau response bukan JSON, apa yang terjadi?",
      "location": { "line": 2, "column": 15 }
    },
    {
      "id": "side-effect-1",
      "severity": "info",
      "rule": "no-side-effects",
      "message": "Fungsi 'getUser' namanya 'get' tapi kayaknya ada side effect. Apakah ini disengaja?",
      "location": { "line": 1, "column": 0 }
    }
  ]
}
```

## 🎭 Tones

Choose the feedback style that works best for you:

| Tone | Description | Best For |
|------|-------------|----------|
| `formal` | Professional and technical | Code reviews, documentation |
| `friendly` | Conversational and supportive (default) | Learning, collaboration |
| `roasting` | Humorous and sarcastic | Self-review, team fun |

## 📋 Rules

CodeSocratic includes the following built-in rules:

| Rule | Severity | Description |
|------|----------|-------------|
| `no-unhandled-async` | danger | Detects async operations without error handling |
| `no-error-swallowing` | warning | Finds empty catch blocks that hide errors |
| `no-side-effects` | info | Questions functions with misleading names |
| `no-magic-numbers` | info | Asks about unexplained numeric literals |

## 📖 API Reference

### `analyzeCode(code: string, options?: AnalysisOptions): AnalysisResult`

Analyzes the provided code and returns questions about potential issues.

**Parameters:**
- `code` (string): Source code to analyze
- `options` (AnalysisOptions, optional):
  - `tone`: `'formal' | 'friendly' | 'roasting'` (default: `'friendly'`)

**Returns:** `AnalysisResult`
```typescript
{
  summary: string;
  questions: Question[];
}
```

### Types
```typescript
interface Question {
  id: string;
  severity: 'info' | 'warning' | 'danger';
  rule: string;
  message: string;
  location?: {
    line: number;
    column: number;
  };
}
```

## 🛠️ Integration Examples

### With npm scripts
```json
{
  "scripts": {
    "analyze": "codesocratic src/**/*.ts",
    "analyze:roast": "codesocratic src/**/*.ts --tone=roasting"
  }
}
```

### With CI/CD
```yaml
# .github/workflows/code-analysis.yml
name: Code Analysis
on: [push, pull_request]

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npx codesocratic src/**/*.ts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT © Ida Danuartha

## 🙏 Credits

Inspired by:
- The Socratic Method of teaching through questioning
- Rubber Duck Debugging technique
- The need for better code learning tools

## 📬 Support

- 📧 Email: danuart14.dev@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/codesocratic/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/codesocratic/discussions)

---

**Made with ❤️ and 🦆 by Ida Danuartha**