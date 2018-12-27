import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeliveryChannelComponent } from './create-delivery-channel.component';

describe('CreateDeliveryChannelComponent', () => {
  let component: CreateDeliveryChannelComponent;
  let fixture: ComponentFixture<CreateDeliveryChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDeliveryChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeliveryChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
