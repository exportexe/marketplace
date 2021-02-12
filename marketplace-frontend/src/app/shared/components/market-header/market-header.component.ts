import {ChangeDetectionStrategy, Component, ElementRef, HostListener, Renderer2} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';

import {SignInDialogComponent} from '../sign-in-dialog/sign-in-dialog.component';
import {SignUpDialogComponent} from '../sign-up-dialog/sign-up-dialog.component';

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
                private _elRef: ElementRef,
                private _dialogService: MatDialog,
                private _translateService: TranslateService) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(): void {
        this._checkHeaderPosition();
    }

    /** @internal */
    _signIn(): void {
        this._dialogService.open(SignInDialogComponent, {
            autoFocus: true,
            minWidth: '640px',
        });
    }

    /** @internal */
    _signUp(): void {
        this._dialogService.open(SignUpDialogComponent, {
            autoFocus: true,
            minWidth: '640px',
        });
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
