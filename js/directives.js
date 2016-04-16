myApp.directive('checkActiveLink', ['$location', '$rootScope', function ($location, $rootScope) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			scope.$watch(function () {
				if ($location.url() == element.find('a').attr('ng-href') ||
					attrs.checkActiveLink != '' && $location.url().indexOf(attrs.checkActiveLink) != -1) {
					element.addClass('active');
				} else
					element.removeClass('active');
			});
		}
	}
}]);

myApp.directive('resize', ['$window', '$rootScope', function ($window, $rootScope) {
	return {
		link: function (scope, elem, attrs) {
			angular.element($window).bind("scroll", function () {
				scope.scrollLeft = $(window).scrollLeft();

				if (scope.scrollLeft > 50) {
					scope.menu = false;
					scope.scrollLeft = 'true';
				}

				scope.$apply();
			});
		}
	}
}]);


myApp.directive('slider', ['$window', function ($window) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			var arrImg = elem.find('.img');
			scope.sliderMatch = scope.$eval(attrs.slider);

			elem.find('.ANY').find('[left]').bind('click', function (e) {
				if (scope.sliderMatch == 0)
					scope.sliderMatch = arrImg.length - 1;
				else scope.sliderMatch--;
				scope.$apply();
			});

			elem.find('.ANY').find('[right]').bind('click', function (e) {
				if (scope.sliderMatch == arrImg.length - 1)
					scope.sliderMatch = 0;
				else scope.sliderMatch++;
				scope.$apply();
			});

			var result = function () {
				$(elem).css('height', arrImg.eq(scope.sliderMatch).css('height'));
				if(arrImg.eq(scope.sliderMatch).offset() != undefined)
					arrImg.eq(0).css('margin-top', -(arrImg.eq(scope.sliderMatch).offset().top - arrImg.eq(0).offset().top) + 'px');
			}

			scope.$watch('sliderMatch', result);

			scope.sliderUpdate = function () {
				arrImg = elem.find('.img');
				if (arrImg.length == 1)
					elem.find('.ANY').hide();
				else elem.find('.ANY').show();
				result();
			}

			angular.element($window).bind('resize', result);
		}
	}
}]);

myApp.directive('dinaPortfolio', ['$window', 'ngNotify', '$timeout', '$compile', '$rootScope', function ($window, ngNotify, $timeout, $compile, $rootScope) {
	return {
		template: function($element, $attrs) {
			if($('.full-img').length == 0)
				$('body').append("<div class='full-img window' style='display: none'><div class='close-after'></div><div class='relative'><div class='close'></div><img src></div></div>");
		},
		link: function ($scope, elem, $attrs) {
			var img = elem.find('.absolute .img').eq(0),
					width = {
						abs: function(){
							return parseInt(elem.find('.absolute .img').length * (elem.find('.absolute .img').width()+18.5) - elem.width())
						},
						active: function(module, number){
							if(module)
								return Math.abs(parseInt(img.css('margin-left'))- number)
							else return parseInt(img.css('margin-left'))- number
						}
					},
				update = function(el) {
					$(el).css({
						width: elem.width() / ($($window).width() > 1024 ? 4 : 2) -18.5
					});
					if(Modernizr.testAllProps('height', '1vw') == false) {
						elem.css({
							height: elem.width() * 0.40
						});
					}
				}

			elem.find('[left]').bind('click', function (e) {
				var abs = width.abs(),
						active = width.active(true, 300);	
				if (active >= abs) {
					if(active-300 != abs) 
						img.css('margin-left', -abs)					
					else img.css('margin-left', '7px')
				}
				else img.css('margin-left', width.active(false, 300));
			});

			elem.find('[right]').bind('click', function (e) {
				var abs = width.abs(),
						active = width.active(false, -300);
				if (active >= 7) {
					if(active-300 != 7)
						img.css('margin-left', '7px')
					else img.css('margin-left', -abs+'px')
				}
				else img.css('margin-left',  active);
			});		
			
			elem.find('.img').bind('click', function(){
				$('.full-img img').attr('src', $(this).attr('src')).
				off('load error').on('load', function(){
					var $this = $(this).parents('.full-img');
					$this.show(true);
					$timeout(function(){
						$this.css('opacity', 1);
					}, 100);
				}).on('error', function(){
					return ngNotify.set('Ошибка! Загрузить не удалось.', {
						type: 'error',
						position: 'top'
					});					
				});
			}).
			
			
			bind('load', function(){
				update(this);
			});
			
			$('.full-img.window .close, .full-img.window .close-after').off('click').bind('click', function(){
				var $this = $(this).parents('.full-img');
				$this.css('opacity', 0);
				$timeout(function(){
					$this.hide(true);
				}, 500);
			});
			
			angular.element($window).bind('resize', function(){
				var abs = width.abs();
				update(elem.find('.absolute .img'));
				if(width.active(true, 0) > abs)
					img.css('margin-left', -abs+'px');
			});
		}
	}
}]);


