///// Nersmias Social Battle /////

// Estimaciones de cambios de valores
// 100 , 50
// Introduction: 57,95 ~ 47,105
// Global value changes -> -+7,15 -> 64,80 ~ 40,120
// Per round changes -> 4-6-(-4) , 8-12-16 (Base,Max.Stats,Hypnosis)
// Stats, Min. Effect, Max. Effect: 20~40 (At total stats)
// Willpower: -50% extra effect at 0% willpower, -50% extra effect at 0% social drive
// Will: 12~24: 16 max points of willpower damage, 8 min points of willpower damage

// $nerSocBattle
// $nerSocTopic
// $nerSocPlayerHypno
// $nerSocNerHypnosUsed
// $nerSocPlaHypnosUsed

// Option to re-roll topics
// Option to abandon conversation

// Endings

// Complete general menu

window.formatNersmiasSocialBattleMainPassage = function(isFirstRound) {
	var pT = ""; // Passage Text
	var contractedMenu = false;
	var endedScene = false;
	if ( State.variables.nerSocTopic == "csbhp" ) { contractedMenu = true; }
	
	if ( State.variables.nerSocTopic == "skipRound" ) {
		pT += randomFromList(["Your indecision is making Nersmias lose his patience.","You awkwardly make the conversation drag on, until you can think of appropriate topics to bring up.","//I can't come up with anything useful to say...//"]);
		pT += "\nNersmias' trust has slightly decreased, and his conviction increased.\n";
		modifyNersmiasLocalConviction(2);
		modifyNersmiasLocalTrust(-2);
	} else if ( isFirstRound == false ) {
			// Can topic actually be discussed?
		// Discuss topic
		pT += getNSBpassageText(State.variables.nerSocTopic);
		State.variables.nsbUsedConvTags.push(State.variables.nerSocTopic);
		
		if ( contractedMenu == false ) {
			// Did Player attack?
			if ( State.variables.nerSocPlayerHypno == true && gC("chPlayerCharacter").saList.includes("baHypnoticGlance") && gC("chPlayerCharacter").willpower.current >= 5 ) {
				pT += "\n\nYou capture Nersmias' eyes and enter his thoughts, disrupting them and replacing them with noise.\n//Nersmias' conviction and trust have decreased.\n"
					+ "You have lost " + textWillpowerPoints(5) + ".";
				gC("chPlayerCharacter").willpower.current -= 5;
				modifyNersmiasLocalConviction(-5);
				modifyNersmiasLocalTrust(-2);
				State.variables.nerSocPlaHypnosUsed++;
				if ( State.variables.nerSocNerHypnosUsed == 0 ) {
					endedScene = true;
					State.variables.nerLocTrust -= 25;
					pT += "\n\n" + getPsuhC();
					pT += "\n\n" + nsbGetButtonToMap();
				}
			}
				
			if ( endedScene == false ) {		
				// Is Nersmias attacking?
				if ( State.variables.nerLocTrust >= 55 ) {
					// High trust, no hypnosis attack
				} else {
					// No high trust, Nersmias commits hypnosis attack
					pT += "\n\n" + getNersmiasHypnosisAttackDescription();
					var wpDamage = 16;
					var wpdMultFactor = (gCstat("chPlayerCharacter","will") - 12) / 12;
					if ( wpdMultFactor < 0 ) { wpdMultFactor = 0; }
					else if ( wpdMultFactor > 1 ) { wpdMultFactor = 1; }
					wpDamage = wpDamage / ( 1 + wpdMultFactor );
					// Damage
					applyBarDamageWithoutOverflow("chPlayerCharacter","willpower",-wpDamage);
					// Text
					pT += "\nYou have received " + textWillpowerDamage(wpDamage) + ".";
					State.variables.nerSocNerHypnosUsed++;
				}
				if ( State.variables.nerSocNerHypnosUsed >= 9 && State.variables.StVars.check9 == false ) {
					pT += "\n\nYour constant struggle against Nersmias' attacks have strengthened your will! You gain 5% will affinity.";
					gC("chPlayerCharacter").will.affinity += 0.05;
					State.variables.StVars.check9 = true;
				}
			
				// Ending conditions?
					// Player willpower -> 0
						// High trust -> Order player to leave
						// Moderate trust + High conviction -> Order player to leave
						// Moderate trust - High conviction -> Offer player to take deal or leave
						// Low trust -> Humilliation scene
					// Nersmias trust -> 0
						// Kick Player out
					// Nermias conviction -> 0
						// Offer Player to talk to Sillan
						
				pT += "\n\n";
			}
		}
	}
	
	if ( contractedMenu == false && endedScene == false ) {	
		// Reached ending?
		var reachedEnding = true;
		if ( gC("chPlayerCharacter").willpower.current <= 0 ) {
			if ( State.variables.nerLocConviction <= 20 ) {
				pT += "\n\n" + nsbGetEndingNWPLC();
			} else {
				pT += "\n\n" + nsbGetEndingNWPHC();
			}
		} else if ( State.variables.nerLocTrust <= 0 ) {
			if ( gC("chPlayerCharacter").willpower.current <= 20 ) {
				pT += "\n\n" + nsbGetEndingZTLWP();
			} else {
				pT += "\n\n" + nsbGetEndingZTHWP();
			}
		} else if ( State.variables.nerLocConviction <= 0 ) {
			pT += "\n\n" + nsbGetEndingZC();
		} else {
			reachedEnding = false;
		}
		
		if ( reachedEnding == false ) {
			// Display Nersmias status
			pT += '<<s' + 'cript>>getNersmiasConvictionDescription(); getNersmiasTrustDescription();<</s' + 'cript>>'
				+ '$nsbcDesc \n'
				+ '$nsbtDesc';
			// getNersmiasConvictionDescription() + "\n" + getNersmiasTrustDescription();
				
			// Use hypnosis option
				// Textbox: check to use hypnosis if possible. Using hypnosis consumes willpower
			if ( gC("chPlayerCharacter").saList.includes("baHypnoticGlance") && gC("chPlayerCharacter").willpower.current >= 5 ) {
				pT += "\n\nYou may use hypnosis to erode Nersmias' conviction, at the expense of your own willpower.\n" + `<<checkbox "$nerSocPlayerHypno" false true>> Use hypnosis.`
			}
			
			// Generate topic choices
			pT += "\n\n" + getNSBlinksToRandomTopics();
			pT += "\n" + getLinkToNSBpassageNname("skipRound","Skip round and re-roll interactions") + hoverText("^^(?)^^","Will worsen the attitude of Nersmias.");
				// Option to leave
			pT += "\n\n[[Abandon the conversation and leave|FaSe NSB LeavingConversation]]";
		}
	}
	
	return pT;
}

