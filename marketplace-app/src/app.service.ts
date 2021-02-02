import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {

    getHello(): string {
        return JSON.stringify({
            Server: "http://localhost:4000",
            Status: "Up",
            Source: "Marketplace",
            Author: "export.exe",
        });
    }
}