import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AccountAuthGuard} from './guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () => import('./module/market-home/market-home.module').then(m => m.MarketHomeModule),
    },
    {
        path: 'account',
        canActivate: [AccountAuthGuard],
        loadChildren: () => import('./module/market-account/market-account.module').then(m => m.MarketAccountModule),
    },
    {
        path: '**',
        redirectTo: '/home',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        AccountAuthGuard,
    ],
})
export class AppRoutingModule {
}