///// Mechanics functions

window.nsbInitConversationTagsVars = function() {
	State.variables.nsbBaseConvTags = ["sdwc0","sdwc1","sdwc2","vlfs0","gwts","vmfgc","vdss","vdat","csbhp","vic00","sdtsv","vhmrg","sacri","sacfh","vdtbt","iwriv","vis","suhA","suhB"]; // suhC shouldn't be accessed ordinarily
	State.variables.nsbUsedConvTags = [];
}
window.nsbGetValidConversationTags = function() {
	var validConvTags = [];
	var uct = State.variables.nsbUsedConvTags;
	for ( var potConvTag of State.variables.nsbBaseConvTags ) {
		if ( uct.includes(potConvTag) == false ) {
			var usable = true;
			
			switch(potConvTag) {
				case "sdwc1":
					if ( uct.includes("sdwc0") == false ) {
						usable = false;
					}
					break;
				case "sdwc2":
					if ( uct.includes("sdwc1") == false ) {
						usable = false;
					}
					break;
				case "vmfgc":
					if ( uct.includes("csbhp") || uct.includes("vic00") || uct.includes("sacfh") ) {
						usable = false;
					}
					break;
				case "vdat":
					if ( uct.includes("sacfh") ) {
						usable = false;
					}
					break;
				case "csbhp":
					if ( uct.includes("vmfgc") ) {
						usable = false;
					}
					break;
				case "vic00":
					if ( uct.includes("vmfgc") ) {
						usable = false;
					}
					break;
				case "sacri":
					if ( uct.includes("sacfh") || uct.includes("iwriv") || isStVarOn("nsbRea") == false ) {
						usable = false;
					}
					break;
				case "sacfh":
					if ( uct.includes("sacri") || isStVarOn("nsbRea") == false ) {
						usable = false;
					}
					break;
				case "iwriv":
					if ( uct.includes("sacri") ) {
						usable = false;
					}
					break;
				case "suhA":
					if ( isStVarOn("noNeHy") == false || State.variables.nerSocPlaHypnosUsed > 0 ) {
						usable = false;
					}
					break;
				case "suhB":
					if ( isStVarOn("noNeHy") == false || State.variables.nerSocPlaHypnosUsed < 1 ) {
						usable = false;
					}
					break;
				case "vis":
					if ( rLvlAbt("chPlayerCharacter","chVal","enmity") < 3 && rLvlAbt("chPlayerCharacter","chVal","rivalry") < 3 ) {
						usable = false;
					}
					break;
				case "iwriv":
					if ( rLvlAbt("chPlayerCharacter","chVal","domination") < 4 ) {
						usable = false;
					}
					break;
				case "vdtbt":
					if ( rLvlAbt("chPlayerCharacter","chVal","friendship") < 4 && rLvlAbt("chPlayerCharacter","chVal","romance") < 4 ) {
						usable = false;
					}
					break;
				case "vhmrg":
					if ( isStVarOn("CaReVl") == false ) {
						usable = false;
					}
					break;
			}
			if ( potConvTag == "vis" ) {
				if ( uct.includes("sdwc0") || uct.includes("sdwc1") || uct.includes("sdwc2") || uct.includes("vlfs0") || uct.includes("gwts") || uct.includes("vmfgc") || uct.includes("vdss") || uct.includes("vdat") || uct.includes("vhmrg") || uct.includes("vdtbt") ) {
					usable = false;
				}
			}
			if ( potConvTag == "sdwc0" || potConvTag == "sdwc1" || potConvTag == "sdwc2" || potConvTag == "vlfs0" || potConvTag == "gwts" || potConvTag == "vmfgc" || potConvTag == "vdss" || potConvTag == "vdat" || potConvTag == "vhmrg" || potConvTag == "vdtbt" ) {
				if ( uct.includes("vis") ) {
					usable = false;
				}
			}
			
			if ( usable == true ) {
				validConvTags.push(potConvTag);
			}
		}
	}
	return validConvTags;
}
window.nsbGetRandomNValidTopics = function(n) {
	var validTopicsList = nsbGetValidConversationTags();
	var chosenTopics = [];
	var i = 0;
	while ( (i < n) && (validTopicsList.length > 0) ) {
		var cTi = limitedRandomInt(validTopicsList.length - 1);
		chosenTopics.push(validTopicsList[cTi]);
		validTopicsList = arrayMinusA(validTopicsList,validTopicsList[cTi]);
		i++;
	}
	return chosenTopics;
}

window.getNersmiasHypnosisAttackDescription = function() {
	var txt = "";
	if ( getBarPercentage("chPlayerCharacter","willpower") > 0.75 ) {
		txt = randomFromList(["//This doesn't feel quite right...//","//Am I getting dizzy?//","//It's getting harder and harder to argue...//"]);
	} else if ( getBarPercentage("chPlayerCharacter","willpower") > 0.45 ) {
		txt = randomFromList(["//There is no point in trying to argue. Reason is on his side.//","//I'm merely fighting a wall...//","//If they all agree, maybe they just know Valtan better.//"]);
	} else {
		txt = colorText("//" + randomFromList(["It is time to give up. You serve the tribes, you serve the Shapeshifters.","You have gone too far already. Kneel and apologize.","Do not throw yourself to waste for the sake of a liar and an impostor.","The Shapeshifters have been wronged, you ought to ask for forgiveness."]) + "//",gC("chNer").colorStyleKey);
	}
	if ( limitedRandomInt(100) > 75 ) {
		if ( isStVarOn("noNeHy") == false ) {
			txt += "\n//These thoughts aren't my own, right? He's trying to get into my mind.//"
			addToStVarsList("noNeHy");
		}
	}
	return txt;
}

// Ex.: isStVarOn("noNeHy") // removeFromStVarsList("dldPly"); addToStVarsList("noNeHy");

///// Passage texts functions

