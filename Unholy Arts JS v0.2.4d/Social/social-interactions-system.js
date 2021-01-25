////////// SIS Player Info  //////////
// Short set of data containing controls info
window.SisPlayerInfo = function() {
	this.currentTarget = "";
	this.lastTarget = "";
	
	this.currentInteraction = "";
	
	this.flagRejectedSis = false;
	this.rejectedSisPassage = "";
	
	this.clean = function() {
		this.currentTarget = "";
		this.lastTarget = "";
		
		this.currentInteraction = "";
	}
	this.autoSelectNewTarget = function() {
		var flagChosenTarget = false;
		for ( var character of State.variables.compass.sisList[State.variables.compass.pcSis].charList ) {
			if ( flagChosenTarget == false && character != "chPlayerCharacter" ) {
				this.currentTarget = character;
				this.lastTarget = character;
				flagChosenTarget = true;
			}
		}
	}
}

window.selectTarget = function(character) {
	// This function would be a part of SisPlayerInfo, but I can't directly access the object from HTML
	State.variables.sisPlayerInfo.currentTarget = character;
	// This receives HTML format, not Twine format. A fix would be useful
	/*
	document.getElementById("playerInteractions").innerHTML =
	State.variables.compass.sisList[State.variables.compass.pcSis].formatPlayerInteractionsToTarget(
		character,State.variables.compass.sisList[State.variables.compass.pcSis].getPlayerOfferedInteractions()
	);
	*/
}

State.variables.sisPlayerInfo = new SisPlayerInfo();

// Constructors, serializers, etc.
SisPlayerInfo.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
SisPlayerInfo.prototype.clone = function () {
	return (new SisPlayerInfo())._init(this);
};
SisPlayerInfo.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new SisPlayerInfo())._init($ReviveData$)', ownData);
};

////////// SOCIAL INTERACTIONS SYSTEM CLASS  //////////
// Social Interaction "Event"

