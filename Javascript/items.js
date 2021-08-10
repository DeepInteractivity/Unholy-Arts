////////// EQUIPMENT CLASS //////////
// Equipment database

// State.variables.equipmentList = []; // This goes at StoryInit

// Instance of an equipment object. May be weapons, armor, accesories or bondage

	// Constructor functions
window.Equipment = function(id,type,owner) {
	this.id = id; // Identifier of the object instance
	this.type = type; // Selected through an enum, links to the identifier of the object type
	this.days = -2; // Remaining days. -2 means it is not equipped, -1 means it may always be unlocked, >0 means the remaining days until it gets unlocked
	this.owner = owner; // Equipment's owner's charKey
	this.equippedOn = null; // Who's wearing the equipment
}
	// Use this to create equipment
window.createEquipment = function(type,owner) {
	var id = State.variables.equipmentList.length;
	State.variables.equipmentList.push(new Equipment(id,type,owner));
	gC(owner).ownedEquipment.push(id);
	return id;
}

	// Getters
window.getEquipById = function(id) {
	var equip = null;
	for ( var eq of State.variables.equipmentList ) {
		if ( eq.id == id ) {
			equip = eq;
			return equip;
		}
	}
	return equip;
}
window.getEquipDataById = function(id) {
	var data = null;
	var eq = getEquipById(id);
	if ( eq != null ) { data = setup.equipDataList[eq.type]; }
	return data;
}

window.getItemDescriptionById = function(id) {
	var tText = '<span title="' + getEquipDataById(id).description + '">^^(?)^^</span>';
	return tText;
}
window.getItemDescriptionBySetupId = function(id) {
	var tText = '<span title="' + setup.equipDataList[id].description + '">^^(?)^^</span>';
	return tText;
}

	// Basic functions
window.mayEquipmentBePut = function(id,wearer) {
	var flagEquippable = true;
	var equipment = getEquipById(id);
	var data = getEquipDataById(id);
	if ( equipment.equippedOn != null ) {
		flagEquippable = false;
	} else if ( data.slotType == "bodypart" ) {
		if ( gC(wearer).body.hasOwnProperty(data.slot) == false ) {
			flagEquippable = false;
		} else {
			if ( gC(wearer).body[data.slot].state != "free" || gC(wearer).body[data.slot].bondage != -1 ) {
				flagEquippable = false;
			}
		}
	} else if ( data.slotType == "tool" ) {
		if ( data.slot == "weapon" ) {
			if ( gC(wearer).weaponID != -1 ) {
				flagEquippable = false;
			}
		}
	}
	return flagEquippable;
}
window.equipObjectOnWearer = function(id,wearer,days) {
	var equipment = getEquipById(id);
	if ( equipment != null ) {
		equipment.equippedOn = wearer;
		equipment.days = days;
		var data = getEquipDataById(id);
		if ( data.slotType == "bodypart" ) { // Bondage
			gC(wearer).body[data.slot].bondage = id;
			gC(wearer).body[data.slot].state = "locked";
		} else if ( data.slotType == "tool" ) { // Tools
			if ( data.slot == "weapon" ) {
				gC(wearer).weaponID = id;
			}
		}
		data.putOnEffect(equipment.owner,wearer); // Main effects
		charactersLearnSceneActions([wearer],data.learntActions);
		
		// Bondage taste chance
		if ( equipment.owner != wearer ) {
			if ( limitedRandomInt(100) > 50 ) {
				gC(equipment.owner).tastes.bondage.w += limitedRandomInt(4);
			}
			if ( limitedRandomInt(100) > 50 ) {
				gC(wearer).tastes.bondage.w += limitedRandomInt(4);
			}
		}
	}
}
window.unequipObject = function(id) {
	var equipment = getEquipById(id);
	if ( equipment != null ) {
		if ( equipment.equippedOn != null ) {
			equipment.days = -2;
			var data = getEquipDataById(id);
			if ( data.slotType == "bodypart" ) {
				gC(equipment.equippedOn).body[data.slot].bondage = -1;
				gC(equipment.equippedOn).body[data.slot].state = "free";
			} else if ( data.slotType == "tool" ) {
				if ( data.slot == "weapon" ) {
					gC(equipment.equippedOn).weaponID = -1;
				}
			}
			data.putOutEffect(equipment.owner,equipment.equippedOn);
			charactersForgetSceneActions([equipment.equippedOn],data.learntActions);
			equipment.equippedOn = null;
		}
	}
}

