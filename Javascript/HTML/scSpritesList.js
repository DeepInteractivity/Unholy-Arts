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
		// White Human // Wh -> White Human ; Mcy -> Main Character Yellow

setup.SCSL.dpTTrunkWh = new scSprite("dpTTrunkWh","dp-t-trunk-wh.gif",10,[133,255],[235,64],"dpTTrunk","WhT","Mftfdp"); 
setup.SCSL.dpTChestWhbig = new scSprite("dpTChestWhbig","dp-t-chest-whBig.gif",50,[85,97],[289,96],"dpTChest","WhT","Mftfdp"); // 
setup.SCSL.dpTChestWhmedium = new scSprite("dpTChestWhmedium","dp-t-chest-whMed.gif",50,[85,97],[289,96],"dpTChest","WhT","Mftfdp"); 
setup.SCSL.dpTChestWhsmall = new scSprite("dpTChestWhsmall","dp-t-chest-whSmall.gif",50,[79,70],[298,103],"dpTChest","WhT","Mftfdp"); // 
setup.SCSL.dpTHandpalmWh = new scSprite("dpTHandpalmWh","dp-t-handpalm-wh.gif",5,[37,63],[295,103],"dpTHandpalm","WhT","Mftfdp"); 
setup.SCSL.dpTRarmWh = new scSprite("dpTRarmWh","dp-t-rArm-wh.gif",60,[202,161],[272,106],"dpTRarm","WhT","Mftfdp"); 
setup.SCSL.dpTRlegWh = new scSprite("dpTRlegWh","dp-t-RLeg-wh.gif",30,[266,180],[306,232],"dpTRleg","WhT","Mftfdp"); 
setup.SCSL.dpTfeetWh = new scSprite("dpTfeetWh","dp-t-feet-wh.gif",0,[70,54],[428,278],"dpTfeet","WhT","Mftfdp"); 
setup.SCSL.dpTHeadMcy = new scSprite("dpTHeadMcy","dp-t-head-mcy.gif",100,[127,121],[195,9],"dpTHead","McyT","Mftfdp"); // Main character yellow
setup.SCSL.dpTHeadMcb = new scSprite("dpTHeadMcb","dp-t-head-mcb.gif",100,[182,353],[140,7],"dpTHead","McbT","Mftfdp"); // Main character black
setup.SCSL.dpTHeadMcr = new scSprite("dpTHeadMcr","dp-t-head-mcr.gif",100,[150,229],[177,7],"dpTHead","McrT","Mftfdp"); // Main character red 

	     // Gray character // Gf -> Gray Female

setup.SCSL.dpTTrunkGf = new scSprite("dpTTrunkGf","dp-t-trunk-gf.gif",10,[133,255],[235,64],"dpTTrunk","GfT","Mftfdp"); 
setup.SCSL.dpTChestGfbig = new scSprite("dpTChestGfbig","dp-t-chest-gfBig.gif",50,[85,97],[289,96],"dpTChest","GfT","Mftfdp"); // 
setup.SCSL.dpTChestGfmedium = new scSprite("dpTChestGfmedium","dp-t-chest-gfMed.gif",50,[85,97],[289,96],"dpTChest","GfT","Mftfdp"); 
setup.SCSL.dpTChestGfsmall = new scSprite("dpTChestGfsmall","dp-t-chest-gfSmall.gif",50,[79,70],[298,103],"dpTChest","GfT","Mftfdp"); // 
setup.SCSL.dpTHandpalmGf = new scSprite("dpTHandpalmGf","dp-t-handpalm-gf.gif",5,[37,63],[295,103],"dpTHandpalm","GfT","Mftfdp"); 
setup.SCSL.dpTRarmGf = new scSprite("dpTRarmGf","dp-t-rArm-gf.gif",60,[202,161],[272,106],"dpTRarm","GfT","Mftfdp"); 
setup.SCSL.dpTRlegGf = new scSprite("dpTRlegGf","dp-t-RLeg-gf.gif",30,[266,180],[306,232],"dpTRleg","GfT","Mftfdp"); 
setup.SCSL.dpTfeetGf = new scSprite("dpTfeetGf","dp-t-feet-gf.gif",0,[70,54],[428,278],"dpTfeet","GfT","Mftfdp"); 
setup.SCSL.dpTHeadGf = new scSprite("dpTHeadGf","dp-t-head-gf.gif",100,[127,121],[195,9],"dpTHead","GfT","Mftfdp"); // Main character gray

            // Gray character // Gm -> Gray male

