import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomReplyComponent } from './custom-reply.component';

describe('CustomReplyComponent', () => {
  let component: CustomReplyComponent;
  let fixture: ComponentFixture<CustomReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomReplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
