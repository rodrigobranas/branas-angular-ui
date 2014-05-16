var toolkit = angular.module("toolkit", ['ngAnimate']);
toolkit.directive("accordion", function () {
	return {
		template: "<div ng-transclude></div>",
		restrict: "E",
		scope: {
			closeall: "@"
		},
		transclude: true,
		replace: true,
		controller: function ($scope, $element, $attrs) {
			var itensScope = [];

			var addItemScope = function (scope) {
				itensScope.push(scope);
			};

			var closeItens = function () {
				if ($scope.closeall == "false") return;
				angular.forEach(itensScope, function (scope) {
					scope.showItem = false;
				});
			}
			return {
				addItemScope: addItemScope,
				closeItens: closeItens
			};
		}
	};
});
toolkit.directive("accordionItem", function () {
	return {
		template: "<div><div class='item' ng-class='{itemClose: !showItem}'>{{title}}</div><div class='itemInformation' ng-show='showItem' ng-transclude></div></div>",
		restrict: "E",
		transclude: true,
		replace: true,
		scope: {
			title: "@"
		},
		require: "^accordion",
		link: function (scope, element, attrs, ctrl, transcludeFn) {
			ctrl.addItemScope(scope);
			element.bind("click", function () {
				ctrl.closeItens();
				scope.$apply(function () { 
					scope.showItem = !scope.showItem; 
				});
			});
		}
	};
});
toolkit.directive("modal", function () {
	return {
		template: "<div class='modal' ng-show='open'><div class='dialog' ng-transclude></div></div>",
		transclude: true,
		restrict: "E",
		scope: {
			open: "="
		}
	};
});
toolkit.directive("modalHeader", function () {
	return {
		template: "<div class='dialog-header' ng-transclude></div>",
		transclude: true,
		restrict: "E"
	};
});
toolkit.directive("modalBody", function () {
	return {
		template: "<div class='dialog-body' ng-transclude></div>",
		transclude: true,
		restrict: "E"
	};
});
toolkit.directive("modalFooter", function () {
	return {
		template: "<div class='dialog-footer'><div class='dialog-footer-content' ng-transclude></div></div>",
		transclude: true,
		restrict: "E"
	};
});
toolkit.directive("tabs", function () {
	return {
		template: "<div class='tabTitle' ng-class='{activeTab: tab.showTab}' ng-repeat='tab in tabs' ng-click='showTab(tab)'>{{tab.title}}</div><div class='tabs' ng-transclude></div>",
		transclude: true,
		restrict: "E",
		controller: function ($scope, $element, $attrs) {
			$scope.tabs = [];
			var addTab = function (tab) {
				$scope.tabs.push(tab);
			};

			var closeTabs = function () {
				angular.forEach($scope.tabs, function (scope) {
					scope.showTab = false;
				});
			}

			$scope.showTab = function (tab) {
				closeTabs();
				tab.showTab = true;
			}

			return {
				addTab: addTab
			};
		}
	};
});
toolkit.directive("tab", function () {
	return {
		template: "<div class='tab' ng-show='showTab' ng-transclude></div>",
		transclude: true,
		restrict: "E",
		scope: {
			title: "@",
			showTab: "@active"
		},
		require: "^tabs",
		link: function (scope, element, attrs, ctrl, transcludeFn) {
			ctrl.addTab(scope);
		}
	}
});
toolkit.directive("alert", function () {
	return {
		template: "<div class='alert' ng-transclude></div>",
		transclude: true,
		restrict: "E"
	};
});
toolkit.directive("carousel", function ($timeout) {
	return {
		template: "<div class='carousel' ng-transclude></div>",
		transclude: true,
		restrict: "E",
		controller: function ($scope) {
			$scope.itens = [];

			var addItem = function (item) {
				$scope.itens.push(item);
			};

			return {
				addItem: addItem
			};
		},
		link: function (scope) {
			var index = 0;
			scope.itens[index++].activeItem = true;
			var pulse = function () {
				$timeout(function () {
					if (index !== 0) {
						scope.itens[index - 1].activeItem = false;
					}
					if (index === scope.itens.length) {
						index = 0;
					}
					scope.itens[index++].activeItem = true;
					pulse();
				}, 3000);
			};

			pulse();
		}
	};
});
toolkit.directive("carouselItem", function () {
	return {
		template: "<div ng-show='activeItem' class='carousel-item' ng-transclude></div>",
		transclude: true,
		replace: true,
		restrict: "E",
		scope: {
		},
		require: "^carousel",
		link: function (scope, element, attrs, ctrl, transcludeFn) {
			ctrl.addItem(scope);
		}
	};
});