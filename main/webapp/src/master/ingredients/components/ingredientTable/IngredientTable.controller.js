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

    return Controller.extend("pc.my.be-fit.src.master.ingredients.components.ingredientTable.IngredientTable", {
		onInit: function () {

		},

		onTableListItemPress: function (oEvent) {
			var sIngredientId = oEvent.getSource().getBindingContext("data").getObject().id;

			this.getOwnerComponent().getRouter().navTo("DetailIngredients",
				{
					layout: FioriLibrary.LayoutType.TwoColumnsMidExpanded,
					ingredient: sIngredientId
				});
		}

    });

});
