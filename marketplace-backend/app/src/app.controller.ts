import {Controller, Get} from '@nestjs/common';

import {AppService} from './app.service';

@Controller()
export class AppController {

    constructor(private _appService: AppService) {
    }

    @Get()
    getServerInfo(): string {
        return this._appService.getServerInfo();
    }
}
