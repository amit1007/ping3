import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPingAlertComponent } from './view-ping-alert.component';

describe('ViewPingAlertComponent', () => {
  let component: ViewPingAlertComponent;
  let fixture: ComponentFixture<ViewPingAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPingAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPingAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
