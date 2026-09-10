(function(root){
  const MR_FRANK_ID='__ROOM22_DEMO__';
  const ELA_SKILLS=['READ & THINK','INFERENCE / EVIDENCE','LANGUAGE PLAY'];

  function defaultSurface(){return 'teach'}
  function defaultAssessmentIdentity(){return MR_FRANK_ID}
  function choose(items,rng=Math.random){
    const raw=Number(rng());
    const n=Number.isFinite(raw)?Math.max(0,Math.min(0.999999,raw)):0;
    return items[Math.floor(n*items.length)];
  }
  function takeForMode(items,mode){return items.slice(0,mode==='QUICK FIRE'?8:6)}
  function item(move,prompt,sub=''){return{move,prompt,sub}}

  const READ_BANK=[
    {text:'Kai heard rain tapping the window. He grabbed his boots and put his jacket by the door.',who:'Kai',first:'Kai heard rain tapping the window.',clue:'grabbed his boots and put his jacket by the door',why:'He is getting ready to go outside in the rain.'},
    {text:'Nia set a bowl beside the sleepy puppy. The puppy stood up and hurried over.',who:'Nia',first:'Nia set a bowl beside the puppy.',clue:'The puppy stood up and hurried over.',why:'The puppy probably expects food or water.'},
    {text:'Milo carried a stack of books carefully. When one started to slide, Ana reached out and caught it.',who:'Milo and Ana',first:'Milo carried a stack of books.',clue:'Ana reached out and caught it',why:'Ana noticed a book was about to fall and helped.'},
    {text:'Leilani looked at the dark clouds, then moved the class plants under the roof. A minute later, heavy drops began to fall.',who:'Leilani',first:'Leilani looked at the dark clouds.',clue:'dark clouds',why:'She expected rain and wanted to protect the plants.'}
  ];
  const INFERENCE_BANK=[
    {text:'Ari checked the clock twice and kept looking toward the door. When Dad finally walked in, Ari jumped up smiling.',answer:'Ari was waiting and excited to see Dad.',clue:'checked the clock twice and kept looking toward the door'},
    {text:'The sidewalk was wet, and puddles covered the playground. Kea took off his hood and folded his umbrella.',answer:'It probably rained recently.',clue:'wet sidewalk, puddles, hood, and umbrella'},
    {text:'Maya whispered, “I practiced this part all week.” She took a slow breath and walked toward the microphone.',answer:'Maya may be nervous but prepared to perform.',clue:'practiced all week, slow breath, and walking to the microphone'},
    {text:'Noah put the empty cookie plate in the sink and wiped crumbs from his shirt before Mom came into the room.',answer:'Noah probably ate the cookies and is trying to clean up the evidence.',clue:'empty plate, crumbs, and cleaning before Mom arrives'}
  ];

  function readThinkMoves(rng){
    const s=choose(READ_BANK,rng);
    return [
      item('READ & RETELL',`${s.text}\n\nTell the tiny story back in your own words.`,'Keep the important parts. You do not need every word.'),
      item('FIRST / NEXT',`${s.text}\n\nWhat happened FIRST?`,'Then tell what happened next.'),
      item('FIND THE CLUE',`${s.text}\n\nFind a clue that helps you understand what is happening.`,`Point to words that prove your idea.`),
      item('WHY?',`${s.text}\n\nWhy did the character probably do that?`,'Use something from the text in your answer.'),
      item('WHAT NEXT?',`${s.text}\n\nWhat could happen next?`,'Make a prediction that fits the clues.'),
      item('TITLE IT',`${s.text}\n\nGive this tiny story a good title.`,'Explain why your title fits.'),
      item('DRAW THE PROOF',`${s.text}\n\nDraw the moment that best shows what happened.`,'Which sentence does your drawing prove?'),
      item('SAY IT SHORTER',`${s.text}\n\nSay what happened in ONE strong sentence.`,'Keep the meaning, lose the extra words.')
    ];
  }

  function inferenceMoves(rng){
    const s=choose(INFERENCE_BANK,rng);
    return [
      item('INFER',`${s.text}\n\nWhat can you figure out even though the author did not say it directly?`,'Tell the idea first.'),
      item('EVIDENCE',`${s.text}\n\nWhich clue best PROVES your idea?`,'Point to the words that made you think it.'),
      item('FEELING + WHY',`${s.text}\n\nHow is someone probably feeling?`,'Do not stop at the feeling. Give the clue.'),
      item('BEFORE',`${s.text}\n\nWhat might have happened just BEFORE this?`,'Your answer has to fit the evidence.'),
      item('AFTER',`${s.text}\n\nWhat is a reasonable thing that could happen NEXT?`,'Use the scene, not a random guess.'),
      item('CHARACTER THINKING',`${s.text}\n\nWhat might the character be thinking right now?`,'What clue supports that thought?'),
      item('AGREE OR DISAGREE',`${s.text}\n\nMr. Frank says: “There is not enough information to figure anything out.”\nAgree or disagree?`,'Convince him with evidence.'),
      item('PROVE IT',`${s.text}\n\nClaim: ${s.answer}`,'What evidence from the text would you use to prove this claim?')
    ];
  }

  function languagePlayMoves(){
    return [
      item('TEACHER TRAP','TEACHER TRAP\nMr. Frank says: “The gigantic whale was tiny.”\nCatch the problem.','Fix it so the sentence makes sense.'),
      item('SAY IT BETTER','The dog went fast.','Replace “went fast” with a stronger word or phrase.'),
      item('WHICH MAKES SENSE','The rain was pouring.\nA. Mia grabbed an umbrella.\nB. Mia put ice cream in her shoe.','Choose one. Explain what makes it fit.'),
      item('BUILD IT','dog','Turn this word into a complete sentence. Then add WHERE.'),
      item('FIX IT','me and my brother goed outside','Fix what sounds wrong. Read your new sentence aloud.'),
      item('FINISH IT','When the bell rang, __________.','Finish the thought so the sentence makes sense.'),
      item('MAKE IT CLEAR','She put it over there.','Change the sentence so a reader knows WHO, WHAT, and WHERE.'),
      item('WEIRD OR WORKS?','The sleepy pencil barked at the moon.','It is grammatically possible, but does the meaning work? Make it sensible OR make the weirdness even better.')
    ];
  }

  function buildElaTeachingMoves(skill,mode='FIGURE IT OUT',rng=Math.random){
    let moves;
    if(skill==='READ & THINK')moves=readThinkMoves(rng);
    else if(skill==='INFERENCE / EVIDENCE')moves=inferenceMoves(rng);
    else if(skill==='LANGUAGE PLAY')moves=languagePlayMoves();
    else moves=[];
    return takeForMode(moves,mode);
  }

  const api={MR_FRANK_ID,ELA_SKILLS,defaultSurface,defaultAssessmentIdentity,buildElaTeachingMoves};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.Room22TeachingMenu=api;

  function bootBrowser(){
    if(typeof document==='undefined')return;

    if(typeof TEACH_SKILLS!=='undefined'&&TEACH_SKILLS.ELA){
      const legacy=TEACH_SKILLS.ELA.filter(x=>!ELA_SKILLS.includes(x));
      TEACH_SKILLS.ELA.splice(0,TEACH_SKILLS.ELA.length,...ELA_SKILLS,...legacy);
    }

    if(typeof teachElaSet==='function'){
      const legacyTeachElaSet=teachElaSet;
      teachElaSet=function(skill,mode){
        if(ELA_SKILLS.includes(skill))return buildElaTeachingMoves(skill,mode);
        return legacyTeachElaSet(skill,mode);
      };
    }

    if(typeof teachGoal==='function'){
      const legacyTeachGoal=teachGoal;
      const goals={
        'READ & THINK':'Students make meaning from short text by retelling, noticing sequence, predicting, and pointing to evidence.',
        'INFERENCE / EVIDENCE':'Students infer from text clues and explain what evidence supports the inference.',
        'LANGUAGE PLAY':'Students manipulate sentences and meaning through quick, playful language decisions.'
      };
      teachGoal=function(skill){return goals[skill]||legacyTeachGoal(skill)};
    }

    const brand=document.querySelector('.brand');
    if(brand)brand.textContent='ROOM 22 TEACHING MENU';
    const teachHero=document.querySelector('#teachSetup .hero');
    if(teachHero){
      const h=teachHero.querySelector('h1'),p=teachHero.querySelector('p');
      if(h)h.textContent='Room 22 Teaching Menu';
      if(p)p.textContent='Pick a skill. Put up a strong task. Facilitate the thinking.';
      if(!document.querySelector('#mrFrankModeBadge')){
        const badge=document.createElement('div');
        badge.id='mrFrankModeBadge';badge.className='eyebrow';badge.style.marginTop='10px';
        badge.textContent='MR. FRANK MODE · CLASS / GROUP';
        teachHero.appendChild(badge);
      }
    }

    const profBtn=document.querySelector('#proficiencyBtn');
    if(profBtn&&typeof PROF_SPECIAL!=='undefined'){
      profBtn.onclick=()=>{profState.student=PROF_SPECIAL.DEMO;initProficiencySetup();setScreen('proficiencySetup')};
    }

    const classTestBtn=document.querySelector('#classTestBtn');
    if(classTestBtn&&typeof CLASS_TEST_SPECIAL!=='undefined'){
      classTestBtn.onclick=()=>{
        initClassTestSetup();
        const select=document.querySelector('#classTestStudent');
        if(select)select.value=CLASS_TEST_SPECIAL.DEMO;
        setScreen('classTestSetup');
      };
    }

    const actions=document.querySelector('#teachSetup .actions');
    if(actions&&!document.querySelector('#teachStandardsBtn')){
      const standards=document.createElement('button');
      standards.id='teachStandardsBtn';standards.className='secondary';standards.textContent='STANDARDS CHECK';
      standards.onclick=()=>{if(profBtn)profBtn.click()};
      const win=document.createElement('button');
      win.id='teachWinBtn';win.className='secondary';win.textContent='STUDENT / WIN';
      win.onclick=()=>setScreen('win');
      actions.appendChild(standards);actions.appendChild(win);
    }

    if(typeof loadTeach==='function')loadTeach();
    if(typeof setScreen==='function')setScreen(defaultSurface());
  }

  if(typeof document!=='undefined'){
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootBrowser,{once:true});
    else setTimeout(bootBrowser,0);
  }
})(typeof globalThis!=='undefined'?globalThis:this);
