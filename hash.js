/*global _*/
/*
* Hash JS Library
* Copyright (c) 2011, Crimson
*
* Requires es5-shim for EcmaScript 5 support
*
* Date: ${Date}
*/
define(function () {

    function Hash(options) {

        options = options || {};

        var start = options.start || "/",
            separator = options.separator || "/",
            between = options.between || ",",
            end = options.end || "",
            history = [],
            parts = parse(),
            cached = {};

        // PULBIC METHODS
        this.add = function () {

            var i = 0,
                len = arguments.length;

            history.push(parse());

            while (i < len) {
                parts[arguments[i++]] = arguments[i++];
            }

            return build();
        };

        this.after = function (what, key, value) {

            // Does the position exist?
            if (!parts[what]) {
                return this.prepend(key, value);
            }

            history.push(parse());

            var copy = {};
            destroy(key);
            for (var each in parts) {
                copy[each] = parts[each];
                if (each === what) {
                    copy[key] = value;
                }
            }
            parts = copy;

            return build();
        };

        this.append = function (key, value) {
            history.push(parse());

            var copy = {};

            destroy(key);

            for (var each in parts) {
                copy[each] = parts[each];
            }

            parts = copy;
            parts[key] = value;

            return build();
        };

        this.before = function (what, key, value) {

            // Does the position exist?
            if (!parts[what]) {
                return this.prepend(key, value);
            }

            history.push(parse());

            // Remove the key.
            destroy(key);

            // Find the position.
            var keys = _.keys(parts);
            var pos = keys.indexOf(what);

            keys.splice(pos, 1, key, keys[pos]);

            var copy = {},
                len = keys.length;

            for (var i = 0; i < len; i++) {
                copy[keys[i]] = (keys[i] === key) ? value : parts[keys[i]];
            }

            parts = copy;

            return build();
        };

        this.first = function () {
            history.push(parse());
            for(var each in parts){
              return each;
            }
        };

        this.clear = function (key, value) {

            history.push(parse());

            parts = {};
            this.add.apply(this, arguments);

            return build();
        };

        this.get = function (key) {
            return parse()[key];
        };

        this.last = function (key) {
            var previous = history[history.length - 1];

            if (typeof previous === "object") {
                return previous[key];
            }

            return undefined;
        };

        this.prepend = function (key, value) {

            history.push(parse());

            var copy = {};
            copy[key] = value;

            destroy(key);

            for (var each in parts) {
                copy[each] = parts[each];
            }

            parts = copy;

            return build();
        };

        this.preserve = function () {

            history.push(parse());

            var copy = {},
                len = arguments.length;

            for (var i = 0; i < len; i++) {
                if (parts[arguments[i]]) {
                    copy[arguments[i]] = parts[arguments[i]];
                }
            }

            parts = copy;

            return build();
        };

        this.remove = function () {

            history.push(parse());

            for (var i = 0, len = arguments.length; i < len; i++) {
                if (parts[arguments[i]]) {
                    destroy(arguments[i]);
                }
            }

            return build();
        };

        this.replace = function (oldkey, newkey, value) {

            history.push(parse());

            var copy = {};

            for (var each in parts) {
              if(each === oldkey){
                copy[newkey] = value || parts[each];
              } else {
                copy[each] = parts[each];
              }
            }

            parts = copy;

            return build();
        };

        this.restore = function (key) {

            history.push(parse());

            parts = cached[key];
            return build();
        };

        this.store = function (key) {
            cached[key] = parts;
            parts = {};
        };

        // PRIVATE METHODS
        function build() {

            var middle = '';

            for (var each in parts) {
                middle += each + separator;

                switch (typeof parts[each]) {
                    case "string":
                    case "number":
                        middle += parts[each] + separator;
                        break;
                    case "object":
                        middle += parts[each].join(between) + separator;
                        break;
                    default:
                        break;
                }
            }

            middle = middle.substr(0, middle.length - 1);

            if (middle === '') {
                return '';
            }

            return encodeURI(start + middle + end);
        }

        function destroy(key) {
            if (parts[key]) {
                delete parts[key];
            }
        }

        function go() {
            location.hash = build();
        }

        function insert(where, what, key, value) {
            this[where](what, key, value);
        }

        function parse() {

            var pieces = [],
                hash = location.hash,
                parsed = {};

            // remove the #
            if (hash.charAt(0) === "#") {
                hash = hash.substring(1);
            }
            // remove the start character
            if (hash.charAt(0) === start) {
                hash = hash.substring(1);
            }
            // remove the end character
            if (hash[hash.length] === end) {
                hash = hash.substring(0, hash.length);
            }

            if (hash === "") {
                return {};
            }

            pieces = hash.split(separator);
            do {
                var _key = pieces.shift();
                var _value = pieces.shift();

                if (_value && _value.indexOf(between) > -1) {
                    _value = _value.split(between);
                }

                parsed[_key] = _value;
            }
            while (pieces.length);

            return parsed;
        }

    }

    return Hash;

});
