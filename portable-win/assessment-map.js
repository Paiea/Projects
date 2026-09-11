(function(root){
  const CURRICULUM_GROUPS={
    'CORE-NUMBER-SENSE':{id:'CORE-NUMBER-SENSE',name:'Core Number Sense & Operations',provisionalMap:true},
    'PLACE-VALUE-1000':{id:'PLACE-VALUE-1000',name:'Place Value to 1,000',provisionalMap:true},
    'ADD-SUBTRACT-EXTENDED':{id:'ADD-SUBTRACT-EXTENDED',name:'Addition & Subtraction',provisionalMap:true},
    'MEASUREMENT-NUMBER-LINES':{id:'MEASUREMENT-NUMBER-LINES',name:'Measurement & Number Lines',provisionalMap:true},
    'TIME-MONEY-DATA':{id:'TIME-MONEY-DATA',name:'Time, Money & Data',provisionalMap:true},
    'GEOMETRY-EQUAL-SHARES':{id:'GEOMETRY-EQUAL-SHARES',name:'Geometry & Equal Shares',provisionalMap:true}
  };

  const QUARTERS={
    Q1:{id:'Q1',name:'Quarter 1'},Q2:{id:'Q2',name:'Quarter 2'},Q3:{id:'Q3',name:'Quarter 3'},Q4:{id:'Q4',name:'Quarter 4'}
  };

  function def(id,name,reportArea,curriculumGroup,quarters,options={}){
    const components=options.components||[];
    const counts=options.counts||Object.fromEntries(components.map(c=>[c,2]));
    const total=options.total||Object.values(counts).reduce((a,b)=>a+b,0)||6;
    return{
      id,subject:'MATH',name,studentName:options.studentName||name,
      reportArea,curriculumGroup,quarters:[...quarters],
      priority:!!options.priority,prioritySource:options.priority?'CURRENT_Q1_PRIORITY':'',
      assessmentReady:!!options.assessmentReady,provisionalMap:options.provisionalMap!==false,
      legacy:!!options.legacy,legacyId:options.legacyId||id,
      timer:options.timer||300,minEarly:options.minEarly||Math.max(4,total-1),total,
      components,counts,requiredCorrect:options.requiredCorrect||Math.max(1,total-1),
      winDefault:options.winDefault||'TENS + ONES',description:options.description||''
    };
  }

  const STANDARDS={
    '2.OA.A.1':def('2.OA.A.1','Story Problems','Operations and Algebraic Thinking','CORE-NUMBER-SENSE',['Q1'],{priority:true,assessmentReady:true,legacy:true,timer:360,minEarly:6,total:8,components:['PROBLEM SITUATION','TWO-STEP REASONING','UNKNOWN POSITION','EQUATION REPRESENTATION','MODEL / REPRESENTATION'],counts:{'PROBLEM SITUATION':1,'TWO-STEP REASONING':2,'UNKNOWN POSITION':2,'EQUATION REPRESENTATION':2,'MODEL / REPRESENTATION':1},requiredCorrect:7,winDefault:'WORD PROBLEMS'}),
    '2.OA.B.2':def('2.OA.B.2','Add & Subtract to 20','Operations and Algebraic Thinking','CORE-NUMBER-SENSE',['Q1'],{priority:true,assessmentReady:true,legacy:true,timer:240,minEarly:7,total:8,components:['ADDITION','SUBTRACTION','MISSING PART / RELATED FACT','EFFICIENT STRATEGY'],counts:{'ADDITION':2,'SUBTRACTION':2,'MISSING PART / RELATED FACT':2,'EFFICIENT STRATEGY':2},requiredCorrect:7,winDefault:'ADDITION WITHIN 20'}),
    '2.OA.C.3':def('2.OA.C.3','Odd & Even','Operations and Algebraic Thinking','CORE-NUMBER-SENSE',['Q1'],{priority:true,assessmentReady:true,legacy:true,timer:240,minEarly:7,total:8,components:['IDENTIFY ODD / EVEN','OBJECT GROUP','TWO EQUAL GROUPS','TWO EQUAL ADDENDS'],counts:{'IDENTIFY ODD / EVEN':2,'OBJECT GROUP':2,'TWO EQUAL GROUPS':2,'TWO EQUAL ADDENDS':2},requiredCorrect:7,winDefault:'ODD / EVEN'}),
    '2.OA.C.4':def('2.OA.C.4','Arrays & Equal Addends','Operations and Algebraic Thinking','CORE-NUMBER-SENSE',['Q2'],{assessmentReady:true,components:['ARRAY MODEL','REPEATED ADDITION'],counts:{'ARRAY MODEL':3,'REPEATED ADDITION':3},total:6,minEarly:5,requiredCorrect:5,winDefault:'SKIP COUNTING'}),

    '2.NBT.A.1':def('2.NBT.A.1','Hundreds, Tens & Ones','Number and Operations in Base Ten','PLACE-VALUE-1000',['Q1'],{assessmentReady:true,components:['HUNDREDS TENS ONES','BUNDLES / VALUE'],counts:{'HUNDREDS TENS ONES':3,'BUNDLES / VALUE':3},total:6,minEarly:5,requiredCorrect:5,winDefault:'PLACE VALUE'}),
    '2.NBT.A.2':def('2.NBT.A.2','Count by 5s, 10s & 100s','Number and Operations in Base Ten','PLACE-VALUE-1000',['Q1'],{assessmentReady:true,components:['COUNT BY 5','COUNT BY 10','COUNT BY 100'],counts:{'COUNT BY 5':2,'COUNT BY 10':2,'COUNT BY 100':2},total:6,minEarly:5,requiredCorrect:5,winDefault:'SKIP COUNTING'}),
    '2.NBT.A.3':def('2.NBT.A.3','Read & Write Numbers to 1,000','Number and Operations in Base Ten','PLACE-VALUE-1000',['Q1'],{assessmentReady:true,components:['STANDARD FORM','EXPANDED FORM','WORD FORM'],counts:{'STANDARD FORM':2,'EXPANDED FORM':2,'WORD FORM':2},total:6,minEarly:5,requiredCorrect:5,winDefault:'PLACE VALUE'}),
    '2.NBT.A.4':def('2.NBT.A.4','Compare Three-Digit Numbers','Number and Operations in Base Ten','PLACE-VALUE-1000',['Q1','Q2'],{assessmentReady:true,components:['COMPARE NUMBERS','PLACE VALUE REASON'],counts:{'COMPARE NUMBERS':3,'PLACE VALUE REASON':3},total:6,minEarly:5,requiredCorrect:5,winDefault:'COMPARE NUMBERS'}),
    '2.NBT.B.5':def('2.NBT.B.5','Add & Subtract to 100','Number and Operations in Base Ten','ADD-SUBTRACT-EXTENDED',['Q1','Q2'],{priority:true,assessmentReady:true,legacy:true,timer:300,minEarly:7,total:8,components:['ADDITION NO REGROUPING','ADDITION WITH REGROUPING','SUBTRACTION NO REGROUPING','SUBTRACTION WITH REGROUPING','PLACE-VALUE STRATEGY'],counts:{'ADDITION NO REGROUPING':1,'ADDITION WITH REGROUPING':2,'SUBTRACTION NO REGROUPING':1,'SUBTRACTION WITH REGROUPING':2,'PLACE-VALUE STRATEGY':2},requiredCorrect:7,winDefault:'ADDITION WITHIN 100'}),
    '2.NBT.B.6':def('2.NBT.B.6','Add Up to Four Two-Digit Numbers','Number and Operations in Base Ten','ADD-SUBTRACT-EXTENDED',['Q2'],{components:['MULTI-ADDEND ADDITION'],counts:{'MULTI-ADDEND ADDITION':6}}),
    '2.NBT.B.7':def('2.NBT.B.7','Add & Subtract Within 1,000','Number and Operations in Base Ten','ADD-SUBTRACT-EXTENDED',['Q3'],{components:['ADD WITH PLACE VALUE','SUBTRACT WITH PLACE VALUE'],counts:{'ADD WITH PLACE VALUE':3,'SUBTRACT WITH PLACE VALUE':3}}),
    '2.NBT.B.8':def('2.NBT.B.8','Mentally Add or Subtract 10 or 100','Number and Operations in Base Ten','ADD-SUBTRACT-EXTENDED',['Q2','Q3'],{components:['ADD 10 / 100','SUBTRACT 10 / 100'],counts:{'ADD 10 / 100':3,'SUBTRACT 10 / 100':3}}),
    '2.NBT.B.9':def('2.NBT.B.9','Explain Addition & Subtraction Strategies','Number and Operations in Base Ten','ADD-SUBTRACT-EXTENDED',['Q3'],{components:['EXPLAIN STRATEGY','PLACE VALUE REASONING'],counts:{'EXPLAIN STRATEGY':3,'PLACE VALUE REASONING':3}}),

    '2.MD.A.1':def('2.MD.A.1','Measure Length with Tools','Measurement and Data','MEASUREMENT-NUMBER-LINES',['Q2'],{components:['CHOOSE TOOL','MEASURE LENGTH'],counts:{'CHOOSE TOOL':3,'MEASURE LENGTH':3}}),
    '2.MD.A.2':def('2.MD.A.2','Measure with Different Units','Measurement and Data','MEASUREMENT-NUMBER-LINES',['Q2'],{components:['UNIT SIZE','COMPARE MEASUREMENTS'],counts:{'UNIT SIZE':3,'COMPARE MEASUREMENTS':3}}),
    '2.MD.A.3':def('2.MD.A.3','Estimate Length','Measurement and Data','MEASUREMENT-NUMBER-LINES',['Q2'],{components:['ESTIMATE LENGTH'],counts:{'ESTIMATE LENGTH':6}}),
    '2.MD.A.4':def('2.MD.A.4','Compare Lengths','Measurement and Data','MEASUREMENT-NUMBER-LINES',['Q2'],{components:['LENGTH DIFFERENCE'],counts:{'LENGTH DIFFERENCE':6}}),
    '2.MD.B.5':def('2.MD.B.5','Length Word Problems','Measurement and Data','MEASUREMENT-NUMBER-LINES',['Q2','Q3'],{components:['ADD LENGTH','SUBTRACT LENGTH'],counts:{'ADD LENGTH':3,'SUBTRACT LENGTH':3}}),
    '2.MD.B.6':def('2.MD.B.6','Number Lines','Measurement and Data','MEASUREMENT-NUMBER-LINES',['Q2','Q3'],{components:['REPRESENT ON NUMBER LINE','ADD / SUBTRACT ON NUMBER LINE'],counts:{'REPRESENT ON NUMBER LINE':3,'ADD / SUBTRACT ON NUMBER LINE':3}}),
    '2.MD.C.7':def('2.MD.C.7','Tell & Write Time','Measurement and Data','TIME-MONEY-DATA',['Q3'],{assessmentReady:true,components:['READ TIME','WRITE TIME'],counts:{'READ TIME':3,'WRITE TIME':3},total:6,minEarly:5,requiredCorrect:5,winDefault:'COUNTING / QUANTITY'}),
    '2.MD.C.8':def('2.MD.C.8','Money','Measurement and Data','TIME-MONEY-DATA',['Q3'],{assessmentReady:true,components:['COUNT COINS','MONEY PROBLEMS'],counts:{'COUNT COINS':3,'MONEY PROBLEMS':3},total:6,minEarly:5,requiredCorrect:5,winDefault:'WORD PROBLEMS'}),
    '2.MD.D.9':def('2.MD.D.9','Measurement Data','Measurement and Data','TIME-MONEY-DATA',['Q3','Q4'],{components:['MEASURE DATA','LINE PLOT'],counts:{'MEASURE DATA':3,'LINE PLOT':3}}),
    '2.MD.D.10':def('2.MD.D.10','Graphs','Measurement and Data','TIME-MONEY-DATA',['Q1','Q3'],{priority:true,assessmentReady:true,legacy:true,legacyId:'2.MD.10',timer:300,minEarly:6,total:8,components:['READ PICTURE GRAPH','READ BAR GRAPH','REPRESENT DATA','PUT TOGETHER / TAKE APART','COMPARE'],counts:{'READ PICTURE GRAPH':1,'READ BAR GRAPH':1,'REPRESENT DATA':2,'PUT TOGETHER / TAKE APART':2,'COMPARE':2},requiredCorrect:7,winDefault:'COMPARE NUMBERS'}),

    '2.G.A.1':def('2.G.A.1','Shape Attributes','Geometry','GEOMETRY-EQUAL-SHARES',['Q4'],{assessmentReady:true,components:['IDENTIFY ATTRIBUTES','DRAW / CHOOSE SHAPE'],counts:{'IDENTIFY ATTRIBUTES':3,'DRAW / CHOOSE SHAPE':3},total:6,minEarly:5,requiredCorrect:5,winDefault:'COUNTING / QUANTITY'}),
    '2.G.A.2':def('2.G.A.2','Partition Rectangles into Equal Squares','Geometry','GEOMETRY-EQUAL-SHARES',['Q4'],{components:['ROWS / COLUMNS','TOTAL SQUARES'],counts:{'ROWS / COLUMNS':3,'TOTAL SQUARES':3}}),
    '2.G.A.3':def('2.G.A.3','Equal Shares of Shapes','Geometry','GEOMETRY-EQUAL-SHARES',['Q4'],{components:['HALVES / THIRDS / FOURTHS','EQUAL SHARES'],counts:{'HALVES / THIRDS / FOURTHS':3,'EQUAL SHARES':3}})
  };

  function getStandard(id){return STANDARDS[id]||null}
  function standardsForQuarter(q){return Object.values(STANDARDS).filter(s=>s.quarters.includes(q))}
  function standardsForCurriculumGroup(id){return Object.values(STANDARDS).filter(s=>s.curriculumGroup===id)}
  function rint(a,b){return Math.floor(Math.random()*(b-a+1))+a}
  function pick(a){return a[rint(0,a.length-1)]}
  function shuffle(a){const out=[...a];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out}
  function uniqueChoices(correct,candidates=[]){
    const expected=String(correct),out=[];
    for(const value of candidates){const s=String(value);if(s!==expected&&!out.includes(s))out.push(s);if(out.length===3)break}
    let n=1;
    while(out.length<3){const numeric=Number(expected);const s=Number.isFinite(numeric)?String(Math.max(0,numeric+n)): `Choice ${n+1}`;if(s!==expected&&!out.includes(s))out.push(s);n++}
    return shuffle([expected,...out.slice(0,3)]);
  }
  function mc(standard,category,prompt,correct,distractors=[],meta={}){
    const expectedAnswer=String(correct),choices=uniqueChoices(expectedAnswer,distractors);
    return{id:`map_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`,standard,category,prompt:String(prompt),choices,expectedAnswer,visualHtml:'',meta};
  }
  function numberWords(n){
    const ones=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
    const tens=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
    const under100=x=>x<20?ones[x]:tens[Math.floor(x/10)]+(x%10?`-${ones[x%10]}`:'');
    if(n<100)return under100(n);
    const h=Math.floor(n/100),rest=n%100;return `${ones[h]} hundred${rest?' '+under100(rest):''}`;
  }

  function legacyLikeItem(id,category,variant=0){
    if(id==='2.OA.B.2'){
      if(category==='SUBTRACTION'){const a=rint(12,20),b=rint(2,a-4),ans=a-b;return mc(id,category,`${a} − ${b} = ?`,ans,[ans-1,ans+1,b])}
      if(category==='MISSING PART / RELATED FACT'){const whole=rint(11,20),part=rint(3,whole-3),ans=whole-part;return mc(id,category,`___ + ${part} = ${whole}`,ans,[ans-1,ans+1,part])}
      if(category==='EFFICIENT STRATEGY'){const a=pick([8,9]),b=rint(4,8),need=10-a,rest=b-need;return mc(id,category,`Which shows a make-10 way for ${a} + ${b}?`,`${a} + ${need} + ${rest}`,[`${a} + ${b} + ${need}`,`10 + ${b}`,`${a} + ${need} + ${b}`])}
      const a=rint(4,10),b=rint(2,Math.min(9,20-a)),ans=a+b;return mc(id,category,`${a} + ${b} = ?`,ans,[ans-1,ans+1,Math.abs(a-b)])
    }
    if(id==='2.OA.C.3'){
      const n=rint(5,20),parity=n%2===0?'EVEN':'ODD';
      if(category==='TWO EQUAL GROUPS'){const even=2*rint(3,10),half=even/2;return mc(id,category,`Which split shows ${even} in two equal groups?`,`${half} and ${half}`,[`${half-1} and ${half+1}`,`${half-2} and ${half+2}`,`${even} and 0`])}
      if(category==='TWO EQUAL ADDENDS'){const even=2*rint(3,10),half=even/2;return mc(id,category,`Which equation shows ${even} as two equal addends?`,`${half} + ${half}`,[`${half-1} + ${half+1}`,`${even} + ${even}`,`${half} + ${half+1}`])}
      return mc(id,category,`${category==='OBJECT GROUP'?'A group has':'Is'} ${n}${category==='OBJECT GROUP'?' objects. Is the number':' '} odd or even?`,parity,[parity==='EVEN'?'ODD':'EVEN','BOTH','NEITHER'])
    }
    if(id==='2.OA.A.1'){
      const start=rint(12,30),add=rint(3,9),take=rint(2,8),final=start+add-take;
      if(category==='PROBLEM SITUATION')return mc(id,category,`A box has ${start} markers. ${add} more are added. Which operation starts the story?`,'ADD',['SUBTRACT','MULTIPLY','NO OPERATION'])
      if(category==='UNKNOWN POSITION'){const total=start+add;return mc(id,category,`Some blocks were in a bin. ${add} more were added. Now there are ${total}. How many were there first?`,start,[start-1,start+1,add])}
      if(category==='EQUATION REPRESENTATION')return mc(id,category,`${start} markers were joined by ${add}, then ${take} were used. Which equation matches?`,`${start} + ${add} − ${take}`,[`${start} − ${add} + ${take}`,`${start} + ${add} + ${take}`,`${start} − ${take}`])
      if(category==='MODEL / REPRESENTATION')return mc(id,category,`Which expression matches: start with ${start}, add ${add}, then take away ${take}?`,`${start} + ${add} − ${take}`,[`${start} − ${add} − ${take}`,`${start} + ${take}`,`${start} − ${take}`])
      return mc(id,category,`There were ${start} shells. ${add} more were found, then ${take} were put back. How many remain?`,final,[final-1,final+1,start+add])
    }
    if(id==='2.NBT.B.5'){
      const a=10*rint(3,7)+rint(2,8),b=10*rint(1,2)+rint(2,8);
      if(category.includes('SUBTRACTION')){const high=Math.max(a,b+10),low=Math.min(b,high-1),ans=high-low;return mc(id,category,`${high} − ${low} = ?`,ans,[ans-1,ans+1,ans+10])}
      if(category==='PLACE-VALUE STRATEGY'){const ans=a+b;return mc(id,category,`Which value is ${a} + ${b}?`,ans,[ans-10,ans+10,ans-1])}
      const ans=a+b;return mc(id,category,`${a} + ${b} = ?`,ans,[ans-10,ans+10,ans-1])
    }
    if(id==='2.MD.D.10'){
      const a=rint(2,8),b=rint(2,8);
      if(category==='PUT TOGETHER / TAKE APART')return mc(id,category,`A graph shows ${a} cats and ${b} dogs. How many altogether?`,a+b,[a+b-1,a+b+1,Math.abs(a-b)])
      if(category==='COMPARE')return mc(id,category,`A graph shows ${Math.max(a,b)+3} apples and ${Math.min(a,b)} pears. How many more apples?`,Math.max(a,b)+3-Math.min(a,b),[1,2,Math.max(a,b)+3])
      return mc(id,category,`A graph bar reaches ${a}. How many does it show?`,a,[a-1,a+1,b])
    }
    throw new Error(`No legacy-like generator for ${id}`);
  }

  function readyItem(id,category,variant=0){
    if(['2.OA.A.1','2.OA.B.2','2.OA.C.3','2.NBT.B.5','2.MD.D.10'].includes(id))return legacyLikeItem(id,category,variant);
    if(id==='2.OA.C.4'){
      const rows=rint(2,5),cols=rint(2,5),total=rows*cols;
      if(category==='REPEATED ADDITION')return mc(id,category,`${rows} rows have ${cols} dots in each row. Which repeated-addition equation matches?`,Array(rows).fill(cols).join(' + '),[Array(cols).fill(rows).join(' + '),`${rows} + ${cols}`,`${total} + ${rows}`],{rows,cols});
      return mc(id,category,`An array has ${rows} rows and ${cols} columns. How many objects are in the array?`,total,[total-rows,total+rows,rows+cols],{rows,cols});
    }
    if(id==='2.NBT.A.1'){
      const h=rint(1,7),t=rint(0,9),o=rint(0,9),n=100*h+10*t+o;
      if(category==='BUNDLES / VALUE')return mc(id,category,`In ${n}, what is the value of the ${tensDigitLabel(t,o)} tens digit?`,t*10,[t,100*t,o*10],{number:n});
      return mc(id,category,`${n} has how many hundreds, tens, and ones?`,`${h} hundreds, ${t} tens, ${o} ones`,[`${h} hundreds, ${o} tens, ${t} ones`,`${t} hundreds, ${h} tens, ${o} ones`,`${h} hundreds, ${t+1} tens, ${o} ones`],{number:n});
    }
    if(id==='2.NBT.A.2'){
      const step=category==='COUNT BY 5'?5:category==='COUNT BY 100'?100:10,start=step*rint(2,6),next=start+step*3;
      return mc(id,category,`${start}, ${start+step}, ${start+step*2}, ___`,next,[next-step,next+step,next+1],{step});
    }
    if(id==='2.NBT.A.3'){
      const h=rint(1,9),t=rint(0,9),o=rint(0,9),n=100*h+10*t+o,expanded=`${h*100} + ${t*10} + ${o}`,words=numberWords(n);
      if(category==='STANDARD FORM')return mc(id,category,`Which number is ${expanded}?`,n,[n-10,n+10,100*t+10*h+o]);
      if(category==='WORD FORM')return mc(id,category,`Which is the word form of ${n}?`,words,[numberWords(Math.max(100,n-10)),numberWords(Math.min(999,n+10)),numberWords(100*h+10*o+t)]);
      return mc(id,category,`Which is the expanded form of ${n}?`,expanded,[`${h*100} + ${t} + ${o*10}`,`${h*100} + ${t*10}`,`${h*10} + ${t*10} + ${o}`]);
    }
    if(id==='2.NBT.A.4'){
      let a=rint(120,899),b=rint(120,899);while(a===b)b=rint(120,899);const sign=a>b?'>':'<';
      if(category==='PLACE VALUE REASON'){const bigger=Math.max(a,b);return mc(id,category,`Which number is greater: ${a} or ${b}?`,bigger,[Math.min(a,b),String(a).split('').reverse().join(''),String(b).split('').reverse().join('')])}
      return mc(id,category,`${a} ___ ${b}`,sign,[sign==='>'?'<':'>','=','≈']);
    }
    if(id==='2.MD.C.7'){
      const hour=rint(1,12),minute=5*rint(0,11),time=`${hour}:${String(minute).padStart(2,'0')}`;
      if(category==='WRITE TIME')return mc(id,category,`The minute hand is on ${minute/5===0?12:minute/5} and the hour is ${hour}. Which digital time matches?`,time,[`${hour}:${String((minute+5)%60).padStart(2,'0')}`,`${hour}:${String((minute+55)%60).padStart(2,'0')}`,`${hour===12?1:hour+1}:${String(minute).padStart(2,'0')}`]);
      return mc(id,category,`Which words match ${time}?`,`${hour} ${minute===0?'o’clock':`and ${minute} minutes`}`,[`${hour} and ${(minute+5)%60} minutes`,`${hour===12?1:hour+1} and ${minute} minutes`,`${hour} and ${Math.max(0,minute-5)} minutes`]);
    }
    if(id==='2.MD.C.8'){
      const d=rint(1,6),n=rint(0,3),p=rint(0,4),total=d*10+n*5+p;
      if(category==='MONEY PROBLEMS'){const cost=5*rint(1,6),paid=cost+5*rint(1,4);return mc(id,category,`A toy costs ${cost}¢. You pay ${paid}¢. How much change?`,`${paid-cost}¢`,[`${paid-cost+5}¢`,`${Math.max(0,paid-cost-5)}¢`,`${paid}¢`])}
      return mc(id,category,`${d} dimes, ${n} nickels, and ${p} pennies are worth how much?`,`${total}¢`,[`${total+5}¢`,`${Math.max(0,total-5)}¢`,`${d+n+p}¢`]);
    }
    if(id==='2.G.A.1'){
      const shapes=[{name:'triangle',sides:3,verts:3},{name:'rectangle',sides:4,verts:4},{name:'pentagon',sides:5,verts:5},{name:'hexagon',sides:6,verts:6}],s=pick(shapes);
      if(category==='DRAW / CHOOSE SHAPE')return mc(id,category,`Which shape has ${s.sides} sides and ${s.verts} vertices?`,s.name,shapes.filter(x=>x.name!==s.name).map(x=>x.name));
      return mc(id,category,`How many sides does a ${s.name} have?`,s.sides,[s.sides-1,s.sides+1,s.verts+2]);
    }
    throw new Error(`No assessment-ready generator for ${id}`);
  }

  function tensDigitLabel(){return 'tens'}

  function generateItem(standardId,component,variant=0){
    const standard=getStandard(standardId);
    if(!standard)throw new Error(`Unknown standard ${standardId}`);
    if(!standard.assessmentReady)throw new Error(`${standardId} is visible but does not have an assessment blueprint yet`);
    if(!standard.components.includes(component))throw new Error(`Unknown component ${component} for ${standardId}`);
    return readyItem(standardId,component,variant);
  }

  function buildSingleStandard(standardId){
    const standard=getStandard(standardId);
    if(!standard||!standard.assessmentReady)throw new Error(`Assessment not ready for ${standardId}`);
    const specs=[];Object.entries(standard.counts).forEach(([component,count])=>{for(let i=0;i<count;i++)specs.push({component,variant:i})});
    return{id:`standard_${standardId}_${Date.now().toString(36)}`,type:'SINGLE_STANDARD',standardId,items:specs.map(x=>generateItem(standardId,x.component,x.variant)),blueprintVersion:'YEAR-MAP-V1'};
  }

  const api={STANDARDS,CURRICULUM_GROUPS,QUARTERS,getStandard,standardsForQuarter,standardsForCurriculumGroup,generateItem,buildSingleStandard};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.Room22AssessmentMap=api;

  if(typeof document==='undefined')return;

  // Browser bridge: keep the accepted proficiency engine as the formal single-standard runner.
  // The registry enriches it and adds new generators while leaving legacy IDs/data readable.
  try{
    if(typeof PROF_STANDARDS!=='undefined'){
      const existing={...PROF_STANDARDS};
      for(const standard of Object.values(STANDARDS)){
        if(standard.legacy){
          const old=existing[standard.legacyId];
          if(old)PROF_STANDARDS[standard.id]={...old,mapMeta:standard};
          continue;
        }
        if(standard.assessmentReady)PROF_STANDARDS[standard.id]={
          name:standard.name.toUpperCase(),studentName:standard.studentName,timer:standard.timer,
          minEarly:standard.minEarly,total:standard.total,components:[...standard.components],counts:{...standard.counts},
          requiredCorrect:standard.requiredCorrect,winDefault:standard.winDefault,mapMeta:standard
        };
      }
    }
    if(typeof profGenerator==='function'&&!profGenerator.__assessmentMapWrapped){
      const previous=profGenerator;
      const wrapped=function(standard,category,variant){
        const canonical=standard==='2.MD.10'?'2.MD.D.10':standard;
        const mapped=STANDARDS[canonical];
        if(mapped&&mapped.assessmentReady&&!mapped.legacy)return generateItem(canonical,category,variant);
        return previous(standard,category,variant);
      };
      wrapped.__assessmentMapWrapped=true;
      profGenerator=wrapped;
    }
  }catch{}
})(typeof globalThis!=='undefined'?globalThis:this);
