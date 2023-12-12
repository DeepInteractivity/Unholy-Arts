////////// BAR CLASS //////////

window.Bar = function(maxValue) {
	this.max = maxValue;
	this.current = maxValue;
	
	this.rst = 0; // Reduces the damage against this bar
	this.wkn = 0; // Increases damage against this bar
	this.tainted = 0; // Increases the cost of using this bar
	
	this.accumulatedDamage = 0;
	
};

	// Bar related functions
	
window.applyBarDamage = function(target,bar,damage) {
	var msg = "";
	var overflow = 0;
	if ( bar == "lust" ) {
		gC(target).lust.attack(damage);
	} else {
		overflow = gC(target)[bar].attack(damage);
		gC(target).lust.attack(-overflow);
	}
	if ( overflow != 0 ) {
		msg = " The damage overflowed for " + textLustDamage(overflow) + ". ";
	}
	return msg;
}
window.applyBarDamageWithoutOverflow = function(target,bar,damage) {
	var msg = "";
	var overflow = 0;
	gC(target)[bar].attack(damage);
	if ( gC(target)[bar].current < 0 ) { gC(target)[bar].current = 0; }
	return msg;
}
window.applyBarPercentualDamage = function(target,bar,percent) {
	applyBarDamage(target,bar,-(gC(target)[bar].max*percent));
}

window.getBarPercentage = function(target,bar) {
	var pr = gC(target)[bar].current / gC(target)[bar].max;
	return pr;
}

// Bar methods
Bar.prototype.calculateCost = function(baseCost) {
		var modifier = this.tainted;
		if ( modifier < 0 ) {
			modifier = 0;
		}
		return (baseCost * ( 1 + (modifier * 0.01)));
	}
Bar.prototype.applyCost = function(baseCost) {
		var modifier = this.tainted;
		if ( modifier < 0 ) {
			modifier = 0;
		}
		this.changeValue(-baseCost * ( 1 + (modifier * 0.01)));
	}

Bar.prototype.changeValue = function(change) { // Use this function whenever it is desired to add to rest to the bar's current value.
		
		var overflow = 0;
		if ( -change > this.current ) { overflow = -change - this.current; }
		
		this.current += change; // Apply changes
		if (this.current > this.max) {
			this.current = this.max;
		} else if (this.current < 0) {
			// this.current = 0 ; // Removed to allow negative overflows
		}
		
		if ( change < 0 ) { // Accumulated damage
			this.accumulatedDamage -= change;
		}
		
		return overflow;
	}

Bar.prototype.drain = function(inflictedDrainDamage,targetsCurrentBar) {
	// When draining, gained bar cannot be lower than 0, nor higher than the target's bar's current value
	var drainedAmount = Math.max(0,Math.min(inflictedDrainDamage,targetsCurrentBar));
	this.changeValue(drainedAmount);	
	return drainedAmount;
}

Bar.prototype.attack = function(change) {
		var finalChange = change * (( 1 + ( this.wkn * 0.01 ) ) / ( 1 + this.rst * 0.01 ));
		var overflow = this.changeValue(finalChange);
		return overflow;
	}
Bar.prototype.attackInConversation = function(change) {
		var finalChange = 0;
		if ( this.current >= this.max * 0.1 ) {
			finalChange = change * (( 1 + ( this.wkn * 0.01 ) ) / ( 1 + this.rst * 0.01 ));
			this.changeValue(finalChange);
			if ( this.current < this.max * 0.1 ) {
				this.current = this.max * 0.1;
			}
		}
		return finalChange;
	}

Bar.prototype.restore = function() {
		this.current = this.max;
	}
Bar.prototype.deplete = function() {
		this.current = 0;
	}
Bar.prototype.cleanDamage = function() {
		this.accumulatedDamage = 0;
	}

window.fixCharsNegativeBars = function(cK) {
	for ( var bar of ["lust","energy","willpower","socialdrive"] ) {
		if ( gC(cK)[bar].current < 0 ) {
			gC(cK)[bar].current = 0;
		}
	}
}

// Constructors, serializers, etc.
Bar.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

Bar.prototype.clone = function () {
	return (new Bar())._init(this);
};

Bar.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Bar())._init($ReviveData$)', ownData);
};

////////// STAT CLASS //////////

