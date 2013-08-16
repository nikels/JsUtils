/**
* Mediator pattern
*/
/*jslint nomen:true, browser:true*/
/*global define*/
define(function () {

    var channels = {};

    function publish() {

        var args = [].slice.call(arguments),
            message = args.shift(),
            messages = message.split(','),
            subscribers,
            subscriber,
            j, jlen, i, len;

        for (j = 0, jlen = messages.length; j < jlen; j++) {
          subscribers = channels[messages[j]] || [];

          for (i = 0, len = subscribers.length; i < len; i++) {
              subscriber = subscribers[i];
              if (subscriber) {
                  subscriber.method.apply(subscriber.object, args);
              }
          }
        }
    }

    function subscribe(message, method) {

        // recursion
        if (message.indexOf(',') > -1) {
            var messages = message.split(',');
            for (var i = 0, len = messages.length; i < len; i++) {
                this.subscribe($.trim($.trim(messages[i])), method);
            }
        }

        if (channels[message] === undefined) {
            channels[message] = [];
        }

        var subscribers = channels[message];
        subscribers.push({
            object: this,
            method: method
        });

    }

    function unsubscribe(message, method) {

        var subscribers = channels[message];

        for (var i = 0; i < subscribers.length; i++) {

            var subscriber = subscribers[i];

            if (subscriber.object === this && subscriber.method === method) {
                subscribers.splice(i--, 1);
            }
        }
    }

    function unsubscribeall() {

        for (var each in channels) {

            var subscribers = channels[each];

            for (var i = 0; i < subscribers.length; i++) {

                var subscriber = subscribers[i];

                if (subscriber.object === this) {
                    subscribers.splice(i--, 1);
                }
            }
        }
    }

    return {
        install: function (obj) {
            obj.publish = publish;
            obj.subscribe = subscribe;
            obj.unsubscribe = unsubscribe;
            obj.unsubscribeall = unsubscribeall;
        }
    };
});
