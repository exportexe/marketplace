import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs/operators';

import {SignInDialogComponent} from '../sign-in-dialog/sign-in-dialog.component';
import {SignUpDialogComponent} from '../sign-up-dialog/sign-up-dialog.component';
import {AuthorizationService} from '../../services/authorization.service';
import {Customer} from '../../models/authorization/customer.model';

declare var window;

const STICKY_HEADER_CLASS: string = 'market-header_sticky';

@Component({
    selector: 'market-header',
    templateUrl: './market-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'market-header',
    },
})
export class MarketHeaderComponent implements OnInit, OnDestroy {

    /** @internal */
    _customerInfo: Customer;

    private _subs: Subscription[] = [];

    constructor(private _renderer: Renderer2,
                private _elRef: ElementRef,
                private _dialogService: MatDialog,
                private _translateService: TranslateService,
                private _authService: AuthorizationService,
                private _cookieService: CookieService,
                private _spinnerService: NgxSpinnerService,
                private _cdr: ChangeDetectorRef) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(): void {
        this._checkHeaderPosition();
    }

    ngOnInit(): void {
        this._initSubscriptions();
    }

    ngOnDestroy(): void {
        this._subs.forEach((sub: Subscription) => sub.unsubscribe());
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

    private _initSubscriptions(): void {
        this._spinnerService.show();
        this._subs.push(
            this._authService.getCustomerInfo().pipe(
                finalize(() => this._spinnerService.hide()),
            ).subscribe(
                (customer: Customer) => {
                    this._customerInfo = customer;
                    this._cdr.markForCheck();
                },
            ),
        );
        this._subs.push(
            this._authService.onCustomerInfoChanged.subscribe(
                (customer: Customer) => {
                    this._customerInfo = customer;
                    this._cdr.markForCheck();
                },
            ),
        );
    }
}
