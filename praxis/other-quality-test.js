global.window=global;
require('./blueprint.js');
require('./questions.js');
require('./content-expansion.js');
const Q=global.PRAXIS_QUESTIONS;
function assert(cond,msg){if(!cond)throw new Error(msg)}

const specs={
  '5002':{n:80,minHard:20,maxFamily:9,required:['passage-inference-evidence','revision-purpose-audience','phonics-diagnostic','source-evaluation']},
  '5004':{n:60,minHard:20,maxFamily:5,required:['cause-effect-history','civic-scenario','geography-evidence','economics-scenario']},
  '5005':{n:55,minHard:20,maxFamily:5,required:['experiment-design','evidence-conclusion','systems-cause-effect','model-application']}
};

for(const [code,s] of Object.entries(specs)){
  const seen=new Set();
  for(let seed=100;seed<130;seed++){
    const items=Q.session(code,s.n,{seed});
    assert(items.length===s.n,`${code} seed ${seed}: wrong length ${items.length}`);
    const diff={}, fam={};
    for(const item of items){
      assert(item.family,`${code}: missing family`);
      assert(item.difficulty,`${code}: missing difficulty`);
      if(typeof Q.validateItem==='function'){
        const v=Q.validateItem(item); assert(v.ok,`${code}: invalid item ${item.id}: ${v.reasons.join('; ')}`);
      }
      seen.add(item.family);
      diff[item.difficulty]=(diff[item.difficulty]||0)+1;
      fam[item.family]=(fam[item.family]||0)+1;
    }
    assert((diff.hard||0)>=s.minHard,`${code} seed ${seed}: only ${diff.hard||0} hard items`);
    assert(Math.max(...Object.values(fam))<=s.maxFamily,`${code} seed ${seed}: family cap exceeded ${JSON.stringify(fam)}`);
  }
  for(const f of s.required) assert(seen.has(f),`${code}: missing reasoning family ${f}`);
}
console.log('OTHER SUBJECT QUALITY TEST PASSED');
