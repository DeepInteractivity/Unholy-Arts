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
	
	if ( State.variables.chPlayerCharacter.getAllSceneOrgasms() > 0 ) {
		flagEndScene = true;
	}
	
	return flagEndScene;	
}
window.valtanOrgasmEndCondition = function(none) {
	var flagEndScene = false;
	
	if ( State.variables.chVal.getAllSceneOrgasms() > 0 ) {
		flagEndScene = true;
	}
	
	return flagEndScene;	
}
window.playerNvaltanOrgasmEndCondition = function(none) {
	var flagEndScene = false;
	
	if ( State.variables.chPlayerCharacter.getAllSceneOrgasms() > 0 && State.variables.chVal.getAllSceneOrgasms() > 0 ) {
		flagEndScene = true;
	}
	
	return flagEndScene;
}
window.playerNnashOrgasmEndCondition = function(none) {
	var flagEndScene = false;
	
	if ( State.variables.chPlayerCharacter.getAllSceneOrgasms() > 0 && State.variables.chNash.getAllSceneOrgasms() > 0 ) {
		flagEndScene = true;
	}
	
	return flagEndScene;
}
window.playerNnashTwoOrgasmsEndCondition = function(none) {
	var flagEndScene = false;
	
	if ( State.variables.chPlayerCharacter.getAllSceneOrgasms() > 1 && State.variables.chNash.getAllSceneOrgasms() > 1 ) {
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
window.teamBcharsReachedOrgasmEndCondition = function() {
	var flagEndScene = true;
	
	for ( var cK of State.variables.sc.teamBcharKeys ) {
		if ( gC(cK).getAllSceneOrgasms() < 1 ) {
			flagEndScene = false;
		}
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
	setRefreshLustScript();
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
	setRefreshLustScript();
}
window.ccsStHyPlToVal = function() {
	ccsStHyAssignChoicesPlToVal();
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
	setRefreshLustScript();
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
	setRefreshLustScript();
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
	setRefreshLustScript();
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
			gC(charKey).aiAlgorythm = createAiEarlyStrategic();
		}
	}*/
	State.variables.sc.customScript = ccsBtifFirstBattleScript;
	State.variables.sc.outHeadingDescription = '<span style="color:mediumvioletred">//"Your goal in battles is to disrupt your opponent\'s aether. Or, in other words, to knock them out. The most direct way to do this is by harming them until they run out of strength."//</span>\n\n';
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
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
			gC(charKey).aiAlgorythm = createAiEarlyStrategic();
		}
	}
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
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
	"bs","fixed",["chPlayerCharacter"],["chClaw"],"__Field__\nThis is the clearest area in the training grounds. You're guaranteed to find a spot in which you can unleash hellflames without destroying anything.",createEndConditionStoryBattleWithDraw("SE BKIF Player Victory",clawGoal,"SE BKIF Player Victory"),6,
	"SE BKIF Player Victory");
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiEarlyStrategic();
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
	setRefreshLustScript();
}
window.ccsBtifTeamfightBattleInit = function() {
	State.variables.sc.startScene(
	"bs","fixed",["chPlayerCharacter","chNash"],["chClaw","chVal"],"__Field__\nThis is the clearest area in the training grounds. You're guaranteed to find a spot in which you can unleash hellflames without destroying anything.",createEndConditionStoryBattleWithDraw("SE BKIF Player Team Victory","SE BKIF Player Team Defeat","SE BKIF Player Team Victory"),6,
	"SE BKIF Player Victory");
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiEarlyStrategic();
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
	setRefreshLustScript();
}

// Aspiring Tree Climber
window.aspiringTCdommingClaw = function() {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter"],["chClaw"],"The wind is caressing the forest.",endConditionTurns,gSettings().stdSxScDur,
	"SE Aspiring TC Post Domming Claw");
	State.variables.sc.sceneConditions.push("cantCancelPositions");
	State.variables.sc.sceneConditions.push("cantChangePositions");
	State.variables.chClaw.hasLead = false;
	State.variables.chPlayerCharacter.hasLead = true;
	createPosMountFaceToFace("chPlayerCharacter",["chClaw"]);
	// Assign choices
	State.variables.chClaw.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chClaw.aiAlgorythm.fixedTarget = "chPlayerCharacter";
	State.variables.chClaw.aiAlgorythm.setRoleSubmission();
	//
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}
window.aspiringTCdommedByClaw = function() {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter"],["chClaw"],"The trees' branches move along with the wind.",endConditionTurns,gSettings().stdSxScDur,
	"SE Aspiring TC Post Subbing Claw");
	State.variables.sc.sceneConditions.push("cantCancelPositions");
	State.variables.sc.sceneConditions.push("cantChangePositions");
	State.variables.chClaw.hasLead = true;
	State.variables.chPlayerCharacter.hasLead = false;
	createPosMountFaceToFace("chClaw",["chPlayerCharacter"]);
	// Assign choices
	State.variables.chClaw.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chClaw.aiAlgorythm.fixedTarget = "chPlayerCharacter";
	State.variables.chClaw.aiAlgorythm.setRoleDomination();
	//
	State.variables.sc.continuedActions.push(createCaHoldArms("chClaw",["chPlayerCharacter"]));
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}

// Luring Masquerade

window.ccsLuMaPlayerVsTwoBattleInit = function() {
	State.variables.sc.startScene( // Forest The trees are shaken by the wind.
	// Luring Masquerade Miracle Victory
	// Luring Masquerade Defeated By Two
	"bs","fixed",["chPlayerCharacter"],["chMir","chVal"],"__Forest__\nThe trees are shaken by the wind.",createEndConditionStoryBattle("Luring Masquerade Miracle Victory","Luring Masquerade Defeated By Two"),6,
	"Luring Masquerade Miracle Victory");
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiEarlyStrategic();
		}
	}
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}
window.ccsLuMaTwoVsValBattleInit = function() {
	State.variables.sc.startScene( 
	"bs","fixed",["chPlayerCharacter","chMir"],["chVal"],"__Forest__\nThe trees are shaken by the wind.",createEndConditionStoryBattle("Luring Masquerade Victory Of Two","Luring Masquerade Humilliated By One"),6,
	"Luring Masquerade Miracle Victory");
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiEarlyStrategic();
		}
	}
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}
window.ccsLuMaPlayerVsValBattleInit = function() {
	State.variables.sc.startScene( 
	"bs","fixed",["chPlayerCharacter"],["chVal"],"__Forest__\nThe trees are shaken by the wind.",createEndConditionStoryBattle("Luring Masquerade Sweet Revenge","Luring Masquerade Saved By Mir"),6,
	"Luring Masquerade Miracle Victory");
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiEarlyStrategic();
		}
	}
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}

// Gifts for Nature
window.giftsForNatureInPadmirisCare = function() {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter"],["chMir"],"Your mind is foggy. Your body moves as Padmiri commands.",function(none) {
		var sceneMayEnd = false;
		if ( gC("chPlayerCharacter").getAllSceneOrgasms() > 0 && gC("chMir").getAllSceneOrgasms() > 0 ) { sceneMayEnd = true; }
		return sceneMayEnd;
	},30,
	"SE Gifts For Nature Parasafi Explanation");
	State.variables.chMir.hasLead = true;
	State.variables.chPlayerCharacter.hasLead = false;
	// Assign choices
	State.variables.chMir.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chMir.aiAlgorythm.fixedTarget = "chPlayerCharacter";
	State.variables.chMir.aiAlgorythm.setRoleActive();
	//
	State.variables.StVars.check3 = false;
	State.variables.StVars.check4 = false;
	State.variables.StVars.check5 = false;
	
	State.variables.sc.customScript = function() {
		if ( State.variables.StVars.check4 == false ) {
			if ( State.variables.StVars.check3 == true ) {
				State.variables.sc.headingDescription = "You're slowly recovering control over your body.";
				State.variables.StVars.check4 = true;
			}
			if ( State.variables.StVars.check3 == false && gC("chPlayerCharacter").getAllSceneOrgasms() > 0 ) {
				State.variables.StVars.check3 = true;
				State.variables.sc.headingDescription = '<span @style=$chMir.colorStyleKey>//"That should be enough. ...But I hope you don\'t mind if I help myself..."//<'
											  + '/span>' + '\n\nYour mind is still foggy. Your body moves as Padmiri commands.';
			}
		} 
		if ( State.variables.sc.currentTurn >= 5 ) {
			var damage = 1 + 0.2 * State.variables.sc.currentTurn;
			damage = damage - ( damage % 1 );
			State.variables.sc.importantMessages += "The parasalfis flower's scent gets your blood pumping.\n"
									+ gC("chPlayerCharacter").getFormattedName() + " has received " + textLustDamage(damage) + ".\n"
									+ gC("chMir").getFormattedName() + " has received " + textLustDamage(damage) + ".\n"
			applyBarDamage("chPlayerCharacter","lust",-damage);
			applyBarDamage("chMir","lust",-damage);
			State.variables.sc.checkForOrgasms();
		}
	}
	
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}

