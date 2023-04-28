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
					case 6:
						this.customEventScript = initializeTributeForTheGoddess;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("TftG Init1");
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

window.eventMetaInfo = function(validEvent,validClairvoyanceCard,name,key,initializeFunction,initialPassage,checkRequirements,getWeight) {
	this.validEvent = validEvent;
	this.validClairvoyanceCard = validClairvoyanceCard;
	
	// Event Management Data
	this.name = name;
	this.key = key;
	this.initializeFunction = initializeFunction;
	this.initialPassage = initialPassage;
	this.checkRequirements = checkRequirements;
	this.getWeight = getWeight;
	
	// Clairvoyance Data
	this.clairvoyanceData = null;
}
window.emiClaivoyanceData = function(crypticName,reqsToBeShown,reqsToAppear,hints) {
	this.crypticName = crypticName;
	this.reqsToBeShown = reqsToBeShown; // Bool Function, logical requisites required for the event to be shown during clairvoyance
	this.reqsToAppear = reqsToAppear; // Text Function, text that formats the requisites for the event to appear as text to be displayed
	this.hints = hints; // List of Text Functions, text that formats potential hints that might be displayed as text to the player
}

window.formatClairvoyanceCheck = function(checkName,cvsRequired,revealedText) {
	var cct = checkName + " - " + colorText("CVS check (" + cvsRequired + "): ","mediumpurple");
	if ( State.variables.StVars.check1 >= cvsRequired ) {
		cct += colorText("Passed.\n","green");
		cct += revealedText;
	} else {
		cct += colorText("Failed.\n","firebrick");
	}
	return cct;
}
window.formatRequisiteForClairvoyance = function(reqName,reqFunc) {
	var fText = "- " + reqName + ": ";
	if ( reqFunc() ) {
		fText += colorText("Passed.","greenyellow");
	} else {
		fText += colorText("Not passed.","red");
	}
	fText += "\n";
	return fText;
}

window.formatAllClairvoyance = function() {
	var eventsMetaInfo = gEMI
	
	var eventCardsList = []; // Event info cards
	for ( var se in setup.eventsMetaInfo ) {
		if ( setup.eventsMetaInfo[se] instanceof eventMetaInfo ) { // Is an eventMetaInfo object
			if ( setup.eventsMetaInfo[se].validClairvoyanceCard && setup.eventsMetaInfo[se].clairvoyanceData != null ) { // Has a valid clairvoyance card
				if ( State.variables.eventsCalendar.playedStoryEvents.includes(setup.eventsMetaInfo[se].key) == false ) { // Event hasn't been played
					if ( setup.eventsMetaInfo[se].clairvoyanceData.reqsToBeShown() ) {
						eventCardsList.push(setup.eventsMetaInfo[se].clairvoyanceData);
					}
				}
			}
		}
	}
	
	var fInfo = "";
	if ( eventCardsList.length < 1 ) {
		fInfo = "The orb has no secrets for you.\n\n";
	} else {
		for ( var cd of eventCardsList ) {
			fInfo += "· __" + cd.crypticName + "__\n" + cd.reqsToAppear() + "\n";
			fInfo += "";
		}
	}
	
	return fInfo;
}