setup.SCSL.dpTTrunkGm = new scSprite("dpTTrunkGm","dp-t-trunk-gm.gif",10,[133,254],[235,64],"dpTTrunk","GmT","Mftfdp"); 
setup.SCSL.dpTHandpalmGm = new scSprite("dpTHandpalmGm","dp-t-handpalm-gm.gif",5,[37,63],[295,103],"dpTHandpalm","GmT","Mftfdp"); 
setup.SCSL.dpTRarmGm = new scSprite("dpTRarmGm","dp-t-rArm-gm.gif",60,[211,160],[264,106],"dpTRarm","GmT","Mftfdp"); 
setup.SCSL.dpTRlegGm = new scSprite("dpTRlegGm","dp-t-RLeg-gm.gif",30,[266,180],[306,232],"dpTRleg","GmT","Mftfdp"); 
setup.SCSL.dpTfeetGm = new scSprite("dpTfeetGm","dp-t-feet-gm.gif",0,[70,54],[428,278],"dpTfeet","GmT","Mftfdp"); 
setup.SCSL.dpTHeadGm = new scSprite("dpTHeadGm","dp-t-head-gm.gif",100,[127,121],[195,9],"dpTHead","GmT","Mftfdp"); // Main character gray


	// Bottom
		// White human

setup.SCSL.dpBDobledickWh = new scSprite("dpBDobledickWh","dp-b-dobledicks-wh.gif",15,[61,107],[304,262],"dpBdicks","WhB","Mftfdp"); // doble dicks bottom 
setup.SCSL.dpBDobledickWhsmall = new scSprite("dpBDobledickWhsmall","dp-b-dobledicks-whSmall.gif",15,[53,25],[315,255],"dpBdicks","WhB","Mftfdp"); // doble dicks bottom small 

setup.SCSL.dpBPussydickWh = new scSprite("dpBPussydickWh","dp-b-pussydick-wh.gif",15,[61,107],[304,262],"dpBdicks","WhB","Mftfdp"); // pussy dick bottom 
setup.SCSL.dpBAnaldickWh = new scSprite("dpBAnaldickWh","dp-b-analdick-wh.gif",15,[61,107],[304,262],"dpBdicks","WhB","Mftfdp"); // anal dick bottom 

setup.SCSL.dpBTrunklegWh = new scSprite("dpBTrunklegWh","dp-b-trunkleg-wh.gif",3,[366,291],[87,102],"dpBTrunkleg","WhB","Mftfdp"); 
setup.SCSL.dpBChestWhbig = new scSprite("dpBChestWhbig","dp-b-chest-whBig.gif",5,[85,97],[322,157],"dpBChest","WhB","Mftfdp"); // 
setup.SCSL.dpBChestWhmedium = new scSprite("dpBChestWhmedium","dp-b-chest-whMed.gif",5,[85,97],[322,157],"dpBChest","WhB","Mftfdp"); 
setup.SCSL.dpBChestWhsmall = new scSprite("dpBChestWhsmall","dp-b-chest-whSmall.gif",5,[85,97],[322,157],"dpBChest","WhB","Mftfdp"); // 
setup.SCSL.dpBLhandWh = new scSprite("dpBLhandWh","dp-b-lhand-wh.gif",90,[62,109],[265,219],"dpBLhand","WhB","Mftfdp"); 
setup.SCSL.dpBRarmdWh = new scSprite("dpBRarmdWh","dp-b-rarm-wh.gif",50,[62,109],[412,149],"dpBRarm","WhB","Mftfdp"); 
setup.SCSL.dpBRforearmWh = new scSprite("dpBRforearmWh","dp-b-rforearm-wh.gif",90,[197,96],[274,176],"dpBRforearm","WhB","Mftfdp"); 
setup.SCSL.dpBRlegWh = new scSprite("dpBRlegWh","dp-b-rLeg-wh.gif",20,[165,97],[261,302],"dpBRleg","WhB","Mftfdp"); 
setup.SCSL.dpBHeadMcy = new scSprite("dpBHeadMcy","dp-b-head-mcy.gif",140,[110,116],[339,33],"dpBHead","McyB","Mftfdp"); // Main character yellow 
setup.SCSL.dpBHeadMcb = new scSprite("dpBHeadMcb","dp-b-head-mcb.gif",140,[108,97],[333,39],"dpBHead","McbB","Mftfdp"); // Main character black 
setup.SCSL.dpBHeadMcr = new scSprite("dpBHeadMcr","dp-b-head-mcr.gif",140,[92,97],[340,40],"dpBHead","McrB","Mftfdp"); // Main character red  
setup.SCSL.dpBTailMcb = new scSprite("dpBTailMcb","dp-b-tail-mcb.gif",1,[183,294],[363,48],"dpBTail","McbB","Mftfdp"); // Tail hair dark character 
setup.SCSL.dpBTailMcr = new scSprite("dpBTailMcr","dp-t-tail-mcr.gif",1,[146,229],[344,34],"dpBTail","McrB","Mftfdp"); // Tails hair red character

	// Gray character // Gf -> Gray Female

