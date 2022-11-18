////////// GLEAMING CAVERNS MAPS ////////// 

	// Actions

window.mayGetAction = function(condition,failedMessage,action) {
	
}
window.mayGetBinaryAction = function(condition,extraMessage) {
}

	// Swamp //

setup.mapGleamingCaverns = [];
setup.mapGleamingCaverns.marshLP5 = new RoomInfo(
	"marshLP5", // Key
	"Swamp ~ Western Path 5", // Title
	"GleCav/marsh-forest-r.png", // Med Icon
	"GleCav/marsh-forest-r-sm.png", // Icon
	"This path connects the inner forests of the Confined Valley with the swamp of the Gleaming Caverns.", // Description
	[ new RoomConnection('marshLP4',2) ,
		  new RoomConnection('marshLPpuddles',3) ], // Connections
	null, // getActions
	[36,12]
);
setup.mapGleamingCaverns.marshLPpuddles = new RoomInfo(
	"marshLPpuddles", // Key
	"Swamp ~ Western Path Puddles", // Title
	"GleCav/marsh-swamp.png", // Med Icon
	"GleCav/marsh-swamp-sm.png", // Icon
	"Small bushes decorate the surroundings of a few ponds of water. Upon inspecting closely, some of the bushes are decorated by spider webs.", // Description
	[ new RoomConnection('marshLP3',3) ,
	  new RoomConnection('marshLP4',3) ,
	  new RoomConnection('marshLP5',3) ], // Connections
	null, // getActions
	[10,32]
);
setup.mapGleamingCaverns.marshLP4 = new RoomInfo(
	"marshLP4", // Key
	"Swamp ~ Western Path 4", // Title
	"GleCav/marsh-forest.png", // Med Icon
	"GleCav/marsh-forest-sm.png", // Icon
	"The air becomes more humid as you advance towards the marsh.", // Description
	[ new RoomConnection('marshLP3',2) ,
	  new RoomConnection('marshLP5',2) ,
	  new RoomConnection('marshLPpuddles',3),
	  new RoomConnection('marshLPlake',5)	  ], // Connections
	null, // getActions
	[40,40]
);
setup.mapGleamingCaverns.marshLP3 = new RoomInfo(
	"marshLP3", // Key
	"Swamp ~ Western Path 3", // Title
	"GleCav/marsh-forest-r.png", // Med Icon
	"GleCav/marsh-forest-r-sm.png", // Icon
	"A large lake, connected to a river, stands to your east. At the north, you find small ponds of water.", // Description
	[ new RoomConnection('marshLP2',2),
	  new RoomConnection('marshLP4',2) ,
		  new RoomConnection('marshLPpuddles',3),
		  new RoomConnection('marshLPlake',5) ], // Connections
	null, // getActions
	[16,66]
);
setup.mapGleamingCaverns.marshLP2 = new RoomInfo(
	"marshLP2", // Key
	"Swamp ~ Western Path 2", // Title
	"GleCav/marsh-forest.png", // Med Icon
	"GleCav/marsh-forest-sm.png", // Icon
	"Looking into the distance, rivers, ponds and water become far more common.", // Description
	[ new RoomConnection('marshLP1',2),
	  new RoomConnection('marshLP3',2),
	  new RoomConnection('marshLPlake',5) ], // Connections
	null, // getActions
	[25,95]
);
setup.mapGleamingCaverns.marshLP1 = new RoomInfo(
	"marshLP1", // Key
	"Swamp ~ Western Path 1", // Title
	"GleCav/marsh-forest-r.png", // Med Icon
	"GleCav/marsh-forest-r-sm.png", // Icon
	"A section of the road finds its limit next to a bridge. The smell of wet flora floods your nose.", // Description
	[ new RoomConnection('marshLbridge',2),
	  new RoomConnection('marshLP2',2),
	  new RoomConnection('marshLPlake',5),
      new RoomConnection('marshLriver2',4) ], // Connections
	null, // getActions
	[55,102]
);
setup.mapGleamingCaverns.marshLPlake = new RoomInfo(
	"marshLPlake", // Key
	"Swamp ~ Western Path Lake", // Title
	"GleCav/marsh-lake-r.png", // Med Icon
	"GleCav/marsh-lake-r-sm.png", // Icon
	"Countless dragonflies roam the shores of the lake in their quest for food, and the flapping of their wings adds ambience music to the scenery.", // Description
	[ new RoomConnection('marshLP1',5) ,
	  new RoomConnection('marshLP2',5) ,
	  new RoomConnection('marshLP3',5) ,
	  new RoomConnection('marshLP4',5) ,
	  new RoomConnection('marshLriver2',5) ], // Connections
	null, // getActions
	[44,67]
);

// marshLbridge, marshMP2, marshMP1, marshMpuddles, marshNP4, marshLriver2
setup.mapGleamingCaverns.marshLbridge = new RoomInfo(
	"marshLbridge", // Key
	"Swamp ~ Western Bridge", // Title
	"GleCav/marsh-river-bridge.png", // Med Icon
	"GleCav/marsh-river-bridge-sm.png", // Icon
	"This bridge connects the western, central and northern paths of the swamps.", // Description
	[ new RoomConnection('marshLP1',2) ,
	  new RoomConnection('marshMP2',2) ,
	  new RoomConnection('marshNP4',2) ,
	  new RoomConnection('marshLriver2',4),
	  new RoomConnection('marshSriver',4),
	  new RoomConnection('marshSEpuddles',3) ], // Connections
	null, // getActions
	[84,108]
);
setup.mapGleamingCaverns.marshMP2 = new RoomInfo(
	"marshMP2", // Key
	"Swamp ~ Central Path 2", // Title
	"GleCav/marsh-forest.png", // Med Icon
	"GleCav/marsh-forest-sm.png", // Icon
	"An eerie silence fills your ears.", // Description
	[ new RoomConnection('marshMP1',2) ,
	  new RoomConnection('marshNP4',2) ,
	  new RoomConnection('marshLbridge',2) ,
	  new RoomConnection('marshMpuddles',3),
	  new RoomConnection('marshSEpuddles',3) ], // Connections
	null, // getActions
	[112,117]
);
setup.mapGleamingCaverns.marshMP1 = new RoomInfo(
	"marshMP1", // Key
	"Swamp ~ Central Path 1", // Title
	"GleCav/marsh-forest.png", // Med Icon
	"GleCav/marsh-forest-sm.png", // Icon
	"The bridge at your east leads to the Gleaming Caverns, while the opposite path leads to the limits of the swamp.", // Description
	[ new RoomConnection('marshSbridge',2),
	  new RoomConnection('marshMP2',2) ,
	  new RoomConnection('marshMpuddles',3) ], // Connections
	null, // getActions
	[138,123]
);
setup.mapGleamingCaverns.marshLriver2 = new RoomInfo(
	"marshLriver2", // Key
	"Swamp ~ Western River 2", // Title
	"GleCav/marsh-river.png", // Med Icon
	"GleCav/marsh-river-r-sm.png", // Icon
	"Close to the confines of the swamp, a surge of vegetation hinders movement along the shore of the river.", // Description
	[ new RoomConnection('marshLPlake',5) ,
	  new RoomConnection('marshLP1',4) ,
	  new RoomConnection('marshNP4',4) ,
	  new RoomConnection('marshLbridge',4),
	  new RoomConnection('marshLriver1',4) ], // Connections
	null, // getActions
	[77,75]
);
setup.mapGleamingCaverns.marshNP4 = new RoomInfo(
	"marshNP4", // Key
	"Swamp ~ Northern Path 4", // Title
	"GleCav/marsh-forest-r.png", // Med Icon
	"GleCav/marsh-forest-r-sm.png", // Icon
	"A faint, yet rapid hammering comes from the woods. Upon focusing your sight, you find a couple of squirrels at the higher branches of a tall tree, eyeing you carefully while they devour acorns.", // Description
	[ new RoomConnection('marshMP2',2) ,
	  new RoomConnection('marshNP3',2) ,
	  new RoomConnection('marshLbridge',2) ,
	  new RoomConnection('marshLriver2',4) ,
	  new RoomConnection('marshMpuddles',3) ], // Connections
	null, // getActions
	[106,80]
);
setup.mapGleamingCaverns.marshMpuddles = new RoomInfo(
	"marshMpuddles", // Key
	"Swamp ~ Middle Puddles", // Title
	"GleCav/marsh-swamp.png", // Med Icon
	"GleCav/marsh-swamp-sm.png", // Icon
	"One grand hill blocks the way to your east. You're unable to find a path that would allow you to pass it, but some trees did find the way to sprout at its top.", // Description
	[ new RoomConnection('marshMP1',3) ,
	  new RoomConnection('marshMP2',3) ,
	  new RoomConnection('marshNP3',3) ,
	  new RoomConnection('marshNP4',2)	  ], // Connections
	null, // getActions
	[137,86]
);

// marshSEpuddles, marshSWpuddles, marshSriver, marshSElake, marshSWlake
setup.mapGleamingCaverns.marshSEpuddles = new RoomInfo(
	"marshSEpuddles", // Key
	"Swamp ~ South East Puddles", // Title
	"GleCav/marsh-swamp.png", // Med Icon
	"GleCav/marsh-swamp-sm.png", // Icon
	"Some puddles of water are right next to the mountain walls, perhaps connected to its underground rivers.", // Description
	[ new RoomConnection('marshMP2',3) ,
	  new RoomConnection('marshLbridge',3) ,
	  new RoomConnection('marshSriver',4),
      new RoomConnection('marshSElake',5) ], // Connections
	null, // getActions
	[83,137]
);
setup.mapGleamingCaverns.marshSriver = new RoomInfo(
	"marshSriver", // Key
	"Swamp ~ South River", // Title
	"GleCav/marsh-river.png", // Med Icon
	"GleCav/marsh-river-sm.png", // Icon
	"The strength of this river gracefully diminishes until it becomes almost as still as the lake where it meets its end.", // Description
	[ new RoomConnection('marshLbridge',4) ,
	  new RoomConnection('marshSEpuddles',4) ,
	  new RoomConnection('marshSWpuddles',4),
      new RoomConnection('marshSElake',5) ], // Connections
	null, // getActions
	[57,127]
);
setup.mapGleamingCaverns.marshSWpuddles = new RoomInfo(
	"marshSWpuddles", // Key
	"Swamp ~ South West Puddles", // Title
	"GleCav/marsh-swamp.png", // Med Icon
	"GleCav/marsh-swamp-sm.png", // Icon
	"Bravely and fiercely, a battalion of ants try their best to transport food back to their nest, but they get frequently assaulted by frogs shooting their tongues at them.", // Description
	[ new RoomConnection('marshSriver',4) ,
	  new RoomConnection('marshSElake',5) ,
	  new RoomConnection('marshSWlake',5) ], // Connections
	null, // getActions
	[26,140]
);
setup.mapGleamingCaverns.marshSElake = new RoomInfo(
	"marshSElake", // Key
	"Swamp ~ South East Lake", // Title
	"GleCav/marsh-lake.png", // Med Icon
	"GleCav/marsh-lake-sm.png", // Icon
	"The image of the mountain rises up to the skies, and down into the waters.", // Description
	[ new RoomConnection('marshSEpuddles',5) ,
	  new RoomConnection('marshSriver',5) ,
	  new RoomConnection('marshSWpuddles',5),
	  new RoomConnection('marshSWlake',5) ], // Connections
	null, // getActions
	[52,155]
);
setup.mapGleamingCaverns.marshSWlake = new RoomInfo(
	"marshSWlake", // Key
	"Swamp ~ South West Lake", // Title
	"GleCav/marsh-lake-ext.png", // Med Icon
	"GleCav/marsh-lake-ext-sm.png", // Icon
	"The water keeps extending beyond the reach of your eyes.", // Description
	[ new RoomConnection('marshSElake',5) ,
	  new RoomConnection('marshSWpuddles',5) ], // Connections
	null, // getActions
	[22,167]
);

