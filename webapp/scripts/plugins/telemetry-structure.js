/**
 * Defines the structure of the incoming telemetry.
 * TODO send this from server.
 */

define(function () {
    'use strict';

    return function () {
        return {
            telemetry: [
                {
                    name: 'Altitude',
                    key: 'telem.altitude',
                    values: [
                        {
                            key: 'altitude',
                            name: 'Altitude',
                            units: 'm',
                            format: 'int',
                            min: 0,
                            max: 31000,
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
                }
            ]
        };
    }
});
