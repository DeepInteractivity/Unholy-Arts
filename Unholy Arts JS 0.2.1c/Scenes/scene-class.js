////////// SCENE CLASS //////////

window.scene = function() {
	this.sceneLog = ""; // Debug console
	
	this.scenePassage = "";
	
	this.sceneType = ""; // May be ss (Sex Scene) or bs (Battle Scene)	
	this.enabledLead = "none"; // Valid values: "none", "dynamic", "fixed"
	this.sceneConditions = []; // Flags to be initiated manually. They may disable certain player actions.
		// cantCancelActions
		// cantCancelPositions
		// cantInitiateCActs // Continued Actions
		// cantInitiatePos //
	
	this.teamAcharKeys = [];
	this.teamBcharKeys = [];
	
	this.teamAchosenActions = [];  // List of strings containing each chosen action's key.
	this.teamAchosenTargets = [];
	this.teamBchosenActions = [];
	this.teamBchosenTargets = [];
	
	this.lastPlayerCommand = "";
	this.lastPlayerTarget = "";
	
	this.leadGainRate = 10;
	this.askedForLead = []; // List of character keys that asked for lead
	this.askForLeadScript = ""; // Script that should always be printed, it allows the Player to ask for lead should it ever be possible
	
	this.continuedActions = []; // List of continued actions to be executed at the end of each turn.	
	
	this.pcChosenAction = ""; // This string is used by the player to choose their next action. It is fed from actions options list,
							  // and it is fed to the PC's team's chosen actions.
	this.pcChosenTargets = [""]; // Saves the targets chosen by the player. It is fed from targets options list, and it is fed to the
							   // PC's team's chosen targets.
	this.isPcActionValid = 0;
	this.formattedActionsOptionList = ""; // This string calls a macro that allows the Player to choose their action.
	this.formattedTargetsOptionList = ""; // This string calls a macro that allows the Player to select their targets.
	
	this.currentTurn = 1;
	this.turnLimit = -1;
	
	this.importantMessages = ""; // f.e.: Virginities list
	this.headingDescription = "";
	this.outHeadingDescription = "";
	this.charactersDescription = "";
	this.positionsDescription = "";
	this.actionsDescription = "";
	this.actionsDescriptionNl = false;
	this.otherMessages = [];
	
	this.cancelActionButtons = []; // Each element is a list [ID,CommandScript,Description]
	this.cabID = 0; // ID for each cancelActionButton. It's assigned to the new cab, then incremented. Should be cleaned at the end of the scene.
	
	this.provisionalInfo = "";
	
	this.checkEndConditions = function() {
		return true;
	}
	this.endConditionsVars = 0;
	this.flagSceneEnded = false;
	this.flagSceneActive = false;
	this.extraEndInfo = "";
	
	this.flagFullAvatar = false;
	this.selectedFullAvatar = "chPlayerCharacter";
	
	this.endSceneMessage = "The scene is finished.";
	this.endScenePassage = "";
	this.endScenePassageScript = "";
	
		// Battle extra parameters
	this.stakes = 1;
	this.aggressor = "";
	this.defender = "";
	
	this.customScript = function() {
		return 1;
	}
	// This function is automatically called at the end of every turn. It may be manually changed to create special behavior for a specific scene.
	
	// Start-up // This must be called whenever the game starts a scene
	this.startScene = function( sceneType, enabledLead,
								teamAcharKeys, teamBcharKeys,
								headingDescription,
								checkEndConditions, endConditionsVars,
								endScenePassage ) {
		this.sceneLog += "Cleaning previous scene. "; //DEP//
		
		if ( teamBcharKeys.includes("chPlayerCharacter") ) {
			var tempTeamKeys = teamBcharKeys;
			teamBcharKeys = teamAcharKeys;
			teamAcharKeys = tempTeamKeys;
		}
		
		this.sceneType = sceneType;
		this.enabledLead = enabledLead;
		this.sceneConditions = [];
		this.currentTurn = 1;
		
		this.teamAcharKeys = teamAcharKeys;
		this.teamBcharKeys = teamBcharKeys;
		
		if ( this.enabledLead == "dynamic" ) {
			this.initiateLeadPoints();
		}
		else if ( this.enabledLead == "fixed" ) {
			
		}
		this.askedForLead = [];
		this.refreshAskForLeadScript();
		
		this.teamAchosenActions = []; // VARIABLE KEYS, NOT THE ACTUAL VARIABLES (ex.: doNothing)
		this.teamAchosenTargets = []; // VARIABLE KEYS, NOT THE ACTUAL VARIABLES (ex.: chGoddessHerald)
		this.teamBchosenActions = [];
		this.teamBchosenTargets = [];
	
		this.lastPlayerCommand = "";
		this.lastPlayerTarget = "";
		
		this.pcChosenAction = "";	  // Variable keys
		this.pcChosenTargets = [];    // Variable keys
		
		this.headingDescription = headingDescription;
		if ( this.headingDescription != "" ) {
			this.outHeadingDescription = this.headingDescription + "\n\n";
		}
		else {
			this.outHeadingDescription = "";
		}
		
		this.charactersDescription = "";
		this.positionsDescription = "";
		this.actionsDescription = "";
		
		this.cancelActionButtons = [];
		this.cabID = 0; 
		
		this.checkEndConditions = checkEndConditions;
		this.endConditionsVars = endConditionsVars;
		this.flagSceneEnded = false;
		
		this.endSceneMessage = "The scene is finished.";
		this.endScenePassage = endScenePassage;
		this.refreshEndScenePassageScript();
		this.endSceneScript = function() { // This function is called at the end of the scene, right before cleaning the scene object.
										   // Edit it right after starting the scene to get a certain effect at the end.
			return true;
		}
		
		this.cleanSceneOrgasms(); // Bugs may cause characters to reach the scene with a scene orgasm counter above 0.
								  // This cleans those situations
								  
		this.flagSceneActive = true;
		
		if ( this.teamBcharKeys.length > 0 ) {
			this.lastPlayerTarget = this.teamBcharKeys[0];
		} else {
			this.lastPlayerTarget = this.teamAcharKeys[0];
		}
		
		this.formatScenePassage();
	}
	
	this.autoResolveScene = function() {
		while ( this.flagSceneEnded == false ) {
			this.executeTurn();
		}
		this.cleanScene();
	}
	
	// Management
	this.removeContinuedAction = function(caPosition) {
		this.continuedActions[caPosition].freeBodyparts();
		this.continuedActions.splice(caPosition,1);
	}
	this.cleanContinuedActions = function() {
		var i = this.continuedActions.length;
		
		while ( i > 0 ) {
			i--;
			this.removeContinuedAction(i);
		}
	}
	this.refreshEndScenePassageScript = function() {
		this.endScenePassageScript = '<p id="continueButton"><<link "Continue" "' + this.endScenePassage + '">>'
								   + '<<' + 'script>>'
								   + 'State.variables.sc.endSceneScript();\n'
								   + 'State.variables.sc.cleanScene();\n'
								   + '<<' + '/script>>'
								   + '<</link>></p>';
	}
	
	this.removeCancelActionButtonByID = function(id) {
		var i = 0;
		var j = -1;
		for ( var cab of this.cancelActionButtons ) {
			if ( id == cab[0] ) {
				j = i;
			}
			i++;
		}
		if ( j != -1 ) {
			this.cancelActionButtons.splice(j,1);
		}
	}
	
	this.initiateLeadPoints = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		var rCharKeys = shuffleArray(charKeys);
		var l = rCharKeys.length;
		
		var i = 0;
		while ( i < l ) {
			if ( i == 0 ) {
				gC(rCharKeys[i]).lead = 100;
				gC(rCharKeys[i]).hasLead = true;
			}
			else {
				gC(rCharKeys[i]).lead = 100 * ( ((l-1)*2 - i) / ((l-1)*2) );
				gC(rCharKeys[i]).hasLead = false;
			}
			i++;
		}
		this.setLeadGainRate();
	}
	this.setLeadGainRate = function() {
		var nChars = this.teamAcharKeys.length + this.teamBcharKeys.length;
		this.leadGainRate = 100 / (2 * nChars);
	}
	this.addTurnLeadPoints = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			gC(key).lead += this.leadGainRate * (gC(key).willpower.current / gC(key).willpower.max);
			if ( gC(key).lead > 100 ) {
				gC(key).lead = 100;
			}
		}
	}
	this.assignNewLead = function() {
		this.giveLeadToChar(randomFromList(this.askedForLead));
	}
	
	this.giveLeadToChar = function(charKey) {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			if ( gC(key).hasLead == true ) {
				gC(key).hasLead = false;
				gC(key).lead = 0;
			}
		}
		gC(charKey).hasLead = true;
	}
	this.offerLeadToNpcs = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			if ( gC(key).hasLead == false && gC(key).lead == 100 && (key != "chPlayerCharacter") ) {
				this.askedForLead.push(key);
			}
		}
	}
	this.refreshAskForLeadScript = function() {
		this.askForLeadScript = "";
		if ( State.variables.chPlayerCharacter.lead == 100 && State.variables.chPlayerCharacter.hasLead == false && this.enabledLead == "dynamic" ) {
			this.askForLeadScript = '<<link "Attempt to take Lead" "Scene">>'
							 + '<<' + 'script>>'
							 + 'State.variables.sc.askedForLead.push("chPlayerCharacter");'
							 + 'State.variables.sc.askFor' + 'LeadScript = "";'
							 + '<<' + '/script>>'
							 + '<</link>>\n\n';
		}
		
		// Attempting to take lead at the end of this turn.\n\n
	}
	
	this.cleanLeadPoints = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			getChar(key).lead = 0;
			getChar(key).hasLead = false;
		}		
	}
	this.cleanControl = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			gC(key).cleanControl();
		}		
	}
	this.cleanSceneOrgasms = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			getChar(key).orgasmSceneCounter = 0;
		}		
	}
	this.cleanAccumulatedDamages = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			getChar(key).cleanAccumulatedDamages();
		}
	}
	this.cancelPosition = function(charKey) {
		if ( getChar(charKey).position.type == "active" ) {
			for ( var key of getChar(charKey).position.targetsList ) {
				getChar(key).position.free();
			}
			getChar(charKey).position.free();
		}
		else if ( getChar(charKey).position.type == "passive" ) {
			var initiatorKey = getChar(charKey).position.initiator;
			for ( var key of getChar(initiatorKey).position.targetsList ) {
				getChar(key).position.free();
			}
			getChar(initiatorKey).position.free();
		}
	}
	this.cleanAllPositions = function() {
		var charList = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var charKey of charList ) {
			getChar(charKey).position.free();
		}
	}
	this.cleanAlteredStates = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		var cleanStates = false;
		for ( var key of charKeys) {
			cleanStates = false;
			for ( var as of gC(key).alteredStates ) {
				if ( as.scope == "scene" ) {
					as.flagRemove = true; // Finish effect
					cleanStates = true;
				}
			}
			if ( cleanStates ) {
				gC(key).cleanStates();
			}
		}
	}
	this.cleanKoedFlags = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			getChar(key).koed = false;
		}	
	}
	
	
	this.cleanScene = function() {		
		this.logAccumulatedDamage();
		
		this.enabledLead = "none";
		this.cleanAccumulatedDamages();
		this.cleanLeadPoints();
		this.cleanControl();
		
		this.cleanSceneOrgasms();
		
		this.cleanContinuedActions();
		this.cleanAllPositions();
		
		this.cleanAlteredStates();
		this.cleanKoedFlags();		
		
		this.sceneType = "";
		
		this.teamAcharKeys = [];
		this.teamBcharKeys = [];
		
		this.teamAchosenActions = [];
		this.teamAchosenTargets = [];
		this.teamBchosenActions = [];
		this.teamBchosenTargets = [];
		
		this.lastPlayerCommand = "";
		this.lastPlayerTarget = "";
		
		this.pcChosenAction = "";
		this.pcChosenTargets = [""];
		this.isPcActionValid = 0;
		this.formattedActionsOptionList = "";
		this.formattedTargetsOptionList = "";
		
		this.cancelActionButtons = [];
		this.cabID = 0; 
		
		this.currentTurn = 1;
		this.turnLimit = -1;
		
		this.importantMessages = "";
		this.headingDescription = "";
		this.charactersDescription = "";
		this.actionsDescription = "";
		this.otherMessages = [];
		
		this.provisionalInfo = "";
		
		this.flagFullAvatar = false;
		this.selectedFullAvatar = "chPlayerCharacter";
		
		this.checkEndConditions = function() {
			return true;
		}
		this.endConditionsVars = 0;
		this.flagSceneEnded = true;
		this.flagSceneActive = false;
		
		this.endSceneMessage = "The scene is finished.";
		//this.endScenePassage = "";
		//this.endScenePassageScript = "";
				
		this.customScript = function() {
			return 1;
		}
		this.endSceneScript = function() {
			return true;
		}
	}
	
	this.getCharacterContext = function(charKey) {
		var charPos = 0;
		var actionsOnActor = [];
		var charsOnActor = [];
		var i = 0;
		if ( this.teamAcharKeys.includes(charKey) ) {
			charPos = this.teamAcharKeys.indexOf(charKey);
			
			for ( var targets of this.teamAchosenTargets ) {
				if ( targets.includes(charKey) ) {
					actionsOnActor.push(this.teamAchosenActions[i]);
					charsOnActor.push(this.teamAcharKeys[i]);
				}
				i++;
			}
			i = 0;
			for ( var targets of this.teamBchosenTargets ) {
				if ( targets.includes(charKey) ) {
					actionsOnActor.push(this.teamBchosenActions[i]);
					charsOnActor.push(this.teamBcharKeys[i]);
				}
				i++;
			}
			
			var ctx = new sceneDialogContext(charKey,this.teamAchosenActions[charPos],this.teamAchosenTargets[charPos],charsOnActor,actionsOnActor);
			return ctx;
		}
		else if ( this.teamBcharKeys.includes(charKey) ) {
			charPos = this.teamBcharKeys.indexOf(charKey);
			
			for ( var targets of this.teamAchosenTargets ) {
				if ( targets.includes(charKey) ) {
					actionsOnActor.push(this.teamAchosenActions[i]);
					charsOnActor.push(this.teamAcharKeys[i]);
				}
				i++;
			}
			i = 0;
			for ( var targets of this.teamBchosenTargets ) {
				if ( targets.includes(charKey) ) {
					actionsOnActor.push(this.teamBchosenActions[i]);
					charsOnActor.push(this.teamBcharKeys[i]);
				}
				i++;
			}
			
			var ctx = new sceneDialogContext(charKey,this.teamBchosenActions[charPos],this.teamBchosenTargets[charPos],charsOnActor,actionsOnActor);
			return ctx;
		}
		else {
			return null;
		}
	}
	
	this.isPlayerInScene = function() {
		var flagPcInScene = false;
		
		if ( this.teamAcharKeys.includes("chPlayerCharacter") || this.teamBcharKeys.includes("chPlayerCharacter") ) {
			flagPcInScene = true;
		}
		
		return flagPcInScene;
	}
	
	this.cleanNegativeBars = function() {
		for ( var character of this.teamAcharKeys.concat(this.teamBcharKeys) ) {
			for ( var bar of ["willpower","energy","socialdrive"] ) {
				if ( gC(character)[bar].current < 0 ) {
					gC(character)[bar].current = 0;
				}
			}
		}
	}
	
	this.setBattleParameters = function(stakes,attacker,defender) {
		this.stakes = stakes;
		this.aggressor = attacker;
		this.defender = defender;
	}
	
	// Logic
	
	this.isActionAllowed = function(actor,sceneAction) {
		var isAllowed = true;
		if ( sceneAction.tags.includes(this.sceneType) == false ) {
			isAllowed = false;
		}
		
		return isAllowed;
	}
	this.listUsableActions = function(actorKey) {
		// This function creates a list with the keys of all actions that are usable in some way during this turn by a given character.
		// This requires to check every action known by the character, and test its usability against any different target.
		var list = ["doNothing"];
		var charList = this.teamAcharKeys.concat(this.teamBcharKeys);
		
		for ( var actionKey of gC(actorKey).saList ) {
			for ( var target of charList ) {
				if ( list.includes(actionKey) == false ) {
					if ( this.isActionAllowed(actorKey,State.variables.saList[actionKey]) == true && isActionUsable(actionKey,actorKey,[target]).isUsable == true ) {
						list.push(actionKey);
					}
				}
			}
		}
		
		return list;
	}
	this.listUsableActionsOnTarget = function(actorKey,targetKey) {
		var list = ["doNothing"];
		var charList = this.teamAcharKeys.concat(this.teamBcharKeys);
		if ( gC(targetKey).koed ) {
			// Only "doNothing" is usable
		} else {
			
		for ( var actionKey of gC(actorKey).saList ) {
				if ( list.includes(actionKey) == false ) {
					if ( this.isActionAllowed(actorKey,State.variables.saList[actionKey]) == true && isActionUsable(actionKey,actorKey,[targetKey]).isUsable == true ) {
						list.push(actionKey);
					}
				}
			}
		}
		
		return list;
	}
	
	this.checkUnvalidContinuedActions = function() {
		// Checks every continued action on the scene. If any of them has unvalid positions, they are canceled
		var i = this.continuedActions.length; // Continued actions are checked from end to start
		var flagCancelledAction = false;
		
		while ( i > 0 ) {
			i--;
			if ( this.checkUnvalidContinuedAction(i) == true ) {
				this.removeContinuedAction(i);
				flagCancelledAction = true;
			}
		}
		
		if ( flagCancelledAction == true ) {
			this.actionsDescription += "\nThe changes in positions forced at least one continued action to be cancelled.\n";
		}
	}
	this.checkUnvalidContinuedAction = function(position) {
		var flagCancelAction = false;
		var cA = this.continuedActions[position];
		
		if ( cA.validRelationalPositions.length > 0 ) {
			var flagFoundValidRelationalPosition = false;
			for ( var relationalPosition of cA.validRelationalPositions ) {
				for ( var target of cA.targetsList ) {
					if ( gC(cA.initiator).position.key == relationalPosition[0] && gC(target).position.key == relationalPosition[1] ) {
						flagFoundValidRelationalPosition = true; 
					}
				}
			}
			if ( flagFoundValidRelationalPosition == false ) {
				flagCancelAction = true;
			}
		}
		
		if ( cA.unvalidRelationalPositions.length > 0 ) {
			var flagFoundUnvalidPosition = false;
			for ( var relationalPosition of cA.unvalidRelationalPositions ) {
				for ( var target of cA.targetsList ) {
					if ( gC(cA.initiator).position.key == relationalPosition[0] && gC(target).position.key == relationalPosition[1] ) {
						flagFoundUnvalidPosition = true;
					}
				}
			}
			if ( flagFoundUnvalidPosition == true ) {
				flagCancelAction = true;
			}
		}
		
		return flagCancelAction;
	}
	
	this.executeActions = function() {
		this.actionsDescription = "";
		var i = 0;
		
		if ( this.sceneType == "bs" ) {
			// Reorder data
			var actionsInfo = new weightedList();
			var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
			for ( var actK of this.teamAchosenActions ) {
				actionsInfo[this.teamAcharKeys[i]] = [ this.teamAcharKeys[i] , actK , this.teamAchosenTargets[i] ];
				i++;
			}
			i = 0;
			for ( var actK of this.teamBchosenActions ) {
				actionsInfo[this.teamBcharKeys[i]] = [ this.teamBcharKeys[i] , actK , this.teamBchosenTargets[i] ];
				i++;
			}
			// Weighted list
			var wL = new weightedList();
			for ( var charK of charKeys ) {
				wL[charK] = new weightedElement(charK,gC(charK).luck.getValue());
			}
			// Take weighted random elements from wL, execute their action, delete them from the list, until j == 0
			var j = charKeys.length;
			while ( j > 0 ) {
				var currentC = randomFromWeightedList(wL); // Take weighted random char
				var currentA = actionsInfo[currentC][1]; // Execute action
				var actionName = "[" + State.variables.saList[currentA].name + "] ";
				this.actionsDescription += colorText(actionName,"darkgray");
				this.actionsDescription += tryExecuteAction(currentA,currentC,actionsInfo[currentC][2]).description;
				this.actionsDescription += "\n";
				delete wL[currentC]; // Delete from weighted list
				j--; // Reduce j
			}
		}
		else {
			for (let action of this.teamAchosenActions) {
				// Each chosen action is called in order. The parameters are the acting character and its list of targets.
				// Each action returns a description of its effects, which is added to actionsDescription.
				var actionName = "[" + State.variables.saList[action].name + "] ";
				this.actionsDescription += colorText(actionName,"darkgray");
				this.actionsDescription += tryExecuteAction(action,this.teamAcharKeys[i],this.teamAchosenTargets[i]).description;
				//this.actionsDescription += State.variables.saList[this.teamAchosenActions[action]].execute(this.teamAcharKeys[i],this.teamAchosenTargets[i]).description;
				this.actionsDescription += "\n";
				i++;
			}
			i = 0;
			for (let action of this.teamBchosenActions) {
				var actionName = "[" + State.variables.saList[action].name + "] ";
				this.actionsDescription += colorText(actionName,"darkgray");
				this.actionsDescription += tryExecuteAction(action,this.teamBcharKeys[i],this.teamBchosenTargets[i]).description;
				//this.actionsDescription += State.variables.saList[this.teamBchosenActions[action]].execute(this.teamBcharKeys[i],this.teamBchosenTargets[i]).description;
				this.actionsDescription += "\n";
				i++;
			}
		}
	}
	this.executeContinuedActions = function() {
		var i = 0;		
		
		// Find Positional CAs
		var positionalContinuedActions = [];
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var charKey of charKeys ) {
			if ( gC(charKey).position.cAction != null ) {
				positionalContinuedActions.push(gC(charKey).position.cAction);
			}
		}
		
		// Formatting init
		if ( ( this.continuedActions.length + positionalContinuedActions.length ) > 0 ) {
			this.actionsDescriptionNl = true;
			// this.actionsDescription += "\n";
		} else {
			this.actionsDescriptionNl = false;
		}
		// Main
		for ( var ca in this.continuedActions ) {
			var cancelActionButton = [this.cabID]; // cab is assigned an ID
			if ( this.flagSceneEnded == false ) {	// If scene isn't finished, create Cancel Action Buttons
				var cancelPlayerActionScript = this.returnCancelActionScript(this.checkCancelAction(
																				"chPlayerCharacter",this.continuedActions[ca]),i,this.cabID);
				cancelActionButton.push(cancelPlayerActionScript);		// cab is assigned a cancel script
																		// If it can't be cancelled, cancelPlayerActionScript equals ""
			} else {
				cancelActionButton.push("");							// cab is assigned a cancel script
			}
			var actionName = colorText(("[" + this.continuedActions[ca].name + "] "),"darkgray");
			var actionDescription = this.continuedActions[ca].execute().description;
//			this.actionsDescription += actionName + actionDescription + "\n";
			cancelActionButton.push("" + actionName + actionDescription + "\n");
			this.cancelActionButtons.push(cancelActionButton);
			this.cabID++;
			i++;
		}
		
		// Positional CAs effects
		for ( var pcAction of positionalContinuedActions ) {
			var actionName = colorText(("[" + pcAction.name + "] "),"darkgray");
			var actionDescription = pcAction.execute().description;
			// TODO: Add action name and description to CAs
			//var toPush = "" + actionName + actionDescription + "\n"
			var nonButton = [,"","" + actionName + actionDescription + "\n"];
			this.cancelActionButtons.push(nonButton);
			this.cabID++;
			i++;
		}
	}
	
	this.checkForOrgasms = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			var overflow = getChar(key).tryOrgasm(); // Overflow is the amount of lust excess after an orgasm.
													 // If -1, there was no orgasm
			if ( overflow != -1 ) {
				var orgasmMessage = this.textOrgasmMessage(key,overflow);
				this.importantMessages += orgasmMessage + "\n";
				if ( this.sceneType == "bs" ) {
					gC(key).koed = true; // If battle scene, character gets KO'ed
					this.cancelPosition(key);
				}
			}
		}		
	}
	
	this.controlTurnEffects = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys) {
			if ( gC(key).position.type != "passive" ) { // Characters on passive positions do not recover control
				if ( gC(key).lostControlTurns == -1 ) { // Ignore control for this turn
					gC(key).lostControlTurns = 0;
				}
				else if ( gC(key).lostControlTurns > 0 ) { // Player lost control earlier, will eventually recover it
					gC(key).lostControlTurns--;
					if ( gC(key).lostControlTurns == 0 ) { // Player passed all lost control turns, will now recover some control
						gC(key).control = gC(key).maxControl * 0.6;
					}
				}
				else if ( gC(key).control <= 0 ) { // Player has just lost control, decide number of lost control turns
					gC(key).assignLostControlTurns(1);
				}
				else { // Player has some control, will gradually recover more
					gC(key).recoverControl();
				}
			}
		}
	}
	
	this.alteredStatesTurnEffects = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		var cleanStates = false;
		for ( var key of charKeys) {
			cleanStates = false;
			for ( var as of gC(key).alteredStates ) {
				if ( as.scope == "scene" ) {
					as.remainingTurns--; // Reduce remaining turns
					if ( as.remainingTurns <= 0 ) {
						as.flagRemove = true; // Finish effect
						cleanStates = true;
					}
				}
			}
			if ( cleanStates ) {
				gC(key).cleanStates();
			}
		}
	}
	
	this.executeTurn = function() {		
		this.teamAchosenActions = [];  // Clean the stacks
		this.teamAchosenTargets = [];
		this.teamBchosenActions = [];
		this.teamBchosenTargets = [];
		
		this.importantMessages = "";
		this.actionsDescription = "";
		this.otherMessages = [];
		
		// Choose actions
		var aiResults;
		for ( var character in this.teamAcharKeys ) { // Player character
			if ( gC(this.teamAcharKeys[character]).koed ) { // Ko'ed characters can't act
				this.teamAchosenActions.push("doNothing");
				this.teamAchosenTargets.push([this.teamAcharKeys[character]]);
			}
			else if ( this.teamAcharKeys[character] == "chPlayerCharacter" ) {
				this.teamAchosenActions.push(this.pcChosenAction);
				this.teamAchosenTargets.push(this.pcChosenTargets);
			} 
			else if ( getChar(this.teamAcharKeys[character]).aiAlgorythm != 0 ) { // AI Algorythm
				aiResults = getChar(this.teamAcharKeys[character]).aiAlgorythm.callAction((this.teamAcharKeys[character]),this.teamAcharKeys,this.teamBcharKeys,this.currentTurn);
				this.teamAchosenActions.push(aiResults.actionKey);
				this.teamAchosenTargets.push(aiResults.targetsIDs);
			}
			else { // Everything failed: do nothing
				this.teamAchosenActions.push("doNothing");
				this.teamAchosenTargets.push([]);
			}
		}
		for ( var character in this.teamBcharKeys ) { // Player character
			if ( gC(this.teamBcharKeys[character]).koed ) { // Ko'ed characters can't act
				this.teamBchosenActions.push("doNothing");
				this.teamBchosenTargets.push([this.teamBcharKeys[character]]);
			}
			else if ( getChar(this.teamBcharKeys[character]) == "chPlayerCharacter" ) {
				this.teamBchosenActions.push(this.pcChosenAction);
				this.teamBchosenTargets.push(this.pcChosenTargets);
			}
			else if ( getChar(this.teamBcharKeys[character]).aiAlgorythm != 0 ) { // AI Algorythm
				aiResults = getChar(this.teamBcharKeys[character]).aiAlgorythm.callAction((this.teamBcharKeys[character]),this.teamBcharKeys,this.teamAcharKeys,this.currentTurn);
				this.teamBchosenActions.push(aiResults.actionKey);
				this.teamBchosenTargets.push(aiResults.targetsIDs);
			}
			else { // Everything failed: do nothing
				this.teamBchosenActions.push("doNothing");
				this.teamBchosenTargets.push([]);
			}
		}
		
		// Pre-execute actions
		this.cancelActionButtons = [];
		
		// Execute actions
		this.executeActions();
		
		// Lead (Part 1)
		this.addTurnLeadPoints();
		if ( this.askedForLead.length > 0 ) {
			this.assignNewLead();
		}		
		
		// Execute continued actions
		this.checkUnvalidContinuedActions();
		this.executeContinuedActions();
		
		// this.refreshCharacterDescriptions(); // Outdated		
		this.refreshPositionsDescriptions();
		
		this.currentTurn += 1;
		
		// Post-action effects
		this.checkForOrgasms();
				
		// Lead (Part 2)
		this.askedForLead = [];
		if ( this.enabledLead == "dynamic" ) {
			this.offerLeadToNpcs();
		}
		this.refreshAskForLeadScript();
		
		// Control
		this.controlTurnEffects();

		// Altered States
		this.alteredStatesTurnEffects();

		// Custom Script
		this.customScript();
		
		// Check importantMessages
		if ( this.importantMessages != "" ) {
			var temp = this.importantMessages;
			this.importantMessages = '<span style="color:red">';
			this.importantMessages += temp;
			this.importantMessages += '<' + '/span>\n';
		}
		
		// Check heading
		if ( this.headingDescription != "" ) {
			this.outHeadingDescription = this.headingDescription + "\n\n";
		}
		
		// Check scene end
		this.flagSceneEnded = this.checkEndConditions(this.endConditionsVars);
		
		// Remember player commands
		var playerPosition = -1;
		var j = 0;
		for ( var chKey of this.teamAcharKeys ) {
			if ( chKey == "chPlayerCharacter" ) {
				playerPosition = j;
			}
			j++;
		}
		if ( playerPosition != -1 ) {
			this.lastPlayerCommand = this.teamAchosenActions[playerPosition];
			this.lastPlayerTarget = this.teamAchosenTargets[playerPosition][0];
		}
		
		// Bars below negative limits
		this.cleanNegativeBars();
		
		// Format Scene Passage
		this.formatScenePassage();
	}
	
	
	// Logic 2
	
	this.checkCancelAction = function(cancellingActorKey,continuedAction) { // This function returns the logic of attempting to cancel a continued action
		var logic = "noCost"; // The action will be cancelled at no cost
		
		if ( cancellingActorKey !== continuedAction.initiator ) {
			logic = "passTurn";
		}
		
		if ( this.sceneConditions.includes("cantCancelActions") ) {
			logic = "disabled";
		}
		
		if ( this.enabledLead != "none" && State.variables.chPlayerCharacter.hasLead == false ) {
			// If lead mode is dynamic or fixed, character needs lead to cancel continued actions
			logic = "disabled";
		}
		
		return logic;
	}
	this.returnCancelActionScript = function(logic,caPos,id) { // Returns a string that, when interpreted by Sugarcube 2, allows the player to cancel a
															// continued action under specific logic
		
		var script = "";
		
		switch(logic) {
			case "noCost":
				script = '<<link "Cancel" "Scene">>'
					   + '<<' + 'script>>'
					   + 'State.variables.sc.removeContinuedAction(' + caPos + '); '
					   + 'State.variables.sc.removeCancelActionButtonByID(' + id + ');\n'
//					   + 'State.variables.sc.actionsDescription = "The action was canceled";'
					   + 'State.variables.sc.formatScenePassage();\n'
					   + '<<' + '/script>>'
					   + '<</link>>';
				break;
			case "passTurn":
				script = '<<link "Cancel" "Scene">>'
					   + '<<' + 'script>>'
					   + 'if ( State.variables.sc.flagSceneEnded == false ) { '
					   + 'State.variables.sc.removeContinuedAction(' + caPos + '); '
					   + 'State.variables.sc.removeCancelActionButtonByID(' + id + ');\n'
					   + 'State.variables.sc.formatScenePassage();\n'
					   + 'State.variables.sc.pcChosenAction = "doNothing"; '
					   + 'State.variables.sc.executeTurn();'
					   + ' } ' 
					   + '<<' + '/script>>'
					   + '<</link>>';
				break;
			case "disabled":
				script = "";
				break;
		}
		
		return script;
	}
	
	this.returnCancelPlayerPositionScript = function() {
		var script = "";
		var flagNotLeading = false;
		if ( this.enabledLead != "none" && State.variables.chPlayerCharacter.hasLead == false ) {
			flagNotLeading = true;
		}
		if ( this.sceneType == "bs" ) {
			if ( State.variables.chPlayerCharacter.position.type != "passive" && State.variables.chPlayerCharacter.position.type != "free" ) {
				script = '<<link "Cancel Player Position" "Scene">>'
				   + '<<' + 'script>>'
				   + 'State.variables.sc.cancelPosition("chPlayerCharacter");'
				   + 'State.variables.sc.positionsDescription = "";'
				   + 'State.variables.sc.actionsDescription = "The position was canceled.";\n'
				   + 'State.variables.sc.formatScenePassage();\n'
				   + '<<' + '/script>>'
				   + '<</link>>\n';
			}
		}
		else if ( this.sceneConditions.includes("cantCancelPositions") == false && flagNotLeading == false ) {
			script = '<<link "Cancel Player Position" "Scene">>'
				   + '<<' + 'script>>'
				   + 'State.variables.sc.cancelPosition("chPlayerCharacter");'
				   + 'State.variables.sc.positionsDescription = "";'
				   + 'State.variables.sc.actionsDescription = "The position was canceled.";\n';
				   
			script += 'State.variables.sc.formatScenePassage();\n'
				   + '<<' + '/script>>'
				   + '<</link>>\n';
		}
		return script;
	}
	
	// Controls
	this.formatActionsOptionList = function(pcChar) {
		this.formattedActionsOptionList = '<<listbox "$sc.pcChosenAction" $sc.pcChosenAction>>\n';
		for (var actionKey of this.listUsableActions(pcChar.varName)) {
			if ( this.isActionAllowed(pcChar,State.variables.saList[actionKey]) == true ) {
				// this.sceneLog += "// " + actionKey + " //";
				this.formattedActionsOptionList += '<<option $saList.' + actionKey + '.name ' + actionKey;
				if ( actionKey == this.lastPlayerCommand ) {
					this.formattedActionsOptionList += " selected";
				}
				this.formattedActionsOptionList += '>>\n';
			}
		}
		this.formattedActionsOptionList += '<</listbox>>';
	}
	
	this.formatTargetsOptionList = function() {
		this.formattedTargetsOptionList = "";
		var i = 0;
		for ( var character of this.teamBcharKeys ) {
			this.formattedTargetsOptionList += '<label><<radiobutton "$sc.pcChosenTargets[0]" ' + character;
			if ( character == this.teamBcharKeys[0] && i == 0 ) { // Check if it's first target at the start of the scene
				this.formattedTargetsOptionList += ' checked';
			}
			else if ( character == this.lastPlayerTarget ) { // Check if it's last target
				this.formattedTargetsOptionList += ' checked';
			}
			this.formattedTargetsOptionList += '>> ' + getChar(character).formattedName + '</label>\n';
			i++;
		}
		for ( var character of this.teamAcharKeys ) {
			this.formattedTargetsOptionList += '<label><<radiobutton "$sc.pcChosenTargets[0]" ' + character;
			if ( character == this.lastPlayerTarget ) { // Check if it's last target
				this.formattedTargetsOptionList += ' checked';
			}
			this.formattedTargetsOptionList += '>> ' + getChar(character).formattedName + '</label>\n';
		}
	}
	
	this.isPlayerActionUsable = function() {
		return isActionUsable(this.pcChosenAction,"chPlayerCharacter",this.pcChosenTargets);
	}
	
	this.refreshIsPcActionValid = function() {
		this.isPcActionValid = this.isPlayerActionUsable();
	}
	
	this.getButtonHideFullAvatar = function() {
		var bText = "<<l" + "ink [[[ x ]|Scene]]>><<s" + "cript>>";
		bText 	 += "State.variables.sc.flagFullAvatar = false;\n";
		bText	 += "State.variables.sc.formatScenePassage();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.getButtonShowFullAvatar = function(character) {
		var bText = "<<l" + "ink [[[ + ]|Scene]]>><<s" + "cript>>";
		bText 	 += "State.variables.sc.flagFullAvatar = true;\n";
		bText	 += "State.variables.sc.selectedFullAvatar = '" + character + "';\n";
		bText	 += "State.variables.sc.formatScenePassage();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	// Descriptions
	this.textOrgasmMessage = function(charKey,overflow) {
		var orgasmText = getChar(charKey).name + " reached climax for " + (getChar(charKey).lust.max + overflow).toFixed(2) + " total lust damage.";
		return orgasmText;
	}
	
	this.refreshCharacterDescriptions = function() {
		
		this.charactersDescription = "";
		var flagTeamA = true;
		var barsText = "";
		if (this.teamAcharKeys.length < 2) {
			for (let character in this.teamAcharKeys) { 
				if (getChar(this.teamAcharKeys[character]).varName == "chPlayerCharacter") {
					flagTeamA = false;
				}
			}
		}
		if (flagTeamA == true) {
			this.charactersDescription += "''Team A'':\n";
			for (let character in this.teamAcharKeys) {
				this.charactersDescription += getChar(this.teamAcharKeys[character]).formattedName + " " + getChar(this.teamAcharKeys[character]).getCharScreenButton("*") + " :\n";
				barsText = getChar(this.teamAcharKeys[character]).textBars();
				this.charactersDescription += barsText + "\n\n";
			}
			this.charactersDescription += "\n";
		}
		this.charactersDescription += "''Team B'':\n";
		for (let character in this.teamBcharKeys) {
			this.charactersDescription += getChar(this.teamBcharKeys[character]).formattedName + " " + getChar(this.teamBcharKeys[character]).getCharScreenButton("*") + " :\n";
			barsText = getChar(this.teamBcharKeys[character]).textBars();
			this.charactersDescription += barsText + "\n\n";
		}
	}
	this.refreshPositionsDescriptions = function() {
		this.positionsDescription = "";
		var uncheckedChars = this.teamAcharKeys.concat(this.teamBcharKeys);
		var checkedChars = [];
		
		for ( var key of uncheckedChars ) {
			if ( checkedChars.includes(key) == false ) {
				if ( getChar(key).position.type != "free" ) {
					if ( this.positionsDescription != "" ) { this.positionsDescription += "\n"; } 
					this.positionsDescription += colorText(("[" + getChar(key).position.name + "] "),"darkgray");
					this.positionsDescription += getChar(key).position.description;
					checkedChars.push(key);
					
					if ( gC(key).position.hasOwnProperty("initiator") ) {
						checkedChars.push(gC(key).position.initiator);
						if ( gC(key).position.hasOwnProperty("secondaryInitiators") ) {
							checkedChars = checkedChars.concat(gC(key).position.secondaryInitiators);
						}
					}
					
					if ( gC(key).position.hasOwnProperty("targetsList") ) {
						checkedChars = checkedChars.concat(getChar(key).position.targetsList);
						for ( var target of getChar(key).position.targetsList ) {
							if ( gC(target).position.hasOwnProperty("secondaryInitiators") ) {
								checkedChars = checkedChars.concat(gC(target).position.secondaryInitiators);
							}
						}
					}
				}
			}
		}
		
		if ( this.positionsDescription != "" ) {
			this.positionsDescription += "\n";
			var cancelPosScript = this.returnCancelPlayerPositionScript();
			this.positionsDescription += this.returnCancelPlayerPositionScript();
			this.positionsDescription += "\n";
		}
	}

	this.logAccumulatedDamage = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys );
		for ( var character of charKeys ) {
			this.sceneLog += " " + getChar(character).textAccumulatedDamages();
		}
	}

	// UI
	this.formatScenePassage = function() {
		this.formatActionsOptionList(getChar("chPlayerCharacter"));
		this.formatTargetsOptionList();
		var pas = "<div>";
		// Right Avatar Div
		if ( this.flagFullAvatar ) {
			pas += this.formatFullAvatarDiv();
		} else {
			pas += '<<removeclass "#right-ui-bar" "stowed">>';
		}
		// Standard Scene Passage
		pas += "<div>";
		if ( this.importantMessages != "" ) { pas += "<div class='standardBox'>" + this.importantMessages + "\\ </div> \n"; }
		if ( this.outHeadingDescription != "" ) { pas += "<div class='standardBox'>" + this.outHeadingDescription + "\\ </div> \n"; }
		if ( this.positionsDescription != "" || this.actionsDescription != "" || this.cancelActionButtons.length > 0 ) {
			pas += "<div class='standardBox'>";
		}
		if ( this.positionsDescription != "" ) { pas += this.positionsDescription + "\\ \n"; }
		if ( this.actionsDescription != "" ) { pas += this.actionsDescription + "\\ \n"; }
		if ( this.actionsDescriptionNl ) { pas += "\n"; }
		if ( this.cancelActionButtons.length > 0 ) {
			for ( var cab of this.cancelActionButtons ) {
				if ( cab[1] != "" ) {
					pas += cab[1] + "\n";
				}
				pas += cab[2];
			}
		}
		if ( this.positionsDescription != "" || this.actionsDescription != "" || this.cancelActionButtons.length > 0 ) {
			pas += "</div>\n";
		}
		
		else if ( this.actionsDescription != "" ) { // I know this looks strange.
			pas += "\n";
		}
		
		var l = 0;
		if ( this.otherMessages.length > 0 ) {
			pas += "<div class='standardBox'>";
			for ( var mes of this.otherMessages ) {
				if ( l > 0 ) { pas+= "\n"; }
				pas += mes;
				l++;
			}
			pas += "</div>\n";
		}
		
		if ( this.flagSceneEnded == false ) { // Scene has not ended
			if ( this.isPlayerInScene() && State.variables.chPlayerCharacter.koed == false ) { // Player is in scene
				pas += this.askForLeadScript + "\\"
					 + "\n" + this.getActionDescriptionButton() + "\n"
					 + this.formattedActionsOptionList + "\n"
					 + "Target:\n"
					 + this.formattedTargetsOptionList + "\n"
					 + this.getCommitActionButton();
					 // If end condition = turns && player in scene
					 // Print remaining turns
					 if ( ( this.checkEndConditions == endConditionTurns ) && ( this.teamAcharKeys.includes("chPlayerCharacter") || this.teamBcharKeys.includes("chPlayerCharacter") ) ) {
						 pas += "\n\nRemaining turns: " + (this.endConditionsVars + 1 - this.currentTurn);
						 //"currentTurn": 2, "turnLimit": -1, "importantMessages": "", "headingDe
					 }
			} else {						// Player isn't in scene
				pas += this.getPassTurnButton();
			}
		} else {
			if ( this.endSceneMessage != "" ) { pas += this.endSceneMessage + "\n\n"; }
			pas += this.endScenePassageScript;
		}
		pas += "</div></div>";
		this.scenePassage = pas;
	}
	
	this.getActionDescriptionButton = function() {
		var tButton = "<<cli" + 'ck "Action description">>\n'
				   + '<<scr' + 'ipt>>' + 'var dialog = Dialog.setup("Action Description", "my-dialog-class");\n'
				   + 'new Wikifier(dialog, Story.get("Scene Tests Dialog Box").processText());\n'
				   + 'Dialog.open();\n'
				   + '<</scr' + 'ipt>> \\'
				   + '<</c' + 'lick>>';
		return tButton;
	}
	this.getCommitActionButton = function() {
		var tButton = '<<l' + 'ink [[Commit action|Scene]]>>\n<<sc' + 'ript>>\n'
					+ 'State.variables.sc.refreshIsPcActionValid();\n'
					+ 'if ( State.variables.sc.isPcActionValid.isUsable === false ) {\n'
					+ 'var dialog = Dialog.setup("Action cannot be used", "my-dialog-class");\n'
					+ 'new Wikifier(dialog, Story.get("Scene IsActionUsable Box").processText());\n'
					+ 'Dialog.open();\n' + '} else {\n'
					+ 'State.variables.sc.executeTurn();\n}'
					+ '<</s' + 'cript>><</l' + 'ink>><sup>[q]</sup>';
		return tButton;
	}
	this.getPassTurnButton = function() {
		var tButton = '<<l' + 'ink [[Next Turn|Scene]]>>\n<<sc' + 'ript>>\n'
					+ 'State.variables.sc.executeTurn();\n'
					+ '<</s' + 'cript>><</l' + 'ink>><sup>[q]</sup>';
		return tButton;
	}

	this.formatFullAvatarDiv = function() {
		var dText = '<<removeclass "#right-ui-bar" "stowed">> \ '
		
		if ( gC(this.selectedFullAvatar).fullPortrait != null ) {															// Image
			dText += '\n<<addclass "#right-ui-bar" "stowed">> \ ' + '<div class="portraitBox">' + '<center>' + this.getButtonHideFullAvatar() + '</center>'
				   + '\n<img src="' + gC(this.selectedFullAvatar).fullPortraitL + '" alt="" style="float: right"></div>';
		} else if ( gC(this.selectedFullAvatar).avatar != null ) {
			dText += '\n<<addclass "#right-ui-bar" "stowed">> \ ' + '<div class="portraitBox">' + '<center>' + this.getButtonHideFullAvatar() + '</center>'
				   + '\n<img src="' + gC(this.selectedFullAvatar).avatarL + '" alt="" style="float: right"></div>';
		}
		
		return dText;
	}
	
	// Meta-controls
	this.markNextTurnLink = function() {
		if ( this.flagSceneActive ) {
			State.variables.foundLinks = $("#passages a").toArray();
			var nextTurnLinkPosition = State.variables.foundLinks.length - 1;
			if ( State.variables.foundLinks[nextTurnLinkPosition].id != undefined ) {
				State.variables.foundLinks[nextTurnLinkPosition].id = "nextTurnLink";
			}
			State.variables.keysAssigned = [["q","nextTurnLink"],["Q","nextTurnLink"]];
		}
		else {
			State.variables.keysAssigned = [];
		}
	}
	
};

