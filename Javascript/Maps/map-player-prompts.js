
////// MAP PLAYER PROMPTS //////
// Functions used to generate prompts sent to player under specific circumstances

window.getButtonAcceptConversation = function(askingCharacter) {
	var bText = "<<l" + "ink [[Accept conversation|Social Interactions]]>><<s" + "cript>>\n";
	bText	 += "State.variables.compass.finishPlayerPrompt();\n";
	bText	 += "State.variables.compass.createNewSis(getCharGroup('chPlayerCharacter').concat(getCharGroup('" + askingCharacter + "')));\n";
	bText	 += "State.variables.compass.cleanPhantasmEvents();\n";
	bText	 += "<</s" + "cript>><</l" + "ink>>";
	return bText;
}
window.getButtonRejectConversation = function(askingCharacter) {
	var bText = "<<l" + "ink [[Reject|Map]]>><<s" + "cript>>\n";
	bText	 += "State.variables.compass.finishPlayerPrompt();\n";
	bText	 += "State.variables." + askingCharacter + ".mapAi.state = 'idle';\n";
	bText	 += "State.variables.compass.pushAllTimeToAdvance();\n";
	bText	 += "<</s" + "cript>><</l" + "ink>>";
	return bText;
}
window.getButtonAcceptConversationInterrupted = function(askingCharacter) {
	var bText = "<<l" + "ink [[Accept conversation|Social Interactions]]>><<s" + "cript>>\n";
	bText 	 += "State.variables.compass.findFirstEventInvolvingPlayer().forceEnd();\n"; // Interrupt player's current event
	bText	 += "State.variables.compass.finishPlayerPrompt();\n";
	bText	 += "State.variables.compass.createNewSis(getCharGroup('chPlayerCharacter').concat(getCharGroup('" + askingCharacter + "')));\n";
	bText	 += "State.variables.compass.cleanPhantasmEvents();\n";
	bText	 += "<</s" + "cript>><</l" + "ink>>"
	bText	 += " (This will interrupt your current activity)";	// Warning
	return bText;
}
window.getButtonRejectConversationInterrupted = function(askingCharacter) {
	var bText = "<<l" + "ink [[Reject|Map]]>><<s" + "cript>>\n";
	bText	 += "State.variables.compass.finishPlayerPrompt();\n";
	bText	 += "State.variables." + askingCharacter + ".mapAi.state = 'idle';\n";
	bText	 += "State.variables.compass.pushAllTimeToAdvance();\n";
	bText	 += "<</s" + "cript>><</l" + "ink>>";
	return bText;
}

// Buttons Battles
window.getButtonBeingAssaulted = function(assaultingCharacter) {
	var bText = "<<l" + "ink [[Fight back|Scene]]>><<s" + "cript>>\n";
	bText	 += "State.variables.compass.pushAllTimeToAdvance();\n";
	bText	 += "State.variables.compass.finishPlayerPrompt();\n";
	bText	 += "<</s" + "cript>><</l" + "ink>>"
	return bText;
}
window.getButtonAcceptChallenge = function(challengingCharacter,stakes) {
	// Initiate challenge battle, assign infamy
	var bText = "<<l" + "ink [[Accept challenge|Scene]]>><<s" + "cript>>\n";
	bText	 += "initiateNpcToPlayerAcceptedChallenge('" + challengingCharacter + "'," + stakes + ");\n";
	bText	 += "State.variables." + challengingCharacter + ".changeInfamy(1);\n";
	bText	 += "State.variables.compass.pushAllTimeToAdvance();\n";
	bText	 += "State.variables.compass.finishPlayerPrompt();\n";
	bText	 += "<</s" + "cript>><</l" + "ink>>"
	return bText;
}
window.getButtonRejectChallenge = function(challengingCharacter,stakes) {
	var returnPassage = getPlayerReturnScreen();
	// Initiate challenge battle, assign infamy and merit
	var bText = "<<l" + "ink [[Refuse challenge|" + returnPassage + "]]>><<s" + "cript>>\n";
	bText	 += "State.variables." + challengingCharacter + ".changeInfamy(1);\n";
	bText	 += "State.variables." + challengingCharacter + ".changeMerit(1);\n";
	bText	 += "State.variables.chPlayerCharacter.changeMerit(-1);\n";
	bText	 += "State.variables.compass.finishPlayerPrompt();\n";
	//bText	 += "State.variables." + challengingCharacter + ".mapAi.state = 'idle';\n";
	bText	 += "State.variables.compass.pushAllTimeToAdvance();\n";
	bText	 += "<</s" + "cript>><</l" + "ink>>"
	return bText;
}

