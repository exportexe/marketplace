import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MarketHomeRoutingModule} from './market-home-routing.module';
import {MarketHomeComponent} from './market-home.component';
import {ProductCardModule} from '../../component/product-card/product-card.module';

@NgModule({
    imports: [
        CommonModule,
        MarketHomeRoutingModule,
        ProductCardModule,
    ],
    declarations: [
        MarketHomeComponent,
    ],
})
export class MarketHomeModule {
}
