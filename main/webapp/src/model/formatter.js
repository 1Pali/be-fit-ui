sap.ui.define([
    "com/pepa/befit/be_fit_ui/src/util/util"
], function (Util) {
    "use strict";

    return {
        getTranslatedText: function (sText) {
            if (!sText) {
                return
            }

            if(this.hasOwnProperty("_oCaller")) {
                return Util.getResourceBundle.call(this._oCaller).getText(sText);
            } else {
                return Util.getResourceBundle.call(this).getText(sText);
            }
        }
    };
});
