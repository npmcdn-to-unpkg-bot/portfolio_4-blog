myApp.controller('mainController', ['profile', '$window', '$scope', '$rootScope', '$timeout', '$location', 'userModel', '$sce', 'search', function (profile, $window, $scope, $rootScope, $timeout, $location, userModel, $sce, search) {
	userModel.getAuthStatus(true);

	angular.extend($rootScope, {	
		onload: {
			display: new Object(),
			onload: true,
			time: function (el, time) {
				this.onload = true;
				this.display[el] = false;
				var _this = this;
				$timeout(function () {
					_this.display[el] = true;
					_this.onload = false;
				}, (time ? time : 1300));
			},
			timePage: function (url) {
				$timeout(function () {
					$location.path(url);
				}, 700)
			}
		},
		page: {
			visual: new String(),
			id: false,
			title: undefined,
			admPanel: false,
		  about: new profile(),
			back: {
				pageId: 0,
				status: true,
				func: function(){
					if(this.pageId == 0) return false;
					this.status = true;
					this.pageId--;
					$window.history.back();
				}
			},
			params: {
				title: function (data) {
					$rootScope.page.title = data.title;
				},
				auth: function () {
					return userModel.check
				},
				IsAuth: function (is, url, time) {
					if (is == this.auth()) {
						$timeout(function () {
							$location.path(url);
						}, (time ? time : 0));
					}
				},
				content: {
					close: true,
					onload: function (visual, newFunc) {
						$rootScope.$$listeners.$viewContentLoaded = [];
						$rootScope.$$listeners.$stateChangeSuccess = [];
						$rootScope.$on('$stateChangeSuccess', function (e) {
							this.close = true;
							if(!$rootScope.page.back.status)
								$rootScope.page.back.pageId++;
						});
						$rootScope.$on('$viewContentLoaded', function () {
							this.onload = false;
							$scope.menu = false;
							$rootScope.page.back.status = false;
							if (typeof newFunc == 'function') newFunc();
							if (visual) $rootScope.page.visual = visual;
						});
					}
				}
			}
		},
		search: search,
		feedBeck_display: {
			close: undefined,
			include: 'templates/portions/feedbeck.html'
		}
	});
	$rootScope.page.params.IsAuth();
	$rootScope.page.about.get().ava();
	console.log($rootScope.page)
}]);

myApp.controller('userController', ['$scope', '$rootScope', 'userModel', function ($scope, $rootScope, userModel) {
	$rootScope.onload.time('login', 600);

	angular.extend($scope, {
		doLogin: function (loginForm) {
			var data = {
				email: $scope.login.email,
				password: $scope.login.password,
				remember: $scope.login.remember
			};

			userModel.doLogin(data, loginForm);
		}
	});
}]);


myApp.controller('navAdminController', ['$scope', '$location', 'userModel', function ($scope, $location, userModel) {
	angular.extend($scope, {
		logout: userModel.logout
	});
}]);

myApp.controller('newsController', ['$scope', '$rootScope', 'newsModel', function ($scope, $rootScope, newsModel) {
	$rootScope.onload.time('blocks');
	$scope.newsList = new newsModel();
}]);

myApp.controller('feedBeckController', ['$rootScope', 'feedBeck', function ($rootScope, feedBeck) {
	$rootScope.feedBeck = feedBeck
}]);

myApp.controller('settingsController', ['$rootScope', '$scope', function ($rootScope, $scope) {
	$rootScope.onload.time('blocks');
	$rootScope.page.about.get().ava();
	$rootScope.page.about.get().description();
}]);

myApp.controller('aboutController', ['$rootScope', function ($rootScope) {
	$rootScope.onload.time('blocks');
	$rootScope.page.about.get().description();
}]);

myApp.controller('adminController', ['$rootScope', function ($rootScope) {
	$rootScope.onload.time('blocks');
}]);
