///// STORY EVENT FUNCTIONS /////

window.initializeSeStretchingHelp = function() {
	setPasChars([getPresentCharByKey("chNash")]);
	setRoomIntro("mapTrainingGrounds","dummies");
	State.variables.eventsCalendar.setFinishEventButton("Continue","setNoPasChars()");
	State.variables.StVars.futaNash = false;
	if ( State.variables.chNash.body.hasOwnProperty("dick") ) {
		State.variables.StVars.futaNash = true;
	}
	State.variables.StVars.seshFlirty = false;
	if ( State.variables.chPlayerCharacter.relations.chNash.sexualTension.stv > 100 ) {
		State.variables.StVars.seshFlirty = true;
	}
}
window.initializeSeHumming = function() {
	setPasChars([getPresentCharByKey("chAte")]);
	setRoomIntro("mapTrainingGrounds","amphitheater");
	if ( gC("chPlayerCharacter").perception.getValue() > 9 || gC("chPlayerCharacter").empathy.getValue() > 11
		 || gC("chPlayerCharacter").luck.getValue() > 10 || gC("chPlayerCharacter").charisma.getValue() > 11 ) {
		State.variables.StVars.seHummingCopyCheck = true;
	} else {
		State.variables.StVars.seHummingCopyCheck = false;
	}
	if ( gC("chPlayerCharacter").perception.getValue() > 10 || gC("chPlayerCharacter").empathy.getValue() > 11
		 || gC("chPlayerCharacter").luck.getValue() > 11 || gC("chPlayerCharacter").charisma.getValue() > 11 ) {
		State.variables.StVars.seHummingHarmonyCheck = true;
	} else {
		State.variables.StVars.seHummingHarmonyCheck = false;
	}
	if ( gC("chPlayerCharacter").perception.getValue() > 11 || gC("chPlayerCharacter").intelligence.getValue() > 11
		 || gC("chPlayerCharacter").luck.getValue() > 11 || gC("chPlayerCharacter").charisma.getValue() > 11 ) {
		State.variables.StVars.seHummingImproviseCheck = true;
	} else {
		State.variables.StVars.seHummingImproviseCheck = false;
	}
}

window.initializeSeEthicsOfPower = function() {
	setPasChars([getPresentCharByKey("chClaw"),getPresentCharByKey("chMir")]);
	setRoomIntro("mapTrainingGrounds","grandHall");
	if ( (gC("chPlayerCharacter").intelligence.getValue() + gC("chPlayerCharacter").empathy.getValue()) > 24 ) {
		State.variables.StVars.seEthicsOfPowMUcheck = true;
	} else {
		State.variables.StVars.seEthicsOfPowMUcheck = false;
	}
}

window.initializeSeStayingHydrated = function() {
	charactersLearnSceneActions(["chMir","chVal"],["getBlowjob","legHoldHead","fuckFace","suckDick","lickPussy","rideFace","pushHipsBack"]);
	setPasChars([getPresentCharByKey("chNash"),getPresentCharByKey("chVal"),getPresentCharByKey("chMir"),getPresentCharByKey("chAte")]);
	setRoomIntro("mapTrainingGrounds","diningHall");
}

window.initializeSeFriendBackAtHome = function() {
	setRoomIntro("mapTrainingGrounds","lake");
	State.variables.StVars.SeFbahHowsSill = false;
	State.variables.StVars.SeFbahWhatsSill = false;
	State.variables.StVars.SeFbahWhyTakePlaceSill = false;
	State.variables.StVars.SeFbahRegretSill = false;
	State.variables.StVars.SeFbahAnyQuestions = "none";
}
window.SeFriendBackAtHomeCheck = function() {
	if ( State.variables.StVars.SeFbahHowsSill || State.variables.StVars.SeFbahWhatsSill || State.variables.StVars.SeFbahWhyTakePlaceSill ) {
		State.variables.StVars.SeFbahAnyQuestions = "some";
	}
	if ( State.variables.StVars.SeFbahHowsSill && State.variables.StVars.SeFbahWhatsSill && State.variables.StVars.SeFbahRegretSill ) {
		State.variables.StVars.SeFbahAnyQuestions = "all";
	}
}

window.initializeSeMagicClass = function() {
	setRoomIntro("mapTrainingGrounds","field");
	setPasChars([getPresentCharByKey("chMir"),getPresentCharByKey("chNash"),getPresentCharByKey("chClaw"),getPresentCharByKey("chVal"),getPresentCharByKey("chAte")]);
	State.variables.StVars.seMagicClassClawCheck = false;
	if ( (gCstat("chPlayerCharacter","agility") + gCstat("chPlayerCharacter","perception")) > 20 ) {
		State.variables.StVars.seMagicClassClawCheck = true;
	}
}

window.initializeSeStretchingHelpII = function() {
	setRoomIntro("mapTrainingGrounds","dummies");
	setPasChars([getPresentCharByKey("chNash"),getPresentCharByKey("chClaw")]);
	
	State.variables.StVars.seStHeIINashInvites = true;
	// If Nash dislikes the player, she won't invite to stretch
	if ( ( rLvlAbt("chNash","chPlayerCharacter","rivalry") + rLvlAbt("chNash","chPlayerCharacter","enmity") * 2 - rLvlAbt("chNash","chPlayerCharacter","friendship") ) > 3 ) {
		State.variables.StVars.seStHeIINashInvites = false;
	}
	// If Nash lusts after the player, she will grope the player
	if ( rLvlAbt("chNash","chPlayerCharacter","sexualTension") > 2 ) {
		State.variables.StVars.StretchingHelpGroped = "true";
	}
	// If Nash likes the player and is lustful, she will invite to have sex
	if ( ( rLvlAbt("chNash","chPlayerCharacter","sexualTension") + rLvlAbt("chNash","chPlayerCharacter","romance") ) > 2 ) {
		State.variables.StVars.StretchingHelpResult = "sexual";
	}
	
	State.variables.StVars.seStHeIIMayRejectSex = true;
	State.variables.StVars.seStHeIIwillpowerHit = rLvlAbt("chPlayerCharacter","chNash","sexualTension") + rLvlAbt("chPlayerCharacter","chNash","submission") - rLvlAbt("chPlayerCharacter","chNash","domination");
	if ( State.variables.StVars.seStHeIIwillpowerHit < 0 ) {
		State.variables.StVars.seStHeIIwillpowerHit = 0;
	}
	else {
		State.variables.StVars.seStHeIIwillpowerHit *= 20;
		if ( State.variables.StVars.seStHeIIwillpowerHit > gC("chPlayerCharacter").willpower.max ) {
			State.variables.StVars.seStHeIIMayRejectSex = false;
		}
	}
}

window.initializeSeFlirtingAdvice = function() {
	setRoomIntro("mapTrainingGrounds","diningHall");
	setPasChars([getPresentCharByKey("chAte"),getPresentCharByKey("chNash"),getPresentCharByKey("chMir"),getPresentCharByKey("chVal"),getPresentCharByKey("chClaw")]);
	State.variables.StVars.flirtingAdviceChecks = [ false , false , false , false ];
	// Physique + Agility check gCstat = function(charKey,stat)
	if ( gCstat("chPlayerCharacter","physique") + gCstat("chPlayerCharacter","agility") >= 24 ) {
		State.variables.StVars.flirtingAdviceChecks[0] = true;
	}
	// Empathy check
	if ( gCstat("chPlayerCharacter","empathy") >= 13 ) {
		State.variables.StVars.flirtingAdviceChecks[1] = true;
	}
	// Charisma check
	if ( gCstat("chPlayerCharacter","charisma") >= 13 ) {
		State.variables.StVars.flirtingAdviceChecks[2] = true;
	}
	// Charisma + Intelligence check
	if ( gCstat("chPlayerCharacter","charisma") + gCstat("chPlayerCharacter","intelligence") >= 24 ) {
		State.variables.StVars.flirtingAdviceChecks[3] = true;
	}
}

window.initializeSeDrishtyaTutorShip = function() {
	setRoomIntro("mapTrainingGrounds","southNaturalWall");
	setPasChars([getPresentCharByKey("chNash"),getPresentCharByKey("chAte"),getPresentCharByKey("chVal"),getPresentCharByKey("chMir")]);
	State.variables.StVars.DrishtyaTutorLifeAsCandidate = "";
	State.variables.StVars.DrishtyaTutorThoughtsOnPeers = "";
	State.variables.StVars.DrishtyaTutorReachedQuestions = false;
	State.variables.StVars.DrishtyaTutorBehindTheRest = false;
	State.variables.StVars.DrishtyaTutorStrengthenBonds = false;
	State.variables.StVars.DrishtyaTutorDominatingOthers = false;
	State.variables.StVars.DrishtyaTutorLeaveTheTemple = false;
	State.variables.StVars.DrishtyaTutorEmpathyCheck = false;
	State.variables.StVars.VaryonteTutorHasDick = false;
	// Empathy check
	if ( gCstat("chPlayerCharacter","empathy") >= 15 ) {
		State.variables.StVars.DrishtyaTutorEmpathyCheck = true;
	}
	if ( gC("chPlayerCharacter").hasFreeBodypart("dick") ) {
		State.variables.StVars.VaryonteTutorHasDick = true;
	}
}

window.initializeSeBeatingKittyIntoFriendship = function() {
	// Init StVars
	State.variables.StVars.playerJoinedBkifBattle = false;
	State.variables.StVars.drishtyaSawVaryonteMoves = false;
	
	// Change map rules
	State.variables.settings.followingAllowed = true;
	State.variables.settings.relationshipTypesAllowed = true;
	State.variables.settings.challengingAllowed = true;
	State.variables.settings.assaultingAllowed = true;
	
	State.variables.StVars.BkifNashRelScore = rLvlAbt("chNash","chPlayerCharacter","friendship") + rLvlAbt("chNash","chPlayerCharacter","romance") * 2 + rLvlAbt("chNash","chPlayerCharacter","submission") - rLvlAbt("chNash","chPlayerCharacter","domination") - rLvlAbt("chNash","chPlayerCharacter","enmity");
	
	State.variables.StVars.BkifStakes = "servitude";
	if ( gSettings().servitudeRelationships == "disable" ) {
		if ( gSettings().battleDefeatSex == "enable" ) {
			State.variables.StVars.BkifStakes = "sex";
		} else {
			State.variables.StVars.BkifStakes = "humilliation";
		}
	}
	
	setRoomIntro("mapTrainingGrounds","field");
	setPasChars([getPresentCharByKey("chNash"),getPresentCharByKey("chClaw"),getPresentCharByKey("chAte"),getPresentCharByKey("chVal"),getPresentCharByKey("chMir")]);
}

