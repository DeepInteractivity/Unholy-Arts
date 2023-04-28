///// POST-SCENE LOGIC /////
window.processGenericSexSceneEffects = function() {
	var allChars = State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys);
	var resultsMessage = "";
	for ( var charKey of allChars ) {
		if ( gC(charKey).orgasmSceneCounter > 0 ) {
			gC(charKey).lust.restore();
		}
	}
	
	var	allCharsMsgs = [];
	
	// Invigorated Aether altered state
	var invAeMsg = "";
	if ( State.variables.storyState >= storyState.secondLoop ) { // Invigorated aether is allowed
		for ( var cK of allChars ) {
			var orgasms = gC(cK).orgasmSceneCounter + gC(cK).mindblowingOrgasmSC * 2 + gC(cK).ruinedOrgasmSceneCounter;
			if ( orgasms > 0 ) {
				var newIntensity = getPositionInBasicGeometricProgression(orgasms);
				var currentIntensity = returnIntensityOfAlteredState(cK,"InAe");
				
				if ( currentIntensity == -1 ) {
					// Add AS
					applyAlteredState([cK],createASinvigoratedAether(newIntensity));
					invAeMsg += ktn(cK) + "'s aether was invigorated.\n";
				} else if ( currentIntensity < newIntensity ) {
					// Add new intensity and extend duration
					gC(cK).removeSpecificState("InAe");
					applyAlteredState([cK],createASinvigoratedAether(newIntensity));
					invAeMsg += ktn(cK) + "'s aether was further invigorated.\n";
				} else {
					// Extend duration
					var newDuration = getInAeDuration(newIntensity);
					for ( var as of gC(cK).alteredStates ) {
						if ( as.acr == "InAe" ) {
							as.remainingDays = newDuration;
						}
					}
					invAeMsg += ktn(cK) + "'s aether invigoration was renewed.\n";
				}
			}
		}
	}
	
	// Relations & Drives changes
	for ( var charKey of allChars ) {
		gC(charKey).orgasmSceneCounter += gC(charKey).mindblowingOrgasmSC * 2;
		allChars[charKey] = [];
		var allOtherChars = arrayMinusA(allChars,charKey);
		var avrRomance = getAverageRelationStatBetweenCharAndGroup("romance",charKey,allOtherChars);
		var avrSexualTension = getAverageRelationStatBetweenCharAndGroup("sexualTension",charKey,allOtherChars);
		allCharsMsgs[charKey] = [];
		if ( gC(charKey).hasOwnProperty("daysWithoutSex") ) {
			allCharsMsgs[charKey].msg = "";
			var effectsMultiplier = getSexEffectsMultiplier(charKey);
			if ( effectsMultiplier > 3.3 ) { effectsMultiplier = 3.3; }
			if ( State.variables.sc.enabledLead == "fixed" ) { // Fixed lead
				if ( gC(charKey).hasLead ) {					  // Char was top
						// Define values
					var gainedRomance = 20;
					var gainedSexualTension = 30;
					var gainedDomination = 30;
					var gainedDriveLove = 0;
					var gainedDrivePleasure = 0;
					var gainedDriveDomination = 0;
					if ( gC(charKey).orgasmSceneCounter > 0 ) {
						gainedSexualTension += 20;
						gainedDrivePleasure += 10;
						gainedDriveDomination += 20;
						if ( avrRomance > 1 && ( avrRomance * 0.8 >= avrSexualTension ) ) {
							gainedDriveLove = 10;
						} else if ( avrRomance > 1 && ( avrRomance * 1.3 >= avrSexualTension ) ) {
							gainedDriveLove = 5;
						}
					}
					gainedRomance *= effectsMultiplier * (1 + ((gC(charKey).mood.intimate - gC(charKey).mood.angry - gC(charKey).mood.bored) / 100));
					gainedSexualTension *= effectsMultiplier * (1 + ((gC(charKey).mood.aroused + gC(charKey).mood.flirty - gC(charKey).mood.bored) / 200));
					gainedDomination *= effectsMultiplier * (1 + ((gC(charKey).mood.dominant - gC(charKey).mood.submissive) / 100));
					gainedDriveLove *= effectsMultiplier * (1 + ((gC(charKey).mood.intimate * 2 - gC(charKey).mood.bored) / 200)) * (avrRomance/avrSexualTension);
					if ( allChars.length > 2 && ( (avrRomance / avrSexualTension) < 0.8 ) ) {
						gainedDriveLove *= ( 1 - allChars.length * 0.1 );
					}
					gainedDrivePleasure *= effectsMultiplier * (1 + ((gC(charKey).mood.aroused + gC(charKey).mood.flirty - gC(charKey).mood.bored) / 200)) * (avrSexualTension/avrRomance);
					if ( allChars.length == 2 && ( (avrRomance / avrSexualTension) > 1.2 ) ) {
						gainedDrivePleasure *= 0.8;
					}
					gainedDriveDomination *= effectsMultiplier * (1 + ((gC(charKey).mood.dominant - gC(charKey).mood.submissive) / 100));
					
						// Apply values
							// Relations
					for ( var charKey2 of allChars ) {
						if ( charKey2 != charKey ) {
							gC(charKey).relations[charKey2].romance.stv += gainedRomance;
							gC(charKey).relations[charKey2].sexualTension.stv += gainedSexualTension;
							gC(charKey).relations[charKey2].domination.stv += gainedDomination;
						}
					}
							// Drives
					addPointsToDrive(gC(charKey).dPleasure,gainedDrivePleasure);
					addPointsToDrive(gC(charKey).dDomination,gainedDriveDomination);
						// Text
					allCharsMsgs[charKey].msg += gC(charKey).getFormattedName() + " has gained " + gainedRomance.toFixed(1) + " romance, " + gainedSexualTension.toFixed(1)
										   + " sexual tension, and " + gainedDomination.toFixed(1) + " domination towards the other characters.\n";
					if ( gainedDrivePleasure > 0 ) {
						allCharsMsgs[charKey].msg += gC(charKey).getFormattedName() + " has gained " + gainedDrivePleasure.toFixed(1) + " pleasure drive points, " + gainedDriveLove.toFixed(1) + " love drive points and "
											   + gainedDriveDomination.toFixed(1) + " domination drive points.";
					}
				} else {										  // Char was bottom
						// Define values
					var gainedRomance = 25 + gC(charKey).orgasmSceneCounter * 5 - gC(charKey).ruinedOrgasmSceneCounter * 5;
					var gainedSexualTension = 35 + gC(charKey).orgasmSceneCounter * 10 + gC(charKey).ruinedOrgasmSceneCounter * 10;
					var gainedSubmission = 25 + gC(charKey).orgasmSceneCounter * 5 + gC(charKey).ruinedOrgasmSceneCounter * 15;
					var gainedEnmity = gC(charKey).ruinedOrgasmSceneCounter * 5;
					var gainedDrivePleasure = 8 + gC(charKey).orgasmSceneCounter * 2 + gC(charKey).ruinedOrgasmSceneCounter * 3;
					var gainedDriveLove = - gC(charKey).ruinedOrgasmSceneCounter * 2;
					if ( avrRomance > 1 && ( avrRomance * 1.3 >= avrSexualTension ) ) {
						gainedDriveLove += 5 + gC(charKey).orgasmSceneCounter * 2;
					}
					var gainedExtraSubmission = 25;
					var energyLostPer = gC(charKey).energy.accumulatedDamage / gC(charKey).energy.max;
					if ( energyLostPer > 1 ) { energyLostPer = 1; }
					var willpowerLostPer = gC(charKey).willpower.accumulatedDamage / gC(charKey).willpower.max;
					if ( willpowerLostPer > 1 ) { willpowerLostPer = 1; }
					gainedExtraSubmission *= ( ( energyLostPer + willpowerLostPer ) / 2 );
					if ( gC(charKey).orgasmSceneCounter == 0 && gC(charKey).ruinedOrgasmSceneCounter == 0 ) {
						gainedSexualTension = -20;
						gainedEnmity = 20;
						gainedRomance = 0;
						gainedSubmission = 20;
						gainedDrivePleasure = -10;
					} else if ( gC(charKey).orgasmSceneCounter == 0 ) {
						gainedSexualTension += 20;
						gainedEnmity += 20;
						gainedRomance += 0;
						gainedSubmission += 20;
						gainedDrivePleasure += 10;
					}
					gainedRomance *= effectsMultiplier * (1 + ((gC(charKey).mood.intimate - gC(charKey).mood.angry - gC(charKey).mood.bored) / 100));
					gainedSexualTension *= effectsMultiplier * (1 + ((gC(charKey).mood.aroused + gC(charKey).mood.flirty - gC(charKey).mood.bored) / 200));
					gainedSubmission += gainedExtraSubmission;
					gainedSubmission *= effectsMultiplier * (1 + ((- gC(charKey).mood.dominant + gC(charKey).mood.submissive) / 100));
					gainedEnmity *= effectsMultiplier * (1 + ((gC(charKey).mood.angry - gC(charKey).mood.submissive) / 100));
					gainedDriveLove *= effectsMultiplier * (1 + ((gC(charKey).mood.intimate + gC(charKey).mood.friendly - gC(charKey).mood.angry - gC(charKey).mood.bored) / 200)) * (avrRomance/avrSexualTension);
					if ( allChars.length > 2 && ( (avrRomance / avrSexualTension) < 0.8 ) ) {
						gainedDriveLove *= ( 1 - allChars.length * 0.1 );
					}
					gainedDrivePleasure *= effectsMultiplier * (1 + ((gC(charKey).mood.aroused + gC(charKey).mood.flirty - gC(charKey).mood.bored) / 200)) * (avrSexualTension/avrRomance);
					if ( allChars.length == 2 && ( (avrRomance / avrSexualTension) > 1.2 ) ) {
						gainedDrivePleasure *= 0.8;
					}
						// Apply values
							// Relations
					var leadingChar = charKey;
					for ( var charKey2 of allChars ) {
						if ( gC(charKey2).hasLead ) {
							leadingChar = charKey2;
							if ( charKey != charKey2 ) {
								gC(charKey).relations[charKey2].romance.stv += gainedRomance;
								gC(charKey).relations[charKey2].sexualTension.stv += gainedSexualTension;
								gC(charKey).relations[charKey2].submission.stv += gainedSubmission;
								gC(charKey).relations[charKey2].enmity.stv += gainedEnmity;
							}
						}
					}
							// Drives
					addPointsToDrive(gC(charKey).dPleasure,gainedDrivePleasure);
					addPointsToDrive(gC(charKey).dLove,gainedDriveLove);
						// Text
					if ( gC(charKey).orgasmSceneCounter == 0 && gC(charKey).ruinedOrgasmSceneCounter == 0 ) {
						allCharsMsgs[charKey].msg += gC(charKey).getFormattedName() + " has gained " + gainedEnmity.toFixed(1) + " enmity and " + gainedSubmission.toFixed(1) 
											   + " submission, and lost " + (-gainedSexualTension).toFixed(1) + " sexual tension with " + gC(leadingChar).getFormattedName() + ".\n"
											   + gC(charKey).getFormattedName() + " lost " + (-gainedDrivePleasure).toFixed(1) + " pleasure drive points."
					} else {
						allCharsMsgs[charKey].msg += gC(charKey).getFormattedName() + " has gained " + gainedRomance.toFixed(1) + " romance, " + gainedSexualTension.toFixed(1)
											   + " sexual tension and " + gainedSubmission.toFixed(1) + " submission towards " + gC(leadingChar).getFormattedName() + ".\n"
											   + gC(charKey).getFormattedName() + " gained " + gainedDrivePleasure.toFixed(1) + " pleasure drive points and " + gainedDriveLove.toFixed(1) + " love drive points.";
					}
				}
			} else {				// Dynamic lead
				var gainedRomance = 0;
				var gainedSexualTension = 0;
				var gainedEnmity = 0;
				var gainedLoveDrive = 0;
				var gainedPleasureDrive = 0;
				var gainedCooperationDrive = 0;
				var gainedDominationDrive = 0;
				var gainedSubmission = 0;
				
				var energyLostPer = gC(charKey).energy.accumulatedDamage / gC(charKey).energy.max;
				if ( energyLostPer > 1 ) { energyLostPer = 1; }
				var willpowerLostPer = gC(charKey).willpower.accumulatedDamage / gC(charKey).willpower.max;
				if ( willpowerLostPer > 1 ) { willpowerLostPer = 1; }
				var extraSubmissionMult =  ( ( energyLostPer + willpowerLostPer ) / 2 );
				
					// Decide changes
				if ( gC(charKey).orgasmSceneCounter == 0 ) { // Character didn't orgasm
					if ( gC(charKey).ruinedOrgasmSceneCounter == 0 ) {
						gainedSexualTension = -20;
						gainedRomance = -20;
						gainedEnmity = 20;
						gainedLoveDrive = -5;
						gainedPleasureDrive = -10;
						gainedCooperationDrive = -5;
						gainedDominationDrive = 10;
						if ( allChars.length == 2 ) {
							gainedSubmission = 10 * extraSubmissionMult;
						}
					} else {
						gainedSexualTension = 20;
						gainedRomance = -20;
						gainedEnmity = 20;
						gainedLoveDrive = -5;
						gainedPleasureDrive = 10;
						gainedCooperationDrive = -5;
						gainedDominationDrive = 5;
						if ( allChars.length == 2 ) {
							gainedSubmission = 10 * extraSubmissionMult;
						}
					}
				} else {									// Character did orgasm
					// Two characters in scene
					if ( allChars.length == 2 ) {
						gainedRomance = 25 + gC(charKey).orgasmSceneCounter * 5;
						gainedSexualTension = 35 + gC(charKey).orgasmSceneCounter * 10;
						gainedEnmity = -2 - gC(charKey).orgasmSceneCounter * 5;
						gainedLoveDrive = 8 + gC(charKey).orgasmSceneCounter * 2;
						gainedPleasureDrive = 8 + gC(charKey).orgasmSceneCounter * 2;
						gainedCooperationDrive = 4 + gC(charKey).orgasmSceneCounter;
						gainedSubmission = 20 * extraSubmissionMult;
					} else { // More than two characters in scene
						gainedRomance = 10 + gC(charKey).orgasmSceneCounter * 3;
						gainedSexualTension = 20 + gC(charKey).orgasmSceneCounter * 5;
						gainedEnmity = -1 - gC(charKey).orgasmSceneCounter * 2;
						gainedLoveDrive = 4 + gC(charKey).orgasmSceneCounter;
						gainedPleasureDrive = 8 + gC(charKey).orgasmSceneCounter * 2;
						gainedCooperationDrive = 4 + gC(charKey).orgasmSceneCounter;
						
					}
				}
				// Ruined orgasms
				gainedRomance -= gC(charKey).ruinedOrgasmSceneCounter * 2;
				gainedSexualTension += gC(charKey).ruinedOrgasmSceneCounter * 5;
				gainedEnmity += gC(charKey).ruinedOrgasmSceneCounter * 5;
				gainedLoveDrive -= gC(charKey).ruinedOrgasmSceneCounter * 2;
				gainedPleasureDrive += gC(charKey).ruinedOrgasmSceneCounter * 3;
				gainedCooperationDrive -= gC(charKey).ruinedOrgasmSceneCounter * 2;
				gainedDominationDrive += gC(charKey).ruinedOrgasmSceneCounter * 1;
				gainedSubmission += gC(charKey).ruinedOrgasmSceneCounter * 5;
				
				// Intimacy
					// Get highest intimacy
				var higInt = -999;
				for ( var cK2 of allChars ) {
					if ( cK2 != charKey ) {
						var cInt = getCharsRelativeIntimacy(charKey,cK2);
						if ( cInt > higInt ) {
							higInt = cInt;
						}
					}
				}
				var romIntMult = 0.8 + Math.max(higInt * 0.1,-0.2);
				var sexIntMult = 0.9 + Math.max(higInt * 0.05,-0.03);
				var subIntMult = 0.9 + Math.max(higInt * 0.05,-0.03);
				
				// Apply multipliers
				gainedRomance *= effectsMultiplier * romIntMult * (1 + ((gC(charKey).mood.intimate - gC(charKey).mood.angry - gC(charKey).mood.bored) / 100));
				gainedSexualTension *= effectsMultiplier * sexIntMult * (1 + ((gC(charKey).mood.aroused + gC(charKey).mood.flirty - gC(charKey).mood.bored) / 200));
				gainedSubmission *= effectsMultiplier * subIntMult * (1 + ((- gC(charKey).mood.dominant + gC(charKey).mood.submissive) / 100));
				gainedEnmity *= effectsMultiplier * (1 + ((gC(charKey).mood.angry - gC(charKey).mood.submissive) / 100));
				gainedLoveDrive *= effectsMultiplier * (1 + ((gC(charKey).mood.intimate * 2 + gC(charKey).mood.friendly - gC(charKey).mood.angry * 2 - gC(charKey).mood.bored) / 300));
				if ( allChars.length > 2 && ( (avrRomance / avrSexualTension) < 0.8 ) ) {
					gainedLoveDrive *= ( 1 - allChars.length * 0.1 );
				}
				gainedPleasureDrive *= effectsMultiplier * (1 + ((gC(charKey).mood.aroused + gC(charKey).mood.flirty - gC(charKey).mood.bored) / 200)) * (avrSexualTension/avrRomance);
				if ( allChars.length == 2 && ( (avrRomance / avrSexualTension) > 1.2 ) ) {
					gainedPleasureDrive *= 0.8;
				}
				gainedCooperationDrive *= effectsMultiplier * (1 + ((gC(charKey).mood.intimate + gC(charKey).mood.friendly * 2 - gC(charKey).mood.angry * 2 - gC(charKey).mood.bored) / 300)) * (avrRomance/avrSexualTension);
				gainedDominationDrive *= effectsMultiplier * (1 + ((gC(charKey).mood.dominant - gC(charKey).mood.submissive) / 100));
				
				// Apply changes
					// Relations
				for ( var charKey2 of allChars ) {
					if ( charKey != charKey2 ) {
						gC(charKey).relations[charKey2].romance.stv += gainedRomance;
						gC(charKey).relations[charKey2].sexualTension.stv += gainedSexualTension;
						gC(charKey).relations[charKey2].submission.stv += gainedSubmission;
						gC(charKey).relations[charKey2].enmity.stv += gainedEnmity;
					}
				}
					// Drives
				addPointsToDrive(gC(charKey).dLove,gainedLoveDrive);
				addPointsToDrive(gC(charKey).dPleasure,gainedPleasureDrive);
				addPointsToDrive(gC(charKey).dCooperation,gainedCooperationDrive);
				addPointsToDrive(gC(charKey).dDomination,gainedDominationDrive);
				
				// Text
				if ( gC(charKey).orgasmSceneCounter == 0 ) { // Character didn't orgasm			
					allCharsMsgs[charKey].msg += gC(charKey).getFormattedName() + " lost " + (-gainedRomance).toFixed(1) + " romance and " + (-gainedSexualTension).toFixed(1)
										   + " sexual tension, and gained " + gainedEnmity.toFixed(1) + " enmity";
					if ( gainedSubmission > 0 ) { allCharsMsgs[charKey].msg += " and " + gainedSubmission.toFixed(1) + " submission."; }
					else { allCharsMsgs[charKey].msg += "."; }
					allCharsMsgs[charKey].msg += "\n" + gC(charKey).getFormattedName() + " gained " + gainedDominationDrive.toFixed(1) + " domination drive points, and lost " +
										   + (-gainedLoveDrive).toFixed(1) + " love, " + (-gainedPleasureDrive).toFixed(1) + " pleasure and " + (-gainedCooperationDrive).toFixed(1)
										   + " cooperation drive points.";
				} else {									// Character did orgasm
					// Two characters in scene
					if ( allChars.length == 2 ) {
						allCharsMsgs[charKey].msg += gC(charKey).getFormattedName() + " gained " + gainedRomance.toFixed(1) + " romance and " + gainedSexualTension.toFixed(1)
											   + " sexual tension, and lost " + (-gainedEnmity).toFixed(1) + " enmity.";
						if ( gainedSubmission > 0 ) { allCharsMsgs[charKey].msg += " " + gC(charKey).getFormattedName() + " also gained " + gainedSubmission.toFixed(1) + " submission."; }
						allCharsMsgs[charKey].msg += "\n" + gC(charKey).getFormattedName() + " gained " + gainedLoveDrive.toFixed(1) + " love, " + gainedPleasureDrive.toFixed(1) + " pleasure and "
											   + gainedCooperationDrive.toFixed(1) + " cooperation drive points.";
					} else { // More than two characters in scene
						allCharsMsgs[charKey].msg += gC(charKey).getFormattedName() + " gained " + gainedRomance.toFixed(1) + " romance and " + gainedSexualTension.toFixed(1)
											   + " sexual tension, and lost " + (-gainedEnmity).toFixed(1) + " enmity.\n"
											   + gC(charKey).getFormattedName() + " gained " + gainedLoveDrive.toFixed(1) + " love, " + gainedPleasureDrive.toFixed(1) + " pleasure and "
											   + gainedCooperationDrive.toFixed(1) + " cooperation drive points.";
					}
				}
			}
		}
		gC(charKey).orgasmSceneCounter -= gC(charKey).mindblowingOrgasmSC * 2;
	}		
	
	// Mood changes
	for ( var cK of allChars ) {
		if ( gC(cK).hasLead && State.variables.sc.enabledLead == "fixed" ) {
			gC(cK).mood.flirty *= 0.5;
			gC(cK).mood.aroused *= 0.5;
			gC(cK).mood.applyChange("friendly",10);
			gC(cK).mood.applyChange("intimate",10);
		} else {
			if ( gC(cK).orgasmSceneCounter > 0 ) { // Had normal orgasms
				gC(cK).mood.flirty *= 0.5;
				gC(cK).mood.aroused *= 0.5;
				gC(cK).mood.applyChange("friendly",10);
				gC(cK).mood.applyChange("intimate",10);
			} else if ( gC(cK).ruinedOrgasmSceneCounter > 0 ) { // Only had ruined orgasms
				gC(cK).mood.applyChange("angry",25);
				gC(cK).mood.applyChange("submissive",25);
				gC(cK).mood.applyChange("aroused",25);
				gC(cK).mood.flirty *= 0.5;
				gC(cK).mood.friendly *= 0.5;
				gC(cK).mood.intimate *= 0.5;
				gC(cK).mood.dominant *= 0.5;
			} else { // Had no orgasms
				gC(cK).mood.applyChange("angry",10);
				gC(cK).mood.applyChange("bored",25);
				gC(cK).mood.flirty *= 0.5;
				gC(cK).mood.friendly *= 0.5;
				gC(cK).mood.intimate *= 0.5;
			}
		}
	}
	
	for ( var cK of allChars ) {
		resultsMessage += allCharsMsgs[cK].msg + "\n";
	}
	if ( invAeMsg != "" ) { resultsMessage += "\n" + invAeMsg; }
	if ( resultsMessage != "" ) { resultsMessage += "\n"; }
	if ( State.variables.invitedChars == undefined ) {
		resultsMessage += "[[Continue|Map]]";
	} else {
		resultsMessage += PersonalRoom.prototype.getButtonFinishDay();
	}
	
	// Finish formatting
	State.variables.compass.sceneResultsPassage = resultsMessage;
}

