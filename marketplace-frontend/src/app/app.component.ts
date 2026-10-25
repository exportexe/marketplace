import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {TranslateService} from '@ngx-translate/core';
import {tap, take} from 'rxjs/operators';

import {environment} from '../environments/environment';
import {CustomerAuthPayload} from './models';
import {AuthorizationService} from './services';
import {AppStoreService} from './store/app-store.service';

@UntilDestroy()
@Component({
    selector: 'app-marketplace',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {

    /** @internal */
    _isPanelOpened: boolean;

    constructor(private _translateService: TranslateService,
                private _authService: AuthorizationService) {
    }

    ngOnInit(): void {
        this._translateService.addLangs(environment.locales);
        this._authService
            .getCustomerInfo()
            .pipe(
                take(1),
                tap((customerPayload: CustomerAuthPayload) => {
                    const {customerInfo, isAuth} = customerPayload;

                    this._authService.changeCustomerInfo(customerInfo);
                    this._authService.changeAuthStatus(isAuth);
                }),
                untilDestroyed(this),
            )
            .subscribe();
    }
}
