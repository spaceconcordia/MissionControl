/**
 * Sets configuration options for the app, including libraries like require.js,
 * and launches InitOpenMCT.
 */

/**
 * Configuration options for Open MCT.
 *
 * openmct_dir: path to Open MCT distribution files.
 */
var config = {
    openmct_dir: '{{ url_for('static', filename='node_modules/openmct/dist') }}'
};

require.config({
    baseUrl: '{{ url_for('static', filename='js') }}',
    paths: {
        'openmct': '../node_modules/openmct/dist/openmct',
        'plugins': 'plugins'
    }
});

require(['init-openmct'], function(InitOpenMCT) {
    'use strict';
    InitOpenMCT(config);
});
