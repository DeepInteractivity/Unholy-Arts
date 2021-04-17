////////// PERSONAL ROOM CLASS  //////////
// Information regarding the options at the player's personal room

window.PersonalRoom = function() {
	this.roomState = "main"; // Alts: "charInfo" , "merchants" , "equipment" , "customizeMood" , "scrolls" , "candidatesComparison" , "endDayScreen"
	
	this.availableCharsInfo = [ "chPlayerCharacter" , "chNash", "chMir", "chVal", "chClaw", "chAte" ];
	this.checkedCharacter = "chPlayerCharacter";
	this.selectedScroll = "none";
	
	this.lastAutosaveDay = -1;
	
	// UI
	
	this.roomText = "";
	this.newDayInfo = "";
	
	this.prMessages = "";
	
	this.autosavePossible = true;
	
	this.formatRoomText = function() {
		switch(this.roomState) {
			case "main":
				this.roomText = this.prMessages;
				if ( this.prMessages != "" ) { this.roomText += "\n"; }
				this.roomText += '<<s' + 'cript>>attemptAutosave();<</s' + 'cript>> \ ';
				this.roomText += "__Personal room__\nThe water flows quietly.\n";				// Description
				this.roomText += '<span style="color:green">You can save the game.</span>\n'; // You can save msg
				this.roomText += this.getButtonFinishDay() + "\n";								  // New day
				this.roomText += "\n__Characters info__:\n" 										// Characters info
				 
				this.roomText += this.getButtonsCharInfo() + "\n";
				this.roomText += getButtonMerchants();
				this.roomText += this.getButtonEquipment() + "\n";
				this.roomText += this.getButtonCustomizeMood() + "\n";
				this.roomText += this.getButtonComparisonChart() + "\n"
				if ( State.variables.chPlayerCharacter.studiedScrolls.length > 0 ) {
					this.roomText += this.getButtonReadScrolls() + "\n";
				}
				this.roomText += "\n" + this.getButtonSettings() + '\n\n'; // Link to settings
				this.roomText += '$supToolsData.cheatMenuLinkText'; // Cheats
				this.roomText += getHotfixButton();
				break;
			case "charInfo": 																	// Char info screen
				this.roomText  = "" + this.getButtonBackToMain() + "\n";
				this.roomText += this.getCharacterInfo(this.checkedCharacter);
				break;
			case "merchants":
				this.roomText = getMerchantsWindow();
				break;
			case "equipment":
				this.roomText = getEquipmentWindow();
				break;
			case "customizeMood":
				this.roomText = getCustomizeMoodWindow();
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
	
	this.getButtonEquipment = function() {
		var bText = "<<l" + "ink [[Equipment|Personal Room]]>><<s" + "cript>>";
			bText += "State.variables.personalRoom.roomState = 'equipment';\n";
			bText += "State.variables.selectedEquip = '';\n";
			bText += "State.variables.selectedChar = '';\n";
			bText += "State.variables.roomMessage = '';\n";
			bText += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	
	this.getButtonCustomizeMood = function() {
		var bText = "<<l" + "ink [[Customize Player Mood|Personal Room]]>><<s" + "cript>>";
			bText += "State.variables.personalRoom.roomState = 'customizeMood';\n";
			bText += "<</s" + "cript>><</l" + "ink>>";
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
		var bText = "<<l" + "ink [[" + setup.scrollsList[scrollKey].title + "|Personal Room]]>><<s" + "cript>>";
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
			if ( tempText != "" ) { tempText += "\n"; }
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
		iText += colorText("Max lust: ","lightcoral") + gC(character).lust.max.toFixed(0) + " ; " + colorText("Max willpower: ","darkslateblue") + gC(character).willpower.max.toFixed(0) + " \n";
		iText += colorText("Max energy: ","limegreen") + gC(character).energy.max.toFixed(0) + " ; " + colorText("Max social drive: ","khaki") + gC(character).socialdrive.max.toFixed(0) + " \n";
		iText += "\nPhysique: " + gC(character).physique.value.toFixed(0) + " (" + gC(character).physique.getValue().toFixed(1) + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).physique); }
		iText += "\nAgility: " + gC(character).agility.value.toFixed(0) + " (" + gC(character).agility.getValue().toFixed(1) + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).agility); }
		iText += "\nResilience: " + gC(character).resilience.value.toFixed(0) + " (" + gC(character).resilience.getValue().toFixed(1) + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).resilience); }
		
		iText += "\nWill: " + gC(character).will.value.toFixed(0) + " (" + gC(character).will.getValue().toFixed(1) + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).will); }
		iText += "\nIntelligence: " + gC(character).intelligence.value.toFixed(0) + " (" + gC(character).intelligence.getValue().toFixed(1) + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).intelligence); }
		iText += "\nPerception: " + gC(character).perception.value.toFixed(0) + " (" + gC(character).perception.getValue().toFixed(1) + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).perception); }
		
		iText += "\nEmpathy: " + gC(character).empathy.value.toFixed(0) + " (" + gC(character).empathy.getValue().toFixed(1) + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).empathy); }
		iText += "\nCharisma: " + gC(character).charisma.value.toFixed(0) + " (" + gC(character).charisma.getValue().toFixed(1) + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).charisma); }
		iText += "\nLuck: " + gC(character).luck.value.toFixed(0) + " (" + gC(character).luck.getValue().toFixed(1) + ")";
		if ( character == "chPlayerCharacter" ) { iText += " | " + getTextStatExp(gC(character).luck); }
		iText += "</div>\n";
		
		// Relationships
		if ( character != "chPlayerCharacter" ) {			// Relationship
			iText += "<div class='standardBox'>__" + gC(character).name + "'s thoughts on you__:\n";
			iText += getRelationshipDescription(character,"chPlayerCharacter")[0] + "\n";
			var i = 0;
			var rpNames = [ "Friendship", "Sexual Tension", "Romance", "Domination", "Submission", "Rivalry", "Enmity" ];
			for ( var relPar in gC(character).relations["chPlayerCharacter"] ) {
				if ( gC(character).relations["chPlayerCharacter"][relPar] instanceof RelPar ) {
					iText += rpNames[i] + " - Lvl: " + gC(character).relations["chPlayerCharacter"][relPar].level;
					var levelMod = gC(character).relations["chPlayerCharacter"][relPar].levelMod;
					if ( levelMod > 0 ) {
						iText += "+" + levelMod;
					} else if ( levelMod < 0 ) {
						iText += "-" + -levelMod;
					}
					iText += ">("
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
			
			iText += "\n<div class='standardBox'>__Your thoughts on " + gC(character).name + "__:\n";
			iText += getRelationshipDescription("chPlayerCharacter",character)[0] + "\n";
			i = 0;
			for ( var relPar in gC("chPlayerCharacter").relations[character] ) {
				if ( gC("chPlayerCharacter").relations[character][relPar] instanceof RelPar ) {
					iText += rpNames[i] + " - Lvl: " + gC("chPlayerCharacter").relations[character][relPar].level;
					var levelMod = gC("chPlayerCharacter").relations[character][relPar].levelMod;
					if ( levelMod > 0 ) {
						iText += "+" + levelMod;
					} else if ( levelMod < 0 ) {
						iText += "-" + -levelMod;
					}
					iText += ">(" + formulaRelParTotalLevel(gC("chPlayerCharacter").relations[character][relPar]) + ")"
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
			
			iText += "\nST stands for Short Term, LT stands for Long Term. ST values slowly decay, and a portion is turned into LT at the end of the day.\n"
		}
		
			// Drives
		if ( character != "chPlayerCharacter" ) {
			// Extra conditions
			if ( gC(character).domChar == "chPlayerCharacter" || gC(character).subChars.includes("chPlayerCharacter") || gC(character).egaChars.includes("chPlayerCharacter") ) {
				var drivesDesc = "\n<div class='standardBox'>__" + gC(character).name + "'s drives__:\n";
				drivesDesc += textCharactersDrives(character) + "</div>";
				iText += drivesDesc;
			}
		}
		
		iText += "</p></div>";
		
		
		return iText;
	}
	
	// Scrolls
	
	this.getReReadScrollsPassage = function() {
		var passageText = "__Studied scrolls__:\n";
		for ( var scr of gC("chPlayerCharacter").studiedScrolls ) {
			passageText += "- " + this.getButtonReadScroll(scr) + "\n";
		}
		passageText += "\n" + this.getButtonBackToMain();
		return passageText;
	}
	this.getReReadScrollPassage = function(scrollKey) {
		var passageText = "__" + setup.scrollsList[scrollKey].title + "__:\n\n"
						+ setup.scrollsList[scrollKey].getContent() + "\n\n"
						+ this.getButtonReadScrolls() + "\n"
						+ this.getButtonBackToMain();
		return passageText;
	}

	// Candidates Comparison|Personal
	
	this.getCandidatesComparisonPassage = function() {
		var passageText = "__Candidates Comparison__:\n";
		passageText += '<table><tr><td>__Candidate__</td><td>__Merit__</td><td>__Infmy__</td><td>__Ph__</td><td>__Ag__</td><td>__Re__</td><td>__Wi__</td><td>__In__</td><td>__Pe__</td><td>__Ch__</td><td>__Em__</td><td>__Lu__</td></tr>';
		for ( var charKey of getCandidatesKeysArray() ) {
			passageText += '<tr><td>' + gC(charKey).getFormattedName() + '</td><td>' + gC(charKey).merit + '</td><td>' + gC(charKey).infamy + '</td><td>' + gC(charKey).physique.value + '</td><td>' + gC(charKey).agility.value + '</td><td>' + gC(charKey).resilience.value + '</td><td>' + gC(charKey).will.value + '</td><td>' + gC(charKey).intelligence.value + '</td><td>' + gC(charKey).perception.value + '</td><td>' + gC(charKey).charisma.value + '</td><td>' + gC(charKey).empathy.value + '</td><td>' + gC(charKey).luck.value + '</td></tr>';
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
		applyPunishmentsToCandidates();
		spawnMerchants();
		npcsBuyItems();
		npcsEquipBondage();
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
			//			for ( var stat of State.variables.baseStats ) {
			for ( var stat of setup.baseStats ) {
				if ( gC(character)[stat].tryLevelUp() ) {
					// Notify level up
					if ( character == "chPlayerCharacter" ) {
						this.newDayInfo += "Your " + stat + " has increased to " + gC(character)[stat].value + ".\n";
					}
				}
			}
			recalculateMaxBars(character);
			// State.variables[character].recalculateMaxBars();
		}
		
		// Relations and mood
		this.endDayRelationMoodEffects();

		// Daily sex checks
		for ( var character of getActiveSimulationCharactersArray() ) {
			if ( gC(character).hasOwnProperty("daysWithoutSex") ) {
				gC(character).daysWithoutSex += 1;
				gC(character).sexScenesToday = 0;
			}
		}

		// Infamy
		for ( var charKey of getCandidatesKeysArray() ) {
			var infamyChange = ((gC(charKey).infamy - (gC(charKey).infamy % 10)) / 10 ) + 1;
			gC(charKey).changeInfamy(-infamyChange);
			if ( gC(charKey).globalAi.hasOwnProperty("attackedToday") ) {
				gC(charKey).globalAi.attackedToday = false;
			}
		}

		// Equipment
		for ( var equip of State.variables.equipmentList ) {
			if ( equip.days > 1 ) {
				equip.days--;
			} else if ( equip.days == 1 ) {
				unequipObject(equip.id);
			}
		}
		
		// Altered States
		for ( var charKey of getActiveSimulationCharactersArray() ) {
			for ( var as of gC(charKey).alteredStates ) {
				if ( as.scope == "days" ) {
					as.remainingDays--;
					if ( as.remainingDays <= 0 ) {
						as.flagRemove = true;
					}
				}
			}
			gC(charKey).cleanStates();
		}
		
		// Fix stats
		for ( var character of getActiveSimulationCharactersArray() ) {
			fixCharacterStatModifiers(character);
		}
		
		// Despawn merchants
		State.variables.currentMerchants = [];
	}
	this.endDayRelationMoodEffects = function() {
		var relTypesToFinish = [];
		var i = 0;
		for ( var mood of ["friendly","intimate","flirty","aroused","dominant","submissive","bored","angry"] ) {
			gC("chPlayerCharacter").baseMood[mood] = State.variables.playerCustomMoods[i];
			i++;
		}
		for ( var character of getActiveSimulationCharactersArray() ) {
			// Relations
			for ( var rel in gC(character).relations ) {
				if ( gC(character).relations[rel] instanceof Relation ) {
					var iRelation = gC(character).relations[rel];
					//var mult = 1.0; // Decay value is multiplied by this
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
			// Mood
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
		
		// AI social and training priorities
		for ( var character of arrayMinusA(getCandidatesKeysArray(),"chPlayerCharacter") ) {
			setSocialAiCandidateGoals(gC(character).socialAi);
			setTrainingGoals(character);
		}
		
		// Clean compass
		State.variables.compass.debugInfo = "";
	}
};

// Customize mood functions
window.getEquipmentWindow = function() {
	var wText = '<<removeclass "#right-ui-bar" "stowed">> \ ' + "__Equipment Menu__\n\n";
	if ( State.variables.roomMessage != "" ) {
		wText += State.variables.roomMessage + "\n\n";
	}
			// Owned items equipped on someone
	wText += "__Equipped items__:\n";
	for ( var equip of State.variables.equipmentList ) {
		if ( equip.owner == "chPlayerCharacter" ) {
			if ( equip.equippedOn != null ) {
				var equipData = getEquipDataById(equip.id);
				wText += equipData.name + getItemDescriptionById(equip.id) + " - Equipped on " + gC(equip.equippedOn).getFormattedName() + ". Days: " + equip.days
						// Button to unequip item
					   + ". <<l" + "ink [[Unequip|Personal Room]]>><<s" + "cript>>"
					   + "unequipObject(" + equip.id + ");\n"
					   + "<</s" + "cript>><</l" + "ink>>\n";
			}
		}
	}
			// Owned unequipped items
	wText += "\n__Unequipped items__:\n";
	for ( var equip of State.variables.equipmentList ) {
		if ( equip.owner == "chPlayerCharacter" && equip.equippedOn == null ) {
			var equipData = getEquipDataById(equip.id);
			wText += '<<radiobutton "$selectedEquip" "' + equip.id + '" autocheck>> ' + equipData.name + getItemDescriptionById(equip.id) + '\n';
		}
	}
			// Equippable characters
	wText += "\n__Characters__:\n";
	wText += '<<radiobutton "$selectedChar" "chPlayerCharacter" autocheck>> ' + gC("chPlayerCharacter").getFormattedName() + "\n";
	for ( var charKey of State.variables.chPlayerCharacter.subChars ) {
		wText += '<<radiobutton "$selectedChar" "' + charKey + '" autocheck>> ' + gC(charKey).getFormattedName() + "\n";
	}
			// Attempt equip item button
	wText += "\n<<l" + "ink [[Equip item|Personal Room]]>><<s" + "cript>>"
			+ "attemptEquipSelectedItem();\n"
			+ "<</s" + "cript>><</l" + "ink>>\n";
	// Exit menu button
	wText += "\n<<l" + "ink [[Exit equipment menu|Personal Room]]>><<s" + "cript>>"
			+ "State.variables.personalRoom.roomState = 'main';\n"
			+ "delete State.variables.selectedEquip;\n"
			+ "delete State.variables.selectedChar;\n"
			+ "delete State.variables.roomMessage;\n"
			+ "<</s" + "cript>><</l" + "ink>>\n";
	return wText;
}
window.attemptEquipSelectedItem = function() {
	var resultMessage = "";
	if ( State.variables.selectedEquip != "" && State.variables.selectedChar != "" ) {
		if ( mayEquipmentBePut(State.variables.selectedEquip,State.variables.selectedChar) ) {
			var days = 1;
			if ( State.variables.selectedChar == "chPlayerCharacter" ) { days = -1; }
			else { days = getRelation(State.variables.selectedChar,"chPlayerCharacter").relType.days; }
			equipObjectOnWearer(State.variables.selectedEquip,State.variables.selectedChar,days);
			if ( days == -1 ) {
				resultMessage = "The selected item was equipped. You may remove it at any time.";
			} else {
				resultMessage = "The selected item was equipped for " + days + " day/s.";
			}
		} else {
			resultMessage = "The selected item couldn't be equipped on the selected character.";
		}
	} else {
		resultMessage = "You must select an item and a character to equip an item.";
	}
	State.variables.roomMessage = resultMessage;
}

window.getCustomizeMoodWindow = function() {
	var wText = "__Customize Mood Menu__\nSet each mood's desired value.\nYour character's mood will gradually move towards your set values.\nUse only positive integer numbers.\n\nCurrent maximum modifier: " + getCharsMaximumMoodModifier("chPlayerCharacter").toFixed(1) + "\n\n";
	var moodsList = [ "Friendly","Intimate","Flirty","Aroused","Dominant","Submissive","Bored","Angry" ];
	var currentMoodMods = State.variables.playerCustomMoods;
	var i = 0;
	for ( var mood of moodsList ) {
		wText += mood + ": " + '<<textbox "$playerCustomMoods[' + i + ']" "' + currentMoodMods[i] + '">>\n';
		i++;
	}
	wText += "\n<<l" + "ink [[Update|Personal Room]]>><<s" + "cript>>"
			+ "updatePlayerCustomMoods();\n"
			+ "<</s" + "cript>><</l" + "ink>>\n";
	wText += "<<l" + "ink [[Update and exit menu|Personal Room]]>><<s" + "cript>>"
			+ "State.variables.personalRoom.roomState = 'main';\n"
			+ "updatePlayerCustomMoods();\n"
			+ "<</s" + "cript>><</l" + "ink>>\n";
	// To Do: Button to commit changes
	// To Do: Button to commit changes and leave
	return wText;
}
window.updatePlayerCustomMoods = function() {
	var maxMoodMod = getCharsMaximumMoodModifier("chPlayerCharacter");
	var currentMood = 0;
	var i = 0;
	for ( var mood of State.variables.playerCustomMoods ) {
		if ( isNaN(mood) ) {
			State.variables.playerCustomMoods[i] = 0;
		} else if ( mood <= 0 ) {
			State.variables.playerCustomMoods[i] = 0;
		} else if ( mood >= maxMoodMod ) {
			State.variables.playerCustomMoods[i] = maxMoodMod;
		}
		i++;
	}
}

// Merchants
window.spawnMerchants = function() {
	for ( var merchantID of State.variables.enabledMerchants ) {
		if ( State.variables.currentMerchants.includes(merchantID) == false ) {
			if ( limitedRandomInt(100) <= getMerchantDataByID(merchantID).chance ) {
				State.variables.currentMerchants.push(merchantID);
			}
		}
	}
}

window.getButtonMerchants = function() {
		var bText = "";
		if ( State.variables.currentMerchants.length > 0 ) {
			bText = "<<l" + "ink [[Merchants|Personal Room]]>><<s" + "cript>>";
				bText += "State.variables.personalRoom.roomState = 'merchants';\n";
				bText += "<</s" + "cript>><</l" + "ink>> (" + State.variables.currentMerchants.length + ")\n\n";
		}
		return bText;
}
window.getMerchantsWindow = function() {
	var wText = "__Merchants Menu__:\nCurrent money: " + gC("chPlayerCharacter").money.toFixed(1) + "\n\n";
	// Print merchants
	for ( var merchantID of State.variables.currentMerchants ) {
		var merData = getMerchantDataByID(merchantID);
		wText += "__" + merData.name + "__:\n"
			   + '//' + merData.getDescription() + '//\n';
			// Print buy item buttons
				for ( var itemType of merData.getSoldItems() ) {
					wText += "- " + getBuyItemButtonByID(itemType) + "\n";
				}
			// New line
		wText += "\n";
	}
	wText += "\n<<l" + "ink [[Exit merchants menu|Personal Room]]>><<s" + "cript>>"
			+ "State.variables.personalRoom.roomState = 'main';\n"
			+ "<</s" + "cript>><</l" + "ink>>\n";
	return wText;
}
window.getBuyItemButtonByID = function(id) {
	var itemData = setup.equipDataList[id];
	var bText = "";
	if ( itemData.price > gC("chPlayerCharacter").money ) { // Not enough money
		bText = colorText(itemData.name,"firebrick") + getItemDescriptionBySetupId(id) + colorText(" - Cost: " + itemData.price,"firebrick") + " - You don't have enough money.";
	} else {
		bText = "<<l" + "ink [[" + itemData.name + "|Personal Room]]>><<s" + "cript>>"
			+ "charBuysItem('chPlayerCharacter','" + id + "');\n"
			+ "<</s" + "cript>><</l" + "ink>>" + getItemDescriptionBySetupId(id) + " - Cost: " + itemData.price;
	}
	return bText;
}

// AI

window.getAvailableItemsIDs = function() {
	var availableItemsIDs = [];
	for ( var merchantID of State.variables.currentMerchants ) {
		for ( var itemID of getMerchantDataByID(merchantID).getSoldItems() ) {
			if ( availableItemsIDs.includes(itemID) == false ) {
				availableItemsIDs.push(itemID);
			}
		}
	}
	return availableItemsIDs;
}
window.excludeItemsByPrice = function(itemsList,money) {
	var newItemsList = [];
	for ( var item of itemsList ) {
		if ( setup.equipDataList[item].price <= money ) {
			newItemsList.push(item);
		}
	}
	return newItemsList;
}
window.getBuyableWeaponsIDs = function(buyableItems) {
	var weaponsList = [];
	for ( var item of buyableItems ) {
		if ( equipmentIsWeapon(setup.equipDataList[item]) ) {
			weaponsList.push(item);
		}
	}
	return weaponsList;
}
window.getBuyableBondageIDs = function(buyableItems) {
	var bondagesList = [];
	for ( var item of buyableItems ) {
		if ( equipmentIsBondage(setup.equipDataList[item]) ) {
			bondagesList.push(item);
		}
	}
	return bondagesList;
}
window.npcsBuyItems = function() {
	var availableItemsIDs = getAvailableItemsIDs();
	for ( var character of getActiveSimulationCharactersArray() ) {
		var buyableItemsIDs = excludeItemsByPrice(availableItemsIDs,gC(character).money);
		if ( character != "chPlayerCharacter" ) {
			// Weapons
			var currentWeaponValue = 0;
			var buyableWeaponsList = getBuyableWeaponsIDs(buyableItemsIDs);
			if ( buyableWeaponsList.length > 0 ) { // Assign values to buyable weapons
				var bestCandidateWeaponValue = -1;
				var bestCandidateWeaponID = -1;
				if ( gC(character).weaponID != -1 ) {
					currentWeaponValue = npcValuesWeapon(character,getEquipDataById(gC(character).weaponID)) * 1.3;
				}
				// Find best buyable weapon
				for ( var buyableWeapon of buyableWeaponsList ) {
					var currentBuyableWeaponValue = npcValuesWeapon(character,setup.equipDataList[buyableWeapon]);
					if ( currentBuyableWeaponValue > bestCandidateWeaponValue ) {
						bestCandidateWeaponValue = currentBuyableWeaponValue;
						bestCandidateWeaponID = buyableWeapon;
					}
				}
				// Check is best buyable weapon better
				if ( bestCandidateWeaponID != -1 ) {
					if ( bestCandidateWeaponValue > currentWeaponValue ) {
						unequipObject(gC(character).weaponID);
						var newWeaponID = charBuysItem(character,bestCandidateWeaponID);
						equipObjectOnWearer(newWeaponID,character,-1);
					}
				}
			}
			// Bondage
			var buyableBondageList = getBuyableBondageIDs(buyableItemsIDs);
			if ( buyableBondageList.length > 0 ) {
				var bondageToBuyList = []; // List of lists: [BondageId,BondageScore]
				var bestBondageScore = -1;
				for ( var buyableBondage of buyableBondageList ) {
					var newString = [buyableBondage];
					
					newString.push(npcValuesBondage(character,buyableBondage));
					bondageToBuyList.push(newString);
				}
				for ( var buyableBondage of bondageToBuyList ) {
					if ( buyableBondage[1] > bestBondageScore ) {
						bestBondageScore = buyableBondage[1];
					}
				}
				var newBondageToBuyList = []; // List of bondage IDs with best score, one of these will be chosen at random
				for ( var buyableBondage of bondageToBuyList ) {
					if ( buyableBondage[1] == bestBondageScore ) {
						newBondageToBuyList.push(buyableBondage[0]);
					}
				}
				if ( newBondageToBuyList.length > 0 ) {
					var idToBuy = randomFromList(newBondageToBuyList); // Select item out of those with best score
					charBuysItem(character,idToBuy); // Buy selected item
				}
			}
		}
	}
}	
window.npcsEquipBondage = function() {
	for ( var character of getActiveSimulationCharactersArray() ) {
		if ( character != "chPlayerCharacter" ) {
			var activeSubChars = gC(character).subChars;
			var usableBondage = getCharsUnusedBondage(character);
			
			while ( activeSubChars.length > 0 && usableBondage.length > 0 ) {
				var newActiveSubChars = [];
				for ( var subChar of activeSubChars ) {
					// Check if there are no valid items for current char
					if ( getItemListEquippableOnChar(subChar,usableBondage).length > 0 ) {
						// Check if char is within power threshold
						if ( isSubOverDomsPowerThreshold(subChar,character) == false ) { // Check if true
							// Removed from new active sub chars
						} else {
							var chosenBondageId = chooseBestBondageForTargetByActor(getItemListEquippableOnChar(subChar,usableBondage),subChar,character);
							equipObjectOnWearer(chosenBondageId,subChar,gRelTypeAb(character,subChar).days);
							if ( subChar == "chPlayerCharacter" ) {
								State.variables.personalRoom.prMessages += gC(character).getFormattedName() + " has locked " + getEquipDataById(chosenBondageId).name + " on " + gC(subChar).getFormattedName() + ". It will remain locked for as many days as your special relationship is expected to last.\n";
							}
							arrayMinusA(usableBondage,chosenBondageId);
							newActiveSubChars.push(subChar);
						}
					}
				}
				activeSubChars = newActiveSubChars;
			}
			/*
			for ( var subChar of activeSubChars ) {
				var days = gRelTypeAb(character,subChar).days;
				var validItemsOnTarget = getItemListEquippableOnChar(subChar,usableBondage);
				var moreBondage = true;
				for ( var item of validItemsOnTarget ) {
					if ( mayEquipmentBePut(item,subChar) ) {
						equipObjectOnWearer(item,subChar,days);
						if ( subChar == "chPlayerCharacter" ) {
							State.variables.personalRoom.prMessages += gC(character).getFormattedName() + " has locked " + getEquipDataById(item).name + " on " + gC("chPlayerCharacter").getFormattedName() + ".\n";
						}
					}
				}
				usableBondage = getCharsUnusedBondage(character);
			}
			*/
		}
	}
}
/*
window.checkSubNeedsMoreBondage = function(actor,target) {
	
}
*/

// Engine

State.variables.personalRoom = new PersonalRoom();

window.attemptAutosave = function() {
	State.variables.personalRoom.prMessages = "";
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

