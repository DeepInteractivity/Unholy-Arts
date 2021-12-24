///// Adventure scripts /////

	// Init First Adventure
window.initializeGleamingCavernsAdventure = function() {
	// Init config
	finishAllRelationships();
	takeOffAllBondage();
	
	State.variables.daycycle.day += 2;
	// Story state
	State.variables.storyState = storyState.firstAdventure;
	// Patch in holy affinity
	if ( gC("chPlayerCharacter").combatAffinities.holy != undefined ) {
		for ( var cK of getActiveSimulationCharactersArray() ) {
			gC(cK).combatAffinities.holy = new flavorAffinity("holy");
		}
	}
	// Initialize tribes & Shapeshifter tribe
	State.variables.tribes = new pseudoList();
		// Shapeshifters respect
	State.variables.tribes.ssRpt = -300;
	for ( var cK of getCandidatesKeysArray() ) {
		gC(cK).ssRsp = 0; // Individual respect
	}
	gC("chVal").ssRsp = -500; // Valtan respect
	// Holy blast
	charactersLearnSceneActions(getCandidatesKeysArray(),["holyBlast"]);
	// Initialize secondary characters
		// Artume
	State.variables.chArt = createArtume();
	var artWeaID = createEquipment(equipmentType.HUNTINGBOW,"chArt");
	equipObjectOnWearer(artWeaID,"chArt",-1);
		// Hope
	State.variables.chHope = createWarmestHope();
	var hopeWeaID = createEquipment(equipmentType.WAND,"chHope");
	equipObjectOnWearer(hopeWeaID,"chHope",-1);
		// Rock
	State.variables.chRock = createSturdiestRock();
	var rockWeaID = createEquipment(equipmentType.STAFFOFBATTLE,"chRock");
	equipObjectOnWearer(rockWeaID,"chRock",-1);
		// Sillan
	State.variables.chSil = createSillan();
	recalculateMaxBars("chSil");
	charactersLearnSceneActions(["chSil"],returnFirstScrollGroupActionsList());
		// Nersmias
	State.variables.chNer = createNersmias();
	var nerWeaID = createEquipment(equipmentType.WAND,"chNer");
	equipObjectOnWearer(nerWeaID,"chNer",-1);
	recalculateMaxBars("chNer");
	charactersLearnSceneActions(["chNer"],returnFirstScrollGroupActionsList());
		// Mesquelles
	State.variables.chMes = createMesquelles();
	var mesWeaID = createEquipment(equipmentType.HANDFAN,"chMes");
	equipObjectOnWearer(mesWeaID,"chMes",-1);
	recalculateMaxBars("chMes");
	charactersLearnSceneActions(["chMes"],returnFirstScrollGroupActionsList());
	
	State.variables.activeSimulationCharacters.push("chArt","chHope","chRock","chSil","chNer","chMes");
		// Adjust stats
	for ( var cK of ["chArt","chHope","chRock"] ) {
		for ( var st of getStatNamesArray() ) {
			gC(cK)[st].value += 3;
		}
	}
	recalculateMaxBars("chArt");
	recalculateMaxBars("chHope");
	recalculateMaxBars("chRock");
	recalculateMaxBars("chSil");
	recalculateMaxBars("chNer");
	recalculateMaxBars("chMes");
		// Actions
	charactersLearnSceneActions(["chArt","chHope","chRock","chSil","chNer","chMes"],returnFirstScrollGroupActionsList());
	
	// Relationships
	initRelationshipDataAmongAllActiveCharacters();
		// Gaanidans
	getRelation("chPlayerCharacter","chArt").friendship.ltv = 850;
	getRelation("chArt","chPlayerCharacter").friendship.ltv = 750;
	getRelation("chMir","chArt").friendship.ltv = 25;
	getRelation("chArt","chMir").friendship.ltv = 25;
		// Beastkins
	getRelation("chClaw","chHope").friendship.ltv = 650;
	getRelation("chClaw","chHope").enmity.ltv = 300;
	getRelation("chClaw","chHope").rivalry.ltv = 800;
	getRelation("chHope","chClaw").friendship.ltv = 550;
	getRelation("chHope","chClaw").enmity.ltv = 700;
	getRelation("chHope","chClaw").rivalry.ltv = 700;
	getRelation("chClaw","chRock").friendship.ltv = 500;
	getRelation("chClaw","chRock").enmity.ltv = 100;
	getRelation("chRock","chClaw").friendship.ltv = 650;
	getRelation("chRock","chClaw").enmity.ltv = 150;
	
	getRelation("chHope","chRock").friendship.stv = 600;
	getRelation("chHope","chRock").friendship.ltv = 900;
	getRelation("chHope","chRock").romance.stv = 300;
	getRelation("chHope","chRock").romance.ltv = 450;
	getRelation("chHope","chRock").sexualTension.stv = 200;
	getRelation("chHope","chRock").sexualTension.ltv = 150;
	getRelation("chHope","chRock").domination.stv = 300;
	getRelation("chHope","chRock").domination.ltv = 300;
	getRelation("chRock","chHope").friendship.stv = 600;
	getRelation("chRock","chHope").friendship.ltv = 900;
	getRelation("chRock","chHope").romance.stv = 400;
	getRelation("chRock","chHope").romance.ltv = 550;
	getRelation("chRock","chHope").sexualTension.stv = 250;
	getRelation("chRock","chHope").sexualTension.ltv = 200;
	getRelation("chRock","chHope").submission.stv = 400;
	getRelation("chRock","chHope").submission.ltv = 400;
	
	// Gleaming Caverns relationships
	initRelsValtanSillan();
	initRelsValtanNersmias();
	initRelsValtanMesquelles();
	initRelsSillanNersmias();
	initRelsSillanMesquelles();
	initRelsNersmiasMesquelles();
	
	// Maps
	deinitMapTrainingGrounds();
	initMapGleamingCaverns();
	
	// UI
	setPasChars([]);
	setRoomIntro("mapGleamingCaverns","marshLP5");
}

