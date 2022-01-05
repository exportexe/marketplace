import {Body, CACHE_MANAGER, Controller, Get, Inject, Post, Req, Res, UnauthorizedException} from '@nestjs/common';
import {Cache} from 'cache-manager';
import {Request, Response} from 'express';

import {LoginRequestDto, RegisterRequestDto} from '../../../dto';
import {ICustomer} from '../../../schemas';
import {CustomerDto} from '../../../dto';
import {customerToDtoMapper} from '../../../mappers';
import {AbstractCustomersService, AbstractTokensService} from '../../../services';

const EXPIRES_IN: number = 60 * 60 * 24 * 30;
const JWT_COOKIE_ID: string = process.env.REFRESH_TOKEN_COOKIE;
const CACHE_CUSTOMER_ID: string = 'id_';
const COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: EXPIRES_IN,
    path: process.env.COOKIE_PATH,
    domain: process.env.DOMAIN,
};

@Controller('/api/v1/auth')
export class AuthController {

    constructor(@Inject(CACHE_MANAGER) private _cacheManager: Cache,
                private _customersService: AbstractCustomersService,
                private _tokensService: AbstractTokensService) {
    }

    @Get('/account')
    async getCustomerInfoFromJWT(@Req() request: Request): Promise<{ customerInfo?: CustomerDto, isAuth: boolean }> {
        const tokenFromRequestCookie: string = request.cookies[JWT_COOKIE_ID];

        if (!tokenFromRequestCookie) {
            return {isAuth: false};
        }

        const {sub} = await this._tokensService.decodeAndVerifyTokenAsync(tokenFromRequestCookie);
        const customerInfoCacheId: string = `${CACHE_CUSTOMER_ID}${sub}`;
        const customerFromCache: CustomerDto = await this._cacheManager.get(customerInfoCacheId);

        if (customerFromCache) {
            return {customerInfo: customerFromCache, isAuth: true};
        }

        const customer: CustomerDto = customerToDtoMapper(await this._customersService.findCustomerById(sub));
        await this._cacheManager.set(customerInfoCacheId, customer);

        return {customerInfo: customer, isAuth: true};
    }

    @Post('/register')
    async register(@Body() body: RegisterRequestDto, @Res({passthrough: true}) response: Response): Promise<CustomerDto> {
        const createCustomerInstance: ICustomer = await this._customersService.createCustomerFromRequest(body);

        return await this._getCachedCustomerAndGenerateToken(createCustomerInstance, response);
    }

    @Post('/login')
    async login(@Body() body: LoginRequestDto, @Res({passthrough: true}) response: Response): Promise<CustomerDto> {
        const {userName, password} = body;
        const customerFromDB: ICustomer = await this._customersService.findCustomerByUserName(userName);
        const isPasswordValid: boolean = customerFromDB && await this._customersService.validateCredentials(password, customerFromDB.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('LOGIN_OR_PASSWORD_INVALID');
        }

        return await this._getCachedCustomerAndGenerateToken(customerFromDB, response);
    }

    @Post('/logout')
    async logout(@Req() request: Request, @Res({passthrough: true}) response: Response): Promise<void> {
        const {sub} = this._tokensService.decodeToken(request.cookies[JWT_COOKIE_ID]);

        await this._cacheManager.del(`${CACHE_CUSTOMER_ID}${sub}`);

        response.clearCookie(JWT_COOKIE_ID, COOKIE_OPTIONS);
    }

    /*@Post('/refresh')
    async refresh(@Body() body: RefreshRequest, @Res({passthrough: true}) response: Response): Promise<CustomerDto> {
        const token: string = body.refreshToken;
        const {customer} = await this._tokensService.decodeAndVerifyAsyncRefreshToken(token);
        const tokensPayload: AuthPayload = createAuthPayloadResponse(customerToDtoMapper(customer), token);

        await this._setUserDataToCacheAndAddJWTCookiesToResponse(tokensPayload, response);

        return tokensPayload.customer;
    }*/

    private async _getCachedCustomerAndGenerateToken(createdCustomer: ICustomer, response: Response): Promise<CustomerDto> {
        const customer: CustomerDto = customerToDtoMapper(createdCustomer);
        const customerId: string = createdCustomer.id;

        //Set jwt to cookie response
        response.cookie(
            JWT_COOKIE_ID,
            await this._tokensService.generateToken(customerId, EXPIRES_IN),
            COOKIE_OPTIONS,
        );

        //Add customer info to cache
        await this._cacheManager.set(`${CACHE_CUSTOMER_ID}${customerId}`, customer);

        return customer;
    }
}
