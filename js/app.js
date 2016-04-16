var myApp = angular.module('myApp', ['ui.router', 'ngCookies', 'oc.lazyLoad', 'ngNotify', 'textAngular', 'ngFileUpload']);

myApp.constant("Modernizr", Modernizr);

myApp.config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

$urlRouterProvider.otherwise('/');

$stateProvider
	.state('home', {
		url: "/",
		views: {
			'content': {
				controller: 'newsController',
				templateUrl: 'templates/index.html',
			}
		},
		resolve: {
			loadOcModal: ['$ocLazyLoad', '$rootScope', function ($ocLazyLoad, $rootScope) {
				return $ocLazyLoad.load([
						'bower_components/masonry/dist/masonry.pkgd.min.js',
						'bower_components/imagesloaded/imagesloaded.pkgd.min.js',
						'bower_components/angular-masonry/angular-masonry.js',
						'bower_components/angular-infinite_scroll/infinite_scroll.min.js',
					]).then(function (e) {
						$rootScope.page.params.content.onload('index');
						$rootScope.page.title = 'Главная'
						$rootScope.page.admPanel = false;
						$rootScope.page.params.content.onload('index indexPage');
				});
			}]
		}
	}).state('admin/auth', {
		url: "/admin/auth",
		views: {
			"login": {
				templateUrl: "templates/admin/login.html",
				controller: 'userController'
			}
		},
		resolve: {
			loadOcModal: ['$rootScope', '$ocLazyLoad', function ($rootScope, $ocLazyLoad) {
				$rootScope.page.params.IsAuth(true, '/');
				return $ocLazyLoad.load([
					'css/success_or_error.css',
					'css/login.css'
				]).then(function () {
					$rootScope.page.params.content.onload('login');
				})
			}]
		}
	}).state('admin/news/add', {
		url: "/admin/news/add",
		views: {
			"content": {
				templateUrl: "templates/news/admin/add.html",
				controller: 'newsController'
			}
		},
		resolve: {
			loadOcModal: ['$rootScope', '$ocLazyLoad', function ($rootScope, $ocLazyLoad) {
				$rootScope.page.params.IsAuth(false, '/');
				return $ocLazyLoad.load([
					'css/success_or_error.css',
					'css/edit.css'
				]).then(function () {
					$rootScope.page.params.content.onload('newsAdd index Editor');
					$rootScope.page.title = 'Добавить новость';
				})
			}]
		},
		authenticated: true,
	}).state('admin/news/edit/:id', {
		url: "/admin/news/edit/:id",
		views: {
			"content": {
				templateUrl: "templates/news/admin/edit.html",
				controller: 'newsController',
			}
		},
		resolve: {
			loadOcModal: ['$rootScope', '$stateParams', '$ocLazyLoad', function ($rootScope, $stateParams, $ocLazyLoad) {
				$rootScope.page.params.IsAuth(false, '/');
				return $ocLazyLoad.load([
						'css/success_or_error.css',
						'css/edit.css'
				]).then(function () {
						$rootScope.page.params.content.onload('newsEdit newsAdd index Editor');
						$rootScope.id = $stateParams.id; // page
						$rootScope.page.admPanel = "/admin/news/edit/" + $stateParams.id;
						$rootScope.page.id = $stateParams.id;
						$rootScope.page.title = 'Изменить новость';
				});
			}]
		},
		authenticated: true,
	}).state('news/detail/:id', {
		url: "/news/detail/:id",
		views: {
			"content": {
				templateUrl: "/templates/news/detail.html",
				//	controller: 'newsController',
			}
		},
		resolve: {
			loadOcModal: ['$stateParams', 'newsDetailModel', '$rootScope', '$ocLazyLoad', function ($stateParams, newsDetailModel, $rootScope, $ocLazyLoad) {
				return $ocLazyLoad.load([
					'http://vk.com/js/api/openapi.js?121'
				]).then(function () {
					$rootScope.onload.time('blocks');
					$rootScope.page.params.content.onload('newsDetail newsAdd index');
					$rootScope.page.admPanel = "/admin/news/edit/" + $stateParams.id;
					$rootScope.newsDetailList = newsDetailModel.getPage($stateParams.id, $rootScope.page.params.title);
				});
			}]

		}
	}).state('admin/profile', {
		url: "/admin/profile",
		views: {
			"content": {
				templateUrl: "/templates/admin/profile.html",
				controller: 'settingsController',
				resolve: {
					loadOcModal: ['$ocLazyLoad', '$rootScope', function ($ocLazyLoad, $rootScope) {
							$rootScope.page.params.IsAuth(false, '/'); 
							return $ocLazyLoad.load([
								'css/edit.css',
								'css/success_or_error.css'
							]).then(function () {
								$rootScope.page.params.content.onload('settings index Editor');
								$rootScope.page.title = 'Настройки профиля';
							});
						}
					]
				}
			}
		},
	}).state('about', {
		url: "/about",
		views: {
			"content": {
				templateUrl: "/templates/about/about.html",
				controller: 'aboutController',
				resolve: {
					loadOcModal: ['$ocLazyLoad', '$rootScope', function ($ocLazyLoad, $rootScope){
						return $ocLazyLoad.load([
							'css/success_or_error.css'
						]).then(function () {
							$rootScope.page.params.content.onload('about newsDetail index newsAdd');
							$rootScope.page.title = 'Обо мне';
						});
						}
					]
				}
			}
		},
	}).state('admin', {
		url: "/admin",
		views: {
			"content": {
				templateUrl: "/templates/news/admin/admin.html",
				controller: 'adminController',
				resolve: {
					data: ['$stateParams', '$rootScope', function ($stateParams, $rootScope) {
							$rootScope.page.params.IsAuth(false, '/'); 
							$rootScope.page.params.content.onload('admin index');
							$rootScope.page.title = 'Администрирование';
					}]
				}
			}
		}
	})
});

myApp.config(["$locationProvider", function ($locationProvider) {
	$locationProvider.html5Mode(true);
}]);