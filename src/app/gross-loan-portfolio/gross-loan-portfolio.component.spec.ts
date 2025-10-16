import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrossLoanPortfolioComponent } from './gross-loan-portfolio.component';

describe('GrossLoanPortfolioComponent', () => {
  let component: GrossLoanPortfolioComponent;
  let fixture: ComponentFixture<GrossLoanPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrossLoanPortfolioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrossLoanPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
