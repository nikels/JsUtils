/*global window */
define([
  'libs/uri'
], function(
  uri
){
  "use strict";

  var trimRegEx = /^(\/)?(.*)(\/)?$/;
  var delimiter = '/';

  function URLParams(){

    this.properties = {};
    var props = this.parse();

    while(props.length){
      this.properties[props.shift()] = props.shift();
    }
  }

  URLParams.prototype.parse = function(){

    var parsed = uri.parse(window.location);
    var hashOrPath = parsed.anchor || parsed.path;
    var path = hashOrPath.replace(trimRegEx, '$2');

    return path.split(delimiter);
  };

  URLParams.prototype.first = function(){

    var each;

    for(each in this.properties){
      if(this.properties.hasOwnProperty(each)){
        return each;
      }
    }
  };

  URLParams.prototype.add = URLParams.prototype.set = function(prop, val){

    var len = arguments.length;
    var i = 0;

    for(i; i < len; i++){
      this.properties[arguments[i]] = arguments[++i];
    }

    return this;
  };

  URLParams.prototype.get = function(prop){
    return this.properties[prop];
  };

  URLParams.prototype.remove = function(prop){
    if(this.properties.hasOwnProperty(prop)){
      delete this.properties[prop];
    }
    return this;
  };

  URLParams.prototype.clear = function(){

    this.properties = {};

    if(arguments){
      URLParams.prototype.set.apply(this, arguments);
    }
    return this;
  };

  URLParams.prototype.next = function(prop){

    var props = this.parse();
    var len = props.length;
    var i = 0;

    for(i; i < len; i++){
      if(prop === props[i]){
        return props[i+1];
      }
    }
  };

  URLParams.prototype.toString = function(absolute){

    var joined = '';
    var each;
    var parts = [];

    for(each in this.properties) {
      if(this.properties.hasOwnProperty(each)){
        parts.push(each, this.properties[each]);
      }
    }
    return ((absolute) ? delimiter : '') + parts.join(delimiter);
  };

  return URLParams;

});
