////////// COMMON FUNCTIONS //////////

// Math
window.float2int = function(value) {
    return value | 0;
}
window.limitedRandom = function(limit) { // Returns a random float ranging between 0 and limit
	return Math.random() * limit;
}

window.limitedRandomInt = function(limit) { // Returns a random ranging between 0 and limit.
	limit += 0.99;
	return window.float2int(window.limitedRandom(limit));
}

// Programming logic
window.shuffleArray = function(array) {
	var newArray = [];
	var pos = 0;
	
	while(array.length > 0) {
		pos = limitedRandomInt(array.length - 1);
		newArray.push(array[pos]);
		array.splice(pos,1);
	}
	
	return newArray;
}

window.arrayMinusA = function(array,a) {
	//State.variables.log += " : First array : " + array + " , Second Array : ";
	var newArray = [];
	var a2 = "" + a;
	
	for ( var b of array ) {
		var b2 = "" + b;
		if ( b2 !== a2 ) {
			newArray.push(b);
		}
		else {
		}
	}
	//State.variables.log += newArray + " ";
	return newArray;
}
window.removeDuplicatesFromList = function(array) {
	var newArray = [];
	for ( var obj of array ) {
		if ( newArray.includes(obj) == false ) {
			newArray.push(obj);
		}
	}
	return newArray;
}

window.randomFromList = function(list) {
	if ( list.length > 1 ) {
		var randomPosition = limitedRandomInt(list.length-1);
	} else { 
		var randomPosition = 0;
	}
	return list[randomPosition];
}

// Text
window.firstToCap = function(string) { // Returns a string similar to input with a capitalized first character
	var nString = string[0].toUpperCase() + string.slice(1);
	return nString;
}
window.ftc = function(string) { // firstToCap abbreviation
	return firstToCap(string);
}

window.ktn = function(charKey) { // Returns the stdName of a character given its char key
	return getChar(charKey).stdName();
}

window.dickWord = function() {
	return randomFromList(["dick","dick","dick","dick","dick","cock","cock","cock","prick","shaft","member","penis"]);
}
window.pussyWord = function() {
	return randomFromList(["pussy","pussy","pussy","pussy","pussy","cherry","cherry","snatch","clam","kitty"]);
}
window.boobsWord = function() {
	return randomFromList(["breasts","breasts","breasts","breasts","chest","chest","bosom","bust"]);
}
window.assWord = function() {
	return randomFromList(["ass","ass","ass","butt","butt","bottom","rear"]);
}

window.colorText = function(text,color) {
	var newText = '<span style="color:' + color + '">';
	newText += text;
	newText += '</' + 'span>';
	// <span style="color:lightcoral">Lust:</span>, khaki, purple, darkred, lightcoral
	return newText;
}
window.textLustDamage = function(damage) {
	return colorText((damage.toFixed(2) + " lust damage"),"lightcoral");
}
window.textWillpowerDamage = function(damage) {
	return colorText((damage.toFixed(2) + " willpower damage"),"darkslateblue");
}
window.textEnergyDamage = function(damage) {
	return colorText((damage.toFixed(2) + " energy damage"),"limegreen");
}
window.textSocialdriveDamage = function(damage) {
	return colorText((damage.toFixed(2) + " social drive damage"),"khaki");
}

window.textWillpowerPoints = function(damage) {
	return colorText((damage.toFixed(2) + " willpower points"),"darkslateblue");
}
window.textEnergyPoints = function(damage) {
	return colorText((damage.toFixed(2) + " energy points"),"limegreen");
}
window.textSocialdrivePoints = function(damage) {
	return colorText((damage.toFixed(2) + " social drive points"),"khaki");
}

window.getBarName = function(barType) {
	var text = "";
	if ( barType == "socialdrive" ) {
		text = "Social Drive";
	} else {
		text += firstToCap(barType); 
	}
	return text;
}

State.variables.customRoomIntro = "";
window.setRoomIntro = function(mapName,roomName) {
	//var room = State.variables[mapName].rooms[roomName];
	var intro = "<div class='standardBox'>__" + setup[mapName][roomName].title + "__";
	if ( setup[mapName][roomName].getDescription() != "" ) {
		intro += "\n" + setup[mapName][roomName].getDescription();
	}
	intro += '</div>';
	State.variables.customRoomIntro = intro;
}

