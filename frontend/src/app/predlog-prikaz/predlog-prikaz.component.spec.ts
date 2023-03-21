import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredlogPrikazComponent } from './predlog-prikaz.component';

describe('PredlogPrikazComponent', () => {
  let component: PredlogPrikazComponent;
  let fixture: ComponentFixture<PredlogPrikazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredlogPrikazComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredlogPrikazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
