import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'market-footer',
    templateUrl: './market-footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'market-footer',
    },
})
export class MarketFooterComponent {

}