// State.variables.baseStats = ["physique","agility","resilience","will","intelligence","perception","empathy","charisma","luck"];
setup.baseStats = ["physique","agility","resilience","will","intelligence","perception","empathy","charisma","luck"];

window.Stat = function() {
	this.value = 10;
	this.sumModifier = 0;
	this.multModifier = 1;
	this.experience = 0;
	this.affinity = 1.0; // Rate at which experience in gained.
};

window.fixStatModifiers = function(stat) {
	if ( stat.sumModifier > -0.001 && stat.sumModifier < 0.001 ) {
		stat.sumModifier = 0;
	}
	if ( stat.multModifier > 0.999 && stat.multModifier < 1.001 ) {
		stat.multModifier = 1;
	}
}
window.fixCharacterStatModifiers = function(charKey) {
	for ( var stat of getStatNamesArray() ) {
		fixStatModifiers(gC(charKey)[stat]);
	}
}
window.getTextStatExp = function(stat) {
	var text = "Experience: ";
	if ( stat.experience >= stat.getRequiredExp() ) {
		text += colorText("" + stat.experience.toFixed(0) + " / " + stat.getRequiredExp().toFixed(0),"limegreen");
	} else {
		text += stat.experience.toFixed(0) + " / " + stat.getRequiredExp().toFixed(0);
	}
	return text;
}
window.getTextStatExpAlt = function(stat) {
	var text = "Experience: ";
	
	text += stat.experience.toFixed(0) + " / " + stat.getRequiredExp().toFixed(0);
	if ( stat.experience >= stat.getRequiredExp() ) {
		text += "(!)";
	}
	
	return text;
}
window.getTextStatAff = function(stat) {
	var text = "Affinity" + getTextWithTooltip("^^(?)^^","Stat affinities determine the rate at which they grow.\nYour initial affinities are determined through your selected boons and weaknesses, and the initial difficulty.\nThey may also change through events in the story.") + ": " + stat.affinity.toFixed(2);
	return text;
}

// Stat Methods
Stat.prototype.addExperience = function(exp) {
		this.experience += exp * this.affinity;
	}

Stat.prototype.tryLevelUp = function() {
		var flagTryLevelUp = true;
		var flagLeveledUp = false;
		var requiredExp = this.getRequiredExp();
		
		while ( flagTryLevelUp == true ) {
			if ( this.experience >= requiredExp ) {
				flagLeveledUp = true;
				this.value++;
				this.experience -= requiredExp;
				requiredExp = this.getRequiredExp();
			}
			else {
				flagTryLevelUp = false;
			}
		}
		
		return flagLeveledUp;
	}

Stat.prototype.getRequiredExp = function() { // Returns the required exp to level up this stat
		return (this.value * 100);
	}
Stat.prototype.getValue = function() { // Returns the real value after modifiers are taken into account
		var result = (this.value + this.sumModifier) * this.multModifier;
		if ( result < 0 ) { result = 0; }
		return result;
	}

// Constructors, serializers, etc.
Stat.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

Stat.prototype.clone = function () {
	return (new Stat())._init(this);
};

Stat.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Stat())._init($ReviveData$)', ownData);
};

////////// BODYPART CLASS //////////

window.Bodypart = function(key,name) {
	this.key = key;
	this.name = name;
	this.state = "free";
	this.bondage = -1; // ID of equipped bondage
};

// Bodypart methods
Bodypart.prototype.textToUI = function() {
		var text = firstToCap(this.name) + ": ";
		
		if ( this.state == "inUse" ) {
			text += "In use";
		}
		else {
			text += firstToCap(this.state);
		}
		
		if ( this.bondage != -1 ) {
			text += " (" + '<span title="' + getEquipDataById(this.bondage).description + '">' + getEquipDataById(this.bondage).name + "</span>," + gC(getEquipById(this.bondage).owner).getFormattedName() + ")"; 
		}
	
		text += "\n";
		return text;
	}

// Constructors, serializers, etc.
Bodypart.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

Bodypart.prototype.clone = function () {
	return (new Bodypart())._init(this);
};

Bodypart.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Bodypart())._init($ReviveData$)', ownData);
};

////////// DRIVE CLASS //////////
// Side of a character's personality that determines their priorities. Drives as of 0.1:
// (self)improvement, pleasure, love, cooperation, domination and ambition