// Engine
window.getChar = function(charKey) {
	return State.variables[charKey];
}
window.gC = function(charKey) { // getChar shortcut
	return getChar(charKey);
}

window.gCstat = function(charKey,stat) {
	return getChar(charKey)[stat].getValue();
}

window.getCharList = function(charKeysList) {
	var charList = [];
	for (var key in charKeysList) {
		charList.push(getChar(charKeysList[key]));
	}
	return charList;
}

window.getCharNames = function(charKeysList) {
	var text = "";
	var i = 0;
	for ( var charKey in charKeysList ) {
		text += gC(charKeysList[charKey]).getFormattedName();
		i++;
		if ( charKeysList.length == i ) {
			//text += ".";
		}
		else if ( i == charKeysList.length - 1 ) {
			text += " and ";
		}
		else if ( i < charKeysList.length ) {
			text += ", ";
		}
	}
	return text;
}

window.stringArrayToText = function(stringArray) {
	var text = "";
	var i = stringArray.length;
	for ( var str of stringArray ) {
		text += str;
		if ( i > 2 ) { text += ", "; }
		else if ( i > 1 ) { text += " and " }
		i--;
	}
	return text;
}
window.stringArrayToTextMinusAnd = function(stringArray) {
	var text = "";
	var i = 0;
	for ( var str of stringArray ) {
		if ( i > 0 ) { text += ","; }
		text += str;
		i++;
	}
	return text;
}

window.addToStVarsList = function(v) {
	if ( State.variables.StVarsList.includes(v) == false ) {
		State.variables.StVarsList.push(v);
	}
}

config.saves.isAllowed = function () {
	if (tags().contains("saveAllowed")) {
		return true;
	}
	return false;
};

// Chars

	// Characters active for purposes of the simulation
	// These characters will get their stats, bars and relations updated at the end of each day, for instance
State.variables.activeSimulationCharacters = ["chPlayerCharacter","chVal","chNash","chClaw","chAte","chMir"];
window.getActiveSimulationCharactersArray = function() {
	var actSimChars = [];
	for ( var ch of State.variables.activeSimulationCharacters ) {
		actSimChars.push(ch);
	}
	return actSimChars;
}
window.getRandomizedActiveSimulationCharactersArray = function() {
	var actSimChars = getActiveSimulationCharactersArray();
	return shuffleArray(actSimChars);
}
window.getCandidatesKeysArray = function() {
	return ["chPlayerCharacter","chVal","chNash","chClaw","chAte","chMir"];
}
window.getRandomizedCandidatesKeysArray = function() {
	return shuffleArray(getCandidatesKeysArray());
}

window.getCharacterStatScore = function(character) {
	var score = gC(character).physique.value + gC(character).agility.value + gC(character).resilience.value + gC(character).will.value
			  + gC(character).intelligence.value + gC(character).perception.value + gC(character).charisma.value + gC(character).empathy.value
			  + gC(character).luck.value;
}

// Stats

window.addLuckFactor = function(baseValue,factor,luck) { // Applies an extra percent to baseValue depending on factor and luck
	var finalValue = baseValue * (1+factor*(limitedRandom(1.0)*(100-luck) + luck)/100);
	return finalValue;
}
window.luckedDiceThrow = function(luck) { // 100-sides dice throw, accounting for character's luck
	var result = (luck + limitedRandomInt(100-luck)) * 0.01;
	return result;
}

window.getStatNamesArray = function() {
	return ["physique","agility","resilience","will","intelligence","perception","empathy","charisma","luck"];
}
window.getRelationshipStatsNamesArray = function() {
	return [ "friendship" , "romance" , "sexualTension" , "submission" , "domination" , "rivalry" , "enmity" ];
}

window.getRandomStat = function() {
	return randomFromList(["physique","agility","resilience","will","intelligence","perception","empathy","charisma","luck"]);
}

