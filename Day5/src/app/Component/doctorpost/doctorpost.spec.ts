import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorpostComponent } from './doctorpost';

describe('Doctorpost', () => {
  let component: DoctorpostComponent;
  let fixture: ComponentFixture<DoctorpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorpostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
