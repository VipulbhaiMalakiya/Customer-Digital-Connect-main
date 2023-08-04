import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditeQuickReplayComponent } from './add-edite-quick-replay.component';

describe('AddEditeQuickReplayComponent', () => {
  let component: AddEditeQuickReplayComponent;
  let fixture: ComponentFixture<AddEditeQuickReplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditeQuickReplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditeQuickReplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
