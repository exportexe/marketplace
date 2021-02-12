import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {MatDialogModule} from '@angular/material/dialog';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatCommonModule} from '@angular/material/core';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';

import {CommonDialogComponent} from './common-dialog.component';
import {SafeHtmlModule} from '../../pipes/safe-html/safe-html.module';

@NgModule({
    imports: [
        CommonModule,
        MatCommonModule,
        MatDialogModule,
        OverlayModule,
        PortalModule,
        SafeHtmlModule,
        ScrollingModule,
        TranslateModule,
    ],
    declarations: [
        CommonDialogComponent,
    ],
    exports: [
        CommonDialogComponent,
    ],
})
export class CommonDialogModule {
}
