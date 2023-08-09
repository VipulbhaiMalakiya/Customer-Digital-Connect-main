import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditeCustomReplyComponent } from './add-edite-custom-reply.component';

describe('AddEditeCustomReplyComponent', () => {
  let component: AddEditeCustomReplyComponent;
  let fixture: ComponentFixture<AddEditeCustomReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditeCustomReplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditeCustomReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
