import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSignupComponent } from './role-signup.component';

describe('RoleSignupComponent', () => {
  let component: RoleSignupComponent;
  let fixture: ComponentFixture<RoleSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
