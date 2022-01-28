import { Route } from "@angular/compiler/src/core";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { CourseService } from "../course.service";
@Component({
    selector:'app-add-edit-course',
    templateUrl:'./add-edit-course.component.html',
    styleUrls:['./add-edit-course.component.scss']
})

export class AddEditCourseComponent implements OnInit,OnDestroy{
    
   
    protected OnDestroy = new Subject<void>();
    course:FormGroup
    organizationCourseId:String
    courseEdit={};

    constructor(
        private formBuilder:FormBuilder,
        private courseService:CourseService,
        private snackbar:MatSnackBar,
        private router:Router,
        private route:ActivatedRoute
    ){}


    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.organizationCourseId = params.get("id");
            }); 
            this.initializeForm();
            
            if (this.organizationCourseId != null) {
              this.courseService
                .getCourseByCourseId(this.organizationCourseId)
                .subscribe((response) => {
                  this.course = this.formBuilder.group({
                    organizationCourseId: [response.resObject[0].organization_course_id],
                    courseName: [response.resObject[0].course_name , Validators.required],
                    courseDescription:[response.resObject[0].course_description ],
                   
                  });
                });
            }
    }
    initializeForm() {
        this.course = this.formBuilder.group({
          courseName: ['',Validators.required],
          courseDescription: ['']
         
        });
      }
      saveCourse() {
    
        if (!this.course.valid) {
          return;
        }

        if(this.organizationCourseId != null){
            const dataToSend = {
              organizationCourseId: this.course.get("organizationCourseId").value,
              courseName: this.course.get("courseName").value,
              courseDescription:this.course.get("courseDescription").value,
              updatedBy: 1,
              createdBy: 1,
             
            };
            this.courseService
            .updateCourse(dataToSend)
            .subscribe((response) => {
              this.snackbar.open(" Course Updated", "Ok", {
                duration:environment.snackDuration,
              });
               //this.ngOnDestroy();
               //this.ngOnInit();
              
            });
          }else{
            const dataToSend = {
              courseName: this.course.get("courseName").value,
              courseDescription:this.course.get("courseDescription").value,
              updatedBy: 1,
              createdBy: 1,
             
            };
            this.courseService
            .saveCourse(dataToSend)
            .subscribe((response) => {
              this.snackbar.open("Course Created", "Ok", {
                duration: environment.snackDuration,
              });
              this.ngOnDestroy();
              this.ngOnInit();
             
            });
      
          }
          this.router.navigate(['/organization/course']);
        }
      
      
        ngOnDestroy(): void {
          this.OnDestroy.next();
          this.OnDestroy.complete();
        }

}