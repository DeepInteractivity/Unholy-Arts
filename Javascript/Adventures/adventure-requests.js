///// ADVENTURE REQUESTS /////

window.adventureRequest = function(name,key,description,requisiteToAppear,isItAccepted,effects) {
	this.name = name;
	this.key = key;
	this.description = description;
	this.requisiteToAppear = requisiteToAppear;
	this.isItAccepted = isItAccepted;
	this.effects = effects;
}

const advReqType = {
	huntEssenceSucker: "h0",
	huntFlyingLookout: "h1",
	huntOppresiveYoke: "h2",
	askValtansJudgement: "avjg",
	discussWithNersmias: "nsb"
}

setup.advReqList = [];
	// Bondage
setup.advReqList[advReqType.huntEssenceSucker] = new adventureRequest("Hunt Essence-Sucker","h0",
	"You and your companion will attempt to hunt Essence-Suckers and deliver them to Artume.\nMake sure you are healthy and have plenty of time.\nYou will owe 3 favor to this character.",
	function(target) { // Requisites to appear
		var validRequest = false;
		var interruptable = mayCharBeInterrupted(target);
		if ( getCurrentStoryState() == storyState.firstAdventure && getCandidatesKeysArray().includes(target) && interruptable && target != "chVal" && gC(target).followedBy.length == 0 && gC(target).followingTo == "" ) {
			validRequest = true;
		}
		return validRequest;
	},
	function(target) { // Will request be accepted : [0] -> True/False , [1] -> Description
		var result = npcConsidersWillingnessToJoinHuntingMission(target,"chPlayerCharacter","EssenceSucker","GleamingCaverns");
		return result;
	},
	function(target) { // Effects: Target stops their goals, Player follows target, target starts hunting mission
		State.variables.compass.characterEventEndsPrematurely(target);
		charFollowsChar("chPlayerCharacter",target,false);
		gC(target).mapAi.goalsList = cMissionHuntGleamingCavernsMonsters(getCharGroup(target),"Essence-Sucker",null);
		payFavorDebt("chPlayerCharacter",target,3);
		State.variables.compass.setMapMessage(gC(target).getFormattedName() + " has accepted the request, and you will leave out to hunt. You now owe " + gC(target).comPr + " 3 favor.");
	});
setup.advReqList[advReqType.huntFlyingLookout] = new adventureRequest("Hunt Flying Lookout","h1",
	"You and your companion will attempt to hunt Flying Lookouts and deliver them to Artume.\nMake sure you are healthy and have plenty of time.\nYou will owe 3 favor to this character.",
	function(target) { // Requisites to appear
		var validRequest = false;
		var interruptable = mayCharBeInterrupted(target);
		if ( getCurrentStoryState() == storyState.firstAdventure && getCandidatesKeysArray().includes(target) && interruptable && target != "chVal" ) {
			validRequest = true;
		}
		return validRequest;
	},
	function(target) { // Will request be accepted : [0] -> True/False , [1] -> Description
		var result = npcConsidersWillingnessToJoinHuntingMission(target,"chPlayerCharacter","FlyingLookout","GleamingCaverns");
		return result;
	}, function(target) { // Effects: Target stops their goals, Player follows target, target starts hunting mission
		State.variables.compass.characterEventEndsPrematurely(target);
		charFollowsChar("chPlayerCharacter",target,false);
		gC(target).mapAi.goalsList = cMissionHuntGleamingCavernsMonsters(getCharGroup(target),"Flying Lookout",null);
		payFavorDebt("chPlayerCharacter",target,3);
		State.variables.compass.setMapMessage(gC(target).getFormattedName() + " has accepted the request, and you will leave out to hunt. You now owe " + gC(target).comPr + " 3 favor.");
	});
setup.advReqList[advReqType.huntOppresiveYoke] = new adventureRequest("Hunt Oppresive Yoke","h2",
	"You and your companion will attempt to hunt Oppresive Yokes and deliver them to Artume.\nMake sure you are healthy and have plenty of time.\nYou will owe 3 favor to this character.",
	function(target) { // Requisites to appear
		var validRequest = false;
		var interruptable = mayCharBeInterrupted(target);
		if ( getCurrentStoryState() == storyState.firstAdventure && getCandidatesKeysArray().includes(target) && interruptable && target != "chVal" ) {
			validRequest = true;
		}
		return validRequest;
	},
	function(target) { // Will request be accepted : [0] -> True/False , [1] -> Description
		var result = npcConsidersWillingnessToJoinHuntingMission(target,"chPlayerCharacter","OppressiveYoke","GleamingCaverns");
		return result;
	}, function(target) { // Effects: Target stops their goals, Player follows target, target starts hunting mission
		State.variables.compass.characterEventEndsPrematurely(target);
		charFollowsChar("chPlayerCharacter",target,false);
		gC(target).mapAi.goalsList = cMissionHuntGleamingCavernsMonsters(getCharGroup(target),"Oppressive Yoke",null);
		payFavorDebt("chPlayerCharacter",target,3);
		State.variables.compass.setMapMessage(gC(target).getFormattedName() + " has accepted the request, and you will leave out to hunt. You now owe " + gC(target).comPr + " 3 favor.");
	});
