// Wild Caverns Actions

	// Movement
window.createCreateSEtunnelMovement = function(roomKey,energy) {
	return ( function(minutes, characters) {
		var sEvent = new systemEvent(minutes,characters,"movement","Moving",function(cList) {
				State.variables.compass.moveCharsToRoom(cList,roomKey);
				
				var eventMsg = "You advance through the tunnel without further issues.";
				if ( energy > 0 ) {
					eventMsg = "You advance through the tunnel at the cost of " + textEnergyPoints(energy) + ". ";
					for ( var cK of characters ) {
						applyBarDamageWithoutOverflow(cK,"energy",-energy);
					}
				}
				if ( getRoomInfoA(roomKey).getEventPrompt ) {
					getRoomInfoA(roomKey).getEventPrompt(cList);
				}
				State.variables.compass.setMapMessage(eventMsg);
				return eventMsg;
			}
		);
		sEvent.applyEffectIfForcedToEnd = false;
		sEvent.roomKey = roomKey;
		sEvent.priority = -1;
		return sEvent;
	} )
} 

window.createActionMovingWildTunnel = function(goalKey,goalName,energy,mins) {
	var actName = "Move to " + goalName + " (" + colorText(mins,"khaki") + ") ";
	if ( energy > 0 ) {
		actName += "(" + colorText(energy,"limegreen") + ") ";
	}
	var action = new mapAction("tunnelMovement",actName,createCreateSEtunnelMovement(goalKey,energy),false);
	action.description = "Attempt to move to " + goalName + ". ";
	action.tags.push();
	action.recMins = mins;
	action.flexibleTimes = false;
	action.getPassage = function() { return "Map" };
	return action;
}

	// Waiting
window.createSystemEventWait = function(minutes,characters) {
	var sEvent = new systemEvent(5,characters,"cavernWait","Wait for a few minutes",function(cList) {
			for ( var cK of characters ) {
				applyBarDamageWithoutOverflow(cK,"willpower",-5);
			}
			
			var eventMsg = "You wait quietly, hoping for the Caverns to move their limbs and allow you passage. The dismal scenery and the airless environment erode your will for " + textWillpowerPoints(5) + ". ";
			State.variables.compass.setMapMessage(eventMsg);
			return eventMsg;
		}
	);
	sEvent.priority = -1;
	return sEvent;
}
window.createWaitingActionCaverns = function() {
	var action = new mapAction("cavernWait","Wait for a few minutes",createSystemEventWait,false);
	action.description = "The characters will wait for a few minutes, expecting the Caverns to leave the way open for them.";
	action.recMins = 5;
	action.flexibleTimes = false;
	action.getPassage = function() { return "Map" };
	return action;
}
window.createSystemEventCheapNoWait = function(minutes,characters) {
	var sEvent = new systemEvent(0,characters,"cavernWait","Wait for a few minutes",function(cList) {
			
			var eventMsg = "";
			State.variables.compass.setMapMessage(eventMsg);
			return eventMsg;
		}
	);
	sEvent.priority = -1;
	return sEvent;
}
window.createSystemEventCheapWait = function(minutes,characters) {
	var sEvent = new systemEvent(5,characters,"cavernWait","Wait for a few minutes",function(cList) {
			
			var eventMsg = "You rest for a few minutes, your eyes focused on the the occasional, tiny waves taking form at the lake below...";
			State.variables.compass.setMapMessage(eventMsg);
			return eventMsg;
		}
	);
	sEvent.priority = -1;
	return sEvent;
}
window.createSystemEventCheapWaitNoDesc = function(minutes,characters) {
	var sEvent = new systemEvent(5,characters,"cavernWait","Wait for a few minutes",function(cList) {
			
			var eventMsg = "";
			State.variables.compass.setMapMessage(eventMsg);
			return eventMsg;
		}
	);
	sEvent.priority = -1;
	return sEvent;
}
window.createSystemEventMedWait = function(minutes,characters) {
	var sEvent = new systemEvent(20,characters,"cavernWait","Wait for a few minutes",function(cList) {
			
			var eventMsg = "You rest for a few minutes, your eyes focused on the the occasional, tiny waves taking form at the lake below...";
			State.variables.compass.setMapMessage(eventMsg);
			return eventMsg;
		}
	);
	sEvent.priority = -1;
	return sEvent;
}
window.createCheapWaitingActionCaverns = function() {
	var action = new mapAction("cavernWait","Wait for a few minutes",createSystemEventCheapWait,false);
	action.description = "The characters will wait for a few minutes staring at the lake below.";
	action.recMins = 5;
	action.flexibleTimes = false;
	action.getPassage = function() { return "Map" };
	return action;
}

	// Pond of illumination
window.createSystemEventSecludedMeditation = function(minutes,characters) {
	var sEvent = new systemEvent(minutes,characters,"secludedMeditation","Secluded Meditation",function(cList) {
			var eventMsg = "";
			var exp = 0;
			var expRate = 3;
			var barCost = 20;
			var barType = "willpower";
			for ( var character of cList ) {
				// The character attempts to consume barCost (ex.20) out of barType (ex.willpower), returns false if not possible
				var barConsumption = barCost*(this.ongoingTime/60);
				var charHadEnoughBar = charConsumesBarAmount(character,barType,barConsumption);
				expRate = 3;
				if ( charHadEnoughBar == false ) { expRate = 1; } 
				var exp = charGetsExpRate(this.ongoingTime,character,"luck",expRate);
				var exp2 = charGetsExpRate(this.ongoingTime,character,"will",expRate);
				var exp3 = charGetsExpRate(this.ongoingTime,character,"intelligence",expRate);
				eventMsg += createCharGotExpMessage(character,"intelligence",exp) + "\n" + createCharGotExpMessage(character,"will",exp2) + "\n" + createCharGotExpMessage(character,"luck",exp3) + "\n";
				eventMsg += createCharSpentBarMessage(character,barType,barConsumption) + "\n";
			}
			eventMsg += tutorshipExtraExp(minutes,characters,"luck",expRate);
			return eventMsg;
		}
	);
	sEvent.priority = 3;
	return sEvent;
}
window.createTrainingActionSecludedMeditation = function() {
	var action = new mapAction("secludedMeditation","Secluded Meditation",createSystemEventSecludedMeditation,false);
	action.description = "There are few places in the Valley as providential as this little pond to get in touch with your inner self. Trains intelligence, will and luck. Costs 20 willpower per hour, with a penalty if the character runs out of willpower.";
	action.tags.push("training","trRank1","luck","intelligence","will");
	action.recMins = 60;
	action.flexibleTimes = true;
	return action;
}

