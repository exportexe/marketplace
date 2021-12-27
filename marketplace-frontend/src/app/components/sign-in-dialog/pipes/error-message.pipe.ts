import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
    name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {

    constructor(private _translateService: TranslateService) {
    }

    transform(formControl: AbstractControl, isRequiredPatternValidator?: boolean): string {
        if (formControl.hasError('required')) {
            return this._translateService.instant('sign-in-dialog.required-validator');
        }

        if (formControl.hasError('pattern') && !isRequiredPatternValidator) {
            return this._translateService.instant('sign-in-dialog.username-pattern-validator');
        }

        return '';
    }
}
