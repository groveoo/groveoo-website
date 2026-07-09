const fs = require('fs');

const html = fs.readFileSync('/Users/nerd/.gemini/antigravity/scratch/armory-clone/index.html', 'utf8');
const scriptMatch = html.match(/<script>(.*?)<\/script>/gs);

if (scriptMatch) {
    const lastScript = scriptMatch[scriptMatch.length - 1];
    // Strip the tags
    const code = lastScript.replace('<script>', '').replace('</script>', '');
    try {
        new Function(code);
        console.log("Syntax is VALID!");
    } catch (e) {
        console.error("SYNTAX ERROR in injected script:", e);
    }
} else {
    console.log("No scripts found.");
}
