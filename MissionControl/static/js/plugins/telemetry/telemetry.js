/**
 * Base plugin for Aleksandr telemetry. Returns a function to install the
 * plugin.
 */

define(['./websocket-example'], function (WebSocketExample) {
    'use strict';

    var namespace = 'aleksandr';
    var rootKey = 'telemetry';
    var rootLocation = namespace + ':' + rootKey;

    var domainObjectIds = [{
        namespace: namespace,
        key: 'websocket-example'
    }];

    var rootIdentifier = {
        namespace: namespace,
        key: rootKey
    };

    var telemetryPlotType = {
        name: 'Telemetry Plot',
        description: 'Plot of telemetry data over time.',
        cssClass: 'icon-telemetry'
    };

    var objectProvider = {
        get: function (identifier) {
            switch (identifier.key) {
                case rootKey:
                    return Promise.resolve({
                        identifier: identifier,
                        name: 'Aleksandr Telemetry',
                        type: 'folder',
                        location: 'ROOT'
                    });

                case 'websocket-example':
                    return WebSocketExample.domainObject(identifier, rootLocation);

                default:
                    console.error('Cannot provide object with identifier ', identifier);
            }
        }
    };

    var compositionProvider = {
        appliesTo: function (domainObject) {
            return domainObject.identifier.namespace === namespace &&
                domainObject.identifier.key === rootKey;
        },
        load: function (domainObject) {
            return Promise.resolve(domainObjectIds);
        }
    };

    return function () {
        /**
         * Adds a root object and object provider to Open MCT.
         */
        return function install(openmct) {
            openmct.objects.addRoot(rootIdentifier);
            openmct.objects.addProvider(namespace, objectProvider);
            openmct.composition.addProvider(compositionProvider);
            openmct.types.addType('telemetry-plot', telemetryPlotType);
        };
    };
});
