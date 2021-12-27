import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AccountAuthGuard} from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () => import('./modules/market-home/market-home.module').then(m => m.MarketHomeModule),
    },
    {
        path: 'account',
        canActivate: [AccountAuthGuard],
        loadChildren: () => import('./modules/market-account/market-account.module').then(m => m.MarketAccountModule),
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