// The Grapes of Lust
window.finishGrapesData = function() {
	delete State.variables.sc.remainingGrapes;
}
window.tryGettingGrape = function() {
	var gotGrape = "none";
	var checkedAction = "doNothing";
	if ( State.variables.sc.remainingGrapes != undefined ) {
		if ( State.variables.sc.remainingGrapes > 0 ) {
			checkedAction = setup.saList[State.variables.sc.teamBchosenActions[0]];
			if ( checkedAction.flavorTags.includes("usePussy") && checkedAction.flavorTags.includes("targetMouth") ) {
				if ( limitedRandomInt(100) > 78 ) {
					gotGrape = State.variables.sc.teamBchosenTargets[0];
					State.variables.sc.remainingGrapes--;
				}
			}
			var i = 0;
			for ( var act of State.variables.sc.teamAchosenActions ) {
				checkedAction = setup.saList[State.variables.sc.teamAchosenActions[i]];
				if ( gotGrape == "none" ) {
					if ( checkedAction.flavorTags.includes("useMouth") && checkedAction.flavorTags.includes("targetPussy") ) {
						if ( limitedRandomInt(100) > 78 ) {
							gotGrape = State.variables.sc.teamAcharKeys[i];
							State.variables.sc.remainingGrapes--;
						}
					}
				}
				i++;
			}
		}
	}
	if ( gotGrape == "chAte" ) {
		var msg = randomFromList( [
			(ktn("chAte") + " managed to dig deep inside " + ktn("chVal") + "'s " + pussyWord() + " and caught a grape, which she promptly swallowed."),
			("It almost looks like it's going to slip away, but " + ktn("chAte") + "'s tongue managed to grab a grape and drag it to her own mouth."),
			("After slurping some slime, " + ktn("chAte") + " sucks yet another berry from " + ktn("chVal") + "'s " + pussyWord() + "."),
			("The grape slips for a moment, but Valtan decides to have some mercy and pushes it out of herself right into " + ktn("chAte") + "'s mouth."),
			(ktn("chVal") + " gets distracted by the pleasure for a moment, and she loses strength in her abdomen. A grape falls in the process straight into the mouth of " + ktn("chAte") + ".") ] );
		State.variables.sc.importantMessages += msg;
	} else if ( gotGrape == "chPlayerCharacter" ) {
		var msg = randomFromList( [
			(ktn("chPlayerCharacter") + "'s tongue explores deep in " + ktn("chVal") + "'s " + pussyWord() + " and digs a grape out, which " + gC("chPlayerCharacter").perPr + " shares with " + ktn("chAte") + "."),
			("After snatching a grape, " + ktn("chPlayerCharacter") + " kisses " + ktn("chAte") + ", pushing the berry inside her mouth. She swallows cutely."),
			("A grape falls from " + ktn("chVal") + "'s depths down to " + ktn("chPlayerCharacter") + "'s lips, and " + gC("chPlayerCharacter").perPr + " grabs it and puts it in " + ktn("chAte") + "'s."),
			(ktn("chPlayerCharacter") + " gets a berry, and gets distracted by the strange flavour it gets when it gets mixed with slime - but " + gC("chPlayerCharacter").perPr + " promptly shares the fruit with " + ktn("chAte") + "."),
			(ktn("chAte") + " looks at " + ktn("chPlayerCharacter") + " expectantly when she notices " + gC("chPlayerCharacter").comPr + " getting a grape. " + ktn("chPlayerCharacter") + " complies and gives it to her.") ] );
		State.variables.sc.importantMessages += msg;
	}
	return gotGrape;
}
window.endConditionGrapes = function(turns) {
	var sceneFinished = false;
	if ( State.variables.sc.remainingGrapes == undefined ) {
		sceneFinished = true;
	} else {
		if ( State.variables.sc.remainingGrapes <= 0 ) {
			sceneFinished = true;
			finishGrapesData();
		}
	}
	return sceneFinished;
}
window.cssTgolValxAte = function() {
	State.variables.sc.remainingGrapes = 8;
	charactersLearnSceneActions(["chVal"],["legHoldHead","extraLegHoldHead","makeKneel","extraMakeKneel","rideFace","getBlowjob","fuckFace"]);
	charactersLearnSceneActions(["chAte"],["kneel","extraKneel","giveCunnilingus","lickPussy","giveBlowjob","suckDick"]);
	State.variables.sc.startScene(
	"ss","fixed",["chAte"],["chVal"],"It smells like wet grass.",endConditionGrapes,gSettings().stdSxScDur,
	"SE TGoL Player Protests End");
	State.variables.sc.sceneConditions.push("cantCancelPositions");
	State.variables.chVal.hasLead = true;
	State.variables.chAte.hasLead = false;
	State.variables.sc.customScript = tryGettingGrape;
	createPosKneel("chVal",["chAte"]);
	// Choices and AI
	State.variables.chVal.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chVal.aiAlgorythm.setRoleDomination();
	State.variables.chVal.aiAlgorythm.disablePositions = true;
	/*
	State.variables.chVal.aiAlgorythm.rolePreferences.useDick.w = 0;
	State.variables.chVal.aiAlgorythm.rolePreferences.position.w = 0;
	State.variables.chVal.aiAlgorythm.rolePreferences.usePussy.w = 800;
	State.variables.chVal.aiAlgorythm.rolePreferences.oral.w = 400;
	State.variables.chVal.aiAlgorythm.rolePreferences.targetMouth.w = 800;
	*/
	State.variables.chAte.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chAte.aiAlgorythm.setRoleSubmission();
	/*
	State.variables.chAte.aiAlgorythm.rolePreferences.useMouth.w = 800;
	State.variables.chAte.aiAlgorythm.rolePreferences.oral.w = 400;
	State.variables.chAte.aiAlgorythm.rolePreferences.targetPussy.w = 800;
	*/
	//
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}
window.cssTgolValxAtePlayer = function() {
	State.variables.sc.remainingGrapes = 8;
	charactersLearnSceneActions(["chVal"],["legHoldHead","extraLegHoldHead","makeKneel","extraMakeKneel","rideFace","getBlowjob","fuckFace"]);
	charactersLearnSceneActions(["chAte","chPlayerCharacter"],["kneel","extraKneel","giveCunnilingus","lickPussy","giveBlowjob","suckDick"]);
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter","chAte"],["chVal"],"It smells like wet grass.",endConditionGrapes,gSettings().stdSxScDur,
	"SE TGoL Join Ate End");
	State.variables.sc.sceneConditions.push("cantCancelPositions");
	State.variables.chVal.hasLead = true;
	State.variables.chAte.hasLead = false;
	State.variables.chPlayerCharacter.hasLead = false;
	State.variables.sc.customScript = tryGettingGrape;
	createPosKneel("chVal",["chAte"]);
	createComPosDoubleKneeling("chVal","chPlayerCharacter");
	// Choices and AI
	State.variables.chVal.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chVal.aiAlgorythm.setRoleDomination();
	State.variables.chVal.aiAlgorythm.disablePositions = true;
	State.variables.chAte.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chAte.aiAlgorythm.setRoleSubmission();
	//
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}
window.cssTgolValVsPlayer = function() {
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
	"bs","fixed",["chPlayerCharacter"],["chVal"],"__Lake__\nIt smells like wet grass.",createEndConditionStoryBattle("SE TGoL Defy Valtan Player Victory","SE TGoL Defy Valtan Player Defeat"),6,
	"SE TGoL Defy Valtan Player Victory");
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiEarlyStrategic();
		}
	}
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}