window.Drive = function(initialValue, initialLevel) {
	this.value = initialValue;
	this.level = initialLevel;
};

window.setDriveValues = function(drive,newValue,newLevel) {
	drive.level = newLevel;
	drive.value = newValue;
}
window.addPointsToDrive = function(drive,points) { // Positive or negative points. It calls the must be leveled function
	drive.value += points;
	driveChecksLevelChange(drive);
}
/*
//Padmiri's views have grown more favorable to self-improvement, domination, and ambition, and less favorable to cooperation.
Claw's views have grown more favorable to domination and ambition.//
<<s----cript>>
addPointsToDrive(gC("chMir").dCooperation,-100);
addPointsToDrive(gC("chClaw").dDomination,100);

Nashillbyir's views have grown more favorable to love and ambition.
<</s----cript>> \
*/
window.driveChecksLevelChange = function(drive) {
	if ( drive.level > 0 ) {
		if ( drive.value < formulaDriveLevelPoints(drive.level) ) {
			drive.level--;
		} else if ( drive.value > formulaDriveLevelPoints(drive.level + 1 ) ) {
			drive.level++;
		}
	} else {
		if ( drive.value > formulaDriveLevelPoints(drive.level + 1) ) {
			drive.level++;
		}
	}
}

window.formulaDriveLevelPoints = function(level) { // Returns the required points to get a given drive above the asked level
	// var formula = ( level * 200 ) + ( ( level * level ) * 50 );
	var formula = ( level * 175 ) + ( ( level * level ) * 15 );
	return formula;
	// 0 , 190 , 410 , 660 , 940 , 1250 , 1590
}

// getCharsDrivePercent at character-class.js

// Constructors, serializers, etc.
Drive.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
Drive.prototype.clone = function () {
	return (new Drive())._init(this);
};
Drive.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Drive())._init($ReviveData$)', ownData);
};

////////// MERIT Aux //////////
window.getCandidatesMeritPosition = function(cK) {
	var position = 1;
	for ( var can of getCandidatesKeysArray() ) {
		if ( can != cK ) {
			if ( gC(can).merit > gC(cK).merit ) {
				position++;
			}
		}
	}
	return position;
}

////////// MOOD CLASS //////////
// Set of parameters the determines the current mood of a given character

window.Mood = function() {
	this.friendly = 0;
	this.intimate = 0;
	this.flirty = 0;
	this.aroused = 0;
	this.dominant = 0;
	this.submissive = 0;
	this.bored = 0;
	this.angry = 0;	
}

window.getCharMood = function(character,mood) {
	return State.variables[character].mood[mood];
}

// Mood methods
Mood.prototype.applyChange = function(m,value) {
		var initialM = this[m];
		this[m] += value;
		if ( this[m] < 0 ) {
			this[m] = 0;
		} else if ( this[m] > 100 ) {
			this[m] = 100;
		}
		var difference = this[m] - initialM;
		return difference;
	}

Mood.prototype.resetMood = function() {
		this.friendly = 0;
		this.intimate = 0;
		this.flirty = 0;
		this.aroused = 0;
		this.dominant = 0;
		this.submissive = 0;
		this.bored = 0;
		this.angry = 0;
	}
Mood.prototype.createHtmlGraph = function() {
		var gText = createHorizontalGraph(25,150,[["lightgreen",this.friendly],["dodgerblue",this.intimate],["rosybrown",this.flirty],
					["crimson",this.aroused],["purple",this.dominant],["violet",this.submissive],["darkgray",this.bored],["red",this.angry]],
					this.createStatsText());
		return gText;
	}
Mood.prototype.createStatsText = function() {
		var t = "Friendly: " + this.friendly.toFixed(2) + "\n";
		t	 += "Intimate: " + this.intimate.toFixed(2) + "\n";
		t	 += "Flirty: " + this.flirty.toFixed(2) + "\n";
		t 	 += "Aroused: " + this.aroused.toFixed(2) + "\n";
		t 	 += "Dominant: " + this.dominant.toFixed(2) + "\n";
		t 	 += "Submissive: " + this.submissive.toFixed(2) + "\n";
		t 	 += "Bored: " + this.bored.toFixed(2) + "\n";
		t 	 += "Angry: " + this.angry.toFixed(2);
		return t;
	}
