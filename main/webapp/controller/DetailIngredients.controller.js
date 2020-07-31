sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller"
], function (JSONModel, Controller) {
    "use strict";

    return Controller.extend("pc.my.be-fit.controller.DetailIngredients", {
        onInit: function () {
            var oOwnerComponent = this.getOwnerComponent();

            this.oRouter = oOwnerComponent.getRouter();
            this.oModel = oOwnerComponent.getModel();

            this.oRouter.getRoute("MasterIngredients").attachPatternMatched(this._onProductMatched, this);
            this.oRouter.getRoute("DetailIngredients").attachPatternMatched(this._onProductMatched, this);
        },

        _onProductMatched: function (oEvent) {
            this._ingredient = oEvent.getParameter("arguments").ingredient || this._ingredient || "0";
            this.getView().bindElement({
                path: "/ingredientsCollection/" + this._ingredient
            });
        },

        onEditToggleButtonPress: function() {
            var oObjectPage = this.getView().byId("ObjectPageLayout"),
                bCurrentShowFooterState = oObjectPage.getShowFooter();

            oObjectPage.setShowFooter(!bCurrentShowFooterState);
        },

        onExit: function () {
            this.oRouter.getRoute("MasterIngredients").detachPatternMatched(this._onProductMatched, this);
            this.oRouter.getRoute("DetailIngredients").detachPatternMatched(this._onProductMatched, this);
        }
    });
});
