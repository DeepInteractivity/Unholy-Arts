////////// DIALOG CONTEXT //////////
// Dialog Context ( dialogContext or ctx) is a set of information provided by Scene to the Scene Dialog evaluation functions for these to understand
// the conditions under which they operate

window.sceneDialogContext = function(actorKey,actorAction,actorTargets,charsOnActor,actionsToActor) {
	this.actorKey = actorKey;
	this.actorAction = actorAction;
	this.actorTargets = actorTargets;
	this.charsOnActor = charsOnActor; // Characters whose actions are targetting the player
	this.actionsToActor = actionsToActor;
}

////////// SCENE DIALOG CLASS //////////
// Scene dialogs are stored in a list within a character object. They are an object that may chosen by the scene to make the character speak a line
// during the scene, provided its requirements are fulfilled, and it has enough weight to be randomly chosen.

window.SceneDialog = function() {
	this.requisites = [];
	this.preferences = new weightedList();
	this.baseWeight = 100;
	this.dialog = null; // Function that receives parameters and returns a custom dialog.
};
window.checkDialogRequisites = function(dialog,context) {
	var noWrongChecks = true;
	
	for ( var check of dialog.requisites ) {
		if ( noWrongChecks == true ) {
			noWrongChecks = check(context);
		}
	}
	
	return noWrongChecks; // noWrongChecks will remain true as long as all requisite checks pass.
}

window.createSDmasturbationLowLust = function() {
	var dl = new SceneDialog();
	dl.requisites.push(
		(function(ctx){ return State.variables.sc.sceneType == "ss"; }),									// Sex Scene
		(function(ctx){ return (gC(ctx.actorKey).lust.current) >= (gC(ctx.actorKey).lust.max * 0.7); }),	// Not too much lust lost
		(function(ctx){ return ctx.actorKey == ctx.actorTargets[0]; }),										// Character targetting self
		(function(ctx){ return gC(ctx.actorKey).hasFreeBodypart("mouth"); })								// Free mouth*/
		);
	dl.dialog = "Oh yes Im masturbating Im not a robot";
	
	return dl;
}
window.createSDmasturbationHighLust = function() {
	var dl = new SceneDialog();
	dl.requisites.push(
		(function(ctx){ return State.variables.sc.sceneType == "ss"; }),									// Sex Scene
		(function(ctx){ return (gC(ctx.actorKey).lust.current) <= (gC(ctx.actorKey).lust.max * 0.7); }),	// Not too much lust lost
		(function(ctx){ return ctx.actorKey == ctx.actorTargets[0]; }),										// Character targetting self
		(function(ctx){ return gC(ctx.actorKey).hasFreeBodypart("mouth"); })								// Free mouth
		);
	dl.dialog = "Oh YEEES YEEES Im masturbating Im not a robot";
	
	return dl;
}

// Constructors, serializers, etc.
SceneDialog.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

SceneDialog.prototype.clone = function () {
	return (new SceneDialog())._init(this);
};

SceneDialog.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new SceneDialog())._init($ReviveData$)', ownData);
};