Mood.prototype.getTwoHighestMoods = function() {
		// I know I could have made a sort, I was tired ok
		var highMoods = [];
		for ( var m of ["friendly","intimate","flirty","aroused","dominant","submissive","bored","angry"] ) {
			if ( this[m] >= 20 ) {
				highMoods.push(m);
			}
		}
		var highestV = 0; // Highest Value
		var highestM = ""; // Highest Mood
		for ( var m of highMoods ) {
			if ( this[m] > highestV ) {
				highestM = m;
				highestV = this[m];
			}
		}
		var ndHighestV = 0;
		var ndHighestM = "";
		for ( var m of highMoods ) {
			if ( m != highestM && this[m] > ndHighestV ) {
				ndHighestM = m;
				ndHighestV = this[m];
			}
		}
		var results = [];
		if ( highestM != "" ) {
			results.push(highestM);
		}
		if ( ndHighestM != "" ) {
			results.push(ndHighestM);
		}
		return results;
	}

Mood.prototype.getUiText = function() {
		var uText = "";
		var moods = this.getTwoHighestMoods();
		if ( moods.length < 1 ) {
			uText += '<span style="color:darkgray"'+'>Neutral</'+'span>';
		} else if ( moods.length < 2 ) {
			uText += '<span style="color:darkgray"'+'>' + firstToCap(moods[0]) + '</' + 'span>';
		} else {
			uText += '<span style="color:darkgray"'+'>' + firstToCap(moods[0]) + ', ' + moods[1] + '</'+'span>';
		}
		uText += "\n" + this.createHtmlGraph();
		return uText;
	}

// Constructors, serializers, etc.
Mood.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
Mood.prototype.clone = function () {
	return (new Mood())._init(this);
};
Mood.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Mood())._init($ReviveData$)', ownData);
};
 

////////// VIRGINITY CLASS //////////
// Actions that begin vaginal or anal penetrative actions make take virginity checks
// If successful, this must send a message to scene, which must display this event

window.Virginity = function(type,name,enabled,taken) {
	this.type = type; // Bodypart key
	this.name = name; // Bodypart name
	this.enabled = enabled; // True/False
	this.taken = taken; // True/False
	this.taker = "";
	this.takerName = "";
	this.method = "";
	this.ctxt = ""; // Either "forced"/"given"/"bs" // Used to generate description in menu
}

