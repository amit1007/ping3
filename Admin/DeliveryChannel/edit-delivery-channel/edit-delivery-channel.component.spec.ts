import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeliveryChannelComponent } from './edit-delivery-channel.component';

describe('EditDeliveryChannelComponent', () => {
  let component: EditDeliveryChannelComponent;
  let fixture: ComponentFixture<EditDeliveryChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeliveryChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeliveryChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
