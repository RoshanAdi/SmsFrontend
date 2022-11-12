import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedNoticeComponent } from './verified-notice.component';

describe('VerifiedNoticeComponent', () => {
  let component: VerifiedNoticeComponent;
  let fixture: ComponentFixture<VerifiedNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedNoticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
