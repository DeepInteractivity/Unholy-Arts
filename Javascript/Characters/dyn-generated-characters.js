///// DYNAMICALLY GENERATED CHARACTERS /////
	// They must be added as a list to State.variables.sc.genericCharacters upon scene start

window.findEarliestDynamicCharacterPosition = function() {
	var i = 0;
	var foundN = false;
	while ( foundN == false && i < 100 ) {
		if ( State.variables["ch" + i] == undefined ) {
			foundN = true;
		} else {
			i++;
		}
	}
	return i;
}
window.generateBaseHumanoid = function(name,baseStat) {
	var nKey = findEarliestDynamicCharacterPosition();
	var chKey = "ch" + nKey;
	
	var character = new Character(name, chKey);
	character.type = "candidate";
	
	var charColor = randomFromList(["darksalmon","darkred","deeppink","darkorange","lemonchiffon","darkkhaki","lavender","mediumpurple","slateblue","chartreuse","mediumspringgreen","seagreen","olive","mediumaquamarine","lightsteelblue","rosybrown","peru","lightslategray"]);
	character.setColors(charColor,charColor);
	
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick");
	
	character.saList.push("baKissLips","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","taunt","baTease","embers","freezeFeet","sparkingRubbing");
	
	// Others
	character.names.push(name);
	character.likedTopics.push(randomFromList(["training","flora","fauna","dramas","music"]));
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/unknown-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/unknown-avatar.png]]";
	}
	character.icon = function() {
		return "[img[img/charIcons/npcIcon.png]]";
	}
	
	character.fullPortraitL = "img/portraits/unknown-full.png";
	character.avatarL = "img/portraits/unknown-avatar.png";
	character.iconL = "img/charIcons/npcIcon.png";
	
	// AI
	character.globalAi = createCandidateGlobalAi(chKey);
	
	// Tastes
	for ( var t in character.tastes ) {
		if ( character.tastes[t] instanceof weightedRankedElement ) {
			character.tastes[t].w = 80 + limitedRandomInt(40);
		}
	}
		
	// Drives
	setDriveValues(character.dImprovement,limitedRandomInt(1500),3);
	setDriveValues(character.dPleasure,limitedRandomInt(1500),3);
	setDriveValues(character.dLove,limitedRandomInt(1500),3);
	setDriveValues(character.dCooperation,limitedRandomInt(1500),3);
	setDriveValues(character.dDomination,limitedRandomInt(1500),3);
	setDriveValues(character.dAmbition,limitedRandomInt(1500),3);
	
	// Attributes
	character.setBaseAttributes((baseStat-2)+limitedRandomInt(4),(baseStat-2)+limitedRandomInt(4),(baseStat-2)+limitedRandomInt(4),(baseStat-2)+limitedRandomInt(4),(baseStat-2)+limitedRandomInt(4),(baseStat-2)+limitedRandomInt(4),(baseStat-2)+limitedRandomInt(4),(baseStat-2)+limitedRandomInt(4),(baseStat-2)+limitedRandomInt(4));
	character.setAffinities(((baseStat-2) + limitedRandomInt(4))*0.1,((baseStat-2) + limitedRandomInt(4))*0.1,((baseStat-2) + limitedRandomInt(4))*0.1,((baseStat-2) + limitedRandomInt(4))*0.1,((baseStat-2) + limitedRandomInt(4))*0.1,((baseStat-2) + limitedRandomInt(4))*0.1,((baseStat-2) + limitedRandomInt(4))*0.1,((baseStat-2) + limitedRandomInt(4))*0.1,((baseStat-2) + limitedRandomInt(4))*0.1);
	
	character.refugeRooms = [["mapTrainingGrounds","publicBaths"]];
	
	return character;
}
window.getRandomFemaleName = function() {
	var name = randomFromList(["Ai","Apolline","Leisl","Cathenna","Malia","Katoka","Bhavika","Radha","Elanie","Mariela","Chiyo","Zahra","Uchenna","Alisa","Adelina","Tuyet-Hanh"]);
	return name;
}
window.getRandomMaleName = function() {
	var name = randomFromList(["Tao","Rapier","Peppi","Hrisovalantis","Ahe","Arpad","Dev","Seamus","Moshe","Drago","Fumio","Driss","Ajulo","Coinneach","Lucero","Vinh"]);
	return name;
}
window.generateFemaleHumanoidTest = function() {
	var nKey = findEarliestDynamicCharacterPosition();
	var chKey = "ch" + nKey;
	var character = generateBaseHumanoid(getRandomFemaleName(),10);
	character.addFemaleParts();
	character.assignFemeninePronouns();
	State.variables[chKey] = character;
	return chKey;
}
window.generateMaleHumanoidTest = function() {
	var nKey = findEarliestDynamicCharacterPosition();
	var chKey = "ch" + nKey;
	var character = generateBaseHumanoid(getRandomMaleName(),10);
	character.addMaleParts();
	character.assignMasculinePronouns();
	State.variables[chKey] = character;
	return chKey;
}
window.generateFutaHumanoidTest = function() {
	var nKey = findEarliestDynamicCharacterPosition();
	var chKey = "ch" + nKey;
	var character = generateBaseHumanoid(getRandomFemaleName(),10);
	character.addFemaleParts();
	character.addBodypart("dick","dick");
	character.assignFemeninePronouns();
	State.variables[chKey] = character;
	return chKey;
}

