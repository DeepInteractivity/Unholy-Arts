////////// TRANSFORMATION SCENES //////////

// tfGoals explanation: tfGoals is a list of several keywords, defining the transformation goals on the tfTarget
// Each tfGoals has an associated points value, defining the amount of points required to make the associated transformation completed
// Transformations are applied by tfActors (list) characters on tfTarget using specific actions
// tfGoals -> "addDick","addPussy","removeDick","removePussy","addBreasts","removeBreasts","rebuildFace","rebuildFigure"
// tfGoalsPoints are the required points remaining until 0 to consider each tfGoal complete
scene.prototype.startTfScene = function(sceneType, enabledLead,	tAck, tBck, headingDescription,	checkEndConditions, endConditionsVars, endScenePassage,
										tfGoals, tfActors, tfTarget, tfPoints, tfPermanentFlag, tfDays, genderChange, newAvatarFileName, newPortraitFileName) {
	this.tfFlag = true;
	this.tfActors = tfActors;
	this.tfTarget = tfTarget;
	this.tfGoals = tfGoals;
	this.tfDays = tfDays;
	this.tfPoints = tfPoints;
	this.tfGoalsPoints = [];
	for ( var point of this.tfGoals ) {
		this.tfGoalsPoints.push(tfPoints);
	}
	this.tfPermanentFlag = tfPermanentFlag;
	this.genderChange = genderChange; // "femenize", "masculinize", "none"
	this.provideTfActorsWithActions();
	// Disable lead for non-transformation-actors
	for ( var cK of tAck.concat(tBck) ) {
		if ( tfActors.includes(cK) == false ) {
			addSceneTagToChar("noLead",cK);
		}
	}
	
	if ( tfGoals.includes("rebuildFace") ) {
		this.newAvatarFileName = newAvatarFileName;
		this.newPortraitFileName = newPortraitFileName;
	}
	this.startScene(sceneType, enabledLead,	tAck, tBck,	headingDescription, checkEndConditions, endConditionsVars, endScenePassage);
}

scene.prototype.cleanTfSceneData = function() {
	// this.applyTransformationSceneEffects(); // tfEffects are now applied during scene
	this.tfActorsForgetActions();
	delete this.tfFlag;
	delete this.tfDays;
	delete this.tfActors;
	delete this.tfTarget;
	delete this.tfGoals;
	delete this.tfPoints;
	delete this.tfGoalsPoints;
	delete this.tfPermanentFlag;
	delete this.genderChange;
	delete this.tfPassage;
	if ( this.hasOwnProperty("newAvatarFileName") ) { delete this.newAvatarFileName; }
}
scene.prototype.getTfGoalsFullData = function() {
	var tfGoalsFullData = this.tfGoals;
	var i = 0;
	while ( i < this.tfGoals.length ) {
		tfGoalsFullData[this.tfGoals[i]] = tfGoalsPoints[i];
		i++;
	}
}

	// TfGoalsActions Data

setup.addDickActions = ["formDick"];
setup.addPussyActions = ["formPussy"];
setup.removeDickActions = ["buryDick"];
setup.removePussyActions = ["foldPussy"];
setup.addBreastsActions = ["sculptChest"];
setup.removeBreastsActions = ["sculptChest"];
setup.rebuildFaceActions = ["sculptingKiss"];
setup.rebuildFigureActions = ["sculptBody"];

setup.tfOptions = ["addDick","removeDick","addPussy","removePussy","changeForm","masculinize","feminize"];

	// TfGoals
window.getTfGoalActions = function(goal) {
	var actions = [];
	var keyword = goal + "Actions";
	actions = setup[keyword];
}

window.getRequiredPointsForTfGoal = function(goal) {
	var points = -1;
	var goalPosition = -1;
	var i = 0;
	for ( var g of State.variables.sc.tfGoals ) {
		if ( goal == g ) { goalPosition = i; }
		i++;
	}
	if ( goalPosition != -1 ) { points = State.variables.sc.tfGoalsPoints[goalPosition]; }
	return points;
}

window.advanceTfGoalPoints = function(goal) {
	var target = State.variables.sc.tfTarget;
	var goalPosition = -1;
	var i = 0;
	for ( var g of State.variables.sc.tfGoals ) {
		if ( goal == g ) { goalPosition = i; }
		i++;
	}
	State.variables.sc.tfGoalsPoints[goalPosition] -= (1 + (getCharsSlimedIntensity(target) * 0.1)) * (1 + limitedRandomInt(20) * 0.01);
	if ( State.variables.sc.tfGoalsPoints[goalPosition] <= 0 ) {
		applyTfGoalPerStringToTfTarget(goal);
	}
}
window.advanceTfGoalsPoints = function(goals) {
	for ( var goal of goals ) {
		advanceTfGoalPoints(goal);
	}
}

	// TfActions
scene.prototype.provideTfActorsWithActions = function() {
	for ( var goal of this.tfGoals ) {
		var keyword = goal + "Actions";
		var newActions = setup[keyword];
		charactersLearnSceneActions(this.tfActors,newActions);
	}
}
scene.prototype.tfActorsForgetActions = function() {
	for ( var goal of this.tfGoals ) {
		var keyword = goal + "Actions";
		var oldActions = setup[keyword];
		charactersForgetSceneActions(this.tfActors,oldActions);
	}
}

	// Tf Scene General Logic
