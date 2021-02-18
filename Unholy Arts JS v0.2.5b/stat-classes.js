////////// BAR CLASS //////////

window.Bar = function(maxValue) {
	this.max = maxValue;
	this.current = maxValue;
	
	this.resistance = 0; // Reduces the damage against this bar
	this.weakness = 0; // Increases damage against this bar
	this.tainted = 0; // Increases the cost of using this bar
	
	this.accumulatedDamage = 0;
	
	this.calculateCost = function(baseCost) {
		var modifier = this.tainted;
		if ( modifier < 0 ) {
			modifier = 0;
		}
		return (baseCost * ( 1 + (modifier * 0.01)));
	}
	this.applyCost = function(baseCost) {
		var modifier = this.tainted;
		if ( modifier < 0 ) {
			modifier = 0;
		}
		this.changeValue(-baseCost * ( 1 + (modifier * 0.01)));
	}
	
	this.changeValue = function(change) { // Use this function whenever it is desired to add to rest to the bar's current value.
		
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
	
	this.attack = function(change) {
		var finalChange = change * (( 1 + ( this.weakness * 0.01 ) ) / ( 1 + this.resistance * 0.01 ));
		var overflow = this.changeValue(finalChange);
		return overflow;
	}
	
	this.restore = function() {
		this.current = this.max;
	}
	this.deplete = function() {
		this.current = 0;
	}
	this.cleanDamage = function() {
		this.accumulatedDamage = 0;
	}
	
	
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

window.getBarPercentage = function(target,bar) {
	var pr = gC(target)[bar].current / gC(target)[bar].max;
	return pr;
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
	
	this.addExperience = function(exp) {
		this.experience += exp * this.affinity;
	}
	
	this.tryLevelUp = function() {
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
	
	this.getRequiredExp = function() { // Returns the required exp to level up this stat
		return (this.value * 100);
	}
	this.getValue = function() { // Returns the real value after modifiers are taken into account
		var result = (this.value + this.sumModifier) * this.multModifier;
		if ( result < 0 ) { result = 0; }
		return result;
	}
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
	
	this.textToUI = function() {
		var text = firstToCap(this.name) + ": ";
		
		if ( this.state == "inUse" ) {
			text += "In use\n";
		}
		else {
			text += firstToCap(this.state) + "\n";
		}
		
		return text;
	}
};

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
	// 0 , 250 , 600 , 1050 , 1600 , 2250
}

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
	
	this.applyChange = function(m,value) {
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
	
	this.moodDecays = function() {
		// TO DO
	}
	this.resetMood = function() {
		this.friendly = 0;
		this.intimate = 0;
		this.flirty = 0;
		this.aroused = 0;
		this.dominant = 0;
		this.submissive = 0;
		this.bored = 0;
		this.angry = 0;
	}
	this.createHtmlGraph = function() {
		var gText = createHorizontalGraph(25,150,[["lightgreen",this.friendly],["dodgerblue",this.intimate],["rosybrown",this.flirty],
					["crimson",this.aroused],["purple",this.dominant],["violet",this.submissive],["darkgray",this.bored],["red",this.angry]],
					this.createStatsText());
		return gText;
	}
	this.createStatsText = function() {
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
	this.getTwoHighestMoods = function() {
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
	
	this.getUiText = function() {
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
	
}

window.getCharMood = function(character,mood) {
	return State.variables[character].mood[mood];
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
	this.method = "";
	
	this.assignTaker = function(taker,method) {
		this.taken = true;
		this.taker = taker;
		this.method = method;
	}
	this.clean = function() {
		this.taken = false;
		this.taker = "";
		this.method = "";
	}
	this.tryTakeVirginity = function(taker,method,description) {
		if ( this.taken == false ) {
			this.taken = true;
			this.taker = taker;
			this.method = method;
			
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
	
	this.makeActive = function(targetsList) {
		this.type = "active";
		this.targetsList = targetsList;
	}
	this.makePassive = function(initiator) {
		this.type = "passive";
		this.initiator = initiator;
	}
	
	this.makePassiveSecondaryInitiators = function(initiator,secondaryInitiators) {
		this.type = "passive";
		this.initiator = initiator;
		this.secondaryInitiators = secondaryInitiators; // List
	}
	
	this.free = function() {
		if ( this.cAction != null ) {
			this.cAction.freeBodyparts();;
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
	for ( var type of ["Dick","Pussy","Ass","Mouth","Breasts","Eyes","Neck","Arms","Legs"] ) {
		var typeA = "use" + type;
		var typeB = "target" + type;
		this[typeA] = new flavorAffinity(typeA);
		this[typeB] = new flavorAffinity(typeB);
	}
	
	this.drain = new flavorAffinity("drain");
	
	// Physical
	this.physical = new flavorAffinity("physical");
	this.kick = new flavorAffinity("kick");
	
	this.pain = new flavorAffinity("pain");
	
	// Magic
	this.magic = new flavorAffinity("magic");
	this.fire = new flavorAffinity("fire");
	this.ice = new flavorAffinity("ice");
	this.thunder = new flavorAffinity("thunder");
	
	// Social
	this.social = new flavorAffinity("social");
	this.seduction = new flavorAffinity("seduction");
	this.taunt = new flavorAffinity("taunt");
	this.hypnosis = new flavorAffinity("hypnosis");
	
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
	this.frailty = 0; // Scales down power of moves used
	this.resistance = 0; // Scales down power of moves used against
	this.weakness = 0; // Scales up power of moves used against
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
	this.scope = scope;
	this.remainingTurns = turns;
	this.provokeEffect = provokeEffect;
	this.cancelEffect = cancelEffect;
	this.description = description;
	
	this.flagRemove = false;
}

window.applyAlteredState = function(charKeysList,alteredState) {
	for ( var charKey of charKeysList ) {
		gC(charKey).alteredStates.push(alteredState);
		alteredState.provokeEffect(charKey);
	}
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




