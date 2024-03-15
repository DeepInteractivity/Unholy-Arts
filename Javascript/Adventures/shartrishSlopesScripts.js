///// Adventure scripts /////

	// Init Second Adventure
window.initializeShartrishSlopesAdventure = function() {
	// Init config
	finishAllRelationships();
	takeOffAllBondage();
	
	var newChars = ["chNim","chEsh","chVeel","chSet","chPain","chSheze"];
	var newCharInitFuncs = [createNimeresh,createEshir,createVeel,createSethra,createTenko,createSheze];
	var i = 0;
	while ( i < 6 ) {
		if ( State.variables.activeSimulationCharacters.includes(newChars[i]) == false ) {
			State.variables[newChars[i]] = newCharInitFuncs[i]();
			State.variables.activeSimulationCharacters.push(newChars[i]);
		}
		i++;
	}
	adjustSecondAdventureCharStats();
	
	// Actions
	charactersLearnSceneActions(newChars,returnFirstScrollGroupActionsList());
	charactersLearnSceneActions(newChars,["runAway"]);
	
	// Items
	var artWeaID = createEquipment(equipmentType.WHIP,"chNim");
	equipObjectOnWearer(artWeaID,"chNim",-1);
	var eshWeaID = createEquipment(equipmentType.STAFFOFBATTLE,"chEsh");
	equipObjectOnWearer(eshWeaID,"chEsh",-1);
	var veelWeaID = createEquipment(equipmentType.BNBOARD,"chVeel");
	equipObjectOnWearer(veelWeaID,"chVeel",-1);
	var setWeaID = createEquipment(equipmentType.BNBOARD,"chSet");
	equipObjectOnWearer(setWeaID,"chSet",-1);
	var painWeaID = createEquipment(equipmentType.BLUDGEON,"chPain");
	equipObjectOnWearer(painWeaID,"chPain",-1);
	var sheWeaID = createEquipment(equipmentType.WAND,"chSheze");
	equipObjectOnWearer(sheWeaID,"chSheze",-1);
	
		// Bug fixes
	charactersLearnSceneActions(["chNim"],["openingLotus"]);
	charactersLearnSceneActions(["chEsh"],["infuseBody"]);
	
	// Relationships
	initRelationshipDataAmongAllActiveCharacters();
		// Ashwalkers
	getRelation("chNim","chEsh").friendship.ltv += 650;
	getRelation("chEsh","chNim").friendship.ltv += 650;
	getRelation("chNim","chEsh").sexualTension.ltv += 50;
	getRelation("chEsh","chNim").sexualTension.ltv += 50;
	getRelation("chNim","chEsh").enmity.ltv += 50;
	getRelation("chEsh","chNim").enmity.ltv += 100;
	getRelation("chNim","chNash").friendship.stv += 200;
	getRelation("chNash","chNim").friendship.stv += 200;
	getRelation("chNim","chNash").friendship.ltv += 750;
	getRelation("chNash","chNim").friendship.ltv += 900;
	getRelation("chEsh","chNash").friendship.ltv += 500;
	getRelation("chNash","chEsh").enmity.ltv += 750;
	getRelation("chNash","chEsh").rivalry.ltv += 500;
	getRelation("chNash","chEsh").sexualTension.ltv += 150;
	getRelation("chNash","chEsh").romance.ltv += 200;
	getRelation("chAte","chEsh").friendship.ltv += 150;
	getRelation("chAte","chEsh").friendship.stv += 150;
	getRelation("chEsh","chAte").friendship.ltv += 250;
	getRelation("chEsh","chAte").friendship.stv += 250;
		// Gaanidans
	getRelation("chVeel","chSet").friendship.ltv += 400;
	getRelation("chSet","chVeel").friendship.ltv += 400;
	getRelation("chVeel","chSet").friendship.stv += 250;
	getRelation("chSet","chVeel").friendship.stv += 250;
	getRelation("chVeel","chSet").enmity.stv += 250;
	getRelation("chVeel","chSet").enmity.ltv += 100;
	getRelation("chSet","chVeel").rivalry.stv += 100;
	getRelation("chSet","chVeel").rivalry.ltv += 100;
	getRelation("chVeel","chPlayerCharacter").friendship.ltv += 150;
	getRelation("chSet","chPlayerCharacter").friendship.ltv += 150;
	getRelation("chPlayerCharacter","chVeel").friendship.ltv += 150;
	getRelation("chPlayerCharacter","chSet").friendship.ltv += 150;
		// Beastkin
	getRelation("chPain","chSheze").friendship.ltv += 150;
	getRelation("chPain","chSheze").friendship.stv += 150;
	getRelation("chPain","chSheze").romance.ltv += 150;
	getRelation("chPain","chSheze").romance.stv += 150;
	getRelation("chPain","chSheze").domination.ltv += 750;
	getRelation("chPain","chSheze").domination.stv += 750;
	getRelation("chPain","chSheze").submission.ltv += 50;
	getRelation("chPain","chSheze").submission.stv += 100;
	getRelation("chPain","chSheze").sexualTension.ltv += 750;
	getRelation("chPain","chSheze").sexualTension.stv += 750;
	getRelation("chSheze","chPain").friendship.ltv += 150;
	getRelation("chSheze","chPain").friendship.stv += 150;
	getRelation("chSheze","chPain").romance.ltv += 300;
	getRelation("chSheze","chPain").romance.stv += 300;
	getRelation("chSheze","chPain").sexualTension.ltv += 750;
	getRelation("chSheze","chPain").sexualTension.stv += 750;
	getRelation("chSheze","chPain").submission.ltv += 750;
	getRelation("chSheze","chPain").submission.stv += 750;
	getRelation("chSheze","chPain").domination.ltv += 150;
	getRelation("chSheze","chPain").submission.stv += 300;
	getRelation("chPain","chClaw").domination.ltv += 500;
	getRelation("chPain","chClaw").domination.stv += 100;
	getRelation("chPain","chClaw").enmity.ltv += 100;
	getRelation("chPain","chClaw").enmity.stv += 50;
	getRelation("chPain","chClaw").rivalry.ltv += 500;
	getRelation("chPain","chClaw").rivalry.stv += 750;
	getRelation("chClaw","chPain").submission.ltv += 500;
	getRelation("chClaw","chPain").submission.stv += 150;
	getRelation("chClaw","chPain").enmity.ltv += 1200;
	getRelation("chClaw","chPain").enmity.stv += 1800;
	getRelation("chClaw","chPain").rivalry.ltv += 750;
	getRelation("chClaw","chPain").rivalry.stv += 500;
	
		// Ashwalkers respect
	State.variables.tribes.awRsp = 50;
	State.variables.tribes.gdRsp = -50;
	for ( var cK of getCandidatesKeysArray() ) {
		gC(cK).awRsp = 0; // Individual respect
		gC(cK).gdRsp = 0;
	}
	gC("chNash").awRsp = 300; // Nashillbyir respect
	gC("chNash").gdRsp = -100;
	gC("chPlayerCharacter").awRsp = -50; // Player respect
	gC("chPlayerCharacter").gdRsp = 50;
	
		// Other
	coolDownFirstAdventuresValtanMoods();
	
	State.variables.personalRoom.endDayRelationMoodEffects();
	State.variables.personalRoom.endDayRelationMoodEffects();
	State.variables.personalRoom.endDayRelationMoodEffects();
	State.variables.personalRoom.endDayRelationMoodEffects();
	State.variables.personalRoom.endDayRelationMoodEffects();
	State.variables.daycycle.month = 3;
	State.variables.daycycle.day = 2;
	
	State.variables.storyState = storyState.secondAdventure;
}

	// End Second Adventure
window.finishSSAdventure = function() {
	finishSecondAdventureAffinitiesTuning();
}
	
	// Abort Second Adventure
window.abortSSAdventure = function() {
	State.variables.daycycle.month = 3;
	State.variables.daycycle.day = 13;
	State.variables.storyState = storyState.thirdLoop;
	finishSecondAdventureAffinitiesTuning();
}

window.finishSecondAdventureAffinitiesTuning = function() {
	for ( var cK of getCandidatesKeysArray() ) {
		for ( var at of setup.baseStats ) {
			gC(cK)[at].affinity += 0.1;
		}
		gC(cK).agility.affinity -= 0.30;
		gC(cK).physique.affinity -= 0.30;
		gC(cK).resilience.affinity -= 0.30;
	}
}


