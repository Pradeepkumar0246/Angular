import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Officercomponent } from './officercomponent';

describe('Officercomponent', () => {
  let component: Officercomponent;
  let fixture: ComponentFixture<Officercomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Officercomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Officercomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
