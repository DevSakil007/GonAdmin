import { Component, OnInit ,ViewChild,OnDestroy} from '@angular/core';
import { OrganizationDetailsService } from './organization-details.service';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subject } from "rxjs";
import { NgxUiLoaderService } from "ngx-ui-loader";



let organizationDetails: OrganizationDetails[] = [];

export interface OrganizationDetails {
 
contact_info_id: string;
created_at: string;
created_by: string;
education_details_id: string;
org_logo_url: string;
organization_address_id:string;
organization_details_id: string;
organization_name: string;
organization_type_id: string;
status: string;
updated_at: string;
updated_by: string;
  
 
}


@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss'],
})
export class OrganizationDetailsComponent implements OnInit ,OnDestroy {

  protected onDestroy = new Subject<void>();
  // organizationDetailsList:any;

displayedColumns: string[] = ['sl.no','organization_details_id','organization_name','action'];
dataSource: MatTableDataSource<OrganizationDetails>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
              private organizationDetailsService:OrganizationDetailsService,
              private ngxService: NgxUiLoaderService
              ) {

   }

  ngOnInit() {
    this.ngxService.start();
    this.getAllOrganizationDetails();
  }

  // For Get All BourdUniversity

  getAllOrganizationDetails() {
    this.organizationDetailsService
      .getAllOrganizationDetails()
      .subscribe((response: any) => {
        this.ngxService.stop();
        // this.organizationDetailsList = response.resObject;
        organizationDetails = response.resObject;
         console.log(organizationDetails);
        this.dataSource = new MatTableDataSource(organizationDetails);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
