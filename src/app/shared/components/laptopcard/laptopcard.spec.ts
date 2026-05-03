import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Laptopcard } from './laptopcard';

describe('Laptopcard', () => {
  let component: Laptopcard;
  let fixture: ComponentFixture<Laptopcard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Laptopcard],
    }).compileComponents();

    fixture = TestBed.createComponent(Laptopcard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