window.checkForGleamingCavernsUpdates = function() {
	State.variables.mapGleamingCaverns.autogenerateRooms("mapGleamingCaverns");
	
	if ( gC("chSil") == undefined ) {
		State.variables.chSil = createSillan();
		recalculateMaxBars("chSil");
		charactersLearnSceneActions(["chSil"],returnFirstScrollGroupActionsList());
		State.variables.activeSimulationCharacters.push("chSil");
	}
	if ( gC("chNer") == undefined ) {
		State.variables.chNer = createNersmias();
		var nerWeaID = createEquipment(equipmentType.WAND,"chNer");
		equipObjectOnWearer(nerWeaID,"chNer",-1);
		recalculateMaxBars("chNer");
		charactersLearnSceneActions(["chNer"],returnFirstScrollGroupActionsList());
		State.variables.activeSimulationCharacters.push("chNer");
	}
	if ( gC("chMes") == undefined ) {
		State.variables.chMes = createMesquelles();
		var mesWeaID = createEquipment(equipmentType.HANDFAN,"chMes");
		equipObjectOnWearer(mesWeaID,"chMes",-1);
		recalculateMaxBars("chMes");
		charactersLearnSceneActions(["chMes"],returnFirstScrollGroupActionsList());
		State.variables.activeSimulationCharacters.push("chMes");
	}
	initRelationshipDataAmongAllActiveCharacters();
	
	for ( var cK of ["chPlayerCharacter","chNash","chMir","chVal","chClaw","chAte","chArt","chHope","chRock","chSil","chNer","chMes"] ) {
		gC(cK).refugeRooms.push(["mapGleamingCaverns","unionLakeWest"]);
	}
	
	// Gleaming Caverns relationships
	initRelsValtanSillan();
	initRelsValtanNersmias();
	initRelsValtanMesquelles();
	initRelsSillanNersmias();
	initRelsSillanMesquelles();
	initRelsNersmiasMesquelles();
}

window.finishGleamingCavernsAdventure = function() {
	// Story state
	State.variables.storyState = storyState.secondLoop;
	State.variables.daycycle.day += 2;
	
	// Finish stat affinity specialization
	for ( var cK of getCandidatesKeysArray() ) {
		for ( var at of setup.baseStats ) {
			gC(cK)[at].affinity += 0.1;
		}
		gC(cK).charisma.affinity -= 0.50;
		gC(cK).empathy.affinity -= 0.40;
	}
	
	// Maps
	deinitMapGleamingCaverns();
	initMapTrainingGrounds();
	
	State.variables.settings.followingAllowed = true;
	State.variables.settings.relationshipTypesAllowed = true;
	State.variables.settings.challengingAllowed = true;
	State.variables.settings.assaultingAllowed = true;
	State.variables.settings.talkingAllowed = true;
}

	// Battle scenes
