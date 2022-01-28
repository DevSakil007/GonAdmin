import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from "@angular/forms";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ArrayType } from '@angular/compiler';



@Component({
  selector: 'app-add-edit-organization-details',
  templateUrl: './add-edit-organization-details.component.html',
  styleUrls: ['./add-edit-organization-details.component.scss'],
})
export class AddEditOrganizationDetailsComponent implements OnInit {

  organizationDetails: FormGroup;
  @Input() inputArray: ArrayType[];
  

  



  constructor(private formBuilder: FormBuilder) {

   }


   

  ngOnInit() {
    
  this.organizationDetails = this.formBuilder.group({
      organizationName: ['InitialValue', [Validators.required]],
      formArray: this.formBuilder.array([])
  });

  const arrayControl = <FormArray>this.organizationDetails.controls['formArray'];
  this.inputArray.forEach(item => {
      let newGroup = this.formBuilder.group({
        fulName: ['InitialValue'],
        designation: ['InitialValue'],
        depertment: ['InitialValue'],
        subjectExperties: ['InitialValue'],
        contact: ['InitialValue'],
        email: ['InitialValue']
      });
      arrayControl.push(newGroup);
  });

  this.organizationDetails = this.organizationDetails;


  }

  // SAVE ORGANIZATION DETAILS
  saveOrganizationDetails(){
    
    console.log(this.organizationDetails.value);
    
  }


// DRAG AND  DROP START
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
// DRAG AND  DROP END



addInput(): void {
  const arrayControl = <FormArray>this.organizationDetails.controls['formArray'];
  let newGroup = this.formBuilder.group({

      /* Fill this in identically to the one in ngOnInit */
      
      
      // fulName: ['InitialValue'],
      // designation: ['InitialValue'],
      // depertment: ['InitialValue'],
      // subjectExperties: ['InitialValue'],
      // contact: ['InitialValue'],
      // email: ['InitialValue']

  });
  arrayControl.push(newGroup);
}
delInput(index: number): void {
  const arrayControl = <FormArray>this.organizationDetails.controls['formArray'];
  arrayControl.removeAt(index);
}


}
