import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelNameDetailsComponent } from './channel-name-details.component';

describe('ChannelNameDetailsComponent', () => {
  let component: ChannelNameDetailsComponent;
  let fixture: ComponentFixture<ChannelNameDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelNameDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelNameDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
