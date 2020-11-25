///// Custom Scene Scripts /////
// These are assigned to the scene.customScript property when appropiate
// State.variables.sc

window.cssGhFutaFuck = function() {
	switch (State.variables.sc.currentTurn) {
		case 2:
			State.variables.sc.headingDescription = '<span @style=$chGoddessHerald.colorStyleKey>//"You should breathe deeply..."//</span>';
			break;
		case 3:
			State.variables.sc.headingDescription = '<span @style=$chGoddessHerald.colorStyleKey>//"...Otherwise, you might not have enough air for what\'s coming."//</span>';
			break;
		case 4:
			State.variables.sc.headingDescription = 'The mist expands in all directions...';
			break;
		case 5:
			State.variables.sc.headingDescription = '<span @style=$chGoddessHerald.colorStyleKey>//"Hah..."//<' + '/span>' + '  she inhales.\n' + '<span @style=$chGoddessHerald.colorStyleKey>//"Congratulations, small one. You\'re a woman now."//<' + '/span>';
			break;
		case 6:
			State.variables.sc.headingDescription = '<span @style=$chGoddessHerald.colorStyleKey>//"Now, push back against me. Show me you want it too."//<' + '/span>\n//You have learnt \'Push Hips Back\'//.\n\n' + 'The mist expands in all directions...';
			State.variables.chPlayerCharacter.saList.push("pushHipsBack");
			break;
		case 7:
			State.variables.sc.headingDescription = 'The mist expands in all directions...';
			break;
	}
	if ( State.variables.sc.currentTurn >= 7 && State.variables.sc.pcChosenAction == "pushHipsBack" && State.variables.StVars.gh2 == 0 ) {
		State.variables.sc.headingDescription = '<span @style=$chGoddessHerald.colorStyleKey>//"Ah, yes! That\'s a good girl! Don\'t stop."//<'
											  + '/span>\n//You received <span style="color:darkslateblue">10 willpower damage</span>.//'
											  + '\n\nThe mist extends in all directions...';
		State.variables.chPlayerCharacter.willpower.changeValue(-10);
		State.variables.StVars.gh2 = 1;
	}
	else if ( State.variables.sc.currentTurn >= 7 ) {
		State.variables.sc.headingDescription = 'The mist expands in all directions...';
	}
	
	if ( State.variables.sc.currentTurn >= 8 && State.variables.chPlayerCharacter.orgasmSceneCounter > 0 ) {
		State.variables.sc.headingDescription = '<span @style=$chGoddessHerald.colorStyleKey>//"Get ready, precious flower. Here I come."//<'
											  + '/span>' + '\n\n//Is this what an orgasm feels like? And this woman just gave me... My first one?//'
											  + '\n\nThe mist extends in all directions...';
		if ( State.variables.chGoddessHerald.aiAlgorythm.hasOwnProperty("fixedAction") ) {
			if ( State.variables.chGoddessHerald.aiAlgorythm.fixedAction == "finalPush" ) {
				State.variables.sc.headingDescription = 'The mist extends in all directions...';
			}
		}
		State.variables.chGoddessHerald.aiAlgorythm = createAiFixedAction();
		State.variables.chGoddessHerald.aiAlgorythm.fixedAction = "finalPush";
		State.variables.chGoddessHerald.aiAlgorythm.fixedTarget = "chPlayerCharacter";
	}
	else if ( State.variables.sc.currentTurn >= 8 ) {
		State.variables.chGoddessHerald.aiAlgorythm = createAiFixedAction();
		State.variables.chGoddessHerald.aiAlgorythm.fixedAction = "piston";
		State.variables.chGoddessHerald.aiAlgorythm.fixedTarget = "chPlayerCharacter";
	}
};
window.cssGhScissor = function() {
	switch (State.variables.sc.currentTurn) {
		case 2:
			State.variables.sc.headingDescription = '<span @style=$chGoddessHerald.colorStyleKey>//"Hold me close..."//</span>';
			break;
		case 3:
			State.variables.sc.headingDescription = '<span @style=$chGoddessHerald.colorStyleKey>//"...You are going to want to feel all of me."//</span>';
			break;
		case 4:
			State.variables.sc.headingDescription = 'The mist expands in all directions...';
			break;
		case 5:
			State.variables.sc.headingDescription = '<span @style=$chGoddessHerald.colorStyleKey>//"Hah..."//<' + '/span>' + '  she inhales.\n' + '<span @style=$chGoddessHerald.colorStyleKey>//"Congratulations, small one. You\'re a woman now."//<' + '/span>';
			break;
		case 6:
			State.variables.sc.headingDescription = '<span @style=$chGoddessHerald.colorStyleKey>//"Now, push back against me. Show me you want it too."//<' + '/span>\n//You have learnt \'Scissor\'//.\n\n' + 'The mist expands in all directions...';
			State.variables.chPlayerCharacter.saList.push("scissor");
			break;
		case 7:
			State.variables.sc.headingDescription = 'The mist expands in all directions...';
			break;
	}
	if ( State.variables.sc.currentTurn >= 7 && State.variables.sc.pcChosenAction == "scissor" && State.variables.StVars.gh2 == 0 ) {
		State.variables.sc.headingDescription = '<span @style=$chGoddessHerald.colorStyleKey>//"Ah, yes! That\'s a good girl! Don\'t stop."//<'
											  + '/span>\n//You received <span style="color:darkslateblue">10 willpower damage</span>.//'
											  + '\n\nThe mist extends in all directions...';
		State.variables.chPlayerCharacter.willpower.changeValue(-10);
		State.variables.StVars.gh2 = 1;
	}
	else if ( State.variables.sc.currentTurn >= 7 ) {
		State.variables.sc.headingDescription = 'The mist expands in all directions...';
	}
	
	if ( State.variables.sc.currentTurn >= 8 ) {
		State.variables.chGoddessHerald.aiAlgorythm = createAiFixedAction();
		State.variables.chGoddessHerald.aiAlgorythm.fixedAction = "scissor";
		State.variables.chGoddessHerald.aiAlgorythm.fixedTarget = "chPlayerCharacter";
	}
};

