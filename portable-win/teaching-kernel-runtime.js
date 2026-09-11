// Browser orchestration hardening for the Room 22 Teaching Menu.
// Keeps instructional intent separate from facilitation and prevents TEACH from being structurally shuffled.
(function(root){
  if(typeof document==='undefined')return;

  function boot(){
    const menu=root.Room22TeachingMenu;
    if(!menu||typeof teachState==='undefined'||typeof renderTeachProjector!=='function')return;

    let recentMoves=[];
    let difficulty='CURRENT';

    function currentIntent(){
      const selected=document.querySelector('#teachIntentButtons button.selected');
      return selected?.dataset.intent||'PRACTICE';
    }

    function rawSequence(){
      let seq=teachState.subject==='MATH'
        ? teachMathSet(teachState.skill,teachState.mode)
        : teachElaSet(teachState.skill,teachState.mode);
      if(!seq||!seq.length){
        seq=teachState.subject==='MATH'
          ? teachMathPrompt(teachState.skill,teachState.mode)
          : teachElaPrompt(teachState.skill,teachState.mode);
      }
      return seq||[];
    }

    function normalizeSequence(raw,{allowVariation=true}={}){
      const intent=currentIntent();
      const alreadyWrapped=raw.length&&raw.every(x=>x&&x.intent===intent&&x.difficulty===difficulty);
      let seq=alreadyWrapped
        ? raw.map(x=>({...x}))
        : menu.applyIntentToSequence(raw,intent,teachState.subject,teachState.skill,difficulty);

      // Review and Practice benefit from structural variation. Teach needs to preserve
      // its Connect -> Notice -> Try Together -> Explain -> Practice -> Check arc.
      if(allowVariation&&intent!=='TEACH'){
        seq=menu.varySequenceStart(seq,recentMoves,Math.random);
      }
      return seq;
    }

    function rememberCurrent(){
      const x=teachState.sequence&&teachState.sequence[teachState.index];
      if(!x)return;
      recentMoves=menu.rememberMove(recentMoves,x.move||menu.classifyTeachingMove(x));
    }

    function newSequence(){
      teachState.sequence=normalizeSequence(rawSequence());
      teachState.index=0;
      teachState.lastKey=[teachState.subject,teachState.skill,teachState.mode,currentIntent(),teachState.sequence[0]?.prompt].join('|');
      renderTeachProjector();
      rememberCurrent();
    }

    function replaceCurrent(kind){
      if(!teachState.sequence||!teachState.sequence.length)return;
      const current=teachState.sequence[teachState.index];
      const pool=normalizeSequence(rawSequence(),{allowVariation:false});
      let choices=pool;
      if(kind==='same'){
        const same=pool.filter(x=>x.move===current.move);
        if(same.length)choices=same;
      }else{
        const different=pool.filter(x=>x.move!==current.move);
        if(different.length)choices=different;
      }
      const chosen=menu.chooseStructuralMove(choices,[...recentMoves,current.move],Math.random)||choices[0];
      if(chosen)teachState.sequence[teachState.index]=chosen;
      renderTeachProjector();
      rememberCurrent();
    }

    const start=document.querySelector('#teachStartBtn');
    if(start)start.onclick=()=>{
      document.querySelector('#teachSetup')?.classList.add('teach-hidden');
      document.querySelector('#teachProjector')?.classList.remove('teach-hidden');
      newSequence();
    };

    const fresh=document.querySelector('#teachNew');
    if(fresh)fresh.onclick=newSequence;

    const next=document.querySelector('#teachNext');
    if(next)next.onclick=()=>{
      if(teachState.index<teachState.sequence.length-1){
        teachState.index++;
        renderTeachProjector();
        rememberCurrent();
      }else if(teachState.mode==='QUICK FIRE'){
        newSequence();
      }else{
        document.querySelector('#teachProjector')?.classList.add('teach-hidden');
        document.querySelector('#teachSetup')?.classList.remove('teach-hidden');
      }
    };

    const another=document.querySelector('#teachAnotherLike');
    if(another)another.onclick=()=>replaceCurrent('same');
    const change=document.querySelector('#teachChangeMove');
    if(change)change.onclick=()=>replaceCurrent('change');

    for(const [id,target] of [['#teachEasier','EASIER'],['#teachHarder','HARDER']]){
      const button=document.querySelector(id);
      if(!button)continue;
      const original=button.onclick;
      button.onclick=()=>{
        if(difficulty===target)return;
        if(typeof original==='function')original();
        difficulty=target;
        replaceCurrent('same');
      };
    }

    document.querySelectorAll('#teachModeButtons button').forEach(button=>{
      button.addEventListener('click',()=>{
        // This mirror is intentionally informational. teachState.mode remains the source of truth.
        document.querySelector('#teachSetup')?.setAttribute('data-facilitation',button.dataset.value||teachState.mode);
      });
    });
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else setTimeout(boot,0);
})(typeof globalThis!=='undefined'?globalThis:this);
