import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlatimelinesComponent } from './slatimelines.component';

describe('SlatimelinesComponent', () => {
  let component: SlatimelinesComponent;
  let fixture: ComponentFixture<SlatimelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlatimelinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlatimelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
