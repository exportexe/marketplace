import {NgModule} from '@angular/core';

import {InitVarDirective} from './init-var.directive';

@NgModule({
    exports: [
        InitVarDirective,
    ],
    declarations: [
        InitVarDirective,
    ],
})
export class InitVarModule {
}
