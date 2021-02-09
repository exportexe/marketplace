import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'market-home',
    templateUrl: './market-home.component.html',
    styleUrls: ['./market-home.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'market-home',
    },
})
export class MarketHomeComponent {

}
