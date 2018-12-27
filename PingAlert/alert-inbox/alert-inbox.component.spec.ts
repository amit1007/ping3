import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertInboxComponent } from './alert-inbox.component';

describe('AlertInboxComponent', () => {
  let component: AlertInboxComponent;
  let fixture: ComponentFixture<AlertInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
