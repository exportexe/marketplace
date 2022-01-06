import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

import {SafeHtmlModule} from '../../pipes';
import {MarketFooterComponent} from './market-footer.component';

@NgModule({
    imports: [
        CommonModule,
        SafeHtmlModule,
        TranslateModule,
    ],
    declarations: [
        MarketFooterComponent,
    ],
    exports: [
        MarketFooterComponent,
    ],
})
export class MarketFooterModule {
}
