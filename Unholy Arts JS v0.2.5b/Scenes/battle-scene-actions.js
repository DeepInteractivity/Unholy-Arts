////////// BATTLE SCENE ACTIONS //////////

// Auxiliars //
window.evasionResults = function(hit,explanation) {
	this.hit = hit; // True or false
	this.explanation = explanation; // Text description with brief calculations
}
window.calculateEvasion = function(actionType,attacker,target,positiveVariables,negativeVariables) {
	var hit = false;
	
	switch ( actionType ) {
		case "pounce":
			if ( gC(target).control == 0 ) {
				hit = true;
				var explanation = "Target has no control left. Pounce succeeds!";
			}
			else {
				positiveVariables += gC(attacker).combatAffinities.pounce.strength - gC(attacker).combatAffinities.pounce.frailty;
				negativeVariables += gC(target).combatAffinities.pounce.resistance - gC(target).combatAffinities.pounce.weakness;
			}
			break;
		case "contact":
			if ( areCharactersPositionsConnected(attacker,target) ) {
				hit = true;
				var explanation = "Target is at contact distance. Contact succeds!";
			}
			break;
		case "hit":
			if ( areCharactersPositionsConnected(attacker,target) ) {
				positiveVariables += 20;
			}
			break;
		case "projectile":
			if ( areCharactersPositionsConnected(attacker,target) ) {
				negativeVariables += 20;
			}
			break;
		case "sound":
			break;
		case "vision":
			break;
		case "social":
			positiveVariables += 10;
			positiveVariables += (gC(attacker).combatAffinities.social.strength - gC(attacker).combatAffinities.social.frailty) / 2;
			negativeVariables += (gC(target).combatAffinities.social.resistance - gC(target).combatAffinities.social.weakness) / 2;
			break;
	}
	
	if ( hit == false ) {
		var dice = luckedDiceThrow((gC(attacker).luck.getValue() - gC(target).luck.getValue()) * 0.5 ) * 100;
		var total = dice + positiveVariables - negativeVariables;
		
		if ( ( total ) >= 50 ) {
			hit = true;
		}
		var explanation = "Evasion: ( Dice: " + dice.toFixed(1) + ", PV: " + positiveVariables.toFixed(1) + ", NV: " + negativeVariables.toFixed(1)
						+ " ) => " + total.toFixed(1);
						
		if ( hit ) { explanation += " > 50 => HIT"; }
		else { explanation += " < 50 => EVADED"; }
	}
	
	return (new evasionResults(hit,explanation));
}
window.attackResults = function(resultValue,explanations) {
	this.resultValue = resultValue;
	this.explanations = explanations;
}
window.calculateAttackEffects = function(attackType,actor,target,attackFlavors,initialValue) {
	var total = initialValue;
	var powerUp = 0;
	var powerDown = 0;
	for ( var flavor of attackFlavors ) {
		powerUp += gC(actor).combatAffinities[flavor].strength + gC(target).combatAffinities[flavor].weakness;
		powerDown += gC(actor).combatAffinities[flavor].frailty + gC(target).combatAffinities[flavor].resistance;
	}
	var total = initialValue * (( 1 + ( powerUp * 0.01 ) ) / ( 1 + powerDown * 0.01 ));
	if ( total < 0 ) { total = 0; }
	return total;
}

window.getWeaknessToAttackText = function(attackFlavors,target) {
	var weaknessMessage = "";
	var finalWeakness = 1.0;
	var powerUp = 0;
	var powerDown = 0;
	for ( var flavor of attackFlavors ) {
		powerUp += gC(target).combatAffinities[flavor].weakness;
		powerDown += gC(target).combatAffinities[flavor].resistance;
	}
	finalWeakness = 1.0 * (1 + ( powerUp * 0.01) ) / ( 1 + powerDown * 0.01 );
	if ( finalWeakness <= 0.65 ) {
		weaknessMessage = colorText("Frail attack. ","lightcyan");
	} else if ( finalWeakness <= 0.9 ) {
		weaknessMessage = colorText("Resisted attack. ","deepskyblue");
	} else if ( finalWeakness >= 1.1 ) {
		weaknessMessage = colorText("It was effective! ","darkorange");
	} else if ( finalWeakness >= 1.5 ) {
		weaknessMessage = colorText("Devastating! ","orangered");
	}
	
	return weaknessMessage;
}

// Actions //
window.createSaStruggle = function() {
	var sa = new sceneAction();
	sa.name = "Struggle";
	sa.key = "struggle";
	sa.actionType = "struggle";
	
	sa.targetType = "single";
	
	sa.tags.push("bs","sUse");
	sa.reqTags.push("diffTarget","struggle");
	
	sa.strategyTags.push("struggle");
	
	sa.description = "The character trashes against their target to get off the ground.\n"
				   + "This attack damages the target's control. If it reaches zero, the character will be freed.\n"
				   + "\n\nStruggle."
				   + "\n\n__Influences__:\nControl damage: Proportion between actor's and target's physique, agility, resilience and will."
				   + "\nTarget's energy %, target's willpower %, target's arms state, target's legs state.";
	
	sa.doesHitLand = function(actor,target) {
		return new evasionResults(true,"");
	}
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = gC(actor).position.initiator;
		
		var flagGotOut = false;
		
		///// No evasion /////
		// Damage
		var inDamValue = ( 100 + gCstat(actor,"physique") + gCstat(actor,"agility") + gCstat(actor,"resilience") + gCstat(actor,"will") ) * 1.8
					   / ( 100 + gCstat(target,"physique") + gCstat(target,"agility") + gCstat(target,"resilience") + gCstat(target,"will") );
		inDamValue = inDamValue * ( ( 2 + getBarPercentage(actor,"energy") + getBarPercentage(actor,"willpower") ) / 4);
		if ( gC(actor).body.hasOwnProperty("arms") ) {
			if ( gC(actor).body.arms.state != "free" ) { inDamValue *= 0.8; }
		}
		if ( gC(actor).body.hasOwnProperty("legs") ) {
			if ( gC(actor).body.arms.state != "free" ) { inDamValue *= 0.8; }
		}
		var controlDamage = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
		if ( controlDamage < 0.8 ) { controlDamage = 0.8; }
		// Apply
		attackControl(target,controlDamage);
		if ( gC(target).control <= 0 ) {
			// Cancel position
			State.variables.sc.cancelPosition(target);
			// Actor recovers control
			gC(actor).lostControlTurns = 0;
			gainControlBack(actor);
			// Change description
			flagGotOut = true;
		}
		results.value = controlDamage;
		
		if ( flagGotOut ) {
			results.description += randomFromList( [
										(ktn(actor) + " pushed " + ktn(target) + " back!"),
										(ktn(actor) + " attacked " + ktn(target) + " and got free!"),
										(ktn(actor) + " managed to get free!")
									] );
		} else {
			results.description += randomFromList( [
										(ktn(actor) + " is fighting to leave " + ktn(target) + "'s clutches!"),
										(ktn(actor) + " struggles to get free!"),
										(ktn(actor) + " trashes back against " + ktn(target) + "!")
									] );
		}
		results.description += " " + ktn(target) + " received " + controlDamage.toFixed(1) + " control damage.";		
		
		return results;
	}
	return sa;
}

	// Basic sexual
	
window.createSaBaKissLips = function() {
	var sa = new sceneAction();
	sa.name = "Kiss lips";
	sa.key = "baKissLips";
	sa.actionType = "contact";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.actorBpReqs.push("mouth");
	sa.targetBpReqs.push("mouth");
	
	sa.strategyTags.push("damage","sex","useMouth","targetMouth");
	sa.affinities.push("sex","useMouth","targetMouth");
	
	sa.description = "The character holds their target's head and kisses them.\n"
				   + "This attack damages the target.\n\nSingle target action."
				   + "\n\nInfluenced by agility and perception."
				   + "\n\nSexual contact attack."
				   + "\n\n__Influences__:\nDamage: Actor's agility."
				   + "\nEvasion: Actor's agility x5, actor's perception x5, actor's control.\nTarget's agility x7, target's perception x7, target's control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.25 + gCstat(actor,"perception") * 0.25 + gC(actor).control * 4;
		var evasionMinus = gCstat(target,"agility") * 0.35 + gCstat(target,"perception") * 0.35 + gC(target).control * 4 + 10;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"agility") * 0.40;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Apply
			gC(target).lust.attack(-damage);
			results.value = damage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " kissed " + ktn(target) + "'s lips."),
										(ktn(actor) + " placed " + gC(actor).posPr + " own lips on " + ktn(target) + "'s."),
										(ktn(actor) + " tempted " + ktn(target) + "'s lips with " + gC(actor).posPr + " own.")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to kiss " + ktn(target) + ", but failed!\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

