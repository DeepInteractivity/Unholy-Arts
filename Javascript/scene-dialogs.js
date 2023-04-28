///// GENERIC DIALOGS /////

setup.dialogDB = [];

window.dialogContext = function(actor,target,extra1,extra2) {
	this.actor = actor;
	this.target = target;
	this.extra1 = extra1;
	this.extra2 = extra2;
}

window.dialog = function(getDialog,checkReqs,getWeight) {
	this.getDialog = getDialog; // Function: Returns a formatted dialog with specific input
	this.checkReqs = checkReqs; // Function: Checks if the requisites for this dialog are met
	this.getWeight = getWeight; // Function: Returns the weight of receiving this dialog
								// All of these functions receive a dialogContext object
}

// Sex scene dialogs
setup.dialogDB.ssDialogs = [];
setup.dialogDB.ssDialogs.push(new dialog( // Kissing 1
	function(context) {
		var dText = "";
		if ( getCharsDrivePercent(context.actor,"dDomination") + getCharsDrivePercent(context.actor,"dAmbition") >= 0.3 ) {
			dText = "Let me taste your lips.";
		} else {
			dText = "Will you let me taste your lips?";
		}
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("useMouth") &&
			 setup.saList[context.extra1].flavorTags.includes("targetMouth")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.ssDialogs.push(new dialog( 					// Kissing 2
	function(context) {
		var dText = "Let me taste you...";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("useMouth") &&
			 setup.saList[context.extra1].flavorTags.includes("targetMouth")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Caress 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `What a cute face, ${relName}. Did you like that?`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("foreplay")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 80;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Caress 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Are you sensitive here?";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("foreplay")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 80;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Caress pussy 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "";
		if ( getCharsDrivePercent(context.actor,"dDomination") + getCharsDrivePercent(context.actor,"dAmbition") >= 0.3 ) {
			dText = "Hmm, someone's flooding.";
		} else {
			dText = "My, someone's flooding.";
		}
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("foreplay") &&
			 setup.saList[context.extra1].flavorTags.includes("targetPussy")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 80;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Caress pussy 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Aching to get filled?";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("foreplay") &&
			 setup.saList[context.extra1].flavorTags.includes("targetPussy") &&
			 gC(context.actor).hasFreeBodypart("dick")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 80;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Caress pussy 3
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "This " + pussyWord() + " belongs to me now. If it's needy, you'll have to ask me for help.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("foreplay") &&
			 setup.saList[context.extra1].flavorTags.includes("targetPussy") &&
			 gC(context.target).domChar == context.actor &&
			 getCharsDrivePercent(context.actor,"dDomination") >= 0.15
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 30 + gC(context.actor).dDomination.level * 10;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Caress pussy 4
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "This thing of yours... Is now mine. You should thank me for letting you enjoy it.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("foreplay") &&
			 setup.saList[context.extra1].flavorTags.includes("targetPussy") &&
			 gC(context.target).domChar == context.actor &&
			 getCharsDrivePercent(context.actor,"dDomination") >= 0.1
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 30 + gC(context.actor).dDomination.level * 10;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Caress dick 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Hmm, you're getting big, and hard.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("foreplay") &&
			 setup.saList[context.extra1].flavorTags.includes("targetDick")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 80;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Caress dick 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Anxious to get this inside me?";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("foreplay") &&
			 setup.saList[context.extra1].flavorTags.includes("targetDick") &&
			 ( gC(context.actor).hasFreeBodypart("pussy") || gC(context.actor).hasFreeBodypart("anus") )
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 80;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Caress dick 3
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Remember that this " + dickWord() + " of yours is my toy, only I can play with it.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("foreplay") &&
			 setup.saList[context.extra1].flavorTags.includes("targetDick") &&
			 gC(context.target).domChar == context.actor &&
			 getCharsDrivePercent(context.actor,"dDomination") >= 0.15
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 30 + gC(context.actor).dDomination.level * 10;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Caress dick 4
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "See this " + dickWord() + " of yours? It will only cum with my permission.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("foreplay") &&
			 setup.saList[context.extra1].flavorTags.includes("targetDick") &&
			 gC(context.target).domChar == context.actor &&
			 getCharsDrivePercent(context.actor,"dDomination") >= 0.15
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 30 + gC(context.actor).dDomination.level * 10;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Caress ass 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Hey, don't get startled.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("foreplay") &&
			 setup.saList[context.extra1].flavorTags.includes("targetAnus")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 80;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Full sex 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = randomFromList([(`Hmm. Don't stop.`),(`Hmm. Don't stop, ${relName}.`)]);
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("fullsex")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 65;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Full sex 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = randomFromList([("Yes, keep going!"),("Yes, just like that!")]);
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("fullsex") &&
			 getBarPercentage(context.actor,"lust") <= 0.65
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Full sex 3
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Don't stop, I'm almost there!";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("fullsex") &&
			 getBarPercentage(context.actor,"lust") <= 0.35
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 160;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Full sex 4
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `I'm getting close, ${relName}!`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("fullsex") &&
			 getBarPercentage(context.actor,"lust") <= 0.25
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 200;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Full sex 5
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `Yes, yes I love you, ${relName}!`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		var romanceScore = rLvlAbt(context.actor,context.target,"romance") - rLvlAbt(context.actor,context.target,"enmity");
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("fullsex") &&
			 getBarPercentage(context.actor,"lust") <= 0.50 &&
			 romanceScore >= 7
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Full sex 6
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `Enjoy being mine, ${relName}!`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		var dominationScore = rLvlAbt(context.actor,context.target,"domination") - rLvlAbt(context.actor,context.target,"submission");
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("fullsex") &&
			 dominationScore >= 7
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Scissoring 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Ah... Ah... Yes, grind me.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("fullsex") &&
			 setup.saList[context.extra1].flavorTags.includes("usePussy") &&
			 setup.saList[context.extra1].flavorTags.includes("targetPussy")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Scissoring 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = randomFromList([("Hold me close!"),(`Hold me close, ${relName}!`)]);
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("fullsex") &&
			 setup.saList[context.extra1].flavorTags.includes("usePussy") &&
			 setup.saList[context.extra1].flavorTags.includes("targetPussy") &&
			 getBarPercentage(context.actor,"lust") <= 0.40
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Full sex 7
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `Come closer to me, ${relName}.`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		var romanceScore = rLvlAbt(context.actor,context.target,"romance") - rLvlAbt(context.actor,context.target,"enmity");
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("fullsex") &&
			 romanceScore >= 6
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Penetrating 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = randomFromList([("Aaah... You're so tight."),(`You're so tight, ${relName}.`)]);
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("fullsex") &&
			 setup.saList[context.extra1].flavorTags.includes("useDick") &&
			 (setup.saList[context.extra1].flavorTags.includes("targetPussy") || setup.saList[context.extra1].flavorTags.includes("targetAnus"))
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Penetrating 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "You feel so good.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("fullsex") &&
			 setup.saList[context.extra1].flavorTags.includes("useDick") &&
			 (setup.saList[context.extra1].flavorTags.includes("targetPussy") || setup.saList[context.extra1].flavorTags.includes("targetAnus"))
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Penetrating 3
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Yes, squirt for me!";
		return dText;
	},
	function(context) {
		var flagValid = false;
		var dominationScore = rLvlAbt(context.actor,context.target,"domination") - rLvlAbt(context.actor,context.target,"submission");
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("fullsex") &&
			 setup.saList[context.extra1].flavorTags.includes("useDick") &&
			 (setup.saList[context.extra1].flavorTags.includes("targetPussy") || setup.saList[context.extra1].flavorTags.includes("targetAnus")) &&
			 dominationScore >= -4 &&
			 gC(context.actor).domChar != context.target
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Being penetrated 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Don't go too fast...";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("fullsex") &&
			 setup.saList[context.extra1].flavorTags.includes("targetDick") &&
			 (setup.saList[context.extra1].flavorTags.includes("usePussy") || setup.saList[context.extra1].flavorTags.includes("useAss"))  &&
			 getBarPercentage(context.actor,"lust") >= 0.80
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Being penetrated 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Yes, fill me!";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("fullsex") &&
			 setup.saList[context.extra1].flavorTags.includes("targetDick") &&
			 (setup.saList[context.extra1].flavorTags.includes("usePussy") || setup.saList[context.extra1].flavorTags.includes("useAss"))  &&
			 getBarPercentage(context.actor,"lust") <= 0.80
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Being penetrated 3
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Ah! Yes, don't stop!";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("fullsex") &&
			 setup.saList[context.extra1].flavorTags.includes("targetDick") &&
			 (setup.saList[context.extra1].flavorTags.includes("usePussy") || setup.saList[context.extra1].flavorTags.includes("useAss"))  &&
			 getBarPercentage(context.actor,"lust") <= 0.60
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Being penetrated 4
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `I want you deeper inside me, ${relName}! Don't stop!`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("fullsex") &&
			 setup.saList[context.extra1].flavorTags.includes("targetDick") &&
			 (setup.saList[context.extra1].flavorTags.includes("usePussy") || setup.saList[context.extra1].flavorTags.includes("useAss"))  &&
			 getBarPercentage(context.actor,"lust") <= 0.50
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 200;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Mounting 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Looking cute down there.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).position.type != "free" 
			) {
				if ( isPositionMounting(gC(context.actor).position.key) &&
					 areCharactersLinked(context.actor,context.target) ) {
						 flagValid = true;
					}
			}
		return flagValid;
	},
	function(context) {
		var weight = 20 + gC(context.actor).dDomination.level * 4;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Being mounted 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Will you be gentle?";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).position.type != "free" 
			) {
				if ( isPositionMounted(gC(context.actor).position.key) &&
					 areCharactersLinked(context.actor,context.target) &&
					 getBarPercentage(context.actor,"lust") >= 0.80 ) {
						 flagValid = true;
					}
			}
		return flagValid;
	},
	function(context) {
		var weight = 30;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Kneeling 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `Do you like seeing me on my knees, ${relName}?`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).position.type != "free" 
			) {
				if ( isPositionKneeling(gC(context.actor).position.key) &&
					 areCharactersLinked(context.actor,context.target) ) {
						 flagValid = true;
					}
			}
		return flagValid;
	},
	function(context) {
		var weight = 40;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Kneeling 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Are you enjoying this?";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).position.type != "free" 
			) {
				if ( isPositionKneeling(gC(context.actor).position.key) &&
					 areCharactersLinked(context.actor,context.target) ) {
						 flagValid = true;
					}
			}
		return flagValid;
	},
	function(context) {
		var weight = 40;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Making kneel 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Good " + gC(context.target).getDiminutive() + ", don't stop.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).position.type != "free" 
			) {
				if ( isPositionMakingKneel(gC(context.actor).position.key) &&
					 areCharactersLinked(context.actor,context.target) ) {
						 flagValid = true;
					}
			}
		return flagValid;
	},
	function(context) {
		var weight = 40;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Making kneel 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Yes, look at my face.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).position.type != "free" 
			) {
				if ( isPositionMakingKneel(gC(context.actor).position.key) &&
					 areCharactersLinked(context.actor,context.target) ) {
						 flagValid = true;
					}
			}
		return flagValid;
	},
	function(context) {
		var weight = 40;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Being eaten out
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Aah, your tongue feels so good!";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("targetMouth") &&
			 (setup.saList[context.extra1].flavorTags.includes("usePussy") || setup.saList[context.extra1].flavorTags.includes("useAss") || setup.saList[context.extra1].flavorTags.includes("useDick"))
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Being eaten out
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Hmm, you're such a good " + gC(context.target).getDiminutive() + ".";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("targetMouth") &&
			 (setup.saList[context.extra1].flavorTags.includes("usePussy") || setup.saList[context.extra1].flavorTags.includes("useAss") || setup.saList[context.extra1].flavorTags.includes("useDick"))
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Sadism 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "You better behave from now on.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("usePain") 
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100 + gC(context.actor).dDomination.level * 5;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Sadism 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Take this.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("usePain") 
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 50 + gC(context.actor).dDomination.level * 10;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Sadism 3
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Liked that?";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("usePain") 
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 75;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Sadism target 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Aw!";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 doesAnyActionContainTag(context.extra2,"usePain")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100 - gC(context.actor).dDomination.level * 10;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Sadism target 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Nngh...";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 doesAnyActionContainTag(context.extra2,"usePain")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 50;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Sadism target 3
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Is that the best you can do?";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 doesAnyActionContainTag(context.extra2,"usePain")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 10 + gC(context.actor).dDomination.level * 10;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Sadism target 4
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Nothing I can't take!";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 doesAnyActionContainTag(context.extra2,"usePain")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 10 + gC(context.actor).dDomination.level * 10;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Bondage 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "There, all wrapped up.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("bondage") 
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Bondage 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Yes! Struggle for me.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("bondage") &&
			 getCharsDrivePercent(context.actor,"dDomination") >= 0.15
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 200;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Bondage 3
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Stay quiet and be a good toy.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("bondage") &&
			 getCharsDrivePercent(context.actor,"dDomination") >= 0.15
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 200;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Denial 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Hehehe...";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("denial") 
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 75;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Denial 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Have you been good enough to deserve an orgasm?";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("denial") &&
			 getCharsDrivePercent(context.actor,"dDomination") >= 0.10
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 120;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Denial 3
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "You'll need to beg harder if you want to cum.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("denial") &&
			 getCharsDrivePercent(context.actor,"dDomination") >= 0.15
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 200;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Hypnosis 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Focus on my eyes...";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("hypnosis")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Hypnosis 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `Look at me, ${relName}.`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 setup.saList[context.extra1].flavorTags.includes("hypnosis")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Locked mouth
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = randomFromList([("Hmm... Ngh, hmm..."),("Hmmm!"),("..."),("Nnng..."),("Hmm.")]);
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( charHasLockedBodypart(context.actor,"mouth")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Virgin pussy caressing target 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "";
		if ( getCharsDrivePercent(context.actor,"dDomination") + getCharsDrivePercent(context.actor,"dAmbition") > 0.3 ) {
			dText = "Hmm! I don't have much experience down there, so take it easy.";
		} else {
			dText = "Aah... I haven't had anything inside there, so please be gentle...";
		}
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 doesAnyActionContainTags(context.extra2,["foreplay","targetPussy"]) &&
			 anyOtherActorHasFreeBodypart(context.actor,"dick") &&
			 checkCharsVirginityExists(context.target,"pussy")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Virgin dick caressing target 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "";
		if ( getCharsDrivePercent(context.actor,"dDomination") + getCharsDrivePercent(context.actor,"dAmbition") > 0.3 ) {
			dText = "Uhnn. I haven't done much with my " + dickWord() + ", so don't be too rough.";
		} else {
			dText = "Aah... I don't have much experience with that, so be gentle, ok?";
		}
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 doesAnyActionContainTags(context.extra2,["foreplay","targetDick"]) &&
			 anyOtherActorHasFreeBodypart(context.actor,"pussy") &&
			 checkCharsVirginityExists(context.actor,"dick")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Virgin ass caressing target 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "";
		if ( getCharsDrivePercent(context.actor,"dDomination") + getCharsDrivePercent(context.actor,"dAmbition") > 0.3 ) {
			dText = "Hmm! Be careful about where you touch...";
		} else {
			dText = "Hm-Ah! I hope you don't intend to go further...";
		}
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 doesAnyActionContainTags(context.extra2,["foreplay","targetAnus"]) &&
			 anyOtherActorHasFreeBodypart(context.actor,"dick") &&
			 checkCharsVirginityExists(context.target,"anal")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);

setup.dialogDB.ssDialogs.push(new dialog( 					// Request pussy target 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "My " + pussyWord() + " is aching...";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 doesCharHaveAlteredState(context.actor,"Pus+") &&
			 gC(context.actor).hasFreeBodypart("pussy")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Request dick target 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Hmm, pay attention to my " + dickWord() + ".";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 doesCharHaveAlteredState(context.actor,"Dic+") &&
			 gC(context.actor).hasFreeBodypart("dick")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Request breasts target 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Massage my " + boobsWord() + ", will you?";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 doesCharHaveAlteredState(context.actor,"Bre+") &&
			 gC(context.actor).hasFreeBodypart("breasts")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);
setup.dialogDB.ssDialogs.push(new dialog( 					// Request ass target 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "My " + assWord() + " is itchy.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 doesCharHaveAlteredState(context.actor,"Ass+") &&
			 gC(context.actor).hasFreeBodypart("anus")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	})
);

// Conversation offer dialogues
setup.dialogDB.csDialogs = [];
setup.dialogDB.csDialogs.push(new dialog( // Generic 1
	function(context) {
		var dText = "Hey, do you have a minute?";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( true
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 80;
		return weight;
	}));
setup.dialogDB.csDialogs.push(new dialog( // Generic 2
	function(context) {
		var dText = "Let's chat for a while.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( true
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 80;
		return weight;
	}));
setup.dialogDB.csDialogs.push(new dialog( // Friendly 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `Hello ${relName}, I'd like to hear your opinion on this...`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 isMissionOnFriendlyGroup(gC(context.actor).mission)
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 120;
		return weight;
	}));
setup.dialogDB.csDialogs.push(new dialog( // Friendly 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "You aren't going to believe this.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 isMissionOnFriendlyGroup(gC(context.actor).mission)
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 120;
		return weight;
	}));
