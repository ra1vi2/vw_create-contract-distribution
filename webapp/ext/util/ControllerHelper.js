sap.ui.define([
	"vwks/nlp/s2p/mm/ctrdist/create/ext/util/Constants"
	], function (Constants) {
	"use strict";

	return {
		/**
		 * Navigate to the MCPC application.
		 * @public
		 */
		navigateToManagePCApplication: function () {
			var oCrossAppService = sap.ushell.Container.getServiceAsync("CrossApplicationNavigation");
			var oTarget = {
				semanticObject: Constants.MCPC_SEMANTIC_OBJECT,
				action: Constants.MCPC_ACTION
			};
			oCrossAppService.then(function (oService) {
				var sHash = oService.hrefForExternal({
					target: oTarget
				}) || "";
				oService.isNavigationSupported([sHash])
					.done(function (aResponses) {
						if (aResponses.length && aResponses[0].supported) {
							oService.toExternal({
								target: oTarget
							});
						}
					}, this);
			});
		}
	};
});