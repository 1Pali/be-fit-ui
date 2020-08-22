sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(
    JSONModel
) {
    "use strict";

    return {
        getInitial: new JSONModel({
            ingredient: {
              previousIngredient: undefined,
            },
            recipe: {
                previousRecipe: undefined,
                previousRecipeDescriptions: undefined
            },
            selectedObjectIndex: undefined,
            footerVisibility: false,
            editMode: false
        })
    };
});
