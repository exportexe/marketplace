import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {Customer} from '../../../../shared/models/authorization/customer.model';

@Component({
    selector: 'account-card',
    templateUrl: './account-card.component.html',
    styleUrls: ['./account-card.component.less'],
    host: {
        class: 'account-card',
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountCardComponent {

    @Input()
    set customerInfo(customer: Customer) {
        this._customerInfo = customer;
    }

    /** @internal */
    _customerInfo: Customer;
}
