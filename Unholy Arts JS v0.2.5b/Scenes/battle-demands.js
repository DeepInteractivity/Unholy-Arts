////////// Battle demands //////////

	// Battle demand class
window.battleDemand = function(title) {
	this.title = title;
	this.subtitle = ""; // Additional explanation in the form of a tooltip
	
	this.isPossible = function(actor,target,battleWeight) {
		return false;
	}
	this.calculateInfamy = function(actor,target,battleWeight,infamyMultiplier ) {
		return 0;
	}
	this.generateDescription = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		return "noDescription";
	}
	this.provokeEffect = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		return 1;
	}
	this.resultMessage = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		return "noResultMessage";
	}
	this.getFormattedPlayerChoice = function(actor,target,stakes,infamyMultiplier,i) {
		var cText = "<<l" + "ink [[" + this.title + "|Scene Results]]>><<s" + "cript>>\n";
			cText += "setup.battleDemandsDB[" + i + "].provokeEffect('chPlayerCharacter','" + target + "'," + stakes + "," + infamyMultiplier + ",'','');\n";
			cText += "formatGenericBattlePlayerChoice(setup.battleDemandsDB[" + i + "].resultMessage('chPlayerCharacter','" + target + "'," + stakes + "," + infamyMultiplier + ",'',''),setup.battleDemandsDB[" + i + "].getPassageLink());\n";
			cText += "<</s" + "cript>><</l" + "ink>>" + this.subtitle + "\n";
		return cText;
	}
	this.getPassageLink = function() {
		return "Map";
	}

	this.generateChoicesValuesForNpcs = function(actor,target,battleWeight,infamyMultiplier) {
		var extra1 = "";
		var extra2 = "";
		return [getBattleDemandChoiceValueNpc(-10,this,extra1,extra2)];
	}
}

window.getBattleDemandChoiceValueNpc = function(decisionValue,choiceDemand,extra1,extra2) {
	return [decisionValue,choiceDemand,extra1,extra2];
}

// Battle demands specifics

// Constructors, serializers, etc.
battleDemand.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
battleDemand.prototype.clone = function () {
	return (new battleDemand())._init(this);
};
battleDemand.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new battleDemand())._init($ReviveData$)', ownData);
};

////////// Battle Demands Database //////////
window.createBdemandDoNothing = function() {
	var bDemand = new battleDemand("Do nothing");
	var tooltip = "Renounce to your right to demand anything out of this battle.";
	bDemand.subtitle += '<span title="' + tooltip + '">(?)</span>';

	bDemand.isPossible = function(actor,target,battleWeight) {
		var isPossible = true;
		return isPossible;
	}
	bDemand.calculateInfamy = function(actor,target,battleWeight,infamyMultiplier ) {
		var infamy = 0;
		return infamy;
	}
	bDemand.generateDescription = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		return "noDescription";
	}
	bDemand.provokeEffect = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		// Infamy
		var infamyChange = -1;
		gC(actor).changeInfamy(infamyChange);
		// Relation changes
		getRelation(target,actor).enmity.stv -= 25;
		return 1;
	}
	bDemand.resultMessage = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		var infamyChange = 1;
		var msg = "In an act of generosity, " + gC(actor).getFormattedName() + " has refused to demand anything.\n"
				+ gC(actor).getFormattedName() + " lost " + infamyChange.toFixed(1) + " infamy.\n"
				+ gC(target).getFormattedName() + "'s enmity towards " + gC(actor).getFormattedName() + " has slightly decreased.";
		return msg;
	}
	
	// Base value of 5
	bDemand.generateChoicesValuesForNpcs = function(actor,target,battleWeight,infamyMultiplier) {
		var extra1 = "";
		var extra2 = "";
		return [getBattleDemandChoiceValueNpc(-1,this,extra1,extra2)];
	}
	
	return bDemand;
}

