;(function() {
	
	window.jsPlumbDemo = {
			
		init : function() {			

			var color = "gray";

			jsPlumb.importDefaults({
				// notice the 'curviness' argument to this Bezier curve.  the curves on this page are far smoother
				// than the curves on the first demo, which use the default curviness value.			
				//Connector : [ "Bezier", { curviness:30 } ],
				Connector : [ "StateMachine", { stub:30, gap: 0 } ],
				DragOptions : { cursor: "pointer", zIndex:2000 },
				PaintStyle : { strokeStyle:color, lineWidth:2 },
				EndpointStyle : { radius:9, fillStyle:color },
				//HoverPaintStyle : {strokeStyle:"#ec9f2e" },
				//EndpointHoverStyle : {fillStyle:"#ec9f2e" },			
				Anchors :  [ "BottomCenter", "TopCenter" ]
			});
			
				
			// declare some common values:
			var arrowCommon = { foldback:0.7, fillStyle:color, width:14 },
				// use three-arg spec to create two different arrows with the common values:
				overlays = [
					[ "Arrow", { location:0.5 }, arrowCommon ]
				];
		
			jsPlumb.connect({source:"startpoint", target:"homebased", overlays:overlays, detachable:false});
			jsPlumb.connect({source:"homebased", target:"homebasedzoningcompliance", overlays:overlays, detachable:false});
			jsPlumb.connect({source:"homebased", target:"homebasedbeautybarber", overlays:overlays, detachable:false});
			jsPlumb.connect({source:"homebasedbeautybarber", target:"homebasedzoningcompliance", overlays:overlays, detachable:false});
			jsPlumb.connect({source:"homebasedzoningcompliance", target:"getfinallicense", overlays:overlays, detachable:false});
			jsPlumb.connect({source:"getfinallicense", target:"grandopening", overlays:overlays, detachable:false});

			jsPlumb.connect({source:"startpoint", target:"commercialbusiness", overlays:overlays, detachable:false});
			jsPlumb.connect({source:"commercialbusiness", target:"zoningvariance", overlays:overlays, detachable:false});
			jsPlumb.connect({source:"commercialbusiness", target:"foodandbeverage", overlays:overlays, detachable:false});
			jsPlumb.connect({source:"commercialbusiness", target:"septictank", overlays:overlays, detachable:false});
			jsPlumb.connect({source:"septictank", target:"returntopz", overlays:overlays, detachable:false});

			jsPlumb.connect({source:"commercialbusiness", target:"returntopz", overlays:overlays, detachable:false});
			jsPlumb.connect({source:"zoningvariance", target:"returntopz", overlays:overlays, detachable:false});
			jsPlumb.connect({source:"foodandbeverage", target:"returntopz", overlays:overlays, detachable:false});
			jsPlumb.connect({source:"foodandbeverage", target:"returntopz", overlays:overlays, detachable:false});
			jsPlumb.connect({source:"returntopz", target:"getfinallicense", overlays:overlays, detachable:false});

			jsPlumb.connect({source:"getbizlicense2", target:"grandopening", overlays:overlays, detachable:false});
			
			//jsPlumb.draggable(jsPlumb.getSelector(".window"));
		}
	};
	
})();