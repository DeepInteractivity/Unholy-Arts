////////// RELATIONS LIST CLASS  //////////
	// This is actually required, believe me.
window.Relations = function() {
};

// Constructors, serializers, etc.
Relations.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
Relations.prototype.clone = function () {
	return (new Relations())._init(this);
};
Relations.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Relations())._init($ReviveData$)', ownData);
};


////////// RELATION-PARAMETER CLASS  //////////
// Relation-parameter or RelPar is a dual parameter belonging to a relation

window.RelPar = function(shortTerm,longTerm) {
	this.stv = shortTerm; // Short Term Value
	this.ltv = longTerm; // Long Term Value
	this.level = 0; // Level, determined at the start of the day
	this.levelMod = 0; // Level modifier, gets summed to current level
};

RelPar.prototype.processNewDay = function(mult) {
		var f = (this.stv * mult) / 100.0;
		if ( this.stv < 0 ) { this.stv *= 0.5; } // Reduce effect of negative stv
		this.stv -= f * 5; // Remove 5% of current Short Term Value
		this.ltv += f; // Add 1% of current Short Term Value
		if ( this.ltv < 0 ) { this.ltv = 0; } // Prevent negative ltv
		var levelChanges = formulaRelParLevel(this);
		this.level += levelChanges;
		if ( levelChanges != 0 ) {
			return true;
		} else {
			return false;
		}
	}

window.formulaRelParLevel = function(RelPar) { // Returns the level of a given RelPar
	var newLevel = 0;
	var tPoints = RelPar.stv + RelPar.ltv;
	var currentLevelPoints = ( RelPar.level * 200 ) + ( ( RelPar.level * RelPar.level ) * 50 );
	if ( (tPoints < currentLevelPoints) && (RelPar.level != 0) ) {
		newLevel--;
	} else if ( tPoints > (( (RelPar.level + 1) * 200 ) + ( ( (RelPar.level + 1) * (RelPar.level + 1) ) * 50 ) ) ) {
		newLevel++;
	}

	return newLevel;
	// 0 , 250 , 600 , 1050 , 1600 , 2250
}
window.formulaRelParLevelResult = function(level) {
	var result = ( level * 200 ) + ( ( level * level ) * 50 );
	return result;
}
window.formulaRelParTotalLevel = function(RelPar) {
	var flagKeepsGrowing = true;
	var level = 0;
	
	while ( flagKeepsGrowing == true ) {
		if ( (RelPar.stv + RelPar.ltv) > formulaRelParLevelResult(level+1) ) {
			level++;
		}
		else {
			flagKeepsGrowing = false;
		}
	}
	return level;
}

// Constructors, serializers, etc.
RelPar.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
RelPar.prototype.clone = function () {
	return (new RelPar())._init(this);
};
RelPar.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new RelPar())._init($ReviveData$)', ownData);
};

////////// RELATION CLASS  //////////
// A relation is the sum of variables determining how one character feels towards another.

window.Relation = function(targetCharKey) {
	this.target = targetCharKey ; // Key of the character this relation is directed to.
	
	this.friendship = new RelPar(0,0);
	this.sexualTension = new RelPar(0,0);
	this.romance = new RelPar(0,0);
	this.domination = new RelPar(0,0);
	this.submission = new RelPar(0,0);
	this.rivalry = new RelPar(0,0);
	this.enmity = new RelPar(0,0);
	
	this.favor = 0;
	
	this.relType = null;
	
	this.anger = 0; // Anger works independently and is resetted each day. // Not implemented, may get deleted completely
};

Relation.prototype.processNewDay = function() {
		var anyChanges = false;
		for ( var stat of [ "friendship" , "sexualTension" , "romance" , "domination" , "submission" , "rivalry" , "enmity" ] ) {
			var mult = 1.0;
			var statDiff = 0;
			if ( stat == "friendship" || stat == "romance" ) {
				statDiff = (this.friendship.level + this.romance.level - this.enmity.level * 2) / 2;
			} else if ( stat == "enmity" ) {
				statDiff = - (this.friendship.level - this.romance.level + this.enmity.level * 2) / 2;
			} else if ( stat == "submission" ) {
				statDiff = this.submission.level - this.domination.level;
			} else if ( stat == "domination" ) {
				statDiff = - this.submission.level + this.domination.level;
			}
			if ( statDiff >= 9 ) { mult = 1.6; }
			else if ( statDiff >= 6 ) { mult = 1.4; }
			else if ( statDiff >= 3 ) { mult = 1.2; }
			else if ( statDiff <= -6 ) { mult = 0.8; }
			if ( this[stat].processNewDay(mult) ) {
				anyChanges = true;
			}
			this.anger = 0;
		}
		return anyChanges;
	}

