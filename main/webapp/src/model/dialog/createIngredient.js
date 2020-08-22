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
                    description: null,
                    energy: null,
                    protein: null,
                    carbohydrate: null,
                    fat: null,
                    fiber: null,
                    price: null
                },
                fieldValidationGroup: {
                    cidName: false,
                    cidEnergy: false,
                    cidProtein: false,
                    cidCarbohydrate: false,
                    cidFat: false,
                    cidFiber: false
                },
                enableConfirmButton: false
            });
        }
    };
});
