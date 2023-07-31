import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditeIssueComponent } from './add-edite-issue.component';

describe('AddEditeIssueComponent', () => {
  let component: AddEditeIssueComponent;
  let fixture: ComponentFixture<AddEditeIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditeIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditeIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
