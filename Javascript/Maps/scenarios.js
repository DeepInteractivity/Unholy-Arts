////////// SCENARIO FUNCTIONS //////////
// These functions initialize map with the appropiate characters and assigns correct AIs to them.

// OBSOLETE //
window.initStandardTrainingGrounds = function() {
	State.variables.compass.initializeMap("mapTrainingGrounds","westLibrary");
	var chars = getActiveSimulationCharactersArray();
	State.variables.mapTrainingGrounds.placeCharacters(chars,"westLibrary");
	
	for ( var charKey of chars ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).mapAi.type = "balancedTraining";
			gC(charKey).mapAi.createNewMission = cMissionBalancedRandomTrain;
		}
	}
}
//          //

	// Passion Temple
window.initTrainingPeriodPassionTemple = function() {
	// Place Candidates on map
	State.variables.compass.initializeMap("mapTrainingGrounds","grandHall");
	var chars = getRandomizedActiveSimulationCharactersArray();
	chars = purgeGuestsNotAtTemple(chars);
	State.variables.mapTrainingGrounds.placeCharacters(chars,"grandHall");
	
	// Stablish period type
	State.variables.simCycPar.templeDayPeriod = "training";
	
	// Assign AIs
	for ( var charKey of chars ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).globalAi = createCandidateGlobalAi(charKey);
			gC(charKey).mapAi.type = "balancedTraining";
			gC(charKey).mapAi.createNewMission = cMissionBalancedRandomTrain;
			gC(charKey).mapAi.state = "idle";
			gC(charKey).mapAi.goalsList = [];
		}
	}
	
	State.variables.compass.allCharsCheckMapAi();
	
	// Set period variables
	State.variables.simCycPar.trainingResultsBase = 3.0; // Training has enhanced effectiveness
	
	// Stablish period duration
	var periodMins = State.variables.simCycPar.templeTrainingHours * 60;
	State.variables.compass.ongoingEvents.push(createTrainingEndEvent(periodMins));
	State.variables.compass.periodEndsTip = getRelativeTimeString(periodMins);
	
	State.variables.compass.sortOnGoingEventsByTime();
}

window.initSocializationPeriodPassionTemple = function() {
	
	// Place Candidates on map
	State.variables.compass.initializeMap("mapTrainingGrounds","grandHall");
	var chars = getRandomizedActiveSimulationCharactersArray();
	chars = purgeGuestsNotAtTemple(chars);
	State.variables.mapTrainingGrounds.placeCharacters(chars,"grandHall");
	
	// Stablish period type
	State.variables.simCycPar.templeDayPeriod = "socialization";
	
	// Assign AIs
	for ( var charKey of chars ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).globalAi = createCandidateGlobalAi(charKey);
			gC(charKey).mapAi.type = "balancedTraining";
			gC(charKey).mapAi.createNewMission = cMissionBalancedRandomTrain;
			gC(charKey).mapAi.state = "idle";
			gC(charKey).mapAi.goalsList = [];
		}
	}
	
	State.variables.compass.allCharsCheckMapAi();
	
	// Set period variables
	State.variables.simCycPar.trainingResultsBase = 1.0; // Training has usual effectiveness
	
	// Stablish period duration
	var periodMins = State.variables.simCycPar.templeSocializationHours * 60;
	State.variables.compass.ongoingEvents.push(createSocializationEndEvent(periodMins));
	State.variables.compass.periodEndsTip = getRelativeTimeString(periodMins);
	
	State.variables.compass.sortOnGoingEventsByTime();
}

