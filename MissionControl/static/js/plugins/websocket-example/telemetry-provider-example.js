/**
 * Provides telemetry data from the server over a WebSocket connection.
 */

define(function () {
    'use strict';

    /**
     * "socket" is the WebSocket object over which telemetry data will be
     * received.
     */
    return function (socket) {
        return {
            supportsSubscribe: function (domainObject) {
                return domainObject.type === 'telemetry-plot';
            },

            subscribe: function (domainObject, callback, options) {
                socket.onmessage = function (messageEvent) {
                    callback(JSON.parse(messageEvent.data));
                };
                return function () { } // TODO implement unsubscribe.
            },

            supportsRequest: function (domainObject, options) {
                return domainObject.type === 'telemetry-plot';
            },

            request: function (domainObject, options) {
                return Promise.resolve([]); // TODO request data.
            }
        };
    };
});
