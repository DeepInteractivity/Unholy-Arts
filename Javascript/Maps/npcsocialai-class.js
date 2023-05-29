
////////// NPC-GLOBAL-AI CLASS //////////

window.NpcSocialAi = function(charKey) {
	this.charKey = charKey
	// Targets
	this.allyTs = [];
	this.loveTs = [];
	this.covetTs = [];
	this.conquestTs = [];
	this.rivalTs = [];
};

window.isTargetInActorsTsType = function(target,actor,tType) {
	var result = false;
	if ( gC(actor).socialAi != undefined ) {
		if ( gC(actor).socialAi[tType].includes(target) ) {
			result = true;
		}
	}
	return result;
}
window.isTargetInActorsTsTypes = function(target,actor,tTypes) {
	var result = false;
	if ( gC(actor).socialAi != undefined ) {
		for ( var tType of tTypes ) {
			if ( gC(actor).socialAi[tType].includes(target) ) {
				result = true;
			}
		}
	}
	return result;
}

	// Methods
NpcSocialAi.prototype.stablishRelationshipGoal = function(target) {
		this[target] = new relationshipGoal(this.charKey,target);
	}
	
	// Choose social interaction in SIS
NpcSocialAi.prototype.chooseSISinteraction = function(target,interactionsList) {
		var wInteractionslist = listIntoWeightedList(interactionsList);
		for ( var wItem in wInteractionslist ) {
			
			if ( wInteractionslist[wItem] instanceof weightedElement ) {
				wInteractionslist[wItem].w = this.assignWeightToInteraction(target,wInteractionslist[wItem].content);
			}
		}
		var chosenInteraction = randomFromWeightedListPercentThreshold(wInteractionslist,0.3);
		//var chosenInteraction = randomFromWeightedList(wInteractionslist);
		return chosenInteraction;
	}

