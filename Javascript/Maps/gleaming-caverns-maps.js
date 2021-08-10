////////// GLEAMING CAVERNS MAPS ////////// 

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
	"A section of the road finds its limit next to a bridge. The smell of wet grass floods your nose.", // Description
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
	"Few reeds and bushes compete for the the scarce fertile soils that surround the river.", // Description
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
	  new RoomConnection('marshNElake',5) ], // Connections
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
	[ new RoomConnection('marshSP1',2) ], // Connections
	null, // getActions
	[256,174]
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

window.initMapGleamingCaverns = function() {
	State.variables.mapGleamingCaverns = new Chart("mapGleamingCaverns","Gleaming Caverns");
	State.variables.mapGleamingCaverns.diagramDimensions = [301,209];
	State.variables.mapGleamingCaverns.icon = "marsh-map.png";

	State.variables.mapGleamingCaverns.autogenerateRooms("mapGleamingCaverns");
}
window.deinitMapGleamingCaverns = function() {
	delete State.variables.mapGleamingCaverns;
}





