sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "com/pepa/befit/be_fit_ui/src/model/section/editIngredient",
    "com/pepa/befit/be_fit_ui/src/util/util",
    "com/pepa/befit/be_fit_ui/src/model/formatter",
    "sap/ui/core/ValueState"
], function (JSONModel, Controller, EditIngredient, Util, Formatter, ValueState) {
    "use strict";

    return Controller.extend("com.pepa.befit.be_fit_ui.src.detail.ingredients.components.body.sections.information.GeneralInformation", {

        formatter: Formatter,

        onInit: function () {
            this.getView().setModel(EditIngredient.getInitial(), "generalInformartionSection");
        },

        getStateAndValidate: function (sValue, sId) {
            var aFieldValidationGroup = this.getView().getModel("generalInformartionSection").getProperty("/fieldValidationGroup");

            if(sValue) {
                aFieldValidationGroup[sId] = true;
                var bIsValid = Util.isFieldGroupValid(aFieldValidationGroup);
                Util.getModel.call(this, "ui").setProperty("/footerSaveButtonEnabled", bIsValid);
                return ValueState.None;
            } else {
                aFieldValidationGroup[sId] = false;
                var bIsValid = Util.isFieldGroupValid(aFieldValidationGroup);
                Util.getModel.call(this, "ui").setProperty("/footerSaveButtonEnabled", bIsValid);
                return ValueState.Error;
            }
        }
    });
});
