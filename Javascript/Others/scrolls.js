////////// SCROLL CLASS //////////

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
			textResults += gC(character).getFormattedName() + " gained " + (expPoints * gC(character).intelligence.affinity).toFixed(1) + " intelligence experience points.\n";
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
			textResults += gC(character).getFormattedName() + " gained " + (expPoints * gC(character).empathy.affinity).toFixed(1) + " empathy experience points.\n";
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
			textResults += gC(character).getFormattedName() + " gained " + (expPoints * gC(character).perception.affinity).toFixed(1) + " perception experience points.\n";
		}
		return textResults;
	}
	scr.getContent = getScrollTheWildsContent;
	return scr;
}

// Gleaming Caverns
window.getScrollGleamingCavernsContent = function() {
	var content = "The Shapeshifter tribe finds their home at the south of the Confined Valley, in a system of caves known as the Gleaming Caverns. The Caverns are hardly a hospitable environment for most forms of life, as food is scarce, its tunnels labyrinthine, and floods a most common issue - all of them conditions that the Shapeshifters aptly managed to adapt to.\n\n" +
	"The Caverns owe their name to the gleaming crystals, a rare material that's difficult to find at any place other than this area. Their most peculiar traits are that they disrupt the flow of aether within living beings they're in touch with, but whenever the aether is infused in them from a distance, they temporarily turn gelatinous, which allows to shape them into any desired form. As their name suggests, the crystals emit light, but they will stop doing so after a long time until they're exposed to the Sun. It is through the laborious effort of Shapeshifters that gleaming crystals are periodically charged and placed through some of the Caverns' corridors, effectively making them Gleaming.\n\n" +
	"The forests surrounding the Caverns are rich in ponds, marshes and rivers that find the end of their lives, carrying water that gets permeated into the ground, only to later fall down to its subterranean tunnels. Through most of them, the flow of the water is irregular and fairly unpredictable, sometimes even causing whole routes to flood. A few of them have exceptionally consistent precipitations, which made Shapeshifters decide to settle in them.\n\n" +
	"The tribe's construction efforts were focused in three areas: the building of their own village, paving selected tunnels to prevent travellers from getting lost in them, and the development of infrastructure to control the flow of water. Some of the most relevant places of their town are their assembly, often used as a theater, the Harmony Temple, under indirect control of the High Priestess, and their workshops, which contain furnaces and other tools to craft different types of ceramics.";
	return content;
}
window.createScrollGleamingCaverns = function() {
	var scr = new Scroll("gleamingCaverns","Gleaming Caverns","lore");
	scr.firstTimeEffect = function(characters) {
		var textResults = "";
		var expPoints = 75;
		for ( var character of characters ) {
			gC(character).perception.addExperience(expPoints);
			textResults += gC(character).getFormattedName() + " gained " + (expPoints * gC(character).perception.affinity).toFixed(1) + " perception experience points.\n";
		}
		return textResults;
	}
	scr.getContent = getScrollGleamingCavernsContent;
	scr.mayBeFound = function(characters) {
		var flag = false;
		if ( State.variables.daycycle.day > 12 || State.variables.daycycle.month > 1 ) {
			flag = true;
		}
		return flag;
	}
	return scr;
}

// Shapeshifter Customs
window.getScrollShapeshifterCustomsContent = function() {
	var content = "The most characteristic trait of the Shapeshifters is, naturally, their ability to change their forms, which is in turn the central stone of their social customs. Those members of the tribe who supplant someone else's identity must only do it for limited periods of time, and the consequent deception, if it exists, must be repaired shortly. Those who decide to take different forms for long periods of time must not hide their identity. Those who break these rules will be shunned by the community, those who break them with the intent of perverting the consent or decisions of others will be severely punished - those who target the whole tribe will be subjected to exile.\n\n" +
	"These severe rules are relaxed during the Twisted Festival, a semiperiodic festivity where everyone is allowed to use anyone's form to prank others - and everyone is expected to avoid taking anything seriously. The main activity of this festival is a theater play which has a central theme and a few script guidelines, but the performers are allowed to improvise, change roles, and significantly alter the story. When a new generation of Candidates to High Priestess is being trained, they're expected to participate as performers.\n\n" +
	"Their economic activities may be summed up in these four: the collecting of minerals, crystals and dyes through the Gleaming Caverns and its surrounding zones, the crafting of ceramics and tools, the construction and repairing of buildings and paths, and the recharging of gleaming crystals. It is first attempted to distribute these tasks among all the Shapeshifters that want them the most, and the rest of the work ends up falling upon the hands of those without clear preferences.\n\n" +
	"Whenever there are small disputes or important events that require action by the whole tribe, a resolution will be settled by a council of judges, which are randomly selected among all adult Shapeshifters every three years, or, in the case of matters of extraordinary gravity, by the whole tribe in assembly.";
	return content;
}
window.createScrollShapeshifterCustoms = function() {
	var scr = new Scroll("shapeshifterCustoms","Shapeshifter Customs","lore");
	scr.firstTimeEffect = function(characters) {
		var textResults = "";
		var expPoints = 75;
		for ( var character of characters ) {
			gC(character).empathy.addExperience(expPoints);
			textResults += gC(character).getFormattedName() + " gained " + (expPoints * gC(character).perception.affinity).toFixed(1) + " empathy experience points.\n";
		}
		return textResults;
	}
	scr.getContent = getScrollShapeshifterCustomsContent;
	scr.mayBeFound = function(characters) {
		var flag = false;
		if ( State.variables.daycycle.day > 12 || State.variables.daycycle.month > 1 ) {
			flag = true;
		}
		return flag;
	}
	return scr;
}

// The Shartrish Slopes
window.getScrollShartrishSlopesContent = function() {
	var content = `I find myself at the northwestern border of the Confined Valley, enjoying the hospitability of the human tribe, or the 'Ashwalkers' as they call their own clan. They haven't been here for longer than two generations, and my old roots cannot help but feel amazed at how fast they've gone from being a tribe mistrusting and alien to becoming one that worships the Goddess and wants to join the rest of us in our customs, to the point that I no longer see the idea of an Ashwalker Candidate being sent to the Passion Temple, at some point in the future, outside of the realm of possibility.

If I were to translate the name by which they call this area to the common language, that would be 'the Shartrish Slopes'. As one leaves my home forests in this direction, the trees first become uncommon, and the soil increasingly arid, and finally the earth turns uneven and capricious, forming hills and ridges quite adverse for travel. While many of them are rocky and by all means infertile, there are also some zones where it's possible to find bushes, weeds and other smaller plants, or even large patches of grass, though often dry to the point that I'm still surprised by the fact that they keep growing back. When I asked the youths why they chose a location as contrarian to animal and plant life to settle, they argued that monsters are less common here, and that the hills provide protections that one can only dream of in the plains; yet the old have a completely different answer: that this climate is favorable for the livestock that they've brought from their native home.

This is a place that has, for the longest time, been derided by the children of the Goddess as barren and uninteresting, worth of no one's time and even uncapable of sustaining any form of society. All in all, I'm glad that these newcomers have proven these perceptions wrong and brought a grand blow of fresh air. Perhaps I, too, am falling fond of the view of these mounds, ever intersected by shades of yellow and green.

- Extract from the Diaries of Lerezure, Leirien priest.

Note: The notes of Lerezure appear to paint the Shartrish Slopes as a moderately more arid place than it currently really is. It is unclear if the region's flora has changed across the centuries, or if the author had an extreme impression on account of him being a Leirien.`;
	return content;
}
window.createScrollShartrishSlopes = function() {
	var scr = new Scroll("shSlopes","Shartrish Slopes","lore");
	scr.firstTimeEffect = function(characters) {
		var textResults = "";
		var expPoints = 150;
		for ( var character of characters ) {
			gC(character).perception.addExperience(expPoints);
			textResults += gC(character).getFormattedName() + " gained " + (expPoints * gC(character).perception.affinity).toFixed(1) + " perception experience points.\n";
		}
		return textResults;
	}
	scr.getContent = getScrollShartrishSlopesContent;
	scr.mayBeFound = function(characters) {
		var flag = false;
		if ( (State.variables.daycycle.day > 12 && State.variables.daycycle.month == 2) || State.variables.daycycle.month > 2 ) {
			flag = true;
		}
		return flag;
	}
	return scr;
}

