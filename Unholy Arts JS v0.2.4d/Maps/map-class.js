
////////// Map functions //////////
	// Management / Info
window.getLinkToRoom = function(roomKey,message,distance) {
	var string = '<<link [[' + message + '|Map]]>><<script>>'
		   + 'State.variables.compass.playerMovesToRoom("' + roomKey + '",' + distance + ');'
		   + '<</' + 'script>><</' + 'link>>';
	return string;
}
window.getMap = function(mapKey) {
	return State.variables[mapKey];
}
window.getCurrentMap = function () {
	return State.variables[State.variables.compass.currentMap];
}
window.getCurrentRoom = function() {
	return State.variables[State.variables.compass.currentMap].rooms[State.variables.compass.currentRoom];
}
window.getRoomA = function(roomKey) { // Assumes the room's map is active
	return State.variables[State.variables.compass.currentMap].rooms[roomKey];
}
window.getRoomInMap = function(mapKey,roomKey) {
	return State.variables[mapKey].rooms[roomKey];
}
window.getCharsRoom = function(charKey) {
	return getRoomA(gC(charKey).currentRoom);
}

window.getEventsWherCharIsInvolved = function(character) {
	var events = [];
	for ( var sEvent of State.variables.compass.ongoingEvents ) {
		if ( sEvent.characters.includes(character) ) {
			events.push(sEvent);
		}
	}
	return events;
}
window.getCharsActiveEvent = function(character) {
	var tEvent = null;
	var events = getEventsWherCharIsInvolved(character);
	for ( var sEvent of events ) {
		if ( sEvent.flagForcedToEnd == false && tEvent == null ) {
			tEvent = sEvent;
		}
	}
	return tEvent;
}
window.mayCharBeInterrupted = function(character) {
	var flagMayBeInterrupted = true;
		var tEvent = getCharsActiveEvent(character);
		if ( tEvent ) {
			flagMayBeInterrupted = tEvent.flagMayBeInterrupted;
		}
	return flagMayBeInterrupted;
}

window.mayEventBeSpectated = function(sEvent) {
	var flag = false;
	if ( sEvent ) {
		if ( sEvent.title == "battle" || sEvent.title == "scene" ) {
			if ( sEvent.characters.includes("chPlayerCharacter") == false ) {
			// if ( sEvent.charactersTeamA.includes("chPlayerCharacter") == false && sEvent.charactersTeamB.includes("chPlayerCharacter") == false ) {
				flag = true;
			}
		}
	}
	return flag;
}

window.getSisCharIsIn = function(character) {
	var sisKey = State.variables.compass.findFirstSisIdInvolvingCharacter(character);
	return State.variables.compass.sisList[sisKey];
}

window.charLeavesAnySis = function(character) {
	var sisKey = State.variables.compass.findFirstSisIdInvolvingCharacter(character);
	if ( sisKey != -1 ) {
		State.variables.compass.sisList[sisKey].charLeavesSis(character);
	}
}

	// Create movement events
window.createSystemEventMovement = function(minutes, characters, roomKey) {
	var sEvent = new systemEvent(minutes,characters,"movement","Moving",function(cList) {
			State.variables.compass.moveCharsToRoom(cList,roomKey);
			
			var eventMsg = "Characters moved.";
			return eventMsg;
		}
	);
	sEvent.applyEffectIfForcedToEnd = false;
	sEvent.roomKey = roomKey;
	return sEvent;
}
window.createSystemEventMovementByConnection = function(connection, characters) {
	var mins = State.variables.compass.getStandardMovementTime(connection.distance,characters);
	return createSystemEventMovement(mins,characters,connection.loc);
}

	// Group management
State.variables.debugAlwaysAcceptSis = false;

window.eitherCreateSisOrRejectSis = function(targetChar) { // Function called when player attempts to talk to character	
														   // It either creates a SIS or communicates player that SIS was rejected
	var acceptedSis = doesTargetAcceptConversation("chPlayerCharacter",targetChar);
	var acceptedSisFlag = acceptedSis[0];
	
	if ( acceptedSisFlag || State.variables.debugAlwaysAcceptSis || getCharGroup(targetChar).includes("chPlayerCharacter") ) {	// Create Sis
		State.variables.compass.createNewSis(getCharGroup('chPlayerCharacter').concat(getCharGroup(targetChar)));
		State.variables.sisPlayerInfo.lastTarget = targetChar;
		State.variables.sisSpecifics.playerTarget = targetChar;
	}
	else {
		State.variables.compass.pcSis = -1;
		State.variables.sisPlayerInfo.flagRejectedSis = true;
		State.variables.sisPlayerInfo.rejectedSisPassage = "" + gC(targetChar).getFormattedName() + " rejected the conversation.\n"
				+ acceptedSis[1] // Info about why SIS was rejected
				+ colorText("\nTip: There are many reasons why a character may reject a conversation, but the most common include "
				+ "being angry or bored, having specific priorities, or wanting to make full use of the training period.\n\n","khaki")
				+ getButtonExitRejectedSis();
		State.variables.compass.sisPassage = State.variables.sisPlayerInfo.rejectedSisPassage;
	}
}
	
window.charBecomesFollower = function(charKey) {
	// Char's AI shuts down
	signCharsActive([charKey]);
	gC(charKey).mapAi.goalsList = [];
	// Char leaves current event
	var cEvent = State.variables.compass.findFirstEventInvolvingCharacter(charKey);
	if ( cEvent ) { // Not null -> Event exists
		cEvent.removeCharFromEvent(charKey); // Character leaves the event
	}
	// Char joins followed's event
	var nEvent = State.variables.compass.findFirstEventInvolvingCharacter(gC(charKey).followingTo);
	if ( nEvent ) {
		if ( nEvent.ongoingTime == 0 ) {
			nEvent.characters.push(charKey);
		}
	}
		
	// Char leaves SIS
	var cSisId = State.variables.compass.findFirstSisIdInvolvingCharacter(charKey);
	if ( cSisId != -1 ) {
		State.variables.compass.sisList[cSisId].charsLeaveSis([charKey]);
	}
	if ( charKey == "chPlayerCharacter" ) {
		State.variables.compass.pcSis = -1;
	}
}
window.charUnbecomesFollower = function(charKey) {
	signCharsIdle([charKey]);
}

window.charMayModifyGroup = function(charKey) {
	var flagMayModify = true;
	
	var eventsList = State.variables.compass.findAllEventsInvolvingCharacter(charKey);
	for ( var sEvent of eventsList ) {
		if ( sEvent.flagMayChangeGroups == false ) {
			flagMayModify = false;
		}
	}
	
	return flagMayModify;
}

window.playerJoinsTargetChar = function(charKey) {
	var sEvent = State.variables.compass.findFirstEventInvolvingCharacter(charKey); /*
	if ( sEvent ) {
		if ( sEvent.title == "movement" || sEvent.ongoingTime == 0 ) {
			sEvent.characters.push("chPlayerCharacter");
		}
	} */
}
window.playerLeavesTargetChar = function(charKey) {
	var sEvent = State.variables.compass.findFirstEventInvolvingCharacter(charKey);
	if ( sEvent ) {
		sEvent.removeCharFromEvent("chPlayerCharacter");
	}
}
window.playerJoinsFollowedSis = function() {
	var f = gC("chPlayerCharacter").followingTo;
	if ( f != "" ) {
		var sis = findFirstSisIdInvolvingCharacter(f);
		if ( sis != -1 ) {
			State.variables.compass.sisList[sis].charJoinsSis("chPlayerCharacter");
		}
	}
}

		// Auxiliar