// Constructors, serializers, etc.
scene.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

scene.prototype.clone = function () {
	return (new scene())._init(this);
};

scene.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new scene())._init($ReviveData$)', ownData);
};

////////// END CONDITIONS FUNCTIONS //////////

window.endConditionTurns = function(turns) {
	var flagEndScene = false;
	
	if ( State.variables.sc.currentTurn > turns ) {
		flagEndScene = true;
	}
	
	return flagEndScene;
}

window.endConditionStandardBattle = function(turns) {
	var flagEndScene = false;
	var sceneResult = "none";
	var charKeys = State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys);
	var ckL = charKeys.length;
	var i = 0;
	
	// Check stalemate
	var posStalemate = true;
	while ( posStalemate && i < ckL ) {
		if ( gC(charKeys[i]).koed == false ) {
			posStalemate = false;
		}
		i++;
	}
	if ( posStalemate ) {
		flagEndScene = true;
		sceneResult = "stalemate";
	}
	
	// Check Team A victory
	if ( flagEndScene == false ) {
		var posTeamAwin = true;
		i = 0;
		while ( posTeamAwin && i < State.variables.sc.teamBcharKeys.length ) {
			if ( gC(State.variables.sc.teamBcharKeys[i]).koed == false ) {
				posTeamAwin = false;
			}
			i++;
		}
		if ( posTeamAwin ) {
			flagEndScene = true;
			sceneResult = "teamAwin";
		}
	}
	
	// Check Team B victory
	if ( flagEndScene == false ) {
		var posTeamBwin = true;
		i = 0;
		while ( posTeamBwin && i < State.variables.sc.teamAcharKeys.length ) {
			if ( gC(State.variables.sc.teamAcharKeys[i]).koed == false ) {
				posTeamBwin = false;
			}
			i++;
		}
		if ( posTeamBwin ) {
			flagEndScene = true;
			sceneResult = "teamBwin";
		}
	}
	
	if ( flagEndScene ) { State.variables.sc.extraEndInfo = sceneResult; }
	return flagEndScene;
}
window.createEndConditionStoryBattle = function(passageVictoryTeamA,passageVictoryTeamB) {
	var customScript = function(turns) {
		var flagEndScene = endConditionStandardBattle(turns);
		if ( State.variables.sc.extraEndInfo == "teamAwin" ) { // Team A wins
			State.variables.sc.endScenePassage = passageVictoryTeamA;
		} else { // Team A doesn't win
			State.variables.sc.endScenePassage = passageVictoryTeamB;
		}
		if ( flagEndScene ) {
			this.refreshEndScenePassageScript();
		}
		return flagEndScene;
	}
	return customScript;
}


