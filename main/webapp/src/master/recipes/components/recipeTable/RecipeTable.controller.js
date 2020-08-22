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

    return Controller.extend("pc.my.be-fit.src.master.recipes.components.recipeTable.RecipeTable", {
		onInit: function () {

		},

		onTableListItemPress: function (oEvent) {
			var sRecipePath = oEvent.getSource().getBindingContext("data").getPath();
			var sPathParts = sRecipePath.split("/");
			var nRecipeModelIndex = sPathParts[sPathParts.length - 1];

			this.getOwnerComponent().getRouter().navTo("DetailRecipes",
				{
					layout: FioriLibrary.LayoutType.TwoColumnsMidExpanded,
					recipe: nRecipeModelIndex
				});
		}

    });

});
