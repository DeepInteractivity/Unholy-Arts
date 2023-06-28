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

window.stringToUTF16sum = function(string) {
	var finalValue = 0;
	var l = string.length;
	var i = 0;
	while ( i < l ) {
		finalValue += string.charCodeAt(i);
		i++;
	}
	return finalValue;
}
window.seedableRandomInt100 = function(seed) {
	var dayValue = (State.variables.daycycle.day + State.variables.daycycle.month * 30) * 2;
	var seedPlusDV = seed + dayValue;
	var remainder10000 = seedPlusDV % 10000;
	var result = parseInt(setup.seedableNumbers[remainder10000] + setup.seedableNumbers[remainder10000 + 1]);
	return result;
}
// Example: seedableRandomInt100(stringToUTF16sum(gC("chPlayerCharacter").name + gC("chNash").name)); -> Returns a random number that changes with the day and cannot be savescummed

window.getNumbersLength = function(n) {
	var num = n;
	if ( num < 0 ) { num = -num; }
	return parseInt(parseInt(num).toString().length);
}
window.isPosNegX1 = function(n) {
	if ( n >= 0 ) { return 1; }
	else { return -1; }
}

window.getPositionInBasicGeometricProgression = function(value) {
	var modValue = value;
	var pos = 0;
	while (modValue > 0 ) {
		pos++;
		modValue -= pos;
	}
	return pos;
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

window.randomListPurgeMinMax = function(list,min,max) {
	// Discards a random amount of elements from list and returns the new list. Min and max refer to the minimum and maximum amount of elements the new list must have. The new list must not have less than zero elements or more than the previous list.
	if ( min < 0 ) { min = 0; }
	if ( max > list.length ) { max = list.length; }
	if ( max < min ) { max = min; }
	
	var objects = limitedRandomInt(max-min) + min;
	if ( objects == 0 ) { return []; }
	else if ( objects == list.length ) { return list; }
	else {
		var oldList = list;
		var newList = [];
		var currentObject = "";
		var i = objects;
		while ( i > 0 ) {
			currentObject = randomFromList(oldList);
			newList.push(currentObject);
			oldList = arrayMinusA(oldList,currentObject);
		}
		return newList;
	}
}

// Text
window.firstToCap = function(string) { // Returns a string similar to input with a capitalized first character
	var nString = string[0].toUpperCase() + string.slice(1);
	return nString;
}
window.ftc = function(string) { // firstToCap abbreviation
	return firstToCap(string);
}

window.hoverText = function(txt,hText) {
	var result = "<span title='" + hText + "'>" + txt + "</span>";
	return result;
}

window.ktn = function(charKey) { // Returns the stdName of a character given its char key
	return getChar(charKey).stdName();
}

window.dickWord = function() {
	return randomFromList(["dick","dick","dick","dick","dick","cock","cock","cock","prick","shaft","member","penis"]);
}
window.pluralDickWord = function() {
	return randomFromList(["dicks","dicks","dicks","dicks","dicks","cocks","cocks","cocks","pricks","shafts","members","penises"]);
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
	var intro = `<div class='standardBox'>  <span style="vertical-align: middle;"><img src="img/mapIcons/` + setup[mapName][roomName].medIcon + `" style="vertical-align: middle;">` + " __" + setup[mapName][roomName].title + "__</span>";
	//var intro = "<div class='standardBox'>[img[img/mapIcons/" + setup[mapName][roomName].medIcon + "]]__" + setup[mapName][roomName].title + "__";
	if ( setup[mapName][roomName].getDescription() != "" ) {
		intro += "\n" + setup[mapName][roomName].getDescription();
	}
	intro += '</div>';
	State.variables.customRoomIntro = intro;
}

window.getTextWithTooltip = function(txt,tooltip) {
	var fTxt = "<span title='" + tooltip + "'>" + txt + "</" + "span>";
	return fTxt;
}
window.getTextWithTooltipAlt = function(txt,tooltip) {
	var fTxt = '<span title="' + tooltip + '">' + txt + '</' + 'span>';
	return fTxt;
}

window.scriptStart = function() {
	var t = `<<s` + `cript>>`;
	return t;
}
window.scriptEnd = function() {
	var t = `<</s` + `cript>>`;
	return t;
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
window.getCharKtns = function(charKeysList) {
	var text = "";
	var i = 0;
	for ( var charKey in charKeysList ) {
		text += ktn(charKeysList[charKey]);
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
window.charKeysIntoArrayString = function(charKeysList) {
	var string = "[";
	var i = 0;
	for ( var cK of charKeysList ) {
		if ( i != 0 ) { string += ","; }
		string += "'" + cK + "'";
		i++;
	}
	string += "]";
	return string;
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
window.removeFromStVarsList = function(v) {
	var newStVars = [];
	for ( var varName of State.variables.StVarsList ) {
		if ( varName != v ) { newStVars.push(varName); }
	}
	State.variables.StVarsList = newStVars;
}
window.isStVarOn = function(v) {
	return ( State.variables.StVarsList.includes(v) );
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
	var bText = "\n\n"; //"\n\n<<l" + "ink [[Apply Hotfix|Personal Room]]>><<s" + "cript>>\n";
		//bText 	 += "applyHotfix();\n";
		//bText	 += "<</s" + "cript>><</l" + "ink>> Apply this hotfix at least once if you started this playthrough before version 0.2.10e.\n";
		bText	 += "<<l" + "ink [[Hotfix: Reset items, altered states and bodyparts|Personal Room]]>><<s" + "cript>>\n";
		bText 	 += "destroyAllAlteredStates(getActiveSimulationCharactersArray());\n";
		bText 	 += "fixEquipmentAndParts();\n";
		bText 	 += "unlockAllBodyparts(getActiveSimulationCharactersArray());\n";
		bText 	 += "resetStatModifiers();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>> This option unequips all items, finishes all altered states and resets the state of all bodyparts to 'free'. Use it only if the game throws an exception that prevents you from initiating a new day.\n"
	//var	bText	  = "\n\n<<l" + "ink [[Apply lag fix|Personal Room]]>><<s" + "cript>>\n";
	//	bText 	 += "applyLagFix();\n";
	//	bText	 += "<</s" + "cript>><</l" + "ink>>\n\n";
	// var bText = "";
	return bText;
}

window.applyHotfix = function() {
	gC("chMir").socialAi = new NpcSocialAi("chMir");
	gC("chNash").socialAi = new NpcSocialAi("chNash");
	gC("chClaw").socialAi = new NpcSocialAi("chClaw");
	gC("chVal").socialAi = new NpcSocialAi("chVal");
	gC("chAte").socialAi = new NpcSocialAi("chAte");
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

window.takeOffAllBondage = function() {
	for ( var item of State.variables.equipmentList ) {
		if ( getEquipDataById(item.id).slotType == "bodypart" ) {
			unequipObject(item.id);
		}
	}
}

	// States
window.destroyAllAlteredStates = function(charList) {
	for ( var cK of charList ) {
		destroyCharsStates(cK);
	}
}
window.destroyCharsStates = function(charKey) {
	// Altered states are removed without removing their effects
	for ( var as of gC(charKey).alteredStates ) {
	}
	gC(charKey).alteredStates = [];
}

// Random Seed
setup.seedableNumbers = "7765527939751754613953984683393638304746119966538581538420568533862186725233402830871123282789212507712629463229563989898935821167456270102183564622013496715188190973038119800497340723961036854066431939509790190699639552453005450580685501956730229219139339185680344903982059551002263535361920419947455385938102343955449597783779023742161727111723643435439478221818528624085140066604433258885698670543154706965747458550332323342107301545940516553790686627333799585115625784322988273723198987571415957811196358330059408730681216028764962867446047746491599505497374256269010490377819868359381465741268049256487985561453723478673303904688383436346553794986419270563872931748723320837601123029911367938627089438799362016295154133714248928307220126901475466847653576164773794675200490757155527819653621323926406160136358155907422020203187277605277219005561484255518792530343513984425322341576233610642506390497500865627109535919465897514131034822769306247435363256916078154781811528436679570611086153315044521274739245449454236828860613408414863776700961207151249140430272538607648236341433462351897576645216413767969031495019108575984423919862916421939949072362346468441173940326591840443780513338945257423995082965912285085558215725031071257012668302402929525220118726767562204154205161841634847565169998116141010029960783869092916030288400269104140792886215078424516709087000699282120660418371806535567252532567532861291042487761825829765157959847035622262934860034158722980534989650226291748788202734209222245339856264766914905562842503912757710284027998066365825488926488025456610172967026640765590429099456815065265305371829412703369313785178609040708667114965583434347693385781711386455873678123014587687126603489139095620099393610310291616152881384379099042317473363948045759314931405297634757481193567091101377517210080315590248530906692037671922033229094334676851422144773793937517034436619910403375111735471918550464490263655128162288244625759163330391072253837421821408835086573917715096828874782656995995744906617583441375223970968340800535598491754173818839994469748676265516582765848358845314277568790029095170283529716344562129640435231176006651012412006597558512761785838292041974844236080071930457618932349229279650198751872127267507981255470958904556357921221033346697499235630254947802490114195212382815309114079073860251522742995818072471625916685451333123948049470791191532673430282441860414263639548000448002670496248201792896476697583183271314251702969234889627668440323260927524960357996469256504936818360900323809293459588970695365349406034021665443755890045632882250545255640564482465151875471196218443965825337543885690941130315095261793780029741207665147939425902989695946995565761218656196733786236256125216320862869222103274889218654364802296780705765615144632046927906821207388377814233562823608963208068222468012248261177185896381409183903673672220888321513755600372798394004152970028783076670944474560134556417254370906979396122571429894671543578468788614445812314593571984922528471605049221242470141214780573455105008019086996033027634787081081754501193071412233908663938339529425786905076431006383519834389341596131854347546495569781038293097164651438407007073604112373599843452251610507027056235266012764848308407611830130527932054274628654036036745328651057065874882256981579367897669742205750596834408697350201410206723585020072452256326513410559240190274216248439140359989535394590944070469120914093870012645600162374288021092764579310657922955249887275846101264836999892256959688159205600101655256375678566722796619885782794848855834397518744545512965634434803966420557982936804352202770984294232533022576341807039476994159791594530069752148293366555661567873640053666564165473217043903521329543529169414599041608753201868379370234888689479151071637852902345292440773659495630510074210871426134974595615138498713757047101787957310422969066670214498637464595280824369445789772330048764765241339075920434019634039114732023380715095222010682563427471646024335440051521266932493419673977041595683753555166730273900749729736354964533288869844061196496162773449518273695588220757355176651589855190986665393549481068873206859907540792342402300925900701731960362254756478940647548346647760411463233905651343306844953979070903023460461470961696886885014083470405460742958699138296682468185710318879065287036650832431974404771855678934823089431068287027228097362480939962706074726455399253994428081137369433887294063079261595995462624629707062594845569034711972996409089418059534393251236235508134949004364278527138315912568989295196427287573946914272534366941532361004537304881985517065941217352462589548730167600298865925786628561249665523533829428785425340483083307016537228563559152534784459818313411290019992059813522051173365856407826484942764411376393866924803118364453698589175442647399882284621844900877769776312795722672655562596282542765318300134070922334365779160128093179401718598599933849235495640057099558561134980252499066984233017350358044081168552653117099570899427328709258487894436460050410892266917835258707859512983441729535195378855345737426085902908176515578039059464087350612322611200937310804854852635722825768203416050484662775045003126200800799804925485346941469775164932709504934639382432227188515974054702148289711177792376122578873477188196825462981268685817050740272550263329044976277894423621674119186269439650671515779586756482399391760426017633870454990176143641204692182370764887834196896861181558158736062938603810171215855272668300823834046564758804051380801633638874216371406435495561868964112282140753302655100424104896783528588290243670904887118190909494533144218287661810310073547705498159680772009474696134360928614849417850171807793068108546900094458995279424398139213505586422196483491512639012803832001097738680662877923971801461343244572640097374257007359210031541508936793008169980536520276007277496745840028362405346037263416554259027601834840306811381855105979705664007509426087885735796037324514146786703688098806097164258497595138069309449401515422221943291302173912538355915031003330325111749156969174502714943315155885403922164097229101129035521815762823283182342548326111912800928252561902052630163911477247331485739107775874425387611746578671169414776421441111263583553871361011023267987756410246824032264834641766369806637857681349204530224081972785647198396308781543221166912246415911776732253264335686146186545222681268872684459684424161078540167681420808850280054143613146230821025941737562389942075713627516745731891894562835257044133543758575342698699472547031656613991999682628247270641336222178923903176085428943733935618891651250424404008952719837873864805847268954624388234375178852014395600571048119498842390606136957342315590796703461491434478863604103182350736502778590897578272731305048893989009923913503373250855982655867089242612429473670193907727130706869170926462548423240748550366080136046689511840093668609546325002145852930950000907151058236267293264537382104938724996699339424685516483261134146110680267446637334375340764294026682973865220935701626384648528514903629320199199688285171839536691345222444708045923966028171565515656661113598231122506289058549145097157553900243931535190902107119457300243880176615035270862602537881797519478061013715004489917210022201335013106016391541589578037117792775225978742891917915522417189585361680594741234193398420218745649256443462392531953135103311476394911995072858430658361935369329699289837914941939406085724863968836903265564364216644257607914710869984315733749648835292769328220762947282381537409961545598798259891093717126218283025848112389011968221429457667580718653806506487026133892822994972574530332838963818439447707794022843598834100358385423897354243956475556840952248445541392394100016207693636846776413017819659379971557468541946334893748439129742391433659360410035234377706588867781139498616478747140793263858738624732889645643598774667638479466504074111825658378878454858148962961273998413442726086061872455452360643153710112746809778704464094758280348769758948328241239292960582948619196670918958089833201210318430340128495116203534280144127617285830243559830032042024512072872535581195840149180969253395075778400067465526031446167050827682772223534191102634163157147406123850425845988419907611287258059113935689601431668283176323567325417073420817332230462987992804908514094790368878687894930546955703072619009502076433493359106024545086453628935456862958531315337183868265617862273637169757741830239860065914816164049449650117321313895747062088474802365371031150898427992754426853277974311395143574172219759799359685252285745263796289612691572357986620573408375766873884266405990993505000813375432454635967504844235284874701443545419576258473564216198134073468541117668831186544893776979566517279662326714810338643913751865946730024434500544995399742372328712494834706044063471606325830649829795510109541836235030309453097335834462839476304775645015008507578949548931393944899216125525597701436858943585877526379625597081677643800125436502371412783467926101995585224717220177723700417808419423948725406801556035998390548985723546745642390585850216719031395262944554391316631345308939062046784387785054239390524731362012947691874975191011472315289326772533918146607300089027768963114810902209724520759167297007850580717186381054967973100167870850694207092232908070383263453452038027860990556900134137182368370991949516489600755049341267876436746384902063964019766685592335654639138363185745698147196210841080961884605456039038455343729141446513474940784884423772175154334260306698831768331001133108690421939031080143784334151370924353013677631084913516156422698475074303297167469640666531527035325467112667522460551199581831963763707617991919203579582007595605302346267757943936307463056901080114942714100939136913810725813781357894005599500183542511841721360557275221035268037357265279224173736057511278872181908449006178013889710770822931002797665935838758909395688148560263224393726562472776037890814458837855019702843779362407825052704875816470324581290878395232453237896029841669225489649715606981192186584926770403956481278102179913217416305810554598801300484562997651121241536374515005635070127815926714241342103301566165356024733807843028655257222753049998837015348793008062601809623815161366903341111386538510919367393835229345888322550887064507539473952043968079067086806445096986548801682874343786126453815834280753061845485903798217994599681154419742536344399602902510015888272164745006820704193761584547123183460072629339550548239557137256840232268213012476794522644820910235647752723082081063518899152692889108455571126603965034397896278250016110153235160519655904211844949907789992007329476905868577878720982901352956613978884860509786085957017731298155314951681467176959760994210036183559138777817698458758104466283998806006162298486169353373865787735983361613384133853684211978938900185295691967804554482858483701170967212535338758621582310133103877668272115726949518179589754693992642197915523385766231676275475703546994148929041301863861194391962838870543677743224276809132365449485366768000001065262485473055861598999140170769838548318875014293890899506854530765116803337322265175662207526951791442252808165171667766727930354851542040238174608923283917032754257508676551178593950027933895920576682789677644531840404185540104351348389531201326378369283580827193783126549617459970567450718332065034556644034490453627560011250184335607361222765949278393706478426456763388188075656121689605041611390390639601620221536849410926053876887148379895599991120991646464411918568277004574243434021672276445589330127781586869525069499364610175685060167145354315814801054588605645501332037586454858403240298717093480910556211671546848477803944756979804263180991756422809873998766973237695737015808068229045992123661689025962730430679316531149401764737693873";



