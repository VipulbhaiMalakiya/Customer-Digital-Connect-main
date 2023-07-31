import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditeTablesComponent } from './add-edite-tables.component';

describe('AddEditeTablesComponent', () => {
  let component: AddEditeTablesComponent;
  let fixture: ComponentFixture<AddEditeTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditeTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditeTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