window.getLinkToNSBpassageNname = function(passage,name) {
	var l = '<<link [[' + name + '|FaSe NSB AnyRound]]>>' + scriptStart() + 'State.variables.nerSocTopic = "' + passage + '";' + `<</s` + `cript>>` + '<</link>>';
	return l;
}
window.getNSBpassageText = function(passage) {
	var t = "";
	switch(passage) {
		case "sdwc0":
			t = getPsdwc0();
			break;
		case "sdwc1":
			t = getPsdwc1();
			break;
		case "sdwc2":
			t = getPsdwc2();
			break;
		case "vlfs0":
			t = getPvlfs0();
			break;
		case "gwts":
			t = getPgwts();
			break;
		case "vmfgc":
			t = getPvmfgc();
			break;
		case "vdss":
			t = getPvdss();
			break;
		case "vdat":
			t = getPvdat();
			break;
		case "csbhp":
			t = getPcsbhp();
			break;
		case "hpcta":
			t = getPhpcta();
			break;
		case "hpcej":
			t = getPhpcej();
			break;
		case "hpcmo":
			t = getPhpcmo();
			break;
		case "hpckp":
			t = getPhpckp();
			break;
		case "vic00":
			t = getPvic00();
			break;
		case "sdtsv":
			t = getPsdtsv();
			break;
		case "vhmrg":
			t = getPvhmrg();
			break;
		case "sacri":
			t = getPsacri();
			break;
		case "sacfh":
			t = getPsacfh();
			break;
		case "vdtbt":
			t = getPvdtbt();
			break;
		case "iwriv":
			t = getPiwriv();
			break;
		case "vis":
			t = getPvis();
			break;
		case "suhA":
			t = getPsuhA();
			break;
		case "suhB":
			t = getPsuhB();
			break;
		case "suhC":
			t = getPsuhC();
			break;
	}
	return t;
}
window.getNSBpassageTitle = function(passage) {
	var t = "";
	switch(passage) {
		case "sdwc0":
			t = "Sillan didn't want to be a Candidate";
			break;
		case "sdwc1":
			t = "Sillan was complicit in the swap";
			break;
		case "sdwc2":
			t = "Maybe you didn't even deserve to have a Candidate";
			break;
		case "vlfs0":
			t = "Valtan had Sillan's interests in mind first";
			break;
		case "gwts":
			t = "The Goddess wanted Valtan and Sillan to swap";
			break;
		case "vmfgc":
			t = "Valtan makes for a good Candidate";
			break;
		case "vdss":
			t = "Valtan deserves to see Sillan";
			break;
		case "vdat":
			t = "Valtan doesn't deserve the exile";
			break;
		case "csbhp":
			t = "Valtan shouldn't be High Priestess";
			break;
		case "hpcta":
			t = "Caring for those around her";
			break;
		case "hpcej":
			t = "Ensuring justice";
			break;
		case "hpcmo":
			t = "Maintaining order";
			break;
		case "hpckp":
			t = "Keeping power";
			break;
		case "vic00":
			t = "Valtan is chaotic indeed";
			break;
		case "sdtsv":
			t = "Sillan deserves to see Valtan";
			break;
		case "vhmrg":
			t = "Valtan helped me rescue Glien";
			break;
		case "sacri":
			t = "If Shapeshifters are chaotic, you must respect that";
			break;
		case "sacfh":
			t = "If Shapeshifters are chaotic, maybe they need a firm hand";
			break;
		case "vdtbt":
			t = "Valtan deserves to be trusted";
			break;
		case "iwriv":
			t = "I will rein in Valtan";
			break;
		case "vis":
			t = "Valtan is scum";
			break;
		case "suhA":
			t = "Stop using hypnosis";
			break;
		case "suhB":
			t = "Stop using hypnosis";
			break;
		case "suhC":
			t = "Stop using hypnosis";
			break;
	}
	return t;
}

window.getNSBlinksToRandomTopics = function() {
	var topics = nsbGetRandomNValidTopics(getCharsNumberInteractions("chPlayerCharacter"));
	var txt = "";
	for ( var t of topics ) {
		if ( txt != "" ) { txt += "\n"; }
		txt += getLinkToNSBpassageNname(t,getNSBpassageTitle(t));
	}
	return txt;
}

window.getPsdwc0 = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"As I understand it, Sillan didn't want to be her tribe's Candidate."//</span>

<span @style=$chNer.colorStyleKey>//"Did she tell you so?"//</span> Nersmias asks sarcastically.

<span @style=$chPlayerCharacter.colorStyleKey>//"No, but it does make sense. Why would she go as far as to join Valtan's deception if she wanted to become the Shapeshifter Candidate herself?"//</span>

<span @style=$chNer.colorStyleKey>//"Sillan held Valtan in high value, and Valtan took advantage of it to convince her. In her moment of weakness, Sillan chose to comply with her friend's request over her own interests."//</span>

//Is this the truth, or his own rationalization?//` + scriptStart() + `modifyPlayerHelpedValtan(1)` + `<</s` + `cript>>`;
	return t;
}
window.getPsdwc1 = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"Let's assume you're right about Sillan taking a wrong decision in a moment of weakness. That would still make her complicit with Valtan's deception. Where does this double standard come from?"//</span>

<span @style=$chNer.colorStyleKey>//"It's a logical question, from your position. You don't know how different Sillan and Valtan are."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"Are you implying that Sillan didn't have the character to defy Valtan?"//</span>

<span @style=$chNer.colorStyleKey>//"That's a most uncharitable form to express it."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"But it's exactly what you mean."//</span>

<span @style=$chNer.colorStyleKey>//"..."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"Should she even be the Shapeshifter Candidate if she wasn't willing to refuse such a distraught request?"//</span>

<span @style=$chNer.colorStyleKey>//"...That's not up to you to decide."//</span>

//Your persuasion has decreased Nersmias' conviction.//` + scriptStart() + `modifyPlayerHelpedValtan(1); IorPmodifiesNersmiasLocalTorC(-10,'p','c')` + `<</s` + `cript>>`;
	return t;
}
window.getPsdwc2 = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"Do you want to know what I truly think?"//</span>

<span @style=$chNer.colorStyleKey>//"Pointless question. You're just about to tell me anyway."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"I'm not even sure you deserve to have a Candidate. You, as the Shapeshifters."//</span>

<span @style=$chNer.colorStyleKey>//"The arrogance of this human! How dare you...!?"//</span> But you cut him in place, continuing your argument.

<span @style=$chPlayerCharacter.colorStyleKey>//"Shapeshifters choose their Candidate collectively, correct? By consensus. And the consensus you reached was choosing a Candidate that allowed someone else to take her place at the first opportunity. What kind of consensus is one where your chosen Candidate isn't even determined to accept that decision?"//</span>

Nersmias' eyes briefly twitch, anger evident in his look. <span @style=$chNer.colorStyleKey>//"You shouldn't speak so lightly of something you barely know about."//</span>

