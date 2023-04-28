////////// SCENE ACTION RESULTS CLASS //////////

/* Scene actions now require both an effect value and a description to be returned.
This class will return all the required information from an action. */

window.saResults = function() {
	this.value = 0;
	this.description = "";
};

// Constructors, serializers, etc.
saResults.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

saResults.prototype.clone = function () {
	return (new saResults())._init(this);
};

////////// IS USABLE RESULTS CLASS //////////

/* Log that tells if the action is usable in the specified context, and carries a message explaining why not. */

window.isUsableResults = function() {
	this.isUsable = true;
	this.explanation = "";
};

window.isActionUsable = function(actionKey,actorKey,targetsKeys,skipLinkedCheck) {
	var iAU = new isUsableResults;
	
	var action = setup.saList[actionKey];
	var actor = getChar(actorKey);
	var targetsList = getCharList(targetsKeys);
	
	var isPositionValid = false;
	
	// Allowed by settings
	if ( action.getIsAllowedBySettings ) {
		if ( action.getIsAllowedBySettings() == false ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "This action is disallowed by user-selected settings.\n"; }
		}
	}
	if ( action.getIsCustomAllowed ) {
		if ( action.getIsCustomAllowed(actionKey,actorKey,targetsKeys,skipLinkedCheck) == false ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "This action is disallowed by a custom requirement.\n"; }
		}
	}
	
	// Is target ko'ed
	if ( targetsKeys.length > 0 ) {
		if ( gC(targetsKeys[0]).koed && actionKey != "doNothing" ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) {  iAU.explanation += "The target is KO.\n"; }
		}
	}
	
	// Is lewding allowed
	if ( State.variables.sc.sceneType == "bs" ) {
		if ( isLewdingPossible(actorKey,targetsKeys[0]) == false ) {
			if ( action.affinities.includes("sex") ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "Lewding involving male characters is disallowed by user-selected settings.\n"; }
			}
		}
	}
	
	// Basic tags
	for ( var reqTag in action.reqTags ) {
		var req = action.reqTags[reqTag];
		switch(req) {
			case "diffTarget":										// Check If actor may target self
				for ( var target in targetsKeys ) {
					if ( actorKey == targetsKeys[target] ) {
						iAU.isUsable = false;
						if ( State.variables.settings.debugFunctions ) {  iAU.explanation += "This action cannot target its own user.\n"; }
					}
				}
				break;
			case "hasLead":											// Must have the lead in the scene
				if ( gC(actorKey).hasLead == false ) {
					iAU.isUsable = false;
					if ( State.variables.settings.debugFunctions ) {  iAU.explanation += "This action requires the user to be leading.\n"; }
				}
				break;
			case "control":											// Must have control in battle
				if ( gC(actorKey).control <= 0 ) {
					iAU.isUsable = false;
					if ( State.variables.settings.debugFunctions ) { iAU.explanation += "This action requires the user to have control higher than 0.\n"; }
				}
				break;
			case "activePosition":									// Shares a position with the target where the actor is the initiator
				var flagActivePosition = false;
				if ( gC(actorKey).position.type == "active" ) {
					if ( gC(actorKey).position.targetsList.includes(targetsKeys[0]) ) {
						flagActivePosition = true;
					}
				}
				if ( flagActivePosition == false ) {
					iAU.isUsable = false;
					if ( State.variables.settings.debugFunctions ) { iAU.explanation += "This action requires the user to be the initiator in a position with the target.\n"; }
				}
				 break;
			case "unusedWeapon":									// Requires the actor to have a currently unused weapon
				if ( isCharsWeaponInUse(actorKey) ) {
					iAU.isUsable = false;
					if ( State.variables.settings.debugFunctions ) { iAU.explanation += "This action requires the user's weapon to be currently not in use.\n"; }
				}
				break;
			case "struggle":										// Specific checks for struggle action
				if ( State.variables.sc.sceneType != "bs" ) {
					iAU.isUsable = false;
					if ( State.variables.settings.debugFunctions ) { iAU.explanation += "This action is only usable in battle scenes.\n"; }
				}
				if ( gC(actorKey).position.type != "passive" ) {
					iAU.isUsable = false;
					if ( State.variables.settings.debugFunctions ) { iAU.explanation += "This action is only usable if the actor is being held down.\n"; }
				}
				break;
		}
	}
	
	// Bodyparts
	for ( var rbp in action.actorBpReqs ) {							// Check actor required bodyparts
		if ( actor.body.hasOwnProperty(action.actorBpReqs[rbp]) ) { // Check If has property {
			if ( actor.body[action.actorBpReqs[rbp]].state != "free" ) {
				
				iAU.isUsable = false;
				if ( State.variables.settings.debugFunctions ) { iAU.explanation += "The character doesn't have the required free " + action.actorBpReqs[rbp] + " to perform the action.\n"; }
			}
		}
		else {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "The character doesn't have the required " + action.actorBpReqs[rbp] + " to perform the action.\n"; }
		}
	}
	for ( var rbp in action.targetBpReqs ) {						// Check target required bodyparts
		for ( var target in targetsList ) {
			if ( targetsList[target].body.hasOwnProperty(action.targetBpReqs[rbp]) ) { // Check If has property {
				if ( targetsList[target].body[action.targetBpReqs[rbp]].state != "free" ) {
					
					iAU.isUsable = false;
					if ( State.variables.settings.debugFunctions ) { iAU.explanation += "A target doesn't have the required free " + action.targetBpReqs[rbp] + " to perform the action.\n"; }
				}
			}
			else {
				iAU.isUsable = false;
				if ( State.variables.settings.debugFunctions ) { iAU.explanation += "A target doesn't have the required " + action.targetBpReqs[rbp] + " to perform the action.\n"; }
			}
		}
	}
	for ( var rlbp of action.targetLockedBpReqs ) {
		for ( var target of targetsList ) {
			if ( target.body.hasOwnProperty(rlbp) ) {
				if ( target.body[rlbp].state != "locked" ) {
					iAU.isUsable = false;
					if ( State.variables.settings.debugFunctions ) { iAU.explanation += "A target doesn't have the required locked " + rlbp + " to perform the action.\n"; }
				}
			} else {
				iAU.isUsable = false;
				if ( State.variables.settings.debugFunctions ) { iAU.explanation += "A target doesn't have the required " + rlbp + " to perform the action.\n"; }
			}
		}
	}
	
	// Required Continued Actions
	if ( (action.requiredActiveCAs.concat(action.requiredPassiveCAs)).length > 0 ) {
		var flagHasRequiredCA = false;
		
		for ( var ca of State.variables.sc.continuedActions ) {
			if ( flagHasRequiredCA == false ) {
				if ( action.requiredActiveCAs.includes(ca.key) ) {
					if ( ca.initiator == actorKey && ca.targetsList.includes(targetsKeys[0])) {
						flagHasRequiredCA = true;
					}
				}
				if ( action.requiredPassiveCAs.includes(ca.key) && ca.initiator == targetsKeys[0]) {
					if ( ca.targetsList.includes(actorKey) ) {
						flagHasRequiredCA = true;
					}
				}
			}
		}
		if ( flagHasRequiredCA == false && gC(actorKey).position.type != "free" ) {
			if ( gC(actorKey).position.type == "active" && gC(actorKey).position.cAction ) {
				if ( action.requiredActiveCAs.includes(gC(actorKey).position.cAction.key) ) {
					if ( gC(actorKey).position.cAction.targetsList.includes(targetsKeys[0]) ) {
						flagHasRequiredCA = true;
					}
				}
			}
			else if ( gC(actorKey).position.type == "passive" ) {
				var p = gC(gC(actorKey).position.initiator).position;
				
				if ( p.cAction ) {
					if ( action.requiredPassiveCAs.includes(p.cAction.key) && p.cAction.initiator == targetsKeys[0] ) {
						flagHasRequiredCA = true;
					}
				}					
			}
			/*
			else if ( gC(actorKey).position.type == "passive" ) {
				if ( action.requiredPassiveCAs.includes(gC(actorKey).position.cAction.key) ) {
					if ( gC(actorKey).position.cAction.initiator == targetsKeys[0] ) {
						flagHasRequiredCA = true;
					}
				}
			}
			*/
		}
		
		if ( flagHasRequiredCA == false ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "This action lacks a required continued action.\n"; }
		}
	}
	if ( action.requiredCAs.length > 0 ) {
		var flagHasRequiredCA = false;
		
		for ( var ca of State.variables.sc.continuedActions ) {
			if ( flagHasRequiredCA == false ) {
				if ( action.requiredCAs.includes(ca.key) ) {
					if ( (ca.initiator == actorKey && ca.targetsList.includes(targetsKeys[0])) || (targetsKeys.includes(ca.initiator) && ca.targetsList.includes(actorKey)) ) {
						flagHasRequiredCA = true;
					}
				}
			}
		}
		
		if ( flagHasRequiredCA == false ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "This action lacks a required continued action.\n"; }
		}
	}
	
	// Positions
	if ( action.requiredPositions.length > 0 ) { // Check actor required positions
		if ( action.requiredPositions.includes(actor.position.key) == false ) { 	// Actor has valid position?
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "The actor doesn't have a valid position.\n"; }
		}
	}
	if ( action.targetRequiredPositions.length > 0 ) { // Check target required positions
		for ( var target of targetsList ) {
			if ( action.targetRequiredPositions.includes(target.position.key) == false ) {
				iAU.isUsable = false;
				if ( State.variables.settings.debugFunctions ) {  iAU.explanation += "A target doesn't have a valid position.\n"; }
			}
		}
	}
	if ( action.linkedPositions == true && skipLinkedCheck == false ) {
		for ( var target of targetsList ) {
			if ( areCharactersLinked(actorKey,target.varName) == false ) {
				iAU.isUsable = false;
				if ( State.variables.settings.debugFunctions ) { iAU.explanation += "The actor and a target don't share a position.\n"; }
			}
		}
	}
	
	if ( action.unvalidRelationalPositions.length > 0 ) { // Check unvalid relational positions
		for ( var positions of action.unvalidRelationalPositions ) {
			for ( var target of targetsList ) {
				if ( (positions[0] == actor.position.key) && (positions[1] == target.position.key) && (areCharactersLinked(actorKey,target.varName) == true) ) {
					iAU.isUsable = false;
					if ( State.variables.settings.debugFunctions ) { iAU.explanation += "The actor and a target share an invalid position.\n"; }
				}
			}
		}
	}
	
	// Position
	if ( ( action.tags.includes("pos") || action.actionType == "pounce" ) && skipLinkedCheck == false ) {
		if ( gC(actorKey).position.key != "free" || gC(targetsKeys[0]).position.key != "free" ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "The actor and a target should be free to initiate a positional action.\n"; }
		}
	}
	if ( action.tags.includes("cpos") ) {
		if ( action.getRequiredPositioning(actorKey,targetsKeys[0]) == false  ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "The target doesn't have a valid position.\n"; }
		}
		if ( gC(actorKey).position.key != "free" && gC(targetsKeys[0]).position.key != "free" ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "At least one character must be free.\n"; }			
		}
	}
	
	// Continued actions
	if ( action.requiredActorContinuedActions.length > 0 ) {
		var caFound = false;
		for ( var ca of State.variables.sc.continuedActions ) {
			if ( action.requiredActorContinuedActions.includes(ca.key) ) {
				if ( ca.initiator == actorKey || ca.targetsList.includes(actorKey) ) {
					caFound = true;
				}
			}
		}
		if ( caFound == false ) {
				iAU.isUsable = false;
				if ( State.variables.settings.debugFunctions ) { iAU.explanation += "The actor requires to be involved in a specific continued action.\n"; }
		}
	}
	
	// Lead
	if ( State.variables.sc.enabledLead != "none" ) {
		if ( action.tags.includes("cAct") || action.tags.includes("pos") || action.tags.includes("cpos") ) {
			if ( actor.hasLead == false ) {
				iAU.isUsable = false;
				if ( State.variables.settings.debugFunctions ) { iAU.explanation += "Positional and continued actions require the actor to have the lead in this scene.\n"; }
			}
		}
	}
	
	// Can't change positions settings
	if ( State.variables.sc.sceneConditions.includes("cantChangePositions") ) {
		if ( action.tags.includes("pos") ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "Changing positions isn't allowed during this scene.\n"; }
		}
	}
	
	// Race check
	if ( action.requiredRace.length > 0 ) {
		if ( action.requiredRace.includes(gC(actorKey).race) == false ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "Action requires a race different than the actor's.\n"; }
		}
	}
	
	// Altered state checks
	if ( action.actorDisabledByAs.length > 0 ) {
		for ( var as of gC(actorKey).alteredStates ) {
			for ( var acr of action.actorDisabledByAs ) {
				if ( acr == as.acr ) {
					iAU.isUsable = false;
					if ( State.variables.settings.debugFunctions ) { iAU.explanation += "Action disabled by altered state of the actor.\n"; }
				}
			}
		}
	}
	if ( action.targetDisabledByAs.length > 0 ) {
		for ( var as of gC(targetsKeys[0]).alteredStates ) {
			for ( var acr of action.targetDisabledByAs ) {
				if ( acr == as ) {
					iAU.isUsable = false;
					if ( State.variables.settings.debugFunctions ) { iAU.explanation += "Action disabled by altered state of the target.\n"; }
				}
			}
		}
	}
	
	// Bar costs checks
	if ( action.willpowerCost > 0 ) {
		if ( gC(actorKey).willpower.current < gC(actorKey).willpower.calculateCost(action.willpowerCost) ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "Actor doesn't have enough willpower to perform the action.\n"; }
		}
	}
	if ( action.energyCost > 0 ) {
		if ( gC(actorKey).energy.current < gC(actorKey).energy.calculateCost(action.energyCost) ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "Actor doesn't have enough energy to perform the action.\n"; }
		}
	}
	if ( action.socialdriveCost > 0 ) {
		if ( gC(actorKey).socialdrive.current < gC(actorKey).socialdrive.calculateCost(action.socialdriveCost) ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "Actor doesn't have enough socialdrive to perform the action.\n"; }
		}
	}
	
	// Battle Position checks
	if ( action.tags.includes("bPos") ) {
		if ( gC(actorKey).position.key != "free" ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "Actor requires not being in any position to perform the action.\n"; }
		} else {
			for ( var target of targetsKeys ) {
				if ( gC(target).position.key != "free" ) {
					iAU.isUsable = false;
					if ( State.variables.settings.debugFunctions ) { iAU.explanation += "Targets require not being in any position to perform the action.\n"; }
				}
			}
		}
	}
	
	// No position check
	if ( action.requiresFree ) {
		if ( gC(actorKey).position.type != "free" ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "Actor needs to be free of any position to perform the action.\n"; }
		}
	}
	
	// Multiple full sex continued actions
	if ( action.flavorTags.includes("fullsex") && action.flavorTags.includes("continuedAction") ) { // Action is fsca
		if ( gSettings().mfsca == undefined ) { // Ensure setting is properly defined, required for retro save compatibility
			gSettings().mfsca = setup.defaultMfscaOption;
		}
		if ( gSettings().mfsca == "disable" ) { // Is mfsca disallowed by settings
		
			var existingFsca = false;
			for ( var ca of State.variables.sc.continuedActions ) {
				if ( (ca.initiator == actorKey && ca.targetsList.includes(targetsKeys[0])) || (ca.initiator == targetsKeys[0] && ca.targetsList.includes(actorKey)) ) {
					if ( ca.flavorTags.includes("fullsex") ) {
						existingFsca = true;
					}
				}
			}
			if ( existingFsca ) {
				iAU.isUsable = false;
				if ( State.variables.settings.debugFunctions ) { iAU.explanation += "Multiple full sex continued actions are disabled.\n"; }
			}
		}
	}
	
	// Transformation actions
	if ( action.tags.includes("tf") ) {
		if ( State.variables.sc.hasOwnProperty("tfFlag") == false ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "Transformation action in non-transformation scene.\n"; }
		} else if ( targetsKeys[0] != State.variables.sc.tfTarget ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "Transformation action for anyone other than transformation target.\n"; }
		} else {
			var requiresTfPoints = false;
			for ( var tfGoal of action.tfGoals ) {
				if ( getRequiredPointsForTfGoal(tfGoal) > 0 ) {
					requiresTfPoints = true;
				}
			}
			if ( requiresTfPoints == false ) {
				iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "Transformation goals aren't required anymore.\n"; }
			}
		}
	}
	
	// Custom Scene Checks
	if ( State.variables.sc.customActionAllowed ) { // Does a custom check exist?
		if ( State.variables.sc.customActionAllowed(actionKey,actorKey,targetsKeys) == false ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) {
				iAU.explanation += "Disallowed by custom scene check.\n";
			}
		}
	}
	
	return iAU;
};
window.isActionUsableOnPos = function(actionKey,actorKey,targetKeys,actorPos,targetsPos) {
	var iAU = new isUsableResults;
	// Remember positions
	var originalActorPos = gC(actorKey).position.key;
	var originalTargetPos = [];
	for ( var cK of targetKeys ) {
		originalTargetPos.push(gC(cK).position.key);
	}
	// Stablish hypothetical positions
	gC(actorKey).position.key = actorPos;
	var i = 0;
	for ( var cK of targetKeys ) {
		gC(cK).position.key = targetsPos[i];
		i++;
	}
	// Check results
	iAU = isActionUsable(actionKey,actorKey,targetKeys,true);
	// Re-stablish old positions
	gC(actorKey).position.key = originalActorPos;
	i = 0;
	for ( var cK of targetKeys ) {
		gC(cK).position.key = originalTargetPos[i];
		i++;
	}
	// Return results
	return iAU;
}