// Shapeshifter tribe

	// Baths
window.createSeHeatedBath = function(minutes,characters) {
	var sEvent = new systemEvent(30,characters,"heatedBath","Take a heated bath",function(cList) {
			for ( var cK of characters ) {
				washCharsBodyPainting(cK);
				applyBarDamageWithoutOverflow(cK,"energy",-10);
				if ( doesCharHaveAlteredState(cK,"HeBa") == false ) {
					applyAlteredState([cK],createHeatedBath());
				}
			}
			
			var eventMsg = "You throughly enjoy your stay at the sauna, relaxing your muscles and rejuvenating your body. You feel stronger today. This costed you " + textEnergyPoints(10) + ". ";
			return eventMsg;
		}
	);
	sEvent.priority = 1;
	return sEvent;
}
window.createHeatedBathAction = function() {
	var action = new mapAction("heatedBath","Take a heated bath",createSeHeatedBath,false);
	action.description = "The characters will take a bath in the sauna, receiving buffs to their physique, agility and resilience.";
	action.recMins = 30;
	action.flexibleTimes = false;
	return action;
}
window.createSeFrozenBath = function(minutes,characters) {
	var sEvent = new systemEvent(30,characters,"frozenBath","Take a frozen bath",function(cList) {
			for ( var cK of characters ) {
				washCharsBodyPainting(cK);
				applyBarDamageWithoutOverflow(cK,"willpower",-10);
				if ( doesCharHaveAlteredState(cK,"FrBa") == false ) {
					applyAlteredState([cK],createFrozenBath());
				}
			}
			
			var eventMsg = "You endure your hellishly frozen stay at the water, fortifying your will. You feel focused today. This costed you " + textWillpowerPoints(10) + ". ";
			return eventMsg;
		}
	);
	sEvent.priority = 1;
	return sEvent;
}
window.createFrozenBathAction = function() {
	var action = new mapAction("frozenBath","Take a frozen bath",createSeFrozenBath,false);
	action.description = "The characters will take a bath in cold water, receiving buffs to their intelligence, will and perception.";
	action.recMins = 30;
	action.flexibleTimes = false;
	return action;
}
window.createSePublicBath = function(minutes,characters) {
	var sEvent = new systemEvent(30,characters,"publicBath","Take a public bath",function(cList) {
			for ( var cK of characters ) {
				washCharsBodyPainting(cK);
				applyBarDamageWithoutOverflow(cK,"socialdrive",-10);
				if ( doesCharHaveAlteredState(cK,"PuBa") == false ) {
					applyAlteredState([cK],createPublicBath());
				}
			}
			
			var eventMsg = "You gulp your initial shame, progressively becoming more comfortable showing your naked body in front of strangers. You feel confident today. This costed you " + textSocialdrivePoints(10) + ". ";
			return eventMsg;
		}
	);
	sEvent.priority = 1;
	return sEvent;
}
window.createPublicBathAction = function() {
	var action = new mapAction("publicBath","Take a public bath",createSePublicBath,false);
	action.description = "The characters will enjoy the waters of a public bath, receiving buffs to their charisma, empathy and luck.";
	action.recMins = 30;
	action.flexibleTimes = false;
	return action;
}

	// Theater
