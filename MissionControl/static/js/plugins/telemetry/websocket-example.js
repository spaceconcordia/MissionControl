define(function () {
    'use strict';

    return {
        /**
         * Returns a domain object for the WebSocket example with the given
         * identifier and location.
         */
        domainObject: function (identifier, location) {
            return Promise.resolve({
                identifier: identifier,
                name: 'WebSocket Example',
                type: 'telemetry-plot',
                location: location
            });
        }
    };
});
