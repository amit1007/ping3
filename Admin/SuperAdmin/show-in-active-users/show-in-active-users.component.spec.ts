import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInActiveUsersComponent } from './show-in-active-users.component';

describe('ShowInActiveUsersComponent', () => {
  let component: ShowInActiveUsersComponent;
  let fixture: ComponentFixture<ShowInActiveUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowInActiveUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInActiveUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
