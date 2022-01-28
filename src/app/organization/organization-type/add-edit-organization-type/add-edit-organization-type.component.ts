import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from "@angular/forms";
import { OrganizationService } from '../organization-type.service';
import { environment } from "src/environments/environment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-add-edit-organization-type',
  templateUrl: './add-edit-organization-type.component.html',
  styleUrls: ['./add-edit-organization-type.component.scss'],
})
export class AddEditOrganizationTypeComponent implements OnInit,OnDestroy {

  protected onDestroy = new Subject<void>();
  organizationType : FormGroup
  organizationTypeId:string
  organizationTypeEdit = {};

  constructor(private formBuilder: FormBuilder,
              private organizationService: OrganizationService,
              private snackbar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) { }

ngOnInit() {
  
    this.route.paramMap.subscribe((params) => {
    this.organizationTypeId = params.get("id");
    }); 
    this.initializeForm();
    if (this.organizationTypeId != null) {
      this.organizationService
        .getOrganizationTypeById(this.organizationTypeId)
        .subscribe((response) => {
          this.organizationType = this.formBuilder.group({
            organizationTypeId: [response.resObject[0].organization_type_id],
            typeName: [response.resObject[0].org_type_name , Validators.required],
            description: [response.resObject[0].org_type_description],
          });
        });
    }
    
}

initializeForm() {
  this.organizationType = this.formBuilder.group({
    typeName: ['',Validators.required],
    description:[]
  });
}

  //FOR SAVE && UPDATE ORGANIZATION TYPE
  saveOrganizationType() {
    
    if (!this.organizationType.valid) {
      return;
    }

 //UPDATE ORGANIZATION TYPE
    if(this.organizationTypeId != null){
      const dataToSend = {
        organizationTypeId: this.organizationType.get("organizationTypeId").value,
        orgTypeName: this.organizationType.get("typeName").value,
        orgTypeDescription: this.organizationType.get("description").value,
        updatedBy: 1,
        createdBy: 1,
       
      };
      this.organizationService
      .updateOrganizationType(dataToSend)
      .subscribe((response) => {
        this.snackbar.open("Organization Type Updated", "Ok", {
          duration: environment.snackDuration,
        });
        // this.ngOnDestroy();
        // this.ngOnInit();
        
      });

// SAVE ORGANIZATION TYPE
    }else{
      const dataToSend = {
        orgTypeName: this.organizationType.get("typeName").value,
        orgTypeDescription: this.organizationType.get("description").value,
        updatedBy: 1,
        createdBy: 1,
       
      };
      this.organizationService
      .saveOrganizationType(dataToSend)
      .subscribe((response) => {
        this.snackbar.open("Organization Type Created", "Ok", {
          duration: environment.snackDuration,
        });
        this.ngOnDestroy();
        this.ngOnInit();
       
      });

    }

    this.router.navigate(['/organization/type']);
  }








  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }


}
