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
	State.variables.compass.initializeMap("mapTrainingGrounds","westLibrary");
	var chars = getCandidatesKeysArray();
	State.variables.mapTrainingGrounds.placeCharacters(chars,"westLibrary");
	
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
	
	State.variables.compass.sortOnGoingEventsByTime();
}


window.initSocializationPeriodPassionTemple = function() {
	
	// Place Candidates on map
	State.variables.compass.initializeMap("mapTrainingGrounds","grandHall");
	var chars = getCandidatesKeysArray();
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
	
	State.variables.compass.sortOnGoingEventsByTime();
}


window.initCommandTestsPeriodPassionTemple = function() {
	
	// Place Candidates on map
	State.variables.compass.initializeMap("mapTrainingGrounds","grandHall");
	var chars = ["chPlayerCharacter","chVal","chMir"];
	State.variables.mapTrainingGrounds.placeCharacters(["chMir","chPlayerCharacter","chVal"],"grandHall");
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
	
	//createRelTypeServitudeSub("chPlayerCharacter","chMir",3);
	//createRelTypeServitudeDom("chMir","chPlayerCharacter",3);
	//State.variables.chVal.infamy = 15;
	//State.variables.chMir.infamy = 15;
	
	gC("chVal").mapAi.type = "balancedTraining";
	gC("chVal").mapAi.createNewMission = cMissionPursueAndTalkTo;
	gC("chVal").mapAi.state = "idle";
	gC("chVal").mapAi.goalsList = [ createMapAiGoalMoveTo("chVal","mainLibrary") , createMapAiGoalPursueAndAssault("chVal","chMir") ];
	gC("chMir").mapAi.goalsList = [ createMapAiGoalMoveTo("chMir","roomsOuterSouth") , createMapAiGoalMoveTo("chMir","roomsInnerSouth") , createMapAiGoalMoveTo("chMir","mirRoom") , createMapAiGoalAction("chMir","mirRoom","standardRest",60) , createMapAiGoalAction("chMir","mirRoom","standardRest",60) ];
	
	//charFollowsChar("chPlayerCharacter","chVal",false);
	
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
	
	State.variables.compass.sortOnGoingEventsByTime();
}


window.initFakePeriodPassionTemple = function() {
	
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
	
	State.variables.compass.sortOnGoingEventsByTime();
	State.variables.compass.timeToAdvance = periodMins;
	State.variables.compass.pushAllTimeToAdvance();
	
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
		State.variables.logL2.push(e);
	}
}


