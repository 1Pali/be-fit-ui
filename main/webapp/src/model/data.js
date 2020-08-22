sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(
    JSONModel
) {
    "use strict";

    return {
        getInitial: new JSONModel({
            ingredients: undefined,
            recipes: undefined,
            dailyFoodPlannings: undefined
        })
    };
});