window.areCharactersLinked = function(charA,charB) {
	var flagLinked = false;
	
	if ( gC(charA).position.type == "active" ) {
		if ( gC(charA).position.targetsList.includes(charB) ) {
			flagLinked = true;
		}
		else if ( gC(gC(charA).position.targetsList[0]).position.hasOwnProperty('secondaryInitiators') )
		{
			var pos = gC(gC(charA).position.targetsList[0]).position;
			if ( pos.initiator == charB || pos.secondaryInitiators.includes(charB) ) {
				flagLinked = true;
			}
		}
	}
	else if ( gC(charA).position.type == "passive" ) {
		if ( gC(charA).position.initiator == charB ) {
			flagLinked = true;
		}
		else if ( gC(charA).position.hasOwnProperty('secondaryInitiators') ) {
			if ( gC(charA).position.secondaryInitiators.includes(charB) ) {
				flagLinked = true;
			}
		}
	}
	
	return flagLinked;
};

window.tryExecuteAction = function(actionKey,actorKey,targetKeys) {
	var iAU = new isUsableResults;
	var results = new saResults;
	
	iAU = isActionUsable(actionKey,actorKey,targetKeys,false);
	if ( iAU.isUsable ) { // Action may be used, execute:
		results = setup.saList[actionKey].execute(actorKey,targetKeys);
	}
	else {
		results.description = "The action couldn't be executed.";
	}
	
	return results;
}

