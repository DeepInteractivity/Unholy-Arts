////////// AI ALGORYTHMS RESULTS CLASS //////////
/* These objects return the action Key and the target varNames referring to the action the acting character is going to use. */

window.aiResults = function() {
	this.actionKey = "doNothing";
	this.targetsIDs = [];
};

// Constructors, serializers, etc.
aiResults.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

aiResults.prototype.clone = function () {
	return (new aiResults())._init(this);
};

////////// AI ALGORYTHMS CLASS //////////
/* AI Algorythms are objects assigned to a character at the beginning of a scene.
   They hold all the required functions and information to determine the behavior of a given character during the scene. */

window.aiAlgorythm = function() {
	this.key;
	this.callAction = null;
	
	this.role = "none";
	// this.rolePreferences = weightedList
		// rolePreferences refers to a weighted list linked to the role assigned to the character for the scene
		// role and rolePreferences must be set using a custom function.
		// If role isn't set to "none", algorythms that use weighted lists will take rolePreferences into account
	// this.updateRolePreferences = function() // Must be set along with role
		
	this.setRoleEqualFooting = function() {
		this.role = "equalFooting";
		this.rolePreferences = createPreferencesWeightedList();
		this.rolePreferences.position.w = 300;
		this.rolePreferences.foreplay.w = 300;
		this.rolePreferences.continuedAction.w = 200;
		
		this.updateRolePreferences = function(lastActionKey) {
			this.rolePreferences.position.w += 20;
			if ( setup.saList[lastActionKey].flavorTags.includes("position") ) {
				// State.variables.sc.sceneLog += " Decided to use action last turn. Decreasing chance of using positions again. ; ";
				this.rolePreferences.position.w = 0;
			}
			else if ( setup.saList[lastActionKey].flavorTags.includes("continuedAction") ) {
				this.rolePreferences.continuedAction.w = 100;
			}
			if ( this.rolePreferences.foreplay.w > 100 ) {
				this.rolePreferences.foreplay.w -= 40;
			}
			if ( this.rolePreferences.continuedAction.w < 200 ) {
				this.rolePreferences.continuedAction.w += 20;
			}
		}
	}
	this.setRolePassive = function() {
		this.role = "passive";
		this.rolePreferences = createPreferencesWeightedList();
		this.rolePreferences.position.w = 50;
		this.rolePreferences.foreplay.w = 310;
		this.rolePreferences.oral.w = 125;
		this.rolePreferences.useDick.w = 50;
		this.rolePreferences.bottom.w = 200;
		this.rolePreferences.submission.w = 120;
		this.rolePreferences.domination.w = 20;
		this.rolePreferences.top.w = 80;
		this.rolePreferences.charm.w = 120;
		this.rolePreferences.denial.w = 10;
		this.rolePreferences.continuedAction.w = 200;
		
		this.updateRolePreferences = function(lastActionKey) {
			if ( this.rolePreferences.foreplay.w > 110 ) {
				this.rolePreferences.foreplay.w -= 40;
			}
			if ( setup.saList[lastActionKey].flavorTags.includes("continuedAction") ) {
				this.rolePreferences.continuedAction.w = 100;
			}
			if ( this.rolePreferences.continuedAction.w < 200 ) {
				this.rolePreferences.continuedAction.w += 20;
			}
		}
	}
	this.setRoleActive = function() {
		this.role = "active";
		this.rolePreferences = createPreferencesWeightedList();
		this.rolePreferences.position.w = 200;
		this.rolePreferences.fullsex.w = 115;
		this.rolePreferences.talk.w = 105;
		this.rolePreferences.oral.w = 95;
		this.rolePreferences.useDick.w = 125;
		this.rolePreferences.bottom.w = 80;
		this.rolePreferences.submission.w = 20;
		this.rolePreferences.domination.w = 110;
		this.rolePreferences.top.w = 150;
		this.rolePreferences.foreplay.w = 90;
		this.rolePreferences.continuedAction.w = 200;
		this.rolePreferences.denial.w = 110;
		
		this.updateRolePreferences = function(lastActionKey) {
			this.rolePreferences.position.w += 30;	// Position
			if ( setup.saList[lastActionKey].flavorTags.includes("position") ) {
				this.rolePreferences.position.w = 20;
			}
			if ( this.rolePreferences.foreplay.w > 100 ) {	// Foreplay
				this.rolePreferences.foreplay.w -= 20;
			}
			if ( setup.saList[lastActionKey].flavorTags.includes("continuedAction") ) { // Continued Actions
				this.rolePreferences.continuedAction.w = 100;
			}
			if ( this.rolePreferences.continuedAction.w < 200 ) {
				this.rolePreferences.continuedAction.w += 20;
			}
		}
	}
	this.setRoleRomantic = function() {
		this.role = "romantic";
		this.rolePreferences = createPreferencesWeightedList();
		this.rolePreferences.position.w = 200;	
		this.rolePreferences.talk.w = 110;
		this.rolePreferences.useEyes.w = 115;
		this.rolePreferences.targetEyes.w = 115;
		this.rolePreferences.domination.w = 75;
		this.rolePreferences.submission.w = 75;
		this.rolePreferences.useAnus.w = 25;
		this.rolePreferences.targetAnus.w = 25;
		this.rolePreferences.foreplay.w = 320;
		this.rolePreferences.continuedAction.w = 200;
		this.rolePreferences.denial.w = 80;
		
		this.updateRolePreferences = function(lastActionKey) {
			this.rolePreferences.position.w += 20;
			if ( setup.saList[lastActionKey].flavorTags.includes("position") ) {
				this.rolePreferences.position.w = 20;
			}
			if ( this.rolePreferences.foreplay.w > 120 ) {
				this.rolePreferences.foreplay.w -= 40;
			}
			if ( setup.saList[lastActionKey].flavorTags.includes("continuedAction") ) { // Continued Actions
				this.rolePreferences.continuedAction.w = 100;
			}
			if ( this.rolePreferences.continuedAction.w < 200 ) {
				this.rolePreferences.continuedAction.w += 20;
			}
		}
	}
	this.setRoleCompetition = function() {
		this.role = "competition";
		this.rolePreferences = createPreferencesWeightedList();
		this.rolePreferences.position.w = 250;
		this.rolePreferences.foreplay.w = 200;
		this.rolePreferences.talk.w = 80;
		this.rolePreferences.oral.w = 80;
		this.rolePreferences.useDick.w = 110;
		this.rolePreferences.hypnosis.w = 140;
		this.rolePreferences.domination.w = 200;
		this.rolePreferences.top.w = 120;
		this.rolePreferences.bottom.w = 20;
		this.rolePreferences.submission = 10;
		this.rolePreferences.continuedAction.w = 250;
		this.rolePreferences.denial.w = 150;
		
		this.updateRolePreferences = function(lastActionKey) {
			this.rolePreferences.position.w += 40;
			if ( setup.saList[lastActionKey].flavorTags.includes("position") ) {
				this.rolePreferences.position.w = 60;
			}
			if ( this.rolePreferences.foreplay.w > 80 ) {
				this.rolePreferences.foreplay.w -= 40;
			}
			if ( setup.saList[lastActionKey].flavorTags.includes("continuedAction") ) { // Continued Actions
				this.rolePreferences.continuedAction.w = 150;
			}
			if ( this.rolePreferences.continuedAction.w < 250 ) {
				this.rolePreferences.continuedAction.w += 20;
			}
		}
	}
	this.setRoleSubmission = function() {
		this.role = "submission";
		this.rolePreferences = createPreferencesWeightedList();
		this.rolePreferences.position.w = 20;
		this.rolePreferences.foreplay.w = 310;
		this.rolePreferences.oral.w = 110;
		this.rolePreferences.talk.w = 90;
		this.rolePreferences.targetDick.w = 110;
		this.rolePreferences.targetPussy.w = 110;
		this.rolePreferences.usePussy.w = 110;
		this.rolePreferences.useAnus.w = 110;
		this.rolePreferences.useDick.w = 110;
		this.rolePreferences.useMouth.w = 110;
		this.rolePreferences.bottom.w = 150;
		this.rolePreferences.submission.w = 200;
		this.rolePreferences.continuedAction.w = 200;
		this.rolePreferences.denial.w = 10;
		
		this.updateRolePreferences = function(lastActionKey) {
			if ( this.rolePreferences.foreplay.w > 110 ) {
				this.rolePreferences.foreplay.w -= 40;
			}
			if ( setup.saList[lastActionKey].flavorTags.includes("continuedAction") ) { // Continued Actions
				this.rolePreferences.continuedAction.w = 100;
			}
			if ( this.rolePreferences.continuedAction.w < 200 ) {
				this.rolePreferences.continuedAction.w += 20;
			}
		}
	}
	this.setRoleDomination = function() {
		this.role = "domination";
		this.rolePreferences = createPreferencesWeightedList();
		this.rolePreferences.position.w = 300;
		this.rolePreferences.foreplay.w = 220;
		this.rolePreferences.fullsex.w = 150;
		this.rolePreferences.oral.w = 80;
		this.rolePreferences.talk.w = 120;
		this.rolePreferences.useDick.w = 120;
		this.rolePreferences.usePussy.w = 110;
		this.rolePreferences.targetPussy.w = 110;
		this.rolePreferences.targetAnus.w = 110;
		this.rolePreferences.bottom.w = 0;
		this.rolePreferences.submission.w = 0;
		this.rolePreferences.top.w = 120;
		this.rolePreferences.domination.w = 200;
		this.rolePreferences.hypnosis.w = 120;
		this.rolePreferences.usePain.w = 150;
		this.rolePreferences.denial.w = 200;
		this.rolePreferences.continuedAction.w = 200;
		
		this.updateRolePreferences = function(lastActionKey) {
			this.rolePreferences.position.w += 30;
			if ( setup.saList[lastActionKey].flavorTags.includes("position") ) {
				this.rolePreferences.position.w = 20;
			}
			if ( this.rolePreferences.foreplay.w > 100 ) {
				this.rolePreferences.foreplay.w -= 40;
			}
			if ( setup.saList[lastActionKey].flavorTags.includes("continuedAction") ) { // Continued Actions
				this.rolePreferences.continuedAction.w = 100;
			}
			if ( this.rolePreferences.continuedAction.w < 200 ) {
				this.rolePreferences.continuedAction.w += 20;
			}
		}
	}
};

