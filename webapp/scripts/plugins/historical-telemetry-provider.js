/**
 * Provides historical telemetry data from the server.
 */

define(function () {
    return {
        supportsRequest: function (domainObject, options) {
            return domainObject.type === 'telemetry-plot';
        },

        request: function (domainObject, options) {
            return Promise.resolve([]); // TODO request data.
        }
    };
});