window.SocIntSys = function(key,charList) {
	this.key = key;
	this.charList = charList; // List of char keys
	this.charInteractions = []; // List of lists. Each list represents the interactions offered to each character participating in the conversation,
								// the list's position is the same as its character's position in this.charList
	
	this.importantMessages = "";
	this.interactionsDescription = "";
	this.moodChangesDescription = "";
	this.relationChangesDescription = "";
	this.descriptionsText = ""; // Sums all descriptions about the last round's results
	
	this.passageText = "TestText";
	
	this.flagPlayerLeftAlone = false;
	
	this.flagPlayerIsPrompted = false;
	this.playerPromptText = "";
	
	this.flagPlayerTakenToScene = false;
	
		// Data
	this.roundsCount = 0;
	this.roundsData = []; // Each dot in the list is a round, represented as a list "[]"
						  // Each dot in the new list is one character's data, represented as a list "[]"
						  // Each dot is this new list is: character's key "chChar", target's key "chTarget", interaction's key, "chatWhatever"
						  
	this.charMoodChanges = []; // It gains each character as a property, its value is a mood vector
	this.charRelChanges = []; // It gains each character as a property, which gains each other character as its own property, their values
							  // are relationship vectors
	
	// UI
	this.formatPassageText = function() {
		
		this.passageText = "";
		
		if ( State.variables.sisPlayerInfo.flagRejectedSis == false && this.flagPlayerIsPrompted == false ) {
			// Important messages
			if ( this.importantMessages != "" ) {
				this.passageText += "<div class='standardBox'>" + colorText(this.importantMessages,"red") + "</div>\n";
				this.importantMessages = "";
			}
			
			// If player left or forced to leave, button to leave
			if ( this.flagPlayerTakenToScene == true ) {
				this.passageText += this.getButtonTakenToScene() + "\n\n";
			}
			else if ( this.charList.includes("chPlayerCharacter") == false ) {
				this.passageText += this.getButtonForcedOutOfSis() + "\n\n";
			}
			
			// Characters
			this.passageText += "<div class='standardBox'>" + "Characters present: " + getCharNames(this.charList) + "</div>\n";
			
			this.formatDescription();
			if ( this.descriptionsText != "" ) {
				this.passageText += "<div class='standardBox'>" + this.descriptionsText + "</div>\n"; 
			}
			
			this.moodChangesDescription = "";
			this.descriptionsText = "";
			
			// Is player alone?
			if ( this.flagPlayerLeftAlone == false || this.charList.length > 1 ) {  // Player not alone
				this.flagPlayerLeftAlone = false;
				
				if ( this.charList.includes("chPlayerCharacter") ) {
					// Targets
					this.passageText += this.formatTargetsButtons() + "\n";
					
					// Interactions
					var it = 0;
					var itA = this.charList[it];
					while ( itA != "chPlayerCharacter" ) {
						it++;
						itA = this.charList[it];
					}
				}
				
				this.passageText += this.formatPlayerInteractionsToTarget(State.variables.sisPlayerInfo.currentTarget,this.charInteractions[it]);
				
				if ( gC("chPlayerCharacter").followingTo == "" ) {
					// Specific interactions
					this.passageText += "\n" + this.getButtonSisSpecifics();
					
					// Get out of SIS
					this.passageText += "\n" + this.getButtonEndSis();
				}
			}
			else { // Player alone
				this.passageText += this.getButtonEndDeadSis();
			}
		}
		else if ( this.flagPlayerIsPrompted ) {
			this.passageText = this.playerPromptText;
		}
		else {
			this.passageText = State.variables.sisPlayerInfo.rejectedSisPassage;
		}
		
	}
	
	this.formatTargetsButtons = function() {
		var potentialTargets = [];
		for ( var c of this.charList ) {
			if ( c != "chPlayerCharacter" ) {
				potentialTargets.push(c);
			}
		}
		
		var flagNoTarget = false;
		if ( State.variables.sisPlayerInfo.currentTarget == "" ) {
			flagNoTarget = true;
			State.variables.sisPlayerInfo.currentTarget = potentialTargets[0];
		}
		var i = 0;
		
		var bText = '<span style="color:darkgray"'+'>__Target__:\n</'+'span>' + "<" + "html>\n";
		for ( var t of potentialTargets ) {
			bText += "<input type='radio' id='" + t + "' name='target' value='" + t + "' ";
			if ( (flagNoTarget == true && i == 0) || State.variables.sisPlayerInfo.lastTarget == t ) {
				bText += 'checked="checked" ';
			}
			bText += 'onclick="selectTarget(' + "'" + t + "'" + ')">\n';
			bText += "<label for='" + t + "'>" + firstToCap(gC(t).name) + "</" + "label><br>";
			i++;
		}
		bText += "</" + "html>";
		
		return bText;
	}
	
	this.formatMoodChanges = function() {
		
		var desc = ""; // '<span style="color:darkgray"'+'>__Mood changes__:\n</'+'span>';
		for ( var cmc in this.charMoodChanges ) {
			if ( this.charMoodChanges[cmc].hasOwnProperty("friendly") ) {
				desc += gC(this.charMoodChanges[cmc].name).formattedName + ": ";
				for ( var m of ["friendly","intimate","flirty","aroused","dominant","submissive","bored","angry"] ) {
					if ( this.charMoodChanges[cmc][m] != 0 ) {
						desc += '<span title="' + firstToCap(m) + '">' + img(m) + '</' + 'span>' + " " //  firstToCap(m[0]) + m[1] +
						      + this.charMoodChanges[cmc][m].toFixed(2) + " "; //| ";
						// <span title="Hover text">[[test]]</span>
					}
				}
				desc += "\n";
			}
		}
		if ( desc != "" ) {
			this.moodChangesDescription = '<span style="color:darkgray"'+'>__Mood changes__:\n</'+'span>' + desc;
		} else {
			this.moodChangesDescription = "";
		}
	}
	
	this.formatRelationChanges = function() {
		var desc = "";
		var i = 0;
		for ( var crc in this.charRelChanges ) {
			if ( this.charRelChanges[crc].hasOwnProperty("name") ) {
				if ( this.charRelChanges[crc].name == "chPlayerCharacter" ) {
					// Player changes towards
					for ( var ch in this.charRelChanges[crc] ) {
						if ( this.charRelChanges[crc][ch].hasOwnProperty("name") ) {
							var tDesc = "";
							var anyChange = false;
							tDesc += gC("chPlayerCharacter").formattedName + " -> " + gC(this.charRelChanges[crc][ch].name).formattedName + ": ";
							for ( var t of ["friendship","sexualTension","romance","domination","submission","rivalry","enmity"] ) {
								if ( this.charRelChanges[crc][ch][t] != 0 ) {
									anyChange = true;
									tDesc += '<span title="' + firstToCap(t) + '">' + firstToCap(t[0]) + t[1] + '</' + 'span>' + ": "
										  + this.charRelChanges[crc][ch][t].toFixed(2) + " | ";
								}
							}
							if ( anyChange ) {
								if ( i > 0 ) { desc += "\n"; }
								desc += tDesc;
								i++;
							}							
						}
					}
				}
				else if ( this.charRelChanges[crc].hasOwnProperty("chPlayerCharacter") ) {
					// Changes towards Player
					var tDesc = "";
					var anyChange = false;
					tDesc += gC(this.charRelChanges[crc].name).formattedName + " -> " + gC("chPlayerCharacter").formattedName + ": ";
					for ( var t of ["friendship","sexualTension","romance","domination","submission","rivalry","enmity"] ) {
						if ( this.charRelChanges[crc].chPlayerCharacter[t] != 0 ) {
							anyChange = true;
							tDesc += '<span title="' + firstToCap(t) + '">' + firstToCap(t[0]) + t[1] + '</' + 'span>' + ": "
							      + this.charRelChanges[crc].chPlayerCharacter[t].toFixed(2) + " | ";
						}
					}
					if ( anyChange ) {
						if ( i > 0 ) { desc += "\n"; }
						desc += tDesc;
						i++;
					}
				}
			}
		}
		if ( desc != "" ) {
			this.relationChangesDescription = '<span style="color:darkgray"'+'>__Relation changes__:</'+'span>\n' + desc;
		}
	}
	
	this.formatDescription = function() {
		this.descriptionsText = "";
		
		if ( this.interactionsDescription != "" ) {
			this.descriptionsText += '<span style="color:darkgray"'+'>__Results__:\n</'+'span> ';
			this.descriptionsText += this.interactionsDescription + "\n";
		}
		this.formatMoodChanges();
		this.formatRelationChanges();
		if ( this.moodChangesDescription != "" ) {
			this.descriptionsText += this.moodChangesDescription + "\n";
		}
		if ( this.relationChangesDescription != "" ) {
			this.descriptionsText += this.relationChangesDescription + "\n";
		}
	}
	
	this.formatInteractionChoice = function(si) {
		var iText = "";
		
		if ( getSiByKey(si).isUsable(this,"chPlayerCharacter",State.variables.sisPlayerInfo.currentTarget,[],0) == false ) {
			iText = '<span style="color:firebrick"'+'>Locked: ' + getSiByKey(si).title + " (Cost: " + getSiByKey(si).socialDriveCost + ")"
       			  + '</'+'span>';
		} else {
			iText = "- ";
			for ( var tag of getSiByKey(si).tags ) {
					iText += '<span title="' + firstToCap(tag) + '">' + img(tag) + "</" + "span> ";
			}
			iText += this.getButtonPlayerPicksAction(si,State.variables.sisPlayerInfo.currentTarget)
			      + " (Cost: " + '<span style="color:khaki"' + '>' + getSiByKey(si).socialDriveCost + '</'+'span>)';
		}
		
		return iText;
	}
	
	this.formatPlayerInteractionsToTarget = function(target,interactionsList) {
		var iText = "";
		
		if ( this.charList.includes("chPlayerCharacter") ) {
			//iText += "\* " + this.getButtonPlayerDoesNothing() + "\n";
		}
		
		iText += '<p id="playerInteractions">';
		
		if ( this.charList.includes("chPlayerCharacter") ) {
			iText += "\* " + this.getButtonPlayerDoesNothing() + " <br>";
			for ( var interaction of interactionsList ) {
				if ( getSiByKey(interaction).isUsable(this,"chPlayerCharacter",target,[],0) == false ) {
				iText += '<span style="color:firebrick"'+'>Locked: ' + getSiByKey(interaction).title + " (Cost: "
					  + getSiByKey(interaction).socialDriveCost + ")" + '</'+'span>';
				}
				else {
					iText += "\* ";
					for ( var tag of getSiByKey(interaction).tags ) {
						iText += '<span title="' + firstToCap(tag) + '">' + img(tag) + "</" + "span> ";
					}
					iText += this.getButtonPlayerPicksAction(interaction,State.variables.sisPlayerInfo.currentTarget)
					  + " (Cost: " + '<span style="color:khaki"' + '>' + getSiByKey(interaction).socialDriveCost + '</'+'span>)';
				}
				iText += "<br>";
			}
		}
		
		iText += '</' + 'p>';
		return iText;
	}
	
	
	// Logic
	this.getAllValidInteractionsChar = function(character) {
		
		var allInteractions = getAllSocialInteractions(); // These are keys
		var allExtraInteractions = getAllCharExtraSocialInteractions(character);
		var validInteractions = [];
		
		for ( var iKey of allInteractions.concat(allExtraInteractions) ) {
			if ( getSiByKey(iKey).isValid(this,character,"chDummy",[],null) ) {
				validInteractions.push(iKey);
			}
		}
		
		return validInteractions;
	}
	
	this.getOfferedInteractionsToChar = function(character,numInteractions) {
		// Generates potential interactions for a character to choose from
		// numInteractions is the amount of requested interactions
		
		var validInteractions = this.getAllValidInteractionsChar(character);
		var wList = new weightedList();
		var viAmount = 0;
		var nInteractions = numInteractions;
		
		for ( var interaction of validInteractions ) {	// wList is turned into a list containing all valid interactions, with their corresponding weight
			wList[interaction] = new weightedElement(interaction,getSiByKey(interaction).getWeight(this,character,"chDummy",[],null));
			viAmount++;
		}
		if ( nInteractions > viAmount ) {  // If the amount of requested interactions is bigger than available interactions, less interactions
										   // will be returned
			nInteractions = viAmount;
		}
		
		var offInteractionsList = [];
		var oilN = 0;
		var newInteraction = "";
		
		while ( oilN < nInteractions ) {  // Interactions added to offeredInteractionsList will be removed from wList
			newInteraction = randomFromWeightedList(wList);
			offInteractionsList.push(newInteraction);
			wList[newInteraction] = false;
			oilN++;
		}
		
		return offInteractionsList;
	}
	
	this.npcsMakeInterRoundDecisions = function() {
		var actions = [];
		var chars = [];
		for ( var character of this.charList ) { chars.push(character) }
		
		for ( var character of chars ) {
			gC(character).wasPromptedInCurrentSisRound = false;
		}
		
		for ( var character of this.charList ) {	// Get all actions from characters
			if ( character != "chPlayerCharacter" && gC(character).followingTo == "" ) {
				var charAction = gC(character).socialAi.getInterRoundBehavior(this);
				
				if ( charAction[0] != "none" ) {
					actions.push([character].concat(charAction));
				}
			}
		}
		for ( var action of actions ) {				// Execute all actions, provided it's possible
			var actor = action[0];
			var target = action[2];
			if ( target == "" ) {
				switch(action[1]) {
					case "leave":							// Leaving
						this.charsLeaveSis(getCharGroup(actor));
						this.importantMessages += getCharNames(getCharGroup(actor)) + " has left the conversation.\n";
						if ( actor == State.variables.sisPlayerInfo.currentTarget ) {
							State.variables.sisPlayerInfo.autoSelectNewTarget();
						}
						break;
				}
			}
			else if ( this.charList.includes(target) && gC(target).wasPromptedInCurrentSisRound == false ) {
				if ( target == "chPlayerCharacter" ) { gC("chPlayerCharacter").wasPromptedInCurrentSisRound = true; }
				switch(action[1]) {
					case "leave":							// Leaving
						this.charsLeaveSis(getCharGroup(actor));
						this.importantMessages += gC(actor).getName() + " has left the conversation.\n";
						if ( actor == State.variables.sisPlayerInfo.currentTarget ) {
							State.variables.sisPlayerInfo.autoSelectNewTarget();
						}
						break;
						
					case "egalitarianSex":					// Invite egalitarian sex
						this.executeStandardSistEffects(0,actor,target);
						break;
					case "submissiveSex":					// Invite egalitarian sex
						this.executeStandardSistEffects(1,actor,target);
						break;
					case "dominantSex":					// Invite egalitarian sex
						this.executeStandardSistEffects(2,actor,target);
						break;
				}
			}
		}
		
		for ( var character of chars ) {
			gC(character).wasPromptedInCurrentSisRound = false;
		}
	}
	this.executeStandardSistEffects = function(sistId,actor,target) {
		// This gets executed when a character other than the player's executes a sist. For player, check processTopicResult()
		var sist = State.variables.sistDB[sistId];
		if ( sist.isPossible(actor,target) ) { // Is it possible
			if ( gC(actor).socialdrive.current >= sist.getSocialdriveOfferCost(actor,target) ) {
				gC(actor).socialdrive.current -= sist.getSocialdriveOfferCost(actor,target);
				if ( target == "chPlayerCharacter" ) {
					sist.askToPlayer(actor,target,this.key);
				}
				else { // Is it successful
					var isSuccessful = sist.isSuccessful(actor,target);
					this.importantMessages += isSuccessful[2] + "\n";
					if ( isSuccessful[0] ) {
						gC(actor).wasPromptedInCurrentSisRound = true;
						gC(target).wasPromptedInCurrentSisRound = true;
						sist.getSuccessEffect(actor,target);
					}
					else {
						sist.getFailEffect(actor,target);
					}
				}
			}
		}
		
	}
	
	// Logic (The heavy stuff)
	this.preInitiateNewRoundNoPC = function() {
		this.npcsMakeInterRoundDecisions();
		if ( this.charList.length > 0 ) {
			this.initiateNewRound();
		}
	}
	this.preInitiateNewRoundWithPC = function() {
		this.npcsMakeInterRoundDecisions();
	}
	this.initiateNewRound = function() {
		var newSevent = createSystemEventSisRound(this.charList,this.key);
		State.variables.compass.ongoingEvents.push(newSevent);

		State.variables.compass.sortOnGoingEventsByTime();

	}
	this.processRound = function() {
		// Data clean
		this.charMoodChanges = [];
		this.charRelChanges = [];
		this.interactionsDescription = "";
		
		// Get interactions and order them
		this.feedCharInteractionsOptionsList();
		var charsNactions = []; // List of lists with charKeys, targetKeys and interactions keys,
								// such as [["chVal","chNash","flirt"],["chNash","chVal","patronize"]]
		charsNactions = this.processCharsInteractions();
		charsNactions = this.orderInteractions(charsNactions);
		
		var interactionsList = [];
		for ( var cNa in charsNactions ) {
			interactionsList.push(this.createInteraction(charsNactions[cNa]));
		}
		
		// Process interactions' logic
		for ( var interaction of interactionsList ) {
			this.interactionExtraEffect(interaction);
			this.interactionMoodChanges(interaction);
			this.interactionRelationChanges(interaction);
			gC(interaction.actor).socialdrive.current -= interaction.socialDriveCost;
			this.interactionsDescription += interaction.getDescription() + "\n";
		}
		
		// Remember player pick
		State.variables.sisPlayerInfo.lastTarget = State.variables.sisPlayerInfo.currentTarget;
		
		// End round
		this.roundsData.push(charsNactions);
		this.roundsCount++;
	}
	
	this.processCharsInteractions = function() {
		var results = [];
		for ( var character of this.charList ) {
			if ( character == "chPlayerCharacter" ) {
				if ( State.variables.sisPlayerInfo.currentInteraction != "none" ) {
					results.push([character,State.variables.sisPlayerInfo.currentTarget,State.variables.sisPlayerInfo.currentInteraction]);
				}
			}
			else {
				// TO DO: AI
				// Temporary: AI characters use a random weighted action
				var target = randomFromList(arrayMinusA(this.charList,character));			// Target is chosen at random
				
				if ( target != undefined && target != null ) {
					var offeredInteractions = this.getOfferedInteractionsToChar(character,5);	// Character is offered interactions
					
					var usableInteractions = [];
					for ( var interaction of offeredInteractions ) {							// Unusable interactions are purged
						if ( interaction != "errorWList" ) {
							if ( getSiByKey(interaction).isUsable(this,character,target,[],null) ) {
								usableInteractions.push(interaction);
							}
						}
					}
					
					if ( usableInteractions.length > 0 ) {										// A command for the character to use interaction on target
																								// is pushed to results
						results.push([character,target,gC(character).socialAi.chooseSISinteraction(target,usableInteractions)]);
						// randomFromList(usableInteractions)]);
													   // Edit this randomFromList -> Function that receives actor,target and possible interactions,
													   // and chooses the most appropiate one
					}
				}
			}
		}
		return results;
	}
	this.orderInteractions = function(charsNactions) {
		// TO DO
		return charsNactions;
	}
	this.createInteraction = function(cNa) {
		var draftInteraction = getSiByKey(cNa[2]);
		var interaction = JSON.parse(JSON.stringify(draftInteraction));
		//var interaction = Object.assign({}, getSiByKey(cNa[2])); // Copies interaction from the data base
		interaction.actor = cNa[0];
		interaction.target = cNa[1];
		interaction.observers = [];
		for ( var c of this.charList ) {
			if ( c != cNa[0] && c!= cNa[1] ) {
				interaction.observers.push(c);
			}
		}
		interaction.extraData = null;
		interaction.sis = this.key;
		
		return interaction;
	}
	
	this.interactionExtraEffect = function(interaction) {
		interaction.extraEffect = interaction.calculateExtraEffect();
	}
	this.interactionMoodChanges = function(interaction) {
		var moodMultiplier = interaction.getMoodMultiplier();
		
		// Target
		var mVt = gC(interaction.target).applyMoodyMoodVector(moodVectorXFactor(interaction.getMoodVectorTarget(),moodMultiplier));
		this.setCharMoodChange(interaction.target,mVt);
		// Actor
		var mVa = gC(interaction.actor).applyMoodyMoodVector(moodVectorXFactor(interaction.getMoodVectorActor(),moodMultiplier));
		this.setCharMoodChange(interaction.actor,mVa);
		// Observers
		for ( var obs of interaction.observers ) {
			var mVo = gC(obs).applyMoodyMoodVector(moodVectorXFactor(interaction.getMoodVectorObservers(),moodMultiplier));
			this.setCharMoodChange(obs,mVo);
		}
	}
	this.interactionRelationChanges = function(interaction) {
		var relationMultiplier = interaction.getRelationMultiplier();
		
		// Target
		var rV = gC(interaction.target).applyRelationVector(interaction.actor,relationVectorXFactor(interaction.getRelationVectorTarget(),relationMultiplier));
		this.setCharRelationChange(interaction.target,interaction.actor,rV);
		
		// Actor
		rV = gC(interaction.actor).applyRelationVector(interaction.target,relationVectorXFactor(interaction.getRelationVectorActor(),relationMultiplier));
		this.setCharRelationChange(interaction.actor,interaction.target,rV);
		// Observers
		for ( var obs of interaction.observers ) {
			rV = gC(obs).applyRelationVector(interaction.actor,relationVectorXFactor(interaction.getRelationVectorObservers(),relationMultiplier));
			this.setCharRelationChange(obs,interaction.actor,rV);
		}
	}
	
	this.charLeavesSisAiProtocol = function(charKey) {
		if ( charKey != "chPlayerCharacter" ) {
			// gC(charKey).mapAi.state != "idle" && 
			if ( gC(charKey).followingTo == "" ) {
				// gC(charKey).mapAi.state = "idle";
				if ( State.variables.compass.findFirstEventInvolvingCharacter(charKey) == null ) {
					gC(charKey).mapAi.state = "idle";
				}
				gC(charKey).mapAi.main();
			}
		}
	}
	
	// Management
	this.getAllPossibleInteractions = function(character,target) {
		var allSocInt = getAllSocialInteractions();
		var charSocInt = []; // Valid social interactions for character
		for ( var si of allSocInt ) {
				charSocInt.push(si);
		}
		return charSocInt;
	}

	this.playerRequestsJoin = function() {
		var i = this.getCorrespondingRoundEventPos();
		if ( i != -1 ) {
			var remainingTime = State.variables.compass.ongoingEvents[i].timeRemaining;
			if ( remainingTime != 5 ) {
				State.variables.compass.advanceTime(remainingTime);
			}
		}
	}

	this.charJoinsSis = function(character) {
		if ( this.charList.includes(character) == false ) {
			gC(character).mapAi.state = "active";
			this.charList.push(character);
			if ( character == "chPlayerCharacter" ) {
				State.variables.compass.pcSis = this.key;
				State.variables.sisPlayerInfo.autoSelectNewTarget();
			}
		}
	}
	this.charsJoinSis = function(charList) {
		for ( var charKey of charList ) {
			this.charJoinsSis(charKey);
		}
	}

	this.charLeavesSis = function(character) {
		this.charLeavesSisAiProtocol(character);
		this.charList = arrayMinusA(this.charList,character);
		
		if ( character == "chPlayerCharacter" ) {
			State.variables.sisPlayerInfo.clean();
			if ( (this.charList.length > 1) && (this.getCorrespondingRoundEventPos() == -1) ) {
				// If there's no associated event, Player leaves, and there are other characters in conversation,
				// generate new round event
				this.preInitiateNewRoundNoPC();
			}
		}
		
		var i = this.getCorrespondingRoundEventPos(); // Remove characters from corresponding event
		if ( i != -1 ) {
			State.variables.compass.ongoingEvents[i].removeCharFromEvent(character); // characters = arrayMinusA(State.variables.compass.ongoingEvents[i].characters,character);
		}
		
		if ( this.charList.length < 2 ) {
			if ( this.charList[0] == "chPlayerCharacter" ) {
				this.flagPlayerLeftAlone = true;
			}
			else {
				this.remainingCharsLeaveSis();
			}
			
			if ( i != -1 ) {
				State.variables.compass.ongoingEvents[i].forceEnd();
				if ( this.charList.length == 1 ) {
					State.variables.compass.ongoingEvents[i].removeCharFromEvent(this.charList[0]);
				}
			}
		}
		
		if ( gC(character).followedBy.length > 0 ) {
			for ( var charKey of  gC(character).followedBy ) {
				if ( this.charList.includes(charKey) ) {
					this.charLeavesSis(charKey);
				}
			}
		}
	}
	this.charsLeaveSis = function(charList) {
		for ( var character of charList ) {
			// AI
			this.charLeavesSisAiProtocol(character);
			this.charList = arrayMinusA(this.charList,character);
			
			if ( character == "chPlayerCharacter" ) {
				State.variables.sisPlayerInfo.clean();
			}
			
			// Remove characters from corresponding event
			var i = this.getCorrespondingRoundEventPos(); 
			if ( i != -1 ) {
				State.variables.compass.ongoingEvents[i].removeCharFromEvent(character); // characters = arrayMinusA(State.variables.compass.ongoingEvents[i].characters,character);
			}
		}
		if ( this.charList.length < 2 ) {
			if ( this.charList[0] == "chPlayerCharacter" ) {
				this.flagPlayerLeftAlone = true;
			}
			else {
				this.remainingCharsLeaveSis();
			}
		}
		if ( (this.charList.length > 1) && (this.getCorrespondingRoundEventPos() == -1) ) {
			// If there's no associated event, Player leaves, and there are other characters in conversation,
			// generate new round event
			this.preInitiateNewRoundNoPC();
		}
	}
	this.remainingCharsLeaveSis = function() {
		for ( var character of this.charList ) {
			if ( character == "chPlayerCharacter" ) {
				State.variables.sisPlayerInfo.clean();
			}
			else {
				this.charLeavesSis(character);
				this.charLeavesSisAiProtocol(character);
			}
		}
	}
	
	this.playerPicksInteraction = function(interactionKey) {
		State.variables.sisPlayerInfo.currentInteraction = interactionKey;
		// This must be working later
		// State.variables.compass.advanceTime(5);
		this.initiateNewRound();
		State.variables.compass.pushAllTimeToAdvance();
	}
	this.playerDoesNotPickInteraction = function(interactionKey) {
		State.variables.sisPlayerInfo.currentInteraction = "none";
		// This must be working later
		// State.variables.compass.advanceTime(5);
		this.initiateNewRound();
		State.variables.compass.pushAllTimeToAdvance();
	}
	
	this.feedCharInteractionsOptionsList = function() {
		var i = 0;
		for ( var character of this.charList ) {
			this.charInteractions[i] = this.getOfferedInteractionsToChar(character,5);
			i++;
		}
	}
	
	this.getPlayerOfferedInteractions = function() {
		// Finds the SIS' assigned interactions for the player and returns them
		var it = 0;
		var itA = this.charList[it];
		while ( itA != "chPlayerCharacter" ) {
			it++;
			itA = this.charList[it];
		}
		return this.charInteractions[it];
	}
	
	this.getCorrespondingRoundEventPos = function() {
		var i = 0;
		var j = -1;
		for ( var sEvent of State.variables.compass.ongoingEvents ) {
			if ( sEvent.title == "sisRound" ) {
				if ( sEvent.sisKey == this.key ) {
					j = i;
				}
			}
			i++;
		}
		return j;
	}
	
	this.setSisPlayerPrompt = function(promptText,extra,rejectCost) {
		// Extra is a keyword that specifies specific behavior
		this.flagPlayerIsPrompted = true;
		this.playerPromptText = promptText;
		switch ( extra ) {
			case "default":
				this.playerPromptText += "\n" + this.getButtonRejectSisPrompt(rejectCost);
				break;
			case "relTypeForcesToAccept":
				this.playerPromptText += "\n" + colorText("Locked:","firebrick") + " Your special relationship doesn't allow you to refuse.";
				break;
		}
	}
	this.endSisPlayerPrompt = function() {
		this.flagPlayerIsPrompted = false;
		this.playerPromptText = "";
	}
	
	// Data
	this.setCharMoodChange = function(character,moodVector) {
		if ( this.charMoodChanges.hasOwnProperty(character) ) {
			this.charMoodChanges[character] = sumMoodVectors(this.charMoodChanges[character],moodVector);
			this.charMoodChanges[character].name = character;
		} else {
			this.charMoodChanges[character] = moodVector;
			this.charMoodChanges[character].name = character;
		}
	}
	this.setCharRelationChange = function(actor,target,relationVector) {
		if ( this.charRelChanges.hasOwnProperty(actor) == false ) {
			this.charRelChanges[actor] = [];
			this.charRelChanges[actor].name = actor;
		}
		if ( this.charRelChanges[actor].hasOwnProperty(target) ) {
			this.charRelChanges[actor][target] = sumRelationVectors(relationVector,this.charRelChanges[actor][target]);
			this.charRelChanges[actor][target].name = target;
		} else {
			this.charRelChanges[actor][target] = relationVector;
			this.charRelChanges[actor][target].name = target;
		}
	}
	
	// Buttons
	this.getButtonPlayerDoesNothing = function() {
		var bText = "<<l" + "ink [[Do nothing|Social Interactions]]>><<s" + "cript>>\n";
		bText 	 += "State.variables.compass.sisList[" + this.key + "].playerDoesNotPickInteraction();";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.getButtonPlayerPicksAction = function(actionKey,target) {
		var bText = "<<l" + "ink [[" + getSiByKey(actionKey).title + "|Social Interactions]]>><<s" + "cript>>\n";
		bText 	 += "State.variables.compass.sisList[" + this.key + "].playerPicksInteraction('" + actionKey + "');";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.getButtonEndSis = function() {
		var bText = "<<l" + "ink [[Leave conversation|Map]]>><<s" + "cript>>\n";
		bText 	 += "State.variables.compass.sisList[" + this.key + "].charsLeaveSis(getCharGroup('chPlayerCharacter'));";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.getButtonEndDeadSis = function() {
		var bText = "<<l" + "ink [[Leave|Map]]>><<s" + "cript>>\n";
		bText 	 += "State.variables.compass.sisList[" + this.key + "].charsLeaveSis(getCharGroup('chPlayerCharacter'));";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.getButtonSisSpecifics = function() {
		var bText = "<<l" + "ink [[Specific Topics|Social Interactions Specifics]]>><<s" + "cript>>\n";
		bText	 += "State.variables.sisSpecifics.playerTarget = State.variables.sisPlayerInfo.currentTarget;\n";
		bText	 += 'State.variables.sisPlayerInfo.lastTarget = State.variables.sisPlayerInfo.currentTarget;\n';
		bText 	 += 'State.variables.sisPlayerInfo.currentTarget = "";\n';
		bText 	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}

	this.getButtonRejectSisPrompt = function(cost) {
		var bText = "<<l" + "ink [[Reject|Social Interactions]]>><<s" + "cript>>\n";
		bText	 += "State.variables.chPlayerCharacter.willpower.current -=" + cost + ";\n";
		bText 	 += "State.variables.compass.sisList[" + this.key + "].endSisPlayerPrompt();";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		if ( cost > 0 ) {
			if ( gC("chPlayerCharacter").willpower.current >= cost ) {
				bText += " ( Cost: " + colorText(cost.toFixed(1),"darkslateblue") + " ) ";
			} else {
				bText = colorText("Locked: ","firebrick") + "Not enough willpower.";
			}
		}
		return bText;		
	}

	this.getButtonForcedOutOfSis = function() {
		var bText = "<<l" + "ink [[Continue to map|Map]]>><<s" + "cript>>\n";
		// bText 	 += "State.variables.compass.sisList[" + this.key + "].charsLeaveSis(getCharGroup('chPlayerCharacter'));";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}

	this.getButtonTakenToScene = function() {
		var bText = "<<l" + "ink [[Continue to scene|Scene]]>><<s" + "cript>>\n";
		bText	 += "State.variables.compass.sisList[" + this.key + "].flagPlayerTakenToScene = 'false';\n";
		bText	 += "State.variables.sc.formatScenePassage();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}

	// Provide info
	this.getValidProposedCharacters = function(proposerCharacter) {
		// Returns a list with the SIS' characters that proposerCharacter may make specific proposals to, such as leaving to have sex
		var validCharsList = [];
		for ( var charKey of this.charList ) {
			if ( (gC(charKey).followingTo == "" || gC(charKey).followingTo == proposerCharacter) && ( charKey != proposerCharacter ) ) {
				validCharsList.push(charKey);
			}
		}
		
		return validCharsList;
	}
};

// Constructors, serializers, etc.
SocIntSys.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
SocIntSys.prototype.clone = function () {
	return (new SocIntSys())._init(this);
};
SocIntSys.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new SocIntSys())._init($ReviveData$)', ownData);
};

// Auxiliar Functions

window.siCharismaVsEmpathy = function(charA,charB) {
	var result = 1.0;
	result = gC(charA).charisma.getValue() / gC(charB).empathy.getValue();
	return result;
}
window.siCharismaVsAll = function(charA,charB) {
	
}

window.getButtonExitRejectedSis = function() {
		var bText = "<<l" + "ink [[Continue|Map]]>><<s" + "cript>>\n";
		bText	 += "State.variables.sisPlayerInfo.flagRejectedSis = false;\n";
		bText	 += "State.variables.sisPlayerInfo.rejectedSisPassage = '';\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
}

