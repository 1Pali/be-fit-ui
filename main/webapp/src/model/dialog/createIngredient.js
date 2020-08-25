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
                    ingredientTypeSelectedKey: null,
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
                    cidType: false,
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
