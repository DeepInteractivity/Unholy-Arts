// CONFIG //

Config.saves.autoload = false;
Config.saves.autosave = false;
Config.loadDelay = 50;
Config.history.maxStates = 1;

////////// GAME SETTINGS CLASS //////////

window.Settings = function() { 
	this.debugFunctions = false;
	
	this.infamyLimit = 25;
	this.followingAllowed = false;
	this.relationshipTypesAllowed = false;
	this.challengingAllowed = false;
	this.assaultingAllowed = false;

	this.autosaving = "enable"; // "enable" / "disable"

	this.difficulty = "normal"; // "easy" / "normal" / "hard"
	
	this.futa = "enableAll"; // "enableAll" / "disableMainStory" / "disableAll"
	
	this.anal = "enable"; // "enable" / "disable"
	
	this.pain = "enable"; // "enable" / "disable"
	
	this.battleDefeatSex = "enable"; // "enable" / "disable"
	
	this.servitudeRelationships = "enable"; // "enable" / "disable"
	
	// Settings formatting
	this.autosavingChoices = "";
	
	this.difficultyChoices = 'Difficulty:\n' + '<label><<radiobutton "$settings.difficulty" "easy">> Easy</label>\n'
						   + '<label><<radiobutton "$settings.difficulty" "normal" checked>> Normal</label>\n'
						   + '<label><<radiobutton "$settings.difficulty" "hard">> Hard</label>';
	
	this.futaChoices = "";
	
	this.analChoices = "";
	
	this.painChoices = "";
	
	this.battleDefeatSexChoices = "";
	
	this.servitudeRelationshipsChoices = "";
						   
	this.allChoices = "";
	
	this.formatDifficultyChoices = function() {
		this.difficultyChoices = '__Difficulty__' + getDifficultyTooltip() + ':\n' + '<label><<radiobutton "$settings.difficulty" "easy"';
		if ( this.difficulty == "easy" ) { this.difficultyChoices += " checked"; }
		this.difficultyChoices += '>> Easy</label>\n'
						   + '<label><<radiobutton "$settings.difficulty" "normal"';
		if ( this.difficulty == "normal" ) { this.difficultyChoices += " checked"; }				   
		this.difficultyChoices += '>> Normal</label>\n'
						   + '<label><<radiobutton "$settings.difficulty" "hard"';
		if ( this.difficulty == "hard" ) { this.difficultyChoices += " checked"; }	
		this.difficultyChoices += '>> Hard</label>';
	}
	this.formatFutaChoices = function() {
		this.futaChoices = '__Futanari__' + getFutanariTooltip() + ':\n';
		this.futaChoices += '<label><<radiobutton "$settings.futa" "enableAll"';
		if ( this.futa == 'enableAll' ) { this.futaChoices += " checked"; }
		this.futaChoices += '>> Enable all content</label> ' + colorText("(Canon)","green") + '\n'
						  + '<label><<radiobutton "$settings.futa" "disableMainStory"';
		if ( this.futa == 'disableMainStory' ) { this.futaChoices += " checked"; }
		this.futaChoices += '>> Disable main story content</label>\n'
						  + '<label><<radiobutton "$settings.futa" "disableAll"';
		if ( this.futa == 'disableAll' ) { this.futaChoices += " checked"; }
		this.futaChoices += '>> Disable all content</label>';		
	}
	this.formatAnalChoices = function() {
		this.analChoices = '__Anal__' + getAnalTooltip() + ':\n';
		this.analChoices += '<label><<radiobutton "$settings.anal" "enable"';
		if ( this.anal == 'enable' ) { this.analChoices += " checked"; }
		this.analChoices += '>> Enable</label>\n'
						  + '<label><<radiobutton "$settings.anal" "disable"';
		if ( this.anal == 'disable' ) { this.analChoices += " checked"; }
		this.analChoices += '>> Disable</label>';	
	}
	
	this.formatBattleDefeatSexChoices = function() {
		this.battleDefeatSexChoices = '__Sex as result of battles__ (partially implemented)' + getSexFromBattlesTooltip() + ':\n';
		this.battleDefeatSexChoices += '<label><<radiobutton "$settings.battleDefeatSex" "enable"';
		if ( this.battleDefeatSex == 'enable' ) { this.battleDefeatSexChoices += " checked"; }
		this.battleDefeatSexChoices += '>> Enable</label>\n'
						  + '<label><<radiobutton "$settings.battleDefeatSex" "disable"';
		if ( this.battleDefeatSex == 'disable' ) { this.battleDefeatSexChoices += " checked"; }
		this.battleDefeatSexChoices += '>> Disable</label>';	
	}
	this.formatServitudeRelationshipsChoices = function() {
		this.servitudeRelationshipsChoices = '__Servitude relationships__' + getServitudeRelationshipsTooltip() + ':\n';
		this.servitudeRelationshipsChoices += '<label><<radiobutton "$settings.servitudeRelationships" "enable"';
		if ( this.servitudeRelationships == 'enable' ) { this.servitudeRelationshipsChoices += " checked"; }
		this.servitudeRelationshipsChoices += '>> Enable</label>\n'
						  + '<label><<radiobutton "$settings.servitudeRelationships" "disable"';
		if ( this.servitudeRelationships == 'disable' ) { this.servitudeRelationshipsChoices += " checked"; }
		this.servitudeRelationshipsChoices += '>> Disable</label>';	
	}
	this.formatAllChoices = function() {
		formatAutosavingChoices();
		this.formatDifficultyChoices();
		this.formatFutaChoices();
		this.formatAnalChoices();
		formatPainChoices();
		this.formatBattleDefeatSexChoices();
		this.formatServitudeRelationshipsChoices();
		
		this.allChoices = "";
		
		this.allChoices += this.autosavingChoices + "\n\n";
		if ( this.exitPassage != "Personal Room" ) { // These options shouldn't be accessible after the start of the game
			this.allChoices += this.difficultyChoices + "\n\n" + this.futaChoices + "\n\n"
		}
		this.allChoices += this.analChoices + "\n\n" + this.painChoices + "\n\n"
						+ this.battleDefeatSexChoices + "\n\n" + this.servitudeRelationshipsChoices + "\n\n"
						+ this.exitButton;
	}
	
	// Exit button
	this.exitPassage = "Disclaimer";
	this.exitButton = "<<l" + "ink [[Save settings and leave|" + this.exitPassage + "]]>><<s" + "cript>>"
					+ "<</s" + "cript>><</l" + "ink>>";
					
	this.getButtonExit = function() {
		var bText = "<<l" + "ink [[Save settings and leave|" + this.exitPassage + "]]>><<s" + "cript>>";
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	this.setExitPassage = function(exitPassage) {
		this.exitPassage = exitPassage;
		this.exitButton = this.getButtonExit(this.exitPassage);
	}
};

window.gSettings = function() {
	return State.variables.settings;
}

window.formatAutosavingChoices = function() {
	State.variables.settings.autosavingChoices = '__Autosaving__' + getAutosavingTooltip() + ':\n';
	State.variables.settings.autosavingChoices += '<label><<radiobutton "$settings.autosaving" "enable"';
	if ( State.variables.settings.autosaving == 'enable' ) { State.variables.settings.autosavingChoices += " checked"; }
	State.variables.settings.autosavingChoices += '>> Enable</label>\n' + '<label><<radiobutton "$settings.autosaving" "disable"';
	if ( State.variables.settings.autosaving == 'disable' ) { State.variables.settings.autosavingChoices += " checked"; }
	State.variables.settings.autosavingChoices += '>> Disable</label>';	
}

window.formatPainChoices = function() {
	State.variables.settings.painChoices = '__Pain actions__' + getPainTooltip() + ':\n';
	State.variables.settings.painChoices += '<label><<radiobutton "$settings.pain" "enable"';
	if ( State.variables.settings.pain == 'enable' ) { State.variables.settings.painChoices += " checked"; }
	State.variables.settings.painChoices += '>> Enable</label>\n' + '<label><<radiobutton "$settings.pain" "disable"';
	if ( State.variables.settings.pain == 'disable' ) { State.variables.settings.painChoices += " checked"; }
	State.variables.settings.painChoices += '>> Disable</label>';	
}

window.applyDifficultyChanges = function() {
	switch(gSettings().difficulty) {
		case "easy":
			for ( var st of getStatNamesArray() ) {
				gC("chPlayerCharacter")[st].value += 2;
				gC("chPlayerCharacter")[st].affinity += 0.1;
			}
			break;
		case "normal":
			
			break;
		case "hard":
			for ( var st of getStatNamesArray() ) {
				gC("chPlayerCharacter")[st].value -= 2;
				gC("chPlayerCharacter")[st].affinity -= 0.1;
			}			
			break;
	}
}

window.getAutosavingTooltip = function() {
	var tText = '<span title="Enabling autosaving will automatically save your game at the last slot when you enter the personal room menu,'
			  + 'at the end of the day.">^^(?)^^</span>';
	return tText;
}

window.getDifficultyTooltip = function() {
	var tText = '<span title="When selected at the start of the game, changes the starting stats and affinities of the player.'
			  + '\nHard may make you suffer.">^^(?)^^</span>';
	return tText;
}
window.getFutanariTooltip = function() {
	var tText = '<span title="Futanari are women with both male and female genitalia. Disabling main story content will prevent futanari protagonist transformations, but enable all other futanari content.">^^(?)^^</span>';
	return tText;
}
window.getAnalTooltip = function() {
	var tText = '<span title="This option enables or disables anal actions.">^^(?)^^</span>';
	return tText;
}
window.getPainTooltip = function() {
	var tText = '<span title="This option enables or disables sadism and masochism actions in sex scenes. Common fighting actions will remain enabled in combat scenes.">^^(?)^^</span>';
	return tText;
}
window.getSexFromBattlesTooltip = function() {
	var tText = '<span title="Partially implemented. Disabling this option will prevent characters from demanding sex after they win a battle.">^^(?)^^</span>';;
	return tText;
}
window.getServitudeRelationshipsTooltip = function() {
	var tText = '<span title="Servitude relationships are special relationships where the servant must obey the master. Disable this option to avoid these relationships from taking place.">^^(?)^^</span>';;
	return tText;
}

window.isAssaultPossible = function(actor,target) {
	var flagPossible = true;
	
	if ( gC(actor).followingTo != "" ) { // Actor follows no one
		flagPossible = false;
	}
	else if ( gC(target).followingTo != "" ) { // Target follows no one
		flagPossible = false;
	}
	else if ( gSettings().assaultingAllowed == false ) { // Assaulting is allowed
		flagPossible = false;
	}
	else if ( getCharsRoom(target).combatAllowed == false ) { // Combat is allowed in target's current room
		flagPossible = false;
	}
	else { // Actor and target don't have a special relationship that prevents assaults
		var relType = gRelTypeAb(actor,target);
		if ( relType ) {
			if ( relType.disallowedAssault ) {
				flagPossible = false;
			}
		}
	}
	
	if ( flagPossible ) {
		if ( mayCharBeInterrupted(target) == false ) {
			flagPossible = false;
		}
	}
	
	return flagPossible;
}
window.isChallengePossible = function(actor,target) {
	var flagPossible = true;
	
	if ( gC(actor).followingTo != "" ) { // Actor follows no one
		flagPossible = false;
	}
	else if ( gC(target).followingTo != "" ) { // Target follows no one
		flagPossible = false;
	}
	else if ( gSettings().challengingAllowed == false ) { // Challenging is allowed
		flagPossible = false;
	}
	else if ( getCharsRoom(target).combatAllowed == false ) { // Combat is allowed in target's current room
		flagPossible = false;
	}
	else { // Actor and target don't have a special relationship that prevents challenges
		var relType = gRelTypeAb(actor,target);
		if ( relType ) {
			if ( relType.disallowedChallenge ) {
				flagPossible = false;
			}
		}
	}
	
	if ( flagPossible ) {
		if ( mayCharBeInterrupted(target) == false ) {
			flagPossible = false;
		}
	}
	
	return flagPossible;
}
window.isLiberationChallengePossible = function(actor,target) {
	var flagPossible = true;
	var eventsList = getEventsWherCharIsInvolved(actor).concat(getEventsWherCharIsInvolved(target));
	for ( var ev of eventsList ) {
		if ( ev.title == "battle" ) {
			flagPossible = false;
		}
	}
	
	if ( gSettings().challengingAllowed == false ) {
		flagPossible = false;
	} else if ( gC(actor).domChar != target ) {
		flagPossible = false;
	} else if ( gRelTypeAb(actor,target).liberationChallenge == false ) {
		flagPossible = false;
	}
	else if ( getCharsRoom(target).combatAllowed == false ) { // Combat is allowed in target's current room
		flagPossible = false;
	}
	
	return flagPossible;
}

// Constructors, serializers, etc.
Settings.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
Settings.prototype.clone = function () {
	return (new Settings())._init(this);
};
Settings.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Settings())._init($ReviveData$)', ownData);
};

