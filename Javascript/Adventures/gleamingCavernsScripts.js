///// Adventure scripts /////

	// Init First Adventure
window.initializeGleamingCavernsAdventure = function() {
	// Cleaning
	cleanFirstLoopLeftoverData();
	
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
	
	// Other story variables
	initNersmiasGlobalTrust();
	initNersmiasGlobalConviction();
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
	charactersLearnSceneActions(["chPlayerCharacter","chNash","chClaw","chVal","chMir","chAte","chArt","chHope","chRock","chSil","chNer","chMes"],["runAway"]);
	
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
	
	// Special experiences
	addCharsSpecialExperience("chMir","pntExp",15);
	addCharsSpecialExperience("chVal","pntExp",3);
	addCharsSpecialExperience("chVal","crfExp",3);
	addCharsSpecialExperience("chVal","impExp",25);
	addCharsSpecialExperience("chNash","crfExp",5);
	
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
	
	// Other patches
	applyRequiredPatches();
}

window.cleanFirstLoopLeftoverData = function() {
	if ( State.variables.StVars.temp != undefined ) {
		delete State.variables.StVars.temp;
	}
	if ( State.variables.StVars.temp2 != undefined ) {
		delete State.variables.StVars.temp2;
	}
	if ( State.variables.StVars.seMagicClassClawCheck != undefined ) {
		delete State.variables.StVars.seMagicClassClawCheck;
	}
	if ( State.variables.StVars.futaNash != undefined ) {
		delete State.variables.StVars.futaNash;
	}
	if ( State.variables.StVars.seshFlirty != undefined ) {
		delete State.variables.StVars.seshFlirty;
	}
	if ( State.variables.StVars.StretchingHelpResult != undefined ) {
		delete State.variables.StVars.StretchingHelpResult;
	}
	if ( State.variables.StVars.StretchingHelpGroped != undefined ) {
		delete State.variables.StVars.StretchingHelpGroped;
	}
	if ( State.variables.StVars.seHummingCopyCheck != undefined ) {
		delete State.variables.StVars.seHummingCopyCheck;
	}
	if ( State.variables.StVars.seHummingCopyCheck != undefined ) {
		delete State.variables.StVars.seHummingCopyCheck;
	}
	if ( State.variables.StVars.seHummingHarmonyCheck != undefined ) {
		delete State.variables.StVars.seHummingHarmonyCheck;
	}
	if ( State.variables.StVars.seHummingImproviseCheck != undefined ) {
		delete State.variables.StVars.seHummingImproviseCheck;
	}
	if ( State.variables.StVars.temp2 != undefined ) {
		delete State.variables.StVars.temp2;
	}
	if ( State.variables.StVars.seEthicsOfPowMUcheck != undefined ) { delete State.variables.StVars.seEthicsOfPowMUcheck; }
	if ( State.variables.StVars.SeFbahHowsSill != undefined ) { delete State.variables.StVars.SeFbahHowsSill; }
	if ( State.variables.StVars.SeFbahWhatsSill != undefined ) { delete State.variables.StVars.SeFbahWhatsSill; }
	if ( State.variables.StVars.SeFbahWhyTakePlaceSill != undefined ) { delete State.variables.StVars.SeFbahWhyTakePlaceSill; }
	if ( State.variables.StVars.SeFbahRegretSill != undefined ) { delete State.variables.StVars.SeFbahRegretSill; }
	if ( State.variables.StVars.SeFbahAnyQuestions != undefined ) { delete State.variables.StVars.SeFbahAnyQuestions; }
	if ( State.variables.StVars.seStHeIINashInvites != undefined ) { delete State.variables.StVars.seStHeIINashInvites; }
	if ( State.variables.StVars.seStHeIIMayRejectSex != undefined ) { delete State.variables.StVars.seStHeIIMayRejectSex; }
	if ( State.variables.StVars.seStHeIIwillpowerHit != undefined ) { delete State.variables.StVars.seStHeIIwillpowerHit; }
	if ( State.variables.StVars.flirtingAdviceChecks != undefined ) { delete State.variables.StVars.flirtingAdviceChecks; }
	if ( State.variables.StVars.DrishtyaTutorLifeAsCandidate != undefined ) { delete State.variables.StVars.DrishtyaTutorLifeAsCandidate; }
	if ( State.variables.StVars.DrishtyaTutorThoughtsOnPeers != undefined ) { delete State.variables.StVars.DrishtyaTutorThoughtsOnPeers; }
	if ( State.variables.StVars.DrishtyaTutorReachedQuestions != undefined ) { delete State.variables.StVars.DrishtyaTutorReachedQuestions; }
	if ( State.variables.StVars.DrishtyaTutorBehindTheRest != undefined ) { delete State.variables.StVars.DrishtyaTutorBehindTheRest; }
	if ( State.variables.StVars.DrishtyaTutorStrengthenBonds != undefined ) { delete State.variables.StVars.DrishtyaTutorStrengthenBonds; }
	if ( State.variables.StVars.DrishtyaTutorDominatingOthers != undefined ) { delete State.variables.StVars.DrishtyaTutorDominatingOthers; }
	if ( State.variables.StVars.DrishtyaTutorLeaveTheTemple != undefined ) { delete State.variables.StVars.DrishtyaTutorLeaveTheTemple; }
	if ( State.variables.StVars.DrishtyaTutorEmpathyCheck != undefined ) { delete State.variables.StVars.DrishtyaTutorEmpathyCheck; }
	if ( State.variables.StVars.VaryonteTutorHasDick != undefined ) { delete State.variables.StVars.VaryonteTutorHasDick; }
	if ( State.variables.StVars.check2 != undefined ) { delete State.variables.StVars.check2; }
	if ( State.variables.StVars.check3 != undefined ) { delete State.variables.StVars.check3; }
	if ( State.variables.StVars.check4 != undefined ) { delete State.variables.StVars.check4; }
	if ( State.variables.StVars.check10 != undefined ) { delete State.variables.StVars.check10; }
	if ( State.variables.StVars.check1 != undefined ) { delete State.variables.StVars.check1; }
	if ( State.variables.StVars.check5 != undefined ) { delete State.variables.StVars.check5; }
	if ( State.variables.StVars.check6 != undefined ) { delete State.variables.StVars.check6; }
	if ( State.variables.StVars.check7 != undefined ) { delete State.variables.StVars.check7; }
	if ( State.variables.StVars.check8 != undefined ) { delete State.variables.StVars.check8; }
	if ( State.variables.StVars.check9 != undefined ) { delete State.variables.StVars.check9; }
	if ( State.variables.StVars.playerJoinedBkifBattle != undefined ) { delete State.variables.StVars.playerJoinedBkifBattle; }
	if ( State.variables.StVars.drishtyaSawVaryonteMoves != undefined ) { delete State.variables.StVars.drishtyaSawVaryonteMoves; }
	if ( State.variables.StVars.BkifNashRelScore != undefined ) { delete State.variables.StVars.BkifNashRelScore; }
	if ( State.variables.StVars.BkifStakes != undefined ) { delete State.variables.StVars.BkifStakes; }
	if ( State.variables.StVars.clawLostBkif != undefined ) { delete State.variables.StVars.clawLostBkif; }
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
		if ( gC(cK).hasOwnProperty("flagSpokeWithNersmias") ) {
			delete gC(cK).flagSpokeWithNersmias;
		}
	}
	
	// Finish Hypnotic Resistance status effect
	gC("chPlayerCharacter").removeSpecificState("HyRe");
	
	// Chance for Nashillbyir to get a dildo - If the dildoPlay map story event took place.
	if ( isStVarOn("dldPly") ) {
		if ( getCharsSpecialExperience("chNash","crfExp") >= 5 ) {
			if ( (limitedRandomInt(100) + getCharsSpecialExperience("chNash","crfExp") * 10) >= 100 ) {
				createEquipment("w5","chNash");
			}
		}
	}
	
	// Maps
	deinitMapGleamingCaverns();
	initMapTrainingGrounds();
	
	State.variables.settings.followingAllowed = true;
	State.variables.settings.relationshipTypesAllowed = true;
	State.variables.settings.challengingAllowed = true;
	State.variables.settings.assaultingAllowed = true;
	State.variables.settings.talkingAllowed = true;
	
	// Remove FA-specific story variables
	removeFromStVarsList("alwSct");
	removeFromStVarsList("blmClaw");
	removeFromStVarsList("dldCrf");
	removeFromStVarsList("dldPly");
	removeFromStVarsList("mphInit");
	removeFromStVarsList("mphFsTf");
	removeFromStVarsList("mphFnTf");
	removeFromStVarsList("hddHut");
	removeFromStVarsList("drMlCon");
	removeFromStVarsList("drMlVal");
	removeFromStVarsList("vlSfsh");	
	removeFromStVarsList("vlTlk1");	
	removeFromStVarsList("vlTlk2");	
	removeFromStVarsList("vlTlk3");	
	removeFromStVarsList("vlTlk3");	
	removeFromStVarsList("vlNoCv");	
	for ( var vr of ["diVcAt","diHeAt","diSwAt","diAcWn","diAcLs","diAcFf","diDfWn","diDfLs",
					 "knHnNt","brMnAr","GcVcCv","nsbRea","noNeHy","gcSiTl","gcSiWT","gcSiSp",
					 "tfWnSF","tfTfVl","plSgVF","tfNsSp","tfMrSp","tfClSp","tfPlSp","tfVlSP" ] ) {
		removeFromStVarsList(vr);
	}
	
	for ( var vr of ["nerTrust","nerConviction","nerLocTrust","nerLocConviction","nsbPlHeVl","nePtPc","nePtFP","nePtCo","shapeshiftersForgiveValtan"] ) {
		if ( State.variables[vr] != undefined ) {
			delete State.variables[vr];
		}
	}
	
	if ( State.variables.morphMerit != undefined ) {
		delete State.variables.morphMerit;
	}
	
	// Cleaning
	removeFromStVarsList("HdRlts");
	cleanFirstLoopLeftoverData();
}

	// Battle scenes
