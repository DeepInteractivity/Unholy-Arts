// CONFIG //

Config.saves.autoload = false;
Config.saves.autosave = false;
Config.loadDelay = 50;
Config.history.maxStates = 1;

////////// GAME SETTINGS CLASS //////////

setup.infamySecondThreshold = 1.2;
setup.infamyThirdThreshold = 1.4;

window.Settings = function() { 
	this.debugFunctions = false;
	
	this.infamyLimit = 25;
	this.relationshipsDuration = 3;
	this.equipmentDuration = 5;
	this.followingAllowed = false;
	this.relationshipTypesAllowed = false;
	this.challengingAllowed = false;
	this.assaultingAllowed = false;

	this.autosaving = "enable"; // "enable" / "disable"

	this.difficulty = "normal"; // "easy" / "normal" / "hard"
	
	this.futa = "enableAll"; // "enableAll" / "disableMainStory" / "disableAll"
	
	this.sexPrefs = "noChanges"; // "noChanges" / "usePussy" / "useDick"
	
	this.npcBonus = "none"; // "none" / "bondage" / "hypnosis" / "draining" / "all"
	
	this.anal = "enable"; // "enable" / "disable"
	
	this.pain = "enable"; // "enable" / "disable"
	
	this.battleDefeatSex = "enable"; // "enable" / "disable"
	
	this.servitudeRelationships = "enable"; // "enable" / "disable"
	
	this.stealingServitudeAllowed = "disable"; // "enable" / "disable"
	
	this.chastity = "enable"; // "enable" / "disable"
	
	// Settings formatting
	this.autosavingChoices = "";
	
	this.difficultyChoices = 'Difficulty:\n' + '<label><<radiobutton "$settings.difficulty" "easy">> Easy</label>\n'
						   + '<label><<radiobutton "$settings.difficulty" "normal" checked>> Normal</label>\n'
						   + '<label><<radiobutton "$settings.difficulty" "hard">> Hard</label>';
	
	this.futaChoices = "";
	
	this.sexPrefChoices = "";
	
	this.npcBonusChoices = "";
	
	this.analChoices = "";
	
	this.painChoices = "";
	
	this.battleDefeatSexChoices = "";
	
	this.servitudeRelationshipsChoices = "";
	
	this.stealingServitudeChoices = "";
						   
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
	this.formatSexPrefChoices = function() { // noChanges usePussy useDick
		this.sexPrefChoices = '__Sex preferences__' + getTastesConfigTooltip() + ':\n';
		this.sexPrefChoices += '<label><<radiobutton "$settings.sexPrefs" "noChanges"';
		if ( this.sexPrefs == 'noChanges' ) { this.sexPrefChoices += " checked"; }
		this.sexPrefChoices += '>> No changes</label> ' + colorText("(Default)","green") + '\n'
						  + '<label><<radiobutton "$settings.sexPrefs" "usePussy"';
		if ( this.sexPrefs == 'usePussy' ) { this.sexPrefChoices += " checked"; }
		this.sexPrefChoices += '>> Use pussy</label>\n'
						  + '<label><<radiobutton "$settings.sexPrefs" "useDick"';
		if ( this.sexPrefs == 'useDick' ) { this.sexPrefChoices += " checked"; }
		this.sexPrefChoices += '>> Use dick</label>';		
	}
	
	this.formatNpcBonusesChoices = function() { // "none" / "bondage" / "hypnosis" / "draining" / "all"
		this.npcBonusChoices = '__NPC Candidates bonuses__' + getNPCsBonusesTooltip() + ':\n';
		this.npcBonusChoices += '<label><<radiobutton "$settings.npcBonus" "none"';
		if ( this.npcBonus == 'none' ) { this.npcBonusChoices += " checked"; }
		this.npcBonusChoices += '>> None</label>\n'
						  + '<label><<radiobutton "$settings.npcBonus" "bondage"';
		if ( this.npcBonus == 'bondage' ) { this.npcBonusChoices += " checked"; }
		this.npcBonusChoices += '>> Bondage</label>\n'
						  + '<label><<radiobutton "$settings.npcBonus" "hypnosis"';
		if ( this.npcBonus == 'hypnosis' ) { this.npcBonusChoices += " checked"; }
		this.npcBonusChoices += '>> Hypnosis</label>\n'
						  + '<label><<radiobutton "$settings.npcBonus" "draining"';
		if ( this.npcBonus == 'draining' ) { this.npcBonusChoices += " checked"; }
		this.npcBonusChoices += '>> Draining</label>\n'
						  + '<label><<radiobutton "$settings.npcBonus" "all"';
		if ( this.npcBonus == 'all' ) { this.npcBonusChoices += " checked"; }
		this.npcBonusChoices += '>> All</label>';		
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
		this.battleDefeatSexChoices = '__Sex as result of battles__' + getSexFromBattlesTooltip() + ':\n';
		this.battleDefeatSexChoices += '<label><<radiobutton "$settings.battleDefeatSex" "enable"';
		if ( this.battleDefeatSex == 'enable' ) { this.battleDefeatSexChoices += " checked"; }
		this.battleDefeatSexChoices += '>> Enable</label>\n'
						  + '<label><<radiobutton "$settings.battleDefeatSex" "disable"';
		if ( this.battleDefeatSex == 'disable' ) { this.battleDefeatSexChoices += " checked"; }
		this.battleDefeatSexChoices += '>> Disable</label>';	
	}
	this.formatServitudeRelationshipsChoices = function() {
		this.servitudeRelationshipsChoices = '__Servitude relationships__' + getServitudeRelationshipsTooltip() + ': ' + colorText("(Harsh content)","firebrick") + '\n';
		this.servitudeRelationshipsChoices += '<label><<radiobutton "$settings.servitudeRelationships" "enable"';
		if ( this.servitudeRelationships == 'enable' ) { this.servitudeRelationshipsChoices += " checked"; }
		this.servitudeRelationshipsChoices += '>> Enable</label>\n'
						  + '<label><<radiobutton "$settings.servitudeRelationships" "disable"';
		if ( this.servitudeRelationships == 'disable' ) { this.servitudeRelationshipsChoices += " checked"; }
		this.servitudeRelationshipsChoices += '>> Disable</label>';	
	}
	this.formatStealingServitudeChoices = function() {
		this.stealingServitudeChoices = '__Stealing submissives__' + getStealingServitudeTooltip() + ': ' + colorText("(Harsh content)","firebrick") + '\n';
		this.stealingServitudeChoices += '<label><<radiobutton "$settings.stealingServitudeAllowed" "enable"';
		if ( this.stealingServitudeAllowed == 'enable' ) { this.stealingServitudeChoices += " checked"; }
		this.stealingServitudeChoices += '>> Enable</label>\n'
						  + '<label><<radiobutton "$settings.stealingServitudeAllowed" "disable"';
		if ( this.stealingServitudeAllowed == 'disable' ) { this.stealingServitudeChoices += " checked"; }
		this.stealingServitudeChoices += '>> Disable</label>';	
	}
	this.formatChastityChoices = function() {
		this.chastityChoices = '__Chastity and ruined orgasms__' + getChastityTooltip() + ': ' + colorText("(Harsh content)","firebrick") + '\n';
		this.chastityChoices += '<label><<radiobutton "$settings.chastity" "enable"';
		if ( this.chastity == 'enable' ) { this.chastityChoices += " checked"; }
		this.chastityChoices += '>> Enable</label>\n'
						  + '<label><<radiobutton "$settings.chastity" "disable"';
		if ( this.chastity == 'disable' ) { this.chastityChoices += " checked"; }
		this.chastityChoices += '>> Disable</label>';	
	}
	this.formatAllChoices = function() {
		formatAutosavingChoices();
		this.formatDifficultyChoices();
		this.formatFutaChoices();
		this.formatSexPrefChoices();
		this.formatNpcBonusesChoices();
		this.formatAnalChoices();
		formatPainChoices();
		this.formatBattleDefeatSexChoices();
		this.formatServitudeRelationshipsChoices();
		this.formatStealingServitudeChoices();
		this.formatChastityChoices();
		
		this.allChoices = "";
		
		this.allChoices += this.autosavingChoices + "\n\n";
		if ( this.exitPassage != "Personal Room" ) { // These options shouldn't be accessible after the start of the game
			this.allChoices += this.difficultyChoices + "\n\n" + this.futaChoices + "\n\n" + this.sexPrefChoices + "\n\n" + this.npcBonusChoices + "\n\n"
		}
		this.allChoices += this.analChoices + "\n\n" + this.painChoices + "\n\n"
						+ this.battleDefeatSexChoices + "\n\n" + this.servitudeRelationshipsChoices + "\n\n"
						+ this.stealingServitudeChoices + "\n\n" + this.chastityChoices + "\n\n"
						+ this.exitButton;
	}
	
	// Exit button
	this.exitPassage = "Disclaimer";
	this.exitButton = "<<l" + "ink [[Save settings and leave|" + this.exitPassage + "]]>><<s" + "cript>>\n"
					+ "cleanAllSettingsChoices();\n"
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

window.cleanAllSettingsChoices = function() {
	State.variables.settings.allChoices = "";
	State.variables.settings.autosavingChoices = "";
	State.variables.settings.difficultyChoices = "";
	State.variables.settings.sexPrefChoices = "";
	State.variables.settings.npcBonusChoices = "";
	State.variables.settings.analChoices = "";
	State.variables.settings.painChoices = "";
	State.variables.settings.battleDefeatSexChoices = "";
	State.variables.settings.servitudeRelationshipsChoices = "";
	State.variables.settings.stealingServitudeChoices = "";
	State.variables.settings.chastityChoices = "";
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
	State.variables.settings.painChoices = '__Pain actions__' + getPainTooltip() + ': ' + colorText("(Harsh content)","firebrick") + '\n';
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
	var npcCandidates = [ "chMir" , "chNash" , "chClaw" , "chVal" , "chAte" ];
	switch(gSettings().npcBonus) {
		case "none":
			for ( var npc of npcCandidates ) {
			}
			break;
		case "hypnosis":
			charactersLearnSceneActions(npcCandidates,["baHypnoticGlance","realHypnoticGlance"]);
			for ( var npc of npcCandidates ) {
				gC(npc).extraSocIntList.push("hypnoticGlance");
			}
			break;
		case "draining":
			charactersLearnSceneActions(npcCandidates,["baDrainingKiss","baEnergyDrainingKiss","energyDrainingKiss"]);
			for ( var npc of npcCandidates ) {
			}
			break;
		case "bondage":
			charactersLearnSceneActions(npcCandidates,["baEtherealChains","etherealChains"]);
			for ( var npc of npcCandidates ) {
			}
			break;
		case "all":
			charactersLearnSceneActions(npcCandidates,["baHypnoticGlance","realHypnoticGlance","baDrainingKiss","baEnergyDrainingKiss","energyDrainingKiss","baEtherealChains","etherealChains"]);
			for ( var npc of npcCandidates ) {
				gC(npc).extraSocIntList.push("hypnoticGlance");
			}
			break;
	}
	switch(gSettings().sexPrefs) {
		case "noChanges":
			break;
		case "usePussy":
			for ( var npc of npcCandidates ) {
				gC(npc).tastes.usePussy.w += 100;
				gC(npc).tastes.useDick.w -= 50;
			}
			break;
		case "useDick":
			for ( var npc of npcCandidates ) {
				gC(npc).tastes.useDick.w += 100;
				gC(npc).tastes.usePussy.w -= 50;
			}
			break;
	}
}

window.getAutosavingTooltip = function() {
	var tText = '<span title="Enabling autosaving will automatically save your game at the last slot when you enter the personal room menu, '
			  + 'at the end of the day. If you\'re having performance issues, it\'s recommended to disable this option.">^^(?)^^</span>';
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
window.getStealingServitudeTooltip = function() {
	var tText = '<span title="Allowing this option will allow the player and NPCs to steal the submissives of other characters, should servitude relationships be allowed.">^^(?)^^</span>';
	return tText;
}
window.getTastesConfigTooltip = function() {
	var tText = '<span title="These options alter the sex scene preferences of your fellow NPC Candidates. If you do not intend them to become futanaris, it is best left unchanged. Cannot be changed later.">^^(?)^^</span>';
	return tText;
}
window.getChastityTooltip = function() {
	var tText = '<span title="This option allows spawning chastity belts and cages, as well as ruined orgasms and the actions provoking them. Disabling this option will not prevent the use of already spawned chastity items.">^^(?)^^</span>';
	return tText;
}

window.getNPCsBonusesTooltip = function() {
	var tText = '<span title="These options will grant extra actions related to specific kinks to the NPC Candidates.">^^(?)^^</span>';
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

setup.creditsGoddessEnthusiast = [ "LessIDableName ","Sordax","Fox McQwerty","ben ","Peter ","Troy Armstrong","Colton Foote","Barnabas Collins","Vadrin ","Jake Ross","Nevyn ","Tyler Kreutzer","Pandavenger ","Chris40 ","He Who Remembers All","Bluebomber ","Brian Keefe","ElCrazy1 ","Hairdevill","Grissie","Jacob LaRiviere","ShardOfCard ","ElrondHubbard ","Thomas Colasanto","Nat Byham","Evgeniy ","Cody Shawver","Brad11 ","tiffany mawhorter","Trickster ","Anonimus Mito","Redace","Alex Srisaard","วํฒนะ มานะภักดี","Oliver_Ritchie ","Ermin Pivac","Alex2011","Scott","anactualgoat ","TheShwig ","Jou Chen","Michael ","Mateusz Karliczek","Robert Crawford","MrTheDarkRed ","Black Rose Valerie","Kandschur ","Andrew Dupuis","mainman879 ","Chris Shaw","Christopher Hopkins","Kevin Andrews","DankMeme ","Anburaru ","Meserym ","Quinzell Antrom","Pandavenger","Logan Villa","Norann","Pingo ","Burckle","Mig Dig","Jan Hynek","Franko Bogdan","Alex Gaskins","Torrin ","Andrew Elvin","ArkSilver ","White Pebble","Gamenerd3 ","Yukari ","Grimaga ","Felkesste","Marcus Lu","Alysha Malone","Dage ","ArtificerZeltara","J AndMck","Snazy","Vkad 64","Dragon","Roze14 ","C Fra","Tyler Trounce","Michael Dennis Eagles","Manraj Dhanda","FirefoxV2 ","Chris","Boopley Boop","Grandius Grimm","SlamJammer ","Taziah Robinson","Mekhet ","Grumpy ","cbcpdxkq3z","Markus Boos","Remi BB","Jack Fereday","Patrick McCabe","Tyler Kelly","mahdeennave ","Kou Mao","Gavin Winkler","jason cole","Jojolity ","Takos ","Shawn ","AD","Richard Dolder","ZXapol ","Kasen081 ","Nathan Reina","Name ","Lena Elmer","Jake Davis","Aleister Crowley","Alexander Presley","Void-Searcher .","Mikkel Christoffer Kraesing Neergaard","MajorCoincoin ","Blake ","Tinwen ","Michael Rydel","Josh white" ];
setup.creditsPassionTemplePreacher = [ "Ryuko ","Barada Azana","aattss ","Samurai_Jack141 ","Name2146 ","Snakes! ","Irasur","Alex ","Nathaniel Grams","Cory Elliott","SenoirKain ","Andreas","Gura ","ThatsAllFolks ","Joshua Boguth","Joshua Smith","Ross Fountain","Thomas ","Emily S.","Hunter Glad","Devin White","Anon ","hiorka","dark_dragon ","A giant crab","Kai Scheele","pyrite","Georgii Brisuela","Stephen","Stephen Pieper","Weathnarh ","Zergling ","Rodimus Darnath","kirito shiba","Unsung ","NoWorries623 ","Aplysina Cyanobacterium","Terminal_ERROR","Grant Manthey","Matt Miller","Dan Schrader","Slywolf357 ","Vysirez ","Benjamin Grieder","Michael Avellino","Satile ","Kestrel","Paladin_Wiggles_II ","CancerMage ","NightStrike01 ","ZVReaper16","Mcquaqua ","billyboy","Eric Wood","Elisia Seda","Sebastian Baran","Jabbtoth ","Snaked ","MaxTan ","Cyril guillas","Bartolomeo ","Pikarukawa","This Guy","Nemesison ","Sunny Reehal","Joshua Todd Shaffer","TheLastBang ","c0nevs ","Rj Sawyer","Максим Конорев","Jacob Wrightsman","Desseus ","Lexi Knight","CriticalExistenceFailure ","floccinaucinihilipilification ","Friendly Neighbor","이재승 ","NovaDragn ","Chris Douglas","Bob Fruman","StrayWolf ","Skyrim mod lvr","William K Bennett","Spencer Bradford","Phenix995 ","Foolwatchout ","Lunaraia ","Guardx","Curtis1122","Kyle ","Kuma III","Weegee","Wirglays ","DeathbyKimchi ","Yi ","Reddy Allen","Bohrne","Honey Crab","12inpen","Be","k0lt ","Jim S","Joe Barrass","This guy","LunarGuardsman ","CorprealFale","Willayfiddle ","Renpon ","warshotcv ","Something ","Jens Bertrams","Hartmanns Youkai","Aeonian Argos","Joe X","FalconNrOne ","'---- ","Randall H","Anomally","acpmage","Christian Adalbert","Dr_Russian ","Aspios ","Gabriel Grey","Chris ","CrysHistory ","Jean Otus","SetsunaYuki","muckenmaker ","Rockstad ","Nathan Taylor","noah ","Konomori ","Rex J Jensen","Red Duke","Shirogitsune","Wazzugazzu","Wesley A. Collins","Hillfillk","Parzival","Tharm","Perseus_paradox ","Austin Anderson","BruceM ","Peter Managarm","Inquisitor Gaia","Elowin ","matthew nemec","Ultrasexy ","YJs ","Myles ","Mayu The Kitsune","Cotton59 ","Bunne","magenta_bang ","Shadowed Song","Isan-San ","NRFB ","Sam Williams","der","richardTrickle ","Rune ","Hendrijk Watson" ];
setup.creditsPassionTempleClergy = [ "Longwave","Carlos Sierra" ];
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

