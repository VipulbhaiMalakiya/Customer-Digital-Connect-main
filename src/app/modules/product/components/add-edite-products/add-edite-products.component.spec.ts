import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditeProductsComponent } from './add-edite-products.component';

describe('AddEditeProductsComponent', () => {
  let component: AddEditeProductsComponent;
  let fixture: ComponentFixture<AddEditeProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditeProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditeProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
