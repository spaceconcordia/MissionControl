/**
 * Simple plugin for receiving and displaying real-time data over WebSockets.
 */
define(function (socketUrl) {
    'use strict';

    //var socket = new WebSocket(socketUrl);

    return {
        /**
         * Returns a domain object for the WebSocket example with the given
         * identifier and location.
         */
        domainObject: function (identifier, location) {
            return Promise.resolve({
                identifier: identifier,
                name: 'WebSocket Example',
                type: 'telemetry-plot',
                location: location
            });
        }
    };
});
