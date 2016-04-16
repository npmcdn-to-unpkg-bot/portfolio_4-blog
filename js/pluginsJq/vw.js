// Jquery plugin: vw
(function( $ ){
  $.fn.vw = function(obj, _modernizr) {
    if(!_modernizr && Modernizr.cssvwunit)
      return false;

    obj = typeof(obj) == 'object' ? obj : {
      height: obj
    } 

    var settings = $.extend({
     height:100
    }, obj); 
    return this.each(function(opt, scope) {
        scope = $(scope);
      var vwResize = function(){
        var result = function (obj, minOrMax) {         
          if(!minOrMax) 
            if(typeof(obj) == 'object')    
              for(var i in obj)    
                $(scope).css('cssText', scope.attr('style')+';'+i+':'+ ($('body').width()/100*obj[i]) +'px !important;');
            else $(scope).css('cssText', scope.attr('style')+'; height:'+ ($('body').width()/100*obj) +'px !important;');
          else 
            for(var i in obj) 
              if(eval(parseInt(i)+''+(minOrMax == 'minWidth' ? '<' : '>')+''+$('body').width()))
                result(obj[i]);
        }
        
        if(!settings.maxWidth && !settings.minWidth)
          result(settings);  
        if(settings['*'])
          result(settings['*']);
        if(settings.maxWidth) 
          result(settings.maxWidth, 'maxWidth');       
        if(settings.minWidth)
          result(settings.minWidth, 'minWidth');
        }   
      
      vwResize()
     $( window ).resize(vwResize);
    });
  };
})( jQuery );