window.createSysEvTheaterImprovisation = function(minutes,characters) {
	var sEvent = new systemEvent(minutes,characters,"dramaImprovisation","Drama Improvisation",function(cList) {
			var eventMsg = "";
			var exp = 0;
			var expRate = 1;
			var barCost = 20;
			var barType = "socialdrive";
			for ( var character of cList ) {
				// The character attempts to consume barCost (ex.20) out of barType (ex.willpower), returns false if not possible
				var barConsumption = barCost*(this.ongoingTime/60);
				var charHadEnoughBar = charConsumesBarAmount(character,barType,barConsumption);
				if ( charHadEnoughBar == false ) { expRate = 0.5; } 
				var exp1 = charGetsExpRate(this.ongoingTime,character,"charisma",expRate);
				var exp2 = charGetsExpRate(this.ongoingTime,character,"empathy",expRate);
				var impExp = (this.ongoingTime / 60) * gC(character).charisma.affinity * gC(character).charisma.affinity * gC(character).empathy.affinity;
				addCharsSpecialExperience(character,"impExp",impExp);
				eventMsg += createCharGotExpMessage(character,"charisma",exp1) + "\n";
				eventMsg += createCharGotExpMessage(character,"empathy",exp2) + "\n";
				eventMsg += describeCharsImprovExp(character) + "\n";
				var rspMsg = describeRespectGain(character,"impExp");
				eventMsg += rspMsg;
				eventMsg += createCharSpentBarMessage(character,barType,barConsumption) + "\n";
			}
			// Trial improvisation map event
			if ( isStVarOn("trImpr") == false && cList[0] == "chPlayerCharacter" ) {
				// Base requirements
				var baseSkillRequirement = 50;
				var pcChaPoints = (gCstat("chPlayerCharacter","charisma") - 10) * 0.5; if ( pcChaPoints < 0 ) { pcChaPoints = 0; }
				var pcEmpPoints = (gCstat("chPlayerCharacter","empathy") - 10) * 0.5; if ( pcEmpPoints < 0 ) { pcEmpPoints = 0; }
				var pcWilPoints = (gCstat("chPlayerCharacter","will") - 10) * 0.5; if ( pcWilPoints < 0 ) { pcWilPoints = 0; }
				var pcSkill = getCharsSpecialExperience("chPlayerCharacter","impExp") * 10 + pcChaPoints + pcEmpPoints + pcWilPoints;
				var hour = State.variables.daycycle.hours;
				var flagAllChecksPassed = true;
				var mapEventMsg = "";
				if ( pcSkill >= baseSkillRequirement ) {
					eventMsg += colorText("Performance skill check PASSED","green") + ": Improvisation Skill (" + getCharsSpecialExperience("chPlayerCharacter","impExp").toFixed(1) * 10 + ") + Charisma points (" + pcChaPoints.toFixed(1) + ") + Empathy points (" + pcEmpPoints.toFixed(1) + ") + Will Points (" + pcWilPoints.toFixed(1) + ") = " + pcSkill.toFixed(1) + " >= Difficulty (50)\n";
				} else {
					flagAllChecksPassed = false;
					eventMsg += colorText("Performance skill check FAILED","red") + ": Improvisation Skill (" + getCharsSpecialExperience("chPlayerCharacter","impExp").toFixed(1) * 10 + ") + Charisma points (" + pcChaPoints.toFixed(1) + ") + Empathy points (" + pcEmpPoints.toFixed(1) + ") + Will Points (" + pcWilPoints.toFixed(1) + ") = " + pcSkill.toFixed(1) + " < Difficulty (50)\n";
				}
				if ( hour < 18 ) {
					mapEventMsg += colorText("Hour check (" + hour + " < 18): Passed\n","green");
				} else {
					flagAllChecksPassed = false;
					mapEventMsg += colorText("Hour check (" + hour + " >= 18): Failed\n","red");
				}
				if ( flagAllChecksPassed ) {
					mapEventMsg += "\n<<l" + "ink [[You overhear a conversation...|FASE ImprovTrial Start]]>><<s" + "cript>>\n"
								 + "initFaSeTrialImprovisation();\n<</s" + "cript>><</l" + "ink>>\n";
				}
				eventMsg += mapEventMsg + "\n";
			}
			
			eventMsg += sharedTrainingRelationshipEvents(characters);
			return eventMsg;
		}
	);
	sEvent.priority = 3;
	return sEvent;
}
window.createTheaterImprovisationAction = function() {
	var action = new mapAction("dramaImprovisation","Drama Improvisation",createSysEvTheaterImprovisation,false);
	action.description = "The characters will train their improvisation skills with other acting Shapeshifters. Trains charisma, empathy and improvisation skill, consumes social drive.";
	action.tags.push("training","trRank1","charisma","empathy");
	action.recMins = 60;
	action.flexibleTimes = false;
	return action;
}
window.describeCharsImprovExp = function(cK) {
	var msg = "";
	var exp = getCharsSpecialExperience(cK,"impExp");
	if ( exp >= 40 ) {
		msg = gC(cK).getFormattedName() + " is able to take and leave any role at will, flowing through any plot like the water seeps through the cracks of any rock.";
	} else if ( exp >= 27 ) {
		msg = gC(cK).getFormattedName() + " is learning to plan the plot ahead, making " + gC(cK).comPr + " less likely to run into a dead end.";
	} else if ( exp >= 13 ) {
		msg = gC(cK).getFormattedName() + " is comfortable interpreting many roles.";
	} else {
		msg = gC(cK).getFormattedName() + " is still grasping the basics.";
	}
	return msg;
}

	// Workshops
