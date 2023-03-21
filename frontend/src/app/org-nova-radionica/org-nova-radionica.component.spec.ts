import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgNovaRadionicaComponent } from './org-nova-radionica.component';

describe('OrgNovaRadionicaComponent', () => {
  let component: OrgNovaRadionicaComponent;
  let fixture: ComponentFixture<OrgNovaRadionicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgNovaRadionicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgNovaRadionicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
