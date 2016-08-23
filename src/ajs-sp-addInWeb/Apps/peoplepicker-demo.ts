import {Component, AfterViewInit } from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';
import { Http, HTTP_PROVIDERS, XHRBackend } from '@angular/http';
import {PEOPLEPICKER_DIRECTIVES} from '../ajs2-bootstrap.ts';
import {PeoplePickerPrincipalId} from '../components/peoplepicker/peoplepicker-principalid.ts';
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
        HTTP_PROVIDERS,
        spcontextService]
})

export class PeoplePickerDemoComponent implements AfterViewInit {
    public name: string = "PeoplePicker Demo";
    public peopleSinglePicker: Array<PeoplePickerPrincipalId> = new Array<PeoplePickerPrincipalId>();
    public peopleMultPicker: Array<PeoplePickerPrincipalId> = new Array<PeoplePickerPrincipalId>();
    public peoplePickerContext: SP.ClientContext;

    constructor(private spcontext: spcontextService) {
        this.peopleSinglePicker.push(new PeoplePickerPrincipalId("123", "shawn", "shawn@gmu.edu", "Shawn Leonard", "Shawn is Awesome", "sleonard"));

        var arrOfPeople = Array<PeoplePickerPrincipalId>();
        arrOfPeople.push(new PeoplePickerPrincipalId("123", "user1", "user1@gmu.edu", "User 1", "User 1 Title", "user1"));
        arrOfPeople.push(new PeoplePickerPrincipalId("124", "user2", "user2@gmu.edu", "User 2", "User 2 Title", "user2"));
        this.peopleMultPicker = arrOfPeople;



    }

    public ngAfterViewInit(): any {
        var parent = this;

        this.spcontext.loadSharePointContext()
            .done(function (runtimeload, spload, spuiload, sprequestload) {

                // TODO: remove this
                parent.spcontext.retrieveUserName()
                    .done(function (usrContext: SP.User) {
                        var usernamegoeshere = usrContext.get_title();
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
        var msg = String.format("fired check model event \n Single Picker item count: {0} \n Multi Picker item count: {1}", this.peopleSinglePicker.length, this.peopleMultPicker.length);
        alert(msg);
    }
}