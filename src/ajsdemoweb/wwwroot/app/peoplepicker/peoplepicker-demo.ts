import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';

import {PEOPLEPICKER_DIRECTIVES} from '../../ajs2-bootstrap.ts';

@Component({
    selector: 'peoplepicker-demo',
    directives: [PEOPLEPICKER_DIRECTIVES, CORE_DIRECTIVES],
    template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <datepicker-demo></datepicker-demo>
    </demo-section>`
})

export class PeoplePickerComponent {
    public name: string = 'PeoplePicker';
}