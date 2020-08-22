sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/f/library",
	"pc/my/be-fit/src/api/Request",
	"pc/my/be-fit/src/dialog/factory"
], function(
	Controller,
	JSONModel,
	FioriLibrary,
	Request,
	DialogFactory
	) {
    "use strict";

    return Controller.extend("pc.my.be-fit.src.master.ingredients.components.ingredientTable.IngredientTable", {
		onInit: function () {
			Request.Ingredient.getList.call(this, this.getOwnerComponent().getModel("data"), "/ingredients", false);
		},

		onTableListItemPress: function (oEvent) {
			var sIngredientPath = oEvent.getSource().getBindingContext("data").getPath();
			var sPathParts = sIngredientPath.split("/");
			var nIngredientModelIndex = sPathParts[sPathParts.length - 1];

			this.getOwnerComponent().getRouter().navTo("DetailIngredients",
				{
					layout: FioriLibrary.LayoutType.TwoColumnsMidExpanded,
					ingredient: nIngredientModelIndex
				});
		},

		onCreatePress: function (oEvent) {
			DialogFactory.getCreateIngredientDialog(this);
		},

		onDeletePress: function (oEvent) {

		}


    });

});
