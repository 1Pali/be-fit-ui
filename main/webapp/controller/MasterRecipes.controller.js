sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/f/library"
], function(
    Controller,
    JSONModel,
    FioriLibrary
) {
    "use strict";

    return Controller.extend("pc.my.be-fit.controller.MasterRecipes", {

        onInit: function () {

        },

        onTableListItemPress: function (oEvent) {
            // var productPath = oEvent.getSource().getBindingContext("products").getPath(),
            // 	product = productPath.split("/").slice(-1).pop();

            this.getOwnerComponent().getRouter().navTo("DetailRecipes", {layout: FioriLibrary.LayoutType.TwoColumnsMidExpanded, recipe: 0});
        },

        _onObjectMatched : function() {
            //preselect 'All' by default
            var allBtn = this.getView().byId("AllButton");
            allBtn.setSelected(true);
        },

        goToTransportLandscape: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("TransportLandscape", {});
        }

    });

});