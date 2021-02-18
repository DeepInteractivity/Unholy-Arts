
///// Some auxiliar functions /////
	// Pseudo-global variables used by NpcGlobalAi. 
window.gBarLowThreshold = function() { return 0.25; }
window.gBarMediumThreshold = function() { return 0.5; }
window.gBarHighThreshold = function() { return 0.75; }


////////// NPC-GLOBAL-AI CLASS //////////

window.NpcGlobalAi = function(charKey) {
	this.charKey = charKey;
	this.type = "static";
	
	this.getMission = function() {
		return [];
	}
	
	this.generateMissionChoices = function() {
		return [];
	}
	
	this.generalEvaluations = function() {
		return true;
	}
};

window.createCandidateGlobalAi = function(charKey) {
	var globalAi = new NpcGlobalAi(charKey);
	globalAi.type = "candidateTemple";
	globalAi.attackedToday = false;
	
	globalAi.generalEvaluations = function() {
		// Get followers
		if ( gSettings().followingAllowed ) {
			charactersGetsForcedFollowers(this.charKey);
			var dangerProportion = this.evaluateDangerState();
			if ( dangerProportion != 0 ) {
				if ( dangerProportion > 2.3 ) {
					// Case 1: Danger way too high, follow someone
					if ( this.findBestCharToFollow() == false ) {
						// Try following someone at least
						this.findBestFollower();
					}
				} else if ( dangerProportion > 1.1 ) {
					// Case 2: Danger too high, get a follower
					if ( this.findBestFollower() == false ) {
						// Try following someone at least
						this.findBestCharToFollow();
					}
				} else if ( dangerProportion < 0.52 ) {
					// Case 3: Danger too low, if has non-essential followers, drop one
					this.findBestCharToLeave();
				}
			}
		}
		// Join assaults
		if ( gSettings().assaultingAllowed ) {
			var joinedChar = considerPossibleAssaults(this.charKey);
			
			if ( joinedChar != "" ) {
				addCharsTeamToCharsBattle(this.charKey,joinedChar);
				gC(this.charKey).mapAi.signActive();
				gC(this.charKey).mapAi.goalsList = [];
			}
		}
		return true;
	}
	globalAi.evaluateDangerState = function() {
		// The Candidate evaluates their situation in the training/socialization period and potential danger from other Candidates
		var dangerProportion = 0; // Fraction that determines how powerful is the most dangerous Candidate in comparison to self
		var aggressiveCandidates = []; // Find Candidates who have accumulated a certain amount of infamy
		for ( var charKey of getCandidatesKeysArray() ) {
			if ( charKey != this.charKey ) {
				if ( gC(charKey).infamy > 5 ) {
					aggressiveCandidates.push(charKey);
				}
			}
		}
		if ( aggressiveCandidates.length > 0 ) {
			var selfStrength = quantifyCharactersGroupStrength(this.charKey); // Strength of this character's group
			var mostDangerousStrength = 0; // Find strength of most dangerous enemy
			var currentEvaluation = 0;
			for ( var charKey of aggressiveCandidates ) {
				if ( gC(charKey).followingTo == "" ) {
					currentEvaluation = quantifyCharactersGroupStrength(charKey);
					if ( currentEvaluation > mostDangerousStrength ) {
						mostDangerousStrength = currentEvaluation;
					}
				}
			}
			if ( mostDangerousStrength > 0 ) {
				dangerProportion = mostDangerousStrength / selfStrength;
			}
		}
		return dangerProportion;
	}
	globalAi.findBestFollower = function() {
		var foundFollower = false;
		var potentialFollowers = [];
		var currentRoom = gC(this.charKey).currentRoom;
		var charsInRoom = getRoomA(currentRoom).characters;
		for ( var charKey of charsInRoom ) { // Find potential followers
			if ( charKey != this.charKey && gC(charKey).followingTo == "" && gC(charKey).followedBy.length == 0 ) {
				potentialFollowers.push(charKey);
			}
		}
		if ( potentialFollowers.length > 0 ) { // Find best follower
			var currentChoice = "";
			var currentBestScore = -10;
			for ( var potFollower of potentialFollowers ) {
				var favor = rFavor(potFollower,this.charKey);
				var infamy = gC(potFollower).infamy;
				var relation = rLvlAbt(this.charKey,potFollower,"friendship") + rLvlAbt(this.charKey,potFollower,"romance") * 2 - rLvlAbt(this.charKey,potFollower,"enmity") * 3;
				var currentScore = favor - infamy + relation;
				if ( currentScore > currentBestScore ) {
					currentBestScore = currentScore;
					currentChoice = potFollower;
				}
			}
			if ( currentChoice != "" ) { // Ask to follow
				foundFollower = npcProposalFollowMe(this.charKey,currentChoice);
			}
		}
		return foundFollower;
	}
	
	globalAi.findBestCharToFollow = function() {
		var foundFollowed = false;
		var potentialFolloweds = [];
		var currentRoom = gC(this.charKey).currentRoom;
		var charsInRoom = getRoomA(currentRoom).characters;
		for ( var charKey of charsInRoom ) { // Find potential followeds
			if ( charKey != this.charKey && gC(charKey).followingTo == "" ) {
				potentialFolloweds.push(charKey);
			}
		}
		if ( potentialFolloweds.length > 0 ) { // Find best followed
			var currentChoice = "";
			var currentBestScore = -5;
			for ( var potFollowed of potentialFolloweds ) {
				var infamy = gC(potFollowed).infamy * 2;
				var relation = rLvlAbt(this.charKey,potFollowed,"friendship") + rLvlAbt(this.charKey,potFollowed,"romance") * 2 - rLvlAbt(this.charKey,potFollowed,"enmity") * 3;
				var currentScore = - infamy + relation;
				if ( currentScore > currentBestScore ) {
					currentBestScore = currentScore;
					currentChoice = potFollowed;
				}
			}
			if ( currentChoice != "" ) { // Ask to follow
				foundFollowed = npcProposalFollowYou(this.charKey,currentChoice);
			}
		}
		return foundFollowed;
	} 
	globalAi.findBestCharToLeave = function() {
		var leftFollower = false;
		var potentialUnfollowers = [];
		for ( var charKey of gC(this.charKey).followedBy ) {
			if ( gC(charKey).followingForDebt ) {
				potentialUnfollowers.push(charKey);
			}
		}
		if ( potentialUnfollowers.length > 0 ) {
			leftFollower = npcProposalUnfollowMe(this.charKey,potentialUnfollowers[0]);
		}
		
		return leftFollower;
	}	
		
	globalAi.generateRestMissionChoice = function() {
		var mChoice = cRestMissionChoice(this.charKey);
		
		mChoice.weight = 1;
		if ( gC(this.charKey).lust.current < ( gC(this.charKey).lust.max * gBarLowThreshold() ) ) { mChoice.weight *= 10; }
		if ( gC(this.charKey).willpower.current < ( gC(this.charKey).willpower.max * gBarLowThreshold() ) ) { mChoice.weight *= 10; }
		if ( gC(this.charKey).energy.current < ( gC(this.charKey).energy.max * gBarLowThreshold() ) ) { mChoice.weight *= 10; }
		if ( gC(this.charKey).socialdrive.current < ( gC(this.charKey).socialdrive.max * gBarLowThreshold() ) ) { mChoice.weight *= 10; }
		
		return mChoice;
	}
	globalAi.generateTrainingChoices = function(charKey) {
		return [cTrainAgilityMissionChoice(charKey),cTrainCharismaMissionChoice(charKey),cTrainEmpathyMissionChoice(charKey),
				cTrainIntelligenceMissionChoice(charKey),cTrainLuckMissionChoice(charKey),cTrainPerceptionMissionChoice(charKey),
				cTrainPhysiqueMissionChoice(charKey),cTrainResilienceMissionChoice(charKey),cTrainWillMissionChoice(charKey)];
	}
	globalAi.generateSocializationChoices = function() {
		var mChoices = [];
		// Choose target
		var charsOnMap = getCurrentMap().characters;
		charsOnMap = arrayMinusA(charsOnMap,this.charKey);
		var weightedChars = listIntoWeightedList(charsOnMap);
		for ( var wItem in weightedChars ) {
			if ( weightedChars[wItem] instanceof weightedElement ) {
				weightedChars[wItem].w = getSocialPriorityAgainstTarget(gC(this.charKey).socialAi,weightedChars[wItem].content);
			}
		}
		var selectedChar = randomFromWeightedList(weightedChars);	

		// Find servants
		var subChars = gC(this.charKey).subChars;
		
		// Generic socialization mission choice
				
		var mChoice = cSocializationGoalsMissionChoice(this.charKey,selectedChar);
		
		// Weighted
		mChoice.weight = 5 + gC(this.charKey).dPleasure.level * 1 + gC(this.charKey).dLove.level * 1 + gC(this.charKey).dCooperation.level * 1;
		  // Higher weight if not training period
		if ( State.variables.simCycPar.templeDayPeriod != "training" ) {
			mChoice.weight += 5;
			mChoice.weight += gC(this.charKey).dPleasure.level * ( 5 + gC(this.charKey).daysWithoutSex ) + gC(this.charKey).dLove.level * 5 + gC(this.charKey).dCooperation.level * 5;
		}
		  // Lesser weight if character is angry or bored
		mChoice.weight -= (gC(this.charKey).mood.angry + (gC(this.charKey).mood.bored * 0.5));
		if ( mChoice.weight < 0 ) { mChoice.weight = 0; }
		if ( gC(this.charKey).socialdrive.current < 40 ) {
			mChoice.weight = 0;
		}
		
		mChoice.weight -= ( gC(this.charKey).mood.angry + gC(this.charKey).mood.bored >= 25 );
		
		if ( mChoice.weight != 0 ) { mChoices.push(mChoice); }
		
		// Socialize with servant mission choice
		if ( subChars.length > 0 ) {
			var mChoice2 = cSocializationGoalsMissionChoice(this.charKey,randomFromList(subChars));
			if ( State.variables.simCycPar.templeDayPeriod != "training" ) {
				mChoice2.weight = 20 + gC(this.charKey).daysWithoutSex * ( 20 + gC(this.charKey).dPleasure.level * 10 );
			} else { mChoice2.weight = 0; }
			mChoices.push(mChoice2);
		}
		return mChoices;
	}
	globalAi.generateScrollsChoices = function() {
		var choices = [];
		if ( State.variables.simCycPar.templeDayPeriod != "training" ) {
			var choiceSearch = cSearchScrollsMissionChoice(this.charKey);
			var choiceStudy = cStudyScrollMissionChoice(this.charKey);
			if ( choiceSearch.isValid() ) {
				choiceSearch.weight = 40;
				choices.push(choiceSearch);
			}
			if ( choiceStudy.isValid() ) {
				choiceStudy.weight = 60;
				choices.push(choiceStudy);
			}
		}
		
		return choices;
	}
	
	globalAi.generateCombatChoices = function() {
		var choices = [];
		
		if ( gSettings().challengingAllowed || gSettings().assaultingAllowed ) {
			var selfStrength = quantifyCharactersGroupStrength(this.charKey);
			var potentialTargets = [];
			for ( var cK of getCandidatesKeysArray() ) {
				if ( cK != this.charKey && gC(cK).followingTo == "" ) {
					if ( quantifyCharactersGroupStrength(cK) < quantifyCharactersGroupStrength(this.charKey) * 1.1 ) {
						potentialTargets.push(cK);
					}
				}
			}
			var selectedTarget = "";
			var highestScore = -1000;
			for ( var posTarget of potentialTargets ) {
				var currentScore = (selfStrength / quantifyCharactersGroupStrength(posTarget)) * 20 + gC(posTarget).infamy + limitedRandomInt(15)
								 + rLvlAbt(this.charKey,posTarget,"rivalry") * 2;
				if ( currentScore > highestScore ) {
					highestScore = currentScore;
					selectedTarget = posTarget;
				}
			}
			if ( selectedTarget != "" ) {
				var mChoice1 = cChallengeGoalsMissionChoice(this.charKey,selectedTarget);
				var mChoice2 = cAssaultGoalsMissionChoice(this.charKey,selectedTarget);
				
				// WEIGHT WEIGHTS
				if ( State.variables.simCycPar.templeDayPeriod != "training" ) {
					mChoice1.weight += 10 + gC(this.charKey).dAmbition.level * 6 + gC(this.charKey).dImprovement.level * 3;
					mChoice2.weight += 10 + gC(this.charKey).dAmbition.level * 3 + gC(this.charKey).dDomination.level * 6;
				}
				mChoice2.weight -= gC(this.charKey).infamy;
				
				var generalWeightMult = 0.2;
				mChoice1.weight *= generalWeightMult * 2;
				mChoice2.weight *= generalWeightMult;
				
				if ( this.attackedToday ) {
					mChoice1.weight *= 0.1;
					mChoice2.weight *= 0.1;
				}
				
				if ( mChoice1.weight < 0 ) { mChoice1.weight = 0; }
				if ( mChoice2.weight < 0 ) { mChoice2.weight = 0; }
				choices.push(mChoice1);
				choices.push(mChoice2);
			}
		}
		
		return choices;
	}
	
	globalAi.generateMissionChoices = function() {
		var mChoices = [];
		
		// Training
		for ( var choice of this.generateTrainingChoices(this.charKey) ) {
			mChoices.push(choice);
		}
		mChoices.push(this.generateRestMissionChoice());
		for ( var choice of this.generateSocializationChoices(this.charKey) ) {
			mChoices.push(choice);
		}
		for ( var choice of this.generateScrollsChoices(this.charKey) ) {
			mChoices.push(choice);
		}
		if ( gSettings().followingAllowed ) {
			for ( var choice of this.generateCombatChoices(this.charKey) ) {
				mChoices.push(choice);
			}
		}
		
		return mChoices;
	}
	globalAi.purgeChoicesAtLowBars = function(choices) {
		var nChoices = [];
		for ( var choice of choices ) {
			for ( var rBar of choice.reqBars ) {
				if ( gC(this.charKey)[rBar].current < gC(this.charKey)[rBar].max * 0.2 ) {
					// Purge choice if the character has any of its required bars below 20% of the required value
					choice.weight = 0;
				}
			}
			if ( choice.weight > 0 ) {
				nChoices.push(choice);
			}
		}
		return nChoices;
	}
	globalAi.getWeightedRandomMissionChoices = function(choices) {
		
		var wList = new weightedList();
		var i = 0;
		var result = null;
		if ( choices.length > 0 ) {
			for ( var choice of choices ) {
				wList[i] = new weightedElement(i,choice.weight);
				i++;
			}
			result = choices[randomFromWeightedList(wList)];
			if ( result == "errorWList" ) { result = null; }
		}
		return result;
	}
	globalAi.getMission = function() {
		var choices = this.generateMissionChoices();
		choices = this.purgeChoicesAtLowBars(choices);
		var choice = this.getWeightedRandomMissionChoices(choices);
		
		return choice.getCommandsList(this.charKey);
	}
	
	return globalAi;
}

