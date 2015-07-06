'use strict';

//Setting up route
angular.module('biodata').config(['$stateProvider',
	function($stateProvider) {
		// Biodata state routing
		$stateProvider.
		state('listBiodata', {
			url: '/biodata',
			templateUrl: 'modules/biodata/views/list-biodata.client.view.html'
		}).
		state('createBiodatum', {
			url: '/biodata/create',
			templateUrl: 'modules/biodata/views/create-biodatum.client.view.html'
		}).
		state('viewBiodatum', {
			url: '/biodata/:biodatumId',
			templateUrl: 'modules/biodata/views/view-biodatum.client.view.html'
		}).
		state('editBiodatum', {
			url: '/biodata/:biodatumId/edit',
			templateUrl: 'modules/biodata/views/edit-biodatum.client.view.html'
		});
	}
]);