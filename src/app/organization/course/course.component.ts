import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { CourseService } from './course.service';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from "ngx-ui-loader";

let course:Course[]=[]

export interface Course{
  organizationCourseId: String 	;
	courseName: String ;
	courseDescription: String ;
	status: String ;
	createdBy: String ;	
	createdAt: String ;
	updatedBy: String ;
	updatedAt: String ;
}



@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit,OnDestroy {

  protected onDestroy= new Subject<void>();
  

  displayedColumns:String[]=['sl.no','course_name','course_description','action'];
  
  dataSource:MatTableDataSource<Course>;
  @ViewChild(MatPaginator) Paginator:MatPaginator
  @ViewChild(MatSort)  Sort:MatSort


    constructor(private courseService:CourseService,
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
    this.getAllCourse();
  }
  getAllCourse(){
     this.courseService.getAllCourse().subscribe((response:any)=>{
      this.ngxService.stop();
      course=response.resObject;
      this.dataSource=new MatTableDataSource(course);
      this.dataSource.paginator=this.Paginator;
      this.dataSource.sort=this.Sort;
    

    });
   }

   editCourse(id) {
    this.router.navigate(["organization/course/addEditCourse",id]);
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
      this.courseService.deleteCourse(id).subscribe(() => {

     this.getAllCourse();

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

