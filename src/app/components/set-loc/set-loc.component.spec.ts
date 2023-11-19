import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLocComponent } from './set-loc.component';

describe('SetLocComponent', () => {
  let component: SetLocComponent;
  let fixture: ComponentFixture<SetLocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetLocComponent]
    });
    fixture = TestBed.createComponent(SetLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
