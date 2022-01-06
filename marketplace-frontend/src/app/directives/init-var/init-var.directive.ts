import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

interface InitVarContext<T> {
    initVar: T;
}

@Directive({
    selector: '[initVar]',
})
export class InitVarDirective<T> implements OnInit {

    @Input()
    set initVar(value: T) {
        this._context.initVar = value;
    }

    private _context: InitVarContext<T> = {initVar: null};

    constructor(private _viewContainer: ViewContainerRef,
                private _templateRef: TemplateRef<InitVarContext<T>>) {
    }

    ngOnInit(): void {
        this._viewContainer.createEmbeddedView(this._templateRef, this._context);
    }
}
