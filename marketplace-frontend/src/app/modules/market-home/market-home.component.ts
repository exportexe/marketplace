import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';

import {Product} from '../../models/product.model';

@Component({
    selector: 'market-home',
    templateUrl: './market-home.component.html',
    styleUrls: ['./market-home.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketHomeComponent {

    @HostBinding('class.market-home')
    public class: true;

    public _products: Product[] = [
        {
            id: '1',
            name: 'Apple',
            brand: 'AirPods Pro',
            imageSrc: 'https://images.a1.by/medias/sys_master/h03/h71/8966387695646.png',
            imageAlt: 'Apple AirPods Pro',
            rating: 4.8,
            price: {
                amount: 100.00,
                integer: '100',
                fractional: '00',
                currency: '$',
            },
            description: 'AirPods will forever change the way you use headphones. Whenever you pull your AirPods out of the charging case, they instantly turn on and connect to your iPhone, Apple Watch, iPad, or Mac. Audio automatically plays as soon as you put them in your ears and pauses when you take them out.',
        },
        {
            id: '2',
            name: 'Apple',
            brand: 'AirPods Pro',
            imageSrc: 'https://images.a1.by/medias/sys_master/h03/h71/8966387695646.png',
            imageAlt: 'Apple AirPods Pro',
            rating: 4.8,
            price: {
                amount: 100.00,
                integer: '100',
                fractional: '00',
                currency: '$',
            },
            description: 'AirPods will forever change the way you use headphones. Whenever you pull your AirPods out of the charging case, they instantly turn on and connect to your iPhone, Apple Watch, iPad, or Mac. Audio automatically plays as soon as you put them in your ears and pauses when you take them out.',
        },
        {
            id: '3',
            name: 'Apple',
            brand: 'AirPods Pro',
            imageSrc: 'https://images.a1.by/medias/sys_master/h03/h71/8966387695646.png',
            imageAlt: 'Apple AirPods Pro',
            rating: 4.8,
            price: {
                amount: 100.00,
                integer: '100',
                fractional: '00',
                currency: '$',
            },
            description: 'AirPods will forever change the way you use headphones. Whenever you pull your AirPods out of the charging case, they instantly turn on and connect to your iPhone, Apple Watch, iPad, or Mac. Audio automatically plays as soon as you put them in your ears and pauses when you take them out.',
        },
    ];

    public _trackByProducts(index: number): number {
        return index;
    }
}
