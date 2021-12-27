import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {environment} from '../environments/environment';

@Component({
    selector: 'app-marketplace',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

    constructor(private _translateService: TranslateService) {
    }

    ngOnInit(): void {
        this._translateService.setDefaultLang(environment.defaultLocale);
    }
}
