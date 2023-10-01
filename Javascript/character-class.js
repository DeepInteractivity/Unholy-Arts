window.img = function(imageKey) {
	return State.variables.imgList[imageKey];
};

////////// CHARACTER CLASS //////////
window.Character = function(name, varName) {
	this.name = name || "noName";
	this.varName = varName || "BEWARE: THIS MUST BE DECLARED!";
	this.nameColor = "lightcyan";
	this.formattedName = '<span style="color:'+this.nameColor+'">'+this.name+'</span>';
	
	this.names = [ this.getName() , this.getName() , this.getName() ];
	
	this.type = "default";
	
	this.aiAlgorythm = 0;
	
	this.race = "human";
	
	// Currencies
	this.merit = 0;
	this.money = 0; // Veerens, silver coins
	this.infamy = 0;
	
	// Base stats
	this.physique = new Stat();
	this.agility = new Stat();
	this.resilience = new Stat();
	this.will = new Stat();
	this.intelligence = new Stat();
	this.perception = new Stat();
	this.empathy = new Stat();
	this.charisma = new Stat();
	this.luck = new Stat();
	
	// Bars
	this.lust = new Bar(100);
	this.willpower = new Bar(100);
	this.energy = new Bar(100);
	this.socialdrive = new Bar(100);
	
	// Group
	this.followingTo = "";
	this.followedBy = [];
	
	this.startedFollowingAt = []; // First element = hours, Second Element = minutes
	this.followingForDebt = false;
	
	// Lead
	this.lead = 50;
	this.leadMultiplier = 1.0;
	this.hasLead = false;
	// Position
	this.position = new Position();
	
	// Control
	this.control = 5;
	this.maxControl = 5;
	this.controlRecovery = 0.5;
	this.lostControlTurns = 0;
	
	// Combat type affinities
	this.combatAffinities = new flavorAffinities();
	
	// Altered states
	this.alteredStates = [];
	
	// Images
	this.fullPortrait = null; // If it exists, it must be returned from a function
	this.avatar = null; // If it exists, it must be returned from a function
	this.icon = function() {
		return "[img[img/charIcons/npcIcon.png]]";
	}
	
	this.fullPortraitL = null;
	this.avatarL = null;
	
	this.originalAvatar = null;
	this.originalPortrait = null;
	
	// Bodyparts list
	this.body = { 
		eyes : new Bodypart("eyes","eyes"),
		mouth : new Bodypart("mouth","mouth"),
		arms : new Bodypart("arms","arms"),
		legs : new Bodypart("legs","legs"),
		neck : new Bodypart("neck","neck")
	};

	// Drives
	this.dImprovement = new Drive(0,0);
	this.dPleasure = new Drive(0,0);
	this.dLove = new Drive(0,0);
	this.dCooperation = new Drive(0,0);
	this.dDomination = new Drive(0,0);
	this.dAmbition = new Drive(0,0);
	
	// Relations and mood
	this.relations = new Relations();
	
	this.mood = new Mood();
	this.baseMood = new Mood(); // State towards which a character's mood gravitates. 
	
	this.domChar = null; // Character that this character has a submissive relationship with
	this.subChars = []; // Characters that this character has dominant relationships with
	this.egaChars = []; // Characters that this character has egalitarian relationships with
	
	this.cbl = []; // Casus belli list: targets that actor may attack for no infamy cost
	
	// Misc. info
	this.daysWithoutSex = 0;
	this.sexScenesToday = 0;
	
	this.likedTopics = [];
	
	this.availableSocialInteractions = true; // If false, it isn't possible to begin dynamic social interactions with a given character
	
	// Virginities list
	this.virginities = {
		pussy : new Virginity("pussy","Vaginal",true,false),
		anal : new Virginity("anus","Anal",true,false),
		dick : new Virginity("dick","Penile",true,false)
	};
		
	// Orgasms
	this.orgasmCounter = 0;
	this.orgasmSceneCounter = 0;
	this.ruinedOrgasmSceneCounter = 0;
	this.mindblowingOrgasmSC = 0;
	this.conNMbOrgSC = 0; // Continued non-Mindblowing Orgasm Scene Counter -> Amount of normal orgasms since the last non-mindblowing orgasm
	
	this.turnPrefTags = [];
	
	this.koed = false; // Flag: has the character been defeated in the current battle
	
	// Known moves
	this.saList = ["doNothing","struggle"];
	
	// Known extra social actions
	this.extraSocIntList = [];
	
	// Others
	this.getRandomName = function() {
		return randomFromList(this.names);
	}
	this.getFRName = function() { // Formatted Random Name '<span style="color:'+this.nameColor+'">'+this.name+'</span>';
		var formattedName = '<span style="color:' + this.nameColor + '">'
						  + ftc(this.getRandomName()) + '</span>';
		return formattedName;
	}
	this.stdName = function() { // Standard Name, refers to the currently considered standard method of dynamically refering to a character.
		return this.getFRName();
	}
	
	this.setNameColor = function(colorKey) {
		this.nameColor = colorKey;
		this.formattedName = '<span style="color:'+this.nameColor+'">'+this.name+'</span>';
	}
	
	this.speechColor = "lavenderblush";
	this.colorStyleKey = 'color: '+this.speechColor;
	
	// this.turnTags = []; // Added and gotten by functions, see below Character class. These are labels that only last for the duration of a scene turn
	
	// Personality
	this.tastes = createPreferencesWeightedList();
	
		// Pronouns
	this.perPr = "it"; // Personal pronoun
	this.comPr = "it"; // Personal pronoun as complement
	this.refPr = "itself"; // Reflexive pronoun
	this.posPr = "its"; // Possessive pronoun
	this.inPosPr = "its"; // Independent Possessive

	// Maps
	this.currentRoom = ""; // Key refering to the room the character is currently placed at. If no map is active, this should be equal to "".
	
	this.refugeRooms = []; // List of 2-element arrays. First element is map key, second element is room key.
	this.getRefugeRoomInMap = function() {
		var room = "none";
		var cMapName = State.variables.compass.currentMap;
		for ( var rr of this.refugeRooms ) {
			if ( rr[0] == cMapName ) {
				room = rr[1];
			}
		}
		return room;
	}
	
	// Scrolls
	this.foundScrolls = [];
	this.studiedScrolls = [];
	
	this.studiedScrollToday = false;
	
	// Equipment
	this.ownedEquipment = []; // List of owned equipment's IDs.
	this.weaponID = -1; // ID of equipped weapon.
	
	// AI
	this.mapAi = new NpcMapAi(this.varName);
	this.sisAi = new NpcSisAi(this.varName);
	this.globalAi = new NpcGlobalAi(this.varName);
	this.socialAi = new NpcSocialAi(this.varName);
	
	// System
	this.wasPromptedInCurrentSisRound = false;
};

// More character methods
Character.prototype.getName = function() { return this.name; };
Character.prototype.getFormattedName = function() { return this.formattedName; };
Character.prototype.changeMerit = function(value) {
		this.merit += value;
		if ( this.merit < 0 ) {
			this.merit = 0;
		}
	}
Character.prototype.changeInfamy = function(value) {
		this.infamy += value;
		if ( this.infamy < 0 ) {
			this.infamy = 0;
		}
	}

Character.prototype.cleanStates = function() {
		var newAlteredStates = [];
		for ( var as of this.alteredStates ) {
			if ( as.flagRemove == false ) {
				newAlteredStates.push(as);
			} else {
				as.cancelEffect(this.varName);
			}
		}
		this.alteredStates = newAlteredStates;
	}
