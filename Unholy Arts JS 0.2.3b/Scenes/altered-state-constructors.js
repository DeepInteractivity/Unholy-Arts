////////// ALTERED STATE CONSTRUCTORS //////////
// These are invoked by scene actions, events or others, and applied to a characterSet
// Max intensity = 10
window.fixIntensity = function(inIntensity) {
	var intensity = inIntensity;
	if ( intensity < 0 ) { intensity = 0; }
	else if ( intensity > 10 ) { intensity = 10; }
	return intensity;
}

window.createASfrozenFeet = function(intensity) {
	// Extra energy cost, control recovery reduction, agility loss (sum, mult) // Turns
	var eec = 5 + intensity * 1; // 5 ~ 15
	var crc = 0.05 + intensity * 0.005; // 0.05 ~ 0.1
	var als = 2 + intensity * 0.3; // 2 ~ 5
	var alm = 0.05 + intensity * 0.005; // 0.05 ~ 0.1
	var turns = 4 + limitedRandomInt(2); // 4 ~ 6
	var provokeEffect = function(charKey) {
		gC(charKey).energy.tainted += eec;
		gC(charKey).controlRecovery -= crc;
		gC(charKey).agility.sumModifier -= als;
		gC(charKey).agility.multModifier -= alm;
	}
	var cancelEffect = function(charKey) {
		gC(charKey).energy.tainted -= eec;
		gC(charKey).controlRecovery += crc;
		gC(charKey).agility.sumModifier += als;
		gC(charKey).agility.multModifier += alm;
	}
	var description = "Intense cold in the legs and feet are causing mobility issues to this character.\n"
					+ "Loss of agility, weakened control recovery, energy becomes tainted.";
	var as = new alteredState("Frozen feet","FrFe","scene",turns,provokeEffect,cancelEffect,description);
	as.type = "debuff";
	return as;
}

window.createASsensitizedGenitals = function(intensity) {
	// Extra sex weakness // Turns
	var esw = 5 + intensity * 1; // 5 - 15
	var turns = 4 + limitedRandomInt(2); // 4 ~ 6
	var provokeEffect = function(charKey) {
		gC(charKey).combatAffinities.sex.weakness += esw;
	}
	var cancelEffect = function(charKey) {
		gC(charKey).combatAffinities.sex.weakness -= esw;
	}
	var description = "The contact with electric shocks have sensitized the genitals of this character.\n"
					+ "Increased damage from sex attacks.";
	var as = new alteredState("Sensitized genitals","SeGe","scene",turns,provokeEffect,cancelEffect,description);
	as.type = "debuff";
	return as;
}

window.createAScoldGuts = function(intensity) {
	// Stats gain , increased lust resistance
	var sgs = 2 + intensity * 0.4; // 2 ~ 6
	var sgm = 0.06 + intensity * 0.012; // 0.06 ~ 0.18
	var isr = 10 + intensity * 1; // 10 ~ 20
	var turns = 4 + limitedRandomInt(2); // 4 ~ 6
	var provokeEffect = function(charKey) {
		gC(charKey).physique.sumModifier += sgs;
		gC(charKey).physique.multModifier += sgm;
		gC(charKey).resilience.sumModifier += sgs;
		gC(charKey).resilience.multModifier += sgm;
		gC(charKey).will.sumModifier += sgs;
		gC(charKey).will.multModifier += sgm;
		gC(charKey).combatAffinities.sex.resistance += isr;
	}
	var cancelEffect = function(charKey) {
		gC(charKey).physique.sumModifier -= sgs;
		gC(charKey).physique.multModifier -= sgm;
		gC(charKey).resilience.sumModifier -= sgs;
		gC(charKey).resilience.multModifier -= sgm;
		gC(charKey).will.sumModifier -= sgs;
		gC(charKey).will.multModifier -= sgm;
		gC(charKey).combatAffinities.sex.resistance -= isr;
	}
	var description = "This character is focused in the proper use of their inner energy.\n"
					+ "Increased physique, resilience, will and resistance to sex actions.";
	var as = new alteredState("Cold guts","CoGu","scene",turns,provokeEffect,cancelEffect,description);
	as.type = "buff";
	return as;
}

