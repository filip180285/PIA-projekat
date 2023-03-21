import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledProfilaComponent } from './pregled-profila.component';

describe('PregledProfilaComponent', () => {
  let component: PregledProfilaComponent;
  let fixture: ComponentFixture<PregledProfilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledProfilaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledProfilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