// Ashwalker Customs
window.getScrollAshwalkerCustomsContent = function() {
	var content = `People from all tribes hear at one point or another about the Martial Competition of the Ashwalkers, a yearly event that sometimes brings curious Beastkin and Gaanidans to test their mettle. Because the tournament bans magical attacks and even the use of sex to bring the opponent to exhaustion, it has been argued that the event serves more to maintain the disciplines of weapon handling and hand to hand combat alive as forms of art than to prepare the tribe for real conflict. In line with this idea, another discipline that brings recognition among them is dancing, favoring a style that favors long movements across a stage along with twirls and pirouettes. While an Ashwalker dancing spectacle is an impressive sight for any outsider, the style itself demands an amount of training and coordination that makes it impractical to be learned for anyone who isn't willing to spend months or even years living in the tribe.

Another art favored is crafting, although with a clear focus on the work of metal, to the point that almost all tribes across the Valley have at least a handful of tools created by Ashwalker smiths, even if the origin isn't always widely known. It may perhaps be their ample smithing tradition what made these humans so accustomed to the use of bondage as an outlet for pleasure. Moved exclusively by scholarly vocation, I have made personal inquiries on the matter, and I have found an interesting contradiction on the fact that, while older Ashwalker texts seem to decry the use of bondage as an activity favored by 'grotesque perverts' and other unfavorable descriptions, modern Ashwalkers don't have any moral predisposition against its use, although the old are far more discreet about it than the young.

When it comes to social organization, the tribe elects their chieftain by following the principle of 'one person, one vote', with all people who are least 13 years old being allowed to participate. This position, often occupied by mature men or women who aren't excessively old, is held until either the person holding it is called by the Goddess at the end of their life, retires, or their authority is called into question. Many other positions of authority, such as military leaders, are elected directly by the chietfain themself, although the majority of the minor ones are passed down by seniority.

The Temple of Flux, branch of the Passion Temple in this tribe, was formed as a compromise between the old tribes of the Valley and the first generations of Ashwalkers that settled it, allowing them to maintain some of their traditional beliefs as long as these were incorporated to the worship of the Goddess. The 'flux' refers to the never stopping flow of energy, of strength, of ambition, of desire, and the belief that these manifestations of people and nature can only be channeled, but never fully contained. Thus, the older generations must be wise enough to notice when it's time to relegate power and responsibilities to the newer ones, the idea of ever-lasting permanence is rejected as an unreal ideal, and conflicts must be allowed to burst, but ultimately redirected into a renewed state of things.`;
	return content;
}
window.createScrollAshwalkerCustoms = function() {
	var scr = new Scroll("ashCustoms","Ashwalker Customs","lore");
	scr.firstTimeEffect = function(characters) {
		var textResults = "";
		var expPoints = 150;
		for ( var character of characters ) {
			gC(character).empathy.addExperience(expPoints);
			textResults += gC(character).getFormattedName() + " gained " + (expPoints * gC(character).perception.affinity).toFixed(1) + " empathy experience points.\n";
		}
		return textResults;
	}
	scr.getContent = getScrollAshwalkerCustomsContent;
	scr.mayBeFound = function(characters) {
		var flag = false;
		if ( (State.variables.daycycle.day > 12 && State.variables.daycycle.month == 2) || State.variables.daycycle.month > 2 ) {
			flag = true;
		}
		return flag;
	}
	return scr;
}

// Intertribal Socialising
window.getScrollIntertribalCommunicationContent = function() {
	var content = `Before I first ever set foot in the Passion Temple, I had often heard there was plenty separating us Leirien from the other tribes, not just in the form of our bodies, but even at a more fundamental level as well. However, when I inquired about the details of these fundamental differences, I couldn't get answers than went anywhere beyond vague generalities. They were a warning about the difficulties of forming bonds with those far different than anyone I had ever met, passed down through generations and eventually distorted as myths. These differences, however, are not insurmountable, and the wealth of knowledge I have gained during my life as High Priestess might as well serve the coming generations.

It is common knowledge for everyone in the Valley that one who possesses charm and blarney will be a more effective speaker, capable of drawing and maintaining the attention of others in their words, and better communicate their thoughts and feelings. But most will be surprised to learn that this alledgedly basic fact of life has fairly different connotations from tribe to tribe, as some rely on their gestures, words and tone far more than others.

For the Leirien, my own tribe, the tone of words and body language are methods of communication that lose importance as we leave youth and head onto the autumn of our lives, as we gain mastery on the control of our scents and fragrances and lean further and further into accentuating our speech with the most appropriate smells, taking the whole room to the desired headspace.

When it comes to Beastkin and humans, they rely on charisma the most, although their bodies tend to betray their true feelings in the form of odors. Since the Beastkin are the most sensitive tribe to smell, they have innate ease to detect the lies of humans and other members of their own tribe, provided they do not have hardened enough hearts to keep all their emotions in check, but are in turn the most easily influenceable by Leirien.

Shapeshifters are an extreme of their own, as their sense of smell is insubstantial, and their body odors, almost constant, and are thus not only forced to rely on charm, but completely blocked from smell-based forms of communication. On the other hand, their characteristic bodies grant them the largest control and awareness over their own expressions.

The Aiishen, the last tribe, are perhaps the most particular case, as their very forms are between the material and the purely aethereal. In consequence, the vast majority of them tend to rely on reading each other's aether to discern how they're feeling, rather than using gestural or smell-based cues. All other tribes consider this method strange and obfuscated, yet those who develop certain mastery of magic may be able to engage in it with ease. As a curiosity, some Aiishen go through great lengths to learn singing, which might very rarely turn into a stepping stone to develop human-like charisma, although the Aiishen who are chosen to become Candidates are vetoed from learning music in their tribe.

The most important lesson that you should learn from this scroll is that many of the instincts you learned in your own tribe to understand others will come short when it comes to the people of other tribes, and you should take a non-judgemental stance towards them for a long while, until you better learn their peculiarities.

- Elendrel, High Priestess`;
	return content;
}
window.createScrollIntertribalCommunication = function() {
	var scr = new Scroll("intCom","Intertribal Communication","lore");
	scr.firstTimeEffect = function(characters) {
		var textResults = "";
		var expPoints = 100;
		for ( var character of characters ) {
			gC(character).empathy.addExperience(expPoints);
			textResults += gC(character).getFormattedName() + " gained " + (expPoints * gC(character).perception.affinity).toFixed(1) + " empathy experience points.\n";
			gC(character).perception.addExperience(expPoints);
			textResults += gC(character).getFormattedName() + " gained " + (expPoints * gC(character).perception.affinity).toFixed(1) + " perception experience points.\n";
		}
		return textResults;
	}
	scr.getContent = getScrollIntertribalCommunicationContent;
	scr.mayBeFound = function(characters) {
		var flag = false;
		if ( State.variables.daycycle.month > 1 ) {
			flag = true;
		}
		return flag;
	}
	return scr;
}

