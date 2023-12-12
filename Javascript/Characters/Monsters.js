////////// MONSTERS //////////
// Each of these functions auto-generates a monster, assigns it a varName, and returns the varName

// Flying Lookout
window.createFlyingLookout = function(statVariance,statBuff,number) {
	// General Data
	var nameVar = getFirstFreedMonsterVar();
	var description = "A giant eye floats through the air like a fish would swim through the water. At its sides and behind it, scaled tentacles dance forming waves. It may not be a good idea to directly look at it for long.";
	var name = '<span title="' + description + '">Flying Lookout';
	if ( number >= 0 ) { name += " " + number; }
	name += '^^(?)^^</span>';
	var character = new Character(name, nameVar);
	var tName = "Flying Lookout";
	if ( number >= 0 ) { tName += " " + number; }
	character.names = [(tName)];
	character.type = "monster";
	character.race = "monster";
	character.setColors("PowderBlue","PowderBlue");
	character.monsterType = "Flying Lookout";
	
	// Images
	/*
	character.fullPortrait = function() {
		return "[img[img/portraits/unknown-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/unknown-avatar.png]]";
	}
	*/
	
	character.fullPortraitL = "img/portraits/unknown-full.png";
	character.avatarL = "img/portraits/unknown-avatar.png";
	
	// Body
	character.body = { 
		eyes : new Bodypart("eyes","eyes"),
		tentacles : new Bodypart("tentacles","tentacles")
	};
	
	// Attributes
	character.setBaseAttributes(12,17,13,20,14,17,8,17,0);
	character.adjustAttributes(statVariance,statBuff);
	character.statsDifficultyAdjustments(1);
	character.luck.value = 0;
	
	// Affinities
	character.combatAffinities.holy.wkn += 200;
	character.combatAffinities.hypnosis.strength += 15;
	character.combatAffinities.hypnosis.wkn += 15;
	character.combatAffinities.useEyes.strength += 15;
	character.combatAffinities.useEyes.wkn += 15;
	
	// Moves
	character.saList = ["doNothing","struggle","baHypnoticGlance","baOrderKneeling","baOrderMasturbation","baCorrodeMind"];
	
	// Assign to State.variables and return varName
	State.variables[nameVar] = character;
	
	// Finish initialization
	assignMaxBarsMediumMonster(nameVar);
	
	return nameVar;
}

// Flying Lookout
window.createEssenceSucker = function(statVariance,statBuff,number) {
	// General Data
	var nameVar = getFirstFreedMonsterVar();
	var description = "Arm-sized petals grow out of the upper and lower extremes of this creature, hiding its body. At its top and bottom, foul circular mouths are crowned by diminutive teeth and long, slim tongues, which it uses to propel itself away from the ground.";
	var name = '<span title="' + description + '">Essence-Sucker';
	if ( number >= 0 ) { name += " " + number; }
	name += '^^(?)^^</span>';
	var character = new Character(name, nameVar);
	var tName = "Essence-Sucker";
	if ( number >= 0 ) { tName += " " + number; }
	character.names = [(tName)];
	character.type = "monster";
	character.race = "monster";
	character.setColors("PowderBlue","PowderBlue");
	character.monsterType = "Essence-Sucker";
	
	// Images
	/*
	character.fullPortrait = function() {
		return "[img[img/portraits/unknown-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/unknown-avatar.png]]";
	}
	*/
	
	character.fullPortraitL = "img/portraits/unknown-full.png";
	character.avatarL = "img/portraits/unknown-avatar.png";
	
	// Body
	character.body = { 
		mouth : new Bodypart("mouth","mouth"),
		legs : new Bodypart("legs","legs")
	};
	
	// Attributes
	character.setBaseAttributes(9,13,15,15,9,9,13,9,0);
	character.adjustAttributes(statVariance,statBuff);
	character.statsDifficultyAdjustments(1);
	character.luck.value = 0;
	
	// Affinities
	character.combatAffinities.holy.wkn += 200;
	character.combatAffinities.fire.wkn += 50;
	character.combatAffinities.drain.strength += 15;
	character.combatAffinities.spore.strength += 15;
	character.combatAffinities.useMouth.strength += 25;
	character.combatAffinities.targetMouth.rst += 25;
	
	// Moves
	character.saList = ["doNothing","struggle","baEnergyDrainingKiss","baDrainingKiss","pounceFrontal","tackle","baDrainingRoots"];
	
	// Assign to State.variables and return varName
	State.variables[nameVar] = character;
	
	// Finish initialization
	assignMaxBarsMediumMonster(nameVar);
	
	return nameVar;
}

