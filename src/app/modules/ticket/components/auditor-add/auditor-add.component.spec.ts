import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorAddComponent } from './auditor-add.component';

describe('AuditorAddComponent', () => {
  let component: AuditorAddComponent;
  let fixture: ComponentFixture<AuditorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditorAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
