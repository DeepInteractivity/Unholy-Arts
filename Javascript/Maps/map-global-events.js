// GLOBAL MAP EVENTS //

window.createTrainingEndEvent = function(minutes) {
	var sEvent = new systemEvent(minutes,["chDummy"],"scenarioEnd","End of training",function(cList) {
			// Finish map period
			State.variables.compass.finishMapSimulation();
			
			// Initialize Jobs
			State.variables.jobsAssigner.initJobsAssigner();
			
			// UI
			State.variables.compass.scenarioEndPassage = "The training period is over. The Candidates will now reunite to pick today's jobs.\n\n"
													   + "[[Continue|Jobs Screen]]";
		}
	);
	sEvent.executeWithoutCharacters = true;
	return sEvent;
}

window.createSocializationEndEvent = function(minutes) {
	var sEvent = new systemEvent(minutes,["chDummy"],"scenarioEnd","End of training",function(cList) {
			State.variables.compass.finishMapSimulation();
			
			State.variables.compass.scenarioEndPassage = "The socialization period is over. The Candidates will now return to their rooms"
													   + " and end the day.\n\n"
													   + '<<' + 'link [[Continue|Personal Room]]>><<' + 'script>>'
													   + 'State.variables.personalRoom.initPersonalRoom();'
													   + '<</s' + 'cript>><</' + 'link>>';
		}
	);
	sEvent.executeWithoutCharacters = true;
	return sEvent;
}


window.createFakePeriodEndEvent = function(minutes) {
	var sEvent = new systemEvent(minutes,["chDummy"],"scenarioEnd","End of training",function(cList) {
			// Finish map period
			State.variables.compass.finishMapSimulation();
			
			// UI
			State.variables.compass.scenarioEndPassage = "The fake period is over. Going back to debug menu.\n\n"
													   + "[[Continue|Quickstarts]]";
		}
	);
	return sEvent;
}