window.provokeVirginityBonusRelationship = function(actor,target) {
	var description = "";
	if ( gC(actor).relations[target] != undefined ) {
		var multiplier1 = getVirginityRelationshipMultiplier(actor,target);
		var multiplier2 = getVirginityRelationshipMultiplier(target,actor);
		var ctxt = "";
		if ( State.variables.sc.sceneType == "ss" ) {
			if ( State.variables.sc.enabledLead == "fixed" && gC(target).hasLead == false ) {
				ctxt = "forced";
				// Target -> Actor: ++Sexual tension +Submission +Romance
				gC(target).relations[actor].sexualTension.stv += 300 * multiplier2;
				gC(target).relations[actor].submission.stv += 150 * multiplier2;
				gC(target).relations[actor].romance.stv += 150 * multiplier2;
				// Actor -> Target: +Sexual tension +Domination +Romance
				gC(actor).relations[target].sexualTension.stv += 75 * multiplier1;
				gC(actor).relations[target].domination.stv += 75 * multiplier1;
				gC(actor).relations[target].romance.stv += 75 * multiplier1;
				description = gC(actor).getFormattedName() + "'s and " + gC(target).getFormattedName() + "'s sexual tension and romance and " + gC(target).getFormattedName() + "'s submission have increased.";
			} else {
				ctxt = "given";
				// Target -> Actor: +++Romance +Sexual tension
				gC(target).relations[actor].sexualTension.stv += 150 * multiplier2;
				gC(target).relations[actor].romance.stv += 450 * multiplier2;
				// Actor -> Target: ++Romance +Sexual tension
				gC(actor).relations[target].sexualTension.stv += 75 * multiplier1;
				gC(actor).relations[target].romance.stv += 150 * multiplier1;
				description = gC(actor).getFormattedName() + "'s and " + gC(target).getFormattedName() + "'s romance and sexual tension have increased.";
			}
		} else if ( State.variables.sc.sceneType == "bs" ) {
			ctxt = "bs"; 
			// Target -> Actor: +++Rivalry
			gC(target).relations[actor].rivalry.stv += 300 * multiplier2;
			// Actor -> Target: +Rivalry
			gC(actor).relations[target].sexualTension.stv += 75 * multiplier1;
			description = gC(actor).getFormattedName() + "'s and " + gC(target).getFormattedName() + "'s rivalry has increased.";
		}
	}
	return description;
}
window.provokeVirginityBonusRelationshipFixedType = function(actor,target,type) {
	var description = "";
	if ( gC(actor).relations[target] != undefined ) {
		var multiplier1 = getVirginityRelationshipMultiplier(actor,target);
		var multiplier2 = getVirginityRelationshipMultiplier(target,actor);
		var ctxt = "";
		if ( type == "forced" ) {
			ctxt = "forced";
			// Target -> Actor: ++Sexual tension +Submission +Romance
			gC(target).relations[actor].sexualTension.stv += 300 * multiplier2;
			gC(target).relations[actor].submission.stv += 150 * multiplier2;
			gC(target).relations[actor].romance.stv += 150 * multiplier2;
			// Actor -> Target: +Sexual tension +Domination +Romance
			gC(actor).relations[target].sexualTension.stv += 75 * multiplier1;
			gC(actor).relations[target].domination.stv += 75 * multiplier1;
			gC(actor).relations[target].romance.stv += 75 * multiplier1;
			description = gC(actor).getFormattedName() + "'s and " + gC(target).getFormattedName() + "'s sexual tension and romance and " + gC(target).getFormattedName() + "'s submission have increased.";
		} else if ( type == "given" ) {
			ctxt = "given";
			// Target -> Actor: +++Romance +Sexual tension
			gC(target).relations[actor].sexualTension.stv += 150 * multiplier2;
			gC(target).relations[actor].romance.stv += 450 * multiplier2;
			// Actor -> Target: ++Romance +Sexual tension
			gC(actor).relations[target].sexualTension.stv += 75 * multiplier1;
			gC(actor).relations[target].romance.stv += 150 * multiplier1;
			description = gC(actor).getFormattedName() + "'s and " + gC(target).getFormattedName() + "'s romance and sexual tension have increased.";
		} else if ( type == "bs" ) {
			ctxt = "bs"; 
			// Target -> Actor: +++Rivalry
			gC(target).relations[actor].rivalry.stv += 300 * multiplier2;
			// Actor -> Target: +Rivalry
			gC(actor).relations[target].sexualTension.stv += 75 * multiplier1;
			description = gC(actor).getFormattedName() + "'s and " + gC(target).getFormattedName() + "'s rivalry has increased.";
		}
	}
	return description;
}
window.getVirginityRelationshipMultiplier = function(actor,target) {
	var multiplier = 10 + rLvlAbt(actor,target,"friendship") + rLvlAbt(actor,target,"romance") + rLvlAbt(actor,target,"sexualTension") + rLvlAbt(actor,target,"domination") + rLvlAbt(actor,target,"submission") + rLvlAbt(actor,target,"rivalry") + rLvlAbt(actor,target,"enmity");
	multiplier *= 0.1;
	return multiplier;
}

window.checkCharsVirginityExists = function(charKey,type) {
	var flag = true;
	var virginity = gC(charKey).virginities[type];
	if ( virginity != undefined ) {
		if ( virginity.taken) {
			flag = false;
		}
	}
	return flag;
}

window.destroyCharsVirginitiesNoFlavor = function(chKey) {
	for ( var vir in gC(chKey).virginities ) {
		gC(chKey).virginities[vir].taken = true;
	}
}

// Class methods
Virginity.prototype.assignTaker = function(taker,method) {
		this.taken = true;
		this.taker = taker;
		this.method = method;
	}
Virginity.prototype.clean = function() {
		this.taken = false;
		this.taker = "";
		this.takerName = "";
		this.method = "";
	}
