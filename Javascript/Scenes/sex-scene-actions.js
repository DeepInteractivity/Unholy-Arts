////////// SEX SCENE ACTIONS //////////

	// Stroking

window.createSaStrokePussy = function() {
	var sa = new sceneAction();
	sa.name = "Stroke pussy";
	sa.key = "strokePussy";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.actorBpReqs.push("arms");
	sa.targetBpReqs.push("pussy");
	
	sa.unvalidRelationalPositions.push(["standing","kneeling"]);
	
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastTarget"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	
	sa.flavorTags.push("foreplay","useHands","targetPussy");
	
	sa.description = "The character strokes a pussy.\n\nSingle target action.\n"
				   + "Actor requires free hands, target requires free pussy.\n\nForeplay\n\n__Influences__:\nDamage: Actor's agility x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		
		for (var target of targetActors) {
			var lustDamage = ((getChar(actorKey).agility.getValue() * 2) / 10);
			getChar(target).lust.changeValue(-lustDamage);
			
			results.value += lustDamage;
			results.description += randomFromList( [
											(ktn(actorKey) + " stroked " + ktn(target) + "'s " + pussyWord() + "."),
											(ktn(actorKey) + " caressed " + ktn(target) + "'s " + pussyWord() + "."),
											(ktn(actorKey) + " masturbated " + ktn(target) + "'s " + pussyWord() + ".") ] );
			results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
		}
		
		return results;
	}
	return sa;
}
window.createSaStrokeBreasts = function() {
	var sa = new sceneAction();
	sa.name = "Stroke breasts";
	sa.key = "strokeBreasts";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.actorBpReqs.push("arms");
	sa.targetBpReqs.push("breasts");
	sa.unvalidRelationalPositions.push(["standing","kneeling"]);
	
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	
	sa.flavorTags.push("foreplay","useHands","targetBreasts");
	
	sa.description = "The character strokes breasts.\n\nSingle target action.\n"
				   + "Actor requires free hands, target requires free breasts.\n\nForeplay.\n\n__Influences__:\nDamage: Actor's agility x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = ((getChar(actorKey).agility.getValue() * 2) / 10);
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " stroked " + ktn(target) + "'s " + boobsWord() + "."),
									(ktn(actorKey) + " massaged " + ktn(target) + "'s " + boobsWord() + "."),
									(ktn(actorKey) + " masturbated " + ktn(target) + "'s " + boobsWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
							   
		return results;
	}
	return sa;
}
window.createSaStrokeDick = function() {
	var sa = new sceneAction();
	sa.name = "Handjob";
	sa.key = "strokeDick";
	sa.targetType = "single";
	sa.tags.push("ss","sUse");
	sa.actorBpReqs.push("arms");
	sa.targetBpReqs.push("dick");
	sa.unvalidRelationalPositions.push(["standing","kneeling"]);
	
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastTarget"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	
	sa.flavorTags.push("foreplay","useHands","targetDick");
	
	sa.description = "The character massages a dick.\n\nSingle target action.\n"
				   + "Actor requires free hands, target requires free dick.\n\nForeplay.\n\n__Influences__:\nDamage: Actor's agility x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = ((gC(actorKey).agility.getValue() * 2) / 10);
		gC(target).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " stroked " + ktn(target) + "'s " + dickWord() + "."),
									(ktn(actorKey) + " massaged " + ktn(target) + "'s " + dickWord() + "."),
									(ktn(actorKey) + " masturbated " + ktn(target) + "'s " + dickWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
		
		return results;
	}
	return sa;
}
window.createSaStrokeAss = function() {
	var sa = new sceneAction();
	sa.name = "Tease ass";
	sa.key = "strokeAss";
	sa.targetType = "single";
	sa.tags.push("ss","sUse");
	
	sa.getIsAllowedBySettings = function() {
		var isAllowed = true;
		
		if ( State.variables.settings.anal == "disable" ) {
			isAllowed = false;
		}
		
		return isAllowed;
	}
	
	sa.actorBpReqs.push("arms");
	sa.targetBpReqs.push("anus");
	sa.unvalidRelationalPositions.push(["standing","kneeling"],["mountedFromBehind","mountingFromBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastTarget"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	
	sa.flavorTags.push("foreplay","useHands","targetAss");
	
	sa.description = "The character strokes the area surrounding the target's anus.\n\nSingle target action.\n"
				   + "Actor requires free hands, target requires free anus.\n\nForeplay.\n\n__Influences__:\nDamage: Actor's agility x1.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = ((gC(actorKey).agility.getValue() * 2) / 10);
		gC(target).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " stroked " + ktn(target) + "'s " + assWord() + "."),
									(ktn(actorKey) + " massaged " + ktn(target) + "'s " + assWord() + "."),
									(ktn(actorKey) + " masturbated " + ktn(target) + "'s " + assWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
		
		return results;
	}
	
	return sa;
}

window.createSaDickFootjob = function() {
	var sa = new sceneAction();
	sa.name = "Dick footjob";
	sa.key = "dickFootjob";
	sa.targetType = "single";
	sa.tags.push("ss","sUse");
	sa.actorBpReqs.push("legs");
	sa.targetBpReqs.push("dick");
	
	sa.requiredPositions.push("standing","mountedFromBehind","spitroastTarget");
	sa.targetRequiredPositions.push("kneeling","mountingFromBehind","spitroastBehind");
	sa.linkedPositions = true;
	
	sa.flavorTags.push("foreplay","useLegs","targetDick");
	
	sa.description = "The character massages the target's dick with their feet.\n"
				   + "Actor requires free legs, target requires free dick.\n\nForeplay.\n\n__Influences__:\nDamage: Actor's agility x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		
		for (var target of targetActors) {
			var lustDamage = ((getChar(actorKey).agility.getValue() * 2) / 12);
			getChar(target).lust.changeValue(-lustDamage);
			
			results.value += lustDamage;
			results.description += randomFromList( [
											(ktn(actorKey) + " frotted " + ktn(target) + "'s " + dickWord() + " with " + gC(actorKey).posPr + " feet."),
											(ktn(actorKey) + " gave a footjob to " + ktn(target) + "."),
											(ktn(actorKey) + "'s feet masturbated " + ktn(target) + "'s " + dickWord() + ".") ] );
			results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
		}
		
		return results;
	}		
	return sa;
}
window.createSaPussyFootjob = function() {
	var sa = new sceneAction();
	sa.name = "Pussy footjob";
	sa.key = "pussyFootjob";
	sa.targetType = "single";
	sa.tags.push("ss","sUse");
	sa.actorBpReqs.push("legs");
	sa.targetBpReqs.push("pussy");
	
	sa.requiredPositions.push("standing","mountedFromBehind","spitroastTarget");
	sa.targetRequiredPositions.push("kneeling","mountingFromBehind","spitroastBehind");
	sa.linkedPositions = true;
	
	sa.flavorTags.push("foreplay","useLegs","targetPussy");
	
	sa.description = "The character massages the target's pussy with their feet.\n"
				   + "Actor requires free legs, target requires free pussy.\n\nForeplay.\n\n__Influences__:\nDamage: Actor's agility x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		
		for (var target of targetActors) {
			var lustDamage = ((getChar(actorKey).agility.getValue() * 2) / 12);
			getChar(target).lust.changeValue(-lustDamage);
			
			results.value += lustDamage;
			results.description += randomFromList( [
											(ktn(actorKey) + " rubbed " + ktn(target) + "'s " + pussyWord() + " with " + gC(actorKey).posPr + " feet."),
											(ktn(actorKey) + "'s feet stimulated " + ktn(target) + "'s " + pussyWord() + "."),
											(ktn(actorKey) + "'s feet massaged " + ktn(target) + "'s " + dickWord() + ".") ] );
			results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
		}
		
		return results;
	}		
	return sa;
}

	// Kissing/Almost sex

