global.window=global;
require('./blueprint.js');
require('./questions.js');
require('./content-expansion.js');
const B=global.PRAXIS_BLUEPRINT,Q=global.PRAXIS_QUESTIONS;
function validateSet(code,n,seed){
  const items=Q.session(code,n,{seed}); const errors=[]; const pos=[0,0,0,0], domains={}, topics={}; const fps=new Set();
  items.forEach((q,i)=>{
    if(!q.stem||!q.explanation)errors.push(`${i}: missing stem/explanation`);
    if(!Array.isArray(q.choices)||q.choices.length!==4)errors.push(`${i}: choices malformed`);
    if(q.correctIndex<0||q.correctIndex>3)errors.push(`${i}: invalid answer`); else pos[q.correctIndex]++;
    if(!q.choices[q.correctIndex])errors.push(`${i}: correct choice missing`);
    if(typeof Q.validateItem==='function'){const v=Q.validateItem(q);if(!v.ok)errors.push(`${i}: quality gate: ${v.reasons.join('; ')}`);}
    if(fps.has(q.id))errors.push(`${i}: duplicate id`); fps.add(q.id);
    domains[q.domain]=(domains[q.domain]||0)+1; topics[q.topic]=(topics[q.topic]||0)+1;
    if(q.subtest!==code)errors.push(`${i}: wrong subtest ${q.subtest}`);
  });
  return {code,n:items.length,errors,answerPositions:pos,domains,topics};
}
const reports=['5002','5003','5004','5005'].map((c,i)=>validateSet(c,100,91001+i*100));
reports.push(validateSet('5003',1000,88003));
let ok=true;
for(const r of reports){
  console.log(`\n${r.code} sample n=${r.n}`);
  console.log('answer positions',r.answerPositions);
  console.log('domains',r.domains);
  console.log('topics',r.topics);
  if(r.errors.length){ok=false;console.log('ERRORS',r.errors.slice(0,20));}
  const max=Math.max(...r.answerPositions),min=Math.min(...r.answerPositions); if(max-min>r.n*.18){ok=false;console.log('ERROR: answer-position imbalance too large');}
}
if(!ok)process.exit(1);
console.log('\nVALIDATION PASSED');
