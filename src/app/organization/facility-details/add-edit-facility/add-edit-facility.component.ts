import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FacilityService } from '../facility-detail.service';

@Component({
  selector: 'app-add-edit-facility',
  templateUrl: './add-edit-facility.component.html',
  styleUrls: ['./add-edit-facility.component.scss'],
})
export class AddEditFacilityComponent implements OnInit   {
  
  protected onDestroy = new Subject<void>();
  addEditFacility : FormGroup
  addEditFacilityId:string
  addEditFacilityEdit = {};
  dialog: any;
  getAllFacility: any;

  constructor(private facilityService:FacilityService,
              private formBuilder: FormBuilder,
              private snackbar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute,) { }

   ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.addEditFacilityId = params.get("id");
      }); 
      this.initializeForm();
      if (this.addEditFacilityId != null) {
        this.facilityService
          .getFacilityById(this.addEditFacilityId)
          .subscribe((response) => {
            this.addEditFacility = this.formBuilder.group({
              addEditFacilityId: [response.resObject[0].organization_facility_id],
              facilityName: [response.resObject[0].facility_name , Validators.required],
              facilityDescription: [response.resObject[0].facility_description],
            });
          });
      }
   }
  

   initializeForm() {
    this.addEditFacility = this.formBuilder.group({
      facilityName: ['',Validators.required],
      facilityDescription:[]
    });
  }
 //FOR SAVE && UPDATE ORGANIZATION TYPE
 saveFacility() {
   
  if (!this.addEditFacility.valid) {
    return;
  }

//UPDATE FACILITY
  if(this.addEditFacilityId != null){
    
    const dataToSend = {
      facilityId: this.addEditFacility.get("addEditFacilityId").value,
      facilityName: this.addEditFacility.get("facilityName").value,
      facilityDescription: this.addEditFacility.get("facilityDescription").value,
      updatedBy: 1,
      createdBy: 1,
     
    };
    this.facilityService
    .updateFacility(dataToSend)
    .subscribe((response) => {
      this.snackbar.open("Facility Updated", "Ok", {
      //  duration: environment.snackDuration,
      });
      this.ngOnDestroy();
       this.ngOnInit();
      
    });
// SAVE FACILITY
  }else{
    alert("else");
    const dataToSend = {
      facilityName: this.addEditFacility.get("facilityName").value,
      facilityDescription: this.addEditFacility.get("facilityDescription").value,
      updatedBy: 1,
      createdBy: 1,
      status: 1,
    };
    this.facilityService
    .saveFacility(dataToSend)
    .subscribe((response) => {
      this.snackbar.open("Facility Generated", "Ok", {
       // duration: environment.snackDuration,
      });     
      this.ngOnInit(); 
      this.ngOnDestroy();
    });

  }

  this.router.navigate(['/organization/facility']);
}
  

ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
}


 

  }