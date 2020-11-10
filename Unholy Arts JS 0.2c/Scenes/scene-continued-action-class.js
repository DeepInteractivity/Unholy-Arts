////////// SCENE CONTINUED ACTION CLASS //////////

/* How these work

Continued actions are lingering effects called by common actions.
They take place after common actions, and they add their descriptions to actions descriptions.
They have an initiator, a list of targets, and each of them has a list of involved bodyparts.
Bodyparts' states become "inUse" when continued actions are started, and "free" when they're finished.

*/

// POSITION ACTIONS //

/* How these work

Position actions are continued actions that have the purpose of setting a position between different characters.
A position action may also initiate a continued action effect.

*/

window.continuedAction = function() {
	this.name = "";
	this.key = "";
	this.initiator = ""; // Initiator character key
	this.targetsList = []; // Targetted characters' keys
	this.initiatorBodyparts = []; // Involved bodyparts for the initiator
	this.targetsBodyparts = [] ; // Involved bodyparts for the targets
	
	this.validRelationalPositions = [] ; // List of sets of two positions.
										 // If length > 0 , initiator must have the first position on any set, and targets the second positions
	this.unvalidRelationalPositions = [] ; // Opposite of validRelationalPositions
	
	this.execute = null;
	
	this.occupyBodyparts = function() {
		for ( var bp in this.initiatorBodyparts ) {
			getChar(this.initiator).body[this.initiatorBodyparts[bp]].state = "inUse";
		}
		for ( var bp in this.targetsBodyparts ) {
			for ( var tg in this.targetsList ) {
				getChar(this.targetsList[tg]).body[this.targetsBodyparts[bp]].state = "inUse";
			}
		}
	}
	this.freeBodyparts = function() {
		for ( var bp in this.initiatorBodyparts ) {
			getChar(this.initiator).body[this.initiatorBodyparts[bp]].state = "free";
		}
		for ( var bp in this.targetsBodyparts ) {
			for ( var tg in this.targetsList ) {
				getChar(this.targetsList[tg]).body[this.targetsBodyparts[bp]].state = "free";
			}
		}
	}
}