window.createSaBaStrokeDick = function() {
	var sa = new sceneAction();
	sa.name = "Handjob";
	sa.key = "baStrokeDick";
	sa.actionType = "contact";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.actorBpReqs.push("arms");
	sa.targetBpReqs.push("dick");
	
	sa.strategyTags.push("damage","sex","useArms","targetDick");
	sa.affinities.push("sex","useArms","targetDick");
	
	sa.description = "The character massages a dick.\n"
				   + "This attack damages the target.\n\nSingle target action."
				   + "\n\nSexual contact attack."
				   + "\n\n__Influences__:\nDamage: Actor's agility."
				   + "\nEvasion: Actor's agility x5, actor's perception x5, actor's control.\nTarget's agility x7, target's perception x7, target's control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.25 + gCstat(actor,"perception") * 0.25 + gC(actor).control * 4;
		var evasionMinus = gCstat(target,"agility") * 0.35 + gCstat(target,"perception") * 0.35 + gC(target).control * 4 + 20;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"agility") * 0.5;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Apply
			gC(target).lust.attack(-damage);
			results.value = damage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " stroked " + ktn(target) + "'s " + dickWord() + "."),
										(ktn(actor) + " massaged " + ktn(target) + "'s " + dickWord() + "."),
										(ktn(actor) + " masturbated " + ktn(target) + "'s " + dickWord() + ".")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to kiss " + ktn(target) + ", but failed!\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

window.createSaBaStrokePussy = function() {
	var sa = new sceneAction();
	sa.name = "Stroke pussy";
	sa.key = "baStrokePussy";
	sa.actionType = "contact";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.actorBpReqs.push("arms");
	sa.targetBpReqs.push("pussy");
	
	sa.strategyTags.push("damage","sex","useArms","targetPussy");
	sa.affinities.push("sex","useArms","targetPussy");
	
	sa.description = "The character strokes a pussy.\n"
				   + "This attack damages the target.\n\nSingle target action."
				   + "\n\nSexual contact attack."
				   + "\n\n__Influences__:\nDamage: Actor's agility."
				   + "\nEvasion: Actor's agility x5, actor's perception x5, actor's control.\nTarget's agility x7, target's perception x7, target's control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.25 + gCstat(actor,"perception") * 0.25 + gC(actor).control * 4;
		var evasionMinus = gCstat(target,"agility") * 0.35 + gCstat(target,"perception") * 0.35 + gC(target).control * 4 + 20;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"agility") * 0.5;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Apply
			gC(target).lust.attack(-damage);
			results.value = damage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " stroked " + ktn(target) + "'s " + pussyWord() + "."),
										(ktn(actor) + " caressed " + ktn(target) + "'s " + pussyWord() + "."),
										(ktn(actor) + " masturbated " + ktn(target) + "'s " + pussyWord() + ".")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to kiss " + ktn(target) + ", but failed!\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

	// Pounces and derived sexual
	
window.createSaD2PfrontalPounce = function() {
	var sa = new sceneAction();
	sa.name = "Frontal Pounce D2P";
	sa.key = "pounceFrontalD2P";
	
	sa.actionType = "pounce";
	sa.targetType = "single";
	sa.energyCost = 5;
	
	sa.tags.push("bs","bPos");
	sa.reqTags.push("diffTarget","control");
	sa.actorBpReqs.push("legs","dick");
	sa.targetBpReqs.push("pussy");
	
	sa.strategyTags.push("pounce","bPos","useDick","targetPussy","frontal");
	sa.affinities.push("sex","pounce","useDick","targetPussy");
	
	sa.description = "The character pushes their target to the ground and initiates vaginal penetration.\n"
				   + "Costs 5 energy.\n\nSingle target action."
				   + "\nActor requires control and free legs and dick, target requires free pussy."
				   + "\n\nPounce attack."
				   + "\n\n__Influences__:\nDamage: Actor's physique x3, actor's agility x1.\nContinued damage and self damage: Actor's and target's physique x1, actor's and target's resilience x1."
				   + "\nEvasion: Actor's agility x5, actor's physique x5, actor's control.\nTarget's agility x7, target's physique x7, target's control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"physique") * 0.25 + gCstat(actor,"agility") * 0.25 + gC(actor).control * 5;
		var evasionMinus = gCstat(target,"physique") * 0.35 + gCstat(target,"agility") * 0.35 + gC(target).control * 15;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Initial damage
			var inDamValue = gCstat(actor,"physique") * 0.3 + gCstat(actor,"agility") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Apply
			gC(target).lust.attack(-damage);
			depleteControl(target);
			results.value = damage;
			
			// Position
			createBposDP2frontalPounce(actor,[target]);
				
			// Try virginities
			if ( gC(target).virginities.pussy.taken == false ) {
				var vd2 = gC(actor).name + " has taken " + gC(target).name + "'s vaginal virginity!";
				gC(target).virginities.pussy.tryTakeVirginity(actor,"pounceFrontalD2P",vd2);
			}
			if ( gC(actor).virginities.dick.taken == false ) {
				var vd1 = gC(target).name + " has taken " + gC(actor).name + "'s penile virginity!";
				gC(actor).virginities.dick.tryTakeVirginity(actor,"pounceFrontalD2P",vd1);
			}			
				
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " pushed " + ktn(target) + " to the ground and started fucking " + gC(target).posPr + " " + pussyWord() + "."),
										(ktn(actor) + " pounced on " + ktn(target) + " and mounted " + gC(target).comPr + "."),
										(ktn(actor) + " jumped on " + ktn(target) + " and penetrated " + gC(target).comPr + ".")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". " + generateSaCostsText(this,actor)
								 + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to pounce on " + ktn(target) + ", but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

window.createSaBaThrust = function() {
	var sa = new sceneAction();
	sa.name = "Thrust";
	sa.key = "baThrust";
	sa.actionType = "contact";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredActiveCAs.push("baPenetratePussy");
	
	sa.strategyTags.push("damage","sex","useDick","targetPussy");
	sa.affinities.push("sex","useDick","targetPussy");
	
	sa.description = "The character pushes their cock into their target's folds. Actor and target must already be connected.\n"
				   + "This attack damages the target, and the actor receives some retaliation.\n\nSingle target action."
				   + "\n\nSexual contact attack."
				   + "\n\n__Influences__:\nDamage: Actor's physique x3, actor's agility x1, target's resilience x-1.\nSelf damage: Target's physique x1, target's agility x1, actor's resilience x-1.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = 1;
		var evasionMinus = 1;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"physique") * 0.6 + gCstat(actor,"agility") * 0.2 - gCstat(target,"resilience") * 0.2;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Retaliation
			var altAffinities = [ "sex","usePussy","targetDick" ];
			var inDamValue2 = gCstat(target,"physique") * 0.1 + gCstat(target,"agility") * 0.1 - gCstat(actor,"resilience") * 0.1;
			inDamValue2 = addLuckFactor(inDamValue2,0.1,gCstat(target,"luck"));
			var damage2 = calculateAttackEffects("lust",target,actor,altAffinities,inDamValue2);			
			// Apply
			gC(target).lust.attack(-damage);
			gC(actor).lust.attack(-damage2);
			results.value = damage;
			// Description
			results.description += randomFromList( [
									(ktn(actor) + " pushed " + gC(actor).posPr + " " + dickWord() + " deep into " + ktn(target) + "."),
									(ktn(actor) + " thrusted into " + ktn(target) + "."),
									(ktn(actor) + " penetrated " + ktn(target) + "'s " + randomFromList(["insides","pussy"]) + ".")
								] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". " + ktn(actor) + " received " + textLustDamage(damage2)
								 + " in retaliation.\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = "This shouldn't happen.";
		}
		
		return results;
	}
	return sa;
}

window.createSaBaPushHipsBack = function() {
	var sa = new sceneAction();
	sa.name = "Push hips back";
	sa.key = "baPushHipsBack";
	sa.actionType = "contact";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredPassiveCAs.push("baPenetratePussy");
	
	sa.strategyTags.push("damage","sex","usePussy","targetDick");
	sa.affinities.push("sex","usePussy","targetDick");
	
	sa.description = "The character pushes their hips back against someone else's dick. Target must already be penetrating the actor.\n"
				   + "This attack damages the target, and the actor receives some retaliation.\n\nSingle target action."
				   + "\n\nInfluenced by physique, agility and resilience."
				   + "\n\nSexual contact attack."
				   + "\n\n__Influences__:\nDamage: Actor's physique x4, actor's agility x1, target's resilience x-1.\nSelf damage: Target's physique x1, target's agility x1, actor's resilience x-1.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = 1;
		var evasionMinus = 1;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"physique") * 0.4 + gCstat(actor,"agility") * 0.1 - gCstat(target,"resilience") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Retaliation
			var altAffinities = [ "sex","useDick","targetPussy" ];
			var inDamValue2 = gCstat(target,"physique") * 0.1 + gCstat(target,"agility") * 0.1 - gCstat(actor,"resilience") * 0.1;
			inDamValue2 = addLuckFactor(inDamValue2,0.1,gCstat(target,"luck"));
			var damage2 = calculateAttackEffects("lust",target,actor,altAffinities,inDamValue2);			
			// Apply
			gC(target).lust.attack(-damage);
			gC(actor).lust.attack(-damage2);
			results.value = damage;
			// Description
			results.description += randomFromList( [
								(ktn(actor) + " pressed " + gC(actor).posPr + " hips back against " + ktn(target)
								+ ", getting impaled in " + gC(target).posPr + " their " + dickWord() + "."),
								(ktn(actor) + " pushed " + gC(actor).posPr + " " + pussyWord() + " hard against  "
								+ ktn(target) + "'s " + dickWord() + ".")
								] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". " + ktn(actor) + " received " + textLustDamage(damage2)
								 + " in retaliation.\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = "This shouldn't happen.";
		}
		
		return results;
	}
	return sa;
}

