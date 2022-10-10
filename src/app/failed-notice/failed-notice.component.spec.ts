import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedNoticeComponent } from './failed-notice.component';

describe('FailedNoticeComponent', () => {
  let component: FailedNoticeComponent;
  let fixture: ComponentFixture<FailedNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedNoticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
