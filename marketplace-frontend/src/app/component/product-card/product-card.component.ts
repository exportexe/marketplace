import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

import {Product} from '../../model';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {

    @HostBinding('class.product-card')
    class: boolean = true;

    @Input()
    product: Product;
}
