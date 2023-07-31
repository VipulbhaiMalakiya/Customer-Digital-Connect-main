import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewServiceTitleComponent } from './view-service-title.component';
describe('ViewServiceTitleComponent', () => {
  let component: ViewServiceTitleComponent;
  let fixture: ComponentFixture<ViewServiceTitleComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewServiceTitleComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ViewServiceTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
