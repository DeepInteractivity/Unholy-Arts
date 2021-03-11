
////////// VIRGINITY CLASS //////////
// Actions that begin vaginal or anal penetrative actions make take virginity checks
// If successful, this must send a message to scene, which must display this event

window.Scroll = function(key,title,type) {
	this.key = key;
	this.title = title;
	this.type = type;
	
	this.getWeight = function(character) {
		return 20;
	}
	
	this.mayBeFound = function(character) {
		return true;
	}
	this.firstTimeEffect = function(characters) {
		return "0";
	}
	this.getContent = function() {
		return "Standard scroll content";
	}
	
}

		// LORE
// On Aether
window.getScrollOnAetherContent = function() {
	var content = "Aether flows through all things, and all things that move are moved by aether. Aether is the vital energy of the Goddess, her will and her very self. Life, formed by it, is but a gift that She grants us mortals.\n\n"
				+ "Aether is strengthened by the passion each living being puts into life, and deteriorates when the life holding on to it loses its capacity to leave its mark in the world. A life unable to hold strong aether is a life that is about to expire.\n\n"
				+ "Because aether is required for life to exist, life can only be created when aether gives it form. The strongest time for aether to leave and join a living creature, is when that creature shares its love and its carnal passion. When compatible creatures under the right circumstances exchange their passion, some of their aether is fused, and a new life is created.\n\n"
				+ "There are two forms of aether: natural aether and vital aether. Natural aether is present in all parts of the world, and gives it form: warmth, cold, the movement of water, or the light of the sky are all kinds of natural aether. Vital aether is condensed natural aether that holds a life together. A living being's vital aether is constantly gained and lost in small quantities, when it absorbs natural aether or its vital aether turns back into natural aether. Magic is the process in which conscious creatures control the flow of aether for a given purpose, as it was taught to us by the Goddess.";
	return content;
}
window.createScrollOnAether = function() {
	var scr = new Scroll("onAether","On Aether","lore");
	scr.firstTimeEffect = function(characters) {
		var textResults = "";
		var expPoints = 50;
		for ( var character of characters ) {
			gC(character).intelligence.addExperience(expPoints);
			textResults += gC(character).getFormattedName() + " gained " + expPoints * gC(character).intelligence.affinity + " intelligence experience points.\n";
		}
		return textResults;
	}
	scr.getContent = getScrollOnAetherContent;
	return scr;
}

// On family
window.getScrollOnFamilyContent = function() {
	var content = "Families are the unions between persons who share many dimensions of their lives, such are their roofs and their blood. These groups of people often share certain duties towards each other.\n\n"
				+ "Life in the Confined Valley is diverse, both in their customs and their very nature. This is why families in the Valley are diverse as well. Most Gaanidan and Ashwalker families are started with the union of one man and one woman, in the case of the former they last for the rest of their lives and they often limit sexual activities to those with that one partner, while the latter are much more flexible in both aspects, but it is suspected that Ashwalkers used to follow customs similar to the Gaanidan ones ages ago, when they hadn't been for long in the Valley.\n\n"
				+ "Leirien families are led by a Matriarch or Patriarch, who watches over all of their members, solving disputes and providing guidance and education. The size of these families mostly depend on the capacity and resolve of this leading figure, and the average would be a couple dozens of members per family. When a Leirien reaches maturity, they leave their family and join a different one.\n\n"
				+ "In the case of the Beastkin, it is a recent development that they are forming harem families, led and controlled by a strong and dominant man or woman, who tries and brings those they feel attracted to to their flock. Before this, they didn't have any standard model of family, and each person decided what kind of family they wanted to form a part of at any given stage of their lives and tried to act accordingly.\n\n"
				+ "The most peculiar situation is perhaps that of the Shapeshifters, who have no families at all, or perhaps they have one single family, composed by every member of their tribe. This could be related to how unique is the Shapeshifter birth, which takes place in large bodies of water where these peoples have sex with frequency, after unclear and perhaps variable amounts of time since the presumed conception, a process that makes it impossible to determine a Shapeshifter's parents.";
	return content;
}
window.createScrollOnFamily = function() {
	var scr = new Scroll("onFamily","On Family","lore");
	scr.firstTimeEffect = function(characters) {
		var textResults = "";
		var expPoints = 50;
		for ( var character of characters ) {
			gC(character).empathy.addExperience(expPoints);
			textResults += gC(character).getFormattedName() + " gained " + expPoints * gC(character).empathy.affinity + " empathy experience points.\n";
		}
		return textResults;
	}
	scr.getContent = getScrollOnFamilyContent;
	return scr;
}

