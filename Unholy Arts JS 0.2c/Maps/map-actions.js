// TRAINING MAP ACTIONS //

// Auxiliar

// Actions
	// Scrolls
window.createSystemEventSearchForScrolls = function(minutes,characters) {
	var sEvent = new systemEvent(10,characters,"searchForScrolls","Searching for scrolls",function(cList) {
		var eventResults = "";
		if ( cList.length > 0 ) {
		
			// Get potential scrolls
			var availableScrolls = getScrollsCharMayFind(cList[0]);
			var newScrollsI = availableScrolls.length; // Amount of new scrolls to find
			if ( newScrollsI > 3 ) { newScrollsI = 3; }
			
			// Form weighted list
			var wList = new weightedList();
			for ( var scr of availableScrolls ) {
				wList[scr] = new weightedElement(scr,State.variables.scrollsList[scr].getWeight());
			}
		
			// Get found scrolls
			var foundScrolls = [];
			var s = "";
			while ( newScrollsI > 0 ) {
				s = randomFromWeightedList(wList);
				foundScrolls.push(s);
				delete wList[s];
				newScrollsI--;
			}
			
			// Add scrolls to characters' found scrolls
			for ( var scr of foundScrolls ) {
				for ( var character of characters ) {
					if ( gC(character).foundScrolls.includes(scr) == false ) {
						gC(character).foundScrolls.push(scr);
					}
				}
			}	
		
			// Message
			var eventResults = "";
			var scrollsTitles = [];
			for ( var scr of foundScrolls ) {
				scrollsTitles.push(State.variables.scrollsList[scr].title);
			}
			eventResults += stringArrayToText(scrollsTitles) + " were found.\n\n";
		}
			
			return eventResults;
		}
	);
	sEvent.flagMayBeInterrupted = false;
	sEvent.applyEffectIfForcedToEnd = false;
	return sEvent;
}
window.createSearchForScrollsAction = function() {
	var action = new mapAction("searchForScrolls","Search for new scrolls",createSystemEventSearchForScrolls,false);
	action.description = "The characters will look for useful, unread scrolls around the library.";
	action.tags.push("scrolls","searchScrolls");
	action.recMins = 10;
	return action;
}

window.createStyduRandomScrollMapAction = function() { // Only for NPCs
	var action = new mapAction("studyScroll","Study a random scroll",createSystemEventStudyRandomScroll,false);
	action.description = "Map action for Candidate NPCs. They will study a randomly selected scroll.";
	action.tags.push("scrolls","studyScroll");
	action.recMins = 30;
	action.flexibleTimes = false;
	return action;
}

window.createSystemEventStudyRandomScroll = function(minutes,characters) {
	var sEvent = new systemEvent(30,characters,"studyScroll","Studying a scroll",function(cList) {
		var eventMsg = "";
		if ( cList.length > 0 ) {
			var validScrolls = []; // Select potentially valid scrolls
			for ( var scr of gC(characters[0]).foundScrolls ) {
				if ( gC(characters[0]).studiedScrolls.includes(scr) == false ) {
					validScrolls.push(scr);
				}
			}
			var scrollKey = randomFromList(validScrolls);
			
			var nCharacters = [];
			for ( var character of characters ) { // Select valid characters
				if ( gC(character).studiedScrolls.includes(scrollKey) == false ) {
					nCharacters.push(character);
					gC(character).studiedScrolls.push(scrollKey);
				}
			}
			reorderCharactersStudiedScrolls(characters); // Variable cleaning
			for ( var character of nCharacters ) { gC(character).studiedScrollToday = true; } // Set studied today flag
			
			var eventMsg = State.variables.scrollsList[scrollKey].firstTimeEffect(nCharacters) // Effect and results message
						 + "\n__" + State.variables.scrollsList[scrollKey].title + "__:\n\n"
						 + State.variables.scrollsList[scrollKey].getContent() + "\n\n";
			return eventMsg;
		}
		}
	);
	sEvent.flagMayBeInterrupted = false;
	sEvent.applyEffectIfForcedToEnd = false;
	return sEvent;
}
window.createSystemEventStudySpecificScroll = function(characters,scrollKey) {
	var sEvent = new systemEvent(30,characters,"studyScroll","Studying a scroll",function(cList) {
			var nCharacters = []; // Select valid characters
			for ( var character of cList ) {
				if ( gC(character).studiedScrolls.includes(scrollKey) == false ) {
					nCharacters.push(character);
					gC(character).studiedScrolls.push(scrollKey);
				}
			}
			reorderCharactersStudiedScrolls(cList); // Variable cleaning
			for ( var character of nCharacters ) { gC(character).studiedScrollToday = true; } // Set studied today flag
			
			var eventMsg = State.variables.scrollsList[scrollKey].firstTimeEffect(nCharacters) // Effect and results message
						 + "\n__" + State.variables.scrollsList[scrollKey].title + "__:\n\n"
						 + State.variables.scrollsList[scrollKey].getContent() + "\n\n";
			return eventMsg;
		}
	);
	sEvent.flagMayBeInterrupted = false;
	sEvent.applyEffectIfForcedToEnd = false;
	return sEvent;
}

