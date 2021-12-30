export const enum AuthEndpoint {
    SignIn = '/api/v1/auth/login',
    Register = '/api/v1/auth/register',
    Logout = '/api/v1/auth/logout',
    GetCustomerInfo = '/api/v1/auth/account',
    IsAuthenticated = '/api/v1/auth/loggedIn',
    RefreshSession = '/api/v1/auth/refresh',
}
