import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickReplayComponent } from './quick-replay.component';

describe('QuickReplayComponent', () => {
  let component: QuickReplayComponent;
  let fixture: ComponentFixture<QuickReplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickReplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickReplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
