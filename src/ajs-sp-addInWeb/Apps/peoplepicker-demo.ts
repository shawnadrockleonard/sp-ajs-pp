import {Component, AfterViewInit } from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';
import { Http } from '@angular/http';
import {PEOPLEPICKER_DIRECTIVES} from '../directives/pp-bootstrap.ts';
import {PeoplePickerPrincipalId} from '../components/peoplepicker/peoplepicker-principalid';
import { spcontextService } from '../components/services/spcontext-service';


export class CustomFormModel {
    /** SharePoint Unique Item ID */
    id: number;
    /** Title of the list item */
    title: Array<PeoplePickerPrincipalId>;
}

@Component({
    selector: 'peoplepicker-demo',
    directives: [PEOPLEPICKER_DIRECTIVES, CORE_DIRECTIVES],
    templateUrl: './apps/peoplepicker-demo.html',
    providers: [
        spcontextService]
})

export class PeoplePickerDemoComponent implements AfterViewInit {
    public name: string = "PeoplePicker Demo";
    public peopleSinglePicker: string = "";
    public peopleMultPicker: string = "";
    public peoplePickerContext: SP.ClientContext;

    constructor(
        private spcontext: spcontextService) {


        var arrOfSingle = Array<PeoplePickerPrincipalId>();
        arrOfSingle.push(new PeoplePickerPrincipalId("123", "shawn", "shawn@gmu.edu", "Shawn Leonard", "Shawn is Awesome", "sleonard"));
        this.peopleSinglePicker = JSON.stringify(arrOfSingle);

        var arrOfPeople = Array<PeoplePickerPrincipalId>();
        arrOfPeople.push(new PeoplePickerPrincipalId("123", "user1", "user1@gmu.edu", "User 1", "User 1 Title", "user1"));
        arrOfPeople.push(new PeoplePickerPrincipalId("124", "user2", "user2@gmu.edu", "User 2", "User 2 Title", "user2"));
        this.peopleMultPicker = JSON.stringify(arrOfPeople);
    }

    public ngAfterViewInit(): any {
        var parent = this;

        parent.spcontext.loadSharePointContext()
            .done(function (runtimeload, spload, spuiload, sprequestload) {

                // TODO: remove this
                parent.spcontext.retrieveUserName()
                    .done(function (usrContext: SP.User) {
                        var usernamegoeshere = usrContext.get_title();
                        $("#userDisplayName").html(usernamegoeshere);
                    })
                    .fail(function (sender, args) {
                        console.log(String.format("Failed with message {0}", args.get_message()));
                    });

                parent.peoplePickerContext = parent.spcontext.appContext;
            })
            .fail(function (sender, args) {
                console.log("Error {0} in ngAfterViewInit", args.message);
            });
    }

    public checkModel() {
        var msg = "fired check model event ";

        var SingleResults = $.parseJSON(this.peopleSinglePicker);
        if (SingleResults && SingleResults.length && SingleResults.length > 0) {
            var displayCount = SingleResults.length, loginArray = new Array<string>();
            msg = String.format("{0} \n Single Picker item count: {1}", msg, displayCount);
            for (var i = 0; i < displayCount; i++) {
                var item = SingleResults[i];
                loginArray.push(item['login']);
            }
            msg = String.format("{0} Values : {1}", msg, loginArray.join(";"));
        }


        var MultipleResults = $.parseJSON(this.peopleMultPicker);
        if (MultipleResults && MultipleResults.length && MultipleResults.length > 0) {
            var displayCount = MultipleResults.length, loginArray = new Array<string>();
            msg = String.format("{0} \n Multi Picker item count: {1}", msg, displayCount);
            for (var i = 0; i < displayCount; i++) {
                var item = MultipleResults[i];
                loginArray.push(item['login']);
            }
            msg = String.format("{0} Values : {1}", msg, loginArray.join(";"));
        }
        alert(msg);
    }
}