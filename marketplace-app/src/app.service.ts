import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {

    getHello() {
        return JSON.stringify({
            Server: "http://localhost:4000",
            Source: "Marketplace",
            Author: "export.exe"
        });
    }
}