window.initTrainingPeriodPassionTempleTests = function() {
	
	// Place Candidates on map
	State.variables.compass.initializeMap("mapTrainingGrounds","westLibrary");
	var chars = ["chPlayerCharacter","chNash","chVal"];
	chars = purgeGuestsNotAtTemple(chars);
	State.variables.mapTrainingGrounds.placeCharacters(chars,"westLibrary");
	
	// Stablish period type
	State.variables.simCycPar.templeDayPeriod = "socialization";
	
	// Extra
	//State.variables.chVal.willpower.current = 20;
	//State.variables.chNash.willpower.current = 20;
	//State.variables.chNash.energy.current = 20;
	//State.variables.chNash.socialdrive.current = 20;
	
	//State.variables.compass.moveCharsToRoom(["chVal"],"publicBaths");
	
	// Assign AIs
	for ( var charKey of chars ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).mapAi.type = "balancedTraining";
			gC(charKey).mapAi.createNewMission = cMissionBalancedRandomTrain;
			gC(charKey).mapAi.state = "idle";
			gC(charKey).mapAi.goalsList = [];
		}
	}
	
	// Set period variables
	//State.variables.simCycPar.trainingResultsBase = 3.0; // Training is 3 times as effective
	
	gC("chPlayerCharacter").relations.chVal.sexualTension.level = 3;
	gC("chPlayerCharacter").relations.chVal.romance.level = 3;
	gC("chPlayerCharacter").relations.chNash.sexualTension.level = 3;
	gC("chPlayerCharacter").relations.chNash.romance.level = 3;
	gC("chVal").relations.chPlayerCharacter.sexualTension.level = 3;
	gC("chVal").relations.chPlayerCharacter.romance.level = 3;
	gC("chVal").relations.chNash.sexualTension.level = 3;
	gC("chVal").relations.chNash.romance.level = 3;
	gC("chNash").relations.chPlayerCharacter.sexualTension.level = 3;
	gC("chNash").relations.chPlayerCharacter.romance.level = 3;
	gC("chNash").relations.chVal.sexualTension.level = 3;
	gC("chNash").relations.chVal.romance.level = 3;
	createRelTypeServitudeDom("chNash","chPlayerCharacter",3);
	createRelTypeServitudeSub("chPlayerCharacter","chNash",3);
	
	State.variables.compass.allCharsCheckMapAi();
	
	// Stablish period duration
	var periodMins = State.variables.simCycPar.templeTrainingHours * 60;
	State.variables.compass.ongoingEvents.push(createTrainingEndEvent(periodMins));
	State.variables.compass.periodEndsTip = getRelativeTimeString(periodMins);
	
	State.variables.compass.sortOnGoingEventsByTime();
}

window.purgeGuestsNotAtTemple = function(chars) {
	var charsAtTemple = [];
	for ( var ch of chars ) {
		if ( isCharAtTemple(ch) ) {
			charsAtTemple.push(ch);
		}
	}
	return charsAtTemple;
}

	// Gleaming Caverns
window.initAdventurePeriodGleamingCaverns = function() {
	// Initial settings
	State.variables.settings.followingAllowed = false;
	State.variables.settings.relationshipTypesAllowed = false;
	State.variables.settings.challengingAllowed = false;
	State.variables.settings.assaultingAllowed = false;
	State.variables.settings.talkingAllowed = false;
	
	// Place Characters on map
	State.variables.compass.initializeMap("mapGleamingCaverns","templeStorage");
	State.variables.mapGleamingCaverns.placeCharacters(["chHope","chRock","chArt"],"hiddenCamp");
	State.variables.mapGleamingCaverns.placeCharacters(["chMes"],"hiddenHut");	
	State.variables.mapGleamingCaverns.placeCharacters(["chVal"],"pondIllumination");	
	State.variables.mapGleamingCaverns.placeCharacters(["chSil"],"templeSanctum");	
	State.variables.mapGleamingCaverns.placeCharacters(["chPlayerCharacter","chNash","chMir","chClaw","chAte"],"templeStorage");
	setSubareaCaverns();
	if ( State.variables.daycycle.day == 29 ) {
		State.variables.mapGleamingCaverns.placeCharacters(["chNer"],"assembly");
		State.variables.compass.ongoingEvents.push(createAssemblyDiscussion());
	} else {
		State.variables.mapGleamingCaverns.placeCharacters(["chNer"],"templeShrine");
	}
	
	// Stablish period type
	State.variables.simCycPar.templeDayPeriod = "adventure";
	
	// Assign AIs
	for ( var charKey of ["chNash","chClaw","chMir","chAte","chVal"] ) {
		gC(charKey).globalAi = createCandidateGcAi(charKey);
		gC(charKey).mapAi.createNewMission = cMissionBalancedRandomTrain;
		gC(charKey).mapAi.type = "gcCandidate";
		gC(charKey).mapAi.state = "idle";
		gC(charKey).mapAi.goalsList = [];
	}
	gC("chVal").globalAi = createValGcAi("chVal");
	for ( var charKey of ["chArt","chHope","chRock","chNer","chSil","chMes"] ) {
		gC(charKey).globalAi = createCandidateGcAi(charKey);
		gC(charKey).mapAi.type = "static";
		gC(charKey).mapAi.goalsList = [];
	}
	
	State.variables.compass.allCharsCheckMapAi();
	
	// Set period variables
	State.variables.simCycPar.trainingResultsBase = 1.0; // Training has enhanced effectiveness
	
	// Stablish period duration
	var periodMins = 14 * 60;
	State.variables.compass.ongoingEvents.push(createAdventureEndEvent(periodMins));
	State.variables.compass.periodEndsTip = getRelativeTimeString(periodMins);
	
	State.variables.compass.sortOnGoingEventsByTime();
}

	// Tests
