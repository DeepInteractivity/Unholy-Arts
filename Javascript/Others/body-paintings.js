////////// BODY PAINTINGS CLASS //////////

window.bodyPaintingType = function(tag,name,baseDiff,getDescription,fTeffects,effectsLevel,minusEffectsLevel,
								   calcLevel,potEnabled,isEnabled,strtgPotency,strtgTags,getPreliminaryDesc) {
	this.tag = tag;
	this.name = name;
	this.baseDiff = baseDiff; // Base painting difficulty
	this.getDescription = getDescription; // (actor,target) Function that returns a description of the BdPnt
	
	this.fTeffects = fTeffects; // (actor,target) Function - Immediate effects of applying the painting. Returns a description of such effects
	this.effectsLevel = effectsLevel; // (actor,target) Effects from one BdPnt level
	this.minusEffectsLevel = minusEffectsLevel; // (actor,target) Removes the effects of one BdPnt Level
	
	this.calcLevel = calcLevel; // (actor,target) Calculate level -> Returns the level at which the BdPnt will be applied by the actor to the target
	this.potEnabled = potEnabled; // Potentially Enabled (actor,target) -> Returns true/false if the BdPnt may even be shown
	this.isEnabled = isEnabled; // (actor,target) -> Returns [true/false,explanation], [0] allows or disallows the BdPnt, [1] explains why
	
	this.strtgPotency = strtgPotency; // Strategic Potency: Tells the AI how strong the BdPnt is
	this.strtgTags = strtgTags; // Strategic Tags: Tells the AI the benefits of using a particular BdPnt
	
	this.getPreliminaryDesc = getPreliminaryDesc; // Description of the body painting's effects received by the player before selecting it
}

// Strategic tags list:
// friendship,domination,sexualTension, etc. -> The bdPnt increases this relationship stat

// Specific Painting Parameters:
// Tag: Identifies where the base data of the BdPnt must be read from
// Actor: Identifies the actor who painted the object
// Target: Identifies the character on which the object was painted
// Effect Level: Strength of the painting. The higher the strength, the higher the effect. When a painting altered state ends, the level falls by 1, reducing the effect. If the level falls to zero, the painting is ended for good. The maximum level is 3.
// Resistance: Resistance points of the BdPnt. When these fall to zero, the painting loses a level. A painting's resistance level is set to three each time it is set to a new level.

// Main functions
window.areBodyPaintsDemandsEnabled = function() {
	var result = false;
	if ( State.variables.storyState >= storyState.firstAdventure ) {
		result = true;
	}
	return result;
}

window.getCharsBdPntSkill = function(cK) {
	var skill = gCstat(cK,"perception") * 0.3 + gCstat(cK,"intelligence") * 0.1 + gCstat(cK,"agility") * 0.2 + getCharsSpecialExperience(cK,"pntExp") * 0.5;
	return skill;
}

window.canTargetBeBodyPaintedByActor = function(target,actor,bdPntTag) {
	var result = false;
	if ( bdPntData(bdPntTag) != undefined ) {
		if ( doesCharHaveState(target,"BdPt") == false ) {
			if ( bdPntData(bdPntTag).potEnabled(actor,target) && bdPntData(bdPntTag).isEnabled(actor,target) ) {
				result = true;
			}
		}
	}
	return result;
}
window.getListOfValidBdPntsFromActorToTarget = function(actor,target) {
	var potentialBdPnts = [];
	for ( var bdPntTag of setup.bdPntTags ) {
		if ( bdPntData(bdPntTag).potEnabled(actor,target) && bdPntData(bdPntTag).isEnabled(actor,target) ) {
			potentialBdPnts.push(bdPntTag);
		}
	}
	return potentialBdPnts;
}
window.actorBodyPaintsTargetWithTag = function(actor,target,bdPntTag) {
	var result = null;
	if ( canTargetBeBodyPaintedByActor(target,actor,bdPntTag) ) {
		var lvl = bdPntData(bdPntTag).calcLevel(actor,target);
		if ( lvl > 0 ) {
			var bdPntObj = createBodyPainting(bdPntTag,actor,target,lvl,3);
			State.variables.bdPntDesc = bdPntData(bdPntTag).fTeffects(actor,target);
			applyAlteredState([target],bdPntObj);
			bdPntApplyLevelsEffects(bdPntObj,lvl);
		}
		result = lvl;
	}
	return result;
}

