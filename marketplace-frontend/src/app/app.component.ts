import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

const DEFAULT_LANG_STRING = 'en';

@Component({
    selector: 'app-marketplace',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent {

    constructor(private _translateService: TranslateService) {
        _translateService.setDefaultLang(DEFAULT_LANG_STRING);
    }
}
