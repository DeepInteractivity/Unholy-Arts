////////// CUSTOM SCRIPTS //////////

// Customize portrait
window.assignPcPortrait = function() {
	switch(State.variables.StVars.temp2) {
		case "option1":
			gC("chPlayerCharacter").fullPortrait = function() {
				return "[img[img/portraits/mc1-full.png]]";
			}
			gC("chPlayerCharacter").avatar = function() {
				return "[img[img/portraits/mc1-avatar.png]]";
			}
			gC("chPlayerCharacter").fullPortraitL = "img/portraits/mc1-full.png";
			gC("chPlayerCharacter").avatarL = "img/portraits/mc1-avatar.png";
			charReceivesAnTags('chPlayerCharacter',['Mcy','WhiteHuman']);
			break;
		case "option2":
			gC("chPlayerCharacter").fullPortrait = function() {
				return "[img[img/portraits/mc2-full.png]]";
			}
			gC("chPlayerCharacter").avatar = function() {
				return "[img[img/portraits/mc2-avatar.png]]";
			}
			gC("chPlayerCharacter").fullPortraitL = "img/portraits/mc2-full.png";
			gC("chPlayerCharacter").avatarL = "img/portraits/mc2-avatar.png";
			charReceivesAnTags('chPlayerCharacter',['Mcr','WhiteHuman']);
			break;
		case "option3":
			gC("chPlayerCharacter").fullPortrait = function() {
				return "[img[img/portraits/mc3-full.png]]";
			}
			gC("chPlayerCharacter").avatar = function() {
				return "[img[img/portraits/mc3-avatar.png]]";
			}
			gC("chPlayerCharacter").fullPortraitL = "img/portraits/mc3-full.png";
			gC("chPlayerCharacter").avatarL = "img/portraits/mc3-avatar.png";
			charReceivesAnTags('chPlayerCharacter',['Mcb','WhiteHuman']);
			break;
		case "optionCustom":
			gC("chPlayerCharacter").fullPortrait = function() {
				return "[img[img/portraits/custom-full.png]]";
			}
			gC("chPlayerCharacter").avatar = function() {
				return "[img[img/portraits/custom-avatar.png]]";
			}
			gC("chPlayerCharacter").fullPortraitL = "img/portraits/custom-full.png";
			gC("chPlayerCharacter").avatarL = "img/portraits/custom-avatar.png";
			break;
	}
}

// Customize stats
window.getSelectStatListBox = function(position) {
	var lb = '<<listbox "$selectedStats[' + position + ']" autoselect>>\n';
	for ( var st of getStatNamesArray() ) {
		lb += '<<option "' + firstToCap(st) + '" "' + st + '">>\n';
	}
	lb += '<</listbox>>';
	return lb;
}

State.variables.selectStatListBoxes = [ getSelectStatListBox(0) , getSelectStatListBox(1) , getSelectStatListBox(2), getSelectStatListBox(3), getSelectStatListBox(4), getSelectStatListBox(5) ];

window.applyPcStatBonusesWeaknesses = function() {
	var sts = State.variables.selectedStats;
	State.variables.chPlayerCharacter[sts[0]].value += 2;
	State.variables.chPlayerCharacter[sts[0]].affinity += 0.1;
	State.variables.chPlayerCharacter[sts[1]].value += 1;
	State.variables.chPlayerCharacter[sts[1]].affinity += 0.05;
	State.variables.chPlayerCharacter[sts[2]].value += 1;
	State.variables.chPlayerCharacter[sts[2]].affinity += 0.05;
	State.variables.chPlayerCharacter[sts[3]].value -= 2;
	State.variables.chPlayerCharacter[sts[3]].affinity -= 0.1;
	State.variables.chPlayerCharacter[sts[4]].value -= 1;
	State.variables.chPlayerCharacter[sts[4]].affinity -= 0.05;
	State.variables.chPlayerCharacter[sts[5]].value -= 1;
	State.variables.chPlayerCharacter[sts[5]].affinity -= 0.05
	
	recalculateMaxBars("chPlayerCharacter");
	// State.variables.chPlayerCharacter.recalculateMaxBars();
}

