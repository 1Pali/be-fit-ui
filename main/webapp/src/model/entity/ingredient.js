sap.ui.define([
], function() {
    "use strict";

    return {
        newObject: function (sName, nEnergy, nProtein, nCarbohydrate, nFat, nFiber, nPrice, sDescription) {
            return {
                name: sName,
                energy: nEnergy,
                protein: nProtein,
                carbohydrate: nCarbohydrate,
                fat: nFat,
                fiber: nFiber,
                price: nPrice,
                description: sDescription
            };
        }


    };
});
