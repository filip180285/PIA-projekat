import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadionicaPrikazOrgComponent } from './radionica-prikaz-org.component';

describe('RadionicaPrikazOrgComponent', () => {
  let component: RadionicaPrikazOrgComponent;
  let fixture: ComponentFixture<RadionicaPrikazOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadionicaPrikazOrgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadionicaPrikazOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