window.createCaFrenchKiss = function(initiator, targetsList) {
	var ca = new continuedAction();
	ca.name = "French Kissing";
	ca.key = "frenchKissing";
	ca.initiator = initiator;
	ca.targetsList = targetsList;
	ca.initiatorBodyparts = [ "mouth" ];
	ca.targetsBodyparts = [ "mouth" ];
	ca.occupyBodyparts();
	
	ca.unvalidRelationalPositions.push(["standing","kneeling"],["kneeling","standing"]);
	
	ca.execute = function() {
		var results = new saResults;
		
		var lustDamage = ((getChar(this.initiator).agility.getValue() + getChar(this.initiator).perception.getValue() + getChar(this.initiator).empathy.getValue()) / 15);
		getChar(this.initiator).lust.changeValue(-lustDamage/2);
		getChar(this.targetsList[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(initiator) + "'s tongue intertwines with " + ktn(targetsList[0]) + "'s."),
								(ktn(initiator) + " explores " + ktn(targetsList[0]) + "'s mouth with " + gC(initiator).posPr + " tongue."),
								(ktn(initiator) + " and " + ktn(targetsList[0]) + " share their feelings through their lips and tongues.") ] );
		results.description += " " + ktn(targetsList[0]) + " received " + textLustDamage(lustDamage) + ". ";
		results.description += ktn(initiator) + " received " + textLustDamage(lustDamage/2) + ".";
							   
		return results;
	}
	return ca;
}
window.createCaLegHoldHead = function(initiator, targetsList) {
	var ca = new continuedAction();
	ca.name = "Leg-holding Head";
	ca.key = "legHoldingHead";
	ca.initiator = initiator;
	ca.targetsList = targetsList;
	ca.initiatorBodyparts = [ "legs" ];
	ca.targetsBodyparts = [ "mouth" ];
	ca.occupyBodyparts();
	
	ca.validRelationalPositions.push(["standing","kneeling"],["spitroastFront","spitroastTarget"]);
	
	ca.execute = function() {
		var results = new saResults;
		var target = this.targetsList[0];
		
		var lustDamage = ((getChar(this.targetsList[0]).agility.getValue() * 3 + getChar(this.initiator).resilience.getValue() * 2 + getChar(this.initiator).physique.getValue()) / 20);
		getChar(initiator).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(this.initiator) + " is holding " + ktn(target) + " tight between " + gC(this.initiator).posPr
								+ " legs, forcing " + gC(target).comPr + " to lick."),
								(ktn(this.initiator) + " has trapped " + ktn(target) + "'s head between " + gC(this.initiator).posPr
								+ " legs, and " + ktn(target) + " is licking. ") ] );
		results.description += " " + ktn(this.initiator) + " received " + textLustDamage(lustDamage) + ". ";
		
		// Submissive loss of willpower
		if ( gC(target).hasLead == false && gC(target).position.key == "kneeling" ) {
			var exWillpowerDamage = ((gC(this.initiator).will.getValue() * 0.5 + gC(this.initiator).charisma.getValue() * 1) / gC(target).will.getValue()) * 1;
			gC(target).willpower.changeValue(-exWillpowerDamage);
			results.description += ktn(target) + "'s submissive position made " + gC(target).comPr + " receive " + textWillpowerDamage(exWillpowerDamage) + ". ";
		}
		
		// Submissive extra lust
		if ( gC(target).hasLead == false && gC(target).willpower.current < (gC(target).willpower.max * 0.8) ) {
			var exLustDamage = (gC(this.initiator).charisma.getValue() / gC(target).will.getValue()) * (1 - (gC(target).willpower.current / gC(target).willpower.max)) * 2;
			gC(target).lust.changeValue(-exLustDamage);
			results.description += ktn(target) + "'s lack of control aroused " + gC(target).comPr + " and made " + gC(target).comPr + " receive " + textLustDamage(exLustDamage) + ". ";
		}
		
		return results;
	}
	return ca;
}

