import {Component, AfterContentInit} from '@angular/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {bootstrap} from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS, XHRBackend } from '@angular/http';
import {PeoplePickerDemoComponent} from './peoplepicker-demo';

bootstrap(PeoplePickerDemoComponent, [
    HTTP_PROVIDERS,
    disableDeprecatedForms(),
    provideForms()
]);
