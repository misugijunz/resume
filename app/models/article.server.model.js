'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	startDate: {
		type: Date,
		required: 'There is always a start for something'
	},
	endDate: {
		type: Date	
	},
	isLatestOne: {
		type: Boolean	
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	contentType: {
		type:  String,
		enum: ['default','objective', 'quickSummary', 'experiences', 'skills', 'academicBackground', 'hobbies', 'contactDetails'],
		default: 'default'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Article', ArticleSchema);