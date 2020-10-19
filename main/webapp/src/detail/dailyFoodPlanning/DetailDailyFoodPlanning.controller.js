sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "com/pepa/befit/be_fit_ui/src/util/util"
], function (JSONModel, Controller, Util) {
    "use strict";

    return Controller.extend("com.pepa.befit.be_fit_ui.src.detail.dailyFoodPlanning.DetailDailyFoodPlanning", {
        onInit: function () {

        },

        handleFullScreen: function () {
            var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/fullScreen");
            Util.getRouter.call(this).navTo("DetailIngredients", {layout: sNextLayout, ingredient: this._ingredientModelIndex});
        },

        handleExitFullScreen: function () {
            var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
            Util.getRouter.call(this).navTo("DetailIngredients", {layout: sNextLayout, ingredient: this._ingredientModelIndex});
        },

        handleClose: function () {
            var bIsInEditMode = Util.getModel.call(this, "ui").getProperty("/editMode");

            if(bIsInEditMode) {
                // Dialog.Confirm.leaveAndDiscardDialog.call(this, this._onClose);
            } else {
                this._closeDetailPage();
            }
        },

        onDeletePress: function (oEvent) {

        },

        _onClose: function () {
            Util.restoreEditedValues.call(this, Util.getBindingPath.call(this, "data"));
            this._closeDetailPage();
        },

        _closeDetailPage: function () {
            var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/closeColumn");
            Util.getRouter.call(this).navTo("MasterIngredients", {layout: sNextLayout});
        },

        onFooterSavePress: function (oEvent) {
            Util.toggleShowFooter.call(this);
        },

        onFooterCancelPress: function (oEvent) {
            Util.toggleShowFooter.call(this);
        }

    });
});