setup.SCSL.dpBDobledickGf = new scSprite("dpBDobledickGf","dp-b-dobledicks-gf.gif",15,[61,107],[304,262],"dpBdicks","GfB","Mftfdp"); // doble dicks bottom gray
setup.SCSL.dpBDobledickGfsmall = new scSprite("dpBDobledickGfsmall","dp-b-dobledicks-gfSmall.gif",15,[53,25],[315,255],"dpBdicks","GfB","Mftfdp"); // doble dicks bottom small gray

setup.SCSL.dpBBPussydickGf = new scSprite("dpBBPussydickGf","dp-b-pussydick-gf.gif",15,[61,107],[304,262],"dpBdicks","GfB","Mftfdp"); // pussy front dick bottom gray
setup.SCSL.dpBAnaldickGf = new scSprite("dpBAnaldickGf","dp-b-analdick-gf.gif",15,[61,107],[304,262],"dpBdicks","GfB","Mftfdp"); // anal back dick bottom gray

setup.SCSL.dpBTrunklegGf = new scSprite("dpBTrunklegGf","dp-b-trunkleg-gf.gif",3,[366,291],[87,102],"dpBTrunkleg","GfB","Mftfdp"); 
setup.SCSL.dpBChestGfbig = new scSprite("dpBChestGfbig","dp-b-chest-gfBig.gif",5,[85,97],[322,157],"dpBChest","GfB","Mftfdp"); // 
setup.SCSL.dpBChestGfmedium = new scSprite("dpBChestGfmedium","dp-b-chest-gfMed.gif",5,[85,97],[322,157],"dpBChest","GfB","Mftfdp"); 
setup.SCSL.dpBChestGfsmall = new scSprite("dpBChestGfsmall","dp-b-chest-gfSmall.gif",5,[85,97],[322,157],"dpBChest","GfB","Mftfdp"); // 
setup.SCSL.dpBLhandGf = new scSprite("dpBLhandGf","dp-b-lhand-gf.gif",90,[62,109],[265,219],"dpBLhand","GfB","Mftfdp"); 
setup.SCSL.dpBRarmdGf = new scSprite("dpBRarmdGf","dp-b-rarm-gf.gif",50,[62,109],[412,149],"dpBRarm","GfB","Mftfdp"); 
setup.SCSL.dpBRforearmGf = new scSprite("dpBRforearmGf","dp-b-rforearm-gf.gif",90,[197,96],[274,176],"dpBRforearm","GfB","Mftfdp"); 
setup.SCSL.dpBRlegGf = new scSprite("dpBRlegGf","dp-b-rLeg-gf.gif",20,[165,97],[261,302],"dpBRleg","GfB","Mftfdp"); 
setup.SCSL.dpBHeadGf = new scSprite("dpBHeadGf","dp-b-head-gf.gif",140,[108,97],[332,42],"dpBHead","GfB","Mftfdp"); // Main character gray


        // Gray character // Gm -> Gray male

