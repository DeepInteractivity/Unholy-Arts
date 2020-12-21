
////////// NPC-MAP-AI CLASS //////////

window.NpcMapAi = function(charKey) {
	this.charKey = charKey;
	this.type = "static";
	this.state = "idle"; // "idle" -> Not participating in any event ; "active" -> Participating in an event
	this.goalsList = []; // List of chosen actions to execute in order.
	this.previousGoals = [];
	
	this.tryNewGoal = function() {
		var flagSuccess = true;
		
		if ( this.goalsList.length > 0 && ( this.charKey != "chPlayerCharacter" ) ) {
			if ( this.goalsList[0] != undefined ) {
				this.previousGoals.push(this.goalsList[0].type);
			}
			if ( this.goalsList[0].isValid() ) {
				this.goalsList[0].createEvent();
				this.previousGoals.push("Was valid");
				this.goalsList.splice(0,1);
			}
			else {
				flagSuccess = false;
			}
		}
		else {
			flagSuccess = false;
		}
		
		return flagSuccess;
	}
	
	this.signIdle = function() {
		if ( gC(this.charKey).followingTo == "" ) {
			this.state = "idle";
		}
	}
	this.signActive = function() {
		if ( this.type != "static" ) {
			if ( this.charKey == "chPlayerCharacter" ) {
				
			}
			this.state = "active";
		}
	}
	
	
	/////////// PROVISIONAL ///////////
	this.main = function() { // General function for the AI to regulate itself. It must be executed regularly.
		
		if ( this.type != "static" ) {
			var sisKey = State.variables.compass.findFirstSisIdInvolvingCharacter(this.charKey);
			
			if ( this.state == "idle" && sisKey == -1 ) {
				if ( State.variables.compass.flagEndedScenario == false ) {
					gC(this.charKey).globalAi.generalEvaluations();
				}
				if ( this.tryNewGoal() ) { // Try new mission
				}
				else { // New mission couldn't be executed
					this.goalsList = [];
					if ( this.createNewMission != null ) {	// TO EDIT IN THE FUTURE
						this.getNewGoals();
						
						if ( this.goalsList.length > 0 ) {
							this.tryNewGoal();
						}
						// this.createNewMission(getCurrentMap().key,[charKey])); // Provisional name? Generates a new list of goals
					}
				}
			}
		}
	}
	/////////////////////////////////////
	
	this.getNewGoals = function() {
		var newGoals = 0;
		if ( gC(this.charKey).globalAi.type != "static" ) {
			newGoals = gC(this.charKey).globalAi.getMission();
		}
		else {
			newGoals = this.createNewMission(getCurrentMap().key,[this.charKey]);
		}
		for ( var goal of newGoals ) {
			this.goalsList.push(goal);
		}
	}
	this.createNewMission = null; //function() {
	//}
};

// Constructors, serializers, etc.
NpcMapAi.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
NpcMapAi.prototype.clone = function () {
	return (new NpcMapAi())._init(this);
};
NpcMapAi.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new NpcMapAi())._init($ReviveData$)', ownData);
};

////////// MAP-AI-GOAL CLASS //////////

window.createMapAiGoalMoveTo = function(charKey,goalRoom) {
	var goal = new MapAiGoal(charKey);
	goal.type = "movement";
	goal.goalRoom = goalRoom;
	goal.isValid = function() {		// Checks if the goal may be reached
		return checkMoveTo(State.variables.compass.getCharactersGroup(charKey),gC(charKey).currentRoom,goalRoom);
	}
	goal.createEvent = function() {	// Adds an event to the events pile
		var connection = null;
		var charsGroup = State.variables.compass.getCharactersGroup(this.charKey);
		
		for ( var con of getRoomA(gC(this.charKey).currentRoom).getConnections(charsGroup) ) {
			if ( con.loc == this.goalRoom ) {
				connection = con;
			}
		}
		var sEvent = createSystemEventMovementByConnection(connection,charsGroup);
		eventToPile(sEvent);
	}
	return goal;
}

window.createMapAiGoalAction = function(charKey,goalRoom,goalAction,minutes) {
	var goal = new MapAiGoal(charKey);
	goal.type = "action";
	goal.goalRoom = goalRoom;
	goal.goalAction = goalAction;
	goal.minutes = minutes;
	goal.isValid = function() { // Checks if the goal may be executed
		 return checkMapAction(State.variables.compass.getCharactersGroup(charKey),goal.goalRoom,goal.goalAction);
	}
	goal.createEvent = function() { // Adds an event to the events pile
		 var mapAction = null;
		 var charsGroup = State.variables.compass.getCharactersGroup(this.charKey);
		 for ( var mapA of getRoomA(this.goalRoom).getActions(charsGroup) ) {
			 if ( this.goalAction == mapA.key ) {
				 mapAction = mapA;
			 }
		 }
		 if ( mapAction != null ) {
			 mapAction.eventToPile(minutes,charsGroup);
		 }
	}
	
	return goal;
}

