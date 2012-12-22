function setCookie(c_name,value,exdays){
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name){
  var i,x,y,ARRcookies=document.cookie.split(";");
  for(i=0;i<ARRcookies.length;i++){
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    if(x==c_name){
      return unescape(y);
    }
  }
}
function restoreFromCookie( cookie ){
  if(!cookie){
    // show intro message
    $('#openmessage').modal();
  }
  else{
    // really restore from cookies
    if(typeof getCookie("homeocc") != "undefined"){
      if(getCookie("homeocc") == "yes"){
        confirmHomeOcc();
      }
      else if(getCookie("homeocc") == "no"){
        switchToMain();
      }
    }
    if(typeof getCookie("homefood") != "undefined"){
      if(getCookie("homefood") == "yes"){
        confirmFoodHome();
      }
      else if(getCookie("homefood") == "no"){
        noFoodHome();
      }
    }
    if(typeof getCookie("food") != "undefined"){
      if(getCookie("food") == "yes"){
        confirmFood();
      }
      else if(getCookie("food") == "no"){
        noFood();
      }
    }
    if(typeof getCookie("variance") != "undefined"){
      if(getCookie("variance") == "yes"){
        confirmVariance();
      }
      else if(getCookie("variance") == "no"){
        noVariance();
      }
    }
    if(typeof getCookie("septic") != "undefined"){
      if(getCookie("septic") == "yes"){
        confirmSeptic();
      }
      else if(getCookie("septic") == "no"){
        noSeptic();
      }
    }
    $('#savemessage').modal();
  }
}
function resetCookies(){
  setCookie("maconbibb", "", 30);
  setCookie("homeocc", "", 30);
  setCookie("homefood", "", 30);
  setCookie("food", "", 30);
  setCookie("variance", "", 30);
  setCookie("septic", "", 30);
  $('#savemessage').modal('toggle');
  document.location.reload(true);
}
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

  // random image in popup
  var sideimgs = [ "macon1.jpg", "macon2.jpg", "macon3.jpg", "macon4.jpg", "macon5.jpg", "macon6.jpg", "macon7.jpg", "macon8.jpg", "macon9.jpg" ];
  $(".illustrates").attr("src", "img/" + sideimgs[ Math.floor(sideimgs.length * Math.random()) ]);
  if(typeof getCookie("maconbibb") != "undefined" && getCookie("maconbibb") == "save"){
    restoreFromCookie( getCookie("maconbibb") );
  }
  else{
    restoreFromCookie( false );
  }		
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
var arrowCommon = {
  foldback: 0.7,
  fillStyle: color,
  width: 14
};
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