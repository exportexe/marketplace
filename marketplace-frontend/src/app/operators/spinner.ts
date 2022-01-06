import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

export function showSpinner<T>(spinnerService: NgxSpinnerService): (source$: Observable<T>) => Observable<T> {
    spinnerService.show();

    return source$ => source$.pipe(
        finalize(() => spinnerService.hide()),
    );
}