window.initCommandTestsPeriodPassionTemple = function() {
	
	// Place Candidates on map
	State.variables.compass.initializeMap("mapTrainingGrounds","grandHall");
	var chars = ["chPlayerCharacter","chNash","chVal","chMir"];
	State.variables.mapTrainingGrounds.placeCharacters(["chMir","chPlayerCharacter","chVal","chNash"],"grandHall");
	//State.variables.mapTrainingGrounds.placeCharacters(["chMir","chPlayerCharacter"],"mirRoom");
	
	// Stablish period type
	State.variables.simCycPar.templeDayPeriod = "socialization";
	
	// Assign AIs
	for ( var charKey of chars ) {
		if ( charKey != "chPlayerCharacter" /*&& charKey != "chVal"*/ ) {
			gC(charKey).mapAi.type = "balancedTraining";
			gC(charKey).mapAi.createNewMission = cMissionBalancedRandomTrain;
			gC(charKey).mapAi.state = "idle";
			gC(charKey).mapAi.goalsList = [];
		}
	}

	createRelTypeTutorshipSub("chNash","chMir",3);
	createRelTypeTutorshipDom("chMir","chNash",3);
	
	//State.variables.chVal.infamy = 15;
	//State.variables.chMir.infamy = 15;
/*	
	gC("chMir").mapAi.state = "idle";
	gC("chMir").mapAi.type = "balancedTraining";
	gC("chMir").mapAi.createNewMission = cMissionPursueAndTalkTo("chMir","chPlayerCharacter");
	
	gC("chVal").mapAi.state = "idle";
	gC("chVal").mapAi.type = "balancedTraining";
	gC("chVal").mapAi.goalsList = [ createMapAiGoalMoveTo("chVal","mainLibrary") , createMapAiGoalMoveTo("chVal","westLibrary") , createMapAiGoalPursueAndChallenge("chVal","chMir",1) ];
	
	gC("chNash").mapAi.state = "idle";
	gC("chNash").mapAi.type = "balancedTraining";
	gC("chNash").mapAi.goalsList = [ createMapAiGoalMoveTo("chNash","mainLibrary") , createMapAiGoalMoveTo("chVal","westLibrary") , createMapAiGoalPursueAndTalkTo("chNash","chMir",1) ];
*/
	
	gC("chNash").lust.current = 100;
	gC("chNash").mapAi.state = "idle";
	gC("chNash").mapAi.type = "balancedTraining";
	// gC("chNash").mapAi.createNewMission = cMissionPursueAndTalkTo("chNash","chMir");
	//gC("chNash").mapAi.goalsList = [ cMissionPursueAndTalkTo("chNash","chMir",1) ];
	
	gC("chMir").mapAi.goalsList = [ createMapAiGoalMoveTo("chMir","mainLibrary") , createMapAiGoalMoveTo("chMir","westLibrary") , createMapAiGoalPursueAndTalkTo("chMir","chPlayerCharacter") ];
	gC("chVal").mapAi.goalsList = [ createMapAiGoalMoveTo("chVal","mainLibrary") , createMapAiGoalMoveTo("chVal","eastLibrary") , createMapAiGoalMoveTo("chVal","westLibrary") , createMapAiGoalPursueAndTalkTo("chVal","chMir") ];
	// gC("chVal").mapAi.goalsList = [ createMapAiGoalMoveTo("chVal","mainLibrary") , createMapAiGoalMoveTo("chVal","westLibrary") , createMapAiGoalPursueAndChallenge("chVal","chMir") ];
	//gC("chNash").mapAi.goalsList = [ createMapAiGoalMoveTo("chNash","mainLibrary") , createMapAiGoalMoveTo("chNash","eastLibrary") ,
	//								 createMapAiGoalMoveTo("chNash","westLibrary") , createMapAiGoalPursueAndAssault("chNash","chPlayerCharacter") ];
	//gC("chNash").lust.current = 0;
	//charFollowsChar("chPlayerCharacter","chMir",false);
	
	/*
	gC("chVal").mapAi.type = "balancedTraining";
	gC("chVal").mapAi.createNewMission = cMissionPursueAndAssault;
	gC("chVal").mapAi.state = "idle";
	gC("chVal").mapAi.goalsList = [ createMapAiGoalPursueAndAssault("chVal","chMir") ];
	State.variables.chVal.lust.current = 100;
	State.variables.chPlayerCharacter.lust.current = 1;
	*/
	//getRelation("chPlayerCharacter","chVal").favor = 5;
	//npcProposalFollowMe("chVal","chPlayerCharacter");
		
	State.variables.compass.allCharsCheckMapAi();
	
	// Set period variables
	State.variables.simCycPar.trainingResultsBase = 1.0; // Training has usual effectiveness
	
	// Stablish period duration
	var periodMins = State.variables.simCycPar.templeSocializationHours * 60;
	State.variables.compass.ongoingEvents.push(createSocializationEndEvent(periodMins));
	State.variables.compass.periodEndsTip = getRelativeTimeString(periodMins);
	
	State.variables.compass.sortOnGoingEventsByTime();
	
	
	State.variables.chVal.relations.chPlayerCharacter.sexualTension.level = 100;
	State.variables.chNash.relations.chPlayerCharacter.romance.level = 20;
	
	gC("chNash").mood["dominant"] = 80;
	gC("chNash").mood["aroused"] = 80;
	gC("chNash").mood["flirty"] = 80;
	
	createRelTypeTutorshipSub("chPlayerCharacter","chMir");
	createRelTypeTutorshipDom("chMir","chPlayerCharacter");
	
	for ( var sEvent of State.variables.compass.ongoingEvents ) {
		if ( sEvent.title == "scenarioEnd" ) {
			sEvent.timeRemaining = 11;
		}
	}
}


