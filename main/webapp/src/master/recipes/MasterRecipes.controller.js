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

    return Controller.extend("pc.my.be-fit.src.master.recipes.MasterRecipes", {

        onInit: function () {

        },

        onTableListItemPress: function (oEvent) {
            var sRecipeId = oEvent.getSource().getBindingContext("data").getObject().id;

            this.getOwnerComponent().getRouter().navTo("DetailRecipes",
                {
                    layout: FioriLibrary.LayoutType.TwoColumnsMidExpanded,
                    recipe: sRecipeId
                });
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