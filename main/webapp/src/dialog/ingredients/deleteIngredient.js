sap.ui.define([
    "pc/my/be-fit/src/dialog/confirmDialog"
], function (
    ConfirmDialog
) {
    "use strict";

    return {

        getDialog: function (fOnSubmit) {
            ConfirmDialog.commonDialog.call(
                this,
                fOnSubmit,
                "cdDeleteIngredientTitle",
                "cdDeleteIngredientQuestion",
                "cdDeleteIngredientButton"
            );
        }
    };
});