window.generateFemaleAnonShapeshifter = function(usedNames) {
	var nKey = findEarliestDynamicCharacterPosition();
	var chKey = "ch" + nKey;
	var name = generateNonRepeatedNameWithFunction(usedNames,generateRandomFemaleShapeshifterName);
	var character = generateBaseHumanoid(name,10);
	character.addFemaleParts();
	character.assignFemeninePronouns();
	State.variables[chKey] = character;
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/RdFmSs-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/RdFmSs-avatar.png]]";
	}
	character.fullPortraitL = "img/portraits/RdFmSs-full.png";
	character.avatarL = "img/portraits/RdFmSs-avatar.png";
	character.saList = ["strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","slimeHug","mountDick"].concat(returnGenericShapeshifterBaList().concat(returnFirstScrollGroupActionsList()));
	var color = randomFromList(["salmon","hotpink","orchid","fuchsia","blueviolet","palegreen","mediumspringgreen"]);
	character.setColors(color,color);
	return chKey;
}
window.generateMaleAnonShapeshifter = function(usedNames) {
	var nKey = findEarliestDynamicCharacterPosition();
	var chKey = "ch" + nKey;
	var name = generateNonRepeatedNameWithFunction(usedNames,generateRandomMaleShapeshifterName);
	var character = generateBaseHumanoid(name,10);
	character.addMaleParts();
	character.assignMasculinePronouns();
	State.variables[chKey] = character;
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/RdMlSs-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/RdMlSs-avatar.png]]";
	}
	character.fullPortraitL = "img/portraits/RdMlSs-full.png";
	character.avatarL = "img/portraits/RdMlSs-avatar.png";
	character.saList = ["strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","slimeHug","mountDick"].concat(returnBaList().concat(returnFirstScrollGroupActionsList()));
	var color = randomFromList(["darksalmon","red","orchid","darkorchid","darkslateblue","greenyellow","springgreen"]);
	character.setColors(color,color);
	return chKey;
}

