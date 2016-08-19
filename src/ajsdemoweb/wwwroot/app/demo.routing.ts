import { provideRouter, RouterConfig} from '@angular/router';
import {PeoplePickerComponent} from './peoplepicker/peoplepicker-demo.ts';
import {LandingComponent} from './landing-demo.ts';

export const appRoutes: RouterConfig = [
    {
        path: '',
        data: ['Landing'],
        component: LandingComponent
    }
    , {
        path: 'peoplepicker',
        data: ['peoplepicker'],
        component: PeoplePickerComponent
    }
]

export const APP_ROUTER_PROVIDERS = [
    provideRouter(appRoutes)
];
