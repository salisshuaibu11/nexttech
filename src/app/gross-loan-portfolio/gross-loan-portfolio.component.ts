import {Component, OnInit, signal} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatFormField, MatPrefix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {PendingLoansComponent} from "../pending-loans/pending-loans.component";
import {ChartConfiguration} from "chart.js";
import Chart from "chart.js/auto";

@Component({
  selector: 'app-gross-loan-portfolio',
  standalone: true,
  imports: [
    MatCard,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatPrefix,
    PendingLoansComponent
  ],
  templateUrl: './gross-loan-portfolio.component.html',
  styleUrl: './gross-loan-portfolio.component.scss'
})
export class GrossLoanPortfolioComponent implements OnInit {
  selectedChatPeriods = signal('12 months');
  chartPeriods = [
    { label: '12 months', active: false },
    { label: '3 months', active: false },
    { label: '30 days', active: false },
    { label: '7 days', active: false }
  ];

  chart: any = [];

  constructor() {
  }

  ngOnInit() {
    this.createBarChart()
  }

  createBarChart() {
    const ctx = document.getElementById('barCanvas') as HTMLCanvasElement;
    const chartCtx = ctx.getContext('2d');

    if (!chartCtx) return;

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [
          {
            label: 'Approved',
            data: [400, 550, 250, 400, 200, 500, 350, 400, 350, 450, 550, 350],
            backgroundColor: '#2E90FA',
            borderRadius: 6,
            barThickness: 35,
            borderSkipped: false,
          },
          {
            label: 'Pending',
            data: [200, 250, 150, 200, 100, 250, 150, 200, 200, 250, 300, 150],
            backgroundColor: '#EAECF0',
            borderRadius: 6,
            barThickness: 35,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#374151',
            padding: 12,
            cornerRadius: 6,
          }
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            ticks: {
              color: '#475467',
              font: { size: 12 }
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            max: 1000,
            grid: { color: '#F3F4F6' },
            ticks: {
              stepSize: 200,
              color: '#475467',
              font: { size: 12 },
              callback: (value) => value.toString(),
            },
          },
        },
      },
    };

    this.chart = new Chart(chartCtx, config);
  }
}