window.cssGhKneeling = function() {
	switch ( State.variables.sc.currentTurn ) {
		case 2:
			State.variables.sc.headingDescription = '<span @style=$chGoddessHerald.colorStyleKey>//"You look really cute down there.'
												  + '\nYou\'ll look even cuter when you\'re sticking your tongue out."//</span>'
												  + '\nThe mist extends in all directions...';
			State.variables.chGoddessHerald.aiAlgorythm.fixedTarget = "chGoddessHerald";
			break;
		case 3:
			State.variables.sc.headingDescription = 'You took out your tongue, just as she ordered.\n'
												  + '<span @style=$chGoddessHerald.colorStyleKey>//"And now lick me. Right between my legs."//</span>'
												  + '\n//You have learnt \'Lick Groin\'//.'
												  + '\nThe mist extends in all directions...';
			State.variables.chGoddessHerald.aiAlgorythm.fixedTarget = "chPlayerCharacter";
			State.variables.chPlayerCharacter.saList.push("lickGroin");			
			break;
		case 4:
			if ( State.variables.sc.pcChosenAction == "lickGroin" ) {
				State.variables.sc.headingDescription = '<span @style=$chGoddessHerald.colorStyleKey>//"Ah... Good girl, don\'t stop."//</span>'
													  + '\nThe mist extends in all directions...';
			}
			else {
				State.variables.sc.headingDescription = 'The mist extends in all directions...';
			}
			State.variables.chGoddessHerald.aiAlgorythm.fixedTarget = "chGoddessHerald";
			break;
		case 5:
			State.variables.sc.headingDescription = 'The mist extends in all directions...';
			break;
		case 6:
			State.variables.sc.headingDescription = '<span @style=$chGoddessHerald.colorStyleKey>//"You\'re doing great, little flower.'
												  + '\nNow get some air, I\'m going to speed this up."//</span>'
												  + '\nThe mist extends in all directions...';
			State.variables.chGoddessHerald.aiAlgorythm.fixedTarget = "chPlayerCharacter";
			State.variables.chGoddessHerald.aiAlgorythm.fixedAction = "legHoldHead";			
			break;
		case 7:
			State.variables.sc.headingDescription = 'The mist extends in all directions...';
			State.variables.chGoddessHerald.aiAlgorythm = createAiFixedAction();
			State.variables.chGoddessHerald.aiAlgorythm.fixedTarget = "chGoddessHerald";
			State.variables.chGoddessHerald.aiAlgorythm.fixedAction = "strokeBreasts";			
			break;			
	}
	if ( State.variables.sc.currentTurn >= 8 ) {
		State.variables.sc.headingDescription = State.variables.chGoddessHerald.formattedName + ' is heating up. She received 10 lust damage.\n'
											  + "The mist extends in all directions...";
		State.variables.chGoddessHerald.lust.changeValue(-10);
	}
};
window.ccsGhStanding = function() {
	switch ( State.variables.sc.currentTurn ) {
		case 2:
			
			State.variables.sc.headingDescription = '<span @style=$chGoddessHerald.colorStyleKey>//"Relax, and look at me in the eyes. They\'ll eat all of your worries away."//</span>'
												  + '\nThe mist extends in all directions...';
			break; /*
		case 3:
			State.variables.sc.headingDescription = 'You cannot help but feel the intense gaze of the woman directly on you.'
												  + '\nYou\'re above her, she\'s pleasuring you, and yet... She has you right on her hands.\n'
												  + 'You have received <span style="color:lightcoral">5 lust damage</span> and <span style="color:darkslateblue">2 willpower damage</span>.\n'
												  + 'The mist extends in all directions...';
			State.variables.chPlayerCharacter.lust.changeValue(-5);
			State.variables.chPlayerCharacter.willpower.changeValue(-2);
			break;
		case 6:
			State.variables.sc.headingDescription = 'You cannot help but feel the intense gaze of the woman directly on you.'
												  + '\nYou\'re above her, she\'s pleasuring you, and yet... She has you right on her hands.\n'
												  + 'You have received <span style="color:lightcoral">5 lust damage</span> and <span style="color:darkslateblue">2 willpower damage</span>.\n'
												  + 'The mist extends in all directions...';
			State.variables.chPlayerCharacter.lust.changeValue(-5);
			State.variables.chPlayerCharacter.willpower.changeValue(-2);
			State.variables.chGoddessHerald.aiAlgorythm = createAiFixedAction();
			State.variables.chGoddessHerald.aiAlgorythm.fixedTarget = "chPlayerCharacter";
			State.variables.chGoddessHerald.aiAlgorythm.fixedAction = "lickGroin";
			break; */
	}
	if ( State.variables.sc.currentTurn >= 3 && State.variables.sc.currentTurn < 6 ) {
			State.variables.sc.headingDescription = 'You cannot help but feel the intense gaze of the woman directly on you.'
												  + '\nYou\'re above her, she\'s pleasuring you, and yet... She has you right on her hands.\n'
												  + 'You have received <span style="color:lightcoral">5 lust damage</span> and <span style="color:darkslateblue">2 willpower damage</span>.\n'
												  + 'The mist extends in all directions...';
			State.variables.chPlayerCharacter.lust.changeValue(-5);
			State.variables.chPlayerCharacter.willpower.changeValue(-2);
	}
	else if ( State.variables.sc.currentTurn >= 6 ) {
			State.variables.sc.headingDescription = 'You cannot help but feel the intense gaze of the woman directly on you.'
												  + '\nYou\'re above her, she\'s pleasuring you, and yet... //She has me right on her hands.//\n'
												  + 'You have received <span style="color:lightcoral">5 lust damage</span> and <span style="color:darkslateblue">2 willpower damage</span>.\n'
												  + 'The mist extends in all directions...';
			State.variables.chPlayerCharacter.lust.changeValue(-5);
			State.variables.chPlayerCharacter.willpower.changeValue(-2);
			State.variables.chGoddessHerald.aiAlgorythm = createAiFixedAction();
			State.variables.chGoddessHerald.aiAlgorythm.fixedTarget = "chPlayerCharacter";
			State.variables.chGoddessHerald.aiAlgorythm.fixedAction = "lickGroin";
	}
};