window.finishSeBtif = function() {
	for ( var charKey of ["chPlayerCharacter","chNash","chClaw","chVal"] ) {
		gC(charKey).lust.current = gC(charKey).lust.max;
	}
}

window.initializeSeBkifOutcome = function () {
	State.variables.StVars.clawLostBkif = false;
	if ( gC("chClaw").baseMood.angry == 0 ) { State.variables.StVars.clawLostBkif = true; }
	
	// Reset Claw's base mood
	gC("chClaw").baseMood.angry = 0;
	gC("chClaw").mood.angry = 0;
	
	// Checks
	State.variables.StVars.check1 = false;
	if ( gC("chPlayerCharacter").physique.affinity >= 1.10 || gC("chPlayerCharacter").agility.affinity >= 1.10 || gC("chPlayerCharacter").resilience.affinity >= 1.10 ) {
		State.variables.StVars.check1 = true;
	}
	State.variables.StVars.check2 = false;
	if ( gC("chPlayerCharacter").will.getValue() >= 12 ) {
		State.variables.StVars.check2 = true;
	}
	State.variables.StVars.check3 = false;
	if ( gC("chPlayerCharacter").intelligence.getValue() >= 13 || gC("chPlayerCharacter").empathy.getValue() >= 13 || gC("chPlayerCharacter").luck.getValue() >= 13 ) {
		State.variables.StVars.check3 = true;
	}
	State.variables.StVars.check4 = false;
	if ( ( gC("chPlayerCharacter").subChars.length == 0 ) && ( gC("chPlayerCharacter").domChar == null ) && ( gC("chNash").domChar == null ) && ( gRelTypeAb("chPlayerCharacter","chNash") == null ) ) {
	State.variables.StVars.check4 = true;
	}
	State.variables.StVars.check5 = false;
	if ( gC("chPlayerCharacter").physique.getValue() >= 14 || gC("chPlayerCharacter").agility.getValue() >= 14 || gC("chPlayerCharacter").resilience.getValue() >= 14 ) {
		State.variables.StVars.check5 = true;
	}
	
	State.variables.StVars.BkifNashRelScore = rLvlAbt("chNash","chPlayerCharacter","friendship") + rLvlAbt("chNash","chPlayerCharacter","romance") * 2 + rLvlAbt("chNash","chPlayerCharacter","submission") - rLvlAbt("chNash","chPlayerCharacter","domination") - rLvlAbt("chNash","chPlayerCharacter","enmity");
	
	// Initiate UI
	setRoomIntro("mapTrainingGrounds","fulfillmentCorridor");
	setPasChars([getPresentCharByKey("chAte"),getPresentCharByKey("chNash")]);
}

window.initializeSeAspiringTreeClimber = function () {
	gC("chClaw").agility.addExperience(1000);
	// Checks
	State.variables.StVars.check1 = false;
	if ( gC("chPlayerCharacter").saList.includes("baHypnoticGlance") ) {
		State.variables.StVars.check1 = "hypnosis";
	} else if ( gC("chPlayerCharacter").saList.includes("baEnergyDrainingKiss") ) {
		State.variables.StVars.check1 = "draining";
	} else if ( gC("chPlayerCharacter").saList.includes("baEtherealChains") ) {
		State.variables.StVars.check1 = "bondage";
	}
	
	State.variables.StVars.check2 = false; // Climb tree
	if ( ( gCstat("chPlayerCharacter","physique") + gCstat("chPlayerCharacter","resilience") + (gCstat("chPlayerCharacter","agility") / 2) ) >= 28 ) {
		State.variables.StVars.check2 = true;
	}
	State.variables.StVars.check3 = false; // Jump tree
	if ( ( gCstat("chPlayerCharacter","physique") + gCstat("chPlayerCharacter","agility") ) >= 26 ) {
		State.variables.StVars.check3 = true;
	}
	State.variables.StVars.check4 = false; // Jump at Claw
	if ( ( gCstat("chPlayerCharacter","physique") + gCstat("chPlayerCharacter","agility") + gCstat("chPlayerCharacter","perception") + gCstat("chPlayerCharacter","luck") ) >= 48 ) {
		State.variables.StVars.check4 = true;
	}
	State.variables.StVars.check5 = false; // Hold Claw down
	if ( ( gCstat("chPlayerCharacter","physique") + gCstat("chPlayerCharacter","resilience") ) >= 28 ) {
		State.variables.StVars.check5 = true;
	}
	State.variables.StVars.check6 = false; // Hypnotize Claw
	if ( ( gCstat("chPlayerCharacter","will") + gCstat("chPlayerCharacter","charisma") ) >= 26 ) {
		State.variables.StVars.check6 = true;
	}
	State.variables.StVars.check7 = false; // Bind Claw
	if ( ( gCstat("chPlayerCharacter","intelligence") + gCstat("chPlayerCharacter","will") ) >= 26 ) {
		State.variables.StVars.check7 = true;
	}
	State.variables.StVars.check8 = false; // Drain Claw
	if ( ( gCstat("chPlayerCharacter","agility") + gCstat("chPlayerCharacter","charisma") ) >= 26 ) {
		State.variables.StVars.check8 = true;
	}
	State.variables.StVars.check9 = false; // Claw is submissive
	if ( gC("chPlayerCharacter").subChars.includes("chClaw") ) {
		State.variables.StVars.check9 = true;
	}
	State.variables.StVars.check10 = false; // Claw is dominant
	if ( gC("chClaw").subChars.includes("chPlayerCharacter") ) {
		State.variables.StVars.check10 = true;
	}
	
	// Initiate UI
	setRoomIntro("mapTrainingGrounds","forest");
	setPasChars([getPresentCharByKey("chClaw")]);
}

window.initializeSeLuringMasquerade = function () {
	gC("chVal").charisma.addExperience(1000);
	charactersLearnSceneActions(["chVal"],["baBorrowedIdentity"]);
	// Checks
	State.variables.StVars.check1 = false; // Discovers plot check
	if ( ( gCstat("chPlayerCharacter","empathy") >= 13 ) || ( gCstat("chPlayerCharacter","perception") >= 13 ) || ( gCstat("chPlayerCharacter","intelligence") >= 14 ) ) {
		State.variables.StVars.check1 = true;
	}
	
	// Initiate UI
	setRoomIntro("mapTrainingGrounds","lake");
	setPasChars([]);
}

window.initializeSeGiftsForNature = function() {
	// Checks
	State.variables.StVars.check1 = false; // Avoid parasafi flower check
	if ( ( gCstat("chPlayerCharacter","will") >= 13 ) || ( gCstat("chPlayerCharacter","perception") >= 14 ) || ( gCstat("chPlayerCharacter","agility") >= 14 ) ) {
		State.variables.StVars.check1 = true;
	}
	
	// Conversation flags
	State.variables.StVars.check2 = false; // How does a gardener help me
	State.variables.StVars.check3 = false; // Gardener is selfish
	State.variables.StVars.check4 = false; // Gardener dislikes protegee
	State.variables.StVars.check5 = false; // Would want a gardener
	State.variables.StVars.check6 = false; // Would want to garden Mir
	State.variables.StVars.check7 = false; // Ask about Padmiri's gardener
	State.variables.StVars.check8 = false; // You would be a selfish gardener
	State.variables.StVars.check9 = false; // Selfish + domination
	
	// Initiate UI
		//setRoomIntro("mapTrainingGrounds","lake");
	setPasChars([getPresentCharByKey("chMir")]);
}

window.initializeSeDiscoveringTheOthers = function() {
	// Checks
	State.variables.StVars.check1 = false; // Int check
	if ( gCstat("chPlayerCharacter","intelligence") >= 14 || gCstat("chPlayerCharacter","perception") >= 15 ) {
		State.variables.StVars.check1 = true;
	}
	State.variables.StVars.check2 = false; // Cha check
	if ( gCstat("chPlayerCharacter","charisma") >= 14 ) {
		State.variables.StVars.check2 = true;
	}
	State.variables.StVars.check3 = false; // Emp check
	if ( gCstat("chPlayerCharacter","empathy") >= 13 ) {
		State.variables.StVars.check3 = true;
	}
	State.variables.StVars.check4 = 0; // Relation check
	State.variables.StVars.check4 += rLvlAbt("chAte","chPlayerCharacter","friendship") * 1 + rLvlAbt("chAte","chPlayerCharacter","romance") * 1 - rLvlAbt("chAte","chPlayerCharacter","rivalry") * 2 - rLvlAbt("chAte","chPlayerCharacter","enmity") * 4;
	
	// Initiate UI
	setRoomIntro("mapTrainingGrounds","westLibrary");
	setPasChars([getPresentCharByKey("chAte")]);
	
	// New social action
	State.variables.chAte.extraSocIntList.push("relaxingScent");
}

window.effectsSeDiscoveringTheOthersEarlyEnd = function() {
	if ( limitedRandomInt(100) > 49 ) {
		// Val gives advice to Ate
		State.variables.chVal.relations.chAte.friendship.stv += 350;
		State.variables.chAte.relations.chVal.friendship.stv += 350;
		State.variables.chVal.relations.chAte.sexualTension.stv += 350;
		State.variables.chAte.relations.chVal.sexualTension.stv += 350;
		addPointsToDrive(gC("chAte").dPleasure,50);
		addPointsToDrive(gC("chAte").dDomination,50);
		State.variables.chVal.socialdrive.current -= 25;
	} else {
		// Mir gives advice to Ate
		State.variables.chMir.relations.chAte.friendship.stv += 350;
		State.variables.chAte.relations.chMir.friendship.stv += 350;
		State.variables.chMir.relations.chAte.romance.stv += 350;
		State.variables.chAte.relations.chMir.romance.stv += 350;
		addPointsToDrive(gC("chAte").dLove,50);
		addPointsToDrive(gC("chAte").dCooperation,50);
		State.variables.chMir.socialdrive.current -= 25;
	}
}

