import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplylocpopupComponent } from './displylocpopup.component';

describe('DisplylocpopupComponent', () => {
  let component: DisplylocpopupComponent;
  let fixture: ComponentFixture<DisplylocpopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplylocpopupComponent]
    });
    fixture = TestBed.createComponent(DisplylocpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