window.ghFutaFuckEndCondition = function(none) {
	var flagEndScene = false;
	
	if ( State.variables.chGoddessHerald.orgasmSceneCounter > 0 ) {
		flagEndScene = true;
	}
	
	return flagEndScene;	
}
window.ghScissorEndCondition = function(none) {
	var flagEndScene = false;
	
	if ( State.variables.chGoddessHerald.orgasmSceneCounter > 0 && State.variables.chPlayerCharacter.orgasmSceneCounter > 0 ) {
		flagEndScene = true;
	}
	
	return flagEndScene;	
}
window.playerOrgasmEndCondition = function(none) {
	var flagEndScene = false;
	
	if ( State.variables.chPlayerCharacter.orgasmSceneCounter > 0 ) {
		flagEndScene = true;
	}
	
	return flagEndScene;	
}
window.valtanOrgasmEndCondition = function(none) {
	var flagEndScene = false;
	
	if ( State.variables.chVal.orgasmSceneCounter > 0 ) {
		flagEndScene = true;
	}
	
	return flagEndScene;	
}
window.playerNvaltanOrgasmEndCondition = function(none) {
	var flagEndScene = false;
	
	if ( State.variables.chPlayerCharacter.orgasmSceneCounter > 0 && State.variables.chVal.orgasmSceneCounter > 0 ) {
		flagEndScene = true;
	}
	
	return flagEndScene;
}
window.playerNnashOrgasmEndCondition = function(none) {
	var flagEndScene = false;
	
	if ( State.variables.chPlayerCharacter.orgasmSceneCounter > 0 && State.variables.chNash.orgasmSceneCounter > 0 ) {
		flagEndScene = true;
	}
	
	return flagEndScene;
}

