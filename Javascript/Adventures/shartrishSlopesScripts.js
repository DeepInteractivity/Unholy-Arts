///// Adventure scripts /////

	// Init Second Adventure
window.initializeShartrishSlopesAdventure = function() {
	
}

	// End Second Adventure
window.finishSSAdventure = function() {
	finishSecondAdventureAffinitiesTuning();
}
	
	// Abort Second Adventure
window.abortSSAdventure = function() {
	State.variables.daycycle.month = 3;
	State.variables.daycycle.day = 13;
	State.variables.storyState = storyState.thirdLoop;
	finishSecondAdventureAffinitiesTuning();
}

window.finishSecondAdventureAffinitiesTuning = function() {
	for ( var cK of getCandidatesKeysArray() ) {
		for ( var at of setup.baseStats ) {
			gC(cK)[at].affinity += 0.1;
		}
		gC(cK).agility.affinity -= 0.30;
		gC(cK).physique.affinity -= 0.30;
		gC(cK).resilience.affinity -= 0.30;
	}
}