window.ccsFAplayerAteFightOneSucker = function() {
	var mon = createEssenceSucker(1,0,1);
	State.variables.sc.startScene(
	"bs","fixed",["chPlayerCharacter","chAte"],[mon],"__Swamp ~ Western Path Lake__\nCountless dragonflies roam the shores of the lake in their quest for food, and the flapping of their wings adds ambience music to the scenery.",createEndConditionStoryBattleWithDraw("FA BeatenSucker 1","FA SuckerVictory 1","FA BeatenSucker 1"),6,
	"FA BeatenSucker 1");
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiBattleAlgorithm();
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
			gC(charKey).aiAlgorythm = createAiBattleAlgorithm();
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
			gC(charKey).aiAlgorythm = createAiBattleAlgorithm();
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

// Nersmias story stats functions
window.initNersmiasGlobalTrust = function() {
	State.variables.nerTrust = 50;
}
window.initNersmiasGlobalConviction = function() {
	State.variables.nerConviction = 100;
}
window.modifyNersmiasGlobalTrust = function(summedValue) {
	if ( State.variables.nerTrust == undefined ) {
		initNersmiasGlobalTrust();
	}
	State.variables.nerTrust += summedValue;
}
window.modifyNersmiasGlobalConviction = function(summedValue) {
	if ( State.variables.nerConviction == undefined ) {
		initNersmiasGlobalConviction();
	}
	State.variables.nerConviction += summedValue;
}
window.nsbLocalToGlobalTnC = function() {
	State.variables.nerConviction += State.variables.nerLocConviction * 0.25 - 25;
	State.variables.nerTrust += State.variables.nerLocTrust * 0.25 - 12;
}

window.initNersmiasLocalTrust = function() {
	if ( State.variables.nerTrust == undefined ) {
		initNersmiasGlobalTrust();
	}
	var addedTrust = State.variables.nerTrust * 0.35;
	State.variables.nerLocTrust = 32.5 + addedTrust;
}
window.initNersmiasLocalConviction = function() {
	if ( State.variables.nerConviction == undefined ) {
		initNersmiasGlobalConviction();
	}
	var addedConviction = State.variables.nerConviction * 0.35;
	State.variables.nerLocConviction = 65 + addedConviction;
}
window.modifyNersmiasLocalTrust = function(summedValue) {
	if ( State.variables.nerLocTrust == undefined ) {
		initNersmiasLocalTrust();
	}
	State.variables.nerLocTrust += summedValue;
}
window.modifyNersmiasLocalConviction = function(summedValue) {
	if ( State.variables.nerLocConviction == undefined ) {
		initNersmiasLocalConviction();
	}
	State.variables.nerLocConviction += summedValue;
}
window.IorPmodifiesNersmiasLocalTorC = function(summedValue,IorP,TorC) {
	var mult = 1;
	var qualityValue = 20;
	// Get either inspiration or persuasion
	if ( IorP == 'i' ) {
		qualityValue = getPlayerInspirationPower();
	} else {
		qualityValue = getPlayerPersuasionPower();
	}
	// Get final change
	if ( qualityValue >= 40 ) {
		mult = 1.5;
	} else {
		mult = ((qualityValue - 20) / 40) + 1;
	}
	var changedValue = summedValue*mult;
	// Apply changes
	if ( TorC == 't' ) {
		modifyNersmiasLocalTrust(changedValue);
	} else {
		modifyNersmiasLocalConviction(changedValue);
	}
}

window.modifyPlayerHelpedValtan = function(valueChange) {
	if ( State.variables.nsbPlHeVl == undefined ) {
		State.variables.nsbPlHeVl = 0;
	}
	State.variables.nsbPlHeVl += valueChange;
}

window.getPlayerSocialEvaluationPower = function() {
	var power = gCstat("chPlayerCharacter","empathy") * 1 + gCstat("chPlayerCharacter","perception") * 0.65 + gCstat("chPlayerCharacter","luck") * 0.35;
	return power;
}
window.getEvaluationLevelInaccuracyNersmias = function () {
	var psep = getPlayerSocialEvaluationPower();
	var level = 3;
	var inaccuracy = 0;
	if ( psep <= 24 ) {
		level = 1;
		inaccuracy = 0.3;
	} else if ( psep <= 30 ) {
		level = 2;
		inaccuracy = 0.15;
	}
	return [level,inaccuracy];
}
window.getNersmiasTrustDescription = function() {
	var li = getEvaluationLevelInaccuracyNersmias();
	var descLevel = li[0];
	var inaccuracy = li[1] * 100;
	if ( State.variables.nerLocTrust == undefined ) { initNersmiasLocalTrust(); }
	var perceivedTrustQuantity = State.variables.nerLocTrust;
	if ( inaccuracy != 0 ) {
		perceivedTrustQuantity *= ((- inaccuracy + limitedRandomInt(inaccuracy * 2)) * 0.01 + 1);
	}
	
	var description = ""
	if ( descLevel < 2 ) {
		if ( perceivedTrustQuantity >= 55 ) {
			description = "Nersmias has a clear, calm voice.";
		} else if ( perceivedTrustQuantity >= 40 ) {
			description = "Nersmias is immodest and clear.";
		} else if ( perceivedTrustQuantity >= 20 ) {
			description = "Nersmias is brash and direct.";
		} else {
			description = "Nersmias looks at you with some contempt, even.";
		}
	} else {
		if ( perceivedTrustQuantity >= 55 ) {
			description = "Nersmias speaks clearly, without saving up in details. He wants to make sure to get his points across.";
		} else if ( perceivedTrustQuantity >= 40 ) {
			description = "Despite his reserves, Nersmias is making an effort to take your arguments at face value.";
		} else if ( perceivedTrustQuantity >= 20 ) {
			description = "Nersmias' gestures make it clear he's growing more cynical about your positions.";
		} else {
			description = "Nersmias is tense and barely containing his anger.";
		}
		if ( descLevel > 2 ) {
			description += "\nTrust: " + State.variables.nerLocTrust.toFixed(1);
		}
	}
	State.variables.nsbtDesc = description;
	return description;
}
window.getNersmiasConvictionDescription = function() {
	var li = getEvaluationLevelInaccuracyNersmias();
	var descLevel = li[0];
	var inaccuracy = li[1] * 100;
	if ( State.variables.nerLocConviction == undefined ) { initNersmiasLocalConviction(); }
	var perceivedConvictionQuantity = State.variables.nerLocConviction;
	if ( inaccuracy != 0 ) {
		perceivedConvictionQuantity *= ((- inaccuracy + limitedRandomInt(inaccuracy * 2)) * 0.01 + 1);
	}
	
	var description = ""
	if ( descLevel < 2 ) {
		if ( perceivedConvictionQuantity >= 80 ) {
			description = "Nersmias is decisive and resolute.";
		} else if ( perceivedConvictionQuantity >= 55 ) {
			description = "Nersmias speaks loud and clear.";
		} else if ( perceivedConvictionQuantity >= 30 ) {
			description = "Nersmias is willing to concede a point from time to time.";
		} else {
			description = "Nersmias seems tired.";
		}
	} else {
		if ( perceivedConvictionQuantity >= 80 ) {
			description = "Nersmias's voice sounds unshaken, strong as the sturdiest tree in a most ancient forest.";
		} else if ( perceivedConvictionQuantity >= 55 ) {
			description = "Nersmias' voice is clearly determined and full of conviction.";
		} else if ( perceivedConvictionQuantity >= 30 ) {
			description = "Nersmias is sometimes forced to act defensively, stopping to weigh the value of your positions.";
		} else {
			description = "The priest is now more reflexive than combative, arguing not only with you, but also himself.";
		}
		if ( descLevel > 2 ) {
			description += "\nConviction: " + State.variables.nerLocConviction.toFixed(1);
		}
	}
	State.variables.nsbcDesc = description;
	return description;
}

window.getPlayerInspirationPower = function() {
	var ip = gCstat("chPlayerCharacter","charisma") * 0.9 + gCstat("chPlayerCharacter","will") * 0.6 + gCstat("chPlayerCharacter","empathy") * 0.3 + gCstat("chPlayerCharacter","luck") * 0.2;
	return ip;
}
window.getPlayerPersuasionPower = function() {
	var pp = gCstat("chPlayerCharacter","charisma") * 0.9 + gCstat("chPlayerCharacter","intelligence") * 0.6 + gCstat("chPlayerCharacter","empathy") * 0.3 + gCstat("chPlayerCharacter","luck") * 0.2;
	return pp;
}

window.getCharsValtanJudgement = function(cK) {
	var results = [0,0]; // Levels of judgement. [0]: Supports Valtan reuniting with Sillan, [1]: Supports Valtan being pardoned
						// -2 , -1 , 0 , 1 , 2
						
	if ( gC(cK).hasOwnProperty("supsValLove") ) {
		if ( gC(cK).supsValLove <= -5 ) {
			results[0] = -2;
		} else if ( gC(cK).supsValLove <= -2.5 ) {
			results[0] = -1;
		} else if ( gC(cK).supsValLove <= 2.5 ) {
			results[0] = 0;
		} else if ( gC(cK).supsValLove <= 5 ) {
			results[0] = 1;
		} else {
			results[0] = 2;
		}
	}
	
	if ( gC(cK).hasOwnProperty("supsValPardon") ) {
		if ( gC(cK).supsValPardon <= -5 ) {
			results[1] = -2;
		} else if ( gC(cK).supsValPardon <= -2.5 ) {
			results[1] = -1;
		} else if ( gC(cK).supsValPardon <= 2.5 ) {
			results[1] = 0;
		} else if ( gC(cK).supsValPardon <= 5 ) {
			results[1] = 1;
		} else {
			results[1] = 2;
		}
	}
	
	return results;
}
window.getCharsValtanJudgementDescription = function(cK) {
	var txt = colorText("//\"Could you tell me, in all honesty, what do you think the Shapeshifters should do with Valtan?\"//",gC("chPlayerCharacter").speechColor) + "\n";
	var sndText = "";
	var jgment = getCharsValtanJudgement(cK);
	if ( jgment[1] < 0 ) {
		sndText = "Valtan\'s actions don\'t really speak in her favor,";
	} else if ( jgment[1] > 0 ) {
		sndText = "I\'m sure she had strong reasons to act against her tribe\'s law,";
	} else {
		sndText = "I\'m not really sure what to think about her breaking her tribe\'s law,";
	}
	if ( (jgment[0] < 0 && jgment[1] > 1) || (jgment[0] > 0 && jgment[1] < 0) ) {
		sndText += " but ";
	} else {
		sndText += " and ";
	}
	if ( jgment[0] < 0 ) {
		sndText += "I wouldn\'t really speak in her favor if Sillan asked me";
		if ( jgment[1] < 0 ) {
			sndText += " either.";
		} else {
			sndText += ".";
		}
	} else if ( jgment[0] > 0 ) {
		sndText += "Nersmias is definitely over-reacting by not letting her speak to Sillan.";
	} else {
		sndText += "I don\'t know what to think of Nersmias\' attitude";
		if ( jgment[1] == 0 ) {
			sndText += " either.";
		} else {
			sndText += ".";
		}
	}
	txt += colorText("//\"" + sndText + "\"//",gC(cK).speechColor);
	return txt;
}


