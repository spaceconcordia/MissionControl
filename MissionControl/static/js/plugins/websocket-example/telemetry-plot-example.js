/**
 * Domain object for plotting telemetry data.
 */

define(function () {
    'use strict';

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
                location: location
            });
        }
    };
});