window.charBuysItem = function(charKey,equipType) {
	var equipData = setup.equipDataList[equipType];
	gC(charKey).money -= equipData.price;
	var id = createEquipment(equipType,charKey);
	return id;
}
window.itemIsLost = function(id) {
	var owner = getEquipById(id).owner;
	gC(owner).ownedEquipment = arrayMinusA(gC(owner).ownedEquipment,id);
	getEquipById(id).owner = null;
}
window.removeItem = function(id) {
	unequipObject(id);
	itemIsLost(id);
	for ( var eId in State.variables.equipmentList ) {
		var intId = State.variables.equipmentList[parseInt(eId)].id;
		if ( intId >= id ) {
			lowerItemIdByOne(intId);
		}
	}
	removeLostItems();
}
window.lowerItemIdByOne = function(id) {
	var item = getEquipById(id);
	var itemData = getEquipDataById(id);
	item.id--;
	if ( item.equippedOn ) {
		if ( itemData.slotType == "bodypart" ) {
			gC(item.equippedOn).body[itemData.slot].bondage--;
		} else if ( itemData.slotType == "tool" ) {
			if ( itemData.slot == "weapon" ) {
				gC(item.equippedOn).weaponID--;
			}
		}
	}
}
window.removeLostItems = function() {
	var newItemsList = [];
	for ( var item of State.variables.equipmentList ) {
		if ( item.owner != null ) {
			newItemsList.push(item);
		}
	}
	State.variables.equipmentList = newItemsList;
}

// Constructors, serializers, etc.
Equipment.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
Equipment.prototype.clone = function () {
	return (new Equipment())._init(this);
};
Equipment.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Equipment())._init($ReviveData$)', ownData);
};

// EQUIPMENT DATA

window.equipmentData = function(name,slotType,slot,putOnEffect,putOutEffect,description,price,infamy,strategyTags,learntActions) {
	this.name = name;
	this.slotType = slotType;
	this.slot = slot;
	this.putOnEffect = putOnEffect;
	this.putOutEffect = putOutEffect;
	this.learntActions = [];
	this.description = description;
	this.price = price;
	this.infamy = infamy;
	this.strategyTags = strategyTags;
	this.learntActions = learntActions;
}

/*
Strategy tags - Bondage
["bondage","attackMagic","chastity"]
Strategy tags - Weapons
[["physique",1],["resilience",1]]
[FIRST VALUE = Type of tag, SECOND VALUE = Quality of tag]
*/

const equipmentType = {
	COLLAR: "b0",
	BLINDFOLD: "b1",
	MOUTHGAG: "b2",
	HANDCUFFS: "b3",
	FEETCUFFS: "b4",
	NIPPLESUCKERS: "b5",
	BUTTPLUG: "b6",
	CHASTITYBELT: "b7",
	CHASTITYCAGE: "b8",
	
	STAFFOFBATTLE: "w0",
	KNUCKLES: "w1",
	WAND: "w2",
	HANDFAN: "w3"
}
/*const equipmentType = {
	COLLAR: 0,
	BLINDFOLD: 1,
	MOUTHGAG: 2,
	HANDCUFFS: 3,
	FEETCUFFS: 4,
	NIPPLESUCKERS: 5,
	BUTTPLUG: 6,
	CHASTITYBELT: 7,
	CHASTITYCAGE: 8,
	
	STAFFOFBATTLE: 100,
	KNUCKLES: 101,
	WAND: 102,
	HANDFAN: 103
}
*/

