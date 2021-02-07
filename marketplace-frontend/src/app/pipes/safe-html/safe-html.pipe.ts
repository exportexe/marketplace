import {Pipe, PipeTransform, SecurityContext} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
    name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {

    constructor(private _sanitizer: DomSanitizer) {
    }

    transform(html: string, isNeedToSanitizeInSecurityContext: boolean = false): string | SafeHtml {
        const sanitizedHtml: SafeHtml = this._sanitizer.bypassSecurityTrustHtml(html);

        return isNeedToSanitizeInSecurityContext
            ? this._sanitizer.sanitize(SecurityContext.HTML, sanitizedHtml)
            : sanitizedHtml;
    }
}
