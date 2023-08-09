import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSlaComponent } from './view-sla.component';

describe('ViewSlaComponent', () => {
  let component: ViewSlaComponent;
  let fixture: ComponentFixture<ViewSlaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSlaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