window.processGenericMapBattleEffects = function() {
	// Find winners and losers
	var flagStaleMate = false;
	var winner = "";
	var loser = "";
	
	var flagIsWinnerAttacking = false;
	var infamyMult = 1;
	var stakes = State.variables.sc.stakes;
	
	var driveChangesMessage = "";
	var resultsMessage = "";
	
	var flagWinningTeamIsCooperating = false;
	
	var selectedBattleDemand = null;
	var potentialBattleDemands = [];
	
	switch (State.variables.sc.extraEndInfo) {
		case "stalemate":
			flagStaleMate = true;
			break;
		case "teamAwin":
			// Set winner
			if ( State.variables.sc.teamAcharKeys.includes(State.variables.sc.aggressor) ) {
				flagIsWinnerAttacking = true;
			}
			// Restore Team A
			for ( var charKey of State.variables.sc.teamAcharKeys ) {
				gC(charKey).lust.restore();
			}
			// Cooperation check and drive changes
			for ( var cK of State.variables.sc.teamAcharKeys ) {
				if ( cK != State.variables.sc.teamAcharKeys[0] ) {
					if ( gC(cK).subChars.includes(State.variables.sc.teamAcharKeys[0]) == false && gC(cK).domChar != State.variables.sc.teamAcharKeys[0] ) {
						flagWinningTeamIsCooperating = true;
					}
				}
			}
			if ( flagWinningTeamIsCooperating ) {
				for ( var cK of State.variables.sc.teamAcharKeys ) {
					addPointsToDrive(gC(cK).dCooperation,(30+20*(0.1 * getAverageRelationStatBetweenCharAndGroup("friendship",cK,arrayMinusA(State.variables.sc.teamAcharKeys,cK)))));
				}
				for ( var cK of State.variables.sc.teamBcharKeys ) {
					addPointsToDrive(gC(cK).dCooperation,(15+8*(0.1 * getAverageRelationStatBetweenCharAndGroup("friendship",cK,arrayMinusA(State.variables.sc.teamBcharKeys,cK)))));
				}
			}
			break;
		case "teamBwin":
			// Set winner
			if ( State.variables.sc.teamBcharKeys.includes(State.variables.sc.aggressor) ) {
				flagIsWinnerAttacking = true;
			}
			// Restore Team B
			for ( var charKey of State.variables.sc.teamBcharKeys ) {
				gC(charKey).lust.restore();
			}
			// Cooperation check and drive changes
			for ( var cK of State.variables.sc.teamBcharKeys ) {
				if ( cK != State.variables.sc.teamBcharKeys[0] ) {
					if ( gC(cK).subChars.includes(State.variables.sc.teamBcharKeys[0]) == false && gC(cK).domChar != State.variables.sc.teamBcharKeys[0] ) {
						flagWinningTeamIsCooperating = true;
					}
				}
			}
			if ( flagWinningTeamIsCooperating ) {
				for ( var cK of State.variables.sc.teamBcharKeys ) {
					addPointsToDrive(gC(cK).dCooperation,(15+10*(0.1 * getAverageRelationStatBetweenCharAndGroup("friendship",cK,arrayMinusA(State.variables.sc.teamBcharKeys,cK)))));
				}
				for ( var cK of State.variables.sc.teamAcharKeys ) {
					addPointsToDrive(gC(cK).dCooperation,(6+4*(0.1 * getAverageRelationStatBetweenCharAndGroup("friendship",cK,arrayMinusA(State.variables.sc.teamAcharKeys,cK)))));
				}
			}
			break;
	}
	if ( flagIsWinnerAttacking ) { // Attacker win
		winner = State.variables.sc.aggressor;
		loser = State.variables.sc.defender;
		// Drive changes
		  // Attacker
		  addPointsToDrive(gC(winner).dDomination,(30+10*(0.1 * (getAverageRelationStatBetweenCharAndGroup("rivalry",winner,getCharsEnemyTeam(winner)) + getAverageRelationStatBetweenCharAndGroup("enmity",winner,getCharsEnemyTeam(winner))))));
		  addPointsToDrive(gC(winner).dAmbition,(30+20*(0.1 * (getAverageRelationStatBetweenCharAndGroup("enmity",winner,getCharsEnemyTeam(winner))))));
		  driveChangesMessage += gC(winner).getFormattedName() + " gained domination and ambition drive points.\n";
		  // Defender
		  addPointsToDrive(gC(loser).dImprovement,30+10*(0.1 * (getAverageRelationStatBetweenCharAndGroup("rivalry",winner,getCharsEnemyTeam(winner)) + getAverageRelationStatBetweenCharAndGroup("enmity",winner,getCharsEnemyTeam(winner)))));
		  driveChangesMessage += gC(loser).getFormattedName() + " gained self-improvement drive points.\n";
		  // Cooperation extra
		  if ( flagWinningTeamIsCooperating ) {
			  driveChangesMessage += gC(winner).getFormattedName() + "'s team members also gained cooperation drive points.\n";
		  }
	} else if ( flagStaleMate == false ) { // Defender win
		winner = State.variables.sc.defender;
		loser = State.variables.sc.aggressor;
		infamyMult = 0.5;
		// Drive changes
		  // Attacker
		  addPointsToDrive(gC(loser).dImprovement,(30+10*(0.1 * (getAverageRelationStatBetweenCharAndGroup("rivalry",winner,getCharsEnemyTeam(winner)) + getAverageRelationStatBetweenCharAndGroup("enmity",winner,getCharsEnemyTeam(winner))))));
		  addPointsToDrive(gC(loser).dDomination,-10);
		  addPointsToDrive(gC(loser).dAmbition,-10);
		  driveChangesMessage += gC(loser).getFormattedName() + " gained self-improvement drive points and lost domination and ambition drive points.\n";
		  // Defender
		  addPointsToDrive(gC(winner).dDomination,(15+3*(0.1 * (getAverageRelationStatBetweenCharAndGroup("rivalry",winner,getCharsEnemyTeam(winner)) + getAverageRelationStatBetweenCharAndGroup("enmity",winner,getCharsEnemyTeam(winner))))));
		  addPointsToDrive(gC(winner).dAmbition,(15+10*(0.1 * (getAverageRelationStatBetweenCharAndGroup("enmity",winner,getCharsEnemyTeam(winner))))));
		  driveChangesMessage += gC(winner).getFormattedName() + " gained domination and ambition drive points.\n";
		  // Cooperation extra
		  if ( flagWinningTeamIsCooperating ) {
			  driveChangesMessage += gC(winner).getFormattedName() + "'s team members also gained cooperation drive points.\n";
		  }
	}
	
	// Execute logic
	if ( flagStaleMate == false ) {
		if ( winner != "chPlayerCharacter" ) { // NPC victory
			potentialBattleDemands = getAllPotentialBattleDemands(winner,loser,stakes,infamyMult);
			
			var battleDemandData = selectBattleDemandFromList(potentialBattleDemands);
			var extra1 = battleDemandData[2];
			var extra2 = battleDemandData[3];
			selectedBattleDemand = battleDemandData[1];
			selectedBattleDemand.provokeEffect(winner,loser,stakes,infamyMult,extra1,extra2);
			if ( driveChangesMessage != "" ) { resultsMessage += driveChangesMessage + "\n"; }
			resultsMessage += selectedBattleDemand.resultMessage(winner,loser,stakes,infamyMult,extra1,extra2);
			var returnPassage = selectedBattleDemand.getPassageLink(winner,loser);
			resultsMessage += "\n\n<<link[[Continue|" + returnPassage +"]]>><<s" + "cript>>State.variables.compass.pushAllTimeToAdvance();\nState.variables.compass.pushAllTimeToAdvance();<</s" + "cript>><</l" + "ink>>";
		} else { // Player victory
			resultsMessage = "You won! You may now demand something from " + gC(loser).name + ".\n\n"
						   + formatBattleDemandButtons(loser,stakes,infamyMult);
		}
	} else {
		resultsMessage = "Stalemate!\n\n[[Continue|Map]]";
	}
	
	// Finish formatting
	State.variables.compass.sceneResultsPassage = resultsMessage;
}
window.processLiberationChallengeEffects = function() {
	// Find winners and losers
	var flagStaleMate = false;
	var winner = "";
	var loser = "";
	
	var flagIsWinnerAttacking = false;
	var infamyMult = 1;
	var stakes = State.variables.sc.stakes;
	
	var resultsMessage = "";
	
	var selectedBattleDemand = null;
	
	switch (State.variables.sc.extraEndInfo) {
		case "stalemate":
			flagStaleMate = true;
			break;
		case "teamAwin":
			// Set winner
			if ( State.variables.sc.teamAcharKeys.includes(State.variables.sc.aggressor) ) {
				flagIsWinnerAttacking = true;
			}
			// Restore Team A
			for ( var charKey of State.variables.sc.teamAcharKeys ) {
				gC(charKey).lust.restore();
			}
			break;
		case "teamBwin":
			// Set winner
			if ( State.variables.sc.teamBcharKeys.includes(State.variables.sc.aggressor) ) {
				flagIsWinnerAttacking = true;
			}
			// Restore Team B
			for ( var charKey of State.variables.sc.teamBcharKeys ) {
				gC(charKey).lust.restore();
			}
			break;
	}
	if ( flagIsWinnerAttacking ) {
		winner = State.variables.sc.aggressor;
		loser = State.variables.sc.defender;
	} else if ( flagStaleMate == false ) {
		winner = State.variables.sc.defender;
		loser = State.variables.sc.aggressor;
		infamyMult = 0.5;
	}
	
	// Execute logic
	if ( flagStaleMate == false ) {
		if ( gC(winner).domChar == loser ) {
			// Drive changes
			addPointsToDrive(gC(loser).dAmbition,-10);
			addPointsToDrive(gC(loser).dDomination,-10);
			addPointsToDrive(gC(loser).dImprovement,40);
			// Relations effects
			resultsMessage = gC(winner).getFormattedName() + " won the challenge! " + gC(winner).getFormattedName() + " will no longer be submissive to " + gC(loser).getFormattedName() + "." + gC(loser).getFormattedName() + " lost 10 ambition and domination drive points, and gained 40 self-improvement drive points." + "\n\n[[Continue|Map]]";
			finishRelType(winner,loser);
		} else if ( gC(loser).domChar == winner ) {
			// Drive changes
			addPointsToDrive(gC(loser).dAmbition,-20);
			addPointsToDrive(gC(loser).dImprovement,40);
			// Relations effects
			resultsMessage = gC(winner).getFormattedName() + " won the challenge! " + gC(winner).getFormattedName() + " stole 3 merit from " + gC(loser).getFormattedName() + ", gained domination towards " + gC(loser).comPr + " and will extend their relationship for an extra day. " + gC(loser).getFormattedName() + " lost 20 ambition drive points and gained 40 self-improvement drive points." + "\n\n[[Continue|Map]]";
			gC(winner).relations[loser].domination.stv += 250;
			gC(winner).changeMerit(3);
			gC(loser).relations[winner].submission.stv += 250;
			gC(loser).changeMerit(-3);
			gRelTypeAb(winner,loser).days++;
			gRelTypeAb(loser,winner).days++;
		}
	} else {
		resultsMessage = "The battle was inconclusive!\n\n[[Continue|Map]]";
	}
	
	// Finish formatting
	State.variables.compass.sceneResultsPassage = resultsMessage;
}

