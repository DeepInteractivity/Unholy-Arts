////////// SIS Specifics  //////////

// Short set of data containing controls info
window.SisSpecifics = function() {
	this.playerTarget = "";
	
	this.passageText = "";
	this.resultsText = "";
	this.targetText = "";
	this.choicesText = "";
	this.exitsText = "";
	
	this.flagSissEnd = false;
	this.continueButton = "";

		// UI
	this.formatPassageText = function() {
		if ( this.flagSissEnd == false && State.variables.sisPlayerInfo.flagRejectedSis != true ) {		// Normal behavior
			this.formatTargetsText();
			this.formatChoicesText();
			this.formatExitsText();
			
			this.passageText = "";
			if ( this.resultsText != "" ) {
				this.passageText += this.resultsText + "\n\n";
				this.resultsText = "";
			}
			
			this.passageText += this.targetText + "\n\n";
			this.passageText += this.choicesText + "\n";
			this.passageText += this.exitsText;
		}
		else if ( State.variables.sisPlayerInfo.flagRejectedSis ) { // Interactions were rejected
			this.passageText = State.variables.sisPlayerInfo.rejectedSisPassage;
		}
		else {								// Proposal accepted. Siss ends and a button is offered to do so
			this.passageText = "";
			if ( this.resultsText != "" ) {
				this.passageText += this.resultsText + "\n\n";
				this.resultsText = "";
			}
			this.passageText += this.continueButton;
		}
	}
	this.formatTargetsText = function() {
		this.targetText = "__Discussing with " + gC(this.playerTarget).formattedName + "__:\n"
					    + "Favor owed: " + State.variables.chPlayerCharacter.relations[this.playerTarget].favor;
	}
	
	this.formatChoicesText = function() {
		this.choicesText = "";
		var i = 0;
		for ( var sist of State.variables.sistDB ) {
			if ( sist.isPossible("chPlayerCharacter",this.playerTarget) ) {
				this.choicesText += this.getButtonTopicChoice(sist,("State.variables.sistDB[" + i + "]")) + sist.subtitle + "\n";
			}
			i++;
		}
	}
	this.getButtonTopicChoice = function(sisTopic,sisTopicCaller) {
		var bText = "<<l" + "ink [[" + sisTopic.title + "|Social Interactions Specifics]]>><<s" + "cript>>\n";
		bText 	 += "State.variables.sisSpecifics.processTopicResult('chPlayerCharacter','" + this.playerTarget + "'," + sisTopicCaller + ");\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	this.formatExitsText = function() {
		var bText = "<<l" + "ink [[Back to interactions|Social Interactions]]>><<s" + "cript>>\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>\n";
		bText	 += "<<l" + "ink [[Leave conversation|Map]]>><<s" + "cript>>\n";
		bText 	 += "State.variables.compass.sisList[State.variables.compass.pcSis].charsLeaveSis(getCharGroup('chPlayerCharacter'));\n";
		bText	 += "State.variables.sisSpecifics.playerTarget = State.variables.sisPlayerInfo.currentTarget;\n";
		bText 	 += "<</s" + "cript>><</l" + "ink>>";
		this.exitsText = bText;
	}

		// Logic
	this.processTopicResult = function(actor,target,sisTopic) {
		// This gets executed when the player executes a sist. For npcs, check executeStandardSistEffects()
		var resultsText = "";
		var isSuccessful = sisTopic.isSuccessful(actor,target);
		var effect = 0;
		if ( isSuccessful[0] == true ) {
			resultsText = sisTopic.getSuccessMessage(actor,target);
			effect = sisTopic.getSuccessEffect(actor,target);
		}
		else {
			resultsText = sisTopic.getFailMessage(actor,target);
			effect = sisTopic.getFailEffect(actor,target);
		}
		resultsText += "\n" + isSuccessful[1]; // isSuccessful[1] returns a string detailing why that was the result
		this.resultsText += resultsText;
	}

		// Management
	this.cleanSiss = function() {
		this.playerTarget = "";
		this.resultsText = "";
		this.flagSissEnd = false;
		this.continueButton = "";
	}
}

State.variables.sisSpecifics = new SisSpecifics();

// Constructors, serializers, etc.
SisSpecifics.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
SisSpecifics.prototype.clone = function () {
	return (new SisSpecifics())._init(this);
};
SisSpecifics.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new SisSpecifics())._init($ReviveData$)', ownData);
};

////////// SIS Topics //////////

// Short set of data containing controls info
window.sisTopic = function(title) {
	this.title = title;
	this.subtitle = "";
	
	this.isPossible = function(actor,target) {
		return true;
	}
	this.isSuccessful = function(actor,target) {
		// Returns a 2-elements array. First element is result as true/false. Second element is a string detailing success chances
		return [true,""];
	}
	this.getFailMessage = function(actor,target) {
	}
	this.getFailEffect = function(actor,target) {
	}
	this.getSuccessMessage = function(actor,target) {
	}
	this.getSuccessEffect = function(actor,message) {
	}
	this.askToPlayer = null;
	this.getButtonPlayerAccepts = null;
}

