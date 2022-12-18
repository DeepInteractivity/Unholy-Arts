//////// SCENE SPRITE DATA ////////
// Setup list containing all relevant sprite data

/*
window.scSprite = function(varName,gifName,positionPriority,dimensions,coordinates,type) {
	this.varName = varName; // Variable name, name by which this object is referred to
	this.gifName = gifName; // Name of the sprite file, used to locate the sprite in its appropriate folder
	this.positionPriority = positionPriority; // How high must the sprite appear. Lower priority -> More sprites will be placed on top of it
	this.dimensions = dimensions; // [x,y] Length and height of the sprite
	this.coordinates = coordinates; // [x,y] Where must the sprite be placed from the superior left corner
	this.type = type; // Type of sprite. All sprites of the same type may be interchangeable
}
*/

setup.SCSL = []; // SCene Sprites List
// Mount Face to Face
	// Top
		// White Human
setup.SCSL.mffTHeadMcy = new scSprite("mffTHeadMcy","mff-t-head-mcy.gif",100,[112,136],[163,-4],"mffTHead");
setup.SCSL.mffTHeadMcb = new scSprite("mffTHeadMcb","mff-t-head-mcb.gif",100,[140,324],[151,-17],"mffTHead");
setup.SCSL.mffTHeadMcr = new scSprite("mffTHeadMcr","mff-t-head-mcr.gif",100,[126,231],[153,-1],"mffTHead");
setup.SCSL.mffTTrunkWh = new scSprite("mffTTrunkWh","mff-t-trunk-wh.gif",40,[274,137],[171,105],"mffTTrunk");
setup.SCSL.mffTChestWhbig = new scSprite("mffTChestWhbig","mff-t-chest-whBig.gif",70,[111,101],[179,131],"mffTChest");
setup.SCSL.mffTChestWhmed = new scSprite("mffTChestWhmed","mff-t-chest-whMed.gif",70,[105,92],[180,157],"mffTChest");
setup.SCSL.mffTDickGf = new scSprite("mffTDickGf","mff-t-chest-whMed.gif",100,[62,64],[321,193],"mffTDick");
setup.SCSL.mffTRarmWh = new scSprite("mffTRarmWh","mff-t-rArm-wh.gif",10,[65,124],[165,105],"mffTRarm");
setup.SCSL.mffTLarmWh = new scSprite("mffTLarmWh","mff-t-lArm-wh.gif",85,[99,253],[244,106],"mffTLarm");
setup.SCSL.mffTLhandWh = new scSprite("mffTLhandWh","mff-t-lHand-wh.gif",90,[73,40],[244,337],"mffTLhand");
setup.SCSL.mffTLlegWh = new scSprite("mffTLlegWh","mff-t-lLeg-wh.gif",75,[284,201],[267,113],"mffTLleg");
	// Bottom
		// White human
setup.SCSL.mffBHeadMcy = new scSprite("mffBHeadMcy","mff-b-head-mcy.gif",140,[145,128],[53,237],"mffBHead");
setup.SCSL.mffBHeadMcb = new scSprite("mffBHeadMcb","mff-b-head-mcb.gif",140,[290,131],[39,234],"mffBHead");
setup.SCSL.mffBHeadMcr = new scSprite("mffBHeadMcr","mff-b-head-mcr.gif",140,[160,156],[42,231],"mffBHead");
setup.SCSL.mffBTrunkWh = new scSprite("mffBTrunkWh","mff-b-trunk-wh.gif",30,[298,158],[132,227],"mffBTrunk");
setup.SCSL.mffBChestWhbig = new scSprite("mffBChestWhbig","mff-b-chest-whBig.gif",45,[115,61],[197,241],"mffBChest");
setup.SCSL.mffBChestWhmed = new scSprite("mffBChestWhmed","mff-b-chest-whMed.gif",45,[108,54],[197,249],"mffBChest");
setup.SCSL.mffBChestWhsma = new scSprite("mffBChestWhsma","mff-b-chest-whSma.gif",45,[106,51],[236,249],"mffBChest");
setup.SCSL.mffBDickWh = new scSprite("mffBDickWh","mff-b-dick-wh.gif",25,[42,63],[348,199],"mffBDick");
setup.SCSL.mffBRarmWh = new scSprite("mffBRarmWh","mff-b-rArm-wh.gif",80,[83,202],[231,266],"mffBRarm");
setup.SCSL.mffBLarmWh = new scSprite("mffBLarmWh","mff-b-lArm-wh.gif",5,[208,101],[120,81],"mffBLarm");
setup.SCSL.mffBLFootWh = new scSprite("mffBLFootWh","mff-b-lFoot-wh.gif",20,[51,46],[461,239],"mffBLfoot");
setup.SCSL.mffBLlegWh = new scSprite("mffBLlegWh","mff-b-lLeg-wh.gif",15,[107,105],[289,196],"mffBLleg");
setup.SCSL.mffBRlegWh = new scSprite("mffBRlegWh","mff-b-rLeg-wh.gif",50,[163,86],[344,193],"mffBRleg");
setup.SCSL.mffBLFingerWh = new scSprite("mffBLFingerWh","mff-b-lFinger-wh.gif",120,[28,16],[161,106],"mffBLfinger");
setup.SCSL.mffBRhandWh = new scSprite("mffBRhandWh","mff-b-rHand-wh.gif",100,[93,87],[400,222],"mffBRhand");


window.getScSprite = function(spriteVarName) {
	return setup.SCSL[spriteVarName];
}
