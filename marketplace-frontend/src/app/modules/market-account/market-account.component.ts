import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

import {AuthorizationService} from '../../services/authorization.service';
import {Customer} from '../../models/authorization/customer.model';
import {YuryService} from './services/yury.service';

@Component({
    selector: 'market-account',
    templateUrl: './market-account.component.html',
    styleUrls: ['./market-account.component.less'],
    providers: [
        YuryService,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketAccountComponent {

    @HostBinding('class.market-account')
    public class: boolean = true;

    /*TODO (mipa): Need to add Akita to cover case with loader */
    public get _selectCustomerInfo$(): Observable<Customer> {
        this._spinnerService.show();

        return this._authService
            .getCustomerInfo()
            .pipe(finalize(() => this._spinnerService.hide()));
    }

    constructor(private _authService: AuthorizationService,
                private _spinnerService: NgxSpinnerService,
                private _cdr: ChangeDetectorRef,
                private _yury: YuryService) {
    }
}
