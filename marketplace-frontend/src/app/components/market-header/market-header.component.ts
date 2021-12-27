import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Observable} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize, tap} from 'rxjs/operators';

import {SignInDialogComponent} from '../sign-in-dialog/sign-in-dialog.component';
import {SignUpDialogComponent} from '../sign-up-dialog/sign-up-dialog.component';
import {AuthorizationService} from '../../services/authorization.service';
import {Customer} from '../../models';
import {watchSubject} from '../../operators';

@UntilDestroy()
@Component({
    selector: 'market-header',
    templateUrl: './market-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketHeaderComponent implements OnInit {

    @HostBinding('class.market-header')
    public class: boolean = true;

    public _customerInfo: Customer;

    public _isArrowDown: boolean;

    public get _selectCustomerInfo$(): Observable<Customer> {
        this._spinnerService.show();

        return this._authService
            .getCustomerInfo()
            .pipe(finalize(() => this._spinnerService.hide()));
    }

    constructor(private _renderer: Renderer2,
                private _elRef: ElementRef,
                private _dialogService: MatDialog,
                private _translateService: TranslateService,
                private _authService: AuthorizationService,
                private _spinnerService: NgxSpinnerService,
                private _cdr: ChangeDetectorRef,
                private _router: Router) {
    }

    /* TODO (mipa): To cover this case Akita can be used */
    ngOnInit(): void {
        this._authService
            .onCustomerInfoChanged
            .pipe(
                tap((customer: Customer) => this._customerInfo = customer),
                watchSubject(this._cdr),
                untilDestroyed(this),
            )
            .subscribe();
    }

    _signIn(): void {
        this._dialogService.open<SignInDialogComponent>(SignInDialogComponent, {
            autoFocus: true,
            minWidth: '640px',
        });
    }

    _signUp(): void {
        this._dialogService.open<SignUpDialogComponent>(SignUpDialogComponent, {
            autoFocus: true,
            minWidth: '640px',
        });
    }

    _changeArrowState(): void {
        this._isArrowDown = !this._isArrowDown;
    }

    _goToAccountPage(): void {
        this._router.navigate(['/account']);
    }

    _logout(): void {
        this._spinnerService.show();

        this._authService
            .logout()
            .pipe(
                finalize(() => this._spinnerService.hide()),
                untilDestroyed(this),
            )
            .subscribe(() => {
                this._authService.changeCustomerInfo(null);
                this._router.navigateByUrl('/home');
            });
    }
}
