import {Component, AfterContentInit} from '@angular/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
//import {PEOPLEPICKER_DIRECTIVES} from '../ajs2-bootstrap';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_DIRECTIVES, Router, NavigationEnd, provideRouter, RouterConfig} from '@angular/router';

import {APP_ROUTER_PROVIDERS} from './demo.routing.ts';


@Component({
    selector: 'spcomponents',
    templateUrl: './app/demo.template.html',
    directives: [ROUTER_DIRECTIVES]
})



export class AppComponent implements AfterContentInit {


    public constructor(private router: Router) {

    }

    public ngAfterContentInit(): any {
        this.router.events.subscribe((event: any) => {

        });
    }
}

bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS,
    disableDeprecatedForms(),
    provideForms()
]);
