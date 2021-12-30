import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {filter, finalize} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';

import {AuthorizationService} from '../service';

@Injectable()
export class AccountAuthGuard implements CanActivate {

    constructor(private _router: Router,
                private _authService: AuthorizationService,
                private _spinnerService: NgxSpinnerService) {
    }

    canActivate(): Observable<boolean> {
        this._spinnerService.show();

        return this._authService
            .isAuthenticated()
            .pipe(
                filter((isAuth: boolean) => isAuth),
                finalize(() => this._spinnerService.hide()),
            );
    }
}