window.checkAndCreateRelations = function(charList) { // This function checks every character in a given list, checks if they have relations, and
													// creates them if they don't 
	for ( var i of charList ) {
		for ( var l of charList ) {
			if ( i != l ) {
				if ( gC(i).relations[l] == undefined ) {
					gC(i).relations[i] = new Relation(l);
				}
			}
		}
	}
}

window.rLvlAbt = function(charA,charB,type) { // Returns the levels of the "type" type of relation between charA (actor) and charB (target),
		// Relation Level CharA CharB Type // if there's any
	var level = -1;
	if ( gC(charA).relations[charB] != undefined ) {
		level = gC(charA).relations[charB][type].level + gC(charA).relations[charB][type].levelMod;
	}
	return level;
}
window.rFavor = function(charA,charB) {
	// Returns the favor charA owes to charB. If none, returns the favor charB owes to charA, as a negative value.
	var favor = 0;
	if ( gC(charA).relations[charB] != undefined ) {
		favor = gC(charA).relations[charB].favor;
		if ( favor == 0 ) {
			favor = -gC(charB).relations[charA].favor;
		}
	}
	return favor;
}
window.rFormatPlayerFavor = function(character) {
	var favor = 0;
	var txt = '<span title="Favor">';
	if ( gC("chPlayerCharacter").relations[character] != undefined ) {
		favor = gC("chPlayerCharacter").relations[character].favor;
		if ( favor == 0 ) {
			favor = gC(character).relations.chPlayerCharacter.favor;
			txt += "F:" + colorText(favor.toFixed(2),"green");
		} else {
			txt += "F:" + colorText(favor.toFixed(2),"red");
		}
	}
	txt += "</span> ,"
	return txt;
}

window.getRelation = function(actor,target) {
	return gC(actor).relations[target];
}

window.initRelationshipDataAmongAllActiveCharacters = function() {
	for ( var charA of getActiveSimulationCharactersArray() ) {
		for ( var charB of getActiveSimulationCharactersArray() ) {
			if ( charA != charB ) {
				if ( getRelation(charA,charB) == undefined ) {
					gC(charA).relations[charB] = new Relation(charB);
				}
			}
		}
	}
}

// Constructors, serializers, etc.
Relation.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
Relation.prototype.clone = function () {
	return (new Relation())._init(this);
};
Relation.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Relation())._init($ReviveData$)', ownData);
};

  // Utilities

	// Relationship description
