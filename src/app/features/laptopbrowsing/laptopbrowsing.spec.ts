import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Laptopbrowsing } from './laptopbrowsing';

describe('Laptopbrowsing', () => {
  let component: Laptopbrowsing;
  let fixture: ComponentFixture<Laptopbrowsing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Laptopbrowsing],
    }).compileComponents();

    fixture = TestBed.createComponent(Laptopbrowsing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
