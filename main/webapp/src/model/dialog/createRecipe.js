sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(
    JSONModel
) {
    "use strict";

    return {
        getInitial: function () {
            return new JSONModel({
                data: {
                    name: null,
                },
                fieldValidationGroup: {
                    crdName: false
                },
                enableConfirmButton: false
            });
        }
    };
});