// Early AI algorythms - Sex Scenes
window.createAiFixedAction = function() {
		// This algorythm requires to be manually altered to set the fixed action and the fixed target.
		// It ignores the standard method's variables.
	var ai = new aiAlgorythm();
	ai.key = "fixedAction";
	ai.fixedAction = "doNothing";
	ai.fixedTarget = "chPlayerCharacter";
	ai.callAction = function(character,allyCharacters,enemyCharacters,currentTurn) {
		var results = new aiResults();
		results.actionKey = this.fixedAction;
		results.targetsIDs.push(this.fixedTarget);
		return results;
	}
	return ai;
}
window.createAiActionSequence = function() {
		// This algorythm requires a fixed target and a list of custom actions to be manually set.
		// It commands the user to sequentially use every listed action.
	var ai = new aiAlgorythm();
	ai.key = "actionSequence";
	ai.actionSequence = ["doNothing"];
	ai.fixedTarget = "chPlayerCharacter";
	ai.callAction = function(character,allyCharacters,enemyCharacters,currentTurn) {
		var results = new aiResults();
		results.actionKey = this.actionSequence[currentTurn-1];
		if ( results.actionKey == undefined ) {
			results.actionKey = "doNothing";
		}
		results.targetsIDs.push(this.fixedTarget);
		return results;
	}
	return ai;
}
window.createAiRandomAction = function() {
	var ai = new aiAlgorythm();
	ai.key = "randomAction";
	ai.fixedTarget = "chPlayerCharacter";
	ai.callAction = function(character,allyCharacters,enemyCharacters,currentTurn) {
		var results = new aiResults();
		
		var validActionsList = State.variables.sc.listUsableActions(character);
		validActionsList.shift();
		
		if ( validActionsList.length > 0 ) {
			results.actionKey = randomFromList(validActionsList);
		} else {
			results.actionKey = "doNothing";
		}
		
		results.targetsIDs.push(this.fixedTarget);
		return results;
	}
	return ai;
}

