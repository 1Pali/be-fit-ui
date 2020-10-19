sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/f/library",
	"com/pepa/befit/be_fit_ui/src/api/Request",
	"com/pepa/befit/be_fit_ui/src/dialog/factory",
	"com/pepa/befit/be_fit_ui/src/dialog/recipes/deleteRecipe",
	"com/pepa/befit/be_fit_ui/src/util/util"
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

    return Controller.extend("com.pepa.befit.be_fit_ui.src.master.recipes.components.recipeTable.RecipeTable", {
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