window.createSaKissLips = function() {
	var sa = new sceneAction();
	sa.name = "Kiss Lips";
	sa.key = "kissLips";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("mouth");
	sa.targetBpReqs.push("mouth");
	sa.unvalidRelationalPositions.push(["kneeling","standing"],["takenFromBehind","takingFromBehind"],["spitroastBehind","spitroastTarget"],
									   ["spitroastTarget","spitroastBehind"]);
	
	sa.flavorTags.push("foreplay","useMouth","targetMouth");
	
	sa.description = "The character slowly kisses another character's lips.\n\nSingle target action.\n"
				   + "Actor requires free mouth, target requires free mouth.\n\nForeplay.\n\n__Influences__:\nDamage: Actor's agility x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = ((getChar(actorKey).agility.getValue() * 2) / 10);
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " kissed " + ktn(target) + "'s lips."),
									(ktn(actorKey) + " placed " + getChar(actorKey).posPr + " own lips on " + ktn(target) + "'s."),
									(ktn(actorKey) + " tempted " + ktn(target) + "'s lips with " + getChar(actorKey).posPr + " own.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
							   
		return results;
	}
	return sa;
}
window.createSaFrottage = function() {
	var sa = new sceneAction();
	sa.name = "Groin Frottage";
	sa.key = "groinFrottage";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.unvalidRelationalPositions.push(["kneeling","standing"],["standing","kneeling"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastFront"],["spitroastFront","spitroastTarget"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	
	sa.flavorTags.push("foreplay","teasing");
	
	sa.description = "The character rubs their groin against someone else's private parts.\n\nSingle target action."
				   + "\nInfluenced by actor's agility, perception and charisma.\n\nForeplay."
				   + "\n\n__Influences__:\nDamage: Actor's agility x2, actor's perception x2,actor's charisma x2,"
				   + "\nfree actor's genital body parts, free target's genital body parts.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var actorGenitals = ["groin","private parts"];
		var targetGenitals = ["groin","private parts"];
		if ( gC(actorKey).hasFreeBodypart("dick") ) { actorGenitals.push("dick"); }
		if ( gC(actorKey).hasFreeBodypart("pussy") ) { actorGenitals.push("pussy"); }
		if ( gC(target).hasFreeBodypart("dick") ) { targetGenitals.push("dick"); }
		if ( gC(target).hasFreeBodypart("pussy") ) { targetGenitals.push("pussy"); }
		
		
		var lustDamage = (getChar(actorKey).agility.getValue() * 2 + getChar(actorKey).perception.getValue() + getChar(actorKey).charisma.getValue() ) / 15;
		var lustDamage2 = lustDamage / 4;
		lustDamage *= (0.4 * actorGenitals.length - 0.2);
		lustDamage2 *= (0.4 * targetGenitals.length - 0.2);
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		
		results.description += ktn(actorKey) + randomFromList([" frotted "," pressed "]) + gC(actorKey).posPr + " " + randomFromList(actorGenitals);
		results.description += " against " + ktn(target) + "'s " + randomFromList(targetGenitals) + ". ";
		results.description += ktn(target) + " received " + textLustDamage(lustDamage) + ". ";
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". ";
							
		return results;
	}
	return sa;
}

window.createSaLickLegs = function() {
	var sa = new sceneAction();
	sa.name = "Lick legs";
	sa.key = "lickLegs";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("mouth");
	sa.targetBpReqs.push("legs");
	
	sa.requiredPositions.push("kneeling");
	sa.targetRequiredPositions.push("standing");
	sa.linkedPositions = true;
	
	sa.flavorTags.push("foreplay","useMouth","targetLegs");
	
	sa.description = "The character tastes the skin of the target's legs.\n\nSingle target action.\n"
				   + "Actor requires free mouth, target requires free legs.\n\nForeplay.\n\n__Influences__:\nDamage: Actor's agility x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = ((getChar(actorKey).agility.getValue() * 2) / 14);
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-(lustDamage/2));
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " licked " + ktn(target) + "'s thighs."),
									(ktn(actorKey) + "'s tongue traced a line along " + ktn(target) + "'s leg."),
									(ktn(actorKey) + " kissed and licked " + ktn(target) + "'s calves.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + ktn(actorKey)
							 + " received " + textLustDamage((lustDamage/2)) + ".";
							   
		return results;
	}
	return sa;
}

	// Sex actions

window.createSaThrust = function() {
	var sa = new sceneAction();
	sa.name = "Thrust";
	sa.key = "thrust";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredActiveCAs.push("takingFromBehind","penetratePussy");
	
	sa.flavorTags.push("fullsex","useDick","targetPussy","top");
	
	sa.description = "The character pushes their cock into their target's folds. Actor and target must already be connected.\n\nSingle target action."
				   + "\n\nFull sex.\n\n__Influences__:\nDamage: Actor's physique x3, actor's agility x1, actor's will x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = (getChar(actorKey).physique.getValue() * 3 + getChar(actorKey).agility.getValue() + getChar(actorKey).will.getValue()) / 10;
		var lustDamage2 = lustDamage / 5;
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " " + dickWord() + " deep into " + ktn(target) + "."),
									(ktn(actorKey) + " thrusted into " + ktn(target) + "."),
									(ktn(actorKey) + " penetrated " + ktn(target) + "'s " + randomFromList(["insides","pussy"]) + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". ";
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". ";
		
		return results;
	}
	return sa;	
}
window.createSaAnalThrust = function() {
	var sa = new sceneAction();
	sa.name = "Anal thrust";
	sa.key = "analThrust";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	
	sa.getIsAllowedBySettings = function() {
		var isAllowed = true;
		
		if ( State.variables.settings.anal == "disable" ) {
			isAllowed = false;
		}
		
		return isAllowed;
	}
	
	sa.reqTags.push("diffTarget");
	sa.requiredActiveCAs.push("takingFromBehind","penetrateAss");
	
	sa.flavorTags.push("fullsex","useDick","targetAss","top");
	
	sa.description = "The character slides their dick through the target's rear. Actor and target must already be connected.\n\nSingle target action."
				   + "\n\nFull sex.\n\n__Influences__:\nDamage: Actor's resilience x10, actor's agility x6, actor's will x4.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = (getChar(actorKey).resilience.getValue() * 2.5 + getChar(actorKey).agility.getValue() * 1.5 + getChar(actorKey).will.getValue()) / 10;
		var energyDamage = lustDamage / 4;
		var lustDamage2 = lustDamage / 4;
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(targetActors[0]).energy.changeValue(-energyDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " " + dickWord() + " deep into " + ktn(target) + "."),
									(ktn(actorKey) + " thrusted into " + ktn(target) + "."),
									(ktn(actorKey) + " penetrated " + ktn(target) + "'s " + assWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + " and " + textEnergyDamage(energyDamage) + ". ";
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". ";
		
		return results;
	}		
	return sa;
}
window.createSaDoubleThrust = function() {
	var sa = new sceneAction();
	sa.name = "Double thrust";
	sa.key = "doubleThrust";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	
	sa.getIsAllowedBySettings = function() {
		var isAllowed = true;
		
		if ( State.variables.settings.anal == "disable" ) {
			isAllowed = false;
		}
		
		return isAllowed;
	}
	
	sa.reqTags.push("diffTarget");
	sa.requiredActiveCAs.push("takingFromBehind","doublePenetration");
	
	sa.flavorTags.push("fullsex","useDick","targetPussy","targetAss","top");
	
	sa.description = "The character slides two dicks into their partner's insides. Actor and target must already be connected.\n\nSingle target action."
				   + "\n\nFull sex.\n\n__Influences__:\nDamage, energy damage, self damage: Actor's physique x2, actor's resilience x2, actor's agility x1, actor's will x1.";
	sa.execute = function(actorKey,targetActors) {
		var actor = actorKey;
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = ( gC(actor).physique.getValue() * 2 + gC(actor).agility.getValue() * 1 + gC(actor).resilience.getValue() * 2 + gC(actor).will.getValue() * 1 ) / 10;
		var energyDamage = lustDamage / 4;
		var lustDamage2 = lustDamage / 6;
		
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(targetActors[0]).energy.changeValue(-energyDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " " + dickWord() + "s deep into " + ktn(target) + "."),
									(ktn(actorKey) + " thrusted into " + ktn(target) + "'s insides."),
									(ktn(actorKey) + " penetrated both " + ktn(target) + "'s " + pussyWord() + " and " + assWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + " and " + textEnergyDamage(energyDamage) + ". ";
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". ";
		
		return results;
	}		
	return sa;
}
window.createSaPushHipsBack = function() {
	var sa = new sceneAction();
	sa.name = "Push Hips Back";
	sa.key = "pushHipsBack";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredPassiveCAs.push("takingFromBehind","penetratePussy","penetrateAss","doublePenetration");
	/*
	sa.targetRequiredPositions.push("takingFromBehind");
	sa.requiredPositions.push("takenFromBehind");
	sa.linkedPositions = true;
	*/
	sa.flavorTags.push("fullsex","usePussy","targetDick","bottom");
	
	sa.description = "The character pushes their hips back against someone else's dick. Target must already be penetrating the actor."
				   + "\n\nSingle target action.\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's resilience x3, actor's agility x1, actor's will x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = (getChar(actorKey).resilience.getValue() * 3 + getChar(actorKey).agility.getValue() + getChar(actorKey).will.getValue()) / 20;
		var lustDamage2 = lustDamage / 5;
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " pressed " + gC(actorKey).posPr + " hips back against " + ktn(target)
								+ ", getting impaled in " + gC(target).posPr + " their " + dickWord() + "."),
								(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " " + pussyWord() + " hard against  "
								+ ktn(target) + "'s " + dickWord() + ".")
								] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". ";
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". ";
		
		return results;
	}
	return sa;
}
window.createSaPiston = function() {
	var sa = new sceneAction();
	sa.name = "Piston";
	sa.key = "piston";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredActiveCAs.push("takingFromBehind","penetratePussy");
	sa.energyCost = 2;
	/*
	sa.requiredPositions.push("takingFromBehind");
	sa.targetRequiredPositions.push("takenFromBehind");
	sa.linkedPositions = true;
	*/
	sa.flavorTags.push("fullsex","useDick","targetPussy","top");
	
	sa.description = "The character uses all the strength in their legs and abs to fuck their target. The characters must be in position already.\n"
				   + "Costs 5 energy.\nSingle target action.\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's physique x5, actor's resilience x3, actor's agility x2.";
	sa.execute = function(actorKey,targetActors) {
		 var results = new saResults;
		 var actor = actorKey;
		 var target = targetActors[0];
		 
		 applySaCosts(this,actor);
		 
		 var lustDamage = (getChar(actorKey).physique.getValue() * 5 + getChar(actorKey).agility.getValue() * 2 + getChar(actorKey).resilience.getValue() * 3) / 10;
		 var lustDamage2 = lustDamage / 1.5;
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actor) + " forcefully went into " + ktn(target) + " with all " + gC(actor).posPr + " strength."),
									(ktn(actor) + " is repeteadly pushing " + gC(actor).posPr + " " + dickWord() + " into " + ktn(target) + "."),
									(ktn(actor) + " is dominating " + ktn(target) + "'s " + pussyWord() + ", pushing back and forth.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". ";
		results.description += ktn(actor) + " received " + textLustDamage(lustDamage2) + ". " + generateSaCostsText(this,actor) + ". ";
		 
		 return results;
	}
	return sa;
}
window.createSaFinalPush = function() {
	var sa = new sceneAction();
	sa.name = "Final Push";
	sa.key = "finalPush";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredActiveCAs.push("takingFromBehind","penetratePussy");
	sa.energyCost = 20;
	
	sa.flavorTags.push("fullsex","useDick","targetPussy","top");
	
	sa.description = "The character pushes the physical limits of their body to pour their whole being into one final fuck.\n"
				   + "Forces an orgasm on the character and deals a lot of lust damage to their target.\n"
				   + "The characters must be in position already.\n\nSingle target action.\n"
				   + "\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's physique x3, actor's resilience x2.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var actor = actorKey;
		var target = targetActors[0];
		
		applySaCosts(this,actor);
		
		var lustDamage = (getChar(actorKey).physique.getValue() * 3 + getChar(actorKey).resilience.getValue() * 2) / 2;
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-getChar(actorKey).lust.current);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actor) + " reached as deep as humanly possible within " + ktn(target)
								+ ", putting " + gC(actor).posPr + " whole being into one final push."),
								(ktn(actor) + "'s " + dickWord() + " aimed for the final frontier within " + ktn(target) + "'s " + pussyWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". ";
		results.description += ktn(actor) + " received " + colorText("lust damage until reaching orgasm","lightCoral") + ". " + generateSaCostsText(this,actor) + ". ";
		
		return results;
	}
	return sa;
	
}
window.createSaRideDick = function() {
	var sa = new sceneAction();
	sa.name = "Ride dick";
	sa.key = "rideDick";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredActiveCAs.push("mountDick");
	
	sa.flavorTags.push("fullsex","usePussy","targetDick","top");
	
	sa.description = "The character moves up and down their partner's dick. Actor and target must already be connected.\n\nSingle target action."
				   + "\n\nFull sex.\n\n__Influences__:\nDamage: Actor's physique x3, actor's agility x1, actor's will x1.";
	sa.execute = function(actorKey,targetActors) {
		var actor = actorKey;
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = (getChar(actorKey).physique.getValue() * 3 + getChar(actorKey).agility.getValue() + getChar(actorKey).will.getValue()) / 10;
		var lustDamage2 = lustDamage / 5;
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " let " + gC(actorKey).posPr + " hips fall upon " + ktn(target) + "'s " + dickWord() + "."),
									(ktn(actorKey) + " tightened " + gC(actor).refPr + " around " + ktn(target) + "'s " +  dickWord() + "."),
									(ktn(actorKey) + "'s " + pussyWord() + " sucked " + ktn(target) + "'s " + dickWord() + " up.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". ";
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". ";
		
		return results;
	}
	return sa;	
}
window.createSaPushDickBack = function() {
	var sa = new sceneAction();
	sa.name = "Push Dick Back";
	sa.key = "pushDickBack";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredPassiveCAs.push("mountDick");
	
	sa.flavorTags.push("fullsex","useDick","targetDick","bottom");
	
	sa.description = "The character pushes their dick back against someone else's genitals. Target must already be riding the actor."
				   + "\n\nSingle target action.\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's resilience x3, actor's agility x1, actor's will x1.";
	sa.execute = function(actorKey,targetActors) {
		var actor = actorKey;
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = (getChar(actorKey).resilience.getValue() * 3 + getChar(actorKey).agility.getValue() + getChar(actorKey).will.getValue()) / 20;
		var lustDamage2 = lustDamage / 5;
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " " + dickWord() + " against " + ktn(target) + "."),
								(ktn(actorKey) + " thrusted " + ktn(target) + "'s " + pussyWord() + "."),
								(ktn(actorKey) + "'s " + dickWord() + " retaliated against " + ktn(target) + "'s " + pussyWord() + ".")
								] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". ";
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". ";
		
		return results;
	}
	return sa;
}