window.getRelationshipDescription = function(charA,charB) {
	var results = [(gC(charA).getFormattedName() + " is indifferent towards " + gC(charB).getFormattedName() + "."),"0",0]; // 0: Description, 1: Type, 2: Level
	
	var fr = rLvlAbt(charA,charB,"friendship");
	var ro = rLvlAbt(charA,charB,"romance");
	var se = rLvlAbt(charA,charB,"sexualTension");
	var dom = rLvlAbt(charA,charB,"domination");
	var sub = rLvlAbt(charA,charB,"submission");
	var ri = rLvlAbt(charA,charB,"rivalry");
	var en = rLvlAbt(charA,charB,"enmity");
	var intensity = 0;
	var inValue = 0;
	
	if ( fr == 0 && ro == 0 && se == 0 && dom == 0 && sub == 0 && ri == 0 && en == 0 ) {
		results = [(gC(charA).getFormattedName() + " is indifferent towards " + gC(charB).getFormattedName() + "."),"0",0];
	} else if ( (fr+ro) > (ri+en) ) { // Positive relationship
		if ( (fr+ro) > (se*1.5) ) { // Not sexually focused
			var dsBalance = (dom-sub) / (fr+ro);
			inValue = fr+ro;
			if ( inValue > 15 ) { intensity = 2; }
			else if ( inValue > 7 ) { intensity = 1; }
			if ( dsBalance >= 0.25 ) { // Domination is dominant
				if ( intensity == 0 ) { results = [(gC(charA).getFormattedName() + " thinks " + gC(charB).getFormattedName() + " is cute."),"1ab",0]; }
				else if ( intensity == 1 ) { results = [(gC(charA).getFormattedName() + " enjoys " + gC(charB).getFormattedName() + "'s company and attention."),"1ab",1]; }
				else { results = [(gC(charA).getFormattedName() + " considers " + gC(charB).getFormattedName() + " " + gC(charA).posPr + " protegee."),"1ab",2]; }
			} else if ( dsBalance <= -0.25 ) { // Submission is dominant
				if ( intensity == 0 ) { results = [(gC(charA).getFormattedName() + " looks at " + gC(charB).getFormattedName() + " with interest and respect."),"1aa",0]; }
				else if ( intensity == 1 ) { results = [(gC(charA).getFormattedName() + " has considerable trust and respect for " + gC(charB).getFormattedName() + "."),"1aa",1]; }
				else { results = [(gC(charA).getFormattedName() + " holds great trust and devotion for " + gC(charB).getFormattedName() + "."),"1aa",2]; }
			} else { // No domination
				if ( (ri*2.3) >= (fr+ro) ) { // Rivalry leaning
					if ( intensity == 0 ) { results = [(gC(charA).getFormattedName() + " is interested in " + gC(charB).getFormattedName() + "."),"1aca",0]; }
					else if ( intensity == 1 ) { results = [(gC(charA).getFormattedName() + " sees a friend and a rival in " + gC(charB).getFormattedName() + "."),"1aca",1]; }
					else { results = [(gC(charA).getFormattedName() + " is bound to " + gC(charB).getFormattedName() + " by love and rivalry."),"1aca",2]; }
				} else if ( fr > ro ) { // Friendship is dominant
					if ( intensity == 0 ) { results = [(gC(charA).getFormattedName() + " likes " + gC(charB).getFormattedName() + "."),"1acb",0]; }
					else if ( intensity == 1 ) { results = [(gC(charA).getFormattedName() + " considers " + gC(charB).getFormattedName() + " a companion."),"1acb",1]; }
					else { results = [(gC(charA).getFormattedName() + " would trust " + gC(charB).getFormattedName() + " with " + gC(charA).posPr + " life."),"1acb",2]; }
				} else { // Romance is dominant
					if ( intensity == 0 ) { results = [(gC(charA).getFormattedName() + " likes " + gC(charB).getFormattedName() + "."),"1acc",0]; }
					else if ( intensity == 1 ) { results = [(gC(charA).getFormattedName() + " is falling for " + gC(charB).getFormattedName() + "."),"1acc",1]; }
					else { results = [(gC(charA).getFormattedName() + " is deeply in love with " + gC(charB).getFormattedName() + "."),"1acc",2]; }
				}
			}
		} else { // Sexually focused
			var dsBalance = (dom-sub) / (se*1.5);
			inValue = se*1.5;
			if ( inValue > 15 ) { intensity = 2; }
			else if ( inValue > 7 ) { intensity = 1; }
			if ( dsBalance >= 0.25 ) { // Domination is dominant
				if ( intensity == 0 ) { results = [(gC(charA).getFormattedName() + " lusts after " + gC(charB).getFormattedName() + "."),"1bb",0]; }
				else if ( intensity == 1 ) { results = [(gC(charA).getFormattedName() + " wishes to ravage " + gC(charB).getFormattedName() + "."),"1bb",1]; }
				else { results = [(gC(charA).getFormattedName() + " feels complete by having " + gC(charB).getFormattedName() + " below " + gC(charA).refPr + "."),"1bb",2]; }
			} else if ( dsBalance <= -0.25 ) { // Submission is dominant
				if ( intensity == 0 ) { results = [(gC(charA).getFormattedName() + " is aroused by " + gC(charB).getFormattedName() + "."),"1ba",0]; }
				else if ( intensity == 1 ) { results = [(gC(charA).getFormattedName() + " looks up to " + gC(charB).getFormattedName() + " with respect and lust."),"1ba",1]; }
				else { results = [(gC(charA).getFormattedName() + " melts in desire and devotion for " + gC(charB).getFormattedName() + "."),"1ba",2]; }
			} else { // No domination
				if ( intensity == 0 ) { results = [(gC(charA).getFormattedName() + " lusts after " + gC(charB).getFormattedName() + "."),"1bc",0]; }
				else if ( intensity == 1 ) { results = [(gC(charA).getFormattedName() + " gets excited with " + gC(charB).getFormattedName() + "'s company."),"1bc",1]; }
				else { results = [(gC(charA).getFormattedName() + " holds great desire to have " + gC(charB).getFormattedName() + " in " + gC(charA).posPr + " arms."),"1bc",2]; }				
			}
		}
	} else { // Negative relationship
		if ( (ri+en) > (se*1.5) ) { // Not sexually focused
			var dsBalance = (dom-sub) / (ri+en);
			inValue = ri+en;
			if ( inValue > 15 ) { intensity = 2; }
			else if ( inValue > 7 ) { intensity = 1; }
			if ( dsBalance >= 0.25 ) { // Domination is dominant
				if ( intensity == 0 ) { results = [(gC(charA).getFormattedName() + " finds " + gC(charB).getFormattedName() + " annoying."),"2cb",0]; }
				else if ( intensity == 1 ) { results = [(gC(charA).getFormattedName() + " is often demeaning towards " + gC(charB).getFormattedName() + "."),"2cb",1]; }
				else { results = [(gC(charA).getFormattedName() + " is glad to have " + gC(charB).getFormattedName() + " under " + gC(charA).posPr + " foot."),"2cb",2]; }
			} else if ( dsBalance <= -0.25 ) { // Submission is dominant
				if ( intensity == 0 ) { results = [(gC(charA).getFormattedName() + " is scared of " + gC(charB).getFormattedName() + "."),"2ca",0]; }
				else if ( intensity == 1 ) { results = [(gC(charA).getFormattedName() + " is obedient towards " + gC(charB).getFormattedName() + "."),"2ca",1]; }
				else { results = [(gC(charA).getFormattedName() + " can't even think about going against " + gC(charB).getFormattedName() + "'s word."),"2ca",2]; }
			} else { // DS is not dominant
				if ( ri > en ) { // Rivalry is dominant
					if ( intensity == 0 ) { results = [(gC(charA).getFormattedName() + " is cautious about " + gC(charB).getFormattedName() + "."),"2cca",0]; }
					else if ( intensity == 1 ) { results = [(gC(charA).getFormattedName() + " is tense around " + gC(charB).getFormattedName() + "."),"2cca",1]; }
					else { results = [(gC(charA).getFormattedName() + " sees " + gC(charB).getFormattedName() + " as " + gC(charA).posPr + " nemesis."),"2cca",2]; }
				} else { // Enmity is dominant
					if ( intensity == 0 ) { results = [(gC(charA).getFormattedName() + " is annoyed about " + gC(charB).getFormattedName() + "."),"2ccb",0]; }
					else if ( intensity == 1 ) { results = [(gC(charA).getFormattedName() + " thinks " + gC(charB).getFormattedName() + " is dangerous."),"2ccb",1]; }
					else { results = [(gC(charA).getFormattedName() + " thinks " + gC(charB).getFormattedName() + " is scum."),"2ccb",2]; }					
				}
			}
		} else { // Sexually focused
			var dsBalance = (dom-sub) / (ri+en);
			inValue = ri+en;
			if ( inValue > 15 ) { intensity = 2; }
			else if ( inValue > 7 ) { intensity = 1; }
			if ( dsBalance >= 0.25 ) { // Domination is dominant
				if ( intensity == 0 ) { results = [(gC(charA).getFormattedName() + " lusts after " + gC(charB).getFormattedName() + "'s body."),"2db",0]; }
				else if ( intensity == 1 ) { results = [(gC(charA).getFormattedName() + " desire to have " + gC(charB).getFormattedName() + " under " + gC(charA).posPr + " grasp."),"2db",1]; }
				else { results = [(gC(charA).getFormattedName() + " sees an alluring toy in " + gC(charB).getFormattedName() + "."),"2db",2]; }
			} else if ( dsBalance <= 0.25 ) { // Submission is dominant
				if ( intensity == 0 ) { results = [(gC(charA).getFormattedName() + " is scared of " + gC(charB).getFormattedName() + "."),"2da",0]; }
				else if ( intensity == 1 ) { results = [(gC(charA).getFormattedName() + " thinks " + gC(charB).getFormattedName() + " is dangerous... But also thrilling."),"2da",1]; }
				else { results = [(gC(charA).getFormattedName() + " finds guilty pleasure in obeying " + gC(charB).getFormattedName() + "."),"2da",2]; }
			} else { // DS is not dominant
				if ( intensity == 0 ) { results = [(gC(charA).getFormattedName() + " dislikes lusting after " + gC(charB).getFormattedName() + "."),"2dc",0]; }
				else if ( intensity == 1 ) { results = [(gC(charA).getFormattedName() + " desires " + gC(charB).getFormattedName() + "'s body."),"2dc",1]; }
				else { results = [(gC(charA).getFormattedName() + " feels great lust for " + gC(charB).getFormattedName() + ", despite everything else."),"2dc",2]; }
			}
		}
	}
	
	return results;
}