// Constructors, serializers, etc.
NpcGlobalAi.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
NpcGlobalAi.prototype.clone = function () {
	return (new NpcGlobalAi())._init(this);
};
NpcGlobalAi.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new NpcGlobalAi())._init($ReviveData$)', ownData);
};

////////// SELF-EVALUATION //////////
// A few functions that allow a character to evaluate their own situation, consider dangers and determine safety requirements

////////// GLOBAL-AI MISSION-CHOICE CLASS //////////

window.missionChoice = function(title) {
	// General data about the mission type. These are selected and used by globalAi to understand details about the mission type.
	// They also contain references to the functions that create the missions themselves.
	this.title = title;
	this.weight = 10;
	this.reqBars = [];
	this.tags = [];
	this.isValid = function() {
		return true;
	}
	this.getCommandsList = function() {
		return [];
	}
};

	// Training
window.cTrainPhysiqueMissionChoice = function(character) {
	var mChoice = new missionChoice("trainPhysique");
	mChoice.reqBars.push("energy");
	mChoice.tags = ["physique"];
	mChoice.isValid = function() {
		// Return valid if at least one action in map allows training of physique
		return ( getAllActionsOnMapThat(getCurrentMap(),getCharGroup(character),function(action) { return action.tags.includes("physique"); }).length > 0 );		
	}
	mChoice.getCommandsList = function() {
		return cMissionActionTag(getCurrentMap(),getCharGroup(character),"physique");
	}
	mChoice.weight = 5 + gC(character).dImprovement.level * 7 + gC(character).dAmbition.level * 2;
	return mChoice;
}
window.cTrainAgilityMissionChoice = function(character) {
	var mChoice = new missionChoice("trainAgility");
	mChoice.reqBars.push("energy");
	mChoice.tags = ["agility"];
	mChoice.isValid = function() {
		// Return valid if at least one action in map allows training of physique
		return ( getAllActionsOnMapThat(getCurrentMap(),getCharGroup(character),function(action) { return action.tags.includes("agility"); }).length > 0 );		
	}
	mChoice.getCommandsList = function() {
		return cMissionActionTag(getCurrentMap(),getCharGroup(character),"agility");
	}
	mChoice.weight = 5 + gC(character).dImprovement.level * 7 + gC(character).dAmbition.level * 2;
	return mChoice;
}
window.cTrainResilienceMissionChoice = function(character) {
	var mChoice = new missionChoice("trainResilience");
	mChoice.reqBars.push("energy");
	mChoice.tags = ["resilience"];
	mChoice.isValid = function() {
		// Return valid if at least one action in map allows training of physique
		return ( getAllActionsOnMapThat(getCurrentMap(),getCharGroup(character),function(action) { return action.tags.includes("resilience"); }).length > 0 );		
	}
	mChoice.getCommandsList = function() {
		return cMissionActionTag(getCurrentMap(),getCharGroup(character),"resilience");
	}
	mChoice.weight = 5 + gC(character).dImprovement.level * 7 + gC(character).dAmbition.level * 2;
	return mChoice;
}
window.cTrainWillMissionChoice = function(character) {
	var mChoice = new missionChoice("trainWill");
	mChoice.reqBars.push("willpower");
	mChoice.tags = ["will"];
	mChoice.isValid = function() {
		// Return valid if at least one action in map allows training of physique
		return ( getAllActionsOnMapThat(getCurrentMap(),getCharGroup(character),function(action) { return action.tags.includes("will"); }).length > 0 );		
	}
	mChoice.getCommandsList = function() {
		return cMissionActionTag(getCurrentMap(),getCharGroup(character),"will");
	}
	mChoice.weight = 5 + gC(character).dImprovement.level * 7 + gC(character).dAmbition.level * 2;
	return mChoice;
}
window.cTrainIntelligenceMissionChoice = function(character) {
	var mChoice = new missionChoice("trainIntelligence");
	mChoice.reqBars.push("willpower");
	mChoice.tags = ["intelligence"];
	mChoice.isValid = function() {
		// Return valid if at least one action in map allows training of physique
		return ( getAllActionsOnMapThat(getCurrentMap(),getCharGroup(character),function(action) { return action.tags.includes("intelligence"); }).length > 0 );		
	}
	mChoice.getCommandsList = function() {
		return cMissionActionTag(getCurrentMap(),getCharGroup(character),"intelligence");
	}
	mChoice.weight = 5 + gC(character).dImprovement.level * 7 + gC(character).dAmbition.level * 2;
	return mChoice;
}
window.cTrainPerceptionMissionChoice = function(character) {
	var mChoice = new missionChoice("trainPerception");
	mChoice.reqBars.push("willpower");
	mChoice.tags = ["perception"];
	mChoice.isValid = function() {
		// Return valid if at least one action in map allows training of physique
		return ( getAllActionsOnMapThat(getCurrentMap(),getCharGroup(character),function(action) { return action.tags.includes("percetion"); }).length > 0 );		
	}
	mChoice.getCommandsList = function() {
		return cMissionActionTag(getCurrentMap(),getCharGroup(character),"perception");
	}
	mChoice.weight = 5 + gC(character).dImprovement.level * 7 + gC(character).dAmbition.level * 2;
	return mChoice;
}
window.cTrainEmpathyMissionChoice = function(character) {
	var mChoice = new missionChoice("trainEmpathy");
	mChoice.reqBars.push("socialdrive");
	mChoice.tags = ["empathy"];
	mChoice.isValid = function() {
		// Return valid if at least one action in map allows training of physique
		return ( getAllActionsOnMapThat(getCurrentMap(),getCharGroup(character),function(action) { return action.tags.includes("empathy"); }).length > 0 );		
	}
	mChoice.getCommandsList = function() {
		return cMissionActionTag(getCurrentMap(),getCharGroup(character),"empathy");
	}
	mChoice.weight = 5 + gC(character).dImprovement.level * 7 + gC(character).dAmbition.level * 2;
	return mChoice;
}
window.cTrainCharismaMissionChoice = function(character) {
	var mChoice = new missionChoice("trainCharisma");
	mChoice.reqBars.push("socialdrive");
	mChoice.tags = ["charisma"];
	mChoice.isValid = function() {
		// Return valid if at least one action in map allows training of physique
		return ( getAllActionsOnMapThat(getCurrentMap(),getCharGroup(character),function(action) { return action.tags.includes("charima"); }).length > 0 );		
	}
	mChoice.getCommandsList = function() {
		return cMissionActionTag(getCurrentMap(),getCharGroup(character),"charisma");
	}
	mChoice.weight = 5 + gC(character).dImprovement.level * 7 + gC(character).dAmbition.level * 2;
	return mChoice;
}
window.cTrainLuckMissionChoice = function(character) {
	var mChoice = new missionChoice("trainLuck");
	mChoice.tags = ["luck"];
	mChoice.isValid = function() {
		// Return valid if at least one action in map allows training of physique
		return ( getAllActionsOnMapThat(getCurrentMap(),getCharGroup(character),function(action) { return action.tags.includes("luck"); }).length > 0 );		
	}
	mChoice.getCommandsList = function() {
		return cMissionActionTag(getCurrentMap(),getCharGroup(character),"luck");
	}
	mChoice.weight = 5 + gC(character).dImprovement.level * 7 + gC(character).dAmbition.level * 2;
	return mChoice;
}

	// Rest
