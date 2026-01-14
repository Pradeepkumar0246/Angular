import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Submitcomponent } from './submitcomponent';

describe('Submitcomponent', () => {
  let component: Submitcomponent;
  let fixture: ComponentFixture<Submitcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Submitcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Submitcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