// On Martial Arts
window.getScrollOnMartialArts = function() {
	var content = `"You better write down everything I tell you, alright!? Yes, even these words! No, I don't care about the ink, if you run out of ink, just go get more!

So! The Martial Arts! Most of the tribes in the Confined Valley practice some form of physical combat, mostly to hunt if nothing else, but it's also the most reliable protection against monsters. And some dare to look down on it for that very reason! I know it took you months of training to even start throwing fireballs reliably, you lil' bitch, but someone being able to smack your ass within seconds of picking up a staff is a perk, not a...! No, no, it's not foul language! Write it down already!

I had to deal with all sorts of nasty comments when I was a Candidate. 'We know you don't have talent for magic, but you should still put effort into trying', or 'Good priestesses back their physical fighting with spells', or even 'Give up on becoming High Priestess if you can't even leave your zone of comfort'! Well, who's the High Priestess now!? Being a competent physical fighter also takes sophistication! Awareness! Strategy!

Never charge in blindly against your enemy, unless you want to make a fool of yourself, that is. Give some thought to what kind of opponent you have in front of you, and act accordingly! Is your foe a hunk of a man with twice your brawn? Measure your distance and attack from safety. Polearms are your best friend here! Harass them with impunity and punish their mistakes until you gain the upper hand, which will be soon! What if it's a nasty bitch who insists on sieging you with magic? Then cut down the distance immediately, don't let them force you into a disadvantageous position! If you are fighting against someone on equal terms, dance. Look at the next incoming blow, and position yourself in such a way that deflecting it and attacking back is a natural extension of the same movement. If you're outnumbered...

What do you mean I love the sound of my own voice!? We're working over here! Passing down my knowledge for the future generations...! What a nasty brat. Ignore that. Anyhow, if you're outnumbered, keep looking for the position where you'll have to deal with the least amount of attacks at the same time. Don't let yourself get flanked! This often means you'll have to keep moving across the battlefield, showing constant initiative to create the clashes that favor yourself, rather than letting the enemy picking them for you. It's still quite the cursed situation, however - take care of your allies and break down your enemies with haste so that you don't find yourself in it! In that line, my most important lesson is that...

You again!? You're looking for a practical demonstration, or you're just trying to get punished!? Is your lusty ass so thirsty for my attention that you're risking to...!? That's it, we're spending the rest of the day in the dungeon. And perhaps the night as well! No, don't call me that, you were looking for this!"

Note from the scribe: Mistress left the room a few minutes ago and is showing no signs of being about to come back any time soon. We will continue the lesson in a different scroll, if she ever feels like it.`
	return content;
}
window.createScrollOnMartialArts = function() {
	var scr = new Scroll("onMartialArts","On the Martial Arts","lore");
	scr.firstTimeEffect = function(characters) {
		var textResults = charactersLearnSceneActions(characters,["headbutt","twistNhit","rally","warcry"]);
		return textResults;
	}
	scr.getContent = getScrollOnMartialArts;
	scr.mayBeFound = function(characters) {
		var flag = false;
		if ( State.variables.daycycle.month > 1 ) {
			flag = true;
		}
		return flag;
	}
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
		var textResults = charactersLearnSceneActions(characters,["pushHipsBack","pushAssBack","scissor","thrust","mountFromBehind","rideDick","pushDickBack"]);
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
						  "rideFace","giveCunnilingus","giveBlowjob"]);
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
		var textResults = charactersLearnSceneActions(characters,['strokeAss','penetrateAss','analThrust','doublePenetration','doubleThrust','analMountDick','analRideDick','analPushDickBack']);
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
				+ '//"Lick my ankle,"// she ordered. And Ninllin complied, because the ankle wasn\'t as smelly as the foot itself, and she was scared of Bell.\n\n'
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

// Punishing the traitors
window.getScrollPunishingTheTraitorsContent = function() {
	var content = 'Characters: Cainei (Gaanidan female), Wesia (Gaanidan female), Rasce (Gaanidan male)\n\n'
				+ 'Tags: Female x Male, Female x Male, bondage, domination, femdom, femsub, malesub, denial\n\n'
				+ '"Please, Cainei, think calmly about this... You\'re going too far."\n\n'
				+ 'The voice of her friend Rasce was the first thing Wesia heard when she woke up, but her fuzzy mind was going to need some more work to understand the situation. Her lazy eyes opened for half a second, and caught a glance of a foot massaging a dick. She made an extra effort to keep them open the next time, and she found their friend Cainei standing on her feet before Rasce who laid down on the floor, as she gave him a footjob.\n\n'
				+ '"Please, I beg you..."\n\n'
				+ '"Your begging isn\'t going to undo what you did." She replied merciless, without stopping.\n\n'
				+ 'A second inspection made Wesia notice an important detail of the scene: Rasce\'s arms and feet were chained, and he was immobilized.\n\n'
				+ '"What are you doing...?" Wesia asked, still confused. A third inspection made her realize an even more important issue: SHE was chained too. "Huh? What\'s going on!?"\n\n'
				+ '"That\'s what I\'d like to know too! What\'s going on with you, you little scum!" A furious Cainei replied. The massage against Rasce\'s dick was growing in intensity: Cainei\'s fingers grabbed the head of the penis and rubbed it aggressively.\n\n'
				+ '"Cainei, why are we chained!? Why am I chained!?"\n\n'
				+ '"If you don\'t know, you\'re even more guilty!"\n\n'
				+ '"Uugh-guugh..." Rasce groaned.\n\n'
				+ '"Ah, there you are." Said Cainei, who quickly retired her foot, and stepped on the base of Rasce\'s cock, making sure that no other part of it was getting contact with anything.\n\n'
				+ '"No, please, let me cum!"\n\n'
				+ '"Ah, but you\'re cumming alright." A small but long stream of cum sprouted from the sad dick, in what was probably the most frustrating and humilliating orgasm it had ever experienced. "This is what traitors like you deserve!"\n\n'
				+ '"Why... Why are you so cruel...?"\n\n'
				+ '"Cainei! Please tell me why you are doing this!" Wesia insisted.\n\n'
				+ '"Don\'t worry, Wesia. I\'m going to make you remember." The free woman walked towards her chained friend, and stepped on her pussy. "After your clit aches in heat and desperation like I\'m going to make it, you\'ll remember for a long, long time." Cainei\'s big toe started making circles on her prisoner\'s clitoris, ready to torture it.\n\n'
				+ '"But tell me at least what I did to make you angry!"\n\n'
				+ '"You...! You ate all of our sweets!" Cainei revealed, indignant.\n\n'
				+ '"What?"\n\n'
				+ '"You two left me with nothing!"\n\n'
				+ '"What!? Are you torturing us because we left you without sweets!?" Wesia couldn\'t believe her ears.\n\n'
				+ '"They were the special sweets that the Leirien gave us, and you never know how long it\'ll be until they bring more again! They\'re delicious, and now they\'re GONE!"\n\n'
				+ '"Cainei," Rasce intervened, "if it makes you feel better, they weren\'t even that good."\n'
				+ '"Don\'t lie to me, you bastard! You ate all of them!"\n\n'
				+ '"Agh! Rasce, don\'t make her angrier, she\'s hurting me..." Wesia complained.\n\n'
				+ '"You\'re going to be nothing but a drooling, pained dog in heat, when I\'m done with you."\n\n';
	return content;
}
window.createScrollPunishingTheTraitors = function() {
	var scr = new Scroll("punishingTheTraitors","Punishing The Traitors","shortStory");
	scr.firstTimeEffect = function(characters) {
		var textResults = charactersLearnSceneActions(characters,['denyOrgasm','teaseLockedPussy','teaseLockedDick','baTeaseLockedDick','baTeaseLockedPussy']);
		return textResults;
	}
	
	scr.getContent = getScrollPunishingTheTraitorsContent;
	scr.mayBeFound = function(characters) {
		var flag = false;
		if ( State.variables.daycycle.day > 10 || State.variables.daycycle.month > 1 ) {
			flag = true;
		}
		return flag;
	}
	return scr;
}

