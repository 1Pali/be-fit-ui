sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"pc/my/be-fit/src/api/Request",
	"pc/my/be-fit/src/util/util"
], function(
	Controller,
	Request,
	Util
) {
    "use strict";

    return Controller.extend("pc.my.be-fit.src.master.ingredients.MasterIngredients", {
		onInit: function () {
			Request.IngredientType.getList.call(this, Util.getModel.call(this, "data"), "/ingredientTypes", true);
		},

		_onObjectMatched : function() {
			//preselect 'All' by default
			var allBtn = this.getView().byId("AllButton");
			allBtn.setSelected(true);
		},

		goToTransportLandscape: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("TransportLandscape", {});
		}

    });

});
