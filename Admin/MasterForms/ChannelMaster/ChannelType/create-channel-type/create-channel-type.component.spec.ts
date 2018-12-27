import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChannelTypeComponent } from './create-channel-type.component';

describe('CreateChannelTypeComponent', () => {
  let component: CreateChannelTypeComponent;
  let fixture: ComponentFixture<CreateChannelTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChannelTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChannelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
