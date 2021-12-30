import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {CommonDialog} from '../../model';

@Component({
    selector: 'common-dialog',
    templateUrl: './common-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonDialogComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: CommonDialog,
                private _dialogRef: MatDialogRef<CommonDialogComponent>) {
    }

    public ngOnInit(): void {
        this.data = this.data ?? {} as CommonDialog;
    }

    /** @internal */
    public _close(): void {
        this._dialogRef.close();
    }
}
