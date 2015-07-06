'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Biodatum Schema
 */
var BiodatumSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Biodatum name',
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

mongoose.model('Biodatum', BiodatumSchema);