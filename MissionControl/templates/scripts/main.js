var config = {
    openmct_dir: '{{ url_for('static', filename='node_modules/openmct/dist') }}'
};

require.config({
    baseUrl: '{{ requirejs_config['baseUrl'] }}',
    paths: {{ requirejs_config['paths'] }}
});

require(['init-openmct'], function(InitOpenMCT) {
    "use strict";
    InitOpenMCT(config);
});