window.getAverageRelationStatBetweenCharAndGroup = function(stat,charA,charList) { // Returns the average level of the relationship stat "stat" between the character "charA" and each character in the list "charList". Result is altered to make sure it won't be zero.
	var average = 1;
	var it = 0;
	for ( var cK of charList ) {
		if ( rLvlAbt(charA,cK,stat) != undefined ) {
			average += rLvlAbt(charA,cK,stat);
			it++;
		}
	}
	return average;
}
window.getRelationshipStatProportionBetweenCharAndGroup = function(statsA,statsB,charA,charList,flagProportional) { // Using the previous function, returns the fraction of the sum of all statsA the sum of all statsB returned by getAverageRelationStatBetweenCharAndGroup(). Result is altered to make sure it won't be zero. If flagProportional is true, statsA and statsB will be divided by the total amount of stats to be accounted for in each list
	var topAverage = 1;
	var botAverage = 1;
	var result = 0;
	var it = 0;
	for ( var st of statsA ) {
		var stAv = getAverageRelationStatBetweenCharAndGroup(st,charA,charList);
		if ( stAv != undefined ) {
			topAverage += stAv;
			if ( flagProportional ) { it++; }
		}
	}
	if ( flagProportional && it != 0 ) {
		topAverage *= 1/it;
		it = 0;
	}
	for ( var st of statsB ) {
		var stAv = getAverageRelationStatBetweenCharAndGroup(st,charA,charList);
		if ( stAv != undefined ) {
			botAverage += stAv;
			if ( flagProportional ) { it++; }
		}
	}
	if ( flagProportional && it != 0 ) {
		topAverage *= 1/it;
	}
	result = topAverage / botAverage; // Get the fraction between statsA and statsB
	return result;
}

