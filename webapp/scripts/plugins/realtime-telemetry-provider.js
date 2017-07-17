/**
 * Provides real time telemetry data from the server over a WebSocket connection.
 */

/**
 * Returns the base url for websocket connections.
 */
function wsBaseUrl() {
    'use strict';

    var scheme = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return scheme + '//' + window.location.host;
}

define(function () {
    'use strict';

    // WebSocket to receive telemetry data over.
    var wsUrl = wsBaseUrl() + '/telemetry';
    var socket = new WebSocket(wsUrl);

    return {
        supportsSubscribe: function (domainObject) {
            return domainObject.type === 'telemetry-plot';
        },

        subscribe: function (domainObject, callback, options) {
            socket.onmessage = function (messageEvent) {
                callback(JSON.parse(messageEvent.data));
            };
            return function () { } // TODO implement unsubscribe.
        }
    };
});