window.cRestMissionChoice = function(character) {
	var mChoice = new missionChoice("rest");
	mChoice.tags = ["rest"];
	mChoice.isValid = function() {
		// Return valid if at least one action in map allows to rest
		return ( getAllActionsOnMapThat(getCurrentMap(),getCharGroup(character),function(action) { return action.tags.includes("rest"); }).length > 0 );		
	}
	mChoice.getCommandsList = function() {
		return cMissionActionTag(getCurrentMap(),getCharGroup(character),"rest");
	}
	return mChoice;
}

	// Scrolls
window.cSearchScrollsMissionChoice = function(character) {
	var mChoice = new missionChoice("searchScrolls");
	mChoice.tags = ["searchScrolls"];
	mChoice.isValid = function() {
		var flagValid = false;
		// If character may find at least one scroll and there's a room that allows searching for scrolls, it's valid
		if ( getScrollsCharMayFind(character).length > 0 ) {
			if ( getAllActionsOnMapThat(getCurrentMap(),getCharGroup(character),function(action) { return action.tags.includes("searchScrolls"); }).length > 0 ) {
				flagValid = true;
			}
		}
		return flagValid;
	}
	mChoice.getCommandsList = function() {
		return cMissionActionTag(getCurrentMap(),getCharGroup(character),"searchScrolls");
	}
	return mChoice;
}
window.cStudyScrollMissionChoice = function(character) {
	var mChoice = new missionChoice("studyScroll");
	mChoice.tags = ["studyScroll"];
	mChoice.isValid = function() {
		var flagValid = false;
		// If character may study at least one scroll and there's a room that allows studying scrolls, it's valid
		if ( (gC(character).studiedScrolls.length < gC(character).foundScrolls.length) && (gC(character).studiedScrollToday == false) ) {
			if ( getAllActionsOnMapThat(getCurrentMap(),getCharGroup(character),function(action) { return action.tags.includes("studyScroll"); }).length > 0 ) {
				flagValid = true;
			}
		}
		return flagValid;
	}
	mChoice.getCommandsList = function() {
		return cMissionActionTag(getCurrentMap(),getCharGroup(character),"studyScroll");
	}
	return mChoice;
}

	// Socialization
