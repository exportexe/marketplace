import {Body, CACHE_MANAGER, Controller, Get, Inject, Post, Res, UnauthorizedException, UseFilters, UseGuards} from '@nestjs/common';
import {Cache} from 'cache-manager';
import {Response} from 'express';

import {Customer} from '../../../schema';
import {LoginRequest, RefreshRequest, RegisterRequest} from '../../../model';
import {AuthPayload} from '../model/auth-payload.model';
import {CustomerDto} from '../../customers/dto/customer.dto';
import {AuthExceptionFilter} from '../filter/auth-exceptions.filter';
import {customerToDtoMapper} from '../../customers/mapper/customer-to-dto.mapper';
import {JwtGuard} from '../../../guard';
import {AbstractCustomersService, AbstractTokensService} from '../../../service';
import {createAuthPayloadResponse} from '../util/auth.utils';

const EXPIRES_IN: number = 60 * 60 * 24 * 30;
const REFRESH_TOKEN: string = process.env.REFRESH_TOKEN;
const CUSTOMER_INFO: string = process.env.CUSTOMER_INFO;
const COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: EXPIRES_IN,
    path: process.env.COOKIE_PATH,
    domain: process.env.DOMAIN,
};

@Controller('/api/v1/auth')
@UseFilters(AuthExceptionFilter)
export class AuthController {

    constructor(@Inject(CACHE_MANAGER) private _cacheManager: Cache,
                private _customersService: AbstractCustomersService,
                private _tokensService: AbstractTokensService) {
    }

    @UseGuards(JwtGuard)
    @Get('/account')
    async getCustomerInfo(): Promise<CustomerDto> {
        //need to rewrite code here - get token from token

        /*const customer: Customer = await this._cacheManager.get(CUSTOMER_INFO);

        if (customer) {
            return customerToDtoMapper(customer);
        }
        */

        return null;
    }

    @Get('/loggedIn')
    async isAuthenticated(): Promise<boolean> {
        return true;
    }

    @Post('/register')
    async register(@Body() body: RegisterRequest, @Res({passthrough: true}) response: Response): Promise<CustomerDto> {
        /* OAuth - Generating Access and Refresh tokens*/
        const {customer} = await this._generateToken(
            await this._customersService.createCustomerFromRequest(body),
            response,
        );

        return customerToDtoMapper(customer);
    }

    @Post('/login')
    async login(@Body() body: LoginRequest, @Res({passthrough: true}) response: Response): Promise<CustomerDto> {
        const {userName, password} = body;
        const customer: Customer = await this._customersService.findCustomerByUserName(userName);
        const isPasswordValid: boolean = customer && await this._customersService.validateCredentials(password, customer.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('LOGIN_OR_PASSWORD_INVALID');
        }

        /* OAuth - Generating Access and Refresh tokens */
        const tokensPayload: AuthPayload = await this._generateToken(customer, response);

        return customerToDtoMapper(tokensPayload.customer);
    }

    @Post('/logout')
    async logout(@Res({passthrough: true}) response: Response): Promise<unknown> {
        response.clearCookie(REFRESH_TOKEN, COOKIE_OPTIONS);

        return await this._cacheManager.del(CUSTOMER_INFO);
    }

    @Post('/refresh')
    async refresh(@Body() body: RefreshRequest, @Res({passthrough: true}) response: Response): Promise<CustomerDto> {
        const token: string = body.refreshToken;
        const {customer} = await this._tokensService.resolveRefreshToken(token);
        const tokensPayload: AuthPayload = createAuthPayloadResponse(customer, token);

        await this._setUserDataToCacheAndAddJWTCookiesToResponse(tokensPayload, response);

        return customerToDtoMapper(tokensPayload.customer);
    }

    private async _generateToken(customer: Customer, response: Response): Promise<AuthPayload> {
        const payload: AuthPayload = createAuthPayloadResponse(
            customer,
            await this._tokensService.generateRefreshToken(customer.id, EXPIRES_IN),
        );

        await this._setUserDataToCacheAndAddJWTCookiesToResponse(payload, response);

        return payload;
    }

    private async _setUserDataToCacheAndAddJWTCookiesToResponse(tokenPayload: AuthPayload, response: Response): Promise<void> {
        const {payload, customer} = tokenPayload;

        response.cookie(REFRESH_TOKEN, payload.refresh_token, COOKIE_OPTIONS);
        await this._cacheManager.set(CUSTOMER_INFO, customer);
    }
}
