import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScanCardComponent } from './scan-card.component';

describe('ScanCardComponent', () => {
  let component: ScanCardComponent;
  let fixture: ComponentFixture<ScanCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
