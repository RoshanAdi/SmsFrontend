import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssingementComponent } from './create-assingement.component';

describe('CreateAssingementComponent', () => {
  let component: CreateAssingementComponent;
  let fixture: ComponentFixture<CreateAssingementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAssingementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAssingementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
