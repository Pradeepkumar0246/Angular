import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDeatil } from './food-deatil';

describe('FoodDeatil', () => {
  let component: FoodDeatil;
  let fixture: ComponentFixture<FoodDeatil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodDeatil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodDeatil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
