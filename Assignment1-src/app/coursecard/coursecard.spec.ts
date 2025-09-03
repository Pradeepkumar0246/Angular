import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coursecard } from './coursecard';

describe('Coursecard', () => {
  let component: Coursecard;
  let fixture: ComponentFixture<Coursecard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Coursecard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Coursecard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
