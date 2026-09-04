const fs=require('fs'),vm=require('vm');global.window=global;vm.runInThisContext(fs.readFileSync('blueprint.js','utf8'));vm.runInThisContext(fs.readFileSync('questions.js','utf8'));vm.runInThisContext(fs.readFileSync('content-expansion.js','utf8'));
const Q=global.PRAXIS_QUESTIONS;
function ok(x,m){if(!x)throw new Error(m)}
ok(typeof Q.gradeAnswer==='function','gradeAnswer missing');
ok(Q.gradeAnswer({questionType:'mcq',correctIndex:1,choices:['a','b']},1),'mcq grading');
ok(Q.gradeAnswer({questionType:'multi-select',correctIndices:[0,2],choices:['a','b','c']},[2,0]),'multi grading order-independent');
ok(!Q.gradeAnswer({questionType:'multi-select',correctIndices:[0,2],choices:['a','b','c']},[0]),'multi partial must fail');
ok(Q.gradeAnswer({questionType:'numeric-entry',correctValue:2.5,tolerance:0.001},'2.5'),'numeric grading');
ok(Q.validateItem({questionType:'multi-select',stem:'x',choices:['a','b','c'],correctIndices:[0,2]}).ok,'multi validation');
ok(Q.validateItem({questionType:'numeric-entry',correctValue:2.5,stem:'x'}).ok,'numeric validation');
const m=Q.session('5003',50,{seed:73191});ok(m.length===50,'5003 length');const types=new Set(m.map(x=>x.questionType));ok(types.has('multi-select'),'5003 full mock lacks multi-select');ok(types.has('numeric-entry'),'5003 full mock lacks numeric-entry');
const dc={};m.forEach(x=>dc[x.domain]=(dc[x.domain]||0)+1);ok(Object.values(dc).sort((a,b)=>a-b).join(',')==='15,15,20','5003 quota drift');
console.log('FIDELITY TEST PASSED',Object.fromEntries([...types].map(t=>[t,m.filter(x=>x.questionType===t).length])));