setup.SCSL.dpBDobledickGm = new scSprite("dpBDobledickGm","dp-b-dobledicks-gm.gif",15,[61,107],[304,262],"dpBdicks","GmB","Mftfdp"); // doble dicks bottom gray
setup.SCSL.dpBDobledickGmsmall = new scSprite("dpBDobledickGmsmall","dp-b-dobledicks-gmSmall.gif",15,[53,25],[315,255],"dpBdicks","GmB","Mftfdp"); // doble dicks bottom small gray

setup.SCSL.dpBBPussydickGm = new scSprite("dpBBPussydickGm","dp-b-pussydick-gm.gif",15,[61,107],[304,262],"dpBdicks","GmB","Mftfdp"); // pussy front dick bottom gray
setup.SCSL.dpBAnaldickGm = new scSprite("dpBAnaldickGm","dp-b-analdick-gm.gif",15,[61,107],[304,262],"dpBdicks","GmB","Mftfdp"); // anal back dick bottom gray

setup.SCSL.dpBTrunklegGm = new scSprite("dpBTrunklegGm","dp-b-trunkleg-gm.gif",3,[366,291],[87,102],"dpBTrunkleg","GmB","Mftfdp"); 
setup.SCSL.dpBLhandGm = new scSprite("dpBLhandGm","dp-b-lhand-gm.gif",90,[37,63],[265,216],"dpBLhand","GmB","Mftfdp");
setup.SCSL.dpBRarmdGm = new scSprite("dpBRarmdGm","dp-b-rarm-gm.gif",50,[62,109],[407,149],"dpBRarm","GmB","Mftfdp"); 
setup.SCSL.dpBRforearmGm = new scSprite("dpBRforearmGm","dp-b-rforearm-gm.gif",90,[197,96],[274,176],"dpBRforearm","GmB","Mftfdp"); 
setup.SCSL.dpBRlegGm = new scSprite("dpBRlegGm","dp-b-rLeg-gm.gif",20,[165,97],[261,302],"dpBRleg","GmB","Mftfdp"); 
setup.SCSL.dpBHeadGm = new scSprite("dpBHeadGm","dp-b-head-gm.gif",140,[108,97],[332,42],"dpBHead","GmB","Mftfdp"); // Main character gray

//////////////////


///// Scene Sprites Sets Data Lists /////

setup.SCSDL = [];
setup.SCSDL.MftfMdT = []; // Mount Face to Face Mount Dick Top
setup.SCSDL.MftfMdT.WhiteHuman = [];
setup.SCSDL.MftfMdT.WhiteHuman.core = ["mffTTrunkWh"];
setup.SCSDL.MftfMdT.WhiteHuman.bigChest = ["mffTChestWhbig"];
setup.SCSDL.MftfMdT.WhiteHuman.medChest = ["mffTChestWhmed"];
setup.SCSDL.MftfMdT.WhiteHuman.smaChest = ["mffTChestWhsma"];
setup.SCSDL.MftfMdT.WhiteHuman.dick = ["mffTDickWh"];
setup.SCSDL.MftfMdT.WhiteHuman.arms = ["mffTRarmWh","mffTLarmWh","mffTLforearmWh","mffTLhandWh"];
setup.SCSDL.MftfMdT.WhiteHuman.legs = ["mffTLlegWh"];

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
setup.SCSDL.MftfMdT.GrayCharacter.head = ["mffTHeadGf"];

setup.SCSDL.MftfMdT.MGrayCharacter = [];
setup.SCSDL.MftfMdT.MGrayCharacter.core = ["mffTTrunkGm","mffTChestGm"];
setup.SCSDL.MftfMdT.MGrayCharacter.dick = ["mffTDickGm"];
setup.SCSDL.MftfMdT.MGrayCharacter.arms = ["mffTRarmGm","mffTLarmGm","mffTLforearmGm","mffTLhandGm"];
setup.SCSDL.MftfMdT.MGrayCharacter.legs = ["mffTLlegGm"];
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
setup.SCSDL.MftfMdB.GrayCharacter.head = ["mffBHeadGf"];

