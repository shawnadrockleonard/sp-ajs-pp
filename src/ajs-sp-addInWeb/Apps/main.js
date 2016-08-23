System.register(['@angular/forms', '@angular/platform-browser-dynamic', './peoplepicker-demo'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var forms_1, platform_browser_dynamic_1, peoplepicker_demo_1;
    return {
        setters:[
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (peoplepicker_demo_1_1) {
                peoplepicker_demo_1 = peoplepicker_demo_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(peoplepicker_demo_1.PeoplePickerDemoComponent, [
                forms_1.disableDeprecatedForms(),
                forms_1.provideForms()
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map