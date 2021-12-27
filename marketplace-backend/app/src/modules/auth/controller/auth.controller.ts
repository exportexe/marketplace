import {
    Body,
    CACHE_MANAGER,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Post,
    Res,
    UnauthorizedException,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import {Cache} from 'cache-manager';
import {Response} from 'express';

import {CustomersService} from '../../customers/service/customers.service';
import {TokensService} from '../service/tokens.service';
import {Customer} from '../../customers/schema/customer.schema';
import {LoginRequest, RefreshRequest, RegisterRequest} from '../../../shared/models/requests.model';
import {AuthPayload} from '../models/auth-payload.model';
import {CustomerDto} from '../../customers/dto/customer.dto';
import {JwtGuard} from '../guard/jwt.guard';
import {AuthExceptionFilter} from '../filter/auth-exceptions.filter';
import {customerToDtoMapper} from '../../customers/mappers/customer-to-dto.mapper';

const EXPIRES_IN = 60 * 60 * 24 * 30;
const LOGIN_IS_INVALID = 'LOGIN_IS_INVALID';

const BEARER_TOKEN_TYPE = process.env.BEARER;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const CUSTOMER_INFO = process.env.CUSTOMER_INFO;

const COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: EXPIRES_IN,
    path: process.env.COOKIE_PATH,
    domain: process.env.DOMAIN,
};

@Controller('/api/auth')
@UseFilters(AuthExceptionFilter)
export class AuthController {

    constructor(@Inject(CACHE_MANAGER) private _cacheManager: Cache,
                private readonly _customersService: CustomersService,
                private readonly _tokensService: TokensService) {
    }

    @Get('/loggedIn')
    async isAuthenticated(): Promise<boolean> {
        return true;
    }

    @Post('/account')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async getCustomerInfo(@Body() body: { userName: string }): Promise<CustomerDto> {
        const customer: Customer = await this._cacheManager.get(CUSTOMER_INFO);

        if (customer) {
            return customerToDtoMapper(customer);
        } else if (body.userName) {
            return customerToDtoMapper(await this._customersService.findCustomerByUserName(body.userName));
        } else {
            return null;
        }
    }

    @Post('/register')
    async register(@Body() body: RegisterRequest, @Res({passthrough: true}) response: Response): Promise<CustomerDto> {
        /* OAuth - Generating Access and Refresh tokens*/
        const tokensPayload: AuthPayload = await this._generateToken(
            await this._customersService.createCustomerFromRequest(body),
            response,
        );

        return customerToDtoMapper(tokensPayload?.customer);
    }

    @Post('/login')
    async login(@Body() body: LoginRequest, @Res({passthrough: true}) response: Response): Promise<CustomerDto> {
        const customer: Customer = await this._customersService.findCustomerByUserName(body.userName);
        const valid: boolean = customer && await this._customersService.validateCredentials(customer, body.password);

        if (!valid) {
            throw new UnauthorizedException(LOGIN_IS_INVALID);
        }

        /* OAuth - Generating Access and Refresh tokens */
        const tokensPayload: AuthPayload = await this._generateToken(customer, response);

        return customerToDtoMapper(tokensPayload?.customer);
    }

    @Post('/refresh')
    async refresh(@Body() body: RefreshRequest, @Res({passthrough: true}) response: Response): Promise<CustomerDto> {
        const {customer, token} = await this._tokensService.createAccessTokenFromRefreshToken(body.refreshToken);

        const tokensPayload: AuthPayload = AuthController._buildResponsePayload(customer, token);
        await this._setUserDataToCache(tokensPayload, response);

        return customerToDtoMapper(tokensPayload?.customer);
    }

    @Post('/logout')
    async logout(@Res({passthrough: true}) response: Response): Promise<void> {
        await this._cacheManager.del(ACCESS_TOKEN);
        await this._cacheManager.del(REFRESH_TOKEN);
        await this._cacheManager.del(CUSTOMER_INFO);
        response.clearCookie(REFRESH_TOKEN, COOKIE_OPTIONS);
    }

    private async _generateToken(customer: Customer, response: Response): Promise<AuthPayload> {
        const token: string = await this._tokensService.generateAccessToken(customer.id);
        const refreshToken: string = await this._tokensService.generateRefreshToken(customer.id, EXPIRES_IN);
        const payload: AuthPayload = AuthController._buildResponsePayload(customer, token, refreshToken);
        await this._setUserDataToCache(payload, response);

        return payload;
    }

    private async _setUserDataToCache(tokenPayload: AuthPayload, response: Response): Promise<void> {
        await this._cacheManager.set(ACCESS_TOKEN, tokenPayload?.payload?.token);
        await this._cacheManager.set(CUSTOMER_INFO, tokenPayload?.customer);
        AuthController._setRefreshTokenToCookie(response, tokenPayload?.payload?.refresh_token);
    }

    private static _setRefreshTokenToCookie(response: Response, refreshToken: string): void {
        response.cookie(REFRESH_TOKEN, refreshToken, COOKIE_OPTIONS);
    }

    private static _buildResponsePayload(customer: Customer, accessToken: string, refreshToken?: string): AuthPayload {
        return {
            customer,
            payload: {
                type: BEARER_TOKEN_TYPE,
                token: accessToken,
                ...(refreshToken ? {refresh_token: refreshToken} : {}),
            },
        };
    }
}
