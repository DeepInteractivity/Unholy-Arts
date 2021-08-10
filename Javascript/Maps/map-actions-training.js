// TRAINING MAP ACTIONS //
// Tags: "trRankX" refers to "Training of Rank X"

// Auxiliar
window.charConsumesBarAmount = function(character,bar,amount) {
	var flagEnoughBar = false;
	
	
	if ( gC(character)[bar].current >= amount ) {
		flagEnoughBar = true;
	}
	gC(character)[bar].changeValue(-amount);
	
	if ( gC(character)[bar].current < 0 ) {
		gC(character)[bar].current = 0;
	}
	
	return flagEnoughBar;
}

window.charsGetExpRate = function(minutes,characters,stat,rate) {
	var rxm = rate * minutes;
	for ( var charKey of characters ) {
		gC(charKey)[stat].addExperience(rxm);
	}
}
window.charGetsExpRate = function(minutes,character,stat,rate) {
	var rxm = rate * trainingResultsVar() * minutes;
	gC(character)[stat].addExperience(rxm);
	return rxm;
}

window.tutorshipExtraExp = function(minutes,characters,stat,rate) {
	var resultsText = "";
	for ( var charKey of characters ) {
		if ( gC(charKey).domChar == characters[0] ) {
			if ( gRelTypeAb(charKey,characters[0]).type == "tutorship" ) {
				var dice = limitedRandomInt(100);
				if ( gC(charKey)[stat].value < gC(characters[0])[stat].value ) {
					var rxm = rate * trainingResultsVar() * minutes * 0.1;
					if ( dice < 21 ) { rxm *= 2; }
					gC(charKey)[stat].addExperience(rxm);
					resultsText += "\nAs " + gC(charKey).getFormattedName() + "'s tutor, " + gC(characters[0]).getFormattedName() + " helped " + gC(charKey).getFormattedName() + " gain " + (rxm * gC(charKey)[stat].affinity).toFixed(2) + " additional experience points.";
					if ( dice < 21 ) {
						resultsText += " A most dedicated attention by part of " + gC(charKey).posPr + " tutor doubled this amount, in exchange for increased submission.";
						var dom = gC(charKey).domChar;
						getRelation(charKey,dom).submission.stv += 40;
						getRelation(dom,charKey).domination.stv += 40;
					}
				}
			}
		}
	}
	if ( resultsText != "" ) { resultsText = "\n\n" + resultsText; } 
	return resultsText;
}
window.sharedTrainingRelationshipEvents = function(characters) {
	var message = "";
	if ( characters.length > 1 ) {
		var it1 = 0;
		while ( it1 < characters.length - 1 ) {
			var it2 = it1 + 1;
			while ( it2 < characters.length ) {
				var char1 = characters[it1];
				var char2 = characters[it2];
				if ( getRelation(char1,char2) != undefined ) {
					message += sharedTrainingRelationshipEvent(char1,char2);
				}
				it2++;
			}
			it1++;
		}
	}
	if ( message != "" ) { message += "\n\n"; }
	return message;
}
window.sharedTrainingRelationshipEvent = function(charA,charB) {
	var dice = limitedRandomInt(100);
	var msg = "";
	var rivalryFlag = false;
	// Events: Raised friendship, raised rivalry, raised domination
	if ( gC(charA).domChar == charB ) { 				// B doms A
		if ( dice < (12 + gC(charB).dDomination.level) ) { // Domination
			getRelation(charA,charB).submission.stv += 40;
			getRelation(charB,charA).domination.stv += 40;
			msg += randomFromList( [
							(ktn(charB) + " amends " + ktn(charA) + "'s posture."),
							(ktn(charA) + " feels the confident gaze of " + ktn(charB) + " upon " + gC(charA).comPr + "."),
							(ktn(charB) + " orders " + ktn(charA) + " to assist " + gC(charB).comPr + " in " + gC(charB).posPr + " own training.")
					] ) + " " + colorText((gC(charA).getName() + "'s submission towards " + gC(charB).getName() + " has increased."),"purple");
		}
	} else if ( gC(charB).domChar == charA ) { 			// A doms B
		if ( dice < (12 + gC(charA).dDomination.level) ) { // Friendship
			getRelation(charA,charB).domination.stv += 40;
			getRelation(charB,charA).submission.stv += 40;
			msg += randomFromList( [
							(ktn(charA) + " amends " + ktn(charB) + "'s posture."),
							(ktn(charB) + " feels the confident gaze of " + ktn(charA) + " upon " + gC(charB).comPr + "."),
							(ktn(charA) + " orders " + ktn(charB) + " to assist " + gC(charA).comPr + " in " + gC(charA).posPr + " own training.")
					] ) + " " + colorText((gC(charB).getName() + "'s submission towards " + gC(charA).getName() + " has increased."),"purple");
		}
	} else if ( gC(charA).egaChars.includes(charB) ) {  // Egalitarian relationship
	} else { 											// Else
		if ( dice < (5 + (gC(charA).dAmbition.level + gC(charA).dImprovement.level + gC(charB).dAmbition.level + gC(charB).dImprovement.level) * 0.3) ) { // Rivalry
			rivalryFlag = true;
			getRelation(charA,charB).rivalry.stv += 40;
			getRelation(charB,charA).rivalry.stv += 40;
			msg += randomFromList( [
							(ktn(charA) + " cannot help but try to outdo " + ktn(charB) + " during the training. This endeavor doesn't go unnoticed."),
							(ktn(charA) + " notices " + ktn(charB) + " trying to finish everything one step ahead of " + gC(charA).comPr + "."),
							("A tense air forms between " + ktn(charA) + " and " + ktn(charB) + " during the training, perhaps due to their competitiveness.")
						] ) + " " + colorText((gC(charB).getName() + "'s and " + gC(charA).getName() + "'s rivalry has increased."),"darkred");
		}
	}
	
	dice = limitedRandomInt(100);
	if ( (dice < (25 + gC(charA).dCooperation.level + gC(charB).dCooperation.level)) && rivalryFlag == false ) { // Friendship
		getRelation(charA,charB).friendship.stv += 40;
		getRelation(charB,charA).friendship.stv += 40;
		msg += randomFromList( [
						(ktn(charA) + " and " + ktn(charB) + " are enjoying each other's company."),
						("The training session gets enlivened by " + ktn(charA) + " and " + ktn(charB) + " jokes."),
						(ktn(charB) + " and " + ktn(charA) + " get to know each other a little better during this time.")
					] ) + " " + colorText((gC(charB).getName() + "'s and " + gC(charA).getName() + "'s friendship has increased."),"khaki");
	}
	
	if ( msg != "" ) { msg = "\n" + msg; }
	return msg;
}