// Early AI algorythms - Battle Scenes
window.createAiRandomActionRandomOpponent = function() {
	var ai = new aiAlgorythm();
	ai.key = "randomAction";
	ai.callAction = function(character,allyCharacters,enemyCharacters,currentTurn) {
		var results = new aiResults();
		var validEnemies = [];
		for ( var enem of enemyCharacters ) {
			if ( gC(enem).koed == false ) {
				validEnemies.push(enem);
			}
		}
		
		if ( validEnemies.length > 0 ) {
			var target = randomFromList(validEnemies);
			
			var validActionsList = State.variables.sc.listUsableActionsOnTarget(character,target);
			validActionsList.shift();
			
			if ( validActionsList.length > 0 ) {
				results.actionKey = randomFromList(validActionsList);
			} else {
				results.actionKey = "doNothing";
			}
			
			results.targetsIDs.push(target);
		} else {
			results.actionKey = "doNothing";
			results.targetsIDs.push(character);
		}
		return results;
	}
	return ai;
}
window.createAiEarlyStrategic = function() { // November 2020
	var ai = new aiAlgorythm();
	ai.key = "earlyStrategy";
	ai. callAction = function(character,allyCharacters,enemyCharacters,currentTurn) {
		var results = new aiResults();
		var validEnemies = [];
		for ( var enem of enemyCharacters ) {
			if ( gC(enem).koed == false ) {
				validEnemies.push(enem);
			}
		}
		var target = character;
		var directEnemy = "";
		
		// Evaluate situation
			// "desperateAttack" -> Attack without restrain
			// "slowAttack" -> Try and buff oneself, then attack
			// "struggle" -> Get out of here
		// Is actor pinned down or pinning someone down? Are any of them close to defeat?
		// Is target's control depleted, or depleting? Is own control's depleted or depleting?
		// Is there health difference? Is there strength difference? Are buff actions possible?
		
		// On free
		// Is any enemy about to get Koed?
		// Is character about to get Koed?
		// Is there any down character? Should they get pinned down?
		// Are enemies running out of control?
		// Else - Self buff, debuff, attack control, attack
		var situation = "none";
		if ( gC(character).position.type == "free" ) { // Not in a position
			var weakenedEnemies = []; // Enemies with low lust
			var downedEnemies = []; // Enemies without control
			var downingEnemies = []; // Enemies with low control
			for ( var charKey of validEnemies ) {
				if ( getBarPercentage(charKey,"lust") != 0 && getBarPercentage(charKey,"lust") < 0.1 ) {
					weakenedEnemies.push(charKey);
				} else if ( gC(charKey).control == 0 && gC(charKey).position.type == "free" ) {
					downedEnemies.push(charKey);
				} else if ( gC(charKey).control <= gC(charKey).maxControl * 0.7 && gC(charKey).position.type == "free" ) {
					downingEnemies.push(charKey);
				}
			}
				
			if ( weakenedEnemies.length > 0 ) { // Any enemy about to get koed?
				situation = "desperateAttack";
				directEnemy = randomFromList(weakenedEnemies);
			} else if ( getBarPercentage(charKey,"lust") < 0.15 ) { // Character about to get koed?
				situation = "desperateAttack";
				directEnemy = randomFromList(validEnemies);
			} else if ( downedEnemies.length > 0 ) { // Pounce on anyone?
				var validDownedTargets = [];
				for ( var charKey of downedEnemies ) {
					if ( (quantifyCharacterStrength(character) / quantifyCharacterStrength(charKey)) >= 0.7 ) {
						validDownedTargets.push(charKey);
					}
				}
				if ( validDownedTargets.length > 0 && gC(character).control > gC(character).maxControl * 0.5 ) {
					situation = "pinTarget";
					directEnemy = randomFromList(validDownedTargets);
				}
			}
			if ( situation == "none" ) {
				if ( downingEnemies.length > 0 ) { // Attack someone's control?
					situation = "attackControl";
					directEnemy = randomFromList(downingEnemies);
				} else {							// Else
					situation = "balanced";
				}
			}
			
		} else if ( gC(character).position.type == "active" ) { // Pinning someone down
			directEnemy = gC(character).position.targetsList[0];
			if ( getBarPercentage(character,"lust") < 0.4 || getBarPercentage(directEnemy,"lust") < 0.4 ) {
				situation = "desperateAttack";
			} else {
				situation = "slowAttack";
			}
		} else { // Pinned down by someone
			// Strategies: Deal as much damage as possible / Struggle / Buff, then deal damage
			directEnemy = gC(character).position.initiator;
			if ( getBarPercentage(character,"lust") < 0.25 || getBarPercentage(directEnemy,"lust") < 0.25 ) {
				situation = "desperateAttack";
			} else if ( getBarPercentage(character,"lust") > 0.5 && ( quantifyCharacterStats(character) / quantifyCharacterStats(directEnemy) ) > 2 ) {
				situation = "slowAttack";
			} else {
				situation = "struggle";
			}
		}
		
		// Situation into choice
		switch ( situation ) {
			case "none":
				break;
			case "balanced":
				var validActionsList = [];
				var buffActions = [];
				var damageActions = [];
				directEnemy = randomFromList(validEnemies);
				if ( countCharactersBuffs(character) < 2 && limitedRandomInt(10) >= 5 ) {
					validActionsList = State.variables.sc.listUsableActionsOnTarget(character,character);
					buffActions = purgeActionsWithoutStrategyTag(validActionsList,"buff");
					if ( buffActions.length > 0 ) {
						results.actionKey = randomFromList(buffActions);
						results.targetsIDs = [ character ];
					}
				}
				if ( results.actionKey == "doNothing" ) {
					validActionsList = State.variables.sc.listUsableActionsOnTarget(character,directEnemy);
					damageActions = purgeActionsWithoutStrategyTag(validActionsList,"damageControl").concat(purgeActionsWithoutStrategyTag(validActionsList,"damageControl")).concat(purgeActionsWithoutStrategyTag(validActionsList,"debuff"));
					if ( damageActions.length > 0 ) {
						results.actionKey = randomFromList(damageActions);
					} else {
						results.actionKey = randomFromList(validActionsList);
					}
					results.targetsIDs = [ directEnemy ];
				}
				break;
			case "attackControl":
				// Pounce check
				directEnemy = randomFromList(downingEnemies);
				validActionsList = State.variables.sc.listUsableActionsOnTarget(character,directEnemy);
				damageActions = purgeActionsWithoutStrategyTag(validActionsList,"pounce");
				if ( damageActions.length > 0 ) {
					var randomPounce = randomFromList(damageActions);
					if ( setup.saList[randomPounce].doesHitLand.hit ) {
						results.actionKey = randomPounce;
						results.targetsIDs = [ directEnemy ];
					}
				}
				if ( results.actionKey == "doNothing" ) {
					damageActions = purgeActionsWithoutStrategyTag(validActionsList,"damageControl");
					if ( damageActions.length > 0 ) {
						results.actionKey = randomFromList(damageActions);
						results.targetsIDs = [ directEnemy ];
					}
				}
				if ( results.actionKey == "doNothing" ) {
					damageActions = purgeActionsWithoutStrategyTag(validActionsList,"damage").concat(purgeActionsWithoutStrategyTag(validActionsList,"debuff"));
					if ( damageActions.length > 0 ) {
						results.actionKey = randomFromList(damageActions);
						results.targetsIDs = [ directEnemy ];
					}
				}
				break;
			case "pinTarget":
				directEnemy = randomFromList(downedEnemies);
				validActionsList = State.variables.sc.listUsableActionsOnTarget(character,directEnemy);
				damageActions = purgeActionsWithoutStrategyTag(validActionsList,"pounce");
				if ( damageActions.length > 0 ) {
					results.actionKey = randomFromList(damageActions);
					results.targetsIDs = [ directEnemy ];
				}
				break;
			case "desperateAttack":
				var validActionsList = State.variables.sc.listUsableActionsOnTarget(character,directEnemy);
				var damageActions = purgeActionsWithoutStrategyTag(validActionsList,"damage");
				if ( damageActions.length > 0 ) {
					results.actionKey = randomFromList(damageActions);
				} else if ( validActionsList.length > 0 ) {
					results.actionKey = randomFromList(validActionsList);
				} else {
					results.actionKey = "struggle";
				}
				results.targetsIDs = [ directEnemy ];
				break;
			case "slowAttack":
				var validActionsList = [];
				if ( countCharactersBuffs(character) < 1 ) {
					validActionsList = State.variables.sc.listUsableActionsOnTarget(character,character);
					var buffActions = purgeActionsWithoutStrategyTag(validActionsList,"buff");
					if ( buffActions.length > 0 ) {
						results.actionKey = randomFromList(buffActions);
						results.targetsIDs = [ character ];
					}
					if ( results.actionKey == "doNothing" ) {
						validActionsList = State.variables.sc.listUsableActionsOnTarget(character,directEnemy);
						var damageActions = purgeActionsWithoutStrategyTag(validActionsList,"damage").concat(purgeActionsWithoutStrategyTag(validActionsList,"debuff"));
						results.actionKey = randomFromList(damageActions);
						results.targetsIDs = [ directEnemy ];
					}
				}
				break;
			case "struggle":
				results.actionKey = "struggle";
				results.targetsIDs = [ directEnemy ];
				break;
		}
		
		// TO DO : Remove all of this
		if ( results.actionKey == "doNothing" || results.actionKey == undefined ) {
			if ( validEnemies.length > 0 ) {
				var target = randomFromList(validEnemies);
				
				var validActionsList = State.variables.sc.listUsableActionsOnTarget(character,target);
				validActionsList.shift();
				
				if ( validActionsList.length > 0 ) {
					results.actionKey = randomFromList(validActionsList);
				} else {
					results.actionKey = "doNothing";
				}
				
				results.targetsIDs = [ target ];
			} else {
				results.actionKey = "doNothing";
				results.targetsIDs = [ character ];
			}
		}
		
		return results;
	}
	return ai;
}

