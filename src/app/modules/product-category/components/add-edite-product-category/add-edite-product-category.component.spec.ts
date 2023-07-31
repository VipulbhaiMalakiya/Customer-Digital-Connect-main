import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditeProductCategoryComponent } from './add-edite-product-category.component';

describe('AddEditeProductCategoryComponent', () => {
  let component: AddEditeProductCategoryComponent;
  let fixture: ComponentFixture<AddEditeProductCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditeProductCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditeProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
