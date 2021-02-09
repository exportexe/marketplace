import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MarketHomeComponent} from './market-home.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        MarketHomeComponent,
    ],
    exports: [
        MarketHomeComponent,
    ],
})
export class MarketHomeModule {
}
