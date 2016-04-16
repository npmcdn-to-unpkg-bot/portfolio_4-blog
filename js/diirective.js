myApp.directive('feedBeck', function () {
	return {
		restrict: 'CA',
    replace: false,
    transclude: false,
		template: 
		'<div class="block-feedBeck">' +
		'<div class="box">' +
		'<div class="header">' +
		'<div class="title">Обратная связь</div>' +
		'<div class="close"></div>' +
		'</div>' +
		'<form action="" name="feedBeck.form">'+
		'<div class="placeholder {{(feedBeck.form.name.$viewValue != undefined && feedBeck.form.name.$viewValue != \'\' ? (feedBeck.form.name.$valid == false ? \'invalid \' : \'valid \') : \'\')}}" >' +
		'<input ng-model="feedBeck.name" name="name" type="text" required id="name" />' +
		'<label class="type" for="name">Имя</label>' +
		'</div>' +
		'<div class="placeholder {{(feedBeck.form.email.$viewValue != undefined && feedBeck.form.email.$viewValue != \'\' ? ( feedBeck.form.email.$valid == false ? \'invalid\' : \'valid\') : \'\')}}">' +
		'<input required name="email" type="email" ng-model="feedBeck.email" />' +
		'<label class="type" for="email">Почта</label>' +
		'</div>' +
		'<label class="label-textarea">' +
		'<span class="type">Teкст сообщения</span>' +
		'<textarea name="text" required ng-model="feedBeck.text" id="" cols="30" rows="12" ></textarea>' +
		'</label> ' +
		'<button type="submit" ng-disabled="feedBeck.form.$invalid" ng-class="feedBeck.form.$invalid ? \'disabled\' : \'\'">Отправить</button> ' +
		'<div type="" class="close">Закрыть</div>' +
		'</form>' +
		'</div>' +
		'</div>',
		link: function (scope, elem) {
alert()
		}
	}
})
