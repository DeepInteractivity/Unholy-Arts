
 // Both vectors (frie,inti,flir,arou,domi,subm,bore,angr) (frie,sext,roma,domi,subm,riva,enmi)
///// MOOD VECTOR /////
// Vector containing mood data. Custom functions to sum mood vector and multiplying them by a given factor

window.MoodVector = function(frie,inti,flir,arou,domi,subm,bore,angr) {
	this.friendly = frie;
	this.intimate = inti;
	this.flirty = flir;
	this.aroused = arou;
	this.dominant = domi;
	this.submissive = subm;
	this.bored = bore;
	this.angry = angr;
}

window.sumMoodVectors = function(mv1,mv2) {
	var mVector = new MoodVector(mv1.friendly + mv2.friendly , mv1.intimate + mv2.intimate , mv1.flirty + mv2.flirty , mv1.aroused + mv2.aroused,
								 mv1.dominant + mv2.dominant , mv1.submissive + mv2.submissive , mv1.bored + mv2.bored , mv1.angry + mv2.angry );
	return mVector;
}

window.moodVectorXFactor = function(mv,factor) {
	var mVector = new MoodVector(mv.friendly * factor , mv.intimate * factor , mv.flirty * factor , mv.aroused * factor , mv.dominant * factor,
								 mv.submissive * factor , mv.bored * factor , mv.angry * factor );
	return mVector;
}

///// RELATION VECTOR /////

window.RelationVector = function(frie,sext,roma,domi,subm,riva,enmi) {
	this.friendship = frie;
	this.sexualTension = sext;
	this.romance = roma;
	this.domination = domi;
	this.submission = subm;
	this.rivalry = riva;
	this.enmity = enmi;
}

window.sumRelationVectors = function(rv1,rv2) {
	var rVector = new RelationVector(rv1.friendship + rv2.friendship , rv1.sexualTension + rv2.sexualTension , rv1.romance + rv2.romance ,
				rv1.domination + rv2.domination , rv1.submission + rv2.submission , rv1.rivalry + rv2.rivalry , rv1.enmity + rv2.enmity );
	return rVector;
}

window.relationVectorXFactor = function(rv,factor) {
	var rVector = new RelationVector(rv.friendship * factor , rv.sexualTension * factor , rv.romance * factor , rv.domination * factor ,
									 rv.submission * factor , rv.rivalry * factor , rv.enmity * factor );
	return rVector;
}

// frie,inti,flir,arou,domi,subm,bore,angr
// frie,sext,roma,domi,subm,riva,enmi
///// SOCIAL INTERACTIONS DATA /////

window.SocInt = function() {
	this.key = "key";
	this.title = "title";
	
	this.actor = null;
	this.target = null;
	this.observers = null;
	this.extraData = null;
	this.sis = null;
	
	this.tags = [];
	this.driveTags = [];
	this.strategyTags = [];
	this.socialDriveCost = 0;
	this.energyCost = 0;
	this.willpowerCost = 0;
	this.priority = 0;
	
	this.weight = 0;
	
	this.topic = "none";
	
	this.socIntDescription = "Description has not been set. Report this to Deep Interactivity.";
	
	this.isValid = function(sis,actor,target,observers,extraData) { return 0; }
		// Determines if the interaction may be granted to the player at the start of the round
	this.isUsable = function(sis,actor,target,observers,extraData) {
		// Determines if the interaction is usable on the selected target
		var flagUsable = false;
		if ( gC(actor).socialdrive.current >= this.socialDriveCost && gC(actor).energy.current >= this.energyCost && gC(actor).willpower.current >= this.willpowerCost ) {
			flagUsable = true;
		}
		return flagUsable;
	}
	this.getWeight = function(sis,actor,target,observers,extraData) { return 0; }
	
	this.calculateExtraEffect = function() { return null; }
	this.extraEffect = null;
	this.evaluateSuccess = function(actor,target,topic) { // Function for AI: It evalues the chance of the interaction's extra effect being successful.
		return true;
	}
	
	this.getMoodMultiplier = function() { return 1; }
	this.getMoodVectorTarget = function() { return null; }
	this.getMoodVectorActor = function() { return null; }
	this.getMoodVectorObservers = function() { return null; }
	
	this.getRelationMultiplier = function() { return 1; }
	this.getRelationVectorTarget = function() { return null; }
	this.getRelationVectorActor = function() { return null; }
	this.getRelationVectorObservers = function() { return null; }
	
	this.getLustDamage = function(actor,target) { return 0; }
	this.getWillpowerDamage = function(actor,target) { return 0; }
	this.getEnergyDamage = function(actor,target) { return 0; }
	this.furtherEffects = function(sis) { return 0; }
	
	this.getDescription = function() {
		//var desc = '<span style="color:darkgray"'+'>[' + this.title + ']</'+'span> ';
		var desc = "[" + this.title + "] ";
		   desc += gC(this.actor).formattedName + " -> " + gC(this.target).formattedName;
		return desc;
	}
}

// Create Social Interactions

	// Chat
window.getChatSocInt = function(type) {
	var socInt = new SocInt();
	socInt.key = "chat";
	socInt.title = "Chat";
	socInt.tags.push("friendly");
	socInt.socialDriveCost = 1;
	
	socInt.topic = type;
	socInt.weight = 10; // Starting weight
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( gC(actor).mood.angry < 30 && gC(actor).mood.aroused < 60 && gC(actor).hasFreeBodypart("mouth") ) {
			flagValid = true;
		}
		return flagValid;
	}
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight;
		nWeight += (gC(actor).mood.friendly * 0.1);
		nWeight -= (gC(actor).mood.angry * 0.2);
		nWeight -= (gC(actor).mood.aroused * 0.1);
		return nWeight;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(2,0,0,0,0,0,0,0);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(1,0,0,0,0,0,0,0);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(1,0,0,0,0,0,0,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.01);
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(2,0,0,0,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(1,0,0,0,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(1,0,0,0,0,0,0);
		return rVector;
	}
	
	socInt.getDescription = function() {
		var desc = randomFromList( [ (ktn(this.actor) + " commented some things about " + this.topic + ".") ,
								     (ktn(this.actor) + " and the others chatted about " + this.topic + ".") ,
								     (ktn(this.actor) + " asked the rest about " + this.topic + ".") ] );
		return desc;
	}
	
	switch(type) {
		case "weather":
		socInt.key += "Weather";
		socInt.title += " about weather";
			break;
		case "routine":
		socInt.key += "Routine";
		socInt.title += " about routine";
			break;
		case "feelings":
		socInt.key += "Feelings";
		socInt.title += " about feelings";
		socInt.tags.push("intimate");
		socInt.driveTags.push("dLove");
		socInt.calculateExtraEffect = function() {
			if ( gC(this.actor).mood.intimate > 50 || gC(this.actor).mood.angry > 30 ) {
				this.getDescription = function() {
					var desc = (ktn(this.actor) + " made a great effort to explain " + gC(this.actor).posPr + " feelings.");
					return desc;
				}
				this.getMoodVectorTarget = function() {
					var mVector = new MoodVector(2,2,0,0,0,0,-1,-1);
					return mVector;
				}
				this.getMoodVectorObservers = function() {
					var mVector = new MoodVector(2,2,0,0,0,0,-1,-1);
					return mVector;
				}
				this.getRelationVectorTarget = function() {
					var rVector = new RelationVector(3,0,3,0,0,-1,-1);
					return rVector;
				}
				this.getRelationVectorObservers = function() {
					var rVector = new RelationVector(2,0,2,0,0,-1,-1);
					return rVector;
				}
			}
		}
			break;
		case "activities":
		socInt.key += "Activities";
		socInt.title += " about activities";
			break;
	}
	return socInt;
}

	// Greet
window.getGreetSocInt = function(type) {
	var socInt = new SocInt();
	socInt.key = "greet";
	socInt.title = "Greet";
	socInt.socialDriveCost = 2;
	socInt.priority = 5;
	
	socInt.topic = type;
	socInt.weight = 50; // Starting weight
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( State.variables.compass.sisList[sis.key].roundsCount < 1 && gC(actor).hasFreeBodypart("mouth") ) {
			flagValid = true;
		}
		return flagValid;
	}
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		return this.weight;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.04);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(3,0,0,0,0,0,0,0);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(1,0,0,0,0,0,0,0);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(3,0,0,0,0,0,0,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02);
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(2,0,0,0,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(1,0,0,0,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(1,0,0,0,0,0,0);
		return rVector;
	}

	switch(type) {
		case "friendly":				// Friendly
		socInt.key = "greetFriendly";
		socInt.title = "Friendly greet";
		socInt.tags.push("friendly");
		
		socInt.getWeight = function(sis,actor,target,observers,extraData) {
			return this.weight + gC(actor).mood.friendly * 0.5 + gC(actor).mood.intimate * 0.2 - gC(actor).mood.angry;
		}
		// Moods
		socInt.getMoodVectorTarget = function() {
			var mVector = new MoodVector(3,0,0,0,0,0,0,-1);
			return mVector;
		}
		socInt.getMoodVectorActor = function() {
			var mVector = new MoodVector(1,0,0,0,0,0,0,-1);
			return mVector;
		}
		socInt.getMoodVectorObservers = function() {
			var mVector = new MoodVector(3,0,0,0,0,0,0,-1);
			return mVector;
		}
		// Relations
		socInt.getRelationVectorTarget = function() {
			var rVector = new RelationVector(2,0,0,0,0,0,0);
			return rVector;
		}
		socInt.getRelationVectorActor = function() {
			var rVector = new RelationVector(1,0,0,0,0,0,0);
			return rVector;
		}
		socInt.getRelationVectorObservers = function() {
			var rVector = new RelationVector(1,0,0,0,0,0,0);
			return rVector;
		}
		socInt.getDescription = function() {
			var desc = "";
			var sisID = State.variables.compass.findFirstSisIdInvolvingCharacter(this.actor);
			if ( State.variables.compass.sisList[sisID].charList > 2 ) {
				desc = ktn(this.actor) + " greeted everyone.";
			} else {
				desc = ktn(this.actor) + " greeted " + ktn(this.target) + ".";
			}
			return desc;
		}
			break;
		case "warm":					// Warm
		socInt.key = "greetWarm";
		socInt.title = "Warm greet";
		socInt.tags = ["friendly","intimate"];
		socInt.socialDriveCost = 3;
	
		socInt.getWeight = function(sis,actor,target,observers,extraData) {
			return this.weight + gC(actor).mood.intimate * 0.5 + gC(actor).mood.friendly * 0.2 - gC(actor).mood.angry;
		}
		// Moods
		socInt.getMoodVectorTarget = function() {
			var mVector = new MoodVector(2,2,0,0,0,0,0,-1);
			return mVector;
		}
		socInt.getMoodVectorActor = function() {
			var mVector = new MoodVector(1,2,0,0,0,0,0,-1);
			return mVector;
		}
		socInt.getMoodVectorObservers = function() {
			var mVector = new MoodVector(2,0,0,0,0,0,0,-1);
			return mVector;
		}
		// Relations
		socInt.getRelationVectorTarget = function() {
			var rVector = new RelationVector(1,0,2,0,0,-1,-1);
			return rVector;
		}
		socInt.getRelationVectorActor = function() {
			var rVector = new RelationVector(1,0,1,0,0,-1,-1);
			return rVector;
		}
		socInt.getRelationVectorObservers = function() {
			var rVector = new RelationVector(1,0,0,0,0,0,0);
			return rVector;
		}
		socInt.getDescription = function() {
			var desc = randomFromList( [ (ktn(this.actor) + " hugged " + ktn(this.target) + ".") ,
										 (ktn(this.actor) + " held " + ktn(this.target) + "'s hands in salute.") ] );
			return desc;
		}
			break;
		case "flirtatious":				// Flirtatious
		socInt.key = "greetFlirtatious";
		socInt.title = "Flirty greet";
		socInt.tags = ["flirty"];
		socInt.driveTags.push("dPleasure");
		socInt.socialDriveCost = 3;
	
		socInt.getWeight = function(sis,actor,target,observers,extraData) {
			return this.weight + gC(actor).mood.flirty * 0.5 + gC(actor).mood.aroused * 0.2 - gC(actor).mood.angry * 0.5
							   + gC(actor).mood.dominant * 0.5;
		}
		// Moods
		socInt.getMoodVectorTarget = function() {
			var mVector = new MoodVector(1,0,3,1,0,0,0,-1);
			return mVector;
		}
		socInt.getMoodVectorActor = function() {
			var mVector = new MoodVector(0,0,1,1,0,0,0,0);
			return mVector;
		}
		socInt.getMoodVectorObservers = function() {
			var mVector = new MoodVector(0,0,0,1,0,0,0,0);
			return mVector;
		}
		// Relations
		socInt.getRelationVectorTarget = function() {
			var rVector = new RelationVector(0,2,1,0,0,0,0);
			return rVector;
		}
		socInt.getRelationVectorActor = function() {
			var rVector = new RelationVector(0,1,1,0,0,0,0);
			return rVector;
		}
		socInt.getRelationVectorObservers = function() {
			var rVector = new RelationVector(0,1,0,0,0,0,0);
			return rVector;
		}
		socInt.getDescription = function() {
			var desc = randomFromList( [ (ktn(this.actor) + " greeted " + ktn(this.target) + " with a spicy compliment.") ,
										 (ktn(this.actor) + " whispered something in " + ktn(this.target) + "'s ear when " + gC(this.actor).perPr
									   + " joined the conversation.") ] );
			return desc;
		}
			break;
		case "sad":						// Sad
		socInt.key = "greetSad";
		socInt.title = "Sad greet";
		socInt.tags = ["intimate","submissive"];
		socInt.getWeight = function(sis,actor,target,observers,extraData) {
			return this.weight + gC(actor).mood.bored * 0.5 + gC(actor).mood.angry * 0.5;
		}
		// Moods
		socInt.getMoodVectorTarget = function() {
			var mVector = new MoodVector(0,2,0,0,2,0,0,-2);
			return mVector;
		}
		socInt.getMoodVectorActor = function() {
			var mVector = new MoodVector(0,2,0,0,0,2,0,0);
			return mVector;
		}
		socInt.getMoodVectorObservers = function() {
			var mVector = new MoodVector(0,0,0,0,0,0,0,-1);
			return mVector;
		}
		// Relations
		socInt.getRelationVectorTarget = function() {
			var rVector = new RelationVector(1,0,1,2,0,0,-1);
			return rVector;
		}
		socInt.getRelationVectorActor = function() {
			var rVector = new RelationVector(0,0,1,0,2,0,-1);
			return rVector;
		}
		socInt.getRelationVectorObservers = function() {
			var rVector = new RelationVector(1,0,0,0,0,-1,0);
			return rVector;
		}
		socInt.getDescription = function() {
			var desc = randomFromList( [ (ktn(this.actor) + " greeted everyone with something in " + gC(this.actor).posPr + " eye.") ,
										 (ktn(this.actor) + " had a meek expression when " + gC(this.actor).perPr + " joined the conversation.") ] );
			return desc;
		}
			break;
		case "cold":					// Cold
		socInt.key = "greetCold";
		socInt.title = "Cold greet";
		socInt.tags = ["angry"];
		socInt.getWeight = function(sis,actor,target,observers,extraData) {
			return this.weight + gC(actor).mood.angry - gC(actor).mood.friendly * 0.5 - gC(actor).mood.intimate * 0.5;
		}
		// Moods
		socInt.getMoodVectorTarget = function() {
			var mVector = new MoodVector(-2,-2,-2,-2,0,0,1,1);
			return mVector;
		}
		socInt.getMoodVectorActor = function() {
			var mVector = new MoodVector(-1,-1,-1,-1,0,-2,2,1);
			return mVector;
		}
		socInt.getMoodVectorObservers = function() {
			var mVector = new MoodVector(-1,-1,-1,-1,0,0,0,0);
			return mVector;
		}
		// Relations
		socInt.getRelationVectorTarget = function() {
			var rVector = new RelationVector(-1,-1,0,-1,0,1,1);
			return rVector;
		}
		socInt.getRelationVectorActor = function() {
			var rVector = new RelationVector(-1,0,0,0,-1,1,1);
			return rVector;
		}
		socInt.getRelationVectorObservers = function() {
			var rVector = new RelationVector(0,0,0,0,0,0,0);
			return rVector;
		}
		socInt.getDescription = function() {
			var desc = randomFromList( [ (ktn(this.actor) + " greeted " + ktn(this.target) + " with contempt.") ,
										 (ktn(this.actor) + " saluted " + ktn(this.target) + " like you would salute villanous scum.") ,
										 (ktn(this.actor) + " greeted " + ktn(this.target) + " with a tense expression.") ] );
			return desc;
		}
			break; 
		case "respectful":				// Respectful
		socInt.key = "greetRespectful";
		socInt.title = "Respectful greet";
		socInt.tags = ["submissive"];
		socInt.getWeight = function(sis,actor,target,observers,extraData) {
			return this.weight + gC(actor).mood.submissive * 1.2;
		}
		// Moods
		socInt.getMoodVectorTarget = function() {
			var mVector = new MoodVector(2,0,0,0,2,-2,0,-2);
			return mVector;
		}
		socInt.getMoodVectorActor = function() {
			var mVector = new MoodVector(1,0,0,0,-2,2,0,-2);
			return mVector;
		}
		socInt.getMoodVectorObservers = function() {
			var mVector = new MoodVector(0,0,0,0,-1,1,0,-1);
			return mVector;
		}
		// Relations
		socInt.getRelationVectorTarget = function() {
			var rVector = new RelationVector(1,0,1,3,-1,-1,-1);
			return rVector;
		}
		socInt.getRelationVectorActor = function() {
			var rVector = new RelationVector(1,1,0,-1,2,-1,-1);
			return rVector;
		}
		socInt.getRelationVectorObservers = function() {
			var rVector = new RelationVector(0,0,0,0,0,0,0);
			return rVector;
		}
		socInt.getDescription = function() {
			var desc = randomFromList( [ (ktn(this.actor) + " bowed " + gC(this.actor).posPr + " head to " + ktn(this.target) + ".") ,
										 (ktn(this.actor) + " made a reverence to " + ktn(this.target) + "." ) ] );
			return desc;
		}	
			break;
	}
	return socInt;
}

	// Talk about
