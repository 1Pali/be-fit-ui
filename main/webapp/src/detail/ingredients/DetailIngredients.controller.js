sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "pc/my/be-fit/src/util/util"
], function (JSONModel, Controller, Util) {
    "use strict";

    return Controller.extend("pc.my.be-fit.src.detail.ingredients.DetailIngredients", {
        onInit: function () {
            Util.getRouter.call(this).getRoute("MasterIngredients").attachPatternMatched(this._onIngredientMatched, this);
            Util.getRouter.call(this).getRoute("DetailIngredients").attachPatternMatched(this._onIngredientMatched, this);
        },

        _onIngredientMatched: function (oEvent) {
            var sIngredientIndex = oEvent.getParameter("arguments").ingredient;
            Util.getModel.call(this, "ui").setProperty("/selectedObjectIndex", sIngredientIndex);
            this.getView().bindElement({
                path: "/ingredients/" + sIngredientIndex,
                model: "data"
            });
        },

        onEditPress: function (oEvent) {
            Util.toggleShowFooter.call(this);
        },

        onExit: function () {
            Util.getRouter.call(this).getRoute("MasterIngredients").detachPatternMatched(this._onIngredientMatched, this);
            Util.getRouter.call(this).getRoute("DetailIngredients").detachPatternMatched(this._onIngredientMatched, this);
        },

        handleFullScreen: function () {
            var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/fullScreen");
            var sIngredientIndex = Util.getModel.call(this, "ui").getProperty("/selectedObjectIndex");

            Util.getRouter.call(this).navTo("DetailIngredients", {layout: sNextLayout, ingredient: sIngredientIndex});
        },

        handleExitFullScreen: function () {
            var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
            var sIngredientIndex = Util.getModel.call(this, "ui").getProperty("/selectedObjectIndex");

            Util.getRouter.call(this).navTo("DetailIngredients", {layout: sNextLayout, ingredient: sIngredientIndex});
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
        },
    });
});