window.createSaScissor = function() {
	var sa = new sceneAction();
	sa.name = "Scissor";
	sa.key = "scissor";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredCAs.push("interlockLegs");
	
	sa.flavorTags.push("fullsex","usePussy","targetPussy");
	
	sa.description = "The character rub their own pussy with their target's.\nActor and target must be interlocking legs.\n\nSingle target action."
				   + "\n\nFull sex.\n\n__Influences__:\nDamage: Actor's physique x7, actor's agility x5.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = (getChar(actorKey).physique.getValue() * 2.8 + getChar(actorKey).agility.getValue() * 2) / 10;
		var lustDamage2 = lustDamage / 5;
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " frotted " + gC(actorKey).posPr + " own " + pussyWord() + " against " + ktn(target) + "'s."),
									(ktn(actorKey) + " slid " + gC(actorKey).posPr + " groin through " + ktn(target) + "'s " + pussyWord() + ", seeking pleasure."),
									(ktn(actorKey) + " squeezed " + ktn(target) + "'s groin against " + gC(actorKey).posPr + " own " + pussyWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". ";
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". ";
		
		return results;
	}
	return sa;	
}

window.createSaLickGroin = function() {
	var sa = new sceneAction();
	sa.name = "Lick Groin";
	sa.key = "lickGroin";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("mouth");
	
	sa.requiredPositions.push("kneeling","spitroastTarget");
	sa.targetRequiredPositions.push("standing","spitroastFront");
	sa.linkedPositions = true;
	
	sa.flavorTags.push("oral","useMouth","targetPussy","targetDick");
	
	sa.description = "The character lick the erogenous parts of their target's groin.\n\nSingle target action.\n"
				   + "\nOral.\n\n__Influences__:\nDamage: Actor's agility x1, target's free genitals.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var targetGenitals = ["groin","private parts"];
		if ( gC(target).hasFreeBodypart("dick") ) { targetGenitals.push("dick","dick"); }
		if ( gC(target).hasFreeBodypart("pussy") ) { targetGenitals.push("pussy","pussy"); }
		
		var lustDamage = (getChar(actorKey).agility.getValue() * 3) / 10;
		lustDamage *= ((targetGenitals.length + 1) * 0.2);
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " licked " + ktn(target) + "'s " + randomFromList(targetGenitals) + "."),
								(ktn(actorKey) + " pleasured " + ktn(target) + "'s " + randomFromList(targetGenitals) + " with "
								+ gC(actorKey).posPr + " tongue."),
								(ktn(actorKey) + " throughly cleaned " + ktn(target) + "'s " + randomFromList(targetGenitals)
								+ " with " + gC(actorKey).posPr + " mouth.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
		
		return results;
	}
	return sa;
}
window.createSaSuckDick = function() {
	var sa = new sceneAction();
	sa.name = "Suck Dick";
	sa.key = "suckDick";
	sa.targetType = "single";
	sa.tags.push("ss","sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredPassiveCAs.push("getBlowjob");
	
	sa.flavorTags.push("oral","useMouth","targetDick");
	
	sa.description = "The character sucks their target's dick.\n"
				   + "The actor must be giving a blowjob to their target.\n\nSingle target action.\n"
				   + "\nOral.\n\n__Influences__:\nDamage: Actor's agility x1.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var actor = actorKey;
		var target = targetActors[0];
		
		var lustDamage = (getChar(actorKey).agility.getValue() / 3);
		gC(target).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actor) + " sucked " + ktn(target) + "'s " + dickWord() + "."),
								(ktn(actor) + " throughly licked " + ktn(target) + "'s " + dickWord() + " within " + gC(actor).posPr + " mouth."),
								(ktn(actor) + " ran " + gC(actor).posPr + " tongue through " + ktn(target) + "'s " + dickWord() + "'s skin.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
		
		return results;
	}
	return sa;
}
window.createSaFuckFace = function() {
	var sa = new sceneAction();
	sa.name = "Fuck Face";
	sa.key = "fuckFace";
	sa.targetType = "single";
	sa.tags.push("ss","sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredActiveCAs.push("getBlowjob");
	
	sa.flavorTags.push("oral","targetMouth","useDick");
	
	sa.description = "The character penetrates their target's mouth with their dick.\n"
				   + "The actor must be receiving a blowjob from their target.\n\nSingle target action.\n"
				   + "\nOral.\n\n__Influences__:\nDamage: Actor's physique x1, actor's agility x1.";
				   
	sa.execute = function(actorKey,targetActors) {
		// Lust to actor, lust to target, willpower to target
		var results = new saResults;
		var actor = actorKey;
		var target = targetActors[0];
		
		var lustDamageSelf = (getChar(actorKey).physique.getValue() / 10 + getChar(actorKey).agility.getValue() / 10);
		var lustDamageTarget = (getChar(actorKey).physique.getValue() / 14 + getChar(actorKey).agility.getValue() / 14);
		var willpowerDamageTarget = (getChar(actorKey).physique.getValue() / 20 + getChar(actorKey).agility.getValue() / 20);
		gC(actor).lust.changeValue(-lustDamageSelf);
		gC(target).lust.changeValue(-lustDamageTarget);
		gC(target).lust.changeValue(-willpowerDamageTarget);
		results.value += lustDamageTarget;
		
		results.description += randomFromList( [
								(ktn(actor) + " fiercely penetrated " + ktn(target) + "'s throat."),
								(ktn(target) + " struggles to breathe due to " + ktn(actor) + "'s enthisiam in fucking " + gC(target).posPr + " throat."),
								(ktn(actor) + "'s " + dickWord() + " is looking for treasure within " + ktn(target) + "'s mouth."),
								(ktn(actor) + " keeps pushing " + gC(actor).posPr + " " + dickWord() + " into " + ktn(target) + "'s mouth.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamageTarget) + " and " + textWillpowerDamage(willpowerDamageTarget)
							 + ". " + ktn(actor) + " received " + textLustDamage(lustDamageSelf) + ".";
		
		return results;
	}
	return sa;
}
window.createSaLickPussy = function() {
	var sa = new sceneAction();
	sa.name = "Lick Pussy";
	sa.key = "lickPussy";
	sa.targetType = "single";
	sa.tags.push("ss","sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredPassiveCAs.push("legHoldingHead");
	
	sa.flavorTags.push("oral","useMouth","targetPussy");
	
	sa.description = "The character sucks their target's pussy.\n"
				   + "The actor must be eating out their target's pussy.\n\nSingle target action.\n"
				   + "\nOral.\n\n__Influences__:\nDamage: Actor's agility x1.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var actor = actorKey;
		var target = targetActors[0];
		
		var lustDamage = (getChar(actorKey).agility.getValue() / 3);
		gC(target).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actor) + " is eating " + ktn(target) + "'s " + pussyWord() + "."),
								(ktn(actor) + " throughly licked " + ktn(target) + "'s " + pussyWord() + "'s folds."),
								(ktn(actor) + " ran " + gC(actor).posPr + " tongue through every corner of " + ktn(target) + "'s " + pussyWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
		
		return results;
	}
	return sa;
}
window.createSaRideFace = function() {
	var sa = new sceneAction();
	sa.name = "Ride Face";
	sa.key = "rideFace";
	sa.targetType = "single";
	sa.tags.push("ss","sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredActiveCAs.push("legHoldingHead");
	
	sa.flavorTags.push("oral","targetMouth","usePussy");
	
	sa.description = "The character masturbates their own pussy against their target's face.\n"
				   + "The target must be eating out the actor's pussy.\n\nSingle target action.\n"
				   + "\nOral.\n\n__Influences__:\nDamage: Actor's physique x1, actor's agility x1.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var actor = actorKey;
		var target = targetActors[0];
		
		var lustDamageSelf = (getChar(actorKey).physique.getValue() / 10 + getChar(actorKey).agility.getValue() / 10);
		var lustDamageTarget = (getChar(actorKey).physique.getValue() / 14 + getChar(actorKey).agility.getValue() / 14);
		var willpowerDamageTarget = (getChar(actorKey).physique.getValue() / 20 + getChar(actorKey).agility.getValue() / 20);
		gC(actor).lust.changeValue(-lustDamageSelf);
		gC(target).lust.changeValue(-lustDamageTarget);
		gC(target).willpower.changeValue(-willpowerDamageTarget);
		results.value += lustDamageTarget;
		results.description += randomFromList( [
								(ktn(actor) + " is riding " + ktn(target) + "'s mouth with " + gC(actor).posPr + " " + pussyWord() + "."),
								(ktn(actor) + "'s riding of " + ktn(target) + "'s face is going to light fire."),
								(ktn(actor) + " is pulling " + ktn(target) + "'s face against " + gC(actor).posPr + " own groin."),
								(ktn(target) + " has no choice to but swallow " + ktn(actor) + "'s vaginal fluids.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamageTarget) + " and " + textWillpowerDamage(willpowerDamageTarget)
							 + ". " + ktn(actor) + " received " + textLustDamage(lustDamageSelf) + ".";
		
		return results;
	}
	return sa;
}

	// Fetish

		// Hypnosis

window.createSaHypnoticGlance = function() {
	var sa = new sceneAction();
	sa.name = "Hypnotic Glance";
	sa.key = "hypnoticGlance";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("eyes");
	sa.targetBpReqs.push("eyes");
	
	sa.unvalidRelationalPositions.push(["takingFromBehind","takenFromBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastBehind","spitroastTarget"]);
	
	sa.flavorTags.push("hypnosis","useEyes","targetEyes");
	
	sa.description = "The character uses hypnotic magic to erode their target's willpower through a seductive glance.\n"
				   + "Actor must have access to target's eyes.\n\nSingle target action.\n\nHypnosis."
				   + "\n\n__Influences__:\nDamage: Actor's charisma x2, actor's will x1.";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		if ( actorKey == targetActors[0] ) {
			results.value = 0;
			results.description += getChar(actorKey).formattedName + " came to the realization that it's impossible to look at oneself without a mirror.";
		}
		else {
			var willpowerDamage = ((getChar(actorKey).charisma.getValue() * 2 + getChar(actorKey).will.getValue()) / 3);
			getChar(targetActors[0]).willpower.changeValue(-willpowerDamage);
			results.value += willpowerDamage;
			results.description += randomFromList( [
										(ktn(actorKey) + " enraptured " + ktn(target) + "'s eyes, and " + gC(target).perPr
										+ " felt " + gC(target).posPr + " willpower slipping away."),
										(ktn(actorKey) + "'s eyes captured " + ktn(target) + "'s attention, and " + gC(target).perPr
										+ " felt " + gC(target).refPr + " getting lost in them.") ] );
			results.description += " " + ktn(target) + " received " + textWillpowerDamage(willpowerDamage) + ".";
		}
							   
		return results;
	}
	return sa;
}
window.createSaLustfulGlance = function() {
	var sa = new sceneAction();
	sa.name = "Lustful Glance";
	sa.key = "lustfulGlance";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("eyes");
	sa.targetBpReqs.push("eyes");
	
	sa.unvalidRelationalPositions.push(["takingFromBehind","takenFromBehind"]);
	
	sa.flavorTags.push("charm","useEyes","targetEyes");
	
	sa.description = "The character uses hypnotic magic to heat their target's lust through a seductive glance.\n"
				   + "Actor must have access to target's eyes.\n\nSingle target action.\n\nCharm.\n\n__Influences__:\nDamage: Actor's charisma x1.";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = getChar(actorKey).charisma.getValue();
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
										(ktn(actorKey) + " enraptured " + ktn(target) + "'s eyes, and " + gC(target).perPr
										+ " felt " + gC(target).posPr + " groin heating up."),
										(ktn(actorKey) + "'s eyes captured " + ktn(target) + "'s , and " + gC(target).perPr
										+ " found " + gC(target).posPr + " own mind fantasizing.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
		
		return results;
	}
	return sa;
}

window.createSaRealHypnoticGlance = function() {
	var sa = new sceneAction();
	sa.name = "Hypnotic Glance";
	sa.key = "realHypnoticGlance";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("eyes");
	sa.targetBpReqs.push("eyes");
	
	sa.unvalidRelationalPositions.push(["takingFromBehind","takenFromBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastBehind","spitroastTarget"]);
	
	sa.flavorTags.push("hypnosis","useEyes","targetEyes","domination");
	
	sa.description = "The character uses hypnotic magic to erode their target's willpower through a seductive glance.\n"
				   + "Actor must have access to target's eyes.\n\nSingle target action.\n\nHypnosis."
				   + "\n\n__Influences__:\nDamage: Actor's charisma x2, actor's will x1.";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		if ( actorKey == targetActors[0] ) {
			results.value = 0;
			results.description += getChar(actorKey).formattedName + " came to the realization that it's impossible to look at oneself without a mirror.";
		}
		else {
			var willpowerDamage = ((getChar(actorKey).charisma.getValue() / 8) + (getChar(actorKey).will.getValue()) / 16);
			getChar(targetActors[0]).willpower.changeValue(-willpowerDamage);
			results.value += willpowerDamage;
			results.description += randomFromList( [
										(ktn(actorKey) + " enraptured " + ktn(target) + "'s eyes, and " + gC(target).perPr
										+ " felt " + gC(target).posPr + " willpower slipping away."),
										(ktn(actorKey) + "'s eyes captured " + ktn(target) + "'s attention, and " + gC(target).perPr
										+ " felt " + gC(target).refPr + " getting lost in them.") ] );
			results.description += " " + ktn(target) + " received " + textWillpowerDamage(willpowerDamage) + ".";
		}
							   
		return results;
	}
	return sa;
}

		// Pain

window.createSaSpanking = function() {
	var sa = new sceneAction();
	sa.name = "Spanking";
	sa.key = "spanking";
	sa.targetType = "single";
	sa.tags.push("ss","sUse");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("arms");
	
	sa.requiredPositions = ["mountingFromBehind","spitroastBehind"];
	sa.targetRequiredPositions = ["mountedFromBehind","spitroastTarget"];
	sa.linkedPositions = true;
	
	sa.flavorTags.push("domination","usePain");
	
	sa.getIsAllowedBySettings = function() {
		var isAllowed = true;
		if ( State.variables.settings.pain == "disable" ) {
			isAllowed = false;
		}
		return isAllowed;
	}
	
	sa.description = "The character punishes their target by hitting their ass with an open hand.\n\n"
				   + "Single target action.\n\nDomination.\n\n__Influences__:\nDamage: Actor's physique x1, actor's resilience x1.";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = (gC(actorKey).physique.getValue() + gC(actorKey).resilience.getValue()) / 20;
		var willpowerDamage = (gC(actorKey).physique.getValue() + gC(actorKey).resilience.getValue()) / 8;
		gC(target).lust.changeValue(-lustDamage);
		gC(target).willpower.changeValue(-willpowerDamage);
		results.description += randomFromList( [
									(ktn(actorKey) + " slapped " + ktn(target) + "'s " + assWord() + " with all " + gC(actorKey).posPr + " might."),
									(ktn(actorKey) + " punished " + ktn(target) + "'s " + assWord() + "."),
									(ktn(actorKey) + " spanked " + ktn(target) + " like a child.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". ";
		results.description += ktn(target) + " received " + textWillpowerDamage(willpowerDamage) + ".";
		
		return results;
	}
	
	return sa;
}

window.createSaBiteNeck = function() {
	var sa = new sceneAction();
	sa.name = "Bite neck";
	sa.key = "biteNeck";
	sa.targetType = "single";
	sa.tags.push("ss","sUse");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("mouth");
	
	sa.requiredPositions = ["mountingFromBehind","mountingFaceToFace","spitroastBehind"];
	sa.targetRequiredPositions = ["mountedFromBehind","mountedFaceToFace","spitroastTarget"];
	sa.linkedPositions = true;
	
	sa.flavorTags.push("domination","usePain");
	
	sa.getIsAllowedBySettings = function() {
		var isAllowed = true;
		if ( State.variables.settings.pain == "disable" ) {
			isAllowed = false;
		}
		return isAllowed;
	}
	
	sa.description = "The character pinches a neck with their teeth.\n\n"
				   + "Single target action.\n\nDomination.\n\n__Influences__:\nDamage: Actor's agility x2, actor's perception x2, actor's physique x1.";
	
	sa.execute = function(actor,targetActors) {
		var target = targetActors[0];
		var results = new saResults;
		
		var lustDamage = (gCstat(actor,"agility") * 2 + gCstat(actor,"physique") + gCstat(actor,"perception") * 2) / 40;
		var willpowerDamage = lustDamage / 4;
		var socialdriveDamage = lustDamage / 4;
		gC(target).lust.attack(-lustDamage);
		gC(target).willpower.attack(-willpowerDamage);
		gC(target).socialdrive.attack(-socialdriveDamage);
		results.description += randomFromList( [
									(ktn(actor) + " took a bite on " + ktn(target) + "'s neck, leaving a mark."),
									(ktn(actor) + " placed " + gC(actor).posPr + " teeth on " + ktn(target) + "'s neck, who felt a shiver running down " + gC(target).posPr + " spine."),
									(ktn(target) + " shrunk in anticipation of the pain, when " + gC(target).perPr + " felt " + ktn(actor) + "'s teeth on " + gC(target).posPr + " neck.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ", " + textWillpowerDamage(willpowerDamage) + " and "
						     + textSocialdriveDamage(socialdriveDamage) + ".";
		
		return results;
	}
	
	return sa;	
}

// Continued actions-related actions
window.createSaFrenchKiss = function() {
	var sa = new sceneAction();
	sa.name = "French Kiss (CA)";
	sa.key = "frenchKiss";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("cAct");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("mouth");
	sa.targetBpReqs.push("mouth");
	
	sa.unvalidRelationalPositions.push(["takingFromBehind","takenFromBehind"],["standing","kneeling"],["kneeling","standing"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["spitroastBehind","spitroastTarget"],["spitroastTarget","spitroastBehind"],["spitroastTarget","spitroastFront"]);
	
	sa.flavorTags.push("oral","useMouth","targetMouth","romantic","continuedAction");
	
	sa.description = "The character initiates a deep kiss with their target, exploring each other's tongues.\n"
				   + "Every character's mouth must be free.\n\nSingle target continued action.\n"
				   + "\n\nOral."
				   + "\n\n__Influences__:\nDamage: Actor's agility x1.\nContinued damage: Actor's agility x1, actor's perception x1, actor's empathy x1.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = ((getChar(actorKey).agility.getValue() * 1) / 6.5);
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " captured " + ktn(target) + "'s lips and trapped them in a deep kiss."),
									(ktn(actorKey) + " started to deeply kiss " + ktn(target) + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". ";
		
		// Create Continued Action
		State.variables.sc.continuedActions.push(createCaFrenchKiss(actorKey,targetActors));
							   
		return results;
	}
	return sa;
}

window.createLegHoldHead = function() {
	var sa = new sceneAction();
	sa.name = "Leg-hold Head (CA)";
	sa.key = "legHoldHead";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("cAct");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("legs");
	sa.targetBpReqs.push("mouth");
	
	sa.requiredPositions.push("standing","spitroastFront");
	sa.targetRequiredPositions.push("kneeling","spitroastTarget");
	sa.linkedPositions = true;
	
	sa.flavorTags.push("oral","useLegs","targetMouth","domination","position","continuedAction");
	
	sa.description = "The character holds their target's head with one or two legs, forcing them to lick what's between them.\n"
				   + "Requires the actor's target to be kneeling before them.\n"
				   + "\nSingle target continued action."
				   + "\n\nOral."
				   + "\n\n__Influences__:\Continued self damage: Actor's resilience x2, actor's physique x1, target's agility x3.\nContinued willpower damage (if any): Actor's charisma x2, actor's will x1, target's will x-2.\nContinued damage (if any): Actor's charisma x1, target's will x-1, target's remaining willpower %.";
	
	sa.execute = function(actorKey,targetActors) {
		 var results = new saResults;
		 var target = targetActors[0];
		 
		 results.value = 0;
		 results.description += randomFromList( [
									(ktn(actorKey) + " enclosed " + ktn(target) + "'s head between " + gC(actorKey).posPr
									+ " legs, forcing " + gC(target).comPr + " to lick."),
									(ktn(actorKey) + " trapped " + ktn(target) + "'s head between " + gC(actorKey).posPr + " legs.") ] );
		
		// Create Continued action
		State.variables.sc.continuedActions.push(createCaLegHoldHead(actorKey,targetActors));
		
		return results;
	}
	return sa;
}

window.createSaPenetratePussy = function() {
	var sa = new sceneAction();
	sa.name = "Penetrate Pussy (CA)";
	sa.key = "penetratePussy";
	sa.targetType = "single";
	sa.tags.push("ss","cAct");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("dick");
	sa.targetBpReqs.push("pussy");
	
	sa.requiredPositions = ["mountingFromBehind","mountingFaceToFace","spitroastBehind"];
	sa.targetRequiredPositions = ["mountedFromBehind","mountedFaceToFace","spitroastTarget"];
	sa.linkedPositions = true;
	
	sa.flavorTags.push("fullsex","useDick","targetPussy","top","continuedAction");
	
	sa.description = "The character sticks their dick in their partner's snatch and begins fucking them.\n\nSingle target continued action."
				   + "\nActor requires free dick, target requires free pussy.\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's physique x3, actor's agility x1.\nContinued damage: Actor's and target's physique x1, actor's and target's resilience x1";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = ((getChar(actorKey).physique.getValue() * 3 + getChar(actorKey).agility.getValue() * 1) / 10);
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " started fucking " + ktn(target) + "'s " + pussyWord() + "."),
								(ktn(actorKey) + " nailed " + gC(actorKey).posPr + " " + dickWord() + " inside " + ktn(target) + "."),
								(ktn(actorKey) + " connected " + gC(actorKey).posPr + " " + dickWord() + " with " + ktn(target) + "'s " + pussyWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaPenetratePussy(actorKey,targetActors));
		
		// Try virginities
		if ( getChar(targetActors[0]).virginities.pussy.taken == false ) {
			var vd2 = getChar(actorKey).name + " has taken " + getChar(targetActors[0]).name + "'s vaginal virginity!";
			getChar(targetActors[0]).virginities.pussy.tryTakeVirginity(actorKey,"takeFromBehind",vd2);
		}
		if ( getChar(actorKey).virginities.dick.taken == false ) {
			var vd1 = getChar(targetActors[0]).name + " has taken " + getChar(actorKey).name + "'s penile virginity!";
			getChar(actorKey).virginities.dick.tryTakeVirginity(targetActors[0],"takeFromBehind",vd1);
		}
		
		return results;
	}
	return sa;
}
window.createSaPenetrateAss = function() {
	var sa = new sceneAction();
	sa.name = "Penetrate Ass (CA)";
	sa.key = "penetrateAss";
	sa.targetType = "single";
	sa.tags.push("ss","cAct");
	
	sa.getIsAllowedBySettings = function() {
		var isAllowed = true;
		
		if ( State.variables.settings.anal == "disable" ) {
			isAllowed = false;
		}
		
		return isAllowed;
	}
	
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("dick");
	sa.targetBpReqs.push("anus");
	
	sa.requiredPositions = ["mountingFromBehind","mountingFaceToFace","spitroastBehind"];
	sa.targetRequiredPositions = ["mountedFromBehind","mountedFaceToFace","spitroastTarget"];
	sa.linkedPositions = true;
	
	sa.flavorTags.push("fullsex","useDick","targetAss","top","continuedAction");
	
	sa.description = "The character pushes their member into the target's rear and starts fucking it.\n\nSingle target continued action."
				   + "\nActor requires free dick, target requires free anus.\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's physique x1, actor's agility x1.\nContinued damage, continued energy damage: Actor's physique x1, actor's resilience x1.\nContinued self damage: Target's agility x1, target's resilience x1.";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = ((getChar(actorKey).physique.getValue() * 2 + getChar(actorKey).agility.getValue() * 2) / 10);
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " penetrated " + ktn(target) + "'s " + assWord() + "."),
								(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " own " + dickWord() + " into " + ktn(target) + "'s " + assWord() + "."),
								(ktn(target) + " exhales some air after " + ktn(actorKey) + " finishes getting " + gC(actorKey).posPr + " " + dickWord()
								+ " into " + gC(target).posPr + " " + assWord() + ".") ]
								);
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaPenetrateAss(actorKey,targetActors));
		
		// Try virginities
		if ( getChar(targetActors[0]).virginities.anal.taken == false ) {
			var vd2 = getChar(actorKey).name + " has taken " + getChar(targetActors[0]).name + "'s anal virginity!";
			getChar(targetActors[0]).virginities.anal.tryTakeVirginity(actorKey,"takeFromBehind",vd2);
		}
		if ( getChar(actorKey).virginities.dick.taken == false ) {
			var vd1 = getChar(targetActors[0]).name + " has taken " + getChar(actorKey).name + "'s penile virginity!";
			getChar(actorKey).virginities.dick.tryTakeVirginity(targetActors[0],"takeFromBehind",vd1);
		}
		
		return results;
	}
	return sa;
}
window.createSaInterlockLegs = function() {
	var sa = new sceneAction();
	sa.name = "Interlock Legs (CA)";
	sa.key = "interlockLegs";
	sa.targetType = "single";
	sa.tags.push("ss","cAct");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("pussy");
	sa.targetBpReqs.push("pussy");
	
	sa.requiredPositions = ["mountingFaceToFace","mountingFromBehind","spitroastBehind"];
	sa.targetRequiredPositions = ["mountedFaceToFace","mountedFromBehind","spitroastTarget"];
	sa.linkedPositions = true;
	
	sa.flavorTags.push("fullsex","usePussy","targetPussy","top","continuedAction");
	
	sa.description = "The character crosses their legs with their their partner's, in order stimulate to both their clits and folds."
				   + "\n\nSingle target continued action.\nBoth actor and target require free pussy.\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's physique x3, actor's agility x1.\nContinued damage: Actor's and target's physique x1, actor's and target's resilience x1.";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = ((getChar(actorKey).physique.getValue() * 3 + getChar(actorKey).agility.getValue() * 1) / 10);
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " interlocked " + gC(actorKey).posPr + " and " + ktn(target) + "'s pussies."),
								(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " own " + pussyWord() + " against " + ktn(target) + "'s."),
								(ktn(actorKey) + " locked " + gC(actorKey).posPr + " legs with " + ktn(target) + "'s.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
		
		// Continued Action / TODO
		State.variables.sc.continuedActions.push(createCaInterlockLegs(actorKey,targetActors));
		
		return results;
	}
	return sa;
}
window.createSaMountDick = function() {
	var sa = new sceneAction();
	sa.name = "Mount Dick (CA)";
	sa.key = "mountDick";
	sa.targetType = "single";
	sa.tags.push("ss","cAct");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("pussy");
	sa.targetBpReqs.push("dick");
	
	sa.requiredPositions = ["mountingFaceToFace"];
	sa.targetRequiredPositions = ["mountedFaceToFace"];
	sa.linkedPositions = true;
	
	sa.flavorTags.push("fullsex","usePussy","targetDick","top","continuedAction");
	
	sa.description = "The character impales themself in their partner's dick, and begins fucking them.\n\nSingle target continued action."
				   + "\nActor requires free pussy, target requires free dick.\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's physique x3, actor's agility x1.\nContinued damage: Actor's and target's physique x1, actor's and target's resilience x1";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = ((getChar(actorKey).physique.getValue() * 3 + getChar(actorKey).agility.getValue() * 1) / 10);
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " started fucking " + ktn(target) + "'s " + dickWord() + "."),
								(ktn(actorKey) + " mounted " + ktn(target) + "'s " + dickWord() + "."),
								(ktn(actorKey) + " fell upon " + ktn(target) + "'s " + dickWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaMountDick(actorKey,targetActors));
		
		// Try virginities
		if ( getChar(targetActors[0]).virginities.dick.taken == false ) {
			var vd2 = getChar(actorKey).name + " has taken " + getChar(targetActors[0]).name + "'s penile virginity!";
			getChar(targetActors[0]).virginities.dick.tryTakeVirginity(actorKey,"mountDick",vd2);
		}
		if ( getChar(actorKey).virginities.pussy.taken == false ) {
			var vd1 = getChar(targetActors[0]).name + " has taken " + getChar(actorKey).name + "'s vaginal virginity!";
			getChar(actorKey).virginities.pussy.tryTakeVirginity(targetActors[0],"mountDick",vd1);
		}
		
		return results;
	}
	return sa;
}

