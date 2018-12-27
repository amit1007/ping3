import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPingAlertComponent } from './edit-ping-alert.component';

describe('EditPingAlertComponent', () => {
  let component: EditPingAlertComponent;
  let fixture: ComponentFixture<EditPingAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPingAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPingAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