window.getTalkAboutSocInt = function(type) {
	var socInt = new SocInt();
	socInt.key = "talkAbout" + firstToCap(type);
	socInt.title = "Talk about " + type;
	socInt.socialDriveCost = 1;
	socInt.priority = 0;
	socInt.tags.push("friendly");
	
	socInt.topic = type;
	socInt.weight = 10; // Starting weight
	
	socInt.getDescription = function() {
		var desc = randomFromList( [ (ktn(this.actor) + " shared some thoughts about " + this.topic + ".") ,
									 (ktn(this.actor) + " asked " + ktn(this.target) + " about " + this.topic + ".") ,
									 (ktn(this.actor) + " talked about " + this.topic + " in detail.") ] );
		return desc;
	}
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( gC(actor).hasFreeBodypart("mouth") ) {
			flagValid = true;
		}
		return flagValid;
	}
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		return this.weight;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(2,0,0,0,0,0,0,0);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(1,0,0,0,0,0,0,0);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(2,0,0,0,0,0,0,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02);
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(2,0,0,0,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(1,0,0,0,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(1,0,0,0,0,0,0);
		return rVector;
	}
	
	socInt.calculateExtraEffect = function() {
		if ( gC(this.target).likedTopics.includes(this.topic) ) {
			this.getDescription = function() {
				var desc = (ktn(this.actor) + " wanted to discuss about " + this.topic + ". " + ktn(this.target) + " loved to talk "
						 + "about one of " + gC(this.actor).posPr + " passions.");
				return desc;
			}
			this.getMoodVectorTarget = function() {
				var mVector = new MoodVector(4,2,0,0,0,0,-4,-2);
				return mVector;
			}
			this.getRelationVectorTarget = function() {
				var rVector = new RelationVector(4,0,2,0,0,0,-2);
				return rVector;
			}
		}
	}
	
	return socInt;
}

	// Gossip about
window.getGossipAbout = function(charKey,name) {
	var socInt = new SocInt();
	socInt.key = "gossipAbout" + firstToCap(charKey);
	socInt.title = "Gossip about " + name;
	socInt.socialDriveCost = 2;
	socInt.priority = 0;
	socInt.tags.push("friendly");
	
	socInt.topic = charKey;
	socInt.weight = 2; // Starting weight
	
	socInt.getDescription = function() {
		var desc = ktn(this.actor) + " asks " + ktn(this.target) + " about her opinion on " + ktn(this.topic) + " and " + gC(this.target).perPr
				 + " eagerly speaks " + gC(this.target).posPr + " mind.\n";
		desc	+= "__" + gC(this.target).getName() + "'s thoughts on " + gC(this.topic).getName() + "__\n";
		desc	+= getRelationshipDescription(this.target,this.topic)[0] + "\n";
		var rpNames = [ "Friendship", "Sexual Tension", "Romance", "Domination", "Submission", "Rivalry", "Enmity" ];
		var i = 0;
		for ( var relPar in gC(this.target).relations[this.topic] ) {
			if ( gC(this.target).relations[this.topic][relPar] instanceof RelPar ) {
				desc += rpNames[i] + " - Lvl: " + gC(this.target).relations[this.topic][relPar].level;
				var levelMod = gC(this.target).relations[this.topic][relPar].levelMod;
				if ( levelMod > 0 ) {
					desc += "+" + levelMod;
				} else if ( levelMod < 0 ) {
					desc += "-" + -levelMod;
				}
				desc += ">("
				      + formulaRelParTotalLevel(gC(this.target).relations[this.topic][relPar]) + ")"
				      + " | ST: " + gC(this.target).relations[this.topic][relPar].stv.toFixed(1)
				      + " (" + colorText((gC(this.target).relations[this.topic][relPar].stv * 0.05).toFixed(1),"red") + ")"
				      + " | LT: " + gC(this.target).relations[this.topic][relPar].ltv.toFixed(1)
				      + " (" + colorText((gC(this.target).relations[this.topic][relPar].stv * 0.01).toFixed(1),"green") + ")";
				if ( i < 6 ) { desc += "\n"; }
				i++;
			}
		}
		
		return desc;
	}

	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = true;
		if ( sis.charList.includes(this.topic) || ( gC(actor).hasFreeBodypart("mouth") == false ) ) {
			flagValid = false;
		}
		return flagValid;
	}
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight + gC(actor).mood.friendly * 0.03 + gC(actor).mood.intimate * 0.05;
		return this.weight;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(1,2,0,0,0,0,-1,0);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(1,1,0,0,0,0,-2,0);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(0,1,0,0,0,0,-2,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02);
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(1,0,0,0,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(1,0,0,0,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,0,0,0,0,0,0);
		return rVector;
	}
	
	return socInt;
}

	// Praise CHARACTER
window.getPraiseChar = function(charKey,name) {
	var socInt = new SocInt();
	socInt.key = "praiseChar" + firstToCap(charKey);
	socInt.title = "Praise " + name;
	socInt.socialDriveCost = 2;
	socInt.priority = 0;
	socInt.tags.push("friendly");
	
	socInt.topic = charKey;
	socInt.weight = 2; // Starting weight
	
	socInt.getDescription = function() {
		var desc = randomFromList( [
						(ktn(this.actor) + " speaks highly of " + ktn(this.topic) + ", hoping to persuade " + ktn(this.target) + " about " + gC(this.topic).posPr + " virtues."),
						(ktn(this.actor) + " comments that " + gC(this.actor).perPr + " holds " + ktn(this.topic) + " in high esteem."),
						(ktn(this.actor) + " only has nice words for " + ktn(this.topic) + ".") ] );
		desc += "\n" + ktn(this.target) + "'s opinion about " + ktn(this.topic) + " improved."
		
		return desc;
	}

	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = true;
		if ( sis.charList.includes(this.topic) || ( gC(actor).hasFreeBodypart("mouth") == false ) ) {
			flagValid = false;
		}
		return flagValid;
	}
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight + gC(actor).mood.friendly * 0.03 + gC(actor).mood.intimate * 0.05;
		return this.weight;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(1,2,0,0,0,0,-1,0);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(1,1,0,0,0,0,0,0);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(1,0,0,0,0,0,0,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02);
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(1,0,0,0,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(1,0,0,0,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,0,0,0,0,0,0);
		return rVector;
	}
	
	socInt.calculateExtraEffect = function() {
		var score = 0;
		// Does the target dislike the actor or the topic too much?
		score += rLvlAbt(this.target,this.actor,"friendship") * 1 + rLvlAbt(this.target,this.actor,"romance") * 1 - rLvlAbt(this.target,this.actor,"rivalry") * 1 - rLvlAbt(this.target,this.actor,"enmity") * 2;
		if ( gC(this.target).relations.hasOwnProperty(this.topic) ) {
			score += (rLvlAbt(this.target,this.topic,"friendship") * 1 + rLvlAbt(this.target,this.topic,"romance") * 1 - rLvlAbt(this.target,this.topic,"rivalry") * 1 - rLvlAbt(this.target,this.topic,"enmity") * 2) * (0.8 + limitedRandom(0.7));
		}
		
		if ( score >= 0 ) {
			// Success
			if ( gC(this.target).relations.hasOwnProperty(this.topic) ) {
				gC(this.target).relations[this.topic].friendship.stv += 5 + gC(this.actor).charisma.getValue() * 0.05;
				gC(this.target).relations[this.topic].enmity.stv -= 1 + gC(this.actor).charisma.getValue() * 0.02;
			}
		} else {
			// Failure
			this.getDescription = function() {
				var desc = (ktn(this.actor) + " spoke highly of " + ktn(this.topic) + ", but " + ktn(this.target) + " doesn't look convinced.\n" + ktn(this.target) + "'s opinion about " + ktn(this.topic) + " worsened.");
				return desc;
			}
			this.getMoodVectorTarget = function() {
				var mVector = new MoodVector(0,0,0,0,0,0,2,0);
				return mVector;
			}
			this.getRelationVectorTarget = function() {
				var rVector = new RelationVector(-1,0,0,0,0,0,0);
				return rVector;
			}
			if ( gC(this.target).relations.hasOwnProperty(this.topic) ) {
				gC(this.target).relations[this.topic].friendship.stv -= 2 + gC(this.actor).charisma.getValue() * 0.02;
				gC(this.target).relations[this.topic].enmity.stv += 2 + gC(this.actor).charisma.getValue() * 0.02;
			}
		}
	}
	socInt.evaluateSuccess = function(actor,target,topic) {
		var flagSuccess = false;
		var score = rLvlAbt(target,actor,"friendship") * 1 + rLvlAbt(target,actor,"romance") * 1 - rLvlAbt(target,actor,"rivalry") * 1 - rLvlAbt(target,actor,"enmity") * 2;
		score += limitedRandomInt(10) - 5;
		if ( score >= 0 ) { flagSuccess = true; }
		return flagSuccess;
	}
	
	return socInt;
}
	
	// Criticize CHARACTER
