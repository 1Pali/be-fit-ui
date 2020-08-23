sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(
    JSONModel
) {
    "use strict";

    return {
        getInitial: function () {
            return new JSONModel({
                fieldValidationGroup: {
                    isName: false,
                    isEnergy: false,
                    isProtein: false,
                    isCarbohydrate: false,
                    isFat: false,
                    isFiber: false
                }
            });
        }
    };
});
