sap.ui.define([
    "pc/my/be-fit/src/api/common",
    "sap/m/MessageToast",
], function (Common, MessageToast) {
    "use strict";

    var INGREDIENT_URL = "/ingredient";

    var onGetListSuccess = function (oResponse, oModel, sPath, sSuccessMessage) {
        oModel.setProperty(sPath, oResponse);
        MessageToast.show(sSuccessMessage);
    };

    var onCreateSuccess = function (oResponse, oModel, sPath, sSuccessMessage) {
        oModel.getProperty(sPath).push(oResponse.oIngredient);
        oModel.refresh(true);
        MessageToast.show(sSuccessMessage);
    };

    return {
        getList: function(oModel, sPath, bAsync) {
            var sSuccessMessage = undefined;//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");
            var sErrorMessage = undefined;//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");

            Common.AJAXRequest.call(
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
            var sSuccessMessage = undefined;//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");
            var sErrorMessage = undefined;//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");

            Common.AJAXRequest.call(
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
        }
    };
});