window.createCharGotExpMessage = function(character,stat,exp) {
	var msg = ktn(character) + " gained " + (exp * gC(character)[stat].affinity).toFixed(2) + " " + stat + " experience.";
	//var msg = ktn(character) + " gained a base " + exp + " " + stat + " experience.";
	return msg;
}
window.createCharSpentBarMessage = function(character,bar,cost) {
	var msg = ktn(character) + " spent " + cost.toFixed(2) + " " + getBarName(bar) + " points.\n";
	return msg;
}
window.charRecoversBarPercent = function(character,barType,percent) {
	var recoveryValue = gC(character)[barType].max * percent;
	gC(character)[barType].changeValue(recoveryValue);
	return recoveryValue;
}

// Actions
window.createSystemEventStandardRest = function(minutes,characters) {
	var sEvent = new systemEvent(minutes,characters,"standardRest","Rest for one hour",function(cList) {
			var percent = 10 * restingResultsVar();
			var rPercent = percent * 0.01;
			for ( var character of cList ) {
				for ( var bar of ["lust","willpower","energy","socialdrive"] ) {
					charRecoversBarPercent(character,bar,rPercent*(this.ongoingTime/60));
				}
			}
			if ( cList.length > 1 ) {
				var eventMsg = "" + ktn(cList[0]) + " and the others rested for a while, recovering lust, "
							+ "willpower, energy and social drive points.\n";
			}
			else if (cList.length == 0) {
				var eventMsg = "";
			}
			else {
				var eventMsg = "" + ktn(cList[0]) + " rested for an hour, recovering lust, "
							+ "willpower, energy and social drive points.\n";
			}
			return eventMsg;
		}
	);
	sEvent.priority = 1;
	return sEvent;
}
window.createRestingActionStandard = function() {
	var action = new mapAction("standardRest","Rest for one hour",createSystemEventStandardRest,false);
	action.description = "The characters will rest for an hour, partially recovering their bar stats.";
	action.tags.push("rest");
	action.recMins = 60;
	action.flexibleTimes = true;
	return action;
}

	// Empathy
window.createSystemEventDramaReading = function(minutes,characters) {
	var sEvent = new systemEvent(minutes,characters,"dramaReading","Drama Reading",function(cList) {
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
				exp = charGetsExpRate(this.ongoingTime,character,"empathy",expRate);
				eventMsg += createCharGotExpMessage(character,"empathy",exp) + "\n";
				eventMsg += createCharSpentBarMessage(character,barType,barConsumption) + "\n";
			}
			eventMsg += tutorshipExtraExp(minutes,characters,"empathy",expRate);
			eventMsg += sharedTrainingRelationshipEvents(characters);
			return eventMsg;
		}
	);
	sEvent.priority = 3;
	return sEvent;
}
window.createTrainingActionDramaReading = function() {
	var action = new mapAction("dramaReading","Drama Reading",createSystemEventDramaReading,false);
	action.description = "The characters will make critical readings of different drama plays to train their empathy, consuming social drive.";
	action.tags.push("training","trRank1","empathy");
	action.recMins = 60;
	action.flexibleTimes = true;
	
	return action;
}

	// Charisma
