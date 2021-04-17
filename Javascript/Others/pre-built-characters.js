////////// PRE-BUILT CHARACTERS //////////
// This file provides functions that create each specific character with the appropiate attributes.
// This should make the StoryInit Passage more readable

// Characters
window.createPlayerCharacter = function() {
	var character = new Character("You" , "chPlayerCharacter");
	character.type = "candidate";
	
	character.setColors("Red","Crimson");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick");
	character.saList.push("baKissLips","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","taunt","baTease");
		// Don't push ("strokePussy","strokeBreasts","kissLips","frottage","frenchKiss","kneel","makeKneel","lickGroin","legHoldHead","mountFromBehind",
	//"penetratePussy","thrust","piston","finalPush",	"mountFaceToFace","getBlowjob","suckDick","lickPussy","interlockLegs","scissor");
	// Body
	// ("baKissLips","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","kick","coldGuts","taunt","baTease")
	character.addFemaleParts();
	// Others
	character.names.push("the young Human");
	character.assignFemeninePronouns();
	
	character.icon = function() {
		return "[img[img/charIcons/pcIcon.png]]";
	}
	
	character.refugeRooms = [["mapTrainingGrounds","playerRoom"]];
	
	return character;
};
window.createGoddessHerald = function() {
	var character = new Character( "Mysterious Woman" , "chGoddessHerald" );
	character.setColors("DarkOrchid","DarkOrchid");
	// Stats
	character.physique.value = 16;
	character.agility.value = 16;
	character.resilience.value = 16;
	character.will.value = 10;
	character.intelligence.value = 16;
	character.perception.value = 16;
	character.empathy.value = 16;
	character.charisma.value = 10;
	character.luck.value = 16;
	// Moves
	character.saList.push("strokePussy");
	character.saList.push("strokeBreasts");
	character.saList.push("kissLips");
	character.saList.push("frenchKiss");
	character.saList.push("takeFromBehind");
	character.saList.push("thrust");
	character.saList.push("hypnoticGlance");
	// Body
	character.addFemaleParts();
	character.addBodypart("tail","tail");
	// Others
	character.assignFemeninePronouns();
	character.makeVirginitiesUnknown();
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/varyonte-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/varyonte-avatar.png]]";
	}
	//character.icon = function() { // Does she need an icon?
	//	return "[img[img/charIcons/nashIcon.png]]";
	
	character.fullPortraitL = "img/portraits/varyonte-full.png";
	character.avatarL = "img/portraits/varyonte-avatar.png";
	// character.iconL = "img/charIcons/nashIcon.png"; // Does she need an icon?
	
	return character;
};
window.createDrishtya = function() {
	var character = new Character( "Drishtya" , "chDummy" );
	character.setColors("DarkOrchid","DarkOrchid");
	
	// Others
	character.assignFemeninePronouns();
	
	delete character.combatAffinities;
	delete character.tastes;
	
	return character;
}