window.isTfSceneFinished = function() {
	var flagFinished = false;
	var allGoalsFinished = true;
	for ( var goalPoints of State.variables.sc.tfGoalsPoints ) {
		if ( goalPoints > 0 ) { allGoalsFinished = false; }
	}
	var allCharsSatisfied = true;
	for ( var cK of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( getBarPercentage(cK,"lust") <= 0.8 && gC(cK).getAllSceneOrgasms() < 1 ) {
			allCharsSatisfied = false;
		}
	}
	if ( allGoalsFinished == true && allCharsSatisfied == true ) { flagFinished = true; }
	return flagFinished;
}

window.tfStandardEndScript = function() {
	State.variables.sc.cleanContinuedActions();
	State.variables.sc.cleanAllPositions();
	var tfAs = createFinishedTransformationAs(State.variables.sc.tfDays,State.variables.sc.tfGoals);
	if ( tfAs.tfTypes.length > 0 ) {
		applyAlteredState([State.variables.sc.tfTarget],tfAs);
	}
	
	var allChars = State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys);
	for ( var cK of allChars ) {
		if ( gC(cK).orgasmSceneCounter > 0 || gC(cK).mindblowingOrgasmSC > 0 || State.variables.sc.sceneType == "bs" ) {
			gC(cK).lust.restore();
		}
	}
	
	// Results message
	State.variables.compass.sceneResultsPassage = "[[Continue|Map]]\n\n"
			 + "The transformations on " + gC(State.variables.sc.tfTarget).getFormattedName() + " have been completed.";
	State.variables.sc.cleanTfSceneData();
}
window.tfGleamingCavernsEndScript = function() {
	tfStandardEndScript();
	if ( State.variables.morphMerit == undefined ) {
		State.variables.morphMerit = 10;
	} else {
		State.variables.morphMerit -= 1;
		if ( State.variables.morphMerit <= 5 ) { State.variables.morphMerit -= 2; }
	}
	gC("chPlayerCharacter").ssRsp += State.variables.morphMerit;
	// Finish transformations early
	var effectiveRemoval = gC("chPlayerCharacter").removeSpecificState("Tfmd");
	// Complete interlude message
	if ( effectiveRemoval ) {
		State.variables.compass.sceneResultsPassage += "\n\nThe magic was weak, and the effects soon dispel.";
	}
	State.variables.compass.sceneResultsPassage += "\n\nDue to the help provided to " + gC("chMes").getFormattedName() + ", " + gC("chPlayerCharacter").getFormattedName() + " gains " + State.variables.morphMerit + " respect in the Shapeshifter tribe.";
}

	// Others
scene.prototype.tfProgressDescription = function() {
	var desc = "__Transformation progress__:\n";
	var i = 0;
	for ( var goal of this.tfGoals ) {
		desc += getTfGoalName(goal) + ": ";
		if ( this.tfGoalsPoints[i] >= 0 ) {
			desc += (100 - (this.tfGoalsPoints[i] * 100 / this.tfPoints)).toFixed(0) + "%"
		} else {
			desc += "100% Complete";
		}
		desc += "\n";
		i++;
	}
	var frustratedChars = [];
	for ( var cK of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( getBarPercentage(cK,"lust") <= 0.8 && gC(cK).getAllSceneOrgasms() < 1 ) {
			frustratedChars.push(cK);
		}
	}
	if ( frustratedChars.length > 1 ) {
		desc += "" + getCharNames(frustratedChars) + " are still " + randomFromList(["horny","aroused","excited"]) + " and need to reach orgasm.";
	} else if ( frustratedChars.length > 0 ) {
		desc += "" + getCharNames(frustratedChars) + " is still " + randomFromList(["horny","aroused","excited"]) + " and needs to reach orgasm.";		
	}
	return desc;
}
window.getTfGoalName = function(goalKey) {
	var name = "";
	switch(goalKey) {
		case "addDick":
			name = "Create dick";
			break;
		case "addPussy":
			name = "Create pussy";
			break;
		case "removeDick":
			name = "Bury dick";
			break;
		case "removePussy":
			name = "Enfold pussy";
			break;
		case "addBreasts":
			if ( State.variables.sc.genderChange == "feminize" ) { name = "Create breasts"; }
			else if ( gC(State.variables.sc.tfTarget).perPr == "she" ) { name = "Rebuild breasts"; }
			else { name = "Rebuild chest"; }
			break;
		case "removeBreasts":
			if ( State.variables.sc.genderChange == "masculinize" ) { name = "Flatten chest"; }
			else if ( gC(State.variables.sc.tfTarget).perPr == "she" ) { name = "Rebuild breasts"; }
			else { name = "Rebuild chest"; }
			break;
		case "rebuildFace":
			name = "Chisel face";
			break;
		case "rebuildFigure":
			name = "Rebuild figure";
			break;
	}
	return name;
}
	
window.debugTfSceneData = function() {
	State.variables.XXXLOGWHATEVERGOESHERE.push("Turn: ",State.variables.sc.currentTurn," Data: ",State.variables.sc.tfActors,State.variables.sc.tfTarget,State.variables.sc.tfGoals,State.variables.sc.tfGoalsPoints);
}

	// TfGoalsEffects Data
scene.prototype.applyTransformationSceneEffects = function() {
	for ( var tfGoal of this.tfGoals ) {
		applyTfGoalPerStringToTfTarget(tfGoal);
	}
}
window.applyTfGoalPerStringToTfTarget = function(tfGoal) {
	switch ( tfGoal ) {
			case "addDick":
				tfAddDick(State.variables.sc.tfTarget);
				break;
			case "addPussy":
				tfAddPussy(State.variables.sc.tfTarget);
				break;
			case "removeDick":
				tfRemoveDick(State.variables.sc.tfTarget);
				break;
			case "removePussy":
				tfRemovePussy(State.variables.sc.tfTarget);
				break;
			case "addBreasts":
				tfAddBreasts(State.variables.sc.tfTarget);
				break;
			case "removeBreasts":
				tfRemoveBreasts(State.variables.sc.tfTarget);
				break;
			case "rebuildFace":
				tfRebuildFace(State.variables.sc.tfTarget);
				break;
			case "rebuildFigure":
				tfRebuildFigure(State.variables.sc.tfTarget);
				break;
		}
}

