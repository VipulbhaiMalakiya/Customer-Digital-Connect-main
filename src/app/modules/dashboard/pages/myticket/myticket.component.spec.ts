import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyticketComponent } from './myticket.component';

describe('MyticketComponent', () => {
  let component: MyticketComponent;
  let fixture: ComponentFixture<MyticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyticketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