window.getPhysiqueDescription = function() {
	var desc = "The capacity of a character to exert physical strength. Used for many physical activities and taxing sexual actions. "
			 + "Raises lust and energy.";
	return desc;
}
window.getAgilityDescription = function() {
	var desc = "The ability of a character to execute tasks that require precision. Used for many sexual actions, and often used to evade physical attacks. "
			 + "Raises lust and energy.";
	return desc;
}
window.getResilienceDescription = function() {
	var desc = "The capacity of a character to resist exhausting physical work and hits. Most commonly used to resist physical attacks and intense sexual pleasure. Raises lust and energy.";
	return desc;
}
window.getWillDescription = function() {
	var desc = "Indicates the mental resilience of a character. Often used to resist temptations and evade magical attacks, sometimes useful to cast magic. Raises lust and willpower.";
	return desc;
}
window.getIntelligenceDescription = function() {
	var desc = "Refers to the strength of the mind. Most commonly used to cast complex, precise magic. Raises lust and willpower.";
	return desc;
}
window.getPerceptionDescription = function() {
	var desc = "The capacity of a character to detect movements and sounds that would otherwise be ignored. Often useful to evade attacks. Raises lust and willpower.";
	return desc;
}
window.getEmpathyDescription = function() {
	var desc = "Indicates the ability of a character to understand the feelings and motivations of others. Most useful during socialization, also serves to resist social attacks. Raises lust and social drive.";
	return desc;
}
window.getCharismaDescription = function() {
	var desc = "Refers to the ability of a character to get the most out of their expressions. Most useful during socialization, and it also powers social attacks. Raises lust and social drive.";
	return desc;
}
window.getLuckDescription = function() {
	var desc = "In a world where everything is connected by aether, luck refers to the harmony of a character with all elements of the world. Improves in very small amounts your dealt sexual pleasure, damage, chances to land or evade attacks, and success during socialization.";
	return desc;
}

////////// Weighted List //////////

window.weightedList = function() {

};

window.weightedElement = function(content,weight) {
	this.content = content;
	this.w = weight;
};
class weightedRankedElement extends weightedElement {
	constructor(content,weight) {
		super(content,weight);
		this.r = 0;
	}
}
class weightedDefinedRankedElement extends weightedElement {
	constructor(content,weight,rank) {
		super(content,weight);
		this.r = rank;
	}
}
window.weightedListLength = function(wL) {
	var l = 0;
	for ( var el in wL ) {
		if ( wL[el] instanceof weightedElement ) {
			l++;
		} /*else if ( wL[el] instanceof weightedRankedElement ) { 
			l++;
		} else if ( wL[el] instanceof weightedDefinedRankedElement ) {
			l++;
		}*/
	}
	return l;
}

window.getWeightedListTotalValue = function(wList) {
	var fullWeight = 0;
	
	for ( var item in wList ) {
		if ( wList[item] instanceof weightedElement ) {
			if ( wList[item].w >= 0 ) {
				fullWeight += wList[item].w;
			}
		}
	}
	
	return fullWeight;
}
window.randomFromWeightedList = function(wList) {
	var fullWeight = getWeightedListTotalValue(wList);
	var r = limitedRandom(fullWeight);
	var chosenItem = "errorWList";
	var counter = 0;
	
	for ( var item in wList ) {
		if ( ( wList[item] != false ) && ( wList[item] instanceof weightedElement ) && ( chosenItem == "errorWList" ) ) {
			counter++;
			if ( wList[item].w > 0 ) {
				r -= wList[item].w;
				if ( r <= 0 ) {
					chosenItem = wList[item].content;
					break;
				}
			}
		}
	}
	if ( chosenItem == "errorWList" ) {
		if ( counter > 0 ) {
			chosenItem = getFirstElementFromWeightedList(wList);
		}
	}
	return chosenItem;
}
window.randomFromWeightedListPercentThreshold = function(wList,threshold) {
	// Similar to randomFromList(), except that options with weights lower than the highest weight*threshold are not taken into account
	var newWlist = new weightedList();
	
	// Get highest value
	var highest = -1;
	for ( var item of wList ) {
		if ( item.w > highest ) { highest = item.w; }
	}
	// Remove unvalid options
		var i = 0;
	for ( var item of wList ) {
		if ( item.w >= (highest * threshold) ) {
			//newWlist.push(item);
			newWlist[i] = item;
			i++;
		}
	}
	// Get random option
	return randomFromWeightedList(newWlist);
}
window.listIntoWeightedList = function(list) {
	var wList = new weightedList();
	for ( var item in list ) {
		wList[list[item]] = new weightedElement(list[item],100);
	}
	return wList;
}

