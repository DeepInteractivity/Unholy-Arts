// Tips

window.getRandomTip = function(){
	var tip = randomFromList(setup.tipsList);
	return tip;
}
setup.tipsList = [
		// Misc
	("You aren't omniscient. NPCs will train, triumph and suffer heartache beyond your eyes, and you will not be told about it."),
	("Body paintings wear off faster in baths."),
	("Experience in painting, perception, agility and intelligence make body paintings stronger and more durable, in that order."),
	("Particularly strong body paintings last longer and apply stronger effects."),
		// Main loop mechanics
	("Assaulting a group smaller than your own will bring greater infamy."),
	("Infamy wears down faster the more infamy you have."),
	("Becoming excessively infamous will provoke the Passion Temple to punish you."),
	("Taking jobs that use your larger stats returns more money."),
	("Once it becomes available, the Stars Tower will give you hints to find missable opportunities."),
		// Relationships, conversations
	("Short-term relationships wear off after a few weeks, but some memory of them remains forever."),
	("Your mood influences your conversation options."),
	("Empathetic and charismatic characters get more conversation options to choose from."),
	("Characters with a strong desire to accept an offer will have to fight with their willpower to refuse."),
	("Characters grow drawn to love faster when they have intense, intimate encounters with those they like under egalitarian conditions."),
	("Characters grow drawn to pleasure faster when they have plenty of sexual partners at the same time."),
	("Not reaching orgasm might turn characters frigid. Having their orgasms ruined might have them crave for pleasure."),
		// AI
	("Characters reconsider who they want to befriend, woo and dominate at the start of each day."),
	("Having high infamy might turn kind characters against you."),
	("Having high merit might turn ambitious characters against you."),
	("Sexual tension may make some characters want to flirt with you. Others will try to dominate you."),
		// Scene mechanics
	("Some actions are only usable by certain races. You can't perform a double penetration if you can't transform your own body."),
		// Combat mechanics
	("Stat influences in action descriptions refer to proportions, not to sheer numbers.\nRead them to understand which stat you need to raise, not to calculate raw damage."),
	("Having low energy and willpower makes struggling more difficult. So does having bound arms and legs."),
			// Evasion
	("Pounce, weapon and social attacks are more likely to succeed or fail depending on the involved characters' related affinities."),
	("Contact attacks are usually hard to land, but succeed automatically if actor and target are sharing a position."),
	("Hit attacks are more likely to succeed when actor and target share a position."),
	("Projectile attacks are usually easy to land, but it becomes harder to aim when the target is inches away from you."),
		// Sex mechanics
	("Sustained, over-bearing pleasure might result in mind-blowing orgasms, which leave a stronger memory of the encounter."),
	("Trying to reach release when all your genitals are locked will ruin the orgasm, raising your submission."),
	("A core principle in combat is managing the flow of control."),
		// Stats, general
	("Luck influences most of what you do in combat, but only to a modest degree."),
	("Having more than 40 luck than your opponent isn't very useful."),
	("Resilience, will, perception and luck usually play a role in your defense."),
	("Abundance in charisma and empathy will help you manipulate others, but may not be too useful in combat. Perhaps you should make others fight your battles for you?"),
	("Focusing on fewer stats will make some actions stronger, but will make you less flexible.")
];
State.variables.tip = "";