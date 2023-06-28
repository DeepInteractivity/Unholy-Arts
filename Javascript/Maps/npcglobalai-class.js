
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
			var dcq = findMostDangerousAggressiveCharacterMinusCharA(this.charKey);
			var dangerousChar = dcq[0];
			var dangerValue = dcq[1];
			var dangerProportion = dangerValue / quantifyCharactersGroupStrength(this.charKey);
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
					this.findBestCharToLeave(dangerValue);
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
		for ( var charKey of getActiveSimulationCharactersArray() ) {
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
	globalAi.findBestCharToLeave = function(dangerValue) {
		var leftFollower = false;
		var potentialUnfollowers = [];
		for ( var charKey of gC(this.charKey).followedBy ) {
			if ( gC(charKey).followingForDebt ) {
				if ( (dangerValue / quantifyCharactersAgroupMinusCharBStrength(this.charKey,charKey)) < 1 ) {
					potentialUnfollowers.push(charKey);
				}
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
		var tChoices = [];
		for ( var stat of getStatNamesArray() ) {
			tChoices.push(cTrainStatMissionChoice(charKey,stat));
		}
		return tChoices;
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
	
	globalAi.generateAdvancedSocializationChoices = function() {
		var mChoices = [];
		
		var allyTargets = [];
		var loveTargets = [];
		var covetTargets = [];
		var enemyTargets = [];
		var allTargets = [];
		
		for ( var charKey of getCurrentMap().characters ) {
			if ( charKey != this.charKey ) {
				if ( mayCharBeApproached(this.charKey,charKey) ) {
					if ( gC(this.charKey).socialAi.allyTs.includes(charKey) ) {
						allyTargets.push(charKey);
					}
					if ( gC(this.charKey).socialAi.loveTs.includes(charKey) ) {
						loveTargets.push(charKey);
					}
					if ( gC(this.charKey).socialAi.covetTs.includes(charKey) ) {
						covetTargets.push(charKey);
					}
					if ( gC(this.charKey).socialAi.rivalTs.includes(charKey) ) {
						enemyTargets.push(charKey);
					}
					allTargets.push(charKey);
				}
			}
		}
		
		if ( allTargets.length > 0 && getBarPercentage(this.charKey,"socialdrive") >= 0.35 ) {
			var selectedChar = "";
			if ( (gC(this.charKey).mood.angry + gC(this.charKey).mood.bored * 0.5 - 15 ) < ( gC(this.charKey).mood.friendly + gC(this.charKey).mood.flirty ) ) {
				// Nurture friendship, flirt, seduce, taunt
				// Friendship
				if ( limitedRandomInt(10) >= 2 && loveTargets.length > 0 ) {
					selectedChar = randomFromList(allyTargets);
				} else {
					selectedChar = randomFromList(allTargets);
				}
				var frChoice = cAdvancedScialGoalMissionChoice(this.charKey,selectedChar,"raiseFriendship");
				var weight = 2 + gC(this.charKey).dLove.level * 1 + gC(this.charKey).dCooperation.level * 1 - gC(this.charKey).mood.angry * 0.1;
				if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 3 + allyTargets.length * 2; }
				frChoice.weight = weight;
				if ( frChoice.weight > 0 ) { mChoices.push(frChoice); }
				
				// Flirt
				if ( limitedRandomInt(10) >= 2 && loveTargets.length > 0 ) {
					selectedChar = randomFromList(loveTargets);
				} else {
					selectedChar = randomFromList(allTargets);
				}
				var flChoice = cAdvancedScialGoalMissionChoice(this.charKey,selectedChar,"flirt");
				weight = 3 + gC(this.charKey).dLove.level * 1 + gC(this.charKey).dPleasure.level * 1 + gC(this.charKey).dCooperation.level * 1 - gC(this.charKey).mood.angry * 0.1 + gC(this.charKey).mood.flirty * 0.1;
				if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 3 + loveTargets.length * 2; }
				frChoice.weight = weight;
				if ( frChoice.weight > 0 && isLewdingPossible(this.charKey,selectedChar) ) { mChoices.push(flChoice); }
				
				// Seduce
				if ( limitedRandomInt(10) >= 2 && loveTargets.length > 0 ) {
					selectedChar = randomFromList(covetTargets);
				} else {
					selectedChar = randomFromList(allTargets);
				}
				var sdChoice = cAdvancedScialGoalMissionChoice(this.charKey,selectedChar,"seduce");
				weight = 3 + + gC(this.charKey).dPleasure.level * 2 + gC(this.charKey).dDomination.level * 1 - gC(this.charKey).mood.angry * 0.1 + gC(this.charKey).mood.aroused * 0.1;
				if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 3 + covetTargets.length * 2; }
				frChoice.weight = weight;
				if ( frChoice.weight > 0 && isLewdingPossible(this.charKey,selectedChar) ) { mChoices.push(sdChoice); }
				
				if ( returnCharsUnlockedGenitals(this.charKey).length > 0 ) {
					// Have sex
					var sexDollTargets = [];
					for ( var sexDoll of gC(this.charKey).subChars ) {
						var relType = gRelTypeAb(sexDoll,this.charKey);
						if ( relType ) {
							if ( relType.forcedToSex ) { sexDollTargets.push(sexDoll); }
						}
					}	
					var hsTargets = covetTargets.concat(loveTargets).concat(sexDollTargets);
					if ( (hsTargets.length) > 0 ) {
						selectedChar = randomFromList(hsTargets);
						var hsChoice = cAdvancedScialGoalMissionChoice(this.charKey,selectedChar,"haveSex");
						var weight = 2 + gC(this.charKey).dLove.level * 1 + gC(this.charKey).dPleasure.level * 1 - gC(this.charKey).mood.angry * 0.1 + gC(this.charKey).mood.aroused * 0.1 + (1 - getBarPercentage(this.charKey,"lust")) * 20;
						if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 3 + hsTargets.length * 2; }
						weight = weight * ((3 - gC(this.charKey).sexScenesToday * 2 + gC(this.charKey).daysWithoutSex) / 3);
						hsChoice.weight = weight;
						if ( hsChoice.weight > 0 ) { mChoices.push(hsChoice); }
					}
					
					// Have dominating sex
					var dsTargets = covetTargets.concat(sexDollTargets).concat(sexDollTargets);
					if ( (dsTargets.length) > 0 ) {
						selectedChar = randomFromList(dsTargets);
						var dsChoice = cAdvancedScialGoalMissionChoice(this.charKey,selectedChar,"haveDomSex");
						var weight = 2 + gC(this.charKey).dPleasure.level * 2 + gC(this.charKey).dDomination.level * 2 - gC(this.charKey).mood.angry * 0.1 + gC(this.charKey).mood.aroused * 0.1 + (1 - getBarPercentage(this.charKey,"lust")) * 10;
						if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 3 + dsTargets.length * 2; }
						if ( getCharsDrivePercent(this.charKey,"dDomination") < 0.15 ) {
							weight = 0;
						} else if ( getCharsDrivePercent(this.charKey,"dDomination") + getCharsDrivePercent(this.charKey,"dAmbition") > 0.4 ) {
							weight *= 2;
						}
						weight = weight * ((3 - gC(this.charKey).sexScenesToday * 2 + gC(this.charKey).daysWithoutSex) / 3);
						dsChoice.weight = weight;
						if ( dsChoice.weight > 0 ) { mChoices.push(dsChoice); }
					}
				} else {
					var validKeyholders = arrayMinusA(getActorsKeyholders(this.charKey),this.charKey);
					if ( validKeyholders.length > 0 ) {
						selectedChar = randomFromList(validKeyholders);
						var fgChoice = cAdvancedScialGoalMissionChoice(this.charKey,selectedChar,"haveSex");
						var weight = 2 + gC(this.charKey).dPleasure.level * 2 + gC(this.charKey).mood.aroused * 0.2 + (1 - getBarPercentage(this.charKey,"lust")) * 20;
						if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 4; }
						weight = weight * ((3 - gC(this.charKey).sexScenesToday * 2 + gC(this.charKey).daysWithoutSex) / 3);
						fgChoice.weight = weight;
						if ( fgChoice.weight > 0 ) { mChoices.push(fgChoice); }
					}
				}
				
				// Get alliance
				var baseAlTargets = allyTargets.concat(loveTargets);
				var alTargets = [];
				for ( var cK of baseAlTargets ) {
					if ( gC(this.charKey).egaChars.includes(cK) == false && gC(this.charKey).domChar != cK && gC(this.charKey).subChars.includes(cK) == false ) {
						alTargets.push(cK);
					}
				}
				if ( alTargets.length > 0 ) {
					//selectedChar = randomFromList(alTargets);
					selectedChar = prioritizeAllianceTarget(this.charKey,alTargets);
					var gaChoice = cAdvancedScialGoalMissionChoice(this.charKey,selectedChar,"getAlliance");
					var weight = 2 + gC(this.charKey).dLove.level * 1 + gC(this.charKey).dCooperation.level * 2 - gC(this.charKey).mood.angry * 0.1 + gC(this.charKey).mood.intimate * 0.1;
					if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 2 + alTargets.length * 1.5; }
					
					if ( getCharAllies(this.charKey).length < 2 && getCharsDrivePercent(this.charKey,"dDomination") < 0.24 ) {
						weight *= 2;
							if ( getCharsDrivePercent(this.charKey,"dCooperation") > 0.2 ) {
								weight *= 2;
							}
							if ( getCharsDrivePercent(this.charKey,"dCooperation") > 0.12 ) {
								weight *= 2;
							}
							if ( getCharsDrivePercent(this.charKey,"dLove") > 0.2 ) {
								weight *= 2;
							}
						if ( getCharAllies(this.charKey).length < 1 && getCharsDrivePercent(this.charKey,"dDomination") < 0.2 ) {
							weight *= 3;
							if ( getCharAllies(this.charKey).length < 1 && getCharsDrivePercent(this.charKey,"dDomination") < 0.16 ) {
								weight *= 4;
							}
						}
					} else if ( getCharAllies(this.charKey).length >= 2 && getCharsDrivePercent(this.charKey,"dCooperation") < 0.16 ) {
						weight *= 0.1;
					} else if ( getCharAllies(this.charKey).length >= 2 && getCharsDrivePercent(this.charKey,"dCooperation") < 0.24 ) {
						weight *= 0.5;
					}
					
					gaChoice.weight = weight;
					if ( gaChoice.weight > 0 ) { mChoices.push(gaChoice); }
				}
				
			}
			if ( (gC(this.charKey).mood.angry + 15 ) > ( gC(this.charKey).mood.friendly + gC(this.charKey).mood.flirty ) && enemyTargets.length > 0 ) {
				// Taunt
				selectedChar = randomFromList(enemyTargets);
				var tnChoice = cAdvancedScialGoalMissionChoice(this.charKey,selectedChar,"taunt");
				var weight = 4 + gC(this.charKey).mood.angry * 0.1 - gC(this.charKey).mood.friendly * 0.1;
				if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 2 + enemyTargets.length * 2; }
				tnChoice.weight = weight;
				if ( tnChoice.weight > 0 ) { mChoices.push(tnChoice); }
			}
		}
		
		if ( gC(this.charKey).hasFreeBodypart("mouth") == false ) {
			for ( var mCh of mChoices ) {
				mCh.weight *= 0.2;
			}
		}
		
		return mChoices;
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
	
	globalAi.generateAdvancedCombatChoices = function() {
		var mChoices = [];
		
		if ( gSettings().challengingAllowed || gSettings().assaultingAllowed ) {
			// Get potential targets
			var potentialChallengeTargets = [];
			var potentialAssaultTargets = [];
			var potentialRandomChallenge = [];
			var potentialRandomAssault = [];
			var potentialChallengeRivals = [];
			var potentialAssaultRivals = [];
			var potentialChallengeConquests = [];
			var potentialAssaultConquests = [];
			var validSubSource = [];
			var oppressors = [];
			var validAssaultOppressors = [];
			var validCasusBelliRetribution = [];
		
			for ( var cK of getActiveSimulationCharactersArray() ) {
				if ( cK != this.charKey && gC(cK).followingTo == "" ) {
					if ( gC(cK).domChar == null ) {
						validSubSource.push(cK);
					}
					if ( quantifyCharactersGroupStrength(cK) < quantifyCharactersGroupStrength(this.charKey) * 1.1 && isAssaultPossible(this.charKey,cK) ) { // Assault targets
						potentialAssaultTargets.push(cK);
						if ( gC(this.charKey).socialAi.rivalTs.includes(cK) ) {
							potentialAssaultRivals.push(cK);
						}
						if ( gC(this.charKey).socialAi.conquestTs.includes(cK) ) {
							potentialAssaultConquests.push(cK);
						}
						if ( oppressors.includes(cK) ) {
							validAssaultOppressors.push(cK);
						}
						if ( gC(this.charKey).cbl.includes(cK) ) {
							validCasusBelliRetribution.push(cK);
						}
					} else if ( quantifyCharactersGroupStrength(cK) < quantifyCharactersGroupStrength(this.charKey) * 0.9 ) { // Casus belli targets
						if ( gC(this.charKey).cbl.includes(cK) ) {
							validCasusBelliRetribution.push(cK);
						}
					}
					if ( quantifyCharacterStrength(cK) < quantifyCharacterStrength(this.charKey) * 1.1 && isChallengePossible(this.charKey,cK) ) { // Challenge targets
						potentialChallengeTargets.push(cK);
						if ( gC(this.charKey).socialAi.rivalTs.includes(cK) ) {
							potentialChallengeRivals.push(cK);
						}
						if ( gC(this.charKey).socialAi.conquestTs.includes(cK) ) {
							potentialChallengeConquests.push(cK);
						}
					}
				}
			}
			for ( var cK of getActiveSimulationCharactersArray() ) {
				if ( gC(this.charKey).socialAi.loveTs.includes(cK) == false ) {
					if ( (gC(cK).domChar != "") && (gC(cK).domChar != null) && (gC(cK).domChar != this.charKey) ) {
						if ( gRelTypeAb(cK,gC(cK).domChar).type == "servitude" ) {
							oppressors.push(gC(cK).domChar);
						}
					}
				}
			}
			
			// Potential missions
			if ( potentialAssaultTargets.length > 0 || potentialChallengeTargets.length > 0 && ( gC(this.charKey).infamy < getCharsInfamyLimit(this.charKey) ) ) {
				var selectedChar = "";
				// Challenge mission
				var challengeFactor = 8 + (getCharsDrivePercent(this.charKey,"dImprovement") + getCharsDrivePercent(this.charKey,"dAmbition")) * 5;
				if ( potentialChallengeTargets.length > 0 ) {
					selectedChar = randomFromList(potentialChallengeTargets);
					var chChoice = cChallengeGoalsMissionChoice(this.charKey,selectedChar,"challenge");
					var weight = 1 + gC(this.charKey).dImprovement.level + gC(this.charKey).dAmbition.level;
					if ( getCharEnemies(this.charKey).includes(selectedChar) ) { weight *= 2.5; }
					if ( gC(this.charKey).infamy == 0 ) { weight += 6; }
					if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 2; }
					chChoice.weight = weight;
					if ( chChoice.weight > 0 && canActorAttackTarget(this.charKey,selectedChar) ) { mChoices.push(chChoice); }
				}
				
				// Gain merit	
				var meritFactor = getCharsDrivePercent(this.charKey,"dAmbition") * 6;
				if ( meritFactor > 1 && potentialChallengeTargets.length > 0 ) {
					selectedChar = randomFromList(potentialChallengeTargets.concat(potentialChallengeRivals));
					var hmChoice = cChallengeGoalsMissionChoice(this.charKey,selectedChar,"humilliate");
					var weight = 1 + gC(this.charKey).dAmbition.level * 2;
					if ( getCharEnemies(this.charKey).includes(selectedChar) ) { weight *= 1.5; }
					if ( gC(this.charKey).infamy == 0 ) { weight += 4; }
					if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 2; }
					hmChoice.weight = weight;
					if ( hmChoice.weight > 0 && canActorAttackTarget(this.charKey,selectedChar) ) { mChoices.push(hmChoice); }
				}
				// Weaken enemy
				if (  potentialChallengeRivals.length > 0 ) {
					selectedChar = randomFromList(potentialChallengeRivals);
					var weChoice = cChallengeGoalsMissionChoice(this.charKey,selectedChar,"weakenEnemy");
					var weight = 3 * (quantifyCharacterStats(selectedChar) / quantifyCharacterStats(this.charKey)) + gC(selectedChar).infamy - gC(this.charKey).infamy;
					if ( getCharEnemies(this.charKey).includes(selectedChar) ) { weight *= 3; }
					if ( gC(this.charKey).infamy == 0 ) { weight += 6; }
					if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 2; }
					weChoice.weight = weight;
					if ( weChoice.weight > 0 && canActorAttackTarget(this.charKey,selectedChar) ) { mChoices.push(weChoice); }
				} else if ( potentialAssaultRivals.length > 0 ) {
					selectedChar = randomFromList(potentialAssaultRivals);
					var weChoice = cAssaultGoalsMissionChoice(this.charKey,selectedChar,"weakenEnemy");
					var weight = 10 + (quantifyCharacterStats(selectedChar) - quantifyCharacterStats(this.charKey));
					if ( getCharEnemies(this.charKey).includes(selectedChar) ) { weight *= 3; }
					if ( gC(this.charKey).infamy == 0 ) { weight += 6; }
					if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 2; }
					weChoice.weight = weight;
					if ( weChoice.weight > 0 && canActorAttackTarget(this.charKey,selectedChar) ) { mChoices.push(weChoice); }
				}
				// Gain domination
				var dominationFactor = (getCharsDrivePercent(this.charKey,"dDomination") + getCharsDrivePercent(this.charKey,"dPleasure") * 0.5) * 6;
				if ( dominationFactor > 1.2 ) {
					var challengeConquestTs = potentialChallengeConquests.concat(potentialChallengeConquests).concat(potentialChallengeTargets);
					var assaultConquestTs = potentialAssaultConquests.concat(potentialAssaultConquests).concat(potentialAssaultConquests);
					if (  challengeConquestTs.length > 0 ) {
						selectedChar = randomFromList(challengeConquestTs);
						var gdChoice = cChallengeGoalsMissionChoice(this.charKey,selectedChar,"gainDomination");
						var weight = 1 + gC(this.charKey).dDomination.level * 2;
						if ( getCharEnemies(this.charKey).includes(selectedChar) ) { weight *= 2; }
						if ( gC(this.charKey).infamy == 0 ) { weight += 7; }
						if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 2; }
						gdChoice.weight = weight;
						if ( gdChoice.weight > 0 && canActorAttackTarget(this.charKey,selectedChar) ) { mChoices.push(gdChoice); }
					} else if ( assaultConquestTs.length > 0 ) {
						selectedChar = randomFromList(assaultConquestTs);
						var gdChoice = cAssaultGoalsMissionChoice(this.charKey,selectedChar,"gainDomination");
						var weight = 1 + gC(this.charKey).dDomination.level * 2;
						if ( getCharEnemies(this.charKey).includes(selectedChar) ) { weight *= 2; }
						if ( gC(this.charKey).infamy == 0 ) { weight += 7; }
						if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 2; }
						gdChoice.weight = weight;
						if ( gdChoice.weight > 0 && canActorAttackTarget(this.charKey,selectedChar) ) { mChoices.push(gdChoice); }
					}
				}
				// Force sex
				var forceSexFactor = (getCharsDrivePercent(this.charKey,"dDomination") * 0.5 + getCharsDrivePercent(this.charKey,"dPleasure")) * 6;
				if ( forceSexFactor > 1.2 ) {
					var challengeConquestTs = potentialChallengeConquests.concat(potentialChallengeConquests).concat(potentialChallengeTargets);
					var assaultConquestTs = potentialAssaultConquests.concat(potentialAssaultConquests).concat(potentialAssaultConquests);
					if (  challengeConquestTs.length > 0 ) {
						selectedChar = randomFromList(challengeConquestTs);
						var fsChoice = cChallengeGoalsMissionChoice(this.charKey,selectedChar,"forceSex");
						var weight = 1 + gC(this.charKey).dPleasure.level * 2 + gC(this.charKey).daysWithoutSex;
						if ( gC(this.charKey).infamy == 0 ) { weight += 7; }
						if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 2; }
						fsChoice.weight = weight;
						if ( fsChoice.weight > 0 && canActorAttackTarget(this.charKey,selectedChar) && isLewdingPossible(this.charKey,selectedChar) ) { mChoices.push(fsChoice); }
					} else if ( assaultConquestTs.length > 0 ) {
						selectedChar = randomFromList(assaultConquestTs);
						var fsChoice = cAssaultGoalsMissionChoice(this.charKey,selectedChar,"forceSex");
						var weight = 1 + gC(this.charKey).dPleasure.level * 2 + gC(this.charKey).daysWithoutSex;
						if ( gC(this.charKey).infamy == 0 ) { weight += 7; }
						if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 2; }
						fsChoice.weight = weight;
						if ( fsChoice.weight > 0 && canActorAttackTarget(this.charKey,selectedChar) && isLewdingPossible(this.charKey,selectedChar) ) { mChoices.push(fsChoice); }
					}
				}
				// Gain submissive
				var gainSubFactor = (getCharsDrivePercent(this.charKey,"dAmbition") * 3 + getCharsDrivePercent(this.charKey,"dDomination")) * 4;
				if ( gainSubFactor > 1.3 && ( (gC(this.charKey).infamy * 1.8) < gSettings().infamyLimit ) ) {
					var challengeConquestTs = potentialChallengeConquests.concat(potentialChallengeRivals).concat(potentialChallengeTargets);
					var assaultConquestTs = potentialAssaultConquests.concat(potentialAssaultRivals).concat(potentialAssaultConquests);
					var challengeTs = [];
					var assaultTs = [];
					for ( var c of challengeConquestTs ) {if ( validSubSource.includes(c) ) { challengeTs.push(c); } }
					for ( var c of assaultConquestTs ) { if ( validSubSource.includes(c) ) { assaultTs.push(c); } }
					if (  challengeTs.length > 0 ) {
						selectedChar = randomFromList(challengeTs);
						var fdChoice = cChallengeGoalsMissionChoice(this.charKey,selectedChar,"gainSubmissive");
						var weight = 1 + gC(this.charKey).dAmbition.level + gC(this.charKey).dPleasure.level + gC(this.charKey).dDomination.level; 
						if ( getCharEnemies(this.charKey).includes(selectedChar) ) { weight *= 2; }
						if ( gC(this.charKey).infamy == 0 ) { weight += 13; }
						if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 2; }
						fdChoice.weight = weight;
						if ( fdChoice.weight > 0 && canActorAttackTarget(this.charKey,selectedChar) ) { mChoices.push(fdChoice); }
					} else if ( assaultTs.length > 0 ) {
						selectedChar = randomFromList(assaultTs);
						var fdChoice = cAssaultGoalsMissionChoice(this.charKey,selectedChar,"gainSubmissive");
						var weight = 1 + gC(this.charKey).dAmbition.level + gC(this.charKey).dPleasure.level + gC(this.charKey).dDomination.level; 
						if ( getCharEnemies(this.charKey).includes(selectedChar) ) { weight *= 2; }
						if ( gC(this.charKey).infamy == 0 ) { weight += 13; }
						if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 2; }
						fdChoice.weight = weight; 
						if ( fdChoice.weight > 0 && canActorAttackTarget(this.charKey,selectedChar) ) { mChoices.push(fdChoice); }
					}
				}
				// Liberate friend
				var liberateFriendFactor = (getCharsDrivePercent(this.charKey,"dCooperation")+ getCharsDrivePercent(this.charKey,"dLove")) * 6;
				if ( validAssaultOppressors.length > 0 && liberateFriendFactor > 1.8 ) {
					selectedChar = randomFromList(validAssaultOppressors);
					var lfChoice = cAssaultGoalsMissionChoice(this.charKey,selectedChar,"liberateFriend");
					var weight = 1 + gC(this.charKey).dCooperation.level * 2 + gC(this.charKey).dLove.level * 2; 
					if ( getCharEnemies(this.charKey).includes(selectedChar) ) { weight *= 3; }
					if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 2.5; }
					lfChoice.weight = weight;
					if ( lfChoice.weight > 0 && canActorAttackTarget(this.charKey,selectedChar) ) { mChoices.push(lfChoice); }
				}
				// Casus belli retribution
				if ( validCasusBelliRetribution.length > 0 ) {
					selectedChar = randomFromList(validCasusBelliRetribution);
					var cbrChoice = cAssaultGoalsMissionChoice(this.charKey,selectedChar,"cbRetribution");
					var weight = 1 - gC(this.charKey).dCooperation.level * 1 + gC(this.charKey).dAmbition.level * 1 + gC(this.charKey).dDomination.level * 2;
					if ( getCharEnemies(this.charKey).includes(selectedChar) ) { weight *= 2; }
					if ( State.variables.simCycPar.templeDayPeriod != "training" ) { weight *= 2.5; }
					cbrChoice.weight = weight;
					if ( cbrChoice.weight > 0 && canActorAttackTarget(this.charKey,selectedChar) ) { mChoices.push(cbrChoice); }
				}
			}
		}
		
		return mChoices;
	}
	globalAi.generateCombatChoices = function() {
		var choices = [];
		
		if ( gSettings().challengingAllowed || gSettings().assaultingAllowed ) {
			var selfStrength = quantifyCharactersGroupStrength(this.charKey);
			var potentialTargets = [];
			for ( var cK of getActiveSimulationCharactersArray() ) {
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
				var mChoice1 = cChallengeGoalsMissionChoice(this.charKey,selectedTarget,"challenge");
				var mChoice2 = cAssaultGoalsMissionChoice(this.charKey,selectedTarget,"assault");
				
				// WEIGHT WEIGHTS
				if ( State.variables.simCycPar.templeDayPeriod != "training" ) {
					mChoice1.weight += 10 + gC(this.charKey).dAmbition.level * 6 + gC(this.charKey).dImprovement.level * 3;
					mChoice2.weight += 10 + gC(this.charKey).dAmbition.level * 3 + gC(this.charKey).dDomination.level * 6;
				}
				mChoice2.weight -= gC(this.charKey).infamy;
				
				var generalWeightMult = 0.2;
				mChoice1.weight *= generalWeightMult * 2;
				mChoice2.weight *= generalWeightMult;
				
				if ( getCharEnemies(this.charKey).includes(selectedTarget) ) {
					weight *= 3;
				}
				
				if ( gC(this.charKey).hasOwnProperty("attackedToday") ) {
					mChoice1.weight *= 0.2;
					mChoice2.weight *= 0.2;
				}
				
				if ( mChoice1.weight < 0 ) { mChoice1.weight = 0; }
				if ( mChoice2.weight < 0 ) { mChoice2.weight = 0; }
				choices.push(mChoice1);
				choices.push(mChoice2);
			}
		}
		
		return choices;
	}
	
	globalAi.generateTransformationChoices = function() {
		var mChoices = [];
		if ( gSettings().tfGeneral == tfSetExtra.random ) {
			var anyTransformerPresent = false;
			var presentTransformers = [];
			for ( var cK of getValidTfActors() ) {
				if ( getCurrentMap().characters.includes(cK) && cK != this.charKey ) {
					if ( gC(cK).followingTo == "" || gC(cK).followingTo == this.charKey ) {
						presentTransformers.push(cK);
					}
				}
			}
			if ( presentTransformers.length > 0 ) {
				// Transform self mission
				if ( doesCharHaveState(this.charKey,"UnBp") == false ) {
					if ( npcDecidesTransformationsOnSelf(this.charKey).length > 0 ) {
						// Create mission
						var tfSelfMis = cAdvancedScialGoalMissionChoice(this.charKey,randomFromList(presentTransformers),"transformSelf");
						tfSelfMis.weight = 10 * ( 1 + ( 0.1 * ( gC(this.charKey).dPleasure.level - (gC(this.charKey).dImprovement.level - gC(this.charKey).dAmbition.level) ) ) );
						if ( tfSelfMis.weight > 0 ) {
							mChoices.push(tfSelfMis);
						}
					}
				}
				// Transform sub mission
				var transformableSubs = [];
				for ( var cK of gC(this.charKey).followedBy ) {
					if ( gC(this.charKey).subChars.includes(cK) ) {
						if ( gRelTypeAb(this.charKey,cK).type == "servitude" ) {
							if ( doesCharHaveState(cK,"UnBp") == false ) {
								if ( npcDecidesTransformationsOnTarget(this.charKey,cK).length > 0 ) {
									transformableSubs.push(cK);
								}
							}
						}
					}
				}
				for ( var sub of transformableSubs ) {
					// Create mission for each transformable sub
					var tfSelfMis = cAdvancedScialGoalMissionChoiceExtra(this.charKey,randomFromList(presentTransformers),"transformSub",sub);
					tfSelfMis.weight = 25 * ( 1 + ( 0.1 * ( gC(this.charKey).dPleasure.level - (gC(this.charKey).dImprovement.level - gC(this.charKey).dAmbition.level) ) ) );
					if ( tfSelfMis.weight > 0 ) {
						mChoices.push(tfSelfMis);
					}
				}
			}
		}
		
		return mChoices;
	}
	
	globalAi.generateMissionChoices = function() {
		// this->Generate stat goals
		var mChoices = [];
		
		// Training
		for ( var choice of this.generateTrainingChoices(this.charKey) ) {
			mChoices.push(choice);
		}
		mChoices.push(this.generateRestMissionChoice());
		
		if ( gC(this.charKey).mood.angry < 25 && gC(this.charKey).mood.bored < 25 && gSettings().talkingAllowed ) {
			// Social
			for ( var choice of this.generateAdvancedSocializationChoices() ) {
				mChoices.push(choice);
			}
		}
		
		// Scrolls
		for ( var choice of this.generateScrollsChoices(this.charKey) ) {
			mChoices.push(choice);
		}
		
		// Combat
		if ( gSettings().challengingAllowed || gSettings().assaultingAllowed ) {
			for ( var choice of this.generateAdvancedCombatChoices(this.charKey) ) {
				mChoices.push(choice);
			}/*
			for ( var choice of this.generateCombatChoices(this.charKey) ) {
				mChoices.push(choice);
			}*/
		}
		
		// Transformations
		for ( var choice of this.generateTransformationChoices() ) {
			mChoices.push(choice);
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
		gC(this.charKey).mission = choice.title;
		if ( choice.extra != undefined ) {
			gC(this.charKey).missionExtra = choice.extra;
		} else if ( gC(this.charKey).missionExtra != undefined ) {
			delete gC(this.charKey).missionExtra;
		}
		// Logging //
		if ( State.variables.log[choice.title] == undefined ) {
			State.variables.log[choice.title] = 1;
		} else {
			State.variables.log[choice.title] += 1;
		}
		//         //
		
		return choice.getCommandsList(this.charKey);
	}
	
	return globalAi;
}