// Re-assignation
window.reassignPlayerStats = function() {
	var tempStat = gC("chPlayerCharacter")[State.variables.StVars.check1];
	gC("chPlayerCharacter")[State.variables.StVars.check1] = gC("chPlayerCharacter")[State.variables.StVars.check4];
	gC("chPlayerCharacter")[State.variables.StVars.check4] = tempStat;
	tempStat = gC("chPlayerCharacter")[State.variables.StVars.check2];
	gC("chPlayerCharacter")[State.variables.StVars.check2] = gC("chPlayerCharacter")[State.variables.StVars.check5];
	gC("chPlayerCharacter")[State.variables.StVars.check5] = tempStat;
	tempStat = gC("chPlayerCharacter")[State.variables.StVars.check3];
	gC("chPlayerCharacter")[State.variables.StVars.check3] = gC("chPlayerCharacter")[State.variables.StVars.check6];
	gC("chPlayerCharacter")[State.variables.StVars.check6] = tempStat;
	State.variables.StVarsList = arrayMinusA(State.variables.StVarsList,"go0");
}

// Old customize stats
window.returnAssignTalentsScript = function() {
	var script = returnAssignTalentScript("physique");
	script += returnAssignTalentScript("agility");
	script += returnAssignTalentScript("resilience");
	script += returnAssignTalentScript("will");
	script += returnAssignTalentScript("intelligence");
	script += returnAssignTalentScript("perception");
	script += returnAssignTalentScript("empathy");
	script += returnAssignTalentScript("charisma");
	script += returnAssignTalentScript("luck");
	script += "\n<<link [[Cancel all|CharCust 1]]>><<script>>unassignAllTalentVariations()<<" + "/script>><<" + "/link>>";
	return script;
}
window.returnAssignTalentScript = function(attribute) {
	var script = " ";
	if ( State.variables.StVars.pcMainDoom > 0 ) {
		script += "<<link [[<< |CharCust 1]]>><<" + "script>>";
		script += "assignPcGreatWeakness('" + attribute + "');"
		script += "<<" + "/script>><<" + "/link>> ";
	}
	if ( State.variables.StVars.pcDoom > 0 ) {
		script += "<<link [[< |CharCust 1]]>><<" + "script>>";
		script += "assignPcWeakness('" + attribute + "');"
		script += "<<" + "/script>><<" + "/link>> ";
	}
	script += firstToCap(attribute) + returnAttributeTooltip(attribute) + ": " + State.variables.chPlayerCharacter[attribute].value + " ";
	if ( State.variables.StVars.pcBoon > 0 ) {
		script += "<<link [[> |CharCust 1]]>><<" + "script>>";
		script += "assignPcTalent('" + attribute + "');"
		script += "<<" + "/script>><<" + "/link>> ";
	}
	if ( State.variables.StVars.pcMainBoon > 0 ) {
		script += "<<link [[>> |CharCust 1]]>><<" + "script>>";
		script += "assignPcGreatTalent('" + attribute + "');"
		script += "<<" + "/script>><<" + "/link>> ";
	}
	
	script += "\n";
	return script;
}

