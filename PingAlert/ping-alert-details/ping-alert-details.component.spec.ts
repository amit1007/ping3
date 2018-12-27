import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PingAlertDetailsComponent } from './ping-alert-details.component';

describe('PingAlertDetailsComponent', () => {
  let component: PingAlertDetailsComponent;
  let fixture: ComponentFixture<PingAlertDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PingAlertDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PingAlertDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