// marshLriver1, marshNP3, marshNP2, marshNWlake, marshNElake
setup.mapGleamingCaverns.marshLriver1 = new RoomInfo(
	"marshLriver1", // Key
	"Swamp ~ Western River 1", // Title
	"GleCav/marsh-river.png", // Med Icon
	"GleCav/marsh-river-sm.png", // Icon
	"Reeds become far more common in this area, and so does the muddy terrain. A careless misstep may leave you with your feet stuck on the ground.", // Description
	[ new RoomConnection('marshLriver2',5) ,
	  new RoomConnection('marshNP3',5),
	  new RoomConnection('marshNWlake',5) ], // Connections
	null, // getActions
	[94,37]
);
setup.mapGleamingCaverns.marshNP3 = new RoomInfo(
	"marshNP3", // Key
	"Swamp ~ Northern Path 3", // Title
	"GleCav/marsh-forest-r.png", // Med Icon
	"GleCav/marsh-forest-r-sm.png", // Icon
	"Lush vegetation at both sides of the road blocks your sight.", // Description
	[ new RoomConnection('marshNP2',2) ,
	  new RoomConnection('marshNP4',2),
	  new RoomConnection('marshNWlake',5),
      new RoomConnection('marshLriver1',5),
	  new RoomConnection('marshMpuddles',4) ], // Connections
	null, // getActions
	[130,54]
);
setup.mapGleamingCaverns.marshNP2 = new RoomInfo(
	"marshNP2", // Key
	"Swamp ~ Northern Path 2", // Title
	"GleCav/marsh-forest.png", // Med Icon
	"GleCav/marsh-forest-sm.png", // Icon
	"To your north, an ample lake opens its arms, welcoming you.", // Description
	[ new RoomConnection('marshNP1',2) , 
	  new RoomConnection('marshNP3',2) ,
	  new RoomConnection('marshNElake',5) ,
	  new RoomConnection('hiddenCamp',3) ], // Connections
	null, // getActions
	[163,51]
);
setup.mapGleamingCaverns.marshNWlake = new RoomInfo(
	"marshNWlake", // Key
	"Swamp ~ North Western Lake", // Title
	"GleCav/marsh-lake-ext.png", // Med Icon
	"GleCav/marsh-lake-ext-sm.png", // Icon
	"\"Straying so far away from the path may have been a mistake\", you think as you realize you're surrounded by quicksand.", // Description
	[ new RoomConnection('marshNP3',8) ,
	  new RoomConnection('marshNElake',8),
	  new RoomConnection('marshLriver1',8) ], // Connections
	null, // getActions
	[128,20]
);
setup.mapGleamingCaverns.marshNElake = new RoomInfo(
	"marshNElake", // Key
	"Swamp ~ North Eastern Lake", // Title
	"GleCav/marsh-lake-r.png", // Med Icon
	"GleCav/marsh-lake-r-sm.png", // Icon
	"This shore of the lake is rich in flowers and other colorful plants. The western side of the lake, however, looks far sourer.", // Description
	[ new RoomConnection('marshNP2',5) ,
	  new RoomConnection('marshNWlake',5) ], // Connections
	null, // getActions
	[160,20]
);

// marshSbridge, marshSP3, marshSP2, marshSP1, marshCentrance, marshELlake
setup.mapGleamingCaverns.marshSbridge = new RoomInfo(
	"marshSbridge", // Key
	"Swamp ~ Southern Bridge", // Title
	"GleCav/marsh-river-bridge-r.png", // Med Icon
	"GleCav/marsh-river-bridge-r-sm.png", // Icon
	"This bridge connects the entrance to the Gleaming Caverns with the central parts of the swamp.", // Description
	[ new RoomConnection('marshMP1',2),
	  new RoomConnection('marshSP3',2),
	  new RoomConnection('marshEUriver',4)	  ], // Connections
	null, // getActions
	[164,127]
);
setup.mapGleamingCaverns.marshSP3 = new RoomInfo(
	"marshSP3", // Key
	"Swamp ~ Southern Path 3", // Title
	"GleCav/marsh-forest.png", // Med Icon
	"GleCav/marsh-forest-sm.png", // Icon
	"A bridge at your west leads to the central parts of the swamp, while another bridge at your north stands broken and unrepaired.", // Description
	[ new RoomConnection('marshSP2',2) ,
	  new RoomConnection('marshSbridge',2) ,
	  new RoomConnection('marshELriver',4) ,
	  new RoomConnection('marshELlake',5) ], // Connections
	null, // getActions
	[192,135]
);
setup.mapGleamingCaverns.marshSP2 = new RoomInfo(
	"marshSP2", // Key
	"Swamp ~ Southern Path 2", // Title
	"GleCav/marsh-forest-r.png", // Med Icon
	"GleCav/marsh-forest-r-sm.png", // Icon
	"There's little vegetation between the path you're following and the mountain at your south. What appears to be a short wall of rock is soon followed by taller, far more towering ridges.", // Description
	[ new RoomConnection('marshSP1',2) ,
	  new RoomConnection('marshSP3',2) ,
	  new RoomConnection('marshELlake',5) ], // Connections
	null, // getActions
	[201,161]
);
setup.mapGleamingCaverns.marshSP1 = new RoomInfo(
	"marshSP1", // Key
	"Swamp ~ Southern Path 1", // Title
	"GleCav/marsh-forest.png", // Med Icon
	"GleCav/marsh-forest-sm.png", // Icon
	"A humid entrance into the depths of the mountain appears between the trees. Beyond it, lie the Gleaming Caverns, and further beyond, the Shapeshifter tribe.", // Description
	[ new RoomConnection('marshCentrance',2) ,
	  new RoomConnection('marshSP2',2) ,
	  new RoomConnection('marshELlake',5) ], // Connections
	null, // getActions
	[228,170]
);
setup.mapGleamingCaverns.marshSP1.getConnections = function(characters) {
	var connections = [ new RoomConnection('marshSP2',2) ,
						new RoomConnection('marshELlake',5) ];
	  
	var flagCapturedMonster = false;
	for ( var cK of characters ) {
		if ( doesCharHaveState(cK,"CaMn") == true ) {
			flagCapturedMonster = true;
		}
	}
	if ( flagCapturedMonster == false ) {
		connections.push( new RoomConnection('marshCentrance',2) );
	}
	  
	return connections;
}
setup.mapGleamingCaverns.marshSP1.displayConnections = function(characters) {
	var string = "";
	
	var flagCapturedMonster = false;
	var playerGroup = getCharGroup("chPlayerCharacter");
	for ( var cK of playerGroup ) {
		if ( doesCharHaveState(cK,"CaMn") == true ) {
			flagCapturedMonster = true;
		}
	}
	if ( flagCapturedMonster == false ) {
		string += getLinkToRoom('marshCentrance',"Go to " + getCurrentMap().rooms['marshCentrance'].title,2)
			    + " (" + colorText(2,"khaki") + ") " + displayCharIconsInRoom('marshCentrance') + "\n";
	} else {
		string += colorText("It isn't a wise idea to bring monsters into the Caverns, as subdued as they may be.\n","red");
	}
	
	string += getLinkToRoom('marshSP2',"Go to " + getCurrentMap().rooms['marshSP2'].title,2)
			    + " (" + colorText(2,"khaki") + ") " + displayCharIconsInRoom('marshSP2') + "\n";
	string += getLinkToRoom('marshELlake',"Go to " + getCurrentMap().rooms['marshELlake'].title,5)
			    + " (" + colorText(2,"khaki") + ") " + displayCharIconsInRoom('marshELlake') + "\n";
	
	return string;
}
setup.mapGleamingCaverns.marshELlake = new RoomInfo(
	"marshELlake", // Key
	"Swamp ~ Eastern Lower Lake", // Title
	"GleCav/marsh-lake-ext.png", // Med Icon
	"GleCav/marsh-lake-ext-sm.png", // Icon
	"A few humanoid figures have been crafted with clay close to the water, but they haven't been properly heated, and it won't take too long for them to completely lose their form.", // Description
	[ new RoomConnection('marshSP1',5) ,
	  new RoomConnection('marshSP2',5) ,
	  new RoomConnection('marshSP3',5) ,
	  new RoomConnection('marshELriver',5) , 
	  new RoomConnection('marshEUlake',5) ], // Connections
	null, // getActions
	[225,136]
);
setup.mapGleamingCaverns.marshCentrance = new RoomInfo(
	"marshCentrance", // Key
	"Swamp ~ Caverns Entrance", // Title
	"GleCav/cavern-entrance-rev.png", // Med Icon
	"GleCav/cavern-entrance-rev-sm.png", // Icon
	"An eerie, yet appealing cyan light comes out of the cavern.", // Description
	[ new RoomConnection('marshSP1',2),
		new RoomConnection('cavernMP3',2) ], // Connections 
	null, // getActions
	[34,11] // 34,11 , [228,170] , [256,174]
);

