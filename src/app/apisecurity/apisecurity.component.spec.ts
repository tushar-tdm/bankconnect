import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApisecurityComponent } from './apisecurity.component';

describe('ApisecurityComponent', () => {
  let component: ApisecurityComponent;
  let fixture: ComponentFixture<ApisecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApisecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApisecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