window.createBdemandHumillitation = function() {
	var bDemand = new battleDemand("Humilliate");
	var tooltip = "Humilliating a character grants you merit taken from them, increases your domination towards them and increases your rivalry.";
	bDemand.subtitle += '<span title="' + tooltip + '">(?)</span>';

	bDemand.isPossible = function(actor,target,battleWeight) {
		var isPossible = false;
		// Minimum battle weight = 1
		if ( gC(actor).type == "candidate" && gC(target).type == "candidate" ) {
			isPossible = true;
		}
		return isPossible;
	}
	bDemand.calculateInfamy = function(actor,target,battleWeight,infamyMultiplier ) {
		var infamy = 0;
		return infamy;
	}
	bDemand.generateDescription = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		return "noDescription";
	}
	bDemand.provokeEffect = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		var meritTaken = 2 * battleWeight;
		var dominationApplied = 50 * battleWeight;
		var rivalryApplied = 35 * battleWeight;
		// Merit
		gC(actor).changeMerit(meritTaken);
		gC(target).changeMerit(-meritTaken);
		// Domination
		getRelation(actor,target).domination.stv += dominationApplied;
		getRelation(target,actor).submission.stv += dominationApplied;
		// Rivalry
		getRelation(actor,target).rivalry.stv += rivalryApplied;
		getRelation(target,actor).rivalry.stv += rivalryApplied;
		return 1;
	}
	bDemand.resultMessage = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		var meritTaken = 2 * battleWeight;
		var dominationApplied = 50 * battleWeight;
		var rivalryApplied = 35 * battleWeight;
		var msg = randomFromList( [
					(gC(actor).getFormattedName() + " made " + gC(target).getFormattedName() + " kneel on the ground and admit " + gC(target).posPr + " loss."),
					(gC(actor).getFormattedName() + " mocked " + gC(target).getFormattedName() + " and laughed at " + gC(target).posPr + " sad position."),
					(gC(actor).getFormattedName() + " made " + gC(target).getFormattedName() + " say that " + gC(target).perPr + " will be more obedient in the future.") ])
				+ "\n " + gC(actor).getFormattedName() + " took " + meritTaken.toFixed(1) + " merit from " + gC(target).getFormattedName() + ".\n"
				+ gC(actor).getFormattedName() + "'s domination towards " + gC(target).getFormattedName() + " has slightly grown.\n"
				+ "The rivalry between " + gC(actor).getFormattedName() + " and " + gC(target).getFormattedName() + " has slightly grown.";
		return msg;
	}
	
	bDemand.generateChoicesValuesForNpcs = function(actor,target,battleWeight,infamyMultiplier) {
		var extra1 = "";
		var extra2 = "";
		var infamyExcess = (this.calculateInfamy(actor,target,battleWeight,infamyMultiplier) + gC(actor).infamy - getCharsInfamyLimit(actor));
		if ( infamyExcess < 0 ) { infamyExcess = 0; }
		var relationFactor = rLvlAbt(actor,target,"rivalry") * 3 + rLvlAbt(actor,target,"enmity") * 3 - rLvlAbt(actor,target,"friendship") - rLvlAbt(actor,target,"romance") * 2 + rLvlAbt(actor,target,"submission") * 2;
		var meritDifference = gC(target).merit - gC(actor).merit;
		if ( meritDifference < 0 ) { meritDifference = 0; }
		else if ( meritDifference > 10 ) { meritDifference = 10; }
		var drivesFactor = gC(actor).dAmbition.level * 0.5;
		var value = limitedRandomInt(2) + relationFactor - infamyExcess + meritDifference + drivesFactor;
		return [getBattleDemandChoiceValueNpc(value,this,extra1,extra2)];
	}
	
	return bDemand;
}

