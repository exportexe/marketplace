import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {CommonDialog} from '../../models/common-dialog.model';

@Component({
    selector: 'common-dialog',
    templateUrl: './common-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: CommonDialog,
                private _dialogRef: MatDialogRef<CommonDialogComponent>) {
    }

    /** @internal */
    _close(): void {
        this._dialogRef.close();
    }
}
