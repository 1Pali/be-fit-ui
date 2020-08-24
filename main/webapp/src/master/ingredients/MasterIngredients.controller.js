sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(
	Controller,
	MessageToast
	) {
    "use strict";

    return Controller.extend("pc.my.be-fit.src.master.ingredients.MasterIngredients", {
		onInit: function () {
			jQuery.ajax({
				type: "GET",
				contentType: "application/json",
				url: "/api/v1/space",
				dataType: "json",
				undefined,
				async: false,
				success: function (oResponse) {
					MessageToast.show(oResponse.length);
				},
				error: function (oResponse) {
					MessageToast.show("error");
				},
				complete: function () {
				}.bind(this)
			});
		},

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
