(function(root,factory){
  const api=factory();
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  if(root)root.Room22AdaptiveAssessment=api;
  if(root&&typeof root.document!=='undefined')api.installBrowserBridge(root);
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const MAX_EXTRA_PROBES=2;
  const RAPID_SECONDS=0.75;
  const RAPID_MIN_RESPONSES=4;
  const RAPID_RATIO=0.75;
  const RAPID_LOW_ACCURACY=0.60;

  function numeric(value,fallback=0){const n=Number(value);return Number.isFinite(n)?n:fallback}
  function components(def){return Array.isArray(def?.components)?def.components.filter(Boolean):[]}
  function plannedCount(def,component){return Math.max(1,numeric(def?.counts?.[component],1))}
  function answeredResponses(responses){return (Array.isArray(responses)?responses:[]).filter(Boolean)}

  function evidenceFor(def,items,responses){
    const out={};
    for(const component of components(def))out[component]={answered:0,correct:0,total:plannedCount(def,component)};
    (Array.isArray(items)?items:[]).forEach((item,index)=>{
      const response=responses?.[index];
      const component=item?.category;
      if(!response||!component)return;
      if(!out[component])out[component]={answered:0,correct:0,total:plannedCount(def,component)};
      out[component].answered++;
      if(response.correct===true)out[component].correct++;
    });
    return out;
  }

  function qualityFor(responses){
    const answered=answeredResponses(responses);
    const correct=answered.filter(response=>response.correct===true).length;
    const timed=answered.filter(response=>Number.isFinite(Number(response.responseSeconds))&&Number(response.responseSeconds)>=0);
    const rapid=timed.filter(response=>Number(response.responseSeconds)<=RAPID_SECONDS).length;
    const rapidRatio=answered.length?rapid/answered.length:0;
    const accuracy=answered.length?correct/answered.length:0;
    const lowQualityRapid=answered.length>=RAPID_MIN_RESPONSES&&rapidRatio>=RAPID_RATIO&&accuracy<RAPID_LOW_ACCURACY;
    return {answered:answered.length,correct,accuracy,rapidResponses:rapid,rapidRatio,lowQualityRapid};
  }

  function weakestComponent(def,evidence,{preferCoverage=false}={}){
    const list=components(def);
    if(!list.length)return null;
    const unsampled=list.find(component=>(evidence[component]?.answered||0)===0);
    if(unsampled)return unsampled;
    if(preferCoverage){
      const incomplete=list.filter(component=>(evidence[component]?.answered||0)<plannedCount(def,component));
      if(incomplete.length){
        incomplete.sort((a,b)=>(evidence[a]?.answered||0)-(evidence[b]?.answered||0)||list.indexOf(a)-list.indexOf(b));
        return incomplete[0];
      }
    }
    return [...list].sort((a,b)=>{
      const ea=evidence[a]||{answered:0,correct:0},eb=evidence[b]||{answered:0,correct:0};
      const ra=ea.answered?ea.correct/ea.answered:0,rb=eb.answered?eb.correct/eb.answered:0;
      return ra-rb||ea.correct-eb.correct||ea.answered-eb.answered||list.indexOf(a)-list.indexOf(b);
    })[0];
  }

  function baseResult({state,result,stop,confidence,reason,evidence,quality,def,items,responses,nextComponent=null}){
    const answered=quality.answered,correct=quality.correct,total=Math.max(0,numeric(def?.total,Array.isArray(items)?items.length:0));
    return {
      state,result,stop,confidence,reason,evidence,
      answered,correct,
      nextComponent,
      extraProbeCount:Math.max(0,answered-total),
      evidenceQuality:quality.lowQualityRapid?'LOW_QUALITY_RAPID':'USABLE',
      quality,
    };
  }

  function evaluate(def,items,responses,options={}){
    const evidence=evidenceFor(def,items,responses);
    const quality=qualityFor(responses);
    const list=components(def);
    const answered=quality.answered,correct=quality.correct;
    const total=Math.max(1,numeric(def?.total,Array.isArray(items)?items.length:1));
    const minEarly=Math.max(1,numeric(def?.minEarly,total));
    const requiredCorrect=Math.max(1,numeric(def?.requiredCorrect,total));
    const extraProbeCount=Math.max(0,answered-total);
    const allSampled=list.every(component=>(evidence[component]?.answered||0)>=1);
    const allShown=list.every(component=>(evidence[component]?.correct||0)>=1);
    const earlyThreshold=Math.max(list.length,requiredCorrect-1);

    if(quality.lowQualityRapid){
      return baseResult({state:'INSUFFICIENT_EVIDENCE',result:'NOT ENOUGH EVIDENCE',stop:true,confidence:'LOW',reason:'Response pattern was too rapid and low-quality to treat as reliable proficiency evidence.',evidence,quality,def,items,responses,nextComponent:weakestComponent(def,evidence,{preferCoverage:true})});
    }

    const decisiveWeak=list.find(component=>{
      const e=evidence[component]||{answered:0,correct:0};
      return e.answered>=Math.min(2,plannedCount(def,component))&&e.correct===0;
    });
    if(decisiveWeak){
      return baseResult({state:'NEEDS_SUPPORT',result:'NOT YET',stop:true,confidence:'HIGH',reason:`${decisiveWeak} was sampled repeatedly and was not yet demonstrated.`,evidence,quality,def,items,responses,nextComponent:decisiveWeak});
    }

    if(answered<total&&allSampled&&allShown&&answered>=minEarly&&correct>=earlyThreshold){
      return baseResult({state:'SECURE_3',result:'LEVEL 3 DEMONSTRATED',stop:true,confidence:'HIGH',reason:'Required Level 3 components were demonstrated with enough consistent evidence to stop early.',evidence,quality,def,items,responses});
    }

    if(options?.timedOut){
      return baseResult({state:'INSUFFICIENT_EVIDENCE',result:'NOT ENOUGH EVIDENCE',stop:true,confidence:'LOW',reason:'Time ended before enough reliable evidence was collected.',evidence,quality,def,items,responses,nextComponent:weakestComponent(def,evidence,{preferCoverage:true})});
    }

    if(answered<minEarly){
      const likely=allSampled&&allShown&&correct>=Math.max(list.length,answered-1);
      return baseResult({state:likely?'LIKELY_3':'GATHERING',result:'CONTINUE',stop:false,confidence:likely?'MEDIUM':'LOW',reason:likely?'Evidence is trending toward Level 3, but one more useful sample will raise confidence.':'More evidence is needed before making a proficiency decision.',evidence,quality,def,items,responses,nextComponent:weakestComponent(def,evidence,{preferCoverage:true})});
    }

    if(answered<total){
      return baseResult({state:'GATHERING',result:'CONTINUE',stop:false,confidence:allSampled?'MEDIUM':'LOW',reason:'Continue until the required components have enough evidence.',evidence,quality,def,items,responses,nextComponent:weakestComponent(def,evidence,{preferCoverage:true})});
    }

    if(allShown&&correct>=requiredCorrect){
      return baseResult({state:'SECURE_3',result:'LEVEL 3 DEMONSTRATED',stop:true,confidence:extraProbeCount?'MEDIUM':'HIGH',reason:extraProbeCount?'Level 3 was demonstrated after a targeted confirmation item.':'Required Level 3 components were demonstrated.',evidence,quality,def,items,responses});
    }

    const borderline=allShown&&correct>=requiredCorrect-1&&extraProbeCount<MAX_EXTRA_PROBES;
    if(borderline){
      return baseResult({state:'GATHERING',result:'CONTINUE',stop:false,confidence:'MEDIUM',reason:'Evidence is close but mixed. Ask one targeted item in the weakest component before deciding.',evidence,quality,def,items,responses,nextComponent:weakestComponent(def,evidence)});
    }

    const nextComponent=weakestComponent(def,evidence);
    return baseResult({state:'NEEDS_SUPPORT',result:'NOT YET',stop:true,confidence:'MEDIUM',reason:'The available evidence does not yet support a secure Level 3. Teach the weakest component and recheck later.',evidence,quality,def,items,responses,nextComponent});
  }

  function buildTargetedProbePlan(def,items,responses,outcome){
    const evidence=outcome?.evidence||evidenceFor(def,items,responses);
    const component=outcome?.nextComponent||weakestComponent(def,evidence);
    if(!component)return null;
    const priorItems=(Array.isArray(items)?items:[]).filter(item=>item?.category===component).length;
    return {component,variant:Math.max(2,priorItems),reason:'BORDERLINE_EVIDENCE'};
  }

  function installBrowserBridge(root){
    if(!root||root.__room22AdaptiveAssessmentInstalled)return false;
    const previousDetermine=root.determineProficiencyOutcome;
    if(typeof previousDetermine!=='function')return false;

    function runtimeStandards(){
      try{
        if(typeof PROF_STANDARDS!=='undefined')return PROF_STANDARDS;
      }catch{}
      return root.PROF_STANDARDS||{};
    }
    function runtimeState(){
      try{
        if(typeof profState!=='undefined')return profState;
      }catch{}
      return root.profState||null;
    }

    root.__room22AdaptiveAssessmentInstalled=true;

    const previousRender=root.renderProfQuestion;
    if(typeof previousRender==='function'){
      root.renderProfQuestion=function(){
        const state=runtimeState();
        if(state)state.__adaptiveQuestionStartedAt=Date.now();
        return previousRender.apply(this,arguments);
      };
    }

    root.determineProficiencyOutcome=function(standard,items,responses,timedOut=false){
      const def=runtimeStandards()?.[standard];
      if(!def)return previousDetermine.apply(this,arguments);
      const state=runtimeState();
      if(state&&Array.isArray(responses)){
        for(let i=responses.length-1;i>=0;i--){
          const response=responses[i];
          if(!response)continue;
          if(!Number.isFinite(Number(response.responseSeconds))&&Number.isFinite(state.__adaptiveQuestionStartedAt)){
            response.responseSeconds=Math.max(0,(Date.now()-state.__adaptiveQuestionStartedAt)/1000);
          }
          break;
        }
      }
      const outcome=evaluate(def,items,responses,{timedOut});
      if(outcome.result==='CONTINUE'&&outcome.answered>=def.total&&outcome.extraProbeCount<MAX_EXTRA_PROBES&&outcome.nextComponent&&typeof root.profGenerator==='function'){
        const plan=buildTargetedProbePlan(def,items,responses,outcome);
        if(plan&&Array.isArray(items)&&Array.isArray(responses)&&items.length<=def.total+outcome.extraProbeCount){
          try{
            const probe=root.profGenerator(standard,plan.component,plan.variant);
            if(probe){items.push(probe);responses.push(null);outcome.plannedProbe=plan;}
          }catch{}
        }
      }
      return outcome;
    };

    const previousFinish=root.finishProficiency;
    if(typeof previousFinish==='function'){
      root.finishProficiency=function(timedOut=false,known=null){
        const result=previousFinish.apply(this,arguments);
        const state=runtimeState();
        const attempt=state?.attempt;
        const def=attempt&&runtimeStandards()?.[attempt.standard];
        if(attempt&&def){
          const adaptive=evaluate(def,attempt.items,attempt.responses,{timedOut:!!attempt.timedOut});
          attempt.assessmentState=adaptive.state;
          attempt.confidence=adaptive.confidence;
          attempt.nextComponent=adaptive.nextComponent;
          attempt.extraProbeCount=adaptive.extraProbeCount;
          attempt.evidenceQuality=adaptive.evidenceQuality;
          attempt.adaptiveReason=adaptive.reason;
          attempt.blueprintVersion=String(attempt.blueprintVersion||'Q1-L3-V2').includes('ADAPTIVE')?attempt.blueprintVersion:`${attempt.blueprintVersion||'Q1-L3-V2'}+ADAPTIVE-V1`;
          if(typeof root.saveProficiencyAttempt==='function')root.saveProficiencyAttempt(attempt);
        }
        return result;
      };
    }

    const previousResults=root.renderProficiencyResults;
    if(typeof previousResults==='function'){
      root.renderProficiencyResults=function(attempt){
        const result=previousResults.apply(this,arguments);
        if(attempt?.confidence&&root.document){
          const banner=root.document.querySelector('.prof-result-banner');
          if(banner&&!banner.querySelector('.adaptive-confidence')){
            const chip=root.document.createElement('div');
            chip.className='small adaptive-confidence';
            chip.style.marginTop='8px';
            chip.style.fontWeight='900';
            chip.textContent=`EVIDENCE CONFIDENCE · ${attempt.confidence}${attempt.extraProbeCount?` · ${attempt.extraProbeCount} TARGETED CHECK${attempt.extraProbeCount===1?'':'S'}`:''}`;
            banner.appendChild(chip);
          }
        }
        return result;
      };
    }
    return true;
  }

  return {MAX_EXTRA_PROBES,evaluate,evidenceFor,qualityFor,buildTargetedProbePlan,installBrowserBridge};
});