window.reachTurnLimitEndCondition = function(turnLimit) {
	var flagEndScene = false;
	
	if ( State.variables.sc.currentTurn >= turnLimit ) {
		flagEndScene = true;
	}
	
	return flagEndScene;
}

// Staying hydrated
window.stHyInitMirToVal = function() {
	State.variables.sc.startScene(
	"ss","fixed",["chMir"],["chVal"],"The scent of well cooked mushrooms fills your nose.",valtanOrgasmEndCondition,99,
	"SE Staying Hydrated Voyeur End");
	State.variables.sc.sceneConditions.push("cantCancelPositions");
	State.variables.chVal.hasLead = true;
	State.variables.chMir.hasLead = false;
	State.variables.sc.customScript = ccsStHyMirToVal;
	createPosKneel("chVal", ["chMir"]);
	ccsStHyAssignChoices();
}
window.ccsStHyMirToVal = function() {
	ccsStHyAssignChoices();
}
window.ccsStHyAssignChoices = function() {
	var valChoices = [["chVal","strokeBreasts"]];
	var mirChoices = [["chMir","strokePussy"]];
	
	// X% chance for Val to cancel continued action if she has a dick
	if ( gC("chVal").body.hasOwnProperty("dick") && State.variables.sc.continuedActions.length > 0 ) {
		
		if ( limitedRandomInt(9) < 3 ) {
			State.variables.sc.removeContinuedAction(0);
		}
	}
	
	if ( State.variables.sc.continuedActions.length == 0 ) {		// If there's no continued action, Val may choose one of these
		valChoices.push(["chMir","legHoldHead"]);
		if ( gC("chVal").hasFreeBodypart("dick") ) {
			valChoices.push(["chMir","getBlowjob"]);
		}
	} else {
		if ( State.variables.sc.continuedActions[0].key == "legHoldingHead" ) {
			valChoices.push(["chMir","rideFace"]);
			mirChoices.push(["chVal","lickPussy"]);
			valChoices.push(["chMir","rideFace"]);
			mirChoices.push(["chVal","lickPussy"]);
			if ( gC("chVal").hasFreeBodypart("dick") ) {
				valChoices.push(["chVal","strokeDick"]);
			}
		}
		else if ( State.variables.sc.continuedActions[0].key == "getBlowjob" ) {
			valChoices.push(["chMir","fuckFace"]);
			mirChoices.push(["chVal","suckDick"]);
			valChoices.push(["chMir","fuckFace"]);
			mirChoices.push(["chVal","suckDick"]);
			if ( gC("chVal").hasFreeBodypart("pussy") ) {
				valChoices.push(["chVal","strokePussy"]);
			}
		}
	}
	
	State.variables.chVal.aiAlgorythm = createAiRandomChoice(valChoices);
	State.variables.chMir.aiAlgorythm = createAiRandomChoice(mirChoices);
}

