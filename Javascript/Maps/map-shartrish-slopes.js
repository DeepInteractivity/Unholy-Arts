////////// SHARTRISH SLOPES MAPS ////////// 

setup.mapShartrishSlopes = [];

// Nature

setup.mapShartrishSlopes.borderHills = new RoomInfo(
	"borderHills", // Key
	"Border Hills", // Title
	"shaSlo/shartrish-slopes-hills-med.jpg", // Med Icon
	"shaSlo/shartrish-slopes-hills.png", // Icon
	"At the eastern edge of the slopes, there's a natural corridor connecting the hilly domains of the Ashwalkers with the inner forests of the Confined Valley.", // Description
	[ new RoomConnection('plainsCorridor',30) ], // Connections
	null, // getActions
	[284,249] // TODO Position on map
);
setup.mapShartrishSlopes.plainsCorridor = new RoomInfo(
	"plainsCorridor", // Key
	"Plains Corridor", // Title
	"shaSlo/shartrish-slopes-med.jpg", // Med Icon
	"shaSlo/shartrish-slopes.png", // Icon
	"To the west, vegetation begins to spread out, living a more austere existence in a soil unwilling to provide more life.", // Description
	[ new RoomConnection('borderHills',30),
		new RoomConnection('ashwalkerPathEast',30) ], // Connections
	null, // getActions
	[269,210] // TODO Position on map
);
setup.mapShartrishSlopes.ashwalkerPathEast = new RoomInfo(
	"ashwalkerPathEast", // Key
	"Ashwalker Path East", // Title
	"shaSlo/shartrish-slopes-path-med.jpg", // Med Icon
	"shaSlo/shartrish-slopes-path.png", // Icon
	"Ages ago, a river ran free through this small valley. When the river left, the Ashwalkers built a path on its place.", // Description
	[ new RoomConnection('plainsCorridor',30),
		new RoomConnection('ashwalkerPathWest',15),
		new RoomConnection('quarryPath',4) ], // Connections
	null, // getActions
	[228,188] // TODO Position on map
);
setup.mapShartrishSlopes.ashwalkerPathWest = new RoomInfo(
	"ashwalkerPathWest", // Key
	"Ashwalker Path West", // Title
	"shaSlo/shartrish-slopes-path-med.jpg", // Med Icon
	"shaSlo/shartrish-slopes-path.png", // Icon
	"A hill raises proud at the west, its height barely showing the pillars marking the entrance to the Ashwalker tribe.", // Description
	[ new RoomConnection('townEntrance',3),
		new RoomConnection('ashwalkerPathEast',15),
		new RoomConnection('quarryPath',4),
		new RoomConnection('riverStroll',4) ], // Connections
	null, // getActions
	[194,154] // TODO Position on map
);
setup.mapShartrishSlopes.quarryPath = new RoomInfo(
	"quarryPath", // Key
	"Path to the quarry", // Title
	"shaSlo/barren-slopes-hills-med.jpg", // Med Icon
	"shaSlo/barren-slopes-hills.png", // Icon
	"A small, single trail finds its way between cantankerous hills, forming a path many Ashwalkers take routinely to reach the quarry.", // Description
	[ new RoomConnection('ashwalkerPathWest',3),
		new RoomConnection('ashwalkerPathEast',3),
		new RoomConnection('quarry',4) ], // Connections
	null, // getActions
	[246,148] // TODO Position on map
);
setup.mapShartrishSlopes.quarry = new RoomInfo(
	"quarry", // Key
	"The quarry", // Title
	"shaSlo/barren-slopes-plains-med.jpg", // Med Icon
	"shaSlo/barren-slopes-plains.png", // Icon
	"On the frontier between the contested domains of nature and the expanses of stone and sand, the Ashwalkers often fight the mountainside, pick in hand, to procure various minerals for their tools.", // Description
	[ new RoomConnection('quarryPath',3) ], // Connections
	null, // getActions
	[293,167] // TODO Position on map
);
setup.mapShartrishSlopes.riverStroll = new RoomInfo(
	"riverStroll", // Key
	"River stroll", // Title
	"shaSlo/shartrish-slopes-river-med.jpg", // Med Icon
	"shaSlo/shartrish-slopes-river.png", // Icon
	"You manage to find a recondite path amongst bushes and hills, taking you to a peaceful clear in front of the river.", // Description
	[ new RoomConnection('ashwalkerPathWest',4) ], // Connections
	null, // getActions
	[139,150] // TODO Position on map
);

// Town

