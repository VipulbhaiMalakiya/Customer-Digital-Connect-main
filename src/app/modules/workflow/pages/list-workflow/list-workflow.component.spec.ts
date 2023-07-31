import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkflowComponent } from './list-workflow.component';

describe('ListWorkflowComponent', () => {
  let component: ListWorkflowComponent;
  let fixture: ComponentFixture<ListWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