window.ccsFAplayerAteFightOneSucker = function() {
	var mon = createEssenceSucker(1,0,1);
	State.variables.sc.startScene(
	"bs","fixed",["chPlayerCharacter","chAte"],[mon],"__Swamp ~ Western Path Lake__\nCountless dragonflies roam the shores of the lake in their quest for food, and the flapping of their wings adds ambience music to the scenery.",createEndConditionStoryBattleWithDraw("FA BeatenSucker 1","FA SuckerVictory 1","FA BeatenSucker 1"),6,
	"FA BeatenSucker 1");
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiEarlyStrategic();
		}
	}
	State.variables.sc.formatScenePassage();
	setRefreshSomeLustBattleScript();
}

window.ccsFAplayerAteFightTwoSuckers = function() {
	var mon = createEssenceSucker(1,0,1);
	var mon2 = createEssenceSucker(1,0,2);
	State.variables.sc.startScene(
	"bs","fixed",["chPlayerCharacter","chAte"],[mon,mon2],"__Swamp ~ Western Path Lake__\nCountless dragonflies roam the shores of the lake in their quest for food, and the flapping of their wings adds ambience music to the scenery.",createEndConditionStoryBattleWithDraw("FA BeatenSucker 2","FA BeatenSucker 2","FA BeatenSucker 2"),6,
	"FA BeatenSucker 2");
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiEarlyStrategic();
		}
	}
	
	State.variables.sc.customScript = function(turns) {
		if ( State.variables.sc.currentTurn == 3 ) {
			State.variables.sc.endRoundEffects.push(function() {
					// Effects
					var damage1 = addLuckFactor(102,0.1,75);
					var damage2 = addLuckFactor(102,0.1,75);
					applyBarDamage("mon0","lust",-damage1);
					applyBarDamage("mon1","lust",-damage2);
					var dmgEffMsg = getWeaknessToAttackText(["holy"],"mon0");
				
					// Msg
				var msg = colorText("Drishtya","mediumvioletred") + " launched blasts of holy light against " + ktn("mon0") + " and " + ktn("mon1") + ", burning them in divine retribution. " + dmgEffMsg + ktn("mon0") + " received " + textLustDamage(damage1) + ", and " + ktn("mon1") + " received " + textLustDamage(damage2) + ".";
				return msg;
			});
		}
	}
	State.variables.sc.formatScenePassage();
	setRefreshSomeLustBattleScript();
}

window.ccsFAplayerFightsFlyingLookout = function() {
	var mon = createFlyingLookout(2,3,1);
	State.variables.sc.startScene(
	"bs","fixed",["chPlayerCharacter"],[mon],"__Swamp ~ Western River 2__\nClose to the confines of the swamp, a surge of vegetation hinders movement along the shore of the river.",endConditionTurns,5,
	"FA EntersArtume");
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiEarlyStrategic();
		}
	}
	
	State.variables.sc.customScript = function(turns) {
		if ( State.variables.sc.currentTurn == 5 ) {
			State.variables.sc.endRoundEffects.push(function() {
					// Effects
					var damage1 = addLuckFactor(15,0.1,15);
					applyBarDamage("mon0","lust",-damage1);
					var dmgEffMsg = getWeaknessToAttackText(["physical","weapon"],"mon0");
				
					// Msg
				var msg = "A wild arrow flies out of nowhere, hitting the " + ktn("mon0") + " right on its center. It shrieks in pain and moves away. " + dmgEffMsg + ktn("mon0") + " received " + textLustDamage(damage1) + ".";
				return msg;
			});
		}
	}
	gC("chPlayerCharacter").control = 2;
	State.variables.sc.formatScenePassage();
	setRefreshSomeLustBattleScript();
}