window.unassignTalentVariation = function(attribute) {
	switch(State.variables.chPlayerCharacter[attribute].value) {
		case 8:
			State.variables.StVars.pcMainDoom++;
			break;
		case 9:
			State.variables.StVars.pcDoom++;
			break;
		case 10:
			break;
		case 11:
			State.variables.StVars.pcBoon++;
			break;
		case 12:
			State.variables.StVars.pcMainBoon++;
			break;
		State.variables.chPlayerCharacter[attribute].value = 10;
		State.variables.chPlayerCharacter[attribute].affinity = 1.0;
	}
}
window.assignPcGreatWeakness = function(attribute) {
	unassignTalentVariation(attribute);
	State.variables.chPlayerCharacter[attribute].value = 8;
	State.variables.chPlayerCharacter[attribute].affinity = 0.8;
	State.variables.StVars.pcMainDoom--;
}
window.assignPcWeakness = function(attribute) {
	unassignTalentVariation(attribute);
	State.variables.chPlayerCharacter[attribute].value = 9;
	State.variables.chPlayerCharacter[attribute].affinity = 0.9;	
	State.variables.StVars.pcDoom--;
}
window.assignPcTalent = function(attribute) {
	unassignTalentVariation(attribute);
	State.variables.chPlayerCharacter[attribute].value = 11;
	State.variables.chPlayerCharacter[attribute].affinity = 1.1;
	State.variables.StVars.pcBoon--;
}
window.assignPcGreatTalent = function(attribute) {
	unassignTalentVariation(attribute);
	State.variables.chPlayerCharacter[attribute].value = 12;
	State.variables.chPlayerCharacter[attribute].affinity = 1.2;	
	State.variables.StVars.pcMainBoon--;
}
window.unassignAllTalentVariations = function() {
	State.variables.chPlayerCharacter.physique.value = 10;
	State.variables.chPlayerCharacter.physique.affinity = 1.0;
	State.variables.chPlayerCharacter.agility.value = 10;
	State.variables.chPlayerCharacter.agility.affinity = 1.0;
	State.variables.chPlayerCharacter.resilience.value = 10;
	State.variables.chPlayerCharacter.resilience.affinity = 1.0;
	State.variables.chPlayerCharacter.will.value = 10;
	State.variables.chPlayerCharacter.will.affinity = 1.0;
	State.variables.chPlayerCharacter.intelligence.value = 10;
	State.variables.chPlayerCharacter.intelligence.affinity = 1.0;
	State.variables.chPlayerCharacter.perception.value = 10;
	State.variables.chPlayerCharacter.perception.affinity = 1.0;
	State.variables.chPlayerCharacter.empathy.value = 10;
	State.variables.chPlayerCharacter.empathy.affinity = 1.0;
	State.variables.chPlayerCharacter.charisma.value = 10;
	State.variables.chPlayerCharacter.charisma.affinity = 1.0;
	State.variables.chPlayerCharacter.luck.value = 10;
	State.variables.chPlayerCharacter.luck.affinity = 1.0;
	State.variables.StVars.pcBoon = 2;
	State.variables.StVars.pcDoom = 2;
	State.variables.StVars.pcMainBoon = 1;
	State.variables.StVars.pcMainDoom = 1;	
}
window.returnAttributeTooltip = function(attribute) {
	var tooltip = "";
	switch (attribute) {
		case "physique":
			tooltip = "<span title='Physique is used in all actions related to pure physical strength,"
					+ " such as attacking with a blade or riding someone.'>^^(?)^^</span>";
			break;
		case "agility":
			tooltip = "<span title='Agility influences all actions that require physical dexterity,"
					+ " like dodging an arrow or licking someone´s pleasure parts.'>^^(?)^^</span>";
			break;
		case "resilience":
			tooltip = "<span title='Resilience is involved in all events related to physical endurance, "
					+ "such as receiving a punch and being mounted.'>^^(?)^^</span>";
			break;
		case "will":
			tooltip = "<span title='Will determines the strength of your character, which is important "
					+ "for arcane, social and sexual matters.'>^^(?)^^</span>";
			break;
		case "intelligence":
			tooltip = "<span title='Your intelligence helps you succeed at matters related to logic,"
					+ " such as casting spells.'>^^(?)^^</span>";
			break;
		case "perception":
			tooltip = "<span title='Your perception will help you at refining your senses, which may help you"
					+ " at hearing distant conversations, noticing obscure details or dodging a blow.'>^^(?)^^</span>";
			break;
		case "empathy":
			tooltip = "<span title='Empathy is your capacity to understand others. It will help you at"
					+ " developing your relationships and understanding people´s motivations.'>^^(?)^^</span>";
			break;
		case "charisma":
			tooltip = "<span title='Charisma is used to convey your feelings and heat up the emotions of"
					+ " others. It will help you at developing your relationships and preemptively watering groins.'>^^(?)^^</span>";
			break;
		case "luck":
			tooltip = "<span title='It may feel as if luck didn´t exist, but what tells you it doesn´t "
					+ "influence every single thing that happens to you?'>^^(?)^^</span>";
			break;
	}
	return tooltip;
}

