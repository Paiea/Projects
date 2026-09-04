global.window=global;require('./blueprint.js');require('./questions.js');require('./content-expansion.js');
const Q=global.PRAXIS_QUESTIONS; function a(x,m){if(!x)throw Error(m)}
const required={'5002':['ets-phoneme-count','ets-select-two-syllables','ets-most-appropriate-fluency','ets-revision-best'],'5003':['ets-property-recognition','ets-best-estimate','ets-could-be-product','ets-select-all-number'],'5004':['ets-civics-direct','ets-map-type','ets-source-inference','ets-econ-application'],'5005':['ets-earth-process','ets-select-three-adaptation','ets-lab-instrument']};
for(const [st,fams] of Object.entries(required)){const n={5002:80,5003:50,5004:60,5005:55}[st];const q=Q.session(st,n,{seed:8801});const got=new Set(q.map(x=>x.family));fams.forEach(f=>a(got.has(f),`${st} missing ETS-style family ${f}`));}
const m=Q.session('5003',50,{seed:8801});a(m.some(x=>/Select ALL that apply/i.test(x.stem)),'5003 needs Select ALL');a(m.some(x=>/best estimate|approximately/i.test(x.stem)),'5003 needs approximation wording');
const rla=Q.session('5002',80,{seed:8801});a(rla.some(x=>/Which TWO/i.test(x.stem)),'5002 needs Which TWO');
const sci=Q.session('5005',55,{seed:8801});a(sci.some(x=>/Which THREE/i.test(x.stem)),'5005 needs Which THREE');
console.log('ITERATION 8 PRAXIS-METHOD TEST PASSED');