window.charArefusesToFollowCharacterB = function(charA,charB) {
	var favor = rFavor(charA,charB);
	if ( favor > 0 ) {
		getRelation(charB,charA).enmity.stv += 150;
	}
}

	// Logic
window.willFirstEventFinishSooner = function(firstEvent,secondEvent) {
	var flag = false;
	if ( firstEvent.timeRemaining <= secondEvent.timeRemaining ) {
		flag = true;
	}
	return flag;
}

	// Logic/Engine
window.eventToPile = function(sEvent) {
	State.variables.compass.ongoingEvents.push(sEvent);
	State.variables.compass.sortOnGoingEventsByTime();
	signCharsActive(sEvent.characters);
}

window.signCharsIdle = function(characters) {
	for ( var character of characters ) {
		gC(character).mapAi.signIdle();
	}
}
window.signCharsActive = function(characters) {
	for ( var character of characters ) {
		gC(character).mapAi.signActive();
	}
}

	// Battles
window.initiatePlayerAssault = function(target) {
	// Infamy
	var infamy = getCharGroup("chPlayerCharacter").length * 5 / getCharGroup(target).length;
	gC("chPlayerCharacter").changeInfamy(infamy);
	// Initiate Battle
		// Event
	var allChars = getCharGroup("chPlayerCharacter").concat(getCharGroup(target));
	for ( var charKey of allChars ) {
		charLeavesAnySis(charKey);
		State.variables.compass.characterEventEndsPrematurely(charKey);
	}
	signCharsActive(allChars);
	State.variables.compass.ongoingEvents.push(createSystemEventStandardAssault(getCharGroup("chPlayerCharacter"),getCharGroup(target),[]));
	State.variables.compass.sortOnGoingEventsByTime();
	State.variables.compass.pushAllTimeToAdvance();
	
	// Message
	var iText = "You're assaulting " + getCharNames(getCharGroup(target)) + "!\n"
			  + "You have gained " + infamy.toFixed(1) + " infamy.\n"
			  + "[[Continue|Scene]]";
	State.variables.compass.setInterludeTrigger(iText);
}
window.initiateNpcAssault = function(actor,target) {
	if ( gC(actor).hasOwnProperty("globalAi") ) {
		if ( gC(actor).globalAi.hasOwnProperty("attackedToday") ) {
			gC(actor).globalAi.attackedToday = true;
		}
	}
	
	// Infamy
	var infamy = getCharGroup(actor).length * 5 / getCharGroup(target).length;
	gC(actor).changeInfamy(infamy);
	// Initiate Battle
		// Event
	var allChars = getCharGroup(actor).concat(getCharGroup(target));
	for ( var charKey of allChars ) {
		charLeavesAnySis(charKey);
		State.variables.compass.characterEventEndsPrematurely(charKey);
	}
	signCharsActive(allChars);
	State.variables.compass.ongoingEvents.push(createSystemEventStandardAssault(getCharGroup(actor),getCharGroup(target),[]));
	State.variables.compass.sortOnGoingEventsByTime();
	
	if ( allChars.includes("chPlayerCharacter") ) {
		State.variables.compass.timeToAdvance = 0;
	}
}

window.initiateLiberationChallenge = function(actor,target) {
	// Initiate Battle
		// Event
	var allChars = getCharGroup(target);
	var spectators = arrayMinusA(arrayMinusA(allChars,actor),target);
	for ( var charKey of allChars ) {
		charLeavesAnySis(charKey);
		State.variables.compass.characterEventEndsPrematurely(charKey);
	}
	signCharsActive(allChars);
	
	State.variables.compass.ongoingEvents.push(createSystemEventLiberationChallenge([actor],[target],spectators));
	State.variables.compass.sortOnGoingEventsByTime();
	
	if ( allChars.includes("chPlayerCharacter") ) {
		State.variables.compass.timeToAdvance = 0;
		State.variables.compass.pushAllTimeToAdvance();
	}
	
	if ( actor == "chPlayerCharacter" ) {
		var iText = "You're challenging " + getCharNames(getCharGroup(target)) + " to finish your relationship!\n"
				  + "[[Continue|Scene]]";
		State.variables.compass.setInterludeTrigger(iText);
	}
}

window.setUpPlayerChallengeOptions = function(target) {
	// Set up options
	var oText = "Challenge this character to a one on one battle.\nThe higher the stakes, the higher the demand the winner may make on the loser.\n\n";
	oText += "- <<l" + "ink [[Challenge for low stakes|Interlude]]>><<s" + "cript>>\n";
	oText += "processNpcChallengeResponse('" + target + "',1);\n";
	oText += "<</s" + "cript>><</l" + "ink>>\n";
	oText += "- <<l" + "ink [[Challenge for medium stakes|Interlude]]>><<s" + "cript>>\n";
	oText += "processNpcChallengeResponse('" + target + "',2);\n";
	oText += "<</s" + "cript>><</l" + "ink>>\n";
	oText += "- <<l" + "ink [[Challenge for high stakes|Interlude]]>><<s" + "cript>>\n";
	oText += "processNpcChallengeResponse('" + target + "',3);\n";
	oText += "<</s" + "cript>><</l" + "ink>>\n";
	oText += "- <<l" + "ink [[On a second thought, let's leave|Map]]>><<s" + "cript>>\n";
	oText += "<</s" + "cript>><</l" + "ink>>";			  
	
	State.variables.compass.setInterludeTrigger(oText);
}
window.processNpcChallengeResponse = function(target,stakes) {
	var flagAccepts = doesTargetAcceptChallenge("chPlayerCharacter",target,stakes);
	var msg = "";
		gC("chPlayerCharacter").changeInfamy(1);
	if ( flagAccepts ) {
		// Event
		var allChars = getCharGroup("chPlayerCharacter").concat(getCharGroup(target));
		var spectators = gC("chPlayerCharacter").followedBy.concat(gC(target).followedBy);
		for ( var charKey of allChars ) {
			charLeavesAnySis(charKey);
			State.variables.compass.characterEventEndsPrematurely(charKey);
		}
		signCharsActive(allChars);
		// Scene
		State.variables.compass.ongoingEvents.push(createSystemEventStandardChallenge(["chPlayerCharacter"],[target],spectators,stakes));
		State.variables.compass.sortOnGoingEventsByTime();
		State.variables.compass.pushAllTimeToAdvance();
		// Message
		msg = gC(target).getFormattedName() + " accepted the challenge! You gained 1 infamy.\n\n"
			+ "[[Continue|Scene]]";
	} else {
		gC("chPlayerCharacter").changeMerit(1);
		gC(target).changeMerit(-1);
		// Message
		msg = gC(target).getFormattedName() + " rejected the challenge. You gained 1 infamy. You took 1 merit from " + gC(target).comPr + ".\n\n"
			+ "[[Continue|Map]]";
	}
	
	State.variables.compass.setInterludeTrigger(msg);
}
window.initiateNpcToNpcChallenge = function(actor,target,stakes) {
	if ( gC(actor).hasOwnProperty("globalAi") ) {
		if ( gC(actor).globalAi.hasOwnProperty("attackedToday") ) {
			gC(actor).globalAi.attackedToday = true;
		}
	}
	var flagAccepts = doesTargetAcceptChallenge(actor,target,stakes);
	gC(actor).changeInfamy(1);
	if ( flagAccepts ) {
		// Event
		var allChars = getCharGroup(actor).concat(getCharGroup(target));
		var spectators = gC(actor).followedBy.concat(gC(target).followedBy);
		for ( var charKey of allChars ) {
			State.variables.compass.characterEventEndsPrematurely(charKey);
			charLeavesAnySis(charKey);
		}
	
		signCharsActive(allChars);
		// Scene
		State.variables.compass.ongoingEvents.push(createSystemEventStandardChallenge([actor],[target],spectators,stakes));
		State.variables.compass.sortOnGoingEventsByTime();
		if ( allChars.includes("chPlayerCharacter") == false ) {
			State.variables.compass.pushAllTimeToAdvance();
		}
	
	} else {
		gC(actor).changeMerit(1);
		gC(target).changeMerit(-1);
	}
	return flagAccepts;
}
window.initiateNpcToPlayerAcceptedChallenge = function(challenger,stakes) {
	var actor = challenger;
	if ( gC(actor).hasOwnProperty("globalAi") ) {
		if ( gC(actor).globalAi.hasOwnProperty("attackedToday") ) {
			gC(actor).globalAi.attackedToday = true;
		}
	}
	
	var target = "chPlayerCharacter";
	var allChars = getCharGroup(actor).concat(getCharGroup(target));
	var spectators = gC(actor).followedBy.concat(gC(target).followedBy);
	for ( var charKey of allChars ) {
		State.variables.compass.characterEventEndsPrematurely(charKey);
		charLeavesAnySis(charKey);
	}
	signCharsActive(allChars);
	// Scene
	State.variables.compass.ongoingEvents.push(createSystemEventStandardChallenge([actor],[target],spectators,stakes));
	State.variables.compass.sortOnGoingEventsByTime();
	State.variables.compass.pushAllTimeToAdvance();
}

