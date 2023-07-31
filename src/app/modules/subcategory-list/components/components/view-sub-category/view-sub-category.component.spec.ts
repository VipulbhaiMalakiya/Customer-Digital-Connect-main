import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewSubCategoryComponent } from './view-sub-category.component';
describe('ViewSubCategoryComponent', () => {
  let component: ViewSubCategoryComponent;
  let fixture: ComponentFixture<ViewSubCategoryComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubCategoryComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ViewSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
