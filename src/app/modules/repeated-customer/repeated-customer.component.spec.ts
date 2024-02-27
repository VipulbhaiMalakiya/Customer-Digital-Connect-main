import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatedCustomerComponent } from './repeated-customer.component';

describe('RepeatedCustomerComponent', () => {
  let component: RepeatedCustomerComponent;
  let fixture: ComponentFixture<RepeatedCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepeatedCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepeatedCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
