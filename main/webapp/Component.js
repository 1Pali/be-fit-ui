sap.ui.define([ "sap/ui/core/UIComponent" ], function(UIComponent) {
    "use strict";

    return UIComponent.extend("techEd2018NetworkGraph.Component", {
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
            jQuery.sap.require("jquery.sap.storage");
            this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

            // call the base component's init function
            sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

            this.getRouter().initialize();

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