// Tests
window.configureTestsRoomScene = function() {
	var leadType = "none";
	
	if ( State.variables.tsr.sceneType == "normalLead" ) {
		leadType = "dynamic";
	}
	else if ( State.variables.tsr.sceneType == "passive" ) {
		leadType = "fixed";
	}
	else if ( State.variables.tsr.sceneType == "active" ) {
		leadType = "fixed";
	}
	else if ( State.variables.tsr.sceneType == "romantic" ) {
		leadType = "dynamic";
	}
	else if ( State.variables.tsr.sceneType == "competition" ) {
		leadType = "dynamic";
	}
	else if ( State.variables.tsr.sceneType == "submission" ) {
		leadType = "fixed";
	}
	else if ( State.variables.tsr.sceneType == "domination" ) {
		leadType = "fixed";
	}
	
	State.variables.sc.startScene("ss", leadType,
		["chPlayerCharacter"], [State.variables.tsr.character],
		"wow such testz",endConditionTurns,100,
		"Testing Scenes Room");
	State.variables[State.variables.tsr.character].aiAlgorythm = createAiWeightedMissionsByTaste();
	// State.variables[State.variables.tsr.character].aiAlgorythm.fixedTarget = "chPlayerCharacter";
	switch ( State.variables.tsr.sceneType ) {
		case "normalLead":
			State.variables[State.variables.tsr.character].aiAlgorythm.setRoleEqualFooting();
			break;
		case "passive":
			State.variables[State.variables.tsr.character].aiAlgorythm.setRolePassive();
			State.variables.chPlayerCharacter.hasLead = true;
			break;
		case "active":
			State.variables[State.variables.tsr.character].aiAlgorythm.setRoleActive();
			State.variables[State.variables.tsr.character].hasLead = true;
			break;
		case "romantic":
			State.variables[State.variables.tsr.character].aiAlgorythm.setRoleRomantic();
			break;
		case "competition":
			State.variables[State.variables.tsr.character].aiAlgorythm.setRoleCompetition();
			break;
		case "submission":
			State.variables[State.variables.tsr.character].aiAlgorythm.setRoleSubmission();
			State.variables.chPlayerCharacter.hasLead = true;
			break;
		case "domination":
			State.variables[State.variables.tsr.character].aiAlgorythm.setRoleDomination();
			State.variables[State.variables.tsr.character].hasLead = true;
			break;
	}

	charactersLearnSceneActions(["chVal"],[
									"doublePenetration"
		]);
	State.variables.chVal.saList = ["doNothing", "struggle", "strokePussy", "lickGroin", "baKissLips", "baStrokeDick", "baStrokePussy", "baThrust", "baPushHipsBack", "baScissor", "baScissorBack", "baRideDick", "baPushDickBack", "coldGuts", "baTease", "embers", "freezeFeet", "sparkingRubbing", "thrust", "piston", "finalPush", "suckDick", "lickPussy", "scissor", "strokeAss", "analThrust", "dickFootjob", "pussyFootjob", "lickLegs", "pushHipsBack", "spanking", "fuckFace", "rideFace", "frenchKiss", "legHoldHead", "getBlowjob", "doublePenetration", "mountFaceToFace", "mountFromBehind", "pounceFrontalD2P", "pounceFrontalP2P", "pounceFrontalP2D", "doubleThrust","slimeHug","denyOrgasm","holdHands"];
	//State.variables.chVal.tastes.bondage.w = 20000;
	//State.variables.chVal.tastes.domination.w = 20000;
	State.variables.chVal.tastes.denial.w = 2000;
}

window.configureBattleTestsRoomScene = function() {
	State.variables.sc.startScene("bs", "none",
		["chPlayerCharacter"], [State.variables.tsr.character],
		"wow such testz",endConditionTurns,100,
		"Testing Scenes Room");
	State.variables[State.variables.tsr.character].aiAlgorythm = createAiBattleAlgorithm();
}