window.formatGenericBattlePlayerChoice = function(message,nextPassage) {
	State.variables.compass.sceneResultsPassage = message + "\n\n<<link[[Continue|" + nextPassage +"]]>><<s" + "cript>>State.variables.compass.pushAllTimeToAdvance();\nState.variables.compass.pushAllTimeToAdvance();<</s" + "cript>><</l" + "ink>>";
}
window.getAllPotentialBattleDemands = function(actor,target,stakes,infamyMult) {
	var potentialDemands = [];
	for ( var bd of setup.battleDemandsDB ) {
		if ( bd.isPossible(actor,target,stakes) ) {
			var choiceValues = bd.generateChoicesValuesForNpcs(actor,target,stakes,infamyMult);
			potentialDemands = potentialDemands.concat(choiceValues);
		}
	}
	return potentialDemands;
}
window.selectBattleDemandFromList = function(battleDemandList) {
	var bd = null;
	var highestValue = -1;
	var highestValueIterator = 0;
	var i = 0;
	for ( var bdi of battleDemandList ) {
		if ( bdi[0] > highestValue ) {
			highestValue = bdi[0];
			highestValueIterator = i;
		}
		i++;
	}
	bd = battleDemandList[highestValueIterator];
	return bd;
}
window.getNpcDemandOnWinningBattle = function(actor,target,stakes,infamyMult) {
	var infamy = gC(actor).infamy;
	var choices = [ "doNothing" , "humilliate" , "forceServitude" ];
	var decision = "doNothing";
	var result = null;
	var hostility = limitedRandomInt(20) - 10 + rLvlAbt(actor,target,"rivalry") * limitedRandomInt(30) + rLvlAbt(actor,target,"enmity") * limitedRandomInt(30) + rLvlAbt(actor,target,"sexualTension") * limitedRandomInt(20) - rLvlAbt(actor,target,"friendship") * limitedRandomInt(10) - rLvlAbt(actor,target,"romance") * limitedRandomInt(10) + gC(target).infamy;
	
	if ( infamyMult < 1 ) {
		hostility += 10;
	}
	
	if ( infamy > 20 ) {
		decision = "doNothing";
	} else if ( infamy < 15 && hostility > 5 && stakes >= 3 && gSettings().servitudeRelationships == "enable"
			 && gC(target).domChar == null && gC(target).subChars.length == 0 && gC(actor).domChar == null ) {
		decision = "forceServitude";
	} else if ( hostility > 0 ) {
		decision = "humilliate";
	} else {
		decision = "doNothing";
	}
	
	switch ( decision ) {
		case "doNothing":
			result = createBdemandDoNothing();
			break;
		case "humilliate":
			result = createBdemandHumillitation();
			break;
		case "forceServitude":
			result = createBdemandForceServitude();
			break;
	}
	
	return result;
}

