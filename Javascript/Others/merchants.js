////////// MERCHANTS CLASS //////////
// Merchants database

// State.variables.currentMerchants = []; // This goes at StoryInit
// State.variables.enabledMerchants = []; // This goes at StoryInit

// Instance of a merchant object.

	// Constructor functions
window.Merchant = function(id,name,chance,getDescription,getSoldItems,charKey,getCut) {
	this.id = id; // Identifier of the object instance
	this.name = name; // Merchant's name
	this.chance = chance; // Probability out of 100 of the merchant appearing, if enabled
	this.getDescription = getDescription; // Function that returns a description of the merchant
	this.getSoldItems = getSoldItems; // Function that returns a list of the sold items' types' IDs
	this.charKey = charKey; // Associated simulated character, if any
	this.getCut = getCut; // Function that defines how much money this merchant makes on sale, if they're a simulated character
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

const merchantType = { // ID
	WEAPONS: 0,
	
	BONDAGE: 30,
	
	MONSTER_ACTIONS: 120
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
	},
	null, function() { // Get cut
		var cut = 0.3;
		return cut;
	});
	// Bondage
		// Nimeresh
setup.merchantDataList[merchantType.BONDAGE] = new Merchant(merchantType.BONDAGE,"Nimeresh, Toy maker",25,
	function() {
		var str = "";
		if ( State.variables.storyState < storyState.thirdLoop ) {
			str = "This Ashwalker clearly daydreams about her clients wearing her toys. She'll eagerly invite you to try them on.";
		} else {
			str = "This Ashwalker clearly daydreams about her clients wearing her toys. She'll eagerly invite you to try them on.";
		}
		return str;
	},
	function() {
		var itemsList = ["b0","b1","b2","b3","b4","b5","b6"]; //[0,1,2,3,4,5,6];
		if ( gSettings().chastity == "enable" ) {
			itemsList.push("b7");//(7);
			itemsList.push("b8");//(8);
		}
		return itemsList;
	},
	"chNim", function() { // Get cut
		var cut = 0.2;
		return cut;
	});
	// Monster actions
		// Artume
setup.merchantDataList[merchantType.MONSTER_ACTIONS] = new Merchant(merchantType.MONSTER_ACTIONS,"Artume, Monster Adept",15,
	function() {
		var str = "This student of monster magic will help you learn certain spells.";
		return str;
	},
	function() { // Fake
		var itemsList = ["w0","w1","w2","w3"]; //[100,101,102,103];
		return itemsList;
	}, // Artume sells no items
	"chArt", function() { // Get cut
		var cut = 0.2;
		return cut;
	});
setup.merchantDataList[merchantType.MONSTER_ACTIONS].displaySpecialMerchandise = function(buyer) { // For human players
	var str = "";
	var buyer = "chPlayerCharacter";
	var cut = setup.merchantDataList[merchantType.MONSTER_ACTIONS].getCut();
	for ( var pao of 
	[pActOption.HYPNOSIS_TIER_1,pActOption.DRAINING_TIER_1,pActOption.BONDAGE_TIER_1]
	) {
		var pad = setup.purActionList[pao];
		if ( pad.conditionsToShow(buyer) ) {
			var conditions = "allActionsLearned"; // "allActionsLearned" / "notEnoughMoney" / "availableToBuy"
			for ( var sa of pad.sceneActionsList ) {
				if ( gC(buyer).getSaList().includes(sa) == false ) {
					conditions = "availableToBuy";
				}
			}
			if ( conditions == "availableToBuy" ) {
				if ( gC(buyer).money < pad.price ) {
					conditions = "notEnoughMoney";
				}
			}
			if ( conditions == "availableToBuy" ) { // Actions might be bought
 				str += "- " + pad.name + getTextWithTooltip("^^(?)^^",pad.description) + " - Cost: " + pad.price
					 + " - <<l" + "ink [[Purchase|Personal Room]]>><<s" + "cript>>"
	  				 + "charBuysActionSet('" + pao + "','chPlayerCharacter','chArt',0.2);\n"
					 + "<</s" + "cript>><</l" + "ink>>" + "\n";
			} else if ( conditions == "allActionsLearned" ) { // Actions are already learned
				str += "- " + pad.name + getTextWithTooltip("^^(?)^^",pad.description) + " - " + colorText("Already learned.","cyan") + "\n";
			} else if ( conditions == "notEnoughMoney" ) { // Too expensive
				str += "- " + pad.name + getTextWithTooltip("^^(?)^^",pad.description) + " - " + colorText("Cost: " + pad.price + " - Not enough money.","red") + "\n";
			}
		}
	}
	return str;
}
setup.merchantDataList[merchantType.MONSTER_ACTIONS].offerSpecialMerchandise = function(buyer) { // Options for NPCs
	var actionSets = [];
	for ( var pase of [pActOption.HYPNOSIS_TIER_1,pActOption.DRAINING_TIER_1,pActOption.BONDAGE_TIER_1] ) {
		if ( setup.purActionList[pase].conditionsToShow(buyer) ) {
			actionSets.push(pase);
		}
	}
	return actionSets;
}

window.getMerchantDataByID = function(id) {
	var data = setup.merchantDataList[id]
	return data;
}

window.isSpecialMerchant = function(type) { // Tells the merchant screen menu that the selected merchant does not sell items, and has a special function to display merchandise
	var isSpecial = false;
	if ( [merchantType.MONSTER_ACTIONS].contains(type) ) {
		isSpecial = true;
	}
	return isSpecial;
}
window.getActionsMerchantsIDs = function() {
	var list = [merchantType.MONSTER_ACTIONS];
	return list;
}



