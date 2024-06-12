import { Route } from '@angular/router';
import { AppComponent } from './app.component';

export const appRoutes: Route[] = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home',
            },
            {
                path: 'home',
                loadComponent: () => import('./app.component').then(m => m.AppComponent)
            },
            {
                path: 'login',
                loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
            }
        ]
    }
];