// AI Algorythm useful in some scripted sex scenes
window.createAiRandomChoice = function(choicesList) {
	// Choices list must be a list of two elements list, first element contains target, second element contains action key
	// Example: "[ ["chVal","strokePussy"] , ["chVal","strokeBreasts"] , ["chMir","spanking"] ]"
	var ai = new aiAlgorythm();
	ai.key = "randomChoice";
	ai.choicesList = choicesList;
	ai.callAction = function(character,allyCharacters,enemyCharacters,currentTurn) {
		var results = new aiResults();
		
		var randomInt = limitedRandomInt(choicesList.length - 1); 
		results.actionKey = this.choicesList[randomInt][1];
		results.targetsIDs = [ this.choicesList[randomInt][0] ];
		
		return results;
	}
	return ai;
}

// OLD GENERIC AI ALGORYTHM - SEX SCENES
window.createAiWeightedActionByTaste = function() {
	var ai = new aiAlgorythm();
	ai.key = "weightedByTaste";
	ai.fixedTarget = "chPlayerCharacter";
	ai.callAction = function(character,allyCharacters,enemyCharacters,currentTurn) {
		var results = new aiResults();
		
		results.targetsIDs.push(this.fixedTarget);
		
		var validActionsList = State.variables.sc.listUsableActionsOnTarget(character,this.fixedTarget);
		validActionsList.shift();
		
		if ( validActionsList.length > 0 ) {
			var wList = listIntoWeightedList(validActionsList);
			
			for ( var item in wList ) {
				if (wList.hasOwnProperty(item) ) {
					wList[item].w = applyTasteWeightToAction(wList[item],character); // Taste weighted
				}
			}
			if ( this.role != "none" ) {
				wList = applyWeightListToActionList(wList,this.rolePreferences);
			}
			
			results.actionKey = randomFromWeightedList(wList);
			if ( results.actionKey == "errorWList" ) {
				results.actionKey = "doNothing";
			}
		} else {
			results.actionKey = "doNothing";
		}
			
		if ( this.role != "none" ) {
			this.updateRolePreferences(results.actionKey);
		}
				
		return results;
	}
	return ai;
}