window.createPreferencesWeightedList = function() {
	var wl = new weightedList();
	wl.foreplay = new weightedRankedElement("foreplay",100);
	wl.oral = new weightedRankedElement("oral",100);
	wl.fullsex = new weightedRankedElement("fullsex",100);
	wl.talk = new weightedRankedElement("talk",100);
	wl.useDick = new weightedRankedElement("useDick",100);
	wl.usePussy = new weightedRankedElement("usePussy",100);
	wl.useAnus = new weightedRankedElement("useAnus",100);
	wl.useBreasts = new weightedRankedElement("useBreasts",100);
	wl.useMouth = new weightedRankedElement("useMouth",100);
	wl.useEyes = new weightedRankedElement("useEyes",100);
	wl.useHands = new weightedRankedElement("useHands",100);
	wl.useLegs = new weightedRankedElement("useLegs",100);
	wl.useTail = new weightedRankedElement("useTail",100);
	wl.targetDick = new weightedRankedElement("targetDick",100);
	wl.targetPussy = new weightedRankedElement("targetPussy",100);
	wl.targetAnus = new weightedRankedElement("targetAnus",100);
	wl.targetBreasts = new weightedRankedElement("targetBreasts",100);
	wl.targetMouth = new weightedRankedElement("targetMouth",100);
	wl.targetEyes = new weightedRankedElement("targetEyes",100);
	wl.targetHands = new weightedRankedElement("targetHands",100);
	wl.targetLegs = new weightedRankedElement("targetLegs",100);
	wl.targetTail = new weightedRankedElement("targetTail",100);
	wl.top = new weightedRankedElement("top",100);
	wl.bottom = new weightedRankedElement("bottom",100);
	wl.domination = new weightedRankedElement("domination",100);
	wl.submission = new weightedRankedElement("submission",100);
	wl.bondage = new weightedRankedElement("bondage",100);
	wl.teasing = new weightedRankedElement("teasing",100);
	wl.hypnosis = new weightedRankedElement("hypnosis",100);
	wl.draining = new weightedRankedElement("draining",100);
	wl.charm = new weightedRankedElement("charm",100);
	wl.romantic = new weightedRankedElement("romantic",100);
	wl.usePain = new weightedRankedElement("usePain",100);
	wl.receivePain = new weightedRankedElement("receivePain",100);
	wl.denial = new weightedRankedElement("denial",100);
	wl.position = new weightedRankedElement("position",100);
	wl.continuedAction = new weightedRankedElement("continuedAction",100);
	
	return wl;
}
window.orderWeightedList = function(wL) {
	var orderedList = [];
	var chw = -10000; // Current highest weight
	var che = ""; // Current highest element
	while ( orderedList.length < (weightedListLength(wL) - 2) ) {
		for ( var we in wL ) {
			if ( orderedList.includes(wL[we].content) == false ) {
				if ( wL[we].w > chw && wL[we].content != "position" && wL[we].content != "continuedAction" ) {
					chw = wL[we].w;
					che = wL[we].content;
				}
			}
		}
		
		orderedList.push(che);
		chw = -10000;
		che = "";
	}
	orderedList.push("position");
	orderedList.push("continuedAction");
	return orderedList;
}
window.rankSexPreferences = function(wL) {
	var orderedList = orderWeightedList(wL);
	var rank2l = 4;
	var rank1l = 8;
	var i = 0;
	
	while ( i < rank2l ) {
		wL[orderedList[i]].r = 2;
		i++;
	}
	while ( i < (rank2l+rank1l) ) {
		wL[orderedList[i]].r = 1;
		i++;
	}
	while ( i < orderedList.length ) {
		wL[orderedList[i]].r = 0;
		i++;
	}
}