window.getButtonMapMenuSelectScroll = function() {
	var bText = "<<l" + "ink [[Pick|Map]]>><<s" + "cript>>\n";
		bText 	 += "State.variables.compass.flagMenuInMap = true;\n";
		bText 	 += "formatPassageMenuSelectScroll();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
window.formatPassageMenuSelectScroll = function() {
	var passageText = "__Pick a scroll__:\n";
	for ( var scr of gC("chPlayerCharacter").foundScrolls ) {
		if ( gC("chPlayerCharacter").studiedScrolls.includes(scr) == false ) {
			// Command to start study specific scroll event
			passageText += "- " + '<<link [[' + State.variables.scrollsList[scr].title + '|Interlude]]>><<script>>'
						 + 'State.variables.compass.ongoingEvents.push(createSystemEventStudySpecificScroll(getPlayerCharsGroup(),"' + scr + '"));\n'
						 + 'State.variables.compass.sortOnGoingEventsByTime();\n'
						 + 'signCharsActive(getPlayerCharsGroup());\n'
						 + 'State.variables.compass.flagMenuInMap = false;\n'
						 + 'State.variables.compass.mapMenuPassage = "";\n'
						 + 'State.variables.compass.pushAllTimeToAdvance();'
						 + '<</' + 'script>><</' + 'link>> - ' + getScrollTypeText(State.variables.scrollsList[scr]) + '\n';
		}
	}
	passageText += "\n" + getButtonExitMapMenu();
	State.variables.compass.mapMenuPassage = passageText;
}
window.getButtonExitMapMenu = function() {
	var bText = "<<l" + "ink [[Exit Menu|Map]]>><<s" + "cript>>\n";
		bText 	 += "State.variables.compass.flagMenuInMap = false;\n";
		bText 	 += "State.variables.compass.mapMenuPassage = '';\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;	
}


	// SIS
window.createSystemEventSisRound = function(characters,sisKey) {
	var sEvent = new systemEvent(5,characters,"sisRound","Social Interactions Round",function(cList) {
			State.variables.compass.sisList[this.sisKey].processRound();
			if ( State.variables.compass.sisList[this.sisKey].charList.includes("chPlayerCharacter") ) {
				State.variables.compass.sisList[this.sisKey].preInitiateNewRoundWithPC();
			} else {
				State.variables.compass.sisList[this.sisKey].preInitiateNewRoundNoPC();
			}
		}
	);
	sEvent.createdAtMin = State.variables.daycycle.minutes;
	sEvent.sisKey = sisKey;
	sEvent.flagMayBeInterrupted = true;
	sEvent.applyEffectIfForcedToEnd = false;
	sEvent.flagSignCharsAsIdleOnEnd = false;
	sEvent.flagDontPushTimeYet = true;
	return sEvent;
}

	// Scenes
window.createSystemEventScene = function(characters,minutes,label) {
	var sEvent = new systemEvent(minutes,characters,"scene","Scene",function(cList) {
		}
	);
	sEvent.flagMayBeInterrupted = false;
	sEvent.flagMayChangeGroups = false;
	sEvent.label = label;
	return sEvent;
}
window.createSystemEventStandardSexScene = function(characters) {
	var sEvent = new systemEvent(20,characters,"scene","Scene",function(cList) {
		}
	);
	sEvent.flagMayBeInterrupted = false;
	sEvent.flagMayChangeGroups = false;
	sEvent.label = "sexScene";
	return sEvent;
}

window.createSystemEventBattle = function(charactersTeamA,charactersTeamB,spectators,minutes,label) {
	var allChars = charactersTeamA.concat(charactersTeamB.concat(spectators));
	var sEvent = new systemEvent(minutes,characters,"battle","Battle",function(cList) {
			var desc = getRoomA(gC(this.characters[0]).currentRoom).description;
			State.variables.sc.startScene("bs","none",this.charactersTeamA,this.charactersTeamB,desc,endConditionStandardBattle,0,"Map");
			for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
				if ( charKey != "chPlayerCharacter" ) {
					gC(charKey).aiAlgorythm = createAiRandomActionRandomOpponent();
				}
			}
			if ( this.characters.includes("chPlayerCharacter") == false ) {
				State.variables.sc.autoResolveScene();
			}
		}
	);
	sEvent.charactersTeamA = charactersTeamA;
	sEvent.charactersTeamB = charactersTeamB;
	sEvent.spectators = spectators;
	sEvent.flagMayBeInterrupted = false;
	sEvent.flagMayChangeGroups = false;
	sEvent.label = label;
	return sEvent;
}
window.createSystemEventStandardAssault = function(charactersTeamA,charactersTeamB,spectators) {
	var allChars = charactersTeamA.concat(charactersTeamB.concat(spectators));
	var characters = allChars;
	var sEvent = new systemEvent(20,characters,"battle","Battle",function(cList) {
			var desc = getRoomA(gC(this.characters[0]).currentRoom).description;
			State.variables.sc.startScene("bs","none",this.charactersTeamA,this.charactersTeamB,desc,endConditionStandardBattle,0,"Scene Results"); // Start scene
			State.variables.sc.setBattleParameters(3,this.charactersTeamA[0],this.charactersTeamB[0]); // Battle parameters
			State.variables.sc.endSceneScript = processGenericMapBattleEffects; // Set generic battle effects
			for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
				if ( charKey != "chPlayerCharacter" ) {
					gC(charKey).aiAlgorythm = createAiRandomActionRandomOpponent();
				}
			}
			if ( this.characters.includes("chPlayerCharacter") == false ) {
				State.variables.sc.autoResolveScene();
			}
		}
	);
	sEvent.charactersTeamA = charactersTeamA;
	sEvent.charactersTeamB = charactersTeamB;
	sEvent.spectators = spectators;
	sEvent.flagMayBeInterrupted = false;
	sEvent.flagMayChangeGroups = false;
	sEvent.label = "assault";
	return sEvent;
}
window.createSystemEventStandardChallenge = function(charactersTeamA,charactersTeamB,spectators,stakes) {
	var allChars = charactersTeamA.concat(charactersTeamB.concat(spectators));
	var characters = allChars;
	var sEvent = new systemEvent(20,characters,"battle","Battle",function(cList) {
			var desc = getRoomA(gC(this.characters[0]).currentRoom).description;
			State.variables.sc.startScene("bs","none",this.charactersTeamA,this.charactersTeamB,desc,endConditionStandardBattle,0,"Scene Results"); // Start scene
			State.variables.sc.setBattleParameters(stakes,this.charactersTeamA[0],this.charactersTeamB[0]); // Battle parameters
			State.variables.sc.endSceneScript = processGenericMapBattleEffects; // Set generic battle effects
			for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
				if ( charKey != "chPlayerCharacter" ) {
					gC(charKey).aiAlgorythm = createAiRandomActionRandomOpponent();
				}
			}
			if ( this.characters.includes("chPlayerCharacter") == false ) {
				State.variables.sc.autoResolveScene();
			}
		}
	);
	sEvent.charactersTeamA = charactersTeamA;
	sEvent.charactersTeamB = charactersTeamB;
	sEvent.spectators = spectators;
	sEvent.flagMayBeInterrupted = false;
	sEvent.flagMayChangeGroups = false;
	sEvent.label = "challenge";
	return sEvent;
}

