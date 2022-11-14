import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsStudentViewComponent } from './subjects-student-view.component';

describe('SubjectsStudentViewComponent', () => {
  let component: SubjectsStudentViewComponent;
  let fixture: ComponentFixture<SubjectsStudentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectsStudentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectsStudentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
