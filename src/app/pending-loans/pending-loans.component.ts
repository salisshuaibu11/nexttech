import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {CommonModule} from "@angular/common";
import {MatBadge} from "@angular/material/badge";

interface PendingLoan {
  borrowerName: string;
  loanAmount: string;
  interestRate: string;
  loanTerm: number;
}

@Component({
  selector: 'app-pending-loans',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadge
  ],
  templateUrl: './pending-loans.component.html',
  styleUrl: './pending-loans.component.scss'
})
export class PendingLoansComponent {
  displayedColumns: string[] = ['borrowerName', 'loanAmount', 'interestRate', 'loanTerm', 'actions'];

  dataSource: PendingLoan[] = [
    { borrowerName: 'John Smith', loanAmount: '₦400,2022', interestRate: '5.2%', loanTerm: 36 },
    { borrowerName: 'John Smith', loanAmount: '₦400,2022', interestRate: '5.2%', loanTerm: 36 },
    { borrowerName: 'John Smith', loanAmount: '₦400,2022', interestRate: '5.2%', loanTerm: 36 },
    { borrowerName: 'John Smith', loanAmount: '₦400,2022', interestRate: '5.2%', loanTerm: 36 },
    { borrowerName: 'John Smith', loanAmount: '₦400,2022', interestRate: '5.2%', loanTerm: 36 }
  ];

  totalLoans = 100;
}