window.createSaDoublePenetration = function() {
	var sa = new sceneAction();
	sa.name = "Double Penetration (CA)";
	sa.key = "doublePenetration";
	
	sa.targetType = "single";
	sa.tags.push("ss","cAct");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("dick");
	sa.targetBpReqs.push("pussy");
	sa.targetBpReqs.push("anus");
	
	sa.requiredRace = [ "shapeshifter" ];
	
	sa.requiredPositions = ["mountingFromBehind","mountingFaceToFace","spitroastBehind"];
	sa.targetRequiredPositions = ["mountedFromBehind","mountedFaceToFace","spitroastTarget"];
	sa.linkedPositions = true;
	
	sa.willpowerCost = 3;
	
	sa.getIsAllowedBySettings = function() {
		var isAllowed = true;
		
		if ( State.variables.settings.anal == "disable" ) {
			isAllowed = false;
		}
		
		return isAllowed;
	}
	
	
	sa.flavorTags.push("fullsex","useDick","targetPussy","targetAss","top","continuedAction");
	
	sa.description = "The character uses two phalluses to penetrate their partner's pussy and ass.\n\nSingle target continued action."
				   + "\nActor requires free dick, target requires free pussy and anus.\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's physique x2, actor's agility x1.\nContinued damage: Actor's and target's physique x1, actor's and target's resilience x1";
	
	sa.execute = function(actorKey,targetActors) {
		var actor = actorKey;
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = ((getChar(actorKey).physique.getValue() * 4 + getChar(actorKey).agility.getValue() * 2) / 10);
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " formed a second " + dickWord() + " and started fucking " + ktn(target) + "'s " + pussyWord() + " and " + assWord() + "."),
								(ktn(actorKey) + " split " + gC(actorKey).posPr + " " + dickWord() + " into two and inserted both in " + ktn(target) + "'s genitals."),
								(ktn(actorKey) + " grew a second " + dickWord() + " and filled " + ktn(target) + " with both of them.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + generateSaCostsText(this,actor) + ".";;
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaDoublePenetration(actorKey,targetActors));
		
		// Try virginities
		if ( getChar(targetActors[0]).virginities.pussy.taken == false ) {
			var vd2 = getChar(actorKey).name + " has taken " + getChar(targetActors[0]).name + "'s vaginal virginity!";
			getChar(targetActors[0]).virginities.pussy.tryTakeVirginity(actorKey,"doublePenetration",vd2);
		}
		if ( getChar(targetActors[0]).virginities.anal.taken == false ) {
			var vd3 = getChar(actorKey).name + " has taken " + getChar(targetActors[0]).name + "'s anal virginity!";
			getChar(targetActors[0]).virginities.anal.tryTakeVirginity(actorKey,"doublePenetration",vd3);
		}
		if ( getChar(actorKey).virginities.dick.taken == false ) {
			var vd1 = getChar(targetActors[0]).name + " has taken " + getChar(actorKey).name + "'s penile virginity!";
			getChar(actorKey).virginities.dick.tryTakeVirginity(targetActors[0],"doublePenetration",vd1);
		}
		
		return results;
	}
	return sa;
}