//////////////

setup.creditsGoddessEnthusiast = [ "LessIDableName ","Sordax","Fox McQwerty","ben ","Peter ","Troy Armstrong","Colton Foote","Barnabas Collins","Vadrin ","Jake Ross","Gura ","Nevyn ","Tyler Kreutzer","Pandavenger ","Chris40 ","He Who Remembers All","Bluebomber ","Brian Keefe","ElCrazy1 ","Hairdevill","Grissie","Jacob LaRiviere","ShardOfCard ","ElrondHubbard ","Thomas Colasanto","Nat Byham","Evgeniy ","Cody Shawver","Brad11 ","tiffany mawhorter","Trickster ","Anonimus Mito","Redace","Alex Srisaard","วํฒนะ มานะภักดี","Oliver_Ritchie ","Ermin Pivac","Alex2011","Scott","anactualgoat ","TheShwig ","Jou Chen","Michael ","Mateusz Karliczek","Robert Crawford","MrTheDarkRed ","Black Rose Valerie","Kandschur ","Andrew Dupuis","mainman879 ","Snaked ","Chris Shaw","Christopher Hopkins","Kevin Andrews","DankMeme ","Anburaru ","Meserym ","This Guy","Quinzell Antrom","Pandavenger","Logan Villa","Norann","Pingo ","Burckle","Mig Dig","Jan Hynek","Franko Bogdan","Alex Gaskins","Torrin ","Andrew Elvin","ArkSilver ","White Pebble","Gamenerd3 ","Yukari ","Grimaga ","Felkesste","Marcus Lu","Alysha Malone","Dage ","ArtificerZeltara" ];
setup.creditsPassionTemplePreacher = [ "Ryuko ","Barada Azana","aattss ","Samurai_Jack141 ","Name2146 ","Snakes! ","Irasur","Alex ","Nathaniel Grams","Cory Elliott","SenoirKain ","Andreas","ThatsAllFolks ","Joshua Boguth","Joshua Smith","Ross Fountain","Thomas ","Emily S.","Hunter Glad","Devin White","Anon ","hiorka","dark_dragon ","A giant crab","Kai Scheele","pyrite","Georgii Brisuela","Stephen","Stephen Pieper","Weathnarh ","Zergling ","Rodimus Darnath","kirito shiba","Unsung ","NoWorries623 ","Aplysina Cyanobacterium","Terminal_ERROR","Grant Manthey","Matt Miller","Dan Schrader","Slywolf357 ","Vysirez ","Benjamin Grieder","Michael Avellino","Satile ","Kestrel","Paladin_Wiggles_II ","CancerMage ","NightStrike01 ","ZVReaper16","Mcquaqua ","billyboy","Eric Wood","Elisia Seda","Sebastian Baran","Jabbtoth ","MaxTan ","Cyril guillas","Bartolomeo ","Pikarukawa","Nemesison ","Sunny Reehal","Joshua Todd Shaffer","TheLastBang ","c0nevs ","Rj Sawyer","Максим Конорев","Jacob Wrightsman","Desseus ","Lexi Knight","CriticalExistenceFailure ","floccinaucinihilipilification ","Friendly Neighbor","이재승 ","NovaDragn ","Chris Douglas","Bob Fruman","StrayWolf ","Skyrim mod lvr","William K Bennett","Spencer Bradford","Phenix995 ","Foolwatchout ","Lunaraia ","Guardx" ];
setup.creditsPassionTempleClergy = [ "Longwave" ];
setup.creditsTier1 = "";
setup.creditsTier2 = "";
setup.creditsTier3 = "";
for ( var patronEntry of setup.creditsGoddessEnthusiast ) {
	setup.creditsTier1 += patronEntry + "\n";
}
for ( var patronEntry of setup.creditsPassionTemplePreacher ) {
	setup.creditsTier2 += patronEntry + "\n";
}
for ( var patronEntry of setup.creditsPassionTempleClergy ) {
	setup.creditsTier3 += patronEntry + "\n";
}

