////////// PATHFINDER CLASS //////////

State.variables.zFlagDbPf = false; // Set to true or false. Flag to debug pathfinder

window.Pathfinder = function(mapKey,charGroup,startingRoomKey,isNodeValidTarget) {
	this.mapKey = mapKey;
	this.charGroup = charGroup; // Group of characters moving
	this.startingNodeKey = startingRoomKey;
	this.isNodeValidTarget = isNodeValidTarget; // Expected to be a function, receiving a node as parameter
	this.nodesList = [];
	
	this.debugInfo = "";
	
	for ( var room in getMapInfo(this.mapKey) ) { // Create an object ("nodesList") that contains a node for each room present in the map	//
		var tRoom = getMapInfo(this.mapKey)[room];
		if ( tRoom instanceof RoomInfo ) {
			this.nodesList[tRoom.key] = new pfNode(tRoom.key);
		}
	}												//																						//
	// Closed, Closing and Open Nodes refer to the nodes' keys, not the node objects
	this.closedNodes = [];
	
	this.closingNodes = [ this.nodesList[startingRoomKey].key ];		// Closing Nodes begins fed with starting node
	this.nodesList[startingRoomKey].hasBeenChecked = true;				// Starting node begins checked
	this.nodesList[startingRoomKey].currentRoute = [ ];					// Starting node has no route
	this.openNodes = [];
	
	this.validNodesList = [];
	if ( this.isNodeValidTarget(startingRoomKey) ) {						// If starting node is a valid target, add to valid nodes
		this.validNodesList.push(startingRoomKey);
	}
	
	
	// Adjacent nodes
	this.getNodesAdjacentToNode = function(nodeKey) {
		var adjacentNodes = [];
		for ( var con of getRoomInfoInMap(this.mapKey,nodeKey).getConnections(this.charGroup) ) {
			adjacentNodes.push(con.loc);
		}
		return adjacentNodes;
	}
	this.getNodesAdjacentToClosingNodes = function() {		// This shouldn't be used, actually
		var adjNodes = [];
		for ( var nodeKey of this.closingNodes ) {
			adjNodes.push(this.getNodesAdjacentToNode(nodeKey));
		}
		return adjNodes;
	}
		
	// Distances and routes between nodes
	this.getDistanceBetweenNodes = function(nodeA,nodeB) {
		var distance = -1;
		for ( var connection of getRoomInfoInMap(this.mapKey,nodeA).getConnections(this.charGroup) ) {
			if ( connection.loc == nodeB ) { // Target room key equal node key
				distance = connection.distance;
			}
		}
		return distance;
	}
	this.isNewDistanceShorter = function(originNode,targetNode) {
		var itsShorter = false;
		var originNodeDistance = this.nodesList[originNode].currentRouteDistance;
		var targetNodeDistance = this.nodesList[targetNode].currentRouteDistance;
		if ( ( originNodeDistance + this.getDistanceBetweenNodes(originNode,targetNode) ) < targetNodeDistance ) {
			itsShorter = true;
		}
		return itsShorter;
	}
	
	// Management
	this.formatNodeRoute = function(nodeKey) {
			// First position is the characters' group position. It gets removed, and the node's key gets added at the end.
		var route = [].concat(this.nodesList[nodeKey].currentRoute);
		route.splice(0,1);
		route.push(nodeKey);
		return route;
	}
	this.getClosestValidNode = function() {
		var closestNode = null;
		var closestDistance = -1;
		for ( var nodeKey of this.validNodesList ) {
			if ( closestDistance == -1 ) {
				closestDistance = this.nodesList[nodeKey].currentRouteDistance;
				closestNode = nodeKey;
			}
			else if ( closestDistance > this.nodesList[nodeKey].currentRouteDistance ) {
				closestDistance = this.nodesList[nodeKey].currentRouteDistance;
				closestNode = nodeKey;
			}
		}
		return closestNode;
	}
	
	// Main function. This is implemented in other called functions
	this.mainFinder = function() {
		// Find all paths
		
		while ( this.closingNodes.length > 0 ) {
			// Get nodes adjacent to Closing Nodes
			for ( var nodeKey of this.closingNodes ) {
				var adjNodes = this.getNodesAdjacentToNode(nodeKey);
				
				// A ) Recalculate routes and distances for adjacent nodes
				for ( var adjNode of adjNodes ) {
					if ( adjNode != this.startingNodeKey ) {
						// If adjNode isn't the starting node && ( has no route || potential new route is shorter )
						if ( this.nodesList[adjNode].currentRoute == null || this.isNewDistanceShorter(nodeKey,adjNode) ) {
							this.nodesList[adjNode].currentRoute = [].concat(this.nodesList[nodeKey].currentRoute);
							this.nodesList[adjNode].currentRoute.push(nodeKey);
							this.nodesList[adjNode].currentRouteDistance = this.getDistanceBetweenNodes(nodeKey,adjNode) + this.nodesList[nodeKey].currentRouteDistance;
						}
					}
					// B ) Check nodes. Check and add to Open Nodes if unchecked
					if ( this.nodesList[adjNode].hasBeenChecked == false ) {
						this.nodesList[adjNode].hasBeenChecked = true;
						this.openNodes.push(adjNode);
					}
				}
				
				this.result = 0;
			}
			
			// C ) Closing Nodes to Closed Nodes, clean Closing Nodes
			this.closedNodes = this.closedNodes.concat(this.closingNodes);
			this.closingNodes = [];
			// D ) Find valid goals on Open Nodes
			for ( var nodeKey of this.openNodes ) {
				if ( this.isNodeValidTarget(nodeKey) ) {
					this.validNodesList.push(nodeKey);
				}
			}
			// E ) Open nodes to Closing Nodes, clean Open Nodes
			this.closingNodes = [].concat(this.openNodes);
			this.openNodes = [];
		}
		if ( State.variables.zFlagDbPf == true && false ) {
			this.debugInfo = this.formatAllNodesInfo();
		}
	}

	// Functions to call. Each pathfinder must be created to call one of these functions, then removed
	this.getAllValidNodes = function() {
		this.mainFinder();
		return this.validNodesList;
	}
	this.getShortestValidRoute = function() {
		var shortestRoute = [];
		this.mainFinder();
		
		var closestNode = this.getClosestValidNode();
		if ( closestNode != null ) {
			shortestRoute = this.formatNodeRoute(closestNode);
		}
		return shortestRoute;
	}
	this.getAllValidRoutes = function() {
		this.mainFinder();
		var routesList = [];
		for ( var validNode of this.validNodesList ) {
			routesList.push(this.formatNodeRoute(validNode));
		}
		return routesList;
	}

	// Other functions
	this.getAllRoomsWithinNdistance = function(distance) {
		var rooms = [];
		for ( var nodeI in this.nodesList ) {
			var node = this.nodesList[nodeI];
			if ( node.currentRoute != null ) {
				if ( node.currentRouteDistance <= distance ) {
					rooms.push([node.key,node.currentRouteDistance]);
				}
			}
		}
		return rooms;
	}
	this.getAllRoomsWithinNmoves = function(moves) {
		var rooms = [];
		for ( var nodeI in this.nodesList ) {
			var node = this.nodesList[nodeI];
			if ( node.currentRoute != null ) {
				if ( node.currentRoute.length <= moves ) {
					rooms.push([node.key,node.currentRoute.length]);
				}
			}
		}
		return rooms;
	}
	
	// Debug functions
	this.formatNodeInfoToLine = function(nodeKey) {
		var text = "";
		text += this.nodesList[nodeKey].key + ", was checked: " + this.nodesList[nodeKey].hasBeenChecked + ", route: ["
			  + this.nodesList[nodeKey].currentRoute + "] , distance: " + this.nodesList[nodeKey].currentRouteDistance + ".";
		return text;
	}
	this.formatAllNodesInfo = function() {
		var text = "";
		for ( var node in this.nodesList ) {
			if ( this.nodesList[node] instanceof pfNode ) {
				text += this.formatNodeInfoToLine(this.nodesList[node].key) + "  |\n";
			}
		}
		return text;
	}
}

////////// NODE CLASS //////////

window.pfNode = function(roomKey) {
	this.key = roomKey;
	this.hasBeenChecked = false;
	this.currentRoute = null;
	this.currentRouteDistance = 0;
}

// Auxiliar functions
window.transformRoomsDistanceListIntoRoomsDistance = function(roomsDistanceList) {
	var roomsList = [];
	for ( var roomDistance of roomsDistanceList ) {
		roomsList.push(roomDistance[0]);
	}
	return roomsList;
}
window.getCharactersInRoomsList = function(roomsList) {
	var charsList = [];
	for ( var room of roomsList ) {
		charsList = charsList.concat(getRoomA(room).characters);
	}
	return charsList;
}

