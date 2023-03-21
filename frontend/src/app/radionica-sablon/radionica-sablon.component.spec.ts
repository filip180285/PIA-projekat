import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadionicaSablonComponent } from './radionica-sablon.component';

describe('RadionicaSablonComponent', () => {
  let component: RadionicaSablonComponent;
  let fixture: ComponentFixture<RadionicaSablonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadionicaSablonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadionicaSablonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
