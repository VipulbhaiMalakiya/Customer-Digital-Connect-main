import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConformOrderComponent } from './conform-order.component';

describe('ConformOrderComponent', () => {
  let component: ConformOrderComponent;
  let fixture: ComponentFixture<ConformOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConformOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConformOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
