import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryChannelDetailsComponent } from './delivery-channel-details.component';

describe('DeliveryChannelDetailsComponent', () => {
  let component: DeliveryChannelDetailsComponent;
  let fixture: ComponentFixture<DeliveryChannelDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryChannelDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryChannelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
