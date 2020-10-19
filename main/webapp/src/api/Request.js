sap.ui.define([
    "com/pepa/befit/be_fit_ui/src/api/common",
    "com/pepa/befit/be_fit_ui/src/api/ingredient",
    "com/pepa/befit/be_fit_ui/src/api/recipe",
    "com/pepa/befit/be_fit_ui/src/api/ingredientType"
], function(
    Common,
    Ingredient,
    Recipe,
    IngredientType
) {
    "use strict";

    return {
        Common: Common,
        Ingredient: Ingredient,
        Recipe: Recipe,
        IngredientType: IngredientType
    };
});