//Your inspiration has decreased Nersmias' conviction, and his trust has decreased.//` + scriptStart() + `modifyPlayerHelpedValtan(1); IorPmodifiesNersmiasLocalTorC(-10,'i','c'); modifyNersmiasLocalTrust(-8);` + `<</s` + `cript>>`;
	return t;
}

window.getPvlfs0 = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"Above all else, Valtan had Sillan's interests in mind."//</span>

<span @style=$chNer.colorStyleKey>//"Ha. Hahahahahaha!"//</span> His laugh, slow at first, ends up becoming somewhat genuine. <span @style=$chNer.colorStyleKey>//"That's either the best joke I've heard in years, or an immensely bare-faced lie. Or maybe you're just naive enough to think that whatever Valtan's told you about this was sincere."//</span>

<<if $StVars.check6 gte 32>> \
<span style="color:green">Inspiration check: passed.</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"I have seen Valtan lie, I have seen Valtan cheat and fool, but I have also seen her be vulnerable, sad and sincere. I'm not denying that she also had other reasons to want to become your tribe's Candidate, but if you're so overly cynical that you can't see that she also cared about Sillan, you aren't seeing Valtan as the whole person that she is, just the caricature you want to hate."//</span>

<span @style=$chNer.colorStyleKey>//"...What could you possibly know that I haven't seen..."//</span>

//Your inspiration has decreased Nersmias' conviction, and his trust has decreased.//` + scriptStart() + `modifyPlayerHelpedValtan(1); IorPmodifiesNersmiasLocalTorC(-10,'i','c'); modifyNersmiasLocalTrust(-8);` + `<</s` + `cript>>` + `<<else>> \
<span style="color:red">Inspiration check: failed.</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"I don't intend to deny that Valtan also has a selfish side, but maybe you don't know her as well as you think you do. Twenty years of seeing someone from the distance may not allow you to say as much as sharing you whole life with them for one month."//</span>

<span @style=$chNer.colorStyleKey>//"..."//</span> He looks at you with a mixture of pity and boredom.

//Nersmias' trust towards you has decreased.//` + scriptStart() + `modifyPlayerHelpedValtan(1); modifyNersmiasLocalTrust(-8);` + `<</s` + `cript>>` + `<</if>> \\`;
	return t;
}

window.getPgwts = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"The swap wouldn't have taken place if the Goddess didn't will it."//</span>

Nersmias archs an eyebrow. <span @style=$chNer.colorStyleKey>//"Explain yourself."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"The Goddess watches over the Valley, and the High Priestess is the representative of the Goddess among us. She wouldn't have allowed an impostor to take the place of a Candidate if that wasn't her will."//</span>

<span @style=$chNer.colorStyleKey>//"What a flimsy argument. Where do I even begin?"//</span> He grabs his shut eyes with a couple of fingers before resuming his answer. <span @style=$chNer.colorStyleKey>//"The Goddess does indeed watch over the Valley and over the tribes, but that doesn't make her our caretaker. Selfish and even evil actions are committed from time to time, and sometimes they're of immense magnitude. While the Goddess may intervene on situations of dire importance for the tribes' present and future, an impostor taking the place of a Candidate isn't the same as taking the place of High Priestess, and Sillan might as well be the Candidate today if Drishtya had taken a different decision a few weeks ago. You can't blame on the Goddess the actions of a faulty Regent."//</span>

//I don't think this is a good route.//

//Nersmias' trust has slightly decreased, and his conviction increased.//` + scriptStart() + `modifyPlayerHelpedValtan(1); modifyNersmiasLocalTrust(-8); modifyNersmiasLocalConviction(6);` + `<</s` + `cript>>`;
	return t;
}

window.getPvmfgc = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"Valtan is a good Candidate in my opinion, anyway. She might not be the strongest or most apt with magic, but she is very socially aware and a good schemer. If her priorities were somewhat straighter, she would have good qualities for a diplomat and even a leader."//</span>

<span @style=$chNer.colorStyleKey>//"Such fanciful ifs."//</span> Nersmias dismisses you. <span @style=$chNer.colorStyleKey>//"If I allowed myself to be prey of my lower instincts, I could be a villain and a tyrant, doing as I wanted with my tribe for my sake and pleasure."//</span>

//Huh.//

<span @style=$chNer.colorStyleKey>//"But one's values matter - even more so than might when you're granted with the responsibility of leading your own. What's more: the condition to become the Shapeshifter Candidate isn't based on your capabilities, but on having the trust of our tribe as a whole. You're bringing a poor excuse for a crime if I'm to feel content with a benefit that isn't what's held in high esteem by our customs and laws."//</span>

//Nersmias' conviction slightly increased.//` + scriptStart() + `modifyNersmiasLocalConviction(6)` + `<</s` + `cript>>`;
	return t;
}

window.getPvdss = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"Valtan deserves the right to see Sillan, at least just once."//</span>

<span @style=$chNer.colorStyleKey>//"Sillan wishes not to see her."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"Under what conditions did she decide that? After being pulled apart from her and having the rest of the tribe stacked and outraged against Valtan, which may be justified or not, but it was definitely not a good environment for Sillan to take a fair decision."//</span>

<span @style=$chNer.colorStyleKey>//"They had, however, been close for the vast majority of their lives prior to that. Was their trust so weak that a few weeks apart would break it so easily?"//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"Is her current decision so weak that you wouldn't dare to allow them to talk for a few minutes, lest Sillan change her mind again?"//</span>

The priest stays silent.

//Your inspiration decreased Nersmias' conviction, and his trust decreased.//` + scriptStart() + `modifyPlayerHelpedValtan(1); IorPmodifiesNersmiasLocalTorC(-8,'i','c'); modifyNersmiasLocalTrust(-6);` + `<</s` + `cript>>`;
	return t;
}

window.getPvdat = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"Valtan doesn't deserve to be exiled."//</span>

<span @style=$chNer.colorStyleKey>//"You're free to vote on it. Or you would be, if you were a Shapeshifter. Or if Drishtya wasn't trying to take away the right to judge her from us."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"I can still voice my opinion on the matter, can I not? You have the rights to doubt Valtan's intentions and to denounce her methods, but she was determined that it was the right thing to do, at least for those she cared about the most."//</span>

<span @style=$chNer.colorStyleKey>//"Let us put aside the idea that she cares about anyone other than herself. There are good reasons why our laws are so strict about robbing someone's identity to the point that intentions and good will aren't contemplated. If everyone were to create lies when they saw fit, singles lies would turn into webs, and the webs would turn into a vague, easily shattered illusion that we know anything about the people around us. Shapeshifting might be used with intentions everything but noble, and that's a lesson my tribe learned with unspeakable pain. Even if you wanted to argue that the impostor's circumstances were extenuating, I doubt you were able to convince many around here that her declared intentions were truly honest."//</span>

