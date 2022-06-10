// CONFIG //

Config.saves.autoload = false;
Config.saves.autosave = false;
Config.loadDelay = 50;
Config.history.maxStates = 1;

// State.variables.StVarsList = []; // Ex.: isStVarOn("knHnNt") // removeFromStVarsList("dldPly"); addToStVarsList("diAcWn");
// monActUs
// go0
// chTts
// ******************** SPOILERS ******************** //
	// First adventure
		// Map scenes
/* // *** alwSct -> Allowed into sanctum
// *** blmClaw -> Blackmailed by Claw - Map Story Event triggered
// *** dldCrf -> Crafting dildo
// *** dldPly -> Dildo Play
// *** mphInit -> Morph Init
// *** mphFsTf -> Morph First Transformation
// *** mphFnTf -> Morph Finished Transformation
// *** bdPtSc -> Body Painting Scene									// Kept for now, may be used in a later event
// *** drMlCon -> Drishtya and Melesh conversation
// *** drMlHyp -> Drishtya told about Nersmias' hypnosis				// Kept for now, may be used during the adventure or later
// *** drMlVal -> Melesh told the Player about Valtan's location
// *** vlIlIn -> Valtan in Illumination Pond, Initialization
// *** ssBth -> Shapeshifter Birth */
/* // *** vlNoCv -> Valtan no conversation ( In Gleaming Caverns ) 
// *** vlSfsh -> Valtan's Selfishness
// *** vlTlk1 , vlTlk2 , vlTlk3 -> Valtan's conversation triggers
// *** vlHyp -> Hypnotized Valtan during Gleaming Caverns adventure		// Kept for now, may be used in a later event
// * vlAtn -> Valtan atone for Sins
// * vlDvtd -> Valtan devoted
// * vlPlsr -> Valtan focused on pleasure
// * vlFgSl -> Valtan forgetting Sillan
// * vlRtSl -> Valtan won't forget Sillan */
// *** trImpr -> Trial Improvisation init event
// * diVcAt -> Drama Improvisation, Vicious Attacks (Attacked Ate viciously)
// * diHeAt -> Drama Improvisation, Helped Ate (Helped Ate as accusation)
// * diSwAt -> Drama improvisation, saw through Ate's eyes
// * diAcWn , diAcLs , diAcFf , diDfWn , diDfLs , -> Drama Improvisation Accusation/Defense Win/Loss/Forfeit
// * knHnNt , brMnAr -> Knows about Hunting Nets, Brought Monsters to Artume
// * GcVcCv -> Gleaming Caverns, Voices From the Caverns
// * GcSrPt -> Gleaming Caverns, Search Party
  // Special experiences
// VarDom -> Varyonte's domination

	// Tf Settings constants and definitions
const tfSetTarget = {
	removeDick: 0,
	removePussy: 1,
	addDick: 2,
	addPussy: 3,
	dickOnly: 4,
	pussyOnly: 5,
	hermsLoseDicks: 6,
	femalesLoseFuta: 7,
	everyoneGetsAllGenitals: 8,
	copyOwnGenitals: 9,
	oppositeOwnGenitals: 10,
	originalTargetGenitals: 11,
	opposingTargetGenitals: 12,
	random: 13
}
const tfSetSelf = {
	gainPussy: 0,
	gainDick: 1,
	losePussy: 2,
	loseDick: 3,
	getOriginalGenitals: 4,
	femalesGainDick: 5,
	malesGainPussy: 6,
	allGainAllGenitals: 7,
	random: 8
}
const tfSetExtra = {
	noTransformations: 0,
	temporary: 1,
	permanent: 2,
	random: 3
}
setup.tfTargetSettingsNames = [ "Remove dick", "Remove pussy", "Add dick", "Add pussy", "Dick only", "Pussy only", // 0-5
	"Herms lose dicks", "Futas lose dicks", "Everyone gets all genitals", "Copy actor genitals", "Opposite actor genitals", // 6 - 10
	"Original target genitals", "Opposing target genitals", "Random"]; // 11 -13
setup.tfSelfSettingsNames = [ "Gain pussy", "Gain dick", "Lose pussy", "Lose dick", "Original genitals", // 0 - 4
	"Females gain dick", "Males gain pussy", "Everyone gains all genitals", "Random"]; // 5-8
setup.tfExtraSettingsNames = [ "No transformations", "Temporary", "Permanent", "Random"]; // 0-3

////////// GAME SETTINGS CLASS //////////

setup.versionName = "Unholy Arts v0.3.11";

setup.infamySecondThreshold = 1.2;
setup.infamyThirdThreshold = 1.4;

// Default settings, useful for retro save compatibility
setup.defaultMfscaOption = "enable";

