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
		for ( var sT of setup.sistTypes ) {
			var sist = setup.sistDB[sT];
			if ( sist.isPossible("chPlayerCharacter",this.playerTarget) ) {
				this.choicesText += this.getButtonTopicChoice(sist,("setup.sistDB['" + sT + "']")) + sist.subtitle + "\n";
			}
		}
		/*
		for ( var sist of setup.sistDB ) {
			if ( sist.isPossible("chPlayerCharacter",this.playerTarget) ) {
				this.choicesText += this.getButtonTopicChoice(sist,("setup.sistDB[" + i + "]")) + sist.subtitle + "\n";
			}
			i++;
		}
		*/
	}
	this.getButtonTopicChoice = function(sisTopic,sisTopicCaller) {
		var bText = "";
		var socialdriveCost = sisTopic.getSocialdriveOfferCost("chPlayerCharacter",this.playerTarget);
		if ( gC("chPlayerCharacter").socialdrive.current >= socialdriveCost ) {
			bText = "<<l" + "ink [[" + sisTopic.title + "|Social Interactions Specifics]]>><<s" + "cript>>";
			bText 	 += "State.variables.sisSpecifics.processTopicResult('chPlayerCharacter','" + this.playerTarget + "'," + sisTopicCaller + ");\n";
			bText	 += "<</s" + "cript>><</l" + "ink>> (Cost: " + colorText(socialdriveCost,"khaki") + ") ";
		} else {
			bText = colorText("Locked (not enough social drive): ","firebrick") + sisTopic.title;
		}
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
		var rejectionCostText = "";
		// Apply social drive cost
		gC(actor).socialdrive.changeValue(-sisTopic.getSocialdriveOfferCost(actor,target));
		// Check if successful
		var desire = sisTopic.getDesire(actor,target);
		var isSuccessful = sisTopic.isSuccessful(actor,target);
		var willpowerRejectCost = sisTopic.getWillpowerRejectCost(actor,target);
		var effect = 0;
		if ( isSuccessful[0] == true ) { // Offer accepted
			resultsText = sisTopic.getSuccessMessage(actor,target);
			effect = sisTopic.getSuccessEffect(actor,target);
		}
		else if ( willpowerRejectCost > gC(target).willpower.current ) { // Forced to accept offer due to lack of willpower
			resultsText = "Not enough " + colorText("willpower","darkslateblue"); + " to reject! " + gC(target).getFormattedName() + " resented that. " + sisTopic.getSuccessMessage(actor,target);
			gC(target).relations[actor].enmity.stv += 10;
			gC(target).relations[actor].rivalry.stv += 10;
			effect = sisTopic.getSuccessEffect(actor,target);
		}
		else { // Rejects offer, may take willpower damage
			resultsText = sisTopic.getFailMessage(actor,target);
			effect = sisTopic.getFailEffect(actor,target);
			// Willpower rejecting cost
			gC(target).willpower.current -= willpowerRejectCost;
			if ( willpowerRejectCost > 0 ) {
				rejectionCostText = "\n" + gC(target).getFormattedName() + " spent " + colorText((willpowerRejectCost.toFixed(2) + " willpower "),"darkslateblue") + "to reject the offer.";
			}
		}
		resultsText += "\n" + desire[1] + "\n" + isSuccessful[1] + rejectionCostText; // isSuccessful[1] returns a string detailing why that was the result
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
	
	this.getDesire = function(actor,target) {
		// Returns a 2-elements array. First element is the total desire. Second element is a string detailing desire calculation.
		return [0,"0 desire as default."];
	}
	this.getSocialdriveOfferCost = function(actor,target) {
		return 10;
	}
	this.getWillpowerRejectCost = function(actor,target) {
		var cost = 0;
		var desire = this.getDesire(actor,target)[0];
		if ( desire > 20 ) {
			cost = desire - 20;
		}
		return cost;
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
	sist.sT = setup.sistType.egalitarianSex;
	sist.isPossible = function(actor,target) {
		var flagPossible = false;
		if ( isLewdingPossible(actor,target) && ( gC(target).type == "candidate" ) && ( State.variables.compass.findFirstSisIdInvolvingCharacter(actor) != -1 ) && ((gC(target).followingTo == "") || (gC(target).followingTo == actor) ) ) {
			if ( getSisCharIsIn(actor).getValidProposedCharacters(actor).includes(target) ) {
				flagPossible = true;
			}
		}
		return flagPossible;
	}
	
	sist.getDesire = function(actor,target) {
		var desire = 0;
		var baseDifficulty = -10;
		var moodFactor = gC(target).mood.flirty * 0.05 + gC(target).mood.aroused * 0.1 - gC(target).mood.angry * 0.3 - gC(target).mood.bored * 0.3
					   +  gC(target).mood.submissive * 0.05 - gC(target).mood.dominant * 0.1;
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 4 + rLvlAbt(target,actor,"sexualTension") * 8
							 + rLvlAbt(target,actor,"submission") * 4 + rLvlAbt(target,actor,"domination") * -8
							 + rLvlAbt(target,actor,"enmity") * -8;
		var statsFactor = gCstat(actor,"charisma") - gCstat(target,"will");
		var hadSexFactor = gC(target).daysWithoutSex * 3 - gC(target).sexScenesToday * 3;
		var missingLustFactor = (1 - getBarPercentage(target,"lust")) * 50;
		desire = baseDifficulty + moodFactor + relationshipFactor + statsFactor + missingLustFactor + hadSexFactor;
		var desireString = "Desire: Base difficulty (" + baseDifficulty.toFixed(2) + ") + Mood (" + moodFactor.toFixed(2) + ") + Relationship ("
						 + relationshipFactor.toFixed(2) + ") + Stats (" + statsFactor.toFixed(2) + ") + Lust (" + missingLustFactor.toFixed(2) + ") + Sex life (" + hadSexFactor.toFixed(2) + ") = Total (" + desire.toFixed(2) + ").";
		
		return [desire,desireString];
	}
	
	sist.doesCharJoinGroup = function(charKey,actor,charList) {
		var result = false;
		var target = charKey;
		var relType = gRelTypeAb(target,actor);
		
		var baseDifficulty = -10; // -10
		var targetMoodFactor = gC(target).mood.flirty * 0.1 + gC(target).mood.intimate * 0.1 + gC(target).mood.aroused * 0.2
							 + gC(target).mood.angry * -0.3 + gC(target).mood.bored * (-0.3) + gC(target).mood.submissive * 0.1
							 + gC(target).mood.dominant * -0.2;
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 1 + rLvlAbt(target,actor,"sexualTension") * 2
							 + rLvlAbt(target,actor,"submission") * 2 + rLvlAbt(target,actor,"domination") * -2
							 + rLvlAbt(target,actor,"enmity") * -3 + rLvlAbt(target,actor,"rivalry") * -1;
		var drivesFactor = gC(target).dLove.level * 2 + gC(target).dPleasure.level * 4 - gC(target).dImprovement.level * 3 - gC(target).dDomination.level * 3;
		var powerGrowthFactor = -((quantifyCharacterStats(target) - 110) / 9);
		if ( powerGrowthFactor < 0 ) { powerGrowthFactor = 0; }
		var simulationState = 0;
		if ( State.variables.simCycPar.templeDayPeriod == "training" ) {
			simulationState = -20;
		}
		var missionFactor = 0;
		if ( gC(target).mission == "haveSex" ) { missionFactor += 10; }
		else if ( gC(target).mission == "haveDomSex" ) { missionFactor -= 5; }
		
		var semifinalValue = targetMoodFactor + relationshipFactor + baseDifficulty + simulationState + drivesFactor + missionFactor + powerGrowthFactor;
		var sfvTenth = semifinalValue * 0.1;
		var diceThrow = luckedDiceThrow(gC(actor).luck.getValue());
		var luckFactor = (sfvTenth * 2 * diceThrow) - sfvTenth;
		
		var finalValue = semifinalValue + luckFactor;
		
		if ( finalValue >= 0 ) { result = true; }
		
		return result;
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
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 1 + rLvlAbt(target,actor,"sexualTension") * 2
							 + rLvlAbt(target,actor,"submission") * 2 + rLvlAbt(target,actor,"domination") * -2
							 + rLvlAbt(target,actor,"enmity") * -3 + rLvlAbt(target,actor,"rivalry") * -1
		var willpowerCostFactor = this.getWillpowerRejectCost(actor,target) / 2;
		var drivesFactor = gC(target).dLove.level * 2 + gC(target).dPleasure.level * 4 - gC(target).dImprovement.level * 3 - gC(target).dDomination.level * 3;
		var powerGrowthFactor = -((quantifyCharacterStats(target) - 110) / 9);
		if ( powerGrowthFactor < 0 ) { powerGrowthFactor = 0; }
		var simulationState = 0;
		if ( State.variables.simCycPar.templeDayPeriod == "training" ) {
			simulationState = -20;
		}
		if ( returnCharsUnlockedGenitals(target).length == 0 ) {
			simulationState -= 20;
		}
		var missionFactor = 0;
		if ( gC(target).mission == "haveSex" ) { missionFactor += 10; }
		else if ( gC(target).mission == "haveDomSex" ) { missionFactor -= 5; }
		
		var semifinalValue = targetMoodFactor + relationshipFactor + baseDifficulty + simulationState + willpowerCostFactor + drivesFactor + missionFactor + powerGrowthFactor;
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
					  + ", Others: " + simulationState + ", Luck: " + luckFactor.toFixed(2) + ", Drives: " + drivesFactor.toFixed(2) + ", Desire: " + willpowerCostFactor.toFixed(2) + ", Intentions: " + missionFactor.toFixed(2) + ", Growth: " + powerGrowthFactor.toFixed(2) + " - Result: " + finalValue.toFixed(2);
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
		var sisId = State.variables.compass.findFirstSisIdInvolvingCharacter(actor);
		var sisCharList = State.variables.compass.sisList[sisId].charList;
		var joinedGroup = getCharGroup(actor).concat(getCharGroup(target));
		var additionalChars = recruitCharsInSis(sisCharList,actor,joinedGroup,this.doesCharJoinGroup);
		var message = "";
		if ( additionalChars.length > 0 ) {
			var stringedAddChars = [];
			for ( var cK of additionalChars ) {
				stringedAddChars.push(gC(cK).getFormattedName())
			}
			message = firstToCap(gC(target).perPr) + " agreed, and " + stringArrayToText(stringedAddChars) + " decided to join as well. You take them to a secluded place...";
		} else {
			message = firstToCap(gC(target).perPr) + " agreed. You take " + gC(target).formattedName + " to a secluded place...";
		}
		return message;
	}
	sist.getSuccessEffect = function(actor,target) {
			
		var sisId = State.variables.compass.findFirstSisIdInvolvingCharacter(actor);
		var sisCharList = State.variables.compass.sisList[sisId].charList;
		var joinedGroup = getCharGroup(actor).concat(getCharGroup(target));
		var additionalChars = recruitCharsInSis(sisCharList,actor,joinedGroup,this.doesCharJoinGroup);
		
		if ( actor == "chPlayerCharacter" ) {
			State.variables.sisSpecifics.flagSissEnd = true;
			var addCharsString = [];
			for ( var cK of additionalChars ) { addCharsString.push("'" + cK + "'"); }
			
			var bText = "<<l" + "ink [[Continue|Scene]]>><<s" + "cript>>\n";
			bText	 += "genericSistEffectsPlusPc(['" + actor + "'],['" + target + "'].concat([" + addCharsString + "]),sistEgalitarianSexEffects);\n";
			bText	 += "<</s" + "cript>><</l" + "ink>>";
			
			State.variables.sisSpecifics.continueButton = bText;
		} else {
			var playerInAdditionalGroup = false;
			var playerMustBePrompted = false;
			
			if ( target != "chPlayerCharacter" && gC("chPlayerCharacter").followingTo == "" && sisCharList.includes("chPlayerCharacter") ) {
				playerMustBePrompted = true;
			} else  {
				for ( var cK of additionalChars ) {
					if ( gC(cK).followedBy.includes("chPlayerCharacter") ) {
						playerInAdditionalGroup = true;
					}
				}
			}
			
			if ( playerMustBePrompted ) {
				// Prompt Text:
				// Accept button: Ega sex starts, add chars get called, player group gets added
				// Reject button: Ega sex starts, add chars get called
				var addCharsString = [];
				for ( var cK of additionalChars ) { addCharsString.push("'" + cK + "'"); }
				
				var promptText = gC(actor).getFormattedName() + " invited " + gC(target).getFormattedName() + " to have sex and " + gC(target).perPr + " accepted. Would you like to join?\n"
							   + "<<l" + "ink [[Join|Scene]]>><<s" + "cript>>\n" // Join button
							   + "genericSistEffects(getCharGroup('" + actor + "'),getCharGroup('" + target + "').concat([" + addCharsString + "]).concat(getCharGroup('chPlayerCharacter')),sistEgalitarianSexEffects);\n"
							   + "sistEgalitarianSexEffects(['" + actor + "'],['" + target + "'],getCharGroup('chPlayerCharacter').concat([" + addCharsString + "]));\n"
							   + "<</s" + "cript>><</l" + "ink>>\n"
							   + "<<l" + "ink [[Refuse|Social Interactions]]>><<s" + "cript>>\n" // Reject button
							   + "genericSistEffects(getCharGroup('" + actor + "'),getCharGroup('" + target + "').concat([" + addCharsString + "]),sistEgalitarianSexEffects);\n"
							   + "sistEgalitarianSexEffects(['" + actor + "'],['" + target + "'],[" + addCharsString + "]);\n"
							   + "<</s" + "cript>><</l" + "ink>>\n";
				State.variables.sisPlayerInfo.playerPrompt = promptText;
			} else {
				if ( playerInAdditionalGroup ) {
					var promptText = gC(gC("chPlayerCharacter").followingTo).getFormattedName() + " decided to join " + gC(actor).getFormattedName() + " and " + gC(target).getFormattedName() + " for sex and is dragging you along.\n[[Continue|Scene]]"; 
					State.variables.sisPlayerInfo.playerPrompt = promptText;
				}
				
				genericSistEffects(getCharGroup(actor),getCharGroup(target).concat(additionalChars));
				sistEgalitarianSexEffects([actor],[target],additionalChars);
			}
		}
	}
	sist.askToPlayer = function(actor,target,sisKey) {
		var promptText = gC(actor).getFormattedName() + " wants to have sex with you on equal conditions.\n" + this.getDesire(actor,target)[1] + "\n\n"
					   + this.getButtonPlayerAccepts(actor);
		var promptMode = "default";
		if ( gRelTypeAb("chPlayerCharacter",actor) ) {
			if ( gRelTypeAb("chPlayerCharacter",actor).forcedToSex ) {
				promptMode = "relTypeForcesToAccept";
			}
		}
		State.variables.compass.sisList[sisKey].setSisPlayerPrompt(promptText,promptMode,this.getWillpowerRejectCost(actor,target),actor,target,this.sT);
	}
	sist.getButtonPlayerAccepts = function(actor) {
		// Get extra joining chars
		// Add extra joining chars to description
		// Add extra joining chars to script
		var sisId = State.variables.compass.findFirstSisIdInvolvingCharacter(actor);
		var sisCharList = State.variables.compass.sisList[sisId].charList;
		var joinedGroup = getCharGroup(actor).concat(getCharGroup("chPlayerCharacter"));
		var additionalChars = recruitCharsInSis(sisCharList,actor,joinedGroup,this.doesCharJoinGroup);
		
		var addCharsString = [];
		for ( var cK of additionalChars ) { addCharsString.push("'" + cK + "'"); }
		
		var bText = "<<l" + "ink [[Accept|Scene]]>><<s" + "cript>>\n";
		bText	 += "getSisCharIsIn('chPlayerCharacter').endSisPlayerPrompt();\n";
		bText	 += "genericSistEffectsPlusPc(['" + actor + "'],['chPlayerCharacter'].concat([" + addCharsString + "]),sistEgalitarianSexEffects);\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		
		if ( additionalChars.length > 0 ) {
			var stringedAddChars = [];
			for ( var cK of additionalChars ) {
				stringedAddChars.push(gC(cK).getFormattedName())
			}
			bText += " " + stringArrayToText(stringedAddChars) + " will also join."
		}
		
		return bText;
	}
	return sist;
}

window.sistEgalitarianSexEffects = function(actors,targets,additionalChars) {
	// Dirty fixes
	if ( additionalChars == undefined ) { additionalChars = []; }
	for ( var charKey of targets ) {
		if ( getCharGroup(targets[0]).includes(charKey) == false ) {
			if ( additionalChars.includes(charKey) == false ) {
				additionalChars.push(charKey);
			}
		}
	}
	//	//  //	//
	var flagPlayerIsInvolved = false;
	if ( actors.concat(targets).concat(additionalChars).includes("chPlayerCharacter") || gC(actors[0]).followedBy.includes("chPlayerCharacter") || gC(targets[0]).followedBy.includes("chPlayerCharacter") ) { flagPlayerIsInvolved = true; }
	var actor = actors[0];
	var target = targets[0];
	
	var associatedChars = [];
	
	// Relocate actor and target
	if ( gC(actor).getRefugeRoomInMap() != "none" ) {
		State.variables.compass.moveCharsToRoom(getCharGroup(actor).concat(getCharGroup(target)).concat(additionalChars),gC(actor).getRefugeRoomInMap());
	}
	
	// Start appropiate event
	State.variables.compass.characterEventEndsPrematurely(target);
	State.variables.compass.characterEventEndsPrematurely(actor);
	var eventCharList = removeDuplicatesFromList(getCharGroup(actor).concat(getCharGroup(target)).concat(additionalChars));
		// Set "noLead" scene flag to appropriate characters
	for ( var charKey of eventCharList ) {
		if ( charKey != actor && charKey != target ) {
			if ( eventCharList.includes(gC(charKey).domChar) ) {
				addSceneTagToChar("noLead",charKey);
			}
		}
	}
	eventToPile(createSystemEventStandardSexScene(eventCharList));
	if ( flagPlayerIsInvolved ) {
		State.variables.compass.pushAllTimeToAdvance();
	}
	
	// Start Sex Scene
	if ( flagPlayerIsInvolved ) {
		if ( target == "chPlayerCharacter" ) {
			target = actor;
			actor = "chPlayerCharacter";
		}
		if ( getCharGroup(actor).includes(target) ) {
			State.variables.sc.startScene(
		"ss","dynamic",getCharGroup(actor),additionalChars,"The water flows quietly.",endConditionTurns,gSettings().stdSxScDur,"Scene Results");
		} else {
			State.variables.sc.startScene(
		"ss","dynamic",getCharGroup(actor),getCharGroup(target).concat(additionalChars),"The water flows quietly.",endConditionTurns,gSettings().stdSxScDur,"Scene Results");
		}
		State.variables.sc.endSceneScript = processGenericSexSceneEffects;
		
		for ( var charKey of getCharGroup(actor).concat(getCharGroup(target)).concat(additionalChars) ) {
			if ( charKey != "chPlayerCharacter" ) {
				gC(charKey).aiAlgorythm = createAiWeightedMissionsByTaste();
				gC(charKey).aiAlgorythm.setRoleEqualFooting();
			}
		}
	} else {
		if ( getCharGroup(actor).includes(target) ) {
			State.variables.sc.startScene(
		"ss","dynamic",getCharGroup(actor),additionalChars,"The water flows quietly.",endConditionTurns,gSettings().stdSxScDur,"Scene Results");
		} else {
			State.variables.sc.startScene(
		"ss","dynamic",getCharGroup(actor),getCharGroup(target).concat(additionalChars),"The water flows quietly.",endConditionTurns,gSettings().stdSxScDur,"Scene Results");
		}
		State.variables.sc.endSceneScript = processGenericSexSceneEffects;
		
		for ( var charKey of getCharGroup(actor).concat(getCharGroup(target)).concat(additionalChars) ) {
			if ( charKey != "chPlayerCharacter" ) {
				gC(charKey).aiAlgorythm = createAiWeightedMissionsByTaste();
				gC(charKey).aiAlgorythm.setRoleEqualFooting();
			}
		}
		
		State.variables.sc.autoResolveScene();
	}
	
	if ( flagPlayerIsInvolved ) {
		State.variables.sc.formatScenePassage();
	}
}

window.createSistExcludingEgalitarianSex = function() {
	var sist = new sisTopic("Invite to have sex (Equal terms, exclusive)");
	sist.subtitle += '<span title="Unassociated third characters on this conversation will not be invited.">^^(?)^^</span>';
	sist.sT = setup.sistType.egalitarianExcludingSex;
	sist.isPossible = function(actor,target) {
		var flagPossible = false;
		if ( isLewdingPossible(actor,target) && ( gC(target).type == "candidate" ) && ( State.variables.compass.findFirstSisIdInvolvingCharacter(actor) != -1 ) && ((gC(target).followingTo == "") || (gC(target).followingTo == actor) ) ) {
			if ( getSisCharIsIn(actor).getValidProposedCharacters(actor).includes(target) ) {
				var independentChars = 0;
				for ( var charKey of getSisCharIsIn(actor).charList ) {
					if ( gC(charKey).followingTo == "" ) {
						independentChars++;
					}
				}
				if ( independentChars > 2 ) {
					flagPossible = true;
				}
			}
		}
		return flagPossible;
	}
	
	sist.getDesire = function(actor,target) {
		var desire = 0;
		var baseDifficulty = -10;
		var moodFactor = gC(target).mood.flirty * 0.05 + gC(target).mood.aroused * 0.1 - gC(target).mood.angry * 0.3 - gC(target).mood.bored * 0.3
					   +  gC(target).mood.submissive * 0.05 - gC(target).mood.dominant * 0.1;
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 4 + rLvlAbt(target,actor,"sexualTension") * 8
							 + rLvlAbt(target,actor,"submission") * 4 + rLvlAbt(target,actor,"domination") * -8
							 + rLvlAbt(target,actor,"enmity") * -8;
		var statsFactor = gCstat(actor,"charisma") - gCstat(target,"will");
		var hadSexFactor = gC(target).daysWithoutSex * 3 - gC(target).sexScenesToday * 3;
		var missingLustFactor = (1 - getBarPercentage(target,"lust")) * 50;
		desire = baseDifficulty + moodFactor + relationshipFactor + statsFactor + missingLustFactor + hadSexFactor;
		var desireString = "Desire: Base difficulty (" + baseDifficulty.toFixed(2) + ") + Mood (" + moodFactor.toFixed(2) + ") + Relationship ("
						 + relationshipFactor.toFixed(2) + ") + Stats (" + statsFactor.toFixed(2) + ") + Lust (" + missingLustFactor.toFixed(2) + ") + Sex life (" + hadSexFactor.toFixed(2) + ") = Total (" + desire.toFixed(2) + ").";
		
		return [desire,desireString];
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
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 1 + rLvlAbt(target,actor,"sexualTension") * 2
							 + rLvlAbt(target,actor,"submission") * 2 + rLvlAbt(target,actor,"domination") * -2
							 + rLvlAbt(target,actor,"enmity") * -3 + rLvlAbt(target,actor,"rivalry") * -1
		var willpowerCostFactor = this.getWillpowerRejectCost(actor,target) / 2;
		var drivesFactor = gC(target).dLove.level * 2 + gC(target).dPleasure.level * 4 - gC(target).dImprovement.level * 3 - gC(target).dDomination.level * 3;
		var powerGrowthFactor = -((quantifyCharacterStats(target) - 110) / 9);
		if ( powerGrowthFactor < 0 ) { powerGrowthFactor = 0; }
		var simulationState = 0;
		if ( State.variables.simCycPar.templeDayPeriod == "training" ) {
			simulationState = -20;
		}
		if ( returnCharsUnlockedGenitals(target).length == 0 ) {
			simulationState -= 20;
		}
		var missionFactor = 0;
		if ( gC(target).mission == "haveSex" ) { missionFactor += 10; }
		else if ( gC(target).mission == "haveDomSex" ) { missionFactor -= 5; }
		
		var semifinalValue = targetMoodFactor + relationshipFactor + baseDifficulty + simulationState + willpowerCostFactor + drivesFactor + missionFactor + powerGrowthFactor;
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
					  + ", Others: " + simulationState + ", Luck: " + luckFactor.toFixed(2) + ", Drives: " + drivesFactor.toFixed(2) + ", Desire: " + willpowerCostFactor.toFixed(2) + ", Intentions: " + missionFactor.toFixed(2) + ", Growth: " + powerGrowthFactor.toFixed(2) + " - Result: " + finalValue.toFixed(2);
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
			bText	 += "genericSistEffectsPlusPc(['" + actor + "'],['" + target + "'],sistExcludingEgalitarianSexEffects);\n";
			bText	 += "<</s" + "cript>><</l" + "ink>>";
			
			State.variables.sisSpecifics.continueButton = bText;
		} else {
			genericSistEffects(getCharGroup(actor),getCharGroup(target));
			sistExcludingEgalitarianSexEffects([actor],[target]);
		}
	}
	sist.askToPlayer = function(actor,target,sisKey) {
		var promptText = gC(actor).getFormattedName() + " wants to have sex with you on equal conditions.\n" + this.getDesire(actor,target)[1] + "\n\n"
					   + this.getButtonPlayerAccepts(actor);
		var promptMode = "default";
		if ( gRelTypeAb("chPlayerCharacter",actor) ) {
			if ( gRelTypeAb("chPlayerCharacter",actor).forcedToSex ) {
				promptMode = "relTypeForcesToAccept";
			}
		}
		State.variables.compass.sisList[sisKey].setSisPlayerPrompt(promptText,promptMode,this.getWillpowerRejectCost(actor,target),actor,target,this.sT);
	}
	sist.getButtonPlayerAccepts = function(actor) {
		var bText = "<<l" + "ink [[Accept|Scene]]>><<s" + "cript>>\n";
		bText	 += "getSisCharIsIn('chPlayerCharacter').endSisPlayerPrompt();\n";
		bText	 += "genericSistEffectsPlusPc(['" + actor + "'],['chPlayerCharacter'],sistExcludingEgalitarianSexEffects);\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	return sist;
}

window.sistExcludingEgalitarianSexEffects = function(actors,targets) {
	var flagPlayerIsInvolved = false;
	if ( actors.concat(targets).includes("chPlayerCharacter") || gC(actors[0]).followedBy.includes("chPlayerCharacter") || gC(targets[0]).followedBy.includes("chPlayerCharacter") ) { flagPlayerIsInvolved = true; }
	var actor = actors[0];
	var target = targets[0];
	
	// Relocate actor and target
	if ( gC(actor).getRefugeRoomInMap() != "none" ) {
		State.variables.compass.moveCharsToRoom(getCharGroup(actor).concat(getCharGroup(target)),gC(actor).getRefugeRoomInMap());
	}
	
	// Start appropiate event
	State.variables.compass.characterEventEndsPrematurely(target);
	State.variables.compass.characterEventEndsPrematurely(actor);
	var eventCharList = removeDuplicatesFromList(getCharGroup(actor).concat(getCharGroup(target)));
		// Set "noLead" scene flag to appropriate characters
	for ( var charKey of eventCharList ) {
		if ( charKey != actor && charKey != target ) {
			if ( eventCharList.includes(gC(charKey).domChar) ) {
				addSceneTagToChar("noLead",charKey);
			}
		}
	}
	eventToPile(createSystemEventStandardSexScene(eventCharList));
	if ( flagPlayerIsInvolved ) {
		State.variables.compass.pushAllTimeToAdvance();
	}
	
	// Start Sex Scene
	if ( flagPlayerIsInvolved ) {
		if ( target == "chPlayerCharacter" ) {
			target = actor;
			actor = "chPlayerCharacter";
		}
		if ( getCharGroup(actor).includes(target) ) {
			State.variables.sc.startScene(
		"ss","dynamic",getCharGroup(actor),[],"The water flows quietly.",endConditionTurns,gSettings().stdSxScDur,"Scene Results");
		} else {
			State.variables.sc.startScene(
		"ss","dynamic",getCharGroup(actor),getCharGroup(target),"The water flows quietly.",endConditionTurns,gSettings().stdSxScDur,"Scene Results");
		}
		State.variables.sc.endSceneScript = processGenericSexSceneEffects;
		
		for ( var charKey of getCharGroup(actor).concat(getCharGroup(target)) ) {
			if ( charKey != "chPlayerCharacter" ) {
				gC(charKey).aiAlgorythm = createAiWeightedMissionsByTaste();
				gC(charKey).aiAlgorythm.setRoleEqualFooting();
			}
		}
	} else {
		if ( getCharGroup(actor).includes(target) ) {
			State.variables.sc.startScene(
		"ss","dynamic",getCharGroup(actor),[],"The water flows quietly.",endConditionTurns,gSettings().stdSxScDur,"Scene Results");
		} else {
			State.variables.sc.startScene(
		"ss","dynamic",getCharGroup(actor),getCharGroup(target),"The water flows quietly.",endConditionTurns,gSettings().stdSxScDur,"Scene Results");
		}
		State.variables.sc.endSceneScript = processGenericSexSceneEffects;
		
		for ( var charKey of getCharGroup(actor).concat(getCharGroup(target)) ) {
			if ( charKey != "chPlayerCharacter" ) {
				gC(charKey).aiAlgorythm = createAiWeightedMissionsByTaste();
				gC(charKey).aiAlgorythm.setRoleEqualFooting();
			}
		}
		
		State.variables.sc.autoResolveScene();
	}
	
	if ( flagPlayerIsInvolved ) {
		State.variables.sc.formatScenePassage();
	}
}

window.createSistSubmissiveSex = function() {
	var sist = new sisTopic("Invite to have sex (Player submissive)");
	sist.sT = setup.sistType.submissiveSex;
	sist.isPossible = function(actor,target) {
		var flagPossible = false;
		if ( isLewdingPossible(actor,target) && ( gC(target).type == "candidate" ) && ( State.variables.compass.findFirstSisIdInvolvingCharacter(actor) != -1 ) && ((gC(target).followingTo == "") || (gC(target).followingTo == actor) ) ) {
			if ( getSisCharIsIn(actor).getValidProposedCharacters(actor).includes(target) ) {
				flagPossible = true;
			}
		}
		return flagPossible;
	}
	
	sist.getDesire = function(actor,target) {
		var desire = 0;
		var baseDifficulty = 0;
		var moodFactor = gC(target).mood.flirty * 0.05 + gC(target).mood.aroused * 0.1 - gC(target).mood.angry * 0.3 - gC(target).mood.bored * 0.3
					   -  gC(target).mood.submissive * 0.05 + gC(target).mood.dominant * 0.05;
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 4 + rLvlAbt(target,actor,"sexualTension") * 8
							 + rLvlAbt(target,actor,"submission") * -4 + rLvlAbt(target,actor,"domination") * 4
							 + rLvlAbt(target,actor,"rivalry") * 4;
		var statsFactor = gCstat(actor,"charisma") - gCstat(target,"will");
		var hadSexFactor = gC(target).daysWithoutSex * 3 - gC(target).sexScenesToday * 3;
		var missingLustFactor = (1 - getBarPercentage(target,"lust")) * 50;
		desire = baseDifficulty + moodFactor + relationshipFactor + statsFactor + missingLustFactor + hadSexFactor;
		var desireString = "Desire: Base difficulty (" + baseDifficulty.toFixed(2) + ") + Mood (" + moodFactor.toFixed(2) + ") + Relationship ("
						 + relationshipFactor.toFixed(2) + ") + Stats (" + statsFactor.toFixed(2) + ") + Lust (" + missingLustFactor.toFixed(2) + ") + Sex life (" + hadSexFactor.toFixed(2) + ") = Total (" + desire.toFixed(2) + ").";
		
		return [desire,desireString];
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
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 1 + rLvlAbt(target,actor,"sexualTension") * 3
							 + rLvlAbt(target,actor,"submission") * -1 + rLvlAbt(target,actor,"domination") * 1
							 + rLvlAbt(target,actor,"enmity") * -2 + rLvlAbt(target,actor,"rivalry") * 2;
		var simulationState = 0;
		if ( returnCharsUnlockedGenitals(target).length == 0 ) {
			simulationState -= 20;
		}
		var willpowerCostFactor = this.getWillpowerRejectCost(actor,target) / 2;
		var drivesFactor = gC(target).dPleasure.level * 4 + gC(target).dDomination.level * 2 + gC(target).dAmbition.level * 2 - gC(target).dImprovement.level * 6;
		if ( State.variables.simCycPar.templeDayPeriod == "training" ) {
			simulationState = -20;
		}
		var powerGrowthFactor = -((quantifyCharacterStats(target) - 110) / 9);
		if ( powerGrowthFactor < 0 ) { powerGrowthFactor = 0; }
		var missionFactor = 0;
		if ( gC(target).mission == "haveSex" ) { missionFactor += 10; }
		else if ( gC(target).mission == "haveDomSex" ) { missionFactor += 20; }
		
		var semifinalValue = targetMoodFactor + relationshipFactor + baseDifficulty + simulationState + willpowerCostFactor + drivesFactor + missionFactor + powerGrowthFactor;
		var sfvTenth = semifinalValue * 0.1;
		var diceThrow = luckedDiceThrow(gC(actor).luck.getValue());
		var luckFactor = (sfvTenth * 2 * diceThrow) - sfvTenth;
		
		var finalValue = semifinalValue + luckFactor;
		result = false;
		if ( finalValue >= 0 ) { result = true; }
		stringResult += " Mood: " + targetMoodFactor.toFixed(2) + ", Relationship: " + relationshipFactor.toFixed(2) + ", Base dif.: " + baseDifficulty
					  + ", Others: " + simulationState + ", Luck: " + luckFactor.toFixed(2) + ", Drives: " + drivesFactor.toFixed(2) + ", Desire: " + willpowerCostFactor.toFixed(2) + ", Intentions: " + missionFactor.toFixed(2) + ", Growth: " + powerGrowthFactor.toFixed(2) + " - Result: " + finalValue.toFixed(2);
		}
		
		secondStringResult = gC(actor).getFormattedName() + " invited " + gC(target).getFormattedName() + " to have sex and ";
		if ( result ) { secondStringResult += gC(target).perPr + " accepted."; }
		else 		  { secondStringResult += gC(target).perPr + " refused."; }
					  
		return [result,stringResult,secondStringResult];	
	}
	sist.getFailMessage = function(actor,target) {
		var message = firstToCap(gC(target).perPr) + " refused. " + gC(target).formattedName + " is growing bored. " + gC(actor).getFormattedName() + " felt humilliated and will resent that.";
		return message;
	}
	sist.getFailEffect = function(actor,target) {
		gC(target).mood.bored += 10;
		if ( gC(target).mood.bored > 100 ) {
			gC(target).mood.bored = 100;
		}
		gC(actor).relations[target].enmity.stv += 10;
		gC(actor).relations[target].rivalry.stv += 10;
	}
	sist.getSuccessMessage = function(actor,target) {
		var message = firstToCap(gC(target).perPr) + " agreed. You take " + gC(target).formattedName + " to a secluded place, enjoying the anticipating of submitting...";
		return message;
	}
	sist.getSuccessEffect = function(actor,target) {
		gC(actor).relations[target].submission.stv += 10;
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
		var promptText = gC(actor).getFormattedName() + " wants to have sex with you at the top.\n" + this.getDesire(actor,target)[1] + "\n\n"
					   + this.getButtonPlayerAccepts(actor);
		var promptMode = "default";
		if ( gRelTypeAb("chPlayerCharacter",actor) ) {
			if ( gRelTypeAb("chPlayerCharacter",actor).forcedToSex ) {
				promptMode = "relTypeForcesToAccept";
			}
		}
		State.variables.compass.sisList[sisKey].setSisPlayerPrompt(promptText,promptMode,this.getWillpowerRejectCost(actor,target),actor,target,this.sT);
	}
	sist.getButtonPlayerAccepts = function(actor) {
		var bText = "<<l" + "ink [[Accept|Scene]]>><<s" + "cript>>\n";
		bText	 += "getSisCharIsIn('chPlayerCharacter').endSisPlayerPrompt();\n";
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
		
	// Start appropiate event
	State.variables.compass.characterEventEndsPrematurely(target);
	State.variables.compass.characterEventEndsPrematurely(actor);
	var eventCharList = removeDuplicatesFromList(getCharGroup(actor).concat(getCharGroup(target)));
	eventToPile(createSystemEventStandardSexScene(eventCharList));
	if ( flagPlayerIsInvolved ) {
		State.variables.compass.pushAllTimeToAdvance();
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
		"ss","fixed",getCharGroup(actor),[],"The water flows quietly.",endConditionTurns,gSettings().stdSxScDur,"Scene Results");
		} else {
			State.variables.sc.startScene(
		"ss","fixed",getCharGroup(actor),getCharGroup(target),"The water flows quietly.",endConditionTurns,gSettings().stdSxScDur,"Scene Results");
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
	} else {
		if ( getCharGroup(actor).includes(target) ) {
			State.variables.sc.startScene(
		"ss","fixed",getCharGroup(actor),[],"The water flows quietly.",endConditionTurns,gSettings().stdSxScDur,"Scene Results");
		} else {
			State.variables.sc.startScene(
		"ss","fixed",getCharGroup(actor),getCharGroup(target),"The water flows quietly.",endConditionTurns,gSettings().stdSxScDur,"Scene Results");
		}
		State.variables.sc.endSceneScript = processGenericSexSceneEffects;
		
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
		
		State.variables.sc.autoResolveScene();
	}
	
	if ( flagPlayerIsInvolved ) {
		State.variables.sc.formatScenePassage();
	}
}