window.addSpectatorsToBattle = function(battleEvent,spectatorCharactersList) {
	for ( var charKey of spectatorCharactersList ) {
		battleEvent.characters.push(charKey);
		battleEvent.spectators.push(charKey);
	}
}
window.addSpectatorsToCharsBattle = function(targetCharacter,spectatorCharactersList) {
	addSpectatorsToBattle(getCharsActiveEvent(targetCharacter),spectatorCharactersList);
}

////////// COMPASS CLASS  //////////
// Compass contains references to the current map in play and player's location.

///// HOW TO ADD NEW Events
// State.variables.compass.ongoingEvents.push(PUT EVENT HERE);
// State.variables.compass.sortOnGoingEventsByTime();
/////
// HOW TO ADD NEW Events FROM AN EVENT'S EFFECT

// DEBUG
State.variables.zFlagDbCp = true; // Set to true or false. Flag to debug compass

window.isMapSimActive = function() {
	var flagActive = false;
	if ( State.variables.compass.flagEndedScenario == false ) {
		flagActive = true;
	}
	return flagActive;
}

window.Compass = function() {
	this.currentMap = "none";
	this.currentRoom = "none";
	
	this.ongoingEvents = [];
	this.timeToAdvance = 0;
	
	this.flagEndedScenario = false;
	
	this.roomPassage = ""; // Information to be displayed at the "Map" passage, regarding information about the current room.
	this.interludePassage = ""; // Information to be displayed at the "Interlude" passage.
	this.sceneResultsPassage = "";
	this.sceneResultsTemp = "";
	this.scenarioEndPassage = "";
	
	this.roomMessage = "";
	
	this.sisList = new pseudoList();
	this.lastSisId = -1;
	this.pcSis = -1;
	this.sisPassage = "";
	
	this.executingEvents = false;
	
	///
	this.flagPlayerIsPrompted = false;
	this.promptPassage = "";
	this.promptSender = ""; // Character or entity sending the prompt
	this.isPrompterAchar = true; // Is the entity prompting the Player a NPC
	
	this.flagMenuInMap = false;
	this.mapMenuPassage = "";
	///
	
	this.flagAskedToSort = false; // Necessary due to instances in which events are sorted in the middle of pushAllTimeToAdvance
	
	this.periodEndsTip = "";
	
	// Management
	this.initializeMap = function(mapKey,roomKey) {
		this.currentMap = mapKey;
		this.currentRoom = roomKey;
		
		State.variables[State.variables.compass.currentMap].cleanCharacters();
		
		this.ongoingEvents = [];
		this.timeToAdvance = 0;
		
		this.flagEndedScenario = false;
		
		this.roomPassage = "";
		this.interludePassage = "";
		this.scenarioEndPassage = "";
		
		// Clean SIS
		this.lastSisId = -1;
		this.pcSis = -1;
		this.sisPassage = "";
		
		delete this.sisList;
		this.sisList = new pseudoList();
	}
	this.setCurrentRoom = function(roomKey) {
		this.currentRoom = roomKey;
	}
	this.getCurrentRoom = function() {
		return State.variables[this.currentMap].rooms[this.currentRoom];
	}
	
	this.createNewSis = function(charList) { 
		this.lastSisId++; // It will represent the new SIS ID until the end of this function
		var characters = removeDuplicatesFromList(charList);
		this.sisList[this.lastSisId] = new SocIntSys(this.lastSisId,characters);
		
		for ( var character of characters ) {
			this.characterEventEndsPrematurely(character);
			gC(character).mapAi.state = "active";
		}
		
		if ( this.sisList[this.lastSisId].charList.includes("chPlayerCharacter") ) {
			this.pcSis = this.lastSisId;
		} else {
			this.sisList[this.lastSisId].preInitiateNewRoundNoPC();
		}
	}
	
	this.finishMapSimulation = function() {
		this.flagEndedScenario = true;
		this.timeToAdvance = 0;
		// Break character groups
		for ( var charKey of getCurrentMap().characters ) {
			cleanCharGroup(charKey);
		}
		
		// Finish sis conversations
		for ( var sis in this.sisList ) {
			if ( this.sisList[sis] instanceof SocIntSys ) {
				if ( this.sisList[sis].charList.includes("chPlayerCharacter") == false ) {
					this.sisList[sis].remainingCharsLeaveSis();
				} else {
					for ( var chKey of this.sisList[sis].charList ) {
						if ( chKey != "chPlayerCharacter" ) {
							charLeavesAnySis(chKey);
						}
					}
				}
			}
		}
		
		// Finish events
		for ( var sEvent of this.ongoingEvents ) {
			 if ( sEvent.title != "scenarioEnd" ) { // scenarioEnd events call this event
				 sEvent.forceEnd();
			 }
		}
		
		// Clean AI memory
		for ( var charKey of getCurrentMap().characters ) {
			gC(charKey).mapAi.previousGoals = [];
		}
		
		// Clean messages
		this.roomMessage = "";
		
		// Clean scene
		State.variables.sc.cleanScene();
		
		// Clean others
		this.periodEndsTip = "";
		
		return true;
	}
	
		// External interruptions and calls to player
	this.interruptPlayer = function(promptText,promptSender,isPrompterAchar) {
		this.timeToAdvance = 0;
		this.setPlayerPrompt(promptText,promptSender,isPrompterAchar);
		// If player is in SIS -> Set prompt in SIS -> Otherwise set prompt in map
		this.interludePassage = promptText;
	}
	
	this.setPlayerPrompt = function(passageText,promptSender,isPrompterAchar) {
		this.flagPlayerIsPrompted = true;
		this.promptPassage = passageText;
		this.promptSender = promptSender;
		this.isPrompterAchar = isPrompterAchar;
		var playerSisId = this.getCharacterSisId("chPlayerCharacter");
		if ( playerSisId == -1 ) { // Set prompt in map
			this.interludePassage = passageText;
		} else { // Set prompt in SIS
			this.sisList[playerSisId].setSisPlayerPrompt(passageText);
			this.timeToAdvance = 0;
			// TO DO : Pause time
		}
	}
	this.finishPlayerPrompt = function() {
		this.flagPlayerIsPrompted = false;
		var playerSisId = this.getCharacterSisId("chPlayerCharacter");
		if ( playerSisId != -1 ) { // End Sis prompt
			this.sisList[playerSisId].endSisPlayerPrompt();
			this.pushTimerUntilPlayerIsDone();
		}
		this.promptPassage = "";
		// TO DO : Resume time
	}
	
		// Characters
	this.getPlayerGroupChars = function() {
		return getPlayerCharsGroup();
	}
	this.getCharactersGroup = function(character) {
		return getCharGroup(character);
	}
	
	this.wakeUpFakeActiveChars = function() {
		for ( var character of getCurrentMap().characters ) {
			if ( gC(character).mapAi.state == "active" ) {
				if ( character != "chPlayerCharacter" ) {
					var sEvent = this.findFirstEventInvolvingCharacter(character);
					if ( sEvent == null ) {
						gC(character).mapAi.signIdle();
					}
				}
			}
			gC(character).mapAi.main();
		}
	}
	this.allCharsCheckMapAi = function() {
		// Every character present in the map calls mapAi.main(), trying to reach new goals, creating new missions or staying quiet
		for ( var character of getCurrentMap().characters ) {
			gC(character).mapAi.main();
		}
	}
	
	this.moveCharToRoom = function(charKey,roomKey) {
		// Only changes variables, logic isn't involved
		var oldRoom = gC(charKey).currentRoom;
		var oldRoomCharList = arrayMinusA(getRoomA(oldRoom).characters,charKey);
		getRoomA(oldRoom).characters = oldRoomCharList;
		
		gC(charKey).currentRoom = roomKey;
		getRoomA(roomKey).characters.push(charKey);
		
		if ( charKey == "chPlayerCharacter" ) {
			this.setCurrentRoom(roomKey);
		}
	}
	this.moveCharsToRoom = function(charKeysList,roomKey) {
		// Only changes variables, logic isn't involved
		for ( var character of charKeysList ) {
			this.moveCharToRoom(character,roomKey);
		}
		if ( charKeysList.includes("chPlayerCharacter") ) {
			this.setCurrentRoom(roomKey);
		}
	}
	
	this.isCharacterInSis = function(charKey) {
		var flagInSis = false;
		for ( var sis in this.sisList ) {
			if ( this.sisList[sis] instanceof SocIntSys ) {
				if ( this.sisList[sis].charList.includes(charKey) ) {
					flagInSis = true;
				}
			}
		}
		return flagInSis;
	}
	this.getCharacterSisId = function(charKey) {
		var sisId = -1;
		var i = 0;
		for ( var sis in this.sisList ) {
			if ( this.sisList[sis] instanceof SocIntSys ) {
				if ( this.sisList[sis].charList.includes(charKey) ) {
					sisId = i;
				}
				i++;
			}
		}
		return sisId;
	}
	
		// Events
	this.sortOnGoingEventsByTime = function() {
		if ( this.ongoingEvents.length > 1 ) { // At least 2 events in pile
			var sortedList = this.ongoingEvents;
			for ( var i = this.ongoingEvents.length - 1 ; i > 0 ; i-- ) { // Almost all events are check from last to second
				for ( var l = i ; l > 0 ; l-- ) { // l runs through the events array and tries to push each element to the left if it will finish
												  // sooner than the other one
												  
					
					if ( willFirstEventFinishSooner(sortedList[l],sortedList[l-1]) ) {
						var tE = sortedList[l-1];
						sortedList[l-1] = sortedList[l];
						sortedList[l] = tE;
					}
				}
			}
			this.ongoingEvents = sortedList;
		}
		this.flagAskedToSort = true;
	}
	
	this.findFirstEventInvolvingPlayer = function() {
		var sEvent = null;
		var i = 0;
		while ( sEvent == null && i < this.ongoingEvents.length ) {
			if ( this.ongoingEvents[i].characters.includes("chPlayerCharacter") ) {
				sEvent = this.ongoingEvents[i];
			}
			i++;
		}
		return sEvent;
	}
	this.findLastEventInvolvingPlayer = function() {
		var sEvent = null;
		var maxTime = -1;
		for ( var gEvent of this.ongoingEvents ) {
			if ( gEvent.characters.includes("chPlayerCharacter") ) {
				if ( gEvent.timeRemaining > maxTime ) {
					sEvent = gEvent;
					maxTime = gEvent.timeRemaining;
				}
			}
		}
		return sEvent;
	}
	this.findFirstEventInvolvingCharacter = function(character) {
		var sEvent = null;
		var i = 0;
		while ( sEvent == null && i < this.ongoingEvents.length ) {
			if ( this.ongoingEvents[i].characters.includes(character) && this.ongoingEvents[i].flagForcedToEnd == false ) {
				sEvent = this.ongoingEvents[i];
			}
			i++;
		}
		return sEvent;
	}
	this.findAllEventsInvolvingCharacter = function(character) {
		var eventsList = [];
		for ( var sEvent of this.ongoingEvents ) {
			if ( sEvent.characters.includes(character) ) {
				eventsList.push(sEvent);
			}
		}
		return eventsList;
	}
	this.findFirstSisIdInvolvingCharacter = function(character) {
		var id = -1;
		for ( var sis in this.sisList ) {
			if ( this.sisList[sis] instanceof SocIntSys ) {
				if ( this.sisList[sis].charList.includes(character) ) {
					id = this.sisList[sis].key; 
				}
			}
		}
		return id;
	}
	
	this.pushTimerUntilPlayerIsDone = function() {
		var sEvent = this.findLastEventInvolvingPlayer();
		if ( sEvent != null ) {
			this.timeToAdvance = sEvent.timeRemaining;
		}
	}
	
	this.characterEventEndsPrematurely = function(character) {
		// Function called when external events force a character to leave their event
		//var newEventsList = [];
		
		for ( var sEvent of this.ongoingEvents ) {
			if ( sEvent.characters.includes(character) ) {
				sEvent.forceEnd();
			} else {
				//newEventsList.push(sEvent);
			}
		}
		
		//this.ongoingEvents = newEventsList;
	}
	
	// Logic
	this.getStandardMovementTime = function(distance,characterGroup) { // Calculates movement time in a given distance for a given character group.
		return distance;
	}
	this.charsMoveToRoom = function(characters,roomKey,distance) {
		var minutes = this.getStandardMovementTime(distance,characters);
		this.ongoingEvents.push(createSystemEventMovement(minutes,characters,roomKey));
		this.sortOnGoingEventsByTime();
		if ( characters.includes("chPlayerCharacter") ) {
			this.setCurrentRoom(roomKey);
		}
	}
	this.playerMovesToRoom = function(roomKey,distance) { // Moves the player's location in the map.
		var minutes = this.getStandardMovementTime(distance,this.getPlayerGroupChars());
		this.ongoingEvents.push(createSystemEventMovement(minutes,this.getPlayerGroupChars(),roomKey));
		this.sortOnGoingEventsByTime();
		this.pushAllTimeToAdvance();
		this.setCurrentRoom(roomKey);
	}
	
	this.pushTimeToOngoingEvents = function(minutes) {
		if ( this.ongoingEvents.length > 0 ) {
			var newList = [];
			for ( var sEvent of this.ongoingEvents ) {
				sEvent.flagDontPushTimeYet = false;
			}
			this.executingEvents = true; // Executing events and pushing time
			for ( var sEvent of this.ongoingEvents ) {
				if ( sEvent.pushTime(minutes) == false ) { // On true, event time reached 0 and it executes its effect
					newList.push(sEvent);
				}
				else {
					if ( State.variables.zFlagDbCp ) {
						this.debugInfo += this.debugFinishedEventInfo(sEvent) + "\n";
					}
				}
			}
			this.executingEvents = false; // Finished exeucuting events
			this.ongoingEvents = newList; // Only unfinished events are kept
			
			if ( this.flagAskedToSort ) { // Sort events added in the middle of the previous cycle
				this.sortOnGoingEventsByTime();
				this.flagAskedToSort = false;
			}
		}
	}
	this.cleanPhantasmEvents = function() {
		this.pushTimeToOngoingEvents(0);
	}
	this.advanceTime = function(minutes) { // General function to advance time. It regulates everything. EVERYTHING.
		State.variables.daycycle.addMinutes(minutes);
		
		this.pushTimeToOngoingEvents(minutes);
		this.timeToAdvance -= minutes;
		
		this.wakeUpFakeActiveChars();
		this.allCharsCheckMapAi();
	}
	this.pushAllTimeToAdvance = function() {
		this.pushTimerUntilPlayerIsDone();
		if ( this.timeToAdvance == 0 ) {
			this.pushTimeToOngoingEvents(0);
		}
		while ( this.timeToAdvance > 0 ) {
			var timePush = this.ongoingEvents[0].timeRemaining;
			this.advanceTime(timePush);
		}
	}
	
	this.pushAllTimeToAdvanceAsFollower = function() {
		this.timeToAdvance = 0;
		var sEvent = this.findFirstEventInvolvingCharacter(gC("chPlayerCharacter").followingTo);
		if ( sEvent ) {
			this.timeToAdvance = sEvent.timeRemaining;
		}
		if ( this.timeToAdvance == 0 ) {
			this.pushTimeToOngoingEvents(0);
			if ( gC(gC("chPlayerCharacter").followingTo).mapAi.state == "idle" ) {
				gC(gC("chPlayerCharacter").followingTo).mapAi.main();
			}
		}
		while ( this.timeToAdvance > 0 ) {
			var timePush = this.ongoingEvents[0].timeRemaining;
			this.advanceTime(timePush);
		}
	}
	
	// UI
	this.refreshRoomPassage = function() {
		if ( this.flagEndedScenario == false ) {					// Scenario hasn't ended, default behavior
			this.roomPassage = "";
			if ( this.roomMessage != "" ) {
				this.roomPassage += this.roomMessage + "\n\n";
				this.roomMessage = "";
			}
			if ( this.flagMenuInMap ) {
				this.roomPassage += this.mapMenuPassage;
			}
			else {
				this.roomPassage += "<div class='standardBox'>__" + this.getCurrentRoom().title + "__ \n";
				
				if  ( this.getCurrentRoom().getDescription() != "" ) {
					this.roomPassage += this.getCurrentRoom().getDescription() + "\n";
				}
				this.roomPassage += "</div>\n";
				
				// Check if prompt is no longer valid
				if ( this.flagPlayerIsPrompted ) {
					if ( this.isPrompterAchar ) {
						if ( gC(this.promptSender).followingTo != "" ) {
							// Cancel prompt
							this.flagPlayerIsPrompted = false;
							this.promptPassage = "";
							this.isPrompterAchar = true;
						}
					}
				}
				
				if ( this.flagPlayerIsPrompted == false ) {  //  Typical behavior
					if ( gC("chPlayerCharacter").followingTo == "" ) { // If player is following a character, player can't initiate actions or move on their own
						if ( this.getCurrentRoom().connections != null ) {
							this.roomPassage += this.getCurrentRoom().displayConnections() + " \n";
						}
					
						this.roomPassage += this.displayCurrentRoomActions() + " \n";
					}
					else { // Player following character
						var followedSisId = this.findFirstSisIdInvolvingCharacter(gC("chPlayerCharacter").followingTo);
						var sEvent = this.findFirstEventInvolvingCharacter(gC("chPlayerCharacter").followingTo);
						if ( followedSisId != -1 ) {
							this.roomPassage += this.getButtonJoinAndAdvanceToConversation(followedSisId) + "\n\n";
						}
						else if ( sEvent ) {
							if ( sEvent.title == "battle" ) {
								// Option 1: Challenge - Player should be forced to spectate
								// Option 2: Assault - Player should be forced to participate
								if ( sEvent.label == "assault" ) {
									this.roomPassage += this.getButtonJoinCombatForced() + " \n\n";
								} else if ( sEvent.label = "challenge" ) {
									this.roomPassage += this.getButtonSpectateCombatAlt() + " \n\n";
								}
							}
							else if ( sEvent.title == "movement" ) {
								this.roomPassage += this.getButtonContinueAsFollower("Map") + " \n\n";
							} else {
								this.roomPassage += this.getButtonContinueAsFollower("Interlude") + " \n\n";
							}
						}
						else {
							this.roomPassage += this.getButtonContinueAsFollower("Map") + " \n\n";
						}
					}
					
					this.roomPassage += this.displayCharactersInRoom() + " \n";
					
					this.roomPassage += this.displayEventsInRoom(getCurrentRoom().key);
				} else { // Player is prompted
					this.roomPassage += this.promptPassage;
				}
			}
		} else { 													// Scenario has ended, scenarioEndPassage should lead to next gameplay section
			this.roomPassage = this.scenarioEndPassage;
		}
	}
	this.refreshRightUImap = function() {
		var extraTimeLabel = "";
		if ( this.periodEndsTip != "" ) {
			extraTimeLabel = " > (" + this.periodEndsTip + ")";
		}
		State.variables.rightUIbarText = '<div style="text-align: center;">' + State.variables.daycycle.returnMonthDay()
										 + "\n" + State.variables.daycycle.returnHourMin() + extraTimeLabel + '</div>';
		
		if ( Story.get(State.passage).tags.contains("jobsScreen") == false ) {
			
			// Display characters in room
			for ( var charKey of getCurrentRoom().characters ) {
				if ( charKey == "chPlayerCharacter" || gC(charKey).followingTo != "" || gC(charKey).followedBy.includes("chPlayerCharacter") ) {
					// Don't show
				}
				else if ( gC(charKey).followedBy.length > 0 ) {
					State.variables.rightUIbarText += State.variables[charKey].getCharacterUIbarInfo();
					for ( var ck of gC(charKey).followedBy ) {
						State.variables.rightUIbarText += State.variables[ck].getCharacterUIbarInfo();
					}
				}
				else {
					State.variables.rightUIbarText += State.variables[charKey].getCharacterUIbarInfo();
				}
			}
			
		}
		
	}
	
	this.displayCurrentRoomActions = function() { // Returns the text required to display the current room actions to the player.
		var text = "";
		var actions = this.getCurrentRoom().getActions(this.getPlayerGroupChars());
		if ( actions.length > 0 ) {
			var i = 0;
			for ( var action of actions ) {
				text += action.title + action.displayDescriptionMark() + ' <<link [[Execute|Interlude]]>><<script>>'
									 + 'State.variables.compass.getCurrentRoom().getActions(getPlayerCharsGroup())[' + i + '].eventToPile('
									 + action.recMins + ',State.variables.compass.getPlayerGroupChars());'
									 // This sends a systemEvent to pile, that should eventually be executed
									 + 'State.variables.compass.pushAllTimeToAdvance();'
									 + '<</' + 'script>><</' + 'link>>';
									 
				if ( action.flexibleTimes ) { // Extra buttons to allow the player to select time multiples
					text += ' / <<link [[x2|Interlude]]>><<script>>'
						 + 'State.variables.compass.getCurrentRoom().getActions(getPlayerCharsGroup())[' + i + '].eventToPile('
						 + (action.recMins * 2) + ',State.variables.compass.getPlayerGroupChars());'
						 + 'State.variables.compass.pushAllTimeToAdvance();'
						 + '<</' + 'script>><</' + 'link>>';
					text += ' / <<link [[x3|Interlude]]>><<script>>'
						 + 'State.variables.compass.getCurrentRoom().getActions(getPlayerCharsGroup())[' + i + '].eventToPile('
						 + (action.recMins * 3) + ',State.variables.compass.getPlayerGroupChars());'
						 + 'State.variables.compass.pushAllTimeToAdvance();'
						 + '<</' + 'script>><</' + 'link>>';
					text += ' / <<link [[x4|Interlude]]>><<script>>'
						 + 'State.variables.compass.getCurrentRoom().getActions(getPlayerCharsGroup())[' + i + '].eventToPile('
						 + (action.recMins * 4) + ',State.variables.compass.getPlayerGroupChars());'
						 + 'State.variables.compass.pushAllTimeToAdvance();'
						 + '<</' + 'script>><</' + 'link>>';
					text += ' / <<link [[x5|Interlude]]>><<script>>'
						 + 'State.variables.compass.getCurrentRoom().getActions(getPlayerCharsGroup())[' + i + '].eventToPile('
						 + (action.recMins * 5) + ',State.variables.compass.getPlayerGroupChars());'
						 + 'State.variables.compass.pushAllTimeToAdvance();'
						 + '<</' + 'script>><</' + 'link>>';
					text += ' / <<link [[x1/2|Interlude]]>><<script>>'
						 + 'State.variables.compass.getCurrentRoom().getActions(getPlayerCharsGroup())[' + i + '].eventToPile('
						 + (action.recMins * 0.5) + ',State.variables.compass.getPlayerGroupChars());'
						 + 'State.variables.compass.pushAllTimeToAdvance();'
						 + '<</' + 'script>><</' + 'link>>';
				}
				
				text += "\n";
				i++;	  
			}
		}
		
		if ( this.getCurrentRoom().getCustomActionsText ) {
			text += this.getCurrentRoom().getCustomActionsText(this.getPlayerGroupChars());
		}
		return text;
	}
		
	this.displayCharactersInRoom = function() {
		var text = "__Characters in room__:\n";
		var i = 1;
		for ( var character of this.getCurrentRoom().characters ) {
			if ( gC(character).icon != null ) { // Icon
				text += gC(character).icon() + " ";
			}
			text += gC(character).getFormattedName(); // Name
			if ( gRelTypeAb(character,"chPlayerCharacter") ) {
				text += " (" + getRelTypeAbr(character,"chPlayerCharacter") + ") ";
			}
			
			var charInSis = this.isCharacterInSis(character);
			var tEvent = getCharsActiveEvent(character);
			
			//  Group buttons
			if ( gC("chPlayerCharacter").followingTo == "" && State.variables.settings.followingAllowed == true ) { // If player if a follower, buttons change
				// Group buttons
				if ( charMayModifyGroup(character) ) {
					if ( character == "chPlayerCharacter" ) {
					}
					else if ( gC(character).followingTo == "chPlayerCharacter" ) { // Target follows Player
						text += " ( " + rFormatPlayerFavor(character) + " " + this.getButtonAskToUnfollowYou(character) + " ) , ";
					}
					else if ( State.variables.chPlayerCharacter.followingTo == character ) { // Player follows target
						text += " ( " + rFormatPlayerFavor(character) + " " + this.getButtonAskToUnfollowThem(character) + " ) , ";
					}
					else if ( gC(character).followedBy.length > 0 ) { // Target is leader
						if ( State.variables.chPlayerCharacter.followedBy.length < 1 && State.variables.chPlayerCharacter.followingTo != character ) {
							text += " ( " + rFormatPlayerFavor(character) + " " + this.getButtonAskToFollowTo(character) + " ) , ";
						}
					}
					else if ( gC(character).followingTo == "" ) { // Character follows no one, has no followers
						if ( State.variables.chPlayerCharacter.followingTo != "" && State.variables.chPlayerCharacter.followingTo != character ) { // PC is follower
							text += " ( " + rFormatPlayerFavor(character) + " " + this.getButtonAskToFollowTo(character) + " ) , ";
						}
						else if ( State.variables.chPlayerCharacter.followedBy.length > 0 && gC(character).followingTo != "chPlayerCharacter" ) { // PC has followers
							text += " ( " + rFormatPlayerFavor(character) + " " + this.getButtonAskToGetFollowed(character) + " ) , ";
						}
						else if ( State.variables.chPlayerCharacter.followingTo != character && gC(character).followingTo != "chPlayerCharacter" ) { // Else
							text += " ( " + rFormatPlayerFavor(character) + " " + this.getButtonAskToGetFollowed(character) + " , " + this.getButtonAskToFollowTo(character) + " ) , ";
						}
					}
					else { // Character is following someone else
						if ( State.variables.chPlayerCharacter.followingTo == "" && gC(character).followingTo != "chPlayerCharacter" ) {
							text += " ( " + rFormatPlayerFavor(character) + " " + this.getButtonAskToGetFollowed(character) + " ) , ";
						}
					}
				}
			}
			
			// Interaction buttons
			if ( mayCharBeInterrupted(character) ) {
				if ( gC("chPlayerCharacter").followingTo == "" && ( gC(character).followingTo == "" || gC(character).followingTo == "chPlayerCharacter" ) ) {			
					if ( this.canCharBeInteracted(character) && ( character != "chPlayerCharacter" ) && ( charInSis == false ) ) { // Interaction button
						text += " ( " + this.getButtonBeginSocialInteraction(character) + " , " + this.getButtonBeginSocialInteractionSpecifics(character) + " )";
					}
					else if ( charInSis ) {
						text += " ( " + this.getButtonJoinConversation(this.getCharacterSisId(character)) + " )";
					}
				}
				else if ( gC("chPlayerCharacter").followingTo == character ) {
					text += " ( " + this.getButtonAskToUnfollowThem(character) + " ) ";
				}
			}
			
			// Battle buttons
			if ( character != "chPlayerCharacter" ) {
				var battleButtons = [];
				if ( isChallengePossible("chPlayerCharacter",character) ) {
					battleButtons.push(this.getButtonChallenge(character));
				}
				if ( isAssaultPossible("chPlayerCharacter",character) ) {
					battleButtons.push(this.getButtonAssault(character));
				}
				if ( isLiberationChallengePossible("chPlayerCharacter",character) ) {
					battleButtons.push(this.getButtonLiberationChallenge(character));
				}
				if ( battleButtons.length > 0 ) {
					text += " (" + stringArrayToTextMinusAnd(battleButtons) + ")";
				}
			}
			
			if ( mayEventBeSpectated(tEvent) ) {
				text += " (" + this.getButtonSpectateCombat(character) + ")";
			}
			
			text += "\n";
			i++;
		}
		return text;
	}
	
	this.getEventDisplayInfo = function(sEvent) {
		var text = getCharNames(sEvent.characters);
		if ( sEvent.characters.length == 1 ) {
			text += " is ";
		}
		else {
			text += " are ";
		}
		
		if ( sEvent.title == "movement") {
			text += "moving towards " + getRoomA(sEvent.roomKey).title + ". This may be finished in " + sEvent.timeRemaining + " minutes.";
		}
		else if ( sEvent.title == "rest" ) {
			text += "resting to replenish forces.";
		}
		else if ( sEvent.title == "sisRound" ) {
			text += "are chatting together. This may continue for at least " + sEvent.timeRemaining + " minutes.";
		}
		else {
			text += "engaged in " + sEvent.name + ". This may continue for " + sEvent.timeRemaining + " minutes.";
		}
		
		return text;
	}
	this.displayEventsInRoom = function(roomKey) {
		var text = "";
		
		for ( var sEvent of this.ongoingEvents ) {
			if ( sEvent.characters.length > 0 ) {
				if ( gC(sEvent.characters[0]).currentRoom == roomKey && sEvent.flagForcedToEnd == false ) {
					text += this.getEventDisplayInfo(sEvent) + "\n";
				}
			}
		}
		
		return text;
	}
	
	this.setInterludeInfo = function(passageText) {
		this.interludePassage = passageText + "[[Return to Map" + "|Map]]";
	}
	this.setInterludeTrigger = function(uniquePassageText) {
		this.interludePassage = uniquePassageText;
	}
	
	this.setMapMessage = function(msg) {
		if ( this.roomMessage != "" ) { this.roomMessage += "\n"; }
		this.roomMessage += msg;
	}
	
	// UI - Buttons
	this.canCharBeInteracted = function(charKey) {
		var flagCharAllowsSocialInteractions = gC(charKey).availableSocialInteractions;
		
		
		return flagCharAllowsSocialInteractions;
	}
	this.getButtonBeginSocialInteraction = function(targetCharacter) {
		var bText = "<<l" + "ink [[Talk|Social Interactions]]>><<s" + "cript>>\n";
		bText 	 += "eitherCreateSisOrRejectSis('" + targetCharacter + "');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.getButtonBeginSocialInteractionSpecifics = function(targetCharacter) {
		var bText = "<<l" + "ink [[Discuss topic|Social Interactions Specifics]]>><<s" + "cript>>\n";
		bText 	 += "eitherCreateSisOrRejectSis('" + targetCharacter + "');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.getButtonJoinConversation = function(targetSIS) {
		var bText = "<<l" + "ink [[Join conversation|Social Interactions]]>><<s" + "cript>>\n";
		bText	 += "State.variables.compass.sisList[" + targetSIS + "].playerRequestsJoin();"
		bText	 += "State.variables.compass.sisList[" + targetSIS + "].charsJoinSis(getCharGroup('chPlayerCharacter'));\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	this.getButtonAskToGetFollowed = function(targetCharacter) {
		var bText = "<<l" + "ink [[Ask to follow you|Map]]>><<s" + "cript>>\n";
		bText 	 += "aAsksBtoFollowA('chPlayerCharacter','" + targetCharacter + "');\n";
		//"charFollowsChar('" + targetCharacter + "','chPlayerCharacter');\n";
		//bText	 += "State.variables.compass.setMapMessage('" + gC(targetCharacter).name + " accepted and will now follow you.');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.getButtonAskToFollowTo = function(targetCharacter) {
		var bText = "<<l" + "ink [[Ask to follow them|Map]]>><<s" + "cript>>\n";
		bText 	 += "aAsksBtoFollowB('chPlayerCharacter','" + targetCharacter + "');\n";
		//bText 	 += "charFollowsChar('chPlayerCharacter','" + targetCharacter + "');\n";
		//bText	 += "playerJoinsTargetChar('" + targetCharacter + "');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.getButtonAskToUnfollowThem = function(targetCharacter) {
		var bText = "<<l" + "ink [[Ask to unfollow them|Map]]>><<s" + "cript>>\n";
		bText 	 += "aAsksBtoUnfollowB('chPlayerCharacter','" + targetCharacter + "');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.getButtonAskToUnfollowYou = function(targetCharacter) {
		var bText = "<<l" + "ink [[Ask to unfollow you|Map]]>><<s" + "cript>>\n";
		bText 	 += "aAsksBtoUnfollowA('chPlayerCharacter','" + targetCharacter + "');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	this.getButtonContinueAsFollower = function(nextPassage) {
		var bText = "<<l" + "ink [[Continue|" + nextPassage + "]]>><<s" + "cript>>\n";
		bText 	 += "State.variables.compass.wakeUpFakeActiveChars();\n";
		bText 	 += "State.variables.compass.pushAllTimeToAdvanceAsFollower();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;		
	}
	this.getButtonJoinAndAdvanceToConversation = function(targetSIS) {
		var bText = "<<l" + "ink [[Continue to conversation|Social Interactions]]>><<s" + "cript>>\n";
		bText	 += "State.variables.compass.sisList[" + targetSIS + "].playerRequestsJoin();"
		bText	 += "State.variables.compass.sisList[" + targetSIS + "].charsJoinSis(getCharGroup('chPlayerCharacter'));\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	this.getButtonAssault = function(target) {
		var bText = "<<l" + "ink [[ Aslt |Interlude]]>><<s" + "cript>>\n";
		bText 	 += "initiatePlayerAssault('" + target + "');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.getButtonChallenge = function(target) {
		var bText = "<<l" + "ink [[ Chlg |Interlude]]>><<s" + "cript>>\n";
		bText 	 += "setUpPlayerChallengeOptions('" + target + "');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.getButtonLiberationChallenge = function(target) {
		var bText = "<<l" + "ink [[ Liberation Challenge |Interlude]]>><<s" + "cript>>\n";
		bText 	 += "initiateLiberationChallenge('chPlayerCharacter','" + target + "');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}		
	
	this.getButtonSpectateCombat = function(target) {
		var bText = "<<l" + "ink [[Spectate Combat|Scene]]>><<s" + "cript>>\n";
		bText += "addSpectatorsToCharsBattle('" + target + "',getCharGroup('chPlayerCharacter'));\n";
		bText += "State.variables.compass.pushAllTimeToAdvance();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.getButtonJoinCombatForced = function() {
		var bText = "<<l" + "ink [[Join combat|Scene]]>><<s" + "cript>>\n";
		bText += "State.variables.compass.pushAllTimeToAdvance();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.getButtonSpectateCombatAlt = function(target) {
		// Used when the player is already spectating the combat
		var bText = "<<l" + "ink [[Spectate Combat|Scene]]>><<s" + "cript>>\n";
		bText += "State.variables.compass.pushAllTimeToAdvance();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	// Debug
	this.debugInfo = "";	
	
	this.debugFinishedEventInfo = function(sEvent) {
		var text = "|Finished event. Event name: " + sEvent.title + ", Chars: [" + sEvent.characters + "], Total time: " + sEvent.ongoingTime + "|";
		return text;
	}
};

State.variables.compass = new Compass();

// Constructors, serializers, etc.
Compass.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
Compass.prototype.clone = function () {
	return (new Compass())._init(this);
};
Compass.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Compass())._init($ReviveData$)', ownData);
};

