////////// PURCHASABLE ACTION CLASS //////////
// Formatted data for options to buy actions from merchants

	// Constructor functions
window.purAction = function(key,name,description,sceneActionsList,socialActionsList,price,tags,conditionsToShow,npcValuesSet,getMerchantID) {
	this.key = key;
	this.name = name;
	this.description = description;
	this.sceneActionsList = sceneActionsList;
	this.socialActionsList = socialActionsList;
	this.price = price;
	this.tags = tags;
	this.conditionsToShow = conditionsToShow;
	this.npcValuesSet = npcValuesSet;
	this.getMerchantID = getMerchantID;
}

const pActOption = {
	HYPNOSIS_TIER_1: "pa0",
	DRAINING_TIER_1: "pa1",
	BONDAGE_TIER_1: "pa2"
}
setup.purActionList = [];
setup.purActionList[pActOption.HYPNOSIS_TIER_1] = new purAction(pActOption.HYPNOSIS_TIER_1,"Basic hypnosis actions",
"Actions for combat, sex and conversation involving hypnosis.\nMostly dependent on charisma, and also will.",
["realHypnoticGlance","baHypnoticGlance"],["hypnoticGlance"],5000,
["hypnosis","social"],
function(buyer) { // Conditions to show
	var flagShow = false;
	if ( getActiveSimulationCharactersArray().includes("chArt") == false ) {
		flagShow = true;
	} else {
		if ( gC("chArt").getSaList().includes("baHypnoticGlance") ) {
			flagShow = true;
		}
	}
	return flagShow;
},
function(cK) { // npcValuesSet
	var value = -5;
	var statsValue = 0;
	// "physique","agility","resilience","will","intelligence","perception","empathy","charisma","luck"
	var statValMults = [-25,-25,-25,58,-25,-25,-25,116,-25];
	var i = 0;
	for ( var st of getStatNamesArray() ) {
		statsValue += gC(cK)[st].value * statValMults[i];
		i++;
	}
	statsValue *= ( 1 / getCharsAverageStat(cK) );
	value += statsValue;
	value = generalPasEvaluations(pActOption.HYPNOSIS_TIER_1,value,cK);
	return value;
},
function() {
	return merchantType.MONSTER_ACTIONS;
}	);
setup.purActionList[pActOption.DRAINING_TIER_1] = new purAction(pActOption.DRAINING_TIER_1,"Basic draining actions",
"Actions for combat and sex involving draining.\nDependent on agility and empathy.",
["energyDrainingKiss","baDrainingKiss","baEnergyDrainingKiss"],[],5000,
["draining","physical"],
function(buyer) { // Conditions to show
	var flagShow = false;
	if ( getActiveSimulationCharactersArray().includes("chArt") == false ) {
		flagShow = true;
	} else {
		if ( gC("chArt").getSaList().includes("baDrainingKiss") ) {
			flagShow = true;
		}
	}
	return flagShow;
},
function(cK) { // npcValuesSet
	var value = -5;
	var statsValue = 0;
	// "physique","agility","resilience","will","intelligence","perception","empathy","charisma","luck"
	var statValMults = [-25,87,-25,-25,-25,-25,87,-25,-25];
	var i = 0;
	for ( var st of getStatNamesArray() ) {
		statsValue += gC(cK)[st].value * statValMults[i];
		i++;
	}
	statsValue *= ( 1 / getCharsAverageStat(cK) );
	value += statsValue;
	value = generalPasEvaluations(pActOption.DRAINING_TIER_1,value,cK);
	return value;
},
function() {
	return merchantType.MONSTER_ACTIONS;
}	 );
setup.purActionList[pActOption.BONDAGE_TIER_1] = new purAction(pActOption.BONDAGE_TIER_1,"Basic bondage actions",
"Actions for combat and sex involving aetherial bondage.\nMostly dependent on intelligence, and also will.",
["etherealChains","baEtherealChains"],[],5000,
["bondage","magical"],
function(buyer) { // Conditions to show
	var flagShow = false;
	if ( getActiveSimulationCharactersArray().includes("chArt") == false ) {
		flagShow = true;
	} else {
		if ( gC("chArt").getSaList().includes("etherealChains") ) {
			flagShow = true;
		}
	}
	return flagShow;
},
function(cK) { // npcValuesSet
	var value = -5;
	var statsValue = 0;
	// "physique","agility","resilience","will","intelligence","perception","empathy","charisma","luck"
	var statValMults = [-25,-25,-25,58,116,-25,-25,-25,-25];
	var i = 0;
	for ( var st of getStatNamesArray() ) {
		statsValue += gC(cK)[st].value * statValMults[i];
		i++;
	}
	statsValue *= ( 1 / getCharsAverageStat(cK) );
	value += statsValue;
	value = generalPasEvaluations(pActOption.BONDAGE_TIER_1,value,cK);
	return value;
},
function() {
	return merchantType.MONSTER_ACTIONS;
}	 );



window.doesCharMissActionsFromSet = function(cK,actionSetId) {
	var missAny = false;
	var sceneActions = setup.purActionList[actionSetId].sceneActionsList;
	var sisInteractions = setup.purActionList[actionSetId].socialActionsList;
	for ( var sa of sceneActions ) {
		if ( gC(cK).getSaList().includes(sa) == false ) {
			missAny = true;
		}
	}
	for ( var si of sisInteractions ) {
		if ( gC(cK).extraSocIntList.includes(si) ) {
			missAny = true;
		}
	}
	return missAny;
}
window.charBuysActionSet = function(actionSetId,buyer,merchant,cut) {
	var pad = setup.purActionList[actionSetId];
	gC(buyer).money -= pad.price;
	charactersLearnSceneActions([buyer],pad.sceneActionsList);
	charactersLearnSocIntActions([buyer],pad.socialActionsList);
	if ( merchant ) { // merchant isn't null
		if ( gC(merchant) != undefined ) { // merchant refers to an actual simulated character
			gC(merchant).money += pad.price * cut;
		}
	}
}
window.generalPasEvaluations = function(actionSetId,currentValue,buyer) {
	var newValue = currentValue;
	var pas = setup.purActionList[actionSetId];
	for ( var tag of pas.tags ) {
		if ( ["bondage","draining","bondage"].includes(tag) ) {
			if ( gC(buyer).tastes[tag].r == 1 ) {
				newValue += 10;
			} else if ( gC(buyer).tastes[tag].r == 2 ) {
				newValue += 40;
			}
		}
		switch (tag) {
			case "physical":
				if ( buyer == "chNash" || buyer == "chClaw" ) {
					newValue += 10;
				}
				break;
			case "magical":
				if ( buyer == "chAte" ) {
					newValue += 5;
				}
				break;
			case "social":
				if ( buyer == "chClaw" ) {
					newValue -= 25;
				} else if ( buyer == "chVal" ) {
					newValue += 5;
				}
				break;
			case "hypnosis":
				break;
			case "draining":
				break;
			case "bondage":
				if ( buyer == "chVal" ) {
					newValue -= 25;
				} else if ( State.variables.eventsCalendar.playedStoryEvents.includes("BAw0") && buyer == "chMir" ) {
					newValue += 5;
				}
				break;
		}
	}
	return newValue;
}












