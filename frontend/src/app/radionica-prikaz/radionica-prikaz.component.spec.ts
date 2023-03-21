import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadionicaPrikazComponent } from './radionica-prikaz.component';

describe('RadionicaPrikazComponent', () => {
  let component: RadionicaPrikazComponent;
  let fixture: ComponentFixture<RadionicaPrikazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadionicaPrikazComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadionicaPrikazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