// Constructors, serializers, etc.
isUsableResults.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

isUsableResults.prototype.clone = function () {
	return (new isUsableResults())._init(this);
};

////////// SCENE ACTION CLASS //////////

/* How these work

State.variables has a list of sceneActions
Each character has a list of learnt sceneActions, identified by their name or ID
Each action has a list of tags which mark their range.

Upon executing an action, its ID is used to access the original action on State.variables.saList, which provides a description.
																		-> setup.saList
Actions are executed by calling their execute() method, which applies all of its effects.
	The execute() method requires the actor using the action and a list of targets as parameters,
	and returns a string describing the action's effects.
	
Tags
  Scene Type Tags - These tags link an action to a scene type.
					They will only be usable If they share the type with the scene.
	ss = Sex Scene Action
	sbs = Sex Battle Scene Action
	bs = Battle Scene Action
	
  Type Use Tags - The tags differentiate between single-use and continued-use actions.
    sUse - Single Use
	cUse - Continued Use
*/

window.sceneAction = function() {
	this.name = "";
	this.key = "";
	this.targetType = "";
	this.actionType = "none";
	
	this.tags = []; // "ss","bs" -> Sex Scene, Battle Scene ; "sUse" -> Single Use ; "cAct" -> Continued Action ; "bPos" -> Battle Position
	this.reqTags = []; // Specific tags that change the action's requirements
						  // diffTarget -> Requires a target other than the actor	
						  // control -> Requires the actor's control to be higher than 0
	this.actorBpReqs = []; // The actor requires these body parts for the action to be possible
	this.targetBpReqs = [];	// The targets require these body parts for the action to be possible
	this.targetLockedBpReqs = []; // The targets require these bodyparts to be locked for the action to be possible
	this.flavorTags = [];
	this.strategyTags = [];
	this.affinities = [];
	
	this.getIsAllowedBySettings = null;
	this.getIsCustomAllowed = null; // function(actionKey,actorKey,targetsKeys,skipLinkedCheck) { return true; }
	
	this.requiredPositions = []; // If the list contains anything, the actor requires one of these positions
	this.targetRequiredPositions = []; // If the list contains anything, the targets require one of these positions
	this.linkedPositions = false; // If true, the actor and its targets require to be referenced as initiator or target in their respective positions
	
	this.requiredActorContinuedActions = []; // If any, the actor requires to be involved in any of these continued actions
	
	this.requiresFree = false; // If true, action will only be usable if actor has no position
	// this.unvalidPositions = []; // Is the actor's current position is in this list, the action isn't usable // Not implemented
	
	this.unvalidRelationalPositions = []; // List of 2-sized arrays. First element is actor position, second element is target position,
									     // If they match, the action can't be executed
	
	this.requiredActiveCAs = []; // Required Active and Passive Continued Actions refer to a set of continued actions of which at least
	this.requiredPassiveCAs = []; // one is required for the action to be possible.
								// Active ones require the character to be the initiator, passive ones requires the character to be the target.
	this.requiredCAs = []; // Required Continued Action, regardless of role.
	
	this.requiredRace = []; // If length > 0, requires the character's race to be included
	this.actorDisabledByAs = []; // If the character has any of these states, the action cannot be used
	this.targetDisabledByAs = []; // If the target has any of these states, the action cannot be used
		
	this.priority = 0;
	
	this.willpowerCost = 0; // If any of these three higher than 0, requires the character to have enough of it
	this.energyCost = 0;
	this.socialdriveCost = 0;
	
	this.description = "";
	
	this.execute = null; // Function. Returns a description of the action's effects during that particular use.
	// this.resultsMessage = null; // Function. Returns a string to be displayed on Sugarcube 2 with proper format.
};

