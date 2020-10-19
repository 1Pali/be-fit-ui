sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "com/pepa/befit/be_fit_ui/src/api/Request"
], function(
    Controller,
    JSONModel,
    MessageBox,
    Request
) {
    "use strict";

    return Controller.extend("com.pepa.befit.be_fit_ui.src.app.App", {
        onInit: function () {
            this.oOwnerComponent = this.getOwnerComponent();
            this.oRouter = this.oOwnerComponent.getRouter();
            this.oRouter.attachRouteMatched(this.onRouteMatched, this);
        },

        onRouteMatched: function (oEvent) {
            var sRouteName = oEvent.getParameter("name"),
                oArguments = oEvent.getParameter("arguments");

            this._updateUIElements();

            switch (sRouteName) {
                case "DetailIngredients":
                    this.currentIngredient = oArguments.ingredient;
                    break;
                case "DetailRecipes":
                    this.currentRecipe = oArguments.recipe;
                    break;
            }

            // Save the current route name
            this.currentRouteName = sRouteName;

        },

        onStateChanged: function (oEvent) {
            var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
                sLayout = oEvent.getParameter("layout");

            this._updateUIElements();

            //MOST PROBABLY ISSUE WITH THIS AT REFRESHING APP DETAIL IS NOT DISPLAYED AUTOMATICALLY IF WAS BEFORE
            if (this.currentRouteName.includes("Detail")) {
                var oRouteData = {
                    layout: sLayout
                };

                switch(this.currentRouteName) {
                    case "DetailIngredients":
                        oRouteData = {
                            layout: "TwoColumnsMidExpanded",
                            ingredient: this.currentIngredient,
                        };

                        break;
                    case "DetailRecipes":
                        oRouteData = {
                            layout: "TwoColumnsMidExpanded",
                            recipe: this.currentRecipe,
                        };

                        break;
                }

                //BUG: APP MUST NAVIGATE TO DETAIL BUT DOESNT VALUES ARE OK
                this.oRouter.navTo(this.currentRouteName, oRouteData, true);
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
            Request.Ingredient.getList.call(this, this.getOwnerComponent().getModel("data"), "/ingredients", true);
        	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	oRouter.navTo("MasterIngredients", {layout: "OneColumn"});
        },
        
        goToRecipes: function() {
            Request.Recipe.getList.call(this, this.getOwnerComponent().getModel("data"), "/recipes", true);
        	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	oRouter.navTo("MasterRecipes", {layout: "OneColumn"});
        },

        goDailyFoodPlanning: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("MasterDailyFoodPlanning", {layout: "OneColumn"});
        }

    });

});