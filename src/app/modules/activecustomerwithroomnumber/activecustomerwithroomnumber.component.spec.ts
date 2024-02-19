import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivecustomerwithroomnumberComponent } from './activecustomerwithroomnumber.component';

describe('ActivecustomerwithroomnumberComponent', () => {
  let component: ActivecustomerwithroomnumberComponent;
  let fixture: ComponentFixture<ActivecustomerwithroomnumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivecustomerwithroomnumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivecustomerwithroomnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
