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