window.getTextRelationIncrease = function(charA,charB,type,intensity) {
	// Intensity = 1/2/3/4/5
	// If type is sexual tension, it must be inputed as "sexual tension", rather than the usual variable name
	var color = "purple";
	if ( type == "friendship" ) { color = "khaki"; }
	else if ( type == "sexual tension" || type == "romance" || type == "sexualTension" ) { color = "lightcoral"; }
	else if ( type == "rivalry" || type == "enmity" ) { color = "darkred"; }
	
	var msg = gC(charA).getName() + "'s ";
	if ( type == "sexualTension" ) {
		msg += "sexual tension ";
	} else {
		msg += type + " ";
	}
	if ( type == "domination" || type == "submission" ) { msg += "towards"; }
	else { msg += " with"; }
	msg += " " + gC(charB).getName() + " has ";
	if ( intensity == 1 ) { msg += "minimally increased."; }
	else if ( intensity == 2 ) { msg += "slightly increased."; }
	else if ( intensity == 3 ) { msg += " increased."; }
	else if ( intensity == 4 ) { msg += " increased a lot."; }
	else { msg += " dramatically increased."; }
	msg = colorText(msg,color);
	return msg;
}

////////// RELATIONSHIPTYPE CLASS  //////////
// A relationship type is a specific form or relationship that follows specific rules

