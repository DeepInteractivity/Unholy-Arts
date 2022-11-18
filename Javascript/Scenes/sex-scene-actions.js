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
	
	sa.description = "The character strokes a pussy.\nThis action will sensitize the target's pussy.\n\nSingle target action.\n"
				   + "Actor requires free hands, target requires free pussy.\n\nForeplay\n\n__Influences__:\nDamage: Actor's agility x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		
		for (var target of targetActors) {
			var multAr = getSexDamageMult(actorKey,target,this.key);
			var lustDamage = ((getChar(actorKey).agility.getValue() * 2) / 10) * multAr[0];
			getChar(target).lust.changeValue(-lustDamage);
			
			if ( doesCharHaveAlteredState(target,"Pus+") == false ) {
				// Sensitized pussy
				var intensity = 0.05 + gCstat(actorKey,"agility") * 0.005 + limitedRandomInt(5) * 0.01;
				var turns = 4 + limitedRandomInt(4) + (gCstat(actorKey,"agility") * 0.04) - ((gCstat(actorKey,"agility") * 0.04) % 1);
				var as = createSensitizedTag(intensity,"usePussy","Sensitized pussy","Pus+",turns,"The pussy of this character will receive extra damage.");
				applyAlteredState([target],as);
			}
			
			results.value += lustDamage;
			results.description += randomFromList( [
											(ktn(actorKey) + " stroked " + ktn(target) + "'s " + pussyWord() + "."),
											(ktn(actorKey) + " caressed " + ktn(target) + "'s " + pussyWord() + "."),
											(ktn(actorKey) + " masturbated " + ktn(target) + "'s " + pussyWord() + ".") ] );
			results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
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
	sa.unvalidRelationalPositions.push(["mountedFromBehind","mountingFromBehind"],["mountedFromBehind","mountingAndMounted"]);
	
	sa.flavorTags.push("foreplay","useHands","targetBreasts");
	
	sa.description = "The character strokes breasts.\nThis action will sensitize the target's breasts.\n\nSingle target action.\n"
				   + "Actor requires free hands, target requires free breasts.\n\nForeplay.\n\n__Influences__:\nDamage: Actor's agility x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		if ( doesCharHaveAlteredState(target,"Bre+") == false ) {
			// Sensitized breasts
			var intensity = 0.05 + gCstat(actorKey,"agility") * 0.005 + limitedRandomInt(5) * 0.01;
			var turns = 4 + limitedRandomInt(4) + (gCstat(actorKey,"agility") * 0.04) - ((gCstat(actorKey,"agility") * 0.04) % 1);
			var as = createSensitizedTag(intensity,"useBreasts","Sensitized breasts","Bre+",turns,"The breasts of this character will receive extra damage.");
			applyAlteredState([target],as);
		}
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((getChar(actorKey).agility.getValue() * 2) / 10) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " stroked " + ktn(target) + "'s " + boobsWord() + "."),
									(ktn(actorKey) + " massaged " + ktn(target) + "'s " + boobsWord() + "."),
									(ktn(actorKey) + " masturbated " + ktn(target) + "'s " + boobsWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
							   
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
	
	sa.description = "The character massages a dick.\nThis action will sensitize the target's dick.\n\nSingle target action.\n"
				   + "Actor requires free hands, target requires free dick.\n\nForeplay.\n\n__Influences__:\nDamage: Actor's agility x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		if ( doesCharHaveAlteredState(target,"Dic+") == false ) {
			// Sensitized dick
			var intensity = 0.05 + gCstat(actorKey,"agility") * 0.005 + limitedRandomInt(5) * 0.01;
			var turns = 4 + limitedRandomInt(4) + (gCstat(actorKey,"agility") * 0.04) - ((gCstat(actorKey,"agility") * 0.04) % 1);
			var as = createSensitizedTag(intensity,"useDick","Sensitized dick","Dic+",turns,"The dick of this character will receive extra damage.");
			applyAlteredState([target],as);
		}
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((gC(actorKey).agility.getValue() * 2) / 10) * multAr[0];
		gC(target).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " stroked " + ktn(target) + "'s " + dickWord() + "."),
									(ktn(actorKey) + " massaged " + ktn(target) + "'s " + dickWord() + "."),
									(ktn(actorKey) + " masturbated " + ktn(target) + "'s " + dickWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		
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
	
	sa.flavorTags.push("foreplay","useHands","targetAnus");
	
	sa.description = "The character strokes the area surrounding the target's anus.\nThis action will sensitize the target's ass.\n\nSingle target action.\n"
				   + "Actor requires free hands, target requires free anus.\n\nForeplay.\n\n__Influences__:\nDamage: Actor's agility x1.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		if ( doesCharHaveAlteredState(target,"Ass+") == false ) {
			// Sensitized ass
			var intensity = 0.05 + gCstat(actorKey,"agility") * 0.005 + limitedRandomInt(5) * 0.01;
			var turns = 4 + limitedRandomInt(4) + (gCstat(actorKey,"agility") * 0.04) - ((gCstat(actorKey,"agility") * 0.04) % 1);
			var as = createSensitizedTag(intensity,"useAnus","Sensitized ass","Ass+",turns,"The ass of this character will receive extra damage.");
			applyAlteredState([target],as);
		}
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((gC(actorKey).agility.getValue() * 2) / 10) * multAr[0];
		gC(target).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " stroked " + ktn(target) + "'s " + assWord() + "."),
									(ktn(actorKey) + " massaged " + ktn(target) + "'s " + assWord() + "."),
									(ktn(actorKey) + " masturbated " + ktn(target) + "'s " + assWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		
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
	
	sa.description = "The character massages the target's dick with their feet.\nThis action will sensitize the target's dick.\n"
				   + "Actor requires free legs, target requires free dick.\n\nForeplay.\n\n__Influences__:\nDamage: Actor's agility x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		
		for (var target of targetActors) {
			var multAr = getSexDamageMult(actorKey,target,this.key);
			var lustDamage = ((getChar(actorKey).agility.getValue() * 2) / 8) * multAr[0];
			getChar(target).lust.changeValue(-lustDamage);
			
			if ( doesCharHaveAlteredState(target,"Dic+") == false ) {
				// Sensitized dick
				var intensity = 0.05 + gCstat(actorKey,"agility") * 0.005 + limitedRandomInt(5) * 0.01;
				var turns = 4 + limitedRandomInt(4) + (gCstat(actorKey,"agility") * 0.04) - ((gCstat(actorKey,"agility") * 0.04) % 1);
				var as = createSensitizedTag(intensity,"useDick","Sensitized dick","Dic+",turns,"The dick of this character will receive extra damage.");
				applyAlteredState([target],as);
			}
		
			results.value += lustDamage;
			results.description += randomFromList( [
											(ktn(actorKey) + " frotted " + ktn(target) + "'s " + dickWord() + " with " + gC(actorKey).posPr + " feet."),
											(ktn(actorKey) + " gave a footjob to " + ktn(target) + "."),
											(ktn(actorKey) + "'s feet masturbated " + ktn(target) + "'s " + dickWord() + ".") ] );
			results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
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
	
	sa.description = "The character massages the target's pussy with their feet.\nThis action will sensitize the target's pussy.\n"
				   + "Actor requires free legs, target requires free pussy.\n\nForeplay.\n\n__Influences__:\nDamage: Actor's agility x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		
		for (var target of targetActors) {
			var multAr = getSexDamageMult(actorKey,target,this.key);
			var lustDamage = ((getChar(actorKey).agility.getValue() * 2) / 8) * multAr[0];
			getChar(target).lust.changeValue(-lustDamage);
			
			if ( doesCharHaveAlteredState(target,"Pus+") == false ) {
				// Sensitized pussy
				var intensity = 0.05 + gCstat(actorKey,"agility") * 0.005 + limitedRandomInt(5) * 0.01;
				var turns = 4 + limitedRandomInt(4) + (gCstat(actorKey,"agility") * 0.04) - ((gCstat(actorKey,"agility") * 0.04) % 1);
				var as = createSensitizedTag(intensity,"usePussy","Sensitized pussy","Pus+",turns,"The pussy of this character will receive extra damage.");
				applyAlteredState([target],as);
			}
			
			results.value += lustDamage;
			results.description += randomFromList( [
											(ktn(actorKey) + " rubbed " + ktn(target) + "'s " + pussyWord() + " with " + gC(actorKey).posPr + " feet."),
											(ktn(actorKey) + "'s feet stimulated " + ktn(target) + "'s " + pussyWord() + "."),
											(ktn(actorKey) + "'s feet massaged " + ktn(target) + "'s " + pussyWord() + ".") ] );
			results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		}
		
		return results;
	}		
	return sa;
}

		// Weapon stroking actions
