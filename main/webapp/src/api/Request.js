sap.ui.define([
    "pc/my/be-fit/src/api/common",
    "pc/my/be-fit/src/api/ingredient",
    "pc/my/be-fit/src/api/recipe",
    "pc/my/be-fit/src/api/ingredientType"
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
