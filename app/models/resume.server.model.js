'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Resume Schema
 */
var ResumeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Resume name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	owner: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	spectators: [{
		type: Schema.ObjectId,
		ref: 'User'	
	}],
	contents: [{
		type: Schema.ObjectId,
		ref: 'Article'
	}]
});

mongoose.model('Resume', ResumeSchema);