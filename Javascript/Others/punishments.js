// PUNISHMENTS //

// Create punishments bondage
window.createStartingPunishmentBondage = function() {
	var validItems = [equipmentType.COLLAR,equipmentType.BLINDFOLD,equipmentType.MOUTHGAG,equipmentType.HANDCUFFS,equipmentType.FEETCUFFS,equipmentType.NIPPLESUCKERS,equipmentType.BUTTPLUG];
	if ( gSettings().chastity == "enable" ) {
		validItems.push(equipmentType.CHASTITYBELT);
		if ( gSettings().futa != "disableAll" ) {
			validItems.push(equipmentType.CHASTITYCAGE);
		}
	}
	var i = 18;
	while ( i > 0 ) {
		createEquipment(randomFromList(validItems),"chDummy");
		i--;
	}
}

// Determine punishments
window.countPunishmentBondageOnTarget = function(charKey) {
	var n = 0; // Amount of punishment bondage
	for ( var item of State.variables.equipmentList ) {
		if ( item.equippedOn == charKey && item.owner == "chDummy" ) {
			n++;
		}
	}
	return n;
}
window.countRequiredPunishmentsOnTarget = function(charKey) {
	var n = 0; // Required punishments
	if ( gC(charKey).infamy >= gSettings().infamyLimit ) { n++; }
	if ( gC(charKey).infamy >= gSettings().infamyLimit * setup.infamySecondThreshold ) { n++; }
	if ( gC(charKey).infamy >= gSettings().infamyLimit * setup.infamyThirdThreshold ) { n++; }
	return n;
}

// Apply punishments
window.applyPunishmentsToCandidates = function() {
	for ( var charKey of getRandomizedActiveSimulationCharactersArray() ) {
		var reqPunishments = countRequiredPunishmentsOnTarget(charKey);
		if ( reqPunishments > 0 ) {
			if ( reqPunishments > countPunishmentBondageOnTarget(charKey) ) {
				applyPunishmentBondageOnCharacter(charKey);
				//State.variables.logL1.push(charKey + " was punished on day " + State.variables.daycycle.day + ".");
			}
		}
	}
}
window.applyPunishmentBondageOnCharacter = function(charKey) {
	var validPunishments = getItemListEquippableOnChar(charKey,getCharsUnusedBondage("chDummy"));
	if ( gSettings().chastity == "disable" ) {
		validPunishments = purgeChastityItemsFromItemList(validPunishments);
	}
	if ( validPunishments.length > 0 ) {
		var selectedPunishment = randomFromList(validPunishments)
		equipObjectOnWearer(selectedPunishment,charKey,gSettings().equipmentDuration + 1);
		State.variables.personalRoom.prMessages += gC("chDummy").getFormattedName() + " has locked " + getEquipDataById(selectedPunishment).name + " on " + gC(charKey).getFormattedName() + " as a punishment for " + gC(charKey).posPr + " infamous deeds. This will last for " + gSettings().equipmentDuration + " days after tonight.\n";
	}
}

/*
setup.infamySecondThreshold = 1.25;
setup.infamyThirdThreshold = 1.5;

window.Settings = function() { 
	this.debugFunctions = false;
	
	this.infamyLimit = 25;
	
	this.equipmentDuration = 5;
	*/

