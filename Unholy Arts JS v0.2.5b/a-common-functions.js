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
	return randomFromList(["pussy","pussy","pussy","pussy","pussy","cherry","cherry","cunt","cunt","snatch","clam","kitty"]);
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
	// <span style="color:lightcoral">Lust:</span>
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
	return colorText((damage.toFixed(2) + " energy damage"),"khaki");
}

window.textWillpowerPoints = function(damage) {
	return colorText((damage.toFixed(2) + " willpower points"),"darkslateblue");
}
window.textEnergyPoints = function(damage) {
	return colorText((damage.toFixed(2) + " energy points"),"limegreen");
}
window.textSocialdrivePoints = function(damage) {
	return colorText((damage.toFixed(2) + " energy points"),"khaki");
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
	var room = State.variables[mapName].rooms[roomName];
	var intro = "<div class='standardBox'>__" + room.title + "__";
	if ( room.getDescription() != "" ) {
		intro += "\n" + room.getDescription();
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
	return State.variables.activeSimulationCharacters;
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
	var desc = "Indicates the ability of a character to understand the feelings and motivations of others. Most useful during socialization, also servers to resist social attacks. Raises lust and social drive.";
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
window.listIntoWeightedList = function(list) {
	var wList = new weightedList();
	for ( var item in list ) {
		wList[list[item]] = new weightedElement(list[item],100);
	}
	return wList;
}

window.createPreferencesWeightedList = function() {
	var wl = new weightedList();
	wl.foreplay = new weightedElement("foreplay",100);
	wl.oral = new weightedElement("oral",100);
	wl.fullsex = new weightedElement("fullsex",110);
	wl.talk = new weightedElement("talk",100);
	wl.useDick = new weightedElement("useDick",100);
	wl.usePussy = new weightedElement("usePussy",100);
	wl.useAnus = new weightedElement("useAnus",90);
	wl.useBreasts = new weightedElement("useBreasts",100);
	wl.useMouth = new weightedElement("useMouth",100);
	wl.useEyes = new weightedElement("useEyes",100);
	wl.useHands = new weightedElement("useHands",100);
	wl.useLegs = new weightedElement("useLegs",100);
	wl.useTail = new weightedElement("useTail",100);
	wl.targetDick = new weightedElement("targetDick",100);
	wl.targetPussy = new weightedElement("targetPussy",100);
	wl.targetAnus = new weightedElement("targetAnus",90);
	wl.targetBreasts = new weightedElement("targetBreasts",100);
	wl.targetMouth = new weightedElement("targetMouth",100);
	wl.targetEyes = new weightedElement("targetEyes",100);
	wl.targetHands = new weightedElement("targetHands",100);
	wl.targetLegs = new weightedElement("targetLegs",100);
	wl.targetTail = new weightedElement("targetTail",100);
	wl.top = new weightedElement("top",100);
	wl.bottom = new weightedElement("bottom",100);
	wl.domination = new weightedElement("domination",100);
	wl.submission = new weightedElement("submission",100);
	wl.bondage = new weightedElement("bondage",100);
	wl.teasing = new weightedElement("teasing",100);
	wl.hypnosis = new weightedElement("hypnosis",100);
	wl.charm = new weightedElement("charm",100);
	wl.romantic = new weightedElement("romantic",100);
	wl.usePain = new weightedElement("usePain",40);
	wl.receivePain = new weightedElement("receivePain",40);
	wl.position = new weightedElement("position",100);
	wl.continuedAction = new weightedElement("continuedAction",100);
	
	return wl;
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
		bText	 += "<</s" + "cript>><</l" + "ink>>";
	//var	bText	  = "\n\n<<l" + "ink [[Apply lag fix|Personal Room]]>><<s" + "cript>>\n";
	//	bText 	 += "applyLagFix();\n";
	//	bText	 += "<</s" + "cript>><</l" + "ink>>\n\n";
	// var bText = "";
	return bText;
}

window.applyHotfix = function() {
	setup.battleDemandsDB = [
		// Do nothing
		createBdemandDoNothing(),
		// Humilliate
		createBdemandHumillitation(),
		// Demand sex
		createBdemandForceSex(),
		// Force relationship
		createBdemandForceServitude(),
		// Force liberation
		createBdemandForceLiberation(),
		// Steal servitude
		createBdemandStealServant()
	];
}

window.applyLagFix = function() {
	State.variables.compass.sisList = new pseudoList();
	State.variables.compass.lastSisId = -1;
	State.variables.compass.pcSis = -1;
	State.variables.compass.sisPassage = "";
	
	State.variables.compass.debugInfo = "";
}