////////// ROOMS LIST CLASS  //////////
// Serializer functions force me to make yet another empty class
window.Rooms = function() {
};

// Constructors, serializers, etc.
Rooms.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
Rooms.prototype.clone = function () {
	return (new Rooms())._init(this);
};
Rooms.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Rooms())._init($ReviveData$)', ownData);
};


////////// CHART CLASS  //////////
// Charts contain rooms and characters able to move between them and perform actions.
// They should actually be named "maps", but Javascript disagrees. I don't think it will accept it any time soon.

window.Chart = function(key,title) {
	this.key = key;
	this.title = title;
	this.rooms = new Rooms();
	this.characters = []; // Keys of characters currently present in map. Remember to clean.
	
	this.placeCharacter = function(charKey,roomKey) {
		gC(charKey).currentRoom = roomKey;
		this.rooms[roomKey].characters.push(charKey);
		this.characters.push(charKey);
	}
	this.placeCharacters = function(charKeys,roomKey) {
		for ( var character of charKeys ) {
			this.placeCharacter(character,roomKey);
		}
	}
	this.cleanCharacters = function() {
		for ( var character of this.characters ) {
			getRoomA(gC(character).currentRoom).characters = [];
			gC(character).currentRoom = "";
		}
		this.characters = [];
	}

	this.getAllRooms = function() {
		var rooms = [];
		for ( var room in this.rooms ) {
			if ( this.rooms[room] instanceof Room ) {
				rooms.push(this.rooms[room]);
			}
		}
		return rooms;
	}
};

