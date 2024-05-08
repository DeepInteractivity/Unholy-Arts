//////// SCENE SPRITE DATA ////////
// Setup list containing all relevant sprite data

/*
window.scSprite = function(varName,gifName,positionPriority,dimensions,coordinates,type,group,animation) {
	this.varName = varName; // Variable name, name by which this object is referred to
	this.gifName = gifName; // Name of the sprite file, used to locate the sprite in its appropriate folder
	this.positionPriority = positionPriority; // How high must the sprite appear. Lower priority -> More sprites will be placed on top of it
	this.dimensions = dimensions; // [x,y] Length and height of the sprite
	this.coordinates = coordinates; // [x,y] Where must the sprite be placed from the superior left corner
	this.type = type; // Type of sprite. All sprites of the same type may be interchangeable
	this.group = group; // Group of sprite. All sprites of the same group are intended to form part of the same character and position
	this.animation = animation; // Animation to which this sprite belongs
}
*/


setup.SCSL = []; // SCene Sprites List
// Mount Face to Face, Mount Dick // MftfMd
	// Top
		// White Human // Wh -> White Human ; Mcy -> Main Character Yellow
setup.SCSL.mffTTrunkWh = new scSprite("mffTTrunkWh","mff-t-trunk-wh.gif",40,[274,137],[171,105],"mffTTrunk","WhT","MftfMd");
setup.SCSL.mffTChestWhbig = new scSprite("mffTChestWhbig","mff-t-chest-whBig.gif",70,[111,101],[177,157],"mffTChest","WhT","MftfMd");
setup.SCSL.mffTChestWhmed = new scSprite("mffTChestWhmed","mff-t-chest-whMed.gif",70,[105,92],[180,157],"mffTChest","WhT","MftfMd");
setup.SCSL.mffTChestWhsma = new scSprite("mffTChestWhsma","mff-t-chest-whSma.gif",70,[105,92],[180,157],"mffTChest","WhT","MftfMd");
setup.SCSL.mffTDickWh = new scSprite("mffTDickWh","mff-t-dick-wh.gif",35,[62,64],[321,193],"mffTDick","WhT","MftfMd");
setup.SCSL.mffTRarmWh = new scSprite("mffTRarmWh","mff-t-rArm-wh.gif",10,[65,124],[165,105],"mffTRarm","WhT","MftfMd");
setup.SCSL.mffTLarmWh = new scSprite("mffTLarmWh","mff-t-lArm-wh.gif",95,[99,253],[244,106],"mffTLarm","WhT","MftfMd");
setup.SCSL.mffTLforearmWh = new scSprite("mffTLforearmWh","mff-t-lForearm-wh.gif",68,[68,100],[155,206],"mffTLforearm","WhT","MftfMd");
setup.SCSL.mffTLhandWh = new scSprite("mffTLhandWh","mff-t-lHand-wh.gif",100,[73,40],[244,337],"mffTLhand","WhT","MftfMd");
setup.SCSL.mffTLlegWh = new scSprite("mffTLlegWh","mff-t-lLeg-wh.gif",75,[284,201],[360,154],"mffTLleg","WhT","MftfMd");
setup.SCSL.mffTHeadMcy = new scSprite("mffTHeadMcy","mff-t-head-mcy.gif",100,[112,136],[163,-4],"mffTHead","McyT","MftfMd"); // Main character yellow
setup.SCSL.mffTHeadMcb = new scSprite("mffTHeadMcb","mff-t-head-mcb.gif",100,[140,324],[151,-11],"mffTHead","McbT","MftfMd"); // Main character black
setup.SCSL.mffTHeadMcr = new scSprite("mffTHeadMcr","mff-t-head-mcr.gif",100,[126,231],[153,-1],"mffTHead","McrT","MftfMd"); // Main character red
        // Gray character // Gf -> Gray Female
setup.SCSL.mffTHeadGf = new scSprite("mffTHeadGf","mff-t-head-gf.gif",100,[105,127],[165,0],"mffTHead","GfT","MftfMd");
setup.SCSL.mffTTrunkGf = new scSprite("mffTTrunkGf","mff-t-trunk-gf.gif",40,[274,137],[166,105],"mffTTrunk","GfT","MftfMd");
setup.SCSL.mffTChestGfbig = new scSprite("mffTChestGfbig","mff-t-chest-gfBig.gif",70,[111,101],[177,157],"mffTChest","GfT","MftfMd");
setup.SCSL.mffTDickGf = new scSprite("mffTDickGf","mff-t-dick-gf.gif",35,[62,64],[321,193],"mffTDick","GfT","MftfMd");
setup.SCSL.mffTRarmGf = new scSprite("mffTRarmGf","mff-t-rArm-gf.gif",42,[65,124],[165,105],"mffTRarm","GfT","MftfMd");
setup.SCSL.mffTLarmGf = new scSprite("mffTLarmGf","mff-t-lArm-gf.gif",95,[99,253],[244,106],"mffTLarm","GfT","MftfMd");
setup.SCSL.mffTLforearmGf = new scSprite("mffTLforearmGf","mff-t-lForearm-gf.gif",68,[68,100],[155,206],"mffTLforearm","GfT","MftfMd");
setup.SCSL.mffTLhandGf = new scSprite("mffTLhandGf","mff-t-lHand-gf.gif",100,[73,40],[244,337],"mffTLhand","GfT","MftfMd");
setup.SCSL.mffTLlegGf = new scSprite("mffTLlegGf","mff-t-lLeg-gf.gif",75,[284,201],[360,154],"mffTLleg","GfT","MftfMd");
        // Gray character // Gm -> Gray Male
setup.SCSL.mffTHeadGm = new scSprite("mffTHeadGm","mff-t-head-gm.gif",100,[105,127],[165,0],"mffTHead","GmT","MftfMd");
setup.SCSL.mffTTrunkGm = new scSprite("mffTTrunkGm","mff-t-trunk-gm.gif",40,[279,154],[166,96],"mffTTrunk","GmT","MftfMd");
setup.SCSL.mffTChestGm = new scSprite("mffTChestGm","mff-t-chest-gm.gif",70,[127,104],[188,126],"mffTChest","GmT","MftfMd");
setup.SCSL.mffTDickGm = new scSprite("mffTDickGm","mff-t-dick-gm.gif",35,[62,64],[321,193],"mffTDick","GmT","MftfMd");
setup.SCSL.mffTRarmGm = new scSprite("mffTRarmGm","mff-t-rArm-gm.gif",38,[70,130],[165,105],"mffTRarm","GmT","MftfMd");
setup.SCSL.mffTLarmGm = new scSprite("mffTLarmGm","mff-t-lArm-gm.gif",85,[107,264],[240,95],"mffTLarm","GmT","MftfMd");
setup.SCSL.mffTLforearmGm = new scSprite("mffTLforearmGm","mff-t-lForearm-gm.gif",20,[58,85],[177,217],"mffTLforearm","GmT","MftfMd");
setup.SCSL.mffTLhandGm = new scSprite("mffTLhandGm","mff-t-lHand-gm.gif",90,[76,40],[242,336],"mffTLhand","GmT","MftfMd");
setup.SCSL.mffTLlegGm = new scSprite("mffTLlegGm","mff-t-lLeg-gm.gif",75,[284,201],[360,154],"mffTLleg","GmT","MftfMd");
	// Bottom
		// White human
setup.SCSL.mffBTrunkWh = new scSprite("mffBTrunkWh","mff-b-trunk-wh.gif",30,[298,132],[132,227],"mffBTrunk","WhB","MftfMd");
setup.SCSL.mffBChestWhbig = new scSprite("mffBChestWhbig","mff-b-chest-whBig.gif",45,[115,61],[197,249],"mffBChest","WhB","MftfMd");
setup.SCSL.mffBChestWhmed = new scSprite("mffBChestWhmed","mff-b-chest-whMed.gif",45,[108,54],[197,249],"mffBChest","WhB","MftfMd");
setup.SCSL.mffBChestWhsma = new scSprite("mffBChestWhsma","mff-b-chest-whSma.gif",45,[106,51],[197,249],"mffBChest","WhB","MftfMd");
setup.SCSL.mffBDickWh = new scSprite("mffBDickWh","mff-b-dick-wh.gif",25,[42,63],[348,200],"mffBDick","WhB","MftfMd");
setup.SCSL.mffBRarmhandWh = new scSprite("mffBRarmhandWh","mff-b-rArmhand-wh.gif",80,[267,155],[231,223],"mffBRarmhand","WhB","MftfMd");
setup.SCSL.mffBLarmWh = new scSprite("mffBLarmWh","mff-b-lArm-wh.gif",5,[208,110],[120,81],"mffBLarm","WhB","MftfMd");
setup.SCSL.mffBLFootWh = new scSprite("mffBLFootWh","mff-b-lFoot-wh.gif",20,[51,46],[461,239],"mffBLfoot","WhB","MftfMd");
setup.SCSL.mffBLlegWh = new scSprite("mffBLlegWh","mff-b-lLeg-wh.gif",15,[107,105],[290,206],"mffBLleg","WhB","MftfMd");
setup.SCSL.mffBRlegWh = new scSprite("mffBRlegWh","mff-b-rLeg-wh.gif",27,[163,86],[344,192],"mffBRleg","WhB","MftfMd");
setup.SCSL.mffBLFingerWh = new scSprite("mffBLFingerWh","mff-b-lFinger-wh.gif",97,[29,16],[161,99],"mffBLfinger","WhB","MftfMd");
setup.SCSL.mffBHeadMcy = new scSprite("mffBHeadMcy","mff-b-head-mcy.gif",90,[145,128],[53,237],"mffBHead","McyB","MftfMd"); // Main character yellow
setup.SCSL.mffBHeadMcb = new scSprite("mffBHeadMcb","mff-b-head-mcb.gif",90,[290,131],[39,233],"mffBHead","McbB","MftfMd"); // Main character black
setup.SCSL.mffBHeadMcr = new scSprite("mffBHeadMcr","mff-b-head-mcr.gif",90,[160,156],[42,230],"mffBHead","McrB","MftfMd"); // Main character red
        // Gray character // Gf -> Gray Female
setup.SCSL.mffBHeadGf = new scSprite("mffBHeadGf","mff-b-head-gf.gif",140,[145,128],[53,237],"mffBHead","GfB","MftfMd");
setup.SCSL.mffBTrunkGf = new scSprite("mffBTrunkGf","mff-b-trunk-gf.gif",30,[298,132],[132,227],"mffBTrunk","GfB","MftfMd");
setup.SCSL.mffBChestGfbig = new scSprite("mffBChestGfbig","mff-b-chest-gfBig.gif",45,[115,61],[197,249],"mffBChest","GfB","MftfMd");
setup.SCSL.mffBDickGf = new scSprite("mffBDickGf","mff-b-dick-gf.gif",25,[42,63],[348,200],"mffBDick","GfB","MftfMd");
setup.SCSL.mffBLarmGf = new scSprite("mffBLarmGf","mff-b-lArm-gf.gif",5,[208,101],[120,81],"mffBLarm","GfB","MftfMd");
setup.SCSL.mffBLFootGf = new scSprite("mffBLFootGf","mff-b-lFoot-gf.gif",20,[51,46],[461,239],"mffBLfoot","GfB","MftfMd");
setup.SCSL.mffBLlegGf = new scSprite("mffBLlegGf","mff-b-lLeg-gf.gif",15,[107,105],[290,206],"mffBLleg","GfB","MftfMd");
setup.SCSL.mffBRlegGf = new scSprite("mffBRlegGf","mff-b-rLeg-gf.gif",27,[163,86],[344,192],"mffBRleg","GfB","MftfMd");
setup.SCSL.mffBLFingerGf = new scSprite("mffBLFingerGf","mff-b-lFinger-gf.gif",97,[29,16],[161,99],"mffBLfinger","GfB","MftfMd");
setup.SCSL.mffBRarmhandGf = new scSprite("mffBRarmhandGf","mff-b-rArmhand-gf.gif",80,[267,155],[231,223],"mffBRarmhand","GfB","MftfMd");
       // Gray character // Gm -> Gray Male
setup.SCSL.mffBHeadGm = new scSprite("mffBHeadGm","mff-b-head-gm.gif",140,[145,128],[53,237],"mffBHead","GmB","MftfMd");
setup.SCSL.mffBTrunkGm = new scSprite("mffBTrunkGm","mff-b-trunk-gm.gif",30,[308,147],[132,227],"mffBTrunk","GmB","MftfMd");
setup.SCSL.mffBDickGm = new scSprite("mffBDickGm","mff-b-dick-gf.gif",25,[42,63],[348,200],"mffBDick","GmB","MftfMd");
setup.SCSL.mffBRarmhandGm = new scSprite("mffBRarmhandGm","mff-b-rArmhand-gm.gif",80,[276,155],[231,223],"mffBRarmhand","GmB","MftfMd");
setup.SCSL.mffBLarmGm = new scSprite("mffBLarmGm","mff-b-lArm-gm.gif",5,[208,101],[120,81],"mffBLarm","GmB","MftfMd");
setup.SCSL.mffBLFootGm = new scSprite("mffBLFootGm","mff-b-lFoot-gm.gif",20,[51,46],[461,239],"mffBLfoot","GmB","MftfMd");
//setup.SCSL.mffBLFootGm = new scSprite("mffBLFootGm","mff-b-lFoot-gm.gif",20,[51,46],[461,239],"mffBLfoot","GmB","MftfMd");
setup.SCSL.mffBLlegGm = new scSprite("mffBLlegGm","mff-b-lLeg-gm.gif",15,[107,105],[290,206],"mffBLleg","GmB","MftfMd");
setup.SCSL.mffBRlegGm = new scSprite("mffBRlegGm","mff-b-rLeg-gm.gif",27,[163,86],[344,192],"mffBRleg","GmB","MftfMd");

// Mount Face to Face, Anal Mount Dick // MftfAmd
	// Top
		// White Human // Wh -> White Human ; Mcy -> Main Character Yellow
setup.SCSL.mffaTTrunkWh = new scSprite("mffaTTrunkWh","mffa-t-trunk-wh.gif",40,[274,156],[156,105],"mffaTTrunk","WhT","MftfAmd");
setup.SCSL.mffaTChestWhbig = new scSprite("mffaTChestWhbig","mffa-t-chest-whBig.gif",70,[111,101],[163,157],"mffaTChest","WhT","MftfAmd");
setup.SCSL.mffaTChestWhmed = new scSprite("mffaTChestWhmed","mffa-t-chest-whMed.gif",70,[105,92],[165,157],"mffaTChest","WhT","MftfAmd");
setup.SCSL.mffaTChestWhsma = new scSprite("mffaTChestWhsma","mffa-t-chest-whSma.gif",70,[105,92],[165,157],"mffaTChest","WhT","MftfAmd");
setup.SCSL.mffaTDickWh = new scSprite("mffaTDickWh","mffa-t-dick-wh.gif",35,[62,64],[306,193],"mffaTDick","WhT","MftfAmd");
setup.SCSL.mffaTRarmWh = new scSprite("mffaTRarmWh","mffa-t-rArm-wh.gif",10,[65,124],[150,105],"mffaTRarm","WhT","MftfAmd");
setup.SCSL.mffaTLarmWh = new scSprite("mffaTLarmWh","mffa-t-lArm-wh.gif",95,[99,253],[229,106],"mffaTLarm","WhT","MftfAmd");
setup.SCSL.mffaTLforearmWh = new scSprite("mffaTLforearmWh","mffa-t-lForearm-wh.gif",68,[68,100],[140,206],"mffaTLforearm","WhT","MftfAmd");
setup.SCSL.mffaTLhandWh = new scSprite("mffaTLhandWh","mffa-t-lHand-wh.gif",100,[73,40],[229,337],"mffaTLhand","WhT","MftfAmd");
setup.SCSL.mffaTLlegWh = new scSprite("mffaTLlegWh","mffa-t-lLeg-wh.gif",75,[293,203],[337,154],"mffaTLleg","WhT","MftfAmd");
setup.SCSL.mffaTHeadMcy = new scSprite("mffaTHeadMcy","mffa-t-head-mcy.gif",100,[112,136],[148,-4],"mffaTHead","McyT","MftfAmd"); // Main character yellow
setup.SCSL.mffaTHeadMcb = new scSprite("mffaTHeadMcb","mffa-t-head-mcb.gif",100,[140,324],[136,-11],"mffaTHead","McbT","MftfAmd"); // Main character black
setup.SCSL.mffaTHeadMcr = new scSprite("mffaTHeadMcr","mffa-t-head-mcr.gif",100,[126,231],[138,-1],"mffaTHead","McrT","MftfAmd"); // Main character red

        // Gray character // Gf -> Gray Female
setup.SCSL.mffaTHeadGf = new scSprite("mffaTHeadGf","mffa-t-head-gf.gif",100,[105,127],[150,0],"mffaTHead","GfT","MftfAmd");
setup.SCSL.mffaTTrunkGf = new scSprite("mffaTTrunkGf","mffa-t-trunk-gf.gif",40,[274,137],[160,107],"mffaTTrunk","GfT","MftfAmd");
setup.SCSL.mffaTChestGfbig = new scSprite("mffaTChestGfbig","mffa-t-chest-gfBig.gif",70,[111,101],[163,157],"mffaTChest","GfT","MftfAmd");
setup.SCSL.mffaTDickGf = new scSprite("mffaTDickGf","mffa-t-dick-gf.gif",35,[62,64],[306,193],"mffaTDick","GfT","MftfAmd");
setup.SCSL.mffaTRarmGf = new scSprite("mffaTRarmGf","mffa-t-rArm-gf.gif",42,[65,124],[150,105],"mffaTRarm","GfT","MftfAmd");
setup.SCSL.mffaTLarmGf = new scSprite("mffaTLarmGf","mffa-t-lArm-gf.gif",95,[99,253],[229,106],"mffaTLarm","GfT","MftfAmd");
setup.SCSL.mffaTLforearmGf = new scSprite("mffaTLforearmGf","mffa-t-lForearm-gf.gif",68,[68,100],[140,206],"mffaTLforearm","GfT","MftfAmd");
setup.SCSL.mffaTLhandGf = new scSprite("mffaTLhandGf","mffa-t-lHand-gf.gif",100,[73,40],[229,337],"mffaTLhand","GfT","MftfAmd");
setup.SCSL.mffaTLlegGf = new scSprite("mffaTLlegGf","mffa-t-lLeg-gf.gif",75,[284,201],[353,154],"mffaTLleg","GfT","MftfAmd");

        // Gray character // Gm -> Gray Male
setup.SCSL.mffaTHeadGm = new scSprite("mffaTHeadGm","mffa-t-head-gm.gif",100,[105,127],[150,0],"mffaTHead","GmT","MftfAmd");
setup.SCSL.mffaTTrunkGm = new scSprite("mffaTTrunkGm","mffa-t-trunk-gm.gif",40,[279,154],[151,96],"mffaTTrunk","GmT","MftfAmd");
setup.SCSL.mffaTChestGm = new scSprite("mffaTChestGm","mffa-t-chest-gm.gif",70,[127,104],[172,126],"mffaTChest","GmT","MftfAmd");
setup.SCSL.mffaTDickGm = new scSprite("mffaTDickGm","mffa-t-dick-gm.gif",35,[62,64],[306,193],"mffaTDick","GmT","MftfAmd");
setup.SCSL.mffaTRarmGm = new scSprite("mffaTRarmGm","mffa-t-rArm-gm.gif",38,[70,130],[150,105],"mffaTRarm","GmT","MftfAmd");
setup.SCSL.mffaTLarmGm = new scSprite("mffaTLarmGm","mffa-t-lArm-gm.gif",85,[107,264],[220,95],"mffaTLarm","GmT","MftfAmd");
setup.SCSL.mffaTLforearmGm = new scSprite("mffaTLforearmGm","mffa-t-lForearm-gm.gif",20,[43,85],[162,217],"mffaTLforearm","GmT","MftfAmd");
setup.SCSL.mffaTLhandGm = new scSprite("mffaTLhandGm","mffa-t-lHand-gm.gif",90,[76,40],[223,336],"mffaTLhand","GmT","MftfAmd");
setup.SCSL.mffaTLlegGm = new scSprite("mffaTLlegGm","mffa-t-lLeg-gm.gif",75,[284,201],[345,154],"mffaTLleg","GmT","MftfAmd");


	// Bottom
		// White human
