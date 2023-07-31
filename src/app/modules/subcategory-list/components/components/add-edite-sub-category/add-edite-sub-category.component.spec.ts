import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditeSubCategoryComponent } from './add-edite-sub-category.component';
describe('AddEditeSubCategoryComponent', () => {
  let component: AddEditeSubCategoryComponent;
  let fixture: ComponentFixture<AddEditeSubCategoryComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditeSubCategoryComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AddEditeSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