window.createNashillbyir = function() {
	var character = new Character("Nash", "chNash");
	character.type = "candidate";
	
	character.setColors("coral","coral");
	
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick");
	/* ["embers","freezeFeet","sparkingRubbing"]
	character.saList.push("baKissLips","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","taunt","baTease");
	*/
	character.saList.push("baKissLips","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","taunt","sparkingRubbing");
	
	
	// Body
	character.addFemaleParts();
	// Others
	character.names.push("Nashillbyir");
	character.names.push("the Ashwalker");
	character.names.push("the fit Human");
	character.assignFemeninePronouns();
	//character.mapAi.type = "protagonist";
	
	character.likedTopics.push("training");
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/nash-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/nash-avatar.png]]";
	}
	character.icon = function() {
		return "[img[img/charIcons/nashIcon.png]]";
	}
	
	character.fullPortraitL = "img/portraits/nash-full.png";
	character.avatarL = "img/portraits/nash-avatar.png";
	character.iconL = "img/charIcons/nashIcon.png";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chNash");
	
	// Affinities
	character.combatAffinities.physical.strength += 5;
	character.combatAffinities.weapon.strength += 10;
	character.combatAffinities.weapon.resistance += 10;
	character.combatAffinities.magic.frailty += 5;
	character.combatAffinities.pain.resistance += 10;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 95;
	character.tastes.oral.w = 90;
	//character.tastes.fullsex.w = 115;
	character.tastes.talk.w = 105;
	character.tastes.useBreasts.w = 95;
	character.tastes.useHands.w = 105;
	character.tastes.useLegs.w = 105;
	character.tastes.targetMouth.w = 105;
	character.tastes.domination.w = 95;
	character.tastes.submission.w = 95;
	character.tastes.usePain.w = 70;
		
	// Drives
	setDriveValues(character.dImprovement,1800,4);
	setDriveValues(character.dPleasure,650,2);
	setDriveValues(character.dLove,750,2);
	setDriveValues(character.dCooperation,900,2);
	setDriveValues(character.dDomination,450,1);
	setDriveValues(character.dAmbition,500,1);
	
	// Attributes
	character.setBaseAttributes(14,16,12,8,10,14,10,12,12);
	character.setAffinities(1.1,1.2,1,0.8,0.9,1.1,0.9,1,1);
	
	
	character.refugeRooms = [["mapTrainingGrounds","nashRoom"]];
	
	return character;
}

window.createPadmiri = function() {
	var character  = new Character("Mir","chMir");
	character.type = "candidate";
	character.race = "leirien";
	
	character.setColors("palegreen","palegreen");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick","vinesHoldArms");
	/* ["embers","freezeFeet","sparkingRubbing"]
	character.saList.push("baKissLips","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","taunt","baTease");
	*/
	character.saList.push("baKissLips","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","freezeFeet","taunt","baTease","baVineArmLock","baRelaxingScent");
	
	character.extraSocIntList.push("relaxingScent");
	
	// Body
	character.addFemaleParts();
	// Others
	character.names.push("Padmiri");
	character.names.push("the gentle Leirien");
	character.names.push("the attractive Leirien");
	character.assignFemeninePronouns();
	//character.mapAi.type = "protagonist";
	
	character.likedTopics.push("flora");
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/mir-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/mir-avatar.png]]";
	}
	
	character.icon = function() {
		return "[img[img/charIcons/mirIcon.png]]";
	}
	
	character.fullPortraitL = "img/portraits/mir-full.png";
	character.avatarL = "img/portraits/mir-avatar.png";
	character.iconL = "img/charIcons/mirIcon.png";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chMir");
	
	// Affinities
	character.combatAffinities.magic.strength += 5;
	character.combatAffinities.fire.weakness += 50;
	character.combatAffinities.pain.resistance += 10;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 105;
	//character.tastes.fullsex.w = 105;
	character.tastes.useDick.w = 95;
	character.tastes.usePussy.w = 105;
	character.tastes.useEyes.w = 110;
	character.tastes.useLegs.w = 105;
	character.tastes.targetPussy.w = 105;
	character.tastes.targetAnus.w = 90;
	character.tastes.targetEyes.w = 110;
	character.tastes.top.w = 105;
	character.tastes.bottom.w = 105;
	character.tastes.domination.w = 95;
	character.tastes.submission.w = 95;
	character.tastes.hypnosis.w = 105;
	character.tastes.receivePain.w = 50;
	character.tastes.usePain.w = 30;
	character.tastes.denial.w = 30;
	
	// Base mood
	character.baseMood.friendly = 0;	
	
	// Drives
	setDriveValues(character.dImprovement,900,2);
	setDriveValues(character.dPleasure,450,1);
	setDriveValues(character.dLove,750,2);
	setDriveValues(character.dCooperation,1800,4);
	setDriveValues(character.dDomination,100,0);
	setDriveValues(character.dAmbition,800,2);
	
	// Attributes
	character.setBaseAttributes(8,10,14,12,12,16,14,10,12);
	character.setAffinities(0.8,0.9,1.1,1,1,1.2,1.1,0.9,1);
	
	character.refugeRooms = [["mapTrainingGrounds","mirRoom"]];
	
	return character;
}

