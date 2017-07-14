/**
 * Domain object for plotting telemetry data.
 */

define(function () {
    'use strict';

    /**
     * Describes the format of telemetry data that will be received.
     */
    var telemetryMetadata = {
        values: [
            {
                key: 'altitude',
                name: 'Altitude',
                units: 'metres',
                format: 'float',
                min: 0,
                max: 50,
                hints: {
                    range: true
                }
            },
            {
                key: 'timestamp',
                name: 'Timestamp',
                format: 'utc',
                hints: {
                    domain: true
                }
            }
        ]
    };

    /**
     * Returns a domain object for the telemetry plot example with the given
     * identifier and location.
     */
    return function (identifier, location) {
            return Promise.resolve({
                identifier: identifier,
                name: 'Telemetry Plot Example',
                type: 'telemetry-plot',
                telemetry: telemetryMetadata,
                location: location
            });
        }
});