window.applySaCosts = function(sa,actor) {
	if ( sa.energyCost ) {
		gC(actor).energy.applyCost(sa.energyCost);
	}
	if ( sa.willpowerCost ) {
		gC(actor).willpower.applyCost(sa.willpowerCost);
	}
	if ( sa.socialdriveCost ) {
		gC(actor).socialdrive.applyCost(sa.socialdriveCost);
	}
}
window.generateSaCostsText = function(sa,actor) {
	var costTexts = [];
	if ( sa.energyCost ) {
		var energyCost = gC(actor).energy.calculateCost(sa.energyCost);
		costTexts.push(textEnergyPoints(energyCost));
	}
	if ( sa.willpowerCost ) {
		var willpowerCost = gC(actor).willpower.calculateCost(sa.willpowerCost);
		costTexts.push(textWillpowerPoints(willpowerCost));
	}
	if ( sa.socialdriveCost ) {
		var socialdriveCost = gC(actor).socialdrive.calculateCost(sa.socialdriveCost);
		costTexts.push(textSocialdrivePoints(socialdriveCost));
	}
	var text = ktn(actor) + " consumed " + stringArrayToText(costTexts);
	return text;
}

window.createSaDoNothing = function() {
	var sa = new sceneAction();
	sa.name = "Do nothing";
	sa.key = "doNothing";
	sa.targetType = "self";
	sa.tags.push("ss");
	sa.tags.push("sbs");
	sa.tags.push("bs");
	sa.tags.push("sUse");
	
	sa.description = "The character surrenders themself to the whims of others.\n\nSelf-targetted action.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		results.value = 0;
		results.description = randomFromList([ ( (ktn(actorKey)) + " did nothing." ),
									( (ktn(actorKey)) + " stayed quiet." ),
									( (ktn(actorKey)) + " waited for the others to act.")]);
		
		return results;
	}
	return sa;
}
window.createBaPunch = function() {
	var ba = new sceneAction();
	ba.name = "Punch";
	ba.key = "punch";
	ba.targetType = "single";
	ba.tags.push("bs");
	ba.tags.push("sUse");
	ba.reqTags.push("diffTarget");
	ba.actorBpReqs.push("arms");
	
	ba.description = "The character punches a target.\n\nSingle target action.";
	ba.execute = function(actorKey,targetActors) {
		var results = new saResults;
		
		var healthDamage = ((getChar[actorKey].physique.getValue() * 2) / 5);
		targetActors[0].lust.changeValue(-healthDamage); // Change to health damage
		results.value = healthDamage;
		results.description += getChar[actorKey].formattedName + " punched " + getChar(targetActors[0]).formattedName + " for "
						  + healthDamage + " health damage.\n";
		
		return results;
	}
	return ba;
}