// Flaunting A Kitty
window.fakClawOralsPadmiriInit = function() {
	State.variables.sc.startScene(
	"ss","fixed",["chClaw"],["chMir"],"The Leirien fights to keep her cool while she keeps reading.",endConditionTurns,4,
	"SE FAK Eat her out 2");
	State.variables.sc.sceneConditions.push("cantCancelPositions");
	State.variables.chClaw.hasLead = true;
	State.variables.chMir.hasLead = false;
	State.variables.sc.customScript = fakAssignChoicesClawToMir;
	createPosKneel("chMir", ["chClaw"]);
	fakAssignChoicesClawToMir();
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}
window.fakAssignChoicesClawToMir = function() {
	var clawChoices = [];
	var mirChoices = [["chMir","doNothing"]];
	if ( State.variables.sc.continuedActions.length < 1 ) {
		if ( gC("chMir").hasFreeBodypart("dick") ) {
			clawChoices.push(["chMir","giveBlowjob"]);
		}
		if ( gC("chMir").hasFreeBodypart("pussy") ) {
			clawChoices.push(["chMir","giveCunnilingus"]);
		} 
	} else {
		if ( State.variables.sc.continuedActions[0].key == "getBlowjob" ) {
			clawChoices.push(["chMir","suckDick"],["chMir","suckDick"]);
		} else if ( State.variables.sc.continuedActions[0].key == "legHoldingHead" ) {
			clawChoices.push(["chMir","lickPussy"],["chMir","lickPussy"]);
		}
		if ( gC("chMir").hasFreeBodypart("dick") ) {
			clawChoices.push(["chMir","strokeDick"]);
		}
		if ( gC("chMir").hasFreeBodypart("pussy") ) {
			clawChoices.push(["chMir","strokePussy"]);
		} 
	}
	
	State.variables.chClaw.aiAlgorythm = createAiRandomChoice(clawChoices);
	State.variables.chMir.aiAlgorythm = createAiRandomChoice(mirChoices);
}
window.fakPlayerPleasuresClaw = function() {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter"],["chClaw"],"Shelves full of dramatic plays fill most sides of the room. There are also some chairs and tables reserved for studying.",fakMoaningKittyEndCondition,4,
	"SE FAK Moaning kitty 2");
	State.variables.sc.sceneConditions.push("cantCancelPositions");
	State.variables.chPlayerCharacter.hasLead = true;
	State.variables.chClaw.hasLead = false;
	createPosMountFromBehind("chPlayerCharacter", ["chClaw"]);
	State.variables.chClaw.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chClaw.aiAlgorythm.setRoleSubmission();
	State.variables.sc.formatScenePassage();	
	setRefreshLustScript();
}
window.fakMoaningKittyEndCondition = function() {
	var flagReady = false;
	if ( getBarPercentage("chClaw","lust") <= 0.75 ) {
		flagReady = true;
	}
	return flagReady;
}
window.fakPlayerTakesClaw = function() {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter"],["chClaw"],"Padmiri hides most of her face behind the scroll, but take a peek quite often.",fakMoaningKitty2EndCondition,4,
	"SE FAK Padmiri Gives In");
	State.variables.sc.sceneConditions.push("cantCancelPositions");
	State.variables.chPlayerCharacter.hasLead = true;
	State.variables.chClaw.hasLead = false;
	createPosMountFromBehind("chPlayerCharacter", ["chClaw"]);
	State.variables.sc.formatScenePassage();
	State.variables.chClaw.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chClaw.aiAlgorythm.setRoleSubmission();
	setRefreshLustScript();
}
window.fakMoaningKitty2EndCondition = function() {
	var flagReady = false;
	if ( getBarPercentage("chClaw","lust") <= 0.55 ) {
		flagReady = true;
	}
	return flagReady;
}
window.playerMirClawOrgasmEndCondition = function(none) {
	var flagEndScene = false;
	
	if ( State.variables.chPlayerCharacter.getAllSceneOrgasms() > 0 && State.variables.chClaw.getAllSceneOrgasms() > 0 && State.variables.chMir.getAllSceneOrgasms() > 0 ) {
		flagEndScene = true;
	}
	
	return flagEndScene;
}
window.fakClawGetsShared = function(targetPassage) {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter","chMir"],["chClaw"],"The scroll stands abandoned in top of the table.",playerMirClawOrgasmEndCondition,4,
	targetPassage);
	State.variables.sc.sceneConditions.push("cantCancelPositions");
	State.variables.chPlayerCharacter.hasLead = true;
	State.variables.chMir.hasLead = true;
	State.variables.chClaw.hasLead = false;
	createPosKneel("chMir",["chClaw"]);
	createComPosSpitroast("chPlayerCharacter","chClaw");
	State.variables.sc.formatScenePassage();
	State.variables.chClaw.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chClaw.aiAlgorythm.setRoleSubmission();
	State.variables.chMir.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chMir.aiAlgorythm.setRoleActive();
	setRefreshLustScript();
}
window.fakMirSubmits = function(targetPassage) {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter"],["chClaw","chMir"],"The scroll stands abandoned in top of the table.",playerMirClawOrgasmEndCondition,4,
	targetPassage);
	State.variables.chPlayerCharacter.hasLead = true;
	State.variables.chMir.hasLead = false;
	State.variables.chClaw.hasLead = false;
	State.variables.sc.formatScenePassage();
	State.variables.chClaw.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chClaw.aiAlgorythm.setRoleSubmission();
	State.variables.chMir.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chMir.aiAlgorythm.setRoleSubmission();
	setRefreshLustScript();
}
window.fakMirGetsShared = function(targetPassage) {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter","chClaw"],["chMir"],"The scroll stands abandoned in top of the table.",playerMirClawOrgasmEndCondition,4,
	targetPassage);
	State.variables.sc.sceneConditions.push("cantCancelPositions");
	State.variables.chPlayerCharacter.hasLead = true;
	State.variables.chMir.hasLead = false;
	State.variables.chClaw.hasLead = true;
	createPosKneel("chClaw",["chMir"]);
	createComPosSpitroast("chPlayerCharacter","chMir");
	State.variables.sc.formatScenePassage();
	State.variables.chClaw.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chClaw.aiAlgorythm.setRoleActive();
	State.variables.chMir.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chMir.aiAlgorythm.setRoleSubmission();
	setRefreshLustScript();
}

// Bondage Awakening
window.BoAwPadmiriAbusesTrio = function() {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter","chNash","chClaw"],["chMir"],"Nothing disrupts the quietness of the lake, save for your moans.",mirTwoOrgasms,4,
	"SE BoAw Trapped Trio PostSex");
	State.variables.chPlayerCharacter.hasLead = false;
	State.variables.chMir.hasLead = true;
	State.variables.chClaw.hasLead = false;
	State.variables.chNash.hasLead = false;
	State.variables.sc.formatScenePassage();
	State.variables.chClaw.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chClaw.aiAlgorythm.setRoleSubmission();
	State.variables.chMir.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chMir.aiAlgorythm.setRoleDomination();
	State.variables.chNash.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chNash.aiAlgorythm.setRoleSubmission();
	setRefreshLustScript();
}
window.mirTwoOrgasms = function(none) {
	var flagEndScene = false;
	
	if ( State.variables.chMir.getAllSceneOrgasms() > 1 ) {
		flagEndScene = true;
	}
	
	return flagEndScene;
}
window.BoAwPlayerAbusesDuo = function(newPassage) {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter"],["chClaw","chNash"],"Nothing disrupts the quietness of the lake, save for your moans.",playerTwoOrgasms,4,
	newPassage);
	State.variables.chPlayerCharacter.hasLead = true;
	State.variables.chClaw.hasLead = false;
	State.variables.chNash.hasLead = false;
	State.variables.sc.formatScenePassage();
	State.variables.chClaw.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chClaw.aiAlgorythm.setRoleSubmission();
	State.variables.chNash.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chNash.aiAlgorythm.setRoleSubmission();
	setRefreshLustScript();
}
window.playerTwoOrgasms = function(none) {
	var flagEndScene = false;
	
	if ( State.variables.chPlayerCharacter.getAllSceneOrgasms() > 1 ) {
		flagEndScene = true;
	}
	
	return flagEndScene;
}
window.BoAwPairAbusesDuo = function(newPassage) {
	addSceneTagToChar("noLead","chClaw");
	addSceneTagToChar("noLead","chNash");
	State.variables.sc.startScene(
	"ss","dynamic",["chPlayerCharacter","chMir"],["chClaw","chNash"],"Nothing disrupts the quietness of the lake, save for your moans.",playerMirTwoOrgasms,4,
	newPassage);	
	State.variables.sc.formatScenePassage();
	State.variables.chClaw.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chClaw.aiAlgorythm.setRoleSubmission();
	State.variables.chMir.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chMir.aiAlgorythm.setRoleDomination();
	State.variables.chNash.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chNash.aiAlgorythm.setRoleSubmission();
	setRefreshLustScript();
}
window.playerMirTwoOrgasms = function(none) {
	var flagEndScene = false;
	
	if ( State.variables.chPlayerCharacter.getAllSceneOrgasms() > 1 && State.variables.chMir.getAllSceneOrgasms() > 1 ) {
		flagEndScene = true;
	}
	
	return flagEndScene;
}

		// GLEAMING CAVERNS //
// Blackmailed by Claw
	// Dommed by Claw
window.bbCdommedByClaw = function(newPassage) {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter"],["chClaw"],"You feel the strong grip of Claw on your skin.",clawTwoOrgasms,gSettings().stdSxScDur,
	newPassage);
	// Positioning, conditions
	State.variables.sc.sceneConditions.push("cantCancelPositions");
	State.variables.sc.sceneConditions.push("cantChangePositions");
	State.variables.chClaw.hasLead = true;
	State.variables.chPlayerCharacter.hasLead = false;
	createPosMountFromBehind("chClaw",["chPlayerCharacter"]);
	// Custom Dialogues
	State.variables.sc.setDialoguesList("bbCshutup");
	// Assign choices
	State.variables.chClaw.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chClaw.aiAlgorythm.fixedTarget = "chPlayerCharacter";
	State.variables.chClaw.aiAlgorythm.setRoleDomination();
	// Custom script
		// Set StVars.check4 to the sub char's current amount of orgasms
		// If check4 grows from the previous turn,
			// Chance for the sub character to moan, attracting attention
				// Update scene sub-description
				// Reduce character's reputation
			// Update check4 to new quantity
	State.variables.StVars.check4 = 0; // Sub's orgasm counter
	State.variables.StVars.check5 = "chClaw"; // Who's the sub to be checking
	if ( gC("chClaw").hasLead == true ) { State.variables.StVars.check5 = "chPlayerCharacter"; }
	State.variables.sc.customScript = function() {
		if ( gC(State.variables.StVars.check5).getAllSceneOrgasms() > State.variables.StVars.check4 ) { // Sub orgasmed
			State.variables.sc.importantMessages += gC(State.variables.StVars.check5).getFormattedName() + " can barely contain " + gC(State.variables.StVars.check5).refPr + ". //" + colorText(randomFromList(['"Nnggh..."','"Nhh-Aaaah!"','"Mmmhhhnn!"','"Hmmnn."']), gC(State.variables.StVars.check5).nameColor) + "//\n"
			+ "Barely seen by a Shapeshifter below, rumors spread and " + gC(State.variables.StVars.check5).getFormattedName() + "'s respect in the tribe slightly falls (-5).";
			gC(State.variables.StVars.check5).ssRsp -= 5;
			State.variables.StVars.check4 = gC(State.variables.StVars.check5).getAllSceneOrgasms();
		}
	}
	//
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}
window.clawTwoOrgasms = function(none) {
	var flagEndScene = false;
	
	if ( State.variables.chClaw.getAllSceneOrgasms() > 1 ) {
		flagEndScene = true;
	}
	
	return flagEndScene;
}

	// Domming Claw
