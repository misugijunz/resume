'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Biodatum = mongoose.model('Biodatum'),
	_ = require('lodash');

/**
 * Create a Biodatum
 */
exports.create = function(req, res) {
	var biodatum = new Biodatum(req.body);
	biodatum.user = req.user;

	biodatum.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(biodatum);
		}
	});
};

/**
 * Show the current Biodatum
 */
exports.read = function(req, res) {
	res.jsonp(req.biodatum);
};

/**
 * Update a Biodatum
 */
exports.update = function(req, res) {
	var biodatum = req.biodatum ;

	biodatum = _.extend(biodatum , req.body);
	//biodatum.dateOfBirth = new Date().parse(biodatum.dateOfBirth);

	biodatum.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(biodatum);
		}
	});
};

/**
 * Delete an Biodatum
 */
exports.delete = function(req, res) {
	var biodatum = req.biodatum ;

	biodatum.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(biodatum);
		}
	});
};

/**
 * List of Biodata
 */
exports.list = function(req, res) { 
	Biodatum.find().sort('-created').populate('user', 'displayName').exec(function(err, biodata) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(biodata);
		}
	});
};

/**
 * Biodatum middleware
 */
exports.biodatumByID = function(req, res, next, id) { 
	Biodatum.findById(id).populate('user', 'displayName').exec(function(err, biodatum) {
		if (err) return next(err);
		if (! biodatum) return next(new Error('Failed to load Biodatum ' + id));
		req.biodatum = biodatum ;
		next();
	});
};

/**
 * Biodatum authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.biodatum.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
