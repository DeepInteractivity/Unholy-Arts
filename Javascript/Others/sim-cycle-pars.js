////////// SIMULATION CYCLE PARAMETERS CLASS  //////////
// Global simulation parameters

window.SimCycPar = function() {
	this.templeDayPeriod = "training"; // "training" or "socialization"
	
	this.templeTrainingHours = 5;
	this.templeWorkHours = 5;
	this.templeSocializationHours = 5;
	this.templeNewDayTime = 7;
	
	this.trainingResultsBase = 1.0;
	this.trainingResultsModifier = 1.0;
	this.trainingCostBase = 1.0;
	this.trainingCostModifier = 1.0;
	this.restingResultsBase = 1.0;
	this.restingResultsModifier = 1.0;
};

State.variables.simCycPar = new SimCycPar();

window.trainingResultsVar = function() {
	// Returns a float that is to be multiplied by training returns
	var result = State.variables.simCycPar.trainingResultsBase * State.variables.simCycPar.trainingResultsModifier;
	return result;
}
window.trainingCostVar = function() {
	// Returns a float that is to be multiplied by training costs
	var result = State.variables.simCycPar.trainingCostBase * State.variables.simCycPar.trainingCostModifier;
	return result;
}
window.restingResultsVar = function() {
	// Returns a float that is to be multiplied by training returns
	var result = State.variables.simCycPar.restingResultsBase * State.variables.simCycPar.restingResultsModifier;
	return result;
}

// Constructors, serializers, etc.
SimCycPar.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
SimCycPar.prototype.clone = function () {
	return (new SimCycPar())._init(this);
};
SimCycPar.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new SimCycPar())._init($ReviveData$)', ownData);
};