window.createMapAiGoalTalkTo = function(charKey,targetCharKey) {
	var goal = new MapAiGoal(charKey);
	goal.type = "talkTo";
	goal.targetChar = targetCharKey;
	goal.targetCharGroup = getCharGroup(goal.targetChar);
	
	goal.isValid = function() { // Checks if the goal may be executed
		return checkTalkTo(State.variables.compass.getCharactersGroup(this.charKey),this.targetChar);
	}
	goal.createEvent = function() { // Adds an event to the events pile
		var flagPlayerIsInvolved = false;
		var flagTargetIsInSis = State.variables.compass.isCharacterInSis(this.targetChar);
		
		if ( flagTargetIsInSis ) {				   // Joining already stablished conversation
			State.variables.compass.sisList[State.variables.compass.getCharacterSisId(this.targetChar)].charJoinsSis(this.charKey);
			State.variables.compass.sisList[State.variables.compass.getCharacterSisId(this.targetChar)].importantMessages +=
				getCharNames(getCharGroup(this.charKey)) + " joined the conversation.\n";
		}
		else {
			var flagSetIdle = true;
			if ( this.targetCharGroup[0] == "chPlayerCharacter" ) { flagPlayerIsInvolved = true; }
			if ( flagPlayerIsInvolved == false ) { // Initiating conversation with NPC
				if ( doesTargetAcceptConversation(this.charKey,this.targetChar)[0] ) { // Ask character to start conversation
					var characters = State.variables.compass.getCharactersGroup(this.charKey).concat(State.variables.compass.getCharactersGroup(this.targetChar));
					State.variables.compass.createNewSis(characters);
					flagSetIdle = false;
				}
				if ( flagSetIdle ) {
					this.state = "idle";
				}
			} else {							   // Initiating conversation with Player
				if ( State.variables.compass.flagPlayerIsPrompted == false ) {
					var playerEvent = State.variables.compass.findFirstEventInvolvingPlayer();
					var flagPlayerIsSub = false;
					if ( gC("chPlayerCharacter").domChar == this.charKey ) {
						flagPlayerIsSub = true;
					}
					var p = gC(this.charKey).getFormattedName() + " wants to talk to you.\n\n";
					if ( playerEvent == null ) {
						p += getButtonAcceptConversation(this.charKey) + "\n";
						if ( flagPlayerIsSub ) {
							p += colorText("Locked: ","red") + "You can't refuse a conversation from a character you're submissive to.";
						} else {
							p += getButtonRejectConversation(this.charKey);
						}
						State.variables.compass.setPlayerPrompt(p);
					} else {
						p += getButtonAcceptConversationInterrupted(this.charKey) + "\n";
						if ( flagPlayerIsSub ) {
							p += colorText("Locked: ","red") + "You can't refuse a conversation from a character you're submissive to.";
						} else {
							p += getButtonRejectConversationInterrupted(this.charKey);
						}
						State.variables.compass.interruptPlayer(p);
					}
				}
			}
		}
	}
	return goal;
}
window.createMapAiGoalPursueAndTalkTo = function(charKey,targetCharKey) {
	var goal = new MapAiGoal(charKey);
	goal.type = "pursueAndTalkTo";
	goal.targetChar = targetCharKey;
	
	goal.initialDistance = -1;
	goal.walkedDistance = 0;
	
	goal.isValid = function() {
		var flagIsValid = true;
		if ( getCurrentMap().characters.includes(this.targetChar) == false ) {
			flagIsValid = false;
		}
		else if ( ( this.initialDistance != -1 ) && ( this.advancedDistance > this.initialDistance * 2 ) ) {
			flagIsValid = false;
		}
		return flagIsValid;
	}
	goal.createEvent = function() {
		if ( gC(this.charKey).currentRoom == gC(this.targetChar).currentRoom ) { // Target in same room
			if ( checkTalkTo(State.variables.compass.getCharactersGroup(this.charKey),this.targetChar) ) { // Target may be talked to
				createMapAiGoalTalkTo(this.charKey,this.targetChar).createEvent();
				gC(this.charKey).mapAi.signActive();
			}
			else { // Target may not be talked to
				// Abort mission
			}
		}
		else { // Target not in same room
			// Check if initial distance exists
			if ( this.initialDistance == -1 ) {
				var initialRoute = getRouteToCharacter(getCurrentMap().key,getCharGroup(this.charKey),this.targetChar);
				this.initialDistance = initialRoute.length;
			}
			if ( this.walkedDistance < this.initialDistance * 2 ) {
				
				// Create route towards NPC
				var currentRoute = getRouteToCharacter(getCurrentMap().key,getCharGroup(this.charKey),this.targetChar);
				if ( currentRoute.length > 0 ) {
					// Create event to move towards next room
					createMapAiGoalMoveTo(this.charKey,currentRoute[0]).createEvent();
					this.walkedDistance++;
					// Create new goal on this character's mapAi with an extra advanced distance and set initial distance
					var goal = createMapAiGoalPursueAndTalkTo(this.charKey,this.targetChar);
					goal.initialDistance = this.initialDistance;
					goal.walkedDistance = this.walkedDistance;
					gC(this.charKey).mapAi.goalsList.push(goal);
				}
			}
		}
	}
	return goal;
}

