'use strict';

// Loyaltyprograms controller
angular.module('loyaltyprograms').controller('LoyaltyprogramsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Loyaltyprograms',
	function($scope, $stateParams, $location, Authentication, Loyaltyprograms) {
		$scope.authentication = Authentication;

		// Create new Loyaltyprogram
		$scope.create = function() {
			// Create new Loyaltyprogram object
			var loyaltyprogram = new Loyaltyprograms ({
				name: this.name
			});

			// Redirect after save
			loyaltyprogram.$save(function(response) {
				$location.path('loyaltyprograms/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Loyaltyprogram
		$scope.remove = function(loyaltyprogram) {
			if ( loyaltyprogram ) { 
				loyaltyprogram.$remove();

				for (var i in $scope.loyaltyprograms) {
					if ($scope.loyaltyprograms [i] === loyaltyprogram) {
						$scope.loyaltyprograms.splice(i, 1);
					}
				}
			} else {
				$scope.loyaltyprogram.$remove(function() {
					$location.path('loyaltyprograms');
				});
			}
		};

		// Update existing Loyaltyprogram
		$scope.update = function() {
			var loyaltyprogram = $scope.loyaltyprogram;

			loyaltyprogram.$update(function() {
				$location.path('loyaltyprograms/' + loyaltyprogram._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Loyaltyprograms
		$scope.find = function() {
			$scope.loyaltyprograms = Loyaltyprograms.query();
		};

		// Find existing Loyaltyprogram
		$scope.findOne = function() {
			$scope.loyaltyprogram = Loyaltyprograms.get({ 
				loyaltyprogramId: $stateParams.loyaltyprogramId
			});
		};
	}
]);