window.createSysEvWorkshopCrafting = function(minutes,characters) {
	var sEvent = new systemEvent(minutes,characters,"workshopCrafting","Workshop Crafting",function(cList) {
			var eventMsg = "";
			var exp = 0;
			var expRate = 1;
			var barCost = 20;
			var barType = "energy";
			for ( var character of cList ) {
				// The character attempts to consume barCost (ex.20) out of barType (ex.willpower), returns false if not possible
				var barConsumption = barCost*(this.ongoingTime/60);
				var charHadEnoughBar = charConsumesBarAmount(character,barType,barConsumption);
				if ( charHadEnoughBar == false ) { expRate = 0.5; } 
				var exp1 = charGetsExpRate(this.ongoingTime,character,"physique",expRate);
				var exp2 = charGetsExpRate(this.ongoingTime,character,"resilience",expRate);
				var crfExp = (this.ongoingTime / 60) * gC(character).physique.affinity * gC(character).physique.affinity * gC(character).resilience.affinity;
				addCharsSpecialExperience(character,"crfExp",crfExp);
				eventMsg += createCharGotExpMessage(character,"physique",exp1) + "\n";
				eventMsg += createCharGotExpMessage(character,"resilience",exp2) + "\n";
				eventMsg += describeCharsCraftExp(character) + "\n";
				var rspMsg = describeRespectGain(character,"crfExp");
				eventMsg += rspMsg;
				eventMsg += createCharSpentBarMessage(character,barType,barConsumption) + "\n";
			}
			// Dildo crafting map event
			if ( isStVarOn("dldCrf") == false && cList[0] == "chPlayerCharacter" ) { // Dildo crafting map scene
				// Base requirements
				var baseSkillRequirement = 50;
				var pcPhyPoints = (gCstat("chPlayerCharacter","physique") - 10) * 0.5; if ( pcPhyPoints < 0 ) { pcPhyPoints = 0; }
				var pcPerPoints = (gCstat("chPlayerCharacter","perception") - 10) * 0.5; if ( pcPerPoints < 0 ) { pcPerPoints = 0; }
				var pcIntPoints = (gCstat("chPlayerCharacter","intelligence") - 10) * 0.5; if ( pcIntPoints < 0 ) { pcIntPoints = 0; }
				var pcSkill = getCharsSpecialExperience("chPlayerCharacter","crfExp") * 10 + pcPhyPoints + pcPerPoints + pcIntPoints;
				if ( pcSkill >= 60 ) { // Passed initial check, continue
					eventMsg += colorText("Initial check PASSED","green") + ": Crafting Skill (" + getCharsSpecialExperience("chPlayerCharacter","crfExp").toFixed(1) * 10 + ") + Physique points (" + pcPhyPoints.toFixed(1) + ") + Perception points (" + pcPerPoints.toFixed(1) + ") + Intelligence Points (" + pcIntPoints.toFixed(1) + ") = " + pcSkill.toFixed(1) + " >= Difficulty (60)\n\n";
					var hornyPoints = (1 - getBarPercentage("chPlayerCharacter","lust")) * 20; // Missing lust % * 10
					var dice45 = limitedRandomInt(45);
					var difficulty = 40;
					var totalPoints = pcSkill * 0.1 + dice45 + hornyPoints;
					if ( totalPoints >= difficulty ) { // Passed second check, notify and offer option to create dildo
						eventMsg += colorText("Second check PASSED","green") + ": Skill points (" + (pcSkill * 0.1).toFixed(1) + ") + Horny points (" + hornyPoints.toFixed(1) + ")" + getTextWithTooltip("^^(?)^^","Receive lust damage to raise this value.") + " Dice 45 (" + dice45 + ") = " + totalPoints.toFixed(1) + " >= Difficulty (" + difficulty + ")\n\n";
						eventMsg += "<<l" + "ink [[...Craft a toy?|FASE Crafting a Dildo]]>><<s" + "cript>>\n"
			+ "initializeFaSeCraftingADildo();\n<</s" + "cript>><</l" + "ink>>\n\n";
					} else { // Didn't pass second check, notify
						eventMsg += colorText("Second check FAILED","red") + ": Skill points (" + (pcSkill * 0.1).toFixed(1) + ") + Horny points (" + hornyPoints.toFixed(1) + ")" + getTextWithTooltip("^^(?)^^","Receive lust damage to raise this value.") + " Dice 45 (" + dice45 + ") = " + totalPoints.toFixed(1) + " < Difficulty (" + difficulty + ")\n\n";
					}
				} else { // Didn't pass initial check, notify
					eventMsg += colorText("Initial check FAILED","red") + ": Crafting Skill (" + getCharsSpecialExperience("chPlayerCharacter","crfExp").toFixed(1) * 10 + ") + Physique points (" + pcPhyPoints.toFixed(1) + ") + Perception points (" + pcPerPoints.toFixed(1) + ") + Intelligence Points (" + pcIntPoints.toFixed(1) + ") = " + pcSkill.toFixed(1) + " < Difficulty (60)\n\n";
				}
			}
			eventMsg += sharedTrainingRelationshipEvents(characters);
			return eventMsg;
		}
	);
	sEvent.priority = 3;
	return sEvent;
}
window.createWorkshopCraftingAction = function() {
	var action = new mapAction("workshopCrafting","Workshop Crafting",createSysEvWorkshopCrafting,false);
	action.description = "The characters will train their crafting skills with the materials and tools in the workshops. Trains physique, resilience and crafting skill, consumes energy.";
	action.tags.push("training","trRank1","physique","resilience");
	action.recMins = 60;
	action.flexibleTimes = false;
	return action;
}
window.describeCharsCraftExp = function(cK) {
	var msg = "";
	var exp = getCharsSpecialExperience(cK,"crfExp");
	if ( exp >= 40 ) {
		msg = gC(cK).getFormattedName() + " only needs to visualize a form in " + gC(cK).posPr + " mind to know how to shape the materials in front of " + gC(cK).comPr + " into it.";
	} else if ( exp >= 27 ) {
		msg = gC(cK).getFormattedName() + " is growing bolder at trying new techniques.";
	} else if ( exp >= 13 ) {
		msg = gC(cK).getFormattedName() + " has a clear understanding on manipulating clay and glass.";
	} else {
		msg = gC(cK).getFormattedName() + " is still grasping the basics.";
	}
	return msg;
}
window.createSysEvWorkshopPainting = function(minutes,characters) {
	var sEvent = new systemEvent(minutes,characters,"workshopPainting","Workshop Painting",function(cList) {
			var eventMsg = "";
			var exp = 0;
			var expRate = 1;
			var barCost = 20;
			var barType = "willpower";
			for ( var character of cList ) {
				// The character attempts to consume barCost (ex.20) out of barType (ex.willpower), returns false if not possible
				var barConsumption = barCost*(this.ongoingTime/60);
				var charHadEnoughBar = charConsumesBarAmount(character,barType,barConsumption);
				if ( charHadEnoughBar == false ) { expRate = 0.5; } 
				var exp1 = charGetsExpRate(this.ongoingTime,character,"intelligence",expRate);
				var exp2 = charGetsExpRate(this.ongoingTime,character,"perception",expRate);
				var pntExp = (this.ongoingTime / 60) * gC(character).intelligence.affinity * gC(character).perception.affinity * gC(character).perception.affinity;
				addCharsSpecialExperience(character,"pntExp",pntExp);
				eventMsg += createCharGotExpMessage(character,"intelligence",exp1) + "\n";
				eventMsg += createCharGotExpMessage(character,"perception",exp2) + "\n";
				eventMsg += describeCharsPaintExp(character) + "\n";
				var rspMsg = describeRespectGain(character,"pntExp");
				eventMsg += rspMsg;
				eventMsg += createCharSpentBarMessage(character,barType,barConsumption) + "\n";
			}
			// Body Painting map event
			if ( isStVarOn("bdPtSc") == false && cList[0] == "chPlayerCharacter" ) {
				// Base requirements
				var pcSkill = getCharsBdPntSkill("chPlayerCharacter");
				var hour = State.variables.daycycle.hours;
				var mapEventMsg = "";
				if ( pcSkill >= 10 ) {
					var skillFlag = true;
					mapEventMsg += colorText("Painting skill check (" + pcSkill.toFixed(1) + ">=10): Passed\n","green");
				} else {
					var skillFlag = false;
					mapEventMsg += colorText("Painting skill check (" + pcSkill.toFixed(1) + "<10): Failed\n","red");
				}
				if ( hour >= 16 ) {
					var hourFlag = true;
					mapEventMsg += colorText("Hour check (" + hour + ">=16): Passed\n","green");
				} else {
					var hourFlag = false;
					mapEventMsg += colorText("Hour check (" + hour + "<16): Failed\n","red");
				}
				if ( skillFlag && hourFlag ) {
					mapEventMsg += "\n<<l" + "ink [[What are the others painting?|FASE PntWthMir Start]]>><<s" + "cript>>\n"
								 + "initializeFaSePaintingPadmiri();\n<</s" + "cript>><</l" + "ink>>\n";
				}
				eventMsg += mapEventMsg + "\n";
			}
			eventMsg += sharedTrainingRelationshipEvents(characters);
			return eventMsg;
		}
	);
	sEvent.priority = 3;
	return sEvent;
}
window.createWorkshopPaintingAction = function() {
	var action = new mapAction("workshopPainting","Workshop Painting",createSysEvWorkshopPainting,false);
	action.description = "The characters will paint ceramic tiles with the materials in the workshops. Trains intelligence, perception and painting skill, consumes willpower.";
	action.tags.push("training","trRank1","intelligence","perception");
	action.recMins = 60;
	action.flexibleTimes = false;
	return action;
}
window.describeCharsPaintExp = function(cK) {
	var msg = "";
	var exp = getCharsSpecialExperience(cK,"pntExp");
	if ( exp >= 40 ) {
		msg = gC(cK).getFormattedName() + " can now infuse the clay with the most elemental feelings and desires of " + gC(cK).posPr + " mind and heart.";
	} else if ( exp >= 27 ) {
		msg = gC(cK).getFormattedName() + " has developed some understanding of composition.";
	} else if ( exp >= 13 ) {
		msg = gC(cK).getFormattedName() + " is now more capable of portraying the forms that " + gC(cK).perPr + " wants.";
	} else {
		msg = gC(cK).getFormattedName() + " is still grasping the basics.";
	}
	return msg;
}