window.createSaDildoTeaseGenitals = function() {
	var sa = new sceneAction();
	sa.name = "Dildo Tease Genitals";
	sa.key = "dildoTeaseGenitals";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget","unusedWeapon");
	sa.actorBpReqs.push("arms");
	sa.unvalidRelationalPositions.push(["standing","kneeling"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastFront"],["spitroastTarget","spitroastBehind"],["spitroastFront","spitroastTarget"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	
	sa.flavorTags.push("foreplay","teasing");
	
	sa.description = "The character rubs their dildo against their target's groin, teasing them about what may be about to come."
				   + "\nActor requires free arms.\nMay sometimes increase sensitivity for various available genitals."
				   + "\nInfluenced by the actor's agility, physique and perception.\n\nForeplay, teasing."
				   + "\n\n__Influences__:\nDamage: Actor's agility x2, actor's physique x2, actor's perception x1,"
				   + "\nfree target's genitals body parts.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var actStatsFactor = (gCstat(actorKey,"agility") + gCstat(actorKey,"physique") + gCstat(actorKey,"perception")) * 0.025;
		
		var actorGenitals = ["groin","private parts"];
		var targetGenitals = ["groin","private parts"];
		if ( gC(target).hasFreeBodypart("dick") ) {
			targetGenitals.push("dick");
			if ( limitedRandomInt(32) < 4 ) {
				if ( doesCharHaveAlteredState(target,"Dic+") == false ) {
					// Sensitized dick
					var intensity = 0.05 + actStatsFactor + limitedRandomInt(5) * 0.01;
					var turns = 4 + limitedRandomInt(4) + (actStatsFactor - (actStatsFactor % 1));
					var as = createSensitizedTag(intensity,"useDick","Sensitized dick","Dic+",turns,"The dick of this character will receive extra damage.");
					applyAlteredState([target],as);
				}
			}
		}
		if ( gC(target).hasFreeBodypart("pussy") ) {
			targetGenitals.push("pussy");
			if ( limitedRandomInt(8) < 4 ) {
				if ( doesCharHaveAlteredState(target,"Pus+") == false ) {
					// Sensitized pussy
					var intensity = 0.05 + actStatsFactor + limitedRandomInt(5) * 0.01;
					var turns = 4 + limitedRandomInt(4) + (actStatsFactor - (actStatsFactor % 1));
					var as = createSensitizedTag(intensity,"usePussy","Sensitized pussy","Pus+",turns,"The pussy of this character will receive extra damage.");
					applyAlteredState([target],as);
				}
			}
		}
		if ( gC(target).hasFreeBodypart("anus") ) {
			targetGenitals.push("ass");
			if ( limitedRandomInt(16) < 4 ) {
				if ( doesCharHaveAlteredState(target,"Ass+") == false ) {
					// Sensitized anus
					var intensity = 0.05 + actStatsFactor + limitedRandomInt(5) * 0.01;
					var turns = 4 + limitedRandomInt(4) + (actStatsFactor - (actStatsFactor % 1));
					var as = createSensitizedTag(intensity,"useAnus","Sensitized ass","Ass+",turns,"The ass of this character will receive extra damage.");
					applyAlteredState([target],as);
				}
			}
		}
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = (getChar(actorKey).agility.getValue() * 2 + getChar(actorKey).perception.getValue() + getChar(actorKey).physique.getValue() ) / 15;
		lustDamage *= (0.3 * targetGenitals.length) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		
		results.description = randomFromList([(ktn(actorKey) + " played with " + ktn(target) + "'s " + randomFromList(targetGenitals) + " using " + gC(actorKey).posPr + " dildo."),
									(ktn(actorKey) + " teased " + ktn(target) + "'s " + randomFromList(targetGenitals) + " with " + gC(actorKey).posPr + " dildo."),
									(ktn(target) + "'s " + randomFromList(targetGenitals) + " tingled from the contact with " + ktn(actorKey) + "'s dildo.")]);
		results.description += ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
							
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
	sa.unvalidRelationalPositions.push(["mountingFromBehind","mountingAndMounted"],["mountingAndMounted","mountingFromBehind"],["mountingAndMounted","mountedFromBehind"],["mountedFromBehind","mountingAndMounted"]);
	
	sa.flavorTags.push("foreplay","useMouth","targetMouth");
	
	sa.description = "The character slowly kisses another character's lips.\n\nSingle target action.\n"
				   + "Actor requires free mouth, target requires free mouth.\n\nForeplay.\n\n__Influences__:\nDamage: Actor's agility x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((getChar(actorKey).agility.getValue() * 2) / 10) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " kissed " + ktn(target) + "'s lips."),
									(ktn(actorKey) + " placed " + getChar(actorKey).posPr + " own lips on " + ktn(target) + "'s."),
									(ktn(actorKey) + " tempted " + ktn(target) + "'s lips with " + getChar(actorKey).posPr + " own.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
							   
		return results;
	}
	return sa;
}
window.createSaFrottage = function() {
	var sa = new sceneAction();
	sa.name = "Groin Frottage";
	sa.key = "frottage";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.unvalidRelationalPositions.push(["kneeling","standing"],["standing","kneeling"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastFront"],["spitroastFront","spitroastTarget"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	
	sa.flavorTags.push("foreplay","teasing");
	
	sa.description = "The character rubs their groin against someone else's private parts.\nMay sometimes increase the sensitivity and desire for various available genitals.\n\nSingle target action."
				   + "\nInfluenced by actor's agility, perception and charisma.\n\nForeplay."
				   + "\n\n__Influences__:\nDamage: Actor's agility x2, actor's perception x1,actor's charisma x1,"
				   + "\nfree actor's genital body parts, free target's genital body parts.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var actStatsFactor = (gCstat(actorKey,"agility") + gCstat(actorKey,"perception") + gCstat(actorKey,"charisma")) * 0.02;
		
		var actorGenitals = ["groin","private parts"];
		var targetGenitals = ["groin","private parts"];
		if ( gC(actorKey).hasFreeBodypart("dick") ) {
			actorGenitals.push("dick");
			if ( limitedRandomInt(32) < 4 ) {
				if ( doesCharHaveAlteredState(actorKey,"Dic+") == false ) {
					// Sensitized dick
					var intensity = 0.05 + actStatsFactor + limitedRandomInt(5) * 0.01;
					var turns = 4 + limitedRandomInt(4) + (actStatsFactor - (actStatsFactor % 1));
					var as = createSensitizedTag(intensity,"useDick","Sensitized dick","Dic+",turns,"The dick of this character will receive extra damage.");
					applyAlteredState([actorKey],as);
				}
			}
			if ( limitedRandomInt(32) < 4 ) {
				if ( doesCharHaveAlteredState(target,"DicT") == false ) {
					// Desired dick
					var intensity = 0.05 + actStatsFactor + limitedRandomInt(5) * 0.01;
					var turns = 4 + limitedRandomInt(4) + (actStatsFactor - (actStatsFactor % 1));
					var as = createSensitizedTag(intensity,"targetDick","Desired dick","DicT",turns,"This character will receive extra damage when affected by other dicks.");
					applyAlteredState([target],as);
				}
			}
		}
		if ( gC(actorKey).hasFreeBodypart("pussy") ) {
			actorGenitals.push("pussy");
			if ( limitedRandomInt(32) < 4 ) {
				if ( doesCharHaveAlteredState(actorKey,"Pus+") == false ) {
					// Sensitized pussy
					var intensity = 0.05 + actStatsFactor + limitedRandomInt(5) * 0.01;
					var turns = 4 + limitedRandomInt(4) + (actStatsFactor - (actStatsFactor % 1));
					var as = createSensitizedTag(intensity,"usePussy","Sensitized pussy","Pus+",turns,"The pussy of this character will receive extra damage.");
					applyAlteredState([actorKey],as);
				}
			}
			if ( limitedRandomInt(32) < 4 ) {
				if ( doesCharHaveAlteredState(target,"PusT") == false ) {
					// Desired pussy
					var intensity = 0.05 + actStatsFactor + limitedRandomInt(5) * 0.01;
					var turns = 4 + limitedRandomInt(4) + (actStatsFactor - (actStatsFactor % 1));
					var as = createSensitizedTag(intensity,"targetPussy","Desired pussy","PusT",turns,"This character will receive extra damage when affected by other pussies.");
					applyAlteredState([target],as);
				}
			}
		}
		if ( gC(target).hasFreeBodypart("dick") ) {
			targetGenitals.push("dick");
			if ( limitedRandomInt(32) < 4 ) {
				if ( doesCharHaveAlteredState(target,"Dic+") == false ) {
					// Sensitized dick
					var intensity = 0.05 + actStatsFactor + limitedRandomInt(5) * 0.01;
					var turns = 4 + limitedRandomInt(4) + (actStatsFactor - (actStatsFactor % 1));
					var as = createSensitizedTag(intensity,"useDick","Sensitized dick","Dic+",turns,"The dick of this character will receive extra damage.");
					applyAlteredState([target],as);
				}
			}
			if ( limitedRandomInt(32) < 4 ) {
				if ( doesCharHaveAlteredState(actorKey,"DicT") == false ) {
					// Desired dick
					var intensity = 0.05 + actStatsFactor + limitedRandomInt(5) * 0.01;
					var turns = 4 + limitedRandomInt(4) + (actStatsFactor - (actStatsFactor % 1));
					var as = createSensitizedTag(intensity,"targetDick","Desired dick","DicT",turns,"This character will receive extra damage when affected by other dicks.");
					applyAlteredState([actorKey],as);
				}
			}
		}
		if ( gC(target).hasFreeBodypart("pussy") ) {
			targetGenitals.push("pussy");
			if ( limitedRandomInt(32) < 4 ) {
				if ( doesCharHaveAlteredState(target,"Pus+") == false ) {
					// Sensitized pussy
					var intensity = 0.05 + actStatsFactor + limitedRandomInt(5) * 0.01;
					var turns = 4 + limitedRandomInt(4) + (actStatsFactor - (actStatsFactor % 1));
					var as = createSensitizedTag(intensity,"usePussy","Sensitized pussy","Pus+",turns,"The pussy of this character will receive extra damage.");
					applyAlteredState([target],as);
				}
			}
			if ( limitedRandomInt(32) < 4 ) {
				if ( doesCharHaveAlteredState(actorKey,"PusT") == false ) {
					// Desired pussy
					var intensity = 0.05 + actStatsFactor + limitedRandomInt(5) * 0.01;
					var turns = 4 + limitedRandomInt(4) + (actStatsFactor - (actStatsFactor % 1));
					var as = createSensitizedTag(intensity,"targetPussy","Desired pussy","PusT",turns,"This character will receive extra damage when affected by other pussies.");
					applyAlteredState([actorKey],as);
				}
			}
		}
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var multAr2 = getSexDamageMult(target,actorKey,this.key);
		var lustDamage = (getChar(actorKey).agility.getValue() * 2 + getChar(actorKey).perception.getValue() + getChar(actorKey).charisma.getValue() ) / 15;
		var lustDamage2 = lustDamage / 4;
		lustDamage *= (0.4 * actorGenitals.length - 0.2) * multAr[0];
		lustDamage2 *= (0.4 * targetGenitals.length - 0.2) * multAr2[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		
		results.description += ktn(actorKey) + randomFromList([" frotted "," pressed "]) + gC(actorKey).posPr + " " + randomFromList(actorGenitals);
		results.description += " against " + ktn(target) + "'s " + randomFromList(targetGenitals) + ". ";
		results.description += ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
							
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
	
	sa.requiredPositions.push("kneeling","spitroastTarget");
	sa.targetRequiredPositions.push("standing","spitroastFront");
	sa.linkedPositions = true;
	
	sa.flavorTags.push("foreplay","useMouth","targetLegs");
	
	sa.description = "The character tastes the skin of the target's legs.\n\nSingle target action.\n"
				   + "Actor requires free mouth, target requires free legs.\n\nForeplay.\n\n__Influences__:\nDamage: Actor's agility x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((getChar(actorKey).agility.getValue() * 2) / 14) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-(lustDamage/2));
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " licked " + ktn(target) + "'s thighs."),
									(ktn(actorKey) + "'s tongue traced a line along " + ktn(target) + "'s leg."),
									(ktn(actorKey) + " kissed and licked " + ktn(target) + "'s calves.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + ktn(actorKey)
							 + " received " + textLustDamage((lustDamage/2)) + ". " + multAr[1];
							   
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
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var multAr2 = getSexDamageMult(actorKey,actorKey,this.key);
		var lustDamage = ((getChar(actorKey).physique.getValue() * 3 + getChar(actorKey).agility.getValue() + getChar(actorKey).will.getValue()) / 10);
		var lustDamage2 = (lustDamage / 5) * multAr2[0];
		lustDamage *= multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " " + dickWord() + " deep into " + ktn(target) + "."),
									(ktn(actorKey) + " thrusted into " + ktn(target) + "."),
									(ktn(actorKey) + " penetrated " + ktn(target) + "'s " + randomFromList(["insides","pussy"]) + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
		
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
	
	sa.flavorTags.push("fullsex","useDick","targetAnus","top");
	
	sa.description = "The character slides their dick through the target's rear. Actor and target must already be connected.\n\nSingle target action."
				   + "\n\nFull sex.\n\n__Influences__:\nDamage: Actor's resilience x10, actor's agility x6, actor's will x4.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var multAr2 = getSexDamageMult(actorKey,actorKey,this.key);
		var lustDamage = ((getChar(actorKey).resilience.getValue() * 2.5 + getChar(actorKey).agility.getValue() * 1.5 + getChar(actorKey).will.getValue()) / 10);
		var energyDamage = (lustDamage / 4) * multAr[0];
		var lustDamage2 = (lustDamage / 4) * multAr2[0];
		lustDamage *= multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(targetActors[0]).energy.changeValue(-energyDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " " + dickWord() + " deep into " + ktn(target) + "."),
									(ktn(actorKey) + " thrusted into " + ktn(target) + "."),
									(ktn(actorKey) + " penetrated " + ktn(target) + "'s " + assWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + " and " + textEnergyDamage(energyDamage) + ". " + multAr[1];
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
		
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
	
	sa.flavorTags.push("fullsex","useDick","targetPussy","targetAnus","top");
	
	sa.description = "The character slides two dicks into their partner's insides. Actor and target must already be connected.\n\nSingle target action."
				   + "\n\nFull sex.\n\n__Influences__:\nDamage, energy damage, self damage: Actor's physique x2, actor's resilience x2, actor's agility x1, actor's will x1.";
	sa.execute = function(actorKey,targetActors) {
		var actor = actorKey;
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var multAr2 = getSexDamageMult(actorKey,actorKey,this.key);
		var lustDamage = (( gC(actor).physique.getValue() * 2 + gC(actor).agility.getValue() * 1 + gC(actor).resilience.getValue() * 2 + gC(actor).will.getValue() * 1 ) / 10);
		var energyDamage = (lustDamage / 4) * multAr[0];
		var lustDamage2 = (lustDamage / 6) * multAr2[0];
		lustDamage *= multAr[0];
		
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(targetActors[0]).energy.changeValue(-energyDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " " + dickWord() + "s deep into " + ktn(target) + "."),
									(ktn(actorKey) + " thrusted into " + ktn(target) + "'s insides."),
									(ktn(actorKey) + " penetrated both " + ktn(target) + "'s " + pussyWord() + " and " + assWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + " and " + textEnergyDamage(energyDamage) + ". " + multAr[1];
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
		
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
	sa.requiredPassiveCAs.push("takingFromBehind","penetratePussy","doublePenetration");
	
	sa.flavorTags.push("fullsex","usePussy","targetDick","bottom");
	
	sa.description = "The character pushes their hips back against someone else's dick. Target must already be penetrating the pussy of the actor."
				   + "\n\nSingle target action.\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's resilience x3, actor's agility x1, actor's will x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var multAr2 = getSexDamageMult(actorKey,actorKey,this.key);
		var lustDamage = (getChar(actorKey).resilience.getValue() * 3 + getChar(actorKey).agility.getValue() + getChar(actorKey).will.getValue()) / 20;
		var lustDamage2 = (lustDamage / 5) * multAr2[0];
		lustDamage *= multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " pressed " + gC(actorKey).posPr + " hips back against " + ktn(target)
								+ ", getting impaled in " + gC(target).posPr + " " + dickWord() + "."),
								(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " " + pussyWord() + " hard against  "
								+ ktn(target) + "'s " + dickWord() + ".")
								] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
		
		return results;
	}
	return sa;
}
window.createSaPushAssBack = function() {
	var sa = new sceneAction();
	sa.name = "Push Ass Back";
	sa.key = "pushAssBack";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredPassiveCAs.push("takingFromBehind","penetrateAss","doublePenetration");
	
	sa.flavorTags.push("fullsex","useAnus","targetDick","bottom");
	
	sa.description = "The character pushes their hips back against someone else's dick. Target must already be penetrating the ass of the actor."
				   + "\n\nSingle target action.\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's resilience x3, actor's agility x1, actor's will x1.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var multAr2 = getSexDamageMult(actorKey,actorKey,this.key);
		var lustDamage = (getChar(actorKey).resilience.getValue() * 3 + getChar(actorKey).agility.getValue() + getChar(actorKey).will.getValue()) / 20;
		var lustDamage2 = (lustDamage / 5) * multAr2[0];
		lustDamage *= multAr[0];
		getChar(targetActors[0]).lust.changeValue(-(lustDamage*0.7));
		getChar(targetActors[0]).energy.changeValue(-(lustDamage*0.3));
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " pressed " + gC(actorKey).posPr + " " + assWord() + " back against " + ktn(target)
								+ ", getting impaled in " + gC(target).posPr + " " + dickWord() + "."),
								(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " " + assWord() + " hard against  "
								+ ktn(target) + "'s " + dickWord() + ".")
								] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage*0.7) + " and " + textEnergyDamage(lustDamage*0.3) + ". " + multAr[1];
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
		
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
		 
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var multAr2 = getSexDamageMult(actorKey,actorKey,this.key);
		 var lustDamage = ((getChar(actorKey).physique.getValue() * 5 + getChar(actorKey).agility.getValue() * 2 + getChar(actorKey).resilience.getValue() * 3) / 10);
		 var lustDamage2 = (lustDamage / 1.5) * multAr2[0];
		 lustDamage *= multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actor) + " forcefully went into " + ktn(target) + " with all " + gC(actor).posPr + " strength."),
									(ktn(actor) + " is repeteadly pushing " + gC(actor).posPr + " " + dickWord() + " into " + ktn(target) + "."),
									(ktn(actor) + " is dominating " + ktn(target) + "'s " + pussyWord() + ", pushing back and forth.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		results.description += ktn(actor) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1] + generateSaCostsText(this,actor) + ". ";
		 
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
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((getChar(actorKey).physique.getValue() * 3 + getChar(actorKey).resilience.getValue() * 2) / 2) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-getChar(actorKey).lust.current);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actor) + " reached as deep as humanly possible within " + ktn(target)
								+ ", putting " + gC(actor).posPr + " whole being into one final push."),
								(ktn(actor) + "'s " + dickWord() + " aimed for the final frontier within " + ktn(target) + "'s " + pussyWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
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
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var multAr2 = getSexDamageMult(actorKey,actorKey,this.key);
		var lustDamage = (getChar(actorKey).physique.getValue() * 3 + getChar(actorKey).agility.getValue() + getChar(actorKey).will.getValue()) / 10;
		var lustDamage2 = (lustDamage / 5) * multAr2[0];
		lustDamage *= multAr[0];
		
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " let " + gC(actorKey).posPr + " hips fall upon " + ktn(target) + "'s " + dickWord() + "."),
									(ktn(actorKey) + " tightened " + gC(actor).refPr + " around " + ktn(target) + "'s " +  dickWord() + "."),
									(ktn(actorKey) + "'s " + pussyWord() + " sucked " + ktn(target) + "'s " + dickWord() + " up.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
		
		return results;
	}
	return sa;	
}
window.createSaAnalRideDick = function() {
	var sa = new sceneAction();
	sa.name = "Anally ride dick";
	sa.key = "analRideDick";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredActiveCAs.push("analMountDick");
	
	sa.flavorTags.push("fullsex","useAnus","targetDick","top");
	
	sa.description = "The character moves up and down their partner's dick. Actor and target must already be connected.\n\nSingle target action."
				   + "\n\nFull sex.\n\n__Influences__:\nDamage: Actor's physique x3, actor's resilience x1, actor's will x1.";
	sa.execute = function(actorKey,targetActors) {
		var actor = actorKey;
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var multAr2 = getSexDamageMult(actorKey,actorKey,this.key);
		var lustDamage = (getChar(actorKey).physique.getValue() * 3 + getChar(actorKey).resilience.getValue() + getChar(actorKey).will.getValue()) * 0.7 / 10;
		var energyDamage = (getChar(actorKey).physique.getValue() * 3 + getChar(actorKey).resilience.getValue() + getChar(actorKey).will.getValue()) * 0.3 / 10;
		var lustDamage2 = (lustDamage / 5) * multAr2[0];
		lustDamage *= multAr[0];
		
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(targetActors[0]).energy.changeValue(-energyDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " let " + gC(actorKey).posPr + " hips fall upon " + ktn(target) + "'s " + dickWord() + "."),
									(ktn(actorKey) + " moved back and forth, frotting " + gC(actor).posPr + " backsides around " + ktn(target) + "'s " +  dickWord() + "."),
									(ktn(actorKey) + "'s " + assWord() + " tightened around " + ktn(target) + "'s " + dickWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + " and " + textEnergyDamage(energyDamage) + ". " + multAr[1];
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
		
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
	
	sa.flavorTags.push("fullsex","useDick","targetPussy","bottom");
	
	sa.description = "The character pushes their dick back against someone else's genitals. Target must already be riding the actor."
				   + "\n\nSingle target action.\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's resilience x3, actor's agility x1, actor's will x1.";
	sa.execute = function(actorKey,targetActors) {
		var actor = actorKey;
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var multAr2 = getSexDamageMult(actorKey,actorKey,this.key);
		var lustDamage = (getChar(actorKey).resilience.getValue() * 3 + getChar(actorKey).agility.getValue() + getChar(actorKey).will.getValue()) * multAr[0] / 20;
		var lustDamage2 = (lustDamage / 5) * multAr2[0];
		lustDamage *= multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " " + dickWord() + " against " + ktn(target) + "."),
								(ktn(actorKey) + " thrusted " + ktn(target) + "'s " + pussyWord() + "."),
								(ktn(actorKey) + "'s " + dickWord() + " retaliated against " + ktn(target) + "'s " + pussyWord() + ".")
								] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
		
		return results;
	}
	return sa;
}
window.createSaAnalPushDickBack = function() {
	var sa = new sceneAction();
	sa.name = "Push Dick Back Against Ass";
	sa.key = "analPushDickBack";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredPassiveCAs.push("analMountDick");
	
	sa.flavorTags.push("fullsex","useDick","targetAnus","bottom");
	
	sa.description = "The character pushes their dick back against someone else's ass. Target must already be riding the actor."
				   + "\n\nSingle target action.\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's resilience x3, actor's agility x1, actor's will x1.";
	sa.execute = function(actorKey,targetActors) {
		var actor = actorKey;
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var multAr2 = getSexDamageMult(actorKey,actorKey,this.key);
		var lustDamage = (getChar(actorKey).resilience.getValue() * 3 + getChar(actorKey).agility.getValue() + getChar(actorKey).will.getValue()) * multAr[0] * 0.7 / 20;
		var energyDamage = (getChar(actorKey).resilience.getValue() * 3 + getChar(actorKey).agility.getValue() + getChar(actorKey).will.getValue()) * multAr[0] * 0.3 / 20;
		var lustDamage2 = (lustDamage / 5) * multAr2[0];
		lustDamage *= multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(targetActors[0]).energy.changeValue(-energyDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " " + dickWord() + " against " + ktn(target) + "."),
								(ktn(actorKey) + " thrusted " + ktn(target) + "'s " + assWord() + "."),
								(ktn(actorKey) + "'s " + dickWord() + " retaliated against " + ktn(target) + "'s " + assWord() + ".")
								] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + " and " + textEnergyDamage(energyDamage) + ". " + multAr[1];
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
		
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
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var multAr2 = getSexDamageMult(actorKey,actorKey,this.key);
		var lustDamage = (getChar(actorKey).physique.getValue() * 2.8 + getChar(actorKey).agility.getValue() * 2) / 10;
		var lustDamage2 = (lustDamage / 5) * multAr2[0];
		lustDamage *= multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " frotted " + gC(actorKey).posPr + " own " + pussyWord() + " against " + ktn(target) + "'s."),
									(ktn(actorKey) + " slid " + gC(actorKey).posPr + " groin through " + ktn(target) + "'s " + pussyWord() + ", seeking pleasure."),
									(ktn(actorKey) + " squeezed " + ktn(target) + "'s groin against " + gC(actorKey).posPr + " own " + pussyWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
		
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
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = (getChar(actorKey).agility.getValue() * 3) / 10;
		lustDamage *= ((targetGenitals.length + 1) * 0.2) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " licked " + ktn(target) + "'s " + randomFromList(targetGenitals) + "."),
								(ktn(actorKey) + " pleasured " + ktn(target) + "'s " + randomFromList(targetGenitals) + " with "
								+ gC(actorKey).posPr + " tongue."),
								(ktn(actorKey) + " throughly cleaned " + ktn(target) + "'s " + randomFromList(targetGenitals)
								+ " with " + gC(actorKey).posPr + " mouth.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		
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
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = (getChar(actorKey).agility.getValue() / 3) * multAr[0];
		gC(target).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actor) + " sucked " + ktn(target) + "'s " + dickWord() + "."),
								(ktn(actor) + " throughly licked " + ktn(target) + "'s " + dickWord() + " within " + gC(actor).posPr + " mouth."),
								(ktn(actor) + " ran " + gC(actor).posPr + " tongue through " + ktn(target) + "'s " + dickWord() + "'s skin.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		
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
		
		var multAr = getSexDamageMult(actorKey,actorKey,this.key);
		var multAr2 = getSexDamageMult(actorKey,target,this.key);
		var lustDamageSelf = (getChar(actorKey).physique.getValue() / 10 + getChar(actorKey).agility.getValue() / 10) * multAr[0];
		var lustDamageTarget = (getChar(actorKey).physique.getValue() / 14 + getChar(actorKey).agility.getValue() / 14) * multAr2[0];
		var willpowerDamageTarget = (getChar(actorKey).physique.getValue() / 20 + getChar(actorKey).agility.getValue() / 20) * multAr2[0];
		gC(actor).lust.changeValue(-lustDamageSelf);
		gC(target).lust.changeValue(-lustDamageTarget);
		gC(target).willpower.changeValue(-willpowerDamageTarget);
		results.value += lustDamageTarget;
		
		results.description += randomFromList( [
								(ktn(actor) + " fiercely penetrated " + ktn(target) + "'s throat."),
								(ktn(target) + " struggles to breathe due to " + ktn(actor) + "'s enthusiam in fucking " + gC(target).posPr + " throat."),
								(ktn(actor) + "'s " + dickWord() + " is looking for treasure within " + ktn(target) + "'s mouth."),
								(ktn(actor) + " keeps pushing " + gC(actor).posPr + " " + dickWord() + " into " + ktn(target) + "'s mouth.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamageTarget) + " and " + textWillpowerDamage(willpowerDamageTarget)
							 + ". " + multAr2[1] + ktn(actor) + " received " + textLustDamage(lustDamageSelf) + ". " + multAr[1];
		
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
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = (getChar(actorKey).agility.getValue() / 3) * multAr[0];
		gC(target).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actor) + " is eating " + ktn(target) + "'s " + pussyWord() + "."),
								(ktn(actor) + " throughly licked " + ktn(target) + "'s " + pussyWord() + "'s folds."),
								(ktn(actor) + " ran " + gC(actor).posPr + " tongue through every corner of " + ktn(target) + "'s " + pussyWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		
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
		
		var multAr = getSexDamageMult(actorKey,actorKey,this.key);
		var multAr2 = getSexDamageMult(actorKey,target,this.key);
		var lustDamageSelf = (getChar(actorKey).physique.getValue() / 10 + getChar(actorKey).agility.getValue() / 10) * multAr[0];
		var lustDamageTarget = (getChar(actorKey).physique.getValue() / 14 + getChar(actorKey).agility.getValue() / 14) * multAr2[0];
		var willpowerDamageTarget = (getChar(actorKey).physique.getValue() / 20 + getChar(actorKey).agility.getValue() / 20) * multAr2[0];
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
							 + ". " + multAr2[1] + ktn(actor) + " received " + textLustDamage(lustDamageSelf) + ". " + multAr[1];
		
		return results;
	}
	return sa;
}

	// Weapon
window.createSaThrustDildo = function() {
	var sa = new sceneAction();
	sa.name = "Thrust dildo";
	sa.key = "thrustDildo";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredActiveCAs.push("dildoPenetratePussy","dildoPenetrateAss","dildoPenetrateMouth");
	
	sa.flavorTags.push("top");
	
	sa.description = "The character thrusts their dildo into the target's bodypart it's inserted at. Different effects depending on the active continued action.\n\nSingle target action."
				   + "\n\n__Influences__:\nDamage: Actor's physique x1, actor's agility x1.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		// Custom flavor tags
		var aFlavorTags = ["top"];
		var currentCAs = getCurrentContinuedActionsBetweenInitiatorAndTarget(actorKey,target);
		if ( currentCAs.includes("dildoPenetratePussy")) {
			aFlavorTags.push("targetPussy");
		}
		if ( currentCAs.includes("dildoPenetrateAss")) {
			aFlavorTags.push("targetAnus");
		}
		if ( currentCAs.includes("dildoPenetrateMouth")) {
			aFlavorTags.push("targetMouth");
		}
		var multAr = getSexDamageMultAlt(actorKey,target,aFlavorTags);
		
		var lustDamage = ((getChar(actorKey).physique.getValue() * 1 + getChar(actorKey).agility.getValue() + getChar(actorKey).will.getValue()) / 12);
		var energyDamage = 0;
		var socialdriveDamage = 0;
		var targetPartText = ["insides"];
		
		// Extra effects
		if ( currentCAs.includes("dildoPenetratePussy")) {
			lustDamage *= 1.3;
			targetPartText.push("pussy","pussy");
		}
		if ( currentCAs.includes("dildoPenetrateAss")) {
			energyDamage = lustDamage * 0.3;
			energyDamage *= multAr[0];
			getChar(targetActors[0]).energy.changeValue(-energyDamage);
			targetPartText.push("ass","rear");
		}
		if ( currentCAs.includes("dildoPenetrateMouth")) {
			socialdriveDamage = lustDamage * 0.3;
			socialdriveDamage *= multAr[0];
			getChar(targetActors[0]).socialdrive.changeValue(-socialdriveDamage);
			targetPartText.push("mouth","throat");
		}
		lustDamage *= multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		
		results.description += randomFromList( [
									(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " dildo deep into " + ktn(target) + "."),
									(ktn(actorKey) + " thrusted " + gC(actorKey).posPr + " " + randomFromList(["dildo","toy","tool"]) + " into " + ktn(target) + "."),
									(ktn(actorKey) + " penetrated " + ktn(target) + "'s " + randomFromList(targetPartText) + ".") ] );
		if ( currentCAs.includes("dildoPenetratePussy")) {
			results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		} else if ( currentCAs.includes("dildoPenetrateAss")) {
			results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + " and " + textEnergyDamage(energyDamage) + ". " + multAr[1];
		} else if ( currentCAs.includes("dildoPenetrateMouth")) {
			results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + " and " + textSocialdriveDamage(socialdriveDamage) + ". " + multAr[1];
		}
		
		return results;
	}
	return sa;	
}
window.createSaPushAgainstDildo = function() {
	var sa = new sceneAction();
	sa.name = "Push against dildo";
	sa.key = "pushAgainstDildo";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.reqTags.push("diffTarget");
	sa.requiredCAs.push("doubleDildoPussyPenetration");
	
	sa.flavorTags.push("usePussy","targetPussy","fullsex");
	
	sa.description = "The character pushes their hips against the dildo in their pussy, striking against their partner's.\n\nSingle target action."
				   + "\n\nFull sex.\n\n__Influences__:\nDamage: Actor's physique x2, actor's resilience x1, actor's agility x1.";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var multAr2 = getSexDamageMult(actorKey,actorKey,this.key);
		var lustDamage = ((getChar(actorKey).physique.getValue() * 2 + getChar(actorKey).agility.getValue() + getChar(actorKey).resilience.getValue()) / 10);
		var lustDamage2 = (lustDamage / 3) * multAr2[0];
		lustDamage *= multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " hips against the dildo, striking " + ktn(target) + "'s insides."),
									(ktn(actorKey) + "'s movements push the dildo deep into " + ktn(target) + "."),
									(ktn(actorKey) + " thrusted " + gC(actorKey).refPr + " back and forth against the dildo, stimulating " + ktn(target) + "'s " + pussyWord() + " in the proccess.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		results.description += ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
		
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
	sa.unvalidRelationalPositions.push(["mountingFromBehind","mountingAndMounted"]);
	sa.unvalidRelationalPositions.push(["mountingAndMounted","mountingFromBehind"]);
	sa.unvalidRelationalPositions.push(["mountingAndMounted","mountedFromBehind"]);
	sa.unvalidRelationalPositions.push(["mountedFromBehind","mountingAndMounted"]);
	
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
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastBehind","spitroastTarget"]);
	sa.unvalidRelationalPositions.push(["mountingFromBehind","mountingAndMounted"]);
	sa.unvalidRelationalPositions.push(["mountingAndMounted","mountingFromBehind"]);
	sa.unvalidRelationalPositions.push(["mountingAndMounted","mountedFromBehind"]);
	sa.unvalidRelationalPositions.push(["mountedFromBehind","mountingAndMounted"]);
	
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
										(ktn(actorKey) + "'s eyes captured " + ktn(target) + "'s, and " + gC(target).perPr
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
	sa.unvalidRelationalPositions.push(["mountingFromBehind","mountingAndMounted"]);
	sa.unvalidRelationalPositions.push(["mountingAndMounted","mountingFromBehind"]);
	sa.unvalidRelationalPositions.push(["mountingAndMounted","mountedFromBehind"]);
	sa.unvalidRelationalPositions.push(["mountedFromBehind","mountingAndMounted"]);
	
	sa.flavorTags.push("hypnosis","useEyes","targetEyes","domination");
	
	sa.description = "The character uses hypnotic magic to erode their target's willpower through a seductive glance.\n"
				   + "Actor must have access to target's eyes.\n\nSingle target action.\n\nHypnosis."
				   + "\n\n__Influences__:\nDamage: Actor's charisma x2, actor's will x1.";
	
	sa.execute = function(actorKey,targetActors) {
	var actor = actorKey;
		if ( actor == "chPlayerCharacter" ) { addToStVarsList("monActUs"); }
		var results = new saResults;
		var target = targetActors[0];
		
		if ( actorKey == targetActors[0] ) {
			results.value = 0;
			results.description += getChar(actorKey).formattedName + " came to the realization that it's impossible to look at oneself without a mirror.";
		}
		else {
			var multAr = getSexDamageMult(actorKey,target,this.key);
			var willpowerDamage = ((getChar(actorKey).charisma.getValue() / 5) + (getChar(actorKey).will.getValue()) / 10) * multAr[0];
			getChar(targetActors[0]).willpower.changeValue(-willpowerDamage);
			results.value += willpowerDamage;
			results.description += randomFromList( [
										(ktn(actorKey) + " enraptured " + ktn(target) + "'s eyes, and " + gC(target).perPr
										+ " felt " + gC(target).posPr + " willpower slipping away."),
										(ktn(actorKey) + "'s eyes captured " + ktn(target) + "'s attention, and " + gC(target).perPr
										+ " felt " + gC(target).refPr + " getting lost in them.") ] );
			results.description += " " + ktn(target) + " received " + textWillpowerDamage(willpowerDamage) + ". " + multAr[1];
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
	
	sa.requiredPositions = ["mountingFromBehind","spitroastBehind","mountingFromBehind","mountingAndMounted"];
	sa.targetRequiredPositions = ["mountedFromBehind","spitroastTarget","mountingAndMounted","mountedFromBehind"];
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
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((gC(actorKey).physique.getValue() + gC(actorKey).resilience.getValue()) / 20) * multAr[0];
		var willpowerDamage = ((gC(actorKey).physique.getValue() + gC(actorKey).resilience.getValue()) / 8) * multAr[0];
		gC(target).lust.changeValue(-lustDamage);
		gC(target).willpower.changeValue(-willpowerDamage);
		results.description += randomFromList( [
									(ktn(actorKey) + " slapped " + ktn(target) + "'s " + assWord() + " with all " + gC(actorKey).posPr + " might."),
									(ktn(actorKey) + " punished " + ktn(target) + "'s " + assWord() + "."),
									(ktn(actorKey) + " spanked " + ktn(target) + " like a child.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		results.description += ktn(target) + " received " + textWillpowerDamage(willpowerDamage) + "." + multAr[1];
		
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
	
	sa.requiredPositions = ["mountingFromBehind","mountingFaceToFace","spitroastBehind","mountingFromBehind","mountingAndMounted"];
	sa.targetRequiredPositions = ["mountedFromBehind","mountedFaceToFace","spitroastTarget","mountingAndMounted","mountedFromBehind"];
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
		
		var multAr = getSexDamageMult(actor,target,this.key);
		var lustDamage = ((gCstat(actor,"agility") * 2 + gCstat(actor,"physique") + gCstat(actor,"perception") * 2) / 40) * multAr[0];
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
						     + textSocialdriveDamage(socialdriveDamage) + ". " + multAr[1];
		
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
	sa.caRank = 1;
	
	sa.unvalidRelationalPositions.push(["takingFromBehind","takenFromBehind"],["standing","kneeling"],["kneeling","standing"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["spitroastBehind","spitroastTarget"],["spitroastTarget","spitroastBehind"],["spitroastTarget","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["mountingFromBehind","mountingAndMounted"]);
	sa.unvalidRelationalPositions.push(["mountingAndMounted","mountingFromBehind"]);
	sa.unvalidRelationalPositions.push(["mountingAndMounted","mountedFromBehind"]);
	sa.unvalidRelationalPositions.push(["mountedFromBehind","mountingAndMounted"]);
	
	sa.flavorTags.push("oral","useMouth","targetMouth","romantic","continuedAction");
	
	sa.description = "The character initiates a deep kiss with their target, exploring each other's tongues.\n"
				   + "Every character's mouth must be free.\n\nSingle target continued action.\n"
				   + "\n\nOral."
				   + "\n\n__Influences__:\nDamage: Actor's agility x1.\nContinued damage: Actor's agility x1, actor's perception x1, actor's empathy x1.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((getChar(actorKey).agility.getValue() * 1) / 6.5) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
									(ktn(actorKey) + " captured " + ktn(target) + "'s lips and trapped them in a deep kiss."),
									(ktn(actorKey) + " started to deeply kiss " + ktn(target) + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		
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
	sa.actorBpReqs.push("legs","pussy");
	sa.targetBpReqs.push("mouth");
	sa.caRank = 2;
	
	sa.requiredPositions.push("standing","spitroastFront");
	sa.targetRequiredPositions.push("kneeling","spitroastTarget");
	sa.linkedPositions = true;
	
	sa.flavorTags.push("oral","useLegs","targetMouth","domination","continuedAction");
	
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
window.createExtraLegHoldHead = function() {
	var sa = new sceneAction();
	sa.name = "Extra Leg-hold Head (CA)";
	sa.key = "extraLegHoldHead";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("cAct","ccAct");
	sa.reqTags.push("diffTarget");
	sa.targetBpReqs.push("mouth");
	sa.caRank = 2;
	
	sa.requiredPositions.push("standing","spitroastFront");
	sa.targetRequiredPositions.push("kneeling","spitroastTarget");
	sa.linkedPositions = true;
	
	sa.requiredActorContinuedActions = ["legHoldingHead"];
	
	sa.flavorTags.push("oral","useLegs","targetMouth","domination","continuedAction");
	
	sa.description = "The character gets an extra target's head between their legs, making them both lick pussy. It may get cramped.\n"
				   + "Requires the actor's target to be kneeling before them.\n"
				   + "\nSingle target continued action."
				   + "\n\nOral."
				   + "\n\n__Influences__:\Continued self damage: Actor's resilience x2, actor's physique x1, target's agility x3.\nContinued willpower damage (if any): Actor's charisma x2, actor's will x1, target's will x-2.\nContinued damage (if any): Actor's charisma x1, target's will x-1, target's remaining willpower %.";
	
	sa.execute = function(actorKey,targetActors) {
		 var results = new saResults;
		 var target = targetActors[0];
		 
		 results.value = 0;
		 results.description += randomFromList( [
								(ktn(actorKey) + " beckons " + ktn(target) + " to get " + gC(target).posPr + " head between " + ktn(actorKey) + "'s legs."),
								(ktn(actorKey) + " doesn't have enough with one, and traps " + ktn(target) + "'s head between " + gC(actorKey).posPr + " thighs as well."),
								(ktn(target) + "'s tongue has difficulty to share " + ktn(actorKey) + "'s " + pussyWord() + " with someone else.") ] );
		
		// Modify Continued action
		addTargetToActorsCA(target,actorKey,"legHoldingHead");
		
		return results;
	}
	return sa;
}
window.createGiveCunnilingus = function() {
	var sa = new sceneAction();
	sa.name = "Give Cunnilingus (CA)";
	sa.key = "giveCunnilingus";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("cAct");
	sa.reqTags.push("diffTarget");
	sa.targetBpReqs.push("legs","pussy");
	sa.actorBpReqs.push("mouth");
	sa.caRank = 2;
	
	sa.targetRequiredPositions.push("standing","spitroastFront");
	sa.requiredPositions.push("kneeling","spitroastTarget");
	sa.linkedPositions = true;
	
	sa.flavorTags.push("oral","useMouth","targetPussy","continuedAction");
	
	sa.description = "The character holds their target's head with one or two legs, forcing them to lick what's between them.\n"
				   + "Requires the actor to be kneeling before the target.\n"
				   + "\nSingle target continued action."
				   + "\n\nOral."
				   + "\n\n__Influences__:\Continued damage: Target's resilience x2, target's physique x1, actor's agility x3.\nContinued willpower damage (if any): Target's charisma x2, target's will x1, actor's will x-2.\nContinued damage (if any): Target's charisma x1, actor's will x-1, actor's remaining willpower %.";
	
	sa.execute = function(actorKey,targetActors) {
		 var results = new saResults;
		 var target = targetActors[0];
		 
		 results.value = 0;
		 results.description += randomFromList( [
									(ktn(actorKey) + " started to " + randomFromList(["lick","devour","pleasure"]) + " " + ktn(target) + "'s " + pussyWord() + "."),
									(ktn(target) + "'s clitoris lights up as " + ktn(actorKey) + " starts to lick and suck it."),
									(ktn(actorKey) + "'s tongue starts exploring the insides of " + ktn(target) + "'s " + pussyWord() + ".") ] );
		
		// Create Continued action
		State.variables.sc.continuedActions.push(createCaLegHoldHead(targetActors[0],[actorKey]));
		
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
	sa.caRank = 2;
	
	sa.requiredPositions = ["mountingFromBehind","mountingFaceToFace","spitroastBehind"];
	sa.targetRequiredPositions = ["mountedFromBehind","mountedFaceToFace","spitroastTarget"];
	sa.requiredPositions.push("mountingAndMounted","mountingAndMounted","mountingFromBehind");
	sa.targetRequiredPositions.push("mountedFaceToFace","mountedFromBehind","mountingAndMounted");
	sa.linkedPositions = true;
	
	sa.flavorTags.push("fullsex","useDick","targetPussy","top","continuedAction");
	
	sa.description = "The character sticks their dick in their partner's snatch and begins fucking them.\n\nSingle target continued action."
				   + "\nActor requires free dick, target requires free pussy.\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's physique x3, actor's agility x1.\nContinued damage: Actor's and target's physique x1, actor's and target's resilience x1";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((getChar(actorKey).physique.getValue() * 3 + getChar(actorKey).agility.getValue() * 1) / 10) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " started fucking " + ktn(target) + "'s " + pussyWord() + "."),
								(ktn(actorKey) + " nailed " + gC(actorKey).posPr + " " + dickWord() + " inside " + ktn(target) + "."),
								(ktn(actorKey) + " connected " + gC(actorKey).posPr + " " + dickWord() + " with " + ktn(target) + "'s " + pussyWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaPenetratePussy(actorKey,targetActors));
		
		// Try virginities
		if ( getChar(targetActors[0]).virginities.pussy.taken == false ) {
			var vd2 = colorText((getChar(actorKey).name + " has taken " + getChar(targetActors[0]).name + "'s vaginal virginity! "),"red") + provokeVirginityBonusRelationship(actorKey,targetActors[0]);
			getChar(targetActors[0]).virginities.pussy.tryTakeVirginity(actorKey,"takeFromBehind",vd2);
		}
		if ( getChar(actorKey).virginities.dick.taken == false ) {
			var vd1 = colorText((getChar(targetActors[0]).name + " has taken " + getChar(actorKey).name + "'s penile virginity! "),"red") + provokeVirginityBonusRelationship(targetActors[0],actorKey);
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
	sa.caRank = 2;
	
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
	sa.requiredPositions.push("mountingAndMounted","mountingAndMounted","mountingFromBehind");
	sa.targetRequiredPositions.push("mountedFaceToFace","mountedFromBehind","mountingAndMounted");
	sa.linkedPositions = true;
	
	sa.flavorTags.push("fullsex","useDick","targetAnus","top","continuedAction");
	
	sa.description = "The character pushes their member into the target's rear and starts fucking it.\n\nSingle target continued action."
				   + "\nActor requires free dick, target requires free anus.\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's physique x1, actor's agility x1.\nContinued damage, continued energy damage: Actor's physique x1, actor's resilience x1.\nContinued self damage: Target's agility x1, target's resilience x1.";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((getChar(actorKey).physique.getValue() * 2 + getChar(actorKey).agility.getValue() * 2) / 10) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " penetrated " + ktn(target) + "'s " + assWord() + "."),
								(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " own " + dickWord() + " into " + ktn(target) + "'s " + assWord() + "."),
								(ktn(target) + " exhales some air after " + ktn(actorKey) + " finishes getting " + gC(actorKey).posPr + " " + dickWord()
								+ " into " + gC(target).posPr + " " + assWord() + ".") ]
								);
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaPenetrateAss(actorKey,targetActors));
		
		// Try virginities
		if ( getChar(targetActors[0]).virginities.anal.taken == false ) {
			var vd2 = colorText((getChar(actorKey).name + " has taken " + getChar(targetActors[0]).name + "'s anal virginity! "),"red") + provokeVirginityBonusRelationship(actorKey,targetActors[0]);
			getChar(targetActors[0]).virginities.anal.tryTakeVirginity(actorKey,"takeFromBehind",vd2);
		}
		if ( getChar(actorKey).virginities.dick.taken == false ) {
			var vd1 = colorText((getChar(targetActors[0]).name + " has taken " + getChar(actorKey).name + "'s penile virginity! "),"red") + provokeVirginityBonusRelationship(targetActors[0],actorKey);
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
	sa.caRank = 2;
	
	sa.requiredPositions = ["mountingFaceToFace","mountingFromBehind","spitroastBehind"];
	sa.targetRequiredPositions = ["mountedFaceToFace","mountedFromBehind","spitroastTarget"];
	sa.requiredPositions.push("mountingAndMounted","mountingAndMounted","mountingFromBehind");
	sa.targetRequiredPositions.push("mountedFaceToFace","mountedFromBehind","mountingAndMounted");
	sa.linkedPositions = true;
	
	sa.flavorTags.push("fullsex","usePussy","targetPussy","top","continuedAction");
	
	sa.description = "The character crosses their legs with their their partner's, in order stimulate to both their clits and folds."
				   + "\n\nSingle target continued action.\nBoth actor and target require free pussy.\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's physique x3, actor's agility x1.\nContinued damage: Actor's and target's physique x1, actor's and target's resilience x1.";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((getChar(actorKey).physique.getValue() * 3 + getChar(actorKey).agility.getValue() * 1) / 10) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " interlocked " + gC(actorKey).posPr + " and " + ktn(target) + "'s pussies."),
								(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " own " + pussyWord() + " against " + ktn(target) + "'s."),
								(ktn(actorKey) + " locked " + gC(actorKey).posPr + " legs with " + ktn(target) + "'s.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		
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
	sa.caRank = 2;
	
	sa.requiredPositions = ["mountingFaceToFace","mountingAndMounted"];
	sa.targetRequiredPositions = ["mountedFaceToFace","mountedFaceToFace"];
	sa.linkedPositions = true;
	
	sa.flavorTags.push("fullsex","usePussy","targetDick","top","continuedAction");
	
	sa.description = "The character impales themself in their partner's dick, and begins fucking them.\n\nSingle target continued action."
				   + "\nActor requires free pussy, target requires free dick.\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's physique x3, actor's agility x1.\nContinued damage: Actor's and target's physique x1, actor's and target's resilience x1";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((getChar(actorKey).physique.getValue() * 3 + getChar(actorKey).agility.getValue() * 1) / 10) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " started fucking " + ktn(target) + "'s " + dickWord() + "."),
								(ktn(actorKey) + " mounted " + ktn(target) + "'s " + dickWord() + "."),
								(ktn(actorKey) + " fell upon " + ktn(target) + "'s " + dickWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaMountDick(actorKey,targetActors));
		
		// Try virginities
		if ( getChar(targetActors[0]).virginities.dick.taken == false ) {
			var vd2 = colorText((getChar(actorKey).name + " has taken " + getChar(targetActors[0]).name + "'s penile virginity! "),"red") + provokeVirginityBonusRelationship(actorKey,targetActors[0]);
			getChar(targetActors[0]).virginities.dick.tryTakeVirginity(actorKey,"mountDick",vd2);
		}
		if ( getChar(actorKey).virginities.pussy.taken == false ) {
			var vd1 = colorText((getChar(targetActors[0]).name + " has taken " + getChar(actorKey).name + "'s vaginal virginity! "),"red") + provokeVirginityBonusRelationship(targetActors[0],actorKey);
			getChar(actorKey).virginities.pussy.tryTakeVirginity(targetActors[0],"mountDick",vd1);
		}
		
		return results;
	}
	return sa;
}
window.createSaAnalMountDick = function() {
	var sa = new sceneAction();
	sa.name = "Anal Mount Dick (CA)";
	sa.key = "analMountDick";
	sa.targetType = "single";
	sa.tags.push("ss","cAct");
	sa.reqTags.push("diffTarget");
	sa.actorBpReqs.push("anus");
	sa.targetBpReqs.push("dick");
	sa.caRank = 2;
	
	sa.requiredPositions = ["mountingFaceToFace","mountingAndMounted"];
	sa.targetRequiredPositions = ["mountedFaceToFace","mountedFaceToFace"];
	sa.linkedPositions = true;
	
	sa.flavorTags.push("fullsex","useAnus","targetDick","top","continuedAction");
	
	sa.description = "The character impales their ass in their partner's dick, and begins fucking them.\n\nSingle target continued action."
				   + "\nActor requires free ass, target requires free dick.\n\nFull sex."
				   + "\n\n__Influences__:\nLust and energy damage: Actor's physique x3, actor's resilience x1.\nContinued damage: Actor's and target's physique x1, actor's and target's resilience x1";
	
	sa.getIsAllowedBySettings = function() {
		var isAllowed = true;
		
		if ( State.variables.settings.anal == "disable" ) {
			isAllowed = false;
		}
		
		return isAllowed;
	}
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((getChar(actorKey).physique.getValue() * 3 + getChar(actorKey).resilience.getValue() * 1) * 0.7 / 10) * multAr[0];
		var energyDamage = ((getChar(actorKey).physique.getValue() * 3 + getChar(actorKey).resilience.getValue() * 1) * 0.3 / 10) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		getChar(targetActors[0]).energy.changeValue(-energyDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " started fucking " + ktn(target) + "'s " + dickWord() + " with " + gC(actorKey).posPr + " " + assWord() + "."),
								(ktn(actorKey) + " envolved " + ktn(target) + "'s " + dickWord() + " with " + gC(actorKey).posPr + " " + assWord() + "."),
								(ktn(actorKey) + "'s " + assWord() + " fell upon " + ktn(target) + "'s " + dickWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + " and " + textEnergyDamage(energyDamage) + ". " + multAr[1];
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaAnalMountDick(actorKey,targetActors));
		
		// Try virginities
		if ( getChar(targetActors[0]).virginities.dick.taken == false ) {
			var vd2 = colorText((getChar(actorKey).name + " has taken " + getChar(targetActors[0]).name + "'s penile virginity! "),"red") + provokeVirginityBonusRelationship(actorKey,targetActors[0]);
			getChar(targetActors[0]).virginities.dick.tryTakeVirginity(actorKey,"analMountDick",vd2);
		}
		if ( getChar(actorKey).virginities.anal.taken == false ) {
			var vd1 = colorText((getChar(targetActors[0]).name + " has taken " + getChar(actorKey).name + "'s anal virginity! "),"red") + provokeVirginityBonusRelationship(targetActors[0],actorKey);
			getChar(actorKey).virginities.anal.tryTakeVirginity(targetActors[0],"analMountDick",vd1);
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
	sa.caRank = 2;
	
	sa.requiredRace = [ "shapeshifter" ];
	
	sa.requiredPositions = ["mountingFromBehind","mountingFaceToFace","spitroastBehind"];
	sa.targetRequiredPositions = ["mountedFromBehind","mountedFaceToFace","spitroastTarget"];
	sa.requiredPositions.push("mountingAndMounted","mountingAndMounted","mountingFromBehind");
	sa.targetRequiredPositions.push("mountedFaceToFace","mountedFromBehind","mountingAndMounted");
	sa.linkedPositions = true;
	
	sa.willpowerCost = 3;
	
	sa.getIsAllowedBySettings = function() {
		var isAllowed = true;
		
		if ( State.variables.settings.anal == "disable" ) {
			isAllowed = false;
		}
		
		return isAllowed;
	}
	
	
	sa.flavorTags.push("fullsex","useDick","targetPussy","targetAnus","top","continuedAction");
	
	sa.description = "The character uses two phalluses to penetrate their partner's pussy and ass.\n\nSingle target continued action."
				   + "\nActor requires free dick, target requires free pussy and anus.\n\nFull sex."
				   + "\n\n__Influences__:\nDamage: Actor's physique x2, actor's agility x1.\nContinued damage: Actor's and target's physique x1, actor's and target's resilience x1";
	
	sa.execute = function(actorKey,targetActors) {
		var actor = actorKey;
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((getChar(actorKey).physique.getValue() * 4 + getChar(actorKey).agility.getValue() * 2) / 10) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " formed a second " + dickWord() + " and started fucking " + ktn(target) + "'s " + pussyWord() + " and " + assWord() + "."),
								(ktn(actorKey) + " split " + gC(actorKey).posPr + " " + dickWord() + " into two and inserted both in " + ktn(target) + "'s genitals."),
								(ktn(actorKey) + " grew a second " + dickWord() + " and filled " + ktn(target) + " with both of them.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + generateSaCostsText(this,actor) + ". " + multAr[1];
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaDoublePenetration(actorKey,targetActors));
		
		// Try virginities
		if ( getChar(targetActors[0]).virginities.pussy.taken == false ) {
			var vd2 = colorText((getChar(actorKey).name + " has taken " + getChar(targetActors[0]).name + "'s vaginal virginity! "),"red") + provokeVirginityBonusRelationship(actorKey,targetActors[0]);
			getChar(targetActors[0]).virginities.pussy.tryTakeVirginity(actorKey,"doublePenetration",vd2);
		}
		if ( getChar(targetActors[0]).virginities.anal.taken == false ) {
			var vd3 = colorText((getChar(actorKey).name + " has taken " + getChar(targetActors[0]).name + "'s anal virginity! "),"red") + provokeVirginityBonusRelationship(actorKey,targetActors[0]);
			getChar(targetActors[0]).virginities.anal.tryTakeVirginity(actorKey,"doublePenetration",vd3);
		}
		if ( getChar(actorKey).virginities.dick.taken == false ) {
			var vd1 = colorText((getChar(targetActors[0]).name + " has taken " + getChar(actorKey).name + "'s penile virginity! "),"red") + provokeVirginityBonusRelationship(targetActors[0],actorKey);
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
	sa.caRank = 2;
	
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
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = (gC(actorKey).charisma.getValue() / 5) * multAr[0];
		gC(target).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " told " + ktn(target) + " to start sucking " + gC(actorKey).posPr + " " + dickWord() + "."),
								(ktn(actorKey) + " got " + ktn(target) + " to start sucking " + gC(actorKey).posPr + " " + dickWord() + "."),
								(ktn(target) + " was made to suck " + ktn(actorKey) + "'s " + dickWord() + ".") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaGetBlowjob(actorKey,targetActors));
		
		return results;
	}
	
	return sa;
}
window.createSaGiveBlowjob = function() {
	var sa = new sceneAction();
	sa.name = "Give Blowjob (CA)";
	sa.key = "giveBlowjob";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("cAct");
	sa.reqTags.push("diffTarget");
	sa.targetBpReqs.push("dick");
	sa.actorBpReqs.push("mouth");
	sa.caRank = 2;
	
	sa.targetRequiredPositions = ["standing","spitroastFront"]; // If the list contains anything, the actor requires one of these positions
	sa.requiredPositions = ["kneeling","spitroastTarget"]; // If the list contains anything, the targets require one of these positions
	sa.linkedPositions = false; // If true, the actor and its targets require to be referenced as initiator or target in their respective positions
	
	sa.flavorTags.push("oral","targetDick","useMouth","top","domination","continuedAction");
	
	sa.description = "The character starts sucking and licking their target's cock.\n"
				   + "Target must have a free dick, actor must have a free mouth.\n\nSingle target continued action.\n"
				   + "\nOral."
				   + "\n\n__Influences__:\nDamage: Actor's charisma x1.\nContinued damage: Actor's agility x2.\nContinued self damage: Target's resilience x1.";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = (gC(actorKey).charisma.getValue() / 5) * multAr[0];
		gC(target).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " ran " + gC(actorKey).posPr + " tongue along the skin of " + ktn(target) + "'s " + dickWord() + ", throughly savoring everything."),
								(ktn(actorKey) + " started to slide " + ktn(target) + "'s " + dickWord() + " up and down through " + gC(actorKey).posPr + " mouth.") ] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaGetBlowjob(targetActors[0],[actorKey]));
		
		return results;
	}
	
	return sa;
}

	// Weapon sex actions
window.createSaDildoPenetratePussy = function() {
	var sa = new sceneAction();
	sa.name = "Dildo-Pussy Penetration (CA)";
	sa.key = "dildoPenetratePussy";
	sa.targetType = "single";
	sa.tags.push("ss","cAct");
	sa.reqTags.push("diffTarget","unusedWeapon");
	sa.actorBpReqs.push("arms");
	sa.targetBpReqs.push("pussy");
	sa.caRank = 1;
	
	sa.unvalidRelationalPositions.push(["standing","kneeling"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastFront"],["spitroastTarget","spitroastBehind"],["spitroastFront","spitroastTarget"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	
	sa.flavorTags.push("targetPussy","top","continuedAction");
	
	sa.description = "The character sticks their dildo into their partner's vaginal folds, and begins penetrating them.\n\nSingle target continued action."
				   + "\nActor requires free arms, target requires free pussy."
				   + "\n\n__Influences__:\nDamage: Actor's physique x1, actor's agility x1.\nContinued damage: Actor's physique and agility x1.";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		setCharsWeaponInUse(actorKey);
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((getChar(actorKey).physique.getValue() * 1 + getChar(actorKey).agility.getValue() * 1) / 8) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " entered " + ktn(target) + "'s " + pussyWord() + " with " + gC(actorKey).posPr + " dildo, and began " + randomFromList(["massaging","penetrating","rubbing"]) + " it."),
								(ktn(target) + "'s " + pussyWord() + " was invaded by " + ktn(actorKey) + "'s dildo."),
								(ktn(actorKey) + "'s dildo entered the folds of " + ktn(target) + ", who welcomed it inside " + gC(target).comPr + ".")
								] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaDildoPenetratePussy(actorKey,targetActors));
		
		return results;
	}
	return sa;
}
window.createSaDildoPenetrateAss = function() {
	var sa = new sceneAction();
	sa.name = "Dildo-Ass Penetration (CA)";
	sa.key = "dildoPenetrateAss";
	sa.targetType = "single";
	sa.tags.push("ss","cAct");
	sa.reqTags.push("diffTarget","unusedWeapon");
	sa.actorBpReqs.push("arms");
	sa.targetBpReqs.push("anus");
	sa.caRank = 1;
	
	sa.getIsAllowedBySettings = function() {
		var isAllowed = true;
		
		if ( State.variables.settings.anal == "disable" ) {
			isAllowed = false;
		}
		
		return isAllowed;
	}
	
	sa.unvalidRelationalPositions.push(["standing","kneeling"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastFront"],["spitroastTarget","spitroastBehind"],["spitroastFront","spitroastTarget"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	
	sa.flavorTags.push("targetAnus","top","continuedAction");
	
	sa.description = "The character sticks their dildo into their partner's backside, and begins penetrating it.\n\nSingle target continued action."
				   + "\nActor requires free arms, target requires free anus."
				   + "\n\n__Influences__:\nDamage: Actor's physique x1, actor's agility x1.\nContinued lust and energy damage: Actor's physique and agility x1.";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		setCharsWeaponInUse(actorKey);
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((getChar(actorKey).physique.getValue() * 1 + getChar(actorKey).agility.getValue() * 1) / 8) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " entered " + ktn(target) + "'s " + assWord() + " with " + gC(actorKey).posPr + " dildo, and began " + randomFromList(["massaging","penetrating","rubbing"]) + " it."),
								(ktn(target) + "'s " + assWord() + " was invaded by " + ktn(actorKey) + "'s dildo."),
								(ktn(actorKey) + "'s dildo entered the rear of " + ktn(target) + ", who welcomed it inside " + gC(target).comPr + ".")
								] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaDildoPenetrateAss(actorKey,targetActors));
		
		return results;
	}
	return sa;
}
window.createSaDildoPenetrateMouth = function() {
	var sa = new sceneAction();
	sa.name = "Dildo-Mouth Penetration (CA)";
	sa.key = "dildoPenetrateMouth";
	sa.targetType = "single";
	sa.tags.push("ss","cAct");
	sa.reqTags.push("diffTarget","unusedWeapon");
	sa.actorBpReqs.push("arms");
	sa.targetBpReqs.push("mouth");
	sa.caRank = 1;
	
	sa.unvalidRelationalPositions.push(["kneeling","standing"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastBehind"],["spitroastBehind","spitroastTarget"]);
	
	sa.flavorTags.push("targetMouth","top","continuedAction");
	
	sa.description = "The character inserts their dildo in their partner's mouth, gagging them with it.\n\nSingle target continued action."
				   + "\nActor requires free arms, target requires free mouth."
				   + "\n\n__Influences__:\nDamage: Actor's agility x1.\nContinued lust and social drive damage: Actor's agility x1.";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		setCharsWeaponInUse(actorKey);
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((getChar(actorKey).agility.getValue() * 1) / 12) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " inserted " + gC(actorKey).posPr + " dildo in " + ktn(target) + "'s mouth, making " + gC(target).comPr + " gag."),
								(ktn(actorKey) + " pushed deep inside " + ktn(target) + "'s throat with " + gC(actorKey).posPr + " dildo."),
								(ktn(actorKey) + " used " + gC(actorKey).posPr + " dildo to penetrate " + ktn(target) + "'s mouth.") 
								] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		
		// Continued Action
		State.variables.sc.continuedActions.push(createCaDildoPenetrateMouth(actorKey,targetActors));
		
		return results;
	}
	return sa;
}
window.createSaDoubleDildoPussyPenetration = function() {
	var sa = new sceneAction();
	sa.name = "Double Dildo-Pussy Penetration (CA)";
	sa.key = "doubleDildoPussyPenetration";
	sa.targetType = "single";
	sa.tags.push("ss","cAct");
	sa.reqTags.push("diffTarget","unusedWeapon");
	sa.actorBpReqs.push("pussy");
	sa.targetBpReqs.push("pussy");
	sa.caRank = 2;
	
	sa.requiredPositions = ["mountingFaceToFace"];
	sa.targetRequiredPositions = ["mountedFaceToFace"];
	sa.requiredPositions.push("mountingAndMounted");
	sa.targetRequiredPositions.push("mountedFaceToFace");
	sa.linkedPositions = true;
	
	sa.flavorTags.push("fullsex","usePussy","targetPussy","top","continuedAction");
	
	sa.description = "The character sticks their dildo into their own pussy and their partner's, both of them able to push it against each other.\n"
				   + "\n\nSingle target continued action.\nActor and target require free pussy."
				   + "\n\n__Influences__:\nDamage: Actor's and target's physique x2, agility x1, resilience x1.";
				   	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var actor = actorKey;
		var target = targetActors[0];
		setCharsWeaponInUse(actorKey);
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((getChar(actorKey).physique.getValue() * 2 + getChar(actorKey).agility.getValue() * 1 + getChar(actorKey).resilience.getValue() * 1) / 10) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		results.value += lustDamage;
		results.description += randomFromList( [
								(ktn(actorKey) + " connected " + ktn(target) + "'s " + pussyWord() + " and " + gC(actor).posPr + " own with " + gC(actor).posPr + " dildo, and started pushing against it."),
								(ktn(actorKey) + " inserts " + gC(actor).posPr + " dildo into both " + ktn(target) + "'s and " + gC(actor).posPr + " own " + randomFromList(["pussies","pussies","pussies","cherries","clams"]) + ", now connected in pleasure."),
								("After introducing " + gC(actor).posPr + " dildo into " + gC(actor).posPr + " " + pussyWord() + " and " + ktn(target) + "'s, both of them are now getting pleasured by the pushes of the other.")
								] );
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
		
		State.variables.sc.continuedActions.push(createCaDoubleDildoPussyPenetration(actorKey,targetActors));
		
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
	sa.caRank = 1;
	
	sa.requiredPositions = ["mountingFromBehind","mountingFaceToFace","spitroastBehind"];
	sa.targetRequiredPositions = ["mountedFromBehind","mountedFaceToFace","spitroastTarget"];
	sa.requiredPositions.push("mountingAndMounted","mountingAndMounted","mountingFromBehind");
	sa.targetRequiredPositions.push("mountedFaceToFace","mountedFromBehind","mountingAndMounted");
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
	sa.caRank = 1;
	
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
	sa.caRank = 1;
	
	sa.flavorTags.push("domination","bondage");
	
	sa.description = "The character casts ethereal chains to lock their target's arms with them.\n"
				   + "Target must have free arms. Actor must be leading.\n\nSingle target action.\n"
				   + "\nDomination, bondage.";
	
	sa.execute = function(actor,targetActors) {
		if ( actor == "chPlayerCharacter" ) { addToStVarsList("monActUs"); }
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
	sa.caRank = 1;
	sa.strategyTags.push("tfHalfPlus");
	
	sa.requiredRace = [ "shapeshifter" ];
	sa.willpowerCost = 3;
	
	sa.requiredPositions = ["mountingFromBehind","mountingFaceToFace","mountedFromBehind","mountedFaceToFace","spitroastBehind"];
	sa.targetRequiredPositions = ["mountedFromBehind","mountedFaceToFace","mountingFromBehind","mountingFaceToFace","spitroastTarget"];
	sa.requiredPositions.push("mountingAndMounted","mountingAndMounted","mountingFromBehind");
	sa.targetRequiredPositions.push("mountedFaceToFace","mountedFromBehind","mountingAndMounted");
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
		var currentSh = null;
		for ( var cA of State.variables.sc.continuedActions ) {
			if ( cA.key == "slimeHug" && cA.initiator == actor && cA.targetsList.includes(target) ) {
				currentSh = cA;
			}
		}
		if ( currentSh == null ) {
			State.variables.sc.continuedActions.push(createCaSlimeHug(actorKey,targetActors));
		} else {
			currentSh.intensity++;
			results.description += " The slime further surrounds " + ktn(target) + ".";
		}
		
		return results;
	}
	
	return sa;
}