window.initializeSeTheMerchants = function() {
	// Clean old variables
	cleanPrologueStoryVars();
	// Shrezdill - Old Ashwalker Candidate
	// Abibdill - Weapons merchant
	// Nimeresh - Bondage merchant
	// Enable and set merchants
	State.variables.enabledMerchants.push(0);
	State.variables.enabledMerchants.push(30);
	if ( State.variables.currentMerchants.includes(30) == false ) {
		State.variables.currentMerchants.push(30);
	}
	if ( State.variables.currentMerchants.includes(0) == false ) {
		State.variables.currentMerchants.push(0);
	}
	
	// Relation changes
	State.variables.chVal.relations.chMir.submission.stv += 150;
	State.variables.chMir.relations.chVal.domination.stv += 150;
	State.variables.StVars.check2 = 0;
	State.variables.StVars.check3 = 0;
	State.variables.StVars.check4 = 0;
	State.variables.StVars.check10 = false;
	
	// Checks
		// Character choice
	var nashScore = rLvlAbt("chNash","chPlayerCharacter","sexualTension") * 2 + rLvlAbt("chNash","chPlayerCharacter","romance") + rLvlAbt("chNash","chPlayerCharacter","domination") - rLvlAbt("chNash","chPlayerCharacter","submission");
	var mirScore = rLvlAbt("chMir","chPlayerCharacter","sexualTension") * 2 + rLvlAbt("chMir","chPlayerCharacter","romance") + rLvlAbt("chMir","chPlayerCharacter","domination") - rLvlAbt("chMir","chPlayerCharacter","submission");
	var valScore = rLvlAbt("chVal","chPlayerCharacter","sexualTension") * 2 + rLvlAbt("chVal","chPlayerCharacter","romance") + rLvlAbt("chVal","chPlayerCharacter","domination") - rLvlAbt("chVal","chPlayerCharacter","submission");
	if ( nashScore >= mirScore && nashScore >= valScore ) {
		State.variables.StVars.check1 = "nash";
	} else if ( valScore >= mirScore ) {
		State.variables.StVars.check1 = "val";
	} else {
		State.variables.StVars.check1 = "mir";
	}
	
		// Mir, Nash, Val, cost
	State.variables.StVars.check2 = (rLvlAbt("chPlayerCharacter","chMir","submission") - rLvlAbt("chPlayerCharacter","chMir","domination")) * 20 + rLvlAbt("chPlayerCharacter","chMir","sexualTension") * 10;
	if ( State.variables.StVars.check2 <= 10 ) { State.variables.StVars.check2 = 10; }
	State.variables.StVars.check3 = (rLvlAbt("chPlayerCharacter","chNash","submission") - rLvlAbt("chPlayerCharacter","chNash","domination")) * 20 + rLvlAbt("chPlayerCharacter","chNash","sexualTension") * 10;
	if ( State.variables.StVars.check3 <= 10 ) { State.variables.StVars.check3 = 10; }
	State.variables.StVars.check4 = (rLvlAbt("chPlayerCharacter","chVal","submission") - rLvlAbt("chPlayerCharacter","chVal","domination")) * 20 + rLvlAbt("chPlayerCharacter","chVal","sexualTension") * 10;
	if ( State.variables.StVars.check4 <= 10 ) { State.variables.StVars.check4 = 10; }
	if ( State.variables.StVars.check2 > State.variables.chPlayerCharacter.willpower.current || State.variables.StVars.check3 > State.variables.chPlayerCharacter.willpower.current || State.variables.StVars.check4 > State.variables.chPlayerCharacter.willpower.current ) {
		State.variables.StVars.check10 = true;
	}
	
		// Nash, Mir, Val, Ate, Claw checks
	State.variables.StVars.check5 = false;
	if ( (gCstat("chPlayerCharacter","charisma") + gCstat("chPlayerCharacter","will") + rLvlAbt("chNash","chPlayerCharacter","submission") + rLvlAbt("chNash","chPlayerCharacter","sexualTension") - rLvlAbt("chNash","chPlayerCharacter","domination") ) >= 28 ) { State.variables.StVars.check5 = "true"; }
	State.variables.StVars.check6 = false;
	if ( (gCstat("chPlayerCharacter","charisma") + gCstat("chPlayerCharacter","will") + rLvlAbt("chMir","chPlayerCharacter","submission") + rLvlAbt("chMir","chPlayerCharacter","sexualTension") - rLvlAbt("chMir","chPlayerCharacter","domination") ) >= 27 ) { State.variables.StVars.check6 = "true"; }
	State.variables.StVars.check7 = false;
	if ( (gCstat("chPlayerCharacter","agility") + gCstat("chPlayerCharacter","will") + rLvlAbt("chVal","chPlayerCharacter","submission") + rLvlAbt("chVal","chPlayerCharacter","sexualTension") - rLvlAbt("chVal","chPlayerCharacter","domination") ) >= 29 ) { State.variables.StVars.check7 = "true"; } 
	State.variables.StVars.check8 = false;
	if ( (gCstat("chPlayerCharacter","luck") + gCstat("chPlayerCharacter","will") + rLvlAbt("chAte","chPlayerCharacter","submission") + rLvlAbt("chAte","chPlayerCharacter","sexualTension") - rLvlAbt("chAte","chPlayerCharacter","domination") ) >= 25 ) { State.variables.StVars.check8 = "true"; }
	State.variables.StVars.check9 = false;
	if ( (gCstat("chPlayerCharacter","agility") + gCstat("chPlayerCharacter","will") + rLvlAbt("chClaw","chPlayerCharacter","submission") + rLvlAbt("chClaw","chPlayerCharacter","sexualTension") - rLvlAbt("chClaw","chPlayerCharacter","domination") ) >= 26 ) { State.variables.StVars.check9 = "true"; }
	
	// Initiate UI
	setRoomIntro("mapTrainingGrounds","grandHall");
	setPasChars([getPresentCharByKey("chNash"),getPresentCharByKey("chVal"),getPresentCharByKey("chMir"),getPresentCharByKey("chAte"),getPresentCharByKey("chClaw")]);
}

window.effectsSeTheMerchantsEnd = function() {
	createEquipment(equipmentType.KNUCKLES,"chClaw");
	createEquipment(equipmentType.WAND,"chMir");
	createEquipment(equipmentType.HANDFAN,"chVal");
	createEquipment(equipmentType.WAND,"chAte");
	createStartingPunishmentBondage();
}

window.cleanPrologueStoryVars = function() {
	for ( var stvar of ["firstDayWashed","firstDayTuto","ghAnnoyed","gh0","gh1","gh2","firstDayElderA","firstDayElderAndAshwalkers","pcDoom","pcMainDoom","pcBoon","pcMainBoon","firstDayTalkedToElder","metNash","metClaw","metVal","firstDayMirsFlower","nashRival","FirstDayWaitedWith","FirstDayNashRival","FirstDayMetAllCandidates","seMagicClassClawCheck","futaNash","seshFlirty","StretchingHelpResult","StretchingHelpGroped","seHummingCopyCheck","seHummingHarmonyCheck","seHummingImproviseCheck","seEthicsOfPowMUcheck","SeFbahHowsSill","SeFbahWhatsSill","SeFbahWhyTakePlaceSill","SeFbahRegretSill","SeFbahAnyQuestions","seStHeIINashInvites","seStHeIIMayRejectSex","seStHeIIwillpowerHit","flirtingAdviceChecks","DrishtyaTutorLifeAsCandidate","DrishtyaTutorThoughtsOnPeers","DrishtyaTutorReachedQuestions","DrishtyaTutorBehindTheRest","DrishtyaTutorStrengthenBonds","DrishtyaTutorDominatingOthers","DrishtyaTutorEmpathyCheck","DrishtyaTutorLeaveTheTemple","VaryonteTutorHasDick"] ) {
		if ( State.variables.StVars[stvar] != undefined ) {
			State.variables.StVars[stvar];
		}
	}
}

// Version 0.3

window.initializeGleamingCavernsOverview = function() {
	setPasChars([getPresentCharByKey("chMir"),getPresentCharByKey("chAte"),getPresentCharByKey("chClaw"),getPresentCharByKey("chNash"),getPresentCharByKey("chVal")]);
	setRoomIntro("mapTrainingGrounds","diningHall");
	for ( var cK of getCandidatesKeysArray() ) {
		for ( var at of setup.baseStats ) {
			gC(cK)[at].affinity -= 0.1;
		}
		gC(cK).charisma.affinity += 0.50;
		gC(cK).empathy.affinity += 0.40;
	}
}

window.initializePostAdventurePlaceholder = function() {
	for ( var cK of getCandidatesKeysArray() ) {
		for ( var at of setup.baseStats ) {
			gC(cK)[at].affinity += 0.1;
		}
		gC(cK).charisma.affinity -= 0.50;
		gC(cK).empathy.affinity -= 0.40;
	}
}

window.initializeSeTGoL = function() {
	// Checks
	State.variables.StVars.check1 = false; // Appeal to Ate's pride
	if ( (gCstat("chPlayerCharacter","charisma") * 1.2 + gCstat("chPlayerCharacter","empathy")) >= 25 ) {
		State.variables.StVars.check1 = true;
	}
	
	setPasChars([getPresentCharByKey("chVal"),getPresentCharByKey("chClaw")]);
	setRoomIntro("mapTrainingGrounds","eastBridge");
}

window.initializeMartialTutorshipI = function() {
	setPasChars([getPresentCharByKey("chNash")]);
	setRoomIntro("mapTrainingGrounds","dummies");
	
	// Check player weapon
	var pWeapon = "none";
	//var wType = getEquipById(gC("chPlayerCharacter").weaponID).type;
	if ( gC("chPlayerCharacter").weaponID == -1 ) {
	} else if ( getEquipById(gC("chPlayerCharacter").weaponID).type == equipmentType.STAFFOFBATTLE ) {
		pWeapon = "staff";
	} else {
		pWeapon = "other";
	}
	State.variables.StVars.check1 = pWeapon;
	// Placeholder variables
	State.variables.StVars.check2 = "";
	State.variables.StVars.check3 = "";
	// Checks
	State.variables.StVars.check4 = gCstat("chPlayerCharacter","resilience") * 1.3 + gCstat("chPlayerCharacter","physique");
	State.variables.StVars.check5 = gCstat("chPlayerCharacter","physique") * 1 + gCstat("chPlayerCharacter","agility") * 1.3 + gCstat("chPlayerCharacter","perception") * 1.3;
	State.variables.StVars.check6 = gCstat("chPlayerCharacter","agility") * 1.1 + gCstat("chPlayerCharacter","perception");
	State.variables.StVars.check7 = gCstat("chPlayerCharacter","agility") * 1 + gCstat("chPlayerCharacter","physique") * 1.1;
	
	State.variables.chNash.energy.current -= 10;
	State.variables.chNash.combatAffinities.weapon.strength += 5;
}