// Tribute for the Goddess
window.getScrollTributeForTheGoddess = function() {
	var content = 'Characters: Aspenn (Leirien male), Indomitable Will (Beastkin lion male), Wind (Beastkin bat male), Innocence (Beastkin bunny female), Wisdom (Beastkin fox female), Fury (Beastkin leopard male)\n\n' +
		'Tags: Orgy, Female x Male, Female x Female, Male x Male, Exhibitionism, Hypnosis, Vaginal, Oral, Anal, Facesitting\n\n' +
		'Note: While this text is based on the historical record, specific facts have most likely been altered for narrative purposes.\n\n' +
		'"Are your whelps ready?" Aspenn asked to the Beastkin leader.\n\n' +
		'Will looked around filled with distrust. The figure these peoples worshipped as their Goddess was at a platform at the top of the stairs, hidden behind an opaque veil. As it appeared, not even at this time would she bother to let him hear her voice. Will turned his eyes down, at the base of the hill. His people braced each other, not completely certain about their fate.\n\n' +
		'"As ready as they will ever be." He replied plainly.\n\n' +
		'"...But they could use some help, couldn\'t they?" The Leirien High Priest looked at his subordinates, and gestured them to proceed. The other priests went down the hill and took yellow and orange flowers out of leather bags, placing them around the Beastkin peoples. A small minority of them checked the flowers with curiosity, and they were the first ones to fall.\n\n' + 
		'"Wind, are you ok? You\'re making a strange face..."\n\n' +
		'Wind\'s face had gone from displaying excitement to dizziness, his bat face taking an unusual reddish colour. He was soon intensely gazing at his bunnygirl friend.\n\n' +
		'"W-Wind? You\'re scaring me. Please tell me you\'re ok..."\n\n' +
		'"Inno... Innocence, come here."\n\n' +
		'"Ah!?" His mouth assaulted hers, his hands explored her body with impatience. Was this really her friend Wind?\n\n' +
		'"What have you done?" asked Indomitable Will, half a hundred meters away, "What are you doing to my people!?"\n\n' +
		'"Relax. They\'re perfectly fine, and they will continue to be." Aspenn declared, with contrasting quietness. "We have just freed them from their natural inhibitions. For a while. That will help you fulfill your part of the deal."\n\n' +
		'"You..."\n\n' +
		'Down the hill, the events advanced with heated speed. Wind was rubbing his dick against Innocence\'s crotch, and he would enter her soon.\n\n' +'"Wind, you... Ah~" Innocence\'s protests were about to dissipate, when a new actor joined the play.\n\n' +
		'"Innocence, I\'ve always wanted to do this." And the young woman\'s lips met those of another friend of hers.\n\n' +
		'"Wisdom! You... Your husband!" Wisdom\'s husband, a leopard man named Fury, was caressing Wind from behind.\n\n' +
		'"It\'s fine. He wants this as much as I." Innocence\'s body was now being groped by both Wind and Wisdom, and her mind was starting to succumb to the flower\'s scent, even though she wasn\'t able to pay attention to the smell.\n\n' +
		'Wind laid the bunnygirl on the ground and kneeled before her, and Wisdom took position to sit on her face. Just as her friend\'s pussy hugged her nose and mouth, Wind\'s cock took Innocence\'s virginity. Behind him, Fury was about to be the first to enter Wind\'s ass.\n\n' +
		'"You\'re crossing a line here! Some of these men and women had promised to be loyal to each other, and now..."\n\n' +
		'"Will." Aspenn replied, his tone unwavering.\n\n' +
		'"Now they\'ve turned into this! This wasn\'t part of the deal!"\n\n' + 
		'"Will." it wasn\'t just Aspenn\'s voice this time.\n\n' +
		'"You are going to regret..."\n\n' +
		'"Behind you, Will." And Will felt it, the presence behind him that was now calling his name.\n\n' +
		'"Uh!? Who... Who are..."\n\n' +
		'"I\'m her who you have sworn your allegiance to."\n\n' +
		'"The veil..."\n\n' +
		'"Drop to your knees." She didn\'t need to repeat her words. As it turned out, his will wasn\'t so indomitable, after all. "Good. You know what you must do with your mouth, right?"\n\n'
		'"...Yes..."\n\n' +
		'"Who could have imagined it? Innocence\'s so enthusiastic about this!" Wisdom shouted as she rode the bunnygirl\'s face. "How is the bat, honey?"\n\n' +
		'"Much tighter than I expected." Fury replied heavily. "It\'s quite amazing. We should talk more often to these two." Neither Innocence nor Wind could reply: the former had enough with being able to breathe between Wisdom\'s aggressive movements, and the latter was too immersed in the pleasure that engulfed both his dick and his ass.\n\n' +
		'He wasn\'t the only one. Everyone around them was obeying their most primal impulses, exploring the bodies of their fellow tribespeoples in ways they had never ever imagined.\n\n' + 
		'"Stop sucking for a moment. Tell me why you\'re doing this."\n\n' +
		'"I\'m protecting my tribe. You... Demanded a tribute from us in order to be allowed to settle in the Valley, and..." Will was cut off.\n\n' +
		'"No. Tell me why you\'re really doing this."\n\n' +
		'"..." Will\'s mouth was open, but words had to fight their way out. "...Because you willed so, and your will is law."\n\n' +
		'"Honesty is a good trait. Yes... You may have your place here in the Valley, after all."\n\n' +
		'From that day onwards, the Beastkin became the fourth tribe that worshipped the Goddess, privileged proteges freed from the dangers of the outer world.';
	return content;
}
window.createScrollTributeForTheGoddess = function() {
	var scr = new Scroll("tributeForTheGoddess","Tribute for the Goddess","shortStory");
	scr.firstTimeEffect = function(characters) {
		var textResults = charactersLearnSceneActions(characters,['extraMountFromBehind','extraKneel','extraMakeKneel','extraLegHoldHead']);
		return textResults;
	}
		
	scr.getContent = getScrollTributeForTheGoddess;
	scr.mayBeFound = function(characters) {
		var flag = false;
		if ( State.variables.daycycle.day > 11 || State.variables.daycycle.month > 1 ) {
			flag = true;
		}
		return flag;
	}
	return scr;
}

