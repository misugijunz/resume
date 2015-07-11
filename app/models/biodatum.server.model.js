'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
require('mongoose-type-email');

/**
 * Biodatum Schema
 */
var BiodatumSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please enter your name.',
		trim: true
	},
	dateOfBirth: {
		type: Date,
		required: 'Please enter your date of birth.'	
	},
	address: {
		type: String,
		default: '',
		required: 'Please enter your address.'
	},
	 email: {
        work: {type: mongoose.SchemaTypes.Email},
        home: {type: mongoose.SchemaTypes.Email, required: true},
    },
	phones: {
		mobile: {type: String, required: true},
		home: {type: String},
	},
	created: {
		type: Date,
		default: Date.now
	},
	avatar: {
		href: {type: String},	
	},
	socials: {
		skype: {type: String},
		linkedin: {type: String},	
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Biodatum', BiodatumSchema);