window.initializeShunnedByHerOwn = function() {
	setPasChars([getPresentCharByKey("chNash"),getPresentCharByKey("chMir")]);
	setRoomIntro("mapTrainingGrounds","amphitheater");
	
	// Affinities towards player, Nash's Player vs Mir, Mir's Player vs Nash
	State.variables.StVars.check1 = rLvlAbt("chNash","chPlayerCharacter","romance") * 2 + rLvlAbt("chNash","chPlayerCharacter","friendship") + rLvlAbt("chNash","chPlayerCharacter","sexualTension") - rLvlAbt("chNash","chPlayerCharacter","enmity") * 2 - rLvlAbt("chNash","chMir","romance") * 2 - rLvlAbt("chNash","chMir","friendship") - rLvlAbt("chNash","chMir","sexualTension") + rLvlAbt("chNash","chMir","enmity");
	State.variables.StVars.check2 = rLvlAbt("chMir","chPlayerCharacter","romance") * 2 + rLvlAbt("chMir","chPlayerCharacter","friendship") + rLvlAbt("chMir","chPlayerCharacter","sexualTension") - rLvlAbt("chMir","chPlayerCharacter","enmity") * 2 - rLvlAbt("chMir","chNash","romance") * 2 - rLvlAbt("chMir","chNash","friendship") - rLvlAbt("chMir","chNash","sexualTension") + rLvlAbt("chMir","chNash","enmity");
	
	// Affinities towards Valtan
	State.variables.StVars.check3 = rLvlAbt("chNash","chVal","friendship") * 2 + rLvlAbt("chNash","chVal","romance") - rLvlAbt("chNash","chVal","enmity") * 2 + getCharsDrive("chNash","dLove") - getCharsDrive("chNash","dDomination"); // Positive: Nash supports Valtan's love
	State.variables.StVars.check4 = rLvlAbt("chClaw","chVal","friendship") * 1 + rLvlAbt("chClaw","chVal","romance") - rLvlAbt("chClaw","chVal","rivalry") - rLvlAbt("chClaw","chVal","enmity") * 2 - getCharsDrive("chClaw","dDomination") + getCharsDrive("chClaw","dCooperation") - getCharsDrive("chClaw","dAmbition") + getCharsDrive("chClaw","dLove"); // Negative: Claw supports Valtan getting excluded
	State.variables.StVars.check5 = 2 + rLvlAbt("chMir","chVal","friendship") - rLvlAbt("chMir","chVal","enmity") + getCharsDrive("chVal","dLove") - getCharsDrive("chVal","dPleasure"); // Trusts Valtan's love to be sincere
	
	State.variables.StVars.check6 = (gCstat("chPlayerCharacter","charisma") + gCstat("chPlayerCharacter","empathy") + gCstat("chPlayerCharacter","luck") * 0.5) * 0.1 // Player's conversation influence
	
	for ( var cK of ["chNash","chMir","chClaw","chAte"] ) {
		gC(cK).supsValLove = 0;
		gC(cK).supsValPardon = 0;
	}
	gC("chNash").supsValLove += rLvlAbt("chNash","chVal","friendship") * 2 + rLvlAbt("chNash","chVal","romance") - rLvlAbt("chNash","chVal","enmity") * 2 + getCharsDrive("chNash","dLove") - getCharsDrive("chNash","dDomination") - getCharsDrive("chVal","dPleasure");
	gC("chNash").supsValPardon += rLvlAbt("chNash","chVal","friendship") * 2 + rLvlAbt("chNash","chVal","romance") * 2 - rLvlAbt("chNash","chVal","enmity") * 2 + getCharsDrive("chNash","dCooperation") - getCharsDrive("chNash","dDomination") -  getCharsDrive("chNash","dAmbition") - getCharsDrive("chVal","dPleasure");
	gC("chClaw").supsValPardon += rLvlAbt("chClaw","chVal","friendship") * 1 + rLvlAbt("chClaw","chVal","romance") - rLvlAbt("chClaw","chVal","rivalry") - rLvlAbt("chClaw","chVal","enmity") * 2 - getCharsDrive("chClaw","dDomination") + getCharsDrive("chClaw","dCooperation") - getCharsDrive("chClaw","dAmbition") + getCharsDrive("chClaw","dLove");
	gC("chClaw").supsValLove += rLvlAbt("chClaw","chVal","friendship") * 2 + rLvlAbt("chClaw","chVal","romance") - rLvlAbt("chClaw","chVal","enmity") * 2 - getCharsDrive("chClaw","dDomination") + getCharsDrive("chClaw","dCooperation") + getCharsDrive("chClaw","dLove") - 3;
	gC("chMir").supsValLove += rLvlAbt("chMir","chVal","friendship") - rLvlAbt("chMir","chVal","enmity") + getCharsDrive("chVal","dLove") - getCharsDrive("chVal","dPleasure") + getCharsDrive("chMir","dLove") - getCharsDrive("chVal","dPleasure");
	gC("chMir").supsValPardon += rLvlAbt("chMir","chVal","friendship") - rLvlAbt("chMir","chVal","enmity") + getCharsDrive("chVal","dLove") - getCharsDrive("chVal","dPleasure") + getCharsDrive("chMir","dLove") + getCharsDrive("chMir","dCooperation") +  + getCharsDrive("chMir","dAmbition") - getCharsDrive("chVal","dPleasure");
	gC("chAte").supsValLove += rLvlAbt("chAte","chVal","friendship") + rLvlAbt("chAte","chVal","romance") - rLvlAbt("chAte","chVal","enmity") + getCharsDrive("chAte","dLove") + getCharsDrive("chAte","dCooperation") + (- getCharsDrive("chAte","dImprovement") - getCharsDrive("chAte","dAmbition")) * 0.5 - getCharsDrive("chVal","dPleasure");
	gC("chAte").supsValPardon += rLvlAbt("chAte","chVal","friendship") + rLvlAbt("chAte","chVal","romance") - rLvlAbt("chAte","chVal","enmity") + getCharsDrive("chAte","dLove") + getCharsDrive("chAte","dCooperation") + getCharsDrive("chAte","dAmbition") - getCharsDrive("chAte","dDomination") - getCharsDrive("chVal","dPleasure");
	
	for ( var cK of ["chPlayerCharacter","chNash","chMir","chClaw"] ) {
		gC(cK).charisma.experience += 500;
		gC(cK).empathy.experience += 500;
	}
	gC("chAte").charisma.experience += 500;
	gC("chAte").empathy.experience += 500;
	gC("chVal").will.experience += 1000;
}

window.initializeSeFaK = function() {
	charactersLearnSceneActions(["chClaw","chMir"],["giveBlowjob","giveCunnilingus","getBlowjob","legHoldHead","suckDick","lickPussy","fuckFace","rideFace"]);
	State.variables.StVars.check1 = [false,false,false,false,false]; // Used harassment options ; show skin, masturbate, eat out, moan, exhibitionism
	State.variables.StVars.check2 = 0; // Padmiri hot and bothered score
	State.variables.StVars.check3 = 0; // Padmiri submission score
	State.variables.StVars.check4 = [false,false,false]; // Player has free collar, chastity belt, chastity cage
	
	for ( var eq of State.variables.equipmentList ) {
		if ( eq.owner == "chPlayerCharacter" && eq.equippedOn == null ) {
			if ( eq.type == "b0" ) {
				if ( gC("chMir").hasFreeBodypart("neck") ) {
					State.variables.StVars.check4[0] = eq.id;
				}
			} else if ( eq.type == "b7" ) {
				if ( gC("chMir").hasFreeBodypart("pussy") ) {
					State.variables.StVars.check4[1] = eq.id;
				}
			} else if ( eq.type == "b8" ) {
				if ( gC("chMir").hasFreeBodypart("dick") ) {
					State.variables.StVars.check4[2] = eq.id;
				}
			}
		}
	}
	
	setPasChars([getPresentCharByKey("chClaw"),getPresentCharByKey("chMir")]);
	setRoomIntro("mapTrainingGrounds","westLibrary");
}
window.seFaKpadmiriBotheredScore = function() {
	State.variables.StVars.check2 = 0;
	var bars = getBarPercentage("chMir","lust") + getBarPercentage("chMir","willpower");
	if ( bars <= 1.4 ) {
		State.variables.StVars.check2 = 3;
	} else if ( bars <= 1.6 ) {
		State.variables.StVars.check2 = 2;
	} else if ( bars <= 1.8 ) {
		State.variables.StVars.check2 = 1;
	}
}
window.seFaKupdatePadmiriSubmissionScore = function() {
	State.variables.StVars.check3 = State.variables.StVars.check2 * 3 + rLvlAbt("chMir","chPlayerCharacter","sexualTension") + rLvlAbt("chMir","chPlayerCharacter","submission") + rLvlAbt("chMir","chClaw","sexualTension") - rLvlAbt("chMir","chPlayerCharacter","enmity") + gC("chMir").dPleasure.level;
}

