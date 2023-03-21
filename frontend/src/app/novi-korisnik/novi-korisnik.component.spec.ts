import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviKorisnikComponent } from './novi-korisnik.component';

describe('NoviKorisnikComponent', () => {
  let component: NoviKorisnikComponent;
  let fixture: ComponentFixture<NoviKorisnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoviKorisnikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoviKorisnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
