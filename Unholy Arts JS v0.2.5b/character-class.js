////////// CHARACTER CLASS //////////
window.Character = function(name, varName) {
	this.name = name || "noName";
	this.varName = varName || "BEWARE: THIS MUST BE DECLARED!";
	this.nameColor = "lightcyan";
	this.formattedName = '<span style="color:'+this.nameColor+'">'+this.name+'</span>';
	
	this.getName = function() { return this.name; };
	this.getFormattedName = function() { return this.formattedName; };
	
	this.names = [ this.getName() , this.getName() , this.getName() ];
	
	this.type = "default";
	
	this.aiAlgorythm = 0;
	
	this.race = "human";
	
	// Currencies
	this.merit = 0;
	this.changeMerit = function(value) {
		this.merit += value;
		if ( this.merit < 0 ) {
			this.merit = 0;
		}
	}
	this.money = 0; // Veerens, silver coins
	this.infamy = 0;
	this.changeInfamy = function(value) {
		this.infamy += value;
		if ( this.infamy < 0 ) {
			this.infamy = 0;
		}
	}
	
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
	
	/*
	this.recalculateMaxBars = function() {
		this.lust.max = float2int(70 + (this.physique.value * 1 + this.agility.value * 1 + this.resilience.value * 1
					  + this.will.value * 1 + this.intelligence.value * 1 + this.perception.value * 1
					  + this.empathy.value * 1 + this.charisma.value * 1 + this.luck.value * 1) / 3);
		this.willpower.max = float2int(70 + this.will.value * 1 + this.intelligence.value * 1 + this.perception.value * 1);
		this.energy.max = float2int(70 + this.physique.value * 1 + this.agility.value * 1 + this.resilience.value * 1);
		this.socialdrive.max = float2int(70 + this.empathy.value * 1 + this.charisma.value * 1 + this.luck.value * 1);
		for ( var sBar of ["lust","willpower","energy","socialdrive"] ) {
			this[sBar].current = this[sBar].max;
		}
	} */
	
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
	this.cleanStates = function() {
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
		legs : new Bodypart("legs","legs")
	};
	
	this.addBodypart = function(key,name) {
		this.body[key] = new Bodypart(key,name);
	}
	this.removeBodypart = function(key) {
		delete this.body[key];
	}
	this.addFemaleParts = function() {
		this.addBodypart("breasts","breasts");
		this.addBodypart("pussy","pussy");
		this.addBodypart("anus","anus");
	}
	
	this.hasFreeBodypart = function(part) {
		var flag = false;
		
		if ( this.body.hasOwnProperty(part) ) {
			if ( this.body[part].state == "free" ) {
				flag = true;
			}
		}
		
		return flag;
	}
	
	this.lockBodypart = function(part) {
		if ( this.body.hasOwnProperty(part) ) {
			if ( this.body[part].state == "free" ) {
				this.body[part].state = "locked";
			}
		}
	}
	this.freeBodypart = function(part) {
		if ( this.body.hasOwnProperty(part) ) {
			if ( this.body[part].state == "locked" ) {
				this.body[part].state = "free";
			}
		}
	}
	
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
	
	// Misc. info
	this.daysWithoutSex = 0;
	this.sexScenesToday = 0;
	
	this.likedTopics = [];
	
	this.applyRelationVector = function(target,relationVector) {
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
	
	this.applyMoodVector = function(moodVector) {
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
	this.applyMoodyMoodVector = function(moodVector) {
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
	
	this.restoreMood = function() {
		this.mood.friendly = this.baseMood.friendly;
		this.mood.intimate = this.baseMood.intimate;
		this.mood.flirty = this.baseMood.flirty;
		this.mood.aroused = this.baseMood.aroused;
		this.mood.dominant = this.baseMood.dominant;
		this.mood.submissive = this.baseMood.submissive;
		this.mood.bored = this.baseMood.bored;
		this.mood.angry = this.baseMood.angry;
	}
	this.applyMoodDecay = function() {
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
	
	this.getIsAvailableForSocialInteractions = function(initiator) {
		var flagAvailable = this.availableSocialInteractions;
		if ( this.followingTo != "" && this.followingTo != initiator ) {
			if ( State.variables.compass.findFirstSisIdInvolvingCharacter(this.varName) == -1 ) {
				flagAvailable = false;
			}
		}
		return flagAvailable;
	}
	this.availableSocialInteractions = true; // If false, it isn't possible to begin dynamic social interactions with a given character
	
	// Virginities list
	this.virginities = {
		pussy : new Virginity("pussy","Vaginal",true,false),
		anal : new Virginity("anus","Anal",true,false),
		dick : new Virginity("dick","Penile",true,false)
	};
	this.makeVirginitiesUnknown = function() {
		for ( var virginity in this.virginities ) {
			this.virginities[virginity].taken = true;
			this.virginities[virginity].taker = "unknown";
			this.virginities[virginity].method = "unknown";
		}
	}
	
	// Orgasms
	this.orgasmCounter = 0;
	this.orgasmSceneCounter = 0;
	
	this.koed = false; // Flag: has the character been defeated in the current battle
	
	this.tryOrgasm = function() {
		var overflow = -1;
		
		if ( this.lust.current <= 0 ) {
			overflow = -this.lust.current;
			this.lust.current = this.lust.max;
			this.orgasmCounter++;
			this.orgasmSceneCounter++;
		}
		
		return overflow;
	}
	
	// Known moves
	this.saList = ["doNothing","struggle"];
	
	// Known extra social actions
	this.extraSocIntList = [];
	
	// Management
	this.restoreBars = function() {						// RESTORE BARS FUNC
		this.lust.restore();
		this.willpower.restore();
		this.energy.restore();
		this.socialdrive.restore();
	}
	
	this.cleanLead = function() {
		this.lead = 50;
		this.hasLead = false;
	}
	
	this.sortSaList = function() {
		var sortedList = ["doNothing"];
		
		// Add single use actions
		for ( var sa of this.saList ) {
			if ( State.variables.saList[sa].tags.includes("sUse") ) {
				if ( sortedList.includes(sa) == false ) {
					sortedList.push(sa);
				}
			}
		}
		
		// Add continued actions
		for ( var sa of this.saList ) {
			if ( State.variables.saList[sa].tags.includes("cAct") ) {
				if ( sortedList.includes(sa) == false ) {
					sortedList.push(sa);
				}
			}
		}
		
		// Add positional actions
		for ( var sa of this.saList ) {
			if ( State.variables.saList[sa].tags.includes("pos") ) {
				if ( sortedList.includes(sa) == false ) {
					sortedList.push(sa);
				}
			}
		}
		
		// Add pounce actions
		for ( var sa of this.saList ) {
			if ( State.variables.saList[sa].tags.includes("bPos") ) {
				if ( sortedList.includes(sa) == false ) {
					sortedList.push(sa);
				}
			}
		}
		
		// Replace char.saList
		this.saList = sortedList;
	}
	
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
	this.setSpeechColor = function(colorKey) {					// SET SPEECH COLOR
		this.speechColor = colorKey;
		this.colorStyleKey = 'color: '+this.speechColor;
	}
	
	this.setColors = function(nameColor,speechColor) {
		this.setNameColor(nameColor);
		this.setSpeechColor(speechColor);
	}
	
	this.setBaseAttributes = function(ph,ag,re,wi,nt,pe,em,ch,lu) {
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
	this.setAffinities = function(ph,ag,re,wi,nt,pe,em,ch,lu) {
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
	
	this.cleanAccumulatedDamages = function() {
		this.lust.cleanDamage();
		this.willpower.cleanDamage();
	}
	
	// Personality
	this.tastes = createPreferencesWeightedList();
	this.tastes.useDick.w = 110;
	this.tastes.usePussy.w = 110;
	this.tastes.targetDick.w = 110;
	this.tastes.targetPussy.w = 110;
	this.tastes.useAnus.w = 65;
	this.tastes.targetAnus.w = 65;
	
		// Pronouns
	this.perPr = "it"; // Personal pronoun
	this.comPr = "it"; // Personal pronoun as complement
	this.refPr = "itself"; // Reflexive pronoun
	this.posPr = "its"; // Possessive pronoun
	this.inPosPr = "its"; // Independent Possessive
	this.assignFemeninePronouns = function() {
		this.perPr = "she";
		this.comPr = "her";
		this.refPr = "herself";
		this.posPr = "her";
		this.inPosPr = "hers";
	}
	this.assignMasculinePronouns = function() {
		this.perPr = "he";
		this.comPr = "him";
		this.refPr = "himself";
		this.posPr = "his";
		this.inPosPr = "his";
	}
	this.assignItPronouns = function() {
		this.perPr = "it";
		this.comPr = "it";
		this.refPr = "itself";
		this.posPr = "its";
		this.inPosPr = "its";
	}
	
	// Text message functions
	this.textBars = function() { // Bars
		var text = "";
		if ( this.koed ) {
			text += colorText("KO","darkgray") + "\n";
		} else {
			// Lead
			if ( State.variables.sc.enabledLead == "dynamic" ) {
				text += this.textLeadBar() + "\n";
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
	this.textStats = function() {
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
	this.textLeadBar = function() {
		var text = '<span style="color:darkgray">Lead: </span>' + this.lead.toFixed(2) + " / 100";
		if ( this.hasLead == true ) {
			text += '<span style=' + '"color:darkgray"' + '> Leading</span>';
		}
		return text;
	}
	this.textControlBar = function() {
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
	this.textAlteredStates = function() {
		var text = '<span style="color:darkgray">';
		var i = 0;
		for ( var as of this.alteredStates ) {
			if ( i > 0 ) { text += ", "; }
			var tooltip = as.title + ": " + as.description + "\nRemaining turns: " + as.remainingTurns;
			var asText = "<span title='" + tooltip + "'>" + as.acr + "</" + "span>";
			text += asText;
			i++;
		}
		text += '</span>';
		return text;
	}
	this.textLustBar = function() {
		var imgLust = img("lust");
		return ( imgLust + ' <span style="color:lightcoral">Lust: </span>' + this.lust.current.toFixed(2) + "/" + this.lust.max.toFixed(0) );
	}
	this.lustBarText = this.textLustBar();
	this.textWillpowerBar = function() {
		return ( img("willpower") + ' <span style="color:darkslateblue">Willpower: </span>' + this.willpower.current.toFixed(2) + "/" + this.willpower.max.toFixed(0) );
	}
	this.willpowerBarText = this.textWillpowerBar();
	
	this.textAccumulatedDamages = function() { // Accumulated Damage
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
	
	this.textBodyparts = function() { // Bodyparts
		var text = "";
		
		for ( var part in this.body ) {
			//text += part.textToUI();
			if ( this.body[part].key == "dick" || this.body[part].key == "pussy" ) {
				text += this.body[part].textToUI();
			}
		}
		var bpList = ["mouth","breasts","anus","arms","legs","eyes","tail"];
		for ( var part of bpList ) {
			if ( this.body.hasOwnProperty(part) ) {
				text += this.body[part].textToUI();
			}
		}
		
		return text;
	}
	
	// Character stats screen view
	this.getCharacterUIbarInfo = function() { // Returns a string that generates the character's basic info when displayed on Sugarcube 2
		var string = "<div align='center'>\ " + generateTitledName(this.varName) + " (" + this.getCharScreenButton("Status") + ")\n";
		if ( this.avatar != null ) {
			string += this.avatar() + "\n";
		}
		string += "</div> \ ";
		string += this.textBars() + "\n";
		return string;
	}
	this.getCharacterScreenInfo = function() { // Returns a string that generates the character's stats screen when displayed on Sugarcube 2
		var string = "__" + this.formattedName + "__\n";
		// TODO: Divide textBars to textBars and textStats, divided by a vertical line
		//string += '<div class="split left"><div class="centered"><p>' + this.textBars() + '</p></div></div>';
		//string += '<div class="split right"><div class="centered"><p>' + this.textStats() + "</p></div></div> \n";
		//string += '<html><table style="width:100%">' + '<tr><td>' + this.textBars() + '</td></tr>'
		//string += '<tr><td>' + this.textStats() + '</td></tr>' + '</table></html> \n'
		string += this.textBars() + "\n";
		string += this.textStats() + "\n\n";
		string += "__Bodyparts__:\n";
		string += this.textBodyparts();
		return string;
	}
	
	this.getCharScreenButton = function(handler) {
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
	
	// AI
	this.mapAi = new NpcMapAi(this.varName);
	this.sisAi = new NpcSisAi(this.varName);
	this.globalAi = new NpcGlobalAi(this.varName);
	this.socialAi = new NpcSocialAi(this.varName);
	
	// System
	this.wasPromptedInCurrentSisRound = false;
};

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

	// Control
window.attackControl = function(charKey,damage) {
		gC(charKey).control -= damage;
		if ( gC(charKey).control < 0 ) {
			gC(charKey).control = 0;
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
				movesLearned.push(State.variables.saList[currentAction].name);
			}
		}
		resultsMsg += gC(currentChar).getFormattedName() + " learned " + stringArrayToText(movesLearned) + ".\n";
		gC(currentChar).sortSaList();
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
window.getCharsTotalDriveLevels = function(charKey) {
	var total = 0;
	for ( var drive of [ "dImprovement" , "dLove", "dPleasure", "dCooperation", "dDomination", "dAmbition" ] ) {
		total += gC(charKey)[drive].level;
	}
	return total;
}
window.getCharsInfamyLimit = function(charKey) {
	var absoluteLimit = 25;
	
	var percentLimit = 0.5;
	var ambition = getCharsDrivePercent(charKey,"dAmbition");
	if ( ambition > 0.25 ) {
		percentLimit += 0.3;
	} else if ( ambition > 0.15 ) {
		percentLimit += 0.15;
	}else if ( ambition > 0.10 ) {
		percentLimit += 0.10;
	}
	var cooperationVsDomination = getCharsDrivePercent(charKey,"dDomination") - getCharsDrivePercent(charKey,"dCooperation");
	if ( cooperationVsDomination > 0.2 ) {
		percentLimit += 0.5
	} else if ( cooperationVsDomination > 0.1 ) {
		percentLimit += 0.35
	} else if ( cooperationVsDomination > 0 ) {
		percentLimit += 0.15
	}
	return (percentLimit * absoluteLimit);
}

	// Moods
window.getCharsMaximumMoodModifier = function(charKey) {
	var maxMod = (gCstat(charKey,"empathy") * 1.2 + gCstat(charKey,"charisma") * 0.6 + gCstat(charKey,"luck") * 0.2) * 0.1;
	if ( maxMod <= 2 ) { maxMod = 2; }
	else if ( maxMod >= 20 ) { maxMod = 20; }
	return maxMod;
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

// Auxiliar UI

window.textCharactersDrives = function(character) {
	var desc = "";
	var drives = ["dImprovement","dPleasure","dLove","dCooperation","dDomination","dAmbition"];
	var driveNames = ["Self-Improvement","Pleasure","Love","Cooperation","Domination","Ambition"];
	var i = 0;
	while ( i < 6 ) {
		desc += driveNames[i] + " - Level: " + gC(character)[drives[i]].level + " , Value: " + gC(character)[drives[i]].value;
		if ( i < 5 ) { desc += "\n"; }
		i++;
	}
	return desc;
}
