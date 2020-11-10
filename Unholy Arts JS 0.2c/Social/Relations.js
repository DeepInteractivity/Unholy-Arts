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
	
	this.processNewDay = function() {
		var f = this.stv / 100.0;
		this.stv -= f * 5; // Remove 5% of current Short Term Value
		this.ltv += f; // Add 1% of current Short Term Value
		var levelChanges = formulaRelParLevel(this);
		this.level += levelChanges;
		if ( levelChanges != 0 ) {
			return true;
		} else {
			return false;
		}
	}
};

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
	
	this.processNewDay = function() {
		var anyChanges = false;
		for ( var stat of [ "friendship" , "sexualTension" , "romance" , "domination" , "submission" , "rivalry" , "enmity" ] ) {
			if ( this[stat].processNewDay() ) {
				anyChanges = true;
			}
			this.anger = 0;
		}
		return anyChanges;
	}
};

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
		level = gC(charA).relations[charB][type].level;
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
}

	// Relatinship Types' Tooltips

window.relTypeServitudeTooltip = function() {
	var tt = "In a servitude relationship, the servant is expected to follow the orders of the master.\n"
		   + "Daily domination/submission gains.\n"
		   + "Daily merit transfer from servant to master.\n"
		   + "The master may demand the servant to follow.\n"
		   + "The master may demand the servant to assist on assault.\n"
		   + "The master may demand sex from the servant.\n"
		   + "Neither master nor servant may assault each other.\n"
		   + "The master may not challenge the servant.\n"
		   + "The servant may challenge the master to regain their freedom.\n";
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


