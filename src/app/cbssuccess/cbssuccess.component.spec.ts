import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbssuccessComponent } from './cbssuccess.component';

describe('CbssuccessComponent', () => {
  let component: CbssuccessComponent;
  let fixture: ComponentFixture<CbssuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbssuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbssuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