window.createCarine = function() {
	var character  = new Character("Claw","chClaw");
	character.type = "candidate";
	character.race = "beastkin";
	
	character.setColors("gold","gold");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","biteNeck","mountDick");
	/* ["embers","freezeFeet","sparkingRubbing"]
	character.saList.push("baKissLips","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","taunt","baTease");
	*/
	character.saList.push("pounceFrontalD2P","pounceFrontalP2P","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","taunt","catAspect","baScratch"); // 
	
	// Body
	character.addFemaleParts();
	// Others
	character.names.push("Carine");
	character.names.push("Fiercest Claw");
	character.names.push("the fierce Beastkin");
	character.names.push("the tiger-girl");
	character.assignFemeninePronouns();
	//character.mapAi.type = "protagonist";
	
	character.likedTopics.push("fauna");
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/claw-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/claw-avatar.png]]";
	}
	character.icon = function() {
		return "[img[img/charIcons/clawIcon.png]]";
	}
	
	character.fullPortraitL = "img/portraits/claw-full.png";
	character.avatarL = "img/portraits/claw-avatar.png";
	character.iconL = "img/charIcons/clawIcon.png";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chClaw");
	
	// Affinities
	character.combatAffinities.pounce.strength += 10;
	character.combatAffinities.pounce.resistance += 10;
	character.combatAffinities.magic.frailty += 10;
	character.combatAffinities.social.weakness += 10;
	character.combatAffinities.pain.strength += 10;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 95;
	character.tastes.oral.w = 95;
	character.tastes.talk.w = 85;
	//character.tastes.fullsex.w = 120;
	character.tastes.useDick.w = 110;
	character.tastes.useBreasts.w = 90;
	character.tastes.useMouth.w = 90;
	character.tastes.useEyes.w = 90;
	character.tastes.useTail.w = 105;
	character.tastes.targetDick.w = 95;
	character.tastes.targetPussy.w = 105;
	character.tastes.targetBreasts.w = 95;
	character.tastes.top.w = 110;
	character.tastes.bottom.w = 60;
	character.tastes.domination.w = 120;
	character.tastes.submission.w = 90;
	character.tastes.teasing.w = 95;
	character.tastes.romantic.w = 80;
	character.tastes.receivePain.w = 30;
	character.tastes.usePain.w = 100;
	character.tastes.denial.w = 50;
	
	// Base mood
	character.baseMood.angry = 50;
	
	// Drives
	setDriveValues(character.dImprovement,1400,3);
	setDriveValues(character.dPleasure,750,2);
	setDriveValues(character.dLove,100,0);
	setDriveValues(character.dCooperation,0,0);
	setDriveValues(character.dDomination,1800,4);
	setDriveValues(character.dAmbition,1200,3);
	
	// Attributes
	character.setBaseAttributes(16,14,10,14,12,10,8,12,12);
	character.setAffinities(1.2,1.1,0.9,1.1,1,0.9,0.8,1,1);
	
	character.refugeRooms = [["mapTrainingGrounds","clawRoom"]];
	
	return character;
}

