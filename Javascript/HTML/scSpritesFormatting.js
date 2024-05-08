//////// SCENE SPRITE / SC SPRITE ////////
// Setup objects containing scene sprite data

window.scSprite = function(varName,gifName,positionPriority,dimensions,coordinates,type,group,animation) {
	this.varName = varName; // Variable name, name by which this object is referred to
	this.gifName = gifName; // Name of the sprite file, used to locate the sprite in its appropriate folder
	this.positionPriority = positionPriority; // How high must the sprite appear. Lower priority -> More sprites will be placed on top of it
	this.dimensions = dimensions; // [x,y] Length and height of the sprite
	this.coordinates = coordinates; // [x,y] Where must the sprite be placed from the superior left corner
	this.type = type; // Type of sprite. All sprites of the same type may be interchangeable
	this.group = group; // Group of sprites. All sprites of the same group are intended to form part of the same character and position
	this.animation = animation; // Animation to which this sprite belongs
}

///// Display functions ///// [30,15,5] [20] , 0

window.orderScSpritesList = function(scSpritesList) {
	State.variables.logL1.push(scSpritesList,"ordering");
	var orderedList = [];
	for ( var scs of scSpritesList ) {
		var i = 0;
		var inserted = false;
		if ( orderedList.length > 0 ) {
			while ( i < orderedList.length && inserted == false ) {
				if ( scs.positionPriority < orderedList[i].positionPriority ) { // || (i+1) == orderedList.length ) {
					orderedList.splice(i,0,scs);
					inserted = true;
				}
				i++;
			}
		}
		if ( inserted == false ) {
			orderedList.push(scs);
		}
	}
	return orderedList;
}
window.formatScSpritesList = function(dimensions,bgFileRoute,scSpritesVarNames) {
	var scSpritesList = [];
	State.variables.logL1.push(scSpritesVarNames,"endOfList");
	for ( var scvn of scSpritesVarNames ) {
		scSpritesList.push(getScSprite(scvn));
	}
	var fsfHtml = ""; // formattedSpritesForHtml
	var orderedList = orderScSpritesList(scSpritesList);
	for ( var scs of orderedList ) {
		var x = scs.coordinates[0];
		var y = scs.coordinates[1];
		fsfHtml += `<div id="scContainer"><div id="scSprite"><img class="scSpr" id="scSpr" src="img/sprites/` + scs.gifName + `" style="position:relative;left:` + x.toFixed(0) + `px;top:` + y.toFixed(0) + `px"></div></div>`
	}
	fsfHtml += `<img src="` + bgFileRoute + `">`;
	return fsfHtml;
}

window.initializeSpriteTestVariables = function() {
	State.variables.currentAnimation = "MftfMd";
	State.variables.scsOptIndex = [];
	State.variables.scsOptList = [];
	State.variables.scsOptSelection = [];
	generateSpriteTestVariables();
	State.variables.scsTestAnimation = "";
}
window.generateSpriteTestVariables = function() {
	State.variables.scsOptIndex = [];
	State.variables.scsOptList = [];
	State.variables.scsOptSelection = [];
	for ( var scsi in setup.SCSL ) {
		var scs = setup.SCSL[scsi];
		if ( scs instanceof scSprite ) {
			if ( scs.animation == State.variables.currentAnimation ) {
				if ( State.variables.scsOptList[scs.type] == undefined ) {
					State.variables.scsOptIndex.push(scs.type);
					State.variables.scsOptList[scs.type] = ["none",scs.varName];
					State.variables.scsOptSelection[scs.type] = 1;
				} else {
					State.variables.scsOptList[scs.type].push(scs.varName);
				}
			}
		}
	}
	updateScsOlText();
}

