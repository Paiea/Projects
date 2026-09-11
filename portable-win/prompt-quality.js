(function(root){
  const GENERIC_SCAFFOLDS=[
    'Start with one small step or an oral response.',
    'Offer a choice or representation if needed.'
  ];

  function clampSeed(value){
    const n=Math.round(Number(value)||46);
    return Math.max(20,Math.min(89,n));
  }

  function cleanStudentScaffold(text=''){
    let out=String(text||'');
    for(const phrase of GENERIC_SCAFFOLDS)out=out.replaceAll(phrase,'');
    return out.replace(/\s{2,}/g,' ').trim();
  }

  function splitPassageTask(entry={}){
    const prompt=String(entry.prompt||'').trim();
    const hint=cleanStudentScaffold(entry.sub||'');
    const parts=prompt.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
    if(parts.length>=2&&parts[0].length>=45){
      const task=parts.slice(1).join(' ').trim();
      return{
        kind:'PASSAGE_TASK',
        passage:parts[0],
        task,
        hint,
        teacherCue:entry.cue||entry.teacherCue||null
      };
    }
    return{kind:'SIMPLE',passage:'',task:prompt,hint,teacherCue:entry.cue||entry.teacherCue||null};
  }

  function numberRelationship(seed=46,family='TENS_PATTERN'){
    const n=clampSeed(seed),ones=n%10,tens=Math.floor(n/10),lower=Math.floor(n/10)*10,upper=lower+10;
    if(family==='ONES_PATTERN')return{
      move:'NUMBER RELATIONSHIP',display:[String(n-1),String(n),String(n+1)],
      prompt:'What changes each time?',teacherCue:'LOOK FOR: the ones change by 1 while the tens stay the same.'
    };
    if(family==='SEQUENCE')return{
      move:'NUMBER PATTERN',display:[String(n-20),String(n-10),String(n),String(n+10),'___'],
      prompt:'What comes next? How do you know?',teacherCue:`LOOK FOR: each number increases by 10. PUSH: What would come after ${n+20}?`
    };
    if(family==='REPRESENTATION')return{
      move:'COMPARE REPRESENTATIONS',display:[`${n} = ${tens} tens + ${ones} ones`,`${n+10} = ${tens+1} tens + ${ones} ones`],
      prompt:'What changed?',teacherCue:`LOOK FOR: the ones stay ${ones}; the tens increase by 1.`
    };
    if(family==='CLOSEST_TEN')return{
      move:'COMPARE DISTANCE',display:[String(lower),String(n),String(upper)],
      prompt:`Which is ${n} closer to? How do you know?`,teacherCue:`LOOK FOR: compare the distance from ${n} to ${lower} and ${upper}.`
    };
    return{
      move:'NUMBER RELATIONSHIP',display:[String(n-10),String(n),String(n+10)],
      prompt:'What stays the same? What changes?',teacherCue:`LOOK FOR: ones stay ${ones}; tens increase by 1. PUSH: What number would come next?`
    };
  }

  function relationshipFamilyForSkill(skill=''){
    const key=String(skill||'').toUpperCase();
    if(key==='TENS + ONES'||key==='PLACE VALUE')return Math.random()<.5?'TENS_PATTERN':'REPRESENTATION';
    if(key==='HUNDRED CHART'||key==='SKIP COUNTING')return'SEQUENCE';
    if(key==='COMPARE NUMBERS'||key==='NUMBER LINE')return'CLOSEST_TEN';
    return'TENS_PATTERN';
  }

  function seedFromEntries(entries=[]){
    for(const entry of Array.isArray(entries)?entries:[]){
      const text=String(entry?.prompt||entry?.text||'');
      const matches=text.match(/\b([2-8]\d)\b/g);
      if(matches&&matches.length)return clampSeed(matches[0]);
    }
    return 46;
  }

  function relationAsEntry(rel){
    return{
      move:rel.move,
      prompt:`${rel.display.join('   ')}\n\n${rel.prompt}`,
      sub:'',
      cue:{label:'LOOK FOR',text:rel.teacherCue.replace(/^LOOK FOR:\s*/i,'')}
    };
  }

  function upgradeMathEntry(entry={},skill=''){
    const out={...entry};
    const text=String(out.prompt||out.text||'');
    const naked=text.match(/^\s*What do you notice about\s+(\d+)\??\s*$/i);
    // A naked notice prompt has already failed the facilitation test. Make its
    // repair deterministic and maximally legible: related numbers first.
    if(naked)return{...out,...relationAsEntry(numberRelationship(Number(naked[1]),'TENS_PATTERN'))};
    return out;
  }

  function anchoredMoveForSkill(skill,entries=[]){
    const supported=new Set(['TENS + ONES','PLACE VALUE','COMPARE NUMBERS','HUNDRED CHART','NUMBER LINE','SKIP COUNTING']);
    if(!supported.has(String(skill||'').toUpperCase()))return null;
    return relationAsEntry(numberRelationship(seedFromEntries(entries),relationshipFamilyForSkill(skill)));
  }

  const api={GENERIC_SCAFFOLDS,cleanStudentScaffold,splitPassageTask,numberRelationship,upgradeMathEntry,anchoredMoveForSkill,seedFromEntries};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.Room22PromptQuality=api;

  if(typeof document==='undefined')return;

  function esc(value=''){
    return String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function boot(){
    if(typeof teachMathSet==='function'&&!teachMathSet.__promptQualityWrapped){
      const previous=teachMathSet;
      const wrapped=function(skill,mode){
        const raw=previous(skill,mode);
        const list=(Array.isArray(raw)?raw:raw?[raw]:[]).map(x=>upgradeMathEntry(x,skill));
        const anchor=anchoredMoveForSkill(skill,list);
        if(anchor&&!list.some(x=>/What stays the same\?|What comes next\? How do you know\?|Which is \d+ closer to\?|What changed\?/i.test(String(x?.prompt||''))))list.unshift(anchor);
        return list;
      };
      wrapped.__promptQualityWrapped=true;
      teachMathSet=wrapped;
    }

    if(typeof renderTeachProjector==='function'&&!renderTeachProjector.__promptQualityWrapped){
      const previous=renderTeachProjector;
      const wrapped=function(){
        previous();
        try{
          const entry=teachState?.sequence?.[teachState.index];
          if(!entry)return;
          const shape=splitPassageTask(entry);
          const prompt=document.querySelector('#teachPrompt');
          const sub=document.querySelector('#teachSubprompt');
          if(shape.kind==='PASSAGE_TASK'&&prompt){
            prompt.innerHTML=`<div class="student-reading-stack"><div class="student-reading-passage">${esc(shape.passage)}</div><div class="student-reading-task">${esc(shape.task)}</div>${shape.hint?`<div class="student-reading-hint">${esc(shape.hint)}</div>`:''}</div>`;
            if(sub)sub.textContent='';
          }else if(sub){
            const cleaned=cleanStudentScaffold(entry.sub||'');
            if(sub.textContent!==cleaned)sub.textContent=cleaned;
          }
        }catch{}
      };
      wrapped.__promptQualityWrapped=true;
      renderTeachProjector=wrapped;
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else setTimeout(boot,0);
})(typeof globalThis!=='undefined'?globalThis:this);
