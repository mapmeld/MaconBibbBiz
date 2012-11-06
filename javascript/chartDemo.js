function init(){
  var color = "gray";
  jsPlumb.importDefaults({
	Connector : [ "StateMachine", { stub:30, gap: 0 } ],
	DragOptions : { cursor: "pointer", zIndex:2000 },
	PaintStyle : { strokeStyle:color, lineWidth:2 },
	EndpointStyle : { radius:9, fillStyle:color },
	HoverPaintStyle : {strokeStyle:"#ec9f2e" },
	//EndpointHoverStyle : {fillStyle:"#ec9f2e" },			
	Anchors :  [ "BottomCenter", "TopCenter" ]
  });
		
  var decisionTree = {
    "startpoint": [
	  {
		"homebased": [
		  {
			"homebasedfood": [ "homebasedzoningcompliance" ]
		  },
		  {
			"homebasedzoningcompliance": [ "getfinallicense" ]
		  }
		]
	  },
	  {
		"commercialbusiness": [
		  {
			"zoningvariance": [ "returntopz" ]
		  },
		  {
			"foodandbeverage": [ "returntopz" ]
		  },
		  {
			"septictank": [ "returntopz" ]
		  },
		  {
			"returntopz": [
			  {
			    "getfinallicense": [ "grandopening" ]
			  }
			]
		  }
		]
	  }
	]
  };

  treeConnect(decisionTree);
  highlightPath( connections[ "startpoint-homebased" ] );			
}

var isHighlighted = null;
function highlightPath(connector){
  if(isHighlighted){
	isHighlighted.setPaintStyle({ strokeStyle: color, lineWidth: 2 });
  }
  isHighlighted = connector;
  connector.setPaintStyle({ strokeStyle: "orange", lineWidth: 2 });
  //connector.setPaintStyle({ fillStyle: "orange", strokeStyle: "red", lineWidth: 2 });
  //connector.endpoints[1].setPaintStyle({ fillStyle: "orange", strokeStyle: "red", lineWidth: 2 });
}

var connections = { };
var color = "gray";

			var arrowCommon = { foldback:0.7, fillStyle:color, width:14 };
				var overlays = [
					[ "Arrow", { location:0.5 }, arrowCommon ]
				];

function treeConnect(tree){

  $.each(tree, function(branchname){
    var branch = tree[branchname];
	for(var nb=0;nb<branch.length;nb++){
	  if(typeof branch[nb] === "string"){
		// this path in the tree does not continue defining links
		connections[ branchname + "-" + branch[nb] ] = jsPlumb.connect({
		  source: branchname,
		  target: branch[nb],
		  overlays: overlays,
		  detachable: false
		});
	  }
	  else{
		// make connection, continue recursive branching
		$.each(branch[nb], function(nextbranch){
		  connections[ branchname + "-" + nextbranch ] = jsPlumb.connect({
		    source: branchname,
		    target: nextbranch,
		    overlays: overlays,
		    detachable: false
  		  });
	    });
	    treeConnect( branch[nb] );
 	  }
    }
  });
}

jQuery(document).ready(init);