window.stHyInitPlToVal = function() {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter"],["chVal"],"The smell of sweet gelatine invades your nose.",valtanOrgasmEndCondition,99,
	"SE Staying Hydrated ValHydratesPlayer End");
	State.variables.sc.sceneConditions.push("cantCancelPositions");
	State.variables.chVal.hasLead = true;
	State.variables.chPlayerCharacter.hasLead = false;
	State.variables.sc.customScript = ccsStHyPlToVal;
	createPosKneel("chVal", ["chPlayerCharacter"]);
	ccsStHyAssignChoicesPlToVal();
	State.variables.sc.formatScenePassage();
}
window.ccsStHyPlToVal = function() {
	ccsStHyAssignChoicesPlToVal()
}
window.ccsStHyAssignChoicesPlToVal = function() {
	var valChoices = [["chVal","strokeBreasts"]];
	
	// X% chance for Val to cancel continued action if she has a dick
	if ( gC("chVal").body.hasOwnProperty("dick") && State.variables.sc.continuedActions.length > 0 ) {
		
		if ( limitedRandomInt(9) < 3 ) {
			State.variables.sc.removeContinuedAction(0);
		}
	}
	
	if ( State.variables.sc.continuedActions.length == 0 ) {		// If there's no continued action, Val may choose one of these
		valChoices.push(["chPlayerCharacter","legHoldHead"]);
		if ( gC("chVal").hasFreeBodypart("dick") ) {
			valChoices.push(["chPlayerCharacter","getBlowjob"]);
		}
	} else {
		if ( State.variables.sc.continuedActions[0].key == "legHoldingHead" ) {
			valChoices.push(["chPlayerCharacter","rideFace"]);
			valChoices.push(["chPlayerCharacter","rideFace"]);
			if ( gC("chVal").hasFreeBodypart("dick") ) {
				valChoices.push(["chVal","strokeDick"]);
			}
		}
		else if ( State.variables.sc.continuedActions[0].key == "getBlowjob" ) {
			valChoices.push(["chPlayerCharacter","fuckFace"]);
			valChoices.push(["chPlayerCharacter","fuckFace"]);
			if ( gC("chVal").hasFreeBodypart("pussy") ) {
				valChoices.push(["chVal","strokePussy"]);
			}
		}
	}
	
	State.variables.chVal.aiAlgorythm = createAiRandomChoice(valChoices);
}

window.stHyInitValToPl = function() {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter"],["chVal"],"The scent of well cooked mushrooms fills your nose.",playerOrgasmEndCondition,99,
	"SE Staying Hydrated PlayerHydratesVal End");
	State.variables.sc.sceneConditions.push("cantCancelPositions");
	State.variables.sc.sceneConditions.push("cantChangePositions");
	State.variables.chVal.hasLead = false;
	State.variables.chPlayerCharacter.hasLead = true;
	State.variables.sc.customScript = ccsStHyValToPl;
	createPosKneel("chPlayerCharacter", ["chVal"]);
	ccsStHyAssignChoicesValToPl();
	State.variables.sc.formatScenePassage();
}
window.ccsStHyValToPl = function() {
	ccsStHyAssignChoicesValToPl();
}
window.ccsStHyAssignChoicesValToPl = function() {
	var valChoices = [["chVal","strokePussy"],["chVal","strokeBreasts"]];
	if ( gC("chVal").hasFreeBodypart("dick") ) {
		valChoices.push(["chVal","strokeDick"]);
	}
	
	if ( State.variables.sc.continuedActions.length > 0 ) {
		if ( State.variables.sc.continuedActions[0].key == "legHoldingHead" ) {
			valChoices.push(["chPlayerCharacter","lickPussy"]);
			valChoices.push(["chPlayerCharacter","lickPussy"]);
		}
		else if ( State.variables.sc.continuedActions[0].key == "getBlowjob" ) {
			valChoices.push(["chPlayerCharacter","suckDick"]);
			valChoices.push(["chPlayerCharacter","suckDick"]);
		}
		else {
			valChoices.push(["chPlayerCharacter","lickGroin"]);
			valChoices.push(["chPlayerCharacter","strokePussy"]);
		}
	}
		
	State.variables.chVal.aiAlgorythm = createAiRandomChoice(valChoices);
}

