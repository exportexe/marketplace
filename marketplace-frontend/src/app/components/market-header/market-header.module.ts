import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {TranslateModule} from '@ngx-translate/core';

import {InitVarModule} from '../../directives';
import {SafeHtmlModule} from '../../pipes';
import {SignInDialogModule} from '../sign-in-dialog/sign-in-dialog.module';
import {SignUpDialogModule} from '../sign-up-dialog/sign-up-dialog.module';
import {MarketHeaderComponent} from './market-header.component';

@NgModule({
    imports: [
        CommonModule,
        MatMenuModule,
        SafeHtmlModule,
        SignInDialogModule,
        SignUpDialogModule,
        TranslateModule,
        InitVarModule,
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
