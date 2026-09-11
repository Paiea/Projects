(function(root,factory){
  const map=(typeof module!=='undefined'&&module.exports)?require('./assessment-map.js'):root.Room22AssessmentMap;
  const api=factory(map,root);
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.Room22MultiAssessment=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(DEFAULT_MAP,root){
  const PROFILES={
    QUICK:{id:'QUICK',min:5,max:8,target:6,label:'QUICK · 5–8'},
    STANDARD:{id:'STANDARD',min:10,max:15,target:12,label:'STANDARD · 10–15'},
    DEEP:{id:'DEEP',min:0,max:Infinity,target:null,label:'DEEP · COMPONENT COMPLETE'}
  };

  function readyStandards(ids,map=DEFAULT_MAP){
    return [...new Set((ids||[]).map(String))].map(id=>map.getStandard(id)).filter(s=>s&&s.assessmentReady);
  }

  function specsForStandard(standard,{full=false}={}){
    const specs=[];
    if(full){
      for(const [component,count] of Object.entries(standard.counts||{}))for(let variant=0;variant<count;variant++)specs.push({standardId:standard.id,component,variant});
      return specs;
    }
    standard.components.forEach((component,index)=>specs.push({standardId:standard.id,component,variant:index}));
    return specs;
  }

  function pushUniqueSpec(out,spec,seen){
    const key=`${spec.standardId}|${spec.component}|${spec.variant}`;
    if(seen.has(key))return false;
    seen.add(key);out.push(spec);return true;
  }

  function buildSpecs(standards,profile){
    if(profile==='DEEP')return standards.flatMap(s=>specsForStandard(s,{full:true}));
    const cfg=PROFILES[profile]||PROFILES.STANDARD,target=cfg.target;
    const specs=[],seen=new Set();

    // First guarantee one sample from every current priority standard that is in scope.
    for(const standard of standards.filter(s=>s.priority)){
      const component=standard.components[0];
      if(component)pushUniqueSpec(specs,{standardId:standard.id,component,variant:0},seen);
    }

    // Then give every ready standard a chance before repeating components.
    for(const standard of standards){
      if(specs.length>=target)break;
      const component=standard.components[0];
      if(component)pushUniqueSpec(specs,{standardId:standard.id,component,variant:0},seen);
    }

    // Round-robin through components so broad checks maximize breadth.
    let componentIndex=1;
    while(specs.length<target){
      let added=false;
      for(const standard of standards){
        if(specs.length>=target)break;
        const component=standard.components[componentIndex%standard.components.length];
        if(component&&pushUniqueSpec(specs,{standardId:standard.id,component,variant:componentIndex},seen))added=true;
      }
      componentIndex++;
      if(!added)break;
    }

    // If the selected scope is tiny, repeat valid components with new variants rather than undersizing the check.
    let variant=10;
    while(specs.length<target&&standards.length){
      for(const standard of standards){
        if(specs.length>=target)break;
        const component=standard.components[variant%standard.components.length];
        specs.push({standardId:standard.id,component,variant});
      }
      variant++;
    }
    return specs.slice(0,cfg.max);
  }

  function buildAssessment({standardIds=[],profile='STANDARD',scope=null,map=DEFAULT_MAP}={}){
    const chosen=readyStandards(standardIds,map);
    if(!chosen.length)throw new Error('No assessment-ready standards in this scope');
    const normalized=PROFILES[profile]?profile:'STANDARD';
    const specs=buildSpecs(chosen,normalized);
    const items=specs.map(spec=>map.generateItem(spec.standardId,spec.component,spec.variant));
    return{
      id:`multi_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`,
      type:'MULTI_STANDARD_ASSESSMENT',
      blueprintVersion:'YEAR-MAP-MULTI-V1',
      profile:normalized,
      scope:scope||{type:'CUSTOM',id:'CUSTOM'},
      standardIds:chosen.map(s=>s.id),
      items
    };
  }

  function buildQuarter(quarter,profile='STANDARD',map=DEFAULT_MAP){
    const standards=map.standardsForQuarter(quarter).filter(s=>s.assessmentReady);
    return buildAssessment({standardIds:standards.map(s=>s.id),profile,scope:{type:'QUARTER',id:quarter},map});
  }

  function buildCurriculumGroup(groupId,profile='STANDARD',map=DEFAULT_MAP){
    const standards=map.standardsForCurriculumGroup(groupId).filter(s=>s.assessmentReady);
    return buildAssessment({standardIds:standards.map(s=>s.id),profile,scope:{type:'CURRICULUM_GROUP',id:groupId},map});
  }

  function derivePerStandardEvidence(test,responses=[],map=DEFAULT_MAP){
    const out={};
    for(const id of test.standardIds||[]){
      const standard=map.getStandard(id);if(!standard)continue;
      const componentEvidence=Object.fromEntries(standard.components.map(component=>[component,{answered:0,correct:0,totalInTest:0}]));
      (test.items||[]).forEach((item,index)=>{
        if(item.standard!==id||!componentEvidence[item.category])return;
        const evidence=componentEvidence[item.category];evidence.totalInTest++;
        const response=responses[index];if(!response)return;
        evidence.answered++;if(response.correct)evidence.correct++;
      });
      const values=Object.values(componentEvidence);
      const answered=values.reduce((sum,e)=>sum+e.answered,0),correct=values.reduce((sum,e)=>sum+e.correct,0);
      const componentsSampled=values.filter(e=>e.answered>0).length;
      const componentsDemonstrated=values.filter(e=>e.correct>0).length;
      const allComponentsSampled=componentsSampled===standard.components.length;
      const allComponentsShown=componentsDemonstrated===standard.components.length;
      const zeroShown=values.find(e=>e.answered>0&&e.correct===0);
      const fullBlueprintCoverage=answered>=standard.total;
      const earlyThreshold=Math.max(standard.components.length,standard.requiredCorrect-1);
      let result='NOT ENOUGH EVIDENCE';
      let reason='This broad check did not sample enough of this standard to make a proficiency decision.';
      if(allComponentsSampled&&zeroShown&&fullBlueprintCoverage){
        result='NOT YET';reason='At least one required component was sampled fully enough but not demonstrated.';
      }else if(allComponentsSampled&&allComponentsShown&&answered>=standard.minEarly&&correct>=earlyThreshold){
        result='LEVEL 3 DEMONSTRATED';reason='Required components were sampled and demonstrated strongly enough.';
      }else if(fullBlueprintCoverage){
        result=(correct>=standard.requiredCorrect&&allComponentsShown)?'LEVEL 3 DEMONSTRATED':'NOT YET';
        reason=result==='LEVEL 3 DEMONSTRATED'?'Required components were demonstrated.':'The full blueprint produced evidence that at least one requirement is not yet demonstrated.';
      }
      out[id]={standardId:id,result,reason,answered,correct,componentsSampled,componentsDemonstrated,components:componentEvidence};
    }
    return out;
  }

  const api={PROFILES,buildAssessment,buildQuarter,buildCurriculumGroup,derivePerStandardEvidence};
  if(typeof document==='undefined'||!DEFAULT_MAP)return api;

  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  let live={test:null,label:'',index:0,responses:[],selected:null,startedAt:null};

  function identity(){try{return profIdentityLabel(profState.student)}catch{return String(profState?.student||'SESSION')}}
  function realStudent(){try{return isRealRosterStudent(profState.student)}catch{return false}}

  function launch(test,{label='Standards Check'}={}){
    live={test,label,index:0,responses:Array(test.items.length).fill(null),selected:null,startedAt:null};
    const area=document.querySelector('#profStudentArea');if(!area)return;
    area.innerHTML=`<div class="multi-check-start"><div class="eyebrow">${esc(test.scope?.type||'STANDARDS CHECK')}</div><h1>${esc(label.toUpperCase())}</h1><div class="lead">${esc(identity())}</div><div class="multi-check-meta">${test.items.length} QUESTIONS · ${esc(test.profile)}</div><p>Each question is tagged to its own standard. A broad check only records proficiency when that standard itself has enough evidence.</p><div class="actions" style="justify-content:center"><button id="multiStart" class="primary" style="font-size:24px;padding:16px 34px">START</button><button id="multiBack" class="secondary teacher-return">BACK</button></div></div>`;
    area.querySelector('#multiStart').onclick=()=>{live.startedAt=new Date().toISOString();renderQuestion()};
    area.querySelector('#multiBack').onclick=()=>renderProfStudentMenu();
  }

  function renderQuestion(){
    const item=live.test.items[live.index],area=document.querySelector('#profStudentArea');if(!item||!area)return finish();
    area.innerHTML=`<div class="prof-student-top"><div class="precheck-progress">SHOWING WHAT I KNOW · ${esc(item.standard)}</div><div class="precheck-progress">TASK ${live.index+1} OF ${live.test.items.length}</div></div><div class="prof-meter"><div class="prof-meter-fill" style="width:${Math.round((live.index/live.test.items.length)*100)}%"></div></div><div class="precheck-prompt">${esc(item.prompt).replace(/\n/g,'<br>')}</div>${item.visualHtml?`<div class="precheck-visual">${item.visualHtml}</div>`:''}<div class="prof-choice-grid">${item.choices.map(choice=>`<button class="prof-choice" data-value="${esc(choice)}">${esc(choice)}</button>`).join('')}</div><button id="multiNext" class="primary precheck-next" disabled>${live.index===live.test.items.length-1?'FINISH':'NEXT'}</button>`;
    area.querySelectorAll('.prof-choice').forEach(button=>button.onclick=()=>{live.selected=button.dataset.value;area.querySelectorAll('.prof-choice').forEach(x=>x.classList.toggle('selected',x===button));area.querySelector('#multiNext').disabled=false});
    area.querySelector('#multiNext').onclick=()=>{
      if(live.selected===null)return;
      live.responses[live.index]={selected:live.selected,correct:live.selected===item.expectedAnswer};
      live.selected=null;live.index++;
      if(live.index>=live.test.items.length)finish();else renderQuestion();
    };
  }

  function saveRecord(evidence){
    if(!realStudent())return null;
    try{
      const records=store.get('winMultiAssessments',[]),record={
        id:live.test.id,type:'MULTI_STANDARD_ASSESSMENT',student:profState.student,studentName:identity(),
        date:new Date().toISOString(),startedAt:live.startedAt,profile:live.test.profile,scope:live.test.scope,
        standardIds:[...live.test.standardIds],items:live.test.items.map((item,index)=>({...item,studentAnswer:live.responses[index]?.selected??null,correct:live.responses[index]?.correct??null})),
        perStandardEvidence:evidence
      };
      records.unshift(record);store.set('winMultiAssessments',records.slice(0,200));return record;
    }catch{return null}
  }

  function finish(){
    const evidence=derivePerStandardEvidence(live.test,live.responses),saved=saveRecord(evidence),results=Object.values(evidence);
    const body=document.querySelector('#profResultsBody');if(!body)return;
    body.innerHTML=`<div class="prof-result-banner evidence"><div class="small">${esc(identity().toUpperCase())}</div><h2>${esc(live.label)}</h2><h1 style="margin:10px 0">EVIDENCE BY STANDARD</h1><div class="small">${live.test.items.length} items · ${esc(live.test.profile)} · ${saved?'Saved to History':'Session only'}</div></div><div class="multi-evidence-grid">${results.map(e=>{const s=DEFAULT_MAP.getStandard(e.standardId),cls=e.result==='LEVEL 3 DEMONSTRATED'?'good':e.result==='NOT YET'?'notyet':'evidence';return `<div class="multi-evidence-card ${cls}"><div class="assessment-code">${esc(e.standardId)}</div><strong>${esc(s?.name||e.standardId)}</strong><div class="multi-evidence-result">${esc(e.result)}</div><div class="small">${e.correct}/${e.answered} correct · ${e.componentsSampled}/${s?.components.length||0} components sampled</div><div class="small">${esc(e.reason)}</div></div>`}).join('')}</div><div class="notice" style="margin-top:14px"><b>Evidence rule:</b> overall test percentage never substitutes for a standard. Level 3 appears only when that standard's own blueprint coverage is sufficient.</div><div class="actions"><button id="multiAgain" class="secondary">BUILD ANOTHER</button><button id="multiDone" class="primary">BACK TO WIN</button></div>`;
    body.querySelector('#multiAgain').onclick=()=>{setScreen('proficiencyStudent');renderProfStudentMenu()};
    body.querySelector('#multiDone').onclick=()=>setScreen('win');
    setScreen('proficiencyResults');
  }

  api.launch=launch;
  return api;
});
