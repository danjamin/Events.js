// Events.js
(function(window, document, undefined) {
    // Define the events class
    Events.Service('events');
    function Events() {
        this.events = {};
    }
    Events.prototype.observe = function(name, observer, method) {
        // todo: check for pre-existing observer
        
        if (!this.events.hasOwnProperty(name)) {
            this.events[name] = [];
        }
        
        this.events[name].push([observer, method]);  
    };
    Events.prototype.dispatch = function(name, data) {
        var observer;
        var method;
        
        if (!this.events.hasOwnProperty(name)) {
            return;
        } else {
            for (var i = 0, max_i = this.events[name].length; i < max_i; i++) {
                observer = this.events[name][i][0];
                method = this.events[name][i][1];
                observer[method](data);
            }
        }
    };
})(window, document);