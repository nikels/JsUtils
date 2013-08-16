/*global ZeroClipboard, define, $*/
define(function(){
  "use strict";

  return {

    configure: function(options){
      ZeroClipboard.setDefaults(options);
    }

    , apply: function(klass){
      $(klass).each(function(){

        var zeroClip = new ZeroClipboard($(this));
        var target = $(this).data('clipboard-target');

        zeroClip.glue($('#' + target));
      });
    }

  };

});