// The Wilds
window.getScrollTheWildsContent = function() {
	var content = "Not everywhere in the Confined Valley is safe. Outside of the tribes, creatures and monsters that do not share the values of civilized peoples hunt for prey. While it is unheard of a monster from the Valley to take someone's life, they desire their energy and rob it, sometimes even kidnapping their victims to feed on them for long periods of time.\n\n"
				+ "The members of the tribes who do not wander off have nothing to fear, as the creatures have learned to respect us when we're in large numbers, but those who wish to travel and meet other tribes or explore the Valley must be considerably cautious. It is advisable to be accompanied by strong companions, as well as being able to put on a fight by yourself.";
	return content;
}
window.createScrollTheWilds = function() {
	var scr = new Scroll("theWilds","The Wilds","lore");
	scr.firstTimeEffect = function(characters) {
		var textResults = "";
		var expPoints = 50;
		for ( var character of characters ) {
			gC(character).perception.addExperience(expPoints);
			textResults += gC(character).getFormattedName() + " gained " + expPoints * gC(character).perception.affinity + " perception experience points.\n";
		}
		return textResults;
	}
	scr.getContent = getScrollTheWildsContent;
	return scr;
}

		// SHORT STORIES
// Basic of sex
window.getScrollTheBasicsOfSexContent = function() {
	var content = 'Tags: Futanari, Female x FemHerm\n\n'
				+ '//"I have always wanted you."// The words escaped her mouth in a single moment, fast and short as the pause that interrupted their kiss.\n\n'
				+ '//"I know. And now you have me all to yourself"//, replied her lover. The wolfgirl was embracing her companion around the waist, pushing her closer and closer to the wall. //"Tell me, Leap, is it true that you... below there..."//\n\n'
				+ '//"How about you find out by yourself?"// Leap took her feline friend\'s hand and placed it next to her own groin. Gillis\' curiosity overcame her nervousness, and moved a little to the left.\n\n'
				+ '//"Oh! It\'s true."//\n\n'
				+ '//"Of course it is. And you want it whole, don\'t you?"//\n\n'
				+ 'Gillis nodded quietly.\n\n'
				+ '//"Good."// Leap kissed the catgirl\'s cheek and dragged her tongue along her companion\'s ear. //"Turn around."//\n\n'
				+ '//"Eeeh? You want to do it from behind?"//\n\n'
				+ '//"Don\'t you?"//\n\n'
				+ 'Gillis blushed, but didn\'t reply. The wolfgirl placed a hand on her shoulder and the catgirl turned around by herself. Gillis was soon facing the wall, unable to decide if she should place her hands on it, when she felt her lover taking her pants down. Leap got up, held her close, and... //"Eek!"// ...the kitty felt her partner\'s cock touching her behinds. Her instincts fired up and she hugged the wall, but she immediately felt Leap again as she hugged her.\n\n'
				+ '//"Do you know why they called me Treacherous Leap in the Temple?"//\n\n'
				+ '//"...Because you jump on your enemies..."//\n\n'
				+ '//"From behind."// Gillis felt something hot touching her pussy, and despite not being able to see it, she knew exactly what it was. //"I\'m going in. Are you ready?"//\n\n'
				+ '//"Yes."// And Leap kissed her, and her dick kissed her insides.';
	return content;
}
window.createScrollTheBasicsOfSex = function() {
	var scr = new Scroll("theBasicsOfSex","The Basics of Sex","shortStory");
	scr.firstTimeEffect = function(characters) {
		var textResults = charactersLearnSceneActions(characters,["pushHipsBack","scissor","thrust","mountFromBehind","rideDick","pushDickBack"]);
		return textResults;
	}
	scr.getContent = getScrollTheBasicsOfSexContent;
	return scr;
}

