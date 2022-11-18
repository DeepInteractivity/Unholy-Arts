////////// JOBS ASSIGNER //////////
// Regulates jobs choice screen and jobs' logic

window.JobsAssigner = function() {
	this.candidatesInfo = []; // List of arrays with 2 elements. First element is character's key. Second element is job's title.
	this.possibleJobs = [];
	this.passageText = "";
	
	this.flagPlayerIsChoosing = false;
	
	this.initialWorkHours = 5;
	this.remainingWorkHours = 5;
	
	this.lastWorkInfo = "";
	
};

// Methods

	// Management
JobsAssigner.prototype.createInitialJobs = function() {
		this.possibleJobs.push(createRepairsJob(),createCleaningJob(),createTendCropsJob(),createBookResearchJob(),createOutdoorsCleaningJob(),
							   createAnalyzeFloraJob(),createDramaWritingJob(),createDramaCatalogueJob(),createSalfisGatheringJob());
	}
	
JobsAssigner.prototype.cleanWorkloads = function() {
		for ( var job of this.possibleJobs ) {
			job.availableWorkloads = 0;
			job.characters = [];
		}
	}
JobsAssigner.prototype.cleanWorkHours = function() {
		this.initialWorkHours = State.variables.simCycPar.templeWorkHours;
		this.remainingWorkHours = this.initialWorkHours;
	}
	
JobsAssigner.prototype.createRandomWorkloads = function(workloads) {
		var i = 0;
		while ( i < workloads ) {
			this.possibleJobs[limitedRandomInt(this.possibleJobs.length - 1)].availableWorkloads++;
			i++;
		}
	}
	
JobsAssigner.prototype.sortCandidates = function() { // Randomly decides the order in which Candidates will pick their jobs, and adds them to candidatesInfo
		this.candidatesInfo = [];
		var sortedCandidates = getRandomizedActiveSimulationCharactersArray();
		sortedCandidates = purgeGuestsNotAtTemple(sortedCandidates);
		for ( var candidate of sortedCandidates ) {
			this.candidatesInfo.push([candidate,""]);
		}
	}
JobsAssigner.prototype.sortCandidatesPCfirst = function() {
		this.candidatesInfo = [["chPlayerCharacter",""]];
		var sortedCandidates = shuffleArray("chNash","chVal","chClaw","chMir","chAte");
		for ( var candidate of sortedCandidates ) {
			this.candidatesInfo.push([candidate,""]);
		}
	}
JobsAssigner.prototype.sortCandidatesPClast = function() {
		this.candidatesInfo = [];
		var sortedCandidates = shuffleArray("chNash","chVal","chClaw","chMir","chAte");
		for ( var candidate of sortedCandidates ) {
			this.candidatesInfo.push([candidate,""]);
		}
		this.candidatesInfo.push(["chPlayerCharacter",""]);
	}
	
JobsAssigner.prototype.getAvailableJobsKeys = function() {
		var jobKeys = [];
		for ( var job of this.possibleJobs ) {
			if ( (job.availableWorkloads - job.takenWorkloads) > 0 ) {
				var i = 0;
				while ( i < (job.availableWorkloads - job.takenWorkloads) ) {
					jobKeys.push(job.key);
					i++;
				}
			}
		}
		return jobKeys;
	}
	
JobsAssigner.prototype.candidatesChooseJobs = function(candidatesKeys) { // Calls the AI function for each of these candidates to choose their jobs, and assigns them
		for ( var candidate of candidatesKeys ) {
			var jobKey = this.candidateChoosesJobRandom(candidate);
			this.assignJobToChar(candidate,jobKey);
		}
	}
	
	// UI
		// Jobs assignation
JobsAssigner.prototype.jobsInfoToPassageText = function() {
		for ( var job of this.possibleJobs ) {
			this.passageText += getJobDisplayText(job) + "\n";
		}
	}
