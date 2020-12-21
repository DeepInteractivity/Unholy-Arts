////////// PERSONAL ROOM CLASS  //////////
// Information regarding the options at the player's personal room

window.PersonalRoom = function() {
	this.roomState = "main"; // Alts: "charInfo" , "scrolls" , "candidatesComparison" , "endDayScreen"
	
	this.availableCharsInfo = [ "chPlayerCharacter" , "chNash", "chMir", "chVal", "chClaw", "chAte" ];
	this.checkedCharacter = "chPlayerCharacter";
	this.selectedScroll = "none";
	
	this.lastAutosaveDay = -1;
	
	// UI
	
	this.roomText = "";
	this.newDayInfo = "";
	
	this.autosavePossible = true;
	
	this.formatRoomText = function() {
		switch(this.roomState) {
			case "main":
				this.roomText = '<<s' + 'cript>>attemptAutosave<</s' + 'cript>> \ ';
				this.roomText += "__Personal room__\nThe water flows quietly.\n";				// Description
				this.roomText += '<span style="color:green">You can save the game.</span>\n'; // You can save msg
				this.roomText += this.getButtonFinishDay() + "\n";								  // New day
				this.roomText += "\n__Characters info__:\n" 										// Characters info
				 
				this.roomText += this.getButtonsCharInfo() + "\n";
				this.roomText += this.getButtonComparisonChart() + "\n\n"
				if ( State.variables.chPlayerCharacter.studiedScrolls.length > 0 ) {
					this.roomText += this.getButtonReadScrolls() + "\n\n";
				}
				this.roomText += this.getButtonSettings() + '\n\n'; // Link to settings
				this.roomText += '$supToolsData.cheatMenuLinkText'; // Cheats
				this.roomText += getHotfixButton();
				break;
			case "charInfo": 																	// Char info screen
				this.roomText  = "" + this.getButtonBackToMain() + "\n";
				this.roomText += this.getCharacterInfo(this.checkedCharacter);
				break;
			case "scrolls":
				if ( this.selectedScroll == "none" ) {
					this.roomText = this.getReReadScrollsPassage();
				} else {
					this.roomText = this.getReReadScrollPassage(this.selectedScroll);
				}
				break;
			case "candidatesComparison":
				this.roomText = this.getCandidatesComparisonPassage();
				break;
			case "endDayScreen":
				if ( this.newDayInfo == "" ) {
					this.roomText = "Nothing relevant is happening.\n\n";
				} else {
					this.roomText = this.newDayInfo + "\n";
					this.newDayInfo = "";
				}
				this.roomText += this.getButtonNewDay();
				this.roomText += "\n<<" + "script>>State.variables.personalRoom.roomState = 'main';<</" + "script>> \ ";
				break;
		}
	}
	
	// Buttons
	
	this.getButtonBackToMain = function() {
		var bText = "<<l" + "ink [[Go back|Personal Room]]>><<s" + "cript>>";;
		bText 	 += "State.variables.personalRoom.roomState = 'main';\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.getButtonsCharInfo = function() {
		var bText = "";
		for ( var character of this.availableCharsInfo ) {
			
			bText += "<<l" + "ink [[" + gC(character).name + "|Personal Room]]>><<s" + "cript>>";
			bText += "State.variables.personalRoom.roomState = 'charInfo';\n";
			bText += "State.variables.personalRoom.checkedCharacter = '" + character + "';";
			//bText += "$rightUiBar.stow()";
			bText += "<</s" + "cript>><</l" + "ink>> " + gC(character).icon();
			if ( gRelTypeAb(character,"chPlayerCharacter") ) {
				bText += " (" + getRelTypeAbr(character,"chPlayerCharacter") + ")";
			}
			bText += "\n";
		}
		return bText;
	}
	
	this.getButtonReadScrolls = function() {
		var bText = "<<l" + "ink [[Check studied scrolls|Personal Room]]>><<s" + "cript>>";
			bText += "State.variables.personalRoom.roomState = 'scrolls';\n";
			bText += "State.variables.personalRoom.selectedScroll = 'none';\n";
			bText += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.getButtonReadScroll = function(scrollKey) {
		var bText = "<<l" + "ink [[" + State.variables.scrollsList[scrollKey].title + "|Personal Room]]>><<s" + "cript>>";
			bText += "State.variables.personalRoom.roomState = 'scrolls';\n";
			bText += "State.variables.personalRoom.selectedScroll = '" + scrollKey + "';\n";
			bText += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	this.getButtonComparisonChart = function() {
		var bText = "<<l" + "ink [[Candidates Comparison|Personal Room]]>><<s" + "cript>>";
			bText += "State.variables.personalRoom.roomState = 'candidatesComparison';\n";
			bText += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	this.getButtonFinishDay = function() {
		var bText = "<<l" + "ink [[Rest and initiate a new day|Personal Room]]>><<s" + "cript>>";
			bText += "State.variables.personalRoom.roomState = 'endDayScreen';\n";
			bText += "State.variables.personalRoom.endDayEffects();\n";
			bText += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	this.getButtonNewDay = function() {
		return State.variables.eventsCalendar.getEndDayButton();
		/* OLD
		var bText = "<<l" + "ink [[Rest and initiate a new day|Map]]>><<s" + "cript>>\n";
		bText	 += "State.variables.personalRoom.initializeNewDay();\n";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
		*/
	}
	
	this.getButtonSettings = function() {
		var bText = '<<link [[Settings|Settings]]>' + '><<s' + 'cript>>State.variables.settings.setExitPassage("Personal Room");'
				  + 'State.variables.settings.formatAllChoices();<</s' + 'cript>><</l' + 'ink>>';
		return bText;
	}
	
	// Character info
	
	this.getCharacterInfo = function(character) {
		// <p><img src="img/logo.png" alt="alt text" style="float: right">Text here</p>
		var iText = "<div><p>";
		
		if ( gC(character).fullPortrait != null ) {															// Image
			iText += '<div class="portraitBox"><img src="' + gC(character).fullPortraitL + '" alt="" style="float: right"></div>'
		} else if ( gC(character).avatar != null ) {
			iText += '<div class="portraitBox"><img src="' + gC(character).avatarL + '" alt="" style="float: right"></div>'
		}
		
		// Name, merit, money
		iText += "<div class='standardBox'>    __" + gC(this.checkedCharacter).getFormattedName() + "__:\n";							// Name
		if ( gC(character).type == "candidate" ) {
			iText += "Merit: " + gC(character).merit;
			iText += " | Infamy: " + gC(character).infamy + "/" + State.variables.settings.infamyLimit;
			if ( character == "chPlayerCharacter" ) {
				iText += " | Money: " + gC(character).money.toFixed(0);
			}
			iText += "</div>\n";
		}
		
		// Special relationships
		var tempText = "";
		if ( gC(character).domChar ) {
			tempText += "Submissive relationship: "
					  + gC(gC(character).domChar).getFormattedName() + ": " + getRelTypeNameMayus(gC(character).domChar,character);
					  if ( gRelTypeAb(gC(character).domChar,character).persistence == "temporary" ) {
						  tempText += " | Days remaining: " + gRelTypeAb(gC(character).domChar,character).days;
					  }
		}
		if ( gC(character).subChars.length > 0 ) {
			tempText += "Dominant relationships: ";
			for ( var sChar of gC(character).subChars ) {
				tempText += "\n" + gC(sChar).getFormattedName() + ": " + getRelTypeNameMayus(sChar,character);
					  if ( gRelTypeAb(sChar,character).persistence == "temporary" ) {
						  tempText += " | Days remaining: " + gRelTypeAb(sChar,character).days;
					  }
			}
		}
		if ( gC(character).egaChars.length > 0 ) {
			if ( tempText != "" ) { textText += "\n"; }
			tempText += "Egalitarian relationships: ";
			for ( var eChar of gC(character).egaChars ) {
				tempText += "\n" + gC(eChar).getFormattedName() + ": " + getRelTypeNameMayus(eChar,character);
					  if ( gRelTypeAb(eChar,character).persistence == "temporary" ) {
						  tempText += " | Days remaining: " + gRelTypeAb(eChar,character).days;
					  }
			}
		}
		if ( tempText != "" ) {
			iText += "<div class='standardBox'>__Special Relationships__:\n";
			iText += tempText;
			iText += "</div>\n";
		}
		
		// Base stats
		iText += "<div class='standardBox'>__Stats__:\n";																				// Stats
		iText += colorText("Max lust: ","lightcoral") + gC(character).lust.max + " ; " + colorText("Max willpower: ","darkslateblue") + gC(character).willpower.max + " \n";
		iText += colorText("Max energy: ","limegreen") + gC(character).energy.max + " ; " + colorText("Max social drive: ","khaki") + gC(character).socialdrive.max + " \n";
		iText += "\nPhysique: " + gC(character).physique.value + " (" + gC(character).physique.getValue() + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).physique); }
		iText += "\nAgility: " + gC(character).agility.value + " (" + gC(character).agility.getValue() + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).agility); }
		iText += "\nResilience: " + gC(character).resilience.value + " (" + gC(character).resilience.getValue() + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).resilience); }
		
		iText += "\nWill: " + gC(character).will.value + " (" + gC(character).will.getValue() + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).will); }
		iText += "\nIntelligence: " + gC(character).intelligence.value + " (" + gC(character).intelligence.getValue() + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).intelligence); }
		iText += "\nPerception: " + gC(character).perception.value + " (" + gC(character).perception.getValue() + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).perception); }
		
		iText += "\nEmpathy: " + gC(character).empathy.value + " (" + gC(character).empathy.getValue() + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).empathy); }
		iText += "\nCharisma: " + gC(character).charisma.value + " (" + gC(character).charisma.getValue() + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).charisma); }
		iText += "\nLuck: " + gC(character).luck.value + " (" + gC(character).luck.getValue() + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).luck); }
		iText += "</div>\n";
		
		// Relationships
		if ( character != "chPlayerCharacter" ) {			// Relationship
			iText += "<div class='standardBox'>__Your thoughts on " + gC(character).name + "__:\n";
			var rpNames = [ "Friendship", "Sexual Tension", "Romance", "Domination", "Submission", "Rivalry", "Enmity" ];
			var i = 0;
			for ( var relPar in gC("chPlayerCharacter").relations[character] ) {
				if ( gC("chPlayerCharacter").relations[character][relPar] instanceof RelPar ) {
					iText += rpNames[i] + " - Lvl: " + gC("chPlayerCharacter").relations[character][relPar].level + ">("
						   + formulaRelParTotalLevel(gC("chPlayerCharacter").relations[character][relPar]) + ")"
						   + " | ST: " + gC("chPlayerCharacter").relations[character][relPar].stv.toFixed(1)
						   + " (" + colorText((gC("chPlayerCharacter").relations[character][relPar].stv * 0.05).toFixed(1),"red") + ")"
						   + " | LT: " + gC("chPlayerCharacter").relations[character][relPar].ltv.toFixed(1)
						   + " (" + colorText((gC("chPlayerCharacter").relations[character][relPar].stv * 0.01).toFixed(1),"green") + ")";
					if ( i < 6 ) { iText += "\n"; }
					i++;
				}
			}
			iText += "\nFavor owed to " + gC(character).name + ": " + gC("chPlayerCharacter").relations[character].favor.toFixed(2);
			iText += "</div>";
			
			iText += "\n<div class='standardBox'>__" + gC(character).name + "'s thoughts on you__:\n";
			i = 0;
			for ( var relPar in gC(character).relations["chPlayerCharacter"] ) {
				if ( gC(character).relations["chPlayerCharacter"][relPar] instanceof RelPar ) {
					iText += rpNames[i] + " - Lvl: " + gC(character).relations["chPlayerCharacter"][relPar].level + ">("
						   + + formulaRelParTotalLevel(gC(character).relations["chPlayerCharacter"][relPar]) + ")"
						   + " | ST: " + gC(character).relations["chPlayerCharacter"][relPar].stv.toFixed(1)
						   + " (" + colorText((gC(character).relations["chPlayerCharacter"][relPar].stv * 0.05).toFixed(1),"red") + ")"
						   + " | LT: " + gC(character).relations["chPlayerCharacter"][relPar].ltv.toFixed(1)
						   + " (" + colorText((gC(character).relations["chPlayerCharacter"][relPar].stv * 0.01).toFixed(1),"green") + ")";
					if ( i < 6 ) { iText += "\n"; }
					i++;
				}
			}
			iText += "\nFavor owed to you: " + gC(character).relations.chPlayerCharacter.favor.toFixed(2);
			iText += "</div>";
		}
		
		iText += "</p></div>";
		
		
		return iText;
	}
	
	// Scrolls
	
	this.getReReadScrollsPassage = function() {
		var passageText = "__Studied scrolls__:\n";
		for ( var scr of gC("chPlayerCharacter").studiedScrolls ) {
			passageText += "- " + this.getButtonReadScroll(scr) + "\n";
			// passageText += "- " + State.variables.scrollsList[scr].title + "\n";
		}
		passageText += "\n" + this.getButtonBackToMain();
		return passageText;
	}
	this.getReReadScrollPassage = function(scrollKey) {
		var passageText = "__" + State.variables.scrollsList[scrollKey].title + "__:\n\n"
						+ State.variables.scrollsList[scrollKey].getContent() + "\n\n"
						+ this.getButtonReadScrolls() + "\n"
						+ this.getButtonBackToMain();
		return passageText;
	}

	// Candidates Comparison|Personal
	
	this.getCandidatesComparisonPassage = function() {
		var passageText = "__Candidates Comparison__:\n";
		passageText += '<table><tr><td>__Candidate__</td><td>__Merit__</td><td>__Ph__</td><td>__Ag__</td><td>__Re__</td><td>__Wi__</td><td>__In__</td><td>__Pe__</td><td>__Ch__</td><td>__Em__</td><td>__Lu__</td></tr>';
		for ( var charKey of getCandidatesKeysArray() ) {
			passageText += '<tr><td>' + gC(charKey).getFormattedName() + '</td><td>' + gC(charKey).merit + '</td><td>' + gC(charKey).physique.value + '</td><td>' + gC(charKey).agility.value + '</td><td>' + gC(charKey).resilience.value + '</td><td>' + gC(charKey).will.value + '</td><td>' + gC(charKey).intelligence.value + '</td><td>' + gC(charKey).perception.value + '</td><td>' + gC(charKey).charisma.value + '</td><td>' + gC(charKey).empathy.value + '</td><td>' + gC(charKey).luck.value + '</td></tr>';
		}
		passageText += '</table>\n';
		passageText += this.getButtonBackToMain();
		return passageText;
	}

	// Logic
	
	this.initPersonalRoom = function() {
		State.variables.compass.currentMap = "none";
		State.variables.eventsCalendar.stablishTomorrowsEvent();
		State.variables.personalRoom.autosavePossible = true;
	}
	
	this.endDayEffects = function() {
		
		State.variables.personalRoom.autosavePossible = false;
		
		// New day
		State.variables.daycycle.addDays(1);
		for ( var character of getActiveSimulationCharactersArray() ) {
			gC(character).restoreBars(); // Energy bars
			gC(character).mood.resetMood(); // Moods
			
			gC(character).studiedScrollToday = false;
		}
		
		// Set time
		State.variables.daycycle.hours = State.variables.simCycPar.templeNewDayTime;
		State.variables.daycycle.minutes = 0;
		
		// Level up stats
		for ( var character of getActiveSimulationCharactersArray() ) {
			for ( var stat of State.variables.baseStats ) {
				if ( gC(character)[stat].tryLevelUp() ) {
					// Notify level up
					if ( character == "chPlayerCharacter" ) {
						this.newDayInfo += "Your " + stat + " has increased to " + gC(character)[stat].value + ".\n";
					}
				}
			}
			State.variables[character].recalculateMaxBars();
		}
		
		// Relations and mood
		this.endDayRelationMoodEffects();

		// Infamy
		for ( var charKey of getCandidatesKeysArray() ) {
			gC(charKey).changeInfamy(-1);
			if ( gC(charKey).globalAi.hasOwnProperty("attackedToday") ) {
				gC(charKey).globalAi.attackedToday = false;
			}
		}

	}
	this.endDayRelationMoodEffects = function() {
		var relTypesToFinish = [];
		for ( var character of getActiveSimulationCharactersArray() ) {
			for ( var rel in gC(character).relations ) {
				if ( gC(character).relations[rel] instanceof Relation ) {
					var iRelation = gC(character).relations[rel];
					if ( gC(character).relations[rel].processNewDay() ) {
						// Notify relation change
						if ( character == "chPlayerCharacter" ) {
							this.newDayInfo += "Your opinion of " + gC(iRelation.target).name + " is changing.\n";
						}
						else if ( iRelation.target == "chPlayerCharacter" ) {
							this.newDayInfo += gC(character).name + "'s opinion of you is changing.\n";
						}
					}
					var rType = iRelation.relType
					if ( rType ) { // Special relationship
						// Effect
						this.newDayInfo += rType.dailyEffect() + "\n";
						// Rest days
						if ( rType.persistence == "temporary" ) {
							rType.days--;
							if ( rType.days == 0 ) {
								// Mark to finish
								relTypesToFinish.push([rType.actor,rType.target]);
							}
						}
					}
				}
			}
			gC(character).restoreMood();
		}
		
		// Finish marked special relationship
		for ( var rts of relTypesToFinish ) {
			if ( gRelTypeAb(rts[0],rts[1]) ) {
				this.newDayInfo += finishRelType(rts[0],rts[1]);
			}
		}
	}
	
	this.initializeNewDay = function() {
		
		// Temple period
		initTrainingPeriodPassionTemple();
		
		// AI social priorities
		for ( var character of arrayMinusA(getCandidatesKeysArray(),"chPlayerCharacter") ) {
			setSocialAiCandidateGoals(gC(character).socialAi);
		}
	}
};

State.variables.personalRoom = new PersonalRoom();

window.attemptAutosave = function() {
	if ( gSettings().autosaving == "enable" && State.variables.personalRoom.autosavePossible ) {
		if ( State.variables.personalRoom.lastAutosaveDay != State.variables.daycycle.day ) {
			Save.slots.save(7);
			State.variables.personalRoom.lastAutosaveDay = State.variables.daycycle.day;
		}
	}
}

// Constructors, serializers, etc.
PersonalRoom.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
PersonalRoom.prototype.clone = function () {
	return (new PersonalRoom())._init(this);
};
PersonalRoom.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new PersonalRoom())._init($ReviveData$)', ownData);
};