window.getCharsSlimedIntensity = function(charKey) {
	var slimedStatusAmount = 0;
	var slimeHugIntensity = 0;
	for ( var as of gC(charKey).alteredStates ) {
		if ( as.acr == "Slmd" ) {
			slimedStatusAmount++;
		}
	}
	for ( var cA of State.variables.sc.continuedActions ) {
		if ( cA.key == "slimeHug" && cA.targetsList[0] == charKey ) {
			if ( cA.intensity != undefined ) {
				slimeHugIntensity = cA.intensity;
			}
		}
	}
	var result = (slimedStatusAmount * 2) + slimeHugIntensity;
	return result;
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
	sa.caRank = 1;
	
	sa.unvalidRelationalPositions.push(["takingFromBehind","takenFromBehind"],["standing","kneeling"],["kneeling","standing"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["spitroastBehind","spitroastTarget"],["spitroastTarget","spitroastBehind"],["spitroastTarget","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["mountingFromBehind","mountingAndMounted"]);
	sa.unvalidRelationalPositions.push(["mountingAndMounted","mountingFromBehind"]);
	sa.unvalidRelationalPositions.push(["mountingAndMounted","mountedFromBehind"]);
	sa.unvalidRelationalPositions.push(["mountedFromBehind","mountingAndMounted"]);
	
	sa.flavorTags.push("oral","useMouth","targetMouth","romantic","continuedAction","draining");
	
	sa.description = "The character connects their mouth with their targets' in a kiss, draining their energy.\n"
				   + "Every character's mouth must be free.\n\nSingle target continued action.\n"
				   + "\nOral, draining."
				   + "\n\n__Influences__:\Drained damage: Actor's agility x1.\nContinued drained damage: Actor's agility x1, actor's perception x1, actor's empathy x1.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var lustDamage = ((getChar(actorKey).agility.getValue() * 1) / 8) * multAr[0];
		var drainedEnergy = ((getChar(actorKey).agility.getValue() * 1) / 10) * multAr[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		gC(target).energy.changeValue(-drainedEnergy);
		gC(actorKey).energy.changeValue(drainedEnergy);
		results.value += lustDamage;
		
		results.description += randomFromList( [
									(ktn(actorKey) + " trapped " + ktn(target) + "'s lips, and drained " + gC(target).posPr + " energy through them."),
									(ktn(actorKey) + " started a kiss with " + ktn(target) + ", who feels weaker and weaker..."),
									(ktn(actorKey) + " pushed " + gC(actorKey).posPr + " tongue into " + ktn(target) + "'s mouth, stealing " + gC(target).posPr + " energy.") ] );
									
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + ktn(actorKey) + " drained "
							 + textEnergyDamage(drainedEnergy) + " from " + ktn(target) + ". " + multAr[1];
		
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
	sa.positionResults = ["mountingFromBehind","mountedFromBehind"];
	sa.reqTags.push("diffTarget");
	
	sa.flavorTags.push("position");
	
	sa.strategyTags.push("tfMinus");
	
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
	sa.positionResults = ["mountingFaceToFace","mountedFaceToFace"];
	sa.reqTags.push("diffTarget");
	
	sa.flavorTags.push("position");
	
	sa.strategyTags.push("tfPos");
	
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
	sa.positionResults = ["kneeling","standing"];
	sa.reqTags.push("diffTarget");
	
	sa.flavorTags.push("position");
	
	sa.strategyTags.push("tfMinus");
	
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
	sa.positionResults = ["standing","kneeling"];
	sa.reqTags.push("diffTarget");
	
	sa.flavorTags.push("position");
	
	sa.strategyTags.push("tfMinus");
	
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

window.createSaExtraMountFromBehind = function() {
	var sa = new sceneAction();
	
	sa.name = "Extra mount from behind (CPOS)";
	sa.key = "extraMountFromBehind";
	sa.targetType = "single";
	sa.tags.push("ss","cpos");
	sa.positionResults = ["mountingFromBehind","mountingAndMounted"];
	sa.reqTags.push("diffTarget");
	sa.getRequiredPositioning = function(actor,target) {
		var validFlag = false;
		if ( gC(target).position.key == "kneeling" ) {
			if ( gC(target).position.hasOwnProperty("secondaryInitiator") == false ) {
				validFlag = true;
			}
		} else if ( gC(target).position.key == "mountingFaceToFace" ) {
			if ( gC(target).position.hasOwnProperty("secondaryInitiator") == false ) {
				validFlag = true;
			}
		} else if ( gC(target).position.key == "mountingFromBehind" ) {
			if ( gC(target).position.hasOwnProperty("secondaryInitiator") == false ) {
				validFlag = true;
			}
		}
		return validFlag;
	}
	
	sa.flavorTags.push("position");
	
	sa.description = "The character holds their target from behind.\nThe target must already be in a correct position.\n\nSingle target composite positional action.\n";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		var type = "";
		
		// Get type
		if ( gC(target).position.key == "kneeling" ) {
			if ( gC(target).position.hasOwnProperty("secondaryInitiator") == false ) {
				type = "spitroast";
			}
		} else if ( gC(target).position.key == "mountingFaceToFace" ) {
			if ( gC(target).position.hasOwnProperty("secondaryInitiator") == false ) {
				type = "mountingAndMounted";
			}
		} else if ( gC(target).position.key == "mountingFromBehind" ) {
			if ( gC(target).position.hasOwnProperty("secondaryInitiator") == false ) {
				type = "mountingAndMountedAlt";
			}
		}
		results.value += 0;
		
		
		switch(type) {
			case "spitroast":
				results.description = randomFromList( [
								(ktn(actorKey) + " took " + ktn(target) + " hips from behind, leaving " + gC(target).comPr + " spitroasted."),
								(ktn(target) + " notices how " + ktn(actorKey) + " is positioning behind " + gC(target).comPr + "."),
								(ktn(target) + " gets taken by " + ktn(actorKey) + " from behind, getting on all fours.") ] );
				createComPosSpitroast(actorKey,target);
				break;
			case "mountingAndMounted":
				results.description = randomFromList( [
								(ktn(actorKey) + " takes position above " + ktn(target) + "'s back."),
								(ktn(actorKey) + " mounts " + ktn(target) + " from behind."),
								(ktn(target) + " feels " + ktn(actorKey) + " holding " + gC(target).posPr + " hips.") ] );
				createComPosMountingAndMounted(actorKey,target);
				break;
			case "mountingAndMountedAlt":
				results.description = randomFromList( [
								(ktn(actorKey) + " takes position above " + ktn(target) + "'s back."),
								(ktn(actorKey) + " mounts " + ktn(target) + " from behind."),
								(ktn(target) + " feels " + ktn(actorKey) + " holding " + gC(target).posPr + " hips.") ] );
				createComPosMountingAndMountedAlt(actorKey,target);
				break;
		}
				
		return results;
	}
	
	return sa;
}
// createSaExtraKneel
// createSaExtraMakeKneel
window.createSaExtraKneel = function() {
	var sa = new sceneAction();
	
	sa.name = "Extra kneel (CPOS)";
	sa.key = "extraKneel";
	sa.targetType = "single";
	sa.tags.push("ss","cpos");
	sa.positionResults = ["kneel","standing"];
	sa.reqTags.push("diffTarget");
	sa.getRequiredPositioning = function(actor,target) {
		var validFlag = false;
		if ( gC(target).position.key == "standing" ) {
			if ( gC(target).position.hasOwnProperty("secondaryInitiator") == false ) {
				validFlag = true;
			}
		}
		return validFlag;
	}
	
	sa.flavorTags.push("position");
	
	sa.description = "The character kneels before a target who already has someone else in their knees.\nThe target must already be in a correct position.\n\nSingle target composite positional action.\n";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		var type = "";
		
		// Get type
		if ( gC(target).position.key == "standing" ) {
			if ( gC(target).position.hasOwnProperty("secondaryInitiator") == false ) {
				type = "standing";
			}
		}
		results.value += 0;
		
		switch(type) {
			case "standing":
				results.description = randomFromList( [
								(ktn(actorKey) + " got on " + gC(actorKey).posPr + " knees next to " + ktn(gC(target).position.targetsList[0]) + "."),
								(ktn(actorKey) + " got on all fours and crawled before " + ktn(target) + "."),
								(ktn(target) + " welcomed " + ktn(actorKey) + " when " + gC(actorKey).perPr + " kneeled before " + gC(target).comPr + ".") ] );
				createComPosDoubleKneeling(target,actorKey);
				break;
		}
		
		return results;
	}
	
	return sa;
}
window.createSaExtraMakeKneel = function() {
	var sa = new sceneAction();
	
	sa.name = "Extra make kneel (CPOS)";
	sa.key = "extraMakeKneel";
	sa.targetType = "single";
	sa.tags.push("ss","cpos");
	sa.positionResults = ["standing","kneel"];
	sa.reqTags.push("diffTarget");
	sa.getRequiredPositioning = function(actor,target) {
		var validFlag = false;
		if ( gC(actor).position.key == "standing" && gC(target).position.key == "free" ) {
			if ( gC(actor).position.targetsList.length < 2 ) {
				validFlag = true;
			}
		}
		return validFlag;
	}
	
	sa.flavorTags.push("position");
	
	sa.description = "The character makes a second character kneel before them.\nThe actor must already have someone kneeling before them.\n\nSingle target composite positional action.\n";
	
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		var actor = actorKey;
		var type = "";
		
		// Get type
		if ( gC(actor).position.key == "standing" ) {
			if ( gC(actor).position.hasOwnProperty("secondaryInitiator") == false ) {
				type = "standing";
			}
		}
		results.value += 0;
		
		switch(type) {
			case "standing":
				results.description = randomFromList( [
								(ktn(actorKey) + " beckoned " + ktn(target) + " to kneel before " + gC(actorKey).comPr + "."),
								(ktn(actorKey) + " ordered " + ktn(target) + " to kneel beside " + ktn(gC(actor).position.targetsList[0]) + ", and " + gC(target).perPr + " obeyed."),
								(ktn(target) + " complied when " + ktn(actorKey) + " told " + gC(target).comPr + " to get on " + gC(target).posPr + " knees.") ] );
				createComPosDoubleKneeling(actorKey,target);
				break;
		}
		
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
	sa.reqTags.push("hasLead");
	sa.actorBpReqs.push("arms");
	
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastTarget"]);
	
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
			var multAr = getSexDamageMult(actorKey,target,this.key);
			var lustDamage = (gC(target).lust.max * 0.15) * multAr[0];
			gC(target).lust.changeValue(-lustDamage);
			
			addTurnTagToChar("denied",target);
			
			results.value += lustDamage;
			results.description += randomFromList( [
										(ktn(actor) + " locked " + ktn(target) + " in place, denying " + gC(target).posPr + " pleasure."),
										(ktn(actor) + " prevented " + ktn(target) + " from getting any pleasure during " + gC(target).posPr + " climax."),
										(ktn(actor) + " denied " + ktn(target) + "'s orgasm, much to " + gC(target).posPr + " frustration.") ] );
			results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1];
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
	
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastTarget"]);
	
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
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var threshold = 0.1 + ( gCstat(actor,"charisma") + gCstat(actor,"empathy") + gCstat(actor,"agility") + gCstat(actor,"perception") ) * 0.00025;
		var startingLustDamage = ( gCstat(actor,"charisma") + gCstat(actor,"empathy") + gCstat(actor,"agility") + gCstat(actor,"perception") ) * 0.05 * multAr[0];
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
			results.description += " " + ktn(target) + " received " + textLustDamage(startingLustDamage + lustDamage) + ". " + multAr[1];
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
	
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastTarget"]);
	
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
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var threshold = 0.1 + ( gCstat(actor,"charisma") + gCstat(actor,"empathy") + gCstat(actor,"agility") + gCstat(actor,"perception") ) * 0.00025;
		var startingLustDamage = ( gCstat(actor,"charisma") + gCstat(actor,"empathy") + gCstat(actor,"agility") + gCstat(actor,"perception") ) * 0.05 * multAr[0];
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
			results.description += " " + ktn(target) + " received " + textLustDamage(startingLustDamage + lustDamage) + ". " + multAr[1];
		}
		
		return results;
	}
	
	return sa;
}	

	// Transformation
