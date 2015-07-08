'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Loyaltyprogram = mongoose.model('Loyaltyprogram'),
	_ = require('lodash');

/**
 * Create a Loyaltyprogram
 */
exports.create = function(req, res) {
	var loyaltyprogram = new Loyaltyprogram(req.body);
	loyaltyprogram.user = req.user;

	loyaltyprogram.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(loyaltyprogram);
		}
	});
};

/**
 * Show the current Loyaltyprogram
 */
exports.read = function(req, res) {
	res.jsonp(req.loyaltyprogram);
};

/**
 * Update a Loyaltyprogram
 */
exports.update = function(req, res) {
	var loyaltyprogram = req.loyaltyprogram ;

	loyaltyprogram = _.extend(loyaltyprogram , req.body);

	loyaltyprogram.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(loyaltyprogram);
		}
	});
};

/**
 * Delete an Loyaltyprogram
 */
exports.delete = function(req, res) {
	var loyaltyprogram = req.loyaltyprogram ;

	loyaltyprogram.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(loyaltyprogram);
		}
	});
};

/**
 * List of Loyaltyprograms
 */
exports.list = function(req, res) { 
	Loyaltyprogram.find().sort('-created').populate('user', 'displayName').exec(function(err, loyaltyprograms) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(loyaltyprograms);
		}
	});
};

/**
 * Loyaltyprogram middleware
 */
exports.loyaltyprogramByID = function(req, res, next, id) { 
	Loyaltyprogram.findById(id).populate('user', 'displayName').exec(function(err, loyaltyprogram) {
		if (err) return next(err);
		if (! loyaltyprogram) return next(new Error('Failed to load Loyaltyprogram ' + id));
		req.loyaltyprogram = loyaltyprogram ;
		next();
	});
};

/**
 * Loyaltyprogram authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.loyaltyprogram.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
