///// BATTLE POSITIONS /////

	// Pounces

window.createBcaNeutralPounce = function(initiator,targetsList) {
	var ca = new continuedAction();
	ca.key = "mounting";
	ca.name = "Mounting";
	ca.initiator = initiator;
	ca.targetsList = targetsList;
	ca.affinities = [];
	
	ca.execute = function() {
		var results = new saResults;
		var actor = this.initiator;
		var target = this.targetsList[0];
		
		results.value = 0;
				
		results.description += randomFromList( [
								(ktn(initiator) + " is holding " + ktn(target) + " in place."),
								(ktn(initiator) + " has mounted " + ktn(target) + " and won't let " + gC(target).comPr + " go."),
								(ktn(initiator) + " has trapped " + ktn(target) + " under " + gC(initiator).posPr + " weight.")
									] );
		
		return results;
	}	
	return ca;
}

window.createBposFrontalPounce = function(initiator, targetsList) {
	var target = targetsList[0];
	
	gC(initiator).position.makeActive(targetsList);
	gC(initiator).position.key = "frontalPounce";
	gC(initiator).position.name = "Mounting face to face";
	gC(initiator).position.description = ktn(initiator) + " is holding " + ktn(target) + randomFromList([" from above."," face to face."]);
	
	gC(initiator).position.cAction = createBcaNeutralPounce(initiator,targetsList);
	
	gC(target).position.makePassive(initiator);
	gC(target).position.key = "frontalPouncedD2P";
	gC(target).position.name = "Being mounted face to face";
	gC(target).position.description = ktn(initiator) + " is holding " + ktn(target) + randomFromList([" from above."," face to face."]);
}

window.createBcaD2Ppounce = function(initiator,targetsList) {
	var ca = new continuedAction();
	ca.key = "baPenetratePussy";
	ca.name = "Penetrating pussy";
	ca.initiator = initiator;
	ca.targetsList = targetsList;
	ca.initiatorBodyparts = [ "dick" ];
	ca.targetsBodyparts = [ "pussy" ];
	ca.occupyBodyparts();
	ca.affinities = [];
	
	ca.execute = function() {
		var results = new saResults;
		var actor = this.initiator;
		var target = this.targetsList[0];
		
		// Damage to target
		var actAffinities = ["sex","useDick","targetPussy"];
		var inDamValue = gCstat(actor,"physique") * 0.1 + gCstat(actor,"resilience") * 0.1;
		inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
		var damage = calculateAttackEffects("lust",actor,target,actAffinities,inDamValue);
		// Damage to actor
		var tarAffinities = ["sex","usePussy","targetDick"];
		var inDamValue2 = gCstat(target,"physique") * 0.04 + gCstat(target,"resilience") * 0.04;
		inDamValue2 = addLuckFactor(inDamValue2,0.1,gCstat(actor,"luck"));
		var damage2 = calculateAttackEffects("lust",target,actor,tarAffinities,inDamValue2);
		
		/*
		// Submissive loss of willpower
		if ( gC(target).hasLead == false && gC(target).position.key == "mountedFromBehind" ) {
			var exWillpowerDamage = (gC(this.initiator).will.getValue() / gC(target).will.getValue()) * 1;
			gC(target).willpower.changeValue(-exWillpowerDamage);
			results.description += ktn(target) + "'s submissive position made " + gC(target).comPr + " receive " + textWillpowerDamage(exWillpowerDamage) + ".";
		}
		*/
		
		// Apply effects
		gC(target).lust.attack(-damage);
		gC(actor).lust.attack(-damage2);
		results.value += damage;
				
		results.description += randomFromList( [
								(ktn(initiator) + " keeps penetrating " + ktn(target) + "'s " + pussyWord() + "."),
								(ktn(initiator) + " is fucking " + ktn(target) + "."),
								(ktn(target) + " is held by " + ktn(initiator) + " as " + gC(initiator).perPr + " fucks " + gC(target).comPr + ".")
									] );
		results.description += " " + ktn(target) + " received " + textLustDamage(damage) + ". ";
		results.description += ktn(initiator) + " received " + textLustDamage(damage2) + ". ";
		
		return results;
	}	
	return ca;
}

window.createBposDP2frontalPounce = function(initiator, targetsList) {
	var target = targetsList[0];
	
	gC(initiator).position.makeActive(targetsList);
	gC(initiator).position.key = "frontalPounceD2P";
	gC(initiator).position.name = "Mounting face to face";
	gC(initiator).position.description = ktn(initiator) + " is holding " + ktn(target) + randomFromList([" from above."," face to face."]);
	
	gC(initiator).position.cAction = createBcaD2Ppounce(initiator,targetsList);
	
	gC(target).position.makePassive(initiator);
	gC(target).position.key = "frontalPouncedD2P";
	gC(target).position.name = "Being mounted face to face";
	gC(target).position.description = ktn(initiator) + " is holding " + ktn(target) + randomFromList([" from above."," face to face."]);
}