window.tfAddDick = function(target) {
	gC(target).addBodypart("dick","dick");
}
window.tfAddPussy = function(target) {
	gC(target).addBodypart("pussy","pussy");
}
window.tfRemoveDick = function(target) {
	// Asumes dick isn't locked
	gC(target).removeBodypart("dick");
}
window.tfRemovePussy = function(target) {
	// Assumes pussy isn't locked
	gC(target).removeBodypart("pussy");
}
window.tfAddBreasts = function(target) {
}
window.tfRemoveBreasts = function(target) {
}
window.tfRebuildFace = function(target) {
	// Gender
	if ( State.variables.sc.genderChange == "feminize" ) {
		gC(target).oldPronoun = gC(target).perPr;
		gC(target).assignFemeninePronouns();
	} else if ( State.variables.sc.genderChange == "masculinize" ) {
		gC(target).oldPronoun = gC(target).perPr;
		gC(target).assignMasculinePronouns();
	} else {
		
	}
	// Avatar
	if ( State.variables.sc.newAvatarFileName != undefined ) {
		if ( gC(target).avatar == null ) {
			gC(target).avatar = function() { return "[img[" + this.avatarL + "]]"; }
		}
		if ( gC(target).fullPortrait == null ) {
			gC(target).fullPortrait = function() { return "[img[" + this.fullPortraitL + "]]"; }
		}
		gC(target).originalPortrait = gC(target).fullPortraitL;
		gC(target).originalAvatar = gC(target).avatarL;
		gC(target).avatarL = State.variables.sc.newAvatarFileName;
		gC(target).fullPortraitL = State.variables.sc.newPortraitFileName;
		gC(target).avatar = function() { return "[img[" + this.avatarL + "]]"; }
		gC(target).fullPortrait = function() { return "[img[" + this.fullPortraitL + "]]"; }
	}
}
window.tfRebuildFigure = function(target) {
}

	// Finished transformation effects

	// "addDick","addPussy","removeDick","removePussy","addBreasts","removeBreasts","rebuildFace","rebuildFigure"
window.tfASendEffects = function(cK,as) { // This function is called by the "Transformed" altered state, and calls the appropriate tfFinish functions,
									   // depending on the data of the AS object
	for ( var tfType of as.tfTypes ) {
		switch (tfType) {
			case "addDick":
				tfFinishAddDick(cK);
				break;
			case "addPussy":
				tfFinishAddPussy(cK);
				break;
			case "removeDick":
				tfFinishRemoveDick(cK);
				break;
			case "removePussy":
				tfFinishRemovePussy(cK);
				break;
			case "rebuildFigure":
				tfFinishRebuildFigure(cK);
				break;
			case "changedGender":
				tfFinishChangedGender(cK);
				break;
		}
	}
}
window.tfFinishAddDick = function(cK) {
	if ( gC(cK).body.hasOwnProperty("dick") ) {
		if ( gC(cK).body.dick.state == "locked" ) {
			unequipObject(gC(cK).body.dick.bondage);
		}
		gC(cK).removeBodypart("dick");
	}
}
window.tfFinishAddPussy = function(cK) {
	if ( gC(cK).body.hasOwnProperty("pussy") ) {
		if ( gC(cK).body.pussy.state == "locked" ) {
			unequipObject(gC(cK).body.pussy.bondage);
		}
		gC(cK).removeBodypart("pussy");
	}
}
window.tfFinishRemoveDick = function(cK) {
	gC(cK).addBodypart("dick","dick");
}
window.tfFinishRemovePussy = function(cK) {
	gC(cK).addBodypart("pussy","pussy");
}
window.tfFinishRebuildFigure = function(cK) {
	gC(cK).avatarL = gC(cK).originalAvatar;
	gC(cK).fullPortraitL = gC(cK).originalPortrait;
	if ( gC(cK).avatarL == null ) {
		gC(cK).avatar = null;
	} else {
		gC(cK).avatar = function() { return "[img[" + gC(cK).avatarL + "]]"; }
	}
	if ( gC(cK).fullPortraitL == null ) {
		gC(cK).fullPortrait = null;
	} else {
		gC(cK).fullPortrait = function() { return "[img[" + gC(cK).fullPortraitL + "]]"; }
	}
	delete gC(cK).originalAvatar;
	delete gC(cK).originalPortrait;
}
window.tfFinishChangedGender = function(cK) {
	if ( gC(cK).oldPronoun == "she" ) {
		gC(cK).assignFemeninePronouns();
		delete gC(cK).oldPronoun;
	} else if ( gC(cK).oldPronoun == "he" ) {
		gC(cK).assignMasculinePronouns();
		delete gC(cK).oldPronoun;		
	}
}

// Menus

