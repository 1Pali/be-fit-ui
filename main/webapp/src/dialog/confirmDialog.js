sap.ui.define([
    'pc/my/be-fit/src/util/util',
    'sap/m/Dialog',
    'sap/m/DialogType',
    'sap/m/Text',
    'sap/m/Button',
    'sap/m/ButtonType'
], function (Util, Dialog, DialogType, Text, Button, ButtonType) {
	"use strict";

		var commonDialog = function (fSubmit, sTitle, sQuestion, sSubmitButtonText) {
		    var oResourceBundle = Util.getResourceBundle.call(this);
			var oDialog = new Dialog({
				title: oResourceBundle.getText(sTitle),
				type: DialogType.Message,
				content: new Text({
				    text: oResourceBundle.getText(sQuestion)
				}),
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: oResourceBundle.getText(sSubmitButtonText),
					press: function () {
                        fSubmit.call(this);
						oDialog.close();
					}.bind(this)
				}),
				endButton: new Button({
					text: oResourceBundle.getText("cdCancelButton"),
					press: function () {
						oDialog.close();
					}
				}),
				afterClose: function () {
					oDialog.destroy();
				}
			});

			oDialog.open();
		};

	return {
        commonDialog: commonDialog
	};
});
