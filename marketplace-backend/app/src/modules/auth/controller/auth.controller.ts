import {Body, CACHE_MANAGER, Controller, Get, Inject, Param, Post, Res, UnauthorizedException, UseFilters, UseGuards} from '@nestjs/common';
import {Cache} from 'cache-manager';
import {Response} from 'express';

import {CustomersService} from '../../customers/service/customers.service';
import {TokensService} from '../service/tokens.service';
import {Customer} from '../../customers/schema/customer.schema';
import {LoginRequest, RefreshRequest, RegisterRequest} from '../../../shared/models/requests.model';
import {AuthActionsPayload, AuthPayload} from '../models/auth-payload.model';
import {CustomerDto} from '../../customers/dto/customer.dto';
import {JwtGuard} from '../guard/jwt.guard';
import {AuthExceptionFilter} from '../filter/auth-exceptions.filter';
import {customerToDtoMapper} from '../../customers/mappers/customer-to-dto.mapper';

const EXPIRES_IN = 60 * 60 * 24 * 30;
const BEARER_TOKEN_TYPE = 'bearer';
const SUCCESS_TOKEN_TYPE = 'success';
const LOGIN_IS_INVALID = 'LOGIN_IS_INVALID';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

@Controller('/api/auth')
@UseFilters(AuthExceptionFilter)
export class AuthController {

    constructor(@Inject(CACHE_MANAGER) private _cacheManager: Cache,
                private readonly _customersService: CustomersService,
                private readonly _tokensService: TokensService) {
    }

    @Get('/:id')
    @UseGuards(JwtGuard)
    async getCustomer(@Param('id') customerId: string): Promise<AuthActionsPayload> {
        const customer: Customer = await this._customersService.findCustomerById(customerId);

        return {
            status: SUCCESS_TOKEN_TYPE,
            data: customer,
        };
    }

    @Post('/register')
    async register(@Body() body: RegisterRequest, @Res({passthrough: true}) response: Response): Promise<CustomerDto> {
        const customer: Customer = await this._customersService.createCustomerFromRequest(body);

        /* OAuth - Generating Access and Refresh tokens*/
        const tokensPayload: AuthPayload = await this._generateToken(customer);
        response.cookie(REFRESH_TOKEN, tokensPayload?.payload?.refresh_token, {
                maxAge: EXPIRES_IN,
                httpOnly: true,
                path: process.env.COOKIE_PATH,
                domain: process.env.DOMAIN,
            },
        );

        return customerToDtoMapper(tokensPayload?.customer);
    }

    @Post('/login')
    async login(@Body() body: LoginRequest, @Res({passthrough: true}) response: Response): Promise<any> {
        const customer: Customer = await this._customersService.findCustomerByUserName(body.userName);
        const valid: boolean = customer && await this._customersService.validateCredentials(customer, body.password);

        if (!valid) {
            throw new UnauthorizedException(LOGIN_IS_INVALID);
        }

        /* OAuth - Generating Access and Refresh tokens*/
        const tokensPayload: AuthPayload = await this._generateToken(customer);
        response.cookie(REFRESH_TOKEN, tokensPayload?.payload?.refresh_token, {
                maxAge: EXPIRES_IN,
                httpOnly: true,
                path: process.env.COOKIE_PATH,
                domain: process.env.DOMAIN,
            },
        );

        //return customerToDtoMapper(tokensPayload?.customer);
        return tokensPayload;
    }

    @Post('/refresh')
    async refresh(@Body() body: RefreshRequest, @Res({passthrough: true}) response: Response): Promise<AuthActionsPayload> {
        const {customer, token} = await this._tokensService.createAccessTokenFromRefreshToken(body.refreshToken);

        const tokensPayload: AuthPayload = AuthController._buildResponsePayload(customer, token);
        await this._cacheManager.set(ACCESS_TOKEN, tokensPayload?.payload?.token);
        response.cookie(REFRESH_TOKEN, tokensPayload?.payload?.refresh_token, {
                maxAge: EXPIRES_IN,
                httpOnly: true,
                path: process.env.COOKIE_PATH,
                domain: process.env.DOMAIN,
            },
        );

        return {
            status: SUCCESS_TOKEN_TYPE,
            data: tokensPayload,
        };
    }

    private async _generateToken(customer: Customer): Promise<AuthPayload> {
        const token: string = await this._tokensService.generateAccessToken(customer.id);
        const refreshToken: string = await this._tokensService.generateRefreshToken(customer.id, EXPIRES_IN);
        const payload: AuthPayload = AuthController._buildResponsePayload(customer, token, refreshToken);
        await this._cacheManager.set(ACCESS_TOKEN, payload?.payload?.token);

        console.log(this._cacheManager.get(ACCESS_TOKEN));

        return payload;
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