window.selectAllSpritesOfGroup = function(group) {
	var i = 0;
	for ( var scsOpt in State.variables.scsOptList ) {
		var options = State.variables.scsOptList[scsOpt];
		var l = 0;
		for ( var scst of options ) {
			if ( scst != "none" ) {
				if ( setup.SCSL[scst].group == group ) {
					State.variables.scsOptSelection[State.variables.scsOptIndex[i]] = l;
				}
			}
			l++;
		}
		i++;
	}
	updateScsOlText();
}
window.selectOnlyAllSpritesOfGroup = function(group) {
	var i = 0;
	for ( var scsOpt in State.variables.scsOptList ) {
		var options = State.variables.scsOptList[scsOpt];
		State.variables.scsOptSelection[State.variables.scsOptIndex[i]] = 0;
		var l = 0;
		for ( var scst of options ) {
			if ( scst != "none" ) {
				if ( setup.SCSL[scst].group == group ) {
					State.variables.scsOptSelection[State.variables.scsOptIndex[i]] = l;
				}
			}
			l++;
		}
		i++;
	}
	updateScsOlText();
}

window.updateScsOlText = function() {
	State.variables.scsOlText = "";
	for ( var i of State.variables.scsOptIndex ) {
		State.variables.scsOlText += "Type " + i + ": ";
		// Button left
		if ( State.variables.scsOptSelection[i] == 0 ) {
			State.variables.scsOlText += "<<l" + "ink [[Previous|Dyn Animation Tests]]>><<s" + "cript>>State.variables.scsOptSelection['" + i + "'] = " + (State.variables.scsOptList[i].length - 1) + ";<</s" + "cript>><</l" + "ink>> ";	
		} else {
			State.variables.scsOlText += "<<l" + "ink [[Previous|Dyn Animation Tests]]>><<s" + "cript>>State.variables.scsOptSelection['" + i + "'] = " + (State.variables.scsOptSelection[i] - 1) + ";<</s" + "cript>><</l" + "ink>> ";	
		}
		// Current selection
		State.variables.scsOlText += State.variables.scsOptList[i][State.variables.scsOptSelection[i]] + " ";
		// Button right
		if ( State.variables.scsOptSelection[i] == State.variables.scsOptList[i].length - 1 ) {
			State.variables.scsOlText += "<<l" + "ink [[Next|Dyn Animation Tests]]>><<s" + "cript>>State.variables.scsOptSelection['" + i + "'] = 0;<</s" + "cript>><</l" + "ink>> ";	
		} else {
			State.variables.scsOlText += "<<l" + "ink [[Next|Dyn Animation Tests]]>><<s" + "cript>>State.variables.scsOptSelection['" + i + "'] = " + (State.variables.scsOptSelection[i] + 1) + ";<</s" + "cript>><</l" + "ink>> ";	
		}
		
		State.variables.scsOlText += "\n";
	}
	var scsAnimations = [];
	var scsGroups = [];
	for ( var scsi in setup.SCSL ) {
		var scs = setup.SCSL[scsi];
		if ( scs instanceof scSprite ) {
				if ( State.variables.currentAnimation == setup.SCSL[scsi].animation ) {
				var cGroup = setup.SCSL[scsi].group;
				if ( scsGroups.includes(cGroup) == false ) {
					scsGroups.push(cGroup);
				}
			}
			var cAnim = setup.SCSL[scsi].animation;
			if ( scsAnimations.includes(cAnim) == false ) {
				scsAnimations.push(cAnim);
			}
		}
	}
	State.variables.scsOlText += "\n__Sprite groups functions__:\n";
	for ( var group of scsGroups ) {
		State.variables.scsOlText += group + " | "
								   + "<<l" + "ink [[Select all valid sprites in group|Dyn Animation Tests]]>><<s" + "cript>>selectAllSpritesOfGroup('" + group + "');<</s" + "cript>><</l" + "ink>> | "
								   + "<<l" + "ink [[Select only valid sprites in group|Dyn Animation Tests]]>><<s" + "cript>>selectOnlyAllSpritesOfGroup('" + group + "');<</s" + "cript>><</l" + "ink>> "
								   + "\n";
	}
	State.variables.scsOlText += "\n__Animations__:\n";
	for ( var anim of scsAnimations ) {
		if ( State.variables.currentAnimation == anim ) {
			State.variables.scsOlText += anim + ": Currently selected\n";
		} else {
			State.variables.scsOlText += anim + ": "
								   + "<<l" + "ink [[Select animation|Dyn Animation Tests]]>><<s" + "cript>>State.variables.currentAnimation = '" + anim + "';\n"
								   + "generateSpriteTestVariables();<</s" + "cript>><</l" + "ink>>\n";
		}
	}
}
window.generateDynTestAnimationCommand = function() {
	var htmlCommand = "";
	var requestedAnimations = [];
	for ( var sct of State.variables.scsOptIndex ) {
		if ( State.variables.scsOptSelection[sct] != 0 ) {
			requestedAnimations.push(State.variables.scsOptList[sct][State.variables.scsOptSelection[sct]]);
		}
	}
	if ( requestedAnimations.length > 0 ) {
		htmlCommand = formatScSpritesList([700,400],"img/sprites/z-bgs-test.png",requestedAnimations);
		htmlCommand += "\n<<s" + "cript>>" + `var sprites = document.getElementsByClassName("scSpr");
						for ( var scs of sprites ) {
							var ts = scs.src;
							scs.src = "";
							scs.src = ts;
						}` + "<</s" + "cript>> " + "\\";
	}
	State.variables.scsTestAnimation = htmlCommand;
	// Comandos para resetear animaciones
}
window.formatAnimationsForHtml = function(spritesNamesList) {
	var htmlCommand = "";
	if ( spritesNamesList.length > 0 ) {
		htmlCommand = formatScSpritesList([700,400],"img/sprites/z-bgs-test.png",spritesNamesList);
		htmlCommand += "\n<<s" + "cript>>" + `var sprites = document.getElementsByClassName("scSpr");
						for ( var scs of sprites ) {
							var ts = scs.src;
							scs.src = "";
							scs.src = ts;
						}` + "<</s" + "cript>> " + "\\";
	}
	return htmlCommand;
}
window.cleanSpriteTestVariables = function() {
	delete State.variables.scsOptList;
	delete State.variables.scsOptSelection;
	delete State.variables.scsOlText;
	delete State.variables.scsOptIndex;
	delete State.variables.scsTestAnimation;
	delete State.variables.currentAnimation;
}

