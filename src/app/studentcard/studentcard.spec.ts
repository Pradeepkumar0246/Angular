import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Studentcard } from './studentcard';

describe('Studentcard', () => {
  let component: Studentcard;
  let fixture: ComponentFixture<Studentcard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Studentcard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Studentcard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
