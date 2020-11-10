
////////// NPC-GLOBAL-AI CLASS //////////

window.NpcSocialAi = function(charKey) {
	this.charKey = charKey;
	
	this.stablishRelationshipGoal = function(target) {
		this[target] = new relationshipGoal(this.charKey,target);
	}
	
	// Choose social interaction in SIS
	this.chooseSISinteraction = function(target,interactionsList) {
		var wInteractionslist = listIntoWeightedList(interactionsList);
		for ( var wItem in wInteractionslist ) {
			if ( wInteractionslist[wItem] instanceof weightedElement ) {
				wInteractionslist[wItem].w = this.assignWeightToInteraction(target,wInteractionslist[wItem].content);
			}
		}
		var chosenInteraction = randomFromWeightedList(wInteractionslist);
		return chosenInteraction;
	}

	
	this.assignWeightToInteraction = function(target,interactionKey) {
		var value = 100;
		var strategy = "friendly";
		var interaction = getSiByKey(interactionKey);
		if ( this.hasOwnProperty(target) ) {
			strategy = this[target].strategy;
		}
		
		switch(strategy) {
			case "friendly":
				if ( interaction.tags.includes("friendly") ) { value *= 2; }
				if ( interaction.tags.includes("intimate") ) { value *= 3; }
				if ( interaction.tags.includes("flirty") ) { value *= 2; }
				if ( interaction.tags.includes("aroused") ) { value *= 1.5; }
				if ( interaction.tags.includes("angry") ) { value *= 0.2; }
				break;
			case "rivalry":
				if ( interaction.tags.includes("friendly") ) { value *= 0.8; }
				if ( interaction.tags.includes("intimate") ) { value *= 0.5; }
				if ( interaction.tags.includes("flirty") ) { value *= 0.5; }
				if ( interaction.tags.includes("dominant") ) { value *= 2; }
				if ( interaction.tags.includes("submissive") ) { value *= 0.1; }
				if ( interaction.tags.includes("angry") ) { value *= 2.5; }
				break;
			case "romance":
				if ( interaction.tags.includes("friendly") ) { value *= 0.8; }
				if ( interaction.tags.includes("intimate") ) { value *= 2; }
				if ( interaction.tags.includes("flirty") ) { value *= 3; }
				if ( interaction.tags.includes("aroused") ) { value *= 3; }
				if ( interaction.tags.includes("angry") ) { value *= 0.1; }
				break;
		}
		if ( interaction.tags.includes("angry") ) {
			value *= 1 + ( (gC(this.charKey).mood.angry * 3) / 100 );
		}
		return value;
	}

	this.getInterRoundBehavior = function(sis) {
		var choice = "none";
		var target = "";
		
		// Characters following someone shouldn't be able to propose sex or leave SIS on their ownData
		if ( gC(this.charKey).followingTo == "" ) {
			// Check to propose sex
			
			// Check if demanding sex from sub is possible
			if ( ( gC(this.charKey).mood.flirty + gC(this.charKey).mood.aroused ) > 30 && gC(this.charKey).subChars.length > 0 ) {
				var flagDemandSex = true;
				// If any character in sis that is not self or sub to self, chance to demand sex
				for ( var chKey of sis.charList ) {
					if ( ( chKey != this.charKey ) && ( gC(this.charKey).subChars.includes(chKey) == false ) ) {
						flagDemandSex = false;
					}
				}
				if ( flagDemandSex ) {
					if ( limitedRandomInt(10) > 7 ) {
						var priorizedChar = randomFromList(arrayMinusA(sis.charList,this.charKey));
						choice = "dominantSex";
					}
				}
			}
			if ( choice == "none" ) {
				// Standard sex checks
				if ( ( gC(this.charKey).mood.flirty + gC(this.charKey).mood.aroused - gC(this.charKey).mood.angry ) >= 35 && ( limitedRandomInt(10) > 7 ) ) {
					var highestPriority = -1;
					var priorizedChar = "";
					// Get character with highest priority
					for ( var character of sis.getValidProposedCharacters(this.charKey) ) {
						if ( getSocialPriorityAgainstTarget(this,character) > highestPriority || highestPriority == -1 ) {
							highestPriority = getSocialPriorityAgainstTarget(this,character);
							priorizedChar = character;
						}
					}
					// Check for dominant sex
					if ( State.variables.sistDB[2].isSuccessful(this.charKey,priorizedChar)[0] ) {
						choice = "dominantSex";
						target = priorizedChar;
					} // Check for egalitarian sex
					else if ( State.variables.sistDB[0].isSuccessful(this.charKey,priorizedChar)[0] ) {
						choice = "egalitarianSex";
						target = priorizedChar;
					}
				}
			}
			// Check to leave SIS
			if ( choice == "none" ) {
				if ( gC(this.charKey).mood.angry > 20 ) {
					if ( limitedRandomInt(10) > 8 ) {
						choice = "leave";
					}
				}
				if ( gC(this.charKey).socialdrive.current < gC(this.charKey).socialdrive.max * 0.2 ) {
					if ( limitedRandomInt(10) > 8 ) {
						choice = "leave";
					}
				}
				if ( gC(this.charKey).socialdrive.current < 1 ) {
					choice = "leave";
				}
			}
		}
		
		return [choice,target];
	}
};

