import {Injectable} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {map, Observable, startWith} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppStoreService {

    public currentLang$: Observable<string> = this._translateService.onLangChange.pipe(
        startWith({lang: this._translateService.getDefaultLang()}),
        map((e: LangChangeEvent) => e.lang.toUpperCase()),
    );

    constructor(private _translateService: TranslateService) {
    }
}
