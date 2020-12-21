///// STATS CHART FUNCTIONS /////
// These functions create the proper code for HTML to generate graphs

window.createHorizontalGraph = function(fontSize,width,barsInfo,tooltipText) {
	// Font size: Percentage of standard font size ; Width: Absolute pixels
	// barsInfo: List: each component is a list: first component is color, second component is percentage
	
	var gText = "<ul title='" + tooltipText + "' style='list-style:none; width:100%; font-size:" + fontSize + "%; width:" + width + "px;'>\n";
	for ( var barInfo of barsInfo ) {
		gText += createHorizontalGraphBar(barInfo[0],barInfo[1]);
	}
	gText += "</ul>";
	return gText;
}

window.createHorizontalGraphBar = function(color,percentage) {
	var p = percentage;
	if ( p < 2 ) {
		p = 2;
	}
	var bText = "<li style='background:" + color + "; color:" + color + "; width:" + p + "%;' >.</li>\n";
	return bText;
}

