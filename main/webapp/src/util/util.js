sap.ui.define([
], function (

) {
    "use strict";
    var getModel = function (sModelName) {
        return this.getOwnerComponent().getModel(sModelName);
    };

    var getResourceBundle = function () {
        return getModel.call(this, "i18n").getResourceBundle();
    };

    var clearPreviousData = function() {
        var oUiModel = getModel.call(this, "ui");
        // oUiModel.setProperty("/previousGroup", undefined);
        // oUiModel.setProperty("/previousDependencies", undefined);
        // oUiModel.setProperty("/previousNodes", undefined);
        // oUiModel.setProperty("/previousLines", undefined);
    };

    var toggleShowFooter = function () {
        var bCurrentShowFooterState = !getModel.call(this, "ui").getProperty("/footerVisibility");

        getModel.call(this, "ui").setProperty("/editMode", bCurrentShowFooterState);
        getModel.call(this, "ui").setProperty("/footerVisibility", bCurrentShowFooterState);
    };

    return {
        getModel: getModel,

        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },

        getResourceBundle: getResourceBundle,

        getObjectClone: function (oObject) {
            return Object.assign({}, oObject);
        },

        getArrayClone: function (aArray) {
            return JSON.parse(JSON.stringify(aArray));
        },

        restoreEditedValues: function (sGroupPath) {
            var oUiModel = getModel.call(this, "ui");
            var oDataModel = getModel.call(this, "data");

            // var oPreviousGroup = oUiModel.getProperty("/previousGroup");
            // var oPreviousDependencies = oUiModel.getProperty("/previousDependencies");
            // var oPreviousNodes = oUiModel.getProperty("/previousNodes");
            // var oPreviousLines = oUiModel.getProperty("/previousLines");
            //
            // oDataModel.setProperty(sGroupPath, oPreviousGroup);
            // oDataModel.setProperty("/selectedGroup", [oPreviousGroup]);
            // oDataModel.setProperty("/selectedGroupNodes", oPreviousNodes);
            // oDataModel.setProperty("/selectedGroupLines", oPreviousLines);
            //
            // oUiModel.setProperty("/saveButtonEnabled", undefined);
            clearPreviousData.call(this);
            toggleShowFooter.call(this);
        },

        toggleShowFooter: toggleShowFooter,

        clearPreviousData: clearPreviousData,

        getBindingObject: function (sModelName) {
            return this.getView().getBindingContext(sModelName).getObject();
        },

        getBindingPath: function (sModelName) {
            return this.getView().getBindingContext(sModelName).getPath();
        },

        isFlatObjectEqual: function (oObject1, oObject2) {
            var bIsEqual = true;

            for(var sField in oObject1) {
                if(oObject1[sField] !== oObject2[sField]) {
                    bIsEqual = false;
                    break;
                }
            }

            return bIsEqual;
        }
    };
});