window.createCaPenetratePussy = function(initiator, targetsList) {
	var ca = new continuedAction();
	ca.key = "penetratePussy";
	ca.name = "Penetrating pussy";
	ca.initiator = initiator;
	ca.targetsList = targetsList;
	ca.initiatorBodyparts = [ "dick" ];
	ca.targetsBodyparts = [ "pussy" ];
	ca.occupyBodyparts();
	
	ca.validRelationalPositions.push(["mountingFromBehind","mountedFromBehind"],["mountingFaceToFace","mountedFaceToFace"],
									 ["spitroastBehind","spitroastTarget"]);
	
	ca.execute = function() {
		var results = new saResults;
		var target = targetsList[0];
		
		var lustDamage = ((getChar(this.initiator).physique.getValue() * 1 + getChar(this.initiator).resilience.getValue() * 1) / 10);
		getChar(this.targetsList[0]).lust.changeValue(-lustDamage);
		var lustDamage2 = ((getChar(this.targetsList[0]).physique.getValue() * 1 + getChar(this.targetsList[0]).resilience.getValue() * 1) / 40);
		getChar(this.initiator).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(initiator) + "'s " + dickWord() + " remains connected to " + ktn(target) + "'s insides."),
								(ktn(initiator) + " keeps penetrating " + ktn(target) + "'s " + pussyWord() + "."),
								(ktn(initiator) + " is fucking " + ktn(target) + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". ";
		results.description += ktn(initiator) + " received " + textLustDamage(lustDamage2) + ". ";
		
		// Submissive loss of willpower
		if ( gC(target).hasLead == false && gC(target).position.key == "mountedFromBehind" ) {
			var exWillpowerDamage = (gC(this.initiator).will.getValue() / gC(target).will.getValue()) * 1;
			gC(target).willpower.changeValue(-exWillpowerDamage);
			results.description += ktn(target) + "'s submissive position made " + gC(target).comPr + " receive " + textWillpowerDamage(exWillpowerDamage) + ".";
		}
		
		return results;
	}	
	return ca;
}
window.createCaPenetrateAss = function(initiator, targetsList) {
	var ca = new continuedAction();
	ca.key = "penetrateAss";
	ca.name = "Penetrating ass";
	ca.initiator = initiator;
	ca.targetsList = targetsList;
	ca.initiatorBodyparts = [ "dick" ];
	ca.targetsBodyparts = [ "anus" ];
	ca.occupyBodyparts();
	
	ca.validRelationalPositions.push(["mountingFromBehind","mountedFromBehind"],["mountingFaceToFace","mountedFaceToFace"],
									 ["spitroastBehind","spitroastTarget"]);
	
	ca.execute = function() {
		var results = new saResults;
		var target = targetsList[0];
		
		var lustDamage = ((getChar(this.initiator).physique.getValue() * 1 + getChar(this.initiator).resilience.getValue() * 1) / 15);
		getChar(this.targetsList[0]).lust.changeValue(-lustDamage);
		var lustDamage2 = ((getChar(this.targetsList[0]).agility.getValue() * 1 + getChar(this.targetsList[0]).resilience.getValue() * 1) / 20);
		getChar(this.initiator).lust.changeValue(-lustDamage2);
		var energyDamage = ((getChar(this.initiator).physique.getValue() * 1 + getChar(this.initiator).resilience.getValue() * 1) / 45);
		getChar(this.targetsList[0]).energy.changeValue(-energyDamage);
		
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(initiator) + "'s " + dickWord() + " remains connected to " + ktn(target) + "'s insides."),
								(ktn(initiator) + " keeps penetrating " + ktn(target) + "'s " + assWord() + "."),
								(ktn(target) + "'s rear remains filled by " + ktn(initiator) + "'s " + dickWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + " and " + textEnergyDamage(energyDamage) + ".";
		results.description += ktn(initiator) + " received " + textLustDamage(lustDamage2) + ". ";
		
		// Submissive loss of willpower
		if ( gC(target).hasLead == false && gC(target).position.key == "mountedFromBehind" ) {
			var exWillpowerDamage = (gC(this.initiator).will.getValue() / gC(target).will.getValue()) * 1;
			gC(target).willpower.changeValue(-exWillpowerDamage);
			results.description += " " + ktn(target) + "'s submissive position made " + gC(target).comPr + " receive " + textWillpowerDamage(exWillpowerDamage) + ".";
		}
		
		return results;
	}	
	
	return ca;
}
window.createCaInterlockLegs = function(initiator, targetsList) {
	var ca = new continuedAction();
	ca.key = "interlockLegs";
	ca.name = "Interlocking legs";
	ca.initiator = initiator;
	ca.targetsList = targetsList;
	ca.initiatorBodyparts = [ "pussy" ];
	ca.targetsBodyparts = [ "pussy" ];
	ca.occupyBodyparts();
	
	ca.validRelationalPositions.push(["mountingFaceToFace","mountedFaceToFace"],["mountingFromBehind","mountedFromBehind"],["spitroastBehind","spitroastTarget"]);
	
	ca.execute = function() {
		var results = new saResults;
		var target = targetsList[0];
		
		var lustDamage = ((getChar(this.initiator).physique.getValue() * 1 + getChar(this.initiator).resilience.getValue() * 1) / 10);
		getChar(this.targetsList[0]).lust.changeValue(-lustDamage);
		var lustDamage2 = ((getChar(this.targetsList[0]).physique.getValue() * 1 + getChar(this.targetsList[0]).resilience.getValue() * 1) / 40);
		getChar(this.initiator).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(initiator) + " and " + ktn(target) + " are frotting their pussies against each other."),
								(ktn(initiator) + " keeps rubbing herself against " + ktn(target) + "."),
								(ktn(initiator) + " is scissoring " + ktn(target) + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". ";
		results.description += ktn(initiator) + " received " + textLustDamage(lustDamage2) + ".";
		
		return results;
	}	
	return ca;
}