// The taste of pleasure
window.getScrollTheTasteOfPleasure = function() {
	var content = 'Tags: Male x Female, oral, shapeshifting/transformation, power exchange, roleplay, maledom, femsub\n\n'
				+ '//"Are you ready?"//\n\n'
				+ '//"I am. Here I go."// And his skin started taking form: the form of scales. They were pointy and sharp at first, but they got closer and joined each other, and they took a softer and softer texture, until his whole body was that of a lizardly humanoid.\n\n'
				+ '//"Tremble, slime! I have bested your companions and no one\'s here to defend you anymore. By right of conquest, you belong to me now!"//\n\n'
				+ '//"Oooh, nooo! My dear friends, who did their best to keep me safe! I can\'t believe you did this to them!"//\n\n'
				+ '//"And far worse things I\'ll do, if you don\'t accept your new place and serve me!"//\n\n'
				+ '//"I beg you not! I yield to you, my new master! Please leave them alone and tell me what it is that you desire!"//\n\n'
				+ '//"Lose not a single moment, and prove to me your submission. Come here and kneel before me."//\n\n'
				+ 'Tantian obeyed and knelt before the lizard, far more eager than she was suppossed to. //"Shall I pleasure you?"//\n\n'
				+ '//"You shall."// And Druzta showed the Shapeshifter woman his member.\n\n'
				+ 'She moved her nose close to his dick, and savoured its smell with a small breath first, and a far deeper one next. Then she stuck her tongue out, and traced a line with it along the spear. She placed small kisses here and there, put a lateral section of the member between her lips, and moved her mouth up and down, her tongue tasting every inch that got inside.\n\n'
				+ '//"I see you\'re enjoying your submission far too much... Slut."//\n\n'
				+ 'Tantian\'s left hand was massaging her own clitoris. //"Oooh, I\'m so sorry, my dearest companions. It appears I have got addicted to monster cock!"//\n\n'
				+ '//"Such a shame that they aren\'t awake to see it. Now eat it whole."//\n\n'
				+ 'And she obeyed. She put the tip inside first, and licked it throughly, while she massaged the rest of the dick with her right hand. The Shapeshifter woman moved her eyes up, and she found Druzta\'s satisfied smile, looking at her with approval. The reptilian man placed his hand on her head, and petted her. She decided to move on, and her lips advanced along the cock, slurping greedily. The lizard soon took the lead of the situation, as he pushed her head towards his groin, and his dick inside her. He was fucking her throat.\n\n'
				+ 'Tantian\'s right hand was struggling to keep his leg grabbed, in order to not to lose balance, but her other hand\'s fingers were penetrating her own pussy with harsh intensity. Just as she came, so did he, and she felt her semi-liquid gullet get filled with a new fluid. She gulped it on the go, and the dick immediately left her mouth.\n\n'
				+ 'Moments later, his partner was already turning back into his usual Shapeshifter self.\n\n'
				+ '//"Aaah, that wasn\'t easy. Did you like it?"// Druzta asked her.\n\n'
				+ '//"I loved it. ...What do you want me to turn into next time?"//';
	return content;
}
window.createScrollTheTasteOfPleasure = function() {
	var scr = new Scroll("theTasteOfPleasure","The Taste Of Pleasure","shortStory");
	scr.firstTimeEffect = function(characters) {
		var textResults = charactersLearnSceneActions(characters,["kneel","makeKneel","legHoldHead","getBlowjob","fuckFace","suckDick","lickPussy",
						  "rideFace"]);
		return textResults;
	}
	scr.getContent = getScrollTheTasteOfPleasure;
	return scr;
}

