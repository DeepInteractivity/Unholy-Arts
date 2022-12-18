///// PATCHING FUNCTIONS /////

window.applyRequiredPatches = function() {
	v036Patches();
	v037Patches();
	v0310Patches();
	v0316Patches();
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
