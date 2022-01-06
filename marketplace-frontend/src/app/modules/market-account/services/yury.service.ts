import {Injectable, OnDestroy} from '@angular/core';

@Injectable()
export class YuryService implements OnDestroy {

    constructor() {
        console.log('Yury services start working');
    }

    ngOnDestroy(): void {
        console.log('Yury services died');
    }
}
