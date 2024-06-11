import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'home'
            },
            {
                path: 'home',
            },
            {
                path: 'login',
            }
        ]
    }
];