window.createMapAiGoalAssault = function(charKey,targetCharKey) {
	var goal = new MapAiGoal(charKey);
	goal.type = "assault";
	goal.targetChar = targetCharKey;
	
	goal.isValid = function() { // Checks if the goal may be executed
		return checkMayAssault(getCharGroup(this.charKey),this.targetChar);
	}
	goal.createEvent = function() { // Adds an event to the events pile
		var flagPlayerIsInvolved = false;
		var flagTargetIsInSis = State.variables.compass.isCharacterInSis(this.targetChar);
		
		var flagSetIdle = true;
		if ( this.targetChar == "chPlayerCharacter" ) { flagPlayerIsInvolved = true; }
		if ( flagPlayerIsInvolved == false ) { // Assaulting another NPC
			initiateNpcAssault(charKey,targetCharKey);
		} else {							   // Assaulting Player
			if ( State.variables.compass.flagPlayerIsPrompted == false ) {
				var playerEvent = State.variables.compass.findFirstEventInvolvingPlayer();
				initiateNpcAssault(charKey,targetCharKey);
				var p = gC(charKey).getFormattedName() + " is assaulting you!\n\n";
				p += getButtonBeingAssaulted(charKey);
				if ( playerEvent == null ) {
					State.variables.compass.setPlayerPrompt(p);
				} else {
					State.variables.compass.interruptPlayer(p);
				}
			}
		}
	}
	return goal;
}
window.createMapAiGoalChallenge = function(charKey,targetCharKey) {
	var goal = new MapAiGoal(charKey);
	goal.type = "challenge";
	goal.targetChar = targetCharKey;
	
	goal.isValid = function() { // Checks if the goal may be executed
		return checkMayChallenge(getCharGroup(this.charKey),this.targetChar);
	}
	goal.createEvent = function() { // Adds an event to the events pile
		var flagPlayerIsInvolved = false;
		var flagTargetIsInSis = State.variables.compass.isCharacterInSis(this.targetChar);
		var stakes = limitedRandomInt(2) + 1;
		
		var flagSetIdle = true;
		if ( this.targetChar == "chPlayerCharacter" ) { flagPlayerIsInvolved = true; }
		if ( flagPlayerIsInvolved == false ) { // Assaulting another NPC
			initiateNpcToNpcChallenge(charKey,targetCharKey,stakes);
		} else {							   // Assaulting Player
			if ( State.variables.compass.flagPlayerIsPrompted == false ) {
				var playerEvent = State.variables.compass.findFirstEventInvolvingPlayer();
				var stakesMsg = "";
				switch ( stakes ) {
					case 1:
						stakesMsg = "low stakes";
						break;
					case 2:
						stakesMsg = "medium stakes";
						break;
					case 3:
						stakesMsg = "high stakes";
						break;
				}
				var p = gC(charKey).getFormattedName() + " is challenging you for " + stakesMsg + "!\nRefusing the challenge will make you lose merit.\n\n";
				p += getButtonAcceptChallenge(charKey,stakes) + "\n" + getButtonRejectChallenge(charKey,stakes);
				if ( playerEvent == null ) {
					State.variables.compass.setPlayerPrompt(p);
				} else {
					State.variables.compass.interruptPlayer(p);
				}
			}
		}
	}
	return goal;
}

window.createMapAiGoalPursueAndAssault = function(charKey,targetCharKey) {
	var goal = new MapAiGoal(charKey);
	goal.type = "pursueAndAssault";
	goal.targetChar = targetCharKey;
	
	goal.initialDistance = -1;
	goal.walkedDistance = 0;
	
	goal.isValid = function() {
		var flagIsValid = true;
		if ( getCurrentMap().characters.includes(this.targetChar) == false ) {
			flagIsValid = false;
		}
		else if ( ( this.initialDistance != -1 ) && ( this.advancedDistance > this.initialDistance * 2 ) ) {
			flagIsValid = false;
		}
		return flagIsValid;
	}
	goal.createEvent = function() {
		if ( gC(this.charKey).currentRoom == gC(this.targetChar).currentRoom ) { // Target in same room
			if ( checkMayAssault(getCharGroup(this.charKey),this.targetChar) ) { // Target may be talked to
				createMapAiGoalAssault(this.charKey,this.targetChar).createEvent();
				gC(this.charKey).mapAi.signActive();
			}
			else { // Target may not be talked to
				// Abort mission
			}
		}
		else { // Target not in same room
			// Check if initial distance exists
			if ( this.initialDistance == -1 ) {
				var initialRoute = getRouteToCharacter(getCurrentMap().key,getCharGroup(this.charKey),this.targetChar);
				this.initialDistance = initialRoute.length;
			}
			if ( this.walkedDistance < this.initialDistance * 2 ) {
				
				// Create route towards NPC
				var currentRoute = getRouteToCharacter(getCurrentMap().key,getCharGroup(this.charKey),this.targetChar);
				if ( currentRoute.length > 0 ) {
					// Create event to move towards next room
					createMapAiGoalMoveTo(this.charKey,currentRoute[0]).createEvent();
					this.walkedDistance++;
					// Create new goal on this character's mapAi with an extra advanced distance and set initial distance
					var goal = createMapAiGoalPursueAndAssault(this.charKey,this.targetChar);
					goal.initialDistance = this.initialDistance;
					goal.walkedDistance = this.walkedDistance;
					gC(this.charKey).mapAi.goalsList.push(goal);
				}
			}
		}
	}
	return goal;
}
window.createMapAiGoalPursueAndChallenge = function(charKey,targetCharKey,stakes) {
	var goal = new MapAiGoal(charKey);
	goal.type = "pursueAndChallenge";
	goal.targetChar = targetCharKey;
	
	goal.initialDistance = -1;
	goal.walkedDistance = 0;
	
	goal.isValid = function() {
		var flagIsValid = true;
		if ( getCurrentMap().characters.includes(this.targetChar) == false ) {
			flagIsValid = false;
		}
		else if ( ( this.initialDistance != -1 ) && ( this.advancedDistance > this.initialDistance * 2 ) ) {
			flagIsValid = false;
		}
		return flagIsValid;
	}
	goal.createEvent = function() {
		
			// TO DO : EVERYTHING
		
		if ( gC(this.charKey).currentRoom == gC(this.targetChar).currentRoom ) { // Target in same room
			if ( checkMayChallenge(getCharGroup(this.charKey),this.targetChar) ) { // Target may be talked to
					// ToDo mapAiGoalGallenge
				createMapAiGoalChallenge(this.charKey,this.targetChar).createEvent();
				gC(this.charKey).mapAi.signActive();
			}
			else { // Target may not be challenged
				// Abort mission
			}
		}
		else { // Target not in same room
			// Check if initial distance exists
			if ( this.initialDistance == -1 ) {
				var initialRoute = getRouteToCharacter(getCurrentMap().key,getCharGroup(this.charKey),this.targetChar);
				this.initialDistance = initialRoute.length;
			}
			if ( this.walkedDistance < this.initialDistance * 2 ) {
				
				// Create route towards NPC
				var currentRoute = getRouteToCharacter(getCurrentMap().key,getCharGroup(this.charKey),this.targetChar);
				if ( currentRoute.length > 0 ) {
					// Create event to move towards next room
					createMapAiGoalMoveTo(this.charKey,currentRoute[0]).createEvent();
					this.walkedDistance++;
					// Create new goal on this character's mapAi with an extra advanced distance and set initial distance
					var goal = createMapAiGoalPursueAndChallenge(this.charKey,this.targetChar);
					goal.initialDistance = this.initialDistance;
					goal.walkedDistance = this.walkedDistance;
					gC(this.charKey).mapAi.goalsList.push(goal);
				}
			}
		}
	}
	return goal;
}