window.createSaGetBlowjob = function() {
	var sa = new sceneAction();
	sa.name = "Get Blowjob (CA)";
	sa.key = "getBlowjob";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("cAct");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("dick");
	sa.targetBpReqs.push("mouth");
	
	sa.requiredPositions = ["standing","spitroastFront"]; // If the list contains anything, the actor requires one of these positions
	sa.targetRequiredPositions = ["kneeling","spitroastTarget"]; // If the list contains anything, the targets require one of these positions
	sa.linkedPositions = false; // If true, the actor and its targets require to be referenced as initiator or target in their respective positions
	
	sa.flavorTags.push("oral","useDick","targetMouth","top","domination","continuedAction");
	
	sa.description = "The character gets their target to start sucking their cock.\n"
				   + "Actor must have a free dick, target must have a free mouth.\n\nSingle target continued action.\n"
				   + "\nOral."
				   + "\n\n__Influences__:\nDamage: Actor's charisma x1.\nContinued self damage: Target's agility x1.\nContinued damage: Actor's resilience x1.";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = gC(actorKey).charisma.getValue() / 5;
		gC(target).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " told " + ktn(target) + " to start sucking " + gC(actorKey).posPr + " " + dickWord() + "."),
								(ktn(actorKey) + " got " + ktn(target) + " to start sucking " + gC(actorKey).posPr + " " + dickWord() + "."),
								(ktn(target) + " was made to suck " + ktn(actorKey) + "'s " + dickWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaGetBlowjob(actorKey,targetActors));
		
		return results;
	}
	
	return sa;
}

	// Fetish continued actions-related actions

		// Bondage

