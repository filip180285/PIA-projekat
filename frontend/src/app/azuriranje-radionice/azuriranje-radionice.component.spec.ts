import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjeRadioniceComponent } from './azuriranje-radionice.component';

describe('AzuriranjeRadioniceComponent', () => {
  let component: AzuriranjeRadioniceComponent;
  let fixture: ComponentFixture<AzuriranjeRadioniceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzuriranjeRadioniceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzuriranjeRadioniceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
