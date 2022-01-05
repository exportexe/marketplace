import {Injectable} from '@angular/core';
import {CanLoad} from '@angular/router';
import {Observable, take} from 'rxjs';

import {filterBoolean} from '../operator';
import {AuthorizationService} from '../service';

@Injectable()
export class AccountAuthGuard implements CanLoad {

    constructor(private _authService: AuthorizationService) {
    }

    canLoad(): Observable<boolean> {
        return this._authService
            .onAuthStatusChanged$
            .pipe(
                take(1),
                filterBoolean(),
            );
    }
}
