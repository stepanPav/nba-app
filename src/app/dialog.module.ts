import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from "@angular/material/dialog";

import { PlayerDialog } from './dialog-template/player-dialog/player-dialog.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
      PlayerDialog
    ],
    imports: [
      MatFormFieldModule,
      MatInputModule,
      MatDialogModule
  
    ],
    providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}],
    bootstrap: []
  })
  export class DialogModule { }