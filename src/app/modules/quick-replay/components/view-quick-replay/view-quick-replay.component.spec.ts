import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuickReplayComponent } from './view-quick-replay.component';

describe('ViewQuickReplayComponent', () => {
  let component: ViewQuickReplayComponent;
  let fixture: ComponentFixture<ViewQuickReplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuickReplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuickReplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
