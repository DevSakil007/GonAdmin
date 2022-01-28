import { Component, OnInit ,ViewChild,OnDestroy} from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subject } from "rxjs";
import {FacilityService} from  './facility-detail.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { NgxUiLoaderService } from "ngx-ui-loader";


let facilityDetails: FacilityDetails[] = [];

export interface FacilityDetails {}

@Component({
  selector: 'app-facility-details',
  templateUrl: './facility-details.component.html',
  styleUrls: ['./facility-details.component.scss'],
})
export class FacilityDetailsComponent implements OnInit ,OnDestroy  {

protected onDestroy = new Subject<void>();
 
displayedColumns: string[] = ['sl.no','facility_name','facility_description','action'];
dataSource: MatTableDataSource<FacilityDetails>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private facilityService:FacilityService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private ngxService: NgxUiLoaderService
              ) {}

  ngOnInit() {
    this.ngxService.start();
    this.getAllFacility();
    
    
  }

  // For Get All Facility 

  getAllFacility() {
    this.facilityService
      .getAllFacility()
      .subscribe((response: any) => {
        this.ngxService.stop();
        facilityDetails = response.resObject;
        this.dataSource = new MatTableDataSource(facilityDetails);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

// EDIT ORGANIZATION TYPE
editFacility(id) {
  this.router.navigate(["/organization/facility/add", id]);
}

  
//DELETE FACILITY
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
      this.facilityService.deleteFacility(id).subscribe(() => {

     this.getAllFacility();

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