window.getCriticizeChar = function(charKey,name) {
	var socInt = new SocInt();
	socInt.key = "criticizeChar" + firstToCap(charKey);
	socInt.title = "Criticize " + name;
	socInt.socialDriveCost = 2;
	socInt.priority = 0;
	socInt.tags.push("angry");
	
	socInt.topic = charKey;
	socInt.weight = 2; // Starting weight
	
	socInt.getDescription = function() {
		var desc = randomFromList( [
						(ktn(this.actor) + " speaks ill of " + ktn(this.topic) + "."),
						(ktn(this.actor) + " complains about " + ktn(this.topic) + "'s attitude."),
						(ktn(this.actor) + " criticizes " + ktn(this.topic) + " behind " + gC(this.topic).posPr + " back.") ] );
		desc += "\n" + ktn(this.target) + "'s opinion about " + ktn(this.topic) + " worsened."
		
		return desc;
	}

	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = true;
		if ( sis.charList.includes(this.topic) || ( gC(actor).hasFreeBodypart("mouth") == false ) ) {
			flagValid = false;
		}
		return flagValid;
	}
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight + gC(actor).mood.friendly * 0.02 + gC(actor).mood.intimate * 0.03 + gC(actor).mood.bored * 0.02 + gC(actor).mood.angry * 0.01;
		return this.weight;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(1,0,0,0,0,0,-1,-1);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(1,0,0,0,0,0,1,0);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(0,0,0,0,0,0,1,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02); 
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(1,0,0,0,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(1,0,0,0,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,0,0,0,0,0,0);
		return rVector;
	}
	
	socInt.calculateExtraEffect = function() {
		var score = 0;
		// Does the target dislike the actor or the topic too much?
		score += rLvlAbt(this.target,this.actor,"friendship") * 1 + rLvlAbt(this.target,this.actor,"romance") * 1 - rLvlAbt(this.target,this.actor,"rivalry") * 1 - rLvlAbt(this.target,this.actor,"enmity") * 2;
		if ( gC(this.target).relations.hasOwnProperty(this.topic) ) {
			score -= (rLvlAbt(this.target,this.topic,"friendship") * 1 + rLvlAbt(this.target,this.topic,"romance") * 1 - rLvlAbt(this.target,this.topic,"rivalry") * 1 - rLvlAbt(this.target,this.topic,"enmity") * 2) * (0.8 + limitedRandom(0.7));
		}
		
		if ( score >= 0 ) {
			// Success
			if ( gC(this.target).relations.hasOwnProperty(this.topic) ) {
				gC(this.target).relations[this.topic].friendship.stv -= 2 + gC(this.actor).charisma.getValue() * 0.03;
				gC(this.target).relations[this.topic].enmity.stv += 4 + gC(this.actor).charisma.getValue() * 0.04;
				gC(this.target).relations[this.topic].rivalry.stv += 2 + gC(this.actor).charisma.getValue() * 0.02;
			}
		} else {
			// Failure
			this.getDescription = function() {
				var desc = (ktn(this.actor) + " denounced " + ktn(this.topic) + ", but " + ktn(this.target) + " doesn't look convinced.\n" + ktn(this.target) + "'s opinion about " + ktn(this.topic) + " improved slightly.");
				return desc;
			}
			this.getMoodVectorTarget = function() {
				var mVector = new MoodVector(0,0,0,0,0,0,2,2);
				return mVector;
			}
			this.getRelationVectorTarget = function() {
				var rVector = new RelationVector(-2,0,0,0,0,1,1);
				return rVector;
			}
			if ( gC(this.target).relations.hasOwnProperty(this.topic) ) {
				gC(this.target).relations[this.topic].friendship.stv += 1 + gC(this.actor).charisma.getValue() * 0.01;
			}
		}
	}
	socInt.evaluateSuccess = function(actor,target,topic) {
		var flagSuccess = false;
		var score = rLvlAbt(target,actor,"friendship") * 1 + rLvlAbt(target,actor,"romance") * 1 - rLvlAbt(target,actor,"rivalry") * 1 - rLvlAbt(target,actor,"enmity") * 2;
		if ( gC(target).relations.hasOwnProperty(topic) ) {
			score -= (rLvlAbt(target,topic,"friendship") * 1 + rLvlAbt(target,topic,"romance") * 1 - rLvlAbt(target,topic,"rivalry") * 1 - rLvlAbt(target,topic,"enmity") * 2) * (0.8 + limitedRandom(0.7));
		}
		score += limitedRandomInt(10) - 5;
		if ( score >= 0 ) { flagSuccess = true; }
		return flagSuccess;
	}
	
	return socInt;
}

	// Ask about values
window.getAskAboutValues = function(type) {
	var socInt = new SocInt();
	socInt.key = "askAboutValues";
	socInt.title = "Ask about values";
	socInt.socialDriveCost = 3;
	socInt.priority = 0;
	socInt.tags.push("intimate");
	
	socInt.topic = "none";
	socInt.weight = 5; // Starting weight
						// TO DO: Change back
	
				 // Both vectors (frie,inti,flir,arou,domi,subm,bore,angr) (frie,sext,roma,domi,subm,riva,enmi)
	
	socInt.getDescription = function() {
		var desc = ktn(this.actor) + " asks " + ktn(this.target) + " about " + gC(this.target).posPr + " values and " + gC(this.target).perPr + " shares " + gC(this.target).posPr + " thoughts.\n";
		desc += textCharactersDrives(this.target);
		
		return desc;
	}

	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( gC(actor).hasFreeBodypart("mouth") ) {
			flagValid = true;
		}
		return flagValid;
	}
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight + gC(actor).mood.friendly * 0.05 + gC(actor).mood.intimate * 0.15 - gC(actor).mood.angry * 0.10 - gC(actor).mood.bored * 0.05;
		return this.weight;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(1,2,0,0,0,0,-2,0);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(1,1,0,0,0,0,-2,0);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(0,1,0,0,0,0,-1,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02);
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(1,0,2,0,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(1,0,1,0,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,0,0,0,0,0,0);
		return rVector;
	}
	
	socInt.calculateExtraEffect = function() {
		var successVars = gC(this.target).mood.friendly + gC(this.target).mood.intimate * 2 + rLvlAbt(this.target,this.actor,"friendship") * 10 + rLvlAbt(this.target,this.actor,"romance") * 10;
		// Base difficulty: 25
		var failureVars = 25 + gC(this.target).mood.angry * 4 + gC(this.target).mood.bored * 2 + rLvlAbt(this.target,this.actor,"enmity") * 20;
		if ( failureVars > successVars ) {
			this.getDescription = function() {
				var desc = (ktn(this.target) + " does not wish to discuss " + gC(this.target).posPr + " values. " + firstToCap(gC(this.target).perPr) + " may reconsider it if " + gC(this.target).perPr + " was in a better mood.");
				desc 	+= " (" + successVars.toFixed(2) + " vs " + failureVars.toFixed(2) + ")";
				return desc;
			}
			this.getMoodVectorTarget = function() {
				var mVector = new MoodVector(-1,-2,-1,-1,0,-1,2,0);
				return mVector;
			}
			this.getMoodVectorActor = function() {
				var mVector = new MoodVector(0,0,0,0,0,0,1,0);
				return mVector;
			}
			this.getMoodVectorObservers = function() {
				var mVector = new MoodVector(0,0,0,0,0,0,2,0);
				return mVector;
			}
			this.getRelationVectorTarget = function() {
				var rVector = new RelationVector(0,0,0,0,-1,0,0);
				return rVector;
			}
			this.getRelationVectorActor = function() {
				var rVector = new RelationVector(0,0,0,0,0,0,0);
				return rVector;
			}
			this.getRelationVectorObservers = function() {
				var rVector = new RelationVector(0,0,0,0,0,0,0);
				return rVector;
			}
		}
	}
	socInt.evaluateSuccess = function(actor,target,topic) {
		var flagSuccess = false;
		var score = gC(target).mood.friendly + gC(target).mood.intimate * 2 + rLvlAbt(target,actor,"friendship") * 10 + rLvlAbt(target,actor,"romance") * 10 - (25 + gC(target).mood.angry * 4 + gC(target).mood.bored * 2 + rLvlAbt(target,actor,"enmity") * 20);
		score += limitedRandomInt(20) - 10;
		if ( score >= 0 ) { flagSuccess = true; }
		return flagSuccess;
	}
	return socInt;
}


	// Compliment
window.getComplimentSocInt = function(type) {
	var socInt = new SocInt();
	socInt.key = "compliment" + firstToCap(type);
	socInt.title = "Compliment " + type;
	socInt.socialDriveCost = 2;
	socInt.priority = 0;
	
	socInt.topic = type;
	socInt.weight = 5; // Starting weight
	
	socInt.getDescription = function() {
		var desc = randomFromList( [ (ktn(this.actor) + " only has great things to say about " + ktn(this.target) + "'s " + this.topic + ".") ,
								     (ktn(this.actor) + " complimented " + ktn(this.target) + "'s " + this.topic + ".") ,
									 (ktn(this.actor) + " praised " + ktn(this.target) + "'s " + this.topic + " like " + gC(this.actor).posPr
									+ " life depended on it.") ] );
		return desc;
	}
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( gC(actor).hasFreeBodypart("mouth") ) {
			flagValid = true;
		}
		return flagValid;
	}
	
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight + gC(actor).mood.friendly * 0.05 + gC(actor).mood.intimate * 0.05 + gC(actor).mood.flirty * 0.05
					  - gC(actor).mood.angry * 0.05 - gC(actor).mood.bored * 0.05;
		return nWeight;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.04);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(3,1,0,0,0,0,0,-1);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(2,0,0,0,0,0,0,-1);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(0,0,0,0,0,0,0,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.04);
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(3,0,1,0,0,-1,-1);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(1,0,0,0,0,-1,-1);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,0,0,0,0,0,0);
		return rVector;
	}
	
	
	switch(type) {
		case "mood":				// Friendly
		//socInt.key += "Mood";
		socInt.title = "Compliment mood";
		socInt.tags.push("friendly");
		socInt.driveTags.push("dCooperation");
		// Mood
		socInt.getMoodVectorTarget = function() {
			var mVector = new MoodVector(3,0,0,0,0,0,0,-1);
			return mVector;
		}
		socInt.getMoodVectorActor = function() {
			var mVector = new MoodVector(2,0,0,0,0,0,0,-1);
			return mVector;
		}
		socInt.getMoodVectorObservers = function() {
			var mVector = new MoodVector(1,0,0,0,0,0,0,-1);
			return mVector;
		}
		// Relations
		socInt.getRelationVectorTarget = function() {
			var rVector = new RelationVector(3,0,0,0,0,0,0);
			return rVector;
		}
		socInt.getRelationVectorActor = function() {
			var rVector = new RelationVector(2,0,0,0,0,0,0);
			return rVector;
		}
		socInt.getRelationVectorObservers = function() {
			var rVector = new RelationVector(1,0,0,0,0,0,0);
			return rVector;
		}
			break;
		case "looks":				// Looks
		//socInt.key += "Looks";
		socInt.title = "Compliment looks";
		socInt.tags.push("friendly","flirty","aroused");
		socInt.driveTags.push("dPleasure");
		// Moods
		socInt.getMoodVectorTarget = function() {
			var mVector = new MoodVector(1,0,2,1,0,0,0,0);
			return mVector;
		}
		socInt.getMoodVectorActor = function() {
			var mVector = new MoodVector(0,0,1,1,0,0,0,0);
			return mVector;
		}
		socInt.getMoodVectorObservers = function() {
			var mVector = new MoodVector(0,0,0,1,0,0,0,0);
			return mVector;
		}
		// Relations
		socInt.getRelationVectorTarget = function() {
			var rVector = new RelationVector(0,3,2,0,0,0,0);
			return rVector;
		}
		socInt.getRelationVectorActor = function() {
			var rVector = new RelationVector(0,2,1,0,0,0,0);
			return rVector;
		}
		socInt.getRelationVectorObservers = function() {
			var rVector = new RelationVector(0,0,0,0,0,0,0);
			return rVector;
		}
			break;
		case "personality":				// Looks
		//socInt.key += "Personality";
		socInt.title = "Compliment personality";
		socInt.tags.push("friendly","intimate","flirty");
		socInt.driveTags.push("dLove");
		// Moods
		socInt.getMoodVectorTarget = function() {
			var mVector = new MoodVector(1,1,2,0,0,0,0,-1);
			return mVector;
		}
		socInt.getMoodVectorActor = function() {
			var mVector = new MoodVector(0,1,1,0,0,0,0,0);
			return mVector;
		}
		socInt.getMoodVectorObservers = function() {
			var mVector = new MoodVector(0,0,0,0,0,0,0,0);
			return mVector;
		}
		// Relations
		socInt.getRelationVectorTarget = function() {
			var rVector = new RelationVector(2,0,3,0,0,0,0);
			return rVector;
		}
		socInt.getRelationVectorActor = function() {
			var rVector = new RelationVector(1,0,2,0,0,0,0);
			return rVector;
		}
		socInt.getRelationVectorObservers = function() {
			var rVector = new RelationVector(0,0,0,0,0,0,0);
			return rVector;
		}
			break;
	}
	return socInt;
}

	// Patronize