///// Animation selection /////

window.selectAnimationSprites = function() {
	// Returns a list with all the sprites that must be showed, taking information from State.variables.sc
	var spritesList = [];
	var testSpritesList = [];
	var validAnimations = [];
	
	// TODO: Can this be improved?
	
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
	validAnimations = getAllValidAnimationsData();
	// There are valid animation data that may be selected and displayed
	// These continued actions' actors must have valid positions
	// There may be special requisites
	// It must return an animation key and a list of actors with corresponding animation positions
	// Example of ValidAnimationData = ["mountDick",[["chPlayerCharacter","MftfMdT"],["chMir","MftfMdB"]],  "MftfMd" + ca.initiator + ca.targetsList[0],["analP"]];
	//									type [0]	[[charA,model] [1][0],			 [charB,model]] [1][1], (type+Actors)Identifier [2]				    extraArguments [4]
	// model refers to the object containing the references to the sprites to be selected from setup.SCSDL
	
	// Select animation
	var selectedAnimation = "";
	if ( validAnimations.length > 0 ) {
		selectedAnimation = validAnimations[0];
	
		var chA = selectedAnimation[1][0][0];
		var chB = selectedAnimation[1][1][0];
		var ch1anTags = getCharsAnTags(selectedAnimation[1][0][0]);
		var ch2anTags = getCharsAnTags(selectedAnimation[1][1][0]);
			
			// Temp fix: Protags get WhiteHuman sprite tags, others get GrayCharacter sprite tags // 0.4
			//if ( gC(ca.targetsList[0]).perPr == "she" && gC(ca.initiator).perPr == "she" ) {
		if ( gC(chA).perPr == "he" ) {		
			ch1anTags = ["MGrayCharacter"];
		} else {
			if ( ch1anTags.includes("Mcy") || ch1anTags.includes("Mcb") || ch1anTags.includes("Mcr") ) {
				if ( ch1anTags.includes("WhiteHuman") == false ) {
					ch1anTags.push("WhiteHuman");
				}
			} else {
				if ( ch1anTags.includes("GrayCharacter") == false ) {
					ch1anTags.push("GrayCharacter");
				}
			}
		}
		if ( gC(chB).perPr == "he" ) {		
			ch2anTags = ["MGrayCharacter"];
		} else {
			if ( ch2anTags.includes("Mcy") || ch2anTags.includes("Mcb") || ch2anTags.includes("Mcr") ) {
				if ( ch2anTags.includes("WhiteHuman") == false ) {
					ch2anTags.push("WhiteHuman");
				}
			} else {
				if ( ch2anTags.includes("GrayCharacter") == false ) {
					ch2anTags.push("GrayCharacter");
				}
			}
		}
		
		State.variables.logL1.push("Selected Animation",selectedAnimation);
		var chAnTagsPosList = [[selectedAnimation[1][0][0],ch1anTags,selectedAnimation[1][0][1]],[selectedAnimation[1][1][0],ch2anTags,selectedAnimation[1][1][1]]];
		var extraArguments = selectedAnimation[3];
		// Sprite Collector must receive a list of 3-sized arrays, where the first element is the key of the referred character, the second one is an array with all animation tags of the character, and the second is the position the character will be occupying.
		// For instance: ["chPlayerCharacter",["Mcy","WhiteHuman"],"MftfMdT"] tells the Sprite collector that it must find all sprites for Mcy (Main Character Yellow) for MftfMdT (Mount Face to Face, Mount Dick, Top), or for WhiteHuman if Mcy doesn't have sprites of the corresponding category. "chPlayerCharacter" must be inputed so that the Sprite Collector knows which groups of sprites should be looked for (such as "lockedArms" instead of "arms" if the characters' arms are locked
		
		if ( true ) { // Animation Data requested is valid (Should be checked above)
			spritesList = [];
			testSpritesList = [];
			
			// Sprite Collector // List of parts should be a variable, parts added to it with if checks
			for ( var chAnTags of chAnTagsPosList ) {
				var chK = chAnTags[0];
				var anTags = chAnTags[1];
				var charPos = chAnTags[2];
				var partsSets = ["core","head"]; // Body parts sets
				var bgPartsSets = []; // Bondage parts sets
				if ( gC(chK).body.hasOwnProperty("pussy") ) {
					if ( gC(chK).body.pussy.bondage != -1 ) {
						bgPartsSets.push("chbelt");
					}
				}
				if ( gC(chK).body.hasOwnProperty("dick") ) {
					if ( gC(chK).body.dick.bondage != -1 ) {
						bgPartsSets.push("chcage");
					} else { // Extra arguments conditions
						var flagPrintDick = true;
						if ( extraArguments.includes("analPen") ) {
							for ( var at of anTags ) {					
								if ( setup.SCSDL[charPos][at].hasOwnProperty("dickAnal") ) { // Check if any of the tags of the character-position-animation has the desired part
									partsSets.push("dickAnal");
									flagPrintDick = false; // Since there's anal penetration, no need to show standard dick
								}
							}
						} else if ( extraArguments.includes("doublePen") ) {
							for ( var at of anTags ) {					
								if ( setup.SCSDL[charPos][at].hasOwnProperty("dickDouble") ) {
									partsSets.push("dickDouble");
									flagPrintDick = false;
								}
							}
						}
						if ( flagPrintDick ) {
							partsSets.push("dick");
						}
					}
				}
				if ( extraArguments.includes("doubleDildoPen") ) {
					for ( var at of anTags ) {					
						if ( setup.SCSDL[charPos][at].hasOwnProperty("doubleDildo") ) {
							partsSets.push("doubleDildo");
						}
					}
				}
				
				if ( gC(chK).body.hasOwnProperty("anus") ) {
					if ( gC(chK).body.anus.bondage != -1 ) {
						bgPartsSets.push("buttplug");
					}
				}
				if ( gC(chK).body.hasOwnProperty("breasts") ) {
					if ( gC(chK).body.breasts.bondage != -1 ) {
						if ( gC(chK).perPr != "she" ) {
							bgPartsSets.push("fNipcaps");
						} else if ( gC(chK).chestSize == "big" ) {
							bgPartsSets.push("lNipcaps");
						} else if ( gC(chK).chestSize == "med" ) {
							bgPartsSets.push("mNipcaps");
						} else {
							bgPartsSets.push("sNipcaps");
						}
					}
					if ( gC(chK).perPr == "she" ) {
						if ( gC(chK).chestSize == "big" ) {
							partsSets.push("bigChest");
						} else if ( gC(chK).chestSize == "med" ) {
							partsSets.push("medChest");
						} else {
							partsSets.push("smaChest");
						}
					}
				}
				if ( gC(chK).body.hasOwnProperty("mouth") ) {
					if ( gC(chK).body.mouth.bondage != -1 ) {
						bgPartsSets.push("gag");
					}
				}
				if ( gC(chK).body.hasOwnProperty("eyes") ) {
					if ( gC(chK).body.eyes.bondage != -1 ) {
						bgPartsSets.push("blindfold");
					}
				}
				if ( gC(chK).body.hasOwnProperty("neck") ) {
					if ( gC(chK).body.neck.bondage != -1 ) {
						bgPartsSets.push("collar");
					}
				}
				if ( gC(chK).body.hasOwnProperty("arms") ) {
					if ( gC(chK).body.arms.bondage != -1 ) {
						bgPartsSets.push("armbinds");
						partsSets.push("lockedArms");
					} else {
						partsSets.push("arms");
					}
				}
				if ( gC(chK).body.hasOwnProperty("legs") ) {
					if ( gC(chK).body.legs.bondage != -1 ) {
						bgPartsSets.push("legbinds");
						partsSets.push("lockedLegs");
					} else {
						partsSets.push("legs");
					}
				}
				
				// Body sprites
				for ( var part of partsSets ) {
					var foundSet = false;
					for ( var set of anTags ) {
						if ( setup.SCSDL[charPos][set] != undefined ) {
							if ( setup.SCSDL[charPos][set][part] != undefined ) {
								if ( foundSet == false ) {
									for ( var spr of setup.SCSDL[charPos][set][part] ) {
										spritesList.push(spr);
										foundSet = true;
									}
								}
							}
						}
					}				
				}
				// Equipment sprites
				if ( setup.SCSDL[charPos].Bondage != undefined ) {
					for ( var part of bgPartsSets ) {
						if ( setup.SCSDL[charPos].Bondage[part] != undefined ) {
							for ( var spr of setup.SCSDL[charPos].Bondage[part] ) {
								spritesList.push(spr);
							}
						}
					}
				}
			}
		}
	}
	
	// Select character parts
	
	return spritesList;
}

/* Example
<div id="scContainer">
<div id="scSprite"><img src="img\tests/part_body2.gif" style="position:relative;left:171px;top:105px"></div>
</div><div id="scContainer">
<div id="scSprite"><img src="img\tests/part_mediumboobs2.gif" style="position:relative;left:330;top:287px"></div>
</div><div id="scContainer">
<div id="scSprite"><img src="img\tests/part_head2.gif" style="position:relative;left:163px;top:-4px"></div>
</div>
<img src="img\tests/tests-bg-alt.png">
*/