window.stHyInitSpitroast = function() {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter","chVal"],["chMir"],"Valtan smiles mischievously.",playerNvaltanOrgasmEndCondition,99,
	"SE Staying Hydrated MirSurrounded End");
	State.variables.sc.sceneConditions.push("cantCancelPositions");
	State.variables.sc.sceneConditions.push("cantChangePositions");
	State.variables.chVal.hasLead = true;
	State.variables.chMir.hasLead = false;
	State.variables.chPlayerCharacter.hasLead = true;
	State.variables.sc.customScript = ccsStHySpitroast;
	createPosSpitroast("chPlayerCharacter","chVal","chMir");
	ccsStHyAssignChoicesSpitroast();
	State.variables.sc.formatScenePassage();
}
window.ccsStHySpitroast = function() {
	ccsStHyAssignChoicesSpitroast();
}
window.ccsStHyAssignChoicesSpitroast = function() {
	var valChoices = [["chVal","strokeBreasts"]];
	var mirChoices = [];
	
	var caKeys = [];
	for ( var continuedAction of State.variables.sc.continuedActions ) {
		caKeys.push(continuedAction.key);
	}
	
	if ( caKeys.includes("getBlowjob") ) { // Val getting blowjob
		valChoices.push(["chMir","fuckFace"],["chMir","fuckFace"],["chVal","strokePussy"]);
		mirChoices.push(["chVal","suckDick"],["chVal","suckDick"],["chVal","strokePussy"]);
	}
	else if ( caKeys.includes("legHoldingHead") ) { // Val getting cunnilingus
		valChoices.push(["chMir","rideFace"],["chMir","rideFace"]);
		mirChoices.push(["chVal","lickPussy"],["chVal","lickPussy"]);
		if ( gC("chVal").hasFreeBodypart("dick") ) {
			valChoices.push(["chVal","strokeDick"]);
			mirChoices.push(["chVal","strokeDick"]);
		}
	}
	else { 									// Val not getting head
		valChoices.push(["chMir","legHoldHead"],["chMir","kissLips"],["chVal","strokePussy"]);
		mirChoices.push(["chVal","lickGroin"],["chVal","strokePussy"]);
		if ( gC("chVal").hasFreeBodypart("dick") ) {
			valChoices.push(["chMir","getBlowjob"],["chMir","getBlowjob"]);
		}
	}
	
	if ( caKeys.includes("penetratePussy") ) { // Player fucking Mir
		mirChoices.push(["chPlayerCharacter","pushHipsBack"],["chPlayerCharacter","pushHipsBack"],["chPlayerCharacter","pushHipsBack"]);
	}
	else if ( caKeys.includes("interlockLegs") ) { // Player scisoring Mir
		mirChoices.push(["chPlayerCharacter","scissor"],["chPlayerCharacter","scissor"],["chPlayerCharacter","scissor"]);
	}
	else {										// Player not giving back-up to Mir
		mirChoices.push(["chPlayerCharacter","frottage"],["chPlayerCharacter","frottage"]);
	}
	
	if ( gC("chMir").hasFreeBodypart("dick") ) {
		mirChoices.push(["chMir","strokeDick"]);
	}
	if ( gC("chMir").hasFreeBodypart("pussy") ) {
		mirChoices.push(["chMir","strokePussy"]);
	}
	
	State.variables.chVal.aiAlgorythm = createAiRandomChoice(valChoices);
	State.variables.chMir.aiAlgorythm = createAiRandomChoice(mirChoices);
}

// Stretching Help II
window.stHpIIinit = function() {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter"],["chNash"],"The big guy remains imperturbable.",playerNnashOrgasmEndCondition,99,
	"SE SH II End NodeC Had Sex");
	State.variables.sc.sceneConditions.push("cantCancelPositions");
	State.variables.sc.sceneConditions.push("cantChangePositions");
	State.variables.chNash.hasLead = true;
	State.variables.chPlayerCharacter.hasLead = false;
	createPosMountFromBehind("chNash",["chPlayerCharacter"]);
	// Assign choices
	State.variables.chNash.hasLead = true;
	State.variables.chNash.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chNash.aiAlgorythm.fixedTarget = "chPlayerCharacter";
	State.variables.chNash.aiAlgorythm.setRoleDomination();
	//
	State.variables.sc.formatScenePassage();
}

