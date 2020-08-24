sap.ui.define([
    "pc/my/be-fit/src/api/common",
    "sap/m/MessageToast",
], function (Common, MessageToast) {
    "use strict";

    var INGREDIENT_URL = "/api/v1/ingredient";

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

    var onDeleteSuccess = function (nIngredientId, oModel, sPath, sSuccessMessage) {
        oModel.setProperty(sPath, oModel.getProperty(sPath).filter(ingredient => ingredient.id !== nIngredientId));
        oModel.refresh(true);
        MessageToast.show(sSuccessMessage);
        return true;
    };

    var onDeleteListSuccess = function (oResponse, oModel, sPath, sSuccessMessage) {
        oModel.setProperty(sPath, oModel.getProperty(sPath)
            .filter(ingredient => !oResponse
                .some(deletedItem => deletedItem.id === ingredient.id && deletedItem.state === "SUCCESS")));

        oModel.refresh(true);
        MessageToast.show(sSuccessMessage);
        return true;
    };

    return {
        getList: function(oModel, sPath, bAsync) {
            var sSuccessMessage = "Get Ingredient List Success";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");
            var sErrorMessage = "Get Ingredient List Error";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");

            return Common.AJAXRequest.call(
                this,
                Common.RequestTypes.GET,
                INGREDIENT_URL,
                undefined,
                function (oResponse) {
                    onGetListSuccess(oResponse, oModel, sPath, sSuccessMessage);
                }.bind(this),
                sErrorMessage,
                bAsync
            );
        },

        create: function (oIngredient, oModel, sPath, bAsync) {
            var sSuccessMessage = "Create Ingredient Success";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");
            var sErrorMessage = "Create Ingredient Error";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");

            return Common.AJAXRequest.call(
                this,
                Common.RequestTypes.POST,
                INGREDIENT_URL,
                oIngredient,
                function (oResponse) {
                    onCreateSuccess(oResponse, oModel, sPath, sSuccessMessage);
                }.bind(this),
                sErrorMessage,
                bAsync
            );
        },

        update: function (oIngredient, oModel, sPath, bAsync) {
            var sSuccessMessage = "Update Ingredient Success";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");
            var sErrorMessage = "Update Ingredient Error";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");

            return Common.AJAXRequest.call(
                this,
                Common.RequestTypes.PUT,
                INGREDIENT_URL + "/" + oIngredient.id,
                oIngredient,
                function (oResponse) {
                    onUpdateSuccess(oResponse, oModel, sPath, sSuccessMessage);
                }.bind(this),
                sErrorMessage,
                bAsync
            );
        },

        delete: function (nIngredientId, oModel, sPath, bAsync) {
            var sSuccessMessage = "Delete Ingredient Success";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");
            var sErrorMessage = "Delete Ingredient Error";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");

            return Common.AJAXRequest.call(
                this,
                Common.RequestTypes.DELETE,
                INGREDIENT_URL + "/" + nIngredientId,
                undefined,
                function () {
                    onDeleteSuccess(nIngredientId, oModel, sPath, sSuccessMessage);
                }.bind(this),
                sErrorMessage,
                bAsync
            );
        },

        deleteList: function (aIngredientIdList, oModel, sPath, bAsync) {
            var sSuccessMessage = "Delete Ingredient List Success";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");
            var sErrorMessage = "Delete Ingredient List Error";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");

            return Common.AJAXRequest.call(
                this,
                Common.RequestTypes.DELETE,
                INGREDIENT_URL + "/deletelist",
                aIngredientIdList,
                function (oResponse) {
                    onDeleteListSuccess(oResponse, oModel, sPath, sSuccessMessage);
                }.bind(this),
                sErrorMessage,
                bAsync
            );
        }
    };
});