Character.prototype.removeSpecificState = function(stateAcr) {
	var anyStateRemoved = false; // The function returns true if any altered state gets finished.
	var newAlteredStates = [];
	for ( var as of this.alteredStates ) {
		if ( as.acr != stateAcr ) {
			newAlteredStates.push(as);
		} else {
			as.cancelEffect(this.varName);
			anyStateRemoved = true;
		}
	}
	this.alteredStates = newAlteredStates;
	return anyStateRemoved;
}
window.doesCharHaveState = function(cK,stateAcr) {
	var hasState = false;
	for ( var as of gC(cK).alteredStates ) {
		if ( as.acr == stateAcr ) {
			hasState = true;
		}
	}
	return hasState;
}
window.returnIntensityOfAlteredState = function(cK,stateAcr) {
	var intensity = -1;
	for ( var as of gC(cK).alteredStates ) {
		if ( as.acr == stateAcr ) {
			intensity = as.intensity;
		}
	}
	return intensity;
}

Character.prototype.addBodypart = function(key,name) {
		this.body[key] = new Bodypart(key,name);
	}
Character.prototype.removeBodypart = function(key) {
		delete this.body[key];
	}
Character.prototype.addFemaleParts = function() {
		this.addBodypart("breasts","breasts");
		this.addBodypart("pussy","pussy");
		this.addBodypart("anus","anus");
	}
Character.prototype.addMaleParts = function() {
		this.addBodypart("dick","dick");
		this.addBodypart("anus","anus");
	}
	
Character.prototype.hasFreeBodypart = function(part) {
		var flag = false;
		
		if ( this.body.hasOwnProperty(part) ) {
			if ( this.body[part].state == "free" ) {
				flag = true;
			}
		}
		
		return flag;
	}
	
Character.prototype.lockBodypart = function(part) {
		if ( this.body.hasOwnProperty(part) ) {
			if ( this.body[part].state == "free" ) {
				this.body[part].state = "locked";
			}
		}
	}
Character.prototype.freeBodypart = function(part) {
		if ( this.body.hasOwnProperty(part) ) {
			if ( this.body[part].state == "locked" ) {
				this.body[part].state = "free";
			}
		}
	}
	
Character.prototype.applyRelationVector = function(target,relationVector) {
		// Applies the values of a relation vector as changes to the character's relation with the target
		this.relations[target].friendship.stv += relationVector.friendship;
		this.relations[target].sexualTension.stv += relationVector.sexualTension;
		this.relations[target].romance.stv += relationVector.romance;
		this.relations[target].domination.stv += relationVector.domination;
		this.relations[target].submission.stv += relationVector.submission;
		this.relations[target].rivalry.stv += relationVector.rivalry;
		this.relations[target].enmity.stv += relationVector.enmity;
		
		return relationVector;
	}
Character.prototype.applyMoodVector = function(moodVector) {
		// Applies the values of a mood vector as changes to the character's mood
		// Real changes to the mod are returned
		var realChanges = new MoodVector(0,0,0,0,0,0,0,0);
		
		realChanges.friendly = this.mood.applyChange("friendly",moodVector.friendly);
		realChanges.intimate = this.mood.applyChange("intimate",moodVector.intimate);
		realChanges.flirty = this.mood.applyChange("flirty",moodVector.flirty);
		realChanges.aroused = this.mood.applyChange("aroused",moodVector.aroused);
		realChanges.dominant = this.mood.applyChange("dominant",moodVector.dominant);
		realChanges.submissive = this.mood.applyChange("submissive",moodVector.submissive);
		realChanges.bored = this.mood.applyChange("bored",moodVector.bored);
		realChanges.angry = this.mood.applyChange("angry",moodVector.angry);
		
		return realChanges;
	}
Character.prototype.applyMoodyMoodVector = function(moodVector) {
		// Applies the values of a mood vector as changes to the character's mood
		// Real changes to the mod are returned
		// With this function, the target's anger reduces some mood effects, and friendliness and intimacy reduce anger
		var realChanges = new MoodVector(0,0,0,0,0,0,0,0);
		var moodyMoodVector = new MoodVector( (moodVector.friendly * (200 - this.mood.angry - this.mood.bored) * 0.005) ,
		(moodVector.intimate * (200 - this.mood.angry - this.mood.bored) * 0.005) , (moodVector.flirty * (200 - this.mood.angry - this.mood.bored) * 0.005) ,
		(moodVector.aroused * (200 - this.mood.angry - this.mood.bored) * 0.005), moodVector.dominant , moodVector.submissive , moodVector.bored ,
		(moodVector.angry * (200 - this.mood.friendly - this.mood.intimate) * 0.005) );
		
		realChanges.friendly = this.mood.applyChange("friendly",moodyMoodVector.friendly);
		realChanges.intimate = this.mood.applyChange("intimate",moodyMoodVector.intimate);
		realChanges.flirty = this.mood.applyChange("flirty",moodyMoodVector.flirty);
		realChanges.aroused = this.mood.applyChange("aroused",moodyMoodVector.aroused);
		realChanges.dominant = this.mood.applyChange("dominant",moodyMoodVector.dominant);
		realChanges.submissive = this.mood.applyChange("submissive",moodyMoodVector.submissive);
		realChanges.bored = this.mood.applyChange("bored",moodyMoodVector.bored);
		realChanges.angry = this.mood.applyChange("angry",moodyMoodVector.angry);
		
		return realChanges;
	}
Character.prototype.restoreMood = function() {
		this.mood.friendly = this.baseMood.friendly;
		this.mood.intimate = this.baseMood.intimate;
		this.mood.flirty = this.baseMood.flirty;
		this.mood.aroused = this.baseMood.aroused;
		this.mood.dominant = this.baseMood.dominant;
		this.mood.submissive = this.baseMood.submissive;
		this.mood.bored = this.baseMood.bored;
		this.mood.angry = this.baseMood.angry;
	}
Character.prototype.applyMoodDecay = function() {
		var decayMult = 0.02;
		this.mood.friendly -= (this.mood.friendly - this.baseMood.friendly) * decayMult;
		this.mood.intimate -= (this.mood.intimate - this.baseMood.intimate) * decayMult;
		this.mood.flirty -= (this.mood.flirty - this.baseMood.flirty) * decayMult;
		this.mood.aroused -= (this.mood.aroused - this.baseMood.aroused) * decayMult;
		this.mood.dominant -= (this.mood.dominant - this.baseMood.dominant) * decayMult;
		this.mood.submissive -= (this.mood.submissive - this.baseMood.submissive) * decayMult;
		this.mood.bored -= (this.mood.bored - this.baseMood.bored) * decayMult;
		this.mood.angry -= (this.mood.angry - this.baseMood.angry) * decayMult;
	}
	
Character.prototype.getIsAvailableForSocialInteractions = function(initiator) {
		var flagAvailable = this.availableSocialInteractions;
		if ( this.followingTo != "" && this.followingTo != initiator ) {
			if ( State.variables.compass.findFirstSisIdInvolvingCharacter(this.varName) == -1 ) {
				flagAvailable = false;
			}
		}
		return flagAvailable;
	}
	
Character.prototype.makeVirginitiesUnknown = function() {
		for ( var virginity in this.virginities ) {
			this.virginities[virginity].taken = true;
			this.virginities[virginity].taker = "unknown";
			this.virginities[virginity].method = "unknown";
		}
	}

Character.prototype.setSpeechColor = function(colorKey) {					// SET SPEECH COLOR
		this.speechColor = colorKey;
		this.colorStyleKey = 'color: '+this.speechColor;
	}
	
Character.prototype.setColors = function(nameColor,speechColor) {
		this.setNameColor(nameColor);
		this.setSpeechColor(speechColor);
	}
	
Character.prototype.setBaseAttributes = function(ph,ag,re,wi,nt,pe,em,ch,lu) {
		this.physique.value = ph;
		this.agility.value = ag;
		this.resilience.value = re;
		this.will.value = wi;
		this.intelligence.value = nt;
		this.perception.value = pe;
		this.empathy.value = em;
		this.charisma.value = ch;
		this.luck.value = lu;
	}