window.setUpTestScenesRoom = function() {
	gC("chPlayerCharacter").tastes["domination"].r = 1;
	gC("chNash").tastes["submission"].r = 1;
	gC("chPlayerCharacter").tastes["bondage"].r = 1;
	gC("chNash").tastes["bondage"].r = 1;
	charactersLearnSceneActions(getCandidatesKeysArray(),["strokePussy","strokeBreasts","kissLips","frottage","frenchKiss","kneel","makeKneel","lickGroin",
	"legHoldHead","mountFromBehind","penetratePussy","thrust","piston","finalPush","mountFaceToFace","getBlowjob","suckDick","lickPussy","interlockLegs",
	"scissor","strokeAss","penetrateAss","analThrust","holdArms","vinesHoldArms","dickFootjob","pussyFootjob","lickLegs","rideDick","pushDickBack","extraMountFromBehind","analMountDick","analRideDick","analPushDickBack","holdHands","kissNeck","whisperSNs","giveCunnilingus","giveBlowjob","mountFaceToGroin","askMountFromBehind","extraAskMountFromBehind","gallopDick","gallopPussy","spanking"]);
	
	gC("chPlayerCharacter").race = "shapeshifter";
	
	charactersLearnSceneActions(["chPlayerCharacter"],[
									"kick","coldGuts",
									"embers","freezeFeet","sparkingRubbing",
									"taunt","baTease",
									"realHypnoticGlance"
									,"energyDrainingKiss"
									,"baEtherealChains","etherealChains",
									"denyOrgasm","teaseLockedPussy","teaseLockedDick",
									"doublePenetration","encInit"
		]);
	charactersLearnSceneActions(["chVal"],[
									"denyOrgasm","teaseLockedPussy","teaseLockedDick"
		]);
	charactersLearnSceneActions(["chNash"],[
									"encInit"
		]);
}

window.setUpBattleTestsRoom = function() {
	/*
	
									"baKissLips","baStrokeDick","baStrokePussy",
									"pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D",
									"baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack",
									"kick","coldGuts",
									"embers","freezeFeet","sparkingRubbing",
									"taunt","baTease"
									*/
	// Chars learn battle moves here
	charactersLearnSceneActions(getCandidatesKeysArray(),[
									"baKissLips","baStrokeDick","baStrokePussy",
									"pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D",
									"baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack","baTeaseLockedDick","baTeaseLockedPussy","pounceFrontal"
		]);
	charactersLearnSceneActions(["chPlayerCharacter"],[
									"kick","coldGuts",
									"embers","freezeFeet","sparkingRubbing",
									"taunt","baTease"
									,"baHypnoticGlance"
									,"baEnergyDrainingKiss","baDrainingKiss","baEtherealChains"
		]);
	charactersLearnSceneActions(["chNash","chClaw"],[
									"kick","coldGuts",
									"taunt"
		]);
	charactersLearnSceneActions(["chMir","chVal","chAte"],[
									"embers","freezeFeet","sparkingRubbing",
		]);
	charactersLearnSceneActions(["chVal"],[
									"baTease",
		]);
	for ( var character of getCandidatesKeysArray() ) {
		recalculateMaxBars(character);
		// gC(character).recalculateMaxBars();
		gC(character).restoreBars();
	}
}