window.processGenericMonsterBattleEffects = function() {
	// teamAwin -> Characters win ; teamBwin -> Monsters win
	var flagMonstersVictory = false;
	var resultsMessage = "";
	var extraJoinedChars = State.variables.sc.extraJoinedCharacters;
	if ( extraJoinedChars != undefined ) {
		var initialCharacters = State.variables.sc.initialCharacters;
	}
	
	switch (State.variables.sc.extraEndInfo) {
		case "teamAwin":
			charsPercentOfInitialLust(State.variables.sc.teamAcharKeys,State.variables.sc.tempData[0],0.7);
			resultsMessage = "You won! The monsters creep out of the battlefield, struggling to reach safety.";
			if ( extraJoinedChars != undefined ) {
				resultsMessage += "\n" + charsAthankCharsBforAssistingAgainstMonsters(initialCharacters,extraJoinedChars);
			}
			resultsMessage += "\nYou recover some energy after winning the battle."
						   + "\n\n<<link[[Continue|Map]]>><<s" + "cript>>State.variables.compass.advanceTime(0);\nState.variables.compass.advanceTime(0);<</s" + "cript>><</l" + "ink>>";
			break;
		case "monsterCapture":
			charsPercentOfInitialLust(State.variables.sc.teamAcharKeys,State.variables.sc.tempData[0],0.7);
			// Find captured monsters, add them to the list and give opposite team leader altered states with captured monsters
			var capturedMonsters = [];
			var capturingChar = State.variables.sc.teamAcharKeys[0];
			for ( var cK of State.variables.sc.teamBcharKeys ) {
				if ( doesCharHaveState(cK,"BnCa") == true ) {
					var monsterType = gC(cK).monsterType;
					capturedMonsters.push(monsterType);
					applyAlteredState([capturingChar],createCapturedMonsterAs(monsterType));
				}
			}
			resultsMessage = "You won! ";
			if ( capturedMonsters.length > 1 ) {
				resultsMessage += stringArrayToText(capturedMonsters) + " have been captured by " + gC(capturingChar).getFormattedName() + ". They will be difficult to manage, so make sure to deliver them to an interested hunter soon.";
			} else {
				resultsMessage += stringArrayToText(capturedMonsters) + " has been captured by " + gC(capturingChar).getFormattedName() + ". It will be difficult to manage, so make sure to deliver them to an interested hunter soon.";
			}
			if ( capturedMonsters.length != State.variables.sc.teamBcharKeys.length ) {
				resultsMessage += "\nThe remaining monsters creep out of the battlefield, struggling to reach safety.";
			}
			resultsMessage += "\nYou recover some energy after winning the battle.";
			if ( extraJoinedChars != undefined ) {
				resultsMessage += "\n" + charsAthankCharsBforAssistingAgainstMonsters(initialCharacters,extraJoinedChars);
			}
			resultsMessage += "\n\n<<link[[Continue|Map]]>><<s"
							+ "cript>>State.variables.compass.advanceTime(0);\nState.variables.compass.advanceTime(0);<</s" + "cript>><</l" + "ink>>";
			break;
		case "teamBwin":
			var defeatedChars = State.variables.sc.teamAcharKeys;
			resultsMessage = getStandardMonsterDefeatMsgEffects(defeatedChars)
						   + "\n\n<<link[[Continue|Map]]>><<s" + "cript>>State.variables.compass.pushAllTimeToAdvance();<</s" + "cript>><</l" + "ink>>";
			// Chars from teamA are taken to locked room
			var trapRoom = findTrapRoomInMap();
			State.variables.compass.moveCharsToRoom(defeatedChars,trapRoom);
			// Break defeated chars' Map AI
			for ( var cK of defeatedChars ) {
				if ( gC(cK).mapAi.hasOwnProperty("goalsList") ) {
					gC(cK).mapAi.goalsList = [];
				}
			}
			// Recovering from Exhaustion Event, add to queue
			State.variables.compass.ongoingEvents.push(createSystemEventRecoverFromExhaustion(defeatedChars));
			break;
		case "flight":
			resultsMessage = "You have managed to lose the monsters from sight."
						   + "\n\n<<link[[Continue|Map]]>><<s" + "cript>>State.variables.compass.pushAllTimeToAdvance();<</s" + "cript>><</l" + "ink>>";
			break;
	}
	
	// Finish formatting
	State.variables.compass.sceneResultsPassage = resultsMessage;
}
window.findTrapRoomInMap = function() {
	var trapRoom = "";
	if ( isCurrentStoryStateInMainLoop() ) {
		trapRoom = "publicBaths";
	} else if ( getCurrentStoryState() == storyState.firstAdventure ) {
		trapRoom = "trapRoom";
	}
	return trapRoom;
}
window.getStandardMonsterDefeatMsgEffects = function(characters) {
	var n = getCurrentStoryState() * 5;
	for ( var cK of characters ) {
		if ( gC(cK).hasOwnProperty("merit") ) {
			gC(cK).changeMerit(-n);
		}
	}
	var msg = "You lost! The monsters take you to a secluded place, where you are slowly robbed of your aether."
			+ "\nThe Goddess' fortune smiles on you, and the monsters leave you alone when they feel satiated, allowing you to return to safety..."
			+ "\nYou have lost " + n.toFixed(1) + " merit.";
	
	return msg;
}
window.charsAthankCharsBforAssistingAgainstMonsters = function(charsA,charsB) {
	var pluralA = false;
	var msg = "";
	if ( charsA.length > 1 ) {
		msg += getCharNames(charsA) + randomFromList([" profusely thank "," copiously thank "," show their gratitude to "]) + getCharNames(charsB) + " for assisting against the monsters. " + colorText("Their friendship moderately increases","khaki") + ", and they now owe some favor.";
	} else {
		msg += getCharNames(charsA) + randomFromList([" profusely thanks "," copiously thanks "," shows " + gC(charsA[0]).posPr + " gratitude to "]) + getCharNames(charsB) + " for assisting against the monsters. " + colorText(firstToCap(gC(charsA[0]).posPr) + " friendship moderately increases","khaki") + ", and " + gC(charsA[0]).perPr + " now owes some favor.";
	}
	for ( var cKa of charsA ) {
		for ( var cKb of charsB ) {
			if ( gC(cKa).relations[cKb] != undefined ) {
				gC(cKa).relations[cKb].friendship.stv += 300;
				payFavorDebt(cKa,cKb,3);
			}
		}
	}
	return msg;
}

window.charsPercentOfInitialLust = function(chars,initialLustArray,restoredPercent) {
	var i = 0;
	for ( var cK of chars ) {
		if ( gC(cK).lust.current < initialLustArray[i] ) {
			var lustToRestore = ( initialLustArray[i] - gC(cK).lust.current ) * restoredPercent;
			gC(cK).lust.changeValue(lustToRestore);
		}
		i++;
	}
}


