import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';

import {Customer} from '../models/authorization/customer.model';
import {CustomerCredentials} from '../models/authorization/customer-credentials.model';
import {BACKEND_SERVER} from '../constants/backend-server-payload';

const SIGN_IN = '/api/auth/login';
const SIGN_UP = '/api/auth/register';
const LOGOUT = '/api/auth/logout';
const GET_CUSTOMER = '/api/auth/account';

@Injectable()
export class AuthorizationService {

    private static _onCustomerInfoChanged$: ReplaySubject<Customer> = new ReplaySubject<Customer>(1);

    get onCustomerInfoChanged(): Observable<Customer> {
        return AuthorizationService._onCustomerInfoChanged$.asObservable();
    }

    constructor(private _http: HttpClient) {
    }

    public signIn(credentials: CustomerCredentials): Observable<Customer> {
        return this._http.post<Customer>(BACKEND_SERVER + SIGN_IN, credentials, {
            withCredentials: true,
        });
    }

    public signUp(customerInfo: Customer): Observable<Customer> {
        return this._http.post<Customer>(BACKEND_SERVER + SIGN_UP, customerInfo, {
            withCredentials: true,
        });
    }

    public getCustomerInfo(userName?: string): Observable<Customer> {
        return this._http.post<Customer>(BACKEND_SERVER + GET_CUSTOMER, {userName}, {
            withCredentials: true,
        });
    }

    public logout(): Observable<void> {
        return this._http.get<void>(BACKEND_SERVER + LOGOUT, {
            withCredentials: true,
        });
    }

    public changeCustomerInfo(customer: Customer): void {
        AuthorizationService._onCustomerInfoChanged$.next(customer);
    }
}