window.getPatronizeSocInt = function() {
	var socInt = new SocInt();
	socInt.key = "patronize";
	socInt.title = "Patronize";
	socInt.socialDriveCost = 2;
	socInt.priority = -5;
	
	socInt.weight = 10; // Starting weight
	socInt.tags.push("dominant");
	socInt.driveTags.push("dDomination");
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( gC(actor).hasFreeBodypart("mouth") ) {
			flagValid = true;
		}
		return flagValid;
	}
	
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight + gC(actor).mood.dominant * 0.2 - gC(actor).mood.submissive * 0.2 + gC(actor).mood.bored * 0.05;
		return nWeight;
	}
	
	socInt.getDescription = function() {
		var desc = randomFromList( [ (ktn(this.actor) + " made light of " + ktn(this.target) + "'s opinions.") ,
									 (ktn(this.actor) + " dismissed " + ktn(this.target) + "'s thoughts.") ,
									 (ktn(this.actor) + " rested importance to " + ktn(this.target) + "'s concerns.") ] );
		return desc;
	}
	
	// Moods
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(-1,0,-1,0,0,3,0,1);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(0,0,0,0,3,0,0,-1);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(0,0,0,0,0,0,0,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.04);
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(-1,0,0,0,4,0,1);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(0,0,0,3,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,0,0,0,0,0,0);
		return rVector;
	}
	
	// Extra effect
	socInt.calculateExtraEffect = function() {
		var chance = 5;
		if ( limitedRandomInt(100) <= chance ) {
			// Description
			// Effect
			this.furtherEffects = function(sis) {
				actorGetsCbAgainstTarget(this.target,this.actor);
				var eText = "\n" + gC(this.target).formattedName + " took great offense, and may decide to take " + gC(this.target).posPr + " revenge later.";
				sis.extraEffects += eText; 
			}
		}
	}
	
	return socInt;
}

	// Apologize
window.getApologizeSocInt = function() {
	var socInt = new SocInt();
	socInt.key = "apologize";
	socInt.title = "Apologize";
	socInt.socialDriveCost = 2;
	socInt.priority = 0;
	
	socInt.weight = 20; // Starting weight
	socInt.tags.push("submissive");
	socInt.driveTags.push("dCooperation");
	socInt.strategyTags.push("angerDown");
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = true;
		
		return flagValid;
	}
	
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight - gC(actor).mood.dominant * 0.2 + gC(actor).mood.submissive * 0.4 + gC(actor).mood.angry * 0.2;
		return nWeight;
	}
	
	socInt.getDescription = function() {
		var desc = randomFromList( [
								(ktn(this.actor) + " backed down and repented " + gC(this.actor).posPr + " attitude."),
								(ktn(this.actor) + " apologized to " + ktn(this.target) + "."),
								(ktn(this.actor) + " bowed " + gC(this.actor).posPr + " head in repentace.") ] );
		return desc;
	}
	
	// Moods
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(1,1,0,0,3,-1,0,-5);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(0,0,0,0,0,2,0,-3);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(1,0,0,0,0,0,0,-2);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.04);
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(1,0,0,3,-1,-1,-1);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(0,0,0,0,2,-2,0);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(1,0,0,0,0,0,0);
		return rVector;
	}
	
	return socInt;
}

	// Cool moods down
window.getCoolMoodsDownSocInt = function() {
	var socInt = new SocInt();
	socInt.key = "coolMoodsDown";
	socInt.title = "Cool moods down";
	socInt.socialDriveCost = 2;
	socInt.priority = 0;
	
	socInt.weight = 5; // Starting weight
	socInt.tags.push("friendly");
	socInt.driveTags.push("dAmbition");
	socInt.strategyTags.push("angerDown");
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( gC(actor).hasFreeBodypart("mouth") ) {
			flagValid = true;
		}
		return flagValid;
	}
	
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight + gC(actor).mood.dominant * 0.1 + gC(actor).mood.bored * 0.2 + gC(actor).mood.angry * 0.2;
		return nWeight;
	}
	
	socInt.getDescription = function() {
		var desc = randomFromList( [
								(ktn(this.actor) + " suggested to cool the ambient down."),
								(ktn(this.actor) + " breathed calmly, and asked the other to do the same before continuing."),
								(ktn(this.actor) + " diplomatically asked to relax.") ] );
		return desc;
	}
	
	// Moods
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(0,0,-2,-2,-1,-2,1,-3);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(0,0,-2,-2,-2,-2,1,-4);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(0,0,-1,-1,-1,-1,1,-2);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.04);
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(0,-1,0,0,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(0,0,0,0,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,-1,0,0,0,0,0);
		return rVector;
	}
	
	return socInt;
}
	
	// Assert yourself
window.getSelfAssertSocInt = function() {
	var socInt = new SocInt();
	socInt.key = "selfAssert";
	socInt.title = "Assert yourself";
	socInt.socialDriveCost = 2;
	socInt.priority = 0;
	
	socInt.weight = 5; // Starting weight
	socInt.tags.push("dominant");
	socInt.driveTags.push("dDomination","dAmbition");
	socInt.strategyTags.push("selfSubmissionDown");
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( gC(actor).hasFreeBodypart("mouth") && gC(actor).hasFreeBodypart("eyes") ) {
			flagValid = true;
		}
		return flagValid;
	}
	
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight + gC(actor).mood.submissive * 0.2 + gC(actor).mood.dominant * 0.2 + gC(actor).mood.angry * 0.2;
		return nWeight;
	}
	
	socInt.getDescription = function() {
		var desc = randomFromList( [
								(ktn(this.actor) + " complained about " + ktn(this.target) + "'s attitude."),
								(ktn(this.actor) + " crossed " + gC(this.actor).posPr + " arms, with an assertive expression."),
								(ktn(this.actor) + " locked " + gC(this.actor).posPr + " eyes on " + ktn(this.target) + "'s, challenging " + gC(this.target).posPr + " gaze.") ] );
		return desc;
	}
	
	// Moods
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(-2,0,-1,0,-2,0,0,0);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(-1,0,-1,0,0,-4,0,0);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(-1,0,-1,0,0,0,1,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.04);
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(-1,0,0,-2,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(0,0,0,0,-2,0,0);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,0,0,0,0,0,0);
		return rVector;
	}
	
	return socInt;
}

	// GiveStroke
window.getGiveStrokeSocInt = function(type) {
	var socInt = new SocInt();
	socInt.key = "giveStroke";
	socInt.title = "Give Stroke";
	socInt.tags.push("intimate","aroused","dominant");
	socInt.driveTags.push("dLove");
	socInt.socialDriveCost = 4;
	
	socInt.topic = type;
	socInt.weight = 5; // Starting weight
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( gC(actor).mood.angry < 20 && gC(actor).mood.submissive < 60 &&
		     ( gC(actor).mood.friendly > 20 || gC(actor).mood.aroused > 10 || gC(actor).mood.flirty > 10 ) &&
			 gC(actor).hasFreeBodypart("arms") ) {
			flagValid = true;
		}
		return flagValid;
	}
	// isUsable
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight;
		nWeight *= 1 + gC(actor).mood.dominant * 0.05 + gC(actor).mood.friendly * 0.01 + gC(actor).mood.intimate * 0.02
		         + gC(actor).mood.flirty * 0.02 + gC(actor).mood.aroused * 0.05;
		return nWeight;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.01);
		mult += (gC(this.actor).agility.getValue() * 0.03);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(1,2,0,2,-1,2,0,0);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(0,2,0,1,2,-1,0,0);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(0,0,0,1,0,0,0,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.01);
		mult += (gC(this.actor).agility.getValue() * 0.02);
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(2,2,1,0,2,0,0);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(1,1,1,2,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,1,0,0,0,0,0);
		return rVector;
	}
	
	socInt.calculateExtraEffect = function() {
		var successVars = gC(this.target).mood.friendly + gC(this.target).mood.intimate + gC(this.target).mood.flirty + gC(this.target).mood.aroused
						+ gC(this.target).mood.submissive + rLvlAbt(this.target,this.actor,"submission") * 10 + rLvlAbt(this.target,this.actor,"sexualTension") * 10
						+ rLvlAbt(this.target,this.actor,"romance") * 10;
		// Base difficulty: 25
		var failureVars = 25 + gC(this.target).mood.dominant + gC(this.target).mood.angry + rLvlAbt(this.target,this.actor,"domination") * 10
						+ rLvlAbt(this.target,this.actor,"rivalry") * 10 + rLvlAbt(this.target,this.actor,"enmity") * 10;
		if ( failureVars > successVars ) {
			this.getDescription = function() {
				var desc = (ktn(this.actor) + " tried to have a kind gesture with " + ktn(this.target) + ", but " + gC(this.target).perPr + " refused!");
				desc 	+= " (" + successVars.toFixed(2) + " vs " + failureVars.toFixed(2) + ")";
				return desc;
			}
			this.getMoodVectorTarget = function() {
				var mVector = new MoodVector(0,-1,-1,-1,0,-2,0,2);
				return mVector;
			}
			this.getMoodVectorActor = function() {
				var mVector = new MoodVector(-1,-1,-1,-1,-1,0,1,1);
				return mVector;
			}
			this.getMoodVectorObservers = function() {
				var mVector = new MoodVector(-1,-1,-1,-1,0,0,0,0);
				return mVector;
			}
			this.getRelationVectorTarget = function() {
				var rVector = new RelationVector(0,0,0,0,-2,0,2);
				return rVector;
			}
			this.getRelationVectorActor = function() {
				var rVector = new RelationVector(0,0,0,-2,0,0,2);
				return rVector;
			}
			this.getRelationVectorObservers = function() {
				var rVector = new RelationVector(0,0,0,0,0,0,0);
				return rVector;
			}
		} else {
			this.getLustDamage = function(actor,target) {
				var damage = 0.5 + gCstat(actor,"charisma") * 0.005 + gCstat(actor,"agility") * 0.015;
				return damage;
			}
			this.furtherEffects = function(sis) {
				var eText = "\n" + gC(this.target).formattedName + " received " + textLustDamage(-gC(this.target).lust.attackInConversation(-this.getLustDamage(this.actor,this.target))) + ".";
				sis.extraEffects += eText; 
			}
		}
	}
	socInt.evaluateSuccess = function(actor,target,topic) {
		var flagSuccess = false;
		var score = gC(target).mood.friendly + gC(target).mood.intimate + gC(target).mood.flirty + gC(target).mood.aroused
						+ gC(target).mood.submissive + rLvlAbt(target,actor,"submission") * 10 + rLvlAbt(target,actor,"sexualTension") * 10
						+ rLvlAbt(target,actor,"romance") * 10 - ( 25 + gC(target).mood.dominant + gC(target).mood.angry + rLvlAbt(target,actor,"domination") * 10
						+ rLvlAbt(target,actor,"rivalry") * 10 + rLvlAbt(target,actor,"enmity") * 10);
		score += limitedRandomInt(20) - 10;
		if ( score >= 0 ) { flagSuccess = true; }
		return flagSuccess;
	}
	
	switch(type) {
		case "headpat":
		socInt.key = "giveStrokeHeadpat";
		socInt.title = "Give headpat";
		socInt.socialDriveCost++;
		socInt.getMoodVectorTarget = function() {
			var mVector = new MoodVector(2,2,0,2,-1,3,0,0);
			return mVector;
		}
		socInt.getRelationVectorTarget = function() {
			var rVector = new RelationVector(3,2,1,0,3,0,0);
			return rVector;
		}
		socInt.getDescription = function() {
			var desc = randomFromList( [ (ktn(this.actor) + " petted " + ktn(this.target) + "'s head.") ,
										 (ktn(this.actor) + " patted " + ktn(this.target) + " in the head.") ] );
			return desc;
		}
			break;
		case "face":
		socInt.key = "giveStrokeFace";
		socInt.title = "Stroke face";
		socInt.getMoodVectorTarget = function() {
			var mVector = new MoodVector(2,3,0,2,-1,2,0,0);
			return mVector;
		}
		socInt.getRelationVectorTarget = function() {
			var rVector = new RelationVector(2,2,3,0,2,0,0);
			return rVector;
		}
		socInt.getDescription = function() {
			var desc = randomFromList( [ (ktn(this.actor) + " briefly held " + ktn(this.target) + "'s cheek in " + gC(this.actor).posPr + " hand." ) ,
										 (ktn(this.actor) + " traced a line through " + ktn(this.target) + "'s face.") ] );
			return desc;
		}
			break;
		case "ear":
		socInt.key = "giveStrokeEar";
		socInt.title = "Stroke ear";	
		socInt.getDescription = function() {
			var desc = randomFromList( [ (ktn(this.actor) + " caressed " + ktn(this.target) + "'s ear.") ,
										 (ktn(this.actor) + " gently grabbed " + ktn(this.target) + "'s ear.") ] );
			return desc;
		}
			break;
	}
	
	return socInt;
}

	// AskForStroke