window.createAStaunted = function(intensity) {
	// Stats loss , Extra physical strength eps // Turns
	var sls = 2 + intensity * 0.3; // 2 ~ 5
	var slm = 0.05 + intensity * 0.005; // 0.05 ~ 01
	var eps = 10 + intensity * 0.5; // 10 ~ 15
	var turns = 4 + limitedRandomInt(2); // 4 ~ 6
	var provokeEffect = function(charKey) {
		gC(charKey).luck.sumModifier -= sls;
		gC(charKey).luck.multModifier -= slm;
		gC(charKey).perception.sumModifier -= sls;
		gC(charKey).perception.multModifier -= slm;
		gC(charKey).agility.sumModifier -= sls;
		gC(charKey).agility.multModifier -= slm;
		gC(charKey).will.sumModifier -= sls;
		gC(charKey).will.multModifier -= slm;
		gC(charKey).physique.sumModifier += sls;
		gC(charKey).physique.multModifier += slm;
		gC(charKey).combatAffinities.physical.strength += eps;
	}
	var cancelEffect = function(charKey) {
		gC(charKey).luck.sumModifier += sls;
		gC(charKey).luck.multModifier += slm;
		gC(charKey).perception.sumModifier += sls;
		gC(charKey).perception.multModifier += slm;
		gC(charKey).agility.sumModifier += sls;
		gC(charKey).agility.multModifier += slm;
		gC(charKey).will.sumModifier += sls;
		gC(charKey).will.multModifier += slm;
		gC(charKey).physique.sumModifier -= sls;
		gC(charKey).physique.multModifier -= slm;
		gC(charKey).combatAffinities.physical.strength -= eps;
	}
	var description = "The ego of this character has been damaged.\n"
					+ "Loss of luck, perception, agility and will. Gain of physique and physical damage.";
	var as = new alteredState("Taunted","Tntd","scene",turns,provokeEffect,cancelEffect,description);
	as.type = "debuff";
	return as;
}

window.createASteased = function(intensity, type) {
	// Sex weakness, sex strength, random sex type weakness // Turns
	var sType = "target" + firstToCap(type);
	var esw = 10 + intensity * 1; // 10 - 20
	var ess = 5 + intensity * 0.5; // 5 - 01
	var etw = 10 + intensity * 1; // 10 - 20
	var turns = 4 + limitedRandomInt(2); // 4 ~ 6
	var provokeEffect = function(charKey) {
		gC(charKey).combatAffinities.sex.weakness += esw;
		gC(charKey).combatAffinities.sex.strength += ess;
		if ( type != "targetNone" ) {
			gC(charKey).combatAffinities[sType].weakness += etw;
		}
	}
	var cancelEffect = function(charKey) {
		gC(charKey).combatAffinities.sex.weakness -= esw;
		gC(charKey).combatAffinities.sex.strength -= ess;
		if ( type != "targetNone" ) {
			gC(charKey).combatAffinities[sType].weakness -= etw;
		}
	}
	var description = "This character has their head filled with erotic fantasies.\n"
					+ "Increased received and provoked sex damage, specific sex-related weakness.";
	var as = new alteredState("Teased","Tsed","scene",turns,provokeEffect,cancelEffect,description);
	as.type = "debuff";
	return as;
}

// Hypnosis

