import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IPlayer } from '../../types/player.type';

@Component({
    selector: 'player-dialog',
    templateUrl: 'player-dialog.component.html',
})
export class PlayerDialog {
    constructor(
        public dialogRef: MatDialogRef<PlayerDialog>,
        @Inject(MAT_DIALOG_DATA) public data: IPlayer) {}
    
      onClose(): void {
        this.dialogRef.close();
      }
      
}