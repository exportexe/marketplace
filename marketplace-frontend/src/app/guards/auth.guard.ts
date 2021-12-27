import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {finalize, switchMap} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';

import {AuthorizationService} from '../services/authorization.service';

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
                switchMap((isAuth: boolean) => of(isAuth)),
                finalize(() => this._spinnerService.hide()),
            );
    }
}