window.charGainsRespectFromTraining = function(character, skill) {
	var gainedRsp = 0;
	if ( gC(character).hasOwnProperty("ssRsp") ) {
		gainedRsp = 1 + gC(character)[skill] * 0.1 + limitedRandomInt(6) * 0.1 - 0.3;
		gC(character).ssRsp += gainedRsp;
	}
	return gainedRsp;
}
window.describeRespectGain = function(character, skill) {
	var txt = "";
	var gainedRsp = charGainsRespectFromTraining(character,skill);
	if ( gainedRsp > 0 ) {
		txt += gC(character).getFormattedName() + "'s effort and skill gains " + gC(character).comPr + " " + gainedRsp.toFixed(1) + " respect with the tribe.\n";
	}
	return txt;
}

// Union Lake

// Map Events
window.createGleamingCavernsVoyeurAction = function(firstCharFemale,secondCharFemale,egaScene,spectators) {
	var action = new mapAction("gCvoyeur","Spy at the lovers below",createGleamingCavernsVoyeurEvent,false);
	action.description = "You have spotted a couple of Shapeshifters down below seeking intimacy. You could become an uninvited observer...";
	action.recMins = 20;
	action.getPassage = function() { return "Scene"; };
	return action;
}
window.createGleamingCavernsVoyeurEvent = function(minutes,characters) {
	var firstCharFemale = State.variables.mapGleamingCaverns.femCharA;
	var secondCharFemale = State.variables.mapGleamingCaverns.femCharB;
	var egaScene = State.variables.mapGleamingCaverns.egaScene;
	var spectators = characters;
	var charA = 1;
	var charB = 2;
	if ( firstCharFemale ) { charA = generateFemaleAnonShapeshifter([]); }
					  else { charA = generateMaleAnonShapeshifter([]); }
	if ( secondCharFemale ) { charB = generateFemaleAnonShapeshifter([gC(charA).name]); }
					  else { charB = generateMaleAnonShapeshifter([gC(charA).name]); }
	destroyCharsVirginitiesNoFlavor(charA);
	destroyCharsVirginitiesNoFlavor(charB);
	var sceneType = "fixed";
	if ( egaScene ) {
		sceneType = "dynamic";
	}
	var allChars = [charA,charB].concat(characters);
	recalculateMaxBars(charA);
	recalculateMaxBars(charB);
	var sEvent = new systemEvent(20,allChars,"scene","Spying sex",function(cList) {
			var desc = getRoomInfoA(gC(this.characters[2]).currentRoom).description;
			State.variables.sc.startScene("ss",sceneType,[charA],[charB],desc,endConditionTurns,gSettings().stdSxScDur,"Scene Results"); // Start scene
			State.variables.sc.endSceneScript = processGleamingCavernsVoyeurEffects;
			// Set lead
			if ( sceneType == "fixed" ) {
				gC(charA).hasLead = true;
				gC(charB).hasLead = false;
			}
			// Set AIs
				gC(charA).aiAlgorythm = createAiWeightedMissionsByTaste();
				gC(charB).aiAlgorythm = createAiWeightedMissionsByTaste();
			if ( egaScene ) {
				gC(charA).aiAlgorythm.setRoleEqualFooting();
				gC(charB).aiAlgorythm.setRoleEqualFooting();
			} else {
				if ( limitedRandomInt(100) < 50 ) {
					gC(charA).aiAlgorythm.setRoleActive();
					gC(charB).aiAlgorythm.setRolePassive();
				} else {
					gC(charA).aiAlgorythm.setRoleDomination();
					gC(charB).aiAlgorythm.setRoleSubmission();
				}
 			}
			State.variables.sc.spectators = this.spectators;
			if ( this.characters.includes("chPlayerCharacter") == false ) {
				State.variables.sc.autoResolveScene();
			}
			State.variables.sc.genericCharacters = [charA,charB];
		}
	);
	sEvent.charactersTeamA = [charA];
	sEvent.charactersTeamB = [charB];
	sEvent.spectators = spectators;
	sEvent.flagMayBeInterrupted = false;
	sEvent.flagMayChangeGroups = false;
	sEvent.label = "voyeur";
	sEvent.priority = 5;
	sEvent.applyEffectIfForcedToEnd = false;
	return sEvent;
}
  // Voyeur post-scene script
 window.processGleamingCavernsVoyeurEffects = function() {
	var charA = State.variables.sc.teamAcharKeys[0];
	var charB = State.variables.sc.teamBcharKeys[0];
	var totalOrgasms = gC(charA).orgasmSceneCounter + gC(charA).ruinedOrgasmSceneCounter * 3 + gC(charA).mindblowingOrgasmSC * 5 + gC(charB).orgasmSceneCounter + gC(charB).ruinedOrgasmSceneCounter * 3 + gC(charB).mindblowingOrgasmSC * 5;
	var spectators = State.variables.sc.spectators;
	var effectPoints = 5 + limitedRandomInt(5) + totalOrgasms * 4;
	
	var resultsMessage = "";
	for ( var chKey of spectators ) {
		// Provoke lust damage to spectators up to limit
		var lustDamage = effectPoints / 2 + limitedRandomInt(textLustDamage/2);
		gC(chKey).lust.current -= lustDamage;
		if ( getBarPercentage(chKey,"lust") < 0.15 ) {
			gC(chKey).lust.current = gC(chKey).lust.max * 0.15;
		}
		resultsMessage += gC(chKey).getFormattedName() + " has received " + textLustDamage(lustDamage) + " from watching the scene.\n";
		// Spectators may receive various experiences
		for ( var st of getStatNamesArray() ) {
			if ( limitedRandomInt(100) > 65 ) {
				var expPoints = 1 + limitedRandomInt(effectPoints) / 5;
				gC(chKey)[st].addExperience(expPoints);
				resultsMessage += firstToCap(gC(chKey).posPr) + " insights also provided " + gC(chKey).comPr + " with " + expPoints.toFixed(1) + " " + st + " experience points.\n";
			}
		}
	}
	
	if ( isStVarOn("blmClaw") ) { // Special Event already happened, no need to check
		resultsMessage += "\n[[Continue|Map]]";
	} else {
		// Dice roll triggers: Claw's dominance, Claw's ambition, Claw's perception, Claw's luck
		var baseValue = getCharsDrive("chClaw","dDomination") * 10 + getCharsDrive("chClaw","dAmbition") * 10 + gCstat("chClaw","perception") * 2 + gCstat("chClaw","luck");
		var dice1000 = limitedRandomInt(1000);
		var requiredLimit = 500;
		resultsMessage += "\nEvent chance: Secret Values (" + baseValue + ") + dice 1000 (" + dice1000 + ") ";
		if ( dice1000 + baseValue >= requiredLimit ) {
			resultsMessage += ">= Target (" + requiredLimit + ")\n\n"
			+ `<span @style=$chClaw.colorStyleKey>//"I can see you're having fun."//</span>\n\n`
			+ "<<l" + "ink [[Continue|FASE BbC Start]]>><<s" + "cript>>\n"
			+ "initializeFaSeBlackMailedByClaw();\n<</s" + "cript>><</l" + "ink>>";
		} else {
			resultsMessage += "< Target (" + requiredLimit + ")\n\n[[Continue|Map]]";
		}
	}
	
	// Finish formatting
	State.variables.compass.sceneResultsPassage = resultsMessage;
}

