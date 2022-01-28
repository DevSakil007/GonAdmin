import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { OrganizationStreamService } from './organization-stream.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from "ngx-ui-loader";



let organizationStreams: OrganizationStream[] = []
export interface OrganizationStream {

  // contact_info_id: string;
  // created_at: string;
  // created_by: string;
  // education_details_id: string;
  // org_logo_url: string;
  // organization_address_id:string;
  // organization_details_id: string;
  // organization_name: string;
  // organization_type_id: string;
  // status: string;
  // updated_at: string;
  // updated_by: string;


}

@Component({
  selector: 'app-organization-stream',
  templateUrl: './organization-stream.component.html',
  styleUrls: ['./organization-stream.component.scss'],
})



export class OrganizationStreamComponent implements OnInit, OnDestroy {

  protected onDestroy = new Subject<void>();

  constructor(
    private streamService: OrganizationStreamService,
    private router:Router,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
    private ngxService: NgxUiLoaderService
    ) {}
  displayedColumns: string[] = ['sl.no', 'stream_name', 'stream_description','action'];
  dataSource: MatTableDataSource<OrganizationStream>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.ngxService.start();
    this.getAllOrganizationStream()
  }

  getAllOrganizationStream() {
    this.streamService.getAllOrganizationStream().subscribe((response: any) => {
      this.ngxService.stop();
      organizationStreams = response.resObject;
      this.dataSource = new MatTableDataSource(organizationStreams);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }

  // DELETE ORGANIZATION TYPE
  openDialog(id) {
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'Cancle'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.streamService.deleteOrganizationStream(id).subscribe(() => {

       this.getAllOrganizationStream();

      });
      this.snackBar.open('Item deleted successfully', 'OK', {
          duration: 2000,
      });
      }
    });
  }

// EDIT ORGANIZATION STREAM
editOrganizationStream(id) {
  this.router.navigate(["/organization/stream/addEditOrganizationStream", id]);
}


ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
