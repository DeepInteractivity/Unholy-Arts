///// PATCHING FUNCTIONS /////

window.applyRequiredPatches = function() {
	genericPatches();
	v043LearnPressDown();
}

window.genericPatches = function() {
	for ( var cKa of getActiveSimulationCharactersArray() ) {
		// Fix erroneous special relationships
		var cKb = gC(cKa).domChar;
		if ( getRelation(cKa,cKb) == null ) {
			gC(cKa).domChar = null;
		} else if ( gRelTypeAb(cKa,cKb) == null ) {
			gC(cKa).domChar = null;
		}
		for ( var cKb of gC(cKa).egaChars.concat(gC(cKa).subChars) ) {
			if ( getRelation(cKa,cKb) == null ) {
				gC(cKa).egaChars = arrayMinusA(gC(cKa).egaChars,cKb);
				gC(cKa).subChars = arrayMinusA(gC(cKa).subChars,cKb);
			} else if ( gRelTypeAb(cKa,cKb) == null ) {
				gC(cKa).egaChars = arrayMinusA(gC(cKa).egaChars,cKb);
				gC(cKa).subChars = arrayMinusA(gC(cKa).subChars,cKb);
			}
		}
	}
}

window.applyRequiredScenePatches = function() {
	v0318ScenePatches();
}

window.v036Patches = function() {
	State.variables.sisSpecifics = new SisSpecifics();
}
window.v037Patches = function() {
	if ( State.variables.settings.tfGeneral == undefined ) { State.variables.settings.tfGeneral = tfSetExtra.temporary; }
	if ( State.variables.settings.tfSelf == undefined ) { State.variables.settings.tfSelf = tfSetSelf.random; }
	if ( State.variables.settings.tfTarget == undefined ) { this.tfTarget = tfSetTarget.random; }
}
window.v0310Patches = function() {
	if ( State.variables.mapGleamingCaverns != undefined ) {
		if ( State.variables.mapGleamingCaverns.rooms.trapRoom == undefined ) {
			State.variables.mapGleamingCaverns.rooms.trapRoom = new Room("trapRoom","Secluded Place");
			State.variables.mapGleamingCaverns.rooms.trapRoom.combatAllowed = false;
		}
	}
	charactersLearnSceneActions(["chPlayerCharacter","chNash","chClaw","chVal","chMir","chAte"],["runAway"]);	
}

window.v0316Patches = function() {
	if ( State.variables.chArt != undefined ) {
		State.variables.chArt.iconL = "img/charIcons/artIcon.png";
		State.variables.chArt.icon = function() {
			return "[img[img/charIcons/artIcon.png]]";
		}
	}
	if ( State.variables.chHope != undefined ) {
		State.variables.chHope.iconL = "img/charIcons/hopeIcon.png";
		State.variables.chHope.icon = function() {
			return "[img[img/charIcons/hopeIcon.png]]";
		}
	}
	if ( State.variables.chRock != undefined ) {
		State.variables.chRock.iconL = "img/charIcons/rockIcon.png";
		State.variables.chRock.icon = function() {
			return "[img[img/charIcons/rockIcon.png]]";
		}
	}
	if ( State.variables.chSil != undefined ) {
		State.variables.chSil.iconL = "img/charIcons/silIcon.png";
		State.variables.chSil.icon = function() {
			return "[img[img/charIcons/silIcon.png]]";
		}
	}
	if ( State.variables.chMes != undefined ) {
		State.variables.chMes.iconL = "img/charIcons/mesIcon.png";
		State.variables.chMes.icon = function() {
			return "[img[img/charIcons/mesIcon.png]]";
		}
	}
	if ( State.variables.chNer != undefined ) {
		State.variables.chNer.iconL = "img/charIcons/nerIcon.png";
		State.variables.chNer.icon = function() {
			return "[img[img/charIcons/nerIcon.png]]";
		}
	}
}

window.v0318GeneralPatches = function() {
	for ( var cK of getActiveSimulationCharactersArray() ) {
		if ( gC(cK).combatAffinities.hasOwnProperty("affection") == false ) {
			gC(cK).combatAffinities.affection = new flavorAffinity("affection");
		}
		if ( gC(cK).combatAffinities.hasOwnProperty("rivalry") == false ) {
			gC(cK).combatAffinities.affection = new flavorAffinity("rivalry");
		}
	}
}
window.v0318ScenePatches = function() {
	for ( var cK of State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys) ) {
		if ( gC(cK).combatAffinities.hasOwnProperty("affection") == false ) {
			gC(cK).combatAffinities.affection = new flavorAffinity("affection");
		}
		if ( gC(cK).combatAffinities.hasOwnProperty("rivalry") == false ) {
			gC(cK).combatAffinities.affection = new flavorAffinity("rivalry");
		}
	}
}

window.v0323GeneralPatches = function() {
	charactersLearnSceneActions(["chPlayerCharacter","chNash","chClaw","chVal","chMir","chAte"],["encInit"]);
	charactersLearnSceneActions(getGuestsList(),["encInit"]);
}

window.v0325GeneralPatches = function() {
	State.variables.eventsCalendar.setFinishEventButton("Continue","setNoPasChars()");
	if ( State.variables.storyState == undefined ) {
		State.variables.storyState = storyState.firstLoop;
	}
	if ( State.variables.compass.hasOwnProperty("debugFinishedEventInfo") ) {
		delete State.variables.compass.debugFinishedEventInfo;
	}
}


window.v041FixClawsAngerButton = function() {
	gC("chClaw").baseMood.angry = 0;
}

window.v043FixNPCsGenders = function() {
	for ( var cK of ["chSet","chNim"] ) {
		if ( getActiveSimulationCharactersArray().includes(cK) ) {
			gC(cK).assignFemeninePronouns();
		}
	}
}

window.v043LearnPressDown = function() {
	charactersLearnSceneActions(getActiveSimulationCharactersArray(),["baPressDown"]);
}

