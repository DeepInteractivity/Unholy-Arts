//////// EVENTS CALENDAR ////////
// This class saves routines to determine which story events will be shown and when

// Ctrl + f: ECtag to find the actual events calendar.

window.EventsCalendar = function() {
	
	// This must be set to true when any event starts. It must be set to false when any event ends.
	// This must be considered on general-functions' refreshUIbars()
	this.activeEvent = false;
	
	// New day standards
	this.newDayLinkMessage = "Continue";
	this.newDayPassage = "Map";
	this.finishEventButton = "";
	
	this.playedStoryEvents = [];
}
	
	EventsCalendar.prototype.getEndDayButton = function() {
		// This gets called at the end of the day in resting rooms.
		// This function should be edited by stablishTomorrowsEvent() regularly
		return this.getStandardNewDayButton();
	}
	EventsCalendar.prototype.customEventScript = function() {
		// This function should be edited by stablishTomorrowsEvent() regularly
		return 0;
	}
	
	EventsCalendar.prototype.newDayScript = function() { 
		State.variables.personalRoom.initializeNewDay();
	}
	
	EventsCalendar.prototype.getStandardNewDayButton = function() {
		var bText = "<<l" + "ink [[" + this.newDayLinkMessage + "|" + this.newDayPassage + "]]>><<s" + "cript>>\n"
				  + "State.variables.eventsCalendar.newDayScript();\n"
				  + "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}	
	EventsCalendar.prototype.getNewDayButtonCustomMessage = function(message) {
		var bText = "<<l" + "ink [[" + message + "|" + this.newDayPassage + "]]>><<s" + "cript>>\n"
				  + "State.variables.eventsCalendar.getStandardNewDayButton();\n"
				  + "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	// Events
							// STABLISH TOMORROW'S EVENT
	EventsCalendar.prototype.stablishTomorrowsEvent = function() {
		
		// Standard new day functions: if they aren't edited later in this function, they retain their usual behavior
		this.getEndDayButton = function() {
			return this.getStandardNewDayButton();
		}
		this.customEventScript = blankFunction;
		
		// Main switch
		// ECtag
		switch (State.variables.daycycle.month) {
			case 1:
				switch (State.variables.daycycle.day) {
					case 1:
						this.customEventScript = initializeSeMagicClass;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE Magic Class Start");
						}
						break;
					case 2:
						this.customEventScript = initializeSeStretchingHelp;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE Stretching Help Start");
						}
						break;
					case 3:
						this.customEventScript = initializeSeHumming;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE Humming Start");
						}
						break;
					case 4:
						this.customEventScript = initializeSeEthicsOfPower;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE EthicsOfPow Start");
						}
						break;
					case 5:
						this.customEventScript = initializeSeStayingHydrated;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE Staying Hydrated Start");
						}
						break;
					case 6:
						this.customEventScript = initializeSeFriendBackAtHome;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE Friend Back At Home Start");
						}
						break;
					case 7:
						this.customEventScript = initializeSeStretchingHelpII;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE Stretching Help II Nash Meets Claw");
						}
						break;
					case 8:
						this.customEventScript = initializeSeFlirtingAdvice;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE Flirting Advice Start");
						}
						break;
					case 9:
						this.customEventScript = initializeSeDrishtyaTutorShip;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE Drishtya Tutorship I Start");
						}
						break;
					case 10:
						this.customEventScript = initializeSeTheMerchants;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE The Merchants Start");
						}
						break;
					case 11:
						this.customEventScript = initializeSeBeatingKittyIntoFriendship;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE Beating Kitty Into Friendship Start");
						}
						break;
					case 12:
						this.customEventScript = initializeSeBkifOutcome;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE BKIF Outcome Start");
						}
						break;
					case 18:
						this.customEventScript = initializeGleamingCavernsOverview;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE Gleaming Caverns Overview Start");
						}
						break;
					case 21:
						this.customEventScript = initializeShunnedByHerOwn;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE ShunnedByHerOwn Start");
						}
						break;
					case 25:
						this.customEventScript = initializeGleamingCavernsAdventure;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("FA ReachedTheSwamp Start");
						}
						break;
					case 28:
						this.customEventScript = initGleamingCavernsSecondDay;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("FA VaryontesOffer1");
						}
						break;
				}
				break;
			case 2:
				switch (State.variables.daycycle.day) {
					case 2:
						this.customEventScript = initGleamingCavernsTwistedFestival;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("TwistFest Init");
						}
						break;
					case 3:
						this.customEventScript = initGleamingCavernsEpilogue;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("FaEpil Start");
						}
						break;
				}
		}
		
		if ( this.customEventScript == blankFunction && isCurrentStoryStateInMainLoop() == true ) {
			// Attempt to initiate random event
			var selectedEvent = chooseRandomStoryEvent();
			
			if ( selectedEvent != "errorWList" ) {
				this.getEndDayButton = function() {
					return this.getButtonToEvent(setup.eventsMetaInfo[selectedEvent].initialPassage);
				}
				this.customEventScript = setup.eventsMetaInfo[selectedEvent].initializeFunction;
				State.variables.eventsCalendar.playedStoryEvents.push(selectedEvent);
			}
		}
	}
	window.blankFunction = function() {
		return 0;
	}
	
	EventsCalendar.prototype.getButtonToEvent = function(firstEventPassageName) {
		var bText = "<<l" + "ink [[" + this.newDayLinkMessage + "|" + firstEventPassageName + "]]>><<s" + "cript>>\n"
				  + "State.variables.eventsCalendar.activeEvent = true;\n"
				  + "State.variables.eventsCalendar.newDayScript();\n"
				  + "State.variables.eventsCalendar.customEventScript();\n"
				  + "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	EventsCalendar.prototype.setFinishEventButton = function(message,script) {
		this.finishEventButton = this.getNewDayButtonCustomMessageCustomScript(message,script);
	}
	EventsCalendar.prototype.getNewDayButtonCustomMessageCustomScript = function(message,script) {
		var bText = "<<l" + "ink [[" + message + "|" + this.newDayPassage + "]]>><<s" + "cript>>\n"
				  + "State.variables.eventsCalendar.activeEvent = false;\n"
				  + script
				  + "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	EventsCalendar.prototype.cleanUIscriptText = function() {
		var sText = 'setNoPasChars();\n'
	}