setup.SCSL.mffaBTrunkWh = new scSprite("mffaBTrunkWh","mffa-b-trunk-wh.gif",30,[298,132],[132,227],"mffaBTrunk","WhB","MftfAmd");
setup.SCSL.mffaBChestWhbig = new scSprite("mffaBChestWhbig","mffa-b-chest-whBig.gif",45,[115,61],[197,249],"mffaBChest","WhB","MftfAmd");
setup.SCSL.mffaBChestWhmed = new scSprite("mffaBChestWhmed","mffa-b-chest-whMed.gif",45,[108,54],[197,249],"mffaBChest","WhB","MftfAmd");
setup.SCSL.mffaBChestWhsma = new scSprite("mffaBChestWhsma","mffa-b-chest-whSma.gif",45,[106,51],[197,249],"mffaBChest","WhB","MftfAmd");
setup.SCSL.mffaBDickWh = new scSprite("mffaBDickWh","mffa-b-dick-wh.gif",25,[42,63],[348,200],"mffaBDick","WhB","MftfAmd");
setup.SCSL.mffaBRarmhandWh = new scSprite("mffaBRarmhandWh","mffa-b-rArmhand-wh.gif",80,[267,155],[231,223],"mffaBRarmhand","WhB","MftfAmd");
setup.SCSL.mffaBLarmWh = new scSprite("mffaBLarmWh","mffa-b-lArm-wh.gif",5,[208,110],[120,81],"mffaBLarm","WhB","MftfAmd");
setup.SCSL.mffaBLFootWh = new scSprite("mffaBLFootWh","mffa-b-lFoot-wh.gif",20,[51,46],[461,239],"mffaBLfoot","WhB","MftfAmd");
setup.SCSL.mffaBLlegWh = new scSprite("mffaBLlegWh","mffa-b-lLeg-wh.gif",15,[107,105],[290,206],"mffaBLleg","WhB","MftfAmd");
setup.SCSL.mffaBRlegWh = new scSprite("mffaBRlegWh","mffa-b-rLeg-wh.gif",27,[163,86],[344,192],"mffaBRleg","WhB","MftfAmd");
setup.SCSL.mffaBLFingerWh = new scSprite("mffaBLFingerWh","mffa-b-lFinger-wh.gif",97,[29,16],[161,99],"mffaBLfinger","WhB","MftfAmd");
setup.SCSL.mffaBHeadMcy = new scSprite("mffaBHeadMcy","mffa-b-head-mcy.gif",90,[145,128],[53,237],"mffaBHead","McyB","MftfAmd"); // Main character yellow
setup.SCSL.mffaBHeadMcb = new scSprite("mffaBHeadMcb","mffa-b-head-mcb.gif",90,[290,131],[39,233],"mffaBHead","McbB","MftfAmd"); // Main character black
setup.SCSL.mffaBHeadMcr = new scSprite("mffaBHeadMcr","mffa-b-head-mcr.gif",90,[160,156],[42,230],"mffaBHead","McrB","MftfAmd"); // Main character red

        // Gray character // Gf -> Gray Female
setup.SCSL.mffaBHeadGf = new scSprite("mffaBHeadGf","mffa-b-head-gf.gif",140,[145,128],[53,237],"mffaBHead","GfB","MftfAmd");
setup.SCSL.mffaBTrunkGf = new scSprite("mffaBTrunkGf","mffa-b-trunk-gf.gif",30,[298,132],[132,227],"mffaBTrunk","GfB","MftfAmd");
setup.SCSL.mffaBChestGfbig = new scSprite("mffaBChestGfbig","mffa-b-chest-gfBig.gif",45,[115,61],[197,249],"mffaBChest","GfB","MftfAmd");
setup.SCSL.mffaBDickGf = new scSprite("mffaBDickGf","mffa-b-dick-gf.gif",25,[42,63],[348,200],"mffaBDick","GfB","MftfAmd");
setup.SCSL.mffaBLarmGf = new scSprite("mffaBLarmGf","mffa-b-lArm-gf.gif",5,[208,101],[120,81],"mffaBLarm","GfB","MftfAmd");
setup.SCSL.mffaBLFootGf = new scSprite("mffaBLFootGf","mffa-b-lFoot-gf.gif",20,[51,46],[461,239],"mffaBLfoot","GfB","MftfAmd");
setup.SCSL.mffaBLlegGf = new scSprite("mffaBLlegGf","mffa-b-lLeg-gf.gif",15,[107,105],[290,206],"mffaBLleg","GfB","MftfAmd");
setup.SCSL.mffaBRlegGf = new scSprite("mffaBRlegGf","mffa-b-rLeg-gf.gif",27,[163,86],[344,192],"mffaBRleg","GfB","MftfAmd");
setup.SCSL.mffaBLFingerGf = new scSprite("mffaBLFingerGf","mffa-b-lFinger-gf.gif",97,[29,16],[161,99],"mffaBLfinger","GfB","MftfAmd");
setup.SCSL.mffaBRarmhandGf = new scSprite("mffaBRarmhandGf","mffa-b-rArmhand-gf.gif",80,[267,155],[231,223],"mffaBRarmhand","GfB","MftfAmd");

       // Gray character // Gm -> Gray Male
setup.SCSL.mffaBHeadGm = new scSprite("mffaBHeadGm","mffa-b-head-gm.gif",140,[145,128],[53,237],"mffaBHead","GmB","MftfAmd");
setup.SCSL.mffaBTrunkGm = new scSprite("mffaBTrunkGm","mffa-b-trunk-gm.gif",30,[308,147],[132,227],"mffaBTrunk","GmB","MftfAmd");
setup.SCSL.mffaBDickGm = new scSprite("mffaBDickGm","mffa-b-dick-gf.gif",25,[42,63],[348,200],"mffaBDick","GmB","MftfAmd");
setup.SCSL.mffaBRarmhandGm = new scSprite("mffaBRarmhandGm","mffa-b-rArmhand-gm.gif",80,[276,155],[231,223],"mffaBRarmhand","GmB","MftfAmd");
setup.SCSL.mffaBLarmGm = new scSprite("mffaBLarmGm","mffa-b-lArm-gm.gif",5,[208,101],[120,81],"mffaBLarm","GmB","MftfAmd");
setup.SCSL.mffaBLFootGm = new scSprite("mffaBLFootGm","mffa-b-lFoot-gm.gif",20,[51,46],[461,239],"mffaBLfoot","GmB","MftfAmd");
//setup.SCSL.mffaBLFootGm = new scSprite("mffaBLFootGm","mffa-b-lFoot-gm.gif",20,[51,46],[461,239],"mffaBLfoot","GmB","MftfAmd");
setup.SCSL.mffaBLlegGm = new scSprite("mffaBLlegGm","mffa-b-lLeg-gm.gif",15,[107,105],[290,206],"mffaBLleg","GmB","MftfAmd");
setup.SCSL.mffaBRlegGm = new scSprite("mffaBRlegGm","mffa-b-rLeg-gm.gif",27,[163,86],[344,192],"mffaBRleg","GmB","MftfAmd");

// Mount Face to Face, Scissors // MftfScs
	// Top
		// White Human // Wh -> White Human ; Mcy -> Main Character Yellow
setup.SCSL.scsTDickWh = new scSprite("scsTDickWh","scs-t-dick-wh.gif",36,[46,63],[322,210],"scsTDick","WhT","MftfScs"); // dick top
setup.SCSL.scsTDickWhsmall = new scSprite("scsTDickWhsmall","scs-t-small-dick-wh.gif",36,[46,58],[322,210],"scsTDick","WhT","MftfScs"); // dick top small
setup.SCSL.scsTTrunkWh = new scSprite("scsTTrunkWh","scs-t-trunk-wh.gif",5,[109,221],[268,64],"scsTTrunk","WhT","MftfScs");
setup.SCSL.scsTChestWhbig = new scSprite("scsTChestWhbig","scs-t-chest-whBig.gif",70,[90,88],[292,93],"scsTChest","WhT","MftfScs"); 
setup.SCSL.scsTChestWhmedium = new scSprite("scsTChestWhmedium","scs-t-chest-whMedium.gif",70,[83,74],[297,105],"scsTChest","WhT","MftfScs");
setup.SCSL.scsTChestWhsmall = new scSprite("scsTChestWhsmall","scs-t-chest-whSmall.gif",70,[79,70],[298,103],"scsTChest","WhT","MftfScs");
setup.SCSL.scsTRfingerWh = new scSprite("scsTRfingerWh","scs-t-fingers-wh.gif",110,[20,24],[483,100],"scsTRfinger","WhT","MftfScs"); // new fingers character 
setup.SCSL.scsTRarmWh = new scSprite("scsTRarmWh","scs-t-rArm-wh.gif",10,[184,75],[335,65],"scsTRarm","WhT","MftfScs");
setup.SCSL.scsTLarmWh = new scSprite("scsTLarmWh","scs-t-lArm-wh.gif",35,[74,201],[239,75],"scsTLarm","WhT","MftfScs");
setup.SCSL.scsTLlegWh = new scSprite("scsTLlegWh","scs-t-lLeg-wh.gif",75,[233,145],[106,210],"scsTLleg","WhT","MftfScs");
setup.SCSL.scsTRlegWh = new scSprite("scsTRlegWh","scs-t-RLeg-wh.gif",10,[165,60],[195,275],"scsTRleg","WhT","MftfScs"); // new leg
setup.SCSL.scsTHeadMcy = new scSprite("scsTHeadMcy","scs-t-head-mcy.gif",100,[97,112],[263,-12],"scsTHead","McyT","MftfScs"); // Main character yellow
setup.SCSL.scsTHeadMcb = new scSprite("scsTHeadMcb","scs-t-head-mcb.gif",100,[126,231],[268,-3],"scsTHead","McbT","MftfScs"); // Main character black
setup.SCSL.scsTHeadMcr = new scSprite("scsTHeadMcr","scs-t-head-mcr.gif",100,[114,174],[266,-5],"scsTHead","McrT","MftfScs"); // Main character red
setup.SCSL.scsTTailMcb = new scSprite("scsTTailMcb","scs-t-tail-mcb.gif",1,[82,252],[233,-9],"scsTTail","McbT","MftfScs"); // Tail hair character 

                // Gray character // Gf -> Gray Female
setup.SCSL.scsTDickGf = new scSprite("scsTDickGf","scs-t-dick-gf.gif",36,[46,63],[320,210],"scsTDick","GfT","MftfScs"); // dick top
setup.SCSL.scsTDickGfsmall = new scSprite("scsTDickGfsmall","scs-t-small-dick-gf.gif",36,[46,58],[322,210],"scsTDick","GfT","MftfScs"); // dick top small gray
setup.SCSL.scsTTrunkGf = new scSprite("scsTTrunkGf","scs-t-trunk-gf.gif",5,[109,221],[268,67],"scsTTrunk","GfT","MftfScs");
setup.SCSL.scsTChestGfbig = new scSprite("scsTChestGfbig","scs-t-chest-gfBig.gif",70,[90,88],[292,93],"scsTChest","GfT","MftfScs");
setup.SCSL.scsTChestGfmedium = new scSprite("scsTChestGfmedium","scs-t-chest-gfMedium.gif",70,[83,74],[297,105],"scsTChest","GfT","MftfScs");
setup.SCSL.scsTChestGfsmall = new scSprite("scsTChestGfsmall","scs-t-chest-gfSmall.gif",70,[79,70],[298,103],"scsTChest","GfT","MftfScs");
setup.SCSL.scsTRfingerGf = new scSprite("scsTRfingerGf","scs-t-fingers-gf.gif",110,[20,24],[483,100],"scsTRfinger","GfT","MftfScs"); // new fingers character 
setup.SCSL.scsTRarmGf = new scSprite("scsTRarmGf","scs-t-rArm-gf.gif",10,[184,75],[335,65],"scsTRarm","GfT","MftfScs");
setup.SCSL.scsTLarmGf = new scSprite("scsTLarmGf","scs-t-lArm-gf.gif",35,[74,201],[239,78],"scsTLarm","GfT","MftfScs");
setup.SCSL.scsTLlegGf = new scSprite("scsTLlegGf","scs-t-lLeg-gf.gif",75,[233,145],[106,210],"scsTLleg","GfT","MftfScs");
setup.SCSL.scsTRlegGf = new scSprite("scsTRlegGf","scs-t-RLeg-gf.gif",10,[165,60],[195,275],"scsTRleg","GfT","MftfScs"); // new leg
setup.SCSL.scsTHeadGf = new scSprite("scsTHeadGf","scs-t-head-gf.gif",100,[64,76],[283,8],"scsTHead","GfT","MftfScs"); // Main character gray female

        // Gray character // Gm -> Gray Male
setup.SCSL.scsTDickGm = new scSprite("scsTDickGm","scs-t-dick-gm.gif",36,[46,63],[320,210],"scsTDick","GmT","MftfScs"); // dick top gray
setup.SCSL.scsTDickGmsmall = new scSprite("scsTDickGmsmall","scs-t-small-dick-gm.gif",36,[46,58],[322,210],"scsTDick","GmT","MftfScs"); // dick top small gray
setup.SCSL.scsTTrunkGm = new scSprite("scsTTrunkGm","scs-t-trunk-gm.gif",10,[110,234],[263,74],"scsTTrunk","GmT","MftfScs");
setup.SCSL.scsTRfingerGm = new scSprite("scsTRfingerGm","scs-t-fingers-gm.gif",110,[20,24],[483,110],"scsTRfinger","GmT","MftfScs"); // new fingers character gray
setup.SCSL.scsTRarmGm = new scSprite("scsTRarmGm","scs-t-rArm-gm.gif",5,[180,75],[337,75],"scsTRarm","GmT","MftfScs");
setup.SCSL.scsTLarmGm = new scSprite("scsTLarmGm","scs-t-lArm-gm.gif",35,[74,201],[236,87],"scsTLarm","GmT","MftfScs");
setup.SCSL.scsTLlegGm = new scSprite("scsTLlegGm","scs-t-lLeg-gm.gif",75,[233,145],[104,209],"scsTLleg","GmT","MftfScs");
setup.SCSL.scsTRlegGm = new scSprite("scsTRlegGm","scs-t-RLeg-gm.gif",10,[165,60],[195,275],"scsTRleg","GmT","MftfScs"); // new leg gray
setup.SCSL.scsTHeadGm = new scSprite("scsTHeadGm","scs-t-head-gm.gif",100,[70,80],[280,18],"scsTHead","GmT","MftfScs"); // Main male gray head

	// Bottom

		// White human
setup.SCSL.scsBDickWh = new scSprite("scsBDickWh","scs-b-dick-wh.gif",37,[53,25],[315,255],"scsBDick","WhB","MftfScs"); // dick bottom 
setup.SCSL.scsBDickWhsmall = new scSprite("scsBDickWhsmall","scs-b-small-dick-wh.gif",35,[53,25],[315,255],"scsBDick","WhB","MftfScs"); // dick bottom small
setup.SCSL.scsBTrunkWh = new scSprite("scsBTrunkWh","scs-b-trunk-wh.gif",30,[268,128],[261,244],"scsBTrunk","WhB","MftfScs");
setup.SCSL.scsBChestWhbig = new scSprite("scsBChestWhbig","scs-b-chest-whBig.gif",45,[110,58],[374,274],"scsBChest","WhB","MftfScs");
setup.SCSL.scsBChestWhmedium = new scSprite("scsBChestWhmedium","scs-b-chest-whMedium.gif",45,[105,51],[378,284],"scsBChest","WhB","MftfScs");
setup.SCSL.scsBChestWhsmall = new scSprite("scsBChestWhsmall","scs-b-chest-whSmall.gif",45,[97,49],[385,286],"scsBChest","WhB","MftfScs");
setup.SCSL.scsBLhandWh = new scSprite("scsBLhandWh","scs-b-hand-wh.gif",90,[78,63],[250,260],"scsBLhand","WhB","MftfScs");
setup.SCSL.scsBLarmdWh = new scSprite("scsBLarmdWh","scs-b-lArm-wh.gif",90,[154,85],[297,291],"scsBLarm","WhB","MftfScs");
setup.SCSL.scsBLlegWh = new scSprite("scsBLlegWh","scs-b-lLeg-wh.gif",15,[186,93],[175,242],"scsBLleg","WhB","MftfScs");
setup.SCSL.scsBRlegWh = new scSprite("scsBRlegWh","scs-b-rLeg-wh.gif",27,[207,280],[318,27],"scsBRleg","WhB","MftfScs");
setup.SCSL.scsBHeadMcy = new scSprite("scsBHeadMcy","scs-b-head-mcy.gif",140,[110,108],[471,272],"scsBHead","McyB","MftfScs"); // Main character yellow
setup.SCSL.scsBHeadMcb = new scSprite("scsBHeadMcb","scs-b-head-mcb.gif",140,[221,108],[364,267],"scsBHead","McbB","MftfScs"); // Main character black
setup.SCSL.scsBHeadMcr = new scSprite("scsBHeadMcr","scs-b-head-mcr.gif",140,[125,125],[469,265],"scsBHead","McrB","MftfScs"); // Main character red

                 // Gray character // Gf -> Gray Female
setup.SCSL.scsBDickGf = new scSprite("scsBDickGf","scs-b-dick-gf.gif",37,[57,30],[315,250],"scsBDick","GfB","MftfScs"); // dick bottom 
setup.SCSL.scsBDickGfsmall = new scSprite("scsBDickGfsmall","scs-b-small-dick-gf.gif",35,[53,25],[315,255],"scsBDick","GfB","MftfScs"); // dick bottom small gray
setup.SCSL.scsBTrunkGf = new scSprite("scsBTrunkGf","scs-b-trunk-gf.gif",30,[268,128],[261,244],"scsBTrunk","GfB","MftfScs");
setup.SCSL.scsBChestGfbig = new scSprite("scsBChestGfbig","scs-b-chest-gfBig.gif",45,[110,58],[374,274],"scsBChest","GfB","MftfScs");
setup.SCSL.scsBChestGfmedium = new scSprite("scsBChestGfmedium","scs-b-chest-gfMedium.gif",45,[105,51],[378,284],"scsBChest","GfB","MftfScs");
setup.SCSL.scsBChestGfsmall = new scSprite("scsBChestGfsmall","scs-b-chest-gfSmall.gif",45,[97,49],[385,286],"scsBChest","GfB","MftfScs");
setup.SCSL.scsBLhandGf = new scSprite("scsBLhandGf","scs-b-lHand-gf.gif",90,[78,63],[250,260],"scsBLhand","GfB","MftfScs");
setup.SCSL.scsBLarmdGf = new scSprite("scsBLarmdGf","scs-b-lArm-gf.gif",90,[154,85],[297,291],"scsBLarm","GfB","MftfScs");
setup.SCSL.scsBLlegGf = new scSprite("scsBLlegGf","scs-b-lLeg-gf.gif",15,[186,93],[175,242],"scsBLleg","GfB","MftfScs");
setup.SCSL.scsBRlegGf = new scSprite("scsBRlegGf","scs-b-rLeg-gf.gif",27,[207,280],[318,27],"scsBRleg","GfB","MftfScs");
setup.SCSL.scsBHeadGf = new scSprite("scsBHeadGf","scs-b-head-gf.gif",140,[110,108],[473,272],"scsBHead","GfB","MftfScs"); // Main character gray head
        
               // Gray character // Gm -> Gray Male
setup.SCSL.scsBDickGm = new scSprite("scsBDickGm","scs-b-dick-gm.gif",37,[57,30],[315,250],"scsBDick","GmB","MftfScs"); // dick bottom gray
setup.SCSL.scsBDickGmsmall = new scSprite("scsBDickGmsmall","scs-b-small-dick-gm.gif",35,[53,25],[315,255],"scsBDick","Gfm","MftfScs"); // dick bottom small gray
setup.SCSL.scsBTrunkGm = new scSprite("scsBTrunkGm","scs-b-trunk-gm.gif",30,[268,128],[261,244],"scsBTrunk","GmB","MftfScs");
setup.SCSL.scsBLhandGm = new scSprite("scsBLhandGm","scs-b-lHand-gm.gif",90,[78,63],[250,260],"scsBLhand","GmB","MftfScs");
setup.SCSL.scsBLarmdGm = new scSprite("scsBLarmdGm","scs-b-lArm-gm.gif",90,[166,93],[297,291],"scsBLarm","GmB","MftfScs");
setup.SCSL.scsBLlegGm = new scSprite("scsBLlegGm","scs-b-lLeg-gm.gif",15,[195,93],[175,242],"scsBLleg","GmB","MftfScs");
setup.SCSL.scsBRlegGm = new scSprite("scsBRlegGm","scs-b-rLeg-gm.gif",27,[207,280],[318,27],"scsBRleg","GmB","MftfScs");
setup.SCSL.scsBHeadGm = new scSprite("scsBHeadGm","scs-b-head-gm.gif",140,[110,93],[470,265],"scsBHead","GmB","MftfScs"); // Main male gray head


// Mount Face to Face, doble penetration // Mftfdp

	// Top
		// White Human // Wh -> White Human

setup.SCSL.dpTTrunkWh = new scSprite("dpTTrunkWh","dp-t-trunk-wh.gif",10,[133,255],[235,64],"dpTTrunk","WhT","Mftfdp"); 
setup.SCSL.dpTChestWhbig = new scSprite("dpTChestWhbig","dp-t-chest-whBig.gif",50,[85,97],[289,96],"dpTChest","WhT","Mftfdp"); // SEPARAR SPRITE MANO DE PECHOS
setup.SCSL.dpTChestWhmedium = new scSprite("dpTChestWhmedium","dp-t-chest-whMed.gif",50,[85,97],[289,96],"dpTChest","WhT","Mftfdp"); // SEPARAR SPRITE MANO DE PECHOS
setup.SCSL.dpTChestWhsmall = new scSprite("dpTChestWhsmall","dp-t-chest-whSmall.gif",50,[79,70],[298,103],"dpTChest","WhT","Mftfdp"); // SEPARAR SPRITE MANO DE PECHOS
setup.SCSL.dpTHandpalmWh = new scSprite("dpTHandpalmWh","dp-t-handpalm-wh.gif",5,[37,63],[295,103],"dpTHandpalm","WhT","Mftfdp"); 
setup.SCSL.dpTRarmWh = new scSprite("dpTRarmWh","dp-t-rArm-wh.gif",60,[202,161],[272,106],"dpTRarm","WhT","Mftfdp"); 
setup.SCSL.dpTRlegWh = new scSprite("dpTRlegWh","dp-t-RLeg-wh.gif",30,[266,180],[306,231],"dpTRleg","WhT","Mftfdp"); // Altered accesorie se ha cambiado la coordenada y el archivo gif de sprite
setup.SCSL.dpTfeetWh = new scSprite("dpTfeetWh","dp-t-feet-wh.gif",0,[70,54],[428,278],"dpTfeet","WhT","Mftfdp"); 