window.bbCdommingClaw = function() {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter"],["chClaw"],"Claw pushes back against you, trying to stand away from the cliff.",playerTwoOrgasms,gSettings().stdSxScDur,
	"FASE BbC Dommed Claw");
	// Positioning, conditions
	State.variables.sc.sceneConditions.push("cantCancelPositions");
	State.variables.sc.sceneConditions.push("cantChangePositions");
	State.variables.chClaw.hasLead = false;
	State.variables.chPlayerCharacter.hasLead = true;
	createPosMountFromBehind("chPlayerCharacter",["chClaw"]);
	// Custom Dialogues
	State.variables.sc.setDialoguesList("bbCshutup");
	// Assign choices
	State.variables.chClaw.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chClaw.aiAlgorythm.setRoleSubmission();
	// Custom script
		// Set StVars.check4 to the sub char's current amount of orgasms
		// If check4 grows from the previous turn,
			// Chance for the sub character to moan, attracting attention
				// Update scene sub-description
				// Reduce character's reputation
			// Update check4 to new quantity
	State.variables.StVars.check4 = 0; // Sub's orgasm counter
	State.variables.StVars.check5 = "chClaw"; // Who's the sub to be checking
	if ( gC("chClaw").hasLead == true ) { State.variables.StVars.check5 = "chPlayerCharacter"; }
	State.variables.sc.customScript = function() {
		if ( gC(State.variables.StVars.check5).getAllSceneOrgasms() > State.variables.StVars.check4 ) { // Sub orgasmed
			State.variables.sc.importantMessages += gC(State.variables.StVars.check5).getFormattedName() + " can barely contain " + gC(State.variables.StVars.check5).refPr + ". //" + colorText(randomFromList(['"Nnggh..."','"Nhh-Aaaah!"','"Mmmhhhnn!"','"Hmmnn."']), gC(State.variables.StVars.check5).nameColor) + "//\n"
			+ "Barely seen by a Shapeshifter below, rumors spread and " + gC(State.variables.StVars.check5).getFormattedName() + "'s respect in the tribe slightly falls (-5).";
			gC(State.variables.StVars.check5).ssRsp -= 5;
			State.variables.StVars.check4 = gC(State.variables.StVars.check5).getAllSceneOrgasms();
		}
	}
	//
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}

	// Fighting Claw
window.bbCfightingClaw = function() {
	State.variables.sc.startScene( // Both you and your opponent catiously stand away from the edge of the cliff
	// FASE BbC Fight Victory
	// FASE BbC Fight Defeat
	"bs","fixed",["chPlayerCharacter"],["chClaw"],"__Caverns ~ Union Lake Upper Platform__\nBoth you and your opponent catiously stand away from the edge of the cliff.",createEndConditionStoryBattle("FASE BbC Fight Victory","FASE BbC Fight Defeat"),6,
	"FASE BbC Fight Victory");
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiEarlyStrategic();
		}
	}
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}
	
// Dildo Play
window.dldPlyNashTopsPlayer = function() {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter"],["chNash"],"Piles of materials, resources and crafts surround you, blocking the vision of any intruder. Of any new intruder, at least. Probably.",playerNnashTwoOrgasmsEndCondition,gSettings().stdSxScDur,
	"FASE DldPly NashTakesControl End");
	// Control
	State.variables.chNash.hasLead = true;
	State.variables.chPlayerCharacter.hasLead = false;
	// Assign choices
	State.variables.chNash.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chNash.aiAlgorythm.fixedTarget = "chPlayerCharacter";
	State.variables.chNash.aiAlgorythm.setRoleDomination();
	// Equip dildo on Nash
	unequipObject(State.variables.StVars.check1);
	unequipToolTypeFromChar("weaponID","chNash");
	equipObjectOnWearer(State.variables.StVars.check1,"chNash",-1);
	// Custom script
		// Chance for Nash to use dildo-related actions only, chance for Nash to use the usual aiAlgorythm
	State.variables.sc.customScript = function() {
		var flagNashChoosesDildoAction = true;
		if ( State.variables.chNash.aiAlgorythm.hasOwnProperty("missionCommands") ) {
			if ( State.variables.chNash.aiAlgorythm.missionCommands.length > 0 ) {
				flagNashChoosesDildoAction = false;
			}
		}
		if ( flagNashChoosesDildoAction ) {
			if ( limitedRandomInt(30) >= 20 ) { // Nash chooses dildo actions
				var possibleDildoChoices = ["dildoTeaseGenitals","dildoPenetratePussy","dildoPenetrateAss","dildoPenetrateMouth","thrustDildo","doubleDildoPussyPenetration","baDildoPenetratePussy","baThrustDildo","pushAgainstDildo"];
				possibleDildoChoices = purgeInvalidActionsFromListActorOnTarget(possibleDildoChoices,"chNash","chPlayerCharacter");
				if ( possibleDildoChoices.length > 0 ) {
					var fixedDildoChoices = [];
					for ( var ch of possibleDildoChoices ) {
						fixedDildoChoices.push(["chPlayerCharacter",ch]);
					}
					State.variables.chNash.aiAlgorythm = createAiRandomChoice(fixedDildoChoices);
					State.variables.chNash.aiAlgorythm.fixedTarget = "chPlayerCharacter";
				} else { flagNashChoosesDildoAction = false; }
			} else { flagNashChoosesDildoAction = false; }
		}
		if ( flagNashChoosesDildoAction == false ) {
			State.variables.chNash.aiAlgorythm = createAiWeightedMissionsByTaste();
			State.variables.chNash.aiAlgorythm.fixedTarget = "chPlayerCharacter";
			State.variables.chNash.aiAlgorythm.setRoleDomination();
		}
	}
	//
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}
window.dldPlyEgaNashHasDildo = function() {
	State.variables.sc.startScene(
	"ss","dynamic",["chPlayerCharacter"],["chNash"],"Piles of materials, resources and crafts surround you, blocking the vision of any intruder. Of any new intruder, at least. Probably.",playerNnashTwoOrgasmsEndCondition,gSettings().stdSxScDur,
	"FASE DldPly EgaNashDld End");
	// Assign choices
	State.variables.chNash.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chNash.aiAlgorythm.fixedTarget = "chPlayerCharacter";
	State.variables.chNash.aiAlgorythm.setRoleActive();
	// Equip dildo on Nash
	unequipObject(State.variables.StVars.check1);
	unequipToolTypeFromChar("weaponID","chNash");
	equipObjectOnWearer(State.variables.StVars.check1,"chNash",-1);
	// Custom script
		// Chance for Nash to use dildo-related actions only, chance for Nash to use the usual aiAlgorythm
	State.variables.sc.customScript = function() {
		var flagNashChoosesDildoAction = true;
		if ( State.variables.chNash.aiAlgorythm.hasOwnProperty("missionCommands") ) {
			if ( State.variables.chNash.aiAlgorythm.missionCommands.length > 0 ) {
				flagNashChoosesDildoAction = false;
			}
		}
		if ( flagNashChoosesDildoAction ) {
			if ( limitedRandomInt(30) >= 20 ) { // Nash chooses dildo actions
				var possibleDildoChoices = ["dildoTeaseGenitals","dildoPenetratePussy","dildoPenetrateAss","dildoPenetrateMouth","thrustDildo","doubleDildoPussyPenetration","baDildoPenetratePussy","baThrustDildo","pushAgainstDildo"];
				possibleDildoChoices = purgeInvalidActionsFromListActorOnTarget(possibleDildoChoices,"chNash","chPlayerCharacter");
				if ( possibleDildoChoices.length > 0 ) {
					var fixedDildoChoices = [];
					for ( var ch of possibleDildoChoices ) {
						fixedDildoChoices.push(["chPlayerCharacter",ch]);
					}
					State.variables.chNash.aiAlgorythm = createAiRandomChoice(fixedDildoChoices);
					State.variables.chNash.aiAlgorythm.fixedTarget = "chPlayerCharacter";
				} else { flagNashChoosesDildoAction = false; }
			} else { flagNashChoosesDildoAction = false; }
		}
		if ( flagNashChoosesDildoAction == false ) {
			State.variables.chNash.aiAlgorythm = createAiWeightedMissionsByTaste();
			State.variables.chNash.aiAlgorythm.fixedTarget = "chPlayerCharacter";
			State.variables.chNash.aiAlgorythm.setRoleActive();
		}
	}
	//
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}
window.dldPlyEgaPlayerHasDildo = function() {
	State.variables.sc.startScene(
	"ss","dynamic",["chPlayerCharacter"],["chNash"],"Piles of materials, resources and crafts surround you, blocking the vision of any intruder. Of any new intruder, at least. Probably.",playerNnashTwoOrgasmsEndCondition,gSettings().stdSxScDur,
	"FASE DldPly EgaPlayerDld End");
	// Assign choices
	State.variables.chNash.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chNash.aiAlgorythm.fixedTarget = "chPlayerCharacter";
	State.variables.chNash.aiAlgorythm.setRolePassive();
	// Equip dildo on PC
	unequipObject(State.variables.StVars.check1);
	unequipToolTypeFromChar("weaponID","chPlayerCharacter");
	equipObjectOnWearer(State.variables.StVars.check1,"chPlayerCharacter",-1);
		//
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}
window.dldPlyPlayerTopsNash = function() {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter"],["chNash"],"Piles of materials, resources and crafts surround you, blocking the vision of any intruder. Of any new intruder, at least. Probably.",playerNnashTwoOrgasmsEndCondition,gSettings().stdSxScDur,
	"FASE DldPly PlayerTakesControl End");
	// Control
	State.variables.chNash.hasLead = false;
	State.variables.chPlayerCharacter.hasLead = true;
	// Assign choices
	State.variables.chNash.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chNash.aiAlgorythm.fixedTarget = "chPlayerCharacter";
	State.variables.chNash.aiAlgorythm.setRoleSubmission();
	// Equip dildo on PC
	unequipObject(State.variables.StVars.check1);
	unequipToolTypeFromChar("weaponID","chPlayerCharacter");
	equipObjectOnWearer(State.variables.StVars.check1,"chPlayerCharacter",-1);
	//
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}

