import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubcategoryListComponent } from './subcategory-list.component';
import { ToastrModule } from 'ngx-toastr';
describe('SubcategoryListComponent', () => {
  let component: SubcategoryListComponent;
  let fixture: ComponentFixture<SubcategoryListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      declarations: [ SubcategoryListComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(SubcategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
