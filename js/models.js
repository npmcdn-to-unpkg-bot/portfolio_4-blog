myApp.factory('userModel', ['$http', '$location', 'ngNotify', '$cookies', '$timeout', function ($http, $location, ngNotify, $cookies, $timeout) {
	var userModel = new Object();

	userModel.doLogin = function (scope, loginForm) {
		if (loginForm.$valid == false) {
			return ngNotify.set('Некорректные данные, повторите еще раз', {
				type: 'error',
				position: 'top'
			});
		}

		$http({
			method: 'POST',
			url: '/auth',
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			data: scope
		}).success(function (response, status, headers) {
			if (scope.remember == true) {
				var now = new Date();
				now.setDate(now.getDate() + 365);
				$cookies.put('auth', JSON.stringify(response), {
					'expires': now
				});
			} else
			/**
			 * TODO: Add catch erros (if not supported local storage)
			 */
				if (typeof (Storage) !== "undefined")
					window.sessionStorage.setItem('auth', true);

			ngNotify.set('Вход успешно выполнен', {
				type: 'success',
				position: 'top'
			});

			return $timeout(function () {
				window.location.href = '/';
			}, 750);
		}).error(function (response, status, headers) {
			return ngNotify.set(response, {
				type: 'error',
				position: 'top'
			});
		});
	};

	userModel.getAuthStatus = function (is) {
		userModel.check = ($cookies.get('auth') == undefined ? false : true);
		if (typeof (Storage) !== undefined && window.sessionStorage.getItem('auth')) {
			userModel.check = true
		} else if(is) {
			$http({
				url: '/api/checkAuth',
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				method: 'GET'
			}).success(function(response){
				if(userModel.check) return true;
				var now = new Date();
				now.setDate(now.getDate() + 365);
				$cookies.put('auth', JSON.stringify(response), {
					'expires': now
				});
				userModel.check = true
			}).error(function(){
				if(userModel.check)
					$cookies.remove('auth');
			});
		} else userModel.check = false;
	};
	
	userModel.check = false
	
	userModel.getUserObject = function () {
		var userObj = angular.fromJson($cookies.get('auth'));
		return userObj;
	};

	userModel.logout = function () {
		if (typeof (Storage) !== "undefined")
			window.sessionStorage.removeItem('auth');

		$cookies.remove('auth');
		$http.post('/logout');
		window.location.href = '/admin/auth'
	};

	return userModel;
}]);

myApp.factory('search', ['$http', 'ngNotify', function ($http, ngNotify) {
	return {
		result: {
			'item': {
				 'id': 'value',
				 'title': 'value',
				 'date': 'value'
			},
			'item2': {
				 'id': 'value',
				 'title': 'value',
				 'date': 'value'
			}
		},
		getNews: function(){
			this.result = undefined;
			var str = this.form.search.$modelValue;
			if(str != undefined && str.length >= 3) {
				$http({
					headers: {
						'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
					},
					method: 'GET',
					url: '/api/search?str='+str,
				}).success(function(response){
					this.result = false
				}.bind(this)).error(function(){
					this.result = false;
				}.bind(this));
			}
		}
	}
}]);

myApp.factory('newsModel', ['$http', 'ngNotify', 'Upload', '$timeout', '$location', function ($http, ngNotify, Upload, $timeout, $location) {
	var newsList = function () {
		this.items = [];
		this.busy = false;
		this.page = 1;
		this.data = new Object();
	};

	newsList.prototype.getList = function () {
		if (this.busy) return;
		this.busy = true;

		$http({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			method: 'GET',
			url: '/api/news/list?page=' + this.page
		}).success(function (response, status, headers) {
			if(response.total == 0)
				return this.busy = true;
			var list = JSON.parse(JSON.stringify(response.data))
			for (var i in list) {
				for(var g in list[i].paths)
					if(list[i].paths[g].type == 'main')
						list[i].paths[0].path = list[i].paths[g].path;
				this.items.push(list[i]);
			}
				
			if (response.last_page > this.page) {
				this.page++;
				this.busy = false;
			} else {
				this.busy = true;
			}

		}.bind(this)).error(function (response, status, headers) {
			return ngNotify.set('Сервер не отвечает: ' + status, {
				type: 'error',
				position: 'top'
			});
		});
	}

	newsList.prototype.add = function (news, data) {
		return {
			push: function () {
				for (var i in news)
					data.images.all.push(news[i]);
				return data;
			},

			upload: function () {	
				var list = new Object();
				for(var i in data.images)
					if(Array.isArray(data.images[i]))
						for(var g in data.images[i])
							list[g] = data.images[i][g]
					else list[i] = data.images[i];
				
				var file = Upload.upload({
					headers: {
						'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
					},
					url: '/api/news/add',
					data: {
						file: list,
						description: news.description.$modelValue,
						title: news.title.$modelValue,
						tags: news.tags.$modelValue
					}
				});

				file.then(function (response) {
					$timeout(function () {
						$location.path('/');
					}, 700)
					$timeout(function () {
						return ngNotify.set('Новость опубликована', {
							type: 'success',
							position: 'top'
						});
					});
				}, function (response) {
					return ngNotify.set(response.data, {
						type: 'error',
						position: 'top'
					});
				});
			},

			edit: function(){
				var deleteImg = new Object(),
					  list = new Object();
				for(var i in data.images.all)
					if(typeof data.images.all[i] != 'string')
						list[i] = data.images.all[i];
				list.left = data.images.left;
				list.right = data.images.right;
				
				if(data.deleteImg.remove.length != 0)
					for(var i in data.deleteImg.remove)
						deleteImg[data.deleteImg.remove[i]] = data.paths[data.deleteImg.remove[i]];

				var file = Upload.upload({
					headers: {
						'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
					},
					url: '/api/news/edit/' + data.id,
					data: {
						file: list,
						deleteImg: deleteImg,
						description: news.description.$modelValue,
						title: news.title.$modelValue,
						id: data.id
					}
				});

				file.then(function (response) {
					$timeout(function () {
						$location.path('/');
					}, 700)
					$timeout(function () {
						return ngNotify.set('Новость изменена', {
							type: 'success',
							position: 'top'
						});
					});
				}, function (response) {
					return ngNotify.set(response.data, {
						type: 'error',
						position: 'top'
					});
				});
			},
			
			remove: function (i) {
				if(data.deleteImg != undefined)
					data.deleteImg.remove.push(data.deleteImg.all[i]);
				return data.images.all.splice(i, 1);
			}
		}
	}

	newsList.prototype.edit = function (id) {
		$http({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			method: 'GET',
			url: '/api/news/getById/' + id
		}).success(function (response, status, headers) {
			this.data = response.data[id];
			this.data.images = {
				all: new Array()
			}
			this.data.deleteImg = {
				all: new Array(),
				remove: new Array()
			}
			
			
			for (var i in this.data.paths) {
				this.data.images.all.push(response.data[id].paths[i]);
				this.data.deleteImg.all.push(i);
			}
			
			this.oldData = {
				description: this.data.description,
				title: this.data.title,
				images: this.data.images.all.length
			}
		}.bind(this)).error(function (response, status, headers) {
			return ngNotify.set(status, {
				type: 'error',
				position: 'top'
			});
		});
	}

	newsList.prototype.delete = function(obj) {
		if(confirm('Удалить новость?') == true)
			$http({
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				method: 'POST',
				url: '/api/news/delete',
				data: {
					id: obj.id,
					paths: obj.paths
				}
			}).success(function (response, status, headers) {
				$timeout(function () {
					$location.path('/');
				}, 700)
				$timeout(function () {
					return ngNotify.set('Новость удалена', {
						type: 'success',
						position: 'top'
					});
				});
			}).error(function (response, status, headers) {
				return ngNotify.set(status, {
					type: 'error',
					position: 'top'
				});
			});
	}

	return newsList;
}]);