NpcSocialAi.prototype.assignWeightToInteraction = function(target,interactionKey) {
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

NpcSocialAi.prototype.getInterRoundBehavior = function(sis) {
		var choice = "none";
		var target = "";
		var extra = null;
		var flagSkipSexAttempts = false;
		
		// Characters following someone shouldn't be able to propose sex or leave SIS on their own
		if ( gC(this.charKey).followingTo == "" ) {
			// Checks not directly tied to specific missions
			for ( var cK of sis.charList ) {
				// Intimate relationship
				if ( gC(this.charKey).socialAi.loveTs.includes(cK) ) {
					if ( setup.sistDB[setup.sistType.companionship].isPossible(this.charKey,cK) ) {
						if ( setup.sistDB[setup.sistType.companionship].isSuccessful(this.charKey,cK)[0] && setup.sistDB[setup.sistType.companionship].isSuccessful(cK,this.charKey)[0] ) {
							choice = setup.sistType.intimacy;
							target = cK;
						}
					}
				}
			}
		
			if ( choice == "none" ) {
				// Get alliance
				if ( gC(this.charKey).mission == "getAlliance" ) {
					var validTarget = "";
					for ( var chKey of sis.charList ) {
						if ( gC(this.charKey).socialAi.allyTs.includes(chKey) || gC(this.charKey).socialAi.loveTs.includes(chKey) ) {
							if ( setup.sistDB[setup.sistType.companionship].isSuccessful(this.charKey,chKey)[0] ) {
								validTarget = chKey;
							}
						}
					}
					if ( validTarget != "" ) {
						target = validTarget;
						choice = setup.sistType.companionship;
					}
				}
				// Transformations
				else if ( gC(this.charKey).mission == "transformSelf" || gC(this.charKey).mission == "transformSub" ) {
					var transformersInConv = [];
					for ( var ch of getValidTfActors() ) {
						if ( sis.charList.includes(ch) ) { transformersInConv.push(ch); }
					}
					if ( transformersInConv.length > 0 ) {
						var chosenTransformer = randomFromList(transformersInConv);
						// Transform self
						if ( gC(this.charKey).mission == "transformSelf" ) {
							flagSkipSexAttempts = true;
							if ( (setup.sistDB[setup.sistType.transformSelf].isSuccessful(this.charKey,chosenTransformer)[0]) ) {
								choice = setup.sistType.transformSelf;
								target = chosenTransformer;
							}
						}
						// Transform sub
						else if ( gC(this.charKey).mission == "transformSub" ) {
							var tfTarget = gC(this.charKey).missionExtra;
							if ( tfTarget != undefined ) {
								if ( sis.charList.includes(tfTarget) && gC(this.charKey).followedBy.includes(tfTarget) ) {
									if ( (setup.sistDB[setup.sistType.transformSub].isSuccessful(this.charKey,chosenTransformer,tfTarget)[0]) ) {
										choice = setup.sistType.transformSub;
										target = chosenTransformer;
										extra = tfTarget;
									}
								}
							}
						}
					}
				}
				// Check if demanding sex from sub is possible
				else if ( gC(this.charKey).subChars.length > 0 && gC(this.charKey).sexScenesToday < 1 && (gC(this.charKey).mission == "haveSex" || gC(this.charKey).mission == "haveDomSex") ) {
					var potentialSubs = [];
					for ( var chKey of sis.charList ) {
						if ( gC(this.charKey).subChars.includes(chKey) ) {
							if ( gRelTypeAb(chKey,this.charKey).forcedToSex ) {
								potentialSubs.push(chKey);
							}
						}
					}
					if ( potentialSubs.length > 0 ) {
						choice = setup.sistType.dominantSex;
						target = randomFromList(potentialSubs);
					}
				}
				if ( choice == "none" && flagSkipSexAttempts == false ) {
					// Standard sex checks
						// Sub-missions: any sex, egal sex, dominating sex
					var sexWantScore = 0;
					if ( getCharsDrivePercent(this.charKey,"dPleasure") <= 0.1 ) {
						sexWantScore = -1;
					} else if ( getCharsDrivePercent(this.charKey,"dPleasure") >= 0.2 ) {
						sexWantScore = 1;
					}
					if ( gC(this.charKey).mission == "getAlliance" ) {
						sexWantScore -= 3;
					}
			
					if ( 
							( gC(this.charKey).mood.flirty + gC(this.charKey).mood.aroused - gC(this.charKey).mood.angry + ((1 - getBarPercentage(this.charKey,"lust")) * 100) ) >= 50
							&& ( limitedRandomInt(10 + gC(this.charKey).daysWithoutSex + sexWantScore) > ( 6 + gC(this.charKey).sexScenesToday ) )
							&& ( gC(this.charKey).socialdrive.current >= 10 )
						) {
						var highestPriority = -1;
						var priorizedChar = "";
						// Get character with highest priority
						for ( var character of sis.getValidProposedCharacters(this.charKey) ) {
							if ( getSocialPriorityAgainstTarget(this,character) > highestPriority || highestPriority == -1 ) {
								highestPriority = getSocialPriorityAgainstTarget(this,character);
								priorizedChar = character;
							}
						}
			
						var allowedSex = true;
						if ( gC(this.charKey).subChars.includes(priorizedChar) ) {
							if ( limitedRandomInt(16) > 4 ) { allowedSex == false; }
						}
						if ( allowedSex ) {
							var domSexAllowed = true;
							var egaSexAllowed = true;
							var subSexAllowed = false;
							if ( gC(this.charKey).mission == "raiseFriendship" || gC(this.charKey).mission == "flirt" || gC(this.charKey).mission == "getAlliance" ) {
								domSexAllowed = false;
							}
							if ( gC(this.charKey).mission == "haveDomSex" || gC(this.charKey).mission == "seduce" || ( (gC(this.charKey).socialAi.covetTs.includes(priorizedChar) || gC(this.charKey).socialAi.conquestTs.includes(priorizedChar)) && gC(this.charKey).socialAi.allyTs.includes(priorizedChar) == false ) ) {
								egaSexAllowed = false;
							}
							if ( (gC(this.charKey).socialAi.covetTs.includes(priorizedChar) == false && gC(this.charKey).socialAi.conquestTs.includes(priorizedChar) == false) && (getCharsDrivePercent(this.charKey,"dPleasure")*2 > getCharsDrivePercent(this.charKey,"dDomination") + getCharsDrivePercent(this.charKey,"dAmbition")) && (gC(this.charKey).socialAi.loveTs.includes(priorizedChar) || gC(this.charKey).mission == "haveSex") && gC(priorizedChar).domChar != this.charKey ) {
								subSexAllowed = true;
							}
			
							var targetWillpowerMargin = gC(priorizedChar).willpower.max * 0.1;
							var desireAttack = false;
							if ( limitedRandomInt(40) > 30 ) {
								desireAttack = true;
							}
							// Check for dominant sex
							if ( ((setup.sistDB[setup.sistType.dominantSex].isSuccessful(this.charKey,priorizedChar)[0] || (setup.sistDB[setup.sistType.dominantSex].getDesire(this.charKey,priorizedChar)[0] >= (targetWillpowerMargin + 20) && desireAttack)) && domSexAllowed) ) {
								choice = setup.sistType.dominantSex;
								target = priorizedChar;
							} // Check for egalitarian sex
							else if ( ((setup.sistDB[setup.sistType.egalitarianSex].isSuccessful(this.charKey,priorizedChar)[0] || (setup.sistDB[setup.sistType.egalitarianSex].getDesire(this.charKey,priorizedChar)[0] >= (targetWillpowerMargin + 20) && desireAttack)) && egaSexAllowed) ) {
								choice = setup.sistType.egalitarianSex;
								target = priorizedChar;
							} else if ( (setup.sistDB[setup.sistType.submissiveSex].isSuccessful(this.charKey,priorizedChar)[0] || (setup.sistDB[setup.sistType.submissiveSex].getDesire(this.charKey,priorizedChar)[0] >= (targetWillpowerMargin + 20) && desireAttack)) && subSexAllowed ) {
								choice = setup.sistType.submissiveSex;
								target = priorizedChar;
							}
						}
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
			}
		} 
		
		if ( gC(this.charKey).socialdrive.current < 1 ) {
			choice = "leave";
		}
		
		// Check require unlocked genitals
		if ( choice == setup.sistType.egalitarianSex || choice == setup.sistType.submissiveSex || choice == setup.sistType.dominantSex ) {
			if ( returnCharsUnlockedGenitals(this.charKey).length == 0 ) {
				if ( getActorsGenitalsLockedByTarget(this.charKey,target).length > 0 ) {
					choice = setup.sistType.unlockActorsGenitals;
				}
			}
		}
		
		return [choice,target,extra];
	}

	// SIS
window.chooseActorsSISinteractionTarget = function(actor,sis,interactionsList) {
	rerollSocialMission(actor);
	// 2-elements arrays: 1st is interaction, 2nd is target
	var optionsList = [];
	for ( var interaction of interactionsList ) {
		if ( interaction != "doNothing" ) {
			for ( var target of sis.charList ) {
				if ( target != actor ) {
					var newOption = [interaction,target];
					optionsList.push(newOption);
				}
			}
		}
	}
	var lastOption = ["doNothing",actor];
	optionsList.push(lastOption);
	var wInteractionslist = listIntoWeightedList(optionsList);
	for ( var wItem in wInteractionslist ) {
		if ( wInteractionslist[wItem] instanceof weightedElement ) {
			wInteractionslist[wItem].w = assignWeightToActorsInteractionTarget(actor,wInteractionslist[wItem].content);
		}
	}
	var chosenInteraction = randomFromWeightedList(wInteractionslist); // Not final
	return chosenInteraction;
}
window.assignWeightToActorsInteractionTarget = function(actor,interactionTarget) {
	var interaction = getSiByKey(interactionTarget[0]);
	var target = interactionTarget[1];
	if ( (interactionTarget[0] != "doNothing") && (interaction.evaluateSuccess(actor,target,interaction.topic)) ) {
		var score = 30;
		var moodScore = 1;
		for ( var tag of interaction.tags ) {
			if ( tag != "friendly" ) {
				moodScore += (gC(actor).mood[tag] * 0.01) / interaction.tags.length;
			}
		}
		var drivesScore = 1;
		for ( var tag of interaction.driveTags ) {
			drivesScore *= getCharsDrivePercent(actor,tag) * 6;
		}
		if ( interaction.driveTags.length > 0 ) { drivesScore = drivesScore / interaction.driveTags.length; }
		var goalsScore = 0;
		if ( gC(actor).socialAi.allyTs.includes(target) ) {
			if ( interaction.tags.includes("friendly") ) { goalsScore += 10; }
			if ( interaction.tags.includes("intimate") ) { goalsScore += 10; }
			if ( interaction.tags.includes("angry") ) { goalsScore -= 10; }
			if ( interaction.tags.includes("submissive") ) { goalsScore -= 2; }
			if ( getCharsMissionTitle(actor) == "raiseFriendship" ) {
				goalsScore *= 1.5;
			} else if ( getCharsMissionTitle(actor) == "getAlliance" ) {
				goalsScore *= 3;
			}
		}
		if ( gC(actor).socialAi.loveTs.includes(target) ) {
			if ( interaction.tags.includes("intimate") ) { goalsScore += 5; }
			if ( interaction.tags.includes("flirty") ) { goalsScore += 10; }
			if ( interaction.tags.includes("aroused") ) { goalsScore += 10; }
			if ( interaction.tags.includes("dominant") ) { goalsScore += 5; }
			if ( interaction.tags.includes("angry") ) { goalsScore -= 10; }
			if ( getCharsMissionTitle(actor) == "flirt" || getCharsMissionTitle(actor) == "haveSex" ) {
				goalsScore *= 2;
			}
		}
		if ( gC(actor).socialAi.covetTs.includes(target) ) {
			if ( interaction.tags.includes("flirty") ) { goalsScore += 10; }
			if ( interaction.tags.includes("aroused") ) { goalsScore += 10; }
			if ( interaction.tags.includes("dominant") ) { goalsScore += 40; }
			if ( interaction.tags.includes("submissive") ) { goalsScore -= 20; }
			if ( interaction.tags.includes("angry") ) { goalsScore -= 10; }
			if ( getCharsMissionTitle(actor) == "seduce" || getCharsMissionTitle(actor) == "haveSex" || getCharsMissionTitle(actor) == "haveDomSex" ) {
				goalsScore *= 2;
			}
		}
		if ( gC(actor).socialAi.conquestTs.includes(target) ) {
			if ( interaction.tags.includes("flirty") ) { goalsScore += 5; }
			if ( interaction.tags.includes("aroused") ) { goalsScore += 5; }
			if ( interaction.tags.includes("dominant") ) { goalsScore += 60; }
			if ( interaction.tags.includes("submissive") ) { goalsScore -= 30; }
			if ( interaction.tags.includes("angry") ) { goalsScore += 5; }
			if ( getCharsMissionTitle(actor) == "seduce" || getCharsMissionTitle(actor) == "haveDomSex" ) {
				goalsScore *= 1.5;
			}
		}
		if ( gC(actor).socialAi.rivalTs.includes(target) ) {
			if ( interaction.tags.includes("dominant") ) { goalsScore += 10; }
			if ( interaction.tags.includes("submissive") ) { goalsScore -= 30; }
			if ( interaction.tags.includes("angry") ) { goalsScore += 30; }
			if ( getCharsMissionTitle(actor) == "taunt" ) {
				goalsScore *= 2;
			}
		}
		var strategyScore = 0;
		for ( var tag of interaction.strategyTags ) {
			switch(tag) {
				case "angerDown":
					if ( ( gC(actor).socialAi.allyTs.includes(target) || gC(actor).socialAi.loveTs.includes(target) || gC(actor).socialAi.covetTs.includes(target) ) && gC(target).mood.anger >= 10 ) {
						strategyScore += 15;
						if ( getCharsMissionTitle(actor) == "raiseFriendship" || getCharsMissionTitle(actor) == "flirt" || getCharsMissionTitle(actor) == "getAlliance" ) {
							strategyScore *= 2;
						}
					} else {
						strategyScore = -100;
					}
					break;
				case "selfSubmissionDown":
					if ( ((gC(actor).mood.submission + gC(target).mood.domination - gC(actor).mood.domination - gC(target).mood.submission - rLvlAbt(actor,target,"romance")) >= 15) && ( getCharsDrivePercent(actor,"dDomination") > 0.12 || getCharsDrivePercent(actor,"dAmbition") > 0.12 ) ) {
						strategyScore += 15 * ( getCharsDrivePercent(actor,"dDomination") + getCharsDrivePercent(actor,"dAmbition") ) * 12;
						if ( getCharsMissionTitle(actor) == "seduce" || getCharsMissionTitle(actor) == "haveDomSex" ) {
							strategyScore *= 2;
						}
					} else {
						strategyScore = -100;
					}
					break;
				case "romanceRival":
					
					break;
			}
		}
		
		score = (score + goalsScore + strategyScore) * moodScore * drivesScore;
		
		if ( score > 10 ) {
			if ( interaction.tags.includes("angry") ) {
				if ( (gC(actor).socialAi.rivalTs.includes(target) == false) && ( (rLvlAbt(actor,target,"rivalry") * 1 + rLvlAbt(actor,target,"enmity")) * 2 < ( rLvlAbt(actor,target,"romance") + rLvlAbt(actor,target,"friendship") + 3 ) ) && (gC(actor).mood.angry <= 10) ) {
					score *= 0.3;
				}
			}
		}
		if ( getBarPercentage(actor,"socialdrive") < 0.3 ) {
			score = score * (10 - interaction.socialDriveCost) * 0.1;
		}
		if ( score <= 1 ) { score = 1; }
	} else {
		var score = 1;
	}
	
	if ( getCharGroup(actor).includes(target) == false ) { score *= 2; }
	
	return score;
}

window.setSocialAiCandidateGoals = function(socialAi) {
	var actor = socialAi.charKey;
	
	// Simple and functional version of this function.
	// One character will be selected as romance target. This character will receive much higher priority.
	// All other characters will be set to either "friendly" or "dominate"
	
	var romanceTargetId = 0;
	var currentTargetScore = 0;
	var currentCandidateScore = 0;
	var i = 0;
	
	// Updating to targets lists
	// Amount of required targets for each list
	
	var allyTN = getAllyTN(actor);
	var loveTN = getLoveTN(actor);
	var covetTN = getCovetTN(actor);
	var conquestTN = getConquestTN(actor);
	var rivalTN = getRivalTN(actor);

	var oldTs = [];
	for ( var ts of ["allyTs","loveTs","covetTs","conquestTs","rivalTs"] ) {
		oldTs[ts] = socialAi[ts];
	}
	
	socialAi.allyTs = getTs(actor,allyTN,scorePotentialAlly);
	socialAi.loveTs = getTs(actor,loveTN,scorePotentialLove);
	socialAi.covetTs = getTs(actor,covetTN,scorePotentialCovet);
	socialAi.conquestTs = getTs(actor,conquestTN,scorePotentialConquest);
	socialAi.rivalTs = getTs(actor,rivalTN,scorePotentialRival);
	
	if ( socialAi.rivalTs.length == 0 ) {
		var potentialRivals = getTs(actor,1,scorePotentialRival);
		if ( potentialRivals.length > 0 ) {
			if ( potentialRivals[0][1] >= 10 ) { // First potential rival's score passes threshold
				socialAi.rivalTs = [potentialRivals[0]];
			}
		}
	}
	
	// Old Ts have a chance of being passed over to the next day
	for ( var ts of ["allyTs","loveTs","covetTs","conquestTs","rivalTs"] ) {
		for ( var t of oldTs[ts] ) {
			if ( socialAi[ts].includes(t) == false ) {
				if ( limitedRandomInt(64) > 32 ) {
					socialAi[ts].push(t);
				}
			}
		}
	}
}

window.getSocialStrategyAgainstTarget = function(socialAi,target) {
	var strategy = "friendly";
	if ( socialAi.hasOwnProperty(target) ) {
		strategy = socialAi[target].strategy;
	}
	return strategy;
}
window.getSocialPriorityAgainstTarget = function(socialAi,target) {
	var priority = 5 + limitedRandomInt(10);
	
	if ( socialAi.allyTs.includes(target) ) {
		priority += 5;
	}
	if ( socialAi.loveTs.includes(target) ) {
		priority += 7;
	}
	if ( socialAi.covetTs.includes(target) ) {
		priority += 5;
	}
	if ( socialAi.conquestTs.includes(target) ) {
		priority += 3;
	}
	if ( socialAi.rivalTs.includes(target) ) {
		priority += 3;
	}
	/*
	if ( socialAi.hasOwnProperty(target) ) {
		priority = socialAi[target].weight;
	}
	*/
	return priority;
}

window.rerollSocialMission = function(actor) {
	// Check angry reroll
	if ( gC(actor).mood.angry > ( gC(actor).mood.friendly + gC(actor).mood.flirty + 20 ) ) {
		if ( gC(actor).mission != "taunt" ) {
			gC(actor).mission = "";
		}
	} else if ( gC(actor).mission == "raiseFriendship" ) {
		if ( (gC(actor).mood.flirty + gC(actor).mood.aroused) > (gC(actor).mood.friendly * 2 + 10) ) {
			gC(actor).mission = "flirt";
		}
	}
}

	// Target types
	
window.getAllyTN = function(charKey) {
	var tn = 1;
	if ( getCharsDrivePercent(charKey,"dCooperation") >= 0.4 ) {
		tn = 4;
	} else if ( getCharsDrivePercent(charKey,"dCooperation") >= 0.3 ) {
		tn = 3;
	} else if ( getCharsDrivePercent(charKey,"dCooperation") >= 0.2 ) {
		tn = 2;
	}
	if ( quantifyCharacterVacuumStrength(charKey) < quantifyAverageCandidateVacuumStrength() ) {
		tn++;
	}
	return tn;
}
window.getLoveTN = function(charKey) {
	var tn = 0;
	if ( getCharsDrivePercent(charKey,"dLove") >= 0.25 ) {
		tn = 2;
	} else if ( getCharsDrivePercent(charKey,"dLove") >= 0.15 ) {
		tn = 1;
	}
	if ( getCharsDrivePercent(charKey,"dPleasure") >= 0.25 ) {
		tn++;
	}
	if ( getCharsDrivePercent(charKey,"dCooperation") >= 0.25 ) {
		tn++;
	}
	if ( getCharsDrivePercent(charKey,"dAmbition") >= 0.3 ) {
		tn--;
	}
	return tn;
}
window.getCovetTN = function(charKey) {
	var tn = 1;
	if ( getCharsDrivePercent(charKey,"dPleasure") >= 0.15 ) {
		tn++;
		if ( getCharsDrivePercent(charKey,"dPleasure") >= 0.25 ) {
			tn++;
		}
	}
	if ( getCharsDrivePercent(charKey,"dDomination") >= 0.2 ) {
		tn++;
	}
	if ( getCharsDrivePercent(charKey,"dImprovement") >= 0.2 ) {
		tn--;
	}

	return tn;
}
window.getConquestTN = function(charKey) {
	var tn = 0;
	if ( getCharsDrivePercent(charKey,"dDomination") >= 0.15 ) {
		tn++;
		if ( getCharsDrivePercent(charKey,"dDomination") >= 0.25 ) {
			tn++;
		}
	}
	if ( getCharsDrivePercent(charKey,"dAmbition") >= 0.2 ) {
		tn++;
		if ( getCharsDrivePercent(charKey,"dAmbition") >= 0.3 ) {
			tn++;
		}
	}
	if ( getCharsDrivePercent(charKey,"dCooperation") >= 0.2 ) {
		tn--;
	}
	return tn;
}
window.getRivalTN = function(charKey) {
	var tn = 0;
	if ( ( getCharsDrivePercent(charKey,"dAmbition") + getCharsDrivePercent(charKey,"dImprovement") * 0.5) >= 0.25 ) {
		tn++;
		if ( ( getCharsDrivePercent(charKey,"dAmbition") + getCharsDrivePercent(charKey,"dImprovement") * 0.5) >= 0.35 ) {
			tn++;
		}
	}
	return tn;	
}

	// Fill target lists
setup.randomTargetScore = 2.0;

window.addScoredElementToSortedList = function(sortedList,scoredElement) {
	// Sorted list is an array of 2-sized arrays, position 0 is target, position 1 is score
	var l = sortedList.length;
	
	if ( l == 0 ) {
		sortedList = [scoredElement];
	} else {
		var i = l - 1;
		while ( i > -1 ) {
			if ( scoredElement[1] < sortedList[i][1] ) {
				if ( i == l - 1) {
					sortedList.push(scoredElement);
				} else {
					sortedList.splice(i+1,0,scoredElement);
				}
				i = -2;
			}
			i--;
		}
		if ( i == -1 ) {
			sortedList.splice(0,0,scoredElement);
		}
	}
	return sortedList;
}


window.getTs = function(charKey,TN,scoreFunction) {
	var Ts = [];
	if ( TN > 0 ) {
		var potentialTargets = []; // Array of 2-sized arrays, position 0 is target, position 1 is score
		for ( var target of getActiveSimulationCharactersArray() ) {
			if ( target != charKey) {
				var scoredTarget = [target,scoreFunction(charKey,target)];
				if ( scoredTarget[1] >= 0 ) {
					//potentialTargets = addScoredElementToSortedList(potentialTargets,scoredTarget);
					potentialTargets = addScoredElementToSortedList(potentialTargets,scoredTarget);
				}
			}
		}
		var n = 0;
		while ( n < TN ) {
			if ( potentialTargets[n] != undefined ) {
				Ts.push(potentialTargets[n][0]);
			} else {
				n = TN;
			}
			n++;
		}
	}
	return Ts;
}

window.getRivalTs = function(charKey,rivalTN) {
	var rivalTs = [];
	if ( rivalTN > 0 ) {
		var potentialTargets = []; // Array of 2-sized arrays, position 0 is target, position 1 is score
		for ( var target of getActiveSimulationCharactersArray() ) {
			if ( target != charKey) {
				var scoredTarget = [target,scorePotentialRival(charKey,target)];
				if ( scoredTarget[1] >= 0 ) {
					addScoredElementToSortedList(potentialTargets,scoredTarget);
				}
			}
		}
		var n = 0;
		while ( n < rivalTN ) {
			rivalTs.push(potentialTargets[n][0]);
		}
	}
	return rivalTs;
}
window.scorePotentialAlly = function(actor,target) {
	var score = 0;
	
	var relationScore = rLvlAbt(actor,target,"friendship") * 2 + rLvlAbt(actor,target,"romance") * 1 - rLvlAbt(actor,target,"rivalry") * 1 - rLvlAbt(actor,target,"enmity") * 2;
	var dominationScore = rLvlAbt(actor,target,"domination") - rLvlAbt(actor,target,"submission");
	var powerScore = (quantifyCharacterVacuumStrength(target) / quantifyAverageCandidateVacuumStrength());
	
	score += relationScore;
	if ( dominationScore < 0 ) { score += dominationScore * 2; }
	if ( powerScore >= 1 ) { score += powerScore * 10; }
	
	score += score * limitedRandom(setup.randomTargetScore);
	return score;
}
window.scorePotentialLove = function(actor,target) {
	var score = 0;
	
	var relationScore = rLvlAbt(actor,target,"romance") * 2 + rLvlAbt(actor,target,"sexualTension") * 1 - rLvlAbt(actor,target,"enmity") * 3;
	var domSubScore = (rLvlAbt(actor,target,"domination") + rLvlAbt(actor,target,"submission")) * 0.1;
	var powerScore = (quantifyCharacterVacuumStrength(target) / quantifyAverageCandidateVacuumStrength());
	var intimateScore = getCharsRelativeIntimacy(actor,target) * getInfluenceEffectWithDrives(target,2,["dLove"],["dAmbition","dDomination"]) * -1;
	
	score += relationScore;
	score += domSubScore;
	if ( powerScore >= 1 ) { score += powerScore * 10; }
	score += intimateScore;
	
	score += score * limitedRandom(setup.randomTargetScore);
	return score;
}
window.scorePotentialCovet = function(actor,target) {
	var score = 0;
	
	var relationScore = rLvlAbt(actor,target,"sexualTension") * 2 - rLvlAbt(actor,target,"friendship") * 1 + rLvlAbt(actor,target,"romance") * 1 - rLvlAbt(actor,target,"enmity") * 2;
	var dominationScore = rLvlAbt(actor,target,"domination") - rLvlAbt(actor,target,"submission");
	
	score += relationScore;
	if ( dominationScore > 0 ) { score += relationScore; }
	
	score += score * limitedRandom(setup.randomTargetScore);
	
	if ( gC(actor).domChar == target ) { score = -50; }
	
	return score;
}
window.scorePotentialConquest = function(actor,target) {
	var score = 0;
	
	var relationScore = rLvlAbt(actor,target,"sexualTension") * 2 + rLvlAbt(actor,target,"rivalry") * 1 - rLvlAbt(actor,target,"friendship") * 1 - rLvlAbt(actor,target,"romance") * 1;
	var dominationScore = rLvlAbt(actor,target,"domination") - rLvlAbt(actor,target,"submission");
	var powerScore = (quantifyCharacterVacuumStrength(actor) - quantifyCharacterVacuumStrength(target)) * 30 / quantifyAverageCandidateVacuumStrength;
	
	score += relationScore;
	if ( dominationScore < 10 && dominationScore > 0 ) { score += dominationScore * 2; }
	if ( powerScore > 0 ) { score += powerScore * ( 1 + (getCharsDrivePercent(actor,"dDomination") - getCharsDrivePercent(actor,"dAmbition")) * 5 ); }
	
	score += score * limitedRandom(setup.randomTargetScore);
	
	if ( gC(actor).domChar == target ) { score = -50; }
	
	return score;
}
window.scorePotentialRival = function(actor,target) {
	var score = 0;
	
	var relationScore = rLvlAbt(actor,target,"rivalry") * 1.5 + rLvlAbt(actor,target,"enmity") * 2 - rLvlAbt(actor,target,"friendship") * 1 - rLvlAbt(actor,target,"romance") * 1.5;
	var submissionScore = rLvlAbt(actor,target,"submission") - rLvlAbt(actor,target,"domination");
	var meritScore = gC(target).merit - gC(actor).merit;
	var infamyScore = gC(target).infamy - gC(actor).infamy;
	var intimateScore = getCharsRelativeIntimacy(actor,target) * getInfluenceEffectWithDrives(target,2,["dLove","dCooperation"],["dAmbition","dDomination","dImprovement"]) * -1;
	
	score += relationScore;
	if ( submissionScore > 0 ) { score += submissionScore * getCharsDrivePercent(actor,"dAmbition") * 5; }
	if ( meritScore > 0 ) { score += meritScore; }
	if ( infamyScore > 0 ) { score += infamyScore * getCharsDrivePercent(actor,"dCooperation") * 5; }
	score += intimateScore;
	
	score += score * limitedRandom(setup.randomTargetScore);
	
	if ( gC(actor).domChar == target ) { score = -50; }
	
	return score;
}

window.testRelationScores = function() {
gC("chNash").relations["chMir"].sexualTension.level = 5;
gC("chNash").relations["chMir"].romance.level = 4;
gC("chNash").relations["chMir"].rivalry.level = 5;
gC("chNash").relations["chVal"].enmity.level = 5;
gC("chNash").relations["chVal"].rivalry.level = 5;
gC("chNash").relations["chClaw"].friendship.level = 5;
gC("chNash").relations["chClaw"].domination.level = 5;


gC("chVal").relations["chMir"].domination.level = 5;
gC("chVal").relations["chMir"].sexualTension.level = 5;
gC("chVal").relations["chMir"].friendship.level = 5;
gC("chVal").relations["chAte"].rivalry.level = 5;
gC("chVal").relations["chMir"].submission.level = 5;
gC("chVal").relations["chMir"].sexualTension.level = 5;

State.variables.chVal.infamy = 15;
State.variables.chAte.merit = 15;
State.variables.chMir.will.value = 50;
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

// Auxiliar

window.feedCandidatesRelationshipGoals = function() {
	/*
	var candidates = [ "chNash", "chMir", "chVal", "chAte", "chClaw" ];
	var allCandidates = candidates.concat(["chPlayerCharacter"]);
	
	for ( var candidate of candidates ) {
		for ( var targetCandidate of allCandidates ) {
			if ( candidate != targetCandidate ) {
				gC(candidate).socialAi.stablishRelationshipGoal(targetCandidate);
			}
		}
	}*/
}
window.getValidSocialMissions = function() {
	var missions = ["raiseFriendship","flirt","seduce","haveSex","haveDomSex","getAlliance","taunt"];
	return missions;
}

