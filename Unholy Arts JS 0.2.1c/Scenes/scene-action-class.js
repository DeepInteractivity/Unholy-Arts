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

window.isActionUsable = function(actionKey,actorKey,targetsKeys) {
	var iAU = new isUsableResults;
	
	var action = State.variables.saList[actionKey];
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
	
	// Is target ko'ed
	if ( targetsKeys.length > 0 ) {
		if ( gC(targetsKeys[0]).koed && actionKey != "doNothing" ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) {  iAU.explanation += "The target is KO.\n"; }
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
			case "hasLead":
				if ( gC(actorKey).hasLead == false ) {
					iAU.isUsable = false;
					if ( State.variables.settings.debugFunctions ) {  iAU.explanation += "This action requires the user to be leading.\n"; }
				}
				break;
			case "control":
				if ( gC(actorKey).control <= 0 ) {
					iAU.isUsable = false;
					if ( State.variables.settings.debugFunctions ) { iAU.explanation += "This action requires the user to have control higher than 0.\n"; }
				}
				break;
			case "struggle":
				if ( gC(actorKey).position.type != "passive" ) {
					iAU.isUsable = false;
					if ( State.variables.settings.debugFunctions ) { iAU.explanation += "This action is only usable if the actor is being held down.\n"; }
				}
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
	if ( action.linkedPositions == true ) {
		for ( var target of targetsList ) {
			if ( areCharactersLinked(actor,target) == false ) {
				iAU.isUsable = false;
				if ( State.variables.settings.debugFunctions ) { iAU.explanation += "The actor and a target don't share a position.\n"; }
			}
		}
	}
	
	if ( action.unvalidRelationalPositions.length > 0 ) { // Check unvalid relational positions
		for ( var positions of action.unvalidRelationalPositions ) {
			for ( var target of targetsList ) {
				if ( (positions[0] == actor.position.key) && (positions[1] == target.position.key) && (areCharactersLinked(actor,target) == true) ) {
					iAU.isUsable = false;
					if ( State.variables.settings.debugFunctions ) { iAU.explanation += "The actor and a target share an unvalid position.\n"; }
				}
			}
		}
	}
	
	// Position
	if ( action.tags.includes("pos") || action.actionType == "pounce" ) {
		if ( gC(actorKey).position.key != "free" || gC(targetsKeys[0]).position.key != "free" ) {
			iAU.isUsable = false;
			if ( State.variables.settings.debugFunctions ) { iAU.explanation += "The actor and a target should be free to initiate a positional action.\n"; }
		}
	}
	
	// Lead
	if ( State.variables.sc.enabledLead != "none" ) {
		if ( action.tags.includes("cAct") || action.tags.includes("pos") ) {
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
	
	return iAU;
};
window.areCharactersLinked = function(charA,charB) {
	var flagLinked = false;
	
	if ( charA.position.type == "active" ) {
		if ( charA.position.targetsList.includes(charB.varName) ) {
			flagLinked = true;
		}
		else if ( gC(charA.position.targetsList[0]).position.hasOwnProperty('secondaryInitiators') )
		{
			var pos = gC(charA.position.targetsList[0]).position;
			if ( pos.initiator == charB.varName || pos.secondaryInitiators.includes(charB.varName) ) {
				flagLinked = true;
			}
		}
	}
	else if ( charA.position.type == "passive" ) {
		if ( charA.position.initiator == charB.varName ) {
			flagLinked = true;
		}
		else if ( charA.position.hasOwnProperty('secondaryInitiators') ) {
			if ( charA.position.secondaryInitiators.includes(charB.varName) ) {
				flagLinked = true;
			}
		}
	}
	
	return flagLinked;
};

window.tryExecuteAction = function(actionKey,actorKey,targetKeys) {
	var iAU = new isUsableResults;
	var results = new saResults;
	
	iAU = isActionUsable(actionKey,actorKey,targetKeys);
	if ( iAU.isUsable ) { // Action may be used, execute:
		results = State.variables.saList[actionKey].execute(actorKey,targetKeys);
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
	this.flavorTags = [];
	this.strategyTags = [];
	this.affinities = [];
	
	this.getIsAllowedBySettings = null;
	
	this.requiredPositions = []; // If the list contains anything, the actor requires one of these positions
	this.targetRequiredPositions = []; // If the list contains anything, the targets require one of these positions
	this.linkedPositions = false; // If true, the actor and its targets require to be referenced as initiator or target in their respective positions
	
	this.requiresFree = false; // If true, action will only be usable if actor has no position
	// this.unvalidPositions = []; // Is the actor's current position is in this list, the action isn't usable // Not implemented
	
	this.unvalidRelationalPositions = []; // List of 2-sized arrays. First element is actor position, second element is target position,
									     // If they match, the action can't be executed
	
	this.requiredActiveCAs = []; // Required Active and Passive Continued Actions refer to a set of continued actions of which at least
	this.requiredPassiveCAs = []; // one is required for the action to be possible.
								// Active ones require the character to be the initiator, passive ones requires the character to be the target.
	this.requiredCAs = []; // Required Continued Action, regardless of role.
	
	this.requiredRace = []; // If length > 0, requires the character's race to be included
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
	this.frottage = createSaFrottage();
	
	this.lickLegs = createSaLickLegs();
	
	this.thrust = createSaThrust();
	this.analThrust = createSaAnalThrust();
	this.piston = createSaPiston();
	this.pushHipsBack = createSaPushHipsBack();
	this.finalPush = createSaFinalPush();
	
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
	
	this.etherealChains = createSaEtherealChains();
	
		// Cont. actions
	
	this.frenchKiss = createSaFrenchKiss();
	this.legHoldHead = createLegHoldHead();
	
	this.getBlowjob = createSaGetBlowjob();
	
	this.penetratePussy = createSaPenetratePussy();
	this.penetrateAss = createSaPenetrateAss();
	this.interlockLegs = createSaInterlockLegs();
	
	this.mountFromBehind = createSaMountFromBehind();
	this.mountFaceToFace = createSaMountFaceToFace();
	this.kneel = createSaKneel();
	this.makeKneel = createSaMakeKneel();
	
	this.holdArms = createSaHoldArms();
	
	this.vinesHoldArms = createSaVinesHoldArms();
	
	this.energyDrainingKiss = createSaEnergyDrainingKiss();
	
	//
	
	this.punch = createBaPunch(); // ToDo: Remove this
	
	////////////////// BATTLE SCENE ACTIONS ////////////////
	this.struggle = createSaStruggle();
	
	this.baKissLips = createSaBaKissLips();
	this.baStrokeDick = createSaBaStrokeDick();
	this.baStrokePussy = createSaBaStrokePussy();
	
	this.pounceFrontalD2P = createSaD2PfrontalPounce();
	this.baThrust = createSaBaThrust();
	this.baPushHipsBack = createSaBaPushHipsBack();
	
	this.pounceFrontalP2P = createSaP2PfrontalPounce();
	this.baScissor = createSaBaScissor();
	this.baScissorBack = createSaBaScissorBack();
	
	this.pounceFrontalP2D = createSaP2DfrontalPounce();
	this.baRideDick = createSaBaRideDick();
	this.baPushDickBack = createSaBaPushDickBack();
	
	this.kick = createSaKick();
	this.coldGuts = createSaColdGuts();
	
	this.embers = createSaEmbers();
	this.freezeFeet = createSaFreezeFeet();
	this.sparkingRubbing = createSaSparkingRubbing();
	
	this.taunt = createSaTaunt();
	this.baTease = createSaBaTease();
	
		// Hypnosis
	
	this.baHypnoticGlance = createSaBaHypnoticGlance();
	
		// Drain
		
	this.baDrainingKiss = createSaBaDrainingKiss();
	this.baEnergyDrainingKiss = createSaBaEnergyDrainingKiss();
	
		// Bondage
		
	this.baEtherealChains = createSaBaEtherealChains();
};

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

