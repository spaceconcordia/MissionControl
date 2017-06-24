var objectProvider = {
    get: function (identifier) {
    }
};

function DictionaryPlugin() {
    return function (openmct) {
        openmct.objects.addRoot({
            namespace: 'example.taxonomy',
            key: 'spacecraft'
        });
    }
}