// setup.SCSL.dpTaccTrunkWh = new scSprite("dpTaccTrunkWh","dp-t-acctrunk-wh.gif",10,[132,233],[240,81],"dpTTrunk","WhT","Mftfdp"); // accesorie 

		// Dark Human // Dh -> Dark Human

setup.SCSL.dpTTrunkDh = new scSprite("dpTTrunkDh","dp-t-trunk-dh.gif",10,[133,255],[235,64],"dpTTrunk","DhT","Mftfdp"); // new 
setup.SCSL.dpTChestDhbig = new scSprite("dpTChestDhbig","dp-t-chest-dhBig.gif",50,[85,97],[289,96],"dpTChest","DhT","Mftfdp"); // new
setup.SCSL.dpTChestDhmedium = new scSprite("dpTChestDhmedium","dp-t-chest-dhMed.gif",50,[85,97],[289,96],"dpTChest","DhT","Mftfdp"); // new 
setup.SCSL.dpTChestDhsmall = new scSprite("dpTChestDhsmall","dp-t-chest-dhSmall.gif",50,[79,70],[298,103],"dpTChest","DhT","Mftfdp"); // new
setup.SCSL.dpTHandpalmDh = new scSprite("dpTHandpalmDh","dp-t-handpalm-dh.gif",5,[37,63],[295,103],"dpTHandpalm","DhT","Mftfdp"); // new
setup.SCSL.dpTRarmDh = new scSprite("dpTRarmDh","dp-t-rArm-dh.gif",60,[202,161],[272,106],"dpTRarm","DhT","Mftfdp"); // new
setup.SCSL.dpTRlegDh = new scSprite("dpTRlegDh","dp-t-RLeg-dh.gif",30,[266,180],[306,231],"dpTRleg","DhT","Mftfdp"); // new
setup.SCSL.dpTfeetDh = new scSprite("dpTfeetDh","dp-t-feet-dh.gif",0,[70,54],[428,278],"dpTfeet","DhT","Mftfdp"); // new
setup.SCSL.dpTfingersDh = new scSprite("dpTfingersDh","dp-t-fingers-dh.gif",55,[44,39],[289,96],"dpTfingers","DhT","Mftfdp");

// setup.SCSL.dpTaccTrunkDh = new scSprite("dpTaccTrunkDh","dp-t-trunk-dh.gif",10,[133,254],[235,64],"dpTTrunk","DhT","Mftfdp");

			// Locked bodyparts // Wh
setup.SCSL.dpTlockedRarmWh = new scSprite("dpTlockedRarmWh","dp-t-lockedRarm-wh.gif",60,[161,160],[266,113],"dpTRarm","WhT","Mftfdp"); // accesorie
setup.SCSL.dpTlockedLarmWh = new scSprite("dpTlockedLarmWh","dp-t-lockedLarm-wh.gif",7,[161,139],[246,107],"dpTLarm","WhT","Mftfdp"); // accesorie
setup.SCSL.dpTlockedRlegWh = new scSprite("dpTlockedRlegWh","dp-t-lockedRleg-wh.gif",20,[161,139],[299,207],"dpTRleg","WhT","Mftfdp"); // accesorie
setup.SCSL.dpTlockedLfootWh = new scSprite("dpTlockedLfootWh","dp-t-lockedLfoot-wh.gif",0,[87,82],[388,277],"dpTfeet","WhT","Mftfdp"); // accesorie

			// Locked bodyparts // Dh
setup.SCSL.dpTlockedRarmDh = new scSprite("dpTlockedRarmDh","dp-t-lockedRarm-dh.gif",60,[161,160],[266,113],"dpTRarm","DhT","Mftfdp"); // new R arm for cuffs accesorie
setup.SCSL.dpTlockedLarmDh = new scSprite("dpTlockedLarmDh","dp-t-lockedLarm-dh.gif",7,[161,139],[246,107],"dpTLarm","DhT","Mftfdp"); // new L arm for cuffs accesorie 
setup.SCSL.dpTlockedRlegDh = new scSprite("dpTlockedRlegDh","dp-t-lockedRleg-dh.gif",20,[161,139],[299,207],"dpTRleg","DhT","Mftfdp"); // Alternted new R leg for cuffs accesorie se ha cambiado la prioridad
setup.SCSL.dpTlockedLfootDh = new scSprite("dpTlockedLfootDh","dp-t-lockedLfoot-dh.gif",0,[87,82],[388,277],"dpTfeet","DhT","Mftfdp"); // new L foot for cuffs accesorie



			// Faces // Wh
setup.SCSL.dpTFaceMcy = new scSprite("dpTFaceMcy","dp-t-face-mcy.gif",80,[127,121],[195,9],"dpTFace","McyT","Mftfdp"); // face Main character yellow
setup.SCSL.dpTBangMcy = new scSprite("dpTBangMcy","dp-t-bang-mcy.gif",100,[127,121],[195,9],"dpTBang","McyT","Mftfdp"); // bang Main character yellow
setup.SCSL.dpTHairbaseMcy = new scSprite("dpTHairbaseMcy","dp-t-hairbase-mcy.gif",90,[195,9],[195,9],"dpTHairbase","McyT","Mftfdp"); // hairbase Main character yellow
setup.SCSL.dpTTailMcy = new scSprite("dpTTailMcy","dp-t-tail-mcy.gif",95,[127,121],[195,9],"dpTTail","McyT","Mftfdp"); // tail or bun Main character yellow

setup.SCSL.dpTFaceMcb = new scSprite("dpTFaceMcb","dp-t-face-mcb.gif",80,[127,121],[195,9],"dpTFace","McbT","Mftfdp"); // Main character black
setup.SCSL.dpTBangMcb = new scSprite("dpTBangMcb","dp-t-bang-mcb.gif",100,[127,121],[195,9],"dpTBang","McbT","Mftfdp"); // bang Main character black
setup.SCSL.dpTHairbaseMcb = new scSprite("dpTHairbaseMcb","dp-t-hairbase-mcb.gif",90,[127,121],[195,9],"dpTHairbase","McbT","Mftfdp"); // hairbase Main character black
setup.SCSL.dpTTailMcb = new scSprite("dpTTailMcb","dp-t-tail-mcb.gif",80,[162,296],[132,74],"dpTTail","McbT","Mftfdp"); // tail or bun Main character black

setup.SCSL.dpTFaceMcr = new scSprite("dpTFaceMcr","dp-t-face-mcr.gif",80,[127,121],[195,9],"dpTFace","McrT","Mftfdp"); // Main character red 
setup.SCSL.dpTBangMcr = new scSprite("dpTBangMcr","dp-t-bang-mcr.gif",100,[127,121],[195,4],"dpTBang","McrT","Mftfdp"); // bang Main character red
setup.SCSL.dpTHairbaseMcr = new scSprite("dpTHairbaseMcr","dp-t-hairbase-mcr.gif",90,[150,229],[177,7],"dpTHairbase","McrT","Mftfdp"); // hairbase Main character red
			
			// Faces // Nash
setup.SCSL.dpTFaceDh = new scSprite("dpTFaceDh","dp-t-face-ns.gif",80,[127,120],[195,9],"dpTFace","NsT","Mftfdp"); // new Main character human dark
setup.SCSL.dpTBangDh = new scSprite("dpTBangDh","dp-t-bang-ns.gif",100,[122,159],[243,6],"dpTBang","NsT","Mftfdp"); // new bang Main character human dark
setup.SCSL.dpTHairbaseDh = new scSprite("dpTHairbaseDh","dp-t-hairbase-ns.gif",90,[127,120],[195,7],"dpTHairbase","NsT","Mftfdp"); // new hairbase Main character human dark
setup.SCSL.dpTTailDh = new scSprite("dpTTailDh","dp-t-tail-ns.gif",95,[63,84],[178,24],"dpTTail","NsT","Mftfdp"); // new tail or bun Main character human dark
			
			
			
	     // Gray character // Gf -> Gray Female

setup.SCSL.dpTTrunkGf = new scSprite("dpTTrunkGf","dp-t-trunk-gf.gif",10,[133,255],[235,64],"dpTTrunk","GfT","Mftfdp"); 
setup.SCSL.dpTChestGfbig = new scSprite("dpTChestGfbig","dp-t-chest-gfBig.gif",50,[85,97],[289,96],"dpTChest","GfT","Mftfdp"); // 
setup.SCSL.dpTChestGfmedium = new scSprite("dpTChestGfmedium","dp-t-chest-gfMed.gif",50,[85,97],[289,96],"dpTChest","GfT","Mftfdp"); 
setup.SCSL.dpTChestGfsmall = new scSprite("dpTChestGfsmall","dp-t-chest-gfSmall.gif",50,[79,70],[298,103],"dpTChest","GfT","Mftfdp"); // 
setup.SCSL.dpTHandpalmGf = new scSprite("dpTHandpalmGf","dp-t-handpalm-gf.gif",5,[37,63],[295,103],"dpTHandpalm","GfT","Mftfdp"); 
setup.SCSL.dpTRarmGf = new scSprite("dpTRarmGf","dp-t-rArm-gf.gif",60,[202,161],[272,106],"dpTRarm","GfT","Mftfdp"); 
setup.SCSL.dpTRlegGf = new scSprite("dpTRlegGf","dp-t-RLeg-gf.gif",30,[266,180],[306,231],"dpTRleg","GfT","Mftfdp");  
setup.SCSL.dpTfeetGf = new scSprite("dpTfeetGf","dp-t-feet-gf.gif",0,[70,54],[428,278],"dpTfeet","GfT","Mftfdp"); 
setup.SCSL.dpTHeadGf = new scSprite("dpTHeadGf","dp-t-head-gf.gif",80,[127,121],[195,9],"dpTFace","GfT","Mftfdp"); // Main character gray

// setup.SCSL.dpTaccTrunkGf = new scSprite("dpTaccTrunkGf","dp-t-acctrunk-gf.gif",10,[132,233],[240,81],"dpTTrunk","GfT","Mftfdp"); // accesorie

setup.SCSL.dpTlockedRarmGf = new scSprite("dpTlockedRarmGf","dp-t-lockedRarm-gf.gif",60,[161,160],[266,113],"dpTRarm","GfT","Mftfdp"); // accesorie
setup.SCSL.dpTLaccarmGf = new scSprite("dpTLaccarmGf","dp-t-lockedLarm-gf.gif",7,[161,139],[246,107],"dpTLarm","GfT","Mftfdp"); // accesorie
setup.SCSL.dpTlockedRlegGf = new scSprite("dpTlockedRlegGf","dp-t-lockedRleg-gf.gif",20,[161,139],[299,207],"dpTRleg","GfT","Mftfdp"); // accesorie
setup.SCSL.dpTlockedFeetGf = new scSprite("dpTlockedFeetGf","dp-t-lockedFeet-gf.gif",0,[87,82],[388,277],"dpTfeet","GfT","Mftfdp"); // accesorie

        // Gray character // Gm -> Gray male

setup.SCSL.dpTTrunkGm = new scSprite("dpTTrunkGm","dp-t-trunk-gm.gif",10,[133,254],[235,64],"dpTTrunk","GmT","Mftfdp");
setup.SCSL.dpTHandpalmGm = new scSprite("dpTHandpalmGm","dp-t-handpalm-gm.gif",5,[37,63],[295,103],"dpTHandpalm","GmT","Mftfdp"); 
setup.SCSL.dpTRarmGm = new scSprite("dpTRarmGm","dp-t-rArm-gm.gif",60,[211,160],[264,106],"dpTRarm","GmT","Mftfdp"); 
setup.SCSL.dpTRlegGm = new scSprite("dpTRlegGm","dp-t-RLeg-gf.gif",30,[266,180],[306,231],"dpTRleg","GmT","Mftfdp");
setup.SCSL.dpTfeetGm = new scSprite("dpTfeetGm","dp-t-feet-gf.gif",0,[70,54],[428,278],"dpTfeet","GmT","Mftfdp"); 
setup.SCSL.dpTHeadGm = new scSprite("dpTHeadGm","dp-t-head-gf.gif",80,[127,121],[195,10],"dpTFace","GfT","Mftfdp"); // Main character gray

// setup.SCSL.dpTaccTrunkGm = new scSprite("dpTaccTrunkGm","dp-t-acctrunk-gm.gif",10,[132,233],[240,81],"dpTTrunk","GmT","Mftfdp"); // accesorie

			// Locked bodyparts
setup.SCSL.dpTlockedRarmGm = new scSprite("dpTlockedRarmGm","dp-t-lockedRarm-gf.gif",60,[161,160],[266,113],"dpTRarm","GmT","Mftfdp"); // accesorie
setup.SCSL.dpTlockedLarmGm = new scSprite("dpTlockedLarmGm","dp-t-lockedLarm-gf.gif",7,[161,139],[246,107],"dpTLarm","GmT","Mftfdp"); // accesorie
setup.SCSL.dpTlockedRlegGm = new scSprite("dpTlockedRlegGm","dp-t-lockedRleg-gf.gif",20,[161,139],[299,207],"dpTRleg","GmT","Mftfdp"); // accesorie
setup.SCSL.dpTlockedFeetGm = new scSprite("dpTlockedFeetGm","dp-t-lockedFeet-gf.gif",0,[87,82],[388,277],"dpTfeet","GmT","Mftfdp"); // accesorie


// Equipment parts -> Sprites for equipment that must be used along with body sprites

setup.SCSL.dpTRhandcuffs = new scSprite("dpTRhandcuffs","dp-t-rhandcuffs.gif",62,[59,54],[331,179],"dpTRhandcuffs","BondageT","Mftfdp");
setup.SCSL.dpTRchainhandcuffs = new scSprite("dpTRchainhandcuffs","dp-t-rchainhandcuffs.gif",9,[75,113],[331,179],"dpTRchainhandcuffs","BondageT","Mftfdp");
// setup.SCSL.dpTLhandcuffs = new scSprite("dpTLhandcuffs","dp-t-lhandcuffs.gif",9,[75,110],[319,176],"dpTLhandcuffs","BondageT","Mftfdp"); // Deprecated
setup.SCSL.dpTLhandcuffs = new scSprite("dpTLhandcuffs","dp-t-lhandcuffs.gif",8,[75,110],[329,178],"dpTLhandcuffs1","BondageT","Mftfdp");
setup.SCSL.dpTLchainhandcuffs = new scSprite("dpTLchainhandcuffs","dp-t-lchainhandcuffs.gif",7,[75,110],[319,176],"dpTLhandcuffs2","BondageT","Mftfdp");
setup.SCSL.dpTRfeetcuffs = new scSprite("dpTRfeetcuffs","dp-t-rfeetcuffs.gif",22,[94,68],[382,324],"dpTRfeetcuffs","BondageT","Mftfdp");
setup.SCSL.dpTLfeetcuffs = new scSprite("dpTLfeetcuffs","dp-t-lfeetcuffs.gif",2,[75,110],[375,304],"dpTLfeetcuffs","BondageT","Mftfdp");


// Equipment stand-alones -> Sprites that work on their own without modifying any other bodyparts

setup.SCSL.dpTGag = new scSprite("dpTGag","dp-t-gag.gif",85,[105,80],[228,30],"dpTGag","BondageT","Mftfdp");
setup.SCSL.dpTBlindfold = new scSprite("dpTBlindfold","dp-t-blindfold.gif",95,[92,81],[213,26],"dpTBlindfold","BondageT","Mftfdp");
setup.SCSL.dpTCollar = new scSprite("dpTCollar","dp-t-collar.gif",30,[47,27],[261,85],"dpTCollar","BondageT","Mftfdp");
setup.SCSL.dpTButtplug = new scSprite("dpTButtplug","dp-t-buttplug.gif",14,[47,45],[306,275],"dpTbuttplug","BondageT","Mftfdp");

			// Nipple-suckers
setup.SCSL.dpTRnipSuckersSma = new scSprite("dpTRnipSuckersSma","dp-t-rnipples-sma.gif",55,[33,56],[346,145],"dpLRnipples","BondageT","Mftfdp");
setup.SCSL.dpTLnipSuckersSma = new scSprite("dpTLnipSuckersSma","dp-t-lnipples-sma.gif",55,[39,43],[319,114],"dpTLnipples","BondageT","Mftfdp");
setup.SCSL.dpTLstripNipSuckersSma = new scSprite("dpTLstripNipSuckersSma","dp-t-lstripnipples-sma.gif",45,[39,43],[319,114],"dpTLstripnipples","BondageT","Mftfdp");

setup.SCSL.dpTRnipSuckersMed = new scSprite("dpTRnipSuckersMed","dp-t-rnipples-med.gif",55,[33,56],[346,145],"dpLRnipples","BondageT","Mftfdp");
setup.SCSL.dpTLnipSuckersMed = new scSprite("dpTLnipSuckersMed","dp-t-lnipples-med.gif",55,[39,43],[319,114],"dpTLnipples","BondageT","Mftfdp");
setup.SCSL.dpTLstripNipSuckersMed = new scSprite("dpTLstripNipSuckersMed","dp-t-lstripnipples-med.gif",45,[39,43],[319,114],"dpTLstripnipples","BondageT","Mftfdp");

setup.SCSL.dpTRnipSuckersBig = new scSprite("dpTRnipSuckersBig","dp-t-rnipples-big.gif",55,[33,56],[346,145],"dpLRnipples","BondageT","Mftfdp");
setup.SCSL.dpTLnipSuckersBig = new scSprite("dpTLnipSuckersBig","dp-t-lnipples-big.gif",55,[39,43],[319,114],"dpTLnipples","BondageT","Mftfdp");
setup.SCSL.dpTLstripNipSuckersBig = new scSprite("dpTLstripNipSuckersBig","dp-t-lstripnipples-big.gif-sma.gif",45,[39,43],[319,114],"dpTLstripnipples","BondageT","Mftfdp");

setup.SCSL.dpTRnipSuckersFla = new scSprite("dpTRnipSuckersFla","dp-t-rnipples-fla.gif",30,[33,56],[46,145],"dpLRnipples","BondageT","Mftfdp");


	// Bottom	
		// White human
		
// Deprecated. No more big dicks
// setup.SCSL.dpBDoubledickWh = new scSprite("dpBDoubledickWh","dp-b-dobledicks-wh.gif",15,[61,107],[304,262],"dpBdicks","WhB","Mftfdp"); // doble dicks bottom 
// setup.SCSL.dpBDoubledickWhsmall = new scSprite("dpBDoubledickWhsmall","dp-b-dobledicks-whSmall.gif",15,[53,25],[315,255],"dpBdicks","WhB","Mftfdp"); // doble dicks bottom small 
// setup.SCSL.dpBPussydickWh = new scSprite("dpBPussydickWh","dp-b-pussydick-wh.gif",14,[61,107],[304,262],"dpBdicks","WhB","Mftfdp"); // pussy dick bottom 
// setup.SCSL.dpBAnaldickWh = new scSprite("dpBAnaldickWh","dp-b-analdick-wh.gif",15,[61,107],[304,262],"dpBdicks","WhB","Mftfdp"); // anal dick bottom 

setup.SCSL.dpBPussydickWhsmall = new scSprite("dpBPussydickWhsmall","dp-b-pussydick-whSmall.gif",14,[61,107],[304,260],"dpBpussyDick","WhB","Mftfdp"); /// Altered sprite
setup.SCSL.dpBAnaldickWhsmall = new scSprite("dpBAnaldickWhsmall","dp-b-analdick-whSmall.gif",15,[61,107],[307,264],"dpBanalDick","WhB","Mftfdp"); /// Altered coordenada y sprite

setup.SCSL.dpBTrunklegWh = new scSprite("dpBTrunklegWh","dp-b-trunkleg-wh.gif",3,[366,291],[87,102],"dpBTrunkleg","WhB","Mftfdp"); 
setup.SCSL.dpBChestWhbig = new scSprite("dpBChestWhbig","dp-b-chest-whBig.gif",5,[85,97],[322,157],"dpBChest","WhB","Mftfdp"); 
setup.SCSL.dpBChestWhmedium = new scSprite("dpBChestWhmedium","dp-b-chest-whMed.gif",5,[85,97],[322,157],"dpBChest","WhB","Mftfdp"); 
setup.SCSL.dpBChestWhsmall = new scSprite("dpBChestWhsmall","dp-b-chest-whSmall.gif",5,[85,97],[322,157],"dpBChest","WhB","Mftfdp"); 
setup.SCSL.dpBLhandWh = new scSprite("dpBLhandWh","dp-b-lhand-wh.gif",11,[62,109],[265,219],"dpBLhand","WhB","Mftfdp"); 
setup.SCSL.dpBRarmWh = new scSprite("dpBRarmWh","dp-b-rarm-wh.gif",50,[62,109],[412,149],"dpBRarm","WhB","Mftfdp"); 
setup.SCSL.dpBRforearmWh = new scSprite("dpBRforearmWh","dp-b-rforearm-wh.gif",90,[197,96],[274,176],"dpBRforearm","WhB","Mftfdp"); 
setup.SCSL.dpBLforearmWh = new scSprite("dpBLforearmWh","dp-b-lforearm-wh.gif",2,[78,45],[272,225],"dpBLforeamarm","WhB","Mftfdp"); 
setup.SCSL.dpBRlegWh = new scSprite("dpBRlegWh","dp-b-rLeg-wh.gif",23,[165,97],[261,302],"dpBRleg","WhB","Mftfdp"); 

		// Dark human

