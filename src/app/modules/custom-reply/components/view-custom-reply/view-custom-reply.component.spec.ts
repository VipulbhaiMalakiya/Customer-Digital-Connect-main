import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomReplyComponent } from './view-custom-reply.component';

describe('ViewCustomReplyComponent', () => {
  let component: ViewCustomReplyComponent;
  let fixture: ComponentFixture<ViewCustomReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCustomReplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCustomReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
