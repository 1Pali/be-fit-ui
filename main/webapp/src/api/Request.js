sap.ui.define([
    "pc/my/be-fit/src/api/common",
    "pc/my/be-fit/src/api/ingredient",
    "pc/my/be-fit/src/api/recipe"
], function(
    Common,
    Ingredient,
    Recipe
) {
    "use strict";

    return {
        Common: Common,
        Ingredient: Ingredient,
        Recipe: Recipe
    };
});
