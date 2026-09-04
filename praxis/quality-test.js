global.window=global;
require('./blueprint.js');
require('./questions.js');
require('./content-expansion.js');
const B=global.PRAXIS_BLUEPRINT,Q=global.PRAXIS_QUESTIONS;
function assert(cond,msg){if(!cond)throw new Error(msg)}

// Known duplicate-answer regression from first real user run.
const collision={subtest:'5003',domain:'math-number',topic:'place-value',skill:'rounding',family:'rounding',stem:'Round 7,104 to the nearest hundred.',choices:['7100','7100','7200','7100'],correctIndex:0,explanation:'7,104 rounds to 7,100.'};
assert(typeof Q.validateItem==='function','Q.validateItem must exist');
const collisionResult=Q.validateItem(collision);
assert(!collisionResult.ok,'duplicate/equivalent answer collision must be rejected');

// Generated item integrity.
for(let seed=1;seed<=40;seed++){
  const items=Q.session('5003',50,{seed});
  assert(items.length===50,`seed ${seed}: expected 50 items, got ${items.length}`);
  for(const item of items){
    const v=Q.validateItem(item);
    assert(v.ok,`seed ${seed}: invalid item ${item.id}: ${v.reasons.join('; ')}`);
  }
}

// Hard reasoning families must be represented in the generator across a broad sample.
const requiredFamilies=new Set([
  'convert-divide-remainder','multistep-rational-context','percent-ratio-context',
  'estimate-reasonableness','model-and-solve','linear-representation','dimension-change',
  'coordinate-computation','elapsed-multistep','center-data-change','graph-interpretation','compound-probability'
]);
const seen=new Set();
for(let seed=100;seed<220;seed++){
  for(const item of Q.session('5003',20,{seed})) seen.add(item.family);
}
for(const fam of requiredFamilies) assert(seen.has(fam),`missing hard family: ${fam}`);

// Full mock composition quality.
const expectedDomains={'math-number':20,'math-algebra':15,'math-geo':15};
for(let seed=500;seed<520;seed++){
  const items=Q.session('5003',50,{seed});
  const domains={},diff={},families={};
  for(const q of items){
    domains[q.domain]=(domains[q.domain]||0)+1;
    diff[q.difficulty]=(diff[q.difficulty]||0)+1;
    families[q.family]=(families[q.family]||0)+1;
  }
  for(const [d,n] of Object.entries(expectedDomains)) assert(domains[d]===n,`seed ${seed}: domain ${d} expected ${n}, got ${domains[d]||0}`);
  assert((diff.easy||0)<=6,`seed ${seed}: too many easy items: ${diff.easy||0}`);
  assert((diff.hard||0)>=17,`seed ${seed}: too few hard items: ${diff.hard||0}`);
  assert(Math.max(...Object.values(families))<=3,`seed ${seed}: family repetition cap exceeded: ${JSON.stringify(families)}`);
  assert(new Set(items.map(q=>q.topic)).size>=10,`seed ${seed}: too little topic breadth`);
}

console.log('QUALITY TEST PASSED');

// PrepSaret calibration coverage: every major study section should have at least one
// reasoning family represented across a broad generated sample. These are original
// items calibrated to the user-provided study guide, not copied quiz questions.
const calibrationFamilies={
  'place-value':['expanded-form-reasoning','power-ten-representation'],
  'rational-operations':['inverse-operation-reasoning','fraction-magnitude-reasoning'],
  'factors-multiples':['prime-composite-reasoning'],
  'fractions-decimals':['unit-rate-comparison','proportion-solve'],
  'estimation':['estimate-reasonableness'],
  'expressions':['verbal-algebra-translation','formula-unknown','variable-role'],
  'linear':['multistep-linear-equation','inequality-solution-meaning','linear-representation'],
  'patterns':['function-table-rule','pattern-generalization'],
  'geometry':['angle-classification','net-reasoning','perimeter-area-context','dimension-change'],
  'measurement':['unit-choice','measurement-tool','elapsed-multistep'],
  'data-statistics':['statistical-question','center-data-change','median-outlier'],
  'probability':['likelihood-interpretation','simple-probability']
};
const calibrationSeen={};
for(let seed=900;seed<1500;seed++){
  for(const topic of Object.keys(calibrationFamilies)){
    const domain=B.topics['5003'].find(t=>t.id===topic).domain;
    const q=Q.generateOne('5003',domain,topic,seed,0);
    if(q)(calibrationSeen[topic]??=new Set()).add(q.family);
  }
}
for(const [topic,families] of Object.entries(calibrationFamilies)){
  for(const fam of families) assert(calibrationSeen[topic]?.has(fam),`calibration gap ${topic}: missing ${fam}`);
}
console.log('PREPSARET CALIBRATION COVERAGE PASSED');
