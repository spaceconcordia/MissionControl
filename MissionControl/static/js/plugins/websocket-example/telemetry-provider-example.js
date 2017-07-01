/**
 * Provides telemetry data from the server over a WebSocket connection.
 */

define(function () {
    'use strict';

    /**
     * socket is the WebSocket object over which telemetry data will be
     * received.
     */
    return function (socket) {
        return {
            supportsSubscribe: function (domainObject) {
                return domainObject.type === 'telemetry-plot';
            },

            subscribe: function (domainObject, callback, options) {
                socket.onmessage = callback;
                return function () { } // TODO do I need an unsubscribe function?
            }
        };
    };
});
