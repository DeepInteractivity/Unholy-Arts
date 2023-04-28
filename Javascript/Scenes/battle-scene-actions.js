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
		case "trance":
			if ( areCharactersPositionsConnected(attacker,target) ) {
				hit = true;
				var explanation = "Target is entranced. Action succeds!";
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
	} else if ( finalWeakness >= 1.5 ) {
		weaknessMessage = colorText("Devastating! ","orangered");
	} else if ( finalWeakness >= 1.1 ) {
		weaknessMessage = colorText("It was effective! ","darkorange");
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
	
	sa.description = "The character thrashes against their target to get off the ground.\n"
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
			if ( gC(actor).body.legs.state != "free" ) { inDamValue *= 0.8; }
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

	sa.getIsCustomAllowed = function(actionKey,actorKey,targetsKeys,skipLinkedCheck) {
		var isAllowed = true;
		if ( gC(targetsKeys[0]).race == "monster" ) {
			isAllowed = false;
		}
		return isAllowed;
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
			results.description = ktn(actor) + " tried to stroke " + ktn(target) + ", but failed!\n" + evResults.explanation;
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
			results.description = ktn(actor) + " tried to stroke " + ktn(target) + ", but failed!\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

		// Denial

window.createSaBaTeaseLockedDick = function() {
	var sa = new sceneAction();
	sa.name = "Tease locked dick";
	sa.key = "baTeaseLockedDick";
	sa.actionType = "contact";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.actorBpReqs.push("arms");
	sa.targetLockedBpReqs.push("dick");
	
	sa.strategyTags.push("damage","sex","useArms","targetDick");
	sa.affinities.push("sex","useArms","targetDick");
	
	sa.getIsAllowedBySettings = function() {
		var isAllowed = true;
		
		if ( State.variables.settings.chastity == "disable" ) {
			isAllowed = false;
		}
		
		return isAllowed;
	}
	
	sa.description = "The character taunts their target, reminding them of their locked dick.\n"
				   + "This attack damages the target. Extra damage if the target is close to orgasm.\n\nSingle target action."
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
			var inDamValue = gCstat(actor,"agility") * 0.5 + gCstat(actor,"empathy") * 0.5;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Apply
			gC(target).lust.attack(-damage);
			results.value = damage;
			var lustPc = getBarPercentage(target,"lust");
			// Description && limit KO
			results.description += randomFromList( [
										(ktn(actor) + " teased " + ktn(target) + "'s locked " + dickWord() + ", much to " + gC(target).posPr + " frustration."),
										(ktn(actor) + " massaged " + ktn(target) + "'s locked " + dickWord() + " causing " + gC(target).comPr + " some agony."),
										(ktn(actor) + " maliciously rubbed " + ktn(target) + "'s locked " + dickWord() + ".")
									] );
			var extraDamage = 0;
			if ( lustPc <= 0.1 ) {
				extraDamage = gC(target).lust.max;
				gC(target).lust.attack(-extraDamage);
				results.description += " " + randomFromList( [
										(ktn(target) + " gave in to the humilliation."),
										(ktn(target) + " couldn't hold the shame.")
									] );
			}
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage + extraDamage) + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to tease " + ktn(target) + ", but failed!\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

window.createSaBaTeaseLockedPussy = function() {
	var sa = new sceneAction();
	sa.name = "Tease locked pussy";
	sa.key = "baTeaseLockedPussy";
	sa.actionType = "contact";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.actorBpReqs.push("arms");
	sa.targetLockedBpReqs.push("pussy");
	
	sa.strategyTags.push("damage","sex","useArms","targetPussy");
	sa.affinities.push("sex","useArms","targetPussy");
	
	sa.getIsAllowedBySettings = function() {
		var isAllowed = true;
		
		if ( State.variables.settings.chastity == "disable" ) {
			isAllowed = false;
		}
		
		return isAllowed;
	}
	
	sa.description = "The character taunts their target, reminding them of their locked pussy.\n"
				   + "This attack damages the target. Extra damage if the target is close to orgasm.\n\nSingle target action."
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
			var inDamValue = gCstat(actor,"agility") * 0.5 + gCstat(actor,"empathy") * 0.5;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Apply
			gC(target).lust.attack(-damage);
			results.value = damage;
			var lustPc = getBarPercentage(target,"lust");
			// Description && limit KO
			results.description += randomFromList( [
										(ktn(actor) + " teased " + ktn(target) + "'s locked " + pussyWord() + ", much to " + gC(target).posPr + " frustration."),
										(ktn(actor) + " massaged " + ktn(target) + "'s locked " + pussyWord() + " causing " + gC(target).comPr + " some agony."),
										(ktn(actor) + " maliciously rubbed " + ktn(target) + "'s locked " + pussyWord() + ".")
									] );
			var extraDamage = 0;
			if ( lustPc <= 0.1 ) {
				extraDamage = gC(target).lust.max;
				gC(target).lust.attack(-extraDamage);
				results.description += " " + randomFromList( [
										(ktn(target) + " gave in to the humilliation."),
										(ktn(target) + " couldn't hold the shame.")
									] );
			}
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage + extraDamage) + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to tease " + ktn(target) + ", but failed!\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

	// Pounces and derived sexual

window.createSaNeutralFrontalPounce = function() {
	var sa = new sceneAction();
	sa.name = "Frontal Pounce";
	sa.key = "pounceFrontal";
	
	sa.actionType = "pounce";
	sa.targetType = "single";
	sa.energyCost = 5;
	
	sa.tags.push("bs","bPos");
	sa.reqTags.push("diffTarget","control");
	sa.actorBpReqs.push("legs");
	
	sa.strategyTags.push("pounce","bPos","frontal","subpar");
	sa.affinities.push("pounce","useDick","targetPussy");
	
	sa.description = "The character pushes their target to the ground, taking the initiative.\n"
				   + "Costs 5 energy.\n\nSingle target action."
				   + "\nActor requires control and free legs."
				   + "\n\nPounce attack."
				   + "\n\n__Influences__:\nDamage: Actor's physique x3, actor's agility x1."
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
			createBposFrontalPounce(actor,[target]);
				
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " pushed " + ktn(target) + " to the ground and started holding " + gC(target).comPr + " in place."),
										(ktn(actor) + " pounced on " + ktn(target) + " and mounted " + gC(target).comPr + "."),
										(ktn(actor) + " jumped on " + ktn(target) + " and trapped " + gC(target).comPr + " " + gC(target).refPr + ".")
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
				var vd2 = colorText((gC(actor).name + " has taken " + gC(target).name + "'s vaginal virginity! "),"red") + provokeVirginityBonusRelationship(actor,target);
				gC(target).virginities.pussy.tryTakeVirginity(actor,"pounceFrontalD2P",vd2);
			}
			if ( gC(actor).virginities.dick.taken == false ) {
				var vd1 = colorText((gC(target).name + " has taken " + gC(actor).name + "'s penile virginity! "),"red") + provokeVirginityBonusRelationship(target,actor);
				gC(actor).virginities.dick.tryTakeVirginity(target,"pounceFrontalD2P",vd1);
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
				var vd2 = colorText((gC(actor).name + " has taken " + gC(target).name + "'s penile virginity! "),"red") + provokeVirginityBonusRelationship(actor,target);
				gC(target).virginities.dick.tryTakeVirginity(actor,"pounceFrontalP2D",vd2);
			}
			if ( gC(actor).virginities.pussy.taken == false ) {
				var vd1 = colorText((gC(target).name + " has taken " + gC(actor).name + "'s vaginal virginity! "),"red") + provokeVirginityBonusRelationship(target,actor);
				gC(actor).virginities.pussy.tryTakeVirginity(target,"pounceFrontalP2D",vd1);
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
	
	sa.getIsCustomAllowed = function(actionKey,actorKey,targetsKeys,skipLinkedCheck) {
		var isAllowed = true;
		if ( gC(targetsKeys[0]).race == "monster" ) {
			isAllowed = false;
		}
		return isAllowed;
	}
	
	sa.description = "The character kisses their target and drains their energy.\n"
				   + "This attack damages the target and drains their energy.\nRequires both characters to have a free mouth. The target may not be a monster."
				   + "\n\nSingle target action."
				   + "\n\nSexual draining contact attack."
				   + "\n\n__Influences__:\nDrain damage, energy drain damage: Actor's agility x3, actor's empathy x2."
				   + "\nEvasion: Actor's agility x5, actor's perception x5, actor's control.\nTarget's agility x7, target's perception x7, target's control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.25 + gCstat(actor,"perception") * 0.25 + gC(actor).control * 4;
		var evasionMinus = gCstat(target,"agility") * 0.35 + gCstat(target,"perception") * 0.35 + gC(target).control * 4 + 10;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		if ( actor == "chPlayerCharacter" ) { addToStVarsList("monActUs"); } 
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
			
			if ( gC(actor).race != "monster" ) {
				results.description += randomFromList( [
										(ktn(actor) + " took " + ktn(target) + "'s lips, stealing " + gC(target).posPr + " energy."),
										(ktn(actor) + " placed " + gC(actor).posPr + " own lips on " + ktn(target) + "'s and sucked " + gC(target).posPr + " energy out."),
										(ktn(target) + " felt " + gC(target).posPr + " energy slipping away when " + ktn(actor) + " kissed her.")
									] );
			} else {
				results.description += randomFromList( [
										(ktn(actor) + " chewed " + gC(actor).posPr + " teeth on " + ktn(target) + " sucking " + gC(target).posPr + " energy away."),
										(ktn(target) + " feels " + gC(target).posPr + " energy leaving " + gC(target).posPr + ", as " + ktn(actor) + " is sucking it away.")
									] );
			}
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
	
	sa.getIsCustomAllowed = function(actionKey,actorKey,targetsKeys,skipLinkedCheck) {
		var isAllowed = true;
		if ( gC(targetsKeys[0]).race == "monster" ) {
			isAllowed = false;
		}
		return isAllowed;
	}
	
	sa.description = "The character kisses their target and drains their focus.\n"
				   + "This attack damages the target and heals the user.\nRequires both characters to have a free mouth. The target may not be a monster."
				   + "\n\nSingle target action."
				   + "\n\nSexual draining contact attack."
				   + "\n\n__Influences__:\nDrain damage: Actor's agility x4, actor's empathy x3."
				   + "\nEvasion: Actor's agility x5, actor's perception x5, actor's control.\nTarget's agility x7, target's perception x7, target's control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.25 + gCstat(actor,"perception") * 0.25 + gC(actor).control * 4;
		var evasionMinus = gCstat(target,"agility") * 0.35 + gCstat(target,"perception") * 0.35 + gC(target).control * 4 + 10;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		if ( actor == "chPlayerCharacter" ) { addToStVarsList("monActUs"); }
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"agility") * 0.2 + gCstat(actor,"empathy") * 0.15;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			
			// Apply
			applyBarDamage(target,"lust",-damage);
			// gC(target).lust.attack(-damage);
			gC(actor).lust.changeValue(damage);
			results.value = damage;
			// Description
			if ( gC(actor).race != "monster" ) {
				results.description += randomFromList( [
										(ktn(actor) + " took " + ktn(target) + "'s lips, stealing " + gC(target).posPr + " focus."),
										(ktn(actor) + " placed " + gC(actor).posPr + " own lips on " + ktn(target) + "'s and sucked " + gC(target).posPr + " concentration out."),
										(ktn(target) + " felt " + gC(target).posPr + " focus slipping away when " + ktn(actor) + " kissed " + gC(target).comPr)
									] );
			} else {
				results.description += randomFromList( [
										(ktn(actor) + " sucked " + ktn(target) + "'s skin, stealing " + gC(target).posPr + " focus."),
										(ktn(target) + " felt " + gC(target).posPr + " aether slipping away when " + ktn(actor) + " attacked " + gC(target).comPr + " with " + gC(actor).posPr + " tongue.")
									] );
			}
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

window.createTackle = function() {
	var sa = new sceneAction();
	sa.name = "Tackle";
	sa.key = "tackle";
	
	sa.actionType = "hit";
	sa.targetType = "single";
	sa.energyCost = 3; 
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget","control");
	
	sa.requiresFree = true;
	
	sa.strategyTags.push("damage","physical","consumeEnergy","physicalDamage","damageControl");
	sa.affinities.push("physical");
	
	sa.description = "The character charges with their whole body, attempting to use their weight to throw their target to the ground. Risky.\n"
				   + "This attack damages the target and their control if it lands, but damages the actor's control otherwise.\nCosts 3 energy.\n\nSingle target action."
				   + "Actor requires control."
				   + "\n\nPhysical hit attack."
				   + "\n\n__Influences__:\nDamage: Actor's resilience x6, actor's physique x3, actor's agility x2, target's resilience x-1, target's agility x-1."
				   + "\nEvasion: Actor's agility x6, target's perception x4, actor's control.\nTarget's perception x5, target's agility 5, target's control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.3 + gCstat(actor,"resilience") * 0.25 + gCstat(actor,"perception") * 0.2 + gC(actor).control * 10 + 10;
		var evasionMinus = gCstat(target,"perception") * 0.25 + gCstat(target,"agility") * 0.25 + gC(target).control * 10;
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
			var inDamValue = gCstat(actor,"physique") * 0.15 + gCstat(actor,"resilience") * 0.3 + gCstat(actor,"agility") * 0.1 - gCstat(target,"resilience") * 0.05 - gCstat(target,"agility") * 0.05;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Control damage
			var controlDamage = 1.75; // 1.75 ~ 2.6
			controlDamage += ((luckedDiceThrow(gCstat(actor,"luck")) * 0.04) + (gCstat(actor,"physique") * 0.002 + (gCstat(actor,"resilience") * 0.0025)));
			// Apply
			applyBarDamage(target,"lust",-damage);
			attackControl(target,controlDamage);
			results.value = damage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " threw " + gC(actor).refPr + " against " + ktn(target) + ", knocking " + gC(target).comPr + " down."),
										(ktn(target) + " is unable to stop the impact of " + ktn(actor) + "'s tackle, and loses " + gC(target).posPr + " balance."),
										(ktn(actor) + " charges with all " + gC(actor).posPr + " weight against " + ktn(target) + ", breaking " + gC(target).posPr + " posture.")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + " and " + controlDamage.toFixed(1)
								 + " control damage. " + generateSaCostsText(this,actor)
								 + ".\n" + evResults.explanation;
		} else { // Hit fails
			var selfControlDamage = 0.7 - (luckedDiceThrow(gCstat(actor,"luck")) * 0.3);
			attackControl(actor,selfControlDamage);
			results.value = 0;
			results.description = ktn(actor) + " charged against " + ktn(target) + " and tried to tackle " + gC(target).comPr + " down, but failed! " + ktn(actor) + " received " + selfControlDamage.toFixed(1) + " control damage. " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

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

window.createSavageCrush = function() {
	var sa = new sceneAction();
	sa.name = "Savage Crush";
	sa.key = "savageCrush";
	
	sa.actionType = "contact";
	sa.targetType = "single";
	sa.energyCost = 5;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget","control");
	
	sa.requiresFree = true;
	
	sa.strategyTags.push("damage","physical","consumeEnergy","physicalDamage","damageControl","consumeControl","painDamage");
	sa.affinities.push("physical");
	
	sa.description = "The characters thrashes violently against their target, attemtping to crush them against a solid surface.\n"
				   + "This attack damages the target and erodes their control, consuming control from the own user.\nCosts 5 energy.\n\n"
				   + "Single target action."
				   + "\n\nPhysical contact attack."
				   + "\n\n__Influences__:"
				   
				   + "\n\n__Influences__:\nDamage: Actor's physique x5, actor's resilience x7, target's resilience x-3."
				   + "\nEvasion: Actor's agility x7, actor's perception x3, actor's control.\nTarget's agility x9, target's perception x5, target's control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.35 + gCstat(actor,"perception") * 0.15 + gC(actor).control * 4;
		var evasionMinus = gCstat(target,"agility") * 0.45 + gCstat(target,"perception") * 0.25 + gC(target).control * 4;
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
			var inDamValue = gCstat(actor,"physique") * 0.25 + gCstat(actor,"resilience") * 0.55 - gCstat(target,"resilience") * 0.35;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Control damage
			var controlDamage = 2; // 2.0 ~ 3.0
			controlDamage += ((luckedDiceThrow(gCstat(actor,"luck")) * 0.05) + (gCstat(actor,"resilience") * 0.005));
			// Apply
			applyBarDamage(target,"lust",-damage);
			attackControl(target,controlDamage);
			consumeControl(actor,0.5);
			results.value = damage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " thrashed wildly, knocking " + ktn(target) + " against a nearby surface."),
										("The violent lunges of " + ktn(actor) + " provoke an ugly bruise on " + ktn(target) + "."),
										(ktn(actor) + " throws the whole weight of " + gC(actor).posPr + " body against " + ktn(target) + ", provoking " + gC(target).comPr + " to fall over.")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + " and " + controlDamage.toFixed(1)
								 + " control damage. " + generateSaCostsText(this,actor)
								 + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " charged against " + ktn(target) + ", but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

window.createDaringAssault = function() {
	var sa = new sceneAction();
	sa.name = "Daring Assault";
	sa.key = "daringAssault";
	
	sa.actionType = "hit";
	sa.targetType = "single";
	sa.energyCost = 3;
	sa.priority = 3;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.reqTags.push("control");
	
	sa.strategyTags.push("damage","physical","consumeEnergy","physicalDamage","damageControl");
	sa.affinities.push("physical");
	
	sa.description = "The character recklessly jumps against an enemy, gaining inertia.\n"
				   + "Physical damage, damages control, moderately low precision, increases the actor's physique and agility for a short period. Requires control.\nCosts 3 energy.\n\nSingle target action."
				   + "\n\nPhysical attack, increased priority."
				   + "\n\n__Influences__:\nIntensity: Actor's intelligence x3, actor's will x2, actor's agility x2."
				   + "\nDamage: Actor's physique x4, resilience x4, agility x2, target's resilience x-1, agility x-1."
				   + "\nEvasion: Actor's agility x3, physique x3, resilience x2, perception x2, control.\nTarget's perception x-5, agility x-5, control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.15 + gCstat(actor,"physique") * 0.15 + gCstat(actor,"resilience") * 0.1 + gCstat(actor,"perception") * 0.1 + gC(actor).control * 10;
		var evasionMinus = gCstat(target,"perception") * 0.25 + gCstat(target,"agility") * 0.25 + gC(target).control * 10;
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
			var inDamValue = gCstat(actor,"physique") * 0.2 + gCstat(actor,"resilience") * 0.2 + gCstat(actor,"agility") * 0.1 - gCstat(target,"resilience") * 0.05 - gCstat(target,"agility") * 0.05;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Control damage
			var controlDamage = 1; // 1 ~ 1.75
			controlDamage += ((luckedDiceThrow(gCstat(actor,"luck")) * 0.04) + (gCstat(actor,"physique") * 0.0015 + (gCstat(actor,"resilience") * 0.002)));
			// Apply
			applyBarDamage(target,"lust",-damage);
			attackControl(target,controlDamage);
			results.value = damage;
			// Description
			results.description += randomFromList( [
									(ktn(actor) + " leaped against " + ktn(target) + ", knocking " + gC(target).comPr + " in the process."),
									(ktn(actor) + " made a daring jump, tackling " + ktn(target) + "."),
									(ktn(actor) + " took great impulse and charged against " + ktn(target) + " in one big jump.")
								] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + " and " + controlDamage.toFixed(1)
								 + " control damage. " + generateSaCostsText(this,actor);
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " leapt against " + ktn(target) + ", but didn't manage to tackle " + gC(target).comPr + ". " + generateSaCostsText(this,actor);
		}
		results.description += ".\nThe daring assault increases " + ktn(actor) + "'s momentum.\n" + evResults.explanation;;
				
		// Altered state
		var altState = createASgainingMomentum(1);
		applyAlteredState([actor],altState);
		results.value = damage;
				
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
			results.description = ktn(actor) + " tried to scratch " + ktn(target) + ", but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}


	// Magic
window.createHolyBlast = function() {
	var sa = new sceneAction();
	sa.name = "Holy Blast";
	sa.key = "holyBlast";
	
	sa.actionType = "projectile";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.getIsCustomAllowed = function(actionKey,actorKey,targetsKeys,skipLinkedCheck) {
		var isAllowed = true;
		if ( getBarPercentage(actorKey,"lust") <= 0.05 ) {
			isAllowed = false;
		}
		return isAllowed;
	}
	
	sa.strategyTags.push("damage","magic","holy");
	sa.affinities.push("magic","holy");
	
	sa.description = "The character sacrifices their energy to launch a blast of aether against their target.\n"
				   + "This attack damages the target, using the own actor's vitality.\nCosts 5% lust.\n\nSingle target action."
				   + "\n\nMagical holy projectile attack."
				   + "\n\n__Influences__:\nDamage: All stats of the actor.\nEvasion: All stats of the actor and the target, actor's and target's control."; 
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = quantifyCharacterStats(actor) * 0.2 + gC(actor).control * 3 + 15;
		var evasionMinus = quantifyCharacterStats(target) * 0.2 + gC(target).control * 2;
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
			var inDamValue = quantifyCharacterStats(actor) * 0.05;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			var fivePercentLust = gC(actor).lust.max * 0.05;
			// Apply
			applyBarDamage(target,"lust",-damage);
			gC(actor).lust.changeValue(-fivePercentLust);
			results.value = damage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " launched a blast of holy light against " + ktn(target) + ", burning " + gC(target).posPr + " skin."),
										(ktn(actor) + " sacrificed " + gC(actor).posPr + " vitality to the Goddess to cast retribution against " + ktn(target) + "."),
										(ktn(actor) + " casted divine punishment against " + ktn(target) + ", attacking " + gC(target).comPr + " with a holy blast.")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". "
								+ ktn(actor) + " sacrificed " + textLustDamage(fivePercentLust) + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to cast divine punishment against " + ktn(target) + ", but the prayer went unanswered!"
								+ "\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

window.createSaEmbers = function() {
	var sa = new sceneAction();
	sa.name = "Embers";
	sa.key = "embers";
	
	sa.actionType = "projectile";
	sa.targetType = "single";
	sa.willpowerCost = 1;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.strategyTags.push("damage","magic","fire");
	sa.affinities.push("magic","fire");
	
	sa.description = "The character casts ignited dust and throws it against their target.\n"
				   + "This attack damages the target.\nCosts 1 willpower.\n\nSingle target action."
				   + "\n\nMagical fire projectile attack."
				   + "\n\n__Influences__:\nDamage: Actor's intelligence x2, actor's will x1, target's will x-1, target's resilience x-1.\nEvasion: Actor's intelligence x1, actor's perception x1, target's perception x-1, target's will x-1, actor's and target's control."; 
				   
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
			var inDamValue = gCstat(actor,"intelligence") * 0.4 + gCstat(actor,"will") * 0.2 - gCstat(target,"will") * 0.2;
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

window.createSaFlamingFan = function() {
	var sa = new sceneAction();
	sa.name = "Flaming fan";
	sa.key = "flamingFan";
	
	sa.actionType = "projectile";
	sa.targetType = "group";
	sa.willpowerCost = 2;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.strategyTags.push("damage","magic","fire");
	sa.affinities.push("magic","fire");
	
	sa.description = "The character casts a wave of fire, dealing collateral damage to allies of the target.\n"
				   + "This attack damages the target and their allies. High chance of hitting.\nCosts 2 willpower.\n\nMultiple targets action."
				   + "\n\nMagical fire projectile attack."
				   + "\n\n__Influences__:\nDamage: Actor's intelligence x7, actor's will x4, target's will x-4, target's resilience x-1.\nEvasion: Actor's intelligence x4, actor's will x4, actor's perception x2, target's will x-5, target's perception x-5, actor's and target's control."; 
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"intelligence") * 0.2 + gCstat(actor,"perception") * 0.1 + gCstat(actor,"will") * 0.2 + gC(actor).control * 2 + 20;
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
			var colTargets = getCharsTeamMinusSelf(target);
			
			// Damage
			var inDamValue = gCstat(actor,"intelligence") * 0.35 + gCstat(actor,"will") * 0.2 - gCstat(target,"will") * 0.2;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Apply
			applyBarDamage(target,"lust",-damage);
			// gC(target).lust.attack(-damage);
			results.value = damage;
			// Description
			results.description += randomFromList( [
								("A fan of flames expands in front of " + ktn(actor) + ", scorching " + gC(actor).posPr + " enemies."),
								(ktn(actor) + " unleashes flames against " + ktn(target) + ", and they envolve everything around " + gC(target).comPr + "."),
								(ktn(actor) + "'s hands ignited the air in front of " + gC(actor).comPr + ", provoking a flare.")
							] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". "
			for ( var cT of colTargets ) {
				var cInDamValue = (gCstat(actor,"intelligence") * 0.35 + gCstat(actor,"will") * 0.2 - gCstat(cT,"will") * 0.2) * 0.3;
				cInDamValue = addLuckFactor(cInDamValue,0.1,gCstat(actor,"luck"));
				var colDamage = calculateAttackEffects("lust",actor,cT,this.affinities,cInDamValue);
				var dmgEffMsg = getWeaknessToAttackText(this.affinities,cT);
				applyBarDamage(cT,"lust",-colDamage);
				results.description += dmgEffMsg + ktn(cT) + " received " + textLustDamage(colDamage) + ". "
			}
			results.description += generateSaCostsText(this,actor) + ".\n" + evResults.explanation;
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
				   + "\n\n__Influences__:\nDamage: Actor's intelligence x2, actor's will x1, target's will x-1, target's resilience x-1.\nEnergy damage: Actor's intelligence x2, actor's will x1.\nEvasion: Actor's intelligence x7, actor's will x3, target's will x-10, actor's and target's control."; 
				   
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
			var controlDamage = 1; // 1 ~ 1.7
			controlDamage += ((luckedDiceThrow(gCstat(actor,"luck")) * 0.3) + (gCstat(actor,"intelligence") * 0.004));
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
	sa.willpowerCost = 3;
	
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
			var completeAffinities = this.affinities;
			
			
			var damageMultiplier = 0.7;
			var flagHitBodyParts = false;
			for ( var bp of ["dick","pussy","breasts"] ) {
				if ( gC(target).body.hasOwnProperty(bp) ) {
					if ( gC(target).body[bp].state == "free" || gC(target).body[bp].state == "inUse" ) {
						damageMultiplier += 0.1;
						completeAffinities.push(("target" + firstToCap(bp)));
						flagHitBodyParts = true;
					}
				}
			}
			// Damage
			var inDamValue = (gCstat(actor,"intelligence") * 0.35 + gCstat(actor,"agility") * 0.15 - gCstat(target,"resilience") * 0.1) * damageMultiplier;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,completeAffinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(completeAffinities,target);
			// Apply
			applyBarDamage(target,"lust",-damage);
			results.value = damage;
			// Altered State
			if ( doesCharHaveState(target,"SeGe") == false ) {
				var asIntensity = addLuckFactor((gCstat(actor,"intelligence") * 0.1),0.1,gCstat(actor,"luck"));
				var asIntensity = fixIntensity(asIntensity);
				var altState = createASsensitizedGenitals(asIntensity);
				applyAlteredState([target],altState);
			}
			// Description
			if ( gC(actor).race != "monster" ) {
				results.description += randomFromList( [
										(ktn(actor) + "'s hands applied electric shocks against " + ktn(target) + " sensible zones."),
										(ktn(target) + " let out a deaf scream when " + ktn(actor) + " touched " + gC(target).comPr + " with electrified hands."),
										(ktn(actor) + " massaged " + ktn(target) + "'s private parts and shocked them with magic.")
									] );
			} else {
				results.description += randomFromList( [
										(ktn(actor) + "'s body rubs against " + ktn(target) + "'s, applying electric shocks."),
										(ktn(target) + " let out a deaf scream when " + ktn(actor) + " touched " + gC(target).comPr + " with  its electrified body."),
										(ktn(actor) + " stimulated " + ktn(target) + "'s private parts and shocked them with magic.")
									] );
			}
			if ( flagHitBodyParts ) {
				results.description += " //The attack lands on erogenous body parts, increasing its damage.//";
			} else {
				results.description += " //The attack cannot connect with erogenous body parts, and its damage decreases.//";
			}
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". "
								 + generateSaCostsText(this,actor) + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			if ( gC(actor).race != "monster" ) {
				results.description = ktn(actor) + " tried to grab " + ktn(target) + " genitals, but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
			} else {
				results.description = ktn(actor) + " tried to hit " + ktn(target) + " genitals, but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
			}
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
				   + "\n\n__Influences__:\nDamage: Actor's intelligence x14, actor's will x7, target's will x-10.\nEvasion: Actor's intelligence x7, actor's perception x3, target's will x-8, target's perception x-2, actor's and target's control.";
				   
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

window.createSaQuake = function() {
	var sa = new sceneAction();
	sa.name = "Quake";
	sa.key = "quake";
	
	sa.actionType = "projectile";
	sa.targetType = "group";
	sa.willpowerCost = 4;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.strategyTags.push("damage","magic","physical","damage","damageControl","group");
	sa.affinities.push("physical");
	
	sa.description = "The actor provokes a tremor on the ground, damaging the control of their enemies.\n"
				   + "This attack damages the all enemy targets and their control. High chance of hitting.\nCosts 4 willpower.\n\nMultiple targets action."
				   + "\n\nPhysical projectile attack."
				   + "\n\n__Influences__:\nDamage: Actor's resilience x6, actor's will x4, target's resilience x-3.\nEvasion: Actor's and target's resilience (x2), will (x2), perception (x1) and control."; 
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"resilience") * 0.2 + gCstat(actor,"perception") * 0.1 + gCstat(actor,"will") * 0.2 + gC(actor).control * 2 + 25;
		var evasionMinus = gCstat(target,"will") * 0.2 + gCstat(target,"resilience") * 0.2 + gCstat(target,"perception") * 0.1 + gC(target).control * 2;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   				   
	
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			var colTargets = getCharsTeamMinusSelf(target);
			
			// Damage
			var inDamValue = gCstat(actor,"resilience") * 0.3 + gCstat(actor,"will") * 0.2 - gCstat(target,"resilience") * 0.15;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Control damage
			var controlDamage = 1.4; // 1.4 ~ 2
			controlDamage += ((luckedDiceThrow(gCstat(actor,"luck")) * 0.02) + (gCstat(actor,"will") * 0.002 + (gCstat(actor,"resilience") * 0.002)));
			var controlDamage2 = controlDamage * 0.7;
			// Apply
			applyBarDamage(target,"lust",-damage);
			attackControl(target,controlDamage);
			results.value = damage;
			// Description
			results.description += randomFromList( [
								(ktn(actor) + " agitates the earth, provoking tremors among " + gC(actor).posPr + " foes' legs."),
								(ktn(actor) + " casts a quake against " + ktn(target) + ", damaging " + gC(target).posPr + " balance."),
								(ktn(actor) + " tears the floor's aether apart, provoking it to tremble.")
							] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + " and " + controlDamage.toFixed(1)
								 + " control damage. ";	
			for ( var cT of colTargets ) {
				var cInDamValue = (gCstat(actor,"resilience") * 0.3 + gCstat(actor,"will") * 0.2 - gCstat(cT,"resilience") * 0.15) * 0.3;
				cInDamValue = addLuckFactor(cInDamValue,0.1,gCstat(actor,"luck"));
				var colDamage = calculateAttackEffects("lust",actor,cT,this.affinities,cInDamValue);
				var dmgEffMsg = getWeaknessToAttackText(this.affinities,cT);
				applyBarDamage(cT,"lust",-colDamage);
			attackControl(cT,controlDamage2);
				results.description += dmgEffMsg + ktn(cT) + " received " + textLustDamage(colDamage) + " and " + controlDamage2.toFixed(1)
								 + " control damage. ";
			}
			results.description += generateSaCostsText(this,actor) + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to provoke a quake against " + ktn(target) + ", but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

window.createSaFireBreath = function() {
	var sa = new sceneAction();
	sa.name = "Fire Breath";
	sa.key = "fireBreath";
	
	sa.actionType = "projectile";
	sa.targetType = "group";
	sa.willpowerCost = 3;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.reqTags.push("control");
	
	sa.strategyTags.push("damage","magic","fire","group");
	sa.affinities.push("magic","fire");
	
	sa.description = "The character exhales a fan of flames from their own mouth, potentially hitting several enemies.\n"
				   + "This attack damages the target and their allies.\nCosts 3 willpower.\n\nMultiple targets action."
				   + "\n\nMagical fire projectile attack."
				   + "\n\n__Influences__:\nDamage: Actor's intelligence x2, actor's will x1, target's will x-1, target's resilience x-1.\nEvasion: Actor's will x4, actor's perception x2, actor's resilience x4, target's perception x-3, target's will x-4, target's agility x-3, actor's and target's control."; 
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"will") * 0.2 + gCstat(actor,"perception") * 0.1 + gCstat(actor,"resilience") * 0.2 + gC(actor).control * 5 + 10;
		var evasionMinus = gCstat(target,"will") * 0.2 + gCstat(target,"perception") * 0.15 + gCstat(target,"agility") * 0.15 + gC(target).control * 5;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   				   
	
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			var colTargets = getCharsTeamMinusSelf(target);
			
			// Damage
			var inDamValue = gCstat(actor,"will") * 0.35 + gCstat(actor,"resilience") * 0.2 - gCstat(target,"will") * 0.2;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Apply
			applyBarDamage(target,"lust",-damage);
			// gC(target).lust.attack(-damage);
			results.value = damage;
			// Description
			results.description += randomFromList( [
								(ktn(actor) + " breathes fire out against " + gC(actor).posPr + " enemies, targeting " + ktn(target) + "."),
								("A fan of glames bursts out of " + ktn(actor) + "'s mouth, engulfing " + gC(actor).posPr + " enemies."),
								(ktn(actor) + " spits fire against " + ktn(target) + ".")
							] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". "
			for ( var cT of colTargets ) {
				var cInDamValue = (gCstat(actor,"will") * 0.35 + gCstat(actor,"resilience") * 0.2 - gCstat(cT,"will") * 0.2) * 0.3;
				cInDamValue = addLuckFactor(cInDamValue,0.1,gCstat(actor,"luck"));
				var colDamage = calculateAttackEffects("lust",actor,cT,this.affinities,cInDamValue);
				var dmgEffMsg = getWeaknessToAttackText(this.affinities,cT);
				applyBarDamage(cT,"lust",-colDamage);
				results.description += dmgEffMsg + ktn(cT) + " received " + textLustDamage(colDamage) + ". "
			}
			results.description += generateSaCostsText(this,actor) + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to burn " + ktn(target) + " with some embers, but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}


		// Mixed Physical-Magical
window.createFlaringFeint = function() {
	var sa = new sceneAction();
	sa.name = "Flaring Feint";
	sa.key = "flaringFeint";
	
	sa.actionType = "special";
	sa.targetType = "self";
	sa.willpowerCost = 2;
	sa.energyCost = 2;
	sa.priority = 3;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("control");
	
	sa.strategyTags.push("buff","magic","fire");
	sa.affinities.push("magic","fire");
	
	sa.description = "The actor ignites themself, charging their following attacks. Characters who enter in contact with the actor will be burnt.\n"
				   + "The action increases the agility, willpower, control recovery and fire strength of the character.\nCosts 2 willpower and 2 energy.\n\nSelf targeted action."
				   + "\n\nMagical special attack, increased priority."
				   + "\n\n__Influences__:\nIntensity: Actor's intelligence x3, actor's will x2, actor's agility x2."
				   + "\nDamage: Actor's intelligence x3, actor's will x2."; 
				   
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
			var inIntensity = (gCstat(actor,"intelligence") * 3 + gCstat(actor,"will") * 2 + gCstat(actor,"agility") * 2) / 50;
			var asIntensity = addLuckFactor(inIntensity,0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			var altState = createASflaringFeint(asIntensity);
			// Apply
			applyAlteredState([actor],altState);
			results.value = asIntensity;
			
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " ignited " + gC(actor).refPr + " and jumped back, leaving a trail of ashes in " + gC(actor).posPr + " path."),
										(ktn(actor) + " spins in a ring of fire as " + gC(actor).perPr + " jumps away."),
										("Hungry flames bursted out of " + ktn(actor) + ", who is charging up " + gC(actor).posPr + " next attacks.")
									] );
			 results.description += " " + generateSaCostsText(this,actor);
			 
			 State.variables.sc.endRoundEffects.push(function() {
				var targets = [];
				var i = 0;
				for ( var t of State.variables.sc.teamAchosenTargets ) {
					if ( t == actor ) {
						if ( setup.saList[State.variables.sc.teamAchosenActions[i]].actionType == "contact" ||
							 setup.saList[State.variables.sc.teamAchosenActions[i]].actionType == "hit" || 
							 setup.saList[State.variables.sc.teamAchosenActions[i]].actionType == "pounce" ) {
							targets.push(State.variables.sc.teamAcharKeys[i]);
						}
					}
					i++;
				}
				i = 0;
				for ( var t of State.variables.sc.teamBchosenTargets ) {
					if ( t == actor ) {
						if ( setup.saList[State.variables.sc.teamBchosenActions[i]].actionType == "contact" ||
							 setup.saList[State.variables.sc.teamBchosenActions[i]].actionType == "hit" || 
							 setup.saList[State.variables.sc.teamBchosenActions[i]].actionType == "pounce" ) {
							targets.push(State.variables.sc.teamBcharKeys[i]);
						}
					}
					i++;
				}
				var damages = [];
				var msg = "";
				if ( targets.length > 0 ) {
					msg = ktn(actor) + "'s " + randomFromList(["flares","flames","fires"]) + " " + randomFromList(["lashed out against","burnt","hit"]) + " " + getCharKtns(targets) + " for ";
					var dmgsTxt = [];
					for ( var tar of targets ) {
						var inDamValue = (gCstat(actor,"intelligence") * 0.3 + gCstat(actor,"will") * 0.2) * 0.25;
						inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
						var damage = calculateAttackEffects("lust",actor,tar,["fire"],inDamValue);
						applyBarDamage(tar,"lust",-damage);
						damages.push(damage);
					}
					for ( var dmg of damages ) {
						dmgsTxt.push(colorText(dmg.toFixed(2),"lightcoral"));
					}
					msg += stringArrayToText(dmgsTxt) + colorText(" lust damage","lightcoral") + ".";
				}
				return msg;
			 });
			 
		} else { // Hit fails
			results.value = 0;
			results.description = "This shouldn't ever happen. Please notify me.";
		}
		
		return results;
	}
	return sa;
}

window.createEarthWall = function() {
	var sa = new sceneAction();
	sa.name = "Earth Wall";
	sa.key = "earthWall";
	
	sa.actionType = "special";
	sa.targetType = "self";
	sa.willpowerCost = 2;
	sa.priority = 3;
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("control");
	
	sa.strategyTags.push("buff","physical");
	sa.affinities.push("physical");
	
	sa.description = "The actor builds earth walls with magic, protecting themself and their allies.\n"
				   + "For one turn, the whole team of the actor receives increased resilience and will, decreased perception, greatly increased pounce and physical resistances, slightly increased social and magical resistances.\nAdditionally, enemies using hit or pounce attacks will receive damage.\nCosts 2 willpower.\n\nSelf targeted action."
				   + "\n\nMagical special attack, increased priority."
				   + "\n\n__Influences__:\nIntensity: Actor's resilience x1, actor's will x1."
				   + "\nDamage: Actor's resilience x1, actor's will x1."; 
				   
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
			var inIntensity = (gCstat(actor,"resilience") + gCstat(actor,"will")) / 13;
			var asIntensity = addLuckFactor(inIntensity,0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			var altState = createASearthWall(asIntensity);
			// Apply
			applyAlteredState(getCharsTeam(actor),altState);
			results.value = asIntensity;
			
			// Description
			results.description += randomFromList( [
								(ktn(actor) + " forces the earth to arise, protecting " + gC(actor).posPr + " allies."),
								("Earth walls arise from the ground in defense of " + ktn(actor) + " and " + gC(actor).posPr + " companions."),
								(ktn(actor) + " focuses " + gC(actor).posPr + " aether into dominating the ground, forcing it to rise in " + gC(actor).posPr + " defense.")
									] );
			 results.description += " " + generateSaCostsText(this,actor) + ".";
			 
			 State.variables.sc.endRoundEffects.push(function() {
				var targets = [];
				var i = 0;
				for ( var t of State.variables.sc.teamAchosenTargets ) {
					if ( getCharsTeam(actor).includes(t[0]) ) {
						if ( setup.saList[State.variables.sc.teamAchosenActions[i]].actionType == "hit" || 
							 setup.saList[State.variables.sc.teamAchosenActions[i]].actionType == "pounce" ) {
							targets.push(State.variables.sc.teamAcharKeys[i]);
						}
					}
					i++;
				}
				i = 0;
				for ( var t of State.variables.sc.teamBchosenTargets ) {
					if ( getCharsTeam(actor).includes(t[0]) ) {
						if ( setup.saList[State.variables.sc.teamBchosenActions[i]].actionType == "hit" || 
							 setup.saList[State.variables.sc.teamBchosenActions[i]].actionType == "pounce" ) {
							targets.push(State.variables.sc.teamBcharKeys[i]);
						}
					}
					i++;
				}
				var damages = [];
				var msg = "";
				if ( targets.length > 0 ) {
					msg = ktn(actor) + "'s walls get in the way of " + gC(actor).posPr + " enemies, and " + getCharKtns(targets) + " are hit for ";
					var dmgsTxt = [];
					for ( var tar of targets ) {
						var inDamValue = (gCstat(actor,"resilience") * 0.25 + gCstat(actor,"will") * 0.25) * 0.15;
						inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
						var damage = calculateAttackEffects("lust",actor,tar,["physical"],inDamValue);
						applyBarDamage(tar,"lust",-damage);
						damages.push(damage);
					}
					for ( var dmg of damages ) {
						dmgsTxt.push(colorText(dmg.toFixed(2),"lightcoral"));
					}
					msg += stringArrayToText(dmgsTxt) + colorText(" lust damage","lightcoral") + ".";
				}
				return msg;
			 });
			 
		} else { // Hit fails
			results.value = 0;
			results.description = "This shouldn't ever happen. Please notify me.";
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
				   + "Costs 4 willpower.\n\nSingle target action."
				   + "\nActor requires control. Target requires freed arms."
				   + "\n\nMagical projectile bondage attack."
				   + "\n\n__Influences__:\nControl damage: Actor's intelligence x7, actor's luck x%3.\nIntensity: Actor's intelligence x1.\nEvasion: Actor's intelligence x4, actor's will x3, actor's resilience x3, target's agility x-5, target's perception x-5, actor's and target's control."; 
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"intelligence") * 0.20 + gCstat(actor,"will") * 0.15 + gCstat(actor,"resilience") * 0.15 + gC(actor).control * 2 + 15;
		var evasionMinus = gCstat(target,"agility") * 0.25 + gCstat(target,"perception") * 0.25 + gC(target).control * 2;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
				   
	sa.execute = function(actor,targetActors) {
		if ( actor == "chPlayerCharacter" ) { addToStVarsList("monActUs"); }
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
				   + "\n\n__Influences__:\nDamage and willpower damage: Actor's charisma x5, actor's will x2, target's will x-2.\nControl damage: Actor's will x6, actor's luck: x%1, target's will x-3.\nIntensity: Actor's intelligence x1.\nEvasion: Actor's charisma x5, actor's empathy x5, target's empathy x-2, target's will x-7, actor's and target's control."; 
			   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"charisma") * 0.25 + gCstat(actor,"will") * 0.25 + 15;
		var evasionMinus = gCstat(target,"empathy") * 0.1 + gCstat(target,"will") * 0.35;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   			
		
	sa.execute = function(actor,targetActors) {
		if ( actor == "chPlayerCharacter" ) { addToStVarsList("monActUs"); }
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Willpower Damage
			var inDamValue = gCstat(actor,"charisma") * 0.25 + gCstat(actor,"will") * 0.10 - gCstat(target,"will") * 0.1;
			var inDamValue2 = inDamValue / 2.5;
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
			applyBarDamage(target,"lust",-lustDamage);
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

	// Weapons
// Staff of Battle
window.createStaffSwipe = function() {
	var sa = new sceneAction();
	sa.name = "Staff swipe";
	sa.key = "staffSwipe";
	
	sa.actionType = "hit";
	sa.targetType = "single";
	sa.energyCost = 3; 
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget","control");
	sa.actorBpReqs.push("arms");
	
	sa.requiresFree = true;
	
	sa.strategyTags.push("damage","physical","consumeEnergy","physicalDamage","damageControl");
	sa.affinities.push("physical","weapon");
	
	sa.description = "The character swipes their staff against their opponent, aiming to gain positional advantage.\n"
				   + "This attack damages the target and their control, and recovers the actor's control.\nCosts 3 energy.\n\nSingle target action."
				   + "Actor requires control and free arms."
				   + "\n\nPhysical hit attack."
				   + "\n\n__Influences__:\nDamage: Actor's resilience x5, actor's physique x3, target's resilience x-2."
				   + "\nEvasion: Actor's resilience x4, actor's agility x3, actor's perception x3, actor's control.\nTarget's agility x6, target's perception x5, target's resilience x3, target's control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"resilience") * 0.20 + gCstat(actor,"agility") * 0.15 + gCstat(actor,"perception") * 0.15 + gC(actor).control * 4;
		var evasionMinus = gCstat(target,"resilience") * 0.15 + gCstat(target,"agility") * 0.30 + gCstat(target,"perception") * 0.25 + gC(target).control * 4;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   				   
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		var recoveredControl = 0.20 + (luckedDiceThrow(gCstat(actor,"luck")) * 0.01) + (gCstat(actor,"physique") * 0.001 + (gCstat(actor,"resilience") * 0.001));
		attackControl(actor,-recoveredControl);
		var recControlMsg = ktn(actor) + " recovered " + recoveredControl.toFixed(2) + " control. ";
		if ( evResults.hit ) { // Hit lands
			// Damage
			var inDamValue = gCstat(actor,"resilience") * 0.25 + gCstat(actor,"physique") * 0.15 - gCstat(target,"resilience") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Control damage
			var controlDamage = 1.4; // 1.4 ~ 2.4
			controlDamage += ((luckedDiceThrow(gCstat(actor,"luck")) * 0.05) + (gCstat(actor,"physique") * 0.0025 + (gCstat(actor,"resilience") * 0.0025)));
			// Apply
			applyBarDamage(target,"lust",-damage);
			attackControl(target,controlDamage);
			results.value = damage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " cut the air with " + gC(actor).posPr + " staff, badly hurting " + ktn(target) + "."),
										(ktn(actor) + " struck " + ktn(target) + " with " + gC(actor).posPr + " staff, pushing " + gC(target).comPr + " down."),
										(ktn(actor) + "'s feet danced to a better position as " + gC(actor).perPr + " landed a staff blow on " + ktn(target) + ".")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + " and " + controlDamage.toFixed(1)
								 + " control damage. " + recControlMsg + generateSaCostsText(this,actor)
								 + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to strike " + ktn(target) + ", but failed! " + recControlMsg + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

// Knuckles
window.createBoldJab = function() {
	var sa = new sceneAction();
	sa.name = "Bold jab";
	sa.key = "boldJab";
	
	sa.actionType = "hit";
	sa.targetType = "single";
	sa.energyCost = 2; 
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget","control");
	sa.actorBpReqs.push("arms");
	
	sa.requiresFree = true;
	
	sa.strategyTags.push("damage","physical","consumeEnergy","physicalDamage","damageControl");
	sa.affinities.push("physical","weapon");
	
	sa.description = "The character leaps around to land a punch at their target's sides. Risky.\n"
				   + "This attack damages the target and their control if it lands, but damages the actor's control otherwise.\nCosts 2 energy.\n\nSingle target action."
				   + "Actor requires control and free arms."
				   + "\n\nPhysical hit attack."
				   + "\n\n__Influences__:\nDamage: Actor's physique x5, actor's resilience x3, actor's agility x3, target's resilience x-1, target's agility x-1."
				   + "\nEvasion: Actor's agility x6, actor's physique x5, actor's perception x4, actor's control.\nTarget's perception x5, target's agility 5, target's control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.3 + gCstat(actor,"physique") * 0.25 + gCstat(actor,"perception") * 0.2 + gC(actor).control * 4;
		var evasionMinus = gCstat(target,"perception") * 0.25 + gCstat(target,"agility") * 0.25 + gC(target).control * 4;
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
			var inDamValue = gCstat(actor,"physique") * 0.25 + gCstat(actor,"resilience") * 0.15 + gCstat(actor,"agility") * 0.1 - gCstat(target,"resilience") * 0.05 - gCstat(target,"agility") * 0.05;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Control damage
			var controlDamage = 1.75; // 1.75 ~ 2.9
			controlDamage += ((luckedDiceThrow(gCstat(actor,"luck")) * 0.05) + (gCstat(actor,"physique") * 0.0035 + (gCstat(actor,"agility") * 0.003)));
			// Apply
			applyBarDamage(target,"lust",-damage);
			attackControl(target,controlDamage);
			results.value = damage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " feinted " + ktn(target) + ", and managed to land a blow on " + gC(target).posPr + " lumbar region."),
										(ktn(actor) + " charged against " + ktn(target) + " and punched " + gC(target).posPr + " abdomen during the clash."),
										(ktn(actor) + " tackled " + ktn(target) + ", and landed an ugly punch during the aftermath.")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + " and " + controlDamage.toFixed(1)
								 + " control damage. " + generateSaCostsText(this,actor)
								 + ".\n" + evResults.explanation;
		} else { // Hit fails
			var selfControlDamage = 0.4 - (luckedDiceThrow(gCstat(actor,"luck")) * 0.2);
			attackControl(actor,selfControlDamage);
			results.value = 0;
			results.description = ktn(actor) + " tried to strike " + ktn(target) + ", but failed! " + ktn(actor) + " received " + selfControlDamage.toFixed(1) + " control damage. " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

// Wand
window.createSaChannelAether = function() {
	var sa = new sceneAction();
	sa.name = "Channel aether";
	sa.key = "channelAether";
	
	sa.actionType = "special";
	sa.targetType = "self";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	
	sa.strategyTags.push("magic","recoverWillpower");
	sa.affinities.push("weapon");
	
	sa.description = "The character focuses on the energies surrounding them, absorbing unleashed aether.\n"
				   + "The action makes the actor recover a portion of their maximum willpower.\n\nSelf targeted action."
				   + "\n\nMagical special action."
				   + "\n\n__Influences__:\nIntensity: Actor's will x7, actor's intelligence x3, actor's luck %4."; 
				   
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
			var recoveredWillpower = gC(actor).willpower.max * ( (luckedDiceThrow(gCstat(actor,"luck"))) * 0.004 + gCstat(actor,"will") * 0.007 + gCstat(actor,"intelligence") * 0.003 );
			gC(actor).willpower.changeValue(recoveredWillpower);
			results.value = recoveredWillpower;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " absorbed unleashed aether."),
										(ktn(actor) + " focused on recovering " + gC(actor).posPr + " magical energy."),
										(ktn(actor) + " added wild, untamed aether to " + gC(actor).posPr + " own.")
									] );
			results.description += " " + ktn(actor) + " recovered " + textWillpowerPoints(recoveredWillpower) + ".";
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

// Fan
window.createSaFlaunt = function() {
	var sa = new sceneAction();
	sa.name = "Flaunt";
	sa.key = "flaunt";
	
	sa.actionType = "special";
	sa.targetType = "self";
	sa.socialdriveCost = 3; 
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	
	sa.actorDisabledByAs = [ "Flnt" ];
	
	sa.strategyTags.push("buff","social","alteredState");
	sa.affinities.push("weapon");
	
	sa.description = "The character shows proudly exposes their body, hitting their opponents with raw sex appeal.\n"
				   + "The action increases the actor's physique, agility, will, perception, charisma and damage dealt with sex actions.\n\nSelf targeted action."
				   + "\n\nSocial special action."
				   + "\n\n__Influences__:\nIntensity: Actor's charisma x3, actor's physique x1, actor's agility x1, actor's will x1.";
				   
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
			var inIntensity = (gCstat(actor,"charisma") * 3 + gCstat(actor,"physique") + gCstat(actor,"agility") + gCstat(actor,"will")) * 0.025;
			var asIntensity = addLuckFactor(inIntensity,0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			var altState = createASflaunting(asIntensity);
			// Apply
			applyAlteredState([actor],altState);
			results.value = asIntensity;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " wildly dances around, exposing " + gC(actor).posPr + " body."),
										(ktn(actor) + " extends " + gC(actor).posPr + " arm to the side and winks, taunting " + gC(actor).posPr + " opponent."),
										(ktn(actor) + " flaunts " + gC(actor).posPr + " body features, bursting with sex appeal.")
									] );
			results.description += " " + generateSaCostsText(this,actor) + ".";
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

// Hunting bow
window.createDisablingShot = function() {
	var sa = new sceneAction();
	sa.name = "Disabling shot";
	sa.key = "disablingShot";
	
	sa.actionType = "projectile";
	sa.targetType = "single";
	sa.energyCost = 2; 
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget","control");
	sa.actorBpReqs.push("arms");
	
	sa.requiresFree = true;
	
	sa.strategyTags.push("damage","physical","consumeEnergy","physicalDamage","damageControl");
	sa.affinities.push("physical","weapon");
	
	sa.description = "The character aims to shoot against the limbs of their target, damaging their control recovery.\n"
				   + "This attack damages the target, their control and their control recovery.\nCosts 2 energy.\n\nSingle target action."
				   + "Actor requires control and free arms."
				   + "\n\nPhysical projectile attack."
				   + "\n\n__Influences__:\nLust damage: Actor's agility x2, actor's physique x1, actor's perception x1, target's resilience x-1."
				   + "\nControl damage: Actor's luck x%3, actor's agility x2, actor's perception x1, actor's physique x1"
				   + "\nEvasion: Actor's agility x1, actor's perception x1, actor's control.\nTarget's agility x1, target's perception x1, target's control."
				   + "\nAltered state intensity: Actor's agility x1, actor's perception x1.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.25 + gCstat(actor,"perception") * 0.25 + gC(actor).control * 4;
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
			var inDamValue = gCstat(actor,"agility") * 0.2 + gCstat(actor,"physique") * 0.1 + gCstat(actor,"perception") * 0.1 - gCstat(target,"resilience") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Control damage
			var controlDamage = 1; // 1 ~ 1.7
			controlDamage += ((luckedDiceThrow(gCstat(actor,"luck")) * 0.3) + gCstat(actor,"agility") * 0.002 + gCstat(actor,"perception") * 0.001 + gCstat(actor,"physique") * 0.001);
			// Altered State
			var asIntensity = addLuckFactor((gCstat(actor,"agility") * 0.07 + gCstat(actor,"perception") * 0.07),0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			var altState = createAStaintedControlRecovery(asIntensity);
			// Apply
			applyBarDamage(target,"lust",-damage);
			attackControl(target,controlDamage);
			applyAlteredState([target],altState);
			results.value = damage;
			// Description
			results.description += randomFromList( [
										("A nimble arrow cut the wind, hitting " + ktn(target) + "'s limbs."),
										(ktn(actor) + " carefully aimed at " + ktn(target) + "'s limbs, and " + gC(actor).posPr + " arrow hit the mark."),
										(ktn(actor) + " shot a projectile against " + ktn(target) + "'s weak spots, impairing " + gC(target).posPr + " movement.")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + " and " + controlDamage.toFixed(1)
								 + " control damage. "+ generateSaCostsText(this,actor)
								 + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " aimed at " + ktn(target) + "'s weak spots, but failed the shot! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

// Dildo
window.createSaBaDildoPenetratePussy = function() {
	var sa = new sceneAction();
	sa.name = "Dildo-Pussy Penetration";
	sa.key = "baDildoPenetratePussy";
	sa.actionType = "contact";
	sa.targetType = "single";
	
	sa.tags.push("bs","sUse");
	sa.reqTags.push("diffTarget","control","activePosition","unusedWeapon");
	sa.actorBpReqs.push("arms");
	sa.targetBpReqs.push("pussy");
	
	sa.strategyTags.push("damage","sex","targetPussy");
	sa.affinities.push("sex","targetPussy");
	
	sa.description = "The character starts penetrating their target's pussy with their dildo.\n"  
				   + "\nSingle target continued action.\nRequires an active position over the target, and the target must have a a free pussy."
				   + "\n\nContact attack." 
				   + "\n\n__Influences__:\Initial and continued damage: Actor's physique x2, actor's agility x1, target's resilience x-1.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"physique") * 0.25 + gCstat(actor,"agility") * 0.25 + gCstat(actor,"perception") * 0.25 + gC(actor).control * 5;
		var evasionMinus = gCstat(target,"perception") * 0.15 + gCstat(target,"agility") * 0.5;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}
	sa.execute = function(actor,targetsList) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetsList[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Initial damage
			var inDamValue = gCstat(actor,"physique") * 0.2 + gCstat(actor,"agility") * 0.1 - gCstat(actor,"resilience") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Apply
			gC(target).lust.attack(-damage);
			results.value = damage;
			
			// Position
			//createBposP2PfrontalPounce(actor,[target]);
			
			// Continued action
			State.variables.sc.continuedActions.push(createCaBaDildoPenetratePussy(actor,targetsList));
			
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " pushed " + gC(actor).posPr + " dildo against " + ktn(target) + "'s lower entrance, penetrating " + gC(target).comPr + " fully."),
										(ktn(actor) + " filled " + ktn(target) + "'s " + pussyWord() + " with " + gC(actor).posPr + " " + randomFromList("dildo","weapon","tool","toy") + ", forcing pleasure into " + gC(target).comPr + ".")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". " + generateSaCostsText(this,actor)
								 + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to penetrate " + ktn(target) + "'s " + pussyWord() + " with " + gC(actor).posPr + " dildo, but failed! "	+ "\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

window.createSaBaThrustDildo = function() {
	var sa = new sceneAction();
	sa.name = "Thrust Dildo";
	sa.key = "baThrustDildo";
	sa.actionType = "contact";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredActiveCAs.push("baDildoPenetratePussy");
	
	sa.strategyTags.push("damage","sex","targetPussy");
	sa.affinities.push("sex","targetPussy");
	
	sa.description = "The character pushes their dildo into their target's folds. Actor must be fucking their target with a dildo.\n"
				   + "This attack damages the target, and the actor receives some retaliation.\n\nSingle target action."
				   + "\n\nSexual contact attack."
				   + "\n\n__Influences__:\nDamage: Actor's physique x2, actor's agility x2, target's resilience x-1.";
				   
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
			var inDamValue = (gCstat(actor,"physique") * 0.4 + gCstat(actor,"agility") * 0.4 - gCstat(target,"resilience") * 0.2) * 0.6;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);		
			// Apply
			gC(target).lust.attack(-damage);
			results.value = damage;
			// Description
			results.description += randomFromList( [
									(ktn(actor) + " pushed " + gC(actor).posPr + " " + randomFromList("dildo","toy","tool","weapon","dildo") + " deep into " + ktn(target) + "."),
									(ktn(actor) + " thrusted into " + ktn(target) + "'s " + pussyWord() + "."),
									(ktn(actor) + " penetrated " + ktn(target) + "'s " + randomFromList(["insides","pussy"]) + " with " + gC(actor).posPr + " " + randomFromList("dildo","toy","tool","weapon","dildo") + ".")
								] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + "." + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = "This shouldn't happen.";
		}
		
		return results;
	}
	return sa;
}

// Spear
window.createWeaponPlunge = function() {
	var sa = new sceneAction();
	sa.name = "Weapon Plunge";
	sa.key = "weaponPlunge";
	
	sa.actionType = "hit";
	sa.targetType = "single";
	sa.energyCost = 4; 
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget","control");
	sa.actorBpReqs.push("arms");
	
	sa.requiresFree = true;
	
	sa.strategyTags.push("damage","physical","consumeEnergy","physicalDamage","debuff");
	sa.affinities.push("physical","weapon");
	
	sa.description = "The character thrusts their weapon against their target's skin, provoking injuries.\n"
				   + "Deals damage, slightly reduces the target's physique, agility and resilience, applies bleeding and increases physical weakness."
				   + "\nCosts 4 energy.\n\nSingle target action."
				   + "Actor requires control and free arms."
				   + "\n\nPhysical hit attack."
				   + "\n\n__Influences__:\nLust damage: Actor's physique x2, agility x1, resilience x1, target's resilience x-1."
				   + "\nEvasion: Actor's agility x2, perception x2, physique x1, control.\nTarget's agility x2, perception x2, resilience x1, control."
				   + "\nAltered state intensity: Actor's agility x1, actor's perception x1.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.2 + gCstat(actor,"perception") * 0.2 + gCstat(actor,"physique") * 0.1 + gC(actor).control * 4;
		var evasionMinus = gCstat(target,"agility") * 0.2 + gCstat(target,"perception") * 0.2 + gCstat(target,"resilience") * 0.1 + gC(target).control * 4;
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
			var inDamValue = gCstat(actor,"physique") * 0.2 + gCstat(actor,"agility") * 0.1 + gCstat(actor,"resilience") * 0.1 - gCstat(target,"resilience") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Altered State
			var asIntensity = addLuckFactor((gCstat(actor,"physique") * 0.07 + gCstat(actor,"agility") * 0.04 + gCstat(actor,"resilience") * 0.04),0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			var altState = createASbleedingInjury(asIntensity);
			// Apply
			applyBarDamage(target,"lust",-damage);
			applyAlteredState([target],altState);
			results.value = damage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + "'s weapon lands an ugly hit on " + ktn(target) + ", injuring " + gC(target).comPr + "."),
										(ktn(actor) + " plunges " + gC(actor).posPr + " weapon against " + ktn(target) + ", leaving a bleeding mark."),
										(ktn(target) + " is thrusted by " + ktn(actor) + "'s weapon, and recoils from the damage.")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". "+ generateSaCostsText(this,actor)
								 + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " plunged against " + ktn(target) + "'s skin, but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
			return results;
	}
	return sa;
}

	// Special
window.createBaMonsterCapture = function() {
	var sa = new sceneAction();
	sa.name = "Monster Capture";
	sa.key = "monsterCapture";
	sa.actionType = "projectile";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.strategyTags.push("debuff","damageControl","alteredState","captureMonster");
	
	sa.description = "The character casts a net of specially crafted ropes against a monster, aiming to capture it.\n"
				   + "Only usable on monsters who have lost considerable energy. The actor will lose energy or lust upon use.\n"
				   + "Heavy control damage and general debuffs.\n"
				   + "The ropes are lost upon a successful use. A monster will be captured if it is under the ropes upon victory.\n"
				   + "\nCosts 10 energy, which may overflow into lust damage.\nSingle target action."
				   + "\n\nProjectile attack."
				   + "\n\n__Influences__:\nControl damage: Actor's intelligence x5, perception x5, agility x5, will x5, luck x%6."
				   + "\nIntensity: Actor's intelligence x1, perception x1, agility x1, will x1."
				   + "\nEvasion: Actor's perception x7, agility x4, luck x4, target's perception x-6, agility x-4, luck x-4, actor's and target's control."
				   
	sa.getIsCustomAllowed = function(actionKey,actorKey,targetsKeys,skipLinkedCheck) {
		var isAllowed = false;
		if ( gC(targetsKeys[0]).race == "monster" ) { // Target is monster
			if ( getBarPercentage(targetsKeys[0],"lust") <= 0.5 ) { // Target is weakened enough
				if ( doesCharHaveState(targetsKeys[0],"BnCa") == false ) { // <= Not under the effect of ropes
					if ( ( gC(actorKey).energy.current + gC(actorKey).lust.current ) > 10 ) { // Actor has enough energy or lust
						isAllowed = true;
					}
				}
			}
		}
		return isAllowed;
	}
	
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"perception") * 0.35 + gCstat(actor,"agility") * 0.2 + gCstat(actor,"luck") * 0.2 + gC(actor).control * 2 + 25;
		var evasionMinus = gCstat(target,"perception") * 0.3 + gCstat(target,"agility") * 0.2 + gCstat(target,"luck") * 0.2 + gC(target).control * 4;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}
	
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Wasted energy on actor
			var energyCost = 10;
			var lustOverflow = 0;
			if ( gC(actor).energy.current < 10 ) {
				lustOverflow = 10 - gC(actor).energy.current;
			}
			gC(actor).energy.changeValue(-10);
			gC(actor).lust.changeValue(-lustOverflow);
			
			// Control damage
			var controlDamage = 1.2; // 1.2 ~ 2.5
			controlDamage += ((luckedDiceThrow(gCstat(actor,"luck")) * 0.3) + (gCstat(actor,"intelligence") * 0.0025) + (gCstat(actor,"perception") * 0.0025) + (gCstat(actor,"agility") * 0.0025) + (gCstat(actor,"will") * 0.0025));
			// Altered State
			var asIntensity = addLuckFactor((gCstat(actor,"intelligence") * 0.05 + gCstat(actor,"perception") * 0.05 + gCstat(actor,"agility") * 0.05 + gCstat(actor,"will") * 0.05),0.1,gCstat(actor,"luck"));
			var asIntensity = fixIntensity(asIntensity);
			
			// Altered state: Being Captured
			var altState = createBeingCapturedAs(asIntensity);
			// Finish own altered state
			gC(actor).removeSpecificState("CaNt");
			
			// Apply
			attackControl(target,controlDamage);
			applyAlteredState([target],altState);
			results.value = controlDamage;
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " throws a net of ropes against " + ktn(target) + ", which immediately start draining " + gC(target).posPr + " energy."),
										(ktn(actor) + " manages to trap " + ktn(target) + " under " + gC(actor).posPr + " a capturing net."),
										(ktn(actor) + " successfully gets " + ktn(target) + " trapped under a net of ropes.")
									] );
			results.description += " " + ktn(target) + " received " + controlDamage.toFixed(1) + " control damage. If " + gC(target).perPr
								 + " is defeated in battle, " + gC(target).perPr + " will be captured!\n"
								 + ktn(actor) + " consumed " + textEnergyPoints(10);
								 if ( lustOverflow > 0 ) {
									 results.description += ", which overflowed into " + textLustDamage(lustOverflow);
								 }
			results.description += ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to trap " + ktn(target) + ", but failed! "
								+ "\n" + evResults.explanation;
		}
		return results;
	}
	return sa;
}

