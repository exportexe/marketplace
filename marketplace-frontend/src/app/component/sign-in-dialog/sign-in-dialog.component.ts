import {ChangeDetectionStrategy, Component, HostBinding, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {EMPTY} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';

import {CommonDialog, Customer, SocialIcon} from '../../model';
import {PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, USERNAME_VALIDATOR} from '../../constant';
import {AuthorizationService} from '../../service';
import {SignUpDialogComponent} from '../sign-up-dialog/sign-up-dialog.component';

@UntilDestroy()
@Component({
    selector: 'sign-in-dialog',
    templateUrl: './sign-in-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInDialogComponent implements OnInit {

    @HostBinding('class.sign-in-dialog')
    public class: boolean = true;

    /** @internal */
    _signInFormGroup: FormGroup;

    /** @internal */
    _isPasswordHidden: boolean = true;

    /** @internal */
    _imageLinks: SocialIcon[] = [
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

    constructor(@Inject(MAT_DIALOG_DATA) public data: CommonDialog,
                private _dialogRef: MatDialogRef<SignInDialogComponent>,
                private _translateService: TranslateService,
                private _spinnerService: NgxSpinnerService,
                private _toastService: ToastrService,
                private _authService: AuthorizationService,
                private _dialogService: MatDialog) {
    }

    ngOnInit(): void {
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

    /** @internal */
    _signIn(): void {
        this._spinnerService.show();
        this._authService
            .signIn({
                userName: this._signInFormGroup.get('userName').value,
                password: this._signInFormGroup.get('password').value,
            })
            .pipe(
                tap((customer: Customer) => {
                    this._authService.changeCustomerInfo(customer);
                    this._toastService.success(
                        this._translateService.instant('sign-in-dialog.welcome', {
                            userName: customer.userName,
                        }),
                        this._translateService.instant('sign-in-dialog.login-success'),
                    );
                }),
                catchError(() => {
                    this._toastService.error(
                        this._translateService.instant('sign-in-dialog.login-error-message'),
                        this._translateService.instant('sign-in-dialog.login-error'),
                    );

                    return EMPTY;
                }),
                untilDestroyed(this),
                finalize(() => {
                    this._dialogRef.close();
                    this._spinnerService.hide();
                }),
            )
            .subscribe();
    }

    /** @internal */
    _goToSignUp(): void {
        this._dialogRef.close();
        this._dialogService.open(SignUpDialogComponent, {autoFocus: true, minWidth: '640px'});
    }

    /** @internal */
    _trackByImages(index: number): number {
        return index;
    }
}
