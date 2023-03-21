import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadionicaUcestvovaoPrikazComponent } from './radionica-ucestvovao-prikaz.component';

describe('RadionicaUcestvovaoPrikazComponent', () => {
  let component: RadionicaUcestvovaoPrikazComponent;
  let fixture: ComponentFixture<RadionicaUcestvovaoPrikazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadionicaUcestvovaoPrikazComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadionicaUcestvovaoPrikazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
