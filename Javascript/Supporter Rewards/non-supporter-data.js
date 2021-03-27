///// Supporter tools data - Free version /////
// Creates pseudo-links to access supporter tools, except that they're locked
// In the supporter version file, these are real links

window.SupToolsData = function() {
	this.quickstartLinkText = '<span style="color:firebrick">Locked: You can access the Quickstart Menu on the supporter version.</span>';
	this.cheatMenuLinkText = '<span style="color:firebrick">Locked: You can access the Cheat Menu on the supporter version.</span>';
	
	this.quickstartRoomPassage = "";
	this.formatQuickstartRoom = function() {
		this.quickstartRoomPassage = "How did you get here lmao";
	}
	
	this.cheatMenuRoomPassage = "";
	this.formatCheatMenuRoom = function() {
		this.cheatMenuRoomPassage = "How did you get here lmao";
	}
}

State.variables.supToolsData = new SupToolsData();

// Constructors, serializers, etc.
SupToolsData.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
SupToolsData.prototype.clone = function () {
	return (new SupToolsData())._init(this);
};
SupToolsData.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new SupToolsData())._init($ReviveData$)', ownData);
};

