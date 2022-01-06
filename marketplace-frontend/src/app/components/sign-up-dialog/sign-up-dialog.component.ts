import {ChangeDetectionStrategy, Component, HostBinding, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {TranslateService} from '@ngx-translate/core';
import {NgxSpinnerService} from 'ngx-spinner';

import {CommonDialog} from '../../models';
import {
    FIRST_NAME_LENGTH,
    FIRST_NAME_VALIDATOR,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_VALIDATOR,
    USERNAME_VALIDATOR,
} from '../../constants';
import {showSpinner} from '../../operators';
import {SignUpDialogService} from './sign-up-dialog.service';

@UntilDestroy()
@Component({
    selector: 'sign-up-dialog',
    templateUrl: './sign-up-dialog.component.html',
    providers: [
        SignUpDialogService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpDialogComponent implements OnInit {

    @HostBinding('class.sign-up-dialog')
    class: boolean = true;

    /** @internal */
    _signUpFormGroup: FormGroup;

    /** @internal */
    _isPasswordHidden: boolean = true;

    /** @internal */
    _backgroundImageSrc: string = '/assets/images/back.jpeg';

    constructor(@Inject(MAT_DIALOG_DATA) public data: CommonDialog,
                private _translateService: TranslateService,
                private _signUpDialogService: SignUpDialogService,
                private _spinnerService: NgxSpinnerService) {
    }

    ngOnInit(): void {
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

    /** @internal */
    _signUp(): void {
        this._signUpDialogService
            .register({
                userName: this._signUpFormGroup.get('userName').value,
                firstName: this._signUpFormGroup.get('firstName').value,
                email: this._signUpFormGroup.get('email').value,
                password: this._signUpFormGroup.get('password').value,
            })
            .pipe(
                showSpinner(this._spinnerService),
                untilDestroyed(this),
            )
            .subscribe();
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
}
