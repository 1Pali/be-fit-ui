sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/f/library",
	"pc/my/be-fit/src/api/Request",
	"pc/my/be-fit/src/dialog/factory",
	"pc/my/be-fit/src/dialog/recipes/deleteRecipe",
	"pc/my/be-fit/src/util/util"
], function(
	Controller,
	JSONModel,
	FioriLibrary,
	Request,
	DialogFactory,
	DeleteRecipeDialog,
	Util
	) {
    "use strict";

    return Controller.extend("pc.my.be-fit.src.master.recipes.components.recipeTable.RecipeTable", {
		onInit: function () {
			Request.Recipe.getList.call(this, this.getOwnerComponent().getModel("data"), "/recipes", true);
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
		},

		onCreatePress: function (oEvent) {
			DialogFactory.getCreateRecipeDialog(this);
		},

		onDeletePress: function (oEvent) {
			DeleteRecipeDialog.getDialog.call(this, this._deleteRecipes);
		},

		_deleteRecipes: function () {
			var aDeletedRecipes = this.getView().byId("idRecipeTable").getSelectedItems()
				.map(row => row.getBindingContext("data").getObject().id);

			Request.Recipe.deleteList.call(this, aDeletedRecipes, Util.getModel.call(this, "data"), "/recipes", true);
		}

    });

});
