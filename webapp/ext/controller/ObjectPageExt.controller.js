/*
 * Copyright (C) 2009-2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
    "sap/ui/core/routing/History",
    "vwks/nlp/s2p/mm/ctrdist/create/ext/util/ControllerHelper",
    "vwks/nlp/s2p/mm/reuse/lib/util/Constants",
    "vwks/nlp/s2p/mm/reuse/lib/util/NavigationHelper"
], function (History, ControllerHelper, Constants, NavigationHelper) {
    "use strict";
    return sap.ui.controller("vwks.nlp.s2p.mm.ctrdist.create.ext.controller.ObjectPageExt", {
		/**
		 * Event handler for Object Page controller.
		 * Attach page data loaded event listener.
		 * @public
		 */
        onInit: function () {
            this.extensionAPI.getTransactionController().attachAfterActivate(this._onSave.bind(this));
            this.extensionAPI.getTransactionController().attachAfterDelete(this.onAfterDelete.bind(this));
        },

		/**
		 * Handler for navigation on contract link press
		 * @param {object} oEvent - contract press event
		 * @public                                                                                                                                                                       
		 */
        handleContractPress: function (oEvent) {
            var sSeletedContract = oEvent.getSource().getProperty("text");
            var sRequiredURL = this.getView().getModel("MCPC").createKey("C_CntrlPurContrHierHdrTP", {
                CentralPurchaseContract: sSeletedContract,
                DraftUUID: Constants.INITIAL_GUID,
                IsActiveEntity: true
            });
            //Navigate to MCPC
            NavigationHelper.navigateToExternalApp(this, "MCPC", sRequiredURL);
        },

        /**
		 * This method is fired after Standard Save is called
         * @param {sap.ui.base.Event} oActivateEvent event object
		 */
        _onSave: function (oActivateEvent) {
            oActivateEvent.activationPromise.then(function (oResponse) {
                this._navigateBack().bind(this);
            }.bind(this));
        },

		/**
		 * Navigate back if changes are canceled.
		 */
        _navigateBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            if (sPreviousHash) {
                window.history.go(-1);
            }
        },

		/**
		 * This method is fired after Delete call for the current doc is successful.
		 * @public
		 */
        onAfterDelete: function () {
            //Navigate to MCPC
            NavigationHelper.navigateToExternalApp(this, "MCPC");
        }

    });
});