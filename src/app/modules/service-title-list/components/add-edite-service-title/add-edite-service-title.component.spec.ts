import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditeServiceTitleComponent } from './add-edite-service-title.component';
describe('AddEditeServiceTitleComponent', () => {
  let component: AddEditeServiceTitleComponent;
  let fixture: ComponentFixture<AddEditeServiceTitleComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditeServiceTitleComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AddEditeServiceTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