State.variables.eventsCalendar = new EventsCalendar();
State.variables.eventsCalendar.setFinishEventButton("Continue","setNoPasChars()");

// Constructors, serializers, etc.
EventsCalendar.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
EventsCalendar.prototype.clone = function () {
	return (new EventsCalendar())._init(this);
};
EventsCalendar.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new EventsCalendar())._init($ReviveData$)', ownData);
};


//////// STORY EVENT META INFO ////////
// These objects contain relevant information for story events, to be used by events calendar to dynamically select events

window.eventMetaInfo = function(name,key,initializeFunction,initialPassage,checkRequirements,getWeight) {
	this.name = name;
	this.key = key;
	this.initializeFunction = initializeFunction;
	this.initialPassage = initialPassage;
	this.checkRequirements = checkRequirements;
	this.getWeight = getWeight;
}

setup.eventsMetaInfo = [];
setup.eventsMetaInfo["atc0"] = new eventMetaInfo(
	"Aspiring Tree Climber",
	"atc0",
	initializeSeAspiringTreeClimber, // initFunc
	"SE Aspiring TC Start",
	function() { // Reqs
		var allowed = true;
		if ( gC("chPlayerCharacter").body.hasOwnProperty("arms") && gC("chPlayerCharacter").body.hasOwnProperty("legs") ) {
			if ( gC("chPlayerCharacter").body.arms.state != "free" || gC("chPlayerCharacter").body.legs.state != "free" ) {
				allowed = false;
			}
		} else {
			allowed = false;
		}
		if ( gC("chClaw").body.hasOwnProperty("arms") && gC("chClaw").body.hasOwnProperty("legs") ) {
			if ( gC("chClaw").body.arms.state != "free" || gC("chClaw").body.legs.state != "free" ) {
				allowed = false;
			}
		} else {
			allowed = false;
		}
		return allowed;
	},
	function() { // Weight
		var weight = 120;
		return weight;
	}
);
setup.eventsMetaInfo["lm0"] = new eventMetaInfo(
	"Luring Masquerade",
	"lm0",
	initializeSeLuringMasquerade, // initFunc
	"Luring Masquerade Start",
	function() { // Reqs
		var allowed = true;
		if ( gC("chVal").body.hasOwnProperty("legs") && gC("chPlayerCharacter").body.hasOwnProperty("legs") ) {
			if ( gC("chVal").body.legs.state != "free" || gC("chPlayerCharacter").body.legs.state != "free" ) {
				allowed = false;
			}
		} else {
			allowed = false;
		}
		if ( allowed ) {
			if ( gC("chPlayerCharacter").subChars.includes("chVal") || gC("chPlayerCharacter").subChars.includes("chMir") ) {
				allowed = false;
			} else if ( gC("chVal").subChars.includes("chPlayerCharacter") || gC("chVal").subChars.includes("chMir") ) {
				allowed = false;
			} else if ( gC("chMir").subChars.includes("chVal") || gC("chMir").subChars.includes("chPlayerCharacter") ) {
				allowed = false;
			} 
		}
		if ( allowed ) {
			if ( gC("chVal").egaChars.includes("chPlayerCharacter") || gC("chVal").egaChars.includes("chMir") ) {
				allowed = false;
			}
		}
		return allowed;
	},
	function() { // Weight
		var weight = 70;
		weight += rLvlAbt("chVal","chPlayerCharacter","sexualTension") * 3 + rLvlAbt("chVal","chPlayerCharacter","rivalry") * 3 + rLvlAbt("chVal","chMir","sexualTension") * 3 + rLvlAbt("chVal","chMir","rivalry") * 3;
		return weight;
	}
);
setup.eventsMetaInfo["gfn0"] = new eventMetaInfo(
	"Gifts For Nature",
	"gfn0",
	initializeSeGiftsForNature, // initFunc
	"SE Gifts For Nature Start",
	function() { // Reqs
		var allowed = true;
		
		return allowed;
	},
	function() { // Weight
		var weight = 100;
		return weight;
	}
);
setup.eventsMetaInfo["dto0"] = new eventMetaInfo(
	"Discovering The Others",
	"dto0",
	initializeSeDiscoveringTheOthers, // initFunc
	"SE Discovering The Others Start",
	function() { // Reqs
		var allowed = true;
		
		return allowed;
	},
	function() { // Weight
		var weight = 70;
		weight += rLvlAbt("chAte","chPlayerCharacter","friendship") * 5 + rLvlAbt("chAte","chPlayerCharacter","romance") * 5 - rLvlAbt("chAte","chPlayerCharacter","rivalry") * 2 - rLvlAbt("chAte","chPlayerCharacter","enmity") * 5;
		return weight;
	}
);
setup.eventsMetaInfo["gol0"] = new eventMetaInfo(
	"The Grapes of Lust",
	"gol0",
	initializeSeTGoL, // initFunc
	"SE TGoL Start",
	function() { // Reqs
		var allowed = true;
		
		if ( gC("chVal").domChar == "chPlayerCharacter" || gC("chVal").domChar == "chAte" || gC("chPlayerCharacter").domChar == "chVal" || gC("chAte").domChar == "chVal" || gC("chAte").domChar == "chPlayerCharacter" || (gC("chVal").hasFreeBodypart("pussy") == false) || (gC("chPlayerCharacter").hasFreeBodypart("mouth") == false) || (gC("chAte").hasFreeBodypart("mouth") == false) ) {
			allowed = false;
		}
		
		return allowed;
	},
	function() { // Weight
		var weight = 65;
		weight += gC("chAte").dImprovement.level * 5;
		return weight;
	}
);
setup.eventsMetaInfo["mt1"] = new eventMetaInfo(
	"Martial Tutorship I",
	"mt1",
	initializeMartialTutorshipI, // initFunc
	"SE MartialTutorshipI Start",
	function() { // Reqs
		var allowed = false;
		
		if ( gC("chPlayerCharacter").domChar == "chNash" ) {
			if ( gRelTypeAb("chPlayerCharacter","chNash").type == "tutorship" ) {
				if ( gC("chNash").hasFreeBodypart("arms") && gC("chNash").hasFreeBodypart("legs") ) {
					if ( ( gC("chPlayerCharacter").hasFreeBodypart("arms") || getEquipById(gC("chPlayerCharacter").body.arms.bondage).owner == "chNash" ) && ( gC("chPlayerCharacter").hasFreeBodypart("legs") || getEquipById(gC("chPlayerCharacter").body.legs.bondage).owner == "chNash" ) ) {
						allowed = true;
					}
				}
			}
		}
		
		return allowed;
	},
	function() { // Weight
		var weight = 300;
		return weight;
	}
);
setup.eventsMetaInfo["fak0"] = new eventMetaInfo(
	"Flaunting A Kitty",
	"fak0",
	initializeSeFaK, // initFunc
	"SE FAK Start",
	function() { // Reqs
		var allowed = false;
		
		if ( gC("chClaw").domChar == "chPlayerCharacter" && gC("chMir").domChar == null ) {
			if ( gCstat("chPlayerCharacter","charisma") >= 12 ) {
				if ( gC("chMir").hasFreeBodypart("pussy") && gC("chClaw").hasFreeBodypart("mouth") ) {
					allowed = true;
				}
			}
		}
		
		return allowed;
	},
	function() { // Weight
		var weight = 100;
		weight += (rLvlAbt("chMir","chPlayerCharacter","sexualTension") + rLvlAbt("chMir","chClaw","sexualTension") + rLvlAbt("chMir","chPlayerCharacter","submission")) * 10 + (gC("chMir").dPleasure.level * 10);
		return weight;
	}
);
setup.eventsMetaInfo["BAw0"] = new eventMetaInfo(
	"Bondage Awakening",
	"BAw0",
	initializeBondageAwakening, // initFunc
	"SE BoAw Start",
	function() { // Reqs
		var allowed = false;
		
		if ( gC("chClaw").domChar != "chNash" && gC("chClaw").domChar != "chPlayerCharacter" && gC("chClaw").domChar != "chMir" ) {
			if ( gC("chNash").domChar != "chClaw" && gC("chNash").domChar != "chMir" && gC("chNash").domChar != "chPlayerCharacter" ) {
				if ( gC("chMir").domChar != "chPlayerCharacter" && gC("chMir").domChar != "chNash" && gC("chMir").domChar != "chClaw" ) {
					if ( gC("chPlayerCharacter").domChar != "chNash" && gC("chPlayerCharacter").domChar != "chMir" && gC("chPlayerCharacter").domChar != "chClaw" ) {
						if ( gC("chNash").hasFreeBodypart("arms") && gC("chNash").hasFreeBodypart("legs") && gC("chClaw").hasFreeBodypart("arms") && gC("chClaw").hasFreeBodypart("legs") && gC("chMir").hasFreeBodypart("arms") && gC("chPlayerCharacter").hasFreeBodypart("arms") ) {
							allowed = true;
						}
					}
				}
			}
		}
		
		return allowed;
	},
	function() { // Weight
		var weight = 50;
		weight += rLvlAbt("chNash","chClaw","enmity") * 5 + rLvlAbt("chNash","chClaw","rivalry") * 3 + rLvlAbt("chClaw","chNash","enmity") * 5 + rLvlAbt("chClaw","chNash","rivalry") * 3 - rLvlAbt("chNash","chClaw","friendship") - rLvlAbt("chClaw","chNash","friendship") - rLvlAbt("chNash","chClaw","romance") - rLvlAbt("chClaw","chNash","romance");
		return weight;
	}
);

window.chooseRandomStoryEvent = function() {
	var result = "errorWList"; // Default error string returned by bugged weighted lists. If this is the end result, no event will be initialized
	var validEvents = []; // Event tags
	for ( var se in setup.eventsMetaInfo ) {
		if ( setup.eventsMetaInfo[se] instanceof eventMetaInfo ) { // Is an event
			if ( State.variables.eventsCalendar.playedStoryEvents.includes(setup.eventsMetaInfo[se].key) == false ) { // Event hasn't been played
				if ( setup.eventsMetaInfo[se].checkRequirements() ) { // Requirements are passed
					validEvents.push(setup.eventsMetaInfo[se].key);
				}
			}
		}
	}
	
	if ( validEvents.length > 0 ) {
		var wL = new weightedList();
		var i = 0;
		for ( var se of validEvents ) {
			wL[i] = new weightedElement(se,setup.eventsMetaInfo[se].getWeight());
			i++;
		}
		
		result = randomFromWeightedList(wL);
	}
	
	return result;
}

window.gEMI = function(eventFlag) {
	return setup.eventsMetaInfo[eventFlag];
}






