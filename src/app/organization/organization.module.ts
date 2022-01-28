import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { AddEditOrganizationDetailsComponent } from './organization-details/add-edit-organization-details/add-edit-organization-details.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { OrganizationType } from './organization-type/organization-type.component';
import { AddEditOrganizationTypeComponent } from './organization-type/add-edit-organization-type/add-edit-organization-type.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { OrganizationStreamComponent } from './organization-stream/organization-stream.component';
import { AddEditOrganizationStreamComponent } from './organization-stream/add-edit-organization-stream/add-edit-organization-stream.component';
import { FacilityDetailsComponent } from './facility-details/facility-details.component';
import { AddEditFacilityComponent } from './facility-details/add-edit-facility/add-edit-facility.component';
import { CourseComponent } from './course/course.component';
import { AddEditCourseComponent } from './course/add-edit-course/add-edit-course.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { AddEditAmenitiesComponent } from './amenities/add-edit-amenities/add-edit-amenities.component';
import { FacultyFormComponent } from './organization-details/add-edit-organization-details/faculty-form/faculty-form.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationRoutingModule,
    AppMaterialModule,
    DragDropModule
  ],
  declarations: [
    OrganizationType,
    OrganizationDetailsComponent,
    AddEditOrganizationDetailsComponent,
    AddEditOrganizationTypeComponent,
    ConfirmDialogComponent,
    OrganizationStreamComponent,
    AddEditOrganizationStreamComponent,
    FacilityDetailsComponent,
    AddEditFacilityComponent,
    CourseComponent,
    AddEditCourseComponent,
    AmenitiesComponent,
    AddEditAmenitiesComponent,
    FacultyFormComponent
    
  ]
})
export class OrganizationModule {}