window.createSaP2PfrontalPounce = function() {
	var sa = new sceneAction();
	sa.name = "Frontal Pounce P2P";
	sa.key = "pounceFrontalP2P";
	
	sa.actionType = "pounce";
	sa.targetType = "single";
	sa.energyCost = 5;
	
	sa.tags.push("bs","bPos");
	sa.reqTags.push("diffTarget","control");
	sa.actorBpReqs.push("legs","pussy");
	sa.targetBpReqs.push("pussy");
	
	sa.strategyTags.push("pounce","bPos","usePussy","targetPussy","frontal");
	sa.affinities.push("sex","pounce","usePussy","targetPussy");
	
	sa.description = "The character pushes their target to the ground and initiates scissoring.\n"
				   + "Costs 5 energy.\n\nSingle target action."
				   + "\nActor requires control and free legs and pussy, target requires free pussy."
				   + "\n\nPounce attack."
				   + "\n\n__Influences__:\nDamage: Actor's physique x3, actor's agility x1.\nContinued damage and self damage: Actor's and target's physique x1, actor's and target's resilience x1."
				   + "\nEvasion: Actor's agility x5, actor's physique x5, actor's control.\nTarget's agility x7, target's physique x7, target's control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"physique") * 0.25 + gCstat(actor,"agility") * 0.25 + gC(actor).control * 5;
		var evasionMinus = gCstat(target,"perception") * 0.35 + gCstat(target,"agility") * 0.35 + gC(target).control * 15;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Initial damage
			var inDamValue = gCstat(actor,"physique") * 0.3 + gCstat(actor,"agility") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Apply
			gC(target).lust.attack(-damage);
			depleteControl(target);
			results.value = damage;
			
			// Position
			createBposP2PfrontalPounce(actor,[target]);
				
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " pushed " + ktn(target) + " to the ground and started rubbing herself against " + gC(target).posPr
										+ " " + pussyWord() + "."),
										(ktn(actor) + " pounced on " + ktn(target) + " and began scissoring " + gC(target).comPr + ".")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". " + generateSaCostsText(this,actor)
								 + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to pounce on " + ktn(target) + ", but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

window.createSaBaScissor = function() {
	var sa = new sceneAction();
	sa.name = "Scissor";
	sa.key = "baScissor";
	sa.actionType = "contact";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredActiveCAs.push("baScissoring");
	
	sa.strategyTags.push("damage","sex","usePussy","targetPussy");
	sa.affinities.push("sex","usePussy","targetPussy");
	
	sa.description = "The character rubs their intimate parts against their target's. Actor and target must already be scissoring.\n"
				   + "This attack damages the target, and the actor receives some retaliation.\n\nSingle target action."
				   + "\n\nSexual contact attack."
				   + "\n\n__Influences__:\nDamage: Actor's physique x3, actor's agility x1, target's resilience x-1.\nSelf damage: Target's physique x1, target's agility x1, actor's resilience x-1.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = 1;
		var evasionMinus = 1;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"physique") * 0.6 + gCstat(actor,"agility") * 0.2 - gCstat(target,"resilience") * 0.2;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Retaliation
			var altAffinities = [ "sex","usePussy","targetPussy" ];
			var inDamValue2 = gCstat(target,"physique") * 0.1 + gCstat(target,"agility") * 0.1 - gCstat(actor,"resilience") * 0.1;
			inDamValue2 = addLuckFactor(inDamValue2,0.1,gCstat(target,"luck"));
			var damage2 = calculateAttackEffects("lust",target,actor,altAffinities,inDamValue2);			
			// Apply
			gC(target).lust.attack(-damage);
			gC(actor).lust.attack(-damage2);
			results.value = damage;
			// Description
			results.description += randomFromList( [
									(ktn(actor) + " frotted " + gC(actor).posPr + " own " + pussyWord() + " against " + ktn(target) + "'s."),
									(ktn(actor) + " slid " + gC(actor).posPr + " groin through " + ktn(target) + "'s " + pussyWord() + ", seeking pleasure."),
									(ktn(actor) + " squeezed " + ktn(target) + "'s groin against " + gC(actor).posPr + " own " + pussyWord() + ".")
								] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". " + ktn(actor) + " received " + textLustDamage(damage2)
								 + " in retaliation.\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = "This shouldn't happen.";
		}
		
		return results;
	}
	return sa;
}

window.createSaBaScissorBack = function() {
	var sa = new sceneAction();
	sa.name = "Scissor back";
	sa.key = "baScissorBack";
	sa.actionType = "contact";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredPassiveCAs.push("baScissoring");
	
	sa.strategyTags.push("damage","sex","usePussy","targetPussy");
	sa.affinities.push("sex","usePussy","targetPussy");
	
	sa.description = "The character pushes their groin back against their target's in retaliation. Target and actor must be scissoring.\n"
				   + "This attack damages the target, and the actor receives some retaliation.\n\nSingle target action."
				   + "\n\nSexual contact attack."
				   + "\n\n__Influences__:\nDamage: Actor's physique x3, actor's agility x1, target's resilience x-1.\nSelf damage: Target's physique x1, target's agility x1, actor's resilience x-1.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = 1;
		var evasionMinus = 1;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"physique") * 0.4 + gCstat(actor,"agility") * 0.1 - gCstat(target,"resilience") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Retaliation
			var altAffinities = [ "sex","usePussy","targetPussy" ];
			var inDamValue2 = gCstat(target,"physique") * 0.1 + gCstat(target,"agility") * 0.1 - gCstat(actor,"resilience") * 0.1;
			inDamValue2 = addLuckFactor(inDamValue2,0.1,gCstat(target,"luck"));
			var damage2 = calculateAttackEffects("lust",target,actor,altAffinities,inDamValue2);			
			// Apply
			gC(target).lust.attack(-damage);
			gC(actor).lust.attack(-damage2);
			results.value = damage;
			// Description
			results.description += randomFromList( [
								(ktn(actor) + " locked " + ktn(target) + " back with " + gC(actor).posPr + " own legs, and frotted " + gC(actor).refPr + " against " + gC(target).comPr + "."),
								(ktn(actor) + " rubbed " + gC(actor).posPr + " own " + pussyWord() + " against " + ktn(target) + ".")
							] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". " + ktn(actor) + " received " + textLustDamage(damage2)
								 + " in retaliation.\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = "This shouldn't happen.";
		}
		
		return results;
	}
	return sa;
}


window.createSaP2DfrontalPounce = function() {
	var sa = new sceneAction();
	sa.name = "Frontal Pounce P2D";
	sa.key = "pounceFrontalP2D";
	
	sa.actionType = "pounce";
	sa.targetType = "single";
	sa.energyCost = 5;
	
	sa.tags.push("bs","bPos");
	sa.reqTags.push("diffTarget","control");
	sa.actorBpReqs.push("legs","pussy");
	sa.targetBpReqs.push("dick");
	
	sa.strategyTags.push("pounce","bPos","usePussy","targetDick","frontal");
	sa.affinities.push("sex","pounce","usePussy","targetDick");
	
	sa.description = "The character pushes their target to the ground and rides their target's dick.\n"
				   + "Costs 5 energy.\n\nSingle target action."
				   + "\nActor requires control and free legs and pussy, target requires free dick."
				   + "\n\nPounce attack."
				   + "\n\n__Influences__:\nDamage: Actor's physique x3, actor's agility x1.\nContinued damage and self damage: Actor's and target's physique x1, actor's and target's resilience x1."
				   + "\nEvasion: Actor's agility x5, actor's physique x5, actor's control.\nTarget's agility x7, target's physique x7, target's control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"physique") * 0.25 + gCstat(actor,"agility") * 0.25 + gC(actor).control * 5;
		var evasionMinus = gCstat(target,"perception") * 0.35 + gCstat(target,"agility") * 0.35 + gC(target).control * 15;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Initial damage
			var inDamValue = gCstat(actor,"physique") * 0.3 + gCstat(actor,"agility") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Apply
			applyBarDamage(target,"lust",-damage);
			results.value = damage;
			
			// Position
			createBposP2DfrontalPounce(actor,[target]);
				
			// Try virginities
			if ( gC(target).virginities.dick.taken == false ) {
				var vd2 = gC(actor).name + " has taken " + gC(target).name + "'s penile virginity!";
				gC(target).virginities.dick.tryTakeVirginity(actor,"pounceFrontalP2D",vd2);
			}
			if ( gC(actor).virginities.pussy.taken == false ) {
				var vd1 = gC(target).name + " has taken " + gC(actor).name + "'s vaginal virginity!";
				gC(actor).virginities.pussy.tryTakeVirginity(actor,"pounceFrontalP2D",vd1);
			}			
				
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " pushed " + ktn(target) + " to the ground and began riding " + gC(target).posPr + " " + dickWord() + "."),
										(ktn(actor) + " jumped on " + ktn(target) + " and lowered " + gC(actor).refPr + " down " + gC(target).posPr + " " + dickWord() + "."),
										(ktn(actor) + " pounced on " + ktn(target) + ", who saw " + gC(target).posPr + " " + dickWord() + " being engulfed by " + ktn(actor) + "'s " + pussyWord() + ".")
										
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". " + generateSaCostsText(this,actor)
								 + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to pounce on " + ktn(target) + ", but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