// Constructors, serializers, etc.
sceneAction.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

sceneAction.prototype.clone = function () {
	return (new sceneAction())._init(this);
};

sceneAction.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new sceneAction())._init($ReviveData$)', ownData);
};

////////// SCENE ACTIONS LIST CLASS //////////
// Scene Actions will be objects belonging to this object. This will ease the access to actions.
window.saList = function() {
	this.doNothing = createSaDoNothing();
	this.strokePussy = createSaStrokePussy();
	this.strokeBreasts = createSaStrokeBreasts();
	this.strokeDick = createSaStrokeDick();
	this.strokeAss = createSaStrokeAss();
	
	this.dickFootjob = createSaDickFootjob();
	this.pussyFootjob = createSaPussyFootjob();
	
	this.kissLips = createSaKissLips();
	this.kissNeck = createSaKissNeck();
	this.frottage = createSaFrottage();
	
	this.lickLegs = createSaLickLegs();
	
	this.whisperSNs = createSaWhisperSweetNothings();
	
	this.thrust = createSaThrust();
	this.analThrust = createSaAnalThrust();
	this.doubleThrust = createSaDoubleThrust();
	this.piston = createSaPiston();
	this.pushHipsBack = createSaPushHipsBack();
	this.pushAssBack = createSaPushAssBack();
	this.finalPush = createSaFinalPush();
	this.rideDick = createSaRideDick();
	this.pushDickBack = createSaPushDickBack();
	this.analRideDick = createSaAnalRideDick();
	this.analPushDickBack = createSaAnalPushDickBack();
	
	this.scissor = createSaScissor();
	
	this.fuckFace = createSaFuckFace();
	this.suckDick = createSaSuckDick();
	this.lickPussy = createSaLickPussy();
	this.rideFace = createSaRideFace();
	
	this.lickGroin = createSaLickGroin();
	
		// Fetish
	
	this.hypnoticGlance = createSaHypnoticGlance();
	this.lustfulGlance = createSaLustfulGlance();
	
	this.realHypnoticGlance = createSaRealHypnoticGlance();
	
	this.spanking = createSaSpanking();
	
	this.biteNeck = createSaBiteNeck();
	
	this.etherealChains = createSaEtherealChains();
	
	this.denyOrgasm = createSaDenyOrgasm();
	this.teaseLockedPussy = createSaTeaseLockedPussy();
	this.teaseLockedDick = createSaTeaseLockedDick();
	
			// Transformation
			
	this.sculptingKiss = createSaSculptingKiss();
	this.sculptChest = createSaSculptChest();
	this.sculptBody = createSaSculptBody();
	
	this.formDick = createSaFormDick();
	this.formPussy = createSaFormPussy();
	this.buryDick = createSaBuryDick();
	this.foldPussy = createSaFoldPussy();
	
	
		// Cont. actions
	
	this.frenchKiss = createSaFrenchKiss();
	this.holdHands = createSaHoldHands();
	
	this.legHoldHead = createLegHoldHead();
	this.extraLegHoldHead = createExtraLegHoldHead();
	this.giveCunnilingus = createGiveCunnilingus();
	this.getBlowjob = createSaGetBlowjob();
	this.giveBlowjob = createSaGiveBlowjob();
	
	this.penetratePussy = createSaPenetratePussy();
	this.penetrateAss = createSaPenetrateAss();
	this.interlockLegs = createSaInterlockLegs();
	this.mountDick = createSaMountDick();
	this.analMountDick = createSaAnalMountDick();
	
	this.doublePenetration = createSaDoublePenetration();
	
		// Positions
	this.mountFromBehind = createSaMountFromBehind();
	this.mountFaceToFace = createSaMountFaceToFace();
	this.kneel = createSaKneel();
	this.makeKneel = createSaMakeKneel();
	
		// Composite positions
	this.extraMountFromBehind = createSaExtraMountFromBehind();
	this.extraKneel = createSaExtraKneel();
	this.extraMakeKneel = createSaExtraMakeKneel();
	
	// Others //
	this.holdArms = createSaHoldArms();
	
	this.vinesHoldArms = createSaVinesHoldArms();
	
	this.slimeHug = createSaSlimeHug();
	
	this.energyDrainingKiss = createSaEnergyDrainingKiss();
	
	// Weapons
		// Dildo
	this.dildoTeaseGenitals = createSaDildoTeaseGenitals();
	
	this.thrustDildo = createSaThrustDildo();
	this.pushAgainstDildo = createSaPushAgainstDildo();
	
		// Continued actions
			// Dildo
	this.dildoPenetratePussy = createSaDildoPenetratePussy();
	this.dildoPenetrateAss = createSaDildoPenetrateAss();
	this.dildoPenetrateMouth = createSaDildoPenetrateMouth();
	
	this.doubleDildoPussyPenetration = createSaDoubleDildoPussyPenetration();
	//
	
	this.punch = createBaPunch(); // Do not use
	
	////////////////// BATTLE SCENE ACTIONS ////////////////
	this.struggle = createSaStruggle();
	
	this.baKissLips = createSaBaKissLips();
	this.baStrokeDick = createSaBaStrokeDick();
	this.baStrokePussy = createSaBaStrokePussy();
	
	this.baTeaseLockedDick = createSaBaTeaseLockedDick();
	this.baTeaseLockedPussy = createSaBaTeaseLockedPussy();
	
	this.pounceFrontal = createSaNeutralFrontalPounce();
	
	this.pounceFrontalD2P = createSaD2PfrontalPounce();
	this.baThrust = createSaBaThrust();
	this.baPushHipsBack = createSaBaPushHipsBack();
	
	this.pounceFrontalP2P = createSaP2PfrontalPounce();
	this.baScissor = createSaBaScissor();
	this.baScissorBack = createSaBaScissorBack();
	
	this.pounceFrontalP2D = createSaP2DfrontalPounce();
	this.baRideDick = createSaBaRideDick();
	this.baPushDickBack = createSaBaPushDickBack();
	
		// Items
	this.baDildoPenetratePussy = createSaBaDildoPenetratePussy();
	
	this.baThrustDildo = createSaBaThrustDildo();
	
			// Special
	this.monsterCapture = createBaMonsterCapture();
	this.runAway = createBaRunAway();
	
	// Physical
	
	this.kick = createSaKick();
	this.coldGuts = createSaColdGuts();
	
	this.tackle = createTackle();
	this.savageCrush = createSavageCrush();
	this.daringAssault = createDaringAssault();
	
		// Pain
		
	this.baScratch = createSaBaScratch();
	
	this.catAspect = createSaCatAspect();
	
	// Magic
	
	this.holyBlast = createHolyBlast();
	this.embers = createSaEmbers();
	this.flamingFan = createSaFlamingFan();
	this.flaringFeint = createFlaringFeint();
	this.freezeFeet = createSaFreezeFeet();
	this.sparkingRubbing = createSaSparkingRubbing();
	this.lightningDarts = createSaLightningDarts();
	this.earthWall = createEarthWall();
	this.quake = createSaQuake();
	this.fireBreath = createSaFireBreath();
	
	this.taunt = createSaTaunt();
	this.baTease = createSaBaTease();
	
		// Hypnosis
	
	this.baHypnoticGlance = createSaBaHypnoticGlance();
	this.baOrderKneeling = createBaOrderKneeling();
	this.baOrderMasturbation = createBaOrderMasturbation();
	this.baCorrodeMind = createBaCorrodeMind();
	
		// Drain
		
	this.baDrainingKiss = createSaBaDrainingKiss();
	this.baEnergyDrainingKiss = createSaBaEnergyDrainingKiss();
	this.baDrainingRoots = createBaDrainingRoots();
	
		// Bondage
		
	this.baEtherealChains = createSaBaEtherealChains();
	this.baOppressiveEmbrace = createBaOppressiveEmbrace();
			
			// Vines
			
	this.baVineArmLock = createSaBaVineArmLock();
	
		// Transformation
		
	this.baBorrowedIdentity = createBorrowedIdentity();
	
		// Spores
		
	this.baRelaxingScent = createSaRelaxingScent();
	
	// Items
	this.staffSwipe = createStaffSwipe();
	this.boldJab = createBoldJab();
	this.channelAether = createSaChannelAether();
	this.flaunt = createSaFlaunt();
	this.disablingShot = createDisablingShot();
	this.weaponPlunge = createWeaponPlunge();
};

