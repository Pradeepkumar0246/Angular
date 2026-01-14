import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Applicationcomponent } from './applicationcomponent';

describe('Applicationcomponent', () => {
  let component: Applicationcomponent;
  let fixture: ComponentFixture<Applicationcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Applicationcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Applicationcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
