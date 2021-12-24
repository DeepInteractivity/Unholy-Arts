// First Adventure ~ Map Story Events

window.initializeFaSeBlackMailedByClaw = function() {
	// Global event variable
	addToStVarsList("blmClaw");
	// Set Claw in room
	State.variables.compass.characterEventEndsPrematurely("chClaw");
	State.variables.compass.moveCharsToRoom(["chClaw"],"unionLakeUpper");
	// Init Story UI
	setPasChars([getPresentCharByKey("chClaw")]);
	setRoomIntro("mapGleamingCaverns","unionLakeUpper");
	// Checks
	State.variables.StVars.check1 = gCstat("chPlayerCharacter","empathy") + gCstat("chPlayerCharacter","intelligence") + gCstat("chPlayerCharacter","will");
	State.variables.StVars.check2 = gCstat("chPlayerCharacter","physique") + gCstat("chPlayerCharacter","agility") + gCstat("chPlayerCharacter","perception") + gCstat("chPlayerCharacter","luck");
}

