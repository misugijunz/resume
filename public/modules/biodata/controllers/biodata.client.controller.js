'use strict';

// Biodata controller
angular.module('biodata').controller('BiodataController', ['$scope', '$stateParams', '$location', '$sce', 'Authentication', 'Biodata',
	function($scope, $stateParams, $location, $sce, Authentication, Biodata) {
		$scope.authentication = Authentication;

		// Create new Biodatum
		$scope.create = function() {
			// Create new Biodatum object
			console.log(this.dateOfBirth);
			var biodatum = new Biodata ({
				name: this.name,
				dateOfBirth: new Date.parse(this.dateOfBirth),
				address: this.address,
				email: {
					home: this.email.home
				},
				phones: {
					home: this.phones.home,
					mobile: this.phones.mobile
				},
				socials: {
					skype: this.socials.skype
				}
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
		
		$scope.tinymceOptions = {
	        resize: false,
	        //width: 400,  // I *think* its a number and not '400' string
	        height: 150,
	        theme: "modern",
		    plugins: [
		        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
		        "wordcount visualblocks visualchars code fullscreen",
		        "emoticons template paste textcolor"
		    ],
	        toolbar: 'undo redo styleselect bold italic bullist forecolor backcolor',
			raw: true,
			trusted: true,
	        menu : { // this is the complete default configuration
	            edit   : {title : 'Edit'  , items : 'undo redo | cut copy paste pastetext | selectall'},
	            insert : {title : 'Insert', items : 'bullist numlist outdent indent | link'},
	            format : {title : 'Format', items : 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
	        },
	
	        init_instance_callback: function(editor) {
	          var textContentTrigger = function() {
	            $scope.textContent = editor.getBody().textContent;
	            $scope.$apply();
	          };
	
	          editor.on('KeyUp', textContentTrigger);
	          editor.on('ExecCommand', textContentTrigger);
	          editor.on('SetContent', function(e) {
	            if(!e.initial)
	              textContentTrigger();
	          });
	        }
	    };
		
	}	
	
]);