sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/f/library"
], function(
	Controller,
	JSONModel,
	FioriLibrary
	) {
    "use strict";

    return Controller.extend("pc.my.be-fit.controller.MasterIngredients", {
		onInit: function () {

		},

		onTableListItemPress: function (oEvent) {
			var sIngredientId = oEvent.getSource().getBindingContext("data").getObject().id;

			this.getOwnerComponent().getRouter().navTo("DetailIngredients",
				{
					layout: FioriLibrary.LayoutType.TwoColumnsMidExpanded,
					ingredient: sIngredientId
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
