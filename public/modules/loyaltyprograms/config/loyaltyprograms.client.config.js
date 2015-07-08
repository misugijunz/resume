'use strict';

// Configuring the Articles module
angular.module('loyaltyprograms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Loyaltyprograms', 'loyaltyprograms', 'dropdown', '/loyaltyprograms(/create)?');
		Menus.addSubMenuItem('topbar', 'loyaltyprograms', 'List Loyaltyprograms', 'loyaltyprograms');
		Menus.addSubMenuItem('topbar', 'loyaltyprograms', 'New Loyaltyprogram', 'loyaltyprograms/create');
	}
]);