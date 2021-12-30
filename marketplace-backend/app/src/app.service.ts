import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {

    public getServerInfo(): string {
        const {SERVER, PORT} = process.env;
        const author: string = 'https://github.com/exportexe';

        return JSON.stringify({
            Server: SERVER + PORT,
            Status: 'Up',
            Source: `${author}/marketplace`,
            Author: author,
        });
    }
}