// Deprecated. No more big dicks
// setup.SCSL.dpBDobledickDh = new scSprite("dpBDobledickDh","dp-b-dobledicks-dh.gif",15,[61,107],[304,262],"dpBdicks","DhB","Mftfdp"); // new 
// setup.SCSL.dpBDobledickDhsmall = new scSprite("dpBDobledickDhsmall","dp-b-dobledicks-dhSmall.gif",15,[53,25],[315,255],"dpBdicks","DhB","Mftfdp"); // new
// setup.SCSL.dpBPussydickDh = new scSprite("dpBPussydickDh","dp-b-pussydick-dh.gif",15,[61,107],[304,262],"dpBdicks","DhB","Mftfdp"); // new
// setup.SCSL.dpBAnaldickDh = new scSprite("dpBAnaldickDh","dp-b-analdick-dh.gif",15,[61,107],[304,262],"dpBdicks","DhB","Mftfdp"); // new

setup.SCSL.dpBPussydickDhsmall = new scSprite("dpBPussydickDhsmall","dp-b-pussydick-dhSmall.gif",15,[61,107],[304,260],"dpBpussyDick","DhB","Mftfdp"); // new
setup.SCSL.dpBAnaldickDhsmall = new scSprite("dpBAnaldickDhsmall","dp-b-analdick-dhSmall.gif",15,[61,107],[307,264],"dpBanalDick","DhB","Mftfdp"); // new

setup.SCSL.dpBTrunklegDh = new scSprite("dpBTrunklegDh","dp-b-trunkleg-dh.gif",3,[366,291],[87,102],"dpBTrunkleg","DhB","Mftfdp"); // new
setup.SCSL.dpBChestDhbig = new scSprite("dpBChestDhbig","dp-b-chest-dhBig.gif",5,[85,97],[322,157],"dpBChest","DhB","Mftfdp"); // new
setup.SCSL.dpBChestDhmedium = new scSprite("dpBChestDhmedium","dp-b-chest-dhMed.gif",5,[85,97],[322,157],"dpBChest","DhB","Mftfdp"); // new
setup.SCSL.dpBChestDhsmall = new scSprite("dpBChestDhsmall","dp-b-chest-dhSmall.gif",5,[85,97],[322,157],"dpBChest","DhB","Mftfdp"); // new
setup.SCSL.dpBLhandDh = new scSprite("dpBLhandDh","dp-b-lhand-dh.gif",11,[62,109],[265,219],"dpBLhand","DhB","Mftfdp"); // new
setup.SCSL.dpBRarmdDh = new scSprite("dpBRarmdDh","dp-b-rarm-dh.gif",50,[62,109],[412,149],"dpBRarm","DhB","Mftfdp"); // new
setup.SCSL.dpBRforearmDh = new scSprite("dpBRforearmDh","dp-b-rforearm-dh.gif",90,[197,96],[274,176],"dpBRforearm","DhB","Mftfdp"); // new
setup.SCSL.dpBLforearmDh = new scSprite("dpBLforearmDh","dp-b-lforearm-dh.gif",2,[78,45],[272,225],"dpBLforeamarm","DhB","Mftfdp");
setup.SCSL.dpBRlegDh = new scSprite("dpBRlegDh","dp-b-rLeg-dh.gif",23,[165,97],[261,302],"dpBRleg","DhB","Mftfdp"); // new

		// Alt Body Sprites // Wh
setup.SCSL.dpBlockedLarmWh = new scSprite("dpBlockedLarmWh","dp-b-lockedLarm-wh.gif",8,[190,139],[233,143],"dpBLarm","WhB","Mftfdp");
setup.SCSL.dpBlockedRarmWh = new scSprite("dpBlockedRarmWh","dp-b-lockedRarm-wh.gif",50,[190,139],[266,147],"dpBRarm","WhB","Mftfdp");
setup.SCSL.dpBlockedRforearmWh = new scSprite("dpBlockedRforearmWh","dp-b-lockedRforearm-wh.gif",90,[190,139],[266,147],"dpBRforearm","WhB","Mftfdp");
							// Dh
setup.SCSL.dpBlockedLarmDh = new scSprite("dpBlockedLarmDh","dp-b-lockedLarm-dh.gif",8,[104,117],[233,143],"dpBRarm","DhB","Mftfdp"); // new L hand+arm for cuffs accesorie 
setup.SCSL.dpBlockedRarmDh = new scSprite("dpBlockedRarmDh","dp-b-lockedRarm-dh.gif",50,[190,139],[266,147],"dpBLarm","DhB","Mftfdp"); // new R arm for cuffs accesorie
setup.SCSL.dpBlockedRforearmDh = new scSprite("dpBlockedRforearmDh","dp-b-lockedRforearm-dh.gif",90,[190,139],[266,147],"dpBRforearm","DhB","Mftfdp"); // new R forearm for cuffs accesorie

		// Faces // Wh
setup.SCSL.dpBFaceMcy = new scSprite("dpBFaceMcy","dp-b-face-mcy.gif",90,[108,97],[340,40],"dpBFace","McyB","Mftfdp"); // face Main character yellow
setup.SCSL.dpBBangMcy = new scSprite("dpBBangMcy","dp-b-bang-mcy.gif",100,[110,116],[340,40],"dpBBang","McyB","Mftfdp"); // bang Main character yellow
setup.SCSL.dpBHairbaseMcy = new scSprite("dpBHairbaseMcy","dp-b-hairbase-mcy.gif",2,[110,116],[340,40],"dpBHairbase","McyB","Mftfdp"); // hairbase Main character yellow
setup.SCSL.ddpBHeadMcy = new scSprite("ddpBHeadMcy","dp-b-head-mcy.gif",140,[110,116],[339,33],"ddpBHead","McyB","Mftfddp"); // Main character yellow // Deprecated?

setup.SCSL.dpBFaceMcb = new scSprite("dpBFaceMcb","dp-b-face-mcb.gif",90,[108,97],[340,40],"dpBFace","McbB","Mftfdp"); // Main character black
setup.SCSL.dpBBangMcb = new scSprite("dpBBangMcb","dp-b-bang-mcb.gif",100,[108,97],[327,40],"dpBBang","McbB","Mftfdp"); // bang Main character black
setup.SCSL.dpBHairbaseMcb = new scSprite("dpBHairbaseMcb","dp-b-hairbase-mcb.gif",5,[108,97],[340,40],"dpBHairbase","McbB","Mftfdp"); // hairbase Main character black
setup.SCSL.dpBTailMcb = new scSprite("dpBTailMcb","dp-b-tail-mcb.gif",2,[251,301],[271,60],"dpBTail","McbB","Mftfdp"); // tail or bun Main character black
setup.SCSL.ddpBTailMcb = new scSprite("ddpBTailMcb","dp-b-tail-mcb.gif",1,[183,294],[363,48],"ddpBTail","McbB","Mftfddp"); // Tail hair dark character 
setup.SCSL.ddpBHeadMcb = new scSprite("ddpBHeadMcb","dp-b-head-mcb.gif",140,[108,97],[333,39],"ddpBHead","McbB","Mftfddp"); // Main character black // Deprecated?

setup.SCSL.dpBFaceMcr = new scSprite("dpBFaceMcr","dp-b-face-mcr.gif",90,[108,97],[340,40],"dpBFace","McrB","Mftfdp"); // Main character red 
setup.SCSL.dpBBangMcr = new scSprite("dpBBangMcr","dp-b-bang-mcr.gif",100,[110,116],[340,40],"dpBBang","McrB","Mftfdp"); // bang Main character red
setup.SCSL.dpBHairbaseMcr = new scSprite("dpBHairbaseMcr","dp-b-hairbase-mcr.gif",2,[150,229],[344,34],"dpBHairbase","McrB","Mftfdp"); // Altered se ha cambiado el GIF de sprite hairbase Main character red y coordenadas
setup.SCSL.ddpBTailMcr = new scSprite("ddpBTailMcr","dp-t-tail-mcr.gif",1,[146,229],[344,34],"ddpBTail","McrB","Mftfddp"); // Tails hair red character
setup.SCSL.ddpBHeadMcr = new scSprite("ddpBHeadMcr","dp-b-head-mcr.gif",140,[92,97],[340,40],"ddpBHead","McrB","Mftfddp"); // Main character red  // Deprecated?

		// Faces // Nash
setup.SCSL.dpBFaceDh = new scSprite("dpBFaceDh","dp-b-face-ns.gif",90,[108,97],[340,40],"dpBFace","NsB","Mftfdp"); // new Main character human dark
setup.SCSL.dpBBangDh = new scSprite("dpBBangDh","dp-b-bang-ns.gif",100,[100,156],[339,43],"dpBBang","NsB","Mftfdp"); // new bang Main character human dark
setup.SCSL.dpBHairbaseDh = new scSprite("dpBHairbaseDh","dp-b-hairbase-ns.gif",2,[120,164],[332,33],"dpBHairbase","NsB","Mftfdp"); // new hairbase Main character human dark
setup.SCSL.dpBSidehairDh = new scSprite("dpBSidehairDh","dp-b-sidehair-ns.gif",1,[67,156],[330,43],"dpBSidehair","NsB","Mftfdp"); // new side hair Main character human dark

	// Gray character // Gf -> Gray Female

// Deprecated. No more big dicks
//setup.SCSL.dpBDobledickGf = new scSprite("dpBDobledickGf","dp-b-dobledicks-gf.gif",15,[61,107],[304,262],"dpBdicks","GfB","Mftfdp"); // doble dicks bottom gray
//setup.SCSL.dpBDobledickGfsmall = new scSprite("dpBDobledickGfsmall","dp-b-dobledicks-gfSmall.gif",15,[53,25],[315,255],"dpBdicks","GfB","Mftfdp"); // doble dicks bottom small gray
//setup.SCSL.dpBBPussydickGf = new scSprite("dpBBPussydickGf","dp-b-pussydick-gf.gif",14,[61,107],[304,262],"dpBdicks","GfB","Mftfdp"); // pussy front dick bottom gray
//setup.SCSL.dpBAnaldickGf = new scSprite("dpBAnaldickGf","dp-b-analdick-gf.gif",15,[61,107],[304,262],"dpBdicks","GfB","Mftfdp"); // anal back dick bottom gray
setup.SCSL.dpBBPussydickGfsmall = new scSprite("dpBBPussydickGfsmall","dp-b-pussydick-gfSmall.gif",14,[61,107],[304,260],"dpBpussyDick","GfB","Mftfdp"); // pussy front dick bottom gray
setup.SCSL.dpBAnaldickGfsmall = new scSprite("dpBAnaldickGfsmall","dp-b-analdick-gfSmall.gif",15,[61,107],[307,264],"dpBanalDick","GfB","Mftfdp"); // anal back dick bottom gray

setup.SCSL.dpBTrunklegGf = new scSprite("dpBTrunklegGf","dp-b-trunkleg-gf.gif",3,[366,291],[87,102],"dpBTrunkleg","GfB","Mftfdp"); 
setup.SCSL.dpBChestGfbig = new scSprite("dpBChestGfbig","dp-b-chest-gfBig.gif",5,[85,97],[322,157],"dpBChest","GfB","Mftfdp"); 
setup.SCSL.dpBChestGfmedium = new scSprite("dpBChestGfmedium","dp-b-chest-gfMed.gif",5,[85,97],[322,157],"dpBChest","GfB","Mftfdp"); 
setup.SCSL.dpBChestGfsmall = new scSprite("dpBChestGfsmall","dp-b-chest-gfSmall.gif",5,[85,97],[322,157],"dpBChest","GfB","Mftfdp"); 
setup.SCSL.dpBLhandGf = new scSprite("dpBLhandGf","dp-b-lhand-gf.gif",90,[62,109],[265,219],"dpBLhand","GfB","Mftfdp"); 
setup.SCSL.dpBRarmGf = new scSprite("dpBRarmGf","dp-b-rarm-gf.gif",50,[62,109],[412,149],"dpBRarm","GfB","Mftfdp"); 
setup.SCSL.dpBRforearmGf = new scSprite("dpBRforearmGf","dp-b-rforearm-gf.gif",90,[197,96],[274,176],"dpBRforearm","GfB","Mftfdp"); 
setup.SCSL.dpBLforearmGf = new scSprite("dpBLforearmGf","dp-b-lforearm-gf.gif",2,[78,45],[272,225],"dpBLforeamarm","GfB","Mftfdp"); 
setup.SCSL.dpBRlegGf = new scSprite("dpBRlegGf","dp-b-rLeg-gf.gif",23,[165,97],[261,302],"dpBRleg","GfB","Mftfdp"); 
setup.SCSL.dpBHeadGf = new scSprite("dpBHeadGf","dp-b-head-gf.gif",90,[108,97],[332,42],"dpBFace","GfB","Mftfdp"); // Main character gray

		// Alt Body Sprites
setup.SCSL.dpBlockedLarmGf = new scSprite("dpBlockedLarmGf","dp-b-lockedLarm.gif",8,[190,139],[233,143],"dpBLarm","GfB","Mftfdp"); // accesorie 
setup.SCSL.dpBlockedRarmGf = new scSprite("dpBlockedRarmGf","dp-b-lockedRarm-gf.gif",50,[190,139],[266,147],"dpBRarm","GfB","Mftfdp"); // accesorie 
setup.SCSL.dpBRlockedRforearmGf = new scSprite("dpBRlockedRforearmGf","dp-b-lockedRforearm-gf.gif",90,[190,139],[266,147],"dpBRforearm","GfB","Mftfdp");



        // Gray character // Gm -> Gray male

// Deprecated. No more big dicks
//setup.SCSL.dpBDobledickGm = new scSprite("dpBDobledickGm","dp-b-dobledicks-gm.gif",15,[61,107],[304,262],"dpBdicks","GmB","Mftfdp"); // doble dicks bottom gray
//setup.SCSL.dpBDobledickGmsmall = new scSprite("dpBDobledickGmsmall","dp-b-dobledicks-gmSmall.gif",15,[53,25],[315,255],"dpBdicks","GmB","Mftfdp"); // doble dicks bottom small gray
//setup.SCSL.dpBPussydickGm = new scSprite("dpBPussydickGm","dp-b-pussydick-gm.gif",14,[61,107],[304,262],"dpBdicks","GmB","Mftfdp"); // pussy front dick bottom gray
//setup.SCSL.dpBAnaldickGm = new scSprite("dpBAnaldickGm","dp-b-analdick-gm.gif",15,[61,107],[304,262],"dpBdicks","GmB","Mftfdp"); // anal back dick bottom gray

setup.SCSL.dpBPussydickGmsmall = new scSprite("dpBPussydickGmsmall","dp-b-pussydick-gfSmall.gif",14,[61,107],[304,260],"dpBpussyDick","GmB","Mftfdp"); // pussy front dick bottom gray
setup.SCSL.dpBAnaldickGmsmall = new scSprite("dpBAnaldickGmsmall","dp-b-analdick-gfSmall.gif",15,[61,107],[307,264],"dpBanalDick","GmB","Mftfdp"); // anal back dick bottom gray

setup.SCSL.dpBTrunklegGm = new scSprite("dpBTrunklegGm","dp-b-trunkleg-gm.gif",3,[366,291],[87,102],"dpBTrunkleg","GmB","Mftfdp"); 
setup.SCSL.dpBLhandGm = new scSprite("dpBLhandGm","dp-b-lhand-gf.gif",90,[62,109],[265,219],"dpBLhand","GmB","Mftfdp"); 
setup.SCSL.dpBRarmGm = new scSprite("dpBRarmGm","dp-b-rarm-gf.gif",50,[62,109],[412,149],"dpBRarm","GmB","Mftfdp"); 
setup.SCSL.dpBRforearmGm = new scSprite("dpBRforearmGm","dp-b-rforearm-gf.gif",90,[197,96],[274,176],"dpBRforearm","GmB","Mftfdp");
setup.SCSL.dpBLforearmGm = new scSprite("dpBLforearmGm","dp-b-lforearm-gf.gif",2,[78,45],[272,225],"dpBLforeamarm","GmB","Mftfdp");  
setup.SCSL.dpBRlegGm = new scSprite("dpBRlegGm","dp-b-rLeg-gf.gif",23,[165,97],[261,302],"dpBRleg","GmB","Mftfdp"); 
setup.SCSL.dpBHeadGm = new scSprite("dpBHeadGm","dp-b-head-gf.gif",90,[108,97],[332,42],"dpBFace","GmB","Mftfdp"); // Main character gray

		// Alt Body Sprites
setup.SCSL.dpBlockedLarmGm = new scSprite("dpBlockedLarmGm","dp-b-lockedLarm-gf.gif",8,[104,117],[233,143],"dpBLarm","GmB","Mftfdp"); 
setup.SCSL.dpBlockedRarmGm = new scSprite("dpBlockedRarmGm","dp-b-lockedRarm-gm.gif",50,[190,139],[266,147],"dpBRarm","GmB","Mftfdp"); // Altered se ha cambiado las coordenadas y el sprite
setup.SCSL.dpBlockedRforearmGm = new scSprite("dpBlockedRforearmGm","dp-b-lockedRforearm-gm.gif",90,[190,139],[266,147],"dpBRforearm","GmB","Mftfdp");

// Equipment parts -> Sprites for equipment that must be used along with body sprites

setup.SCSL.dpBRhandcuffs = new scSprite("dpBRhandcuffs","dp-b-rhandcuffs.gif",100,[71,109],[274,193],"dpBRhandcuffs","BondageB","Mftfdp"); 
setup.SCSL.dpBLhandcuffs = new scSprite("dpBLhandcuffs","dp-b-lhandcuffs.gif",9,[56,113],[261,186],"dpBLhandcuffs","BondageB","Mftfdp");
setup.SCSL.dpBLchainhandcuffs = new scSprite("dpBLchainhandcuffs","dp-b-lchainhandcuffs.gif",13,[56,113],[261,186],"dpBLchainhandcuffs","BondageB","Mftfdp"); 

// Equipment stand-alones -> Sprites that work on their own without modifying any other bodyparts

setup.SCSL.dpBnippless = new scSprite("dpBnippless","dp-b-nipples.gif",8,[97,72],[316,195],"dpBnipples","BondageB","Mftfdp");
setup.SCSL.dpBGag = new scSprite("dpBGag","dp-b-gag.gif",92,[62,37],[354,94],"dpBGag","BondageB","Mftfdp");
setup.SCSL.dpBBlindfold = new scSprite("dpBBlindfold","dp-b-blindfold.gif",93,[92,49],[351,66],"dpBBlindfold","BondageB","Mftfdp");
setup.SCSL.dpBCollar = new scSprite("dpBCollar","dp-b-collar.gif",30,[40,22],[368,131],"dpBCollar","BondageB","Mftfdp");



// Mount Face to Face, doble dildo penetration // Mftfddp

	// Top
		// White Human // Wh -> White Human ; Mcy -> Main Character Yellow

setup.SCSL.ddpTTrunkWh = new scSprite("ddpTTrunkWh","dp-t-trunk-wh.gif",10,[133,255],[235,64],"ddpTTrunk","WhT","Mftfddp"); 
setup.SCSL.ddpTChestWhbig = new scSprite("ddpTChestWhbig","dp-t-chest-whBig.gif",50,[85,97],[289,96],"ddpTChest","WhT","Mftfddp"); // 
setup.SCSL.ddpTChestWhmedium = new scSprite("ddpTChestWhmedium","dp-t-chest-whMed.gif",50,[85,97],[289,96],"ddpTChest","WhT","Mftfddp"); 
setup.SCSL.ddpTChestWhsmall = new scSprite("ddpTChestWhsmall","dp-t-chest-whSmall.gif",50,[79,70],[298,103],"ddpTChest","WhT","Mftfddp"); // 
setup.SCSL.ddpTHanddpalmWh = new scSprite("ddpTHanddpalmWh","dp-t-handpalm-wh.gif",5,[37,63],[302,108],"ddpTHanddpalm","WhT","Mftfddp"); 
setup.SCSL.ddpTRarmWh = new scSprite("ddpTRarmWh","dp-t-rArm-wh.gif",60,[202,161],[272,106],"ddpTRarm","WhT","Mftfddp"); 
setup.SCSL.ddpTRlegWh = new scSprite("ddpTRlegWh","dp-t-RLeg-wh.gif",30,[266,180],[306,232],"ddpTRleg","WhT","Mftfddp"); 
setup.SCSL.ddpTfeetWh = new scSprite("ddpTfeetWh","dp-t-feet-wh.gif",0,[70,54],[428,278],"ddpTfeet","WhT","Mftfddp"); 
setup.SCSL.ddpTHeadMcy = new scSprite("ddpTHeadMcy","dp-t-head-mcy.gif",100,[127,121],[195,9],"ddpTHead","McyT","Mftfddp"); // Main character yellow
setup.SCSL.ddpTHeadMcb = new scSprite("ddpTHeadMcb","dp-t-head-mcb.gif",100,[182,353],[140,7],"ddpTHead","McbT","Mftfddp"); // Main character black
setup.SCSL.ddpTHeadMcr = new scSprite("ddpTHeadMcr","dp-t-head-mcr.gif",100,[150,229],[177,7],"ddpTHead","McrT","Mftfddp"); // Main character red 

	     // Gray character // Gf -> Gray Female