// Caverns Rescue
window.valtanPleasuresPlayerCaRe = function() {
	State.variables.sc.startScene(
	"ss","dynamic",["chPlayerCharacter"],["chVal"],"A sequence of slim lights and warm shadows mirror your movements.",playerOrgasmEndCondition,gSettings().stdSxScDur,
	"FASE CaRe ValtanComes Failure2");
	State.variables.chVal.hasLead = true;
	State.variables.chPlayerCharacter.hasLead = false;
	// Assign choices
	State.variables.chVal.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chVal.aiAlgorythm.fixedTarget = "chPlayerCharacter";
	State.variables.chVal.aiAlgorythm.setRoleDomination();
	//
	State.variables.sc.continuedActions.push(createCaFrenchKiss("chVal",["chPlayerCharacter"]));
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}	

// Gift for the Shapeshifters
window.startSceneGfs1 = function() {
	var charPsKeys = ["charA","charB"];
	var charKeys = [];
	var usedNames = [];
	for ( var ch of charPsKeys ) {
		// Choose NPC's sex and gender
		var type = "fem";
		if ( gSettings().lewdMales == "enable" && limitedRandomInt(100) < 30 ) {
			type = "mal";
		} else if ( gSettings().futa != "disableAll" && limitedRandomInt(100) < 40 ) {
			type = "fut";
		}
		     //var type = State.variables.mapGleamingCaverns[ch];
		// Generate NPC
		var chK = "";
		if ( type == "fem" ) {
			chK = generateFemaleAnonShapeshifter(usedNames);
		} else if ( type == "mal" ) {
			chK = generateMaleAnonShapeshifter(usedNames);
		} else {
			chK = generateFemaleAnonShapeshifter(usedNames);
			gC(chK).addBodypart("dick","dick");
		}
		charKeys.push(chK);
		usedNames.push(gC(chK).name);
		destroyCharsVirginitiesNoFlavor(chK);
		recalculateMaxBars(chK);
	}
	var description = "A crowd gets formed bit by bit...";
	State.variables.sc.startScene("ss","dynamic",["chPlayerCharacter"],charKeys,description,teamBcharsReachedOrgasmEndCondition,gSettings().stdSxScDur,"FaSe GFS Stroll1"); // Start scene
	gC("chPlayerCharacter").hasLead = false;
	State.variables.sc.endSceneScript = cleanGfsScenes;
	State.variables.sc.customScript = ccsGfsScenes;
			
	// Set lead
	addSceneTagToChar("noLead","chPlayerCharacter");
	  
	// Set AIs
	for ( var chK of charKeys ) {
		gC(chK).aiAlgorythm = createAiWeightedMissionsByTaste();
		if ( limitedRandomInt(100) < 50 ) {
			gC(chK).aiAlgorythm.setRoleActive();
		} else {
			gC(chK).aiAlgorythm.setRoleDomination();
		}
		State.variables[chK].aiAlgorythm.fixedTarget = "chPlayerCharacter";
		gC(chK).lust.current = 50;
	}
	State.variables.sc.genericCharacters = charKeys;
	State.variables.sc.formatScenePassage();
}
window.startSceneGfs2 = function() {
	var charPsKeys = ["charA","charB","charC"];
	var charKeys = [];
	var usedNames = [];
	for ( var ch of charPsKeys ) {
		// Choose NPC's sex and gender
		var type = "fem";
		if ( gSettings().lewdMales == "enable" && limitedRandomInt(100) < 30 ) {
			type = "mal";
		} else if ( gSettings().futa != "disableAll" && limitedRandomInt(100) < 40 ) {
			type = "fut";
		}
		     //var type = State.variables.mapGleamingCaverns[ch];
		// Generate NPC
		var chK = "";
		if ( type == "fem" ) {
			chK = generateFemaleAnonShapeshifter(usedNames);
		} else if ( type == "mal" ) {
			chK = generateMaleAnonShapeshifter(usedNames);
		} else {
			chK = generateFemaleAnonShapeshifter(usedNames);
			gC(chK).addBodypart("dick","dick");
		}
		charKeys.push(chK);
		usedNames.push(gC(chK).name);
		destroyCharsVirginitiesNoFlavor(chK);
		recalculateMaxBars(chK);
	}
	var description = "Nersmias sometimes pushes you all forward, making sure the crowd keeps moving.";
	State.variables.sc.startScene("ss","dynamic",["chPlayerCharacter"],charKeys,description,teamBcharsReachedOrgasmEndCondition,gSettings().stdSxScDur,"FaSe GFS Stroll2"); // Start scene
	gC("chPlayerCharacter").hasLead = false;
	State.variables.sc.endSceneScript = cleanGfsScenes;
	State.variables.sc.customScript = ccsGfsScenes;
			
	// Set lead
	addSceneTagToChar("noLead","chPlayerCharacter");
	  
	// Set AIs
	for ( var chK of charKeys ) {
		gC(chK).aiAlgorythm = createAiWeightedMissionsByTaste();
		if ( limitedRandomInt(100) < 50 ) {
			gC(chK).aiAlgorythm.setRoleActive();
		} else {
			gC(chK).aiAlgorythm.setRoleDomination();
		}
		State.variables[chK].aiAlgorythm.fixedTarget = "chPlayerCharacter";
		gC(chK).lust.current = 50;
	}
	State.variables.sc.genericCharacters = charKeys;
	State.variables.sc.formatScenePassage();
}
window.startSceneGfs3 = function() {
	var charPsKeys = ["charA","charB","charC","charD"];
	var charKeys = [];
	var usedNames = [];
	for ( var ch of charPsKeys ) {
		// Choose NPC's sex and gender
		var type = "fem";
		     //var type = State.variables.mapGleamingCaverns[ch];
		// Generate NPC
		var chK = generateFemaleAnonShapeshifter(usedNames);
		if ( gSettings().futa != "disableAll" ) {
			if ( limitedRandomInt(100) < 50 ) {
				gC(chK).addBodypart("dick","dick");
			}
		}
		
		charKeys.push(chK);
		usedNames.push(gC(chK).name);
		destroyCharsVirginitiesNoFlavor(chK);
		recalculateMaxBars(chK);
		gC(chK).lust.current = 75;
	}
	
	gC("ch0").name = "NotAte";
	gC("ch0").fullPortrait = function() {
		return "[img[img/portraits/ate-full.png]]";
	}
	gC("ch0").avatar = function() {
		return "[img[img/portraits/ate-avatar.png]]";
	}
	gC("ch0").fullPortraitL = "img/portraits/ate-full.png";
	gC("ch0").avatarL = "img/portraits/ate-avatar.png";
	gC("ch0").setColors("palevioletred","palevioletred");
	gC("ch0").names = gC("chAte").names;
	
	gC("ch1").name = "NotClaw";
	gC("ch1").fullPortrait = function() {
		return "[img[img/portraits/claw-full.png]]";
	}
	gC("ch1").avatar = function() {
		return "[img[img/portraits/claw-avatar.png]]";
	}
	gC("ch1").fullPortraitL = "img/portraits/claw-full.png";
	gC("ch1").avatarL = "img/portraits/claw-avatar.png";
	gC("ch1").setColors("gold","gold");
	gC("ch1").names = gC("chClaw").names;
	
	gC("ch2").name = "NotNash";
	gC("ch2").fullPortrait = function() {
		return "[img[img/portraits/nash-full.png]]";
	}
	gC("ch2").avatar = function() {
		return "[img[img/portraits/nash-avatar.png]]";
	}
	gC("ch2").fullPortraitL = "img/portraits/nash-full.png";
	gC("ch2").avatarL = "img/portraits/nash-avatar.png";
	gC("ch2").setColors("coral","coral");
	gC("ch2").names = gC("chNash").names;
	
	gC("ch3").name = "NotPadmiri";
	gC("ch3").fullPortrait = function() {
		return "[img[img/portraits/mir-full.png]]";
	}
	gC("ch3").avatar = function() {
		return "[img[img/portraits/mir-avatar.png]]";
	}
	gC("ch3").fullPortraitL = "img/portraits/mir-full.png";
	gC("ch3").avatarL = "img/portraits/mir-avatar.png";
	gC("ch3").setColors("palegreen","palegreen");
	gC("ch3").names = gC("chMir").names;
	
	var description = "Most of the Shapeshifter tribe is now at the assembly, either on the platform, or observing what's going on from afar.";
	State.variables.sc.startScene("ss","dynamic",["chPlayerCharacter"],charKeys,description,teamBcharsReachedOrgasmEndCondition,gSettings().stdSxScDur,"FaSe GFS Stroll3"); // Start scene
	gC("chPlayerCharacter").hasLead = false;
	State.variables.sc.endSceneScript = cleanGfsScenes;
	State.variables.sc.customScript = ccsGfsScenes;
			
	// Set lead
	addSceneTagToChar("noLead","chPlayerCharacter");
	  
	// Set AIs
	for ( var chK of charKeys ) {
		gC(chK).aiAlgorythm = createAiWeightedMissionsByTaste();
		if ( limitedRandomInt(100) < 50 ) {
			gC(chK).aiAlgorythm.setRoleActive();
		} else {
			gC(chK).aiAlgorythm.setRoleDomination();
		}
		State.variables[chK].aiAlgorythm.fixedTarget = "chPlayerCharacter";
	}
	State.variables.sc.genericCharacters = charKeys;
	State.variables.sc.formatScenePassage();
}
window.cleanGfsScenes = function() {
	//delete State.variables.ch0;
	//delete State.variables.ch1;
	//delete State.variables.ch2;
	//delete State.variables.ch3;
}
window.ccsGfsScenes = function() {
	var npcChars = State.variables.sc.teamBcharKeys;
	for ( var ch of npcChars ) {
		if ( limitedRandomInt(100) >= 20 ) {
			State.variables[ch].aiAlgorythm.fixedTarget = "chPlayerCharacter";
		} else {
			State.variables[ch].aiAlgorythm.fixedTarget = randomFromList(npcChars);
		}
	}
}

