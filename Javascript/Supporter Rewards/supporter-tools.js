///// Unlocking Supporter tools /////

setup.quickstartLinkText = '<<l' + 'ink [[Supporter Reward: Quickstart Menu|Supporter Quickstart Room]]>><<s' + 'cript>>applyDifficultyChanges();<</s'
							+ 'cript>><</l' + 'ink>>';
setup.cheatMenuLinkText = '[[Supporter Reward: Cheat Menu|Cheat Menu Supporter Room]]';

window.SupToolsData = function() {
	
	////// Quickstart
	
	this.quickstartPlayerName = "You";
	this.quickstartRoomPassage = "";
	this.quickstartStage = "start";
	
	
		// Quickstart variables
		this.meetMirC = 1;
		this.meetNashC = 1;
		this.meetClawC = 1;
		this.meetValC = 1;
		this.talkLater = 1;
		this.hadSex = 1;
	
	////// Cheats
	
	this.newInfamy = 25;
	this.newRelDuration = 3;
	this.newEqDuration = 5;
	
	this.charNewMoney = 0;
	this.charNewInfamy = 0;
	this.charNewMerit = 0;
	
	this.charNewName = "";
	this.getNewName = function() { return this.charNewName; }
	
	this.charNewPerPr = "";
	this.getNewPerPr = function() { return this.charNewPerPr; }
	this.charNewComPr = "";
	this.getNewComPr = function() { return this.charNewComPr; }
	this.charNewRefPr = "";
	this.getNewRefPr = function() { return this.charNewRefPr; }
	this.charNewPosPr = "";
	this.getNewPosPr = function() { return this.charNewPosPr; }
	this.charNewInPosPr = "";
	this.getNewInPosPr = function() { return this.charNewInPosPr; }
	
	/*
	this.perPr = "it"; // Personal pronoun
	this.comPr = "it"; // Personal pronoun as complement
	this.refPr = "itself"; // Reflexive pronoun
	this.posPr = "its"; // Possessive pronoun
	this.inPosPr = "its"; // Independent Possessive
	*/
	
	this.cheatMenuRoomPassage = "";
	this.cheatMenuStage = "start";
	this.cheatMenuSelectedChar = "chPlayerCharacter";
	this.cheatMenuSelectedCharB = "chNash";
	this.cheatMenuSelectedItem = "b0";
	
}