window.createBdemandForceSex = function() {
	var bDemand = new battleDemand("Demand sex");
	var tooltip = "Enforces sex with the defeated character, with the victor as the locked leading character.";
	bDemand.subtitle += '<span title="' + tooltip + '">(?)</span>';

	bDemand.isPossible = function(actor,target,battleWeight) {
		var isPossible = false;
		if ( battleWeight >= 2 && gSettings().battleDefeatSex == "enable" ) {
			isPossible = true;
		}
		return isPossible;
	}
	bDemand.calculateInfamy = function(actor,target,battleWeight,infamyMultiplier) {
		var infamy = 3 * infamyMultiplier;
		return infamy;
	}
	bDemand.generateDescription = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		return "noDescription";
	}
	bDemand.provokeEffect = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		// Infamy
		gC(actor).changeInfamy(this.calculateInfamy(actor,target,battleWeight,infamyMultiplier))
		// Domination
		getRelation(actor,target).domination.stv += 10;
		getRelation(target,actor).submission.stv += 10;
		// Sexual tension
		getRelation(target,actor).sexualTension.stv += 10;
		// Rivalry
		getRelation(target,actor).rivalry.stv += 10;
		// Dominant sex event - Dismantle groups , event, scene, sceneConsequences, chPlayerCharacter check
		for ( var charParticipant of [actor,target] ) {
			for ( var charFollower of gC(charParticipant).followedBy ) {
				charUnfollowsChar(charFollower,charParticipant);
			}
		}
		State.variables.compass.characterEventEndsPrematurely(target);
		State.variables.compass.characterEventEndsPrematurely(actor);
		eventToPile(createSystemEventDominantSexEffects([actor,target]));
		return 1;
	}
	bDemand.resultMessage = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		var infamy = this.calculateInfamy(actor,target,battleWeight,infamyMultiplier);
		var days = 3;
		
		var msg = gC(actor).getFormattedName() + " will take " + gC(target).getFormattedName() + " away to ravish " + gC(actor).comPr + ".\n"
				+ gC(actor).getFormattedName() + " will get " + infamy.toFixed(1) + " infamy.\n"
				+ gC(target).getFormattedName() + "'s submission, sexual tension and rivalry towards " + gC(actor).getFormattedName() + " have slightly increased.";
		return msg;
	}
	bDemand.getPassageLink = function() {
		return "Scene";
	}
	
	bDemand.generateChoicesValuesForNpcs = function(actor,target,battleWeight,infamyMultiplier) {
		var extra1 = "";
		var extra2 = "";
		var infamyExcess = (this.calculateInfamy(actor,target,battleWeight,infamyMultiplier) + gC(actor).infamy - getCharsInfamyLimit(actor));
		if ( infamyExcess < 0 ) { infamyExcess = 0; }
		var relationFactor = rLvlAbt(actor,target,"sexualTension") * 3 + rLvlAbt(actor,target,"rivalry") * 2 + rLvlAbt(actor,target,"submission") - rLvlAbt(actor,target,"friendship") * 1 - rLvlAbt(actor,target,"romance") * 1;
		var drivesFactor = gC(actor).dPleasure.level * 2;
		if ( getCharsDrivePercent(actor,"dPleasure") < 0.1 ) { drivesFactor = -25; }
		var value = limitedRandomInt(4) + relationFactor - infamyExcess + drivesFactor;
		return [getBattleDemandChoiceValueNpc(value,this,extra1,extra2)];
	}
	
	return bDemand;
}

window.createBdemandForceServitude = function() {
	var bDemand = new battleDemand("Force servitude");
	var tooltip = "Enforces a temporary servitude relationship with the loser as your servant. Large infamy gain.";
	bDemand.subtitle += '<span title="' + tooltip + '">(?)</span>';

	bDemand.isPossible = function(actor,target,battleWeight) {
		var isPossible = false;
		if ( gC(actor).type == "candidate" && gC(target).type == "candidate" && battleWeight >= 3 && gSettings().servitudeRelationships == "enable" ) {
			if ( gC(actor).domChar == null && gC(target).domChar == null && gC(target).subChars.length < 1 ) {
				isPossible = true;
			}
		}
		return isPossible;
	}
	bDemand.calculateInfamy = function(actor,target,battleWeight,infamyMultiplier) {
		var infamy = 10 * infamyMultiplier;
		return infamy;
	}
	bDemand.generateDescription = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		return "noDescription";
	}
	bDemand.provokeEffect = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		// Infamy
		gC(actor).changeInfamy(this.calculateInfamy(actor,target,battleWeight,infamyMultiplier));
		// Domination
		getRelation(actor,target).domination.stv += 10;
		getRelation(target,actor).submission.stv += 10;
		// Rivalry
		getRelation(target,actor).rivalry.stv += 20;
		// Enmity
		getRelation(target,actor).enmity.stv += 20;
		// Special relationship
		createRelTypeServitudeDom(actor,target,3);
		createRelTypeServitudeSub(target,actor,3);
		return 1;
	}
	bDemand.resultMessage = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		var infamy = this.calculateInfamy(actor,target,battleWeight,infamyMultiplier);
		var days = 3;
		
		var msg = gC(actor).getFormattedName() + " will force " + gC(target).getFormattedName() + " to be " + gC(actor).posPr + " servant for " + days +" days.\n"
				+ gC(actor).getFormattedName() + " will get " + infamy.toFixed(1) + " infamy."
				+ gC(target).getFormattedName() + "'s submission, rivalry and enmity towards " + gC(actor).getFormattedName() + " have slightly increased.";
		return msg;
	}
	
	bDemand.generateChoicesValuesForNpcs = function(actor,target,battleWeight,infamyMultiplier) {
		var extra1 = "";
		var extra2 = "";
		var infamyExcess = (this.calculateInfamy(actor,target,battleWeight,infamyMultiplier) + gC(actor).infamy - getCharsInfamyLimit(actor));
		if ( infamyExcess < 0 ) { infamyExcess = 0; }
		var relationFactor = 4 + rLvlAbt(actor,target,"sexualTension") * 2 + rLvlAbt(actor,target,"rivalry") * 1 + rLvlAbt(actor,target,"enmity") * 2 - rLvlAbt(actor,target,"friendship") * 2 - rLvlAbt(actor,target,"romance") * 1;
		var meritDifference = gC(target).merit - gC(actor).merit;
		if ( meritDifference < 0 ) { meritDifference = 0; }
		else if ( meritDifference > 10 ) { meritDifference = 10; }
		var drivesFactor = gC(actor).dDomination.level * 1.5 + gC(actor).dAmbition.level * 0.5;
		if ( getCharsDrivePercent(actor,"dCooperation") > 0.25 ) { drivesFactor = -25; }
		var value = limitedRandomInt(4) + relationFactor - infamyExcess + meritDifference;
		return [getBattleDemandChoiceValueNpc(value,this,extra1,extra2)];
	}
	
	return bDemand;
}

