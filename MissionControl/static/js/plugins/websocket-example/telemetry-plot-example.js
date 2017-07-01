/**
 * Domain object for plotting telemetry data.
 */

define(function () {
    'use strict';

    /**
     * Describes the format of telemetry data that will be received.
     */
    var telemetryMetadata = {
        key: 'altitude',
        name: 'Altitude',
        units: 'metres',
        format: 'float',
        min: 0,
        max: 50,
        hints: {
            range: true
        }
    };

    return {
        /**
         * Returns a domain object for the telemetry plot example with the given
         * identifier and location.
         */
        domainObject: function (identifier, location) {
            return Promise.resolve({
                identifier: identifier,
                name: 'Telemetry Plot Example',
                type: 'telemetry-plot',
                telemetry: telemetryMetadata,
                location: location
            });
        }
    };
});
