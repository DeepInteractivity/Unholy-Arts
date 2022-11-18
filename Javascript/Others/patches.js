///// PATCHING FUNCTIONS /////

window.applyRequiredPatches = function() {
	v036Patches();
	v037Patches();
	v0310Patches();
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