window.createBdemandForceLiberation = function() {
	var bDemand = new battleDemand("Force liberation");
	var tooltip = "Enforces the liberation of a character subjugated by the target. Moderate infamy loss.";
	bDemand.subtitle += '<span title="' + tooltip + '">(?)</span>';
	
	// extra1 = Character to be liberated
	
	bDemand.isPossible = function(actor,target,battleWeight) {
		var isPossible = false;
		if ( gC(actor).type == "candidate" && gC(target).type == "candidate" && battleWeight >= 2 && gSettings().servitudeRelationships == "enable" ) {
			if ( gC(target).subChars.length > 0 ) {
				for ( var subChar of gC(target).subChars ) {
					if ( gC(target).relations[subChar].relType.type == "servitude" ) {
						isPossible = true;
					}
				}
			}
		}
		return isPossible;
	}
	bDemand.calculateInfamy = function(actor,target,battleWeight,infamyMultiplier) {
		var infamy = -5 * infamyMultiplier;
		return infamy;
	}
	bDemand.generateDescription = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		return "noDescription";
	}
	bDemand.provokeEffect = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		// Infamy
		gC(actor).changeInfamy(this.calculateInfamy(actor,target,battleWeight,infamyMultiplier));
		// Rivalry
		getRelation(target,actor).rivalry.stv += 25;
		// Friendship
		getRelation(extra1,actor).friendship.stv += 100;
		// Romance
		getRelation(extra1,actor).friendship.stv += 100;
		// Terminate special relationship
		finishRelType(target,extra1);		
		return 1;
	}
	bDemand.resultMessage = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		var infamy = this.calculateInfamy(actor,target,battleWeight,infamyMultiplier);
		var days = 3;
		var msg = gC(actor).getFormattedName() + " will liberate " + gC(extra1).getFormattedName() + " from " + gC(target).getFormattedName() + ".\n"
				+ gC(actor).getFormattedName() + " will lose " + -infamy.toFixed(1) + " infamy."
				+ gC(target).getFormattedName() + "'s rivalry towards " + gC(actor).getFormattedName() + " has slightly increased.\n"
				+ gC(extra1).getFormattedName() + "'s friendship and romance towards " + gC(actor).getFormattedName() + " have increased.\n";
		return msg;
	}
	bDemand.getFormattedPlayerChoice = function(actor,target,stakes,infamyMultiplier,i) {
		var cText = "";
		for ( var subChar of gC(target).subChars ) {
			if ( gC(target).relations[subChar].relType.type == "servitude" ) {
				cText += "<<l" + "ink [[" + this.title + " of " + gC(subChar).getName() + "|Scene Results]]>><<s" + "cript>>\n"
					   + "setup.battleDemandsDB[" + i + "].provokeEffect('chPlayerCharacter','" + target + "'," + stakes + "," + infamyMultiplier + ",'" + subChar + "','');\n"
					   + "formatGenericBattlePlayerChoice(setup.battleDemandsDB[" + i + "].resultMessage('chPlayerCharacter','" + target + "'," + stakes + "," + infamyMultiplier + ",'" + subChar + "',''),setup.battleDemandsDB[" + i + "].getPassageLink());\n"
					   + "<</s" + "cript>><</l" + "ink>>" + this.subtitle + "\n";
			}
		}
		return cText;
	}
	
	bDemand.generateChoicesValuesForNpcs = function(actor,target,battleWeight,infamyMultiplier) {
		var choicesList = [];
		for ( var subChar of gC(target).subChars ) {
			if ( gC(target).relations[subChar].relType.type == "servitude" ) {
				var extra1 = subChar;
				var extra2 = "";
				var infamyExcess = gC(actor).infamy * 0.5;
				if ( infamyExcess < 0 ) { infamyExcess = 0; }
				var relationFactor = 3 + rLvlAbt(actor,subChar,"friendship") * 1 + rLvlAbt(actor,subChar,"romance") * 3 - rLvlAbt(actor,subChar,"rivalry") * 2 - rLvlAbt(actor,subChar,"enmity") * 3;
				var drivesFactor = gC(actor).dCooperation.level * 2;
				var value = limitedRandomInt(5) + relationFactor - infamyExcess + drivesFactor;
				
				if ( choicesList.length == 0 ) { choicesList = [getBattleDemandChoiceValueNpc(value,this,extra1,extra2)]; }
				else { choiceslist = choicesList.concat([getBattleDemandChoiceValueNpc(value,this,extra1,extra2)]); }
			}
		}
		return choicesList;
	}
	
	return bDemand;
}