window.createBaRunAway = function() {
	var sa = new sceneAction();
	sa.name = "Run away";
	sa.key = "runAway";
	sa.actionType = "special";
	sa.targetType = "self";
	sa.energyCost = 10; 
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	
	sa.strategyTags.push("runAway");
	
	sa.getIsCustomAllowed = function(actionKey,actorKey,targetsKeys,skipLinkedCheck) {
		var isAllowed = true;
		if ( actorKey != "chPlayerCharacter" || State.variables.sc.hasOwnProperty("flightFlag") == false ) {
			isAllowed = false;
		}
		return isAllowed;
	}
	
	sa.description = "The character's team attempts to run away from battle.\n"
				   + "Only allowed in certain scenes.\nSpecial action. Costs 10 energy.\n"
				   + "This action's chance of success depends on the conditions of all characters in both teams of the battle.\n\n"
				   + "__Influences__:\nLarger team x300, Defeated character in team x-300, Character without control in team x-100.\n"
				   + "Each character's agility x3, perception x2, luck x1, control x40.";
				   
	sa.doesHitLand = function(actor,target) {
		var teamApoints = 0;
		var teamBpoints = 0;
		
		//var charsDifference = State.variables.sc.teamAcharKeys.length - State.variables.sc.teamBcharKeys.length;
		//if ( charsDifference >= 0 ) { teamApoints += 30 * charsDifference; } // Difference of characters in each team
		//else { teamBpoints += -30 * charsDifference; }
		teamApoints += 30 * State.variables.sc.teamAcharKeys.length;
		teamBpoints += 30 * State.variables.sc.teamBcharKeys.length;
		for ( var cK of State.variables.sc.teamAcharKeys ) {
			if ( gC(cK).koed ) { // Defeated char, heavy loss of points
				teamApoints -= 30;
			} else if ( gC(cK).control == 0 ) { // Downed char, large loss of points
				teamApoints -= 10;
			} else {
				teamApoints += gC(cK).control * 4; // Control
				teamApoints += gCstat(cK,"agility") * 0.3 + gCstat(cK,"perception") * 0.2 + gCstat(cK,"luck") * 0.1; // Stats
			}
		}
		for ( var cK of State.variables.sc.teamBcharKeys ) {
			if ( gC(cK).koed ) { // Defeated char, heavy loss of points
				teamBpoints -= 30;
			} else if ( gC(cK).control == 0 ) { // Downed char, large loss of points
				teamBpoints -= 10;
			} else {
				teamBpoints += gC(cK).control * 4;
				teamBpoints += gCstat(cK,"agility") * 0.3 + gCstat(cK,"perception") * 0.2 + gCstat(cK,"luck") * 0.1;
			}
		}
		
		var evasionPlus = 0;
		var evasionMinus = 0;
		if ( State.variables.sc.teamAcharKeys.includes(actor) ) {
			evasionPlus = teamApoints; evasionMinus = teamBpoints;
		} else {
			evasionPlus = teamBpoints; evasionMinus = teamApoints;
		}
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}		   				   
	
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = actor;
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			// Flag to finish scene
			State.variables.sc.charactersHaveFledFlag = true;
			// Description
			if ( State.variables.sc.teamAcharKeys.includes(actor) ) {
				var actorTeam = State.variables.sc.teamAcharKeys; var enemyTeam = State.variables.sc.teamBcharKeys;
			} else {
				var actorTeam = State.variables.sc.teamBcharKeys; var enemyTeam = State.variables.sc.teamAcharKeys;
			}
			var descriptionsList = [];
			if ( enemyTeam.length > 1 ) {
				descriptionsList.push("" + ktn(actor) + " feints " + gC(actor).posPr + " enemies into believing " + gC(actor).perPr + "'d face them head on, and initiates a maneuver to run away.");
			} else {
				descriptionsList.push("" + ktn(actor) + " feints " + gC(actor).posPr + " enemy into believing " + gC(actor).perPr + "'d face them head on, and initiates a maneuver to run away.");
			}
			if ( actorTeam.length > 1 ) {
				descriptionsList.push("" + ktn(actor) + " and " + gC(actor).posPr + " companions manage to slip away from battle.");
				descriptionsList.push("Making use of inertia and speed, " + ktn(actor) + " and " + gC(actor).posPr + " teammates leave the enemy behind.");
			} else {
				descriptionsList.push("" + ktn(actor) + " manages to slip away from battle.");
				descriptionsList.push("Making use of inertia and speed, " + ktn(actor) + " leaves the enemy behind.");
			}
			results.description += randomFromList(descriptionsList);
			results.description += " " + generateSaCostsText(this,actor) + ".";
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tries to outrun the adversary, but fails. " + generateSaCostsText(this,actor) + ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}


	// MONSTERS

		// Flying Lookout
window.createBaOrderKneeling = function() {
	var sa = new sceneAction();
	sa.name = "Order kneeling";
	sa.key = "baOrderKneeling";
	
	sa.actionType = "pounce";
	sa.targetType = "single";
	sa.willpowerCost = 5;
	
	sa.tags.push("bs","bPos");
	sa.reqTags.push("diffTarget","control");
	sa.actorBpReqs.push("eyes");
	sa.targetBpReqs.push("eyes");
	
	sa.strategyTags.push("pounce","bPos","useEyes","targetEyes");
	sa.affinities.push("hypnosis","useEyes","targetEyes");
	
	sa.getIsCustomAllowed = function(actionKey,actorKey,targetsKeys,skipLinkedCheck) {
		var isAllowed = true;
		if ( gC(targetsKeys[0]).race == "monster" ) {
			isAllowed = false;
		}
		return isAllowed;
	}
	
	// To re-do
	sa.description = "The character influences their target to make them drop to their knees.\n"
				   + "\nSingle target action."
				   + "\nActor requires control and free eyes, target requires free eyes and not being a monster.\nCosts 5 willpower."
				   + "\n\nPounce attack."
				   + "\n\n__Influences__:\nDamage: Actor's will x2, actor's charisma x2, target's will x-1.\nContinued damage and self damage: Actor's and target's physique x1, actor's and target's resilience x1."
				   + "\nEvasion: Actor's will x5, actor's charisma x5, actor's control.\nTarget's will x7, target's charisma x7, target's control.";
	
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"charisma") * 0.25 + gCstat(actor,"will") * 0.25 + gC(actor).control * 5;
		var evasionMinus = gCstat(target,"will") * 0.35 + gCstat(target,"empathy") * 0.35 + gC(target).control * 15;
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
			var inDamValue = gCstat(actor,"will") * 0.2 + gCstat(actor,"charisma") * 0.2 - gCstat(target,"will") * 0.1;
			if ( inDamValue <= 0 ) { inDamValue = 0; }
			var inDamValue2 = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var damage2 = calculateAttackEffects("willpower",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Apply
			gC(target).lust.attack(-damage);
			var overflowMsg = applyBarDamage(target,"willpower",-damage2);
			depleteControl(target);
			results.value = damage;
			
			// Position
			createBposMakeKneel(actor,[target]);
				
			// Description
			results.description += randomFromList( [
										(ktn(target) + " accepts " + ktn(actor) + "'s suggestion to get on " + gC(target).posPr + " knees."),
										(ktn(target) + "'s will breaks down like a crystal urn fallen into the floor, and so fall " + gC(target).posPr + " legs."),
										(ktn(actor) + " traps " + ktn(target) + "'s eyes with " + gC(actor).posPr + " own, and " + gC(actor).posPr + " mind follows.")
									] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + " and " + textWillpowerDamage(damage2) + ". " + overflowMsg + " " + generateSaCostsText(this,actor)
								 + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to enrapture " + ktn(target) + "'s mind, but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}

window.createBaOrderMasturbation = function() {
	var sa = new sceneAction();
	sa.name = "Order masturbation";
	sa.key = "baOrderMasturbation";
	sa.actionType = "trance";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredActiveCAs.push("baMakingKneel");
	
	sa.strategyTags.push("damage","sex","hypnosis");
	sa.affinities.push("sex","hypnosis");
	
	sa.getIsCustomAllowed = function(actionKey,actorKey,targetsKeys,skipLinkedCheck) {
		var isAllowed = true;
		if ( gC(targetsKeys[0]).race == "monster" ) {
			isAllowed = false;
		}
		return isAllowed;
	}
	
	sa.description = "The character orders their target to masturbate. The target must already be following the actor's orders.\n"
				   + "This attack makes the target attack themself.\nLess effective if the target does not have free arms.\nDamage gets shared between lust and willpower if the target has no free genitals.\n\nSingle target action."
				   + "\n\nSexual, hypnosis trance attack."
				   + "\n\n__Influences__:\nDamage: Target's agility xVar, target's physique xVar, target's will xVar.";
				   
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
			var freeArms = false;
			var freeGenitals = false;
			var extraTags = [];
			var validGenitalsWords = [];
			if ( gC(target).hasFreeBodypart("pussy") ) {
				freeGenitals = true;
				extraTags.push("targetPussy");
				extraTags.push("usePussy");
				validGenitalsWords.push(pussyWord());
			}
			if ( gC(target).hasFreeBodypart("dick") ) {
				freeGenitals = true;
				extraTags.push("targetDick");
				extraTags.push("useDick");
				validGenitalsWords.push(dickWord());
			}
			if ( gC(target).hasFreeBodypart("arms") ) {
				freeArms = true;
				extraTags.push("useArms");
				extraTags.push("targetArms");
			}
			if ( freeGenitals ) {
				// Damage
				var inDamValue = gCstat(target,"agility") * 0.3 + gCstat(target,"physique") * 0.2 - gCstat(target,"will") * 0.1;
				if ( freeArms == false ) { inDamValue *= 0.5; }
				inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
				var damage = calculateAttackEffects("lust",actor,target,this.affinities.concat(extraTags),inDamValue);
				var dmgEffMsg = getWeaknessToAttackText(this.affinities.concat(extraTags),target);
				// Apply
				gC(target).lust.attack(-damage);
				results.value = damage;
				// Description
				if ( freeArms ) {
					results.description += randomFromList( [
										("After receiving " + ktn(actor) + "'s order, " + ktn(target) + " " + randomFromList(["furiously","passionately","obsessively"]) + " pleasures " + gC(target).posPr + " " + randomFromList(validGenitalsWords) + "."),
										("As if it had been " + gC(target).posPr + " own idea, " + ktn(target) + " lowers " + gC(target).posPr + " hands down to " + gC(target).posPr + " nethers, and fulfilling " + ktn(actor) + "'s order.")
									] );
				} else {
					results.description += randomFromList( [
										(ktn(target) + " does " + gC(target).posPr + " best to fulfill " + ktn(actor) + "'s order to masturbate, but " + gC(target).posPr + " tied arms prevent " + gC(target).comPr + " from doing anything other than frotting " + gC(target).posPr + " legs."),
										(ktn(actor) + " orders " + ktn(target) + " to masturbate, but " + gC(target).perPr + " is only capable of frotting " + gC(target).refPr + " against " + gC(target).posPr + " thighs.")
									] );
				}
				results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". " + evResults.explanation;
			} else {
				// Damage
				var inDamValue = gCstat(target,"agility") * 0.3 + gCstat(target,"physique") * 0.1 - gCstat(target,"will") * 0.05;
				if ( freeArms == false ) { inDamValue *= 0.5; }
				var inDamValue2 = inDamValue * 0.5;
				inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
				inDamValue2 = addLuckFactor(inDamValue2,0.1,gCstat(actor,"luck"));
				var damage = calculateAttackEffects("lust",actor,target,this.affinities.concat(extraTags),inDamValue);
				var damage2 = calculateAttackEffects("willpower",actor,target,this.affinities.concat(extraTags),inDamValue);
				var dmgEffMsg = getWeaknessToAttackText(this.affinities.concat(extraTags),target);
				// Apply
				gC(target).lust.attack(-damage);
				var overflowMsg = applyBarDamage(target,"willpower",-damage2);
				results.value = damage;
				// Description
				if ( freeArms ) {
					results.description += randomFromList( [
										("After receiving " + ktn(actor) + "'s order, " + ktn(target) + " " + randomFromList(["furiously","passionately","obsessively"]) + " touches " + gC(target).posPr + " locked " + randomFromList(["genitals","nethers"]) + "."),
										("As if it had been " + gC(target).posPr + " own idea, " + ktn(target) + " lowers " + gC(target).posPr + " hands down to " + gC(target).posPr + " nethers, receiving only frustration in return.")
									] );
				} else {
					results.description += randomFromList( [
										(ktn(target) + " does " + gC(target).posPr + " best to fulfill " + ktn(actor) + "'s order to masturbate, but " + gC(target).posPr + " bound body prevent " + gC(target).comPr + " from doing anything other than shamefully frotting " + gC(target).posPr + " legs."),
										(ktn(actor) + " orders " + ktn(target) + " to masturbate, but " + gC(target).perPr + " is only capable of frotting " + gC(target).refPr + " against " + gC(target).posPr + " thighs.")
									] );
				}
				results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + " and " + textWillpowerDamage(damage2) + ". " + overflowMsg + " " + evResults.explanation;
			}
		} else { // Hit 
			results.value = 0;
			results.description = (ktn(actor) + " tried to force " + ktn(target) + " to masturbate, but failed!" + evResults.explanation);
		}
		
		return results;
	}
	return sa;
}

window.createBaCorrodeMind = function() {
	var sa = new sceneAction();
	sa.name = "Corrode Mind";
	sa.key = "baCorrodeMind";
	sa.actionType = "trance";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredActiveCAs.push("baMakingKneel");
	
	sa.strategyTags.push("damage","hypnosis");
	sa.affinities.push("hypnosis","useEyes","targetEyes");
	
	sa.strategyTags.push("damage","hypnosis");
	sa.affinities.push("hypnosis","useEyes","targetEyes");
	
	sa.description = "The character perfores the confines of the target's mind, damaging their lust and willpower.\n"
				   + "\nSingle target action.\n"
				   + "\nTrance hypnosis attack."
				   + "\n\n__Influences__:\nDamage: Actor's intelligence x2, actor's will x2, actor's charisma x2, target's will x-1.";
				   
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
			var inDamValue = gCstat(actor,"intelligence") * 0.2 + gCstat(actor,"will") * 0.2 + gCstat(actor,"charisma") * 0.2 - gCstat(target,"will") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage2 = calculateAttackEffects("willpower",actor,target,this.affinities,inDamValue*0.4);
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue*0.6);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);	
			// Apply
			gC(target).lust.attack(-damage);
			var overflowMsg = applyBarDamage(target,"willpower",-damage2);
			results.value = damage;
			// Description
			results.description += randomFromList( [
									(ktn(actor) + " eats away " + ktn(target) + "'s " + randomFromList(["concentration","balance","willpower","sanity"]) + "."),
									(ktn(actor) + " finds the weakest links in " + ktn(target) + "'s mind, and breaks them apart."),
									(ktn(target) + " feels " + gC(actor).posPr + " mind being picked apart by " + ktn(actor) + " claws.")
								] );
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + " and " + textWillpowerDamage(damage2) + ". " + overflowMsg + " " + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = "This shouldn't happen.";
		}
		
		return results;
	}
	return sa;
}

		// Essence-sucker
