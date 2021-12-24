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
	character.luck.value = 0;
	
	// Affinities
	character.combatAffinities.holy.weakness += 200;
	character.combatAffinities.hypnosis.strength += 15;
	character.combatAffinities.hypnosis.weakness += 15;
	character.combatAffinities.useEyes.strength += 15;
	character.combatAffinities.useEyes.weakness += 15;
	
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
	character.luck.value = 0;
	
	// Affinities
	character.combatAffinities.holy.weakness += 200;
	character.combatAffinities.fire.weakness += 50;
	character.combatAffinities.drain.strength += 15;
	character.combatAffinities.spore.strength += 15;
	character.combatAffinities.useMouth.strength += 25;
	character.combatAffinities.targetMouth.resistance += 25;
	
	// Moves
	character.saList = ["doNothing","struggle","baEnergyDrainingKiss","baDrainingKiss","pounceFrontal","tackle","baDrainingRoots"];
	
	// Assign to State.variables and return varName
	State.variables[nameVar] = character;
	
	// Finish initialization
	assignMaxBarsMediumMonster(nameVar);
	
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

