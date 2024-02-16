import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChathistoryreportcountComponent } from './chathistoryreportcount.component';

describe('ChathistoryreportcountComponent', () => {
  let component: ChathistoryreportcountComponent;
  let fixture: ComponentFixture<ChathistoryreportcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChathistoryreportcountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChathistoryreportcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
