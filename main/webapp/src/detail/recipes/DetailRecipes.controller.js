sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller"
], function (JSONModel, Controller) {
    "use strict";

    return Controller.extend("pc.my.be-fit.src.detail.recipes.DetailRecipes", {
        onInit: function () {
            var oOwnerComponent = this.getOwnerComponent();

            this.oRouter = oOwnerComponent.getRouter();
            this.oModel = oOwnerComponent.getModel();

            this.oRouter.getRoute("MasterRecipes").attachPatternMatched(this._onProductMatched, this);
            this.oRouter.getRoute("DetailRecipes").attachPatternMatched(this._onProductMatched, this);
        },

        _onProductMatched: function (oEvent) {
            this._recipeModelIndex = oEvent.getParameter("arguments").recipe || this._recipeModelIndex || "0";
            this.getView().bindElement({
                path: "/recipes/" + this._recipeModelIndex,
                model: "data"
            });
        },

        onEditToggleButtonPress: function() {
            var oObjectPage = this.getView().byId("ObjectPageLayout"),
                bCurrentShowFooterState = oObjectPage.getShowFooter();

            oObjectPage.setShowFooter(!bCurrentShowFooterState);
        },

        onExit: function () {
            this.oRouter.getRoute("MasterRecipes").detachPatternMatched(this._onProductMatched, this);
            this.oRouter.getRoute("DetailRecipes").detachPatternMatched(this._onProductMatched, this);
        }

    });
});