window.setupTfMenu = function(tfTarget,tfMainActor,menuPassage) {
	State.variables.tfGoals = [];
	State.variables.tfTemporary = true;
	State.variables.tfTarget = tfTarget;
	State.variables.tfMainActor = tfMainActor;
	State.variables.tfMenuString = "";
	State.variables.tfAvatar = "";
	State.variables.tfAvatarMenuString = "";
	State.variables.tfMenuPassage = menuPassage;
	updateSelectedTransformationsText(tfTarget,tfMainActor,menuPassage);
}
window.updateSelectedTransformationsText = function(tfTarget,tfMainActor,menuPassage) {
	var tfmString = "";
	// Selected Options
	if ( State.variables.tfGoals.length > 0 ) {
		tfmString = "__Selected options:__\n"
		for ( var tfG of State.variables.tfGoals ) {
			var tfgNd = getTfGoalNameDescription(tfG);
			tfmString += "- " + tfgNd[0] + hoverText("^^(?)^^",tfgNd[1]) + " " + getButtonRemoveTfGoal(tfG,menuPassage) + "\n"; // Goal, name, desc, cancel
		}
		tfmString += "\n";
	}
	var nonSelectedTfOptions = [];
	for ( var tfG of setup.tfOptions ) {
		if ( State.variables.tfGoals.includes(tfG) == false ) {
			nonSelectedTfOptions.push(tfG);
		}
	}
	if ( nonSelectedTfOptions.length > 0 ) {
		tfmString += "__Transformation choices__:\n";
		for ( var tfG of nonSelectedTfOptions ) {
			var tfGnd = getTfGoalNameDescription(tfG);
			if ( isTfGoalAllowedAndDesc(tfG,tfTarget)[0] == true ) { // Allowed
				tfmString += "- " + tfGnd[0] + hoverText("^^(?)^^",tfGnd[1]) + " " + getButtonSelectTfGoal(tfG,menuPassage) + "\n";
			} else { // Disallowed
				tfmString += colorText("- Locked: " + tfGnd[0] + hoverText("^^(?)^^",isTfGoalAllowedAndDesc(tfG,tfTarget)[1]),"red") + "\n";
			}
		}
		tfmString += "\n";
	}
	// Change temporary option
	tfmString += "Temporary: " + firstToCap("" + State.variables.tfTemporary) + hoverText("^^(?)^^","When set to false, some transformation effects will be permanent.") + " " + getButtonTemporaryTfChange(menuPassage) + "\n\n";
	
	// Init scene, cancel scene
	tfmString += getButtonAdvanceTfMenu();
	
	State.variables.tfMenuString = tfmString;
}
window.updateAvatarMenuString = function(menuPassage) {
	State.variables.tfAvatarMenuString = "[[Back to previous menu|" + State.variables.tfMenuPassage + "]]\n\n"
									   + "__Select the new avatar:__\n\n";
									   
	if ( State.variables.tfGoals.includes("masculinize") || ( State.variables.tfGoals.includes("changeForm") && gC(State.variables.tfTarget).perPr == "he" ) ) { // Masculine avatar
		State.variables.tfAvatarMenuString += '<label><<radiobutton "$StVars.check1" "custom-male-1" checked>> [img[img/portraits/custom-male-1-avatar.png]] </label>\n'
						+ '<label><<radiobutton "$StVars.check1" "custom-male-2">> [img[img/portraits/custom-male-2-avatar.png]] </label>\n'
						+ "\n";
	} else { // Femenine avatar
		State.variables.tfAvatarMenuString += '<label><<radiobutton "$StVars.check1" "mc1" checked>> [img[img/portraits/mc1-avatar.png]] </label>\n'
						+ '<label><<radiobutton "$StVars.check1" "mc2">> [img[img/portraits/mc2-avatar.png]] </label>\n'
						+ '<label><<radiobutton "$StVars.check1" "mc3">> [img[img/portraits/mc3-avatar.png]] </label>\n'
						+ '<label><<radiobutton "$StVars.check1" "custom">> [img[img/portraits/custom-avatar.png]] </label>\n'
						+ "\n";		
	}
	State.variables.tfAvatarMenuString += "<<l" + "ink [[Continue to transformation scene|Scene]]>><<s" + "cript>>createTfSceneWithSettings();<</s" + "cript>><</l" + "ink>>"; // Initiate transformation scene, set avatar target to check1
}

window.getButtonRemoveTfGoal = function(tfGoal,menuPassage) {
	var bText = "<<l" + "ink [[Cancel|" + menuPassage + "]]>><<s" + "cript>>" + "State.variables.tfGoals = arrayMinusA(State.variables.tfGoals,'" + tfGoal + "');<</s" + "cript>><</l" + "ink>>";
	return bText;
}
window.getButtonSelectTfGoal = function(tfGoal,menuPassage) {
	var bText = "<<l" + "ink [[Select|" + menuPassage + "]]>><<s" + "cript>>" + "State.variables.tfGoals.push('" + tfGoal + "');<</s" + "cript>><</l" + "ink>>";
	return bText;
}
window.getButtonTemporaryTfChange = function(menuPassage) {
	var bText = "<<l" + "ink [[Change|" + menuPassage + "]]>><<s" + "cript>>changeTemporaryTfFlag();<</s" + "cript>><</link>>";
	return bText;
}
window.cleanTfMenu = function() {
	delete State.variables.tfGoals;
	delete State.variables.tfTemporary;
	delete State.variables.tfTarget;
	delete State.variables.tfMainActor;
	delete State.variables.tfMenuString;
	delete State.variables.tfAvatar;
	delete State.variables.tfMenuPassage;
	delete State.variables.tfAvatarMenuString;
}

