const fs=require('fs');
const src=fs.readFileSync('app.js','utf8');
function a(x,m){if(!x)throw Error(m)}
a(src.includes('STUDY FULL TEST'),'missing Study Full Test mode');
a(src.includes('EXAM SIMULATION'),'missing Exam Simulation mode');
a(src.includes("reviewMode:'instant'"),'missing immediate-feedback full mode');
a(src.includes("simulation:mode==='exam'"),'missing simulation flag');
a(src.includes('checkedAnswers'),'missing explicit answer-check state');
a(src.includes('CHECK ANSWER'),'missing Check Answer control');
a(src.includes('Answer locked after feedback'),'missing answer lock cue');
a(src.includes('praxisMethod:q.praxisMethod'),'attempts do not persist Praxis method');
a(src.includes('Method signals'),'missing method-level results');
a(src.includes("if(session.remaining===0)submit(true)"),'timer does not auto-submit');
a(src.includes('You still have ${unanswered} unanswered'),'missing unanswered submission warning');
a(src.includes("data.settings.fullMode"),'full-test preference is not persisted');
a(src.includes("session.full?'Question format'"),'full test still exposes skill/domain hints');
console.log('ITERATION 11 FEEDBACK TEST PASSED');