// Surprised in the rear
window.getScrollSurprisedInTheRearContent = function() {
	var content = 'Tags: Male x Female, Teasing, Anal, Toys, Soft exhibitionism\n\n'
				+ 'The young couple had an uncommon privilege. While the vast majority of Ashwalkers who wanted to witness the dances or the fights had to walk through the whole village and take a seat before the stage, their house was fairly close to the amphitheater, and they could watch the spectacles from the terrace at their roof.\n\n'
				+ 'He, however, had woken up in a mischievous mood, and had other intentions. Just as the first dance started, he grabbed her butt. Vishllyin took it as a gesture of affection at first, but his middle finger soon traced a line... Straight to her ass.\n\n'
				+ '//"Oh, stop that."//\n\n'
				+ '//"Stop what?"//\n\n'
				+ 'She immediately realized the game. Hidden behind the terrace\'s walls, no one below could figure out something was going on behind her pants, but abrupt movements would definitely get someone\'s attention. Therefore, if she actually wanted to watch the dance, she couldn\'t fight this intruding hand.\n\n'
				+ '//"Hello, Vish! Hi Drill! You two sure are lucky, with the dances coming right to your home!"//\n\n'
				+ 'The couple greeted their unsuspecting neighbour below, Vishllyin showing a forced smile, Ashdrillyal with a confident, happy one, and the old woman went away to take her own seat.\n\n'
				+ '//"This idiot is going to get it."// thought Vish, and started massaging her own husband\'s anus. His expression changed, but not too much. //"Enjoying the dances, dear?"//\n\n'
				+ '//"Yes! It\'s amazing, the kind of moves they come up with."//\n\n'
				+ 'Behind their friendly words, they both had started fingering each other through their clothes. At the pace things were going, there would be no victor in this battle, and she wouldn\'t be able to pay attention to the dances at all.\n\n'
				+ '//"I need a small seep of water, I\'ll be right back."//\n\n'
				+ '//"Don\'t take too long, Vish. The show is very interesting today. It would be a shame if you missed it."//\n\n'
				+ '//"You\'ll swallow your words, asshole."// she thought.\n\n'
				+ 'When Vish came back, she put herself immediately next to her husband, and he didn\'t lose a moment to start fingering her again. Ashdrillyal got very confused, however, when he felt her wife\'s hand entering his pants from behind, her fist closed.\n\n'
				+ 'When he realized her intentions, it was already too late: the cold metal of the plug entered him in a single movement.\n\n'
				+ '//"Waaah!"// he fought to silence his own shout, to little use. A few spectators closest to their home turned back to check what was happening. //"It\'s... It\'s too beautiful! They have so much talent that I got excited. That\'s all."// He got confused faces from his fellow tribesmen.\n\n'
				+ '//"That\'s wonderful, dear. But please be quiet, and remain close to me."// With the safe end of the plug on her hand, Vish now held the asshole of her husband in place, confident that he would cause no more trouble for the rest of the day.'
	return content;
}
window.createScrollSurprisedInTheRear = function() {
	var scr = new Scroll("surprisedInTheRear","Surprised in the Rear","shortStory");
	scr.firstTimeEffect = function(characters) {
		var textResults = charactersLearnSceneActions(characters,['strokeAss','penetrateAss','analThrust','doublePenetration','doubleThrust']);
		return textResults;
	}
	scr.getContent = getScrollSurprisedInTheRearContent;
	return scr;
}

// Payback for the thief
window.getScrollPaybackForTheThiefContent = function() {
	var content = 'Tags: Female x Male, bondage, domination, femdom, malesub\n\n'
				+ 'She had earned the title of "The witch", and no other Leirien called her any other way anymore. It was an appropiate name, given her natural magical talent and her solitary life. She didn\'t hold any particularly mean grudges against anyone, but her condition made it important for her to always remain wary of any undesired visitors. This constant vigilance was what made her wake up, despite the remarkable quietness of the intruder. He was already leaving, but she immediately understood the situation and left the bed, and then the shack, and shouted to the fleeing catboy:'
				+ '//"I beg you to stop!"//\n\n'
				+ 'It was probably the strange choice of words that made the Beastkin man stop and turn back. He was fast and she wouldn\'t be able to catch him anymore, and that made him confident enough to decide that talking to her was worth satisfying his curiosity.\n\n'
				+ '//"You beg me? Aren\'t you the powerful witch of the forest?"//\n\n'
				+ '//"Your words flatter me, but I\'m no match against such an agile athlete in a race. Given that you hold the upper hand, perhaps you\'ll listen to my words?"//\n\n'
				+ '//"Very well. What do you have to say?"//\n\n'
				+ 'She managed to get a better look at him, and found that he was exceptionally handsome. He had lean and well marked facial features. His eyes appeared to have a most peculiar green colour.\n\n'
				+ '//"I understand that it\'s taken you a great effort to rob me, but what you hold is dear and precious to me."//\n\n'
				+ '//"Do you even know what I\'ve taken?"//\n\n'
				+ '//"Of course. You\'ve stolen my heart."//\n\n'
				+ '//"Your what?"//\n\n'
				+ 'And his surprise did the trick, and he fell to the ground. While they were talking, the cunning witch had been repositioning roots and vines that were close to the Beastkin, and it only took her a moment to throw them to his legs. A strong strike made him fall, and the second one got his ankles were bound. He reacted fast and struggled to liberate himself with his hands, but these, too, ended tied up.\n\n'
				+ 'The witch calmly walked up to the thieving catboy, who had both hands and feet stretched and locked, forming a cross, and was unable to leave the ground.\n\n'
				+ '//"The truth is that I haven\'t taken anything, I only wanted to take a look at you."//\n\n'
				+ '//"And my truth... Is that you have taken my heart..."// As she said this, she removed the man\'s pants, exposing his increasingly erect cock. //"But don\'t worry."// She licked her lips. //"I\'m going to fuck you until I get it back. ...Perhaps it\'ll take a few days."// And she lowered herself on him.';
	return content;
}
window.createScrollPaybackForTheThief = function() {
	var scr = new Scroll("paybackForTheThief","Payback for the thief","shortStory");
	scr.firstTimeEffect = function(characters) {
		var textResults = charactersLearnSceneActions(characters,['spanking','holdArms','vinesHoldArms']);
		return textResults;
	}
	scr.getContent = getScrollPaybackForTheThiefContent;
	return scr;
}