setup.SCSL.ddpTTrunkGf = new scSprite("ddpTTrunkGf","dp-t-trunk-gf.gif",10,[133,255],[235,64],"ddpTTrunk","GfT","Mftfddp"); 
setup.SCSL.ddpTChestGfbig = new scSprite("ddpTChestGfbig","dp-t-chest-gfBig.gif",50,[85,97],[289,96],"ddpTChest","GfT","Mftfddp"); // 
setup.SCSL.ddpTChestGfmedium = new scSprite("ddpTChestGfmedium","dp-t-chest-gfMed.gif",50,[85,97],[289,96],"ddpTChest","GfT","Mftfddp"); 
setup.SCSL.ddpTChestGfsmall = new scSprite("ddpTChestGfsmall","dp-t-chest-gfSmall.gif",50,[79,70],[298,103],"ddpTChest","GfT","Mftfddp"); // 
setup.SCSL.ddpTHanddpalmGf = new scSprite("ddpTHanddpalmGf","dp-t-handpalm-gf.gif",5,[37,63],[302,108],"ddpTHanddpalm","GfT","Mftfddp"); 
setup.SCSL.ddpTRarmGf = new scSprite("ddpTRarmGf","dp-t-rArm-gf.gif",60,[202,161],[272,106],"ddpTRarm","GfT","Mftfddp"); 
setup.SCSL.ddpTRlegGf = new scSprite("ddpTRlegGf","dp-t-RLeg-gf.gif",30,[266,180],[306,232],"ddpTRleg","GfT","Mftfddp"); 
setup.SCSL.ddpTfeetGf = new scSprite("ddpTfeetGf","dp-t-feet-gf.gif",0,[70,54],[428,278],"ddpTfeet","GfT","Mftfddp"); 
setup.SCSL.ddpTHeadGf = new scSprite("ddpTHeadGf","dp-t-head-gf.gif",100,[127,121],[195,9],"ddpTHead","GfT","Mftfddp"); // Main character gray

            // Gray character // Gm -> Gray male

setup.SCSL.ddpTTrunkGm = new scSprite("ddpTTrunkGm","dp-t-trunk-gm.gif",10,[133,254],[235,64],"ddpTTrunk","GmT","Mftfddp");
setup.SCSL.ddpTHanddpalmGm = new scSprite("ddpTHanddpalmGm","dp-t-handpalm-gf.gif",5,[37,63],[302,108],"ddpTHanddpalm","GmT","Mftfddp"); 
setup.SCSL.ddpTRarmGm = new scSprite("ddpTRarmGm","dp-t-rArm-gm.gif",60,[211,160],[264,106],"ddpTRarm","GmT","Mftfddp"); 
setup.SCSL.ddpTRlegGm = new scSprite("ddpTRlegGm","dp-t-RLeg-gf.gif",30,[266,180],[306,232],"ddpTRleg","GmT","Mftfddp"); 
setup.SCSL.ddpTfeetGm = new scSprite("ddpTfeetGm","dp-t-feet-gf.gif",0,[70,54],[428,278],"ddpTfeet","GmT","Mftfddp"); 
setup.SCSL.ddpTHeadGm = new scSprite("ddpTHeadGm","dp-t-head-gf.gif",100,[127,121],[195,9],"ddpTHead","GmT","Mftfddp"); // Main character gray

	// Bottom 
		// White human

setup.SCSL.ddpBDildoWh = new scSprite("ddpBDildoWh","ddp-b-dildo.gif",15,[61,107],[304,262],"ddpBDildo","WhB","Mftfddp"); // dildo

setup.SCSL.ddpBTrunklegarmWh = new scSprite("ddpBTrunklegarmWh","ddp-b-trunklegarm-wh.gif",3,[356,291],[95,102],"ddpBTrunkleg","WhB","Mftfddp"); 
setup.SCSL.ddpBFingersWh = new scSprite("ddpBFingersWh","ddp-b-lfingers-wh.gif",100,[51,55],[292,295],"ddpBFingers","WhB","Mftfddp");

setup.SCSL.ddpBChestWhbig = new scSprite("ddpBChestWhbig","dp-b-chest-whBig.gif",5,[85,97],[322,157],"ddpBChest","WhB","Mftfddp"); // 
setup.SCSL.ddpBChestWhmedium = new scSprite("ddpBChestWhmedium","dp-b-chest-whMed.gif",5,[85,97],[322,157],"ddpBChest","WhB","Mftfddp"); 
setup.SCSL.ddpBChestWhsmall = new scSprite("ddpBChestWhsmall","dp-b-chest-whSmall.gif",5,[85,97],[322,157],"ddpBChest","WhB","Mftfddp"); // 
setup.SCSL.ddpBRarmdWh = new scSprite("ddpBRarmdWh","dp-b-rarm-wh.gif",50,[62,109],[412,149],"ddpBRarm","WhB","Mftfddp"); 
setup.SCSL.ddpBRforearmWh = new scSprite("ddpBRforearmWh","dp-b-rforearm-wh.gif",90,[197,96],[274,176],"ddpBRforearm","WhB","Mftfddp"); 
setup.SCSL.ddpBRlegWh = new scSprite("ddpBRlegWh","dp-b-rLeg-wh.gif",20,[165,97],[261,302],"ddpBRleg","WhB","Mftfddp"); 

// Gray character // Gf -> Gray Female

setup.SCSL.ddpBDildoGf = new scSprite("ddpBDildoGf","ddp-b-dildo.gif",15,[61,107],[304,262],"ddpBDildo","GfB","Mftfddp"); // dildo gray

setup.SCSL.ddpBTrunklegarmGf = new scSprite("ddpBTrunklegarmGf","ddp-b-trunklegarm-gf.gif",3,[356,291],[95,102],"ddpBTrunkleg","GfB","Mftfddp"); 
setup.SCSL.ddpBFingersGf = new scSprite("ddpBFingersGf","ddp-b-lfingers-gf.gif",100,[51,55],[292,295],"ddpBFingers","GfB","Mftfddp"); 

setup.SCSL.ddpBChestGfbig = new scSprite("ddpBChestGfbig","dp-b-chest-gfBig.gif",5,[85,97],[322,157],"ddpBChest","GfB","Mftfddp"); // 
setup.SCSL.ddpBChestGfmedium = new scSprite("ddpBChestGfmedium","dp-b-chest-gfMed.gif",5,[85,97],[322,157],"ddpBChest","GfB","Mftfddp"); 
setup.SCSL.ddpBChestGfsmall = new scSprite("ddpBChestGfsmall","dp-b-chest-gfSmall.gif",5,[85,97],[322,157],"ddpBChest","GfB","Mftfddp"); // 
setup.SCSL.ddpBRarmGf = new scSprite("ddpBRarmGf","dp-b-rarm-gf.gif",50,[62,109],[412,149],"ddpBRarm","GfB","Mftfddp"); 
setup.SCSL.ddpBRforearmGf = new scSprite("ddpBRforearmGf","dp-b-rforearm-gf.gif",90,[197,96],[274,176],"ddpBRforearm","GfB","Mftfddp"); 
setup.SCSL.ddpBRlegGf = new scSprite("ddpBRlegGf","dp-b-rLeg-gf.gif",20,[165,97],[261,302],"ddpBRleg","GfB","Mftfddp"); 
setup.SCSL.ddpBHeadGf = new scSprite("ddpBHeadGf","dp-b-head-gf.gif",140,[108,97],[332,42],"ddpBHead","GfB","Mftfddp"); // Main character gray

        // Gray character // Gm -> Gray male

setup.SCSL.ddpBDildoGm = new scSprite("ddpBDildoGm","ddp-b-dildo.gif",15,[61,107],[304,262],"ddpBDildo","GmB","Mftfddp"); // dildo gray

setup.SCSL.ddpBTrunklegarmGm = new scSprite("ddpBTrunklegarmGm","ddp-b-trunklegarm-gf.gif",3,[356,291],[95,102],"ddpBTrunkleg","GmB","Mftfddp"); 
setup.SCSL.ddpBFingersGm = new scSprite("ddpBFingersGm","ddp-b-lfingers-gf.gif",100,[51,55],[292,295],"ddpBFingers","GmB","Mftfddp"); 

setup.SCSL.ddpBRarmdGm = new scSprite("ddpBRarmdGm","dp-b-rarm-gm.gif",50,[62,109],[407,149],"ddpBRarm","GmB","Mftfddp"); 
setup.SCSL.ddpBRforearmGm = new scSprite("ddpBRforearmGm","dp-b-rforearm-gm.gif",90,[197,96],[274,176],"ddpBRforearm","GmB","Mftfddp"); 
setup.SCSL.ddpBRlegGm = new scSprite("ddpBRlegGm","dp-b-rLeg-gm.gif",20,[165,97],[261,302],"ddpBRleg","GmB","Mftfddp"); 
setup.SCSL.ddpBHeadGm = new scSprite("ddpBHeadGm","dp-b-head-gf.gif",140,[108,97],[332,42],"ddpBHead","GmB","Mftfddp"); // Main character gray

//////////////////

// Mount From Behind // Mfb

	// Top
		// White Human // Wh -> White Human ; Mcy -> Main Character Yellow

setup.SCSL.mfbTTrunkWh = new scSprite("mfbTTrunkWh","mfb-t-trunklengs-wh.gif",2,[166,290],[322,44],"mfbTTrunk","WhT","mfb");
setup.SCSL.mfbTChestWhbig = new scSprite("mfbTChestWhbig","mfb-t-chest-whBig.gif",50,[69,73],[323,89],"mfbTChest","WhT","mfb");
setup.SCSL.mfbTChestWhmedium = new scSprite("mfbTChestWhmedium","mfb-t-chest-whMed.gif",50,[69,73],[323,89],"mfbTChest","WhT","mfb");
setup.SCSL.mfbTChestWhsmall = new scSprite("mfbTChestWhsmall","mfb-t-chest-whSmall.gif",50,[69,73],[323,89],"mfbTChest","WhT","mfb");
setup.SCSL.mfbTRarmWh = new scSprite("mfbTRarmWh","mfb-t-rArm-wh.gif",60,[119,174],[319,84],"mfbTRarm","WhT","mfb");
setup.SCSL.mfbTLarmWh = new scSprite("mfbTLarmWh","mfb-t-lArm-wh.gif",2,[71,121],[290,115],"mfbTLarm","WhT","mfb");
setup.SCSL.mfbTHeadMcy = new scSprite("mfbTHeadMcy","mfb-t-head-mcy.gif",100,[97,101],[315,3],"mfbTHead","McyT","mfb"); // Main character yellow
setup.SCSL.mfbTHeadMcb = new scSprite("mfbTHeadMcb","mfb-t-head-mcb.gif",100,[97,101],[315,3],"mfbTHead","McbT","mfb"); // Main character black
setup.SCSL.mfbTHeadMcr = new scSprite("mfbTHeadMcr","mfb-t-head-mcr.gif",100,[97,101],[315,3],"mfbTHead","McrT","mfb"); // Main character red
setup.SCSL.mfbTTailMcb = new scSprite("mfbTTailMcb","mfb-t-tail-mcb.gif",1,[68,228],[384,12],"mfbTTail","McbT","mfb"); // Tail hair dark character
setup.SCSL.mfbTTailMcr = new scSprite("mfbTTailMcr","mfb-t-tail-mcr.gif",1,[102,148],[322,21],"mfbTTail","McrT","mfb"); // Tail hair ginger character

	     // Gray character // Gf -> Gray Female

setup.SCSL.mfbTTrunkGf = new scSprite("mfbTTrunkGf","mfb-t-trunklengs-gf.gif",2,[166,290],[322,44],"mfbTTrunk","GfT","mfb");
setup.SCSL.mfbTChestGfbig = new scSprite("mfbTChestGfbig","mfb-t-chest-gfBig.gif",50,[69,73],[323,89],"mfbTChest","GfT","mfb");
setup.SCSL.mfbTChestGfmedium = new scSprite("mfbTChestGfmedium","mfb-t-chest-gfMed.gif",50,[69,73],[323,89],"mfbTChest","GfT","mfb");
setup.SCSL.mfbTChestGfsmall = new scSprite("mfbTChestGfsmall","mfb-t-chest-gfSmall.gif",50,[69,73],[323,89],"mfbTChest","GfT","mfb");
setup.SCSL.mfbTRarmGf = new scSprite("mfbTRarmGf","mfb-t-rArm-gf.gif",60,[119,174],[319,84],"mfbTRarm","GfT","mfb");
setup.SCSL.mfbTLarmGf = new scSprite("mfbTLarmGf","mfb-t-lArm-gf.gif",2,[71,121],[290,115],"mfbTLarm","GfT","mfb");
setup.SCSL.mfbTHeadGf = new scSprite("mfbTHeadGf","mfb-t-head-gf-gm.gif",100,[97,101],[315,3],"mfbTHead","GfT","mfb"); // Main character gray

            // Gray character // Gm -> Gray male

setup.SCSL.mfbTTrunkGm = new scSprite("mfbTTrunkGm","mfb-t-trunklengs-gm.gif",2,[166,290],[322,44],"mfbTTrunk","GmT","mfb");
setup.SCSL.mfbTRarmGm = new scSprite("mfbTRarmGm","mfb-t-rArm-gm.gif",60,[119,174],[319,84],"mfbTRarm","GmT","mfb");
setup.SCSL.mfbTLarmGm = new scSprite("mfbTLarmGm","mfb-t-lArm-gm.gif",2,[71,121],[300,115],"mfbTLarm","GmT","mfb");
setup.SCSL.mfbTHeadGm = new scSprite("mfbTHeadGm","mfb-t-head-gf-gm.gif",100,[97,101],[315,3],"mfbTHead","GmT","mfb"); // Main character gray

	// Bottom 
		// White human

setup.SCSL.mfbBTrunklegarmWh = new scSprite("mfbBTrunklegarmWh","mfb-b-trunklegarm-wh.gif",3,[410,225],[121,175],"mfbBTrunkleg","WhB","mfb");
setup.SCSL.mfbBChestWhbig = new scSprite("mfbBChestWhbig","mfb-b-chest-whBig.gif",2,[56,44],[288,267],"mfbBChest","WhB","mfb");
setup.SCSL.mfbBChestWhmedium = new scSprite("mfbBChestWhmedium","mfb-b-chest-whMed.gif",2,[54,43],[288,267],"mfbBChest","WhB","mfb");
setup.SCSL.mfbBChestWhsmall = new scSprite("mfbBChestWhsmall","mfb-b-chest-whSmall.gif",2,[56,44],[288,267],"mfbBChest","WhB","mfb");
setup.SCSL.mfbBLlegWh = new scSprite("mfbBLlegWh","mfb-b-lleg-wh.gif",1,[143,71],[267,238],"mfbBLleg","WhB","mfb");
setup.SCSL.mfbBHeadMcy = new scSprite("mfbBHeadMcy","mfb-b-head-mcy.gif",140,[101,116],[190,214],"mfbBHead","McyB","mfb"); // Main character yellow
setup.SCSL.mfbBHeadMcb = new scSprite("mfbBHeadMcb","mfb-b-head-mcb.gif",140,[252,166],[190,214],"mfbBHead","McbB","mfb"); // Main character black
setup.SCSL.mfbBHeadMcr = new scSprite("mfbBHeadMcr","mfb-b-head-mcr.gif",140,[174,116],[189,218],"mfbBHead","McrB","mfb"); // Main character red
 
// Gray character // Gf -> Gray Female

setup.SCSL.mfbBTrunklegarmGf = new scSprite("mfbBTrunklegarmGf","mfb-b-trunklegarm-gf.gif",3,[410,225],[121,175],"mfbBTrunkleg","GfB","mfb");
setup.SCSL.mfbBChestGfbig = new scSprite("mfbBChestGfbig","mfb-b-chest-gfBig.gif",2,[56,44],[288,267],"mfbBChest","GfB","mfb");
setup.SCSL.mfbBChestGfmedium = new scSprite("mfbBChestGfmedium","mfb-b-chest-gfMed.gif",2,[54,43],[288,267],"mfbBChest","GfB","mfb");
setup.SCSL.mfbBChestGfsmall = new scSprite("mfbBChestGfsmall","mfb-b-chest-gfSmall.gif",2,[56,44],[288,267],"mfbBChest","GfB","mfb");
setup.SCSL.mfbBLlegGf = new scSprite("mfbBLlegGf","mfb-b-lleg-gf-gm.gif",1,[143,71],[267,238],"mfbBLleg","GfB","mfb");
setup.SCSL.mfbBHeadGf = new scSprite("mfbBHeadGf","mfb-b-head-gf-gm.gif",140,[75,95],[200,223],"mfbBHead","GfB","mfb"); // Main character gray

        // Gray character // Gm -> Gray male

setup.SCSL.mfbBTrunklegarmGm = new scSprite("mfbBTrunklegarmGm","mfb-b-trunklegarm-gm.gif",3,[410,225],[121,175],"mfbBTrunkleg","GmB","mfb");
setup.SCSL.mfbBLlegGm = new scSprite("mfbBLlegGm","mfb-b-lleg-gf-gm.gif",1,[143,71],[267,238],"mfbBLleg","GmB","mfb"); 
setup.SCSL.mfbBHeadGm = new scSprite("mfbBHeadGm","mfb-b-head-gf-gm.gif",140,[75,95],[200,223],"mfbBHead","GmB","mfb"); // Main character gray

/*
	// Bottom 
		// White human

setup.SCSL.mfbBTrunklegarmWh = new scSprite("mfbBTrunklegarmWh","mfb-b-trunklegarm-wh.gif",3,[410,225],[121,175],"mfbBTrunkleg","WhB","mfb");
setup.SCSL.mfbBChestWhbig = new scSprite("mfbBChestWhbig","mfb-b-chest-whBig.gif",5,[56,44],[288,267],"mfbBChest","WhB","mfb");
setup.SCSL.mfbBChestWhmedium = new scSprite("mfbBChestWhmedium","mfb-b-chest-whMed.gif",5,[54,43],[288,267],"mfbBChest","WhB","mfb");
setup.SCSL.mfbBChestWhsmall = new scSprite("mfbBChestWhsmall","mfb-b-chest-whSmall.gif",5,[56,44],[288,267],"mfbBChest","WhB","mfb");
setup.SCSL.mfbBLlegWh = new scSprite("mfbBLlegWh","mfb-b-lLeg-wh.gif",1,[143,71],[267,238],"mfbBLleg","WhB","mfb");
setup.SCSL.mfbBHeadMcy = new scSprite("mfbBHeadMcy","mfb-b-head-mcy.gif",140,[101,116],[188,214],"mfbBHead","McyB","mfb"); // Main character yellow
setup.SCSL.mfbBHeadMcb = new scSprite("mfbBHeadMcb","mfb-b-head-mcb.gif",140,[253,166],[188,214],"mfbBHead","McbB","mfb"); // Main character black
setup.SCSL.mfbBHeadMcr = new scSprite("mfbBHeadMcr","mfb-b-head-mcr.gif",140,[176,116],[187,218],"mfbBHead","McrB","mfb"); // Main character red
 

// Gray character // Gf -> Gray Female

setup.SCSL.mfbBTrunklegarmGf = new scSprite("mfbBTrunklegarmGf","mfb-b-trunklegarm-gf.gif",3,[410,225],[121,175],"mfbBTrunkleg","GfB","mfb");
setup.SCSL.mfbBChestGfbig = new scSprite("mfbBChestGfbig","mfb-b-chest-gfBig.gif",5,[56,44],[288,267],"mfbBChest","GfB","mfb");
setup.SCSL.mfbBChestGfmedium = new scSprite("mfbBChestGfmedium","mfb-b-chest-gfMed.gif",5,[54,43],[288,267],"mfbBChest","GfB","mfb");
setup.SCSL.mfbBChestGfsmall = new scSprite("mfbBChestGfsmall","mfb-b-chest-gfSmall.gif",5,[56,44],[288,267],"mfbBChest","GfB","mfb");
setup.SCSL.mfbBLlegGf = new scSprite("mfbBLlegGf","mfb-b-lleg-gf-gm.gif",1,[143,71],[267,238],"mfbBLleg","GfB","mfb");
setup.SCSL.mfbBHeadGf = new scSprite("mfbBHeadGf","mfb-b-head-gf-gm.gif",140,[75,95],[198,223],"mfbBHead","GfB","mfb"); // Main character gray

        // Gray character // Gm -> Gray male


setup.SCSL.mfbBTrunklegarmGm = new scSprite("mfbBTrunklegarmGm","mfb-b-trunklegarm-gm.gif",3,[410,225],[121,175],"mfbBTrunkleg","GmB","mfb");
setup.SCSL.mfbBLlegGm = new scSprite("mfbBLlegGm","mfb-b-lleg-gf-gm.gif",20,[143,71],[267,238],"mfbBLleg","GmB","mfb"); 
setup.SCSL.mfbBHeadGm = new scSprite("mfbBHeadGm","mfb-b-head-gf-gm.gif",140,[75,95],[198,223],"mfbBHead","GmB","mfb"); // Main character gray
*/

//////////////////


///// Scene Sprites Sets Data Lists /////

setup.SCSDL = [];

	// Mount Face to Face Mount Dick
