import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadionicaPrikazAdminComponent } from './radionica-prikaz-admin.component';

describe('RadionicaPrikazAdminComponent', () => {
  let component: RadionicaPrikazAdminComponent;
  let fixture: ComponentFixture<RadionicaPrikazAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadionicaPrikazAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadionicaPrikazAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
