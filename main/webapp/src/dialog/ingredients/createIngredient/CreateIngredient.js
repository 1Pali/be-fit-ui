sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/core/Fragment",
    "pc/my/be-fit/src/util/util",
    "pc/my/be-fit/src/api/Request",
    "pc/my/be-fit/src/model/dialog/createIngredient",
    "pc/my/be-fit/src/model/entity/entity",
    "pc/my/be-fit/src/model/formatter",
    "sap/ui/core/ValueState"
], function(Parent, Fragment, Util, Request, CreateIngredient, Entity, Formatter, ValueState) {
    "use strict";

    var CREATE_INGREDIENT_DIALOG_FRAGMENT = "pc.my.be-fit.src.dialog.ingredients.createIngredient.CreateIngredient";
    var CREATE_INGREDIENT_DIALOG_CONTROLLER = "pc.my.be-fit.src.dialog.ingredients.createIngredient.CreateIngredient";

    return Parent.extend(CREATE_INGREDIENT_DIALOG_CONTROLLER, {

        formatter: Formatter,

        constructor: function(oCaller) {
            this._oCaller = oCaller;

            Fragment.load({
                name: CREATE_INGREDIENT_DIALOG_FRAGMENT,
                controller: this
            }).then(function(oDialog) {
                this._oDialog = oDialog;
                this._oDialog.setModel(CreateIngredient.getInitial(), "dialog");
                this._oCaller.getView().addDependent(this._oDialog);
                this._oDialog.open();
            }.bind(this));
        },

        onComboBoxChange: function (oEvent) {
            var sId = oEvent.getParameter("id");
            if(oEvent.getSource().getRequired()) {
                if (oEvent.getParameter("selectedItem")) {
                    oEvent.getSource().setValueState(ValueState.None);
                    this._getDialogModel().getProperty("/fieldValidationGroup")[sId] =  true;
                } else {
                    oEvent.getSource().setValueState(ValueState.Error);
                    this._getDialogModel().getProperty("/fieldValidationGroup")[sId] = false;
                }

                this.validateFields();
            }
        },

        onFieldChange: function (oEvent) {
            var sId = oEvent.getParameter("id");
            if(oEvent.getSource().getRequired()) {
                this._getDialogModel().getProperty("/fieldValidationGroup")[sId] = oEvent.getParameter("value") !== "" ? true : false;
                this.validateFields();
            }
        },

        validateFields: function () {
            var oActionModel = this._getDialogModel();
            var oFieldValidationGroup = oActionModel.getProperty("/fieldValidationGroup");

            var bState = true;

            for(var sElement in oFieldValidationGroup) {
                if(oFieldValidationGroup[sElement] === false) {
                    bState = false;
                }
            }

            oActionModel.setProperty("/enableConfirmButton", bState);
        },

        onCreatePress: function() {
            var oDialogModel = this._getDialogModel();
            var sName = oDialogModel.getProperty("/data/name");
            var nEnergy = Number(oDialogModel.getProperty("/data/energy"));
            var nProtein = Number(oDialogModel.getProperty("/data/protein"));
            var nCarbohydrate = Number(oDialogModel.getProperty("/data/carbohydrate"));
            var nFat = Number(oDialogModel.getProperty("/data/fat"));
            var nFiber = Number(oDialogModel.getProperty("/data/fiber"));
            var nPrice = Number(oDialogModel.getProperty("/data/price"));
            var nIngredientTypeId = Number(oDialogModel.getProperty("/data/ingredientTypeSelectedKey"));

            var oIngredient = Entity.Ingredient.newObject(sName, nEnergy, nProtein, nCarbohydrate, nFat, nFiber, nPrice, null, nIngredientTypeId);

            Request.Ingredient.create.call(this._oCaller, oIngredient, Util.getModel.call(this._oCaller, "data"), "/ingredients", true);
            this._oDialog.close();
        },

        onCancelPress: function() {
            this._oDialog.close();
        },

        onAfterClose: function() {
            this._oDialog.destroy();
        },

        _getDialogModel: function() {
            return this._oDialog.getModel("dialog");
        }
    });
});