window.setUpMultiBattleTest = function() {
	// Init setup
	//State.variables.chPlayerCharacter.agility.value = 50;
	//State.variables.chPlayerCharacter.physique.value = 50;
	//State.variables.chPlayerCharacter.intelligence.value = 50;
	//State.variables.chPlayerCharacter.luck.value = 50;
	charactersLearnSceneActions(getCandidatesKeysArray(),[
									"baKissLips","baStrokeDick","baStrokePussy",
									"pounceFrontalD2P","pounceFrontalP2P","pounceFrontalP2D",
									"baThrust","baPushHipsBack","baScissor","baScissorBack","baRideDick","baPushDickBack"
		]);
	charactersLearnSceneActions(["chPlayerCharacter"],[
									"kick","coldGuts",
									"embers","freezeFeet","sparkingRubbing",
									"taunt","baTease"
									,"baHypnoticGlance"
									,"baEnergyDrainingKiss","baDrainingKiss","baEtherealChains",
									"baBorrowedIdentity","fireBreath","daringAssault","baRelaxingScent"
		]);
	charactersLearnSceneActions(["chPlayerCharacter"],returnSecondScrollGroupActionsList());
	charactersLearnSceneActions(["chPlayerCharacter"],returnSecondAdventureGroupActionsList());
	charactersLearnSceneActions(["chNash","chClaw"],[
									"kick","coldGuts",
									"taunt"
		]);
	charactersLearnSceneActions(["chMir","chVal","chAte"],[
									"embers","freezeFeet","sparkingRubbing",
		]);
	charactersLearnSceneActions(["chVal"],[
									"baTease",
									"baBorrowedIdentity"
		]);
	for ( var character of getCandidatesKeysArray() ) {
		recalculateMaxBars(character);
		// gC(character).recalculateMaxBars();
		gC(character).restoreBars();
	}
		
	var weaponID = createEquipment("w9","chPlayerCharacter");
	equipObjectOnWearer(weaponID,"chPlayerCharacter",-1);
	
	gC("chPlayerCharacter").race = "beastkin";
	
	// Start scene
	State.variables.sc.startScene("bs", "none",
		["chPlayerCharacter","chAte"], ["chNash","chVal"],
		"wow such testz",endConditionStandardBattle,100,
		"Testing Scenes Room");
	State.variables.chAte.aiAlgorythm = createAiBattleAlgorithm();
	State.variables.chNash.aiAlgorythm = createAiBattleAlgorithm();
	State.variables.chVal.aiAlgorythm = createAiBattleAlgorithm();
	
	//State.variables.chNash.lust.current = 1;
	//State.variables.chVal.lust.current = 25;
}

window.setUpMultiSexTest = function() {
	gC("chPlayerCharacter").addBodypart("dick","dick");
	gC("chVal").addBodypart("dick","dick");
	gC("chMir").addBodypart("dick","dick");
	gC("chPlayerCharacter").tastes["domination"].r = 2;
	gC("chNash").tastes["submission"].r = 2;
	gC("chPlayerCharacter").tastes["bondage"].r = 1;
	gC("chNash").tastes["submission"].r = 1;
	charactersLearnSceneActions(getCandidatesKeysArray(),["strokePussy","strokeBreasts","kissLips","frottage","frenchKiss","kneel","makeKneel","lickGroin",
	"legHoldHead","mountFromBehind","penetratePussy","thrust","piston","finalPush","mountFaceToFace","getBlowjob","suckDick","lickPussy","interlockLegs",
	"scissor","strokeAss","penetrateAss","analThrust","holdArms","vinesHoldArms","dickFootjob","pussyFootjob","lickLegs","rideDick","pushDickBack","extraMountFromBehind","analMountDick","analRideDick","analPushDickBack","holdHands","kissNeck","whisperSNs","giveCunnilingus","giveBlowjob","mountFaceToGroin","askMountFromBehind","extraAskMountFromBehind"]);
	charactersLearnSceneActions(getCandidatesKeysArray(),returnFirstScrollGroupActionsList());
	
	//addSceneTagToChar("noLead","chMir");
	
	State.variables.sc.startScene("ss", "dynamic",
		["chPlayerCharacter"], ["chMir","chVal"],
		"wow such testz",endConditionTurns,100,
		"Testing Scenes Room");
		
	State.variables["chMir"].aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables["chVal"].aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables["chMir"].aiAlgorythm.setRoleEqualFooting();
	State.variables["chVal"].aiAlgorythm.setRoleEqualFooting();
	
	createPosMountFaceToFace("chVal",["chMir"]);
	gC("chPlayerCharacter").hasLead = true;
	gC("chVal").lead = 0;
	gC("chVal").hasLead = false;
}
window.setUpMultiSexTestAlt = function() {
	gC("chPlayerCharacter").addBodypart("dick","dick");
	gC("chVal").addBodypart("dick","dick");
	gC("chMir").addBodypart("dick","dick");
	charactersLearnSceneActions(getCandidatesKeysArray(),["strokePussy","strokeBreasts","kissLips","frottage","frenchKiss","kneel","makeKneel","lickGroin",
	"legHoldHead","mountFromBehind","penetratePussy","thrust","piston","finalPush","mountFaceToFace","getBlowjob","suckDick","lickPussy","interlockLegs",
	"scissor","strokeAss","penetrateAss","analThrust","holdArms","vinesHoldArms","dickFootjob","pussyFootjob","lickLegs","rideDick","pushDickBack","extraMountFromBehind","analMountDick","analRideDick","analPushDickBack","holdHands","kissNeck","whisperSNs","giveCunnilingus","giveBlowjob","mountFaceToGroin","askMountFromBehind","extraAskMountFromBehind","gallopDick"]);
	charactersLearnSceneActions(getCandidatesKeysArray(),returnFirstScrollGroupActionsList());
	
	addSceneTagToChar("noLead","chMir");
	addSceneTagToChar("noLead","chVal");
	
	State.variables.sc.startScene("ss", "dynamic",
		["chPlayerCharacter"], ["chMir","chVal"],
		"wow such testz",endConditionTurns,100,
		"Testing Scenes Room");
		
	createPosKneel("chPlayerCharacter",["chMir"]);
	//createComPosDoubleKneeling("chVal","chPlayerCharacter");
		
	State.variables["chMir"].aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables["chVal"].aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables["chMir"].aiAlgorythm.setRoleEqualFooting();
	State.variables["chVal"].aiAlgorythm.setRoleEqualFooting();
}

