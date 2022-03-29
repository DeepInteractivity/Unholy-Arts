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

window.initializeFaSeCraftingADildo = function() {
	// Global event variable
	addToStVarsList("dldCrf");
	// Init Story UI
	setPasChars([]);
	setRoomIntro("mapGleamingCaverns","workshop");	
	// Create dildo for PC
	State.variables.StVars.check1 = createEquipment("w5","chPlayerCharacter");
}

window.initializeFaSeDildoPlay = function() {
	// Global event variable
	addToStVarsList("dldPly");
	// Init Story UI
	setPasChars([]);
	setRoomIntro("mapGleamingCaverns","workshop");
	State.variables.eventsCalendar.activeEvent = true;
	// Init variables
	var dldId = -1;	// Find player dildo's id
	for ( var it of State.variables.equipmentList ) {
		if ( it.type == "w5" && it.owner == "chPlayerCharacter" ) {
			dldId = it.id;
		}
	}
	State.variables.StVars.check1 = dldId;
	var companionType = "botNash"; // Companion type: "botNash", "topNash"
	var nashDomScore = rLvlAbt("chNash","chPlayerCharacter","sexualTension") * 1 - rLvlAbt("chNash","chPlayerCharacter","romance") * 1 + rLvlAbt("chNash","chPlayerCharacter","domination") * 1 - rLvlAbt("chNash","chPlayerCharacter","submission") + rLvlAbt("chNash","chPlayerCharacter","rivalry") + rLvlAbt("chNash","chPlayerCharacter","enmity") * 1 + getCharsDrive("chNash","dDomination") - getCharsDrive("chNash","dPleasure");
	var controlCost = rLvlAbt("chPlayerCharacter","chNash","sexualTension") * 2 + rLvlAbt("chPlayerCharacter","chNash","submission") - rLvlAbt("chPlayerCharacter","chNash","domination") * 2;
	if ( controlCost < 0 ) { controlCost = 0; }
	controlCost *= 10;
	if ( nashDomScore >= 0 ) {
		companionType = "topNash";
	}
	State.variables.StVars.check2 = companionType;
	State.variables.StVars.check3 = controlCost;
	State.variables.StVars.check4 = gC("chPlayerCharacter").lust.max * 0.2;
	gC("chPlayerCharacter").lust.changeValue(-State.variables.StVars.check4);
	if ( gC("chPlayerCharacter").lust.current <= State.variables.StVars.check4 / 2 ) { gC("chPlayerCharacter").lust.current = State.variables.StVars.check4 / 2; }
}
window.finishFaSeDildoPlay = function() {
	State.variables.eventsCalendar.activeEvent = false;
	// If Nash has equipped the player's dildo, unequip it
	if ( getEquipById(State.variables.StVars.check1).owner == "chPlayerCharacter" && getEquipById(State.variables.StVars.check1).equippedOn == "chNash" ) {
		unequipObject(State.variables.StVars.check1);
	}
}

window.initializeFaSePaintingPadmiri = function() {
	// Global event variable
	addToStVarsList("bdPtSc");
	// Init Story UI
	setPasChars([]);
	setRoomIntro("mapGleamingCaverns","workshop");	
	
	State.variables.compass.characterEventEndsPrematurely("chMir");
	State.variables.compass.moveCharsToRoom(["chMir"],"workshop");
	setPasChars([getPresentCharByKey("chMir")]);
	State.variables.eventsCalendar.activeEvent = true;
	
	// Route A (Player falls asleep) / Route B (Mir falls asleep)
	var playerScore = getBarPercentage("chPlayerCharacter","energy") * 20 + getBarPercentage("chPlayerCharacter","willpower") * 20 + gCstat("chPlayerCharacter","will") * 0.5 + gCstat("chPlayerCharacter","resilience") * 0.5;
	var mirScore = getBarPercentage("chMir","energy") * 20 + getBarPercentage("chMir","willpower") * 20 + gCstat("chMir","will") * 0.5 + gCstat("chMir","resilience") * 0.5;
	State.variables.StVars.check1 = playerScore;
	State.variables.StVars.check2 = mirScore;
	
	if ( getCharsSpecialExperience("chMir","pntExp") < 15 ) { addCharsSpecialExperience("chMir","pntExp",15); }
	if ( getCharsSpecialExperience("chVal","pntExp") < 10 ) { addCharsSpecialExperience("chVal","pntExp",10); }
}
window.finishFaSePaintingPadmiri = function() {
	State.variables.eventsCalendar.activeEvent = false;
}

window.initFaSeDrishtyaMeleshConv = function() {
	setPasChars([]);
	setRoomIntro("mapGleamingCaverns","templeStorage");
	State.variables.eventsCalendar.activeEvent = true;
	if ( isStVarOn("drMlCon") ) {
		State.variables.StVars.check1 = true;
	} else {
		State.variables.StVars.check1 = false;
	}
}

// Valtan at Illumination Pond
window.initValtanAtIlluminationPond = function() {
	// Initial Valtan disposition
	if ( (rLvlAbt("chVal","chPlayerCharacter","friendship") * 1 + rLvlAbt("chVal","chPlayerCharacter","romance") * 2 - rLvlAbt("chVal","chPlayerCharacter","enmity") * 3) >= 10 ) {
		State.variables.StVars.check1 = true;
		State.variables.StVars.check2 = false;
	} else if ( (rLvlAbt("chVal","chPlayerCharacter","friendship") * 1 + rLvlAbt("chVal","chPlayerCharacter","romance") * 2 - rLvlAbt("chVal","chPlayerCharacter","enmity") * 3) < 0 ) {
		addToStVarsList("vlNoCv");
		State.variables.StVars.check1 = false;
		State.variables.StVars.check2 = true;
	} else {
		State.variables.StVars.check1 = false;
		State.variables.StVars.check2 = false;
	}
	if ( isStVarOn("vlSfsh") == false && ((gCstat("chPlayerCharacter","empathy") + gCstat("chPlayerCharacter","intelligence") + gCstat("chPlayerCharacter","perception")) >= 36) ) {
		State.variables.StVars.check4 = false;
	} else {
		State.variables.StVars.check4 = true;
	}
}
window.finishValtanAtIlluminationPond = function() {
	State.variables.eventsCalendar.activeEvent = false;
}