// CURRENT GENERIC AI ALGORYTHM - SEX SCENES - 07-2020 - Last updated: 12-2020
window.createAiWeightedMissionsByTaste = function() {
	var ai = new aiAlgorythm();
	ai.key = "weightedMissions";
	ai.mission = "none";
	ai.missionCommands = [];
	ai.callAction = function(character,allyCharacters,enemyCharacters,currentTurn) {
		var results = new aiResults();
		results.targetsIDs = ([chooseTargetDynamically(character,allyCharacters,enemyCharacters)]);
		var dice = 0;
		
		if ( gC(character).hasLead == true ) {
			dice = limitedRandomInt(1);
			if ( dice == 1 ) {
				if ( this.missionCommands.length < 1 && ( limitedRandomInt(2) < 1 ) ) {
					this.mission = "none";					
				}
				if ( this.mission == "none" ) {
					var possibleMissions = randomFromList(returnValidSexSceneMissions(character,results.targetsIDs[0]));
					if ( possibleMissions != undefined ) {
						this.mission = possibleMissions;
						this.missionCommands = returnSexSceneMissionCommands(this.mission);
					} else {
						dice = 0;
					}
					if ( State.variables.sc.sceneConditions.includes("cantChangePositions") == false && State.variables.sc.sceneConditions.includes("cantCancelPositions") == false ) {
						State.variables.sc.cancelPosition(character);
					}
				}
				if ( this.missionCommands.length < 1 ) {
					dice = 0;
				} else {
					if ( isActionUsable(this.missionCommands[0],character,results.targetsIDs).isUsable ) {
						results.actionKey = this.missionCommands[0];
					} else {
						dice = 0;
					}
					this.missionCommands.shift();
				}
			}
		}
		if ( gC(character).hasLead == false || dice == 0 ) { // Typical behavior from weightedActionByTaste
			if ( limitedRandomInt(3) < 1 ) {
				results.targetsIDs[0] = character;
			}
		
			var validActionsList = State.variables.sc.listUsableActionsOnTarget(character,results.targetsIDs[0]);
			// Purge denial if target isn't close to orgasm
			if ( getBarPercentage(results.targetsIDs[0],"lust") > 0.1 || character == results.targetsIDs[0] ) {
				validActionsList = purgeActionsWithPreferenceTag(validActionsList,"denial");
			}
			validActionsList.shift();
		
			if ( validActionsList.length > 0 ) {
				var wList = listIntoWeightedList(validActionsList);
				
				for ( var item in wList ) {
					if (wList.hasOwnProperty(item) ) {
						wList[item].w = applyTasteWeightToAction(wList[item],character); // Taste weighted
						// Positional actions must not be chosen here, this portion removes their priority
						if ( setup.saList[wList[item].content].tags.includes("pos") ) {
							wList[item].w = 0;
						}
						// if ( setup.saList[wItem.content].flavorTags.includes(character.tastes[taste].content) ) {
					}
				}
				if ( this.role != "none" ) {
					wList = applyWeightListToActionList(wList,this.rolePreferences);
				}
				
				results.actionKey = randomFromWeightedList(wList);
				if ( results.actionKey == "errorWList" ) {
					results.actionKey = "doNothing";
				}
			} else {
				results.actionKey = "doNothing";
			}
		} else {
		}
		//var validActionsList = State.variables.sc.listUsableActionsOnTarget(character.varName
		
		return results;
	}
	return ai;
}

