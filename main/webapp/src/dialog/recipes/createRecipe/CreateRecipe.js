sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/core/Fragment",
    "com/pepa/befit/be_fit_ui/src/util/util",
    "com/pepa/befit/be_fit_ui/src/api/Request",
    "com/pepa/befit/be_fit_ui/src/model/dialog/createRecipe",
    "com/pepa/befit/be_fit_ui/src/model/entity/entity"
], function(Parent, Fragment, Util, Request, CreateRecipe, Entity) {
    "use strict";

    var CREATE_RECIPE_DIALOG_FRAGMENT = "com.pepa.befit.be_fit_ui.src.dialog.recipes.createRecipe.CreateRecipe";
    var CREATE_RECIPE_DIALOG_CONTROLLER = "com.pepa.befit.be_fit_ui.src.dialog.recipes.createRecipe.CreateRecipe";

    return Parent.extend(CREATE_RECIPE_DIALOG_CONTROLLER, {

        constructor: function(oCaller) {
            this._oCaller = oCaller;

            Fragment.load({
                name: CREATE_RECIPE_DIALOG_FRAGMENT,
                controller: this
            }).then(function(oDialog) {
                this._oDialog = oDialog;
                this._oDialog.setModel(CreateRecipe.getInitial(), "dialog");
                this._oCaller.getView().addDependent(this._oDialog);
                this._oDialog.open();
            }.bind(this));
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

            var oRecipe = Entity.Recipe.newObject(sName, null);

            Request.Recipe.create.call(this._oCaller, oRecipe, Util.getModel.call(this._oCaller, "data"), "/recipes", true);
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