window.createSaSculptingKiss = function() {
	var sa = new sceneAction();
	sa.name = "Sculpting Kiss";
	sa.key = "sculptingKiss";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.tags.push("tf");
	sa.actorBpReqs.push("mouth");
	sa.tfGoals = ["rebuildFace"];
	sa.strategyTags.push("tfPlus");
	
	sa.unvalidRelationalPositions.push(["kneeling","standing"],["takenFromBehind","takingFromBehind"],["spitroastBehind","spitroastTarget"],
									   ["spitroastTarget","spitroastBehind"]);
	sa.unvalidRelationalPositions.push(["mountingFromBehind","mountingAndMounted"],["mountingAndMounted","mountingFromBehind"],["mountingAndMounted","mountedFromBehind"],["mountedFromBehind","mountingAndMounted"]);
	
	sa.flavorTags.push("useMouth");
	
	sa.description = "The character uses their mouth and tongue to cast transformation magic on their target's face.\n\nSingle target action.\n"
				   + "Actor requires free mouth.\n\n__Influences__:\nDamage: Actor's agility x3, will x2, intelligence x1, perception x2, luck x1, target's slimed intensity.";
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var actor = actorKey;
		
		for (var target of targetActors) {
			var multAr = getSexDamageMult(actorKey,target,this.key);
			var slimedIntensity = 1 + (getCharsSlimedIntensity(target) * 0.1);
			var lustDamage = ((gCstat(actor,"agility") * 3 + gCstat(actor,"will") * 2 + gCstat(actor,"intelligence") * 1 + gCstat(actor,"perception") * 2 + gCstat(actor,"luck") * 1) / 30);
			var lustDamage2 = lustDamage * (0.3 + limitedRandomInt(20) * 0.01);
			lustDamage *= slimedIntensity * multAr[0];
			var multAr2 = getSexDamageMult(actorKey,actorKey,this.key);
			lustDamage2 *= multAr2[0];
			getChar(target).lust.changeValue(-lustDamage);
			gC(actorKey).lust.changeValue(-lustDamage2);
			
			advanceTfGoalsPoints(this.tfGoals);
			
			results.value += lustDamage;
			
			results.description += randomFromList( [
											(ktn(actorKey) + "'s tongue runs all over " + ktn(target) + "'s face, stirring up lines of aether and flesh and leaving a soft tingling behind."),
											(ktn(actorKey) + "'s lips kiss and massage " + ktn(target) + "'s cheeks and chin, molding them to a new figure."),
											(ktn(actorKey) + "'s mouth plays with " + ktn(target) + "'s face as if it was candy, softly pushing and pulling its lines back and forth.") ] );
			results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1] + " " + ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
		}
		
		return results;
	}
	return sa;
}	
window.createSaSculptChest = function() {
	var sa = new sceneAction();
	sa.name = "Sculpt Chest";
	sa.key = "sculptChest";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.actorBpReqs.push("arms");
	sa.targetBpReqs.push("breasts");
	sa.tags.push("tf");
	sa.tfGoals = ["removeBreasts","addBreasts"];
	sa.strategyTags.push("tfPlus");
	
	sa.unvalidRelationalPositions.push(["standing","kneeling"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["mountedFromBehind","mountingFromBehind"],["mountedFromBehind","mountingAndMounted"]);
	
	sa.flavorTags.push("foreplay","useHands","targetBreasts");
	
	sa.description = "The character will give a new form to their target's chest.\nThis action may sensitize the target's breasts.\n\n"
				   + "Single target action.\nActor requires free hands, target requires free breasts.\n\nForeplay.\n\n__Influences__:\n"
				   + "Damage: Actor's physique x1, agility x2, resilience x2, will x2, perception x1, luck x1, target's slimed intensity.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		var actor = actorKey;
		
		if ( doesCharHaveAlteredState(target,"Bre+") == false ) {
			// Sensitized breasts
			var intensity = 0.05 + gCstat(actorKey,"agility") * 0.005 + limitedRandomInt(5) * 0.01;
			var turns = 4 + limitedRandomInt(4) + (gCstat(actorKey,"agility") * 0.04) - ((gCstat(actorKey,"agility") * 0.04) % 1);
			var as = createSensitizedTag(intensity,"useBreasts","Sensitized breasts","Bre+",turns,"The breasts of this character will receive extra damage.");
			applyAlteredState([target],as); 
		}
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var slimedIntensity = 1 + (getCharsSlimedIntensity(target) * 0.1);
		var lustDamage = ((gCstat(actor,"physique") * 1 + gCstat(actor,"agility") * 2 + gCstat(actor,"resilience") * 2 + gCstat(actor,"will") * 2 + gCstat(actor,"perception") * 1 + gCstat(actor,"luck") * 1) / 30);
		var lustDamage2 = lustDamage * (0.3 + limitedRandomInt(20) * 0.01);
		lustDamage *= slimedIntensity * multAr[0];
		var multAr2 = getSexDamageMult(actorKey,actorKey,this.key);
		lustDamage2 *= multAr2[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		gC(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		
		advanceTfGoalsPoints(this.tfGoals);
		
		if ( State.variables.sc.genderChange == "feminine" ) {
			results.description += randomFromList( [
				(ktn(actorKey) + " kneaded " + ktn(target) + "'s chest, slowly giving form to two new mounds."),
				(ktn(actorKey) + " is forming " + boobsWord() + " over " + ktn(target) + "'s chest."),
				(ktn(actorKey) + " massages and kneads " + ktn(target) + "'s body, turning " + gC(target).posPr + " chest into " + boobsWord() + ".") ] );
		} else if ( State.variables.sc.genderChange == "masculine" ) {
			results.description += randomFromList( [
				(ktn(target) + "'s " + boobsWord() + " are slowly returned to " + gC(target).posPr + " chest, " + ktn(actorKey) + " flattening " + gC(target).posPr + "."),
				(ktn(actorKey) + " massages " + ktn(target) + "'s chest, calmly but surely pushing it back and giving it a more masculine form."),
				(ktn(actorKey) + "'s hands run all over " + ktn(target) + ", giving " + gC(target).comPr + " a more compact front.") ] );
		} else if ( gC(target).perPr == "she" ) {
			results.description += randomFromList( [
				(ktn(actorKey) + " massages " + ktn(target) + "'s " + boobsWord() + ", kneading them into a different form."),
				(ktn(target) + " feels " + gC(target).posPr + " " + boobsWord() + " being played with, shrunk and enlarged, as " + ktn(actorKey) + " playfully creates a new shape.") ] );	
		} else {
			results.description += randomFromList( [
				(ktn(actorKey) + " bathes " + gC(actorKey).posPr + " hands in " + ktn(target) + "'s chest, giving a new form."),
				(ktn(target) + " feels " + ktn(actorKey) + "'s hands push, pull and play with " + gC(target).posPr + " torso.") ] );	
		}
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1] + " " + ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
							   
		return results;
	}
	return sa;
}
window.createSaSculptBody = function() {
	var sa = new sceneAction();
	sa.name = "Sculpt Body";
	sa.key = "sculptBody";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.actorBpReqs.push("arms");
	sa.tags.push("tf");
	sa.tfGoals = ["rebuildFigure"];
	sa.strategyTags.push("tfPlus");
	
	sa.unvalidRelationalPositions.push(["standing","kneeling"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["mountedFromBehind","mountingFromBehind"],["mountedFromBehind","mountingAndMounted"]);
	
	sa.flavorTags.push("foreplay","useHands");
	
	sa.description = "The character will remould the target's body, changing its form, lines and constitution.\n\n"
				   + "Single targe action.\nActor requires free hands.\n\nForeplay.\n\n__Influences__:\n"
				   + "Damage: Actor's physique x2, agility x3, resilience x2, will x2, perception x1, luck x1, target's slimed intensity.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		var actor = actorKey;
		
		var multAr = getSexDamageMult(actorKey,target,this.key);
		var slimedIntensity = 1 + (getCharsSlimedIntensity(target) * 0.1);
		var lustDamage = ((gCstat(actor,"physique") * 2 + gCstat(actor,"agility") * 3 + gCstat(actor,"resilience") * 2 + gCstat(actor,"will") * 2 + gCstat(actor,"perception") * 1 + gCstat(actor,"luck") * 1) / 30);
		var lustDamage2 = lustDamage * (0.3 + limitedRandomInt(20) * 0.01);
		lustDamage *= slimedIntensity * multAr[0];
		var multAr2 = getSexDamageMult(actorKey,actorKey,this.key);
		lustDamage2 *= multAr2[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		gC(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		
		advanceTfGoalsPoints(this.tfGoals);
		
		if ( State.variables.sc.genderChange == "feminine" ) {
			results.description += randomFromList( [
				(ktn(actorKey) + " hugs " + ktn(target) + "'s waist, tightening and squeezing it until revealing the form of an hourglass."),
				(ktn(actorKey) + " fondles " + ktn(target) + "'s hips up and down, stretching their limits until they become savory to the palate of " + gC(actorKey).posPr + " palms."),
				(ktn(actorKey) + " throughly rubs " + gC(actorKey).posPr + " body up and down against the flesh of " + ktn(target) + ", " + gC(target).posPr + " curves moving along with the embrace."),
				(ktn(target) + "'s skin feels soft and flexible, adjusting itself to the movements of " + ktn(actorKey) + "'s hands like silk accepts the form granted by its weaver.")				] );
		} else if ( State.variables.sc.genderChange == "masculine" ) {
			results.description += randomFromList( [
				(ktn(target) + "'s skin feels soft and flexible, adjusting itself to the movements of " + ktn(actorKey) + "'s hands like silk accepts the form granted by its weaver."),
				(ktn(actorKey) + " expands " + ktn(target) + "'s shoulders until they appear ample and robust."),
				(ktn(actorKey) + " softens the lines in " + ktn(target) + "'s waist.") ] );
		} else {
			results.description += randomFromList( [
				(ktn(target) + "'s skin feels soft and flexible, adjusting itself to the movements of " + ktn(actorKey) + "'s hands like silk accepts the form granted by its weaver."),
				(ktn(actorKey) + " plays with " + ktn(target) + "'s body, enlarging and relaxing tendons and muscles as " + gC(actorKey).perPr + " sees fit."),
				(ktn(actorKey) + " works " + ktn(target) + "'s body, highlighting some features and concealing others."),
				(ktn(actorKey) + " pulls and twists the strings of aether that keep " + ktn(target) + "'s body together, turning it into something new.") ] );	
		}
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1] + " " + ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
							   
		return results;
	}
	return sa;
}

window.createSaFormDick = function() {
	var sa = new sceneAction();
	sa.name = "Form Dick";
	sa.key = "formDick";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.tags.push("tf");
	sa.tfGoals = ["addDick"];
	sa.strategyTags.push("tfPlus");
	
	sa.unvalidRelationalPositions.push(["standing","kneeling"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["mountedFromBehind","mountingFromBehind"],["mountedFromBehind","mountingAndMounted"]);
	
	sa.flavorTags.push("foreplay","targetDick");
	
	sa.description = "The character will manipulate their target's aether to form a dick in their groin.\n\n"
				   + "Single target action.\n\nForeplay.\n\n__Influences__:\n"
				   + "Damage: Actor's agility x3, intelligence x3, will x2, perception x2, luck x1, target's slimed intensity.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		var actor = actorKey;
		
		var flavorTags = this.flavorTags;
		
		if ( doesCharHaveAlteredState(target,"Dic+") == false ) {
			// Sensitized dick
			var intensity = 0.05 + gCstat(actorKey,"agility") * 0.005 + limitedRandomInt(5) * 0.01;
			var turns = 4 + limitedRandomInt(4) + (gCstat(actorKey,"agility") * 0.04) - ((gCstat(actorKey,"agility") * 0.04) % 1);
			var as = createSensitizedTag(intensity,"useDick","Sensitized dick","Dic+",turns,"The dick of this character will receive extra damage.");
			applyAlteredState([target],as);
		}
		
		var descriptionsString = [ (ktn(actorKey) + " rides " + ktn(target) + "'s groin, pulling strings of aether on " + gC(actorKey).posPr + " way up."),
						(ktn(actorKey) + "'s hips move back and forth, forming a cylindrical shape between them with " + ktn(target) + "'s essence."),
						(ktn(target) + " feels " + gC(target).posPr + " groin between pulled as " + ktn(actorKey) + " forms a new member between " + gC(target).posPr + " legs.") ];
		if ( gC(actorKey).body.hasOwnProperty("pussy") ) {
			if ( gC(actorKey).body.pussy.state != "locked" ) {
				flavorTags.push("usePussy");
				descriptionsString.push( (ktn(actorKey) + "'s movements are giving form to a new " + dickWord() + " between " + ktn(target) + "'s legs, which constantly caresses " + gC(actorKey).posPr + " own " + pussyWord() + ".") );
			}
		}
		results.description += randomFromList(descriptionsString);
		
		var multAr = getSexDamageMultAlt(actorKey,target,flavorTags);
		var slimedIntensity = 1 + (getCharsSlimedIntensity(target) * 0.1);
		var lustDamage = ((gCstat(actor,"agility") * 3 + gCstat(actor,"intelligence") * 3 + gCstat(actor,"will") * 2 + gCstat(actor,"perception") * 2 + gCstat(actor,"luck") * 1) / 30);
		var lustDamage2 = lustDamage * (0.3 + limitedRandomInt(20) * 0.01);
		lustDamage *= slimedIntensity * multAr[0];
		var multAr2 = getSexDamageMultAlt(actorKey,actorKey,flavorTags);
		lustDamage2 *= multAr2[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		gC(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		
		advanceTfGoalsPoints(this.tfGoals);
		
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1] + " " + ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
							   
		return results;
	}
	return sa;
}
window.createSaFormPussy = function() {
	var sa = new sceneAction();
	sa.name = "Form Pussy";
	sa.key = "formPussy";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.tags.push("tf");
	sa.tfGoals = ["addPussy"];
	sa.strategyTags.push("tfPlus");
	
	sa.unvalidRelationalPositions.push(["standing","kneeling"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["mountedFromBehind","mountingFromBehind"],["mountedFromBehind","mountingAndMounted"]);
	
	sa.flavorTags.push("foreplay","targetPussy");
	
	sa.description = "The character will manipulate their target's aether to form a pussy in their groin.\n\n"
				   + "Single target action.\n\nForeplay.\n\n__Influences__:\n"
				   + "Damage: Actor's agility x3, intelligence x3, will x2, perception x2, luck x1, target's slimed intensity.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		var actor = actorKey;
		
		var flavorTags = this.flavorTags;
		
		if ( doesCharHaveAlteredState(target,"Pus+") == false ) {
			// Sensitized pussy
			var intensity = 0.05 + gCstat(actorKey,"agility") * 0.005 + limitedRandomInt(5) * 0.01;
			var turns = 4 + limitedRandomInt(4) + (gCstat(actorKey,"agility") * 0.04) - ((gCstat(actorKey,"agility") * 0.04) % 1);
			var as = createSensitizedTag(intensity,"usePussy","Sensitized pussy","Pus+",turns,"The pussy of this character will receive extra damage.");
			applyAlteredState([target],as);
		}
		
		var descriptionsString = [ (ktn(actorKey) + " pushes against " + ktn(target) + "'s groin, drilling new folds."),
						(ktn(target) + " feels " + gC(target).posPr + " groin unfolding apart as " + ktn(actorKey) + " gives form to " + ktn(target) + "'s new " + pussyWord() + "."),
						(ktn(actorKey) + " makes room between " + ktn(target) + "'s legs for new genitalia.") ];
		if ( gC(actorKey).body.hasOwnProperty("dick") ) {
			if ( gC(actorKey).body.dick.state != "locked" ) {
				flavorTags.push("useDick");
				descriptionsString.push( (ktn(actorKey) + "'s " + dickWord() + " penetrates between " + ktn(target) + "'s legs, giving form to " + ktn(target) + "'s new " + pussyWord() + ".") );
			}
		}
		results.description += randomFromList(descriptionsString);
		
		var multAr = getSexDamageMultAlt(actorKey,target,flavorTags);
		var slimedIntensity = 1 + (getCharsSlimedIntensity(target) * 0.1);
		var lustDamage = ((gCstat(actor,"agility") * 3 + gCstat(actor,"intelligence") * 3 + gCstat(actor,"will") * 2 + gCstat(actor,"perception") * 2 + gCstat(actor,"luck") * 1) / 30);
		var lustDamage2 = lustDamage * (0.3 + limitedRandomInt(20) * 0.01);
		lustDamage *= slimedIntensity * multAr[0];
		var multAr2 = getSexDamageMultAlt(actorKey,actorKey,flavorTags);
		lustDamage2 *= multAr2[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		gC(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		
		advanceTfGoalsPoints(this.tfGoals);
		
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1] + " " + ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
							   
		return results;
	}
	return sa;
}
window.createSaBuryDick = function() {
	var sa = new sceneAction();
	sa.name = "Bury Dick";
	sa.key = "buryDick";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.targetBpReqs.push("dick");
	sa.tags.push("tf");
	sa.tfGoals = ["removeDick"];
	sa.strategyTags.push("tfPlus");
	
	sa.unvalidRelationalPositions.push(["standing","kneeling"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["mountedFromBehind","mountingFromBehind"],["mountedFromBehind","mountingAndMounted"]);
	
	sa.flavorTags.push("foreplay","targetDick");
	
	sa.description = "The character will merge their target's dick with their abdomen and groin.\n\n"
				   + "Single target action.\nTarget requires free dick.\n\nForeplay.\n\n__Influences__:\n"
				   + "Damage: Actor's physique x1, agility x2, resilience x1, intelligence x1, will x2, perception x1, luck x1, target's slimed intensity.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		var actor = actorKey;
		
		var flavorTags = this.flavorTags;
		
		var extraMult = 1;
		var descriptionsString = [ (ktn(actorKey) + " rubs " + gC(actorKey).posPr + " groin against " + ktn(target) + "'s " + dickWord() + ", pushing " + 
						"it inside " + gC(target).comPr + "."),
						(ktn(target) + "'s " + dickWord() + " feels the pressure of " + ktn(actorKey) + "'s body, slowly but surely burying it inside " + ktn(target) + "'s own abdomen."),
						(ktn(target) + " feels " + gC(target).posPr + " own " + dickWord() + " being pushed back by " + ktn(actorKey) + "'s abdomen, gradually submerging into " + gC(target).posPr + " own skin.") ];
		if ( gC(actorKey).body.hasOwnProperty("pussy") ) {
			if ( gC(actorKey).body.pussy.state != "locked" ) {
				flavorTags.push("usePussy");
				extraMult += 0.1;
				descriptionsString.push( (ktn(target) + "'s " + dickWord() + " feels " + ktn(actorKey) + "'s " + pussyWord() + " kiss it goodbye as it merges within " + ktn(target) + "'s body.") );
			}
		}
		if ( gC(actorKey).body.hasOwnProperty("dick") ) {
			if ( gC(actorKey).body.dick.state != "locked" ) {
				flavorTags.push("useDick");
				extraMult += 0.1;
				descriptionsString.push( (ktn(target) + "'s " + dickWord() + " feels the friction with " + ktn(actorKey) + "'s own " + dickWord() + ", as the latter pushes the former into " + ktn(target) + "'s own body.") );
			}
		}
		results.description += randomFromList(descriptionsString);
		
		var multAr = getSexDamageMultAlt(actorKey,target,flavorTags);
		var slimedIntensity = 1 + (getCharsSlimedIntensity(target) * 0.1);
		var lustDamage = ((gCstat(actor,"physique") * 1 + gCstat(actor,"agility") * 2 + gCstat(actor,"resilience") * 1 + gCstat(actor,"intelligence") * 1 + gCstat(actor,"will") * 2 + gCstat(actor,"perception") * 1 + gCstat(actor,"luck") * 1) / 33) * extraMult;
		var lustDamage2 = lustDamage * (0.3 + limitedRandomInt(20) * 0.01);
		lustDamage *= slimedIntensity * multAr[0];
		var multAr2 = getSexDamageMultAlt(actorKey,actorKey,flavorTags);
		lustDamage2 *= multAr2[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		gC(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		
		advanceTfGoalsPoints(this.tfGoals);
		
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1] + " " + ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
							   
		return results;
	}
	return sa;
}
window.createSaFoldPussy = function() {
	var sa = new sceneAction();
	sa.name = "Fold Pussy";
	sa.key = "foldPussy";
	sa.targetType = "single";
	sa.tags.push("ss");
	sa.tags.push("sUse");
	sa.targetBpReqs.push("pussy");
	sa.tags.push("tf");
	sa.tfGoals = ["removePussy"];
	sa.strategyTags.push("tfPlus");
	
	sa.unvalidRelationalPositions.push(["standing","kneeling"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["spitroastTarget","spitroastBehind"]);
	sa.unvalidRelationalPositions.push(["spitroastFront","spitroastBehind"],["spitroastBehind","spitroastFront"]);
	sa.unvalidRelationalPositions.push(["mountedFromBehind","mountingFromBehind"],["mountedFromBehind","mountingAndMounted"]);
	
	sa.flavorTags.push("foreplay","targetPussy");
	
	sa.description = "The character will manipulate their target's aether to fold their pussy away.\n\n"
				   + "Single target action.\nTarget requires free pussy.\n\nForeplay.\n\n__Influences__:\n"
				   + "Damage: Actor's physique x1, agility x2, resilience x1, intelligence x1, will x2, perception x1, luck x1, target's slimed intensity.";
				   
	sa.execute = function(actorKey,targetActors) {
		var results = new saResults;
		var target = targetActors[0];
		var actor = actorKey;
		
		var flavorTags = this.flavorTags;
		
		var extraMult = 1;
		var descriptionsString = [ (ktn(actorKey) + " manipulates the aether around " + ktn(target) + "'s " + pussyWord() + ", carefully folding it closed."),
						(ktn(actorKey) + " rubs against " + ktn(target) + "'s " + pussyWord() + ", melding its lips into one."),
						(ktn(target) + " feels " + gC(target).posPr + " " + pussyWord() + " being slowly shut by " + ktn(actorKey) + "'s magical manipulation.") ];
		results.description += randomFromList(descriptionsString);
		
		var multAr = getSexDamageMultAlt(actorKey,target,flavorTags);
		var slimedIntensity = 1 + (getCharsSlimedIntensity(target) * 0.1);
		var lustDamage = ((gCstat(actor,"physique") * 1 + gCstat(actor,"agility") * 2 + gCstat(actor,"resilience") * 1 + gCstat(actor,"intelligence") * 1 + gCstat(actor,"will") * 2 + gCstat(actor,"perception") * 1 + gCstat(actor,"luck") * 1) / 30) * extraMult;
		var lustDamage2 = lustDamage * (0.3 + limitedRandomInt(20) * 0.01);
		lustDamage *= slimedIntensity * multAr[0];
		var multAr2 = getSexDamageMultAlt(actorKey,actorKey,flavorTags);
		lustDamage2 *= multAr2[0];
		getChar(targetActors[0]).lust.changeValue(-lustDamage);
		gC(actorKey).lust.changeValue(-lustDamage2);
		results.value += lustDamage;
		
		advanceTfGoalsPoints(this.tfGoals);
		
		results.description += " " + ktn(target) + " received " + textLustDamage(lustDamage) + ". " + multAr[1] + " " + ktn(actorKey) + " received " + textLustDamage(lustDamage2) + ". " + multAr2[1];
							   
		return results;
	}
	return sa;
}