// Methods
	SupToolsData.prototype.formatQuickstartRoom = function() {
		switch ( this.quickstartStage ) {
			case "start":
				this.quickstartRoomPassage = "__Select your bookmark__:\n"
										   + "- " + this.getQSritualAvatarsBm();
				break;
			case "ritualAvatars":
				this.quickstartRoomPassage = this.formatPrologueChoices() + "\n\n" + this.getButtonGoToRitualOfAvatars();
				break;
			case "receivedBoons":
				this.quickstartRoomPassage = this.formatPrologueChoices() + "\n\n" + this.formatChapterOneChoices() + "\n\n" + this.getButtonGoToReceivedBoons();
				break;
		}
	}
	
	// Bookmarks buttons
	SupToolsData.prototype.getQSritualAvatarsBm = function() {
		var bText = 'Set your name: <<textbox "$supToolsData.quickstartPlayerName" "Edit this">>\n\n'
				  + this.formatPlayerAvatarChoices() + "\n\n"
				  + this.formatPlayerColorChoices() + "\n\n"
				  + this.formatPlayerStatChoices()
				  + "\n\nRemember you can customize your starting stats at the Cheat Menu, at the end of any day.\n\n"
				  + '<<link [[Ritual of Avatars' + '|Supporter Quickstart Room]]' + '>><<' + 'script>>\n'
				  + 'State.variables.supToolsData.quickstartStage = "ritualAvatars";\n'
				  + 'State.variables.supToolsData.initializeGameSettings();\n'
				  + '<</' + 'script>><</' + 'link>>\n'
				  + '<<link [[Boons were received' + '|Supporter Quickstart Room]]' + '>><<' + 'script>>\n'
				  + 'State.variables.supToolsData.quickstartStage = "receivedBoons";\n'
				  + 'State.variables.supToolsData.initializeGameSettings();\n'
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}
	
	
	// Player customizations
		// Quickstarts
	SupToolsData.prototype.formatPlayerAvatarChoices = function() {
		var cText = "Choose your character's avatar:\n";
			cText += '<<set $StVars.temp2 to 0>> \ ';
			cText += '<label><<radiobutton "$StVars.temp2" "option1" checked>> [img[img/portraits/mc1-avatar.png]] </label>';
			cText += '<label><<radiobutton "$StVars.temp2" "option2">> [img[img/portraits/mc2-avatar.png]] </label>\n';
			cText += '<label><<radiobutton "$StVars.temp2" "option3">> [img[img/portraits/mc3-avatar.png]] </label>';
			cText += '<label><<radiobutton "$StVars.temp2" "optionCustom">> [img[img/portraits/custom-avatar.png]] </label>';
		return cText;
	}
	
	SupToolsData.prototype.formatPlayerColorChoices = function() {
		var cText = "Choose your character's color. It will affect her displayed name and spoken lines.\n"
				  + '<label><<radiobutton "$StVars.temp" "red" checked>> <span style="color:red">Red</span></label>\n'
				  + '<label><<radiobutton "$StVars.temp" "pink">> <span style="color:pink">Pink</span></label>\n'
				  + '<label><<radiobutton "$StVars.temp" "yellow">> <span style="color:yellow">Yellow</span></label>\n'
				  + '<label><<radiobutton "$StVars.temp" "violet">> <span style="color:violet">Violet</span></label>\n'
				  + '<label><<radiobutton "$StVars.temp" "lime">> <span style="color:lime">Green</span></label>\n'
				  + '<label><<radiobutton "$StVars.temp" "aqua">> <span style="color:aqua">Blue</span></label>\n'
				  + '<label><<radiobutton "$StVars.temp" "mediumblue">> <span style="color:mediumblue">Dark Blue</span></label>';
				 
		return cText;
	}
	
	SupToolsData.prototype.formatPlayerStatChoices = function() {
		var text = "Choose your character's boons and weaknesses:\n"
				 + 'Major boon: $selectStatListBoxes[0] \n'
				 + 'Minor boon: $selectStatListBoxes[1] \n'
				 + 'Minor boon: $selectStatListBoxes[2] \n'
				 + 'Major weakness: $selectStatListBoxes[3] \n'
				 + 'Minor weakness: $selectStatListBoxes[4] \n'
				 + 'Minor weakness: $selectStatListBoxes[5] ';
		return text;
	}
	
	SupToolsData.prototype.initializeGameSettings = function() {
		this.setPlayerName();
		assignPcPortrait();
		applyPcStatBonusesWeaknesses();
	}
	
	SupToolsData.prototype.setPlayerName = function() {
		if ( this.quickstartPlayerName != "" ) {
			State.variables.chPlayerCharacter.name = this.quickstartPlayerName;
		} else {
			State.variables.chPlayerCharacter.name = "MyParentsDidntNameMe";
		}
		State.variables.chPlayerCharacter.setColors(State.variables.StVars.temp,State.variables.StVars.temp);
		State.variables.chPlayerCharacter.names = [ State.variables.chPlayerCharacter.name , State.variables.chPlayerCharacter.name ,
													State.variables.chPlayerCharacter.name , "the young human" ];
	}
	
	SupToolsData.prototype.formatPrologueChoices = function() {
		var bText = "__Prologue choices__:\n\n"
				  + "__How did you greet Padmiri?__\n"
				  + "<label><<radiobutton '$supToolsData.meetMirC' '1' checked>> I greeted her formally.</label>\n"
				  + "<label><<radiobutton '$supToolsData.meetMirC' '2' >> I asked her if she was the Leirien Candidate.</label>\n"
				  + "<label><<radiobutton '$supToolsData.meetMirC' '3' >> I asked her for guidance.</label>\n"
				  + "<label><<radiobutton '$supToolsData.meetMirC' '4' >> I touched her flower.</label>\n"
				  + "__How did you greet Nashillbyir?__\n"
				  + "<label><<radiobutton '$supToolsData.meetNashC' '1' checked>> I greeted her formally.</label>\n"
				  + "<label><<radiobutton '$supToolsData.meetNashC' '2' >> I greeted her with enthusiasm.</label>\n"
				  + "<label><<radiobutton '$supToolsData.meetNashC' '3' >> I asked not to be hit.</label>\n"
				  + "<label><<radiobutton '$supToolsData.meetNashC' '4' >> I got angry at her.</label>\n"
				  + "<label><<radiobutton '$supToolsData.meetNashC' '5' >> I got angry at her, but I apologized later.</label>\n"
				  + "__How did you respond to Fiercest Claw's demand?__\n"
				  + "<label><<radiobutton '$supToolsData.meetClawC' '1' checked>> I nodded and left.</label>\n"
				  + "<label><<radiobutton '$supToolsData.meetClawC' '2' >> I refused to agree.</label>\n"
				  + "<label><<radiobutton '$supToolsData.meetClawC' '3' >> I challenged her arrogance.</label>\n"
				  + "__How did you greet Valtan?__\n"
				  + "<label><<radiobutton '$supToolsData.meetValC' '1' checked>> I greeted her formally.</label>\n"
				  + "<label><<radiobutton '$supToolsData.meetValC' '2' >> I flirted back and she stole a kiss from me.</label>\n"
				  + "<label><<radiobutton '$supToolsData.meetValC' '3' >> I hit on her, offered her a hand and she took my arm.</label>\n"
				  + "__Who did you spend the next few hours with?__\n"
				  + "<label><<radiobutton '$supToolsData.talkLater' '1' checked>> I was with Padmiri.</label>\n"
				  + "<label><<radiobutton '$supToolsData.talkLater' '2' >> I was with Nashillbyir.</label>\n"
				  + "<label><<radiobutton '$supToolsData.talkLater' '3' >> I was with Valtan.</label>\n"
				  + "__Did you have sex later?__\n"
				  + "<label><<radiobutton '$supToolsData.hadSex' '1' checked>> Yes.</label>\n"
				  + "<label><<radiobutton '$supToolsData.hadSex' '2' >> No, I broke her heart and shattered it to pieces.</label>\n"
		return bText;
	}
	
	SupToolsData.prototype.formatChapterOneChoices = function() {
		var bText = "__Chapter One Choices__:\n\n"
				  + "__What did you do during the confrontation between Padmiri and Claw?__\n"
				  + "<label><<radiobutton '$supToolsData.ethicsPower' '1' checked>> I left early.</label>\n"
				  + "<label><<radiobutton '$supToolsData.ethicsPower' '2' >> I sided with Claw.</label>\n"
				  + "<label><<radiobutton '$supToolsData.ethicsPower' '3' >> I looked for a balance between both opinions.</label>\n"
				  + "<label><<radiobutton '$supToolsData.ethicsPower' '4' >> I sided with Padmiri.</label>\n"
				  + "<label><<radiobutton '$supToolsData.ethicsPower' '5' >> You disregarded their fight as unimportant.</label>\n"
				  + "<label><<radiobutton '$supToolsData.ethicsPower' '6' >> You could not decide.</label>\n"
				  + "<label><<radiobutton '$supToolsData.ethicsPower' '7' >> I attempted to understand the strengths and limits of both opinions.</label>\n"
				  + "__What did you do when Valtan assaulted Padmiri?__\n"
				  + "<label><<radiobutton '$supToolsData.stayingHydrated' '1' checked>> I took Mir's place.</label>\n"
				  + "<label><<radiobutton '$supToolsData.stayingHydrated' '2' >> I caught Valtan by surprise.</label>\n"
				  + "<label><<radiobutton '$supToolsData.stayingHydrated' '3' >> I joined Valtan in her assault.</label>\n"
				  + "<label><<radiobutton '$supToolsData.stayingHydrated' '4' >> I helped Padmiri to escape.</label>\n"
				  + "<label><<radiobutton '$supToolsData.stayingHydrated' '5' >> I cockblocked Valtan and mocked her.</label>\n"
				  + "<label><<radiobutton '$supToolsData.stayingHydrated' '6' >> I stayed back and enjoyed the show.</label>\n"
				  + "<label><<radiobutton '$supToolsData.stayingHydrated' '7' >> I left and let them do their thing.</label>\n"
				  + "__Which boon did you take?__\n"
				  + "<label><<radiobutton '$supToolsData.varyonteBoon' '1' checked>> The boon of suggestion.</label>\n"
				  + "<label><<radiobutton '$supToolsData.varyonteBoon' '2' >> The boon of draining.</label>\n"
				  + "<label><<radiobutton '$supToolsData.varyonteBoon' '3' >> The boon of binding.</label>\n"
				  + "__Boost your relationship with any character?__\n"
				  + "<label><<radiobutton '$supToolsData.relBoost' '1' checked>> No.</label>\n"
				  + "<label><<radiobutton '$supToolsData.relBoost' '2' >> Relationship boost with Padmiri.</label>\n"
				  + "<label><<radiobutton '$supToolsData.relBoost' '3' >> Relationship boost with Nash.</label>\n"
				  + "<label><<radiobutton '$supToolsData.relBoost' '4' >> Relationship boost with Valtan.</label>\n";
		return bText;
	}
	
	SupToolsData.prototype.processPrologueChoices = function() {
		switch (this.meetMirC) {
			case "1":
				State.variables.chPlayerCharacter.relations.chMir.friendship.stv += 100;
				State.variables.chMir.relations.chPlayerCharacter.friendship.stv += 100;
				break;
			case "2":
				State.variables.chPlayerCharacter.relations.chMir.friendship.stv += 100;
				State.variables.chMir.relations.chPlayerCharacter.friendship.stv += 100;
				break;
			case "3":
				State.variables.chPlayerCharacter.relations.chMir.friendship.stv += 350;
				State.variables.chMir.relations.chPlayerCharacter.friendship.stv += 350;
				State.variables.chPlayerCharacter.relations.chMir.submission.stv += 350;
				State.variables.chMir.relations.chPlayerCharacter.domination.stv += 350;
				break;
			case "4":
				State.variables.chPlayerCharacter.relations.chMir.sexualTension.stv += 350;
				State.variables.chMir.relations.chPlayerCharacter.sexualTension.stv += 350;
				State.variables.chPlayerCharacter.relations.chMir.domination.stv += 350;
				State.variables.chMir.relations.chPlayerCharacter.submission.stv += 350;
				break;
		}
		switch (this.meetNashC) {
			case '1':
				State.variables.chPlayerCharacter.relations.chNash.friendship.stv += 100;
				State.variables.chNash.relations.chPlayerCharacter.friendship.stv += 100;
				break;
			case '2':
				State.variables.chPlayerCharacter.relations.chNash.friendship.stv += 350;
				State.variables.chNash.relations.chPlayerCharacter.friendship.stv += 350;
				break;
			case '3':
				State.variables.chPlayerCharacter.relations.chNash.friendship.stv += 350;
				State.variables.chNash.relations.chPlayerCharacter.friendship.stv += 350;
				State.variables.chPlayerCharacter.relations.chNash.submission.stv += 350;
				State.variables.chNash.relations.chPlayerCharacter.domination.stv += 350;
				break;
			case '4':
				State.variables.chPlayerCharacter.relations.chNash.enmity.stv += 350;
				State.variables.chNash.relations.chPlayerCharacter.enmity.stv += 350;
				State.variables.chPlayerCharacter.relations.chNash.rivalry.stv += 350;
				State.variables.chNash.relations.chPlayerCharacter.rivalry.stv += 350;
				break;
			case '5':
				State.variables.chPlayerCharacter.relations.chNash.sexualTension.stv += 100;
				State.variables.chNash.relations.chPlayerCharacter.sexualTension.stv += 100;
				State.variables.chPlayerCharacter.relations.chNash.submission.stv += 750;
				State.variables.chNash.relations.chPlayerCharacter.domination.stv += 750;
				break;
		}
		switch (this.meetClawC) {
			case '1':
				State.variables.chPlayerCharacter.relations.chClaw.submission.stv += 350;
				State.variables.chClaw.relations.chPlayerCharacter.domination.stv += 350;
				break;
			case '2':
				State.variables.chPlayerCharacter.relations.chClaw.enmity.stv += 350;
				State.variables.chClaw.relations.chPlayerCharacter.enmity.stv += 350;
				break;
			case '3':
				State.variables.chPlayerCharacter.relations.chClaw.enmity.stv += 750;
				State.variables.chClaw.relations.chPlayerCharacter.enmity.stv += 750;
				State.variables.chPlayerCharacter.relations.chClaw.rivalry.stv += 750;
				State.variables.chClaw.relations.chPlayerCharacter.rivalry.stv += 750;
				State.variables.chPlayerCharacter.will.experience += 250;
				State.variables.chPlayerCharacter.charisma.experience += 250;
				break;
		}
		switch (this.meetValC) {
			case '1':
				State.variables.chPlayerCharacter.relations.chVal.friendship.stv += 100;
				State.variables.chVal.relations.chPlayerCharacter.friendship.stv += 100;
				break;
			case '2':
				State.variables.chPlayerCharacter.relations.chVal.sexualTension.stv += 350;
				State.variables.chVal.relations.chPlayerCharacter.sexualTension.stv += 350;
				State.variables.chPlayerCharacter.relations.chVal.submission.stv += 350;
				State.variables.chVal.relations.chPlayerCharacter.domination.stv += 350;
				State.variables.chPlayerCharacter.charisma.experience += 250;
				break;
			case '3':
				State.variables.chPlayerCharacter.relations.chVal.sexualTension.stv += 750;
				State.variables.chVal.relations.chPlayerCharacter.sexualTension.stv += 750;
				State.variables.chPlayerCharacter.relations.chVal.submission.stv += 350;
				State.variables.chVal.relations.chPlayerCharacter.domination.stv += 350;
				State.variables.chPlayerCharacter.charisma.experience += 250;
				break;
		}
		switch (this.talkLater) {
			case '1':
				State.variables.chPlayerCharacter.relations.chMir.friendship.stv += 350;
				State.variables.chMir.relations.chPlayerCharacter.friendship.stv += 350;
				State.variables.chPlayerCharacter.relations.chMir.romance.stv += 100;
				State.variables.chMir.relations.chPlayerCharacter.romance.stv += 100;
				break;
			case '2':
				State.variables.chPlayerCharacter.relations.chNash.friendship.stv += 350;
				State.variables.chNash.relations.chPlayerCharacter.friendship.stv += 350;
				State.variables.chPlayerCharacter.relations.chNash.romance.stv += 100;
				State.variables.chNash.relations.chPlayerCharacter.romance.stv += 100;
				break;
			case '3':
				State.variables.chPlayerCharacter.relations.chVal.friendship.stv += 350;
				State.variables.chVal.relations.chPlayerCharacter.friendship.stv += 350;
				State.variables.chPlayerCharacter.relations.chVal.romance.stv += 100;
				State.variables.chVal.relations.chPlayerCharacter.romance.stv += 100;
				break;
		}
		switch (this.hadSex) {
			case '1':
			switch (this.talkLater) {
				case '1':
					State.variables.chPlayerCharacter.relations.chMir.romance.stv += 750;
					State.variables.chMir.relations.chPlayerCharacter.romance.stv += 750;
					State.variables.chPlayerCharacter.relations.chMir.sexualTension.stv += 750;
					State.variables.chMir.relations.chPlayerCharacter.sexualTension.stv += 750;
					break;
				case '2':
					State.variables.chPlayerCharacter.relations.chNash.romance.stv += 750;
					State.variables.chNash.relations.chPlayerCharacter.romance.stv += 750;
					State.variables.chPlayerCharacter.relations.chNash.sexualTension.stv += 750;
					State.variables.chNash.relations.chPlayerCharacter.sexualTension.stv += 750;
					break;
				case '3':
					State.variables.chPlayerCharacter.relations.chVal.romance.stv += 750;
					State.variables.chVal.relations.chPlayerCharacter.romance.stv += 750;
					State.variables.chPlayerCharacter.relations.chVal.sexualTension.stv += 750;
					State.variables.chVal.relations.chPlayerCharacter.sexualTension.stv += 750;
					break;
			}
				break;
			case '2':
				break;
		}
	}
	
	SupToolsData.prototype.processChapterOneChoices = function() {
		
		for ( var st of getStatNamesArray() ) {
			for ( var ch of getActiveSimulationCharactersArray() ) {
				State.variables[ch][st].value += 2;
			}
		}
		charactersLearnSceneActions(getCandidatesKeysArray(),["embers","freezeFeet","sparkingRubbing"]);
		gC("chAte").baseMood.bored = 0;
		gC("chAte").mood.bored = 0;		
		addPointsToDrive(gC("chAte").dPleasure,100);
		addPointsToDrive(gC("chAte").dLove,100);
		addPointsToDrive(gC("chAte").dCooperation,100);
		addPointsToDrive(gC("chAte").dDomination,100);
		State.variables.daycycle.day = 10;
		
		
		if ( gSettings().futa == "enableAll" ) {
			for ( var charKey of getCandidatesKeysArray() ) {
				gC(charKey).addBodypart("dick","dick");
			}
		} else if ( gSettings().futa == "playerFuta" ) {
			for ( var charKey of ["chPlayerCharacter"] ) {
				gC(charKey).addBodypart("dick","dick");
			}
		} else if ( gSettings().futa == "futaPartners" ) {
			for ( var charKey of ["chNash","chMir","chVal","chAte","chClaw"] ) {
				gC(charKey).addBodypart("dick","dick");
			}
		}
		
		switch (this.ethicsPower) {
			case "1":
				State.variables.chMir.relations.chClaw.enmity.stv += 500;
				State.variables.chClaw.relations.chMir.enmity.stv += 500;
				State.variables.chMir.relations.chClaw.rivalry.stv += 500;
				State.variables.chClaw.relations.chMir.rivalry.stv += 500;
				break;
			case "2":
				State.variables.chPlayerCharacter.relations.chMir.enmity.stv += 250;
				State.variables.chMir.relations.chPlayerCharacter.enmity.stv += 250;
				State.variables.chClaw.relations.chMir.enmity.stv += 250;
				State.variables.chMir.relations.chClaw.enmity.stv += 250;
				State.variables.chPlayerCharacter.relations.chClaw.friendship.stv += 250;
				State.variables.chClaw.relations.chPlayerCharacter.friendship.stv += 250;
				State.variables.chPlayerCharacter.relations.chClaw.rivalry.stv += 100;
				State.variables.chClaw.relations.chPlayerCharacter.rivalry.stv += 100;
				State.variables.chPlayerCharacter.relations.chClaw.enmity.stv -= 250;
				State.variables.chClaw.relations.chPlayerCharacter.enmity.stv -= 250;
				addPointsToDrive(gC("chMir").dImprovement,250);
				addPointsToDrive(gC("chMir").dDomination,150);
				addPointsToDrive(gC("chMir").dAmbition,250);
				addPointsToDrive(gC("chMir").dCooperation,-100);
				addPointsToDrive(gC("chClaw").dDomination,100);
				addPointsToDrive(gC("chClaw").dAmbition,100);
				break;
			case "3":
				State.variables.chPlayerCharacter.relations.chClaw.enmity.stv += 250;
				State.variables.chClaw.relations.chPlayerCharacter.enmity.stv += 250;
				State.variables.chPlayerCharacter.relations.chMir.enmity.stv += 100;
				State.variables.chMir.relations.chPlayerCharacter.enmity.stv += 100;
				State.variables.chPlayerCharacter.relations.chMir.friendship.stv -= 100;
				State.variables.chMir.relations.chPlayerCharacter.friendship.stv -= 100;
				addPointsToDrive(gC("chMir").dAmbition,100);
				addPointsToDrive(gC("chMir").dCooperation,100);
				addPointsToDrive(gC("chClaw").dDomination,100);
				addPointsToDrive(gC("chClaw").dAmbition,100);
				break;
			case "4":
				State.variables.chPlayerCharacter.relations.chClaw.enmity.stv += 250;
				State.variables.chClaw.relations.chPlayerCharacter.enmity.stv += 250;
				State.variables.chPlayerCharacter.relations.chMir.friendship.stv += 250;
				State.variables.chMir.relations.chPlayerCharacter.friendship.stv += 250;
				addPointsToDrive(gC("chMir").dLove,100);
				addPointsToDrive(gC("chMir").dCooperation,100);
				addPointsToDrive(gC("chClaw").dDomination,-100);
				break;
			case "5":
				State.variables.chPlayerCharacter.relations.chClaw.enmity.stv += 100;
				State.variables.chClaw.relations.chPlayerCharacter.enmity.stv += 100;
				State.variables.chPlayerCharacter.relations.chMir.enmity.stv += 100;
				State.variables.chMir.relations.chPlayerCharacter.enmity.stv += 100;
				State.variables.chClaw.relations.chMir.friendship.stv += 100;
				State.variables.chMir.relations.chClaw.friendship.stv += 100;
				break;
			case "6":
				State.variables.chPlayerCharacter.relations.chClaw.submission.stv += 250;
				State.variables.chClaw.relations.chPlayerCharacter.domination.stv += 250;
				State.variables.chPlayerCharacter.relations.chMir.submission.stv += 250;
				State.variables.chMir.relations.chPlayerCharacter.domination.stv += 250;
				State.variables.chMir.relations.chClaw.enmity.stv += 250;
				State.variables.chClaw.relations.chMir.enmity.stv += 250;
				break;
			case "7":
				State.variables.chPlayerCharacter.relations.chClaw.friendship.stv += 100;
				State.variables.chClaw.relations.chPlayerCharacter.friendship.stv += 100;
				State.variables.chPlayerCharacter.relations.chMir.friendship.stv += 250;
				State.variables.chMir.relations.chPlayerCharacter.friendship.stv += 250;
				State.variables.chPlayerCharacter.relations.chClaw.rivalry.stv += 100;
				State.variables.chClaw.relations.chPlayerCharacter.rivalry.stv += 100;
				addPointsToDrive(gC("chMir").dDomination,250);
				addPointsToDrive(gC("chMir").dCooperation,100);
				addPointsToDrive(gC("chClaw").dCooperation,250);
				break;
		}
		switch (this.stayingHydrated) {
			case "1":
					State.variables.chPlayerCharacter.relations.chMir.friendship.stv += 100;
					State.variables.chMir.relations.chPlayerCharacter.friendship.stv += 100;
					State.variables.chPlayerCharacter.relations.chVal.sexualTension.stv += 350;
					State.variables.chVal.relations.chPlayerCharacter.sexualTension.stv += 350;
					State.variables.chPlayerCharacter.relations.chVal.submission.stv += 350;
					State.variables.chVal.relations.chPlayerCharacter.domination.stv += 350;
				break;
			case "2":
				State.variables.chPlayerCharacter.relations.chMir.friendship.stv += 350;
				State.variables.chMir.relations.chPlayerCharacter.friendship.stv += 350;
				State.variables.chPlayerCharacter.relations.chVal.sexualTension.stv += 350;
				State.variables.chVal.relations.chPlayerCharacter.sexualTension.stv += 350;
				State.variables.chPlayerCharacter.relations.chVal.rivalry.stv += 350;
				State.variables.chVal.relations.chPlayerCharacter.rivalry.stv += 350;
				State.variables.chPlayerCharacter.relations.chVal.domination.stv += 350;
				State.variables.chVal.relations.chPlayerCharacter.submission.stv += 350;
				State.variables.chMir.relations.chVal.domination.stv += 350;
				State.variables.chVal.relations.chMir.submission.stv += 350;
				break;
			case "3":
				State.variables.chPlayerCharacter.relations.chMir.sexualTension.stv += 350;
				State.variables.chMir.relations.chPlayerCharacter.sexualTension.stv += 350;
				State.variables.chPlayerCharacter.relations.chMir.domination.stv += 350;
				State.variables.chMir.relations.chPlayerCharacter.submission.stv += 350;
				State.variables.chMir.relations.chPlayerCharacter.rivalry.stv += 350;
				State.variables.chMir.relations.chPlayerCharacter.enmity.stv += 350;
				State.variables.chPlayerCharacter.relations.chVal.friendship.stv += 350;
				State.variables.chVal.relations.chPlayerCharacter.friendship.stv += 350;
				State.variables.chPlayerCharacter.relations.chVal.rivalry.stv += 350;
				State.variables.chVal.relations.chPlayerCharacter.rivalry.stv += 350;
				State.variables.chVal.relations.chMir.sexualTension.stv += 350;
				State.variables.chMir.relations.chVal.sexualTension.stv += 350;
				State.variables.chVal.relations.chMir.domination.stv += 350;
				State.variables.chMir.relations.chVal.submission.stv += 350;
				State.variables.chMir.relations.chVal.enmity.stv += 350;
				State.variables.chMir.relations.chVal.rivalry.stv += 350;
				addPointsToDrive(gC("chMir").dCooperation,-100);
				addPointsToDrive(gC("chMir").dDomination,100);
				break;
			case "4":
				State.variables.chPlayerCharacter.relations.chMir.friendship.stv += 350;
				State.variables.chMir.relations.chPlayerCharacter.friendship.stv += 350;
				State.variables.chPlayerCharacter.relations.chMir.romance.stv += 100;
				State.variables.chMir.relations.chPlayerCharacter.romance.stv += 100;
				State.variables.chPlayerCharacter.relations.chVal.rivalry.stv += 350;
				State.variables.chVal.relations.chPlayerCharacter.rivalry.stv += 350;
				State.variables.chPlayerCharacter.relations.chVal.enmity.stv += 350;
				State.variables.chVal.relations.chPlayerCharacter.enmity.stv += 350;
				break;
			case "5":
				State.variables.chPlayerCharacter.relations.chMir.friendship.stv += 100;
				State.variables.chMir.relations.chPlayerCharacter.friendship.stv += 100;
				State.variables.chPlayerCharacter.relations.chMir.romance.stv += 100;
				State.variables.chMir.relations.chPlayerCharacter.romance.stv += 100;
				State.variables.chPlayerCharacter.relations.chMir.domination.stv += 350;
				State.variables.chMir.relations.chPlayerCharacter.submission.stv += 350;
				State.variables.chPlayerCharacter.relations.chVal.rivalry.stv += 350;
				State.variables.chVal.relations.chPlayerCharacter.rivalry.stv += 350;
				State.variables.chPlayerCharacter.relations.chVal.enmity.stv += 750;
				State.variables.chVal.relations.chPlayerCharacter.enmity.stv += 750;
				break;
			case "6":
				State.variables.chVal.relations.chMir.sexualTension.stv += 350;
				State.variables.chMir.relations.chVal.sexualTension.stv += 350;
				State.variables.chVal.relations.chMir.domination.stv += 750;
				State.variables.chMir.relations.chVal.submission.stv += 750;
				State.variables.chVal.relations.chMir.rivalry.stv -= 350;
				State.variables.chMir.relations.chVal.rivalry.stv -= 350;
				break;
			case "7":
				State.variables.chVal.relations.chMir.sexualTension.stv += 350;
				State.variables.chMir.relations.chVal.sexualTension.stv += 350;
				State.variables.chVal.relations.chMir.domination.stv += 750;
				State.variables.chMir.relations.chVal.submission.stv += 750;
				State.variables.chVal.relations.chMir.rivalry.stv -= 350;
				State.variables.chMir.relations.chVal.rivalry.stv -= 350;
				break;
		}
		switch (this.varyonteBoon) {
			case "1":
				charactersLearnSceneActions(["chPlayerCharacter"],["realHypnoticGlance","baHypnoticGlance"]);
				break;
			case "2":
				charactersLearnSceneActions(["chPlayerCharacter"],["energyDrainingKiss","baDrainingKiss","baEnergyDrainingKiss"]);
				break;
			case "3":
				charactersLearnSceneActions(["chPlayerCharacter"],["etherealChains","baEtherealChains"]);
				break;
		}
		switch (this.relBoost) {
			case "1":
				break;
			case "2":
				for ( var a of [ "friendship", "romance", "sexualTension" ] ) {
					State.variables.chPlayerCharacter.relations.chMir[a].stv += 800;
					State.variables.chMir.relations.chPlayerCharacter[a].stv += 800;
				}
				break;
			case "3":
				for ( var a of [ "friendship", "romance", "sexualTension" ] ) {
					State.variables.chPlayerCharacter.relations.chNash[a].stv += 800;
					State.variables.chNash.relations.chPlayerCharacter[a].stv += 800;
				}
				break;
			case "4":
				for ( var a of [ "friendship", "romance", "sexualTension" ] ) {
					State.variables.chPlayerCharacter.relations.chVal[a].stv += 800;
					State.variables.chVal.relations.chPlayerCharacter[a].stv += 800;
				}
				break;
		}
	
		// Relation advance for three days
		State.variables.personalRoom.endDayRelationMoodEffects();
		State.variables.personalRoom.endDayRelationMoodEffects();
		State.variables.personalRoom.endDayRelationMoodEffects();
		
		// Add learnt scrolls and money
		for ( var charKey of getActiveSimulationCharactersArray() ) {
			gC(charKey).foundScrolls.push("onAether","onFamily","theBasicsOfSex","theTasteOfPleasure","surprisedInTheRear","paybackForTheThief");
			gC(charKey).studiedScrolls.push("onAether","onFamily","theBasicsOfSex","theTasteOfPleasure","surprisedInTheRear","paybackForTheThief");
			gC(charKey).money += 3000;
		}
		createScrollOnAether().firstTimeEffect(getActiveSimulationCharactersArray());
		createScrollOnFamily().firstTimeEffect(getActiveSimulationCharactersArray());
		createScrollTheBasicsOfSex().firstTimeEffect(getActiveSimulationCharactersArray());
		createScrollTheTasteOfPleasure().firstTimeEffect(getActiveSimulationCharactersArray());
		createScrollSurprisedInTheRear().firstTimeEffect(getActiveSimulationCharactersArray());
		createScrollPaybackForTheThief().firstTimeEffect(getActiveSimulationCharactersArray());
	}
	
	SupToolsData.prototype.getButtonGoToRitualOfAvatars = function() { // SecondDay Rise | Personal Room
		var bText = '<<link [[Reach out for this new timeline' + '|SecondDay Rise]]' + '>><<' + 'script>>\n'
				  + 'State.variables.supToolsData.processPrologueChoices();\n'
				  + 'State.variables.supToolsData.quickstartRoomPassage = "";\n'
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}
	
	SupToolsData.prototype.getButtonGoToReceivedBoons = function() { // TenthDay Rise | Personal Room
		var bText = '<<link [[Reach out for this new timeline' + '|Personal Room]]' + '>><<' + 'script>>\n'
				  + 'State.variables.supToolsData.processPrologueChoices();'
				  + 'State.variables.supToolsData.processChapterOneChoices();'
				  + 'State.variables.supToolsData.quickstartRoomPassage = "";\n'
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}
	
		// Cheat Menu
	SupToolsData.prototype.formatCheatMenuRoom = function() {
		switch ( this.cheatMenuStage ) {
			case "start":
				this.cheatMenuRoomPassage = this.formatCMRstart() + "\n" + this.getButtonGoToPersonalRoom();
				break;
			case "character":
				this.cheatMenuRoomPassage = this.formatCMRcharacter();
				break;
			case "relationChoice":
				this.cheatMenuRoomPassage = this.formatCMRrelationChoice(this.cheatMenuSelectedChar);
				break;
			case "relationChange":
				this.cheatMenuRoomPassage = this.formatCMRrelationChange(this.cheatMenuSelectedChar,this.cheatMenuSelectedCharB);
				break;
			case "sexGenderChoice":
				this.cheatMenuRoomPassage = this.formatCMRsexGenderChange(this.cheatMenuSelectedChar);
				break;
			case "sexPreferencesChoice":
				this.cheatMenuRoomPassage = this.formatCMRsexPreferencesChange(this.cheatMenuSelectedChar);
				break;
			case "editActionsChoice":
				this.cheatMenuRoomPassage = this.formatCMReditActionsChange(this.cheatMenuSelectedChar);
				break;
			case "items":
				this.cheatMenuRoomPassage = formatCMRitems();
				break;
			case "calendar":
				this.cheatMenuRoomPassage = formatCMRcalendar();
				break;
		}
	}
	
	SupToolsData.prototype.formatCMRstart = function() {
		if ( this.newWs != undefined ) {
			delete this.newWs;
		}
		var pText = "__Available characters:__\n";
		for ( var ch of getActiveSimulationCharactersArray() ) {
			pText += "- " + this.getButtonGoToCharCheatMenu(ch) + " " + gC(ch).icon() + "\n";
		}
		pText += "\n" + this.getButtonPassRelationDayCheatMenu() + "\n\n"
			   + getButtonCheatMenuItems() + "\n\n"
			   + getButtonCheatMenuCalendar() + "\n\n"
			   + this.formatCMRglobalVars() + "\n";
		return pText;
	}
	SupToolsData.prototype.formatCMRcharacter = function() {
		this.newWs = [];
		for ( var n in setup.basePreferencesMultipliers ) {
			this.newWs.push(0);
		}
		var ch = this.cheatMenuSelectedChar;
		this.charNewMerit = gC(ch).merit;
		this.charNewInfamy = gC(ch).infamy;
		this.charNewMoney = gC(ch).money;
		
		this.charNewPhysique = gC(ch).physique.value;
		this.charNewAgility = gC(ch).agility.value;
		this.charNewResilience = gC(ch).resilience.value;
		this.charNewWill = gC(ch).will.value;
		this.charNewIntelligence = gC(ch).intelligence.value;
		this.charNewPerception = gC(ch).perception.value;
		this.charNewEmpathy = gC(ch).empathy.value;
		this.charNewCharisma = gC(ch).charisma.value;
		this.charNewLuck = gC(ch).luck.value;
		
		this.charNewdImprovement = gC(ch).dImprovement.value;
		this.charNewdLove = gC(ch).dLove.value;
		this.charNewdPleasure = gC(ch).dPleasure.value;
		this.charNewdDomination = gC(ch).dDomination.value;
		this.charNewdCooperation = gC(ch).dCooperation.value;
		this.charNewdAmbition = gC(ch).dAmbition.value;
		
		var pText = this.getButtonGoToMainCheatMenu() + "\n\n";
		pText += "__" + gC(this.cheatMenuSelectedChar).name + "__\n";
		pText += "Merit: " + gC(ch).merit + " | New merit: " + '<<textbox "$supToolsData.charNewMerit" "'
				+ this.charNewMerit + '">>\n';
		pText += "Infamy: " + gC(ch).infamy + " | New infamy: " + '<<textbox "$supToolsData.charNewInfamy" "'
				+ this.charNewInfamy + '">>\n';
		pText += "Money: " + gC(ch).money.toFixed(1) + " | New money: " + '<<textbox "$supToolsData.charNewMoney" "'
				+ this.charNewMoney.toFixed(1) + '">>\n\n';
		
		pText += "__Stats__\n";
		pText += "Physique: " + gC(ch).physique.value + " | New physique: " + '<<textbox "$supToolsData.charNewPhysique" "'
				+ this.charNewPhysique + '">>\n';
		pText += "Agility: " + gC(ch).agility.value + " | New agility: " + '<<textbox "$supToolsData.charNewAgility" "'
				+ this.charNewAgility + '">>\n';
		pText += "Resilience: " + gC(ch).resilience.value + " | New resilience: " + '<<textbox "$supToolsData.charNewResilience" "'
				+ this.charNewResilience + '">>\n';
		pText += "Will: " + gC(ch).will.value + " | New will: " + '<<textbox "$supToolsData.charNewWill" "'
				+ this.charNewWill + '">>\n';
		pText += "Intelligence: " + gC(ch).intelligence.value + " | New intelligence: " + '<<textbox "$supToolsData.charNewIntelligence" "'
				+ this.charNewIntelligence + '">>\n';
		pText += "Perception: " + gC(ch).perception.value + " | New perception: " + '<<textbox "$supToolsData.charNewPerception" "'
				+ this.charNewPerception + '">>\n';
		pText += "Empathy: " + gC(ch).empathy.value + " | New empathy: " + '<<textbox "$supToolsData.charNewEmpathy" "'
				+ this.charNewEmpathy + '">>\n';
		pText += "Charisma: " + gC(ch).charisma.value + " | New charisma: " + '<<textbox "$supToolsData.charNewCharisma" "'
				+ this.charNewCharisma + '">>\n';
		pText += "Luck: " + gC(ch).luck.value + " | New luck: " + '<<textbox "$supToolsData.charNewLuck" "'
				+ this.charNewLuck + '">>\n\n';		
		
		var drivesNames = ["Self-improvement","Love","Pleasure","Domination","Cooperation","Ambition"];
		var drivesVars = ["dImprovement","dLove","dPleasure","dDomination","dCooperation","dAmbition"];
		pText += "__Drives__\n";
		for ( var i = 0 ; i < 6 ; i++ ) {
			var driveObject = gC(ch)[drivesVars[i]];
			var cmVarName = "$supToolsData.charNew" + drivesVars[i];
			pText += `${drivesNames[i]} - Level: ${driveObject.level} ; Points: ${driveObject.value.toFixed(1)} ; New points: `
				   + `<<textbox '${cmVarName}' ${driveObject.value.toFixed(1).toString()}>>\n`;
		}
		pText += "\n";
		
		pText += this.getButtonCommitCharCheatMenu(ch) + "\n\n";
		pText += this.getButtonGoToGenderSexChoice(ch) + "\n";
		pText += this.getButtonGoToActionsEditChoice(ch) + "\n";
		pText += this.getButtonGoToSexPreferencesChoice(ch) + "\n";
		pText += this.getButtonGoToRelationChoice(ch);
		return pText;
	}
	
	SupToolsData.prototype.formatCMRrelationChoice = function(character) {
		var pText = "__Available characters:__\n";
		for ( var ch of getActiveSimulationCharactersArray() ) {
			if ( ch != character ) {
				pText += "- " + this.getButtonGoToRelationChange(character,ch) + " " + gC(ch).icon() + "\n";
			}
		}
		pText += this.getButtonGoToMainCheatMenu();
		return pText;
	}
	SupToolsData.prototype.formatCMRrelationChange = function(charA,charB) {
		var r = 0;
		var i = 0;
		this.newRelABv = [];
		this.newRelBAv = [];
		var relationTypes = [ "Friendship" , "Sexual Tension" , "Romance" , "Domination" , "Submission" , "Rivalry" , "Enmity" ];
		var relationVars = [ "friendship" , "sexualTension" , "romance" , "domination" , "submission" , "rivalry" , "enmity" ];
		for ( var r1 of relationVars ) {
			r = State.variables[charA].relations[charB][r1];
			if ( r.hasOwnProperty("stv") ) {
				this.newRelABv.push(r.stv);
				this.newRelABv.push(r.ltv);
			}
		}
		i = 0;
		for ( var r1 of relationVars ) {
			r = State.variables[charB].relations[charA][r1];
			if ( r.hasOwnProperty("stv") ) {
				this.newRelBAv.push(r.stv);
				this.newRelBAv.push(r.ltv);
			}
		}
		i = 0;
		
		var pText = "__Relation between " + gC(charA).name + " and " + gC(charB).name + "__\n\n";
		
		pText += "__" + gC(charA).name + " > " + gC(charB).name + "__\n";
		for ( var rt of relationTypes ) {
			pText += rt + "\nSTV: " + this.newRelABv[i].toFixed(1) + ' | New value: <<textbox "$supToolsData.newRelABv[' + i + ']" "' + this.newRelABv[i].toFixed(1) + '">> '
				   + "\nLTV: " + this.newRelABv[i+1].toFixed(1) + ' | New value: <<textbox "$supToolsData.newRelABv[' + (i+1) + ']" "' + this.newRelABv[i+1].toFixed(1) + '">> '+ "\n";
			i += 2;
		}
		
		i = 0;
		pText += "\n__" + gC(charB).name + " > " + gC(charA).name + "__\n";
		for ( var rt of relationTypes ) {
			pText += rt + "\nSTV: " + this.newRelBAv[i].toFixed(1) + ' | New value: <<textbox "$supToolsData.newRelBAv[' + i + ']" "' + this.newRelBAv[i].toFixed(1) + '">> '
				   + "\nLTV: " + this.newRelBAv[i+1].toFixed(1) + ' | New value: <<textbox "$supToolsData.newRelBAv[' + (i+1) + ']" "' + this.newRelBAv[i+1].toFixed(1) + '">> '+ "\n";
			i += 2;
		}
		
		pText += "\n" + this.getButtonCommitRelationCheatMenu() + "\n" + this.getButtonBackToRelationChoice() + "\n" + this.getButtonGoToMainCheatMenu();
		
		return pText;
	}
	
	SupToolsData.prototype.formatCMRsexGenderChange = function(character) {
		var pText = "__" + gC(character).getFormattedName() + "'s bodyparts__:\n";
		// Bodyparts
		for ( var bp of ["pussy","dick","breasts"]) {
			if ( gC(character).body.hasOwnProperty(bp) ) {
				pText += '<<link [[Delete ' + bp + '|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
					   + 'State.variables.' + character + '.removeBodypart("' + bp + '");\n'
					   + '<</' + 'script>><</' + 'link>>\n';
			} else {
				pText += '<<link [[Add ' + bp + '|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
					   + 'State.variables.' + character + '.addBodypart("' + bp + '","' + bp + '");\n'
					   + '<</' + 'script>><</' + 'link>>\n';
			}
		}
		// Name
		pText += "\n__Character's name__:\n<<textbox '$supToolsData.charNewName' '" + gC(character).name
			   + "'>> ( This option will remove flavor names )\n"
			   + "<<link [[Change character's name|Cheat Menu Supporter Room]]" + '>><<' + 'script>>\n'
			   + 'State.variables.' + character + '.name = State.variables.supToolsData.getNewName() ;\n'
			   + 'State.variables.' + character + '.setNameColor("' + gC(character).nameColor + '");\n'
			   + 'State.variables.' + character + '.names = [ State.variables.supToolsData.getNewName() ] ;\n'
			   + '<</' + 'script>><</' + 'link>>\n\n';
		// Pronouns
		pText += "__Character's pronouns__:\nPersonal pronoun: <<textbox '$supToolsData.charNewPerPr' '" + gC(character).perPr + "'>>\n"
			   + "Object pronoun: <<textbox '$supToolsData.charNewComPr' '" + gC(character).comPr + "'>>\n"
			   + "Reflexive pronoun: <<textbox '$supToolsData.charNewRefPr' '" + gC(character).refPr + "'>>\n"
			   + "Possesive pronoun: <<textbox '$supToolsData.charNewPosPr' '" + gC(character).posPr + "'>>\n"
			   + "Independent possesive: <<textbox '$supToolsData.charNewInPosPr' '" + gC(character).inPosPr + "'>>\n"
			   + "<<link [[Change character's pronouns|Cheat Menu Supporter Room]]" + '>><<' + 'script>>\n'
			   + 'State.variables.' + character + '.perPr = State.variables.supToolsData.getNewPerPr();\n'
			   + 'State.variables.' + character + '.comPr = State.variables.supToolsData.getNewComPr();\n'
			   + 'State.variables.' + character + '.refPr = State.variables.supToolsData.getNewRefPr();\n'
			   + 'State.variables.' + character + '.posPr = State.variables.supToolsData.getNewPosPr();\n'
			   + 'State.variables.' + character + '.inPosPr = State.variables.supToolsData.getNewInPosPr();\n'
			   + '<</' + 'script>><</' + 'link>>\n\n';
		// Leave section button
		pText += this.getButtonGoToMainCheatMenu();
		return pText;
		/*
		
	this.charNewPerPr = "";
	this.charNewComPr = "";
	this.charNewRefPr = "";
	this.charNewPosPr = "";
	this.charNewInPosPr = "";
	*/
	}
	
	SupToolsData.prototype.formatCMRsexPreferencesChange = function(character) {
		var pText = "__" + gC(character).getFormattedName() + "'s preferences' weights and ranks__:\n"
				  + "Ranks will get readjusted depending on the weights. Please input only positive integer numbers.\n";
		var i = 0;
		for ( var t in gC(character).tastes ) {
			var taste = gC(character).tastes[t];
			if ( taste.w != undefined ) {
				pText += taste.content + `, Weight: <<textbox "$supToolsData.newWs[${i}]" "` + taste.w + '">> Rank: ' + taste.r + '\n';
			// <<textbox "$supToolsData.newInfamy" "' + gSettings().infamyLimit + '">>\n'
			// `'$State.variables["${character}"].tastes["${t}"].w'`
				i++;
			}
		}
		pText += this.getButtonCommitPreferencesCheatMenu() + "\n";
		pText += this.getButtonCommitPreferencesCheatMenuAndLeave();
		pText += "\n\n"
				  + `You may not want the sum of all weights to be over 3400. When this happens, some weights may be randomly decreased, with the `
				  + `higher values having an higher chance of being targeted. In order to make sure all preferences maintain the hierarchy you desire, you may `
				  + `have to decrease the weights of the preferences that have lower ranks as well.`;
		return pText;
	}
	
	SupToolsData.prototype.formatCMReditActionsChange = function(cK) {
		var pText = "Beware: This menu allows you to teach all actions that exist in the game's data."
				  + "\nHowever, learning some actions through this menu could provoke unexpected issues, such as transformation actions. Transformation actions should only be learned upon the initation of a transformation scene."
				  + "\nOther actions will not be usable even after being learnt if they have special requirements. This would be the case of racial actions such as \"Slime Hug\" or \"Vine Arm Lock\".\n\n"
				  + "__" + gC(cK).getFormattedName() + "'s actions__:\n";
		var actions = new saList();
		for ( var it in actions ) {
			if ( actions[it] instanceof sceneAction ) {
				pText += "- " + actions[it].name + " (" + actions[it].key + ") ";
				if ( actions[it].tags.includes("ss") ) { pText += " " + hoverText("SSA","Sex Scene Action"); }
				if ( actions[it].tags.includes("bs") ) { pText += " " + hoverText("BSA","Battle Scene Action"); }
				if ( gC(cK).saList.includes(actions[it].key) == false ) { // Character knows the action, notify and add option to remove it
					pText += ' <<link [[Learn|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
						   + 'charactersLearnSceneActions(["' + cK + '"],["' + actions[it].key + '"]);\n'
						   + '<</' + 'script>><</' + 'link>>\n';
				} else { // Character does not know the action, add option to add it
					pText += colorText(" Known action","green") + " " + '<<link [[Forget|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
						   + 'charactersForgetSceneActions(["' + cK + '"],["' + actions[it].key + '"]);\n'
						   + '<</' + 'script>><</' + 'link>>\n';
				}
			}
		}
		pText += '\n<<link [[Return to character screen|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
			   + 'State.variables.supToolsData.cheatMenuStage = "character";\n'
			   + '<</' + 'script>><</' + 'link>>\n';
		return pText;
	}
	
	SupToolsData.prototype.commitCharCheats = function(character) {
		gC(character).merit = parseInt(this.charNewMerit);
		gC(character).infamy = parseInt(this.charNewInfamy);
		gC(character).money = parseInt(this.charNewMoney);
		
		gC(character).physique.value = parseInt(this.charNewPhysique);
		gC(character).agility.value = parseInt(this.charNewAgility);
		gC(character).resilience.value = parseInt(this.charNewResilience);
		gC(character).will.value = parseInt(this.charNewWill);
		gC(character).intelligence.value = parseInt(this.charNewIntelligence);
		gC(character).perception.value = parseInt(this.charNewPerception);
		gC(character).empathy.value = parseInt(this.charNewEmpathy);
		gC(character).charisma.value = parseInt(this.charNewCharisma);
		gC(character).luck.value = parseInt(this.charNewLuck);
		
		var drivesVars = ["dImprovement","dLove","dPleasure","dDomination","dCooperation","dAmbition"];
		for ( var dv of drivesVars ) {
			gC(character)[dv].value = parseInt(this["charNew" + dv]);
			var i = 0 ; while ( i < 100 ) {
				driveChecksLevelChange(gC(character)[dv]); i++;
			}
		}
		//gC(character).dImprovement.value = parseInt(this.charNewdImprovement);
	}

	SupToolsData.prototype.commitPreferencesCheats = function(cK) {
		var i = 0;
		for ( var taste in gC(cK).tastes ) {
			var t = gC(cK).tastes[taste];
			if ( t.w != undefined ) {
				var newW = parseInt(this.newWs[i]);
				if ( newW == undefined || isNaN(newW) ) {
					newW = 100;
				} else if ( newW < 1 ) {
					newW = 1;
				}
				t.w = newW;
				i++;
			}
		}
		rebalanceCharsSexTastes(cK);
	}

	SupToolsData.prototype.getButtonCommitPreferencesCheatMenu = function() {
		var bText = '<<link [[Commit changes|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
				  + 'State.variables.supToolsData.commitPreferencesCheats("' + this.cheatMenuSelectedChar + '");\n'
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}
	SupToolsData.prototype.getButtonCommitPreferencesCheatMenuAndLeave = function() {
		var bText = '<<link [[Commit changes and leave|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
				  + 'State.variables.supToolsData.cheatMenuStage = "character";\n'
				  + 'State.variables.supToolsData.commitPreferencesCheats("' + this.cheatMenuSelectedChar + '");\n'
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}
	
	SupToolsData.prototype.commitRelationCheats = function(charA,charB) {
		// New values were saved at newRelABv and newRelBAv, this function applies them
		var i = 0;
		var l = 0;
		var rTypes = [ "friendship" , "sexualTension" , "romance" , "domination" , "submission" , "rivalry" , "enmity" ];
		while ( i < 14 ) {
			State.variables[charA].relations[charB][rTypes[l]] = new RelPar(parseInt(this.newRelABv[i]),parseInt(this.newRelABv[i+1]));
			i += 2;
			l++;
		}
		i = 0;
		l = 0;
		while ( i < 14 ) {
			State.variables[charB].relations[charA][rTypes[l]] = new RelPar(parseInt(this.newRelBAv[i]),parseInt(this.newRelBAv[i+1]));
			i += 2;
			l++;
		}
	}
	
	SupToolsData.prototype.getButtonGoToMainCheatMenu = function() {
		var bText = '<<link [[Back to Start of Cheat Menu' + '|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
				  + 'State.variables.supToolsData.cheatMenuStage = "start";\n'
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}
	SupToolsData.prototype.getButtonGoToMainCheatMenuRemoveCalendarVars = function() {
		var bText = '<<link [[Back to Start of Cheat Menu' + '|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
				  + 'delete State.variables.supToolsData.newDay;\n'
				  + 'delete State.variables.supToolsData.newMonth;\n'
				  + 'State.variables.supToolsData.cheatMenuStage = "start";\n'
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}
	
	SupToolsData.prototype.getButtonGoToCharCheatMenu = function(character) {
		var bText = '<<link [[' + gC(character).name + '|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
				  + 'State.variables.supToolsData.cheatMenuStage = "character";\n'
				  + 'State.variables.supToolsData.cheatMenuSelectedChar = "' + character + '";\n'
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}
	SupToolsData.prototype.getButtonPassRelationDayCheatMenu = function(character) {
		var bText = '<<link [[Relations Tick|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
				  + 'State.variables.personalRoom.endDayRelationMoodEffects();\n'
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}
	
	SupToolsData.prototype.getButtonGoToRelationChoice = function(character) {
		var bText = '<<link [[Edit relations|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
				  + 'State.variables.supToolsData.cheatMenuStage = "relationChoice";\n'
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}
	
	SupToolsData.prototype.getButtonGoToGenderSexChoice = function(character) {
		var bText = '<<link [[Edit sex and gender|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
				  + 'State.variables.supToolsData.cheatMenuStage = "sexGenderChoice";\n'
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}
	
	SupToolsData.prototype.getButtonGoToSexPreferencesChoice = function(character) {
		var bText = '<<link [[Edit sex preferences|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
				  + 'State.variables.supToolsData.cheatMenuStage = "sexPreferencesChoice";\n'
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}
	
	SupToolsData.prototype.getButtonGoToActionsEditChoice = function(character) {
		var bText = '<<link [[Edit character actions|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
				  + 'State.variables.supToolsData.cheatMenuStage = "editActionsChoice";\n'
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}
	
	SupToolsData.prototype.getButtonGoToRelationChange = function(charA,charB) {
		var bText = '<<link [[' + gC(charB).name + '|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
				  + 'State.variables.supToolsData.cheatMenuSelectedCharB = "' + charB + '";\n'
				  + 'State.variables.supToolsData.cheatMenuStage = "relationChange";\n'
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}
	
	SupToolsData.prototype.getButtonCommitCharCheatMenu = function(character) {
		var bText = '<<link [[Commit changes|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
				  + 'State.variables.supToolsData.commitCharCheats("' + character + '");\n'
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}
	SupToolsData.prototype.getButtonCommitRelationCheatMenu = function() {
		var bText = '<<link [[Commit changes|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
				  + 'State.variables.supToolsData.commitRelationCheats("' + this.cheatMenuSelectedChar + '","' + this.cheatMenuSelectedCharB + '");\n'
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}
	SupToolsData.prototype.getButtonBackToRelationChoice = function() {
		var bText = '<<link [[Back to choose relation target|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
				  + 'State.variables.supToolsData.commitRelationCheats("' + this.cheatMenuSelectedChar + '","' + this.cheatMenuSelectedCharB + '");\n'
				  + 'State.variables.supToolsData.cheatMenuStage = "relationChoice";\n'
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}
	
	SupToolsData.prototype.formatCMRglobalVars = function() {
		var pText = '__Global variables__ (Use positive integers larger than 0 only):\n'
				  + 'Infamy limit: <<textbox "$supToolsData.newInfamy" "' + gSettings().infamyLimit + '">>\n'
				  + 'Special relationships duration: <<textbox "$supToolsData.newRelDuration" "' + gSettings().relationshipsDuration + '">>\n'
				  + 'Forced equipment duration: <<textbox "$supToolsData.newEqDuration" "' + gSettings().equipmentDuration + '">>\n'
					// Commit changes link
				  + '<<link [[Commit global variables changes|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
				  + 'commitGlobalVarChanges();\n'
				  + '<</' + 'script>><</' + 'link>>';
		return pText;
	}
	
	SupToolsData.prototype.getButtonGoToPersonalRoom = function() {
		var bText = '<<link [[Leave Cheat Menu' + '|Personal Room]]' + '>><<' + 'script>>\n'
				  + "State.variables.supToolsData.cheatMenuRoomPassage = '';\n"
				  + '<</' + 'script>><</' + 'link>>';
		return bText;
	}