// Twisted Festival
// Claw Spars With Nash
window.tfClawNashSparInit = function() {
	State.variables.sc.startScene(
	"bs","fixed",["chClaw"],["chNash"],"__Assembly__\nClaw's movements are wild and excessive, almost begging for attention.",endConditionTurns,3,
	"TwistedFest PlayMiddle3");
		State.variables.chClaw.aiAlgorythm = createAiFixedAction();
		State.variables.chClaw.aiAlgorythm.fixedAction = "kick";
		State.variables.chClaw.aiAlgorythm.fixedTarget = "chNash";
		State.variables.chNash.aiAlgorythm = createAiFixedAction();
		State.variables.chNash.aiAlgorythm.fixedAction = "coldGuts";
		State.variables.chNash.aiAlgorythm.fixedTarget = "chClaw";
		
	State.variables.sc.customScript = tfClawNashSparScript;
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}
window.tfClawNashSparScript = function() {
	switch (State.variables.sc.currentTurn) {
		case 2:
			State.variables.chClaw.aiAlgorythm.fixedAction = "baScratch";
			State.variables.chNash.aiAlgorythm.fixedAction = "kick";
			break;
		case 3:
			State.variables.chClaw.aiAlgorythm.fixedAction = "catAspect";
			State.variables.chNash.aiAlgorythm.fixedAction = "kick";
			break;
	}
}

// Player and Valtan Grope Padmiri
window.tfMirGetsDoubleGropedInit = function() {
	// Create Fake Valtan character
	var fakeValtan = generateFemaleAnonShapeshifter([]);
	charAcopiesAppeareanceCharB(fakeValtan,"chVal");
	gC(fakeValtan).adjustAttributes(1,2);
	gC(fakeValtan).statsDifficultyAdjustments(-1);
	recalculateMaxBars(fakeValtan);
	// Scene
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter",fakeValtan],["chMir"],"__Assembly__\nThe attention of the spectators gets gradually shifted towards the three of you.",endConditionTurns,10,
	"TwistedFest PlayMiddleTakeAdvantage2");
	State.variables.sc.sceneConditions.push("cantCancelPositions","cantInitiatePos");
	State.variables.chPlayerCharacter.hasLead = true;
	State.variables.chMir.hasLead = false;
	State.variables[fakeValtan].hasLead = true;
	
	// Positions // No position ?
	State.variables.sc.formatScenePassage();
	
	// AI
	State.variables.chMir.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chMir.aiAlgorythm.setRoleSubmission();
	State.variables[fakeValtan].aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables[fakeValtan].aiAlgorythm.setRoleActive();
	State.variables.sc.endSceneScript = endSceneScriptUnconditionalCleanLust;
	
	State.variables.sc.genericCharacters = [fakeValtan];
}
window.tfHelpingMirAgainstValtan = function() {
	// Create Fake Valtan character
	var fakeValtan = generateFemaleAnonShapeshifter([]);
	charAcopiesAppeareanceCharB(fakeValtan,"chVal");
	gC(fakeValtan).adjustAttributes(1,2);
	gC(fakeValtan).statsDifficultyAdjustments(1);
	recalculateMaxBars(fakeValtan);
	// Scene
	State.variables.sc.startScene( 
	"bs","fixed",["chPlayerCharacter","chMir"],[fakeValtan],"__Assembly__\nThe attention of the spectators gets gradually shifted towards the three of you.",endConditionTurns,10,
	"TwistedFest PlayMiddleTurnTables2");
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiEarlyStrategic();
		}
	}
	State.variables.sc.formatScenePassage();
	State.variables.sc.endSceneScript = endSceneScriptUnconditionalCleanLust;
	
	State.variables.sc.genericCharacters = [fakeValtan];
}

window.tfMultiBattleTenCandidates = function() {
	// Fake Candidates
	var fakeCandidates = [];
	State.variables.fakeCandsItems = [];
	for ( var ch of ["chPlayerCharacter","chNash","chMir","chClaw","chAte"] ) {
		var currentFake = generateFemaleAnonShapeshifter([]);
		fakeCandidates.push(currentFake);
		charAcopiesAppeareanceCharB(currentFake,ch);
		gC(currentFake).adjustAttributes(2,3);
		gC(currentFake).statsDifficultyAdjustments(2);
		recalculateMaxBars(currentFake);
		// Do fakes have dicks?
		if ( gSettings().futa == "enableAll" || gSettings().futa == "futaPartners" ) {
			gC(currentFake).addBodypart("dick","dick");
		}
		
		// Replicate weapon
		for ( var wp of State.variables.equipmentList ) {
			if ( getEquipById(wp.id).equippedOn == ch ) {
				if ( getEquipDataById(wp.id).slot == "weapon" ) {
					var wpId = createEquipment(getEquipById(wp.id).type,currentFake);
					State.variables.fakeCandsItems.push(wpId);
					equipObjectOnWearer(wpId,currentFake,-1);
				}
			}
		}
		
	}
	
	gC("ch0").name = "Not " + gC("chPlayerCharacter").name + "?";
	gC("ch0").formattedName = '<span style="color:'+gC("ch0").nameColor+'">'+gC("ch0").name+'</span>';
	gC("ch0").names = [ gC("ch0").getName() , gC("ch0").getName() , gC("ch0").getName() ];
	
	// Scene
	State.variables.sc.startScene( 
	"bs","fixed",["chPlayerCharacter",fakeCandidates[1],fakeCandidates[2],fakeCandidates[3],"chAte"],[fakeCandidates[0],"chNash","chMir","chClaw",fakeCandidates[4]],"__Assembly__\nBlows, kicks and barrages of magic projectiles fly all across the stage. Some Shapeshifters are casting a magic barrier to protect the entranced spectators.",createEndConditionsTwistedFestivalSpecialBattle("TwistedFest FakesWin1","TwistedFest SecretVictory"),6,
	"TwistedFest FakesWin1");
	
	// Scripts and conditions ~ Player starts pinned by her own fake
	depleteControl("chPlayerCharacter");
	createBposFrontalPounce("ch0",["chPlayerCharacter"]);
	
	State.variables.sc.customScript = tfMultiBattleTenCandidatesCustomScript;
	State.variables.sc.endSceneScript = endSceneScriptTfMultiBattleCandidates;
	
	// AIs
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiEarlyStrategic();
		}
	}
	
	State.variables.sc.genericCharacters = fakeCandidates;
	State.variables.sc.formatScenePassage();
}
window.tfMultiBattleTenCandidatesCustomScript = function() {
	// Claw is very likely to target her fake, Ate is moderately likely to target her fake
	if ( gC("chClaw").koed == false ) {
		gC("chClaw").aiAlgorythm.fixedTarget = undefined;
		if ( gC("ch3").koed == false ) {
			if ( limitedRandomInt(100) > 25 ) {
				gC("chClaw").aiAlgorythm.fixedTarget = "ch3";
			}
		}
	}
	if ( gC("chAte").koed == false ) {
		gC("chAte").aiAlgorythm.fixedTarget = undefined;
		if ( gC("ch4").koed == false ) {
			if ( limitedRandomInt(100) > 50 ) {
				gC("chAte").aiAlgorythm.fixedTarget = "ch4";
			}
		}
	}
}
window.endSceneScriptTfMultiBattleCandidates = function() {
	var allChars = State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys);
	for ( var cK of allChars ) {
		gC(cK).lust.current = gC(cK).lust.max; 
	}
	var itemsToRemove = [];
	for ( var it of State.variables.fakeCandsItems ) {
		itemsToRemove = [it].concat(itemsToRemove);
	}
	for ( var wp of itemsToRemove ) {
		removeItem(wp);
	}
	delete State.variables.fakeCandsItems;
}

