 ////////// PRE-BUILT CHARACTERS //////////
// This file provides functions that create each specific character with the appropiate attributes.
// This should make the StoryInit Passage more readable

// Characters
window.createPlayerCharacter = function() {
	var character = new Character("You" , "chPlayerCharacter");
	character.type = "candidate";
	
	character.setColors("Red","Crimson");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick","holdHands");
	character.saList.push("baPressDown","baKissLips","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","taunt","baTease","runAway");
		// Don't push ("strokePussy","strokeBreasts","kissLips","frottage","frenchKiss","kneel","makeKneel","lickGroin","legHoldHead","mountFromBehind",
	//"penetratePussy","thrust","piston","finalPush",	"mountFaceToFace","getBlowjob","suckDick","lickPussy","interlockLegs","scissor");
	// Body
	// ("baKissLips","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","kick","coldGuts","taunt","baTease")
	character.addFemaleParts();
	// Others
	character.names.push("the young Human");
	character.assignFemeninePronouns();
	
	character.icon = "pcIcon";
	
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
	character.chestSize = "big";
	character.dickSize = "big";
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
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick","runAway");
	character.saList.push("baPressDown","baKissLips","baStrokeDick","baStrokePussy","pounceFrontal","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","taunt","baTease","embers","freezeFeet","sparkingRubbing");
	
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
	character.icon = "nashIcon";
	
	character.fullPortraitL = "img/portraits/nash-full.png";
	character.avatarL = "img/portraits/nash-avatar.png";
	//character.iconL = "img/charIcons/nashIcon.png";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chNash");
	
	// Affinities
	character.combatAffinities.physical.strength += 5;
	character.combatAffinities.weapon.strength += 10;
	character.combatAffinities.weapon.rst += 10;
	character.combatAffinities.magic.frlt += 5;
	character.combatAffinities.pain.rst += 10;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 95;
	character.tastes.oral.w = 90;
	character.tastes.talk.w = 105;
	character.tastes.fullsex.w = 110;
	character.tastes.useDick.w = 120;
	character.tastes.targetDick.w = 115;
	character.tastes.targetPussy.w = 110;
	character.tastes.targetAnus.w = 105;
	character.tastes.useHands.w = 110;
	character.tastes.bondage.w = 115;
	character.tastes.useLegs.w = 105;
	character.tastes.usePain.w = 110;
	character.tastes.top.w = 110;
	character.tastes.bottom.w = 105;
	character.tastes.receivePain.w = 110;
	character.tastes.useBreasts.w = 90;
	character.tastes.targetBreasts.w = 95;
	character.tastes.charm.w = 105;
	character.tastes.teasing.w = 105;
	rankSexPreferences(character.tastes);
		
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
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick","vinesHoldArms","holdHands");
	
	character.saList.push("baPressDown","baKissLips","baStrokeDick","baStrokePussy","pounceFrontal","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","embers","freezeFeet","sparkingRubbing","taunt","baTease","baVineArmLock","baRelaxingScent","runAway");
	character.extraSocIntList.push("relaxingScent");
	
	// Body
	character.addFemaleParts();
	character.chestSize = "sma";
	
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
	
	character.icon = "mirIcon";
	
	character.fullPortraitL = "img/portraits/mir-full.png";
	character.avatarL = "img/portraits/mir-avatar.png";
	//character.iconL = "img/charIcons/mirIcon.png";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chMir");
	
	// Affinities
	character.combatAffinities.magic.strength += 5;
	character.combatAffinities.drain.strength += 15;
	character.combatAffinities.drain.wkn += 10;
	character.combatAffinities.fire.wkn += 25;
	character.combatAffinities.physical.rst += 5;
	character.combatAffinities.magic.rst += 5;
	character.combatAffinities.pain.rst += 10;
	character.combatAffinities.thunder.rst += 25;
	character.combatAffinities.spore.rst += 50;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 110;
	character.tastes.talk.w = 105;
	character.tastes.oral.w = 115;
	character.tastes.usePussy.w = 115;
	character.tastes.targetPussy.w = 105;
	character.tastes.targetDick.w = 105;
	character.tastes.useAnus.w = 85;
	character.tastes.useMouth.w = 115;
	character.tastes.targetMouth.w = 120;
	character.tastes.targetAnus.w = 85;
	character.tastes.useBreasts.w = 110;
	character.tastes.targetBreasts.w = 105;
	character.tastes.useEyes.w = 110;
	character.tastes.targetEyes.w = 110;
	character.tastes.top.w = 115;
	character.tastes.bottom.w = 115;
	character.tastes.domination.w = 85;
	character.tastes.submission.w = 90;
	character.tastes.bondage.w = 65;
	character.tastes.charm.w = 110;
	character.tastes.draining.w = 110;
	character.tastes.romantic.w = 115;
	character.tastes.usePain.w = 70;
	character.tastes.receivePain.w = 80;
	character.tastes.denial.w = 80;
	rankSexPreferences(character.tastes);
	
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
	
	character.addBodypart("tail","tail");
	
	character.setColors("gold","gold");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","biteNeck","mountDick");
	
	character.saList.push("baPressDown","baKissLips","baStrokeDick","baStrokePussy","pounceFrontal","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","taunt","baTease","embers","freezeFeet","sparkingRubbing","catAspect","baScratch","runAway"); // 
	
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
	character.icon = "clawIcon";
	
	character.fullPortraitL = "img/portraits/claw-full.png";
	character.avatarL = "img/portraits/claw-avatar.png";
	//character.iconL = "img/charIcons/clawIcon.png";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chClaw");
	
	// Affinities
	character.combatAffinities.pounce.strength += 10;
	character.combatAffinities.pounce.rst += 10;
	character.combatAffinities.magic.frlt += 10;
	character.combatAffinities.social.wkn += 10;
	character.combatAffinities.pain.strength += 10;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 95;
	character.tastes.oral.w = 105;
	character.tastes.fullsex.w = 115;
	character.tastes.talk.w = 85;
	character.tastes.useDick.w = 115;
	character.tastes.targetDick.w = 90;
	character.tastes.targetPussy.w = 110;
	character.tastes.usePussy.w = 110;
	character.tastes.targetAnus.w = 105;
	character.tastes.useBreasts.w = 95;
	character.tastes.useMouth.w = 90;
	character.tastes.targetMouth.w = 110;
	character.tastes.useLegs.w = 105;
	character.tastes.useTail.w = 95;
	character.tastes.top.w = 110;
	character.tastes.bottom.w = 90;
	character.tastes.domination.w = 120;
	character.tastes.submission.w = 75;
	character.tastes.teasing.w = 90;
	character.tastes.romantic.w = 80;
	character.tastes.bondage.w = 110;
	character.tastes.usePain.w = 120;
	character.tastes.denial.w = 110;
	rankSexPreferences(character.tastes);
	
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
	
	// Virginities
	character.virginities.fKiss.taken = true;
	character.virginities.fKiss.taker = "chDummy";
	character.virginities.fKiss.takerName = "Oren";
	character.virginities.fKiss.method = "storyGiven";
	character.virginities.fKiss.ctxt = "storyGiven";
	
	character.refugeRooms = [["mapTrainingGrounds","clawRoom"]];
	
	return character;
}