// marshNP1, marshEUriver, marshELriver, marshNEbridge, marshNEriver, marshEUlake, marshMpath, marshMentrance
setup.mapGleamingCaverns.marshNP1 = new RoomInfo(
	"marshNP1", // Key
	"Swamp ~ Northern Path 1", // Title
	"GleCav/marsh-forest.png", // Med Icon
	"GleCav/marsh-forest-sm.png", // Icon
	"Looking at your horizon to the east, you find it's easy to follow a path leading towards the mountains.", // Description
	[ new RoomConnection('marshNP2',2) ,
	  new RoomConnection('marshNEbridge',2) ,
	  new RoomConnection('marshNEriver',4) ,
	  new RoomConnection('marshEUriver',4) ], // Connections
	null, // getActions
	[193,59]
);
setup.mapGleamingCaverns.marshEUriver = new RoomInfo(
	"marshEUriver", // Key
	"Swamp ~ Eastern River 2", // Title
	"GleCav/marsh-river.png", // Med Icon
	"GleCav/marsh-river-sm.png", // Icon
	"The river diverges into two different directions, from the north to the south-west and to the south-east.", // Description
	[ new RoomConnection('marshNP1',4) ,
	  new RoomConnection('marshNEbridge',4),
	  new RoomConnection('marshELriver',4),
	  new RoomConnection('marshSbridge',4) ], // Connections
	null, // getActions
	[184,95]
);
setup.mapGleamingCaverns.marshELriver = new RoomInfo(
	"marshELriver", // Key
	"Swamp ~ Eastern River 1", // Title
	"GleCav/marsh-river-r.png", // Med Icon
	"GleCav/marsh-river-r-sm.png", // Icon
	"Several pieces of a throughly broken bridge have fallen into the water, and now do more to hinder movement than to facilitate it.", // Description
	[ new RoomConnection('marshSP3',5) ,
	  new RoomConnection('marshMpath',5) , 
	  new RoomConnection('marshEUriver',5),
	  new RoomConnection('marshEUlake',5),
	  new RoomConnection('marshELlake',5) ], // Connections
	null, // getActions
	[212,107]
);
setup.mapGleamingCaverns.marshNEbridge = new RoomInfo(
	"marshNEbridge", // Key
	"Swamp ~ Mountain Bridge", // Title
	"GleCav/marsh-river-bridge.png", // Med Icon
	"GleCav/marsh-river-bridge-sm.png", // Icon
	"One of the paths that connects this bridge leads to the mountains; the other leads to the center of the swamp.", // Description
	[ new RoomConnection('marshNP1',2),
	  new RoomConnection('marshMpath',2),
	  new RoomConnection('marshEUriver',4),
	  new RoomConnection('marshNEriver',4) ], // Connections
	null, // getActions
	[217,80]
);
setup.mapGleamingCaverns.marshNEriver = new RoomInfo(
	"marshNEriver", // Key
	"Swamp ~ North Eastern River", // Title
	"GleCav/marsh-river.png", // Med Icon
	"GleCav/marsh-river-sm.png", // Icon
	"Coming fresh from the mountain, this water stream strikes ferociously against the shores. Swimming against the current, if possible, would only lead to crashing against the rocks.", // Description
	[ new RoomConnection('marshMpath',6) ,
	  new RoomConnection('marshNP1',6),
	  new RoomConnection('marshNEbridge',5) ], // Connections
	null, // getActions
	[228,51]
);
setup.mapGleamingCaverns.marshEUlake = new RoomInfo(
	"marshEUlake", // Key
	"Swamp ~ Eastern Upper Lake", // Title
	"GleCav/marsh-lake-r.png", // Med Icon
	"GleCav/marsh-lake-r-sm.png", // Icon
	"In the middle of the lake, an isolated island serves as an unlikely haven of peace, far away from the Temple, the tribes, the monsters and their tribulations.", // Description
	[ new RoomConnection('marshMpath',5) ,
	  new RoomConnection('marshELlake',5) ,
	  new RoomConnection('marshELriver',5) ], // Connections
	null, // getActions
	[240,110]
);
setup.mapGleamingCaverns.marshMpath = new RoomInfo(
	"marshMpath", // Key
	"Swamp ~ Mountain Path", // Title
	"GleCav/marsh-forest-r.png", // Med Icon
	"GleCav/marsh-forest-r-sm.png", // Icon
	"While the flora still remains common and healthy, following the path upwards makes the terrain become more arid, while going down humidifies the air.", // Description
	[ new RoomConnection('marshNEbridge',2) ,
	  new RoomConnection('marshMentrance',2) ,
	  new RoomConnection('marshELriver',4) ,
	  new RoomConnection('marshEUlake',5) ,
	  new RoomConnection('marshNEriver',4) ], // Connections
	null, // getActions
	[245,85]
);
setup.mapGleamingCaverns.marshMentrance = new RoomInfo(
	"marshMentrance", // Key
	"Swamp ~ Mountains Entrance", // Title
	"GleCav/mountain-path-forested-r.png", // Med Icon
	"GleCav/mountain-path-forested-r-sm.png", // Icon
	"Gazing into the distance makes your eyes meet a goat. You envy the goat as soon as you realize that it makes climbing the mountain's walls look as easy as you would make walking look to a baby.", // Description
	[ new RoomConnection('marshMpath',2) ], // Connections
	null, // getActions
	[257,59]
);

setup.mapGleamingCaverns.hiddenCamp = new RoomInfo(
	"hiddenCamp", // Key
	"Swamp ~ Hidden Camp", // Title
	"GleCav/mountain-path-forested.png", // Med Icon
	"GleCav/mountain-path-forested-sm.png", // Icon
	"Hidden behind a small grove, a trail leads to the top of the hills in the middle of the swamp.", // Description
	[ new RoomConnection('marshNP2',3) ], // Connections
	function(characters) {
		var actions = [ createRestingActionStandard() ];
		// Get Capture Net -> Only available if no character has the altered state
		var flagHasCaptureNet = true;
		for ( var cK of characters) {
			if ( doesCharHaveAlteredState(cK,"CaNt") == false ) {
				flagHasCaptureNet = false;
			}
		}
		if ( flagHasCaptureNet == false ) {
			actions.push(createGetHuntingNetAction());
		}
		// Deliver monster -> Only available if first character in group is dragging monsters
		var flagHasCapturedMonsters = false;
		for ( var as of gC(characters[0]).alteredStates ) {
			if ( as.acr == "CaMn" ) {
				flagHasCapturedMonsters = true;
			}
		}
		if ( flagHasCapturedMonsters == true ) {
			actions.push(createDeliverMonstersAction());
		}
		return actions;
	}, // getActions
	[160,84]
);

// Trap room - Characters who have been defeated for the rest of the day are kept here
setup.mapGleamingCaverns.trapRoom = new RoomInfo(
	"trapRoom", // Key
	"Secluded Place", // Title
	"GleCav/mountain-path-forested.png", // Med Icon
	"GleCav/mountain-path-forested-sm.png", // Icon
	"You have been captured by monsters. Try and lay low and you will find your chance to escape.", // Description
	[ ], // Connections
	function(characters) {
		var actions = [ createRestingActionStandard() ];
		return actions;
	}, // getActions
	[160,84]
);

	// Caverns //

setup.mapGleamingCaverns.cavernMP3 = new RoomInfo(
	"cavernMP3", // Key
	"Caverns ~ Main Path 3", // Title
	"GleCav/caverns-pavemented-path.png", // Med Icon
	"GleCav/caverns-pavemented-path-sm.png", // Icon
	"Tiles crafted with clay garnish the walls, guiding the unwary traveller through the safe tunnels of the caverns.", // Description
	[ new RoomConnection('cavernMP2',2) ,
		  new RoomConnection('marshCentrance',2),
		  new RoomConnection('hiddenHut',2) ], // Connections
	null, // getActions
	[59,29]
);
setup.mapGleamingCaverns.hiddenHut = new RoomInfo(
	"hiddenHut", // Key
	"Caverns ~ Morph Artist Hut", // Title
	"GleCav/town-lonely-house.png", // Med Icon
	"GleCav/town-lonely-house-sm.png", // Icon
	"After passing through an inconspicuous passage, you find a secluded hut.", // Description
	[ new RoomConnection('cavernMP3',2) ], // Connections
	function(characters) {
		var actions = [ ] ;
		if ( isStVarOn("mphInit") == true ) {
			actions.push(createGleamingCavernsMorphHutMedInit());
		} else {
			actions.push(createGleamingCavernsMorphHutInit());
		}
	//	createGleamingCavernsMorphHutInit() ];
	//	if ( isStVarOn("dldCrf") == true && isStVarOn("dldPly") == false && characters[0] == "chPlayerCharacter" ) {
	//		actions.push(createGleamingCavernsDildoPlayAction());
	// createGleamingCavernsMorphHutMedInit
	//	}
		return actions;
	}, // getActions
	[66,4]
);
setup.mapGleamingCaverns.cavernMP2 = new RoomInfo(
	"cavernMP2", // Key
	"Caverns ~ Main Path 2", // Title
	"GleCav/caverns-pavemented-path.png", // Med Icon
	"GleCav/caverns-pavemented-path-sm.png", // Icon
	"A painting on the wall resembles a person surrounded by rocks and water, unable to find their way out. This is a warning for the over-confident explorers, telling them to stay away of the unmarked path.", // Description
	[ new RoomConnection('cavernMP1',2) ,
		  new RoomConnection('cavernMP3',2),
		  new RoomConnection('labyrinthEntrance',2) ], // Connections
	null, // getActions
	[69,54]
);
setup.mapGleamingCaverns.labyrinthEntrance = new RoomInfo(
	"labyrinthEntrance", // Key
	"Caverns ~ Deeper Tunnels Entrance", // Title
	"GleCav/caverns-wild-path-r.png", // Med Icon
	"GleCav/caverns-wild-path-r-sm.png", // Icon
	"The guidance of the ceramic art ends here, only gleaming crystals illuminating the way ahead. Beyond this point, the walls and waters of the Caverns may leave you trapped at their own whims.", // Description
	[ new RoomConnection('cavernMP2',2) ], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel1","Section 1",0,2),
						createActionMovingWildTunnel("wildTunnel2","Section 2",0,2) ];
		return actions;
	}, // getActions
	[93,48]
);
setup.mapGleamingCaverns.labyrinthEntrance.getEventPrompt = function(characters) {
	if ( characters.includes("chPlayerCharacter") && isStVarOn("trImpr") == true && isStVarOn("GcVcCv") == false ) {
		var initialPassage = initFaSeVoicesFromTheCaverns();
		State.variables.compass.interludePassage = "Behind the corner...\n\n"
			+ "<<l" + "ink [[Continue|" + initialPassage + "]]>><<s" + "cript>>\n"
			+ "State.variables.compass.finishPlayerPrompt();\n"
			+ "<</s" + "cript>><</l" + "ink>>";
		State.variables.compass.setPlayerPrompt(State.variables.compass.interludePassage,"chPlayerCharacter",false);
	}
	// No need to initiate an event. An event might break the event chain.
}