window.createSaBaRideDick = function() {
	var sa = new sceneAction();
	sa.name = "Ride dick";
	sa.key = "baRideDick";
	sa.actionType = "contact";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredActiveCAs.push("baRidingDick");
	
	sa.strategyTags.push("damage","sex","usePussy","targetDick");
	sa.affinities.push("sex","usePussy","targetDick");
	
	sa.description = "The character forces their target's dick within themself. The character must already be riding their target.\n"
				   + "This attack damages the target, and the actor receives some retaliation.\n\nSingle target action."
				   + "\n\nSexual contact attack."
				   + "\n\n__Influences__:\nDamage: Actor's physique x3, actor's agility x1, target's resilience x-1.\nSelf damage: Target's physique x1, target's agility x1, actor's resilience x-1.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = 1;
		var evasionMinus = 1;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"physique") * 0.6 + gCstat(actor,"agility") * 0.2 - gCstat(target,"resilience") * 0.2;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Retaliation
			var altAffinities = [ "sex","usePussy","targetDick" ];
			var inDamValue2 = gCstat(target,"physique") * 0.1 + gCstat(target,"agility") * 0.1 - gCstat(actor,"resilience") * 0.1;
			inDamValue2 = addLuckFactor(inDamValue2,0.1,gCstat(target,"luck"));
			var damage2 = calculateAttackEffects("lust",target,actor,altAffinities,inDamValue2);			
			// Apply
			gC(target).lust.attack(-damage);
			gC(actor).lust.attack(-damage2);
			results.value = damage;
			// Description
			results.description += randomFromList( [
									(ktn(actor) + " moved up and down through " + ktn(target) + "'s " + dickWord()),
									(ktn(actor) + " pushed " + gC(actor).posPr + " butt down against " + ktn(target) + ", taking " + gC(target).posPr + " whole " + dickWord() + " in the process."),
									(ktn(actor) + "'s " + pussyWord() + " tightens on " + ktn(target) + "'s " + dickWord() + ", without giving it a pause to breathe.")
								] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". " + ktn(actor) + " received " + textLustDamage(damage2)
								 + " in retaliation.\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = "This shouldn't happen.";
		}
		
		return results;
	}
	return sa;
}

window.createSaBaPushDickBack = function() {
	var sa = new sceneAction();
	sa.name = "Push dick back";
	sa.key = "baPushDickBack";
	sa.actionType = "contact";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredPassiveCAs.push("baRidingDick");
	
	sa.strategyTags.push("damage","sex","useDick","targetPussy");
	sa.affinities.push("sex","useDick","targetPussy");
	
	sa.description = "The character pushes their dick back against their target's in retaliation. Target must be riding the character.\n"
				   + "This attack damages the target, and the actor receives some retaliation.\n\nSingle target action."
				   + "\n\nSexual contact attack."
				   + "\n\n__Influences__:\nDamage: Actor's physique x3, actor's agility x1, target's resilience x-1.\nSelf damage: Target's physique x1, target's agility x1, actor's resilience x-1.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = 1;
		var evasionMinus = 1;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"physique") * 0.4 + gCstat(actor,"agility") * 0.1 - gCstat(target,"resilience") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Retaliation
			var altAffinities = [ "sex","useDick","targetPussy" ];
			var inDamValue2 = gCstat(target,"physique") * 0.1 + gCstat(target,"agility") * 0.1 - gCstat(actor,"resilience") * 0.1;
			inDamValue2 = addLuckFactor(inDamValue2,0.1,gCstat(target,"luck"));
			var damage2 = calculateAttackEffects("lust",target,actor,altAffinities,inDamValue2);			
			// Apply
			applyBarDamage(target,"lust",-damage);
			//gC(target).lust.attack(-damage);
			applyBarDamage(actor,"lust",-damage2);
			//gC(actor).lust.attack(-damage2);
			results.value = damage;
			// Description
			results.description += randomFromList( [
								(ktn(actor) + " pushed " + gC(actor).posPr + " " + dickWord() + " back against " + ktn(target) + "'s folds."),
								(ktn(actor) + " penetrates " + ktn(target) + " in retaliation."),
								(ktn(actor) + " struggles to push " + gC(actor).refPr + " deep within " + ktn(target) + ".")
							] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". " + ktn(actor) + " received " + textLustDamage(damage2)
								 + " in retaliation.\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = "This shouldn't happen.";
		}
		
		return results;
	}
	return sa;
}

	// Draining
	
window.createSaBaEnergyDrainingKiss = function() {
	var sa = new sceneAction();
	sa.name = "Energy Draining Kiss";
	sa.key = "baEnergyDrainingKiss";
	sa.actionType = "contact";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.actorBpReqs.push("mouth");
	sa.targetBpReqs.push("mouth");
	
	sa.strategyTags.push("damage","sex","useMouth","targetMouth","drain","damageEnergy");
	sa.affinities.push("sex","useMouth","targetMouth","drain");
	
	sa.description = "The character kisses their target and drains their energy.\n"
				   + "This attack damages the target and drains their energy.\n\nSingle target action."
				   + "\n\nSexual draining contact attack."
				   + "\n\n__Influences__:\nDrain damage, energy drain damage: Actor's agility x3, actor's empathy x2."
				   + "\nEvasion: Actor's agility x5, actor's perception x5, actor's control.\nTarget's agility x7, target's perception x7, target's control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.25 + gCstat(actor,"perception") * 0.25 + gC(actor).control * 4;
		var evasionMinus = gCstat(target,"agility") * 0.35 + gCstat(target,"perception") * 0.35 + gC(target).control * 4 + 10;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"agility") * 0.15 + gCstat(actor,"empathy") * 0.10;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			
			var inEnergyDrain = gCstat(actor,"agility") * 0.15 + gCstat(actor,"empathy") * 0.10;
			inEnergyDrain = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var energyDrain = calculateAttackEffects("lust",actor,target,this.affinities,inEnergyDrain);
			// Apply
			applyBarDamage(target,"lust",-damage);
			// gC(target).lust.attack(-damage);
			results.value = damage;
			var overflowMsg = applyBarDamage(target,"energy",-energyDrain);
			// gC(target).energy.attack(-energyDrain);
			gC(actor).energy.changeValue(energyDrain);
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " took " + ktn(target) + "'s lips, stealing " + gC(target).posPr + " energy."),
										(ktn(actor) + " placed " + gC(actor).posPr + " own lips on " + ktn(target) + "'s and sucked " + gC(target).posPr + " energy out."),
										(ktn(target) + " felt " + gC(target).posPr + " energy slipping away when " + ktn(actor) + " kissed her.")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". " + ktn(actor) + " drained "
								 + textEnergyDamage(energyDrain) + " from " + ktn(target) + "." + overflowMsg
								 + "\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to kiss " + ktn(target) + ", but failed!\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}
 
window.createSaBaDrainingKiss = function() {
	var sa = new sceneAction();
	sa.name = "Draining Kiss";
	sa.key = "baDrainingKiss";
	sa.actionType = "contact";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.actorBpReqs.push("mouth");
	sa.targetBpReqs.push("mouth");
	
	sa.strategyTags.push("damage","sex","useMouth","targetMouth","drain");
	sa.affinities.push("sex","useMouth","targetMouth","drain");
	
	sa.description = "The character kisses their target and drains their focus.\n"
				   + "This attack damages the target and heals the user.\n\nSingle target action."
				   + "\n\nSexual draining contact attack."
				   + "\n\n__Influences__:\nDrain damage: Actor's agility x2, actor's empathy x1."
				   + "\nEvasion: Actor's agility x5, actor's perception x5, actor's control.\nTarget's agility x7, target's perception x7, target's control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.25 + gCstat(actor,"perception") * 0.25 + gC(actor).control * 4;
		var evasionMinus = gCstat(target,"agility") * 0.35 + gCstat(target,"perception") * 0.35 + gC(target).control * 4 + 10;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"agility") * 0.2 + gCstat(actor,"empathy") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			
			// Apply
			applyBarDamage(target,"lust",-damage);
			// gC(target).lust.attack(-damage);
			gC(actor).lust.changeValue(damage);
			results.value = damage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " took " + ktn(target) + "'s lips, stealing " + gC(target).posPr + " focus."),
										(ktn(actor) + " placed " + gC(actor).posPr + " own lips on " + ktn(target) + "'s and sucked " + gC(target).posPr + " concentration out."),
										(ktn(target) + " felt " + gC(target).posPr + " focus slipping away when " + ktn(actor) + " kissed her.")
									] );
			results.description += " " + dmgEffMsg + ktn(actor) + " drained " + textLustDamage(damage) + " from " + ktn(target)
								 + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to kiss " + ktn(target) + ", but failed!\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}


	// Physical