// Gleaming Caverns Epilogue
window.gCepFirstBattleLizardlins = function() {
	// Create lizardlins chars
		// Create spears
	var lizardlins = [];
	State.variables.StVars.check2 = []; // Weapons
	var i = 0;
	var difficultyBuff = -1;
	if ( gSettings().difficulty == "normal" ) {
		difficultyBuff = 0;
	} else if ( gSettings().difficulty == "hard" ) {
		difficultyBuff = 1;
	}
	while ( i < 4 ) {
		i++;
		if ( gSettings().lewdMales == "enable" && limitedRandomInt(100) > 49 ) {
			lizardlins.push(generateMaleAnonLizardlin(1,2+difficultyBuff,i));
		} else {
			lizardlins.push(generateFemaleAnonLizardlin(1,2+difficultyBuff,i));
		}
		State.variables.StVars.check2 = [createEquipment(equipmentType.SPEAR,"chDummy")].concat(State.variables.StVars.check2);
		equipObjectOnWearer(State.variables.StVars.check2[i-1],lizardlins[i-1],-1);
	}
	
	State.variables.sc.startScene(
	"bs","fixed",["chPlayerCharacter","chMir","chAte","chRock"],lizardlins,"__Mountain__\nDespite their fierce movements, the lizardlins are cautious enough to keep a prudent distance between them and your allies.",endConditionTurns,5,
	"FaEpil LizIntro2");
	
	// AIs
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiEarlyStrategic();
		}
	}
	
	// Custom script: Hope and Rock cannot use pounces or sex actions
	State.variables.sc.customActionAllowed = disallowBeastkinLewdActionsOnFirstAdventure;
	State.variables.sc.formatScenePassage();
	// Rest lust script
		// Remove spears
	State.variables.sc.genericCharacters = lizardlins;
	State.variables.sc.endSceneScript = function() {
		for ( var it of State.variables.StVars.check2 ) {
			removeItem(it);
		}
		// Restore bars
		for ( var cK of ["chPlayerCharacter","chMir","chAte","chRock"] ) {		
			for ( var bar of ["lust","energy","willpower","socialdrive"] ) {
				gC(cK)[bar].current += (gC(cK)[bar].max - gC(cK)[bar].current) * 0.7;
			}
		}
	}
}
window.gCepSecondBattleLizardlins = function() {
	// Create lizardlins chars
		// Create spears
	var lizardlins = [];
	State.variables.StVars.check2 = []; // Weapons
	var i = 0;
	var difficultyBuff = -1;
	if ( gSettings().difficulty == "normal" ) {
		difficultyBuff = 0;
	} else if ( gSettings().difficulty == "hard" ) {
		difficultyBuff = 1;
	}
	while ( i < 3 ) {
		i++;
		if ( gSettings().lewdMales == "enable" && limitedRandomInt(100) > 49 ) {
			lizardlins.push(generateMaleAnonLizardlin(1,2+difficultyBuff,i));
		} else {
			lizardlins.push(generateFemaleAnonLizardlin(1,2+difficultyBuff,i));
		}
		State.variables.StVars.check2 = [createEquipment(equipmentType.SPEAR,"chDummy")].concat(State.variables.StVars.check2);
		equipObjectOnWearer(State.variables.StVars.check2[i-1],lizardlins[i-1],-1);
	}
	
	State.variables.sc.startScene(
	"bs","fixed",["chPlayerCharacter","chClaw","chHope"],lizardlins,"__Mountain__\nTens of meters behind you, Nashillbyir and Rock keep another pair of lizardlins at bay.",createEndConditionStoryBattle("FaEpil LizIntro6A","FaEpil LizIntro6B"),6,
	"FaEpil LizIntro6A");
	
	// AIs
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiEarlyStrategic();
		}
	}
	
	// Custom script: Hope and Rock cannot use pounces or sex actions
	State.variables.sc.customActionAllowed = disallowBeastkinLewdActionsOnFirstAdventure;
	State.variables.sc.formatScenePassage();
	// Rest lust script
		// Remove spears
	State.variables.sc.genericCharacters = lizardlins;
	State.variables.sc.endSceneScript = function() {
		for ( var it of State.variables.StVars.check2 ) {
			removeItem(it);
		}
		// Restore bars
		for ( var cK of ["chPlayerCharacter","chClaw","chHope"] ) {		
			if ( gC(cK).orgasmSceneCounter > 0 ) { gC(cK).lust.current = 0; }
			for ( var bar of ["lust","energy","willpower","socialdrive"] ) {
				gC(cK)[bar].current += (gC(cK)[bar].max - gC(cK)[bar].current) * 0.7;
			}
		}
	}
}

window.gCepBossBattleLizardlins = function() {
	// Create lizardlins chars
		// Create spears
	var lizardlins = [];
	State.variables.StVars.check2 = []; // Weapons
	var i = 0;
	var difficultyBuff = -1;
	if ( gSettings().difficulty == "normal" ) {
		difficultyBuff = 0;
	} else if ( gSettings().difficulty == "hard" ) {
		difficultyBuff = 1;
	}
	while ( i < 4 ) {
		i++;
		if ( gSettings().lewdMales == "enable" && limitedRandomInt(100) > 49 ) {
			lizardlins.push(generateMaleAnonLizardlin(1,2+difficultyBuff,i));
		} else {
			lizardlins.push(generateFemaleAnonLizardlin(1,2+difficultyBuff,i));
		}
		State.variables.StVars.check2 = [createEquipment(equipmentType.SPEAR,"chDummy")].concat(State.variables.StVars.check2);
		equipObjectOnWearer(State.variables.StVars.check2[i-1],lizardlins[i-1],-1);
	}
	lizardlins = ["chChin"].concat(lizardlins);
	State.variables.StVars.check2 = [createEquipment(equipmentType.SPEAR,"chChin")].concat(State.variables.StVars.check2);
	equipObjectOnWearer(State.variables.StVars.check2[4],"chChin",-1);
	
	gC("chChin").adjustAttributes(0,difficultyBuff);
	recalculateMaxBars("chChin");
	
	State.variables.sc.startScene(
	"bs","fixed",["chPlayerCharacter","chNash","chClaw","chHope","chRock"],lizardlins,"__Mountain__\nA storm of thrusts, blows and fire strikes in all directions. The cliff is dangerously close.",createEndConditionStoryBattle("FaEpil LizIntro9A","FaEpil LizIntro9B"),6,
	"FaEpil LizIntro9A");
	
	// AIs
	for ( var charKey of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( charKey != "chPlayerCharacter" ) {
			gC(charKey).aiAlgorythm = createAiEarlyStrategic();
		}
	}
	
	// Custom script: Hope and Rock cannot use pounces or sex actions
	State.variables.sc.customActionAllowed = disallowBeastkinLewdActionsOnFirstAdventure;
	State.variables.sc.customScript = cssGcAtenechinolDialogues;
	State.variables.sc.formatScenePassage();
	// Rest lust script
		// Remove spears
	State.variables.sc.genericCharacters = [lizardlins[1],lizardlins[2],lizardlins[3],lizardlins[4]];
	State.variables.sc.endSceneScript = function() {
		for ( var it of State.variables.StVars.check2 ) {
			removeItem(it);
		}
		// Restore bars
		for ( var cK of ["chPlayerCharacter"] ) {		
			for ( var bar of ["lust","energy","willpower","socialdrive"] ) {
				gC(cK)[bar].current += (gC(cK)[bar].max - gC(cK)[bar].current) * 0.7;
			}
		}
	}
}
window.cssGcAtenechinolDialogues = function() {
	var msg = "";
	if ( State.variables.StVars.check6 == false ) { // Defeated
		if ( gC("chChin").koed == true ) {
			msg = `\n<span @style=$chChin.colorStyleKey>//"Wretched beasts... This doesn't end here!"//</span>`;
			State.variables.StVars.check6 = true;
		}
		if ( msg == "" && State.variables.StVars.check3 == false ) { // Is mounted
			if ( gC("chChin").position.type == "passive" ) {
				msg = `\n<span @style=$chChin.colorStyleKey>//"Get off me, foul creature!"//</span>`;
				State.variables.StVars.check3 = true;
			}
		}
		if ( msg == "" && State.variables.StVars.check5 == false ) { // KOed ally
			var anyKoedEnemy = false;
			for ( var cK of State.variables.sc.teamAcharKeys ) {
				if ( gC(cK).koed == true ) { anyKoedEnemy = true; }
			}
			if ( anyKoedEnemy ) {
				msg = `\n<span @style=$chChin.colorStyleKey>//"Keep attacking! They will soon be at our feet!"//</span>`;
				State.variables.StVars.check5 = true;
			}
		}
		if ( msg == "" && State.variables.StVars.check4 == false ) { // Used fire breath
			var usedFireBreath = false;
			for ( var cA of State.variables.sc.teamBchosenActions ) {
				if ( cA == "fireBreath" ) { usedFireBreath = true; }
			}
			if ( usedFireBreath ) {
				msg = `\n<span @style=$chChin.colorStyleKey>//"FRGOAAAAAR!"//</span>` + "\n" + `<span @style=$chNash.colorStyleKey>//"Jump back! She's spitting fire!"//</span>`;
				State.variables.StVars.check4 = true;
			}
		}	
	}
	State.variables.sc.headingDescription = "__Mountain__\nA storm of thrusts, blows and fire strikes in all directions. The cliff is dangerously close." + msg;
}

