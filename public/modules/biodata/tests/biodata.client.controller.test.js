'use strict';

(function() {
	// Biodata Controller Spec
	describe('Biodata Controller Tests', function() {
		// Initialize global variables
		var BiodataController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Biodata controller.
			BiodataController = $controller('BiodataController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Biodatum object fetched from XHR', inject(function(Biodata) {
			// Create sample Biodatum using the Biodata service
			var sampleBiodatum = new Biodata({
				name: 'New Biodatum'
			});

			// Create a sample Biodata array that includes the new Biodatum
			var sampleBiodata = [sampleBiodatum];

			// Set GET response
			$httpBackend.expectGET('biodata').respond(sampleBiodata);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.biodata).toEqualData(sampleBiodata);
		}));

		it('$scope.findOne() should create an array with one Biodatum object fetched from XHR using a biodatumId URL parameter', inject(function(Biodata) {
			// Define a sample Biodatum object
			var sampleBiodatum = new Biodata({
				name: 'New Biodatum'
			});

			// Set the URL parameter
			$stateParams.biodatumId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/biodata\/([0-9a-fA-F]{24})$/).respond(sampleBiodatum);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.biodatum).toEqualData(sampleBiodatum);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Biodata) {
			// Create a sample Biodatum object
			var sampleBiodatumPostData = new Biodata({
				name: 'New Biodatum'
			});

			// Create a sample Biodatum response
			var sampleBiodatumResponse = new Biodata({
				_id: '525cf20451979dea2c000001',
				name: 'New Biodatum'
			});

			// Fixture mock form input values
			scope.name = 'New Biodatum';

			// Set POST response
			$httpBackend.expectPOST('biodata', sampleBiodatumPostData).respond(sampleBiodatumResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Biodatum was created
			expect($location.path()).toBe('/biodata/' + sampleBiodatumResponse._id);
		}));

		it('$scope.update() should update a valid Biodatum', inject(function(Biodata) {
			// Define a sample Biodatum put data
			var sampleBiodatumPutData = new Biodata({
				_id: '525cf20451979dea2c000001',
				name: 'New Biodatum'
			});

			// Mock Biodatum in scope
			scope.biodatum = sampleBiodatumPutData;

			// Set PUT response
			$httpBackend.expectPUT(/biodata\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/biodata/' + sampleBiodatumPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid biodatumId and remove the Biodatum from the scope', inject(function(Biodata) {
			// Create new Biodatum object
			var sampleBiodatum = new Biodata({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Biodata array and include the Biodatum
			scope.biodata = [sampleBiodatum];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/biodata\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBiodatum);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.biodata.length).toBe(0);
		}));
	});
}());