setup.equipDataList = [];
	// Bondage
setup.equipDataList[equipmentType.COLLAR] = new equipmentData("Collar","bodypart","neck",
	function(owner,wearer) { // Put on
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod += 3;
			getRelation(wearer,owner).sexualTension.levelMod += 1;
		}
		gC(wearer).will.sumModifier -= 2;
		gC(wearer).will.multModifier -= 0.1;
		gC(wearer).charisma.sumModifier -= 2;
		gC(wearer).charisma.multModifier -= 0.1;
	},
	function(owner,wearer) { // Put out
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod -= 3;
			getRelation(wearer,owner).sexualTension.levelMod -= 1;
		}
		gC(wearer).will.sumModifier += 2;
		gC(wearer).will.multModifier += 0.1;
		gC(wearer).charisma.sumModifier += 2;
		gC(wearer).charisma.multModifier += 0.1;
	}, "A leather collar. It gets locked in the neck to mark possession over the wearer."
		+ "\nIncreases submission and sexual tension, decreases will and charisma. Locks neck.\n1 infamy upon forced equipment.",
	750,1,["bondage","domination"],[]);
setup.equipDataList[equipmentType.BLINDFOLD] = new equipmentData("Blindfold","bodypart","eyes",
	function(owner,wearer) { // Put on
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod += 2;
			getRelation(wearer,owner).rivalry.levelMod += 1;
		}
		gC(wearer).perception.sumModifier -= 5;
		gC(wearer).perception.multModifier -= 0.4;
		gC(wearer).empathy.sumModifier -= 2;
		gC(wearer).empathy.multModifier -= 0.1;
	},
	function(owner,wearer) { // Put out
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod -= 2;
			getRelation(wearer,owner).rivalry.levelMod -= 1;
		}
		gC(wearer).perception.sumModifier += 5;
		gC(wearer).perception.multModifier += 0.4;
		gC(wearer).empathy.sumModifier += 2;
		gC(wearer).empathy.multModifier += 0.1;
	}, "A linen blindfold. It gets locked eyes of the wearer, difficulting vision."
		+ "\nIncreases submission, rivalry and enmity, decreases perception and empathy. Locks eyes.\n2 infamy upon forced equipment.",
	1500,2,["bondage"],[]);
setup.equipDataList[equipmentType.MOUTHGAG] = new equipmentData("Mouth gag","bodypart","mouth",
	function(owner,wearer) { // Put on
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod += 2;
			getRelation(wearer,owner).rivalry.levelMod += 1;
		}
		gC(wearer).charisma.sumModifier -= 5;
		gC(wearer).charisma.multModifier -= 0.4;
	},
	function(owner,wearer) { // Put out
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod -= 2;
			getRelation(wearer,owner).rivalry.levelMod -= 1;		
		}
		gC(wearer).charisma.sumModifier += 5;
		gC(wearer).charisma.multModifier += 0.4;
	}, "A leather mouth gag. It blocks the mouth of the wearer, difficulting communication."
		+ "\nIncreases submission, rivalry and enmity, decreases charisma. Locks mouth.\n2 infamy upon forced equipment.",
	1500,2,["bondage","attackSocial"],[]);
setup.equipDataList[equipmentType.HANDCUFFS] = new equipmentData("Handcuffs","bodypart","arms",
	function(owner,wearer) { // Put on
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod += 3;
			getRelation(wearer,owner).rivalry.levelMod += 1;
			getRelation(wearer,owner).enmity.levelMod += 1;
		}
		gC(wearer).agility.sumModifier -= 3;
		gC(wearer).agility.multModifier -= 0.3;
		gC(wearer).physique.sumModifier -= 3;
		gC(wearer).physique.multModifier -= 0.3;
	},
	function(owner,wearer) { // Put out
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod -= 3;
			getRelation(wearer,owner).rivalry.levelMod -= 1;
			getRelation(wearer,owner).enmity.levelMod -= 1;
		}
		gC(wearer).agility.sumModifier += 3;
		gC(wearer).agility.multModifier += 0.3;
		gC(wearer).physique.sumModifier += 3;
		gC(wearer).physique.multModifier += 0.3;
	}, "Leather handcuffs, which difficult the movement of the wearer's arms."
		+ "\nIncreases submission, rivalry and enmity, decreases agility and physique. Locks arms.\n3 infamy upon forced equipment.",
	2000,3,["bondage","attackPhysical"],[]);
