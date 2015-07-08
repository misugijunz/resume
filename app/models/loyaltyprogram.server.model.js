'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Loyaltyprogram Schema
 */
var LoyaltyprogramSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Loyaltyprogram name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Loyaltyprogram', LoyaltyprogramSchema);