setup.basePreferencesMultipliers = [];
setup.basePreferencesMultipliers.foreplay = 1;
setup.basePreferencesMultipliers.oral = 1;
setup.basePreferencesMultipliers.fullsex = 3;
setup.basePreferencesMultipliers.talk = 1;
setup.basePreferencesMultipliers.useDick = 1.2;
setup.basePreferencesMultipliers.usePussy = 1.2;
setup.basePreferencesMultipliers.useAnus = 1;
setup.basePreferencesMultipliers.useBreasts = 1;
setup.basePreferencesMultipliers.useMouth = 1;
setup.basePreferencesMultipliers.useEyes = 1;
setup.basePreferencesMultipliers.useHands = 1;
setup.basePreferencesMultipliers.useLegs = 1;
setup.basePreferencesMultipliers.useTail = 1;
setup.basePreferencesMultipliers.targetDick = 1.2;
setup.basePreferencesMultipliers.targetPussy = 1.2;
setup.basePreferencesMultipliers.targetAnus = 1;
setup.basePreferencesMultipliers.targetBreasts = 1;
setup.basePreferencesMultipliers.targetMouth = 1;
setup.basePreferencesMultipliers.targetEyes = 1;
setup.basePreferencesMultipliers.targetHands = 1;
setup.basePreferencesMultipliers.targetLegs = 1;
setup.basePreferencesMultipliers.targetTail = 1;
setup.basePreferencesMultipliers.top = 1;
setup.basePreferencesMultipliers.bottom = 1;
setup.basePreferencesMultipliers.domination = 1;
setup.basePreferencesMultipliers.submission = 1;
setup.basePreferencesMultipliers.bondage = 1;
setup.basePreferencesMultipliers.teasing = 1;
setup.basePreferencesMultipliers.hypnosis = 1;
setup.basePreferencesMultipliers.draining = 1;
setup.basePreferencesMultipliers.charm = 1;
setup.basePreferencesMultipliers.romantic = 1;
setup.basePreferencesMultipliers.usePain = 0.7;
setup.basePreferencesMultipliers.receivePain = 0.7;
setup.basePreferencesMultipliers.denial = 0.7;
setup.basePreferencesMultipliers.position = 1;
setup.basePreferencesMultipliers.continuedAction = 1;

window.getFinalPreferenceWeight = function(charKey,pref) {
	var w = gC(charKey).tastes[pref].w * setup.basePreferencesMultipliers[pref];
	return w;
}

window.getFirstElementFromWeightedList = function(wList) {
	var chosenItem = undefined;
	
	for ( var item in wList ) {
		if ( chosenItem == undefined ) {
			if ( ( wList[item] != false ) && ( wList[item] instanceof weightedElement ) ) {
				chosenItem = wList[item].content;
			}
		} else {
			break;
		}
	}
	
	return chosenItem;
}

// Constructors, serializers, etc.
weightedElement.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

weightedElement.prototype.clone = function () {
	return (new weightedElement())._init(this);
};

weightedElement.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new weightedElement())._init($ReviveData$)', ownData);
};

weightedList.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

weightedList.prototype.clone = function () {
	return (new weightedList())._init(this);
};

weightedList.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new weightedList())._init($ReviveData$)', ownData);
};

////////// Standard empty list //////////

window.pseudoList = function() {
};

// Constructors, serializers, etc.
pseudoList.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

pseudoList.prototype.clone = function () {
	return (new pseudoList())._init(this);
};

pseudoList.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new pseudoList())._init($ReviveData$)', ownData);
};

////////// Maintenance //////////

window.getHotfixButton = function() {
	// This button will be used to apply hotfixes to saved games, when required. It may be found at the personal room screen.
	var bText = "\n\n<<l" + "ink [[Apply Hotfix|Personal Room]]>><<s" + "cript>>\n";
		bText 	 += "applyHotfix();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>> Apply this hotfix at least once if you started this playthrough before version 0.2.10e.\n";
		bText	 += "<<l" + "ink [[Reset items and bodyparts|Personal Room]]>><<s" + "cript>>\n";
		bText 	 += "finishAllAlteredStates(getActiveSimulationCharactersArray());\n";
		bText 	 += "fixEquipmentAndParts();\n";
		bText 	 += "unlockAllBodyparts(getActiveSimulationCharactersArray());\n";
		bText	 += "<</s" + "cript>><</l" + "ink>> This option unequips all items and resets the state of all bodyparts to 'free'. Use it only if any character's bodypart was bugged in an incorrect state.\n"
	//var	bText	  = "\n\n<<l" + "ink [[Apply lag fix|Personal Room]]>><<s" + "cript>>\n";
	//	bText 	 += "applyLagFix();\n";
	//	bText	 += "<</s" + "cript>><</l" + "ink>>\n\n";
	 var bText = "";
	return bText;
}

