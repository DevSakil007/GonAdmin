import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { OrganizationStreamService } from '../organization-stream.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-edit-organization-stream',
  templateUrl: './add-edit-organization-stream.component.html',
  styleUrls: ['./add-edit-organization-stream.component.scss'],
})
export class AddEditOrganizationStreamComponent implements OnInit, OnDestroy {

  protected onDestroy = new Subject<void>();
  organizationStream: FormGroup
  organizationStreamId: string
  organizationTypeEdit = {};

  constructor(
    private formBuilder: FormBuilder,
    private streamService: OrganizationStreamService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.organizationStreamId = params.get("id");
    });
    this.initializeForm();


    if (this.organizationStreamId != null) {
      this.streamService
        .getOrganizationStreamById(this.organizationStreamId)
        .subscribe((response) => {
          this.organizationStream = this.formBuilder.group({
            streamId: [response.resObject[0].stream_id],
            streamName: [response.resObject[0].stream_name, Validators.required],
            streamDescription: [response.resObject[0].stream_description],
            organizationDetailsId: [response.resObject[0].organization_details_id],
          });
        });
    }
  }

  initializeForm() {
    this.organizationStream = this.formBuilder.group({
      streamName: ['', Validators.required],
      streamDescription: [''],
      organizationDetailsId: [10]
    });
  }


  //FOR SAVE && UPDATE ORGANIZATION STREAM
  saveOrganizationStream() {

    if (!this.organizationStream.valid) {
      return;
    }

    //UPDATE ORGANIZATION STREAM
    if (this.organizationStreamId != null) {
      const dataToSend = {
        streamId: this.organizationStream.get("streamId").value,
        streamName: this.organizationStream.get("streamName").value,
        streamDescription: this.organizationStream.get("streamDescription").value,
        organizationDetailsId: this.organizationStream.get("organizationDetailsId").value,
        updatedBy: 11,
        createdBy: 1,
        status: 1

      };
      this.streamService
        .updateOrganizationStream(dataToSend)
        .subscribe((response) => {
          this.snackbar.open("Organization Stream Updated", "Ok", {
            duration: environment.snackDuration,
          });
          // this.ngOnDestroy();
          // this.ngOnInit();

        });

      // SAVE ORGANIZATION STREAM
    } else {
      const dataToSend = {
        streamName: this.organizationStream.get("streamName").value,
        streamDescription: this.organizationStream.get("streamDescription").value,
        organizationDetailsId: this.organizationStream.get("organizationDetailsId").value,
        updatedBy: 1,
        createdBy: 1,
        status: 1

      };
      this.streamService
        .saveOrganizationStream(dataToSend)
        .subscribe((response) => {
          this.snackbar.open("Organization Stream Created", "Ok", {
            duration: environment.snackDuration,
          });
          this.ngOnDestroy();
          this.ngOnInit();

        });

    }

    this.router.navigate(['/organization/stream']);
  }


  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}
