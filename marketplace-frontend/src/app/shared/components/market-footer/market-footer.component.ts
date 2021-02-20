import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'market-footer',
    templateUrl: './market-footer.component.html',
    host: {
        'class': 'market-footer',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketFooterComponent {
}
