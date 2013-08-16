/*global*/
define(function(){
  "use strict";

  var name;
  var dateTime;

  function Event(str){
    if(str){
      process(str);
    }
  }

  Event.prototype.grepDateTime = function(str){
    process(str);
    return this.getDateTime();
  };

  Event.prototype.getDateTime = function(){
    return dateTime;
  };

  Event.prototype.getName = function(){
    return name;
  };

  function process(str){
    name = str;
    setDate();
    setTime();
  }

  function setTime(){

    var timeregex = /(?:\s+[@|at]\s+)?((\d{1,2}):?(\d{2})?(?:\s+)?(am|pm)?)/i;
    var shorttimeregex = /(?:\s+[@|at]\s+)?(midnight|noon|morning|night)/i;
    var shorttimematches = name.match(shorttimeregex);
    var timematches = name.match(timeregex);
    var lowercase;
    var period;
    var hour;
    var minutes;

    if(dateTime === null){
      return;
    }

    if(shorttimematches){
      lowercase = shorttimematches[0].toLowerCase();
      switch(shorttimematches[1]){
        case "morning":
          dateTime.add('hours', 8);
          break;
        case "noon":
          dateTime.add('hours', 12);
          break;
        case "night":
        case "evening":
          dateTime.add('hours', 18);
          break;
        case "midnight":
          dateTime.add('days', 1);
          break;
      }
      name = name.replace(shorttimematches[0], '');
      return;
    }

    if(timematches){

      hour = Number(timematches[2]);
      minutes = Number(timematches[3]);
      period = timematches[4];

      dateTime.add('hours', hour + 12);

      if(minutes){
        dateTime.add('minutes', minutes);
      }

      if(period && period.toLowerCase() === "am"){
        dateTime.add('hours', -12);
      }

      name = name.replace(timematches[0], '');
    }

  }

  function setDate(){

    var today = moment().startOf('day');
    var day = moment().day();
    var weekday;
    var newday;
    var lowercase;
    var dateregex = /(\d{1,2})[\-|\/](\d{1,2})[\-|\/](\d{1,4})/;
    var shortdateregex = /(today|tonight|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i;
    var shortdatematches = name.match(shortdateregex);
    var longdatematches = name.match(dateregex);
    var days = {
      "sunday": 0
      , "monday": 1
      , "tuesday": 2
      , "wednesday": 3
      , "thursday": 4
      , "friday": 5
      , "saturday": 6
    };

    if(shortdatematches){
      lowercase = shortdatematches[0].toLowerCase();
      switch(lowercase){
        case "tonight":
        case "today":
          dateTime = today;
          break;
        case "tomorrow":
          dateTime = today.add('days', 1);
          break;
        default:
          weekday = days[lowercase];
          newday = (weekday > day) ? weekday : (7 + weekday);
          dateTime = moment().day(newday).startOf('day');
          break;
      }

      name = name.replace(shortdatematches[0], '');
      return;
    }

    if(longdatematches){
      dateTime = moment(longdatematches[0]);
      name = name.replace(longdatematches[0], '');
    }
  }

  return Event;

});
