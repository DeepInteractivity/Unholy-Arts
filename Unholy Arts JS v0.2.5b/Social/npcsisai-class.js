
////////// NPC-SIS-AI CLASS //////////

window.NpcSisAi = function(charKey) {
	this.charKey = charKey;
	this.type = "generic";
	
	this.getInterRoundBehavior = function(SIS) { // Character returns specific behavior to be executed between SIS rounds, such as
												 // leaving the SIS or making a proposal
												 // First parameter is the type of action, second parameter is the action's extra data
		return ["none",""];
	}
};

window.setCustomSisAi = function(charKey) {
	gC(charKey).sisAi.getInterRoundBehavior = function(SIS) {
		if ( SIS.roundsCount > 1 ) {
			//return ["leave",""];
			return ["dominantSex","chPlayerCharacter"];
		} else {
			gC(charKey).mapAi.type = "balancedTraining";
			gC(charKey).mapAi.createNewMission = cMissionBalancedRandomTrain;
			return ["none",""];
		}
	}
}

// Constructors, serializers, etc.
NpcSisAi.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
NpcSisAi.prototype.clone = function () {
	return (new NpcSisAi())._init(this);
};
NpcSisAi.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new NpcSisAi())._init($ReviveData$)', ownData);
};
