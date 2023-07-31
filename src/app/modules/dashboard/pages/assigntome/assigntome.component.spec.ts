import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigntomeComponent } from './assigntome.component';

describe('AssigntomeComponent', () => {
  let component: AssigntomeComponent;
  let fixture: ComponentFixture<AssigntomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigntomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigntomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
