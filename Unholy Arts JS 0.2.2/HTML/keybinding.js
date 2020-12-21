// Functions to keybind links //

State.variables.foundLinks = [];
State.variables.keysAssigned = [];

$(document).on(':passagedisplay', function (ev) {
	if ( tags().includes("sc") ) {
		State.variables.sc.markNextTurnLink();
	}
});

$(document).on("keyup",function(e) {
	if ( e.key != undefined ) {
		for ( var k of State.variables.keysAssigned ) {
			if ( e.key == k[0] ) {
				e.preventDefault();
				$("#" + k[1]).click();
				return false;
			}
		}
	}
});