Virginity.prototype.tryTakeVirginity = function(taker,method,description) {
		if ( this.enabled && this.taken == false ) {
			this.taken = true;
			this.taker = taker;
			this.takerName = gC(taker).name;
			this.method = method;
			if ( State.variables.sc.sceneType == "ss" || method == "storyForced" || method == "storyGiven" ) {
				if ( (State.variables.sc.enabledLead == "fixed" && gC(taker).hasLead == true) || method == "storyForced" ) {
					this.ctxt = "forced";
				} else {
					this.ctxt = "given";
				}
			} else if ( State.variables.sc.sceneType == "bs" ) {
				this.ctxt = "bs"; 
			}
			if ( method != "storyForced" && method != "storyGiven" ) {
				State.variables.sc.importantMessages += description + "\n";
			}
		}
	}

// Constructors, serializers, etc.
Virginity.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

Virginity.prototype.clone = function () {
	return (new Virginity())._init(this);
};

Virginity.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Virginity())._init($ReviveData$)', ownData);
};

////////// POSITION CLASS //////////

window.Position = function() {
	this.key = "free";
	this.name = "Free";
	this.type = "free";
	this.description = "";
	
	this.cAction = null; // If it's a battle position, it may have a continued action
};

window.areCharactersPositionsConnected = function(charA,charB) {
	var flagAreConnected = false;
	if ( gC(charA).position.type == "active" ) {
		if ( gC(charA).position.targetsList.includes(charB) ) { flagAreConnected = true; }
	}
	else if ( gC(charA).position.type == "passive" ) {
		if ( gC(charA).position.initiator == charB ) { flagAreConnected = true; }
	}
	return flagAreConnected;
}

window.findAllConnectedCharsByPositionMinusList = function(charKey,excludedList) {
	var charList = [charKey];
	// Initiator
	var initiator = gC(charKey).position.initiator;
	if ( initiator != undefined ) {
		if ( excludedList.includes(initiator) == false && charList.includes(initiator) == false ) {
			charList = charList.concat(findAllConnectedCharsByPositionMinusList(initiator,charList));
		}
	}
	// TargetsList
	var targetsList = gC(charKey).position.targetsList;
	if ( targetsList != undefined ) {
		for ( var cK of targetsList ) {
			if ( charList.includes(cK) == false && excludedList.includes(cK) == false ) {
				charList = charList.concat(findAllConnectedCharsByPositionMinusList(cK,charList));
			}
		}
	}
	// SecondaryInitiators
	var secondaryInitiators = gC(charKey).position.secondaryInitiators;
	if ( secondaryInitiators != undefined ) {
		for ( var cK of secondaryInitiators ) {
			if ( charList.includes(cK) == false && excludedList.includes(cK) == false ) {
				charList = charList.concat(findAllConnectedCharsByPositionMinusList(cK,charList));
			}
		}
	}
	
	return charList;
}

// Position methods
Position.prototype.makeActive = function(targetsList) {
		this.type = "active";
		this.targetsList = targetsList;
	}
Position.prototype.makePassive = function(initiator) {
		this.type = "passive";
		this.initiator = initiator;
	}

Position.prototype.makePassiveSecondaryInitiators = function(initiator,secondaryInitiators) {
		this.type = "passive";
		this.initiator = initiator;
		this.secondaryInitiators = secondaryInitiators; // List
	}

Position.prototype.free = function() {
		if ( this.cAction != null ) {
			this.cAction.freeBodyparts();
			this.cAction = null;
		}
		switch(this.type) {
			case "active":
				this.key = "free";
				this.name = "Free";
				this.type = "free";
				this.description = "";
				delete this.targetsList;
				break;
			case "passive":
				this.key = "free";
				this.name = "Free";
				this.type = "free";
				this.description = "";
				delete this.initiator;
				if ( this.hasOwnProperty('secondaryInitiators') ) {
					delete this.secondaryInitiators;
				}
				break;
		}
	}

// Constructors, serializers, etc.
Position.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

Position.prototype.clone = function () {
	return (new Position())._init(this);
};

Position.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Position())._init($ReviveData$)', ownData);
};

////////// FLAVOR AFFINITIES CLASS //////////