JobsAssigner.prototype.availableJobsInfoToPassageText = function() {
		for ( var job of this.possibleJobs ) {
			if ( job.availableWorkloads > 0 ) {
				this.passageText += getJobDisplayText(job) + "\n";
			}
		}
	}
	
JobsAssigner.prototype.getCandidatesInfoPassageText = function() {
		var text = "";
		for ( var candidate of this.candidatesInfo ) {
			text += gC(candidate[0]).formattedName;
			if ( candidate[1] != "" ) {
				text += ": " + candidate[1];
			}
			text += "\n";
		}
		return text;
	}
	
JobsAssigner.prototype.formatStartingPassageText = function() {
		this.passageText += "__Candidates' order__:\n";
		this.passageText += this.getCandidatesInfoPassageText();
		this.passageText += "\nThese are today's available jobs:";
		this.passageText += "\n\n";
		this.availableJobsInfoToPassageText();
	}
JobsAssigner.prototype.passageTextToInitialState = function() {
		// this.passageText = this.getAdvanceToPlayerChoiceStateButton() + "\n\n";
		this.formatStartingPassageText();
	}
JobsAssigner.prototype.formatFinalJobAssignationPassageText = function() {
		this.passageText = "" + this.getAdvanceToModeChoiceButton() + "\n\n";
		this.passageText += "__Candidates' order__:\n";
		this.passageText += this.getCandidatesInfoPassageText();
		this.passageText += "\nThese are today's available jobs:";
		this.passageText += "\n\n";
		this.availableJobsInfoToPassageText();
	}
JobsAssigner.prototype.formatManualModePassageText = function() {
		this.passageText = "__Remaining working hours__: " + this.remainingWorkHours;
		
		var i = 0;
		while ( this.candidatesInfo[i][0] != "chPlayerCharacter" ) { i++; }
		var l = 0;
		while ( this.possibleJobs[l].title != this.candidatesInfo[i][1] ) { l++; }
		
		if ( this.remainingWorkHours > 0 ) {
			var i = 2;
			this.passageText += "\n\nCurrently working at: - __" + this.possibleJobs[l].title + "__\n" + this.possibleJobs[l].description;
			this.passageText += "\n\n__Choose effort__:\n";
			this.passageText += this.getLowEffortButton("Low",1);
			while ( i <= this.remainingWorkHours ) {
				this.passageText += " " + this.getLowEffortButton("x" + i,i);
				i++;
			}
			i = 2;
			this.passageText += "\n" + this.getMediumEffortButton("Medium",1);
			while ( i <= this.remainingWorkHours ) {
				this.passageText += " " + this.getMediumEffortButton("x" + i,i);
				i++;
			}
			i = 2;
			this.passageText += "\n" + this.getHighEffortButton("High",1);
			while ( i <= this.remainingWorkHours ) {
				this.passageText += " " + this.getHighEffortButton("x" + i,i);
				i++;
			}
		}
		
		if ( this.lastWorkInfo != "" ) {
			this.passageText += "\n\n" + this.lastWorkInfo;
			this.lastWorkInfo = "";
		}
		
		if ( this.remainingWorkHours <= 0 ) {
			this.passageText += "\n" + this.getFinishWorkButton();
		}
	}
JobsAssigner.prototype.formatAutoModePassageText = function() {
		this.passageText = "Work complete.\n\n";
		this.passageText += this.lastWorkInfo;
		this.passageText += this.getFinishWorkButton();
	}
	
		// Actual jobs
JobsAssigner.prototype.passageTextToPlayerChoosesMode = function() {
		this.passageText = "Choose the work mode:\n\n";
		this.passageText += this.getManualModeButton() + ": you will be asked how much effort you wish to use each round.\n";
		this.passageText += this.getAutoModeButton() + ": the amount of effort you put will be automatically decided.\n";
	}
	
	// AI
