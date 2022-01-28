import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEditOrganizationStreamComponent } from './add-edit-organization-stream.component';

describe('AddEditOrganizationStreamComponent', () => {
  let component: AddEditOrganizationStreamComponent;
  let fixture: ComponentFixture<AddEditOrganizationStreamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditOrganizationStreamComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditOrganizationStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
