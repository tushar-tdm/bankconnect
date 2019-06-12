import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmprofileComponent } from './bmprofile.component';

describe('BmprofileComponent', () => {
  let component: BmprofileComponent;
  let fixture: ComponentFixture<BmprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