window.getAllActions = function() {
	var actions = [];
	var saListD = saList();
	for ( var sa in saListD ) {
		if ( saListD[sa] instanceof sceneAction ) {
			actions.push(saListD[sa].key);
		}
	}
	return actions;
}

window.returnBaList = function() {
	return ["struggle","baKissLips","baStrokeDick","baStrokePussy","baTeaseLockedDick","baTeaseLockedPussy","pounceFrontal","pounceFrontalD2P","pounceFrontalP2D","pounceFrontalP2P","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","baScratch","catAspect","embers","freezeFeet","sparkingRubbing","lightningDarts","taunt","baTease","baHypnoticGlance","baOrderKneeling","baDrainingKiss","baEnergyDrainingKiss","baEtherealChains","baVineArmLock","baBorrowedIdentity","baRelaxingScent","holyBlast","flamingFan","flaringFeint","disablingShot","earthWall","quake"];
}
window.returnFirstScrollGroupActionsList = function() {
	return ["pushHipsBack","pushAssBack","scissor","thrust","mountFromBehind","rideDick","pushDickBack","kneel","makeKneel","legHoldHead","getBlowjob","fuckFace","suckDick","lickPussy","rideFace","giveCunnilingus","giveBlowjob",'strokeAss','penetrateAss','analThrust','doublePenetration','doubleThrust','analMountDick','analRideDick','analPushDickBack','spanking','holdArms','vinesHoldArms','dickFootjob','pussyFootjob','lickLegs','denyOrgasm','teaseLockedPussy','teaseLockedDick','baTeaseLockedDick','baTeaseLockedPussy','extraMountFromBehind','extraKneel','extraMakeKneel','extraLegHoldHead','coldGuts','pounceFrontal'];
}

// Constructors, serializers, etc.
saList.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

saList.prototype.clone = function () {
	return (new saList())._init(this);
};

saList.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new saList())._init($ReviveData$)', ownData);
};

// Auxiliars

window.doesAnyActionContainTag = function(actionsList,tag) {
	var flag = false;
	for ( var action of actionsList ) {
		if ( setup.saList[action].flavorTags.includes(tag) ) {
			flag = true;
		}
	}
	return flag;
}
window.doesAnyActionContainTags = function(actionsList,tagsList) {
	var flag = false;
	for ( var action of actionsList ) {
		var itFlag = true;
		for ( var tag of tagsList ) {
			if ( setup.saList[action].flavorTags.includes(tag) == false ) {
				itFlag = false;
			}
		}
		if ( itFlag == true ) { flag = true; }
	}
	return flag;
}

window.getCurrentContinuedActionsBetweenInitiatorAndTarget = function(initiator,target) {
	var existingCAs = [];
	
	// Continued actions
	for ( var ca of State.variables.sc.continuedActions ) {
		if ( ca.initiator == initiator && ca.targetsList.includes(target) ) {
			existingCAs.push(ca.key);
		}
	}
	
	return existingCAs;
}