window.createValtan = function() {
	var character  = new Character("Val","chVal");
	character.type = "candidate";
	character.race = "shapeshifter";
	
	character.setColors("cornflowerblue","cornflowerblue");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","slimeHug","mountDick","holdHands");
	/* ["embers","freezeFeet","sparkingRubbing"]
	character.saList.push("baKissLips","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","taunt","baTease");
	*/
	character.saList.push("baPressDown","baKissLips","baStrokeDick","baStrokePussy","pounceFrontal","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","taunt","baTease","embers","freezeFeet","sparkingRubbing","runAway");
	
	// Body
	character.addFemaleParts();
	character.chestSize = "big";
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
	character.icon = "valIcon";
	
	character.fullPortraitL = "img/portraits/val-full.png";
	character.avatarL = "img/portraits/val-avatar.png";
	//character.iconL = "img/charIcons/valIcon.png";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chVal");
	
	// Affinities
	character.combatAffinities.sex.strength += 10;
	character.combatAffinities.sex.wkn += 5;
	character.combatAffinities.physical.frlt += 10;
	character.combatAffinities.social.strength += 5;
	character.combatAffinities.seduction.strength += 5;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 100;
	character.tastes.oral.w = 110;
	character.tastes.talk.w = 120;
	character.tastes.fullsex.w = 110;
	character.tastes.usePussy.w = 115;
	character.tastes.useDick.w = 110;
	character.tastes.targetDick.w = 105;
	character.tastes.useMouth.w = 110;
	character.tastes.targetMouth.w = 115;
	character.tastes.useEyes.w = 115;
	character.tastes.targetEyes.w = 115;
	character.tastes.useLegs.w = 110;
	character.tastes.targetAnus.w = 115;
	character.tastes.teasing.w = 115;
	character.tastes.charm.w = 110;
	character.tastes.top.w = 95;
	character.tastes.bottom.w = 95;
	character.tastes.domination.w = 110;
	character.tastes.submission.w = 110;
	character.tastes.teasing.w = 120;
	character.tastes.bondage.w = 70;
	character.tastes.denial.w = 120;
	character.tastes.romantic.w = 105;
	character.tastes.draining.w = 110;
	character.tastes.receivePain.w = 110;
	rankSexPreferences(character.tastes);
	
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
	
	// Virginities
	character.virginities.fSex.taken = true;
	character.virginities.fSex.taker = "chSil";
	character.virginities.fSex.takerName = "Sillan";
	character.virginities.fSex.method = "storyGiven";
	character.virginities.fSex.ctxt = "storyGiven";
	character.virginities.fKiss.taken = true;
	character.virginities.fKiss.taker = "chSil";
	character.virginities.fKiss.takerName = "Sillan";
	character.virginities.fKiss.method = "storyGiven";
	character.virginities.fKiss.ctxt = "storyGiven";
	character.virginities.tribbing.taken = true;
	character.virginities.tribbing.taker = "chSil";
	character.virginities.tribbing.takerName = "Sillan";
	character.virginities.tribbing.method = "storyGiven";
	character.virginities.tribbing.ctxt = "storyGiven";
	
	character.refugeRooms = [["mapTrainingGrounds","valRoom"]];
	
	return character;
}

window.createMaaterasu = function() {
	var character  = new Character("Ate","chAte");
	character.type = "candidate";
	character.race = "aiishen";
	
	character.setColors("palevioletred","palevioletred");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick");
	
	character.saList.push("baPressDown","baKissLips","baStrokeDick","baStrokePussy","pounceFrontal","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","taunt","baTease","embers","freezeFeet","sparkingRubbing","lightningDarts","runAway");
	
	// Body
	character.addFemaleParts();
	character.chestSize = "sma";
	// Others
	character.names.push("Maaterasu");
	character.names.push("the talented Aiishen");
	character.names.push("the taciturn sorcerer");
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
	
	character.icon = "ateIcon";
	
	character.fullPortraitL = "img/portraits/ate-full.png";
	character.avatarL = "img/portraits/ate-avatar.png";
	//character.iconL = "img/charIcons/ateIcon.png";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chAte");
	
	// Affinities
	character.combatAffinities.physical.rst += 5;
	character.combatAffinities.physical.frlt += 10;
	character.combatAffinities.magic.strength += 10;
	character.combatAffinities.magic.wkn += 25;
	character.combatAffinities.social.rst += 10;
	character.combatAffinities.social.frlt += 10;
	character.combatAffinities.pain.wkn += 10;
	character.combatAffinities.sex.wkn += 5;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 105;
	character.tastes.oral.w = 105;
	character.tastes.talk.w = 95;
	character.tastes.fullsex.w = 110;
	character.tastes.useDick.w = 110;
	character.tastes.targetDick.w = 110;
	character.tastes.usePussy.w = 110;
	character.tastes.targetPussy.w = 110;
	character.tastes.useLegs.w = 105;
	character.tastes.targetLegs.w = 105;
	character.tastes.useMouth.w = 105;
	character.tastes.useEyes.w = 85;
	character.tastes.targetEyes.w = 85;
	character.tastes.top.w = 105;
	character.tastes.bottom.w = 105;
	character.tastes.domination.w = 110;
	character.tastes.submission.w = 110;
	character.tastes.hypnosis.w = 110;
	character.tastes.charm.w = 95;
	character.tastes.romantic.w = 105;
	character.tastes.usePain.w = 95;
	character.tastes.receivePain.w = 85;
	rankSexPreferences(character.tastes);
	
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

// Artume
window.createArtume = function() {
	var character = new Character("Artume", "chArt");
	character.type = "candidate";
	
	character.setColors("mediumseagreen","mediumseagreen");
	
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick","holdHands");
	
	character.saList.push("baPressDown","baKissLips","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","taunt","embers","freezeFeet","runAway");
	
	
	// Body
	character.addFemaleParts();
	// Others
	character.names.push("Artume");
	character.names.push("the Gaanidan huntress");
	character.names.push("the nimble ranger");
	character.assignFemeninePronouns();
	
	character.likedTopics.push("fauna");
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/artume-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/artume-avatar.png]]";
	}
	character.icon = "artIcon";
	
	character.fullPortraitL = "img/portraits/artume-full.png";
	character.avatarL = "img/portraits/artume-avatar.png";
	//character.iconL = "img/charIcons/artIcon.png";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chArt");
	
	// Virginities
	character.makeSpecificVirginitiesUnknown(["fSex","pussy","anus"]);
	
	// Affinities
	character.combatAffinities.physical.rst += 10;
	character.combatAffinities.weapon.strength += 5;
	character.combatAffinities.pounce.strength += 5;
	character.combatAffinities.pounce.rst += 10;
	character.combatAffinities.sex.wkn += 5;
	character.combatAffinities.spore.rst += 10;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 105;
	character.tastes.fullsex.w = 110;
	character.tastes.usePussy.w = 115;
	character.tastes.useAnus.w = 105;
	character.tastes.useBreasts.w = 105;
	character.tastes.useMouth.w = 110;
	character.tastes.targetTail.w = 110;
	character.tastes.bondage.w = 120;
	character.tastes.useLegs.w = 105;
	character.tastes.usePain.w = 110;
	character.tastes.bottom.w = 110;
	character.tastes.submission.w = 120;
	character.tastes.receivePain.w = 110;
	character.tastes.draining.w = 110;
	character.tastes.hypnosis.w = 105;
	character.tastes.talk.w = 85;
	character.tastes.charm.w = 95;
	character.tastes.romantic.w = 95;
	rankSexPreferences(character.tastes);
		
	// Drives
	setDriveValues(character.dImprovement,1000,4);
	setDriveValues(character.dPleasure,1350,5);
	setDriveValues(character.dLove,600,2);
	setDriveValues(character.dCooperation,350,1);
	setDriveValues(character.dDomination,350,1);
	setDriveValues(character.dAmbition,350,1);
	
	// Attributes
	character.setBaseAttributes(10,12,12,9,11,13,10,11,11);
	character.setAffinities(0.9,1.1,1.1,0.8,1,1.2,0.9,1,1);
	
	character.refugeRooms = [["mapTrainingGrounds","storage"]];
	
	return character;
}

