import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {EMPTY, Observable, ReplaySubject} from 'rxjs';
import {BACKEND_SERVER, REFRESH_TOKEN_COOKIE_NAME} from '../constant';
import {AuthEndpoint} from '../enums';

import {Customer, CustomerAuthPayload, CustomerCredentials, CustomerDto, CustomerFormData} from '../model';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {

    public get onCustomerInfoChanged$(): Observable<Customer> {
        return AuthorizationService._onCustomerInfoChanged$;
    }

    public get onAuthStatusChanged$(): Observable<boolean> {
        return AuthorizationService._onAuthStatusChanged$;
    }

    private static _onCustomerInfoChanged$: ReplaySubject<Customer> = new ReplaySubject<Customer>(1);

    private static _onAuthStatusChanged$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

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

    public signIn(credentials: CustomerCredentials): Observable<CustomerDto> {
        return this._http.post<CustomerDto>(BACKEND_SERVER + AuthEndpoint.SignIn, credentials, {
            withCredentials: true,
        });
    }

    public register(customerInfo: CustomerFormData): Observable<CustomerDto> {
        return this._http.post<CustomerDto>(BACKEND_SERVER + AuthEndpoint.Register, customerInfo, {
            withCredentials: true,
        });
    }

    public logout(): Observable<void> {
        return this._http.post<void>(BACKEND_SERVER + AuthEndpoint.Logout, {}, {
            withCredentials: true,
        });
    }

    public getCustomerInfo(): Observable<CustomerAuthPayload> {
        return this._http.get<CustomerAuthPayload>(BACKEND_SERVER + AuthEndpoint.GetCustomerInfo, {
            withCredentials: true,
        });
    }

    public changeCustomerInfo(customer: Customer): void {
        AuthorizationService._onCustomerInfoChanged$.next(customer);
    }

    public changeAuthStatus(isAuth: boolean): void {
        AuthorizationService._onAuthStatusChanged$.next(isAuth);
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
