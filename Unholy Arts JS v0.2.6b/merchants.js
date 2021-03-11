////////// MERCHANTS CLASS //////////
// Merchants database

// State.variables.currentMerchants = []; // This goes at StoryInit
// State.variables.enabledMerchants = []; // This goes at StoryInit

// Instance of a merchant object.

	// Constructor functions
window.Merchant = function(id,name,chance,getDescription,getSoldItems) {
	this.id = id; // Identifier of the object instance
	this.name = name; // Merchant's name
	this.chance = chance; // Probability out of 100 of the merchant appearing, if enabled
	this.getDescription = getDescription; // Function that returns a description of the merchant
	this.getSoldItems = getSoldItems; // Function that returns a list of the sold items' types' IDs
}

// Constructors, serializers, etc.
Merchant.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
Merchant.prototype.clone = function () {
	return (new Merchant())._init(this);
};
Merchant.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Merchant())._init($ReviveData$)', ownData);
};

// MERCHANT DATA

const merchantType = {
	WEAPONS: 0,
	
	BONDAGE: 30,
}

setup.merchantDataList = []; // Merchants' data. currentMerchants refers to the merchants located here.
	// Weapons
		// Abibdill
setup.merchantDataList[merchantType.WEAPONS] = new Merchant(merchantType.WEAPONS,"Abibdill, Weaponsmith",15,
	function() {
		var str = "An Ashwalker of relaxed, yet confident expressions. Upon noticing that you're considering buying his weapons, he'll slash the air with them as an exhibition.";
		return str;
	},
	function() {
		var itemsList = ["w0","w1","w2","w3"]; //[100,101,102,103];
		return itemsList;
	});
	// Bondage
		// Nereshesh
setup.merchantDataList[merchantType.BONDAGE] = new Merchant(merchantType.BONDAGE,"Nerishesh, Toy maker",25,
	function() {
		var str = "This Ashwalker clearly daydreams about her clients wearing her toys. She'll eagerly invite you to try them on.";
		return str;
	},
	function() {
		var itemsList = ["b0","b1","b2","b3","b4","b5","b6"]; //[0,1,2,3,4,5,6];
		if ( gSettings().chastity == "enable" ) {
			itemsList.push("b7");//(7);
			itemsList.push("b8");//(8);
		}
		return itemsList;
	});

window.getMerchantDataByID = function(id) {
	var data = setup.merchantDataList[id]
	return data;
}