setup.mapGleamingCaverns.cavernMP1 = new RoomInfo(
	"cavernMP1", // Key
	"Caverns ~ Main Path 1", // Title
	"GleCav/caverns-pavemented-path.png", // Med Icon
	"GleCav/caverns-pavemented-path-sm.png", // Icon
	"The way forks here in three directions. You can reach the Shapeshifter tribe and the Lake of Union from here.", // Description
	[ new RoomConnection('cavernMP2',2) ,
		  new RoomConnection('unionLakeEast',2),
		  new RoomConnection('mainStreet1',2) ], // Connections
	null, // getActions
	[72,79]
);
setup.mapGleamingCaverns.unionLakeEast = new RoomInfo(
	"unionLakeEast", // Key
	"Caverns ~ Union Lake Entrance", // Title
	"GleCav/caverns-semi-flooded-path-r.png", // Med Icon
	"GleCav/caverns-semi-flooded-path-r-sm.png", // Icon
	"A tranquil, bottomless lake rests in front of you. The smallest of waves echo through the giant chamber.", // Description
	[ new RoomConnection('cavernMP1',2) ,
		  new RoomConnection('unionLakeWest',2),
		  new RoomConnection('unionLakeUpper',4) ], // Connections
	function(characters) {
		var actions = [ createRestingActionStandard() ];
		return actions;
	}, // getActions
	[45,82]
);
setup.mapGleamingCaverns.unionLakeWest = new RoomInfo(
	"unionLakeWest", // Key
	"Caverns ~ Union Lake Interior", // Title
	"GleCav/caverns-semi-flooded-path.png", // Med Icon
	"GleCav/caverns-semi-flooded-path-sm.png", // Icon
	"A few earth mounds make the terrain fairly irregular here, both on ground and water. It is easy to find an intimate spot.", // Description
	[ new RoomConnection('unionLakeEast',2) ], // Connections
	function(characters) {
		var actions = [ createRestingActionStandard() ];
		return actions;
	}, // getActions
	[21,87]
);
setup.mapGleamingCaverns.unionLakeUpper = new RoomInfo(
	"unionLakeUpper", // Key
	"Caverns ~ Union Lake Upper Platform", // Title
	"GleCav/caverns-wild-path-r.png", // Med Icon
	"GleCav/caverns-wild-path-r-sm.png", // Icon
	"After climbing a somewhat laborious path, you find yourself atop a high platform, giving you a great view of the lake.", // Description
	[ new RoomConnection('unionLakeEast',4) ], // Connections
	function(characters) {
		var actions = [ createRestingActionStandard(),
						createCheapWaitingActionCaverns() ];
		
		// Voyeurism map scene
			// Dice
		var baseChance = gCstat(characters[0],"perception") * 2 + gCstat(characters[0],"luck");
		var dice200 = limitedRandomInt(200);
		var difficulty = 100;
			// Settings
		if ( State.variables.mapGleamingCaverns.voyeurRerollCounter == undefined || State.variables.mapGleamingCaverns.voyeurRerollCounter != State.variables.daycycle.minutes ) {
			State.variables.mapGleamingCaverns.voyeurRerollCounter = State.variables.daycycle.minutes;
			State.variables.mapGleamingCaverns.femCharA = true;
			State.variables.mapGleamingCaverns.femCharB = true;
			State.variables.mapGleamingCaverns.egaScene = true;
			if ( gSettings().lewdMales == "enable" ) {
				if ( limitedRandomInt(100) < 30 ) {
					State.variables.mapGleamingCaverns.femCharA = false;
				}
				if ( limitedRandomInt(100) < 30 ) {
					State.variables.mapGleamingCaverns.femCharB = false;
				}
			}
			if ( ( limitedRandomInt(100) < 35 ) ) {
				State.variables.mapGleamingCaverns.egaScene = false;
			}
		}
		var voyeurAction = createGleamingCavernsVoyeurAction(State.variables.mapGleamingCaverns.femCharA,State.variables.mapGleamingCaverns.femCharB,State.variables.mapGleamingCaverns.egaScene,characters);
		if ( (baseChance + dice200) >= difficulty ) {
			if ( characters[0] == "chPlayerCharacter" ) {
				var sceneDesc = "";
				if ( State.variables.mapGleamingCaverns.femCharA && State.variables.mapGleamingCaverns.femCharB && State.variables.mapGleamingCaverns.egaScene ) {
					sceneDesc = "Two women, caressing each other.";
				} else if ( State.variables.mapGleamingCaverns.egaScene && ( State.variables.mapGleamingCaverns.femCharA || State.variables.mapGleamingCaverns.femCharB ) ) {
					sceneDesc = "A man and a woman, meeting each other.";
				} else if ( State.variables.mapGleamingCaverns.femCharA && State.variables.mapGleamingCaverns.femCharB ) {
					sceneDesc = "Two women, one mounting the other.";
				} else if ( State.variables.mapGleamingCaverns.egaScene && State.variables.mapGleamingCaverns.femCharA == false && State.variables.mapGleamingCaverns.femCharB == false ) {
					sceneDesc = "Two men, seeking each other's touch.";
				} else if ( State.variables.mapGleamingCaverns.femCharA == false && State.variables.mapGleamingCaverns.femCharB == false ) {
					sceneDesc = "Two men, one above the other.";
				} else if ( State.variables.mapGleamingCaverns.egaScene == false && State.variables.mapGleamingCaverns.femCharA ) {
					sceneDesc = "A woman, mounting a man.";
				} else {
					sceneDesc = "A man, mounting a woman.";
				}
				State.variables.compass.setMapActionsMessage("You spot a couple of shapes down below... " + sceneDesc + " " + colorText("Check PASSED","green") + ": Stats (" + baseChance.toFixed(1) + ")" + hoverText("^^(?)^^","Agility * 2 + + Luck") + " + Dice 200 (" + dice200 + ") < Difficulty (" + difficulty + ")");
			}
		} else {
			voyeurAction.requirements = function(cG) { return false; }
			if ( characters[0] == "chPlayerCharacter" ) {
				State.variables.compass.setMapActionsMessage("The caverns look lonely... " + colorText("Check FAILED","red") + ": Stats (" + baseChance.toFixed(1) + ")" + hoverText("^^(?)^^","Agility * 2 + + Luck") + " + Dice 200 (" + dice200 + ") < Difficulty (" + difficulty + ")");
			}
		}
		actions.push(voyeurAction);
		
		
		return actions;
	}, // getActions
	[37,58]
);

	// Tribe
setup.mapGleamingCaverns.mainStreet1 = new RoomInfo(
	"mainStreet1", // Key
	"Shapeshifters ~ Western Main Street", // Title
	"GleCav/town-common-street-ext.png", // Med Icon
	"GleCav/town-common-street-ext-sm.png", // Icon
	"The Shapeshifter tribe appears before your eyes. You see clay huts in all directions, divided by a large main street that continues until the end of the village.", // Description
	[ new RoomConnection('mainStreet2',2),
		new RoomConnection('cavernMP1',2),
		new RoomConnection('workshop',2),
		new RoomConnection('frozenBaths',2) ], // Connections
	null, // getActions
	[95,126]
);
setup.mapGleamingCaverns.workshop = new RoomInfo(
	"workshop", // Key
	"Shapeshifters ~ Workshops", // Title
	"GleCav/town-workshop.png", // Med Icon
	"GleCav/town-workshop-sm.png", // Icon
	"There are several workshops in this area, well equipped with tools and furnaces to craft ceramics, glass and ornaments.", // Description
	[ new RoomConnection('mainStreet1',2),
		new RoomConnection('houses',1),
		new RoomConnection('mainStreet2',2) ], // Connections
	function(characters) {
		var actions = [ createWorkshopCraftingAction(),
						createWorkshopPaintingAction() ];
		if ( isStVarOn("dldCrf") == true && isStVarOn("dldPly") == false && characters[0] == "chPlayerCharacter" ) {
			actions.push(createGleamingCavernsDildoPlayAction());
		}
		return actions;
	}, // getActions
	[115,96]
);
setup.mapGleamingCaverns.houses = new RoomInfo(
	"houses", // Key
	"Shapeshifters ~ Houses", // Title
	"GleCav/town-lonely-house.png", // Med Icon
	"GleCav/town-lonely-house-sm.png", // Icon
	"A few lone houses have been erected in this corner of the village.", // Description
	[ new RoomConnection('workshop',1),
		new RoomConnection('thermalBaths',1),
		new RoomConnection('mainStreet2',2) ], // Connections
	null, // getActions
	[145,91]
);
setup.mapGleamingCaverns.thermalBaths = new RoomInfo(
	"thermalBaths", // Key
	"Shapeshifters ~ Thermal Baths", // Title
	"GleCav/town-bath.png", // Med Icon
	"GleCav/town-bath-sm.png", // Icon
	"Underground heat reaches the water of this bath, making it great to discharge the pressure of tense muscles.", // Description
	[ new RoomConnection('houses',1),
		new RoomConnection('mainStreet2',1),
		new RoomConnection('mainStreet3',1) ], // Connections
	function(characters) {
		var actions = [ createHeatedBathAction(),
						createRestingActionStandard() ];
		return actions;
	}, // getActions
	[181,91]
);

setup.mapGleamingCaverns.mainStreet2 = new RoomInfo(
	"mainStreet2", // Key
	"Shapeshifters ~ Central Main Street", // Title
	"GleCav/town-main-street.png", // Med Icon
	"GleCav/town-main-street-sm.png", // Icon
	"Beautiful tiles embellish the floor, their paintings illustrating various stories. One of them shows a giant Goddess embracing the Leirien, the Aiishen, and the Shapeshifters. A different one shows dozens of Shapeshifters entering the Caverns.", // Description
	[ new RoomConnection('mainStreet1',2),
		new RoomConnection('workshop',2),
		new RoomConnection('houses',2),
		new RoomConnection('thermalBaths',2),
		new RoomConnection('mainStreet3',2),
		new RoomConnection('frozenBaths',2),
		new RoomConnection('publicBaths',2),
		new RoomConnection('templeShrine',2) ], // Connections
	null, // getActions
	[149,130]
);

// Conditions: Drishtya and the judges have concluded their reunion
window.isJudgesReunionFinishedFA = function() {
	if ( State.variables.daycycle.month != 1 || State.variables.daycycle.day != 29 || State.variables.daycycle.hours > 15 ) {
		return true;
	} else {
		return false;
	}
}
setup.mapGleamingCaverns.mainStreet3 = new RoomInfo(
	"mainStreet3", // Key
	"Shapeshifters ~ Eastern Main Street", // Title
	"GleCav/town-common-street-ext-r.png", // Med Icon
	"GleCav/town-common-street-ext-r-sm.png", // Icon
	"At the end of the main street, you find the entrance to the amphitheater.", // Description
	[ new RoomConnection('mainStreet2',2),
		new RoomConnection('thermalBaths',2),
		new RoomConnection('assembly',2),
		new RoomConnection('publicBaths',2) ], // Connections
	null, // getActions
	[201,132]
);
setup.mapGleamingCaverns.mainStreet3.getConnections = function(characters) {
	var rooms = [this.connections[0],this.connections[1]];
	if ( isJudgesReunionFinishedFA() ) {
		rooms.push(this.connections[2]);
	}
	rooms.push(this.connections[3]);
	return rooms;
}
setup.mapGleamingCaverns.mainStreet3.displayConnections = function() {
	var string = getLinkToRoom(this.connections[0].loc,"Go to " + getCurrentMap().rooms[this.connections[0].loc].title,this.connections[0].distance)
			    + " (" + colorText(2,"khaki") + ") " + displayCharIconsInRoom(this.connections[0].loc) + "\n";
	string += getLinkToRoom(this.connections[1].loc,"Go to " + getCurrentMap().rooms[this.connections[1].loc].title,this.connections[1].distance)
			    + " (" + colorText(2,"khaki") + ") " + displayCharIconsInRoom(this.connections[1].loc) + "\n";
	if ( isJudgesReunionFinishedFA() ) {
		string += getLinkToRoom(this.connections[2].loc,"Go to " + getCurrentMap().rooms[this.connections[2].loc].title,this.connections[2].distance)
			    + " (" + colorText(2,"khaki") + ") " + displayCharIconsInRoom(this.connections[2].loc) + "\n";
	} else {
		string += colorText("Drishtya and the Shapeshifter judges are discussing in private. Try coming back later.\n","red");
	}
	string += getLinkToRoom(this.connections[3].loc,"Go to " + getCurrentMap().rooms[this.connections[3].loc].title,this.connections[3].distance)
			    + " (" + colorText(2,"khaki") + ") " + displayCharIconsInRoom(this.connections[3].loc) + "\n";
	return string;
}