setup.equipDataList[equipmentType.FEETCUFFS] = new equipmentData("Feetcuffs","bodypart","legs",
	function(owner,wearer) { // Put on
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod += 3;
			getRelation(wearer,owner).rivalry.levelMod += 1;
			getRelation(wearer,owner).enmity.levelMod += 1;
		}
		gC(wearer).agility.sumModifier -= 2;
		gC(wearer).agility.multModifier -= 0.2;
		gC(wearer).resilience.sumModifier -= 3;
		gC(wearer).resilience.multModifier -= 0.3;
	},
	function(owner,wearer) { // Put out
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod -= 3;
			getRelation(wearer,owner).rivalry.levelMod -= 1;
			getRelation(wearer,owner).enmity.levelMod -= 1;
		}
		gC(wearer).agility.sumModifier += 2;
		gC(wearer).agility.multModifier += 0.2;
		gC(wearer).resilience.sumModifier += 3;
		gC(wearer).resilience.multModifier += 0.3;
	}, "Leather feetcuffs, which difficult the movement of the wearer's legs."
		+ "\nIncreases submission, rivalry and enmity, decreases agility and resilience. Locks legs.\n3 infamy upon forced equipment.",
	2000,3,["bondage","attackPhysical"],[]);
setup.equipDataList[equipmentType.NIPPLESUCKERS] = new equipmentData("Nipple suckers","bodypart","breasts",
	function(owner,wearer) { // Put on
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod += 2;
			getRelation(wearer,owner).sexualTension.levelMod += 2;
			getRelation(wearer,owner).rivalry.levelMod += 1;
		}
		gC(wearer).lust.weakness += 10;
		gC(wearer).alteredStates.push(createASnipplesuckers());
	},
	function(owner,wearer) { // Put out
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod -= 2;
			getRelation(wearer,owner).sexualTension.levelMod -= 2;
			getRelation(wearer,owner).rivalry.levelMod -= 1;
		}
		removeAlteredStateByAcr(wearer,"Npsk");
		gC(wearer).lust.weakness -= 10;
	}, "A magical device that suctions the wearer's nipples."
		+ "\nIncreases submission, sexual tension and rivalry, as well as weakness to lust damage. Locks breasts.\n2 infamy upon forced equipment.",
	1500,2,["bondage","attackAll"],[]);
setup.equipDataList[equipmentType.BUTTPLUG] = new equipmentData("Buttplug","bodypart","anus",
	function(owner,wearer) { // Put on
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod += 2;
			getRelation(wearer,owner).sexualTension.levelMod += 2;
			getRelation(wearer,owner).rivalry.levelMod += 1;
		}
		gC(wearer).alteredStates.push(createASbuttplug());
		gC(wearer).lust.weakness += 10;
		gC(wearer).energy.tainted += 10;
	},
	function(owner,wearer) { // Put out
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod -= 2;
			getRelation(wearer,owner).sexualTension.levelMod -= 2;
			getRelation(wearer,owner).rivalry.levelMod -= 1;
		}
		removeAlteredStateByAcr(wearer,"Btpg");
		gC(wearer).lust.weakness -= 10;
		gC(wearer).energy.tainted -= 10;
	}, "A toy that gets locked in the ass."
		+ "\nIncreases submission, sexual tension and rivalry, as well as weakness to lust damage and tainting energy. Locks ass.\n2 infamy upon forced equipment.",
	2000,2,["bondage","attackAll"],[]);
