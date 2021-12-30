import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable, ReplaySubject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

import {Customer, CustomerCredentials} from '../model';
import {BACKEND_SERVER, REFRESH_TOKEN_COOKIE_NAME} from '../constant';
import {AuthEndpoint} from '../enum';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {

    public get onCustomerInfoChanged$(): Observable<Customer> {
        return AuthorizationService._onCustomerInfoChanged$.asObservable();
    }

    private static _onCustomerInfoChanged$: ReplaySubject<Customer> = new ReplaySubject<Customer>(1);

    constructor(private _http: HttpClient,
                private _cookiesService: CookieService) {
    }

    public renewJWTSession(): Observable<string | never> {
        if (!this._isRefreshTokenNeeded()) {
            return EMPTY;
        }

        return this._http.post<string>(
            BACKEND_SERVER + AuthEndpoint.RefreshSession,
            {
                refreshToken: this._cookiesService.get(REFRESH_TOKEN_COOKIE_NAME),
            },
            {
                withCredentials: true,
            },
        );
    }

    public signIn(credentials: CustomerCredentials): Observable<Customer> {
        return this._http.post<Customer>(BACKEND_SERVER + AuthEndpoint.SignIn, credentials, {
            withCredentials: true,
        });
    }

    public register(customerInfo: Customer): Observable<Customer> {
        return this._http.post<Customer>(BACKEND_SERVER + AuthEndpoint.Register, customerInfo, {
            withCredentials: true,
        });
    }

    public logout(): Observable<void> {
        return this._http.post<void>(BACKEND_SERVER + AuthEndpoint.Logout, {}, {
            withCredentials: true,
        });
    }

    public isAuthenticated(): Observable<boolean> {
        return this._http.get<boolean>(BACKEND_SERVER + AuthEndpoint.IsAuthenticated, {
            withCredentials: true,
        });
    }

    public getCustomerInfo(): Observable<Customer> {
        return this._http.get<Customer>(BACKEND_SERVER + AuthEndpoint.GetCustomerInfo, {
            withCredentials: true,
        });
    }

    public changeCustomerInfo(customer: Customer): void {
        AuthorizationService._onCustomerInfoChanged$.next(customer);
    }

    private _isRefreshTokenNeeded(): boolean {
        const expiresAtCookie: number = +this._cookiesService.get('token_expires_at');

        if (!expiresAtCookie) {
            return false;
        }

        const timeBeforeTokenShouldBeRefreshed: number = 60000;

        return Date.now() > (expiresAtCookie - timeBeforeTokenShouldBeRefreshed);
    }
}
