import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChannelNameComponent } from './create-channel-name.component';

describe('CreateChannelNameComponent', () => {
  let component: CreateChannelNameComponent;
  let fixture: ComponentFixture<CreateChannelNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChannelNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChannelNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