JobsAssigner.prototype.candidateChoosesJobRandom = function(charKey) { // Returns key of chosen job
		var avJobKeys = shuffleArray(this.getAvailableJobsKeys());
		return avJobKeys[0];
	}
	
JobsAssigner.prototype.candidateChoosesEffort = function(charKey,job) {
		var effort = 1; // Low
		if ( job.tier == 1 ) {
			if ( gC(charKey)[job.bar].current >= 80 ) {
				effort = 2;
			}
		}
		return effort;
	}
	
	// Logic
JobsAssigner.prototype.assignJobToChar = function(charKey,jobKey) {
		var jobI = 0; // Job Index
		var charI = 0; // Character Index
		while ( this.possibleJobs[jobI].key != jobKey ) {
			jobI++;
		}
		while ( this.candidatesInfo[charI][0] != charKey ) {
			charI++;
		}
		
		this.possibleJobs[jobI].characters.push(charKey);
		this.possibleJobs[jobI].takenWorkloads++;
		this.candidatesInfo[charI][1] = this.possibleJobs[jobI].title;
	}	
JobsAssigner.prototype.charactersBeforePCchooseJobs = function() {
		var charI = 0; // Char Index
		while ( this.candidatesInfo[charI][0] != "chPlayerCharacter" ) {
			this.candidatesChooseJobs([this.candidatesInfo[charI][0]]);
			charI++;
		}
	}	
JobsAssigner.prototype.charactersAfterPCchooseJobs = function() {
		var charI = 0; // Char Index
		while ( this.candidatesInfo[charI][0] != "chPlayerCharacter" ) {
			charI++;
		}
		charI++;
		while ( charI /*this.candidatesInfo[charI][0]*/ < 6 ) {
			this.candidatesChooseJobs([this.candidatesInfo[charI][0]]);
			charI++;
		}
	}
	
JobsAssigner.prototype.playerWorksOneHour = function(effort) {
		var i = 0;
		while ( this.candidatesInfo[i][0] != "chPlayerCharacter" ) { i++; }
		var l = 0;
		while ( this.possibleJobs[l].title != this.candidatesInfo[i][1] ) { l++; }
		
		if ( this.lastWorkInfo != "" ) { this.lastWorkInfo += "\n"; }
		this.lastWorkInfo += this.possibleJobs[l].effect("chPlayerCharacter",effort);
		
		this.minusOneRemainingHour();
	}
JobsAssigner.prototype.playerAutoWorks = function() {
		var i = 0;
		while ( this.candidatesInfo[i][0] != "chPlayerCharacter" ) { i++; }
		var l = 0;
		while ( this.possibleJobs[l].title != this.candidatesInfo[i][1] ) { l++; }
		
		var effort = this.candidateChoosesEffort("chPlayerCharacter",this.possibleJobs[l]);
		var i = 0;
		this.lastWorkInfo = "";
		while ( i < this.initialWorkHours ) {
			this.lastWorkInfo += this.possibleJobs[l].effect("chPlayerCharacter",effort) + "\n";
			this.minusOneRemainingHour();
			i++;
		}
	}
JobsAssigner.prototype.npcCandidatesWork = function() {
		for ( var job of this.possibleJobs ) {
			for ( var character of job.characters ) {
					if ( character != "chPlayerCharacter" ) {
					var i = 0;
					var effort = this.candidateChoosesEffort(character,job);
					while ( i < this.initialWorkHours ) {
						job.effect(character,effort);
						i++;
					}
				}
			}
		}
	}
	
JobsAssigner.prototype.minusOneRemainingHour = function() {
		// This function removes one remaining hour, and adds an hour to the current time. This is only invoked when the player is working.
		State.variables.daycycle.addHours(1);
		this.remainingWorkHours--;
	}
	
	// Buttons
	
		// No longer in use
