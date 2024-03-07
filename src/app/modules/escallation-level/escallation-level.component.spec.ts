import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscallationLevelComponent } from './escallation-level.component';

describe('EscallationLevelComponent', () => {
  let component: EscallationLevelComponent;
  let fixture: ComponentFixture<EscallationLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscallationLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscallationLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
