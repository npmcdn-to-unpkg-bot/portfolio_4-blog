myApp.directive('repeatBrick', function() {
  return function(scope, element, attrs) {
    if (scope.$last){
      scope.$emit('LastBrick');
    }
  }
})
.directive('check_active_link', function() {
  return {
		restrict: 'A',
		link:function(scope, element, attrs) {
		console.log(8)
		}
  }
})
.directive('theFreewall', function() {
  return function(scope, element, attrs) {
    scope.$on('LastBrick', function(event){
      var wall = new freewall("#freewall");
      wall.reset({
        selector: '.brick',
        cellW: 200,
        cellH: 'auto',
        onResize: function() {
          wall.fitWidth();
        }
      });
      wall.container.find('.brick img').load(function() {
        wall.fitWidth();
      });
    });
  };
});