window.getAskForStrokeSocInt = function(type) {
	var socInt = new SocInt();
	socInt.key = "giveStroke";
	socInt.title = "Give Stroke";
	socInt.tags.push("friendly","aroused","submissive");
	socInt.socialDriveCost = 3;
	socInt.driveTags.push("dLove");
	
	socInt.topic = type;
	socInt.weight = 5; // Starting weight
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( gC(actor).mood.angry < 20 &&
		( gC(actor).mood.friendly > 20 || gC(actor).mood.aroused > 10 || gC(actor).mood.flirty > 10 ) ) {
			flagValid = true;
		}
		return flagValid;
	}
	socInt.isUsable = function(sis,actor,target,observers,extraData) {
		// Determines if the interaction is usable on the selected target
		var flagUsable = false;
		if ( (gC(actor).socialdrive.current >= this.socialDriveCost) ) {
			flagUsable = true;
		}
		return flagUsable;
	}
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight;
		nWeight *= 1 + gC(actor).mood.submissive * 0.1 + gC(actor).mood.intimate * 0.03
		         + gC(actor).mood.flirty * 0.03 + gC(actor).mood.aroused * 0.05 - gC(actor).mood.dominant * 0.2;
		return nWeight;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(2,1,1,2,2,0,-1,-1);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(1,0,1,1,-1,3,0,0);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(0,0,0,1,0,0,0,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.02);
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(2,2,2,2,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(1,1,1,0,2,0,0);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,0,0,0,0,0,0);
		return rVector;
	}
	
	switch(type) {
		case "headpat":
		socInt.key = "askForStrokeHeadpat";
		socInt.title = "Ask for headpat";
		socInt.socialDriveCost++;
		socInt.getMoodVectorTarget = function() {
			var mVector = new MoodVector(1,1,0,2,3,-1,0,0);
			return mVector;
		}
		socInt.getRelationVectorTarget = function() {
			var rVector = new RelationVector(3,2,1,3,0,0,0);
			return rVector;
		}
		socInt.getDescription = function() {
			var desc = randomFromList( [ (ktn(this.actor) + " asked " + ktn(this.target) + " for a headpat." ),
										 (ktn(this.actor) + " asked " + ktn(this.target) + " to pet " + gC(this.actor).posPr + " head with a "
										  + '"I broke no dishes!"' + " face.") ] );
			return desc;
		}
			break;
		case "face":
		socInt.key = "askForStrokeFace";
		socInt.title = "Ask for stroke face";
		socInt.tags.push("intimate");
		socInt.getMoodVectorTarget = function() {
			var mVector = new MoodVector(1,2,1,2,3,0,0,0);
			return mVector;
		}
		socInt.getRelationVectorTarget = function() {
			var rVector = new RelationVector(2,2,3,2,0,0,0);
			return rVector;
		}
		socInt.getDescription = function() {
			var desc = randomFromList( [ (ktn(this.actor) + " asked " + ktn(this.target) + " to caress " + gC(this.actor).posPr + " face.") ] );
			return desc;
		}
			break;
		case "ear":
		socInt.key = "askForStrokeEar";
		socInt.title = "Ask for stroke ear";	
		socInt.getDescription = function() {
			var desc = randomFromList( [ (ktn(this.actor) + " asked " + ktn(this.target) + " to caress " + gC(this.actor).posPr + " ear.") ] );
			return desc;
		}
			break;
	}
	
	socInt.calculateExtraEffect = function() {
		var successVars = gC(this.target).mood.friendly + gC(this.target).mood.intimate + gC(this.target).mood.flirty + gC(this.target).mood.aroused
						+ rLvlAbt(this.target,this.actor,"sexualTension") * 10 + rLvlAbt(this.target,this.actor,"romance") * 10;
		// Base difficulty: 15
		var failureVars = 15 + gC(this.target).mood.angry * 10 + rLvlAbt(this.target,this.actor,"rivalry") * 10
						+ rLvlAbt(this.target,this.actor,"enmity") * 10;
		if ( failureVars > successVars ) {
			this.getDescription = function() {
				var desc = (ktn(this.actor) + " asked " + ktn(this.target) + " to have a nice gesture, but " + gC(this.target).perPr + " refused!");
				desc 	+= " (" + successVars.toFixed(2) + " vs " + failureVars.toFixed(2) + ")";
				return desc;
			}
			this.getMoodVectorTarget = function() {
				var mVector = new MoodVector(0,-1,-1,-1,0,-2,0,2);
				return mVector;
			}
			this.getMoodVectorActor = function() {
				var mVector = new MoodVector(-1,-1,-1,-1,-1,0,1,1);
				return mVector;
			}
			this.getMoodVectorObservers = function() {
				var mVector = new MoodVector(-1,-1,-1,-1,0,0,0,0);
				return mVector;
			}
			this.getRelationVectorTarget = function() {
				var rVector = new RelationVector(0,0,0,0,-2,0,2);
				return rVector;
			}
			this.getRelationVectorActor = function() {
				var rVector = new RelationVector(0,0,0,-2,0,0,2);
				return rVector;
			}
			this.getRelationVectorObservers = function() {
				var rVector = new RelationVector(0,0,0,0,0,0,0);
				return rVector;
			}
		} else {
			this.getLustDamage = function(actor,target) {
				var damage = 0.5 + gCstat(target,"charisma") * 0.005 + gCstat(target,"agility") * 0.015;
				return damage;
			}
			this.furtherEffects = function(sis) {
				var eText = "\n" + gC(this.actor).formattedName + " received " + textLustDamage(-gC(this.actor).lust.attackInConversation(-this.getLustDamage(this.actor,this.target))) + ".";
				sis.extraEffects += eText; 
			}
		}
	}
	socInt.evaluateSuccess = function(actor,target,topic) {
		var flagSuccess = false;
		var score = gC(target).mood.friendly + gC(target).mood.intimate + gC(target).mood.flirty + gC(target).mood.aroused
						+ rLvlAbt(target,actor,"sexualTension") * 10 + rLvlAbt(target,actor,"romance") * 10 - ( 15 + gC(target).mood.angry * 10 + rLvlAbt(target,actor,"rivalry") * 10
						+ rLvlAbt(target,actor,"enmity") * 10 );
		score += limitedRandomInt(10) - 5;
		if ( score >= 0 ) { flagSuccess = true; }
		return flagSuccess;
	}
	
	return socInt;
}

	// Insult
window.getInsultSocInt = function(type) {
	var socInt = new SocInt();
	socInt.key = "insult";
	socInt.title = "Insult";
	socInt.tags.push("angry");
	socInt.strategyTags.push("romanceRival");
	socInt.socialDriveCost = 2;
	
	socInt.topic = type;
	socInt.weight = 10; // Starting weight
	
	socInt.getDescription = function() {
			var desc = randomFromList( [ (ktn(this.actor) + " said something about " + ktn(this.target) + "'s " + this.topic
										+ " that would have made " + gC(this.actor).posPr + " mother blush.") ,
										 (ktn(this.actor) + " isn't holding back to declare what " + gC(this.actor).perPr + " thinks about "
										+ ktn(this.target) + "'s " + this.topic + ".") ,
										 ("The screeching of metal cutlery rubbing against a sharp sword would have sounded better to " + ktn(this.target)
										+ "'s ears than what " + ktn(this.actor) + " had to say about " + gC(this.actor).posPr + " " + this.topic + ".") ] );
			return desc;
		}
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( gC(actor).mood.friendly < 40 && gC(actor).hasFreeBodypart("mouth") ) {
			flagValid = true;
		}
		return flagValid;
	}
	// isUsable
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight;
		nWeight *= 1 + gC(actor).mood.angry * 0.1 - gC(actor).mood.friendly * 0.05;
		return nWeight;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.04);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(-5,0,-2,0,-2,0,1,5);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(-3,-1,-1,0,0,-2,0,3);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(-1,0,-1,0,0,0,0,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.04);
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(-2,0,0,-2,0,8,8);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(-2,0,0,0,-2,6,6);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,0,0,0,0,0,0);
		return rVector;
	}
	
	switch(type) {
		case "attitude":
		socInt.key = "insultAttitude";
		socInt.title = "Insult attitude";
			break;
		case "ideals":
		socInt.key = "insultIdeals";
		socInt.title = "Insult ideals";
		socInt.socialDriveCost++;
		socInt.getMoodVectorTarget = function() {
			var mVector = new MoodVector(-6,0,-4,0,-2,0,0,8);
			return mVector;
		}
		socInt.getRelationVectorTarget = function() {
			var rVector = new RelationVector(-3,0,-3,-2,0,10,10);
			return rVector;
		}
			break;
		case "looks":
		socInt.key = "insultLooks";
		socInt.title = "Insult looks";	
			break;
	}
	
	// Extra effect
	socInt.calculateExtraEffect = function() {
		var chance = 25;
		if ( limitedRandomInt(100) <= chance ) {
			// Description
			// Effect
			this.furtherEffects = function(sis) {
				actorGetsCbAgainstTarget(this.target,this.actor);
				var eText = "\n" + gC(this.target).formattedName + " took great offense, and may decide to take " + gC(this.target).posPr + " revenge later.";
				sis.extraEffects += eText; 
			}
		}
	}
	
	return socInt;
}

	// Hold hands
window.getHandholdingSocInt = function(type) {
	var socInt = new SocInt();
	socInt.key = "handholding";
	socInt.title = "Hold hands";
	socInt.socialDriveCost = 3;
	socInt.priority = 0;
	
	socInt.tags = ["intimate","flirty"];
	socInt.driveTags.push("dLove");
	
	socInt.weight = 20; // Starting weight
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( gC(actor).mood.angry < 20 && gC(actor).hasFreeBodypart("arms") ) {
			flagValid = true;
		}
		return flagValid;
	}
	
	socInt.isUsable = function(sis,actor,target,observers,extraData) {
		// Determines if the interaction is usable on the selected target
		var flagUsable = false;
		if ( (gC(actor).socialdrive.current >= this.socialDriveCost) ) {
			flagUsable = true;
		}
		return flagUsable;
	}
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight;
		nWeight = 10 + gC(actor).mood.intimate * 0.05 + gC(actor).mood.flirty * 0.05 - gC(actor).mood.angry * 0.05;
		return nWeight;
	}
	
	socInt.getDescription = function() {
		var desc = randomFromList( [ (ktn(this.actor) + " took " + ktn(this.target) + "'s hand and held it dearly.") ,
									 (ktn(this.actor) + " held " + ktn(this.target) + "'s hands.") ,
									 (ktn(this.actor) + " put some affection in " + ktn(this.target) + "'s hands with " + gC(this.actor).posPr + " her own.") ] );
		return desc;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).will.getValue() * 0.02);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(1,3,3,0,0,0,0,-1);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(0,2,2,0,0,0,0,-1);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(0,0,0,0,0,0,1,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).will.getValue() * 0.02);
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(2,2,2,0,0,0,-1);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(2,2,2,0,0,0,-1);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,0,0,0,0,0,0);
		return rVector;
	}
	
	socInt.calculateExtraEffect = function() {
		var successVars = gC(this.target).mood.friendly + gC(this.target).mood.intimate + gC(this.target).mood.flirty + gC(this.target).mood.aroused
						+ gC(this.target).mood.submissive + rLvlAbt(this.target,this.actor,"submission") * 10 + rLvlAbt(this.target,this.actor,"sexualTension") * 10
						+ rLvlAbt(this.target,this.actor,"romance") * 10;
		// Base difficulty: 30
		var failureVars = 30 + gC(this.target).mood.dominant + gC(this.target).mood.angry + rLvlAbt(this.target,this.actor,"domination") * 10
						+ rLvlAbt(this.target,this.actor,"rivalry") * 10 + rLvlAbt(this.target,this.actor,"enmity") * 10;
		if ( failureVars > successVars ) {
			this.getDescription = function() {
				var desc = (ktn(this.actor) + " tried to have a kind gesture with " + ktn(this.target) + ", but " + gC(this.target).perPr + " refused!");
				desc 	+= " (" + successVars.toFixed(2) + " vs " + failureVars.toFixed(2) + ")";
				return desc;
			}
			this.getMoodVectorTarget = function() {
				var mVector = new MoodVector(0,-1,-1,-1,0,-2,0,2);
				return mVector;
			}
			this.getMoodVectorActor = function() {
				var mVector = new MoodVector(-1,-1,-1,-1,-1,0,1,1);
				return mVector;
			}
			this.getMoodVectorObservers = function() {
				var mVector = new MoodVector(-1,-1,-1,-1,0,0,0,0);
				return mVector;
			}
			this.getRelationVectorTarget = function() {
				var rVector = new RelationVector(0,0,0,0,-2,0,2);
				return rVector;
			}
			this.getRelationVectorActor = function() {
				var rVector = new RelationVector(0,0,0,-2,0,0,2);
				return rVector;
			}
			this.getRelationVectorObservers = function() {
				var rVector = new RelationVector(0,0,0,0,0,0,0);
				return rVector;
			}
		}
	}
	socInt.evaluateSuccess = function(actor,target,topic) {
		var flagSuccess = false;
		var score = gC(target).mood.friendly + gC(target).mood.intimate + gC(target).mood.flirty + gC(target).mood.aroused
						+ gC(target).mood.submissive + rLvlAbt(target,actor,"submission") * 10 + rLvlAbt(target,actor,"sexualTension") * 10
						+ rLvlAbt(target,actor,"romance") * 10 - ( 30 + gC(target).mood.dominant + gC(target).mood.angry + rLvlAbt(target,actor,"domination") * 10
						+ rLvlAbt(target,actor,"rivalry") * 10 + rLvlAbt(target,actor,"enmity") * 10);
		score += limitedRandomInt(20) - 10;
		if ( score >= 0 ) { flagSuccess = true; }
		return flagSuccess;
	}
	
	return socInt;
}

	// Embrace 
