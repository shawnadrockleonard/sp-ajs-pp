System.register(['./components/peoplepicker'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var peoplepicker_1;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (peoplepicker_1_1) {
                peoplepicker_1 = peoplepicker_1_1;
                exportStar_1(peoplepicker_1_1);
            }],
        execute: function() {
            exports_1("default",{
                directives: [
                    peoplepicker_1.PEOPLEPICKER_DIRECTIVES
                ]
            });
        }
    }
});
//# sourceMappingURL=ajs2-bootstrap.js.map