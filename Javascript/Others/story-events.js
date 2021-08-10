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