window.cSocializationGoalsMissionChoice = function(character,targetCharacter) {
	var mChoice = new missionChoice("socializationGoals");
	mChoice.isValid = function() {
		return ( getCurrentMap().characters.includes(targetCharacter) );
	}
	mChoice.getCommandsList = function() {
		return cMissionPursueAndTalkTo(getCurrentMap(),getCharGroup(character),targetCharacter);
	}
	return mChoice;
}

	// Combat
window.cChallengeGoalsMissionChoice = function(character,targetCharacter) {
	var mChoice = new missionChoice("challengeSomeone");
	mChoice.isValid = function() {
		var isValid = false;
		if ( getCurrentMap().character.includes(targetCharacter) && isChallengePossible(character,targetCharacter) ) {
			isValid = true;
		}
		return isValid;
	}
	mChoice.getCommandsList = function() {
		return cMissionPursueAndAssault(getCharGroup(character),targetCharacter);
	}
	return mChoice;
}
window.cAssaultGoalsMissionChoice = function(character,targetCharacter) {
	var mChoice = new missionChoice("assaultSomeone");
	mChoice.isValid = function() {
		var isValid = false;
		if ( getCurrentMap().character.includes(targetCharacter) && isAssaultPossible(character,targetCharacter) ) {
			isValid = true;
		}
		return isValid;
	}
	mChoice.getCommandsList = function() {
		return cMissionPursueAndChallenge(getCharGroup(character),targetCharacter);
	}
	return mChoice;
}

	// Join assault
