import {ChangeDetectionStrategy, Component, ElementRef, HostListener, Renderer2} from '@angular/core';

declare var window;

const STICKY_HEADER_CLASS = 'market-header_sticky';

@Component({
    selector: 'market-header',
    templateUrl: './market-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'market-header',
    },
})
export class MarketHeaderComponent {

    constructor(private _renderer: Renderer2,
                private _elRef: ElementRef) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(): void {
        this._checkHeaderPosition();
    }

    /** @internal */
    _signIn(): void {

    }

    /** @internal */
    _signUp(): void {

    }

    private _checkHeaderPosition(): void {
        const headerRef: ElementRef = this._elRef;
        if (window.pageYOffset > headerRef.nativeElement.offsetTop) {
            this._renderer.addClass(headerRef.nativeElement, STICKY_HEADER_CLASS);
        } else {
            this._renderer.removeClass(headerRef.nativeElement, STICKY_HEADER_CLASS);
        }
    }
}
