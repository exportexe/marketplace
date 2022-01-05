import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {TranslateService} from '@ngx-translate/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {Customer} from '../../model';
import {showSpinner} from '../../operator';
import {AuthorizationService, DialogService} from '../../service';
import {AppStoreService} from '../../store/app-store.service';
import {SignInDialogComponent} from '../sign-in-dialog/sign-in-dialog.component';
import {SignUpDialogComponent} from '../sign-up-dialog/sign-up-dialog.component';

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

    /** @internal */
    _languages: string[] = this._translateService.getLangs();

    /** @internal */
    _selectedLang: Observable<string> = this._appStoreService.currentLang$;

    @Output()
    onSidenavOpened: EventEmitter<void> = new EventEmitter<void>();

    constructor(private _dialogService: DialogService,
                private _authService: AuthorizationService,
                private _spinnerService: NgxSpinnerService,
                private _router: Router,
                private _translateService: TranslateService,
                private _appStoreService: AppStoreService) {
    }

    /** @internal */
    _openSidenav(): void {
        this.onSidenavOpened.emit();
    }

    /** @internal */
    _signIn(): void {
        this._dialogService.openDialog(SignInDialogComponent);
    }

    /** @internal */
    _signUp(): void {
        this._dialogService.openDialog(SignUpDialogComponent);
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
    _changeLanguage(selectedLanguage: string): void {
        this._translateService.use(selectedLanguage);
    }

    /** @internal */
    _logout(): void {
        this._authService
            .logout()
            .pipe(
                showSpinner(this._spinnerService),
                tap(() => {
                    this._authService.changeCustomerInfo(null);
                    this._authService.changeAuthStatus(false);
                    this._router.navigateByUrl('/home');
                }),
                untilDestroyed(this),
            )
            .subscribe();
    }

    /** @internal */
    _trackByLanguages(index: number): number {
        return index;
    }
}
