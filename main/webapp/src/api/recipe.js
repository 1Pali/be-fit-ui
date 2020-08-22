sap.ui.define([
    "pc/my/be-fit/src/api/common",
    "sap/m/MessageToast",
], function (Common, MessageToast) {
    "use strict";

    var RECIPE_URL = "/recipe";

    var onGetListSuccess = function (oResponse, oModel, sPath, sSuccessMessage) {
        oModel.setProperty(sPath, oResponse);
        MessageToast.show(sSuccessMessage);
    };

    return {
        getList: function(oModel, sPath, bAsync) {
            var sSuccessMessage = undefined;//this.getView().getModel("i18n").getResourceBundle().getText("RecipeGetListSuccessMessage");
            var sErrorMessage = undefined;//this.getView().getModel("i18n").getResourceBundle().getText("RecipeGetListSuccessMessage");

            Common.AJAXRequest.call(
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
        }
    };
});
