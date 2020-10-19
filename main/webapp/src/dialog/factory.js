sap.ui.define([
    "com/pepa/befit/be_fit_ui/src/dialog/ingredients/createIngredient/CreateIngredient",
    "com/pepa/befit/be_fit_ui/src/dialog/recipes/createRecipe/CreateRecipe"
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
