import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConformRoderComponent } from './conform-roder.component';

describe('ConformRoderComponent', () => {
  let component: ConformRoderComponent;
  let fixture: ComponentFixture<ConformRoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConformRoderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConformRoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
