import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {

    getServerInfo(): string {
        return JSON.stringify({
            Server: process.env.SERVER + process.env.PORT,
            Status: 'Up',
            Source: 'https://github.com/exportexe/marketplace',
            Author: 'export.exe',
        });
    }
}
