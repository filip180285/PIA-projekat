import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNovaRadionicaComponent } from './admin-nova-radionica.component';

describe('AdminNovaRadionicaComponent', () => {
  let component: AdminNovaRadionicaComponent;
  let fixture: ComponentFixture<AdminNovaRadionicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNovaRadionicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNovaRadionicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
