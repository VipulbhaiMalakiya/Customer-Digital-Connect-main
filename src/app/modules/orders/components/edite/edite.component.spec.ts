import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeComponent } from './edite.component';

describe('EditeComponent', () => {
  let component: EditeComponent;
  let fixture: ComponentFixture<EditeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