setup.SCSDL.MftfMdB.MGrayCharacter = [];
setup.SCSDL.MftfMdB.MGrayCharacter.core = ["mffBTrunkGm"];
setup.SCSDL.MftfMdB.MGrayCharacter.dick = ["mffBDickGm"];
setup.SCSDL.MftfMdB.MGrayCharacter.arms = ["mffBLarmGm","mffBRarmhandGm","mffBLFingerGf"]; // ,"mffBLFingerGf"
setup.SCSDL.MftfMdB.MGrayCharacter.legs = ["mffBLFootGm","mffBLlegGm","mffBRlegGm"];
setup.SCSDL.MftfMdB.MGrayCharacter.head = ["mffBHeadGm"];

setup.SCSDL.MftfAmdT = []; // Mount Face to Face Anal Mount Dick Top
setup.SCSDL.MftfAmdT.WhiteHuman = [];
setup.SCSDL.MftfAmdT.WhiteHuman.core = ["mffaTTrunkWh"];
setup.SCSDL.MftfAmdT.WhiteHuman.bigChest = ["mffaTChestWhbig"];
setup.SCSDL.MftfAmdT.WhiteHuman.medChest = ["mffaTChestWhmed"];
setup.SCSDL.MftfAmdT.WhiteHuman.smaChest = ["mffaTChestWhsma"];
setup.SCSDL.MftfAmdT.WhiteHuman.dick = ["mffaTDickWh"];
setup.SCSDL.MftfAmdT.WhiteHuman.arms = ["mffaTRarmWh","mffaTLarmWh","mffaTLforearmWh","mffaTLhandWh"];
setup.SCSDL.MftfAmdT.WhiteHuman.legs = ["mffaTLlegWh"];

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
setup.SCSDL.MftfAmdT.GrayCharacter.head = ["mffaTHeadGf"];

setup.SCSDL.MftfAmdT.MGrayCharacter = [];
setup.SCSDL.MftfAmdT.MGrayCharacter.core = ["mffaTTrunkGm","mffaTChestGm"];
setup.SCSDL.MftfAmdT.MGrayCharacter.dick = ["mffaTDickGm"];
setup.SCSDL.MftfAmdT.MGrayCharacter.arms = ["mffaTRarmGm","mffaTLarmGm","mffaTLforearmGm","mffaTLhandGm"];
setup.SCSDL.MftfAmdT.MGrayCharacter.legs = ["mffaTLlegGm"];
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
setup.SCSDL.MftfAmdB.GrayCharacter.head = ["mffaBHeadGf"];

setup.SCSDL.MftfAmdB.MGrayCharacter = [];
setup.SCSDL.MftfAmdB.MGrayCharacter.core = ["mffaBTrunkGm"];
setup.SCSDL.MftfAmdB.MGrayCharacter.dick = ["mffaBDickGm"];
setup.SCSDL.MftfAmdB.MGrayCharacter.arms = ["mffaBRarmhandGm","mffaBLarmGm"]; // ,"mffBLFingerGf"
setup.SCSDL.MftfAmdB.MGrayCharacter.legs = ["mffaBLFootGm","mffaBLlegGm","mffaBRlegGm"];
setup.SCSDL.MftfAmdB.MGrayCharacter.head = ["mffaBHeadGm"];

setup.SCSDL.MftfScsT = []; // Mount Face to Face Scissors Top
setup.SCSDL.MftfScsT.WhiteHuman = [];
setup.SCSDL.MftfScsT.WhiteHuman.core = ["scsTTrunkWh"];
setup.SCSDL.MftfScsT.WhiteHuman.bigChest = ["scsTChestWhbig"];
setup.SCSDL.MftfScsT.WhiteHuman.medChest = ["scsTChestWhmedium"];
setup.SCSDL.MftfScsT.WhiteHuman.smaChest = ["scsTChestWhsmall"];
setup.SCSDL.MftfScsT.WhiteHuman.dick = ["scsTDickWhsmall"];
setup.SCSDL.MftfScsT.WhiteHuman.arms = ["scsTRfingerWh","scsTRarmWh","scsTLarmWh"];
setup.SCSDL.MftfScsT.WhiteHuman.legs = ["scsTLlegWh","scsTRlegWh"];

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
setup.SCSDL.MftfScsT.GrayCharacter.head = ["scsTHeadGf"];