window.createValtan = function() {
	var character  = new Character("Val","chVal");
	character.type = "candidate";
	character.race = "shapeshifter";
	
	character.setColors("cornflowerblue","cornflowerblue");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","slimeHug","mountDick");
	/* ["embers","freezeFeet","sparkingRubbing"]
	character.saList.push("baKissLips","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","taunt","baTease");
	*/
	character.saList.push("baKissLips","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","coldGuts","baTease","embers","freezeFeet","sparkingRubbing");
	// Body
	character.addFemaleParts();
	// Others
	character.names.push("Valtan");
	character.names.push("the mischievous Shapeshifter");
	character.names.push("the cunning woman");
	character.assignFemeninePronouns();
	//character.mapAi.type = "protagonist";
	
	character.likedTopics.push("dramas");
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/val-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/val-avatar.png]]";
	}
	character.icon = function() {
		return "[img[img/charIcons/valIcon.png]]";
	}
	
	character.fullPortraitL = "img/portraits/val-full.png";
	character.avatarL = "img/portraits/val-avatar.png";
	character.iconL = "img/charIcons/valIcon.png";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chVal");
	
	// Affinities
	character.combatAffinities.sex.strength += 5;
	character.combatAffinities.sex.weakness += 5;
	character.combatAffinities.physical.frailty += 10;
	character.combatAffinities.social.strength += 5;
	character.combatAffinities.seduction.strength += 5;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 105;
	character.tastes.oral.w = 90;
	character.tastes.talk.w = 105;
	//character.tastes.fullsex.w = 110;
	character.tastes.usePussy.w = 115;
	character.tastes.useAnus.w = 105;
	character.tastes.useEyes.w = 105;
	character.tastes.useLegs.w = 105;
	character.tastes.targetDick.w = 105;
	character.tastes.targetPussy.w = 105;
	character.tastes.top.w = 110;
	character.tastes.teasing.w = 105;
	character.tastes.charm.w = 110;
	character.tastes.receivePain.w = 60;
	character.tastes.usePain.w = 60;
	character.tastes.denial.w = 60;
	
	// Drives
	setDriveValues(character.dImprovement,850,2);
	setDriveValues(character.dPleasure,1800,4);
	setDriveValues(character.dLove,850,2);
	setDriveValues(character.dCooperation,350,1);
	setDriveValues(character.dDomination,1200,3);
	setDriveValues(character.dAmbition,500,1);
	
	// Attributes
	character.setBaseAttributes(10,10,10,10,14,12,16,14,14);
	character.setAffinities(0.9,0.9,0.9,0.9,1.1,1,1.2,1.1,1.1);
	
	character.refugeRooms = [["mapTrainingGrounds","valRoom"]];
	
	return character;
}

window.createMaaterasu = function() {
	var character  = new Character("Ate","chAte");
	character.type = "candidate";
	character.race = "aiishen";
	
	character.setColors("mediumvioletred","palevioletred");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick");
	/* ["embers","freezeFeet","sparkingRubbing"]
	character.saList.push("baKissLips","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","taunt","baTease");
	*/
	character.saList.push("baKissLips","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","embers","freezeFeet","sparkingRubbing","lightningDarts");
	// Body
	character.addFemaleParts();
	// Others
	character.names.push("Maaterasu");
	character.names.push("the talented Aiishen");
	character.assignFemeninePronouns();
	//character.mapAi.type = "protagonist";
	
	character.likedTopics.push("music");
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/ate-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/ate-avatar.png]]";
	}
	
	character.icon = function() {
		return "[img[img/charIcons/ateIcon.png]]";
	}
	
	character.fullPortraitL = "img/portraits/ate-full.png";
	character.avatarL = "img/portraits/ate-avatar.png";
	character.iconL = "img/charIcons/ateIcon.png";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chAte");
	
	// Affinities
	character.combatAffinities.physical.resistance += 10;
	character.combatAffinities.physical.frailty += 20;
	character.combatAffinities.magic.strength += 10;
	character.combatAffinities.magic.weakness += 20;
	character.combatAffinities.social.resistance += 10;
	character.combatAffinities.social.frailty += 10;
	character.combatAffinities.pain.weakness += 10;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 95;
	character.tastes.oral.w = 95;
	character.tastes.talk.w = 105;
	//character.tastes.fullsex.w = 110;
	character.tastes.usePussy.w = 105;
	character.tastes.useDick.w = 105;
	character.tastes.targetDick.w = 105;
	character.tastes.targetPussy.w = 105;
	character.tastes.domination.w = 110;
	character.tastes.submission.w = 110;
	character.tastes.romantic.w = 110;
	character.tastes.hypnosis.w = 105;
	
	// Base mood
	character.baseMood.bored = 50;
	
	// Drives
	setDriveValues(character.dImprovement,1700,4);
	setDriveValues(character.dPleasure,200,0);
	setDriveValues(character.dLove,200,0);
	setDriveValues(character.dCooperation,200,0);
	setDriveValues(character.dDomination,200,0);
	setDriveValues(character.dAmbition,850,2);
	
	// Attributes
	character.setBaseAttributes(10,12,14,10,16,14,10,10,12);
	character.setAffinities(0.9,1,1.1,0.9,1.2,1.1,0.9,0.9,1);
	
	character.refugeRooms = [["mapTrainingGrounds","ateRoom"]];
	
	return character;
}

