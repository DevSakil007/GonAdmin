
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { OrganizationService } from './organization-type.service'
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from "ngx-ui-loader";

export interface Organization {
 
  organization_type_id: string;
  org_type_name: string;
  org_type_description: string;
  
}
let OrganizationList: Organization[] = [];
@Component({
  selector: 'app-orgtype',
  templateUrl: './organization-type.component.html',
  styleUrls: ['./organization-type.component.scss'],
})
export class OrganizationType implements OnInit,OnDestroy {
  protected onDestroy = new Subject<void>();
  displayedColumns: string[] = [
    "sl",
    "org_type_name",
    "org_type_description",
    "action"
    
  ];
  dataSource: MatTableDataSource<Organization>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private organizationService: OrganizationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private ngxService: NgxUiLoaderService

  ) {}

  ngOnInit() {
   this.ngxService.start();
   this.getAllOrganizationType();
  }

  // GET ALL ORGANIZATION TYPE
  getAllOrganizationType() {
    this.organizationService.getAllOrganizationType().subscribe((response) => {
      this.ngxService.stop();
      OrganizationList = response.resObject;
      this.dataSource = new MatTableDataSource(OrganizationList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    });
  }

// EDIT ORGANIZATION TYPE
 editOrganizationType(id) {
  this.router.navigate(["/organization/type/addEditOrganizationType", id]);
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
        this.organizationService.deleteOrganizationType(id).subscribe(() => {

       this.getAllOrganizationType();

      });
      this.snackBar.open('Item deleted successfully', 'OK', {
          duration: 2000,
      });
      }
    });
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
