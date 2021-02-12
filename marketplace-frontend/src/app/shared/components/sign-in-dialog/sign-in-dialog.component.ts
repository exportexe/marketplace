import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {finalize} from 'rxjs/operators';

import {CommonDialog} from '../../models/common-dialog.model';
import {PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, USERNAME_VALIDATOR} from '../../constants/validators';
import {AuthorizationService} from '../../services/authorization.service';
import {CustomerCredentials} from '../../models/authorization/customer-credentials.model';
import {Customer} from '../../models/authorization/customer.model';
import {SocialIcons} from '../../models/social-icons.model';
import {SignUpDialogComponent} from '../sign-up-dialog/sign-up-dialog.component';

@Component({
    selector: 'sign-in-dialog',
    templateUrl: './sign-in-dialog.component.html',
    host: {
        class: 'sign-in-dialog',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInDialogComponent implements OnInit, OnDestroy {

    /** @internal */
    _signInFormGroup: FormGroup;

    /** @internal */
    _isPasswordHidden: boolean = true;

    /** @internal */
    _imageLinks: SocialIcons[] = [
        {
            src: '/assets/images/facebook.png',
            link: 'https://facebook.com',
        },
        {
            src: '/assets/images/google.png',
            link: 'https://google.com',
        },
        {
            src: '/assets/images/twitter.png',
            link: 'https://twitter.com',
        },
        {
            src: '/assets/images/inst.png',
            link: 'https://insragram.com',
        },
    ];

    private _subs: Subscription = new Subscription();

    constructor(@Inject(MAT_DIALOG_DATA) public data: CommonDialog,
                private _dialogRef: MatDialogRef<SignInDialogComponent>,
                private _translateService: TranslateService,
                private _spinnerService: NgxSpinnerService,
                private _toastService: ToastrService,
                private _authService: AuthorizationService,
                private _dialogService: MatDialog) {
    }

    ngOnInit(): void {
        this._initFormGroup();
    }

    ngOnDestroy(): void {
        this._subs.unsubscribe();
    }

    /** @internal */
    _signIn(): void {
        this._spinnerService.show();
        const credentials: CustomerCredentials = {
            userName: this._signInFormGroup.get('userName').value,
            password: this._signInFormGroup.get('password').value,
        };
        this._subs.add(
            this._authService.signIn(credentials).pipe(
                finalize(() => {
                    this._dialogRef.close();
                    this._spinnerService.hide();
                }),
            ).subscribe(
                (customer: Customer) => {
                    this._toastService.success(
                        this._translateService.instant('sign-in-dialog.welcome', {
                            userName: customer.userName,
                        }),
                        this._translateService.instant('sign-in-dialog.login-success'),
                    );
                },
                (error: Error) => {
                    this._toastService.error(
                        this._translateService.instant('sign-in-dialog.login-error-message'),
                        this._translateService.instant('sign-in-dialog.login-error'),
                    );
                },
            ),
        );
    }

    /** @internal */
    _goToSignUp(): void {
        this._dialogRef.close();
        this._dialogService.open(SignUpDialogComponent, {
            autoFocus: true,
            minWidth: '640px',
        });
    }

    /** @internal */
    _getErrorMessageForUserName(formControlName: string, onlyForRequiredValidator?: boolean): string {
        const formControl: AbstractControl = this._signInFormGroup?.get(formControlName);

        if (formControl?.hasError('required')) {
            return this._translateService.instant('sign-in-dialog.required-validator');
        } else if (!onlyForRequiredValidator && formControl?.hasError('pattern')) {
            return this._translateService.instant('sign-in-dialog.username-pattern-validator');
        } else {
            return '';
        }
    }

    /** @internal */
    _trackByImages(index: number): number {
        return index;
    }

    private _initFormGroup(): void {
        this._signInFormGroup = new FormGroup({
            userName: new FormControl(
                '',
                [
                    Validators.required,
                    Validators.pattern(USERNAME_VALIDATOR),
                ]),
            password: new FormControl(
                '',
                [
                    Validators.required,
                    Validators.minLength(PASSWORD_MIN_LENGTH),
                    Validators.maxLength(PASSWORD_MAX_LENGTH),
                ],
            ),
        });
    }
}
