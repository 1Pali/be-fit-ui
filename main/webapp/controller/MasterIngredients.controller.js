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
			var oData = new JSONModel(
				{
					ingredientsCollection: [
						{
							name: "name1",
							protein: 10,
							carbohydrate: 20,
							fat: 30
						},
						{
							name: "name2",
							protein: 11,
							carbohydrate: 21,
							fat: 31
						}
					]
				}
			);

			this.getView().setModel(oData);
		},

		onTableListItemPress: function (oEvent) {
			// var productPath = oEvent.getSource().getBindingContext("products").getPath(),
			// 	product = productPath.split("/").slice(-1).pop();

			this.getOwnerComponent().getRouter().navTo("DetailIngredients", {layout: FioriLibrary.LayoutType.TwoColumnsMidExpanded, ingredient: 0});
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