Character.prototype.setAffinities = function(ph,ag,re,wi,nt,pe,em,ch,lu) {
		this.physique.affinity = ph;
		this.agility.affinity = ag;
		this.resilience.affinity = re;
		this.will.affinity = wi;
		this.intelligence.affinity = nt;
		this.perception.affinity = pe;
		this.empathy.affinity = em;
		this.charisma.affinity = ch;
		this.luck.affinity = lu;
	}
Character.prototype.adjustAttributes = function(statVariance,statBuff) {
	for ( var st of getStatNamesArray() ) {
		this[st].value += limitedRandomInt(statVariance) + statBuff;
	}
}
Character.prototype.statsDifficultyAdjustments = function(difficultyVariance) {
	// Stats will be increased or decreased from their initial values depending on the distance of the current difficulty with normal
	var vMult = 0; // Variance multiplier
	if ( gSettings().difficulty == "easy" ) {
		vMult = -1;
	} else if ( gSettings().difficulty == "hard" ) {
		vMult = 1;
	}
	for ( var st of setup.baseStats ) {
		this[st].value += (difficultyVariance * vMult);
	}
}

Character.prototype.cleanAccumulatedDamages = function() {
		this.lust.cleanDamage();
		this.willpower.cleanDamage();
	}
	
Character.prototype.tryOrgasm = function() {
		var overflow = -1;
		var type = "none";
		if ( this.lust.current <= 0 ) {
			overflow = -this.lust.current;
			this.orgasmCounter++;
			if ( isCharsOrgasmRuined(this.varName) == false ) { 
				if ( isOrgasmMindblowing(this.varName) ) {		// Mindblowing
					this.mindblowingOrgasmSC++;
					this.lust.current = this.lust.max;
					this.willpower.changeValue(-this.willpower.max * 0.2);
					type = "mindblowing";
					this.conNMbOrgSC = 0;
				} else {										// Normal orgasm
					this.orgasmSceneCounter++;
					this.lust.current = this.lust.max;
					type = "normal";
					this.conNMbOrgSC++;
				}
			} else { 											// Ruined orgasm
				this.ruinedOrgasmSceneCounter++;
				this.lust.current = this.lust.max * 0.80;
				this.energy.changeValue(-this.energy.max * 0.1);
				this.willpower.changeValue(-this.willpower.max * 0.1);
				this.socialdrive.changeValue(-this.socialdrive.max * 0.1);
				type = "ruined";
				if ( limitedRandomInt(100) > 30 ) {
					this.tastes.denial.w += limitedRandomInt(4);
				}
			}
		}
		
		return [overflow,type];
	}
Character.prototype.getAllSceneOrgasms = function() {
	var orgasms = this.orgasmSceneCounter + this.ruinedOrgasmSceneCounter + this.mindblowingOrgasmSC;
	return orgasms;
}
Character.prototype.influenceSexPrefs = function(probability,intensity) {
	for ( var tag of this.turnPrefTags ) {
		if ( probability > limitedRandomInt(100) ) {
			this.tastes[tag].w += intensity;
		}
	}
}
		
	// Text message functions
	
Character.prototype.textBars = function() { // Bars
		var text = "";
		if ( this.koed ) {
			text += colorText("KO","darkgray") + "\n";
		} else {
			// Lead
			if ( State.variables.sc.enabledLead == "dynamic" ) {
				if ( doesCharHaveSceneTag(this.varName,"noLead") ) {
					text += '<span style="color:darkgray">Lead disabled\n</span>'
				} else {
					text += this.textLeadBar() + "\n";
				}
			}
			else if ( State.variables.sc.enabledLead == "fixed" && this.hasLead == true ) {
				text += '<span style="color:darkgray"'+'>Leading</'+'span>'+'\n';
			}
			
			// Control
			if ( State.variables.sc.flagSceneActive && State.variables.sc.sceneType == "bs" ) {
				text += this.textControlBar() + "\n";
			}

			// Altered States
			if ( this.alteredStates.length > 0 ) {
				text += this.textAlteredStates() + "\n";
			}
			
			// Position
			if ( this.position.key != "free" ) {
				text += '<span style="color:darkgray"'+'>' + this.position.name + '</'+'span>'+'\n';
			}
		}
		// Lust
		text += img("lust") + ' <span style="color:lightcoral">Lust:</span>';
		if ( this.lust.current == this.lust.max ) {
		text += this.lust.current.toFixed(0); } else {
		text += this.lust.current.toFixed(2); }
		text += "/" + this.lust.max.toFixed(0) + "\n";
		// Willpower
		text += img("willpower") + ' <span style="color:darkslateblue">Willpower:</span>';
		if ( this.willpower.current == this.willpower.max ) {
		text += this.willpower.current.toFixed(0); } else {
		text += this.willpower.current.toFixed(2); }
		text += "/" + this.willpower.max.toFixed(0) + "\n";
		// Energy
		text += img("energy") + ' <span style="color:limegreen">Energy:</span>';
		if ( this.energy.current == this.energy.max ) {
		text += this.energy.current.toFixed(0); } else {
		text += this.energy.current.toFixed(2); }
		text += "/" + this.energy.max.toFixed(0) + "\n";
		// Social Drive
		text += img("socialdrive") + ' <span style="color:khaki">Social Drive:</span>';
		if ( this.socialdrive.current == this.socialdrive.max ) {
		text += this.socialdrive.current.toFixed(0); } else {
		text += this.socialdrive.current.toFixed(2); }
		text += "/" + this.socialdrive.max.toFixed(0) + "\n";
		return text;
	}

Character.prototype.textStats = function() {
		var text = "";
		var descriptions = [ getPhysiqueDescription() , getAgilityDescription() , getResilienceDescription() , getWillDescription() , getIntelligenceDescription() , getPerceptionDescription() , getEmpathyDescription() , getCharismaDescription() , getLuckDescription() ];
		var i = 0;
		for ( var cStat of getStatNamesArray() ) {
			var statName = '<span title="' + descriptions[i] + '">' + firstToCap(cStat) + "</span>";
			if ( this[cStat].getValue() < this[cStat].value ) {
				text += statName + ": " + colorText(this[cStat].getValue().toFixed(1),"red") + " (" + this[cStat].value.toFixed(0) + ")";
			} else if ( this[cStat].getValue() > this[cStat].value ) {
				text += statName + ": " + colorText(this[cStat].getValue().toFixed(1),"green") + " (" + this[cStat].value.toFixed(0) + ")";
			} else {
				text += statName + ": " + this[cStat].getValue().toFixed(0);
			}
			if ( cStat != "luck" ) {
				text += "\n";
			}
			i++;
		}
		return text;
	}
Character.prototype.textLeadBar = function() {
		var text = '<span style="color:darkgray">Lead: </span>' + this.lead.toFixed(2) + " / 100";
		if ( this.hasLead == true ) {
			text += '<span style=' + '"color:darkgray"' + '> Leading</span>';
		}
		return text;
	}
Character.prototype.textControlBar = function() {
		var text = '<span style="color:darkgray">Control: </span>';
		if ( this.control == this.maxControl ) {
			text += this.control + "/" + this.maxControl;
		} else {
			text += this.control.toFixed(2) + "/" + this.maxControl;
			if ( this.control <= 0 ) {
				if ( this.position.type != "passive" ) {
					text += " TR: " + this.lostControlTurns;
				} else {
					text += " Locked";
				}
			}
		}

		return text;
	}