window.createSaKick = function() {
	var sa = new sceneAction();
	sa.name = "Kick";
	sa.key = "kick";
	
	sa.actionType = "hit";
	sa.targetType = "single";
	sa.energyCost = 2;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget","control");
	sa.actorBpReqs.push("legs");
	
	sa.requiresFree = true;
	
	sa.strategyTags.push("damage","physical","consumeEnergy","physicalDamage","damageControl","useLegs");
	sa.affinities.push("physical","kick");
	
	sa.description = "The character focuses their energy on their leg and foot to land a hit on their target.\n"
				   + "This attack damages the target and erodes their control.\nCosts 2 energy.\n\nSingle target action."
				   + "Actor requires control and free legs."
				   + "\n\nPhysical hit attack."
				   + "\n\n__Influences__:\nDamage: Actor's physique x5, actor's resilience x3, target's resilience x-2."
				   + "\nEvasion: Actor's agility x5, actor's perception x5, actor's control.\nTarget's agility x7, target's perception x7, target's control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.25 + gCstat(actor,"perception") * 0.25 + gC(actor).control * 4;
		var evasionMinus = gCstat(target,"agility") * 0.35 + gCstat(target,"perception") * 0.35 + gC(target).control * 4;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"physique") * 0.25 + gCstat(actor,"resilience") * 0.15 - gCstat(target,"resilience") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Control damage
			var controlDamage = 1.6; // 1.6 ~ 2.6
			controlDamage += ((luckedDiceThrow(gCstat(actor,"luck")) * 0.05) + (gCstat(actor,"physique") * 0.005));
			// Apply
			applyBarDamage(target,"lust",-damage);
			attackControl(target,controlDamage);
			results.value = damage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " landed a clean kick on " + ktn(target) + "."),
										(ktn(actor) + " struck a kick on " + ktn(target) + "."),
										(ktn(actor) + "'s foot provoked some ugly damage against " + ktn(target) + ".")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + " and " + controlDamage.toFixed(1)
								 + " control damage. " + generateSaCostsText(this,actor)
								 + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to kick " + ktn(target) + ", but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

window.createSaColdGuts = function() {
	var sa = new sceneAction();
	sa.name = "Cold guts";
	sa.key = "coldGuts";
	
	sa.actionType = "special";
	sa.targetType = "self";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	
	sa.actorDisabledByAs = [ "CoGu" ];
	
	sa.strategyTags.push("buff","physical","alteredState","buffResilience","buffPhysique","buffWillpower","buffResistanceSex");
	sa.affinities.push();
	
	sa.description = "The character focuses their inner energy to gain higher resistance against any trial.\n"
				   + "The action increases the actor's physique, resilience, willpower and resistance to sex actions.\n\nSelf targeted action."
				   + "\n\nPhysical special attack."
				   + "\n\n__Influences__:\nIntensity: Actor's physique x1, actor's resilience x1, actor's will x1."; 
				   
	sa.doesHitLand = function(actor,target) {
		return new evasionResults(true,"");
	}		   				   
	
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = actor;
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Altered State
			var inIntensity = (gCstat(actor,"physique") + gCstat(actor,"resilience") + gCstat(actor,"will")) * 0.05;
			var asIntensity = addLuckFactor(inIntensity,0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			var altState = createAScoldGuts(asIntensity);
			// Apply
			applyAlteredState([actor],altState);
			results.value = asIntensity;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " is concentrating in properly using " + gC(actor).posPr + " inner energy."),
										(ktn(actor) + " is now focused."),
										(ktn(actor) + " has cleared " + gC(actor).posPr + " mind and is now ready.")
									] );
			// results.description += " " + ktn(target) + " received " + textLustDamage(damage) + ". " + generateSaCostsText(this,actor)
			//					 + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = "This shouldn't ever happen. Please notify me.";
		}
		
		return results;
	}
	return sa;
}

window.createSaCatAspect = function() {
	var sa = new sceneAction();
	sa.name = "Cat aspect";
	sa.key = "catAspect";
	
	sa.actionType = "special";
	sa.targetType = "self";
	
	sa.energyCost = 2;
	sa.willpowerCost = 2;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	
	sa.requiredRace = [ "beastkin" ];
	sa.actorDisabledByAs = [ "CaAs" ];
	
	sa.strategyTags.push("buff","physical","alteredState","buffAgility","buffPerception","buffControlRecovery");
	sa.affinities.push();
	
	sa.description = "The character enters in contact with their feline self, increasing their capabilities.\n"
				   + "The action increases the actor's agility, perception, control recovery and pounce affinity.\n\nSelf targeted action."
				   + "\n\nPhysical special attack."
				   + "\n\n__Influences__:\nIntensity: Actor's agility x1, actor's will x1, actor's luck x1."; 
				   
	sa.doesHitLand = function(actor,target) {
		return new evasionResults(true,"");
	}		   				   
	
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = actor;
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Altered State
			var inIntensity = (gCstat(actor,"agility") * 3 + gCstat(actor,"will") + gCstat(actor,"luck")) / 30;
			var asIntensity = addLuckFactor(inIntensity,0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			var altState = createAScatAspect(asIntensity);
			// Apply
			applyAlteredState([actor],altState);
			results.value = asIntensity;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + "'s eyes have darkened, and " + gC(actor).posPr + " nails are looking sharper. " + ktn(actor) + " is turning into a Cat Aspect."),
										(ktn(actor) + " feels the Cat's nimbleness flow through " + gC(actor).posPr + " body.")
									] );
			 results.description += " " + generateSaCostsText(this,actor);
		} else { // Hit fails
			results.value = 0;
			results.description = "This shouldn't ever happen. Please notify me.";
		}
		
		return results;
	}
	return sa;
}

		// Pain
		
window.createSaBaScratch = function() {
	var sa = new sceneAction();
	sa.name = "Scratch";
	sa.key = "baScratch";
	
	sa.actionType = "contact";
	sa.targetType = "single";
	sa.energyCost = 3;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("arms");
	
	sa.strategyTags.push("damage","physical","consumeEnergy","painDamage","stackPain","useArms","debuff");
	sa.affinities.push("pain");
	
	sa.description = "The character cuts their target with their claws.\n"
				   + "This attack damages the target's lust and energy, erodes their agility, increases their energy cost and weakness to pain damage.\nCosts 1 energy.\n\nSingle target action."
				   + "Actor requires free arms."
				   + "\n\nPain contact attack."
				   + "\n\n__Influences__:\nDamage, energy damage: Actor's agility x4, actor's physique x2, target's agility x-1, target's resilience x-1.\nEvasion: Actor's agility x7, actor's perception x5, target's agility x-5, target's perception x-5, actor's and target's control."; 
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.35 + gCstat(actor,"perception") * 0.25 + gC(actor).control * 4;
		var evasionMinus = gCstat(target,"agility") * 0.25 + gCstat(target,"perception") * 0.25 + gC(target).control * 4;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   				   		
		
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"physique") * 0.08 + gCstat(actor,"agility") * 0.16 - gCstat(target,"agility") * 0.04 - gCstat(target,"resilience") * 0.04;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var inDamValue2 = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var damage2 = calculateAttackEffects("energy",actor,target,this.affinities,inDamValue2);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Altered state
			var asIntensity = addLuckFactor((gCstat(actor,"agility") * 0.06 + gCstat(actor,"perception") * 0.09),0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			var altState = createASscratched(asIntensity);
			// Apply
			applyBarDamage(target,"lust",-damage);
			applyBarDamage(target,"energy",-damage2);
			applyAlteredState([target],altState);
			results.value = damage;
			
			// Description
			results.description += randomFromList( [
										(ktn(actor) + "'s claws marked " + ktn(target) + "'s skin."),
										(ktn(actor) + " pierced " + ktn(target) + " with " + gC(actor).posPr + " claws."),
										(ktn(actor) + " scratched " + ktn(target) + ".")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + " and " + textEnergyDamage(damage2) + ". " + generateSaCostsText(this,actor)
								 + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to kick " + ktn(target) + ", but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}


	// Magic

window.createSaEmbers = function() {
	var sa = new sceneAction();
	sa.name = "Embers";
	sa.key = "embers";
	
	sa.actionType = "projectile";
	sa.targetType = "single";
	sa.willpowerCost = 2;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.strategyTags.push("damage","magic","fire");
	sa.affinities.push("magic","fire");
	
	sa.description = "The character casts ignited dust and throws it against their target.\n"
				   + "This attack damages the target.\nCosts 2 willpower.\n\nSingle target action."
				   + "\n\nMagical fire projectile attack."
				   + "\n\n__Influences__:\nDamage: Actor's intelligence x3, actor's will x2, target's will x-1, target's resilience x-1.\nEvasion: Actor's intelligence x1, actor's perception x1, target's perception x-1, target's will x-1, actor's and target's control."; 
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"intelligence") * 0.25 + gCstat(actor,"perception") * 0.25 + gC(actor).control * 2 + 15;
		var evasionMinus = gCstat(target,"will") * 0.25 + gCstat(target,"perception") * 0.25 + gC(target).control * 2;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   				   
	
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"intelligence") * 0.3 + gCstat(actor,"will") * 0.2 - gCstat(target,"will") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Apply
			applyBarDamage(target,"lust",-damage);
			// gC(target).lust.attack(-damage);
			results.value = damage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " threw burning dust against " + ktn(target) + "!"),
										(ktn(actor) + " casted ignited ashes and launched them towards " + ktn(target) + "."),
										(ktn(actor) + " burned " + ktn(target) + "'s skin with flying ashes.")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". " + generateSaCostsText(this,actor)
								 + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to burn " + ktn(target) + " with some embers, but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

