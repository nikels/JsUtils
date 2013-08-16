define(function () {

    var queue = [],
        queued = {},
        queueing = false;

    function add(object, method) {
        queue.push({
            _o: object,
            _m: method,
            _a: Array.prototype.slice.call(arguments, 2)
        });
    }

    function complete() {
        queued.unbind('render error noresults', complete);
        process();
    }

    function process() {

        if (queue.length > 0) {

            queueing = true;

            var obj = queue.shift();
            queued = obj._o;

            obj._o.bind('render error noresults', complete);
            obj._m.apply(obj._o, obj._a);

        } else {
            queueing = false;
        }

    }

    function start() {
        if (!queueing) {
            process();
        }
    }

    return {
        add: add,
        start: start
    };

});