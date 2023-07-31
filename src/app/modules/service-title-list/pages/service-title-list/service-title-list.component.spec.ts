import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceTitleListComponent } from './service-title-list.component';
describe('ServiceTitleListComponent', () => {
  let component: ServiceTitleListComponent;
  let fixture: ComponentFixture<ServiceTitleListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceTitleListComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ServiceTitleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