window.initFakePeriodPassionTemple = function() {
	// Fake training period
//		State.variables.logL1.push("startTraining");
	// Place Candidates on map
	State.variables.compass.initializeMap("mapTrainingGrounds","westLibrary");
	var chars = getActiveSimulationCharactersArray();
	State.variables.mapTrainingGrounds.placeCharacters(["chNash","chMir","chAte","chClaw","chVal"],"westLibrary");
	
	// Stablish period type
	State.variables.simCycPar.templeDayPeriod = "training";
	
	// Assign AIs
	for ( var charKey of chars ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).mapAi.type = "balancedTraining";
			gC(charKey).mapAi.createNewMission = cMissionBalancedRandomTrain;
			gC(charKey).mapAi.state = "idle";
			gC(charKey).mapAi.goalsList = [];
		}
	}
	
//		State.variables.logL1.push("firstCheckingAi");
	State.variables.compass.allCharsCheckMapAi();
	
	// Set period variables
	State.variables.simCycPar.trainingResultsBase = 3.0; // Training has enhanced effectiveness
	
	// Stablish period duration
	var periodMins = State.variables.simCycPar.templeTrainingHours * 60;
	State.variables.compass.ongoingEvents.push(createFakePeriodEndEvent(periodMins));
	State.variables.compass.periodEndsTip = getRelativeTimeString(periodMins);
	
//		State.variables.logL1.push("startingEvents");
	State.variables.compass.sortOnGoingEventsByTime();
	State.variables.compass.timeToAdvance = periodMins;
	State.variables.compass.pushAllTimeToAdvance();
//		State.variables.logL1.push("finishedEvents");
	// Fake socialization period
//		State.variables.logL1.push("startingSocialization");
	// Place Candidates on map
	State.variables.compass.initializeMap("mapTrainingGrounds","westLibrary");
	var chars = getActiveSimulationCharactersArray();
	State.variables.mapTrainingGrounds.placeCharacters(["chNash","chMir","chAte","chClaw","chVal"],"westLibrary");
	
	// Stablish period type
	State.variables.simCycPar.templeDayPeriod = "socialization";
	
	// Assign AIs
	for ( var charKey of chars ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).mapAi.type = "balancedTraining";
			gC(charKey).mapAi.createNewMission = cMissionBalancedRandomTrain;
			gC(charKey).mapAi.state = "idle";
			gC(charKey).mapAi.goalsList = [];
		}
	}
	
//		State.variables.logL1.push("checkingAi");
	State.variables.compass.allCharsCheckMapAi();
	
	// Set period variables
	State.variables.simCycPar.trainingResultsBase = 1.0; // Training has enhanced effectiveness
	
	// Stablish period duration
	var periodMins = State.variables.simCycPar.templeTrainingHours * 60;
	State.variables.compass.ongoingEvents.push(createFakePeriodEndEvent(periodMins));
	State.variables.compass.periodEndsTip = getRelativeTimeString(periodMins);
	
