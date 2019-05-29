import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbsregisterComponent } from './cbsregister.component';

describe('CbsregisterComponent', () => {
  let component: CbsregisterComponent;
  let fixture: ComponentFixture<CbsregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbsregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbsregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
