sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/m/MessageBox" ], function(Controller, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("pc.my.be-fit.controller.Ingredients", {

		_onObjectMatched : function() {
			//preselect 'All' by default
			var allBtn = this.getView().byId("AllButton");
			allBtn.setSelected(true);
		},

		goToTransportLandscape: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("TransportLandscape", {});
		}

    });

});
