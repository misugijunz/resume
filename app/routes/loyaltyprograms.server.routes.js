'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var loyaltyprograms = require('../../app/controllers/loyaltyprograms.server.controller');

	// Loyaltyprograms Routes
	app.route('/loyaltyprograms')
		.get(loyaltyprograms.list)
		.post(users.requiresLogin, loyaltyprograms.create);

	app.route('/loyaltyprograms/:loyaltyprogramId')
		.get(loyaltyprograms.read)
		.put(users.requiresLogin, loyaltyprograms.hasAuthorization, loyaltyprograms.update)
		.delete(users.requiresLogin, loyaltyprograms.hasAuthorization, loyaltyprograms.delete);

	// Finish by binding the Loyaltyprogram middleware
	app.param('loyaltyprogramId', loyaltyprograms.loyaltyprogramByID);
};
