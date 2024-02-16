import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditeRoomsComponent } from './add-edite-rooms.component';

describe('AddEditeRoomsComponent', () => {
  let component: AddEditeRoomsComponent;
  let fixture: ComponentFixture<AddEditeRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditeRoomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditeRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
