const fs=require('fs'),vm=require('vm');global.window=global;for(const f of ['blueprint.js','questions.js','content-expansion.js'])vm.runInThisContext(fs.readFileSync(f,'utf8'));const Q=PRAXIS_QUESTIONS;
function ok(x,m){if(!x)throw new Error(m)}
function sig(stem=''){return stem.toLowerCase().replace(/\d+(?:\.\d+)?/g,'#').replace(/\$#/g,'#').replace(/\s+/g,' ').trim()}
for(const seed of [73191,101,202,303,404,505]){
 const m=Q.session('5003',50,{seed}); const types=m.reduce((a,x)=>(a[x.questionType]=(a[x.questionType]||0)+1,a),{});
 ok((types['multi-select']||0)>=3,`seed ${seed}: need >=3 multi-select, got ${types['multi-select']||0}`);
 ok((types['numeric-entry']||0)>=3,`seed ${seed}: need >=3 numeric-entry, got ${types['numeric-entry']||0}`);
 const sc={}; for(const x of m){const s=sig(x.stem);sc[s]=(sc[s]||0)+1;} ok(Math.max(...Object.values(sc))<=2,`seed ${seed}: semantic stem repeated >2: ${JSON.stringify(Object.entries(sc).filter(x=>x[1]>2))}`);
 const hard=m.filter(x=>x.difficulty==='hard');
 ok(!hard.some(x=>/^Solve \d+\(x \+ \d+\) = \d+\.$/.test(x.stem)),`seed ${seed}: trivial naked equation tagged hard`);
 ok(!hard.some(x=>/packs of 10 markers/.test(x.stem)),`seed ${seed}: trivial marker arithmetic tagged hard`);
}
for(const [code,n,cap] of [['5002',80,8],['5004',60,4],['5005',55,4]]){for(const seed of [111,222,333]){const m=Q.session(code,n,{seed}),fam={};m.forEach(x=>fam[x.family]=(fam[x.family]||0)+1);ok(Math.max(...Object.values(fam))<=cap,`${code} family cap >${cap}`);ok(m.filter(x=>x.cognitiveOperation!=='recall-procedure').length>=Math.floor(n*.7),`${code} reasoning share below 70%`);}}
console.log('ITERATION 5 TEST PASSED');
for(const seed of [73191,90909]){const m=Q.session('5003',50,{seed});const special=m.map((x,i)=>x.questionType!=='mcq'?i:-1).filter(i=>i>=0);ok(!(special[0]===0&&special[1]===1&&special[2]===2),'special item types are front-loaded');ok(!m.some(x=>x.questionType==='numeric-entry'&&/^Which\b/i.test(x.stem)),'numeric-entry prompt still uses choice wording');ok(!m.some(x=>x.family==='unit-choice'&&x.cognitiveOperation==='error-analysis'),'unit-choice misclassified as error analysis');}
console.log('ITERATION 5 EDITORIAL TEST PASSED');