setup.SCSDL.MftfMdT = []; // Mount Face to Face Mount Dick Top
setup.SCSDL.MftfMdT.WhiteHuman = [];
setup.SCSDL.MftfMdT.WhiteHuman.core = ["mffTTrunkWh"];
setup.SCSDL.MftfMdT.WhiteHuman.bigChest = ["mffTChestWhbig"];
setup.SCSDL.MftfMdT.WhiteHuman.medChest = ["mffTChestWhmed"];
setup.SCSDL.MftfMdT.WhiteHuman.smaChest = ["mffTChestWhsma"];
setup.SCSDL.MftfMdT.WhiteHuman.dick = ["mffTDickWh"];
setup.SCSDL.MftfMdT.WhiteHuman.arms = ["mffTRarmWh","mffTLarmWh","mffTLforearmWh","mffTLhandWh"];
setup.SCSDL.MftfMdT.WhiteHuman.legs = ["mffTLlegWh"];
setup.SCSDL.MftfMdT.WhiteHuman.lockedArms = ["mffTRarmWh","mffTLarmWh","mffTLforearmWh","mffTLhandWh"];
setup.SCSDL.MftfMdT.WhiteHuman.lockedLegs = ["mffTLlegWh"];

setup.SCSDL.MftfMdT.Mcy = [];
setup.SCSDL.MftfMdT.Mcy.head = ["mffTHeadMcy"];
setup.SCSDL.MftfMdT.Mcb = [];
setup.SCSDL.MftfMdT.Mcb.head = ["mffTHeadMcb"];
setup.SCSDL.MftfMdT.Mcr = [];
setup.SCSDL.MftfMdT.Mcr.head = ["mffTHeadMcr"];

setup.SCSDL.MftfMdT.GrayCharacter = [];
setup.SCSDL.MftfMdT.GrayCharacter.core = ["mffTTrunkGf"];
setup.SCSDL.MftfMdT.GrayCharacter.bigChest = ["mffTChestGfbig"];
setup.SCSDL.MftfMdT.GrayCharacter.medChest = ["mffTChestGfbig"];
setup.SCSDL.MftfMdT.GrayCharacter.smaChest = ["mffTChestGfbig"];
setup.SCSDL.MftfMdT.GrayCharacter.dick = ["mffTDickGf"];
setup.SCSDL.MftfMdT.GrayCharacter.arms = ["mffTRarmGf","mffTLarmGf","mffTLforearmGf","mffTLhandGf"];
setup.SCSDL.MftfMdT.GrayCharacter.legs = ["mffTLlegGf"];
setup.SCSDL.MftfMdT.GrayCharacter.lockedArms = ["mffTRarmGf","mffTLarmGf","mffTLforearmGf","mffTLhandGf"];
setup.SCSDL.MftfMdT.GrayCharacter.lockedLegs = ["mffTLlegGf"];
setup.SCSDL.MftfMdT.GrayCharacter.head = ["mffTHeadGf"];

setup.SCSDL.MftfMdT.MGrayCharacter = [];
setup.SCSDL.MftfMdT.MGrayCharacter.core = ["mffTTrunkGm","mffTChestGm"];
setup.SCSDL.MftfMdT.MGrayCharacter.dick = ["mffTDickGm"];
setup.SCSDL.MftfMdT.MGrayCharacter.arms = ["mffTRarmGm","mffTLarmGm","mffTLforearmGm","mffTLhandGm"];
setup.SCSDL.MftfMdT.MGrayCharacter.legs = ["mffTLlegGm"];
setup.SCSDL.MftfMdT.MGrayCharacter.lockedArms = ["mffTRarmGm","mffTLarmGm","mffTLforearmGm","mffTLhandGm"];
setup.SCSDL.MftfMdT.MGrayCharacter.lockedLegs = ["mffTLlegGm"];
setup.SCSDL.MftfMdT.MGrayCharacter.head = ["mffTHeadGm"];

setup.SCSDL.MftfMdB = []; // Mount Face to Face Mount Dick Bottom
setup.SCSDL.MftfMdB.WhiteHuman = [];
setup.SCSDL.MftfMdB.WhiteHuman.core = ["mffBTrunkWh"];
setup.SCSDL.MftfMdB.WhiteHuman.bigChest = ["mffBChestWhbig"];
setup.SCSDL.MftfMdB.WhiteHuman.medChest = ["mffBChestWhmed"];
setup.SCSDL.MftfMdB.WhiteHuman.smaChest = ["mffBChestWhsma"];
setup.SCSDL.MftfMdB.WhiteHuman.dick = ["mffBDickWh"];
setup.SCSDL.MftfMdB.WhiteHuman.arms = ["mffBLarmWh","mffBRarmhandWh","mffBLFingerWh"];
setup.SCSDL.MftfMdB.WhiteHuman.legs = ["mffBLFootWh","mffBLlegWh","mffBRlegWh"];
setup.SCSDL.MftfMdB.WhiteHuman.lockedArms = ["mffBLarmWh","mffBRarmhandWh","mffBLFingerWh"];
setup.SCSDL.MftfMdB.WhiteHuman.lockedLegs = ["mffBLFootWh","mffBLlegWh","mffBRlegWh"];

setup.SCSDL.MftfMdB.Mcy = [];
setup.SCSDL.MftfMdB.Mcy.head = ["mffBHeadMcy"];
setup.SCSDL.MftfMdB.Mcb = [];
setup.SCSDL.MftfMdB.Mcb.head = ["mffBHeadMcb"];
setup.SCSDL.MftfMdB.Mcr = [];
setup.SCSDL.MftfMdB.Mcr.head = ["mffBHeadMcr"];

setup.SCSDL.MftfMdB.GrayCharacter = [];
setup.SCSDL.MftfMdB.GrayCharacter.core = ["mffBTrunkGf"];
setup.SCSDL.MftfMdB.GrayCharacter.bigChest = ["mffBChestGfbig"];
setup.SCSDL.MftfMdB.GrayCharacter.medChest = ["mffBChestGfbig"];
setup.SCSDL.MftfMdB.GrayCharacter.smaChest = ["mffBChestGfbig"];
setup.SCSDL.MftfMdB.GrayCharacter.dick = ["mffBDickGf"];
setup.SCSDL.MftfMdB.GrayCharacter.arms = ["mffBLarmGf","mffBRarmhandGf","mffBLFingerGf"];
setup.SCSDL.MftfMdB.GrayCharacter.legs = ["mffBLFootGf","mffBLlegGf","mffBRlegGf"];
setup.SCSDL.MftfMdB.GrayCharacter.lockedArms = ["mffBLarmGf","mffBRarmhandGf","mffBLFingerGf"];
setup.SCSDL.MftfMdB.GrayCharacter.lockedLegs = ["mffBLFootGf","mffBLlegGf","mffBRlegGf"];
setup.SCSDL.MftfMdB.GrayCharacter.head = ["mffBHeadGf"];

setup.SCSDL.MftfMdB.MGrayCharacter = [];
setup.SCSDL.MftfMdB.MGrayCharacter.core = ["mffBTrunkGm"];
setup.SCSDL.MftfMdB.MGrayCharacter.dick = ["mffBDickGm"];
setup.SCSDL.MftfMdB.MGrayCharacter.arms = ["mffBLarmGm","mffBRarmhandGm","mffBLFingerGf"]; // ,"mffBLFingerGf"
setup.SCSDL.MftfMdB.MGrayCharacter.legs = ["mffBLFootGm","mffBLlegGm","mffBRlegGm"];
setup.SCSDL.MftfMdB.MGrayCharacter.lockedArms = ["mffBLarmGm","mffBRarmhandGm","mffBLFingerGf"]; // ,"mffBLFingerGf"
setup.SCSDL.MftfMdB.MGrayCharacter.lockedLegs = ["mffBLFootGm","mffBLlegGm","mffBRlegGm"];
setup.SCSDL.MftfMdB.MGrayCharacter.head = ["mffBHeadGm"];

	// Mount Face to Face Anal Mount Dick
setup.SCSDL.MftfAmdT = []; // Mount Face to Face Anal Mount Dick Top
setup.SCSDL.MftfAmdT.WhiteHuman = [];
setup.SCSDL.MftfAmdT.WhiteHuman.core = ["mffaTTrunkWh"];
setup.SCSDL.MftfAmdT.WhiteHuman.bigChest = ["mffaTChestWhbig"];
setup.SCSDL.MftfAmdT.WhiteHuman.medChest = ["mffaTChestWhmed"];
setup.SCSDL.MftfAmdT.WhiteHuman.smaChest = ["mffaTChestWhsma"];
setup.SCSDL.MftfAmdT.WhiteHuman.dick = ["mffaTDickWh"];
setup.SCSDL.MftfAmdT.WhiteHuman.arms = ["mffaTRarmWh","mffaTLarmWh","mffaTLforearmWh","mffaTLhandWh"];
setup.SCSDL.MftfAmdT.WhiteHuman.legs = ["mffaTLlegWh"];
setup.SCSDL.MftfAmdT.WhiteHuman.lockedArms = ["mffaTRarmWh","mffaTLarmWh","mffaTLforearmWh","mffaTLhandWh"];
setup.SCSDL.MftfAmdT.WhiteHuman.lockedLegs = ["mffaTLlegWh"];

setup.SCSDL.MftfAmdT.Mcy = [];
setup.SCSDL.MftfAmdT.Mcy.head = ["mffaTHeadMcy"];
setup.SCSDL.MftfAmdT.Mcb = [];
setup.SCSDL.MftfAmdT.Mcb.head = ["mffaTHeadMcb"];
setup.SCSDL.MftfAmdT.Mcr = [];
setup.SCSDL.MftfAmdT.Mcr.head = ["mffaTHeadMcr"];

setup.SCSDL.MftfAmdT.GrayCharacter = [];
setup.SCSDL.MftfAmdT.GrayCharacter.core = ["mffaTTrunkGf"];
setup.SCSDL.MftfAmdT.GrayCharacter.bigChest = ["mffaTChestGfbig"];
setup.SCSDL.MftfAmdT.GrayCharacter.medChest = ["mffaTChestGfbig"];
setup.SCSDL.MftfAmdT.GrayCharacter.smaChest = ["mffaTChestGfbig"];
setup.SCSDL.MftfAmdT.GrayCharacter.dick = ["mffaTDickGf"];
setup.SCSDL.MftfAmdT.GrayCharacter.arms = ["mffaTRarmGf","mffaTLarmGf","mffaTLforearmGf","mffaTLhandGf"];
setup.SCSDL.MftfAmdT.GrayCharacter.legs = ["mffaTLlegGf"];
setup.SCSDL.MftfAmdT.GrayCharacter.lockedArms = ["mffaTRarmGf","mffaTLarmGf","mffaTLforearmGf","mffaTLhandGf"];
setup.SCSDL.MftfAmdT.GrayCharacter.lockedLegs = ["mffaTLlegGf"];
setup.SCSDL.MftfAmdT.GrayCharacter.head = ["mffaTHeadGf"];

setup.SCSDL.MftfAmdT.MGrayCharacter = [];
setup.SCSDL.MftfAmdT.MGrayCharacter.core = ["mffaTTrunkGm","mffaTChestGm"];
setup.SCSDL.MftfAmdT.MGrayCharacter.dick = ["mffaTDickGm"];
setup.SCSDL.MftfAmdT.MGrayCharacter.arms = ["mffaTRarmGm","mffaTLarmGm","mffaTLforearmGm","mffaTLhandGm"];
setup.SCSDL.MftfAmdT.MGrayCharacter.legs = ["mffaTLlegGm"];
setup.SCSDL.MftfAmdT.MGrayCharacter.lockedArms = ["mffaTRarmGm","mffaTLarmGm","mffaTLforearmGm","mffaTLhandGm"];
setup.SCSDL.MftfAmdT.MGrayCharacter.lockedLegs = ["mffaTLlegGm"];
setup.SCSDL.MftfAmdT.MGrayCharacter.head = ["mffaTHeadGm"];

setup.SCSDL.MftfAmdB = []; // Mount Face to Face Anal Mount Dick Bottom
setup.SCSDL.MftfAmdB.WhiteHuman = [];
setup.SCSDL.MftfAmdB.WhiteHuman.core = ["mffaBTrunkWh"];
setup.SCSDL.MftfAmdB.WhiteHuman.bigChest = ["mffaBChestWhbig"];
setup.SCSDL.MftfAmdB.WhiteHuman.medChest = ["mffaBChestWhmed"];
setup.SCSDL.MftfAmdB.WhiteHuman.smaChest = ["mffaBChestWhsma"];
setup.SCSDL.MftfAmdB.WhiteHuman.dick = ["mffaBDickWh"];
setup.SCSDL.MftfAmdB.WhiteHuman.arms = ["mffaBRarmhandWh","mffaBLarmWh","mffaBLFingerWh"];
setup.SCSDL.MftfAmdB.WhiteHuman.legs = ["mffaBLFootWh","mffaBLlegWh","mffaBRlegWh"];
setup.SCSDL.MftfAmdB.WhiteHuman.lockedArms = ["mffaBRarmhandWh","mffaBLarmWh","mffaBLFingerWh"];
setup.SCSDL.MftfAmdB.WhiteHuman.lockedLegs = ["mffaBLFootWh","mffaBLlegWh","mffaBRlegWh"];

setup.SCSDL.MftfAmdB.Mcy = [];
setup.SCSDL.MftfAmdB.Mcy.head = ["mffaBHeadMcy"];
setup.SCSDL.MftfAmdB.Mcb = [];
setup.SCSDL.MftfAmdB.Mcb.head = ["mffaBHeadMcb"];
setup.SCSDL.MftfAmdB.Mcr = [];
setup.SCSDL.MftfAmdB.Mcr.head = ["mffaBHeadMcr"];

setup.SCSDL.MftfAmdB.GrayCharacter = [];
setup.SCSDL.MftfAmdB.GrayCharacter.core = ["mffaBTrunkGf"];
setup.SCSDL.MftfAmdB.GrayCharacter.bigChest = ["mffaBChestGfbig"];
setup.SCSDL.MftfAmdB.GrayCharacter.medChest = ["mffaBChestGfbig"];
setup.SCSDL.MftfAmdB.GrayCharacter.smaChest = ["mffaBChestGfbig"];
setup.SCSDL.MftfAmdB.GrayCharacter.dick = ["mffaBDickGf"];
setup.SCSDL.MftfAmdB.GrayCharacter.arms = ["mffaBLarmGf","mffaBLFingerGf","mffaBRarmhandGf"];
setup.SCSDL.MftfAmdB.GrayCharacter.legs = ["mffaBLFootGf","mffaBLlegGf","mffaBRlegGf"];
setup.SCSDL.MftfAmdB.GrayCharacter.lockedArms = ["mffaBLarmGf","mffaBLFingerGf","mffaBRarmhandGf"];
setup.SCSDL.MftfAmdB.GrayCharacter.lockedLegs = ["mffaBLFootGf","mffaBLlegGf","mffaBRlegGf"];
setup.SCSDL.MftfAmdB.GrayCharacter.head = ["mffaBHeadGf"];

setup.SCSDL.MftfAmdB.MGrayCharacter = [];
setup.SCSDL.MftfAmdB.MGrayCharacter.core = ["mffaBTrunkGm"];
setup.SCSDL.MftfAmdB.MGrayCharacter.dick = ["mffaBDickGm"];
setup.SCSDL.MftfAmdB.MGrayCharacter.arms = ["mffaBRarmhandGm","mffaBLarmGm"]; // ,"mffBLFingerGf"
setup.SCSDL.MftfAmdB.MGrayCharacter.legs = ["mffaBLFootGm","mffaBLlegGm","mffaBRlegGm"];
setup.SCSDL.MftfAmdB.MGrayCharacter.lockedArms = ["mffaBRarmhandGm","mffaBLarmGm"]; // ,"mffBLFingerGf"
setup.SCSDL.MftfAmdB.MGrayCharacter.lockedLegs = ["mffaBLFootGm","mffaBLlegGm","mffaBRlegGm"];
setup.SCSDL.MftfAmdB.MGrayCharacter.head = ["mffaBHeadGm"];

	// Mount Face to Face Scissors
setup.SCSDL.MftfScsT = []; // Mount Face to Face Scissors Top
setup.SCSDL.MftfScsT.WhiteHuman = [];
setup.SCSDL.MftfScsT.WhiteHuman.core = ["scsTTrunkWh"];
setup.SCSDL.MftfScsT.WhiteHuman.bigChest = ["scsTChestWhbig"];
setup.SCSDL.MftfScsT.WhiteHuman.medChest = ["scsTChestWhmedium"];
setup.SCSDL.MftfScsT.WhiteHuman.smaChest = ["scsTChestWhsmall"];
setup.SCSDL.MftfScsT.WhiteHuman.dick = ["scsTDickWhsmall"];
setup.SCSDL.MftfScsT.WhiteHuman.arms = ["scsTRfingerWh","scsTRarmWh","scsTLarmWh"];
setup.SCSDL.MftfScsT.WhiteHuman.legs = ["scsTLlegWh","scsTRlegWh"];
setup.SCSDL.MftfScsT.WhiteHuman.lockedArms = ["scsTRfingerWh","scsTRarmWh","scsTLarmWh"];
setup.SCSDL.MftfScsT.WhiteHuman.lockedLegs = ["scsTLlegWh","scsTRlegWh"];

setup.SCSDL.MftfScsT.Mcy = [];
setup.SCSDL.MftfScsT.Mcy.head = ["scsTHeadMcy"];
setup.SCSDL.MftfScsT.Mcb = [];
setup.SCSDL.MftfScsT.Mcb.head = ["scsTHeadMcb","scsTTailMcb"];
setup.SCSDL.MftfScsT.Mcr = [];
setup.SCSDL.MftfScsT.Mcr.head = ["scsTHeadMcr"];

setup.SCSDL.MftfScsT.GrayCharacter = [];
setup.SCSDL.MftfScsT.GrayCharacter.core = ["scsTTrunkGf"];
setup.SCSDL.MftfScsT.GrayCharacter.bigChest = ["scsTChestGfbig"];
setup.SCSDL.MftfScsT.GrayCharacter.medChest = ["scsTChestGfmedium"];
setup.SCSDL.MftfScsT.GrayCharacter.smaChest = ["scsTChestGfsmall"];
setup.SCSDL.MftfScsT.GrayCharacter.dick = ["scsTDickGfsmall"];
setup.SCSDL.MftfScsT.GrayCharacter.arms = ["scsTRfingerGf","scsTRarmGf","scsTLarmGf"];
setup.SCSDL.MftfScsT.GrayCharacter.legs = ["scsTLlegGf","scsTRlegGf"];
setup.SCSDL.MftfScsT.GrayCharacter.lockedArms = ["scsTRfingerGf","scsTRarmGf","scsTLarmGf"];
setup.SCSDL.MftfScsT.GrayCharacter.lockedLegs = ["scsTLlegGf","scsTRlegGf"];
setup.SCSDL.MftfScsT.GrayCharacter.head = ["scsTHeadGf"];

setup.SCSDL.MftfScsT.MGrayCharacter = [];
setup.SCSDL.MftfScsT.MGrayCharacter.core = ["scsTTrunkGm"];
setup.SCSDL.MftfScsT.MGrayCharacter.dick = ["scsTDickGmsmall"];
setup.SCSDL.MftfScsT.MGrayCharacter.arms = ["scsTRfingerGm","scsTRarmGm","scsTLarmGm"];
setup.SCSDL.MftfScsT.MGrayCharacter.legs = ["mffTLlegGm","scsTLlegGm","scsTRlegGm"];
setup.SCSDL.MftfScsT.MGrayCharacter.lockedArms = ["scsTRfingerGm","scsTRarmGm","scsTLarmGm"];
setup.SCSDL.MftfScsT.MGrayCharacter.lockedLegs = ["mffTLlegGm","scsTLlegGm","scsTRlegGm"];
setup.SCSDL.MftfScsT.MGrayCharacter.head = ["scsTHeadGm"];

setup.SCSDL.MftfScsB = []; // Mount Face to Face Scissors Bottom
setup.SCSDL.MftfScsB.WhiteHuman = [];
setup.SCSDL.MftfScsB.WhiteHuman.core = ["scsBTrunkWh"];
setup.SCSDL.MftfScsB.WhiteHuman.bigChest = ["scsBChestWhbig"];
setup.SCSDL.MftfScsB.WhiteHuman.medChest = ["scsBChestWhmedium"];
setup.SCSDL.MftfScsB.WhiteHuman.smaChest = ["scsBChestWhsmall"];
setup.SCSDL.MftfScsB.WhiteHuman.dick = ["scsBDickWhsmall"];
setup.SCSDL.MftfScsB.WhiteHuman.arms = ["scsBLhandWh","scsBLarmdWh"];
setup.SCSDL.MftfScsB.WhiteHuman.legs = ["scsBLlegWh","scsBRlegWh"];
setup.SCSDL.MftfScsB.WhiteHuman.lockedArms = ["scsBLhandWh","scsBLarmdWh"];
setup.SCSDL.MftfScsB.WhiteHuman.lockedLegs = ["scsBLlegWh","scsBRlegWh"];

setup.SCSDL.MftfScsB.Mcy = [];
setup.SCSDL.MftfScsB.Mcy.head = ["scsBHeadMcy"];
setup.SCSDL.MftfScsB.Mcb = [];
setup.SCSDL.MftfScsB.Mcb.head = ["scsBHeadMcb"];
setup.SCSDL.MftfScsB.Mcr = [];
setup.SCSDL.MftfScsB.Mcr.head = ["scsBHeadMcr"];