window.MapAiGoal = function(charKey) {
	this.charKey = charKey;
	this.type = "none";
};

// Constructors, serializers, etc.
MapAiGoal.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
MapAiGoal.prototype.clone = function () {
	return (new MapAiGoal())._init(this);
};
MapAiGoal.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new MapAiGoal())._init($ReviveData$)', ownData);
};

////////// GOAL CHECKERS //////////

window.checkMoveTo = function(charGroup,currentRoomKey,goalRoomKey) {
	var cons = getCurrentMap().rooms[currentRoomKey].getConnections(charGroup);
	var validCon = false;
	for ( var con of cons ) {
		if ( goalRoomKey == con.loc ) {
			validCon = true; // Current room has a connection with goal room
		}
	}
	return validCon;
}

window.checkMapAction = function(charGroup,roomKey,mapActionKey) {
	var flagAllowed = false;
	for ( var mapAction of getRoomA(roomKey).getActions(charGroup) ) {
		if ( mapActionKey == mapAction.key ) {
			flagAllowed = true; // Current room allows to initiate goal action
		}
	}
	
	return flagAllowed;
}

window.checkTalkTo = function(charGroup,targetChar) {
	var flagAllowed = false;
	var flagAllowedInteraction = gC(targetChar).getIsAvailableForSocialInteractions(charGroup[0]); // True if target may join SIS
	var flagSameRoom = ( gC(targetChar).currentRoom == gC(charGroup[0]).currentRoom ); // True if they're at the same room
	
	var targetEvent = State.variables.compass.findFirstEventInvolvingCharacter(targetChar);
	var flagMayBeInterrupted = true; // True if the character's event may be interrupted or there's no event
	if ( targetEvent != null ) {
		if ( targetEvent.title != "sisRound" ) {
			flagMayBeInterrupted = mayCharBeInterrupted(targetChar);
			// flagMayBeInterrupted = State.variables.compass.findFirstEventInvolvingCharacter(targetChar).flagMayBeInterrupted;
		}
	}
	if ( flagAllowedInteraction && flagSameRoom && flagMayBeInterrupted ) {
		flagAllowed = true;
	}
	return flagAllowed;
}

window.checkMayAssault = function(charGroup,targetChar) {
	var flagAllowed = false;
	var flagAllowedAssault = isAssaultPossible(charGroup[0],targetChar); // True if assault is possible
	var flagSameRoom = ( gC(targetChar).currentRoom == gC(charGroup[0]).currentRoom ); // True if they're at the same room
	
	var targetEvent = State.variables.compass.findFirstEventInvolvingCharacter(targetChar);
	var flagMayBeInterrupted = true; // True if the character's event may be interrupted or there's no event
	if ( targetEvent != null ) {
		flagMayBeInterrupted = State.variables.compass.findFirstEventInvolvingCharacter(targetChar).flagMayBeInterrupted;
	}
	if ( flagAllowedAssault && flagSameRoom && flagMayBeInterrupted ) {
		flagAllowed = true;
	}
	return flagAllowed;
}
window.checkMayChallenge = function(charGroup,targetChar) {
	var flagAllowed = false;
	var flagAllowedChallenge = isChallengePossible(charGroup[0],targetChar); // True if assault is possible
	var flagSameRoom = ( gC(targetChar).currentRoom == gC(charGroup[0]).currentRoom ); // True if they're at the same room
	
	var targetEvent = State.variables.compass.findFirstEventInvolvingCharacter(targetChar);
	var flagMayBeInterrupted = true; // True if the character's event may be interrupted or there's no event
	if ( targetEvent != null ) {
		flagMayBeInterrupted = State.variables.compass.findFirstEventInvolvingCharacter(targetChar).flagMayBeInterrupted;
	}
	if ( flagAllowedChallenge && flagSameRoom && flagMayBeInterrupted ) {
		flagAllowed = true;
	}
	return flagAllowed;
}

////////// MISSIONS //////////

	// Auxiliar

		// Get map's actions
window.getAllActionsOnMap = function(chart,charsGroup) {
	var actions = [];
	var roomActions = null;
	var rooms = chart.getAllRooms();
	
	for ( var room of rooms ) {
		roomActions =  room.getActions(charsGroup);
		if ( roomActions.length > 0 ) {
			for ( var action of roomActions ) {
				actions.push(action);
			}
		}
	}
	
	return actions;
}

