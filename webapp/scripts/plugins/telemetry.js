/**
 * Plugin to display HAB telemetry data.
 */

define(['./telemetry-structure',
        './historical-telemetry-provider',
        './realtime-telemetry-provider'],
    function (TelemetryStructure, HistoricalTelemetryProvider, RealtimeTelemetryProvider) {
        'use strict';

        var rootNamespace = 'hab';
        var rootKey = 'telemetry';
        var rootLocation = rootNamespace + ':' + rootKey;
        var rootIdentifier = {
            namespace: rootNamespace, key: rootKey
        };

        // TODO add more types.
        var telemetryPlotType = {
            name: 'Telemetry Plot',
            description: 'Plot of telemetry data over time.',
            cssClass: 'icon-telemetry'
        };

        var objectProvider = {
            get: function (identifier) {
                if (identifier.key === rootKey) {
                    return Promise.resolve({
                        identifier: identifier,
                        name: 'HAB Telemetry',
                        type: 'folder',
                        location: 'ROOT'
                    });
                }

                var measurement = TelemetryStructure().telemetry.find(function (m) {
                    return m.key === identifier.key;
                });

                if (measurement !== undefined) {
                    return Promise.resolve({
                        identifier: identifier,
                        name: measurement.name,
                        type: 'telemetry-plot', // TODO determine types dynamically.
                        telemetry: {
                            values: measurement.values
                        },
                        location: rootLocation
                    });
                }
            }
        };

        var compositionProvider = {
            appliesTo: function (domainObject) {
                return domainObject.identifier.namespace === rootNamespace &&
                    domainObject.identifier.key === rootKey;
            },

            load: function (domainObject) {
                function getMeasurementId(measurement) {
                    return {
                        namespace: rootNamespace,
                        key: measurement.key
                    }
                }

                var measurements = TelemetryStructure().telemetry;
                return Promise.resolve(measurements.map(getMeasurementId));
            }
        };

        return function () {
            return function install(openmct) {
                openmct.objects.addRoot(rootIdentifier);
                openmct.objects.addProvider(rootNamespace, objectProvider);
                openmct.composition.addProvider(compositionProvider);
                openmct.types.addType('telemetry-plot', telemetryPlotType);
                openmct.telemetry.addProvider(HistoricalTelemetryProvider);
                openmct.telemetry.addProvider(RealtimeTelemetryProvider);
            }
        };
    });
