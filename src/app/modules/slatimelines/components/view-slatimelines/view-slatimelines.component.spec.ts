import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSlatimelinesComponent } from './view-slatimelines.component';

describe('ViewSlatimelinesComponent', () => {
  let component: ViewSlatimelinesComponent;
  let fixture: ComponentFixture<ViewSlatimelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSlatimelinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSlatimelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