window.RelationshipType = function(actor,target,type,name,shortName,roleName,persistence,days,hierarchy) {
	this.actor = actor;
	this.target = target;
	this.type = type; // servitude / companionship / tutorship
	this.persistence = persistence; // temporary / continued
	this.hierarchy = hierarchy; // ega / sub / dom
	this.days = days;
	this.name = name; // How it is shown in game
	this.shortName = shortName; // How it is abreviated
	this.roleName = roleName;
	
	this.getTooltip = function() {
		return "";
	}
	
	this.dailyEffect = null; // If appliable, this is a function that gets executed daily
							 // If a function, it returns a description of the result
	
	this.forcedToFollow = false; // Has to follow target when asked, no favor exchange
	this.forcedToAssistAssault = false; // Has to assist target in assault when asked, no favor exchange
	this.forcedToSex = false; // Has to join target in sex
	
	this.disallowedAssault = false; // It's not possible to assault target
	this.disallowedChallenge = false; // It's not possible to challenge target
	this.liberationChallenge = false; // It's not possible to challenge target
	
	this.finishRelTypeExtra = function() {
		return true;
	}
	
	this.supportInfamy = 0;
}

window.gRelTypeAb = function(charA,charB) {
	var relType = null;
	var rel = gC(charA).relations[charB];
	if ( rel ) {
		relType = rel.relType;
	}
	
	return relType;
}
window.finishRelType = function(charA,charB) {
	var relType = gRelTypeAb(charA,charB);
	var description = "";
	if ( relType ) {
		gC(charA).relations[charB].relType.finishRelTypeExtra();
		gC(charB).relations[charA].relType.finishRelTypeExtra();
		description = "The " + relType.name + " relationship between " + gC(charA).name + " and " + gC(charB).name + " has finished.";
		if ( relType.hierarchy == "ega" ) {
			gC(charA).egaChars = arrayMinusA(gC(charA).egaChars,charB);
			gC(charB).egaChars = arrayMinusA(gC(charB).egaChars,charA);
		} else if ( relType.hierarchy == "dom" ) {
			gC(charA).subChars = arrayMinusA(gC(charA).subChars,charB);
			gC(charB).domChar = null;
		} else if ( relType.hierarchy == "sub" ) {
			gC(charA).domChar = null;
			gC(charB).subChars = arrayMinusA(gC(charB).subChars,charA);
		}
		gC(charA).relations[charB].relType = null;
		gC(charB).relations[charA].relType = null;
	}
	return description;
}

window.createRelTypeServitudeSub = function(actor,target,days) {
	var relType = new RelationshipType(actor,target,"servitude","servitude",colorText("Sv","violet"),"servant","temporary",days,"sub");
	relType.forcedToFollow = true;
	relType.forcedToAssistAssault = true;
	relType.forcedToSex = true;
	relType.disallowedAssault = true;
	relType.liberationChallenge = true;
	relType.dailyEffect = function() {
		var meritLoss = 1;
		var submissionGain = 50;
		gC(this.actor).changeMerit(-meritLoss);
		gC(this.actor).relations[this.target].submission.stv += submissionGain;
		
		var description = gC(this.actor).name + " has lost " + meritLoss + " merit. " + gC(this.actor).name + "'s submission towards " + gC(this.target).name + " is growing.";
		return description;
	}
	relType.getTooltip = relTypeServitudeTooltip;
	
	gC(actor).domChar = target;
	gC(actor).relations[target].relType = relType;
	
	gC(actor).relations[target].submission.levelMod += 4;
	gC(actor).relations[target].sexualTension.levelMod += 2;
	
	relType.finishRelTypeExtra = function() {
		gC(this.actor).relations[this.target].submission.levelMod -= 4;
		gC(this.actor).relations[this.target].sexualTension.levelMod -= 2;
	}
}
window.createRelTypeServitudeDom = function(actor,target,days) {
	var relType = new RelationshipType(actor,target,"servitude","servitude",colorText("Mst","purple"),"master","temporary",days,"dom");
	relType.disallowedAssault = true;
	relType.disallowedChallenge = true;
	relType.dailyEffect = function() {
		var meritGain = 1;
		var dominationGain = 50;
		gC(this.actor).changeMerit(meritGain);
		gC(this.actor).relations[this.target].domination.stv += dominationGain;
		
		var description = gC(this.actor).name + " has won " + meritGain + " merit. " + gC(this.actor).name + "'s domination towards " + gC(this.target).name + " is growing.";
		return description;
	}
	relType.getTooltip = relTypeServitudeTooltip;
	
	gC(actor).subChars.push(target);
	gC(actor).relations[target].relType = relType;
	
	gC(actor).relations[target].domination.levelMod += 4;
	gC(actor).relations[target].sexualTension.levelMod += 2;
	
	relType.finishRelTypeExtra = function() {
		gC(this.actor).relations[this.target].domination.levelMod -= 4;
		gC(this.actor).relations[this.target].sexualTension.levelMod -= 2;
	}
}