//Nersmias' trust has decreased, and his conviction increased.//` + scriptStart() + `modifyNersmiasLocalTrust(-8); modifyPlayerHelpedValtan(1); modifyNersmiasLocalConviction(6);` + `<</s` + `cript>>`;
	return t;
}

window.getPvic00 = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"I must admit that Valtan is indeed quite the chaotic person."//</span>

<span @style=$chNer.colorStyleKey>//"It would be a fool's errand to deny it."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"And I can understand why your tribe is so strict and even hostile towards her attitude. Wanting to solidarize with Valtan is a complicated position."//</span>

<span @style=$chNer.colorStyleKey>//"Are you going somewhere with this?"//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"I don't have ulterior motives. I'm just doing a sincere effort to empathize with your position."//</span>

<span @style=$chNer.colorStyleKey>//"...Hmm."//</span>

//Your persuasion has increased Nersmias' trust, and his conviction increased.//` + scriptStart() + `modifyPlayerHelpedValtan(-1); IorPmodifiesNersmiasLocalTorC(4,'p','t'); modifyNersmiasLocalConviction(4);<</s` + `cript>>`;
	return t;
}

window.getPsdtsv = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"Sillan deserves to see Valtan."//</span>

<span @style=$chNer.colorStyleKey>//"She also deserves to be free from her, if so she wishes."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"I guess. But is that truly the best for her?"//</span>

<span @style=$chNer.colorStyleKey>//"How could it not? To make her see someone who has betrayed her in the most infamous way would only serve to rip her wounds open, and her current priority must be healing."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"They're wounds that need to cicatrize, and they won't be able to cicatrize if she's unable to confront Valtan. You know what they've meant to each other, the trust they've placed in each other and how much Sillan seemed to be able to sacrifize for Valtan. The last time they saw each other, Sillan held so much trust on her that she was convinced to commit a grave crime against the Shapeshifters: to pretend that she was Valtan to let her take her position as your tribe's Candidate. A few weeks later, she's apparently refusing to meet Valtan, under the grounds that she's been betrayed - but you know very well that she's only reached this conclusion due to the other opinions of those in the Shapeshifter tribe. If Sillan loses the opportunity to see Valtan ever again without confronting this different perspective she now has of her, at some point or another she will begin wondering if she has lost something precious, and regret it for the rest of her life."//</span>

<span @style=$chNer.colorStyleKey>//"She could fall for Valtan's poisoned words again."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"After a lifetime of being together, it's only taken a few weeks for Sillan to decide she doesn't want to see Valtan's face. If a short conversation between the two of them makes Sillan change her mind again, she clearly isn't very resolute in her current decision, and what I just told you is only doubly true."//</span>

<span @style=$chNer.colorStyleKey>//"..."//</span>

//Your persuasion has decreased Nersmias' conviction.//` + scriptStart() + `modifyPlayerHelpedValtan(1); IorPmodifiesNersmiasLocalTorC(-10,'p','c');` + `<</s` + `cript>>`;
	return t;
}

window.getPvhmrg = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"Does Glien mean much to you?"//</span>

<span @style=$chNer.colorStyleKey>//"We're not particularly close, but as I've already told you, your bravery and sacrifice are most praiseworthy."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"Then you should be thanking Valtan as well. I didn't bring Glien back alone."//</span>

<span @style=$chNer.colorStyleKey>//"...Now, that's..."//</span>

<<if $StVars.check6 gte 26>> \
<span style="color:green">Inspiration check: passed.</span>

Nersmias cannot help but blink, once, and twice, and thrice. His reason tells him not to believe you, but your stoic face remains determined to challenge his doubt.

<span @style=$chNer.colorStyleKey>//"I hadn't heard anything about this."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"Because she left me right after we reached the entrance to the deeper tunnels. She found I was trying to rescue Glien, taught me how I could free an unconscious Shapeshifter trapped within a mixture of rock and gleaming crystals and helped me carry her most of the way, but didn't want to talk to any other Shapeshifter."//</span>

Nersmias remains silent, his gaze turned to the ground. He's carefully evaluating what you're saying.

<span @style=$chNer.colorStyleKey>//"...I suppose that's not impossible. It could be that you had ulterior motives to lie in favor of Valtan... But it would be coherent that she was hidden in the deeper tunnels."//</span>

//Your inspiration has decreased Nersmias' conviction and increased his trust.//</span>` + scriptStart() + `modifyPlayerHelpedValtan(1); IorPmodifiesNersmiasLocalTorC(-8,'i','c'); IorPmodifiesNersmiasLocalTorC(4,'i','t');` + `<</s` + `cript>>` + `<<else>> \
<span style="color:red">Inspiration check: failed.</span>

<span @style=$chNer.colorStyleKey>//"Something you expect me to believe? No one saw her while you were carrying Glien back."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"That's because she left when we-"//</span>

<span @style=$chNer.colorStyleKey>//"Stop it. I don't know what ulterior motives you have to attribute your own merits to the impostor, but I, in truth, do not even wish to know. Spare me."//</span>

//Nersmias' conviction has increased, and his trust decreased.//` + scriptStart() + `modifyPlayerHelpedValtan(1); modifyNersmiasLocalConviction(6); modifyNersmiasLocalTrust(-8);` + `<</s` + `cript>>` + `<</if>> \\`;
	return t;
}

window.getPsacri = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"If Shapeshifters are chaotic and prone to deception, that's something you must learn to tolerate. If the Shapeshifter's tribe laws and customs force you all to live against your nature, what kind of corseted lives are you forcing yourselves to live?"//</span>

<span @style=$chNer.colorStyleKey>//"That's enough."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"No, it's not. You're literally imposing lives untrue to yourselves, to restrict your most fundamental freedom. I don't understand how you can even-"//</span>

<span @style=$chNer.colorStyleKey>//"Stop it!"//</span> He has been containing himself so far, but you've just seen a brief snap of his actual anger. He takes a moment to breathe down before formulating an appropriate response. <span @style=$chNer.colorStyleKey>//"The freedom you're talking about... Is the freedom of a child who takes everything for themself, who sees no issue in tormeting their peer for the sake of fun, who believes themself entitled to everything they desire. And we're actually free to engage in that behaviour."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"...You are?"//</span>