Character.prototype.textAlteredStates = function() {
		var text = '<span style="color:darkgray">';
		var i = 0;
		var bpAs = null;
		for ( var as of this.alteredStates ) {
			if ( i > 0 ) { text += ", "; }
			if ( as.acr != "BdPt" ) {
				var tooltip = as.title + ": " + as.description; // + "\nRemaining turns: " + as.remainingTurns;
				if ( as.hasOwnProperty("tag") ) {
					if ( as.hasOwnProperty("intensity") ) {
						tooltip += "\nIntensity: " + (as.intensity * 10).toFixed(1);
					}
				}
				if ( as.scope == "scene" ) {
					tooltip += "\nRemaining turns: " + as.remainingTurns.toFixed(1);
				} else if ( as.scope == "days" ) {
					tooltip += "\nRemaining days: " + as.remainingDays.toFixed(1);
				}
				var asText = "<span title='" + tooltip + "'>" + as.acr + "</" + "span>";
			} else {
				asText = getTextWithTooltipAlt("BdPt",("Body Painting: " + bdPntData(as.tag).name + "\n"
								 + bdPntData(as.tag).getDescription(as.actor,as.target)
								 + "\nLevel: " + as.level + "\nResistance: " + as.resistance) + "\nDrawn by: " + gC(as.actor).getName());
			}
			text += asText;
			i++;
		}
		text += '</span>';
		return text;
	}

Character.prototype.textLustBar = function() {
		var imgLust = img("lust");
		return ( imgLust + ' <span style="color:lightcoral">Lust: </span>' + this.lust.current.toFixed(2) + "/" + this.lust.max.toFixed(0) );
	}
	
Character.prototype.lustBarText = function() {
		var imgLust = img("lust");
		return ( imgLust + ' <span style="color:lightcoral">Lust: </span>' + this.lust.current.toFixed(2) + "/" + this.lust.max.toFixed(0) );
	}
Character.prototype.textWillpowerBar = function() {
		return ( img("willpower") + ' <span style="color:darkslateblue">Willpower: </span>' + this.willpower.current.toFixed(2) + "/" + this.willpower.max.toFixed(0) );
	}
Character.prototype.willpowerBarText = function() {
		return ( img("willpower") + ' <span style="color:darkslateblue">Willpower: </span>' + this.willpower.current.toFixed(2) + "/" + this.willpower.max.toFixed(0) );
	}
	
Character.prototype.textAccumulatedDamages = function() { // Accumulated Damage
		var text = this.name + ": ";
		if ( this.lust.accumulatedDamage > 0 ) {
			text += "Lust: " + this.lust.accumulatedDamage.toFixed(2) + ", ";
		}
		if ( this.willpower.accumulatedDamage > 0 ) {
			text += "Willpower: " + this.willpower.accumulatedDamage.toFixed(2) + ", ";
		}
		text += ";";
		return text;
	}
	
Character.prototype.textBodyparts = function() { // Bodyparts
		var text = "";
		
		var bpList = ["pussy","dick","anus","breasts","mouth","eyes","neck","arms","legs","tail"];
		for ( var part of bpList ) {
			if ( this.body.hasOwnProperty(part) ) {
				text += this.body[part].textToUI();
			}
		}
		
		return text;
	}
	
Character.prototype.textRelationshipWithPlayer = function() {
	var text = "";
	if ( this.varName != "chPlayerCharacter" ) {
		if ( this.relations["chPlayerCharacter"] != undefined && gC("chPlayerCharacter").relations[this.varName] != undefined ) {
			text += "\n\n__Relationship towards/by the player__\n";
			text += rLvlAbt(this.varName,"chPlayerCharacter","friendship") + " / Friendship / " + rLvlAbt("chPlayerCharacter",this.varName,"friendship") + "\n"
				  + rLvlAbt(this.varName,"chPlayerCharacter","sexualTension") + " / Sexual Tension / " + rLvlAbt("chPlayerCharacter",this.varName,"sexualTension") + "\n"
				  + rLvlAbt(this.varName,"chPlayerCharacter","romance") + " / Romance / " + rLvlAbt("chPlayerCharacter",this.varName,"romance") + "\n"
				  + rLvlAbt(this.varName,"chPlayerCharacter","domination") + " / Domination / " + rLvlAbt("chPlayerCharacter",this.varName,"domination") + "\n"
				  + rLvlAbt(this.varName,"chPlayerCharacter","submission") + " / Submission / " + rLvlAbt("chPlayerCharacter",this.varName,"submission") + "\n"
				  + rLvlAbt(this.varName,"chPlayerCharacter","rivalry") + " / Rivalry / " + rLvlAbt("chPlayerCharacter",this.varName,"rivalry") + "\n"
				  + rLvlAbt(this.varName,"chPlayerCharacter","enmity") + " / Enmity / " + rLvlAbt("chPlayerCharacter",this.varName,"enmity")
		}
	}
	return text;
}

Character.prototype.textSpecialRelationships = function() {
	var text = "";
	var character = this.varName;
		if ( gC(character).domChar ) {
			text += "Submissive relationship:\n"
					  + gC(gC(character).domChar).getFormattedName() + ": " + getRelTypeNameMayus(gC(character).domChar,character);
					  if ( gRelTypeAb(gC(character).domChar,character).persistence == "temporary" ) {
						  text += " | Days remaining: " + gRelTypeAb(gC(character).domChar,character).days;
					  }
		}
		if ( gC(character).subChars.length > 0 ) {
			text += "Dominant relationships: ";
			for ( var sChar of gC(character).subChars ) {
				text += "\n" + gC(sChar).getFormattedName() + ": " + getRelTypeNameMayus(sChar,character);
					  if ( gRelTypeAb(sChar,character).persistence == "temporary" ) {
						  text += " | Days remaining: " + gRelTypeAb(sChar,character).days;
					  }
			}
		}
		if ( gC(character).egaChars.length > 0 ) {
			if ( text != "" ) { text += "\n"; }
			text += "Egalitarian relationships: ";
			for ( var eChar of gC(character).egaChars ) {
				text += "\n" + gC(eChar).getFormattedName() + ": " + getRelTypeNameMayus(eChar,character);
					  if ( gRelTypeAb(eChar,character).persistence == "temporary" ) {
						  text += " | Days remaining: " + gRelTypeAb(eChar,character).days;
					  }
			}
		}
	return text;
}

Character.prototype.textIntimacyTowardsPlayer = function() {
	var intimaciesText = "";
	var absInt = getCharsAbsoluteIntimacy(this.varName,"chPlayerCharacter");
	var relInt = getCharsRelativeIntimacy(this.varName,"chPlayerCharacter");
	if ( absInt != 0 || relInt != 0 ) {
		intimaciesText = "Intimacy towards player: " + relInt + "\nRelationship type intimacy: " + absInt;
	}
	return intimaciesText;
}
	
	// Pronouns
Character.prototype.assignFemeninePronouns = function() {
		this.perPr = "she";
		this.comPr = "her";
		this.refPr = "herself";
		this.posPr = "her";
		this.inPosPr = "hers";
	}
Character.prototype.assignMasculinePronouns = function() {
		this.perPr = "he";
		this.comPr = "him";
		this.refPr = "himself";
		this.posPr = "his";
		this.inPosPr = "his";
	}
Character.prototype.assignNbPronouns = function() {
		this.perPr = "they";
		this.comPr = "them";
		this.refPr = "themself";
		this.posPr = "their";
		this.inPosPr = "theirs";
	}
Character.prototype.assignItPronouns = function() {
		this.perPr = "it";
		this.comPr = "it";
		this.refPr = "itself";
		this.posPr = "its";
		this.inPosPr = "its";
	}
Character.prototype.getDiminutive = function() { return randomFromList(["girl"]); };
	
	// Management
Character.prototype.restoreBars = function() {						// RESTORE BARS FUNC
		this.lust.restore();
		this.willpower.restore();
		this.energy.restore();
		this.socialdrive.restore();
	}
	
Character.prototype.cleanLead = function() {
		this.lead = 50;
		this.hasLead = false;
	}
	
