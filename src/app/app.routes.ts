import { Routes } from '@angular/router';
import { Mainlayout } from './core/layout/mainlayout/mainlayout';

export const routes: Routes = [
    {
        path: '',
        component: Mainlayout,
        children: [
            {   path: '', loadComponent: () => import('./features/home/home').then(m => m.Home) },
            { 
                path: 'browse', 
                loadComponent: () => import('./features/laptopbrowsing/laptopbrowsing').then(m => m.Laptopbrowsing),
                canActivate: [() => import('./core/guards/auth-guard').then(m => m.authGuard)]
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard),
                canActivate: [() => import('./core/guards/auth-guard').then(m => m.authGuard)]
            },
            {
                path: 'admin',
                loadComponent: () => import('./features/admin/admin').then(m => m.Admin),
                canActivate: [() => import('./core/guards/auth-guard').then(m => m.authGuard)]
            }
        ],
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)
    },

];