window.createAShypnosisStroke = function(intensity) {
	// Will (sum,mult), perception(sum,mult), control recovery loss // Turns
	var wls = 2 + intensity * 0.2; // 2 ~ 4
	var wlm = 0.05 + intensity * 0.0005; // 0.05 ~ 1
	var pls = 2 + intensity * 0.2; // 2 ~ 4
	var plm = 0.05 + intensity * 0.0005; // 0.05 ~ 1
	var crl = 0.08 + intensity * 0.007; // 0.08 ~ 0.15
	var turns = 4 + limitedRandomInt(2); // 4 ~ 6
	
	var provokeEffect = function(charKey) {
		gC(charKey).controlRecovery -= crl;
		gC(charKey).will.sumModifier -= wls;
		gC(charKey).will.multModifier -= wlm;
		gC(charKey).perception.sumModifier -= pls;
		gC(charKey).perception.multModifier -= plm;
	}
	var cancelEffect = function(charKey) {
		gC(charKey).controlRecovery += crl;
		gC(charKey).will.sumModifier += wls;
		gC(charKey).will.multModifier += wlm;
		gC(charKey).perception.sumModifier += pls;
		gC(charKey).perception.multModifier += plm;
	}
	var description = "This character has been confused and disoriented.\nLoss of will and perception, weakened control recovery.";
	
	var as = new alteredState("Hypnosis stroke","HySt","scene",turns,provokeEffect,cancelEffect,description);
	as.type = "debuff";
	return as;
}

// Bondage

window.createASaetherialChainsArms = function(intensity) {
	// Phyisique, agility loss (sum, mult), locked arms // Turns
	var als = 3 + intensity * 0.4; // 3 ~ 7
	var alm = 0.1 + intensity * 0.01; // 0.1 ~ 0.2
	var pls = 3 + intensity * 0.4; // 3 ~ 7
	var plm = 0.1 + intensity * 0.01; // 0.1 ~ 0.2
	var turns = 3 + limitedRandomInt(1); // 3 ~ 4
	var provokeEffect = function(charKey) {
		gC(charKey).agility.sumModifier -= als;
		gC(charKey).agility.multModifier -= alm;
		gC(charKey).physique.sumModifier -= pls;
		gC(charKey).physique.multModifier -= plm;
		gC(charKey).body.arms.state = "locked";
	}
	var cancelEffect = function(charKey) {
		gC(charKey).agility.sumModifier += als;
		gC(charKey).agility.multModifier += alm;
		gC(charKey).physique.sumModifier += pls;
		gC(charKey).physique.multModifier += plm;
		gC(charKey).body.arms.state = "free";
	}
	var description = "Chains made out of aether block the movement of their arms.\n"
					+ "Arms locked, loss of phyique and agility.";
	var as = new alteredState("Chained arms","ChAr","scene",turns,provokeEffect,cancelEffect,description);
	as.type = "debuff";
	return as;
}

	// Vines

window.createASvinesLockArms = function(intensity) {
	// Agility loss (sum, mult), reduced control recovery locked arms // Turns
	var sls = 4 + intensity * 0.4; // 4 ~ 8
	var slm = 0.12 + intensity * 0.012; // 0.12 ~ 0.24
	var dcr = 0.05 + intensity * 0.01; // 0.05 ~ 0.15
	var turns = 3 + limitedRandomInt(1); // 3 ~ 4
	var provokeEffect = function(charKey) {
		gC(charKey).agility.sumModifier -= sls;
		gC(charKey).agility.multModifier -= slm;
		gC(charKey).controlRecovery -= dcr;
		gC(charKey).body.arms.state = "locked";
	}
	var cancelEffect = function(charKey) {
		gC(charKey).agility.sumModifier += sls;
		gC(charKey).agility.multModifier += slm;
		gC(charKey).controlRecovery += dcr;
		gC(charKey).body.arms.state = "free";
	}
	var description = "Vines are locking the arms of this character.\n"
					+ "Arms locked, loss of agility and control recovery.";
	var as = new alteredState("Vines Lock Arms","VnLk","scene",turns,provokeEffect,cancelEffect,description);
	as.type = "debuff";
	return as;
}


// Pain