window.Settings = function() { 
	this.debugFunctions = true;
	
	this.stdSxScDur = 30; // Standard Sex Scene Duration
	this.infamyLimit = 25;
	this.relationshipsDuration = 3;
	this.equipmentDuration = 5;
	this.followingAllowed = false;
	this.relationshipTypesAllowed = false;
	this.challengingAllowed = false;
	this.assaultingAllowed = false;
	this.talkingAllowed = true;

	this.autosaving = "enable"; // "enable" / "disable"

	this.difficulty = "normal"; // "easy" / "normal" / "hard"
	
	this.futa = "enableAll"; // "enableAll" / "playerFuta" / "futaPartners" / "disableMainStory" / "disableAll"
	
	this.sexPrefs = "noChanges"; // "noChanges" / "usePussy" / "useDick"
	
	this.npcBonus = "none"; // "none" / "bondage" / "hypnosis" / "draining" / "all"
	
	this.lewdMales = "enable"; // "enable" / "disable"
	this.lewdMonsters = "enable"; // "enable" / "disable"
	
	this.anal = "enable"; // "enable" / "disable"
	
	this.pain = "enable"; // "enable" / "disable"
	
	this.mfsca = "enable"; // "enable" / "disable"
	
	this.battleDefeatSex = "enable"; // "enable" / "disable"
	
	this.servitudeRelationships = "enable"; // "enable" / "disable"
	
	this.stealingServitudeAllowed = "disable"; // "enable" / "disable"
	
	this.chastity = "enable"; // "enable" / "disable"
	
	this.tfGeneral = tfSetExtra.random;
	this.tfSelf = tfSetSelf.random;
	this.tfTarget = tfSetTarget.random;
	
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
	
	// Exit button
	Settings.prototype.exitPassage = "Disclaimer";
	Settings.prototype.exitButton = "<<l" + "ink [[Save settings and leave|" + this.exitPassage + "]]>><<s" + "cript>>\n"
					+ "cleanAllSettingsChoices();\n"
					+ "<</s" + "cript>><</l" + "ink>>";
};

