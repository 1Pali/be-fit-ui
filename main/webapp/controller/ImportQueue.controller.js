sap.ui.define([ "sap/ui/core/mvc/Controller", "sap/m/MessageToast" ], function(Controller, MessageToast) {
    "use strict";

    return Controller.extend("pc.my.be-fit.controller.ImportQueue", {
    	
    	onInit : function() {
    		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	oRouter.getRoute("ImportQueue").attachMatched(this._onObjectMatched, this);
    	},

    	_onObjectMatched : function(oEvent) {               
        	this.nodeId = oEvent.getParameter("arguments").nodeid;
        	
        	this.getView().bindElement({
                path : "/" + this.nodeId
            });
        	
        	var allNodes = JSON.parse(jQuery.sap.storage(jQuery.sap.storage.Type.session).get("allNodes"));
        	var nodeObject = allNodes[this.nodeId];
            var nodeObjectModel = new sap.ui.model.json.JSONModel(nodeObject);
            this.getView().setModel(nodeObjectModel, "nodeObject");
            var nodeObjectQueue = nodeObject.import_queue;
            var nodeObjectQueueModel = new sap.ui.model.json.JSONModel(nodeObjectQueue);
            this.getView().setModel(nodeObjectQueueModel, "nodeObjectQueue");
        },
        
        goToOverviewPage : function() {
        	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	oRouter.navTo("Overview");
        },
        
        goToTransportLandscapePage : function() {
        	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	oRouter.navTo("TransportLandscape");
        }

    });

});