window.considerPossibleAssaults = function(charKey) {
	var joinedChar = "";
	var potentialTargets = [];		
	var potentialTargetsValues = [];
	
	// Find potential targets
	var currentRoom = gC(charKey).currentRoom;
	var charsInRoom = getRoomA(currentRoom).characters;
	for ( var target of charsInRoom ) {
		if ( target != charKey && gC(target).followingTo == "" ) {
			var sEvent = getCharsActiveEvent(target);
			if ( mayBattleBeJoinedByChar(sEvent,charKey) ) {
				potentialTargets.push(target);
			}
		}
	}
	
	// Assign score to join assault
	var requiredScore = 5 + gC(charKey).dImprovement.level * 2 + gC(charKey).dDomination.level * 2 - gC(charKey).dAmbition.level - gC(charKey).dCooperation.level * 3 + quantifyCharacterTiredness(charKey) * 5;
	
	// Assign scores to potential targets
	var i = 0;
	for ( var pt of potentialTargets ) {
		potentialTargetsValues.push(assignValueToAssaultChoice(charKey,pt));
		//pt.value = assignValueToAssaultChoice(charKey,pt);
	}
	
	// Get highest score
	var highestScore = -1;
	var chosenTarget = "";
	for ( var pt of potentialTargets ) {
		if ( highestScore < potentialTargetsValues[i] ) {
			highestScore = potentialTargetsValues[i];
			chosenTarget = pt;
		}
		i++;
	}
	
	// If highest score is higher than assigned score, return corresponding char
	if ( highestScore > requiredScore ) {
		if ( chosenTarget != "" ) {
			joinedChar = chosenTarget;
		}
	}
	
	return joinedChar;
}
window.assignValueToAssaultChoice = function(consideringChar,consideredChar) {
	// This function assumes that considered char is in an assault event
	var opposingChar = "";
	var handicap = 0;
	var sEvent = getCharsActiveEvent(consideredChar);
	var flagIsTargetAttacking = false;
	if ( sEvent.charactersTeamA[0] == consideredChar ) {
		flagIsTargetAttacking = true;
		opposingChar = sEvent.charactersTeamB[0];
		handicap = -10;
	} else {
		opposingChar = sEvent.charactersTeamA[0];
	}
	return ( assignValueToCharInAssault(consideringChar,consideredChar) + assignValueToCharInAssault(consideringChar,opposingChar) + handicap );
}
window.assignValueToCharInAssault = function(consideringChar,consideredChar) {
	var result = 0;
	var strengthDifference = quantifyCharacterStats(consideringChar) - quantifyCharacterStats(consideredChar); // More likely to help weaker characters
	var relationFactor = rLvlAbt(consideringChar,consideredChar,"friendship") * 1 + rLvlAbt(consideringChar,consideredChar,"romance") * 2
						+ rLvlAbt(consideringChar,consideredChar,"sexualTension") * 1 + rLvlAbt(consideringChar,consideredChar,"domination") * 1
						+ rLvlAbt(consideringChar,consideredChar,"submission") * 1 - rLvlAbt(consideringChar,consideredChar,"rivalry") * 2
						- rLvlAbt(consideringChar,consideredChar,"enmity") * 4;
	var infamyFactor = gC(consideredChar).infamy * -1;
	var meritFactor = gC(consideringChar).merit - gC(consideredChar).merit;
	if ( meritFactor > 0 ) { meritFactor = 0; }
	result = strengthDifference + relationFactor + infamyFactor;
	return result;
}

