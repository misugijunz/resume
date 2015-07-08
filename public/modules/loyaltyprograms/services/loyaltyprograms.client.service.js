'use strict';

//Loyaltyprograms service used to communicate Loyaltyprograms REST endpoints
angular.module('loyaltyprograms').factory('Loyaltyprograms', ['$resource',
	function($resource) {
		return $resource('loyaltyprograms/:loyaltyprogramId', { loyaltyprogramId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);