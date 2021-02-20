import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';

import {SignInDialogComponent} from '../sign-in-dialog/sign-in-dialog.component';
import {SignUpDialogComponent} from '../sign-up-dialog/sign-up-dialog.component';
import {AuthorizationService} from '../../services/authorization.service';
import {Customer} from '../../models/authorization/customer.model';

declare var window;

const STICKY_HEADER_CLASS: string = 'market-header_sticky';

@Component({
    selector: 'market-header',
    templateUrl: './market-header.component.html',
    host: {
        'class': 'market-header',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketHeaderComponent implements OnInit, OnDestroy {

    /** @internal */
    _customerInfo: Customer;

    /** @internal */
    _isArrowDown: boolean;

    private _subs: Subscription[] = [];

    constructor(private readonly _renderer: Renderer2,
                private readonly _elRef: ElementRef,
                private readonly _dialogService: MatDialog,
                private readonly _translateService: TranslateService,
                private readonly _authService: AuthorizationService,
                private readonly _spinnerService: NgxSpinnerService,
                private readonly _cdr: ChangeDetectorRef,
                private readonly _router: Router) {
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

    /** @internal */
    _changeArrowState(): void {
        this._isArrowDown = !this._isArrowDown;
    }

    /** @internal */
    async _goToAccountPage(): Promise<void> {
        await this._router.navigate(['/account']);
    }

    /** @internal */
    _logout(): void {
        this._spinnerService.show();
        this._subs.push(
            this._authService.logout()
                .pipe(finalize(() => this._spinnerService.hide()))
                .subscribe(() => {
                    this._authService.changeCustomerInfo(null);
                    this._router.navigateByUrl('/home');
                }),
        );
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