window.createRelTypeTutorshipSub = function(actor,target,days) {
	var relType = new RelationshipType(actor,target,"tutorship","tutorship",colorText("Pu","violet"),"pupil","temporary",days,"sub");
	relType.forcedToFollow = true;
	relType.forcedToAssistAssault = false;
	relType.forcedToSex = false;
	relType.disallowedAssault = true;
	relType.liberationChallenge = false;
	relType.dailyEffect = function() {
		var meritLoss = 0;
		var friendshipGain = 25;
		var submissionGain = 25;
		gC(this.actor).changeMerit(-meritLoss);
		gC(this.actor).relations[this.target].submission.stv += submissionGain;
		gC(this.actor).relations[this.target].friendship.stv += friendshipGain;
		
		var description = gC(this.actor).name + "'s submission towards " + gC(this.target).name + " is growing. " + gC(this.actor).name + "'s and " + gC(this.target).name + "'s friendship is growing.";
		return description;
	}
	relType.getTooltip = relTypeTutorshipTooltip;
	
	gC(actor).domChar = target;
	gC(actor).relations[target].relType = relType;
	
	gC(actor).relations[target].submission.levelMod += 2;
	gC(actor).relations[target].sexualTension.levelMod += 1;
	gC(actor).relations[target].friendship.levelMod += 2;
	gC(actor).relations[target].romance.levelMod += 1;
	
	relType.finishRelTypeExtra = function() {
		gC(this.actor).relations[this.target].submission.levelMod -= 2;
		gC(this.actor).relations[this.target].sexualTension.levelMod -= 1;
		gC(this.actor).relations[this.target].friendship.levelMod -= 2;
		gC(this.actor).relations[this.target].romance.levelMod -= 1;
	}
}
window.createRelTypeTutorshipDom = function(actor,target,days) {
	var relType = new RelationshipType(actor,target,"tutorship","tutorship",colorText("Tut","purple"),"tutor","temporary",days,"dom");
	relType.disallowedAssault = true;
	relType.disallowedChallenge = true;
	relType.dailyEffect = function() {
		var meritGain = 1;
		var friendshipGain = 25;
		var dominationGain = 25;
		gC(this.actor).changeMerit(meritGain);
		gC(this.actor).relations[this.target].domination.stv += dominationGain;
		gC(this.actor).relations[this.target].friendship.stv += friendshipGain;
		
		var description = gC(this.actor).name + " has won " + meritGain + " merit. " + gC(this.actor).name + "'s domination towards " + gC(this.target).name + " is growing. " + gC(this.actor).name + "'s and " + gC(this.target).name + "'s friendship is growing.";
		return description;
	}
	relType.getTooltip = relTypeTutorshipTooltip;
	
	gC(actor).subChars.push(target);
	gC(actor).relations[target].relType = relType;
	
	gC(actor).relations[target].domination.levelMod += 2;
	gC(actor).relations[target].sexualTension.levelMod += 1;
	gC(actor).relations[target].friendship.levelMod += 2;
	gC(actor).relations[target].romance.levelMod += 1;
	
	relType.finishRelTypeExtra = function() {
		gC(this.actor).relations[this.target].domination.levelMod -= 2;
		gC(this.actor).relations[this.target].sexualTension.levelMod -= 1;
		gC(this.actor).relations[this.target].friendship.levelMod -= 2;
		gC(this.actor).relations[this.target].romance.levelMod -= 1;
	}
}

