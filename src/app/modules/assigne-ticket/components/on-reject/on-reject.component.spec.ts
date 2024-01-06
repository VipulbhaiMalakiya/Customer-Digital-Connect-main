import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnRejectComponent } from './on-reject.component';

describe('OnRejectComponent', () => {
  let component: OnRejectComponent;
  let fixture: ComponentFixture<OnRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnRejectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
