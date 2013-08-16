/*global $ define document*/
define([
    'lib/cookies'
], function(
    CookiesLib
){
  "use strict";
  
  var prefix = "_cdisession_"
    ;
  
  function CookieJar(){}

  function add(key, value, options){
    CookiesLib.set(key, value, options);
  }

  function get(key){
    return CookiesLib.get(key);
  }

  function expire(key, options){
      CookiesLib.expire(key, options);
  }

  CookieJar.prototype.addCookie = function(key, value, options, isSession){

    if(isSession){
      key = prefix + key; 
    }

    add(key, value, options);
  };

  CookieJar.prototype.clearSession = function(){
    
    var cookie = null
      , cookiedoc = document.cookie
      , sessioncookies = (cookiedoc.indexOf(';')) ? cookiedoc.split(';') : cookiedoc.split(',')
      , i = 0
      , len = sessioncookies.length
      ;

    for(i; i < len; i++){
      cookie = $.trim(sessioncookies[i]).split('=');
      if(cookie[0].indexOf(prefix) > -1){
        expire(cookie[0]);
      }
    }

  };

  CookieJar.prototype.getCookie = function(key, isSession){

    if(isSession){
      key = prefix + key; 
    }

    return get(key); 
  };

  CookieJar.prototype.expireCookie = function(key, options, isSession){
    
    if(isSession){
      key = prefix + key; 
    }

    expire(key, options);
  };

  return CookieJar;

});
