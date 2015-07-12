'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Section Schema
 */
var SectionSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Section name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	articles: [{
		type: Schema.ObjectId,
		ref: 'Article'
	}],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}		
});

mongoose.model('Section', SectionSchema);