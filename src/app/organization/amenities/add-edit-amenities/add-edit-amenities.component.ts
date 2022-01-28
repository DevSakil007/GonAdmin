
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { AmenitiesService } from "../amenities.service"; 

@Component({
  selector: 'app-add-edit-amenities',
  templateUrl: './add-edit-amenities.component.html',
  styleUrls: ['./add-edit-amenities.component.scss'],
})
export class AddEditAmenitiesComponent implements OnInit {

  protected OnDestroy = new Subject<void>();
  amenities:FormGroup
  organizationAmenitiesId:String
  amenitiesEdit={};

  constructor(
      private formBuilder:FormBuilder,
      private amenitiesService:AmenitiesService,
      private snackbar:MatSnackBar,
      private router:Router,
      private route:ActivatedRoute
  ){}


  ngOnInit() {

      this.route.paramMap.subscribe((params) => {
      this.organizationAmenitiesId = params.get("id");
      }); 

      this.initializeForm();
          
          if (this.organizationAmenitiesId != null) {
            this.amenitiesService
              .getAmenitiesByAmenitiesId(this.organizationAmenitiesId)
              .subscribe((response) => {
                this.amenities = this.formBuilder.group({
                  organizationAmenitiesId: [response.resObject[0].organization_amenities_id],
                  amenitiesName: [response.resObject[0].amenities_name , Validators.required],
                  amenitiesDescription:[response.resObject[0].amenities_description ],
                 
                });
              });
          }
  }

  initializeForm() {
      this.amenities = this.formBuilder.group({
        amenitiesName: ['',Validators.required],
        amenitiesDescription: ['']
       
      });
    }


    saveAmenities() {
  
      if (!this.amenities.valid) {
        return;
      }

      if(this.organizationAmenitiesId != null){
          const dataToSend = {
            organizationAmenitiesId: this.amenities.get("organizationAmenitiesId").value,
            amenitiesName: this.amenities.get("amenitiesName").value,
            amenitiesDescription:this.amenities.get("amenitiesDescription").value,
            updatedBy: 1,
            createdBy: 1,
           
          };
          this.amenitiesService
          .updateAmenities(dataToSend)
          .subscribe((response) => {
            this.snackbar.open(" Amenities Updated", "Ok", {
              duration:environment.snackDuration,
            });
             //this.ngOnDestroy();
             //this.ngOnInit();
            
          });
        }else{
          const dataToSend = {
            amenitiesName: this.amenities.get("amenitiesName").value,
            amenitiesDescription:this.amenities.get("amenitiesDescription").value,
            updatedBy: 1,
            createdBy: 1,
           
          };
          this.amenitiesService
          .saveAmenities(dataToSend)
          .subscribe((response) => {
            this.snackbar.open("Amenities Created", "Ok", {
              duration: environment.snackDuration,
            });
            this.ngOnDestroy();
            this.ngOnInit();
           
          });
    
        }
        this.router.navigate(['/organization/amenities']);
      }
    
    
      ngOnDestroy(): void {
        this.OnDestroy.next();
        this.OnDestroy.complete();
      }
}
