////////// RESOURCES MANAGEMENT //////////

// Images
window.imgList = function() {
	// Icons
	this.lust = "[img[img/lustIcon.png]]";
	this.willpower = "[img[img/willpowerIcon.png]]";
	this.energy = "[img[img/energyIcon.png]]";
	this.socialdrive = "[img[img/socialdriveIcon.png]]";
	// Social Icons
	this.friendly = "[img[img/socialIcons/friendlyIcon.png]]";
	this.intimate = "[img[img/socialIcons/intimateIcon.png]]";
	this.flirty = "[img[img/socialIcons/flirtyIcon.png]]";
	this.aroused = "[img[img/socialIcons/arousedIcon.png]]";
	this.dominant = "[img[img/socialIcons/dominantIcon.png]]";
	this.submissive = "[img[img/socialIcons/submissiveIcon.png]]";
	this.bored = "[img[img/socialIcons/boredIcon.png]]";
	this.angry = "[img[img/socialIcons/angryIcon.png]]";
};
window.img = function(imageKey) {
	return State.variables.imgList[imageKey];
};
setup.sillanFull = "[img[img/portraits/sillan-full.png]]"
setup.sillanAvatar = "[img[img/portraits/sillan-avatar.png]]";

window.getProvisionalSillanPortrait = function() {
	var porText = '<span style="color:aqua">???</span>\n';
				+ setup.sillanAvatar;
	return porText;
}

// Constructors, serializers, etc.
imgList.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

imgList.prototype.clone = function () {
	return (new imgList())._init(this);
};

imgList.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new imgList())._init($ReviveData$)', ownData);
};

