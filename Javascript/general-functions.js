///// General functions /////


// General UI bars functions

	// Present character info
window.presentCharInfo = function(title,img) {
	this.title = title;
	this.img = img;
}

window.getPresentCharByKey = function(key) {
	var title = gC(key).formattedName;
	var img = gCavatar(key); // gC(key).avatar();
	var cInfo = new presentCharInfo(title,img);
	return cInfo;
}

window.getPresentCharCustomName = function(key,customName) {
	var title = '<span style="color:' + gC(key).nameColor + '">' + customName + '</span>';
	var img = gCavatar(key); // gC(key).avatar();
	var cInfo = new presentCharInfo(title,img);
	return cInfo;
	// '<span style="color:'+this.nameColor+'">'+this.name+'</span>';
}

window.getPresentCharCustomTitle = function(key,customTitle) {
	var img = gCavatar(key); // gC(key).avatar();
	var cInfo = new presentCharInfo(customTitle,img);
	return cInfo;
}

State.variables.presentCharacters = [];

window.setPasChars = function(charsInfoList) {
	// Set Passage Characters
	State.variables.presentCharacters = charsInfoList;
}
window.setNoPasChars = function() {
	State.variables.presentCharacters = [];
}


//  Bars proper
window.refreshUIbars = function() {
	if ( tags().contains("SIS") ) {																				// SIS
		// Player is alone or has followers
		if ( State.variables.chPlayerCharacter.followingTo == "" ) {
			State.variables.leftUIbarText = State.variables.chPlayerCharacter.getCharacterUIbarInfo() + State.variables.chPlayerCharacter.mood.getUiText();
			for ( var ck of State.variables.chPlayerCharacter.followedBy ) {
				State.variables.leftUIbarText += State.variables[ck].getCharacterUIbarInfo() + gC(ck).mood.getUiText();
			}
		} else { // Player following someone
			var leaderKey = State.variables.chPlayerCharacter.followingTo;
			State.variables.leftUIbarText = State.variables[leaderKey].getCharacterUIbarInfo() + gC(leaderKey).mood.getUiText();;;
			for ( var ck of State.variables[leaderKey].followedBy ) {
				State.variables.leftUIbarText += State.variables[ck].getCharacterUIbarInfo() + gC(ck).mood.getUiText();
			}
		}
		if ( State.variables.compass.pcSis != -1 ) {
			State.variables.rightUIbarText = "";
			for ( var charKey of State.variables.compass.sisList[State.variables.compass.pcSis].charList ) {
				if ( charKey == "chPlayerCharacter" || gC(charKey).followingTo != "" || gC(charKey).followedBy.includes("chPlayerCharacter") ) {
					// Don't show
				}
				else if ( gC(charKey).followedBy.length > 0 ) {
					State.variables.rightUIbarText += State.variables[charKey].getCharacterUIbarInfo() + State.variables[charKey].mood.getUiText();
					for ( var ck of gC(charKey).followedBy ) {
						State.variables.rightUIbarText += State.variables[ck].getCharacterUIbarInfo() + State.variables[ck].mood.getUiText();
					}
				}
				else {
					State.variables.rightUIbarText += State.variables[charKey].getCharacterUIbarInfo() + State.variables[charKey].mood.getUiText();
				}
			}
		} else {
			State.variables.rightUIbarText = "";
		}
	}
	else if ( State.variables.sc.flagSceneActive == false  ) { 													// Default
		State.variables.leftUIbarText = State.variables.chPlayerCharacter.getCharacterUIbarInfo();
		State.variables.rightUIbarText = "";
		for ( var pciA in State.variables.presentCharacters ) {
			if ( State.variables.presentCharacters[pciA] instanceof presentCharInfo ) {
				var pci = State.variables.presentCharacters[pciA];
				if ( pci.title != null ) {
					State.variables.rightUIbarText += pci.title + "\n";
				}
				if ( pci.img != null ) {
					State.variables.rightUIbarText += pci.img + "\n";
				}
				if ( pci.title != null || pci.img != null ) {
					State.variables.rightUIbarText += "\n";
				}
			}
		}
	
		if ( State.variables.compass.currentMap != "none" && State.variables.eventsCalendar.activeEvent != true ) {				// Map
			// Player following no one
			if ( State.variables.chPlayerCharacter.followingTo == "" ) {
				State.variables.leftUIbarText = State.variables.chPlayerCharacter.getCharacterUIbarInfo();
				for ( var ck of State.variables.chPlayerCharacter.followedBy ) {
					State.variables.leftUIbarText += State.variables[ck].getCharacterUIbarInfo();
				}
			} else { // Player following someone
				var leaderKey = State.variables.chPlayerCharacter.followingTo;
				State.variables.leftUIbarText = State.variables[leaderKey].getCharacterUIbarInfo();
				for ( var ck of State.variables[leaderKey].followedBy ) {
					State.variables.leftUIbarText += State.variables[ck].getCharacterUIbarInfo();
				}
			}
			State.variables.compass.refreshRightUImap();
		}
	}
	else {																										// Scene
		State.variables.leftUIbarText = ""; // State.variables.chPlayerCharacter.getCharacterUIbarInfo();
											// Hide the player character if they're not participating in a scene
		if ( State.variables.sc.teamAcharKeys.includes("chPlayerCharacter") ) {
			State.variables.leftUIbarText += State.variables.chPlayerCharacter.getCharacterUIbarInfo();
		}
		State.variables.rightUIbarText = "";
		
		for ( var charKey of State.variables.sc.teamAcharKeys ) {
			if ( charKey != "chPlayerCharacter" ) {
				State.variables.leftUIbarText += "\n" + State.variables[charKey].getCharacterUIbarInfo();
			}
		}
		for ( var charKey of State.variables.sc.teamBcharKeys ) {
			State.variables.rightUIbarText += "\n";
			if ( gC(charKey).fullPortrait ) {
				State.variables.rightUIbarText += State.variables.sc.getButtonShowFullAvatar(charKey) + " ";
			}
			State.variables.rightUIbarText += State.variables[charKey].getCharacterUIbarInfo();
		}
	}
}

// if (tags().contains("saveAllowed"))

