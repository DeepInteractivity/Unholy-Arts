///// PATCHING FUNCTIONS /////

window.applyRequiredPatches = function() {
	v036Patches();
	v037Patches();
}

window.v036Patches = function() {
	State.variables.sisSpecifics = new SisSpecifics();
}
window.v037Patches = function() {
	if ( State.variables.settings.tfGeneral == undefined ) { State.variables.settings.tfGeneral = tfSetExtra.temporary; }
	if ( State.variables.settings.tfSelf == undefined ) { State.variables.settings.tfSelf = tfSetSelf.random; }
	if ( State.variables.settings.tfTarget == undefined ) { this.tfTarget = tfSetTarget.random; }
}
