import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {finalize} from 'rxjs/operators';

import {CommonDialog, Customer} from '../../models';
import {
    FIRST_NAME_LENGTH,
    FIRST_NAME_VALIDATOR,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_VALIDATOR,
    USERNAME_VALIDATOR,
} from '../../constants';
import {AuthorizationService} from '../../services/authorization.service';

@Component({
    selector: 'sign-up-dialog',
    templateUrl: './sign-up-dialog.component.html',
    host: {
        class: 'sign-up-dialog',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpDialogComponent implements OnInit, OnDestroy {

    /** @internal */
    _signUpFormGroup: FormGroup;

    /** @internal */
    _isPasswordHidden: boolean = true;

    /** @internal */
    _backgroundImageSrc: string = '/assets/images/back.jpeg';

    private _subs: Subscription = new Subscription();

    constructor(@Inject(MAT_DIALOG_DATA) public data: CommonDialog,
                private _dialogRef: MatDialogRef<SignUpDialogComponent>,
                private _translateService: TranslateService,
                private _spinnerService: NgxSpinnerService,
                private _toastService: ToastrService,
                private _authService: AuthorizationService) {
    }

    ngOnInit(): void {
        this._initFormGroup();
    }

    ngOnDestroy(): void {
        this._subs.unsubscribe();
    }

    /** @internal */
    _signUp(): void {
        this._spinnerService.show();
        const customer: Customer = {
            userName: this._signUpFormGroup.get('userName').value,
            firstName: this._signUpFormGroup.get('firstName').value,
            email: this._signUpFormGroup.get('email').value,
            password: this._signUpFormGroup.get('password').value,
        };
        this._subs.add(
            this._authService.signUp(customer).pipe(
                finalize(() => {
                    this._dialogRef.close();
                    this._spinnerService.hide();
                }),
            ).subscribe(
                (customer: Customer) => {
                    this._authService.changeCustomerInfo(customer);
                    this._toastService.success(
                        this._translateService.instant('sign-up-dialog.welcome', {
                            userName: customer.userName,
                        }),
                        this._translateService.instant('sign-up-dialog.login-success'),
                    );
                },
                (error: Error) => {
                    this._toastService.error(
                        this._translateService.instant('sign-up-dialog.login-error-message'),
                        this._translateService.instant('sign-up-dialog.login-error'),
                    );
                },
            ),
        );
    }

    /** @internal */
    _getErrorMessage(formControlName: string, onlyForRequiredValidator?: boolean): string {
        const formControl: AbstractControl = this._signUpFormGroup?.get(formControlName);

        if (formControl?.hasError('required')) {
            return this._translateService.instant('sign-in-dialog.required-validator');
        } else if (!onlyForRequiredValidator && formControl?.hasError('pattern')) {
            return this._translateService.instant('sign-in-dialog.username-pattern-validator');
        } else {
            return '';
        }
    }

    private _initFormGroup(): void {
        this._signUpFormGroup = new FormGroup({
            userName: new FormControl(
                '',
                [
                    Validators.required,
                    Validators.pattern(USERNAME_VALIDATOR),
                ]),
            firstName: new FormControl(
                '',
                [
                    Validators.required,
                    Validators.pattern(FIRST_NAME_VALIDATOR),
                    Validators.maxLength(FIRST_NAME_LENGTH),
                ],
            ),
            email: new FormControl(
                '',
                [
                    Validators.required,
                    Validators.email,
                ],
            ),
            password: new FormControl(
                '',
                [
                    Validators.required,
                    Validators.minLength(PASSWORD_MIN_LENGTH),
                    Validators.maxLength(PASSWORD_MAX_LENGTH),
                    Validators.pattern(PASSWORD_VALIDATOR),
                ],
            ),
        });
    }
}
