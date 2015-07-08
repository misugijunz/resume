'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Loyaltyprogram = mongoose.model('Loyaltyprogram'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, loyaltyprogram;

/**
 * Loyaltyprogram routes tests
 */
describe('Loyaltyprogram CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Loyaltyprogram
		user.save(function() {
			loyaltyprogram = {
				name: 'Loyaltyprogram Name'
			};

			done();
		});
	});

	it('should be able to save Loyaltyprogram instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Loyaltyprogram
				agent.post('/loyaltyprograms')
					.send(loyaltyprogram)
					.expect(200)
					.end(function(loyaltyprogramSaveErr, loyaltyprogramSaveRes) {
						// Handle Loyaltyprogram save error
						if (loyaltyprogramSaveErr) done(loyaltyprogramSaveErr);

						// Get a list of Loyaltyprograms
						agent.get('/loyaltyprograms')
							.end(function(loyaltyprogramsGetErr, loyaltyprogramsGetRes) {
								// Handle Loyaltyprogram save error
								if (loyaltyprogramsGetErr) done(loyaltyprogramsGetErr);

								// Get Loyaltyprograms list
								var loyaltyprograms = loyaltyprogramsGetRes.body;

								// Set assertions
								(loyaltyprograms[0].user._id).should.equal(userId);
								(loyaltyprograms[0].name).should.match('Loyaltyprogram Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Loyaltyprogram instance if not logged in', function(done) {
		agent.post('/loyaltyprograms')
			.send(loyaltyprogram)
			.expect(401)
			.end(function(loyaltyprogramSaveErr, loyaltyprogramSaveRes) {
				// Call the assertion callback
				done(loyaltyprogramSaveErr);
			});
	});

	it('should not be able to save Loyaltyprogram instance if no name is provided', function(done) {
		// Invalidate name field
		loyaltyprogram.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Loyaltyprogram
				agent.post('/loyaltyprograms')
					.send(loyaltyprogram)
					.expect(400)
					.end(function(loyaltyprogramSaveErr, loyaltyprogramSaveRes) {
						// Set message assertion
						(loyaltyprogramSaveRes.body.message).should.match('Please fill Loyaltyprogram name');
						
						// Handle Loyaltyprogram save error
						done(loyaltyprogramSaveErr);
					});
			});
	});

	it('should be able to update Loyaltyprogram instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Loyaltyprogram
				agent.post('/loyaltyprograms')
					.send(loyaltyprogram)
					.expect(200)
					.end(function(loyaltyprogramSaveErr, loyaltyprogramSaveRes) {
						// Handle Loyaltyprogram save error
						if (loyaltyprogramSaveErr) done(loyaltyprogramSaveErr);

						// Update Loyaltyprogram name
						loyaltyprogram.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Loyaltyprogram
						agent.put('/loyaltyprograms/' + loyaltyprogramSaveRes.body._id)
							.send(loyaltyprogram)
							.expect(200)
							.end(function(loyaltyprogramUpdateErr, loyaltyprogramUpdateRes) {
								// Handle Loyaltyprogram update error
								if (loyaltyprogramUpdateErr) done(loyaltyprogramUpdateErr);

								// Set assertions
								(loyaltyprogramUpdateRes.body._id).should.equal(loyaltyprogramSaveRes.body._id);
								(loyaltyprogramUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Loyaltyprograms if not signed in', function(done) {
		// Create new Loyaltyprogram model instance
		var loyaltyprogramObj = new Loyaltyprogram(loyaltyprogram);

		// Save the Loyaltyprogram
		loyaltyprogramObj.save(function() {
			// Request Loyaltyprograms
			request(app).get('/loyaltyprograms')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Loyaltyprogram if not signed in', function(done) {
		// Create new Loyaltyprogram model instance
		var loyaltyprogramObj = new Loyaltyprogram(loyaltyprogram);

		// Save the Loyaltyprogram
		loyaltyprogramObj.save(function() {
			request(app).get('/loyaltyprograms/' + loyaltyprogramObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', loyaltyprogram.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Loyaltyprogram instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Loyaltyprogram
				agent.post('/loyaltyprograms')
					.send(loyaltyprogram)
					.expect(200)
					.end(function(loyaltyprogramSaveErr, loyaltyprogramSaveRes) {
						// Handle Loyaltyprogram save error
						if (loyaltyprogramSaveErr) done(loyaltyprogramSaveErr);

						// Delete existing Loyaltyprogram
						agent.delete('/loyaltyprograms/' + loyaltyprogramSaveRes.body._id)
							.send(loyaltyprogram)
							.expect(200)
							.end(function(loyaltyprogramDeleteErr, loyaltyprogramDeleteRes) {
								// Handle Loyaltyprogram error error
								if (loyaltyprogramDeleteErr) done(loyaltyprogramDeleteErr);

								// Set assertions
								(loyaltyprogramDeleteRes.body._id).should.equal(loyaltyprogramSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Loyaltyprogram instance if not signed in', function(done) {
		// Set Loyaltyprogram user 
		loyaltyprogram.user = user;

		// Create new Loyaltyprogram model instance
		var loyaltyprogramObj = new Loyaltyprogram(loyaltyprogram);

		// Save the Loyaltyprogram
		loyaltyprogramObj.save(function() {
			// Try deleting Loyaltyprogram
			request(app).delete('/loyaltyprograms/' + loyaltyprogramObj._id)
			.expect(401)
			.end(function(loyaltyprogramDeleteErr, loyaltyprogramDeleteRes) {
				// Set message assertion
				(loyaltyprogramDeleteRes.body.message).should.match('User is not logged in');

				// Handle Loyaltyprogram error error
				done(loyaltyprogramDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Loyaltyprogram.remove().exec();
		done();
	});
});