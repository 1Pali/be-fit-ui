sap.ui.define([
    "pc/my/be-fit/src/dialog/ingredients/createIngredient/CreateIngredient"
], function(
    CreateIngredient
) {

    "use strict";
    return {
        getCreateIngredientDialog: function(oCaller) {
            new CreateIngredient(oCaller);
        }
    };
});
