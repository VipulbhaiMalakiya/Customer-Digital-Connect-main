import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditeTicketComponent } from './add-edite-ticket.component';
import { ToastrModule } from 'ngx-toastr';
describe('AddEditeTicketComponent', () => {
  let component: AddEditeTicketComponent;
  let fixture: ComponentFixture<AddEditeTicketComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      declarations: [ AddEditeTicketComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AddEditeTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
