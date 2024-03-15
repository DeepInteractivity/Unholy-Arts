////////// BATTLE AI ALGORITHMS CLASS //////////
// Final Battle AI algorithm design, might receive further updates without deviating on the general philosophy
// Must be recognized as an AI algorithm, but lose the baggage

window.createAiBattleAlgorithm = function() {
	var ai = new aiAlgorithm();
	ai.key = "battle";
	
	delete ai.role;
	delete ai.setRoleEqualFooting;
	delete ai.setRolePassive;
	delete ai.setRoleActive;
	delete ai.setRoleRomantic;
	delete ai.setRoleCompetition;
	delete ai.setRoleSubmission;
	delete ai.setRoleDomination;
	
	ai.callAction = function(character,allyCharacters,enemyCharacters,currentTurn) {
		return bAiProcessTurn(character,allyCharacters,enemyCharacters,currentTurn,this.fixedTarget);
	}
	return ai;
}

setup.checkElementalDamage = ["sex","physical","magic","social","fire","ice","thunder"];
// setup.baseStats = ["physique","agility","resilience","will","intelligence","perception","empathy","charisma","luck"];
window.bAiProcessTurn = function(actor,allyCharacters,enemyCharacters,currentTurn,aiFixedTarget) {
	var results = new aiResults();
	// Find all possible action-target combinations
	
	// Analyze scene state
	var isAboutToLose = (getBarPercentage(actor,"lust") <= 0.15); // True if lust <= 15% max lust
	var enemiesAboutToLose = [];
	for ( var cK of enemyCharacters ) {
		if ( getSsAiD().almostDefeated.includes(cK) ) {
			enemiesAboutToLose.push(cK);
		}
	}
	var isPinnedDown = (isAboutToLose == false && gC(actor).control == 0 && gC(cK).position.type != "free"); // Not relevant if about to lose, character must struggle
	var pinnableEnemies = [];
	var longPinnableEnemies = [];
	for ( var cK of enemyCharacters ) {
		if ( getSsAiD().pinnable.includes(cK) ) {
			pinnableEnemies.push(cK);
			if ( gC(cK).lostControlTurns > 1 ) {
				longPinnableEnemies.push(cK);
			}
		}
	}
	var alliesNeedHelp = []; // Character in allied team that require immediate help
	for ( var cK of allyCharacters ) {
		if ( getSsAiD().needsHelp.includes(cK) ) {
			alliesNeedHelp.push(cK);
		}
	}
	var isOwnControlDepleting = getSsAiD().losingControl.includes(actor); // Own control is falling
	var enemiesLosingControl = [];
	for ( var cK of enemyCharacters ) {
		if ( getSsAiD().losingControl.includes(cK) ) {
			enemiesLosingControl.push(cK);
		}
	}
	
	var overallAlliedPower = 0;
	var overallEnemyPower = 0;
	if ( State.variables.sc.teamAcharKeys.includes(actor) ) {
		overallAlliedPower = getSsAiD().teamAp;
		overallEnemyPower = getSsAiD().teamBp;
	} else {
		overallAlliedPower = getSsAiD().teamBp;
		overallEnemyPower = getSsAiD().teamAp;
	}
	var powerProportion = 1.0 * overallAlliedPower / overallEnemyPower;
	
	var activeEnemies = 0;
	var activeAllies = 0;
	for ( var cK of allyCharacters ) {
		if ( gC(cK).koed == false ) {
			activeAllies++;
		}
	}
	for ( var cK of enemyCharacters ) {
		if ( gC(cK).koed == false ) {
			activeEnemies++;
		}
	}
	
	var recoveryStacks = getUsedRecoveriesIntensity(actor);
	
	var preferredTarget = "";
	if ( aiFixedTarget != undefined ) {
		if ( allyCharacters.includes(aiFixedTarget) || enemyCharacters.includes(aiFixedTarget) ) {
			if ( gC(aiFixedTarget).koed == false ) {
				preferredTarget = aiFixedTarget;
			}
		}
	}
	
	var ATcombs = State.variables.sc.listValidActionTargetCombinationsByChar(actor); // [[action,target],[action,target]...]
		// Add chance of succeeding [action,target] -> [action,target,successChance]
		// sc.testingActionChances must be active (true)
	for ( var comb of ATcombs ) {
		var successChance = setup.saList[comb[0]].doesHitLand(actor,comb[1]);
		if ( successChance.hasOwnProperty("hit") ) {
			if ( successChance.hit == true ) { successChance = 100; }
			else { successChance = 0; }
		} else if ( successChance == true ) {
			successChance = 100;
		} else if ( successChance == false ) {
			successChance = 0;
		}
		comb.push(parseInt(successChance));
	}
	
		// Add weight
	for ( var comb of ATcombs ) { // Per action/target combination
		var action = comb[0];
		var target = comb[1];
		var w = 10; // Base weight
		if ( ( setup.saList[action].strategyTags.includes("targetEnemy") && enemyCharacters.includes(target) )
		  || ( setup.saList[action].strategyTags.includes("targetAlly") && allyCharacters.includes(target) )
		  || ( setup.saList[action].strategyTags.includes("targetAllyOtherThanSelf") && allyCharacters.includes(target) && target != actor )
		  || ( setup.saList[action].strategyTags.includes("targetSelf") && target == actor ) ) {
			// Stats
			var si = 0;
			var participatingChars = getRemainingCharsAllyTeam(actor).concat(getRemainingCharsEnemyTeam(actor));
			for ( var cK of participatingChars ) {
				si = 0;
				var baseStatWeight = 0.5; // Base stat without modifiers, usually used for buff/debuff actions
				var effStatWeight = 0.5; // Stat after modifiers, usually used for damage and intensity calculations
				if ( (setup.saList[action].strategyTags.includes("damage") || setup.saList[action].strategyTags.includes("recovery")) &&
					 (setup.saList[action].strategyTags.includes("buff") || setup.saList[action].strategyTags.includes("debuff")) ) {
				} else if ( setup.saList[action].strategyTags.includes("damage") || setup.saList[action].strategyTags.includes("recovery") ) {
					baseStatWeight = 0;
					effStatWeight = 1;
				} else if ( setup.saList[action].strategyTags.includes("buff") || setup.saList[action].strategyTags.includes("debuff") ) {
					baseStatWeight = 1;
					effStatWeight = 0;
				} else {
				}	
				if ( cK == actor ) {
					while ( si < 9 ) {
						w += setup.saList[action].actorStatWeights[si] * gCstat(cK,setup.baseStats[si]) * effStatWeight * (1/setup.saList[action].statWeightDivider);
						w += setup.saList[action].actorStatWeights[si] * gC(cK)[setup.baseStats[si]].value * baseStatWeight * (1/setup.saList[action].statWeightDivider);
						si++;
					}
				} else if ( cK == target || ( (setup.saList[action].strategyTags.includes("targetsAllOtherChars") || setup.saList[action].strategyTags.includes("targetsEnemyTeam")) && enemyCharacters.includes(cK) ) ) {
					while ( si < 9 ) {
						w += setup.saList[action].targetStatWeights[si] * gCstat(cK,setup.baseStats[si]) * effStatWeight * (1/setup.saList[action].statWeightDivider);
						w += setup.saList[action].targetStatWeights[si] * gC(cK)[setup.baseStats[si]].value * baseStatWeight * (1/setup.saList[action].statWeightDivider);
						si++;
					}
				} else if ( setup.saList[action].strategyTags.includes("targetsAllOtherChars") && allyCharacters.includes(cK) ) {
					while ( si < 9 ) {
						w += -1 * setup.saList[action].targetStatWeights[si] * gCstat(cK,setup.baseStats[si]) * effStatWeight * (1/setup.saList[action].statWeightDivider);
						w += -1 * setup.saList[action].targetStatWeights[si] * gC(cK)[setup.baseStats[si]].value * baseStatWeight * (1/setup.saList[action].statWeightDivider);
						si++;
					}
				} else if ( setup.saList[action].strategyTags.includes("targetsAlliedTeam") && allyCharacters.includes(cK) ) {
					while ( si < 9 ) {
						w += setup.saList[action].allyStatWeights[si] * gCstat(cK,setup.baseStats[si]) * effStatWeight * (1/setup.saList[action].statWeightDivider);
						w += setup.saList[action].allyStatWeights[si] * gC(cK)[setup.baseStats[si]].value * baseStatWeight * (1/setup.saList[action].statWeightDivider);
						si++;
					}
				}
			}
			
			/*
			while ( si < 9 ) {
				w += setup.saList[action].actorStatWeights[si] * gCstat(actor,setup.baseStats[si]) * (1/setup.saList[action].statWeightDivider);
				w += setup.saList[action].targetStatWeights[si] * gCstat(target,setup.baseStats[si]) * (1/setup.saList[action].statWeightDivider);
				si++;
			}
			*/
			
			if ( preferredTarget != "" ) {
				if ( target == actor ) {
					w *= 0.3;
				} else if ( target != preferredTarget ) {
					w *= 0.1;
				}
			}
			
			// Strategic evaluations
			if ( setup.saList[action].strategyTags.includes("damage") ) {
				if ( enemiesAboutToLose.includes(target) ) { // enemiesAboutToLose
					w *= 3;
				} else if ( getBarPercentage(target,"lust") < 0.3 ) {
					w *= 1.5;
				} else if ( getBarPercentage(target,"lust") < 0.5 ) {
					w *= 1.25;
				} else if ( getBarPercentage(target,"lust") < 0.8 ) {
					w *= 1.1;
				}
			}
			if ( isAboutToLose ) { // isAboutToLose
				if ( setup.saList[action].strategyTags.includes("damage") ) {
					w *= 10;
				}
			} else if ( isPinnedDown ) { // isPinnedDown
				if ( setup.saList[action].strategyTags.includes("struggle") ) {
					w *= 30;
					// TODO : FURTHER EVALUATIONS
				}
			} else {
				// Standard evaluations
				if ( pinnableEnemies.length > 0 ) { // Pinnable enemies
					if ( pinnableEnemies.includes(target) && setup.saList[action].strategyTags.includes("pounce") ) {
						w *= 2;
						if ( quantifyCharacterStrength(actor) > quantifyCharacterStrength(target) ) {
							w *= 4;
						}
						if ( gC(actor).lostControlTurns > 1 ) {
							w *= 0.5;
						}
					}
				}
				if ( isOwnControlDepleting ) { // Get ready for control loss
					if ( ( setup.saList[action].strategyTags.includes("buff") || setup.saList[action].strategyTags.includes("minorBuff") ) && target == actor ) {
						w *= 2;
					}
					if ( setup.saList[action].strategyTags.includes("recoverControl") ) {
						w *= 1.5;
					}
				}
				if ( setup.saList[action].strategyTags.includes("damageControl") ) {
					if ( enemiesLosingControl.includes(target) ) { // Target is losing control
						w *= 2;
					} else if ( gC(target).control > 0 && getBarPercentage(target,"lust") > 0.8 ) {
						w *= 1.35;
					}
				} else if ( gC(target).control <= 1.5 && getBarPercentage(target,"lust") > 0.6 && ( setup.saList[action].strategyTags.includes("pounce") == false ) ) {
					w *= 0.7;
				}
				
				if ( setup.saList[action].strategyTags.includes("damage") && setup.saList[action].strategyTags.includes("damageControl") == false && setup.saList[action].strategyTags.includes("buff") == false && setup.saList[action].strategyTags.includes("debuff") == false ) {
					if ( getBarPercentage(target,"lust") > 0.8 ) {
						w *= 0.8;
					}
				}
				
				if ( alliesNeedHelp.length > 0 ) { // alliesNeedHelp
					if ( alliesNeedHelp.includes(actor) && setup.saList[action].strategyTags.includes("selfProtection") ) {
						w *= 10;
					}
					if ( setup.saList[action].strategyTags.includes("teamProtection") ) {
						w *= 5;
					}
				}
				
				// Modes
				if ( setup.saList[action].strategyTags.includes("mode") ) {
					if ( State.variables.sc.currentTurn < 4 ) {
						w *= 2.8 - ( State.variables.sc.currentTurn * 0.5 );
						if ( powerProportion < 0.9 ) {
							w *= 1.5;
						}
					}
					w *= getBarPercentage(actor,"lust");
					w *= ( gC(actor).control / gC(actor).maxControl );
					if ( setup.saList[action].strategyTags.includes("willpowerMode") ) {
						w *= getBarPercentage(actor,"willpower");
					}
					if ( setup.saList[action].strategyTags.includes("energyMode") ) {
						w *= getBarPercentage(actor,"energy");
					}
					if ( setup.saList[action].strategyTags.includes("socialdriveMode") ) {
						w *= getBarPercentage(actor,"socialDrive");
					}
				}
				
				// Buffs and Debuffs general evaluations
				if ( getSsAiD()[actor].power != 0 ) {
					var deBuffWgain = getSsAiD()[target].power / getSsAiD()[actor].power;
				} else {
					var deBuffWgain = 1;
				}
				if ( enemyCharacters.includes(target) ) {
					deBuffWgain += Math.min(getSsAiD()[target].DeBuffs * 0.3,0.75);
				} else if ( allyCharacters.includes(target) ) {
					deBuffWgain -= Math.max(getSsAiD()[target].DeBuffs * 0.3,-0.75);
				}
				if ( powerProportion < 1.6 ) {
					deBuffWgain *= 0.7;
				} else if ( powerProportion < 1.2 ) {
					deBuffWgain *= 0.9;
				} else if ( powerProportion < 0.9 ) {
					deBuffWgain *= 1.5;
				} else if ( powerProportion < 0.7 ) {
					deBuffWgain *= 2;
				} else {
					deBuffWgain *= 0.4;
				}
				if ( setup.saList[action].strategyTags.includes("buff") || setup.saList[action].strategyTags.includes("debuff") ) {
					w *= deBuffWgain;
				} else if ( setup.saList[action].strategyTags.includes("minorBuff") || setup.saList[action].strategyTags.includes("minorDebuff") ) {
					w *= (0.5 + deBuffWgain * 0.5);
				}
				
				// Multiple targets
				if ( setup.saList[action].strategyTags.includes("multipleEnemies") && setup.saList[action].strategyTags.includes("multipleAllies") ) {
					w *= ( 0.55 + (activeAllies + activeEnemies) * 0.15 );
				} else {
					if ( setup.saList[action].strategyTags.includes("multipleEnemies") ) {
						w *= (0.55 + activeEnemies * 0.3 );
					}
					if ( setup.saList[action].strategyTags.includes("multipleAllies") ) {
						w *= (0.55 + activeAllies * 0.3 );
					}
				}
				
				// Drain
				if ( setup.saList[action].strategyTags.includes("drainLust") ) {
					w *= (0.7 + (1 - getBarPercentage(actor,"lust")) * 1.5 );
				}
				if ( setup.saList[action].strategyTags.includes("drainEnergy") ) {
					w *= (0.7 + (1 - getBarPercentage(actor,"energy")) * 1.5 );
				}
				if ( setup.saList[action].strategyTags.includes("drainWillpower") ) {
					w *= (0.7 + (1 - getBarPercentage(actor,"willpower")) * 1.5 );
				}
				if ( setup.saList[action].strategyTags.includes("drainSocialdrive") ) {
					w *= (0.7 + (1 - getBarPercentage(actor,"socialdrive")) * 1.5 );
				}
				
				// Self target
				if ( setup.saList[action].strategyTags.includes("targetSelf") ) {
					w *= (0.4 + ( activeAllies + activeEnemies ) * 0.3);
				}
				
				// Recovery
				if ( setup.saList[action].strategyTags.includes("recovery") ) {
					w *= (1 - ( recoveryStacks * 0.12 ));
					if ( w <= 0 ) { w = 0; }
					if ( setup.saList[action].strategyTags.includes("recoverLust") ) {
						if ( getBarPercentage(actor,"lust") > 0.3 ) {
							w *= 0.2;
						} else {
							w *= (0.3 - getBarPercentage(actor,"lust") * 10);
						}
					}
					if ( setup.saList[action].strategyTags.includes("recoverWillpower") ) {
						if ( getBarPercentage(actor,"willpower") > 0.3 ) {
							w *= 0.2;
						} else {
							w *= (0.3 - getBarPercentage(actor,"willpower") * 10);
						}
					}
					if ( setup.saList[action].strategyTags.includes("recoverEnergy") ) {
						if ( getBarPercentage(actor,"energy") > 0.3 ) {
							w *= 0.2;
						} else {
							w *= (0.3 - getBarPercentage(actor,"energy") * 10);
						}
					}
					if ( setup.saList[action].strategyTags.includes("recoverSocialdrive") ) {
						if ( getBarPercentage(actor,"socialdrive") > 0.3 ) {
							w *= 0.2;
						} else {
							w *= (0.3 - getBarPercentage(actor,"socialdrive") * 10);
						}
					}
				}
				
				// Holy actions
				if ( setup.saList[action].strategyTags.includes("holyAttack") ) {
					if ( (gC(target).combatAffinities.holy.wkn - gC(target).combatAffinities.holy.rst) <= 0 ) {
						w *= 0;
					} else {
						w *= 3;
					}
				}
				if ( setup.saList[action].strategyTags.includes("holy") ) {
					if ( getBarPercentage(actor,"lust") <= 0.5 ) {
						w *= (getBarPercentage(actor,"lust") - 0.1);
					}
				}
				
				// Target free arms
				if ( setup.saList[action].strategyTags.includes("targetFreeArms") ) {
					if ( gC(target).hasFreeBodypart("arms") == false ) {
						w *= 0.3;
					}
				}
				
				// Misc
					// Gambit of Honesty
				if ( setup.saList[action].strategyTags.includes("gambitHonesty") ) {
					if ( doesCharHaveState(target,"Cynl") ) {
						w *= 1.7;
					}
					if ( actor == "chSet" ) {
						w *= 1.3;
					}
				}
					// Gambit of Deceit
				if ( setup.saList[action].strategyTags.includes("gambitDeceit") ) {
					if ( doesCharHaveState(target,"Trst") ) {
						w *= 1.4;
					}
					if ( actor == "chSet" ) {
						w *= 1.3;
					}
				}
					// RecklessSwing
				if ( setup.saList[action].strategyTags.includes("recklessSwing") ) {
					var allyTeam = getRemainingCharsAllyTeam(actor);
					var enemyTeam = getRemainingCharsEnemyTeam(actor);
					w *= 1 - ((allyTeam.length-1)*0.25);
					w *= 1 - ((enemyTeam.length-1)*0.1);
				}

				// Elemental damage
				if ( setup.saList[action].strategyTags.includes("damage") ) {
					for ( var el of setup.checkElementalDamage ) {
						if ( setup.saList[action].strategyTags.includes(el) ) {
							var expectedDamMult = (gC(actor).combatAffinities[el].strength - gC(actor).combatAffinities[el].frlt + gC(target).combatAffinities[el].wkn - gC(actor).combatAffinities[el].rst) * 0.01;
							w *= (1 + expectedDamMult * 0.5);
						}
					}
				}
				
				// Avoid when vulnerable
				if ( setup.saList[action].strategyTags.includes("damage") ) {
					if ( (gC(actor).control / gC(actor).maxControl) < 0.4 ) {
						w *= 0.4;
					}
				}
				
				// Sex Offensive: Pinnable targets with more than 1 lost control turns are good targets for sex offensive strategies
				var validSexOffensive = false;
				if ( setup.saList[action].strategyTags.includes("sexOffensive") ) {
					if ( longPinnableEnemies.length > 0 && longPinnableEnemies.includes(target) ) {
						if ( (gC(actor).combatAffinities.sex.strength - gC(actor).combatAffinities.sex.frlt + gC(target).combatAffinities.sex.wkn - gC(actor).combatAffinities.sex.rst) > 0 ) {
							w *= 2;
							validSexOffensive = true;
						}
					} else if ( longPinnableEnemies.length > 0 && actor == target ) {
						w *= 1.5;
						validSexOffensive = true;
					}
				}
				if ( validSexOffensive == false && setup.saList[action].strategyTags.includes("onlySexOffensive") ) {
					w *= 0.4;
				}
				// Sex Defensive: Actor has more than 1 lost control turns
				var validSexDefensive = false;;
				if ( setup.saList[action].strategyTags.includes("sexDefensive") ) {
					if ( gC(actor).lostControlTurns > 0 ) {
						w *= 2.5;
						validSexDefensive = true;
					}
				}
				// Either Sex Strategy: Disfavored action if neither sexOffensive or sexDefensive is valid
				if ( setup.saList[action].strategyTags.includes("eitherSexStrategy") ) {
					if ( validSexDefensive == false && validSexOffensive == false ) {
						w *= 0.2;
					}
				}
				
				// barOffensive: Target is low on the target bar
				if ( setup.saList[action].strategyTags.includes("willpowerOffensive") ) {
					if ( getBarPercentage(target,"willpower") <= 0.3 || gC(target).willpower.current <= 20 ) {
						w *= 2.5;
					}
				}
				if ( setup.saList[action].strategyTags.includes("energyOffensive") ) {
					if ( getBarPercentage(target,"energy") <= 0.3 || gC(target).energy.current <= 20 ) {
						w *= 2.5;
					}
				}
				if ( setup.saList[action].strategyTags.includes("socialdriveOffensive") ) {
					if ( getBarPercentage(target,"socialdrive") <= 0.3 || gC(target).socialdrive.current <= 20 ) {
						w *= 2.5;
					}
				}
				
				// Capture monster: If target is a monster of the type the actor wants to capture, capture monster
				if ( setup.saList[action].strategyTags.includes("captureMonster") ) {
					if ( gC(target).race == "monster" ) {
						if ( gC(actor).hasOwnProperty("mapAi") ) {
							if ( gC(actor).mapAi.goalsList.length > 0 ) {
								if ( gC(actor).mapAi.goalsList[0].hasOwnProperty("targetMonster") ) {
									if ( gC(target).monsterType == gC(actor).mapAi.goalsList[0].targetMonster ) {
										w *= 50;
									}
								}
							}
						}
					}
				}
				
				// Run away: If monster forces are overwhelmengly stronger, run away when possible
				if ( setup.saList[action].strategyTags.includes("runAway") ) {
					if ( powerProportion <= 0.5 ) {
						w *= 30;
					}
				}
			}
			
			if ( gC(target).control == 0 ) { // Don't damage control
				if ( setup.saList[action].strategyTags.includes("damageControl") ) {
					w *= 0.6;
				}
			}
			
			if ( comb[2] > 40 ) {
				w *= comb[2] * 0.01;
			} else if ( comb[2] > 20 ) {
				w *= comb[2] * 0.006;
			} else {
				w *= comb[2] * 0.002;
			}
			w *= setup.saList[action].overallWeightMultiplier;
			comb.push(parseInt(w));
		} else {
			comb.push(parseInt(0));
		}
	}
	
	var maxWeight = 0;
	for ( var comb of ATcombs ) {
		if ( comb[3] > maxWeight ) {
			maxWeight = comb[3];
		}
	}
	var weightLowerThreshold = maxWeight * 0.3;
	var weightUpperThreshold = maxWeight * 0.8;
	var weightMiddleThreshold = maxWeight * 0.6;
	
	if ( State.variables.sc.logAi ) {
		State.variables.sc.sceneLog += "\n\nCombinations for " + actor + ":\n";
		for ( var comb of ATcombs ) {
			State.variables.sc.sceneLog += comb[0] + " ON " + comb[1] + ", weight: " + comb[3].toFixed(1) + ", %: " + comb[2];
			if ( comb[3] <= 0 ) {
				State.variables.sc.sceneLog += colorText(" NON-POSITIVE WEIGHT","red");
			} else if ( comb[3] < weightLowerThreshold ) {
				State.variables.sc.sceneLog += colorText(" BELOW LOWER WEIGHT THRESHOLD","red");
			} else if ( comb[3] > weightUpperThreshold ) {
				State.variables.sc.sceneLog += colorText(" ABOVE UPPER WEIGHT THRESHOLD","green");
			} else if ( comb[3] > weightMiddleThreshold ) {
				State.variables.sc.sceneLog += colorText(" ABOVE MIDDLE WEIGHT THRESHOLD","darkgreen");
			}
			State.variables.sc.sceneLog += "\n";
		}
		State.variables.sc.sceneLog += "\n";
	}
	
		// Add to Weighted List
	var wL = new weightedList();
	var i = 0;
	for ( var comb of ATcombs ) { // [action,target,successChance,weight]
		if ( comb[3] > weightUpperThreshold ) {
			comb[3] = Math.pow(comb[3],1.4);
		} else if ( comb[3] > weightMiddleThreshold ) {
			comb[3] = Math.pow(comb[3],1.2);
		}
		if ( comb[3] > 0 && comb[3] > weightLowerThreshold ) { // Remove combinations with non-positive weight, combinations below weight threshold
			wL[i] = new weightedElement([comb[0],comb[1]],comb[3]); // Element: [action,target], Weight: weight
		}
		i++;
	}
	var chosenAction = randomFromWeightedList(wL);
	
	// TODO: Fix in case there aren't enough options
	
	/*
	sa.actorStatWeights = [0,100,0,0,0,0,0,0,0];
	sa.targetStatWeights = [0,0,0,0,0,0,0,0,0];
	sa.statWeightDivider = 100;
	sa.overallWeightMultiplier = 0.8;
	*/
	
	if ( maxWeight <= 0 ) {
		results.actionKey = "doNothing";
		results.targetsIDs = [actor];
	} else {
		results.actionKey = chosenAction[0];
		results.targetsIDs = [chosenAction[1]];
	}
	
	return results;
}


