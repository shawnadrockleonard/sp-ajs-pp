import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';

@Component({
    selector: 'landing-demo',
    directives: [CORE_DIRECTIVES],
    template: `
    <demo-section [name]="name" [src]="src" [titleDoc]="titleDoc" [html]="html" [ts]="ts" [doc]="doc">
      <datepicker-demo></datepicker-demo>
    </demo-section>`
})

export class LandingComponent {
    public name: string = 'Landing';
}