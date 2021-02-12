import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {MatDialogModule} from '@angular/material/dialog';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatCommonModule} from '@angular/material/core';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {SafeHtmlModule} from '../../pipes/safe-html/safe-html.module';
import {AuthorizationService} from '../../services/authorization.service';
import {SignUpDialogComponent} from './sign-up-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCommonModule,
        MatDialogModule,
        MatInputModule,
        MatIconModule,
        MatProgressSpinnerModule,
        OverlayModule,
        PortalModule,
        ReactiveFormsModule,
        SafeHtmlModule,
        ScrollingModule,
        TranslateModule,
    ],
    declarations: [
        SignUpDialogComponent,
    ],
    exports: [
        SignUpDialogComponent,
    ],
    providers: [
        AuthorizationService,
    ],
})
export class SignUpDialogModule {
}
