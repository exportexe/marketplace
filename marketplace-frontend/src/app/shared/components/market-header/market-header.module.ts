import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {MarketHeaderComponent} from './market-header.component';
import {SafeHtmlModule} from '../../pipes/safe-html/safe-html.module';
import {SignInDialogModule} from '../sign-in-dialog/sign-in-dialog.module';
import {SignUpDialogModule} from '../sign-up-dialog/sign-up-dialog.module';

@NgModule({
    imports: [
        CommonModule,
        SafeHtmlModule,
        SignInDialogModule,
        SignUpDialogModule,
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