JobsAssigner.prototype.getAdvanceToPlayerChoiceStateButton = function() {
		var bText = "<<l" + "ink [[Continue|Jobs Screen]]>><<s" + "cript>>\n";
		bText	 += "State.variables.jobsAssigner.charactersBeforePCchooseJobs();\n";
		bText	 += "State.variables.jobsAssigner.flagPlayerIsChoosing = true;\n";
		bText	 += 'State.variables.jobsAssigner.passageText = "";\n';
		bText	 += "State.variables.jobsAssigner.formatStartingPassageText();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
JobsAssigner.prototype.getPlayerChoosesJobButton = function(jobKey) {
		/*var bText = "<<l" + "ink [[Continue|Jobs Screen]]>><<s" + "cript>>\n";
		bText	 += 'State.variables.jobsAssigner.assignJobToChar("chPlayerCharacter","' + jobKey + '");\n';
		bText	 += "State.variables.jobsAssigner.flagPlayerIsChoosing = false;\n";
		bText	 += "State.variables.jobsAssigner.charactersAfterPCchooseJobs();\n";
		bText	 += 'State.variables.jobsAssigner.passageText = "";\n';
		bText	 += "State.variables.jobsAssigner.formatFinalJobAssignationPassageText();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>"; */
		
		var bText = "<<l" + "ink [[Choose on Manual Mode|Jobs Screen]]>><<s" + "cript>>\n";
		bText	 += 'State.variables.jobsAssigner.assignJobToChar("chPlayerCharacter","' + jobKey + '");\n';
		bText	 += "State.variables.jobsAssigner.flagPlayerIsChoosing = false;\n";
		bText	 += "State.variables.jobsAssigner.charactersAfterPCchooseJobs();\n";
		bText	 += 'State.variables.jobsAssigner.passageText = "";\n';
		bText	 += "State.variables.jobsAssigner.npcCandidatesWork();";
		bText	 += "State.variables.jobsAssigner.formatManualModePassageText();";
		bText	 += "<</s" + "cript>><</l" + "ink>>" + " | ";
		
		bText 	 += "<<l" + "ink [[Choose on Auto Mode|Jobs Screen]]>><<s" + "cript>>\n";
		bText	 += 'State.variables.jobsAssigner.assignJobToChar("chPlayerCharacter","' + jobKey + '");\n';
		bText	 += "State.variables.jobsAssigner.flagPlayerIsChoosing = false;\n";
		bText	 += "State.variables.jobsAssigner.charactersAfterPCchooseJobs();\n";
		bText	 += 'State.variables.jobsAssigner.passageText = "";\n';
		bText	 += "State.variables.jobsAssigner.npcCandidatesWork();";
		bText	 += "State.variables.jobsAssigner.playerAutoWorks();";	
		bText	 += "State.variables.jobsAssigner.formatAutoModePassageText();";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
JobsAssigner.prototype.getAdvanceToModeChoiceButton = function() {
		var bText = "<<l" + "ink [[Choose work mode|Jobs Screen]]>><<s" + "cript>>\n";
		bText	 += "State.variables.jobsAssigner.npcCandidatesWork();";
		bText	 += "State.variables.jobsAssigner.passageTextToPlayerChoosesMode();";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
JobsAssigner.prototype.getManualModeButton = function() {
		var bText = "<<l" + "ink [[Manual Mode|Jobs Screen]]>><<s" + "cript>>\n";
		bText	 += "State.variables.jobsAssigner.formatManualModePassageText();";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
JobsAssigner.prototype.getAutoModeButton = function() {
		var bText = "<<l" + "ink [[Auto Mode|Jobs Screen]]>><<s" + "cript>>\n";
		bText	 += "State.variables.jobsAssigner.playerAutoWorks();";		
		bText	 += "State.variables.jobsAssigner.formatAutoModePassageText();";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
JobsAssigner.prototype.getLowEffortButton = function(name,effortsAmount) {
		var i = 0;
		var bText = "<<l" + "ink [[" + name + "|Jobs Screen]]>><<s" + "cript>>\n";
		while ( i < effortsAmount ) {
			bText	 += "State.variables.jobsAssigner.playerWorksOneHour(1);\n";
			i++;
		}
		bText	 += "State.variables.jobsAssigner.formatManualModePassageText();";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
JobsAssigner.prototype.getMediumEffortButton = function(name,effortsAmount) {
		var i = 0;
		var bText = "<<l" + "ink [[" + name + "|Jobs Screen]]>><<s" + "cript>>\n";
		while ( i < effortsAmount ) {
			bText	 += "State.variables.jobsAssigner.playerWorksOneHour(2);\n";
			i++;
		}
		bText	 += "State.variables.jobsAssigner.formatManualModePassageText();";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
JobsAssigner.prototype.getHighEffortButton = function(name,effortsAmount) {
		var i = 0;
		var bText = "<<l" + "ink [[" + name + "|Jobs Screen]]>><<s" + "cript>>\n";
		while ( i < effortsAmount ) {
			bText	 += "State.variables.jobsAssigner.playerWorksOneHour(3);\n";
			i++;
		}
		bText	 += "State.variables.jobsAssigner.formatManualModePassageText();";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
JobsAssigner.prototype.getFinishWorkButton = function() {
		var bText = "The work period is now finished. The Candidates are free for the rest of the day.";
		bText	 += "\n\n<<l" + "ink [[Continue|Map]]>><<s" + "cript>>\n";
		bText	 += "State.variables.jobsAssigner.passageText = '';\n";
		bText	 += "State.variables.jobsAssigner.lastWorkInfo = '';\n";
		bText	 += "initSocializationPeriodPassionTemple();";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	// Engine
JobsAssigner.prototype.initJobsAssigner = function() {
		// Init
		this.lastWorkInfo = "";
		this.possibleJobs = [];
		this.createInitialJobs();
		this.sortCandidates();	
		// Management
		this.cleanWorkloads();
		this.cleanWorkHours();
		var workloads = purgeGuestsNotAtTemple(State.variables.activeSimulationCharacters).length;
		workloads = workloads * 1.2 - 1;
		this.createRandomWorkloads(workloads);
		
		// Candidates before player choose work
		this.charactersBeforePCchooseJobs();
		this.flagPlayerIsChoosing = true;
		
		// Display
		this.passageText = "";
		this.passageTextToInitialState();		
	}

State.variables.jobsAssigner = new JobsAssigner();

// Constructors, serializers, etc.
JobsAssigner.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
JobsAssigner.prototype.clone = function () {
	return (new JobsAssigner())._init(this);
};
JobsAssigner.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new JobsAssigner())._init($ReviveData$)', ownData);
};

////////// JOBS //////////
// Actual jobs

window.Job = function(key,title) {
	this.key = key;
	this.title = title;
	this.description = "";
	
	this.tier = 1;
	
	this.availableWorkloads = 0; // Amount of times this job may be taken in the current day
	this.takenWorkloads = 0;
	this.characters = []; // Characters who have taken at least one workload
	
	this.effect;
};

window.getJobDisplayText = function(job) {
	var text = "- __" + job.title + "__ - Available workloads: " + (job.availableWorkloads - job.takenWorkloads);
	if ( State.variables.jobsAssigner.flagPlayerIsChoosing == true && (job.availableWorkloads - job.takenWorkloads) > 0 ) {
		text += " - " + State.variables.jobsAssigner.getPlayerChoosesJobButton(job.key);
	}
	text += "\n" + job.description + "\n";
	return text;
}

window.tierOneJobEffect = function(charKey,stat,bar,effort) {
	var moneyFactor = 1; // Multiplies the amount of earned money
	var statExpFactor = 0.5; // Multiplies the amount of earned exp
	var baseMoneyFactor = 0.8 // Multiplies how much money is earned without stats
	var statMoneyFactor = 0.02; // Multiplies how relevant is a stat in earning money
	
	var energyChange = 0;
	var expChange = 0;
	var moneyChange = 0;
	
	switch(effort) {
		case 1: // Low effort
			expChange += 100 * statExpFactor * 0.6;
			moneyChange = 100 * moneyFactor * 0.6 * ( baseMoneyFactor + gC(charKey)[stat].getValue() * statMoneyFactor );
			break;
		case 2: // Medium effort
			if ( gC(charKey)[bar].current >= 10 ) {
				energyChange = -10;
				expChange = 100 * statExpFactor * 1;
				moneyChange = 100 * moneyFactor * 1 * ( baseMoneyFactor + gC(charKey)[stat].getValue() * statMoneyFactor );
			} else { // Not enough energy for medium effort
				gC(charKey)[bar].current = 0;
				energyChange = -1; // Special Value
				expChange = 100 * statExpFactor * 0.4;
				moneyChange = 100 * moneyFactor * 0.4 * ( baseMoneyFactor + gC(charKey)[stat].getValue() * statMoneyFactor );
			}
			break;
		case 3: // High effort
			if ( gC(charKey)[bar].current >= 20 ) {
				energyChange = -20;
				expChange = 100 * statExpFactor * 1.2;
				moneyChange = 100 * moneyFactor * 1.2 * ( baseMoneyFactor + gC(charKey)[stat].getValue() * statMoneyFactor );				
			} else { // Not enough energy for high effort
				gC(charKey)[bar].current = 0;
				energyChange = -1; // Special value
				expChange = 100 * statExpFactor * 0.2;
				moneyChange = 100 * moneyFactor * 0.2 * ( baseMoneyFactor + gC(charKey)[stat].getValue() * statMoneyFactor );
			}
			break;
	}
	
	if ( energyChange == -1 ) {
		gC(charKey)[bar].current = 0;
	} else {
		gC(charKey)[bar].current += energyChange;
	}
	gC(charKey)[stat].experience += expChange;
	gC(charKey).money += moneyChange;
	
	return [ energyChange , expChange , moneyChange ]; // Array with all relevant values
}
window.createTierOneResultsMessage = function(charKey,resultsArray,stat,bar) {
	var text = "";
	if ( resultsArray[0] == -1 ) { // Ran out of energy
		text += gC(charKey).getFormattedName() + " ran out of " + getBarName(bar) +".\n";
	} else {
		text += gC(charKey).getFormattedName() + " lost " + (resultsArray[0] * -1).toFixed(1) + " " + getBarName(bar) + ".\n";
	}
	text += gC(charKey).getFormattedName() + " gained " + resultsArray[1].toFixed(1) + " " + firstToCap(stat) + " experience points.\n";
	text += gC(charKey).getFormattedName() + " worked for a total of " + resultsArray[2].toFixed(1) + " Veerens.\n";
	return text;
}

window.createRepairsJob = function() {
	var job = new Job("repairs","Repair the Temple");
	job.description = "We have found some deterioration on the Temple's structure, which needs to be repaired or rebuilt."
					+ "\nUses physique and energy, trains physique.";
	job.stat = "physique";
	job.bar = "energy";
	job.effect = function(charKey,effort) {
		var results = tierOneJobEffect(charKey,this.stat,this.bar,effort);
		return createTierOneResultsMessage(charKey,results,this.stat,this.bar);
	}
	return job;
}
window.createCleaningJob = function() {
	var job = new Job("cleaning","Clean the halls");
	job.description = "The indoors of the Temple require some cleaning.\nUses agility and energy, trains agility.";
	job.stat = "agility";
	job.bar = "energy";
	job.effect = function(charKey,effort) {
		var results = tierOneJobEffect(charKey,this.stat,this.bar,effort);
		return createTierOneResultsMessage(charKey,results,this.stat,this.bar);
	}
	return job;
}
window.createTendCropsJob = function() {
	var job = new Job("tendCrops","Tend the crops");
	job.description = "We need to sow, water or harvest some of our crops.\nUses resilience and energy, trains resilience.";
	job.stat = "resilience";
	job.bar = "energy";
	job.effect = function(charKey,effort) {
		var results = tierOneJobEffect(charKey,this.stat,this.bar,effort);
		return createTierOneResultsMessage(charKey,results,this.stat,this.bar);
	}
	return job;
}
window.createBookResearchJob = function() {
	var job = new Job("bookResearch","Research spell books");
	job.description = "Taototh wants someone to study some old spell books, and hopefully find something useful."
					+ "\nUses intelligence and willpower, trains intelligence.";
	job.stat = "intelligence";
	job.bar = "willpower";
	job.effect = function(charKey,effort) {
		var results = tierOneJobEffect(charKey,this.stat,this.bar,effort);
		return createTierOneResultsMessage(charKey,results,this.stat,this.bar);
	}
	return job;
}
window.createOutdoorsCleaningJob = function() {
	var job = new Job("outdoorCleaning","Clean the outdoors");
	job.description = "Leaves and other rests of nature have piled up in our outdoors. Use magic to get them out of the way."
					+ "\nUses will and willpower, trains will.";
	job.stat = "will";
	job.bar = "willpower";
	job.effect = function(charKey,effort) {
		var results = tierOneJobEffect(charKey,this.stat,this.bar,effort);
		return createTierOneResultsMessage(charKey,results,this.stat,this.bar);
	}
	return job;
}
window.createAnalyzeFloraJob = function() {
	var job = new Job("analysisFlora","Analyze the local flora");
	job.description = "We need a report on the growth and state of the local flora. Explore our surrounding gardens and forests"
					+ " and take notes about it.\nUses perception and willpower, trains perception.";
	job.stat = "perception";
	job.bar = "willpower";
	job.effect = function(charKey,effort) {
		var results = tierOneJobEffect(charKey,this.stat,this.bar,effort);
		return createTierOneResultsMessage(charKey,results,this.stat,this.bar);
	}
	return job;
}
window.createDramaWritingJob = function() {
	var job = new Job("dramaWriting","Write new dramas");
	job.description = "We want to expand our drama library. Write some scripts and we may add them to the collection."
					+ "\nUses charisma and social drive, trains charisma.";
	job.stat = "charisma";
	job.bar = "socialdrive";
	job.effect = function(charKey,effort) {
		var results = tierOneJobEffect(charKey,this.stat,this.bar,effort);
		return createTierOneResultsMessage(charKey,results,this.stat,this.bar);
	}
	return job;
}
window.createDramaCatalogueJob = function() {
	var job = new Job("dramaCatalogue","Catalogue old dramas");
	job.description = "We have some unsorted texts in the drama library. Analyze them in order to properly catalogue them."
					+ "\nUses empathy and social drive, trains empathy.";
	job.stat = "empathy";
	job.bar = "socialdrive";
	job.effect = function(charKey,effort) {
		var results = tierOneJobEffect(charKey,this.stat,this.bar,effort);
		return createTierOneResultsMessage(charKey,results,this.stat,this.bar);
	}
	return job;
}
window.createSalfisGatheringJob = function() {
	var job = new Job("salfisGathering","Gather salfis flowers");
	job.description = "Salfis flowers are very efficient at storing magic energy, and we have to replenish our stock. "
					+ "Gather some of them in the surrounding forests.\nUses luck and willpower, trains luck.";
	job.stat = "luck";
	job.bar = "willpower";
	job.effect = function(charKey,effort) {
		var results = tierOneJobEffect(charKey,this.stat,this.bar,effort);
		return createTierOneResultsMessage(charKey,results,this.stat,this.bar);
	}
	return job;
}

// Constructors, serializers, etc.
Job.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
Job.prototype.clone = function () {
	return (new Job())._init(this);
};
Job.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Job())._init($ReviveData$)', ownData);
};