// Warmest Hope
window.createWarmestHope = function() {
	var character  = new Character("Hope","chHope");
	character.type = "candidate";
	character.race = "beastkin";
	
	character.addBodypart("tail","tail");
	
	character.setColors("darkorange","darkorange");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick","biteNeck");
	/* ["embers","freezeFeet","sparkingRubbing"]
	character.saList.push("baKissLips","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","taunt","baTease");
	*/
	character.saList.push("baPressDown","baKissLips","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","embers","freezeFeet","sparkingRubbing","coldGuts","taunt","baTease","kick","flamingFan","flaringFeint","runAway");
	// Body
	character.addFemaleParts();
	// Others
	character.names.push("Warmest Hope");
	character.names.push("Hope");
	character.names.push("the daring fox-girl");
	character.names.push("the outspoken Beastkin");
	character.names.push("Ruri");
	character.assignFemeninePronouns();
	
	character.likedTopics.push("flora","music");
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/hope-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/hope-avatar.png]]";
	}
	
	character.icon = "hopeIcon";
	
	character.fullPortraitL = "img/portraits/hope-full.png";
	character.avatarL = "img/portraits/hope-avatar.png";
	//character.iconL = "img/charIcons/hopeIcon.png";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chHope");
	
	// Affinities
	character.combatAffinities.magic.strength += 5;
	character.combatAffinities.fire.strength += 5;
	character.combatAffinities.ice.wkn += 5;
	character.combatAffinities.social.strength += 10;
	character.combatAffinities.social.wkn += 10;
	character.combatAffinities.pain.rst += 10;
	character.combatAffinities.pounce.strength += 5;
	character.combatAffinities.pounce.rst += 5;
	
	// Personality
		// Tastes
	character.tastes.talk.w = 110;
	character.tastes.fullsex.w = 105;
	character.tastes.oral.w = 105;
	character.tastes.usePussy.w = 110;
	character.tastes.targetPussy.w = 105;
	character.tastes.targetDick.w = 105;
	character.tastes.targetMouth.w = 115;
	character.tastes.useMouth.w = 90;
	character.tastes.useEyes.w = 110;
	character.tastes.targetEyes.w = 105;
	character.tastes.useLegs.w = 110;
	character.tastes.top.w = 110;
	character.tastes.bottom.w = 90;
	character.tastes.domination.w = 95;
	character.tastes.submission.w = 85;
	character.tastes.charm.w = 105;
	character.tastes.teasing.w = 110;
	rankSexPreferences(character.tastes);
	
	// Base mood
	character.baseMood.dominant = 5;
	
	// Drives
	setDriveValues(character.dImprovement,1100,4);
	setDriveValues(character.dPleasure,600,2);
	setDriveValues(character.dLove,700,3);
	setDriveValues(character.dCooperation,1750,6);
	setDriveValues(character.dDomination,1100,4);
	setDriveValues(character.dAmbition,1500,5);
	
	// Attributes
	character.setBaseAttributes(12,12,10,16,14,8,10,14,12);
	character.setAffinities(1,1,0.9,1.2,1.1,0.8,0.9,1.1,1);
	
	character.refugeRooms = [["mapTrainingGrounds","publicBaths"]];
	
	return character;
}

