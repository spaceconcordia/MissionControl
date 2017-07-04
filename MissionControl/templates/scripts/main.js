/**
 * Sets configuration options for the app, including libraries like require.js,
 * and launches InitOpenMCT.
 */

/**
 * Configuration options for Open MCT.
 *
 * openmctDir: path to Open MCT distribution files.
 * websocketUrl: URL through which a WebSocket connection with the server will
 *               be established.
 */
var openmctConfig = {
    openmctDir: '{{ url_for('static', filename='js/node_modules/openmct/dist') }}',
    websocketUrl: '{{ websocket_url }}'
};

require.config({
    baseUrl: '{{ url_for('static', filename='js') }}',
    paths: {
        'openmct': 'node_modules/openmct/dist/openmct',
        'plugins': 'plugins'
    }
});

require(['init-openmct'], function(InitOpenMCT) {
    'use strict';
    InitOpenMCT(openmctConfig);
});