// Beating a Kitty Into Friendship
window.btifFirstBattleInit = function() {
	State.variables.sc.startScene(
	"bs","fixed",["chMir"],["chAte"],"__Field__\nThis is the clearest area in the training grounds. You're guaranteed to find a spot in which you can unleash hellflames without destroying anything.",endConditionTurns,6,
	"SE Beating Kitty Into Friendship Further Trouble");
		State.variables.chMir.aiAlgorythm = createAiFixedAction();
		State.variables.chMir.aiAlgorythm.fixedAction = "kick";
		State.variables.chMir.aiAlgorythm.fixedTarget = "chAte";
		State.variables.chAte.aiAlgorythm = createAiFixedAction();
		State.variables.chAte.aiAlgorythm.fixedAction = "embers";
		State.variables.chAte.aiAlgorythm.fixedTarget = "chMir";/*
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiRandomActionRandomOpponent();
		}
	}*/
	State.variables.sc.customScript = ccsBtifFirstBattleScript;
	State.variables.sc.outHeadingDescription = '<span style="color:mediumvioletred">//"Your goal in battles is to disrupt your opponent\'s aether. Or, in other words, to knock them out. The most direct way to do this is by harming them until they run out of strength."//</span> ';
	State.variables.sc.formatScenePassage();
}

window.ccsBtifFirstBattleScript = function() {
	switch (State.variables.sc.currentTurn) {
		case 2:
			State.variables.chMir.aiAlgorythm.fixedAction = "kick";
			State.variables.chAte.aiAlgorythm.fixedAction = "freezeFeet";
			State.variables.sc.headingDescription = '<span style="color:saddlebrown">//"Your opponent will keep trying to evade your attacks, and will often be successful. If you want to give a harder time to your rival when they try to evade your hits, make sure you harm their control while keeping your own high."//</span>' ;
			break;
		case 3:
			State.variables.chMir.aiAlgorythm.fixedAction = "taunt";
			State.variables.chAte.aiAlgorythm.fixedAction = "freezeFeet";
			State.variables.sc.headingDescription = '<span style="color:mediumvioletred">//"Some actions may inflict various conditions on your enemies and allies. Some of them may turn out to be a boon or a handicap, depending on the circumstances."//</span>';
			break;
		case 4:
			State.variables.chMir.aiAlgorythm.fixedAction = "baStrokePussy";
			State.variables.chAte.aiAlgorythm.fixedAction = "embers";
			State.variables.sc.headingDescription = '<span style="color:mediumvioletred">//"In case you weren\'t aware, provoking your opponent to reach orgasm is another way to disrupt their aether. While this supposes higher risks, it could be worth it to take the fight to a sexual context."//</span>';
			break;
		case 5:
			State.variables.chMir.aiAlgorythm.fixedAction = "pounceFrontalP2P";
			State.variables.chAte.aiAlgorythm.fixedAction = "freezeFeet";
			State.variables.sc.headingDescription = '<span style="color:saddlebrown">//"If you want to try the sexual approach, you should pounce on your enemy. Pounce attacks are hard to land correctly, unless your target is out of control, but they will put you in the perfect position to deliver pleasure."//<' + '/span>';
			break;
		case 6:
			State.variables.chMir.aiAlgorythm.fixedAction = "baKissLips";
			State.variables.chAte.aiAlgorythm.fixedAction = "sparkingRubbing";
			State.variables.sc.headingDescription = '<span style="color:saddlebrown">//"If your opponent successfully pounces on you, you\'ll at a disadvantage! In that case, you should struggle as much as possible until your enemy runs out of control."//<' + '/span>';
			break;
		case 7:
			State.variables.sc.headingDescription =  '<span @style=$chNash.colorStyleKey>//"I can\'t take it anymore!"//</span> Nash shouts suddenly.';
			State.variables.sc.flagSceneEnded = true;
			break;
	}
}

