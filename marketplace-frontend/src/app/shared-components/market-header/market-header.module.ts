import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {MarketHeaderComponent} from './market-header.component';
import {SafeHtmlModule} from '../../pipes/safe-html/safe-html.module';

@NgModule({
    imports: [
        CommonModule,
        SafeHtmlModule,
        TranslateModule,
    ],
    declarations: [
        MarketHeaderComponent,
    ],
    exports: [
        MarketHeaderComponent,
    ],
})
export class MarketHeaderModule {
}
