sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "pc/my/be-fit/src/model/section/editIngredient",
    "pc/my/be-fit/src/util/util",
    "pc/my/be-fit/src/model/formatter",
    "sap/ui/core/ValueState"
], function (JSONModel, Controller, EditIngredient, Util, Formatter, ValueState) {
    "use strict";

    return Controller.extend("pc.my.be-fit.src.detail.ingredients.components.body.sections.information.GeneralInformation", {

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