myApp.directive('taInsertVideo', ['$window', function ($window) {
	return {
	  restrict: 'AE',
		link: function(scope, element, attrs){
			var resize = function(){
				var el = element.parent().find('iframe');
				el.eq(el.length-1).css({
					width: element.width(),
					height: element.height()
				});
			}
			element.parent().append('<iframe src="'+attrs.taInsertVideo+'" frameborder="0" allowfullscreen></iframe>');
			
			angular.element($window).bind('resize', resize);
			element.bind("load", function () {
				resize();
			});
		}
	}
}]);

myApp.directive('inputTags', ['$rootScope', '$compile', '$timeout', '$window', function($rootScope, $compile, $timeout, $window){
	var list = function(el, scope, model, add) {
		this.element = $(el);
		this.elAdd = $(el).find('.add');
		this.scope = scope;
		this.model = model;
		this.tags = new Array();
		this.set(add);
	}
	
	list.prototype.set = function(list, id){
		if(list != undefined) {
			if(Array.isArray(list)) {
				var objTags = new Object();
					for(var i in list) {
						this.tags.push(list[i]);
						this.add(this.tags.length-1, list[i]);
					}				
				} else {
					this.add(this.tags.length, list);
					this.tags.push(list);		
				}
		}
	}
	
	list.prototype.add = function(id, name) {
		var comb = '<div tag class="tag" tag-id="'+id+'">'+
							 '<div class="close" tag-close></div>'+
							 '<div contenteditable="true" class="name" tag-name>'+name+'</div>'+
							 '</div>';
		this.elAdd.eq(0).before(comb);
		this.elAdd.text('');
	}	
	
	list.prototype.deleteEl = function(id){
		this.element.find('.tag').eq(id).remove();
		this.tags.splice(id, 1);
		for(var i in this.tags) 
			this.element.find('.tag').eq(i).attr('tag-id', i);
	}

	return {
		restrict: 'AE',
		template: function(el, attr){
			var ngModel = attr.inputTags;
			return '<div class="add placeholder-add" contenteditable="true" tag-add></div>'+
					 	 '<input style="display:none" disabled="false" name="'+ngModel+'" ng-model="'+ngModel+'">'
		},
		
		controller: function($scope, $element, $attrs){
			$scope.inputTags = new list($element, $scope, $attrs.inputTags, $scope.$eval($attrs.inputTagsAdd));

			$element.bind('keydown', function($event){
				if($event.keyCode == 13 && $scope.inputTags.elAdd.text().search(/([\S])/) != -1) {
					$scope.inputTags.set($scope.inputTags.elAdd.text());
					$scope[$attrs.inputTags] = $scope.inputTags.tags;
				}
				$timeout(function(){
					if($scope.inputTags.elAdd.text() != '')	
						$scope.inputTags.elAdd.removeClass('placeholder-add');
					else
						$scope.inputTags.elAdd.addClass('placeholder-add');
				});
			});

			$element.bind('drop dragover', function($event){
				$event.preventDefault();
			});		
		},
		
		link: function(scope, element, attr){
			var keydown = new Object(),
				deleteStylesContentEditTable = function($event) {
					var el = ($event.srcElement || $event.target),
						 $this = $event,
						 update = function(){
							if($(el).hasClass('name'))
								scope.inputTags.tags[$(el).parents('.tag').eq(0).attr('tag-id')] = $(el).text();
								scope[attr.inputTags] = scope.inputTags.tags;
							}
					if($event.keyCode == 13)
						$event.preventDefault();
					if($event.type == 'keyup')
						delete keydown[$event.keyCode];
					else 
						keydown[$event.keyCode] = true;
					if(keydown['86'] && keydown['17'] || $event.type == 'paste') {
						$timeout(function(){
							var range = document.createRange(), 
								 sel = $window.getSelection(), 
								 pos = $window.getSelection().getRangeAt(0).endOffset;
							$(el).text($(el).text());
							range.setStart(el.childNodes[0], pos);
							range.collapse(true);
							sel.removeAllRanges();
							sel.addRange(range);
							el.focus();
							update();
						});						
				}	
				$timeout(update);					
			}
			
			scope.inputTags.elAdd.on('keyup paste keydown', deleteStylesContentEditTable);	
			scope.$watch(function() {
				scope.inputTags.element.find('.tag').off('keyup paste keydown').on('keyup keydown paste', deleteStylesContentEditTable);	
				scope.inputTags.element.find('.tag .name, .tag .close').off('blur click').on('blur click', function($event){
					var $this = $(this);
					if($this.text().search(/([\S])/) == -1 && $event.type == 'blur' || $this.hasClass('close')) {
						$this.parent('.tag').eq(0).addClass('remove-tag');
						$timeout(function(){
							scope.inputTags.deleteEl($this.parent().attr('tag-id'));
							scope[attr.inputTags] = scope.inputTags.tags;
						}, 300);
					}						
				});
			});			
		}
	}
}]);


myApp.directive('ngBindHtmlDirective', ['$compile', '$rootScope', function($compile, $rootScope) {
	return function(scope, el, attr) {	
		scope.$watch(attr.ngBindHtmlDirective, function(){
			el.html(scope.$eval(attr.ngBindHtmlDirective));
			$compile(el.contents())(scope);
		});
	}	
}]);

myApp.directive('ngOnload', function () {
	return function (scope, element, attrs) {
		element.bind("load", function () {
			scope.$eval(attrs.ngOnload);
		});
	}
});