window.getAllActionsOnMapThat = function(chart,charsGroup,isValid) { // isValid is a function that checks the validity of the action
	var actions = getAllActionsOnMap(chart,charsGroup);
	var validActions = [];
	
	for ( var action of actions ) {
		if ( isValid(action) ) {
			validActions.push(action);
		}
	}
	
	return validActions;
	// Example: getAllActionsOnMapThat
	// (State.variables.mapTrainingGrounds,["chNash"],function(action) { if ( action.tags.includes("charisma") ) { return true; } else { return false; } });
}

		// Get routes
window.getRouteToClosestTrainingActivity = function(mapKey,charsGroup) {
	// Assumes the position of first character in charsGroup
	
	var isValid = function(roomKey) {
		var room = getRoomInMap(mapKey,roomKey);
		var flagValid = false;
		if ( room.tags.includes("training") ) { flagValid = true; }
		return flagValid;
	}
	
	var pathfinder = new Pathfinder(mapKey,charsGroup,gC(charsGroup[0]).currentRoom,isValid);
	var route = pathfinder.getShortestValidRoute();
	return route;
}
window.getRouteToClosestTaggedActivity = function(mapKey,charsGroup,tag) {
	// Assumes the position of first character in charsGroup
	
	var isValid = function(roomKey) {
		var room = getRoomInMap(mapKey,roomKey);
		var flagValid = false;
		for ( var action of room.getActions(charsGroup) ) {
			if ( action.tags.includes(tag) ) { flagValid = true; }
		}
		return flagValid;
	}
	
	var pathfinder = new Pathfinder(mapKey,charsGroup,gC(charsGroup[0]).currentRoom,isValid);
	var route = pathfinder.getShortestValidRoute();
	return route;
}
window.getRouteToClosestAltTaggedActivity = function(mapKey,charsGroup,tagsList) {
	// Assumes the position of first character in charsGroup
	
	var isValid = function(roomKey) {
		var room = getRoomInMap(mapKey,roomKey);
		var flagValid = false;
		for ( var action of room.getActions(charsGroup) ) {
			for ( var tag of tagsList ) {
				if ( action.tags.includes(tag) ) { flagValid = true; }
			}
		}
		return flagValid;
	}
	
	var pathfinder = new Pathfinder(mapKey,charsGroup,gC(charsGroup[0]).currentRoom,isValid);
	var route = pathfinder.getShortestValidRoute();
	return route;
}
window.getRouteToCharacter = function(mapKey,charsGroup,character) {
	// Assumes the target character is in map
	if ( gC(charsGroup[0]).currentRoom != gC(character).currentRoom ) {
		var roomKey = gC(character).currentRoom;
		var isValid = function(roomKey) {
			return ( roomKey == gC(character).currentRoom );
		}
		var pathfinder = new Pathfinder(mapKey,charsGroup,gC(charsGroup[0]).currentRoom,isValid);
		var route = pathfinder.getShortestValidRoute();
	} else {
		var route = [ gC(character).currentRoom ];
	}
	return route;
}
window.getRouteToRoom = function(mapKey,charsGroup,room) {
	// Assumes the target character is in map
	if ( gC(charsGroup[0]).currentRoom != room ) {
		var isValid = function(roomKey) {
			return ( roomKey == room );
		}
		var pathfinder = new Pathfinder(mapKey,charsGroup,gC(charsGroup[0]).currentRoom,isValid);
		var route = pathfinder.getShortestValidRoute();
	} else {
		var route = [ gC(character).currentRoom ];
	}
	return route;
}

		// Get route commands list
window.createRouteMovementCommands = function(roomsList,charsGroup) {
	var commandsList = [];
	
	if ( roomsList.length == 1 && roomsList[0] == gC(charsGroup[0]).currentRoom ) {
	}
	else {
		for ( var roomKey of roomsList ) {
			commandsList.push(createMapAiGoalMoveTo(charsGroup[0],roomKey));
		}
	}
	
	return commandsList;
}

		// Get actions
window.getLastActionInRoomIf = function(mapKey,roomKey,charsGroup,isValid) {
	var targetAction = null;
	
	var actions = getRoomInMap(mapKey,roomKey).getActions(charsGroup);
	
	for ( var action of actions ) {
		if ( isValid(action) ) {
			targetAction = action;
		}
	}
	
	return targetAction;
}
window.getLastTaggedActionInRoom = function(mapKey,roomKey,charsGroup,tag) {
	var isValid = function(action) {
		if ( action.tags.includes(tag) ) {
			return true;
		} else {
			return false;
		}
	}
	
	var targetAction = getLastActionInRoomIf(mapKey,roomKey,charsGroup,isValid);
	
	return targetAction;
}
/*
window.getLastEitherTaggedActionInRoom = function(mapKey,roomKey,charsGroup,tagsList) {
	var isValid = function(action) {
		if ( action.tags.includes(tag) ) {
			return true;
		} else {
			return false;
		}
	}
	var targetAction = getLastActionInRoomIf(mapKey,roomKey,charsGroup,isValid);
	
	return targetAction;
}
*/

	// Mission creators // - These functions return a list of commands to be added to NpcMapAi.goalsList

