sap.ui.define([
	"vwks/nlp/s2p/mm/ctrdist/create/ext/util/ControllerHelper",
	"vwks/nlp/s2p/mm/reuse/lib/util/NavigationHelper"
], function (ControllerHelper, NavigationHelper) {
	"use strict";

	return sap.ui.controller("vwks.nlp.s2p.mm.ctrdist.create.ext.controller.ListReportExt", Object.assign({}, ControllerHelper, {

		/**
		 * Event handler for ListReport Page controller.
		 * Attach route pattern matched event listener.
		 * @public
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView().getController());
			oRouter.attachRoutePatternMatched(this.onPatternMatched.bind(this));
		},

		/**
		 * Route pattern matched event handler.
		 * Navigate to MPRC app.
		 * @public
		 */
		onPatternMatched: function () {
			//Navigate to MCPC
			NavigationHelper.navigateToExternalApp(this, "MCPC");
		}
	}));
});