window.createRelTypeCompanionship = function(actor,target,days) {
	var relType = new RelationshipType(actor,target,"companionship","companionship",colorText("Cm","green"),"companion","temporary",days,"ega");
	relType.forcedToFollow = false;
	relType.forcedToAssistAssault = true;
	relType.forcedToSex = false;
	relType.disallowedAssault = true;
	relType.disallowedChallenge = false;
	relType.liberationChallenge = false;
	relType.dailyEffect = function() {
		var friendshipGain = 25;
		var romanceGain = 25;
		gC(this.actor).relations[this.target].friendship.stv += friendshipGain;
		gC(this.actor).relations[this.target].romance.stv += romanceGain;
		
		var description = gC(this.actor).name + "'s friendship and romance towards " + gC(this.target).name + " are growing.";
		return description;
	}
	relType.getTooltip = relTypeCompanionshipTooltip;
	relType.supportInfamy = -1;
	
	gC(actor).egaChars.push(target);
	gC(actor).relations[target].relType = relType;
	
	gC(actor).relations[target].friendship.levelMod += 3;
	gC(actor).relations[target].romance.levelMod += 2;
	gC(actor).relations[target].sexualTension.levelMod += 1;
	
	relType.finishRelTypeExtra = function() {
		gC(this.actor).relations[this.target].friendship.levelMod -= 3;
		gC(this.actor).relations[this.target].romance.levelMod -= 2;
		gC(this.actor).relations[this.target].sexualTension.levelMod -= 1;
	}
}



	// Relatinship Types' Tooltips

window.relTypeServitudeTooltip = function() {
	var tt = "In a servitude relationship, the servant is expected to follow the orders of the master.\n"
		   + "Daily domination/submission gains.\n"
		   + "Flat domination/submission and sexual tension increases.\n"
		   + "Daily merit transfer from servant to master.\n"
		   + "The master may demand the servant to follow.\n"
		   + "The master may demand the servant to assist on assault.\n"
		   + "The master may demand sex from the servant.\n"
		   + "Neither master nor servant may assault each other.\n"
		   + "The master may not challenge the servant.\n"
		   + "The servant may challenge the master to regain their freedom.\n";
	return tt;
}

window.relTypeTutorshipTooltip = function() {
	var tt = "In a tutorship relationship, the pupil is expected to follow the orders of the tutor, in exchange for experience.\n"
		   + "Daily domination/submission gains. Daily friendship gains.\n"
		   + "Flat domination/submission, friendship, romance and sexual tension increases.\n"
		   + "Daily merit gain for tutor.\n"
		   + "The tutor may demand the pupil to follow.\n"
		   + "Neither tutor nor pupil may assault each other.\n"
		   + "The tutor may not challenge the pupil.\n"
		   + "When both tutor and pupil train a stat and the tutor excels at it,\nthe pupil will gain additional experience.\n";
	return tt;
}

window.relTypeCompanionshipTooltip = function() {
	var tt = "In a companionship relationship, companions are not allowed to assault each other.\n"
		   + "Daily friendship and romance gains.\n"
		   + "Flat friendship, romance and sexual tension increases.\n"
		   + "Companions may not assault each other.\n";
	return tt;
}

	// Print info functions
	
window.getRelTypeInTt = function(charA,charB) {
	// Abbreviation of charA's title in relationship with charB
	var title = "";
	var relType = gRelTypeAb(charA,charB);
	if ( relType ) {
		title = firstToCap(relType.roleName) + "\n";
	}
	return title;
}
window.getRelTypeAbr = function(charA,charB) {
	// Abbreviation of charA's title in relationship with charB
	var abr = "";
	var relType = gRelTypeAb(charA,charB);
	if ( relType ) {
		abr = '<span title="' + getRelTypeInTt(charA,charB) + relType.getTooltip() + '">' + relType.shortName + '</span>';
	}
	return abr;
}
window.getRelTypeName = function(charA,charB) {
	// charA's title in relationship with charB
	var abr = "";
	var relType = gRelTypeAb(charA,charB);
	if ( relType ) {
		abr = '<span title="' + getRelTypeInTt(charA,charB) + relType.getTooltip() + '">' + relType.roleName + '</span>';
	}
	return abr;
}
window.getRelTypeNameMayus = function(charA,charB) {
	// charA's title in relationship with charB
	var abr = "";
	var relType = gRelTypeAb(charA,charB);
	if ( relType ) {
		abr = '<span title="' + getRelTypeInTt(charA,charB) + relType.getTooltip() + '">' + firstToCap(relType.roleName) + '</span>';
	}
	return abr;
}

// Constructors, serializers, etc.
RelationshipType.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
RelationshipType.prototype.clone = function () {
	return (new RelationshipType())._init(this);
};
RelationshipType.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new RelationshipType())._init($ReviveData$)', ownData);
};


