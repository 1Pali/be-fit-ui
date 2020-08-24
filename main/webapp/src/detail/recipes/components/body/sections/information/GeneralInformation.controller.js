sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "pc/my/be-fit/src/model/section/editRecipe",
    "pc/my/be-fit/src/util/util"
], function (JSONModel, Controller, EditRecipe, Util) {
    "use strict";

    return Controller.extend("pc.my.be-fit.src.detail.recipes.components.body.sections.information.GeneralInformation", {
        onInit: function () {
            this.getView().setModel(EditRecipe.getInitial(), "generalInformartionSection");
        },

        getStateAndValidate: function (sValue, sId) {
            var aFieldValidationGroup = this.getView().getModel("generalInformartionSection").getProperty("/fieldValidationGroup");

            if(sValue) {
                aFieldValidationGroup[sId] = true;
                var bIsValid = Util.isFieldGroupValid(aFieldValidationGroup);
                Util.getModel.call(this, "ui").setProperty("/footerSaveButtonEnabled", bIsValid);
                return "None";
            } else {
                aFieldValidationGroup[sId] = false;
                var bIsValid = Util.isFieldGroupValid(aFieldValidationGroup);
                Util.getModel.call(this, "ui").setProperty("/footerSaveButtonEnabled", bIsValid);
                return "Error";
            }
        }
    });
});
