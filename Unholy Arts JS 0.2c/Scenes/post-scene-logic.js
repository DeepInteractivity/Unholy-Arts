///// POST-SCENE LOGIC /////
window.processGenericSexSceneEffects = function() {
	var allChars = State.variables.sc.teamAcharKeys.concat(State.variables.sc.teamBcharKeys);
	for ( var charKey of allChars ) {
		if ( gC(charKey).orgasmSceneCounter > 0 ) {
			gC(charKey).lust.restore();
		}
	}
}

window.processGenericMapBattleEffects = function() {
	// Find winners and losers
	var flagStaleMate = false;
	var winner = "";
	var loser = "";
	
	var flagIsWinnerAttacking = false;
	var infamyMult = 1;
	var stakes = State.variables.sc.stakes;
	
	var resultsMessage = "";
	
	var selectedBattleDemand = null;
	
	switch (State.variables.sc.extraEndInfo) {
		case "stalemate":
			flagStaleMate = true;
			break;
		case "teamAwin":
			// Set winner
			if ( State.variables.sc.teamAcharKeys.includes(State.variables.sc.aggressor) ) {
				flagIsWinnerAttacking = true;
			}
			// Restore Team A
			for ( var charKey of State.variables.sc.teamAcharKeys ) {
				gC(charKey).lust.restore();
			}
			break;
		case "teamBwin":
			// Set winner
			if ( State.variables.sc.teamBcharKeys.includes(State.variables.sc.aggressor) ) {
				flagIsWinnerAttacking = true;
			}
			// Restore Team B
			for ( var charKey of State.variables.sc.teamBcharKeys ) {
				gC(charKey).lust.restore();
			}
			break;
	}
	if ( flagIsWinnerAttacking ) {
		winner = State.variables.sc.aggressor;
		loser = State.variables.sc.defender;
	} else if ( flagStaleMate == false ) {
		winner = State.variables.sc.defender;
		loser = State.variables.sc.aggressor;
		infamyMult = 0.5;
	}
	
	// Execute logic
	if ( flagStaleMate == false ) {
		if ( winner != "chPlayerCharacter" ) { // NPC victory
			// Temporary: NPC does nothing
			selectedBattleDemand = getNpcDemandOnWinningBattle(winner,loser,stakes,infamyMult);
			selectedBattleDemand.provokeEffect(winner,loser,stakes,infamyMult);
			resultsMessage = selectedBattleDemand.resultMessage(winner,loser,stakes,infamyMult);
			resultsMessage += "\n\n[[Continue|Map]]";
		} else { // Player victory
			resultsMessage = "You won! You may now demand something from " + gC(loser).name + ".\n\n"
						   + formatBattleDemandButtons(loser,stakes,infamyMult);
		}
	} else {
		resultsMessage = "Stalemate!\n\n[[Continue|Map]]";
	}
	
	// Finish formatting
	State.variables.compass.sceneResultsPassage = resultsMessage;
}
window.formatGenericBattlePlayerChoice = function(message) {
	State.variables.compass.sceneResultsPassage = message + "\n\n[[Continue|Map]]";
}
window.getNpcDemandOnWinningBattle = function(actor,target,stakes,infamyMult) {
	var infamy = gC(actor).infamy;
	var choices = [ "doNothing" , "humilliate" , "forceServitude" ];
	var decision = "doNothing";
	var result = null;
	var hostility = limitedRandomInt(20) - 10 + rLvlAbt(actor,target,"rivalry") * limitedRandomInt(30) + rLvlAbt(actor,target,"enmity") * limitedRandomInt(30) + rLvlAbt(actor,target,"sexualTension") * limitedRandomInt(20) - rLvlAbt(actor,target,"friendship") * limitedRandomInt(10) - rLvlAbt(actor,target,"romance") * limitedRandomInt(10) + gC(target).infamy;
	// TO DO: REMOVE THIS LATER
	if ( actor == "chClaw" ) {
		hostility += 15;
	} else if ( actor == "chVal" ) {
		hostility += 5;
	} else if ( actor == "chMir" ) {
		hostility -= 15;
	}
	if ( infamyMult < 1 ) {
		hostility += 10;
	}
	
	if ( infamy > 20 ) {
		decision = "doNothing";
	} else if ( infamy < 15 && hostility > 5 && stakes >= 3 && gSettings().servitudeRelationships == "enable"
			 && gC(target).domChar == null && gC(target).subChars.length == 0 && gC(actor).domChar == null ) {
		decision = "forceServitude";
	} else if ( hostility > 0 ) {
		decision = "humilliate";
	} else {
		decision = "doNothing";
	}
	
	switch ( decision ) {
		case "doNothing":
			result = createBdemandDoNothing();
			break;
		case "humilliate":
			result = createBdemandHumillitation();
			break;
		case "forceServitude":
			result = createBdemandForceServitude();
			break;
	}
	
	return result;
}