window.getEmbraceSocInt = function(type) {
	var socInt = new SocInt();
	socInt.key = "embrace";
	socInt.title = "Embrace";
	socInt.socialDriveCost = 4;
	socInt.priority = 0;
	
	socInt.tags = ["intimate"];
	socInt.driveTags.push("dLove");
	
	socInt.weight = 20; // Starting weight
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( gC(actor).mood.angry < 15 && ( gC(actor).mood.intimate > 35 ) && ( gC(actor).hasFreeBodypart("arms") ) ) {
			flagValid = true;
		}
		return flagValid;
	}
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight;
		nWeight *= 1 + gC(actor).mood.intimate * 0.1 + gC(actor).mood.flirty * 0.02 - gC(actor).mood.angry * 0.2;
		return nWeight;
	}
	
	socInt.getDescription = function() {
		var desc = randomFromList( [ (ktn(this.actor) + " took " + ktn(this.target) + " into " + gC(this.actor).posPr + " arms.") ,
									 (ktn(this.actor) + " hugged " + ktn(this.target) + "'s waist.") ,
									 (ktn(this.actor) + " held " + ktn(this.target) + " so close to " + gC(this.actor).refPr
									+ " that it looked like " + ktn(this.actor) + " needed " + gC(this.target).comPr + " to breathe.") ] );
		return desc;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).will.getValue() * 0.01 + gC(this.actor).physique.getValue() * 0.01 + gC(this.actor).resilience.getValue() * 0.01);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(0,5,2,1,0,0,0,-2);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(0,4,1,1,0,0,0,-2);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(0,0,0,0,0,0,1,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).will.getValue() * 0.01 + gC(this.actor).physique.getValue() * 0.01 + gC(this.actor).resilience.getValue() * 0.01);
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(2,2,4,0,0,0,-2);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(2,2,4,0,0,0,-2);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,0,0,0,0,0,0);
		return rVector;
	}
	
	socInt.calculateExtraEffect = function() {
		var successVars = gC(this.target).mood.friendly + gC(this.target).mood.intimate + gC(this.target).mood.flirty + gC(this.target).mood.aroused
						+ gC(this.target).mood.submissive + rLvlAbt(this.target,this.actor,"submission") * 10 + rLvlAbt(this.target,this.actor,"sexualTension") * 10
						+ rLvlAbt(this.target,this.actor,"romance") * 10;
		// Base difficulty: 40
		var failureVars = 40 + gC(this.target).mood.dominant + gC(this.target).mood.angry + rLvlAbt(this.target,this.actor,"domination") * 10
						+ rLvlAbt(this.target,this.actor,"rivalry") * 10 + rLvlAbt(this.target,this.actor,"enmity") * 10;
		if ( failureVars > successVars ) {
			this.getDescription = function() {
				var desc = (ktn(this.actor) + " tried to have an intimate gesture with " + ktn(this.target) + ", but " + gC(this.target).perPr + " refused!");
				desc 	+= " (" + successVars.toFixed(2) + " vs " + failureVars.toFixed(2) + ")";
				return desc;
			}
			this.getMoodVectorTarget = function() {
				var mVector = new MoodVector(0,-1,-1,-1,0,-2,0,2);
				return mVector;
			}
			this.getMoodVectorActor = function() {
				var mVector = new MoodVector(-1,-1,-1,-1,-1,0,1,1);
				return mVector;
			}
			this.getMoodVectorObservers = function() {
				var mVector = new MoodVector(-1,-1,-1,-1,0,0,0,0);
				return mVector;
			}
			this.getRelationVectorTarget = function() {
				var rVector = new RelationVector(0,0,0,0,-2,0,2);
				return rVector;
			}
			this.getRelationVectorActor = function() {
				var rVector = new RelationVector(0,0,0,-2,0,0,2);
				return rVector;
			}
			this.getRelationVectorObservers = function() {
				var rVector = new RelationVector(0,0,0,0,0,0,0);
				return rVector;
			}
		} else {
			this.getLustDamage = function(actor,target) {
				var damage = 0.5 + gCstat(actor,"will") * 0.01 + gCstat(actor,"physique") * 0.01 + gCstat(actor,"resilience") * 0.01;
				return damage;
			}
			this.furtherEffects = function(sis) {
				var eText = "\n" + gC(this.target).formattedName + " received " + textLustDamage(-gC(this.target).lust.attackInConversation(-this.getLustDamage(this.actor,this.target))) + ".";
				sis.extraEffects += eText; 
			}
		}
	}
	socInt.evaluateSuccess = function(actor,target,topic) {
		var flagSuccess = false;
		var score = gC(target).mood.friendly + gC(target).mood.intimate + gC(target).mood.flirty + gC(target).mood.aroused
						+ gC(target).mood.submissive + rLvlAbt(target,actor,"submission") * 10 + rLvlAbt(target,actor,"sexualTension") * 10
						+ rLvlAbt(target,actor,"romance") * 10 - (40 + gC(target).mood.dominant + gC(target).mood.angry + rLvlAbt(target,actor,"domination") * 10
						+ rLvlAbt(target,actor,"rivalry") * 10 + rLvlAbt(target,actor,"enmity") * 10);
		score += limitedRandomInt(20) - 10;
		if ( score >= 0 ) { flagSuccess = true; }
		return flagSuccess;
	}
	
	return socInt;
}

	// Sensual Stroke
window.getSensualStroke = function(type) {
	var socInt = new SocInt();
	socInt.key = "sensualStroke";
	socInt.title = "Stroke";
	socInt.socialDriveCost = 3;
	socInt.priority = 0;
	
	socInt.tags = ["aroused"];
	socInt.driveTags.push("dPleasure");
	
	socInt.topic = type;
	
	socInt.weight = 15; // Starting weight
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( gC(actor).mood.angry < 20 && ( gC(actor).mood.aroused > 25 ) && gC(actor).hasFreeBodypart("arms") ) {
			flagValid = true;
		}
		return flagValid;
	}
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight;
		nWeight *= 1 + gC(actor).mood.aroused * 0.8 + gC(actor).mood.flirty * 0.4 - gC(actor).mood.angry * 0.1;
		return nWeight;
	}
	
	socInt.getDescription = function() {
		var desc = randomFromList( [ (ktn(this.actor) + " put a lot of care when " + gC(this.actor).perPr + " caressed " + ktn(this.target) + "'s "
									+ this.topic + ", looking for the perfect balance between giving pleasure and leaving " + gC(this.target).comPr
									+ " wanting for more.") ] );
		return desc;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.01) + (gC(this.actor).will.getValue() * 0.01) + (gC(this.actor).agility.getValue() * 0.02);
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(0,1,2,3,0,0,0,0);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(0,0,1,2,0,0,0,0);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(0,0,0,1,0,0,0,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += (gC(this.actor).charisma.getValue() * 0.01) + (gC(this.actor).will.getValue() * 0.01) + (gC(this.actor).agility.getValue() * 0.02);
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(1,4,1,0,1,0,0);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(1,3,1,1,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,0,0,0,0,0,0);
		return rVector;
	}
	
	switch(type) {
		case "legs":
			socInt.key = "sensualStrokeLegs";
			socInt.title = "Stroke legs";
			break;
	}
	
	socInt.calculateExtraEffect = function() {
		var successVars = gC(this.target).mood.friendly + gC(this.target).mood.intimate + gC(this.target).mood.flirty + gC(this.target).mood.aroused
						+ gC(this.target).mood.submissive + rLvlAbt(this.target,this.actor,"submission") * 10 + rLvlAbt(this.target,this.actor,"sexualTension") * 10
						+ rLvlAbt(this.target,this.actor,"romance") * 10;
		// Base difficulty: 60
		var failureVars = 60 + gC(this.target).mood.dominant + gC(this.target).mood.angry + rLvlAbt(this.target,this.actor,"domination") * 10
						+ rLvlAbt(this.target,this.actor,"rivalry") * 10 + rLvlAbt(this.target,this.actor,"enmity") * 10;
		if ( failureVars > successVars ) {
			this.getDescription = function() {
				var desc = (ktn(this.actor) + " tried to have an intimate gesture with " + ktn(this.target) + ", but " + gC(this.target).perPr + " refused!");
				desc 	+= " (" + successVars.toFixed(2) + " vs " + failureVars.toFixed(2) + ")";
				return desc;
			}
			this.getMoodVectorTarget = function() {
				var mVector = new MoodVector(0,-1,-1,-1,0,-2,0,2);
				return mVector;
			}
			this.getMoodVectorActor = function() {
				var mVector = new MoodVector(-1,-1,-1,-1,-1,0,1,1);
				return mVector;
			}
			this.getMoodVectorObservers = function() {
				var mVector = new MoodVector(-1,-1,-1,-1,0,0,0,0);
				return mVector;
			}
			this.getRelationVectorTarget = function() {
				var rVector = new RelationVector(0,0,0,0,-2,0,2);
				return rVector;
			}
			this.getRelationVectorActor = function() {
				var rVector = new RelationVector(0,0,0,-2,0,0,2);
				return rVector;
			}
			this.getRelationVectorObservers = function() {
				var rVector = new RelationVector(0,0,0,0,0,0,0);
				return rVector;
			}
		} else {
			this.getLustDamage = function(actor,target) {
				var damage = 1 + gCstat(actor,"will") * 0.01 + gCstat(actor,"charisma") * 0.01 + gCstat(actor,"agility") * 0.02;
				return damage;
			}
			this.furtherEffects = function(sis) {
				var eText = "\n" + gC(this.target).formattedName + " received " + textLustDamage(-gC(this.target).lust.attackInConversation(-this.getLustDamage(this.actor,this.target))) + ".";
				sis.extraEffects += eText; 
			}
		}
	}
	socInt.evaluateSuccess = function(actor,target,topic) {
		var flagSuccess = false;
		var score = gC(target).mood.friendly + gC(target).mood.intimate + gC(target).mood.flirty + gC(target).mood.aroused
						+ gC(target).mood.submissive + rLvlAbt(target,actor,"submission") * 10 + rLvlAbt(target,actor,"sexualTension") * 10
						+ rLvlAbt(target,actor,"romance") * 10 - ( 60 + gC(target).mood.dominant + gC(target).mood.angry + rLvlAbt(target,actor,"domination") * 10
						+ rLvlAbt(target,actor,"rivalry") * 10 + rLvlAbt(target,actor,"enmity") * 10);
		score += limitedRandomInt(20) - 10;
		if ( score >= 0 ) { flagSuccess = true; }
		return flagSuccess;
	}
	
	return socInt;
}
window.getStrokeButtSocInt = function() {
	var socInt = new SocInt();
	socInt.key = "strokeButt";
	socInt.title = "Stroke butt";
	socInt.socialDriveCost = 4;
	socInt.priority = 0;
	
	socInt.tags = ["aroused","dominant"];
	socInt.driveTags.push("dPleasure");
	
	socInt.weight = 10; // Starting weight
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( gC(actor).mood.angry < 15 && ( gC(actor).mood.aroused > 35 ) && gC(actor).hasFreeBodypart("arms") ) {
			flagValid = true;
		}
		return flagValid;
	}
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight;
		nWeight *= 1 + gC(actor).mood.aroused * 1 + gC(actor).mood.flirty * 0.2 - gC(actor).mood.angry * 0.1;
		return nWeight;
	}
	
	socInt.getDescription = function() {
		var desc = randomFromList( [ 
								(ktn(this.actor) + " discreetly rested " + gC(this.actor).posPr + " hand on " + ktn(this.target) + "'s ass, acting like it was a most natural gesture."),
								(ktn(this.actor) + " took a handful of " + ktn(this.target) + "'s buttocks and massaged it."),
								(ktn(this.actor) + "'s hand grabbed " + ktn(this.target) + "'s butt and played with it like it was its toy.") ] );
								
		return desc;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += ((gC(this.actor).will.getValue() * 0.02) + (gC(this.actor).agility.getValue() * 0.01) + (gC(this.actor).physique.getValue() * 0.01));
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(0,0,2,4,-1,2,0,0);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(0,0,1,3,1,-1,0,0);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(0,0,0,1,-1,0,0,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += ((gC(this.actor).will.getValue() * 0.02) + (gC(this.actor).agility.getValue() * 0.01) + (gC(this.actor).physique.getValue() * 0.01));
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(0,5,2,0,3,0,0);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(0,3,1,2,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,0,0,0,0,0,0);
		return rVector;
	}
	
	socInt.calculateExtraEffect = function() {
		var successVars = gC(this.target).mood.friendly * 0.5 + gC(this.target).mood.intimate * 0.5 + gC(this.target).mood.flirty + gC(this.target).mood.aroused * 2
						+ gC(this.target).mood.submissive + rLvlAbt(this.target,this.actor,"submission") * 15 + rLvlAbt(this.target,this.actor,"sexualTension") * 10
						+ rLvlAbt(this.target,this.actor,"romance") * 5;
		// Base difficulty: 75
		var failureVars = 75 + gC(this.target).mood.dominant + gC(this.target).mood.angry + rLvlAbt(this.target,this.actor,"domination") * 15
						+ rLvlAbt(this.target,this.actor,"rivalry") * 10 + rLvlAbt(this.target,this.actor,"enmity") * 20;
		if ( failureVars > successVars ) {
			this.getDescription = function() {
				var desc = (ktn(this.actor) + " tried to grab " + ktn(this.target) + "'s butt, but was met with reprobation!");
				desc 	+= " (" + successVars.toFixed(2) + " vs " + failureVars.toFixed(2) + ")";
				return desc;
			}
			this.getMoodVectorTarget = function() {
				var mVector = new MoodVector(-1,-1,-1,1,0,-2,0,3);
				return mVector;
			}
			this.getMoodVectorActor = function() {
				var mVector = new MoodVector(-1,-1,-1,-1,-1,0,1,1);
				return mVector;
			}
			this.getMoodVectorObservers = function() {
				var mVector = new MoodVector(-1,-1,-1,-1,0,0,0,0);
				return mVector;
			}
			this.getRelationVectorTarget = function() {
				var rVector = new RelationVector(-1,0,0,0,-2,0,2);
				return rVector;
			}
			this.getRelationVectorActor = function() {
				var rVector = new RelationVector(0,-1,0,-1,0,0,1);
				return rVector;
			}
			this.getRelationVectorObservers = function() {
				var rVector = new RelationVector(-1,0,0,0,0,0,0);
				return rVector;
			}
		} else {
			this.getLustDamage = function(actor,target) {
				var damage = 2 + ((gC(this.actor).will.getValue() * 0.02) + (gC(this.actor).agility.getValue() * 0.01) + (gC(this.actor).physique.getValue() * 0.01));
				return damage;
			}
			this.furtherEffects = function(sis) {
				var eText = "\n" + gC(this.target).formattedName + " received " + textLustDamage(-gC(this.target).lust.attackInConversation(-this.getLustDamage(this.actor,this.target))) + ".";
				sis.extraEffects += eText; 
			}
		}
	}
	socInt.evaluateSuccess = function(actor,target,topic) {
		var flagSuccess = false;
		var score = gC(target).mood.friendly * 0.5 + gC(target).mood.intimate * 0.5 + gC(target).mood.flirty + gC(target).mood.aroused * 2
						+ gC(target).mood.submissive + rLvlAbt(target,actor,"submission") * 15 + rLvlAbt(target,actor,"sexualTension") * 10
						+ rLvlAbt(target,actor,"romance") * 5 - ( 75 + gC(target).mood.dominant + gC(target).mood.angry + rLvlAbt(target,actor,"domination") * 15
						+ rLvlAbt(target,actor,"rivalry") * 10 + rLvlAbt(target,actor,"enmity") * 20 );
		score += limitedRandomInt(20) - 10;
		if ( score >= 0 ) { flagSuccess = true; }
		return flagSuccess;
	}

	return socInt;
}
window.getTeaseCrotchSocInt = function() {
	var socInt = new SocInt();
	socInt.key = "teaseCrotch";
	socInt.title = "Tease crotch";
	socInt.socialDriveCost = 5;
	socInt.priority = 0;
	
	socInt.tags = ["aroused"];
	socInt.driveTags.push("dPleasure");
	
	socInt.weight = 10; // Starting weight
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( gC(actor).mood.angry < 20 && ( gC(actor).mood.aroused > 40 ) && gC(actor).hasFreeBodypart("arms") ) {
			flagValid = true;
		}
		return flagValid;
	}
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight;
		nWeight *= 1 + gC(actor).mood.aroused * 0.9 + gC(actor).mood.flirty * 0.3 - gC(actor).mood.angry * 0.2;
		return nWeight;
	}
	
	socInt.getDescription = function() {
		var desc = randomFromList( [ 
								(ktn(this.actor) + " slid a finger next to " + ktn(this.target) + "'s nethers, teasing " + gC(this.target).comPr + "."),
								(ktn(this.actor) + " teased " + ktn(this.target) + " crotch with " + gC(this.actor).posPr + " hands."),
								(ktn(this.actor) + " caressed " + ktn(this.target) + "'s waist, dangerously close to " + gC(this.target).posPr + " genitals.") ] );
								
		return desc;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += ((gC(this.actor).will.getValue() * 0.02) + (gC(this.actor).agility.getValue() * 0.03));
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(0,1,3,5,-1,1,-3,0);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(0,0,2,3,0,-1,-2,0);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(0,0,0,2,-1,0,-1,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += ((gC(this.actor).will.getValue() * 0.02) + (gC(this.actor).agility.getValue() * 0.03));
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(0,6,3,0,2,1,0);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(0,4,2,2,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,1,0,0,0,0,0);
		return rVector;
	}
	
	socInt.calculateExtraEffect = function() {
		var successVars = gC(this.target).mood.friendly * 0.5 + gC(this.target).mood.intimate * 0.5 + gC(this.target).mood.flirty + gC(this.target).mood.aroused * 2
						+ gC(this.target).mood.submissive + rLvlAbt(this.target,this.actor,"submission") * 15 + rLvlAbt(this.target,this.actor,"sexualTension") * 10
						+ rLvlAbt(this.target,this.actor,"romance") * 5;
		// Base difficulty: 75
		var failureVars = 75 + gC(this.target).mood.dominant + gC(this.target).mood.angry + rLvlAbt(this.target,this.actor,"domination") * 10
						+ rLvlAbt(this.target,this.actor,"rivalry") * 10 + rLvlAbt(this.target,this.actor,"enmity") * 20;
		if ( failureVars > successVars ) {
			this.getDescription = function() {
				var desc = (ktn(this.actor) + " teased " + ktn(this.target) + "'s nethers, but " + gC(this.target).perPr + " reprobated the gesture!");
				desc 	+= " (" + successVars.toFixed(2) + " vs " + failureVars.toFixed(2) + ")";
				return desc;
			}
			
			this.getMoodVectorTarget = function() {
				var mVector = new MoodVector(-1,-2,-1,1,0,-2,-1,3);
				return mVector;
			}
			this.getMoodVectorActor = function() {
				var mVector = new MoodVector(-1,-1,-1,-1,-1,0,1,1);
				return mVector;
			}
			this.getMoodVectorObservers = function() {
				var mVector = new MoodVector(-1,-1,-1,-1,0,0,0,0);
				return mVector;
			}
			this.getRelationVectorTarget = function() {
				var rVector = new RelationVector(-1,0,0,0,-2,0,2);
				return rVector;
			}
			this.getRelationVectorActor = function() {
				var rVector = new RelationVector(0,-1,0,-1,0,0,1);
				return rVector;
			}
			this.getRelationVectorObservers = function() {
				var rVector = new RelationVector(-1,0,0,0,0,0,0);
				return rVector;
			}
		} else {
			this.getLustDamage = function(actor,target) {
				var damage = 2.5 + ((gC(this.actor).will.getValue() * 0.02) + (gC(this.actor).agility.getValue() * 0.03));
				return damage;
			}
			this.furtherEffects = function(sis) {
				var eText = "\n" + gC(this.target).formattedName + " received " + textLustDamage(-gC(this.target).lust.attackInConversation(-this.getLustDamage(this.actor,this.target))) + ".";
				sis.extraEffects += eText; 
			}
		}
	}
	socInt.evaluateSuccess = function(actor,target,topic) {
		var flagSuccess = false;
		var score = gC(target).mood.friendly * 0.5 + gC(target).mood.intimate * 0.5 + gC(target).mood.flirty + gC(target).mood.aroused * 2
						+ gC(target).mood.submissive + rLvlAbt(target,actor,"submission") * 15 + rLvlAbt(target,actor,"sexualTension") * 10
						+ rLvlAbt(target,actor,"romance") * 5 - (75 + gC(target).mood.dominant + gC(target).mood.angry + rLvlAbt(target,actor,"domination") * 10
						+ rLvlAbt(target,actor,"rivalry") * 10 + rLvlAbt(target,actor,"enmity") * 20);
		score += limitedRandomInt(20) - 10;
		if ( score >= 0 ) { flagSuccess = true; }
		return flagSuccess;
	}
	
	return socInt;
}

	// Kiss
