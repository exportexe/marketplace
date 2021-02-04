import {Body, Controller, Post, UnauthorizedException} from '@nestjs/common';

import {CustomersService} from '../../customers/service/customers.service';
import {TokensService} from '../service/tokens.service';
import {Customer} from '../../customers/schema/customer.schema';
import {LoginRequest, RefreshRequest, RegisterRequest} from '../../../shared/models/requests.model';
import {AuthActionsPayload, AuthPayload} from '../models/auth-payload.model';

const EXPIRES_IN = 60 * 60 * 24 * 30;
const BEARER_TOKEN_TYPE = 'bearer';
const SUCCESS_TOKEN_TYPE = 'success';
const LOGIN_IS_INVALID = 'LOGIN_IS_INVALID';

@Controller('/api/auth')
export class AuthController {

    constructor(private readonly _customersService: CustomersService,
                private readonly _tokensService: TokensService) {
    }

    @Post('/register')
    async register(@Body() body: RegisterRequest): Promise<AuthActionsPayload> {
        const customer: Customer = await this._customersService.createCustomerFromRequest(body);
        const token: string = await this._tokensService.generateAccessToken(customer.id);
        const refreshToken: string = await this._tokensService.generateRefreshToken(customer.id, EXPIRES_IN);
        const payload: AuthPayload = AuthController._buildResponsePayload(customer, token, refreshToken);

        return {
            status: SUCCESS_TOKEN_TYPE,
            data: payload,
        };
    }

    @Post('/login')
    async login(@Body() body: LoginRequest): Promise<AuthActionsPayload> {
        const customer: Customer = await this._customersService.findCustomerByUserName(body.userName);
        const valid: boolean = customer && await this._customersService.validateCredentials(customer, body.password);

        if (!valid) {
            throw new UnauthorizedException(LOGIN_IS_INVALID);
        }

        const token: string = await this._tokensService.generateAccessToken(customer.id);
        const refreshToken: string = await this._tokensService.generateRefreshToken(customer.id, EXPIRES_IN);
        const payload: AuthPayload = AuthController._buildResponsePayload(customer, token, refreshToken);

        return {
            status: SUCCESS_TOKEN_TYPE,
            data: payload,
        };
    }

    @Post('/refresh')
    async refresh(@Body() body: RefreshRequest): Promise<AuthActionsPayload> {
        const {customer, token} = await this._tokensService.createAccessTokenFromRefreshToken(body.refreshToken);

        const payload: AuthPayload = AuthController._buildResponsePayload(customer, token);

        return {
            status: SUCCESS_TOKEN_TYPE,
            data: payload,
        };
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
