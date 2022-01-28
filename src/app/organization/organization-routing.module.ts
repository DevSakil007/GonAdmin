import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationType } from './organization-type/organization-type.component'; 
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { AddEditOrganizationDetailsComponent } from './organization-details/add-edit-organization-details/add-edit-organization-details.component';
import { AddEditOrganizationTypeComponent } from './organization-type/add-edit-organization-type/add-edit-organization-type.component';
import { OrganizationStreamComponent } from './organization-stream/organization-stream.component';
import { AddEditOrganizationStreamComponent } from './organization-stream/add-edit-organization-stream/add-edit-organization-stream.component';
import { FacilityDetailsComponent } from './facility-details/facility-details.component';
import { AddEditFacilityComponent } from './facility-details/add-edit-facility/add-edit-facility.component';
import { CourseComponent } from './course/course.component';
import { AddEditCourseComponent } from './course/add-edit-course/add-edit-course.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { AddEditAmenitiesComponent } from './amenities/add-edit-amenities/add-edit-amenities.component';

const routes: Routes = [
  {
    path: 'type',
    component: OrganizationType
  },
  {
    path: 'organizationDetails',
    component: OrganizationDetailsComponent
  },
  {
    path: 'organizationDetails/addEditOrganizationDetails',
    component: AddEditOrganizationDetailsComponent
  },
  {
    path: 'type/addEditOrganizationType',
    component: AddEditOrganizationTypeComponent
  },
  {
    path: 'type/addEditOrganizationType/:id',
    component: AddEditOrganizationTypeComponent
  },
  {
    path:"stream",
    component:OrganizationStreamComponent
  },
  {
    path:'stream/addEditOrganizationStream',
    component:AddEditOrganizationStreamComponent
  },
  {
    path:'stream/addEditOrganizationStream/:id',
    component:AddEditOrganizationStreamComponent
  },
  {
    path: 'facility',
    component: FacilityDetailsComponent
  },
  {
    path: 'facility/add',
    component: AddEditFacilityComponent
  },
  {
    path: 'facility/add/:id',
    component: AddEditFacilityComponent
  },
  { 
    path:'course',
    component:CourseComponent
  },
  { 
    path:'course/addEditCourse',
    component:AddEditCourseComponent
  },
  { 
    path:'course/addEditCourse/:id',
    component:AddEditCourseComponent
  },
  { 
    path:'amenities',
    component:AmenitiesComponent
  },
  { 
    path:'amenities/addEditAmenities',
    component:AddEditAmenitiesComponent
  },
  { 
    path:'amenities/addEditAmenities/:id',
    component:AddEditAmenitiesComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