// BASIC BATTLE AI ALGORYTHM - SEX BATTLE SCENES - 08-2020
/*
window.createAiRandomActions = function() {
	var ai = new aiAlgorythm();
	ai.key = "randomActions";
	ai.callAction = function(character,allyCharacters,enemyCharacters,currentTurn) {
		var results = new aiResults();
		results.targetsIDs = [ enemyCharacters[0] ];
		
		
		
		return results;
	}
} */
// createAiRandomAction <-

// Auxiliar functions	
	// Choose target
window.chooseTargetDynamically = function(character,allyCharacters,enemyCharacters) { // Updated 12-2020
	// Cheap version, this function must be upgraded
	var mainTarget = [];
	
	/*
	if ( enemyCharacters.length < 1 ) {
		mainTarget = randomFromList(allyCharacters);
	}
	else {
		if ( limitedRandomInt(100) > 24 ) {
			mainTarget = randomFromList(enemyCharacters);
		} else {
			mainTarget = randomFromList(allyCharacters);
		}
	}*/
	
	var allOtherCharacters = arrayMinusA(allyCharacters.concat(enemyCharacters),character);
	if ( (limitedRandomInt(100) + gC(character).dLove.level * 5) > (24 + gC(character).dPleasure.level * 5) ) {
		mainTarget = randomFromList(allOtherCharacters);
	} else {
		mainTarget = character;
	}
	
	return mainTarget;
}

	// Missions