setup.SCSDL.MftfScsT.MGrayCharacter = [];
setup.SCSDL.MftfScsT.MGrayCharacter.core = ["scsTTrunkGm"];
setup.SCSDL.MftfScsT.MGrayCharacter.dick = ["scsTDickGmsmall"];
setup.SCSDL.MftfScsT.MGrayCharacter.arms = ["scsTRfingerGm","scsTRarmGm","scsTLarmGm"];
setup.SCSDL.MftfScsT.MGrayCharacter.legs = ["mffTLlegGm","scsTLlegGm","scsTRlegGm"];
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
setup.SCSDL.MftfScsB.GrayCharacter.head = ["scsBHeadGf"];

setup.SCSDL.MftfScsB.MGrayCharacter = [];
setup.SCSDL.MftfScsB.MGrayCharacter.core = ["scsBTrunkGm"];
setup.SCSDL.MftfScsB.MGrayCharacter.dick = ["scsBDickGmsmall"];
setup.SCSDL.MftfScsB.MGrayCharacter.arms = ["scsBLhandGm","scsBLarmdGm"];
setup.SCSDL.MftfScsB.MGrayCharacter.legs = ["scsBLlegGm","scsBRlegGm"];
setup.SCSDL.MftfScsB.MGrayCharacter.head = ["scsBHeadGm"];

setup.SCSDL.MftfPntT = []; // Mount Face to Face Penetrated Top
setup.SCSDL.MftfPntT.WhiteHuman = [];
setup.SCSDL.MftfPntT.WhiteHuman.core = ["dpTTrunkWh"];
setup.SCSDL.MftfPntT.WhiteHuman.bigChest = ["dpTChestWhbig"];
setup.SCSDL.MftfPntT.WhiteHuman.medChest = ["dpTChestWhmedium"];
setup.SCSDL.MftfPntT.WhiteHuman.smaChest = ["dpTChestWhsmall"];
setup.SCSDL.MftfPntT.WhiteHuman.dick = [];
setup.SCSDL.MftfPntT.WhiteHuman.arms = ["dpTRarmWh","dpTHandpalmWh"];
setup.SCSDL.MftfPntT.WhiteHuman.legs = ["dpTRlegWh","dpTfeetWh"];

setup.SCSDL.MftfPntT.Mcy = [];
setup.SCSDL.MftfPntT.Mcy.head = ["dpTHeadMcy"];
setup.SCSDL.MftfPntT.Mcb = [];
setup.SCSDL.MftfPntT.Mcb.head = ["dpTHeadMcb"];
setup.SCSDL.MftfPntT.Mcr = [];
setup.SCSDL.MftfPntT.Mcr.head = ["dpTHeadMcr"];

setup.SCSDL.MftfPntT.GrayCharacter = [];
setup.SCSDL.MftfPntT.GrayCharacter.core = ["dpTTrunkGf"];
setup.SCSDL.MftfPntT.GrayCharacter.bigChest = ["dpTChestGfbig"];
setup.SCSDL.MftfPntT.GrayCharacter.medChest = ["dpTChestGfmedium"];
setup.SCSDL.MftfPntT.GrayCharacter.smaChest = ["dpTChestGfsmall"];
setup.SCSDL.MftfPntT.GrayCharacter.dick = [];
setup.SCSDL.MftfPntT.GrayCharacter.arms = ["dpTHandpalmGf","dpTRarmGf"];
setup.SCSDL.MftfPntT.GrayCharacter.legs = ["dpTRlegGf","dpTfeetGf"];
setup.SCSDL.MftfPntT.GrayCharacter.head = ["dpTHeadGf"];

setup.SCSDL.MftfPntT.MGrayCharacter = [];
setup.SCSDL.MftfPntT.MGrayCharacter.core = ["dpTTrunkGm"];
setup.SCSDL.MftfPntT.MGrayCharacter.dick = [];
setup.SCSDL.MftfPntT.MGrayCharacter.arms = ["dpTHandpalmGm","dpTRarmGm"];
setup.SCSDL.MftfPntT.MGrayCharacter.legs = ["dpTRlegGm","dpTfeetGm"];
setup.SCSDL.MftfPntT.MGrayCharacter.head = ["dpTHeadGm"];