window.cMissionRandomMovement = function(mapKey,charsGroup) {
	var commandsList = [];
	
	var connections = getRoomInMap(mapKey,gC(charsGroup[0]).currentRoom).getConnections();
	
	if ( connections.length > 0 ) {  // Create command to move to random adjacent location
		commandsList.push(createMapAiGoalMoveTo(charsGroup[0],randomFromList(connections).loc));
	}
	
	return commandsList;
}
window.cMissionTrainRandomStat = function(mapKey,charsGroup) {
	// Creates missions to train randomly chosen stats
	var commandsList = [];
	
	var statToTrain = getRandomStat();
	var route = getRouteToClosestTaggedActivity(getCurrentMap().key,charsGroup,statToTrain);
	if ( route.length > 0 ) {
		var targetRoom = route[route.length - 1];
	} else {
		var targetRoom = gC(charsGroup[0]).currentRoom;
	}
	var actionKey = getLastTaggedActionInRoom(getCurrentMap().key,targetRoom,charsGroup,statToTrain).key;
	
	if ( route.length > 0 ) {
		commandsList = commandsList.concat(createRouteMovementCommands(route,charsGroup));
	}
	if ( actionKey != null ) {
		commandsList.push(createMapAiGoalAction(charsGroup[0],targetRoom,actionKey,60));
	}
	
	return commandsList;
}
window.cMissionBalancedRandomTrain = function(mapKey,charsGroup) {
	// Creates missions to train randomly chosen stats, favoring those with the highest affinity
	var commandsList = [];
	
	var charKey = charsGroup[0];
	var possibleStats = getStatNamesArray();
	possibleStats = possibleStats.concat(getThreeKindredCharStats(charKey));
	possibleStats = possibleStats.concat(getThreeKindredCharStats(charKey));
	possibleStats = possibleStats.concat(getThreeKindredCharStats(charKey));
	
	var statToTrain = getRandomStat();
	
	var route = getRouteToClosestTaggedActivity(getCurrentMap().key,charsGroup,statToTrain);
	if ( route.length > 0 ) {
		var targetRoom = route[route.length - 1];
	} else {
		var targetRoom = gC(charsGroup[0]).currentRoom;
	}
	var actionKey = getLastTaggedActionInRoom(getCurrentMap().key,targetRoom,charsGroup,statToTrain).key
	
	if ( route.length > 0 ) {
		commandsList = commandsList.concat(createRouteMovementCommands(route,charsGroup));
	}
	if ( actionKey != null ) {
		commandsList.push(createMapAiGoalAction(charsGroup[0],targetRoom,actionKey,60));
	}
	
	return commandsList;
}

window.cMissionActionTag = function(mapKey,charsGroup,tag) {
	var commandsList = [];
	
	var route = getRouteToClosestTaggedActivity(getCurrentMap().key,charsGroup,tag);
	if ( route.length > 0 ) {
		var targetRoom = route[route.length - 1];
	} else {
		var targetRoom = gC(charsGroup[0]).currentRoom;
	}
	var actionKey = getLastTaggedActionInRoom(getCurrentMap().key,targetRoom,charsGroup,tag).key;
	
	if ( route.length > 0 ) {
		commandsList = commandsList.concat(createRouteMovementCommands(route,charsGroup));
	}
	if ( actionKey != null ) {
		commandsList.push(createMapAiGoalAction(charsGroup[0],targetRoom,actionKey,60));
	}
	
	return commandsList;
}
	
window.cMissionPursueAndTalkTo = function(mapKey,charsGroup,targetChar) {
	return [ createMapAiGoalPursueAndTalkTo(charsGroup[0],targetChar) ];
}

window.cMissionPursueAndAssault = function(charsGroup,targetChar) {
	return [ createMapAiGoalPursueAndAssault(charsGroup[0],targetChar) ];
}

window.cMissionPursueAndChallenge = function(charsGroup,targetChar) {
	return [ createMapAiGoalPursueAndChallenge(charsGroup[0],targetChar) ];
}

////////// PROPOSALS //////////

window.npcProposalFollowMe = function(actor,target) {
	if ( gC(actor).currentRoom == gC(target).currentRoom ) {
		if ( target == "chPlayerCharacter" ) { // Target is player
				if ( State.variables.compass.flagPlayerIsPrompted == false ) {
				var spRel = gRelTypeAb(target,actor);
				var flagForcedToFollow = false;
				if ( spRel != null ) {
					if ( spRel.forcedToFollow ) {
						flagForcedToFollow = true;
					}
				}
				if ( flagForcedToFollow ) {
					var p = gC(actor).getFormattedName() + " wants you to follow " + gC(actor).comPr + ". You relationship compels you to accept.\n\n";
					p += getButtonNpcAsksToFollowThemAccept(actor);
					State.variables.compass.setPlayerPrompt(p);
				}
				else if ( rFavor("chPlayerCharacter",actor) > 0 ) {
					var p = gC(actor).getFormattedName() + " wants you to follow " + gC(actor).comPr + ". You're indebted to " + gC(actor).getFormattedName()
						  + " and refusing this request would be seen as an insult.\n\n";
					p += getButtonNpcAsksToFollowThemAccept(actor) + "\n";
					p += getButtonNpcAsksToFollowThemReject(actor);
					State.variables.compass.setPlayerPrompt(p);
				}
				else {
					var p = gC(actor).getFormattedName() + " wants you to follow " + gC(actor).comPr + ". This would put " +
							gC(actor).comPr + " in your debt.\n\n";
					p += getButtonNpcAsksToFollowThemAccept(actor) + "\n";
					p += getButtonNpcAsksToFollowThemReject(actor);
					State.variables.compass.setPlayerPrompt(p);
				}
			}
		} else { // Target is not player
			aAsksBtoFollowA(actor,target);
		}
	}
}
window.npcProposalFollowYou = function(actor,target) {
	if ( gC(actor).currentRoom == gC(target).currentRoom ) {
		if ( target == "chPlayerCharacter" ) { // Target is player
			if ( State.variables.compass.flagPlayerIsPrompted == false ) {
				var p = gC(actor).getFormattedName() + " wants to follow you.\n\n";
				p += getButtonNpcAsksToFollowPlayerAccept(actor) + "\n";
				p += getButtonNpcAsksToFollowPlayerReject(actor);
				State.variables.compass.setPlayerPrompt(p);
			}
		} else { // Target is not player
			aAsksBtoFollowB(actor,target);
		}
	}
}
window.npcProposalUnfollowMe = function(actor,target) {
	if ( gC(actor).currentRoom == gC(target).currentRoom ) {
		if ( target == "chPlayerCharacter" ) { // Target is player
			if ( State.variables.compass.flagPlayerIsPrompted == false ) {
				var p = gC(actor).getFormattedName() + " wants you to stop following " + gC(actor).comPr + ".\n\n";
				p += getButtonNpcAsksToUnfollowThemAccept(actor) + "\n";
				p += getButtonNpcAsksToUnfollowThemReject(actor);
				State.variables.compass.setPlayerPrompt(p);
			}
		} else { // Target is not player
			aAsksBtoUnfollowA(actor,target);
		}
	}
}
window.npcProposalUnfollowYou = function(actor,target) {
	if ( gC(actor).currentRoom == gC(target).currentRoom ) {
		if ( target == "chPlayerCharacter" ) { // Target is player
			if ( State.variables.compass.flagPlayerIsPrompted == false ) {
				var p = gC(actor).getFormattedName() + " wants to stop following you.\n\n";
				p += getButtonNpcAsksToUnfollowPlayerAccept(actor) + "\n";
				p += getButtonNpcAsksToUnfollowPlayerReject(actor);
				State.variables.compass.setPlayerPrompt(p);
			}
		} else { // Target is not player
			aAsksBtoUnfollowB(actor,target);
		}
	}
}

	// Character decisions //
