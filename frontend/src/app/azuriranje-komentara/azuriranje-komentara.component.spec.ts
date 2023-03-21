import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjeKomentaraComponent } from './azuriranje-komentara.component';

describe('AzuriranjeKomentaraComponent', () => {
  let component: AzuriranjeKomentaraComponent;
  let fixture: ComponentFixture<AzuriranjeKomentaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzuriranjeKomentaraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzuriranjeKomentaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
