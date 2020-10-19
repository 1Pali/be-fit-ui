sap.ui.define([
    "sap/m/BusyDialog"
], function (BusyDialog) {
	"use strict";

	return {
        _getDialog: function () {
            if (!this._oBusyDialog) {
                this._oBusyDialog = new BusyDialog();
                this.getView().addDependent(this._oBusyDialog);
            }
            return this._oBusyDialog;
        }
	};
});


