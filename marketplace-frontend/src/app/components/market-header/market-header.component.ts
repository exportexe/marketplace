import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Observable} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs/operators';

import {SignInDialogComponent} from '../sign-in-dialog/sign-in-dialog.component';
import {SignUpDialogComponent} from '../sign-up-dialog/sign-up-dialog.component';
import {AuthorizationService} from '../../services';
import {Customer} from '../../models';

@UntilDestroy()
@Component({
    selector: 'market-header',
    templateUrl: './market-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketHeaderComponent {

    @HostBinding('class.market-header')
    class: boolean = true;

    /** @internal */
    _isArrowDown: boolean;

    /** @internal */
    _selectCustomerInfo$: Observable<Customer> = this._authService.onCustomerInfoChanged$;

    constructor(private _renderer: Renderer2,
                private _elRef: ElementRef,
                private _dialogService: MatDialog,
                private _translateService: TranslateService,
                private _authService: AuthorizationService,
                private _spinnerService: NgxSpinnerService,
                private _cdr: ChangeDetectorRef,
                private _router: Router) {
    }

    /** @internal */
    _signIn(): void {
        this._dialogService.open<SignInDialogComponent>(SignInDialogComponent, {
            autoFocus: true,
            minWidth: '640px',
        });
    }

    /** @internal */
    _signUp(): void {
        this._dialogService.open<SignUpDialogComponent>(SignUpDialogComponent, {
            autoFocus: true,
            minWidth: '640px',
        });
    }

    /** @internal */
    _changeArrowState(): void {
        this._isArrowDown = !this._isArrowDown;
    }

    /** @internal */
    _goToAccountPage(): void {
        this._router.navigate(['/account']);
    }

    /** @internal */
    _logout(): void {
        this._spinnerService.show();

        this._authService
            .logout()
            .pipe(
                untilDestroyed(this),
                finalize(() => this._spinnerService.hide()),
            )
            .subscribe(() => {
                this._authService.changeCustomerInfo(null);
                this._router.navigateByUrl('/home');
            });
    }
}
