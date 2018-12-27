import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuperUserComponent } from './create-super-user.component';

describe('CreateSuperUserComponent', () => {
  let component: CreateSuperUserComponent;
  let fixture: ComponentFixture<CreateSuperUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSuperUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSuperUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