setup.advReqList[advReqType.askValtansJudgement] = new adventureRequest("Ask opinion on Valtan's situation","avjg",
	"Ask this character their opinion on the relationship of Valtan with her own tribe, at the cost of some social drive.",
	function(target) { // Requisites to appear
		var validRequest = false;
		var interruptable = mayCharBeInterrupted(target);
		if ( getCurrentStoryState() == storyState.firstAdventure && getCandidatesKeysArray().includes(target) && target != "chVal" && interruptable ) {
			validRequest = true;
		}
		return validRequest;
	},
	function(target) { // Will request be accepted : [0] -> True/False , [1] -> Description
		var result = [true,"Will accept."];
		var relScore = rLvlAbt(target,"chPlayerCharacter","friendship") + rLvlAbt(target,"chPlayerCharacter","romance") - rLvlAbt(target,"chPlayerCharacter","enmity");
		var subMinusDom = rLvlAbt(target,"chPlayerCharacter","submission") - rLvlAbt(target,"chPlayerCharacter","domination");
		if ( subMinusDom < 0 ) { subMinusDom = 0; }
		relScore += subMinusDom;
		if ( relScore < 5 ) {
			result[0] = false;
			result[1] = "This character does not trust you enough. Relationship points: " + relScore + " < 5."
		}
		return result;
	},
	function(target) { // Effects: Player loses some social drive, returns to map with the conversation as a map message
		gC("chPlayerCharacter").socialdrive.changeValue(-5);
		State.variables.compass.setMapMessage(getCharsValtanJudgementDescription(target) + "\nYou have lost " + textSocialdrivePoints(5) + ".");
	});
setup.advReqList[advReqType.discussWithNersmias] = new adventureRequest("Discuss with Nersmias","nsb",
	"Ask this character to speak with Nersmias about Valtan, defending their own opinions. You will owe 5 favor to this character.",
	function(target) { // Requisites to appear
		var validRequest = false;
		var interruptable = mayCharBeInterrupted(target);
		
		var nersmiasIsFree = getAllActionsOnMapThat(getCurrentMap(),getCharGroup(target),function(action) { return action.tags.includes("npcNerConv"); }).length > 0;
		var charDidntSpeakToNersmias = gC(target).hasOwnProperty("flagSpokeWithNersmias") == false;
		var isValid = (nersmiasIsFree && charDidntSpeakToNersmias);
		
		if ( getCurrentStoryState() == storyState.firstAdventure && getCandidatesKeysArray().includes(target) && target != "chVal" && interruptable && isValid ) {
			validRequest = true;
		}
		return validRequest;
	},
	function(target) { // Will request be accepted : [0] -> True/False , [1] -> Description
		var result = [true,"Will accept."];
		var relScore = rLvlAbt(target,"chPlayerCharacter","friendship") + rLvlAbt(target,"chPlayerCharacter","romance") - rLvlAbt(target,"chPlayerCharacter","enmity");
		var subMinusDom = rLvlAbt(target,"chPlayerCharacter","submission") - rLvlAbt(target,"chPlayerCharacter","domination");
		if ( subMinusDom < 0 ) { subMinusDom = 0; }
		relScore += subMinusDom;
		if ( relScore < 7 ) {
			result[0] = false;
			result[1] = "This character does not trust you enough. Relationship points: " + relScore + " < 5.";
		} else {
			result[1] = "This character values your relationship enough, and is willing to do this favor for you. Relationship points: " + relScore + " < 7.";
		}
		return result;
	},
	function(target) { // Effects: Player loses some social drive, returns to map with the conversation as a map message
		State.variables.compass.characterEventEndsPrematurely(target);
		gC(target).mapAi.goalsList = cMissionActionTag(getCurrentMap(),getCharGroup(target),"npcNerConv");
		payFavorDebt("chPlayerCharacter",target,5);
		State.variables.compass.setMapMessage(gC(target).getFormattedName() + " has accepted the request, and will go to speak with Nersmias. You now owe " + gC(target).comPr + " 5 favor.");
	});
	

window.getAdvRequestByKey = function(key) {
	return setup.advReqList[key];
}
window.getAllAdvRequests = function() {
	var advRequests = [];
	for ( var advReq in setup.advReqList ) {
		if ( setup.advReqList[advReq] instanceof adventureRequest ) {
			advRequests.push(setup.advReqList[advReq]);
		}
	}
	return advRequests;
}
window.getAllPossibleAdvRequests = function(target) {
	var advRequests = getAllAdvRequests();
	var possibleAdvRequests = [];
	for ( var advReq of advRequests ) {
		if ( advReq.requisiteToAppear(target) ) {
			possibleAdvRequests.push(advReq);
		}
	}
	return possibleAdvRequests;
}
window.formatAdvReqsPassage = function(target) {
	var advReqs = getAllPossibleAdvRequests(target);
	var passage = "__Specific Topics__:\n\n";
	for ( var req of advReqs ) {
		passage += "__" + req.name + "__^^" + hoverText("(?)",req.description) + "^^ - ";
		var isItAccepted = req.isItAccepted(target);
		if ( isItAccepted[0] ) {
			passage += hoverText(colorText("Would accept^^(?)^^","green"),isItAccepted[1]) + " - ";
			passage += "<<l" + "ink[[Select|Map]]>><<s" + "cript>>setup.advReqList['" + req.key + "'].effects('" + target + "')<</s" + "cript>><</l" + "ink>>";
		} else {
			passage += hoverText(colorText("Will not accept^^(?)^^","red"),isItAccepted[1]);
		}
		passage += "\n";
	}
	passage += "\n" + "<<l" + "ink [[Exit to map|Map]]>><</l" + "ink>>";
	// Set passage variable text
	State.variables.advReqsPassage = passage;
	return passage;
}
//	var result = "<span title='" + hText + "'>" + txt + "</span>";
//	return result;