setup.SCSDL.MftfPpB = []; // Mount Face to Face Penetrate Pussy Bottom
setup.SCSDL.MftfPpB.WhiteHuman = [];
setup.SCSDL.MftfPpB.WhiteHuman.core = ["dpBTrunklegWh"];
setup.SCSDL.MftfPpB.WhiteHuman.bigChest = ["dpBChestWhbig"];
setup.SCSDL.MftfPpB.WhiteHuman.medChest = ["dpBChestWhmedium"];
setup.SCSDL.MftfPpB.WhiteHuman.smaChest = ["dpBChestWhsmall"];
setup.SCSDL.MftfPpB.WhiteHuman.dick = ["dpBPussydickWh"];
setup.SCSDL.MftfPpB.WhiteHuman.arms = ["dpBLhandWh","dpBRarmdWh","dpBRforearmWh"];
setup.SCSDL.MftfPpB.WhiteHuman.legs = ["dpBRlegWh"];

setup.SCSDL.MftfPpB.Mcy = [];
setup.SCSDL.MftfPpB.Mcy.head = ["dpBHeadMcy"];
setup.SCSDL.MftfPpB.Mcb = [];
setup.SCSDL.MftfPpB.Mcb.head = ["dpBHeadMcb","dpBTailMcb"];
setup.SCSDL.MftfPpB.Mcr = [];
setup.SCSDL.MftfPpB.Mcr.head = ["dpBHeadMcr","dpBTailMcr"];

setup.SCSDL.MftfPpB.GrayCharacter = [];
setup.SCSDL.MftfPpB.GrayCharacter.core = ["dpBTrunklegGf"];
setup.SCSDL.MftfPpB.GrayCharacter.bigChest = ["dpBChestGfbig"];
setup.SCSDL.MftfPpB.GrayCharacter.medChest = ["dpBChestGfmedium"];
setup.SCSDL.MftfPpB.GrayCharacter.smaChest = ["dpBChestGfsmall"];
setup.SCSDL.MftfPpB.GrayCharacter.dick = ["dpBBPussydickGf"];
setup.SCSDL.MftfPpB.GrayCharacter.arms = ["dpBLhandGf","dpBRarmdGf","dpBRforearmGf"];
setup.SCSDL.MftfPpB.GrayCharacter.legs = ["dpBRlegGf"];
setup.SCSDL.MftfPpB.GrayCharacter.head = ["dpBHeadGf"];

setup.SCSDL.MftfPpB.MGrayCharacter = [];
setup.SCSDL.MftfPpB.MGrayCharacter.core = ["dpBTrunklegGm"];
setup.SCSDL.MftfPpB.MGrayCharacter.dick = ["dpBBPussydickGm"];
setup.SCSDL.MftfPpB.MGrayCharacter.arms = ["dpBLhandGm","dpBRarmdGm","dpBRforearmGm"];
setup.SCSDL.MftfPpB.MGrayCharacter.legs = ["dpBRlegGm"];
setup.SCSDL.MftfPpB.MGrayCharacter.head = ["dpBHeadGm"];

setup.SCSDL.MftfPaB = []; // Mount Face to Face Penetrate Ass Bottom
setup.SCSDL.MftfPaB.WhiteHuman = [];
setup.SCSDL.MftfPaB.WhiteHuman.core = ["dpBTrunklegWh"];
setup.SCSDL.MftfPaB.WhiteHuman.bigChest = ["dpBChestWhbig"];
setup.SCSDL.MftfPaB.WhiteHuman.medChest = ["dpBChestWhmedium"];
setup.SCSDL.MftfPaB.WhiteHuman.smaChest = ["dpBChestWhsmall"];
setup.SCSDL.MftfPaB.WhiteHuman.dick = ["dpBAnaldickWh"];
setup.SCSDL.MftfPaB.WhiteHuman.arms = ["dpBLhandWh","dpBRarmdWh","dpBRforearmWh"];
setup.SCSDL.MftfPaB.WhiteHuman.legs = ["dpBRlegWh"];

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
setup.SCSDL.MftfPaB.GrayCharacter.arms = ["dpBLhandGf","dpBRarmdGf","dpBRforearmGf"];
setup.SCSDL.MftfPaB.GrayCharacter.legs = ["dpBRlegGf"];
setup.SCSDL.MftfPaB.GrayCharacter.head = ["dpBHeadGf"];

