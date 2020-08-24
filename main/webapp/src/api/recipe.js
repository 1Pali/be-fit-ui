sap.ui.define([
    "pc/my/be-fit/src/api/common",
    "sap/m/MessageToast",
], function (Common, MessageToast) {
    "use strict";

    var RECIPE_URL = "/api/v1/recipe";

    var onGetListSuccess = function (oResponse, oModel, sPath, sSuccessMessage) {
        oModel.setProperty(sPath, oResponse);
        MessageToast.show(sSuccessMessage);
    };

    var onCreateSuccess = function (oResponse, oModel, sPath, sSuccessMessage) {
        oModel.getProperty(sPath).push(oResponse);
        oModel.refresh(true);
        MessageToast.show(sSuccessMessage);
    };

    var onUpdateSuccess = function (oResponse, oModel, sPath, sSuccessMessage) {
        oModel.setProperty(sPath, oResponse);
        oModel.refresh(true);
        MessageToast.show(sSuccessMessage);
    };

    var onDeleteSuccess = function (nRecipeId, oModel, sPath, sSuccessMessage) {
        oModel.setProperty(sPath, oModel.getProperty(sPath).filter(recipe => recipe.id !== nRecipeId));
        oModel.refresh(true);
        MessageToast.show(sSuccessMessage);
    };

    return {
        getList: function(oModel, sPath, bAsync) {
            var sSuccessMessage = "Get Recipe List Success";//this.getView().getModel("i18n").getResourceBundle().getText("RecipeGetListSuccessMessage");
            var sErrorMessage = "Get Recipe List Error";//this.getView().getModel("i18n").getResourceBundle().getText("RecipeGetListSuccessMessage");

            return Common.AJAXRequest.call(
                this,
                Common.RequestTypes.GET,
                RECIPE_URL,
                undefined,
                function (oResponse) {
                    onGetListSuccess(oResponse, oModel, sPath, sSuccessMessage);
                }.bind(this),
                sErrorMessage,
                bAsync
            );
        },

        create: function (oRecipe, oModel, sPath, bAsync) {
            var sSuccessMessage = "Create Recipe Success";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");
            var sErrorMessage = "Create Recipe Error";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");

            return Common.AJAXRequest.call(
                this,
                Common.RequestTypes.POST,
                RECIPE_URL,
                oRecipe,
                function (oResponse) {
                    onCreateSuccess(oResponse, oModel, sPath, sSuccessMessage);
                }.bind(this),
                sErrorMessage,
                bAsync
            );
        },

        update: function (oRecipe, oModel, sPath, bAsync) {
            var sSuccessMessage = "Update Recipe Success";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");
            var sErrorMessage = "Update Recipe Error";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");

            return Common.AJAXRequest.call(
                this,
                Common.RequestTypes.PUT,
                RECIPE_URL + "/" + oRecipe.id,
                oRecipe,
                function (oResponse) {
                    onUpdateSuccess(oResponse, oModel, sPath, sSuccessMessage);
                }.bind(this),
                sErrorMessage,
                bAsync
            );
        },

        delete: function (nRecipeId, oModel, sPath, bAsync) {
            var sSuccessMessage = "Delete Recipe Success";//this.getView().getModel("i18n").getResourceBundle().getText("RecipeGetListSuccessMessage");
            var sErrorMessage = "Delete Recipe Error";//this.getView().getModel("i18n").getResourceBundle().getText("RecipeGetListSuccessMessage");

            return Common.AJAXRequest.call(
                this,
                Common.RequestTypes.DELETE,
                RECIPE_URL + "/" + nRecipeId,
                undefined,
                function () {
                    onDeleteSuccess(nRecipeId, oModel, sPath, sSuccessMessage);
                }.bind(this),
                sErrorMessage,
                bAsync
            );
        }
    };
});
