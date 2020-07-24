sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/m/MessageBox" ], function(Controller, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("pc.my.be-fit.controller.Standalone", {

        onInit : function() {
            var rootPath = jQuery.sap.getModulePath("pc.my.be-fit");
            var i18nModel = new sap.ui.model.resource.ResourceModel({
                bundleUrl : [ rootPath, "i18n/i18n.properties" ].join("/")
            });
            sap.ui.getCore().setModel(i18nModel, "i18n");
            
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        },

       
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
        	oRouter.navTo("Ingredients", {});
        },
        
        goToRecipes: function() {
        	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	oRouter.navTo("Recipes", {});
        },

        goDailyFoodPlanning: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("DailyFoodPlanning", {});
        }

    });

});