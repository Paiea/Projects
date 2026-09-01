'use strict';
const DEFAULT_ROSTER=['Student 01','Student 02','Student 03','Student 04','Student 05','Student 06','Student 07','Student 08','Student 09','Student 10','Student 11','Student 12','Student 13','Student 14','Student 15','Student 16','Student 17'];
const LEVELS=['FOUNDATION','BRIDGE','GRADE 2 TARGET'];
const SKILLS={
MATH:['COUNTING / QUANTITY','SUBITIZING','COMPOSE / DECOMPOSE','MAKE 10','TEEN NUMBERS','TENS + ONES','PLACE VALUE','COMPARE NUMBERS','HUNDRED CHART','NUMBER LINE','ADDITION WITHIN 20','SUBTRACTION WITHIN 20','ADDITION WITHIN 100','SUBTRACTION WITHIN 100','MISSING PART','WORD PROBLEMS','ODD / EVEN','SKIP COUNTING'],
READING:['PHONOLOGICAL AWARENESS','LETTER / SOUND','BLENDING','SEGMENTING','PHONICS PATTERN','WORD READING','HIGH-FREQUENCY WORDS','FLUENCY','PHRASE READING','SHORT COMPREHENSION']};
const store={get(k,f){try{const v=localStorage.getItem(k);return v?JSON.parse(v):f}catch(e){return f}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}};
let state={subject:'MATH',level:'BRIDGE',students:[],skill:'TENS + ONES',session:null,result:null,timer:null,timerRemaining:0};
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a} function pick(a){return a[rand(0,a.length-1)]} function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function roster(){return store.get('winRoster',DEFAULT_ROSTER)} function history(){return store.get('winHistory',[])} function groups(){return store.get('winGroups',[])}
function curriculumAssessments(){return store.get('winCurriculumAssessments',[])}
function curriculumAssessmentUid(){return 'curr_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8)}
function saveCurriculumAssessmentResult(input){
 const student=input?.studentId||input?.student||'';
 if(!isRealRosterStudent(student))return false;
 const responses=Array.isArray(input.responses)?input.responses.map((r,i)=>({questionNumber:r.questionNumber||i+1,section:r.section||'',prompt:r.prompt||'',studentAnswer:r.studentAnswer??null,expectedAnswer:r.expectedAnswer??null,correct:!!r.correct})):[];
 const vocabTotal=Number(input.vocabularyTotal??responses.filter(r=>r.section==='VOCABULARY').length),compTotal=Number(input.comprehensionTotal??responses.filter(r=>r.section==='COMPREHENSION').length);
 const vocabCorrect=Number(input.vocabularyCorrect??responses.filter(r=>r.section==='VOCABULARY'&&r.correct).length),compCorrect=Number(input.comprehensionCorrect??responses.filter(r=>r.section==='COMPREHENSION'&&r.correct).length);
 const total=vocabTotal+compTotal,correct=vocabCorrect+compCorrect,percent=total?Math.round(correct/total*100):0;
 const rec={id:input.id||curriculumAssessmentUid(),type:'CURRICULUM_ASSESSMENT',assessmentId:input.assessmentId||'big-red-lollipop',assessmentName:input.assessmentName||'BIG RED LOLLIPOP',studentId:student,studentName:input.studentName||student,date:input.date||new Date().toISOString(),vocabularyCorrect:vocabCorrect,vocabularyTotal:vocabTotal,comprehensionCorrect:compCorrect,comprehensionTotal:compTotal,totalCorrect:correct,totalItems:total,percent,responses};
 const arr=curriculumAssessments();arr.unshift(rec);store.set('winCurriculumAssessments',arr.slice(0,300));return rec;
}
window.Room22CurriculumAssessmentResults={save:saveCurriculumAssessmentResult,list:curriculumAssessments};
function fmtDate(iso){const d=new Date(iso);return d.toLocaleDateString(undefined,{month:'short',day:'numeric'})}
function setScreen(id){$$('.screen').forEach(x=>x.classList.remove('active'));$('#'+id).classList.add('active');$$('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.screen===id));if(id==='history')renderHistory();if(id==='settings')renderSettings();if(id==='morning')loadMorning();if(id==='teach')loadTeach();window.scrollTo(0,0)}
$$('.nav button').forEach(b=>b.onclick=()=>setScreen(b.dataset.screen));
// SHOW WHAT YOU KNOW — bounded Q1 Level 3 proficiency mode inside WIN.
// Legacy winPrechecks data is deliberately left untouched for backward data preservation.
const PROF_SPECIAL={DEMO:'__ROOM22_DEMO__',CUSTOM:'__ROOM22_CUSTOM__'};
function isRealRosterStudent(student){return !!student&&roster().includes(student)}
function profIdentityLabel(student){if(student===PROF_SPECIAL.DEMO)return 'MR. FRANK — DEMO / TEACH';if(student===PROF_SPECIAL.CUSTOM)return 'CUSTOM — NO STUDENT';return student||''}
function isSpecialProfIdentity(student){return student===PROF_SPECIAL.DEMO||student===PROF_SPECIAL.CUSTOM}
const PROF_STANDARDS={
 '2.OA.B.2':{name:'ADD & SUBTRACT TO 20',studentName:'Add & Subtract to 20',timer:240,minEarly:7,total:8,components:['ADDITION','SUBTRACTION','MISSING PART / RELATED FACT','EFFICIENT STRATEGY'],counts:{'ADDITION':2,'SUBTRACTION':2,'MISSING PART / RELATED FACT':2,'EFFICIENT STRATEGY':2},requiredCorrect:7,winDefault:'ADDITION WITHIN 20'},
 '2.OA.C.3':{name:'ODD & EVEN',studentName:'Odd & Even',timer:240,minEarly:7,total:8,components:['IDENTIFY ODD / EVEN','OBJECT GROUP','TWO EQUAL GROUPS','TWO EQUAL ADDENDS'],counts:{'IDENTIFY ODD / EVEN':2,'OBJECT GROUP':2,'TWO EQUAL GROUPS':2,'TWO EQUAL ADDENDS':2},requiredCorrect:7,winDefault:'ODD / EVEN'},
 '2.OA.A.1':{name:'STORY PROBLEMS',studentName:'Story Problems',timer:360,minEarly:6,total:8,components:['PROBLEM SITUATION','TWO-STEP REASONING','UNKNOWN POSITION','EQUATION REPRESENTATION','MODEL / REPRESENTATION'],counts:{'PROBLEM SITUATION':1,'TWO-STEP REASONING':2,'UNKNOWN POSITION':2,'EQUATION REPRESENTATION':2,'MODEL / REPRESENTATION':1},requiredCorrect:7,winDefault:'WORD PROBLEMS'},
 '2.NBT.B.5':{name:'ADD & SUBTRACT TO 100',studentName:'Add & Subtract to 100',timer:300,minEarly:7,total:8,components:['ADDITION NO REGROUPING','ADDITION WITH REGROUPING','SUBTRACTION NO REGROUPING','SUBTRACTION WITH REGROUPING','PLACE-VALUE STRATEGY'],counts:{'ADDITION NO REGROUPING':1,'ADDITION WITH REGROUPING':2,'SUBTRACTION NO REGROUPING':1,'SUBTRACTION WITH REGROUPING':2,'PLACE-VALUE STRATEGY':2},requiredCorrect:7,winDefault:'ADDITION WITHIN 100'},
 '2.MD.10':{name:'GRAPHS',studentName:'Graphs',timer:300,minEarly:6,total:8,components:['READ PICTURE GRAPH','READ BAR GRAPH','REPRESENT DATA','PUT TOGETHER / TAKE APART','COMPARE'],counts:{'READ PICTURE GRAPH':1,'READ BAR GRAPH':1,'REPRESENT DATA':2,'PUT TOGETHER / TAKE APART':2,'COMPARE':2},requiredCorrect:7,winDefault:'COMPARE NUMBERS'}
};
let profState={student:'',standard:null,items:[],responses:[],index:0,selected:null,startTime:null,endTime:null,timerRemaining:240,timerId:null,result:null,attempt:null};
function proficiencyAttempts(){return store.get('winProficiencyAttempts',[])}
function proficiencyStatuses(){return store.get('winProficiencyStatus',{})}
function profUid(){return 'prof_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8)}
function profStatusKey(student,standard){return `${student}||${standard}`}
function currentProficiency(student,standard){if(!isRealRosterStudent(student))return null;return proficiencyStatuses()[profStatusKey(student,standard)]||null}
function profUnique(a){return [...new Set(a.map(x=>String(x)))]}
function profDistractors(correct,candidates){const c=String(correct),out=[];for(const x of candidates){const s=String(x);if(s!==c&&!out.includes(s))out.push(s);if(out.length===3)break}let n=1;while(out.length<3){const s=String(Number.isFinite(+c)?Math.max(0,+c+n):`Choice ${n+1}`);if(s!==c&&!out.includes(s))out.push(s);n++}return out}
function profMC(standard,category,prompt,correct,distractors,visualHtml='',meta={}){
 correct=String(correct);const pool=profDistractors(correct,distractors);const choices=shuffle([correct,...pool]);if(profUnique(choices).length!==4||choices.filter(x=>x===correct).length!==1)throw new Error('Malformed proficiency choices');
 return {id:profUid(),standard,category,prompt,choices,expectedAnswer:correct,visualHtml,meta};
}
function profDotsHtml(n){return `<div class="precheck-dots">${Array.from({length:n},()=>'<span class="precheck-dot"></span>').join('')}</div>`}
function profTwoGroupsHtml(a,b){return `<div style="display:flex;gap:34px;justify-content:center;align-items:center"><div class="precheck-dots" style="max-width:150px">${Array.from({length:a},()=>'<span class="precheck-dot"></span>').join('')}</div><div class="precheck-dots" style="max-width:150px">${Array.from({length:b},()=>'<span class="precheck-dot"></span>').join('')}</div></div>`}
function profBarModelHtml(parts){const total=parts.reduce((a,b)=>a+b,0);return `<div style="display:flex;justify-content:center;max-width:560px;margin:auto">${parts.map((p,i)=>`<div style="flex:${p};min-width:70px;border:3px solid #405457;padding:14px 8px;font-weight:900;background:${i%2?'#eef4f3':'#fff'}">${p}</div>`).join('')}</div><div class="small" style="margin-top:7px">Total: ${total}</div>`}
function profGraphHtml(data,type='bar',hideIndex=-1){
 const entries=data.labels.map((label,i)=>({label,value:data.values[i]}));
 if(type==='picture')return `<div style="display:grid;gap:9px;max-width:650px;margin:auto;text-align:left">${entries.map((e,i)=>`<div style="display:grid;grid-template-columns:110px 1fr;gap:10px;align-items:center"><b>${esc(e.label)}</b><div style="font-size:25px;letter-spacing:4px">${i===hideIndex?'?':Array.from({length:e.value},()=> '●').join('')}</div></div>`).join('')}</div><div class="small">Each ● = 1</div>`;
 const max=Math.max(...data.values,10);return `<div style="display:flex;gap:16px;align-items:flex-end;justify-content:center;height:220px;border-left:3px solid #536568;border-bottom:3px solid #536568;padding:10px 12px 0">${entries.map((e,i)=>`<div style="width:76px;text-align:center;align-self:stretch;display:flex;flex-direction:column;justify-content:flex-end"><div style="font-weight:900;margin-bottom:4px">${i===hideIndex?'?':e.value}</div><div style="height:${i===hideIndex?18:Math.round(e.value/max*150)}px;background:#50777a;border-radius:5px 5px 0 0"></div><div style="font-size:12px;font-weight:800;margin-top:6px">${esc(e.label)}</div></div>`).join('')}</div><div class="small">Single-unit scale · each step = 1</div>`
}
function addItem(category,variant){
 if(category==='ADDITION'){if(variant===0){let a=rand(4,10),b=rand(3,9);while(a+b>20)b=rand(2,20-a);let n=a+b;return profMC('2.OA.B.2',category,`${a} + ${b} = ?`,n,[n-1,n+1,Math.abs(a-b)])}let a=rand(5,10),b=rand(3,9);while(a+b>20)b=rand(2,20-a);let n=a+b;return profMC('2.OA.B.2',category,`Which equation has a sum of ${n}?`,`${a} + ${b}`,[`${a} + ${Math.max(1,b-1)}`,`${Math.max(1,a-2)} + ${b}`,`${n} + 1`])}
 if(category==='SUBTRACTION'){if(variant===0){let whole=rand(11,20),take=rand(3,whole-3),n=whole-take;return profMC('2.OA.B.2',category,`${whole} − ${take} = ?`,n,[n-1,n+1,take])}let whole=rand(12,20),left=rand(4,whole-4),take=whole-left;return profMC('2.OA.B.2',category,`Which subtraction equation equals ${left}?`,`${whole} − ${take}`,[`${whole} − ${Math.max(1,take-1)}`,`${whole-1} − ${take}`,`${left} − ${take}`])}
 if(category==='MISSING PART / RELATED FACT'){if(variant===0){let whole=rand(11,20),part=rand(3,whole-3),missing=whole-part;return profMC('2.OA.B.2',category,`___ + ${part} = ${whole}`,missing,[missing-1,missing+1,part])}let a=rand(4,9),b=rand(3,9);while(a+b>20)b=rand(2,20-a);let whole=a+b;return profMC('2.OA.B.2',category,`Which fact helps you find ${whole} − ${a}?`,`${a} + ${b} = ${whole}`,[`${a} + ${Math.max(1,b-1)} = ${whole-1}`,`${Math.max(1,a-1)} + ${b} = ${whole}`,`${b} + ${a} = ${whole-1}`])}
 if(variant===0){let a=pick([8,9]),b=rand(4,8),need=10-a,rest=b-need;return profMC('2.OA.B.2',category,`Which equation shows a make-10 way to solve ${a} + ${b}?`,`${a} + ${need} + ${rest}`,[`${a} + ${b} + ${need}`,`${a} + ${need} + ${b}`,`10 + ${b}`])}let a=pick([8,9]),b=rand(4,8),need=10-a;return profMC('2.OA.B.2',category,`What is a helpful first move for ${a} + ${b}?`,`Move ${need} from ${b} to ${a} to make 10.`,[`Add 10 to both numbers.`,`Subtract ${need} from both numbers.`,`Ignore the ${b} and use ${a}.`])
}
function oddEvenItem(category,variant){
 if(category==='IDENTIFY ODD / EVEN'){let n=rand(5,20),correct=n%2===0?'EVEN':'ODD';return profMC('2.OA.C.3',category,`Is ${n} odd or even?`,correct,[correct==='EVEN'?'ODD':'EVEN','BOTH','NEITHER'])}
 if(category==='OBJECT GROUP'){let n=rand(6,20),correct=n%2===0?'EVEN':'ODD';return profMC('2.OA.C.3',category,'Look at the group. Is the number of dots odd or even?',correct,[correct==='EVEN'?'ODD':'EVEN','BOTH','NEITHER'],profDotsHtml(n),{count:n})}
 if(category==='TWO EQUAL GROUPS'){let n=2*rand(3,10),half=n/2;if(variant===0)return profMC('2.OA.C.3',category,`Which split shows ${n} in TWO equal groups?`,`${half} and ${half}`,[`${half-1} and ${half+1}`,`${half-2} and ${half+2}`,`${n} and 0`]);return profMC('2.OA.C.3',category,'Which picture shows TWO equal groups?',`${half} and ${half}`,[`${half-1} and ${half+1}`,`${half} and ${half+1}`,`${half-2} and ${half+1}`],profTwoGroupsHtml(half,half),{groups:[half,half]})}
 let half=rand(3,10),n=half*2;if(variant===0)return profMC('2.OA.C.3',category,`Which equation proves ${n} is even?`,`${half} + ${half} = ${n}`,[`${half-1} + ${half+1} = ${n}`,`${n} + 0 = ${n}`,`${half} + ${half+1} = ${n+1}`]);return profMC('2.OA.C.3',category,`Which number can be written as two EQUAL addends: ${half} + ${half}?`,n,[n-1,n+1,half])
}
const STORY_NAMES=['Maya','Noah','Lena','Kai','Ari','Milo','Zoe','Leo'];
const STORY_OBJECTS=['stickers','shells','books','crayons','cards','toy cars','flowers','marbles'];
function storyCore(kind='addThenSubtract'){
 const name=pick(STORY_NAMES),obj=pick(STORY_OBJECTS);let start=rand(18,45),a=rand(6,18),b=rand(4,14),mid,final,story,equation;
 if(kind==='addThenSubtract'){mid=start+a;b=Math.min(b,mid-5);final=mid-b;story=`${name} had ${start} ${obj}. ${name} got ${a} more, then gave away ${b}. How many ${obj} are left?`;equation=`${start} + ${a} − ${b} = ${final}`}
 else if(kind==='subtractThenAdd'){a=Math.min(a,start-6);mid=start-a;final=mid+b;story=`${name} had ${start} ${obj}. ${name} used ${a}, then found ${b} more. How many ${obj} does ${name} have now?`;equation=`${start} − ${a} + ${b} = ${final}`}
 else {const group1=rand(12,28),group2=rand(8,24);a=rand(4,10);mid=group1+group2;final=mid-a;story=`${name} put ${group1} red ${obj} and ${group2} blue ${obj} together. Then ${a} ${obj} were moved away. How many remain?`;start=group1;b=group2;equation=`${group1} + ${group2} − ${a} = ${final}`}
 return {name,obj,start,a,b,mid,final,story,equation,kind};
}
