async function getUser(id) { 
    return await fetch('/api/' + id); 
}