window.createSaFreezeFeet = function() {
	var sa = new sceneAction();
	sa.name = "Freeze feet";
	sa.key = "freezeFeet";
	sa.actionType = "projectile";
	sa.targetType = "single";
	sa.willpowerCost = 3;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.strategyTags.push("debuff","damage","magic","ice","control","damageEnergy","damageControl","alteredState");
	sa.affinities.push("magic","ice");
	
	sa.description = "The character casts a frozen air stream aimed at their target's legs.\n"
				   + "This attack damages the target and reduces their energy, control and agility.\n\nSingle target action."
				   + "\n\nMagical ice projectile attack."
				   + "\n\n__Influences__:\nDamage: Actor's intelligence x2, actor's will x1, target's will x-1, target's resilience x-1.\nEnergy damage: Actor's intelligence x2, actor's will x1.\nEvasion: Actor's intelligence x7, actor's perception x3, target's will x-5, actor's and target's control."; 
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"intelligence") * 0.35 + gCstat(actor,"will") * 0.15 + gC(actor).control * 2 + 15;
		var evasionMinus = gCstat(target,"will") * 0.5 + gC(target).control * 2;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"intelligence") * 0.2 + gCstat(actor,"will") * 0.1 - gCstat(target,"will") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Energy damage
			var inEnDamValue = gCstat(actor,"intelligence") * 0.1 + gCstat(actor,"will") * 0.05;
			inEnDamValue = addLuckFactor(inEnDamValue,0.1,gCstat(actor,"luck"));
			var energyDamage = calculateAttackEffects("energy",actor,target,this.affinities,inEnDamValue);
			// Control damage
			var controlDamage = 0.9; // 0.9 ~ 1.6
			controlDamage += ((luckedDiceThrow(gCstat(actor,"luck")) * 0.2) + (gCstat(actor,"intelligence") * 0.005));
			// Altered State
			var asIntensity = addLuckFactor((gCstat(actor,"intelligence") * 0.2),0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			var altState = createASfrozenFeet(asIntensity);
			// Apply
			applyBarDamage(target,"lust",-damage);
			var overflowMsg = applyBarDamage(target,"energy",-energyDamage);
			// gC(target).lust.attack(-damage);
			// gC(target).energy.attack(-energyDamage);
			attackControl(target,controlDamage);
			applyAlteredState([target],altState);
			results.value = damage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " casted a freezing dust against " + ktn(target) + "."),
										(ktn(actor) + " is sending frost air against " + ktn(target) + ".")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ", " + controlDamage.toFixed(1) + " control damage, and " + textEnergyDamage(energyDamage) + ". " + overflowMsg
								 + generateSaCostsText(this,actor) + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to hit " + ktn(target) + "'s feet with cold winds, but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
		
	}
	return sa;
}

window.createSaSparkingRubbing = function() {
	var sa = new sceneAction();
	sa.name = "Sparking Rubbing";
	sa.key = "sparkingRubbing";
	sa.actionType = "contact";
	sa.targetType = "single";
	sa.willpowerCost = 2;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.strategyTags.push("debuff","damage","sex","magic","thunder","provokeWeaknessSex","alteredState");
	sa.affinities.push("sex","magic","thunder");
	
	sa.description = "The character rubs their target's erogenous zones with small electric shocks, increasing their sensitivity.\n"
				   + "This attack damages the target and increases their weakness against sex actions.\n\nSingle target action."
				   + "\n\nMagical thunder contact attack."
				   + "\n\n__Influences__:\nDamage: Actor's intelligence x7, actor's agility x3, target's resilience x-2.\nEvasion: Actor's agility x5, actor's perception x5, target's agility x-7, target's perception x-7, actor's and target's control."; 
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.25 + gCstat(actor,"perception") * 0.25 + gC(actor).control * 4;
		var evasionMinus = gCstat(target,"agility") * 0.35 + gCstat(target,"perception") * 0.35 + gC(target).control * 4 + 10;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"intelligence") * 0.35 + gCstat(actor,"agility") * 0.15 - gCstat(target,"resilience") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Altered State
			var asIntensity = addLuckFactor((gCstat(actor,"intelligence") * 0.1),0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			var altState = createASsensitizedGenitals(asIntensity);
			// Apply
			applyBarDamage(target,"lust",-damage);
			// gC(target).lust.attack(-damage);
			applyAlteredState([target],altState);
			results.value = damage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + "'s hands applied electric shocks against " + ktn(target) + " sensible zones."),
										(ktn(target) + " made a deaf scream when " + ktn(actor) + " touched " + gC(target).comPr + " with electrified hands."),
										(ktn(actor) + " massaged " + ktn(target) + "'s private parts and shocked them with magic.")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". "
								 + generateSaCostsText(this,actor) + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to grab " + ktn(target) + " genitals, but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
		
	}
	return sa;
}

window.createSaLightningDarts = function() {
	var sa = new sceneAction();
	sa.name = "Lightning darts";
	sa.key = "lightningDarts";
	sa.actionType = "projectile";
	sa.targetType = "single";
	sa.willpowerCost = 3;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.strategyTags.push("damage","magic","thunder","control","damageEnergy","damageWillpower","damageControl");
	sa.affinities.push("magic","thunder");
	
	sa.description = "The character casts lightning rays, zapping their target and damaging their muscles.\n"
				   + "This attack damages the target's lust, energy, willpower and control.\n\nSingle target action."
				   + "\n\nMagical thunder projectile attack."
				   + "\n\n__Influences__:\nDamage: Actor's intelligence x2, actor's will x1, target's will x-1.\nEvasion: Actor's intelligence x7, actor's perception x3, target's will x-8, target's perception x-2, actor's and target's control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"intelligence") * 0.35 + gCstat(actor,"will") * 0.15 + gC(actor).control * 1 + 15;
		var evasionMinus = gCstat(target,"will") * 0.4 + gCstat(target,"perception") * 0.1 + gC(target).control * 1;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"intelligence") * 0.14 + gCstat(actor,"will") * 0.07 - gCstat(target,"will") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var inDamValue2 = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var inDamValue3 = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var energyDamage = calculateAttackEffects("energy",actor,target,this.affinities,inDamValue2);
			var willpowerDamage = calculateAttackEffects("willpower",actor,target,this.affinities,inDamValue3);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Control damage
			var controlDamage = 0.9; // 0.9 ~ 1.4
			controlDamage += ((luckedDiceThrow(gCstat(actor,"luck")) * 0.2) + (gCstat(actor,"intelligence") * 0.003));
			// Apply
			applyBarDamage(target,"lust",-damage);
			var overflowMsg = applyBarDamage(target,"energy",-energyDamage);
			var overflowMsg2 = applyBarDamage(target,"willpower",-willpowerDamage);
			attackControl(target,controlDamage);
			results.value = damage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " casted lightning darts against " + ktn(target) + ", interrupting " + gC(target).posPr + " plans."),
										(ktn(actor) + " conjured small thunders that flew from " + gC(actor).posPr + " hands straight to " + ktn(target) + "."),
										(ktn(target) + " was hit by " + ktn(actor) + "'s electric projectiles.")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ", " + controlDamage.toFixed(1) + " control damage. " + firstToCap(gC(target).perPr) + " also received " + textEnergyDamage(energyDamage) + ". " + overflowMsg + " " + firstToCap(gC(target).perPr) + " also received " + textWillpowerDamage(willpowerDamage) + ". " + overflowMsg2
								 + generateSaCostsText(this,actor) + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to hit " + ktn(target) + "'s feet with lightning darts, but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
		
	}
	return sa;
}

		// Bondage
		
