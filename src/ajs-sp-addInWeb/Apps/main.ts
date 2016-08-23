import {Component, AfterContentInit} from '@angular/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
//import {PEOPLEPICKER_DIRECTIVES} from '../ajs2-bootstrap';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_DIRECTIVES, Router, NavigationEnd, provideRouter, RouterConfig} from '@angular/router';
import {PeoplePickerDemoComponent} from './peoplepicker-demo';

bootstrap(PeoplePickerDemoComponent, [
    disableDeprecatedForms(),
    provideForms()
]);
