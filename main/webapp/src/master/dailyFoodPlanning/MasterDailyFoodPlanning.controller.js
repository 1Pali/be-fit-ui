sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (
    Controller,
    MessageToast
) {
    "use strict";

    return Controller.extend("com.pepa.befit.be_fit_ui.src.master.dailyFoodPlanning.MasterDailyFoodPlanning", {

        _onObjectMatched: function () {
            //preselect 'All' by default
            var allBtn = this.getView().byId("AllButton");
            allBtn.setSelected(true);
        },

        goToTransportLandscape: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("TransportLandscape", {});
        }

    });

});