Character.prototype.sortSaList = function() {
		var sortedList = ["doNothing"];
		
		// Add single use actions
		for ( var sa of this.saList ) {
			if ( setup.saList[sa].tags.includes("sUse") ) {
				if ( sortedList.includes(sa) == false ) {
					sortedList.push(sa);
				}
			}
		}
		
		// Add continued actions
		for ( var sa of this.saList ) {
			if ( setup.saList[sa].tags.includes("cAct") ) {
				if ( sortedList.includes(sa) == false ) {
					sortedList.push(sa);
				}
			}
		}
		
		// Add positional actions
		for ( var sa of this.saList ) {
			if ( setup.saList[sa].tags.includes("pos") ) {
				if ( sortedList.includes(sa) == false ) {
					sortedList.push(sa);
				}
			}
		}
		
		// Add composite positional actions
		for ( var sa of this.saList ) {
			if ( setup.saList[sa].tags.includes("cpos") ) {
				if ( sortedList.includes(sa) == false ) {
					sortedList.push(sa);
				}
			}
		}
		
		// Add pounce actions
		for ( var sa of this.saList ) {
			if ( setup.saList[sa].tags.includes("bPos") ) {
				if ( sortedList.includes(sa) == false ) {
					sortedList.push(sa);
				}
			}
		}
		
		// Replace char.saList
		this.saList = sortedList;
	}

	// Character stats screen view
Character.prototype.avatar = function() {
	var avStr = "";
	if ( this.avatarL != null ) {
		return ("[img[" + this.avatarL + "]]");
	} else {
		return "";
	}
}
window.gCavatar = function(cK) {
	var avStr = "";
	if ( gC(cK).avatarL != null ) {
		return ("[img[" + gC(cK).avatarL + "]]");
	} else {
		return "";
	}
}

Character.prototype.getCharacterUIbarInfo = function() { // Returns a string that generates the character's basic info when displayed on Sugarcube 2
		var string = "<div align='center'>\ " + generateTitledName(this.varName) + " (" + this.getCharScreenButton("Status") + ")\n";
		if ( this.avatarL != null ) {
			string += gCavatar(this.varName) + "\n";
		}
		string += "</div> \ ";
		string += this.textBars() + "\n";
		return string;
	}
Character.prototype.getCharacterScreenInfo = function() { // Returns a string that generates the character's stats screen when displayed on Sugarcube 2
		var string = "__" + this.formattedName + "__\n";
		
		string += this.textBars();
		if ( gSettings().challengingAllowed || gSettings().assaultingAllowed ) {
			string += "Merit" + getMeritTooltip() + ": " + this.merit;
			string += " | Infamy" + getInfamyTooltip() + ": " + this.infamy + "/" + State.variables.settings.infamyLimit;
			if ( this.varName == "chPlayerCharacter" ) {
				string += " | Money: " + this.money.toFixed(0);
			}
			string += "\n";
		}
		string += "\n";
		string += this.textStats() + "\n";
		string += "\n";
		
		string += "__Bodyparts__:\n";
		string += this.textBodyparts() + "\n";
		string += textEquipment(this.varName);
		if ( isStVarOn("HdRlts") == false ) {
			string += this.textRelationshipWithPlayer();
		}
		if ( this.varName != "chPlayerCharacter" ) {
			var intimaciesText = this.textIntimacyTowardsPlayer();
			if ( intimaciesText != "" ) {
				string += "\n" + intimaciesText;
			}
		}
		
		var spRelsString = this.textSpecialRelationships();
		if ( spRelsString != "" ) {
			string += "\n\n__Special Relationships__:\n" + spRelsString;
		}
		
		return string;
	}
	
Character.prototype.getCharScreenButton = function(handler) {
		var text = '<<click "' + handler + '">>'
				   + '<<' + 'script>>'
				   + 'State.variables.charScreenFocus = "' + this.varName + '"; '
				   + 'var dialog = Dialog.setup("Status", "my-dialog-class");'
				   + 'new Wikifier(dialog, Story.get("' + 'Character Info Dialog Box'  + '").processText());'
				   + 'Dialog.open();'
				   + '<<' + '/script>>'
				   + '<</click>>';
		return text;
	}

	
// Previously at character class

// Stats and bars
window.recalculateMaxBars = function(charKey) {
		gC(charKey).lust.max = float2int(70 + (gC(charKey).physique.value * 1 + gC(charKey).agility.value * 1 + gC(charKey).resilience.value * 1
					  + gC(charKey).will.value * 1 + gC(charKey).intelligence.value * 1 + gC(charKey).perception.value * 1
					  + gC(charKey).empathy.value * 1 + gC(charKey).charisma.value * 1 + gC(charKey).luck.value * 1) / 3);
		gC(charKey).willpower.max = float2int(70 + gC(charKey).will.value * 1 + gC(charKey).intelligence.value * 1 + gC(charKey).perception.value * 1);
		gC(charKey).energy.max = float2int(70 + gC(charKey).physique.value * 1 + gC(charKey).agility.value * 1 + gC(charKey).resilience.value * 1);
		gC(charKey).socialdrive.max = float2int(70 + gC(charKey).empathy.value * 1 + gC(charKey).charisma.value * 1 + gC(charKey).luck.value * 1);
		for ( var sBar of ["lust","willpower","energy","socialdrive"] ) {
			gC(charKey)[sBar].current = gC(charKey)[sBar].max;
		}
	}

	// Special experience
window.getCharsSpecialExperience = function(cK,spExp) {
	var val = 0;
	if ( gC(cK)[spExp] != undefined ) {
		val = gC(cK)[spExp];
	}
	return val;
}
window.addCharsSpecialExperience = function(cK,spExp,amount) {
	if ( gC(cK)[spExp] == undefined ) {
		gC(cK)[spExp] = 0;
	}
	gC(cK)[spExp] += amount;
}

	// Control
window.attackControl = function(charKey,damage) {
		gC(charKey).control -= damage;
		if ( gC(charKey).control < 0 ) {
			gC(charKey).control = 0;
		} else if ( gC(charKey).control >= gC(charKey).maxControl ) {
			gC(charKey).control = gC(charKey).maxControl;
		}
	}
	
window.consumeControl = function(charKey,amount) {
		gC(charKey).control -= amount;
		if ( gC(charKey).control < 0 ) {
			gC(charKey).control = 0;
		} else if ( gC(charKey).control >= gC(charKey).maxControl ) {
			gC(charKey).control = gC(charKey).maxControl;
		}
	}
	
window.assignLostControlTurns = function(charKey,value) { // Value does nothing. Perhaps it will do something eventually.
		var lostTurns = limitedRandomInt(2) + 1 // 1 ~ 3
		gC(charKey).lostControlTurns = lostTurns;
		State.variables.sc.otherMessages.push("" + ktn(gC(charKey).varName) + " has lost control for " + lostTurns + " turn/s.");
	}
	
window.depleteControl = function(charKey) {
		gC(charKey).control = 0;
		assignLostControlTurns(charKey,1);
	}
	
window.cleanCharControl = function(charKey) {
		gC(charKey).control = gC(charKey).maxControl;
		gC(charKey).lostControlTurns = 0;
	}

window.recoverControl = function(charKey) {
		if ( gC(charKey).control < gC(charKey).maxControl && gC(charKey).controlRecovery > 0 ) {
			gC(charKey).control += gC(charKey).controlRecovery;
			if ( gC(charKey).control > gC(charKey).maxControl ) {
				gC(charKey).control = gC(charKey).maxControl;
			}
		}
	}
	
	
window.gainControlBack = function(charKey) {
		var gainedControl = gC(charKey).maxControl * 0.6;
		gC(charKey).control = gainedControl;
		gC(charKey).lostControlTurns = -1;
		State.variables.sc.otherMessages.push("" + ktn(gC(charKey).varName) + " recovered " + gainedControl + " control points.");
	}

