import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahteviRegistracijaComponent } from './zahtevi-registracija.component';

describe('ZahteviRegistracijaComponent', () => {
  let component: ZahteviRegistracijaComponent;
  let fixture: ComponentFixture<ZahteviRegistracijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahteviRegistracijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZahteviRegistracijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