window.applyHotfix = function() {
	gC("chMir").socialAi = new NpcSocialAi("chMir");
	gC("chNash").socialAi = new NpcSocialAi("chNash");
	gC("chClaw").socialAi = new NpcSocialAi("chClaw");
	gC("chVal").socialAi = new NpcSocialAi("chVal");
	gC("chAte").socialAi = new NpcSocialAi("chAte");
	
	State.variables.personalRoom.endDayEffects = function() {
		
		State.variables.personalRoom.autosavePossible = false;
		
		// New day
		State.variables.daycycle.addDays(1);
		for ( var character of getActiveSimulationCharactersArray() ) {
			gC(character).restoreBars(); // Energy bars
			gC(character).mood.resetMood(); // Moods
			
			gC(character).studiedScrollToday = false;
			
			gC(character).cbl = [];
		}
		
		// Set time
		State.variables.daycycle.hours = State.variables.simCycPar.templeNewDayTime;
		State.variables.daycycle.minutes = 0;
		
		// Level up stats
		for ( var character of getActiveSimulationCharactersArray() ) {
			//			for ( var stat of State.variables.baseStats ) {
			for ( var stat of setup.baseStats ) {
				if ( gC(character)[stat].tryLevelUp() ) {
					// Notify level up
					if ( character == "chPlayerCharacter" ) {
						this.newDayInfo += "Your " + stat + " has increased to " + gC(character)[stat].value + ".\n";
					}
				}
			}
			recalculateMaxBars(character);
			// State.variables[character].recalculateMaxBars();
		}
		
		// Relations and mood
		this.endDayRelationMoodEffects();

		// Daily sex checks
		for ( var character of getActiveSimulationCharactersArray() ) {
			if ( gC(character).hasOwnProperty("daysWithoutSex") ) {
				gC(character).daysWithoutSex += 1;
				gC(character).sexScenesToday = 0;
			}
			delete gC(character).dayTags;
		}

		// Infamy
		for ( var charKey of getActiveSimulationCharactersArray() ) {
			var infamyChange = ((gC(charKey).infamy - (gC(charKey).infamy % 10)) / 10 ) + 1;
			gC(charKey).changeInfamy(-infamyChange);
			if ( gC(charKey).globalAi.hasOwnProperty("attackedToday") ) {
				gC(charKey).globalAi.attackedToday = false;
			}
		}

		// Altered States
		for ( var charKey of getActiveSimulationCharactersArray() ) {
			for ( var as of gC(charKey).alteredStates ) {
				if ( as.scope == "days" ) {
					as.remainingDays--;
					if ( as.remainingDays <= 0 ) {
						as.flagRemove = true;
					}
				}
			}
			gC(charKey).cleanStates();
		}

		// Equipment
		for ( var equip of State.variables.equipmentList ) {
			if ( equip.days > 1 ) {
				equip.days--;
			} else if ( equip.days == 1 ) {
				unequipObject(equip.id);
			}
		}
				
		// Fix stats
		for ( var character of getActiveSimulationCharactersArray() ) {
			fixCharacterStatModifiers(character);
		}
		
		// Despawn merchants
		State.variables.currentMerchants = [];
	}
}

window.applyLagFix = function() {
	State.variables.compass.sisList = new pseudoList();
	State.variables.compass.lastSisId = -1;
	State.variables.compass.pcSis = -1;
	State.variables.compass.sisPassage = "";
	
	State.variables.compass.debugInfo = "";
}

window.fixEquipmentAndParts = function() {
	takeOffAllItems();
}

window.takeOffAllItems = function() {
	for ( var item of State.variables.equipmentList ) {
		unequipObject(item.id);
	}
}
window.finishAllRelationships = function() {
	for ( var char1 of getActiveSimulationCharactersArray() ) {
		for ( var char2 of getActiveSimulationCharactersArray() ) {
			if ( char1 != char2 ) {
				finishRelType(char1,char2);
			}
		}
	}
}
window.resetStatModifiers = function() {
	for ( var charKey of getActiveSimulationCharactersArray() ) {
		for ( var stat of getStatNamesArray() ) {
			gC(charKey)[stat].sumModifier = 0;
			gC(charKey)[stat].multModifier = 1;
		}
	}
}
window.resetRelationshipModifiers = function() {
	for ( var char1 of getActiveSimulationCharactersArray() ) {
		for ( var char2 of getActiveSimulationCharactersArray() ) {
			if ( char1 != char2 ) {
				for ( var stat of getRelationshipStatsNamesArray() ) {
					getRelation(char1,char2)[stat].levelMod = 0;
				}
			}
		}
	}
}
window.finishAllAlteredStates = function(charList) {
	for ( var cK of charList ) {
		removeCharsStates(cK);
	}
}
window.unlockAllBodyparts = function(charList) {
	for ( var cK of charList ) {
		for ( var part in gC(cK).body ) {
			if ( gC(cK).body[part] instanceof Bodypart ) {
				gC(cK).body[part].state = "free";
			}
		}
	}
}


