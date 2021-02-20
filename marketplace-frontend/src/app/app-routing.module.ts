import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/market-home/market-home.module').then(m => m.MarketHomeModule),
    },
    {
        path: 'account',
        loadChildren: () => import('./pages/market-account/market-account.module').then(m => m.MarketAccountModule),
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
})
export class AppRoutingModule {
}
