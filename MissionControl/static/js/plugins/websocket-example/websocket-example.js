/**
 * Base plugin for this WebSocket example. Returns a function to install the
 * plugin.
 */

define([
    './telemetry-plot-example',
    './telemetry-provider-example'], function (TelemetryPlot, TelemetryProvider) {

    'use strict';

    var rootNamespace = 'aleksandr';
    var rootKey = 'websocket-example';
    var rootLocation = rootNamespace + ':' + rootKey;

    // TODO prevent need to duplicate key (i.e. 'telemetry-plot' needs to be
    // specified in objectProvider).
    var domainObjectIds = [{
        namespace: rootNamespace, key: 'telemetry-plot'
    }];

    var rootIdentifier = {
        namespace: rootNamespace, key: rootKey
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
                        name: 'WebSocket Example',
                        type: 'folder',
                        location: 'ROOT'
                    });

                case 'telemetry-plot':
                    return TelemetryPlot(identifier, rootLocation);

                default:
                    console.error('Cannot provide object with identifier ', identifier);
            }
        }
    };

    var compositionProvider = {
        appliesTo: function (domainObject) {
            return domainObject.identifier.namespace === rootNamespace && domainObject.identifier.key === rootKey;
        },

        load: function (domainObject) {
            return Promise.resolve(domainObjectIds);
        }
    };

    /**
     * "socket" is a WebSocket object over which telemetry data will be
     * received.
     */
    return function (socket) {
        return function install(openmct) {
            openmct.objects.addRoot(rootIdentifier);
            openmct.objects.addProvider(rootNamespace, objectProvider);
            openmct.composition.addProvider(compositionProvider);
            openmct.types.addType('telemetry-plot', telemetryPlotType);
            openmct.telemetry.addProvider(TelemetryProvider(socket));
        };
    };
});
