import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUplodComponent } from './image-uplod.component';

describe('ImageUplodComponent', () => {
  let component: ImageUplodComponent;
  let fixture: ComponentFixture<ImageUplodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageUplodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageUplodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