window.createGleamingCavernsDildoPlayAction = function() {
	var action = new mapAction("dldPlay","Try out the dildo",createSystemEventMedWait,false);
	action.description = "Find a hidden spot to feel the touch of your new toy against your flesh.";
	action.recMins = 20;
	action.getPassage = function() { return "FASE Dildo Play 1"; };
	return action;
}

// Morph Artist Hut
window.createGleamingCavernsMorphHutInit = function() {
	var action = new mapAction("morphHutConv","Inquiry about transformations",createSystemEventCheapWaitNoDesc,false);
	action.description = "Ask Mesquelles and the Transformation Master about their art.";
	action.recMins = 5;
	action.getPassage = function() { return "FASE MorphHut Init"; };
	return action;
}
window.createGleamingCavernsMorphHutMedInit = function() {
	var action = new mapAction("morphHutConv","Inquiry about transformations",createSystemEventCheapNoWait,false);
	action.description = "Ask Mesquelles and the Transformation Master about their art.";
	action.recMins = 0;
	action.getPassage = function() { return "FASE MorphHut Main"; };
	return action;
}

// Temple Storage
window.createGleamingCavernsDrishtyaConv = function() {
	var action = new mapAction("drishtyaFASEconv","Talk to Drishtya",createSystemEventDrMlConv,false);
	action.description = "Discuss the current situation with Drishtya and Melesh.";
	action.recMins = 0;
	action.getPassage = function() { return "FASE DrishtyaMelesh Conv Init"; };
	return action;
}
window.createSystemEventDrMlConv = function(minutes,characters) {
	var sEvent = new systemEvent(0,characters,"drMlConv","Wait for a few minutes",function(cList) {
			initFaSeDrishtyaMeleshConv();
			var eventMsg = "";
			State.variables.compass.setMapMessage(eventMsg);
			return eventMsg;
		}
	);
	sEvent.priority = 1;
	return sEvent;
}

// Talk to Valtan
window.createGleamingCavernsValtanConv = function() {
	var action = new mapAction("valtanFASEconv","Talk to Valtan",createSystemEventDrMlConv,false);
	action.description = "Talk to Valtan.";
	action.recMins = 0;
	action.getPassage = function() { return "FASE ValtanIllumination GeneralOptions"; };
	return action;
}
window.createSystemEventDrMlConv = function(minutes,characters) {
	var sEvent = new systemEvent(0,characters,"valtanFASEconv","Wait for a few minutes",function(cList) {
			initValtanAtIlluminationPond();
			var eventMsg = "";
			State.variables.compass.setMapMessage(eventMsg);
			return eventMsg;
		}
	);
	sEvent.priority = 1;
	return sEvent;
}

