import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';

import {PEOPLEPICKER_DIRECTIVES} from '../ajs2-bootstrap.ts';
import {PeoplePickerPrincipalId} from '../components/peoplepicker/peoplepicker-principalid.ts';


export class CustomFormModel {
    /** SharePoint Unique Item ID */
    id: number;
    /** Title of the list item */
    title: Array<PeoplePickerPrincipalId>;
}

@Component({
    selector: 'peoplepicker-demo',
    directives: [PEOPLEPICKER_DIRECTIVES, CORE_DIRECTIVES],
    templateUrl: './apps/peoplepicker-demo.html'
})

export class PeoplePickerDemoComponent {
    public name: string = "PeoplePicker Demo";
    public peopleSinglePicker: Array<PeoplePickerPrincipalId> = new Array<PeoplePickerPrincipalId>();
    public peopleMultPicker: Array<PeoplePickerPrincipalId> = new Array<PeoplePickerPrincipalId>();


    constructor() {
        this.peopleSinglePicker.push(new PeoplePickerPrincipalId("123", "shawn", "shawn@gmu.edu", "Shawn Leonard", "Shawn is Awesome", "sleonard"));

        var arrOfPeople = Array<PeoplePickerPrincipalId>();
        arrOfPeople.push(new PeoplePickerPrincipalId("123", "user1", "user1@gmu.edu", "User 1", "User 1 Title", "user1"));
        arrOfPeople.push(new PeoplePickerPrincipalId("124", "user2", "user2@gmu.edu", "User 2", "User 2 Title", "user2"));
        this.peopleMultPicker = arrOfPeople;


        
    }
}