import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {MatMenuModule} from '@angular/material/menu';

import {MarketHeaderComponent} from './market-header.component';
import {SafeHtmlModule} from '../../pipe';
import {SignInDialogModule} from '../sign-in-dialog/sign-in-dialog.module';
import {SignUpDialogModule} from '../sign-up-dialog/sign-up-dialog.module';

@NgModule({
    imports: [
        CommonModule,
        MatMenuModule,
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