window.genericSistEffectsPlusPc = function(actors,targets,plusEffects) {
	var allChars = getCharGroup(actors[0]).concat(getCharGroup(targets[0]));
	
	// Clean SISS
	State.variables.sisSpecifics.cleanSiss();
	
	// Clean SIS
	var pcSis = State.variables.compass.pcSis;
	State.variables.compass.sisList[pcSis].charsLeaveSis(allChars);
	
	// Extra effects
	plusEffects(actors,targets);
}
window.genericSistEffects = function(actors,targets) {
	var sisId = State.variables.compass.findFirstSisIdInvolvingCharacter(actors[0]);
	var allChars = actors.concat(targets);
	
	// Chars leave Sis
	State.variables.compass.sisList[sisId].charsLeaveSis(allChars);
	// Notify SIS if Player needs button to leave to scene
	if ( gC(actors[0]).followedBy.includes("chPlayerCharacter") || gC(targets[0]).followedBy.includes("chPlayerCharacter") )  {
		State.variables.compass.sisList[sisId].flagPlayerTakenToScene = true;
	}
}

	// Offer sex
window.createSistEgalitarianSex = function() {
	var sist = new sisTopic("Invite to have sex (Equal terms)");
	sist.isPossible = function(actor,target) {
		var flagPossible = false;
		if ( ( gC(target).type == "candidate" ) && ( getSisCharIsIn(actor).getValidProposedCharacters(actor).includes(target) ) ) {
			flagPossible = true;
		}
		return flagPossible;
	}
	sist.isSuccessful = function(actor,target) {
		var result = false;
		var stringResult = "";
		var secondStringResult = "";
		var relType = gRelTypeAb(target,actor);
		
		if ( relType ) {
			if ( relType.forcedToSex ) {
				result = true;
				stringResult = gC(target).getFormattedName() + " is bound by your relationship to accept.";
			}
		}
		if ( result == false ) {
		var baseDifficulty = -10; // -10
		var targetMoodFactor = gC(target).mood.flirty * 0.1 + gC(target).mood.intimate * 0.1 + gC(target).mood.aroused * 0.2
							 + gC(target).mood.angry * -0.3 + gC(target).mood.bored * (-0.3) + gC(target).mood.submissive * 0.1
							 + gC(target).mood.dominant * -0.2;
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 2 + rLvlAbt(target,actor,"sexualTension") * 4
							 + rLvlAbt(target,actor,"submission") * 4 + rLvlAbt(target,actor,"domination") * -4
							 + rLvlAbt(target,actor,"enmity") * -6 + rLvlAbt(target,actor,"rivalry") * -2;
		var simulationState = 0;
		if ( State.variables.simCycPar.templeDayPeriod == "training" ) {
			simulationState = -20;
		}
		
		var semifinalValue = targetMoodFactor + relationshipFactor + baseDifficulty + simulationState;
		var sfvTenth = semifinalValue * 0.1;
		var diceThrow = luckedDiceThrow(gC(actor).luck.getValue());
		var luckFactor = (sfvTenth * 2 * diceThrow) - sfvTenth;
		
		var finalValue = semifinalValue + luckFactor;
		result = false;
		if ( finalValue >= 0 ) { result = true; }
		secondStringResult = gC(actor).getFormattedName() + " invited " + gC(target).getFormattedName() + " to have sex and ";
		if ( result ) { stringResult = "Success!"; secondStringResult += gC(target).perPr + " accepted."; }
		else 		  { stringResult = "Failure."; secondStringResult += gC(target).perPr + " refused."; }
		stringResult += " Mood: " + targetMoodFactor.toFixed(2) + ", Relationship: " + relationshipFactor.toFixed(2) + ", Base dif.: " + baseDifficulty
					  + ", Others: " + simulationState + ", Luck: " + luckFactor.toFixed(2) + " - Result: " + finalValue.toFixed(2);
		}
		
		secondStringResult = gC(actor).getFormattedName() + " invited " + gC(target).getFormattedName() + " to have sex and ";
		if ( result ) { secondStringResult += gC(target).perPr + " accepted."; }
		else 		  { secondStringResult += gC(target).perPr + " refused."; }
		
		return [result,stringResult,secondStringResult];		
	}
	sist.getFailMessage = function(actor,target) {
		var message = firstToCap(gC(target).perPr) + " refused. " + gC(target).formattedName + " is growing bored.";
		return message;
	}
	sist.getFailEffect = function(actor,target) {
		gC(target).mood.bored += 10;
		if ( gC(target).mood.bored > 100 ) {
			gC(target).mood.bored = 100;
		}
	}
	sist.getSuccessMessage = function(actor,target) {
		var message = firstToCap(gC(target).perPr) + " agreed. You take " + gC(target).formattedName + " to a secluded place...";
		return message;
	}
	sist.getSuccessEffect = function(actor,target) {
		if ( actor == "chPlayerCharacter" ) {
			State.variables.sisSpecifics.flagSissEnd = true;
			
			var bText = "<<l" + "ink [[Continue|Scene]]>><<s" + "cript>>\n";
			bText	 += "genericSistEffectsPlusPc(['" + actor + "'],['" + target + "'],sistEgalitarianSexEffects);\n";
			bText	 += "<</s" + "cript>><</l" + "ink>>";
			
			State.variables.sisSpecifics.continueButton = bText;
		} else {
			genericSistEffects(getCharGroup(actor),getCharGroup(target));
			sistEgalitarianSexEffects([actor],[target]);
		}
	}
	sist.askToPlayer = function(actor,target,sisKey) {
		var promptText = gC(actor).getFormattedName() + " wants to have sex with you on equal conditions.\n\n"
					   + this.getButtonPlayerAccepts(actor);
		var promptMode = "default";
		if ( gRelTypeAb("chPlayerCharacter",actor) ) {
			if ( gRelTypeAb("chPlayerCharacter",actor).forcedToSex ) {
				promptMode = "relTypeForcesToAccept";
			}
		}
		State.variables.compass.sisList[sisKey].setSisPlayerPrompt(promptText,promptMode);
	}
	sist.getButtonPlayerAccepts = function(actor) {
		var bText = "<<l" + "ink [[Accept|Scene]]>><<s" + "cript>>\n";
		bText	 += "genericSistEffectsPlusPc(['" + actor + "'],['chPlayerCharacter'],sistEgalitarianSexEffects);\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	return sist;
}

window.sistEgalitarianSexEffects = function(actors,targets) {
	var flagPlayerIsInvolved = false;
	if ( actors.concat(targets).includes("chPlayerCharacter") || gC(actors[0]).followedBy.includes("chPlayerCharacter") || gC(targets[0]).followedBy.includes("chPlayerCharacter") ) { flagPlayerIsInvolved = true; }
	var actor = actors[0];
	var target = targets[0];
	
	// Relocate actor and target
	if ( gC(actor).getRefugeRoomInMap() != "none" ) {
		State.variables.compass.moveCharsToRoom(getCharGroup(actor).concat(getCharGroup(target)),gC(actor).getRefugeRoomInMap());
	}
	
	// Start Sex Scene
	if ( flagPlayerIsInvolved ) {
		if ( target == "chPlayerCharacter" ) {
			target = actor;
			actor = "chPlayerCharacter";
		}
		if ( getCharGroup(actor).includes(target) ) {
			State.variables.sc.startScene(
		"ss","dynamic",getCharGroup(actor),[],"The water flows quietly.",endConditionTurns,30,"Map");
		} else {
			State.variables.sc.startScene(
		"ss","dynamic",getCharGroup(actor),getCharGroup(target),"The water flows quietly.",endConditionTurns,30,"Map");
		}
		State.variables.sc.endSceneScript = processGenericSexSceneEffects;
		
		for ( var charKey of getCharGroup(actor).concat(getCharGroup(target)) ) {
			if ( charKey != "chPlayerCharacter" ) {
				gC(charKey).aiAlgorythm = createAiWeightedMissionsByTaste();
				gC(charKey).aiAlgorythm.setRoleEqualFooting();
			}
		}
		State.variables.sc.formatScenePassage();
	}
	
	// Start appropiate event
	State.variables.compass.characterEventEndsPrematurely(target);
	State.variables.compass.characterEventEndsPrematurely(actor);
	var eventCharList = removeDuplicatesFromList(getCharGroup(actor).concat(getCharGroup(target)));
	eventToPile(createSystemEventStandardSexScene(eventCharList));
	if ( flagPlayerIsInvolved ) {
		State.variables.compass.pushAllTimeToAdvance();
	}
}

window.createSistSubmissiveSex = function() {
	var sist = new sisTopic("Invite to have sex (Player submissive)");
	sist.isPossible = function(actor,target) {
		var flagPossible = false;
		if ( ( gC(target).type == "candidate" ) && ( getSisCharIsIn(actor).getValidProposedCharacters(actor).includes(target) ) ) {
			flagPossible = true;
		}
		return flagPossible;
	}
	sist.isSuccessful = function(actor,target) {
		var result = false;
		var stringResult = "";
		var secondStringResult = "";
		var relType = gRelTypeAb(target,actor);
		
		if ( relType ) {
			if ( relType.forcedToSex ) {
				result = true;
				stringResult = gC(target).getFormattedName() + " is bound by your relationship to accept.";
			}
		}
		if ( result == false ) {
		var baseDifficulty = -5; // -5;
		var targetMoodFactor = gC(target).mood.flirty * 0.1 + gC(target).mood.aroused * 0.3
							 + gC(target).mood.angry * -0.2 + gC(target).mood.bored * -0.4 + gC(target).mood.submissive * -0.2
							 + gC(target).mood.dominant * 0.1;
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 2 + rLvlAbt(target,actor,"sexualTension") * 6
							 + rLvlAbt(target,actor,"submission") * -2 + rLvlAbt(target,actor,"domination") * 2
							 + rLvlAbt(target,actor,"enmity") * -4 + rLvlAbt(target,actor,"rivalry") * 4;
		var simulationState = 0;
		if ( State.variables.simCycPar.templeDayPeriod == "training" ) {
			simulationState = -20;
		}
		
		var semifinalValue = targetMoodFactor + relationshipFactor + baseDifficulty + simulationState;
		var sfvTenth = semifinalValue * 0.1;
		var diceThrow = luckedDiceThrow(gC(actor).luck.getValue());
		var luckFactor = (sfvTenth * 2 * diceThrow) - sfvTenth;
		
		var finalValue = semifinalValue + luckFactor;
		result = false;
		if ( finalValue >= 0 ) { result = true; }
		stringResult += " Mood: " + targetMoodFactor.toFixed(2) + ", Relationship: " + relationshipFactor.toFixed(2) + ", Base dif.: " + baseDifficulty
					  + ", Others: " + simulationState + ", Luck: " + luckFactor.toFixed(2) + " - Result: " + finalValue.toFixed(2);
		}
		
		secondStringResult = gC(actor).getFormattedName() + " invited " + gC(target).getFormattedName() + " to have sex and ";
		if ( result ) { secondStringResult += gC(target).perPr + " accepted."; }
		else 		  { secondStringResult += gC(target).perPr + " refused."; }
					  
		return [result,stringResult,secondStringResult];	
	}
	sist.getFailMessage = function(actor,target) {
		var message = firstToCap(gC(target).perPr) + " refused. " + gC(target).formattedName + " is growing bored.";
		return message;
	}
	sist.getFailEffect = function(actor,target) {
		gC(target).mood.bored += 10;
		if ( gC(target).mood.bored > 100 ) {
			gC(target).mood.bored = 100;
		}
	}
	sist.getSuccessMessage = function(actor,target) {
		var message = firstToCap(gC(target).perPr) + " agreed. You take " + gC(target).formattedName + " to a secluded place...";
		return message;
	}
	sist.getSuccessEffect = function(actor,target) {
		if ( actor == "chPlayerCharacter" ) {
			State.variables.sisSpecifics.flagSissEnd = true;
			
			var bText = "<<l" + "ink [[Continue|Scene]]>><<s" + "cript>>\n";
			bText	 += "genericSistEffectsPlusPc(['" + actor + "'],['" + target + "'],sistSubmissiveSexEffects);\n";
			bText	 += "<</s" + "cript>><</l" + "ink>>";
			
			State.variables.sisSpecifics.continueButton = bText;
		} else {
			genericSistEffects(getCharGroup(actor),getCharGroup(target));
			sistSubmissiveSexEffects([actor],[target]);
		}
	}
	sist.askToPlayer = function(actor,target,sisKey) {
		var promptText = gC(actor).getFormattedName() + " wants to have sex with you at the top.\n\n"
					   + this.getButtonPlayerAccepts(actor);
		var promptMode = "default";
		if ( gRelTypeAb("chPlayerCharacter",actor) ) {
			if ( gRelTypeAb("chPlayerCharacter",actor).forcedToSex ) {
				promptMode = "relTypeForcesToAccept";
			}
		}
		State.variables.compass.sisList[sisKey].setSisPlayerPrompt(promptText,promptMode);
	}
	sist.getButtonPlayerAccepts = function(actor) {
		var bText = "<<l" + "ink [[Accept|Scene]]>><<s" + "cript>>\n";
		bText	 += "genericSistEffectsPlusPc(['" + actor + "'],['chPlayerCharacter'],sistSubmissiveSexEffects);\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	return sist;
}

window.sistSubmissiveSexEffects = function(actors,targets) {
	var flagPlayerIsInvolved = false;
	if ( actors.concat(targets).includes("chPlayerCharacter") || gC(actors[0]).followedBy.includes("chPlayerCharacter") || gC(targets[0]).followedBy.includes("chPlayerCharacter") ) { flagPlayerIsInvolved = true; }
	var actor = actors[0];
	var target = targets[0];
	
	// Relocate actor and target
	if ( gC(actor).getRefugeRoomInMap() != "none" ) {
		State.variables.compass.moveCharsToRoom(getCharGroup(actor).concat(getCharGroup(target)),gC(actor).getRefugeRoomInMap());
	}
	
	// Start Sex Scene
	var actorO = actor;
	var targetO = target;
	var tFlag = false;
	if ( flagPlayerIsInvolved ) {
		if ( target == "chPlayerCharacter" ) {
			target = actor;
			actor = "chPlayerCharacter";
			tFlag = true;
		}
		if ( getCharGroup(actor).includes(target) ) {
			State.variables.sc.startScene(
		"ss","fixed",getCharGroup(actor),[],"The water flows quietly.",endConditionTurns,30,"Map");
		} else {
			State.variables.sc.startScene(
		"ss","fixed",getCharGroup(actor),getCharGroup(target),"The water flows quietly.",endConditionTurns,30,"Map");
		}
		State.variables.sc.endSceneScript = processGenericSexSceneEffects;
		
		if ( tFlag ) {
			gC(actor).hasLead = true;
		} else {
			gC(target).hasLead = true;
		}
		for ( var charKey of getCharGroup(actor).concat(getCharGroup(target)) ) {
			if ( charKey != "chPlayerCharacter" ) {
				gC(charKey).aiAlgorythm = createAiWeightedMissionsByTaste();
				if ( charKey == target ) {
					gC(charKey).aiAlgorythm.setRoleDomination();
				} else {
					gC(charKey).aiAlgorythm.setRoleSubmission();
				}
			}
		}
		/*
		if ( targetO != "chPlayerCharacter" ) {
			State.variables[target].hasLead = true;
			State.variables[target].aiAlgorythm = createAiWeightedMissionsByTaste();
			State.variables[target].aiAlgorythm.fixedTarget = actor;
			State.variables[target].aiAlgorythm.setRoleDomination();
		} else {
			State.variables[actor].hasLead = true;
			State.variables[target].aiAlgorythm = createAiWeightedMissionsByTaste();
			State.variables[target].aiAlgorythm.fixedTarget = actor;
			State.variables[target].aiAlgorythm.setRoleSubmission();
		}
		*/
		State.variables.sc.formatScenePassage();
	}
	
	// Start appropiate event
	State.variables.compass.characterEventEndsPrematurely(target);
	State.variables.compass.characterEventEndsPrematurely(actor);
	var eventCharList = removeDuplicatesFromList(getCharGroup(actor).concat(getCharGroup(target)));
	eventToPile(createSystemEventStandardSexScene(eventCharList));
	if ( flagPlayerIsInvolved ) {
		State.variables.compass.pushAllTimeToAdvance();
	}
}

window.createSistDominantSex = function() {
	var sist = new sisTopic("Invite to have sex (Player Dominant)");
	sist.isPossible = function(actor,target) {
		var flagPossible = false;
		if ( ( gC(target).type == "candidate" ) && ( getSisCharIsIn(actor).getValidProposedCharacters(actor).includes(target) ) ) {
			flagPossible = true;
		}
		return flagPossible;
	}
	sist.isSuccessful = function(actor,target) {
		var result = false;
		var stringResult = "";
		var secondStringResult = "";
		var relType = gRelTypeAb(target,actor);
		
		if ( relType ) {
			if ( relType.forcedToSex ) {
				result = true;
				stringResult = gC(target).getFormattedName() + " is bound by your relationship to accept.";
			}
		}
		if ( result == false ) {
		var baseDifficulty = -20; // -20
		var targetMoodFactor = gC(target).mood.flirty * 0.1 + gC(target).mood.intimate * 0.1 + gC(target).mood.aroused * 0.2
							 + gC(target).mood.angry * -0.5 + gC(target).mood.bored * -0.2 + gC(target).mood.submissive * 0.2
							 + gC(target).mood.dominant * -0.4;
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 2 + rLvlAbt(target,actor,"sexualTension") * 4
							 + rLvlAbt(target,actor,"submission") * 6 + rLvlAbt(target,actor,"domination") * -6
							 + rLvlAbt(target,actor,"enmity") * -6 + rLvlAbt(target,actor,"rivalry") * -6;
		var simulationState = 0;
		if ( State.variables.simCycPar.templeDayPeriod == "training" ) {
			simulationState = -20;
		}
		
		var semifinalValue = targetMoodFactor + relationshipFactor + baseDifficulty + simulationState;
		var sfvTenth = semifinalValue * 0.1;
		var diceThrow = luckedDiceThrow(gC(actor).luck.getValue());
		var luckFactor = (sfvTenth * 2 * diceThrow) - sfvTenth;
		
		var finalValue = semifinalValue + luckFactor;
		result = false;
		if ( finalValue >= 0 ) { result = true; }
		stringResult += " Mood: " + targetMoodFactor.toFixed(2) + ", Relationship: " + relationshipFactor.toFixed(2) + ", Base dif.: " + baseDifficulty
					  + ", Others: " + simulationState + ", Luck: " + luckFactor.toFixed(2) + " - Result: " + finalValue.toFixed(2);
		}
		
		secondStringResult = gC(actor).getFormattedName() + " invited " + gC(target).getFormattedName() + " to have sex and ";
		if ( result ) { secondStringResult += gC(target).perPr + " accepted."; }
		else 		  { secondStringResult += gC(target).perPr + " refused."; }
		
		return [result,stringResult,secondStringResult];	
	}
	sist.getFailMessage = function(actor,target) {
		var message = firstToCap(gC(target).perPr) + " refused. " + gC(target).formattedName + " is growing bored.";
		return message;
	}
	sist.getFailEffect = function(actor,target) {
		gC(target).mood.bored += 10;
		if ( gC(target).mood.bored > 100 ) {
			gC(target).mood.bored = 100;
		}
	}
	sist.getSuccessMessage = function(actor,target) {
		var message = firstToCap(gC(target).perPr) + " agreed. You take " + gC(target).formattedName + " to a secluded place...";
		return message;
	}
	sist.getSuccessEffect = function(actor,target) {
		if ( actor == "chPlayerCharacter" ) {
			State.variables.sisSpecifics.flagSissEnd = true;
			
			var bText = "<<l" + "ink [[Continue|Scene]]>><<s" + "cript>>\n";
			bText	 += "genericSistEffectsPlusPc(['" + actor + "'],['" + target + "'],sistDominantSexEffects);\n";
			bText	 += "<</s" + "cript>><</l" + "ink>>";
			
			State.variables.sisSpecifics.continueButton = bText;
		} else {
			genericSistEffects(getCharGroup(actor),getCharGroup(target));
			sistDominantSexEffects([actor],[target]);
		}
	}
	sist.askToPlayer = function(actor,target,sisKey) {
		var promptText = gC(actor).getFormattedName() + " wants to have sex with you at the bottom.\n\n"
					   + this.getButtonPlayerAccepts(actor);
		var promptMode = "default";
		if ( gRelTypeAb("chPlayerCharacter",actor) ) {
			if ( gRelTypeAb("chPlayerCharacter",actor).forcedToSex ) {
				promptMode = "relTypeForcesToAccept";
			}
		}
		State.variables.compass.sisList[sisKey].setSisPlayerPrompt(promptText,promptMode);
	}
	sist.getButtonPlayerAccepts = function(actor) {
		var bText = "<<l" + "ink [[Accept|Scene]]>><<s" + "cript>>\n";
		bText	 += "genericSistEffectsPlusPc(['" + actor + "'],['chPlayerCharacter'],sistDominantSexEffects);\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	return sist;
}

window.sistDominantSexEffects = function(actors,targets) {
	var flagPlayerIsInvolved = false;
	if ( actors.concat(targets).includes("chPlayerCharacter") || gC(actors[0]).followedBy.includes("chPlayerCharacter") || gC(targets[0]).followedBy.includes("chPlayerCharacter") ) { flagPlayerIsInvolved = true; }
	var actor = actors[0];
	var target = targets[0];
	
	// Relocate actor and target
	if ( gC(actor).getRefugeRoomInMap() != "none" ) {
		State.variables.compass.moveCharsToRoom(getCharGroup(actor).concat(getCharGroup(target)),gC(actor).getRefugeRoomInMap());
	}
	
	// Start Sex Scene
	if ( flagPlayerIsInvolved ) {
		var actorO = actor;
		var targetO = target;
		var tFlag = false;
		if ( target == "chPlayerCharacter" ) {
			target = actor;
			actor = "chPlayerCharacter";
			tFlag = true;
		}
		if ( getCharGroup(actor).includes(target) ) {
			State.variables.sc.startScene(
		"ss","fixed",getCharGroup(actor),[],"The water flows quietly.",endConditionTurns,30,"Map");
		} else {
			State.variables.sc.startScene(
		"ss","fixed",getCharGroup(actor),getCharGroup(target),"The water flows quietly.",endConditionTurns,30,"Map");
		}
		State.variables.sc.endSceneScript = processGenericSexSceneEffects;
		
		if ( tFlag ) {
			gC(target).hasLead = true;
		} else {
			gC(actor).hasLead = true;
		}
		for ( var charKey of getCharGroup(actor).concat(getCharGroup(target)) ) {
			if ( charKey != "chPlayerCharacter" ) {
				gC(charKey).aiAlgorythm = createAiWeightedMissionsByTaste();
				if ( charKey == actor ) {
					gC(charKey).aiAlgorythm.setRoleDomination();
				} else {
					gC(charKey).aiAlgorythm.setRoleSubmission();
				}
			}
		}
		/*
		
		if ( targetO != "chPlayerCharacter" ) {
			State.variables[actor].hasLead = true;
			State.variables[target].aiAlgorythm = createAiWeightedMissionsByTaste();
			State.variables[target].aiAlgorythm.fixedTarget = actor;
			State.variables[target].aiAlgorythm.setRoleSubmission();
		} else {
			State.variables[target].hasLead = true;
			State.variables[target].aiAlgorythm = createAiWeightedMissionsByTaste();
			State.variables[target].aiAlgorythm.fixedTarget = actor;
			State.variables[target].aiAlgorythm.setRoleDomination();
		}
		*/
		State.variables.sc.formatScenePassage();
	}
	
	// Start appropiate event
	State.variables.compass.characterEventEndsPrematurely(target);
	State.variables.compass.characterEventEndsPrematurely(actor);
	var eventCharList = removeDuplicatesFromList(getCharGroup(actor).concat(getCharGroup(target)));
	eventToPile(createSystemEventStandardSexScene(eventCharList));
	if ( flagPlayerIsInvolved ) {
		State.variables.compass.pushAllTimeToAdvance();
	}
}

	// Offer special relationships
window.createSistOfferServitudeAsMaster = function() {
	var sist = new sisTopic("Invite to initiate Servitude Relationship as your Servant");
	sist.subtitle += '<span title="' + relTypeServitudeTooltip() + '">(?)</span>';
	sist.isPossible = function(actor,target) {
		var flagPossible = false;
		// Actor is candidate, actor and target have no special relationship, actor has no dominant, target has no submissives,
		// special relationships are allowed
		if ( (gSettings().servitudeRelationships == "enable") && ( gC(actor).type == "candidate" ) &&
			( gRelTypeAb(actor,target) == null ) && ( gC(actor).domChar == null )
		  && ( gC(target).subChars.length < 1 ) && ( State.variables.settings.relationshipTypesAllowed ) ) {
			flagPossible = true;
		}
		return flagPossible;
	}
	
	sist.isSuccessful = function(actor,target) {
		var result = false;
		var stringResult = "";
		var secondStringResult = "";
		
		var baseDifficulty = 100;
		var targetMoodFactor = gC(target).mood.submissive * 0.4 + gC(target).mood.dominant * -0.6 + gC(target).mood.intimate * 0.1
							 + gC(target).mood.aroused * 0.2 + gC(target).mood.bored * -0.2 + gC(target).mood.angry * -0.5;
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 2 + rLvlAbt(target,actor,"sexualTension") * 2
							 + rLvlAbt(target,actor,"submission") * 5 + rLvlAbt(target,actor,"domination") * -10
							 + rLvlAbt(target,actor,"enmity") * -20 + rLvlAbt(target,actor,"rivalry") * -20;
							 
		var semifinalValue = targetMoodFactor + relationshipFactor;
		var sfvTenth = semifinalValue * 0.1;
		var diceThrow = luckedDiceThrow(gC(actor).luck.getValue());
		var luckFactor = (sfvTenth * 2 * diceThrow) - sfvTenth;
		
		var finalValue = semifinalValue + luckFactor;
		if ( finalValue >= baseDifficulty ) { result = true; }
		stringResult += " Mood: " + targetMoodFactor.toFixed(2) + ", Relationship: " + relationshipFactor.toFixed(2) + ", Luck: " + luckFactor.toFixed(2)
					  + " -> Result: " + finalValue.toFixed(2) + " VS Difficulty: " + baseDifficulty;
		
		secondStringResult = gC(actor).getFormattedName() + " invited " + gC(target).getFormattedName() + " to become " + gC(target).posPr + " master and " + gC(target).perPr;
		if ( result ) { secondStringResult += gC(target).perPr + " accepted."; }
		else 		  { secondStringResult += gC(target).perPr + " refused."; }
		
		return [result,stringResult,secondStringResult];	
	}
	sist.getFailMessage = function(actor,target) {
		var message = firstToCap(gC(target).perPr) + " refused. " + gC(target).formattedName + " is growing angry.";
		return message;
	}
	sist.getFailEffect = function(actor,target) {
		gC(target).mood.angry += 10;
		if ( gC(target).mood.angry > 100 ) {
			gC(target).mood.angry = 100;
		}
	}
	sist.getSuccessMessage = function(actor,target) {
		var message = firstToCap(gC(target).perPr) + " agreed. " + gC(target).formattedName + " will now serve you.";
		return message;
	}
	sist.getSuccessEffect = function(actor,target) {
		if ( actor == "chPlayerCharacter" ) {
			State.variables.sisSpecifics.flagSissEnd = true;
			
			var bText = "<<l" + "ink [[Continue|Social Interactions]]>><<s" + "cript>>\n";
			bText    += "createRelTypeServitudeDom('" + actor + "','" + target + "',3);\n";
			bText	 += "createRelTypeServitudeSub('" + target + "','" + actor + "',3);\n";
			bText	 += "State.variables.sisSpecifics.flagSissEnd = false;\n";
			bText	 += "<</s" + "cript>><</l" + "ink>>";
			
			State.variables.sisSpecifics.formatChoicesText();
			
			State.variables.sisSpecifics.continueButton = bText;
		} else {
			genericSistEffects(getCharGroup(actor),getCharGroup(target));
			sistEgalitarianSexEffects([actor],[target]);
		}
	}
	sist.askToPlayer = function(actor,target,sisKey) {
		var promptText = gC(actor).getFormattedName() + " wants to initiate a servitude relationship with you as " + gC(actor).posPr + " servant.\n\n"
					   + this.getButtonPlayerAccepts(actor);
		State.variables.compass.sisList[sisKey].setSisPlayerPrompt(promptText,"default");
	}
	sist.getButtonPlayerAccepts = function(actor) {
		var bText = "<<l" + "ink [[Accept|Social Interactions]]>><<s" + "cript>>\n";
		bText	 += "createSistOfferServitudeAsMaster.getSuccessEffect('" + actor + "','chPlayerCharacter');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	return sist;
}
window.createSistOfferServitudeAsServant = function() {
	var sist = new sisTopic("Invite to initiate Servitude Relationship as your Master");
	sist.subtitle += '<span title="' + relTypeServitudeTooltip() + '">(?)</span>';
	sist.isPossible = function(actor,target) {
		var flagPossible = false;
		// Target is candidate, actor and target have no special relationship, actor has no submissive, target has no dominant,
		// special relationships are allowed
		if ( (gSettings().servitudeRelationships == "enable") && ( gC(target).type == "candidate" ) &&
			( gRelTypeAb(actor,target) == null ) && ( gC(target).domChar == null )
		  && ( gC(actor).subChars.length < 1 ) && ( State.variables.settings.relationshipTypesAllowed ) ) {
			flagPossible = true;
		}
		return flagPossible;
	}
	
	sist.isSuccessful = function(actor,target) {
		var result = false;
		var stringResult = "";
		var secondStringResult = "";
		
		var baseDifficulty = -10;
		var targetMoodFactor = gC(target).mood.submissive * -0.6 + gC(target).mood.dominant * 0.4 + gC(target).mood.intimate * 0.1
							 + gC(target).mood.aroused * 0.4 + gC(target).mood.bored * -0.4 + gC(target).mood.angry * -0.4;
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 4 + rLvlAbt(target,actor,"sexualTension") * 10
							 + rLvlAbt(target,actor,"submission") * -5 + rLvlAbt(target,actor,"domination") * 10
							 + rLvlAbt(target,actor,"enmity") * 5 + rLvlAbt(target,actor,"rivalry") * 5;
							 
		var semifinalValue = targetMoodFactor + relationshipFactor;
		var sfvTenth = semifinalValue * 0.1;
		var diceThrow = luckedDiceThrow(gC(actor).luck.getValue());
		var luckFactor = (sfvTenth * 2 * diceThrow) - sfvTenth;
		
		var finalValue = semifinalValue + luckFactor;
		if ( finalValue >= baseDifficulty ) { result = true; }
		stringResult += " Mood: " + targetMoodFactor.toFixed(2) + ", Relationship: " + relationshipFactor.toFixed(2) + ", Luck: " + luckFactor.toFixed(2)
					  + " -> Result: " + finalValue.toFixed(2) + " VS Difficulty: " + baseDifficulty;
		
		secondStringResult = gC(actor).getFormattedName() + " invited " + gC(target).getFormattedName() + " to become " + gC(target).posPr + " servant and " + gC(target).perPr;
		if ( result ) { secondStringResult += gC(target).perPr + " accepted."; }
		else 		  { secondStringResult += gC(target).perPr + " refused."; }
		
		return [result,stringResult,secondStringResult];	
	}
	sist.getFailMessage = function(actor,target) {
		var message = firstToCap(gC(target).perPr) + " refused. " + gC(target).formattedName + " is growing angry.";
		return message;
	}
	sist.getFailEffect = function(actor,target) {
		gC(target).mood.angry += 10;
		if ( gC(target).mood.angry > 100 ) {
			gC(target).mood.angry = 100;
		}
	}
	sist.getSuccessMessage = function(actor,target) {
		var message = firstToCap(gC(target).perPr) + " agreed. " + gC(target).formattedName + " will now expect you to serve " + gC(target).comPr + ".";
		return message;
	}
	sist.getSuccessEffect = function(actor,target) {
		if ( actor == "chPlayerCharacter" ) {
			State.variables.sisSpecifics.flagSissEnd = true;
			
			var bText = "<<l" + "ink [[Continue|Social Interactions]]>><<s" + "cript>>\n";
			bText    += "createRelTypeServitudeSub('" + actor + "','" + target + "',3);\n";
			bText	 += "createRelTypeServitudeDom('" + target + "','" + actor + "',3);\n";
			bText	 += "State.variables.sisSpecifics.flagSissEnd = false;\n";
			bText	 += "<</s" + "cript>><</l" + "ink>>";
			
			State.variables.sisSpecifics.formatChoicesText();
			
			State.variables.sisSpecifics.continueButton = bText;
		} else {
			genericSistEffects(getCharGroup(actor),getCharGroup(target));
			sistEgalitarianSexEffects([actor],[target]);
		}
	}
	sist.askToPlayer = function(actor,target,sisKey) {
		var promptText = gC(actor).getFormattedName() + " wants to initiate a servitude relationship with you as " + gC(actor).posPr + " master.\n\n"
					   + this.getButtonPlayerAccepts(actor);
		State.variables.compass.sisList[sisKey].setSisPlayerPrompt(promptText,"default");
	}
	sist.getButtonPlayerAccepts = function(actor) {
		var bText = "<<l" + "ink [[Accept|Social Interactions]]>><<s" + "cript>>\n";
		bText	 += "createSistOfferServitudeAsServant.getSuccessEffect('" + actor + "','chPlayerCharacter');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	return sist;
}


// Constructors, serializers, etc.
sisTopic.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
sisTopic.prototype.clone = function () {
	return (new sisTopic())._init(this);
};
sisTopic.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new sisTopic())._init($ReviveData$)', ownData);
};

////////// SIS Topics Database //////////

State.variables.sistDB = new pseudoList();
State.variables.sistDB = [
	// Offer sex
	createSistEgalitarianSex(),
	createSistSubmissiveSex(),
	createSistDominantSex(),
	// Offer relationships
	createSistOfferServitudeAsMaster(),
	createSistOfferServitudeAsServant()
];

/*
window.sistDB = function() {
}

// Constructors, serializers, etc.
sistDB.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
sistDB.prototype.clone = function () {
	return (new sistDB())._init(this);
};
sistDB.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new sistDB())._init($ReviveData$)', ownData);
};
*/

