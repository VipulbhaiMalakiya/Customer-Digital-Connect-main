import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditeSlatimelinesComponent } from './add-edite-slatimelines.component';

describe('AddEditeSlatimelinesComponent', () => {
  let component: AddEditeSlatimelinesComponent;
  let fixture: ComponentFixture<AddEditeSlatimelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditeSlatimelinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditeSlatimelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