// Sturdiest Rock
window.createSturdiestRock = function() {
	var character  = new Character("Rock","chRock");
	character.type = "candidate";
	character.race = "beastkin";
	
	character.addBodypart("tail","tail");
	
	character.setColors("cadetblue","cadetblue");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","biteNeck","mountDick","holdHands");
	
	character.saList.push("baPressDown","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","taunt","baScratch","freezeFeet","earthWall","quake","runAway"); // 
	
	// Body
	character.addMaleParts();
	// Others
	character.names.push("Rock");
	character.names.push("Sturdiest Rock");
	character.names.push("the kind Beastkin");
	character.names.push("the wolf-boy");
	character.names.push("Nou");
	character.assignMasculinePronouns();
	//character.mapAi.type = "protagonist";
	
	character.likedTopics.push("fauna");
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/rock-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/rock-avatar.png]]";
	}
	character.icon = "rockIcon";
	
	character.fullPortraitL = "img/portraits/rock-full.png";
	character.avatarL = "img/portraits/rock-avatar.png";
	//character.iconL = "img/charIcons/rockIcon.png";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chRock");
	
	// Affinities
	character.combatAffinities.pounce.strength += 5;
	character.combatAffinities.pounce.rst += 5;
	character.combatAffinities.fire.wkn += 10;
	character.combatAffinities.magic.frlt += 10;
	character.combatAffinities.social.wkn += 5;
	character.combatAffinities.pain.rst += 10;
	character.combatAffinities.physical.rst += 10;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 105;
	character.tastes.oral.w = 105;
	character.tastes.useDick.w = 110;
	character.tastes.useMouth.w = 115;
	character.tastes.targetPussy.w = 110;
	character.tastes.targetMouth.w = 90;
	character.tastes.targetEyes.w = 105;
	character.tastes.targetBreasts.w = 105;
	character.tastes.top.w = 90;
	character.tastes.bottom.w = 110;
	character.tastes.domination.w = 80;
	character.tastes.submission.w = 95;
	character.tastes.charm.w = 105;
	character.tastes.romantic.w = 110;
	character.tastes.usePain.w = 105;
	rankSexPreferences(character.tastes);
	
	// Base mood
	character.baseMood.friendly = 5;
	
	// Drives
	setDriveValues(character.dImprovement,750,3);
	setDriveValues(character.dPleasure,650,2);
	setDriveValues(character.dLove,1000,4);
	setDriveValues(character.dCooperation,1500,5);
	setDriveValues(character.dDomination,300,1);
	setDriveValues(character.dAmbition,600,2);
	
	// Attributes
	character.setBaseAttributes(14,12,16,14,12,10,12,8,10);
	character.setAffinities(1.1,1,1.2,1.1,0.9,1,1,0.8,0.9);
	
	character.refugeRooms = [["mapTrainingGrounds","storage"]];
	
	return character;
}

// Nersmias
window.createNersmias = function() {
	var character  = new Character("Nersmias","chNer");
	character.type = "candidate";
	character.race = "shapeshifter";
	
	character.setColors("MediumOrchid","MediumOrchid");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","biteNeck","mountDick");
	
	character.saList.push("baPressDown","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","taunt","freezeFeet","sparkingRubbing","embers","realHypnoticGlance","slimeHug","baHypnoticGlance","baOrderKneeling","baOrderMasturbation","baCorrodeMind","runAway"); // 
	
	// Body
	character.addMaleParts();
	// Others
	character.names.push("Nersmias");
	character.names.push("Nersmias");
	character.names.push("Nersmias");
	character.names.push("the strict priest");
	character.names.push("the dutiful Shapeshifter");
	character.names.push("the watcher of order");
	character.assignMasculinePronouns();
	//character.mapAi.type = "protagonist";
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/nersmias-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/nersmias-avatar.png]]";
	}
	character.icon = "nerIcon";
	
	character.fullPortraitL = "img/portraits/nersmias-full.png";
	character.avatarL = "img/portraits/nersmias-avatar.png";
	//character.iconL = "img/charIcons/nerIcon.png";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chNer");
	
	// Affinities
	character.combatAffinities.seduction.rst += 10;
	character.combatAffinities.pounce.frlt += 10;
	character.combatAffinities.ice.strength += 5;
	character.combatAffinities.hypnosis.strength += 10;
	character.combatAffinities.hypnosis.wkn += 10;
	
	// Virginities
	character.makeSpecificVirginitiesUnknown(["fSex","anus","dick","fKiss"]);
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 95;
	character.tastes.oral.w = 105;
	character.tastes.fullsex.w = 110;
	character.tastes.talk.w = 105;
	character.tastes.useDick.w = 105;
	character.tastes.useMouth.w = 105;
	character.tastes.useEyes.w = 115;
	character.tastes.useHands.w = 110;
	character.tastes.targetPussy.w = 105;
	character.tastes.targetAnus.w = 110;
	character.tastes.targetBreasts.w = 105;
	character.tastes.top.w = 105;
	character.tastes.domination.w = 110;
	character.tastes.bondage.w = 105;
	character.tastes.hypnosis.w = 115;
	character.tastes.usePain.w = 115;
	character.tastes.denial.w = 110;
	rankSexPreferences(character.tastes);
	
	// Base mood
	character.baseMood.friendly = 5;
	
	// Drives
	setDriveValues(character.dImprovement,600,2);
	setDriveValues(character.dPleasure,300,1);
	setDriveValues(character.dLove,300,1);
	setDriveValues(character.dCooperation,300,1);
	setDriveValues(character.dDomination,900,3);
	setDriveValues(character.dAmbition,1200,4);
	
	// Attributes
	character.setBaseAttributes(13,15,15,17,17,15,13,19,11);
	character.setAffinities(0.9,1,1,1.1,1.1,1,0.9,1.2,0.8);
	
	character.refugeRooms = [["mapTrainingGrounds","storage"]];
	
	return character;
}

// Mesquelles
window.createMesquelles = function() {
	var character  = new Character("Mesquelles","chMes");
	character.type = "candidate";
	character.race = "shapeshifter";
	
	character.setColors("hotpink","hotpink");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","slimeHug","mountDick","holdHands");
	
	character.saList.push("baPressDown","baKissLips","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","coldGuts","baTease","taunt","embers","freezeFeet","sparkingRubbing","runAway");
	// Body
	character.addFemaleParts();
	character.chestSize = "big";
	// Others
	character.names.push("Mesquelles");
	character.names.push("Mesquelles");
	character.names.push("Mesquelles");
	character.names.push("the daydreaming Shapeshifter");
	character.names.push("the creative girl");
	character.assignFemeninePronouns();
	//character.mapAi.type = "protagonist";
	
	character.likedTopics.push("dramas");
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/mesquelles-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/mesquelles-avatar.png]]";
	}
	character.icon = "mesIcon";
	
	character.fullPortraitL = "img/portraits/mesquelles-full.png";
	character.avatarL = "img/portraits/mesquelles-avatar.png";
	//character.iconL = "img/charIcons/mesIcon.png";
	
	// Virginities
	character.makeSpecificVirginitiesUnknown(["fSex","tribbing","pussy","dick","fKiss"]);
	
	// Affinities
	character.combatAffinities.magic.strength += 5;
	character.combatAffinities.magic.wkn += 5;
	character.combatAffinities.physical.frlt += 5;
	character.combatAffinities.physical.wkn += 5;
	character.combatAffinities.social.strength += 5;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 105;
	character.tastes.oral.w = 105;
	character.tastes.talk.w = 115;
	character.tastes.fullsex.w = 105;
	character.tastes.usePussy.w = 105;
	character.tastes.useBreasts.w = 105;
	character.tastes.useEyes.w = 110;
	character.tastes.useHands.w = 125;
	character.tastes.useLegs.w = 115;
	character.tastes.targetDick.w = 110;
	character.tastes.targetPussy.w = 115;
	character.tastes.targetBreasts.w = 115;
	character.tastes.targetHands.w = 105;
	character.tastes.targetLegs.w = 105;
	character.tastes.teasing.w = 105;
	character.tastes.charm.w = 110;
	character.tastes.romantic.w = 105;
	character.tastes.bondage.w = 80;
	character.tastes.romantic.w = 110;
	rankSexPreferences(character.tastes);
	
	// Drives
	setDriveValues(character.dImprovement,1350,4);
	setDriveValues(character.dPleasure,1350,4);
	setDriveValues(character.dLove,600,2);
	setDriveValues(character.dCooperation,600,2);
	setDriveValues(character.dDomination,450,1);
	setDriveValues(character.dAmbition,750,2);
	
	// Attributes
	character.setBaseAttributes(12,16,10,14,16,18,14,12,14);
	character.setAffinities(0.9,1.1,0.8,1,1.1,1.2,1,0.9,0.9);
	
	character.refugeRooms = [["mapTrainingGrounds","publicBaths"]];
	
	return character;
}

