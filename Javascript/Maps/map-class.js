setup.cursorHalfX = 10;
setup.cursorHalfY = 10;

////////// Map functions //////////
	// Management / Info
window.getLinkToRoom = function(roomKey,message,distance) {
	var string = '[img[img/mapIcons/' + getRoomInfoA(roomKey).icon + ']] <<link [[' + message + '|Map]]>><<script>>'
		   + 'State.variables.compass.playerMovesToRoom("' + roomKey + '",' + distance + ');'
		   + '<</' + 'script>><</' + 'link>>';
	return string;
}
window.getMap = function(mapKey) {
	return State.variables[mapKey];
}
window.getMapInfo = function(mapKey) {
	return setup[mapKey];
}
window.getCurrentMap = function () {
	return State.variables[State.variables.compass.currentMap];
}
window.getCurrentRoom = function() {
	return State.variables[State.variables.compass.currentMap].rooms[State.variables.compass.currentRoom];
}
window.getCurrentRoomInfo = function() {
	return setup[State.variables.compass.currentMap][State.variables.compass.currentRoom];
}
window.getRoomA = function(roomKey) { // Assumes the room's map is active
	return State.variables[State.variables.compass.currentMap].rooms[roomKey];
}
window.getRoomInfoA = function(roomKey) { // Assumes the room's map is active
	return setup[State.variables.compass.currentMap][roomKey];
}
window.getRoomInMap = function(mapKey,roomKey) {
	return State.variables[mapKey].rooms[roomKey];
}
window.getRoomInfoInMap = function(mapKey,roomKey) {
	return setup[mapKey][roomKey];
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
window.mayCharBeApproached = function(actor,target) {
	var flag = false;
	if ( mayCharBeInterrupted(target) && (gC(target).followingTo == "" || gC(target).followingTo == actor) ) {
		flag = true;
	}
	return flag;
}

window.mayEventBeSpectated = function(sEvent) {
	var flag = false;
	if ( sEvent ) {
		if ( sEvent.title == "battle" || sEvent.title == "scene" ) {
			if ( sEvent.characters.includes("chPlayerCharacter") == false && gC("chPlayerCharacter").followingTo == "" ) {
			// if ( sEvent.charactersTeamA.includes("chPlayerCharacter") == false && sEvent.charactersTeamB.includes("chPlayerCharacter") == false ) {
				flag = true;
			}
		}
	}
	return flag;
}
window.mayBattleBeJoined = function(sEvent) {
	var flag = false;
	if ( sEvent ) {
		if ( sEvent.title == "battle" ) {
			if ( sEvent.characters.includes("chPlayerCharacter") == false && gC("chPlayerCharacter").followingTo == "" && sEvent.hasOwnProperty("label") ) {
				if ( sEvent.label == "assault" ) {
					flag = true;
				}
			}
		}
	}
	return flag;
}
window.mayBattleBeJoinedByChar = function(sEvent,charKey) {
	var flag = false;
	if ( sEvent ) {
		if ( sEvent.title == "battle" ) {
			if ( sEvent.characters.includes(charKey) == false && gC(charKey).followingTo == "" && sEvent.hasOwnProperty("label") ) {
				if ( sEvent.label == "assault" ) {
					flag = true;
				}
			}
		}
	}
	return flag;
}

window.getSisCharIsIn = function(character) {
	var sisKey = State.variables.compass.findFirstSisIdInvolvingCharacter(character);
	return State.variables.compass.sisList[sisKey];
}

window.isCharInScene = function(character) {
	var isInScene = false;
	var sEvent = getCharsActiveEvent(character);
	if ( sEvent ) {
		if ( sEvent.title == "scene" || sEvent.title == "battle" ) {
			isInScene = true;
		}
	}
	return isInScene;
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
	sEvent.priority = -1;
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
		State.variables.sisPlayerInfo.currentTarget = targetChar;
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
	
	// Char leaves SIS
	var cSisId = State.variables.compass.findFirstSisIdInvolvingCharacter(charKey);
	if ( cSisId != -1 ) {
		State.variables.compass.sisList[cSisId].charsLeaveSis([charKey]);
	}
	if ( charKey == "chPlayerCharacter" ) {
		State.variables.compass.pcSis = -1;
	}
	
	// Char joins followed's event
	var nEvent = State.variables.compass.findFirstEventInvolvingCharacter(gC(charKey).followingTo);
	if ( nEvent ) {
		if ( nEvent.ongoingTime == 0 ) {
			nEvent.characters.push(charKey);
		}
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
		if ( firstEvent.timeRemaining == secondEvent.timeRemaining ) {
			if ( secondEvent.characters.includes("chPlayerCharacter") ) {
				flag = true;
			}
		} else {
			flag = true;
		}
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
	var infamy = getCharGroup("chPlayerCharacter").length * 3 / getCharGroup(target).length;
	if ( gC("chPlayerCharacter").cbl.includes(target) ) {
		infamy = 0;
		gC("chPlayerCharacter").cbl = arrayMinusA(gC("chPlayerCharacter").cbl,target);
	}
	gC("chPlayerCharacter").changeInfamy(infamy);
	// Mood
	gC(target).mood.applyChange("angry",25);
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
			  + "You have gained " + infamy.toFixed(1) + " infamy.\n\n"
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
	var infamy = getCharGroup(actor).length * 3 / getCharGroup(target).length;
	if ( gC(actor).cbl.includes(target) ) {
		infamy = 0;
		gC(actor).cbl = arrayMinusA(gC(actor).cbl,target);
	}
	gC(actor).changeInfamy(infamy);
	// Mood
	gC(target).mood.applyChange("angry",25);
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
	addDayTagToChar("liberationAttempt",actor);
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
	
	if ( allChars.includes("chPlayerCharacter") && target != "chPlayerCharacter" ) {
		State.variables.compass.timeToAdvance = 0;
		State.variables.compass.pushAllTimeToAdvance();
	}
	
	if ( actor == "chPlayerCharacter" ) {
		var iText = "You're challenging " + getCharNames(getCharGroup(target)) + " to finish your relationship!\n"
				  + "[[Continue|Scene]]";
		State.variables.compass.setInterludeTrigger(iText);
	} else if ( target == "chPlayerCharacter" ) {
		var playerEvent = State.variables.compass.findFirstEventInvolvingPlayer();
		var gD = chooseDialogFromList(setup.dialogDB.icDialogs,actor,"chPlayerCharacter","","");
		var p = gD + "\n" + gC(actor).getFormattedName() + " is initiating a liberation challenge against you!\n\n";
		p += getButtonBeingAssaulted(actor);
		State.variables.compass.setPlayerPrompt(p,actor,true);
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
	
	// Infamy
	var infamy = 1;
	if ( gC("chPlayerCharacter").cbl.includes(target) ) {
		infamy = 0;
		gC("chPlayerCharacter").cbl = arrayMinusA(gC("chPlayerCharacter").cbl,target);
	}
	gC("chPlayerCharacter").changeInfamy(infamy);
			
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
	
	// Infamy
	var infamy = 1;
	if ( gC(actor).cbl.includes(target) ) {
		infamy = 0;
		gC(actor).cbl = arrayMinusA(gC("chPlayerCharacter").cbl,target);
	}
	gC(actor).changeInfamy(infamy);
	
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
window.addCharsTeamToCharsBattle = function(joiningCharacter,joinedCharacter) {
	var sEvent = getCharsActiveEvent(joinedCharacter);
	var gainedInfamy = 0;
	var notification = "";
	if ( sEvent ) {
		if ( sEvent.title == "battle" ) {
			if ( mayBattleBeJoinedByChar(sEvent,joiningCharacter) ) {
				var targetTeamA = false;
				if ( sEvent.charactersTeamA.includes(joinedCharacter) ) {
					targetTeamA = true;
				}
				for ( var charKey of gC(joiningCharacter).followedBy.concat([joiningCharacter]) ) {
					sEvent.characters.push(charKey);
					if ( targetTeamA ) {
						sEvent.charactersTeamA.push(charKey);
						gainedInfamy = 1;
					} else {
						sEvent.charactersTeamB.push(charKey);
						gainedInfamy = -1;
					}
				}
				if ( gC(joiningCharacter).relations[joinedCharacter].relType ) {
					gainedInfamy += gC(joiningCharacter).relations[joinedCharacter].relType.supportInfamy;
				}
				notification = gC(joiningCharacter).getFormattedName() + " came to the battle in support of " + gC(joinedCharacter).getFormattedName() + ".";
				gC(joiningCharacter).changeInfamy(gainedInfamy);
				sEvent.extraMessages.push(notification);
				sEvent.extraMessages.push(("" + gC(joiningCharacter).getFormattedName() + " gained " + gainedInfamy.toFixed(0) + " infamy."));
			}
		}
	}
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
	this.roomActionsMessage = "";
	
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
	
	// Debug
	this.debugInfo = "";	
	
	this.debugFinishedEventInfo = function(sEvent) {
		var text = "|Finished event. Event name: " + sEvent.title + ", Chars: [" + sEvent.characters + "], Total time: " + sEvent.ongoingTime + "|";
		return text;
	}
};

// Methods
	// Management
	Compass.prototype.initializeMap = function(mapKey,roomKey) {
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
	Compass.prototype.setCurrentRoom = function(roomKey) {
		this.currentRoom = roomKey;
	}
	Compass.prototype.getCurrentRoom = function() {
		return State.variables[this.currentMap].rooms[this.currentRoom];
	}
	
	Compass.prototype.createNewSis = function(charList) { 
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
	
	Compass.prototype.finishMapSimulation = function() {
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
		this.roomActionsMessage = "";
		
		// Clean scene
		State.variables.sc.cleanScene();
		
		// Clean others
		this.periodEndsTip = "";
		
		return true;
	}
	
		// External interruptions and calls to player
	Compass.prototype.interruptPlayer = function(promptText,promptSender,isPrompterAchar) {
		this.timeToAdvance = 0;
		this.setPlayerPrompt(promptText,promptSender,isPrompterAchar);
		// If player is in SIS -> Set prompt in SIS -> Otherwise set prompt in map
		this.interludePassage = promptText;
	}
	
	Compass.prototype.setPlayerPrompt = function(passageText,promptSender,isPrompterAchar) {
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
		}
	}
	Compass.prototype.finishPlayerPrompt = function() {
		this.flagPlayerIsPrompted = false;
		var playerSisId = this.getCharacterSisId("chPlayerCharacter");
		if ( playerSisId != -1 ) { // End Sis prompt
			this.sisList[playerSisId].endSisPlayerPrompt();
			this.pushTimerUntilPlayerIsDone();
		}
		this.promptPassage = "";
	}
	
		// Characters
	Compass.prototype.getPlayerGroupChars = function() {
		return getPlayerCharsGroup();
	}
	Compass.prototype.getCharactersGroup = function(character) {
		return getCharGroup(character);
	}
	
	Compass.prototype.wakeUpFakeActiveChars = function() {
		for ( var character of getCurrentMap().characters ) {
			if ( gC(character).mapAi.state == "active" ) {
				if ( character != "chPlayerCharacter" ) {
					var sEvent = this.findFirstEventInvolvingCharacter(character);
					if ( sEvent == null ) {
						gC(character).mapAi.signIdle();
						gC(character).mapAi.main();
					}
				}
			}
		}
	}
	Compass.prototype.allCharsCheckMapAi = function() {
		// Every character present in the map calls mapAi.main(), trying to reach new goals, creating new missions or staying quiet
		for ( var character of getCurrentMap().characters ) {
			gC(character).mapAi.main();
		}
	}
	
	Compass.prototype.moveCharToRoom = function(charKey,roomKey) {
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
	Compass.prototype.moveCharsToRoom = function(charKeysList,roomKey) {
		// Only changes variables, logic isn't involved
		for ( var character of charKeysList ) {
			this.moveCharToRoom(character,roomKey);
		}
		if ( charKeysList.includes("chPlayerCharacter") ) {
			this.setCurrentRoom(roomKey);
		}
	}
	
	Compass.prototype.isCharacterInSis = function(charKey) {
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
	Compass.prototype.getCharacterSisId = function(charKey) {
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
	Compass.prototype.sortOnGoingEventsByTime = function() {
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
	
	Compass.prototype.findFirstEventInvolvingPlayer = function() {
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
	Compass.prototype.findLastEventInvolvingPlayer = function() {
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
	Compass.prototype.findFirstEventInvolvingCharacter = function(character) {
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
	Compass.prototype.findAllEventsInvolvingCharacter = function(character) {
		var eventsList = [];
		for ( var sEvent of this.ongoingEvents ) {
			if ( sEvent.characters.includes(character) ) {
				eventsList.push(sEvent);
			}
		}
		return eventsList;
	}
	Compass.prototype.findAllEventsIDsInvolvingCharacter = function(character) {
		var eventsList = [];
		var i = 0;
		for ( var sEvent of this.ongoingEvents ) {
			if ( sEvent.characters.includes(character) ) {
				eventsList.push(i);
			}
			i++;
		}
		return eventsList;
	}
	Compass.prototype.findFirstSisIdInvolvingCharacter = function(character) {
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
	
	Compass.prototype.pushTimerUntilPlayerIsDone = function() {
		var sEvent = this.findLastEventInvolvingPlayer();
		if ( sEvent != null ) {
			this.timeToAdvance = sEvent.timeRemaining;
		}
	}
	
	Compass.prototype.characterEventEndsPrematurely = function(character) {
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
	Compass.prototype.getStandardMovementTime = function(distance,characterGroup) { // Calculates movement time in a given distance for a given character group.
		return distance;
	}
	Compass.prototype.charsMoveToRoom = function(characters,roomKey,distance) {
		var minutes = this.getStandardMovementTime(distance,characters);
		this.ongoingEvents.push(createSystemEventMovement(minutes,characters,roomKey));
		this.sortOnGoingEventsByTime();
		if ( characters.includes("chPlayerCharacter") ) {
			this.setCurrentRoom(roomKey);
		}
	}
	Compass.prototype.playerMovesToRoom = function(roomKey,distance) { // Moves the player's location in the map.
		var minutes = this.getStandardMovementTime(distance,this.getPlayerGroupChars());
		this.ongoingEvents.push(createSystemEventMovement(minutes,this.getPlayerGroupChars(),roomKey));
		this.sortOnGoingEventsByTime();
		this.pushAllTimeToAdvance();
		this.setCurrentRoom(roomKey);
	}
	
	Compass.prototype.pushTimeToOngoingEvents = function(minutes) {
		if ( this.ongoingEvents.length > 0 ) {
			this.purgeDuplicityEvents();
			this.purgeInvalidEvents();
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
	Compass.prototype.cleanPhantasmEvents = function() {
		this.pushTimeToOngoingEvents(0);
	}
	Compass.prototype.advanceTime = function(minutes) { // General function to advance time. It regulates everything. EVERYTHING.
		State.variables.daycycle.addMinutes(minutes);
		
		this.pushTimeToOngoingEvents(minutes);
		this.timeToAdvance -= minutes;
		
		this.wakeUpFakeActiveChars();
		this.allCharsCheckMapAi();
	}
	Compass.prototype.pushAllTimeToAdvance = function() {
		this.pushTimerUntilPlayerIsDone();
		if ( this.timeToAdvance == 0 ) {
			this.pushTimeToOngoingEvents(0);
		}
			// Infinite loop patch Part 1 //
		var tempTimeToAdvance = this.timeToAdvance;
		var repeatedAdvances = 0;
			// Infinite loop patch //
			State.variables.repeatedAdvances = 0;
		while ( this.timeToAdvance > 0 && repeatedAdvances < 10 ) {
			var timePush = this.ongoingEvents[0].timeRemaining;
			this.advanceTime(timePush);
			// Infinite loop patch Part 2 //
			if ( tempTimeToAdvance == this.timeToAdvance ) { repeatedAdvances++; }
			else { State.variables.repeatedAdvances = -repeatedAdvances; repeatedAdvances = 0; }
			// Infinite loop patch //
		}
	}
	
	Compass.prototype.pushAllTimeToAdvanceAsFollower = function() {
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
	
	Compass.prototype.purgeDuplicityEvents = function() {
		for ( var cK of getCurrentMap().characters ) {
			var eList = this.findAllEventsInvolvingCharacter(cK);
			if ( eList.length > 1 ) {
				var i = 0;
				var eI = 0;
				var highestP = -30;
				// Adjust priority
				for ( var ev of eList ) {
					if ( ev.characters.includes("chPlayerCharacter") ) {
						ev.priority += 10;
					}
				}
				// Get highest priority and position
				for ( var ev of eList ) {
					if ( ev.priority >= highestP ) {
						highestP = ev.priority;
						eI = i;
					}
					i++;
				}
				// Signal all other events to be purged
				i = 0;
				for ( var ev of eList ) {
					if ( i != eI ) {
						ev.forceEnd();
					}
					i++;
				}
			}
		}
	}
	Compass.prototype.purgeInvalidEvents = function() {
		// Problem: an action of the player may have dragged a NPC to an event X despite the NPC having just started an event Y.
		// Solution: find all NPCs that share an event with the player, cancel all events that have just started and found NPCs are participating in them.
		var selectedNPCs = [];
		for ( var sEvent of this.ongoingEvents ) {
			if ( sEvent.ongoingTime == 0 ) {
				if ( sEvent.characters.includes("chPlayerCharacter") ) {
					selectedNPCs = selectedNPCs.concat(sEvent.characters);
				}
			}
		}
		// Selected NPCs now contains a list with all charactes that share an event with the player, as well as the player. Now we will force events that contain one of these NPCs *but* not the player and have just started to end
		for ( var sEvent of this.ongoingEvents ) {
				if ( sEvent.ongoingTime == 0 ) {
				var flagFinishEvent = false;
				for ( var ch of sEvent.characters ) {
					if ( selectedNPCs.includes(ch) ) { flagFinishEvent = true; }
				}
				if ( sEvent.characters.includes("chPlayerCharacter") ) { flagFinishEvent = false; }
				if ( flagFinishEvent ) { sEvent.forceEnd() }
			}
		}
		// Problem: an action of the player may have provoked two characters to be unable to fight each other, but they may have already started fighting.
		// Solution: Find incompatible battle events and force them to end
			// Liberation challenges, challenges, assaults
		for ( var sEvent of this.ongoingEvents ) {
			if ( sEvent.label == "liberationChallenge" ) {
				if ( liberationChallengePreConditions(sEvent.charactersTeamA[0],sEvent.charactersTeamB[0]) == false ) {
					sEvent.forceEnd();
				}
			} else if ( sEvent.label == "challenge" ) {
				if ( challengePreConditions(sEvent.charactersTeamA[0],sEvent.charactersTeamB[0]) == false ) {
					sEvent.forceEnd();
				}
			} else if ( sEvent.label == "assault" ) {
				if ( assaultPreConditions(sEvent.charactersTeamA[0],sEvent.charactersTeamB[0]) == false ) {
					sEvent.forceEnd();
				}
			}
		}
	}
	
	// UI
	Compass.prototype.refreshRoomPassage = function() {
		if ( this.flagEndedScenario == false ) {					// Scenario hasn't ended, default behavior
			this.setCurrentRoom(gC("chPlayerCharacter").currentRoom);
			if ( getCurrentRoomInfo().setSubarea ) { getCurrentRoomInfo().setSubarea(); } // Set the current room's associated subarea, if required
			this.roomPassage = "";
			if ( this.roomMessage != "" ) {
				this.roomPassage += this.roomMessage + "\n\n";
				this.roomMessage = "";
			}
			if ( this.flagMenuInMap ) {
				this.roomPassage += this.mapMenuPassage;
			}
			else {
				this.roomPassage += `<div class='standardBox'>  <span style="vertical-align: middle;"><img src="img/mapIcons/` + getCurrentRoomInfo().medIcon + `" style="vertical-align: middle;">` + " __" + getCurrentRoomInfo().title + "__</span>\n";
				
				if  ( getCurrentRoomInfo().getDescription() != "" ) {
					this.roomPassage += getCurrentRoomInfo().getDescription() + "\n";
				}
				this.roomPassage += "</div>\n";
				
				// Check if prompt is no longer valid
				if ( this.flagPlayerIsPrompted ) {
					if ( this.isPrompterAchar ) {
						if ( gC(this.promptSender).followingTo != "" && gC(this.promptSender).followingTo != "chPlayerCharacter" && isCharInScene(this.promptSender) == false ) {
							// Cancel prompt
							this.flagPlayerIsPrompted = false;
							this.promptPassage = "";
							this.isPrompterAchar = true;
						}
					}
				}
				
				if ( this.flagPlayerIsPrompted == false ) {  //  Typical behavior
					this.roomActionsMessage = "";
				
					if ( gC("chPlayerCharacter").followingTo == "" ) { // If player is following a character, player can't initiate actions or move on their own
						if ( getCurrentRoomInfo().connections != null ) {
							this.roomPassage += getCurrentRoomInfo().displayConnections() + " \n";
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
								} else if ( sEvent.label == "challenge" || sEvent.label == "liberationChallenge" ) {
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
					
					if ( this.roomActionsMessage != "" ) {
						this.roomPassage += this.roomActionsMessage + "\n\n";
						this.roomActionsMessage = "";
					}
				
					this.roomPassage += this.displayCharactersInRoom() + " \n";
					
					if ( State.variables.chPlayerCharacter.hasFreeBodypart("eyes") ) {
						this.roomPassage += this.displayEventsInRoom(getCurrentRoomInfo().key);
					} else {
						this.roomPassage += "Having your vision blocked prevents you from seeing what's happening.\n"
					}
					
					if ( getCurrentMap().icon ) {
						var coords = this.getCursorCoordinates();
						this.roomPassage += "\n\n<div align='center' id='mapDiagram'>";
						this.roomPassage += '<img src="img/maps/' + getCurrentMap().icon + '" id="mapImage" usemap="#image_map"/>\n';
						this.roomPassage += '<img src="img/mapCursor.png" id="mapCursor" '
										  + 'style="position:relative;left:' + coords[0] + 'px;top:' + coords[1] + 'px"/>'
										  + "</div>";
						// Areas map
						this.roomPassage += '\n<map name="image_map">';
						if ( getCurrentRoomInfo().getConnections(["chPlayerCharacter"]) != null ) {
							if ( gC("chPlayerCharacter").followingTo == "" ) {
								for ( var con of getCurrentRoomInfo().getConnections(["chPlayerCharacter"]) ) {
									var ri = getRoomInfoA(con.loc);
									this.roomPassage += '<area class="roomAreaButton" title="' + ri.title + '" coords="' + ri.getAreaCoordinates() + '" shape="rect" room-key="' + con.loc + '" travel-time="' + con.distance + '" data-passage="Map" data-setter="State.variables.compass.playerMovesToRoom(\'' + con.loc + '\',' + con.distance + ')" >\n';
								}
							}
						}						
						this.roomPassage += "</map>";
					}
				} else { // Player is prompted
					this.roomPassage += this.promptPassage;
				}
			}
		} else { 													// Scenario has ended, scenarioEndPassage should lead to next gameplay section
			this.roomPassage = this.scenarioEndPassage;
		}
	}
	window.clickRoomIconEvent = function() {
		State.variables.compass.playerMovesToRoom(this.getAttribute("room-key"),parseInt(this.getAttribute("travel-time")));
		state.display("Map");
	}

	window.adjustCursorPosition = function() {
		var cursorObject = document.getElementById("mapCursor");
		cursorObject.style.position = 'relative';
		cursorObject.style.left = '100px';
		cursorObject.style.top = '100px';
	}
	Compass.prototype.getCursorCoordinates = function() {
		var mapDimensions = getCurrentMap().diagramDimensions;
		// Adjust for map dimensions
		var coords = [-(mapDimensions[0]/2),-(mapDimensions[1])];
		// Adjust for cursor dimensions
		coords[0] += setup.cursorHalfX;
		coords[1] -= setup.cursorHalfY;
		// Adjust for room position in map
		coords[0] += getCurrentRoomInfo().mapPos[0];
		coords[1] += getCurrentRoomInfo().mapPos[1];
		return coords;
	}
	Compass.prototype.refreshRightUImap = function() {
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
	
	Compass.prototype.displayCurrentRoomActions = function() { // Returns the text required to display the current room actions to the player.
		var text = "";
		var actions = getCurrentRoomInfo().getActions(this.getPlayerGroupChars());
		if ( actions.length > 0 ) {
			var i = 0;
			for ( var action of actions ) {
				if ( action.requirements(this.getPlayerGroupChars()) ) {
					text += action.title + action.displayDescriptionMark() + ' <<link [[Execute|' + action.getPassage() + ']]>><<script>>'
										 + 'getCurrentRoomInfo().getActions(getPlayerCharsGroup())[' + i + '].eventToPile('
										 + action.recMins + ',State.variables.compass.getPlayerGroupChars());'
										 // This sends a systemEvent to pile, that should eventually be executed
										 + 'State.variables.compass.pushAllTimeToAdvance();'
										 + '<</' + 'script>><</' + 'link>>';
										 
					if ( action.flexibleTimes ) { // Extra buttons to allow the player to select time multiples
						text += ' / <<link [[x2|Interlude]]>><<script>>'
							 + 'getCurrentRoomInfo().getActions(getPlayerCharsGroup())[' + i + '].eventToPile('
							 + (action.recMins * 2) + ',State.variables.compass.getPlayerGroupChars());'
							 + 'State.variables.compass.pushAllTimeToAdvance();'
							 + '<</' + 'script>><</' + 'link>>';
						text += ' / <<link [[x3|Interlude]]>><<script>>'
							 + 'getCurrentRoomInfo().getActions(getPlayerCharsGroup())[' + i + '].eventToPile('
							 + (action.recMins * 3) + ',State.variables.compass.getPlayerGroupChars());'
							 + 'State.variables.compass.pushAllTimeToAdvance();'
							 + '<</' + 'script>><</' + 'link>>';
						text += ' / <<link [[x4|Interlude]]>><<script>>'
							 + 'getCurrentRoomInfo().getActions(getPlayerCharsGroup())[' + i + '].eventToPile('
							 + (action.recMins * 4) + ',State.variables.compass.getPlayerGroupChars());'
							 + 'State.variables.compass.pushAllTimeToAdvance();'
							 + '<</' + 'script>><</' + 'link>>';
						text += ' / <<link [[x5|Interlude]]>><<script>>'
							 + 'getCurrentRoomInfo().getActions(getPlayerCharsGroup())[' + i + '].eventToPile('
							 + (action.recMins * 5) + ',State.variables.compass.getPlayerGroupChars());'
							 + 'State.variables.compass.pushAllTimeToAdvance();'
							 + '<</' + 'script>><</' + 'link>>';
						text += ' / <<link [[x1/2|Interlude]]>><<script>>'
							 + 'getCurrentRoomInfo().getActions(getPlayerCharsGroup())[' + i + '].eventToPile('
							 + (action.recMins * 0.5) + ',State.variables.compass.getPlayerGroupChars());'
							 + 'State.variables.compass.pushAllTimeToAdvance();'
							 + '<</' + 'script>><</' + 'link>>';
							 
					}
					
					text += "\n";
				}
				i++;	  
			}
		}
		
		if ( getCurrentRoomInfo().getCustomActionsText != undefined ) {
			text += getCurrentRoomInfo().getCustomActionsText(this.getPlayerGroupChars());
		}
		return text;
	}
		
	Compass.prototype.displayCharactersInRoom = function() {
		var text = "__Characters in room__:\n";
		var i = 1;
		for ( var character of this.getCurrentRoom().characters ) {
			if ( gC(character).icon != null ) { // Icon
				text += gC(character).icon() + " ";
			}
			text += gC(character).getFormattedName(); // Name
			if ( gC("chPlayerCharacter").cbl.includes(character) ) {
				text += '<span title="' + "You have a casus belli against this character. Your next assault or challenge against them will cost you no infamy." + '">' + colorText(" (!)","firebrick"); + '</span>';
			}
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
						if ( this.findFirstSisIdInvolvingCharacter("chPlayerCharacter") == -1 ) {
							text += " ( " + rFormatPlayerFavor(character) + " " + this.getButtonAskToUnfollowThem(character) + " ) , ";
						}
					}
					else if ( gC(character).followedBy.length > 0 ) { // Target is leader
						if ( gC(character).domChar == "chPlayerCharacter" ) {
							text += " ( " + rFormatPlayerFavor(character) + " " + this.getButtonAskToGetFollowed(character) + " , " + this.getButtonAskToFollowTo(character) + " ) , ";
						}
						else if ( State.variables.chPlayerCharacter.followedBy.length < 1 && State.variables.chPlayerCharacter.followingTo != character ) {
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
			if ( mayCharBeInterrupted(character) && State.variables.settings.talkingAllowed == true ) {
				if ( gC("chPlayerCharacter").followingTo == "" && ( gC(character).followingTo == "" || gC(character).followingTo == "chPlayerCharacter" ) ) {			
					if ( this.canCharBeInteracted(character) && ( character != "chPlayerCharacter" ) && ( charInSis == false ) ) { // Interaction button
						text += " ( " + this.getButtonBeginSocialInteraction(character) + " , " + this.getButtonBeginSocialInteractionSpecifics(character) + " )";
					}
					else if ( charInSis ) {
						text += " ( " + this.getButtonJoinConversation(this.getCharacterSisId(character)) + " )";
					}
				}
				else if ( gC("chPlayerCharacter").followingTo == character ) {
					if ( this.findFirstSisIdInvolvingCharacter("chPlayerCharacter") == -1 ) {
						text += " ( " + this.getButtonAskToUnfollowThem(character) + " ) ";
					}
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
				if ( mayBattleBeJoined(tEvent) ) {
					text += " (" + this.getButtonJoinCombatWillingly(character) + ")";
				}
			}
			
			text += "\n";
			i++;
		}
		return text;
	}
	
	Compass.prototype.getEventDisplayInfo = function(sEvent) {
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
		else if ( sEvent.title == "battle" ) {
			text += "engaged in ";
			if ( sEvent.label == "assault" ) {
				text += "an assault initiated by " + gC(sEvent.charactersTeamA[0]).getFormattedName() + " against " + gC(sEvent.charactersTeamB[0]).getFormattedName() + ".";
			} else { // "challenge"
				text += "a challenge initiated by " + gC(sEvent.charactersTeamA[0]).getFormattedName() + " against " + gC(sEvent.charactersTeamB[0]).getFormattedName() + ".";
			}
			text += " This may continue for at least " + sEvent.timeRemaining + " minutes.";
		}
		else {
			text += "engaged in " + sEvent.name + ". This may continue for " + sEvent.timeRemaining + " minutes.";
		}
		
		return text;
	}
	Compass.prototype.displayEventsInRoom = function(roomKey) {
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
	
	Compass.prototype.setInterludeInfo = function(passageText) {
		this.interludePassage = passageText + "[[Return to Map" + "|Map]]";
	}
	Compass.prototype.setInterludeTrigger = function(uniquePassageText) {
		this.interludePassage = uniquePassageText;
	}
	
	Compass.prototype.setMapMessage = function(msg) {
		if ( this.roomMessage != "" ) { this.roomMessage += "\n"; }
		this.roomMessage += msg;
	}
	Compass.prototype.setMapActionsMessage = function(msg) {
		if ( this.roomActionsMessage != "" ) { this.roomActionsMessage += "\n"; }
		this.roomActionsMessage += msg;
	}
	
	// UI - Buttons
	Compass.prototype.canCharBeInteracted = function(charKey) {
		var flagCharAllowsSocialInteractions = gC(charKey).availableSocialInteractions;
		
		
		return flagCharAllowsSocialInteractions;
	}
	Compass.prototype.getButtonBeginSocialInteraction = function(targetCharacter) {
		var bText = "<<l" + "ink [[Talk|Social Interactions]]>><<s" + "cript>>\n";
		bText 	 += "eitherCreateSisOrRejectSis('" + targetCharacter + "');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	Compass.prototype.getButtonBeginSocialInteractionSpecifics = function(targetCharacter) {
		var bText = "<<l" + "ink [[Discuss topic|Social Interactions Specifics]]>><<s" + "cript>>\n";
		bText 	 += "eitherCreateSisOrRejectSis('" + targetCharacter + "');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	Compass.prototype.getButtonJoinConversation = function(targetSIS) {
		var bText = "<<l" + "ink [[Join conversation|Social Interactions]]>><<s" + "cript>>\n";
		bText	 += "State.variables.compass.sisList[" + targetSIS + "].playerRequestsJoin();"
		bText	 += "State.variables.compass.sisList[" + targetSIS + "].charsJoinSis(getCharGroup('chPlayerCharacter'));\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	Compass.prototype.getButtonAskToGetFollowed = function(targetCharacter) {
		var bText = "<<l" + "ink [[Ask to follow you|Map]]>><<s" + "cript>>\n";
		bText 	 += "aAsksBtoFollowA('chPlayerCharacter','" + targetCharacter + "');\n";
		//"charFollowsChar('" + targetCharacter + "','chPlayerCharacter');\n";
		//bText	 += "State.variables.compass.setMapMessage('" + gC(targetCharacter).name + " accepted and will now follow you.');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	Compass.prototype.getButtonAskToFollowTo = function(targetCharacter) {
		var bText = "<<l" + "ink [[Ask to follow them|Map]]>><<s" + "cript>>\n";
		bText 	 += "aAsksBtoFollowB('chPlayerCharacter','" + targetCharacter + "');\n";
		//bText 	 += "charFollowsChar('chPlayerCharacter','" + targetCharacter + "');\n";
		//bText	 += "playerJoinsTargetChar('" + targetCharacter + "');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	Compass.prototype.getButtonAskToUnfollowThem = function(targetCharacter) {
		var bText = "<<l" + "ink [[Ask to unfollow them|Map]]>><<s" + "cript>>\n";
		bText 	 += "aAsksBtoUnfollowB('chPlayerCharacter','" + targetCharacter + "');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	Compass.prototype.getButtonAskToUnfollowYou = function(targetCharacter) {
		var bText = "<<l" + "ink [[Ask to unfollow you|Map]]>><<s" + "cript>>\n";
		bText 	 += "aAsksBtoUnfollowA('chPlayerCharacter','" + targetCharacter + "');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	Compass.prototype.getButtonContinueAsFollower = function(nextPassage) {
		var bText = "<<l" + "ink [[Continue|" + nextPassage + "]]>><<s" + "cript>>\n";
		bText 	 += "State.variables.compass.wakeUpFakeActiveChars();\n";
		bText 	 += "State.variables.compass.pushAllTimeToAdvanceAsFollower();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;		
	}
	Compass.prototype.getButtonJoinAndAdvanceToConversation = function(targetSIS) {
		var bText = "<<l" + "ink [[Continue to conversation|Social Interactions]]>><<s" + "cript>>\n";
		bText	 += "State.variables.compass.sisList[" + targetSIS + "].playerRequestsJoin();"
		bText	 += "State.variables.compass.sisList[" + targetSIS + "].charsJoinSis(getCharGroup('chPlayerCharacter'));\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	Compass.prototype.getButtonAssault = function(target) {
		var bText = "<<l" + "ink [[ Aslt |Interlude]]>><<s" + "cript>>\n";
		bText 	 += "initiatePlayerAssault('" + target + "');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	Compass.prototype.getButtonChallenge = function(target) {
		var bText = "<<l" + "ink [[ Chlg |Interlude]]>><<s" + "cript>>\n";
		bText 	 += "setUpPlayerChallengeOptions('" + target + "');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	Compass.prototype.getButtonLiberationChallenge = function(target) {
		var bText = "<<l" + "ink [[ Liberation Challenge |Interlude]]>><<s" + "cript>>\n";
		bText 	 += "initiateLiberationChallenge('chPlayerCharacter','" + target + "');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}		
	
	Compass.prototype.getButtonSpectateCombat = function(target) {
		var bText = "<<l" + "ink [[Spectate Combat|Scene]]>><<s" + "cript>>\n";
		bText += "addSpectatorsToCharsBattle('" + target + "',getCharGroup('chPlayerCharacter'));\n";
		bText += "State.variables.compass.pushAllTimeToAdvance();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	Compass.prototype.getButtonJoinCombatForced = function() {
		var bText = "<<l" + "ink [[Join combat|Scene]]>><<s" + "cript>>\n";
		bText += "State.variables.compass.pushAllTimeToAdvance();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	Compass.prototype.getButtonJoinCombatWillingly = function(joinedChar) {
		var bText = "<<l" + "ink [[Join combat on their side|Scene]]>><<s" + "cript>>\n";
		bText += 'addCharsTeamToCharsBattle("chPlayerCharacter","' + joinedChar + '");\n';
		bText += "State.variables.compass.pushAllTimeToAdvance();\n";
		bText += "State.variables.sc.formatScenePassage();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	Compass.prototype.getButtonSpectateCombatAlt = function(target) {
		// Used when the player is already spectating the combat
		var bText = "<<l" + "ink [[Spectate Combat|Scene]]>><<s" + "cript>>\n";
		bText += "State.variables.compass.pushAllTimeToAdvance();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
Compass.prototype.cleanLeftoverData = function() { // Must be used before saving the game
	this.roomPassage = "";
	this.interludePassage = "";
	this.sceneResultsPassage = "";
	this.sceneResultsTemp = "";
	this.scenarioEndPassage = "";
	
	this.roomMessage = "";
	this.roomActionsMessage = "";
	
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
	
	// Debug
	this.debugInfo = "";	
}

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
	this.icon = null;
	this.rooms = new Rooms();
	this.characters = []; // Keys of characters currently present in map. Remember to clean.
	this.diagramDimensions = [100,100]; // Dimensions of the minimap file
};

Chart.prototype.autogenerateRooms = function(setupChart) {
	for ( var i in setup[setupChart] ) {
		var r = setup[setupChart][i];
		if ( r instanceof RoomInfo ) {
			this.rooms[r.key] = new Room(r.key,r.title);
			this.rooms[r.key].combatAllowed = r.combatAllowed;
		}
	}
}

	Chart.prototype.placeCharacter = function(charKey,roomKey) {
		gC(charKey).currentRoom = roomKey;
		this.rooms[roomKey].characters.push(charKey);
		this.characters.push(charKey);
	}
	Chart.prototype.placeCharacters = function(charKeys,roomKey) {
		for ( var character of charKeys ) {
			this.placeCharacter(character,roomKey);
		}
	}
	Chart.prototype.cleanCharacters = function() {
		for ( var character of this.characters ) {
			getRoomA(gC(character).currentRoom).characters = [];
			gC(character).currentRoom = "";
		}
		this.characters = [];
	}

	Chart.prototype.getAllRooms = function() {
		var rooms = [];
		for ( var room in this.rooms ) {
			if ( this.rooms[room] instanceof Room ) {
				rooms.push(this.rooms[room]);
			}
		}
		return rooms;
	}

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


////////// ROOM CLASS & ROOM INFO CLASS //////////
// Rooms are in-game locations, containing different actions, connections to other rooms, characters, descriptions, etc.

window.Room = function(key,title) {
	
	this.key = key;
	this.title = title;
	/*
	this.medIcon = "windrose-med.png";
	this.icon = "windrose.png";
	
	this.description = "";
	this.getDescription = function() {
		return this.description;
	}
	
	this.connections = null; // Connections refers to connected rooms in the same map, referenced by their keys.
	this.displayConnections = null;
							 // The connections are displayed as a set of links provided by a function. The function must be created manually.
																									// A dynamic function may be created later.
	
	this.getConnections = function(characterGroup) { // Returned to AIs. Will only send back valid room connections.
		return this.connections;
	}
	*/
	this.characters = []; // Keys of characters currently present in this room.
	/*
	this.getActions = function(characters) {	// Returns a list of map actions available in this room.
		return [];
	}
	
	this.getCustomActionsText = null;
	*/
	this.combatAllowed = true;
};

window.RoomInfo = function(key,title,medIcon,icon,description,connections,getActions,mapPos) {
	this.key = key;
	this.title = title;
	this.medIcon = medIcon;
	this.icon = icon;
	this.description = description;
	this.connections = connections;
	if ( getActions != null ) {
		this.getActions = getActions;
	} else {
		this.getActions = function(characters) {	// Returns a list of map actions available in this room.
			return [];
		}
	}
	this.getCustomActionsText = null;
	this.combatAllowed = true;
	
	this.mapPos = mapPos; // Position of icon in map diagram
	this.setSubarea = null; // If not null, it is a function that sets a new subarea bottom map when the player gets here
	this.getSpecialAreaCoordinates = null; // If not null, it is a function that returns different areas depending on different circumstances
}

	RoomInfo.prototype.getDescription = function() {
		return this.description;
	}
	RoomInfo.prototype.getConnections = function(characterGroup) { // Returned to AIs. Will only send back valid room connections.
		return this.connections;
	}
	RoomInfo.prototype.displayConnections = function() {
		return createStandardDisplayConnections(this.connections);
	}
	RoomInfo.prototype.getAreaCoordinates = function() {
		var coords = "";
		if ( this.getSpecialAreaCoordinates ) { coords = this.getSpecialAreaCoordinates() }
		else {
			coords = "" + this.mapPos[0] + ',' + this.mapPos[1] + ',' + (this.mapPos[0]+20) + ',' + (this.mapPos[1]+20);
		}
		return coords;
	}

window.createStandardDisplayConnections = function(connections) {
	var string = "";
	for ( var connection of connections ) {
		string += getLinkToRoom(connection.loc,"Go to " + getCurrentMap().rooms[connection.loc].title,connection.distance)
			    + " (" + colorText(connection.distance,"khaki") + ") ";
				if ( State.variables.chPlayerCharacter.hasFreeBodypart("eyes") ) {
					string += displayCharIconsInRoom(connection.loc);
				}
		string += "\n";
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

RoomInfo.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
RoomInfo.prototype.clone = function () {
	return (new RoomInfo())._init(this);
};
RoomInfo.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new RoomInfo())._init($ReviveData$)', ownData);
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
	
	this.requirements = function(charGroup) {  // This function checks if the characters are able to perform the action
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
	
	this.getPassage = function() { return "Interlude" };
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
	this.label = null; // Doesn't always have to be anything
	
	this.timeRemaining = minutes;
	this.ongoingTime = 0; // Used in effect to calculate dimension of effects
	this.priority = 0; // If events must be purged, those with the highest priority will remain
	
	this.characters = characters;
	this.effect = effect;
	
	this.extraMessages = [];

	this.flagMayBeInterrupted = true;
	this.flagMayChangeGroups = true; // If false, character can't be invited or forced to join or leave group
	
	this.flagForcedToEnd = false;
	this.applyEffectIfForcedToEnd = true; // If false, effect will not apply
	
	this.flagSignCharsAsIdleOnEnd = true; // If true, characters' AI may get a new goal when the event ends
	this.flagDontPushTimeYet = false; // This must be set to true on creation if the event will be created during
									  // pushTimeToOngoingEvents
									  
	this.executeWithoutCharacters = false;
	
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
					if ( this.characters.length > 0 || this.executeWithoutCharacters ) {
						effectMsg = this.effect(this.characters);
					}
				}
			}
			else if ( this.timeRemaining <= 0 ) {			// Finished at its correct time
				if ( this.characters.length > 0 || this.executeWithoutCharacters ) {
					effectMsg = this.effect(this.characters); // Event gets executed
				}
				
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
			//signCharsIdle(this.characters);
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

