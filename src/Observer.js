// Observer.js
(function(ContainerAware, window, document, undefined) {
    Observer.prototype = new ContainerAware;

    function Observer() {
        var container = this.container;
        var events = container.get('events');

        return function(eventName, method) {
            var klass = this;
            
            events.observe(eventName, container.get(klass.Service), method);

            // enable chaining
            return klass;
        };
    }

    Function.prototype.Observe = new Observer();
})(ContainerAware, window, document);