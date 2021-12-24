////////// TEMPLE MAPS ////////// 

setup.mapTrainingGrounds = [];
setup.mapTrainingGrounds.westLibrary = new RoomInfo(
	"westLibrary", // Key
	"West Library", // Title
	"library-med.png", // Med Icon
	"library.png", // Icon
	"Shelves full of dramatic plays fill most sides of the room. There are also some chairs and tables reserved for studying.", // Description
	[ new RoomConnection('eastLibrary',2) ,
		  new RoomConnection('amphitheater',2) ,
		  new RoomConnection('dummies',2) ,
		  new RoomConnection('mainLibrary',2) ], // Connections
	function(characters) {
		var actions = [ createTrainingActionDramaReading() ];
		return actions;
	}, // getActions
	[31,128]
);

setup.mapTrainingGrounds.eastLibrary = new RoomInfo(
	"eastLibrary", // Key
	"East Library", // Title
	"library-med.png", // Med Icon
	"library.png", // Icon
	"Everywhere you look at, there are scrolls containing mystic wisdom collected through the ages. Their very presence taints the air.", // Description
	[ new RoomConnection('westLibrary',2) ,
	  new RoomConnection('dummies',2) ,
	  new RoomConnection('field',2) ,
	  new RoomConnection('mainLibrary',2) ], // Connections
	function(characters) {
		var actions = [ createTrainingActionEnergyReading() ];
		return actions;
	}, // getActions
	[73,128]
);
setup.mapTrainingGrounds.amphitheater = new RoomInfo(
	"amphitheater", // Key
	"Amphitheater", // Title
	"amphietheater-med.png", // Med Icon
	"amphietheater.png", // Icon
	"A grand, circular stone platform is surrounded by several stone benches. It reminds you of home.", // Description
	[ new RoomConnection('westBridge',2) ,
	  new RoomConnection('dummies',2) ,
	  new RoomConnection('westLibrary',2) ], // Connections
	function(characters) {
		var actions = [ createTrainingActionDramaActing() ];
		return actions;
	}, // getActions
	[9,89]
);
setup.mapTrainingGrounds.dummies = new RoomInfo(
	"dummies", // Key
	"Dummies", // Title
	"dummies-med.png", // Med Icon
	"dummies.png", // Icon
	"This place is filled with straw men, wrapped with strong leather but fluffy if you push them. They're perfect if you need to kick something.", // description
	[ new RoomConnection('eastBridge',2) ,
	  new RoomConnection('field',2) ,
	  new RoomConnection('eastLibrary',2) ,
	  new RoomConnection('westLibrary',2) ,
	  new RoomConnection('amphitheater',2) ,
	  new RoomConnection('westBridge',2) ], // Connections
	function(characters) {
		var actions = [ createTrainingActionAerobics() ,
						createTrainingActionSpellcasting() ];
		return actions;
	}, // getActions
	[52,89]
);
setup.mapTrainingGrounds.field = new RoomInfo(
	"field", // Key
	"Field", // Title
	"field-med.png", // Med Icon
	"field.png", // Icon
	"This is the clearest area in the training grounds. You're guaranteed to find a spot in which you can unleash hellflames without destroying anything.", // description
	[ new RoomConnection('lowerWaterfall',2) ,
	  new RoomConnection('southNaturalWall',2) ,
	  new RoomConnection('eastLibrary',2) ,
	  new RoomConnection('dummies',2) ,
	  new RoomConnection('eastBridge',2) ], // Connections
	function(characters) {
		var actions = [ createTrainingActionSpellcasting() ];
		return actions;
	}, // getActions
	[93,88]
);
setup.mapTrainingGrounds.westBridge = new RoomInfo(
	"westBridge", // Key
	"West Bridge", // Title
	"bridge-med.png", // Med Icon
	"bridge.png", // Icon
	"Looking downstream, you see the water leaving the training grounds, passing below the Temple's walls.", // description
	[ new RoomConnection('forest',2) ,
	  new RoomConnection('dummies',2) ,
	  new RoomConnection('amphitheater',2) ], // Connections
	function(characters) {
		var actions = [ createTrainingActionSwimming() ];
		return actions;
	}, // getActions
	[30,55]
);
setup.mapTrainingGrounds.eastBridge = new RoomInfo(
	"eastBridge", // Key
	"East Bridge", // Title
	"bridge-med.png", // Med Icon
	"bridge.png", // Icon
	"Looking upstream, you see a decently sized waterfall, and an even bigger one behind it.", // description
	[ new RoomConnection('lake',2) ,
	  new RoomConnection('lowerWaterfall',2) ,
	  new RoomConnection('field',2) ,
	  new RoomConnection('dummies',2) ], // Connections
	function(characters) {
		var actions = [ createTrainingActionSwimming() ];
		return actions;
	}, // getActions
	[74,54]
);
setup.mapTrainingGrounds.forest = new RoomInfo(
	"forest", // Key
	"Forest", // Title
	"forest-med.png", // Med Icon
	"forest.png", // Icon
	"The trees are shaken by the wind.", // description
	[ new RoomConnection('lake',2) ,
	  new RoomConnection('westBridge',2) ], // Connections
	function(characters) {
		var actions = [ createTrainingActionMeditation(),
						createRestingActionStandard() ];
		return actions;
	}, // getActions
	[31,18]
);
setup.mapTrainingGrounds.lake = new RoomInfo(
	"lake", // Key
	"Lake", // Title
	"lake-med.png", // Med Icon
	"lake.png", // Icon
	"It smells like wet grass.", // description
	[ new RoomConnection('northNaturalWall',2) ,
	  new RoomConnection('lowerWaterfall',2) ,
	  new RoomConnection('eastBridge',2) ,
	  new RoomConnection('forest',2) ], // Connections
	function(characters) {
		var actions = [ createTrainingActionAerobics() , 
						createTrainingActionMeditation() ];
		return actions;
	}, // getActions
	[74,18]
);
setup.mapTrainingGrounds.lowerWaterfall = new RoomInfo(
	"lowerWaterfall", // Key
	"Lower Waterfall", // Title
	"waterfall-med.png", // Med Icon
	"waterfall.png", // Icon
	"The falling water crashes violently against the river. Against this noise, you find peace.", // description
	[ new RoomConnection('field',2) ,
	  new RoomConnection('eastBridge',2) ,
	  new RoomConnection('lake',2) ], // Connections
	function(characters) {
		var actions = [ createTrainingActionWaterfallMeditation() ];
		return actions;
	}, // getActions
	[110,35]
);
setup.mapTrainingGrounds.southNaturalWall = new RoomInfo(
	"southNaturalWall", // Key
	"Natural Wall South", // Title
	"natural-wall-med.png", // Med Icon
	"natural-wall.png", // Icon
	"Rock walls at one side and cliffs at its opposite. Stairs carved in stone connect this place with the field.", // description
	[ new RoomConnection('northNaturalWall',2) ,
	  new RoomConnection('upperWaterfall',2) ,
	  new RoomConnection('field',2) ], // Connections
	function(characters) {
		var actions = [ createTrainingActionAnaerobics() ];
		return actions;
	}, // getActions
	[133,63]
);
setup.mapTrainingGrounds.northNaturalWall = new RoomInfo(
	"northNaturalWall", // Key
	"Natural Wall North", // Title
	"natural-wall-med.png", // Med Icon
	"natural-wall.png", // Icon
	"Rock walls at one side and cliffs at its opposite. Stairs carved in stone connect this place with the lake.", // description
	[ new RoomConnection('lake',2) ,
	  new RoomConnection('upperWaterfall',2) ,
	  new RoomConnection('southNaturalWall',2) ], // Connections
	function(characters) {
		var actions = [ createTrainingActionAnaerobics() ];
		return actions;
	}, // getActions
	[134,8]
);
setup.mapTrainingGrounds.upperWaterfall = new RoomInfo(
	"upperWaterfall", // Key
	"Upper Waterfall", // Title
	"waterfall-med.png", // Med Icon
	"waterfall.png", // Icon
	"This is the most secluded place of the training grounds. If you look up, you can contemplate the immense mountain that gives home to the Temple.", // description
	[ new RoomConnection('northNaturalWall',2) ,
	  new RoomConnection('southNaturalWall',2) ], // Connections
	function(characters) {
		var actions = [ createTrainingActionWaterfallMeditation() ,
						createTrainingActionEnergyReading() ];
		return actions;
	}, // getActions
	[158,35]
);
setup.mapTrainingGrounds.mainLibrary = new RoomInfo(
	"mainLibrary", // Key
	"Main Library", // Title
	"library-med.png", // Med Icon
	"library.png", // Icon
	"This great room is probably bigger than the West and East wings combined. The vast majority of the Confined Valley's history is here.", // description
	[ new RoomConnection('eastLibrary',2) ,
	  new RoomConnection('westLibrary',2) ,
	  new RoomConnection('grandHall',2) ], // Connections
	function(characters) {
		var actions = [];
		if ( getScrollsCharMayFind(characters[0]).length > 0 ) {
			actions.push(createSearchForScrollsAction());
		}
		actions.push(createRestingActionStandard());
		if ( ( characters[0] != "chPlayerCharacter" ) && ( gC(characters[0]).studiedScrollToday == false ) ) {
			actions.push(createStyduRandomScrollMapAction());
		}
		return actions;
	}, // getActions
	[52,159]
);
setup.mapTrainingGrounds.mainLibrary.getCustomActionsText = function(characters) {
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
setup.mapTrainingGrounds.mainLibrary.combatAllowed = false;

setup.mapTrainingGrounds.grandHall = new RoomInfo(
	"grandHall", // Key
	"Grand Hall", // Title
	"greathall-med.png", // Med Icon
	"greathall.png", // Icon
	"The Statue of the Goddess looks over its creation.", // description
	[ new RoomConnection('mainLibrary',2) ,
	  new RoomConnection('roomsOuterNorth',2) ,
	  new RoomConnection('roomsOuterSouth',2) ,
	  new RoomConnection('fulfillmentCorridor',2) ,
	  new RoomConnection('ambitionCorridor',2) ], // Connections
	null, // getActions
	[95,193]
);
setup.mapTrainingGrounds.roomsOuterNorth = new RoomInfo(
	"roomsOuterNorth", // Key
	"Rooms - Outer North Wing", // Title
	"corridor-left-med.png", // Med Icon
	"corridor-left.png", // Icon
	"This corridor is connected by stairs to the Grand Hall. You can find the rooms of the priestesses and other long-term residents here.", // description
	[ new RoomConnection('grandHall',2) ,
	  new RoomConnection('roomsInnerNorth',2) ], // Connections
	null, // getActions
	[41,221]
); 
setup.mapTrainingGrounds.roomsInnerNorth = new RoomInfo(
	"roomsInnerNorth", // Key
	"Rooms - Inner North Wing", // Title
	"corridor-left-med.png", // Med Icon
	"corridor-left.png", // Icon
	"The halls get darker as you advance.", // description
	[ new RoomConnection('roomsOuterNorth',2) ,
	  new RoomConnection('roomsInnerSouth',2) ], // Connections
	null, // getActions
	[15,249]
);
setup.mapTrainingGrounds.roomsInnerSouth = new RoomInfo(
	"roomsInnerSouth", // Key
	"Rooms - Inner South Wing", // Title
	"corridor-right-med.png", // Med Icon
	"corridor-right.png", // Icon
	"You can find your room here, as well as those of other Candidates.", // description
	[ new RoomConnection('roomsInnerNorth',2) ,
	  new RoomConnection('roomsOuterSouth',2) ,
	  new RoomConnection('playerRoom',1),
	  new RoomConnection('mirRoom',1),
	  new RoomConnection('ateRoom',1) ], // Connections
	null, // getActions
	[41,278]
);
setup.mapTrainingGrounds.roomsInnerSouth.getConnections = function(characters) {
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
setup.mapTrainingGrounds.roomsInnerSouth.displayConnections = function() {
	var string = getLinkToRoom(this.connections[0].loc,"Go to " + getCurrentMap().rooms[this.connections[0].loc].title,this.connections[0].distance)
			    + " (" + colorText(2,"khaki") + ") " + displayCharIconsInRoom(this.connections[0].loc) + "\n";
	string += getLinkToRoom(this.connections[1].loc,"Go to " + getCurrentMap().rooms[this.connections[1].loc].title,this.connections[1].distance)
			    + " (" + colorText(2,"khaki") + ") " + displayCharIconsInRoom(this.connections[1].loc) + "\n";
	string += getLinkToRoom(this.connections[2].loc,"Go to " + getCurrentMap().rooms[this.connections[2].loc].title,this.connections[2].distance)
			    + " (" + colorText(1,"khaki") + ") " + displayCharIconsInRoom(this.connections[2].loc) + "\n";
	if ( getPlayerCharsGroup().includes("chMir") ) {
		string += getLinkToRoom(this.connections[3].loc,"Go to " + getCurrentMap().rooms[this.connections[3].loc].title,this.connections[3].distance)
			    + " (" + colorText(1,"khaki") + ") " + displayCharIconsInRoom(this.connections[3].loc) + "\n";
	} else {
		string += colorText("You can't enter Padmiri's room without Padmiri.\n","red");
	}
	if ( getPlayerCharsGroup().includes("chAte") ) {
		string += getLinkToRoom(this.connections[4].loc,"Go to " + getCurrentMap().rooms[this.connections[4].loc].title,this.connections[4].distance)
			    + " (" + colorText(1,"khaki") + ") " + displayCharIconsInRoom(this.connections[4].loc) + "\n";
	} else {
		string += colorText("You can't enter Maaterasu's room without Maaterasu.\n","red");
	}
	return string;
}
setup.mapTrainingGrounds.roomsOuterSouth = new RoomInfo(
	"roomsOuterSouth", // Key
	"Rooms - Outer South Wing", // Title
	"corridor-right-med.png", // Med Icon
	"corridor-right.png", // Icon
	"This room is connected by stairs to the Grand Hall. You can find the rooms of other Candidates here.", // description
	[ new RoomConnection('roomsInnerSouth',2) ,
	  new RoomConnection('grandHall',2),
	  new RoomConnection('clawRoom',1),
	  new RoomConnection('nashRoom',1),
	  new RoomConnection('valRoom',1) ], // Connections
	null, // getActions
	[67,250]
);
setup.mapTrainingGrounds.roomsOuterSouth.getConnections = function(characters) {
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
setup.mapTrainingGrounds.roomsOuterSouth.displayConnections = function() {
	var string = getLinkToRoom(this.connections[0].loc,"Go to " + getCurrentMap().rooms[this.connections[0].loc].title,this.connections[0].distance)
			    + " (" + colorText(2,"khaki") + ") " + displayCharIconsInRoom(this.connections[0].loc) + "\n";
	string += getLinkToRoom(this.connections[1].loc,"Go to " + getCurrentMap().rooms[this.connections[1].loc].title,this.connections[1].distance)
			    + " (" + colorText(2,"khaki") + ") " + displayCharIconsInRoom(this.connections[1].loc) + "\n";
	if ( getPlayerCharsGroup().includes("chClaw") ) {
		string += getLinkToRoom(this.connections[2].loc,"Go to " + getCurrentMap().rooms[this.connections[2].loc].title,this.connections[2].distance)
			    + " (" + colorText(1,"khaki") + ") " + displayCharIconsInRoom(this.connections[2].loc) + "\n";
	} else {
		string += colorText("You can't enter Claw's room without Claw.\n","red");
	}
	if ( getPlayerCharsGroup().includes("chNash") ) {
		string += getLinkToRoom(this.connections[3].loc,"Go to " + getCurrentMap().rooms[this.connections[3].loc].title,this.connections[3].distance)
			    + " (" + colorText(1,"khaki") + ") " + displayCharIconsInRoom(this.connections[3].loc) + "\n";
	} else {
		string += colorText("You can't enter Nashillbyir's room without Nashillbyir.\n","red");
	}
	if ( getPlayerCharsGroup().includes("chVal") ) {
		string += getLinkToRoom(this.connections[4].loc,"Go to " + getCurrentMap().rooms[this.connections[4].loc].title,this.connections[4].distance)
			    + " (" + colorText(1,"khaki") + ") " + displayCharIconsInRoom(this.connections[4].loc) + "\n";
	} else {
		string += colorText("You can't enter Valtan's room without Valtan.\n","red");
	}
	return string;
}
setup.mapTrainingGrounds.grandHall.combatAllowed = false;
setup.mapTrainingGrounds.roomsOuterNorth.combatAllowed = false;
setup.mapTrainingGrounds.roomsInnerNorth.combatAllowed = false;
setup.mapTrainingGrounds.roomsOuterSouth.combatAllowed = false;
setup.mapTrainingGrounds.roomsInnerSouth.combatAllowed = false;

setup.mapTrainingGrounds.playerRoom = new RoomInfo(
	"playerRoom", // Key
	"Player Room", // Title
	"candidates-room-med.png", // Med Icon
	"candidates-room.png", // Icon
	"It's too early to go to sleep. Go get busy.", // description
	[ new RoomConnection('roomsInnerSouth',1) ], // Connections
	function(characters) {
		var actions = [ createRestingActionStandard() ];
		return actions;
	}, // getActions
	[9,316]
);
setup.mapTrainingGrounds.mirRoom = new RoomInfo(
	"mirRoom", // Key
	"Padmiri's Room", // Title
	"candidates-room-med.png", // Med Icon
	"candidates-room.png", // Icon
	"A bed made of giant leaves sits at the center of the room. Vines, mushrooms, roots and many other plants grow around the walls.", // description
	[ new RoomConnection('roomsInnerSouth',1) ], // Connections
	function(characters) {
		var actions = [ createRestingActionStandard() ];
		return actions;
	}, // getActions
	[34,320]
);
setup.mapTrainingGrounds.ateRoom = new RoomInfo(
	"ateRoom", // Key
	"Maaterasu's Room", // Title
	"candidates-room-med.png", // Med Icon
	"candidates-room.png", // Icon
	"A strange purple orb at the top of a gray pillar watches your every move.", // description
	[ new RoomConnection('roomsInnerSouth',1) ], // Connections
	function(characters) {
		var actions = [ createRestingActionStandard() ];
		return actions;
	}, // getActions
	[59,316]
);
setup.mapTrainingGrounds.clawRoom = new RoomInfo(
	"clawRoom", // Key
	"Fiercest Claw's Room", // Title
	"candidates-room-med.png", // Med Icon
	"candidates-room.png", // Icon
	"A lone dummy stands at the center of the room, severely injured. Someone's been scratching it.", // description
	[ new RoomConnection('roomsOuterSouth',1) ], // Connections
	function(characters) {
		var actions = [ createRestingActionStandard() ];
		return actions;
	}, // getActions
	[105,287]
);
setup.mapTrainingGrounds.nashRoom = new RoomInfo(
	"nashRoom", // Key
	"Nashillbyir's Room", // Title
	"candidates-room-med.png", // Med Icon
	"candidates-room.png", // Icon
	"Weapon frames decorate the walls, featuring a staff, a pike and a bow.", // description
	[ new RoomConnection('roomsOuterSouth',1) ], // Connections
	function(characters) {
		var actions = [ createRestingActionStandard() ];
		return actions;
	}, // getActions
	[115,263]
);
setup.mapTrainingGrounds.valRoom = new RoomInfo(
	"valRoom", // Key
	"Valtan's Room", // Title
	"candidates-room-med.png", // Med Icon
	"candidates-room.png", // Icon
	"A large pond covers most of the room.", // description
	[ new RoomConnection('roomsOuterSouth',1) ], // Connections
	function(characters) {
		var actions = [ createRestingActionStandard() ];
		return actions;
	}, // getActions
	[106,238]
);
setup.mapTrainingGrounds.playerRoom.combatAllowed = false;
setup.mapTrainingGrounds.mirRoom.combatAllowed = false;
setup.mapTrainingGrounds.ateRoom.combatAllowed = false;
setup.mapTrainingGrounds.clawRoom.combatAllowed = false;
setup.mapTrainingGrounds.nashRoom.combatAllowed = false;
setup.mapTrainingGrounds.valRoom.combatAllowed = false;

setup.mapTrainingGrounds.fulfillmentCorridor = new RoomInfo(
	"fulfillmentCorridor", // Key
	"Fulfillment Corridor", // Title
	"fulfillment-corridor-med.png", // Med Icon
	"fulfillment-corridor.png", // Icon
	"Lavish chandeliers and some inner windows create a calid illumination.", // description
	[ new RoomConnection('grandHall',2) ,
	  new RoomConnection('diningHall',2) ,
	  new RoomConnection('publicBaths',2) ], // Connections
	null, // getActions
	[151,166]
);
setup.mapTrainingGrounds.diningHall = new RoomInfo(
	"diningHall", // Key
	"Dining Hall", // Title
	"dininghall-med.png", // Med Icon
	"dininghall.png", // Icon
	"A long table stands along the room. Half a hundred people would be able to eat here.", // description
	[ new RoomConnection('fulfillmentCorridor',2) ], // Connections
	function(characters) {
		var actions = [ createRestingActionStandard() ];
		return actions;
	}, // getActions
	[137,131]
);
setup.mapTrainingGrounds.publicBaths = new RoomInfo(
	"publicBaths", // Key
	"Public Baths", // Title
	"public-bath-med.png", // Med Icon
	"public-bath.png", // Icon
	"Termal waters similar to those you found at your room. There is, however, a chill in the air.", // description
	[ new RoomConnection('fulfillmentCorridor',2) ], // Connections
	function(characters) {
		var actions = [ createRestingActionStandard() ];
		return actions;
	}, // getActions
	[166,131]
);
setup.mapTrainingGrounds.ambitionCorridor = new RoomInfo(
	"ambitionCorridor", // Key
	"Ambition Corridor", // Title
	"ambition-corridor-med.png", // Med Icon
	"ambition-corridor.png", // Icon
	"Austere lighting, stern decorations.", // description
	[ new RoomConnection('grandHall',2) ,
	  new RoomConnection('storage',2) ,
	  new RoomConnection('starsTower',2) ], // Connections
	null, // getActions
	[156,219]
);
setup.mapTrainingGrounds.storage = new RoomInfo(
	"storage", // Key
	"Storage", // Title
	"storage-med.png", // Med Icon
	"storage.png", // Icon
	"All kinds of tools and materials are saved here. You aren't allowed to take any.", // description
	[ new RoomConnection('ambitionCorridor',2) ], // Connections
	null, // getActions
	[191,205]
);
setup.mapTrainingGrounds.starsTower = new RoomInfo(
	"starsTower", // Key
	"Stars Tower", // Title
	"startower-med.png", // Med Icon
	"startower.png", // Icon
	"Blue crystals surround the room's candles, printing their color into everything. You can find a telescope and several tools of geometric calculation.", // description
	[ new RoomConnection('ambitionCorridor',2) ], // Connections
	null, // getActions
	[191,234]
);
setup.mapTrainingGrounds.starsTower.getCustomActionsText = function(characters) {
	var cText = "";
	if ( State.variables.StVarsList.includes("go0") && quantifyCharacterVacuumStrength("chPlayerCharacter") < (18*9) ) {
		cText = getButtonMapMenuRespec() + "<sup><span title='You will have a one-time opportunity to switch the values of three pairs of stats.'>(?)</span></sup> " + "\n";
	}
	return cText;
}
setup.mapTrainingGrounds.fulfillmentCorridor.combatAllowed = false;
setup.mapTrainingGrounds.diningHall.combatAllowed = false;
setup.mapTrainingGrounds.publicBaths.combatAllowed = false;
setup.mapTrainingGrounds.ambitionCorridor.combatAllowed = false;
setup.mapTrainingGrounds.storage.combatAllowed = false;
setup.mapTrainingGrounds.starsTower.combatAllowed = false;

////////////////////////////////////////////

//State.variables.mapTrainingGrounds = new Chart("mapTrainingGrounds","Passion Temple");
//State.variables.mapTrainingGrounds.icon = "temple-map.png";

//State.variables.mapTrainingGrounds.autogenerateRooms("mapTrainingGrounds");

window.initMapTrainingGrounds = function() {
	State.variables.mapTrainingGrounds = new Chart("mapTrainingGrounds","Passion Temple");
	State.variables.mapTrainingGrounds.diagramDimensions = [217,346];
	State.variables.mapTrainingGrounds.icon = "temple-map.png";

	State.variables.mapTrainingGrounds.autogenerateRooms("mapTrainingGrounds");
}
initMapTrainingGrounds();
window.deinitMapTrainingGrounds = function() {
	delete State.variables.mapTrainingGrounds;
}

