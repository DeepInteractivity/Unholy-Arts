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

// Mount Face to Face, Scissors // MftfScs
	// Top
		// White Human // Wh -> White Human ; Mcy -> Main Character Yellow
setup.SCSL.scsTTrunkWh = new scSprite("scsTTrunkWh","scs-t-trunk-wh.gif",40,[109,203],[267,58],"scsTTrunk","WhT","MftfScs");
setup.SCSL.scsTChestWhbig = new scSprite("scsTChestWhbig","scs-t-chest-whBig.gif",70,[88,88],[293,95],"scsTChest","WhT","MftfScs"); 
setup.SCSL.scsTRarmWh = new scSprite("scsTRarmWh","scs-t-rArm-wh.gif",10,[167,75],[335,60],"scsTRarm","WhT","MftfScs");
setup.SCSL.scsTLarmWh = new scSprite("scsTLarmWh","scs-t-lArm-wh.gif",35,[74,201],[239,72],"scsTLarm","WhT","MftfScs");
setup.SCSL.scsTLlegWh = new scSprite("scsTLlegWh","scs-t-lLeg-wh.gif",75,[233,145],[102,209],"scsTLleg","WhT","MftfScs");
setup.SCSL.scsTHeadMcy = new scSprite("scsTHeadMcy","scs-t-head-mcy.gif",100,[97,112],[263,-16],"scsTHead","McyT","MftfScs"); // Main character yellow
setup.SCSL.scsTHeadMcb = new scSprite("scsTHeadMcb","scs-t-head-mcb.gif",100,[126,231],[268,-7],"scsTHead","McbT","MftfScs"); // Main character black
setup.SCSL.scsTHeadMcr = new scSprite("scsTHeadMcr","scs-t-head-mcr.gif",100,[114,174],[266,-4],"scsTHead","McrT","MftfScs"); // Main character red
setup.SCSL.scsTPonytailMcr = new scSprite("scsTPonytailMcr","scs-t-ponytail-mcb.gif",5,[82,252],[233,-13],"scsTTail","McrT","MftfScs"); // Black hair ponytail

        // Gray character // Gf -> Gray Female


	// Bottom
		// White human
// White human
setup.SCSL.scsBTrunkWh = new scSprite("scsBTrunkWh","scs-b-trunk-wh.gif",30,[268,128],[261,249],"scsBTrunk","WhB","MftfScs");
setup.SCSL.scsBChestWhbig = new scSprite("scsBChestWhbig","scs-b-chest-whBig.gif",45,[110,58],[374,279],"scsBChest","WhB","MftfScs");
setup.SCSL.scsBLhandWh = new scSprite("scsBLhandWh","scs-b-hand-wh.gif",90,[78,63],[253,265],"scsBLhand","WhB","MftfScs");
setup.SCSL.scsBLarmdWh = new scSprite("scsBLarmdWh","scs-b-lArm-wh.gif",90,[154,85],[297,296],"scsBLarm","WhB","MftfScs");
setup.SCSL.scsBLlegWh = new scSprite("scsBLlegWh","scs-b-lLeg-wh.gif",15,[186,93],[182,240],"scsBLleg","WhB","MftfScs");
setup.SCSL.scsBRlegWh = new scSprite("scsBRlegWh","scs-b-rLeg-wh.gif",27,[207,280],[318,32],"scsBRleg","WhB","MftfScs");
setup.SCSL.scsBHeadMcy = new scSprite("scsBHeadMcy","scs-b-head-mcy.gif",140,[110,108],[473,277],"scsBHead","McyB","MftfScs"); // Main character yellow
setup.SCSL.scsBHeadMcb = new scSprite("scsBHeadMcb","scs-b-head-mcb.gif",140,[221,108],[366,273],"scsBHead","McbB","MftfScs"); // Main character black
setup.SCSL.scsBHeadMcr = new scSprite("scsBHeadMcr","scs-b-head-mcr.gif",140,[125,125],[471,276],"scsBHead","McrB","MftfScs"); // Main character red
        
		// Gray character


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

window.getScSprite = function(spriteVarName) {
	return setup.SCSL[spriteVarName];
}