window.createSaBaEtherealChains = function() {
	var sa = new sceneAction();
	sa.name = "Ethereal Chains";
	sa.key = "baEtherealChains";
	sa.actionType = "projectile";
	sa.targetType = "single";
	sa.willpowerCost = 4;
	
	sa.tags.push("bs","sUse");
	sa.reqTags.push("diffTarget","control");
	sa.targetBpReqs.push("arms");
	
	sa.strategyTags.push("magic","control","damageControl","alteredState","bondage");
	sa.affinities.push("magic");
	
	sa.description = "The character casts chains out of aether, and launches them against their target, aiming at locking their arms.\n"
				   + "Locks the enemy's arms, damages their control and reduces their physique and agility.\n"
				   + "Costs 5 willpower.\n\nSingle target action."
				   + "\nActor requires control. Target requires freed arms."
				   + "\n\nMagical projectile bondage attack."
				   + "\n\n__Influences__:\nControl damage: Actor's intelligence x7, actor's luck x%3.\nIntensity: Actor's intelligence x1.\nEvasion: Actor's intelligence x4, actor's will x3, actor's resilience x-3, target's agility x-5, target's perception x-5, actor's and target's control."; 
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"intelligence") * 0.20 + gCstat(actor,"will") * 0.15 + gCstat(actor,"resilience") * 0.15 + gC(actor).control * 2 + 15;
		var evasionMinus = gCstat(target,"agility") * 0.25 + gCstat(target,"perception") * 0.25 + gC(target).control * 2;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Control damage
			var controlDamage = 1.6; // 1.6 ~ 2.4
			controlDamage += ((luckedDiceThrow(gCstat(actor,"luck")) * 0.2) + (gCstat(actor,"intelligence") * 0.006));
			
			// Altered State
			var asIntensity = addLuckFactor((gCstat(actor,"intelligence") * 0.1),0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			var altState = createASaetherialChainsArms(asIntensity);
			
			// Apply
			attackControl(target,controlDamage);
			applyAlteredState([target],altState);
			results.value = controlDamage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " casted chains out of aether, and launched them against " + ktn(target) + "."),
										(ktn(actor) + " conjured aetherial chains and attacked " + ktn(target) + "'s arms with them.")
									] );
			results.description += " " + ktn(target) + " received " + controlDamage.toFixed(1) + " control damage. " + ktn(target)
								 + "'s arms have been locked. "
								 + generateSaCostsText(this,actor) + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to hit " + ktn(target) + " with aetherial chains, but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
		
	}
	return sa;
}

window.createSaBaVineArmLock = function() {
	var sa = new sceneAction();
	sa.name = "Vine Arm Lock";
	sa.key = "baVineArmLock";
	sa.actionType = "projectile";
	sa.targetType = "single";
	sa.willpowerCost = 5;
	
	sa.tags.push("bs","sUse");
	sa.reqTags.push("diffTarget","control");
	sa.targetBpReqs.push("arms");
	
	sa.strategyTags.push("control","damageControl","alteredState","bondage","debuff");
	sa.affinities.push("physical");
	
	sa.description = "The character hits their target with a vine whip, attempting to bind their arms with it.\n"
				   + "Locks the enemy's arms, damages their control, and reduces their agility and control recovery.\n"
				   + "Costs 5 willpower.\n\nSingle target action."
				   + "\nTarget requires freed arms."
				   + "\n\nPhysical projectile bondage attack."
				   + "\n\n__Influences__:\nControl damage: Actor's resilience x4, actor's intelligence x3, actor's luck x%3.\nIntensity: Actor's intelligence x1, actor's resilience x1.\nEvasion: Actor's intelligence x4, actor's perception x3, actor's resilience x3, target's agility x-5, target's agility x-5, actor's and target's control.";
				   
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"intelligence") * 0.20 + gCstat(actor,"perception") * 0.15 + gCstat(actor,"resilience") * 0.15 + gC(actor).control * 2 + 15;
		var evasionMinus = gCstat(target,"agility") * 0.25 + gCstat(target,"perception") * 0.25 + gC(target).control * 2;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Control damage
			var controlDamage = 1.3; // 1.3 ~ 2.3
			controlDamage += ((luckedDiceThrow(gCstat(actor,"luck")) * 0.3) + (gCstat(actor,"intelligence") * 0.003) + (gCstat(actor,"resilience") * 0.004));
			
			// Altered State
			var asIntensity = addLuckFactor((gCstat(actor,"intelligence") + (gCstat(actor,"resilience")) * 0.065),0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			// To Do: New altered state
			var altState = createASvinesLockArms(asIntensity);
			
			// Apply
			attackControl(target,controlDamage);
			applyAlteredState([target],altState);
			results.value = controlDamage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " whipped " + ktn(target) + " with vines, binding " + gC(target).posPr + " arms in the process."),
										(ktn(actor) + " launched a vine against " + ktn(target) + ", locking " + gC(target).posPr + " arms."),
										(ktn(actor) + " attacked " + ktn(target) + " with a vine, locking it around " + gC(target).posPr + " arms.")
									] );
			results.description += " " + ktn(target) + " received " + controlDamage.toFixed(1) + " control damage. " + ktn(target)
								 + "'s arms have been locked. "
								 + generateSaCostsText(this,actor) + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to hit " + ktn(target) + " with vines, but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
		
	}
	return sa;
}

		// Spores
		
window.createSaRelaxingScent = function() {
	var sa = new sceneAction();
	sa.name = "Relaxing scent";
	sa.key = "baRelaxingScent";
	sa.actionType = "social";
	sa.targetType = "area";
	sa.willpowerCost = 3;
	
	// sa.actorDisabledByAs = [ "CoId" ];
	
	sa.requiredRace = [ "leirien" ];
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	
	sa.getIsAllowedBySettings = function() { // Fake settings
		var isAllowed = false;
		
		if ( ( State.variables.sc.teamAcharKeys.length + State.variables.sc.teamBcharKeys.length ) > 1 ) {
			isAllowed = true;
		}
		
		return isAllowed;
	}
	
	sa.strategyTags.push("social","alteredState","debuff");
	sa.affinities.push("social");
	
	sa.description = "The character releases special spores that induce those that breath them into a state of relaxation.\n"
				   + "Everyone but the actor will lose physique, agility, will and perception.\n"
				   + "\n\nSocial spore attack."
				   + "\n\n__Influences__:\nIntensity: Actor's resilience x1, actor's will x1"; 
				   
	sa.doesHitLand = function(actor,target) {
		return true;
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		// var evResults = this.doesHitLand(actor,target);
		
		if ( true ) { // Hit lands
			// Altered State
			var inIntensity = gCstat(actor,"resilience") * 0.075 + gCstat(actor,"will") * 0.05;
			var asIntensity = addLuckFactor(inIntensity,0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			
			/* Edits */
			var altState = createASrelaxingScent(asIntensity);
			// Apply
			var relaxedTargets = arrayMinusA(State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys),actor);
			applyAlteredState(relaxedTargets,altState);
			
			results.value = 1;
			// Description
				results.description += randomFromList( [
										( ktn(actor) + " appears to be throwing something into the air. A funny smell reaches everyone's noses, and they feel sleepy." ),
										( "A gentle scent is reaching everyone's noses, causing their eyes to fall. " + ktn(actor) + " looks uneffected." )
										] );
			results.description += " " + generateSaCostsText(this,actor) + ".";
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " couldn't launch the spores.";
		}
		
		return results;
		
	}
	return sa;
}


	// Social

window.createSaTaunt = function() {
	var sa = new sceneAction();
	sa.name = "Taunt";
	sa.key = "taunt";
	sa.actionType = "social";
	sa.targetType = "single";
	sa.socialdriveCost = 2;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.strategyTags.push("social","alteredState");
	sa.affinities.push("social","taunt");
	
	sa.description = "The character insults their target's honor.\n"
				   + "If successful, the target will lose luck, perception, agility and willpower, but will gain physique and physical damage.\n\nSingle target action."
				   + "\n\nSocial taunt attack."
				   + "\n\n__Influences__:\nControl damage: Actor's intelligence x7, actor's luck x%3.\nIntensity: Actor's intelligence x1.\nEvasion: Actor's charisma x7, actor's empathy x4, target's empathy x-5, target's will x-5."; 
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"charisma") * 0.35 + gCstat(actor,"empathy") * 0.15 + 25;
		var evasionMinus = gCstat(target,"empathy") * 0.25 + gCstat(target,"will") * 0.25;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Altered State
			var inIntensity = gCstat(actor,"charisma") * 0.13 + gCstat(actor,"empathy") * 0.06;
			var asIntensity = addLuckFactor(inIntensity,0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			var altState = createAStaunted(asIntensity);
			// Apply
			applyAlteredState([target],altState);
			results.value = 1;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " challenged " + ktn(target) + " to make a less shameful ahegao face today."),
										(ktn(actor) + " told " + ktn(target) + " their private parts are impressing for the wrong reasons."),
										(ktn(actor) + " told " + ktn(target) + " that " + gC(target).perPr + " should give in to " + gC(target).posPr
										+ " desires and beg for pleasure.")
									] );
			results.description += " " + generateSaCostsText(this,actor) + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to taunt " + ktn(target) + ", but was ignored. " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
		
	}
	return sa;
}

