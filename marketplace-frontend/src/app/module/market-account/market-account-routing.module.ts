import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {marketAccountRoutes} from './routes/market-account-routes';

@NgModule({
    imports: [
        RouterModule.forChild(marketAccountRoutes),
    ],
    exports: [
        RouterModule,
    ],
})
export class MarketAccountRoutingModule {
}