// Support functions

window.teachBasicMovesToCharacters = function(charKey) {
	var movesList = ["kneel","makeKneel","lickGroin","legHoldHead","mountFromBehind","penetratePussy","thrust","piston","finalPush","getBlowjob","suckDick",
				"strokeDick","lickPussy","interlockLegs","scissor","pushHipsBack","spanking","fuckFace","rideFace"];
	for ( var move of movesList ) {
		if ( State.variables[charKey].saList.includes(move) == false ) {
			State.variables[charKey].saList.push(move);
		}
	}
}

window.setUpTestsRoom = function() {
	for ( var charKey of ["chPlayerCharacter","chNash","chMir","chClaw","chVal","chAte"] ) {
		teachBasicMovesToCharacters(charKey);
		State.variables[charKey].sortSaList();
	}	
}

window.setUpRelations = function() {
	for ( var i of ["chPlayerCharacter","chNash","chMir","chClaw","chVal","chAte"] ) {
		// Max bars
		recalculateMaxBars(i);
		// Update drives
		updateCharacterDrives(i);
		// Create relations
		for ( var l of ["chPlayerCharacter","chNash","chMir","chClaw","chVal","chAte"] ) {
			if ( i != l ) {
				gC(i).relations[l] = new Relation(l);
			}
		}
	}
	// Mir - Nash
	State.variables.chMir.relations.chNash.friendship.stv = 100;
	State.variables.chNash.relations.chMir.friendship.stv = 100;
	// Mir - Val
	State.variables.chMir.relations.chVal.friendship.stv = 100;
	State.variables.chVal.relations.chMir.friendship.stv = 100;
	State.variables.chMir.relations.chVal.sexualTension.stv = 350;
	State.variables.chVal.relations.chMir.sexualTension.stv = 350;
	State.variables.chMir.relations.chVal.submission.stv = 350;
	State.variables.chVal.relations.chMir.domination.stv = 350;
	// Mir - Claw
	State.variables.chMir.relations.chClaw.enmity.stv = 350;
	State.variables.chClaw.relations.chMir.enmity.stv = 350;
	
	// Nash - Val
	State.variables.chVal.relations.chNash.friendship.stv = 350;
	State.variables.chNash.relations.chVal.friendship.stv = 350;
	State.variables.chNash.relations.chVal.sexualTension.stv = 100;
	State.variables.chVal.relations.chNash.sexualTension.stv = 100;
	// Nash - Claw
	State.variables.chNash.relations.chClaw.sexualTension.stv = 350;
	State.variables.chClaw.relations.chNash.sexualTension.stv = 350;
	State.variables.chNash.relations.chClaw.enmity.stv = 350;
	State.variables.chClaw.relations.chNash.enmity.stv = 350;
	State.variables.chNash.relations.chClaw.rivalry.stv = 350;
	State.variables.chClaw.relations.chNash.rivalry.stv = 350;
	
	// Val - Claw
	State.variables.chVal.relations.chClaw.friendship.stv = 100;
	State.variables.chClaw.relations.chVal.friendship.stv = 100;
	State.variables.chVal.relations.chClaw.sexualTension.stv = 350;
	State.variables.chClaw.relations.chVal.sexualTension.stv = 350;
	State.variables.chVal.relations.chClaw.rivalry.stv = 350;
	State.variables.chClaw.relations.chVal.rivalry.stv = 350;
	
	feedCandidatesRelationshipGoals();
}

