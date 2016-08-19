System.register(['@angular/router', './peoplepicker/peoplepicker-demo.ts', './landing-demo.ts'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, peoplepicker_demo_ts_1, landing_demo_ts_1;
    var appRoutes, APP_ROUTER_PROVIDERS;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (peoplepicker_demo_ts_1_1) {
                peoplepicker_demo_ts_1 = peoplepicker_demo_ts_1_1;
            },
            function (landing_demo_ts_1_1) {
                landing_demo_ts_1 = landing_demo_ts_1_1;
            }],
        execute: function() {
            exports_1("appRoutes", appRoutes = [
                {
                    path: '',
                    data: ['Landing'],
                    component: landing_demo_ts_1.LandingComponent
                },
                {
                    path: 'peoplepicker',
                    data: ['peoplepicker'],
                    component: peoplepicker_demo_ts_1.PeoplePickerComponent
                }
            ]);
            exports_1("APP_ROUTER_PROVIDERS", APP_ROUTER_PROVIDERS = [
                router_1.provideRouter(appRoutes)
            ]);
        }
    }
});
//# sourceMappingURL=demo.routing.js.map