setup.mapShartrishSlopes.townEntrance = new RoomInfo(
	"townEntrance", // Key
	"Town Entrance", // Title
	"shaSlo/ashwalker-entrance-med.jpg", // Med Icon
	"shaSlo/ashwalker-entrance.png", // Icon
	"Three pillars rise from the ground, holding a platform high above. A seemingly bored sentinel greets you.", // Description
	[ new RoomConnection('ashwalkerPathWest',3),
		new RoomConnection('bustlingHome',2) ], // Connections
	null, // getActions
	[179,114] // TODO Position on map
);
setup.mapShartrishSlopes.bustlingHome = new RoomInfo(
	"bustlingHome", // Key
	"Bustling Home", // Title
	"shaSlo/ashwalker-streets-med.jpg", // Med Icon
	"shaSlo/ashwalker-streets.png", // Icon
	"Bustling Home is a dense neighbourhood, housing both tall, usually packed houses, and the main streets of the town, which most people have to walk in their everyday activities.", // Description
	[ new RoomConnection('townEntrance',2),
		new RoomConnection('farmlands',2),
		new RoomConnection('taciturnHome',2),
		new RoomConnection('highHome',2) ], // Connections
	null, // getActions
	[156,78] // TODO Position on map
);
setup.mapShartrishSlopes.farmlands = new RoomInfo(
	"farmlands", // Key
	"Farmlands", // Title
	"shaSlo/shartrish-slopes-med.jpg", // Med Icon
	"shaSlo/shartrish-slopes.png", // Icon
	"The greenest area in the vicinity of the Ashwalker town is, quite unsurprisingly, dedicated to agriculture.", // Description
	[ new RoomConnection('bustlingHome',2),
		new RoomConnection('upperRiver',2) ], // Connections
	null, // getActions
	[115,80] // TODO Position on map
);
setup.mapShartrishSlopes.upperRiver = new RoomInfo(
	"upperRiver", // Key
	"Upper river", // Title
	"shaSlo/shartrish-slopes-river-med.jpg", // Med Icon
	"shaSlo/shartrish-slopes-river.png", // Icon
	"This section of the river sees its water run fresh and clear, although it isn't long until rocks and small cliffs become common, in both directions.", // Description
	[ new RoomConnection('farmlands',2) ], // Connections
	null, // getActions
	[89,101] // TODO Position on map
);
setup.mapShartrishSlopes.taciturnHome = new RoomInfo(
	"taciturnHome", // Key
	"Taciturn Home", // Title
	"shaSlo/ashwalker-streets-rev-med.jpg", // Med Icon
	"shaSlo/ashwalker-streets-rev.png", // Icon
	"Taciturn Home is the quiet opposite to Bustling Home, holding modest residences under the shadow of the nearby hills.", // Description
	[ new RoomConnection('bustlingHome',2),
		new RoomConnection('market',2),
		new RoomConnection('townOutskirts',2),
		new RoomConnection('pastures',2) ], // Connections
	null, // getActions
	[197,77] // TODO Position on map
);
setup.mapShartrishSlopes.townOutskirts = new RoomInfo(
	"townOutskirts", // Key
	"Town outskirts", // Title
	"shaSlo/dorm-rooms-night-med.jpg", // Med Icon
	"shaSlo/dorm-rooms-night.png", // Icon
	"Everything comes to an end, and so does the town. On its northern edge, there's a large paved square, sometimes a popular point of reunion in the evenings.", // Description
	[ new RoomConnection('taciturnHome',2),
		new RoomConnection('market',2),
		new RoomConnection('arena',2),
		new RoomConnection('cliffs',3) ], // Connections
	null, // getActions
	[237,66] // TODO Position on map
);
setup.mapShartrishSlopes.arena = new RoomInfo(
	"arena", // Key
	"Arena", // Title
	"shaSlo/arena-med.jpg", // Med Icon
	"shaSlo/arena.png", // Icon
	"The Ashwalker colosseum is a monument to dance and martial arts both. Hundreds of seats in the upper rows allow the whole tribe to contemplate and celebrate the dedication to various disciplines.", // Description
	[ new RoomConnection('market',2),
		new RoomConnection('townOutskirts',2) ], // Connections
	null, // getActions
	[251,23] // TODO Position on map
);
setup.mapShartrishSlopes.market = new RoomInfo(
	"market", // Key
	"Market", // Title
	"shaSlo/ashwalker-plaza-med.jpg", // Med Icon
	"shaSlo/ashwalker-plaza.png", // Icon
	"Plenty of shops and stands populate the market district, only some of which are permanent. The current festivities have turned this place busier than usual.", // Description
	[ new RoomConnection('highHome',2),
		new RoomConnection('taciturnHome',2),
		new RoomConnection('smithy',2),
		new RoomConnection('arena',2),
		new RoomConnection('townOutskirts',2) ], // Connections
	null, // getActions
	[205,37] // TODO Position on map
);
setup.mapShartrishSlopes.smithy = new RoomInfo(
	"smithy", // Key
	"Smithy", // Title
	"shaSlo/smithy-med.jpg", // Med Icon
	"shaSlo/smithy.png", // Icon
	"A tall building contains the various facilities used by smiths and other craftsmen. While they belong to the tribe as a whole, it is a non-written rule that the more experienced artisans have priority of use.", // Description
	[ new RoomConnection('market',2) ], // Connections
	null, // getActions
	[212,5] // TODO Position on map
);
setup.mapShartrishSlopes.highHome = new RoomInfo(
	"highHome", // Key
	"High Home", // Title
	"shaSlo/dorm-rooms-med.jpg", // Med Icon
	"shaSlo/dorm-rooms.png", // Icon
	"High Home is the district located at the upper parts of the town, with some of its houses built on the ladders of various hills. At its center, there's a square where some public figures are sometimes found discussing the politics of the tribe.", // Description
	[ new RoomConnection('bustlingHome',2),
		new RoomConnection('market',2),
		new RoomConnection('templeOfFlux',2),
		new RoomConnection('garden',2) ], // Connections
	null, // getActions
	[160,38] // TODO Position on map
);
setup.mapShartrishSlopes.garden = new RoomInfo(
	"garden", // Key
	"Garden", // Title
	"shaSlo/ashwalker-garden-1-med.jpg", // Med Icon
	"shaSlo/ashwalker-garden-1.png", // Icon
	"A diligently raised garden is found in the vicinities of the Temple of Flux, containing some of the most exotic flora of the Shartrish Slopes.", // Description
	[ new RoomConnection('highHome',2),
		new RoomConnection('templeOfFlux',2) ], // Connections
	null, // getActions
	[159,8] // TODO Position on map
);
setup.mapShartrishSlopes.templeOfFlux = new RoomInfo(
	"templeOfFlux", // Key
	"Temple of Flux", // Title
	"shaSlo/temple-of-flux-med.jpg", // Med Icon
	"shaSlo/temple-of-flux.png", // Icon
	"A palace reminiscest of an alien culture that finds its roots beyond the borders of the Confined Valley. Its priesthood follows a syncretic doctrine that worships the Goddess while observing foreign philosophies.", // Description
	[ new RoomConnection('highHome',2),
		new RoomConnection('garden',2),
		new RoomConnection('bedroom',1),
		new RoomConnection('innerRooms',1) ], // Connections
	null, // getActions
	[118,33] // TODO Position on map
);
setup.mapShartrishSlopes.bedroom = new RoomInfo(
	"bedroom", // Key
	"Bedroom", // Title
	"candidates-room-med.png", // Med Icon
	"candidates-room.png", // Icon
	"The Temple of Flux often provides housing for the guests of the Ashwalkers. Feels quite welcoming after your experience at the Shapeshifter tribe.", // Description
	[ new RoomConnection('templeOfFlux',1) ], // Connections
	null, // getActions
	[84,8] // TODO Position on map
);
setup.mapShartrishSlopes.innerRooms = new RoomInfo(
	"innerRooms", // Key
	"Inner Rooms", // Title
	"storage-med.png", // Med Icon
	"storage.png", // Icon
	"The Temple counts with several useful facilities, the most important of which is probably the library.", // Description
	[ new RoomConnection('templeOfFlux',1) ], // Connections
	null, // getActions
	[78,50] // TODO Position on map
);
setup.mapShartrishSlopes.pastures = new RoomInfo(
	"pastures", // Key
	"Pastures", // Title
	"shaSlo/shartrish-slopes-pasture-med.jpg", // Med Icon
	"shaSlo/shartrish-slopes-pasture.png", // Icon
	"Unlike most other domesticated animals found in the Confined Valley, the Ashwalker goat has no wild counterpart.", // Description
	[ new RoomConnection('taciturnHome',2),
		new RoomConnection('cliffs',3) ], // Connections
	null, // getActions
	[236,102] // TODO Position on map
);
setup.mapShartrishSlopes.cliffs = new RoomInfo(
	"cliffs", // Key
	"Town cliffs", // Title
	"shaSlo/shartrish-slopes-hills-med.jpg", // Med Icon
	"shaSlo/shartrish-slopes-hills.png", // Icon
	"Sending your sight high north, you spot the white crown of distant mountains, past the seas of sand and rock, marking the end of the Confined Valley.", // Description
	[ new RoomConnection('townOutskirts',2),
		new RoomConnection('pastures',3) ], // Connections
	null, // getActions
	[278,82] // TODO Position on map
);



// General logic

window.initMapShartrishSlopes = function() {
	State.variables.mapShartrishSlopes = new Chart("mapShartrishSlopes","Shartrish Slopes");
	State.variables.mapShartrishSlopes.diagramDimensions = [380,280];
	State.variables.mapShartrishSlopes.icon = "shartrish-slopes-map.png";

	State.variables.mapShartrishSlopes.autogenerateRooms("mapShartrishSlopes");
}
window.deinitMapShartrishSlopes = function() {
	delete State.variables.mapShartrishSlopes;
}


