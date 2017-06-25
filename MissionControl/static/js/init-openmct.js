define(['openmct/openmct', 'plugins/example-plugin'],
    function (openmct, ExamplePlugin) {
        "use strict";

        /**
         * Configures and runs the Open MCT application.
         */
        return function (config) {
            openmct.setAssetPath(config.openmct_dir);
            openmct.install(openmct.plugins.LocalStorage());
            openmct.install(openmct.plugins.MyItems());
            openmct.install(openmct.plugins.UTCTimeSystem());
            openmct.install(openmct.plugins.Espresso());

            openmct.install(ExamplePlugin('Hello world.'));

            openmct.start();
        }
    });