<span @style=$chNer.colorStyleKey>//"...As long as we leave the tribe. Like many did before us, and many will in the future. Everyone here is free to leave and decide to live by different rules. Yet this is the only Shapeshifter tribe that has stood the test of time."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"..."//</span>

<span @style=$chNer.colorStyleKey>//"What you've just defended is not a serious philosophy for any tribe to thrive, and it doesn't speak well of you to argue against our ancient laws and customs without understanding where they come from, and why they came to be."//</span>

//Nersmias' trust has decreased, and his conviction increased.//` + scriptStart() + `modifyPlayerHelpedValtan(1); modifyNersmiasLocalTrust(-8); modifyNersmiasLocalConviction(8);` + `<</s` + `cript>>`;
	return t;
}

window.getPsacfh = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"If everyone of you had a constant need to behave on a whim, regardless of the consequences... I could understand where you're coming from."//</span>

<span @style=$chNer.colorStyleKey>//"Pardon me?"//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"You come across as someone rough to deal with, hostile even. From the very first moment we met you, it looked like diplomacy or negotiation weren't options for you - and your positions do seem extreme. You're actually arguing for punishing someone with exile from her own tribe, and you won't even allow her to see someone she was immensely close to, not even just one last time."//</span>

<span @style=$chNer.colorStyleKey>//"..."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"But you make the condition of the Shapeshifters sound so perversely complicated that I think I can understand your intransigence, regardless of whether I agree with your methods or not."//</span>

<span @style=$chNer.colorStyleKey>//"...Hmm."//</span>

//Your persuasion increased Nersmias' trust.//` + scriptStart() + `IorPmodifiesNersmiasLocalTorC(6,'p','t');` + `<</s` + `cript>>`;
	return t;
}

window.getPvdtbt = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"I haven't seen how Valtan was like before she came to the Passion Temple, but during our time together I've got to meet her up close. I know she has a pushy, selfish side that she won't do much to hide, but if you think that's all there is to her, you only have a skewed view. She also cares about those around her and will not doubt in aiding them if she thinks they need it, but will not boast about it."//</span>

<<if $StVars.check6 gte 28>> \
<span style="color:green">Inspiration check: passed.</span>

<span @style=$chNer.colorStyleKey>//"It is so very lucky of you to have seen such a side of her."//</span> Nersmias replies in a neutral voice. <span @style=$chNer.colorStyleKey>//"So lucky, in fact, that your portrait of her might as well be a single drop of water trying to climb against the whole strength of the river. ...I will at least admit your bravery for trying to take such an unfavorable path."//</span>

//...I didn't convince him, did I?//
<<else>> \
<span style="color:red">Inspiration check: failed.</span>

<span @style=$chNer.colorStyleKey>//"It is quite arrogant of you to call my view of Valtan skewed after having lived a few weeks with her, when I have known her for her whole life. Perhaps you should try to vow for her again after twenty years have passed?"//</span>

//Nersmias' trust decreased.//` + scriptStart() + `modifyNersmiasLocalTrust(-8)` + `<</s` + `cript>><</if>>`;
	return t;
}

window.getPiwriv = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"I have Valtan wrapped around the finger. Give it a few more weeks, and she won't be able to take a breath without my permission."//</span>

<span @style=$chNer.colorStyleKey>//"Where are you going with this?"//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"I know that Valtan can be trouble at times if she goes unchecked, which is why I'm making some effort to keep her on a short leash. It might be the case that she's going to keep her position at the Passion Temple no matter what you do, but you should at least rest easy that I'll make sure she fulfills her duties as properly as possible."//</span>

<<if $StVars.check6 gte 26>> \
<span style="color:green">Inspiration check: passed.</span>

<span @style=$chNer.colorStyleKey>//"...That could be a good form of damage control."//</span> He ponders for a while on your words, making a careful evaluation. <span @style=$chNer.colorStyleKey>//"Hmm. At least you seem to be somewhat aware of the potential issues this situation might impose on the Passion Temple. I'll make you an offer: if you can somehow prove to me that you deserve the trust of my tribe, I might... Speak in your favor. It may not sound like much, but gathering support across the Valley will eventually aid you in your competition as Candidate."//</span>

//Your inspiration largely increased Nersmias' trust. Nersmias' conviction decreased.//
//Your respect in the Shapeshifter tribe has increased.//` + scriptStart() + `IorPmodifiesNersmiasLocalTorC(8,'i','t'); modifyNersmiasLocalConviction(-10); gC("chPlayerCharacter").ssRsp += 150;` + `<</s` + `cript>>` + `<<else>> \
<span style="color:red">Inspiration check: failed.</span>

<span @style=$chNer.colorStyleKey>//"It's... It's... Sigh."//</span> He breathes out in a defeatist tone. <span @style=$chNer.colorStyleKey>//"Those were all the right words of the person I'd like you to be. Someone capable, pragmatic, and with good sense in the Passion Temple. ...But you lack conviction."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"What do you mean?"//</span>

<span @style=$chNer.colorStyleKey>//"I mean that I trust your honesty, but not your judgement. I think you're far too confident in your relationship with Valtan, and you can't really back your offer."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"...But..."//</span>

<span @style=$chNer.colorStyleKey>//"Please. Do not insist."//</span>
<</if>> \\`
	return t;
}

window.getPvis = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"Don't tell anyone I said this..."//</span> You look back to the entrance of the Temple, making sure you two are alone. <span @style=$chPlayerCharacter.colorStyleKey>//"But you're right about Valtan. She doesn't deserve your trust, nor mine, nor anyone's. She's a two-faced bastard who would backstab you as soon as she feels like it. She is, I could even say, simply scum."//</span>

<span @style=$chNer.colorStyleKey>//"Hahaha!"//</span> This might be the most joyous laugh you have ever heard come out of this man. Perhaps even the only honest one. <span @style=$chNer.colorStyleKey>//"I didn't expect such brutal honesty. It's good to know that there's at least someone in the Passion Temple who knows of her nature."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"You can trust me. I hope I can trust you, in turn."//</span>

<span @style=$chNer.colorStyleKey>//"Of course. You must surely understand the mercilessness in my behaviour. It doesn't really come easy, but the stakes are too high for me not to do everything I can."//</span>

//Nersmias' trust and conviction have largely increased.//` + scriptStart() + `modifyPlayerHelpedValtan(-5); modifyNersmiasLocalTrust(12); modifyNersmiasLocalConviction(20);` + `<</s` + `cript>>`;
	return t;
}

window.getPsuhA = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"Would you stop doing that?"//</span>

<span @style=$chNer.colorStyleKey>//"Doing what?"//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"What you're doing with your eyes... And you mind..."//</span>

