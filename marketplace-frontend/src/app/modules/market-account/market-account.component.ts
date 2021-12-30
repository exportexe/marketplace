import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs';

import {AuthorizationService} from '../../services';
import {Customer} from '../../models';
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
    class: boolean = true;

    /** @internal */
    _selectCustomerInfo$: Observable<Customer> = this._authService.onCustomerInfoChanged$;

    constructor(private _authService: AuthorizationService,
                private _spinnerService: NgxSpinnerService,
                private _cdr: ChangeDetectorRef,
                private _yury: YuryService) {
    }
}
