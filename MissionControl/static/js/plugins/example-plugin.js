define(function () {
    "use strict";

    /**
     * Echos the passed message in the console.
     */
    return function (message) {
        return function install() {
            console.log(message);
        };
    };
});
