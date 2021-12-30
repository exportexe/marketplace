import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {IntersectionObserverModule} from '@ng-web-apis/intersection-observer';

import {SafeHtmlModule} from '../../pipe';
import {MarketFooterComponent} from './market-footer.component';

@NgModule({
    imports: [
        CommonModule,
        SafeHtmlModule,
        TranslateModule,
        IntersectionObserverModule,
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
