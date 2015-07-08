'use strict';

// Configuring the Articles module
angular.module('biodata').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Biodata', 'biodata', 'dropdown', '/biodata(/create)?');
		Menus.addSubMenuItem('topbar', 'biodata', 'List Biodata', 'biodata');
		Menus.addSubMenuItem('topbar', 'biodata', 'New Biodatum', 'biodata/create');
	}
]);