// Methods
Settings.prototype.formatDifficultyChoices = function() {
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
	Settings.prototype.formatFutaChoices = function() {
		this.futaChoices = '__Futanari__' + getFutanariTooltip() + ':\n';
		this.futaChoices += '<label><<radiobutton "$settings.futa" "enableAll"';
		if ( this.futa == 'enableAll' ) { this.futaChoices += " checked"; }
		this.futaChoices += '>> Enable all content</label> ' + colorText("(Canon)","green") + '\n'
						  + '<label><<radiobutton "$settings.futa" "playerFuta"';
		if ( this.futa == 'playerFuta' ) { this.futaChoices += " checked"; }
		this.futaChoices += '>> Only futa player, no futa peers</label>\n'
						  + '<label><<radiobutton "$settings.futa" "futaPartners"';
		if ( this.futa == 'futaPartners' ) { this.futaChoices += " checked"; }
		this.futaChoices += '>> Futa peers, but no futa player</label>\n'
						  + '<label><<radiobutton "$settings.futa" "disableMainStory"';
		if ( this.futa == 'disableMainStory' ) { this.futaChoices += " checked"; }
		this.futaChoices += '>> Disable main story content</label>\n'
						  + '<label><<radiobutton "$settings.futa" "disableAll"';
		if ( this.futa == 'disableAll' ) { this.futaChoices += " checked"; }
		this.futaChoices += '>> Disable all content</label>';		
	}
	Settings.prototype.formatSexPrefChoices = function() { // noChanges usePussy useDick
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
	
	Settings.prototype.formatNpcBonusesChoices = function() { // "none" / "bondage" / "hypnosis" / "draining" / "all"
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
	
	Settings.prototype.formatAnalChoices = function() {
		this.analChoices = '__Anal__' + getAnalTooltip() + ':\n';
		this.analChoices += '<label><<radiobutton "$settings.anal" "enable"';
		if ( this.anal == 'enable' ) { this.analChoices += " checked"; }
		this.analChoices += '>> Enable</label>\n'
						  + '<label><<radiobutton "$settings.anal" "disable"';
		if ( this.anal == 'disable' ) { this.analChoices += " checked"; }
		this.analChoices += '>> Disable</label>';	
	}
	
	Settings.prototype.formatMFSCAchoices = function() {
		if ( this.mfsca == undefined ) {
			this.mfsca = setup.defaultMfscaOption;
		}
		var MFSCAchoices = "__Multiple full sex continued actions__" + getMFSCAtooltip() + ":\n"
						 + '<label><<radiobutton "$settings.mfsca" "enable"';
					if ( this.mfsca == 'enable' ) { MFSCAchoices += " checked"; }
		MFSCAchoices += '>> Enable</label>\n'
			          + '<label><<radiobutton "$settings.mfsca" "disable"';
					if ( this.mfsca == 'disable' ) { MFSCAchoices += " checked"; }
		MFSCAchoices += '>> Disable</label>';	
		
		return MFSCAchoices;
	}
	
	Settings.prototype.formatBattleDefeatSexChoices = function() {
		this.battleDefeatSexChoices = '__Sex as result of battles__' + getSexFromBattlesTooltip() + ':\n';
		this.battleDefeatSexChoices += '<label><<radiobutton "$settings.battleDefeatSex" "enable"';
		if ( this.battleDefeatSex == 'enable' ) { this.battleDefeatSexChoices += " checked"; }
		this.battleDefeatSexChoices += '>> Enable</label>\n'
						  + '<label><<radiobutton "$settings.battleDefeatSex" "disable"';
		if ( this.battleDefeatSex == 'disable' ) { this.battleDefeatSexChoices += " checked"; }
		this.battleDefeatSexChoices += '>> Disable</label>';	
	}
	Settings.prototype.formatServitudeRelationshipsChoices = function() {
		this.servitudeRelationshipsChoices = '__Servitude relationships__' + getServitudeRelationshipsTooltip() + ': ' + colorText("(Harsh content)","firebrick") + '\n';
		this.servitudeRelationshipsChoices += '<label><<radiobutton "$settings.servitudeRelationships" "enable"';
		if ( this.servitudeRelationships == 'enable' ) { this.servitudeRelationshipsChoices += " checked"; }
		this.servitudeRelationshipsChoices += '>> Enable</label>\n'
						  + '<label><<radiobutton "$settings.servitudeRelationships" "disable"';
		if ( this.servitudeRelationships == 'disable' ) { this.servitudeRelationshipsChoices += " checked"; }
		this.servitudeRelationshipsChoices += '>> Disable</label>';	
	}
	Settings.prototype.formatStealingServitudeChoices = function() {
		this.stealingServitudeChoices = '__Stealing submissives__' + getStealingServitudeTooltip() + ': ' + colorText("(Harsh content)","firebrick") + '\n';
		this.stealingServitudeChoices += '<label><<radiobutton "$settings.stealingServitudeAllowed" "enable"';
		if ( this.stealingServitudeAllowed == 'enable' ) { this.stealingServitudeChoices += " checked"; }
		this.stealingServitudeChoices += '>> Enable</label>\n'
						  + '<label><<radiobutton "$settings.stealingServitudeAllowed" "disable"';
		if ( this.stealingServitudeAllowed == 'disable' ) { this.stealingServitudeChoices += " checked"; }
		this.stealingServitudeChoices += '>> Disable</label>';	
	}
	Settings.prototype.formatChastityChoices = function() {
		this.chastityChoices = '__Chastity and ruined orgasms__' + getChastityTooltip() + ': ' + colorText("(Harsh content)","firebrick") + '\n';
		this.chastityChoices += '<label><<radiobutton "$settings.chastity" "enable"';
		if ( this.chastity == 'enable' ) { this.chastityChoices += " checked"; }
		this.chastityChoices += '>> Enable</label>\n'
						  + '<label><<radiobutton "$settings.chastity" "disable"';
		if ( this.chastity == 'disable' ) { this.chastityChoices += " checked"; }
		this.chastityChoices += '>> Disable</label>';	
	}

Settings.prototype.formatSexSceneDurationChoices = function() {
	var chText = "__Generic Sex Scene Duration__ (Standard=30):\n";
	chText += '<<textbox ' + '"$settings.stdSxScDur" "' + this.stdSxScDur + '">>\n\n'
	
	return chText;
}

Settings.prototype.formatMaleCharsChoices = function() {
	var chText = "__Male Characters Allowed to be Lewd__"
			   + ' <span title="Disabling this option will prevent all characters whose personal pronoun is <he> from participating in lewd acts, including: joining sex scenes, using or receiving sex attacks during battles, using or receiving flirty or arousing actions in conversations. This option will not affect a player character whose gender has been changed to male.">^^(?)^^</span>' + ":\n";
	chText += '<label><<radiobutton "$settings.lewdMales" "enable"';
	if ( this.lewdMales == "enable" ) { chText += " checked"; }
	chText += '>> Enable</label>\n';
	chText += '<label><<radiobutton "$settings.lewdMales" "disable"';
	if ( this.lewdMales == "disable" ) { chText += " checked"; }
	chText += '>> Disable</label>';
	return chText;
}
Settings.prototype.formatMonstersChoices = function() {
	var chText = "__Monsters Allowed to use Lewd Actions__"
			   + ' <span title="Disabling this option will prevent all characters whose race is monster from using lewd actions.">^^(?)^^</span>' + ":\n";
	chText += '<label><<radiobutton "$settings.lewdMonsters" "enable"';
	if ( this.lewdMonsters == "enable" ) { chText += " checked"; }
	chText += '>> Enable</label>\n';
	chText += '<label><<radiobutton "$settings.lewdMonsters" "disable"';
	if ( this.lewdMonsters == "disable" ) { chText += " checked"; }
	chText += '>> Disable</label>';
	return chText;
}

// this.tfGeneral = tfSetExtra.temporary;
	//this.tfSelf = tfSetSelf.random;
	//this.tfTarget = tfSetTarget.random;

Settings.prototype.formatTfChoices = function() {
	var chText = "  __Transformation Settings__" + hoverText("^^(?)^^","These options refer to NPC behavior when taking decision related to dynamic transformations, once they are unlocked at the end of the first month.") + "\n"
			   + "__General__" + hoverText("^^(?)^^","General transformation settings. Some transformation will always be temporary, even if permanent transformations are enabled.") + ":\n";
	var it = 0;
	for ( var tfI of setup.tfExtraSettingsNames ) {
		chText += '<label><<radiobutton "$settings.tfGeneral" "' + it + '"'; // tfSetExtra[it]
		if ( parseInt(this.tfGeneral) == parseInt(it) ) { chText += " checked"; } // tfSetExtra[it]
		chText += '>> ' + tfI + '</label>\n';
		it++;
	}
	chText += "__Transformations on others__" + hoverText("^^(?)^^","Allowed NPC transformations on others.") + ":\n";
	it = 0;
	for ( var tfI of setup.tfTargetSettingsNames ) {
		chText += '<label><<radiobutton "$settings.tfTarget" "' + it + '"';
		if ( parseInt(this.tfTarget) == parseInt(it) ) { chText += " checked"; }
		chText += '>> ' + tfI + '</label>\n';
		it++;
	}
	chText += "__Transformations on self__" + hoverText("^^(?)^^","Allowed NPC transformations on themselves.") + ":\n";
	it = 0;
	for ( var tfI of setup.tfSelfSettingsNames ) {
		chText += '<label><<radiobutton "$settings.tfSelf" "' + it + '"';
		if ( parseInt(this.tfSelf) == parseInt(it) ) { chText += " checked"; }
		chText += '>> ' + tfI + '</label>\n';
		it++;
	}
	return chText;
}

	Settings.prototype.formatAllChoices = function() {
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
		this.allChoices += this.formatSexSceneDurationChoices() + "\n" + this.formatMaleCharsChoices() + "\n" + this.formatMonstersChoices() + "\n\n"
						+ this.analChoices + "\n\n" + this.painChoices + "\n\n" + this.formatMFSCAchoices() + "\n\n"
						+ this.battleDefeatSexChoices + "\n\n" + this.servitudeRelationshipsChoices + "\n\n"
						+ this.stealingServitudeChoices + "\n\n" + this.chastityChoices + "\n\n" + this.formatTfChoices() + "\n\n"
						+ this.exitButton;
	}
					
	Settings.prototype.getButtonExit = function() {
		var bText = "<<l" + "ink [[Save settings and leave|" + this.exitPassage + "]]>><<s" + "cript>>"
					+ "cleanAllSettingsChoices();\n"
		bText	 += "<</s" + "cript>><</l" + "ink>>";
		return bText;
	}
	Settings.prototype.setExitPassage = function(exitPassage) {
		this.exitPassage = exitPassage;
		this.exitButton = this.getButtonExit(this.exitPassage);
	}

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
	
	State.variables.settings.stdSxScDur = parseInt(State.variables.settings.stdSxScDur,10);
	if ( State.variables.settings.stdSxScDur == undefined || isNaN(State.variables.settings.stdSxScDur) ) {
		State.variables.settings.stdSxScDur = 30;
	} else if ( State.variables.settings.stdSxScDur < 1 ) {
		State.variables.settings.stdSxScDur = 1;
	}
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
	var tText = '<span title="Futanari are women with both male and female genitalia.\n'
			  + 'The first three options will provoke futanari transformations on main characters near the start of the game.'
			  + 'Disabling main story content will prevent futanari protagonist transformations, but enable all other futanari content.">^^(?)^^</span>';
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
window.getMFSCAtooltip = function() {
	var tText = '<span title="This option enables or disables simultaneous continued full sex actions between any two characters.\n'
			  + 'Examples: A character X performing anal penetration on character Y while character Y performs scissoring with character Z will always be possible (as long as anal actions are enabled), but in order for character X to do both anal penetration and scissoring with character Y, this option requires to be enabled, since both are considered full sex continued actions. This option will allow anatomically impossible situations, such as two characters penetrating each other at the same time.">^^(?)^^</span>';
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
	else if ( getCharsRoom(target) != undefined ) {
		if ( getCharsRoom(target).combatAllowed == false ) { // Combat is allowed in target's current room
			flagPossible = false;
		}
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
window.assaultPreConditions = function(actor,target) {
	var flagPossible = true;
	var relType = gRelTypeAb(actor,target);
	if ( relType ) {
		if ( relType.disallowedAssault ) {
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
	else if ( getCharsRoom(target) != undefined ) {
		if ( getCharsRoom(target).combatAllowed == false ) { // Combat is allowed in target's current room
			flagPossible = false;
		}
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
window.challengePreConditions = function(actor,target) {
	var flagPossible = true;
	var relType = gRelTypeAb(actor,target);
	if ( relType ) {
		if ( relType.disallowedChallenge ) {
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
	} else if ( liberationChallengePreConditions(actor,target) == false ) {
		flagPossible = false;
	}
	else if ( getCharsRoom(target).combatAllowed == false ) { // Combat is allowed in target's current room
		flagPossible = false;
	}
	else if ( doesCharHaveDayTag(actor,"liberationAttempt") ) {
		flagPossible = false;
	}
	
	return flagPossible;
}
window.liberationChallengePreConditions = function(actor,target) {
	var flagPossible = true;
	if ( gC(actor).domChar != target ) {
		flagPossible = false;
	} else if ( gRelTypeAb(actor,target).liberationChallenge == false ) {
		flagPossible = false;
	}
	return flagPossible;
}

window.isLewdingPossible = function(actor,target) {
	var flag = true;
	if ( gSettings().lewdMales == "disable" ) {
		if ( actor != "chPlayerCharacter" ) {
			if ( gC(actor).perPr == "he" ) {
				flag = false;
			}
		}
		if ( flag ) {
			if ( target == undefined ) {
				flag = false;
			} else if ( target != "chPlayerCharacter" ) {
				if ( gC(target).perPr == "he" ) {
					flag = false;
				}
			}
		}
	}
	if ( gSettings().lewdMonsters == "disable" ) {
		if ( gC(actor).race == "monster" ) {
			flag = false;
		}
	}
	return flag;
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

const storyState = {
	firstLoop: 0,
	firstAdventure: 1,
	secondLoop: 2
}

State.variables.storyState = storyState.firstLoop;

window.getCurrentStoryState = function() {
	var storyState = 0;
	if ( State.variables.storyState != undefined ) {
		storyState = State.variables.storyState;
	}
	return storyState;
}
window.isCurrentStoryStateInMainLoop = function() {
	var result = true;
	if ( State.variables.storyState == storyState.firstAdventure ) {
		result = false;
	}
	return result;
}

//////////////

setup.creditsGoddessEnthusiast = [ "LessIDableName ","Sordax","ben ","Peter ","Troy Armstrong","Colton Foote","Barnabas Collins","Vadrin ","Jake Ross","Nevyn ","Tyler Kreutzer","Pandavenger ","Chris40 ","Bluebomber ","Brian Keefe","ElCrazy1 ","Grissie","ShardOfCard ","ElrondHubbard ","Thomas Colasanto","Nat Byham","Evgeniy ","Cody Shawver","Brad11 ","tiffany mawhorter","Trickster ","Redace","Alex Srisaard","วํฒนะ มานะภักดี","Oliver_Ritchie ","Ermin Pivac","Alex2011","Scott","anactualgoat ","TheShwig ","Jou Chen","Michael ","Mateusz Karliczek","Robert Crawford","Black Rose Valerie","Kandschur ","Andrew Dupuis","mainman879 ","Chris Shaw","Christopher Hopkins","Kevin Andrews","DankMeme ","Meserym ","Quinzell Antrom","Pandavenger","Logan Villa","Norann","Pingo ","Jan Hynek","Franko Bogdan","Alex Gaskins","Torrin ","Andrew Elvin","ArkSilver ","White Pebble","Yukari ","Grimaga ","Marcus Lu","Alysha Malone","Dage ","ArtificerZeltara","J AndMck","Snazy","Vkad 64","Dragon","Roze14 ","C Fra","Tyler Trounce","Michael Dennis Eagles","Manraj Dhanda","FirefoxV2 ","Boopley Boop","Grandius Grimm","Taziah Robinson","Mekhet ","cbcpdxkq3z","Markus Boos","Remi BB","Jack Fereday","Patrick McCabe","Tyler Kelly","mahdeennave ","Kou Mao","Gavin Winkler","jason cole","Jojolity ","Takos ","Shawn ","AD","Richard Dolder","ZXapol ","Kasen081 ","Nathan Reina","Name ","Lena Elmer","Jake Davis","Aleister Crowley","Alexander Presley","Void-Searcher .","Mikkel Christoffer Kraesing Neergaard","Blake ","Tinwen ","Michael Rydel","Josh white","Desmond Finney","Nemo-Iratus ","Jack Jamieson","yospeakr","Tarcc ","Lily Dawn","Zangi ","Richard Whitcher","ErDragon","Duchairn ","DarkyCrusad","aleante ","pebbles ","Keira Nguyen","Omoi T Wilkes","Ryan Lines","Tyler","TJ Gulledge","lvence","Zargothrax ","DANG NGUYEN MINH LUAN","PyriteP ","Oleg Kuzen","doofy goof","uwuwuwu ","Davos Sunshine","Aidan Myers","James Sampson","P-tron ","Ghostty","Ron Volpe","Coleman Stephan Johnson","Daniel Voronin","J","Oskar Hjorth","Brandon Livingston","NooBie ","shawn plumridge","sera","Micah Watkins","Jonathan Sane","ArsonisticMadCat ","Normal Accidents","TheApatheticAsshat","Drayton ","SmolFish ","yoon sung ju","D B","proninja22nd .","Cyril Remo Reyes","Alakdar ","Oleg Moloh","Harutenrai","Alkhiro Saber","Terrell Simms","Rory Baker","Eli Shmidt","Nick ","Benjamin Delgren","Jacob Saganek","Alice Hiess","Iamus The Fox","dias","Sven Kalus","Kilborn ","Halcy Grand","Mahin Ahmed","Classyjarl","昀之 贾","A.K.A wut","Loxica","Andres ","Eduardo ","Madison Hickman","Bobby White","Shane Daley","Vienna Prudenciano","Souleater","Colin Owler","MyHobos ","Bo Botkin","Jack ","Hatz","Robert England","Cody Powers","Ben Jones","Words Words","Samantha ","Miyako Kobayashi","Hooman","Brett Evans","Canadian321 ","cory kinsley","Jason ","MistressCynthia ","Brad Davis","Anon1998","Bob ","robbert roth","joe","Michal Reimer","Luke Ballard","Sagaptor ","Scott Christensen","Fauxfox ","anactualgoat","Bob Johnson","AdmiralBreaker","cynthia","SHSL Gamer","Realms×Myths","Feltenix","Pink Milk","Zachary","Fiona Quinn","Joseph Beals","Vidar ","Ryan Allday","Nora Knox","Wildhawk ","A ","jack slate","Aaron Gahr","lolknight ","ColorfulGreyGoo","buddhapest","Vadrin","jason","zachary gafken","Benyrx ","Anton Åkesson","Chessia58","Jayson Hudson","devin wagner","Kevin Banda","a сertain hypocrite","Destroyerofsin35 Gaming","Someothermon","anonymous kid","Liches-Favour ","Pole Star","Anita Juckum","shadow master","Tyler Coffey","Felipe","Stephen Clifford","Bob Dole","Fang","Lior","Hayden John Williams","ragond","billy","Devon Edwards","Twofeather Quanto","Omnimagnus ","ZombieSniper246 ","Callan Weir","gff af","Kuroi Mato","SpilledAntifreeze","William Shepherd","nosyk drofecnul","Clancy Gilroy","riff smitty","BloGer _VID_","huge legend","kadir ","Justin Kays","VySaika ","Jack Whitehouse","Melanie","Dark Solitude","BannedHeresy ","Matthew Schultz","Kin_Teb","Oberon","Leo ","annonomu ","Steven Adams","Ana Silva","Dani James","C Tsang","Ignissik","Cole Delaney","David Alvå","Dalton Sky","Sejlen","savi","Jade Le","Lucas Pauling","Highlord","MattTheFree ","Triforcealt255 ","Selignite Verine","Benjamin L. Hood","Matthew Baskerville","Maximus ","Nathanael Crockett","Danealus ","SuperSuperMarcel","DarkPsionic ","Colin Yu","BasNek ","Nikolas Podrasky","Marmar ","will ","Bloodhound45","Booga","jf","jedidia bullock","NightMarie","ShadowsterZ","Nex ","peplum02348","EV ","Kharma Bearer","Derps McGee","David Poulson","Phant0mCobra ","Chong Xena","Devereaux Mills","Angelo ","Kaebora ","Parker Heustess","LazyDragon ","darktalon","Zavgonymous","Alivda","EgoDraconis","Zach","Gigi Koch","devin young","Silver Virage","Miss Tea","Will Smith","MammothDionysus","Simon West","Raven ","Alaco ","Halcyon722","Rasmus Vilsgaard","Christoph Hundt","Dennis ","Salt Mage","Moobere","ManofGloves","Rustlegion ","Nath Dunhoe","Croc says Rawr","Shelby Taylor","Jack Brown","Nia","Jeffrey McKinney","jason ","Adelzon Mello","Eric ","Alec Guillaume","Ronin","Malcolm Kealey","CrystalKore","Adamski234","Adrian Chang","Death by fire Lol life","Opossum Actual","tay","Big Meme","Brozita ","Cooper Wilson","Gian Paulo Villanueva","Mint","Degen ","Quillan","EphemeralDreamer ","Madbuddog ","Oblivions_Edge ","npen ","Garrett","Skye Sunnix","Chocapike","Thomas","scott ","Clifford Beck","Paul Rogers","Blacknight655 ","Neil","Polaris Maxim","SM343 ","Stas ","JabbaKappa ","Jack Slack","kenyoru355 ","Otter Doctor","Ken Dang","Tanman ","pastasocks ","Alex McGregor","Div_0","CraigorySmithThe3rd","TheRedDeath546","Set","Valkyrie Oblige","Raj D","I am CoNFusIon","Laguna Piper","Dustin Sanders","KnifeEar","OpabiYes ","Elvenoob ","Aaron Phillips","Kikyoku ","V","Simon Millsom","Tsitsu","John Dixson","Frostedflakes _uwu","NovelDefender","eweny2599 ","camaramdingdongthe3rd","Thomas Self","Bob Jones","Paige Lenore","Alex Sullivan","Corey Tesseneer","Asinann","James A Stallworth","Corwin Le Beuze","Skye Okami","Mason Thomas","Gman ","Raag","Srd1600","Michael Smith","MY CAT GOT DRUGGED WITH BEANS     and narcotics","Hero 4 Rent","Appriser ","chaos ","Zadkiel Averon","Seth Jodrey","matt ","Ryan Wu","alf vender","Brandon Sheldon","590joe","Spider32","Isak Lease","Miniscule Max","Ryalai ","sixpackabbies","Alexander Kandiah","Atokani ","TheCorporateSnail ","Ro Tess","Starayo ","Kyle Arellano","Well This is Awkward","Speedy","Sneakyperson" ];

setup.creditsPassionTemplePreacher = [ "Ryuko ","Fox McQwerty","Barada Azana","aattss ","Samurai_Jack141 ","Name2146 ","Snakes! ","Irasur","Alex ","Nathaniel Grams","Cory Elliott","SenoirKain ","Andreas","Gura ","ThatsAllFolks ","Joshua Boguth","He Who Remembers All","Ross Fountain","Thomas ","Emily S.","Hunter Glad","Devin White","Anon ","hiorka","dark_dragon ","Hairdevill","A giant crab","Kai Scheele","Jacob LaRiviere","pyrite","Georgii Brisuela","Anonimus Mito","Stephen","Stephen Pieper","Weathnarh ","Zergling ","Rodimus Darnath","kirito shiba","Unsung ","NoWorries623 ","Aplysina Cyanobacterium","Terminal_ERROR","Grant Manthey","Matt Miller","Dan Schrader","Slywolf357 ","Vysirez ","Benjamin Grieder","Michael Avellino","Satile ","Kestrel","Paladin_Wiggles_II ","CancerMage ","NightStrike01 ","ZVReaper16","Mcquaqua ","billyboy","Eric Wood","Elisia Seda","MrTheDarkRed ","Sebastian Baran","Jabbtoth ","Snaked ","MaxTan ","Cyril guillas","Bartolomeo ","Pikarukawa","Anburaru ","This Guy","Nemesison ","Sunny Reehal","Joshua Todd Shaffer","TheLastBang ","Burckle","c0nevs ","Rj Sawyer","Максим Конорев","Mig Dig","Jacob Wrightsman","Desseus ","Lexi Knight","CriticalExistenceFailure ","floccinaucinihilipilification ","Friendly Neighbor","이재승 ","NovaDragn ","Chris Douglas","Bob Fruman","Gamenerd3 ","StrayWolf ","Skyrim mod lvr","Felkesste","William K Bennett","Spencer Bradford","Phenix995 ","Foolwatchout ","Lunaraia ","Guardx","Curtis1122","Kyle ","Kuma III","Weegee","Wirglays ","DeathbyKimchi ","Yi ","Reddy Allen","Bohrne","Honey Crab","12inpen","Be","k0lt ","Jim S","Joe Barrass","This guy","LunarGuardsman ","CorprealFale","Willayfiddle ","Renpon ","warshotcv ","Something ","Jens Bertrams","Hartmanns Youkai","Aeonian Argos","Chris","Joe X","FalconNrOne ","'---- ","Randall H","Anomally","SlamJammer ","acpmage","Christian Adalbert","Dr_Russian ","Aspios ","Grumpy ","Gabriel Grey","Chris ","CrysHistory ","Jean Otus","SetsunaYuki","muckenmaker ","Rockstad ","Nathan Taylor","noah ","Konomori ","Rex J Jensen","Red Duke","Shirogitsune","Wazzugazzu","Wesley A. Collins","Hillfillk","Parzival","Tharm","Perseus_paradox ","Austin Anderson","BruceM ","Peter Managarm","Inquisitor Gaia","Elowin ","matthew nemec","Ultrasexy ","YJs ","MajorCoincoin ","Myles ","Mayu The Kitsune","Cotton59 ","Bunne","magenta_bang ","Shadowed Song","Isan-San ","NRFB ","Sam Williams","der","richardTrickle ","Rune ","Hendrijk Watson","Zanaam","Niklas ","Mikhail Petrovic","Qwazpoi","Pink Wolf","AxiosMIles ","Jacob Perry","BlackDickens ","L","swaginator ","Izanagi15 ","OmcMcAlp ","Layne Landis","DivingRocket","Beebo","Robin ","Kevin Ball","John","Windarian ","Mithrandir ","Silcerius","Rene Bien","segev hype","Lucy Ventura","Bryan Shepherd","Tom Hoffs","lolwutt","Anders Bergström","David Townsend","Gandohar ","TreeSquared ","Cheezzyninja ","MJN ","David S Abraham","urdnot123 ","Pedro Garza","brandon stenlake","Dr_Fizzle ","Martin Santiago","drew hal","Maudika ","Crette ","Thunderstruck025","John Doe","jacques ","MechaMarshmallow ","Grekken ","Mike13858","Joseph Padgett","Ronald Kim","DefectiveGamer ","Ian","John Denny","Steinhammer","Auntie Grieves","PassingbyPosts","Girmout Lokison","Rachel Gern","Aureate_Folly","Lunanar","rowgran","Anthony Zeppieri","Seraph ","Dan ","Gavin Lane","Hjaalfar Skjoldrsson","lamonte robinson","Hunter Cottrell","TheDarkSoul11","8 bit","Lordaron ","Cameron Spangler","MrPotatoAim6349","Jeff Mcbiscuits","Jackoshack","Haidrin","DeathCoyote","Azra","Whyohwhy 12","Houya","Maseca","kyle hoopes","Disparrow ","Logan Berek","Toa Disk","Brian Niceley","Etak ","josh","Matt ","William Padilla","Richard ","Stefan Karfusehr","James Edison","Slacker ","Moonswitch3399 ","Nikolas Ambross","Colette Lelette","Heptu","Vrocket","Grippa ","Andrew Henniges","Vapantraath","bunker buster","t s","Earl Martin","02010 ","Dean Laird","TheVelourFog ","Sans ","....... ","Mastergamer ","Ophis ","Narsauce ","Panda","Noir Usagi","Endy Cubed","IzumoKai","Jakob Cagle","Darklordiablo ","Suzaku ","Orvas","Ryan Krieger","K DA","Grocon A","Mr. J.","Robert gray","Slacker","BruceM","DemonQueen Sera","Mal","MonsterAD","Aria","Jen-Hsun Huang","Karma","Alice Reich","Nathan ","UserPig ","Anon the 13th","megahellreaper ","owen moore","Bobby D Floyd","asfdAD ","<SK> ","0Kanata0","snakbar ","philip","Selunea","SquigglyJim","Elijah McGovern","Jan Klauser","Kurious ","Israfel ","Lizzon ","Mark Hagan","Parad0x ","Arentios ","CptFalric ","Phenix995","Mars88","Maerwin","Norael ","Leche con chocolate","C","Kris","Khariel ","Rachel Burry","thisisnotreallyme ","Kara Regas","Alexander Brown","Azahel Noel Kurtz","Martin Griffin","Brave ","jordan zhou","Jeff ","Josh Button","Kashra Bascombe","Preusk ","Jake345 ","Fyodor ","Bryden Hoff","VYet","Mark Griffin","Kamren Drybread","Stephen Kennedy","Gaveal ","LionsFate ","hankhillpropane","mardoc","Kelbeck","parle42","Dav G.","Daver ","Milkygf","Narsauce","Wanderer","Jeyne Poole","William Taylor","EPIC BIRD","Justin Doyle","Califried","Drew Lichter","Rogi250","Logan Dodd","Cargo RSteele","Master Spark","Ocelotinside ","frog","Ashenbones ","Wind Walker","Ookami Kuchi","kafqm kqgmp","NeoDnyarri ","hundheim ","meowcat242","QQQdev ","Dakota Keeffer","Malte Schwantje","ThatoneBrah ","Tyragor ","Jayun ","sksksksksksksksksksks kskskskskskskskskssksksksksk","maps","JubileeGeode","Rene","Dr_Russian","Kilian Gnauck","Hannes Westander","witedragon","aiden ploughe","faye ","Sarah","Andi Li","j l ","Alisdair Gaston","Josh S","James Maes","Ian Harlow","Max ","Kitsune Tenko 9","Bobert the great","Joe Thelizard","Steve ","0ffnixleoi","Matatus Gratorus","Devon Farion","Kholonoe Lavist","Ninja ","Lol Djsj","DemonBlade","'-药不够- ","Miyuki Irie (Realtime6)","Tim Fischer","Cody Gardner","SaltyNeko","Nicklas Høgh","jim ","midnight sky","Jacob","divaroach","Losevka","Noam Halpert","RC ","Sara Kline","Michael Mancuso","Daniel Smith","TheGman","Klopss ","NeitherMeNorYou ","Rekka","Vlad Brown","Zaibunny","Старпёр ","Owlbear","Jahmir Roy","Teltmanden","Richard Mills","Edward Phillips","Stratus","michael glover","Alayla Risen","Anonynym","The One Who Knocks","R754","Ikarie","Azra El Crackhead","Cheezzy","Myah","DeadWolf357","용재 최","CasualBananas ","Blackwind TV","Dalriada ","Minesthra ","Avery Ioanidis","Black Lagoon23","Gloop ","shy-nerd-girl ","J. S.","ShadeOfTheLight ","Jordan Duggan","inszel ","Aaron Garland","Books Argentus","S","Technicolour","Exalt","A Giant Crab","Satsu","Chronos189 ","jere päivärinta","SomeRandomNamedBob","nk0x ","Brent Linn","BoogerBrigade ","Kelem ","Io96 ","Ah Dude","uzim22001 ","shin04h ","Alexander Schmid","Ethan Touzeau","Francis Lee","Bookmaniac","Dallas 179","Colin Kavanagh","Hampus Granat","Koshiu","Kibowalker ","Shatika Wallico","ChaoticPhoenix","codman56to","El Bardo","Viper21G","brnbabyburn","suttiruk ","Laioken ","Tigeress13 ","Halp ","Insolentdentist","Feadhel","John SMith","Chris Fisher","Sidetrack ","Joe Brenden","THESLINKER","veria","Praise the Sun","Aivilon","King Bravery","João Alexandre","Samantha Lear","Jason Fountain","Nathan Cleere","Katariven ","Jonas Temmen","Emil Larsen","John_Smiht","Patreon Patreon","dveragon ","Bati00 ","Devin Cousineau","Tom Eirik Mikalsen","John Smith","roboit","Lemon Lemon","Hadresian","JM K","Killzone1123","Khona Moshr","Mike","Kevin Scott","Sharkozis","Pete Moe","iriri ","NAAPURINJORMA","JD","lemonarchistemoderne","ElusiveShadow","Lleerk ","Ace Attacker","Paween Hinmuangkao","James Allison","Zach Bass","Notts","Brett ","Maraistan ","温利 ","Saurustorpechodix ","matt","HungNeto ","Therealdark3","Radek Sukop","Connor King","Matthew McConnell","Toby Blake","jacenhawk ","Abdul","Toker ","Florence .","EclipsingMonsoon","Max Myers","Insidechaos","BrokenRose","Minow","Loppy Lopsided","asmundur helgi","NoName2000","Mark M.","Garret ","Travis McDade","Russell Ortega","Chumang ","Pete","SirSpangler","CptPegasus","UC","ThePanzerKorps","DevelSpirit ","k","Dyamonde ","Ethan Wills","Mira Mira","Randy Eschker","Marlow","Delta Starfall","Somdee","R Ro","talon775","Martin Planet","Jeremy Renault","Orky Boss","Secret Dish","no one","Legion9553 ","Nobudi","dylan makings","Shadow1317","Rinko Usmari","James King","Kainin","Millermcgraw ","William Matthews","Alex Cortez","Cat Hawke","Hector Martinez","the lilil","Mechdragon ","Veiton ","Arawn ","Jim Ackerup","Jarno ","Jerry Floyd","The Jerg","Templar ","Lemming ","A W","Phillip Razlow"];

setup.creditsPassionTempleClergy = ["Alygness ","Joshua Smith","Longwave","Carlos Sierra","Elmeri Kunnas","Arkaykami","Shearly ","Lil Wolfy","Krispie Dwarf","Shinra","Owl ","MasterRekr ","Naga "];
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