window.createSaHoldArms = function() {
	var sa = new sceneAction();
	sa.name = "Hold Arms (CA)";
	sa.key = "holdArms";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("cAct");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("arms");
	sa.targetBpReqs.push("arms");
	
	sa.requiredPositions = ["mountingFromBehind","mountingFaceToFace","spitroastBehind"];
	sa.targetRequiredPositions = ["mountedFromBehind","mountedFaceToFace","spitroastTarget"];
	sa.linkedPositions = true;
	
	sa.flavorTags.push("domination");
	
	sa.description = "The character grabs the target's arms and holds them in place, preventing their use.\n"
				   + "Actor and target must have free arms. They must share valid positions.\n\nSingle target continued action.\n"
				   + "\nDomination."
				   + "\n\n__Influences__:\nContinued willpower damage: Actor's physique x1, actor's resilience x1.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		results.value += 0;
		results.description += randomFromList( [
								(ktn(actorKey) + " grabbed " + ktn(target) + "'s arms and won't let them go."),
								(ktn(actorKey) + " immobilized " + ktn(target) + "'s arms."),
								(ktn(actorKey) + " restrained " + ktn(target) + "'s hands with " + gC(actorKey).posPr + " own.")
								] );
		
		State.variables.sc.continuedActions.push(createCaHoldArms(actorKey,targetActors));
		
		return results;
	}
	
	return sa;
}