window.doesTargetAcceptConversation = function(actor,target) {
	var forcedToAccept = false;
	var result = false;
		var stringResult = "";
	if ( gC(target).domChar == actor ) {
		forcedToAccept = true;
		result = true;
		stringResult = gC(target).getFormattedName() + " is bound to accept.";
	}
	if ( forcedToAccept == false ) {
		// Mood
		var targetDominanceMood = + gC(target).mood.submissive * (1.0) + gC(target).mood.dominant * (-0.2);
		var targetMoodFactor = gC(target).mood.friendly * (0.5) + gC(target).mood.flirty * (0.5) + gC(target).mood.intimate * (0.5)
								 + gC(target).mood.aroused * (0.5) + gC(target).mood.angry * (-1.0) + gC(target).mood.bored * (-0.5);
		if ( targetDominanceMood > 0 ) { targetMoodFactor += targetDominanceMood; }
		
		// Relationship
		var targetDominantRelation = rLvlAbt(target,actor,"submission") * 4.0 + rLvlAbt(target,actor,"domination") * -4.0;
		var relationshipFactor = rLvlAbt(target,actor,"friendship") * 1.0 + rLvlAbt(target,actor,"romance") * 1.5 + rLvlAbt(target,actor,"sexualTension") * 0.5
							 + rLvlAbt(target,actor,"enmity") * -3.0 + rLvlAbt(target,actor,"rivalry") * -1.0;
		if ( targetDominantRelation > 0 ) { relationshipFactor += targetDominantRelation; }
		if ( relationshipFactor < 0 && relationshipFactor > -8 ) {
			relationshipFactor = 0;
		}
		
		// Simulation state
		var simulationState = 0;
		if ( State.variables.simCycPar.templeDayPeriod == "training" && gC(target).type == "candidate" ) {
			simulationState = -20;
		}
		
		var semifinalValue = targetMoodFactor + relationshipFactor + simulationState;
		var sfvTenth = semifinalValue * 0.1;
		var diceThrow = luckedDiceThrow(gC(actor).luck.getValue());
		var luckFactor = (sfvTenth * 2 * diceThrow) - sfvTenth;
		
		var finalValue = semifinalValue + luckFactor;
		if ( finalValue >= 0 || State.variables.debugAlwaysAcceptSis ) { result = true; }
		if ( result ) { stringResult = "Success!"; }
		else 		  { stringResult = "Failure."; }
		stringResult += " Mood: " + targetMoodFactor.toFixed(2) + ", Relationship: " + relationshipFactor.toFixed(2)
					  + ", Others: " + simulationState + ", Luck: " + luckFactor.toFixed(2) + " - Result: " + finalValue.toFixed(2);
	}
	return [result,stringResult];	
}

window.doesTargetAcceptChallenge = function(actor,target,stakes) {
	var flagAccepts = false;
	switch ( stakes ) {
		case 1:
			if ( proportionQuantifiedCharactersStrength(target,actor) > 0.80 ) {
				flagAccepts = true;
			}
			break;
		case 2:
			if ( proportionQuantifiedCharactersStrength(target,actor) > 0.85 ) {
				flagAccepts = true;
			}
			break;
		case 3:
			if ( proportionQuantifiedCharactersStrength(target,actor) > 0.90 ) {
				flagAccepts = true;
			}
			break;
	}
	return flagAccepts;
}

// Temporary
window.cMissionCustomCommands = function(mapKey,charsGroup) {
	var commandsList = [];
	
	//commandsList.push(createMapAiGoalMoveTo(charsGroup[0],"eastLibrary"));
	//commandsList.push(createMapAiGoalMoveTo(charsGroup[0],"westLibrary"));
	commandsList.push(createMapAiGoalTalkTo(charsGroup[0],"chVal"));
	
	return commandsList;
}

