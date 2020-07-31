sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function(
    Controller,
    JSONModel,
    MessageBox
) {
    "use strict";

    return Controller.extend("pc.my.be-fit.controller.Standalone", {
        onInit: function () {
            this.oOwnerComponent = this.getOwnerComponent();
            this.oRouter = this.oOwnerComponent.getRouter();
            this.oRouter.attachRouteMatched(this.onRouteMatched, this);
        },

        onRouteMatched: function (oEvent) {
            var sRouteName = oEvent.getParameter("name"),
                oArguments = oEvent.getParameter("arguments");

            this._updateUIElements();

            // Save the current route name
            this.currentRouteName = sRouteName;
            this.currentProduct = oArguments.product;
            this.currentSupplier = oArguments.supplier;
        },

        onStateChanged: function (oEvent) {
            var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
                sLayout = oEvent.getParameter("layout");

            this._updateUIElements();

            // Replace the URL with the new layout if a navigation arrow was used
            if (bIsNavigationArrow) {
                this.oRouter.navTo(this.currentRouteName, {layout: sLayout, product: this.currentProduct, supplier: this.currentSupplier}, true);
            }
        },

        // Update the close/fullscreen buttons visibility
        _updateUIElements: function () {
            var oModel = this.oOwnerComponent.getModel(),
                oUIState;
            this.oOwnerComponent.getHelper().then(function(oHelper) {
                oUIState = oHelper.getCurrentUIState();
                oModel.setData(oUIState);
            });
        },

        onExit: function () {
            this.oRouter.detachRouteMatched(this.onRouteMatched, this);
            this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
        },







        // onInit : function() {
            // var rootPath = jQuery.sap.getModulePath("pc.my.be-fit");
            // var i18nModel = new sap.ui.model.resource.ResourceModel({
            //     bundleUrl : [ rootPath, "i18n/i18n.properties" ].join("/")
            // });
            // sap.ui.getCore().setModel(i18nModel, "i18n");
            //
            // this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        // },

       
        onBeforeRendering : function() {
            this._renderCollapseButton();
        },
        
        onAfterRendering : function() {
            
        },

        onToggleSideNavigation : function(oEvent) {
            var toolPage = this.byId("toolPage");
            var sideExpanded = toolPage.getSideExpanded();
            toolPage.setSideExpanded(!sideExpanded);

            this._renderCollapseButton();
        },

        _renderCollapseButton : function() {
            var oButton = this.byId("sideExpanded");
            var toolPage = this.byId("toolPage");
            var sideExpanded = toolPage.getSideExpanded();

            var sTooltip = sideExpanded ? "COLLAPSE_NAVIGATION" : "EXPAND_NAVIGATION";
            sTooltip = this.getResourceBundle().getText(sTooltip);
            oButton.setTooltip(sTooltip);
        },
        
        getResourceBundle: function() {
            return this.getComponent().getModel("i18n").getResourceBundle();
        },
        
        getComponent: function() {
            return this.getOwnerComponent();
        },
        
        goToIngredients : function() {
        	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	oRouter.navTo("MasterIngredients", {});
        },
        
        goToRecipes: function() {
        	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	oRouter.navTo("MasterRecipes", {});
        },

        goDailyFoodPlanning: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("MasterDailyFoodPlanning", {});
        }

    });

});