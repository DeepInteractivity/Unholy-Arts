////////// TEMPLE MAPS ////////// 

State.variables.mapTrainingGrounds = new Chart("mapTrainingGrounds","Passion Temple");

State.variables.mapTrainingGrounds.rooms.westLibrary = new Room("westLibrary","West Library");
State.variables.mapTrainingGrounds.rooms.westLibrary.connections =
	[ new RoomConnection('eastLibrary',2) ,
	  new RoomConnection('amphitheater',2) ,
	  new RoomConnection('dummies',2) ,
	  new RoomConnection('mainLibrary',2) ];
State.variables.mapTrainingGrounds.rooms.westLibrary.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.westLibrary.getActions = function(characters) {
	var actions = [ createTrainingActionDramaReading() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.westLibrary.description = "Shelves full of dramatic plays fill most sides of the room. "
																 + "There are also some chairs and tables reserved for studying.";

State.variables.mapTrainingGrounds.rooms.eastLibrary = new Room("eastLibrary","East Library");
State.variables.mapTrainingGrounds.rooms.eastLibrary.connections =
	[ new RoomConnection('westLibrary',2) ,
	  new RoomConnection('dummies',2) ,
	  new RoomConnection('field',2) ,
	  new RoomConnection('mainLibrary',2) ];
State.variables.mapTrainingGrounds.rooms.eastLibrary.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.eastLibrary.getActions = function(characters) {
	var actions = [ createTrainingActionEnergyReading() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.eastLibrary.description = "Everywhere you look at, there are scrolls containing mystic wisdom "
																 + "collected through the ages. Their very presence taints the air.";

State.variables.mapTrainingGrounds.rooms.amphitheater = new Room("amphitheater","Amphitheater");
State.variables.mapTrainingGrounds.rooms.amphitheater.connections =
	[ new RoomConnection('westBridge',2) ,
	  new RoomConnection('dummies',2) ,
	  new RoomConnection('westLibrary',2) ];
State.variables.mapTrainingGrounds.rooms.amphitheater.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.amphitheater.getActions = function(characters) {
	var actions = [ createTrainingActionDramaActing() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.amphitheater.description = "A grand, circular stone platform is surrounded by several stone benches. "
																 + "It reminds you of home.";

State.variables.mapTrainingGrounds.rooms.dummies = new Room("dummies","Dummies");
State.variables.mapTrainingGrounds.rooms.dummies.connections =
	[ new RoomConnection('eastBridge',2) ,
	  new RoomConnection('field',2) ,
	  new RoomConnection('eastLibrary',2) ,
	  new RoomConnection('westLibrary',2) ,
	  new RoomConnection('amphitheater',2) ,
	  new RoomConnection('westBridge',2) ];
State.variables.mapTrainingGrounds.rooms.dummies.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.dummies.getActions = function(characters) {
	var actions = [ createTrainingActionAerobics() ,
					createTrainingActionSpellcasting() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.dummies.description = "This place is filled with straw men, wrapped with strong leather but fluffy if you "
															 + "push them. They're perfect if you need to kick something.";

State.variables.mapTrainingGrounds.rooms.field = new Room("field","Field");
State.variables.mapTrainingGrounds.rooms.field.connections =
	[ new RoomConnection('lowerWaterfall',2) ,
	  new RoomConnection('southNaturalWall',2) ,
	  new RoomConnection('eastLibrary',2) ,
	  new RoomConnection('dummies',2) ,
	  new RoomConnection('eastBridge',2) ];
State.variables.mapTrainingGrounds.rooms.field.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.field.getActions = function(characters) {
	var actions = [ createTrainingActionSpellcasting() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.field.description = "This is the clearest area in the training grounds. You're guaranteed to find a spot "
														   + "in which you can unleash hellflames without destroying anything.";

State.variables.mapTrainingGrounds.rooms.westBridge = new Room("westBridge","West Bridge");
State.variables.mapTrainingGrounds.rooms.westBridge.connections =
	[ new RoomConnection('forest',2) ,
	  new RoomConnection('dummies',2) ,
	  new RoomConnection('amphitheater',2) ];
State.variables.mapTrainingGrounds.rooms.westBridge.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.westBridge.getActions = function(characters) {
	var actions = [ createTrainingActionSwimming() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.westBridge.description = "Looking downstream, you see the water leaving the training grounds, passing below "
																+ "the Temple's walls.";

State.variables.mapTrainingGrounds.rooms.eastBridge = new Room("eastBridge","East Bridge");
State.variables.mapTrainingGrounds.rooms.eastBridge.connections =
	[ new RoomConnection('lake',2) ,
	  new RoomConnection('lowerWaterfall',2) ,
	  new RoomConnection('field',2) ,
	  new RoomConnection('dummies',2) ];
State.variables.mapTrainingGrounds.rooms.eastBridge.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.eastBridge.getActions = function(characters) {
	var actions = [ createTrainingActionSwimming() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.eastBridge.description = "Looking upstream, you see a decently sized waterfall, and an even bigger one "
																+ "behind it.";
																
State.variables.mapTrainingGrounds.rooms.forest = new Room("forest","Forest");
State.variables.mapTrainingGrounds.rooms.forest.connections =
	[ new RoomConnection('lake',2) ,
	  new RoomConnection('westBridge',2) ];
State.variables.mapTrainingGrounds.rooms.forest.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.forest.getActions = function(characters) {
	var actions = [ createTrainingActionMeditation(),
					createRestingActionStandard() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.forest.description = "The trees are shaken by the wind.";

State.variables.mapTrainingGrounds.rooms.lake = new Room("lake","Lake");
State.variables.mapTrainingGrounds.rooms.lake.connections =
	[ new RoomConnection('northNaturalWall',2) ,
	  new RoomConnection('lowerWaterfall',2) ,
	  new RoomConnection('eastBridge',2) ,
	  new RoomConnection('forest',2) ];
State.variables.mapTrainingGrounds.rooms.lake.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.lake.getActions = function(characters) {
	var actions = [ createTrainingActionAerobics() , 
					createTrainingActionMeditation() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.lake.description = "It smells like wet grass.";

State.variables.mapTrainingGrounds.rooms.lowerWaterfall = new Room("lowerWaterfall","Lower Waterfall");
State.variables.mapTrainingGrounds.rooms.lowerWaterfall.connections =
	[ new RoomConnection('field',2) ,
	  new RoomConnection('eastBridge',2) ,
	  new RoomConnection('lake',2) ];
State.variables.mapTrainingGrounds.rooms.lowerWaterfall.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.lowerWaterfall.getActions = function(characters) {
	var actions = [ createTrainingActionWaterfallMeditation() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.lowerWaterfall.description = "The falling water crashes violently against the river. Against this noise, "
																	+ "you find peace.";

State.variables.mapTrainingGrounds.rooms.southNaturalWall = new Room("southNaturalWall","Natural Wall South");
State.variables.mapTrainingGrounds.rooms.southNaturalWall.connections =
	[ new RoomConnection('northNaturalWall',2) ,
	  new RoomConnection('upperWaterfall',2) ,
	  new RoomConnection('field',2) ];
State.variables.mapTrainingGrounds.rooms.southNaturalWall.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.southNaturalWall.getActions = function(characters) {
	var actions = [ createTrainingActionAnaerobics() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.southNaturalWall.description = "Rock walls at one side and cliffs at its opposite. Stairs carved in stone connect "
																	  + "this place with the field.";

State.variables.mapTrainingGrounds.rooms.northNaturalWall = new Room("northNaturalWall","Natural Wall North");
State.variables.mapTrainingGrounds.rooms.northNaturalWall.connections =
	[ new RoomConnection('lake',2) ,
	  new RoomConnection('upperWaterfall',2) ,
	  new RoomConnection('southNaturalWall',2) ];
State.variables.mapTrainingGrounds.rooms.northNaturalWall.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.northNaturalWall.getActions = function(characters) {
	var actions = [ createTrainingActionAnaerobics() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.northNaturalWall.description = "Rock walls at one side and cliffs at its opposite. Stairs carved in stone connect "
																	  + "this place with the lake.";
																	  
State.variables.mapTrainingGrounds.rooms.upperWaterfall = new Room("upperWaterfall","Upper Waterfall");
State.variables.mapTrainingGrounds.rooms.upperWaterfall.connections =
	[ new RoomConnection('northNaturalWall',2) ,
	  new RoomConnection('southNaturalWall',2) ];
State.variables.mapTrainingGrounds.rooms.upperWaterfall.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.upperWaterfall.getActions = function(characters) {
	var actions = [ createTrainingActionWaterfallMeditation() ,
					createTrainingActionEnergyReading() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.upperWaterfall.description = "This is the most secluded place of the training grounds. If you look up, you can "
																	+ "contemplate the immense mountain that gives home to the Temple.";

State.variables.mapTrainingGrounds.rooms.mainLibrary = new Room("mainLibrary","Main Library");
State.variables.mapTrainingGrounds.rooms.mainLibrary.connections =
	[ new RoomConnection('eastLibrary',2) ,
	  new RoomConnection('westLibrary',2) ,
	  new RoomConnection('grandHall',2) ];
State.variables.mapTrainingGrounds.rooms.mainLibrary.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.mainLibrary.getActions = function(characters) {
	var actions = [];
	if ( getScrollsCharMayFind(characters[0]).length > 0 ) {
		actions.push(createSearchForScrollsAction());
	}
	actions.push(createRestingActionStandard());
	if ( ( characters[0] != "chPlayerCharacter" ) && ( gC(characters[0]).studiedScrollToday == false ) ) {
		actions.push(createStyduRandomScrollMapAction());
	}
	return actions;
}
State.variables.mapTrainingGrounds.rooms.mainLibrary.getCustomActionsText = function(characters) {
	var cText = "";
	if ( ( gC(characters[0]).foundScrolls.length > gC(characters[0]).studiedScrolls.length ) && ( gC(characters[0]).studiedScrollToday == false ) ) {
		cText = "Study a scroll<sup><span title='Pick a specific scroll and the characters will study its contents.'>(?)</span></sup> "
			  + getButtonMapMenuSelectScroll() + "\n";
	}
	if ( getScrollsCharMayFind(characters[0]).length < 1 ) {
		cText += colorText("Locked:","firebrick") + " There aren't any new scrolls for the characters.\n";
	}
	if ( gC(characters[0]).foundScrolls.length == gC(characters[0]).studiedScrolls.length ) {
		cText += colorText("Locked:","firebrick") + " The characters haven't found any new scrolls to study.\n";
	} else if ( gC(characters[0]).studiedScrollToday ) {
		cText += colorText("Locked:","firebrick") + " The leading character has already studied a scroll today.\n";
	}
	return cText;
}
State.variables.mapTrainingGrounds.rooms.mainLibrary.description = "This great room is probably bigger than the West and East wings combined. "
																 + "The vast majority of the Confined Valley's history is here.";

// Grand Hall
State.variables.mapTrainingGrounds.rooms.grandHall = new Room("grandHall","Grand Hall");
State.variables.mapTrainingGrounds.rooms.grandHall.connections =
	[ new RoomConnection('mainLibrary',2) ,
	  new RoomConnection('roomsOuterNorth',2) ,
	  new RoomConnection('roomsOuterSouth',2) ,
	  new RoomConnection('fulfillmentCorridor',2) ,
	  new RoomConnection('ambitionCorridor',2) ];
State.variables.mapTrainingGrounds.rooms.grandHall.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.grandHall.description = "The Statue of the Goddess looks over its creation.";

// Room Wings
State.variables.mapTrainingGrounds.rooms.roomsOuterNorth = new Room("roomsOuterNorth","Rooms - Outer North Wing");
State.variables.mapTrainingGrounds.rooms.roomsOuterNorth.connections =
	[ new RoomConnection('grandHall',2) ,
	  new RoomConnection('roomsInnerNorth',2) ];
State.variables.mapTrainingGrounds.rooms.roomsOuterNorth.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.roomsOuterNorth.description = "This corridor is connected by stairs to the Grand Hall. You can find "
																	 + "the rooms of the priestesses and other long-term residents here.";

State.variables.mapTrainingGrounds.rooms.roomsInnerNorth = new Room("roomsInnerNorth","Rooms - Inner North Wing");
State.variables.mapTrainingGrounds.rooms.roomsInnerNorth.connections =
	[ new RoomConnection('roomsOuterNorth',2) ,
	  new RoomConnection('roomsInnerSouth',2) ];
State.variables.mapTrainingGrounds.rooms.roomsInnerNorth.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.roomsInnerNorth.description = "The halls get darker as you advance.";
																	 
State.variables.mapTrainingGrounds.rooms.roomsInnerSouth = new Room("roomsInnerSouth","Rooms - Inner South Wing");
State.variables.mapTrainingGrounds.rooms.roomsInnerSouth.connections =
	[ new RoomConnection('roomsInnerNorth',2) ,
	  new RoomConnection('roomsOuterSouth',2) ,
	  new RoomConnection('playerRoom',1),
	  new RoomConnection('mirRoom',1),
	  new RoomConnection('ateRoom',1) ];
State.variables.mapTrainingGrounds.rooms.roomsInnerSouth.getConnections = function(characters) {
	var rooms = [this.connections[0],this.connections[1]];
	if ( characters.includes("chPlayerCharacter") ) {
		rooms.push(this.connections[2]);
	}
	if ( characters.includes("chMir") ) {
		rooms.push(this.connections[3]);
	}
	if ( characters.includes("chAte") ) {
		rooms.push(this.connections[4]);
	}
	return rooms;
}
State.variables.mapTrainingGrounds.rooms.roomsInnerSouth.displayConnections = function() {
	var string = getLinkToRoom(this.connections[0].loc,"Go to " + getCurrentMap().rooms[this.connections[0].loc].title,this.connections[0].distance)
			    + " " + displayCharIconsInRoom(this.connections[0].loc) + "\n";
	string += getLinkToRoom(this.connections[1].loc,"Go to " + getCurrentMap().rooms[this.connections[1].loc].title,this.connections[1].distance)
			    + " " + displayCharIconsInRoom(this.connections[1].loc) + "\n";
	string += getLinkToRoom(this.connections[2].loc,"Go to " + getCurrentMap().rooms[this.connections[2].loc].title,this.connections[2].distance)
			    + " " + displayCharIconsInRoom(this.connections[2].loc) + "\n";
	if ( getPlayerCharsGroup().includes("chMir") ) {
		string += getLinkToRoom(this.connections[3].loc,"Go to " + getCurrentMap().rooms[this.connections[3].loc].title,this.connections[3].distance)
			    + " " + displayCharIconsInRoom(this.connections[3].loc) + "\n";
	} else {
		string += colorText("You can't enter Padmiri's room without Padmiri.\n","red");
	}
	if ( getPlayerCharsGroup().includes("chAte") ) {
		string += getLinkToRoom(this.connections[4].loc,"Go to " + getCurrentMap().rooms[this.connections[4].loc].title,this.connections[4].distance)
			    + " " + displayCharIconsInRoom(this.connections[4].loc) + "\n";
	} else {
		string += colorText("You can't enter Maaterasu's room without Maaterasu.\n","red");
	}
	return string;
}
State.variables.mapTrainingGrounds.rooms.roomsInnerSouth.description = "You can find your room here, as well as those of other Candidates.";

State.variables.mapTrainingGrounds.rooms.roomsOuterSouth = new Room("roomsOuterSouth","Rooms - Outer South Wing");
State.variables.mapTrainingGrounds.rooms.roomsOuterSouth.connections =
	[ new RoomConnection('roomsInnerSouth',2) ,
	  new RoomConnection('grandHall',2),
	  new RoomConnection('clawRoom',1),
	  new RoomConnection('nashRoom',1),
	  new RoomConnection('valRoom',1) ];
State.variables.mapTrainingGrounds.rooms.roomsOuterSouth.getConnections = function(characters) {
	var rooms = [this.connections[0],this.connections[1]];
	if ( characters.includes("chClaw") ) {
		rooms.push(this.connections[2]);
	}
	if ( characters.includes("chNash") ) {
		rooms.push(this.connections[3]);
	}
	if ( characters.includes("chVal") ) {
		rooms.push(this.connections[4]);
	}
	return rooms;
}
State.variables.mapTrainingGrounds.rooms.roomsOuterSouth.displayConnections = function() {
	var string = getLinkToRoom(this.connections[0].loc,"Go to " + getCurrentMap().rooms[this.connections[0].loc].title,this.connections[0].distance)
			    + " " + displayCharIconsInRoom(this.connections[0].loc) + "\n";
	string += getLinkToRoom(this.connections[1].loc,"Go to " + getCurrentMap().rooms[this.connections[1].loc].title,this.connections[2].distance)
			    + " " + displayCharIconsInRoom(this.connections[1].loc) + "\n";
	if ( getPlayerCharsGroup().includes("chClaw") ) {
		string += getLinkToRoom(this.connections[2].loc,"Go to " + getCurrentMap().rooms[this.connections[2].loc].title,this.connections[2].distance)
			    + " " + displayCharIconsInRoom(this.connections[2].loc) + "\n";
	} else {
		string += colorText("You can't enter Claw's room without Claw.\n","red");
	}
	if ( getPlayerCharsGroup().includes("chNash") ) {
		string += getLinkToRoom(this.connections[3].loc,"Go to " + getCurrentMap().rooms[this.connections[3].loc].title,this.connections[3].distance)
			    + " " + displayCharIconsInRoom(this.connections[3].loc) + "\n";
	} else {
		string += colorText("You can't enter Nashillbyir's room without Nashillbyir.\n","red");
	}
	if ( getPlayerCharsGroup().includes("chVal") ) {
		string += getLinkToRoom(this.connections[4].loc,"Go to " + getCurrentMap().rooms[this.connections[4].loc].title,this.connections[4].distance)
			    + " " + displayCharIconsInRoom(this.connections[4].loc) + "\n";
	} else {
		string += colorText("You can't enter Valtan's room without Valtan.\n","red");
	}
	return string;
}
State.variables.mapTrainingGrounds.rooms.roomsOuterSouth.description = "This room is connected by stairs to the Grand Hall. You can find "
																	 + "the rooms of other Candidates here.";
// Rooms
State.variables.mapTrainingGrounds.rooms.playerRoom = new Room("playerRoom","Player Room");
State.variables.mapTrainingGrounds.rooms.playerRoom.connections =
	[ new RoomConnection('roomsInnerSouth',1) ];
State.variables.mapTrainingGrounds.rooms.playerRoom.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.playerRoom.getActions = function(characters) {
	var actions = [ createRestingActionStandard() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.playerRoom.description = "It's too early to go to sleep. Go get busy.";

State.variables.mapTrainingGrounds.rooms.mirRoom = new Room("mirRoom","Mir's Room");
State.variables.mapTrainingGrounds.rooms.mirRoom.connections =
	[ new RoomConnection('roomsInnerSouth',1) ];
State.variables.mapTrainingGrounds.rooms.mirRoom.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.mirRoom.getActions = function(characters) {
	var actions = [ createRestingActionStandard() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.mirRoom.description = "A bed made of giant leaves sits at the center of the room. "
		+ "Vines, mushrooms, roots and many other plants grow around the walls.";

State.variables.mapTrainingGrounds.rooms.ateRoom = new Room("ateRoom","Ate's Room");
State.variables.mapTrainingGrounds.rooms.ateRoom.connections =
	[ new RoomConnection('roomsInnerSouth',1) ];
State.variables.mapTrainingGrounds.rooms.ateRoom.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.ateRoom.getActions = function(characters) {
	var actions = [ createRestingActionStandard() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.ateRoom.description = "A strange purple orb at the top of a gray pillar watches "
		+ "your every move.";
		
State.variables.mapTrainingGrounds.rooms.clawRoom = new Room("clawRoom","Claw's Room");
State.variables.mapTrainingGrounds.rooms.clawRoom.connections =
	[ new RoomConnection('roomsOuterSouth',1) ];
State.variables.mapTrainingGrounds.rooms.clawRoom.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.clawRoom.getActions = function(characters) {
	var actions = [ createRestingActionStandard() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.clawRoom.description = "A lone dummy stands at the center of the room, "
		+ "severely injured. Someone's been scratching it.";
		
State.variables.mapTrainingGrounds.rooms.nashRoom = new Room("nashRoom","Nash's Room");
State.variables.mapTrainingGrounds.rooms.nashRoom.connections =
	[ new RoomConnection('roomsOuterSouth',1) ];
State.variables.mapTrainingGrounds.rooms.nashRoom.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.nashRoom.getActions = function(characters) {
	var actions = [ createRestingActionStandard() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.nashRoom.description = "Weapon frames decorate the walls, featuring a "
		+ "staff, a pike and a bow.";
		
State.variables.mapTrainingGrounds.rooms.valRoom = new Room("valRoom","Val's Room");
State.variables.mapTrainingGrounds.rooms.valRoom.connections =
	[ new RoomConnection('roomsOuterSouth',1) ];
State.variables.mapTrainingGrounds.rooms.valRoom.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.valRoom.getActions = function(characters) {
	var actions = [ createRestingActionStandard() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.valRoom.description = "A large pond covers most of the room."

// Fulfillment Corridor

State.variables.mapTrainingGrounds.rooms.fulfillmentCorridor = new Room("fulfillmentCorridor","Fulfillment Corridor");
State.variables.mapTrainingGrounds.rooms.fulfillmentCorridor.connections =
	[ new RoomConnection('grandHall',2) ,
	  new RoomConnection('diningHall',2) ,
	  new RoomConnection('publicBaths',2) ];
State.variables.mapTrainingGrounds.rooms.fulfillmentCorridor.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.fulfillmentCorridor.description = "Lavish chandeliers and some inner windows create a calid illumination.";

State.variables.mapTrainingGrounds.rooms.diningHall = new Room("diningHall","Dining Hall");
State.variables.mapTrainingGrounds.rooms.diningHall.connections =
	[ new RoomConnection('fulfillmentCorridor',2) ];
State.variables.mapTrainingGrounds.rooms.diningHall.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.diningHall.getActions = function(characters) {
	var actions = [ createRestingActionStandard() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.diningHall.description = "A long table stands along the room. Half a hundred people would be able to eat here.";

State.variables.mapTrainingGrounds.rooms.publicBaths = new Room("publicBaths","Public Baths");
State.variables.mapTrainingGrounds.rooms.publicBaths.connections =
	[ new RoomConnection('fulfillmentCorridor',2) ];
State.variables.mapTrainingGrounds.rooms.publicBaths.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.publicBaths.getActions = function(characters) {
	var actions = [ createRestingActionStandard() ];
	return actions;
}
State.variables.mapTrainingGrounds.rooms.publicBaths.description = "Termal waters similar to those you found at your room. There is, however, a chill "
																 + "in the air.";

// Ambition Corridor

State.variables.mapTrainingGrounds.rooms.ambitionCorridor = new Room("ambitionCorridor","Ambition Corridor");
State.variables.mapTrainingGrounds.rooms.ambitionCorridor.connections =
	[ new RoomConnection('grandHall',2) ,
	  new RoomConnection('storage',2) ,
	  new RoomConnection('starsTower',2) ];
State.variables.mapTrainingGrounds.rooms.ambitionCorridor.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.ambitionCorridor.description = "Austere lighting, stern decorations.";

State.variables.mapTrainingGrounds.rooms.storage = new Room("storage","Storage");
State.variables.mapTrainingGrounds.rooms.storage.connections =
	[ new RoomConnection('ambitionCorridor',2) ];
State.variables.mapTrainingGrounds.rooms.storage.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.storage.description = "All kinds of tools and materials are saved here. You aren't allowed to take any.";

State.variables.mapTrainingGrounds.rooms.starsTower = new Room("starsTower","Stars Tower");
State.variables.mapTrainingGrounds.rooms.starsTower.connections =
	[ new RoomConnection('ambitionCorridor',2) ];
State.variables.mapTrainingGrounds.rooms.starsTower.displayConnections = function() {
	return createStandardDisplayConnections(this.connections);
}
State.variables.mapTrainingGrounds.rooms.starsTower.description = "Blue crystals surround the room's candles, printing their color into everything. "
																+ "You can find a telescope and several tools of geometric calculation.";

