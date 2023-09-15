import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../models/dialog-data.model';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent  {


  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

}
