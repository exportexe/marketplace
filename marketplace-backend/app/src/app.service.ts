import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {

    getServerInfo(): string {
        return JSON.stringify({
            Server: 'http://localhost:4000',
            Status: 'Up',
            Source: 'https://github.com/exportexe/marketplace',
            Author: 'export.exe',
        });
    }
}