// Sillan
window.createSillan = function() {
	var character  = new Character("Sillan","chSil");
	character.type = "candidate";
	character.race = "shapeshifter";
	
	character.setColors("lightskyblue","lightskyblue");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","slimeHug","mountDick","holdHands");
	
	character.saList.push("baPressDown","baKissLips","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","coldGuts","baTease","taunt","embers","freezeFeet","sparkingRubbing","runAway");
	// Body
	character.addFemaleParts();
	// Others
	character.names.push("Sillan");
	character.names.push("Sillan");
	character.names.push("Sillan");
	character.names.push("the shy Shapeshifter");
	character.names.push("the selfless girl");
	character.assignFemeninePronouns();
	//character.mapAi.type = "protagonist";
	
	character.likedTopics.push("dramas");
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/sillan-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/sillan-avatar.png]]";
	}
	character.icon = "silIcon";
	
	character.fullPortraitL = "img/portraits/sillan-full.png";
	character.avatarL = "img/portraits/sillan-avatar.png";
	//character.iconL = "img/charIcons/silIcon.png";
	
	// Affinities
	character.combatAffinities.social.strength += 5;
	character.combatAffinities.social.wkn += 5;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 105;
	character.tastes.oral.w = 105;
	character.tastes.talk.w = 100;
	character.tastes.fullsex.w = 105;
	character.tastes.usePussy.w = 110;
	character.tastes.useBreasts.w = 105;
	character.tastes.useEyes.w = 95;
	character.tastes.useLegs.w = 105;
	character.tastes.targetDick.w = 105;
	character.tastes.targetPussy.w = 110;
	character.tastes.targetBreasts.w = 105;
	character.tastes.targetHands.w = 110;
	character.tastes.targetEyes.w = 110;
	character.tastes.top.w = 90;
	character.tastes.bottom.w = 115;
	character.tastes.submission.w = 105;
	character.tastes.domination.w = 75;
	character.tastes.charm.w = 105;
	character.tastes.romantic.w = 110;
	character.tastes.denial.w = 70;
	character.tastes.usePain.w = 70;
	rankSexPreferences(character.tastes);
	
	// Drives
	setDriveValues(character.dImprovement,450,1);
	setDriveValues(character.dPleasure,600,2);
	setDriveValues(character.dLove,1350,4);
	setDriveValues(character.dCooperation,1500,5);
	setDriveValues(character.dDomination,200,0);
	setDriveValues(character.dAmbition,650,2);
	
	// Attributes
	character.setBaseAttributes(12,14,12,10,16,16,18,14,14);
	character.setAffinities(0.9,1,0.9,0.8,1.1,1.1,1.2,1,1);
	
	// Virginities
	character.virginities.fSex.taken = true;
	character.virginities.fSex.taker = "chVal";
	character.virginities.fSex.takerName = "Valtan";
	character.virginities.fSex.method = "storyGiven";
	character.virginities.fSex.ctxt = "storyGiven";
	character.virginities.fKiss.taken = true;
	character.virginities.fKiss.taker = "chVal";
	character.virginities.fKiss.takerName = "Valtan";
	character.virginities.fKiss.method = "storyGiven";
	character.virginities.fKiss.ctxt = "storyGiven";
	character.virginities.tribbing.taken = true;
	character.virginities.tribbing.taker = "chVal";
	character.virginities.tribbing.takerName = "Valtan";
	character.virginities.tribbing.method = "storyGiven";
	character.virginities.tribbing.ctxt = "storyGiven";
	
	character.refugeRooms = [["mapTrainingGrounds","publicBaths"]];
	
	return character;
}

// Atelechinol
window.createAtelechinol = function() {
	var character  = new Character("Atelechinol","chChin");
	character.type = "candidate";
	character.race = "beastkin";
	
	character.addBodypart("tail","tail");
	
	character.setColors("greenyellow","greenyellow");
	// Moves
	character.saList.push("baPressDown","strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick","biteNeck","holdHands");
	/* ["embers","freezeFeet","sparkingRubbing"]
	character.saList.push("baKissLips","baStrokeDick","baStrokePussy","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","taunt","baTease");
	*/
	character.saList.push("struggle","kick","daringAssault","fireBreath");
	// Body
	character.addFemaleParts();
	// Others
	character.names.push("Chinol");
	character.names.push("the lizardlin leader");
	character.names.push("the daring lizardlin");
	character.assignFemeninePronouns();
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/chinol-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/chinol-avatar.png]]";
	}
	
	character.icon = "npcIcon";
	
	character.fullPortraitL = "img/portraits/chinol-full.png";
	character.avatarL = "img/portraits/chinol-avatar.png";
	//character.iconL = "img/charIcons/npcIcon.png";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chChin");
	
	// Affinities
	character.combatAffinities.fire.strength += 15;
	character.combatAffinities.fire.rst += 30;
	
	// Drives
	setDriveValues(character.dImprovement,1200,4);
	setDriveValues(character.dPleasure,200,1);
	setDriveValues(character.dLove,500,2);
	setDriveValues(character.dCooperation,850,3);
	setDriveValues(character.dDomination,650,3);
	setDriveValues(character.dAmbition,1400,5);
	
	// Attributes
	character.setBaseAttributes(19,19,17,21,17,15,15,17,13);
	character.setAffinities(1.1,1.1,1,1.2,1,0.9,0.9,1,0.8);
	
	character.refugeRooms = [["mapTrainingGrounds","publicBaths"]];
	
	character.makeVirginitiesUnknown();
	
	return character;
}



