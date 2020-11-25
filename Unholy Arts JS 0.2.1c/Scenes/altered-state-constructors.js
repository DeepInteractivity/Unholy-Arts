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
	return as;
}

window.createAScoldGuts = function(intensity) {
	// Stats gain , increased lust resistance
	var sgs = 2 + intensity * 0.2; // 2 ~ 4
	var sgm = 0.06 + intensity * 0.006; // 0.06 ~ 0.12
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
	return as;
}