window.initializeBondageAwakening = function() {
	//setPasChars([getPresentCharByKey("chMir"),getPresentCharByKey("chClaw"),getPresentCharByKey("chNash")]);
	setPasChars([]);
	setRoomIntro("mapTrainingGrounds","lake");
	State.variables.StVars.check1 = getCharsDrive("chMir","dDomination") * 2 + getCharsDrive("chMir","dAmbition") + getCharsDrive("chMir","dPleasure") - getCharsDrive("chMir","dCooperation") - getCharsDrive("chMir","dLove"); // Padmiri's aggressiveness
	State.variables.StVars.check2 = false; // Player has chains
	State.variables.StVars.check3 = gCstat("chPlayerCharacter","intelligence") * 2 + gCstat("chPlayerCharacter","will") * 2 + gCstat("chPlayerCharacter","luck"); // Chains attack check
	State.variables.StVars.check4 = false; // Player has hypnosis
	State.variables.StVars.check5 = (gCstat("chPlayerCharacter","charisma") * 2 + gCstat("chPlayerCharacter","will")) * 0.2 + rLvlAbt("chMir","chPlayerCharacter","submission"); // Hypnosis attack check
	State.variables.StVars.check6 = getCharsDrive("chMir","dPleasure") + rLvlAbt("chMir","chNash","sexualTension") + rLvlAbt("chMir","chClaw","sexualTension");
	State.variables.StVars.check7 = getCharsDrive("chMir","dPleasure") + rLvlAbt("chMir","chNash","sexualTension") + rLvlAbt("chMir","chClaw","sexualTension") + rLvlAbt("chMir","chPlayerCharacter","sexualTension");
	State.variables.StVars.check8 = [false,false,false,false]; // Tried actions: Complained to Mir, Asked Mir, Confronted them, Suggest to leave
	State.variables.StVars.check9 = rLvlAbt("chMir","chPlayerCharacter","submission") * 2 + rLvlAbt("chMir","chPlayerCharacter","friendship") + rLvlAbt("chMir","chPlayerCharacter","friendship") - rLvlAbt("chMir","chPlayerCharacter","enmity") * 2; // Order Padmiri check
	State.variables.StVars.check10 = rLvlAbt("chMir","chPlayerCharacter","domination") * 2 + rLvlAbt("chMir","chPlayerCharacter","romance") + rLvlAbt("chMir","chPlayerCharacter","romance") - rLvlAbt("chMir","chPlayerCharacter","enmity") * 2; // Beg Padmiri check
	
	if ( gC("chPlayerCharacter").saList.includes("baEtherealChains") ) {
		State.variables.StVars.check2 = true;
	}
	if ( gC("chPlayerCharacter").saList.includes("baHypnoticGlance") ) {
		State.variables.StVars.check4 = true;
	}
	
	gC("chNash").relations.chClaw.enmity.stv += 250;
	gC("chNash").relations.chClaw.rivalry.stv += 250;
	gC("chClaw").relations.chNash.enmity.stv += 250;
	gC("chClaw").relations.chNash.rivalry.stv += 250;
}

///// Adventures /////

window.initGleamingCavernsSecondDay = function() {
	setPasChars([]);
	setRoomIntro("mapGleamingCaverns","templeStorage");
	
	gC("chGoddessHerald").name = "Varyonte";
	gC("chGoddessHerald").formattedName = '<span style="color:'+gC("chGoddessHerald").nameColor+'">'+gC("chGoddessHerald").name+'</span>';
	gC("chGoddessHerald").names = [ gC("chGoddessHerald").getName() , gC("chGoddessHerald").getName() , gC("chGoddessHerald").getName() ];
}

window.initGleamingCavernsDayPlaceholder = function() {
	
}

	// Twisted Festival

window.initGleamingCavernsTwistedFestival = function() {
	if ( State.variables.tribes.ssRpt == undefined ) {
		State.variables.tribes.ssRpt = -500;
	}
	State.variables.shapeshiftersForgiveValtan = -500;
	addToStVarsList("HdRlts");
	
	var closestCandidate = "none";
	var highestRelationship = -1;
	for ( var cK of ["chNash","chClaw","chMir","chAte","chVal"] ) {
		var currentRel = rLvlAbt(cK,"chPlayerCharacter","friendship") + rLvlAbt(cK,"chPlayerCharacter","romance") * 2 + rLvlAbt(cK,"chPlayerCharacter","sexualTension") - rLvlAbt(cK,"chPlayerCharacter","rivalry") - rLvlAbt(cK,"chPlayerCharacter","enmity") * 2;
		if ( currentRel > 10 && currentRel > highestRelationship ) {
			highestRelationship = currentRel;
			closestCandidate = cK;
		}
	}
	State.variables.StVars.check1 = "drishtya";
	if ( closestCandidate != "none" && closestCandidate != "chVal" ) {
		State.variables.StVars.check1 = closestCandidate;
	}
	
	// One or Two Valtans
	if ( State.variables.nerConviction == undefined ) {
		initNersmiasGlobalConviction();
	}
	State.variables.StVars.check2 == false;
	if ( isStVarOn("gcSiTl") == true || isStVarOn("gcSiSp") == true || State.variables.nerConviction < 50 ) {
		if ( isStVarOn("gcSiWT") == false ) {
			State.variables.StVars.check2 = true;
		}
	}
	
	// Went to talk to Mesquelles?
	State.variables.StVars.check3 = false;
	if ( isStVarOn("mphFnTf") == true ) {
		State.variables.StVars.check3 = true;
	}
	
	// Int check 
	State.variables.StVars.check4 = false;
	if ( gCstat("chPlayerCharacter","intelligence") >= 20 ) {
		State.variables.StVars.check4 = true;
	}
	
	// Empathy check
	State.variables.StVars.check5 = false;
	if ( gCstat("chPlayerCharacter","intelligence") >= 16 ) {
		State.variables.StVars.check5 = true;
	}
}
window.initGleamingCavernsTwistedFestivalPart2 = function() {
	// Padmiri's position
	State.variables.StVars.check6 = true;
	if ( gC("chMir").supsValPardon < 0 ) { State.variables.StVars.check6 = false; }
	// Nashillbyir's position
	State.variables.StVars.check7 = true;
	if ( gC("chNash").supsValPardon < 0 ) { State.variables.StVars.check7 = false; }
	// Claw's position
	State.variables.StVars.check8 = true;
	if ( gC("chClaw").supsValPardon < 0 ) { State.variables.StVars.check8 = false; }
	// Can Player Beg
	State.variables.StVars.check9 = false;
	if ( State.variables.StVars.check6 == false || State.variables.StVars.check7 == false || State.variables.StVars.check8 == false ) {
		State.variables.StVars.check9 = true;
	}
}