window.setUpTestGiveWeaponsToChars = function() {
	var wea1 = createEquipment(equipmentType.KNUCKLES,"chClaw");
	var wea1 = createEquipment(equipmentType.WAND,"chMir");
	var wea1 = createEquipment(equipmentType.HANDFAN,"chVal");
	var wea1 = createEquipment(equipmentType.WAND,"chAte");
	if ( State.variables.activeSimulationCharacters.includes("chNim") ) {
		var artWeaID = createEquipment(equipmentType.WHIP,"chNim");
	}
	if ( State.variables.activeSimulationCharacters.includes("chEsh") ) {
		var eshWeaID = createEquipment(equipmentType.STAFFOFBATTLE,"chEsh");
	}
	if ( State.variables.activeSimulationCharacters.includes("chVeel") ) {
		var veelWeaID = createEquipment(equipmentType.BNBOARD,"chVeel");
	}
	if ( State.variables.activeSimulationCharacters.includes("chSet") ) {
		var setWeaID = createEquipment(equipmentType.BNBOARD,"chSet");
	}
	if ( State.variables.activeSimulationCharacters.includes("chPain") ) {
		var painWeaID = createEquipment(equipmentType.BLUDGEON,"chPain");
	}
	if ( State.variables.activeSimulationCharacters.includes("chSheze") ) {
		var sheWeaID = createEquipment(equipmentType.WAND,"chSheze");
	}
}

// Training
window.addExpToChar = function(charKey,baseStat,exp) {
	var rExp = State.variables[charKey][baseStat].affinity * exp;
	State.variables[charKey][baseStat].experience += rExp;
}

// Altered States
window.applyAetherialBondageToChars = function(charList,intensity,days) {
	for ( var cK of charList ) {
		if ( gC(cK).hasFreeBodypart("arms") ) {
			applyAlteredState([cK],createASaetChainedArms(intensity,days));
		}
		if ( gC(cK).hasFreeBodypart("legs") ) {
			applyAlteredState([cK],createASaetChainedLegs(intensity,days));
		}
		if ( gC(cK).hasFreeBodypart("mouth") ) {
			applyAlteredState([cK],createASaetChainedMouth(intensity,days));
		}
	}
}
window.applyVinesBondageToChars = function(charList,intensity,days) {
	for ( var cK of charList ) {
		if ( gC(cK).hasFreeBodypart("arms") ) {
			applyAlteredState([cK],createASvinChainedArms(intensity,days));
		}
		if ( gC(cK).hasFreeBodypart("legs") ) {
			applyAlteredState([cK],createASvinChainedLegs(intensity,days));
		}
		if ( gC(cK).hasFreeBodypart("mouth") ) {
			applyAlteredState([cK],createASvinChainedMouth(intensity,days));
		}
	}
}