// Name, text, formatting
window.generateTitledName = function(charKey) {
		var names = [];
		for ( var cName of gC(charKey).names ) {
			if ( names.includes(cName) == false ) {
				names.push(cName);
			}
		}
		var tooltip = "";
		for ( var cName of names ) {
			if ( tooltip != "" ) { tooltip += "\n"; }
			tooltip += firstToCap(cName);
		}
		var titledName = '<span style="color:'+ gC(charKey).nameColor+'" title="' + tooltip + '">' + gC(charKey).name+'</span>';
		return titledName;
	}

// Bodyparts
window.doesCharHaveBodypart = function(charKey,bodypart) {
	var flag = false;
	if ( gC(charKey).body.hasOwnProperty(bodypart) ) {
		flag = true;
	}
	return flag;
}

// Group functions
window.getCharGroup = function(charKey) { // Get character's group
	var group = [];
	if ( gC(charKey).followingTo == "" ) { // Char is leading
		group.push(charKey);
		for ( var charK of gC(charKey).followedBy ) {
			group.push(charK);
		}
	}
	else { // Char is following
		group.push(gC(charKey).followingTo);
		for ( var charK of gC(gC(charKey).followingTo).followedBy ) {
			group.push(charK);
		}
	}
	return group;
}
window.getPlayerCharsGroup = function() {
	return getCharGroup("chPlayerCharacter");
}

window.charUnfollowsChar = function(unfollowingChar,unfollowedChar) {
	if ( gC(unfollowingChar).followingForDebt ) {
		applyFollowingDebt(unfollowingChar);
		gC(unfollowingChar).followingForDebt = false;
	}
	gC(unfollowedChar).followedBy = arrayMinusA(gC(unfollowedChar).followedBy,unfollowingChar);
	gC(unfollowingChar).followingTo = "";
	charUnbecomesFollower(unfollowingChar);
	
	// Notify player if appropriate
	if ( unfollowingChar != "chPlayerCharacter" && unfollowedChar != "chPlayerCharacter"
	  && getRoomA(gC(unfollowingChar).currentRoom).characters.includes("chPlayerCharacter") ) {
		State.variables.compass.setMapMessage(gC(unfollowingChar).getFormattedName() + " stopped following " + gC(unfollowedChar).getFormattedName() + ".");
	}
}
window.charLosesFollowers = function(unfollowedChar) {
	for ( var charK of gC(unfollowedChar).followedBy ) {
		charUnfollowsChar(charK,unfollowedChar);
	}
}
window.charFollowsChar = function(followingChar,followedChar,flagPayingDebt) {
	charLosesFollowers(followingChar);
	gC(followingChar).mission = "";
	if ( gC(followingChar).followingTo != "" ) {
		charUnfollowsChar(followingChar,gC(followingChar).followingTo);
	}
	gC(followingChar).followingTo = followedChar;
	gC(followedChar).followedBy.push(followingChar);
	charBecomesFollower(followingChar);
	
	// Favor debt
	if ( flagPayingDebt ) {
		gC(followingChar).followingForDebt = true;
		gC(followingChar).startedFollowingAt = [ State.variables.daycycle.hours , State.variables.daycycle.minutes ];
	}
	
	// Join appropriate Sis
	var sisId = State.variables.compass.findFirstSisIdInvolvingCharacter(followedChar);
	if ( sisId != -1 ) {
		State.variables.compass.sisList[sisId].charJoinsSis(followingChar);
	}
	
	// Notify player if appropriate
	if ( followingChar != "chPlayerCharacter" && followedChar != "chPlayerCharacter"
	  && getRoomA(gC(followingChar).currentRoom).characters.includes("chPlayerCharacter") ) {
		State.variables.compass.setMapMessage(gC(followingChar).getFormattedName() + " started following " + gC(followedChar).getFormattedName() + ".");
	}
}

window.cleanCharGroup = function(charKey) { // Use ONLY on map period cleaning
	if ( gC(charKey).followingTo != "" ) {
		charUnfollowsChar(charKey,gC(charKey).followingTo);
	}
}

	// Favor debt
window.calculateFollowingDebt = function(charKey) {
	var debt = 0;
	if ( gC(charKey).followingForDebt ) {
		var h = gC(charKey).startedFollowingAt[0];
		var m = gC(charKey).startedFollowingAt[1];
		var mins = calculateMinsDiffFromCurrentTime(h,m);
		debt = mins / 60;
	}
	return debt;
}
window.payFavorDebt = function(charA,charB,favor) {
	// A gains favor points from B, B owes favor to A
	if ( rFavor(charA,charB) <= 0 ) {
		// B owes favor to A, extra favor debt will be applied to B
		gC(charB).relations[charA].favor += favor;
	} else {
		if ( rFavor(charA,charB) < favor ) {
			// A's debt towards B is lower than favor to pay, extra debt will be applied to B
			var rest = favor - rFavor(charA,charB);
			gC(charA).relations[charB].favor = 0;
			gC(charB).relations[charA].favor = rest;
		} else {
			// Favor isn't enough to pay all of A's debt, it will just be rested¡
			gC(charA).relations[charB].favor -= favor;
		}
	}
}
window.applyFollowingDebt = function(charKey) {
	if ( gC(charKey).followingForDebt ) {
		var debt = calculateFollowingDebt(charKey);
		payFavorDebt(charKey,gC(charKey).followingTo,debt);
	}
}

	// Turn tags ( "denied" ) 
window.getCharTurnTags = function(charKey) {
	var turnTags = [];
	if ( gC(charKey).hasOwnProperty("turnTags") ) {
		turnTags = gC(charKey).turnTags;
	}
	return turnTags;
}
window.addTurnTagToChar = function(tag,charKey) {
	if ( gC(charKey).hasOwnProperty("turnTags") ) {
		gC(charKey).turnTags.push(tag);
	} else {
		gC(charKey).turnTags = [tag];
	}
}
window.doesCharHaveTurnTag = function(charKey,tag) {
	var flag = false;
	if ( gC(charKey).hasOwnProperty("turnTags") ) {
		if ( gC(charKey).turnTags.includes(tag) ) {
			flag = true;
		}
	}
	return flag;
}

	// Scene tags ( "noLead" )
window.getCharSceneTags = function(charKey) {
	var sceneTags = [];
	if ( gC(charKey).hasOwnProperty("sceneTags") ) {
		sceneTags = gC(charKey).sceneTags;
	}
	return sceneTags;
}
window.addSceneTagToChar = function(tag,charKey) {
	if ( gC(charKey).hasOwnProperty("sceneTags") ) {
		gC(charKey).sceneTags.push(tag);
	} else {
		gC(charKey).sceneTags = [tag];
	}
}
window.doesCharHaveSceneTag = function(charKey,tag) {
	var flag = false;
	if ( gC(charKey).hasOwnProperty("sceneTags") ) {
		if ( gC(charKey).sceneTags.includes(tag) ) {
			flag = true;
		}
	}
	return flag;
}

	// Day tags ( "liberationAttempt" )
window.getCharSceneTags = function(charKey) {
	var dayTags = [];
	if ( gC(charKey).hasOwnProperty("dayTags") ) {
		dayTags = gC(charKey).dayTags;
	}
	return dayTags;
}
window.addDayTagToChar = function(tag,charKey) {
	if ( gC(charKey).hasOwnProperty("dayTags") ) {
		gC(charKey).dayTags.push(tag);
	} else {
		gC(charKey).dayTags = [tag];
	}
}
window.doesCharHaveDayTag = function(charKey,tag) {
	var flag = false;
	if ( gC(charKey).hasOwnProperty("dayTags") ) {
		if ( gC(charKey).dayTags.includes(tag) ) {
			flag = true;
		}
	}
	return flag;
}

	// Orgasms