setup.SCSDL.MftfScsB.GrayCharacter = [];
setup.SCSDL.MftfScsB.GrayCharacter.core = ["scsBTrunkGf"];
setup.SCSDL.MftfScsB.GrayCharacter.bigChest = ["scsBChestGfbig"];
setup.SCSDL.MftfScsB.GrayCharacter.medChest = ["scsBChestGfmedium"];
setup.SCSDL.MftfScsB.GrayCharacter.smaChest = ["scsBChestGfsmall"];
setup.SCSDL.MftfScsB.GrayCharacter.dick = ["scsBDickGfsmall"];
setup.SCSDL.MftfScsB.GrayCharacter.arms = ["scsBLhandGf","scsBLarmdGf"];
setup.SCSDL.MftfScsB.GrayCharacter.legs = ["scsBLlegGf","scsBRlegGf"];
setup.SCSDL.MftfScsB.GrayCharacter.lockedArms = ["scsBLhandGf","scsBLarmdGf"];
setup.SCSDL.MftfScsB.GrayCharacter.lockedLegs = ["scsBLlegGf","scsBRlegGf"];
setup.SCSDL.MftfScsB.GrayCharacter.head = ["scsBHeadGf"];

setup.SCSDL.MftfScsB.MGrayCharacter = [];
setup.SCSDL.MftfScsB.MGrayCharacter.core = ["scsBTrunkGm"];
setup.SCSDL.MftfScsB.MGrayCharacter.dick = ["scsBDickGmsmall"];
setup.SCSDL.MftfScsB.MGrayCharacter.arms = ["scsBLhandGm","scsBLarmdGm"];
setup.SCSDL.MftfScsB.MGrayCharacter.legs = ["scsBLlegGm","scsBRlegGm"];
setup.SCSDL.MftfScsB.MGrayCharacter.lockedArms = ["scsBLhandGm","scsBLarmdGm"];
setup.SCSDL.MftfScsB.MGrayCharacter.lockedLegs = ["scsBLlegGm","scsBRlegGm"];
setup.SCSDL.MftfScsB.MGrayCharacter.head = ["scsBHeadGm"];

	// Mount Face to Face Penetrate Pussy
setup.SCSDL.MftfPntT = []; // Mount Face to Face Penetrate Pussy Top
setup.SCSDL.MftfPntT.WhiteHuman = [];
setup.SCSDL.MftfPntT.WhiteHuman.core = ["dpTTrunkWh"];
setup.SCSDL.MftfPntT.WhiteHuman.bigChest = ["dpTChestWhbig"];
setup.SCSDL.MftfPntT.WhiteHuman.medChest = ["dpTChestWhmedium"];
setup.SCSDL.MftfPntT.WhiteHuman.smaChest = ["dpTChestWhsmall"];
setup.SCSDL.MftfPntT.WhiteHuman.dick = [];
setup.SCSDL.MftfPntT.WhiteHuman.arms = ["dpTHandpalmWh","dpTRarmWh"];
setup.SCSDL.MftfPntT.WhiteHuman.legs = ["dpTRlegWh","dpTfeetWh"];
setup.SCSDL.MftfPntT.WhiteHuman.lockedArms = ["dpTlockedRarmWh","dpTlockedLarmWh"];
setup.SCSDL.MftfPntT.WhiteHuman.lockedLegs = ["dpTlockedRlegWh","dpTlockedLfootWh"];

setup.SCSDL.MftfPntT.DarkHuman = [];
setup.SCSDL.MftfPntT.DarkHuman.core = ["dpTTrunkDh"];
setup.SCSDL.MftfPntT.DarkHuman.bigChest = ["dpTChestDhbig"];
setup.SCSDL.MftfPntT.DarkHuman.medChest = ["dpTChestDhmedium"];
setup.SCSDL.MftfPntT.DarkHuman.smaChest = ["dpTChestDhsmall"];
setup.SCSDL.MftfPntT.DarkHuman.dick = [];
setup.SCSDL.MftfPntT.DarkHuman.arms = ["dpTHandpalmDh","dpTRarmDh","dpTfingersDh"];
setup.SCSDL.MftfPntT.DarkHuman.legs = ["dpTRlegDh","dpTfeetDh"];
setup.SCSDL.MftfPntT.DarkHuman.lockedArms = ["dpTlockedRarmDh","dpTlockedLarmDh"];
setup.SCSDL.MftfPntT.DarkHuman.lockedLegs = ["dpTlockedRlegDh","dpTlockedLfootDh"];

setup.SCSDL.MftfPntT.Mcy = [];
setup.SCSDL.MftfPntT.Mcy.head = ["dpTFaceMcy","dpTBangMcy","dpTHairbaseMcy","dpTTailMcy"];
setup.SCSDL.MftfPntT.Mcb = [];
setup.SCSDL.MftfPntT.Mcb.head = ["dpTFaceMcb","dpTBangMcb","dpTHairbaseMcb","dpTTailMcb"];
setup.SCSDL.MftfPntT.Mcr = [];
setup.SCSDL.MftfPntT.Mcr.head = ["dpTFaceMcr","dpTBangMcr","dpTHairbaseMcr"];
setup.SCSDL.MftfPntT.Ns = [];
setup.SCSDL.MftfPntT.Ns.head = ["dpTFaceDh","dpTBangDh","dpTHairbaseDh","dpTTailDh"];

setup.SCSDL.MftfPntT.GrayCharacter = [];
setup.SCSDL.MftfPntT.GrayCharacter.core = ["dpTTrunkGf"];
setup.SCSDL.MftfPntT.GrayCharacter.bigChest = ["dpTChestGfbig"];
setup.SCSDL.MftfPntT.GrayCharacter.medChest = ["dpTChestGfmedium"];
setup.SCSDL.MftfPntT.GrayCharacter.smaChest = ["dpTChestGfsmall"];
setup.SCSDL.MftfPntT.GrayCharacter.dick = [];
setup.SCSDL.MftfPntT.GrayCharacter.arms = ["dpTHandpalmGf","dpTRarmGf"];
setup.SCSDL.MftfPntT.GrayCharacter.legs = ["dpTRlegGf","dpTfeetGf"];
setup.SCSDL.MftfPntT.GrayCharacter.lockedArms = ["dpTlockedRarmGf","dpTlockedLarmGm"];
setup.SCSDL.MftfPntT.GrayCharacter.lockedLegs = ["dpTlockedRlegGf","dpTlockedFeetGf"];
setup.SCSDL.MftfPntT.GrayCharacter.head = ["dpTHeadGf"];

setup.SCSDL.MftfPntT.MGrayCharacter = [];
setup.SCSDL.MftfPntT.MGrayCharacter.core = ["dpTTrunkGm"];
setup.SCSDL.MftfPntT.MGrayCharacter.dick = [];
setup.SCSDL.MftfPntT.MGrayCharacter.arms = ["dpTHandpalmGm","dpTRarmGm"];
setup.SCSDL.MftfPntT.MGrayCharacter.legs = ["dpTRlegGm","dpTfeetGm"];
setup.SCSDL.MftfPntT.MGrayCharacter.lockedArms = ["dpTlockedRarmGm","dpTLaccarmGm"];
setup.SCSDL.MftfPntT.MGrayCharacter.lockedLegs = ["dpTlockedRlegGm","dpTlockedFeetGm"];
setup.SCSDL.MftfPntT.MGrayCharacter.head = ["dpTHeadGm"];

setup.SCSDL.MftfPntT.Bondage = [];
setup.SCSDL.MftfPntT.Bondage.blindfold = ["dpTBlindfold"];
setup.SCSDL.MftfPntT.Bondage.gag = ["dpTGag"];
setup.SCSDL.MftfPntT.Bondage.collar = ["dpTCollar"];
setup.SCSDL.MftfPntT.Bondage.armbinds = ["dpTRhandcuffs","dpTRchainhandcuffs","dpTLhandcuffs","dpTLchainhandcuffs"];
setup.SCSDL.MftfPntT.Bondage.legbinds = ["dpTRfeetcuffs","dpTLfeetcuffs"];
setup.SCSDL.MftfPntT.Bondage.lNipcaps = ["dpTRnipSuckersBig","dpTLnipSuckersBig","dpTLstripNipSuckersBig"];
setup.SCSDL.MftfPntT.Bondage.mNipcaps = ["dpTRnipSuckersMed","dpTLnipSuckersMed","dpTLstripNipSuckersMed"];
setup.SCSDL.MftfPntT.Bondage.sNipcaps = ["dpTRnipSuckersSma","dpTLnipSuckersSma","dpTLstripNipSuckersSma"];
setup.SCSDL.MftfPntT.Bondage.fNipcaps = ["dpTRnipSuckersFla"];
setup.SCSDL.MftfPntT.Bondage.buttplug = ["dpTButtplug"];
// setup.SCSDL.MftfPntT.Bondage.chcage = []; // Unusable
// setup.SCSDL.MftfPntT.Bondage.chbelt = []; // Unusable

setup.SCSDL.MftfPpB = []; // Mount Face to Face Penetrate Pussy Bottom
setup.SCSDL.MftfPpB.WhiteHuman = [];
setup.SCSDL.MftfPpB.WhiteHuman.core = ["dpBTrunklegWh"];
setup.SCSDL.MftfPpB.WhiteHuman.bigChest = ["dpBChestWhbig"];
setup.SCSDL.MftfPpB.WhiteHuman.medChest = ["dpBChestWhmedium"];
setup.SCSDL.MftfPpB.WhiteHuman.smaChest = ["dpBChestWhsmall"];
setup.SCSDL.MftfPpB.WhiteHuman.dick = ["dpBPussydickWhsmall"];
setup.SCSDL.MftfPpB.WhiteHuman.dickAnal = ["dpBAnaldickWhsmall"];
setup.SCSDL.MftfPpB.WhiteHuman.dickDouble = ["dpBPussydickWhsmall","dpBAnaldickWhsmall"];
setup.SCSDL.MftfPpB.WhiteHuman.doubleDildo = ["ddpBDildoWh"];
setup.SCSDL.MftfPpB.WhiteHuman.arms = ["dpBLhandWh","dpBRarmWh","dpBRforearmWh","dpBLforearmWh"];
setup.SCSDL.MftfPpB.WhiteHuman.legs = ["dpBRlegWh"];
setup.SCSDL.MftfPpB.WhiteHuman.lockedArms = ["dpBlockedLarmWh","dpBlockedRarmWh","dpBlockedRforearmWh"];
setup.SCSDL.MftfPpB.WhiteHuman.lockedLegs = ["dpBRlegWh"];

setup.SCSDL.MftfPpB.DarkHuman = [];
setup.SCSDL.MftfPpB.DarkHuman.core = ["dpBTrunklegDh"];
setup.SCSDL.MftfPpB.DarkHuman.bigChest = ["dpBChestDhbig"];
setup.SCSDL.MftfPpB.DarkHuman.medChest = ["dpBChestDhmedium"];
setup.SCSDL.MftfPpB.DarkHuman.smaChest = ["dpBChestDhsmall"];
setup.SCSDL.MftfPpB.DarkHuman.dick = ["dpBPussydickDhsmall"];
setup.SCSDL.MftfPpB.DarkHuman.dickAnal = ["dpBAnaldickDhsmall"];
setup.SCSDL.MftfPpB.DarkHuman.dickDouble = ["dpBPussydickDhsmall","dpBAnaldickDhsmall"];
setup.SCSDL.MftfPpB.DarkHuman.doubleDildo = ["ddpBDildoWh"];
setup.SCSDL.MftfPpB.DarkHuman.arms = ["dpBLhandDh","dpBRarmdDh","dpBRforearmDh","dpBLforearmDh"];
setup.SCSDL.MftfPpB.DarkHuman.legs = ["dpBRlegDh"];
setup.SCSDL.MftfPpB.DarkHuman.lockedArms = ["dpBlockedLarmDh","dpBlockedRarmDh","dpBlockedRforearmDh"];
setup.SCSDL.MftfPpB.DarkHuman.lockedLegs = ["dpBRlegDh"];

setup.SCSDL.MftfPpB.Mcy = [];
setup.SCSDL.MftfPpB.Mcy.head = ["dpBFaceMcy","dpBBangMcy","dpBHairbaseMcy"];
setup.SCSDL.MftfPpB.Mcb = [];
setup.SCSDL.MftfPpB.Mcb.head = ["dpBFaceMcb","dpBBangMcb","dpBHairbaseMcb","dpBTailMcb"];
setup.SCSDL.MftfPpB.Mcr = [];
setup.SCSDL.MftfPpB.Mcr.head = ["dpBFaceMcr","dpBBangMcr","dpBHairbaseMcr"];

setup.SCSDL.MftfPpB.Ns = [];
setup.SCSDL.MftfPpB.Ns.head = ["dpBFaceDh","dpBBangDh","dpBHairbaseDh","dpBSidehairDh"];

setup.SCSDL.MftfPpB.GrayCharacter = [];
setup.SCSDL.MftfPpB.GrayCharacter.core = ["dpBTrunklegGf"];
setup.SCSDL.MftfPpB.GrayCharacter.bigChest = ["dpBChestGfbig"];
setup.SCSDL.MftfPpB.GrayCharacter.medChest = ["dpBChestGfmedium"];
setup.SCSDL.MftfPpB.GrayCharacter.smaChest = ["dpBChestGfsmall"];
setup.SCSDL.MftfPpB.GrayCharacter.dick = ["dpBBPussydickGfsmall"];
setup.SCSDL.MftfPpB.GrayCharacter.dickAnal = ["dpBAnaldickGfsmall"];
setup.SCSDL.MftfPpB.GrayCharacter.dickDouble = ["dpBBPussydickGfsmall","dpBAnaldickGfsmall"];
setup.SCSDL.MftfPpB.GrayCharacter.doubleDildo = ["ddpBDildoWh"];
setup.SCSDL.MftfPpB.GrayCharacter.arms = ["dpBLhandGf","dpBRarmGf","dpBRforearmGf","dpBLforearmGf"];
setup.SCSDL.MftfPpB.GrayCharacter.legs = ["dpBRlegGf"];
setup.SCSDL.MftfPpB.GrayCharacter.lockedArms = ["dpBlockedLarmGf","dpBlockedRarmGf","dpBRlockedRforearmGf"];
setup.SCSDL.MftfPpB.GrayCharacter.lockedLegs = ["dpBRlegGf"];
setup.SCSDL.MftfPpB.GrayCharacter.head = ["dpBHeadGf"];

setup.SCSDL.MftfPpB.MGrayCharacter = [];
setup.SCSDL.MftfPpB.MGrayCharacter.core = ["dpBTrunklegGm"];
setup.SCSDL.MftfPpB.MGrayCharacter.dick = ["dpBPussydickGmsmall"];
setup.SCSDL.MftfPpB.MGrayCharacter.dickAnal = ["dpBAnaldickGmsmall"];
setup.SCSDL.MftfPpB.MGrayCharacter.dickDouble = ["dpBPussydickGmsmall","dpBAnaldickGmsmall"];
setup.SCSDL.MftfPpB.MGrayCharacter.doubleDildo = ["ddpBDildoWh"];
setup.SCSDL.MftfPpB.MGrayCharacter.arms = ["dpBLhandGm","dpBRarmGm","dpBRforearmGm","dpBLforearmGm"];
setup.SCSDL.MftfPpB.MGrayCharacter.legs = ["dpBRlegGm"];
setup.SCSDL.MftfPpB.MGrayCharacter.lockedArms = ["dpBlockedRforearmGm","dpBlockedRarmGm","dpBlockedLarmGm"];
setup.SCSDL.MftfPpB.MGrayCharacter.lockedLegs = ["dpBRlegGm"];
setup.SCSDL.MftfPpB.MGrayCharacter.head = ["dpBHeadGm"];

setup.SCSDL.MftfPpB.Bondage = [];
setup.SCSDL.MftfPpB.Bondage.blindfold = ["dpBBlindfold"];
setup.SCSDL.MftfPpB.Bondage.gag = ["dpBGag"];
setup.SCSDL.MftfPpB.Bondage.collar = ["dpBCollar"];
setup.SCSDL.MftfPpB.Bondage.armbinds = ["dpBRhandcuffs","dpBLhandcuffs","dpBLchainhandcuffs"];
setup.SCSDL.MftfPpB.Bondage.legbinds = [];
setup.SCSDL.MftfPpB.Bondage.lNipcaps = ["dpBnippless"];
setup.SCSDL.MftfPpB.Bondage.mNipcaps = ["dpBnippless"];
setup.SCSDL.MftfPpB.Bondage.sNipcaps = ["dpBnippless"];
setup.SCSDL.MftfPpB.Bondage.fNipcaps = ["dpBnippless"];
setup.SCSDL.MftfPpB.Bondage.buttplug = [];
// setup.SCSDL.MftfPpB.Bondage.chcage = []; // Unusable
// setup.SCSDL.MftfPpB.Bondage.chbelt = []; // Unusable

	// Mount Face to Face Penetrate Ass 
setup.SCSDL.MftfPaB = []; // Mount Face to Face Penetrate Ass Bottom
setup.SCSDL.MftfPaB.WhiteHuman = [];
setup.SCSDL.MftfPaB.WhiteHuman.core = ["dpBTrunklegWh"];
setup.SCSDL.MftfPaB.WhiteHuman.bigChest = ["dpBChestWhbig"];
setup.SCSDL.MftfPaB.WhiteHuman.medChest = ["dpBChestWhmedium"];
setup.SCSDL.MftfPaB.WhiteHuman.smaChest = ["dpBChestWhsmall"];
setup.SCSDL.MftfPaB.WhiteHuman.dick = ["dpBAnaldickWh"];
setup.SCSDL.MftfPaB.WhiteHuman.arms = ["dpBLhandWh","dpBRarmdWh","dpBRforearmWh"];
setup.SCSDL.MftfPaB.WhiteHuman.legs = ["dpBRlegWh"];
setup.SCSDL.MftfPaB.WhiteHuman.lockedArms = ["dpBLhandWh","dpBRarmdWh","dpBRforearmWh"];
setup.SCSDL.MftfPaB.WhiteHuman.lockedLegs = ["dpBRlegWh"];

setup.SCSDL.MftfPaB.Mcy = [];
setup.SCSDL.MftfPaB.Mcy.head = ["dpBHeadMcy"];
setup.SCSDL.MftfPaB.Mcb = [];
setup.SCSDL.MftfPaB.Mcb.head = ["dpBHeadMcb","dpBTailMcb"];
setup.SCSDL.MftfPaB.Mcr = [];
setup.SCSDL.MftfPaB.Mcr.head = ["dpBHeadMcr","dpBTailMcr"];

setup.SCSDL.MftfPaB.GrayCharacter = [];
setup.SCSDL.MftfPaB.GrayCharacter.core = ["dpBTrunklegGf"];
setup.SCSDL.MftfPaB.GrayCharacter.bigChest = ["dpBChestGfbig"];
setup.SCSDL.MftfPaB.GrayCharacter.medChest = ["dpBChestGfmedium"];
setup.SCSDL.MftfPaB.GrayCharacter.smaChest = ["dpBChestGfsmall"];
setup.SCSDL.MftfPaB.GrayCharacter.dick = ["dpBAnaldickGf"];
setup.SCSDL.MftfPaB.GrayCharacter.arms = ["dpBLhandGf","dpBRarmGf","dpBRforearmGf"];
setup.SCSDL.MftfPaB.GrayCharacter.legs = ["dpBRlegGf"];
setup.SCSDL.MftfPaB.GrayCharacter.lockedArms = ["dpBLhandGf","dpBRarmGf","dpBRforearmGf"];
setup.SCSDL.MftfPaB.GrayCharacter.lockedLegs = ["dpBRlegGf"];
setup.SCSDL.MftfPaB.GrayCharacter.head = ["dpBHeadGf"];

setup.SCSDL.MftfPaB.MGrayCharacter = [];
setup.SCSDL.MftfPaB.MGrayCharacter.core = ["dpBTrunklegGm"];
setup.SCSDL.MftfPaB.MGrayCharacter.dick = ["dpBAnaldickGm"];
setup.SCSDL.MftfPaB.MGrayCharacter.arms = ["dpBLhandGm","dpBRarmdGm","dpBRforearmGm"];
setup.SCSDL.MftfPaB.MGrayCharacter.legs = ["dpBRlegGm"];
setup.SCSDL.MftfPaB.MGrayCharacter.lockedArms = ["dpBLhandGm","dpBRarmdGm","dpBRforearmGm"];
setup.SCSDL.MftfPaB.MGrayCharacter.lockedLegs = ["dpBRlegGm"];
setup.SCSDL.MftfPaB.MGrayCharacter.head = ["dpBHeadGm"];

setup.SCSDL.MftfDpB = []; // Mount Face to Face Double Penetration Bottom
setup.SCSDL.MftfDpB.WhiteHuman = [];
setup.SCSDL.MftfDpB.WhiteHuman.core = ["dpBTrunklegWh"];
setup.SCSDL.MftfDpB.WhiteHuman.bigChest = ["dpBChestWhbig"];
setup.SCSDL.MftfDpB.WhiteHuman.medChest = ["dpBChestWhmedium"];
setup.SCSDL.MftfDpB.WhiteHuman.smaChest = ["dpBChestWhsmall"];
setup.SCSDL.MftfDpB.WhiteHuman.dick = ["dpBDobledickWh"];
setup.SCSDL.MftfDpB.WhiteHuman.arms = ["dpBLhandWh","dpBRarmdWh","dpBRforearmWh"];
setup.SCSDL.MftfDpB.WhiteHuman.legs = ["dpBRlegWh"];
setup.SCSDL.MftfDpB.WhiteHuman.lockedArms = ["dpBLhandWh","dpBRarmdWh","dpBRforearmWh"];
setup.SCSDL.MftfDpB.WhiteHuman.lockedLegs = ["dpBRlegWh"];

