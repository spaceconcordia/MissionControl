/**
 * Returns a function for launching Open MCT based on provided configuration
 * options.
 */

define(['openmct', 'plugins/telemetry/telemetry'],
    function (openmct, Telemetry) {
        'use strict';

        /**
         * Configures and runs the Open MCT application.
         */
        return function (config) {
            openmct.setAssetPath(config.openmctDir);
            openmct.install(openmct.plugins.LocalStorage());
            openmct.install(openmct.plugins.UTCTimeSystem());
            openmct.install(openmct.plugins.Espresso());

            openmct.install(Telemetry(config.WSUrl));

            openmct.start();
        }
    });
