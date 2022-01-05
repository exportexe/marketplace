import {Request, Response} from 'express';
import {Logger} from '@nestjs/common';

export function addAuthHeader(req: Request, res: Response, next: Function) {
    const {REFRESH_TOKEN_COOKIE, BEARER} = process.env;
    const {headers, cookies} = req;
    const tokenFromRequestCookies: string = cookies[REFRESH_TOKEN_COOKIE];

    if (tokenFromRequestCookies) {
        headers.authorization = `${BEARER} ${cookies[REFRESH_TOKEN_COOKIE]}`;

        Logger.log(`Auth header added to request: ${req.url}`, 'Authorization');
    }

    next();
}