setup.dialogDB.csDialogs.push(new dialog( // Friendly 3
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "How is your day going?";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 isMissionOnFriendlyGroup(gC(context.actor).mission)
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 120;
		return weight;
	}));
setup.dialogDB.csDialogs.push(new dialog( // Flirty 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "I've just seen something that brightened my day. What was it? You, of course.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 isMissionOnFlirtyGroup(gC(context.actor).mission)
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 120;
		return weight;
	}));
setup.dialogDB.csDialogs.push(new dialog( // Flirty 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "I want to spend some time with you.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 isMissionOnFlirtyGroup(gC(context.actor).mission)
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 120;
		return weight;
	}));
setup.dialogDB.csDialogs.push(new dialog( // Flirty 3
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = "Hello, beautiful.";
		if ( gC(context.actor).perPr == "he" ) { dText = "Hello, handsome."; }
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 isMissionOnFlirtyGroup(gC(context.actor).mission)
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 120;
		return weight;
	}));
setup.dialogDB.csDialogs.push(new dialog( // Flirty 4
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `Hi ${relName}, would you dedicate a while to me?`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 isMissionOnFlirtyGroup(gC(context.actor).mission)
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 120;
		return weight;
	}));
	
// Following dialogues
setup.dialogDB.folMeDialogs = []; // Extra 1 is forced = true || forced = false
setup.dialogDB.folMeDialogs.push(new dialog( // Follow me 1
	function(context) {
		var dText = "We both could benefit from teaming up. What do you say?";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 context.extra1 == false
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.folMeDialogs.push(new dialog( // Follow me 2
	function(context) {
		var dText = "It feels like a dangerous day. Lend me a hand and I'll protect you.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 context.extra1 == false
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.folMeDialogs.push(new dialog( // Follow me 3
	function(context) {
		var dText = "I could really use some help today.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 context.extra1 == false
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.folMeDialogs.push(new dialog( // Follow me forced 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `Follow me, ${relName}.`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 context.extra1 == true
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.folMeDialogs.push(new dialog( // Follow me forced 2
	function(context) {
		var dText = "Come with me.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 context.extra1 == true
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));

setup.dialogDB.folPlDialogs = [];
setup.dialogDB.folPlDialogs.push(new dialog( // Follow player 1
	function(context) {
		var dText = "It feels like a dangerous day. How about we go together?";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( true
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.folPlDialogs.push(new dialog( // Follow player 2
	function(context) {
		var dText = "I'm feeling a bit dizzy. Mind if I tag along?";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( true
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.folPlDialogs.push(new dialog( // Follow player 3
	function(context) {
		var dText = "Hey, would you mind if I followed you?";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( true
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));

setup.dialogDB.unfolMeDialogs = [];
setup.dialogDB.unfolMeDialogs.push(new dialog( // Unfollow me 1
	function(context) {
		var dText = "I'd prefer to go alone for now.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( true
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.unfolMeDialogs.push(new dialog( // Unfollow me 2
	function(context) {
		var dText = "Let's split up for a while.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( true
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));

setup.dialogDB.unfolPlDialogs = [];
setup.dialogDB.unfolPlDialogs.push(new dialog( // Unfollow player 1
	function(context) {
		var dText = "I have something to do.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( true
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.unfolPlDialogs.push(new dialog( // Unfollow player 2
	function(context) {
		var dText = "I need some time for myself.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( true
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));

// Initiate combat dialogues
setup.dialogDB.icDialogs = [];
setup.dialogDB.icDialogs.push(new dialog( // Challenge 1
	function(context) {
		var dText = "I've been wanting to measure myself with you.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "challenge"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Challenge 2
	function(context) {
		var dText = "I've polished my techniques recently. Want to see it?";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "challenge"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 70 + gC(context.actor).dImprovement.level * 10;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Challenge 3
	function(context) {
		var dText = "I've come to challenge you. Unless you're too scared, of course.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "challenge"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 70 + gC(context.actor).dDomination.level * 10;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Humilliate 1
	function(context) {
		var dText = "You've taken too much spotlight lately. Don't you know how fast flies burn?";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "humilliate"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Humilliate 2
	function(context) {
		var dText = "You appear to be doing well in the competition. Perhaps too well.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "humilliate"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Humilliate 3
	function(context) {
		var dText = "There's only room for one High Priestess - and I'll prove that I deserve it more than you.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "humilliate"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 70 + gC(context.actor).dAmbition.level * 10;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Weaken enemy 1
	function(context) {
		var dText = "You've been quite the bad " + gC(context.target).getDiminutive() + ". It's time to put you in your place.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "weakenEnemy"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Weaken enemy 2
	function(context) {
		var dText = "You've been getting stronger. I should stop you now that I still can.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "weakenEnemy"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Weaken enemy 3
	function(context) {
		var dText = "I heard of your misdeeds. I'll punish you before Drishtya has to.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "weakenEnemy"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 70 + gC(context.actor).dCooperation.level * 10;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Gain domination 1
	function(context) {
		var dText = "I think you don't respect me as much as you should. It's time to teach you a lesson.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "gainDomination"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Gain domination 2
	function(context) {
		var dText = "I've come to put you in your place.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "gainDomination"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Gain domination 3
	function(context) {
		var dText = "I'm in the mood to give you a good spanking.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "gainDomination"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 70 + gC(context.actor).dDomination.level * 10;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Force sex 1
	function(context) {
		var dText = "I'm in the mood for a fight. And I think you'll be my prize.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "forceSex"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Force sex 2
	function(context) {
		var dText = "I know it's a whim, but I really want to take you to warm my bed. Feel free to surrender.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "forceSex"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Force sex 3
	function(context) {
		var dText = "Remember how you teased me the other day? It's time to reap what you sowed.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "forceSex"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Gain submissive 1
	function(context) {
		var dText = "Can you believe it? I woke up this morning and no one brought me breakfast. You'll be bringing it to me tomorrow.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "gainSubmissive"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Gain submissive 2
	function(context) {
		var dText = "Don't you think you belong at my feet? Let me prove it to you.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "gainSubmissive"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Gain submissive 3
	function(context) {
		var dText = "I know you're too stubborn to admit you want to kneel before me, so I'll make sure you don't need any excuses.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "gainSubmissive"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Liberate friend 1
	function(context) {
		var dText = "Who gave you the right to boss others around? I'm going to put you in your place.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "liberateFriend"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Liberate friend 2
	function(context) {
		var dText = "I'm displeased with how you're treating my friends. I suggest you apologize as soon as possible.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "liberateFriend"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Liberate friend 3
	function(context) {
		var dText = "Someone I care about is under your yoke, but not for long.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "liberateFriend"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Casus belli retribution 1
	function(context) {
		var dText = "This will teach you not to wrong me.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "cbRetribution"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Casus belli retribution 2
	function(context) {
		var dText = "You were pretty mean earlier. Consider this some education in proper manners.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "cbRetribution" &&
			 getCharsDrivePercent(context.actor,"dCooperation") > 0.15
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.icDialogs.push(new dialog( // Casus belli retribution 3
	function(context) {
		var dText = "This wouldn't be happening if you knew when to keep your mouth shut.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( 
			 gC(context.actor).mission == "cbRetribution"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));

// Accept sharing the night dialogues

	// Snuggle
setup.dialogDB.stnDialoguesSnuggle = [];
setup.dialogDB.stnDialoguesSnuggle.push(new dialog( // Snuggle 1
	function(context) {
		var dText = "I want you to warm me tonight. Please hug me tightly.";
		return dText;
	},
	function(context) {
		var flagValid = true;
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.stnDialoguesSnuggle.push(new dialog( // Snuggle 2
	function(context) {
		var dText = "Can we just stay close to each other?";
		return dText;
	},
	function(context) {
		var flagValid = true;
		return flagValid;
	},
	function(context) {
		var weight = 50;
		if ( getCharsDrivePercent(context.actor,"dPleasure") <= 0.12 ) {
			weight *= 2.5;
		}
		return weight;
	}));
setup.dialogDB.stnDialoguesSnuggle.push(new dialog( // Snuggle 3
	function(context) {
		var dText = "I'm really tired after the whole day. I just want to have you next to me and feel your breathing on my neck.";
		return dText;
	},
	function(context) {
		var flagValid = true;
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.stnDialoguesSnuggle.push(new dialog( // Snuggle 4
	function(context) {
		var dText = "I don't want much tonight. Just to have you next to me, and feel your warmth...";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( rLvlAbt(context.actor,context.target,"romance") >= 4 ) {
			flagValid = true;
		}
		return flagValid;
	},
	function(context) {
		var weight = 0;
		weight += rLvlAbt(context.actor,context.target,"romance") * 20;
		return weight;
	}));
	
	// Tease
setup.dialogDB.stnDialoguesTease = [];
setup.dialogDB.stnDialoguesTease.push(new dialog( // Tease 1
	function(context) {
		var dText = "Keep your hands where I can see them, will you? Only I am allowed to tease you tonight.";
		return dText;
	},
	function(context) {
		var flagValid = true;
		return flagValid;
	},
	function(context) {
		var weight = 40;
		weight += (rLvlAbt(context.actor,context.target,"domination") - rLvlAbt(context.actor,context.target,"submission")) * 20;
		return weight;
	}));
setup.dialogDB.stnDialoguesTease.push(new dialog( // Tease 2
	function(context) {
		var dText = "It'd be quite a shame. To have me all alone for yourself and not make a move...";
		return dText;
	},
	function(context) {
		var flagValid = true;
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.stnDialoguesTease.push(new dialog( // Tease 3
	function(context) {
		var dText = "Look at me, all quiet and helpless... How terrible it would be if someone here were to ravage me.";
		return dText;
	},
	function(context) {
		var flagValid = true;
		return flagValid;
	},
	function(context) {
		var weight = 40;
		weight += (rLvlAbt(context.actor,context.target,"submission") - rLvlAbt(context.actor,context.target,"domination")) * 20;
		return weight;
	}));

	// Ega
setup.dialogDB.stnDialoguesEga = [];
setup.dialogDB.stnDialoguesEga.push(new dialog( // Ega 1
	function(context) {
		var dText = "Finally, we get a moment just for ourselves. I want to feel connected to you.";
		return dText;
	},
	function(context) {
		var flagValid = true;
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.stnDialoguesEga.push(new dialog( // Ega 2
	function(context) {
		var dText = "Hey, I... I want to feel your love, deep within me.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( gC(context.actor).hasFreeBodypart("pussy") ) {
			flagValid = true;
		}
		return flagValid;
	},
	function(context) {
		var weight = 100;
		if ( gC(context.actor).hasFreeBodypart("dick") ) {
			weight *= 0.5;
		}
		return weight;
	}));
setup.dialogDB.stnDialoguesEga.push(new dialog( // Ega 3
	function(context) {
		var dText = "Hey, I... I want to feel your love, deep within you.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( gC(context.actor).hasFreeBodypart("dick") ) {
			flagValid = true;
		}
		return flagValid;
	},
	function(context) {
		var weight = 100;
		if ( gC(context.actor).hasFreeBodypart("pussy") ) {
			weight *= 0.5;
		}
		return weight;
	}));
setup.dialogDB.stnDialoguesEga.push(new dialog( // Ega 4
	function(context) {
		var dText = "I'm going to hug you tight, and I'm not letting you go.";
		return dText;
	},
	function(context) {
		var flagValid = true;
		return flagValid;
	},
	function(context) {
		var weight = 100;
		weight += (rLvlAbt(context.actor,context.target,"romance") - rLvlAbt(context.actor,context.target,"sexualTension")) * 20;
		return weight;
	}));
setup.dialogDB.stnDialoguesEga.push(new dialog( // Ega 5
	function(context) {
		var dText = "Those lips of yours look awfully lonely. Mine should keep them company.";
		return dText;
	},
	function(context) {
		var flagValid = true;
		return flagValid;
	},
	function(context) {
		var weight = 40;
		weight += (rLvlAbt(context.actor,context.target,"sexualTension") - rLvlAbt(context.actor,context.target,"romance")) * 20;
		return weight;
	}));

	// Dom
setup.dialogDB.stnDialoguesDom = [];
setup.dialogDB.stnDialoguesDom.push(new dialog( // Dom 1
	function(context) {
		var dText = "You better be a good girl tonight.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( gC(context.target).perPr == "she" ) {
			flagValid = true;
		}
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.stnDialoguesDom.push(new dialog( // Dom 2
	function(context) {
		var dText = "You better be a good boy tonight.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( gC(context.target).perPr == "he" ) {
			flagValid = true;
		}
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.stnDialoguesDom.push(new dialog( // Dom 3
	function(context) {
		var dText = "I trust you will behave while I have my way with you.";
		return dText;
	},
	function(context) {
		var flagValid = true;
		return flagValid;
	},
	function(context) {
		var weight = 40;
		if ( context.actor == "chClaw" ) { weight += 40; }
		weight += (rLvlAbt(context.actor,context.target,"sexualTension") - rLvlAbt(context.actor,context.target,"romance")) * 20;
		return weight;
	}));
setup.dialogDB.stnDialoguesDom.push(new dialog( // Dom 4
	function(context) {
		var dText = "Stay quiet for me. You are going to enjoy this.";
		return dText;
	},
	function(context) {
		var flagValid = true;
		return flagValid;
	},
	function(context) {
		var weight = 40;
		weight += (rLvlAbt(context.actor,context.target,"romance") - rLvlAbt(context.actor,context.target,"sexualTension")) * 10;
		return weight;
	}));

// Orgasm messages

setup.dialogDB.orDialogs = [];
setup.dialogDB.orDialogs.push(new dialog( // Standard 1
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `${actor}'s mind goes blank as an orgasm runs through ` + gC(context.actor).posPr + " body.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 30;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Standard 2
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `${actor}'s whole body contracts as excitement reaches its peak.`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 30;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Vaginal 1
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `A chill runs through ${actor}'s body as an orgasm erupts from ` + gC(context.actor).posPr + " " + pussyWord() + "."
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 ( (doesAnyActionContainTag(context.extra2,"targetPussy")
			   || doesActorsContinuedActionsInvolveBodypart(context.actor,"pussy")) && gC(context.actor).body.hasOwnProperty("pussy") )
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Vaginal 2
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `${actor}'s ` + pussyWord() + " enters in a delightful tension as it surfs a climax.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 ( (doesAnyActionContainTag(context.extra2,"targetPussy")
			   || doesActorsContinuedActionsInvolveBodypart(context.actor,"pussy")) && gC(context.actor).body.hasOwnProperty("pussy") )
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Vaginal 3
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `A wave of pleasure is born at ${actor}'s ` + pussyWord() + " and gently agitates " + gC(context.actor).posPr + " mind.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 ( (doesAnyActionContainTag(context.extra2,"targetPussy")
			   || doesActorsContinuedActionsInvolveBodypart(context.actor,"pussy")) && gC(context.actor).body.hasOwnProperty("pussy") )
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Scissoring 1
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `The constant friction erodes the resistance in ${actor}'s mind, and it succumbs to pleasure.`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 doesActorsContinuedActionsInvolveBodypartCombination(context.actor,"pussy","pussy")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Scissoring 2
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `An orgasm takes place in ${actor}'s ` + pussyWord() + ", making " + gC(context.actor).comPr + " believe for a moment that it's fusing with " + gC(context.actor).posPr + " partner's.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 doesActorsContinuedActionsInvolveBodypartCombination(context.actor,"pussy","pussy")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Penetrated pussy 1
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `A forceful thrust enters ${actor}'s ` + pussyWord() + ` and plunges an orgasm into it, flooding ${actor}'s senses.`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 doesActorsContinuedActionsInvolveBodypartCombination(context.actor,"pussy","dick")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Penetrated pussy 2
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `${actor}'s ` + pussyWord() + " constricts when pleasure rushes through it, enthusiastically eating the " + dickWord() + " inside.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 doesActorsContinuedActionsInvolveBodypartCombination(context.actor,"pussy","dick")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Eaten pussy 1
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `The tongue caressing ${actor}'s clitoris makes it peak, making ${actor} lose ` + gC(context.actor).posPr + " breath."
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 doesActorsContinuedActionsInvolveBodypartCombination(context.actor,"pussy","mouth")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Eaten pussy 2
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `The constant devouring of ${actor}'s ` + pussyWord() + ` breaks the resistance containing its pleasure, which floods ${actor}'s conscience.`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 doesActorsContinuedActionsInvolveBodypartCombination(context.actor,"pussy","mouth")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Penile 1
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `${actor}'s ` + dickWord() + " erupts, letting its essence outside."
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 ( (doesAnyActionContainTag(context.extra2,"targetDick")
			   || doesActorsContinuedActionsInvolveBodypart(context.actor,"dick")) && gC(context.actor).body.hasOwnProperty("dick") )
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Penile 2
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `The pleasure defeats ${actor}'s ` + dickWord() + " letting it burst and going loose.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 ( (doesAnyActionContainTag(context.extra2,"targetDick")
			   || doesActorsContinuedActionsInvolveBodypart(context.actor,"dick")) && gC(context.actor).body.hasOwnProperty("dick") )
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Penetrating vagina 1
	function(context) {
		var actor = gC(context.actor).name;
		var dText = "Being hugged by " + gC(context.actor).posPr + " partner's " + pussyWord() + `, ${actor}'s ` + dickWord() + " reaches climax and ejaculates inside.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 doesActorsContinuedActionsInvolveBodypartCombination(context.actor,"dick","pussy")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Penetrating vagina 2
	function(context) {
		var actor = gC(context.actor).name;
		var dText = "It isn't long before cum runs out of the " + pussyWord() + ` of ${actor}'s partner, proving ` + gC(context.actor).posPr + " most recent peak.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 doesActorsContinuedActionsInvolveBodypartCombination(context.actor,"dick","pussy")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Penetrating ass 1
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `The tightness of ${actor}'s partner's ` + assWord() + " proves too much for " + gC(context.actor).posPr + " " + dickWord() + ", which cums inside.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 doesActorsContinuedActionsInvolveBodypartCombination(context.actor,"dick","anus")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Penetrating ass 2
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `${actor}'s ` + dickWord() + " plunges inside, and lets it essence run free.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 doesActorsContinuedActionsInvolveBodypartCombination(context.actor,"dick","anus")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Penetrating mouth 1
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `The constant licking sends ${actor}'s ` + dickWord() + " over the edge, and it erupts in pleasure.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 doesActorsContinuedActionsInvolveBodypartCombination(context.actor,"dick","mouth")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Penetrating mouth 2
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `Pleasure gets the best out of ${actor}'s ` + dickWord() + ", and it cums into " + gC(context.actor).posPr + " partner's throat.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 doesActorsContinuedActionsInvolveBodypartCombination(context.actor,"dick","mouth")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Targetted ass 1
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `A chill runs through ${actor}'s back, as an orgasm is born near ` + gC(context.actor).posPr + " rear."
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 ( doesAnyActionContainTag(context.extra2,"targetAnus")
			   || doesActorsContinuedActionsInvolveBodypart(context.actor,"anus") )
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Penetrated ass 1
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `${actor} reaches ecstasy as ` + gC(context.actor).posPr + " " + assWord() + " gets filled.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 doesActorsContinuedActionsInvolveBodypartCombination(context.actor,"anus","dick")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Penetrated ass 2
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `The drilling of ${actor}'s ` + assWord() + " makes " + gC(context.actor).comPr + " peak, " + gC(context.actor).posPr + " mind succumbing to pleasure.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 doesActorsContinuedActionsInvolveBodypartCombination(context.actor,"anus","dick")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Mindblowing 1
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `${actor}'s eyes go blank as a most intense pleasure swallows ` + gC(context.actor).comPr + " whole.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 == "mindblowing"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 200;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Mindblowing 2
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `${actor} screams without control as the whole world seems to fade in joy.`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 == "mindblowing"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 200;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Mindblowing 3
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `Shivers and chills embrace and consume ${actor}'s nerves, marking this experience one ` + gC(context.actor).perPr + " won't easily forget.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 == "mindblowing"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 200;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Ruined 1
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `A small tear falls from ${actor}'s eye as the joy of orgasming runs away from ` + gC(context.actor).posPr + " fingers.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 == "ruined"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Ruined 2
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `Excitement and sorrow both fight to occupy ${actor}'s mind as ` + gC(context.actor).perPr + " accepts that the long-awaited release is not going to come.";
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 == "ruined"
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Ruined vaginal 1
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `${actor}'s ` + pussyWord() + " aches in frustration as it realizes that it isn't going to reach the climax."
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 charHasLockedBodypart(context.actor,"pussy")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	}));
setup.dialogDB.orDialogs.push(new dialog( // Ruined penile 1
	function(context) {
		var actor = gC(context.actor).name;
		var dText = `${actor}'s ` + dickWord() + " revolves in pain as it isn't allowed to ejaculate."
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( context.extra1 != "ruined" &&
			 charHasLockedBodypart(context.actor,"dick")
			) { flagValid = true; }
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	}));

window.chooseMessageFromList = function(dList,actor,target,extra1,extra2) {
	var chosenDialog = "";
	var context = new dialogContext(actor,target,extra1,extra2);
	var wList = [];
	var i = 0;
	for ( var dialog of dList ) { // If requisites are met, add dialog object to weighted list with valid weight
		if ( dialog.checkReqs(context) ) {
			wList.push(new weightedElement(dialog,dialog.getWeight(context)));
		}
	}
	if ( wList.length > 0 ) {
		var chosenDialog = randomFromWeightedListPercentThreshold(wList,0.2).getDialog(context);
		return chosenDialog;
	} else {
		return chosenDialog;
	}
}

// Auxiliars

window.getRelationalName = function(actor,target) {
	var validNames = [gC(target).name,gC(target).name,gC(target).name];
	var enmityScore = (rLvlAbt(actor,target,"enmity") + rLvlAbt(actor,target,"rivalry") * 0.5 - rLvlAbt(actor,target,"friendship") - rLvlAbt(actor,target,"romance"));
	var submissionScore = rLvlAbt(actor,target,"submission") - rLvlAbt(actor,target,"domination");
	// Enmity
	if ( enmityScore >= 4 ) {
		validNames.push("asshole");
		if ( enmityScore >= 8 ) {
			validNames.push("scum");
		}
	} else {
	// Racial - Flower
		if ( enmityScore < -4 ) {
			if ( gC(actor).race == "leirien" || gC(target).race == "leirien" ) {
				validNames.push("flower");
			}
		}
	// Love
		if ( getCharsDrivePercent(actor,"dLove") > 0.1 ) {
			if ( rLvlAbt(actor,target,"romance") >= 6 ) {
				validNames.push("my love");
			}
		}
	// Submission
		if ( gC(actor).domChar == target || submissionScore >= 8 ) {
			if ( gC(target).perPr == "she" ) {
				validNames.push("mistress");
			} else if ( gC(target).perPr == "he" ) {
				validNames.push("master");
			}
		}
	}
	// Domination
	if ( submissionScore <= -3 && getCharsDrivePercent(actor,"dDomination") > 0.08 && gC(actor).domChar != target ) {
		validNames.push("pet");
		if ( submissionScore <= -5 && getCharsDrivePercent(actor,"dDomination") > 0.12 ) {
			validNames.push("toy");
			if ( gC(target).race == "beastkin" ) {
				validNames.push("kitten");
			}
		}
	}
	if ( (gC(target).domChar == actor || submissionScore <= -7) && getCharsDrivePercent(actor,"dDomination") > 0.15 ) {
		validNames.push("slave");
		validNames.push("servant");
	}
	// Pleasure
	if ( getCharsDrivePercent(actor,"dPleasure") > 0.16 ) {
		if ( rLvlAbt(actor,target,"sexualTension") >= 3 ) {
			if ( gC(target).perPr == "she" ) {
				validNames.push("beautiful");
			} else if ( gC(target).perPr == "he" ) {
				validNames.push("handsome");
			}
			if ( rLvlAbt(actor,target,"sexualTension") >= 6 ) {
				validNames.push("horny " + gC(target).getDiminutive());
				if ( rLvlAbt(actor,target,"sexualTension") >= 9 ) {
					validNames.push("slut");
				}
			}
		}
	}
	return randomFromList(validNames);
}
window.isMissionOnFriendlyGroup = function(missionName) {
	var flag = false;
	if ( missionName == "raiseFriendship" || missionName == "getAlliance" || missionName == "taunt" ) {
		flag = true;
	}
	return flag;
}
window.isMissionOnFlirtyGroup = function(missionName) {
	var flag = false;
	if ( missionName == "flirt" || missionName == "seduce" || missionName == "haveSex" || missionName == "haveDomSex" ) {
		flag = true;
	}
	return flag;
}

// Custom Dialogues
	// Blackmailed by Claw
setup.dialogDB.bbCshutup = [];
setup.dialogDB.bbCshutup.push(new dialog(					// Subbing 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `Ah... Hnnh...`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( gC(context.actor).hasLead == false ) {
			flagValid = true;
		}
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}
));
setup.dialogDB.bbCshutup.push(new dialog(					// Subbing 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `Slower... Not so fast.`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( gC(context.actor).hasLead == false && getBarPercentage(context.actor,"lust") <= 0.80 ) {
			flagValid = true;
		}
		return flagValid;
	},
	function(context) {
		var weight = 150;
		return weight;
	}
));
setup.dialogDB.bbCshutup.push(new dialog(					// Subbing 3
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `Ah... Calm down...`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( gC(context.actor).hasLead == false && getBarPercentage(context.actor,"lust") <= 0.60 ) {
			flagValid = true;
		}
		return flagValid;
	},
	function(context) {
		var weight = 200;
		return weight;
	}
));
setup.dialogDB.bbCshutup.push(new dialog(					// Subbing 4
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `No! Hmmpf! Hmmmnn!`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( gC(context.actor).hasLead == false && getBarPercentage(context.actor,"lust") <= 0.20 ) {
			flagValid = true;
		}
		return flagValid;
	},
	function(context) {
		var weight = 400;
		return weight;
	}
));

setup.dialogDB.bbCshutup.push(new dialog(					// Domming 1
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `*Cough* *cough*`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( gC(context.actor).hasLead == true ) {
			flagValid = true;
		}
		return flagValid;
	},
	function(context) {
		var weight = 100;
		return weight;
	}
));
setup.dialogDB.bbCshutup.push(new dialog(					// Domming 2
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `Hmm, this is feeling good.`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( gC(context.actor).hasLead == true && getBarPercentage(context.actor,"lust") <= 0.65 ) {
			flagValid = true;
		}
		return flagValid;
	},
	function(context) {
		var weight = 200;
		return weight;
	}
));
setup.dialogDB.bbCshutup.push(new dialog(					// Domming 3
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `Enjoying yourself, ${relName}? You might want to be careful with your voice.`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( gC(context.actor).hasLead == true && getBarPercentage(context.target,"lust") <= 0.50 ) {
			flagValid = true;
		}
		return flagValid;
	},
	function(context) {
		var weight = 300;
		return weight;
	}
));
setup.dialogDB.bbCshutup.push(new dialog(					// Domming 4
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `It would be really bad if you couldn't contain a shout of joy when you reached climax, wouldn't it?`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( gC(context.actor).hasLead == true && getBarPercentage(context.target,"lust") <= 0.30 ) {
			flagValid = true;
		}
		return flagValid;
	},
	function(context) {
		var weight = 400;
		return weight;
	}
));
setup.dialogDB.bbCshutup.push(new dialog(					// Domming 5
	function(context) {
		var relName = getRelationalName(context.actor,context.target);
		var dText = `Aaah... Yes, this is good. Don't you want to let me hear your moaning?`;
		return dText;
	},
	function(context) {
		var flagValid = false;
		if ( gC(context.actor).hasLead == true && getBarPercentage(context.target,"lust") <= 0.40 && getBarPercentage(context.target,"lust") <= 0.40 ) {
			flagValid = true;
		}
		return flagValid;
	},
	function(context) {
		var weight = 400;
		return weight;
	}
));

window.dialogToText = function(dialog,context) {
	var actor = context.actor;
	var dText = gC(actor).getFormattedName() + ': //' + colorText(('"' + dialog.getDialog(context) + '"'),gC(actor).speechColor) + '//';
	return dText;
}
window.chooseDialogFromList = function(dList,actor,target,extra1,extra2) {
	var chosenDialog = "";
	var context = new dialogContext(actor,target,extra1,extra2);
	var wList = [];
	for ( var dialog of dList ) { // If requisites are met, add dialog object to weighted list with valid weight
		if ( dialog.checkReqs(context) ) {
			wList.push(new weightedElement(dialog,dialog.getWeight(context)));
		}
	}
	if ( wList.length > 0 ) {
		var chosenDialog = randomFromWeightedListPercentThreshold(wList,0.3);
		return dialogToText(chosenDialog,context);
	} else {
		return chosenDialog;
	}
}