setup.SCSDL.MftfPaB.MGrayCharacter = [];
setup.SCSDL.MftfPaB.MGrayCharacter.core = ["dpBTrunklegGm"];
setup.SCSDL.MftfPaB.MGrayCharacter.dick = ["dpBAnaldickGm"];
setup.SCSDL.MftfPaB.MGrayCharacter.arms = ["dpBLhandGm","dpBRarmdGm","dpBRforearmGm"];
setup.SCSDL.MftfPaB.MGrayCharacter.legs = ["dpBRlegGm"];
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
setup.SCSDL.MftfDpB.GrayCharacter.arms = ["dpBLhandGf","dpBRarmdGf","dpBRforearmGf"];
setup.SCSDL.MftfDpB.GrayCharacter.legs = ["dpBRlegGf"];
setup.SCSDL.MftfDpB.GrayCharacter.head = ["dpBHeadGf"];

setup.SCSDL.MftfDpB.MGrayCharacter = [];
setup.SCSDL.MftfDpB.MGrayCharacter.core = ["dpBTrunklegGm"];
setup.SCSDL.MftfDpB.MGrayCharacter.dick = ["dpBDobledickGm"];
setup.SCSDL.MftfDpB.MGrayCharacter.arms = ["dpBLhandGm","dpBRarmdGm","dpBRforearmGm"];
setup.SCSDL.MftfDpB.MGrayCharacter.legs = ["dpBRlegGm"];
setup.SCSDL.MftfDpB.MGrayCharacter.head = ["dpBHeadGm"];


window.getScSprite = function(spriteVarName) {
	return setup.SCSL[spriteVarName];
}

///// VALID ANIMATION SETS /////

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
	var vad = ["mountDick",[],"MftfMd" + ca.initiator + ca.targetsList[0]];
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
	var vad = ["analMountDick",[],"MftfAmd" + ca.initiator + ca.targetsList[0]];
	if ( ca.key == "penetrateAss" ) {
		vad[1] = [[ca.targetsList[0],"MftfAmdT"],[ca.initiator,"MftfAmdB"]];
	} else if ( ca.key == "analMountDick" ) {
		vad[1] = [[ca.targetsList[0],"MftfAmdB"],[ca.initiator,"MftfAmdT"]];
	}
	return vad;
}
);
// Mount Face to Face, Penetrate Pussy
setup.vAnSetsList.MftfPen = new vAnSet("MftfPen", // Key
["penetratePussy","penetrateAss","doublePenetration"], // ,"penetrateAss"], // Valid CAs
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
	var vad = ["penetratePussy",[],"MftfPen" + ca.initiator + ca.targetsList[0]];
	if ( ca.key == "penetratePussy" ) {
		vad[1] = [[ca.targetsList[0],"MftfPntT"],[ca.initiator,"MftfPpB"]];
		vad[2] = "MftfPpus" + ca.initiator + ca.targetsList[0];
	} else if ( ca.key == "penetrateAss" ) {
		vad[1] = [[ca.targetsList[0],"MftfPntT"],[ca.initiator,"MftfPaB"]];
		vad[2] = "MftfPAss" + ca.initiator + ca.targetsList[0];
	} else if ( ca.key == "doublePenetration" ) {
		vad[1] = [[ca.targetsList[0],"MftfPntT"],[ca.initiator,"MftfDpB"]];
		vad[2] = "MftfDPen" + ca.initiator + ca.targetsList[0];
	}
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
	var vad = ["interlockLegs",[[ca.initiator,"MftfScsT"],[ca.targetsList[0],"MftfScsB"]],"interlockLegs" + ca.initiator + ca.targetsList[0]];
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