setup.mapGleamingCaverns.assembly = new RoomInfo(
	"assembly", // Key
	"Shapeshifters ~ Assembly", // Title
	"GleCav/town-assembly.png", // Med Icon
	"GleCav/town-assembly-sm.png", // Icon
	"Stone mounds with the very rough form of hyperrectangles serve as seats, forming increasingly elevated semi-circles around a large, circular platform.", // Description
	[ new RoomConnection('mainStreet3',2),
		new RoomConnection('dressingRoom',1) ], // Connections
	function(characters) {
		var actions = [ createTheaterImprovisationAction() ];
		return actions;
	}, // getActions
	[242,136]
);
setup.mapGleamingCaverns.dressingRoom = new RoomInfo(
	"dressingRoom", // Key
	"Shapeshifters ~ Assembly's Dressing Room", // Title
	"GleCav/town-room-interior.png", // Med Icon
	"GleCav/town-room-interior-sm.png", // Icon
	"Plenty of dresses, attires and ornaments are to be found here, to be used by performers on a daily basis.", // Description
	[ new RoomConnection('assembly',1) ], // Connections
	null, // getActions
	[257,105]
);

setup.mapGleamingCaverns.frozenBaths = new RoomInfo(
	"frozenBaths", // Key
	"Shapeshifters ~ Frozen Baths", // Title
	"GleCav/town-bath.png", // Med Icon
	"GleCav/town-bath-sm.png", // Icon
	"The water here seeps to the last nook of your bones. If you're resilient enough to survive it, you will have proven the strength of your willpower.", // Description
	[ new RoomConnection('mainStreet1',2),
		new RoomConnection('mainStreet2',2),
		new RoomConnection('templeStorage',2),
		new RoomConnection('templeShrine',2) ], // Connections
	function(characters) {
		var actions = [ createFrozenBathAction(),
						createRestingActionStandard() ];
		return actions;
	}, // getActions
	[101,155]
);
setup.mapGleamingCaverns.publicBaths = new RoomInfo(
	"publicBaths", // Key
	"Shapeshifters ~ Public Baths", // Title
	"GleCav/town-bath.png", // Med Icon
	"GleCav/town-bath-sm.png", // Icon
	"Enclosed by no walls or curtains, this bath is open to everyone's eyesight, and so are the bodies of those who enter it.", // Description
	[ new RoomConnection('mainStreet2',2),
		new RoomConnection('mainStreet3',2),
		new RoomConnection('templeShrine',2) ], // Connections
	function(characters) {
		var actions = [ createPublicBathAction(),
						createRestingActionStandard() ];
		return actions;
	}, // getActions
	[189,164]
);
setup.mapGleamingCaverns.templeStorage = new RoomInfo(
	"templeStorage", // Key
	"Shapeshifters ~ Temple Storage", // Title
	"GleCav/town-room-interior.png", // Med Icon
	"GleCav/town-room-interior-sm.png", // Icon
	"Among rooms dedicated to store salfis flowers and other supplies used by the Temple, some rooms have been prepared to accommodate the Candidates.", // Description
	[ new RoomConnection('frozenBaths',2),
		new RoomConnection('templeShrine',2) ], // Connections
	function(characters) {
		var actions = [ createRestingActionStandard() ];
		if ( isJudgesReunionFinishedFA() ) {
			actions.push(createGleamingCavernsDrishtyaConv());
		}
		return actions;
	}, // getActions
	[107,199]
);
setup.mapGleamingCaverns.templeStorage.getDescription = function() {
	var dText = "Among rooms dedicated to store salfis flowers and other supplies used by the Temple, some rooms have been prepared to accommodate the Candidates.";
	if ( isJudgesReunionFinishedFA() ) {
		dText += "\nDrishtya and Melesh spend most of the day here, often attending to different members of their tribe on various issues.";
	}
	return dText;
}

setup.mapGleamingCaverns.templeShrine = new RoomInfo(
	"templeShrine", // Key
	"Shapeshifters ~ Temple of Harmony", // Title
	"GleCav/town-harmony-temple.png", // Med Icon
	"GleCav/town-harmony-temple-sm.png", // Icon
	"A large dome houses a marble statue of the Goddess, surrounded by carved figures of the praying faithful.", // Description
	[ new RoomConnection('mainStreet2',2),
		new RoomConnection('frozenBaths',2),
		new RoomConnection('publicBaths',2),
		new RoomConnection('templeStorage',2)
//		,new RoomConnection('templeSanctum',1)
		], // Connections
	function(characters) {
		var actions = [];
		var nersmiasIsBusy = false;
		for ( var ev of State.variables.compass.ongoingEvents ) {
			if ( ev.title == "npcNerConv" || ev.title == "nersmiasFASEconv" ) {
				nersmiasIsBusy = true;
			}
		}
		if ( isJudgesReunionFinishedFA() && isStVarOn("neSBin") == false && characters.includes("chPlayerCharacter") && nersmiasIsBusy == false ) {
			actions.push(createGleamingCavernsNersmiasConv());
		} else if ( characters.includes("chPlayerCharacter") == false && isJudgesReunionFinishedFA() && gC(characters[0]).hasOwnProperty("flagSpokeWithNersmias") == false && nersmiasIsBusy == false ) {
			actions.push(createGleamingCavernsNPCNersmiasConv());
		}
		return actions;
	}, // getActions
	[147,196]
);
setup.mapGleamingCaverns.templeShrine.displayConnections = function() {
	var string = "";
	for ( var connection of this.connections ) {
		string += getLinkToRoom(connection.loc,"Go to " + getCurrentMap().rooms[connection.loc].title,connection.distance)
			    + " (" + colorText(connection.distance,"khaki") + ") ";
				if ( State.variables.chPlayerCharacter.hasFreeBodypart("eyes") ) {
					string += displayCharIconsInRoom(connection.loc);
				}
		string += "\n";
	}
		// Temple Sanctum
	if ( isStVarOn("alwSct") ) {
		string += getLinkToRoom("templeSanctum","Go to " + getCurrentMap().rooms["templeSanctum"].title,2)
			    + " (" + colorText(2,"khaki") + ") " + displayCharIconsInRoom("templeSanctum") + "\n";
	} else {
		if ( getRoomA("templeShrine").characters.includes("chNer") ) {
			string += colorText("Nersmias blocks the entrance to the Temple Sanctum.\n","red");
		} else {
			string += colorText("The doors to the Temple Sanctum won't budge.\n","red");
		}
	}
	
	return string;
}

setup.mapGleamingCaverns.templeSanctum = new RoomInfo(
	"templeSanctum", // Key
	"Shapeshifters ~ Temple's Sanctum", // Title
	"GleCav/town-room-interior.png", // Med Icon
	"GleCav/town-room-interior-sm.png", // Icon
	"One large corridor separates columns of pews that look towards a small shrine. Behind it, you can find the doors to a few small rooms.", // Description
	[ new RoomConnection('templeShrine',1) ], // Connections
	null, // getActions
	[186,201]
);

	// Deeper Tunnels
