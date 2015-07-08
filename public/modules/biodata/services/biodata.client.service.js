'use strict';

//Biodata service used to communicate Biodata REST endpoints
angular.module('biodata').factory('Biodata', ['$resource',
	function($resource) {
		return $resource('biodata/:biodatumId', { biodatumId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);