// Forbidden Love
window.getScrollForbiddenLove = function() {
	var content = `"The phantom has visited me again tonight. No matter how strong I shut the doors, how vehemently I reject its advances and ignore its cries, it just keeps coming. How can you, after all, forbid the visits of a ghost that lives in your own head?

And to be entirely honest with myself... I have been clinging onto it, no matter how much that nail burns. I keep telling myself that the pain it brings isn't worth it, but how can I survive the pain of knowing I will never see you again, that I'll have to continue living on without the reminiscence of your smile? Every night, when I'm about to cry myself to sleep, a little part of me leaves a small crack open in the door, and so the phantom manages to enter. This ghost is the living memory of your laugh bright and full of joy, of your hand gently caressing my face, of your mouth seducing mine in a slow dance... It is a fire that warms my desolate soul, and in my weakness, I welcome its destructive embrace, its merciless visits that burn my skin.

Why must our families be so foolish, feuding over ages old disputes? Who cares if you're Ashwalker and me, Gaanidan? If our love could flourish in such brief encounters, shouldn't the world respect and protect its beauty? Why must the hate of our tribes get in the way of our affection? Our soul-penetrating stares, prelude to the symphony of our kiss, the warm embrace of our hands, and their fingers seeking the union with each other, our skin turning open to each other's touch and massage, as if we were going to fuse ourselves... Why must all of that hold less weight than the rivalry of long dead corpses?"

[A few words have been crossed out to the point of no longer being readable. The text continues long below, with a fairly different handwriting, sometimes firm, but sometimes shaken.]

"Today is the day when the new Gaanidan Candidate is chosen. I have already submitted myself to my fate, resigned to the powerless frustration of not being capable of defying men and women who value the dead over myself... But if by some chance... The Goddess is aware of my pain... Please, listen to my plea... Please send me to the Passion Temple, and send her as well. My hands are trembling, and my face bathed in tears... I cannot leave home like this... Please..."

Segments of the personal diary of Iuno, High Priestess of the Passion Temple.`;
	return content;
}
window.createScrollForbiddenLove = function() {
	var scr = new Scroll("forbiddenLove","A Forbidden Love","shortStory");
	scr.firstTimeEffect = function(characters) {
		var textResults = charactersLearnSceneActions(characters,['whisperSNs','kissNeck','holdHands']);
		return textResults;
	}
	
	scr.getContent = getScrollForbiddenLove;
	scr.mayBeFound = function(characters) {
		var flag = false;
		if ( State.variables.daycycle.month > 1 ) {
			flag = true;
		}
		return flag;
	}
	return scr;
}

// Punishment Report
window.getScrollPunishmentReport = function() {
	var content = `Tags: Orgy, (Futa x Female x Male), Teasing, Vaginal, Oral, Threesome, Femdom, Femsub, Domination, Orgasm Denial

"To our most merciful High Priestess, Elegant Victory:

I write this report to communicate the results and details of the punishment you dictated to be committed against Lereshir, human Priestess, whom, unable to accept the wise decision of the other Candidates to grant you the title of High Priestess, has been slandering your good name ever since.

She initially received the news with some mild resistance, once again pouring sour words against your person and casting doubt on your good judgement, but ultimately complied to accompany the other priestesses and priest, after she was told that her punishment would be being subjected to enough orgasms to leave her aether weak and shattered for a few weeks.

Fellow ex-Candidate Lereimes started the session, in a calm mood, laying Lereshir on her back and slowly riding her member for a good fraction of an hour, continuously edging the human and sometimes achieving relief herself. Then, she commanded Velsin and Messin, the Shapeshifter priest and the Leirien priestess in training, to continue in her stead.

Lereshir was ordered to assume a mutual face to groin position Messin, the latter's tongue taking care of the human's dick while Velsin her. Due to the couple's lack of experience, they weren't capable or expected to continue subjecting her to orgasm denial. I offered them to take a rest, and I proceeded to stimulate all of Lereshir's genitals, as well as her breasts and anus, and applied a more direct whipping on her aether, while she feigned impassive stoicism.

When Lereimes came back, she took my place and I left her to continue agitating Lereshir's body. At this moment, there was a clear error of communication on her part, as she later claimed to have asked me to come back after an hour, although she actually implied that she intended to take my next turn after Messin and Velsin. Whatever the case, she left Lereshir alone with the new priest and priestess. It wasn't until a couple of hours later that we realized that neither of us had supervised them in far too long.

What we found next was a flawed situation. Lereshir was clearly dominating the room, vigorously pushing against Messin's vaginal entrance and letting a clearly not as vigorous Velsin penetrate her from behind, commanding him to be more forceful and berating him for his weakness. Naturally, we had no choice but to put a stop to the situation, as the new priests were found to be incapable of imposing themselves on Lereshir, which left us undermanned to continue the punishment until a point where it would have had favourable effects.

At the moment, we find ourselves with the inconvenient situation that Velsin and Messin would accept our orders in theory, but it isn't difficult for Lereshir to manipulate them into avoiding their responsibilities or even obstructing our own, so we do not have the resources to attempt the punishment again as of this moment. I understand that our most merciful High Priestess is currently busy with personal matters outside the Passion Temple, but I'm afraid that your continued absence might shift the balance of power in an undesirable direction. I humbly suggest that you reconsider the options at your disposal at the moment to conclude the conflict with a favorable conclusion."`;
	return content;
}
window.createScrollPunishmentReport = function() {
	var scr = new Scroll("punReport","Punishment Report","shortStory");
	scr.firstTimeEffect = function(characters) {
		var textResults = charactersLearnSceneActions(characters,["encInit","piston","gallopDick","gallopPussy","mountFaceToGroin","askMountFromBehind","extraAskMountFromBehind"]);
		return textResults;
	}
	
	scr.getContent = getScrollPunishmentReport;
	scr.mayBeFound = function(characters) {
		var flag = false;
		if ( State.variables.daycycle.month > 1 ) {
			flag = true;
		}
		return flag;
	}
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
		var textResults = charactersLearnSceneActions(characters,['coldGuts','pounceFrontal']);
		return textResults;
	}
	scr.getContent = getScrollTheBasicsOfCombat;
	return scr;
}

	// TUTORIALS
