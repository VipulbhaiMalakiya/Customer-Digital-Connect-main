import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempletsComponent } from './templets.component';

describe('TempletsComponent', () => {
  let component: TempletsComponent;
  let fixture: ComponentFixture<TempletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempletsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