setup.eventsMetaInfo = [];
setup.eventsMetaInfo["atc0"] = new eventMetaInfo( // "Aspiring Tree Climber"
	true,true,
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
setup.eventsMetaInfo["atc0"].clairvoyanceData = new emiClaivoyanceData(
	"When the Beastkin practices her hunting skills", // Cryptic Name
	function() { // Reqs to be shown
		return true; // Might always be shown
	},
	function() { // Reqs to appear
		var reqsText = formatClairvoyanceCheck("Requisites",30,formatRequisiteForClairvoyance("Player has free arms", function() {
			var b = false;
			if ( gC("chPlayerCharacter").body.hasOwnProperty("arms") ) {
				if ( gC("chPlayerCharacter").body.arms.state == "free" ) {
					b = true;
				}
			}
			return b;
		}) + formatRequisiteForClairvoyance("Player has free legs", function() {
			var b = false;
			if ( gC("chPlayerCharacter").body.hasOwnProperty("legs") ) {
				if ( gC("chPlayerCharacter").body.legs.state == "free" ) {
					b = true;
				}
			}
			return b;
		}) + formatRequisiteForClairvoyance("Claw has free arms", function() {
			var b = false;
			if ( gC("chClaw").body.hasOwnProperty("arms") ) {
				if ( gC("chClaw").body.arms.state == "free" ) {
					b = true;
				}
			}
			return b;
		}) + formatRequisiteForClairvoyance("Claw has free legs", function() {
			var b = false;
			if ( gC("chClaw").body.hasOwnProperty("legs") ) {
				if ( gC("chClaw").body.legs.state == "free" ) {
					b = true;
				}
			}
			return b;
		}));
		return reqsText;
	},
	null // Hints
);

setup.eventsMetaInfo["gfn0"] = new eventMetaInfo( // "Gifts For Nature"
	true,true,
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
setup.eventsMetaInfo["gfn0"].clairvoyanceData = new emiClaivoyanceData(
	"When you and the Leirien collect offering from nature", // Cryptic Name
	function() { // Reqs to be shown
		return true; // Might always be shown
	},
	function() { // Reqs to appear
		var reqsText = formatClairvoyanceCheck("Requisites",20,formatRequisiteForClairvoyance("Wait a few days", function() {
			var b = true;
			return b;
		}));
		return reqsText;
	},
	null // Hints
);

setup.eventsMetaInfo["dto0"] = new eventMetaInfo( // "Discovering The Others"
	true,true,
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
setup.eventsMetaInfo["dto0"].clairvoyanceData = new emiClaivoyanceData(
	"When the Aiishen asks for your help to study something alien to her", // Cryptic Name
	function() { // Reqs to be shown
		return true; // Might always be shown
	},
	function() { // Reqs to appear
		var reqsText = formatClairvoyanceCheck("Requisites",20,formatRequisiteForClairvoyance("Wait a few days", function() {
			var b = true;
			return b;
		}));
		return reqsText;
	},
	null // Hints
);

setup.eventsMetaInfo["gol0"] = new eventMetaInfo( // "The Grapes of Lust"
	true,true,
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

setup.eventsMetaInfo["gol0"].clairvoyanceData = new emiClaivoyanceData(
	"When someone's excessive focus leads to her getting taken advantage of", // Cryptic Name
	function() { // Reqs to be shown
		return true; // Might always be shown
	},
	function() { // Reqs to appear
		var reqsText = formatClairvoyanceCheck("Requisites (1)",40,formatRequisiteForClairvoyance("Neither Maaterasu nor Valtan are submissive to " + gC("chPlayerCharacter").getName(), function() {
			var b = false;
			if ( gC("chPlayerCharacter").subChars.includes("chVal") == false && gC("chPlayerCharacter").subChars.includes("chAte") == false ) {
				b = true;
			}
			return b;
		}) + formatRequisiteForClairvoyance("Neither " + gC("chPlayerCharacter").getName() + " nor Valtan are submissive to Maaterasu", function() {
			var b = false;
			if ( gC("chAte").subChars.includes("chVal") == false && gC("chAte").subChars.includes("chPlayerCharacter") == false ) {
				b = true;
			}
			return b;
		}) + formatRequisiteForClairvoyance("Neither " + gC("chPlayerCharacter").getName() + " nor Maaterasu are submissive to Valtan", function() {
			var b = false;
			if ( gC("chVal").subChars.includes("chPlayerCharacter") == false && gC("chVal").subChars.includes("chAte") == false ) {
				b = true;
			}
			return b;
		})) + formatClairvoyanceCheck("Requisites (2)",70,formatRequisiteForClairvoyance("A specific bodypart of Valtan isn't blocked", function() {
			var b = false;
			if ( gC("chVal").body.hasOwnProperty("mouth") ) {
				if ( gC("chVal").body.mouth.state == "free" ) {
					b = true;
				}
			}
			return b;
		})) + formatClairvoyanceCheck("Requisites (3)",80,formatRequisiteForClairvoyance("Specific bodyparts of " + gC("chPlayerCharacter").name + " and Maaterasu aren't blocked", function() {
			var b = false;
			if ( gC("chPlayerCharacter").body.hasOwnProperty("mouth") && gC("chAte").body.hasOwnProperty("mouth") ) {
				if ( gC("chPlayerCharacter").body.mouth.state == "free" && gC("chAte").body.mouth.state == "free" ) {
					b = true;
				}
			}
			return b;
		})) + formatClairvoyanceCheck("Requisites (4)",110,formatRequisiteForClairvoyance("Valtan's pussy isn't blocked", function() {
			var b = false;
			if ( gC("chVal").body.hasOwnProperty("mouth") ) {
				if ( gC("chVal").body.mouth.state == "free" ) {
					b = true;
				}
			}
			return b;
		})) + formatClairvoyanceCheck("Requisites (5)",120,formatRequisiteForClairvoyance("The mouths of " + gC("chPlayerCharacter").name + " and Maaterasu aren't blocked", function() {
			var b = false;
			if ( gC("chPlayerCharacter").body.hasOwnProperty("mouth") && gC("chAte").body.hasOwnProperty("mouth") ) {
				if ( gC("chPlayerCharacter").body.mouth.state == "free" && gC("chAte").body.mouth.state == "free" ) {
					b = true;
				}
			}
			return b;
		}));
		return reqsText;
	},
	null // Hints
);

setup.eventsMetaInfo["mt1"] = new eventMetaInfo( // "Martial Tutorship I"
	true,true,
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
setup.eventsMetaInfo["mt1"].clairvoyanceData = new emiClaivoyanceData(
	"When the Ashwalker teaches you the basics of martial combat", // Cryptic Name
	function() { // Reqs to be shown
		return true; // Might always be shown
	},
	function() { // Reqs to appear
		var reqsText = formatClairvoyanceCheck("Requisites (1)",40,formatRequisiteForClairvoyance("Nashillbyir is the tutor of " + gC("chPlayerCharacter").getName(), function() {
			var b = false;
			if ( gC("chNash").subChars.includes("chPlayerCharacter") ) {
				if ( gC("chPlayerCharacter").relations.chNash.relType.type == "tutorship" ) {
					b = true;
				}
			}
			return b;
		})) + formatClairvoyanceCheck("Requisites (2)",70,formatRequisiteForClairvoyance("Nashillbyir has free arms and legs", function() {
			var b = false;
			if ( gC("chNash").hasFreeBodypart("arms") && gC("chNash").hasFreeBodypart("legs") ) {
				b = true;
			}
			return b;
		})) + formatClairvoyanceCheck("Requisites (3)",80,formatRequisiteForClairvoyance(gC("chPlayerCharacter").name + " has free arms and legs, or they have been locked by Nashillbyir", function() {
			var b = false;
			if ( ( gC("chPlayerCharacter").hasFreeBodypart("arms") || getEquipById(gC("chPlayerCharacter").body.arms.bondage).owner == "chNash" ) && ( gC("chPlayerCharacter").hasFreeBodypart("legs") || getEquipById(gC("chPlayerCharacter").body.legs.bondage).owner == "chNash" ) ) {
				b = true;
			}
			return b;
		}));
		return reqsText;
	},
	null // Hints
);

setup.eventsMetaInfo["fak0"] = new eventMetaInfo( // "Flaunting A Kitty"
	true,true,
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
setup.eventsMetaInfo["fak0"].clairvoyanceData = new emiClaivoyanceData(
	"When you consider whether to mercilessly get a good girl teased by your resentful servant", // Cryptic Name
	function() { // Reqs to be shown
		return true; // Might always be shown
	},
	function() { // Reqs to appear
		var reqsText = formatClairvoyanceCheck("Requisites (1)",60,formatRequisiteForClairvoyance("You have at least 12 charisma", function() {
			var b = false;
			if ( gCstat("chPlayerCharacter","charisma") >= 12 ) {
				b = true;
			}
			return b;
		})) + formatClairvoyanceCheck("Requisites (2)",70,formatRequisiteForClairvoyance("Padmiri is submissive no one", function() {
			var b = false;
			if ( gC("chMir").domChar == null ) {
				b = true;
			}
			return b;
		})) + formatClairvoyanceCheck("Requisites (3)",80,formatRequisiteForClairvoyance("Fiercest Claw is submissive to you", function() {
			var b = false;
			if ( gC("chClaw").domChar == "chPlayerCharacter" ) {
				b = true;
			}
			return b;
		})) + formatClairvoyanceCheck("Requisites (4)",100,formatRequisiteForClairvoyance("Fiercest Claw has a free mouth", function() {
			var b = false;
			if ( gC("chClaw").hasFreeBodypart("mouth") ) {
				b = true;
			}
			return b;
		}) + formatRequisiteForClairvoyance("Padmiri has a free pussy", function() {
			var b = false;
			if ( gC("chMir").hasFreeBodypart("pussy") ) {
				b = true;
			}
			return b;
		}));
		return reqsText;
	},
	null // Hints
);

setup.eventsMetaInfo["BAw0"] = new eventMetaInfo( // "Bondage Awakening"
	true,true,
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
setup.eventsMetaInfo["BAw0"].clairvoyanceData = new emiClaivoyanceData(
	"When the Leirien's patience is challenged, and she feels the desire to unleash punishment", // Cryptic Name
	function() { // Reqs to be shown
		return true; // Might always be shown
	},
	function() { // Reqs to appear
		var reqsText = formatClairvoyanceCheck("Requisites (1)",40,formatRequisiteForClairvoyance("Claw isn't submissive to " + gC("chPlayerCharacter").name + ", Nashillbyir or Padmiri", function() {
			var b = false;
			if ( gC("chClaw").domChar != "chNash" && gC("chClaw").domChar != "chPlayerCharacter" && gC("chClaw").domChar != "chMir" ) {
				b = true;
			}
			return b;
		}) + formatRequisiteForClairvoyance("Nashillbyir isn't submissive to " + gC("chPlayerCharacter").name + ", Claw or Padmiri", function() {
			var b = false;
			if ( gC("chNash").domChar != "chClaw" && gC("chNash").domChar != "chMir" && gC("chNash").domChar != "chPlayerCharacter" ) {
				b = true;
			}
			return b;
		}) + formatRequisiteForClairvoyance("Padmiri isn't submissive to " + gC("chPlayerCharacter").name + ", Claw or Nashillbyir", function() {
			var b = false;
			if ( gC("chMir").domChar != "chPlayerCharacter" && gC("chMir").domChar != "chNash" && gC("chMir").domChar != "chClaw" ) {
				b = true;
			}
			return b;
		}) + formatRequisiteForClairvoyance(gC("chPlayerCharacter").name + " isn't submissive to Claw, Nashillbyir or Padmiri", function() {
			var b = false;
			if ( gC("chPlayerCharacter").domChar != "chNash" && gC("chPlayerCharacter").domChar != "chMir" && gC("chPlayerCharacter").domChar != "chClaw" ) {
				b = true;
			}
			return b;
		}))	+ formatClairvoyanceCheck("Requisites (2)",60,formatRequisiteForClairvoyance("Nashillbyir has free arms and legs", function() {
			var b = false;
			if ( gC("chNash").hasFreeBodypart("arms") && gC("chNash").hasFreeBodypart("legs") ) {
				b = true;
			}
			return b;
		}) + formatRequisiteForClairvoyance("Fiercest Claw has free arms and legs", function() {
			var b = false;
			if ( gC("chClaw").hasFreeBodypart("arms") && gC("chClaw").hasFreeBodypart("legs") ) {
				b = true;
			}
			return b;
		})) + formatClairvoyanceCheck("Requisites (3)",70,formatRequisiteForClairvoyance("Padmiri has free arms", function() {
			var b = false;
			if ( gC("chMir").hasFreeBodypart("arms") ) {
				b = true;
			}
			return b;
		}) + formatRequisiteForClairvoyance(gC("chPlayerCharacter").name + " has free arms and legs", function() {
			var b = false;
			if ( gC("chPlayerCharacter").hasFreeBodypart("arms") ) {
				b = true;
			}
			return b;
		}));
		return reqsText;
	},
	null // Hints
);

setup.eventsMetaInfo["lm0"] = new eventMetaInfo( // "Luring Masquerade"
	true,true,
	"Luring Masquerade",
	"lm0",
	initializeSeLuringMasquerade, // initFunc
	"Luring Masquerade Start",
	function() { // Reqs
		var allowed = true;
		if ( gC("chVal").body.hasOwnProperty("legs") && gC("chPlayerCharacter").body.hasOwnProperty("legs") && gC("chMir").body.hasOwnProperty("legs") ) {
			if ( gC("chVal").body.legs.state != "free" || gC("chPlayerCharacter").body.legs.state != "free" || gC("chMir").body.legs.state != "free" ) {
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
setup.eventsMetaInfo["lm0"].clairvoyanceData = new emiClaivoyanceData(
	"When your body attracts too much attention during one kind morning", // Cryptic Name
	function() { // Reqs to be shown
		return true; // Might always be shown
	},
	function() { // Reqs to appear
		var reqsText = formatClairvoyanceCheck("Requisites (1)",30,formatRequisiteForClairvoyance("Player has free legs", function() {
			var b = false;
			if ( gC("chPlayerCharacter").body.hasOwnProperty("legs") ) {
				if ( gC("chPlayerCharacter").body.legs.state == "free" ) {
					b = true;
				}
			}
			return b;
		}) + formatRequisiteForClairvoyance("Padmiri has free legs", function() {
			var b = false;
			if ( gC("chMir").body.hasOwnProperty("legs") ) {
				if ( gC("chMir").body.legs.state == "free" ) {
					b = true;
				}
			}
			return b;
		})) + formatClairvoyanceCheck("Requisites (2)",40,formatRequisiteForClairvoyance(gC("chPlayerCharacter").name + " isn't submissive to Padmiri", function() {
			var b = false;
			if ( gC("chMir").subChars.includes("chPlayerCharacter") == false ) {
				b = true;
			}
			return b;
		}) + formatRequisiteForClairvoyance("Padmiri isn't submissive to " + gC("chPlayerCharacter").name, function() {
			var b = false;
			if ( gC("chPlayerCharacter").subChars.includes("chMir") == false ) {
				b = true;
			}
			return b;
		})) + formatClairvoyanceCheck("Requisites (3)",300,formatRequisiteForClairvoyance("Valtan has free legs", function() {
			var b = false;
			if ( gC("chVal").body.hasOwnProperty("legs") ) {
				if ( gC("chVal").body.legs.state == "free" ) {
					b = true;
				}
			}
			return b;
		}) + formatRequisiteForClairvoyance("Valtan isn't submissive to " + gC("chPlayerCharacter").name + " or Padmiri", function() {
			var b = false;
			if ( gC("chVal").domChar != "chPlayerCharacter" && gC("chVal").domChar != "chMir" ) {
				b = true;
			}
			return b;
		}) + formatRequisiteForClairvoyance(gC("chPlayerCharacter").name + " and Padmiri aren't submissive to Valtan", function() {
			var b = false;
			if ( gC("chVal").subChars.includes("chPlayerCharacter") == false && gC("chVal").subChars.includes("chMir") == false ) {
				b = true;
			}
			return b;
		}) + formatRequisiteForClairvoyance("Valtan doesn't have an egalitarian special relationship with " + gC("chPlayerCharacter").name + " or Padmiri.", function() {
			var b = false;
			if ( gC("chVal").egaChars.includes("chPlayerCharacter") == false && gC("chVal").egaChars.includes("chMir") == false ) {
				b = true;
			}
			return b;
		}))
		return reqsText;
	},
	null // Hints
);

setup.eventsMetaInfo["stn"] = new eventMetaInfo( // "Sharing the Night"
	true,true,
	"Sharing the Night",
	"stn",
	initializeSeSharingTheNight, // initFunc
	"Sharing the Night Start",
	function() { // Reqs
		var allowed = false;
		
		if ( State.variables.daycycle.month > 1 ) {
			for ( var cK of ["chNash","chMir","chVal","chClaw","chAte"] ) {
				var relPoints = rLvlAbt(cK,"chPlayerCharacter","romance") * 3 + rLvlAbt(cK,"chPlayerCharacter","sexualTension") * 3 - rLvlAbt(cK,"chPlayerCharacter","rivalry") * 2 - rLvlAbt(cK,"chPlayerCharacter","enmity") * 5;
				if ( relPoints >= 18 ) {
					allowed = true;
				}
			}
		}
		return allowed;
	},
	function() { // Weight
		var weight = 100;
		
		return weight;
	}
);
setup.eventsMetaInfo["stn"].clairvoyanceData = new emiClaivoyanceData(
	"When you're invited to share the night", // Cryptic Name
	function() { // Reqs to be shown
		var result = false;
		if ( State.variables.daycycle.month > 1 ) {
			result = true;
		}
		return result; // 
	},
	function() { // Reqs to appear
		var reqsText = formatClairvoyanceCheck("Requisites",50,formatRequisiteForClairvoyance("You have a growing intimate relationship with at least one other Candidate.", function() {
			var b = false;
			for ( var cK of ["chNash","chMir","chVal","chClaw","chAte"] ) {
				var relPoints = rLvlAbt(cK,"chPlayerCharacter","romance") * 3 + rLvlAbt(cK,"chPlayerCharacter","sexualTension") * 3 - rLvlAbt(cK,"chPlayerCharacter","rivalry") * 2 - rLvlAbt(cK,"chPlayerCharacter","enmity") * 5;
				if ( relPoints >= 18 ) {
					b = true;
				}
			}
			return b;
		}))
//		+ formatClairvoyanceCheck("Hints",75,formatRequisiteForClairvoyance("Your dominance and submission towards other may limit your options.", function() {
//			var b = true;
//			return b;
//		}))
		;
		return reqsText;
	},
	null // Hints
);

/*
setup.eventsMetaInfo["gd3"] = new eventMetaInfo( // "A Sacrifice of Aether"
	true,false,
	"A Sacrifice of Aether",
	"gd3",
	initializeSacrificeOfAether, // initFunc
	"SE A Sacrifice of Aether Start",
	function() { // Reqs
		var allowed = false;
		
		if ( State.variables.storyState >= storyState.secondLoop && ( State.variables.daycycle.month > 2 || State.variables.daycycle.day >= 10 ) ) {
			allowed = true;
		}
		
		return allowed;
	},
	function() { // Weight
		var weight = 500;
		return weight;
	}
);
*/
window.chooseRandomStoryEvent = function() {
	var result = "errorWList"; // Default error string returned by bugged weighted lists. If this is the end result, no event will be initialized
	var validEvents = []; // Event tags
	for ( var se in setup.eventsMetaInfo ) {
		if ( setup.eventsMetaInfo[se] instanceof eventMetaInfo ) { // Is an eventMetaInfo object
			if ( setup.eventsMetaInfo[se].validEvent ) { // Is an event
				if ( State.variables.eventsCalendar.playedStoryEvents.includes(setup.eventsMetaInfo[se].key) == false ) { // Event hasn't been played
					if ( setup.eventsMetaInfo[se].checkRequirements() ) { // Requirements are passed
						validEvents.push(setup.eventsMetaInfo[se].key);
					}
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






