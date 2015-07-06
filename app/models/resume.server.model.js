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
	biodatum: {
		type: Schema.ObjectId,
		ref: 'Biodatum'	
	},
	owner: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	spectators: [{
		type: Schema.ObjectId,
		ref: 'User'	
	}],
	sections:[{
		type: Schema.ObjectId,
		ref: 'Section'	
	}]
});

mongoose.model('Resume', ResumeSchema);