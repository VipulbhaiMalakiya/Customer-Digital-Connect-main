import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelAddEditeComponent } from './label-add-edite.component';

describe('LabelAddEditeComponent', () => {
  let component: LabelAddEditeComponent;
  let fixture: ComponentFixture<LabelAddEditeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelAddEditeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelAddEditeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
