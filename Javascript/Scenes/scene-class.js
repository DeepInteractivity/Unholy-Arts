////////// SCENE CLASS //////////

window.scene = function() {
	this.sceneLog = ""; // Debug console
	this.logAi = false;
	
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
	this.genericDialogs = "";
	this.enabledDialogues = true;
	this.headingDescription = "";
	this.outHeadingDescription = "";
	this.charactersDescription = "";
	this.positionsDescription = "";
	this.actionsDescription = "";
	this.extraEffectsDescription = "";
	this.actionsDescriptionNl = false;
	this.otherMessages = [];
	
	this.cancelActionButtons = []; // Each element is a list [ID,CommandScript,Description]
	this.cabID = 0; // ID for each cancelActionButton. It's assigned to the new cab, then incremented. Should be cleaned at the end of the scene.
	this.testingActionChances = false;
	
	this.provisionalInfo = "";
	
	this.checkEndConditions = function() {
		return true;
	}
	this.endConditionsVars = 0;
	this.flagSceneEnded = false;
	this.flagSceneActive = false;
	this.extraEndInfo = "";
	
	this.endRoundEffects = []; // Functions to be executed and cleaned at the end of every round
	
	this.flagFullAvatar = false;
	this.selectedFullAvatar = "chPlayerCharacter";
	
	// this.tempData // This parameter may be manually set by an external function, and is always removed upon cleaning the scene
	
	this.endSceneMessage = "The scene is finished.";
	this.endScenePassage = "";
	this.endScenePassageScript = "";
	
	this.endSceneScript = function() {
		return true;
	}
	
		// Battle extra parameters
	this.stakes = 1;
	this.aggressor = "";
	this.defender = "";
	
	this.customScript = function() {
		return 1;
	}
	// This function is automatically called at the end of every turn. It may be manually changed to create special behavior for a specific scene.
	this.customActionAllowed = null; // function(actionKey,actorKey,targetsKeys)
	// When this function exists, checks if the actor can use the specified actionKey against the specified targets
	
};