window.createBaDrainingRoots = function() {
	var sa = new sceneAction();
	sa.name = "Draining roots";
	sa.key = "baDrainingRoots";
	sa.actionType = "contact";
	sa.targetType = "single";
	
	sa.tags.push("bs");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	
	sa.strategyTags.push("damage","sex","drain");
	sa.affinities.push("sex","drain");
	
	sa.requiredRace = [ "leirien" , "monster" ];
	
	sa.description = "The character connects their limbs with their target, sucking their aether.\n"
				   + "This attack damages the target and drains their lust.\nThe actor must be either a monster or a leirien."
				   + "\n\nSingle target action."
				   + "\n\nSexual draining contact attack."
				   + "\n\n__Influences__:\nDrain damage: Actor's resilience x5, actor's will x4, target's resilience x-2."
				   + "\nEvasion: Actor's agility x7, actor's perception x3, actor's control.\nTarget's agility x7, target's perception x7, target's control.";
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.35 + gCstat(actor,"perception") * 0.15 + gC(actor).control * 4;
		var evasionMinus = gCstat(target,"agility") * 0.35 + gCstat(target,"perception") * 0.35 + gC(target).control * 4 + 5;
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
			var inDamValue = gCstat(actor,"resilience") * 0.25 + gCstat(actor,"will") * 0.20 - gCstat(actor,"resilience") * 0.10;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			
			// Apply
			applyBarDamage(target,"lust",-damage);
			results.value = damage;
			
			gC(actor).lust.changeValue(damage);
			// Description
			results.description += randomFromList( [
									(ktn(actor) + " inserted " + gC(actor).posPr + " roots in " + ktn(target) + ", and started sucking " + gC(target).posPr + " aether."),
									(ktn(target) + " runs short of breath as " + ktn(actor) + " sucks " + gC(target).posPr + " aether away."),
									(ktn(target) + " is pained by the injection of " + ktn(actor) + " roots, which " + randomFromList(["eagerly","irredeemably","mercilessly"]) + " suck away " + gC(target).posPr + " aether.")
								] );
			results.description += " " + dmgEffMsg + ktn(actor) + " drained " + textLustDamage(damage) + " from " + ktn(target)
								 + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to drain " + ktn(target) + ", but failed!\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}
 
		// Oppressive Yoke