window.createSaVinesHoldArms = function() {
	var sa = new sceneAction();
	sa.name = "Vines Hold Arms (CA)";
	sa.key = "vinesHoldArms";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("cAct");
	sa.reqTags.push("diffTarget");
	sa.targetBpReqs.push("arms");
	
	sa.requiredRace = [ "leirien" ];
	sa.willpowerCost = 3;
	
	sa.flavorTags.push("domination","bondage");
	
	sa.description = "The character uses their vines to restrain the target's arms.\n"
				   + "Actor will consume 3 willpower points.\nTarget must have free arms.\n\nSingle target continued action.\n"
				   + "\nDomination, bondage."
				   + "\n\n__Influences__:\nContinued willpower damage: Actor's intelligence x1, actor's resilience x1.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		// Bar costs
		gC(actorKey).willpower.current -= this.willpowerCost;
		
		results.value += 0;
		results.description += randomFromList( [
								(ktn(actorKey) + "'s vines tied " + ktn(target) + "'s hands."),
								(ktn(actorKey) + " has used " + gC(actorKey).posPr + " vines to tie " + ktn(target) + "'s arms."),
								(ktn(actorKey) + " has trapped " + ktn(target) + "'s arms with " + gC(actorKey).posPr + " vines.")
								] );
		results.description += " " + ktn(actorKey) + " consumed " + textWillpowerPoints(this.willpowerCost);
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaVinesHoldArms(actorKey,targetActors));
		
		return results;
	}
	
	return sa;
}

window.createSaEtherealChains = function() {
	var sa = new sceneAction();
	sa.name = "Ethereal Chains";
	sa.key = "etherealChains";
	sa.targetType = "single";
	sa.tags.push("ss","sUse");
	sa.reqTags.push("diffTarget","hasLead");
	sa.targetBpReqs.push("arms");
	
	sa.flavorTags.push("domination","bondage");
	
	sa.description = "The character casts ethereal chains to lock their target's arms with them.\n"
				   + "Target must have free arms. Actor must be leading.\n\nSingle target action.\n"
				   + "\nDomination, bondage.";
	
	sa.execute = function(actor,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		results.value += 0;
		results.description += randomFromList( [
									(ktn(actor) + " conjured aethereal chains and tied " + ktn(target) + "'s arms with them."),
									(ktn(actor) + " ties " + ktn(target) + "'s arms with magical chains.")
								] );
		
		var altState = createASaetherialChainsArms(1);
		applyAlteredState([target],altState);
		
		return results;
	}
	
	return sa;
}

		// Slime
		
window.createSaSlimeHug = function() {
	var sa = new sceneAction();
	sa.name = "Slime Hug (CA)";
	sa.key = "slimeHug";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("cAct");
	sa.reqTags.push("diffTarget");
	
	sa.requiredRace = [ "shapeshifter" ];
	sa.willpowerCost = 3;
	
	sa.requiredPositions = ["mountingFromBehind","mountingFaceToFace","mountedFromBehind","mountedFaceToFace","spitroastBehind"];
	sa.targetRequiredPositions = ["mountedFromBehind","mountedFaceToFace","mountingFromBehind","mountingFaceToFace","spitroastTarget"];
	sa.linkedPositions = true;
	
	sa.flavorTags.push("domination","bondage");
	
	sa.description = "The character extends their slimy body to surround their partner's skin.\n"
				   + "The target will receive continued lust, energy and willpower damage, will lose agility, and their lead gain rate will be reduced.\nActor will consume 3 willpower points.\n\nSingle target continued action.\n"
				   + "\nDomination, bondage."
				   + "\n\n__Influences__:\nContinued damage: Actor's agility x1, actor's resilience x1, actor's will x1.";
				   
	sa.execute = function(actorKey,targetActors) {
		var actor = actorKey;
		var results = new saResults;
		var target = targetActors[0];
		
		// Bar costs
		gC(actorKey).willpower.current -= this.willpowerCost;
		
		// Lust damage, willpower damage
		
		// Altered state
		var altState = createASslimed(5);
		applyAlteredState([target],altState);
		
		results.value += 0;
		results.description += randomFromList( [
								(ktn(actor) + " embraced " + ktn(target) + ", trapping " + gC(target).comPr + " within the slime."),
								(ktn(actor) + " spread " + gC(actor).posPr + " slime over " + ktn(target) + "."),
								(ktn(target) + " feels " + ktn(actor) + "'s slime surround " + gC(target).posPr + " body, trapping " + gC(target).comPr + ".")
								] );
		results.description += " " + ktn(actorKey) + " consumed " + textWillpowerPoints(this.willpowerCost);
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaSlimeHug(actorKey,targetActors));
		
		return results;
	}
	
	return sa;
}

	// Draining

window.createSaEnergyDrainingKiss = function() {
	var sa = new sceneAction();
	sa.name = "Energy Draining Kiss (CA)";
	sa.key = "energyDrainingKiss";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("cAct");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("mouth");
	sa.targetBpReqs.push("mouth");
	
	sa.unvalidRelationalPositions.push(["takingFromBehind","takenFromBehind"],["standing","kneeling"],["kneeling","standing"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["spitroastBehind","spitroastTarget"],["spitroastTarget","spitroastBehind"],["spitroastTarget","spitroastFront"]);
	
	sa.flavorTags.push("oral","useMouth","targetMouth","romantic","continuedAction","draining");
	
	sa.description = "The character connects their mouth with their targets' in a kiss, draining their energy.\n"
				   + "Every character's mouth must be free.\n\nSingle target continued action.\n"
				   + "\nOral, draining."
				   + "\n\n__Influences__:\Drained damage: Actor's agility x1.\nContinued drained damage: Actor's agility x1, actor's perception x1, actor's empathy x1.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = ((getChar(actorKey).agility.getValue() * 1) / 8);
		var drainedEnergy = ((getChar(actorKey).agility.getValue() * 1) / 10);
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		gC(target).energy.changeValue(-drainedEnergy);
		gC(actorKey).energy.changeValue(drainedEnergy);
		results.value += lustDamage;
		
		results.description += randomFromList( [
									(ktn(actorKey) + " trapped " + ktn(target) + "'s lips, and drained " + gC(target).posPr + " energy through them."),
									(ktn(actorKey) + " started a kiss with " + ktn(target) + ", who feels weaker and weaker..."),
									(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " tongue into " + ktn(target) + "'s mouth, stealing " + gC(target).posPr + " energy.") ] );
									
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + ktn(actorKey) + " drained "
							 + textEnergyDamage(drainedEnergy) + " from " + ktn(target) + ". ";
		
		// Create Continued Action
		State.variables.sc.continuedActions.push(createCaEnergyDrainingKiss(actorKey,targetActors));
							   
		return results;
	}
	return sa;
}

/* Cunnilingus postponed until required
window.createSaGetCunnilingus = function() {
	var sa = new sceneAction();
	sa.name = "Get Cunnilingus (CA)";
	sa.key = "getCunnilingus";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("cAct");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("pussy");
	sa.targetBpReqs.push("mouth");
	
	sa.requiredPositions = ["standing"]; // If the list contains anything, the actor requires one of these positions
	sa.targetRequiredPositions = ["kneeling"]; // If the list contains anything, the targets require one of these positions
	sa.linkedPositions = false; // If true, the actor and its targets require to be referenced as initiator or target in their respective positions
	
	sa.flavorTags.push("oral","usePussy","targetMouth","top","domination","continuedAction");
	
	sa.description = "The character gets their target to start sucking their pussy.\n"
				   + "Actor must have a free pussy, target must have a free mouth.\n\nSingle target continued action.\n"
				   + "Influenced by actor's charisma and resilience, and target's agility.\n\nOral.";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var lustDamage = gC(actorKey).charisma.getValue() / 5;
		gC(target).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " told " + ktn(target) + " to start eating " + ktn(actorKey).posPr + " " + pussyWord() + "."),
								(ktn(actorKey) + " got " + ktn(target) + " to start licking " + ktn(actorKey).posPr + " " + pussyWord() + "."),
								(ktn(target) + " was made to suck " + ktn(actorKey) + "'s " + pussyWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaGetBlowjob(actorKey,targetActors));
		
		return results;
	}
	
	return sa;
}
*/

// Position-related actions
window.createSaMountFromBehind = function() {
	var sa = new sceneAction();
	sa.name = "Mount from behind (POS)";
	sa.key = "mountFromBehind";
	sa.targetType = "single";
	sa.tags.push("ss","pos");
	sa.reqTags.push("diffTarget");
	
	sa.flavorTags.push("fullsex","useDick","targetPussy","targetAss","domination","position");
	
	sa.description = "The character bends their target over, and positions themselves behind them.\n\nSingle target positional action.\n";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		results.value += 0;
		results.description = randomFromList( [
								(ktn(actorKey) + " grabbed " + ktn(target) + " from behind and bent " + gC(target).comPr + " over."),
								(ktn(actorKey) + " mounted " + ktn(target) + " from behind."),
								(ktn(actorKey) + " put " + gC(actorKey).refPr + " behind " + ktn(target) + " and grabbed " + gC(target).comPr + ".") ] );
								
		// Position
		createPosMountFromBehind(actorKey,targetActors);
		
		return results;
	}
	return sa;
}

