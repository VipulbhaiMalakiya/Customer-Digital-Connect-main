import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxLayoutComponent } from './inbox-layout.component';

describe('InboxLayoutComponent', () => {
  let component: InboxLayoutComponent;
  let fixture: ComponentFixture<InboxLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InboxLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InboxLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