window.createSaBaTease = function() {
	var sa = new sceneAction();
	sa.name = "Tease";
	sa.key = "baTease";
	sa.actionType = "social";
	sa.targetType = "single";
	sa.socialdriveCost = 2;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.strategyTags.push("social","seduction","alteredState","damage","debuff");
	sa.affinities.push("social","seduction");
	
	sa.description = "The character attempts to distract the enemy with sexual fantasies.\n"
				   + "The target will receive and deal increased sex damage."
				   + "\n\nSocial tease attack."
				   + "\n\n__Influences__:\nControl damage: Actor's intelligence x7, actor's luck x%3.\nIntensity: Actor's intelligence x1.\nEvasion: Actor's charisma x7, actor's empathy x4, target's empathy x-5, target's will x-5."; 
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"charisma") * 0.35 + gCstat(actor,"empathy") * 0.15 + 25;
		var evasionMinus = gCstat(target,"empathy") * 0.25 + gCstat(target,"will") * 0.25;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"charisma") * 0.075 + gCstat(actor,"empathy") * 0.025;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Altered State
			var inIntensity = gCstat(actor,"charisma") * 0.13 + gCstat(actor,"empathy") * 0.06;
			var asIntensity = addLuckFactor(inIntensity,0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			
			var possibleBps = [];
			for ( var bp of ["dick","pussy","mouth"] ) {
				if ( gC(target).body.hasOwnProperty(bp) ) {
					possibleBps.push(bp);
				}
			}
			if ( possibleBps.length >  0 ) {
				var chosenBp = randomFromList(possibleBps);
			} else {
				var chosenBp = "none";
			}
			
			var altState = createASteased(asIntensity,chosenBp);
			// Apply
			applyBarDamage(target,"lust",-damage);
			// gC(target).lust.attack(-damage);
			applyAlteredState([target],altState);
			results.value = 1;
			// Description
			switch (chosenBp) {
				case "dick":
				results.description += randomFromList( [
										(ktn(actor) + " told " + ktn(target) + " that " + gC(actor).perPr + " is about to turn " + gC(target).posPr + " " + dickWord() + " into cream."),
										(ktn(actor) + " challenged " + ktn(target) + " not to cum too fast once " + gC(actor).perPr + " gets started with " + gC(target).posPr + " " + dickWord() + ".") ] );
					break;
				case "pussy":
				results.description += randomFromList( [
										(ktn(actor) + " told " + ktn(target) + " " + gC(target).posPr + " " + pussyWord() + " will be a fountain before the battle is over."),
										(ktn(actor) + " told " + ktn(target) + " " + gC(target).perPr + " should stop fantasizing about getting " + gC(target).posPr + " " + pussyWord() + " pampered and start offering it with " + gC(target).posPr + " legs open instead.") ] );
					break;
				case "mouth":
				results.description += randomFromList( [
										(ktn(actor) + " invited " + ktn(target) + " to get on " + gC(target).posPr + " knees and taste " + gC(actor).posPr + " private parts."),
										(ktn(actor) + " told " + ktn(target) + " that obedient pets beg with their tongues out, so it was time for " + gC(target).comPr + " to play " + gC(target).posPr + " part.") ] );
					break;
				case "none":
					results.description += (ktn(actor) + " suggested perverse fantasies to " + ktn(target) + ".");
					break;
			}
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". " + generateSaCostsText(this,actor)
								 + ".\n" + evResults.explanation; " " + generateSaCostsText(this,actor) + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to tease " + ktn(target) + ", but was ignored. " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
		
	}
	return sa;
}

		// Hypnosis
	
window.createSaBaHypnoticGlance = function() {
	var sa = new sceneAction();
	sa.name = "Hypnotic Glance";
	sa.key = "baHypnoticGlance";
	sa.targetType = "single";
	sa.actionType = "social";
	sa.willpowerCost = 2;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("eyes");
	sa.targetBpReqs.push("eyes");
	
	sa.strategyTags.push("social","hypnosis","alteredState","control","damageWillpower","damageControl",);
	sa.affinities.push("social","hypnosis");
	/* No doggy style yet
	sa.unvalidRelationalPositions.push(["takingFromBehind","takenFromBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastBehind","spitroastTarget"]);
	*/
	sa.description = "The character uses hypnotic magic to erode their target's willpower through a seductive glance.\n"
				   + "Actor must have access to target's eyes.\n"
				   + "The target will lose willpower, will, perception, control and control recovery.\nCosts 2 willpower."
				   + "\n\nSingle target action."
				   + "\n\nSocial hypnosis attack."
				   + "\n\n__Influences__:\nDamage and willpower damage: Actor's charisma x5, actor's will x3, target's will x-3.\nControl damage: Actor's will x6, actor's luck: x%1, target's will x-3.\nIntensity: Actor's intelligence x1.\nEvasion: Actor's charisma x5, actor's empathy x5, target's empathy x-2, target's will x-7, actor's and target's control."; 
			   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"charisma") * 0.25 + gCstat(actor,"will") * 0.25 + 15;
		var evasionMinus = gCstat(target,"empathy") * 0.1 + gCstat(target,"will") * 0.35;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
		
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Willpower Damage
			var inDamValue = gCstat(actor,"charisma") * 0.25 + gCstat(actor,"will") * 0.15 - gCstat(target,"will") * 0.1;
			var inDamValue2 = inDamValue / 2;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			inDamValue2 = addLuckFactor(inDamValue2,0.1,gCstat(actor,"luck")); 
			var damage = calculateAttackEffects("willpower",actor,target,this.affinities,inDamValue);
			var lustDamage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue2);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Control damage
			var controlDamage = 1.2; // 1.2 ~ 1.8
			controlDamage += ((luckedDiceThrow(gCstat(actor,"luck")) * 0.01) + (gCstat(actor,"will") * 0.006) - (gCstat(target,"will") * 0.003));
			
			// Altered State
			var inIntensity = gCstat(actor,"charisma") * 0.15 + gCstat(actor,"will") * 0.07 - gCstat(actor,"will") * 0.07;
			var asIntensity = addLuckFactor(inIntensity,0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			
			var altState = createAShypnosisStroke(asIntensity);
			// Apply
			applyBarDamage(target,"lust",lustDamage);
			var overflowMsg = applyBarDamage(target,"willpower",-damage);
			// gC(target).willpower.attack(-damage);
			attackControl(target,controlDamage);
			applyAlteredState([target],altState);
			results.value = damage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " enraptured " + ktn(target) + "'s eyes, and " + gC(target).perPr
										+ " felt " + gC(target).posPr + " willpower slipping away."),
										(ktn(actor) + "'s eyes captured " + ktn(target) + "'s attention, and " + gC(target).perPr
										+ " felt " + gC(target).refPr + " getting lost in them.") ] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + controlDamage.toFixed(1) + " control damage, "
								 + textLustDamage(lustDamage) + " and " + textWillpowerDamage(damage) + "." + overflowMsg;
			results.description += " " + generateSaCostsText(this,actor) + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to nullify " + ktn(target) + "'s senses, but failed. " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

	// Transformation
	
window.createBorrowedIdentity = function() {
	var sa = new sceneAction();
	sa.name = "Borrowed identity";
	sa.key = "baBorrowedIdentity";
	sa.actionType = "social";
	sa.targetType = "area";
	sa.willpowerCost = 3;
	sa.socialdriveCost = 3;
	
	sa.actorDisabledByAs = [ "BoId" ];
	
	sa.requiredRace = [ "shapeshifter" ];
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	
	sa.getIsAllowedBySettings = function() { // Fake settings
		var isAllowed = false;
		
		if ( ( State.variables.sc.teamAcharKeys.length + State.variables.sc.teamBcharKeys.length ) > 1 ) {
			isAllowed = true;
		}
		
		return isAllowed;
	}
	
	sa.strategyTags.push("social","seduction","alteredState","buff","debuff");
	sa.affinities.push("social");
	
	sa.description = "The character transforms their shape to reselve that of someone else, trying to provoke chaos.\n"
				   + "The actor will gain charisma, other combatants will lose perception, empathy and charisma."
				   + "\n\nSocial taunt attack."
				   + "\n\n__Influences__:\nIntensity: Actor's charisma x1, actor's will x1, actor's empathy x1."; 
				   
	sa.doesHitLand = function(actor,target) {
		return true;
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		// var evResults = this.doesHitLand(actor,target);
		
		if ( true ) { // Hit lands
			// Select identity target
			var borrowedIdentity = randomFromList(arrayMinusA(State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys),actor));
			var confusedTargets = arrayMinusA(State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys),actor);
			// Altered State
			var inIntensity = gCstat(actor,"charisma") * 0.05 + gCstat(actor,"empathy") * 0.05 + gCstat(actor,"will") * 0.05;
			var asIntensity = addLuckFactor(inIntensity,0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			
			var altState = createASborrowedIdentity(asIntensity,borrowedIdentity);
			var altState2 = createASconfusedIdentities(asIntensity);
			// Apply
			applyAlteredState([actor],altState);
			applyAlteredState(confusedTargets,altState2);
			results.value = 1;
			// Description
				results.description += randomFromList( [
										ktn(actor) + "'s shape began to change... Until " + gC(actor).perPr + " turned into someone else. The others may think twice then they see " + gC(actor).comPr + ".",
										ktn(actor) + " stole someone's identity! This may provoke some chaos.",
										ktn(actor) + " is nowhere to be seen, for " + gC(actor).perPr + " has taken someone else's face." ] );
			results.description += " " + generateSaCostsText(this,actor) + ".";
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + "'s plot failed!";
		}
		
		return results;
		
	}
	return sa;
}



