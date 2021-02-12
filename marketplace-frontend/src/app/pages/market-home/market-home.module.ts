import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MarketHomeRoutingModule} from './market-home-routing.module';
import {MarketHomeComponent} from './market-home.component';

@NgModule({
    imports: [
        CommonModule,
        MarketHomeRoutingModule,
    ],
    declarations: [
        MarketHomeComponent,
    ],
})
export class MarketHomeModule {
}