// Methods
	// Start-up // This must be called whenever the game starts a scene
	scene.prototype.startScene = function( sceneType, enabledLead,
								tAck, tBck,
								headingDescription,
								checkEndConditions, endConditionsVars,
								endScenePassage ) {
		this.sceneLog = "";
		this.sceneLog += "Cleaning previous scene. "; //DEP//
		
		var teamAcharKeys = [];
		var teamBcharKeys = [];
		// Remove males if disabled
		for ( var cK of tAck ) {
			var valid = true;
			if ( gSettings().lewdMales == "disable" && sceneType == "ss" ) {
				if ( cK != "chPlayerCharacter" && gC(cK).perPr == "he" ) {
					valid = false;
				}
			}
			if ( valid ) { teamAcharKeys.push(cK); }
		}
		for ( var cK of tBck ) {
			var valid = true;
			if ( gSettings().lewdMales == "disable" && sceneType == "ss" ) {
				if ( cK != "chPlayerCharacter" && gC(cK).perPr == "he" ) {
					valid = false;
				}
			}
			if ( valid ) { teamBcharKeys.push(cK); }
		}
		
		// Swap teams if required
		if ( teamBcharKeys.includes("chPlayerCharacter") ) {
			var tempTeamKeys = teamBcharKeys;
			teamBcharKeys = teamAcharKeys;
			teamAcharKeys = tempTeamKeys;
		}
		
		// Initialize vars
		this.sceneType = sceneType;
		this.enabledLead = enabledLead;
		this.sceneConditions = [];
		this.currentTurn = 1;
		
		var allChars = [];
		var newTeamAchars = [];
		var newTeamBchars = [];
		for ( var cK of teamAcharKeys ) {
			if ( allChars.includes(cK) == false ) {
				newTeamAchars.push(cK);
				allChars.push(cK);
			}
		}
		for ( var cK of teamBcharKeys ) {
			if ( allChars.includes(cK) == false ) {
				newTeamBchars.push(cK);
				allChars.push(cK);
			}
		}
		
		this.teamAcharKeys = newTeamAchars;
		this.teamBcharKeys = newTeamBchars;
		
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
		this.extraEffectsDescription = "";
		
		this.cancelActionButtons = [];
		this.cabID = 0; 
		this.endRoundEffects = [];
		
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
		
		this.turnsWithoutActions = 0;
		
		applyRequiredScenePatches();
		
		this.formatScenePassage();
		
		// bgAutosolve -> Manually set flag. Should prevent the scene from formatting passages
	}
	
	scene.prototype.autoResolveScene = function() {
		while ( this.flagSceneEnded == false ) {
			this.executeTurn();
		}
		this.cleanScene();
	}
	scene.prototype.autoResolveSceneAlt = function() {
		while ( this.flagSceneEnded == false ) {
			this.executeTurn();
		}
	}
	scene.prototype.autoResolveSceneBackground = function() {
		State.variables.sc.bgAutosolve = true;
		while ( this.flagSceneEnded == false ) {
			this.executeTurn();
		}
		this.cleanScene();
	}
	
	// Management
	scene.prototype.removeContinuedAction = function(caPosition) {
		this.continuedActions[caPosition].freeBodyparts();
		this.continuedActions[caPosition].forgetAssociatedActions();
		if ( this.continuedActions[caPosition].hasOwnProperty("flagUsingWeapon") ) {
			setCharsWeaponUnused(this.continuedActions[caPosition].initiator);
		}
		this.continuedActions.splice(caPosition,1);
	}
	scene.prototype.removeContinuedActionById = function(caId) {
		//this.continuedActions[caPosition].freeBodyparts();
		//this.continuedActions.splice(caPosition,1);
		
		var i = 0;
		var j = -1;
		for ( var cab of this.cancelActionButtons ) {
			if ( caId == cab[0] ) {
				j = i;
			}
			i++;
		}
		if ( j != -1 ) {
			this.removeContinuedAction(j);
			//this.cancelActionButtons.splice(j,1);
		}
	}
	scene.prototype.cleanContinuedActions = function() {
		var i = this.continuedActions.length;
		
		while ( i > 0 ) {
			i--;
			this.removeContinuedAction(i);
		}
	}
	scene.prototype.refreshEndScenePassageScript = function() {
		this.endScenePassageScript = '<p id="continueButton"><<link "Continue" "' + this.endScenePassage + '">>'
								   + '<<' + 'script>>'
								   // + 'State.variables.sc.endSceneScript();\n'
								   + 'State.variables.sc.cleanScene();\n'
								   + '<<' + '/script>>'
								   + '<</link>></p>';
	}
	
	scene.prototype.removeCancelActionButtonByID = function(id) {
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
	
	scene.prototype.initiateLeadPoints = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		var validCharKeys = [];
		var purgedCharKeys = [];
		for ( var charKey of charKeys ) {
			if ( doesCharHaveSceneTag(charKey,"noLead") ) {
				purgedCharKeys.push(charKey);
			} else {
				validCharKeys.push(charKey);
			}
		}
		var rCharKeys = shuffleArray(validCharKeys);
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
		
		for ( var charKey of purgedCharKeys ) {
			gC(charKey).lead = 0;
			gC(charKey).hasLead = false;
		}
		
		// Set lead gain rate
		this.leadGainRate = 100 / (2 * rCharKeys.length);
	}
	scene.prototype.setLeadGainRate = function() { // OBSOLETE
		var nChars = this.teamAcharKeys.length + this.teamBcharKeys.length;
		this.leadGainRate = 100 / (2 * nChars);
	}
	scene.prototype.addTurnLeadPoints = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			if ( doesCharHaveSceneTag(key,"noLead") == false ) {
				gC(key).lead += this.leadGainRate * gC(key).leadMultiplier * (gC(key).willpower.current / gC(key).willpower.max);
				if ( gC(key).lead > 100 ) {
					gC(key).lead = 100;
				}
			}
		}
	}
	scene.prototype.assignNewLead = function() {
		this.giveLeadToChar(randomFromList(this.askedForLead));
	}
	scene.prototype.removeNonleadPermissions = function() {
		for ( var cK of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
			removeAlteredStateByAcr(cK,"CAal");
		}
	}
	
	scene.prototype.giveLeadToChar = function(charKey) {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			if ( gC(key).hasLead == true ) {
				gC(key).hasLead = false;
				gC(key).lead = 0;
			}
		}
		gC(charKey).hasLead = true;
	}
	scene.prototype.offerLeadToNpcs = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			if ( gC(key).hasLead == false && gC(key).lead == 100 && (key != "chPlayerCharacter") ) {
				this.askedForLead.push(key);
			}
		}
	}
	scene.prototype.refreshAskForLeadScript = function() {
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
	
	scene.prototype.cleanLeadPoints = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			getChar(key).lead = 0;
			getChar(key).hasLead = false;
		}		
	}
	scene.prototype.cleanControl = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			cleanCharControl(key);
		}		
	}
	scene.prototype.cleanSceneOrgasms = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			getChar(key).orgasmSceneCounter = 0;
			gC(key).mindblowingOrgasmSC = 0;
			getChar(key).ruinedOrgasmSceneCounter = 0;
			gC(key).conNMbOrgSC = 0;
		}		
	}
	scene.prototype.cleanAccumulatedDamages = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			getChar(key).cleanAccumulatedDamages();
		}
	}
	scene.prototype.cancelPosition = function(charKey,playerCanceled) {
		var affectedChars = findAllConnectedCharsByPositionMinusList(charKey,[]);
		for ( var cK of affectedChars ) {
			getChar(cK).position.free();
			if ( State.variables.sc.sceneType == "bs" ) {
				if ( playerCanceled != true ) {
					//gC(cK).lostControlTurns = 0;
					//gC(cK).control = gC(cK).maxControl / 2;
				} else {
					gainControlBack(cK);
				}
			}
		}
	}
	scene.prototype.cleanAllPositions = function() {
		var charList = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var charKey of charList ) {
			getChar(charKey).position.free();
		}
	}
	scene.prototype.cleanAlteredStates = function() {
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
	scene.prototype.cleanKoedFlags = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			getChar(key).koed = false;
		}	
	}
	
	scene.prototype.cleanScene = function() {	
		this.endSceneScript();
		
		if ( this.sceneType == "ss" ) {
			for ( var character of this.teamAcharKeys.concat(this.teamBcharKeys) ) {
				if ( gC(character).hasOwnProperty("daysWithoutSex") ) {
					gC(character).daysWithoutSex = 0;
					gC(character).sexScenesToday += 1;
				}
			}
		}
		
		// this.logAccumulatedDamage();
		this.enabledLead = "none";
		this.cleanAccumulatedDamages();
		this.cleanLeadPoints();
		this.cleanControl();
		
		this.cleanSceneOrgasms();
		
		this.cleanContinuedActions();
		this.cleanAllPositions();
		this.endRoundEffects = [];
		
		this.cleanAlteredStates();
		this.cleanKoedFlags();		
		
		this.sceneType = "";
		
		cleanSceneTags();
		
		for ( var charKey of this.teamAcharKeys ) {
			gC(charKey).turnPrefTags = [];
		}
		for ( var charKey of this.teamBcharKeys ) {
			gC(charKey).turnPrefTags = [];
		}
		
		this.teamAcharKeys = [];
		this.teamBcharKeys = [];
		
		this.teamAchosenActions = [];
		this.teamAchosenTargets = [];
		this.teamBchosenActions = [];
		this.teamBchosenTargets = [];
		
		if ( this.spectators != undefined ) {
			delete this.spectators;
		}
		
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
		this.genericDialogs = "";
		this.enabledDialogues = true;
		this.headingDescription = "";
		this.charactersDescription = "";
		this.actionsDescription = "";
		this.extraEffectsDescription = "";
		this.otherMessages = [];
		
		this.provisionalInfo = "";
		
		this.flagFullAvatar = false;
		this.selectedFullAvatar = "chPlayerCharacter";
		
		this.cleanCustomDialogues();
		delete this.turnsWithoutActions;
		
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
		
		if ( this.genericCharacters != undefined ) {
			for ( var chKey of this.genericCharacters ) {
				delete State.variables[chKey];
			}
			delete this.genericCharacters;
		}
		if ( this.extraJoinedCharacters != undefined ) {
			delete this.extraJoinedCharacters;
		}
		if ( this.initialCharacters != undefined ) {
			delete this.initialCharacters;
		}
		
		if ( this.tfFlag != undefined ) {
			this.cleanTfSceneData();
		}
		if ( this.flightFlag != undefined ) {
			delete this.flightFlag; // Run Away flag
			if ( this.charactersHaveFledFlag != undefined ) {
				delete this.charactersHaveFledFlag;
			}
		}
		
		if ( this.hasOwnProperty("tempData") ) {
			delete this.tempData;
		}
		if ( this.hasOwnProperty("bgAutosolve") ) {
			delete this.bgAutosolve;
		}
		
		this.customActionAllowed = null;
	}
	
	scene.prototype.getCharacterContext = function(charKey) {
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
	
	scene.prototype.isPlayerInScene = function() {
		var flagPcInScene = false;
		
		if ( this.teamAcharKeys.includes("chPlayerCharacter") || this.teamBcharKeys.includes("chPlayerCharacter") ) {
			flagPcInScene = true;
		}
		
		return flagPcInScene;
	}
	
	scene.prototype.cleanNegativeBars = function() {
		for ( var character of this.teamAcharKeys.concat(this.teamBcharKeys) ) {
			for ( var bar of ["willpower","energy","socialdrive"] ) {
				if ( gC(character)[bar].current < 0 ) {
					gC(character)[bar].current = 0;
				}
			}
			if ( gC(character).lead < 0 ) {
				gC(character).lead = 0;
			}
		}
	}
	
	scene.prototype.setBattleParameters = function(stakes,attacker,defender) {
		this.stakes = stakes;
		this.aggressor = attacker;
		this.defender = defender;
	}
	
	window.getCharsTeam = function(cK) {
		var team = [];
		if ( gC("sc").teamAcharKeys.includes(cK) ) {
			team = gC("sc").teamAcharKeys;
		} else if ( gC("sc").teamBcharKeys.includes(cK) ) {
			team = gC("sc").teamBcharKeys;
		}
		return team;
	}
	window.getCharsTeamMinusSelf = function(cK) {
		var team = arrayMinusA(getCharsTeam(cK),cK);
		return team;
	}
	
	// Logic
	
	scene.prototype.isActionAllowed = function(actor,sceneAction) {
		var isAllowed = true;
		if ( sceneAction.tags.includes(this.sceneType) == false ) {
			isAllowed = false;
		}
		
		return isAllowed;
	}
	scene.prototype.listUsableActions = function(actorKey) {
		// This function creates a list with the keys of all actions that are usable in some way during this turn by a given character.
		// This requires to check every action known by the character, and test its usability against any different target.
		var list = ["doNothing"];
		var charList = this.teamAcharKeys.concat(this.teamBcharKeys);
		
		for ( var actionKey of gC(actorKey).getSaList() ) {
			for ( var target of charList ) {
				if ( list.includes(actionKey) == false ) {
					if ( this.isActionAllowed(actorKey,setup.saList[actionKey]) == true && isActionUsable(actionKey,actorKey,[target],false).isUsable == true ) {
						list.push(actionKey);
					}
				}
			}
		}
		
		return list;
	}
	scene.prototype.listUsableActionsOnTarget = function(actorKey,targetKey) {
		var list = ["doNothing"];
		var charList = this.teamAcharKeys.concat(this.teamBcharKeys);
		if ( gC(targetKey).koed ) {
			// Only "doNothing" is usable
		} else {
			
		for ( var actionKey of gC(actorKey).getSaList() ) {
				if ( list.includes(actionKey) == false ) {
					if ( this.isActionAllowed(actorKey,setup.saList[actionKey]) == true && isActionUsable(actionKey,actorKey,[targetKey],false).isUsable == true ) {
						list.push(actionKey);
					}
				}
			}
		}
		
		return list;
	}
	scene.prototype.listValidActionTargetCombinationsByChar = function(actor) {
		var list = []; // [[action,target],[action,target]...]
		for ( var target of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
			var actionsBatch = this.listUsableActionsOnTarget(actor,target);
			for ( var action of actionsBatch ) {
				if ( action != "doNothing" ) {
					list.push([action,target]);
				}					
			}
		}
		return list;
	}
	
	scene.prototype.checkUnvalidContinuedActions = function() {
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
	scene.prototype.checkUnvalidContinuedAction = function(position) {
		var flagCancelAction = false;
		var cA = this.continuedActions[position];
		
		for ( var caTag of cA.tags ) {
			switch(caTag) {
				case "activePosition":
					if ( getImmediatelyConnectedCharsToChar(cA.initiator).includes(cA.targetsList[0]) == false ) {
						flagCancelAction = true;
					}
					break;
			}
		}
		
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
	
	scene.prototype.applyPrefTurnTags = function() {
		if ( this.sceneType == "ss" ) {
			var i = 0;
			for ( var action of this.teamAchosenActions ) {
				var actor = this.teamAcharKeys[i];
				var targets = this.teamAchosenTargets[i];
				if ( isActionUsable(action,actor,targets,false) ) {
					for ( var flavorTag of setup.saList[action].flavorTags ) {
						if ( gC(actor).turnPrefTags.includes(flavorTag) == false ) { gC(actor).turnPrefTags.push(flavorTag); }
						var opTag = getOppositeTag(flavorTag);
						for ( var target of targets ) {
							if ( gC(actor).turnPrefTags.includes(opTag) == false ) { gC(actor).turnPrefTags.push(opTag); }
						}
					}
				}
				i++;
			}
			i = 0;
			for ( var action of this.teamBchosenActions ) {
				var actor = this.teamBcharKeys[i];
				var targets = this.teamBchosenTargets[i];
				if ( isActionUsable(action,actor,targets,false) ) {
					for ( var flavorTag of setup.saList[action].flavorTags ) {
						if ( gC(actor).turnPrefTags.includes(flavorTag) == false ) { gC(actor).turnPrefTags.push(flavorTag); }
						var opTag = getOppositeTag(flavorTag);
						for ( var target of targets ) {
							if ( gC(actor).turnPrefTags.includes(opTag) == false ) { gC(actor).turnPrefTags.push(opTag); }
						}
					}
				}
				i++;
			}
		}
	}
	
	scene.prototype.executeActions = function() {
		this.actionsDescription = "";
		var i = 0;
		
		if ( this.sceneType == "bs" ) {
										// This code is trash, but it works well, so do not touch it much @vvv@ //
			var unorderedActions = [];
			// Reorder data
			var actionsInfo = new weightedList(); 
			var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
			for ( var actK of this.teamAchosenActions ) {
				if ( actK != "" ) {
					actionsInfo[this.teamAcharKeys[i]] = [ this.teamAcharKeys[i] , actK , this.teamAchosenTargets[i] ];
				}
				i++;
			}
			i = 0;
			for ( var actK of this.teamBchosenActions ) {
				if ( actK != "" ) {
					actionsInfo[this.teamBcharKeys[i]] = [ this.teamBcharKeys[i] , actK , this.teamBchosenTargets[i] ];
				}
				i++;
			}
			// Divide actions to execute by blocks of priority
			while ( getActionsInfoLength(actionsInfo) > 0 ) {
				var highestPriority = findHighestPriorityInActionsInfo(actionsInfo);
				var currentChars = [];
				for ( var ai of getActionsInfoListWithPriority(actionsInfo,highestPriority) ) {
					currentChars.push(ai[0]);
				}
				var currentActions = actionsInfoArrayToActionsInfoList(getActionsInfoListWithPriority(actionsInfo,highestPriority))
				actionsInfo = actionsInfoArrayToActionsInfoList(getActionsInfoListWithoutPriority(actionsInfo,highestPriority));
				
				// Out of this priority block, execute all actions with a weighted random order, with luckier characters having higher weight
				// Weighted list
				var wL = new weightedList();
				for ( var charK of currentChars ) {
					wL[charK] = new weightedElement(charK,gC(charK).luck.getValue()); // 135
				}
				// Take weighted random elements from wL, execute their action, delete them from the list, until j == 0
				var j = currentChars.length;
				while ( j > 0 ) {
					var currentC = randomFromWeightedList(wL); // Take weighted random char
					if ( currentActions[currentC] != undefined ) {
						var currentA = currentActions[currentC][1]; // Execute action
						
						if ( State.variables.sc.sceneType == "bs" && gC(currentC).koed == false ) {
							var actionDesc = setup.saList[currentA].description;
							var actionName = "[<span title=" + '"' + actionDesc + '"' + ">" + setup.saList[currentA].name + "</span>] ";
							this.actionsDescription += colorText(actionName,"darkgray");
							this.actionsDescription += tryExecuteAction(currentA,currentC,currentActions[currentC][2]).description;
							this.actionsDescription += "\n";
						}
						
						delete wL[currentC]; // Delete from weighted list
					}
					j--; // Reduce j
				}
			}
		}
		else {
			for (let action of this.teamAchosenActions) {
				// Each chosen action is called in order. The parameters are the acting character and its list of targets.
				// Each action returns a description of its effects, which is added to actionsDescription.
				var actionDesc = setup.saList[action].description;
				var actionName = "[<span title=" + '"' + actionDesc + '"' + ">" + setup.saList[action].name + "</span>] ";
				this.actionsDescription += colorText(actionName,"darkgray");
				this.actionsDescription += tryExecuteAction(action,this.teamAcharKeys[i],this.teamAchosenTargets[i]).description;
				//this.actionsDescription += setup.saList[this.teamAchosenActions[action]].execute(this.teamAcharKeys[i],this.teamAchosenTargets[i]).description;
				this.actionsDescription += "\n";
				i++;
			}
			i = 0;
			for (let action of this.teamBchosenActions) {
				var actionDesc = setup.saList[action].description;
				var actionName = "[<span title=" + '"' + actionDesc + '"' + ">" + setup.saList[action].name + "</span>] ";
				this.actionsDescription += colorText(actionName,"darkgray");
				this.actionsDescription += tryExecuteAction(action,this.teamBcharKeys[i],this.teamBchosenTargets[i]).description;
				//this.actionsDescription += setup.saList[this.teamBchosenActions[action]].execute(this.teamBcharKeys[i],this.teamBchosenTargets[i]).description;
				this.actionsDescription += "\n";
				i++;
			}
		}
	}
			// Here be goblins, shoo //
	window.getActionsInfoLength = function(actionsInfo) {
		var l = 0;
		for ( var i in actionsInfo ) {
			if ( gC(actionsInfo[i][0]) != undefined ){
				l++;
			}
		}
		return l;
	}
	window.findHighestPriorityInActionsInfo = function(actionsInfo) {
		var highestPriority = -1000;
		for ( var i in actionsInfo ) {
			if ( gC(actionsInfo[i][0]) != undefined ){
				var actInf = actionsInfo[i];
				if ( setup.saList[actInf[1]].priority > highestPriority ) {
					highestPriority = setup.saList[actInf[1]].priority;
				}
			}
		}
		return highestPriority;
	}
	window.getActionsInfoListWithPriority = function(actionsInfo,priority) {
		var newList = [];
		for ( var i in actionsInfo ) {
			if ( gC(actionsInfo[i][0]) != undefined ){
				var actInf = actionsInfo[i];
				if ( setup.saList[actInf[1]].priority == priority ) {
					newList.push(actionsInfo[i]);
				}
			}
		}
		return newList;
	}
	window.getActionsInfoListWithoutPriority = function(actionsInfo,priority) {
		var newList = [];
		for ( var i in actionsInfo ) {
			if ( gC(actionsInfo[i][0]) != undefined ){
				var actInf = actionsInfo[i];
				if ( setup.saList[actInf[1]].priority != priority ) {
					newList.push(actionsInfo[i]);
				}
			}
		}
		return newList;
	}
	window.actionsInfoArrayToActionsInfoList = function(actionsInfoArray) {
		var actsInfoList = new weightedList(); 
		for ( var aie of actionsInfoArray ) {
			actsInfoList[aie[0]] = aie;
		}
		return actsInfoList;
	}
			// // //		   // // //
	
	scene.prototype.updateCancelActionButtons = function() {
		this.cabID = 0;
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
	}
	scene.prototype.executeContinuedActions = function() {
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
			this.continuedActions[ca].continuedTurns++;
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
			var nonButton = [,"","" + actionName + actionDescription + "\n"];
			this.cancelActionButtons.push(nonButton);
			this.cabID++;
			i++;
		}
	}
	
	scene.prototype.checkForOrgasms = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys);
		for ( var key of charKeys ) {
			var results = getChar(key).tryOrgasm(); // Overflow is the amount of lust excess after an orgasm.
													 // If -1, there was no orgasm
			var overflow = results[0];
			var type = results[1];
			
			if ( type != "none" ) {
				var orgasmMessage = this.textOrgasmMessage(key,overflow,type);
				this.importantMessages += orgasmMessage + "\n";
				if ( this.sceneType == "bs" ) {
					gC(key).koed = true; // If battle scene, character gets KO'ed
					this.cancelPosition(key,false);
				} else if ( this.sceneType == "ss" ) {
					var str = 7;
					if ( type == "mindblowing" ) {
						str = 20;
					} else if ( type == "ruined" ) {
						str = 15;
					}
					gC(key).influenceSexPrefs(50,limitedRandomInt(str));
				}
			}
		}		
	}
	
	scene.prototype.controlTurnEffects = function() {
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
					assignLostControlTurns(key,1);
				}
				else { // Player has some control, will gradually recover more
					recoverControl(key);
				}
			}
		}
	}
	
	scene.prototype.alteredStatesTurnEffects = function() {
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
	
	scene.prototype.wereThereAnyActions = function() { // Checks if any character chose any action other than "doNothing"
		var thereWereActions = false;
		for ( var act of this.teamAchosenActions ) {
			if ( act != "doNothing" ) {
				thereWereActions = true;
			}
		}
		for ( var act of this.teamBchosenActions ) {
			if ( act != "doNothing" ) {
				thereWereActions = true;
			}
		}
		if ( thereWereActions ) {
			this.turnsWithoutActions = 0;
		} else {
			this.turnsWithoutActions++;
		}
	}
	
	scene.prototype.checkForcedDraw = function() { // Checks if the scene has grown stale. If some, executeTurn() must force a stalemate
		var forcedDraw = false;
		if ( this.turnsWithoutActions >= 3 ) {
			forcedDraw = true;
		}
		return forcedDraw;
	}
	
	scene.prototype.executeTurn = function() {	
		this.sceneLog = "";
		if ( this.logAi == true ) {
			this.sceneLog += "Logging previous turn's AI data:\n";
		}
	
		this.teamAchosenActions = [];  // Clean the stacks
		this.teamAchosenTargets = [];
		this.teamBchosenActions = [];
		this.teamBchosenTargets = [];
		
		this.importantMessages = "";
		this.genericDialogs = "";
		this.actionsDescription = "";
		this.extraEffectsDescription = "";
		this.otherMessages = [];	
		
		for ( var charKey of this.teamAcharKeys ) {
			gC(charKey).turnPrefTags = [];
		}
		for ( var charKey of this.teamBcharKeys ) {
			gC(charKey).turnPrefTags = [];
		}
		
		
		// Choose actions
		State.variables.sc.testingActionChances = true;
		State.variables.sc.strategicAiData = this.generateStrategicAiData();
		var aiResults;
		for ( var character of this.teamAcharKeys ) { // Player character
			if ( gC(character).koed ) { // Ko'ed characters can't act
				this.teamAchosenActions.push("doNothing");
				this.teamAchosenTargets.push([character]);
			}
			else if ( character == "chPlayerCharacter" ) {
				this.teamAchosenActions.push(this.pcChosenAction);
				this.teamAchosenTargets.push(this.pcChosenTargets);
			} 
			else if ( getChar(character).aiAlgorythm != 0 ) { // AI Algorythm
				aiResults = getChar(character).aiAlgorythm.callAction((character),this.teamAcharKeys,this.teamBcharKeys,this.currentTurn);
				this.teamAchosenActions.push(aiResults.actionKey);
				this.teamAchosenTargets.push(aiResults.targetsIDs);
			}
			else { // Everything failed: do nothing
				this.teamAchosenActions.push("doNothing");
				this.teamAchosenTargets.push([]);
			}
		}
		for ( var character of this.teamBcharKeys ) { // Player character
			if ( gC(character).koed ) { // Ko'ed characters can't act
				this.teamBchosenActions.push("doNothing");
				this.teamBchosenTargets.push([character]);
			}
			else if ( getChar(character) == "chPlayerCharacter" ) {
				this.teamBchosenActions.push(this.pcChosenAction);
				this.teamBchosenTargets.push(this.pcChosenTargets);
			}
			else if ( getChar(character).aiAlgorythm != 0 ) { // AI Algorythm
				aiResults = getChar(character).aiAlgorythm.callAction((character),this.teamBcharKeys,this.teamAcharKeys,this.currentTurn);
				this.teamBchosenActions.push(aiResults.actionKey);
				this.teamBchosenTargets.push(aiResults.targetsIDs);
			}
			else { // Everything failed: do nothing
				this.teamBchosenActions.push("doNothing");
				this.teamBchosenTargets.push([]);
			}
		}
		delete this.strategicAiData;
		State.variables.sc.testingActionChances = false;		
		
		// Pre-execute actions
		this.cancelActionButtons = [];
		
		// Execute actions
		this.applyPrefTurnTags();
		this.executeActions();
		
		for ( var effect of this.endRoundEffects ) {
			var efMsg = effect();
			if ( efMsg != "" ) {
				this.actionsDescription += efMsg + "\n";
			}
		}
		this.endRoundEffects = [];
		
		// Execute altered states
		executeAlteredStatesTurnEffects();
		
		// Lead (Part 1)
		this.addTurnLeadPoints();
		if ( this.askedForLead.length > 0 ) {
			this.assignNewLead();
			this.removeNonleadPermissions();
		}		
		
		// Execute continued action
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
			//this.importantMessages = '<span style="color:red">';
			//this.importantMessages += temp;
			//this.importantMessages += '<' + '/span>\n';
		}
		
		// Generate dialogs
		this.generateGenericDialogs();
		// Check heading
		if ( this.headingDescription != "" ) {
			this.outHeadingDescription = this.headingDescription + "\n\n";
		}
		
		// Were there any actions check
		this.wereThereAnyActions();
		
		// Check scene end
		this.flagSceneEnded = this.checkEndConditions(this.endConditionsVars);
		if ( this.flagSceneEnded == false ) {
			if ( this.checkForcedDraw() ) {
				this.flagSceneEnded = true;
				this.extraEndInfo = "stalemate";
			}
		}
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
		
		// Clean turn tags
		cleanTurnTags();
		
		// Format Scene Passage
		this.formatScenePassage();
	}
	
	// Logic 2
	scene.prototype.checkCancelAction = function(cancellingActorKey,continuedAction) { // This function returns the logic of attempting to cancel a continued action
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
	scene.prototype.returnCancelActionScript = function(logic,caPos,id) { // Returns a string that, when interpreted by Sugarcube 2, allows the player to cancel a
															// continued action under specific logic
		
		var script = "";
		
		switch(logic) {
			case "noCost":
				script = '<<link "Cancel" "Scene">>'
					   + '<<' + 'script>>'
					   //+ 'State.variables.sc.removeContinuedAction(' + caPos + '); '
					   + 'State.variables.sc.removeContinuedActionById(' + id + '); '
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
					   //+ 'State.variables.sc.removeContinuedAction(' + caPos + '); '
					   + 'State.variables.sc.removeContinuedActionById(' + id + '); '
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
	
	scene.prototype.returnCancelPlayerPositionScript = function() {
		var script = "";
		var flagNotLeading = false;
		if ( this.enabledLead != "none" && State.variables.chPlayerCharacter.hasLead == false ) {
			flagNotLeading = true;
		}
		if ( this.sceneType == "bs" ) {
			if ( State.variables.chPlayerCharacter.position.type != "passive" && State.variables.chPlayerCharacter.position.type != "free" ) {
				script = '<<link "Cancel Player Position" "Scene">>'
				   + '<<' + 'script>>'
				   + 'State.variables.sc.cancelPosition("chPlayerCharacter",true);'
				   + 'State.variables.sc.positionsDescription = "";\n'
				   + 'State.variables.sc.pcChosenAction = "";\n'
				   + 'State.variables.sc.pcChosenTargets = [];\n'
				   + 'State.variables.sc.executeTurn();\n'
				   + 'State.variables.sc.actionsDescription = "The position was canceled.";\n'
				 //  + 'State.variables.sc.formatScenePassage();\n'
				   + '<<' + '/script>>'
				   + '<</link>>\n';
			}
		}
		else if ( this.sceneConditions.includes("cantCancelPositions") == false && flagNotLeading == false ) {
			if ( gC("chPlayerCharacter").position.type != "free" ) {
				script = '<<link "Cancel Player Position" "Scene">>'
					   + '<<' + 'script>>'
					   + 'State.variables.sc.cancelPosition("chPlayerCharacter",true);'
					   + 'State.variables.sc.positionsDescription = "";'
					   + 'State.variables.sc.actionsDescription = "The position was canceled.";\n';
					   
				script += 'State.variables.sc.formatScenePassage();\n'
					   + '<<' + '/script>>'
					   + '<</link>>\n';
			}
		}
		return script;
	}
	
	// Controls
	scene.prototype.formatActionsOptionList = function(pcChar) {
		this.formattedActionsOptionList = '<<listbox "$sc.pcChosenAction" $sc.pcChosenAction>>\n';
		for (var actionKey of this.listUsableActions(pcChar.varName)) {
			if ( this.isActionAllowed(pcChar,setup.saList[actionKey]) == true ) {
				// this.sceneLog += "// " + actionKey + " //";
				var actionName = setup.saList[actionKey].name;
				this.formattedActionsOptionList += '<<option "' + actionName + '" ' + actionKey;
				if ( actionKey == this.lastPlayerCommand ) {
					this.formattedActionsOptionList += " selected";
				}
				this.formattedActionsOptionList += '>>\n';
			}
		}
		this.formattedActionsOptionList += '<</listbox>>';
	}
	
	scene.prototype.formatTargetsOptionList = function() {
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
	
	scene.prototype.isPlayerActionUsable = function() {
		return isActionUsable(this.pcChosenAction,"chPlayerCharacter",this.pcChosenTargets,false);
	}
	
	scene.prototype.refreshIsPcActionValid = function() {
		this.isPcActionValid = this.isPlayerActionUsable();
	}
	
	scene.prototype.getButtonHideFullAvatar = function() {
		var bText = "<<l" + "ink [[[ x ]|Scene]]>><<s" + "cript>>";
		bText 	 += "State.variables.sc.flagFullAvatar = false;\n";
		bText	 += "State.variables.sc.formatScenePassage();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	scene.prototype.getButtonShowFullAvatar = function(character) {
		var bText = "<<l" + "ink [[[ + ]|Scene]]>><<s" + "cript>>";
		bText 	 += "State.variables.sc.flagFullAvatar = true;\n";
		bText	 += "State.variables.sc.selectedFullAvatar = '" + character + "';\n";
		bText	 += "State.variables.sc.formatScenePassage();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}

	// Descriptions
	scene.prototype.generateGenericDialogs = function() {
		var dialogs = "";
		if ( this.enabledDialogues ) {
			if ( this.sceneType == "ss" ) {
				var threshold = 65 + ( this.teamAcharKeys.length + this.teamBcharKeys.length ) * 5;
				if ( threshold > 85 ) { threshold = 85; }
				var i = 0;
				while ( i < this.teamAcharKeys.length ) {
					var extraThreshold = 0;
					if ( gC(this.teamAcharKeys[i]).hasFreeBodypart("mouth") == false ) {
						(100 - threshold) / 1.5;
					}
					if ( limitedRandomInt(100) > (threshold + extraThreshold) && (this.teamAcharKeys[i] != this.teamAchosenTargets[i] && this.teamAchosenTargets[i][0] != undefined ) ) { // Activate dialog
						var actionsAgainstActor = getActionsAgainstTarget(this.teamAcharKeys[i]);					
						var nd = chooseDialogFromList(setup.dialogDB[this.getDialogsList()],this.teamAcharKeys[i],this.teamAchosenTargets[i][0],this.teamAchosenActions[i],actionsAgainstActor);
						if ( nd != "" ) {
							if ( dialogs == "" ) { dialogs += nd; }
							else { dialogs += "\n" + nd; }
						}
					}
					i++;
				}
				i = 0;
				while ( i < this.teamBcharKeys.length ) {
					var extraThreshold = 0;
					if ( gC(this.teamBcharKeys[i]).hasFreeBodypart("mouth") == false ) {
						(100 - threshold) / 1.5;
					}
					if ( limitedRandomInt(100) > (threshold + extraThreshold) && (this.teamBcharKeys[i] != this.teamBchosenTargets[i] && this.teamBchosenTargets[i][0] != undefined) ) { // Activate dialog
						var actionsAgainstActor = getActionsAgainstTarget(this.teamBcharKeys[i]);					
						var nd = chooseDialogFromList(setup.dialogDB[this.getDialogsList()],this.teamBcharKeys[i],this.teamBchosenTargets[i][0],this.teamBchosenActions[i],actionsAgainstActor);
						if ( nd != "" ) {
							if ( dialogs == "" ) { dialogs += nd; }
							else { dialogs += "\n" + nd; }
						}
					}
					i++;
				}
			}
		}
		this.genericDialogs = dialogs;
	}
	scene.prototype.setDialoguesList = function(dialoguesList) { // Dialogues list is a string that refers to a object in setup.dialogDB
		State.variables.sc.customDialogues = dialoguesList;
	}
	scene.prototype.getDialogsList = function() {
		var dialoguesList = "ssDialogs";
		if ( State.variables.sc.hasOwnProperty("customDialogues") ) {
			dialoguesList = State.variables.sc.customDialogues;
		}
		return dialoguesList;
	}
	scene.prototype.cleanCustomDialogues = function() {
		delete State.variables.sc.customDialogues;
	}
	
	scene.prototype.textOrgasmMessage = function(charKey,overflow,type) {
		var orgasmText = "";
		var actionsAgainstActor = getActionsAgainstTargetIncludingSelf(charKey);
		var description = chooseMessageFromList(setup.dialogDB.orDialogs,charKey,"",type,actionsAgainstActor);
		if ( gC(charKey).race != "monster" ) {
			if ( type == "ruined" ) {
				orgasmText = colorText((gC(charKey).name + " almost reached climax for " + (getChar(charKey).lust.max + overflow).toFixed(2) + " total lust damage, but... "),"red") + colorText((description + " " + gC(charKey).name + " feels " + gC(charKey).posPr + " strength flowing away."),"purple");
			} else if ( type == "mindblowing" ) {
				orgasmText = "//" + colorText((getChar(charKey).name + " reached a most powerful climax for " + (getChar(charKey).lust.max + overflow).toFixed(2) + " lust damage and " + (gC(charKey).willpower.max * 0.2).toFixed(2) + " willpower damage. "),"mediumvioletred") + description + "//";
			} else {
				orgasmText = colorText((getChar(charKey).name + " reached climax for " + (getChar(charKey).lust.max + overflow).toFixed(2) + " total lust damage. "),"red") + description;
			}
		} else {
			orgasmText += colorText(gC(charKey).name + " stops moving as energy expires out of its body.","red");
		}
		orgasmText += " ";
		return orgasmText;
	}
	
	scene.prototype.refreshCharacterDescriptions = function() {
		
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
	scene.prototype.refreshPositionsDescriptions = function() {
		this.positionsDescription = "";
		var uncheckedChars = this.teamAcharKeys.concat(this.teamBcharKeys);
		var checkedChars = [];
		
		for ( var key of uncheckedChars ) {
			if ( checkedChars.includes(key) == false ) {
				if ( getChar(key).position.type != "free" ) {
					if ( this.positionsDescription != "" ) { this.positionsDescription += "\n"; } 
					this.positionsDescription += colorText(("[" + getChar(key).position.name + "] "),"darkgray");
					this.positionsDescription += getChar(key).position.description;
					checkedChars = checkedChars.concat(getCharsAtCharsPosition(key));
				}
			}
			/*
			if ( checkedChars.includes(key) == false ) {
				if ( getChar(key).position.type != "free" ) {
					if ( this.positionsDescription != "" ) { this.positionsDescription += "\n"; } 
					this.positionsDescription += colorText(("[" + getChar(key).position.name + "] "),"darkgray");
					this.positionsDescription += getChar(key).position.description;
					checkedChars.push(key);
					
					if ( gC(key).position.hasOwnProperty("initiator") ) {
						var initiator = gC(key).position.initiator
						checkedChars.push(initiator);
						if ( gC(key).position.hasOwnProperty("secondaryInitiators") ) {
							checkedChars = checkedChars.concat(gC(key).position.secondaryInitiators);
						}
						if ( gC(initiator).position.hasOwnProperty("targetsList") ) {
							for ( var t of gC(initiator).position.targetsList ) {
								checkedChars.push(t);
							}
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
			*/
		}
		
		if ( this.positionsDescription != "" ) {
			this.positionsDescription += "\n";
			var cancelPosScript = this.returnCancelPlayerPositionScript();
			this.positionsDescription += this.returnCancelPlayerPositionScript();
			this.positionsDescription += "\n";
		}
	}

window.getCharsAtCharsPosition = function(charKey) {
	// Finds all characters positionally connected to charKey and returns them as a list
	var charList = [charKey];
	var searchedChars = [];
	while ( charList.length != searchedChars.length ) {
		var newChars = [];
		for ( var cK of charList ) {
			if ( searchedChars.includes(cK) == false ) {
				newChars = newChars.concat(getImmediatelyConnectedCharsToChar(cK));
				searchedChars.push(cK);
			}
		}
		charList = removeDuplicatesFromList(charList.concat(newChars));
	}
	return charList;
}
window.getImmediatelyConnectedCharsToChar = function(charKey) {
	var charList = [];
	var position = gC(charKey).position;
	if ( position.initiator != undefined ) {
		charList.push(position.initiator);
	}
	if ( position.targetsList != undefined ) {
		charList = charList.concat(position.targetsList);
	}
	if ( position.secondaryInitiators != undefined ) {
		charList = charList.concat(position.secondaryInitiators);
	}
	charList = removeDuplicatesFromList(charList);
	return charList;
}

	scene.prototype.logAccumulatedDamage = function() {
		var charKeys = this.teamAcharKeys.concat(this.teamBcharKeys );
		for ( var character of charKeys ) {
			// this.sceneLog += " " + getChar(character).textAccumulatedDamages();
		}
	}

window.formatSceneAnimationsHtmlSegment = function() {
	var fText = "";
	var animationSprites = selectAnimationSprites();
	if ( animationSprites.length > 0 ) {
		if ( getAnimationsSettings() == "enable" ) { // Enabled animations
			fText += fText += '<div align="center"><<l' + 'ink [[[ X ]|Scene]]>>\n<<sc' + 'ript>>\n'
					+ 'State.variables.settings.animations = "hidden";\n'
					+ 'State.variables.sc.formatScenePassage();\n'
					+ '<</s' + 'cript>><</l' + 'ink>></div>\n'
					+ formatAnimationsForHtml(animationSprites) + "\n";
		} else { // Hidden animations
			fText += '<div align="center"><<l' + 'ink [[[ + ]|Scene]]>>\n<<sc' + 'ript>>\n'
					+ 'State.variables.settings.animations = "enable";\n'
					+ 'State.variables.sc.formatScenePassage();\n'
					+ '<</s' + 'cript>><</l' + 'ink>></div>\n';
		}
	}
	return fText;
}

	// UI
	scene.prototype.formatScenePassage = function() {
		if ( this.hasOwnProperty("bgAutosolve") ) {
			// Scene shouldn't be formatted, as the player character does neither participate nor spectate
		} else {
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
			if ( getAnimationsSettings() != "disable" ) {
				pas += formatSceneAnimationsHtmlSegment(); // Format animations for HTML
			}
			pas += "<div>"; // Heading Description
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
			if ( this.importantMessages != "" ) { pas += "<div class='standardBox'>" + this.importantMessages + " </div> \n"; }
			if ( this.genericDialogs != "" ) { pas += "<div class='standardBox'>" + this.genericDialogs + " </div> \n"; }
			
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
			
			if ( this.extraEffectsDescription != "" ) {
				pas += "<div class='standardBox'>" + this.extraEffectsDescription + "</div>\n";
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
						 } else if ( this.checkEndConditions == endConditionGrapes ) {
							 pas += "\n\nRemaining grapes: " + State.variables.sc.remainingGrapes;
						 }
				} else {						// Player isn't in scene
					pas += this.getPassTurnButton();
				}
			} else {
				if ( this.endSceneMessage != "" ) { pas += this.endSceneMessage + "\n\n"; }
				pas += this.endScenePassageScript;
			}
			
			// Transformation scene description
			if ( this.hasOwnProperty("tfFlag") ) {
				pas += "\n<div class='standardBox'>" + this.tfProgressDescription() + "</div>\n";
			}
			
			pas += "</div></div>";
			this.scenePassage = pas;
		}
	}
	
	scene.prototype.getActionDescriptionButton = function() {
		var tButton = "<<cli" + 'ck "Action description">>\n'
				   + '<<scr' + 'ipt>>' + 'var dialog = Dialog.setup("Action Description", "my-dialog-class");\n'
				   + 'new Wikifier(dialog, Story.get("Scene Tests Dialog Box").processText());\n'
				   + 'Dialog.open();\n'
				   + '<</scr' + 'ipt>> \\'
				   + '<</c' + 'lick>>';
		return tButton;
	}
	scene.prototype.getCommitActionButton = function() {
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
	scene.prototype.getPassTurnButton = function() {
		var tButton = '<<l' + 'ink [[Next turn|Scene]]>>\n<<sc' + 'ript>>\n'
					+ 'State.variables.sc.executeTurn();\n'
					+ '<</s' + 'cript>><</l' + 'ink>><sup>[q]</sup>';
			// Button to autocomplete battle
		   tButton += '\n<<l' + 'ink [[Auto-resolve scene|Scene]]>>\n<<sc' + 'ript>>\n'
					+ 'State.variables.sc.autoResolveSceneAlt();\n'
					+ '<</s' + 'cript>><</l' + 'ink>><sup>[w]</sup>';
		return tButton;
	}

	scene.prototype.formatFullAvatarDiv = function() {
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
	
	// AI Meta-Data
	scene.prototype.generateStrategicAiData = function() {
		var sAiD = [];
		var teamAp = 0;
		var teamBp = 0;
		sAiD.almostDefeated = []; // < 15% max lust
		sAiD.pinnable = []; // 0 control, no shared position
		sAiD.needsHelp = []; // < 35% max lust, not pinned down
		sAiD.losingControl = []; // < 60% max control, not pinned down
		// Power and altered states
		for ( var cK of this.teamAcharKeys ) {
			sAiD[cK] = [];
			var p = quantifyCharacterStrength(cK); // Char's power
			sAiD[cK].power = p;
			sAiD[cK].DeBuffs = 0; // Char's altered states
			for ( var as of gC(cK).alteredStates ) {
				if ( as.type == "buff" ) {
					sAiD[cK].DeBuffs += 1;
				} else if ( as.type == "minorBuff" ) {
					sAiD[cK].DeBuffs += 0.5;
				} else if ( as.type == "debuff" ) {
					sAiD[cK].DeBuffs -= 1;
				} else if ( as.type == "minorDebuff" ) {
					sAiD[cK].DeBuffs -= 0.5;
				}
			}
			if ( gC(cK).koed == false ) {
				teamAp += p; // Team's power
			}
		}
		for ( var cK of this.teamBcharKeys ) {
			sAiD[cK] = [];
			var p = quantifyCharacterStrength(cK); // Char's power
			sAiD[cK].power = p;
			sAiD[cK].DeBuffs = 0; // Char's altered states
			for ( var as of gC(cK).alteredStates ) {
				if ( as.type == "buff" ) {
					sAiD[cK].DeBuffs += 1;
				} else if ( as.type == "minorBuff" ) {
					sAiD[cK].DeBuffs += 0.5;
				} else if ( as.type == "debuff" ) {
					sAiD[cK].DeBuffs -= 1;
				} else if ( as.type == "minorDebuff" ) {
					sAiD[cK].DeBuffs -= 0.5;
				}
			}
			if ( gC(cK).koed == false ) {
				teamBp += p; // Team's power
			}
		}
		sAiD.teamAp = teamAp;
		sAiD.teamBp = teamBp;
		// Combat inertia
		for ( var cK of this.teamAcharKeys.concat(this.teamBcharKeys) ) { // About to be defeated
			if ( getBarPercentage(cK,"lust") <= 0.15 ) { // About to be defeated
				sAiD.almostDefeated.push(cK);
			}
			if ( gC(cK).control == 0 && gC(cK).position.type == "free" ) { // Out of control, not pinned down
				sAiD.pinnable.push(cK);
			}
			if ( getBarPercentage(cK,"lust") <= 0.35 && gC(cK).position.type != "passive" ) { // Depleting health, not pinned down
				sAiD.needsHelp.push(cK);
			}
			if ( gC(cK).control < gC(cK).maxControl * 0.6 && gC(cK).position.type != "passive" ) { // Losing control, not pinned down
				sAiD.losingControl.push(cK);
			}
		}
		for ( var cK of this.teamAcharKeys.concat(this.teamBcharKeys) ) { 
			
		}
		
		if ( State.variables.sc.logAi == true ) {
			State.variables.sc.sceneLog += "Strategic Scene Data:\n" + "Teams power: " + teamAp + " vs " + teamBp + "\n"
										 + "Almost defeated: " + sAiD.almostDefeated + "\nPinnable: " + sAiD.pinnable
										 + "\nNeeds help: " + sAiD.needsHelp + "\nLosing control: " + sAiD.losingControl;
		}
		
		return sAiD;
	}
window.getSsAiD = function() {
	return State.variables.sc.strategicAiData;
}
	
	// Meta-controls
	scene.prototype.markNextTurnLink = function() {
		if ( this.flagSceneActive ) {
			if ( State.variables.sc.teamAcharKeys.includes("chPlayerCharacter") || State.variables.sc.teamBcharKeys.includes("chPlayerCharacter") ) {
				State.variables.foundLinks = $("#passages a").toArray();
				var nextTurnLinkPosition = State.variables.foundLinks.length - 1;
				if ( State.variables.foundLinks[nextTurnLinkPosition].id != undefined ) {
					State.variables.foundLinks[nextTurnLinkPosition].id = "nextTurnLink";
				}
				State.variables.keysAssigned = [["q","nextTurnLink"],["Q","nextTurnLink"]];
			} else {
				var e = [];
				try {
					State.variables.foundLinks = $("#passages a").toArray();
					State.variables.keysAssigned = [];
					var nextTurnLinkPosition = State.variables.foundLinks.length - 2;
						State.variables.foundLinks[nextTurnLinkPosition].id = "nextTurnLink";
						State.variables.keysAssigned.push(["q","nextTurnLink"],["Q","nextTurnLink"]);
					var autoFinishLinkPosition = State.variables.foundLinks.length - 1;
						State.variables.foundLinks[autoFinishLinkPosition].id = "autoFinishLink";
						State.variables.keysAssigned.push(["w","autoFinishLink"],["W","autoFinishLink"]);
				} catch(e) {
				}
			}
		}
		else {
			State.variables.keysAssigned = [];
		}
	}

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
	} else if ( State.variables.sc.sceneType == "bs" ) { // Are all characters of one team defeated, anyway?
		var defeatedTeamA = true;
		var defeatedTeamB = true;
		for ( var ch of State.variables.sc.teamAcharKeys ) {
			if ( gC(ch).koed == false ) {
				defeatedTeamA = false;
			}
		}
		for ( var ch of State.variables.sc.teamBcharKeys ) {
			if ( gC(ch).koed == false ) {
				defeatedTeamB = false;
			}
		}
		if ( defeatedTeamA || defeatedTeamB ) {
			flagEndScene = true;
		}
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
window.createEndConditionStoryBattleWithDraw = function(passageVictoryTeamA,passageVictoryTeamB,passageDraw) {
	var customScript = function(turns) {
		var flagEndScene = endConditionStandardBattle(turns);
		if ( State.variables.sc.extraEndInfo == "teamAwin" ) { // Team A wins
			State.variables.sc.endScenePassage = passageVictoryTeamA;
		} else if ( State.variables.sc.extraEndInfo == "stalemate" ) { // Draw
			State.variables.sc.endScenePassage = passageDraw;
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

window.endConditionStandardMonsterBattle = function(turns) {
	// teamAwin -> Characters win ; teamBwin -> Monsters win
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
		// sceneResult = "stalemate"; // Averted
		sceneResult = "teamAwin";
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
	
	if ( sceneResult == "teamAwin" ) {
		for ( var cK of State.variables.sc.teamBcharKeys ) {
			if ( doesCharHaveState(cK,"BnCa") == true ) {
				sceneResult = "monsterCapture";
			}
		}
	}
	
	if ( State.variables.sc.hasOwnProperty("charactersHaveFledFlag") ) { // Flight
		flagEndScene = true;
		sceneResult = "flight";
	}
	
	if ( flagEndScene ) { State.variables.sc.extraEndInfo = sceneResult; }
	return flagEndScene;
}

window.createEndConditionsTwistedFestivalSpecialBattle = function(passageNormalEnd,passageSpecialEnd) {
	var customScript = function(turns) {
		// Check for normal victory, defeat or stalemate
		var flagEndScene = endConditionStandardBattle(turns);
		var specialEndScene = false;
		if ( flagEndScene == false ) {
			// Check for special victory (all fakes are defeated first)
			var specialVictory = true;
			for ( var cK of ["ch0","ch1","ch2","ch3","ch4"] ) {
				if ( gC(cK).koed == false ) {
					specialVictory = false;
				}
			}
			if ( specialVictory == true ) {
				State.variables.sc.endScenePassage = passageSpecialEnd;
				this.refreshEndScenePassageScript();
				specialEndScene = true;
			}
		} else if ( flagEndScene == true ) {
			State.variables.sc.endScenePassage = passageNormalEnd;
			this.refreshEndScenePassageScript();
		}
		return ( flagEndScene || specialEndScene ); // Returns true if either of the end conditions have been achieved,
													// in that case, the target passage will have been updated
	}
	return customScript;
}

window.endConditionEveryonesXOrgasms = function() {
	// All characters present in the scene must have reached as many orgasms as defined in endConditionsVars
	var flagEndScene = true;
	
	for ( var ch of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( ( gC(ch).orgasmSceneCounter + gC(ch).mindblowingOrgasmSC + gC(ch).ruinedOrgasmSceneCounter ) < State.variables.sc.endConditionsVars ) {
			flagEndScene = false;
		}
	}
	
	return flagEndScene;
}

//////// OTHER FUNCTIONS ////////

window.getSexDamageMult = function(actor,target,action) {
	// returns [] ; [0] is damage multiplier ; [1] is description
	var mult = 1;
	var luck = gCstat(actor,"luck");
	var isActor = false;
	if ( actor == target ) { isActor = true; }
	// Tastes
	mult += getSexPrefDamageMult(target,isActor,action);
	// Luck
	mult += -0.1 + luckedDiceThrow(luck) * 0.2;
	return [mult,getMultiplierDescription(mult)];
}

window.getSexPrefDamageMult = function(target,isActor,action) {
	var mult = 0;
	for ( var tag of setup.saList[action].flavorTags ) {
		if ( tag != "continuedAction" && tag != "position" ) {
			var cTag = tag;
			var effectMultiplier = 1;
			if ( cTag == "foreplay" || cTag == "talk" || cTag == "oral" || cTag == "fullsex" ) {
				effectMultiplier = 0.5;
			}
			// Select valid opposite tag if appropriate
			if ( tagVector(tag) && isActor == false ) {
				cTag = getOppositeTag(tag);
			}
			// Get extra altered state damage
			var asV = 0;
			for ( var as of gC(target).alteredStates ) {
				if ( as.hasOwnProperty("tag") ) {
					if ( as.tag == cTag ) {
						asV = as.intensity * effectMultiplier;
					}
				}
			}
			// Add rank, get final multiplier
			mult += gC(target).tastes[cTag].r * (0.03 * effectMultiplier) + asV;
		}
	}
	return mult;
}
window.tagVector = function(tag) {
	// Vectorized tag refers to those which meaning changes depending on whether the action is affecting the actor or the target.
	// "Foreplay" is a non-vectorized tag. "TargetPussy" is a vectorized tag: if the action affects a target, "usePussy" must be checked instead
	var flag = true;
	if ( tag == "foreplay" || tag == "oral" || tag == "fullsex" || tag == "talk" || tag == "bondage" || tag == "teasing" || tag == "hypnosis" || tag == "charm" || tag == "romantic" || tag == "denial" ) {
		flag = false;
	}
	return flag;
}
window.getOppositeTag = function(tag) {
	var rTag = tag;
	switch(tag) {
		case "useDick":
			rTag = "targetDick";
			break;
		case "usePussy":
			rTag = "targetPussy";
			break;
		case "useAnus":
			rTag = "targetAnus";
			break;
		case "useBreasts":
			rTag = "targetBreasts";
			break;
		case "useMouth":
			rTag = "targetMouth";
			break;
		case "useEyes":
			rTag = "targetEyes";
			break;
		case "useHands":
			rTag = "targetHands";
			break;
		case "useLegs":
			rTag = "targetLegs";
			break;
		case "useTail":
			rTag = "targetTail";
			break;
		case "targetDick":
			rTag = "useDick";
			break;
		case "targetPussy":
			rTag = "usePussy";
			break;
		case "targetAnus":
			rTag = "useAnus";
			break;
		case "targetBreasts":
			rTag = "useBreasts";
			break;
		case "targetMouth":
			rTag = "useMouth";
			break;
		case "targetEyes":
			rTag = "useEyes";
			break;
		case "targetHands":
			rTag = "useHands";
			break;
		case "targetLegs":
			rTag = "useLegs";
			break;
		case "targetTail":
			rTag = "useTail";
			break;
		case "top":
			rTag = "bottom";
			break;
		case "bottom":
			rTag = "top";
			break;
		case "domination":
			rTag = "submission";
			break;
		case "submission":
			rTag = "domination";
			break;
		case "usePain":
			rTag = "receivePain";
			break;
		case "receivePain":
			rTag = "usePain";
			break;
	}
	return rTag;
}

window.getSexDamageMultAlt = function(actor,target,tags) {
	// returns [] ; [0] is damage multiplier ; [1] is description
	var mult = 1;
	var luck = gCstat(actor,"luck");
	var isActor = false;
	if ( actor == target ) { isActor = true; }
	// Tastes
	mult += getSexPrefDamageMultAlt(target,isActor,tags);
	// Luck
	mult += -0.1 + luckedDiceThrow(luck) * 0.2;
	return [mult,getMultiplierDescription(mult)];
}
window.getSexPrefDamageMultAlt = function(target,isActor,tags) {
	var mult = 0;
	for ( var tag of tags ) {
		if ( tag != "continuedAction" && tag != "position" ) {
			var cTag = tag;
			var effectMultiplier = 1;
			if ( cTag == "foreplay" || cTag == "talk" || cTag == "oral" || cTag == "fullsex" ) {
				effectMultiplier = 0.5;
			}
			// Select valid opposite tag if appropriate
			if ( tagVector(tag) && isActor == false ) {
				cTag = getOppositeTag(tag);
			}
			// Get extra altered state damage
			var asV = 0;
			for ( var as of gC(target).alteredStates ) {
				if ( as.hasOwnProperty("tag") ) {
					if ( as.tag == cTag ) {
						asV = as.intensity * effectMultiplier;
					}
				}
			}
			// Add rank, get final multiplier
			mult += gC(target).tastes[cTag].r * (0.03 * effectMultiplier) + asV;
		}
	}
	return mult;
}

window.getMultiplierDescription = function(mult) {
	var desc = "";
	if ( mult >= 1.2 ) {
		if ( mult >= 1.35 ) {
			desc = colorText(randomFromList(["Burning hot! ","Irresistible! ","Heating up! "]),"orangered");
		} else {
			desc = colorText(randomFromList(["Ravishing! ", "Exciting! ","Provoking! "]),"darkorange");
		}
	}
	return desc;
}

window.addExtraEffectDescription = function(desc) {
	if ( State.variables.sc.extraEffectsDescription != "" ) { State.variables.sc.extraEffectsDescription += "\n"; }
	State.variables.sc.extraEffectsDescription += desc;
}
window.executeAlteredStatesTurnEffects = function() {
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		for ( var as of gC(charKey).alteredStates ) {
			var effect = getAsTurnEffect(as);
			if ( effect ) {
				addExtraEffectDescription(effect(charKey));
			}
		}
	}
}

window.cleanTurnTags = function() {
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( gC(charKey).hasOwnProperty("turnTags") ) {
			delete gC(charKey).turnTags;
		}
	}
}

window.isCharInPrimaryContinuedAction = function(cK) {
	var flag = false;
	for ( var ca of State.variables.sc.continuedActions ) {
		if ( flag == false ) {
			if ( ca.rank > 1 ) {
				if ( ca.initiator == cK || ca.targetsList.includes(cK) ) {
					flag = true;
				}
			}
		}
	}
	return flag;
}

window.getActionsAgainstTarget = function(target) {
	var actions = [];
	var i = 0;
	while ( i < State.variables.sc.teamAchosenTargets.length ) {
		if ( State.variables.sc.teamAchosenTargets[i] == target ) {
			if ( State.variables.sc.teamAcharKeys[i] != target ) {
				actions.push(State.variables.sc.teamAchosenActions[i]);
			}
		}
		i++;
	}
	i = 0;
	while ( i < State.variables.sc.teamBchosenTargets.length ) {
		if ( State.variables.sc.teamBchosenTargets[i] == target ) {
			if ( State.variables.sc.teamBcharKeys[i] != target ) {
				actions.push(State.variables.sc.teamBchosenActions[i]);
			}
		}
		i++;
	}
	return actions;
}
window.getActionsAgainstTargetIncludingSelf = function(target) {
	var actions = [];
	var i = 0;
	while ( i < State.variables.sc.teamAchosenTargets.length ) {
		if ( State.variables.sc.teamAchosenTargets[i] == target ) {
			actions.push(State.variables.sc.teamAchosenActions[i]);
		}
		i++;
	}
	i = 0;
	while ( i < State.variables.sc.teamBchosenTargets.length ) {
		if ( State.variables.sc.teamBchosenTargets[i] == target ) {
			actions.push(State.variables.sc.teamBchosenActions[i]);
		}
		i++;
	}
	return actions;
}
window.doesActorsContinuedActionsInvolveBodypart = function(actor,part) {
	var flag = false;
	for ( var ca of State.variables.sc.continuedActions ) {
		if ( ca.initiator == actor ) {
			if ( ca.initiatorBodyparts.includes(part) ) {
				flag = true;
			}
		}
		if ( ca.targetsList.includes(actor) ) {
			if ( ca.targetsBodyparts.includes(part) ) {
				flag = true;
			}
		}
	}
	return flag;
}
window.doesActorsContinuedActionsInvolveBodypartCombination = function(actor,part,partnerPart) {
	var flag = false;
	for ( var ca of State.variables.sc.continuedActions ) {
		if ( ca.initiator == actor ) {
			if ( ca.initiatorBodyparts.includes(part) ) {
				if ( ca.targetsBodyparts.includes(partnerPart) ) {
					flag = true;
				}
			}
		}
		if ( ca.targetsList.includes(actor) ) {
			if ( ca.targetsBodyparts.includes(part) ) {
				if ( ca.initiatorBodyparts.includes(partnerPart) ) {
					flag = true;
				}
			}
		}
	}
	return flag;
}

window.anyOtherActorHasFreeBodypart = function(noActor,bodypart) {
	var hasBodypart = false;
	var scCharList = arrayMinusA(State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys),noActor);
	for ( var charKey of scCharList ) {
		if ( gC(charKey).body.hasOwnProperty(bodypart) ) {
			if ( gC(charKey).body[bodypart].state != "locked" ) {
				hasBodypart = true;
			}
		}
	}
	return hasBodypart;
}

window.cleanSceneTags = function() {
	var charList = State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys);
	for ( var charKey of charList ) {
		if ( gC(charKey).hasOwnProperty("sceneTags") ) {
			delete gC(charKey).sceneTags;
		}
	}
}

window.endSceneScriptRefreshLustIfOrgasmed = function() {
	var allChars = State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys);
	for ( var cK of allChars ) {
		if ( gC(cK).orgasmSceneCounter > 0 || gC(cK).mindblowingOrgasmSC > 0 || State.variables.sc.sceneType == "bs" ) {
			gC(cK).lust.restore();
		}
	}
}
window.setRefreshLustScript = function() {
	State.variables.sc.endSceneScript = endSceneScriptRefreshLustIfOrgasmed;
}
window.endSceneScriptRefreshSomeLustIfOrgasmed = function() {
	var allChars = State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys);
	for ( var cK of allChars ) {
		if ( gC(cK).lust.max * 0.5 > gC(cK).lust.current ) {
			gC(cK).lust.current += gC(cK).lust.max * 0.25; 
		}
	}
}
window.setRefreshSomeLustBattleScript = function() {
	State.variables.sc.endSceneScript = endSceneScriptRefreshSomeLustIfOrgasmed;
}
window.endSceneScriptUnconditionalCleanLust = function() {
	var allChars = State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys);
	for ( var cK of allChars ) {
		gC(cK).lust.current = gC(cK).lust.max; 
	}
}
window.endSceneScriptCharactersBecomeTired = function() {
	var allChars = State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys);
	applyAlteredState(allChars,createASmissingSleep(1));
}
window.endSceneScriptCharactersBecomeHealedAndTired = function() {
	var allChars = State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys);
	applyAlteredState(allChars,createASmissingSleep(1));
	for ( var cK of allChars ) {
		gC(cK).restoreBars();
	}
}

	// Data
window.getCharsEnemyTeam = function(cK) { // Checks if the "cK" character is in any team. If so, returns the opposite team
	var team = [];
	if ( State.variables.sc.teamAcharKeys.includes(cK) ) {
		team = State.variables.sc.teamBcharKeys;
	}
	if ( State.variables.sc.teamBcharKeys.includes(cK) ) {
		team = State.variables.sc.teamAcharKeys;
	}
	return team;
}

// Custom action allowed functions
window.disallowBeastkinLewdActionsOnFirstAdventure = function(actionKey,actorKey,targetsKeys) {
		var actionAllowed = true;
		var forbiddenActors = ["chRock","chHope"];
		var action = setup.saList[actionKey];
		if ( forbiddenActors.includes(actorKey) && ( action.affinities.includes("pounce") || action.affinities.includes("sex") ) ) {
			actionAllowed = false;
		}
		return actionAllowed;
	}


