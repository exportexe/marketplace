import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';

import {Customer, CustomerCredentials} from '../models';
import {BACKEND_SERVER} from '../constants';
import {AuthEndpoint} from '../enums';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {

    private static _onCustomerInfoChanged$: ReplaySubject<Customer> = new ReplaySubject<Customer>(1);

    public get onCustomerInfoChanged(): Observable<Customer> {
        return AuthorizationService._onCustomerInfoChanged$.asObservable();
    }

    constructor(private _http: HttpClient) {
    }

    public signIn(credentials: CustomerCredentials): Observable<Customer> {
        return this._http.post<Customer>(BACKEND_SERVER + AuthEndpoint.SignIn, credentials, {
            withCredentials: true,
        });
    }

    public signUp(customerInfo: Customer): Observable<Customer> {
        return this._http.post<Customer>(BACKEND_SERVER + AuthEndpoint.SignUp, customerInfo, {
            withCredentials: true,
        });
    }

    public getCustomerInfo(userName?: string): Observable<Customer> {
        return this._http.post<Customer>(BACKEND_SERVER + AuthEndpoint.GetCustomerInfo, {userName}, {
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

    public changeCustomerInfo(customer: Customer): void {
        AuthorizationService._onCustomerInfoChanged$.next(customer);
    }
}
