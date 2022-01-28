import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEditOrganizationTypeComponent } from './add-edit-organization-type.component';

describe('AddEditOrganizationTypeComponent', () => {
  let component: AddEditOrganizationTypeComponent;
  let fixture: ComponentFixture<AddEditOrganizationTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditOrganizationTypeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditOrganizationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
