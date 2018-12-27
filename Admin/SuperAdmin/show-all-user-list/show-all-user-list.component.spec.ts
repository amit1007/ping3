import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllUserListComponent } from './show-all-user-list.component';

describe('ShowAllUserListComponent', () => {
  let component: ShowAllUserListComponent;
  let fixture: ComponentFixture<ShowAllUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
