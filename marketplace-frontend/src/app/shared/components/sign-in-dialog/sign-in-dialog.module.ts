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

import {SignInDialogComponent} from './sign-in-dialog.component';
import {SafeHtmlModule} from '../../pipes/safe-html/safe-html.module';
import {AuthorizationService} from '../../services/authorization.service';
import {SignUpDialogModule} from '../sign-up-dialog/sign-up-dialog.module';

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
        SignUpDialogModule,
        TranslateModule,
    ],
    declarations: [
        SignInDialogComponent,
    ],
    exports: [
        SignInDialogComponent,
    ],
    providers: [
        AuthorizationService,
    ],
})
export class SignInDialogModule {
}