// Gleaming Caverns - Random Monster Encounters

window.createGcRandomMonsterEncounterEvent = function(minutes,initialCharacters) {
	var sEvent = new systemEvent(20,initialCharacters,"battle","Monster encounter",function(cList) {
			var desc = getRoomInfoA(gC(this.characters[0]).currentRoom).description;
			var monGroup = createGcRandomMonsterGroup(initialCharacters);
			this.charactersTeamB = monGroup;
			
			// Non-monsters starting lust
			var charsStartingLust = [];
			for ( var cK of this.charactersTeamA ) {
				charsStartingLust.push(gC(cK).lust.current);
			}
			
			State.variables.sc.flightFlag = true;
			State.variables.sc.startScene("bs","none",this.charactersTeamA,this.charactersTeamB,desc,endConditionStandardMonsterBattle,0,"Scene Results"); // Start scene
			State.variables.sc.tempData = [charsStartingLust]; // First element of array is an array with the starting lust of the characters in the team
			State.variables.sc.genericCharacters = this.charactersTeamB; // Monster NPCs will be removed after battle
			State.variables.sc.endSceneScript = processGenericMonsterBattleEffects; // Set custom battle effects
			State.variables.sc.extraJoinedCharacters = this.extraJoinedChars;
			State.variables.sc.initialCharacters = this.initialCharactersTeamA;
			for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
				if ( charKey != "chPlayerCharacter" ) {
					gC(charKey).aiAlgorythm = createAiEarlyStrategic();
				}
			}
			for ( var extraMessage of this.extraMessages ) {
				if ( State.variables.sc.importantMessages != "" ) { State.variables.sc.importantMessages += "\n"; }
				State.variables.sc.importantMessages += extraMessage;
			}
			if ( this.characters.includes("chPlayerCharacter") == false ) {
				State.variables.sc.autoResolveScene();
			}
		}
	);
	sEvent.charactersTeamA = initialCharacters;
	sEvent.initialCharactersTeamA = initialCharacters;
	sEvent.flagMayBeInterrupted = false;
	sEvent.flagMayChangeGroups = false;
	sEvent.label = "monsterEncounter";
	sEvent.priority = 8;
	sEvent.applyEffectIfForcedToEnd = false;
	sEvent.priority = 5;
	
	return sEvent;
}

window.createGcRandomMonsterGroup = function(initialCharacters) {
	var monGroup = [];
	var firstChar = initialCharacters[0];
	if ( gC(firstChar).hasOwnProperty("mapAi") ) {
		if ( gC(firstChar).mapAi.goalsList.length > 0 ) {
			if ( gC(firstChar).mapAi.goalsList[0].hasOwnProperty("targetMonster") ) {
				if ( gC(firstChar).monsterType == gC(firstChar).mapAi.goalsList[0].targetMonster ) {
					var targetMonster = gC(firstChar).monsterType;
					var rN = limitedRandomInt(300);
					if ( rN > 130 ) {
						if ( targetMonster == "Flying Lookout" ) {
							monGroup = [ createFlyingLookout(1,0,1) , createFlyingLookout(1,0,2) ];
						} else if ( targetMonster == "Essence-Sucker" ) {
							monGroup = [ createEssenceSucker(1,0,1) , createEssenceSucker(1,0,2) ];
						} else if ( targetMonster == "Oppressive Yoke" ) {
							monGroup = [ createOppressiveYoke(1,0,-1) ];
						}
					}
				}								
			}
		}
	}
	if ( monGroup.length == 0 ) {
		var rN = limitedRandomInt(300);
		if ( rN > 200 ) { // Flying Lookouts
			monGroup = [ createFlyingLookout(1,0,1) , createFlyingLookout(1,0,2) ];
		} else if ( rN > 100 ) { // Essence-Suckers
			monGroup = [ createEssenceSucker(1,0,1) , createEssenceSucker(1,0,2) ];
		} else { // Oppressive Yoke
			monGroup = [ createOppressiveYoke(1,0,-1) ];
		}
	}
	return monGroup;
}

// Monster Hunting
window.createGetHuntingNetAction = function() {
	var action = new mapAction("gtCpNt","Ask Artume for Capturing Nets",createSystemEventGetHuntingNet,false);
	action.description = "Artume would be thankful if you captured a monster and brought them to her. Ask her for hunting nets to subdue monsters in battle.";
	action.recMins = 5;
	action.getPassage = function() {
		var passage = "Fa GetCaptureNets Std";
		if ( isStVarOn("knHnNt") == false ) {
			passage = "Fa GetCaptureNets Explain";
		}
		return passage;
	};
	action.tags.push("captureNet");
	return action;
}
window.createSystemEventGetHuntingNet = function(minutes,characters) {
	var sEvent = new systemEvent(5,characters,"gtCpNt","Getting Capturing Nets",function(cList) {
			var receivingChars = [];
			for ( var cK of characters ) {
				if ( doesCharHaveAlteredState(cK,"CaNt") == false ) {
					receivingChars.push(cK);
				}
			}
			// Give characters capturing nets
			applyAlteredState(receivingChars,createHasCaptureNetAs());
			var eventMsg = getCharNames(characters) + " received capturing nets from Artume! It is now possible to capture monsters during battle.\n\n";
			return eventMsg;
		}
	);
	sEvent.priority = 1;
	return sEvent;
}

