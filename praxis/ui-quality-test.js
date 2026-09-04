const fs=require('fs');
const app=fs.readFileSync('./app.js','utf8');
const css=fs.readFileSync('./styles.css','utf8');
function assert(c,m){if(!c)throw new Error(m)}
assert(app.includes('home-actions'),'home actions wrapper missing');
assert(app.includes('mode-kicker'),'mode kicker missing');
assert(app.includes('results-summary'),'results summary class missing');
assert(css.includes('.home-actions'),'home action styles missing');
assert(css.includes('.results-summary'),'results summary styles missing');
assert(css.includes('@media (max-width: 640px)'),'mobile cleanup missing');
console.log('UI QUALITY TEST PASSED');
