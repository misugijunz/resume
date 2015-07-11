'use strict';

var userAuthorize = require('./users/users.authorization.server.controller');

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	
	res.render('index', {
		user: req.user || null,
		request: req
	});
};