window.createSystemEventDramaActing = function(minutes,characters) {
	var sEvent = new systemEvent(minutes,characters,"dramaActing","Drama Acting",function(cList) {
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
				exp = charGetsExpRate(this.ongoingTime,character,"charisma",expRate);
				eventMsg += createCharGotExpMessage(character,"charisma",exp) + "\n";
				eventMsg += createCharSpentBarMessage(character,barType,barConsumption) + "\n";
				//eventMsg += 
			}
			eventMsg += tutorshipExtraExp(minutes,characters,"charisma",expRate);
			eventMsg += sharedTrainingRelationshipEvents(characters);
			return eventMsg;
		}
	);
	sEvent.priority = 3;
	return sEvent;
}
window.createTrainingActionDramaActing = function() {
	var action = new mapAction("dramaActing","Drama Acting",createSystemEventDramaActing,false);
	action.description = "The characters will train their charisma playing different roles in the stage, consuming social drive.";
	action.tags.push("training","trRank1","charisma");
	action.recMins = 60;
	action.flexibleTimes = true;
	return action;
}

	// Luck
window.createSystemEventWaterfallMeditation = function(minutes,characters) {
	var sEvent = new systemEvent(minutes,characters,"waterfallMeditation","Waterfall Meditation",function(cList) {
			var eventMsg = "";
			var exp = 0;
			var expRate = 1;
			var barCost = 0;
			var barType = "socialdrive";
			for ( var character of cList ) {
				// The character attempts to consume barCost (ex.20) out of barType (ex.willpower), returns false if not possible
				var barConsumption = barCost*(this.ongoingTime/60);
				var charHadEnoughBar = charConsumesBarAmount(character,barType,barConsumption);
				if ( charHadEnoughBar == false ) { expRate = 0.5; } 
				exp = charGetsExpRate(this.ongoingTime,character,"luck",expRate);
				eventMsg += createCharGotExpMessage(character,"luck",exp) + "\n";
				eventMsg += createCharSpentBarMessage(character,barType,barConsumption) + "\n";
			}
			eventMsg += tutorshipExtraExp(minutes,characters,"luck",expRate);
			eventMsg += sharedTrainingRelationshipEvents(characters);
			return eventMsg;
		}
	);
	sEvent.priority = 3;
	return sEvent;
}
window.createTrainingActionWaterfallMeditation = function() {
	var action = new mapAction("waterfallMeditation","Waterfall Meditation",createSystemEventWaterfallMeditation,false);
	action.description = "Mysterious are the ways of the world, and characters immersing themselves within it will be at harmony with the Universe. Trains luck.";
	action.tags.push("training","trRank1","luck");
	action.recMins = 60;
	action.flexibleTimes = true;
	return action;
}

	// Resilience
window.createSystemEventSwimming = function(minutes,characters) {
	var sEvent = new systemEvent(minutes,characters,"swimming","Swimming",function(cList) {
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
				exp = charGetsExpRate(this.ongoingTime,character,"resilience",expRate);
				eventMsg += createCharGotExpMessage(character,"resilience",exp) + "\n";
				eventMsg += createCharSpentBarMessage(character,barType,barConsumption) + "\n";
			}
			eventMsg += tutorshipExtraExp(minutes,characters,"resilience",expRate);
			eventMsg += sharedTrainingRelationshipEvents(characters);
			return eventMsg;
		}
	);
	sEvent.priority = 3;
	return sEvent;
}
window.createTrainingActionSwimming = function() {
	var action = new mapAction("swimming","Swimming",createSystemEventSwimming,false);
	action.description = "The characters will train their resilience swimming in the river, consuming energy.";
	action.tags.push("training","trRank1","resilience");
	action.recMins = 60;
	action.flexibleTimes = true;
	return action;
}

	// Agility
window.createSystemEventAerobics = function(minutes,characters) {
	var sEvent = new systemEvent(minutes,characters,"aerobics","Aerobics",function(cList) {
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
				exp = charGetsExpRate(this.ongoingTime,character,"agility",expRate);
				eventMsg += createCharGotExpMessage(character,"agility",exp) + "\n";
				eventMsg += createCharSpentBarMessage(character,barType,barConsumption) + "\n";
			}
			eventMsg += tutorshipExtraExp(minutes,characters,"agility",expRate);
			eventMsg += sharedTrainingRelationshipEvents(characters);
			return eventMsg;
		}
	);
	sEvent.priority = 3;
	return sEvent;
}
window.createTrainingActionAerobics = function() {
	var action = new mapAction("aerobics","Aerobics",createSystemEventAerobics,false);
	action.description = "The characters will do aerobic execises to train their agility, consuming energy.";
	action.tags.push("training","trRank1","agility");
	action.recMins = 60;
	action.flexibleTimes = true;
	return action;
}

	// Physique
