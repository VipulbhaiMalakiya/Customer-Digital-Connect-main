import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorUpdateComponent } from './auditor-update.component';

describe('AuditorUpdateComponent', () => {
  let component: AuditorUpdateComponent;
  let fixture: ComponentFixture<AuditorUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditorUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
