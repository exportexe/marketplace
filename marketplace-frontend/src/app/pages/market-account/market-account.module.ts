import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MarketAccountComponent} from './market-account.component';
import {MarketAccountRoutingModule} from './market-account-routing.module';
import {AccountCardComponent} from './components/account-card/account-card.component';

@NgModule({
    imports: [
        CommonModule,
        MarketAccountRoutingModule,
    ],
    declarations: [
        AccountCardComponent,
        MarketAccountComponent,
    ],
})
export class MarketAccountModule {
}