////////// FURTHER AUXILIAR FUNCTIONS //////////

window.aAsksBtoFollowA = function(charA,charB) {
	// Character A asks character B if B will follow A
	var flagAccepted = false;
	var willPayDebt = false;
	var message = "";
	
	var flagCantUnfollowC = false;
	
	if ( gC(charB).followingTo != "" ) {
		var cRelType = gRelTypeAb(charB,gC(charB).followingTo);
		if ( cRelType != null ) {
			if ( cRelType.forcedToFollow ) {
				flagCantUnfollowC = true;
			}
		}
	}
	if ( flagCantUnfollowC ) { // CharB is forced to keep following CharC
		message = gC(charB).name + " can't stop following " + gC(gC(charB).followingTo).name + ".";
	}
	else {
		if ( gC(charB).relations.hasOwnProperty(charA) ) {
			var relType = gRelTypeAb(charB,charA);
			if ( relType ) {
				if ( relType.forcedToFollow ) { // Special relationship forces to follow
					flagAccepted = true;
					message = gC(charB).name + " accepts your order and will follow you.";
				}
			}
			if ( flagAccepted == false && gC(charB).relations[charA].favor > 0 ) { // Favor
				willPayDebt = true;
				flagAccepted = true;
				message = gC(charB).name + " will follow you to repay favor.";
			}
			if ( flagAccepted == false ) { // Relationships and mood
				var posValues = 1 + rLvlAbt(charB,charA,"submission") * 20 + rLvlAbt(charB,charA,"friendship") * 10 + rLvlAbt(charB,charA,"romance") * 20 + getCharMood(charB,"submissive");
				var negValues = rLvlAbt(charB,charA,"enmity") * 30 + rLvlAbt(charB,charA,"rivalry") * 10 + rLvlAbt(charB,charA,"domination") * 20 + getCharMood(charB,"angry") + getCharMood(charB,"dominant");
				if ( posValues > negValues ) {
					willPayDebt = true;
					flagAccepted = true;
					message = gC(charB).name + " will follow you and consider you in " + gC(charB).posPr + " debt.";
				} else {
					message = gC(charB).name + " doesn't want to follow you.";
				}
			}
		} else { // The characters don't know each other (Should this even be possible?)
			message = gC(charB).name + " barely knows you.";
		}
	}
	
	// Send message if appropriate
	if ( charA == "chPlayerCharacter" ) {
		State.variables.compass.setMapMessage(message);
	}
	// Create following relationship
	if ( flagAccepted ) {
		charFollowsChar(charB,charA,willPayDebt);
	}
	
	return flagAccepted;
}
window.aAsksBtoFollowB = function(charA,charB) {
	// Character A asks character B if A may follow B
	var flagAccepted = false;
	var message = "";
	
	// Mood and relationship
	var posValues = 1 + rLvlAbt(charB,charA,"friendship") * 10 + rLvlAbt(charB,charA,"romance") * 20;
	var negValues = rLvlAbt(charB,charA,"enmity") * 30 + rLvlAbt(charB,charA,"rivalry") * 10 + getCharMood(charB,"angry");
	if ( posValues > negValues ) {
		flagAccepted = true;
		message = gC(charB).name + " will allow you to follow " + gC(charB).posPr + " out of your own will.";
	} else {
		message = gC(charB).name + " doesn't want you to follow " + gC(charB).comPr + ".";
	}
	
	// Send message if appropriate
	if ( charA == "chPlayerCharacter" ) {
		State.variables.compass.setMapMessage(message);
	}
	// Create following relationship
	if ( flagAccepted ) {
		charFollowsChar(charA,charB,false);
		if ( charA == "chPlayerCharacter" ) {
			playerJoinsTargetChar(charB);
		}
	}
	
	return flagAccepted;
}
window.aAsksBtoUnfollowA = function(charA,charB) {
	// Character A asks character B if B will stop following A
	var flagAccepted = true;
	var message = "";
	
	// Send message if appropriate
	if ( charA == "chPlayerCharacter" ) {
		message = gC(charB).name + " will stop following you.";
		State.variables.compass.setMapMessage(message);
	}
	// Destroy following relationship
	if ( flagAccepted ) {
		charUnfollowsChar(charB,charA);
	}
	
	return flagAccepted;
}
window.aAsksBtoUnfollowB = function(charA,charB) {
	// Character A asks character B if A may stop following B
	var flagAccepted = true;
	var message = gC(charB).name + " is fine with you no longer following " + gC(charB).comPr + ".";
	
	if ( gRelTypeAb(charA,charB) != null ) {
		if ( gRelTypeAb(charA,charB).forcedToFollow ) {
			flagAccepted = false;
			message = "Your relationship with " + gC(charB).name + " does not allow you to leave.";
		}
	}
	if ( flagAccepted ) {
		if ( ( rFavor(charA,charB) > 0 ) && ( gC(charA).followingForDebt ) ) {
			flagAccepted = false;
			message = gC(charB).name + " does not allow to leave, since you're indebted to " + gC(charB).comPr + ".";
		}
	}
	
	// Send message if appropriate
	if ( charA == "chPlayerCharacter" ) {
		State.variables.compass.setMapMessage(message);
	}
	// Destroy following relationship
	if ( flagAccepted ) {
		charUnfollowsChar(charA,charB);
		if ( charA == "chPlayerCharacter" ) {
			playerLeavesTargetChar(charB);
		//bText	 += "playerLeavesTargetChar('" + targetCharacter + "');\n";
		}
	}
	
	return flagAccepted;
}

