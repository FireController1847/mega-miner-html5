module.exports = function() {
    // Shim is required for IE & Edge support.
    const shim = require("shim-keyboard-event-key"); // eslint-disable-line

    // IE11 "CustomEvent" Polyfill
    (() => {
        if (typeof window.CustomEvent === "function") return false;

        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: null };
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }
        CustomEvent.prototype = window.Event.prototype;

        window.CustomEvent = CustomEvent;
    })();
}