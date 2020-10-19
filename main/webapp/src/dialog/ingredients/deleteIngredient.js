sap.ui.define([
    "com/pepa/befit/be_fit_ui/src/dialog/confirmDialog"
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