// Tribute for the Goddess

window.tftgCustomChar = function(candidate) {
	// TftG RE chNash / TftG RE chMir / TftG RE chClaw / TftG RE chVal / TftG RE chAte
	var endScene = "TftG RE " + candidate;
	State.variables.sc.startScene(
	"ss","dynamic",["chPlayerCharacter"],[candidate],"The mist thickens, everything beyond your bodies turning distant and blurry.",endConditionEveryonesXOrgasms,2,
	endScene);
	// Assign choices
	State.variables[candidate].aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables[candidate].aiAlgorythm.setRoleActive();
		//
	State.variables.sc.customScript = tftgScriptOne;
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}
window.tftgScriptOne = function() {
	var description = randomFromList([
		"The mist thickens, everything beyond your bodies turning distant and blurry.",
		"You hear the moans of your peers, the sound of skin slapping against skin.",
		"The purple flame is growing.",
		"The Goddess' watchful gaze is upon you."
	]);
	State.variables.sc.headingDescription = description;;
}
window.tftgSolo = function() {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter"],[],"The mist thickens, everything beyond your body turning distant and blurry.",endConditionEveryonesXOrgasms,1,
	"TftG RE Solo");
	State.variables.sc.customScript = tftgScriptTwo;
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}
window.tftgScriptTwo = function() {
	var description = randomFromList([
		"The mist thickens, everything beyond your body turning distant and blurry.",
		"You hear the moans of your peers, the sound of skin slapping against skin.",
		"The purple flame is growing.",
		"The Goddess' watchful gaze is upon you."
	]);
	State.variables.sc.headingDescription = description;;
}
window.tftgOrgy = function() {
	State.variables.sc.startScene(
	"ss","dynamic",["chPlayerCharacter","chNash","chMir"],["chVal","chClaw","chAte"],"The mist thickens, everything beyond your bodies turning distant and blurry.",endConditionEveryonesXOrgasms,2,
	"TftG RE Orgy");
	// Assign choices
	for ( var ch of getCandidatesKeysArray() ) {
		if ( ch != "chPlayerCharacter" ) {
			State.variables[ch].aiAlgorythm = createAiWeightedMissionsByTaste();
			State.variables[ch].aiAlgorythm.setRoleActive();
		}
	}
		//
	State.variables.sc.customScript = tftgScriptOne;
	State.variables.sc.formatScenePassage();
	setRefreshLustScript();
}

// Sharing the Night
window.stnStdEgaScene = function(partner,description,nextPassage) {
	State.variables.sc.startScene(
	"ss","dynamic",["chPlayerCharacter"],[partner],description,endConditionEveryonesXOrgasms,2,
	nextPassage);
	// Assign choices
	State.variables[partner].aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables[partner].aiAlgorythm.setRoleActive();
		//
	State.variables.sc.formatScenePassage();
	State.variables.sc.endSceneScript = endSceneScriptCharactersBecomeHealedAndTired;
}
window.stnStdDsScene = function(partner,isPlayerDomming,description,nextPassage) {
	State.variables.sc.startScene(
	"ss","fixed",["chPlayerCharacter"],[partner],description,endConditionEveryonesXOrgasms,2,
	nextPassage);
		// Assign choices
		State.variables[partner].aiAlgorythm = createAiWeightedMissionsByTaste();
	if ( isPlayerDomming ) {
		State.variables.chPlayerCharacter.hasLead = true;
		State.variables[partner].hasLead = false;
		State.variables[partner].aiAlgorythm.setRoleSubmission();
	} else {
		State.variables.chPlayerCharacter.hasLead = false;
		State.variables[partner].hasLead = true;
		State.variables[partner].aiAlgorythm.setRoleDomination();
	}
		//
	State.variables.sc.formatScenePassage();
	State.variables.sc.endSceneScript = endSceneScriptCharactersBecomeHealedAndTired;
}
window.stnValSilThreesome = function() {
	var doesSilExist = State.variables.hasOwnProperty("chSil");
	addSceneTagToChar("noLead","chPlayerCharacter");
	
	if ( doesSilExist ) {
		State.variables.StVars.check6 = [gC("chSil").name,gC("chSil").nameColor,gC("chSil").formattedName,gC("chSil").names];
		charAcopiesAppeareanceCharB("chSil","chVal");
		State.variables.sc.startScene(
			"ss","dynamic",["chPlayerCharacter"],["chVal","chSil"],"A large pond covers most of the room.",endConditionEveryonesXOrgasms,2,
			"Sharing the Night Sil3");
		State.variables.chSil.aiAlgorythm = createAiWeightedMissionsByTaste();
		State.variables.chSil.aiAlgorythm.setRoleActive();
		gC("chSil").hasLead = false;
	} else {
		var tempSil = generateFemaleAnonShapeshifter([]);
		charAcopiesAppeareanceCharB(tempSil,"chVal");
		recalculateMaxBars(tempSil);
		destroyCharsVirginitiesNoFlavor(tempSil);
		State.variables.sc.startScene(
			"ss","dynamic",["chPlayerCharacter"],["chVal",tempSil],"A large pond covers most of the room.",endConditionEveryonesXOrgasms,2,
			"Sharing the Night Sil3");
		State.variables.sc.genericCharacters = [tempSil];
		gC(tempSil).aiAlgorythm = createAiWeightedMissionsByTaste();
		gC(tempSil).aiAlgorythm.setRoleActive();
		gC(tempSil).hasLead = false;
	}
	State.variables.chVal.aiAlgorythm = createAiWeightedMissionsByTaste();
	State.variables.chVal.aiAlgorythm.setRoleDomination();
	State.variables.chPlayerCharacter.hasLead = false;
	State.variables.chVal.hasLead = true;
	
	addSceneTagToChar("noLead","chPlayerCharacter");
	
	State.variables.sc.formatScenePassage();
	State.variables.sc.endSceneScript = endSceneScriptCharactersBecomeHealedAndTired;
	// Clean Sillan's appearance
	// Sillan's portrait on the next passage shouldn't depend on her character existing
}
window.cleanSillansAppearance = function() {
	if ( State.variables.hasOwnProperty("chSil") ) {
		var charA = "chSil";
		gC(charA).name = State.variables.StVars.check6[0];
		gC(charA).nameColor = State.variables.StVars.check6[1];
		gC(charA).formattedName = State.variables.StVars.check6[2];
		gC(charA).names = State.variables.StVars.check6[3];
		gC(charA).fullPortrait = function() {
		return "[img[img/portraits/sillan-full.png]]";
	}
		gC(charA).avatar = function() {
		return "[img[img/portraits/sillan-avatar.png]]";
	}
		gC(charA).fullPortraitL = "img/portraits/sillan-full.png";
		gC(charA).avatarL = "img/portraits/sillan-avatar.png";
	}
}

