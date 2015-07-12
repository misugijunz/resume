'use strict';

// Resumes controller
angular.module('resumes').controller('ResumesController', ['$timeout', '$scope', '$stateParams', '$location', 'Authentication', 'Resumes', 'Biodata', 'Sections', 'Users',
	function($timeout, $scope, $stateParams, $location, Authentication, Resumes, Biodata, Sections, Users) {
		$scope.authentication = Authentication;
		$scope.sectionCounter = -1;
		$scope.sects = {fields: []};
		$scope.profile = new Biodata();

		// Create new Resume
		$scope.create = function() {
			// Create new Resume object
			//console.log($scope.profile);
			//console.log($scope.sects);
			
			var sects_objId = [];
			
			for (var i = 0; i < $scope.sects.fields.length; i++){
				console.log("sects " + i);
				console.log($scope.sects.fields[i]);
				sects_objId.push($scope.sects.fields[i]._id);
			}
			
			console.log(sects_objId);
			
			var resume = new Resumes ({
				name: this.name,
				biodatum: $scope.profile._id,
				sections: sects_objId
			});
			
			//Resumes.populate(resume,)
			// Redirect after save
			resume.$save(function(response) {
				$location.path('resumes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Resume
		$scope.remove = function(resume) {
			if ( resume ) { 
				resume.$remove();

				for (var i in $scope.resumes) {
					if ($scope.resumes [i] === resume) {
						$scope.resumes.splice(i, 1);
					}
				}
			} else {
				$scope.resume.$remove(function() {
					$location.path('resumes');
				});
			}
		};

		// Update existing Resume
		$scope.update = function() {
			var resume = $scope.resume;

			resume.$update(function() {
				$location.path('resumes/' + resume._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Resumes
		$scope.find = function() {
			$scope.resumes = Resumes.query();
		};

		// Find existing Resume
		$scope.findOne = function() {
			$scope.resume = Resumes.get({ 
				resumeId: $stateParams.resumeId
			});
			$scope.sectionCounter = $scope.resume.length;
		};
		
		// Find a list of Biodata
		$scope.findBiodata = function() {
			$scope.biodata = Biodata.query();
		};
		
		// Find a list of Section
		$scope.findSections = function() {
			$scope.sections = Sections.query();
		};
		
		$scope.updateSectionCounter = function() {
			$scope.sectionCounter = $scope.resume.length;
			$scope.sects = [];
			for (var i = 0; i < $scope.sectionCounter; i++){
				$scope.sects.push(new Sections());
			}
			return $scope.updateSectionCounter;	
		};
		
		$scope.addSect = function(){
			$scope.sectionCounter++;
			//$scope.sects.push(new Sections());
			$scope.sects.fields.push('');
		}
		
		$scope.removeSect = function(indexed, index){
			if (indexed){
				if (index > -1){
					$scope.sects.splice(index);
					$scope.sectionCounter--;
				}
			} else{
				$scope.sectionCounter--;
				$scope.sects.fields.pop();
			}
			
		}
	}
]);