'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', '$sce', 'Authentication', 'Articles', 
	function($scope, $stateParams, $location, $sce, Authentication, Articles) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content,
				startDate: this.startDate,
				endDate: this.endDate
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
				$scope.startDate = Date.now;
				$scope.endDate = Date.now;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			var article = Articles.get({
				articleId: $stateParams.articleId
			});
			console.log(article.length);
			article.content = $scope.htmlDecode(article.content);
			$scope.article = article;
			
		};
		
		$scope.htmlDecode = function(){
			var _article = this;
			var e = document.createElement('div');
			e.innerHTML = this.content;
			var temp = e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
			console.log(temp);
			this.content = temp;	
		};
		
		$scope.tinymceOptions = {
	        resize: false,
	        //width: 400,  // I *think* its a number and not '400' string
	        height: 300,
	        theme: "modern",
		    plugins: [
		        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
		        "wordcount visualblocks visualchars code fullscreen",
		        "emoticons template paste textcolor"
		    ],
	        toolbar: 'undo redo styleselect bold italic bullist forecolor backcolor',
			raw: true,
			trusted: true,
	        menu : { // this is the complete default configuration
	            edit   : {title : 'Edit'  , items : 'undo redo | cut copy paste pastetext | selectall'},
	            insert : {title : 'Insert', items : 'bullist numlist outdent indent | link'},
	            format : {title : 'Format', items : 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
	        },
	
	        init_instance_callback: function(editor) {
	          var textContentTrigger = function() {
	            $scope.textContent = editor.getBody().textContent;
	            $scope.$apply();
	          };
	
	          editor.on('KeyUp', textContentTrigger);
	          editor.on('ExecCommand', textContentTrigger);
	          editor.on('SetContent', function(e) {
	            if(!e.initial)
	              textContentTrigger();
	          });
	        }
	    };
	}
]);