window.createCaGetBlowjob = function(initiator, targetsList) {
	var ca = new continuedAction();
	ca.key = "getBlowjob";
	ca.name = "Getting Blowjob";
	ca.initiator = initiator;
	ca.targetsList = targetsList;
	ca.initiatorBodyparts = [ "dick" ];
	ca.targetsBodyparts = [ "mouth" ];
	ca.occupyBodyparts();
	
	ca.validRelationalPositions.push(["standing","kneeling"],["spitroastFront","spitroastTarget"]);
	
	ca.execute = function() {
		var results = new saResults;
		var target = this.targetsList[0];
		
		var lustDamage2 = (gC(target).agility.getValue() / 5); // Goes to initiator
		var lustDamage = (gC(this.initiator).resilience.getValue() / 10); // Goes to target
		gC(target).lust.changeValue(-lustDamage);
		gC(this.initiator).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(target) + " is sucking " + ktn(initiator) + "'s " + dickWord() + "."),
								(ktn(target) + " is fellating " + ktn(initiator) + "."),
								(ktn(initiator) + " is making " + ktn(target) + " suck " + gC(initiator).posPr + " " + dickWord() + ".") ] );
		results.description += " " + ktn(initiator) + " received " + textLustDamage(lustDamage2) + ". ";
		results.description += ktn(target) + " received " + textLustDamage(lustDamage) + ". ";
		
		// Submissive loss of willpower
		if ( gC(target).hasLead == false && gC(target).position.key == "kneeling" ) {
			var exWillpowerDamage = ((gC(this.initiator).will.getValue() * 0.5 + gC(this.initiator).charisma.getValue() * 1) / gC(target).will.getValue()) * 1;
			gC(target).willpower.changeValue(-exWillpowerDamage);
			results.description += ktn(target) + "'s submissive position made " + gC(target).comPr + " receive " + textWillpowerDamage(exWillpowerDamage) + ". ";
		}
		
		// Submissive extra lust
		if ( gC(target).hasLead == false && gC(target).willpower.current < (gC(target).willpower.max * 0.8) ) {
			var exLustDamage = (gC(this.initiator).charisma.getValue() / gC(target).will.getValue()) * (1 - (gC(target).willpower.current / gC(target).willpower.max)) * 2;
			gC(target).lust.changeValue(-exLustDamage);
			results.description += ktn(target) + "'s lack of control aroused " + gC(target).comPr + " and made " + gC(target).comPr + " receive " + textLustDamage(exLustDamage) + ". ";
		}
		
		return results;
	}
	return ca;
}

	// Fetish

window.createCaHoldArms = function(initiator,targetsList) {
	var ca = new continuedAction();
	ca.key = "holdArms";
	ca.name = "Holding Arms";
	ca.initiator = initiator;
	ca.targetsList = targetsList;
	ca.initiatorBodyparts = [ "arms" ];
	ca.targetsBodyparts = [ "arms" ];
	ca.occupyBodyparts();
	
	ca.validRelationalPositions.push(["mountingFromBehind","mountedFromBehind"],["mountingFaceToFace","mountedFaceToFace"],
									 ["spitroastBehind","spitroastTarget"]);
									 
	ca.execute = function() {
		var results = new saResults;
		var target = this.targetsList[0];
		
		var willpowerDamage = ((gC(this.initiator).physique.getValue() + gC(this.initiator).resilience.getValue() ) / 10);
		gC(target).willpower.changeValue(-willpowerDamage);
		results.value += willpowerDamage;
		results.description += randomFromList( [
								(ktn(target) + "'s arms remain restrainted by " + ktn(initiator) + "."),
								(ktn(target) + " is still immobilized by " + ktn(initiator) + "."),
								(ktn(initiator) + " keeps " + ktn(target) + "'s arms in place.") ] );
		results.description += " " + ktn(target) + " received " + textWillpowerDamage(willpowerDamage) + ". ";
		
		// Submissive extra lust
		if ( gC(target).hasLead == false && gC(target).willpower.current < (gC(target).willpower.max * 0.5) ) {
			var exLustDamage = ((gC(this.initiator).physique.getValue() + gC(this.initiator).resilience.getValue())
								/ (gC(target).will.getValue() * 2 )) * (1 - (gC(target).willpower.current / gC(target).willpower.max)) * 2;
			gC(target).lust.changeValue(-exLustDamage);
			results.description += ktn(target) + "'s lack of control aroused " + gC(target).comPr + " and made " + gC(target).comPr + " receive " + textLustDamage(exLustDamage) + ". ";
		}
		
		return results;
	}
	return ca;
}

