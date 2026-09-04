global.window=global;require('./blueprint.js');require('./questions.js');require('./content-expansion.js');
const Q=global.PRAXIS_QUESTIONS; function a(x,m){if(!x)throw Error(m)}
const cfg={5002:{n:80,maxFam:8,minDistinct:20,required:['text-structure-analysis','morphology-analysis','revision-cohesion','discussion-evidence'],minErr:3,minRep:7},5004:{n:60,maxFam:3,minDistinct:40,required:['primary-source-reasoning','chronology-change','map-reasoning','economic-tradeoff'],minErr:2,minRep:8},5005:{n:55,maxFam:3,minDistinct:38,required:['variable-diagnosis','data-pattern','mechanism-explanation','evidence-revision'],minErr:3,minRep:7}};
for(const [st,c] of Object.entries(cfg)) for(let seed=700;seed<705;seed++){
 const q=Q.session(st,c.n,{seed}), fam={},cog={}; a(q.length===c.n,`${st} length`);
 q.forEach(x=>{fam[x.family]=(fam[x.family]||0)+1;cog[x.cognitiveOperation]=(cog[x.cognitiveOperation]||0)+1;a(Q.validateItem(x).ok,`${st} invalid ${x.id}`)});
 a(Math.max(...Object.values(fam))<=c.maxFam,`${st} family repetition ${JSON.stringify(fam)}`);
 a(Object.keys(fam).length>=c.minDistinct,`${st} breadth ${Object.keys(fam).length}`);
 a((cog['error-analysis']||0)>=c.minErr,`${st} error analysis ${JSON.stringify(cog)}`);
 a((cog['representation-model']||0)>=c.minRep,`${st} representation ${JSON.stringify(cog)}`);
 c.required.forEach(f=>a(fam[f],`${st} missing ${f}`));
}
console.log('ITERATION 7 FIFTEEN-UPDATE TEST PASSED');
