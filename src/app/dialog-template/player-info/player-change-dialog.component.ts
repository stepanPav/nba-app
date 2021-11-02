import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPlayer } from '../../types/player.type';

@Component({
    selector: 'player-change-dialog',
    templateUrl: 'player-change-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerChangeDialog {
    constructor(
        public dialogRef: MatDialogRef<PlayerChangeDialog>,
        @Inject(MAT_DIALOG_DATA) public data: IPlayer) {}
    
      onClose(): void {
        this.dialogRef.close();
      }
      
}