window.createCaVinesHoldArms = function(initiator,targetsList) {
	var ca = new continuedAction();
	ca.key = "vinesHoldArms";
	ca.name = "Vines holding Arms";
	ca.initiator = initiator;
	ca.targetsList = targetsList;
	ca.targetsBodyparts = [ "arms" ];
	ca.occupyBodyparts();
									 
	ca.execute = function() {
		var results = new saResults;
		var target = this.targetsList[0];
		
		var willpowerDamage = ((gC(this.initiator).intelligence.getValue() + gC(this.initiator).resilience.getValue() ) / 8);
		gC(target).willpower.changeValue(-willpowerDamage);
		results.value += willpowerDamage;
		results.description += randomFromList( [
								(ktn(target) + "'s arms remain restrainted by " + ktn(initiator) + "'s vines."),
								(ktn(target) + " is still immobilized by " + ktn(initiator) + "'s vines."),
								(ktn(initiator) + "'s vines keep " + ktn(target) + "'s arms in place.") ] );
		results.description += " " + ktn(target) + " received " + textWillpowerDamage(willpowerDamage) + ". ";
		
		// Submissive extra lust
		if ( gC(target).hasLead == false && gC(target).willpower.current < (gC(target).willpower.max * 0.5) ) {
			var exLustDamage = ((gC(this.initiator).intelligence.getValue() + gC(this.initiator).resilience.getValue())
								/ (gC(target).will.getValue() * 2 )) * (1 - (gC(target).willpower.current / gC(target).willpower.max)) * 2;
			gC(target).lust.changeValue(-exLustDamage);
			results.description += ktn(target) + "'s lack of control aroused " + gC(target).comPr + " and made " + gC(target).comPr + " receive " + textLustDamage(exLustDamage) + ". ";
		}
		
		return results;
	}
	return ca;
}

window.createCaEnergyDrainingKiss = function(initiator, targetsList) {
	var ca = new continuedAction();
	ca.name = "Energy Draining Kiss";
	ca.key = "energyDrainingKissing";
	ca.initiator = initiator;
	ca.targetsList = targetsList;
	ca.initiatorBodyparts = [ "mouth" ];
	ca.targetsBodyparts = [ "mouth" ];
	ca.occupyBodyparts();
	
	ca.unvalidRelationalPositions.push(["standing","kneeling"],["kneeling","standing"]);
	
	ca.execute = function() {
		var results = new saResults;
		var target = targetsList[0];
		
		var lustDamage = ((getChar(this.initiator).agility.getValue() + getChar(this.initiator).perception.getValue() + getChar(this.initiator).empathy.getValue()) / 22.5);
		getChar(this.initiator).lust.changeValue(-lustDamage/2);
		getChar(this.targetsList[0]).lust.changeValue(-lustDamage);
		var energyDrain = ( gCstat("chPlayerCharacter","agility") + gCstat("chPlayerCharacter","perception") + gCstat("chPlayerCharacter","empathy") ) / 30;
		gC(this.initiator).energy.changeValue(energyDrain);
		gC(this.targetsList[0]).energy.changeValue(-energyDrain);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(initiator) + " steals energy from " + ktn(target) + "'s mouth."),
								(ktn(initiator) + " keeps kissing " + ktn(target) + ", who feels " + gC(target).posPr + " energy slipping away.") ] );
								
		results.description += " " + ktn(targetsList[0]) + " received " + textLustDamage(lustDamage) + ". ";
		results.description += ktn(initiator) + " received " + textLustDamage(lustDamage/2) + ". " + ktn(initiator) + " drained "
							 + textEnergyDamage(energyDrain) + " from " + ktn(targetsList[0]) + ". ";
							   
		return results;
	}
	return ca;
}

