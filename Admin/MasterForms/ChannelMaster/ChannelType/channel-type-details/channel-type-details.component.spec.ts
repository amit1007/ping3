import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelTypeDetailsComponent } from './channel-type-details.component';

describe('ChannelTypeDetailsComponent', () => {
  let component: ChannelTypeDetailsComponent;
  let fixture: ComponentFixture<ChannelTypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
