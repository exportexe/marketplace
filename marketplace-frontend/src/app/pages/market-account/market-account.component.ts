import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs/operators';

import {AuthorizationService} from '../../shared/services/authorization.service';
import {Customer} from '../../shared/models/authorization/customer.model';

@Component({
    selector: 'market-account',
    templateUrl: './market-account.component.html',
    styleUrls: ['./market-account.component.less'],
    host: {
        class: 'market-account',
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketAccountComponent implements OnInit, OnDestroy {

    /** @internal */
    _customerInfo: Customer;

    private _subs: Subscription[] = [];

    constructor(private readonly _authService: AuthorizationService,
                private readonly _spinnerService: NgxSpinnerService,
                private readonly _cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this._spinnerService.show();
        this._subs.push(
            this._authService.getCustomerInfo().pipe(
                finalize(() => this._spinnerService.hide()),
            ).subscribe((customer: Customer) => {
                    this._customerInfo = customer;
                    this._cdr.markForCheck();
                },
            ),
        );
    }

    ngOnDestroy(): void {
        this._subs.forEach((sub: Subscription) => sub.unsubscribe());
    }
}
