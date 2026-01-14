import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Departmentcomponent } from './departmentcomponent';

describe('Departmentcomponent', () => {
  let component: Departmentcomponent;
  let fixture: ComponentFixture<Departmentcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Departmentcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Departmentcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
