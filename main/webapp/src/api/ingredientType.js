sap.ui.define([
    "pc/my/be-fit/src/api/common",
    "sap/m/MessageToast",
], function (Common, MessageToast) {
    "use strict";

    var INGREDIENT_TYPE_URL = "/api/v1/ingredienttype";

    var onGetListSuccess = function (oResponse, oModel, sPath, sSuccessMessage) {
        oModel.setProperty(sPath, oResponse);
        MessageToast.show(sSuccessMessage);
    };

    return {
        getList: function(oModel, sPath, bAsync) {
            var sSuccessMessage = "Get Ingredient Type List Success";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");
            var sErrorMessage = "Get Ingredient Type List Error";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");

            return Common.AJAXRequest.call(
                this,
                Common.RequestTypes.GET,
                INGREDIENT_TYPE_URL,
                undefined,
                function (oResponse) {
                    onGetListSuccess(oResponse, oModel, sPath, sSuccessMessage);
                }.bind(this),
                sErrorMessage,
                bAsync
            );
        }
    };
});
