(function(root,factory){
  const map=(typeof module!=='undefined'&&module.exports)?require('./assessment-map.js'):root.Room22AssessmentMap;
  const api=factory(map,root);
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.Room22AssessmentBrowser=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(DEFAULT_MAP,root){
  function curriculumSections(map=DEFAULT_MAP){
    return Object.values(map.CURRICULUM_GROUPS).map(group=>({
      id:group.id,name:group.name,provisionalMap:group.provisionalMap,
      standards:map.standardsForCurriculumGroup(group.id)
    }));
  }

  function yearSections(map=DEFAULT_MAP){
    return [
      {id:'ALL YEAR',name:'All Year',standards:Object.values(map.STANDARDS)},
      ...['Q1','Q2','Q3','Q4'].map(id=>({id,name:map.QUARTERS[id].name,standards:map.standardsForQuarter(id)}))
    ];
  }

  function standardCardModel(standard){
    return{
      id:standard.id,name:standard.name,reportArea:standard.reportArea,
      quarters:[...standard.quarters],priority:standard.priority,
      priorityLabel:standard.priority?'PRIORITY':'',
      readinessLabel:standard.assessmentReady?'READY TO CHECK':'BLUEPRINT COMING',
      disabled:!standard.assessmentReady,
      className:`assessment-standard-card${standard.priority?' assessment-priority':''}`,
      provisionalMap:standard.provisionalMap
    };
  }

  const api={curriculumSections,yearSections,standardCardModel};
  if(typeof document==='undefined'||!DEFAULT_MAP)return api;

  const map=DEFAULT_MAP;
  let browserState={view:'CURRICULUM',section:'CORE-NUMBER-SENSE'};
  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function launchStandardId(standard){return standard.legacy?standard.legacyId:standard.id}
  function statusFor(standard){
    try{
      if(typeof isRealRosterStudent!=='function'||!isRealRosterStudent(profState.student))return null;
      return currentProficiency(profState.student,launchStandardId(standard))||currentProficiency(profState.student,standard.id)||null;
    }catch{return null}
  }
  function sectionsForView(){return browserState.view==='YEAR'?yearSections(map):curriculumSections(map)}
  function normalizeSection(){
    const sections=sectionsForView();
    if(!sections.some(x=>x.id===browserState.section))browserState.section=browserState.view==='YEAR'?'Q1':sections[0]?.id||'';
    return sections;
  }

  function cardHtml(standard){
    const m=standardCardModel(standard),shown=statusFor(standard);
    return `<button class="${m.className}" data-standard="${esc(standard.id)}" ${m.disabled?'disabled':''}>
      <div class="assessment-card-top"><span class="assessment-code">${esc(standard.id)}</span>${m.priority?'<span class="assessment-priority-badge">PRIORITY</span>':''}</div>
      <strong>${esc(standard.name)}</strong>
      <span class="assessment-area">${esc(standard.reportArea)}</span>
      <div class="assessment-card-bottom"><span>${shown?'✓ LEVEL 3 SHOWN':esc(m.readinessLabel)}</span><span>${esc(standard.quarters.join(' · '))}</span></div>
    </button>`;
  }

  function renderAssessmentBrowser(){
    const area=document.querySelector('#profStudentArea');if(!area)return;
    const identity=typeof profIdentityLabel==='function'?profIdentityLabel(profState.student):String(profState.student||'');
    const sections=normalizeSection(),active=sections.find(x=>x.id===browserState.section)||sections[0];
    const provisional=browserState.view==='CURRICULUM'?'<div class="assessment-map-note">Curriculum map is provisional until reviewed Room22 unit/chapter pacing is connected. Standards and checks are real; grouping can move later.</div>':'';
    area.innerHTML=`<div class="assessment-browser">
      <div class="assessment-browser-head"><div><div class="eyebrow">TEACHER PICK</div><h1>SHOW WHAT YOU KNOW</h1><div class="lead">${esc(identity)}</div></div><button id="profStudentBack" class="secondary teacher-return">TEACHER BACK</button></div>
      <div class="assessment-view-tabs"><button data-assessment-view="CURRICULUM" class="${browserState.view==='CURRICULUM'?'selected':''}">CURRICULUM</button><button data-assessment-view="YEAR" class="${browserState.view==='YEAR'?'selected':''}">YEAR</button></div>
      ${provisional}
      <div class="assessment-scope-tabs">${sections.map(s=>`<button data-assessment-section="${esc(s.id)}" class="${s.id===active?.id?'selected':''}">${esc(s.id==='ALL YEAR'?'ALL YEAR':s.name)}</button>`).join('')}</div>
      <div class="assessment-section-head"><div><div class="eyebrow">${browserState.view==='YEAR'?'YEAR VIEW':'CURRICULUM VIEW'}</div><h2>${esc(active?.name||'')}</h2></div><div class="small">Green = current curriculum priority. It does not mean mastered.</div></div>
      <div class="assessment-standard-grid">${(active?.standards||[]).map(cardHtml).join('')}</div>
      <div class="assessment-browser-key"><span class="assessment-priority-key">PRIORITY</span> Current priority standard <span>·</span> <b>READY TO CHECK</b> has a tested blueprint <span>·</span> <b>BLUEPRINT COMING</b> stays visible but cannot launch yet</div>
    </div>`;

    area.querySelectorAll('[data-assessment-view]').forEach(button=>button.onclick=()=>{
      browserState.view=button.dataset.assessmentView;
      browserState.section=browserState.view==='YEAR'?'Q1':'CORE-NUMBER-SENSE';
      renderAssessmentBrowser();
    });
    area.querySelectorAll('[data-assessment-section]').forEach(button=>button.onclick=()=>{browserState.section=button.dataset.assessmentSection;renderAssessmentBrowser()});
    area.querySelectorAll('[data-standard]:not([disabled])').forEach(button=>button.onclick=()=>{
      const standard=map.getStandard(button.dataset.standard);if(!standard)return;
      prepareProficiencyAttempt(launchStandardId(standard));
    });
    area.querySelector('#profStudentBack').onclick=()=>{initProficiencySetup();setScreen('proficiencySetup')};
  }

  function compactCurrentStatus(){
    const target=document.querySelector('#profCurrentStatus'),student=document.querySelector('#profStudent')?.value||profState.student;if(!target||!student)return;
    if(typeof isRealRosterStudent!=='function'||!isRealRosterStudent(student)){
      const demo=typeof PROF_SPECIAL!=='undefined'&&student===PROF_SPECIAL.DEMO;
      target.innerHTML=`<div><b>${esc(typeof profIdentityLabel==='function'?profIdentityLabel(student):student)}</b></div><div class="small">${demo?'Demo mode · preview and run checks without saving student evidence.':'Session only · no student evidence is saved.'}</div>`;
      return;
    }
    const ready=Object.values(map.STANDARDS).filter(s=>s.assessmentReady),shown=ready.filter(s=>{
      try{return !!(currentProficiency(student,launchStandardId(s))||currentProficiency(student,s.id))}catch{return false}
    }).length;
    target.innerHTML=`<div><b>${esc(student)}</b></div><div class="small">${shown} of ${ready.length} assessment-ready standards currently show Level 3. Continue to browse Curriculum or Year.</div>`;
  }

  function patchWinSuggestion(){
    if(typeof suggestedWinFromAttempt!=='function'||suggestedWinFromAttempt.__assessmentBrowserWrapped)return;
    const previous=suggestedWinFromAttempt;
    const wrapped=function(attempt){
      const canonical=attempt?.standard==='2.MD.10'?'2.MD.D.10':attempt?.standard;
      const standard=map.getStandard(canonical);
      if(!standard||standard.legacy)return previous(attempt);
      const weak=typeof profWeakComponents==='function'?profWeakComponents(attempt):[];
      return{skill:standard.winDefault||'TENS + ONES',level:'BRIDGE',focus:weak[0]||standard.name};
    };
    wrapped.__assessmentBrowserWrapped=true;
    suggestedWinFromAttempt=wrapped;
  }

  function boot(){
    if(typeof renderProfStudentMenu==='function')renderProfStudentMenu=renderAssessmentBrowser;
    if(typeof renderProfCurrentStatus==='function')renderProfCurrentStatus=compactCurrentStatus;
    patchWinSuggestion();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
  return api;
});
