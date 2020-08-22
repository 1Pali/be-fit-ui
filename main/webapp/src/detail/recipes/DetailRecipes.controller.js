sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "pc/my/be-fit/src/util/util"
], function (JSONModel, Controller, Util) {
    "use strict";

    return Controller.extend("pc.my.be-fit.src.detail.recipes.DetailRecipes", {
        onInit: function () {
            Util.getRouter.call(this).getRoute("MasterRecipes").attachPatternMatched(this._onRecipeMatched, this);
            Util.getRouter.call(this).getRoute("DetailRecipes").attachPatternMatched(this._onRecipeMatched, this);
        },

        _onRecipeMatched: function (oEvent) {
            this._recipeModelIndex = oEvent.getParameter("arguments").recipe || this._recipeModelIndex || "0";
            this.getView().bindElement({
                path: "/recipes/" + this._recipeModelIndex,
                model: "data"
            });
        },

        onEditPress: function (oEvent) {
            Util.toggleShowFooter.call(this);
        },

        onExit: function () {
            Util.getRouter.call(this).getRoute("MasterRecipes").detachPatternMatched(this._onRecipeMatched, this);
            Util.getRouter.call(this).getRoute("DetailRecipes").detachPatternMatched(this._onRecipeMatched, this);
        },

        handleFullScreen: function () {
            var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/fullScreen");
            Util.getRouter.call(this).navTo("DetailRecipes", {layout: sNextLayout, recipe: this._recipeModelIndex});
        },

        handleExitFullScreen: function () {
            var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
            Util.getRouter.call(this).navTo("DetailRecipes", {layout: sNextLayout, recipe: this._recipeModelIndex});
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
            Util.getRouter.call(this).navTo("MasterRecipes", {layout: sNextLayout});
        },

        onFooterSavePress: function (oEvent) {
            Util.toggleShowFooter.call(this);
        },

        onFooterCancelPress: function (oEvent) {
            Util.toggleShowFooter.call(this);
        }

    });
});