window.createBcaP2Ppounce = function(initiator,targetsList) {
	var ca = new continuedAction();
	ca.key = "baScissoring";
	ca.name = "Scissoring";
	ca.initiator = initiator;
	ca.targetsList = targetsList;
	ca.initiatorBodyparts = [ "pussy" ];
	ca.targetsBodyparts = [ "pussy" ];
	ca.occupyBodyparts();
	ca.affinities = [];
	
	ca.execute = function() {
		var results = new saResults;
		var actor = this.initiator;
		var target = this.targetsList[0];
		
		// Damage to target
		var actAffinities = ["sex","usePussy","targetPussy"];
		var inDamValue = gCstat(actor,"physique") * 0.1 + gCstat(actor,"resilience") * 0.1;
		inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
		var damage = calculateAttackEffects("lust",actor,target,actAffinities,inDamValue);
		// Damage to actor
		var tarAffinities = ["sex","usePussy","targetPussy"];
		var inDamValue2 = gCstat(target,"physique") * 0.04 + gCstat(target,"resilience") * 0.04;
		inDamValue2 = addLuckFactor(inDamValue2,0.1,gCstat(actor,"luck"));
		var damage2 = calculateAttackEffects("lust",target,actor,tarAffinities,inDamValue2);
		
		/*
		// Submissive loss of willpower
		if ( gC(target).hasLead == false && gC(target).position.key == "mountedFromBehind" ) {
			var exWillpowerDamage = (gC(this.initiator).will.getValue() / gC(target).will.getValue()) * 1;
			gC(target).willpower.changeValue(-exWillpowerDamage);
			results.description += ktn(target) + "'s submissive position made " + gC(target).comPr + " receive " + textWillpowerDamage(exWillpowerDamage) + ".";
		}
		*/
		
		// Apply effects
		gC(target).lust.attack(-damage);
		gC(actor).lust.attack(-damage2);
		results.value += damage;
				
		results.description += randomFromList( [
								(ktn(initiator) + " keeps rubbing herself against " + ktn(target) + "'s " + pussyWord() + "."),
								(ktn(initiator) + " is fucking " + ktn(target) + "."),
								(ktn(target) + " is held by " + ktn(initiator) + " and " + gC(initiator).posPr + " " + pussyWord() + " frotted.")
									] );
		results.description += " " + ktn(target) + " received " + textLustDamage(damage) + ". ";
		results.description += ktn(initiator) + " received " + textLustDamage(damage2) + ". ";
		
		return results;
	}	
	return ca;
}

window.createBposP2PfrontalPounce = function(initiator, targetsList) {
	var target = targetsList[0];
	
	gC(initiator).position.makeActive(targetsList);
	gC(initiator).position.key = "frontalPounceP2P";
	gC(initiator).position.name = "Mounting face to face";
	gC(initiator).position.description = ktn(initiator) + " is holding " + ktn(target) + randomFromList([" from above."," face to face."]);
	
	gC(initiator).position.cAction = createBcaP2Ppounce(initiator,targetsList);
	
	gC(target).position.makePassive(initiator);
	gC(target).position.key = "frontalPouncedP2P";
	gC(target).position.name = "Being mounted face to face";
	gC(target).position.description = ktn(initiator) + " is holding " + ktn(target) + randomFromList([" from above."," face to face."]);
}