window.bdPntApplyLevelsEffects = function(bdPnt,levels) {
	var i = 0;
	while ( i < levels ) {
		bdPntData(bdPnt.tag).effectsLevel(bdPnt.actor,bdPnt.target);
		i++;
	}
}
window.bdPntGainsLevels = function(bdPnt,levels) {
	var i = 0;
	while ( i < levels ) {
		bdPntData(bdPnt.tag).effectsLevel(bdPnt.actor,bdPnt.target);
		bdPnt.level++;
		i++;
	}
}
window.bdPntGainsLevelsFake = function() {
	return null;
}

window.bdPntLosesResistance = function(bdPnt,lostRes) {
	var i = lostRes;
	while ( i > 0 && bdPnt.level > 0 ) {
		bdPnt.resistance--;
		if ( bdPnt.resistance == 0 ) {
			bdPntLosesLevels(bdPnt,1);
			bdPnt.resistance = 3;
		}
		i--;
	}
}
window.bdPntLosesLevels = function(bdPnt,levels) {
	var i = 0;
	while ( i < levels ) {
		bdPntData(bdPnt.tag).minusEffectsLevel(bdPnt.actor,bdPnt.target);
		bdPnt.level--;
		i++;
	}
}
window.washCharsBodyPainting = function(cK) {
	var removeBdPnt = false;
	var flagWashed = false;
	for ( var as of gC(cK).alteredStates ) {
		if ( as.acr == "BdPt" ) {
			flagWashed = true;
			as.resistance--;
			if ( as.resistance == 0 ) {
				bdPntLosesLevels(as,1);
				if ( as.level = 0 ) {
					removeBdPnt = true;
				}
			}
		}
	}
	if ( removeBdPnt ) {
		gC(cK).removeSpecificState("BdPt");
	}
	return flagWashed;
}

window.baseCalculateBdPntLevel = function(tag,actor,target) {
	var difficulty = bdPntData(tag).baseDiff;
	if ( gC(target).race == "shapeshifter" || gC(target).race == "aiishen" ) {
		difficulty *= 1.5;
	}
	if ( difficulty < 1 ) { difficulty = 1; }
	var level = Math.floor(getCharsBdPntSkill(actor) / difficulty);
	if ( level > 3 ) { level = 3; }
	return level;
}

// AI
window.actorChoosesBdPntOnTarget = function(actor,target) {
	var potentialBdPnts = getListOfValidBdPntsFromActorToTarget(actor,target);
	var bdPntScores = [];
	var i = 0;
	// Score each valid bdPnt
	while ( i < potentialBdPnts.length ) {
		bdPntScores.push(scoreBdPnt(potentialBdPnts[i],actor,target));
		i++;
	}
	// Select bdPnt with highest score
	var selectedTag = "";
	i = 0;
	var highestScore = -1;
	while ( i < potentialBdPnts.length ) {
		if ( bdPntScores[i] > highestScore ) {
			selectedTag = potentialBdPnts[i];
			highestScore = bdPntScores[i];
		}
		i++;
	}
	return selectedTag;
}
window.scoreBdPnt = function(bdPntTag,actor,target) {
	var score = 10 * bdPntData(bdPntTag).strtgPotency;
	score *= bdPntData(bdPntTag).calcLevel(actor,target);
	for ( var strTag of bdPntData(bdPntTag).strtgTags ) {
		switch(strTag) {
			case "domination":
				score *= (getCharsDrivePercent(actor,"dDomination") / 0.16) * (getCharsDrivePercent(actor,"dAmbition") / 0.16);
				if ( isTargetInActorsTsTypes(target,actor,["covetTs","conquestTs","rivalTs"]) ) { score *= 4; }
				break;
			case "friendship":
				score *= (getCharsDrivePercent(actor,"dCooperation") / 0.16) * (getCharsDrivePercent(actor,"dLove") / 0.16);
				if ( isTargetInActorsTsTypes(target,actor,["allyTs","loveTs"]) ) { score *= 4; }
				break;
			case "sexualTension":
				score *= (getCharsDrivePercent(actor,"dPleasure") / 0.16);
				if ( isTargetInActorsTsTypes(target,actor,["covetTs","loveTs"]) ) { score *= 4; }
				break;
			case "paternalism":
				score *= (getCharsDrivePercent(actor,"dAmbition") / 0.16);
				if ( isTargetInActorsTsTypes(target,actor,["conquestTs","loveTs","covetTs"]) ) { score *= 4; }
				break;
			case "targetPussy":
				if (getCharsDrivePercent(actor,"dPleasure") > 0.16 ) {
					score *= (1 + ( gC(actor).tastes.targetPussy.r * 4));
				}
				break;
			case "weaken":
				score *= (getCharsDrivePercent(actor,"dDomination") / 0.16);
				if ( isTargetInActorsTsTypes(target,actor,["conquestTs","rivalTs"]) ) { score *= 4; }
				break;
		}
	}
	score = score + limitedRandomInt(score*3);
	return score;
}

