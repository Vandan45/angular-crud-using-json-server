import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CricketersData } from '../crud-table/crud-table.component';

@Component({
  selector: 'app-crud-dialog',
  templateUrl: './crud-dialog.component.html',
  styleUrls: ['./crud-dialog.component.scss'],
})
export class CrudDialogComponent {
  cricketerObj: any = {
    name: '',
  };
  constructor(
    public dialogRef: MatDialogRef<CrudDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data) {
      this.cricketerObj = this.data;
    }
  }

  onSaveClick() {
    if (this.cricketerObj.name) {
      this.dialogRef.close(this.cricketerObj);
    }
  }
}