window.isTfGoalAllowedAndDesc = function(tfGoal,tfTarget) {
	var isAllowed = false;
	var desc = "";
	switch(tfGoal) {
		case "addDick":
			if ( gC(tfTarget).body.hasOwnProperty("dick") == false ) {
				isAllowed = true;
			} else {
				desc = "The character already has a dick.";
			}
			break;
		case "removeDick":
			if ( doesCharHaveState(tfTarget,"UnBp") ) {
				desc = "The character must not have temporarily unlocked genitals.";
			} else if ( gC(tfTarget).body.hasOwnProperty("dick") == true ) {
				if ( gC(tfTarget).body.dick.state == "free" ) {
					isAllowed = true;
				} else {
					desc = "The character does not have a free dick.";
				}
			} else {
				desc = "The character does not have a free dick.";
			}
			break;
		case "addPussy":
			if ( gC(tfTarget).body.hasOwnProperty("pussy") == false ) {
				isAllowed = true;
			} else {
				desc = "The character already has a pussy.";
			}
			break;
		case "removePussy":
			if ( doesCharHaveState(tfTarget,"UnBp") ) {
				desc = "The character must not have temporarily unlocked genitals.";
			} else if ( gC(tfTarget).body.hasOwnProperty("pussy") == true ) {
				if ( gC(tfTarget).body.pussy.state == "free" ) {
					isAllowed = true;
				} else {
					desc = "The character does not have a free pussy.";
				}
			} else {
				desc = "The character does not have a free pussy.";
			}
			break;
		case "changeForm":
			if ( tfTarget == "chPlayerCharacter" && isAnyBodyChangeTransformationSelected() == false ) {
				isAllowed = true;
			} else {
				desc = "This option is only available for " + gC("chPlayerCharacter").name + " when no other body transformation is selected.";
			}
			break;
		case "masculinize":
			if ( tfTarget == "chPlayerCharacter" && gC("chPlayerCharacter").perPr != "he" && isAnyBodyChangeTransformationSelected() == false ) {
				isAllowed = true;
			} else {
				desc = "This option is only avaiable for " + gC("chPlayerCharacter").name + " when " + gC("chPlayerCharacter").posPr + " gender is not male and no other body transformation is selected.";
			}
			break;
		case "feminize":
			if ( tfTarget == "chPlayerCharacter" && gC("chPlayerCharacter").perPr != "she" && isAnyBodyChangeTransformationSelected() == false ) {
				isAllowed = true;
			} else {
				desc = "This option is only avaiable for " + gC("chPlayerCharacter").name + " when " + gC("chPlayerCharacter").posPr + " gender is not female and no other full body transformation is selected.";
			}
			break;
	}
	return [isAllowed,desc];
}
window.getTfGoalNameDescription = function(tfGoal) {
	var name = "tfGoalName";
	var desc = "tfGoalDesc";
	switch(tfGoal) {
		case "addDick":
			name = "Add dick";
			desc = "The character will gain a dick bodypart.";
			break;
		case "removeDick":
			name = "Remove dick";
			desc = "The character will lose their dick bodypart.";
			break;
		case "addPussy":
			name = "Add pussy";
			desc = "The character will gain a pussy bodypart.";
			break;
		case "removePussy":
			name = "Remove pussy";
			desc = "The character will lose their pussy bodypart.";
			break;
		case "changeForm":
			name = "Change form";
			desc = "The character will receive a new appearance.";
			break;
		case "masculinize":
			name = "Masculinize";
			desc = "The character will receive a male appearance, and will be treated as male.";
			break;
		case "feminize":
			name = "Feminize";
			desc = "The character will receive a feminine appearance, and will be treated as female.";
			break;
	}
	return [name,desc];
}
window.isAnyBodyChangeTransformationSelected = function() {
	if ( State.variables.tfGoals.includes("feminize") || State.variables.tfGoals.includes("masculinize") || State.variables.tfGoals.includes("changeForm") ) {
		return true;
	} else {
		return false;
	}
}
window.willTfTargetBeLeftWithGenitals = function() {
	var finalGenitals = [];
	if ( gC(State.variables.tfTarget).body.hasOwnProperty("dick") ) { finalGenitals.push("dick"); }
	if ( gC(State.variables.tfTarget).body.hasOwnProperty("pussy") ) { finalGenitals.push("pussy"); }
	if ( State.variables.tfGoals.includes("addDick") ) { finalGenitals.push("dick"); }
	if ( State.variables.tfGoals.includes("addPussy") ) { finalGenitals.push("pussy"); }
	if ( State.variables.tfGoals.includes("removeDick") ) { finalGenitals = arrayMinusA(finalGenitals,"dick"); }
	if ( State.variables.tfGoals.includes("removePussy") ) { finalGenitals = arrayMinusA(finalGenitals,"pussy"); }
	var flag = false;
	if ( finalGenitals.length > 0 ) { flag = true; }
	return flag;
}
window.changeTemporaryTfFlag = function() {
	if ( State.variables.tfTemporary ) {
		State.variables.tfTemporary = false;
	} else {
		State.variables.tfTemporary = true;
	}
}

window.getButtonAdvanceTfMenu = function(menuPassage) {
	if ( State.variables.tfGoals.length >= 1 ) {
		var flagSelectAvatar = false;
		if ( State.variables.tfTarget == "chPlayerCharacter" && State.variables.tfGoals.includes("changeForm") || State.variables.tfGoals.includes("masculinize") || State.variables.tfGoals.includes("feminize") ) {
			flagSelectAvatar = true;
		}
		if ( flagSelectAvatar ) { // Select avatar menu
			var bText = "<<l" + "ink [[Continue to select new form|TF Select Avatar]]>><<s" + "cript>>updateAvatarMenuString('" + menuPassage + "');<</s" + "cript>><</l" + "ink>>";
		} else { // Init Transformation scene
			var bText = "<<l" + "ink [[Continue to transformation scene|Scene]]>><<s" + "cript>>createTfSceneWithSettings();<</s" + "cript>><</l" + "ink>>";
		}
	} else {
		var bText = colorText("Locked: Cannot proceed without at least one transformation option.","red");
	}
	return bText;
}

