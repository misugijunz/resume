'use strict';

// Biodata controller
angular.module('biodata').controller('BiodataController', ['$scope', '$stateParams', '$location', 'Authentication', 'Biodata',
	function($scope, $stateParams, $location, Authentication, Biodata) {
		$scope.authentication = Authentication;

		// Create new Biodatum
		$scope.create = function() {
			// Create new Biodatum object
			var biodatum = new Biodata ({
				name: this.name
			});

			// Redirect after save
			biodatum.$save(function(response) {
				$location.path('biodata/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Biodatum
		$scope.remove = function(biodatum) {
			if ( biodatum ) { 
				biodatum.$remove();

				for (var i in $scope.biodata) {
					if ($scope.biodata [i] === biodatum) {
						$scope.biodata.splice(i, 1);
					}
				}
			} else {
				$scope.biodatum.$remove(function() {
					$location.path('biodata');
				});
			}
		};

		// Update existing Biodatum
		$scope.update = function() {
			var biodatum = $scope.biodatum;

			biodatum.$update(function() {
				$location.path('biodata/' + biodatum._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Biodata
		$scope.find = function() {
			$scope.biodata = Biodata.query();
		};

		// Find existing Biodatum
		$scope.findOne = function() {
			$scope.biodatum = Biodata.get({ 
				biodatumId: $stateParams.biodatumId
			});
		};
	}
]);