setup.equipDataList[equipmentType.CHASTITYBELT] = new equipmentData("Chastity belt","bodypart","pussy",
	function(owner,wearer) { // Put on
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod += 4;
			getRelation(wearer,owner).sexualTension.levelMod += 4;
			getRelation(wearer,owner).rivalry.levelMod += 1;
			getRelation(wearer,owner).enmity.levelMod += 1;
		}
		gC(wearer).intelligence.sumModifier -= 2;
		gC(wearer).intelligence.multModifier -= 0.2;
		gC(wearer).will.sumModifier -= 2;
		gC(wearer).will.multModifier -= 0.2;
		gC(wearer).lust.weakness += 15;
		gC(wearer).willpower.weakness += 10;
		if ( limitedRandomInt(100) > 30 ) {
			gC(owner).tastes.denial.w += limitedRandomInt(5);
		}
		if ( limitedRandomInt(100) > 40 ) {
			gC(wearer).tastes.denial.w += limitedRandomInt(4);
		}
	},
	function(owner,wearer) { // Put out
		removeAlteredStateByAcrAndExtra(wearer,"UnBp","bodypart","pussy");
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod -= 4;
			getRelation(wearer,owner).sexualTension.levelMod -= 4;
			getRelation(wearer,owner).rivalry.levelMod -= 1;
			getRelation(wearer,owner).enmity.levelMod -= 1;
		}
		gC(wearer).intelligence.sumModifier += 2;
		gC(wearer).intelligence.multModifier += 0.2;
		gC(wearer).will.sumModifier += 2;
		gC(wearer).will.multModifier += 0.2;
		gC(wearer).lust.weakness -= 15;
		gC(wearer).willpower.weakness -= 10;		
	}, "A metal shield that locks the wearer's pussy. It may provoke sexual frustration."
		+ "\nIncreases submission, sexual tension, rivalry and enmity. Reduces intelligence and will, and increases weakness to lust and willpower damage. Locks pussy.\n3 infamy upon forced equipment.",
	2500,3,["bondage","attackMagic","chastity"],[]);
setup.equipDataList[equipmentType.CHASTITYCAGE] = new equipmentData("Chastity cage","bodypart","dick",
	function(owner,wearer) { // Put on
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod += 4;
			getRelation(wearer,owner).sexualTension.levelMod += 4;
			getRelation(wearer,owner).rivalry.levelMod += 1;
			getRelation(wearer,owner).enmity.levelMod += 1;
		}
		gC(wearer).intelligence.sumModifier -= 2;
		gC(wearer).intelligence.multModifier -= 0.2;
		gC(wearer).will.sumModifier -= 2;
		gC(wearer).will.multModifier -= 0.2;
		gC(wearer).lust.weakness += 15;
		gC(wearer).willpower.weakness += 10;
		if ( limitedRandomInt(100) > 30 ) {
			gC(owner).tastes.denial.w += limitedRandomInt(5);
		}
		if ( limitedRandomInt(100) > 40 ) {
			gC(wearer).tastes.denial.w += limitedRandomInt(4);
		}
	},
	function(owner,wearer) { // Put out
		removeAlteredStateByAcrAndExtra(wearer,"UnBp","bodypart","dick");
		if ( getRelation(wearer,owner) != undefined ) {
			getRelation(wearer,owner).submission.levelMod -= 4;
			getRelation(wearer,owner).sexualTension.levelMod -= 4;
			getRelation(wearer,owner).rivalry.levelMod -= 1;
			getRelation(wearer,owner).enmity.levelMod -= 1;
		}
		gC(wearer).intelligence.sumModifier += 2;
		gC(wearer).intelligence.multModifier += 0.2;
		gC(wearer).will.sumModifier += 2;
		gC(wearer).will.multModifier += 0.2;
		gC(wearer).lust.weakness -= 15;
		gC(wearer).willpower.weakness -= 10;	
	}, "A metal cage that locks the wearer's dick. It may provoke sexual frustration."
		+ "\nIncreases submission, sexual tension, rivalry and enmity. Reduces intelligence and will, and increases weakness to lust and willpower damage. Locks pussy.\n3 infamy upon forced equipment.",
	2500,3,["bondage","attackMagic","chastity"],[]);
	
	// Weapons
