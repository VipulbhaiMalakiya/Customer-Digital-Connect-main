import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductCategoryComponent } from './view-product-category.component';

describe('ViewProductCategoryComponent', () => {
  let component: ViewProductCategoryComponent;
  let fixture: ComponentFixture<ViewProductCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