window.createASscratched = function(intensity) {
	// Extra energy cost, extra pain damage, agility loss (sum, mult) // Turns
	var eec = 5 + intensity * 1; // 5 ~ 15
	var als = 2 + intensity * 0.2; // 2 ~ 4
	var alm = 0.05 + intensity * 0.005; // 0.05 ~ 0.1
	var epd = 10 + intensity * 1; // 0.1 ~ 0.2
	var turns = 4 + limitedRandomInt(1); // 4 ~ 5
	var provokeEffect = function(charKey) {
		gC(charKey).energy.tainted += eec;
		gC(charKey).agility.sumModifier -= als;
		gC(charKey).agility.multModifier -= alm;
		gC(charKey).combatAffinities.pain.weakness += epd;
	}
	var cancelEffect = function(charKey) {
		gC(charKey).energy.tainted -= eec;
		gC(charKey).agility.sumModifier += als;
		gC(charKey).agility.multModifier += alm;
		gC(charKey).combatAffinities.pain.weakness -= epd;
	}
	var description = "This character has the mark of a scratch causing pain in their skin.\n"
					+ "Loss of agility, receives extra pain damage, energy becomes tainted.";
	var as = new alteredState("Scratched","Scra","scene",turns,provokeEffect,cancelEffect,description);
	as.type = "debuff";
	return as;
}

// Animal aspects

window.createAScatAspect = function(intensity) {
	// Increased agility, perception, control recovery
	var sgs = 4 + intensity * 0.4; // 4 ~ 8
	var sgm = 0.1 + intensity * 0.01; // 0.10 ~ 0.20
	var icr = 0.1 + intensity * 0.01; // 0.1 ~ 0.2
	var ipa = 3 + intensity * 0.7; // 3 ~ 10
	var turns = 5 + limitedRandomInt(2); // 5 ~ 7
	var provokeEffect = function(charKey) {
		gC(charKey).agility.sumModifier += sgs;
		gC(charKey).agility.multModifier += sgm;
		gC(charKey).perception.sumModifier += sgs;
		gC(charKey).perception.multModifier += sgm;
		gC(charKey).controlRecovery += icr;
		gC(charKey).combatAffinities.pounce.strength += ipa;
		gC(charKey).combatAffinities.pounce.resistance += ipa;
	}
	var cancelEffect = function(charKey) {
		gC(charKey).agility.sumModifier -= sgs;
		gC(charKey).agility.multModifier -= sgm;
		gC(charKey).perception.sumModifier -= sgs;
		gC(charKey).perception.multModifier -= sgm;
		gC(charKey).controlRecovery -= icr;
		gC(charKey).combatAffinities.pounce.strength -= ipa;
		gC(charKey).combatAffinities.pounce.resistance -= ipa;
	}
	var description = "This character is channeling a cat spirit, gaining physical capabilities.\n"
					+ "Increased agility, perception, control recovery and pounce affinity.";
	var as = new alteredState("Cat Aspect","CaAs","scene",turns,provokeEffect,cancelEffect,description);
	as.type = "buff";
	return as;
}

// Transformations

window.createASborrowedIdentity = function(intensity, target) {
	// Stats gain , borrowed images
	var sgs = 2 + intensity * 0.8; // 2 ~ 10
	var sgm = 0.05 + intensity * 0.010; // 0.05 ~ 0.15
	var turns = 4; // 4
	var provokeEffect = function(charKey) {
		gC(charKey).charisma.sumModifier += sgs;
		gC(charKey).charisma.multModifier += sgm;
		gC(charKey).originalPortrait = gC(charKey).fullPortrait;
		gC(charKey).originalAvatar = gC(charKey).avatar;
		gC(charKey).fullPortrait = gC(target).fullPortrait;
		gC(charKey).avatar = gC(target).avatar;
	}
	var cancelEffect = function(charKey) {
		gC(charKey).charisma.sumModifier -= sgs;
		gC(charKey).charisma.multModifier -= sgm;
		gC(charKey).fullPortrait = gC(charKey).originalPortrait;
		gC(charKey).avatar = gC(charKey).originalAvatar;
		gC(charKey).originalAvatar = null;
		gC(charKey).originalPortrait = null;
	}
	var description = "This character has stolen the identity of someone else.\n"
					+ "Increased charisma.";
	var as = new alteredState("Borrowed identity","BoId","scene",turns,provokeEffect,cancelEffect,description);
	as.type = "buff";
	return as;
}

