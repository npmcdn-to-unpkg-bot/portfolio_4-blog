myApp.filter('limitHtml', ['$sce', function($sce) {
  return function(input, limit) {
    var finalText = "",
      counting = 1,
      skipping = false,
      addToText = false;
    
    for(var index = 0; index < input.length; index++) {
      addToText = false;
      if(skipping) {
        finalText += input[index];
        if(input[index] === ">" ) {
          skipping = false;
        }        
        continue;
      } else if(counting <= limit && input[index] !== "<") {
          counting++;
          addToText = true;
      } else if(input[index] === "<"){
        skipping = true;
        addToText = true;
      }

      if(addToText) {
        finalText += input[index];
      }
      
    }
      return $sce.trustAsHtml(finalText);
  }
}]);