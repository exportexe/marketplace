import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {SafeHtmlModule} from '../../pipes/safe-html/safe-html.module';
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
