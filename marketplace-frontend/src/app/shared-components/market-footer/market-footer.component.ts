import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'market-footer',
    templateUrl: './market-footer.component.html',
    styleUrls: ['./market-footer.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'market-footer',
    },
})
export class MarketFooterComponent {

}
