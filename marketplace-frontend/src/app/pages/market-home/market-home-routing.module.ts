import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {marketHomeRoutes} from './routes/market-home-routes';

@NgModule({
    imports: [
        RouterModule.forChild(marketHomeRoutes),
    ],
    exports: [
        RouterModule,
    ],
})
export class MarketHomeRoutingModule {
}
