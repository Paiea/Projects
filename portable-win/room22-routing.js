(function routeRoom22IntoPortableWin(){
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');

  if (params.get('room22') === '1' && window.Room22AssessmentHandoff) {
    const handoff = window.Room22AssessmentHandoff.consume(localStorage, {
      roster: roster(),
      standards: Object.keys(PROF_STANDARDS),
    });
    if (handoff) {
      profState.student = handoff.student;
      setScreen('proficiencyStudent');
      prepareProficiencyAttempt(handoff.standard);
      return;
    }
  }

  if (mode === 'assess') {
    initProficiencySetup();
    setScreen('proficiencySetup');
    return;
  }

  if (mode === 'quickfire') {
    teachState.mode = 'QUICK FIRE';
    setScreen('teach');
    return;
  }

  if (mode === 'teach') {
    setScreen('teach');
  }
})();