// Constructors, serializers, etc.
missionChoice.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
missionChoice.prototype.clone = function () {
	return (new missionChoice())._init(this);
};
missionChoice.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new missionChoice())._init($ReviveData$)', ownData);
};

// Auxiliars

window.quantifyCharacterVacuumStrength = function(charKey) {
	var str = 0;
	for ( var cStat of getStatNamesArray() ) {
		str += gCstat(charKey,cStat);
	}
	return str;
}
window.quantifyAverageCandidateVacuumStrength = function() {
	var aveStr = 0;
	for ( var charKey of getCandidatesKeysArray() ) {
		aveStr += quantifyCharacterVacuumStrength(charKey);
	}
	aveStr = aveStr / 6;
	return aveStr;
}

window.quantifyCharacterStats = function(charKey) {
	var str = 0;
	for ( var cStat of getStatNamesArray() ) {
		str += gCstat(charKey,cStat);
	}
	return str;
}
window.quantifyCharacterStrength = function(charKey) {
	var str = 0;
	for ( var cStat of getStatNamesArray() ) {
		str += gCstat(charKey,cStat);
	}
	if ( gC(charKey).willpower.current < 30 ) {
		str *= 0.95;
	}
	if ( gC(charKey).willpower.current < 10 ) {
		str *= 0.9;
	}
	if ( gC(charKey).energy.current < 30 ) {
		str *= 0.95;
	}
	if ( gC(charKey).energy.current < 10 ) {
		str *= 0.9;
	}
	if ( gC(charKey).socialdrive.current < 30 ) {
		str *= 0.95;
	}
	if ( gC(charKey).socialdrive.current < 10 ) {
		str *= 0.95;
	}
	str *= gC(charKey).lust.current * 0.01;
	return str;
}
window.quantifyCharactersGroupStrength = function(charKey) {
	var str = 0;
	for ( var charKey of getCharGroup(charKey) ) {
		str += quantifyCharacterStrength(charKey);
	}
	return str;
}
window.proportionQuantifiedCharactersStrength = function(charA,charB) {
	var proportion = quantifyCharacterStrength(charA) / quantifyCharacterStrength(charB);
	return proportion;
}

