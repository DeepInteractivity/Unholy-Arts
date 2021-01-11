//////// EVENTS CALENDAR ////////
// This class saves routines to determine which story events will be shown and when

// Ctrl + f: ECtag to find the actual events calendar.

window.EventsCalendar = function() {
	
	// This must be set to true when any event starts. It must be set to false when any event ends.
	// This must be considered on general-functions' refreshUIbars()
	this.activeEvent = false;
	
	this.getEndDayButton = function() {
		// This gets called at the end of the day in resting rooms.
		// This function should be edited by stablishTomorrowsEvent() regularly
		return this.getStandardNewDayButton();
	}
	this.customEventScript = function() {
		// This function should be edited by stablishTomorrowsEvent() regularly
		return 0;
	}
	
	// New day standards
	this.newDayLinkMessage = "Continue";
	this.newDayPassage = "Map";
	this.newDayScript = function() { 
		State.variables.personalRoom.initializeNewDay();
	}
	
	this.getStandardNewDayButton = function() {
		var bText = "<<l" + "ink [[" + this.newDayLinkMessage + "|" + this.newDayPassage + "]]>><<s" + "cript>>\n"
				  + "State.variables.eventsCalendar.newDayScript();\n"
				  + "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}	
	this.getNewDayButtonCustomMessage = function(message) {
		var bText = "<<l" + "ink [[" + message + "|" + this.newDayPassage + "]]>><<s" + "cript>>\n"
				  + "State.variables.eventsCalendar.getStandardNewDayButton();\n"
				  + "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	// Events
	this.stablishTomorrowsEvent = function() {
		
		// Standard new day functions: if they aren't edited later in this function, they retain their usual behavior
		this.getEndDayButton = function() {
			return this.getStandardNewDayButton();
		}
		this.customEventScript = function() {
			return 0;
		}
		
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
						this.customEventScript = initializeSeBeatingKittyIntoFriendship;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE Beating Kitty Into Friendship Start");
						}
						break;
					case 11:
						this.customEventScript = initializeSeBkifOutcome;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE BKIF Outcome Start");
						}
						break;
					case 12:
						this.customEventScript = initializeSeAspiringTreeClimber;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE Aspiring TC Start");
						}
						break;
					case 13:
						this.customEventScript = initializeSeLuringMasquerade;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("Luring Masquerade Start");
						}
						break;
					case 14:
						this.customEventScript = initializeSeGiftsForNature;
						this.getEndDayButton = function() {
							return this.getButtonToEvent("SE Gifts For Nature Start");
						}
						break;
				}
				break;
		}
	}
	
	this.getButtonToEvent = function(firstEventPassageName) {
		var bText = "<<l" + "ink [[" + this.newDayLinkMessage + "|" + firstEventPassageName + "]]>><<s" + "cript>>\n"
				  + "State.variables.eventsCalendar.activeEvent = true;\n"
				  + "State.variables.eventsCalendar.newDayScript();\n"
				  + "State.variables.eventsCalendar.customEventScript();\n"
				  + "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	this.finishEventButton = "";
	this.setFinishEventButton = function(message,script) {
		this.finishEventButton = this.getNewDayButtonCustomMessageCustomScript(message,script);
	}
	this.getNewDayButtonCustomMessageCustomScript = function(message,script) {
		var bText = "<<l" + "ink [[" + message + "|" + this.newDayPassage + "]]>><<s" + "cript>>\n"
				  + "State.variables.eventsCalendar.activeEvent = false;\n"
				  + script
				  + "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.cleanUIscriptText = function() {
		var sText = 'setNoPasChars();\n'
	}
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

