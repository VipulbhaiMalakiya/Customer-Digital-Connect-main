import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaReportComponent } from './sla-report.component';

describe('SlaReportComponent', () => {
  let component: SlaReportComponent;
  let fixture: ComponentFixture<SlaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlaReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