window.createTfSceneWithSettings = function() {
	var teamAchars = [];
	var teamBchars = [];
	// Set team A and B
	if ( getCharGroup(State.variables.tfTarget).includes(State.variables.tfMainActor) ) {
		// Split group
		teamAchars = arrayMinusA(getCharGroup(State.variables.tfTarget),State.variables.tfMainActor);
		teamBchars = [State.variables.tfMainActor];
	} else {
		// Two groups
		teamAchars = getCharGroup(State.variables.tfTarget);
		teamBchars = getCharGroup(State.variables.tfMainActor);
	}
		// Fix groups if PC in team B
	if ( teamBchars.includes("chPlayerCharacter") ) {
		var tempTeam = teamAchars;
		teamAchars = teamBchars;
		teamBchars = tempTeam;
	}
	// End scene passage
	var endScenePassage = "";
	if ( State.variables.tfMenuPassage == "FASE MorphHut MorphMenu" ) {
		if ( isStVarOn("mphFnTf") == false ) {
			endScenePassage = "FASE MorphHut FirstTransformed";
			State.variables.sc.endSceneScript = tfStandardEndScript;
		} else {
			// Temporary
			endScenePassage = "Scene Results";
			State.variables.sc.endSceneScript = tfGleamingCavernsEndScript;
		}
	} else {
		endScenePassage = "Scene Results";
		State.variables.sc.endSceneScript = tfStandardEndScript;
	}
	// Goals
	var tfGoals = getTfGoalsFromTfOptions();
	// tfActors
	var tfActors = [];
	for ( var cK of teamAchars.concat(teamBchars) ) {
		if ( getValidTfActors().includes(cK) ) {
			tfActors.push(cK);
		}
	}
	// Gender change
	var genderChange = "none";
	if ( State.variables.tfGoals.includes("masculinize") ) { genderChange = "masculinize"; }
	else if ( State.variables.tfGoals.includes("feminize") ) { genderChange = "feminize"; }
	// New avatar file names
	var avatarFileName = "";
	var portraitFileName = "";
	if ( State.variables.tfGoals.includes("masculinize") || State.variables.tfGoals.includes("feminize") || State.variables.tfGoals.includes("changeForm") ) {
		avatarFileName = "img/portraits/" + State.variables.StVars.check1 + "-avatar.png";
		portraitFileName = "img/portraits/" + State.variables.StVars.check1 + "-full.png";
	}
	// Description
	var description = "";
	// getCurrentRoomInfo().description
	/* //
	State.variables.compass.ongoingEvents.push(createSystemEventCheapWaitNoDesc(5,["chPlayerCharacter"]));
	State.variables.compass.sortOnGoingEventsByTime();
	State.variables.compass.pushAllTimeToAdvance();
	State.variables.sc.startTfScene("ss","dynamic",teamAchars,teamBchars,description,isTfSceneFinished,1,endScenePassage,
		tfGoals,tfActors,State.variables.tfTarget,4,!State.variables.tfTemporary,7,genderChange,avatarFileName,portraitFileName);
	if ( State.variables.tfMenuPassage == "FASE MorphHut MorphMenu" ) {
		State.variables.sc.endSceneScript = tfGleamingCavernsEndScript;
	} else {
		State.variables.sc.endSceneScript = tfStandardEndScript;
	}
	// AIs
	for ( var cK of teamAchars.concat(teamBchars) ) {
		if ( cK != "chPlayerCharacter" ) {
			gC(cK).aiAlgorythm = createAiWeightedMissionsByTaste();
		}
	}
	// Format scene screen
	State.variables.sc.formatScenePassage();
	*/
	//var tfMenuPassage = State.variables.tfMenuPassage;
	State.variables.compass.ongoingEvents.push(createSystemEventStandardTransformationScene(teamAchars,teamBchars,description,isTfSceneFinished,endScenePassage,
		tfGoals,tfActors,State.variables.tfTarget,!State.variables.tfTemporary,genderChange,avatarFileName,portraitFileName,State.variables.tfMenuPassage));
	State.variables.compass.sortOnGoingEventsByTime();
	State.variables.compass.pushAllTimeToAdvance();
	// Clean tf variables
	cleanTfMenu();
}
window.getTfGoalsFromTfOptions = function() {
	var tfGoals = [];
	for ( var tfOption of State.variables.tfGoals ) {
		if ( ["addDick","addPussy","removeDick","removePussy"].includes(tfOption) ) {
			tfGoals.push(tfOption);
		} else {
			switch(tfOption) {
				case "changeForm":
					tfGoals.push("rebuildFace","rebuildFigure");
					if ( gC(State.variables.tfTarget).perPr == "she" ) {
						tfGoals.push("addBreasts");
					}
					break;
				case "masculinize":
					tfGoals.push("rebuildFace","rebuildFigure","removeBreasts");
					break;
				case "feminize":
					tfGoals.push("rebuildFace","rebuildFigure","addBreasts");
					break;
			}
		}
	}
	return tfGoals;
}

window.getValidTfActors = function() {
	var transformators = ["chMes"];
	return transformators;
}

// AI Transformation Logic