setup.mapGleamingCaverns.wildTunnel1 = new RoomInfo(
	"wildTunnel1", // Key
	"Wild Tunnels ~ Tunnel 1", // Title
	"GleCav/caverns-wild-path.png", // Med Icon
	"GleCav/caverns-wild-path-sm.png", // Icon
	"", // Description
	[ new RoomConnection('labyrinthEntrance',2) ], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel3","Section 3",0,2),
						createActionMovingWildTunnel("wildTunnel4","Section 4",0,2) ];
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel2 = new RoomInfo(
	"wildTunnel2", // Key
	"Wild Tunnels ~ Tunnel 2", // Title
	"GleCav/caverns-wild-path.png", // Med Icon
	"GleCav/caverns-wild-path-sm.png", // Icon
	"", // Description
	[ new RoomConnection('labyrinthEntrance',2) ], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel4","Section 4",0,2),
						createActionMovingWildTunnel("wildTunnel5","Section 5",0,2)	];
			// Path to Tunnel 6
			var baseChance = gCstat(characters[0],"perception") + gCstat(characters[0],"agility") + gCstat(characters[0],"resilience") + gCstat(characters[0],"will") + gCstat(characters[0],"luck");
			var dice200 = limitedRandomInt(200);
			var difficulty = 100;
			var act0 = createActionMovingWildTunnel("wildTunnel6","Section 6",0,2);
			if ( (baseChance + dice200) >= difficulty ) {
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Section 6: " + colorText("Check PASSED","green") + ": Stats (" + baseChance.toFixed(1) + ") " + hoverText("(?)","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") => Difficulty (" + difficulty + ")");
				}
			} else {
				act0.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Section 6: " + colorText("Check FAILED","red") + ": Stats (" + baseChance.toFixed(1) + ")" + hoverText("^^(?)^^","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") < Difficulty (" + difficulty + ")");
				}
			}
			actions.push(act0);
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel3 = new RoomInfo(
	"wildTunnel3", // Key
	"Wild Tunnels ~ Tunnel 3", // Title
	"GleCav/caverns-semi-flooded-path.png", // Med Icon
	"GleCav/caverns-semi-flooded-path-sm.png", // Icon
	"", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel2","Section 2",0,2) ];
			// Path to Tunnel 9
			var baseChance = gCstat(characters[0],"perception") + gCstat(characters[0],"agility") + gCstat(characters[0],"resilience") + gCstat(characters[0],"will") + gCstat(characters[0],"luck");
			var dice200 = limitedRandomInt(200);
			var difficulty = 130;
			var act0 = createActionMovingWildTunnel("wildTunnel9","Section 9",0,2);
			if ( (baseChance + dice200) >= difficulty ) {
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Section 9: " + colorText("Check PASSED","green") + ": Stats (" + baseChance.toFixed(1) + ") " + hoverText("(?)","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") => Difficulty (" + difficulty + ")");
				}
			} else {
				act0.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Section 9: " + colorText("Check FAILED","red") + ": Stats (" + baseChance.toFixed(1) + ")" + hoverText("^^(?)^^","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") < Difficulty (" + difficulty + ")");
				}
			}
			actions.push(act0);
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel4 = new RoomInfo(
	"wildTunnel4", // Key
	"Wild Tunnels ~ Tunnel 4", // Title
	"GleCav/caverns-wild-path-r.png", // Med Icon
	"GleCav/caverns-wild-path-r-sm.png", // Icon
	"", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel3","Section 3",5,2),
						createActionMovingWildTunnel("wildTunnel6","Section 6",0,2) ];
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel5 = new RoomInfo(
	"wildTunnel5", // Key
	"Wild Tunnels ~ Tunnel 5", // Title
	"GleCav/caverns-semi-flooded-path-r.png", // Med Icon
	"GleCav/caverns-semi-flooded-path-r-sm.png", // Icon
	"", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel7","Section 7",5,2) ];
			// Path to Tunnel 9
			var baseChance = gCstat(characters[0],"perception") + gCstat(characters[0],"agility") + gCstat(characters[0],"resilience") + gCstat(characters[0],"will") + gCstat(characters[0],"luck");
			var dice200 = limitedRandomInt(200);
			var difficulty = 130;
			var act0 = createActionMovingWildTunnel("wildTunnel9","Section 9",0,2);
			if ( (baseChance + dice200) >= difficulty ) {
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Section 9: " + colorText("Check PASSED","green") + ": Stats (" + baseChance.toFixed(1) + ") " + hoverText("(?)","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") => Difficulty (" + difficulty + ")");
				}
			} else {
				act0.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Section 9: " + colorText("Check FAILED","red") + ": Stats (" + baseChance.toFixed(1) + ")" + hoverText("^^(?)^^","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") < Difficulty (" + difficulty + ")");
				}
			}
			actions.push(act0);
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel6 = new RoomInfo(
	"wildTunnel6", // Key
	"Wild Tunnels ~ Tunnel 6", // Title
	"GleCav/caverns-wild-path.png", // Med Icon
	"GleCav/caverns-wild-path-sm.png", // Icon
	"", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel8","Section 8",0,2),
						createActionMovingWildTunnel("wildTunnel9","Section 9",10,2) ];
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel7 = new RoomInfo(
	"wildTunnel7", // Key
	"Wild Tunnels ~ Tunnel 7", // Title
	"GleCav/caverns-flooded-path.png", // Med Icon
	"GleCav/caverns-flooded-path-sm.png", // Icon
	"", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel10","Section 10",0,2) ];
			// Path to Tunnel 11
			var baseChance = gCstat(characters[0],"perception") + gCstat(characters[0],"agility") + gCstat(characters[0],"resilience") + gCstat(characters[0],"will") + gCstat(characters[0],"luck");
			var dice200 = limitedRandomInt(200);
			var difficulty = 250;
			var act0 = createActionMovingWildTunnel("wildTunnel11","Section 11",10,2);
			if ( (baseChance + dice200) >= difficulty ) {
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Section 11: " + colorText("Check PASSED","green") + ": Stats (" + baseChance.toFixed(1) + ") " + hoverText("(?)","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") => Difficulty (" + difficulty + ")");
				}
			} else {
				act0.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Section 11: " + colorText("Check FAILED","red") + ": Stats (" + baseChance.toFixed(1) + ")" + hoverText("^^(?)^^","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") < Difficulty (" + difficulty + ")");
				}
			}
			actions.push(act0);
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel8 = new RoomInfo(
	"wildTunnel8", // Key
	"Wild Tunnels ~ Tunnel 8", // Title
	"GleCav/caverns-wild-path.png", // Med Icon
	"GleCav/caverns-wild-path-sm.png", // Icon
	"It's possible to climb a few ledges to reach a platform further above.", // Description
	[ ], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("mountainsExit","Exit to Mountains",10,2),
						createActionMovingWildTunnel("wildTunnel7","Section 7",0,2) ];
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel9 = new RoomInfo(
	"wildTunnel9", // Key
	"Wild Tunnels ~ Tunnel 9", // Title
	"GleCav/caverns-wild-path-r.png", // Med Icon
	"GleCav/caverns-wild-path-r-sm.png", // Icon
	"", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel12","Section 12",5,2),
						createActionMovingWildTunnel("wildTunnel13","Section 13",0,2) ];
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel10 = new RoomInfo(
	"wildTunnel10", // Key
	"Wild Tunnels ~ Tunnel 10", // Title
	"GleCav/caverns-semi-flooded-path-r.png", // Med Icon
	"GleCav/caverns-semi-flooded-path-r-sm.png", // Icon
	"", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel9","Section 9",5,2) ];
			// Path to Tunnel 11
			var baseChance = gCstat(characters[0],"perception") + gCstat(characters[0],"agility") + gCstat(characters[0],"resilience") + gCstat(characters[0],"will") + gCstat(characters[0],"luck");
			var dice200 = limitedRandomInt(200);
			var difficulty = 225;
			var act0 = createActionMovingWildTunnel("wildTunnel11","Section 11",0,2);
			if ( (baseChance + dice200) >= difficulty ) {
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Section 11: " + colorText("Check PASSED","green") + ": Stats (" + baseChance.toFixed(1) + ") " + hoverText("(?)","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") => Difficulty (" + difficulty + ")");
				}
			} else {
				act0.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Section 11: " + colorText("Check FAILED","red") + ": Stats (" + baseChance.toFixed(1) + ")" + hoverText("^^(?)^^","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") < Difficulty (" + difficulty + ")");
				}
			}
			actions.push(act0);
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel11 = new RoomInfo(
	"wildTunnel11", // Key
	"Wild Tunnels ~ Tunnel 11", // Title
	"GleCav/caverns-wild-path.png", // Med Icon
	"GleCav/caverns-wild-path-sm.png", // Icon
	"You spot a very tight tunnel at the bottom of the river. A well-trained, disciplined person would be able to fit through if they waited long enough for the natural transformations of the Caverns to widen the gap.", // Description
	[], // Connections
	function(characters) {
		var actions = [ createWaitingActionCaverns(),
						createActionMovingWildTunnel("wildTunnel1","Section 1",0,2) ];
			// Path to Pond of Illumination
			var baseChance = gCstat(characters[0],"perception") + gCstat(characters[0],"agility") + gCstat(characters[0],"resilience") + gCstat(characters[0],"will") + gCstat(characters[0],"luck");
			var dice200 = limitedRandomInt(200);
			var difficulty = 250;
			var act0 = createActionMovingWildTunnel("pondIllumination","Tight tunnel",0,2);
			if ( (baseChance + dice200) >= difficulty ) {
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to tight tunnel: " + colorText("Check PASSED","green") + ": Stats (" + baseChance.toFixed(1) + ") " + hoverText("(?)","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") => Difficulty (" + difficulty + ")");
				}
			} else {
				act0.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to tight tunnel: " + colorText("Check FAILED","red") + ": Stats (" + baseChance.toFixed(1) + ")" + hoverText("^^(?)^^","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") < Difficulty (" + difficulty + ")");
				}
			}
			actions.push(act0);
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel12 = new RoomInfo(
	"wildTunnel12", // Key
	"Wild Tunnels ~ Tunnel 12", // Title
	"GleCav/caverns-semi-flooded-path.png", // Med Icon
	"GleCav/caverns-semi-flooded-path-sm.png", // Icon
	"", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel2","Section 2",0,2) ];
			// Path to Tunnel 17
			var baseChance = gCstat(characters[0],"perception") + gCstat(characters[0],"agility") + gCstat(characters[0],"resilience") + gCstat(characters[0],"will") + gCstat(characters[0],"luck");
			var dice200 = limitedRandomInt(200);
			var difficulty = 115;
			var act0 = createActionMovingWildTunnel("wildTunnel17","Section 17",0,2);
			if ( (baseChance + dice200) >= difficulty ) {
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Section 17: " + colorText("Check PASSED","green") + ": Stats (" + baseChance.toFixed(1) + ") " + hoverText("(?)","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") => Difficulty (" + difficulty + ")");
				}
			} else {
				act0.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Section 17: " + colorText("Check FAILED","red") + ": Stats (" + baseChance.toFixed(1) + ")" + hoverText("^^(?)^^","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") < Difficulty (" + difficulty + ")");
				}
			}
			actions.push(act0);
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel13 = new RoomInfo(
	"wildTunnel13", // Key
	"Wild Tunnels ~ Tunnel 13", // Title
	"GleCav/caverns-semi-flooded-path-r.png", // Med Icon
	"GleCav/caverns-semi-flooded-path-r-sm.png", // Icon
	"", // Description
	[], // Connections
	function(characters) {
		var actions = [  ];
			var dice100 = limitedRandomInt(100);
			// Path to Tunnels 14 / 17
			var act0 = createActionMovingWildTunnel("wildTunnel14","Section 14",0,2);
			var act1 = createActionMovingWildTunnel("wildTunnel17","Section 17",0,2)
			if ( dice100 < 50 ) {
				act1.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("The river current allows access to Section 14: Dice 100 (" + dice100 + ") < 50, access to Section 17 is blocked.");
				}
			} else {
				act0.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("The river current allows access to Section 17: Dice 100 (" + dice100 + ") >= 50, access to Section 14 is blocked.");
				}
			}
			actions.push(act0);
			actions.push(act1);
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel14 = new RoomInfo(
	"wildTunnel14", // Key
	"Wild Tunnels ~ Tunnel 14", // Title
	"GleCav/caverns-wild-path.png", // Med Icon
	"GleCav/caverns-wild-path-sm.png", // Icon
	"Gentle stairs of naturally formed slabs give you access to wildly different directions through the Caverns.", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel11","Section 11",0,2),
						createActionMovingWildTunnel("wildTunnel15","Section 15",0,2),
						createActionMovingWildTunnel("wildTunnel18","Section 18",5,2) ];
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel15 = new RoomInfo(
	"wildTunnel15", // Key
	"Wild Tunnels ~ Tunnel 15", // Title
	"GleCav/caverns-semi-flooded-path.png", // Med Icon
	"GleCav/caverns-semi-flooded-path-sm.png", // Icon
	"", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel16","Section 16",0,2),
						createActionMovingWildTunnel("wildTunnel19","Section 19",5,2) ];
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel16 = new RoomInfo(
	"wildTunnel16", // Key
	"Wild Tunnels ~ Tunnel 16", // Title
	"GleCav/caverns-semi-flooded-path-r.png", // Med Icon
	"GleCav/caverns-semi-flooded-path-r-sm.png", // Icon
	"Up above the river there's a tunnel fairly hard to reach. An agile enough person could make the climb if the river was high enough.", // Description
	// [ new RoomConnection('pondIllumination',10) ], // Fake connections, used to debug hypnosis to Valtan
	[], // Connections
	function(characters) {
		var actions = [ createWaitingActionCaverns(),
						createActionMovingWildTunnel("wildTunnel4","Section 4",0,2),
						createActionMovingWildTunnel("wildTunnel23","Section 23",5,2) ];
			// Path to Pond of Illumination
			var baseChance = gCstat(characters[0],"perception") + gCstat(characters[0],"agility") + gCstat(characters[0],"resilience") + gCstat(characters[0],"will") + gCstat(characters[0],"luck");
			var dice200 = limitedRandomInt(200);
			var difficulty = 220;
			var act0 = createActionMovingWildTunnel("pondIllumination","Tight tunnel",0,2);
			if ( (baseChance + dice200) >= difficulty ) {
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to tight tunnel: " + colorText("Check PASSED","green") + ": Stats (" + baseChance.toFixed(1) + ") " + hoverText("(?)","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") => Difficulty (" + difficulty + ")");
				}
			} else {
				act0.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to tight tunnel: " + colorText("Check FAILED","red") + ": Stats (" + baseChance.toFixed(1) + ")" + hoverText("^^(?)^^","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") < Difficulty (" + difficulty + ")");
				}
			}
			actions.push(act0);
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel17 = new RoomInfo(
	"wildTunnel17", // Key
	"Wild Tunnels ~ Tunnel 17", // Title
	"GleCav/caverns-wild-path-r.png", // Med Icon
	"GleCav/caverns-wild-path-r-sm.png", // Icon
	"", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel18","Section 18",0,2),
						createActionMovingWildTunnel("wildTunnel20","Section 20",0,2) ];
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel18 = new RoomInfo(
	"wildTunnel18", // Key
	"Wild Tunnels ~ Tunnel 18", // Title
	"GleCav/caverns-wild-path-r.png", // Med Icon
	"GleCav/caverns-wild-path-r-sm.png", // Icon
	"", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel19","Section 19",0,2),
						createActionMovingWildTunnel("wildTunnel21","Section 21",0,2) ];
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel19 = new RoomInfo(
	"wildTunnel19", // Key
	"Wild Tunnels ~ Tunnel 19", // Title
	"GleCav/caverns-flooded-path.png", // Med Icon
	"GleCav/caverns-flooded-path-sm.png", // Icon
	"", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel21","Section 21",0,2) ];
			// Path to Tunnels 22 / 23
			var dice100 = limitedRandomInt(100);
			var act0 = createActionMovingWildTunnel("wildTunnel22","Section 22",5,2);
			var act1 = createActionMovingWildTunnel("wildTunnel23","Section 23",5,2);
			if ( dice100 < 50 ) {
				act1.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("The river current allows access to Section 22: Dice 100 (" + dice100 + ") < 50, access to Section 23 is blocked.");
				}
			} else {
				act0.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("The river current allows access to Section 23: Dice 100 (" + dice100 + ") >= 50, access to Section 22 is blocked.");
				}
			}
			actions.push(act0);
			actions.push(act1);
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel20 = new RoomInfo(
	"wildTunnel20", // Key
	"Wild Tunnels ~ Tunnel 20", // Title
	"GleCav/caverns-semi-flooded-path-r.png", // Med Icon
	"GleCav/caverns-semi-flooded-path-r-sm.png", // Icon
	"", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel1","Section 1",0,2) ];
			// Path to Tunnel 21
			var baseChance = gCstat(characters[0],"perception") + gCstat(characters[0],"agility") + gCstat(characters[0],"resilience") + gCstat(characters[0],"will") + gCstat(characters[0],"luck");
			var dice200 = limitedRandomInt(200);
			var difficulty = 135;
			var act0 = createActionMovingWildTunnel("wildTunnel21","Section 21",0,2);
			if ( (baseChance + dice200) >= difficulty ) {
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Section 21: " + colorText("Check PASSED","green") + ": Stats (" + baseChance.toFixed(1) + ") " + hoverText("(?)","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") => Difficulty (" + difficulty + ")");
				}
			} else {
				act0.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Section 21: " + colorText("Check FAILED","red") + ": Stats (" + baseChance.toFixed(1) + ")" + hoverText("^^(?)^^","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") < Difficulty (" + difficulty + ")");
				}
			}
			actions.push(act0);
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel21 = new RoomInfo(
	"wildTunnel21", // Key
	"Wild Tunnels ~ Tunnel 21", // Title
	"GleCav/caverns-semi-flooded-path.png", // Med Icon
	"GleCav/caverns-semi-flooded-path-sm.png", // Icon
	"", // Description
	[], // Connections
	function(characters) {
		var actions = [ createWaitingActionCaverns(),
						createActionMovingWildTunnel("wildTunnel3","Section 3",0,2) ];
			// Path to Tunnel 22
			var baseChance = gCstat(characters[0],"perception") + gCstat(characters[0],"agility") + gCstat(characters[0],"resilience") + gCstat(characters[0],"will") + gCstat(characters[0],"luck");
			var dice200 = limitedRandomInt(200);
			var difficulty = 185;
			var act0 = createActionMovingWildTunnel("wildTunnel22","Section 22",0,2);
			if ( (baseChance + dice200) >= difficulty ) {
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Section 22: " + colorText("Check PASSED","green") + ": Stats (" + baseChance.toFixed(1) + ") " + hoverText("(?)","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") => Difficulty (" + difficulty + ")");
				}
			} else {
				act0.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Section 22: " + colorText("Check FAILED","red") + ": Stats (" + baseChance.toFixed(1) + ")" + hoverText("^^(?)^^","Agility + Resilience + Will + Perception + Luck") + " + Dice 200 (" + dice200 + ") < Difficulty (" + difficulty + ")");
				}
			}
			actions.push(act0);
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel22 = new RoomInfo(
	"wildTunnel22", // Key
	"Wild Tunnels ~ Tunnel 22", // Title
	"GleCav/caverns-flooded-path-r.png", // Med Icon
	"GleCav/caverns-flooded-path-r-sm.png", // Icon
	"The water becomes denser, heavier, and unbearable. Reaching the deepest corners of the Caverns will require skill, discipline and patience.", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel1","Section 1",0,2),
						createActionMovingWildTunnel("wildTunnel23","Section 23",5,2) ];
			// Path to Tortuous End
			var baseChance = gCstat(characters[0],"perception") + gCstat(characters[0],"agility") + gCstat(characters[0],"resilience") + gCstat(characters[0],"will") + gCstat(characters[0],"luck");
			var dice1000 = limitedRandomInt(1000);
			var difficulty = 1040;
			var act0 = createActionMovingWildTunnel("tortuousEnd","Unreachable Tunnel",0,2);
			if ( (baseChance + dice1000) >= difficulty ) {
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Unreachable Tunnel: " + colorText("Check PASSED","green") + ": Stats (" + baseChance.toFixed(1) + ") " + hoverText("(?)","Agility + Resilience + Will + Perception + Luck") + " + Dice 1000 (" + dice1000 + ") => Difficulty (" + difficulty + ")");
				}
			} else {
				act0.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Unreachable Tunnel: " + colorText("Check FAILED","red") + ": Stats (" + baseChance.toFixed(1) + ")" + hoverText("^^(?)^^","Agility + Resilience + Will + Perception + Luck") + " + Dice 1000 (" + dice1000 + ") < Difficulty (" + difficulty + ")");
				}
			}
			actions.push(act0);
		return actions;
	}, // getActions
	[166,32]
);
setup.mapGleamingCaverns.wildTunnel23 = new RoomInfo(
	"wildTunnel23", // Key
	"Wild Tunnels ~ Tunnel 23", // Title
	"GleCav/caverns-flooded-path-ext.png", // Med Icon
	"GleCav/caverns-flooded-path-ext-sm.png", // Icon
	"The water becomes denser, heavier, and unbearable. Reaching the deepest corners of the Caverns will require skill, discipline and patience.", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel22","Section 22",5,2) ];
			// Path to Tortuous End
			var baseChance = gCstat(characters[0],"perception") + gCstat(characters[0],"agility") + gCstat(characters[0],"resilience") + gCstat(characters[0],"will") + gCstat(characters[0],"luck");
			var dice1000 = limitedRandomInt(1000);
			var difficulty = 1040;
			var act0 = createActionMovingWildTunnel("tortuousEnd","Unreachable Tunnel",0,2);
			if ( (baseChance + dice1000) >= difficulty ) {
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Unreachable Tunnel: " + colorText("Check PASSED","green") + ": Stats (" + baseChance.toFixed(1) + ") " + hoverText("(?)","Agility + Resilience + Will + Perception + Luck") + " + Dice 1000 (" + dice1000 + ") => Difficulty (" + difficulty + ")");
				}
			} else {
				act0.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("Access to Unreachable Tunnel: " + colorText("Check FAILED","red") + ": Stats (" + baseChance.toFixed(1) + ")" + hoverText("^^(?)^^","Agility + Resilience + Will + Perception + Luck") + " + Dice 1000 (" + dice1000 + ") < Difficulty (" + difficulty + ")");
				}
			}
			actions.push(act0);
			// Path to Tunnels 2 / 7
			var act1 = createActionMovingWildTunnel("wildTunnel2","Section 2",0,2);
			var act2 = createActionMovingWildTunnel("wildTunnel7","Section 7",0,2);
			var dice100 = limitedRandomInt(100);
			if ( dice100 < 50 ) {
				act2.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("The river current allows access to Section 2: Dice 100 (" + dice100 + ") < 50, access to Section 7 is blocked.");
				}
			} else {
				act1.requirements = function(cG) { return false; }
				if ( characters[0] == "chPlayerCharacter" ) {
					State.variables.compass.setMapActionsMessage("The river current allows access to Section 7: Dice 100 (" + dice100 + ") >= 50, access to Section 2 is blocked.");
				}
			}
			actions.push(act1,act2);
		return actions;
	}, // getActions
	[166,32]
);