window.createSistDominantSex = function() {
	var sist = new sisTopic("Invite to have sex (Player Dominant)");
	sist.sT = setup.sistType.dominantSex;
	sist.isPossible = function(actor,target) {
		var flagPossible = false;
		if ( isLewdingPossible(actor,target) && ( gC(target).type == "candidate" ) && ( State.variables.compass.findFirstSisIdInvolvingCharacter(actor) != -1 ) && ((gC(target).followingTo == "") || (gC(target).followingTo == actor) ) ) {
			if ( getSisCharIsIn(actor).getValidProposedCharacters(actor).includes(target) ) {
				flagPossible = true;
			}
		}
		return flagPossible;
	}
	
	sist.getDesire = function(actor,target) {
		var desire = 0;
		var baseDifficulty = -20;
		var moodFactor = gC(target).mood.flirty * 0.05 + gC(target).mood.aroused * 0.1 - gC(target).mood.angry * 0.3 - gC(target).mood.bored * 0.3
					   +  gC(target).mood.submissive * 0.05 - gC(target).mood.dominant * 0.15;
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 4 + rLvlAbt(target,actor,"sexualTension") * 8
							 + rLvlAbt(target,actor,"submission") * 4 + rLvlAbt(target,actor,"domination") * -12
							 + rLvlAbt(target,actor,"enmity") * -12;
		var statsFactor = gCstat(actor,"charisma") - gCstat(target,"will");
		var hadSexFactor = gC(target).daysWithoutSex * 3 - gC(target).sexScenesToday * 3;
		var missingLustFactor = (1 - getBarPercentage(target,"lust")) * 50;
		desire = baseDifficulty + moodFactor + relationshipFactor + statsFactor + missingLustFactor + hadSexFactor;
		var desireString = "Desire: Base difficulty (" + baseDifficulty.toFixed(2) + ") + Mood (" + moodFactor.toFixed(2) + ") + Relationship ("
						 + relationshipFactor.toFixed(2) + ") + Stats (" + statsFactor.toFixed(2) + ") + Lust (" + missingLustFactor.toFixed(2) + ") + Sex life (" + hadSexFactor.toFixed(2) + ") = Total (" + desire.toFixed(2) + ").";
		
		return [desire,desireString];
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
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 1 + rLvlAbt(target,actor,"sexualTension") * 2
							 + rLvlAbt(target,actor,"submission") * 3 + rLvlAbt(target,actor,"domination") * -3
							 + rLvlAbt(target,actor,"enmity") * -3 + rLvlAbt(target,actor,"rivalry") * -3;
		var simulationState = 0;
		if ( returnCharsUnlockedGenitals(target).length == 0 ) {
			simulationState -= 20;
		}
		var willpowerCostFactor = this.getWillpowerRejectCost(actor,target) / 2;
		var drivesFactor = gC(target).dPleasure.level * 4 + gC(target).dLove.level * 4 - gC(target).dDomination.level * 3 - gC(target).dAmbition.level * 3 - gC(target).dImprovement.level * 4;
		if ( State.variables.simCycPar.templeDayPeriod == "training" ) {
			simulationState = -20;
		}
		
		var powerGrowthFactor = -((quantifyCharacterStats(target) - 110) / 9);
		if ( powerGrowthFactor < 0 ) { powerGrowthFactor = 0; }
		var missionFactor = 0;
		if ( gC(target).mission == "haveSex" ) { missionFactor += 5; }
		else if ( gC(target).mission == "haveDomSex" ) { missionFactor -= 20; }
		
		var semifinalValue = targetMoodFactor + relationshipFactor + baseDifficulty + simulationState + willpowerCostFactor + drivesFactor + missionFactor + powerGrowthFactor;
		var sfvTenth = semifinalValue * 0.1;
		var diceThrow = luckedDiceThrow(gC(actor).luck.getValue());
		var luckFactor = (sfvTenth * 2 * diceThrow) - sfvTenth;
		
		var finalValue = semifinalValue + luckFactor;
		result = false;
		if ( finalValue >= 0 ) { result = true; }
		stringResult += " Mood: " + targetMoodFactor.toFixed(2) + ", Relationship: " + relationshipFactor.toFixed(2) + ", Base dif.: " + baseDifficulty
					  + ", Others: " + simulationState + ", Luck: " + luckFactor.toFixed(2) + ", Drives: " + drivesFactor.toFixed(2) + ", Desire: " + willpowerCostFactor.toFixed(2) + ", Intentions: " + missionFactor.toFixed(2) + ", Growth: " + powerGrowthFactor.toFixed(2) + " - Result: " + finalValue.toFixed(2);
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
		var promptText = gC(actor).getFormattedName() + " wants to have sex with you at the bottom.\n" + this.getDesire(actor,target)[1] + "\n\n"
					   + this.getButtonPlayerAccepts(actor);
		var promptMode = "default";
		if ( gRelTypeAb("chPlayerCharacter",actor) ) {
			if ( gRelTypeAb("chPlayerCharacter",actor).forcedToSex ) {
				promptMode = "relTypeForcesToAccept";
			}
		}
		State.variables.compass.sisList[sisKey].setSisPlayerPrompt(promptText,promptMode,this.getWillpowerRejectCost(actor,target),actor,target,this.sT);
	}
	sist.getButtonPlayerAccepts = function(actor) {
		var bText = "<<l" + "ink [[Accept|Scene]]>><<s" + "cript>>\n";
		bText	 += "getSisCharIsIn('chPlayerCharacter').endSisPlayerPrompt();\n";
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
	
	
	// Start appropiate event
	State.variables.compass.characterEventEndsPrematurely(target);
	State.variables.compass.characterEventEndsPrematurely(actor);
	var eventCharList = removeDuplicatesFromList(getCharGroup(actor).concat(getCharGroup(target)));
	eventToPile(createSystemEventStandardSexScene(eventCharList));
	if ( flagPlayerIsInvolved ) {
		State.variables.compass.pushAllTimeToAdvance();
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
		"ss","fixed",getCharGroup(actor),[],"The water flows quietly.",endConditionTurns,gSettings().stdSxScDur,"Scene Results");
		} else {
			State.variables.sc.startScene(
		"ss","fixed",getCharGroup(actor),getCharGroup(target),"The water flows quietly.",endConditionTurns,gSettings().stdSxScDur,"Scene Results");
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
	} else {
		if ( getCharGroup(actor).includes(target) ) {
			State.variables.sc.startScene(
		"ss","fixed",getCharGroup(actor),[],"The water flows quietly.",endConditionTurns,gSettings().stdSxScDur,"Scene Results");
		} else {
			State.variables.sc.startScene(
		"ss","fixed",getCharGroup(actor),getCharGroup(target),"The water flows quietly.",endConditionTurns,gSettings().stdSxScDur,"Scene Results");
		}
		State.variables.sc.endSceneScript = processGenericSexSceneEffects;
		
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

		State.variables.sc.autoResolveScene();
	}
	
	if ( flagPlayerIsInvolved ) {
		State.variables.sc.formatScenePassage();
	}
}

