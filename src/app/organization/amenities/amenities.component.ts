
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { AmenitiesService } from './amenities.service';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from "ngx-ui-loader";



let amenities:Amenities[]=[]

export interface Amenities{
	amenitiesName: String ;	
	amenitiesDescription: String ;
	updatedBy: String ;
	updatedAt: String ;
}


@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss'],
})
export class AmenitiesComponent implements OnInit,OnDestroy {


  protected onDestroy= new Subject<void>();
  

  displayedColumns:String[]=['sl.no','amenities_name','amenities_description','action'];
  
  dataSource:MatTableDataSource<Amenities>;
 @ViewChild(MatPaginator) Paginator:MatPaginator
  @ViewChild(MatSort)  Sort:MatSort

  constructor(private amenitiesService:AmenitiesService,
    private dialog:MatDialog,
    private router:Router,
    private snackBar:MatSnackBar,
    private ngxService: NgxUiLoaderService) { }

  

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  ngOnInit() {
    this.ngxService.start();
    this.getAllAmenities();
  }

  // GET ALL AMENITIES
  getAllAmenities(){
     this.amenitiesService.getAllAmenities().subscribe((response:any)=>{
      this.ngxService.stop();
      amenities=response.resObject;
      console.log(amenities);
      this.dataSource=new MatTableDataSource(amenities);
      this.dataSource.paginator=this.Paginator;
      this.dataSource.sort=this.Sort;
    

    });
   }

   editAmenities(id) {
    this.router.navigate(["organization/amenities/addEditAmenities",id]);
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
      this.amenitiesService.deleteAmenities(id).subscribe(() => {

     this.getAllAmenities();

    });
    this.snackBar.open('Item deleted successfully', 'OK', {
        duration: 2000,
    });
    }
  });
}



applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
