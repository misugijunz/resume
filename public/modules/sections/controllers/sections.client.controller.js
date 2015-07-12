'use strict';

// Sections controller
angular.module('sections').controller('SectionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Sections', 'Articles',
	function($scope, $stateParams, $location, Authentication, Sections, Articles) {
		$scope.authentication = Authentication;
		$scope.articleCounter = -1;
		$scope.artics = {fields: []};

		// Create new Section
		$scope.create = function() {
			// Create new Section object
			
			var artics_objId = [];
			
			for (var i = 0; i < $scope.artics.fields.length; i++){
				console.log("sects " + i);
				console.log($scope.artics.fields[i]);
				artics_objId.push($scope.artics.fields[i]._id);
			}
			
			
			var section = new Sections ({
				name: this.name,
				articles: artics_objId
			});

			// Redirect after save
			section.$save(function(response) {
				$location.path('sections/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Section
		$scope.remove = function(section) {
			if ( section ) { 
				section.$remove();

				for (var i in $scope.sections) {
					if ($scope.sections [i] === section) {
						$scope.sections.splice(i, 1);
					}
				}
			} else {
				$scope.section.$remove(function() {
					$location.path('sections');
				});
			}
		};

		// Update existing Section
		$scope.update = function() {
			var section = $scope.section;

			section.$update(function() {
				$location.path('sections/' + section._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Sections
		$scope.find = function() {
			$scope.sections = Sections.query();
		};

		// Find existing Section
		$scope.findOne = function() {
			$scope.section = Sections.get({ 
				sectionId: $stateParams.sectionId
			});
		};
		
		// Find a list of Section
		$scope.findArticles = function() {
			$scope.articles = Articles.query();
		};
		
		
		/*$scope.updateArticleCounter = function() {
			$scope.articleCounter = $scope.resume.length;
			$scope.sects = [];
			for (var i = 0; i < $scope.sectionCounter; i++){
				$scope.sects.push(new Sections());
			}
			return $scope.updateSectionCounter;	
		};*/
		
		$scope.addArtic = function(){
			$scope.articleCounter++;
			//$scope.sects.push(new Sections());
			$scope.artics.fields.push('');
		}
		
		$scope.removeArtic = function(indexed, index){
			if (indexed){
				if (index > -1){
					$scope.artics.fields.splice(index);
					$scope.articleCounter--;
				}
			} else{
				$scope.articleCounter--;
				$scope.artics.fields.pop();
			}
			
		}
	}
]);