<span @style=$chNer.colorStyleKey>//"...Do you want me to stop looking at you? Sounds like a most improper way to hold a conversation."//</span>

//He's going to play dumb, isn't he...?//`
	return t;
}

window.getPsuhB = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"How about we stop it?"//</span>

<span @style=$chNer.colorStyleKey>//"You're free to leave whenever you want."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"I don't mean the conversation... I mean messing with each other's minds."//</span>

<span @style=$chNer.colorStyleKey>//"You're messing with my mind? That sounds like most improper behaviour to have against someone who has invited you into his home."//</span>

//He's going to play dumb, isn't he...?//`
	return t;
}

window.getPsuhC = function() {
	var t = `<span @style=$chNer.colorStyleKey>//"...This conversation is over. You may leave."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"...Huh? What was that?"//</span>

<span @style=$chNer.colorStyleKey>//"I know what you were trying to do, and I won't have any of it. You should leave now, before I decide it's fit to denounce you have attempted to assault me."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"..."//</span>

//He's going to play that card after what he did to Valtan...? What a scumbag.//`
	return t;
}

window.getPhpcta = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"A High Priestess should mainly be looking for those around her. From the Passion Temple, from her tribe, from those of all the tribes."//</span>

<span @style=$chNer.colorStyleKey>//"Is the High Priestess to be a caretaker for the peoples of the Valley?"//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"What better service to the Goddess could there be than ensuring the well-being of her creation?"//</span>

<span @style=$chNer.colorStyleKey>//"At the very least, it's a worthy attitude."//</span>

//Nersmias' trust and conviction have increased. Your standing with the Shapeshifter tribe has increased.//` + scriptStart() + `modifyNersmiasLocalTrust(6); modifyNersmiasLocalConviction(6); gC("chPlayerCharacter").ssRsp += 50;` + `<</s` + `cript>>`;
	return t;
}

window.getPhpcej = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"To make sure that justice reigns, no matter who's committing which misdeed."//</span>

<span @style=$chNer.colorStyleKey>//"A most decorous answer. Justice might as well be something that the Valley is lacking, something which could make sure all the right pieces fall in place. A Valley where justice is sure to be served, all the righteous ones have less to fear."//</span>

//Your inspiration has increased Nersmias' trust, and his conviction has increased. Your standing with the Shapeshifter tribe has increased.//` + scriptStart() + `IorPmodifiesNersmiasLocalTorC(6,'i','t'); modifyNersmiasLocalConviction(6); gC("chPlayerCharacter").ssRsp += 150;` + `<</s` + `cript>>`;
	return t;
}

window.getPhpcmo = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"To make sure that order is safeguarded from all."//</span>

<span @style=$chNer.colorStyleKey>//"A very traditional position, for a High Priestess."//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"It's also not something that Valtan might be very concerned with."//</span>

<span @style=$chNer.colorStyleKey>//"Precisely. I'm glad to see that at least one Candidate properly understands the role of the High Priestess."//</span>

//Nersmias' trust and conviction have increased. Your standing with the Shapeshifter tribe has increased.//` + scriptStart() + `modifyNersmiasLocalTrust(10); modifyNersmiasLocalConviction(6); gC("chPlayerCharacter").ssRsp += 150;` + `<</s` + `cript>>`;
	return t;
}

window.getPhpckp = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"To ensure that the Passion Temple remains powerful, and to defend the Valley from any foe."//</span>

<span @style=$chNer.colorStyleKey>//"We have had foes threatening the Valley, and very recently at that."//</span> Nersmias comments. <span @style=$chNer.colorStyleKey>//"But the power of the tribes themselves has always been instrumental for the Valley to succeed - how would you guarantee that the Passion Temple won't become a threat to us instead?"//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"There's little the Passion Temple can do for the tribes without power to back our position."//</span>

<span @style=$chNer.colorStyleKey>//"And is that the position of a leader, a mediator, or a tyrant?"//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"Not the one of a tyrant. ...I hope."//</span> You reply without great conviction.

<span @style=$chNer.colorStyleKey>//"Hmm."//</span>

//Nersmias' trust has decreased, and his conviction increased. Your standing with the Shapeshifter tribe has decreased.//` + scriptStart() + `modifyNersmiasLocalTrust(-8); modifyNersmiasLocalConviction(8); gC("chPlayerCharacter").ssRsp -= 150;` + `<</s` + `cript>>`;
	return t;
}

window.getPcsbhp = function() {
	var t = `<span @style=$chPlayerCharacter.colorStyleKey>//"Regardless of my other opinions about her, I can agree that Valtan shouldn't become the High Priestess."//</span>

<span @style=$chNer.colorStyleKey>//"It's always good to find points in common. But might I ask why?"//</span>

<span @style=$chPlayerCharacter.colorStyleKey>//"It might be an oversimplification to claim that she only cares about herself, and it would even be unfair to deny that she has any talents at all, but I don't think her priorities are in the right place."//</span>

<span @style=$chNer.colorStyleKey>//"And what priorities should a High Priestess have, in your opinion?"//</span>`
		+ "\n\n" + getLinkToNSBpassageNname("hpcta","Caring for those around her")
		+ "\n" + getLinkToNSBpassageNname("hpcej","Ensuring justice")
		+ "\n" + getLinkToNSBpassageNname("hpcmo","Maintaining order")
		+ "\n" + getLinkToNSBpassageNname("hpckp","Becoming powerful to defend the Valley");
	return t;
}

window.nsbGetButtonToMap = function() {
	var t = `<<link [[Continue|Map]]>><<s` + `cript>>finishFaSeNSB();<</s` + `cript>><</link>>`;
	return t;
}

/////

window.nsbGetEndingNWPLC = function() { // No willpower, low conviction
	var t = colorText("Ending A reached: No willpower, low Nersmias conviction.","khaki") + `
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"I... I..."//</span>
	
	<span @style=$chNer.colorStyleKey>//"You seem tired. You should leave already."//</span>
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"No... I'm not done with you... I'm too close to..."//</span>
	
	The purple priest sighs, tired of your pointless attempt to continue.
	
	//It is time to leave.//
	
	//It isn't. I can still convince you.//
	
	<span @style=$chNer.colorStyleKey>//"...I cannot agree to any of your demands."//</span>
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"But-"//</span>
	
	<span @style=$chNer.colorStyleKey>//"...But I could allow you to speak to Sillan."//</span>
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"...Me? Why?"//</span>

	<span @style=$chNer.colorStyleKey>//"I can't allow Valtan to speak to Sillan against Sillan's wishes, but she mentioned nothing about you, and I can recognize that your words don't lack substance. I could allow you to speak to Sillan, but only if you do something for me in exchange."//</span>
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"I... accept..."//</span>
	
	<span @style=$chNer.colorStyleKey>//"Don't you want to know what it is first?"//</span>
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"I don't care anymore... I can't give up at this point."//</span>
	
	<span @style=$chNer.colorStyleKey>//"It might be extremely harmful for you, and even for the Passion Temple. Neither Drishtya nor your peers will take it nicely."//</span>
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"I told you... I accept."//</span>
	
	<span @style=$chNer.colorStyleKey>//"...Fine. Please follow me."//</span>
	
	<<link [[Continue|FaSe GFS PactStart]]>><<s` + `cript>>addToStVarsList("nePtPc");<</s` + `cript>><</link>>`;
	return t;
}

