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
	this.generateDescription = function(actor,target,battleWeight,infamyMultiplier) {
		return "noDescription";
	}
	this.provokeEffect = function(actor,target,battleWeight,infamyMultiplier) {
		return 1;
	}
	this.resultMessage = function(actor,target,battleWeight,infamyMultiplier) {
		return "noResultMessage";
	}
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
	bDemand.generateDescription = function(actor,target,battleWeight,infamyMultiplier) {
		return "noDescription";
	}
	bDemand.provokeEffect = function(actor,target,battleWeight,infamyMultiplier) {
		// Infamy
		var infamyChange = -1;
		gC(actor).changeInfamy(infamyChange);
		return 1;
	}
	bDemand.resultMessage = function(actor,target,battleWeight,infamyMultiplier) {
		var infamyChange = 1;
		var msg = "In an act of generosity, " + gC(actor).getFormattedName() + " has refused to demand anything.\n"
				+ gC(actor).getFormattedName() + " lost " + infamyChange.toFixed(1) + " infamy.";
		return msg;
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
	bDemand.generateDescription = function(actor,target,battleWeight,infamyMultiplier) {
		return "noDescription";
	}
	bDemand.provokeEffect = function(actor,target,battleWeight,infamyMultiplier) {
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
	bDemand.resultMessage = function(actor,target,battleWeight,infamyMultiplier) {
		var meritTaken = 2 * battleWeight;
		var dominationApplied = 50 * battleWeight;
		var rivalryApplied = 35 * battleWeight;
		var msg = randomFromList( [
					(gC(actor).getFormattedName() + " made " + gC(target).getFormattedName() + " kneel on the ground and admit " + gC(target).posPr + " loss."),
					(gC(actor).getFormattedName() + " mocked " + gC(target).getFormattedName() + " and laughed at " + gC(target).posPr + " sad position."),
					(gC(actor).getFormattedName() + " made " + gC(target).getFormattedName() + " say that " + gC(target).perPr + " will be more obedient in the future.") ])
				+ "\n " + gC(actor).getFormattedName() + " took " + meritTaken.toFixed(1) + " merit from " + gC(target).getFormattedName() + ".\n"
				+ gC(actor).getFormattedName() + "'s domination towards " + gC(target).getFormattedName() + " has grown.\n"
				+ "The rivalry between " + gC(actor).getFormattedName() + " and " + gC(target).getFormattedName() + " has grown.";
		return msg;
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
	bDemand.generateDescription = function(actor,target,battleWeight,infamyMultiplier) {
		return "noDescription";
	}
	bDemand.provokeEffect = function(actor,target,battleWeight,infamyMultiplier) {
		// Infamy
		gC(actor).changeInfamy(this.calculateInfamy(actor,target,battleWeight,infamyMultiplier));
		// Special relationship
		createRelTypeServitudeDom(actor,target,3);
		createRelTypeServitudeSub(target,actor,3);
		return 1;
	}
	bDemand.resultMessage = function(actor,target,battleWeight,infamyMultiplier) {
		var infamy = this.calculateInfamy(actor,target,battleWeight,infamyMultiplier);
		var days = 3;
		
		var msg = gC(actor).getFormattedName() + " will force " + gC(target).getFormattedName() + " to be " + gC(actor).posPr + " servant for " + days +" days.\n"
				+ gC(actor).getFormattedName() + " will get " + infamy.toFixed(1) + " infamy.";
		return msg;
	}
	
	return bDemand;
}

State.variables.battleDemandsDB = [
	// Do nothing
	createBdemandDoNothing(),
	// Humilliate
	createBdemandHumillitation(),
	// Demand sex
	// Force relationship
	createBdemandForceServitude()
];

window.formatBattleDemandButtons = function(target,stakes,infamyMultiplier) {
	var bText = "";
	var i = 0;
	for ( var bDemand of State.variables.battleDemandsDB ) {
		if ( bDemand.isPossible("chPlayerCharacter",target,stakes) ) {
			bText += "<<l" + "ink [[" + bDemand.title + "|Scene Results]]>><<s" + "cript>>\n";
			bText += "State.variables.battleDemandsDB[" + i + "].provokeEffect('chPlayerCharacter','" + target + "'," + stakes + "," + infamyMultiplier + ");\n";
			bText += "formatGenericBattlePlayerChoice(State.variables.battleDemandsDB[" + i + "].resultMessage('chPlayerCharacter','" + target + "'," + stakes + "," + infamyMultiplier + "));\n";
			bText += "<</s" + "cript>><</l" + "ink>>" + bDemand.subtitle + "\n";
		}
		i++;
	}
	return bText;
}