setup.equipDataList[equipmentType.STAFFOFBATTLE] = new equipmentData("Staff of battle","tool","weapon",
	function(owner,wearer) { // Put on
		gC(wearer).physique.sumModifier += 2;
		gC(wearer).physique.multModifier += 0.1;
		gC(wearer).resilience.sumModifier += 2;
		gC(wearer).resilience.multModifier += 0.1;
	},
	function(owner,wearer) { // Put out
		gC(wearer).physique.sumModifier -= 2;
		gC(wearer).physique.multModifier -= 0.1;
		gC(wearer).resilience.sumModifier -= 2;
		gC(wearer).resilience.multModifier -= 0.1;
	}, "A wooden staff, great for physical offense and defense."
		+ "\nIncreases physique and resilience.",
	2000,0,
	[["physique",1],["resilience",1]],["staffSwipe"]);
setup.equipDataList[equipmentType.KNUCKLES] = new equipmentData("Knuckles","tool","weapon",
	function(owner,wearer) { // Put on
		gC(wearer).physique.sumModifier += 2;
		gC(wearer).physique.multModifier += 0.1;
		gC(wearer).agility.sumModifier += 2;
		gC(wearer).agility.multModifier += 0.1;
	},
	function(owner,wearer) { // Put out
		gC(wearer).physique.sumModifier -= 2;
		gC(wearer).physique.multModifier -= 0.1;
		gC(wearer).agility.sumModifier -= 2;
		gC(wearer).agility.multModifier -= 0.1;
	}, "Brass knuckles that will make the user pack a punch."
		+ "\nIncreases physique and agility.",
	2000,0,
	[["physique",1],["agility",1]],["boldJab"]);
setup.equipDataList[equipmentType.WAND] = new equipmentData("Wand","tool","weapon",
	function(owner,wearer) { // Put on
		gC(wearer).intelligence.sumModifier += 2;
		gC(wearer).intelligence.multModifier += 0.1;
		gC(wearer).will.sumModifier += 2;
		gC(wearer).will.multModifier += 0.1;
	},
	function(owner,wearer) { // Put out
		gC(wearer).intelligence.sumModifier -= 2;
		gC(wearer).intelligence.multModifier -= 0.1;
		gC(wearer).will.sumModifier -= 2;
		gC(wearer).will.multModifier -= 0.1;
	}, "A magical wand, most useful to control the flow of aether."
		+ "\nIncreases intelligence and will.",
	2000,0,
	[["intelligence",1],["will",1]],["channelAether"]);
setup.equipDataList[equipmentType.HANDFAN] = new equipmentData("Hand fan","tool","weapon",
	function(owner,wearer) { // Put on
		gC(wearer).perception.sumModifier += 2;
		gC(wearer).perception.multModifier += 0.1;
		gC(wearer).charisma.sumModifier += 2;
		gC(wearer).charisma.multModifier += 0.1;
	},
	function(owner,wearer) { // Put out
		gC(wearer).perception.sumModifier -= 2;
		gC(wearer).perception.multModifier -= 0.1;
		gC(wearer).charisma.sumModifier -= 2;
		gC(wearer).charisma.multModifier -= 0.1;
	}, "A magical fan, favored by illusionists."
		+ "\nIncreases perception and charisma.",
	2000,0,
	[["perception",1],["charisma",1]],["flaunt"]);

// AI

