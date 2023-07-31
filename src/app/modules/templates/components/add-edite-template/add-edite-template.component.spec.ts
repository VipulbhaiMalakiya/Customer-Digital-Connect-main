import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditeTemplateComponent } from './add-edite-template.component';

describe('AddEditeTemplateComponent', () => {
  let component: AddEditeTemplateComponent;
  let fixture: ComponentFixture<AddEditeTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditeTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