window.twistedFestivalProcessValtanDoesntDeserveIt = function() {
	var tempText = "";
	var affectedCandidates = [];
	for ( var ch of ["chMir","chNash","chClaw","chAte"] ) {
		if ( getCharsDrivePercent(ch,"dAmbition") > 0.16 ) {
			affectedCandidates.push(ch);
			State.variables[ch].relations.chPlayerCharacter.friendship.stv += 300;
		}
	}
	if ( affectedCandidates.length > 0 ) {
		var tText = "//Despite any disagreements, " + getCharNames(affectedCandidates);
		if ( affectedCandidates.length > 1 ) { tText += " show " } else { tText += " shows " }
		tText += "respect for your commitment with your duties as a Candidate. Your friendship improves.//\n\n"
		tempText = colorText(tText,"khaki");
	}
	State.variables.temp = tempText;
	return tempText;
}
window.twistedFestivalCandidatesShouldWorkTogether = function() {
	var tempText = "";
	var coopCandidates = [];
	var domCandidates = [];
	for ( var ch of ["chMir","chNash","chClaw","chAte"] ) {
		if ( getCharsDrivePercent(ch,"dCooperation") > 0.20 ) {
			coopCandidates.push(ch);
			State.variables[ch].relations.chPlayerCharacter.friendship.stv += 300;
		} else if ( getCharsDrivePercent(ch,"dDomination") > 0.20 ) {
			domCandidates.push(ch);
			State.variables[ch].relations.chPlayerCharacter.rivalry.stv += 300;
		}
	}
	if ( coopCandidates.length > 0 ) {
		var tText = "Due to views favoring cooperation, " + getCharNames(coopCandidates) + " liked your speech. Your friendship improves.\n";tempText = colorText(tText,"khaki");
	}
	if ( domCandidates.length > 0 ) {
		var tText = "Due to views favoring competition, " + getCharNames(domCandidates) + " felt uncomfortable with your speech. Your rivalry increases.\n\n";
		tempText += colorText(tText,"red");
	}
	State.variables.temp = tempText;
	return tempText;
}
window.twistedFestivalWontHumilliateValtan = function() {
	var tempText = "";
	var affectedCandidates = [];
	for ( var ch of ["chMir","chNash","chClaw","chAte"] ) {
		var relScore = rLvlAbt(ch,"chVal","friendship") + rLvlAbt(ch,"chVal","romance") - rLvlAbt(ch,"chVal","rivalry") - rLvlAbt(ch,"chVal","enmity");
		if ( relScore > 4 ) {
			affectedCandidates.push(ch);
			State.variables[ch].relations.chPlayerCharacter.friendship.stv += 300;
		}
	}
	if ( affectedCandidates.length > 0 ) {
		var tText = "//Due to having a positive opinion of Valtan, " + getCharNames(affectedCandidates);
		tText += "felt moved by your words. Your friendship improves.//\n\n"
		tempText = colorText(tText,"khaki");
	}
	State.variables.temp = tempText;
	return tempText;
}
window.twistedFestivalBegForValtan = function() {
	var tempText = "";
	gC("chPlayerCharacter").merit -= 25;
	if ( State.variables.StVars.check6 == false ) { // Convincing Padmiri
		var playerRel = rLvlAbt("chMir","chPlayerCharacter","friendship") + rLvlAbt("chMir","chPlayerCharacter","romance") - rLvlAbt("chMir","chPlayerCharacter","rivalry") - rLvlAbt("chMir","chPlayerCharacter","enmity");
		if ( playerRel > gC("chMir").supsValPardon ) {
			tempText += colorText("Relationship check: passed. Padmiri will reconsider her position.\nYou now owe 20 extra favor to Padmiri.\n","green");
			State.variables.StVars.check6 = true;
			gC("chMir").supsValPardon = 1;
			payFavorDebt("chMir","chPlayerCharacter",20);
		} else {
			tempText += colorText("Relationship check: failed. Padmiri will not change her position.\n","red");
		}
	}
	if ( State.variables.StVars.check7 == false ) { // Convincing Nashillbyir
		var playerRel = rLvlAbt("chNash","chPlayerCharacter","friendship") + rLvlAbt("chNash","chPlayerCharacter","romance") - rLvlAbt("chNash","chPlayerCharacter","rivalry") - rLvlAbt("chNash","chPlayerCharacter","enmity");
		if ( playerRel > gC("chNash").supsValPardon ) {
			tempText += colorText("Relationship check: passed. Nashillbyir will reconsider her position.\nYou now owe 20 extra favor to Nashillbyir.\n","green");
			State.variables.StVars.check7 = true;
			gC("chNash").supsValPardon = 1;
			payFavorDebt("chNash","chPlayerCharacter",20);
		} else {
			tempText += colorText("Relationship check: failed. Nashillbyir will not change her position.\n","red");
		}
	}
	if ( State.variables.StVars.check8 == false ) { // Convincing Claw
		var playerRel = rLvlAbt("chClaw","chPlayerCharacter","friendship") + rLvlAbt("chClaw","chPlayerCharacter","romance") - rLvlAbt("chClaw","chPlayerCharacter","rivalry") - rLvlAbt("chClaw","chPlayerCharacter","enmity");
		if ( playerRel > gC("chClaw").supsValPardon ) {
			tempText += colorText("Relationship check: passed. Claw will reconsider her position.\nYou now owe 20 extra favor to Claw.\n","green");
			State.variables.StVars.check8 = true;
			gC("chClaw").supsValPardon = 1;
			payFavorDebt("chClaw","chPlayerCharacter",20);
		} else {
			tempText += colorText("Relationship check: failed. Claw will not change her position.\n","red");
		}
	}
	tempText += "\nOverwhelmed by your emotions, you're unable to focus on anyone, to take any clues, to see if you've made them feel anything. For now, there's nothing left for you to do but hope for the best.\n\n//You have lost 25 merit.//"
	State.variables.temp = tempText;
	return tempText;
}
window.twistedFestivalCandidateSpeechEffects = function(candidate) {
	var tempText = "//";
	// Logic
	var changedSFV = 65; // Changed value of "shapeshiftersForgiveValtan"
	var mainStat = gCstat(candidate,"charisma") * 3 + gCstat(candidate,"empathy") + gCstat(candidate,"will") + gC(candidate).impExp * 3;
	var ssRsp = gC(candidate).ssRsp;
	var firstMult = 1;
	if ( mainStat < 100 ) { firstMult = 0.8; }
	else if ( mainStat > 120 ) { firstMult = 1.3; }
	var secMult = 1;
	if ( ssRsp < 30 ) { secMult = 0.9; }
	else if ( ssRsp > 50 ) { secMult = 1.2; }
		// Execute logic
	State.variables.shapeshiftersForgiveValtan += ( changedSFV * firstMult * secMult );
	gC(candidate).ssRsp -= 50;
	State.variables.tribes.ssRpt -= 100;
	// Generate message
	if ( firstMult > 1 ) {
		tempText += colorText(gC(candidate).name + "'s charisma, empathy, will and improvisation skill produce a more compelling speech.\n","green");
	} else if ( firstMult < 1 ) {
		tempText += colorText(gC(candidate).name + "'s charisma, empathy, will and improvisation skill are mediocre, and the speech isn't as effective.\n","red");
	}
	if ( secMult > 1 ) {
		tempText += colorText(gC(candidate).name + "'s respect in the tribe makes the Shapeshifters take her words more seriously.\n","green");
	} else if ( secMult < 1 ) {
		tempText += colorText(gC(candidate).name + "'s respect in the tribe is too low, and her words lose weight.\n","red");
	}
	tempText += gC(candidate).name + "'s speech shakes the Shapeshifter tribe's convictions.\n";
	tempText += gC(candidate).name + " has lost considerable respect in the Shapeshifter tribe.\n";
	tempText += "The relations between the Shapeshifter tribe and the Passion Temple have considerably deteriorated.//\n";
	State.variables.temp = tempText;
	return tempText;
}
window.twistedFestivalPlayerSpeechEffects = function(extraPoints) {
	var tempText = "//";
	// Logic
	var changedSFV = 65 + extraPoints; // Changed value of "shapeshiftersForgiveValtan"
	var mainStat = gCstat("chPlayerCharacter","charisma") * 3 + gCstat("chPlayerCharacter","empathy") + gCstat("chPlayerCharacter","will") + gC("chPlayerCharacter").impExp * 3;
	var ssRsp = gC("chPlayerCharacter").ssRsp;
	var firstMult = 1;
	if ( mainStat < 100 ) { firstMult = 0.8; }
	else if ( mainStat > 120 ) { firstMult = 1.3; }
	var secMult = 1;
	if ( ssRsp < 30 ) { secMult = 0.9; }
	else if ( ssRsp > 50 ) { secMult = 1.2; }
	if ( isStVarOn("neStSs") ) {
		changedSFV *= 0.5;
	}
	if ( isStVarOn("CaReVl") ) {
		changedSFV *= 1.6;
	} else if ( isStVarOn("CaRePl") ) {
		changedSFV *= 1.3;
	}
	if ( isStVarOn("tfTfVl") ) {
		changedSFV *= 1.4;
	}
	
		// Execute logic
	State.variables.shapeshiftersForgiveValtan += ( changedSFV * firstMult * secMult );
	gC("chPlayerCharacter").ssRsp -= 50;
	State.variables.tribes.ssRpt -= 100;
	// Generate message
	if ( firstMult > 1 ) {
		tempText += colorText("Your charisma, empathy, will and improvisation skill produce a more compelling speech.\n","green");
	} else if ( firstMult < 1 ) {
		tempText += colorText("Your charisma, empathy, will and improvisation skill are mediocre, and the speech isn't as effective.\n","red");
	}
	if ( secMult > 1 ) {
		tempText += colorText("Your respect in the tribe makes the Shapeshifters take your words more seriously.\n","green");
	} else if ( secMult < 1 ) {
		tempText += colorText("Your respect in the tribe is too low, and your words lose weight.\n","red");
	}
	if ( isStVarOn("neStSs") ) {
		tempText += colorText("The fact that you apologized in behalf of Valtan, naked and allowing everyone to use your body, makes your speech to become dramatically less effective.\n","red");
	}
	if ( isStVarOn("CaReVl") ) {
		tempText += colorText("Glien's support makes the good deeds committed by you and Valtan earn you respect amongst the Shapeshifters, even if many remain skeptical.\n","green");
	} else if ( isStVarOn("CaRePl") ) {
		tempText += colorText("Glien's support and your good deeds earn you respect amongst the Shapeshifters, even if many remain skeptical.\n","green");
	}
	if ( isStVarOn("tfTfVl") ) {
		tempText += colorText("Mesquelles' support isn't earned easily, impressing some Shapeshifters..\n","green");
	}
	tempText += gC("chPlayerCharacter").name + "'s speech shakes the Shapeshifter tribe's convictions.\n";
	tempText += gC("chPlayerCharacter").name + " has lost considerable respect in the Shapeshifter tribe.\n";
	tempText += "The relations between the Shapeshifter tribe and the Passion Temple have considerably deteriorated.//\n";
	State.variables.temp = tempText;
	return tempText;
}
window.twistedFestivalSpeechesGetNextPassage = function(currentPoint) {
	// Points: Ate's sp: 0 ; Mir's sp: 1 ; Nash's sp: 2 ; Claw's sp: 3 ; Tfed Player Decisions: 4 ; Other Player Decisions: 5
	var pasLink = "";
	if ( currentPoint < 1 && State.variables.StVars.check6 == true ) {
		pasLink = "[[Continue|TwistedFest TwistedTrialMir]]";
	} else if ( currentPoint < 2 && State.variables.StVars.check7 == true ) {
		pasLink = "[[Continue|TwistedFest TwistedTrialNash]]";
	} else if ( currentPoint < 3 && State.variables.StVars.check8 == true ) {
		pasLink = "[[Continue|TwistedFest TwistedTrialClaw]]";
	} else if ( isStVarOn("tfTfVl") == true ) {
		pasLink = "[[Continue|TwistedFest TwistedTrialTfedPlayerDecisions]]";
	} else {
		pasLink = "[[Continue|TwistedFest TwistedTrialStdPlayerDecisions]]";
	}
	return pasLink;
}
window.twistedFestivalPlayerDoesntDefendValtan = function() {
	var tempText = "";
	if ( isStVarOn("plSgVF") ) {
		tempText = colorText("Story check: failed.","red") + "\n\nBecause you claimed you would support Valtan earlier, the other Candidates take note of your betrayal." + colorText("\nYour enmity with Maaterasu has hugely increased.","red");
		State.variables["chAte"].relations.chPlayerCharacter.enmity.stv += 750;
		if ( State.variables.StVars.check6 == true ) {
			tempText += colorText("\nYour enmity with Padmiri has hugely increased.","red");
			State.variables["chMir"].relations.chPlayerCharacter.enmity.stv += 750;
		} else if ( State.variables.StVars.check7 == true ) {
			tempText += colorText("\nYour enmity with Nashillbyir has hugely increased.","red");
			State.variables["chNash"].relations.chPlayerCharacter.enmity.stv += 750;
		} else if ( State.variables.StVars.check8 == true ) {
			tempText += colorText("\nYour enmity with Claw has hugely increased.","red");
			State.variables["chClaw"].relations.chPlayerCharacter.enmity.stv += 750;
		}
	} else {
		tempText = colorText("Story check: passed.","green") + "\n\nBecause you didn't claim you would support Valtan earlier, the other Candidates respect your decision."
	}
	State.variables.temp = tempText;
	return tempText;
}
window.twistedFestivalValtanCheck = function() {
	var result = false;
	if ( gCstat("chVal","charisma") * 2 + gCstat("chVal","will") * 2 + gCstat("chVal","empathy") > 90 ) {
		result = true;
	}
	return result;
}
window.twistedFestivalValtanSpeechEffects = function(extraPoints) {
	var tempText = "//";
	// Logic
	var changedSFV = 100 + extraPoints; // Changed value of "shapeshiftersForgiveValtan"
	var mainStat = gCstat("chVal","charisma") * 3 + gCstat("chVal","empathy") + gCstat("chVal","will");
	var ssRsp = gC("chVal").ssRsp;
	var firstMult = 1;
	if ( mainStat < 75 ) { firstMult = 0.8; }
	else if ( mainStat > 85 ) { firstMult = 1.3; }
		// Execute logic
	State.variables.shapeshiftersForgiveValtan += ( changedSFV * firstMult );
	State.variables.tribes.ssRpt -= 100;
	// Generate message
	if ( extraPoints > 0 ) {
		tempText += colorText(gC("chVal").name + " has grown determined enough to be honest with her own feelings.\n","green");
	}
	if ( firstMult > 1 ) {
		tempText += colorText(gC("chVal").name + "'s charisma, empathy, will and improvisation skill are top notch, and the audience is dazzled.\n","green");
	} else if ( firstMult < 1 ) {
		tempText += colorText(gC("chVal").name + "'s charisma, empathy, will and improvisation skill are mediocre, and the speech isn't as effective.\n","red");
	}
	tempText += gC("chVal").name + "'s speech shakes the Shapeshifter tribe's convictions.//";
	State.variables.temp = tempText;
	return tempText;
}
window.twistedFestivalChooseEnding = function() {
	// Score Valtan forgiveness
	var ssForgiveValtan = State.variables.shapeshiftersForgiveValtan;
	// Sillan wanted to see Valtan
	var isSillanDetermined = false;
	if ( isStVarOn("gcSiTl") == true || isStVarOn("gcSiSp") == true || State.variables.nerConviction < 50 ) {
		if ( isStVarOn("gcSiWT") == false ) {
			isSillanDetermined = true;
		}
	}
	var ending = "silPlusFor"; // Sillan Plus Forgiveness
	var passage = "[[Valtan's fate will be decided|TwistedFest EndingA]]";
	if ( ssForgiveValtan > 0 ) {
	} else if ( ssForgiveValtan < -50 && isSillanDetermined ) {
		ending = "silMinusFor"; // Sillan Minus Forgiveness
		passage = "[[Valtan's fate will be decided|TwistedFest EndingB]]";
	} else {
		ending = "noSil"; // Neither Sillan Nor Forgiveness
		passage = "[[Valtan's fate will be decided|TwistedFest EndingC]]";
	}
	return passage;
}
window.twistedFestivalEndingCeffects = function() {
	var tempText = "";
	addToStVarsList("GcEndC");
	addPointsToDrive(gC("chVal").dPleasure,1000);
	addPointsToDrive(gC("chVal").dDomination,500);
	addPointsToDrive(gC("chVal").dAmbition,-500);
	addPointsToDrive(gC("chVal").dImprovement,-500);
	gC("chVal").dLove.value = 0;
	gC("chVal").dLove.level = 0;
	for ( var cK of ["chPlayerCharacter","chNash","chMir","chClaw","chAte"] ) {
		State.variables.chVal.relations[cK].romance.stv = 0;
		State.variables.chVal.relations[cK].romance.ltv = 0;
		State.variables.chVal.relations[cK].friendship.stv *= 0.5;
		State.variables.chVal.relations[cK].friendship.ltv *= 0.5;
		State.variables.chVal.relations[cK].sexualTension.stv *= 0.5;
		State.variables.chVal.relations[cK].sexualTension.ltv *= 0.5;
	}
	addPointsToDrive(gC("chAte").dAmbition,250);
	tempText = "//This will have large consequences for Valtan.\nValtan's love drive has fallen to zero.\nValtan's ambition and self-improvement drives have decreased.\nValtan's pleasure and domination drives have increased."
	tempText += "\n" + colorText("Valtan's romances have fallen to zero.","red");
	tempText += "\n" + colorText("Valtan's friendships and sexual tensions have been cut in half.","red");
	tempText += "\nMaaterasu's ambition drive has increased."
	if ( State.variables.StVars.check6 ) {
		addPointsToDrive(gC("chMir").dDomination,250);
		addPointsToDrive(gC("chMir").dAmbition,250);
		tempText += "\nPadmiri's domination and ambition drives have increased.";
	}
	if ( State.variables.StVars.check8 ) {
		addPointsToDrive(gC("chClaw").dDomination,250);
		addPointsToDrive(gC("chClaw").dAmbition,250);
		tempText += "\nClaw's domination and ambition drives have increased.";
	}
	State.variables.temp = tempText + "//";
	return tempText;
}
window.twistedFestivalEndingBeffects = function() {
	var tempText = "";
	addToStVarsList("GcEndB");
	addPointsToDrive(gC("chVal").dLove,500);
	addPointsToDrive(gC("chVal").dPleasure,500);
	addPointsToDrive(gC("chVal").dAmbition,-500);
	gC("chVal").charisma.affinity += 0.05;
	gC("chVal").empathy.affinity += 0.05;
	tempText = "//This will have large consequences for Valtan.\nValtan's love and pleasure drives have increased.\nValtan's ambition drive has decreased.\nValtan's charisma and empathy affinities have increased.//";
	State.variables.temp = tempText;
	return tempText;
}
window.twistedFestivalEndingAeffects = function() {
	var tempText = "";
	addToStVarsList("GcEndA");
	addPointsToDrive(gC("chVal").dAmbition,1000);
	addPointsToDrive(gC("chVal").dLove,1000);
	gC("chVal").charisma.affinity += 0.05;
	gC("chVal").empathy.affinity += 0.05;
	gC("chVal").will.affinity += 0.1;
	if ( isStVarOn("tfNsSp") ) {
		State.variables.chVal.relations["chNash"].friendship.stv += 1000;
		gC("chNash").ssRsp += 50;
		State.variables.tribes.ssRpt += 100;
	}
	if ( isStVarOn("tfMrSp") ) {
		State.variables.chVal.relations["chMir"].friendship.stv += 1000;
		gC("chMir").ssRsp += 50;
		State.variables.tribes.ssRpt += 100;
	}
	if ( isStVarOn("tfClSp") ) {
		State.variables.chVal.relations["chClaw"].friendship.stv += 1000;
		gC("chClaw").ssRsp += 50;
		State.variables.tribes.ssRpt += 100;
	}
	if ( isStVarOn("tfPlSp") ) {
		State.variables.chVal.relations["chPlayerCharacter"].friendship.stv += 1000;
		gC("chPlayerCharacter").ssRsp += 50;
		State.variables.tribes.ssRpt += 100;
	}
	State.variables.chVal.relations["chAte"].friendship.stv += 1000;
	gC("chAte").ssRsp += 50;
	State.variables.tribes.ssRpt += 1100;
	addPointsToDrive(gC("chAte").dCooperation,250);
	gC("chVal").ssRsp = 250;
	
	tempText = "//This will have large consequences for Valtan.\nValtan's love and ambition drives have increased.\nValtan's charisma and empathy affinities have increased, and her will affinity has largely increased.\nValtan has gained friendship with every Candidate that defended her.//";
	tempText += "\n//Maaterasu's cooperation drive has increased."
	if ( State.variables.StVars.check6 ) {
		addPointsToDrive(gC("chMir").dCooperation,250);
		tempText += "\nPadmiri's cooperation drive has increased.";
	}
	if ( State.variables.StVars.check8 ) {
		addPointsToDrive(gC("chClaw").dCooperation,250);
		tempText += "\nClaw's cooperation drive has increased.";
	}
	tempText += "\nThe respect lost for defending Valtan has been recovered.";
	tempText += "\nThe relations with the Shapeshifter tribe have been restored.";
	tempText += "\nValtan has gained the respect of her tribe.//";
	State.variables.temp = tempText;
	return tempText;
}

