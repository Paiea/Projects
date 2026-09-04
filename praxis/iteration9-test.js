global.window=global;require('./blueprint.js');require('./questions.js');require('./content-expansion.js');
const Q=global.PRAXIS_QUESTIONS; function a(x,m){if(!x)throw Error(m)}
const req={
'5002':['ets-phoneme-manipulation','ets-text-evidence','ets-order-writing'],
'5003':['ets-remainder-meaning','ets-equivalent-representations','ets-numeric-entry-context'],
'5004':['ets-chronology-cause','ets-source-purpose','ets-geography-pattern'],
'5005':['ets-variable-control','ets-data-table','ets-model-prediction']};
for(const [st,fams] of Object.entries(req)){const n={5002:80,5003:50,5004:60,5005:55}[st];const q=Q.session(st,n,{seed:9901});const got=new Set(q.map(x=>x.family));fams.forEach(f=>a(got.has(f),`${st} missing ${f}`));}
const r=Q.session('5002',80,{seed:9901});a(r.some(x=>x.family==='ets-order-writing'&&x.questionType==='multi-select'),'5002 sequence-method practice missing');
const m=Q.session('5003',50,{seed:9901});a(m.some(x=>x.family==='ets-numeric-entry-context'&&x.questionType==='numeric-entry'),'5003 numeric-entry method missing');
console.log('ITERATION 9 METHOD-CONTENT TEST PASSED');