// A Proper Candidate
window.getScrollAProperCandidate = function() {
	var content = "I have found myself in the rare position of having to tutor not one, but two generations of Candidates. This particular position has given me such insight that it would be nothing but wasteful to not to share it as much as possible, not only with those I've had the pleasure of sharing my life with, but with the future generations as well.\n\n"
				+ "Today's text will discuss one of the fundamental concepts a Candidate should have in mind when pondering about how to make the best out of her training. It's clear to anyone who bothers to use their eyes that not everyone shares the same strengths: some people are fitter, smarter, or more charming, and these traits tend to change over time. Traditionally, the Passion Temple has categorized them in the following way:\n\n"
				+ "- __Physique__: The capacity of a character to exert physical strength. Used for many physical activities and taxing sexual actions. Raises lust and energy.\n"
				+ "- __Agility__: The ability of a character to execute tasks that require precision. Used for many sexual actions, and often used to evade physical attacks. Raises lust and energy.\n"
				+ "- __Resilience__: The capacity of a character to resist exhausting physical work and hits. Most commonly used to resist physical attacks and intense sexual pleasure. Raises lust and energy.\n"
				+ "- __Will__: Indicates the mental resilience of a character. Often used to resist temptations and evade magical attacks, sometimes useful to cast magic. Raises lust and willpower.\n"
				+ "- __Intelligence__: Refers to the strength of the mind. Most commonly used to cast complex, precise magic. Raises lust and willpower.\n"
				+ "- __Perception__: The capacity of a character to detect movements and sounds that would otherwise be ignored. Often useful to evade attacks. Raises lust and willpower.\n"
				+ "- __Empathy__: Indicates the ability of a character to understand the feelings and motivations of others. Most useful during socialization, also serves to resist social attacks. Raises lust and social drive.\n"
				+ "- __Charisma__: Refers to the ability of a character to get the most out of their expressions. Most useful during socialization, and it also powers social attacks. Raises lust and social drive.\n"
				+ "- __Luck__: In a world where everything is connected by aether, luck refers to the harmony of a character with all elements of the world. Improves in very small amounts your dealt sexual pleasure, damage, chances to land or evade attacks, and success during socialization.\n\n"
				+ "You must have noticed that the Training Grounds have the means to allow the Candidates to better themselves in all of them, but how much effort should each of them receive? The consensus tends to be that both putting all your effort into a single trait or distributing your efforts equally are misguided strategies in the long run. A more sensible approach is analyzing which ones are more important in your daily life and challenges, and approach them with proportional attention: if you rely in your peers for protection, it'd be most appropriate to polish your charms to keep them in your good sides; if you rely on magic to fulfill your goals, pay extra attention to your intelligence and will. Sometimes it's a good decision to dedicate a moderate amount of training to traits you don't directly use, but allow you to resist your daily life's challenges. Don't be afraid to commit excessive mistakes on your early days: you will have opportunities to get back on your feet.\n\n"
				+ "It should also be mentioned that people usually have more or less affinity towards some of these traits, which may be noticed by witnessing how much they improve with the same amount of effort. Naturally, it would be wise to rely on skills that your own body and mind are properly tuned with. While it's extremely rare, you may come across situations that could allow you to steer these affinities in more productive directions, should you decide it's worth it.";
	return content;
}
window.createScrollAProperCandidate = function() {
	var scr = new Scroll("aProperCandidate","A Proper Candidate","tutorial");
	scr.firstTimeEffect = function(characters) {
		var textResults = "";
		var expPoints = 50;
		for ( var character of characters ) {
			gC(character).resilience.addExperience(expPoints);
			textResults += gC(character).getFormattedName() + " gained " + (expPoints * gC(character).resilience.affinity).toFixed(1) + " resilience experience points.\n";
		}
		return textResults;
	}
	
	scr.getContent = getScrollAProperCandidate;
	scr.mayBeFound = function(characters) {
		var flag = false;
		if ( State.variables.daycycle.day > 2 || State.variables.daycycle.month > 1 ) {
			flag = true;
		}
		return flag;
	}
	return scr;
}

// The Arts of Socializing
window.getScrollTheArtsOfSocializing = function() {
	var content = "Talking to others is a task full of intricacies, even if we -or most of us- are intrinsecally equipped to have some sort of understanding. While some people move through social environments like they're fish in the water, some may lack some nuances, or may even be completely unaware that others measure their own moves with very specific goals in mind.\n\n"
				+ "While it may look like we have absolute free will over our own actions, the reality is that what we can say or think is limited by our own emotions and our understanding of ourselves, to the point that you may desire, in the depths of your heart, to grow closer with someone, but your heart will have trouble to allow you to take the first step. If you grow for long enough on some of your traits -fundamentally your empathy, but also your charisma and luck to some degree-, you will eventually find it easier for your guts to allow you to steer the conversation in a wider variety of directions.\n\n"
				+ "You must also be aware that your own emotions and mood will severely affect what your mind is willing to do: someone angry is more likely to scale a confrontation, while someone sinking in lust is prone to flirting - and everything that happens in a social environment will affect everyone's mood. Therefore, you must take into account several considerations: you should try to reach a state of mind favorable to your goals, you should try to make your peers reach a state of mind favorable to your goals, and some of your peers will try to get the others, including you, into a state of mind favorable to their goals. Your goals and those of your peers may allign, allign partially, be indifferent to each other or be completely incompatible. Make sure you notice what your peers are trying to achieve to react as fast as possible, if so you'd need. Everyone's mood has a resting point they will naturally move towards, so getting intimate, flirty or dominant enough with someone may be out of your reach today - keep training and it will become possible in the future.\n\n"
				+ "A common misconception is that charisma is the one and only trait a Candidate who wants to improve their socializing should be focusing on. While charisma is fundamental, especially to steer the initial course of a conversation, other traits also play a role, most commonly when the conversation takes a more physical turn. Will, agility, empathy, physique and luck are also occasionally useful.\n\n"
				+ "A final point that should be mentioned here are invitations and offers, which are accepted and rejected for all kinds of reasons, the most important ones usually being the person's mood, their relationship with the offering person, their desires, their goals and their values. The desire is a specially important one: when an offer in put on the table, the receiver may have a natural desire to accept it, even if their reason tells them otherwise. If this desire is strong enough, they may have to fight their willpower to reject the offer - and they may not be strong-willed enough to do so. In this case, they will accept the offer, but may hold some resentment towards the other person anyway.";
	return content;
}
window.createScrollTheArtsOfSocializing = function() {
	var scr = new Scroll("artsSocializing","The Arts Of Socializing","tutorial");
	scr.firstTimeEffect = function(characters) {
		var textResults = "";
		var expPoints = 50;
		for ( var character of characters ) {
			gC(character).empathy.addExperience(expPoints);
			textResults += gC(character).getFormattedName() + " gained " + (expPoints * gC(character).empathy.affinity).toFixed(1) + " empathy experience points.\n";
		}
		return textResults;
	}
	
	scr.getContent = getScrollTheArtsOfSocializing;
	scr.mayBeFound = function(characters) {
		var flag = false;
		if ( State.variables.daycycle.day > 2 || State.variables.daycycle.month > 1 ) {
			flag = true;
		}
		return flag;
	}
	return scr;
}