window.ccsBtifNashVsClawBattleInit = function() {
	var clawGoal = "";
	switch ( State.variables.StVars.BkifStakes ) {
		case "servitude":
			clawGoal = "SE BKIF Claw Victory Servitude";
			break;
		case "sex":
			clawGoal = "SE BKIF Claw Victory Sex";
			break;
		case "humilliation":
			clawGoal = "SE BKIF Claw Victory Humilliation";
			break;
	}
	State.variables.sc.startScene(
	"bs","fixed",["chNash"],["chClaw"],"__Field__\nThis is the clearest area in the training grounds. You're guaranteed to find a spot in which you can unleash hellflames without destroying anything.",createEndConditionStoryBattle("SE BKIF Nash Victory",clawGoal),6,
	"SE BKIF Nash Victory");
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiRandomActionRandomOpponent();
		}
	}
	State.variables.sc.formatScenePassage();
}
window.ccsBtifPlayerVsClawBattleInit = function() {
	var clawGoal = "";
	switch ( State.variables.StVars.BkifStakes ) {
		case "servitude":
			clawGoal = "SE BKIF Claw Defeats Player Servitude";
			break;
		case "sex":
			clawGoal = "SE BKIF Claw Defeats Player Sex";
			break;
		case "humilliation":
			clawGoal = "SE BKIF Claw Defeats Player Humilliation";
			break;
	}
	State.variables.sc.startScene(
	"bs","fixed",["chPlayerCharacter"],["chClaw"],"__Field__\nThis is the clearest area in the training grounds. You're guaranteed to find a spot in which you can unleash hellflames without destroying anything.",createEndConditionStoryBattle("SE BKIF Player Victory",clawGoal),6,
	"SE BKIF Player Victory");
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiRandomActionRandomOpponent();
		}
	}
	State.variables.sc.customScript = function(turns) {
		if ( State.variables.StVars.drishtyaSawVaryonteMoves == true ) {
			State.variables.sc.headingDescription = "__Field__\nThis is the clearest area in the training grounds. You're guaranteed to find a spot in which you can unleash hellflames without destroying anything.";
		}
		if ( State.variables.sc.teamAchosenActions[0] == "baHypnoticGlance" || State.variables.sc.teamAchosenActions[0] == "baDrainingKiss" || State.variables.sc.teamAchosenActions[0] == "baEnergyDrainingKiss" || State.variables.sc.teamAchosenActions[0] == "baEtherealChains" ) {
			if ( State.variables.StVars.drishtyaSawVaryonteMoves == false ) {
				State.variables.StVars.drishtyaSawVaryonteMoves = true;
				State.variables.sc.headingDescription = '<span @style=$chMir.colorStyleKey>//"What was that?"//</span>';
			}
		}
	}
	State.variables.sc.formatScenePassage();
}
window.ccsBtifTeamfightBattleInit = function() {
	State.variables.sc.startScene(
	"bs","fixed",["chPlayerCharacter","chNash"],["chClaw","chVal"],"__Field__\nThis is the clearest area in the training grounds. You're guaranteed to find a spot in which you can unleash hellflames without destroying anything.",createEndConditionStoryBattle("SE BKIF Player Team Victory","SE BKIF Player Team Defeat"),6,
	"SE BKIF Player Victory");
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiRandomActionRandomOpponent();
		}
	}
	State.variables.sc.customScript = function(turns) {
		if ( State.variables.StVars.drishtyaSawVaryonteMoves == true ) {
			State.variables.sc.headingDescription = "__Field__\nThis is the clearest area in the training grounds. You're guaranteed to find a spot in which you can unleash hellflames without destroying anything.";
		}
		if ( State.variables.sc.teamAchosenActions[0] == "baHypnoticGlance" || State.variables.sc.teamAchosenActions[0] == "baDrainingKiss" || State.variables.sc.teamAchosenActions[0] == "baEnergyDrainingKiss" || State.variables.sc.teamAchosenActions[0] == "baEtherealChains" ) {
			if ( State.variables.StVars.drishtyaSawVaryonteMoves == false ) {
				State.variables.StVars.drishtyaSawVaryonteMoves = true;
				State.variables.sc.headingDescription = '<span @style=$chMir.colorStyleKey>//"What was that?"//</span>';
			}
		}
	}
	State.variables.sc.formatScenePassage();
}



