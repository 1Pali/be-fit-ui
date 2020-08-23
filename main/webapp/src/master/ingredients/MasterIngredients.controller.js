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
				url: "https://be-fit-be.herokuapp.com/api/v1/space",
				dataType: "json",
				undefined,
				async: bAsync,
				success: function (oResponse) {
					MessageToast.show(oResponse.length);
				},
				error: function (oResponse) {
					MessageToast.show("error");
				},
				complete: function () {
					BusyDialog._getDialog.call(this).close();
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