// The Arts of Bed
window.getScrollTheArtsOfBed = function() {
	var content = "The sexual arts should be a core skill for all Priestesses and Priests of the Goddess, for sex is not only a tool to keep the tribes united and harmonious, but also an instrument to gather aether.\n\n"
				+ "Some core concepts are desires and tastes for specific activities and actions - providing attention to your partners' preferences and desires is a great help to make your relations more satisfying. Desires are usually volatile, fleeting and easy to notice, and you can often evoke them with your own actions. Preferences tend to stay the same over time, but sometimes change due to each person's experiences, especially if they usually orgasm doing specific acts. If you get really close to someone, you should get some good insight of what their preferences currently are. Prior to that, you may infer some of their preferences by how much they like which acts.\n\n"
				+ "Once someone's excitement reaches its limit, they will orgasm, releasing some aether in the process. Reaching orgasm with your partners usually changes your predisposition towards them, especially regarding the context, such as how much people are sharing that intimate experience, who has the lead, and how long has it been since the last time the partners had sex. Unexperienced Candidates may not know that not all orgasms are equal, and some may be ruined or mindblowing. Ruined orgasms happen when the climax is interrupted or isn't allowed to properly conclude - they erode the victim's willpower and it's generally considered rude or outright hostile to ruin someone's orgasms. Mindblowing orgasms may take place depending on how much enjoyment the pleasured person has already had during the encounter, and how much their excitement is pushed far beyond its limits during climax. It is generally hard for new Candidates to get their partners to reach mindblowing orgasms. Regarding the changes in sexual preferences, both ruined and mindblowing orgasms have far greater effects in changing someone's tastes.\n\n"
				+ "Finally, I should make some mention of the lead during sex. Unless it has been previously decided that some people will or will not have the lead, each participant during sex will slowly get the chance to take the initiative. Keep in mind, however, that those with depleted willpower will have further trouble taking such initiative, which may render someone virtually submissive during an encounter which would have otherwise been on equal terms.";
	return content;
}
window.createScrollTheArtsOfBed = function() {
	var scr = new Scroll("artsBed","The Arts of Bed","tutorial");
	scr.firstTimeEffect = function(characters) {
		var textResults = "";
		var expPoints = 50;
		for ( var character of characters ) {
			gC(character).agility.addExperience(expPoints);
			textResults += gC(character).getFormattedName() + " gained " + (expPoints * gC(character).agility.affinity).toFixed(1) + " agility experience points.\n";
		}
		return textResults;
	}
	
	scr.getContent = getScrollTheArtsOfBed;
	scr.mayBeFound = function(characters) {
		var flag = false;
		if ( State.variables.daycycle.day > 2 || State.variables.daycycle.month > 1 ) {
			flag = true;
		}
		return flag;
	}
	return scr;
}

// The Arts of Combat
window.getScrollTheArtsOfCombat = function() {
	var content = "All Candidates should be well versed in the arts of battle, for being able to take up arms may be the difference between defending peace in the Valley and a painful descent into chaos. The generally accepted goal of combat is to bring your opponents into bursting aether out, which will incapacitate them for a while. This may be done through physical or magical means, but if your opponent is a person, and not a monster, sexual and social approaches may also work.\n\n"
				+ "A very important aspect of combat is control, or your capacity to stay on your feet and maintain your balance. While control is usually recovered on its own, once it's depleted, the combatant will remain extremely vulnerable to all kind of attacks, the most dangerous of which will lock them into an even more precarious position. If this happens, the only way to recover control is to deplete the control of your aggressor. Struggling is often a fairly direct and efficient method to achieve this goal, but it won't be as useful if you're missing willpower or energy, or if by some reason you're unable to move your arms or legs.\n\n"
				+ "Most actions you may use in combat have a chance to fail. By taking a moment to analyze the action, you may soon realize which traits are most effective for you or for your opponent to have when attempting to land them, or to evade them. It is fairly well known that pouncing on a target who has lost all their control will always be successful - it's not as well known that some types of actions are more or less likely to hit if you and your target are struggling hand to hand: projectiles will be less precise, hits will be less so, and contact actions will always be successful.\n\n"
				+ "Through my whole life, I've also noticed that some people have specific affinities with certain types of actions: some may be weaker to social attacks, or more effective when tempting their enemies with sex. When it comes to specific tribes, it looks like Leirien tend to be weak to fire attacks. The Aiishen usually have stronger magical attacks, weak defenses against magic, higher resistance against physical attacks, and weaker physical attacks. While it isn't intrinsic to them, quite a few Ashwalkers are particularly skillful at using weapons, which shouldn't surprise anyone who knows well their traditions.";
	return content;
}
window.createScrollTheArtsOfCombat = function() {
	var scr = new Scroll("artsCombat","The Arts of Combat","tutorial");
	scr.firstTimeEffect = function(characters) {
		var textResults = "";
		var expPoints = 50;
		for ( var character of characters ) {
			gC(character).will.addExperience(expPoints);
			textResults += gC(character).getFormattedName() + " gained " + (expPoints * gC(character).will.affinity).toFixed(1) + " will experience points.\n";
		}
		return textResults;
	}
	
	scr.getContent = getScrollTheArtsOfCombat;
	scr.mayBeFound = function(characters) {
		var flag = false;
		if ( State.variables.daycycle.day > 10 || State.variables.daycycle.month > 1 ) {
			flag = true;
		}
		return flag;
	}
	return scr;
}

// Deeper Relationships
window.getScrollDeeperRelationships = function() {
	var content = "It is sensible for a Candidate to plan ahead on which kind of relationships they wish to have with their peers, since weaving a stronger web of alliances than anyone else is a valid strategy to gaining the High Priestesshood - or at least to make sure that the winner is as favorable to you and your interests as possible.\n\n"
				+ "You are probably aware that relationships are complex dynamics that aren't easy to categorize. Love and desire, rivalry and enmity do not always go hand, and the complexities of the relationships you develop with your peers will be shaped by both your goals, theirs, and the life events that you have to go through. Remember that relationships that aren't constantly nurtured decay to become shadow of what they once were, but the past memories of your past love, passion and hate are hard to remove.\n\n"
				+ "Some generations of Candidates compete with specific rules involving special relationships. These are rules that temporarily shackle each person into a set of rules regarding how they must behave with each other. These special relationships may be egalitarian or hierarchical. Anyone may have as many egalitarian and dominant relationships as they wish, but only one submissive relationship at a time. If you have a submissive relationship, you will also be locked out of having any dominant relationships. These relationships usually change how each of their members view each other, but this is merely a temporary effect. Keep in mind that the duration of these special relationships may change as your training advances.\n\n"
				+ "Each person has their own values and goals in life, and this is usually even more important for Candidates, as one of them will hold considerable power over the Valley. These values and goals may be well defined, but they are never set in stone, and may change as the events change their holders. Your relationships with your peers and how you relate to each other will contribute to this - and in extreme cases, the combined efforts of several Candidates will create a dynamic where certain values will reign supreme. If everyone around you is obsessed about controlling others and not being controlled, power and domination will become universal values. Pay effort to build the Temple and Valley that you'd like to live in.";
	return content;
}
window.createScrollDeeperRelationships = function() {
	var scr = new Scroll("deeperRelationships","Deeper Relationships","tutorial");
	scr.firstTimeEffect = function(characters) {
		var textResults = "";
		var expPoints = 50;
		for ( var character of characters ) {
			gC(character).charisma.addExperience(expPoints);
			textResults += gC(character).getFormattedName() + " gained " + (expPoints * gC(character).charisma.affinity).toFixed(1) + " charisma experience points.\n";
		}
		return textResults;
	}
	
	scr.getContent = getScrollDeeperRelationships;
	scr.mayBeFound = function(characters) {
		var flag = false;
		if ( State.variables.daycycle.day > 10 || State.variables.daycycle.month > 1 ) {
			flag = true;
		}
		return flag;
	}
	return scr;
}

