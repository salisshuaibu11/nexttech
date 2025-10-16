import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatBadge } from "@angular/material/badge";
import { CommonModule } from "@angular/common";

interface PendingLoan {
  borrowerName: string;
  loanAmount: string;
  interestRate: string;
  loanTerm: number;
}

@Component({
  selector: 'app-pending-disbursal',
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
  templateUrl: './pending-disbursal.component.html',
  styleUrl: './pending-disbursal.component.scss'
})
export class PendingDisbursalComponent {
  displayedColumns: string[] = ['borrowerName', 'loanAmount', 'interestRate', 'loanTerm', 'actions'];

  dataSource: PendingLoan[] = [
    { borrowerName: 'John Smith', loanAmount: '₦400,2022', interestRate: '5.2%', loanTerm: 36 },
    { borrowerName: 'John Smith', loanAmount: '₦400,2022', interestRate: '5.2%', loanTerm: 36 },
    { borrowerName: 'John Smith', loanAmount: '₦400,2022', interestRate: '5.2%', loanTerm: 36 },
    { borrowerName: 'John Smith', loanAmount: '₦400,2022', interestRate: '5.2%', loanTerm: 36 },
    { borrowerName: 'John Smith', loanAmount: '₦400,2022', interestRate: '5.2%', loanTerm: 36 }
  ];

  totalLoans = 12;
}
