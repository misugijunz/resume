'use strict';

//Setting up route
angular.module('loyaltyprograms').config(['$stateProvider',
	function($stateProvider) {
		// Loyaltyprograms state routing
		$stateProvider.
		state('listLoyaltyprograms', {
			url: '/loyaltyprograms',
			templateUrl: 'modules/loyaltyprograms/views/list-loyaltyprograms.client.view.html'
		}).
		state('createLoyaltyprogram', {
			url: '/loyaltyprograms/create',
			templateUrl: 'modules/loyaltyprograms/views/create-loyaltyprogram.client.view.html'
		}).
		state('viewLoyaltyprogram', {
			url: '/loyaltyprograms/:loyaltyprogramId',
			templateUrl: 'modules/loyaltyprograms/views/view-loyaltyprogram.client.view.html'
		}).
		state('editLoyaltyprogram', {
			url: '/loyaltyprograms/:loyaltyprogramId/edit',
			templateUrl: 'modules/loyaltyprograms/views/edit-loyaltyprogram.client.view.html'
		});
	}
]);