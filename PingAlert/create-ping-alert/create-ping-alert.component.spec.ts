import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePingAlertComponent } from './create-ping-alert.component';

describe('CreatePingAlertComponent', () => {
  let component: CreatePingAlertComponent;
  let fixture: ComponentFixture<CreatePingAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePingAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePingAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