window.quantifyCharacterTiredness = function(charKey) {
						// ( Bar max - bar current ) / bar max ; if bar current == Result is 0 -> 1 ; if bar current == max -> Result is 0
	var tiredness = 0 + ((gC(charKey).lust.max - gC(charKey).lust.current) / gC(charKey).lust.max) +
						((gC(charKey).energy.max - gC(charKey).energy.current) / gC(charKey).energy.max) / 3 +
						((gC(charKey).willpower.max - gC(charKey).willpower.current) / gC(charKey).willpower.max) / 3 +
						((gC(charKey).socialdrive.max - gC(charKey).socialdrive.current) / gC(charKey).socialdrive.max) / 3;
	return tiredness;
}

// General evaluations auxiliar functions

window.charactersGetsForcedFollowers = function(charKey) {
	var currentRoom = gC(charKey).currentRoom;
	var charsInRoom = getRoomA(currentRoom).characters;
	for ( var target of charsInRoom ) {
		if ( target != charKey && gC(target).followingTo == "" ) {
			var relType = gRelTypeAb(target,charKey);
			if ( relType != null ) {
				if ( relType.forcedToFollow == true ) {
					// Target character's relationship forces them to follow
					npcProposalFollowMe(charKey,target);
				}
			}
		}
	}
}