window.createCandidateGcAi = function(charKey) {
	var globalAi = new NpcGlobalAi(charKey);
	globalAi.type = "candidateGc";
	
	globalAi.generalEvaluations = function() {
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
		return [cTrainCharismaMissionChoice(charKey),cTrainEmpathyMissionChoice(charKey),
				cTrainIntelligenceMissionChoice(charKey),cTrainPerceptionMissionChoice(charKey),
				cTrainPhysiqueMissionChoice(charKey),cTrainResilienceMissionChoice(charKey)];
	}
	globalAi.generateHuntingChoices = function(charKey) {
		var remainingTimeInPeriod = 120;
		for ( var sEvent of State.variables.compass.ongoingEvents ) {
			if ( sEvent.title == "scenarioEnd" ) {
				remainingTimeInPeriod = sEvent.timeRemaining;
			}
		}
		var missions = [];
		if ( remainingTimeInPeriod > 120 ) {
			missions = [cMonsterHuntingGcEssenceSucker(charKey),cMonsterHuntingGcFlyingLookout(charKey),cMonsterHuntingGcOppressiveYoke(charKey)];
		}
		return missions;
	}
	globalAi.generateSpecialGcChoices = function(charKey) {
		var missions = [ gCnersmiasDiscussion(charKey) ];
		return missions;
	}
	
	globalAi.generateMissionChoices = function() {
		// this->Generate stat goals
		var mChoices = [];
		
		// Training
		mChoices = this.generateTrainingChoices(this.charKey); // Training
		mChoices.push(this.generateRestMissionChoice()); // Rest
		mChoices = mChoices.concat(this.generateHuntingChoices(charKey)); // Monster Hunting
		mChoices = mChoices.concat(this.generateSpecialGcChoices(charKey));
		
		return mChoices;
	}
	globalAi.getMission = function() {
		var choices = this.generateMissionChoices();
		choices = this.purgeChoicesAtLowBars(choices);
		var choice = this.getWeightedRandomMissionChoices(choices);
		gC(this.charKey).mission = choice.title;
		
		return choice.getCommandsList(this.charKey);
	}
	
	return globalAi;
}
window.createValGcAi = function(charKey) {
	var globalAi = new NpcGlobalAi(charKey);
	globalAi.type = "valGc";
	
	globalAi.generalEvaluations = function() {
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
		return [cTrainStatMissionChoice(charKey,"luck")];
	}
	
	globalAi.generateMissionChoices = function() {
		// this->Generate stat goals
		var mChoices = [];
		
		// Training
		for ( var choice of this.generateTrainingChoices(this.charKey) ) {
			mChoices.push(choice);
		}
		mChoices.push(this.generateRestMissionChoice());
		
		return mChoices;
	}
	globalAi.getMission = function() {
		var choices = this.generateMissionChoices();
		choices = this.purgeChoicesAtLowBars(choices);
		var choice = this.getWeightedRandomMissionChoices(choices);
		gC(this.charKey).mission = choice.title;
		
		return choice.getCommandsList(this.charKey);
	}
	
	return globalAi;
}

	// Aux methods