window.generateFemaleAnonLizardlin = function(statVariance,statBuff,number) {
	var nKey = getFirstFreedDynCharVar();
	var chKey = nKey;
	var name = "Lizardlin " + number;
	var character = generateBaseHumanoid(name,10);
	character.addFemaleParts();
	character.addBodypart("tail","tail");
	character.assignFemeninePronouns();
	State.variables[chKey] = character;
	character.type = "lizardlin";
	character.race = "lizardlin";
	
	character.fullPortraitL = "img/portraits/unknown-full.png";
	character.avatarL = "img/portraits/unknown-avatar.png";
	
	// Attributes
	character.setBaseAttributes(14,14,12,10,10,10,10,10,10);
	character.adjustAttributes(statVariance,statBuff);
	character.statsDifficultyAdjustments(1);
	
	// Affinities
	character.combatAffinities.fire.resistance += 30;
	character.combatAffinities.fire.strength += 15;
	
	character.saList = ["strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick"].concat(returnGenericLizardlinBaList());
	var color = randomFromList(["darkkhaki","palegoldenrod","limegreen","yellowgreen","mediumseagreen","olive","lightsalmon"]);
	character.setColors(color,color);
	recalculateMaxBars(chKey);
	gC(chKey).makeVirginitiesUnknown();
	return chKey;
}
window.generateMaleAnonLizardlin = function(statVariance,statBuff,number) {
	var nKey = getFirstFreedDynCharVar();
	var chKey = nKey;
	var name = "Lizardlin " + number;
	var character = generateBaseHumanoid(name,10);
	character.addMaleParts();
	character.assignMasculinePronouns();
	character.addBodypart("tail","tail");
	State.variables[chKey] = character;
	character.type = "lizardlin";
	character.race = "lizardlin";
	
	character.fullPortraitL = "img/portraits/unknown-full.png";
	character.avatarL = "img/portraits/unknown-avatar.png";
	
	// Attributes
	character.setBaseAttributes(14,12,14,10,10,10,10,10,10);
	character.adjustAttributes(statVariance,statBuff);
	character.statsDifficultyAdjustments(1);
	
	// Affinities
	character.combatAffinities.fire.resistance += 30;
	character.combatAffinities.fire.strength += 15;
	
	character.saList = ["strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick"].concat(returnGenericLizardlinBaList());
	var color = randomFromList(["darkkhaki","palegoldenrod","limegreen","yellowgreen","mediumseagreen","olive","lightsalmon"]);
	character.setColors(color,color);
	recalculateMaxBars(chKey);
	gC(chKey).makeVirginitiesUnknown();
	return chKey;
}

window.returnGenericShapeshifterBaList = function() {
	return ["struggle","baKissLips","baStrokeDick","baStrokePussy","baTeaseLockedDick","baTeaseLockedPussy","pounceFrontal","pounceFrontalD2P","pounceFrontalP2D","pounceFrontalP2P","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","embers","freezeFeet","sparkingRubbing","taunt","baTease"];
}
window.returnGenericLizardlinBaList = function() {
	return ["struggle","kick","daringAssault"];
}

	// Aux Dyn Char functions
window.getFirstFreedDynCharVar = function() {
	var i = 0;
	var foundVar = false;
	while ( foundVar == false ) {
		if ( gC("ch" + i) == undefined ) {
			foundVar = true;
		} else {
			i++;
		}
	}
	return ("ch" + i);
}

// Names
window.generateNonRepeatedNameWithFunction = function(usedNames,generatingFunction) {
	var name = "";
	while ( name == "" || usedNames.includes(name) ) {
		name = generatingFunction();
	}
	return name;
}
window.generateRandomFemaleShapeshifterName = function() {
	var name = randomFromList(["Tsellen","Maltya","Styria","Lisllin","Iliau","Versques","Faria","Esferia","Gaisyia","Lereimes","Feisien","Teseilla","Elvistir","Feness","Renesq"]);
	return name;
}
window.generateRandomMaleShapeshifterName = function() {
	var name = randomFromList(["Questian","Renesq","Maeso","Velsin","Parsque","Kullen","Guslen","Feness","Baste","Vursq","Fasian","Velos","Feisien","Tsellen"]);
	return name;
}

	// Meant for Shapeshifter NPCs to be discarded soon after
window.charAcopiesAppeareanceCharB = function(charA,charB) {
	gC(charA).name = gC(charB).name;
	gC(charA).nameColor = gC(charB).nameColor;
	gC(charA).formattedName = gC(charB).formattedName;
	gC(charA).names = gC(charB).names;
	gC(charA).fullPortrait = gC(charB).fullPortrait;
	gC(charA).avatar = gC(charB).avatar;
	gC(charA).fullPortraitL = gC(charB).fullPortraitL;
	gC(charA).avatarL = gC(charB).avatarL;
}

