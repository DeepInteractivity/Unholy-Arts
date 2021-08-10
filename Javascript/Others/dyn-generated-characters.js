///// DYNAMICALLY GENERATED CHARACTERS /////

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


// Bodyparts and pronouns
// Names

