import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MarketHomeComponent} from './pages/market-home/market-home.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: MarketHomeComponent},
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