// Body Paintings Data
window.createBdPntPetMark = function() {
	var bdPnt = new bodyPaintingType("pet","Pet Mark",10, // Tag, Name, Difficulty Level
		function(actor,target) { // Description
			var desc = "<" + gC(actor).getName() + "'s loyal pet> can be read on " + gC(target).getName() + "'s forehead.\n"
					 + "A jingle bell decorates " + gC(target).posPr + " neck.\n"
					 + "Raised sexual tension and submission.";
			return desc;
		},
		function(actor,target) { // Immediate effects
			var posR = rLvlAbt(target,actor,"sexualTension") + rLvlAbt(target,actor,"romance") + rLvlAbt(target,actor,"submission");
			var negR = rLvlAbt(target,actor,"rivalry") + rLvlAbt(target,actor,"enmity") * 2 + rLvlAbt(target,actor,"domination");
			var proportion = (posR + 1)/(negR + 1); // Proportion between positive relationships and negative relationships
			var diffMod = 0; // Increases the difficulty of getting a good result
			if ( gC(target).race == "beastkin" ) { diffMod = 1; }
			proportion -= diffMod;
			var desc = "";
			if ( proportion >= 1.5 ) {
				desc = colorText("Positive reaction: ","green") + gC(target).getFormattedName() + " cannot help but feel aroused at the thought of being treated like " + gC(actor).getFormattedName() + "'s mascot.\n"
						 + getTextRelationIncrease(target,actor,"sexual tension",2+diffMod) + "\n"
						 + getTextRelationIncrease(target,actor,"submission",1+diffMod) + "\n"
						 + getTextRelationIncrease(target,actor,"romance",1+diffMod);
				gC(target).relations[actor].sexualTension.stv += 100 + (diffMod * 100);
				gC(target).relations[actor].submission.stv += 50 + (diffMod * 50);
				gC(target).relations[actor].romance.stv += 50 + (diffMod * 50);
			} else if ( proportion < 0.7 ) {
				desc = colorText("Negative reaction: ","red") + gC(target).getFormattedName() + " feels shamed and frustrated at the thought of being treated like " + gC(actor).getFormattedName() + "'s mascot.\n"
						 + getTextRelationIncrease(target,actor,"enmity",2+diffMod) + "\n"
						 + getTextRelationIncrease(target,actor,"rivalry",2+diffMod) + "\n"
						 + getTextRelationIncrease(target,actor,"submission",1+diffMod);
				gC(target).relations[actor].rivalry.stv += 100 + (diffMod * 100);
				gC(target).relations[actor].enmity.stv += 100 + (diffMod * 100);
				gC(target).relations[actor].submission.stv += 50 + (diffMod * 50);
			} else {
				desc = colorText("Mixed reaction: ","purple") + gC(target).getFormattedName() + " feels aroused at the thought of being treated like " + gC(actor).getFormattedName() + "'s mascot, but " + gC(target).perPr + " is already plotting " + gC(target).posPr + " revenge.\n"
						 + getTextRelationIncrease(target,actor,"sexual tension",2+diffMod) + "\n"
						 + getTextRelationIncrease(target,actor,"rivalry",2+diffMod) + "\n"
						 + getTextRelationIncrease(target,actor,"submission",1+diffMod);
				gC(target).relations[actor].rivalry.stv += 100 + (diffMod * 100);
				gC(target).relations[actor].sexualTension.stv += 100 + (diffMod * 100);
				gC(target).relations[actor].submission.stv += 50 + (diffMod * 50);
			}
			return desc;
		},
		function(actor,target) { // Effects per gained level
			gC(target).relations[actor].sexualTension.levelMod += 1;
			gC(target).relations[actor].submission.levelMod += 1;
		},
		function(actor,target) { // Effects per lost level
			gC(target).relations[actor].sexualTension.levelMod -= 1;
			gC(target).relations[actor].submission.levelMod -= 1;
		},
		function(actor,target) { // Calculate level
			return baseCalculateBdPntLevel(this.tag,actor,target);
		},
		function(actor,target) { // Potentially enabled
			var flag = false;
			if ( State.variables.storyState >= storyState.firstAdventure ) {
				flag = true;
			}
			return flag;
		},
		function(actor,target) { // Is Enabled
			var flag = false;
			if ( this.calcLevel(actor,target) >= 1 ) {
				flag = true;
			}
			return flag;
		}, 1, // Strategic Potency
		["domination","sexualTension"], // Strategic tags
		function() { // Preliminary Description
			return "Raised sexual tension and submission."
		}
	)
	return bdPnt;
}
window.createBdPntSlutMark = function() {
	var bdPnt = new bodyPaintingType("slut","Slut Mark",12, // Tag, Name, Difficulty Level
		function(actor,target) { // Description
			var desc = "<" + gC(actor).getName() + "'s thirsty slut> can be read on " + gC(target).getName() + "'s forehead.\n"
					 + "A large heart-shaped symbol draws attention to " + gC(target).posPr + " belly.\n"
					 + "Raised sexual tension and submission, slight increase to sex-based attacks strength and large increase to sex-based attacks weakness.";
			return desc;
		},
		function(actor,target) { // Immediate effects
			var posR = rLvlAbt(target,actor,"sexualTension") + rLvlAbt(target,actor,"submission") + getCharsDrive(target,"dPleasure") * 2;
			var negR = rLvlAbt(target,actor,"rivalry") + rLvlAbt(target,actor,"enmity") * 2 + rLvlAbt(target,actor,"domination") + getCharsDrive(target,"dImprovement") + getCharsDrive(target,"dAmbition");
			var proportion = (posR + 1)/(negR + 1); // Proportion between positive relationships and negative relationships
			var effMod = 0; // Increases the effect of non-negative immediate effects
			if ( getCharsDrivePercent(target,"dPleasure") >= 0.3 ) { effMod = 1; }
			var desc = "";
			if ( proportion >= 1.5 ) {
				desc = colorText("Positive reaction: ","green") + gC(target).getFormattedName() + " feels a rush of pleasure when " + gC(target).perPr + " sees " + gC(target).posPr + " new mark.\n"
						 + getTextRelationIncrease(target,actor,"sexual tension",2+effMod) + "\n"
						 + getTextRelationIncrease(target,actor,"submission",1+effMod);
				gC(target).relations[actor].sexualTension.stv += 100 + (effMod * 100);
				gC(target).relations[actor].submission.stv += 50 + (effMod * 50);
			} else if ( proportion < 0.7 ) {
				desc = colorText("Negative reaction: ","red") + gC(target).getFormattedName() + " is angry at the demeaning remark that is now engraved at " + gC(target).posPr + " head.\n"
						 + getTextRelationIncrease(target,actor,"sexual tension",2+effMod) + "\n"
						 + getTextRelationIncrease(target,actor,"rivalry",2) + "\n"
						 + getTextRelationIncrease(target,actor,"submission",1+effMod);
				gC(target).relations[actor].sexualTension.stv += 100 + (effMod * 100);
				gC(target).relations[actor].rivalry.stv += 100;
				gC(target).relations[actor].submission.stv += 50 + (effMod * 50);
			} else {
				desc = colorText("Mixed reaction: ","purple") + gC(target).getFormattedName() + " feels aroused from the shaming message marking " + gC(target).posPr + ", but some anger still persists.\n"
						 + getTextRelationIncrease(target,actor,"sexual tension",2+effMod) + "\n"
						 + getTextRelationIncrease(target,actor,"rivalry",2) + "\n"
						 + getTextRelationIncrease(target,actor,"enmity",2) + "\n"
						 + getTextRelationIncrease(target,actor,"submission",1+effMod);
				gC(target).relations[actor].sexualTension.stv += 100 + (effMod * 100);
				gC(target).relations[actor].rivalry.stv += 100;
				gC(target).relations[actor].enmity.stv += 100;
				gC(target).relations[actor].submission.stv += 50 + (effMod * 50);
			}
			return desc;
		},
		function(actor,target) { // Effects per gained level
			gC(target).relations[actor].sexualTension.levelMod += 1;
			gC(target).relations[actor].submission.levelMod += 1;
			gC(target).combatAffinities.sex.weakness += 15;
			gC(target).combatAffinities.sex.strength += 5;
		},
		function(actor,target) { // Effects per lost level
			gC(target).relations[actor].sexualTension.levelMod -= 1;
			gC(target).relations[actor].submission.levelMod -= 1;
			gC(target).combatAffinities.sex.weakness -= 15;
			gC(target).combatAffinities.sex.strength -= 5;
		},
		function(actor,target) { // Calculate level
			return baseCalculateBdPntLevel(this.tag,actor,target);
		},
		function(actor,target) { // Potentially enabled
			var flag = false;
			if ( State.variables.storyState >= storyState.firstAdventure ) {
				flag = true;
			}
			return flag;
		},
		function(actor,target) { // Is Enabled
			var flag = false;
			if ( this.calcLevel(actor,target) >= 1 ) {
				flag = true;
			}
			if ( actor != "chPlayerCharacter" && getCharsDrivePercent(actor,"dPleasure") < 0.12 ) { // NPCs must be slightly horny
				flag = false;
			}
			return flag;
		}, 1, // Strategic Potency
		["domination","sexualTension","weaken"], // Strategic tags
		function() { // Preliminary Description
			return "Raised sexual tension and submission, slightly increased sex strength and largely increased sex weakness."
		}
	)
	return bdPnt;
}
window.createBdPntHoneyMark = function() {
	var bdPnt = new bodyPaintingType("honey","Honeypot Mark",8, // Tag, Name, Difficulty Level
		function(actor,target) { // Description
			var desc = "<" + gC(actor).getName() + "'s personal honeypot> has been beautifully written on " + gC(target).getName() + "'s face.\n"
					 + "A tongue has being drawn over " + gC(target).posPr + " abdomen.\n"
					 + "Raised friendship and sexual tension. Increased desire to use their own pussy and weakness to attacks targetting their pussy.";
			return desc;
		},
		function(actor,target) { // Immediate effects
			var posR = rLvlAbt(target,actor,"friendship") + rLvlAbt(target,actor,"romance") + rLvlAbt(target,actor,"sexualTension") * 2;
			var negR = rLvlAbt(target,actor,"rivalry") * 2 + rLvlAbt(target,actor,"enmity") * 3 + rLvlAbt(target,actor,"domination");
			var proportion = (posR + 1)/(negR + 1); // Proportion between positive relationships and negative relationships
			var effMod = 0; // Increases the effect of non-negative immediate effects
			if ( getCharsDrivePercent(target,"dCooperation") >= 0.25 ) { effMod = 1; }
			var desc = "";
			if ( proportion >= 1.5 ) {
				desc = colorText("Positive reaction: ","green") + gC(target).getFormattedName() + " somehow feels flattered at " + gC(actor).getFormattedName() + " seeing " + gC(target).comPr + " that way.\n"
						 + getTextRelationIncrease(target,actor,"romance",2) + "\n"
						 + getTextRelationIncrease(target,actor,"friendship",1) + "\n"
						 + getTextRelationIncrease(target,actor,"sexualTension",2);
				gC(target).relations[actor].sexualTension.stv += 100;
				gC(target).relations[actor].friendship.stv += 50;
				gC(target).relations[actor].romance.stv += 100;
			} else if ( proportion < 0.7 ) {
				desc = colorText("Negative reaction: ","red") + gC(target).getFormattedName() + " finds " + gC(target).posPr + " new body painting to be in bad taste.\n"
						 + getTextRelationIncrease(target,actor,"enmity",2) + "\n"
						 + getTextRelationIncrease(target,actor,"sexualTension",2);
				gC(target).relations[actor].sexualTension.stv += 100;
				gC(target).relations[actor].enmity.stv += 100;
			} else {
				desc = colorText("Mixed reaction: ","purple") + gC(target).getFormattedName() + " has mixed feelings about " + gC(target).posPr + " new body painting's meaning.\n"
						 + getTextRelationIncrease(target,actor,"sexual tension",2) + "\n"
						 + getTextRelationIncrease(target,actor,"rivalry",1) + "\n"
						 + getTextRelationIncrease(target,actor,"romance",1);
				gC(target).relations[actor].rivalry.stv += 50;
				gC(target).relations[actor].sexualTension.stv += 100;
				gC(target).relations[actor].romance.stv += 50;
			}
			return desc;
		},
		function(actor,target) { // Effects per gained level
			gC(target).relations[actor].sexualTension.levelMod += 1;
			gC(target).relations[actor].friendship.levelMod += 1;
			gC(target).tastes.usePussy.w += 15;
			gC(target).combatAffinities.usePussy.weakness += 10;
		},
		function(actor,target) { // Effects per lost level
			gC(target).relations[actor].sexualTension.levelMod -= 1;
			gC(target).relations[actor].friendship.levelMod -= 1;
			gC(target).tastes.usePussy.w -= 15;
			gC(target).combatAffinities.usePussy.weakness -= 10;
		},
		function(actor,target) { // Calculate level
			return baseCalculateBdPntLevel(this.tag,actor,target);
		},
		function(actor,target) { // Potentially enabled
			var flag = false;
			if ( State.variables.storyState >= storyState.firstAdventure ) {
				flag = true;
			}
			return flag;
		},
		function(actor,target) { // Is Enabled
			var flag = false;
			if ( this.calcLevel(actor,target) >= 1 ) {
				if ( gC(actor).race == "leirien" || gC(target).race == "leirien" ) {
					flag = true;
				}
			}
			return flag;
		}, 1, // Strategic Potency
		["friendship","sexualTension","targetPussy"], // Strategic tags ]
		function() { // Preliminary Description
			return "Raised friendship and sexual tension, increased taste for using own pussy and weakness to pussy attacks."
		}
	)
	return bdPnt;
}
window.createBdPntProtegeeMark = function() {
	var bdPnt = new bodyPaintingType("prot","Protegee Mark",12, // Tag, Name, Difficulty Level
		function(actor,target) { // Description
			var desc = "A shield has been engraved over " + gC(target).getName() + "'s forehead, with the title <" + gC(actor).getName()
					 + "'s protegee> stoically written around it.\n"
					 + "Raised friendship and submission, small increase to will.";
			return desc;
		},
		function(actor,target) { // Immediate effects
			var posR = rLvlAbt(target,actor,"friendship") + rLvlAbt(target,actor,"romance") * 2 + rLvlAbt(target,actor,"submission");
			var negR = rLvlAbt(target,actor,"rivalry") + rLvlAbt(target,actor,"enmity") * 2 + rLvlAbt(target,actor,"domination") + getCharsDrive(target,"dAmbition") + getCharsDrive(target,"dDomination");
			var proportion = (posR + 1)/(negR + 1); // Proportion between positive relationships and negative relationships
			var desc = "";
			if ( proportion >= 1.5 ) {
				desc = colorText("Positive reaction: ","green") + gC(target).getFormattedName() + " likes the idea of having " + gC(actor).getFormattedName() + " warning " + gC(target).posPr + " enemies.\n"
						 + getTextRelationIncrease(target,actor,"romance",2) + "\n"
						 + getTextRelationIncrease(target,actor,"submission",2) + "\n"
						 + getTextRelationIncrease(target,actor,"friendship",1);
				gC(target).relations[actor].friendship.stv += 50;
				gC(target).relations[actor].submission.stv += 100;
				gC(target).relations[actor].romance.stv += 100;
			} else if ( proportion < 0.7 ) {
				desc = colorText("Negative reaction: ","red") + gC(target).getFormattedName() + " dislikes being treated with such paternalism.\n"
						 + getTextRelationIncrease(target,actor,"enmity",2) + "\n"
						 + getTextRelationIncrease(target,actor,"rivalry",2) + "\n"
						 + getTextRelationIncrease(target,actor,"submission",2);
				gC(target).relations[actor].rivalry.stv += 100;
				gC(target).relations[actor].enmity.stv += 100;
				gC(target).relations[actor].submission.stv += 100;
			} else {
				desc = colorText("Mixed reaction: ","purple") + gC(target).getFormattedName() + " somewhat appreciates the gesture, but still won't get over being belittled.\n"
						 + getTextRelationIncrease(target,actor,"friendship",1) + "\n"
						 + getTextRelationIncrease(target,actor,"rivalry",2) + "\n"
						 + getTextRelationIncrease(target,actor,"submission",1);
				gC(target).relations[actor].rivalry.stv += 100;
				gC(target).relations[actor].friendship.stv += 50;
				gC(target).relations[actor].submission.stv += 50;
			}
			return desc;
		},
		function(actor,target) { // Effects per gained level
			gC(target).relations[actor].friendship.levelMod += 1;
			gC(target).relations[actor].submission.levelMod += 1;
			gC(target).will.multModifier += 0.05;
		},
		function(actor,target) { // Effects per lost level
			gC(target).relations[actor].friendship.levelMod -= 1;
			gC(target).relations[actor].submission.levelMod -= 1;
			gC(target).will.multModifier -= 0.05;
		},
		function(actor,target) { // Calculate level
			return baseCalculateBdPntLevel(this.tag,actor,target);
		},
		function(actor,target) { // Potentially enabled
			var flag = false;
			if ( State.variables.storyState >= storyState.firstAdventure ) {
				flag = true;
			}
			return flag;
		},
		function(actor,target) { // Is Enabled
			var flag = false;
			if ( this.calcLevel(actor,target) >= 1 ) {
				flag = true;
			}
			return flag;
		}, 1.2, // Strategic Potency
		["domination","friendship","paternalism"], // Strategic tags
		function() { // Preliminary Description
			return "Raised friendship and submission, increased will."
		}
	)
	return bdPnt;
}

// Constructors, serializers, etc.
bodyPaintingType.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

bodyPaintingType.prototype.clone = function () {
	return (new bodyPaintingType())._init(this);
};

bodyPaintingType.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new bodyPaintingType())._init($ReviveData$)', ownData);
};

// Body Paintings Database

setup.bdPntDB = [];
setup.bdPntDB["pet"] = new createBdPntPetMark();
setup.bdPntDB["slut"] = new createBdPntSlutMark();
setup.bdPntDB["honey"] = new createBdPntHoneyMark();
setup.bdPntDB["prot"] = new createBdPntProtegeeMark();

setup.bdPntTags = ["pet","slut","honey","prot"];

window.bdPntData = function(tag) {
	return setup.bdPntDB[tag];
}

