import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSettingsComponent } from './stock-settings.component';

describe('StockSettingsComponent', () => {
  let component: StockSettingsComponent;
  let fixture: ComponentFixture<StockSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
