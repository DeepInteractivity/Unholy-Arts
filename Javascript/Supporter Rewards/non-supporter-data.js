///// Supporter tools data - Free version /////
// Creates pseudo-links to access supporter tools, except that they're locked
// In the supporter version file, these are real links

setup.quickstartLinkText = '<span style="color:firebrick">Locked: Get the Supporter Version on Patreon to access the Quickstart Menu.</span>';
setup.cheatMenuLinkText = '<span style="color:firebrick">Locked: Get the Supporter Version on Patreon to access the Cheat Menu.</span>';

window.SupToolsData = function() {
	
	this.quickstartRoomPassage = "";
	
	this.cheatMenuRoomPassage = "";
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