// Support functions

window.teachBasicMovesToCharacters = function(charKey) {
	var movesList = ["kneel","makeKneel","lickGroin","legHoldHead","mountFromBehind","penetratePussy","thrust","getBlowjob","suckDick",
				"strokeDick","lickPussy","interlockLegs","scissor","pushHipsBack","fuckFace","rideFace"];
	for ( var move of movesList ) {
		if ( State.variables[charKey].getSaList().includes(move) == false ) {
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
	
	// feedCandidatesRelationshipGoals();
}

//////// Other NPC colors

setup.drishtyaColor = "mediumvioletred";
setup.catriaColor = "peachpuff"; // Leap, Claw's mother

setup.meleshColor = "mediumaquamarine"; // Shapeshifter green genderfluid judge
setup.seeriaColor = "palevioletred"; // Shapeshifter purple female judge

// Test chars
window.createNimeresh = function() {
	var character  = new Character("Nimeresh","chNim");
	character.type = "candidate";
	
	character.setColors("Gainsboro","Gainsboro");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick","runAway");
	character.saList.push("baPressDown","baKissLips","baStrokeDick","baStrokePussy","pounceFrontal","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","taunt","baTease","headbutt","twistNhit","rally","warcry","openingLotus");
	
	// Body
	character.addFemaleParts();
	
	// Others
	character.names.push("Nim");
	character.names.push("the toy-maker");
	character.names.push("the fickle Ashwalker");
	character.names.push("the longing woman");
	character.assignFemeninePronouns();
	
	character.likedTopics.push("dramas","music");
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/nim-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/nim-avatar.png]]";
	}
	character.icon = "npcIcon";
	
	character.fullPortraitL = "img/portraits/nim-full.png";
	character.avatarL = "img/portraits/nim-avatar.png";
	
	character.icon = "nimIcon";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chNim");
	
	// Affinities
	character.combatAffinities.sex.strength += 5;
	character.combatAffinities.sex.rst += 5;
	character.combatAffinities.pain.rst += 10;
	character.combatAffinities.affection.frlt += 25;
	character.combatAffinities.affection.rst += 25;
	character.combatAffinities.domination.strength += 10;
	character.combatAffinities.domination.wkn += 10;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 105;
	character.tastes.fullsex.w = 110;
	character.tastes.oral.w = 105;
	character.tastes.usePussy.w = 105;
	character.tastes.targetDick.w = 105;
	character.tastes.useHands.w = 110;
	character.tastes.top.w = 105;
	character.tastes.domination.w = 120;
	character.tastes.submission.w = 110;
	character.tastes.bondage.w = 130;
	character.tastes.teasing.w = 115;
	character.tastes.denial.w = 110;
	character.tastes.romantic.w = 50;
	character.tastes.usePain.w = 105;
	
	rankSexPreferences(character.tastes);
	
	// Base mood
	character.baseMood.flirty = 5;
	
	// Drives
	setDriveValues(character.dImprovement,650,2);
	setDriveValues(character.dPleasure,1000,4);
	setDriveValues(character.dLove,250,1);
	setDriveValues(character.dCooperation,600,2);
	setDriveValues(character.dDomination,400,1);
	setDriveValues(character.dAmbition,400,1);
	
	// Attributes
	character.setBaseAttributes(14,16,8,10,12,14,10,12,12);
	character.setAffinities(1.1,1.2,0.8,0.9,1,1.1,0.9,1,1);
	
	// Virginities
	character.makeSpecificVirginitiesUnknown(["fSex","anus","pussy","fKiss","tribbing"]);
	
	character.refugeRooms = [["mapTrainingGrounds","storage"]];
	
	return character;
}

window.createEshir = function() {
	var character  = new Character("Eshir","chEsh");
	character.type = "candidate";
	
	character.setColors("royalblue","royalblue");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick","runAway");
	character.saList.push("baPressDown","baKissLips","baStrokeDick","baStrokePussy","pounceFrontal","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","taunt","baTease","embers","freezeFeet","sparkingRubbing","lightningDarts","twistNhit","infuseBody");
	
	// Body
	character.addMaleParts();
	// Others
	character.names.push("Eshir");
	character.names.push("the Ashwalker magician");
	character.names.push("the well-mannered man");
	character.assignMasculinePronouns();
	
	character.likedTopics.push("training","dramas");
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/esh-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/esh-avatar.png]]";
	}
	character.icon = "npcIcon";
	
	character.fullPortraitL = "img/portraits/esh-full.png";
	character.avatarL = "img/portraits/esh-avatar.png";
	
	character.icon = "eshIcon";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chEsh");
	
	// Affinities
	character.combatAffinities.physical.frlt += 10;
	character.combatAffinities.physical.wkn += 5;
	character.combatAffinities.pain.wkn += 15;
	character.combatAffinities.magic.strength += 10;
	character.combatAffinities.holy.frlt += 10;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 105;
	character.tastes.oral.w = 95;
	character.tastes.fullsex.w = 110;
	character.tastes.talk.w = 90;
	character.tastes.useDick.w = 110;
	character.tastes.useAnus.w = 105;
	character.tastes.useEyes.w = 95;
	character.tastes.useHands.w = 105;
	character.tastes.targetBreasts.w = 105;
	character.tastes.targetPussy.w = 110;
	character.tastes.targetAnus.w = 110;
	character.tastes.top.w = 110;
	character.tastes.bottom.w = 105;
	character.tastes.domination.w = 105;
	character.tastes.submission.w = 105;
	character.tastes.usePain.w = 80;
	character.tastes.receivePain.w = 70;
	
	rankSexPreferences(character.tastes);
	
	// Base mood
	//character.baseMood.flirty = 5;
	
	// Drives
	setDriveValues(character.dImprovement,1200,4);
	setDriveValues(character.dPleasure,500,2);
	setDriveValues(character.dLove,450,2);
	setDriveValues(character.dCooperation,1200,4);
	setDriveValues(character.dDomination,250,1);
	setDriveValues(character.dAmbition,1050,4);
	
	// Attributes
	character.setBaseAttributes(10,10,14, 14,16,8, 14,10,8);
	character.setAffinities(0.9,0.9,1.1,1.1,1.2,0.8,1.1,0.9,0.8);
	
	character.refugeRooms = [["mapTrainingGrounds","storage"]];
	
	return character;
}

