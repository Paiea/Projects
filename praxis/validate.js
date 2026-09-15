global.window=global;
require('./blueprint.js');
require('./questions.js');
require('./content-expansion.js');
const B=global.PRAXIS_BLUEPRINT,Q=global.PRAXIS_QUESTIONS;
function validateSet(code,n,seed){
  const items=Q.session(code,n,{seed}); const errors=[]; const pos=[0,0,0,0], domains={}, topics={}; const fps=new Set();
  let singleCount=0;
  items.forEach((q,i)=>{
    if(!q.stem||!q.explanation)errors.push(`${i}: missing stem/explanation`);
    const type=q.questionType||'mcq';
    if(type==='mcq'||type==='single-select'){
      singleCount++;
      if(!Array.isArray(q.choices)||q.choices.length!==4)errors.push(`${i}: choices malformed`);
      if(!Number.isInteger(q.correctIndex)||q.correctIndex<0||q.correctIndex>3)errors.push(`${i}: invalid answer`); else pos[q.correctIndex]++;
    }
    const key=type==='numeric-entry'?String(q.correctValue):type==='multi-select'?q.correctIndices:q.correctIndex;
    if(!Q.gradeAnswer(q,key))errors.push(`${i}: answer key does not grade correctly`);
    if(typeof Q.validateItem==='function'){const v=Q.validateItem(q);if(!v.ok)errors.push(`${i}: quality gate: ${v.reasons.join('; ')}`);}
    if(fps.has(q.id))errors.push(`${i}: duplicate id`); fps.add(q.id);
    domains[q.domain]=(domains[q.domain]||0)+1; topics[q.topic]=(topics[q.topic]||0)+1;
    if(q.subtest!==code)errors.push(`${i}: wrong subtest ${q.subtest}`);
  });
  return {code,n:items.length,singleCount,errors,answerPositions:pos,domains,topics};
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
  const max=Math.max(...r.answerPositions),min=Math.min(...r.answerPositions); if(max-min>r.singleCount*.18){ok=false;console.log('ERROR: answer-position imbalance too large');}
}
if(!ok)process.exit(1);
console.log('\nVALIDATION PASSED');