// Relationships Nuance
window.getScrollRelationshipsNuance = function() {
	var content = `Your relationships with your fellow Candidates will grow, evolve and mutate during your preparation as a potential High Priestess, and thus, it is fundamental for you to pay attention to the nuances they may take with enough anticipation so that you may properly direct them towards the most fruitful stream.
One of such nuances might be intimacy, so often taken for granted while it's slipping out of your hands, only to be noticed when you've already lost it. Your intimacy with someone does not only depend on the kind of relationship you share, but the intimacy of all other relationships each of you have as well. If you see your loved one committing to raise her intimacy with a third person, you should be aware that failing to reach the same level of compromise may result in you being left behind.
Do you want your relationship with your current ally to remain something pragmatic and goal-oriented, or are you willing to trust them enough to commit to a more intimate one? Would you be willing to compromise the obedience of your current servant to explore a dimension of shared love, or is her discipline an unalienable goal of yours? Should you maintain a low profile regarding someone you cannot see eye to eye, or are your differences large enough that you should publicly announce your rivalry to raise the stakes of your future encounters?
Some Candidates have taken these choices depending on their feelings, others tried to calculate the best path to victory, and some were guided by her most personal convictions. Whatever it is your decision, you should dedicate as much time as required to voice your goals with your peers and make sure your intentions are aligned, when possible.`;
	return content;
}
window.createScrollRelationshipsNuance = function() {
	var scr = new Scroll("relsNuance","Relationships Nuance","tutorial");
	scr.firstTimeEffect = function(characters) {
		var textResults = "";
		var expPoints = 100;
		for ( var character of characters ) {
			gC(character).empathy.addExperience(expPoints);
			textResults += gC(character).getFormattedName() + " gained " + (expPoints * gC(character).empathy.affinity).toFixed(1) + " empathy experience points.\n";
		}
		return textResults;
	}
	
	scr.getContent = getScrollRelationshipsNuance;
	scr.mayBeFound = function(characters) {
		var flag = false;
		if ( getCurrentStoryState() >= storyState.secondLoop ) {
			flag = true;
		}
		return flag;
	}
	return scr;
}


setup.scrollsList = [];
setup.scrollsList.onAether = createScrollOnAether();
setup.scrollsList.onFamily = createScrollOnFamily();
setup.scrollsList.theWilds = createScrollTheWilds();
setup.scrollsList.gleamingCaverns = createScrollGleamingCaverns();
setup.scrollsList.shapeshifterCustoms = createScrollShapeshifterCustoms();
setup.scrollsList.theBasicsOfSex = createScrollTheBasicsOfSex();
setup.scrollsList.theTasteOfPleasure = createScrollTheTasteOfPleasure();
setup.scrollsList.surprisedInTheRear = createScrollSurprisedInTheRear();
setup.scrollsList.paybackForTheThief = createScrollPaybackForTheThief();
setup.scrollsList.pillowFeetFight = createScrollPillowFeetFight();
setup.scrollsList.punishingTheTraitors = createScrollPunishingTheTraitors();
setup.scrollsList.theBasicsOfCombat = createScrollTheBasicsOfCombat();
setup.scrollsList.tributeForTheGoddess = createScrollTributeForTheGoddess();
setup.scrollsList.forbiddenLove = createScrollForbiddenLove();
setup.scrollsList.punReport = createScrollPunishmentReport();
setup.scrollsList.aProperCandidate = createScrollAProperCandidate();
setup.scrollsList.artsSocializing = createScrollTheArtsOfSocializing();
setup.scrollsList.artsBed = createScrollTheArtsOfBed();
setup.scrollsList.artsCombat = createScrollTheArtsOfCombat();
setup.scrollsList.deeperRelationships = createScrollDeeperRelationships();
setup.scrollsList.relsNuance = createScrollRelationshipsNuance();
setup.scrollsList.shSlopes = createScrollShartrishSlopes();
setup.scrollsList.ashCustoms = createScrollAshwalkerCustoms();
setup.scrollsList.intCom = createScrollIntertribalCommunication();
setup.scrollsList.onMartialArts = createScrollOnMartialArts();

window.getScrollsStringList = function() {
	var scrollsList = [];
	for ( var s in setup.scrollsList ) {
		if ( setup.scrollsList[s] instanceof Scroll ) {
			scrollsList.push(setup.scrollsList[s].key);
		}
	}
	return scrollsList;
}
window.getScrollsCharMayFind = function(character) {
	var scrollsList = getScrollsStringList();
	var newScrollsList = [];
	for ( var scr of scrollsList ) {
		if ( gC(character).getFoundScrolls().includes(scr) == false && setup.scrollsList[scr].mayBeFound(character) ) {
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
		case "tutorial":
			txt = "Tutorial";
			break;
	}
	return txt;
}


setup.scrollsKeywords = [
	["1ls", // First loop scrolls
	["onAether","onFamily","theWilds","gleamingCaverns","shapeshifterCustoms","theBasicsOfSex","theBasicsOfCombat","theTasteOfPleasure","surprisedInTheRear","paybackForTheThief","pillowFeetFight","punishingTheTraitors","tributeForTheGoddess","aProperCandidate","artsSocializing","artsBed","artsCombat","deeperRelationships"]],
	["2ls", // Second loop scrolls
	["forbiddenLove","punReport","relsNuance","shSlopes","ashCustoms","intCom"]]
];

window.compressScrollsList = function(sL) {
	// Returns a compressed list of scrolls
	var cSlist = [];
	var cScrolls = [];
	// Add all potential keywords
	for ( var kw of setup.scrollsKeywords ) {
		var validKw = true;
		for ( var sc of kw[1] ) {
			if ( sL.includes(sc) == false ) {
				validKw = false;
			}
		}
		if ( validKw ) {
			cSlist.push(kw[0]);
			cScrolls = cScrolls.concat(kw[1]);
		}
	}
	// Add single scrolls
	for ( var sc of sL ) {
		if ( cScrolls.includes(sc) == false ) {
			cSlist.push(sc);
		}
	}
	return cSlist;
}
window.decompressScrollsList = function(sL) {
	// Returns a decompressed list of scrolls
	var dSlist = [];
	for ( var sc of sL ) {
		var foundKeyword = false;
		for ( var kw of setup.scrollsKeywords ) {
			if ( sc == kw[0] ) {
				dSlist = dSlist.concat(kw[1]);
				foundKeyword = true;
			}
		}
		if ( foundKeyword == false ) {
			dSlist.push(sc);
		}
	}
	return dSlist;
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