window.npcValuesBondage = function(charKey,bondageId) {
	var value = 100;
	var bondageData = setup.equipDataList[bondageId];
	var bondageType = bondageData.slot;
	for ( var equipment of gC(charKey).ownedEquipment ) {
		var equipData = getEquipDataById(equipment);
		if ( equipData.slotType == "bodypart" ) {
			if ( equipData.slot == bondageType ) {
				if ( getEquipById(equipment).equippedOn == null ) {
					value -= 40;
				} else {
					value -= 20;
				}
			}
		}
		if ( bondageId == getEquipById(equipment).id ) {
			value -= 40;
		}
	}
	return value;
}
window.npcValuesWeapon = function(charKey,weaponData) {
	var value = 0;
	for ( var tag of weaponData.strategyTags ) {
		switch (tag[0]) {
			case "physique":
				value += gC(charKey).physique.value * tag[1];
				break;
			case "agility":
				value += gC(charKey).agility.value * tag[1];
				break;
			case "resilience":
				value += gC(charKey).resilience.value * tag[1];
				break;
			case "intelligence":
				value += gC(charKey).intelligence.value * tag[1];
				break;
			case "will":
				value += gC(charKey).will.value * tag[1];
				break;
			case "perception":
				value += gC(charKey).perception.value * tag[1];
				break;
			case "charisma":
				value += gC(charKey).charisma.value * tag[1];
				break;
			case "empathy":
				value += gC(charKey).empathy.value * tag[1];
				break;
			case "luck":
				value += gC(charKey).luck.value * tag[1];
				break;
		}
	}
	
	return value;
}
window.equipmentIsBondage = function(equipData) {
	if ( equipData.slotType == "bodypart" ) {
		return true;
	} else {
		return false;
	}
}
window.equipmentIsWeapon = function(equipData) {
	if ( equipData.slotType == "tool" && equipData.slot == "weapon" ) {
		return true;
	} else {
		return false;
	}
}

window.getCharsUnusedBondage = function(charKey) {
	var itemList = [];
	for ( var item of gC(charKey).ownedEquipment ) {
		if ( equipmentIsBondage(getEquipDataById(item)) ) {
			if ( getEquipById(item).equippedOn == null ) {
				itemList.push(item);
			}
		}
	}
	return itemList;
}
window.getItemListEquippableOnChar = function(charKey,itemList) {
	var newItemList = [];
	for ( var item of itemList ) {
		if ( mayEquipmentBePut(item,charKey) ) {
			newItemList.push(item);
		}
	}
	return newItemList;
}
window.purgeChastityItemsFromItemList = function(itemList) {
	var newItemList = [];
	for ( var item of itemList ) {
		var type = getEquipById(item).type;
		if ( type == equipmentType.CHASTITYBELT || type == equipmentType.CHASTITYCAGE ) {
		} else {
			newItemList.push(item);
		}
	}
	return newItemList;
}
window.getActorsEquippableBondageOnTarget = function(actor,target) {
	var bondageList = [];
	
	for ( var item of gC(actor).ownedEquipment ) {
		if ( equipmentIsBondage(item) && mayEquipmentBePut(item,target) ) {
			bondageList.push(target);
		}
	}
	
	return bondageList;
}

