import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDisbursalComponent } from './pending-disbursal.component';

describe('PendingDisbursalComponent', () => {
  let component: PendingDisbursalComponent;
  let fixture: ComponentFixture<PendingDisbursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingDisbursalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingDisbursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