NpcGlobalAi.prototype.purgeChoicesAtLowBars = function(choices,charKey) {
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
NpcGlobalAi.prototype.getWeightedRandomMissionChoices = function(choices) {
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
			// OBSOLETE
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
	mChoice.weight = 4 + gC(character).dImprovement.level * 5 + gC(character).dAmbition.level * 2;
	if ( gC(character).globalAi.statGoals != undefined ) {
		mChoice.weight += gC(character).globalAi.statGoals[0] - gC(character).physique.value;
	}
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
	mChoice.weight = 4 + gC(character).dImprovement.level * 5 + gC(character).dAmbition.level * 2;
	if ( gC(character).globalAi.statGoals != undefined ) {
		mChoice.weight += gC(character).globalAi.statGoals[1] - gC(character).agility.value;
	}
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
	mChoice.weight = 4 + gC(character).dImprovement.level * 5 + gC(character).dAmbition.level * 2;
	if ( gC(character).globalAi.statGoals != undefined ) {
		mChoice.weight += gC(character).globalAi.statGoals[2] - gC(character).resilience.value;
	}
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
	mChoice.weight = 4 + gC(character).dImprovement.level * 5 + gC(character).dAmbition.level * 2;
	if ( gC(character).globalAi.statGoals != undefined ) {
		mChoice.weight += gC(character).globalAi.statGoals[3] - gC(character).will.value;
	}
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
	mChoice.weight = 4 + gC(character).dImprovement.level * 5 + gC(character).dAmbition.level * 2;
	if ( gC(character).globalAi.statGoals != undefined ) {
		mChoice.weight += gC(character).globalAi.statGoals[4] - gC(character).intelligence.value;
	}
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
	mChoice.weight = 4 + gC(character).dImprovement.level * 5 + gC(character).dAmbition.level * 2;
	if ( gC(character).globalAi.statGoals != undefined ) {
		mChoice.weight += gC(character).globalAi.statGoals[5] - gC(character).perception.value;
	}
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
	mChoice.weight = 4 + gC(character).dImprovement.level * 5 + gC(character).dAmbition.level * 2;
	if ( gC(character).globalAi.statGoals != undefined ) {
		mChoice.weight += gC(character).globalAi.statGoals[6] - gC(character).empathy.value;
	}
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
	mChoice.weight = 4 + gC(character).dImprovement.level * 5 + gC(character).dAmbition.level * 2;
	if ( gC(character).globalAi.statGoals != undefined ) {
		mChoice.weight += gC(character).globalAi.statGoals[7] - gC(character).charisma.value;
	}
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
	mChoice.weight = 4 + gC(character).dImprovement.level * 5 + gC(character).dAmbition.level * 2;
	if ( gC(character).globalAi.statGoals != undefined ) {
		mChoice.weight += gC(character).globalAi.statGoals[8] - gC(character).luck.value;
	}
	return mChoice;
}
			// END OF OBSOLETE

window.cTrainStatMissionChoice = function(character,stat) {
	var cappedStat = firstToCap(stat);
	var mChoice = new missionChoice("train" + cappedStat);
	
	if ( stat == "physique" || stat == "agility" || stat == "resilience" ) {
		mChoice.reqBars.push("energy");
	} else if ( stat == "intelligence" || stat == "willpower" || stat == "perception" ) {
		mChoice.reqBars.push("willpower");
	} else if ( stat == "charisma" || stat == "empathy" ) {
		mChoice.reqBars.push("socialdrive");
	}
	mChoice.tags = [stat];
	
	mChoice.isValid = function() {
		var isValid = false;
		// Either current map room has action that allows to train stat, or
		if ( doesRoomHaveActionForCharsWithValidTag(gC(character).currentRoom,getCharGroup(character),stat) ) {
			isValid = true;
		} else { // Pathfinder finds route to room where training stat is possible
			var route = getRouteToClosestTaggedActivity(getCurrentMap().key,getCharGroup(character),stat);
			if ( route.length > 0 ) {
				isValid = true;
			}
		}
		// Return valid if at least one reachable action in map allows training of physique
		return isValid;	
	}
	mChoice.getCommandsList = function() {
		return cMissionActionTag(getCurrentMap(),getCharGroup(character),stat);
	}
	mChoice.weight = 4 + gC(character).dImprovement.level * 5 + gC(character).dAmbition.level * 2;
	if ( gC(character).globalAi.statGoals != undefined ) {
		mChoice.weight += gC(character).globalAi.statGoals[8] - gC(character)[stat].value;
	}
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
window.cAdvancedScialGoalMissionChoice = function(actor,target,missionName) {
	var mChoice = new missionChoice(missionName);
	mChoice.isValid = function() {
		return ( getCurrentMap().characters.includes(target) );
	}
	mChoice.getCommandsList = function() {
		return cMissionPursueAndTalkTo(getCurrentMap(),getCharGroup(actor),target);
	}
	return mChoice;
}
window.cAdvancedScialGoalMissionChoiceExtra = function(actor,target,missionName,extra) {
	var mChoice = cAdvancedScialGoalMissionChoice(actor,target,missionName);
	mChoice.extra = extra;
	return mChoice;
}

	// Combat
window.cChallengeGoalsMissionChoice = function(character,targetCharacter,missionName) {
	var mChoice = new missionChoice(missionName);
	mChoice.isValid = function() {
		var isValid = false;
		if ( getCurrentMap().character.includes(targetCharacter) && isChallengePossible(character,targetCharacter) ) {
			isValid = true;
		}
		return isValid;
	}
	mChoice.getCommandsList = function() {
		return cMissionPursueAndChallenge(getCharGroup(character),targetCharacter);
	}
	return mChoice;
}
window.cAssaultGoalsMissionChoice = function(character,targetCharacter,missionName) {
	var mChoice = new missionChoice(missionName);
	mChoice.isValid = function() {
		var isValid = false;
		if ( getCurrentMap().character.includes(targetCharacter) && isAssaultPossible(character,targetCharacter) ) {
			isValid = true;
		}
		return isValid;
	}
	mChoice.getCommandsList = function() {
		return cMissionPursueAndAssault(getCharGroup(character),targetCharacter);
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

	// Hunting
		// Main Gc Hunting Missions
window.findBestHuntingPartner = function(actor,maximumDistance,validCharsList,targetMonster,scenario) {
	var closeCharacters = getCloseCharactersMinusSelfAndPlayerWithinDistance(actor,maximumDistance);
	var potentialPartners = [];
	for ( var character of closeCharacters ) {
		if ( validCharsList.includes(character) && gC(character).followedBy.length == 0 && gC(character).followingTo == "" ) {
			var wouldJoin = npcConsidersWillingnessToJoinHuntingMission(character,actor,targetMonster,scenario)[0];
			if ( wouldJoin ) {
				potentialPartners.push([character,quantifyCharacterStrength(character)]);
			}
		}
	}
	var bestPartner = null;
	var bestPartnerStrength = -1;
	if ( potentialPartners.length > 0 ) {
		for ( var potPart of potentialPartners ) {
			if ( potPart[1] > bestPartnerStrength ) {
				bestPartner = potPart[0];
				bestPartnerStrength = potPart[1];
			}
		}
	}
	return bestPartner;
}
		
setup.huntingStrengthGleamingCavernsTs = 280;
window.cMonsterHuntingGcEssenceSucker = function(character) {
	var mChoice = new missionChoice("huntEssenceSucker");
	
	// Find best partner
	var validPartners = arrayMinusA(arrayMinusA(getCandidatesKeysArray(),character),"chPlayerCharacter");
	var bestPartner = findBestHuntingPartner(character,8,validPartners,"EssenceSucker","GleamingCaverns");
	
	// Weight adjustments
	mChoice.weight = 20;
	if ( gC(character).saList.includes("baDrainingKiss") == true ) {
		mChoice.weight *= 0.05;
	}
	var ongoingTimeInPeriod = 1;
	for ( var sEvent of State.variables.compass.ongoingEvents ) {
		if ( sEvent.title == "scenarioEnd" ) {
			ongoingTimeInPeriod = sEvent.ongoingTime;
		}
	}
	if ( ongoingTimeInPeriod == 0 ) { mChoice.weight *= 5; }
	else if ( ongoingTimeInPeriod >= 360 ) { mChoice.weight *= 2; }
	
	mChoice.isValid = function() {
		var isValid = true;
		// Does character want draining skills?
		if ( character != "chNash" && character != "chMir" ) {
			isValid = false;
		}
		// Does character have enough strength?
		var strength = quantifyCharactersGroupStrength(character);
		if ( this.bestPartner ) {
			strength += quantifyCharactersGroupStrength(this.bestPartner);
		}
		if ( strength < setup.huntingStrengthGleamingCavernsTs ) {
			isValid = false;
		}
		return isValid;
	}
	mChoice.getCommandsList = function() {
		return cMissionHuntGleamingCavernsMonsters(getCharGroup(character),"Essence-Sucker",this.bestPartner); 
	}
	mChoice.bestPartner = bestPartner;
	return mChoice;
}
window.cMonsterHuntingGcFlyingLookout = function(character) {
	var mChoice = new missionChoice("huntFlyingLookout");
	
	// Find best partner
	var validPartners = arrayMinusA(arrayMinusA(getCandidatesKeysArray(),character),"chPlayerCharacter");
	var bestPartner = findBestHuntingPartner(character,8,validPartners,"FlyingLookout","GleamingCaverns");
	
	// Weight adjustments
	mChoice.weight = 20;
	if ( gC(character).saList.includes("baHypnoticGlance") == true ) {
		mChoice.weight *= 0.05;
	}
	var ongoingTimeInPeriod = 1;
	for ( var sEvent of State.variables.compass.ongoingEvents ) {
		if ( sEvent.title == "scenarioEnd" ) {
			ongoingTimeInPeriod = sEvent.ongoingTime;
		}
	}
	if ( ongoingTimeInPeriod == 0 ) { mChoice.weight *= 5; }
	else if ( ongoingTimeInPeriod >= 360 ) { mChoice.weight *= 2; }
	
	mChoice.isValid = function() {
		var isValid = true;
		// Does character want hypnosis skills?
		if ( character != "chVal" ) {
			isValid = false;
		}
		// Does character have enough strength?
		var strength = quantifyCharactersGroupStrength(character);
		if ( this.bestPartner ) {
			strength += quantifyCharactersGroupStrength(this.bestPartner);
		}
		if ( strength < setup.huntingStrengthGleamingCavernsTs ) {
			isValid = false;
		}
		return isValid;
	}
	mChoice.getCommandsList = function() {
		return cMissionHuntGleamingCavernsMonsters(getCharGroup(character),"Flying Lookout",this.bestPartner); 
	}
	mChoice.bestPartner = bestPartner;
	return mChoice;
}
window.cMonsterHuntingGcOppressiveYoke = function(character) {
	var mChoice = new missionChoice("huntOppressiveYoke");
	
	// Find best partner
	var validPartners = arrayMinusA(arrayMinusA(getCandidatesKeysArray(),character),"chPlayerCharacter");
	var bestPartner = findBestHuntingPartner(character,8,validPartners,"OppressiveYoke","GleamingCaverns");
	
	// Weight adjustments
	mChoice.weight = 20;
	if ( gC(character).saList.includes("baEtherealChains") == true ) {
		mChoice.weight *= 0.05;
	}
	var ongoingTimeInPeriod = 1;
	for ( var sEvent of State.variables.compass.ongoingEvents ) {
		if ( sEvent.title == "scenarioEnd" ) {
			ongoingTimeInPeriod = sEvent.ongoingTime;
		}
	}
	if ( ongoingTimeInPeriod == 0 ) { mChoice.weight *= 5; }
	else if ( ongoingTimeInPeriod >= 360 ) { mChoice.weight *= 2; }
	
	mChoice.isValid = function() {
		var isValid = true;
		// Does character want bondage skills?
		if ( character != "chAte" && character != "chClaw" ) {
			isValid = false;
		}
		// Does character have enough strength?
		var strength = quantifyCharactersGroupStrength(character);
		if ( this.bestPartner ) {
			strength += quantifyCharactersGroupStrength(this.bestPartner);
		}
		if ( strength < setup.huntingStrengthGleamingCavernsTs ) {
			isValid = false;
		}
		return isValid;
	}
	mChoice.getCommandsList = function() {
		return cMissionHuntGleamingCavernsMonsters(getCharGroup(character),"Oppressive Yoke",this.bestPartner); 
	}
	mChoice.bestPartner = bestPartner;
	return mChoice;
}

window.npcConsidersWillingnessToJoinHuntingMission = function(targetKey,actorKey,targetMonster,scenario) {
	var result = [true,"Reason"]; // [0] -> Bool result, [1] -> String explanation, display to player if they ask to NPC
	// Is target really available
	var hasInvalidGoal = false;
	for ( var goal of gC(targetKey).mapAi.goalsList ) {
		if ( goal.hasOwnProperty("targetMonster") ) {
			hasInvalidGoal = true; // Else result[0] will be declared false
		}
	}
	if ( hasInvalidGoal == false ) {
		var acceptsFactor = 0;
		// Is strength enough
		var expectedStrength = quantifyCharactersGroupStrength(actorKey) + quantifyCharacterStrength(targetKey) - setup.huntingStrengthGleamingCavernsTs;
		if ( expectedStrength <= 0 ) {
			acceptsFactor = -10000;
		} else {
			expectedStrength *= 0.3;
			acceptsFactor += expectedStrength;
		}
		// Does target like actor
		var relationValue = ((rLvlAbt(targetKey,actorKey,"friendship") - rLvlAbt(targetKey,actorKey,"rivalry")) * 1
						  + (rLvlAbt(targetKey,actorKey,"romance") - rLvlAbt(targetKey,actorKey,"enmity")) * 2) * 5;
		if ( relationValue < 0 ) {
			relationValue = -10000;
			acceptsFactor += relationValue;
		} else if ( relationValue < 40 ) {
			relationValue = (relationValue * 5) - 200;
			acceptsFactor += relationValue;
		} else {
			relationValue = relationValue * 2 - 80;
			acceptsFactor += relationValue;
		}
		// Does target want to hunt target monster
		var wantsToHuntMonsterFactor = 50;
		switch(targetMonster) {
			case "EssenceSucker":
				if ( (targetKey != "chNash" && targetKey != "chMir") || gC(targetKey).saList.includes("baDrainingKiss") ) {
					wantsToHuntMonsterFactor = -50;
				}
				break;
			case "FlyingLookout":
				if ( (targetKey != "chVal") || gC(targetKey).saList.includes("baHypnoticGlance") ) {
					wantsToHuntMonsterFactor = -50;
				}
				break;
			case "OppressiveYoke":
				if ( (targetKey != "chClaw" && targetKey != "chAte") || gC(targetKey).saList.includes("baEtherealChains") ) {
					wantsToHuntMonsterFactor = -50;
				}
				break;
		}
		acceptsFactor += wantsToHuntMonsterFactor;
		// Does target owe favor
		var owedFavor = rFavor(targetKey,actorKey) * 10;
		if ( owedFavor < 0 ) { owedFavor = 0; }
		acceptsFactor += owedFavor;
		if ( acceptsFactor <= 0 ) {
			result[0] = false;
			result[1] = gC(targetKey).getName() + " would not accept."
		} else {
			result[1] = gC(targetKey).getName() + " would accept."
		}
		result[1] += "\nExpected group strength: " + expectedStrength.toFixed(1) + ". Your combined strength must be high enough to triumph against the monsters."
				   + "\nRelationship: " + relationValue.toFixed(1) + ". The character must trust you with their life to accept."
				   + "\nWants to hunt: " + wantsToHuntMonsterFactor.toFixed(1) + ". The character may or may not see the need to hunt this kind of monster.";
		if ( owedFavor > 0 ) {
			result[1] += "\nOwed favor: " + owedFavor.toFixed(1) + ". Being indebted to you makes others more willing to accept helping you."
		}
		result[1] += "\nTotal score: " + acceptsFactor.toFixed(1);
	} else {
		result[0] = false;
		result[1] = gC(targetKey).getName() + " already has an important goal in mind.";
	}
	return result;
}

	// Special Adventure Missions
window.gCnersmiasDiscussion = function(character) {
	var mChoice = new missionChoice("npcNerConv");
	mChoice.tags = ["npcNerConv"];
	mChoice.isValid = function() {
		// Return valid if at least one action in map allows to rest
		var nersmiasIsFree = getAllActionsOnMapThat(getCurrentMap(),getCharGroup(character),function(action) { return action.tags.includes("npcNerConv"); }).length > 0;
		var charDidntSpeakToNersmias = gC(character).hasOwnProperty("flagSpokeWithNersmias") == false;
		var isValid = (nersmiasIsFree && charDidntSpeakToNersmias);
		return ( isValid );		
	}
	mChoice.getCommandsList = function() {
		return cMissionActionTag(getCurrentMap(),getCharGroup(character),"npcNerConv");
	}
	mChoice.weight = 1;
	
	var charCaresAboutTopic = false;
	var charsJgment = getCharsValtanJudgement(character);
	
	if ( charsJgment[0] < -1 || getCharsValtanJudgement[0] > 1 || getCharsValtanJudgement[1] < -1 || getCharsValtanJudgement[1] > 1 ) {
		charCaresAboutTopic = true;
		mChoice.weight = 10;
	}
	
	// Remove weight if not possible
	var nersmiasIsFree = getAllActionsOnMapThat(getCurrentMap(),getCharGroup(character),function(action) { return action.tags.includes("npcNerConv"); }).length > 0;
	var charDidntSpeakToNersmias = gC(character).hasOwnProperty("flagSpokeWithNersmias") == false;
	var isValid = (nersmiasIsFree && charDidntSpeakToNersmias);
	if ( isValid == false ) {
		mChoice.weight = 0;
	}
	
	return mChoice;
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

// Other AI functions
window.activeNPCsDeclareRivalries = function() {
	var chosenRival = "";
	var activeChars = getRandomizedActiveSimulationCharactersArray();
	activeChars = purgeGuestsNotAtTemple(activeChars);
	var activeNPCs = arrayMinusA(activeChars,"chPlayerCharacter"); // All active chars minus player are active NPCs
	
	for ( var npc of activeNPCs ) {
		chosenRival = "";
		var potentialValidRivals = arrayMinusA(activeChars,npc); // All active chars minus self must be checked as valid rivals
		var validRivals = [];
		for ( var pvr of potentialValidRivals ) {
			if ( isDeclaringRivalryPossible(npc,pvr) ) {
				validRivals.push(pvr);
			}
		}
		if ( validRivals.length > 0 ) {
			var scoredRivalsList = []; // [[rival,score],(...)]
			// Social targets, merit, infamy, character values, isACandidate
			var actorBaseScore = (getCharsDrivePercent(npc,"dAmbition") * 1.5 + getCharsDrivePercent(npc,"dDomination") * 1.5 + getCharsDrivePercent(npc,"dImprovement") * 1 - getCharsDrivePercent(npc,"dCooperation") * 2 - getCharsDrivePercent(npc,"dLove") * 1) * 40;
			if ( (actorBaseScore + limitedRandomInt(100)) > 75 ) {
				for ( var vr of validRivals ) {
					// Score each valid rival
					var score = 0;
						// Social targets
					if ( gC(npc).socialAi.allyTs.includes(vr) ) { score -= 50; }
					if ( gC(npc).socialAi.loveTs.includes(vr) ) { score -= 100; }
					if ( gC(npc).socialAi.covetTs.includes(vr) ) { score += 10; }
					if ( gC(npc).socialAi.conquestTs.includes(vr) ) { score += 40; }
					if ( gC(npc).socialAi.rivalTs.includes(vr) ) { score += 100; }
						// Merit
					if ( getCandidatesKeysArray().includes(npc) && getCandidatesKeysArray().includes(vr) ) {
						var meritDifference = gC(vr).merit - gC(npc).merit;
						if ( meritDifference > 0 ) {
							score += meritDifference * (1 + (getCharsDrivePercent(npc,"dAmbition") - 0.16) * 5);
						}
					}
						// Infamy
					var extraInfamy = gC(vr).infamy - gC(npc).infamy;
					if ( extraInfamy > 0 ) {
						score += extraInfamy * getInfluenceEffectWithDrives(npc,2,["dCooperation","dLove"],["dDomination"]);
					}
						// Relationships	
					score += (rLvlAbt(npc,vr,"rivalry") + rLvlAbt(npc,vr,"enmity")) * getInfluenceEffectWithDrives(npc,2,["dDomination"],["dCooperation"])
						   - (rLvlAbt(npc,vr,"friendship") + rLvlAbt(npc,vr,"romance")) * getInfluenceEffectWithDrives(npc,2,["dLove","dCooperation"],["dAmbition","dDomination"]);
						// Stats difference
					var statsDifference = Math.abs(quantifyCharacterStrength(npc) - 9 - quantifyCharacterStrength(vr));
					score -= (statsDifference/4.5) * getInfluenceEffectWithDrives(npc,2,["dImprovement"],["dDomination"]);
						// Randomizer
					if ( score > 0 ) {
						score += limitedRandomInt(score*2);
					}
					scoredRivalsList.push([vr,score]);
				}
				// Choose highest rated potential rival
				var highestScore = 1;
				for ( var rd of scoredRivalsList ) {
					if ( rd[1] >= highestScore ) {
						highestScore = rd[1];
						chosenRival = rd[0]
					}
				}
			}
		}
		if ( chosenRival != "" ) {
			// Create rivalry and initialize it
			declareRivalry(npc,chosenRival);
			// State.variables.compass.setMapMessage(gC(unfollowingChar).getFormattedName() + " stopped following " + gC(unfollowedChar).getFormattedName() + ".");
		}
	}
	
	
}

// Auxiliars

window.setTrainingGoals = function(charKey) {
	// Get average stat
	var averageStat = quantifyCharacterStats(charKey) / 9;
	// Create string at globalAi
	gC(charKey).globalAi.statGoals = [];
	// Link affinity to stat goal
	for ( var stat of getStatNamesArray() ) {
		var sData = gC(charKey)[stat];
		gC(charKey).globalAi.statGoals.push(((averageStat + 2) * sData.affinity * sData.affinity));
	}
}

window.quantifyCharacterVacuumStrength = function(charKey) {
	var str = 0;
	for ( var cStat of getStatNamesArray() ) {
		str += gCstat(charKey,cStat);
	}
	return str;
}
window.quantifyAverageCandidateVacuumStrength = function() {
	var aveStr = 0;
	for ( var charKey of getActiveSimulationCharactersArray() ) {
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
window.quantifyCharactersGroupStrength = function(chA) {
	var str = 0;
	for ( var charKey of getCharGroup(chA) ) {
		str += quantifyCharacterStrength(charKey);
	}
	return str;
}
window.quantifyCharactersAgroupMinusCharBStrength = function(chA,chB) {
	var str = 0;
	for ( var charKey of getCharGroup(chA) ) {
		if ( charKey != chB ) {
			str += quantifyCharacterStrength(charKey);
		}
	}
	return str;
}
window.proportionQuantifiedCharactersStrength = function(charA,charB) {
	var proportion = quantifyCharacterStrength(charA) / quantifyCharacterStrength(charB);
	return proportion;
}

window.findMostDangerousAggressiveCharacterMinusCharA = function(charA) {
	var charPlusDanger = ["",0];
	// The Candidate evaluates their situation in the training/socialization period and potential danger from other Candidates
		var dangerProportion = 0; // Fraction that determines how powerful is the most dangerous Candidate in comparison to self
		var aggressiveCandidates = []; // Find Candidates who have accumulated a certain amount of infamy
		for ( var charKey of getActiveSimulationCharactersArray() ) {
			if ( charKey != charA ) {
				if ( gC(charKey).infamy > 5 ) {
					aggressiveCandidates.push(charKey);
				}
			}
		}
		if ( aggressiveCandidates.length > 0 ) {
			var mostDangerousStrength = 0; // Find strength of most dangerous enemy
			var mostDangerousEnemy = "";
			var currentEvaluation = 0;
			for ( var charKey of aggressiveCandidates ) {
				if ( gC(charKey).followingTo == "" ) {
					currentEvaluation = quantifyCharactersGroupStrength(charKey);
					if ( currentEvaluation > mostDangerousStrength ) {
						mostDangerousStrength = currentEvaluation;
						mostDangerousEnemy = charKey;
					}
				}
			}
			charPlusDanger = [mostDangerousEnemy,mostDangerousStrength];
		}
	return charPlusDanger;
}

window.quantifyCharacterTiredness = function(charKey) {
						// ( Bar max - bar current ) / bar max ; if bar current == Result is 0 -> 1 ; if bar current == max -> Result is 0
	var tiredness = 0 + ((gC(charKey).lust.max - gC(charKey).lust.current) / gC(charKey).lust.max) +
						((gC(charKey).energy.max - gC(charKey).energy.current) / gC(charKey).energy.max) / 3 +
						((gC(charKey).willpower.max - gC(charKey).willpower.current) / gC(charKey).willpower.max) / 3 +
						((gC(charKey).socialdrive.max - gC(charKey).socialdrive.current) / gC(charKey).socialdrive.max) / 3;
	return tiredness;
}

window.canActorAttackTarget = function(actor,target) { // Checks if the actor may use any action other than "doNothing" against the target in a battle scene
	var flag = false;
	if ( simulateListValidBasicActionsOnTargetDuringCombat(actor,target).length > 0 ) { flag = true;}
	return flag;
}

window.getCloseCharactersMinusSelfWithinDistance = function(actor,distance) {
	var pathfinder = new Pathfinder(State.variables.compass.currentMap,getCharGroup(actor),gC(actor).currentRoom,function() { return true; });
	pathfinder.mainFinder();
	var chars = getCharactersInRoomsList(transformRoomsDistanceListIntoRoomsDistance(pathfinder.getAllRoomsWithinNdistance(distance)));
	chars = arrayMinusA(chars,actor);
	return chars;
}
window.getCloseCharactersMinusSelfAndPlayerWithinDistance = function(actor,distance) {
	var chars = getCloseCharactersMinusSelfWithinDistance(actor,distance);
	chars = arrayMinusA(chars,"chPlayerCharacter");
	return chars;
}
window.removeNonCandidateCharsFromCharList = function(charList) {
	var newCharList = [];
	for ( var cK of charList ) {
		if ( getCandidatesKeysArray().includes(cK) ) {
			newCharList.push(cK);
		}
	}
	return newCharList;
}

window.prioritizeAllianceTarget = function(charKey,alTargets) {
	var selectedChar = "";
	if ( alTargets.length > 1 ) {
		var weightedTargets = listIntoWeightedList(alTargets);
		for ( var el in weightedTargets ) {
			var wt = weightedTargets[el];
			if ( wt instanceof weightedElement ) {
				wt.w = Math.pow(((rLvlAbt(charKey,wt.content,"friendship") + rLvlAbt(charKey,wt.content,"romance") - rLvlAbt(charKey,wt.content,"rivalry") - rLvlAbt(charKey,wt.content,"enmity") * 2) * 10 + quantifyCharacterStats(wt.content) * 0.5),1.3);
			}
		}
		selectedChar = randomFromWeightedList(weightedTargets);
	} else {
		selectedChar = alTargets[0];
	}
	return selectedChar;
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


