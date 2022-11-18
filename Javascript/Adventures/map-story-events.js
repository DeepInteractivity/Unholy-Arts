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

// Dildo Play
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

// Painting
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

// Trial Improvisation
window.initFaSeTrialImprovisation = function() {
	// Global event variable
	addToStVarsList("trImpr");
	// Init Story UI
	setPasChars([]);
	setRoomIntro("mapGleamingCaverns","assembly");	
	
	State.variables.compass.characterEventEndsPrematurely("chAte");
	State.variables.compass.moveCharsToRoom(["chAte"],"assembly");
	// setPasChars([getPresentCharByKey("chAte"),getPresentCharByKey("chHope"),getPresentCharByKey("chRock")]);
	setPasChars([getPresentCharByKey("chAte")]);
	State.variables.eventsCalendar.activeEvent = true;
}
window.finishFaSeTrialImprovisation = function() {
	gC("chAte").socialdrive.current = 0;
	State.variables.eventsCalendar.activeEvent = false;
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

window.initFaSeVoicesFromTheCaverns = function() {
	// Global event variable
	addToStVarsList("GcVcCv");
	// Init Story UI
	setPasChars([]);
	setRoomIntro("mapGleamingCaverns","labyrinthEntrance");	
	
	// Initial passage , check1
	var initialPassage = "FASE VFtC InitB"; // Start variant B
	if ( isStVarOn("diVcAt") == true ) { initialPassage = "FASE VFtC InitA"; }
	else if ( isStVarOn("diAcFf") == true || isStVarOn("diDfWn") == true ) { initialPassage = "FASE VFtC InitC"; }
	
	// Relationship check , check2
	State.variables.StVars.check2 = rLvlAbt("chAte","chPlayerCharacter","friendship") * 2 + rLvlAbt("chAte","chPlayerCharacter","romance") * 1.5 - rLvlAbt("chAte","chPlayerCharacter","sexualTension") * 0.5 - rLvlAbt("chAte","chPlayerCharacter","rivalry") * 2 - rLvlAbt("chAte","chPlayerCharacter","enmity") * 3;
	// Perception check , check3
	State.variables.StVars.check3 = gCstat("chPlayerCharacter","perception");
	// Empathy check , check4
	State.variables.StVars.check4 = gCstat("chPlayerCharacter","empathy");
	
	setPasChars([getPresentCharByKey("chAte")]);
	State.variables.eventsCalendar.activeEvent = true;
	
	return initialPassage;
}
window.finishFaSeVoicesFromTheCaverns = function() {
	State.variables.eventsCalendar.activeEvent = false;
}

window.initFaSeCavernsRescue = function() {
	// Global event variables:
		// Player rescues Glien alone -> CaRePl
		// Valtan helps the player -> CaReVl
	// Init Story UI
	setPasChars([]);
	setRoomIntro("mapGleamingCaverns","tortuousEnd");	
	
	// Variables
	State.variables.StVars.check1 = -100; // +1 at each round, gets set at zero the first time help is called. If it reaches 4, Valtan comes
	State.variables.StVars.check2 = 0; // +1 at each round, if it reaches 10, Valtan doesn't come.
	State.variables.StVars.check3 = (gCstat("chPlayerCharacter","intelligence") + gCstat("chPlayerCharacter","will")) * getBarPercentage("chPlayerCharacter","willpower") + (gCstat("chVal","intelligence") + gCstat("chVal","will")) * getBarPercentage("chVal","willpower"); // Must reach 40 to pass.
}
window.finishFaSeCavernsRescue = function() {
	State.variables.eventsCalendar.activeEvent = false;
}

// Nersmias Social Battle
window.initFaSeNSBfirst = function() {
	// Init Story UI
	setPasChars(["chNer"]);
	setRoomIntro("mapGleamingCaverns","assembly");
	
	State.variables.StVars.check1 = false;
	if ( isStVarOn("CaRePl") || isStVarOn("CaReVl") ) {
		State.variables.StVars.check1 = false;
	}
	State.variables.StVars.check2 = isStVarOn("neSBrc");
	
	State.variables.StVars.check3 = gCstat("chPlayerCharacter","will") + gCstat("chPlayerCharacter","charisma");
	State.variables.StVars.check4 = gCstat("chPlayerCharacter","perception") + gCstat("chPlayerCharacter","luck") * 0.3;
	
	initNersmiasLocalConviction();
	initNersmiasLocalTrust();
	
	State.variables.eventsCalendar.activeEvent = true;
}
window.initFaSeNSBsecond = function() {
	// Global event variable
	addToStVarsList("neSBin");
	State.variables.StVars.check5 = getPlayerPersuasionPower();
	State.variables.StVars.check6 = getPlayerInspirationPower();
	State.variables.StVars.check9 = false; // Was will gain achieved?
	
	State.variables.nerSocBattle = "";
	State.variables.nerSocTopic = ""; // Topic to discuss next
	State.variables.nerSocPlayerHypno = ""; // True/False Is player using hypnosis
	State.variables.nerSocPlaHypnosUsed = 0; // Amount of times Player has used hypnosis
	State.variables.nerSocNerHypnosUsed = 0; // Amount of times Nersmias has used hypnosis
	
	nsbInitConversationTagsVars();
}
window.finishFaSeNSB = function() {
	nsbLocalToGlobalTnC();
	
	State.variables.compass.timeToAdvance = 60;
	State.variables.compass.pushAllTimeToAdvance();
	
	delete State.variables.nerSocBattle;
	delete State.variables.nerSocTopic;
	delete State.variables.nerSocPlayerHypno;
	delete State.variables.nerSocNerHypnosUsed;
	
	delete State.variables.nsbcDesc;
	delete State.variables.nsbtDesc;
	
	State.variables.StVars.check1 = 0;
	State.variables.StVars.check2 = 0;
	State.variables.StVars.check3 = 0;
	State.variables.StVars.check4 = 0;
	State.variables.StVars.check5 = 0;
	State.variables.StVars.check6 = 0;
	State.variables.StVars.check7 = 0;
	State.variables.StVars.check8 = 0;
	State.variables.StVars.check9 = 0;
	
	State.variables.eventsCalendar.activeEvent = false;
}

// Gift for the Shapeshifters
window.loadGfsTexts = function() {
	// 1: Ate , 2: Claw , 3: Nash , 4: Padmiri
	var relScores = [0,0,0,0];
	var i = 0;
	for ( var cK of ["chAte","chClaw","chNash","chMir"] ) {
		relScores[i] = rLvlAbt(cK,"chPlayerCharacter","friendship") + rLvlAbt(cK,"chPlayerCharacter","romance") - rLvlAbt(cK,"chPlayerCharacter","enmity");
		i++;
	}
	if ( relScores[0] < 6 ) {
		State.variables.StVars.check2 = `<span @style=$chAte.colorStyleKey>//"Huh? Is that... $chPlayerCharacter.name? What is she doing?"//</span> Maaterasu asks in the distance, confused, and mildly intrigued.`;
	} else {
		State.variables.StVars.check2 = `<span @style=$chAte.colorStyleKey>//"That's... $chPlayerCharacter.name, what is she doing...? Hey, what are you doing to her?"//</span> Maaterasu asks in the distance, worried, but she is quickly reassured that everything is fine.`;
	}
	if ( relScores[1] < 6 ) {
		State.variables.StVars.check3 = `<span @style=$chClaw.colorStyleKey>//"What a sight. Not one I expected to find today."//</span> Claw, on the other hand, is clearly amused.`;
	} else {
		State.variables.StVars.check3 = `<span @style=$chClaw.colorStyleKey>//"What the hell is going on with her...? Doesn't she know she is bringing us all shame?"//</span> Claw adds, clearly annoyed.`;
	}
	if ( relScores[2] < 6 ) {
		State.variables.StVars.check4 = `<span @style=$chNash.colorStyleKey>//"Hey, let me in, I need to see..."//</span> you hear a familiar voice as someone pushes her way through the crowd. <span @style=$chNash.colorStyleKey>//"Huh!? What is going on...? Padmiri, come to see this."//</span>`;
	} else {
		State.variables.StVars.check4 = `<span @style=$chNash.colorStyleKey>//"Hey, let me in, I need to see..."//</span> you hear a familiar voice as someone pushes her way through the crowd. <span @style=$chNash.colorStyleKey>//"What is this...!? Stop it already! Padmiri, come help me!"//</span>`;
	}
	if ( relScores[3] < 6 ) {
		State.variables.StVars.check5 = `<span @style=$chMir.colorStyleKey>//"This is not appropriate... But what should we do...? We ought to tell Drishtya, at least..."//</span> says Padmiri, soon after reaching Nashillbyir.`;
	} else {
		State.variables.StVars.check5 = `<span @style=$chMir.colorStyleKey>//"$chPlayerCharacter.name... But why...? Cease this, cease everything at once!"//</span> says Padmiri, soon after reaching Nashillbyir, only to meet the collective dismissal of the tribe.`;
	}
}

/*
Nersmias' greeting must be different if the save was acknowledged (check1)
Nersmias must mention the save if it happened but wasn't acknowledged yet (check2)
check1 -> true if Nersmias heard of the save but didn't mention it yet, checks old and new StVars
check2 -> Set to true is a StVar at FaSe NSB Init was activated
check3 -> Player's will + charisma
check4 -> Player's perception + luck * 3
*/



