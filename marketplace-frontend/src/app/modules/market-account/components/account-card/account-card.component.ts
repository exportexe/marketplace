import {ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';
import {Customer} from '../../../../models/authorization/customer.model';

@Component({
    selector: 'account-card',
    templateUrl: './account-card.component.html',
    styleUrls: ['./account-card.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountCardComponent {

    @HostBinding('class.account-card')
    public class: boolean = true;

    @Input()
    set customerInfo(customer: Customer) {
        this._customerInfo = customer;
    }

    /** @internal */
    _customerInfo: Customer;
}
