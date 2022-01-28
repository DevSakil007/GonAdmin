import { Component, OnInit,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-faculty-form',
  templateUrl: './faculty-form.component.html',
  styleUrls: ['./faculty-form.component.scss'],
})
export class FacultyFormComponent implements OnInit {

  @Input() myForm: FormGroup; 
  constructor() { }

  ngOnInit() {}

}
