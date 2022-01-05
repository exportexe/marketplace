import {ComponentType} from '@angular/cdk/overlay';
import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Injectable({
    providedIn: 'root',
})
export class DialogService {

    constructor(private _dialogRef: MatDialog) {
    }

    public openDialog<T, R = any>(component: ComponentType<T>): MatDialogRef<T> {
        return this._dialogRef.open<T>(component, {
            autoFocus: true,
            panelClass: 'market-overlay-panel-container',
        });
    }
}