setup.mapGleamingCaverns.pondIllumination = new RoomInfo(
	"pondIllumination", // Key
	"Wild Tunnels ~ Pond of Illumination", // Title
	"GleCav/caverns-semi-flooded-path.png", // Med Icon
	"GleCav/caverns-semi-flooded-path-sm.png", // Icon
	"A spheric room appears before you after you fall through the tunnel. A fine line of water falls from the exact center of the ceiling, emitting a constant stream of white noise as it crashes against a small pond that forms an almost perfect circle. Outside this small refuge, the rest of the world might as well no longer exist.", // Description
	[ new RoomConnection('labyrinthEntrance',10) ], // Connections
	function(characters) {
		// isStVarOn("vlNoCv")
		var actions = [];
		if ( isStVarOn("vlNoCv") == false ) {
			actions.push(createGleamingCavernsValtanConv());
		}
		actions.push(createTrainingActionSecludedMeditation());
		actions.push(createRestingActionStandard());
		return actions;
	}, // getActions
	[170,53]
);
setup.mapGleamingCaverns.pondIllumination.getEventPrompt = function(characters) {
	// State.variables.StVars.check9 = isStVarOn("CaReVl");
	/*
	<<if $StVars.check9 is true>> \
<span style="color:green">Story check: passed.</span>
[[Why did you leave when we were carrying Glien?|FASE ValtanIllumination WhyDidYouLeave]]
[[You were telling me about the time you were trapped|FASE ValtanIllumination WhenTrapped]]
<</if>> \
*/
	var passageInit = "FASE ValtanIllumination InitAlt";
	if ( isStVarOn("CaReVl") == false ) {
		passageInit = "FASE ValtanIllumination Init";
	}
	if ( characters.includes("chPlayerCharacter") && isStVarOn("vlIlIn") == false ) {
		State.variables.compass.interludePassage = "You find a familiar face...\n\n"
			+ "<<l" + "ink [[Continue|" + passageInit + "]]>><<s" + "cript>>\n"
			+ "initValtanAtIlluminationPond();\n"
			+ "State.variables.compass.finishPlayerPrompt();\n"
			+ "addToStVarsList('vlIlIn');\n"
			+ "<</s" + "cript>><</l" + "ink>>";
		State.variables.compass.setPlayerPrompt(State.variables.compass.interludePassage,"chPlayerCharacter",false);
	}
	// No need to initiate an event. An event might break the event chain.
	//State.variables.compass.ongoingEvents.push(createSystemEventSecludedMeditation(60,characters));
	//State.variables.compass.sortOnGoingEventsByTime();
}