// Pillow feet fight
window.getScrollPillowFeetFightContent = function() {
	var content = 'Tags: Female x Female, footjob\n\n'
				+ 'It was an annoyingly warm night, but if there was something that made it even harder for Belluillsha to sleep, that was having to share a bedroll with Ninllinshian. The two women were proud Ashwalker warriors, and they formed part of an expedition to put a group of monsters that had been too cocky in their place. They had already fulfilled their mission, but on the way home, Ninllinshian had destroyed her own bedroll during a nightmare, and Belluillsha now had to share hers. Each of them had placed their heads on opposite ends, and their feets were close to each other\'s knees. It was a long bedroll.\n\n'
				+ '//"Fuck this."// Bell thought, and she hit her companion with her heel bone, which woke her up.\n\n'
				+ '//"Mmm... What happened?"//\n\n'
				+ '//"Nothing."//\n\n'
				+ 'Silence followed for a few seconds, but then Bell hit her again.\n\n'
				+ '//"Can you stop that?"//\n\n'
				+ '//"If you don\'t like it you can leave my bed!"//\n\n'
				+ '//"I already told you I\'m sorry. I don\'t want this either."//\n\n'
				+ 'And Bell did it yet again. //"Oh, you made it this time!"// And so, a feet fight got started. They weren\'t particularly strong kicks and they would hardly injure each other, but they were definitely annoying and they wouldn\'t be sleeping any time soon. But one of them... Wasn\'t like the others.\n\n'
				+ '//"Aww!"// Bell shouted.\n\n'
				+ '//"I\'m sorry! I didn\'t want to hit you there."//\n\n'
				+ '//"You\'ve kicked my cunt!"//\n\n'
				+ '//"It wasn\'t my intention!"//\n\n'
				+ 'Bell moved her own foot with decision, and placed it at Ninllin\'s private parts.\n\n'
				+ '//"Please don\'t, please don\'t, I told you I\'m sorry, I\'m-"// Ninllin was revolving to get her companion\'s foot off herself, to little use. But she didn\'t expect what came next. //"I.. Nn... Nnngghh? Why?"//\n\n'
				+ 'Bell was now massaging Ninllin\'s pussy with her feet. //"Shut up and behave."//\n\n'
				+ '//"Ok, ok. But please don\'t hurt me."//\n\n'
				+ 'Bell\'s left foot was describing circular movements on her companion\'s clitoris with incredible care, while the right one was trying to push its big toe inside. Not much time later, Bell changed her position and moved her left leg down...\n\n'
				+ '//"Lick my ankle"//, she ordered. And Ninllin complied, because the ankle wasn\'t as smelly as the foot itself, and she was scared of Bell.\n\n'
				+ 'Belluillsha sighed. It wasn\'t the most pleasing activity for herself, especially given that her own parts were still aching, but it would be worth it. Ninllinshian reached her orgasm a few minutes later, and she passed out.\n\n'
				+ '//"Lucky me that you\'re like this."// She left the bedroll, dragged her companion out, and entered it again, happy and ready to sleep. //"Get tapped in the knee and you wake up in a single moment, but cum your brains out and no one will wake you up."// She sighed. //"At least now I have the whole bedroll for myself."//';
	return content;
}
window.createScrollPillowFeetFight = function() {
	var scr = new Scroll("pillowFeetFight","Pillow Feet Fight","shortStory");
	scr.firstTimeEffect = function(characters) {
		var textResults = charactersLearnSceneActions(characters,['dickFootjob','pussyFootjob','lickLegs']);
		return textResults;
	}
	scr.getContent = getScrollPillowFeetFightContent;
	return scr;
	
}

	// GAMEPLAY
