/*
    People picker component
##TODO: build component, html text path
*/
System.register(['./peoplepicker/peoplepicker.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var peoplepicker_component_1;
    var PEOPLEPICKER_DIRECTIVES;
    return {
        setters:[
            function (peoplepicker_component_1_1) {
                peoplepicker_component_1 = peoplepicker_component_1_1;
                exports_1({
                    "PeoplePickerComponent": peoplepicker_component_1_1["PeoplePickerComponent"]
                });
            }],
        execute: function() {
            exports_1("PEOPLEPICKER_DIRECTIVES", PEOPLEPICKER_DIRECTIVES = [peoplepicker_component_1.PeoplePickerComponent]);
        }
    }
});
//# sourceMappingURL=peoplepicker.js.map