window.createSystemEventAnaerobics = function(minutes,characters) {
	var sEvent = new systemEvent(minutes,characters,"anaerobics","Anaerobics",function(cList) {
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
				exp = charGetsExpRate(this.ongoingTime,character,"physique",expRate);
				eventMsg += createCharGotExpMessage(character,"physique",exp) + "\n";
				eventMsg += createCharSpentBarMessage(character,barType,barConsumption) + "\n";
			}
			eventMsg += tutorshipExtraExp(minutes,characters,"physique",expRate);
			eventMsg += sharedTrainingRelationshipEvents(characters);
			return eventMsg;
		}
	);
	sEvent.priority = 3;
	return sEvent;
}
window.createTrainingActionAnaerobics = function() {
	var action = new mapAction("anaerobics","Anaerobics",createSystemEventAnaerobics,false);
	action.description = "The characters will do anaerobic execises to train their physique, consuming energy.";
	action.tags.push("training","trRank1","physique");
	action.recMins = 60;
	action.flexibleTimes = true;
	return action;
}

	// Will
window.createSystemEventMeditation = function(minutes,characters) {
	var sEvent = new systemEvent(minutes,characters,"meditation","Meditation",function(cList) {
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
				exp = charGetsExpRate(this.ongoingTime,character,"will",expRate);
				eventMsg += createCharGotExpMessage(character,"will",exp) + "\n";
				eventMsg += createCharSpentBarMessage(character,barType,barConsumption) + "\n";
			}
			eventMsg += tutorshipExtraExp(minutes,characters,"will",expRate);
			eventMsg += sharedTrainingRelationshipEvents(characters);
			return eventMsg;
		}
	);
	sEvent.priority = 3;
	return sEvent;
}
window.createTrainingActionMeditation = function() {
	var action = new mapAction("meditation","Meditation",createSystemEventMeditation,false);
	action.description = "The characters will look deep into every dimension of themselves, hardening in the face of adversity and training their will, consuming willpower.";
	action.tags.push("training","trRank1","will");
	action.recMins = 60;
	action.flexibleTimes = true;
	return action;
}

	// Intelligence
window.createSystemEventSpellcasting = function(minutes,characters) {
	var sEvent = new systemEvent(minutes,characters,"spellcasting","Spellcasting",function(cList) {
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
				exp = charGetsExpRate(this.ongoingTime,character,"intelligence",expRate);
				eventMsg += createCharGotExpMessage(character,"intelligence",exp) + "\n";
				eventMsg += createCharSpentBarMessage(character,barType,barConsumption) + "\n";
			}
			eventMsg += tutorshipExtraExp(minutes,characters,"intelligence",expRate);
			eventMsg += sharedTrainingRelationshipEvents(characters);
			return eventMsg;
		}
	);
	sEvent.priority = 3;
	return sEvent;
}
window.createTrainingActionSpellcasting = function() {
	var action = new mapAction("spellcasting","Spellcasting",createSystemEventSpellcasting,false);
	action.description = "The characters will practice different spells, training their intelligence, consuming willpower.";
	action.tags.push("training","trRank1","intelligence");
	action.recMins = 60;
	action.flexibleTimes = true;
	return action;
}

	// Perception
window.createSystemEventEnergyReading = function(minutes,characters) {
	var sEvent = new systemEvent(minutes,characters,"energyReading","Energy Reading",function(cList) {
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
				exp = charGetsExpRate(this.ongoingTime,character,"perception",expRate);
				eventMsg += createCharGotExpMessage(character,"perception",exp) + "\n";
				eventMsg += createCharSpentBarMessage(character,barType,barConsumption) + "\n";
			}
			eventMsg += tutorshipExtraExp(minutes,characters,"perception",expRate);
			eventMsg += sharedTrainingRelationshipEvents(characters);
			return eventMsg;
		}
	);
	sEvent.priority = 3;
	return sEvent;
}
window.createTrainingActionEnergyReading = function() {
	var action = new mapAction("energyReading","Energy Reading",createSystemEventEnergyReading,false);
	action.description = "The characters will train their perception by looking for different magical waves and streams, consuming willpower.";
	action.tags.push("training","trRank1","perception");
	action.recMins = 60;
	action.flexibleTimes = true;
	return action;
}

