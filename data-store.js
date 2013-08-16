/*global define, _*/
define([], function(){
  "use strict";

  var instance;
    
  function DataStore(){}
  
  DataStore.prototype.objects = {};

  DataStore.prototype.initialize = function(){

    if(arguments.length === 2){
      var name = arguments[0];
      return this.set(name, arguments[1]);
    }

    _.each(arguments[0], function(item, index, list){
      this.set(index, item); 
    }, this);
  }; 

  DataStore.prototype.set = function(name, object){
    this.objects[name] = object;  
  };

  DataStore.prototype.get = function(name){
    if(this.objects[name] === undefined){
      throw new Error(name + " not found");
    }
    return this.objects[name];
  };


  return function(){
    
    if(instance === undefined){
      instance = new DataStore();
    }

    instance.initialize.apply(instance, arguments);
    return instance;
      
  };
});
