/*
* Cache JS Library
* Copyright (c) 2011, Crimson
*
* Requires es5-shim for EcmaScript 5 support
*
* Date: ${Date}
*/
define(function () {

    return function (limit) {

        var cache = {},
            keys = [];

        limit = limit || 100;

        this.add = function (key, val) {

            if (keys.length >= limit) {
                remove(keys.shift());
            }

            cache[key] = val;
            keys.push(key);
        };

        this.get = function (key) {
            // move the key to the end
            var index = keys.indexOf(key);
            if (index > -1) {
                keys.push(keys.splice(index, 1)[0]);
            }
            // return the cached item
            return cache[key];
        };

        function remove(key) {
            delete cache[key];
            delete keys[keys.indexOf(key)];
        }

    };

});
