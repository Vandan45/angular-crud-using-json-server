import { Component } from '@angular/core';
import { CrudService } from '../crud.service';
import { CrudDialogComponent } from '../crud-dialog/crud-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { elementAt } from 'rxjs';

export interface CricketersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss'],
})
export class CrudTableComponent {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: any;

  constructor(private crudService: CrudService, public dialog: MatDialog) {
    this.loadData();
  }

  loadData() {
    this.crudService.getCricketersData().subscribe((response) => {
      this.dataSource = response;
    });
  }

  addDataClick() {
    console.log('You click Add');
    this.openDialog();
  }
  editBtnClick(row: string) {
    console.log('You click Edit');
    row = JSON.parse(JSON.stringify(row));
    // row = Object.assign({}, row);
    this.openDialog(row);
  }
  deleteBtnClick(id: string) {
    console.log('You click Delete');
    if (confirm('Are you sure?')) {
      this.crudService.deleteCricketer(id).subscribe((res) => {
        this.loadData();
      });
    }
  }

  openDialog(payload: any = null): void {
    const dialogRef = this.dialog.open(CrudDialogComponent, {
      width: '250px',
      data: payload,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        if (result.id) {
          this.crudService.updateCricketer(result).subscribe((res) => {
            console.log('PUT Res', res);
            this.loadData();
          });
        } else {
          this.crudService.addCricketer(result).subscribe((res) => {
            console.log('POST Res', res);
            this.loadData();
          });
        }
      }
    });
  }
}