window.createVeel = function() {
	var character  = new Character("Veel","chVeel");
	character.type = "candidate";
	
	character.setColors("seagreen","seagreen");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick","runAway");
	character.saList.push("baPressDown","baKissLips","baStrokeDick","baStrokePussy","pounceFrontal","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","taunt","baTease","headbutt","warcry","confHarassment");
	
	// Body
	character.addMaleParts();
	// Others
	character.names.push("Veel");
	character.names.push("the Gaanidan ranger");
	character.names.push("the troubled warrior");
	character.assignMasculinePronouns();
	
	character.likedTopics.push("training","fauna");
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/veel-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/veel-avatar.png]]";
	}
	character.icon = "npcIcon";
	
	character.fullPortraitL = "img/portraits/veel-full.png";
	character.avatarL = "img/portraits/veel-avatar.png";
	
	character.icon = "veelIcon";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chVeel");
	
	// Affinities
	character.combatAffinities.weapon.strength += 5;
	character.combatAffinities.weapon.rst += 5;
	character.combatAffinities.taunt.rst += 25;
	character.combatAffinities.affection.frlt += 25;
	character.combatAffinities.affection.rst += 25;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 115;
	character.tastes.oral.w = 105;
	character.tastes.fullsex.w = 105;
	character.tastes.talk.w = 90;
	character.tastes.useDick.w = 110;
	character.tastes.useMouth.w = 105;
	character.tastes.useHands.w = 115;
	character.tastes.targetDick.w = 110;
	character.tastes.targetPussy.w = 110;
	character.tastes.targetAnus.w = 105;
	character.tastes.top.w = 115;
	character.tastes.bottom.w = 90;
	character.tastes.domination.w = 95;
	character.tastes.submission.w = 105;
	character.tastes.romantic.w = 105;
	
	rankSexPreferences(character.tastes);
	
	// Base mood
	//character.baseMood.flirty = 5;
	
	// Drives
	setDriveValues(character.dImprovement,1000,4);
	setDriveValues(character.dPleasure,450,2);
	setDriveValues(character.dLove,700,3);
	setDriveValues(character.dCooperation,1100,4);
	setDriveValues(character.dDomination,700,3);
	setDriveValues(character.dAmbition,500,2);
	
	// Attributes
	character.setBaseAttributes(16,14,12, 10,10,14, 12,8,12);
	character.setAffinities(1.2,1.1,1, 0.9,0.9,1.1, 1,0.8,1);
	
	// Virginities
	character.makeSpecificVirginitiesUnknown(["fSex","fKiss","dick"]);
	
	character.refugeRooms = [["mapTrainingGrounds","storage"]];
	
	return character;
}

window.createSethra = function() {
	var character = new Character("Sethra","chSet");
	character.type = "candidate";
	
	character.setColors("yellowgreen","yellowgreen");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","mountDick","runAway");
	character.saList.push("baPressDown","baKissLips","baStrokeDick","baStrokePussy","pounceFrontal","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","coldGuts","taunt","baTease","headbutt","rally","warcry","gambitDeceit","gambitHonesty");
	
	// Body
	character.addFemaleParts();
	
	// Others
	character.names.push("Sethra");
	character.names.push("the Gaanidan merchant");
	character.names.push("the manipulative trader");
	character.names.push("the sly woman");
	character.assignFemeninePronouns();
	
	character.likedTopics.push("dramas","flora");
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/set-full.png]]";
	}
	character.avatar = function() {
		return "[img[img/portraits/set-avatar.png]]";
	}
	character.icon = "npcIcon";
	
	character.fullPortraitL = "img/portraits/set-full.png";
	character.avatarL = "img/portraits/set-avatar.png";
	
	character.icon = "setIcon";
	
	// AI
	character.globalAi = createCandidateGlobalAi("chSet");
	
	// Affinities
	character.combatAffinities.social.strength += 10;
	character.combatAffinities.social.rst += 10;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 95;
	character.tastes.fullsex.w = 110;
	character.tastes.oral.w = 105;
	character.tastes.talk.w = 110;
	character.tastes.usePussy.w = 115;
	character.tastes.useHands.w = 95;
	character.tastes.useAnus.w = 90;
	character.tastes.targetDick.w = 110;
	character.tastes.targetMouth.w = 115;
	character.tastes.domination.w = 110;
	character.tastes.submission.w = 90;
	character.tastes.teasing.w = 90;
	character.tastes.romantic.w = 90;
	character.tastes.usePain.w = 105;
	
	rankSexPreferences(character.tastes);
	
	// Base mood
	//character.baseMood.flirty = 5;
	
	// Drives
	setDriveValues(character.dImprovement,750,3);
	setDriveValues(character.dPleasure,700,2);
	setDriveValues(character.dLove,430,2);
	setDriveValues(character.dCooperation,350,1);
	setDriveValues(character.dDomination,750,3);
	setDriveValues(character.dAmbition,1000,4);
	
	// Attributes
	character.setBaseAttributes(14,12,10, 12,14,12, 8,16,10);
	character.setAffinities(1.1,1,0.9, 1,1.1,1, 0.9,1.2,0.9);
	
	// Virginities
	character.makeSpecificVirginitiesUnknown(["fSex","pussy","fKiss","tribbing"]);
	
	character.refugeRooms = [["mapTrainingGrounds","storage"]];
	
	return character;
}