// Oppressive Yoke
window.createOppressiveYoke = function(statVariance,statBuff,number) {
	// General Data
	var nameVar = getFirstFreedMonsterVar();
	var description = "A rock-solid behemoth levitates in the air, advancing imperturbable. Its body is composed of a large core tall as a human and long as a couple of deers, decorated by ample gems evenly distributed along its length, shining intensely when it casts magic. Chains of aether wander by its sides, menacing with their mere presence."
	var name = '<span title="' + description + '">Oppressive Yoke';
	if ( number >= 0 ) { name += " " + number; }
	name += '^^(?)^^</span>';
	var character = new Character(name, nameVar);
	var tName = "Oppressive Yoke";
	if ( number >= 0 ) { tName += " " + number; }
	character.names = [(tName)];
	character.type = "monster";
	character.race = "monster";
	character.setColors("PowderBlue","PowderBlue");
	character.monsterType = "Oppressive Yoke";
	
	character.control = 6;
	character.maxControl = 6;
	
	// Images
	
	character.fullPortraitL = "img/portraits/unknown-full.png";
	character.avatarL = "img/portraits/unknown-avatar.png";
	
	// Body
	character.body = { 
	};
	
	// Attributes
	character.setBaseAttributes(18,12,20,16,18,16,14,12,0);
	character.adjustAttributes(statVariance,statBuff);
	character.statsDifficultyAdjustments(2);
	character.luck.value = 0;
	
	// Affinities
	character.combatAffinities.holy.wkn += 200;
	character.combatAffinities.physical.rst += 25;
	character.combatAffinities.magic.rst += 25;
	
	// Moves
	character.saList = ["doNothing","struggle","baEtherealChains","tackle","baOppressiveEmbrace","savageCrush"];
	if ( gSettings().lewdMonsters == "enable" ) {
		character.saList.push("sparkingRubbing");
	} else {
		character.saList.push("discharge");
	}
	
	// Assign to State.variables and return varName
	State.variables[nameVar] = character;
	
	// Finish initialization
	assignMaxBarsCustomBase(nameVar,80);
	
	return nameVar;
}

// Aux Monster functions
window.getFirstFreedMonsterVar = function() {
	var i = 0;
	var foundVar = false;
	while ( foundVar == false ) {
		if ( gC("mon" + i) == undefined ) {
			foundVar = true;
		} else {
			i++;
		}
	}
	return ("mon" + i);
}

window.assignMaxBarsMediumMonster = function(character) {
	gC(character).lust.max = float2int(45 + (gC(character).physique.value * 1 + gC(character).agility.value * 1 + gC(character).resilience.value * 1
				  + gC(character).will.value * 1 + gC(character).intelligence.value * 1 + gC(character).perception.value * 1
				  + gC(character).empathy.value * 1 + gC(character).charisma.value * 1 + gC(character).luck.value * 1) / 3);
	gC(character).willpower.max = float2int(45 + gC(character).will.value * 1 + gC(character).intelligence.value * 1 + gC(character).perception.value * 1);
	gC(character).energy.max = float2int(45 + gC(character).physique.value * 1 + gC(character).agility.value * 1 + gC(character).resilience.value * 1);
	gC(character).socialdrive.max = float2int(45 + gC(character).empathy.value * 1 + gC(character).charisma.value * 1 + gC(character).luck.value * 1);
	for ( var sBar of ["lust","willpower","energy","socialdrive"] ) {
		gC(character)[sBar].current = gC(character)[sBar].max;
	}
}
window.assignMaxBarsCustomBase = function(character,customBase) {
	gC(character).lust.max = float2int(customBase + (gC(character).physique.value * 1 + gC(character).agility.value * 1 + gC(character).resilience.value * 1
				  + gC(character).will.value * 1 + gC(character).intelligence.value * 1 + gC(character).perception.value * 1
				  + gC(character).empathy.value * 1 + gC(character).charisma.value * 1 + gC(character).luck.value * 1) / 3);
	gC(character).willpower.max = float2int(customBase + gC(character).will.value * 1 + gC(character).intelligence.value * 1 + gC(character).perception.value * 1);
	gC(character).energy.max = float2int(customBase + gC(character).physique.value * 1 + gC(character).agility.value * 1 + gC(character).resilience.value * 1);
	gC(character).socialdrive.max = float2int(customBase + gC(character).empathy.value * 1 + gC(character).charisma.value * 1 + gC(character).luck.value * 1);
	for ( var sBar of ["lust","willpower","energy","socialdrive"] ) {
		gC(character)[sBar].current = gC(character)[sBar].max;
	}
}

window.deleteAllMonsters = function() {
	var i = 0;
	while ( i < 100 ) {
		var m = "mon" + i;
		if ( gC(m) != undefined ) {
			delete State.variables[m];
		}
		i++;
	}
}

// Monster Rewards Data
setup.monRewards = []; // [0-8] -> Stats Exp ; [9] -> Actions, [10] -> Social actions, [11] -> function(characters)
setup.monRewards.flyingLookout = [36,51,39,60,42,51,24,51,0,["realHypnoticGlance","baHypnoticGlance"],["hypnoticGlance"],null];
setup.monRewards.essenceSucker = [27,39,45,45,27,27,39,27,0,["energyDrainingKiss","baDrainingKiss","baEnergyDrainingKiss"],[],null];
setup.monRewards.oppressiveYoke = [54,36,60,48,54,48,42,36,0,["etherealChains","baEtherealChains"],[],null];

window.getMonRewards = function(monsterTypeString) {
	var reward = [];
	switch(monsterTypeString) {
		case "Flying Lookout":
			reward = setup.monRewards.flyingLookout;
			break;
		case "Essence-Sucker":
			reward = setup.monRewards.essenceSucker;
			break;
		case "Oppressive Yoke":
			reward = setup.monRewards.oppressiveYoke;
			break;
	}
	return reward;
}

// Tests

window.ccsTestPlayerAteFightOppressiveYoke = function() {
	var mon = createOppressiveYoke(1,0,1);
	State.variables.sc.startScene(
	"bs","fixed",["chPlayerCharacter"],[mon],"__Swamp ~ Western Path Lake__\nCountless dragonflies roam the shores of the lake in their quest for food, and the flapping of their wings adds ambience music to the scenery.",createEndConditionStoryBattleWithDraw("Quickstarts","Quickstarts","Quickstarts"),6,
	"FA BeatenSucker 2");
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiBattleAlgorithm();
		}
	}
	
	State.variables.sc.formatScenePassage();
	setRefreshSomeLustBattleScript();
}



