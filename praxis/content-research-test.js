// Regression: wrong syllable key, seed-disguised repeats, stale feedback metadata.
const assert = require('node:assert/strict');
global.window = global;
require('./blueprint.js'); require('./questions.js'); require('./content-expansion.js');
const Q = global.PRAXIS_QUESTIONS;
const sizes = {5002:80,5003:50,5004:60,5005:55};
const errors = [];
function check(test) { try { test(); } catch (e) { errors.push(e.message); } }
for(const [st,topic] of [['5002','phonics-word-analysis'],['5004','economics'],['5005','ecosystems']]){
  const q=Q.session(st,10,{seed:1,topic}).filter(x=>x.sourceClass==='ORIGINAL_ETS_STYLE');
  check(()=>assert.equal(new Set(q.map(x=>x.stem)).size,q.length,`${st}: fixed questions repeated within targeted practice`));
}
const seen=new Set();
for(const [st,topics] of Object.entries(global.PRAXIS_BLUEPRINT.topics)){
  for(const topic of topics)for(let seed=1;seed<=120;seed++){
    const q=Q.generateOne(st,topic.domain,topic.id,seed);
    if(q?.sourceClass!=='ORIGINAL_ETS_STYLE')continue;
    seen.add(q.family);
    check(()=>assert.equal(q.topic,topic.id,'Targeted item must belong to requested topic'));
    const key=q.questionType==='numeric-entry'?String(q.correctValue):q.questionType==='multi-select'?q.correctIndices:q.correctIndex;
    check(()=>assert(Q.gradeAnswer(q,key),`${q.family}: shuffled key must grade correctly`));
    if(q.questionType==='multi-select')check(()=>assert(!Q.gradeAnswer(q,q.correctIndices.slice(1)),`${q.family}: partial set must fail`));
    if(q.family==='ets-numeric-entry-context')check(()=>assert(Q.gradeAnswer(q,'3.00')&&!Q.gradeAnswer(q,'300'), 'Area conversion must be 3 square meters'));
    if(q.family==='cycle-numeric-entry-equation')check(()=>assert(Q.gradeAnswer(q,'7')&&!Q.gradeAnswer(q,'9.333'), 'Rental equation must be 7 hours'));
  }
}
check(()=>assert.equal(seen.size,36,'All reviewed items must be reachable in targeted practice'));
const rla = Q.session('5002',80,{seed:8801});
check(() => {
  const q = rla.find(x=>x.family==='ets-select-two-syllables');
  const answers = q.correctIndices.map(i=>q.choices[i]);
  assert(!answers.includes('robot'),'robot must not be keyed as a closed first syllable');
});
for (const [st,n] of Object.entries(sizes)) {
  const first = Q.session(st,n,{seed:8801});
  const second = Q.session(st,n,{seed:8802,recentFingerprints:first.map(x=>x.fingerprint)});
  const methods = first.filter(x=>x.sourceClass==='ORIGINAL_ETS_STYLE');
  check(()=>assert(methods.length>=8,`${st}: expected reviewed method coverage`));
  for (const q of methods) {
    check(()=>assert(Q.validateItem(q).ok,`${st}/${q.family}: invalid final item`));
    check(()=>assert(!second.some(x=>x.stem===q.stem),`${st}/${q.family}: identical question bypassed replay protection`));
    if(q.questionType!=='numeric-entry') {
      check(()=>assert.equal(q.distractorRationale?.length,q.choices.length,`${q.family}: rationale count`));
      check(()=>assert(q.distractorRationale.every(x=>typeof x==='string'&&x.length>15),`${q.family}: missing option-specific reasoning`));
    }
  }
}
if(errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('CONTENT RESEARCH REGRESSIONS PASSED');
