;(function() {
	
	window.jsPlumbDemo = {
			
		init : function() {			

			var color = "gray";

			jsPlumb.importDefaults({
				// notice the 'curviness' argument to this Bezier curve.  the curves on this page are far smoother
				// than the curves on the first demo, which use the default curviness value.			
				Connector : [ "Bezier", { curviness:30 } ],
				DragOptions : { cursor: "pointer", zIndex:2000 },
				PaintStyle : { strokeStyle:color, lineWidth:2 },
				EndpointStyle : { radius:9, fillStyle:color },
				HoverPaintStyle : {strokeStyle:"#ec9f2e" },
				EndpointHoverStyle : {fillStyle:"#ec9f2e" },			
				Anchors :  [ "BottomCenter", "TopCenter" ]
			});
			
				
			// declare some common values:
			var arrowCommon = { foldback:0.7, fillStyle:color, width:14 },
				// use three-arg spec to create two different arrows with the common values:
				overlays = [
					[ "Arrow", { location:0.5 }, arrowCommon ]
				];
		
			jsPlumb.connect({source:"startpoint", target:"homebased", overlays:overlays});
			jsPlumb.connect({source:"homebased", target:"homebasedzoningcompliance", overlays:overlays});
			jsPlumb.connect({source:"homebased", target:"homebasedbeautybarber", overlays:overlays});
			jsPlumb.connect({source:"homebasedbeautybarber", target:"homebasedzoningcompliance", overlays:overlays, detachable:true, reattach:true});
			jsPlumb.connect({source:"homebasedzoningcompliance", target:"getfinallicense", overlays:overlays});
			jsPlumb.connect({source:"getfinallicense", target:"grandopening", overlays:overlays});

			jsPlumb.connect({source:"startpoint", target:"commercialbusiness", overlays:overlays});
			jsPlumb.connect({source:"commercialbusiness", target:"zoningvariance", overlays:overlays});
			jsPlumb.connect({source:"commercialbusiness", target:"foodandbeverage", overlays:overlays});
			jsPlumb.connect({source:"commercialbusiness", target:"getfinallicense2", overlays:overlays});
			jsPlumb.connect({source:"zoningvariance", target:"getfinallicense2", overlays:overlays});
			jsPlumb.connect({source:"foodandbeverage", target:"getfinallicense2", overlays:overlays});
			jsPlumb.connect({source:"getfinallicense2", target:"grandopening", overlays:overlays});
			
			//jsPlumb.draggable(jsPlumb.getSelector(".window"));
		}
	};
	
})();