window.createBcaP2Dpounce = function(initiator,targetsList) {
	var ca = new continuedAction();
	ca.key = "baRidingDick";
	ca.name = "Riding dick";
	ca.initiator = initiator;
	ca.targetsList = targetsList;
	ca.initiatorBodyparts = [ "pussy" ];
	ca.targetsBodyparts = [ "dick" ];
	ca.occupyBodyparts();
	ca.affinities = [];
	
	ca.execute = function() {
		var results = new saResults;
		var actor = this.initiator;
		var target = this.targetsList[0];
		
		// Damage to target
		var actAffinities = ["sex","usePussy","targetDick"];
		var inDamValue = gCstat(actor,"physique") * 0.1 + gCstat(actor,"resilience") * 0.1;
		inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
		var damage = calculateAttackEffects("lust",actor,target,actAffinities,inDamValue);
		// Damage to actor
		var tarAffinities = ["sex","useDick","targetPussy"];
		var inDamValue2 = gCstat(target,"physique") * 0.04 + gCstat(target,"resilience") * 0.04;
		inDamValue2 = addLuckFactor(inDamValue2,0.1,gCstat(actor,"luck"));
		var damage2 = calculateAttackEffects("lust",target,actor,tarAffinities,inDamValue2);
		
		/*
		// Submissive loss of willpower
		if ( gC(target).hasLead == false && gC(target).position.key == "mountedFromBehind" ) {
			var exWillpowerDamage = (gC(this.initiator).will.getValue() / gC(target).will.getValue()) * 1;
			gC(target).willpower.changeValue(-exWillpowerDamage);
			results.description += ktn(target) + "'s submissive position made " + gC(target).comPr + " receive " + textWillpowerDamage(exWillpowerDamage) + ".";
		}
		*/
		
		// Apply effects
		gC(target).lust.attack(-damage);
		gC(actor).lust.attack(-damage2);
		results.value += damage;
				
		results.description += randomFromList( [
								(ktn(initiator) + " rubs " + gC(initiator).posPr + " hips all around " + ktn(target) + "'s, sending shivers down both of their spines."),
								(ktn(initiator) + " keeps riding " + ktn(target) + "'s " + dickWord() + "."),
								(ktn(initiator) + " moves up and down along " + ktn(target) + "'s " + dickWord() + ", " + ktn(target) + " locked between " + gC(initiator).posPr + " legs.")
									] );
		results.description += " " + ktn(target) + " received " + textLustDamage(damage) + ". ";
		results.description += ktn(initiator) + " received " + textLustDamage(damage2) + ". ";
		
		return results;
	}	
	return ca;
}

window.createBposP2DfrontalPounce = function(initiator, targetsList) {
	var target = targetsList[0];
	
	gC(initiator).position.makeActive(targetsList);
	gC(initiator).position.key = "frontalPounceP2D";
	gC(initiator).position.name = "Mounting from above";
	gC(initiator).position.description = ktn(initiator) + " is holding " + ktn(target) + " below " + gC(initiator).posPr + " legs.";
	
	gC(initiator).position.cAction = createBcaP2Dpounce(initiator,targetsList);
	
	gC(target).position.makePassive(initiator);
	gC(target).position.key = "frontalPouncedP2D";
	gC(target).position.name = "Being mounted from above";
	gC(target).position.description = ktn(initiator) + " is holding " + ktn(target) + " below " + gC(initiator).posPr + " legs.";
}

	// Others

window.createBposMakeKneel = function(initiator, targetsList) {
	var target = targetsList[0];
	
	gC(initiator).position.makeActive(targetsList);
	gC(initiator).position.key = "makeKneel";
	gC(initiator).position.name = "Making kneel";
	gC(initiator).position.description = ktn(target) + "'s cannot defy " + ktn(initiator) + "'s authority, and remains in " + gC(target).posPr + " knees.";
	
	gC(initiator).position.cAction = createBcaMakingKneel(initiator,targetsList);
	
	gC(target).position.makePassive(initiator);
	gC(target).position.key = "madeKneel";
	gC(target).position.name = "Being made to kneel";
	gC(initiator).position.description = ktn(target) + "'s cannot defy " + ktn(initiator) + "'s authority, and remains in " + gC(target).posPr + " knees.";
}

window.createBcaMakingKneel = function(initiator,targetsList) {
	var ca = new continuedAction();
	ca.key = "baMakingKneel";
	ca.name = "Making Kneel";
	ca.initiator = initiator;
	ca.targetsList = targetsList;
	ca.initiatorBodyparts = [ "eyes" ];
	ca.targetsBodyparts = [ "eyes" ];
	ca.occupyBodyparts();
	ca.affinities = ["hypnosis"];
	
	ca.execute = function() {
		var results = new saResults;
		var actor = this.initiator;
		var target = this.targetsList[0];
		
		// Damage to target
		var actAffinities = ["hypnosis","useEyes","targetEyes"];
		var inDamValue = gCstat(actor,"will") * 0.1 + gCstat(actor,"charisma") * 0.1;
		inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
		var damage = calculateAttackEffects("willpower",actor,target,actAffinities,inDamValue);
		
		// Apply effects
		var overflowMsg = applyBarDamage(target,"willpower",-damage);
		results.value += damage;
				
		results.description += randomFromList( [
								(ktn(initiator) + " keeps " + gC(initiator).posPr + " eyes locked on " + ktn(target) + "'s, depriving " + gC(target).comPr + " of the freedom to stand up."),
								(ktn(initiator) + " keeps " + gC(initiator).posPr + " grip on " + ktn(target) + "'s mind, locking " + gC(target).comPr + " on " + gC(target).posPr + " knees."),
								(ktn(target) + " finds " + gC(target).refPr + " lost in the labyrinth of " + ktn(initiator) + "'s hypnotic clutch.")
									] );
		results.description += " " + ktn(target) + " received " + textWillpowerDamage(damage) + ". " + overflowMsg;
		
		return results;
	}	
	return ca;
}
