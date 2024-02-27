import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HappycustomerComponent } from './happycustomer.component';

describe('HappycustomerComponent', () => {
  let component: HappycustomerComponent;
  let fixture: ComponentFixture<HappycustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HappycustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HappycustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
