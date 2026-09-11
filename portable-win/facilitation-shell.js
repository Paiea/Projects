(function(root){
  const PRIMARY_WORKFLOWS=['GUIDED PAGE','QUICK FIRE','WIN / STUDENT'];
  const GUIDED_PAGE_ROLES=['EASY START','DO TOGETHER','TRY IT','TABLE TALK','STRETCH','QUICK CHECK'];
  const ROLE_CUES={
    'EASY START':'Everybody try.',
    'DO TOGETHER':'Do this one with me.',
    'TRY IT':'Now you try.',
    'TABLE TALK':'Solve it with your table.',
    'STRETCH':'Explain, compare, fix, or prove.',
    'QUICK CHECK':'Show me what you can do.'
  };

  function normalizeItem(value){
    if(!value)return{prompt:'Try one useful example of the target.',sub:''};
    if(typeof value==='string')return{prompt:value,sub:''};
    return{
      ...value,
      prompt:String(value.prompt||value.text||'Try one useful example of the target.'),
      sub:String(value.sub||'')
    };
  }

  function at(list,index=0,fallback=null){
    const items=(Array.isArray(list)?list:[]).filter(Boolean).map(normalizeItem);
    if(!items.length)return fallback;
    return items[index%items.length];
  }

  function depthScore(value){
    const item=normalizeItem(value);
    const text=`${item.move||''} ${item.prompt} ${item.sub}`.toLowerCase();
    let score=0;
    if(/compare|defend|prove|convince|evidence|justify/.test(text))score+=4;
    if(/mistake|error|wrong|fix|misconception|diagnos/.test(text))score+=4;
    if(/explain|why|how do you know|another way|different way|represent|strategy/.test(text))score+=2;
    if(/group|team|table|partner|claim/.test(text))score+=1;
    if(/read it\.?$|try another one|quick check/.test(text))score-=1;
    return score;
  }

  function rankForDepth(items=[]){
    return (Array.isArray(items)?items:[])
      .filter(Boolean)
      .map((value,index)=>({item:normalizeItem(value),index,score:depthScore(value)}))
      .sort((a,b)=>b.score-a.score||a.index-b.index)
      .map(x=>x.item);
  }

  function compileGuidedPage({quick=[],figure=[],btc=[],discuss=[]}={}){
    const fallback=normalizeItem(null);
    const chosen=[
      {main:at(quick,0,fallback),extra:at(quick,1,null)},
      {main:at(figure,0,fallback),extra:at(figure,1,null)},
      {main:at(figure,1,at(figure,0,fallback)),extra:at(quick,2,null)},
      {main:at(btc,0,at(figure,2,fallback)),extra:at(btc,1,null)},
      {main:at(discuss,0,at(btc,1,fallback)),extra:at(discuss,1,at(btc,2,null))},
      {main:at(quick,3,at(quick,1,at(quick,0,fallback))),extra:null}
    ];
    return GUIDED_PAGE_ROLES.map((role,index)=>({
      role,
      cue:ROLE_CUES[role],
      ...chosen[index].main,
      extra:chosen[index].extra
    }));
  }

  function pickDeepMode(index=0){return Number(index)%2===0?'BTC':'DISCUSS'}

  const api={PRIMARY_WORKFLOWS,GUIDED_PAGE_ROLES,ROLE_CUES,depthScore,rankForDepth,compileGuidedPage,pickDeepMode};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.Room22FacilitationShell=api;

  function bootBrowser(){
    if(typeof document==='undefined')return;
    if(typeof teachState==='undefined'||typeof setScreen!=='function')return;

    const menu=root.Room22TeachingMenu||{};
    const $=selector=>document.querySelector(selector);
    let deepIndex=0;

    function injectStyles(){
      if($('#facilitationShellStyles'))return;
      const style=document.createElement('style');
      style.id='facilitationShellStyles';
      style.textContent=`
        .facilitation-workflows{margin-top:18px;display:grid;grid-template-columns:1.35fr 1fr 1fr;gap:12px}
        .facilitation-choice{min-height:118px;text-align:left;padding:16px;border-radius:16px;display:flex;flex-direction:column;gap:7px;justify-content:center}
        .facilitation-choice strong{font-size:20px;letter-spacing:.02em}
        .facilitation-choice span{font-size:14px;line-height:1.35;opacity:.82}
        .facilitation-choice.guided{border-width:3px}
        .facilitation-more{margin-top:12px}
        .facilitation-more summary,.projector-more summary{cursor:pointer;font-weight:900;font-size:13px;letter-spacing:.05em}
        .facilitation-advanced{margin-top:12px;padding-top:10px;border-top:1px solid rgba(127,127,127,.25)}
        .facilitation-advanced-control{margin-top:12px}
        .guided-page-surface{max-width:1060px;margin:0 auto;padding:18px}
        .guided-page-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;margin-bottom:12px}
        .guided-page-title{font-size:32px;font-weight:950;margin:0}
        .guided-page-target{font-size:15px;font-weight:800;opacity:.72;margin-top:4px}
        .guided-facilitator-strip{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0 16px}
        .guided-facilitator-strip span{font-size:12px;font-weight:950;letter-spacing:.07em;border:1px solid rgba(127,127,127,.35);border-radius:999px;padding:6px 9px}
        .guided-page-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .guided-block{border:2px solid rgba(127,127,127,.32);border-radius:16px;padding:14px 16px;min-height:150px;break-inside:avoid;background:var(--card,#fff)}
        .guided-role{font-size:12px;font-weight:950;letter-spacing:.09em;opacity:.68}
        .guided-role-cue{font-size:13px;font-weight:850;margin:3px 0 9px;opacity:.86}
        .guided-prompt{font-size:22px;font-weight:900;line-height:1.2;white-space:pre-wrap}
        .guided-sub{font-size:15px;line-height:1.35;margin-top:8px;opacity:.8;white-space:pre-wrap}
        .guided-extra{margin-top:10px;padding-top:9px;border-top:1px dashed rgba(127,127,127,.35);font-size:14px;line-height:1.35}
        .guided-extra b{font-size:11px;letter-spacing:.08em}
        .guided-page-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
        .projector-more{display:inline-block;position:relative}
        .projector-more > div{display:flex;gap:7px;flex-wrap:wrap;margin-top:7px}
        @media(max-width:760px){.facilitation-workflows,.guided-page-grid{grid-template-columns:1fr}.facilitation-choice{min-height:90px}.guided-prompt{font-size:20px}}
        @media print{
          body.guided-page-printing *{visibility:hidden!important}
          body.guided-page-printing #guidedPageSurface,
          body.guided-page-printing #guidedPageSurface *{visibility:visible!important}
          body.guided-page-printing #guidedPageSurface{position:absolute;left:0;top:0;width:100%;max-width:none;margin:0;padding:.25in;background:#fff;color:#000}
          body.guided-page-printing .guided-page-actions{display:none!important}
          body.guided-page-printing .guided-page-grid{grid-template-columns:1fr 1fr;gap:8px}
          body.guided-page-printing .guided-block{min-height:0;padding:10px 12px;border:1.5px solid #444;background:#fff;color:#000}
          body.guided-page-printing .guided-page-title{font-size:24px}
          body.guided-page-printing .guided-prompt{font-size:16px}
          body.guided-page-printing .guided-sub,body.guided-page-printing .guided-extra{font-size:11px}
          body.guided-page-printing .guided-role,body.guided-page-printing .guided-role-cue,body.guided-page-printing .guided-facilitator-strip span{font-size:9px}
        }
      `;
      document.head.appendChild(style);
    }

    function selectIntent(value='PRACTICE'){
      const button=$(`#teachIntentButtons button[data-intent="${value}"]`);
      if(button&&!button.classList.contains('selected'))button.click();
    }

    function selectMode(value){
      const button=$(`#teachModeButtons button[data-value="${value}"]`);
      if(button&&!button.classList.contains('selected'))button.click();
      teachState.mode=value;
    }

    function hideNormalControl(selector){
      const node=$(selector);
      if(!node)return null;
      const wrapper=node.parentElement;
      if(!wrapper)return null;
      wrapper.classList.add('facilitation-advanced-control');
      wrapper.remove();
      return wrapper;
    }

    function ensureGuidedSurface(){
      let surface=$('#guidedPageSurface');
      if(surface)return surface;
      surface=document.createElement('div');
      surface.id='guidedPageSurface';
      surface.className='guided-page-surface teach-hidden';
      $('#teach')?.appendChild(surface);
      return surface;
    }

    function sourceSet(mode){
      let items=[];
      try{
        items=teachState.subject==='MATH'
          ? (typeof teachMathSet==='function'?teachMathSet(teachState.skill,mode):[])
          : (typeof teachElaSet==='function'?teachElaSet(teachState.skill,mode):[]);
      }catch{
        items=[];
      }
      if(!Array.isArray(items))items=items?[items]:[];
      return items.filter(Boolean).map(normalizeItem);
    }

    function currentContextLine(){
      try{
        const raw=root.localStorage?.getItem('room22TeachingContext');
        const parsed=raw?JSON.parse(raw):null;
        const context=menu.normalizeContext?menu.normalizeContext(parsed||{}):parsed;
        if(teachState.subject==='ELA'&&context?.elaStory)return`CURRENT TEXT · ${context.elaStory}`;
        if(teachState.subject==='MATH'&&context?.mathFocus)return`CURRENT FOCUS · ${context.mathFocus}`;
      }catch{}
      return'';
    }

    function guidedSources(){
      return{
        quick:sourceSet('QUICK FIRE'),
        figure:sourceSet('FIGURE IT OUT'),
        btc:rankForDepth(sourceSet('BTC')),
        discuss:rankForDepth(sourceSet('DISCUSS'))
      };
    }

    function renderGuidedPage(){
      selectIntent('PRACTICE');
      const surface=ensureGuidedSurface();
      const page=compileGuidedPage(guidedSources());
      const contextLine=currentContextLine();
      const escText=value=>String(value||'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
      surface.innerHTML=`
        <div class="guided-page-head">
          <div>
            <div class="eyebrow">ROOM 22 · GUIDED PAGE</div>
            <h1 class="guided-page-title">${escText(teachState.skill)}</h1>
            <div class="guided-page-target">${escText(teachState.subject)}${contextLine?` · ${escText(contextLine)}`:''}</div>
          </div>
          <div class="small no-print">One page. Start at the top. Use what the room needs.</div>
        </div>
        <div class="guided-facilitator-strip"><span>START TOGETHER</span><span>TABLES</span><span>SHARE</span><span>CHECK</span></div>
        <div class="guided-page-grid">
          ${page.map((item,index)=>`<section class="guided-block">
            <div class="guided-role">${index+1} · ${escText(item.role)}</div>
            <div class="guided-role-cue">${escText(item.cue)}</div>
            <div class="guided-prompt">${escText(item.prompt)}</div>
            ${item.sub?`<div class="guided-sub">${escText(item.sub)}</div>`:''}
            ${item.extra?`<div class="guided-extra"><b>IF READY</b><br>${escText(item.extra.prompt)}${item.extra.sub?`<br><span>${escText(item.extra.sub)}</span>`:''}</div>`:''}
          </section>`).join('')}
        </div>
        <div class="guided-page-actions no-print"><button id="guidedPageNew" class="primary">NEW PAGE</button><button id="guidedPagePrint" class="secondary">PRINT</button><button id="guidedPageBack" class="secondary">BACK</button></div>
      `;
      $('#teachSetup')?.classList.add('teach-hidden');
      $('#teachProjector')?.classList.add('teach-hidden');
      surface.classList.remove('teach-hidden');
      $('#guidedPageNew').onclick=renderGuidedPage;
      $('#guidedPageBack').onclick=()=>{
        surface.classList.add('teach-hidden');
        $('#teachSetup')?.classList.remove('teach-hidden');
      };
      $('#guidedPagePrint').onclick=()=>{
        document.body.classList.add('guided-page-printing');
        const cleanup=()=>document.body.classList.remove('guided-page-printing');
        root.addEventListener?.('afterprint',cleanup,{once:true});
        root.print();
        root.setTimeout?.(cleanup,750);
      };
    }

    function launchQuickFire(){
      ensureGuidedSurface().classList.add('teach-hidden');
      selectIntent('PRACTICE');
      selectMode('QUICK FIRE');
      const start=$('#teachStartBtn');
      if(start)start.click();
      updateProjectorChrome();
    }

    function launchWin(){
      ensureGuidedSurface().classList.add('teach-hidden');
      setScreen('win');
    }

    function simplifySetup(){
      const card=$('#teachSetup .card');
      if(!card||$('#facilitationWorkflowPanel'))return;

      const hero=$('#teachSetup .hero');
      if(hero){
        const h=hero.querySelector('h1'),p=hero.querySelector('p');
        if(h)h.textContent='Room 22 Teaching Menu';
        if(p)p.textContent='Pick the target. Guided Page or Quick Fire. Go.';
      }
      const mrFrankBadge=$('#mrFrankModeBadge');
      if(mrFrankBadge)mrFrankBadge.style.display='none';
      const contextSummary=$('#teachContextSummary');
      if(contextSummary)contextSummary.style.display='none';

      const intentWrap=hideNormalControl('#teachIntentButtons');
      const modeWrap=hideNormalControl('#teachModeButtons');
      const oldActions=card.querySelector('.actions');
      if(oldActions)oldActions.style.display='none';

      const panel=document.createElement('div');
      panel.id='facilitationWorkflowPanel';
      panel.innerHTML=`
        <div class="facilitation-workflows">
          <button id="guidedPageLaunch" class="primary facilitation-choice guided" type="button"><strong>GUIDED PAGE</strong><span>One loaded page. Start together, move through it, check the room.</span></button>
          <button id="quickFireLaunch" class="secondary facilitation-choice" type="button"><strong>QUICK FIRE</strong><span>Ask around the room or table-to-table. Fast reps, fast feedback.</span></button>
          <button id="winStudentLaunch" class="secondary facilitation-choice" type="button"><strong>WIN / STUDENT</strong><span>Names, notes, intervention groups, and targeted ladders.</span></button>
        </div>
        <details id="facilitationMoreOptions" class="facilitation-more"><summary>MORE OPTIONS</summary><div class="facilitation-advanced"></div></details>
      `;
      const context=$('#teachContextDetails');
      card.insertBefore(panel,context||oldActions||null);

      const advanced=panel.querySelector('.facilitation-advanced');
      if(intentWrap)advanced.appendChild(intentWrap);
      if(modeWrap)advanced.appendChild(modeWrap);
      if(context)advanced.appendChild(context);
      const standards=$('#teachStandardsBtn');
      if(standards){
        const button=document.createElement('button');
        button.type='button';button.className='secondary';button.textContent='STANDARDS CHECK';button.style.marginTop='12px';
        button.onclick=()=>standards.click();
        advanced.appendChild(button);
      }

      $('#guidedPageLaunch').onclick=renderGuidedPage;
      $('#quickFireLaunch').onclick=launchQuickFire;
      $('#winStudentLaunch').onclick=launchWin;
    }

    function deepPrompt(){
      if(teachState.mode!=='QUICK FIRE'||!teachState.sequence?.length)return;
      const originalMode=teachState.mode;
      const deepMode=pickDeepMode(deepIndex++);
      teachState.mode=deepMode;
      const pool=rankForDepth(sourceSet(deepMode));
      teachState.mode=originalMode;
      if(!pool.length)return;
      let chosen=pool[0];
      if(menu.applyIntentToSequence){
        const intent=$('#teachIntentButtons button.selected')?.dataset.intent||'PRACTICE';
        chosen=menu.applyIntentToSequence([chosen],intent,teachState.subject,teachState.skill,'CURRENT')[0]||chosen;
      }
      teachState.sequence[teachState.index]={...chosen,deepMode};
      teachState.mode=originalMode;
      renderTeachProjector();
    }

    function updateProjectorChrome(){
      const quick=teachState.mode==='QUICK FIRE';
      const deeper=$('#teachDeeper');
      if(deeper)deeper.style.display=quick?'':'none';
      const cueRail=$('#teachCueRail');
      if(cueRail)cueRail.style.display=quick?'none':'';
      const moveBadge=$('#teachMoveBadge');
      const metaRow=moveBadge?.parentElement;
      if(metaRow)metaRow.style.display=quick?'none':'';
    }

    function simplifyProjector(){
      const controls=$('.teach-controls');
      if(!controls)return;
      if(!$('#teachDeeper')){
        const deeper=document.createElement('button');
        deeper.id='teachDeeper';deeper.type='button';deeper.className='secondary';deeper.textContent='DEEPER';
        deeper.onclick=deepPrompt;
        const easier=$('#teachEasier')||$('#teachNext');
        controls.insertBefore(deeper,easier||null);
      }

      if(!$('#teachProjectorMore')){
        const details=document.createElement('details');
        details.id='teachProjectorMore';details.className='projector-more';
        details.innerHTML='<summary>MORE</summary><div></div>';
        const box=details.querySelector('div');
        ['#teachAnotherLike','#teachChangeMove','#teachHarder','#teachNew'].forEach(selector=>{
          const button=$(selector);if(button)box.appendChild(button);
        });
        controls.appendChild(details);
      }

      if(typeof renderTeachProjector==='function'&&!renderTeachProjector.__facilitationWrapped){
        const previous=renderTeachProjector;
        const wrapped=function(){previous();updateProjectorChrome()};
        wrapped.__facilitationWrapped=true;
        renderTeachProjector=wrapped;
      }
      $('#teachModeButtons')?.querySelectorAll('button').forEach(button=>button.addEventListener('click',updateProjectorChrome));
      updateProjectorChrome();
    }

    injectStyles();
    ensureGuidedSurface();
    simplifySetup();
    simplifyProjector();
  }

  if(typeof document!=='undefined'){
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootBrowser,{once:true});
    else root.setTimeout?.(bootBrowser,0);
  }
})(typeof globalThis!=='undefined'?globalThis:this);
