'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var biodata = require('../../app/controllers/biodata.server.controller');

	// Biodata Routes
	app.route('/biodata')
		.get(biodata.list)
		.post(users.requiresLogin, biodata.create);

	app.route('/biodata/:biodatumId')
		.get(biodata.read)
		.put(users.requiresLogin, biodata.hasAuthorization, biodata.update)
		.delete(users.requiresLogin, biodata.hasAuthorization, biodata.delete);

	// Finish by binding the Biodatum middleware
	app.param('biodatumId', biodata.biodatumByID);
};
