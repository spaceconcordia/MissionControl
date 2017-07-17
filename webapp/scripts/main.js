/**
 * Launches the Open MCT application.
 */

require.config({
    baseUrl: 'scripts',
    paths: {
        'openmct': '../node_modules/openmct/dist/openmct'
    }
});

require(['openmct', 'plugins/telemetry'], function (openmct, Telemetry) {
    'use strict';

    openmct.setAssetPath('node_modules/openmct/dist');
    openmct.install(openmct.plugins.LocalStorage());
    openmct.install(openmct.plugins.UTCTimeSystem());
    openmct.install(openmct.plugins.Espresso());

    openmct.install(Telemetry());

    openmct.start();
});
