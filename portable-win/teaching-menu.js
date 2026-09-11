(function(root){
  const MR_FRANK_ID='__ROOM22_DEMO__';
  const ELA_SKILLS=['READ & THINK','INFERENCE / EVIDENCE','LANGUAGE PLAY','CURRENT TEXT TALK'];
  const INSTRUCTIONAL_INTENTS=['REVIEW','PRACTICE','TEACH'];
  const FACILITATION_MODES=['FIGURE IT OUT','BTC','QUICK FIRE','DISCUSS'];
  const TEACHER_CUE_LABELS=['ASK','LOOK FOR','IF STUCK','PUSH','CONNECT'];
  const DIFFICULTIES=['EASIER','CURRENT','HARDER'];
  const DEFAULT_CONTEXT={
    mathFocus:'',
    elaStory:'Not Norman',
    vocabulary:[],
    grammarFocus:'',
    writingFocus:'',
    essentialQuestion:''
  };

  function defaultSurface(){return 'teach'}
  function defaultAssessmentIdentity(){return MR_FRANK_ID}
  function choose(items,rng=Math.random){
    if(!items||!items.length)return null;
    const raw=Number(rng());
    const n=Number.isFinite(raw)?Math.max(0,Math.min(0.999999,raw)):0;
    return items[Math.floor(n*items.length)];
  }
  function takeForMode(items,mode){return items.slice(0,mode==='QUICK FIRE'?8:6)}
  function normalizeContext(input={}){
    const src=input&&typeof input==='object'?input:{};
    const list=value=>Array.isArray(value)?value.map(x=>String(x).trim()).filter(Boolean):String(value||'').split(',').map(x=>x.trim()).filter(Boolean);
    return {
      mathFocus:String(src.mathFocus||''),
      elaStory:String(src.elaStory||src.currentText||DEFAULT_CONTEXT.elaStory),
      vocabulary:list(src.vocabulary),
      grammarFocus:String(src.grammarFocus||''),
      writingFocus:String(src.writingFocus||''),
      essentialQuestion:String(src.essentialQuestion||'')
    };
  }
  function createTeachingState(overrides={}){
    return {
      subject:'MATH',
      skill:'TENS + ONES',
      intent:'PRACTICE',
      facilitation:'FIGURE IT OUT',
      difficulty:'CURRENT',
      recentMoves:[],
      context:normalizeContext(DEFAULT_CONTEXT),
      ...overrides,
      context:normalizeContext(overrides.context||DEFAULT_CONTEXT),
      recentMoves:Array.isArray(overrides.recentMoves)?[...overrides.recentMoves]:[]
    };
  }
  function item(move,prompt,sub='',cue=null){return{move,prompt,sub,cue}}
  function rememberMove(history,move,max=5){
    const out=Array.isArray(history)?history.filter(Boolean):[];
    if(move)out.push(move);
    return out.slice(-max);
  }
  function chooseStructuralMove(pool,recentMoves=[],rng=Math.random){
    if(!Array.isArray(pool)||!pool.length)return null;
    const recent=(Array.isArray(recentMoves)?recentMoves:[]).filter(Boolean);
    const immediate=recent.length?recent[recent.length-1]:null;
    let choices=pool.filter(x=>x&&x.move!==immediate);
    if(!choices.length)choices=[...pool];
    const recentSet=new Set(recent.slice(-3));
    const fresh=choices.filter(x=>!recentSet.has(x.move));
    if(fresh.length)choices=fresh;
    return choose(choices,rng);
  }
  function classifyTeachingMove(entry={}){
    if(entry.move)return entry.move;
    const text=`${entry.prompt||''} ${entry.sub||''}`.toLowerCase();
    if(/error|mistake|fix|wrong|trap/.test(text))return 'ERROR HUNT';
    if(/evidence|prove|convince|defend/.test(text))return 'PROVE IT';
    if(/compare|which strategy|same and different/.test(text))return 'COMPARE';
    if(/another way|different way|two ways|three ways|represent/.test(text))return 'SHOW ANOTHER WAY';
    if(/predict|what.*next|could happen/.test(text))return 'PREDICT';
    if(/first|next|sequence|order/.test(text))return 'SEQUENCE';
    if(/why|explain|how do you know/.test(text))return 'EXPLAIN';
    if(/read|blend|fluency|phrase/.test(text))return 'READ';
    if(/choose|agree|disagree|true or false|which/.test(text))return 'PICK A SIDE';
    if(/build|make|create|write/.test(text))return 'BUILD IT';
    return 'TRY IT';
  }
  function teacherCueFor(intent,move,subject='MATH'){
    const key=String(move||'TRY IT');
    if(intent==='REVIEW'){
      if(/READ|TRY IT/.test(key))return{label:'LOOK FOR',text:'Let them retrieve before helping. Scan for who is ready and who is hesitating.'};
      if(/PROVE|EXPLAIN|COMPARE/.test(key))return{label:'ASK',text:'How did you know? Keep the explanation short and student-owned.'};
      return{label:'ASK',text:'Give think time first. This should feel familiar.'};
    }
    if(intent==='TEACH'){
      if(/ERROR/.test(key))return{label:'LOOK FOR',text:'Notice the misconception before naming the fix. Let students locate the broken idea.'};
      if(/COMPARE|SHOW ANOTHER WAY/.test(key))return{label:'CONNECT',text:'Connect the new idea to something they already know before pushing the comparison.'};
      if(/PROVE|EXPLAIN/.test(key))return{label:'PUSH',text:'Ask for the why, then name only the new part students still need.'};
      return{label:'CONNECT',text:subject==='ELA'?'Connect this to the text, language pattern, or meaning they already know.':'Connect this to a familiar number relationship or representation before modeling the new part.'};
    }
    if(/ERROR/.test(key))return{label:'LOOK FOR',text:'Watch what students diagnose first. Ask what the wrong answer reveals.'};
    if(/COMPARE|SHOW ANOTHER WAY/.test(key))return{label:'ASK',text:'Which approach is clearer here? Ask students to compare, not just display answers.'};
    if(/PROVE|EXPLAIN/.test(key))return{label:'PUSH',text:'Do not accept only the answer. Ask for the clue, representation, or reason.'};
    return{label:'LOOK FOR',text:'Scan for strategy choice and independence before deciding whether to help.'};
  }
  function applyDifficulty(entry,difficulty='CURRENT'){
    const out={...entry};
    if(difficulty==='EASIER')out.sub=[out.sub,'Start with one small step or an oral response. Offer a choice or representation if needed.'].filter(Boolean).join(' ');
    if(difficulty==='HARDER')out.sub=[out.sub,'Push for a second example, comparison, stronger word, or proof.'].filter(Boolean).join(' ');
    out.difficulty=difficulty;
    return out;
  }
  function applyIntentToSequence(sequence,intent='PRACTICE',subject='MATH',skill='',difficulty='CURRENT'){
    const phases=intent==='TEACH'?['CONNECT','NOTICE','TRY TOGETHER','EXPLAIN','PRACTICE','CHECK']:[];
    return (sequence||[]).map((raw,i)=>{
      const move=classifyTeachingMove(raw);
      const cue=raw.cue||teacherCueFor(intent,move,subject);
      const out=applyDifficulty({...raw,move,cue},difficulty);
      if(phases.length)out.phase=phases[Math.min(i,phases.length-1)];
      out.intent=intent;
      out.skill=skill;
      return out;
    });
  }
  function varySequenceStart(sequence,recentMoves=[],rng=Math.random){
    if(!Array.isArray(sequence)||sequence.length<2)return sequence||[];
    const first=chooseStructuralMove(sequence,recentMoves,rng);
    if(!first)return sequence;
    return [first,...sequence.filter(x=>x!==first)];
  }

  const READ_BANK=[
    {text:'Kai heard rain tapping the window. He grabbed his boots and put his jacket by the door.',answer:'Kai is getting ready to go outside in the rain.'},
    {text:'Nia set a bowl beside the sleepy puppy. The puppy stood up and hurried over.',answer:'The puppy probably expects food or water.'},
    {text:'Milo carried a stack of books carefully. When one started to slide, Ana reached out and caught it.',answer:'Ana noticed a book was about to fall and helped.'},
    {text:'Leilani looked at the dark clouds, then moved the class plants under the roof. A minute later, heavy drops began to fall.',answer:'Leilani expected rain and protected the plants.'},
    {text:'Tane finished tying his shoe, looked at the clock, and hurried toward the door with his backpack.',answer:'Tane is trying to leave on time.'},
    {text:'A small bird landed near the open lunch bag. Maya zipped the bag and moved it closer to her chair.',answer:'Maya wants to keep the bird away from the food.'}
  ];
  const INFERENCE_BANK=[
    {text:'Ari checked the clock twice and kept looking toward the door. When Dad finally walked in, Ari jumped up smiling.',answer:'Ari was waiting and excited to see Dad.'},
    {text:'The sidewalk was wet, and puddles covered the playground. Kea took off his hood and folded his umbrella.',answer:'It probably rained recently.'},
    {text:'Maya whispered, “I practiced this part all week.” She took a slow breath and walked toward the microphone.',answer:'Maya may be nervous but prepared to perform.'},
    {text:'Noah put the empty cookie plate in the sink and wiped crumbs from his shirt before Mom came into the room.',answer:'Noah probably ate the cookies and is cleaning up the evidence.'},
    {text:'The class cheered when Lani carried the plant back to the sunny window. Its leaves had started to lift again.',answer:'The plant was doing better after getting what it needed.'}
  ];

  function readThinkMoves(rng){
    const s=choose(READ_BANK,rng);
    return [
      item('READ & RETELL',`${s.text}\n\nTell the tiny story back in your own words.`,'Keep the important parts. You do not need every word.'),
      item('SEQUENCE',`${s.text}\n\nWhat happened FIRST?`,'Then tell what happened next.'),
      item('FIND THE CLUE',`${s.text}\n\nFind a clue that helps you understand what is happening.`,'Point to words that prove your idea.'),
      item('EXPLAIN',`${s.text}\n\nWhy did the character probably do that?`,'Use something from the text in your answer.'),
      item('PREDICT',`${s.text}\n\nWhat could happen next?`,'Make a prediction that fits the clues.'),
      item('TITLE IT',`${s.text}\n\nGive this tiny story a good title.`,'Explain why your title fits.'),
      item('DRAW THE PROOF',`${s.text}\n\nDraw the moment that best shows what happened.`,'Which sentence does your drawing prove?'),
      item('STRONGER EXAMPLE',`${s.text}\n\nSay what happened in ONE strong sentence.`,'Keep the meaning, lose the extra words.')
    ];
  }
  function inferenceMoves(rng){
    const s=choose(INFERENCE_BANK,rng);
    return [
      item('INFER',`${s.text}\n\nWhat can you figure out even though the author did not say it directly?`,'Tell the idea first.'),
      item('PROVE IT',`${s.text}\n\nWhich clue best PROVES your idea?`,'Point to the words that made you think it.'),
      item('FEELING + WHY',`${s.text}\n\nHow is someone probably feeling?`,'Do not stop at the feeling. Give the clue.'),
      item('BEFORE',`${s.text}\n\nWhat might have happened just BEFORE this?`,'Your answer has to fit the evidence.'),
      item('PREDICT',`${s.text}\n\nWhat is a reasonable thing that could happen NEXT?`,'Use the scene, not a random guess.'),
      item('CHARACTER THINKING',`${s.text}\n\nWhat might the character be thinking right now?`,'What clue supports that thought?'),
      item('PICK A SIDE',`${s.text}\n\nMr. Frank says: “There is not enough information to figure anything out.”\nAgree or disagree?`,'Convince him with evidence.'),
      item('PROVE IT',`${s.text}\n\nClaim: ${s.answer}`,'What evidence from the text would you use to prove this claim?')
    ];
  }
  function languagePlayMoves(){
    return [
      item('ERROR HUNT','TEACHER TRAP\nMr. Frank says: “The gigantic whale was tiny.”\nCatch the problem.','Fix it so the sentence makes sense.'),
      item('STRONGER EXAMPLE','The dog went fast.','Replace “went fast” with a stronger word or phrase.'),
      item('PICK A SIDE','The rain was pouring.\nA. Mia grabbed an umbrella.\nB. Mia put ice cream in her shoe.','Choose one. Explain what makes it fit.'),
      item('BUILD IT','dog','Turn this word into a complete sentence. Then add WHERE.'),
      item('ERROR HUNT','me and my brother goed outside','Fix what sounds wrong. Read your new sentence aloud.'),
      item('BUILD IT','When the bell rang, __________.','Finish the thought so the sentence makes sense.'),
      item('MAKE IT CLEAR','She put it over there.','Change the sentence so a reader knows WHO, WHAT, and WHERE.'),
      item('WEIRD OR WORKS?','The sleepy pencil barked at the moon.','It is grammatically possible, but does the meaning work? Make it sensible OR make the weirdness even better.')
    ];
  }
  function currentTextMoves(context={}){
    const c=normalizeContext(context),title=c.elaStory||'our current text';
    const vocab=c.vocabulary.length?c.vocabulary.slice(0,4).join(' · '):'one important word from the text';
    return [
      item('RETELL',`Think about ${title}.\n\nRetell ONE important part in your own words.`,'What absolutely has to be included?'),
      item('SEQUENCE',`Think about ${title}.\n\nName an important event. What happened just before or after it?`,'Keep the order accurate.'),
      item('CHARACTER THINKING',`Think about ${title}.\n\nChoose a character. What did that character want or care about?`,'What part of the text makes you think that?'),
      item('PROVE IT',`Think about ${title}.\n\nMake one claim about a character, problem, or important idea.`,'Now point to a moment from the text that supports it.'),
      item('VOCABULARY',`Words from our current work: ${vocab}`,'Choose one. Explain it, act it out, draw it, or use it in a new sentence.'),
      item('PICK A SIDE',`Think about ${title}.\n\nWas a character's choice a good choice?`,'Pick a side and defend it with what happened.'),
      item('STRONGER EXAMPLE',`Think about ${title}.\n\nDescribe one important moment in ONE strong sentence.`,'Add a precise verb or detail.'),
      item('QUESTION MAKER',`Think about ${title}.\n\nMake a question that would prove whether someone really understood the text.`,'Then answer your own question.')
    ];
  }
  function buildElaTeachingMoves(skill,mode='FIGURE IT OUT',rng=Math.random,options={}){
    let moves;
    if(skill==='READ & THINK')moves=readThinkMoves(rng);
    else if(skill==='INFERENCE / EVIDENCE')moves=inferenceMoves(rng);
    else if(skill==='LANGUAGE PLAY')moves=languagePlayMoves();
    else if(skill==='CURRENT TEXT TALK')moves=currentTextMoves(options.context||DEFAULT_CONTEXT);
    else moves=[];
    const taken=takeForMode(moves,mode);
    const intent=options.intent||'PRACTICE';
    return applyIntentToSequence(taken,intent,'ELA',skill,options.difficulty||'CURRENT');
  }

  const api={
    MR_FRANK_ID,ELA_SKILLS,INSTRUCTIONAL_INTENTS,FACILITATION_MODES,TEACHER_CUE_LABELS,DIFFICULTIES,
    DEFAULT_CONTEXT,defaultSurface,defaultAssessmentIdentity,normalizeContext,createTeachingState,
    chooseStructuralMove,rememberMove,classifyTeachingMove,teacherCueFor,applyIntentToSequence,
    varySequenceStart,buildElaTeachingMoves
  };
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.Room22TeachingMenu=api;

  function bootBrowser(){
    if(typeof document==='undefined')return;
    const runtime=createTeachingState({context:loadContext()});

    function safeStoreGet(key,fallback){
      try{
        if(typeof store!=='undefined'&&store&&typeof store.get==='function')return store.get(key,fallback);
        const raw=root.localStorage&&root.localStorage.getItem(key);return raw?JSON.parse(raw):fallback;
      }catch{return fallback}
    }
    function safeStoreSet(key,value){
      try{
        if(typeof store!=='undefined'&&store&&typeof store.set==='function'){store.set(key,value);return}
        if(root.localStorage)root.localStorage.setItem(key,JSON.stringify(value));
      }catch{}
    }
    function loadContext(){return normalizeContext(safeStoreGet('room22TeachingContext',DEFAULT_CONTEXT))}
    function saveContext(value){runtime.context=normalizeContext(value);safeStoreSet('room22TeachingContext',runtime.context);renderContextSummary()}

    function deactivateLegacyClassTest(){
      const button=document.querySelector('#classTestBtn');
      if(button)button.remove();
      ['classTestSetup','classTestStudentScreen','classTestTeacherResults'].forEach(id=>{
        const node=document.getElementById(id);if(node)node.remove();
      });
    }

    if(typeof TEACH_SKILLS!=='undefined'&&TEACH_SKILLS.ELA){
      const legacy=TEACH_SKILLS.ELA.filter(x=>!ELA_SKILLS.includes(x));
      TEACH_SKILLS.ELA.splice(0,TEACH_SKILLS.ELA.length,...ELA_SKILLS,...legacy);
    }

    const legacyTeachElaSet=typeof teachElaSet==='function'?teachElaSet:null;
    if(legacyTeachElaSet){
      teachElaSet=function(skill,mode){
        if(ELA_SKILLS.includes(skill))return buildElaTeachingMoves(skill,mode,Math.random,{intent:runtime.intent,difficulty:runtime.difficulty,context:runtime.context});
        return legacyTeachElaSet(skill,mode);
      };
    }

    const legacyTeachGoal=typeof teachGoal==='function'?teachGoal:null;
    if(legacyTeachGoal){
      const goals={
        'READ & THINK':'Students make meaning from short original text by retelling, noticing sequence, predicting, and pointing to evidence.',
        'INFERENCE / EVIDENCE':'Students infer from text clues and explain what evidence supports the inference.',
        'LANGUAGE PLAY':'Students manipulate sentences and meaning through quick, playful language decisions.',
        'CURRENT TEXT TALK':'Students discuss the current class text through retell, character thinking, vocabulary, evidence, and stronger language.'
      };
      teachGoal=function(skill){return goals[skill]||legacyTeachGoal(skill)};
    }

    const brand=document.querySelector('.brand');
    if(brand)brand.textContent='ROOM 22 TEACHING MENU';
    const teachHero=document.querySelector('#teachSetup .hero');
    if(teachHero){
      const h=teachHero.querySelector('h1'),p=teachHero.querySelector('p');
      if(h)h.textContent='Room 22 Teaching Menu';
      if(p)p.textContent='Pick the target. Choose the teaching job. Put up a strong task. Keep moving.';
      if(!document.querySelector('#mrFrankModeBadge')){
        const badge=document.createElement('div');
        badge.id='mrFrankModeBadge';badge.className='eyebrow';badge.style.marginTop='10px';
        badge.textContent='MR. FRANK MODE · CLASS / GROUP';
        teachHero.appendChild(badge);
      }
    }

    function injectIntentControls(){
      if(document.querySelector('#teachIntentButtons'))return;
      const modes=document.querySelector('#teachModeButtons');
      if(!modes)return;
      const facilitationWrap=modes.parentElement;
      const wrap=document.createElement('div');
      wrap.style.marginTop='16px';
      wrap.innerHTML=`<label>Teaching Intent</label><div id="teachIntentButtons" class="teach-mode-grid">${INSTRUCTIONAL_INTENTS.map(x=>`<button data-intent="${x}" class="${x===runtime.intent?'selected':''}">${x}</button>`).join('')}</div><div id="teachIntentHint" class="small" style="margin-top:6px"></div>`;
      facilitationWrap.parentElement.insertBefore(wrap,facilitationWrap);
      const label=facilitationWrap.querySelector('label');if(label)label.textContent='Facilitation';
      document.querySelectorAll('#teachIntentButtons button').forEach(b=>b.onclick=()=>{
        runtime.intent=b.dataset.intent;
        document.querySelectorAll('#teachIntentButtons button').forEach(x=>x.classList.toggle('selected',x===b));
        renderIntentHint();
      });
      renderIntentHint();
    }
    function renderIntentHint(){
      const hint=document.querySelector('#teachIntentHint');if(!hint)return;
      const text={REVIEW:'Fast retrieval. Familiar work. Low setup.',PRACTICE:'Apply the current target with variation, explanation, and feedback.',TEACH:'Connect what they know to the current learning. Stronger teacher cues.'};
      hint.textContent=text[runtime.intent]||'';
    }

    function injectContextControls(){
      if(document.querySelector('#teachContextDetails'))return;
      const card=document.querySelector('#teachSetup .card');if(!card)return;
      const details=document.createElement('details');
      details.id='teachContextDetails';details.style.marginTop='16px';
      details.innerHTML=`<summary style="cursor:pointer;font-weight:900">THIS WEEK / CONTEXT</summary><div class="grid two" style="margin-top:12px"><div><label>Current text</label><input id="teachContextText" type="text"></div><div><label>Math focus</label><input id="teachContextMath" type="text"></div><div><label>Vocabulary · comma separated</label><input id="teachContextVocab" type="text"></div><div><label>Grammar focus</label><input id="teachContextGrammar" type="text"></div><div><label>Writing focus</label><input id="teachContextWriting" type="text"></div><div><label>Essential question</label><input id="teachContextQuestion" type="text"></div></div><div class="actions"><button id="teachContextSave" class="secondary" type="button">SAVE CONTEXT</button></div>`;
      const actions=card.querySelector('.actions');card.insertBefore(details,actions);
      const c=runtime.context;
      document.querySelector('#teachContextText').value=c.elaStory;
      document.querySelector('#teachContextMath').value=c.mathFocus;
      document.querySelector('#teachContextVocab').value=c.vocabulary.join(', ');
      document.querySelector('#teachContextGrammar').value=c.grammarFocus;
      document.querySelector('#teachContextWriting').value=c.writingFocus;
      document.querySelector('#teachContextQuestion').value=c.essentialQuestion;
      document.querySelector('#teachContextSave').onclick=()=>{
        saveContext({
          elaStory:document.querySelector('#teachContextText').value,
          mathFocus:document.querySelector('#teachContextMath').value,
          vocabulary:document.querySelector('#teachContextVocab').value,
          grammarFocus:document.querySelector('#teachContextGrammar').value,
          writingFocus:document.querySelector('#teachContextWriting').value,
          essentialQuestion:document.querySelector('#teachContextQuestion').value
        });
        details.open=false;
      };
      if(!document.querySelector('#teachContextSummary')){
        const summary=document.createElement('div');summary.id='teachContextSummary';summary.className='small';summary.style.marginTop='8px';
        const hero=document.querySelector('#teachSetup .hero');if(hero)hero.appendChild(summary);
      }
      renderContextSummary();
    }
    function renderContextSummary(){
      const out=document.querySelector('#teachContextSummary');if(!out)return;
      const c=runtime.context,bits=[];
      if(c.elaStory)bits.push(`TEXT: ${c.elaStory}`);
      if(c.mathFocus)bits.push(`MATH: ${c.mathFocus}`);
      if(c.vocabulary.length)bits.push(`WORDS: ${c.vocabulary.slice(0,4).join(' · ')}`);
      out.textContent=bits.length?bits.join('  •  '):'Context is optional. Teaching still works without setup.';
    }

    function injectProjectorTools(){
      if(!document.querySelector('#teachMoveBadge')){
        const stage=document.querySelector('.teach-stage');
        if(stage){
          const meta=document.createElement('div');meta.className='small no-print';meta.style.cssText='display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:8px 0 0;font-weight:900';
          meta.innerHTML='<span id="teachIntentBadge"></span><span id="teachMoveBadge"></span><span id="teachDifficultyBadge"></span>';
          stage.parentElement.insertBefore(meta,stage);
        }
      }
      if(!document.querySelector('#teachCueRail')){
        const controls=document.querySelector('.teach-controls');
        if(controls){
          const cue=document.createElement('div');cue.id='teachCueRail';cue.className='card no-print';cue.style.cssText='max-width:1100px;margin:10px auto;padding:10px 14px;display:flex;gap:12px;align-items:center';
          cue.innerHTML='<strong id="teachCueLabel">ASK</strong><span id="teachCueText"></span>';
          controls.parentElement.insertBefore(cue,controls);
        }
      }
      const controls=document.querySelector('.teach-controls');
      if(controls&&!document.querySelector('#teachAnotherLike')){
        const next=document.querySelector('#teachNext');
        const make=(id,text)=>{const b=document.createElement('button');b.id=id;b.className='secondary';b.type='button';b.textContent=text;return b};
        const another=make('teachAnotherLike','ANOTHER LIKE THIS');
        const change=make('teachChangeMove','CHANGE MOVE');
        const easier=make('teachEasier','EASIER');
        const harder=make('teachHarder','HARDER');
        controls.insertBefore(another,next);controls.insertBefore(change,next);controls.insertBefore(easier,next);controls.insertBefore(harder,next);
        another.onclick=()=>replaceCurrentTeachItem('same');
        change.onclick=()=>replaceCurrentTeachItem('change');
        easier.onclick=()=>{runtime.difficulty='EASIER';refreshCurrentDifficulty()};
        harder.onclick=()=>{runtime.difficulty='HARDER';refreshCurrentDifficulty()};
      }
    }

    function rawTeachSequence(){
      let seq=teachState.subject==='MATH'?teachMathSet(teachState.skill,teachState.mode):teachElaSet(teachState.skill,teachState.mode);
      if(!seq||!seq.length)seq=teachState.subject==='MATH'?teachMathPrompt(teachState.skill,teachState.mode):teachElaPrompt(teachState.skill,teachState.mode);
      return seq||[];
    }
    function kernelSequence(){
      let seq=applyIntentToSequence(rawTeachSequence(),runtime.intent,teachState.subject,teachState.skill,runtime.difficulty);
      seq=varySequenceStart(seq,runtime.recentMoves,Math.random);
      return seq;
    }
    function kernelNewTeachSequence(){
      teachState.sequence=kernelSequence();teachState.index=0;
      teachState.lastKey=[teachState.subject,teachState.skill,teachState.mode,runtime.intent,teachState.sequence[0]?.prompt].join('|');
      renderTeachProjector();
    }
    function replaceCurrentTeachItem(kind){
      if(!teachState.sequence||!teachState.sequence.length)return;
      const current=teachState.sequence[teachState.index];
      const pool=applyIntentToSequence(rawTeachSequence(),runtime.intent,teachState.subject,teachState.skill,runtime.difficulty);
      let choices=pool;
      if(kind==='same'){
        const same=pool.filter(x=>x.move===current.move);if(same.length)choices=same;
      }else{
        const diff=pool.filter(x=>x.move!==current.move);if(diff.length)choices=diff;
      }
      const chosen=chooseStructuralMove(choices,[...runtime.recentMoves,current.move],Math.random)||choose(choices,Math.random);
      if(chosen)teachState.sequence[teachState.index]=chosen;
      renderTeachProjector();
    }
    function refreshCurrentDifficulty(){
      if(!teachState.sequence||!teachState.sequence.length)return;
      const i=teachState.index;
      teachState.sequence[i]=applyDifficulty({...teachState.sequence[i]},runtime.difficulty);
      renderTeachProjector();
    }

    const legacyRenderTeachProjector=typeof renderTeachProjector==='function'?renderTeachProjector:null;
    if(legacyRenderTeachProjector){
      renderTeachProjector=function(){
        legacyRenderTeachProjector();
        const x=teachState.sequence&&teachState.sequence[teachState.index];if(!x)return;
        runtime.recentMoves=rememberMove(runtime.recentMoves,x.move||classifyTeachingMove(x));
        const intentBadge=document.querySelector('#teachIntentBadge');if(intentBadge)intentBadge.textContent=`${runtime.intent}`;
        const moveBadge=document.querySelector('#teachMoveBadge');if(moveBadge)moveBadge.textContent=`MOVE: ${x.move||classifyTeachingMove(x)}`;
        const difficultyBadge=document.querySelector('#teachDifficultyBadge');if(difficultyBadge)difficultyBadge.textContent=`${runtime.difficulty}`;
        const cue=x.cue||teacherCueFor(runtime.intent,x.move,teachState.subject);
        const label=document.querySelector('#teachCueLabel'),text=document.querySelector('#teachCueText');
        if(label)label.textContent=cue.label;if(text)text.textContent=cue.text;
      };
    }

    if(typeof newTeachSequence==='function')newTeachSequence=kernelNewTeachSequence;

    function rebindTeachControls(){
      const start=document.querySelector('#teachStartBtn');if(start)start.onclick=()=>{
        document.querySelector('#teachSetup').classList.add('teach-hidden');document.querySelector('#teachProjector').classList.remove('teach-hidden');kernelNewTeachSequence();
      };
      const fresh=document.querySelector('#teachNew');if(fresh)fresh.onclick=kernelNewTeachSequence;
      const next=document.querySelector('#teachNext');if(next)next.onclick=()=>{
        if(teachState.index<teachState.sequence.length-1){teachState.index++;renderTeachProjector();}
        else if(teachState.mode==='QUICK FIRE')kernelNewTeachSequence();
        else{document.querySelector('#teachProjector').classList.add('teach-hidden');document.querySelector('#teachSetup').classList.remove('teach-hidden');}
      };
    }

    const profBtn=document.querySelector('#proficiencyBtn');
    if(profBtn&&typeof PROF_SPECIAL!=='undefined'){
      profBtn.onclick=()=>{profState.student=PROF_SPECIAL.DEMO;initProficiencySetup();setScreen('proficiencySetup')};
    }

    const actions=document.querySelector('#teachSetup .actions');
    if(actions&&!document.querySelector('#teachStandardsBtn')){
      const standards=document.createElement('button');standards.id='teachStandardsBtn';standards.className='secondary';standards.textContent='STANDARDS CHECK';
      standards.onclick=()=>{if(profBtn)profBtn.click()};
      const win=document.createElement('button');win.id='teachWinBtn';win.className='secondary';win.textContent='STUDENT / WIN';
      win.onclick=()=>setScreen('win');
      actions.appendChild(standards);actions.appendChild(win);
    }

    deactivateLegacyClassTest();
    injectIntentControls();
    injectContextControls();
    injectProjectorTools();
    rebindTeachControls();

    if(typeof loadTeach==='function')loadTeach();
    if(typeof setScreen==='function')setScreen(defaultSurface());
  }

  if(typeof document!=='undefined'){
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootBrowser,{once:true});
    else setTimeout(bootBrowser,0);
  }
})(typeof globalThis!=='undefined'?globalThis:this);
