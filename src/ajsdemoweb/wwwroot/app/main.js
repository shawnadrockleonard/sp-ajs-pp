System.register(['@angular/core', '@angular/forms', '@angular/platform-browser-dynamic', '@angular/router', './demo.routing.ts'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, forms_1, platform_browser_dynamic_1, router_1, demo_routing_ts_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (demo_routing_ts_1_1) {
                demo_routing_ts_1 = demo_routing_ts_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(router) {
                    this.router = router;
                }
                AppComponent.prototype.ngAfterContentInit = function () {
                    this.router.events.subscribe(function (event) {
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'spcomponents',
                        templateUrl: './app/demo.template.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
            platform_browser_dynamic_1.bootstrap(AppComponent, [
                demo_routing_ts_1.APP_ROUTER_PROVIDERS,
                forms_1.disableDeprecatedForms(),
                forms_1.provideForms()
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map