window.flavorAffinities = function() {
	// Sex
	this.sex = new flavorAffinity("sex");
	this.pounce = new flavorAffinity("pounce");
	for ( var type of ["Dick","Pussy","Ass","Mouth","Breasts","Eyes","Legs"] ) {
		var typeA = "use" + type;
		var typeB = "target" + type;
		this[typeA] = new flavorAffinity(typeA);
		this[typeB] = new flavorAffinity(typeB);
	}
	
	this.weapon = new flavorAffinity("weapon");
	
	this.drain = new flavorAffinity("drain");
	
	// Physical
	this.physical = new flavorAffinity("physical");
	//this.kick = new flavorAffinity("kick");
	
	this.pain = new flavorAffinity("pain");
	
	// Magic
	this.magic = new flavorAffinity("magic");
	this.fire = new flavorAffinity("fire");
	this.ice = new flavorAffinity("ice");
	this.thunder = new flavorAffinity("thunder");
	this.holy = new flavorAffinity("holy");
	
	// Social
	this.social = new flavorAffinity("social");
	this.affection = new flavorAffinity("affection");
	this.seduction = new flavorAffinity("seduction");
	this.taunt = new flavorAffinity("taunt");
	this.hypnosis = new flavorAffinity("hypnosis");
	this.domination = new flavorAffinity("domination");
	
	// Others
	this.spore = new flavorAffinity("spore");
}

// Constructors, serializers, etc.
flavorAffinities.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

flavorAffinities.prototype.clone = function () {
	return (new flavorAffinities())._init(this);
};

flavorAffinities.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new flavorAffinities())._init($ReviveData$)', ownData);
};

////////// FLAVOR AFFINITY CLASS //////////

window.flavorAffinity = function(type) {
	this.type = type;
	this.strength = 0; // Scales up power of moves used
	this.frlt = 0; // Frailty: Scales down power of moves used
	this.rst = 0; // Scales down power of moves used against
	this.wkn = 0; // Weakness: Scales up power of moves used against
}

// Constructors, serializers, etc.
flavorAffinity.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

flavorAffinity.prototype.clone = function () {
	return (new flavorAffinity())._init(this);
};

flavorAffinity.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new flavorAffinity())._init($ReviveData$)', ownData);
};

////////// ALTERED STATE CLASS //////////

window.alteredState = function(title,acr,scope,turns,provokeEffect,cancelEffect,description) {
	this.title = title;
	this.type = "none";
	this.acr = acr;
	this.scope = scope; // "scene", "days" or "equipment"
	this.remainingTurns = turns;
	this.provokeEffect = provokeEffect;
	this.cancelEffect = cancelEffect;
	this.description = description;
	this.remainingDays = -1; // If something other than -1, modify outside of constructor // Am I dumb or what? Look below
	// this.turnEffect = function(character) -> Property added outside of constructor
	
	if ( scope == "days") {
		this.remainingDays = turns;
	}
	
	this.flagRemove = false;
}

window.applyAlteredState = function(charKeysList,alteredState) {
	var ckl = removeDuplicatesFromList(charKeysList);
	for ( var charKey of ckl ) {
		gC(charKey).alteredStates.push(alteredState);
		alteredState.provokeEffect(charKey);
	}
}
window.removeAlteredStateByAcr = function(charKey,acr) {
	for ( var as of gC(charKey).alteredStates ) {
		if ( as.acr == acr ) {
			as.flagRemove = true;
		}
	}
	gC(charKey).cleanStates();
}
window.removeAlteredStateByAcrAndExtra = function(charKey,acr,extraProperty,propertyValue) {
	for ( var as of gC(charKey).alteredStates ) {
		if ( as.acr == acr ) {
			if ( as.hasOwnProperty(extraProperty) ) {
				if ( as[extraProperty] == propertyValue ) {
					as.flagRemove = true;
				}
			}
		}
	}
	gC(charKey).cleanStates();
}
window.getAsTurnEffect = function(as) {
	var te = null;
	if ( as.hasOwnProperty("turnEffect") ) {
		te = as.turnEffect;
	}
	return te;
}

window.doesCharHaveAlteredState = function(charKey,acr) {
	var flag = false;
	for ( var as of gC(charKey).alteredStates ) {
		if ( as.acr == acr ) { flag = true; }
	}
	return flag;
}

// Constructors, serializers, etc.
alteredState.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

alteredState.prototype.clone = function () {
	return (new alteredState())._init(this);
};

alteredState.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new alteredState())._init($ReviveData$)', ownData);
};