window.createTenko = function() {
	var character  = new Character("Pain","chPain");
	character.type = "candidate";
	character.race = "beastkin";
	
	character.setColors("lightslategray","lightslategray");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","biteNeck","mountDick");
	
	character.saList.push("baPressDown","baKissLips","baStrokeDick","baStrokePussy","pounceFrontal","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","taunt","baTease","baScratch","runAway","headbutt","warcry","savageCrush","bearAspect"); // 
	
	// Body
	character.addFemaleParts();
	// Others
	character.names.push("Tenko");
	character.names.push("Unending Pain");
	character.names.push("the sadistic Beastkin");
	character.names.push("the bear-girl");
	character.assignFemeninePronouns();
	
	character.likedTopics.push("fauna","training");
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/pain-full.png]]";
	}
	
	character.fullPortraitL = "img/portraits/pain-full.png";
	character.avatarL = "img/portraits/pain-avatar.png";
	
	character.icon = "painIcon";
	
	// Affinities
	character.combatAffinities.physical.strength += 5;
	character.combatAffinities.physical.rst += 5;
	character.combatAffinities.pounce.strength += 5;
	character.combatAffinities.pounce.rst += 5;
	character.combatAffinities.magic.frlt += 20;
	character.combatAffinities.fire.wkn += 10;
	character.combatAffinities.ice.rst += 10;
	character.combatAffinities.social.wkn += 20;
	character.combatAffinities.taunt.wkn += 25;
	character.combatAffinities.pain.strength += 10;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 90;
	character.tastes.oral.w = 105;
	character.tastes.fullsex.w = 115;
	character.tastes.talk.w = 80;
	character.tastes.usePussy.w = 120;
	character.tastes.useBreasts.w = 105;
	character.tastes.useLegs.w = 110;
	character.tastes.useMouth.w = 80;
	character.tastes.targetDick.w = 110;
	character.tastes.targetPussy.w = 110;
	character.tastes.targetMouth.w = 120;
	character.tastes.domination.w = 130;
	character.tastes.submission.w = 70;
	character.tastes.teasing.w = 85;
	character.tastes.romantic.w = 70;
	character.tastes.bondage.w = 120;
	character.tastes.usePain.w = 130;
	rankSexPreferences(character.tastes);
	
	// Drives
	setDriveValues(character.dImprovement,1100,4); 
	setDriveValues(character.dPleasure,1000,4); 
	setDriveValues(character.dLove,0,0);
	setDriveValues(character.dCooperation,0,0); 
	setDriveValues(character.dDomination,2000,6); 
	setDriveValues(character.dAmbition,1750,6); 
	
	// Attributes
	character.setBaseAttributes(16,10,16, 14,10,10, 10,12,10);
	character.setAffinities(1.2,0.9,1.2, 1.1,0.9,0.9, 0.9,1,0.9);
	
	// Virginities
	character.makeSpecificVirginitiesUnknown(["fSex","anus","pussy","fKiss","tribbing"]);
	
	character.refugeRooms = [["mapTrainingGrounds","storage"]];
	
	return character;
}

window.createSheze = function() {
	var character  = new Character("Sheze","chSheze");
	character.type = "candidate";
	character.race = "beastkin";
	
	character.setColors("peachpuff","peachpuff");
	// Moves
	character.saList.push("strokePussy","strokeBreasts","strokeDick","kissLips","frottage","frenchKiss","mountFaceToFace","penetratePussy","interlockLegs","lickGroin","biteNeck","mountDick","energyDrainingKiss","realHypnoticGlance");
	
	character.saList.push("baPressDown","baKissLips","baStrokeDick","baStrokePussy","pounceFrontal","pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D","baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","kick","taunt","baTease","baScratch","runAway","embers","freezeFeet","lightningDarts","sparkingRubbing","baHypnoticGlance","baDrainingKiss","baEnergyDrainingKiss","bakuAspect"); // 
	
	// Body
	character.addFemaleParts();
	// Others
	character.names.push("Sheze");
	character.names.push("the enslaved baku");
	character.names.push("the reserved Beastkin");
	character.names.push("the baku-girl");
	character.assignFemeninePronouns();
	
	character.icon = "shezeIcon";
	
	character.likedTopics.push("fauna","flora","dramas","music");
	
	// Images
	character.fullPortrait = function() {
		return "[img[img/portraits/sheze-full.png]]";
	}
	
	character.fullPortraitL = "img/portraits/sheze-full.png";
	character.avatarL = "img/portraits/sheze-avatar.png";
	
	// Affinities
	character.combatAffinities.physical.frlt += 10;
	character.combatAffinities.physical.wkn += 10;
	character.combatAffinities.magic.strength += 10;
	character.combatAffinities.magic.rst += 10;
	character.combatAffinities.drain.strength += 10;
	character.combatAffinities.hypnosis.strength += 10;
	character.combatAffinities.hypnosis.rst += 10;
	
	// Personality
		// Tastes
	character.tastes.foreplay.w = 105;
	character.tastes.oral.w = 110;
	character.tastes.fullsex.w = 95;
	character.tastes.talk.w = 90;
	character.tastes.usePussy.w = 110;
	character.tastes.useEyes.w = 115;
	character.tastes.useHands.w = 110;
	character.tastes.useMouth.w = 120;
	character.tastes.targetDick.w = 105;
	character.tastes.targetPussy.w = 115;
	character.tastes.targetLegs.w = 110;
	character.tastes.targetAnus.w = 85;
	character.tastes.domination.w = 105;
	character.tastes.submission.w = 115;
	character.tastes.romantic.w = 90;
	character.tastes.bondage.w = 115;
	character.tastes.receivePain.w = 105;
	character.tastes.hypnosis.w = 125;
	character.tastes.draining.w = 125;
	rankSexPreferences(character.tastes);
	
	// Drives
	setDriveValues(character.dImprovement,950,4);
	setDriveValues(character.dPleasure,700,3);
	setDriveValues(character.dLove,500,3);
	setDriveValues(character.dCooperation,450,2); 
	setDriveValues(character.dDomination,1100,4);
	setDriveValues(character.dAmbition,1500,5);
	
	// Attributes
	character.setBaseAttributes(10,14,8, 16,14,12, 14,10,10);
	character.setAffinities(0.9,1.1,0.8, 1.2,1.1,1, 1.1,0.9,0.9);
	
	// Virginities
	character.virginities.fKiss.taken = true;
	character.virginities.fKiss.taker = "chPain";
	character.virginities.fKiss.takerName = "Pain";
	character.virginities.fKiss.method = "storyGiven";
	character.virginities.fKiss.ctxt = "storyGiven";
	character.virginities.fSex.taken = true;
	character.virginities.fSex.taker = "chPain";
	character.virginities.fSex.takerName = "Pain";
	character.virginities.fSex.method = "storyGiven";
	character.virginities.fSex.ctxt = "storyGiven";
	character.virginities.tribbing.taken = true;
	character.virginities.tribbing.taker = "chPain";
	character.virginities.tribbing.takerName = "Pain";
	character.virginities.tribbing.method = "storyGiven";
	character.virginities.tribbing.ctxt = "storyGiven";
	
	character.refugeRooms = [["mapTrainingGrounds","storage"]];
	
	return character;
}

window.adjustSecondAdventureCharStats = function() {
	for ( var cK of ["chNim","chVeel","chSet","chSheze"] ) {
		gC(cK).adjustAttributes(0,6);
	}
	gC("chPain").adjustAttributes(0,10);
	gC("chEsh").adjustAttributes(0,14);
	
	for ( var cK of ["chNim","chVeel","chSet","chSheze","chPain","chEsh"] ) {
		recalculateMaxBars(cK);
	}
}

Character.prototype.adjustAttributes = function(statVariance,statBuff) {
	for ( var st of getStatNamesArray() ) {
		this[st].value += limitedRandomInt(statVariance) + statBuff;
	}
}