window.createBdemandStealServant = function() {
	var bDemand = new battleDemand("Steal servant");
	var tooltip = "Steals the servant of your opponent. Large infamy gain.";
	bDemand.subtitle += '<span title="' + tooltip + '">(?)</span>';
	
	// extra1 = Character to be stolen
	
	bDemand.isPossible = function(actor,target,battleWeight) {
		var isPossible = false;
		if ( gC(actor).type == "candidate" && gC(target).type == "candidate" && battleWeight >= 3 && gSettings().servitudeRelationships == "enable" && gSettings().stealingServitudeAllowed == "enable" ) {
			if ( gC(target).subChars.length > 0 ) {
				for ( var subChar of gC(target).subChars ) {
					if ( gC(target).relations[subChar].relType.type == "servitude" ) {
						isPossible = true;
					}
				}
			}
		}
		return isPossible;
	}
	bDemand.calculateInfamy = function(actor,target,battleWeight,infamyMultiplier) {
		var infamy = 10 * infamyMultiplier;
		return infamy;
	}
	bDemand.generateDescription = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		return "noDescription";
	}
	bDemand.provokeEffect = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		// Infamy
		gC(actor).changeInfamy(this.calculateInfamy(actor,target,battleWeight,infamyMultiplier));
		// Domination
		getRelation(actor,extra1).domination.stv += 25;
		getRelation(extra1,actor).submission.stv += 25;
		// Enmity
		getRelation(extra1,actor).enmity.stv += 25;
		// Rivalry
		getRelation(target,actor).rivalry.stv += 50;
		// Terminate special relationship
		finishRelType(target,extra1);		
		// Create new servitude relationship
		createRelTypeServitudeDom(actor,extra1,3);
		createRelTypeServitudeSub(extra1,actor,3);
		return 1;
	}
	bDemand.resultMessage = function(actor,target,battleWeight,infamyMultiplier,extra1,extra2) {
		var infamy = this.calculateInfamy(actor,target,battleWeight,infamyMultiplier);
		var days = 3;
		
		var msg = gC(actor).getFormattedName() + " will steal " + gC(extra1).getFormattedName() + " from " + gC(target).getFormattedName() + ", forcing servitude upon " + gC(extra1).comPr + " for " + days + " days.\n"
				+ gC(actor).getFormattedName() + " will gain " + infamy.toFixed(1) + " infamy.\n"
				+ gC(extra1).getFormattedName() + "'s submission and enmity towards " + gC(actor).getFormattedName() + " have slightly increased.\n"
				+ gC(target).getFormattedName() + "'s rivalry towards " + gC(actor).getFormattedName() + " has increased.\n";
				
		return msg;
	}
	bDemand.getFormattedPlayerChoice = function(actor,target,stakes,infamyMultiplier,i) {
		var cText = "";
		for ( var subChar of gC(target).subChars ) {
			if ( gC(target).relations[subChar].relType.type == "servitude" ) {
				cText += "<<l" + "ink [[" + this.title + " (" + gC(subChar).getName() + ")|Scene Results]]>><<s" + "cript>>\n"
					   + "setup.battleDemandsDB[" + i + "].provokeEffect('chPlayerCharacter','" + target + "'," + stakes + "," + infamyMultiplier + ",'" + subChar + "','');\n"
					   + "formatGenericBattlePlayerChoice(setup.battleDemandsDB[" + i + "].resultMessage('chPlayerCharacter','" + target + "'," + stakes + "," + infamyMultiplier + ",'" + subChar + "',''),setup.battleDemandsDB[" + i + "].getPassageLink());\n"
					   + "<</s" + "cript>><</l" + "ink>>" + this.subtitle + "\n";
			}
		}
		return cText;
	}
	
	bDemand.generateChoicesValuesForNpcs = function(actor,target,battleWeight,infamyMultiplier) {
		var choicesList = [];
		for ( var subChar of gC(target).subChars ) {
			if ( gC(target).relations[subChar].relType.type == "servitude" ) {
				var extra1 = subChar;
				var extra2 = "";
				var infamyExcess = (this.calculateInfamy(actor,target,battleWeight,infamyMultiplier) + gC(actor).infamy - getCharsInfamyLimit(actor));
				if ( infamyExcess < 0 ) { infamyExcess = 0; }
				var relationFactor = 3 + rLvlAbt(actor,subChar,"sexualTension") * 2 + rLvlAbt(actor,subChar,"rivalry") * 1 + rLvlAbt(actor,subChar,"enmity") * 2 - rLvlAbt(actor,subChar,"friendship") * 2 - rLvlAbt(actor,subChar,"romance") * 1;
				var drivesFactor = gC(actor).dDomination.level * 1.5 + gC(actor).dAmbition.level * 1;
				if ( getCharsDrivePercent(actor,"dCooperation") > 0.25 ) { drivesFactor = -25; }
				var value = limitedRandomInt(5) + relationFactor - infamyExcess;
				
				if ( choicesList.length == 0 ) { choicesList = [getBattleDemandChoiceValueNpc(value,this,extra1,extra2)]; }
				else { choiceslist = choicesList.concat([getBattleDemandChoiceValueNpc(value,this,extra1,extra2)]); }
			}
		}
		return choicesList;
	}	
	
	return bDemand;
}