window.createASconfusedIdentities = function(intensity) {
	// Stats loss
	var sls = 3 + intensity * 0.3; // 3 ~ 6
	var slm = 0.05 + intensity * 0.005; // 0.05 ~ 0.10
	var turns = 4; // 4
	var provokeEffect = function(charKey) {
		gC(charKey).perception.sumModifier -= sls;
		gC(charKey).perception.multModifier -= slm;
		gC(charKey).empathy.sumModifier -= sls;
		gC(charKey).empathy.multModifier -= slm;
		gC(charKey).charisma.sumModifier -= sls;
		gC(charKey).charisma.multModifier -= slm;
	}
	var cancelEffect = function(charKey) {
		gC(charKey).perception.sumModifier += sls;
		gC(charKey).perception.multModifier += slm;
		gC(charKey).empathy.sumModifier += sls;
		gC(charKey).empathy.multModifier += slm;
		gC(charKey).charisma.sumModifier += sls;
		gC(charKey).charisma.multModifier += slm;
	}
	var description = "This character has lost track of their enemies.\n"
					+ "Decreased perception, empathy, charisma.";
	var as = new alteredState("Confused identities","CoId","scene",turns,provokeEffect,cancelEffect,description);
	as.type = "debuff";
	return as;
}

// Slime

window.createASslimed = function(intensity) {
	// Stats loss, lead recovery rate
	var sls = 5 + intensity * 0.5; // 5 ~ 10
	var slm = 0.05 + intensity * 0.015; // 0.05 ~ 0.15
	//var lrl = 0.15 + intensity * 0.015; // 0.15 ~ 0.3
	var turns = 3.5 + intensity * 0.2 + (limitedRandomInt(100) / 100); // 5 ~ 7
	var provokeEffect = function(charKey) {
		gC(charKey).agility.sumModifier -= sls;
		gC(charKey).agility.multModifier -= slm;
		//gC(charKey).leadMultiplier -= lrl;
	}
	var cancelEffect = function(charKey) {
		gC(charKey).agility.sumModifier += sls;
		gC(charKey).agility.multModifier += slm;
		//gC(charKey).leadMultiplier += lrl;
	}
	var description = "This character has slime surrounding their body, limiting their mobility.\n"
					+ "Decreased agility.";
	var as = new alteredState("Slimed","Slmd","scene",turns,provokeEffect,cancelEffect,description);
	as.type = "debuff";
	return as;
}

// Spores

window.createASrelaxingScent = function(intensity) {
	// Stats loss
	var sls = 2 + intensity * 0.3; // 2 ~ 5
	var slm = 0.04 + intensity * 0.004; // 0.05 ~ 0.10
	var turns = 4 + limitedRandomInt(1); // 4 ~ 5
	if ( intensity > 5 ) { turns++; } // ~ - 6
	var provokeEffect = function(charKey) {
		gC(charKey).physique.sumModifier -= sls;
		gC(charKey).physique.multModifier -= slm;
		gC(charKey).agility.sumModifier -= sls;
		gC(charKey).agility.multModifier -= slm;
		gC(charKey).perception.sumModifier -= sls;
		gC(charKey).perception.multModifier -= slm;
		gC(charKey).will.sumModifier -= sls;
		gC(charKey).will.multModifier -= slm;
	}
	var cancelEffect = function(charKey) {
		gC(charKey).physique.sumModifier += sls;
		gC(charKey).physique.multModifier += slm;
		gC(charKey).agility.sumModifier += sls;
		gC(charKey).agility.multModifier += slm;
		gC(charKey).perception.sumModifier += sls;
		gC(charKey).perception.multModifier += slm;
		gC(charKey).will.sumModifier += sls;
		gC(charKey).will.multModifier += slm;
	}
	var description = "This character is feeling groggy.\n"
					+ "Decreased physique, agility, perception and will.";
	var as = new alteredState("Relaxing scent","RlSc","scene",turns,provokeEffect,cancelEffect,description);
	as.type = "debuff";
	return as;
}


