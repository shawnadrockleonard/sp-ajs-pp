System.register(['@angular/core', '@angular/common', '../ajs2-bootstrap.ts', '../components/peoplepicker/peoplepicker-principalid.ts'], function(exports_1, context_1) {
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
    var core_1, common_1, ajs2_bootstrap_ts_1, peoplepicker_principalid_ts_1;
    var CustomFormModel, PeoplePickerDemoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ajs2_bootstrap_ts_1_1) {
                ajs2_bootstrap_ts_1 = ajs2_bootstrap_ts_1_1;
            },
            function (peoplepicker_principalid_ts_1_1) {
                peoplepicker_principalid_ts_1 = peoplepicker_principalid_ts_1_1;
            }],
        execute: function() {
            CustomFormModel = (function () {
                function CustomFormModel() {
                }
                return CustomFormModel;
            }());
            exports_1("CustomFormModel", CustomFormModel);
            PeoplePickerDemoComponent = (function () {
                function PeoplePickerDemoComponent() {
                    this.name = "PeoplePicker Demo";
                    this.peopleSinglePicker = new Array();
                    this.peopleMultPicker = new Array();
                    this.peopleSinglePicker.push(new peoplepicker_principalid_ts_1.PeoplePickerPrincipalId("123", "shawn", "shawn@gmu.edu", "Shawn Leonard", "Shawn is Awesome", "sleonard"));
                    var arrOfPeople = Array();
                    arrOfPeople.push(new peoplepicker_principalid_ts_1.PeoplePickerPrincipalId("123", "user1", "user1@gmu.edu", "User 1", "User 1 Title", "user1"));
                    arrOfPeople.push(new peoplepicker_principalid_ts_1.PeoplePickerPrincipalId("124", "user2", "user2@gmu.edu", "User 2", "User 2 Title", "user2"));
                    this.peopleMultPicker = arrOfPeople;
                }
                PeoplePickerDemoComponent = __decorate([
                    core_1.Component({
                        selector: 'peoplepicker-demo',
                        directives: [ajs2_bootstrap_ts_1.PEOPLEPICKER_DIRECTIVES, common_1.CORE_DIRECTIVES],
                        templateUrl: './apps/peoplepicker-demo.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], PeoplePickerDemoComponent);
                return PeoplePickerDemoComponent;
            }());
            exports_1("PeoplePickerDemoComponent", PeoplePickerDemoComponent);
        }
    }
});
//# sourceMappingURL=peoplepicker-demo.js.map