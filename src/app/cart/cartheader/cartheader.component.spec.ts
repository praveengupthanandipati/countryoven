import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartheaderComponent } from './cartheader.component';

describe('CartheaderComponent', () => {
  let component: CartheaderComponent;
  let fixture: ComponentFixture<CartheaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartheaderComponent]
    });
    fixture = TestBed.createComponent(CartheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
