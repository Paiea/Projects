global.window=global;
require('./blueprint.js');
require('./questions.js');
require('./content-expansion.js');
const Q=global.PRAXIS_QUESTIONS;
function sim(code,n,seed,recent=[]){return Q.session(code,n,{seed,recentFingerprints:recent});}
for(const code of ['5002','5003','5004','5005']){
  const n=global.PRAXIS_BLUEPRINT.config.subtests[code].questions;
  const a=sim(code,n,11111);
  const b=sim(code,n,22222,a.map(x=>x.fingerprint));
  const fpA=new Set(a.map(x=>x.fingerprint));
  const overlap=b.filter(x=>fpA.has(x.fingerprint)).length;
  const families=new Set(a.map(x=>x.family||x.skill));
  console.log(code,'full A=',a.length,'full B=',b.length,'fingerprint overlap=',overlap,'families/skills=',families.size);
  if(a.length!==n||b.length!==n||overlap>Math.ceil(n*.10))process.exitCode=1;
}
