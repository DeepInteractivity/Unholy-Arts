//////// SCENE SPRITE / SC SPRITE ////////
// Setup objects containing scene sprite data

window.scSprite = function(varName,gifName,positionPriority,dimensions,coordinates,type) {
	this.varName = varName; // Variable name, name by which this object is referred to
	this.gifName = gifName; // Name of the sprite file, used to locate the sprite in its appropriate folder
	this.positionPriority = positionPriority; // How high must the sprite appear. Lower priority -> More sprites will be placed on top of it
	this.dimensions = dimensions; // [x,y] Length and height of the sprite
	this.coordinates = coordinates; // [x,y] Where must the sprite be placed from the superior left corner
	this.type = type; // Type of sprite. All sprites of the same type may be interchangeable
}

///// Display functions /////

window.orderScSpritesList = function(scSpritesList) {
	var orderedList = [];
	for ( var scs of scSpritesList ) {
		var i = 0;
		var inserted = false;
		if ( orderedList.length > 0 ) {
			while ( i < orderedList.length && inserted == false ) {
				if ( orderedList[i].positionPriority >= scs.positionPriority || (i+1) == orderedList.length ) {
					orderedList.splice(i,0,scs);
					inserted = true;
				}
				i++;
			}
		} else if ( inserted == false ) {
			orderedList.push(scs);
		}
	}
	return orderedList;
}
window.formatScSpritesList = function(dimensions,bgFileRoute,scSpritesVarNames) {
	var scSpritesList = [];
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

window.generateSpriteTestVariables = function() {
	State.variables.scsOptIndex = [];
	State.variables.scsOptList = [];
	State.variables.scsOptSelection = [];
	for ( var scsi in setup.SCSL ) {
		var scs = setup.SCSL[scsi];
		if ( scs instanceof scSprite ) {
			if ( State.variables.scsOptList[scs.type] == undefined ) {
				State.variables.scsOptIndex.push(scs.type);
				State.variables.scsOptList[scs.type] = ["none",scs.varName];
				State.variables.scsOptSelection[scs.type] = 1;
			} else {
				State.variables.scsOptList[scs.type].push(scs.varName);
			}
		}
	}
	updateScsOlText();
	State.variables.scsTestAnimation = "";
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
window.cleanSpriteTestVariables = function() {
	delete State.variables.scsOptList;
	delete State.variables.scsOptSelection;
	delete State.variables.scsOlText;
	delete State.variables.scsOptIndex;
	delete State.variables.scsTestAnimation;
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