window.nsbGetEndingNWPHC = function() { // No willpower, high conviction
	var t = colorText("Ending B reached: No willpower, high Nersmias conviction.","khaki") + `
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"I... I..."//</span>
	
	<span @style=$chNer.colorStyleKey>//"You seem tired. You should leave already."//</span>
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"No... I'm not done with you..."//</span>
	
	The purple priest sighs, tired of your pointless attempt to continue.
	
	//It is time to leave.//
	
	//It isn't.//
	
	//It is.//
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"You haven't considered..."//</span>
	
	<span @style=$chNer.colorStyleKey>//"Stop it already..."//</span>
	
	//It's useless...//
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"It's not useless! I can... I can..."//</span>
	
	<span @style=$chNer.colorStyleKey>//If you keep going, you will have to be taught a lesson.//</span>
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"Shut up with your mind tricks! You..."//</span>
	
	The floor and the walls seem to tremble, and you lose your balance.
	
	<span @style=$chNer.colorStyleKey>//"Do not fall, now. Are you feeling unwell?"//</span>
	
	He approaches you to hold your arm, and his eyes strike yet again.
	
	<span @style=$chNer.colorStyleKey>//"This will not do, not at all... If you're feeling ill, you do need some treatment. Now follow me inside."//</span>
	
	<<link [[Continue|FaSe GFS ForcedStart]]>><<s` + `cript>><</s` + `cript>><</link>>`;
	return t;
}

window.nsbGetEndingZC = function() { // Zero conviction
	var t = colorText("Ending C reached: Nersmias conviction depleted","khaki") + `
	
	<span @style=$chNer.colorStyleKey>//"I have heard enough. ...And I can't agree to any of your demands."//</span>
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"What? But I-"//</span>
	
	<span @style=$chNer.colorStyleKey>//"However."//</span> He stops, his eyes piercing you through your whole body. <span @style=$chNer.colorStyleKey>//"I can allow you to speak to Sillan, provided you fulfill one condition."//</span>
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"Me? Speak to Sillan? Why?"//</span>
	
	<span @style=$chNer.colorStyleKey>//"Because you're not fully unreasonable, and I can't say for certain that you're driven by evil intentions. I cannot say the same of Valtan, or Drishtya. But I can allow you to speak to Sillan for a short time to calm your soul with the certainty that she's safe."//</span>
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"And what's your condition?"//</span>
	
	<span @style=$chNer.colorStyleKey>//"I will impose a safety measure. You can imagine what it is."//</span>
	
	//Likely hypnosis of some kind.//
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"..."//</span>
	
	//I don't like it, but this is about as far as I can go. And I can't let this opportunity go to waste.//
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"I accept."//</span>
	
	<span @style=$chNer.colorStyleKey>//"Good choice. Follow me."//</span>
	
	<<link [[Continue|FaSe Sillan ConvStart]]>><<s` + `cript>><</s` + `cript>>addToStVarsList("nePtCo");<</link>>`;
	return t;
}

window.nsbGetEndingZTLWP = function() { // Zero Trust, Low Willpower
	var t = colorText("Ending D reached: Nersmias trust depleted, low willpower.","khaki") + `
	
	` + scriptStart() + `State.variables.chPlayerCharacter.willpower.current = 0;<</s` + `cript>> \
	<span @style=$chNer.colorStyleKey>//"I have heard enough. You can leave already."//</span>
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"What? But I haven't even-"//</span>
	
	<span @style=$chNer.colorStyleKey>//"Believe me, you have said enough. More than enough for me to understand that you won't see reason, and you will never be more of an ally than a liability."//</span>
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"What a rude thing to say, you..."//</span>
	
	<span @style=$chNer.colorStyleKey>//"If all you have left to offer me is your anger..."//</span>
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"I've never met a more presumptuous and arrogant..."//</span>
	
	//It's fine. Let it all out.//
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"...little prick envolved by his own airs of grandeur..."//</span>
	
	//Let your anger out, throw it all against me, and turn docile.//
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"...looking everyone over the shoulder, as if he..."//</span>
	
	<span @style=$chNer.colorStyleKey>//And when you're done, give yourself to me.//</span>
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"...was some sort of... Of..."//</span>
	
	<span @style=$chNer.colorStyleKey>//"Are you finished?"//</span>
	
	//You have ran out of <span style="color:darkslateblue">willpower</span>.//
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"..."//</span>
	
	<span @style=$chNer.colorStyleKey>//"..."//</span>
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"...Yes."//</span>
	
	<span @style=$chNer.colorStyleKey>//"Good. Now follow me."//</span>
	
	<<link [[Continue|FaSe GFS ForcedStart]]>><<s` + `cript>>addToStVarsList("nePtFP");<</s` + `cript>><</link>>`;
	return t;
}

window.nsbGetEndingZTHWP = function() { // Zero trust, High Willpower
	var t = colorText("Ending E reached: Nersmias trust depleted, high willpower.","khaki") + `
	
	<span @style=$chNer.colorStyleKey>//"I have heard enough. You can leave already."//</span>
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"What? But I haven't even-"//</span>
	
	<span @style=$chNer.colorStyleKey>//"Believe me, you have said enough. More than enough for me to understand that you won't see reason, and you will never be more of an ally than a liability."//</span>
	
	//What a rude thing to say.//
	
	<span @style=$chPlayerCharacter.colorStyleKey>//"Fine. I'll be leaving. But this isn't over."//</span>
	
	<span @style=$chNer.colorStyleKey>//"Hmpf."//</span>
	
	<<link [[Continue|Map]]>><<s` + `cript>>finishFaSeNSB();<</s` + `cript>><</link>>`;
	return t;
}

///// ///// /////


