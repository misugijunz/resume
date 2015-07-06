'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Biodatum = mongoose.model('Biodatum'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, biodatum;

/**
 * Biodatum routes tests
 */
describe('Biodatum CRUD tests', function() {
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

		// Save a user to the test db and create new Biodatum
		user.save(function() {
			biodatum = {
				name: 'Biodatum Name'
			};

			done();
		});
	});

	it('should be able to save Biodatum instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Biodatum
				agent.post('/biodata')
					.send(biodatum)
					.expect(200)
					.end(function(biodatumSaveErr, biodatumSaveRes) {
						// Handle Biodatum save error
						if (biodatumSaveErr) done(biodatumSaveErr);

						// Get a list of Biodata
						agent.get('/biodata')
							.end(function(biodataGetErr, biodataGetRes) {
								// Handle Biodatum save error
								if (biodataGetErr) done(biodataGetErr);

								// Get Biodata list
								var biodata = biodataGetRes.body;

								// Set assertions
								(biodata[0].user._id).should.equal(userId);
								(biodata[0].name).should.match('Biodatum Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Biodatum instance if not logged in', function(done) {
		agent.post('/biodata')
			.send(biodatum)
			.expect(401)
			.end(function(biodatumSaveErr, biodatumSaveRes) {
				// Call the assertion callback
				done(biodatumSaveErr);
			});
	});

	it('should not be able to save Biodatum instance if no name is provided', function(done) {
		// Invalidate name field
		biodatum.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Biodatum
				agent.post('/biodata')
					.send(biodatum)
					.expect(400)
					.end(function(biodatumSaveErr, biodatumSaveRes) {
						// Set message assertion
						(biodatumSaveRes.body.message).should.match('Please fill Biodatum name');
						
						// Handle Biodatum save error
						done(biodatumSaveErr);
					});
			});
	});

	it('should be able to update Biodatum instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Biodatum
				agent.post('/biodata')
					.send(biodatum)
					.expect(200)
					.end(function(biodatumSaveErr, biodatumSaveRes) {
						// Handle Biodatum save error
						if (biodatumSaveErr) done(biodatumSaveErr);

						// Update Biodatum name
						biodatum.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Biodatum
						agent.put('/biodata/' + biodatumSaveRes.body._id)
							.send(biodatum)
							.expect(200)
							.end(function(biodatumUpdateErr, biodatumUpdateRes) {
								// Handle Biodatum update error
								if (biodatumUpdateErr) done(biodatumUpdateErr);

								// Set assertions
								(biodatumUpdateRes.body._id).should.equal(biodatumSaveRes.body._id);
								(biodatumUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Biodata if not signed in', function(done) {
		// Create new Biodatum model instance
		var biodatumObj = new Biodatum(biodatum);

		// Save the Biodatum
		biodatumObj.save(function() {
			// Request Biodata
			request(app).get('/biodata')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Biodatum if not signed in', function(done) {
		// Create new Biodatum model instance
		var biodatumObj = new Biodatum(biodatum);

		// Save the Biodatum
		biodatumObj.save(function() {
			request(app).get('/biodata/' + biodatumObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', biodatum.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Biodatum instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Biodatum
				agent.post('/biodata')
					.send(biodatum)
					.expect(200)
					.end(function(biodatumSaveErr, biodatumSaveRes) {
						// Handle Biodatum save error
						if (biodatumSaveErr) done(biodatumSaveErr);

						// Delete existing Biodatum
						agent.delete('/biodata/' + biodatumSaveRes.body._id)
							.send(biodatum)
							.expect(200)
							.end(function(biodatumDeleteErr, biodatumDeleteRes) {
								// Handle Biodatum error error
								if (biodatumDeleteErr) done(biodatumDeleteErr);

								// Set assertions
								(biodatumDeleteRes.body._id).should.equal(biodatumSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Biodatum instance if not signed in', function(done) {
		// Set Biodatum user 
		biodatum.user = user;

		// Create new Biodatum model instance
		var biodatumObj = new Biodatum(biodatum);

		// Save the Biodatum
		biodatumObj.save(function() {
			// Try deleting Biodatum
			request(app).delete('/biodata/' + biodatumObj._id)
			.expect(401)
			.end(function(biodatumDeleteErr, biodatumDeleteRes) {
				// Set message assertion
				(biodatumDeleteRes.body.message).should.match('User is not logged in');

				// Handle Biodatum error error
				done(biodatumDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Biodatum.remove().exec();
		done();
	});
});