window.isCharsOrgasmRuined = function(charKey) {
	var flag = false;
	if ( gSettings().chastity == "enable" ) {
		if ( doesCharHaveTurnTag(charKey,"denied") ) {
			flag = true;
		} else {
			// Pussy and dick
			if ( doesCharHaveBodypart(charKey,"pussy") && doesCharHaveBodypart(charKey,"dick") ) {
				if ( gC(charKey).body.pussy.state == "locked" && gC(charKey).body.dick.state == "locked" ) {
					flag = true;
				}
			// Pussy
			} else if ( doesCharHaveBodypart(charKey,"pussy") ) {
				if ( gC(charKey).body.pussy.state == "locked" ) {
					flag = true;
				}
			// Dick
			} else if ( doesCharHaveBodypart(charKey,"dick") ) {
				if ( gC(charKey).body.dick.state == "locked" ) {
					flag = true;
				}
			}
		}
	}
	return flag;
}
window.isOrgasmMindblowing = function(charKey) {
	var flag = false;
	var overflowPercent = -(gC(charKey).lust.current/gC(charKey).lust.max);
	var requiredScore = 0;
	if ( gC(charKey).conNMbOrgSC == 0 ) {
		requiredScore += 1;
	} else if ( gC(charKey).conNMbOrgSC == 1 ) {
		requiredScore += 0.6;
	} else if ( gC(charKey).conNMbOrgSC == 2 ) {
		requiredScore += 0.3;
	} else if ( gC(charKey).conNMbOrgSC == 3 ) {
		requiredScore += 0.1;
	}
	requiredScore += 0.3 - (luckedDiceThrow(gCstat(charKey,"luck")) * 0.6);
	/*
	var overflowScore = gC(charKey).orgasmSceneCounter - (gC(charKey).mindblowingOrgasmSC * 3) + (overflowPercent * 1.5);
	if ( overflowScore > 2.4 ) {
		flag = true;
	}
	*/
	if ( overflowPercent >= requiredScore ) {
		flag = true;
	}
	return flag;
}

// Constructors, serializers, etc.
Character.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

Character.prototype.clone = function () {
	return (new Character())._init(this);
};

Character.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Character())._init($ReviveData$)', ownData);
};

// Auxiliar functions //

	// Known actions
window.charactersLearnSceneActions = function(characters,sceneActions) {
	var resultsMsg = "";
	var movesLearned = [];
	for ( var currentChar of characters ) {
		movesLearned = [];
		for ( var currentAction of sceneActions ) {
			if ( gC(currentChar).saList.includes(currentAction) == false ) {
				gC(currentChar).saList.push(currentAction);
				movesLearned.push(setup.saList[currentAction].name);
			}
		}
		if ( movesLearned.length > 0 ) {
			resultsMsg += gC(currentChar).getFormattedName() + " learned " + stringArrayToText(movesLearned) + ".\n";
		}
		gC(currentChar).sortSaList();
	}
	return resultsMsg;
}
window.charactersForgetSceneActions = function(characters,sceneActions) {
	var resultsMsg = "";
	for ( var character of characters ) {
		var newSaList = [];
		for ( var action of gC(character).saList ) {
			if ( sceneActions.includes(action) == false ) {
				newSaList.push(action);
			}
		}
		gC(character).saList = newSaList;
	}
	return resultsMsg;
}

	// Scrolls
window.reorderCharactersStudiedScrolls = function(characters) {
	for ( var character of characters ) {
		var newScrList = [];
		for ( var scr of getScrollsStringList() ) {
			if ( gC(character).studiedScrolls.includes(scr) ) {
				newScrList.push(scr);
			}
		}
		gC(character).studiedScrolls = newScrList;
	}
}

	// Sex stats
window.getSexEffectsMultiplier = function(charKey) {
	var multiplier = ( ( 3 + gC(charKey).daysWithoutSex ) / ( 3 + gC(charKey).sexScenesToday * 3 ) );
	return multiplier;
}

	// Drives
window.updateCharacterDrives = function(charKey) {
	addPointsToDrive(gC(charKey).dImprovement,0);
	addPointsToDrive(gC(charKey).dLove,0);
	addPointsToDrive(gC(charKey).dPleasure,0);
	addPointsToDrive(gC(charKey).dCooperation,0);
	addPointsToDrive(gC(charKey).dDomination,0);
	addPointsToDrive(gC(charKey).dAmbition,0);
}

window.getCharsDrivePercent = function(charKey,driveType) {
	// Returns the percentage of the driveType's levels in relation to the character's total drive levels
	var percent = gC(charKey)[driveType].level / getCharsTotalDriveLevels(charKey);
	return percent;
}
window.getCharsDrive = function(charKey,driveType) {
	// Returns the percentage of the driveType's levels in relation to the character's total drive levels
	return gC(charKey)[driveType].level;
}
window.getCharsTotalDriveLevels = function(charKey) {
	var total = 0;
	for ( var drive of [ "dImprovement" , "dLove", "dPleasure", "dCooperation", "dDomination", "dAmbition" ] ) {
		total += gC(charKey)[drive].level;
	}
	return total;
}
window.getCharsInfamyLimit = function(charKey) {
	var absoluteLimit = gSettings().infamyLimit;
	
	var percentLimit = 0.8;
	var ambition = getCharsDrivePercent(charKey,"dAmbition");
	if ( ambition > 0.2 ) {
		percentLimit += 0.3;
	} else if ( ambition > 0.15 ) {
		percentLimit += 0.2;
	}else if ( ambition > 0.10 ) {
		percentLimit += 0.1;
	}
	var cooperationVsDomination = getCharsDrivePercent(charKey,"dDomination") - getCharsDrivePercent(charKey,"dCooperation");
	if ( cooperationVsDomination > 0.1 ) {
		percentLimit += 0.3;
	} else if ( cooperationVsDomination > 0.05 ) {
		percentLimit += 0.2;
	} else if ( cooperationVsDomination > 0 ) {
		percentLimit += 0.1;
	}
	return (percentLimit * absoluteLimit);
}

	// AI
window.getCharsMissionTitle = function(charKey) {
	var missionTitle = "";
	if ( gC(charKey).mission != undefined ) {
		missionTitle = gC(charKey).mission;
	}
	return missionTitle;
}

	// Moods
window.getCharsMaximumMoodModifier = function(charKey) {
	var maxMod = (gCstat(charKey,"empathy") * 1.2 + gCstat(charKey,"charisma") * 0.6 + gCstat(charKey,"luck") * 0.2) * 0.1;
	if ( maxMod <= 2 ) { maxMod = 2; }
	else if ( maxMod >= 20 ) { maxMod = 20; }
	return maxMod;
}

	// Text
window.textEquipment = function(charKey) {
	var eText = "";
	eText += "Weapon: ";
	if ( gC(charKey).weaponID != -1 ) {
		eText += '<span title="' + getEquipDataById(gC(charKey).weaponID).description + '">' + getEquipDataById(gC(charKey).weaponID).name + "</span>"
		if ( isCharsWeaponInUse(charKey) ) {
			eText += " (In use)";
		}
	}
	eText += "\nClothes: ";
	if ( gC(charKey).weaponID != -1 ) {
		
	}
	eText += "\nAccesory: ";
	if ( gC(charKey).weaponID != -1 ) {
		
	}
	return eText;
}

	// Animations // anTags -> Tags that refer to which animations should be used for this character
window.getCharsAnTags = function(cK) {
	var anTags = [];
	if ( gC(cK).hasOwnProperty("anTags") == true ) {
		anTags = gC(cK).anTags;
	}
	return anTags;
}
window.charReceivesAnTags = function(cK,anTags) {
	if ( gC(cK).hasOwnProperty("anTags") == false ) {
		gC(cK).anTags = [];
	}
	for ( var at of anTags ) {
		gC(cK).anTags.push(at);
	}
}

	// Base stats
