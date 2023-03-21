import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjeUcesnikaComponent } from './azuriranje-ucesnika.component';

describe('AzuriranjeUcesnikaComponent', () => {
  let component: AzuriranjeUcesnikaComponent;
  let fixture: ComponentFixture<AzuriranjeUcesnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzuriranjeUcesnikaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzuriranjeUcesnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