// Constructors, serializers, etc.
Chart.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
Chart.prototype.clone = function () {
	return (new Chart())._init(this);
};
Chart.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Chart())._init($ReviveData$)', ownData);
};


////////// ROOM CLASS  //////////
// Rooms are in-game locations, containing different actions, connections to other rooms, characters, descriptions, etc.

window.Room = function(key,title) {
	
	this.key = key;
	this.title = title;
	
	this.description = "";
	this.getDescription = function() {
		return this.description;
	}
	this.setDescription = function(newDescription) {
		this.description = newDescription;
	}	
	
	this.connections = null; // Connections refers to connected rooms in the same map, referenced by their keys.
	this.displayConnections = null;
							 // The connections are displayed as a set of links provided by a function. The function must be created manually.
																									// A dynamic function may be created later.
	
	this.getConnections = function(characterGroup) { // Returned to AIs. Will only send back valid room connections.
		return this.connections;
	}
	
	this.characters = []; // Keys of characters currently present in this room.
	
	this.getActions = function(characters) {	// Returns a list of map actions available in this room.
		return [];
	}
	
	this.getCustomActionsText = null;
	
	this.combatAllowed = true;
};

window.createStandardDisplayConnections = function(connections) {
	var string = "";
	for ( var connection of connections ) {
		string += getLinkToRoom(connection.loc,"Go to " + getCurrentMap().rooms[connection.loc].title,connection.distance)
			    + " " + displayCharIconsInRoom(connection.loc) + "\n";
	}
	return string;
}
window.displayCharIconsInRoom = function(roomKey) {
	var string = "";
	for ( var character of getRoomA(roomKey).characters ) {
		if ( gC(character).icon != null ) {
			string += gC(character).icon() + " ";
		}
	}
	return string;
}