myApp.factory('newsDetailModel', ['$http', 'ngNotify', '$location',  '$timeout', function ($http, ngNotify, $location, $timeout) {
	var detailList = new Object();

	detailList.getPage = function (id, success) {
		$http({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			method: 'GET',
			url: '/api/news/getById/' + id
		}).success(function (data, status, headers) {
			detailList.params = JSON.parse(JSON.stringify(data.data))[id];
			success(detailList.params)
		}).error(function (data, status) {
			$timeout(function(){
				$location.path('/');
			});
		});
		return detailList;
	}

	return detailList;
}]);


myApp.factory('feedBeck', ['$http', 'ngNotify', function ($http, ngNotify) {
	return {
		submit: function () {
				$http({
					headers: {
						'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
					},
					method: 'POST',
					data: this.data,
					url: '/api/feedback'
				});
				return this.delete();
		}, 
		delete: function(){
			this.data = null;
			return false;
		},
	}
}]);

myApp.factory('profile', ['$http', 'ngNotify', 'Upload', function ($http, ngNotify, Upload) {
	var profile = function(){
		this.getData = {
			submit: new String()
		}
		this.form = new Object();
	}
	
	profile.prototype.update = function() {
		var query = {
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
			},
			method: 'POST',
			data: new Object()
		}, notify = new String();
		switch(this.getData.submit) {
			case 'description':
				query.url = '/admin/profile/changeDescription';
				query.data.description = this.form.description.$viewValue;
				notify = "Текст изменен";
				break;
			case 'ava':
				query.url = '/admin/profile/changeAvatar';
				query.data.file = this.getData.ava
				var file = Upload.upload(query);
				file.then(function (response) {
					return ngNotify.set('Аватарка изменена', {
						type: 'success',
						position: 'top'
					});
				}, function (response) {
					return ngNotify.set(response.data, {
						type: 'error',
						position: 'top'
					});
				});
				return true;
			case 'password':
				query.url = '/admin/profile/changePassword';
				query.data = {
					old_password: this.form.old_password.$viewValue,
					password: this.form.password.$viewValue,
					password_confirmed: this.form.password_confirmed.$viewValue
				}
				notify = "Пароль изменен"
				break;
		}
		if(query.url)
			$http(query).success(function(){
				return ngNotify.set(notify, {
					type: 'success',
					position: 'top'
				});
			}).error(function(response){
				return ngNotify.set(response.data, {
					type: 'error',
					position: 'top'
				});
			});
	}
	
	profile.prototype.get = function(){
		var $this = this;
		return {
			description: function(){
				$http({
					headers: {
						'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
					},
					url: '/api/information/description',
					method: 'GET'
				}).success(function(response){
					this.getData.description = response;
				}.bind($this)).error(function(response){
					return ngNotify.set(response.data, {
						type: 'error',
						position: 'top'
					});
				});
			},
			ava: function(){
				$http({
					headers: {
						'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
					},
					url: '/api/information/avatar',
					method: 'GET'
				}).success(function(response){
						this.getData.ava = response;
				}.bind($this)).error(function(response){
					return ngNotify.set(response.data, {
						type: 'error',
						position: 'top'
					});
				});
			}
		}
	}
													
	
	return profile;
}]);