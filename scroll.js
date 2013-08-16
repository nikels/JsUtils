/*global $, window, _ */
define(function(){
  "use strict";

  function Scroll($el){

    this.$el = $el;

    this.constrain();
    $(window).on('resize', _.bind(this.constrain, this));
  }

  Scroll.prototype.constrain = function(){

    var windowHeight = $(window).height();
    var elOffset = this.$el.offset().top;

    this.$el.css({
      'overflow-y': 'scroll'
      , height: (windowHeight - elOffset)
    });

  };

  Scroll.prototype.cleanUp = function(){
    $(window).off('resize', _.bind(this.constrain, this));
  };

  return Scroll;

});