setup.SCSDL.MftfDpB.Mcy = [];
setup.SCSDL.MftfDpB.Mcy.head = ["dpBHeadMcy"];
setup.SCSDL.MftfDpB.Mcb = [];
setup.SCSDL.MftfDpB.Mcb.head = ["dpBHeadMcb","dpBTailMcb"];
setup.SCSDL.MftfDpB.Mcr = [];
setup.SCSDL.MftfDpB.Mcr.head = ["dpBHeadMcr","dpBTailMcr"];

setup.SCSDL.MftfDpB.GrayCharacter = [];
setup.SCSDL.MftfDpB.GrayCharacter.core = ["dpBTrunklegGf"];
setup.SCSDL.MftfDpB.GrayCharacter.bigChest = ["dpBChestGfbig"];
setup.SCSDL.MftfDpB.GrayCharacter.medChest = ["dpBChestGfmedium"];
setup.SCSDL.MftfDpB.GrayCharacter.smaChest = ["dpBChestGfsmall"];
setup.SCSDL.MftfDpB.GrayCharacter.dick = ["dpBDobledickGf"];
setup.SCSDL.MftfDpB.GrayCharacter.arms = ["dpBLhandGf","dpBRarmGf","dpBRforearmGf"];
setup.SCSDL.MftfDpB.GrayCharacter.legs = ["dpBRlegGf"];
setup.SCSDL.MftfDpB.GrayCharacter.lockedArms = ["dpBLhandGf","dpBRarmGf","dpBRforearmGf"];
setup.SCSDL.MftfDpB.GrayCharacter.lockedLegs = ["dpBRlegGf"];
setup.SCSDL.MftfDpB.GrayCharacter.head = ["dpBHeadGf"];

setup.SCSDL.MftfDpB.MGrayCharacter = [];
setup.SCSDL.MftfDpB.MGrayCharacter.core = ["dpBTrunklegGm"];
setup.SCSDL.MftfDpB.MGrayCharacter.dick = ["dpBDobledickGm"];
setup.SCSDL.MftfDpB.MGrayCharacter.arms = ["dpBLhandGm","dpBRarmdGm","dpBRforearmGm"];
setup.SCSDL.MftfDpB.MGrayCharacter.legs = ["dpBRlegGm"];
setup.SCSDL.MftfDpB.MGrayCharacter.lockedArms = ["dpBLhandGm","dpBRarmdGm","dpBRforearmGm"];
setup.SCSDL.MftfDpB.MGrayCharacter.lockedLegs = ["dpBRlegGm"];
setup.SCSDL.MftfDpB.MGrayCharacter.head = ["dpBHeadGm"];

	// Mount Face to Face Standard
setup.SCSDL.MftfDdpB = []; // Mount Face to Face Double Dildo Pussy Penetration Bottom
setup.SCSDL.MftfDdpB.WhiteHuman = [];
setup.SCSDL.MftfDdpB.WhiteHuman.core = ["ddpBTrunklegarmWh","ddpBDildoWh"];
setup.SCSDL.MftfDdpB.WhiteHuman.bigChest = ["ddpBChestWhbig"];
setup.SCSDL.MftfDdpB.WhiteHuman.medChest = ["ddpBChestWhmedium"];
setup.SCSDL.MftfDdpB.WhiteHuman.smaChest = ["ddpBChestWhsmall"];
setup.SCSDL.MftfDdpB.WhiteHuman.arms = ["ddpBFingersWh","ddpBRarmdWh","ddpBRforearmWh"];
setup.SCSDL.MftfDdpB.WhiteHuman.legs = ["ddpBRlegWh"];
setup.SCSDL.MftfDdpB.WhiteHuman.lockedArms = ["ddpBFingersWh","ddpBRarmdWh","ddpBRforearmWh"];
setup.SCSDL.MftfDdpB.WhiteHuman.lockedLegs = ["ddpBRlegWh"];

setup.SCSDL.MftfDdpB.Mcy = [];
setup.SCSDL.MftfDdpB.Mcy.head = ["ddpBHeadMcy"];
setup.SCSDL.MftfDdpB.Mcb = [];
setup.SCSDL.MftfDdpB.Mcb.head = ["ddpBHeadMcb","ddpBTailMcb"];
setup.SCSDL.MftfDdpB.Mcr = [];
setup.SCSDL.MftfDdpB.Mcr.head = ["ddpBHeadMcr","ddpBTailMcr"];

setup.SCSDL.MftfDdpB.GrayCharacter = [];
setup.SCSDL.MftfDdpB.GrayCharacter.core = ["ddpBTrunklegarmGf","ddpBDildoGf"];
setup.SCSDL.MftfDdpB.GrayCharacter.bigChest = ["ddpBChestGfbig"];
setup.SCSDL.MftfDdpB.GrayCharacter.medChest = ["ddpBChestGfmedium"];
setup.SCSDL.MftfDdpB.GrayCharacter.smaChest = ["ddpBChestGfsmall"];
setup.SCSDL.MftfDdpB.GrayCharacter.arms = ["ddpBFingersGf","ddpBRarmGf","ddpBRforearmGf"];
setup.SCSDL.MftfDdpB.GrayCharacter.legs = ["ddpBRlegGf"];
setup.SCSDL.MftfDdpB.GrayCharacter.lockedArms = ["ddpBFingersGf","ddpBRarmGf","ddpBRforearmGf"];
setup.SCSDL.MftfDdpB.GrayCharacter.lockedLegs = ["ddpBRlegGf"];
setup.SCSDL.MftfDdpB.GrayCharacter.head = ["ddpBHeadGf"];

setup.SCSDL.MftfDdpB.MGrayCharacter = [];
setup.SCSDL.MftfDdpB.MGrayCharacter.core = ["ddpBTrunklegarmGm","ddpBDildoGm"];
setup.SCSDL.MftfDdpB.MGrayCharacter.arms = ["ddpBFingersGm","ddpBRarmdGm","ddpBRforearmGm"];
setup.SCSDL.MftfDdpB.MGrayCharacter.legs = ["ddpBRlegGm"];
setup.SCSDL.MftfDdpB.MGrayCharacter.lockedArms = ["ddpBFingersGm","ddpBRarmdGm","ddpBRforearmGm"];
setup.SCSDL.MftfDdpB.MGrayCharacter.lockedLegs = ["ddpBRlegGm"];
setup.SCSDL.MftfDdpB.MGrayCharacter.head = ["ddpBHeadGm"];

setup.SCSDL.MfbStdT = []; // Mount From Behind Top
setup.SCSDL.MfbStdT.WhiteHuman = [];
setup.SCSDL.MfbStdT.WhiteHuman.core = ["mfbTTrunkWh"];
setup.SCSDL.MfbStdT.WhiteHuman.bigChest = ["mfbTChestWhbig"];
setup.SCSDL.MfbStdT.WhiteHuman.medChest = ["mfbTChestWhmedium"];
setup.SCSDL.MfbStdT.WhiteHuman.smaChest = ["mfbTChestWhsmall"];
setup.SCSDL.MfbStdT.WhiteHuman.dick = [];
setup.SCSDL.MfbStdT.WhiteHuman.arms = ["mfbTRarmWh","mfbTLarmWh"];
setup.SCSDL.MfbStdT.WhiteHuman.legs = [];
setup.SCSDL.MfbStdT.WhiteHuman.lockedArms = ["mfbTRarmWh","mfbTLarmWh"];
setup.SCSDL.MfbStdT.WhiteHuman.lockedLegs = [];

setup.SCSDL.MfbStdT.Mcy = [];
setup.SCSDL.MfbStdT.Mcy.head = ["mfbTHeadMcy"];
setup.SCSDL.MfbStdT.Mcb = [];
setup.SCSDL.MfbStdT.Mcb.head = ["mfbTHeadMcb","mfbTTailMcb"];
setup.SCSDL.MfbStdT.Mcr = [];
setup.SCSDL.MfbStdT.Mcr.head = ["mfbTHeadMcr","mfbTTailMcr"];

setup.SCSDL.MfbStdT.GrayCharacter = [];
setup.SCSDL.MfbStdT.GrayCharacter.core = ["mfbTTrunkGf"];
setup.SCSDL.MfbStdT.GrayCharacter.bigChest = ["mfbTChestGfbig"];
setup.SCSDL.MfbStdT.GrayCharacter.medChest = ["mfbTChestGfmedium"];
setup.SCSDL.MfbStdT.GrayCharacter.smaChest = ["mfbTChestGfsmall"];
setup.SCSDL.MfbStdT.GrayCharacter.dick = [];
setup.SCSDL.MfbStdT.GrayCharacter.arms = ["mfbTRarmGf","mfbTLarmGf"];
setup.SCSDL.MfbStdT.GrayCharacter.legs = [];
setup.SCSDL.MfbStdT.GrayCharacter.lockedArms = ["mfbTRarmGf","mfbTLarmGf"];
setup.SCSDL.MfbStdT.GrayCharacter.lockedLegs = [];
setup.SCSDL.MfbStdT.GrayCharacter.head = ["mfbTHeadGf"];

setup.SCSDL.MfbStdT.MGrayCharacter = [];
setup.SCSDL.MfbStdT.MGrayCharacter.core = ["mfbTTrunkGm"];
setup.SCSDL.MfbStdT.MGrayCharacter.dick = [];
setup.SCSDL.MfbStdT.MGrayCharacter.arms = ["mfbTRarmGm","mfbTLarmGm"];
setup.SCSDL.MfbStdT.MGrayCharacter.legs = [];
setup.SCSDL.MfbStdT.MGrayCharacter.lockedArms = ["mfbTRarmGm","mfbTLarmGm"];
setup.SCSDL.MfbStdT.MGrayCharacter.lockedLegs = [];
setup.SCSDL.MfbStdT.MGrayCharacter.head = ["mfbTHeadGm"];

setup.SCSDL.MfbStdB = []; // Mount From Behind Bottom
setup.SCSDL.MfbStdB.WhiteHuman = [];
setup.SCSDL.MfbStdB.WhiteHuman.core = ["mfbBTrunklegarmWh"];
setup.SCSDL.MfbStdB.WhiteHuman.bigChest = ["mfbBChestWhbig"];
setup.SCSDL.MfbStdB.WhiteHuman.medChest = ["mfbBChestWhmedium"];
setup.SCSDL.MfbStdB.WhiteHuman.smaChest = ["mfbBChestWhsmall"];
setup.SCSDL.MfbStdB.WhiteHuman.dick = [];
setup.SCSDL.MfbStdB.WhiteHuman.arms = [];
setup.SCSDL.MfbStdB.WhiteHuman.legs = ["mfbBLlegWh"];
setup.SCSDL.MfbStdB.WhiteHuman.lockedArms = [];
setup.SCSDL.MfbStdB.WhiteHuman.lockedLegs = ["mfbBLlegWh"];

setup.SCSDL.MfbStdB.Mcy = [];
setup.SCSDL.MfbStdB.Mcy.head = ["mfbBHeadMcy"];
setup.SCSDL.MfbStdB.Mcb = [];
setup.SCSDL.MfbStdB.Mcb.head = ["mfbBHeadMcb"];
setup.SCSDL.MfbStdB.Mcr = [];
setup.SCSDL.MfbStdB.Mcr.head = ["mfbBHeadMcr"];

setup.SCSDL.MfbStdB.GrayCharacter = [];
setup.SCSDL.MfbStdB.GrayCharacter.core = ["mfbBTrunklegarmGf"];
setup.SCSDL.MfbStdB.GrayCharacter.bigChest = ["mfbBChestGfbig"];
setup.SCSDL.MfbStdB.GrayCharacter.medChest = ["mfbBChestGfmedium"];
setup.SCSDL.MfbStdB.GrayCharacter.smaChest = ["mfbBChestGfsmall"];
setup.SCSDL.MfbStdB.GrayCharacter.dick = [];
setup.SCSDL.MfbStdB.GrayCharacter.arms = [];
setup.SCSDL.MfbStdB.GrayCharacter.legs = ["mfbBLlegGf"];
setup.SCSDL.MfbStdB.GrayCharacter.lockedArms = [];
setup.SCSDL.MfbStdB.GrayCharacter.lockedLegs = ["mfbBLlegGf"];
setup.SCSDL.MfbStdB.GrayCharacter.head = ["mfbBHeadGf"];

setup.SCSDL.MfbStdB.MGrayCharacter = [];
setup.SCSDL.MfbStdB.MGrayCharacter.core = ["mfbBTrunklegarmGm"];
setup.SCSDL.MfbStdB.MGrayCharacter.dick = [];
setup.SCSDL.MfbStdB.MGrayCharacter.arms = [];
setup.SCSDL.MfbStdB.MGrayCharacter.legs = ["mfbBLlegGm"];
setup.SCSDL.MfbStdB.MGrayCharacter.lockedArms = [];
setup.SCSDL.MfbStdB.MGrayCharacter.lockedLegs = ["mfbBLlegGm"];
setup.SCSDL.MfbStdB.MGrayCharacter.head = ["mfbBHeadGm"];


window.getScSprite = function(spriteVarName) {
	return setup.SCSL[spriteVarName];
}

///// VALID ANIMATION SETS /////
// Valid animation sets are defined at < setup.vAnSetsList > , defining the valid continued actions, the conditions to identify a valid ocurrence, and the animation data
// Animation data is created above, at < Scene Sprites Sets Data Lists >

window.vAnSet = function(vasKey,vCaList,extraConditions,result) {
	this.vasKey = vasKey; // Valid Animation Set key
	this.vCaList = vCaList; // Valid Continued Actions List
	this.extraConditions = extraConditions; // Function, determines if all extra conditions are met
	this.result = result; // Function, returns the Valid Animation Data
}


setup.vAnSetsList = []; // Valid Animation Sets List
// Mount Face to Face, Mount Dick
setup.vAnSetsList.MftfMd = new vAnSet("MftfMd", // Key
["mountDick"], // Valid CAs
function(ca) { // Extra conditions
	var conditionsMet = false;
	if ( ["mountingFaceToFace","mountedFaceToFace","mountingAndMounted"].includes(gC(ca.initiator).position.key) ) { 
		if ( ["mountingFaceToFace","mountedFaceToFace","mountingAndMounted"].includes(gC(ca.targetsList[0]).position.key) ) {
			conditionsMet = true;
		}
	}
	return conditionsMet;
},
function(ca) { // Returned Valid Animation Data
	var vad = ["mountDick",[],"MftfMd" + ca.initiator + ca.targetsList[0],[]];
	if ( ca.key == "penetratePussy" ) {
		vad[1] = [[ca.targetsList[0],"MftfMdT"],[ca.initiator,"MftfMdB"]];
	} else if ( ca.key == "mountDick" ) {
		vad[1] = [[ca.targetsList[0],"MftfMdB"],[ca.initiator,"MftfMdT"]];
	}
	return vad;
}
);
// Mount Face to Face, Anal Mount Dick
setup.vAnSetsList.MftfAmd = new vAnSet("MftfAmd", // Key
["analMountDick"], // Valid CAs
function(ca) { // Extra conditions
	var conditionsMet = false;
	if ( ["mountingFaceToFace","mountedFaceToFace","mountingAndMounted"].includes(gC(ca.initiator).position.key) ) { 
		if ( ["mountingFaceToFace","mountedFaceToFace","mountingAndMounted"].includes(gC(ca.targetsList[0]).position.key) ) {
			conditionsMet = true;
		}
	}
	return conditionsMet;
},
function(ca) { // Returned Valid Animation Data
	var vad = ["analMountDick",[],"MftfAmd" + ca.initiator + ca.targetsList[0],[]];
	if ( ca.key == "penetrateAss" ) {
		vad[1] = [[ca.targetsList[0],"MftfAmdT"],[ca.initiator,"MftfAmdB"]];
	} else if ( ca.key == "analMountDick" ) {
		vad[1] = [[ca.targetsList[0],"MftfAmdB"],[ca.initiator,"MftfAmdT"]];
	}
	return vad;
}
);
// Mount Face to Face, Penetrate Pussy, Penetrate Ass, Double Penetration
setup.vAnSetsList.MftfPen = new vAnSet("MftfPen", // Key
["penetratePussy","penetrateAss","doublePenetration","doubleDildoPussyPenetration"], // Valid CAs
function(ca) { // Extra conditions
	var conditionsMet = false;
	if ( ["mountingFaceToFace","mountingAndMounted"].includes(gC(ca.initiator).position.key) ) { 
		if ( ["mountedFaceToFace"].includes(gC(ca.targetsList[0]).position.key) ) {
			conditionsMet = true;
		}
	}
	return conditionsMet;
},
function(ca) { // Returned Valid Animation Data
	var vad = ["penetratePussy",[],"MftfPen" + ca.initiator + ca.targetsList[0],[]];
	vad[1] = [[ca.targetsList[0],"MftfPntT"],[ca.initiator,"MftfPpB"]];
	if ( ca.key == "penetratePussy" ) {
		vad[2] = "MftfPpus" + ca.initiator + ca.targetsList[0];
	} else if ( ca.key == "penetrateAss" ) {
		vad[2] = "MftfPAss" + ca.initiator + ca.targetsList[0];
		vad[3] = "analPen"; // Extra args
	} else if ( ca.key == "doublePenetration" ) {
		vad[2] = "MftfDPen" + ca.initiator + ca.targetsList[0];
		vad[3] = "doublePen"; // Extra args
	}
	/*
	else if ( ca.key == "doubleDildoPussyPenetration" ) {
		vad[1] = [[ca.targetsList[0],"MftfPntT"],[ca.initiator,"MftfDdpB"]];
		vad[2] = "MftfDdPus" + ca.initiator + ca.targetsList[0];
		vad[3] = "doubleDildoPen"; // Extra args
	}
	*/
	return vad;
}
);
// Mount Face to Face, Scissors
setup.vAnSetsList.MftfScs = new vAnSet("MftfScs", // Key
["interlockLegs"], // Valid CAs
function(ca) { // Extra conditions
	var conditionsMet = false;
	if ( ["mountingFaceToFace","mountedFaceToFace","mountingAndMounted"].includes(gC(ca.initiator).position.key) ) { 
		if ( ["mountingFaceToFace","mountedFaceToFace","mountingAndMounted"].includes(gC(ca.targetsList[0]).position.key) ) {
			conditionsMet = true;
		}
	}
	return conditionsMet;
},
function(ca) { // Returned Valid Animation Data
	var vad = ["interlockLegs",[[ca.initiator,"MftfScsT"],[ca.targetsList[0],"MftfScsB"]],"interlockLegs" + ca.initiator + ca.targetsList[0],[]];
	return vad;
}
);
// Mount From Behind, Standard
setup.vAnSetsList.MfbStd = new vAnSet("MfbStd", // Key
["penetratePussy","penetrateAss","doublePenetration"], // Valid CAs
function(ca) { // Extra conditions
	var conditionsMet = false;
	if ( ["mountingFromBehind","spitroastBehind","mountingAndMounted","mountingFromBehind"].includes(gC(ca.initiator).position.key) ) { 
		if ( ["mountedFromBehind","spitroastTarget","mountedFromBehind","mountingAndMounted"].includes(gC(ca.targetsList[0]).position.key) ) {
			conditionsMet = true;
		}
	}
	return conditionsMet;
},
function(ca) { // Returned Valid Animation Data
	var vad = ["penetratePussy",[[ca.initiator,"MfbStdT"],[ca.targetsList[0],"MfbStdB"]],"penetratePussy" + ca.initiator + ca.targetsList[0],[]];
	return vad;
}
);

window.getAllValidAnimationsData = function() {
	var vadSets = [];
	for ( var ca of State.variables.sc.continuedActions ) {
		for ( var i in setup.vAnSetsList ) {
			if ( setup.vAnSetsList[i] instanceof vAnSet ) {
				if ( setup.vAnSetsList[i].vCaList.includes(ca.key) ) {
					if ( setup.vAnSetsList[i].extraConditions(ca) == true ) {
						vadSets.push(setup.vAnSetsList[i].result(ca));
					}
				}
			}
		}
	}
	//State.variables.logL1.push("valid animation data Sets:",vadSets);
	return vadSets;
}

/*

	// Select valid animation
		// Which Continued Actions are currently active? Do the related actors have the correct position?
	for ( var ca of State.variables.sc.continuedActions ) {
		if ( ca.key == "penetratePussy" || ca.key == "mountDick" ) { // Mount face to face, Mount dick / Penetrate pussy
			if ( gC(ca.initiator).position.key == "mountingFaceToFace" || gC(ca.initiator).position.key == "mountedFaceToFace" || gC(ca.initiator).position.key == "mountingAndMounted" ) { // Correct actor position
				if ( gC(ca.targetsList[0]).position.key == "mountingFaceToFace" || gC(ca.targetsList[0]).position.key == "mountedFaceToFace" || gC(ca.targetsList[0]).position.key == "mountingAndMounted" ) { // Correct target position
					//if ( gC(ca.targetsList[0]).perPr == "she" && gC(ca.initiator).perPr == "she" ) {
						if ( ca.key == "penetratePussy" ) { validAnimations.push(["mountDick",ca.targetsList[0],ca.initiator]); }
						else if ( ca.key == "mountDick" ) { validAnimations.push(["mountDick",ca.initiator,ca.targetsList[0]]); }
					//}
				}
			}
		}
	}
	*/
