import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditeCategoryComponent } from './add-edite-category.component';
describe('AddEditeCategoryComponent', () => {
  let component: AddEditeCategoryComponent;
  let fixture: ComponentFixture<AddEditeCategoryComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditeCategoryComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AddEditeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
