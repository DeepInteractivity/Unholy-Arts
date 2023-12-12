////////// DAY CYCLE CLASS  //////////
// Day Cycle contains and regulates information about current hour and day, which is often used during the simulation.

window.DayCycle = function() {
	this.hours = 0;
	this.minutes = 0;
	this.day = 1;
	this.month = 1;
	
	this.addMinutes = function(min) {
		
		var fiveMinsPeriods = this.getFiveMinsPeriods(min);
		var i = 0;
		while ( i < fiveMinsPeriods ) {
			this.fiveMinEffects();
			i++;
		}
		
		this.minutes += min;
		if ( this.minutes >= 60 ) {
			var extraHours = float2int(this.minutes / 60);
			this.minutes -= 60*extraHours;
			this.addHours(extraHours);
		}
	}
	this.addHours = function(hours) {
		this.hours += hours;
		// Summing days manually avoids some trouble
		/*
		if ( this.hours >= 24 ) {
			var extraDays = float2int(this.hours / 24);
			this.hours -= 24*extraDays;
			this.addDays(extraDays);
		}
		*/
		var i = 0;
		while ( i < hours ) {
			this.hourlyEffects();
			i++;
		}
	}
	this.addDays = function(days) {
		this.day += days;
		if ( this.day >= 31 ) {
			var extraMonths = float2int(this.day / 30);
			this.day -= 30*extraMonths;
			this.addMonths(extraMonths);
		}
	}
	this.addMonths = function(months) {
		this.month += months;
		if ( this.month >= 13 ) {
			var extraYears = float2int(this.month / 12);
			this.month -= 12*extraYears;
		}
	}
	this.setDate = function(month,day,hours,minutes) {
		this.month = month;
		this.day = day;
		this.hours = hours;
		this.minutes = minutes;
	}
	
	this.returnHourMin = function() {
		var string = String(this.hours).padStart(2,'0') + ":" + String(this.minutes).padStart(2,'0');
		return string;
	}
	this.returnMonthDay = function() {
		var string = "M" + this.month + " - D" + this.day;
		return string;
	}
	
	this.getFiveMinsPeriods = function(addedMins) {
		var initialQuotient = Math.floor(addedMins/5);
		var extraPeriod = 0;
		if ( (this.minutes % 5) + (addedMins % 5) ) {
			extraPeriod++;
		}
		var result = initialQuotient + extraPeriod;
		return result;
	}
	
	this.fiveMinEffects = function() {
		if ( isMapSimActive() ) {
			for ( var character of getCurrentMap().characters ) {
				gC(character).applyMoodDecay();
			}
		}
	}
	this.hourlyEffects = function() {
		// Natural recovery
		if ( isMapSimActive() ) {
			for ( var character of getCurrentMap().characters ) {
				characterNaturalRest(character,60);
			}
		}
	}
};

window.characterNaturalRest = function(character,minutes) {
	var percent = 0.02 * (minutes/60) * restingResultsVar();
	for ( var bar of ["lust","willpower","energy","socialdrive"] ) {
		charRecoversBarPercent(character,bar,percent);
	}
}

window.calculateMinutesDifference = function(hoursA,minutesA,hoursB,minutesB) {
	var result = 0;
	result += (hoursA - hoursB) * 60;
	result += minutesA - minutesB;
	return result;
}
window.calculateMinsDiffFromCurrentTime = function(hoursB,minutesB) {
	var result = 0;
	var hoursA = State.variables.daycycle.hours;
	var minutesA = State.variables.daycycle.minutes;
	result += (hoursA - hoursB) * 60;
	result += minutesA - minutesB;
	return result;
}

window.getTimeObject = function(hours,minutes) {
	var timeObject = new DayCycle();
	timeObject.minutes = minutes;
	timeObject.hours = hours;
	return timeObject;
}
window.getRelativeTimeString = function(addedMinutes) {
	// Creates a timeObject with current hours and minutes, adds a certain amount of minutes to it, then returns a string with the new hours/minutes
	var newTimeObject = getTimeObject(State.variables.daycycle.hours,State.variables.daycycle.minutes);
	newTimeObject.addMinutes(addedMinutes);
	return newTimeObject.returnHourMin();
}

window.getTimeArray = function() {
	return [State.variables.daycycle.hours,State.variables.daycycle.minutes];
}
window.areTimeArraysEqual = function(ar1,ar2) {
	var areEqual = true;
	if ( ar1[0] != ar2[0] ) {
		areEqual = false;
	} else if (ar1[1] != ar2[1]) {
		areEqual = false;
	}
	return areEqual;
}

///// Day Cycle
State.variables.daycycle = new DayCycle();
State.variables.daycycle.setDate(1,1,8,0);

// Constructors, serializers, etc.
DayCycle.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

DayCycle.prototype.clone = function () {
	return (new DayCycle())._init(this);
};

DayCycle.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new DayCycle())._init($ReviveData$)', ownData);
};