// The basics of combat
window.getScrollTheBasicsOfCombat = function() {
	var content = '' +
				  '"Warfare in these lands is unlike anything we\'ve ever seen. Strikes that have always ended someone else\'s life may do nothing more than incapacitate their targets, at most, and it only lasts for a short while. Accordingly, this land\'s creatures have developed their own ways of fighting, much more effective under these strange conditions.\n\n'
				  + 'Rather than sparring until they manage to land fatal blows, our enemies fight to exhaust us, to make us run out of strength until we barely have control over our legs. Once we\'re on the ground, they jump onto us and... Oh, gods! My feeble mind barely has the will to keep on writing. They try to make us cum!\n\n'
				  + 'As strange as it sounds, when we\'re fighting in these lands, the strength of an orgasm depletes our energies, forcing us to wait for a while until we get recovered. Most luckily, not only we have had no casualties, the enemy hasn\'t captured any of us, either! After the last skirmishes, we\'ve always managed to flee. Let\'s make use of this precious time to understand how to fight back.\n\n'
				  + 'It is of the highest priority that all of us that are capable of fighting learn to endure sexual pleasure. Every second we manage to resist without reaching climax is one second we get closer to victory. Some techniques we\'ve been discussing are controlling our breathing, leaving our minds blank or focusing our attention in our arms\' and legs\' muscles. I think I will call these techniques the "Cold Guts", because one truly has to be a cold bastard to take their attention away from sex when they\'re doing the deed.\n\n'
				  + 'The next moves we talked about were pouncing and struggling. Pouncing is what these lands\' creatures do when they find someone weakened: they jump on them, throw them to the ground and hold them down to have sex. While most wait until the jump is secure, those non-humans with animal parts are keen to try much earlier - and damn me if they\'re not good at it. Once we\'re pinned down, it\'s usually best to struggle as much as possible until we kick our enemies out, which seems to be much easier to do if we haven\'t done much physical or mental work earlier in the day."\n\n'
				  + 'Notes on fighting in the Confined Valley, by Teitu, Gaanidan Warrior';
	return content;
}
window.createScrollTheBasicsOfCombat = function() {
	var scr = new Scroll("theBasicsOfCombat","The Basics of Combat","gameplayTips");
	scr.firstTimeEffect = function(characters) {
		var textResults = charactersLearnSceneActions(characters,['coldGuts']);
		return textResults;
	}
	scr.getContent = getScrollTheBasicsOfCombat;
	return scr;
}


State.variables.scrollsList = new pseudoList();
State.variables.scrollsList.onAether = createScrollOnAether();
State.variables.scrollsList.onFamily = createScrollOnFamily();
State.variables.scrollsList.theWilds = createScrollTheWilds();
State.variables.scrollsList.theBasicsOfSex = createScrollTheBasicsOfSex();
State.variables.scrollsList.theTasteOfPleasure = createScrollTheTasteOfPleasure();
State.variables.scrollsList.surprisedInTheRear = createScrollSurprisedInTheRear();
State.variables.scrollsList.paybackForTheThief = createScrollPaybackForTheThief();
State.variables.scrollsList.pillowFeetFight = createScrollPillowFeetFight();
State.variables.scrollsList.theBasicsOfCombat = createScrollTheBasicsOfCombat();

window.getScrollsStringList = function() {
	var scrollsList = [];
	for ( var s in State.variables.scrollsList ) {
		if ( State.variables.scrollsList[s] instanceof Scroll ) {
			scrollsList.push(State.variables.scrollsList[s].key);
		}
	}
	return scrollsList;
}
window.getScrollsCharMayFind = function(character) {
	var scrollsList = getScrollsStringList();
	var newScrollsList = [];
	for ( var scr of scrollsList ) {
		if ( gC(character).foundScrolls.includes(scr) == false && State.variables.scrollsList[scr].mayBeFound(character) ) {
			newScrollsList.push(scr);
		}
	}
	return newScrollsList;
}

window.getScrollTypeText = function(scr) {
	var txt = ""
	switch ( scr.type ) {
		case "lore":
			txt = "Lore";
			break;
		case "shortStory":
			txt = "Short story";
			break;
		case "gameplayTips":
			txt = "Gameplay tips";
			break;
	}
	return txt;
}

// Constructors, serializers, etc.
Scroll.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};

Scroll.prototype.clone = function () {
	return (new Scroll())._init(this);
};

Scroll.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new Scroll())._init($ReviveData$)', ownData);
};
