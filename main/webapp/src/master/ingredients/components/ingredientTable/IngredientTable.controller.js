sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/f/library",
	"com/pepa/befit/be_fit_ui/src/api/Request",
	"com/pepa/befit/be_fit_ui/src/dialog/factory",
	"com/pepa/befit/be_fit_ui/src/dialog/ingredients/deleteIngredient",
	"com/pepa/befit/be_fit_ui/src/util/util"
], function(
	Controller,
	JSONModel,
	FioriLibrary,
	Request,
	DialogFactory,
	DeleteIngredientDialog,
	Util
	) {
    "use strict";

    return Controller.extend("com.pepa.befit.be_fit_ui.src.master.ingredients.components.ingredientTable.IngredientTable", {
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
			DeleteIngredientDialog.getDialog.call(this, this._deleteIngredients);
		},

		_deleteIngredients: function () {
			var aDeletedIngredients = this.getView().byId("idIngredientTable").getSelectedItems()
				.map(row => row.getBindingContext("data").getObject().id);

			//TODO need to implement some dialog which will display error logs in case that some of ingredients will not be deleted
			Request.Ingredient.deleteList.call(this, aDeletedIngredients, Util.getModel.call(this, "data"), "/ingredients", true);
		}
    });

});
