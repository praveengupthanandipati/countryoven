import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CowalletComponent } from './cowallet.component';

describe('CowalletComponent', () => {
  let component: CowalletComponent;
  let fixture: ComponentFixture<CowalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CowalletComponent]
    });
    fixture = TestBed.createComponent(CowalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