window.returnValidSexSceneMissions = function(character,target) {
	// Very cheap version, this function will be upgraded into a full system
	var validMissions = [];
	if ( gC(character).hasFreeBodypart("dick") && gC(target).hasFreeBodypart("pussy") ) {
		validMissions.push("penetratePussy");
	}
	if ( gC(character).hasFreeBodypart("pussy") && gC(target).hasFreeBodypart("pussy") ) {
		validMissions.push("scissor");
	}
	if ( gC(character).hasFreeBodypart("dick") && gC(target).hasFreeBodypart("pussy") && gC(target).hasFreeBodypart("anus") && gC(character).race == "shapeshifter" && gC(character).saList.includes("doublePenetration") && State.variables.settings.anal == "enable" ) {
		validMissions.push("doublePenetration");
	}
	if ( gC(character).hasFreeBodypart("dick") && gC(target).hasFreeBodypart("mouth") ) {
		validMissions.push("getBlowjob");
	}
	if ( gC(character).hasFreeBodypart("pussy") && gC(target).hasFreeBodypart("mouth") ) {
		validMissions.push("getCunnilingus");
	}
	return validMissions;
}
window.returnSexSceneMissionCommands = function(missionKey) {
	var commandsChain = [];
	switch(missionKey) {
		case "penetratePussy":
			commandsChain.push(randomFromList(["mountFromBehind","mountFaceToFace"]));
			commandsChain.push("penetratePussy");
			break;
		case "doublePenetration":
			commandsChain.push(randomFromList(["mountFromBehind","mountFaceToFace"]));
			commandsChain.push("doublePenetration");
			break;
		case "scissor":
			commandsChain.push("mountFaceToFace");
			commandsChain.push("interlockLegs");
			break;
		case "getBlowjob":
			commandsChain.push("makeKneel");
			commandsChain.push("getBlowjob");
			break;
		case "getCunnilingus":
			commandsChain.push("makeKneel");
			commandsChain.push("legHoldHead");
			break;
	}
	return commandsChain;
}

	// Weight