window.ccsFAhopeAttacksClaw = function() {
	State.variables.sc.startScene(
	"bs","fixed",["chClaw"],["chHope"],"__Swamp ~ Central Path 2__\nThe silenced is being disturbed.",endConditionTurns,3,
	"FA AnotherAmbush3");
		State.variables.chClaw.aiAlgorythm = createAiFixedAction();
		State.variables.chClaw.aiAlgorythm.fixedAction = "baScratch";
		State.variables.chClaw.aiAlgorythm.fixedTarget = "chHope";
		State.variables.chHope.aiAlgorythm = createAiFixedAction();
		State.variables.chHope.aiAlgorythm.fixedAction = "embers";
		State.variables.chHope.aiAlgorythm.fixedTarget = "chClaw";
		
	State.variables.sc.customScript = ccsFAhopeAttacksClawScript;
	
	State.variables.sc.formatScenePassage();
}
window.ccsFAhopeAttacksClawScript = function() {
	switch (State.variables.sc.currentTurn) {
		case 2:
			State.variables.chHope.aiAlgorythm.fixedAction = "flaringFeint";
			State.variables.chClaw.aiAlgorythm.fixedAction = "baScratch";
	State.variables.sc.headingDescription = `<span @style=$chHope.colorStyleKey>//"You are going to regret your treason! Start praying to the Goddess!"//</span>`;
			break;
		case 3:
			State.variables.chHope.aiAlgorythm.fixedAction = "flamingFan";
			State.variables.chClaw.aiAlgorythm.fixedAction = "baScratch";
			State.variables.sc.headingDescription = `<span @style=$chClaw.colorStyleKey>//"I don't know what your problem is, but I'm going to claw it out of you."//</span>`;
			break;
		case 4:
			State.variables.chHope.aiAlgorythm.fixedAction = "flamingFan";
			State.variables.chClaw.aiAlgorythm.fixedAction = "baScratch";
			State.variables.sc.headingDescription = `<span @style=$chHope.colorStyleKey>//"If you still don't know what's my problem, the more reason I have to do this."//</span>`;
			break;
	}
}

window.ccsFArockInYourWay = function() {
	State.variables.sc.startScene(
	"bs","fixed",["chPlayerCharacter","chNash"],["chRock"],"__Swamp ~ Central Path 2__\nYou can see flames flying further beyond.",endConditionTurns,4,
	"FA CeasedFire");
		State.variables.chNash.aiAlgorythm = createAiFixedAction();
		State.variables.chNash.aiAlgorythm.fixedAction = "coldGuts";
		State.variables.chNash.aiAlgorythm.fixedTarget = "chRock";
		State.variables.chRock.aiAlgorythm = createAiFixedAction();
		State.variables.chRock.aiAlgorythm.fixedAction = "quake";
		State.variables.chRock.aiAlgorythm.fixedTarget = "chNash";
		
	State.variables.sc.customScript = ccsFArockInYourWayScript;
	
	State.variables.sc.formatScenePassage();
}
window.ccsFArockInYourWayScript = function() {
	switch (State.variables.sc.currentTurn) {
		case 2:
			State.variables.chNash.aiAlgorythm.fixedAction = "kick";
			State.variables.chRock.aiAlgorythm.fixedAction = "earthWall";
	State.variables.sc.headingDescription = `<span @style=$chPlayerCharacter.colorStyleKey>//"Who are you, and why are you attacking us!?"//</span>`;
			break;
		case 3:
			State.variables.chNash.aiAlgorythm.fixedAction = "freezeFeet";
			State.variables.chRock.aiAlgorythm.fixedAction = "staffSwipe";
		State.variables.chRock.aiAlgorythm.fixedTarget = "chPlayerCharacter";
			State.variables.sc.headingDescription = `<span @style=$chNash.colorStyleKey>//"Damn you, that hurt!"//</span>\n<span @style=$chRock.colorStyleKey>//"We are the exilees of the Beastkin tribe, and that one over there is Warmest Hope, our true Candidate!"//</span>`;
			break;
		case 4:
			State.variables.chNash.aiAlgorythm.fixedAction = "kick";
			State.variables.chRock.aiAlgorythm.fixedAction = "quake";
			State.variables.sc.headingDescription = `<span @style=$chPlayerCharacter.colorStyleKey>//"The exilees? Your true Candidate? What do you mean?"//</span>`;
			break;
		case 5:
			State.variables.chNash.aiAlgorythm.fixedAction = "kick";
			State.variables.chRock.aiAlgorythm.fixedAction = "quake";
			State.variables.sc.headingDescription = `<span @style=$chRock.colorStyleKey>//"If you truly don't know, it'll be best for you to stop fighting."//</span>`;
			break;
	}
}

