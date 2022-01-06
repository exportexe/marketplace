import {Injectable} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {EMPTY, Observable, tap} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';

import {Customer, CustomerDto, CustomerFormData} from '../../models';
import {AuthorizationService} from '../../services';
import {SignUpDialogComponent} from './sign-up-dialog.component';

@Injectable()
export class SignUpDialogService {

    constructor(private _dialogRef: MatDialogRef<SignUpDialogComponent>,
                private _translateService: TranslateService,
                private _toastService: ToastrService,
                private _authService: AuthorizationService) {
    }

    public register(customerFormData: CustomerFormData): Observable<Customer> {
        return this._authService
            .register(customerFormData)
            .pipe(
                tap((customer: CustomerDto) => {
                    this._authService.changeCustomerInfo(customer);
                    this._authService.changeAuthStatus(true);
                    this._toastService.success(
                        this._translateService.instant('sign-up-dialog.welcome', {
                            userName: customer.userName,
                        }),
                        this._translateService.instant('sign-up-dialog.login-success'),
                    );
                }),
                catchError(() => {
                    this._toastService.error(
                        this._translateService.instant('sign-up-dialog.login-error-message'),
                        this._translateService.instant('sign-up-dialog.login-error'),
                    );

                    return EMPTY;
                }),
                finalize(() => this._dialogRef.close()),
            );
    }
}