window.setSocialAiCandidateGoals = function(socialAi) {
	// Simple and functional version of this function.
	// One character will be selected as romance target. This character will receive much higher priority.
	// All other characters will be set to either "friendly" or "dominate"
	
	var actor = socialAi.charKey;
	var romanceTargetId = 0;
	var currentTargetScore = 0;
	var currentCandidateScore = 0;
	var i = 0;
	
	// Find best target for romance
	for ( var candidate of getCandidatesKeysArray() ) {
		if ( candidate != socialAi.charKey ) {
			currentCandidateScore = ((rLvlAbt(candidate,actor,"friendship") * 1) + (rLvlAbt(candidate,actor,"sexualTension") * 3)
								  + (rLvlAbt(candidate,actor,"romance") * 3) + (rLvlAbt(candidate,actor,"domination") * 3)
								  + (rLvlAbt(candidate,actor,"submission") * 1) + (rLvlAbt(candidate,actor,"rivalry") * -3)
								  + (rLvlAbt(candidate,actor,"enmity") * -10)) * getCharacterStatScore(candidate);
			if ( gC(socialAi.charKey).subChars.includes(candidate) ) {
				currentCandidateScore += 5;
			}
			if ( currentCandidateScore > currentTargetScore ) {
				romanceTargetId = i;
				currentTargetScore = currentCandidateScore;
			}
		}
		i++;
	}
	var romanceTargetKey = getCandidatesKeysArray()[romanceTargetId];
	if ( currentTargetScore == 0 ) {
		romanceTargetKey = randomFromList(arrayMinusA(getCandidatesKeysArray(),socialAi.charKey));
	}
	
	// Set "friendly" , "rivalry" or "romance" strategy
	for ( var candidate of arrayMinusA(getCandidatesKeysArray(),actor) ) {
		var friendlyScore = (rLvlAbt(candidate,actor,"friendship") * 1) + (rLvlAbt(candidate,actor,"sexualTension") * 1)
								  + (rLvlAbt(candidate,actor,"romance") * 1);
		var enemyScore = (rLvlAbt(candidate,actor,"rivalry") * 2) + (rLvlAbt(candidate,actor,"enmity") * 2);
		if ( friendlyScore > enemyScore ) {
			socialAi[candidate].strategy = "friendly";
		} else {
			socialAi[candidate].strategy = "rivalry";
			socialAi[candidate].weight = 2;
		}
	}
	socialAi[romanceTargetKey].strategy = "romance";
	socialAi[romanceTargetKey].weight = 20;
}

window.getSocialStrategyAgainstTarget = function(socialAi,target) {
	var strategy = "friendly";
	if ( socialAi.hasOwnProperty(target) ) {
		strategy = socialAi[target].strategy;
	}
	return strategy;
}
window.getSocialPriorityAgainstTarget = function(socialAi,target) {
	var priority = 1;
	if ( socialAi.hasOwnProperty(target) ) {
		priority = socialAi[target].weight;
	}
	return priority;
}

// Constructors, serializers, etc.
NpcSocialAi.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
NpcSocialAi.prototype.clone = function () {
	return (new NpcSocialAi())._init(this);
};
NpcSocialAi.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new NpcSocialAi())._init($ReviveData$)', ownData);
};

////////// RELATIONSHIP-GOALS CLASS //////////

window.relationshipGoal = function(actor,target) {
	this.actor = actor;
	this.target = target;
	this.weight = 10;
	this.strategy = "friendly";
};

// Constructors, serializers, etc.
relationshipGoal.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
relationshipGoal.prototype.clone = function () {
	return (new relationshipGoal())._init(this);
};
relationshipGoal.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new relationshipGoal())._init($ReviveData$)', ownData);
};


window.feedCandidatesRelationshipGoals = function() {
	var candidates = [ "chNash", "chMir", "chVal", "chAte", "chClaw" ];
	var allCandidates = candidates.concat(["chPlayerCharacter"]);
	
	for ( var candidate of candidates ) {
		for ( var targetCandidate of allCandidates ) {
			if ( candidate != targetCandidate ) {
				gC(candidate).socialAi.stablishRelationshipGoal(targetCandidate);
			}
		}
	}
}


