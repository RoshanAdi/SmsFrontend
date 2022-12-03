import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFileUploadComponent } from './student-file-upload.component';

describe('StudentFileUploadComponent', () => {
  let component: StudentFileUploadComponent;
  let fixture: ComponentFixture<StudentFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentFileUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