// Sets of genitals are variables list: [] , ["dick"] , ["pussy"] , ["dick","pussy"]

	// Basic functions
window.getCharsGenitalsList = function(cK) {
	var genitals = [];
	for ( var g of ["dick","pussy"] ) {
		if ( gC(cK).body.hasOwnProperty(g) ) {
			genitals.push(g);
		}
	}
	return genitals;
}
window.getCharsFreeGenitalsList = function(cK) {
	var freeGenitals = [];
	for ( var g of ["dick","pussy"] ) {
		if ( gC(cK).body.hasOwnProperty(g) ) {
			if ( gC(cK).body[g].state == "free" ) {
				freeGenitals.push(g);
			}
		}
	}
	return freeGenitals;
}
window.getRequiredTfGoalsForGenitalsGoalsToTarget = function(originalGenitals,targetGenitals) {
	var tfGoals = [];
	if ( originalGenitals.includes("pussy") ) {
		if ( targetGenitals.includes("pussy") == false ) {
			tfGoals.push("removePussy");
		}
	} else {
		if ( targetGenitals.includes("pussy") ) {
			tfGoals.push("addPussy");
		}
	}
	if ( originalGenitals.includes("dick") ) {
		if ( targetGenitals.includes("dick") == false ) {
			tfGoals.push("removeDick");
		}
	} else {
		if ( targetGenitals.includes("dick") ) {
			tfGoals.push("addDick");
		}
	}
}
window.isPotentialGenitalTransformationAllowedOnChar = function(tfGoals,cK) {
	var flagAllowed = true;
	if ( tfGoals.includes("removeDick") ) {
		if ( gC(cK).body.hasOwnProperty("dick") ) {
			if ( gC(cK).body.dick.state != "free" ) {
				flagAllowed = false;
			}
		} else {
			flagAllowed = false;
		}
	}
	if ( tfGoals.includes("removePussy") ) {
		if ( gC(cK).body.hasOwnProperty("pussy") ) {
			if ( gC(cK).body.pussy.state != "free" ) {
				flagAllowed = false;
			}
		} else {
			flagAllowed = false;
		}
	}
	if ( tfGoals.includes("addPussy") ) {
		if ( gC(cK).body.hasOwnProperty("pussy") ) {
			flagAllowed = false;
		}
	}
	if ( tfGoals.includes("addDick") ) {
		if ( gC(cK).body.hasOwnProperty("dick") ) {
			flagAllowed = false;
		}
	}
	return flagAllowed;
}

window.getRandomGenitalsSet = function() {
	var genitalCombinations = [["pussy"],["dick"],["pussy","dick"]];
	return randomFromList(genitalCombinations);
}

window.discardInvalidTfGoalsOnChar = function(tfGoals,cK) {
	var finalTfGoals = [];
	for ( var tfGoal of tfGoals ) {
		switch(tfGoal) {
			case ("addDick"):
				if ( gC(cK).body.hasOwnProperty("dick") == false ) { finalTfGoals.push(tfGoal); }
				break;
			case ("addPussy"):
				if ( gC(cK).body.hasOwnProperty("pussy") == false ) { finalTfGoals.push(tfGoal); }
				break;
			case ("removePussy"):
				if ( gC(cK).body.hasOwnProperty("pussy") && (doesCharHaveState(cK,"UnBp") == false) ) {
					if ( gC(cK).body.pussy.state == "free" ) {
						finalTfGoals.push(tfGoal);
					}
				}
				break;
			case ("removeDick"):
				if ( gC(cK).body.hasOwnProperty("dick") && (doesCharHaveState(cK,"UnBp") == false) ) {
					if ( gC(cK).body.dick.state == "free" ) {
						finalTfGoals.push(tfGoal);
					}
				}
				break;
		}
	}
	return finalTfGoals
}
window.doTfGoalsLeaveCharWithoutGenitals = function(tfGoals,cK) {
	var result = false;
	if ( tfGoals.includes("removePussy") && tfGoals.includes("addDick") == false ) {
		if ( tfGoals.includes("removeDick") || gC(cK).body.hasOwnProperty("dick") == false ) {
			result = true;
		}
	}
	if ( tfGoals.includes("removeDick") && tfGoals.includes("addPussy") == false ) {
		if ( tfGoals.includes("removePussy") || gC(cK).body.hasOwnProperty("pussy") == false ) {
			result = true;
		}
	}
	return result;
}
window.isTfGoalsSetValid = function(tfGoals,cK) {
	var result = true;
	if ( (isPotentialGenitalTransformationAllowedOnChar(tfGoals,cK) == false) || doTfGoalsLeaveCharWithoutGenitals(tfGoals,cK) ) {
		result = false;
	}
	return result;
}

window.chooseRandomTransformationOnChar = function(npc) {
	var potentialTfGoals = [["addDick"],["removeDick"],["removePussy"],["addPussy"],["addDick","addPussy"],["addDick","removePussy"],["removeDick","addPussy"]];
	var validTfGoals = [];
	for ( var tfGoalsSet of potentialTfGoals ) {
		if ( isTfGoalsSetValid(tfGoalsSet,npc) ) {
			validTfGoals.push(tfGoalsSet);
		}
	}
	var chosenSet = randomFromList(validTfGoals);
	return chosenSet;
}

	// TFs on self
