sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "pc/my/be-fit/src/util/util",
    "pc/my/be-fit/src/dialog/recipes/deleteRecipe",
    "pc/my/be-fit/src/api/Request",
    "sap/m/MessageToast",
    "pc/my/be-fit/src/dialog/confirmDialog"
], function (JSONModel, Controller, Util, DeleteRecipeDialog, Request, MessageToast, ConfirmDialog) {
    "use strict";

    return Controller.extend("pc.my.be-fit.src.detail.recipes.DetailRecipes", {
        onInit: function () {
            Util.getRouter.call(this).getRoute("MasterRecipes").attachPatternMatched(this._onRecipeMatched, this);
            Util.getRouter.call(this).getRoute("DetailRecipes").attachPatternMatched(this._onRecipeMatched, this);
        },

        _onRecipeMatched: function (oEvent) {
            var sRecipeIndex = oEvent.getParameter("arguments").recipe;
            Util.getModel.call(this, "ui").setProperty("/selectedObjectIndex", sRecipeIndex);
            this.getView().bindElement({
                path: "/recipes/" + sRecipeIndex,
                model: "data"
            });
        },

        onEditPress: function (oEvent) {
            this._storePreviousRecipe();
            Util.toggleShowFooter.call(this);
        },

        _storePreviousRecipe: function (oEvent) {
            var oRecipeClone = Util.getObjectClone(Util.getBindingObject.call(this, "data"));
            Util.getModel.call(this, "ui").setProperty("/recipe/previousRecipe", oRecipeClone);
        },

        onExit: function () {
            Util.getRouter.call(this).getRoute("MasterRecipes").detachPatternMatched(this._onRecipeMatched, this);
            Util.getRouter.call(this).getRoute("DetailRecipes").detachPatternMatched(this._onRecipeMatched, this);
        },

        handleFullScreen: function () {
            var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/fullScreen");
            var sRecipeIndex = Util.getModel.call(this, "ui").getProperty("/selectedObjectIndex");

            Util.getRouter.call(this).navTo("DetailRecipes", {layout: sNextLayout, recipe: sRecipeIndex});
        },

        handleExitFullScreen: function () {
            var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
            var sRecipeIndex = Util.getModel.call(this, "ui").getProperty("/selectedObjectIndex");

            Util.getRouter.call(this).navTo("DetailRecipes", {layout: sNextLayout, recipe: sRecipeIndex});
        },

        handleClose: function () {
            var bIsInEditMode = Util.getModel.call(this, "ui").getProperty("/editMode");

            if(bIsInEditMode) {
                ConfirmDialog.getLeaveAndDiscard.call(this, this._onClose);
            } else {
                this._closeDetailPage();
            }
        },

        onDeletePress: function (oEvent) {
            DeleteRecipeDialog.getDialog.call(this, this._deleteRecipe);
        },

        _deleteRecipe: function () {
            var oRecipe = Util.getBindingObject.call(this, "data");
            Request.Recipe.delete.call(this, oRecipe.id, Util.getModel.call(this, "data"), "/recipes", true)
                .then(() => {
                    var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/closeColumn");
                    Util.getRouter.call(this).navTo("MasterRecipes", {layout: sNextLayout});
                });
        },

        _onClose: function () {
            var oPreviousIngredient = Util.getModel.call(this, "ui").getProperty("/ingredient/previousIngredient");
            Util.getModel.call(this, "data").setProperty(Util.getBindingPath.call(this, "data"), oPreviousIngredient);
            this._closeDetailPage();
        },

        _closeDetailPage: function () {
            var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/closeColumn");
            Util.getRouter.call(this).navTo("MasterRecipes", {layout: sNextLayout});
        },

        onFooterSavePress: function (oEvent) {
            var oActualRecipe = Util.getBindingObject.call(this, "data");
            var oPreviousRecipe = Util.getModel.call(this, "ui").getProperty("/recipe/previousRecipe");

            if (Util.isFlatObjectEqual(oActualRecipe, oPreviousRecipe)) {
                MessageToast.show(Util.getResourceBundle.call(this).getText("NoChangeMessage"));
                Util.toggleShowFooter.call(this);
            } else {
                ConfirmDialog.getSaveChanges.call(this, () => {
                    Request.Recipe.update.call(this, oActualRecipe, Util.getModel.call(this, "data"),
                        Util.getBindingPath.call(this, "data"), true);

                    Util.toggleShowFooter.call(this);
                });
            }
        },

        onFooterCancelPress: function (oEvent) {
            var oActualRecipe = Util.getBindingObject.call(this, "data");
            var oPreviousRecipe = Util.getModel.call(this, "ui").getProperty("/recipe/previousRecipe");

            if (!Util.isFlatObjectEqual(oActualRecipe, oPreviousRecipe)) {
                ConfirmDialog.getDiscardChanges.call(this, () => {
                    Util.getModel.call(this, "data")
                        .setProperty(Util.getBindingPath.call(this, "data"), oPreviousRecipe);

                    Util.toggleShowFooter.call(this);
                });
            } else {
                Util.toggleShowFooter.call(this);
            }

        },

    });
});