//		State.variables.logL1.push("startingEvents");
	State.variables.compass.sortOnGoingEventsByTime();
	State.variables.compass.timeToAdvance = periodMins;
	State.variables.compass.pushAllTimeToAdvance();
//		State.variables.logL1.push("finishingEvents");
	
		spawnMerchants();
		npcsBuyItems();
		npcsEquipBondage();
//		State.variables.logL1.push("endDayEffects");
	State.variables.personalRoom.endDayEffects();
	State.variables.personalRoom.endDayRelationMoodEffects();
}
window.initFakePeriodPassionTempleXtimes = function(times) {
	gC("chClaw").addBodypart("dick","dick");
	gC("chAte").addBodypart("dick","dick");
	gC("chVal").addBodypart("dick","dick");
	gC("chClaw").baseMood.angry = 0;
	gC("chAte").baseMood.bored = 0;
	State.variables.enabledMerchants = [0,30];
	try {
	var i = 0;
	while ( i < times ) {
		//State.variables.logL1 = [];
		i++;
//		State.variables.logL1.push("fakePeriod");
//		State.variables.logL1.push(getActiveSimulationCharactersArray().length);
		initFakePeriodPassionTemple();
//		State.variables.logL1.push("perRoom");
//		State.variables.logL1.push(getActiveSimulationCharactersArray().length);
		State.variables.personalRoom.initPersonalRoom();
//		State.variables.logL1.push(getActiveSimulationCharactersArray().length);
		
//		State.variables.logL1.push("socPri");
//		State.variables.logL1.push(getActiveSimulationCharactersArray().length);
		// AI social priorities
		for ( var character of arrayMinusA(getActiveSimulationCharactersArray(),"chPlayerCharacter") ) {
			setSocialAiCandidateGoals(gC(character).socialAi);
		}
//		State.variables.logL1.push(getActiveSimulationCharactersArray().length);
		
//		State.variables.logL1.push("finishedDay");
//		State.variables.logL1.push(getActiveSimulationCharactersArray().length);
	}
	} catch(e) {
		State.variables.logL2.errorLog = e.message;
	}
	/*
	// Logging
	var statsData = "";
	var drivesData = "";
	var meritData = "";
	var statsTotal = 0;
	for ( var cd of getActiveSimulationCharactersArray() ) {
		if ( cd != "chPlayerCharacter" ) {
			statsData += cd + ": ";
			statsTotal = 0;
			drivesData += cd + ": ";
			meritData += cd + ": " + gC(cd).merit + " - - - ";
			for ( var st of getStatNamesArray() ) {
				statsData += gC(cd)[st].value + ",";
				statsTotal += gC(cd)[st].value;
			}
			statsData += " Total: " + statsTotal + "  ";
			for ( var dr of ["dImprovement","dPleasure","dLove","dCooperation","dDomination","dAmbition"] ) {
				drivesData += gC(cd)[dr].value.toFixed(0) + "," + gC(cd)[dr].level + " ; ";
			}
			statsData += " - - - ";
			drivesData += " - - - ";
		}
	}
	*/
}


window.testGleamingCaverns = function() {
	deinitMapTrainingGrounds();
	initMapGleamingCaverns();
	// Place characters on map
	State.variables.compass.initializeMap("mapGleamingCaverns","hiddenCamp");
	var chars = ["chPlayerCharacter","chNash","chClaw"]
	State.variables.mapGleamingCaverns.placeCharacters(chars,"hiddenCamp");
	
	// Assign AIs
	for ( var charKey of chars ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).mapAi.type = "balancedTraining";
			gC(charKey).mapAi.createNewMission = cMissionBalancedRandomTrain;
			gC(charKey).mapAi.state = "idle";
			gC(charKey).mapAi.goalsList = [];
		}
	}
	
	for ( var cK of ["chNash","chClaw"] ) {
		gC(cK).mapAi.goalsList = [ createMapAiGoalMoveTo(cK,"marshNP2") ];
		var i = 0;
		while ( i < 20 ) {
			gC(cK).mapAi.goalsList.push(createMapAiGoalMoveTo(cK,"marshNElake"),createMapAiGoalMoveTo(cK,"marshNWlake"));
			i++;
		}
	}
	
	State.variables.compass.allCharsCheckMapAi();
	
	// Stablish period duration
	var periodMins = 60 * 14;
	State.variables.compass.ongoingEvents.push(createTestMapEndEvent(periodMins));
	State.variables.compass.periodEndsTip = getRelativeTimeString(periodMins);
	
	State.variables.compass.sortOnGoingEventsByTime();
	setSubareaCaverns();
}


