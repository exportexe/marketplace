import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';

@Component({
    selector: 'market-footer',
    templateUrl: './market-footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketFooterComponent {

    @HostBinding('class.market-footer')
    class: boolean = true;

    /** @internal */
    _currentYear: number = new Date().getFullYear();
}