window.initGleamingCavernsEpilogue = function() {
	if ( State.variables.StVars.temp ) {
		delete State.variables.StVars.temp;
	}
	State.variables.chChin = createAtelechinol();
	
	if ( isStVarOn("GcEndA") ) {
		State.variables.StVars.check1 = 1;
	} else if ( isStVarOn("GcEndB") ) {
		State.variables.StVars.check1 = 2;
	} else {
		State.variables.StVars.check1 = 3;
	}
	
	State.variables.StVars.check3 = false; // Mounted Atenechinol
	State.variables.StVars.check4 = false; // Used fire breath
	State.variables.StVars.check5 = false; // KOed ally
	State.variables.StVars.check6 = false; // Defeated Atenechinol
	
	State.variables.StVars.check7 = false; // Did Mesquelles transform the player?
	if ( isStVarOn("mphFnTf") ) { State.variables.StVars.check7 = true; }
	
	var closestCandidate = -1;
	var highestRelationship = -1;
	for ( var cK of ["chNash","chMir","chAte","chVal"] ) {
		var currentRel = rLvlAbt(cK,"chPlayerCharacter","friendship") + rLvlAbt(cK,"chPlayerCharacter","romance") * 2 + rLvlAbt(cK,"chPlayerCharacter","sexualTension") - rLvlAbt(cK,"chPlayerCharacter","rivalry") - rLvlAbt(cK,"chPlayerCharacter","enmity") * 2;
		if ( currentRel > 10 && currentRel > highestRelationship ) {
			highestRelationship = currentRel;
			closestCandidate = cK;
		}
	}
	State.variables.StVars.check8 = "none";
	if ( closestCandidate != -1 ) {
		State.variables.StVars.check8 = closestCandidate;
	}
}
window.gCepigInitGuestsChecks = function() {
	State.variables.StVars.check3 = true; // Artume
	State.variables.StVars.check4 = true; // Hope
	State.variables.StVars.check5 = true; // Rock
	State.variables.StVars.check8 = isStVarOn("mphFnTf"); // Mesquelles allowed
	State.variables.StVars.check9 = !isStVarOn("GcEndC"); // Sillan allowed
	State.variables.StVars.check6 = State.variables.StVars.check8; // Mesquelles
	State.variables.StVars.check7 = State.variables.StVars.check9; // Sillan
	State.variables.StVars.check10 = isStVarOn("GcEndA"); // Nersmias tip
}
window.endGleamingCavernsEpilogue = function() {
	var chars = ["chVal","chMir","chAte"];
	if ( State.variables.StVars.check1 != 3 ) {
		chars.push("chSil");
	}
	for ( var ch of chars ) {
		for ( var stat of setup.baseStats ) {
			gC(ch)[stat].experience += 700;
		}
		gC(ch).merit += 7;
	}
	chars.push("chNash","chRock");
	for ( var ch of chars ) {
		for ( var stat of setup.baseStats ) {
			gC(ch)[stat].experience += 300;
		}
		gC(ch).merit += 2;
	}
	for ( var ch of ["chNash","chClaw","chMir","chVal","chAte","chRock","chHope" ] ) {
		addPointsToDrive(gC(ch).dImprovement,100);
		addPointsToDrive(gC(ch).dDomination,100);
		addPointsToDrive(gC(ch).dAmbition,100);
	}
	addPointsToDrive(gC("chClaw").dImprovement,250);
	
	gCaddSelectedGuests();
	finishGleamingCavernsAdventure();
}
window.gCaddSelectedGuests = function() {
	if ( State.variables.StVars.check4 ) {
		addGuest("chHope");
		if ( State.variables.StVars.check5 ) {
			addGuest("chRock");
		} else {
			removeCharFromGameCycle("chRock");
		}
	} else {
		removeCharFromGameCycle("chHope");
		removeCharFromGameCycle("chRock");
	}
	if ( State.variables.StVars.check3 ) {
		addGuest("chArt");
	} else {
		removeCharFromGameCycle("chArt");
	}
	if ( State.variables.StVars.check6 ) {
		addGuest("chMes");
	} else {
		removeCharFromGameCycle("chMes");
	}
	if ( State.variables.StVars.check7 ) {
		addGuest("chSil");
	} else {
		removeCharFromGameCycle("chSil");
	}
	removeItemsFromChar("chNer");
	delete State.variables.chNer;
	removeCharFromActiveChars("chNer");
	removeItemsFromChar("chChin");
	delete State.variables.chChin;
	removeCharFromActiveChars("chChin");
	
	removeRelationshipDataWithRemovedCharacters();
}

	// Return from GC
	