///////// CREATE POSITION FUNCTIONS /////////

window.createPosMountFromBehind = function(initiator, targetsList) {
	getChar(initiator).position.makeActive(targetsList);
	getChar(initiator).position.key = "mountingFromBehind";
	getChar(initiator).position.name = "Mounting from behind";
	getChar(initiator).position.description = getChar(initiator).formattedName + " is holding " + getChar(targetsList[0]).formattedName
											+ "'s hips from behind.";
											
	getChar(targetsList[0]).position.makePassive(initiator);
	getChar(targetsList[0]).position.key = "mountedFromBehind";
	getChar(targetsList[0]).position.name = "Being mounted from behind";
	getChar(targetsList[0]).position.description = getChar(initiator).formattedName + " is holding " + getChar(targetsList[0]).formattedName
											+ "'s hips from behind.";
}

window.createPosMountFaceToFace = function(initiator, targetsList) {
	getChar(initiator).position.makeActive(targetsList);
	getChar(initiator).position.key = "mountingFaceToFace";
	getChar(initiator).position.name = "Mounting face to face";
	getChar(initiator).position.description = getChar(initiator).formattedName + " is holding " + getChar(targetsList[0]).formattedName
											+ " down.";
											
	getChar(targetsList[0]).position.makePassive(initiator);
	getChar(targetsList[0]).position.key = "mountedFaceToFace";
	getChar(targetsList[0]).position.name = "Being mounted face to face";
	getChar(targetsList[0]).position.description = getChar(initiator).formattedName + " is holding " + getChar(targetsList[0]).formattedName
											+ " down.";
}

window.createPosKneel = function(initiator, targetsList) {
	// Initiator is the character other are kneeling towards
	getChar(initiator).position.makeActive(targetsList);
	getChar(initiator).position.key = "standing";
	getChar(initiator).position.name = "Standing";
	getChar(initiator).position.description = getChar(targetsList[0]).formattedName + " is kneeling in front of " + getChar(initiator).formattedName + ".";
											
	getChar(targetsList[0]).position.makePassive(initiator);
	getChar(targetsList[0]).position.key = "kneeling";
	getChar(targetsList[0]).position.name = "Kneeling";
	getChar(targetsList[0]).position.description = getChar(targetsList[0]).formattedName + " is kneeling in front of " + getChar(initiator).formattedName + ".";
}

window.createPosSpitroast = function(mainInitiator,secondaryInitiator,target) {
	// Target gets on all fours, main initiator takes target from behind, secondaryInitiator takes target from the front
	gC(mainInitiator).position.makeActive([target]);
	gC(mainInitiator).position.key = "spitroastBehind";
	gC(mainInitiator).position.name = "Mounting from behind";
	
	gC(secondaryInitiator).position.makeActive([target]);
	gC(secondaryInitiator).position.key = "spitroastFront";
	gC(secondaryInitiator).position.name = "Taking head";
	
	gC(target).position.makePassiveSecondaryInitiators(mainInitiator,[secondaryInitiator]);
	gC(target).position.key = "spitroastTarget";
	gC(target).position.name = "Getting spitroasted";
	
	var description = "" + ktn(target) + " is on all fours, taken by " + ktn(mainInitiator) + " from behind and by " + ktn(secondaryInitiator)
					+ " from the front.\n";
	gC(mainInitiator).position.description = description;
	gC(secondaryInitiator).position.description = description;
	gC(target).position.description = description;
}

// Constructors, serializers, etc.
continuedAction.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

continuedAction.prototype.clone = function () {
	return (new continuedAction())._init(this);
};

continuedAction.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new continuedAction())._init($ReviveData$)', ownData);
};