window.applyWeightListToActionList = function(actList,wgtList) {
	var actList2 = actList;
	
	for ( var action in actList2 ) {
		if ( actList2.hasOwnProperty(action) ) {
			for ( var weight in wgtList ) {
				if ( wgtList.hasOwnProperty(weight) ) {
					if ( setup.saList[actList2[action].content].flavorTags.includes(wgtList[weight].content) ) {
						actList2[action].w *= wgtList[weight].w / 100;
					}
				}
			}
			State.variables.sc.sceneLog += actList2[action].content + ".w: " + actList2[action].w + " ; ";
		}
	}
	
	return actList2;
}
window.applyTasteWeightToAction = function(wItem,character) { // wItem refers to the action key as a weighted element
	var newWeight = wItem.w;
	
	for ( var taste in character.tastes ) {
		if ( character.tastes.hasOwnProperty(taste) ) {
			if ( setup.saList[wItem.content].flavorTags.includes(character.tastes[taste].content) ) {
				newWeight *= (character.tastes[taste].w / 100);
			}
		}
	}
	
	return newWeight;
}
window.applyRoleWeightToAction = function(wList,rolePreferences) {
	/*
	var wList2 = wList;
	for ( var item in wList2 ) {
		if (wList2.hasOwnProperty(item) ) {
			wList2[item].w = applyTasteWeightToAction(wList2[item],character); // Taste weighted
		}
	}
	*/
}

	// Action lists
window.purgeActionsWithoutStrategyTag = function(list,tag) {
	var newList = [];
	for ( var action of list ) {
		if ( setup.saList[action].strategyTags.includes(tag) ) {
			newList.push(action);
		}
	}
	return newList;
}
window.purgeActionsWithPreferenceTag = function(list,tag) {
	var newList = [];
	for ( var action of list ) {
		if ( setup.saList[action].flavorTags.includes(tag) == false ) {
			newList.push(action);
		}
	}
	return newList;
}

	// Altered states
window.countCharactersBuffs = function(charKey) {
	var count = 0;
	for ( var as of gC(charKey).alteredStates ) {
		if ( as.type == "buff" ) { count++; }
	}
	return count;
}
window.countCharactersDebuffs = function(charKey) {
	var count = 0;
	for ( var as of gC(charKey).alteredStates ) {
		if ( as.type == "debuff" ) { count++; }
	}
	return count;
}

// Constructors, serializers, etc.
aiAlgorythm.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

aiAlgorythm.prototype.clone = function () {
	return (new aiAlgorythm())._init(this);
};

aiAlgorythm.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new aiAlgorythm())._init($ReviveData$)', ownData);
};



////////// AI ALGORYTHMS LIST CLASS //////////
// AI algorythms will be objects belonging to this object. This will ease the access to ai functions.
window.aiList = function() {
};

// Constructors, serializers, etc.
aiList.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

aiList.prototype.clone = function () {
	return (new aiList())._init(this);
};

aiList.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new aiList())._init($ReviveData$)', ownData);
};