window.initializeTributeForTheGoddess = function() {
	setPasChars([getPresentCharByKey("chMir")]);
	setRoomIntro("mapTrainingGrounds","grandHall");
	
	State.variables.StVars.check1 = [false,false,false,false,false,false]; // Ask Nash , Mir , Val , Claw , Ate , ([],) everyone
	State.variables.StVars.check2 = [false,false,false,false,false,false]; // Checks for Nash , Mir , Val , Claw , Ate , ([],) everyone
	var relScores = [0,0,0,0,0];
	var i = 0;
	for ( var ch of ["chNash","chMir","chVal","chClaw","chAte"] ) {
		var rel = rLvlAbt(ch,"chPlayerCharacter","friendship") + rLvlAbt(ch,"chPlayerCharacter","romance") * 2 + rLvlAbt(ch,"chPlayerCharacter","sexualTension") * 2 - rLvlAbt(ch,"chPlayerCharacter","rivalry") * 2 - rLvlAbt(ch,"chPlayerCharacter","enmity") * 4;
		if ( rLvlAbt(ch,"chPlayerCharacter","submission") > rLvlAbt(ch,"chPlayerCharacter","domination") ) {
			rel += (rLvlAbt(ch,"chPlayerCharacter","submission") - rLvlAbt(ch,"chPlayerCharacter","domination")) * 2;
		}
		relScores[i] = rel;
		State.variables.StVars.check2[i] = (rel > 5);
		i++;
	}
	var lastChoiceAllowed = true;
	var physicalStats = gCstat("chPlayerCharacter","physique") + gCstat("chPlayerCharacter","agility") + gCstat("chPlayerCharacter","resilience");
	var socialStats = gCstat("chPlayerCharacter","charisma") * 1.6 + gCstat("chPlayerCharacter","empathy") * 1.4;
	if ( physicalStats > socialStats ) {
		var plStats = (physicalStats + gCstat("chPlayerCharacter","luck") * 0.5) / 10;
	} else {
		var plStats = (socialStats + gCstat("chPlayerCharacter","luck") * 0.5) / 10;
	}
	State.variables.StVars.check6 = plStats.toFixed(1);
	for ( var i of relScores ) {
		if ( (i + plStats) < 17 ) {
			lastChoiceAllowed = false;
		}
	}
	State.variables.StVars.check5 = relScores;
	State.variables.StVars.check2[5] = lastChoiceAllowed;
	State.variables.StVars.check3 = isStVarOn("GcEndC");
	State.variables.StVars.check4 = isStVarOn("GcEndA");
}
window.tributeForTheGoddessMiddleScript = function(chosenCharacter) {
	var otherCharacters = ["chNash","chClaw","chMir","chVal","chAte"];
	var playerGroup = ["chPlayerCharacter"];
	if ( otherCharacters.includes(chosenCharacter) ) {
		otherCharacters = arrayMinusA(otherCharacters,chosenCharacter);
		playerGroup.push(chosenCharacter);
	}
	if ( chosenCharacter == "all" ) {
		otherCharacters.push("chPlayerCharacter");
		playerGroup = null;
	}
	for ( var chA of otherCharacters ) {
		for ( var chB of otherCharacters ) {
			if ( chA != chB ) {
				gC(chA).relations[chB].sexualTension.stv += 350;
				gC(chA).relations[chB].romance.stv += 150;
				gC(chA).relations[chB].friendship.stv += 150;
			}
		}
	}	
	if ( playerGroup ) {
		if ( playerGroup.length > 1 ) {
			for ( var chA of playerGroup ) {
				for ( var chB of playerGroup ) {
					if ( chA != chB ) {
						gC(chA).relations[chB].sexualTension.stv += 350;
						gC(chA).relations[chB].romance.stv += 150;
						gC(chA).relations[chB].friendship.stv += 150;
					}
				}
			}
		}
	}
}
window.finishTributeForTheGoddess = function() {
	// If Sillan is a guest, create companionship relationship between Sillan and Valtan
	if ( getGuestsList().includes("chSil") ) {
		createRelTypeCompanionship("chSil","chVal",10);
		createRelTypeCompanionship("chVal","chSil",10);
	}
	if ( isStVarOn("GcEndA") ) {
		trainingResultsModifier += 1.5;
	} else {
		trainingResultsModifier += 1.4;
	}
}

window.initializeSacrificeOfAether = function() {
	State.variables.StVars.check1 = gSettings().lewdMales == "enable";
	State.variables.StVars.check2 = ( gSettings().futa == "enableAll" || gSettings().futa == "playerFuta" || gSettings().futa == "futaPartners" );
	State.variables.StVars.check3 = State.variables.chPlayerCharacter.name;
	State.variables.StVars.check4 = State.variables.chPlayerCharacter.avatar;
	State.variables.StVars.check5 = State.variables.chPlayerCharacter.avatarL;
	State.variables.StVars.check6 = State.variables.chPlayerCharacter.nameColor;
	
	State.variables.chPlayerCharacter.name = "???";
	State.variables.chPlayerCharacter.nameColor = "gray";
	State.variables.chPlayerCharacter.avatar = function() {
		return "[img[img/portraits/unknown-avatar.png]]";
	};
	State.variables.chPlayerCharacter.avatarL = "img/portraits/unknown-avatar.png";
}
window.finishSacrificeOfAether = function() {
	State.variables.chPlayerCharacter.name = State.variables.StVars.check3;
	State.variables.chPlayerCharacter.avatar = State.variables.StVars.check4;
	State.variables.chPlayerCharacter.avatarL = State.variables.StVars.check5;
	State.variables.chPlayerCharacter.nameColor = State.variables.StVars.check6;
}

window.initializeSeSharingTheNight = function() {
	var chosenCandidate = "chNash";
	var highestScore = -1;
	for ( var cK of ["chNash","chMir","chVal","chClaw","chAte"] ) {
		var relPoints = rLvlAbt(cK,"chPlayerCharacter","romance") * 3 + rLvlAbt(cK,"chPlayerCharacter","sexualTension") * 3 - rLvlAbt(cK,"chPlayerCharacter","rivalry") * 2 - rLvlAbt(cK,"chPlayerCharacter","enmity") * 5;
		if ( relPoints > highestScore ) {
			highestScore = relPoints;
			chosenCandidate = cK;
		}
	}
	State.variables.StVars.check1 = chosenCandidate;
	if ( chosenCandidate == "chVal" ) {
		if ( isStVarOn("GcEndC") == false ) {
			State.variables.StVars.check1 = "chSil";
		}
	}
	State.variables.StVars.check2 = (gCstat("chPlayerCharacter","empathy") + gCstat("chPlayerCharacter","perception")) >= 26;
	
	addToStVarsList("ShTNgt");
	State.variables.StVars.check9 = charactersLearnSceneActions(["chPlayerCharacter"],["holdHands"]);
	if ( State.variables.StVars.check9 != "" ) { State.variables.StVars.check9 += "\n"; }
	State.variables.StVars.check9 += colorText("It is now possible to invite other characters to spend the night together.\nIt is now possible to initiate 'intimate' special relationships.","khaki");
	
	if ( chosenCandidate == "chNash" ) { // Checks Nashillbyir
		var relBalance = ( 1 + rLvlAbt("chPlayerCharacter","chNash","domination") + rLvlAbt("chNash","chPlayerCharacter","submission") ) / ( 1 + rLvlAbt("chPlayerCharacter","chNash","submission") + rLvlAbt("chNash","chPlayerCharacter","domination") );
		// Allowed ega
		if ( relBalance >= 0.65 ) {
			State.variables.StVars.check3 = true;
			// Allowed dom
			if ( relBalance >= 1.5 ) {
				State.variables.StVars.check4 = true;
			} else {
				State.variables.StVars.check4 = false;
			}
		} else {
			State.variables.StVars.check3 = false;
			State.variables.StVars.check4 = false;
		}
	} else if ( chosenCandidate == "chMir" ) { // Checks Padmiri
		var relBalance = ( 1 + rLvlAbt("chPlayerCharacter","chMir","domination") + rLvlAbt("chMir","chPlayerCharacter","submission") ) / ( 1 + rLvlAbt("chPlayerCharacter","chMir","submission") + rLvlAbt("chMir","chPlayerCharacter","domination") );
		// Allowed ega
		if ( relBalance >= 1.5 ) {
			State.variables.StVars.check4 = true;
		} else {
			State.variables.StVars.check4 = false;
		}
	} else if ( chosenCandidate == "chVal" ) { // Checks Valtan
		State.variables.StVars.check3 = false;
		State.variables.StVars.check3 = (gCstat("chPlayerCharacter","intelligence") + gCstat("chPlayerCharacter","empathy") + gCstat("chPlayerCharacter","perception")) >= 40;
	} else if ( chosenCandidate == "chSil" ) { // Checks Valtan + Sillan
		State.variables.StVars.check3 = false;
		State.variables.StVars.check3 = (gCstat("chPlayerCharacter","intelligence") + gCstat("chPlayerCharacter","empathy") + gCstat("chPlayerCharacter","perception")) >= 40;
	} else if ( chosenCandidate == "chClaw" ) { // Checks Claw
		var relBalance = ( 1 + rLvlAbt("chPlayerCharacter","chClaw","domination") + rLvlAbt("chClaw","chPlayerCharacter","submission") ) / ( 1 + rLvlAbt("chPlayerCharacter","chClaw","submission") + rLvlAbt("chClaw","chPlayerCharacter","domination") );
		// Allowed ega
		if ( relBalance >= 1.5 ) {
			State.variables.StVars.check4 = true;
		} else {
			State.variables.StVars.check4 = false;
		}
	} else if ( chosenCandidate == "chAte" ) { // Checks Ate
		var relBalance = ( 1 + rLvlAbt("chPlayerCharacter","chAte","domination") + rLvlAbt("chAte","chPlayerCharacter","submission") ) / ( 1 + rLvlAbt("chPlayerCharacter","chAte","submission") + rLvlAbt("chAte","chPlayerCharacter","domination") );
		// Sex turns dom
		if ( relBalance >= 1.5 ) {
			State.variables.StVars.check4 = true;
		} else {
			State.variables.StVars.check4 = false;
		}
	}

}