// Constructors, serializers, etc.
Room.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
Room.prototype.clone = function () {
	return (new Room())._init(this);
};
Room.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Room())._init($ReviveData$)', ownData);
};


////////// ROOM CONNECTION CLASS CLASS  //////////

window.RoomConnection = function(loc, distance) {
	this.loc = loc;
	this.distance = distance;
};

// Constructors, serializers, etc.
RoomConnection.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
RoomConnection.prototype.clone = function () {
	return (new RoomConnection())._init(this);
};
RoomConnection.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new RoomConnection())._init($ReviveData$)', ownData);
};


////////// MAP ACTIONS CLASS  //////////
// System events are dynamically generated by character actions within maps. The compass.advanceTime() function activates them.

window.mapAction = function(actionKey,actionTitle,systemEvent,flagHide) {
	this.key = actionKey; // Key
	this.title = actionTitle; // Phrase to be displayed in map
	this.description = "";
	this.tags = [];
	
	this.recMins = 60;
	this.flexibleTimes = false;
	
	this.requirements = function() {  // This function checks if the characters are able to perform the action
		return true;
	}
	this.systemEvent = systemEvent; // System event, to be created at compass if a group of characters performs this action
	this.flagHide = flagHide; // Determines if the action may be shown even if requirements are not met
	
	this.displayTitle = function() { // Returns a string to be displayed to the player when the action is present and not hidden
		return this.actionTitle;
	}
	this.displayDescriptionMark = function() { // Returns a string to be displayed to the player to show the action's description
		var string = "";
		if ( this.description != "" ) {
			string = '<span title="' + this.description + '">^^(?)^^</span>';
		}
		return string;
	}
		
	this.eventToPile = function(minutes,characters) { // Creates a new system event at the compass' pile using this action's event as base
		State.variables.compass.ongoingEvents.push(this.systemEvent(minutes,characters));
		State.variables.compass.sortOnGoingEventsByTime();
		signCharsActive(characters);
	}
};

