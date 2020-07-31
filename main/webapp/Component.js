sap.ui.define([
    "sap/ui/core/UIComponent",
    'sap/f/library',
    'sap/f/FlexibleColumnLayoutSemanticHelper',
    "sap/ui/model/json/JSONModel"
], function(
    UIComponent,
    FioriLibrary,
    FlexibleColumnLayoutSemanticHelper,
    JSONModel
) {
    "use strict";

    return UIComponent.extend("pc.my.be-fit.Component", {
        metadata : {
            manifest : "json"
        },

        /**
         * The component is initialized by UI5 automatically during the startup
         * of the app and calls the init method once.
         * 
         * @public
         * @override
         */

        init : function() {
            this.setModel(new JSONModel());


            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            this.getRouter().initialize();
            this.getRouter().attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
        },


        _onBeforeRouteMatched: function(oEvent) {
            var oModel = this.getModel(),
                sLayout = oEvent.getParameters().arguments.layout;

            // If there is no layout parameter, set a default layout (normally OneColumn)
            if (!sLayout) {
                sLayout = FioriLibrary.LayoutType.OneColumn;
            }

            oModel.setProperty("/layout", sLayout);
        },

        getHelper: function () {
            return this._getFlexibleColumnLayout().then(function(oFcl) {
                var oSettings = {
                    defaultTwoColumnLayoutType: FioriLibrary.LayoutType.TwoColumnsMidExpanded,
                    defaultThreeColumnLayoutType: FioriLibrary.LayoutType.ThreeColumnsMidExpanded
                };
                return (FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFcl, oSettings));
            });
        },

        _getFlexibleColumnLayout: function () {
            return new Promise(function(resolve, reject) {
                var oFcl = this.getRootControl().byId('flexibleColumnLayout');
                if (!oFcl) {
                    this.getRootControl().attachAfterInit(function(oEvent) {
                        resolve(oEvent.getSource().byId('flexibleColumnLayout'));
                    }, this);
                    return;
                }
                resolve(oFcl);

            }.bind(this));
        },





        getDefaultView : function() {
            var sRootView = this.getMetadata().getConfig().defaultView;
            var router = this.getRouter();
            var view = router.getView(sRootView, "XML", "standalone");
            return view;
        },

        getContentDensityClass : function() {
            if (!this._sContentDensityClass) {
                if (!sap.ui.Device.support.touch) {
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    this._sContentDensityClass = "sapUiSizeCozy";
                }
            }
            return this._sContentDensityClass;
        }
    });

});