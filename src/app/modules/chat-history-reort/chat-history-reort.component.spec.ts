import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHistoryReortComponent } from './chat-history-reort.component';

describe('ChatHistoryReortComponent', () => {
  let component: ChatHistoryReortComponent;
  let fixture: ComponentFixture<ChatHistoryReortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatHistoryReortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatHistoryReortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
