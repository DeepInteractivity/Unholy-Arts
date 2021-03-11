////////// SCENARIO FUNCTIONS //////////
// These functions initialize map with the appropiate characters and assigns correct AIs to them.

// OBSOLETE //
window.initStandardTrainingGrounds = function() {
	State.variables.compass.initializeMap("mapTrainingGrounds","westLibrary");
	var chars = getCandidatesKeysArray();
	State.variables.mapTrainingGrounds.placeCharacters(chars,"westLibrary");
	
	for ( var charKey of chars ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).mapAi.type = "balancedTraining";
			gC(charKey).mapAi.createNewMission = cMissionBalancedRandomTrain;
		}
	}
}
//          //

window.initTrainingPeriodPassionTemple = function() {
	
	// Place Candidates on map
	State.variables.compass.initializeMap("mapTrainingGrounds","grandHall");
	var chars = getRandomizedCandidatesKeysArray();
	State.variables.mapTrainingGrounds.placeCharacters(chars,"grandHall");
	
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
	var chars = getRandomizedCandidatesKeysArray();
	State.variables.mapTrainingGrounds.placeCharacters(chars,"grandHall");
	
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
	State.variables.mapTrainingGrounds.placeCharacters(chars,"westLibrary");
	
	// Stablish period type
	State.variables.simCycPar.templeDayPeriod = "training";
	
	// Extra
	State.variables.chVal.willpower.current = 20;
	State.variables.chNash.willpower.current = 20;
	State.variables.chNash.energy.current = 20;
	State.variables.chNash.socialdrive.current = 20;
	
	State.variables.compass.moveCharsToRoom(["chVal"],"publicBaths");
	
	// Assign AIs
	for ( var charKey of chars ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).mapAi.type = "balancedTraining";
			gC(charKey).mapAi.createNewMission = cMissionBalancedRandomTrain;
			gC(charKey).mapAi.state = "idle";
			gC(charKey).mapAi.goalsList = [];
		}
	}
	
	State.variables.compass.allCharsCheckMapAi();
	
	// Set period variables
	State.variables.simCycPar.trainingResultsBase = 3.0; // Training is 3 times as effective
	
	// Stablish period duration
	var periodMins = State.variables.simCycPar.templeTrainingHours * 60;
	State.variables.compass.ongoingEvents.push(createTrainingEndEvent(periodMins));
	State.variables.compass.periodEndsTip = getRelativeTimeString(periodMins);
	
	State.variables.compass.sortOnGoingEventsByTime();
}


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
/*
	createRelTypeTutorshipSub("chPlayerCharacter","chMir",3);
	createRelTypeTutorshipDom("chMir","chPlayerCharacter",3);
	*/
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
	
	gC("chNash").mapAi.state = "idle";
	gC("chNash").mapAi.type = "balancedTraining";
	// gC("chNash").mapAi.createNewMission = cMissionPursueAndTalkTo("chNash","chMir");
	//gC("chNash").mapAi.goalsList = [ cMissionPursueAndTalkTo("chNash","chMir",1) ];
	
	gC("chMir").mapAi.goalsList = [ createMapAiGoalMoveTo("chMir","mainLibrary") , createMapAiGoalMoveTo("chMir","westLibrary") ];
	gC("chVal").mapAi.goalsList = [ createMapAiGoalMoveTo("chVal","mainLibrary") , createMapAiGoalMoveTo("chVal","westLibrary") , createMapAiGoalPursueAndAssault("chVal","chMir") ];
	// gC("chVal").mapAi.goalsList = [ createMapAiGoalMoveTo("chVal","mainLibrary") , createMapAiGoalMoveTo("chVal","westLibrary") , createMapAiGoalPursueAndChallenge("chVal","chMir") ];
	gC("chNash").mapAi.goalsList = [ createMapAiGoalMoveTo("chNash","mainLibrary") , createMapAiGoalMoveTo("chNash","eastLibrary") ,
									 createMapAiGoalMoveTo("chNash","westLibrary") , createMapAiGoalMoveTo("chNash","eastLibrary") ];
	
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
		
	// State.variables.compass.allCharsCheckMapAi();
	
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
	
	createRelTypeCompanionship("chPlayerCharacter","chMir");
	createRelTypeCompanionship("chMir","chPlayerCharacter");
}


window.initFakePeriodPassionTemple = function() {
	// Fake training period
	// Place Candidates on map
	State.variables.compass.initializeMap("mapTrainingGrounds","westLibrary");
	var chars = getCandidatesKeysArray();
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
	
	State.variables.compass.allCharsCheckMapAi();
	
	// Set period variables
	State.variables.simCycPar.trainingResultsBase = 3.0; // Training has enhanced effectiveness
	
	// Stablish period duration
	var periodMins = State.variables.simCycPar.templeTrainingHours * 60;
	State.variables.compass.ongoingEvents.push(createFakePeriodEndEvent(periodMins));
	State.variables.compass.periodEndsTip = getRelativeTimeString(periodMins);
	
	State.variables.compass.sortOnGoingEventsByTime();
	State.variables.compass.timeToAdvance = periodMins;
	State.variables.compass.pushAllTimeToAdvance();
	// Fake socialization period
	// Place Candidates on map
	State.variables.compass.initializeMap("mapTrainingGrounds","westLibrary");
	var chars = getCandidatesKeysArray();
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
	
	State.variables.compass.allCharsCheckMapAi();
	
	// Set period variables
	State.variables.simCycPar.trainingResultsBase = 1.0; // Training has enhanced effectiveness
	
	// Stablish period duration
	var periodMins = State.variables.simCycPar.templeTrainingHours * 60;
	State.variables.compass.ongoingEvents.push(createFakePeriodEndEvent(periodMins));
	State.variables.compass.periodEndsTip = getRelativeTimeString(periodMins);
	
	State.variables.compass.sortOnGoingEventsByTime();
	State.variables.compass.timeToAdvance = periodMins;
	State.variables.compass.pushAllTimeToAdvance();
	
		spawnMerchants();
		npcsBuyItems();
		npcsEquipBondage();
	State.variables.personalRoom.endDayEffects();
	State.variables.personalRoom.endDayRelationMoodEffects();
}
window.initFakePeriodPassionTempleXtimes = function(times) {
	try {
	var i = 0;
	while ( i < times ) {
		i++;
		initFakePeriodPassionTemple();
	}
	} catch(e) {
		State.variables.logL2.errorLog = e.message;
	}
	// Logging
	var statsData = "";
	var drivesData = "";
	var meritData = "";
	var statsTotal = 0;
	for ( var cd of getCandidatesKeysArray() ) {
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
	State.variables.logL1.statsData = statsData;
	State.variables.logL1.drivesData = drivesData;
	State.variables.logL1.meritData = meritData;
}