State.variables.supToolsData = new SupToolsData();

// Other functions

window.commitGlobalVarChanges = function() {
	if ( parseInt(State.variables.supToolsData.newInfamy) < 1 ) { State.variables.supToolsData.newInfamy = 1; }
	if ( parseInt(State.variables.supToolsData.newRelDuration) < 1 ) { State.variables.supToolsData.newRelDuration = 1; }
	if ( parseInt(State.variables.supToolsData.newEqDuration) < 1 ) { State.variables.supToolsData.newEqDuration = 1; }
	gSettings().infamyLimit = parseInt(State.variables.supToolsData.newInfamy);
	gSettings().relationshipsDuration = parseInt(State.variables.supToolsData.newRelDuration);
	gSettings().equipmentDuration = parseInt(State.variables.supToolsData.newEqDuration);
}

// Formatting menus
window.formatCMRcalendar = function() {
	var pText = "__Calendar Menu__\n\nChange date:\n";
	
	// Change day and month
	pText += "New day: " + '<<textbox "$supToolsData.newDay" "' + State.variables.daycycle.day + '">>\n'
	pText += "New month: " + '<<textbox "$supToolsData.newMonth" "' + State.variables.daycycle.month + '">>\n'
	pText += '<<link [[Set new date|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
			  + 'setNewDateCheatMenu();'
			  + '<</' + 'script>><</' + 'link>>\n';
	
	// Explanation on random story events flags
	pText += "\n__Random story events' flags__\n"
		   + "When a new story event is chosen to be played, its flag gets stored in the played story events pile. You may remove those flags here, which will allow you to replay those random story events if you meet the rest of their conditions again.\n";
	for ( var rsef of State.variables.eventsCalendar.playedStoryEvents ) {
		pText += "- " + gEMI(rsef).name + " , " + gEMI(rsef).key + " " + getButtonRemoveRSEflag(rsef) + "\n";
	}
	// Random story events flags
	
	// Back to main cheat menu
	pText += "\n" + State.variables.supToolsData.getButtonGoToMainCheatMenuRemoveCalendarVars();
		
	return pText;
}
window.getButtonRemoveRSEflag = function(rsef) {
	var bText = "<<link [[Remove event's flag|Cheat Menu Supporter Room]]" + '>><<' + 'script>>\n'
			  + "State.variables.eventsCalendar.playedStoryEvents = arrayMinusA(State.variables.eventsCalendar.playedStoryEvents,'" + rsef + "');\n"
			  + '<</' + 'script>><</' + 'link>>';
	return bText;
}
window.setNewDateCheatMenu = function() {
	var newDay = parseInt(State.variables.supToolsData.newDay);
	var newMonth = parseInt(State.variables.supToolsData.newMonth);
	if ( isNaN(newDay) ) {
		newDay = 1;
	} else if ( newDay < 1 ) {
		newDay = 1;
	} else if ( newDay > 30 ) {
		newDay = 30;
	}
	if ( isNaN(newMonth) ) {
		newMonth = 1;
	} else if ( newMonth < 1 ) {
		newMonth = 1;
	} else if ( newMonth > 12 ) {
		newMonth = 12;
	}
	State.variables.daycycle.day = newDay;
	State.variables.daycycle.month = newMonth;
}

