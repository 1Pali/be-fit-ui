sap.ui.define([
    "pc/my/be-fit/src/dialog/ingredients/createIngredient/CreateIngredient",
    "pc/my/be-fit/src/dialog/recipes/createRecipe/CreateRecipe"
], function(
    CreateIngredient,
    CreateRecipe
) {

    "use strict";
    return {
        getCreateIngredientDialog: function(oCaller) {
            new CreateIngredient(oCaller);
        },

        getCreateRecipeDialog: function(oCaller) {
            new CreateRecipe(oCaller);
        }
    };
});
