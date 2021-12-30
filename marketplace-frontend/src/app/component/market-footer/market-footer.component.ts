import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';

@Component({
    selector: 'market-footer',
    templateUrl: './market-footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketFooterComponent {

    @HostBinding('class.market-footer')
    public class: boolean = true;

    public _onIntersectionObserverEvent(event: IntersectionObserverEntry[]): void {
        console.log(event[0].isIntersecting);
    }
}