window.createSistBorrowedDominantSex = function() {
	var sist = new sisTopic("Ask to borrow submissives for sex (Player Dominant)");
	sist.sT = setup.sistType.borrowedSex;
	sist.isPossible = function(actor,target) {
		var flagPossible = false;
		if ( isLewdingPossible(actor,target) && ( gC(target).type == "candidate" ) && ( State.variables.compass.findFirstSisIdInvolvingCharacter(actor) != -1 ) && ((gC(target).followingTo == "") || (gC(target).followingTo == actor) ) ) {
			for ( var charKey of gC(target).subChars ) {
				if ( getSisCharIsIn(actor).charList.includes(charKey) ) {
					flagPossible = true;
				}
			}
		}
		return flagPossible;
	}
	
	sist.getDesire = function(actor,target) {
		var desire = 0;
		var baseDifficulty = -100;
		var moodFactor = gC(target).mood.friendly * 0.05 + gC(target).mood.intimate * 0.05 - gC(target).mood.flirty * 0.03 - gC(target).mood.aroused * 0.05 - gC(target).mood.angry + gC(target).mood.submissive * 0.05 - gC(target).mood.dominant * 0.05;
		var relationshipFactor = rLvlAbt(target,actor,"friendship") * 8 + rLvlAbt(target,actor,"sexualTension") * 2
							 + rLvlAbt(target,actor,"submission") * 4 + rLvlAbt(target,actor,"domination") * -8
							 + rLvlAbt(target,actor,"enmity") * -12;
		var statsFactor = gCstat(actor,"charisma") - gCstat(target,"will");
		var hadSexFactor = - (gC(target).daysWithoutSex * 3 - gC(target).sexScenesToday * 3);
		var missingLustFactor = - ((1 - getBarPercentage(target,"lust")) * 50);
		desire = baseDifficulty + moodFactor + relationshipFactor + statsFactor + missingLustFactor + hadSexFactor;
		var desireString = "Mood (" + moodFactor.toFixed(2) + ") + Relationship ("
						 + relationshipFactor.toFixed(2) + ") + Stats (" + statsFactor.toFixed(2) + ") + Lust (" + missingLustFactor.toFixed(2) + ") + Sex life (" + hadSexFactor.toFixed(2) + ") = Total (" + desire.toFixed(2) + ").";
		
		return [desire,desireString];
	}
	
	sist.isSuccessful = function(actor,target) {
		var result = false;
		var stringResult = "";
		var secondStringResult = "";
		var relType = gRelTypeAb(target,actor);
		
		if ( result == false ) {
		var baseDifficulty = -30;
		var targetMoodFactor = gC(target).mood.friendly * 0.1 - gC(target).mood.flirty * 0.05 + gC(target).mood.intimate * 0.05
							 - gC(target).mood.aroused * 0.2 + gC(target).mood.angry * -0.5
							 + gC(target).mood.submissive * 0.1 + gC(target).mood.dominant * -0.2;
		var relationshipFactor = rLvlAbt(target,actor,"friendship") * 3 - rLvlAbt(target,actor,"sexualTension") * 2
							 + rLvlAbt(target,actor,"submission") * 2 + rLvlAbt(target,actor,"domination") * -2
							 + rLvlAbt(target,actor,"enmity") * -3 + rLvlAbt(target,actor,"rivalry") * -2;
		var simulationState = 0;
		var willpowerCostFactor = 0;
		var drivesFactor = gC(target).dCooperation.level * 2 + gC(target).dLove.level * 2 - gC(target).dDomination.level * 3;
		if ( State.variables.simCycPar.templeDayPeriod == "training" ) {
			simulationState = 10;
		}
		
		var powerGrowthFactor = 0;
		var missionFactor = 0;
		if ( gC(target).mission == "haveSex" ) { missionFactor -= 10; }
		else if ( gC(target).mission == "haveDomSex" ) { missionFactor -= 20; }
		
		var semifinalValue = targetMoodFactor + relationshipFactor + baseDifficulty + simulationState + drivesFactor + missionFactor;
		var sfvTenth = semifinalValue * 0.1;
		var diceThrow = luckedDiceThrow(gC(actor).luck.getValue());
		var luckFactor = (sfvTenth * 2 * diceThrow) - sfvTenth;
		
		var finalValue = semifinalValue + luckFactor;
		result = false;
		if ( finalValue >= 0 ) { result = true; }
		stringResult += " Mood: " + targetMoodFactor.toFixed(2) + ", Relationship: " + relationshipFactor.toFixed(2) + ", Base dif.: " + baseDifficulty
					  + ", Others: " + simulationState + ", Luck: " + luckFactor.toFixed(2) + ", Drives: " + drivesFactor.toFixed(2) + ", Intentions: " + missionFactor.toFixed(2) + " - Result: " + finalValue.toFixed(2);
		}
		
		secondStringResult = gC(actor).getFormattedName() + " asked " + gC(target).getFormattedName() + " to borrow " + gC(target).posPr + " submissives for sex and ";
		if ( result ) { secondStringResult += gC(target).perPr + " accepted."; }
		else 		  { secondStringResult += gC(target).perPr + " refused."; }
		
		return [result,stringResult,secondStringResult];	
	}
	sist.getFailMessage = function(actor,target) {
		var message = firstToCap(gC(target).perPr) + " refused. " + gC(target).formattedName + " is growing annoyed.";
		return message;
	}
	sist.getFailEffect = function(actor,target) {
		gC(target).mood.bored += 10;
		if ( gC(target).mood.bored > 100 ) {
			gC(target).mood.bored = 100;
		}
		gC(target).mood.angry += 10;
		if ( gC(target).mood.angry > 100 ) {
			gC(target).mood.angry = 100;
		}
	}
	sist.getSuccessMessage = function(actor,target) {
		var message = firstToCap(gC(target).perPr) + " agreed. You take " + gC(target).posPr + " submissives to a secluded place...\n"
					+ colorText((gC(actor).getFormattedName() + "'s and " + gC(target).getFormattedName() + "'s friendship has increased.\n"),"khaki")
					+ colorText((gC(target).getFormattedName() + "'s romance with " + gC(target).posPr + " submissives has slightly decreased.\n"),"gray")
					+ gC(actor).getFormattedName() + "'s and " + gC(target).getFormattedName() + "'s cooperation drives have increased.";
		return message;
	}
	sist.getSuccessEffect = function(actor,target) {
		if ( actor == "chPlayerCharacter" ) {
			State.variables.sisSpecifics.flagSissEnd = true;
			
			var bText = "<<l" + "ink [[Continue|Scene]]>><<s" + "cript>>\n";
			bText	 += "genericSistEffectsPlusPc(['" + actor + "'],['" + target + "'],sistBorrowedDominantSexEffects);\n";
			bText	 += "<</s" + "cript>><</l" + "ink>>";
			
			State.variables.sisSpecifics.continueButton = bText;
		} else {
			genericSistEffects(getCharGroup(actor),getCharGroup(target));
			sistBorrowedDominantSexEffects([actor],[target]);
		}
	}
	sist.askToPlayer = function(actor,target,sisKey) {
		var promptText = gC(actor).getFormattedName() + " wants to borrow your submissives for sex.\n\n"
					   + this.getButtonPlayerAccepts(actor);
		var promptMode = "default";
		State.variables.compass.sisList[sisKey].setSisPlayerPrompt(promptText,promptMode,this.getWillpowerRejectCost(actor,target),actor,target,this.sT);
	}
	sist.getButtonPlayerAccepts = function(actor) {
		var bText = "<<l" + "ink [[Accept|Social Interactions]]>><<s" + "cript>>\n";
		bText	 += "getSisCharIsIn('chPlayerCharacter').endSisPlayerPrompt();\n";
		bText	 += "genericSistEffectsPlusPc(['" + actor + "'],['chPlayerCharacter'],sistBorrowedDominantSexEffects);\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	return sist; 
}

window.sistBorrowedDominantSexEffects = function(actors,targets) {
	var flagPlayerIsInvolved = false;
	var actor = actors[0];
	var target = targets[0];
	
	var teamB = [];
	for ( var cK of gC(target).followedBy ) {
		if ( gC(cK).domChar == target ) {
			teamB.push(cK);
			charUnfollowsChar(cK,target);
		}
	}
	
	// Relationship chand drive changes
	getRelation(actor,target).friendship.stv += 60 * teamB.length;
	getRelation(target,actor).friendship.stv += 60 * teamB.length;
	for ( var cK of teamB ) {
		getRelation(cK,target).romance.stv -= 20;
	}
	gC(actor).dCooperation.value += 10;
	gC(target).dCooperation.value += 10;
	// // //
	
	if ( actors.concat(teamB).includes("chPlayerCharacter") || gC(actors[0]).followedBy.includes("chPlayerCharacter") ) { flagPlayerIsInvolved = true; }
	
	// Relocate actor and target
	if ( gC(actor).getRefugeRoomInMap() != "none" ) {
		State.variables.compass.moveCharsToRoom(getCharGroup(actor).concat(teamB),gC(actor).getRefugeRoomInMap());
	}
	
	
	// Start appropiate event
	for ( var cK of teamB ) {
		State.variables.compass.characterEventEndsPrematurely(cK);
	}
	State.variables.compass.characterEventEndsPrematurely(actor);
	var eventCharList = removeDuplicatesFromList(getCharGroup(actor).concat(teamB));
	
	eventToPile(createSystemEventAltDominantSexEffects(getCharGroup(actor),teamB));

	if ( flagPlayerIsInvolved ) {
		State.variables.compass.pushAllTimeToAdvance();
	}
}

	// Offer special relationships
window.createSistOfferServitudeAsMaster = function() {
	var sist = new sisTopic("Invite to initiate Servitude Relationship as your Servant");
	sist.subtitle += '<span title="' + relTypeServitudeTooltip() + '">^^(?)^^</span>';
	sist.sT = setup.sistType.servitudeAsMaster;
	sist.isPossible = function(actor,target) {
		var flagPossible = false;
		// Actor is candidate, actor and target have no special relationship, actor has no dominant, target has no submissives,
		// special relationships are allowed
		if ( (gSettings().servitudeRelationships == "enable") && ( gC(actor).type == "candidate" ) &&
			( gRelTypeAb(actor,target) == null ) && ( gC(actor).domChar == null ) && ( gC(target).domChar == null )
		  && ( gC(target).subChars.length < 1 ) && ( State.variables.settings.relationshipTypesAllowed ) && ((gC(target).followingTo == "") || (gC(target).followingTo == actor) ) ) {
			flagPossible = true;
		}
		return flagPossible;
	}
	
	sist.getSocialdriveOfferCost = function(actor,target) {
		return 25;
	}
	sist.getDesire = function(actor,target) {
		var desire = 0;
		var baseDifficulty = -25;
		var moodFactor = gC(target).mood.intimate * 0.05 - gC(target).mood.angry * 0.5 - gC(target).mood.bored * 0.3
					   +  gC(target).mood.submissive * 0.05 - gC(target).mood.dominant * 0.1;
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 2 + rLvlAbt(target,actor,"sexualTension") * 5
							 + rLvlAbt(target,actor,"submission") * 5 + rLvlAbt(target,actor,"domination") * -5
							 + rLvlAbt(target,actor,"rivalry") * 5;
		var statsFactor = quantifyCharacterStats(actor) - quantifyCharacterStats(target) * 1.2;
		desire = baseDifficulty + moodFactor + relationshipFactor + statsFactor;
		var desireString = "Desire: Base difficulty (" + baseDifficulty.toFixed(2) + ") + Mood (" + moodFactor.toFixed(2) + ") + Relationship ("
						 + relationshipFactor.toFixed(2) + ") + Stats (" + statsFactor.toFixed(2) + ") = Total (" + desire.toFixed(2) + ").";
		
		return [desire,desireString];
	}
	
	sist.isSuccessful = function(actor,target) {
		var result = false;
		var stringResult = "";
		var secondStringResult = "";
		
		var baseDifficulty = 125;
		var targetMoodFactor = gC(target).mood.submissive * 0.4 + gC(target).mood.dominant * -0.6 + gC(target).mood.intimate * 0.1
							 + gC(target).mood.aroused * 0.2 + gC(target).mood.bored * -0.2 + gC(target).mood.angry * -0.5;
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 2 + rLvlAbt(target,actor,"sexualTension") * 2
							 + rLvlAbt(target,actor,"submission") * 4 + rLvlAbt(target,actor,"domination") * -5
							 + rLvlAbt(target,actor,"enmity") * -7 + rLvlAbt(target,actor,"rivalry") * -3;
		var drivesFactor = gC(target).dDomination.level * -2 + gC(target).dAmbition.level * -2;
		if ( ( rLvlAbt(target,actor,"sexualTension") + rLvlAbt(target,actor,"romance") ) > ( rLvlAbt(target,actor,"enmity") * 5 + rLvlAbt(target,actor,"rivalry") * 5 + 3 ) ) {
			drivesFactor += gC(target).dPleasure.level * 2 + gC(target).dLove.level * 2;
		}
		var willpowerCostFactor = this.getWillpowerRejectCost(actor,target) / 2;
							 
		var semifinalValue = targetMoodFactor + relationshipFactor + drivesFactor + willpowerCostFactor;
		var sfvTenth = semifinalValue * 0.1;
		var diceThrow = luckedDiceThrow(gC(actor).luck.getValue());
		var luckFactor = (sfvTenth * 2 * diceThrow) - sfvTenth;
		
		var finalValue = semifinalValue + luckFactor;
		if ( finalValue >= baseDifficulty ) { result = true; }
		stringResult += " Mood: " + targetMoodFactor.toFixed(2) + ", Relationship: " + relationshipFactor.toFixed(2) + ", Drives: " + drivesFactor + ", Willpower cost: " + willpowerCostFactor.toFixed(2) + ", Luck: " + luckFactor.toFixed(2)
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
			bText    += "createRelTypeServitudeDom('" + actor + "','" + target + "'," + gSettings().relationshipsDuration + ");\n";
			bText	 += "createRelTypeServitudeSub('" + target + "','" + actor + "'," + gSettings().relationshipsDuration + ");\n";
			bText	 += "State.variables.sisSpecifics.flagSissEnd = false;\n";
			bText	 += "<</s" + "cript>><</l" + "ink>>";
			
			State.variables.sisSpecifics.formatChoicesText();
			
			State.variables.sisSpecifics.continueButton = bText;
		} else {
			genericSistEffects(getCharGroup(actor),getCharGroup(target));
		}
	}
	sist.askToPlayer = function(actor,target,sisKey) {
		var promptText = gC(actor).getFormattedName() + " wants to initiate a servitude relationship with you as " + gC(actor).posPr + " servant.\n\n"
					   + this.getButtonPlayerAccepts(actor);
		State.variables.compass.sisList[sisKey].setSisPlayerPrompt(promptText,"default",this.getWillpowerRejectCost(actor,target),actor,target,this.sT);
	}
	sist.getButtonPlayerAccepts = function(actor) {
		var bText = "<<l" + "ink [[Accept|Social Interactions]]>><<s" + "cript>>\n";
		bText	 += "getSisCharIsIn('chPlayerCharacter').endSisPlayerPrompt();\n";
		bText	 += "createSistOfferServitudeAsMaster.getSuccessEffect('" + actor + "','chPlayerCharacter');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	return sist;
}
window.createSistOfferServitudeAsServant = function() {
	var sist = new sisTopic("Invite to initiate Servitude Relationship as your Master");
	sist.subtitle += '<span title="' + relTypeServitudeTooltip() + '">^^(?)^^</span>';
	sist.sT = setup.sistType.servitudeAsServant;
	sist.isPossible = function(actor,target) {
		var flagPossible = false;
		// Target is candidate, actor and target have no special relationship, actor has no submissive, target has no dominant,
		// special relationships are allowed
		if ( (gSettings().servitudeRelationships == "enable") && ( gC(target).type == "candidate" ) &&
			( gRelTypeAb(actor,target) == null ) && ( gC(target).domChar == null ) && ( gC(actor).domChar == null )
		  && ( gC(actor).subChars.length < 1 ) && ( State.variables.settings.relationshipTypesAllowed ) && ((gC(target).followingTo == "") || (gC(target).followingTo == actor) ) ) {
			flagPossible = true;
		}
		return flagPossible;
	}
	
	sist.getSocialdriveOfferCost = function(actor,target) {
		return 25;
	}
	
	sist.getDesire = function(actor,target) {
		var desire = 0;
		var baseDifficulty = 10;
		var moodFactor = gC(target).mood.friendly * 0.05 + gC(target).mood.intimate * 0.1 - gC(target).mood.angry * 0.5 - gC(target).mood.bored * 0.3
					   -  gC(target).mood.submissive * 0.1 + gC(target).mood.dominant * 0.1;
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 2 + rLvlAbt(target,actor,"sexualTension") * 5
							 + rLvlAbt(target,actor,"submission") * -5 + rLvlAbt(target,actor,"domination") * 5
							 + rLvlAbt(target,actor,"enmity") * -10 + rLvlAbt(target,actor,"rivalry") * 5;
		var statsFactor = quantifyCharacterStats(target) - quantifyCharacterStats(actor) * 1.2;
		desire = baseDifficulty + moodFactor + relationshipFactor + statsFactor;
		var desireString = "Desire: Base difficulty (" + baseDifficulty.toFixed(2) + ") + Mood (" + moodFactor.toFixed(2) + ") + Relationship ("
						 + relationshipFactor.toFixed(2) + ") + Stats (" + statsFactor.toFixed(2) + ") = Total (" + desire.toFixed(2) + ").";
		
		return [desire,desireString];
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
		var drivesFactor = gC(target).dDomination.level * 4 + gC(target).dAmbition.level * 4 - gC(target).dCooperation.level * 2;
		var willpowerCostFactor = this.getWillpowerRejectCost(actor,target) / 2;
							 
		var semifinalValue = targetMoodFactor + relationshipFactor + drivesFactor + willpowerCostFactor;
		var sfvTenth = semifinalValue * 0.1;
		var diceThrow = luckedDiceThrow(gC(actor).luck.getValue());
		var luckFactor = (sfvTenth * 2 * diceThrow) - sfvTenth;
		
		var finalValue = semifinalValue + luckFactor;
		if ( finalValue >= baseDifficulty ) { result = true; }
		stringResult += " Mood: " + targetMoodFactor.toFixed(2) + ", Relationship: " + relationshipFactor.toFixed(2) + ", Drives: " + drivesFactor + ", Willpower cost: " + willpowerCostFactor.toFixed(2) + ", Luck: " + luckFactor.toFixed(2)
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
			bText    += "createRelTypeServitudeSub('" + actor + "','" + target + "'," + gSettings().relationshipsDuration + ");\n";
			bText	 += "createRelTypeServitudeDom('" + target + "','" + actor + "'," + gSettings().relationshipsDuration + ");\n";
			bText	 += "State.variables.sisSpecifics.flagSissEnd = false;\n";
			bText	 += "<</s" + "cript>><</l" + "ink>>";
			
			State.variables.sisSpecifics.formatChoicesText();
			
			State.variables.sisSpecifics.continueButton = bText;
		} else {
			genericSistEffects(getCharGroup(actor),getCharGroup(target));
		}
	}
	sist.askToPlayer = function(actor,target,sisKey) {
		var promptText = gC(actor).getFormattedName() + " wants to initiate a servitude relationship with you as " + gC(actor).posPr + " master.\n\n"
					   + this.getButtonPlayerAccepts(actor);
		State.variables.compass.sisList[sisKey].setSisPlayerPrompt(promptText,"default",this.getWillpowerRejectCost(actor,target),actor,target,this.sT);
	}
	sist.getButtonPlayerAccepts = function(actor) {
		var bText = "<<l" + "ink [[Accept|Social Interactions]]>><<s" + "cript>>\n";
		bText	 += "getSisCharIsIn('chPlayerCharacter').endSisPlayerPrompt();\n";
		bText	 += "createSistOfferServitudeAsServant.getSuccessEffect('" + actor + "','chPlayerCharacter');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	return sist;
}

window.createSistOfferTutorshipAsTutor = function() {
	var sist = new sisTopic("Invite to initiate Tutorship Relationship as your Pupil");
	sist.subtitle += '<span title="' + relTypeTutorshipTooltip() + '">^^(?)^^</span>';
	sist.sT = setup.sistType.tutorshipAsTutor;
	sist.isPossible = function(actor,target) {
		var flagPossible = false;
		// Actor is candidate, actor and target have no special relationship, actor has no dominant, target has no submissives,
		// special relationships are allowed
		if ( (gSettings().relationshipTypesAllowed == true) && ( gC(actor).type == "candidate" ) &&
			( gRelTypeAb(actor,target) == null ) && ( gC(actor).domChar == null )
		  && ( gC(target).subChars.length < 1 ) && ( gC(target).domChar == null ) && ((gC(target).followingTo == "") || (gC(target).followingTo == actor) ) ) {
			flagPossible = true;
		}
		return flagPossible;
	}
	
	sist.getSocialdriveOfferCost = function(actor,target) {
		return 25;
	}
	
	sist.getDesire = function(actor,target) {
		var desire = 0;
		var baseDifficulty = -20;
		var moodFactor = gC(target).mood.friendly * 0.05 + gC(target).mood.intimate * 0.1 - gC(target).mood.angry * 0.5 - gC(target).mood.bored * 0.3
					   +  gC(target).mood.submissive * 0.05 - gC(target).mood.dominant * 0.1;
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 5 + rLvlAbt(target,actor,"sexualTension") * 2
							 + rLvlAbt(target,actor,"submission") * 5 + rLvlAbt(target,actor,"domination") * -10
							 + rLvlAbt(target,actor,"enmity") * -10;
		var statsFactor = quantifyCharacterStats(actor) - quantifyCharacterStats(target) * 1.2;
		desire = baseDifficulty + moodFactor + relationshipFactor + statsFactor;
		var desireString = "Desire: Base difficulty (" + baseDifficulty.toFixed(2) + ") + Mood (" + moodFactor.toFixed(2) + ") + Relationship ("
						 + relationshipFactor.toFixed(2) + ") + Stats (" + statsFactor.toFixed(2) + ") = Total (" + desire.toFixed(2) + ").";
		
		return [desire,desireString];
	}
	
	sist.isSuccessful = function(actor,target) {
		var result = false;
		var stringResult = "";
		var secondStringResult = "";
		
		var baseDifficulty = 75; // 50;
		var targetMoodFactor = gC(target).mood.submissive * 0.3 + gC(target).mood.dominant * -0.5 + gC(target).mood.intimate * 0.2
							 + gC(target).mood.aroused * 0.1 + gC(target).mood.bored * -0.2 + gC(target).mood.angry * -0.5;
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 3 + rLvlAbt(target,actor,"sexualTension") * 1
							 + rLvlAbt(target,actor,"submission") * 4 + rLvlAbt(target,actor,"domination") * -5
							 + rLvlAbt(target,actor,"enmity") * -5 + rLvlAbt(target,actor,"rivalry") * -3;
		var competitionFactor = 0;
		var infamyFactor = 0;
		var drivesFactor = gC(target).dDomination.level * -2 + gC(target).dAmbition.level * -2;
		
		if ( gC(target).type == "candidate" ) { // More likely to accept if weaker than the average candidate and weaker than potential tutor
			var averageStr = quantifyAverageCandidateVacuumStrength();
			var selfStr = quantifyCharacterVacuumStrength(target);
			var actStr = quantifyCharacterVacuumStrength(actor);
			if ( selfStr < averageStr && actStr > (selfStr * 1.1) ) {
				competitionFactor += 10;
				competitionFactor += (actStr - selfStr);
				drivesFactor += gC(target).dImprovement * 4 + gC(target).dCooperation * 2;
			} else {
				competitionFactor -= 50;
			}
		}
		if ( gC(actor).infamy > gC(target).infamy ) {
			infamyFactor = ( gC(actor).infamy - gC(target).infamy ) * 2;
		}
		
		
		var willpowerCostFactor = this.getWillpowerRejectCost(actor,target) / 2;
							 
		var semifinalValue = targetMoodFactor + relationshipFactor + competitionFactor + infamyFactor + drivesFactor + willpowerCostFactor;
		var sfvTenth = semifinalValue * 0.1;
		var diceThrow = luckedDiceThrow(gC(actor).luck.getValue());
		var luckFactor = (sfvTenth * 2 * diceThrow) - sfvTenth;
		
		var finalValue = semifinalValue + luckFactor;
		if ( finalValue >= baseDifficulty ) { result = true; }
		stringResult += " Mood: " + targetMoodFactor.toFixed(2) + ", Relationship: " + relationshipFactor.toFixed(2) + ", Competition: " + competitionFactor.toFixed(2) + ", Infamy: " + infamyFactor.toFixed(2) + ", Drives: " + drivesFactor + ", Willpower cost: " + willpowerCostFactor.toFixed(2) + ", Luck: " + luckFactor.toFixed(2)
					  + " -> Result: " + finalValue.toFixed(2) + " VS Difficulty: " + baseDifficulty;
		
		secondStringResult = gC(actor).getFormattedName() + " invited " + gC(target).getFormattedName() + " to become " + gC(target).posPr + " tutor and " + gC(target).perPr;
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
		var message = firstToCap(gC(target).perPr) + " agreed. " + gC(target).formattedName + " will now be learning from you.";
		return message;
	}
	sist.getSuccessEffect = function(actor,target) {
		if ( actor == "chPlayerCharacter" ) {
			State.variables.sisSpecifics.flagSissEnd = true;
			
			var bText = "<<l" + "ink [[Continue|Social Interactions]]>><<s" + "cript>>\n";
			bText    += "createRelTypeTutorshipDom('" + actor + "','" + target + "'," + gSettings().relationshipsDuration + ");\n";
			bText	 += "createRelTypeTutorshipSub('" + target + "','" + actor + "'," + gSettings().relationshipsDuration + ");\n";
			bText	 += "State.variables.sisSpecifics.flagSissEnd = false;\n";
			bText	 += "<</s" + "cript>><</l" + "ink>>";
			
			State.variables.sisSpecifics.formatChoicesText();
			
			State.variables.sisSpecifics.continueButton = bText;
		} else {
			createRelTypeTutorshipDom(actor,target,gSettings().relationshipsDuration);
			createRelTypeTutorshipSub(target,actor,gSettings().relationshipsDuration);
		}
	}
	sist.askToPlayer = function(actor,target,sisKey) {
		var promptText = gC(actor).getFormattedName() + " wants to initiate a tutorship relationship with you as " + gC(actor).posPr + " pupil.\n\n"
					   + this.getButtonPlayerAccepts(actor);
		State.variables.compass.sisList[sisKey].setSisPlayerPrompt(promptText,"default",this.getWillpowerRejectCost(actor,target),actor,target,this.sT);
	}
	sist.getButtonPlayerAccepts = function(actor) {
		var bText = "<<l" + "ink [[Accept|Social Interactions]]>><<s" + "cript>>\n";
		bText	 += "getSisCharIsIn('chPlayerCharacter').endSisPlayerPrompt();\n";
		bText	 += "createSistOfferTutorshipAsTutor.getSuccessEffect('" + actor + "','chPlayerCharacter');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	return sist;
}
window.createSistOfferTutorshipAsPupil = function() {
	var sist = new sisTopic("Invite to initiate Tutorship Relationship as your Tutor");
	sist.subtitle += '<span title="' + relTypeTutorshipTooltip() + '">^^(?)^^</span>';
	sist.sT = setup.sistType.tutorshipAsPupil;
	sist.isPossible = function(actor,target) {
		var flagPossible = false;
		// Target is candidate, actor and target have no special relationship, actor has no submissive, target has no dominant,
		// special relationships are allowed
		if ( ( gRelTypeAb(actor,target) == null ) && ( gC(target).domChar == null ) && ( gC(actor).domChar == null )
		  && ( gC(actor).subChars.length < 1 ) && ( State.variables.settings.relationshipTypesAllowed ) && ((gC(target).followingTo == "") || (gC(target).followingTo == actor) ) ) {
			flagPossible = true;
		}
		return flagPossible;
	}
	
	sist.getSocialdriveOfferCost = function(actor,target) {
		return 25;
	}
	
	sist.getDesire = function(actor,target) {
		var desire = 0;
		var baseDifficulty = 10;
		var moodFactor = gC(target).mood.friendly * 0.05 + gC(target).mood.intimate * 0.1 - gC(target).mood.angry * 0.5 - gC(target).mood.bored * 0.3
					   -  gC(target).mood.submissive * 0.1 + gC(target).mood.dominant * 0.05;
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 5 + rLvlAbt(target,actor,"sexualTension") * 2
							 + rLvlAbt(target,actor,"submission") * -5 + rLvlAbt(target,actor,"domination") * 2
							 + rLvlAbt(target,actor,"enmity") * -10;
		var statsFactor = quantifyCharacterStats(target) - quantifyCharacterStats(actor) * 1.2;
		desire = baseDifficulty + moodFactor + relationshipFactor + statsFactor;
		var desireString = "Desire: Base difficulty (" + baseDifficulty.toFixed(2) + ") + Mood (" + moodFactor.toFixed(2) + ") + Relationship ("
						 + relationshipFactor.toFixed(2) + ") + Stats (" + statsFactor.toFixed(2) + ") = Total (" + desire.toFixed(2) + ").";
		
		return [desire,desireString];
	}
	
	
	sist.isSuccessful = function(actor,target) {
		var result = false;
		var stringResult = "";
		var secondStringResult = "";
		
		var baseDifficulty = 25; // 25;
		var targetMoodFactor = gC(target).mood.submissive * -0.4 + gC(target).mood.dominant * 0.6 + gC(target).mood.intimate * 0.3
							 + gC(target).mood.aroused * 0.15 + gC(target).mood.bored * -0.2 + gC(target).mood.angry * -0.4;
		var relationshipFactor = rLvlAbt(target,actor,"romance") * 6 + rLvlAbt(target,actor,"sexualTension") * 3
							 + rLvlAbt(target,actor,"submission") * -4 + rLvlAbt(target,actor,"domination") * 8
							 + rLvlAbt(target,actor,"enmity") * -5 + rLvlAbt(target,actor,"rivalry") * 1;
		var competitionFactor = 0;
		var willpowerCostFactor = this.getWillpowerRejectCost(actor,target) / 2;
		
		if ( gC(target).type == "candidate" ) { // More likely to accept if weaker than the average candidate and weaker than potential tutor
			var averageStr = quantifyAverageCandidateVacuumStrength();
			var selfStr = quantifyCharacterVacuumStrength(target);
			var actStr = quantifyCharacterVacuumStrength(actor);
			if ( actStr < averageStr && (actStr * 1.1) < selfStr ) {
				competitionFactor += 10;
			} else {
				competitionFactor -= 50;
			}
		}
							 
		var semifinalValue = targetMoodFactor + relationshipFactor + competitionFactor + willpowerCostFactor;
		var sfvTenth = semifinalValue * 0.1;
		var diceThrow = luckedDiceThrow(gC(actor).luck.getValue());
		var luckFactor = (sfvTenth * 2 * diceThrow) - sfvTenth;
		
		var finalValue = semifinalValue + luckFactor;
		if ( finalValue >= baseDifficulty ) { result = true; }
		stringResult += " Mood: " + targetMoodFactor.toFixed(2) + ", Relationship: " + relationshipFactor.toFixed(2) + ", Competition: " + competitionFactor.toFixed(2) + ", Willpower cost: " + willpowerCostFactor.toFixed(2) + ", Luck: " + luckFactor.toFixed(2)
					  + " -> Result: " + finalValue.toFixed(2) + " VS Difficulty: " + baseDifficulty;
		
		secondStringResult = gC(actor).getFormattedName() + " invited " + gC(target).getFormattedName() + " to become " + gC(target).posPr + " pupil and " + gC(target).perPr;
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
		var message = firstToCap(gC(target).perPr) + " agreed. " + gC(target).formattedName + " will now expect you to listen to " + gC(target).comPr + ".";
		return message;
	}
	sist.getSuccessEffect = function(actor,target) {
		if ( actor == "chPlayerCharacter" ) {
			State.variables.sisSpecifics.flagSissEnd = true;
			
			var bText = "<<l" + "ink [[Continue|Social Interactions]]>><<s" + "cript>>\n";
			bText    += "createRelTypeTutorshipSub('" + actor + "','" + target + "'," + gSettings().relationshipsDuration + ");\n";
			bText	 += "createRelTypeTutorshipDom('" + target + "','" + actor + "'," + gSettings().relationshipsDuration + ");\n";
			bText	 += "State.variables.sisSpecifics.flagSissEnd = false;\n";
			bText	 += "<</s" + "cript>><</l" + "ink>>";
			
			State.variables.sisSpecifics.formatChoicesText();
			
			State.variables.sisSpecifics.continueButton = bText;
		} else {
			createRelTypeTutorshipDom(target,actor,gSettings().relationshipsDuration);
			createRelTypeTutorshipSub(actor,target,gSettings().relationshipsDuration);
		}
	}
	sist.askToPlayer = function(actor,target,sisKey) {
		var promptText = gC(actor).getFormattedName() + " wants to initiate a tutorship relationship with you as " + gC(actor).posPr + " tutor.\n\n"
					   + this.getButtonPlayerAccepts(actor);
		State.variables.compass.sisList[sisKey].setSisPlayerPrompt(promptText,"default",this.getWillpowerRejectCost(actor,target),actor,target,this.sT);
	}
	sist.getButtonPlayerAccepts = function(actor) {
		var bText = "<<l" + "ink [[Accept|Social Interactions]]>><<s" + "cript>>\n";
		bText	 += "getSisCharIsIn('chPlayerCharacter').endSisPlayerPrompt();\n";
		bText	 += "createSistOfferTutorshipAsPupil.getSuccessEffect('" + actor + "','chPlayerCharacter');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	return sist;
}

window.createSistOfferCompanionship = function() {
	var sist = new sisTopic("Invite to initiate Companionship Relationship");
	sist.subtitle += '<span title="' + relTypeCompanionshipTooltip() + '">^^(?)^^</span>';
	sist.sT = setup.sistType.companionship;
	sist.isPossible = function(actor,target) {
		var flagPossible = false;
		// Target is candidate, actor and target have no special relationship
		// special relationships are allowed
		if ( ( gRelTypeAb(actor,target) == null )
		  && ( State.variables.settings.relationshipTypesAllowed ) && ((gC(target).followingTo == "") || (gC(target).followingTo == actor) ) ) {
			flagPossible = true;
		}
		return flagPossible;
	}
	
	sist.getSocialdriveOfferCost = function(actor,target) {
		return 25;
	}
	
	sist.getDesire = function(actor,target) {
		var desire = 0;
		var baseDifficulty = -10;
		var moodFactor = gC(target).mood.friendly * 0.05 + gC(target).mood.intimate * 0.1 - gC(target).mood.angry * 0.5 - gC(target).mood.bored * 0.3
					   +  gC(target).mood.submissive * 0.05 - gC(target).mood.dominant * 0.05;
		var relationshipFactor = rLvlAbt(target,actor,"friendship") * 5 + rLvlAbt(target,actor,"romance") * 5 + rLvlAbt(target,actor,"sexualTension") * 2
							 + rLvlAbt(target,actor,"submission") * 5 - rLvlAbt(target,actor,"domination") * 10
							 + rLvlAbt(target,actor,"rivalry") * -5 + rLvlAbt(target,actor,"enmity") * -10;
		var statsFactor = (quantifyCharacterStats(actor) - quantifyCharacterStats(target) * 1.2) / 9;
		desire = baseDifficulty + moodFactor + relationshipFactor + statsFactor;
		var desireString = "Desire: Base difficulty (" + baseDifficulty.toFixed(2) + ") + Mood (" + moodFactor.toFixed(2) + ") + Relationship ("
						 + relationshipFactor.toFixed(2) + ") + Stats (" + statsFactor.toFixed(2) + ") = Total (" + desire.toFixed(2) + ").";
		
		return [desire,desireString];
	}
	
	
	sist.isSuccessful = function(actor,target) {
		var result = false;
		var stringResult = "";
		var secondStringResult = "";
		
		var baseDifficulty = 50; // 50;
		var targetMoodFactor = gC(target).mood.submissive * 0.2 + gC(target).mood.dominant * -0.6 + gC(target).mood.intimate * 0.4
							 + gC(target).mood.friendly * 0.2 + gC(target).mood.bored * -0.2 + gC(target).mood.angry * -0.4;
		var relationshipFactor = rLvlAbt(target,actor,"friendship") * 4 + rLvlAbt(target,actor,"romance") * 6 + rLvlAbt(target,actor,"sexualTension") * 2
							 + rLvlAbt(target,actor,"submission") * 4 + rLvlAbt(target,actor,"domination") * -6
							 + rLvlAbt(target,actor,"enmity") * -6 + rLvlAbt(target,actor,"rivalry") * -4;
		var competitionFactor = (quantifyCharacterVacuumStrength(actor) - quantifyCharacterVacuumStrength(target)) / 9;
		var drivesFactor = gC(target).dCooperation.level * 4 + gC(target).dLove.level * 2 - gC(target).dDomination.level * 4 - gC(target).dAmbition.level * 1;
		var willpowerCostFactor = this.getWillpowerRejectCost(actor,target) / 2;
							 
		var semifinalValue = targetMoodFactor + relationshipFactor + competitionFactor + drivesFactor + willpowerCostFactor;
		var sfvTenth = semifinalValue * 0.1;
		var diceThrow = luckedDiceThrow(gC(actor).luck.getValue());
		var luckFactor = (sfvTenth * 2 * diceThrow) - sfvTenth;
		
		var finalValue = semifinalValue + luckFactor;
		if ( finalValue >= baseDifficulty ) { result = true; }
		stringResult += " Mood: " + targetMoodFactor.toFixed(2) + ", Relationship: " + relationshipFactor.toFixed(2) + ", Competition: " + competitionFactor.toFixed(2) + ", Willpower cost: " + willpowerCostFactor.toFixed(2) + ", Drives factor: " + drivesFactor.toFixed(2) + ", Luck: " + luckFactor.toFixed(2)
					  + " -> Result: " + finalValue.toFixed(2) + " VS Difficulty: " + baseDifficulty;
		
		secondStringResult = gC(actor).getFormattedName() + " invited " + gC(target).getFormattedName() + " to become " + gC(target).posPr + " companion and ";
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
		if ( target == "chPlayerCharacter" ) {
			gC(actor).mission = "raiseFriendship";
		}
	}
	sist.getSuccessMessage = function(actor,target) {
		var message = firstToCap(gC(target).perPr) + " agreed. " + gC(target).formattedName + " will now look after you.";
		return message;
	}
	sist.getSuccessEffect = function(actor,target) {
		if ( actor == "chPlayerCharacter" ) {
			State.variables.sisSpecifics.flagSissEnd = true;
			
			var bText = "<<l" + "ink [[Continue|Social Interactions]]>><<s" + "cript>>\n";
			bText    += "createRelTypeCompanionship('" + actor + "','" + target + "'," + gSettings().relationshipsDuration + ");\n";
			bText	 += "createRelTypeCompanionship('" + target + "','" + actor + "'," + gSettings().relationshipsDuration + ");\n";
			bText	 += "State.variables.sisSpecifics.flagSissEnd = false;\n";
			bText	 += "<</s" + "cript>><</l" + "ink>>";
			
			State.variables.sisSpecifics.formatChoicesText();
			
			State.variables.sisSpecifics.continueButton = bText;
		} else {
			createRelTypeCompanionship(target,actor,gSettings().relationshipsDuration);
			createRelTypeCompanionship(actor,target,gSettings().relationshipsDuration);
		}
	}
	sist.askToPlayer = function(actor,target,sisKey) {
		var promptText = gC(actor).getFormattedName() + " wants to initiate a companionship relationship with you.\n\n"
					   + this.getButtonPlayerAccepts(actor);
		State.variables.compass.sisList[sisKey].setSisPlayerPrompt(promptText,"default",this.getWillpowerRejectCost(actor,target),actor,target,this.sT);
	}
	sist.getButtonPlayerAccepts = function(actor) {
		var bText = "<<l" + "ink [[Accept|Social Interactions]]>><<s" + "cript>>\n";
		bText	 += "getSisCharIsIn('chPlayerCharacter').endSisPlayerPrompt();\n";
		bText	 += "createSistOfferCompanionship().getSuccessEffect('" + actor + "','chPlayerCharacter');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	return sist;
}

	// Bondage
window.createSistUnlockTargetsGenitals = function() {
	var sist = new sisTopic("Unlock target's genitals");
	sist.subtitle += '<span title="' + "If the target has genitals locked by items owned by the actor, these will be freed. If the target has locked their own genitals and is the actor's submissive, those will be unlocked as well." + '">^^(?)^^</span>';
	sist.sT = setup.sistType.unlockTargetsGenitals;
	sist.isPossible = function(actor,target) {
		var flagPossible = false;
		var unlockableGenitals = [];
		// Unlockable by actor
		unlockableGenitals = getActorsGenitalsLockedByTarget(target,actor);
		// Unlockable by target
		if ( gC(target).domChar == actor ) {
			unlockableGenitals = unlockableGenitals.concat(getActorsGenitalsLockedByTarget(target,target));
		}
		if ( unlockableGenitals.length > 0 ) { flagPossible = true; }
		return flagPossible;
	}
	
	sist.getSocialdriveOfferCost = function(actor,target) {
		return 0;
	}
	
	sist.getDesire = function(actor,target) {
		var desire = 0;
		var desireString = "";
		
		return [desire,desireString];
	}
	
	
	sist.isSuccessful = function(actor,target) {
		var result = true;
		var stringResult = "Success.";
		var secondStringResult = gC(actor).getFormattedName() + " unlocked " + gC(target).getFormattedName() + "'s locked lower parts.";
				
		return [result,stringResult,secondStringResult];	
	}
	sist.getFailMessage = function(actor,target) {
		var message = "This shouldn't happen.";
		return message;
	}
	sist.getFailEffect = function(actor,target) {
		
	}
	sist.getSuccessMessage = function(actor,target) {
		var message = "You unlocked " + gC(target).getFormattedName() + "'s sex.";
		return message;
	}
	sist.getSuccessEffect = function(actor,target) {
		var unlockableGenitals = [];
		unlockableGenitals = getActorsGenitalsLockedByTarget(target,actor);
		if ( gC(target).domChar == actor ) {
			unlockableGenitals = unlockableGenitals.concat(getActorsGenitalsLockedByTarget(target,target));
		}
		for ( var genital of unlockableGenitals ) {
			applyAlteredState([target],createUnlockedBodypartForTheDay(genital));
		}
		
		if ( actor == "chPlayerCharacter" ) {
			State.variables.sisSpecifics.flagSissEnd = true;
			
			var bText = "<<l" + "ink [[Continue|Social Interactions]]>><<s" + "cript>>\n";
			bText 	 += "State.variables.sisSpecifics.cleanSiss();\n";
			bText	 += "<</s" + "cript>><</l" + "ink>>";
			
			State.variables.sisSpecifics.formatChoicesText();
			
			State.variables.sisSpecifics.continueButton = bText;
		}
	}
	sist.askToPlayer = function(actor,target,sisKey) {
		var promptText = gC(actor).getFormattedName() + " is unlocking your nethers.\n\n"
					   + this.getButtonPlayerAccepts(actor);
		State.variables.compass.sisList[sisKey].setSisPlayerPrompt(promptText,"noExtra",0,actor,target,this.sT);
	}
	sist.getButtonPlayerAccepts = function(actor) {
		var bText = "<<l" + "ink [[Accept|Social Interactions]]>><<s" + "cript>>\n";
		bText	 += "getSisCharIsIn('chPlayerCharacter').endSisPlayerPrompt();\n";
		bText	 += "createSistUnlockTargetsGenitals().getSuccessEffect('" + actor + "','chPlayerCharacter');\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	return sist;
}

window.createSistUnlockActorsGenitals = function() {
	var sist = new sisTopic("Unlock own genitals");
	sist.subtitle += '<span title="' + "If the actor has genitals locked by items owned by the target, these will be freed, if the target agrees." + '">^^(?)^^</span>';
	sist.sT = setup.sistType.unlockActorsGenitals;
	sist.isPossible = function(actor,target) {
		var flagPossible = false;
		var unlockableGenitals = [];
		// Unlockable by actor
		unlockableGenitals = getActorsGenitalsLockedByTarget(actor,target);
		if ( unlockableGenitals.length > 0 ) { flagPossible = true; }
		return flagPossible;
	}
	
	sist.getSocialdriveOfferCost = function(actor,target) {
		return 5;
	}
	
	sist.getDesire = function(actor,target) {
		var desire = 0;
		var desireString = "Desire: 0";
		
		return [desire,desireString];
	}
		
	sist.isSuccessful = function(actor,target) {
		var result = false;
		var stringResult = "";
		var secondStringResult = "";
		
		var baseDifficulty = 30; // 30;
		var targetMoodFactor = gC(target).mood.friendly * 0.02 + gC(target).mood.intimate * 0.03 + gC(target).mood.aroused * 0.04 + gC(target).mood.flirty * 0.06 - gC(target).mood.angry * 0.5 - gC(target).mood.bored * 0.3 + gC(target).mood.submissive * 0.05 - gC(target).mood.dominant * 0.2;
		var relationshipFactor = rLvlAbt(target,actor,"friendship") * 2 + rLvlAbt(target,actor,"romance") * 1 + rLvlAbt(target,actor,"sexualTension") * 2
							 + rLvlAbt(target,actor,"submission") * 2 - rLvlAbt(target,actor,"domination") * 8
							 + rLvlAbt(target,actor,"rivalry") * -5 + rLvlAbt(target,actor,"enmity") * -10;
		var drivesFactor = gC(target).dCooperation.level * 2 + gC(target).dLove.level * 2 - gC(target).dDomination.level * 4;
		var willpowerCostFactor = 0;
							 
		var semifinalValue = targetMoodFactor + relationshipFactor + drivesFactor + willpowerCostFactor;
		var sfvTenth = semifinalValue * 0.1;
		var diceThrow = luckedDiceThrow(gC(actor).luck.getValue());
		var luckFactor = (sfvTenth * 2 * diceThrow) - sfvTenth;
		
		var finalValue = semifinalValue + luckFactor;
		if ( finalValue >= baseDifficulty ) { result = true; }
		stringResult += " Mood: " + targetMoodFactor.toFixed(2) + ", Relationship: " + relationshipFactor.toFixed(2) + ", Drives factor: " + drivesFactor.toFixed(2) + ", Luck: " + luckFactor.toFixed(2)
					  + " -> Result: " + finalValue.toFixed(2) + " VS Difficulty: " + baseDifficulty;
		
		secondStringResult = gC(actor).getFormattedName() + " asked " + gC(target).getFormattedName() + " to free " + gC(target).posPr + " lower parts and " + gC(target).perPr;
		if ( result ) { secondStringResult += gC(target).perPr + " accepted."; }
		else 		  { secondStringResult += gC(target).perPr + " refused."; }
		
		return [result,stringResult,secondStringResult];	
	}
	sist.getFailMessage = function(actor,target) {
		var message = firstToCap(gC(target).perPr) + " refused. " + gC(target).formattedName + " is growing bored, yet confident." + gC(actor).formattedName + " is growing frustrated.\n"
					+ colorText(("Your submission towards " + gC(target).getName() + " has slightly grown."),"purple");
		return message;
	}
	sist.getFailEffect = function(actor,target) {
		gC(target).mood.bored += 5;
		if ( gC(target).mood.bored > 100 ) {
			gC(target).mood.bored = 100;
		}
		gC(target).mood.dominant += 5;
		if ( gC(target).mood.dominant > 100 ) {
			gC(target).mood.dominant = 100;
		}
		gC(actor).mood.aroused += 10;
		if ( gC(actor).mood.aroused > 100 ) {
			gC(actor).mood.aroused = 100;
		}
		gC(actor).mood.submissive += 10;
		if ( gC(actor).mood.submissive > 100 ) {
			gC(actor).mood.submissive = 100;
		}
		gC(actor).mood.angry += 5;
		if ( gC(actor).mood.angry > 100 ) {
			gC(actor).mood.angry = 100;
		}
		// Relationship changes
		getRelation(actor,target).submission.stv += 20;
	}
	sist.getSuccessMessage = function(actor,target) {
		var message = firstToCap(gC(target).perPr) + " agreed. " + gC(target).getFormattedName() + " will free your nethers.\n"
					+ "You are rapidly growing submissive and horny.\n"
					+ colorText(("Your submission and friendship towards " + gC(target).getName() + " are growing."),"purple");
		return message;
	}
	sist.getSuccessEffect = function(actor,target) {
		// Altered states
		var unlockableGenitals = [];
		unlockableGenitals = getActorsGenitalsLockedByTarget(actor,target);
		for ( var genital of unlockableGenitals ) {
			applyAlteredState([actor],createUnlockedBodypartForTheDay(genital));
		}
		// High submission
		gC(actor).mood.submissive += 50;
		if ( gC(actor).mood.submissive > 100 ) {
			gC(actor).mood.submissive = 100;
		}
		gC(actor).mood.aroused += 25;
		if ( gC(actor).mood.aroused > 100 ) {
			gC(actor).mood.aroused = 100;
		}
		// Relationship changes
		getRelation(actor,target).submission.stv += 40;
		getRelation(actor,target).friendship.stv += 40;
		
		if ( actor == "chPlayerCharacter" ) {
			State.variables.sisSpecifics.flagSissEnd = true;
			
			var bText = "<<l" + "ink [[Continue|Social Interactions]]>><<s" + "cript>>\n";
			bText 	 += "State.variables.sisSpecifics.cleanSiss();\n";
			bText	 += "<</s" + "cript>><</l" + "ink>>";
			
			State.variables.sisSpecifics.formatChoicesText();
			
			State.variables.sisSpecifics.continueButton = bText;
		}
	}
	sist.askToPlayer = function(actor,target,sisKey) {
		var promptText = gC(actor).getFormattedName() + " is asking you to free " + gC(target).posPr + " private parts.\n\n"
					   + this.getButtonPlayerAccepts(actor);
		State.variables.compass.sisList[sisKey].setSisPlayerPrompt(promptText,"default",this.getWillpowerRejectCost(actor,target),actor,target,this.sT);
	}
	sist.getButtonPlayerAccepts = function(actor) {
		var bText = "<<l" + "ink [[Accept|Social Interactions]]>><<s" + "cript>>\n";
		bText	 += "getSisCharIsIn('chPlayerCharacter').endSisPlayerPrompt();\n";
		bText	 += "createSistUnlockActorsGenitals().getSuccessEffect('" + actor + "','chPlayerCharacter');\n";
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

// Auxiliars

window.recruitCharsInSis = function(charList,actor,joinedChars,evaluationFunction) {
	var joiningChars = [];
	var validChars = [];
	for ( var charKey of charList ) {
		if ( joinedChars.includes(charKey) == false && gC(charKey).followingTo == "" && charKey != "chPlayerCharacter" ) {
			validChars.push(charKey);
		}
	}
	for ( var charKey of validChars ) {
		if ( evaluationFunction(charKey,actor,joinedChars.concat(joiningChars)) ) {
			joiningChars.push(charKey);
			for ( var follower of gC(charKey).followedBy ) {
				joiningChars.push(follower);
			}
		}
	}
	return joiningChars;
}

////////// SIS Topics Database //////////

setup.sistType = {
	egalitarianSex: "t0",
	egalitarianExcludingSex: "t1",
	submissiveSex: "t2",
	dominantSex: "t3",
	borrowedSex: "t4",
	
	unlockTargetsGenitals: "o0",
	unlockActorsGenitals: "o1",
	
	servitudeAsMaster: "r0",
	servitudeAsServant: "r1",
	tutorshipAsTutor: "r2",
	tutorshipAsPupil: "r3",
	companionship: "r4"
}

setup.sistTypes = [ "t0","t1","t2","t3","t4",
					"o0","o1",
					"r0","r1","r2","r3","r4" ];

setup.sistDB = [];
setup.sistDB[setup.sistType.egalitarianSex] = new createSistEgalitarianSex();
setup.sistDB[setup.sistType.egalitarianExcludingSex] = new createSistExcludingEgalitarianSex();
setup.sistDB[setup.sistType.submissiveSex] = new createSistSubmissiveSex();
setup.sistDB[setup.sistType.dominantSex] = new createSistDominantSex();
setup.sistDB[setup.sistType.borrowedSex] = new createSistBorrowedDominantSex();

setup.sistDB[setup.sistType.unlockTargetsGenitals] = new createSistUnlockTargetsGenitals();
setup.sistDB[setup.sistType.unlockActorsGenitals] = new createSistUnlockActorsGenitals();

setup.sistDB[setup.sistType.servitudeAsMaster] = new createSistOfferServitudeAsMaster();
setup.sistDB[setup.sistType.servitudeAsServant] = new createSistOfferServitudeAsServant();
setup.sistDB[setup.sistType.tutorshipAsTutor] = new createSistOfferTutorshipAsTutor();
setup.sistDB[setup.sistType.tutorshipAsPupil] = new createSistOfferTutorshipAsPupil();
setup.sistDB[setup.sistType.companionship] = new createSistOfferCompanionship();


