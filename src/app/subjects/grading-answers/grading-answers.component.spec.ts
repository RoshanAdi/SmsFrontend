import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingAnswersComponent } from './grading-answers.component';

describe('GradingAnswersComponent', () => {
  let component: GradingAnswersComponent;
  let fixture: ComponentFixture<GradingAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradingAnswersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradingAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