window.getKissSocInt = function(type) {
	var socInt = new SocInt();
	socInt.key = "kiss";
	socInt.title = "Kiss";
	socInt.socialDriveCost = 5;
	socInt.priority = 0;
	
	socInt.tags = ["intimate","aroused"];
	socInt.driveTags.push("dLove");
	
	socInt.weight = 25; // Starting weight
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( gC(actor).mood.angry < 15 && ( gC(actor).mood.intimate > 30 || gC(actor).mood.aroused > 30 )
			 && gC(actor).hasFreeBodypart("mouth") ) {
			flagValid = true;
		}
		return flagValid;
	}
	socInt.isUsable = function(sis,actor,target,observers,extraData) {
		// Determines if the interaction is usable on the selected target
		var flagUsable = false;
		if ( (gC(actor).socialdrive.current >= this.socialDriveCost) && gC(actor).hasFreeBodypart("mouth") ) {
			flagUsable = true;
		}
		return flagUsable;
	}
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight;
		nWeight *= 1 + gC(actor).mood.intimate * 0.1 + gC(actor).mood.aroused * 0.1 - gC(actor).mood.angry * 0.2;
		return nWeight;
	}
	
	socInt.getDescription = function() {
		var desc = randomFromList( [ (ktn(this.actor) + " placed " + gC(this.actor).posPr + " lips on " + ktn(this.target) + "'s.") ,
									 (ktn(this.actor) + " joined " + gC(this.actor).posPr + " mouth with " + ktn(this.target) + "'s.") ,
									 (ktn(this.actor) + " and " + ktn(this.target) + " shared an intimate moment when their tongues "
									+ "tried to fuse into one.") ] );
		return desc;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += ( gC(this.actor).will.getValue() * 0.015 + gC(this.actor).charisma.getValue() * 0.015
		      + gC(this.actor).agility.getValue() * 0.015 + gC(this.actor).empathy.getValue() * 0.015 );
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(1,3,2,3,0,0,0,-1);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(1,2,1,2,0,0,0,-1);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(0,0,0,1,0,0,0,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += ( gC(this.actor).will.getValue() * 0.015 + gC(this.actor).charisma.getValue() * 0.015
		      + gC(this.actor).agility.getValue() * 0.015 + gC(this.actor).empathy.getValue() * 0.015 );
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(1,3,3,0,0,0,-1);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(1,3,3,0,0,0,-1);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,0,0,0,0,0,0);
		return rVector;
	}
	
	socInt.calculateExtraEffect = function() {
		var successVars = gC(this.target).mood.friendly + gC(this.target).mood.intimate + gC(this.target).mood.flirty + gC(this.target).mood.aroused
						+ gC(this.target).mood.submissive + rLvlAbt(this.target,this.actor,"submission") * 10 + rLvlAbt(this.target,this.actor,"sexualTension") * 10
						+ rLvlAbt(this.target,this.actor,"romance") * 10;
		// Base difficulty: 50
		var failureVars = 50 + gC(this.target).mood.dominant + gC(this.target).mood.angry + rLvlAbt(this.target,this.actor,"domination") * 10
						+ rLvlAbt(this.target,this.actor,"rivalry") * 10 + rLvlAbt(this.target,this.actor,"enmity") * 10;
		if ( failureVars > successVars ) {
			this.getDescription = function() {
				var desc = (ktn(this.actor) + " tried to have an intimate gesture with " + ktn(this.target) + ", but " + gC(this.target).perPr + " refused!");
				desc 	+= " (" + successVars.toFixed(2) + " vs " + failureVars.toFixed(2) + ")";
				return desc;
			}
			this.getMoodVectorTarget = function() {
				var mVector = new MoodVector(0,-1,-1,-1,0,-2,0,2);
				return mVector;
			}
			this.getMoodVectorActor = function() {
				var mVector = new MoodVector(-1,-1,-1,-1,-1,0,1,1);
				return mVector;
			}
			this.getMoodVectorObservers = function() {
				var mVector = new MoodVector(-1,-1,-1,-1,0,0,0,0);
				return mVector;
			}
			this.getRelationVectorTarget = function() {
				var rVector = new RelationVector(0,0,0,0,-2,0,2);
				return rVector;
			}
			this.getRelationVectorActor = function() {
				var rVector = new RelationVector(0,0,0,-2,0,0,2);
				return rVector;
			}
			this.getRelationVectorObservers = function() {
				var rVector = new RelationVector(0,0,0,0,0,0,0);
				return rVector;
			}
		} else {
			this.getLustDamage = function(actor,target) {
				var damage = 1 + gCstat(actor,"will") * 0.01 + gCstat(actor,"charisma") * 0.01 + gCstat(actor,"agility") * 0.02;
				return damage;
			}
			this.furtherEffects = function(sis) {
				var eText = "\n" + gC(this.target).formattedName + " received " + textLustDamage(-gC(this.target).lust.attackInConversation(-this.getLustDamage(this.actor,this.target))) + ".";
				sis.extraEffects += eText; 
			}
		}
	}
	socInt.evaluateSuccess = function(actor,target,topic) {
		var flagSuccess = false;
		var score = gC(target).mood.friendly + gC(target).mood.intimate + gC(target).mood.flirty + gC(target).mood.aroused
						+ gC(target).mood.submissive + rLvlAbt(target,actor,"submission") * 10 + rLvlAbt(target,actor,"sexualTension") * 10
						+ rLvlAbt(target,actor,"romance") * 10 - ( 50 + gC(target).mood.dominant + gC(target).mood.angry + rLvlAbt(target,actor,"domination") * 10
						+ rLvlAbt(target,actor,"rivalry") * 10 + rLvlAbt(target,actor,"enmity") * 10);
		score += limitedRandomInt(20) - 10;
		if ( score >= 0 ) { flagSuccess = true; }
		return flagSuccess;
	}
	
	return socInt;
}

///// EXTRA SOCIAL INTERACTIONS /////

	// Hypnotic Glance