// State.variables.battleDemandsDB = [
setup.battleDemandsDB = [
	// Do nothing
	createBdemandDoNothing(),
	// Humilliate
	createBdemandHumillitation(),
	// Demand sex
	createBdemandForceSex(),
	// Force relationship
	createBdemandForceServitude(),
	// Force liberation
	createBdemandForceLiberation(),
	// Steal servitude
	createBdemandStealServant()
];

window.formatBattleDemandButtons = function(target,stakes,infamyMultiplier) {
	var bText = "";
	var i = 0;
	for ( var bDemand of setup.battleDemandsDB ) {
		if ( bDemand.isPossible("chPlayerCharacter",target,stakes) ) {
			bText += setup.battleDemandsDB[i].getFormattedPlayerChoice("chPlayerCharacter",target,stakes,infamyMultiplier,i);
			//this.getFormattedPlayerChoice = function(actor,target,stakes,infamyMultiplier,i)
			/*
			bText += "<<l" + "ink [[" + bDemand.title + "|Scene Results]]>><<s" + "cript>>\n";
			bText += "setup.battleDemandsDB[" + i + "].provokeEffect('chPlayerCharacter','" + target + "'," + stakes + "," + infamyMultiplier + ");\n";
			bText += "formatGenericBattlePlayerChoice(setup.battleDemandsDB[" + i + "].resultMessage('chPlayerCharacter','" + target + "'," + stakes + "," + infamyMultiplier + ",extra1,extra2),setup.battleDemandsDB[" + i + "].getPassageLink());\n";
			bText += "<</s" + "cript>><</l" + "ink>>" + bDemand.subtitle + "\n";
			*/
		}
		i++;
	}
	return bText;
}


