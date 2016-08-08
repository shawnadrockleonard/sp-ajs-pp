import {Component, Self, Input, Output, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES, NgModel} from '@angular/forms';
import {PeoplePickerUtils} from './peoplepicker-utils.ts';

export class PeoplePickerComponent {
    @Input() public pickerFieldName: string;


    public cd: NgModel;


    public constructor( @Self() cd: NgModel) {
        this.cd = cd;
    }


}