window.npcDecidesTransformationsOnSelf = function(npc) {
	var tfGoals = [];
	switch ( gSettings().tfSelf ) {
		case(tfSetSelf.gainPussy):
			tfGoals = ["addPussy"];
			break;
		case(tfSetSelf.gainDick):
			tfGoals = ["addDick"];
			break;
		case(tfSetSelf.losePussy):
			tfGoals = ["removePussy"];
			break;
		case(tfSetSelf.loseDick):
			tfGoals = ["removeDick"];
			break;
		case(tfSetSelf.getOriginalGenitals):
			if ( isCharFemale(npc) ) {
				tfGoals = ["removeDick","addPussy"];
			} else if ( isCharMale(npc) ) {
				tfGoals = ["removePussy","addDick"];
			}
			break;
		case(tfSetSelf.femalesGainDick):
			if ( isCharFemale(npc) ) {
				tfGoals = ["addDick"];
			}
			break;
		case(tfSetSelf.malesGainPussy):
			if ( isCharMale(npc) ) {
				tfGoals = ["addPussy"];
			}
			break;
		case(tfSetSelf.allGainAllGenitals):
			tfGoals = ["addPussy","addDick"];
			break;
		case(tfSetSelf.random):
			//var potentialGoals = ["addPussy","addDick","removePussy","removeDick"];
			//potentialGoals = discardInvalidTfGoalsOnChar(potentialGoals,npc);
			//tfGoals = randomListPurgeMinMax(potentialGoals,1,potentialGoals.length);
			tfGoals = chooseRandomTransformationOnChar(npc);
			break;
		
	}
	if ( gSettings().tfSelf != tfSetSelf.random ) {
		tfGoals = discardInvalidTfGoalsOnChar(tfGoals,npc);
		if ( doTfGoalsLeaveCharWithoutGenitals(tfGoals,npc) ) {
			tfGoals = arrayMinusA(tfGoals,"removeDick");
			tfGoals = arrayMinusA(tfGoals,"removePussy");
		}
	}
	return tfGoals;
}

	// TFs on target
window.npcDecidesTransformationsOnTarget = function(actor,target) {
	var tfGoals = [];
	switch ( gSettings().tfTarget ) {
		case(tfSetTarget.addPussy):
			tfGoals = ["addPussy"];
			break;
		case(tfSetTarget.addDick):
			tfGoals = ["addDick"];
			break;
		case(tfSetTarget.removePussy):
			tfGoals = ["removePussy"];
			break;
		case(tfSetTarget.removeDick):
			tfGoals = ["removeDick"];
			break;
		case(tfSetTarget.dickOnly):
			tfGoals = ["addDick","removePussy"];
			break;
		case(tfSetTarget.pussyOnly):
			tfGoals = ["addPussy","removeDick"];
			break;
		case(tfSetTarget.hermsLoseDicks):
			if ( getCharsGenitalsList(target).includes("dick") && getCharsGenitalsList(target).includes("pussy") ) {
				tfGoals = ["removeDick"];
			}
			break;
		case(tfSetTarget.femalesLoseFuta):
			if ( isCharFemale(target) ) {
				tfGoals = ["removeDick"];
			}
			break;
		case(tfSetTarget.everyoneGetsAllGenitals):
			tfGoals = ["addDick","addPussy"];
			break;
		case(tfSetTarget.copyOwnGenitals):
			var ownGenitals = getCharsGenitalsList(actor);
			if ( ownGenitals.includes("dick") ) {
				tfGoals.push("addDick");
			} else {
				tfGoals.push("removeDick");
			}
			if ( ownGenitals.includes("pussy") ) {
				tfGoals.push("addPussy");
			} else {
				tfGoals.push("removePussy");
			}
			break;
		case(tfSetTarget.oppositeOwnGenitals):
			var ownGenitals = getCharsGenitalsList(actor);
			if ( ownGenitals.includes("dick") ) {
				tfGoals.push("addPussy");
			} else {
				tfGoals.push("removePussy");
			}
			if ( ownGenitals.includes("pussy") ) {
				tfGoals.push("addDick");
			} else {
				tfGoals.push("removePussy");
			}
			break;
		case(tfSetTarget.originalTargetGenitals):
			if ( isCharFemale(target) ) {
				tfGoals = ["removeDick","addPussy"];
			} else if ( isCharMale(target) ) {
				tfGoals = ["removePussy","addDick"];
			}
			break;
		case(tfSetTarget.opposingTargetGenitals):
			if ( isCharFemale(target) ) {
				tfGoals = ["removePussy","addDick"];
			} else if ( isCharMale(target) ) {
				tfGoals = ["removeDick","addPussy"];
			}
			break;
		case(tfSetTarget.random):
			//var potentialGoals = ["addPussy","addDick","removePussy","removeDick"];
			//potentialGoals = discardInvalidTfGoalsOnChar(potentialGoals,target);
			//tfGoals = randomListPurgeMinMax(potentialGoals,1,potentialGoals.length);
			tfGoals = chooseRandomTransformationOnChar(target);
			break;
	}
	if ( gSettings().tfTarget != tfSetTarget.random ) {
		tfGoals = discardInvalidTfGoalsOnChar(tfGoals,target);
		if ( doTfGoalsLeaveCharWithoutGenitals(tfGoals,target) ) {
			tfGoals = arrayMinusA(tfGoals,"removeDick");
			tfGoals = arrayMinusA(tfGoals,"removePussy");
		}
	}
	return tfGoals;
}

	// Temporary flag
window.doesNpcChooseTemporaryTransformation = function(npc) {
	var result = true;
	switch ( gSettings().tfGeneral ) {
		case tfSetExtra.permanent:
			result = false;
			break;
		case tfSetExtra.random:
			if ( limitedRandomInt(500) > 249 ) {
				result = false;
			}
			break;
	}
	return result;
}

////////// ////////// ////////// //////////

