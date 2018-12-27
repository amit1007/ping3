import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseExpiredComponent } from './license-expired.component';

describe('LicenseExpiredComponent', () => {
  let component: LicenseExpiredComponent;
  let fixture: ComponentFixture<LicenseExpiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseExpiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
