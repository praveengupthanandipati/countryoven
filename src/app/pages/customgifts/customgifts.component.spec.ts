import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomgiftsComponent } from './customgifts.component';

describe('CustomgiftsComponent', () => {
  let component: CustomgiftsComponent;
  let fixture: ComponentFixture<CustomgiftsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomgiftsComponent]
    });
    fixture = TestBed.createComponent(CustomgiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