window.createBaOppressiveEmbrace = function() {
	var sa = new sceneAction();
	sa.name = "Oppressive Embrace";
	sa.key = "baOppressiveEmbrace";
	
	sa.actionType = "pounce";
	sa.targetType = "single";
	sa.energyCost = 5;
	sa.willpowerCost = 5;
	
	sa.tags.push("bs","bPos");
	sa.reqTags.push("diffTarget","control");
	
	sa.strategyTags.push("pounce","bPos","frontal");
	sa.affinities.push("pounce");
	
	sa.description = "The character charges against their target, attempting to hold their limbs with aetherial chains.\n"
				   + "Costs 5 energy and 5 willpower.\n\nSingle target action."
				   + "\nActor requires control."
				   + "\n\nPounce attack."
				   + "\n\n__Influences__\nDamage: Actor's physique x3, resilience x2, intelligence x2, will x2."
				   + "\nEvasion: Actor's agility x1, resilience x1, will x1, intelligence x1."
				   + "\nTarget's perception x2, agility x3, will x3."
				   
	sa.doesHitLand = function(actor,target) {
		var evasionPlus = gCstat(actor,"agility") * 0.12 + gCstat(actor,"resilience") * 0.13 + gCstat(actor,"will") * 0.13 + gCstat(actor,"intelligence") * 0.12 + gC(actor).control * 5;
		var evasionMinus = gCstat(target,"perception") * 0.2 + gCstat(target,"agility") * 0.3 + gCstat(target,"will") * 0.3 + gC(target).control * 15;
		return calculateEvasion(this.actionType,actor,target,evasionPlus,evasionMinus);
	}
	sa.execute = function(actor,targetActors) {
		applySaCosts(this,actor);
		
		var results = new saResults;
		var target = targetActors[0];
		
		// Evasion
		var evResults = this.doesHitLand(actor,target);
		
		if ( evResults.hit ) { // Hit lands
			var completeAffinities = this.affinities;
			var lockedBodyparts = [];
			for ( var bp of ["arms","legs"] ) {
				if ( gC(target).body.hasOwnProperty(bp) ) {
					if ( gC(target).body[bp].state == "free" ) {
						if ( limitedRandomInt(100) >= 50 ) {
							lockedBodyparts.push(bp);
						}
					}
				}
			}
			// Initial damage
			var inDamValue = gCstat(actor,"physique") * 0.15 + gCstat(actor,"resilience") * 0.1 + gCstat(actor,"will") * 0.1 + gCstat(actor,"intelligence") * 0.1;
			inDamValue = addLuckFactor(inDamValue,0.1,gCstat(actor,"luck"));
			var damage = calculateAttackEffects("lust",actor,target,this.affinities,inDamValue);
			var dmgEffMsg = getWeaknessToAttackText(this.affinities,target);
			// Apply
			gC(target).lust.attack(-damage);
			depleteControl(target);
			results.value = damage;
			
			// Position
			createBposOppressiveEmbrace(actor,[target],[lockedBodyparts]);
				
			// Description
			results.description += randomFromList( [
										(ktn(actor) + " charged against " + ktn(target) + ","),
										(ktn(actor) + " leaped on " + ktn(target) + ","),
										(ktn(actor) + "'s body feel upon " + ktn(target) + ",")
									] );
			if ( lockedBodyparts.length > 0 ) {
				results.description += randomFromList( [
										(" locking " + gC(target).posPr + " " + stringArrayToText(lockedBodyparts) + " with aethereal chains."),
										(" chaining " + gC(target).posPr + " " + stringArrayToText(lockedBodyparts) + ".")
									] );
			} else {
				results.description += " envolving " + gC(target).posPr + " body with aetherial chains.";
			}
			results.description += " " + dmgEffMsg + ktn(target) + " received " + textLustDamage(damage) + ". " + generateSaCostsText(this,actor)
								 + ".\n" + evResults.explanation;
		} else { // Hit fails
			results.value = 0;
			results.description = ktn(actor) + " tried to tackle " + ktn(target) + ", but failed! " + generateSaCostsText(this,actor)
								+ ".\n" + evResults.explanation;
		}
		
		return results;
	}
	return sa;
}


