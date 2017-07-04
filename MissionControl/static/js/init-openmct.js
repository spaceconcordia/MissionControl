/**
 * Returns a function for launching Open MCT based on provided configuration
 * options.
 */

define(['openmct', 'plugins/websocket-example/websocket-example'],
    function (openmct, WebSocketExample) {
        'use strict';

        /**
         * Configures and runs the Open MCT application.
         */
        return function (config) {
            // Create WebSocket to receive telemetry data over.
            var socket = new WebSocket(config.websocketUrl);

            openmct.setAssetPath(config.openmctDir);
            openmct.install(openmct.plugins.LocalStorage());
            openmct.install(openmct.plugins.UTCTimeSystem());
            openmct.install(openmct.plugins.Espresso());

            openmct.install(WebSocketExample(socket));

            openmct.start();
        }
    });