// Follow
window.getButtonNpcAsksToFollowThemAccept = function(actor) {
	var followingForDebt = true;
	if ( gRelTypeAb("chPlayerCharacter",actor) ) { // Check if player is forced to follow	
		if ( gRelTypeAb("chPlayerCharacter",actor).forcedToFollow ) {
			followingForDebt = false;
		}
	}
	var bText = "<<l" + "ink [[Accept|Map]]>><<s" + "cript>>\n";
	bText	 += "charFollowsChar('chPlayerCharacter','" + actor + "'," + followingForDebt + ");\n";
	bText	 += "State.variables.compass.finishPlayerPrompt();\n";
	bText	 += "<</s" + "cript>><</l" + "ink>>"
	return bText;
}
window.getButtonNpcAsksToFollowThemReject = function(actor) {
	var returnPassage = getPlayerReturnScreen();
	var bText = "<<l" + "ink [[Refuse|" + returnPassage + "]]>><<s" + "cript>>\n";
	bText	 += "charArefusesToFollowCharacterB('chPlayerCharacter','" + actor + "');\n";
	bText	 += "State.variables.compass.finishPlayerPrompt();\n";
	bText	 += "<</s" + "cript>><</l" + "ink>>"
	return bText;
}
window.getButtonNpcAsksToFollowPlayerAccept = function(actor) {
	var returnPassage = getPlayerReturnScreen();
	var bText = "<<l" + "ink [[Accept|" + returnPassage + "]]>><<s" + "cript>>\n";
	bText	 += "charFollowsChar('" + actor + "','chPlayerCharacter',false);\n";
	bText	 += "State.variables.compass.finishPlayerPrompt();\n";
	bText	 += "<</s" + "cript>><</l" + "ink>>"
	return bText;
}
window.getButtonNpcAsksToFollowPlayerReject = function(actor) {
	var returnPassage = getPlayerReturnScreen();
	var bText = "<<l" + "ink [[Refuse|" + returnPassage + "]]>><<s" + "cript>>\n";
	bText	 += "State.variables.compass.finishPlayerPrompt();\n";
	bText	 += "<</s" + "cript>><</l" + "ink>>"
	return bText;
}
window.getButtonNpcAsksToUnfollowThemAccept = function(actor) {
	var returnPassage = getPlayerReturnScreen();
	var bText = "<<l" + "ink [[Accept|" + returnPassage + "]]>><<s" + "cript>>\n";
	bText	 += "charUnfollowsChar('chPlayerCharacter','" + actor + "');\n";
	bText	 += "State.variables.compass.finishPlayerPrompt();\n";
	bText	 += "<</s" + "cript>><</l" + "ink>>"
	return bText;
}
window.getButtonNpcAsksToUnfollowThemReject = function(actor) {
	var returnPassage = getPlayerReturnScreen();
	var bText = "<<l" + "ink [[Refuse|" + returnPassage + "]]>><<s" + "cript>>\n";
	bText	 += "State.variables.compass.finishPlayerPrompt();\n";
	bText	 += "<</s" + "cript>><</l" + "ink>>"
	return bText;
}
window.getButtonNpcAsksToUnfollowPlayerAccept = function(actor) {
	var returnPassage = getPlayerReturnScreen();
	var bText = "<<l" + "ink [[Accept|" + returnPassage + "]]>><<s" + "cript>>\n";
	bText	 += "charUnfollowsChar('" + actor + "','chPlayerCharacter');\n";
	bText	 += "State.variables.compass.finishPlayerPrompt();\n";
	bText	 += "<</s" + "cript>><</l" + "ink>>"
	return bText;
}
window.getButtonNpcAsksToUnfollowPlayerReject = function(actor) {
	var returnPassage = getPlayerReturnScreen();
	var bText = "<<l" + "ink [[Refuse|" + returnPassage + "]]>><<s" + "cript>>\n";
	bText	 += "State.variables.compass.finishPlayerPrompt();\n";
	bText	 += "<</s" + "cript>><</l" + "ink>>"
	return bText;
}

// Auxiliar

window.getPlayerReturnScreen = function() {
	var passage = "Map";
	if ( State.variables.compass.getCharacterSisId("chPlayerCharacter") != -1 ) {
		passage = "Social Interactions";
	}
	return passage;
}

////////////////////////////////