window.formatCMRitems = function() {
	var pText = "";
	
	// Create new item
	var itemsOptions = ["b0","b1","b2","b3","b4","b5","b6","b7","b8","w0","w1","w2","w3"];
	pText += "__Create new item__:\n";
	pText += 'Item: <<listbox "$supToolsData.cheatMenuSelectedItem" autoselect>>\n'; 
	for ( var opt of itemsOptions ) {
		pText += '<<option "' + setup.equipDataList[opt].name + '" ' + opt + '>>\n';
	}
	pText += "<</listbox>>\n";
	pText += 'Owner: <<listbox "$supToolsData.cheatMenuSelectedChar" autoselect>>\n';
	for ( var charKey of getActiveSimulationCharactersArray() ) {
		pText += '<<option "' + gC(charKey).name + '" ' + charKey + '>>\n';
	}
	pText += "<</listbox>>\n";
	pText += '<<link [[Create item and give to owner|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
			  + 'cheatMenuCreateSelectedItem();'
			  + '<</' + 'script>><</' + 'link>>\n\n';
	
	// Item list and unequip
	pText += "__Items list__:\n";
	for ( var item of State.variables.equipmentList ) {
		pText += "* " + getEquipDataById(item.id).name + ", " + gC(item.owner).getFormattedName() + "'s ";
		if ( item.equippedOn != null ) {
			pText += '| <<link [[Unequip from ' + gC(item.equippedOn).name + '|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
				   + 'unequipObject(' + item.id + ');\n'
				   + '<</' + 'script>><</' + 'link>> ';
		} else {
		}
		pText += '| <<link [[Remove item|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
				   + 'removeItem(' + item.id + ');\n'
				   + '<</' + 'script>><</' + 'link>> ';
		pText += "\n";
	}
	
	// Back to main cheat menu
	pText += "\n" + State.variables.supToolsData.getButtonGoToMainCheatMenu();
		
	return pText;
}
window.cheatMenuCreateSelectedItem = function() {
	 createEquipment(State.variables.supToolsData.cheatMenuSelectedItem,State.variables.supToolsData.cheatMenuSelectedChar);
}

window.getButtonCheatMenuItems = function() {
	var bText = '<<link [[Items Menu|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
			  + 'State.variables.supToolsData.cheatMenuStage = "items";\n'
			  + '<</' + 'script>><</' + 'link>>';
	return bText;
}

window.getButtonCheatMenuCalendar = function() {
	var bText = '<<link [[Calendar Menu|Cheat Menu Supporter Room]]' + '>><<' + 'script>>\n'
			  + 'State.variables.supToolsData.cheatMenuStage = "calendar";\n'
			  + 'State.variables.supToolsData.newDay = State.variables.daycycle.day;\n'
			  + 'State.variables.supToolsData.newMonth = State.variables.daycycle.month;\n'
			  + '<</' + 'script>><</' + 'link>>';
	return bText;
}


/*
<<listbox "$lbanswer" autoselect>>
	<<option "Towel">>
	<<option "π" 3.14159>>
	<<option 42>>
	<<option 69>>
	<<option "∞" Infinity>>
<</listbox>>
*/

// Constructors, serializers, etc.
SupToolsData.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
SupToolsData.prototype.clone = function () {
	return (new SupToolsData())._init(this);
};
SupToolsData.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new SupToolsData())._init($ReviveData$)', ownData);
};
