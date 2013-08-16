/*global define _ $ document*/
define(function(){
  "use strict";

  var commonKeyCodes = {
    "ENTER": 13
    , "ESC": 27
    , "LEFT": 37
    , "UP": 38
    , "RIGHT": 39
    , "DOWN": 40
    , "META": 91
  };
  var keyListeners = {};

  function keyCode(val){
    
    var code = val;
    if(typeof val === "string"){
      code = commonKeyCodes[val.toUpperCase()];
    }

    return code;
  }

  function add(keys, method, context){
  
    _.each(keys.split(' '), function(key){

      var code = keyCode(key);
      var listeners = keyListeners[code];

      if(listeners === undefined){
        listeners = [];
      }
      
      listeners.push({
        method: method
        , context: context
      });

      keyListeners[code] = listeners;
    });
  }

  function remove(keys, method, context){

    _.each(keys.split(' '), function(key){

      var code = keyCode(key);
      var listeners = keyListeners[code];

      _.each(listeners, function(listener, i, array){
        if(listener && listener.method === method && listener.context === context){
          array.splice(i, 1);
        }
      });
    });

  }

  function listen(evt){
    _.each(keyListeners[evt.keyCode], function(item){
      item.method.call(item.context, evt); 
    });
  }

  // Start listening
  $(window).bind('keydown', listen);
  //$(el).bind('keydown', listen);


  return {
    add: add
    , remove: remove
  };
});