/*
window.getMapActionInRoom = function(room,actionKey) {
	var id = 0;
	var i = 0;
	for ( var mapAction of room
} */

// Constructors, serializers, etc.
mapAction.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
mapAction.prototype.clone = function () {
	return (new mapAction())._init(this);
};
mapAction.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new mapAction())._init($ReviveData$)', ownData);
};

////////// SYSTEM EVENTS CLASS  //////////
// System events are dynamically generated by character actions within maps. The compass.advanceTime() function activates them.

window.systemEvent = function(minutes,characters,title,name,effect) {
	this.title = title; // Similar to key
	this.name = name; // Displayed in text
	
	this.timeRemaining = minutes;
	this.ongoingTime = 0; // Used in effect to calculate dimension of effects
	
	this.characters = characters;
	this.effect = effect;

	this.flagMayBeInterrupted = true;
	this.flagMayChangeGroups = true; // If false, character can't be invited or forced to join or leave group
	
	this.flagForcedToEnd = false;
	this.applyEffectIfForcedToEnd = true; // If false, effect will not apply
	
	this.flagSignCharsAsIdleOnEnd = true; // If true, characters' AI may get a new goal when the event ends
	this.flagDontPushTimeYet = false; // This must be set to true on creation if the event will be created during
									  // pushTimeToOngoingEvents
	
	this.removeCharFromEvent = function(charKey) {
		if ( this.characters.includes(charKey) ) {
			this.characters = arrayMinusA(this.characters,charKey);
			if ( this.characters.length < 1 ) {
				// Event ran out of characters, what to do
				this.forceEnd();
			}
		}
	}
	
	this.pushTime = function(minutes) {
		var flagFinishedEvent = false;
		
		var effectMsg = "";
		if ( this.flagDontPushTimeYet == false ) {
			this.timeRemaining -= minutes;
			this.ongoingTime += minutes;
			effectMsg = "";
			
			if ( this.flagForcedToEnd == true ) {			// Forced to end
				flagFinishedEvent = true;
				if ( this.applyEffectIfForcedToEnd ) {
					effectMsg = this.effect(this.characters);
				}
			}
			else if ( this.timeRemaining <= 0 ) {			// Finished at its correct time
				effectMsg = this.effect(this.characters); // Event gets executed
				
				if ( this.flagSignCharsAsIdleOnEnd ) {
					signCharsIdle(this.characters); // Tell MapAIs these characters are missing orders
				}
				
				flagFinishedEvent = true;
			}
			
			if ( this.characters.includes("chPlayerCharacter") || this.characters.includes(gC("chPlayerCharacter").followingTo) ) {
				State.variables.compass.setInterludeInfo(effectMsg); // interludePassage = effectMsg;
			}
		}
		
		return flagFinishedEvent;
	}
	this.forceEnd = function() {
		this.timeRemaining = 0;
		
		if ( this.title != "movement" && this.title != "sisRound" ) {
			
		} else {
			var effectMsg = "The movement couldn't be completed."; // Event will not get executed
		}
		
		this.flagForcedToEnd = true;
		
		
		if ( this.title != "sisRound" ) {
			signCharsIdle(this.characters);
		}
		
		if ( this.characters.includes("chPlayerCharacter") ) {
			State.variables.compass.setInterludeInfo(effectMsg); // interludePassage = effectMsg;
		}
		
		
		return true;
	}
	
};

// Constructors, serializers, etc.
systemEvent.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
systemEvent.prototype.clone = function () {
	return (new systemEvent())._init(this);
};
systemEvent.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new systemEvent())._init($ReviveData$)', ownData);
};

