setup.conversationRelationMultiplier = 3; // Conversation relationship changes are multiplied by this constant.

////////// SIS Player Info  //////////
// Short set of data containing controls info
window.SisPlayerInfo = function() {
	this.currentTarget = "";
	this.lastTarget = "";
	
	this.currentInteraction = "";
	
	this.flagRejectedSis = false;
	this.rejectedSisPassage = "";
	this.playerPrompt = "";
	
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
	this.charsSocialInfo = []; // Dynamic array with every character who has been present in the conversation, as long as the player character is or was present.
						       // The value of each character represents the social info gathered by the player, used to determine the character's social mission
	for ( var cK in charList ) {
		if ( this.charsSocialInfo[charList[cK]] == undefined ) {
			this.charsSocialInfo[charList[cK]] = 0;
		}
	}
	
	this.importantMessages = "";
	this.interactionsDescription = "";
	this.moodChangesDescription = "";
	this.relationChangesDescription = "";
	this.expGainsDescription = "";
	this.descriptionsText = ""; // Sums all descriptions about the last round's results
	this.descriptionsText1 = ""; // Alt description, block 1
	this.descriptionsText2 = ""; // Alt description, block 2
	
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
	this.extraEffects = "";
	
	this.tempLeftSis = [];
};

	// UI
	SocIntSys.prototype.formatPassageText = function() {
		
		this.passageText = "";
		
		if ( State.variables.sisPlayerInfo.playerPrompt == "" && State.variables.sisPlayerInfo.flagRejectedSis == false && this.flagPlayerIsPrompted == false ) {
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
			/*
			this.formatDescriptionAlt();
			if ( this.descriptionsText1 != "" ) {
				this.passageText += "<div class='standardBox'>" + this.descriptionsText1 + "</div>\n"; 
			} */
			
			// Extra check: Scenario is dead
			var deadScenario = true;
			for ( var sEvent of State.variables.compass.ongoingEvents ) {
				if ( sEvent.title == "scenarioEnd" ) {
					deadScenario = false;
				}
			}
			if ( deadScenario == true ) {
				this.passageText += "\n" + this.getButtonEndDeadSis();
			} // Is player alone?
			else if ( this.flagPlayerLeftAlone == false || this.charList.length > 1 ) {  // Player not alone
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
				
				var flagExtraOptions = true;
				if ( this.flagPlayerTakenToScene == true ) {
					flagExtraOptions = false;
				} else if ( gC("chPlayerCharacter").followingTo != "" ) {
					if ( (gC("chPlayerCharacter").followingTo == gC("chPlayerCharacter").domChar) || ((gC("chPlayerCharacter").followingForDebt == true) && rFavor("chPlayerCharacter",gC("chPlayerCharacter").followingTo) > 0 ) ) {
						flagExtraOptions = false;
					}
				}
				
				this.passageText += this.displayCharsIntentions() + "\n";
				
				if ( flagExtraOptions ) {
					if ( gC("chPlayerCharacter").followingTo == "" ) {
						// Specific interactions
						this.passageText += "\n" + this.getButtonSisSpecifics();
					}
					
					// Get out of SIS
					this.passageText += "\n" + this.getButtonEndSis();
				}
			}
			else { // Player alone
				this.passageText += this.getButtonEndDeadSis();
			}
			/*
			if ( this.descriptionsText2 != "" ) {
				this.passageText += "\n\n<div class='standardBox'>" + this.descriptionsText2 + "</div>\n"; 
			} */
			
			this.moodChangesDescription = "";
			this.descriptionsText = "";
		}
		else if ( State.variables.sisPlayerInfo.playerPrompt != "" ) {
			this.passageText = State.variables.sisPlayerInfo.playerPrompt;
			State.variables.sisPlayerInfo.playerPrompt = "";
		}
		else if ( this.flagPlayerIsPrompted ) {
			this.passageText = this.playerPromptText;
		}
		else {
			this.passageText = State.variables.sisPlayerInfo.rejectedSisPassage;
		}
		
	}
	
	SocIntSys.prototype.formatTargetsButtons = function() {
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
			bText += 'onclick="selectTarget(' + "'" + t + "'" + ')">';
			bText += "<label for='" + t + "'>" + firstToCap(gC(t).name) + "</" + "label><br>";
			// bText += " " + this.displayTargetsIntention(t,this.charsSocialInfo[t]) + "\n";
			i++;
		}
		bText += "</" + "html>";
		
		return bText;
	}
	SocIntSys.prototype.displayCharsIntentions = function() {
		var iText = "__Intentions__:\n";
		for ( var cK of this.charList ) {
			if ( cK != "chPlayerCharacter" ) {
				iText += "- " + gC(cK).getFormattedName() + ": " + this.displayTargetsIntention(cK,this.charsSocialInfo[cK]) + "\n"
			}
		}
		return iText;
	}
	// Social missions: raiseFriendship, flirt, seduce, haveSex, haveDomSex, getAlliance, taunt
	SocIntSys.prototype.displayTargetsIntention = function(target,points) {
		var dText = "";
		// Exact intention, mostly precise intention, vague intention, no information
		if ( points > 10 ) {
			dText += this.turnMissionIntoIntention(gC(target).mission,3);
		} else if ( points > 6.6 ) {
			dText += this.turnMissionIntoIntention(gC(target).mission,2);
		} else if ( points > 3.3 ) {
			dText += this.turnMissionIntoIntention(gC(target).mission,1);
		} else {
			dText += getTextWithTooltipAlt("(?)","You haven't got a clue about this character's intention yet.");
		}
		return dText;
	}
	SocIntSys.prototype.turnMissionIntoIntention = function(intention,pointsRank) {
		var iText = "";
		switch(intention) {
			case "raiseFriendship":
				if ( pointsRank == 1 ) {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/friendlyIcon.png]] ?)","This character may have friendly intentions.");
				} else if ( pointsRank == 2 ) {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/friendlyIcon.png]] ?)","This character may want to raise their friendships.");
				} else {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/friendlyIcon.png]] )","This character wants to raise their friendships.");
				}
				break;
			case "flirt":
				if ( pointsRank == 1 ) {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/flirtyIcon.png]] ?)","This character may have flirty intentions.");
				} else if ( pointsRank == 2 ) {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/flirtyIcon.png]] ?)","This character may want to flirt with someone.");
				} else {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/flirtyIcon.png]] )","This character wants to attract someone.");
				}
				break;
			case "seduce":
				if ( pointsRank == 1 ) {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/flirtyIcon.png]] ?)","This character may have flirty intentions.");
				} else if ( pointsRank == 2 ) {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/dominantIcon.png]] ?)","This character may want to seduce someone.");
				} else {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/dominantIcon.png]] )","This character wants to get someone under their thumb.");
				}
				break;
			case "haveSex":
				if ( pointsRank == 1 ) {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/arousedIcon.png]] ?)","This character may have sexual intentions.");
				} else if ( pointsRank == 2 ) {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/arousedIcon.png]] ?)","This character may want to get inside someone's pants.");
				} else {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/arousedIcon.png]] )","This character wants to get someone to bed.");
				}
				break;
			case "haveDomSex":
				if ( pointsRank == 1 ) {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/arousedIcon.png]] ?)","This character may have sexual intentions.");
				} else if ( pointsRank == 2 ) {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/dominantIcon.png]] ?)","This character may want to pin someone down.");
				} else {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/dominantIcon.png]] )","This character wants to dominate someone in bed.");
				}
				break;
			case "getAlliance":
				if ( pointsRank == 1 ) {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/friendlyIcon.png]] ?)","This character may have friendly intentions.");
				} else if ( pointsRank == 2 ) {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/friendlyIcon.png]] ?)","This character may want to raise their friendships.");
				} else {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/friendlyIcon.png]] )","This character wants to take a relationship to the next level.");
				}
				break;
			case "taunt":
				if ( pointsRank == 1 ) {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/friendlyIcon.png]] ?)","This character may have friendly intentions.");
				} else if ( pointsRank == 2 ) {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/angryIcon.png]] ?)","This character has hostile intentions.");
				} else {
					iText = getTextWithTooltipAlt("( [img[img/socialIcons/angryIcon.png]] )","This character is trying to taunt someone.");
				}
				break;
		}
		if ( iText == "" ) {
			iText = getTextWithTooltipAlt("(X)","This character doesn't seem to have specific goals."); 
		}
		return iText;
	}
	
	SocIntSys.prototype.formatMoodChanges = function() {
		
		var desc = ""; // '<span style="color:darkgray"'+'>__Mood changes__:\n</'+'span>';
		for ( var cmc in this.charMoodChanges ) {
			if ( desc != "" ) { desc += "\n"; }
			if ( this.charMoodChanges[cmc].hasOwnProperty("friendly") ) {
				desc += gC(this.charMoodChanges[cmc].name).formattedName + ": ";
				for ( var m of ["friendly","intimate","flirty","aroused","dominant","submissive","bored","angry"] ) {
					if ( this.charMoodChanges[cmc][m] != 0 ) {
						desc += '<span title="' + firstToCap(m) + '">' + img(m) + '</' + 'span>' + " " //  firstToCap(m[0]) + m[1] +
						      + this.charMoodChanges[cmc][m].toFixed(2) + " "; //| ";
						// <span title="Hover text">[[test]]</span>
					}
				}
			}
		}
		if ( desc != "" ) {
			this.moodChangesDescription = '<span style="color:darkgray"'+'>__Mood changes__:\n</'+'span>' + desc;
		} else {
			this.moodChangesDescription = "";
		}
	}
	
	SocIntSys.prototype.formatRelationChanges = function() {
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
	
	SocIntSys.prototype.formatDescription = function() {
		this.descriptionsText = "";
		
		if ( this.interactionsDescription != "" ) {
			this.descriptionsText += '<span style="color:darkgray"'+'>__Results__:\n</'+'span> ';
			this.descriptionsText += this.interactionsDescription + "\n";
		}
		this.formatMoodChanges();
		this.formatRelationChanges();
		if ( this.moodChangesDescription != "" ) {
			this.descriptionsText += this.moodChangesDescription + "\n\n";
		}
		if ( this.relationChangesDescription != "" ) {
			this.descriptionsText += this.relationChangesDescription;
		}
		if ( this.expGainsDescription != "" ) {
			this.descriptionsText += '\n\n<span style="color:darkgray"'+'>__Experience__:</'+'span>' + this.expGainsDescription;
		}
		if ( this.extraEffects != "" ) {
			this.descriptionsText += '\n\n<span style="color:darkgray"'+'>__Extra effects__:</'+'span>' + this.extraEffects;
			this.extraEffects = "";
		}
	}
	SocIntSys.prototype.formatDescriptionAlt = function() {
		this.descriptionsText1 = "";
		this.descriptionsText2 = "";
		
		if ( this.interactionsDescription != "" ) {
			this.descriptionsText1 += '<span style="color:darkgray"'+'>__Results__:\n</'+'span> ';
			this.descriptionsText1 += this.interactionsDescription + "\n";
		}
		this.formatMoodChanges();
		this.formatRelationChanges();
		if ( this.moodChangesDescription != "" ) {
			this.descriptionsText2 += this.moodChangesDescription + "\n\n";
		}
		if ( this.relationChangesDescription != "" ) {
			this.descriptionsText2 += this.relationChangesDescription;
		}
		if ( this.expGainsDescription != "" ) {
			this.descriptionsText2 += '\n\n<span style="color:darkgray"'+'>__Experience__:</'+'span>' + this.expGainsDescription;
		}
		if ( this.extraEffects != "" ) {
			this.descriptionsText2 += '\n\n<span style="color:darkgray"'+'>__Extra effects__:</'+'span>' + this.extraEffects;
			this.extraEffects = "";
		}
	}
	
	SocIntSys.prototype.formatInteractionChoice = function(si) {
		var iText = "";
		
		if ( getSiByKey(si).isUsable(this,"chPlayerCharacter",State.variables.sisPlayerInfo.currentTarget,[],0) == false ) {
			iText = '<span style="color:firebrick"'+'>Locked: ' + getSiByKey(si).title + " (Cost: " + getSiByKey(si).socialDriveCost;
				if ( getSiByKey(si).energyCost > 0 ) {
					iText += ", " + getSiByKey(si).energyCost;
				}
				if ( getSiByKey(si).willpowerCost > 0 ) {
					iText += ", " + getSiByKey(si).willpowerCost;
				}
       		iText += ")" + '</'+'span>';
		} else {
			iText = "- ";
			for ( var tag of getSiByKey(si).tags ) {
					iText += '<span title="' + firstToCap(tag) + '">' + img(tag) + "</" + "span> ";
			}
			iText += this.getButtonPlayerPicksAction(si,State.variables.sisPlayerInfo.currentTarget)
			      + " (Cost: " + '<span style="color:khaki"' + '>' + getSiByKey(si).socialDriveCost + '</'+'span>';
				  if ( getSiByKey(si).energyCost > 0 ) {
					  iText += ', <span style="color:darkslateblue"' + '>' + getSiByKey(si).energyCost + '</' + 'span>'
				  }
				  if ( getSiByKey(si).willpowerCost > 0 ) {
					  iText += ', <span style="color:limegreen"' + '>' + getSiByKey(si).willpowerCost + '</' + 'span>'
				  }
			iText += ')';
		}
		
		return iText;
	}
	
	SocIntSys.prototype.formatPlayerInteractionsToTarget = function(target,interactionsList) {
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
	SocIntSys.prototype.getAllValidInteractionsChar = function(character) {
		
		var allInteractions = getAllSocialInteractions(); // These are keys
		var allExtraInteractions = getAllCharExtraSocialInteractions(character);
		var validInteractions = [];
		
		for ( var iKey of allInteractions.concat(allExtraInteractions) ) {
			if ( getSiByKey(iKey).isValid(this,character,"chDummy",[],null) ) {
				var valid = true;
				if ( gSettings().lewdMales == "disable" ) {
					if ( character != "chPlayerCharacter" && gC(character).perPr == "he" ) {
						if ( getSiByKey(iKey).tags.includes("flirty") || getSiByKey(iKey).tags.includes("aroused") ) {
							valid = false;
						}
					}
				}
				if ( valid ) {
					validInteractions.push(iKey);
				}
			}
		}
		
		return validInteractions;
	}
	
	SocIntSys.prototype.getOfferedInteractionsToChar = function(character,numInteractions) {
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
	
	SocIntSys.prototype.npcsMakeInterRoundDecisions = function() {
		var allowOtherCostlyDecisions = true;
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
			if ( this.tempLeftSis.includes(actor) == false && this.tempLeftSis.includes(target) == false ) {
					if ( target == "" ) {
						switch(action[1]) {
							case "leave":							// Leaving
								this.tempLeftSis.push(actor);
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
						}
						if ( action[1] != "leave" ) {
							if ( allowOtherCostlyDecisions ) {
								this.executeStandardSistEffects(action[1],actor,target,action[3]);
								allowOtherCostlyDecisions = false;
							}
						}
					}
			}
		}
		for ( var character of chars ) {
			gC(character).wasPromptedInCurrentSisRound = false;
		}
	}
	SocIntSys.prototype.executeStandardSistEffects = function(sistId,actor,target,extra) {
		// This gets executed when a character other than the player's executes a sist. For player, check processTopicResult()
		// var sist = State.variables.sistDB[sistId];
		var sist = setup.sistDB[sistId];
		if ( sist.isPossible(actor,target,extra) ) { // Is it possible
			if ( gC(actor).socialdrive.current >= sist.getSocialdriveOfferCost(actor,target,extra) ) {
				gC(actor).socialdrive.current -= sist.getSocialdriveOfferCost(actor,target,extra);
				if ( target == "chPlayerCharacter" ) {
					sist.askToPlayer(actor,target,this.key,extra);
				}
				else { // Is it successful
					var isSuccessful = sist.isSuccessful(actor,target,extra,extra);
					this.importantMessages += isSuccessful[2] + "\n";
					if ( isSuccessful[0] ) {
						gC(actor).wasPromptedInCurrentSisRound = true;
						gC(target).wasPromptedInCurrentSisRound = true;
						sist.getSuccessEffect(actor,target,extra);
					}
					else {
						sist.getFailEffect(actor,target,extra);
					}
				}
			}
		}
		
	}
	
	SocIntSys.prototype.applyExpGains = function(charsNactions) {
		var roundMult = this.roundsCount * 0.2 - ((this.roundsCount * 0.2) % 1);
		if ( roundMult > 3 ) { roundMult = 3; }
		if ( roundMult >= 1 ) {
			var mult = roundMult * ( 0.4 + this.charList.length * 0.3 );
			for ( var cNa of charsNactions ) {
				if ( cNa[2] != "doNothing" ) {
					var charKey = cNa[0];
					var chaExp = 2 * gC(charKey).charisma.affinity * mult;
					var empExp = 2 * gC(charKey).empathy.affinity * mult;
					gC(charKey).charisma.experience += chaExp;
					gC(charKey).empathy.experience += empExp;
					this.expGainsDescription += "\n" + gC(charKey).getFormattedName() + " has gained " + chaExp.toFixed(1) + " and " + empExp.toFixed(1) + " charisma and empathy exp.";
				}
			}
		}
	}
	
	// Logic (The heavy stuff)
	SocIntSys.prototype.preInitiateNewRoundNoPC = function(flagInterrounds) {
		if ( flagInterrounds ) {
			this.npcsMakeInterRoundDecisions();
		}
		if ( this.charList.length > 0 ) {
			this.initiateNewRound();
		}
	}
	SocIntSys.prototype.preInitiateNewRoundWithPC = function() {
		this.npcsMakeInterRoundDecisions();
	}
	SocIntSys.prototype.initiateNewRound = function() {
		if ( State.variables.compass.flagEndedScenario == false ) {
			var newSevent = createSystemEventSisRound(this.charList,this.key);
			State.variables.compass.ongoingEvents.push(newSevent);

			State.variables.compass.sortOnGoingEventsByTime();
		} else {
			
		}
	}
	SocIntSys.prototype.processRound = function() {
		this.tempLeftSis = [];
		// Add info points if required
		if ( this.charList.includes("chPlayerCharacter") ) {
			for ( var cK in this.charList ) {
				this.charsSocialInfo[this.charList[cK]] += Math.pow(((gCstat("chPlayerCharacter","empathy")*3 + gCstat("chPlayerCharacter","perception")*2 + gCstat("chPlayerCharacter","intelligence")) * 0.16 ),0.65) * ((50 + gCstat("chPlayerCharacter","empathy")) / ((50) + gCstat(this.charList[cK],"charisma"))) * 0.1;
			}
		}
		
		// Data clean
		this.charMoodChanges = [];
		this.charRelChanges = [];
		this.extraEffect = "";
		this.interactionsDescription = "";
		this.expGainsDescription = "";
		
		// Get interactions and order them
		this.charInteractions = [];
		this.feedCharInteractionsOptionsList();
		var charsNactions = []; // List of lists with charKeys, targetKeys and interactions keys,
								// such as [["chVal","chNash","flirt"],["chNash","chVal","patronize"]]
							
		charsNactions = this.processCharsInteractions();
		charsNactions = this.orderInteractions(charsNactions);
		
		var interactionsList = [];
		for ( var cNa in charsNactions ) {
			if (charsNactions[cNa][2] != "doNothing" && charsNactions[cNa][2] != "") {
				var valid = true;
				if ( gSettings().lewdMales == "disable" ) {
					if ( getSiByKey(charsNactions[cNa][2]).tags.includes("flirty") || getSiByKey(charsNactions[cNa][2]).tags.includes("aroused") ) {
						if ( isLewdingPossible(charsNactions[cNa][0],charsNactions[cNa][1]) == false ) {
							valid = false;
						}
					}
				}
				if ( valid ) {
					interactionsList.push(this.createInteraction(charsNactions[cNa]));
				}
			}
		}
		// Process interactions' logic
		for ( var interaction of interactionsList ) {
			this.interactionExtraEffect(interaction);
			this.interactionMoodChanges(interaction);
			this.interactionRelationChanges(interaction);
			interaction.furtherEffects(this);
			gC(interaction.actor).socialdrive.current -= interaction.socialDriveCost;
			gC(interaction.actor).willpower.current -= interaction.willpowerCost;
			gC(interaction.actor).energy.current -= interaction.energyCost;
			this.interactionsDescription += interaction.getDescription() + "\n";
		}
		
		this.applyExpGains(charsNactions);
		
		// Remember player pick
		State.variables.sisPlayerInfo.lastTarget = State.variables.sisPlayerInfo.currentTarget;
		
		// Chance of rerolling missions
		for ( var cK of this.charList ) {
			if ( cK != "chPlayerCharacter" ) {
				if ( gC(cK).mission == "" || getValidSocialMissions().includes(gC(cK).mission) == false ) {
					if ( limitedRandomInt(100) >= 80 ) {
						npcAttemptsToRerollSocialMission(cK);
					}
				}
			}
		}
		
		// End round
		this.roundsData.push(charsNactions);
		this.roundsCount++;
	}
	
	SocIntSys.prototype.processCharsInteractions = function() {
		var results = [];
		for ( var character of this.charList ) {
			if ( character == "chPlayerCharacter" ) {
				if ( State.variables.sisPlayerInfo.currentInteraction != "none" ) {
					results.push([character,State.variables.sisPlayerInfo.currentTarget,State.variables.sisPlayerInfo.currentInteraction]);
				}
			}
			else {
				var offeredInteractions = this.getOfferedInteractionsToChar(character,getCharsNumberInteractions(character));	// Character is offered interactions
				
				var usableInteractions = [];
				for ( var interaction of offeredInteractions ) {							// Unusable interactions are purged
					if ( interaction != "errorWList" ) {
						if ( getSiByKey(interaction).isUsable(this,character,character,[],null) ) {
							usableInteractions.push(interaction);
						}
					}
				}
					
				var chosenInteraction = chooseActorsSISinteractionTarget(character,this,usableInteractions);
				results.push([character,chosenInteraction[1],chosenInteraction[0]]);
			}
		}
		return results;
	}
	SocIntSys.prototype.orderInteractions = function(charsNactions) {
		// TO DO
		return charsNactions;
	}
	SocIntSys.prototype.createInteraction = function(cNa) {
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
	
	SocIntSys.prototype.interactionExtraEffect = function(interaction) {
		interaction.extraEffect = interaction.calculateExtraEffect();
	}
	SocIntSys.prototype.interactionMoodChanges = function(interaction) {
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
	SocIntSys.prototype.interactionRelationChanges = function(interaction) {
		var relationMultiplier = interaction.getRelationMultiplier() * setup.conversationRelationMultiplier;
		
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
	
	SocIntSys.prototype.charLeavesSisAiProtocol = function(charKey) {
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
	SocIntSys.prototype.getAllPossibleInteractions = function(character,target) {
		var allSocInt = getAllSocialInteractions();
		var charSocInt = []; // Valid social interactions for character
		for ( var si of allSocInt ) {
				charSocInt.push(si);
		}
		return charSocInt;
	}

	SocIntSys.prototype.playerRequestsJoin = function() {
		var i = this.getCorrespondingRoundEventPos();
		if ( i != -1 ) {
			var remainingTime = State.variables.compass.ongoingEvents[i].timeRemaining;
			if ( remainingTime != 5 ) {
				State.variables.compass.advanceTime(remainingTime);
			}
		}
	}

	SocIntSys.prototype.charJoinsSis = function(character) {
		if ( this.charList.includes(character) == false ) {
			gC(character).mapAi.state = "active";
			this.charList.push(character);
			if ( character == "chPlayerCharacter" ) {
				State.variables.compass.pcSis = this.key;
				State.variables.sisPlayerInfo.autoSelectNewTarget();
			}
		}
		if ( this.charsSocialInfo[character] == undefined ) {
			this.charsSocialInfo[character] = 0;
		}
	}
	SocIntSys.prototype.charsJoinSis = function(charList) {
		for ( var charKey of charList ) {
			this.charJoinsSis(charKey);
		}
	}

	SocIntSys.prototype.charLeavesSis = function(character) {
		this.charLeavesSisAiProtocol(character);
		this.charList = arrayMinusA(this.charList,character);
		
		if ( character == "chPlayerCharacter" ) { // Player clause
			State.variables.sisPlayerInfo.clean();
			if ( (this.charList.length > 1) && (this.getCorrespondingRoundEventPos() == -1) ) {
				// If there's no associated event, Player leaves, and there are other characters in conversation,
				// generate new round event
				this.preInitiateNewRoundNoPC(false);
			}
		}
		
		var i = this.getCorrespondingRoundEventPos(); // Remove characters from corresponding event
		if ( i != -1 ) {
			State.variables.compass.ongoingEvents[i].removeCharFromEvent(character); // characters = arrayMinusA(State.variables.compass.ongoingEvents[i].characters,character);
		}
		
		if ( gC(character).followedBy.length > 0 ) { // Followers leave
			for ( var charKey of  gC(character).followedBy ) {
				if ( this.charList.includes(charKey) ) {
					this.charLeavesSis(charKey);
				}
			}
		}
		
		if ( this.charList.length < 2 ) { // Check Sis End
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
		
		if ( this.charList.includes("chPlayerCharacter") ) { // Autoselect new player's target
			State.variables.sisPlayerInfo.autoSelectNewTarget();
		}
		
		if ( character != "chPlayerCharacter" ) { // Remove social mission if required
			if ( getValidSocialMissions().includes(gC(character).mission) ) {
				gC(character).mission = "";
			}
		}
	}
	SocIntSys.prototype.charsLeaveSis = function(charList) {
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
			this.preInitiateNewRoundNoPC(false);
		}
	}
	SocIntSys.prototype.remainingCharsLeaveSis = function() {
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
	
	SocIntSys.prototype.playerPicksInteraction = function(interactionKey) {
		State.variables.sisPlayerInfo.currentInteraction = interactionKey;
		// This must be working later
		// State.variables.compass.advanceTime(5);
		this.initiateNewRound();
		State.variables.compass.pushAllTimeToAdvance();
	}
	SocIntSys.prototype.playerDoesNotPickInteraction = function(interactionKey) {
		State.variables.sisPlayerInfo.currentInteraction = "none";
		// This must be working later
		// State.variables.compass.advanceTime(5);
		this.initiateNewRound();
		State.variables.compass.pushAllTimeToAdvance();
	}
	
	SocIntSys.prototype.feedCharInteractionsOptionsList = function() {
		var i = 0;
		if ( this.charInteractions.length != this.charList.length ) {
			for ( var character of this.charList ) {
				this.charInteractions[i] = this.getOfferedInteractionsToChar(character,(getCharsNumberInteractions(character)));
				i++;
			}
		}
	}
	
	SocIntSys.prototype.getPlayerOfferedInteractions = function() {
		// Finds the SIS' assigned interactions for the player and returns them
		var it = 0;
		var itA = this.charList[it];
		while ( itA != "chPlayerCharacter" ) {
			it++;
			itA = this.charList[it];
		}
		return this.charInteractions[it];
	}
	
	SocIntSys.prototype.getCorrespondingRoundEventPos = function() {
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
	
	SocIntSys.prototype.setSisPlayerPrompt = function(promptText,extra,rejectCost,actor,target,sT) {
		// Extra is a keyword that specifies specific behavior
		this.flagPlayerIsPrompted = true;
		this.playerPromptText = promptText;
		switch ( extra ) {
			case "default":
				this.playerPromptText += "\n" + this.getButtonRejectSisPrompt(rejectCost,sT,actor,target);
				break;
			case "relTypeForcesToAccept":
				this.playerPromptText += "\n" + colorText("Locked:","firebrick") + " Your special relationship doesn't allow you to refuse.";
				break;
			case "noExtra":
				break;
		}
	}
	SocIntSys.prototype.endSisPlayerPrompt = function() {
		this.flagPlayerIsPrompted = false;
		this.playerPromptText = "";
	}
	
	// Data
	SocIntSys.prototype.setCharMoodChange = function(character,moodVector) {
		if ( this.charMoodChanges.hasOwnProperty(character) ) {
			this.charMoodChanges[character] = sumMoodVectors(this.charMoodChanges[character],moodVector);
			this.charMoodChanges[character].name = character;
		} else {
			this.charMoodChanges[character] = moodVector;
			this.charMoodChanges[character].name = character;
		}
	}
	SocIntSys.prototype.setCharRelationChange = function(actor,target,relationVector) {
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
	SocIntSys.prototype.getButtonPlayerDoesNothing = function() {
		var bText = "<<l" + "ink [[Do nothing|Social Interactions]]>><<s" + "cript>>\n";
		bText 	 += "State.variables.compass.sisList[" + this.key + "].playerDoesNotPickInteraction();";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	SocIntSys.prototype.getButtonPlayerPicksAction = function(actionKey,target) {
		var bText = "<<l" + "ink [[" + getSiByKey(actionKey).title + "|Social Interactions]]>><<s" + "cript>>\n";
		bText 	 += "State.variables.compass.sisList[" + this.key + "].playerPicksInteraction('" + actionKey + "');";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	SocIntSys.prototype.getButtonEndSis = function() {
		var bText = "<<l" + "ink [[Leave conversation|Map]]>><<s" + "cript>>\n";
		bText	 += "playerLeavesSis();\n";
		//bText 	 += "State.variables.compass.sisList[" + this.key + "].charsLeaveSis(getCharGroup('chPlayerCharacter'));";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	SocIntSys.prototype.getButtonEndDeadSis = function() {
		var bText = "<<l" + "ink [[Leave|Map]]>><<s" + "cript>>\n";
		bText 	 += "State.variables.compass.sisList[" + this.key + "].charsLeaveSis(getCharGroup('chPlayerCharacter'));";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	SocIntSys.prototype.getButtonSisSpecifics = function() {
		var bText = "<<l" + "ink [[Specific Topics|Social Interactions Specifics]]>><<s" + "cript>>\n";
		bText	 += "State.variables.sisSpecifics.playerTarget = State.variables.sisPlayerInfo.currentTarget;\n";
		bText	 += 'State.variables.sisPlayerInfo.lastTarget = State.variables.sisPlayerInfo.currentTarget;\n';
		bText 	 += 'State.variables.sisPlayerInfo.currentTarget = "";\n';
		bText 	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}

	SocIntSys.prototype.getButtonRejectSisPrompt = function(cost,sT,actor,target) {
		var bText = "<<l" + "ink [[Reject|Social Interactions]]>><<s" + "cript>>\n";
		bText	 += "State.variables.chPlayerCharacter.willpower.current -=" + cost + ";\n";
		if ( sT != -1 ) {
			bText += "setup.sistDB['" + sT + "'].getFailEffect('" + actor + "','chPlayerCharacter');\n";
		}
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

	SocIntSys.prototype.getButtonForcedOutOfSis = function() {
		var bText = "<<l" + "ink [[Continue to map|Map]]>><<s" + "cript>>\n";
		// bText 	 += "State.variables.compass.sisList[" + this.key + "].charsLeaveSis(getCharGroup('chPlayerCharacter'));";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}

	SocIntSys.prototype.getButtonTakenToScene = function() {
		var bText = "<<l" + "ink [[Continue to scene|Scene]]>><<s" + "cript>>\n";
		bText	 += "State.variables.compass.sisList[" + this.key + "].flagPlayerTakenToScene = 'false';\n";
		if ( gC("chPlayerCharacter").hasOwnProperty("sisWillSkipTimeFlag") ) {
			bText += "sisSkippingTime();\n"
		}
		bText	 += "State.variables.sc.formatScenePassage();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}

	// Provide info
	SocIntSys.prototype.getValidProposedCharacters = function(proposerCharacter) {
		// Returns a list with the SIS' characters that proposerCharacter may make specific proposals to, such as leaving to have sex
		var validCharsList = [];
		for ( var charKey of this.charList ) {
			if ( (gC(charKey).followingTo == "" || gC(charKey).followingTo == proposerCharacter) && ( charKey != proposerCharacter ) ) {
				validCharsList.push(charKey);
			}
		}
		
		return validCharsList;
	}

window.playerLeavesSis = function() {
	var sisId = State.variables.compass.findFirstSisIdInvolvingCharacter("chPlayerCharacter");
	if ( sisId != -1 ) {
		var playerFollowsTo = gC("chPlayerCharacter").followingTo;
		if ( playerFollowsTo == "" ) {
			State.variables.compass.sisList[sisId].charsLeaveSis(getCharGroup('chPlayerCharacter'));
		} else {
			charUnfollowsChar("chPlayerCharacter",playerFollowsTo);
			State.variables.compass.sisList[sisId].charsLeaveSis(['chPlayerCharacter']);
		}
	}
}

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

window.getCharsNumberInteractions = function(charKey) {
	var n = scoreIntoInteractions(getScoreInteractions(charKey));
	return n;
}
window.getScoreInteractions = function(actor) {
	var score = gCstat(actor,"empathy") * 1.2 + gCstat(actor,"charisma") * 0.6 + gCstat(actor,"luck") * 0.2;
	return score;
}
window.scoreIntoInteractions = function(score) {
	var n = 3;
	if ( score >= 190 ) { n = 10; }
	else if ( score >= 155 ) { n = 9; }
	else if ( score >= 115 ) { n = 8; }
	else if ( score >= 80 ) { n = 7; }
	else if ( score >= 50 ) { n = 6; }
	else if ( score >= 30 ) { n = 5; }
	else if ( score >= 20 ) { n = 4; }
	return n;
}

window.npcAttemptsToRerollSocialMission = function(cK) {
	var convId = State.variables.compass.getCharacterSisId(cK);
	if ( convId != -1 ) {
		State.variables.compass.sisList[convId].npcRerollsSocialMission(cK);
	}
}
SocIntSys.prototype.npcRerollsSocialMission = function(cK) {
	var validMissions = [];
	var selectedMission = "";
	for ( var target of this.charList ) {
		if ( gC(cK).socialAi.allyTs.includes(target) ) {
			validMissions.push("raiseFriendship");
		}
		if ( gC(cK).socialAi.loveTs.includes(target) ) {
			validMissions.push("flirt");
		}
		if ( gC(cK).socialAi.covetTs.includes(target) ) {
			validMissions.push("flirt");
			validMissions.push("seduce");
		}
		if ( gC(cK).socialAi.conquestTs.includes(target) ) {
			validMissions.push("seduce");
		}
		if ( gC(cK).socialAi.rivalTs.includes(target) ) {
			validMissions.push("taunt");
		}
	}
	if ( validMissions.length > 0 ) {
		selectedMission = randomFromList(validMissions);
	}
	return selectedMission;
}

// Ad-hoc solution to scene skipping
window.setFlagSisExitButtonSkipsTime = function() {
	gC("chPlayerCharacter").sisWillSkipTimeFlag = true;
}
window.sisSkippingTime = function() {
	delete gC("chPlayerCharacter").sisWillSkipTimeFlag;
	State.variables.compass.pushAllTimeToAdvance();
}