window.createSaMountFaceToFace = function() {
	var sa = new sceneAction();
	
	sa.name = "Mount face to face (POS)";
	sa.key = "mountFaceToFace";
	sa.targetType = "single";
	sa.tags.push("ss","pos");
	sa.reqTags.push("diffTarget");
	
	sa.flavorTags.push("fullsex","useDick","usePussy","targetDick","targetPussy","romantic","position");
	
	sa.description = "The character embraces their target looking face to face.\n\nSingle target positional action.\n";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		results.value += 0;
		results.description = randomFromList( [
								(ktn(actorKey) + " embraced " + ktn(target) + " and held " + gC(target).comPr + "."),
								(ktn(actorKey) + " mounted " + ktn(target) + " from above."),
								(ktn(actorKey) + " took " + ktn(target) + " into " + gC(actorKey).posPr + " arms.") ] );
								
		// Position
		createPosMountFaceToFace(actorKey,targetActors);
		
		return results;
	}
	
	return sa;
}

window.createSaKneel = function() {
	
	var sa = new sceneAction();
	sa.name = "Kneel (POS)";
	sa.key = "kneel";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("pos");
	sa.reqTags.push("diffTarget");
	
	sa.flavorTags.push("oral","useMouth","targetDick","targetPussy","bottom","submission","position");
	
	sa.description = "The character kneels in front of their target.\n\nSingle target positional action.\n\nOral.";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		
		results.value += 0;
		results.description += getChar(actorKey).formattedName + " knelt in front of " + getChar(targetActors[0]).formattedName + ".";
		
		// Position
		var targets = [];
		targets.push(actorKey);
		createPosKneel(targetActors[0],targets);
		
		return results;
	}
	
	return sa;
	
}
window.createSaMakeKneel = function() {
	var sa = new sceneAction();
	sa.name = "Make Kneel (POS)";
	sa.key = "makeKneel";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("pos");
	sa.reqTags.push("diffTarget");
	
	sa.flavorTags.push("oral","useDick","usePussy","targetMouth","top","domination","position");
	
	sa.description = "The character makes their target kneel before themselves.\n\nSingle target positional action.\n\nOral.";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		
		results.value += 0;
		results.description += getChar(actorKey).formattedName + " ordered " + getChar(targetActors[0]).formattedName + " to kneel.";
		
		// Position
		createPosKneel(actorKey,targetActors);
		
		return results;
	}
	return sa;
}

	// Denial
window.createSaDenyOrgasm = function() {
	var sa = new sceneAction();
	sa.name = "Deny orgasm";
	sa.key = "denyOrgasm";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.actorBpReqs.push("arms");
	
	sa.flavorTags.push("denial","domination");
	
	sa.getIsAllowedBySettings = function() {
		var isAllowed = true;
		
		if ( State.variables.settings.chastity == "disable" ) {
			isAllowed = false;
		}
		
		return isAllowed;
	}
	
	sa.description = "The character locks their partner in place, attempting to ruin their orgasm.\n\nSingle target action.\n"
				   + "Actor requires free hands.\n\nDenial.\n\n__Influences__:\nNone.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var actor = actorKey;
		var target = targetActors[0];
		
		var lustPc = getBarPercentage(target,"lust");
		
		if ( lustPc > 0.1 ) {
			results.value = 0;
			results.description += randomFromList( [
										(ktn(actor) + " tried to deny " + ktn(target) + "'s orgasm, but " + gC(target).perPr + " wasn't close enough."),
										(ktn(actor) + " attempted to ruin " + ktn(target) + "'s climax, but it wasn't close enough yet.") ] );
		} else {
			var lustDamage = gC(target).lust.max * 0.15;
			gC(target).lust.changeValue(-lustDamage);
			
			addTurnTagToChar("denied",target);
			
			results.value += lustDamage;
			results.description += randomFromList( [
										(ktn(actor) + " locked " + ktn(target) + " in place, denying " + gC(target).posPr + " pleasure."),
										(ktn(actor) + " prevented " + ktn(target) + " from getting any pleasure during " + gC(target).posPr + " climax."),
										(ktn(actor) + " denied " + ktn(target) + "'s orgasm, much to " + gC(target).posPr + " frustration.") ] );
			results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ".";
		}
		
		return results;
	}
	
	return sa;
}	
window.createSaTeaseLockedPussy = function() {
	var sa = new sceneAction();
	sa.name = "Tease locked pussy";
	sa.key = "teaseLockedPussy";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.actorBpReqs.push("arms");
	sa.targetLockedBpReqs.push("pussy");
	
	sa.flavorTags.push("denial","domination","targetPussy");
	
	sa.getIsAllowedBySettings = function() {
		var isAllowed = true;
		
		if ( State.variables.settings.chastity == "disable" ) {
			isAllowed = false;
		}
		
		return isAllowed;
	}
	
	sa.description = "The character teases their partner's locked pussy, attempting to ruin their orgasm.\n\nSingle target action.\n"
				   + "Actor requires free hands, target requires locked pussy.\n\nDenial.\n\n__Influences__:\nDamage: Actor's charisma x1, empathy x1, perception x1, agility x1.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var actor = actorKey;
		var target = targetActors[0];
		
		var threshold = 0.1 + ( gCstat(actor,"charisma") + gCstat(actor,"empathy") + gCstat(actor,"agility") + gCstat(actor,"perception") ) * 0.00025;
		var startingLustDamage = ( gCstat(actor,"charisma") + gCstat(actor,"empathy") + gCstat(actor,"agility") + gCstat(actor,"perception") ) * 0.05;
		results.value += startingLustDamage;
		gC(target).lust.changeValue(-startingLustDamage);
		
		var lustPc = getBarPercentage(target,"lust");
		
		if ( lustPc > threshold ) {
			results.description += randomFromList( [
										(ktn(actor) + " teased " + ktn(target) + "'s nethers, reminding " + gC(target).comPr + " of " + gC(target).posPr + " locked " + pussyWord() + "."),
										(ktn(actor) + " taunted " + ktn(target) + " about not being able to pleasure " + gC(target).posPr + " own " + pussyWord() + ".")
											] );
			results.description += " " + ktn(target) + " received " + textLustDamage(startingLustDamage) + ".";
		} else {
			var lustDamage = gC(target).lust.max * 0.25;
			gC(target).lust.changeValue(-lustDamage);
			
			addTurnTagToChar("denied",target);
			
			results.value += lustDamage;
			results.description += randomFromList( [
										(ktn(actor) + " teased " + ktn(target) + "'s nethers, reminding " + gC(target).comPr + " of " + gC(target).posPr + " locked " + pussyWord() + ". " + ktn(target) + " gave in to the humilliation."),
										(ktn(actor) + " taunted " + ktn(target) + " about not being able to pleasure " + gC(target).posPr + " own " + pussyWord() + ". " + ktn(target) + " couldn't hold the shame.")
											] );
			results.description += " " + ktn(target) + " received " + textLustDamage(startingLustDamage + lustDamage) + ".";
		}
		
		return results;
	}
	
	return sa;
}		
window.createSaTeaseLockedDick = function() {
	var sa = new sceneAction();
	sa.name = "Tease locked dick";
	sa.key = "teaseLockedDick";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.actorBpReqs.push("arms");
	sa.targetLockedBpReqs.push("dick");
	
	sa.flavorTags.push("denial","domination","targetDick");
	
	sa.getIsAllowedBySettings = function() {
		var isAllowed = true;
		
		if ( State.variables.settings.chastity == "disable" ) {
			isAllowed = false;
		}
		
		return isAllowed;
	}
	
	sa.description = "The character teases their partner's locked dick, attempting to ruin their orgasm.\n\nSingle target action.\n"
				   + "Actor requires free hands, target requires locked dick.\n\nDenial.\n\n__Influences__:\nDamage: Actor's charisma x1, empathy x1, perception x1, agility x1.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var actor = actorKey;
		var target = targetActors[0];
		
		var threshold = 0.1 + ( gCstat(actor,"charisma") + gCstat(actor,"empathy") + gCstat(actor,"agility") + gCstat(actor,"perception") ) * 0.00025;
		var startingLustDamage = ( gCstat(actor,"charisma") + gCstat(actor,"empathy") + gCstat(actor,"agility") + gCstat(actor,"perception") ) * 0.05;
		results.value += startingLustDamage;
		gC(target).lust.changeValue(-startingLustDamage);
		
		var lustPc = getBarPercentage(target,"lust");
		
		if ( lustPc > threshold ) {
			results.description += randomFromList( [
										(ktn(actor) + " teased " + ktn(target) + "'s thighs, reminding " + gC(target).comPr + " of " + gC(target).posPr + " locked " + dickWord() + "."),
										(ktn(actor) + " taunted " + ktn(target) + " about not being able to pleasure " + gC(target).posPr + " own " + dickWord() + ".")
											] );
			results.description += " " + ktn(target) + " received " + textLustDamage(startingLustDamage) + ".";
		} else {
			var lustDamage = gC(target).lust.max * 0.25;
			gC(target).lust.changeValue(-lustDamage);
			
			addTurnTagToChar("denied",target);
			
			results.value += lustDamage;
			results.description += randomFromList( [
										(ktn(actor) + " teased " + ktn(target) + "'s thighs, reminding " + gC(target).comPr + " of " + gC(target).posPr + " locked " + dickWord() + ". " + ktn(target) + " gave in to the humilliation."),
										(ktn(actor) + " taunted " + ktn(target) + " about not being able to pleasure " + gC(target).posPr + " own " + dickWord() + ". " + ktn(target) + " couldn't hold the shame.")
											] );
			results.description += " " + ktn(target) + " received " + textLustDamage(startingLustDamage + lustDamage) + ".";
		}
		
		return results;
	}
	
	return sa;
}	


	
