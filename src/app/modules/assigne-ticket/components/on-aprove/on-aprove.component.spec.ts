import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnAproveComponent } from './on-aprove.component';

describe('OnAproveComponent', () => {
  let component: OnAproveComponent;
  let fixture: ComponentFixture<OnAproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnAproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnAproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