window.getThreeKindredCharStats = function(charKey) { // Returns the character's 3 stats with the highest affinity
	var kindredStats = [];
	
	var stats = ["physique","agility","resilience","will","intelligence","perception","empathy","charisma","luck"];
	var currentHighestStat = stats[0];
	var currentHighestAff = 0;
	
	for ( var i = 0 ; i < 3 ; i++ ) {
		currentHighestAff = "luck";
		currentHighestAff = 0;
		for ( var currentStat of stats ) {
			if ( ( gC(charKey)[currentStat].affinity > currentHighestAff ) && (kindredStats.includes(currentStat) == false) ) {
				currentHighestStat = currentStat;
				currentHighestAff = gC(charKey)[currentStat].affinity;
			}
		}
		kindredStats.push(currentHighestStat);
	}
	
	return kindredStats;
}

	// Body
window.charHasLockedBodypart = function(charKey,bodypartKey) {
	var flag = false;
	if ( gC(charKey).body.hasOwnProperty(bodypartKey) ) {
		if ( gC(charKey).body[bodypartKey].state == "locked" ) {
			flag = true;
		}
	}
	return flag;
}

window.returnCharsUnlockedGenitals = function(charKey) {
	var unlockedGenitals = [];
	if ( gC(charKey).hasFreeBodypart("dick") ) {
		unlockedGenitals.push("dick");
	}
	if ( gC(charKey).hasFreeBodypart("pussy") ) {
		unlockedGenitals.push("pussy");
	}
	return unlockedGenitals;
}

window.returnCharsLockedLimbs = function(charKey) {
	var lockedLimbs = [];
	if ( charHasLockedBodypart(charKey,"arms") ) { lockedLimbs.push("arms"); }
	if ( charHasLockedBodypart(charKey,"legs") ) { lockedLimbs.push("legs"); }
	return lockedLimbs;
}

	// Gender
window.isCharFemale = function(cK) {
	if ( gC(cK).perPr == "she" ) {
		return true;
	} else {
		return false;
	}
}
window.isCharMale = function(cK) {
	if ( gC(cK).perPr == "he" ) {
		return true;
	} else {
		return false;
	}
}

	// States
window.removeCharsStates = function(charKey) {
	for ( var as of gC(charKey).alteredStates ) {
		as.cancelEffect(charKey);
	}
	gC(charKey).alteredStates = [];
}

	// Casus belli
window.actorGetsCbAgainstTarget = function(actor,target) {
	gC(actor).cbl.push(target);
	if ( gC(actor).socialAi.rivalTs.includes(target) == false ) {
		gC(actor).socialAi.rivalTs.push(target);
	}
}

// Auxiliar UI

window.textCharactersDrives = function(character) {
	var desc = "";
	var drives = ["dImprovement","dPleasure","dLove","dCooperation","dDomination","dAmbition"];
	var driveNames = ["Self-Improvement","Pleasure","Love","Cooperation","Domination","Ambition"];
	var i = 0;
	if ( character == "chPlayerCharacter" ) {
		desc = "Beware: characters' drives or values represent their values or ideas and determine their behavior as NPCs. The player character's drives cannot determine their behavior, but they may push them towards desiring certain events, which could slightly raise the difficulty of certain willpower checks.\n";
	}
	while ( i < 6 ) {
		desc += driveNames[i] + " - Level: " + gC(character)[drives[i]].level + " , Value: " + gC(character)[drives[i]].value.toFixed(1);
		if ( i < 5 ) { desc += "\n"; }
		i++;
	}
	return desc;
}

window.textCharactersTastes = function(character) {
	var desc = "";
	var iFlag = false;
	var flagDisplay = true;
	for ( var t in gC(character).tastes ) {
	flagDisplay = true;
	
	if ( gC(character).tastes[t].content == "useDick" ) {
		if ( gC(character).body.hasOwnProperty("dick") == false ) { flagDisplay = false; }
	} else if ( gC(character).tastes[t].content == "usePussy" ) {
		if ( gC(character).body.hasOwnProperty("pussy") == false ) { flagDisplay = false; }
	} else if ( gC(character).tastes[t].content == "useAnus" ) {
		if ( gC(character).body.hasOwnProperty("anus") == false ) { flagDisplay = false; }
	} else if ( gC(character).tastes[t].content == "useBreasts" ) {
		if ( gC(character).body.hasOwnProperty("breasts") == false ) { flagDisplay = false; }
	} else if ( gC(character).tastes[t].content == "useMouth" ) {
		if ( gC(character).body.hasOwnProperty("mouth") == false ) { flagDisplay = false; }
	} else if ( gC(character).tastes[t].content == "useEyes" ) {
		if ( gC(character).body.hasOwnProperty("eyes") == false ) { flagDisplay = false; }
	} else if ( gC(character).tastes[t].content == "useHands" ) {
		if ( gC(character).body.hasOwnProperty("arms") == false ) { flagDisplay = false; }
	} else if ( gC(character).tastes[t].content == "useLegs" ) {
		if ( gC(character).body.hasOwnProperty("legs") == false ) { flagDisplay = false; }
	} else if ( gC(character).tastes[t].content == "useTail" ) {
		if ( gC(character).body.hasOwnProperty("tail") == false ) { flagDisplay = false; }
	}
		if ( flagDisplay ) {
			if ( gC(character).tastes[t] instanceof weightedElement ) {
				if ( gC(character).tastes[t].content != "continuedAction" && gC(character).tastes[t].content != "position" ) {
					iFlag = "//";
					if ( gC(character).tastes[t].r == 2 ) {
						desc += "[img[img/sysIcons/redPlus.png]]";
						iFlag = "__";
					} else if ( gC(character).tastes[t].r == 1 ) {
						iFlag = "";
						desc += "[img[img/sysIcons/bluePlus.png]]";
					} else {
						desc += "    ";
					}
					desc += " ";
					if ( iFlag != false ) { desc += iFlag; }
					switch ( gC(character).tastes[t].content ) {
						case "foreplay":
							desc += "Foreplay"; break;
						case "oral":
							desc += "Oral";	break;
						case "fullsex":
							desc += "Full sex";	break;
						case "talk":
							desc += "Banter"; break;
						case "useDick":
							desc += "Use dick"; break;
						case "usePussy":
							desc += "Use pussy"; break;
						case "useAnus":
							desc += "Use anus"; break;
						case "useBreasts":
							desc += "Use breasts"; break;
						case "useMouth":
							desc += "Use mouth"; break;
						case "useEyes":
							desc += "Use eyes"; break;
						case "useHands":
							desc += "Use hands"; break;
						case "useLegs":
							desc += "Use legs"; break;
						case "useTail":
							desc += "Use tail"; break;
						case "targetDick":
							desc += "Target dick"; break;
						case "targetPussy":
							desc += "Target pussy"; break;
						case "targetBreasts":
							desc += "Target breasts"; break;
						case "targetAnus":
							desc += "Target anus"; break;
						case "targetMouth":
							desc += "Target mouth"; break;
						case "targetEyes":
							desc += "Target eyes"; break;
						case "targetHands":
							desc += "Target hands"; break;
						case "targetLegs":
							desc += "Target legs"; break;
						case "targetTail":
							desc += "Target tail"; break;
						case "top":
							desc += "Top"; break;
						case "bottom":
							desc += "Bottom"; break;
						case "domination":
							desc += "Domination"; break;
						case "submission":
							desc += "Submission"; break;
						case "bondage":
							desc += "Bondage"; break;
						case "teasing":
							desc += "Teasing"; break;
						case "hypnosis":
							desc += "Hypnosis"; break;
						case "draining":
							desc += "Draining"; break;
						case "charm":
							desc += "Charm"; break;
						case "romantic":
							desc += "Romantic"; break;
						case "usePain":
							desc += "Use pain"; break;
						case "receivePain":
							desc += "Receive pain"; break;
						case "denial":
							desc += "Denial"; break;
					}
					if ( iFlag != false ) { desc += iFlag; }
					desc += " - W:" + gC(character).tastes[t].w + "\n";
				}
			}
		}
	}
	return desc;
}

