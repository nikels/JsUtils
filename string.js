/*global define:true,  escape:true */
define(function(){
  "use strict";


  var entityMap = {
    "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': '&quot;'
    , "'": '&#39;'
    , "/": '&#x2F;'
  };

  function shorten(str, len, sep) {
    sep = (sep || "...");
    var half = len / 2;
    var firsthalf = half - sep.length;
    var lasthalf = half * -1;

    return  (str.length > len) ? str.substr(0, firsthalf) + "..." + str.substr(lasthalf, str.length) : str;
  }

  function escapeHTML(html) {
    return html.replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function embedLink(html){
    var re = /<a(([A-Z0-9]*)\b[^>]*)>/gi;
    var exec = re.exec(html);
    var newLinks = html.replace(re, "<a$1 target=\"_blank\">");
    return "data:text/html;charset=utf-8," + escape(newLinks);
  }

  return {
    shorten: shorten
    , embedLink: embedLink
    , escapeHTML: escapeHTML
  };
});
