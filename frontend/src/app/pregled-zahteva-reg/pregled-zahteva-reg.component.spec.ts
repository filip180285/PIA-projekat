import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledZahtevaRegComponent } from './pregled-zahteva-reg.component';

describe('PregledZahtevaRegComponent', () => {
  let component: PregledZahtevaRegComponent;
  let fixture: ComponentFixture<PregledZahtevaRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledZahtevaRegComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledZahtevaRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