window.createDeliverMonstersAction = function() {
	var action = new mapAction("delMon","Deliver monsters to Artume",createSystemDeliverMonsters,false);
	action.description = "Bring the monsters you've captured to Artume for experience and new actions.";
	action.recMins = 120;
	action.getPassage = function() {
		var passage = "Interlude";
		if ( isStVarOn("brMnAr") == false ) {
			passage = "Fa FirstMonsterCapture";
		}
		return passage;
	};
	action.tags.push("deliverMonster");
	return action;
}
window.createSystemDeliverMonsters = function(minutes,characters) {
	// Fix time
	var time = 120;
	for ( var sEvent of State.variables.compass.ongoingEvents ) {
		if ( sEvent.title == "scenarioEnd" ) {
			if ( sEvent.remainingTime <= time ) {
				time = sEvent.remainingTime - 1;
				if ( time < 1 ) { time = 1; }
			}
		}
	}
	var sEvent = new systemEvent(time,characters,"delMon","Deliver Captured Monsters",function(cList) {
			// Get list of all captured monsters
			var capturedMonsters = [];
			for ( var as of gC(characters[0]).alteredStates ) {
				if ( as.hasOwnProperty("monsterType") ) {
					capturedMonsters.push(as.monsterType);
				}
			}
			var eventMsg = "Captured monsters: " + stringArrayToText(capturedMonsters) + ".";
			// Grant experience
			var expString = [0,0,0,0,0,0,0,0,0];
			var anyGainedExp = false;
			var i = 0;
			for ( var m of capturedMonsters ) {
				while ( i < 9 ) {
					expString[i] += getMonRewards(m)[i];
					if ( getMonRewards(m)[i] != 0 ) { anyGainedExp = true; }
					i++;
				}
				i = 0;
			}
			for ( var cK of characters ) {
				for ( var st of setup.baseStats ) {
					gC(cK)[st].addExperience(expString[i]);
					i++;
				}
				i = 0;
			}
			if ( anyGainedExp ) {
				eventMsg += "\n\nGained experience (will be modified depending on the stat affinity of each character):";
				for ( var st of setup.baseStats ) {
					if ( expString[i] != 0 ) {
						eventMsg += "\n" + firstToCap(st) + ": " + expString[i];
					}
					i++;
				}
			}
			i = 0;
			// Grant actions
			var learnableActions = [];
			var learnableSocialActions = [];
			var learningCharacters = characters.concat(["chArt"]);
			for ( var m of capturedMonsters ) {
				for ( var act of getMonRewards(m)[9] ) {
					if ( learnableActions.includes(act) == false ) {
						learnableActions.push(act);
					}
				}
				for ( var act of getMonRewards(m)[10] ) {
					if ( learnableSocialActions.includes(act) == false ) {
						learnableSocialActions.push(act);
					}
				}
			}
			var learnedActionsString = "" + charactersLearnSceneActions(learningCharacters,learnableActions);
			if ( learnedActionsString != "" ) {
				eventMsg += "\n\n" + learnedActionsString;
			}
			for ( var cK of learningCharacters ) {
				for ( var act of learnableSocialActions ) {
					if ( gC(cK).extraSocIntList.includes(act) == false ) {
						gC(cK).extraSocIntList.push(act);
					}
				}
			}
			// Special functions
			for ( var m of capturedMonsters ) {
				if ( getMonRewards(m)[11] ) {
					eventMsg += getMonRewards(m)[11](characters);
				}
			}
			// Remove "Captured Monster" altered states
			gC(characters[0]).removeSpecificState("CaMn");
			eventMsg += "\n";
			// Disband group
			charLosesFollowers(characters[0]);
			return eventMsg;
		}
	);
	sEvent.priority = 1;
	return sEvent;
}

// Temple of Harmony

window.createGleamingCavernsNersmiasConv = function() {
	var action = new mapAction("nersmiasFASEconv","Discuss with Nersmias",createSystemEventNersmiasConv,false);
	action.description = "Discuss with Nersmias about Valtan and Sillan. You should be cautious and make sure you're prepared.";
	action.recMins = 0;
	action.getPassage = function() { return "FaSe NSB Init"; };
	return action;
}
window.createSystemEventNersmiasConv = function(minutes,characters) {
	var sEvent = new systemEvent(0,characters,"nerConv","Discuss with Nersmias",function(cList) {
			initFaSeNSBfirst();
			var eventMsg = "";
			State.variables.compass.setMapMessage(eventMsg);
			return eventMsg;
		}
	);
	sEvent.priority = 1;
	return sEvent;
}

window.createGleamingCavernsNPCNersmiasConv = function() {
	var action = new mapAction("npcNerConv","Discuss with Nersmias (NPC)",createSystemEventNPCNersmiasConv,false);
	action.description = "ACTION FOR NPC, PLAYER SHOULDN'T READ THIS. Discuss with Nersmias about Valtan and Sillan. You should be cautious and make sure you're prepared.";
	action.tags.push("npcNerConv");
	action.recMins = 60;
	return action;
}
window.createSystemEventNPCNersmiasConv = function(minutes,characters) {
	var sEvent = new systemEvent(minutes,characters,"npcNerConv","Discussing with Nersmias",function(cList) {
			var charsPositions = getCharsValtanJudgement(characters[0]); // Levels of support/opposition to [0] Valtan's relationship and [1] Valtan's pardon
			//State.variables.nerTrust += charsPositions[0] * 5 - charsPositions[1] * 3;
			//State.variables.nerConviction += (- charsPositions[0] * 5 - charsPositions[1] * 5);
			modifyNersmiasGlobalConviction(- charsPositions[0] * 5 - charsPositions[1] * 5);
			modifyNersmiasGlobalTrust(charsPositions[0] * 5 - charsPositions[1] * 3);
			var increasedRespect = 0;
			if ( charsPositions[1] < 0 ) {
				increasedRespect += charsPositions[1] * (-100);
			}
			gC(characters[0]).ssRsp += increasedRespect;
			gC(characters[0]).flagSpokeWithNersmias = true;
			
			var eventMsg = "The Player shouldn't read this message.";
			return eventMsg;
		}
	);
	sEvent.priority = 1;
	return sEvent;
}

// Misc functionality

window.createAssemblyDiscussion = function() {
	var minutes = 540;
	var sEvent = new systemEvent(minutes,["chNer"],"stAsDc","Deliberating",function(cList) {
		State.variables.compass.moveCharsToRoom(["chNer"],"templeShrine");
	});
	sEvent.priority = 1;
	return sEvent;
}