setup.mapGleamingCaverns.mountainsExit = new RoomInfo(
	"mountainsExit", // Key
	"Wild Tunnels ~ Exit to Mountains", // Title
	"GleCav/cavern-entrance-rev.png", // Med Icon
	"GleCav/cavern-entrance-rev-sm.png", // Icon
	"", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel2","Section 2",0,10) ];
		return actions;
	}, // getActions
	[246,4]
);
setup.mapGleamingCaverns.tortuousEnd = new RoomInfo(
	"tortuousEnd", // Key
	"Wild Tunnels ~ Tortuous End", // Title
	"GleCav/caverns-flooded-path-r-ext.png", // Med Icon
	"GleCav/caverns-flooded-path-r-ext-sm.png", // Icon
	"The light is as dim as it gets. Darkness becomes all-envolving at times.", // Description
	[], // Connections
	function(characters) {
		var actions = [ createActionMovingWildTunnel("wildTunnel22","Section 22",0,2),
						createActionMovingWildTunnel("wildTunnel23","Section 23",0,2) ];
		return actions;
	}, // getActions
	[258,45]
);
setup.mapGleamingCaverns.tortuousEnd.getEventPrompt = function(characters) {
	if ( characters.includes("chPlayerCharacter") && isStVarOn("CaRePl") == false && isStVarOn("CaReVl") == false ) {
		initFaSeCavernsRescue();
		State.variables.compass.interludePassage = "<<l" + "ink [[Continue|FASE CaRe Init1]]>><<s" + "cript>>\n"
			+ "State.variables.compass.finishPlayerPrompt();\n"
			+ "<</s" + "cript>><</l" + "ink>>";
		State.variables.compass.setPlayerPrompt(State.variables.compass.interludePassage,"chPlayerCharacter",false);
	}
}

// Functions

window.initMapGleamingCaverns = function() {
	State.variables.mapGleamingCaverns = new Chart("mapGleamingCaverns","Gleaming Caverns");
	State.variables.mapGleamingCaverns.diagramDimensions = [301,209];
	State.variables.mapGleamingCaverns.icon = "marsh-map.png";
	State.variables.mapGleamingCaverns.subarea = "marsh";

	State.variables.mapGleamingCaverns.autogenerateRooms("mapGleamingCaverns");
}
window.setSubareaMarsh = function() {
	State.variables.mapGleamingCaverns.diagramDimensions = [301,209];
	State.variables.mapGleamingCaverns.icon = "marsh-map.png";
	State.variables.mapGleamingCaverns.subarea = "marsh";
}
window.setSubareaCaverns = function() {
	State.variables.mapGleamingCaverns.diagramDimensions = [301,233];
	State.variables.mapGleamingCaverns.icon = "gleaming-caverns-map.png";
	State.variables.mapGleamingCaverns.subarea = "gleaming-caverns";
}
window.deinitMapGleamingCaverns = function() {
	delete State.variables.mapGleamingCaverns;
}

window.getGleamingCavernStreetConvs = function() {
	var posConvs = []; // Possible Conversations
		// Practicing for festival
	posConvs.push(colorText('//"Have you been practicing for the Twisted Festival? You know about the importance of this one..."//','gray'));
		// Lake of Union
	posConvs.push(colorText('//"Would you... Come to the Lake of Union with me? I\'ve been feeling rather lonely..."//','gray'));
	if ( isStVarOn('blmClaw') ) { // After 'Blackmailed by Claw
		posConvs.push(colorText('//"Have you heard? Someone was spying from the top of the Lake of Union. I bet it was one of those Candidates... They bring nothing good."//','gray'));
	}
	if ( isJudgesReunionFinishedFA() == false ) { // Closed teather
		posConvs.push(colorText('//"I\'ve just been kicked out of the teather... It looks like the judges are having quite the heated discussion. Again."//','gray'));
	}
		// Painting & Crafting
	posConvs.push(colorText('//"We\'ve got a good haul of clay and minerals lately. I\'m wondering what could I paint for my house later..."//','gray'));
		// On Valtan
	posConvs.push(colorText('//"That Valtan... She comes back to the tribe and the first thing she does is going into hiding"//','gray') + ', to which someone replies: ' + colorText('//"Not like I care. We\'re better off without her.//"','gray'));
		// On Morph Artist
	if ( isStVarOn('bdPtSc') == false ) {
		posConvs.push(colorText('//"Did you see Mesquelles earlier? She looked happy, but kind of anxious..."//','gray') + '\n' + colorText('//"I know, I know. She wants one of the Candidates to allow her to try some transformation magic on them."//','gray'));
	} else if ( isStVarOn('mphFnTf') ) {
		posConvs.push(colorText('//"You aren\'t going to believe this! One of the humans from the Passion Temple went to Veshmren\'s hut, and Mesquelles transformed her!"//',"gray") + "\n" + colorText('//"She actually did it!? Her hard training must have paid off..."//',"gray"));
	}
		// On Pushed to the Stage/Improvised Trial
	posConvs.push(colorText('//"You haven\'t performed at the theatre in a long time. You really should practice for some time if you want to participate in the Twisted Festival."//','gray'));
		// On Caverns Rescue
	if ( isStVarOn('CaReVl') == false && isStVarOn('CaRePl') == false ) {
		if ( State.variables.daycycle == 29 ) {
			posConvs.push(colorText('//"And she isn\'t home, either."\n' +
						'"Oh, I remember now! She said she\'d be taking a stroll outside the tribe, and would come back later."\n' +
						'"Hmm. That does sound like her."//','gray'));
		} else if ( State.variables.daycycle == 30 || State.variables.daycycle == 1 ) {
			posConvs.push(colorText('//"She didn\'t appear, not during the whole day."\n' +
						'"Maybe she found the assembly closed and left again? You know she likes to disappear from time to time."\n' +
						'"...Why aren\'t you more worried about this?"','gray'));
		} else {
			posConvs.push(colorText('//"Glien has been gone for several days now."\n' +
						'"It\'s starting to get a bit concerning."\n' +
						'"I\'m going to speak with the judges... We have to organize a search party, start at the deeper tunnels, continue through the swamps..."\n' +
						'"When we\'re this close to the Festival, and the Candidates are in town? They\'ll just brush it off."//','gray'));
		}
	} else {
		posConvs.push(colorText('//"Have you heard? Glien got lost in the deeper caverns!"\n' +
						'"What? But then we have to hurry to..."\n' +
						'"No, no, she got lost, but a human from the Temple rescued her! She\'s still resting though... She might not be recovered enough to participate in the Twisted Festival."//','gray'));
	}
	var chosenConv = "";
	if ( posConvs.length > 0 ) {
		if ( limitedRandomInt(100) >= 50 ) {
			chosenConv = randomFromList(["Your ears catch a conversation nearby. ","You cannot help but to pay attention to the gossips of the tribespeople. ","Not paying attention to your presence, or perhaps unaware of it, some Shapeshifters allow you to hear their conversation. "]) + "\n" + randomFromList(posConvs);
		}
	}
	return chosenConv;
}
window.getGCtribeRoomDescPlusGossip = function() {
	var desc = this.description;
	var conv = getGleamingCavernStreetConvs();
	if ( conv != "" && State.variables.daycycle != 4 && State.variables.daycycle != 3 ) {
		desc += "\n" + conv;
	}
	return desc;
}

for ( var roomKey of ["mainStreet1","houses","thermalBaths","mainStreet2","mainStreet3","frozenBaths","publicBaths"] ) {
	setup.mapGleamingCaverns[roomKey].getDescription = getGCtribeRoomDescPlusGossip;
}

setup.mapGleamingCaverns.marshSP1.setSubarea = setSubareaMarsh;
setup.mapGleamingCaverns.marshCentrance.setSubarea = setSubareaCaverns;
// [228,170] , [256,174]
setup.mapGleamingCaverns.marshSP1.getSpecialAreaCoordinates = function() {
	var coords = "";
	if ( State.variables.mapGleamingCaverns.subarea == "gleaming-caverns" ) {
		coords = "6,7,26,27";
	} else {
		coords = "" + this.mapPos[0] + ',' + this.mapPos[1] + ',' + (this.mapPos[0]+20) + ',' + (this.mapPos[1]+20);
	}
	return coords;
}
setup.mapGleamingCaverns.marshCentrance.getSpecialAreaCoordinates = function() {
	var coords = "";
	if ( State.variables.mapGleamingCaverns.subarea == "gleaming-caverns" ) {
		coords = "" + this.mapPos[0] + ',' + this.mapPos[1] + ',' + (this.mapPos[0]+20) + ',' + (this.mapPos[1]+20);
	} else {
		coords = "256,174,276,194";
	}
	return coords;
}

// Random Monster Encounters

window.gCmonsterEncounterPrompt = function(characters) {
	var rN = limitedRandomInt(100);
	if ( rN > 80 ) {
		var formattedChars = charKeysIntoArrayString(characters);
		/*
		if ( characters.length == 1 ) {
			formattedChars = "['" + characters[0] + "']";
		}
		*/
		if ( characters.includes("chPlayerCharacter") ) {
			State.variables.compass.interludePassage = "Monsters are ambushing you!\n\n"
				+ "<<l" + "ink [[Continue|Scene]]>><<s" + "cript>>\n"
			+ "State.variables.compass.characterEventEndsPrematurelyFinishMovement('" + characters[0] + "');\n"
			//+ "State.variables.compass.characterEventGetsNewRemainingTime('" + characters[0] + "',20);\n"
			+ "State.variables.compass.ongoingEvents.push(createGcRandomMonsterEncounterEvent(20," + formattedChars + "));\n"
			+ "State.variables.compass.finishPlayerPrompt();\n"
			+ "State.variables.compass.sortOnGoingEventsByTime();\n"
			+ "State.variables.compass.pushAllTimeToAdvance();\n"
			+ "<</s" + "cript>><</l" + "ink>>";
			State.variables.compass.setPlayerPrompt(State.variables.compass.interludePassage,"chPlayerCharacter",false);
		} else {
			// NPCs get immediately put into event
			State.variables.compass.characterEventEndsPrematurelyFinishMovement(characters);
			//State.variables.compass.characterEventGetsNewRemainingTime(characters[0],20);
			State.variables.compass.ongoingEvents.push(createGcRandomMonsterEncounterEvent(20,characters));
			State.variables.compass.sortOnGoingEventsByTime();
				// Do NPCs remember their mission?
			if ( characters.includes("chPlayerCharacter") ) {
				
			}
			// If player forms part of group, player gets prompted
		}
	} else {
		// Message the player
		if ( characters.includes("chPlayerCharacter") ) {
			State.variables.compass.setMapMessage("Something lurks in the shadows...");
		}
	}
}

setup.mapGleamingCaverns.captureNetRooms = [ "hiddenCamp" ];
setup.mapGleamingCaverns.monsterRooms = [];

for ( var room of ["marshELlake","marshEUlake","marshELriver","marshEUriver","marshNEriver","marshNElake","marshNWlake","marshLriver1","marshLriver2","marshLPlake","marshLPpuddles","marshSriver","marshSWpuddles","marshSWlake","marshSElake","marshSEpuddles","marshMpuddles"] ) {
	setup.mapGleamingCaverns[room].getEventPrompt = gCmonsterEncounterPrompt;
	setup.mapGleamingCaverns.monsterRooms.push(room);
}