window.chooseBestBondageForTargetByActor = function(bondageIDsList,target,actor) {
	var chosenID = bondageIDsList[0];
	var bondageScores = [];
	
	var physicalScore = gC(target).physique.value + gC(target).agility.value + gC(target).resilience.value;
	var magicalScore = gC(target).intelligence.value + gC(target).will.value + gC(target).perception.value;
	var socialScore = (gC(target).charisma.value + gC(target).empathy.value) * 1.5;
	var totalScore = physicalScore + magicalScore + socialScore;
	
	for ( var bondage of bondageIDsList ) {
		var tags = getEquipDataById(bondage).strategyTags;
		var score = 0;
		
		// Stats score
		if ( tags.includes("attackPhysical") ) {
			score += physicalScore;
		} else if ( tags.includes("attackMagic") ) {
			score += magicalScore;
		} else if ( tags.includes("attackSocial") ) {
			score += socialScore;
		} else {
			score += totalScore * 0.4;
		}
		
		// Preferences score
		if ( tags.includes("chastity") ) {
			score += ( gC(actor).tastes.denial.r * 20 );
			score *= ( 1 + gC(actor).tastes.denial.r * 0.1 );
		}
		
		bondageScores.push(score);
	}
	
	// Find best score
	var bestIndex = bondageIDsList[0];
	var i = 0;
	var highestScore = -1;
	var diceScore = 0;
	for ( var score of bondageScores ) {
		diceScore = limitedRandomInt(score*score);
		if ( diceScore > highestScore ) {
			bestIndex = i;
			highestScore = diceScore; 
		}
		i++;
	}
	chosenID = bondageIDsList[bestIndex];
	
	return chosenID;
}
window.isSubOverDomsPowerThreshold = function(subChar,domChar) {
	// Dom's power threshold
	var domTs = 0.5;
	if ( getCharsDrivePercent(domChar,"dDomination") > 0.15 ) {
		domTs -= 0.05;
		if ( ( getCharsDrivePercent(domChar,"dDomination") > 0.2 ) ) {
			domTs -= 0.05;
		}
	}
	if ( getCharsDrivePercent(domChar,"dCooperation") > 0.15 ) {
		domTs += 0.05;
		if ( ( getCharsDrivePercent(domChar,"dCooperation") > 0.2 ) ) {
			domTs += 0.05;
		}
	}
	// Relative power threshold
	var totalRelation = rLvlAbt(domChar,subChar,"friendship") + rLvlAbt(domChar,subChar,"romance") + rLvlAbt(domChar,subChar,"sexualTension") + rLvlAbt(domChar,subChar,"domination") + rLvlAbt(domChar,subChar,"submission") + rLvlAbt(domChar,subChar,"enmity") + rLvlAbt(domChar,subChar,"rivalry");
	var relationModifier = ( rLvlAbt(domChar,subChar,"friendship") + rLvlAbt(domChar,subChar,"romance") - rLvlAbt(domChar,subChar,"sexualTension") - rLvlAbt(domChar,subChar,"rivalry") - rLvlAbt(domChar,subChar,"enmity") * 2 - rLvlAbt(domChar,subChar,"submission") + rLvlAbt(domChar,subChar,"domination") ) / ( totalRelation + 5 ) * 0.3;
	var totalPercentage = domTs + relationModifier; // Max ~= 0.9 , Min ~= 0.1
	totalPercentage -= (0.1 * gC(domChar).tastes.bondage.r);
	// Relationship type
	if ( gRelTypeAb(subChar,domChar).type == "tutorship" ) {
		totalPercentage += 0.2;
	}
	// Check if sub goes over the threshold
	var flag = false;
	if ( ( quantifyCharacterStats(subChar) / quantifyCharacterStats(domChar) ) > totalPercentage ) {
		flag = true;
	}
	
	return flag;
}

// Auxiliar

window.getActorsGenitalsLockedByTarget = function(actor,target) {
	var lockedGenitals = [];
	for ( var genital of ["pussy","dick"] ) {
		if ( gC(actor).body.hasOwnProperty(genital) ) {
			if ( gC(actor).body[genital].state == "locked" ) {
				if ( gC(actor).body[genital].bondage != -1 ) {
					if ( getEquipById(gC(actor).body[genital].bondage).owner == target ) {
						lockedGenitals.push(genital);
					}
				}
			}
		}
	}
	return lockedGenitals;
}
window.getActorsKeyholders = function(actor) {
	var keyholders = [];
	for ( var genital of ["pussy","dick"] ) {
		if ( gC(actor).body.hasOwnProperty(genital) ) {
			if ( gC(actor).body[genital].state == "locked" ) {
				if ( gC(actor).body[genital].bondage != -1 ) {
					keyholders.push(getEquipById(gC(actor).body[genital].bondage).owner);
				}
			}
		}
	}
	return keyholders;
}