window.getHypnoticGlanceSocInt = function(type) {
	var socInt = new SocInt();
	socInt.key = "hypnoticGlance";
	socInt.title = "Hypnotic Glance";
	socInt.socialDriveCost = 3;
	socInt.willpowerCost = 2;
	
	socInt.tags = ["dominant"];
	socInt.driveTags.push("dDomination");
	
	socInt.weight = 10; // Starting weight
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		var flagValid = false;
		if ( gC(actor).hasFreeBodypart("eyes") ) {
			flagValid = true;
		}
		return flagValid;
	}
	socInt.isUsable = function(sis,actor,target,observers,extraData) {
		// Determines if the interaction is usable on the selected target
		var flagUsable = false;
		if ( (gC(actor).socialdrive.current >= this.socialDriveCost && gC(actor).energy.current >= this.energyCost && gC(actor).willpower.current >= this.willpowerCost) && gC(actor).hasFreeBodypart("eyes") ) {
			flagUsable = true;
		}
		return flagUsable;
	}
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight;
		//nWeight *= 1 + gC(actor).mood.intimate * 0.1 + gC(actor).mood.aroused * 0.1 - gC(actor).mood.angry * 0.2;
		return nWeight;
	}
	
	socInt.getDescription = function() {
		var desc = randomFromList( [ (ktn(this.actor) + " looks at " + ktn(this.target) + " in a notoriously confident way. " + ktn(this.target) + " listens to " + gC(this.actor).posPr + " every word..."),
									 (ktn(this.actor) + " maintains a mesmerizing expression that " + ktn(this.target) + " can't keep " + gC(this.target).posPr + " eyes off."),
									 ("As " + ktn(this.actor) + " talks, " + ktn(this.target) + " can't draw " + gC(this.target).posPr + " eyes off " + gC(this.actor).posPr + " face.")
									] );
		return desc;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += ( gCstat(this.actor,"charisma") * 0.035 + gCstat(this.actor,"will") * 0.015 );
		return mult;
	}
	socInt.getMoodVectorTarget = function() {
		var mVector = new MoodVector(0,0,0,1,-1,3,0,-1);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(0,0,0,0,2,0,0,0);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(0,0,0,0,0,0,0,1);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() {
		var mult = 1;
		mult += ( gCstat(this.actor,"charisma") * 0.035 + gCstat(this.actor,"will") * 0.015 );
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(0,0,0,0,3,0,-1);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(0,0,0,2,0,0,0);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,0,0,0,0,0,0);
		return rVector;
	}
	
	socInt.getWillpowerDamage = function(actor,target) {
		var damage = 1 + gCstat(actor,"will") * 0.025 + gCstat(actor,"charisma") * 0.015;
		return damage;
	}
	socInt.furtherEffects = function(sis) {
		if ( this.actor == "chPlayerCharacter" ) { addToStVarsList("monActUs"); }
		var eText = "\n" + gC(this.target).formattedName + " received " + textWillpowerDamage(-gC(this.target).willpower.attackInConversation(-this.getWillpowerDamage(this.actor,this.target))) + ".";
		sis.extraEffects += eText; 
	}
	
	return socInt;
}

	// Relaxing incense
window.getRelaxingScent = function(type) {
	var socInt = new SocInt();
	socInt.key = "relaxingScent";
	socInt.title = "Relaxing Scent";
	socInt.socialDriveCost = 3;
	socInt.priority = 0;
	
	socInt.tags = ["friendly","intimate","submissive"];
	socInt.driveTags.push("dCooperation");
	socInt.strategyTags.push("angerDown","selfSubmissionDown");
	
	socInt.weight = 10; // Starting weight
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		return true;
	}
	socInt.isUsable = function(sis,actor,target,observers,extraData) {
		// Determines if the interaction is usable on the selected target
		var flagUsable = false;
		if ( (gC(actor).socialdrive.current >= this.socialDriveCost) ) {
			flagUsable = true;
		}
		return flagUsable;
	}
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight + gC(actor).mood.submissive * 0.1 + gC(actor).mood.friendly * 0.05 - gC(actor).mood.angry * 0.1;
		//nWeight *= 1 + gC(actor).mood.intimate * 0.1 + gC(actor).mood.aroused * 0.1 - gC(actor).mood.angry * 0.2;
		return nWeight;
	}
	
	socInt.getDescription = function() {
		var desc = randomFromList( [ ( "A relaxing scent fills the air, and it soon fills your lungs." ),
									 ( ktn(this.actor) + " smells funny... And the smell makes you want to close your eyes."),
									 ( "A gentle fragance is coming from " + ktn(this.actor) + "." )
									] );
		return desc;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += ( gCstat(this.actor,"will") * 0.025 + gCstat(this.actor,"resilience") * 0.015 + gCstat(this.actor,"luck") * 0.015 );
		return mult;
	}
	socInt.getMoodVectorTarget = function() { // (frie,inti,flir,arou,domi,subm,bore,angr)
		var mVector = new MoodVector(1,1,0,0,-2,0,0,-3);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(0,1,0,0,0,0,0,-2);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(1,1,0,0,-2,0,0,-3);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() { // frie,sext,roma,domi,subm,riva,enmi
		var mult = 1;
		mult += ( gCstat(this.actor,"will") * 0.025 + gCstat(this.actor,"resilience") * 0.015 + gCstat(this.actor,"luck") * 0.015 );
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(1,0,0,-1,0,-1,-1);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(1,0,0,-1,0,-1,-1);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(1,0,0,-1,0,-1,-1);
		return rVector;
	}
	
	return socInt;
}

	// Telephatic connection
window.getTelephaticConnection = function(type) {
	var socInt = new SocInt();
	socInt.key = "telephaticConnection";
	socInt.title = "Telephatic Connection";
	socInt.socialDriveCost = 2;
	socInt.willpowerCost = 2;
	socInt.priority = 0;
	
	socInt.tags = ["friendly","intimate"];
	socInt.driveTags = ["dLove"];
	
	socInt.weight = 10; // Starting weight
	
	socInt.isValid = function(sis,actor,target,observers,extraData) {
		return true;
	}
	socInt.isUsable = function(sis,actor,target,observers,extraData) {
		// Determines if the interaction is usable on the selected target
		var flagUsable = false;
		if ( (gC(actor).socialdrive.current >= this.socialDriveCost && gC(actor).energy.current >= this.energyCost && gC(actor).willpower.current >= this.willpowerCost) ) {
			flagUsable = true;
		}
		return flagUsable;
	}
	socInt.getWeight = function(sis,actor,target,observers,extraData) {
		var nWeight = this.weight + gC(actor).mood.intimate * 0.1 + gC(actor).mood.friendly * 0.05 - gC(actor).mood.angry * 0.2 - gC(actor).mood.bored * 0.05;
		return nWeight;
	}
	
	socInt.getDescription = function() {
		var desc = randomFromList( [ ( ktn(this.actor) + "'s and " + ktn(this.target) + "'s eyes meet, and their faces freeze for a moment." ),
									 ( ktn(this.actor) + " has captured " + ktn(this.target) + "'s attention. They do not need words to express their feelings." )
									] );
		return desc;
	}
	
	socInt.getMoodMultiplier = function() {
		var mult = 1;
		mult += ( gCstat(this.actor,"will") * 0.025 + gCstat(this.actor,"intelligence") * 0.015 + gCstat(this.actor,"empathy") * 0.015 );
		return mult;
	}
	socInt.getMoodVectorTarget = function() { // (frie,inti,flir,arou,domi,subm,bore,angr)
		var mVector = new MoodVector(2,5,0,0,0,0,-1,-3);
		return mVector;
	}
	socInt.getMoodVectorActor = function() {
		var mVector = new MoodVector(1,4,0,0,0,0,-1,-2);
		return mVector;
	}
	socInt.getMoodVectorObservers = function() {
		var mVector = new MoodVector(0,0,0,0,0,0,0,0);
		return mVector;
	}
	
	socInt.getRelationMultiplier = function() { // frie,sext,roma,domi,subm,riva,enmi
		var mult = 1;
		mult += ( gCstat(this.actor,"will") * 0.025 + gCstat(this.actor,"intelligence") * 0.015 + gCstat(this.actor,"empathy") * 0.015 );
		return mult;
	}
	socInt.getRelationVectorTarget = function() {
		var rVector = new RelationVector(2,0,5,0,0,0,-1);
		return rVector;
	}
	socInt.getRelationVectorActor = function() {
		var rVector = new RelationVector(1,0,3,0,0,0,-1);
		return rVector;
	}
	socInt.getRelationVectorObservers = function() {
		var rVector = new RelationVector(0,0,0,0,0,0,0);
		return rVector;
	}
	
	return socInt;
	
}

////////// SOCIAL INTERACTIONS DATABASE //////////
// Social Interactions Database, get their requirements, effects, etc. from here

window.siDatabase = function() {
	// Greet
	this.greetFriendly = getGreetSocInt("friendly");
	this.greetWarm = getGreetSocInt("warm");
	this.greetFlirtatious = getGreetSocInt("flirtatious");
	this.greetCold = getGreetSocInt("cold");
	this.greetSad = getGreetSocInt("sad");
	this.greetRespectful = getGreetSocInt("respectful");
	// Chat
	this.chatWeather = getChatSocInt("weather");
	this.chatRoutine = getChatSocInt("routine");
	this.chatFeelings = getChatSocInt("feelings");
	this.chatActivities = getChatSocInt("activities");
	// Talk about
	this.talkAboutFauna = getTalkAboutSocInt("fauna");
	this.talkAboutFlora = getTalkAboutSocInt("flora");
	this.talkAboutTraining = getTalkAboutSocInt("training");
	this.talkAboutDramas = getTalkAboutSocInt("dramas");
	this.talkAboutMusic = getTalkAboutSocInt("music");
	// Gossip about
	this.gossipAboutChPlayerCharacter = getGossipAbout("chPlayerCharacter","Player");
	this.gossipAboutChVal = getGossipAbout("chVal","Valtan");
	this.gossipAboutChMir = getGossipAbout("chMir","Padmiri");
	this.gossipAboutChNash = getGossipAbout("chNash","Nashillbyir");
	this.gossipAboutChClaw = getGossipAbout("chClaw","Claw");
	this.gossipAboutChAte = getGossipAbout("chAte","Maaterasu");
	// Praise/Criticize char
	var it = 0;
	var charNames = ["Player","Valtan","Padmiri","Nashillbyir","Claw","Maaterasu"];
	for ( var charKey of ["chPlayerCharacter","chVal","chMir","chNash","chClaw","chAte"] ) {
		this[("praiseChar" + firstToCap(charKey))] = getPraiseChar(charKey,charNames[it]);
		this[("criticizeChar" + firstToCap(charKey))] = getCriticizeChar(charKey,charNames[it]);
		it++;
	}
	// Ask about values
	this.askAboutValues = getAskAboutValues("nothing");
	// Compliment
	this.complimentMood = getComplimentSocInt("mood");
	this.complimentLooks = getComplimentSocInt("looks");
	this.complimentPersonality = getComplimentSocInt("personality");
	// Patronize, apologize, cool moods down, assert yourself
	this.patronize = getPatronizeSocInt();
	this.apologize = getApologizeSocInt();
	this.coolMoodsDown = getCoolMoodsDownSocInt();
	this.selfAssert = getSelfAssertSocInt();
	// Give Stroke
	this.giveStrokeEar = getGiveStrokeSocInt("ear");
	this.giveStrokeFace = getGiveStrokeSocInt("face");
	this.giveStrokeHeadpat = getGiveStrokeSocInt("headpat");
	// Ask for stroke
	this.askForStrokeEar = getAskForStrokeSocInt("ear");
	this.askForStrokeFace = getAskForStrokeSocInt("face");
	this.askForStrokeHeadpat = getAskForStrokeSocInt("headpat");
	// Insult
	this.insultAttitude = getInsultSocInt("attitude");
	this.insultIdeals = getInsultSocInt("ideals");
	this.insultLooks = getInsultSocInt("looks");
	// Physical
	this.handholding = getHandholdingSocInt("");
	this.embrace = getEmbraceSocInt("");
	this.sensualStrokeLegs = getSensualStroke("legs");
	this.strokeButt = getStrokeButtSocInt();
	this.teaseCrotch = getTeaseCrotchSocInt();
	this.kiss = getKissSocInt("kiss");
};

window.siExtraDatabase = function() {
	// Hypnosis
	this.hypnoticGlance = getHypnoticGlanceSocInt("hypnoticGlance");
	this.relaxingScent = getRelaxingScent();
}

setup.siList = new siDatabase();
setup.siListExtra = new siExtraDatabase();

window.getSiByKey = function(key) {
	if ( setup.siList.hasOwnProperty(key) ) {
		return setup.siList[key];
	} else {
		return setup.siListExtra[key];
	}
}

window.getAllSocialInteractions = function() {
	var siList = []; // Social Interaction Keys
	
	for ( var si in setup.siList ) {
		if ( setup.siList[si].hasOwnProperty("title") ) {
//		if ( setup.siList[si] instanceof SocInt ) {
			siList.push(setup.siList[si].key);
		}
	}
	
	return siList;
}
window.getAllCharExtraSocialInteractions = function(charKey) {
	var extraSiList = []; // Social Interactions Keys
	
	for ( var si of gC(charKey).extraSocIntList ) {
		if ( setup.siListExtra[si].hasOwnProperty("title") ) {
			extraSiList.push(setup.siListExtra[si].key);
		}
	}
	
	return extraSiList
}
// Constructors, serializers, etc.
siDatabase.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
siDatabase.prototype.clone = function () {
	return (new siDatabase())._init(this);
};
siDatabase.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new siDatabase())._init($ReviveData$)', ownData);
};

siExtraDatabase.prototype._init = function (obj) {
	Object.keys(obj).forEach(function (pn) {
		this[pn] = clone(obj[pn]);
	}, this);
	
	return this;
};
siExtraDatabase.prototype.clone = function () {
	return (new siExtraDatabase())._init(this);
};
siExtraDatabase.prototype.toJSON = function() {
	var ownData = {};
	Object.keys(this).forEach(function (pn) {
		ownData[pn] = clone(this[pn]);
	}, this);
	return JSON.reviveWrapper('(new siExtraDatabase())._init($ReviveData$)', ownData);
};





