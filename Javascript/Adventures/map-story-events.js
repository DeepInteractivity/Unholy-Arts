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

