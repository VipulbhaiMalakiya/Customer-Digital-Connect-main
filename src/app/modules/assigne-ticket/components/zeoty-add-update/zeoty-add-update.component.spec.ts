import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeotyAddUpdateComponent } from './zeoty-add-update.component';

describe('ZeotyAddUpdateComponent', () => {
  let component: ZeotyAddUpdateComponent;
  let fixture: ComponentFixture<ZeotyAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZeotyAddUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZeotyAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