// Init relationships // Fr Ro Se Do Su Ri En
window.initRelsValtanSillan = function() {
	getRelation("chVal","chSil").friendship.ltv = 1800;
	getRelation("chVal","chSil").romance.ltv = 1600;
	getRelation("chVal","chSil").sexualTension.ltv = 800;
	getRelation("chVal","chSil").domination.ltv = 400;
	getRelation("chVal","chSil").submission.ltv = 100;
	getRelation("chSil","chVal").friendship.ltv = 1800;
	getRelation("chSil","chVal").romance.ltv = 1800;
	getRelation("chSil","chVal").sexualTension.ltv = 600;
	getRelation("chSil","chVal").domination.ltv = 0;
	getRelation("chSil","chVal").submission.ltv = 200;
	getRelation("chSil","chVal").enmity.stv = 3000;
}
window.initRelsValtanNersmias = function() {
	getRelation("chVal","chNer").friendship.ltv = 50;
	getRelation("chVal","chNer").enmity.ltv = 250;
	getRelation("chVal","chNer").enmity.stv = 2000;
	getRelation("chVal","chNer").rivalry.ltv = 200;
	getRelation("chVal","chNer").submission.ltv = 100;
	getRelation("chVal","chNer").submission.stv = 500;
	getRelation("chVal","chNer").domination.ltv = 100;
	getRelation("chNer","chVal").friendship.ltv = 0;
	getRelation("chNer","chVal").enmity.ltv = 400;
	getRelation("chNer","chVal").rivalry.ltv = 500;
	getRelation("chNer","chVal").submission.ltv = 0;
	getRelation("chNer","chVal").submission.stv = 500;
	getRelation("chNer","chVal").domination.ltv = 150;
}
window.initRelsValtanMesquelles = function() {
	getRelation("chVal","chMes").friendship.ltv = 300;
	getRelation("chVal","chMes").romance.ltv = 50;
	getRelation("chVal","chMes").sexualTension.ltv = 200;
	getRelation("chVal","chMes").domination.ltv = 25;
	getRelation("chMes","chVal").friendship.ltv = 400;
	getRelation("chMes","chVal").romance.ltv = 100;
	getRelation("chMes","chVal").sexualTension.ltv = 100;
	getRelation("chMes","chVal").domination.ltv = 25;
	getRelation("chMes","chVal").enmity.ltv = 50;
	getRelation("chMes","chVal").rivalry.ltv = 25;
	getRelation("chMes","chVal").enmity.stv = 300;
	getRelation("chMes","chVal").rivalry.stv = 0;
}
window.initRelsSillanNersmias = function() {
	getRelation("chSil","chNer").friendship.ltv = 400;
	getRelation("chSil","chNer").friendship.stv = 400;
	getRelation("chSil","chNer").submission.ltv = 150;
	getRelation("chSil","chNer").submission.stv = 750;
	getRelation("chNer","chSil").friendship.ltv = 500;
	getRelation("chNer","chSil").friendship.stv = 500;
	getRelation("chNer","chSil").romance.ltv = 350;
	getRelation("chNer","chSil").romance.stv = 100;
	getRelation("chNer","chSil").sexualTension.ltv = 100;
	getRelation("chNer","chSil").sexualTension.stv = 300;
	getRelation("chNer","chSil").domination.ltv = 150;
	getRelation("chNer","chSil").domination.stv = 750;
}
window.initRelsSillanMesquelles = function() {
	getRelation("chSil","chMes").friendship.ltv = 450;
	getRelation("chMes","chSil").friendship.ltv = 300;
}
window.initRelsNersmiasMesquelles = function() {
	getRelation("chNer","chMes").friendship.ltv = 300;
	getRelation("chNer","chMes").enmity.ltv = 300;
	getRelation("chMes","chNer").friendship.ltv = 250;
	getRelation("chMes","chNer").enmity.ltv = 200;
}




