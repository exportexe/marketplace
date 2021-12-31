import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {filter, tap} from 'rxjs/operators';

import {environment} from '../environments/environment';
import {AuthorizationService} from './service';
import {Customer} from './model';

@UntilDestroy()
@Component({
    selector: 'app-marketplace',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

    constructor(private _translateService: TranslateService,
                private _authService: AuthorizationService) {
    }

    ngOnInit(): void {
        this._translateService.setDefaultLang(environment.defaultLocale);
        this._authService
            .getCustomerInfo()
            .pipe(
                filter(Boolean),
                tap((customer: Customer) => this._authService.changeCustomerInfo(customer)),
                untilDestroyed(this),
            )
            .subscribe();
    }
}
